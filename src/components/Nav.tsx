import Link from "next/link";
import { profile } from "@/data/profile";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bench/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="font-display text-[15px] font-bold tracking-tightest text-ink"
        >
          Nolan Pierce
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/#work"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-ink"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-ink sm:inline"
          >
            Experience
          </Link>
          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-ink"
          >
            About
          </Link>
          <a
            href={profile.resume}
            className="border border-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-bench"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
