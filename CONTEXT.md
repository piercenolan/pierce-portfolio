# Context: Nolan Pierce Portfolio Site

Durable background for this project. Edited for clarity from the owner's own account — nothing here is invented or extrapolated.

## Who I Am

Nolan Pierce. Stanford CS undergrad, Visual Computing specialization, GPA 3.7, expected graduation 06/2027. Currently a Systems Engineering Intern at Boeing Global Services (Data & Analytics, VR Simulation & Modeling), summer 2026.

## The Pivot — the single most important thing to understand

I am deliberately moving out of pure software and into hands-on hardware work. Mechatronics is the strongest fit and stays the primary target, but I'm not narrowing to just that one field — EE and Computer Engineering hardware-leaning roles are also in scope. Target roles, in priority order:

1. Mechatronics Integration Engineer (primary)
2. NPI Engineer / Production Engineer
3. Test & Evaluation Engineer
4. EE / Computer Engineering roles with a hands-on hardware focus

The distinction that matters most: **I want to build, assemble, wire, integrate, and test systems from an existing design.** In intro EE (ENGR40M) I struggled with solving and originating circuit schematics on paper, and that initially ruled EE out for me. That's softening — the more I actually work with electronics, the more I'm enjoying it, so EE and Computer Engineering are back on the table, not written off. I still ruled out the ME path because of its physics-theory load. I dislike web dev, pure SWE, and algorithm-design work.

My CS background is not something I'm apologizing for or hiding — it's why I'm useful in mechatronics. I can write the perception pipeline, build the simulation, and program the microcontroller driving the actuator.

## The Obstacle

Most mechatronics and NPI job postings filter for ME or EE degrees. A CS degree gets auto-rejected by ATS before a human reads it. My strategy is two-pronged: build genuine hardware credibility (coursework + real physical projects), and route around ATS entirely via referrals and networking. **The portfolio site is a core part of the second prong** — it exists to give a human reason to look past the major field.

## Timeline

- Summer 2026: Boeing internship (current). Applying for full-time conversion — I am NOT eligible for intern-to-intern conversion, my graduation date is before the cutoff.
- Fall 2026: Study abroad in Berlin (Stanford BOSP, hosted at FU Berlin). Plan to cold-email TU Berlin production-engineering and robotics-hardware labs for part-time hands-on shop time.
- Winter 2027: CS capstone + ME210 (Intro to Mechatronics) + one more course. Schedule is fixed; no flexibility.
- Spring 2027: One more mechatronics/ME course (not yet chosen) + join a Stanford build team.
- June 2027: Graduate. High likelihood of an AI coterm, conditional on landing a paid TA position — unresolved.

## The Projects and Why Each Exists

**Multi-Agent Tracking & Trajectory Forecasting** (shipped, 2026) — the technical rigor showpiece. SAM 3.1 multi-object player tracking on SportsMOT basketball video feeding a residual, rule-conditioned LSTM that predicts 4 frames from an 8-frame observation window. Trained on GPU via Modal.

Key measured results (these numbers are load-bearing — never alter them):
- 5.81 px median forecast ADE — **tied** the constant-velocity linear baseline (5.81 px). Did not beat it.
- Beat a plain LSTM on 10 of 12 temporal windows (plain LSTM: 10.68 px).
- Beat the linear baseline on 5 of 12 windows individually.
- Hard post-hoc game-rule enforcement increased error on all 12 rules — a negative result reported deliberately.
- 3 of 12 evaluation windows failed on every model; root cause traced to upstream tracking breakdown, not the forecaster.
- Evaluated across 4 SportsMOT clips; cross-clip transfer held within ~0.2 px of per-clip training.

**Predictive Tracking Turret** (in progress, 2026) — the intended centerpiece. A 2-axis pan-tilt camera rig that tracks a moving object and aims *ahead* of it. Laptop runs OpenCV color-blob tracking plus constant-velocity extrapolation; predicted pixel coords convert to pan/tilt angles and go over USB serial to an Arduino driving two SG90 servos.

Critical design decision, already settled — do not suggest reversing it: the live loop deliberately does NOT run SAM 3.1 or the LSTM. Both are too heavy for real-time laptop inference and would add latency to a control loop. The lightweight predictor is justified by the measurement above (the LSTM only tied constant velocity). This is the strategic point of the whole project: it converts the CV research into a real physical control system, the exact bridge from "CS major" to "mechatronics candidate."

Status: perception and prediction validated on webcam. Arduino serial listener written. Mechanical assembly, pixel-to-angle mapping, and loop tuning still to do. Servos run on external 5V, not the board rail. No physical build is complete yet, so there is no demo media (photos/video) for this project. The site must present it explicitly as in-progress — don't imply it's finished or that demo assets exist.

**Distance-Triggered Servo Gate** (complete, 2026) — warm-up build. HC-SR04 ultrasonic sensor triggering an SG90 servo: a closed sense→decide→actuate loop. Built, wired, and debugged in 1.5 hours against a 3-day estimate. Its purpose was hardware fluency before the turret, not resume weight. Demo video is an unlisted YouTube Short (vertical 9:16).

**Custom Heap Allocator** (C, CS107), **Huffman Compressor** (C++, CS106B), **Warehouse Wreckage** (Unreal Engine 5) — secondary projects. Warehouse Wreckage matters only because it's where the Unreal Engine work started that later became production simulation work at Boeing. Source for the two coursework projects is restricted by academic policy.

## Hard Constraints — never violate these

- **No Boeing work product on the site, ever.** No screenshots, no media, no proprietary detail. Not permitted to share any of it. The site notes this explicitly instead.
- **No third-party company logos anywhere** — not Boeing, not Unreal Engine, not any employer or tool.
- **Never inflate or round a metric.** Every number on the site must trace to actual results or résumé. If unsure whether a claim is backed, ask rather than write it.
- **The honest-results framing is deliberate, not an oversight.** The site states plainly that the LSTM tied rather than beat the baseline, and that a rule-enforcement approach failed. That framing is the strategic point: it demonstrates measurement discipline, which is what hardware and test engineering hiring managers screen for. Do not "improve" this into stronger-sounding claims.

## Site Status

This is a complete revamp of an old portfolio site, not an incremental update — the previous site is being replaced. Deployment target is Vercel; as of now the site is not deployed or live anywhere. Deadline is ASAP — active recruiting/networking is underway now, this is not a background project.

## Site Purpose

Audience: recruiters and engineering hiring managers at hardware, robotics, aerospace, and semiconductor-equipment companies. The page's single job is to convince a hardware-oriented reader that a CS major has real hands-on capability plus genuine technical rigor.

Design system already established — colors derive from the matplotlib tab10 cycle used in the owner's own research figures, so the charts sit natively in the page. Type is Archivo (display), IBM Plex Sans (body), IBM Plex Mono (data and labels). The signature device is the `[LABEL]` annotation block — dimension callouts borrowed from engineering drawings, used to place the measured number or honest caveat beside each claim. Keep it. All site copy lives in `src/data/profile.ts` and `src/data/projects.ts`; content edits should not require touching component code.
