---
title: "Headroom — The context compression layer for AI agents"
type: repo
year: 2026
category: agents
raw_path: raw/repos/headroomlabs-ai-headroom.md
raw_filename: "headroomlabs-ai-headroom.md"
source_collection: external
org: "headroomlabs-ai"
repo: "headroom"
url: "https://github.com/headroomlabs-ai/headroom"
canonical_repo: "https://github.com/chopratejas/headroom"
license: "Apache-2.0"
tags:
  - context-compression
  - token-reduction
  - ai-agents
  - proxy
  - mcp
  - cross-agent-memory
  - ccr
  - reversible-compression
  - cache-alignment
  - smartcrusher
  - codecompressor
  - kompress-v2-base
  - output-token-reduction
  - claude-code
  - local-first
figures:
  - id: fig01
    file: assets/headroomlabs-ai-headroom/HeadroomDemo-Fast.gif
    raw: "https://github.com/headroomlabs-ai/headroom/raw/main/HeadroomDemo-Fast.gif"
    caption: "라이브 데모: 10,144 → 1,260 토큰, 동일한 FATAL 로그 탐지"
    strategy: manual
    curated: false
  - id: fig02
    file: assets/headroomlabs-ai-headroom/headroom_learn.gif
    raw: "https://github.com/headroomlabs-ai/headroom/raw/main/headroom_learn.gif"
    caption: "headroom learn 동작: 실패 세션 마이닝 → CLAUDE.local.md 교정 기록"
    strategy: manual
    curated: false
---

# Headroom — The context compression layer for AI agents

> **60–95% fewer tokens · library · proxy · MCP · content-aware compressors · local-first · reversible**

Headroom compresses everything your AI agent reads — tool outputs, logs, RAG chunks, files, and conversation history — before it reaches the LLM. Same answers, fraction of the tokens.

Live: 10,144 → 1,260 tokens — same FATAL found.

## What it does

- **Library** — `compress(messages)` in Python or TypeScript, inline in any app
- **Proxy** — `headroom proxy --port 8787`, zero code changes, any language
- **Agent wrap** — `headroom wrap claude|codex|copilot|cursor|aider|opencode|cline|continue|goose|openhands|openclaw|vibe` in one command; undo with `headroom unwrap <tool>`
- **MCP server** — `headroom_compress`, `headroom_retrieve`, `headroom_stats` for any MCP client
- **Cross-agent memory** — shared store across Claude, Codex, Gemini, auto-dedup
- **`headroom learn`** — mines failed sessions, writes corrections to `CLAUDE.local.md` (default, gitignored) or `CLAUDE.md` / `AGENTS.md` / `GEMINI.md`
- **Output token reduction** — trims what the model *writes back* (not just what you send): drops ceremony/restated code and skips deep "thinking" on routine steps.
- **Reversible (CCR)** — originals are cached for retrieval on demand

## How it works (30 seconds)

```
 Your agent / app
   (Claude Code, Cursor, Codex, LangChain, Agno, Strands, your own code…)
        │   prompts · tool outputs · logs · RAG results · files
        ▼
    ┌────────────────────────────────────────────────────┐
    │  Headroom   (runs locally — your data stays here)  │
    │  ────────────────────────────────────────────────  │
    │  CacheAligner  →  ContentRouter  →  CCR            │
    │                    ├─ SmartCrusher   (JSON)        │
    │                    ├─ CodeCompressor (AST)         │
    │                    └─ Kompress-v2-base (text, HF)  │
    │                                                    │
    │  Cross-agent memory  ·  headroom learn  ·  MCP     │
    └────────────────────────────────────────────────────┘
        │   compressed prompt  +  retrieval tool
        ▼
 LLM provider  (Anthropic · OpenAI · Bedrock · …)
```

- **ContentRouter** — detects content type, selects the right compressor
- **SmartCrusher / CodeCompressor / Kompress-v2-base** — compress JSON, AST, or prose
- **CacheAligner** — stabilizes prefixes so provider KV caches actually hit
- **CCR** — stores originals locally; LLM calls `headroom_retrieve` if it needs them

