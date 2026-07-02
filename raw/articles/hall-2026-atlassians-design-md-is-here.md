---
title: "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
type: article
year: 2026
category: agents
raw_path: raw/articles/hall-2026-atlassians-design-md-is-here.md
raw_filename: "hall-2026-atlassians-design-md-is-here.md"
source_collection: external
author: "Kylor Hall, Andrew Campbell"
url: "https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice"
publisher: "Atlassian Blog (How We Build)"
publication_date: "2026-06-15"
tags: [design-md, design-system, mcp, agent-skills, ui-generation, context-engineering, token-cost, atlassian-design-system, portable-context, vibe-coding]
---

# Atlassian's DESIGN.md is here: what we learned testing portable design context in practice

**Published:** June 15, 2026
**Authors:** Kylor Hall, Principal Prompt Engineer; Andrew Campbell, Senior Design Technologist
**Category:** How We Build

---

## Introduction

When AI generates user interfaces without proper context, the results often suffer from what the design community calls "slop"—functional output lacking visual identity or intentional design decisions. Without understanding a brand's components and patterns, AI defaults to generic averages.

Atlassian's design system team developed tools to provide AI agents with rich design context, including an ADS MCP server and detailed AI skills. These approaches reduce token costs and improve generation quality across thousands of product builders.

Recently, DESIGN.md—an open-source Markdown format created by Google for their Stitch design tool—has gained attention as a portable solution for combating AI-generated UI "slop."

---

## DESIGN.md: A Primer

**What it is:** A portable markdown file describing key design system elements. The file contains two parts:
- Machine-readable semantic tokens (YAML frontmatter with design tokens)
- Human and agent-readable design rationale (Markdown prose explaining visual style)

**What it isn't:** A complete technical specification for production design systems. The format excludes code libraries, linters, and detailed Figma specs—it captures intent rather than full details.

---

## Building Atlassian's DESIGN.md

Atlassian generated their own DESIGN.md from their existing structured content pipeline that powers their MCP server and agent skills. They tested it in common "vibe coding" tools and added stricter guidance for common mistakes.

### Testing at Team '26

The format was tested at Atlassian's Team '26 keynote, where Figma Make generated custom dashboards using the Teamwork Graph. Results showed that DESIGN.md transformed generic output into recognizably Atlassian interfaces with appropriate color, spacing, shape, typography, and elevation.

---

## Trade-offs in Production Environments

In production codebases with existing token and component libraries, DESIGN.md performed worse than MCP servers and skills:

| Approach | Design System Context | Average Token Usage | Average Time | Average Turns |
|----------|----------------------|-------------------|--------------|---------------|
| No context | ~5% | 4.20 million | 6m 19s | 43 |
| ADS MCP | ~80% | 3.75 million | 5m 1s | 35.1 |
| ADS skill | ~80% | 4.43 million | 5m 23s | 36 |
| **DESIGN.md** | **~30%** | **7.21 million** | **6m 46s** | **45.3** |

These results reflect general constraints observed but should not be considered conclusive, as different models, prompts, and environments produce varying outcomes.

### Limitation #1: Context Delivered All at Once

MCP servers load relevant context on-demand through tool calls. For extensive systems with hundreds of icons and semantic tokens, this approach avoids loading unnecessary items into context. DESIGN.md loads everything simultaneously, increasing costs and slowing responses while reducing accuracy through earlier context truncation.

### Limitation #2: Brevity Requires Sacrificing Detail

Design systems encode complex business guidance across thousands of views, files, and components. While Atlassian's on-demand MCP server and skills use approximately 2.5 MB of agent-readable guidance, DESIGN.md requires condensing this to roughly 80 KB (approximately 10,700 tokens without frontmatter).

This compression necessitated removing:
- Detailed usage guidance from 50+ components
- Foundation guidance
- Numerous design tokens with lower usage frequency

Agents without this context either produce less accurate results or gather information independently by reading component implementations.

### Limitation #3: Specification Reveals Design System Internals

DESIGN.md reveals complete implementation details intended for rebuilding a design system from scratch. In production environments, this encourages agents to recreate components rather than use existing libraries—creating maintainability issues and making code harder to review.

Testing showed DESIGN.md had greater variation in generation turns and tended to recreate components rather than import existing ones. Atlassian's MCP server and skills provide better abstraction by grounding in technical foundations, serving as instruction manuals for using existing systems paired with lint rules that enforce coding standards without additional token expenditure.

---

## Where DESIGN.md Is Most Useful

Despite production limitations, DESIGN.md's simplicity and portability offer value in specific scenarios:

- **High-level artistic direction:** For systems lacking documented visual direction, DESIGN.md provides helpful artifacts (though frontmatter duplicates existing codebase information)
- **Quick prototyping in unfamiliar environments:** Creating on-brand UIs for blue-sky prototyping without configuring entire tech stacks
- **Interoperability with design tools:** Guidance for tools that customize pre-built components to match design languages
- **Customer theming for adaptive UIs:** Enabling customers to describe their brand for AI-generated reports, charts, and dashboards

These scenarios share a common characteristic: agent-generated UI in environments where existing design system outputs aren't available or practical.

---

## Getting Started with Atlassian's DESIGN.md

Atlassian has shared their DESIGN.md files at [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md) for use with agents supporting the specification.

Their implementation diverges from the standard in several ways:
- Includes non-standard properties providing important component rendering context
- Provides a separate dark mode variant since the current standard doesn't support theming
- Feedback has been shared on GitHub, with some suggestions already incorporated

The team encourages industry-wide participation in shaping the standard.

---

## Summary

DESIGN.md serves as a useful portability format—a design system snapshot rather than a replacement for richer tooling. When agents support MCP or skills, those approaches deliver superior results at reduced cost. However, for cross-platform portability, customer theming, and blue-sky prototyping, a well-structured DESIGN.md represents meaningful progress.

"The whole ecosystem benefits when design systems are legible to AI ✨"
