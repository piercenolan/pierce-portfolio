# CLAUDE.md

@CONTEXT.md

## What this project is

Nolan's portfolio site. Its job is to get a hardware/robotics/aerospace hiring manager to look past a CS degree. See CONTEXT.md for the full rationale, project details, and constraints — read it before making any content decision.

## Non-negotiables (see CONTEXT.md for why)

- Never add Boeing screenshots, media, or proprietary detail.
- Never add a third-party company or product logo.
- Never alter, round, or soften the reported metrics (5.81 px ADE tie, 10/12 windows, etc.) — they are load-bearing exactly as measured. If a number isn't clearly sourced, ask before writing it.
- Never "fix" the honest-results framing (LSTM tied not beat, rule-enforcement failed) into something that sounds more impressive. The candor is the point.
- Don't suggest running SAM 3.1 or the LSTM in the turret's live control loop — that's a settled design decision, not an open question.
- The turret has no completed build and no demo media yet — present it as in-progress, not a finished centerpiece.

## Content editing

Site copy belongs in `src/data/profile.ts` and `src/data/projects.ts`. If a content change requires touching component code to work, stop and flag it rather than restructuring components to fit — ask first.

## Working style

- Challenge assumptions instead of agreeing by default. If something looks wrong, say so plainly, explain why, and propose an alternative.
- Lead with the uncomfortable answer first, don't bury it.
- Flag explicitly when you're inferring vs. when you know something for certain.
- Don't soften criticism of ideas, code, or copy to be agreeable.
- Verify before claiming something works — run the build, don't assert it compiles without having compiled it.
- Be concise. This project is worked on around a full-time internship.
- Deadline is ASAP — recruiting is active now. Bias toward shipping over polishing when the two trade off.
