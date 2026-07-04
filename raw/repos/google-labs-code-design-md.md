---
title: "DESIGN.md — A format specification for describing a visual identity to coding agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/google-labs-code-design-md.md
raw_filename: "google-labs-code-design-md.md"
source_collection: external
org: "google-labs-code"
repo: "design.md"
url: "https://github.com/google-labs-code/design.md"
license: "Apache-2.0"
tags: [design-system, design-tokens, coding-agent, context-engineering, spec, cli, tailwind, dtcg, portable-context]
---

# ===== README.md =====

# DESIGN.md

A format specification for describing a visual identity to coding agents. DESIGN.md gives agents a persistent, structured understanding of a design system.

## The Format

A DESIGN.md file combines machine-readable design tokens (YAML front matter) with human-readable design rationale (markdown prose). Tokens give agents exact values. Prose tells them *why* those values exist and how to apply them.

```md
---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 3rem
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
---

## Overview

Architectural Minimalism meets Journalistic Gravitas. The UI evokes a
premium matte finish — a high-end broadsheet or contemporary gallery.

## Colors

The palette is rooted in high-contrast neutrals and a single accent color.

- **Primary (#1A1C1E):** Deep ink for headlines and core text.
- **Secondary (#6C7278):** Sophisticated slate for borders, captions, metadata.
- **Tertiary (#B8422E):** "Boston Clay" — the sole driver for interaction.
- **Neutral (#F7F5F2):** Warm limestone foundation, softer than pure white.
```

An agent that reads this file will produce a UI with deep ink headlines in Public Sans, a warm limestone background, and Boston Clay call-to-action buttons.

## Getting Started

Validate a DESIGN.md against the spec, catch broken token references, check WCAG contrast ratios, and surface structural findings — all as structured JSON that agents can act on.

```bash
npx @google/design.md lint DESIGN.md
```

```json
{
  "findings": [
    {
      "severity": "warning",
      "path": "components.button-primary",
      "message": "textColor (#ffffff) on backgroundColor (#1A1C1E) has contrast ratio 15.42:1 — passes WCAG AA."
    }
  ],
  "summary": { "errors": 0, "warnings": 1, "info": 1 }
}
```

Compare two versions of a design system to detect token-level and prose regressions:

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

```json
{
  "tokens": {
    "colors": { "added": ["accent"], "removed": [], "modified": ["tertiary"] },
    "typography": { "added": [], "removed": [], "modified": [] }
  },
  "regression": false
}
```

## The Specification

The full DESIGN.md spec lives at [`docs/spec.md`](docs/spec.md). What follows is a condensed reference.

### File Structure

A DESIGN.md file has two layers:

1. **YAML front matter** — Machine-readable design tokens, delimited by `---` fences at the top of the file.
2. **Markdown body** — Human-readable design rationale organized into `##` sections.

The tokens are the normative values. The prose provides context for how to apply them.

### Token Schema

```yaml
version: <string>          # optional, current: "alpha"
name: <string>
description: <string>      # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string | token reference>
```

### Token Types

| Type | Format | Example |
|:-----|:-------|:--------|
| Color | Any CSS color (hex, `rgb()`, `oklch()`, named, etc.) | `"#1A1C1E"`, `"oklch(62% 0.18 250)"` |
| Dimension | number + unit (`px`, `em`, `rem`) | `48px`, `-0.02em` |
| Token Reference | `{path.to.token}` | `{colors.primary}` |
| Typography | object with `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation` | See example above |

### Section Order

Sections use `##` headings. They can be omitted, but those present must appear in this order:

| # | Section | Aliases |
|:--|:--------|:--------|
| 1 | Overview | Brand & Style |
| 2 | Colors | |
| 3 | Typography | |
| 4 | Layout | Layout & Spacing |
| 5 | Elevation & Depth | Elevation |
| 6 | Shapes | |
| 7 | Components | |
| 8 | Do's and Don'ts | |

### Component Tokens

Components map a name to a group of sub-token properties:

```yaml
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
```

Valid component properties: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.

Variants (hover, active, pressed) are expressed as separate component entries with a related key name.

### Consumer Behavior for Unknown Content

