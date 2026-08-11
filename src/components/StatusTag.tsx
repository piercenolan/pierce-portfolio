import type { Project } from "@/data/projects";

/** Keyed by the status union, so adding a status is a compile error until it
 *  is given a colour rather than silently falling through to "Complete". */
const styles: Record<Project["status"], string> = {
  "In progress": "border-measure text-measure",
  Shipped: "border-signal text-signal",
  Complete: "border-rule text-graphite",
};

export default function StatusTag({ status }: { status: Project["status"] }) {
  return (
    <span
      className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}
