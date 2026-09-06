import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactResponse } from "@/lib/contact";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort in-process rate limit.
 *
 * Serverless instances are not shared, so this bounds abuse per instance rather
 * than globally. It is deliberately simple: the honeypot and schema validation
 * do most of the work, and a durable limiter (Upstash Redis, Vercel Firewall)
 * is the correct upgrade if this ever attracts real traffic.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return false;
}

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(clientKey)) {
    return json(
      { ok: false, error: "Too many messages in a short time. Please try again shortly." },
      429,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      422,
    );
  }

  const { name, email, company, message, website } = parsed.data;

  // Honeypot filled — accept silently so a bot learns nothing from the response.
  if (website) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from || !to) {
    // Fails loudly rather than pretending the message was delivered.
    console.error(
      "[contact] Email is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL and CONTACT_TO_EMAIL.",
    );
    return json(
      {
        ok: false,
        error:
          "The message could not be sent because email delivery is not configured on this deployment.",
      },
      503,
    );
  }

  try {
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (result.error) {
      console.error("[contact] Resend rejected the message:", result.error);
      return json(
        { ok: false, error: "The message could not be sent. Please email me directly." },
        502,
      );
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] Unexpected failure sending message:", error);
    return json(
      { ok: false, error: "Something went wrong sending your message. Please email me directly." },
      500,
    );
  }
}
