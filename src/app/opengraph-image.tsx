import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time.
 *
 * Uses the runtime's default font rather than fetching a webfont, so the build
 * has no network dependency and cannot fail on a cold Vercel builder.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: "72px",
          border: "1px solid #1e232b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #2a3039",
              color: "#5ef2c0",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {site.monogram}
          </div>
          <div
            style={{
              color: "#868e9b",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#eceef1",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              color: "#b7bdc7",
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            I build AI systems that survive contact with production.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 3, background: "#5ef2c0" }} />
          <div style={{ color: "#868e9b", fontSize: 22 }}>
            AI Agents · RAG · LLM Applications · Automation · Full-Stack AI
          </div>
        </div>
      </div>
    ),
    size,
  );
}
