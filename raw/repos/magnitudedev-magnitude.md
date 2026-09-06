---
title: "Magnitude (magnitudedev): Run your agent on local models"
type: repo
year: 2026
category: agents
raw_path: raw/repos/magnitudedev-magnitude.md
raw_filename: "magnitudedev-magnitude.md"
source_collection: external
org: "magnitudedev"
repo: "magnitude"
url: "https://github.com/magnitudedev/magnitude"
license: "Apache-2.0"
tags: [local-inference, inference-server, llama-cpp, gguf, quantization, speculative-decoding, coding-agents, harness, cli, rust, typescript, effect-ts, repo, oss]
---


<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/icon-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/brand/icon-light.svg">
    <img alt="Magnitude icon" src="assets/brand/icon-light.svg" width="120">
  </picture>
</p>

<h1 align="center">Magnitude</h1>

<p align="center"><strong>Run your agent on local models. Free, private, and offline.</strong></p>

<p align="center">
  <a href="https://docs.magnitude.dev"><img src="https://img.shields.io/badge/%F0%9F%93%95-Docs-0369a1?style=flat-square&labelColor=0369a1&color=gray" alt="Documentation"></a>
  <a href="https://discord.gg/EHt48pPWdC"><img src="https://img.shields.io/badge/Discord-Join-5865F2?style=flat-square&logo=discord&logoColor=white&labelColor=5865F2&color=gray" alt="Discord"></a>
  <a href="https://x.com/usemagnitude"><img src="https://img.shields.io/badge/Twitter-Follow-000000?style=flat-square&logo=x&logoColor=white&labelColor=000000&color=gray" alt="Follow Magnitude on Twitter"></a>
  <a href="https://github.com/magnitudedev/magnitude/stargazers"><img src="https://img.shields.io/github/stars/magnitudedev/magnitude" alt="GitHub Repo stars"></a>
  <a href="https://www.npmjs.com/package/@magnitudedev/cli"><img src="https://img.shields.io/npm/v/%40magnitudedev%2Fcli" alt="npm version"></a>
</p>

Magnitude is an open source inference server that runs the best local models for your hardware, plugged into the agent you already use. It profiles your machine, recommends the models that fit, then downloads, tunes, and runs them. Works with Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline, or use the built-in harness.

⭐ Help us reach more developers and grow the Magnitude community. Star this repo!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme/ecosystem-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/readme/ecosystem-light.png">
  <img alt="Pi, OpenCode, Hermes, Codex, Claude Code, and OpenClaw connected to Magnitude, which runs local models for your hardware." src="assets/readme/ecosystem-light.png">
</picture>

## Get started

### Set up with your agent

Send this prompt to your agent:

```text
Set up local models for me with the Magnitude CLI. Install it with `npm i -g @magnitudedev/cli` (or my package manager), then run `magnitude docs onboarding` and follow the instructions.
```

Your agent will profile your hardware, walk you through the best local models for it, download the ones you pick, and switch itself over to them.

### Install manually

Run these commands in your terminal:

```sh
npm i -g @magnitudedev/cli
magnitude setup
```

The interactive setup profiles your hardware, lets you choose from the recommended models, downloads your selection, and connects it to your harness.

Magnitude supports macOS and Linux. Windows is supported through WSL.

## Why Magnitude?

- **Free to run:** no token costs, API keys, or rate limits
- **Fully private and offline:** models, prompts, and files stay on your machine
- **Agent-first setup:** one prompt and your agent walks you through the rest
- **Knows your hardware:** profiles your chip, memory, and bandwidth
- **Recommends what fits:** the best models for your machine, with estimated tok/s
- **Tuned end to end:** speculative decoding, concurrency, all set for your machine
- **Models on demand:** loaded on request, unloaded when idle or memory fills
- **Open source:** Apache 2.0, yours to modify

## FAQ

### What is Magnitude?

An open source inference server that runs the best local models for your hardware, plugged into the agent you already use. It profiles your machine, recommends the models that fit, then downloads, tunes, and runs them.

### What hardware do I need?

There's no fixed minimum. Magnitude profiles your hardware and recommends the best models for your machine. More memory lets you run larger models.

### Why not just have my agent set up Ollama?

Your agent would be guessing. It doesn't know your hardware, which quant fits, or how fast it'll run. Magnitude gives it a catalog with recommendations computed for your machine, an onboarding flow that writes your harness config, and inference built for agent workloads. Models load just in time and unload when idle or memory gets tight.

### Which harnesses work with it?

Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline. During setup, your agent connects your harness to the model you pick. Or use Magnitude's built-in harness.

### Do I need to manage Magnitude after setup?

No. It runs in the background, loads models when your agent needs them, and unloads them when idle or memory gets tight. Your agent can install or switch models through the Magnitude CLI anytime.

### Does my data go to the cloud?

No. Prompts, files, and models stay on your machine.

### Can it run completely offline?

Yes. Once Magnitude and a model are downloaded, no internet connection needed.

### Can I use models outside the catalog?

