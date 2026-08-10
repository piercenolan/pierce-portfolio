import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-rule bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tightest sm:text-4xl">
          Open to mechatronics, computer engineering, hardware integration, and test
          engineering roles.
        </h2>
        <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${profile.email}`} className="link-underline mt-1 text-sm">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="eyebrow">LinkedIn</p>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-1 text-sm"
            >
              linkedin.com/in/piercenolan
            </a>
          </div>
          <div>
            <p className="eyebrow">GitHub</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-1 text-sm"
            >
              github.com/piercenolan
            </a>
          </div>
        </div>
        <p className="mt-12 font-mono text-[11px] text-graphite">
          © {new Date().getFullYear()} Nolan Pierce · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
