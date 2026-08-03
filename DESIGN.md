---
version: 3.0
updated: 2026-08-03
name: ai-wiki-constellation-design
description: "A deep-space, dark-first knowledge-graph reader for a personal AI wiki. The system is monochrome ink plus exactly one accent per content domain — luminous aqua (#5eead4) for the core LLM-software domain and amber (#f0a868) for the physical-AI domain. The accent is a single token (`--signal`) that a `[data-domain]` scope re-points, so links, hover borders, the active filter chip, the focus ring, the reading progress bar, the tag cloud, the study-path steps, and the graph canvases all re-tint together. Global chrome (header, footer, search modal) stays aqua in every domain. Three fonts split by role: Space Grotesk for Latin display (wordmark, hero stats, eyebrows), Pretendard Variable for Korean + body, JetBrains Mono for meta/tags/code. It is hand-written CSS (no Tailwind, no shadcn) organized with @layer tokens/base/components/utilities; tokens are CSS custom properties. Signatures are an animated constellation canvas hero, a card-grid feed whose hover highlights each card's graph neighbors, a full force-directed graph explorer at /graph/, and a tag index at /tags/. Rendered as a static site (build.mjs → GitHub Pages under /ai-wiki), themed dark by default with an opt-in light override via `data-theme` on `<html>`."

colors:
  # Dark theme — the default (:root). "deep space ink"
  bg: "#0b0e14"
  surface: "#141923"
  surface-2: "#1b2230"
  text: "#e6e9ef"
  muted: "#8a93a3"
  faint: "#5a6373"
  hairline: "#232a38"
  signal: "#5eead4"                 # luminous aqua — the core-domain accent (and the default)
  signal-dim: "rgba(94,234,212,0.25)"  # edge / glow / selection / underline
  signal-physical: "#f0a868"           # amber — the physical-AI domain accent
  signal-physical-dim: "rgba(240,168,104,0.25)"
  # Light theme — opt-in override (:root[data-theme='light'])
  bg-light: "#f7f8fa"
  surface-light: "#ffffff"
  surface-2-light: "#f1f3f7"
  text-light: "#161a22"
  muted-light: "#5c6473"
  faint-light: "#9aa2b0"
  hairline-light: "#e3e7ee"
  signal-light: "#0fb89b"
  signal-dim-light: "rgba(15,184,155,0.18)"
  signal-physical-light: "#a85b12"
  signal-physical-dim-light: "rgba(168,91,18,0.18)"

domains:   # content domains — each owns exactly one accent; see "The Signal Principle"
  core:
    categories: "database · llms · agents · evaluations · applications · etc · overviews"
    accent: "{colors.signal}"          # aqua — also the fallback for any unmapped category
  physical:
    categories: "physical-ai"
    accent: "{colors.signal-physical}"  # amber
  mechanism: "[data-domain='physical'] re-points --signal / --signal-dim to the physical pair. Scoped to <main> and to per-group sections; global chrome sits outside and stays aqua."
  source: "site/lib/domains.mjs — CATEGORY_DOMAIN map + domainOf(category), default 'core'. graph.json nodes carry a resolved `domain` field so canvas scripts never hold a category list."

typography:
  fontRoles:
    display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif"   # --font-display: Latin wordmark, hero stats, eyebrows
    body: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif"  # --font-body: Korean + body, headings
    mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', 'Menlo', monospace"  # --font-mono: meta, tags, chips, nav, code
  scale:   # modular ~1.2, rem
    text-xs: 0.78rem     # eyebrows, meta, tags, chips, footer, kbd
    text-sm: 0.875rem    # captions, card desc, nav, TOC, tables
    text-base: 1rem      # body copy, card titles
    text-lg: 1.15rem     # h4, wordmark, hero lede, search input
    text-xl: 1.4rem      # h3, band name
    text-2xl: 1.75rem    # h2, hero stat values
    text-3xl: 2.2rem     # h1 / wiki + hero title
  leading:
    body: 1.7            # --leading-body — Korean readability
    tight: 1.25          # --leading-tight — headings
  notes:
    - "Headings use --font-body (Pretendard), weight 700, letter-spacing -0.01em, text-wrap: balance."
    - "Korean line-breaking: word-break: keep-all + overflow-wrap: anywhere on <body>."
    - "Hero/wiki title: clamp() responsive; Space Grotesk only for Latin display strings."

spacing:   # 4px base (--space-*)
  space-1: 0.25rem
  space-2: 0.5rem
  space-3: 0.75rem
  space-4: 1rem
  space-6: 1.5rem
  space-8: 2rem
  space-12: 3rem

rounded:
  radius-sm: 4px      # code, chips, kbd, focus-ring, skip target
  radius-md: 8px      # buttons, nav, filter chips, inputs, sheets, pre
  radius-lg: 14px     # cards, prev/next, search panel — the card radius

motion:
  dur: 0.18s
  ease: "cubic-bezier(0.4, 0, 0.2, 1)"
  note: "Everything is color/border/transform only. prefers-reduced-motion → ~0ms."

layout:
  measure: 72ch           # --measure — wiki reading column width
  header-h: 3.6rem        # --header-h — sticky header height (filter-bar offset anchor)
  content-max: 76rem      # home bands, filter bar, footer inner
  wiki-grid-max: 78rem    # wiki reading column + TOC rail
  hairline-w: 1px
  z-header: 100
  z-modal: 1000

