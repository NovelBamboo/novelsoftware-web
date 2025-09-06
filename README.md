# ACAC XHTML + Rivets Site

Static website scaffolded for the **ACAC** approach:  
- **XHTML-strict pages** (`/site/`)  
- **Rivets.js** for light interactivity (`rv-*` binders only)  
- **External libraries allowed**, but imports must be XHTML-valid  
- **Cline** agent configured for Thin Slice / JOA / ADREI workflow

---

## 📂 Project Layout

```

.cline/              # Cline rules, prompts, messages, memory
context.md         # Authoritative rules (XHTML, Rivets, Thin Slice)
prompts/           # Task prompts (e.g. adrei.thin-slice.md)
messages/          # Guardrails (scope-guard.md)
memory/            # Local state (gitignored; only .gitkeep committed)

docs/                # Design docs, wireframes, specs
design/

site/                # Source of truth for the site
index.html         # Entry point (XHTML strict)
pages/             # Additional static pages
assets/            # CSS, JS, Rivets library
media/             # Images / static assets

```

---

## 🚦 Ground Rules

- Pages must be **well-formed XHTML** (`<!DOCTYPE html>`, lowercase tags, quoted attrs, self-closed voids, `alt` on `<img />`, unique IDs).  
- **Rivets.js only** for binding (`rv-text`, `rv-if`, `rv-each-*`, `rv-on-*`).  
- **No inline event handlers** (`onclick` etc.).  
- **External libraries** may be imported, but only via valid `<script>` / `<link />` tags.  
- **Static only**: no SSR, no build pipeline required.  

---

## 🔄 Workflow (ADREI)

All changes follow **Thin Slice / JOA / ADREI**:

1. **Analyze** → Confirm scope, acceptance, observables.  
2. **Draft** → Plan edits (≤10 files).  
3. **Review** → Human QA (XHTML validity, Rivets behavior).  
4. **Edit** → Apply fixes.  
5. **Integrate** → Merge after evidence (screenshots, validation) is attached.  

**Thin Slice:** one component or one page per PR, ≤10 files changed.  
**JOA:** each PR includes Justifiable / Observable / Auditable evidence.  

---

## 🛠️ Local Development

- Open `/site/index.html` directly in a browser (no build needed).  
- Run XHTML validation before PR (browser validator or `xmllint`).  
- Manual checks:
  - Load page, test Rivets bindings.
  - Attach before/after screenshots or GIFs in PR.

---

## 🤖 Using Cline

Cline is configured via `.cline/config.json`.  
- Autonomy = **ask**: Cline stops after **Analyze** until you approve.  
- Use `.cline/prompts/adrei.thin-slice.md` for new work.  
- If a request spans multiple scopes, Cline will reply with `.cline/messages/scope-guard.md`.  

---

## ✅ PR Checklist

- [ ] One slice only (component/page)  
- [ ] ≤10 files changed  
- [ ] XHTML validation passes  
- [ ] Rivets bindings working (no inline events)  
- [ ] Screenshots/GIFs attached (before/after)  
- [ ] JOA evidence included in PR body  

---

## 📎 Notes

- Design docs, specs, and wireframes live under `/docs/design/`.  
- `.cline/memory/` is local scratch space — don’t commit generated files.  
- `.clineignore` is optional; add it if large binaries or irrelevant assets appear.  
```