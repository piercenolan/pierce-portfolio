---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel (vendored, pinned)
  version: "1.0.0-pinned"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines (pinned copy)

Rules are vendored from vercel-labs/web-interface-guidelines at commit
434b7f91364665f2f733b310ec54809bf8f37937 (command.md, sha256
d246b026f4f29b5823a9cc857f9edf3d2507002e055e32040cadeaf3b38e0234).
Do NOT fetch anything from the network. Read `rules.md` in this folder instead.

1. Read `rules.md` (next to this file).
2. Read the files the user specified (ask for a file or pattern if none).
3. Check against every rule in `rules.md`.
4. Output findings in the terse `file:line` format that `rules.md` specifies.

To update: re-read the upstream file, diff against `rules.md`, review, then change the commit hash above.
