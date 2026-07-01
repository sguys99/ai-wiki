---
title: "Agent Skills (GeekNews)"
type: article
year: 2026
category: agents
raw_path: raw/articles/hada-2026-agent-skills.md
raw_filename: "hada-2026-agent-skills.md"
source_collection: external
author: "GN⁺ (@neo)"
url: "https://news.hada.io/topic?id=29200"
publisher: "GeekNews (news.hada.io)"
publication_date: "2026-05"
tags: [agent-skills, geeknews, claude-code, cursor, gemini-cli, codex, aider, windsurf, opencode, verification, anti-rationalization, progressive-disclosure, community-discussion]
---

# Agent Skills — GeekNews (news.hada.io) 요약 + 토론

**Title:** Agent Skills
**Submitter:** GN⁺ (@neo)
**Date:** 2달전 (2026-05경)
**Source URL:** https://addyosmani.com/blog/agent-skills/
**Points:** 10P

---

## Summary

Agent Skills is a scaffolding framework that enforces senior engineering procedures through structured workflows, preventing AI coding agents from skipping specification, testing, review, and verification steps that experienced engineers typically follow.

---

## Key Bullet Points

**Core Purpose:**
- Prevents AI agents from taking shortcuts on essential engineering practices like specifications, testing, code reviews, and trust boundary reviews
- Addresses how agents default to completing tasks via shortest path without proper documentation or evidence

**Skill Structure:**
- Skills are Markdown files with frontmatter functioning as workflows, not reference documents
- Include ordered steps, checkpoints for evidence generation, and explicit exit criteria
- Repository contains 20 skills organized across 6 lifecycle stages (Define, Plan, Build, Verify, Review, Ship) with 7 slash commands

**Core Principles:**
- "Process over prose" – workflows agents can execute rather than essays
- Anti-rationalization tables with pre-written rebuttals to common shortcuts
- Verification as non-negotiable with concrete evidence requirements
- Progressive disclosure of skills based on current task context
- Scope discipline limiting changes to requested scope

**Implementation Options:**
- Claude Code marketplace installation
- Cursor `.cursor/rules/` directory integration
- Direct Markdown insertion into other tools (Gemini CLI, Codex, Aider, Windsurf, OpenCode)
- MIT licensed and openly available

**Google Engineering Alignment:**
- Maps to proven SDLC practices including Hyrum's Law, test-driven development, Chesterton's Fence, and trunk-based development
- Reflects Google's "~100-line PR" review standards and code-as-liability principle

---

## Top Comments Summary

**Criticism:**
- Skeptics argue LLMs inherently bypass rules regardless of documentation complexity; human review remains essential
- Questions whether strict rule-following works when LLM decision-making itself determines skill application
- Concerns about "fake productivity" perception from extended agent sessions

**Support:**
- Practitioners report "surprisingly effective" results in production deployments
- Emphasizes expected value over perfection – higher baseline reliability matters
- Notes parallel to human team management: same practices that govern engineers apply to agents

**Implementation Concerns:**
- Skills can consume significant context (some exceed 800 lines)
- Over-installation of unnecessary skills wastes tokens and context
- Better treated as reference patterns than complete mandatory installations
- Frontmatter-only loading mitigates full context pollution

**Broader Perspective:**
- Workflow structure matters more than specific tooling
- Similar to established automation principles in infrastructure and software development
- Represents legitimate productivity enhancement when coupled with rigorous process discipline
