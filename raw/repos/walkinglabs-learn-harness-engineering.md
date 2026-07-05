---
title: "Learn Harness Engineering"
type: repo
year: 2025
category: agents
raw_path: raw/repos/walkinglabs-learn-harness-engineering.md
raw_filename: "walkinglabs-learn-harness-engineering.md"
source_collection: external
org: "walkinglabs"
repo: "learn-harness-engineering"
url: "https://github.com/walkinglabs/learn-harness-engineering"
license: "MIT"
tags: [harness-engineering, coding-agents, course, AGENTS.md, verification, agent-lifecycle]
---

# Learn Harness Engineering: Complete README

## Course Overview

**Learn Harness Engineering** is a project-based course teaching how to build reliable AI coding agent environments. The course includes:

- **12 Lectures** exploring core harness engineering concepts
- **6 Projects** applying these principles to an Electron-based knowledge base app
- **15 Languages** including English, Chinese, Japanese, Korean, Spanish, French, Russian, German, Arabic, Vietnamese, Uzbek, Turkish, Portuguese, and Ukrainian

## Core Philosophy

The fundamental premise: strong AI models fail on real engineering tasks without proper environmental structure. The course references research from OpenAI and Anthropic demonstrating that identical models produce dramatically different results depending on harness quality—one experiment showed the difference between "$9 in 20 minutes producing non-functional output" versus "$200 in 6 hours creating a playable product."

## The Harness Pattern

A complete harness comprises five interconnected subsystems:

**Instructions** — Agent operating manuals (AGENTS.md, CLAUDE.md, documentation)

**State** — Persistent progress tracking (progress logs, feature lists, git history)

**Verification** — Proof-based completion (tests, linting, type-checking, end-to-end pipelines)

**Scope** — Single-feature constraints preventing overreach and incomplete work

**Lifecycle** — Structured sessions with initialization, execution, and clean-state handoff phases

## Learning Structure

The course progresses through six phases, each building on previous knowledge:

1. **Problem Recognition** — Understanding capability-reliability gaps
2. **Repository Architecture** — Structuring codebases for agent readability
3. **Session Continuity** — Maintaining progress across multiple agent interactions
4. **Feedback Mechanisms** — Runtime corrections and scope boundaries
5. **Self-Verification** — Agents validating their own work
6. **Complete Integration** — Building full harness systems

## Project Evolution

All six projects center on the same Electron application, with each project's solution serving as the foundation for the next. This incremental approach demonstrates how harness mechanisms compound to improve reliability.

## Quick Start Implementation

The course provides immediately usable templates:

- `AGENTS.md` — Operating instructions
- `init.sh` — Environment verification scripts
- `feature_list.json` — Machine-readable scope boundaries
- `progress.md` — Session-to-session continuity files

## Technical Requirements

Users need access to at least one coding agent tool (Claude Code, Codex, or equivalent) capable of:
- File editing in local repositories
- Command execution
- Multi-step task completion
- Output inspection and iteration

## Additional Resources

The repository includes:

- **harness-creator skill** — Scaffolds production-grade harnesses for new projects
- **audit-harness.sh** — Shell-based verification tool requiring no Node.js installation
- Multilingual resource library with templates and checklists

## Documentation Access

Full course materials, including lecture texts, project specifications, and resource templates, are available through the [VitePress documentation website](https://walkinglabs.github.io/learn-harness-engineering/).