components:
  site-header:
    background: "color-mix(in srgb, {colors.bg} 78%, transparent) + backdrop-blur(10px) saturate(160%)"
    borderBottom: "1px {colors.hairline}"
    position: "sticky top-0, z-header"
    note: "wordmark (ai·wiki, · dot = signal) + search(⌘K) + 태그 + 그래프 + About + GitHub + theme toggle + mobile hamburger. Always aqua — it sits outside <main>, so no domain scope reaches it."
  hero:
    padding: "clamp(space-12, 12vh, 8rem) space-4"
    borderBottom: "1px {colors.hairline}"
    note: "hosts hero-constellation canvas behind hero-copy"
  hero-constellation:
    element: "<canvas>"
    opacity: 0.55
    mask: "radial-gradient(120% 90% at 70% 40%, #000 35%, transparent 88%)"
    note: "animated graph — golden-angle placement, ambient drift, signal edges (constellation.js)"
  hero-title:
    fontRole: body
    fontSize: "clamp(text-2xl, 6vw, text-3xl)"
    accentSpan: "{colors.signal}"     # .hero-accent
  home-filter:
    background: "color-mix(in srgb, {colors.bg} 82%, transparent) + backdrop-blur"
    position: "sticky top: {layout.header-h}, z: header-1"
    note: "category chips, each carrying its own data-domain; mobile → horizontal scroll one row"
  filter-chip:
    fontRole: mono
    fontSize: "{typography.scale.text-sm}"
    background: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.radius-md}"
    hover: "border → {colors.signal}"
    active: "bg + border {colors.signal}, text {colors.bg}"   # .is-active — aqua fill
  card:
    background: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.radius-lg}"
    padding: "{spacing.space-4}"
    hover: "border → {colors.signal}, translateY(-2px)"
    parts: "card-tag (mono) · card-title (base/600) · card-desc (sm/muted, line-clamp 3) · card-foot (↳degree + chips)"
    neighborHover: "hovered card + linked cards keep signal border; unrelated dim to opacity 0.4"
  card-grid:
    columns: "1 → 2 (≥640px) → 3 (≥1024px)"
    gap: "{spacing.space-4}"
  reading-bar:
    element: "fixed top 2px bar, z: header+1"
    fill: "{colors.signal} (scaleX by reader.js on scroll)"
  wiki-grid:
    columns: "1 → [1fr, 15rem] at ≥1080px (reading column + TOC rail)"
    max: "{layout.wiki-grid-max}"
  wiki-toc:
    position: "sticky top 4.5rem (desktop ≥1080px only)"
    note: "scrollspy rail; active item = signal text + signal left-border. Mobile = <details> accordion."
  neigh:
    element: "radial SVG mini-graph (center = current page, ellipse of neighbor nodes)"
    edges: "{colors.signal-dim}; nodes {colors.faint} → {colors.signal} on hover; center = signal"
  src-links:
    fontRole: mono
    note: "원문(raw) · 요약 source · 이 페이지 .md → GitHub blob links"
  prevnext:
    columns: "2 → 1 (≤560px)"
    note: "same-category prev/next cards, radius-lg, hover signal border + lift"
  band-empty:
    element: ".band.band-empty > .band-empty-note"
    border: "1px dashed {colors.signal-dim}"
    note: "a category declared in index.md with zero pages renders the band head + one advisory line instead of a card grid; keeps the anchor and filter chip alive (chip count reads 0)"
  search-modal:
    background: "surface panel, backdrop = color-mix(bg 68%) + blur(4px)"
    rounded: "{rounded.radius-lg}"
    shadow: "0 24px 64px -24px rgba(0,0,0,0.6)"
    note: "Pagefind ⌘K modal; result highlight mark = signal-dim"
  search-facets:
    element: ".search-facets > button.facet-chip"
    fontRole: mono
    fontSize: "{typography.scale.text-xs}"
    rounded: "{rounded.radius-sm}"
    active: "bg + border {colors.signal}, text {colors.bg}"
    note: "one row above the results, filled at open time from pagefind.filters(); category facet only; zero-count chips render disabled (opacity .55)"
  tags-page:
    element: ".tags-page (shared shell for /tags/, /tags/{slug}/, /graph/)"
    max: "76rem"
    padding: "{spacing.space-8} {spacing.space-4} 0"
    note: "eyebrow · title · lede · mono stat line, then the page body"
  tag-cloud:
    element: ".tag-group[data-domain] > .tag-cloud > a.tag-cloud-item"
    fontRole: mono
    sizes: "data-size 1→4 by frequency (1 / ≥2 / ≥5 / ≥10) mapped to text-xs / text-sm / text-base / text-lg"
    hover: "border → {colors.signal}"
    note: "size-4 items take {colors.signal} text + {colors.signal-dim} border; the group <section> carries data-domain, so a physical group's big tags render amber"
  tag-detail:
    element: ".tags-page.tag-detail"
    title: "mono, {typography.scale.text-2xl}, {colors.signal}"
    note: "reuses the home card() grid; <main> carries the tag's domain. A merged-spelling notice (.tag-variants) appears when a slug absorbed more than one raw spelling."
  wiki-tags:
    element: "nav.wiki-tags at the bottom of a wiki article"
    borderTop: "1px {colors.hairline}"
    note: "cards cap at 2 chips, so this is the only place a page's full tag set is visible; each chip links to /tags/{slug}/"
  graph-explorer:
    element: ".graph-explorer > .graph-canvas-wrap > canvas.graph-canvas"
    height: "clamp(22rem, 60vh, 40rem) → clamp(18rem, 52vh, 26rem) ≤560px"
    background: "{colors.surface}, 1px {colors.hairline}, {rounded.radius-lg}"
    note: "ships hidden; graph-explorer.js unhides it right before the first paint, so a missing script or a failed graph.json leaves no empty box. touch-action: manipulation."
  graph-status:
    element: "p.graph-status[role=status]"
    fontRole: mono
    note: "min-height 2.4em so hover updates don't reflow the page; the selected node appears as a real <a> (touch users get a link instead of a second tap)"
  graph-list:
    element: "section.graph-group[data-domain] > ul.graph-nodes"
    columns: "repeat(auto-fill, minmax(17rem, 1fr))"
    note: "server-rendered text twin of the canvas, grouped by category in index.md order; the only accessible/no-JS path to the graph's contents"
  study-path:
    element: "ol.study-path > li.study-step (inside .prose)"
    marker: ".study-n — 2rem circle, {colors.surface} fill, 1px {colors.signal-dim} border, {colors.signal} numeral (1.6rem ≤560px)"
    parts: "study-link (title) · study-note (one-line why) · study-prereq (mono label + links)"
    note: "injected under the article's `## 학습 경로` heading by markdown.mjs spliceStudyPath(); unresolved refs degrade to .wikilink-missing"
  site-footer:
    borderTop: "1px {colors.hairline}"
    fontRole: mono
    fontSize: "{typography.scale.text-xs}"
    note: "repo link · maintainer · 'built on Karpathy LLM Wiki pattern'"
