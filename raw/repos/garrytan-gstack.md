---
title: "gstack: AI-Powered Software Factory"
type: repo
year: 2026
category: agents
raw_path: raw/repos/garrytan-gstack.md
raw_filename: "garrytan-gstack.md"
source_collection: external
org: "garrytan"
repo: "gstack"
url: "https://github.com/garrytan/gstack"
license: "MIT"
tags: [claude-code, skill-pack, slash-commands, agentic-workflow, software-factory, garry-tan, yc]
---

# gstack: AI-Powered Software Factory

gstack is an open-source skill pack for Claude Code that organizes AI-assisted development into a structured sprint workflow. Created by Garry Tan (YC President & CEO), it transforms how individual developers ship software by leveraging AI agents as specialized team members.

## Core Concept

The system treats Claude Code as a virtual engineering team with distinct roles:
- CEO/Founder (strategic product thinking)
- Engineering Manager (architecture decisions)
- Designer (UI/UX quality)
- Staff Engineer (code review)
- QA Lead (testing with real browsers)
- Security Officer (threat modeling)
- Release Engineer (deployment)

## Key Statistics

Tan demonstrates productivity gains through normalized logical line counts (excluding AI inflation):
- **2026 pace**: ~810× faster than 2013
- **Year-to-date 2026**: 240× entire 2013 output
- **Contributions 2026**: 1,237+ (vs. 772 in 2013)

## Sprint Structure

The workflow follows: **Think → Plan → Build → Review → Test → Ship → Reflect**

Major skills include:
- `/office-hours` - Product interrogation before coding
- `/autoplan` - Fully-reviewed planning pipeline
- `/design-shotgun` - Visual design exploration with AI mockups
- `/design-html` - Production-ready HTML generation
- `/review` - Code review with auto-fixes
- `/qa` - Browser-based testing with bug fixes
- `/ship` - CI/testing/deployment automation
- `/cso` - Security audits (OWASP + STRIDE)

## Browser Capabilities

- Real Chromium headless browser with anti-bot stealth
- GStack Browser GUI for headed mode
- Sidebar agent for autonomous web tasks
- Prompt injection defense via ML classifiers
- Cross-agent coordination (`/pair-agent`)

## Installation & Availability

**30-second setup**: Clone repo and run `./setup` script

**Multi-platform**: Works with Claude Code, OpenClaw, Cursor, Codex CLI, and other AI agents

**License**: MIT (free, open source, no premium tier)

## Advanced Features

- **GBrain**: Persistent knowledge base for cross-session memory
- **Parallel sprints**: Conductor supports 10-15 concurrent sessions
- **Domain skills**: Per-site automation patterns that improve over time
- **Continuous checkpoint mode**: Auto-commits WIP with structured context
- **Cross-model analysis**: `/codex` provides independent OpenAI reviews

## Key Philosophy

The project emphasizes that "the point isn't who typed it, it's what shipped." gstack enforces process discipline across distributed AI work, preventing common failures (wrong assumptions, overcomplexity, sloppy edits) through methodology skills rather than raw coding capability.

> 비고: 본 raw 파일은 사용자 지시(ingest)에 따라 `WebFetch`로 취득한 README 본문 요약(rule #1 자료수집 예외). 원문은 https://github.com/garrytan/gstack 참조.
