### 🪶 Thin Slice
- [ ] This PR covers **one page OR one component only**
- [ ] ≤10 files touched

### 🧾 JOA (Justifiable / Observable / Auditable)

**Why (≤3 bullets — Justifiable):**
- 

**Observables (manual checks):**
- XHTML validation method + result (e.g. browser validator, `xmllint`)
- Screenshots/GIFs of before/after
- Visual Rivets behavior (e.g. rv-if, rv-on-* events working)

**Auditable Notes:**
- Linked design doc / spec (if applicable)
- Description of what rules were applied

### 🔄 ADREI Pass Log
- Analyze: ✅ scope + acceptance listed
- Draft: ✅ plan + file list shown
- Review: ✅ QA notes (XHTML valid, Rivets tested)
- Edit: ✅ fixes applied
- Integrate: ✅ evidence attached (screenshots, validator output)

### 📸 Evidence
Attach before/after screenshots or GIFs here.

---

⚠️ Guardrails:
- No inline event handlers (use `rv-on-*`)
- XHTML strict syntax (quoted attrs, self-closed voids, unique IDs, `alt` on `<img />`)
- External libraries allowed, but imports must be XHTML-valid (`<script>` closed, `<link />` self-closed)
