Generate in `/component/barrier-card-component.html`
Manage any dynamic state in browser local cache
Use canvas to Generate code for XHTML, Tailwind, Rivets js component:
# Component Design Spec — “Barrier Cards” Section

This spec turns your slide (“Why Software Doesn’t Get Built”) into a rigorously defined, production-ready web component. It inherits the structure and conventions from your existing NCC design-spec patterns.&#x20;

---

## 1) Intent

Explain—at a glance—three core blockers to shipping software. Must scan in <4s, read in <30s, and work on any screen.

---

## 2) Anatomy

* **Section (region)** — container with `aria-labelledby` → H1 id.
* **Heading (H1)** — “Why Software Doesn’t Get Built”.
* **Cards Grid** — responsive 1–3 column layout.

  * **Card** (×3)

    * **Title (H2)** — “Intimidation”, “Technical Hurdles”, “Poor Communication”.
    * **Body (P)** — 1–3 short sentences.

**Required:** section, H1, ≥1 card with title.
**Optional:** card body; CTA slot if used as link list.

---

## 3) Design Tokens (single source of truth)

```
{
  "color": {
    "pageBg": "#FAFAFB",
    "cardBg": "#142A6A",
    "heading": "#111417",
    "cardTitle": "#FFFFFF",
    "cardBody": "#FFFFFF",
    "focus": "#2F6BFF",
    "cardBgActiveOverlay": "rgba(255,255,255,0.04)"
  },
  "type": {
    "family": "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    "h1": { "size": "clamp(28px, 4vw, 56px)", "line": 1.1, "weight": 800, "tracking": "-0.01em" },
    "h2": { "size": "clamp(18px, 2.2vw, 24px)", "line": 1.25, "weight": 700 },
    "body": { "size": "clamp(15px, 1.8vw, 18px)", "line": 1.6, "weight": 400 }
  },
  "space": {
    "containerY": "72px",
    "containerX": "24px",
    "gridGap": "24px",
    "cardPad": "24px",
    "titleGap": "8px"
  },
  "radius": { "card": "12px" },
  "shadow": {
    "rest": "0 2px 6px rgba(0,0,0,0.08)",
    "hover": "0 6px 18px rgba(0,0,0,0.16)"
  },
  "motion": { "duration": "160ms", "easing": "cubic-bezier(0.2, 0, 0.2, 1)" },
  "breakpoints": { "sm": 640, "md": 832, "lg": 1024, "xl": 1280 }
}
```

---

## 4) Layout Rules

* **Max width:** 1200px; center with auto margins.
* **Grid:**

  * `< sm`: 1 column
  * `sm–lg`: 2 columns
  * `≥ lg`: 3 columns
* **Card min height:** 240px (content-driven; no text truncation).
* **Heading alignment:** left on desktop; center on small screens.
* **Typographic rhythm:** `titleGap` between H2 and body; paragraph spacing managed by line-height (no extra `<br>`).

---

## 5) Variants & Props (framework-agnostic)

```
type Tone = "default" | "alt";
type Columns = 1 | 2 | 3;

interface BarrierCard {
  id: string;
  title: string;    // required, ≤ 30 chars recommended
  body?: string;    // ≤ 240 chars, sentence case
  href?: string;    // optional: make card a link
  newTab?: boolean; // if href
}

interface BarrierCardsSectionProps {
  heading: string;              // default: "Why Software Doesn't Get Built"
  cards: BarrierCard[];         // 1..n, optimised for 3
  tone?: Tone;                  // "alt" can swap cardBg token
  columns?: Partial<Record<"sm"|"md"|"lg", Columns>>; // optional overrides
  trackingId?: string;          // telemetry namespace
}
```

---

## 6) States & Interactions

* **Default:** filled cardBg, white text, `shadow.rest`.
* **Hover:** `shadow.hover` + subtle `transform: translateY(-2px)`.
* **Focus (keyboard):** 2px outside focus ring using `color.focus` (≥3:1 contrast).
* **Active (press):** overlay `cardBgActiveOverlay` + remove translate.
* **Disabled:** reduce opacity to 60%, pointer-events none (rare; avoid if static content).
* **Link mode:** entire card is one interactive target (≥44×44 px hit area).

---

## 7) Accessibility

* Semantic headings: `h1` then card `h2` in document order.
* If cards are links or buttons, apply proper roles and names; ensure one tab stop per card.
* **Contrast:** cardBg `#142A6A` vs white text ≈ 9:1 (AA+). Hover/active states maintain ≥ 4.5:1.
* Support **RTL** (logical properties / grid-auto-flow reversed).
* Announce navigation on link activation (no JS hijacking without `aria-live`).

---

## 8) Content Rules

* Titles are **Title Case**; bodies **Sentence case**.
* No industry jargon; 6th–8th grade readability.
* Avoid lists inside cards; keep to short paragraphs (≤3 sentences).
* Localization: allow 1.6× text expansion; cards grow vertically.

---

## 9) Theming (light/dark)

* **Dark mode:**

  * pageBg `#0E0F13`, heading `#FFFFFF`
  * cardBg `#1C377F`, text `#FFFFFF`
  * focus `#4C79FF`
* Expose tokens; never hardcode hex in component CSS.

---

## 10) Performance

* Zero images/gradients; pure CSS background color.
* Motion limited to `transform` and `box-shadow`.
* LCP target <2.5s (text heading).
* CLS 0 (no late layout shifts).
* No JS required for static version.


## 12) Edge Cases

* **0 cards:** hide section.
* **1 card:** center, max-width 640px.
* **>3 cards:** wrap to 2nd row with equal gaps.
* **Very long titles:** clamp to 2 lines with ellipsis; keep full text in `title` attribute.

---

## 13) Acceptance Criteria (binary)

* [ ] Renders 3 cards in 3/2/1 layout at ≥1024/≥640/<640 px.
* [ ] All interactive states meet contrast and focus visibility requirements.
* [ ] No overflow or truncation in English or 1.6× expansion.
* [ ] RTL and dark mode render without visual regressions.
* [ ] Optional link mode yields single tab stop per card.
* [ ] Telemetry (if enabled) emits exactly once per view.
