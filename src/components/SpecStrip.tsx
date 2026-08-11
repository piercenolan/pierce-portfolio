import { profile } from "@/data/profile";

/**
 * Bench-readout strip of real measured values from shipped work.
 *
 * Rules are drawn with a negative margin on the grid rather than per-item
 * border logic, so the strip stays correct for any number of specs instead of
 * being hand-tuned to the count that happened to exist when it was written.
 */
export default function SpecStrip() {
  return (
    <dl className="grid grid-cols-2 gap-px border-t border-rule bg-rule sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {profile.specs.map((spec) => (
        <div key={spec.label} className="bg-bench px-4 py-4">
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
