import Link from "next/link";
import type { Project } from "@/data/projects";

/** Secondary projects as an index, not cards: they shouldn't compete visually
 *  with the hardware work. All are complete, so status is omitted. */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-t border-ink">
      {projects.map((p) => (
        <li key={p.slug} className="border-b border-rule">
          <Link
            href={`/projects/${p.slug}`}
            className="group grid items-baseline gap-x-8 gap-y-1 py-5 sm:grid-cols-[3.5rem_1fr_14rem]"
          >
            <span className="font-mono text-[11px] text-graphite">{p.year}</span>
            <span>
              <span className="font-display text-lg font-bold tracking-tightest text-ink group-hover:text-signal">
                {p.title}
              </span>
              <span className="mt-1 block max-w-prose text-[14px] leading-relaxed text-graphite">
                {p.teaser}
              </span>
            </span>
            <span className="font-mono text-[11px] text-graphite sm:text-right">
              {p.stack.join(", ")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