Yes. You can [download compatible GGUF models from Hugging Face](https://docs.magnitude.dev/models#download-a-model-outside-the-catalog) and use them in Magnitude.

## Learn more

- [Documentation](https://docs.magnitude.dev)
- [CLI reference](https://docs.magnitude.dev/reference)
- [Discord](https://discord.gg/EHt48pPWdC)
- [Report an issue](https://github.com/magnitudedev/magnitude/issues)

## License

Magnitude is licensed under the [Apache License 2.0](https://github.com/magnitudedev/magnitude/blob/main/LICENSE).


---

<!-- 이하는 README 외에 함께 수집한 저장소 파일이다. 전부 원문 verbatim이며 요약하거나 번역하지 않았다. 수집 시각 2026-09-06, main 브랜치 기준. -->


# Appendix A: 저장소 메타데이터 (GitHub API, 2026-09-06)

```json
{
  "full_name": "magnitudedev/magnitude",
  "description": "Open source inference server that runs the best local models for your hardware, plugged into the agent you already use. Works with Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline.",
  "created_at": "2026-06-12T09:06:26Z",
  "pushed_at": "2026-09-06T07:15:54Z",
  "stargazers_count": 3437,
  "forks_count": 247,
  "open_issues_count": 17,
  "language": "TypeScript",
  "default_branch": "main",
  "homepage": "https://magnitude.dev",
  "topics": [],
  "license": "Apache-2.0"
}
```


# Appendix B: 저장소 루트 구성

```
dir  .agents
dir  .changeset
file .dockerignore
dir  .github
file .gitignore
file .gitmodules
file AGENTS.md
file CONTRIBUTING.md
file LICENSE
file README.md
dir  assets
file bun.lock
file bunfig.toml
dir  cli
dir  design
dir  desktop
dir  docs
dir  inference
dir  info
dir  integrations
file package.json
dir  packages
dir  patches
dir  scripts
file tsconfig.json
file turbo.json
file vitest.workspace.ts
dir  web
```


# Appendix C: 워크스페이스 구성 (blob 수 기준)

`package.json`의 workspaces: `cli`, `desktop`, `web`, `inference`, `integrations/*`, `packages/*` (Bun workspace + Turborepo).

`packages/`:

```
 131  acn
  15  acn-dashboard
  85  acn-protocol
 399  agent
 109  ai
 198  client-common
  35  daemon-management
  12  dom-extract
  19  effect-query
  96  event-core
   5  generate-id
  34  harness
  36  icn
  17  icn-protocol
  99  inference-benchmark
  11  inference-benchmark-dashboard
  15  launcher
   5  logger
  28  markdown-cst
  22  openapi-effect
  49  providers
  66  release
  14  ripgrep
  36  roles
   9  scratchpad
  28  sdk
  29  shell-classifier
  11  skills
  70  storage
  30  tracing
  37  utils
  37  vcs
  10  version
```

`inference/crates/` (Rust):

```
benchmark-runner
icn-api
icn-catalog
icn-contracts
icn-engine
icn-hardware
icn-models
icn-parity
icn-parity-probe
icn-reasoning
icn-server
icn-speculative
icn-utils
```

`cli/src/`:

```
   8  agent-docs
   1  app.overlay-keyboard-policy.test.ts
   1  app.start-state.test.ts
   1  app.tsx
  26  commands
  29  components
   2  data
 144  features
  31  harness-connections
   3  headless
  24  hooks
   1  index.tsx
  12  markdown
   8  platform
   4  runtime
   4  server
   7  startup
   3  state
   7  types
  24  utils
   1  version.ts
```


# Appendix D: 공식 문서 `docs/` (verbatim)


## `docs/introduction.mdx`

---
title: Introduction
description: "Run your agent on local models. Free, private, and offline."
icon: compass
---

Magnitude is an open source inference server that runs the best local models for your hardware, plugged into the agent you already use. It profiles your machine, recommends the models that fit, then downloads, tunes, and runs them. Works with Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline, or use the built-in harness.

## Why Magnitude?

- **Free to run:** no token costs, API keys, or rate limits
- **Fully private and offline:** models, prompts, and files stay on your machine
- **Agent-first setup:** one prompt and your agent walks you through the rest
- **Knows your hardware:** profiles your chip, memory, and bandwidth
- **Recommends what fits:** the best models for your machine, with estimated tok/s
- **Tuned end to end:** speculative decoding, concurrency, all set for your machine
- **Models on demand:** loaded on request, unloaded when idle or memory fills
- **Open source:** Apache 2.0, yours to modify

Magnitude works with Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline, or you can use Magnitude's built-in harness.

[Get started by sending one prompt to your agent](/get-started). After setup, Magnitude runs in the background and loads the selected model when your agent needs it.


## `docs/get-started.mdx`

---
title: Get Started
description: "Set up local inference with your agent or install manually"
icon: rocket
---

## Set up with your agent

Send this prompt to your agent:

```text
Set up local models for me with the Magnitude CLI. Install it with `npm i -g @magnitudedev/cli` (or my package manager), then run `magnitude docs onboarding` and follow the instructions.
```

Your agent will profile your hardware, walk you through the best local models for it, download the ones you pick, and switch itself over to them.

## Install manually

Run these commands in your terminal to start the interactive setup:

<Tabs>
  <Tab title="npm">
    ```sh
    npm install -g @magnitudedev/cli
    magnitude setup
    ```
  </Tab>
  <Tab title="bun">
    ```sh
    bun add -g @magnitudedev/cli
    magnitude setup
    ```
  </Tab>
  <Tab title="pnpm">
    ```sh
    pnpm add -g @magnitudedev/cli
    magnitude setup
    ```
  </Tab>
  <Tab title="yarn">
    ```sh
    yarn global add @magnitudedev/cli
    magnitude setup
    ```
  </Tab>
</Tabs>

Interactive setup:

1. Profiles your processor, memory, and memory bandwidth.
2. Ranks model, quantization, and context combinations for your hardware.
3. Shows the speed, intelligence, and memory trade-offs.
4. Downloads and configures the model you choose.
5. Connects the model to your chosen harness.
6. Launches the harness with the model ready to use.

Magnitude supports the Magnitude Harness, Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline.

Magnitude supports macOS and Linux. Windows is supported through WSL.

## Start working

Once setup is complete, continue in your harness. If your agent gives you handoff instructions, follow them first. Magnitude runs headlessly in the background, loads the model when your agent requests it, and manages memory and concurrency automatically.

You do not need to learn the Magnitude CLI. Your agent can inspect Magnitude and find, install, or switch local models later. You can also choose between installed models from your harness model dropdown.

<Note>
  Codex and Claude Code connections depend on the Magnitude background service, including when you switch back to their hosted models. Setup registers the service to start automatically when you log in.
</Note>

## Windows

On Windows, install WSL first:

```powershell
wsl --install
```

Restart the computer, open WSL, then follow the installation steps above.


## `docs/inference.mdx`

---
title: Inference
description: "On-demand local inference built for agent workloads"
icon: cpu
---

Magnitude runs a headless local inference server. Your harness sends requests to it, and Magnitude manages the model process, memory, context, and concurrency.

## On-demand model loading

Downloaded models stay on disk until they are needed. When an agent sends a request, Magnitude loads the configured model into memory if it is not already running.

Magnitude keeps an active model available while it is being used. It can unload the model after inactivity or when the machine needs memory. Unloading releases inference memory without deleting the downloaded model or changing the selection. A later request loads it again.

The first request after an unload includes model loading time. Requests made while the model is active begin inference immediately.

## Tuned for your hardware

Magnitude configures hardware acceleration, model placement, context, speculative decoding, and runtime settings for the current machine. It checks available memory again before every load so a model that normally fits is not started when other applications are using too much memory.

## Context and concurrency

Magnitude preserves the configured context for each request. It uses remaining capacity for concurrent work rather than silently reducing context to fit more requests.

During ongoing agent sessions, Magnitude reuses compatible prompt state and processes only new input when possible. This reduces repeated prefill work.

## Memory protection

Magnitude monitors memory while a model is loading or running. If available memory becomes dangerously low, it stops the model before inference destabilizes the computer. The model remains downloaded and selected.

## Consistent agent interface

Local models use different reasoning formats, tool-call formats, chat templates, and conversation-history conventions. Magnitude normalizes these differences so harnesses can switch models without implementing model-specific behavior.

The inference engine is written in Rust on top of llama.cpp. It is installed and managed with Magnitude, so there is no separate inference runtime to configure.


## `docs/models.mdx`

---
title: Models
description: "Hardware-aware recommendations, model trade-offs, and downloads"
icon: boxes
---

Magnitude recommends complete model configurations for your machine. Each recommendation includes a model, quantization, and context size that Magnitude expects to fit and run well.

## Hardware profile

Magnitude detects your processor, memory, architecture, and acceleration such as Metal or CUDA. It calibrates the machine and uses model metadata to estimate which configurations will fit and how fast they should run without downloading the full model weights.

Magnitude caches this profile and recalibrates when needed.

## Recommendations

During agent-first setup, Magnitude ranks up to ten configurations using:

- Model intelligence
- Estimated generation speed
- Quantization quality
- Configured context size
- Physical memory

Your agent asks whether you prefer faster, balanced, or smarter output, then walks you through the strongest options. In interactive setup, move **Fast to Smart** toward Fast to favor generation speed or toward Smart to favor intelligence.

Speed is shown as a range such as `~36–48 tok/s`. Actual performance varies with prompt length, concurrent work, available memory, and model revision.

## Model catalog

The catalog contains all curated configurations that fit the current hardware, not only the top recommendations. It includes memory, intelligence, quantization, speed, context, and license information.

Magnitude-managed models are stored in `~/.magnitude/models`. Downloading a model stores it on disk. It does not keep the model permanently loaded in memory.

## Change models later

Initial setup should provide the best starting configuration. Revisit the model choice when new models are released or when you want a different speed, intelligence, context, or memory trade-off.

Choose another installed model from your harness model dropdown. You can also ask your agent to research and install a new model. For example:

- “Are there newer models in Magnitude that would run better on this machine?”
- “Find a faster Magnitude model than my current one.”
- “Install this new model in Magnitude and switch to it.”

The agent can use the Magnitude CLI to inspect the hardware and catalog and install the model. Select it from your harness when it is ready.

## Download a model outside the catalog

Magnitude also discovers compatible GGUF packages outside its catalog when they are stored in the Hugging Face Hub cache. Ask your agent to download the model and quantization with the Hugging Face CLI. Restart Magnitude after the download completes to refresh the inventory.

Magnitude checks `HF_HUB_CACHE`, `HUGGINGFACE_HUB_CACHE`, `HF_HOME`, and `XDG_CACHE_HOME`, then falls back to `~/.cache/huggingface/hub`.


## `docs/magnitude-harness.mdx`

---
title: Magnitude Harness
description: "Use the optional Magnitude Harness"
icon: terminal
---

Magnitude includes a built-in harness optimized for local models.

- **Uses smaller contexts well:** Keeps context focused instead of burying the model in irrelevant history.
- **Compacts without stopping:** Local models compact more often, so compaction runs in the background with no waiting.
- **Makes tool calls reliable:** Validates calls and gives clear recovery feedback when the model gets them wrong.
- **Breaks doom loops:** Stops repeated or runaway tool behavior before the model gets stuck.
- **Prevents overthinking:** Cuts off excessive reasoning and gets the model back on task.

Ask your agent to connect the **Magnitude Harness** during setup, select it in interactive setup, or run `magnitude` from the directory you want the agent to work in.

<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  title="Choosing and running a recommended local model with Magnitude Harness"
  className="w-full rounded-xl"
  src="/videos/maglocaldemo.mp4"
></video>

## Work with a project

The harness can inspect and edit files, run commands, and execute scripts in the current directory. Type `@` to mention a file or directory. You can paste or drag images into the composer.

Enter bash mode with `/bash` or start a message with `!` to run a shell command directly.

Run `/init` to create an `AGENTS.md` file for project conventions, architecture, tests, and other instructions.

## Sessions

Conversations are saved automatically. Use `/resume` or `Ctrl+R` to open a recent conversation and `/new` to start another one.

When a conversation approaches the model context limit, Magnitude compacts older work into a summary and continues the session.

## Commands and shortcuts

Type `/` to browse available commands. Common commands include `/models`, `/catalog`, `/hardware`, `/setup`, `/bash`, `/init`, `/resume`, and `/new`.

| Shortcut | Action |
|---|---|
| `Enter` | Send or confirm |
| `Shift+Enter` | Add a new line |
| `Ctrl+T` | Select reasoning level |
| `Ctrl+R` | Open recent conversations |
| `Esc` | Close a menu or interrupt work |
| `Ctrl+C` | Clear input or exit while idle |

## Skills

Skills add reusable capabilities to the harness. Install them in the current project or globally with a compatible skill installer such as `npx skills add`.

Magnitude loads skills from `.claude/skills`, `.agents/skills`, and `.magnitude/skills` in the current project and from the matching directories in your home directory. Project skills take priority over global skills with the same name.

Review a skill before installing it. Skills can run commands, install dependencies, open websites, and interact with external services.

## Web search

Set `EXA_API_KEY` before starting the harness to enable web search through Exa.


## `docs/reference.mdx`

---
title: Reference
description: "CLI, inference APIs, configuration, and local files"
icon: book-open
---

Magnitude normally configures and manages these interfaces automatically. This reference is for agents, automation, advanced integrations, and manual recovery.

## CLI

| Command | Purpose |
|---|---|
| `magnitude setup` | Open interactive model browsing and setup |
| `magnitude service install` | Install and enable the per-user service without starting it |
| `magnitude service start` | Install or refresh, start, and await the user service |
| `magnitude service status` | Show installation, startup, runtime, and active-model status |
| `magnitude service stop` | Stop the service without uninstalling it |
| `magnitude service uninstall` | Stop and remove the service definition while preserving user data |
| `magnitude catalog list` | Show catalog, assessment, acquisition, and residency state |
| `magnitude catalog pull <model-id>` | Install or update a catalog model |
| `magnitude catalog remove <model-id>` | Remove an installed catalog model |
| `magnitude catalog cancel <model-id>` | Cancel active acquisition work |
| `magnitude models status` | Show installed models and their residency state |
| `magnitude models load <model-id>` | Load a model by canonical model ID |
| `magnitude models stop` | Stop the active local model |
| `magnitude connections list` | Show supported and installed harnesses |
| `magnitude connections add <harness> [--set-model <model-id>] [--install-skill]` | Connect installed models and optionally select a model and refresh the harness skill |
| `magnitude connections sync [harness]` | Refresh connected harness configuration |
| `magnitude connections remove <harness>` | Remove a harness connection |
| `magnitude docs [topic-id]` | List or read bundled documentation for agents |
| `magnitude docs onboarding` | Read the complete agent-guided setup workflow |
| `magnitude update` | Update Magnitude |

Run `magnitude --help` or append `--help` to a command for its complete options. Every
non-interactive observation command supports `--json`; agents should begin with
`magnitude docs onboarding` for the complete CLI-only setup and model-selection workflow.

## Inference APIs

The background service listens on loopback at `http://127.0.0.1:10100`.

| API | Base URL |
|---|---|
| OpenAI-compatible | `http://127.0.0.1:10100/inference/v1` |
| Anthropic-compatible | `http://127.0.0.1:10100/inference/anthropic` |

The OpenAI-compatible API supports model listing, Chat Completions, and Responses. The Anthropic-compatible API supports Messages and token counting. Harness setup configures the correct interface automatically.

## Environment variables

| Variable | Purpose |
|---|---|
| `EXA_API_KEY` | Enable web search in Magnitude Harness |
| `HF_HUB_CACHE` | Set the Hugging Face Hub cache directory |
| `HUGGINGFACE_HUB_CACHE` | Legacy Hugging Face Hub cache override |
| `HF_HOME` | Set the Hugging Face data directory |
| `XDG_CACHE_HOME` | Set the base cache directory |

Hugging Face cache settings are checked in the order shown. If none is set, Magnitude checks `~/.cache/huggingface/hub`.

## Files and directories

| Path | Purpose |
|---|---|
| `~/.magnitude/models/` | Magnitude-managed local models |
| `~/.magnitude/cache/` | Model metadata, hardware profiles, and disposable caches |
| `~/.magnitude/sessions/` | Magnitude Harness conversations and session logs |
| `~/.magnitude/logs/` | CLI logs and macOS service logs |
| `~/.magnitude/traces/` | Local trace data when tracing is enabled |
| `~/.magnitude/config.json` | User settings and model selections |
| `~/.magnitude/harness-connections.json` | Managed harness connections |

Deleting `~/.magnitude/cache` causes derived data to be rebuilt but does not delete downloaded models. Do not delete the complete `~/.magnitude` directory as a general troubleshooting step.


## `docs/faq.mdx`

---
title: FAQ
description: "Common questions about Magnitude"
icon: message-circle-question-mark
---

## What is Magnitude?

An open source inference server that runs the best local models for your hardware, plugged into the agent you already use. It profiles your machine, recommends the models that fit, then downloads, tunes, and runs them.

## What hardware do I need?

There's no fixed minimum. Magnitude profiles your hardware and recommends the best models for your machine. More memory lets you run larger models.

## Why not just have my agent set up Ollama?

Your agent would be guessing. It doesn't know your hardware, which quant fits, or how fast it'll run. Magnitude gives it a catalog with recommendations computed for your machine, an onboarding flow that writes your harness config, and inference built for agent workloads. Models load just in time and unload when idle or memory gets tight.

## Which harnesses work with it?

Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, and Cline. During setup, your agent connects your harness to the model you pick. Or use Magnitude's built-in harness.

## Do I need to manage Magnitude after setup?

No. It runs in the background, loads models when your agent needs them, and unloads them when idle or memory gets tight. Your agent can install or switch models through the Magnitude CLI anytime.

## Does my data go to the cloud?

No. Prompts, files, and models stay on your machine.

## Can it run completely offline?

Yes. Once Magnitude and a model are downloaded, no internet connection needed.

## Can I use models outside the catalog?

Yes. You can [download compatible GGUF models from Hugging Face](/models#download-a-model-outside-the-catalog) and use them in Magnitude.


## `docs/troubleshooting.mdx`

---
title: Troubleshooting
description: "Resolve setup, connection, model, memory, and performance problems"
icon: wrench
---

If your harness is available, ask the agent to inspect Magnitude and fix the problem. It can run `magnitude docs onboarding` for the current agent-guided workflow and use the headless CLI to inspect the service, models, and connections.

<Warning>
  Do not delete `~/.magnitude`. It contains downloaded models, settings, harness connections, and Magnitude Harness sessions.
</Warning>

## Setup did not finish

Ask your agent to resume setup and follow `magnitude docs onboarding` again. Completed hardware profiling and model downloads are reused when possible.

If the CLI does not start, check `magnitude --version`, then update or reinstall it. On Windows, run Magnitude inside WSL. If you were using interactive setup, you can run `magnitude setup` again.

## Harness cannot use Magnitude

Ask the agent to check that the Magnitude service is running and resync the harness connection. For manual recovery:

```sh
magnitude service start
magnitude connections sync
```

If the harness is not connected, ask your agent to resume onboarding. For manual recovery, rerun `magnitude setup` or add the connection from the CLI reference.

Codex and Claude Code keep using Magnitude's local gateway while their connection is installed. If
the service was stopped, start it again:

```sh
magnitude service start
```

To stop using the Magnitude connection instead, remove it and restart the harness:

```sh
magnitude connections remove codex
# or
magnitude connections remove claude-code
```

## Model download failed

Magnitude retries temporary network and server failures. If retries are exhausted, retry after checking network access and disk space. Partial downloads can resume instead of starting again.

A GGUF model downloaded outside Magnitude must be complete and stored in a recognized Hugging Face Hub cache. Restart Magnitude after the download finishes.

## Model will not load

| Message | Meaning | Action |
|---|---|---|
| **Too large** | The configuration cannot fit while preserving system memory | Choose a smaller model, quantization, or context |
| **Not enough memory available** | The model normally fits, but other applications are using too much memory | Close memory-intensive applications and try again |
| **Model stopped · Low memory** | Available memory became unsafe while the model was running | Free memory; the next request can load the model again |

A downloaded model does not use inference memory until Magnitude loads it for a request.

## Model was unloaded

This is normally expected. Magnitude unloads inactive models and can stop a model when the machine needs memory. The model remains downloaded and selected. The next agent request loads it again.

## Inference is slow or queued

The first request may wait for the model to load. Long prompts also require prefill before generation begins. Concurrent requests wait when the machine has no free inference capacity.

Actual generation speed varies with prompt length, concurrent work, other applications, and model revision. Ask the agent to compare the active configuration with faster recommendations if sustained generation is slower than expected.

## Logs and recovery

On macOS, service logs are in `~/.magnitude/logs/acn-service.log`. On Linux, use `journalctl --user -u magnitude.service`. Magnitude Harness session logs are stored with each session under `~/.magnitude/sessions`.

Use the least disruptive recovery:

1. Retry the request.
2. Restart the harness.
3. Start or restart the Magnitude service.
4. Ask your agent to resume onboarding, or run `magnitude setup` again for interactive setup.
5. Clear only `~/.magnitude/cache` when derived hardware or catalog data is the problem.
6. Reinstall the CLI if bundled inference files are missing.

Before sharing logs, remove prompts, project contents, private paths, and credentials. Open a [GitHub issue](https://github.com/magnitudedev/magnitude/issues) or ask in [Discord](https://discord.gg/EHt48pPWdC).


# Appendix E: 에이전트용 번들 문서 `magnitude docs <topic>` (verbatim)


## `cli/src/agent-docs/topics/onboarding.md`

# Agent-guided Magnitude onboarding

You are guiding the user through onboarding in an interactive conversation, not silently executing
a batch of commands. Run each command yourself. Before each major action, briefly explain what you
are about to do and why. While commands or background work are running, narrate meaningful progress
so the user knows what is happening. When the user needs to make a decision, explain the relevant
options and tradeoffs in clear, concise language, then ask a focused question. Welcome questions
throughout the process and answer them as they arise. Preserve the exact model ID shown by
Magnitude; display names are not command arguments. Use `magnitude docs` to answer
Magnitude-specific questions.

## 1. Finish installing Magnitude

```bash
magnitude service install
magnitude service start
```

Briefly explain that Magnitude is being registered as a per-user login service and started now. Its
first start downloads and prepares the inference engine, which may take a few minutes.

`service install` registers login startup and resolves the Magnitude service executable. The
inference engine is acquired by the running service, so do not omit `service start` or claim that
`service install` alone prepares the engine.

## 2. Wait for model preparation, then choose with the user

Poll the authoritative preparation status first:

```bash
magnitude catalog status
```

The status reports two phases:

- **Discovery** scans the Hugging Face model caches already on this computer for complete, usable
  GGUF models. This is a local, read-only scan; it does not download models or contact Hugging Face.
- **Assessment** evaluates Magnitude's catalog choices and the usable models found during discovery
  for this specific hardware. It determines compatibility, memory fit, an appropriate serving
  configuration, available acceleration, and expected generation speed. These results let
  Magnitude exclude models that will not run well and rank the ones that will.

Briefly explain that Magnitude is finding local models and checking which ones fit this hardware,
then report meaningful status changes.

Rerun the command about every 10 seconds and report useful changes without flooding the
conversation. Continue only when both `Discovery` and `Assessment` report `Complete`.

Then run balanced recommendations:

```bash
magnitude catalog recommendations --preference balanced --limit 10
```

Present two or three of the best balanced recommendations. Summarize the
displayed speed, memory, context, intelligence, accuracy, acceleration, and relevant capabilities,
then ask the user to choose. Frame them as balanced choices and briefly offer a speed- or
intelligence-leaning comparison if useful.

Use `faster` when the user ordinarily asks for faster options and `smarter` when they ordinarily ask
for smarter options. These shift the tradeoff while still giving meaningful consideration to both
speed and intelligence. If the user asks for “fast and smart options,” compare `faster` and
`smarter`; do not interpret that as a request for the extremes.

Treat `fastest` and `smartest` as explicit extremes, not the normal next choices. Use `fastest` only
when the user clearly wants maximum speed and cares little about intelligence; explain that it
prioritizes speed and gives intelligence only limited consideration. Use `smartest` only when the
user clearly wants maximum intelligence and is willing to accept slow generation; explain that it
prioritizes intelligence and gives speed only limited consideration. If that extreme intent is not
clear, use `faster` or `smarter` instead.

Use `magnitude catalog show <model-id>` when the user wants more detail about a candidate. Do not
download a model until the user has chosen one.

## 3. Install the chosen model

```bash
magnitude catalog pull <model-id>
magnitude models status <model-id>
```

`catalog pull` admits a background installation. Poll `models status` until installation is
`Installed`. Adjust the polling interval based on observed progress and the estimated remaining
time so the user stays informed without receiving repetitive updates. Keep them updated with
meaningful changes in the reported percentage and downloaded bytes. After two progressing samples,
you may give a rough remaining-time estimate based on the observed byte rate; label it as an
estimate and do not invent one when progress is stalled or the total size is unavailable.

If status reports a failure, give the user its actionable message. Ask before taking remediation
outside this onboarding workflow.

## 4. Load the installed model

```bash
magnitude models load <model-id>
magnitude models status <model-id>
```

Loading is a separate background operation. Poll `models status` until runtime is `Ready`, adjusting
the polling interval based on observed progress and the estimated remaining time. Report meaningful
state or percentage changes often enough to keep the user informed without flooding them with
repetitive updates. If enough progress samples are available, a rough observed-rate estimate is
acceptable; do not promise a precise completion time.

## 5. Offer to connect the current harness

Once the model is ready, offer to connect Magnitude to the current harness. Other supported
harnesses can be connected instead or in addition.

Supported harnesses and canonical IDs are:

| Harness | ID | Handoff after the model is ready |
| --- | --- | --- |
| Magnitude | `magnitude` | The loaded model is selected automatically. |
| Pi | `pi` | Switch this session with `/model` or Ctrl+L, then choose provider `magnitude` and the selected model. |
| OpenCode | `opencode` | Exit the running process with Ctrl+C, then run the printed launch command. |
| Hermes | `hermes` | Exit the running process with Ctrl+C, then run the printed launch command. |
| OpenClaw | `openclaw` | Exit the running process with Ctrl+C, then run the printed launch command; its dedicated Magnitude-agent session avoids stale model overrides. |
| Codex | `codex` | Exit the Codex process with Ctrl+C, then run the printed launch command. |
| Claude Code | `claude-code` | Exit the running process with Ctrl+C, then run the printed launch command. |
| Oh My Pi | `oh-my-pi` | Exit the running process with Ctrl+C, then run the printed launch command. |
| Cline | `cline` | Exit the running process with Ctrl+C, then run the printed launch command. |

Magnitude itself is built in and does not need an external connection command. In Magnitude, the
loaded model is already selected; no picker or relaunch is needed.

For any other supported harness, offer to connect it and select the chosen model. After the user
agrees, run:

```bash
magnitude connections add <harness-id> --set-model <model-id> --install-skill
```

This publishes all installed Magnitude models to that harness, selects the chosen model in its
configuration, and installs or refreshes the bundled Magnitude skill.
The skill gives the harness agent instructions for using the Magnitude CLI to manage local models
later.

Give one clear primary action for the current harness:

- **Pi:** switch in place with `/model` or Ctrl+L. The printed `pi` command in another terminal is a
  secondary option.
- **Every other external harness:** restart the harness process by exiting with Ctrl+C and reopening
  it with the printed launch command.

The printed launch command uses the harness's ordinary command name, not an absolute executable
path. Show it exactly, but do not execute it unless the user asks.

Use `magnitude --help`, `magnitude <group> --help`, or `magnitude docs cli` only when command
discovery is needed. Do not substitute the interactive `magnitude setup` flow while operating as
the onboarding agent.


## `cli/src/agent-docs/topics/recommendations.md`

# Model recommendations

`magnitude catalog recommendations` suggests local-model configurations that Magnitude expects to
work well on this computer. It considers whether a configuration is compatible with the machine
and likely to fit in memory, then weighs model intelligence, expected generation speed, and how
faithfully the local artifact preserves the source model.

The default `Balanced` view aims for a useful compromise between speed and intelligence. The
other preferences shift that tradeoff; they are not separate model catalogs. Use `faster` or
`smarter` for normal requests to lean toward speed or intelligence while still meaningfully
considering both. If a user asks for “fast and smart options,” these are the two views to compare.

`fastest` and `smartest` are extremes. `fastest` prioritizes speed and gives intelligence only
limited consideration, so use it only when the user clearly cares little about intelligence and
wants maximum speed. `smartest` prioritizes intelligence and gives speed only limited
consideration, so use it only when the user clearly accepts slow generation in exchange for maximum
intelligence. A recommendation is a starting point for choosing with the user, not a claim that one
model is best for every workload.

## What the displayed properties tell you

- **Speed** is Magnitude's estimate of generation throughput on this computer. The displayed range
  shows how performance may change between shorter and longer contexts; it is not a confidence
  interval. It is a hardware-aware prediction rather than a benchmark run of the downloaded model,
  and real speed can vary with workload and system activity.
- **Memory** is the estimated memory needed while the model is running, not its download size. A
  model that normally fits can still need other memory-intensive applications to be closed before
  it loads.
- **Context** is the amount of conversation and working material available to the local serving
  configuration. It is not necessarily the model architecture's absolute maximum. Magnitude may
  choose a smaller context for compact models because longer context uses more memory and can slow
  generation, especially on resource-constrained computers.
- **Intelligence** is the model's Artificial Analysis Intelligence Index score. Magnitude displays
  it with a percent sign, but it is an index score—not a probability or the percentage of questions
  the model answers correctly. Quantized variants of the same source model generally share this
  model-level score.
- **Accuracy** describes how faithfully the local artifact is expected to preserve the source model
  after quantization. It does not mean factual accuracy and is separate from Intelligence.
- **Acceleration** identifies the speculative-decoding method Magnitude has prepared for that
  configuration. See `magnitude docs speculative-methods` for what `None`, `MTP`, `DFlash`, and
  `DSpark` mean and how Magnitude sets them up.
- **Capabilities** identify supported features such as vision, tool use, structured output, and
  reasoning. These can matter more than a small speed or intelligence difference when the user has
  a specific task in mind.
- **ID** is the exact configuration identifier required by later commands. Preserve it exactly;
  the friendly model name is not a command argument.

Use these signals together. A faster model may feel better for quick iteration, while a more
intelligent model may be worth waiting for on difficult coding or reasoning tasks. Memory and
context determine whether the model is practical on this computer, artifact accuracy indicates how
much quality the local format may give up, and capabilities determine whether it can do the job at
all.

## Artificial Analysis intelligence and reference points

The [Artificial Analysis Intelligence Index](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)
is an independently run composite of evaluations spanning areas such as mathematics, science,
coding, knowledge, long-context work, and agentic tasks. Higher scores generally indicate stronger
performance across that mixture, but the number is a broad comparison signal rather than a promise
about one particular task.

The frontier models below are useful reference points when a user wants to understand what a local
model's Intelligence score means. For example, a local model near 52 is in the same general score
region as GPT-5.6 Luna in this snapshot, while a score near 61 is around GPT-5.6 Sol. This does not
mean the models behave identically; it gives the user a familiar yardstick for the index.

These scores are a September 1, 2026 snapshot of Artificial Analysis Intelligence Index v4.1.1:

| Reference model | Evaluated configuration | Score |
| --- | --- | ---: |
| [Claude Opus 5](https://artificialanalysis.ai/models/claude-opus-5) | Adaptive reasoning, max effort | 63 |
| [Claude Fable 5](https://artificialanalysis.ai/models/claude-fable-5) | Adaptive reasoning, max effort, Opus 4.8 fallback | 62 |
| [GPT-5.6 Sol](https://artificialanalysis.ai/models/gpt-5-6-sol) | Max effort | 61 |
| [GPT-5.6 Terra](https://artificialanalysis.ai/models/gpt-5-6-terra) | Max effort | 57 |
| [GPT-5.6 Luna](https://artificialanalysis.ai/models/gpt-5-6-luna) | Max effort | 52 |

Compare scores from the same index version and similar reasoning settings when possible. Artificial
Analysis may revise its methodology or results over time. Magnitude ships reviewed scores with its
catalog rather than refreshing them from the network during recommendation, and clearly labels an
authored estimate when a directly measured score is unavailable.


## `cli/src/agent-docs/topics/speculative-methods.md`

# Speculative decoding methods

Speculative decoding speeds up generation by using a cheaper mechanism to propose several future
tokens, then asking the full target model to verify those tokens together. The target still decides
which tokens are accepted. These methods affect decode speed, not the model's intelligence or
quality rating.

## Practical hierarchy

For the methods Magnitude reports, use this rule of thumb for decode speed:

```text
None (usually slowest) -> MTP -> DFlash -> DSpark (usually fastest)
```

This is a typical ordering, not a guarantee. Actual speed depends on the target and draft models,
draft acceptance, prompt and output content, context length, quantization, hardware, memory
placement, and request concurrency. A speculative method can provide little benefit or even add
overhead in an unfavorable configuration. Prefer Magnitude's model- and machine-specific speed
evidence over the method name alone.

## Methods

- **None**: The target model performs ordinary autoregressive decoding without a speculative draft.
  It normally completes one target-approved token per decode step and is the baseline against which
  speculative acceleration is measured.
- **MTP**: Multi-Token Prediction, also called NextN, uses auxiliary modules trained with the target
  model to propose future tokens more cheaply than the full target. These modules are commonly
  embedded in or closely coupled to the target. MTP reduces full-model decode work, but its useful
  draft is generally shorter or more sequential than the block-parallel methods below.
- **DFlash**: A lightweight, target-specific block-diffusion drafter uses hidden features from the
  target model and proposes an entire token block in one forward pass. Parallel block drafting
  amortizes draft latency and maps well to accelerators, so DFlash is typically faster than MTP.
  Because its block positions have weaker left-to-right dependencies, acceptance can fall toward
  the end of a proposed block.
- **DSpark**: Extends DFlash's parallel backbone with a lightweight semi-autoregressive, typically
  Markov, head that restores dependencies between tokens inside the proposed block. A confidence
  head can also trim low-confidence suffix tokens before verification. This retains most of the
  parallel drafting speed while producing longer useful prefixes and avoiding wasted target
  verification, so DSpark is typically faster than DFlash.

## What Magnitude handles

For a catalog model, Magnitude's reviewed configuration declares the exact speculative method and
any required draft material. `magnitude catalog pull` acquires a separate draft artifact when the
configuration needs one. Assessment and loading validate the target, draft, method, hardware fit,
and serving configuration; Magnitude then activates the method automatically during inference.

The user does not need to select a method or pair a draft model manually. Magnitude does not attach
an arbitrary draft model to a target. If a catalog configuration has no reviewed compatible
speculative method, it runs without speculative decoding.


## `cli/src/agent-docs/topics/custom-endpoints.md`

# Custom endpoints

Add an OpenAI-compatible Chat Completions endpoint to `~/.magnitude/config.json`. Declare the connection and the models you want Magnitude to expose, then save the file. Magnitude applies valid changes automatically.

## Example

Add an endpoint under `providers`, preserving any other fields already in the file. This example configures OpenRouter with GLM 5.2:

```json
{
  "providers": {
    "openrouter": {
      "displayName": "OpenRouter",
      "connection": {
        "baseUrl": "https://openrouter.ai/api/v1",
        "authentication": {
          "type": "bearer",
          "credential": {
            "type": "environment",
            "variable": "OPENROUTER_API_KEY"
          }
        }
      },
      "models": {
        "z-ai/glm-5.2": {
          "displayName": "GLM 5.2",
          "contextWindow": 1048576,
          "maxOutputTokens": 128000,
          "capabilities": {
            "reasoning": {
              "efforts": ["high", "xhigh"],
              "defaultEffort": "high"
            }
          }
        }
      }
    }
  }
}
```

Set the referenced credential before starting Magnitude:

```bash
export OPENROUTER_API_KEY="your-key"
```

## Configuration shape

```ts
type CustomEndpointsConfig = {
  providers?: Record<string, { // Stable endpoint key
    displayName: string
    connection: {
      baseUrl: string
      authentication:
        | { type: "none" }
        | { type: "bearer"; credential: EnvironmentCredential }
        | { type: "header"; name: string; credential: EnvironmentCredential }
      headers?: Record<string, string>
    }
    models: Record<string, { // Exact model ID sent to the endpoint
      displayName: string
      contextWindow: number
      maxOutputTokens: number
      capabilities?: {
        vision?: boolean
        reasoning?: {
          efforts: string[]
          defaultEffort: string
        }
      }
    }>
  }>
}

type EnvironmentCredential = {
  type: "environment"
  variable: string
}
```

For any endpoint:

- Use its API root as `baseUrl`; do not include `/chat/completions`.
- Use each model's exact API model ID as its key under `models`.
- Declare the model's actual context and output limits.
- Reference secrets through environment variables instead of storing them in the file.

After you save the file, configured models appear in Magnitude's normal model picker. Removing a selected endpoint or model clears that model slot without choosing a replacement. Restoring the same keys makes the model available again but does not reselect it.


## `cli/src/agent-docs/topics/cli.md`

# Magnitude CLI

Run `magnitude` without a subcommand for the interactive experience. Use these commands for a
non-interactive shell workflow:

```text
magnitude update
magnitude service install|uninstall|start|stop|status
magnitude hardware
magnitude catalog status
magnitude catalog list
magnitude catalog show|pull|cancel|remove <model-id>
magnitude catalog recommendations [--preference <value>] [--limit <count>]
magnitude models status [model-id]
magnitude models load <model-id>
magnitude models stop
magnitude connections list
magnitude connections add <harness> [--set-model <model-id>] [--install-skill]
magnitude connections sync [harness]
magnitude connections remove <harness>
magnitude docs [topic-id]
```

Each command prints only the product information relevant to that operation. Collection commands
use borderless tables when the rows are directly comparable; detail commands use labeled fields.
Exact model and harness IDs are always printed so their output can be used in later commands.

`catalog` owns model discovery and assessment progress, reviewed model choices, recommendation
evidence, and download operations. `models` owns models on this computer and their current
installation or runtime state. Catalog assessment and model loading are background work:
observation commands return the current state and never wait for either to settle.

Discovery scans existing local Hugging Face caches for usable GGUF models without downloading or
contacting the Hub. Assessment evaluates catalog and discovered models for the current hardware,
including compatibility, memory fit, serving configuration, acceleration, and expected speed.

`connections add --install-skill` installs or refreshes the bundled Magnitude skill in the selected
harness's supported user-wide location before applying the connection.


# Appendix F: `inference/README.md` (verbatim)

# Magnitude ICN

This workspace builds the Inference Control Node. `icn-contracts` defines transport- and
backend-neutral contracts; `icn-models`, `icn-hardware`, and `icn-reasoning` own model lifecycle,
fit assessment, and template reasoning inspection; `icn-engine` owns live inference; `icn-api`
exports the HTTP/OpenAPI boundary; and `icn-server` is the composition root.

The native dependency has two independently recorded revisions in `native-pin.toml`: the exact
`llama-cpp-rs` commit and the llama.cpp gitlink embedded by that commit. The editable binding source
is checked out at `native/llama-cpp-rs`; the inference workspace must consume its `llama-cpp-2`
crate by relative path rather than resolving a second Cargo Git checkout. Run
`bun icn:verify-native-pin` after changing either pin; the ICN-facing backend interface remains
unchanged.

## Native submodule management

The native source is nested and pinned:

```text
magnitude
└── inference/native/llama-cpp-rs       # our bindings fork
    └── llama-cpp-sys-2/llama.cpp       # exact upstream llama.cpp revision
```

We do **not** need utilityai or llama.cpp to accept our changes. Binding changes are committed and
pushed to `magnitudedev/llama-cpp-rs`. Upstream PRs are optional.

Magnitude stores only the exact bindings-fork commit, not changes made inside the submodule. The
required order for a bindings change is therefore:

1. Change and test `inference/native/llama-cpp-rs`.
2. Commit and push that change to `magnitudedev/llama-cpp-rs`.
3. Commit the updated `inference/native/llama-cpp-rs` pointer in Magnitude.

Never point Magnitude at an unpushed bindings commit; other checkouts and CI could not fetch it.

We normally do not modify llama.cpp. To upgrade it, update its nested commit pointer and commit that
pointer in our bindings fork. Create a llama.cpp fork only if we actually need native patches.

The bindings fork directly compiles its checked-in C/C++ wrapper sources, including the
`wrapper_common_fit` surface, alongside the pinned llama.cpp checkout; it does not generate or
apply a source overlay. [`parity/upstream/binding-surfaces.json`](parity/upstream/binding-surfaces.json)
is the parity-owned audit inventory that maps relevant upstream, bridge, and safe Rust surfaces. It
is not a fork build input; review it whenever either native pin or a parity-relevant safe surface
changes.

Initialize both submodules after cloning Magnitude:

```sh
git submodule update --init --recursive
```

## First five minutes

Run these commands from the Magnitude repository root.

Compile the development binary:

```sh
bun icn:build
```

The executable is now at `inference/target/debug/magnitude-inference`. Start it with the deterministic fake
backend, which does not need a model file:

```sh
bun icn:dev
```

In another terminal, check health and make a streaming completion:

```sh
curl -sS http://127.0.0.1:8080/health

curl -N http://127.0.0.1:8080/v1/chat/completions \
  -H 'content-type: application/json' \
  --data '{
    "model": "icn-fake",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true,
    "stream_options": {"include_usage": true}
  }'
```

The second command prints OpenAI-compatible `data:` frames followed by `data: [DONE]`. Stop the
server with Ctrl-C.

Set the top-level request field `"timings_per_token": true` to enable llama.cpp-compatible
cumulative timing snapshots on streamed model updates. A sampled token can produce zero or several
semantic deltas. The initial `{"role":"assistant","content":null}` delta belongs to the first
sampled-token result: when that result also has parser deltas, only its last parser delta receives
the snapshot; when it has none, the role delta receives it. Later results with no parser delta emit
no SSE event, so the server never creates a timing-only event.

The flag controls ordinary partial snapshots, but llama.cpp has one termination edge: a full stop
word detected before a partial result is sent makes that result include timings even when the flag
is false. EOS and length termination are detected after their partial-result timing decision and do
not do so. The final timing summary is always present on the finish chunk or, when `include_usage`
is enabled, the empty-choices usage chunk.

To use a real GGUF model:

```sh
bun icn:serve -- \
  --model /absolute/path/to/model.gguf \
  --model-alias my-model \
  --bind 127.0.0.1:8080
```

Use `my-model` in the same completion request. On Apple Silicon, the pinned bindings enable their
macOS Metal backend. `--gpu-layers 0` forces CPU execution; the default attempts to offload all
layers.

## Build and verification commands

Useful commands from the monorepo root:

```sh
bun icn:check                 # type-check the Rust workspace without linking a final binary
bun icn:build                 # debug binary, fastest normal development build
bun icn:build:release         # optimized binary at inference/target/release/magnitude-inference
bun icn:build:reference       # selected pinned tests, official tools, and native oracle
bun icn:test                  # Rust API, SSE, backend, and workspace tests
bun icn:parity:validate       # validate cases, fixtures, profiles, targets, and model registry
bun icn:parity:list           # list primitive cases and implementation status
bun icn:parity:test:ts        # test reference/model/provenance scripts
bun icn:build:candidate -- --reference-manifest <path> # build the production ICN parity probe with provenance
bun icn:generate
bun icn:check-generated
bun icn:verify-native-pin
bun icn:doctor
bun icn:version
```

`bun icn:build:reference -- --backend metal --target focused-tests --target oracle` builds only
declared targets from the exact nested llama.cpp source used by the Rust bindings. Other target IDs
include `llama-bench`, `llama-batched-bench`, `llama-perplexity`, `backend-ops`, and
`quantize-perf`. The builder records source, configuration, artifact, and oracle digests; use
`--dry-run` to inspect the resolved build without compiling. Every invocation reserves a fresh
CMake tree, uses an allowlisted build environment, and records compile/link evidence for assertion
and sanitizer status; an earlier CMake cache is never reused as parity evidence.

## Inference testing philosophy

Inference validation has three complementary categories:

1. **Correctness parity** compares the smallest observable native and ICN operations: outputs,
   effective configuration, and state transitions.
2. **Performance parity** times those same isolated operations only after both sides prove they
   performed equivalent work.
3. **Composite inference benchmarking** sends controlled completion workloads to ICN and pinned
   `llama-server` endpoints to measure the complete engine, including scheduling, concurrency,
   prefix reuse, mixed prefill/decode work, latency, throughput, fairness, memory, and failures.

The primitive suites make failures attributable; the composite benchmark establishes whether the
complete engine is competitive. Composite fixtures define requests or deterministic agentic
workflows together with prompt/output sizes, shared-prefix topology, arrival schedule, concurrency,
and cold/warm state. Strict comparisons use identical model bytes, templates, settings, sampling,
and token work; response or work divergence is a correctness result and invalidates timing. The
same fixtures should support ICN-versus-llama.cpp comparison, ICN regression testing, and an opt-in
public hardware benchmark exposed through the server and CLI.

The versioned suite lives in [`benchmark/`](benchmark/), and the reusable library plus CLI is the
`benchmark-runner` crate. It always exercises the configured HTTP endpoint, whether invoked from
developer tooling or application code.

## Primitive parity

`parity/` contains neutral cases, fixtures, profiles, the content-addressed model registry, upstream
target manifests, JSON evidence schemas, and the thin native C++ oracle. `icn-parity` validates and
runs these assets without depending on the Rust bindings fork. It supports unchanged upstream
tests, official upstream tools, and differential native-oracle/ICN-probe cases. Comparisons happen
outside both producer processes and are exact, structural, tolerance-based, capability-based, or
same-work performance ratios.

Parity execution never uses a generated chat response or HTTP exchange as primitive evidence.
The production `icn-probe` exposes the active paired operations through production-owned
`icn-engine` code; descriptor status remains authoritative, with genuine artifact or production
API gaps kept `planned` or `disabled`. The `diagnostic` profile is an uncontrolled, non-gating
two-sided functional smoke. `native-diagnostic` separately runs the one-sided native C0/P0 checks
without making a candidate-parity or controlled-performance claim. Generated run directories live
under `results/parity/`.
Downloaded parity models live under `target/parity-models/`. Both locations, all native/Rust build
trees, and candidate artifacts are generated and ignored by the repository.

`bun icn:generate` runs the Rust OpenAPI exporter and regenerates the complete ICN protocol under
`packages/icn-protocol`: bootstrap records, HTTP schemas, HttpApi declarations, operation and
streaming descriptors, generated client, and manifest. `bun icn:check-generated` performs the same
derivation without writing and fails if any committed output is stale.

The `inference/` directory is also a Bun workspace, so the equivalent short forms work:

```sh
bun run --cwd inference build
bun run --cwd inference test
bun run --cwd inference dev
```


# Appendix G: `AGENTS.md` (verbatim)

TRESTING 
# Magnitude Project Context

You are working on Magnitude, an AI coding agent platform.

## Package Layering

```
clients (cli/web) → client-common → sdk → acn (daemon)
```

- **Clients** import only from `@magnitudedev/client-common` and `@magnitudedev/sdk`. Never from `acn`, `agent`, `acn-protocol`, `ai`, or `providers` directly.
- **client-common** — shared state, hooks, display sync. Uses one connection-scoped Effect Query `AgentClient` over the shared SDK instance.
- **sdk** — private, portable Effect RPC client, fixed-endpoint admission/recovery, and optional service-starter capability. Re-exports pure protocol contracts; no SQLite, process supervision, or query cache.
- **daemon-management** — private owner-store, process supervision, binary acquisition, and OS-service implementation. Only privileged host composition roots (CLI bootstrap, desktop main, development server) import it.
- **client-common** owns first-party Query/Mutation/Subscription definitions over SDK operations; `providers` owns provider-client construction.
- **acn** — server daemon hosting agent runtime, sessions, file ops, display streams. Implements ACN protocol RPCs.
- **acn-protocol** — wire contract (RPCs, schemas) shared by SDK and ACN. Not imported by clients.
- **ai** — provider-agnostic contract (`Provider`, `ModelCatalog`, `BoundModel`, `BaseCallOptions`).
- **providers** — concrete provider implementations + registry. See `packages/providers/AGENTS.md`.
- **agent** — agent runtime, projections, workers, tools, display materialization.
- **event-core** — event sourcing, projections, addressed state.
- **roles** — role/slot definitions for worker specialization.
- **storage** — persistent session/config/auth storage.

For a new backend operation, declare its `Rpc.make` once in the appropriate `packages/acn-protocol/src/boundary/` domain, implement its handler in ACN, and consume the derived SDK method. Add first-party caching/synchronization policy in `packages/client-common/src/operations/` as needed. Effect Query does not generate RPCs. The SDK may ask an injected starter to ensure availability; only daemon-management interprets SQLite/process coordination. Plugin packages bundle the private SDK and inherit its exact RPC-version check.

Finite RPC declarations must apply `replaySafe` or `atMostOnce`; the RPC tree requires a declared
replay policy. Release preparation, Changesets orchestration, and protocol/plugin version allocation
belong in `packages/release`; `packages/version` only generates build identity.

## Session Inspection

Use `bun session` to inspect past sessions. Sessions are stored in `~/.magnitude/sessions/` with UTC timestamp folder names.

```bash
bun session list                                    # list recent sessions (ID, title, date, messages)
bun session events <id>                             # list all events with index, type, timestamp (no payloads)
bun session events <id> --type turn_started,user_message  # filter by event type(s)
bun session events <id> --from 10 --to 50          # slice by index range
bun session event <id> <index>                      # show one event's full payload as JSON
bun session search <keyword> <id>                   # search event payloads for keyword, shows index/type/snippet
bun session search <keyword> --last 5              # search across last 5 sessions
bun session projection <id> Window                  # replay events and dump named projection state as JSON
bun session projection <id> all --at 42            # all projections at point-in-time (after event 42)
```

Supported projections: `Window`, `Fork`, `TaskGraph`, `Turn`, `Display`, `Compaction`, `WorkingState`, `SessionContext`, `Proposal`, `AgentRegistry`, `Artifact`, `ChatTitle`, `Replay`, `all`

Projection output is JSON — pipe to `jq` for querying. Events are 0-indexed.

`bun logs` — view CLI logger output for the current session.

## Testing

Run tests with `bunx --bun vitest` (not `bun vitest` — without `--bun`, vitest workers run under Node and Bun globals aren't available).

```bash
cd packages/agent && bunx --bun vitest run    # single run
cd packages/agent && bunx --bun vitest        # watch mode
```

## Type Checking

Run targeted type checks per package — do not run project-wide `tsc -b`

##  Project Documents

When significant bug is being reported or a large spec is being created, place under `bugs/YY-MM-DD/` or `specs/YY-MM-DD/`.

## Design Documents

`design/` contains the durable source of truth for architecture and behavior. Follow `design/AGENTS.md`: use `bun design-docs` to find applicable documents, preserve their guarantees, and update them and their applicability whenever the design or ownership changes.

```bash
bun design-docs inference/crates/icn-engine/src/scheduler.rs
bun design-docs --changed --explain
```

## Info Docs

Use `info/` for concise, high-level Markdown documents for humans and LLMs. These docs should describe architecture, systems, expected behavior, and durable project context without depending on brittle file names or code snippets unless they are highly relevant.

## Motel Tracing

Motel is a local OpenTelemetry collector with an HTTP API at `http://127.0.0.1:27686`. Query it with `curl` to inspect traces, spans, and logs from the application.

Key endpoints:

```
GET /api/health                              liveness check
GET /api/services                            services reporting telemetry
GET /api/traces?service=<service>            recent traces for a service
GET /api/traces/<trace-id>                   full trace tree with spans
GET /api/spans/<span-id>                     single span + logs
GET /api/logs?service=<service>              recent logs
GET /api/traces/search?...                   structured trace search
GET /api/logs/search?...                     structured log search
GET /api/ai/calls                            AI SDK call inspector
```

Full OpenAPI spec at `http://127.0.0.1:27686/openapi.json`.

## Client State Patterns

When working with client-side state (CLI, web, or client-common), read `packages/client-common/AGENTS.md` for the reactive state policy — which patterns to use and when.

## Effect Language Service

Use `bun els overview --file <path>` to list Effect exports (services, layers, errors) and `bun els layerinfo --file <path>` for layer dependency info. Example: `bun els overview --file packages/agent/src/index.ts`.

# Engineering invariants

## Principles

The following general engineering principles should always be followed.

### Form meaningful abstractions

The only way to produce sustainable and understandable long-term code is to choose and maintain the correct abstractions.
This does not mean creating indirection or unnecessary abstractions. It means identify the key behaviors of the system, the pieces at play, and the optimal way in which those compose into clean abstractions that also follow code patterns and architecture idiomatically.

### Do not overengineer / no patchwork code

Do not engineer for cases that will not happen. Do not add complex solutions for problems that are solvable by stepping back and addressing the root problem precisely. Be wary of tacking on changes to other imperfect changes, as this is a clear indication of patchwork code. Be self-aware in such scenarios and refactor to cleaner and more meaningful abstractions.

### No unnecessary backwards compatibility

Unless the user explicitly asked for it, do not add backwards compatibility shims or retain "legacy" code. Such code is unnecessary and will only pollute the codebase unless it is part of an explicitly user-designed, justified mechanism.

## Effect usage

This codebase is Effect-TS native.
- New code must be Effect-TS native
- Any TS code that touches effect code must remain or become effectful
- Code may be freely effectified, and never the opposite

### Effect patterns

Follow established Effect conventions in the project, while referring to the following when relevant.

#### Effect DI

Always use the effect DI system where appropraite. Break abstractions into services.
Services should be a Context.Tag, with an interface of the same name as the tag.

### Effect Schemas

For any data that must be serializable, introspected, or validated, it must be represented as an Effect Schema.
Any optional values must use `Schema.optionalWith(Schema.String, { as: 'Option', exact: true })` to ensure that (1) these values serialize to exactly existing or not existing (`undefined` is not serializable) and (2) so that the idiomatic Option is used in the decoded side.

### Branded types

Use Effect branded types for any string values that have semantic attribution to a particular type of ID or other value.


# Appendix H: `CONTRIBUTING.md` (verbatim)

# Contributing to Magnitude

Contributions should be conducted through GitHub Issues and PRs.

It is expected that contributions involve AI-generated content. However, to facilate useful discussion, issues and PRs should include human-written descriptions. Ideally, designate human and AI written sections clearly.

Issues and PRs should be created to address a real, user-facing suggestion or concern - not arbitrary code quality or internal tooling problems, unless those actually affect you as a contributor and are pertinent to a contribution you are making.

If a PR involves an implementation that is one-shot by an agent with no meaningful human steering or validation, it is preferrable to submit an Issue instead.

Any PR should involve:
- Clear justification for the change and the implemented approach
- A corresponding patch changeset with a brief single-line descriptor
- A human written description somewhere, AI written portion optional
- Implementation that is aligned with codebase patterns and high quality
- Explanation of testing conducted - preferably "AI-manual" or even better "Human-manual" rather than strawman unit tests
- Do not include unit tests that do not demonstrate a meaningful property of the system

No particular domains of the codebase are necessarily on or off-limits for contributions, but targetted, clearly scoped changes that solve a specific bug are most likely to be accepted.
