# ACAC XHTML + Rivets Rules (with external CSS/JS allowed)

## Ground Rules
- **Static site**: All code lives under `/site/`.
- **Pages**: Must be **well-formed XHTML** (`<!DOCTYPE html>`, lowercase tags, quoted attrs, self-closed voids, `alt` on `<img />`, unique IDs).
- **Frontend**: Rivets.js for bindings (`rv-*` only).  
- **External libraries allowed**:
  - CSS frameworks (e.g., **Tailwind CSS**, Bootstrap) may be included.  
  - JS libraries (e.g., Rivets, Chart.js, Alpine.js) may be included.  
  - Imports must use XHTML-valid tags:  
    - Stylesheets: `<link rel="stylesheet" href="…" />`  
    - Scripts: `<script src="…"></script>` (must have closing tag, not self-closed).  

## Rivets Usage
- Bind via `rivets.bind(document.getElementById('app'), state)`.
- Allowed: `rv-text`, `rv-html` (sanitized), `rv-if`, `rv-each-*`, `rv-on-*`.
- Inline event attributes (`onclick`, etc.) are forbidden.

## Process Rules
### Thin Slice
- One page OR one component per PR.
- ≤10 files touched.
- No global refactors in a single PR.

### JOA (Justifiable / Observable / Auditable)
- **Justifiable**: 1–3 bullets tied to outcomes.
- **Observable**: screenshots, XHTML validation output, Rivets checks.
- **Auditable**: PR includes spec, before/after evidence, and linked design doc if relevant.

### ADREI Workflow
- **Analyze** → scope, acceptance, observables.
- **Draft** → plan edits, file list.
- **Review** → human XHTML + Rivets QA.
- **Edit** → apply fixes.
- **Integrate** → merge after screenshots + validator output are attached.

## Observability
- XHTML validation required (browser validator or `xmllint`).
- Attach before/after screenshots or GIFs for interactive behavior.
- PR template serves as audit log.

## Memory Pointers
- Specs and wireframes live in `/docs/design/`.
- Technical references live in `/docs/tech/`.
- Prompts should consult these before Analyze.