## Get started (60 seconds)

```bash
# 1 — Install
pip install "headroom-ai[all]"          # Python — ships the `headroom` CLI
npm install headroom-ai                 # TypeScript SDK only — no `headroom` CLI

# 2 — Pick your mode
headroom wrap claude                    # wrap a coding agent
headroom proxy --port 8787              # drop-in proxy, zero code changes
# or: from headroom import compress      # inline library

# 3 — Verify setup and see the savings
headroom doctor                         # health check — confirms routing is working
headroom perf
headroom dashboard                      # live savings dashboard (proxy must be running)
```

The `headroom` CLI ships **only** via the PyPI package. The npm `headroom-ai` is the TypeScript SDK.

Granular extras: `[proxy]`, `[mcp]`, `[ml]`, `[code]`, `[memory]`, `[vector]` (optional HNSW backend — needs a C++ toolchain), `[relevance]`, `[image]`, `[agno]`, `[langchain]`, `[evals]`, `[pytorch-mps]`. Requires **Python 3.10+**.

## Proof

**Savings on real agent workloads:**

| Workload                      | Before | After  | Savings |
|-------------------------------|-------:|-------:|--------:|
| Code search (100 results)     | 17,765 |  1,408 | **92%** |
| SRE incident debugging        | 65,694 |  5,118 | **92%** |
| GitHub issue triage           | 54,174 | 14,761 | **73%** |
| Codebase exploration          | 78,502 | 41,254 | **47%** |

**Accuracy preserved on standard benchmarks:**

| Benchmark  | Category | N   | Baseline | Headroom | Delta      |
|------------|----------|----:|---------:|---------:|------------|
| GSM8K      | Math     | 100 |    0.870 |    0.870 | **±0.000** |
| TruthfulQA | Factual  | 100 |    0.530 |    0.560 | **+0.030** |
| SQuAD v2   | QA       | 100 |        — |  **97%** | 19% compression |
| BFCL       | Tools    | 100 |        — |  **97%** | 32% compression |

Reproduce: `python -m headroom.evals suite --tier 1`

## Output token reduction (cut what the model writes back)

Everything above shrinks the prompt you **send**. But you also pay for every token the model **writes back** — and on Opus-class models output costs 5× input. A lot of that output is waste: "Great, let me…" preambles, re-printing code, and deep "thinking" on routine steps.

Headroom can trim that too, from the proxy, without you changing any code:

- **Verbosity steering** — appends a short "be terse, don't restate context" note to the end of the system prompt (so your prompt cache still hits).
- **Effort routing** — when a turn is just the model resuming after a tool result (a file read, a passing test), it dials the model's thinking effort down. New questions and errors keep full effort.

```bash
export HEADROOM_OUTPUT_SHAPER=1     # off by default
headroom proxy --port 8787
```

`headroom wrap` hot-syncs your current settings to a running proxy via a loopback `POST /admin/runtime-env`, so they take effect immediately with no restart.

**Learn the right terseness for you:**

```bash
headroom learn --verbosity            # preview what it found (dry run)
headroom learn --verbosity --apply    # save it; the proxy uses it from now on
```

**See how many output tokens you saved** — output savings are *counterfactual*, so Headroom reports an honest estimate with a confidence range:

```bash
headroom output-savings
# Reduction: 31.7%  (95% CI 27.7% … 35.7%)   [estimated]
```

Want a *measured* number? Leave 10% of conversations unshaped as a control group: `export HEADROOM_OUTPUT_HOLDOUT=0.1`.

## Agent compatibility matrix

