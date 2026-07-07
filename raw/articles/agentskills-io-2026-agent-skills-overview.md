---
title: "Agent Skills Overview (agentskills.io)"
type: article
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/agentskills-io-2026-agent-skills-overview.md
raw_filename: "agentskills-io-2026-agent-skills-overview.md"
source_collection: external
author: "Agent Skills community"
url: "https://agentskills.io/home"
publisher: "agentskills.io"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, ecosystem, client-showcase]
---

# Agent Skills Overview

> A standardized way to give AI agents new capabilities and expertise.
> (agentskills.io/home — 오픈 표준 공식 문서 사이트 홈)

## What are Agent Skills?

Agent Skills are a lightweight, open format for extending AI agent capabilities with specialized knowledge and workflows.

At its core, a skill is a folder containing a `SKILL.md` file. This file includes metadata (`name` and `description`, at minimum) and instructions that tell an agent how to perform a specific task. Skills can also bundle scripts, reference materials, templates, and other resources.

```
my-skill/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

## Why Agent Skills?

Agents are increasingly capable, but often don't have the context they need to do real work reliably. Skills solve this by packaging procedural knowledge and company-, team-, and user-specific context into portable, version-controlled folders that agents load on demand. This gives agents:

- **Domain expertise**: Capture specialized knowledge — from legal review processes to data analysis pipelines to presentation formatting — as reusable instructions and resources.
- **Repeatable workflows**: Turn multi-step tasks into consistent, auditable procedures.
- **Cross-product reuse**: Build a skill once and use it across any skills-compatible agent.

## How do Agent Skills work?

Agents load skills through **progressive disclosure**, in three stages:

1. **Discovery**: At startup, agents load only the name and description of each available skill, just enough to know when it might be relevant.
2. **Activation**: When a task matches a skill's description, the agent reads the full `SKILL.md` instructions into context.
3. **Execution**: The agent follows the instructions, optionally executing bundled code or loading referenced files as needed.

Full instructions load only when a task calls for them, so agents can keep many skills on hand with only a small context footprint.

## Where can I use Agent Skills? (Client Showcase)

Agent Skills are supported by a large number of AI tools and agentic clients. The site's LogoCarousel lists a broad ecosystem (each with its own skills docs), including:

Junie (JetBrains), Gemini CLI (Google), Autohand Code CLI, OpenCode, OpenHands, Mux (Coder), Cursor, Amp, Letta, Firebender, Goose (Block), GitHub Copilot, VS Code, Claude Code, Claude, OpenAI Codex, Piebald, Factory, pi, Databricks Genie Code, Agentman, TRAE (ByteDance), Spring AI, Roo Code, Mistral AI Vibe, Command Code, Ona, VT Code, Qodo, Laravel Boost, Emdash, Snowflake Cortex Code, Kiro, Workshop, Google AI Edge Gallery, nanobot, fast-agent, bub, Tabnine, Vita, Superconductor, Deep Code.

> 주목할 점: OpenAI Codex, Google Gemini CLI, Mistral Vibe, GitHub Copilot / VS Code (Microsoft), JetBrains Junie 등 경쟁 벤더가 모두 동일 포맷을 채택 — 사실상 cross-vendor 표준으로 확산.

## Open development

The Agent Skills format was originally developed by [Anthropic](https://www.anthropic.com/), released as an open standard, and has been adopted by a growing number of agent products. The standard is open to contributions from the broader ecosystem. Discussion happens on [GitHub](https://github.com/agentskills/agentskills) and [Discord](https://discord.gg/MKPE9g8aUy).

## Get started with Agent Skills

- **Quickstart** (`/skill-creation/quickstart`) — Create your first Agent Skill and see it in action.
- **Specification** (`/specification`) — The complete format specification for Agent Skills.
