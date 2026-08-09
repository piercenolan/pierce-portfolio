import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import StatusTag from "./StatusTag";

export default function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col border border-rule bg-panel transition-colors hover:border-ink"
    >
      {project.hero ? (
        <div
          className={`relative overflow-hidden border-b border-rule bg-white ${
            large ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.hero}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          className={`graticule flex items-center justify-center border-b border-rule bg-white ${
            large ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
            Build in progress
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
            {project.kicker}
          </span>
          <StatusTag status={project.status} />
        </div>

        <h3
          className={`mt-2.5 font-display font-bold leading-[1.15] tracking-tightest text-ink ${
            large ? "text-2xl" : "text-xl"
          }`}
        >
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