| Scenario | Behavior |
|:---------|:---------|
| Unknown section heading | Preserve; do not error |
| Unknown color token name | Accept if value is valid |
| Unknown typography token name | Accept as valid typography |
| Unknown component property | Accept with warning |
| Duplicate section heading | Error; reject the file |

## CLI Reference

### Installation

```bash
npm install @google/design.md
```

On **Windows**, quote the package name if your shell treats `@` specially (PowerShell, some terminals):

```bash
npm install "@google/design.md"
```

Or run directly (always resolves from the public npm registry):

```bash
npx @google/design.md lint DESIGN.md
```

On **Windows/PowerShell**, this direct form can produce no output (or open
`DESIGN.md` in your Markdown editor) because the `.md` suffix in the `design.md`
bin name collides with the Windows Markdown file association during command
resolution. Run the dot-free `designmd` alias instead — point `npx` at the
package with `-p`, then invoke `designmd`:

```bash
npx -p @google/design.md designmd lint DESIGN.md
```

The `designmd` shim resolves to the same entrypoint and works identically across
all platforms.

#### `npm error ENOVERSIONS` (“No versions available for @google/design.md”)

The CLI is published as [`@google/design.md` on npm](https://www.npmjs.com/package/@google/design.md). `ENOVERSIONS` almost always means npm is not querying the public registry (custom `registry=` in `.npmrc`, a corporate mirror that has not synced this package, or a misconfigured `@google:registry` for the `@google` scope).

Check your effective registry:

```bash
npm config get registry
```

For a normal install from the internet it should be `https://registry.npmjs.org/`. After fixing config, retry with `npm cache clean --force` if a stale 404 was cached.

All commands accept a file path or `-` for stdin. Output defaults to JSON.

> **Windows tip**: when invoking the CLI directly from a `package.json` script
> (rather than through `npx`), use the `designmd` alias instead of `design.md`.
> The `.md` suffix in the original bin name confuses Windows command resolution
> with the file association for Markdown files. The `designmd` shim resolves to
> the same entrypoint and works identically across all platforms.
>
> ```jsonc
> // package.json
> {
>   "scripts": {
>     "design:lint": "designmd lint DESIGN.md"
>   }
> }
> ```

### `lint`

Validate a DESIGN.md file for structural correctness.

```bash
npx @google/design.md lint DESIGN.md
npx @google/design.md lint --format json DESIGN.md
cat DESIGN.md | npx @google/design.md lint -
```

| Option | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `file` | positional | required | Path to DESIGN.md (or `-` for stdin) |
| `--format` | `json` | `json` | Output format |

Exit code `1` if errors are found, `0` otherwise.

### `diff`

Compare two DESIGN.md files and report token-level changes.

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

| Option | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `before` | positional | required | Path to the "before" DESIGN.md |
| `after` | positional | required | Path to the "after" DESIGN.md |
| `--format` | `json` | `json` | Output format |

Exit code `1` if regressions are detected (more errors or warnings in the "after" file).

### `export`

Export DESIGN.md tokens to other formats.

```bash
npx @google/design.md export --format json-tailwind DESIGN.md > tailwind.theme.json
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css
npx @google/design.md export --format dtcg DESIGN.md > tokens.json
```

| Option | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `file` | positional | required | Path to DESIGN.md (or `-` for stdin) |
| `--format` | `json-tailwind` \| `css-tailwind` \| `tailwind` \| `dtcg` | required | Output format |

| Format | Output | Description |
|:-------|:-------|:------------|
| `json-tailwind` | JSON | Tailwind v3 `theme.extend` config object |
| `css-tailwind` | CSS | Tailwind v4 `@theme { ... }` block with CSS custom properties |
| `tailwind` | JSON | Alias for `json-tailwind` |
| `dtcg` | JSON | W3C Design Tokens Format Module |

Exit code `0` on a successful export (regardless of any lint findings in the source — run `lint` to gate on those), `1` on an invalid `--format` or an emitter error, and `2` if the input file cannot be read.

### `spec`

Output the DESIGN.md format specification (useful for injecting spec context into agent prompts).

```bash
npx @google/design.md spec
npx @google/design.md spec --rules
npx @google/design.md spec --rules-only --format json
```

| Option | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `--rules` | boolean | `false` | Append the active linting rules table |
| `--rules-only` | boolean | `false` | Output only the linting rules table |
| `--format` | `markdown` \| `json` | `markdown` | Output format |

## Linting Rules

The linter runs nine rules against a parsed DESIGN.md. Each rule produces findings at a fixed severity level.

| Rule | Severity | What it checks |
|:-----|:---------|:---------------|
| `broken-ref` | error | Token references (`{colors.primary}`) that don't resolve to any defined token |
| `missing-primary` | warning | Colors are defined but no `primary` color exists — agents will auto-generate one |
| `contrast-ratio` | warning | Component `backgroundColor`/`textColor` pairs below WCAG AA minimum (4.5:1) |
| `orphaned-tokens` | warning | Color tokens defined but never referenced by any component |
| `token-summary` | info | Summary of how many tokens are defined in each section |
| `missing-sections` | info | Optional sections (spacing, rounded) absent when other tokens exist |
| `missing-typography` | warning | Colors are defined but no typography tokens exist — agents will use default fonts |
| `section-order` | warning | Sections appear out of the canonical order defined by the spec |
| `unknown-key` | warning | A top-level YAML key looks like a typo of a known schema key (e.g. `colours:` → `colors:`); custom extension keys stay silent |

### Programmatic API

The linter is also available as a library:

```typescript
import { lint } from '@google/design.md/linter';

const report = lint(markdownString);

console.log(report.findings);       // Finding[]
console.log(report.summary);        // { errors, warnings, info }
console.log(report.designSystem);   // Parsed DesignSystemState
```

## Design Token Interoperability

DESIGN.md tokens are inspired by the [W3C Design Token Format](https://www.designtokens.org/). The `export` command converts tokens to other formats:

- **Tailwind v3 config (JSON)** — `npx @google/design.md export --format json-tailwind DESIGN.md` — emits a `theme.extend` JSON object for `tailwind.config.js`. `--format tailwind` is a backwards-compatible alias.
- **Tailwind v4 theme (CSS)** — `npx @google/design.md export --format css-tailwind DESIGN.md` — emits a CSS `@theme { ... }` block using Tailwind v4's CSS-variable token namespaces (`--color-*`, `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--font-weight-*`, `--radius-*`, `--spacing-*`).
- **DTCG tokens.json** ([W3C Design Tokens Format Module](https://tr.designtokens.org/format/)) — `npx @google/design.md export --format dtcg DESIGN.md`

## Status

The DESIGN.md format is at version `alpha`. The spec, token schema, and CLI are under active development. Expect changes to the format as it matures.

## Disclaimer

This project is not eligible for the [Google Open Source Software Vulnerability
Rewards Program](https://bughunters.google.com/open-source-security).
# ===== PHILOSOPHY.md =====

# DESIGN.md Philosophy

DESIGN.md captures how a design looks, feels, and behaves. The prose is where the design lives. Everything else in the document exists to support it.

```
---
name: Technical Handout
---

## Overview

A graduate-level computer science lecture handout in the tradition of an old established university. The audience is graduate students and research engineers reading a printed handout distributed at the beginning of a seminar.

The handout is austere, informationally dense, and proudly unconcerned with first impressions. The audience knows why they are there and the handout's job is to do work, not to seduce.
```

**The quality of a generated design is determined less by the precision of its values than by how clearly the intent is described.**

## Prose, not Tokens, is the focus of the specification

DESIGN.md contains two primary aspects: tokens and prose. The specification is focused on describing this design context to keep designs consistent between generations and to provide an area of creative exploration. The prose is the most vital part of the specification. 

````
## Colors

```yaml
# Tokens
colors:
  paper: '#F4F0E4'
  ink: '#1E1A14'
  vermilion: '#C3402A'
  rule-gray: '#B8B0A2'
```
<!-- Prose -->
A single-ink-plus-accent system.
- **Paper** {colors.paper} is the canvas — warmed xerox stock, never pure white.
- **Ink** {colors.ink} is graphite-warm and carries all typography, all rules, all diagram strokes; never pure black.
- **Vermilion** {colors.vermilion} is the single accent and appears only inside diagrams and chart annotations — never on typography, never on page numerals, never on metadata of any kind.
- **Rule gray** {colors.rule-gray} is reserved for hairline rules inside content (chart baselines, table dividers); never used as page-frame chrome.
````

The token values serve as context and are not rendering instructions. Generally, we do not accept or recommend token requirements in the specification. 

This keeps tokens as context that serves as a reference in the prose and focuses DESIGN.md on documenting the nature of the design and not trying to reinvent the decades long work established by languages and tools that came before us.

This document communicates the narrative and philosophy of DESIGN.md to clarify what problems it solves and how it currently attempts to solve them.

## A specific reference carries more than a list of adjectives

A design that references "A 1970s graduate lecture handout in the tradition of an old and established university" evokes a complete world: the one color of ink, the generous margins, the serif set at a reading size, and the absence of decoration. That single sentence carries more useful information than a dozen metric values. It carries the reasoning behind the values.

"Modern, clean, trustworthy, premium" evokes nothing specific. A model creates something in the center of what those words describe, creating an output that is typically generic. Adjectives describe a region. A specific reference describes a point.

## Negative Constraints: What you leave out defines the character

A clear design reference carries its restrictions automatically. A model knows what a lecture handout is, and it knows what a lecture handout is not. It does not glow or use a gradient. You don't have to list these. Naming the object names them, the same way naming a dog tells the model that dogs don't meow.

The negative constraints arrive for free when the reference is specific enough. An intentional list of "don'ts" is useful. A long rambling list is often a sign the description was too vague to carry them. A strong reference and an intentional list of do's and don'ts working together is the sweet spot.

```
## Do's and Don'ts

- **Don't** add a hero moment to the title page. A real handout title
  page is the first page of content, not a magazine cover.
- **Don't** reach for an italic standfirst beneath a large title.
  That is the Substack register.
- **Don't** add corner ornaments, chapter marks, or abstract glyphs
  in the margins.
- **Don't** color the page numeral or any other piece of metadata.
  Vermilion lives in diagrams only.
- **Don't** use a display-class serif. One family at four modest sizes.
- **Don't** use Bold. Anywhere.
- **Don't** use sans-serif for any role other than monospace metadata.
- **Don't** introduce dark mode, gradients, glows, glass surfaces,
  drop shadows, or rounded corners.
- **Do** treat the handout as a printed object. The screen is the
  substrate; the design is the page.
- **Do** keep vermilion inside diagrams. Its scarcity outside is what
  makes its presence inside meaningful.
- **Do** trust modest size differences. The section title is only
  ~1.9× body, not 5× body.
- **Do** let pages have visible white space. A page that ends
  two-thirds of the way down is correct, not under-filled.
```

## The format grows through its users, not its spec

The spec defines the structural minimum that every DESIGN.md shares: a name, and a small set of categories (colors, typography, spacing, rounded, components) that are universal enough to standardize. Everything beyond that minimum is yours to define. The format accepts any key, any section, any structure your design system needs.

The spec standardizes the categories where consistency helps. It leaves open the categories where flexibility helps more: motion, iconography, elevation, text casing, paragraph measure. One team's motion tokens are CSS animation curves. Another's are audio-domain time constants measured in buffer blocks. The right shape is specific to each system, and the format already lets you define it:

````
## Motion

```yaml
motion:
  feedback: 120ms
  content: 250ms
  easing: 'cubic-bezier(0.2, 0, 0, 1)'
```

Transitions are quick and mechanical. Nothing bounces, nothing overshoots, nothing lingers. State changes should feel like a light switch, not a door closing.

- Interactive feedback (hover, press, toggle): {motion.feedback}, always {motion.easing}.
- Content transitions (page, panel, modal): {motion.content}, same curve.
- Nothing in the UI animates longer than 300ms. If something takes longer, cut it.
- Respect `prefers-reduced-motion`: all durations collapse to 0ms.
````

The linter accepts these values and agents read the prose. No spec change was needed because the tokens themselves are context rather than instruction.
