import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette derived from the matplotlib tab10 cycle used in Nolan's own
        // research figures, so those charts sit natively in the page.
        bench: "#EDEFF0", // cool light grey — lab bench paper
        panel: "#F7F8F9",
        ink: "#12171A",
        graphite: "#4A5459",
        rule: "#CDD3D6",
        // tab:blue, deepened just enough that 10-11px links and tags clear
        // WCAG AA on both grounds (4.84:1 on bench, 5.25:1 on panel). The
        // published tab:blue reads 4.18:1 on bench and fails.
        signal: "#1A6DA3",
        measure: "#FF7F0E", // tab:orange — measured values, emphasis
        // Result semantics for callouts. Darkened from tab:green so 13px text
        // clears WCAG AA on the panel background (5.08:1); tab:red passes as-is
        // (4.72:1). Kept separate from the accents above so a favourable result
        // never reads as mere emphasis.
        pass: "#1E7A34", // tab:green, darkened — result went our way
        fault: "#D62728", // tab:red — result went against us
        // Cyanotype hero panel — the one bold surface on the page. Text on it
        // never uses a single-word accent colour; it's paper or haze only.
        blueprint: "#14375A",
        paper: "#F2F5F7", // headline and buttons on blueprint
        haze: "#AFC2D3", // secondary text and rules on blueprint
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        // Was -0.045em for the wide cut; condensed Archivo needs far less.
        tightest: "-0.012em",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
