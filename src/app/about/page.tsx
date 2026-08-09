import Image from "next/image";
import type { Metadata } from "next";
import { profile, coursework } from "@/data/profile";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Nolan Pierce",
  description:
    "Stanford computer science student moving from software into mechatronics integration and hardware-software systems.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-tightest sm:text-5xl">
          I started in software. I kept ending up at the hardware.
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.5fr]">
        <Reveal delay={60}>
          <div className="max-w-prose space-y-5 text-[15.5px] leading-relaxed text-graphite">
            <p>
              I&rsquo;m a computer science student at Stanford specializing in visual
              computing, and I build systems that sit on the boundary between code and
              physical hardware. That boundary is where I&rsquo;ve found the work I actually
              want to do.
            </p>
            <p>
              The pattern showed up in coursework before I recognized it. In introductory
              electrical engineering, the analytical circuit theory never clicked &mdash;
              but building the physical device from a given schematic did, immediately.
              The same thing happened in systems programming: the closer the work got to
              the machine, the more it held my attention. Robotics coursework confirmed
              it.
            </p>
            <p>
              So I&rsquo;m targeting mechatronics integration and manufacturing engineering
              &mdash; roles that take an existing design and make it real, reliable, and
              repeatable. Assembly, wiring, bring-up, test, and the debugging cycle where
              something fails and you figure out exactly why.
            </p>
            <p>
              My computer science background isn&rsquo;t something I&rsquo;m leaving behind;
              it&rsquo;s the reason I&rsquo;m useful in that role. I can write the perception
              pipeline, build the simulation environment, and program the microcontroller
              that drives the actuator. That combination is the whole point of mechatronics.
            </p>
            <p>
              At Boeing this summer I built a real-time 3D environment that scaled a single
              physical showcase into a virtual showroom reachable from any site. Alongside
              that I&rsquo;ve been building hardware directly &mdash; closed
              sensor-to-actuator control loops, and now a pan-tilt tracking rig that applies
              what my computer vision research measured to a real-time physical control
              system.
            </p>
            <p>
              I&rsquo;ll be studying abroad in Berlin this fall, where I&rsquo;m looking to
              spend time in production engineering and robotics labs doing hands-on work.
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
