import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the monogram on the site's canvas colour.
 *
 * Generated rather than shipped as a binary so it stays in sync with the brand
 * tokens, and so the scaffold's default framework icon can be deleted.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090b",
          color: "#5ef2c0",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 6,
        }}
      >
        {site.monogram}
      </div>
    ),
    size,
  );
}
