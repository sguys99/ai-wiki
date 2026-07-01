---
title: "Agent Skills"
type: article
year: 2026
category: agents
raw_path: raw/articles/osmani-2026-agent-skills.md
raw_filename: "osmani-2026-agent-skills.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/agent-skills/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-05-03"
tags: [agent-skills, claude-code, skills, sdlc, verification, anti-rationalization, progressive-disclosure, scope-discipline, software-engineering-at-google, harness-engineering]
---

# Agent Skills by Addy Osmani

**Date:** May 3, 2026

## Overview

Addy Osmani presents "Agent Skills," a framework designed to enforce senior-engineer practices in AI coding agents. The core premise is that agents naturally gravitate toward completing tasks with minimal process—skipping specifications, tests, reviews, and verification—unless explicitly constrained.

## Main Argument

Osmani argues that "a senior engineer's job is mostly the parts that don't show up in the diff." These include specs, tests, reviews, scope discipline, and verification. AI agents default to shipping code without these safeguards, replicating junior-engineer failure modes.

## Five Load-Bearing Design Principles

1. **Process over prose** – Workflows with checkpoints outperform reference essays; agents act on steps, not essays.

2. **Anti-rationalization tables** – Each skill includes common excuses paired with rebuttals (e.g., "This is too simple for a spec" → "Acceptance criteria still apply").

3. **Verification is non-negotiable** – Every workflow terminates in concrete evidence: passing tests, clean builds, or reviewer approval.

4. **Progressive disclosure** – Skills activate contextually rather than loading all twenty simultaneously, preserving token efficiency.

5. **Scope discipline** – Agents must "touch only what you're asked to touch," avoiding adjacent refactoring or file rewrites.

## Six SDLC Phases

Skills organize around: Define (`/spec`), Plan (`/plan`), Build (`/build`), Verify (`/test`), Review (`/review`), and Ship (`/ship`), mirroring standard engineering organizations' workflows.

## Google Engineering Practices Encoded

The skills embed practices from *Software Engineering at Google*, including:
- Hyrum's Law in API design
- Test pyramid (~80/15/5 split)
- ~100-line PR sizing limits
- Chesterton's Fence principle
- Trunk-based development

## Installation & Usage

Three modes: marketplace installation in Claude Code, dropping markdown into tools like Cursor, or reading skills as specification documents for team practices.

## Takeaways for All Teams

Even without agent tooling, organizations should adopt:
- Anti-rationalization tables documenting team shortcuts
- Process-driven workflows instead of lengthy reference docs
- Verification as mandatory exit criteria
- Progressive disclosure in handbooks and runbooks

## Broader Context

Skills function as one layer in "agent harness engineering," alongside AGENTS.md (rulebooks), hooks (enforcement), tools (actions), and session logs (memory). Long-running agents particularly benefit from enforced workflows.
