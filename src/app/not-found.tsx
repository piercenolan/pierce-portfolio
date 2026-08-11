import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Not found — Nolan Pierce",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="relative overflow-hidden">
      <div className="graticule graticule-fade absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 max-w-2xl font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-tightest sm:text-5xl">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-graphite">
          The address doesn&rsquo;t match anything on this site. The work is below,
          or start from the top.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bench transition-opacity hover:opacity-85"
          >
            Home
          </Link>
          <Link
            href="/#work"
            className="border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-bench"
          >
            All work
          </Link>
        </div>

        <div className="mt-14 border-t border-ink pt-5">
          <p className="eyebrow">Featured projects</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {featured.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-display text-lg font-bold tracking-tightest text-ink transition-colors hover:text-signal"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
