import Link from "next/link";
import { profile, experience, skillGroups, coursework } from "@/data/profile";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SpecStrip from "@/components/SpecStrip";
import Reveal from "@/components/Reveal";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <>
      {/* HERO — the thesis, stated as a measured claim rather than a tagline. */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="graticule graticule-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="eyebrow">{profile.role}</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tightest sm:text-6xl lg:text-7xl">
              Software that has to
              <br />
              survive contact with
              <br />
              <span className="text-signal">hardware.</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-graphite sm:text-[17px]">
              {profile.positioning}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bench transition-opacity hover:opacity-85"
              >
                See the work
              </Link>
              <a
                href={profile.resume}
                className="border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-bench"
              >
                Download résumé
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-14">
              <SpecStrip />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tightest sm:text-4xl">
              Three systems, one thread: perception feeding something physical.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="eyebrow mt-16">Other projects</p>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-b border-rule bg-panel">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="eyebrow">Experience</p>
          </Reveal>

          <div className="mt-8">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={i * 60}>
                <article className="grid gap-x-10 gap-y-4 border-t border-rule py-8 lg:grid-cols-[1fr_1.6fr]">
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tightest">
                      {job.org}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-snug text-graphite">
                      {job.role}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-graphite">
                      {job.dates} · {job.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-[15px] font-medium leading-relaxed text-ink">
                      {job.summary}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {job.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-4 text-[14px] leading-relaxed text-graphite before:absolute before:left-0 before:top-[0.65em] before:h-[3px] before:w-[3px] before:bg-graphite"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    {job.note && (
                      <p className="mt-4 border-l-2 border-rule pl-3 font-mono text-[11px] leading-snug text-graphite">
                        {job.note}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                      {job.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] text-graphite">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="eyebrow">Capabilities</p>
          </Reveal>

          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <div className="border-t border-ink pt-4">
                  <h3 className="font-display text-[15px] font-bold tracking-tightest">
                    {group.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-[13.5px] leading-snug text-graphite">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 border-t border-rule pt-6">
              <p className="eyebrow">Relevant coursework · Stanford</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {coursework.map((c) => (
                  <p key={c.code} className="text-[13.5px] text-graphite">
                    <span className="font-mono text-[11px] text-measure">{c.code}</span>{" "}
                    {c.name}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
