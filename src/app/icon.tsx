import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon, drawn from the site's own tokens rather than shipped as a binary:
 * ink ground, measured-orange initials. Regenerates with the palette instead
 * of drifting away from it.
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
          background: "#12171A",
          color: "#FF7F0E",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        NP
      </div>
    ),
    size
  );
}