| Agent        | `headroom wrap` | Notes                            |
|--------------|:---------------:|----------------------------------|
| Claude Code  | ✅              | `--memory` · `--code-graph` · `--1m` · `--tool-search` |
| Codex        | ✅              | shares memory with Claude        |
| Cursor       | Manual setup    | starts proxy and prints base URLs for Cursor settings |
| Aider        | ✅              | starts proxy + launches          |
| Copilot CLI  | ✅              | starts proxy + launches          |
| OpenClaw     | ✅              | installs as ContextEngine plugin |
| OpenCode     | ✅              | injects config · starts proxy + launches |
| Cline        | ✅              | starts proxy + injects config    |
| Continue     | ✅              | starts proxy + injects config    |
| Goose        | ✅              | starts proxy + launches          |
| OpenHands    | ✅              | starts proxy + launches          |
| Mistral Vibe | ✅              | starts proxy + launches          |
| Cortex Code  | Library only    | 60–65% savings (library mode; no `wrap`) |

Any OpenAI-compatible client works via `headroom proxy`. MCP-native: `headroom mcp install`. Undo durable wrapping with `headroom unwrap <tool>` (supports: `claude`, `copilot`, `codex`, `opencode`, `openclaw`).

### GitHub Copilot CLI subscription mode

```bash
headroom copilot-auth login
headroom wrap copilot --subscription -- --model gpt-4o
```

Routes GitHub Copilot CLI subscription traffic through the local proxy: exchanges Headroom's reusable GitHub OAuth token for Copilot's short-lived API token and applies the same proxy compression pipeline. For GitHub Enterprise Server / custom-domain deployments, set `GITHUB_COPILOT_ENTERPRISE_DOMAIN`. macOS Keychain auth reuse is smoke-tested; Windows Credential Manager, Linux Secret Service, and Docker/CI paths still need OS validation (prefer explicit `GITHUB_COPILOT_TOKEN` there).

## When to use · When to skip

**Great fit if you…**
- run AI coding agents daily and want savings without changing your code
- work across multiple agents and want shared memory
- need reversible compression — originals retrievable via CCR within the configured TTL

**Skip it if you…**
- only use a single provider's native compaction and don't need cross-agent memory
- work in a sandboxed environment where local processes can't run

### Integrations — drop Headroom into any stack

| Your setup             | Hook in with                                                     |
|------------------------|------------------------------------------------------------------|
| Any Python app         | `compress(messages, model=…)`                                    |
| Any TypeScript app     | `await compress(messages, { model })`                            |
| Anthropic / OpenAI SDK | `withHeadroom(new Anthropic())` · `withHeadroom(new OpenAI())`   |
| Vercel AI SDK          | `wrapLanguageModel({ model, middleware: headroomMiddleware() })` |
| LiteLLM                | `litellm.callbacks = [HeadroomCallback()]`                       |
| LangChain              | `HeadroomChatModel(your_llm)`                                    |
| Agno                   | `HeadroomAgnoModel(your_model)`                                  |
| Strands                | Strands guide                                                    |
| ASGI apps              | `app.add_middleware(CompressionMiddleware)`                      |
| Multi-agent            | `SharedContext().put / .get`                                     |
| MCP clients            | `headroom mcp install`                                           |

### What's inside

- **SmartCrusher** — universal JSON: arrays of dicts, nested objects, mixed types.
- **CodeCompressor** — AST-aware for Python, JS/TS, Go, Rust, Java, C/C++, Perl.
- **Kompress-v2-base** — HuggingFace model, trained on agentic traces.
- **Image compression** — 40–90% reduction via trained ML router.
- **CacheAligner** — stabilizes prefixes so Anthropic/OpenAI KV caches actually hit.
- **CCR** — reversible compression; LLM retrieves originals on demand.
- **Cross-agent memory** — shared store, agent provenance, auto-dedup.
- **SharedContext** — compressed context passing across multi-agent workflows.
- **`headroom learn`** — plugin-based failure mining for Claude, Codex, Gemini.

### Pipeline internals

One stable request lifecycle across `compress()`, the SDK, and the proxy:

`Setup` → `Pre-Start` → `Post-Start` → `Input Received` → `Input Cached` → `Input Routed` → `Input Compressed` → `Input Remembered` → `Pre-Send` → `Post-Send` → `Response Received`

