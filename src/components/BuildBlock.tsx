import Link from "next/link";
import type { Project } from "@/data/projects";
import StatusTag from "./StatusTag";

/** Colour follows result semantics: only validated work gets the pass green. */
const stateStyles: Record<NonNullable<Project["build"]>[number]["state"], string> = {
  Validated: "text-pass",
  Written: "text-ink",
  Open: "text-graphite",
};

/**
 * Drawing title block for in-progress hardware. Stands in for demo media that
 * doesn't exist yet: it shows what is actually done on the bench and what
 * isn't, so nothing implies the build is finished.
 */
export default function BuildBlock({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="grid border border-ink bg-panel lg:grid-cols-2">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="eyebrow">{project.kicker}</span>
          <StatusTag status={project.status} />
        </div>

        <h3 className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-tightest sm:text-3xl">
          <Link href={href} className="hover:text-signal">
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-graphite">
          {project.teaser}
        </p>

        <Link href={href} className="link-underline mt-6 text-[14px]">
          Read the design notes
        </Link>
      </div>

      {project.build && (
        <table className="w-full border-t border-ink text-left lg:border-l lg:border-t-0">
          <caption className="sr-only">Build status</caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="eyebrow px-6 py-3 sm:px-8">
                Subsystem
              </th>
              <th scope="col" className="eyebrow px-6 py-3 text-right sm:px-8">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {project.build.map((row) => (
              <tr key={row.item} className="border-b border-rule last:border-0">
                <td className="px-6 py-3 text-[14px] text-ink sm:px-8">{row.item}</td>
                <td className={`px-6 py-3 text-right font-mono text-[12px] sm:px-8 ${stateStyles[row.state]}`}>
                  {row.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}
