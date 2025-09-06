'"$@"'
# Scope Guard — Thin Slice Refusal (XHTML + Rivets, external libs allowed)

This request spans multiple components/pages or violates project rules. Per **Thin Slice**, I will **not** proceed as-is.

## What I can do instead
I propose breaking this into focused slices. Please pick **one**:

1) <slice-1-title> — <one-sentence outcome>
2) <slice-2-title> — <one-sentence outcome>
3) <slice-3-title> — <one-sentence outcome>

(Reply with the number to proceed. I’ll run **ADREI** and stop after **Analyze** for approval.)

---

## Non-negotiable guardrails (summary)
- **Thin Slice**: one page **or** one component only; **≤10 files** touched.
- **XHTML**: pages must be well-formed XHTML (`<!DOCTYPE html>`, `xmlns`, lowercase tags/attrs, quoted attrs, self-closed voids, `alt` on images, unique IDs).
- **Rivets**: bindings via `rv-*` only (`rv-text`, `rv-if`, `rv-each-*`, `rv-on-*`); **no inline events** like `onclick`.
- **External libs allowed**: import JS/CSS via XHTML-valid `<script src="…"></script>` and `<link rel="stylesheet" … />`. No server-side runtimes; no secrets in client code.
- **Static repo**: everything lives under `/site/` (HTML/CSS/JS/assets). No build pipelines or SSR frameworks.

---

## If the request referenced an “attached” file
I need a real path in the repo. Please confirm the location (e.g., `/docs/design/wireframe-spec.md` or `/docs/design/sketches/homepage.png`). If it’s not in the repo, add it under `docs/` and re-run.

---

## Examples of out-of-scope asks (I will refuse)
- Multi-page redesign in one go; global refactors across many files.
- Introducing SSR frameworks or build pipelines.
- Shipping API keys/secrets to the browser.
- Inline event handlers or non-XHTML-compliant markup.

---

## Confirmation prompt (I will send after you pick a slice)
“Proceed with **Analyze** for: <chosen-slice-title>? I will list acceptance criteria, observables, and the exact files (≤10) I plan to touch and stop for approval.”