- **Transforms** do the work: CacheAligner, ContentRouter, SmartCrusher, CodeCompressor, Kompress-v2-base.
- **Pipeline extensions** observe/customize lifecycle stages via `on_pipeline_event(...)`.
- Provider/tool-specific behavior lives under `headroom/providers/` (`claude`, `copilot`, `codex`, `openclaw`, `gemini`, `registry.py`).

## Headroom for teams

Headroom OSS is built for **individual developers** (local-first, free, Apache 2.0). Org-wide deployment (shared always-on deployment, centralized config, savings dashboards, SSO, air-gapped/VPC installs) is offered as self-hosted-with-support or fully managed via **hello@headroomlabs.ai**. Everything in the repo stays open source (Apache 2.0).

## Install

```bash
pip install "headroom-ai[all]"          # Python, everything — includes the `headroom` CLI
npm install headroom-ai                 # TypeScript SDK (library only — no `headroom` CLI)
docker pull ghcr.io/chopratejas/headroom:latest
```

`[all]` covers the core stack but excludes framework adapters — install separately: `pip install "headroom-ai[langchain]"` (also `[agno]`, `[strands]`, `[anyllm]`, `[bedrock]`).

### Updating

```bash
headroom update          # detects pip / pipx / uv tool and upgrades in place
headroom update --check  # report the latest release without upgrading
headroom update --pre    # include pre-releases
```

The proxy shows a one-line "update available" notice on startup (checks PyPI at most once a day, background, never blocks; opt out with `HEADROOM_UPDATE_CHECK=off`).

### Corporate / SSL-inspection environments

If `pip install` fails with `CERTIFICATE_VERIFY_FAILED`, the network uses SSL inspection (MITM proxy with a company CA). Install Rust first so `maturin` doesn't fetch `rustup` over an untrusted connection, or use a prebuilt wheel (`pip install --only-binary headroom-ai headroom-ai`; published for win_amd64, Linux x86_64/aarch64, macOS Apple Silicon). Two runtime assets are fetched over TLS: `cdn.pyke.io` (ONNX Runtime for the Rust core) and `huggingface.co` (kompress-base model) — trust the corporate CA via `REQUESTS_CA_BUNDLE`/`SSL_CERT_FILE`/`CURL_CA_BUNDLE`, or run offline (`HF_HUB_OFFLINE=1`, `ORT_STRATEGY=system`).

For Python 3.13+ strict-mode failures ("Basic Constraints of CA cert not marked critical", RFC 5280 §4.2.1.9 enforced by `VERIFY_X509_STRICT`), set `HEADROOM_TLS_STRICT=0` — clears only the strict flag from TLS contexts Headroom controls; chain/signature/expiry/hostname checks stay on.

## headroom learn

`headroom learn` — mines failed sessions, writes corrections to `CLAUDE.local.md` (default, gitignored; `--target CLAUDE.md` for the shared team file) / `AGENTS.md` / `GEMINI.md`.

## Compared to

Headroom runs **locally**, covers **every** content type, works with every major framework, and is **reversible**.

|                | Scope                                          | Deploy                             | Local | Reversible |
|----------------|------------------------------------------------|------------------------------------|:-----:|:----------:|
| **Headroom**   | All context — tools, RAG, logs, files, history | Proxy · library · middleware · MCP | Yes   | Yes        |
| RTK            | CLI command outputs                            | CLI wrapper                        | Yes   | No         |
| lean-ctx       | CLI commands, MCP tools, editor rules          | CLI wrapper · MCP                  | Yes   | No         |
| Compresr, Token Co. | Text sent to their API                    | Hosted API call                    | No    | No         |
| OpenAI Compaction | Conversation history                        | Provider-native                    | No    | No         |

**Attribution.** Headroom ships with the RTK binary for shell-output rewriting; can also use lean-ctx as the CLI context tool (`HEADROOM_CONTEXT_TOOL=lean-ctx`).

## Contributing

```bash
git clone https://github.com/chopratejas/headroom.git && cd headroom
uv sync --extra dev && uv run pytest
```

Devcontainers in `.devcontainer/` (default + `memory-stack` with Qdrant & Neo4j).

## License

Apache 2.0.
