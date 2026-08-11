import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/**
 * Loads a real weight of the site's display face for the card.
 *
 * ImageResponse ships only a 400-weight fallback, which renders the headline
 * noticeably lighter than the site itself. Google is already a build-time
 * dependency here via next/font, so this adds no new class of failure — but it
 * is still wrapped, because a link-preview image is never worth failing a
 * deploy over. On any failure the card renders in the fallback face.
 */
async function loadArchivo(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`
    ).then((r) => (r.ok ? r.text() : null));
    if (!css) return null;

    // Google varies the format it serves by user agent, so the response is not
    // something to assume: pick a URL whose extension Satori can actually
    // parse. Handing it a woff2 throws inside ImageResponse, past the reach of
    // this try/catch, and takes the whole build down with it.
    const url = [...css.matchAll(/url\((https:\/\/[^)]+)\)/g)]
      .map((m) => m[1])
      .find((candidate) => /\.(ttf|otf|woff)(\?|$)/i.test(candidate));
    if (!url) return null;

    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/**
 * Link preview card. This site is distributed by referral and cold email, so
 * the unfurl in a recruiter's inbox is often the first thing seen. Built from
 * the site's own tokens and the graticule motif so the preview and the page
 * read as one artefact.
 */
export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([loadArchivo(800), loadArchivo(500)]);

  const fonts = [
    bold && { name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const },
    regular && {
      name: "Archivo",
      data: regular,
      weight: 500 as const,
      style: "normal" as const,
    },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const display = fonts.length ? "Archivo" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#EDEFF0",
          backgroundImage:
            "linear-gradient(to right, rgba(18,23,26,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,23,26,0.055) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "72px 80px",
          fontFamily: display,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4A5459",
            }}
          >
            {profile.role}
          </div>

          {/* Each line is its own flex row. Satori drops whitespace between
              sibling elements and ignores `gap` here, so the word space is an
              explicit margin — otherwise the line reads "withhardware." */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.06,
              color: "#12171A",
            }}
          >
            <div style={{ display: "flex" }}>Software that has to</div>
            <div style={{ display: "flex" }}>
              <span style={{ marginRight: 13 }}>survive contact with</span>
              <span style={{ color: "#1A6DA3" }}>hardware.</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid #12171A",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#12171A",
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", gap: 44 }}>
            {profile.specs.map((spec) => (
              <div
                key={spec.label}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#4A5459",
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#12171A",
                    marginTop: 6,
                  }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
