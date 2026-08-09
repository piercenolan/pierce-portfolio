import { profile } from "@/data/profile";

/** Bench-readout strip of real measured values from shipped work. */
export default function SpecStrip() {
  return (
    <dl className="grid grid-cols-2 border-t border-rule">
      {profile.specs.map((spec, i) => (
        <div
          key={spec.label}
          className={`border-b border-rule px-4 py-4 sm:border-b-0 ${
            i > 0 ? "sm:border-l" : ""
          } ${i % 2 === 1 ? "border-l sm:border-l" : ""} border-rule`}
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
            {spec.label}
          </dt>
          <dd className="mt-1 font-display text-2xl font-bold tracking-tightest text-ink">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
