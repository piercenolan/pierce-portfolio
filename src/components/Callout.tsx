/**
 * The site's signature device: a dimension-callout annotation, borrowed from
 * engineering drawings. Used to surface the measured number or the honest
 * caveat next to a claim, rather than letting prose carry it alone.
 */
export default function Callout({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-l-2 border-measure pl-3.5">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-measure">
          [{label}]
        </span>
        <p className="mt-1 text-[13px] leading-snug text-graphite">{text}</p>
      </div>
    </div>
  );
}
