---
title: "Equipping agents for the real world with Agent Skills"
type: article
year: 2025
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/anthropic-2025-equipping-agents-for-the-real.md
raw_filename: "anthropic-2025-equipping-agents-for-the-real.md"
source_collection: external
author: "Anthropic"
url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
publisher: "Anthropic Engineering"
tags: [agent-skills, skills, progressive-disclosure, context-engineering, tool-use, mcp, claude-code, agent-sdk]
figures:
  - id: fig01
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig01.jpg
    caption: "Agent + Skills + Virtual Machine — 에이전트 구성(코어 시스템 프롬프트·Equipped Skills·Equipped MCP servers)과 에이전트 가상머신(Bash/Python/Node.js + Skill 디렉토리가 사는 파일 시스템)의 전체 아키텍처"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig02.jpg
    caption: "A simple SKILL.md file — YAML frontmatter(name·description)와 Markdown 본문(Overview·Quick Start)으로 구성된 최소 스킬 파일"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig03.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig03.jpg
    caption: "Bundling additional content — SKILL.md 본문에서 ./reference.md·./forms.md를 참조로 연결해 세부 지식을 필요 시점에만 로드"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig04.jpg
    caption: "Progressive disclosure 레벨별 토큰 예산 — L1 메타데이터(항상 로드, ~100 토큰) / L2 본문(트리거 시, <5k) / L3+ 번들 파일(필요 시, unlimited*)"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig05.jpg
    caption: "Skills and the Context Window — 각 스킬의 짧은 스니펫이 시스템 프롬프트에 붙고, 태스크가 맞으면 Claude가 Bash로 SKILL.md·forms.md를 cat 해 트리거하는 시퀀스"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig06.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig06.jpg
    caption: "Bundling executable scripts — forms.md가 pypdf 기반 extract_fields.py를 참조해 토큰 대신 결정적(deterministic) 코드 실행으로 위임"
    strategy: manual
    curated: true
---

# Equipping agents for the real world with Agent Skills

**Published:** October 16, 2025 · **Publisher:** Anthropic Engineering

> 참고: 아래 본문은 원문(anthropic.com/engineering)을 자료 수집 목적으로 취득한 렌더링이다. 원문 URL은 frontmatter의 `url` 참조. 도식 6종은 `-figures/`에 원본 아카이브로 저장했다.

## Overview

Claude is powerful, but real work requires procedural knowledge and organizational context. Anthropic introduced **Agent Skills**, a framework enabling agents to access specialized capabilities through organized file structures. Skills let developers package domain expertise into composable resources that transform general-purpose agents into specialized tools tailored to specific organizational needs.

## What Are Agent Skills?

Agent Skills are directories containing a `SKILL.md` file along with supporting resources (scripts, references, assets). At minimum a skill is a folder with a `SKILL.md` holding metadata and instructions; it can bundle scripts, reference material, templates, and other files.

## The anatomy of a skill (progressive disclosure)

The anatomy of a skill follows a **progressive disclosure** design pattern:

- **Level 1 — Metadata:** YAML frontmatter with required `name` and `description` fields, loaded into the system prompt at startup (~100 tokens, always loaded).
- **Level 2 — Core documentation:** the main body of `SKILL.md`, loaded when Claude judges the skill relevant (<5k tokens, loaded when the skill triggers).
- **Level 3+ — Supplementary resources:** additional bundled files referenced from the core file, loaded only when necessary (as-needed by Claude, effectively unlimited).

This layered approach manages context-window usage: agents with file systems don't need to load entire skills into context simultaneously.

| Level | File | Context Window | # Tokens |
|---|---|---|---|
| 1 | SKILL.md Metadata (YAML) | Always loaded | ~100 |
| 2 | SKILL.md Body (Markdown) | Loaded when Skill triggers | <5k |
| 3+ | Bundled files (text files, scripts, data) | Loaded as-needed by Claude | unlimited* |

## Bundling additional content

The `SKILL.md` body can reference sibling files like `./reference.md` (advanced processing details) and `./forms.md` (form-filling instructions). Claude follows those references only when the task calls for them.

## Practical implementation — the PDF skill

The PDF skill example demonstrates real-world application. Claude already comprehends PDFs but lacks direct manipulation abilities. The skill bridges this gap by providing form-filling instructions and pre-written Python scripts for extracting form fields.

## Skills and the context window

Short snippets from each Skill are appended to the system prompt. On a request like "Fill out this PDF based on what you know about me", Claude decides to *trigger* the PDF skill by reading it (`Bash("cat /mnt/skills/pdf/SKILL.md")`), then follows the reference into `forms.md`. Full instructions load only when a task calls for them, so agents can keep many skills on hand with only a small context footprint.

## Skills and code execution

Skills can include executable code that Claude runs as tools (e.g. `pdf/extract_fields.py` built on `pypdf`), offering efficiency and deterministic reliability compared to token-based operations.

## Development guidelines

- Identify capability gaps through representative task testing.
- Structure content across multiple files as complexity grows.
- Design skill names and descriptions carefully for proper triggering.
- Iterate collaboratively with Claude to discover actual contextual needs.
- Audit skills thoroughly before installation, particularly regarding code dependencies and external network connections.

## Availability and future direction

Skills are supported across Claude.ai, Claude Code, the Claude Agent SDK, and the Claude Developer Platform. Anthropic plans additional features throughout the skill lifecycle and exploration of complementary integration with Model Context Protocol (MCP) servers. The framework emphasizes simplicity, enabling organizations, developers, and end users to create customized agents without building fragmented custom solutions for each use case.
