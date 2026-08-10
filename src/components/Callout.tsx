import type { CalloutTone } from "@/data/projects";

/**
 * The site's signature device: a dimension-callout annotation, borrowed from
 * engineering drawings. Used to surface the measured number or the honest
 * caveat next to a claim, rather than letting prose carry it alone.
 *
 * Tone colour-codes the result so a reader who knows nothing about the project
 * can tell at a glance which way it went. Neutral keeps the orange used for
 * measured values elsewhere on the site.
 */
const tones: Record<CalloutTone, string> = {
  good: "border-pass text-pass",
  bad: "border-fault text-fault",
  neutral: "border-measure text-measure",
};

export default function Callout({
  label,
  text,
  tone = "neutral",
}: {
  label: string;
  text: string;
  tone?: CalloutTone;
}) {
  const color = tones[tone] ?? tones.neutral;

  return (
    <div className={`flex gap-3 border-l-2 pl-3.5 ${color}`}>
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
          [{label}]
        </span>
        <p className="mt-1 text-[13px] leading-snug text-graphite">{text}</p>
      </div>
    </div>
  );
}
