import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/data/projects";
import StatusTag from "@/components/StatusTag";
import Callout from "@/components/Callout";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nolan Pierce`,
    description: project.teaser,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const vertical = project.video?.aspect === "9/16";
  // An embed can fail for reasons the site cannot control — embedding disabled
  // on the video, or a network that blocks YouTube outright, which is common on
  // corporate and defence-contractor networks. Always offer the direct link.
  const watchUrl =
    project.video &&
    (project.video.watchUrl ??
      (project.video.url.match(/\/embed\/([\w-]+)/)?.[1]
        ? `https://www.youtube.com/watch?v=${project.video.url.match(/\/embed\/([\w-]+)/)![1]}`
        : undefined));

  return (
    <>
      <article>
        {/* Header */}
        <header className="relative overflow-hidden border-b border-rule">
          <div className="graticule graticule-fade absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
            <Link
              href="/#work"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-ink"
            >
              ← All work
            </Link>

            <div className="mt-8 flex items-center gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                {project.kicker} · {project.year}
              </span>
              <StatusTag status={project.status} />
            </div>

            <h1 className="mt-3 max-w-3xl font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-tightest sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-graphite sm:text-[17px]">
              {project.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-rule pt-4">
              {project.stack.map((s) => (
                <span key={s} className="font-mono text-[11px] text-graphite">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
          {/* Callouts — the measured facts, before the prose. */}
          {project.callouts.length > 0 && (
            <Reveal>
              <div className="mb-14 grid gap-5 sm:grid-cols-2">
                {project.callouts.map((c) => (
                  <Callout
                    key={c.label + c.text}
                    label={c.label}
                    text={c.text}
                    tone={c.tone}
                  />
                ))}
              </div>
            </Reveal>
          )}

          {/* Video */}
          {project.video && (
            <Reveal>
              <div className="mb-14">
                <div
                  className={`mx-auto border border-rule bg-black ${
                    vertical ? "max-w-sm" : "max-w-3xl"
                  }`}
                >
                  <div
                    className={`relative w-full ${
                      vertical ? "aspect-[9/16]" : "aspect-video"
                    }`}
                  >
                    <iframe
                      src={project.video.url}
                      title={project.video.label}
                      allow="encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
                  {project.video.label}
                  {watchUrl && (
                    <>
                      {" · "}
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        Watch on YouTube
                      </a>
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          )}

          {/* Prose */}
          <div className="space-y-12">
            {project.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 50}>
                <section className="grid gap-x-10 gap-y-3 border-t border-ink pt-5 lg:grid-cols-[0.42fr_1fr]">
                  <h2 className="font-display text-lg font-bold leading-tight tracking-tightest">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.body.map((p) => (
                      <p key={p} className="text-[15px] leading-relaxed text-graphite">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Figures */}
          {project.figures && project.figures.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <p className="eyebrow border-t border-ink pt-5">Figures</p>
              </Reveal>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.figures.map((fig, i) => (
                  <Reveal
                    key={fig.src}
                    delay={i * 60}
                    className={fig.wide ? "sm:col-span-2" : ""}
                  >
                    <Figure
                      src={fig.src}
                      caption={fig.caption}
                      index={i + 1}
                      wide={fig.wide}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Next project */}
      <nav className="border-t border-rule bg-panel">
        <Link
          href={`/projects/${next.slug}`}
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-10 sm:px-8"
        >
          <div>
            <p className="eyebrow">Next project</p>
            <p className="mt-2 font-display text-2xl font-bold leading-tight tracking-tightest transition-colors group-hover:text-signal sm:text-3xl">
              {next.title}
            </p>
          </div>
          <span className="font-mono text-2xl text-graphite transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </nav>
    </>
  );
}
