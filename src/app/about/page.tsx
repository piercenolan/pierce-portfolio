import Image from "next/image";
import type { Metadata } from "next";
import { profile, coursework } from "@/data/profile";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Nolan Pierce",
  description:
    "Stanford computer science student building the software layer of physical systems — perception pipelines, real-time control loops, and embedded code that drives actuators.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-tightest sm:text-5xl">
          I build the software that makes physical systems move.
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.5fr]">
        <Reveal delay={60}>
          <div className="max-w-prose space-y-5 text-[15.5px] leading-relaxed text-graphite">
            <p>
              I&rsquo;m a computer science student at Stanford specializing in visual
              computing, currently focused on the layer where software meets physical
              hardware &mdash; perception pipelines, real-time control loops, and the
              embedded code that drives actuators.
            </p>
            <p>
              What draws me to this work is the feedback loop. Writing code is most
              rewarding to me when its output is something I can observe directly: a servo
              that responds to a sensor reading, a camera rig that tracks a moving target,
              an environment that behaves the way a physical installation does. Engineering
              a system end to end &mdash; and then measuring whether it actually performs
              &mdash; is the part of the work I pursue on my own time.
            </p>
            <p>
              That interest has shaped what I build. I&rsquo;ve developed a multi-object
              tracking and trajectory forecasting pipeline benchmarked against a physics
              baseline, closed sensor-to-actuator control loops on microcontroller hardware,
              and a two-axis pan-tilt tracking rig currently in assembly. Each one required
              the same combination: write the perception software, program the
              microcontroller, wire the hardware, and validate the result against a
              measurement rather than an impression.
            </p>
            <p>
              At Boeing this summer I built a real-time 3D environment that scaled a single
              physical showcase into a virtual showroom reachable from any site &mdash;
              translating a physical installation into an interactive system, and presenting
              it live to Boeing leadership.
            </p>
            <p>
              I&rsquo;ve been accepted to Stanford&rsquo;s coterminal master&rsquo;s program
              in Computer Science, where I&rsquo;ll concentrate in artificial intelligence.
              I&rsquo;m targeting mechatronics integration, computer engineering, and test
              engineering roles &mdash; work that takes a design and makes it real,
              reliable, and repeatable, and where a software background is an asset rather
              than a detour.
            </p>
            <p>
              This fall I&rsquo;ll be studying abroad in Berlin, where I&rsquo;m pursuing
              hands-on time in production engineering and robotics labs.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <div className="border border-rule bg-panel p-3">
              <Image
                src="/images/headshot.jpeg"
                alt="Nolan Pierce"
                width={600}
                height={750}
                className="h-auto w-full"
              />
            </div>

            <div className="mt-8 border-t border-ink pt-4">
              <p className="eyebrow">Education</p>
              <p className="mt-2 text-[14px] leading-snug text-ink">{profile.school}</p>
              <p className="mt-2 text-[14px] leading-snug text-ink">{profile.gradSchool}</p>
              <ul className="mt-4 space-y-1.5">
                {coursework.map((c) => (
                  <li key={c.code} className="text-[13px] leading-snug text-graphite">
                    <span className="font-mono text-[11px] text-measure">{c.code}</span>{" "}
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={profile.resume}
              className="mt-8 inline-block border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-bench"
            >
              Download résumé
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
