import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { getImageDimensions } from "@/data/imageDimensions";
import StatusTag from "./StatusTag";
import Callout from "./Callout";

/** Full-width project row: figure on one side, the measured results beside it.
 *  The callouts sit next to the image so the numbers are read with the evidence. */
export default function ProjectSpread({
  project,
  flip = false,
}: {
  project: Project;
  flip?: boolean;
}) {
  const href = `/projects/${project.slug}`;
  const dims = project.hero ? getImageDimensions(project.hero) : null;

  return (
    <article className="grid gap-8 border-t border-ink pt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {project.hero && dims && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block self-start border border-rule bg-white ${flip ? "lg:order-2" : ""}`}
        >
          <Image
            src={project.hero}
            alt=""
            width={dims.width}
            height={dims.height}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="h-auto w-full"
          />
        </Link>
      )}

      <div>
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

        <div className="mt-6 space-y-4">
          {project.callouts.map((c) => (
            <Callout key={c.label} label={c.label} text={c.text} tone={c.tone} />
          ))}
        </div>

        <Link href={href} className="link-underline mt-6 text-[14px]">
          Read the full write-up
        </Link>
      </div>
    </article>
  );
}
