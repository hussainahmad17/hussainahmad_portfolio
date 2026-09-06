"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactResponse } from "@/lib/contact";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Record<string, string[]>;

/**
 * Client-side validation.
 *
 * Deliberately hand-written rather than importing the shared Zod schema: doing
 * that pulled ~380 KB of validator into the browser to check three fields. The
 * server revalidates with the real schema and is the authority — this only
 * exists to avoid a pointless round trip on obvious mistakes.
 */
function validate(values: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const message = String(values.message ?? "").trim();

  if (name.length < 2) errors.name = ["Please enter your name."];
  else if (name.length > 80) errors.name = ["That name is unusually long — please shorten it."];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Please enter a valid email address."];
  }

  if (message.length < 20) {
    errors.message = ["Please add a little more detail — at least 20 characters."];
  } else if (message.length > 4000) {
    errors.message = ["Please keep the message under 4000 characters."];
  }

  return errors;
}

const fieldBase =
  "w-full rounded-xl border bg-surface/60 px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint " +
  "transition-colors focus:border-accent/60 focus:outline-none";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setFormError("Please check the highlighted fields.");
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body: ContactResponse = await response.json();

      if (!body.ok) {
        setStatus("error");
        setFormError(body.error);
        setFieldErrors(body.fieldErrors ?? {});
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setFormError(
        "The request could not be completed. Check your connection, or email me directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/30 bg-accent-dim/25 p-8 sm:p-10"
      >
        <h2 className="text-[length:var(--text-h3)] leading-tight font-medium text-accent-soft">
          Message sent
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
          Thanks — it&rsquo;s in my inbox. I read everything and reply to anything with a real
          problem attached, usually within a couple of days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorFor = (field: string) => fieldErrors[field]?.[0];

  const describedBy = (field: string) =>
    errorFor(field) ? `${formId}-${field}-error` : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-sm font-medium text-ink-soft"
          >
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            className={cn(
              fieldBase,
              "mt-2",
              errorFor("name") ? "border-red-500/60" : "border-line-strong",
            )}
            placeholder="Your name"
          />
          {errorFor("name") ? (
            <p id={`${formId}-name-error`} className="mt-2 text-sm text-red-400">
              {errorFor("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-sm font-medium text-ink-soft"
          >
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
            className={cn(
              fieldBase,
              "mt-2",
              errorFor("email") ? "border-red-500/60" : "border-line-strong",
            )}
            placeholder="you@company.com"
          />
          {errorFor("email") ? (
            <p id={`${formId}-email-error`} className="mt-2 text-sm text-red-400">
              {errorFor("email")}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-company`}
          className="block text-sm font-medium text-ink-soft"
        >
          Company <span className="text-faint">(optional)</span>
        </label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          className={cn(fieldBase, "mt-2 border-line-strong")}
          placeholder="Where you work"
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-ink-soft"
        >
          What are you building?
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={describedBy("message")}
          className={cn(
            fieldBase,
            "mt-2 resize-y",
            errorFor("message") ? "border-red-500/60" : "border-line-strong",
          )}
          placeholder="The problem, who it affects, and what a good outcome looks like. Detail helps more than polish."
        />
        {errorFor("message") ? (
          <p id={`${formId}-message-error`} className="mt-2 text-sm text-red-400">
            {errorFor("message")}
          </p>
        ) : null}
      </div>

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError ? (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
          {formError}
          {site.email ? (
            <>
              {" "}
              You can also email me at{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
          {status === "submitting" ? null : <span aria-hidden="true">→</span>}
        </Button>
        <p className="text-sm text-muted">No newsletter, no follow-up sequence.</p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
