import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import StatusTag from "./StatusTag";

/** Grid-safe card: fills the full height of its grid cell so every card in a
 *  row is the same size regardless of how long its teaser runs. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-rule bg-panel transition-colors hover:border-ink"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-white">
        {project.hero ? (
          <Image
            src={project.hero}
            alt=""
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="graticule flex h-full w-full items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
              Build in progress
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
            {project.kicker}
          </span>
          <StatusTag status={project.status} />
        </div>

        <h3 className="mt-2.5 font-display text-xl font-bold leading-[1.15] tracking-tightest text-ink">
          {project.title}
        </h3>

        <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-graphite">
          {project.teaser}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="font-mono text-[10px] text-graphite">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
