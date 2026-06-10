---
title: "Loop Engineering"
author: "Addy Osmani"
url: "https://addyosmani.com/blog/loop-engineering/"
publisher: "addyosmani.com"
publication_date: "2026-06-07"
fetched_at: "2026-06-10"
---

# Loop Engineering

**Publication Date:** June 7, 2026

**Author:** Addy Osmani

---

Loop engineering represents a fundamental shift in how developers interact with AI coding agents. Rather than manually prompting agents through each step, developers design systems that autonomously iterate toward defined goals.

## Core Concept

Peter Steinberger and Boris Cherny from Anthropic articulated this evolution: instead of "prompting coding agents," professionals should focus on "designing loops that prompt your agents." The traditional workflow—where developers write prompts, review outputs, and iteratively request changes—is giving way to autonomous systems that discover work, delegate tasks, evaluate results, and determine next steps independently.

## The Five Essential Components

A functional loop requires five foundational elements:

1. **Automations** – Scheduled discovery and triage processes that operate independently
2. **Worktrees** – Isolated parallel workspaces preventing agent collisions
3. **Skills** – Documented project knowledge preventing repeated context derivation
4. **Plugins and Connectors** – Integration with existing development tools via MCP
5. **Sub-agents** – Separation of implementation from verification functions

A sixth element—persistent state management through markdown files or project boards—preserves context across runs since models lack memory between sessions.

## Automations as the Loop's Heartbeat

Automations trigger scheduled tasks that surface work requiring attention. The Codex app and Claude Code both support recurring prompts on defined intervals. Claude Code offers `/loop` for cadence-based execution and `/goal` for conditional completion—continuing until specified criteria are met while delegating verification to secondary models.

## Worktrees Prevent Parallel Collisions

When multiple agents operate simultaneously, file conflicts emerge. Git worktrees provide isolated working directories sharing repository history, preventing simultaneous modifications to identical files. This isolation prevents the mechanical failures of concurrent editing.

## Skills Eliminate Context Redundancy

Skills encode project-specific knowledge in reusable formats, preventing agents from re-deriving architectural decisions and conventions with each execution. Both platforms use identical structures: folders containing `SKILL.md` files with instructions and optional supporting scripts.

## Connectors Enable Real-World Integration

Model connectors—built on MCP protocols—extend agent capabilities beyond filesystem access. Agents can query issue trackers, interact with staging APIs, and trigger notifications, enabling automated PR creation, ticket updates, and channel alerts upon successful completion.

## Sub-agents Create Verification Distance

The most impactful structural innovation splits implementation from evaluation. Different agents with separate instructions prevent the model from favorably grading its own work. Claude Code's `/goal` functionality internally applies this pattern to stopping conditions, assigning verification to independent models.

## Concrete Loop Architecture

A practical implementation might follow this pattern:

An automated daily run executes a triage skill reviewing CI failures, open issues, and recent commits, recording findings in persistent state. For actionable items, isolated worktrees spawn specialized sub-agents—one drafting fixes, another reviewing against project standards and test suites. Connectors automatically open pull requests and update tracking systems. Unresolved issues surface for human review.

This approach inverts the control structure: designers create the system once, then agents handle execution without continuous human prompting.

## Critical Limitations and Responsibilities

Loop automation introduces three persistent challenges:

**Verification burden remains human responsibility.** Autonomous loops executing unattended also generate unattended mistakes. Secondary verification agents strengthen confidence but cannot replace human judgment.

**Comprehension erosion accelerates.** Rapid code generation creates gaps between deployed systems and developer understanding. This "comprehension debt" expands unless developers actively review generated changes.

**Comfortable passivity becomes dangerous.** The seductive ease of loop execution invites cognitive disengagement—treating outputs as gospel rather than reviewing with critical perspective.

## The Engineer's Remaining Role

Loop design represents leverage—the work doesn't disappear, the control point shifts. Two engineers implementing identical loops achieve opposite outcomes: one leverages loops to accelerate understood work; another uses them to avoid understanding entirely. The tool remains neutral; engineer judgment determines results.

The transition from prompt engineering to loop engineering requires sustained engineering discipline. Designing loops demands deeper architectural thinking than crafting individual prompts. The leverage point relocated, but the responsibility for quality remained stationary—held exclusively by the engineer.

The conclusion: build loops deliberately, but remain the engineer, not merely the operator who initiates execution.

---

**Disclaimer:** Views expressed represent the author's personal opinions and do not reflect positions of Google or affiliated organizations.

© Copyright 2026 Addy Osmani
