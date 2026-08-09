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
        signal: "#1F77B4", // tab:blue — structure, links, primary
        measure: "#FF7F0E", // tab:orange — measured values, emphasis
        trace: "#17BECF", // tab:cyan — secondary data accent
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