---

## Overview

**ai-wiki** presents itself as a **deep-space knowledge-graph reader**. It is dark by default — a near-black ink canvas (`{colors.bg}` — #0b0e14) with layered surfaces — and the palette is monochrome apart from one accent, **luminous aqua** (`{colors.signal}` — #5eead4). That color does all the emphasis work: links, hover borders, the active filter chip's fill, the focus ring, the reading progress bar, and the animated constellation graph behind the home hero.

Since v3.0 the repository holds two content domains, and the accent tracks which one you are reading. Aqua is the **core** domain (LLM software: RAG, agent harnesses, evaluation). **Amber** (`{colors.signal-physical}` — #f0a868) is the **physical-AI** domain (VLA, world models, robot learning, sim2real). This is one accent per domain, not two accents on a page — a `[data-domain]` scope re-points the same `--signal` token, and global chrome stays aqua throughout. See [The Signal Principle](#the-signal-principle).

The home page is a **card-grid feed** grouped into category bands, sitting under an animated `<canvas>` constellation hero. Each wiki page is a **reading experience**: a 72-character reading column, a sticky scrollspy table-of-contents rail on the right, a fixed reading-progress bar at the top, and — at the bottom — a small radial "neighborhood" graph of directly linked pages, the page's full tag list, source links, and prev/next navigation. Three secondary surfaces hang off that spine: a **tag index** (`/tags/` + one page per tag), a full **graph explorer** (`/graph/`), and an in-article **study path** component for overview pages that declare a reading order. Emphasis is a **color** here, not the absence of one.

The type system uses **three fonts by role**: Space Grotesk for Latin display (the `ai·wiki` wordmark, hero stat numbers, eyebrows), **Pretendard Variable** for Korean and body copy, and **JetBrains Mono** for the utility layer (meta labels, tags, chips, nav, code). Korean readability is deliberate — `word-break: keep-all`, a generous 1.7 body line-height, and `text-wrap: balance` on headings.

Technically this is a **hand-written static site**, not a framework build. Styles are plain CSS in one file, organized with `@layer tokens, base, components, utilities`; the tokens are CSS custom properties. HTML is generated by `build.mjs` from Markdown (marked + gray-matter + KaTeX + Pagefind) and deployed to GitHub Pages under the `/ai-wiki` base path.

**Key Characteristics:**

- **Dark-first, deep-space palette.** `:root` is the dark theme; light is an opt-in override (`:root[data-theme='light']`). Default resolves from `prefers-color-scheme`, set before paint by a FOUC-guard script and toggled by `theme.js`.
- **One signal accent per domain.** Aqua `{colors.signal}` (#5eead4 dark / #0fb89b light) for core, amber `{colors.signal-physical}` (#f0a868 dark / #a85b12 light) for physical-AI. Only one of them is live in any given scope; the rest of the system is ink and hairlines.
- **Three fonts, split by role** — Space Grotesk (display), Pretendard Variable (Korean/body), JetBrains Mono (mono/meta).
- **Signature interactions** — an animated constellation canvas hero, a card-grid feed with graph-**neighborhood hover** (a hovered card highlights its linked cards, the rest fade back), and a force-directed **graph explorer** with category filtering.
- **Knowledge-graph reading page** — 72ch column + sticky TOC rail (scrollspy) + reading progress bar + bottom neighborhood mini-graph + full tag list + source links + prev/next.
- **Navigable by tag and by graph** — every tag is a page (`/tags/{slug}/`), the tag index groups by domain, and `/graph/` renders the whole link graph with a server-rendered text twin underneath it.
- **Hairline-and-frost depth.** Separation is a 1px `{colors.hairline}` border plus the surface step plus `backdrop-blur` frosted bars. Drop shadows appear only on floating overlays (search panel, mobile menu sheet, graph tooltip).
- **Plain CSS, `@layer`-ordered.** No Tailwind, no `tailwind.config`, no shadcn. Tokens live in `@layer tokens` inside [site/assets/css/styles.css](site/assets/css/styles.css).

## Colors

> **Source of truth:** [site/assets/css/styles.css](site/assets/css/styles.css) — `@layer tokens`, `:root` (dark, default) and `:root[data-theme='light']` (light override). Every value below is a CSS custom property; components consume them via `var(--…)`, never hardcoded hex.

### Token Map (Dark = default ↔ Light = override)

| Token                 | Dark (`:root`)          | Light (`[data-theme='light']`) | Use                                        |
| --------------------- | ----------------------- | ------------------------------ | ------------------------------------------ |
| `{colors.bg}`         | `#0b0e14`               | `#f7f8fa`                      | Page canvas (deep space ink ↔ near-white)  |
| `{colors.surface}`    | `#141923`               | `#ffffff`                      | Cards, header/menu, chips, buttons         |
| `{colors.surface-2}`  | `#1b2230`               | `#f1f3f7`                      | Code, tables `th`, `pre`, tooltip, chips   |
| `{colors.text}`       | `#e6e9ef`               | `#161a22`                      | Body / heading text                        |
| `{colors.muted}`      | `#8a93a3`               | `#5c6473`                      | Secondary text, meta, captions             |
| `{colors.faint}`      | `#5a6373`               | `#9aa2b0`                      | Tertiary — degree counts, list markers     |
| `{colors.hairline}`   | `#232a38`               | `#e3e7ee`                      | 1px borders everywhere (the depth grammar) |
| `{colors.signal}`     | `#5eead4`               | `#0fb89b`                      | **The accent** — emphasis, links, active   |
| `{colors.signal-dim}` | `rgba(94,234,212,.25)`  | `rgba(15,184,155,.18)`         | Underlines, edges, selection, glow         |
| `{colors.signal-physical}`     | `#f0a868`      | `#a85b12`                      | Physical-AI accent — swapped in by scope   |
| `{colors.signal-physical-dim}` | `rgba(240,168,104,.25)` | `rgba(168,91,18,.18)` | Physical-AI dim pair                       |

`color-scheme` is set per theme (`dark` / `light`) so native form controls and scrollbars match.

### The Signal Principle

**One accent per domain. Global chrome is always aqua.**

The repository covers two subjects that behave differently — core LLM software and physical AI — and the accent tells you which one you are in. It is still a one-color system at any point on the page; what changed in v3.0 is that *which* color is one is resolved by scope.

**The mechanism is a token swap, not a second palette.** Every component reads `var(--signal)` / `var(--signal-dim)` and nothing reads a physical token directly. One rule does the work:

```css
[data-domain='physical'] {
  --signal: var(--signal-physical);
  --signal-dim: var(--signal-physical-dim);
}
```

Because the components were already token-only, cards, hover borders, chips, the tag cloud's top tier, study-path numerals, and the canvas node colors all re-tint from that one block. No component gained a domain branch. Category→domain resolution lives in [site/lib/domains.mjs](site/lib/domains.mjs) (`domainOf()`, default `core`), and `graph.json` nodes carry the resolved `domain`, so the browser scripts hold no category list of their own.

**Where the scope attaches:**

| Surface | Carries `data-domain` | Result |
| ------- | --------------------- | ------ |
| Wiki page shell | `<main>` (from `page.category`) | the whole article, TOC, neighborhood graph, study path |
| Home category band | `<section class="band">` | that band only — bands of both domains coexist on the home page |
| Home filter chip | the chip `<a>` | per-category, so an active physical chip fills amber |
| Tag index group / tag detail | `<section class="tag-group">` / `<main>` | a tag's domain is decided by majority of its pages |
| Graph page group + chip | `<section class="graph-group">` / chip `<a>` | canvas node color comes from `node.domain` instead |
| **Header, footer, search modal, reading bar** | **never** | permanently aqua — they live outside `<main>` |

The chrome exclusion is structural, not a convention someone has to remember: the header and footer are siblings of `<main>` in `layout()`, so no domain scope can reach them.

**What has not changed.** Everything outside the accent is still monochrome ink on ink surfaces, separated by hairline borders and the surface step. Surfaces stay flat — the only gradient in the system is the radial **mask** that fades the hero constellation canvas at its edges. Emphasis is still carried by exactly one hue in view; the domains take turns, they do not share.

## Typography

### Three Fonts, by Role

| Role (`--font-*`) | Font                    | Used for                                                      |
| ----------------- | ----------------------- | ------------------------------------------------------------ |
| `display`         | **Space Grotesk**       | `ai·wiki` wordmark, hero stat numbers, some eyebrows          |
| `body`            | **Pretendard Variable** | Korean + Latin body copy, all headings (`h1`–`h6`)           |
| `mono`            | **JetBrains Mono**      | Meta labels, eyebrows, tags/chips, nav buttons, kbd, code     |

- **Pretendard Variable** is the workhorse — it covers Hangul + Latin in one face, so Korean and English body copy share metrics with no mixed-script seam. Loaded via a **dynamic-subset CSS** (`pretendard-dynamic-subset.css`), so only the glyphs a page uses are fetched.
- **Space Grotesk** and **JetBrains Mono** are self-hosted **Latin-subset woff2** (`font-display: swap`), used only for Latin display/utility strings. They are pulled from `@fontsource/*` and copied to `/static/fonts/` at build.

### Scale

| Token                    | Size    | Use                                                        |
| ------------------------ | ------- | ---------------------------------------------------------- |
| `{typography.scale.text-3xl}` | 2.2rem  | `h1` — wiki & hero title (via `clamp()`)              |
| `{typography.scale.text-2xl}` | 1.75rem | `h2`, hero stat values                                |
| `{typography.scale.text-xl}`  | 1.4rem  | `h3`, band (category) name                            |
| `{typography.scale.text-lg}`  | 1.15rem | `h4`, wordmark, hero lede, search input               |
| `{typography.scale.text-base}`| 1rem    | Body copy, card titles                                |
| `{typography.scale.text-sm}`  | 0.875rem| Captions, card desc, nav, TOC, tables                 |
| `{typography.scale.text-xs}`  | 0.78rem | Eyebrows, meta, tags, chips, footer, kbd              |

### Principles

- **Headings** use Pretendard at weight 700 (h3/h4 at 600), `letter-spacing: -0.01em`, `line-height: {typography.leading.tight}` (1.25), and `text-wrap: balance`.
- **Body** holds `{typography.scale.text-base}` at `line-height: {typography.leading.body}` (1.7) — tuned for Korean reading.
- **Korean line-breaking:** `word-break: keep-all` breaks on word boundaries; `overflow-wrap: anywhere` only forces a break on over-long tokens (URLs, IDs).
- **Mono is the utility voice** — anything that reads as a label, tag, count, or code path uses JetBrains Mono with slightly loosened tracking (`letter-spacing: 0.04–0.08em`, sometimes uppercased).

## Layout

### Containers

| Surface                     | Max width           |
| --------------------------- | ------------------- |
| Home bands / filter / footer| `76rem`             |
| Tag index / tag detail / graph page (`.tags-page`) | `76rem` |
| Wiki page grid (col + rail) | `78rem`             |
| Wiki reading column         | `{layout.measure}` (72ch) |
| Interim `.shell` reading    | `72ch`              |

All centered with `margin: 0 auto`, padded on the `{spacing.space-4}` gutter.

### App Shell (home)

Top to bottom: **sticky frosted header** → **constellation hero** → **sticky category filter bar** → **category bands**, each a header (name · count · description) over a **card grid** (1 → 2 → 3 columns) → **footer**. The filter bar sticks at `top: {layout.header-h}` so it rides just under the header; bands carry `scroll-margin-top` so anchor jumps clear both sticky bars.

A category declared in `index.md` but holding zero pages still renders its band — head, description, and a dashed advisory box (`.band-empty-note`) where the grid would be. The band keeps its anchor and its filter chip (count `0`), so the category is reachable and the layout does not shift when the first page lands.

### Secondary Pages

`/tags/`, `/tags/{slug}/`, and `/graph/` share one shell (`.tags-page`, 76rem): eyebrow → title → lede → a mono stat line, then the page body. No hero, no TOC rail.

- **Tag index** — domain-grouped sections, each a `band-head` over a wrapped **tag cloud** whose item size steps with frequency (4 buckets, not a continuous scale — the long tail is almost all single-use tags).
- **Tag detail** — the home `card()` grid, unchanged, plus a notice when the slug merged more than one raw spelling.
- **Graph page** — filter chips → a hidden-until-drawn canvas block (canvas + status line) → a server-rendered **category list** of the same nodes. The list is the accessible and no-JS path, not decoration.

### Wiki Page

A CSS grid: single column on mobile, `[minmax(0,1fr), 15rem]` at ≥1080px (reading column + TOC rail). Above it, a fixed 2px **reading-progress bar**. The article is the 72ch `.prose` column with a page header (category eyebrow · title · meta), then the rendered body, then a footer block: **관련 페이지** (neighborhood SVG + list) → the page's full **tag list** (`nav.wiki-tags`) → **원문 · 소스** (GitHub links) → prev/next.

Overview pages may declare a `study_path` in frontmatter. The build renders it as a numbered **step list** and splices it into the body under the article's own `## 학습 경로` heading, so the heading, its TOC entry, and its anchor survive while the machine-readable list replaces the hand-written one.

### Whitespace

The 4px spacing scale (`{spacing.space-1}`…`{spacing.space-12}`) drives everything: card padding `{spacing.space-4}`, grid gaps `{spacing.space-4}`, section rhythm `{spacing.space-8}`–`{spacing.space-12}`, chip gaps `{spacing.space-2}`.

## Signature Interactions

These are what make the site feel like a *graph*, not a list — all in vanilla JS ([site/assets/js/](site/assets/js/)), all reduced-motion aware.

- **Constellation hero** ([constellation.js](site/assets/js/constellation.js)) — a `<canvas>` renders `graph.json`: nodes placed by **golden-angle** distribution (deterministic, stable across reloads), drifting on a bounded ambient path, connected by `signal-dim` edges; higher-degree core nodes are larger and aqua, physical nodes are always amber (dimmed to `globalAlpha 0.55` when they are not hubs, so a young domain with low degree is still visible). Colors are read live from CSS tokens, so it follows the theme. `prefers-reduced-motion` → a single static frame.
- **Graph explorer** ([graph-explorer.js](site/assets/js/graph-explorer.js) over [graph-core.js](site/assets/js/graph-core.js)) — the `/graph/` canvas runs Fruchterman-Reingold **once** on load and keeps the result in unit coordinates; resize re-maps pixels rather than re-solving, so the picture is stable across reloads and reflows. Hover lights a node's neighbors and dims the rest; category chips fade filtered-out nodes to `alpha 0.1` rather than removing them, because where a category sits inside the whole structure is itself information. Pointer type decides the click contract: fine pointers navigate on one click, touch selects first and navigates on a second tap (with the selection also exposed as a real link in the status line). `graph-core.js` is the shared layer both canvases use — one `getComputedStyle` palette read, DPR-capped fitting, debounced resize, and a `data-theme` MutationObserver.
- **Card neighborhood hover** — hovering a card adds `cards-focusing`: the card and its graph-linked cards keep an aqua border while unrelated cards drop to `opacity: 0.4`. The links come from `data-links` on each card (adjacency baked in at build).
- **TOC scrollspy** ([reader.js](site/assets/js/reader.js)) — the sticky rail's active item flips to aqua text + aqua left-border as you scroll; also drives the top reading-progress bar (`scaleX`) and the neighborhood-graph node ↔ list-row hover pairing.
- **⌘K search** ([search.js](site/assets/js/search.js)) — a Pagefind-backed modal (frosted backdrop, surface panel), keyboard-navigable, with `signal-dim` highlight marks on matched excerpts. A **category facet row** sits above the results, populated once per open from `pagefind.filters()`; chips whose count is zero render disabled, and a facet with no query runs a filter-only search that lists the category.
- **Study path steps** — an overview page's declared reading order renders as numbered steps inside the prose column: a circled numeral in the left margin, the target title as the link, a one-line reason, and optional prerequisite links. Unresolved references degrade to the same `.wikilink-missing` treatment a broken wikilink gets, and the build reports them without failing.

## Elevation & Depth

| Level        | Treatment                                            | Use                                            |
| ------------ | ---------------------------------------------------- | ---------------------------------------------- |
| Flat         | No border, no shadow                                 | Page canvas, prose text                        |
| Hairline     | 1px `{colors.hairline}`                               | Cards, inputs, tables, chips, sheet edges, TOC |
| Surface step | `{colors.surface}` / `{colors.surface-2}` over `bg`  | Cards, code, tooltips — separation by lightness |
| Frosted      | `color-mix(bg 78–82%)` + `backdrop-blur(10px)`       | Header, filter bar, search backdrop            |
| Overlay shadow | `0 …px … rgba(0,0,0,.5–.6)`                         | Search panel, mobile menu sheet, graph tooltip |

**Shadow philosophy — restrained, not banned.** Cards, inputs, and bars get *no* shadow; their depth is the hairline border + surface step + frost. Drop shadows are reserved for genuinely floating overlays (the ⌘K search panel, the mobile hamburger menu, the neighborhood-node tooltip) where the element must read as lifted above everything.

## Shapes

### Border Radius Scale

| Token                  | Value | Use                                                     |
| ---------------------- | ----- | ------------------------------------------------------- |
| `{rounded.radius-sm}`  | 4px   | Inline code, chips, kbd, focus ring, skip-link target   |
| `{rounded.radius-md}`  | 8px   | Buttons, nav, filter chips, inputs, `pre`, mobile sheet  |
| `{rounded.radius-lg}`  | 14px  | Cards, prev/next cards, search panel — the card radius   |

Corners are consistent by role: interactive utility bits at 8px, cards and panels at 14px, tiny inline bits at 4px. There is no pill/capsule grammar — chips are small rounded rectangles (`radius-md`/`radius-sm`), not full pills.

## Light / Dark Theme

- **Mechanism.** Theme is a `data-theme` attribute on `<html>`. A tiny inline **FOUC-guard script** runs before paint: it reads `localStorage.theme`, else falls back to `prefers-color-scheme`, and sets `data-theme` so the first paint is already correct. [theme.js](site/assets/js/theme.js) handles the toggle button and persistence.
- **Default is dark.** `:root` *is* the dark theme; `:root[data-theme='light']` overrides the same variable names with light values. Every color resolves through `var(--…)`, so no component needs theme-specific markup.
- **Everything follows.** Because the constellation canvas reads its colors from CSS tokens at runtime, even the animated graph re-tints on theme switch.
- **Browser chrome.** OG/canonical absolute URLs and the dark-default `color-scheme` keep native UI in sync.

## Responsive Behavior

| Width    | Layout change                                                          |
| -------- | --------------------------------------------------------------------- |
| ≤560px   | Mobile nav: hide the inline Tags/Graph/About/GitHub buttons, show hamburger + `#site-menu` sheet; nav labels shrink to icons; filter bar becomes a single horizontal-scroll row; prev/next stacks to 1 column; graph canvas drops to `clamp(18rem, 52vh, 26rem)`; study-step indent narrows to `{spacing.space-8}` with a 1.6rem numeral; `.tags-page` head padding tightens |
| ≥640px   | Card grid → 2 columns                                                  |
| ≥1024px  | Card grid → 3 columns                                                  |
| ≥1080px  | Wiki page gains the right **sticky TOC rail**; the mobile `<details>` TOC hides |

The hero title and wiki/hero headings scale fluidly with `clamp()`; most other type holds its size and reflows by container width.

### Reduced Motion

`@media (prefers-reduced-motion: reduce)` drops all transition/animation durations to ~0ms and disables smooth scroll. Safe, because every animation is decorative (color, border, transform, the hero drift) — never load-bearing. The constellation canvas honors it explicitly by drawing one static frame.

## Do's and Don'ts

### Do

- Carry emphasis with `var(--signal)` — link color, hover borders, the active chip fill, the focus ring, the reading bar. It is the one accent in any given scope; whether it resolves to aqua or amber is the domain's business, not the component's.
- Add a domain by mapping its categories in [domains.mjs](site/lib/domains.mjs) and adding a dark/light `--signal-*` pair plus one `[data-domain='…']` block. Nothing else should need editing.
- Keep every other surface monochrome ink + hairlines. Separate by border and surface step, not by a new hue.
- Use the **right font for the role**: Space Grotesk for Latin display, Pretendard for Korean/body, JetBrains Mono for meta/tags/code.
- Bound surfaces with the 1px `{colors.hairline}` border; frost floating bars with `backdrop-blur`.
- Reserve drop shadows for true overlays (search panel, mobile menu, graph tooltip) — not cards or bars.
- Respect Korean typography: `word-break: keep-all`, 1.7 body leading, `text-wrap: balance` on headings.
- Define every new color as a **dark (`:root`) + light (`[data-theme='light']`) pair** under the same variable name.
- Reach for the token custom properties (`var(--signal)`, `var(--hairline)`, `var(--space-4)`, …) — never inline hex or magic numbers.

### Don't

- Don't put two accents on screen at once. **This rule was absolute through v2.0 — "aqua is the whole emphasis system, never introduce a second hue."** It existed to stop the usual drift where a status color, then a category color, then a brand color accumulate until nothing reads as emphasis. v3.0 grants one narrow exception and keeps the intent: the repository now holds two subjects (core LLM software, physical AI) whose separation is real editorial information, and the amber accent encodes exactly that one fact. It is not decoration and it is not a second simultaneous accent — it is the same `--signal` token resolving differently by scope. The replacement fences are below.
- Don't add a third accent, and don't give a domain a second color. A domain owns one hue and its `-dim` pair. If something new needs emphasis, it is competing with the accent, not joining it — use surface step, hairline, or mono type instead.
- Don't tint global chrome. The header, footer, search modal, and reading progress bar stay aqua in every domain — they are site-wide furniture, and re-coloring them would make the accent read as a theme rather than as a location cue.
- Don't read `--signal-physical` from a component. Components read `--signal` only; the domain scope decides. The one legitimate exception is the canvas scripts, which cannot cascade and so read both tokens and pick per node from `node.domain`.
- Don't hardcode a category list to decide a color. `domainOf()` in the build and the `domain` field on `graph.json` nodes are the only sources; a category list copied into a browser script is the exact duplication Phase 5 removed.
- Don't add shadows to cards, inputs, chips, or the sticky bars; they're hairline + frost by design.
- Don't use gradients decoratively (the only gradient is the hero canvas edge **mask**).
- Don't mix up the font roles — Korean text must be Pretendard; don't set body copy in Space Grotesk or Mono.
- Don't hardcode hex or px in the templates; consume the CSS tokens so theme + spacing stay consistent.
- Don't assume a light default — the site is dark-first; author and test dark first, then verify the light override.
- Don't let sticky chrome overlap anchored content — keep the `scroll-margin-top` offsets for header + filter bar.

## Iteration Guide

1. Edit tokens in [site/assets/css/styles.css](site/assets/css/styles.css) `@layer tokens` (`:root` for dark, `:root[data-theme='light']` for light). This file is the single source of truth; this document mirrors it.
2. Always define a color as a **dark/light pair** under the same variable name. Measure it before committing: body-weight text needs 4.5:1 and UI borders 3:1 against `bg`, `surface`, and `surface-2` in both themes.
3. Domain accents are added in two places and nowhere else — the category→domain map in [site/lib/domains.mjs](site/lib/domains.mjs), and a `--signal-{domain}` / `--signal-{domain}-dim` pair plus one `[data-domain='{domain}']` override in `@layer tokens`. If a change requires touching a component, the token swap is being bypassed.
4. New components go in `@layer components`; utilities in `@layer utilities`. The `@layer` order (`tokens, base, components, utilities`) is what prevents specificity fights — respect it.
5. Reference token variables and existing class patterns — never inline hex.
6. Keep the three font roles distinct; don't add a fourth face.
7. Depth is hairline border + surface step + frost. Add an overlay shadow only if the element genuinely floats above the page.
8. HTML structure lives in [site/lib/templates.mjs](site/lib/templates.mjs); interactions in [site/assets/js/](site/assets/js/). Rebuild with `node build.mjs` (from `site/`) and preview with `npm run preview`.

## Known Gaps

### Accessibility

- ⚠️ **The light-theme aqua fails contrast.** `{colors.signal-light}` (`#0fb89b`) measures **2.26–2.52:1** against the three light backgrounds (`bg` #f7f8fa, `surface` #ffffff, `surface-2` #f1f3f7) — under 4.5:1 for text and under even the 3:1 UI-component floor. Since aqua carries link text, active-chip fill, and hover borders, this affects the light theme broadly. Measured with the WCAG 2.x relative-luminance formula against the live token values while picking the amber pair; the amber added in v3.0 passes everywhere (dark 7.97–9.66:1, light 4.53–5.04:1), so the *new* color is the accessible one and the *incumbent* is not. Left unfixed deliberately: re-picking the primary accent is a palette decision with site-wide reach, not a side effect of adding a domain. Fixing it means darkening `signal-light` substantially — `#0d7a68` is the lightest teal that clears 4.5:1 on all three (4.72–5.25:1); the intermediate `#0a8f78` only reaches 3.63–4.03:1, enough for the UI floor but not for link text — and then re-checking every light-theme surface, since the aqua also fills the active chip and would darken with it.
- **Light theme is a full override but secondary** — the site is authored dark-first; other light-mode contrast edge cases (faint-on-white meta) are acceptable-but-not-tuned.
- **The graph page has no domain legend.** Node color is the only cue for which domain a node belongs to, and nothing on the page names the mapping. It is invisible today because the physical domain has no pages; it needs a decision once it does.

### Structure and scale

- **The tag cloud has no length limit.** 706 tags render in one list and roughly 70% are single-use, so the page is very long below the fold. A frequency floor with a collapsed "rest" section is the obvious fix; it was left out until the real scroll length could be judged on screen.
- **Card markup carries a stretched-link structure.** Making in-card tag chips real links required moving the card from `<a>` to `<div>` with a `.card-link::after` overlay (nested anchors are invalid), and hover/focus styling moved from `:focus-visible` to `:focus-within`. Everything that targets `.card` still works, but this is the highest-regression-risk change in the v3.0 batch and it wants a real pointer and a real keyboard over it.
- **Header nav is dense between 561px and 700px.** Two buttons were added in v3.0 (Tags, Graph) above the ≤560px collapse threshold, so the widest inline row is now wordmark + search + ⌘K badge + Tags + Graph + About + GitHub + theme. The breakpoint may need to move up.
- **The `## 학습 경로` section only survives as a list.** The build replaces everything between that heading and the next heading with the rendered component, so prose written inside the section disappears from the site while remaining in the `.md` (Obsidian still shows it). Current practice is to put such prose above the heading. Worth stating in `CLAUDE.md` if study paths become common.
- **`{stem}` figure images have no intrinsic dimensions** — `transformFigures()` emits no `width`/`height`, so figure-heavy pages shift layout while images load (CLS).

### Token hygiene

- **No formal spacing/type utility classes** — components use the CSS variables directly; there is no atomic utility layer (`@layer utilities` is declared but lightly used).
- **A few literal values remain** — hero mask percentages, `clamp()` bounds, overlay shadow blurs, and the graph canvas height clamps are literals rather than named tokens.
- **`backdrop-blur` radius** is a fixed `10px` (bars) / `4px` (search) literal, not a token.
- **Type scale is documented but not all steps are heavily used** — e.g. `text-lg` appears in only a few places (the tag cloud's top tier is one of its few consumers).
- **Latin fonts are Latin-subset only** — Space Grotesk / JetBrains Mono have no Hangul; any Korean accidentally set in those roles falls back to the body stack.

### Resolved in v3.0

- ~~Canvas scripts duplicated the category→domain mapping~~ — resolved. `graph.json` nodes carry a build-resolved `domain`, and the local category array in `constellation.js` is gone; both canvases read `node.domain`.
- ~~Tags were inert decoration~~ — resolved. Every tag is now a page, chips link, and Pagefind exposes `category` and `tag` filters (`filters: 0 → 2`).

## Pending Visual Review

The v3.0 work was verified headlessly — build output, generated markup, contrast arithmetic, Pagefind index contents, and scripted runs of the layout and hit-testing code. The following cannot be settled that way and are **open**, not passed:

- **Dark and light by eye**, both themes, on the home page, a wiki page, `/tags/`, and `/graph/`. Light amber lands at 4.53–5.04:1 — over the line but not by much.
- **Card interaction after the stretched-link change** — whole-card click, hover border + `translateY(-2px)`, keyboard Tab focus, and a chip click going to the tag page rather than the card target.
- **Graph layout quality** — whether clusters actually read, and whether the FR constants (`k`, `TEMP 0.16`, `GRAV 2.0`, 300 iterations) need tuning. Measured overlap is 2 node pairs at 1100×560 and 18 at 360×330; whether that feels crowded is a judgment call. Per-axis normalization also stretches the layout on wide viewports.
- **Canvas hover label** legibility in both themes, and how long titles clip.
- **Breakpoint sweep at 640 / 1024 / 1080px** for the tag index, tag detail, graph page, and study-path steps; plus the 561–700px header density noted above.
- **Study-path steps in the prose column** — numeral circle alignment against the reading column, the two-line-title baseline at ≤560px, and prerequisite wrapping (never exercised beyond one prerequisite).
- **Empty-band advisory box** — the dashed border uses `--signal-dim`, which is alpha 0.18 in light mode and may be too faint.
- **⌘K facet row** — how much of the modal's `max-height: 70vh` it consumes, and how many rows the chips wrap into below 640px.
- **Touch behavior on the graph** — whether the tap-to-select-then-tap-to-open contract is discoverable from the status-line link alone.
- **Amber on screen once physical-AI pages exist** — hero canvas node visibility at `globalAlpha 0.55`, the active amber filter chip (`color: var(--bg)` on amber), tag-cloud top-tier items in a physical group, and confirmation that chrome stays aqua while reading a physical page.
