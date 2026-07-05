---
title: "A production AI app isn't picking the right model — the seven layers nobody talks about"
type: article
year: 2026
category: applications
raw_path: raw/articles/patel-2026-production-ai-app-seven-layers.md
raw_filename: "patel-2026-production-ai-app-seven-layers.md"
source_collection: external
author: "Manthan Patel"
url: "https://www.linkedin.com/posts/leadgenmanthan_a-production-ai-app-isnt-picking-the-right-share-7479404260216995843-Gh3z/"
publisher: "LinkedIn"
tags: [production-ai, app-architecture, claude-code, harness, project-structure]
---

A production AI app isn't picking the right model. A production AI app isn't a clever prompt. A production AI app isn't a fine-tuned model. A production AI app isn't an agent framework. A production AI app isn't a wrapper around an API. The autonomy of a production AI app is the disciplined practice of turning these layers into one system that holds up when real users show up. It starts by understanding what each layer does and how they connect.

**1. The Surface: app/**
- The Next.js router that runs everything your users touch
- Product pages, auth, billing, checkout, and 30+ SEO pages all live here
- Your job is to keep this layer thin and push the real logic deeper

**2. The Engine: lib/**
This is where the actual work happens, not the UI. The core logic sits in a few focused modules:
- export/: the pipeline that makes the product worth paying for
- payments/: Stripe wired for real subscriptions
- security/: row-level security so users only see their own data

**3. The State Layer: stores/**
- Undo-able client state with zustand and zundo
- editorStore.ts tracks every change so users can hit Ctrl+Z and nothing breaks
- subscriptionStore.ts holds plan limits and billing state the UI can trust

**4. The Building Blocks: components/ + hooks/**
- UI primitives plus 20+ custom React hooks
- One editor, marketing, and dashboard system instead of copy-pasted screens

**5. The Data Foundation: supabase/**
- Auth, Postgres, and RLS with separate dev and prod environments
- Migrations are versioned, so your schema is never a guess
- You never test against live user data

**6. The Safety Net: e2e/ + tests/**
- Playwright for end-to-end, Vitest for units
- Wired for CI, so regressions get caught before they ship

**7. The New Layer: ./claude/**
- settings.json, hooks, agents, skills, and commands give Claude full context
- CLAUDE.md and AGENTS.md sit at the root, so every run starts with full picture

**Closing Statement:**
"The model is the easy 10%. These layers are the 90% nobody talks about." Build structure once and reuse it across projects.
