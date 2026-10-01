---
title: "earendil-works/pi"
type: repo
year: 2025
category: agents
raw_path: raw/repos/earendil-works-pi.md
raw_filename: "earendil-works-pi.md"
source_collection: external
org: "earendil-works"
repo: "pi"
url: "https://github.com/earendil-works/pi"
license: "MIT"
tags: [coding-agent, harness, extensions, skills]
---

> 수집 메모: 2026-10-02 사용자의 명시적 지시로 GitHub raw URL에서 취득했다 (CLAUDE.md rule #1 자료 수집 예외). 기본 브랜치 main, 최신 커밋 7fbbd5f4a1d9 (2026-10-01). GitHub API 기준 설명 "AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI", 생성 2025-08-09, star 111,190, fork 14,128, 라이선스 MIT.
> 최상위 구성: .gitattributes, .github, .gitignore, .husky, .npmrc, .pi, AGENTS.md, CONTRIBUTING.md, LICENSE, README.md, SECURITY.md, biome.json, package-lock.json, package.json, packages/, pi-test.bat, pi-test.ps1, pi-test.sh, scripts/, test.sh, tsconfig.base.json, tsconfig.json, tui-plan.md, vitest.base.ts
> packages/: agent, ai, chord, client, codemode, coding-agent, durable, evals, mcp, protocol, server, telemetry, tui
> 수집 범위: 최상위 README.md 전문, packages/coding-agent/README.md, packages/coding-agent/docs/ 중 index, how-pi-works, quickstart, sessions, skills, packages, extensions, compaction, security 전문, packages/agent/README.md 전문, packages/ai/README.md 앞부분(목차, 지원 provider). 각 파일은 아래 `<!-- file: ... -->` 구분선 뒤에 원문 그대로 둔다.


<!-- file: README.md -->

<p align="center">
  <a href="https://pi.dev">
    <img alt="pi logo" src="https://pi.dev/logo-auto.svg" width="128">
  </a>
</p>
<p align="center">
  <a href="https://discord.com/invite/3cU7Bz4UPx"><img alt="Discord" src="https://img.shields.io/badge/discord-community-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
  <a href="https://www.npmjs.com/package/@earendil-works/pi-coding-agent"><img alt="npm" src="https://img.shields.io/npm/v/@earendil-works/pi-coding-agent?style=flat-square" /></a>
</p>

> New issues and PRs from new contributors are auto-closed by default. Maintainers review auto-closed issues daily. See [CONTRIBUTING.md](CONTRIBUTING.md).

# Pi Agent Harness

This is the home of the Pi agent harness project including our self extensible coding agent.

* **[@earendil-works/pi-coding-agent](packages/coding-agent)**: Interactive coding agent CLI
* **[@earendil-works/pi-agent-core](packages/agent)**: Agent runtime with tool calling and state management
* **[@earendil-works/pi-ai](packages/ai)**: Unified multi-provider LLM API (OpenAI, Anthropic, Google, …)

To learn more about Pi:

* [Visit pi.dev](https://pi.dev), the project website with demos
* [Read the documentation](https://pi.dev/docs/latest), but you can also ask the agent to explain itself

## All Packages

| Package | Description |
|---------|-------------|
| **[@earendil-works/chord](packages/chord)** | Standalone application-composition runtime for services, replicated state, RPC, and plugins |
| **[@earendil-works/pi-telemetry](packages/telemetry)** | Vendor-neutral telemetry contracts, reference adapter, conformance tests, and typed schemas |
| **[@earendil-works/pi-ai](packages/ai)** | Unified multi-provider LLM API (OpenAI, Anthropic, Google, etc.) |
| **[@earendil-works/pi-durable](packages/durable)** | Durable conversation, task, and document runtime |
| **[@earendil-works/pi-agent-core](packages/agent)** | Agent runtime with tool calling and state management |
| **[@earendil-works/pi-coding-agent](packages/coding-agent)** | Interactive coding agent CLI |
| **[@earendil-works/pi-tui](packages/tui)** | Terminal UI library with differential rendering |

For Slack/chat automation and workflows see [earendil-works/pi-chat](https://github.com/earendil-works/pi-chat).

## Permissions & Containerization

Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access. By default, it runs with the permissions of the user and process that launched it.

If you need stronger boundaries, containerize or sandbox Pi. See [packages/coding-agent/docs/containerization.md](packages/coding-agent/docs/containerization.md) for three patterns:

- **Gondolin extension**: keep `pi` and provider auth on the host while routing built-in tools and `!` commands into a local Linux micro-VM.
- **Plain Docker**: run the whole `pi` process in a local container for simple isolation.
- **OpenShell**: run the whole `pi` process in a policy-controlled sandbox.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [AGENTS.md](AGENTS.md) for project-specific rules (for both humans and agents).  Longer term plans for Pi can also be found in [RFCs](https://rfc.earendil.com/keyword/pi/).

## Development

```bash
npm install --ignore-scripts  # Install all dependencies without running lifecycle scripts
npm run build         # Refresh model data, then build all packages
npm run build:offline # Rebuild using existing model data without network access
npm run check         # Lint, format, and type check
./test.sh            # Run tests (skips LLM-dependent tests without API keys)
./pi-test.sh         # Run pi from sources (can be run from any directory)
```

## Building standalone binaries from release source

GitHub releases include a versioned source archive covered by the release's `SHA256SUMS` file. Extract it and run the same build script used for the official standalone binaries:

```bash
VERSION="<release-version>"
tar -xzf "pi-${VERSION}-source.tar.gz"
cd "pi-${VERSION}"
./scripts/build-binaries.sh --offline-model-data --platform linux-x64 --out "$PWD/out"
```

The archive includes release model data and native prebuilds. `--offline-model-data` uses that model data without refreshing provider catalogs. The script installs dependencies and builds the executable with its runtime assets; pass `--skip-install` if dependencies are already provided.

## Supply-chain hardening

We treat npm dependency changes as reviewed code changes.

- Direct external dependencies are pinned to exact versions. Internal workspace packages remain version-ranged.
- `.npmrc` sets `save-exact=true` and `min-release-age=2` to avoid same-day dependency releases during npm resolution.
- `package-lock.json` is the dependency ground truth. Pre-commit blocks accidental lockfile commits unless `PI_ALLOW_LOCKFILE_CHANGE=1` is set.
- `npm run check` verifies pinned direct deps, native TypeScript import compatibility, and the generated coding-agent shrinkwrap.
- The published CLI package includes `packages/coding-agent/npm-shrinkwrap.json`, generated from the root lockfile, to pin transitive deps for npm users.
- Release smoke tests use `npm run release:local` to build, pack, and create isolated npm and Bun installs outside the repo before tagging a release.
- Local release installs, documented npm installs, and `pi update --self` use `--ignore-scripts` where supported.
- CI installs with `npm ci --ignore-scripts`, and a scheduled GitHub workflow runs `npm audit --omit=dev` plus `npm audit signatures --omit=dev`.
- Shrinkwrap generation has an explicit allowlist for dependency lifecycle scripts; new lifecycle-script deps fail checks until reviewed.

## Share your OSS coding agent sessions

If you use Pi or other coding agents for open source work, please share your sessions.

Public OSS session data helps improve coding agents with real-world tasks, tool use, failures, and fixes instead of toy benchmarks.

For the full explanation, see [this post on X](https://x.com/badlogicgames/status/2037811643774652911).

To publish sessions, use [`badlogic/pi-share-hf`](https://github.com/badlogic/pi-share-hf). Read its README.md for setup instructions. All you need is a Hugging Face account, the Hugging Face CLI, and `pi-share-hf`.

You can also watch [this video](https://x.com/badlogicgames/status/2041151967695634619), where I show how I publish my `pi-mono` sessions.

I regularly publish my own `pi-mono` work sessions here:

- [badlogicgames/pi-mono on Hugging Face](https://huggingface.co/datasets/badlogicgames/pi-mono)

## License

MIT

<p align="center">
  <a href="https://pi.dev">pi.dev</a> domain graciously donated by
  <br /><br />
  <a href="https://exe.dev"><img src="packages/coding-agent/docs/images/exy.png" alt="Exy mascot" width="48" /><br />exe.dev</a>
</p>


<!-- file: packages/coding-agent/README.md -->

<p align="center">
  <a href="https://pi.dev">
    <img alt="Pi logo" src="https://pi.dev/logo-auto.svg" width="128">
  </a>
</p>
<p align="center">
  <a href="https://discord.com/invite/3cU7Bz4UPx"><img alt="Discord" src="https://img.shields.io/badge/discord-community-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
  <a href="https://www.npmjs.com/package/@earendil-works/pi-coding-agent"><img alt="npm" src="https://img.shields.io/npm/v/@earendil-works/pi-coding-agent?style=flat-square&logo=npm&logoColor=white" /></a>
</p>

> New issues and PRs from new contributors are closed automatically. Maintainers review closed submissions daily. See [CONTRIBUTING.md](https://github.com/earendil-works/pi/blob/main/CONTRIBUTING.md).

# Pi

Pi is a minimal, extensible AI agent for the terminal. Adapt Pi to your workflow, not the other way around.

Ask Pi to create the prompt templates, skills, extensions, and themes you need, or install a Pi package. Use Pi directly, automate it in print, JSON, or RPC mode, or build applications with the TypeScript SDK.

## Getting started

Install the command-line interface with npm:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

This requires Node.js 22.19 or newer. Pi does not require dependency lifecycle scripts for a normal npm installation.

On macOS or Linux, you can instead use the installer:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Start Pi in the directory where you want it to work:

```bash
cd /path/to/project
pi
```

For a built-in AI provider, run `/login` inside Pi to connect a subscription or API key. Then give Pi a task.

See the [documentation](docs/index.md) for full setup and usage instructions.

## Development

Clone the repository, install its dependencies, and run Pi from source:

```bash
git clone https://github.com/earendil-works/pi
cd pi
npm install --ignore-scripts
./pi-test.sh
```

`pi-test.sh` can be called from any directory and preserves the caller's working directory.

Before submitting changes, run:

```bash
npm run check
./test.sh
```

Read [CONTRIBUTING.md](https://github.com/earendil-works/pi/blob/main/CONTRIBUTING.md) before opening an issue or pull request. It defines the contribution gate, issue quality bar, and required checks. Read [AGENTS.md](https://github.com/earendil-works/pi/blob/main/AGENTS.md) for repository-specific implementation, testing, dependency, and release rules.

## License

MIT


<!-- file: packages/coding-agent/docs/index.md -->

# Pi

Pi is an extensible AI agent that works from your terminal. Give it a goal and a working folder, and it can inspect files, run commands, edit content, and work through multi-step tasks.

Use Pi for software development, research notes, writing projects, data files, or hobby work. You can use Pi as is, prompt it to adapt itself to your workflow, or build other applications powered by Pi using the SDK.

## Start using Pi

New to Pi? Follow the [Quickstart](quickstart.md) to install Pi, connect a model, and complete your first task.

If Pi is already installed, choose what you want to do:

- [Use Pi interactively](usage.md) to add files, run commands, direct ongoing work, and export results.
- [Choose a model](models.md) or connect a subscription, API key, local model, or compatible endpoint.
- [Continue or branch a session](sessions.md) to resume work or explore another approach without losing history.
- [Configure Pi](configuration.md) for your preferences, working folders, instructions, and reusable resources.
- [Understand how Pi works](how-pi-works.md), including tools, context, sessions, and the agent loop.

## Customize Pi

Pi can reuse prompts, load specialized instructions, add executable integrations, change its terminal interface, connect model services, and distribute these resources as packages.
Use the [Quickstart customization chooser](quickstart.md#choose-how-to-customize-pi) to select the smallest mechanism that meets your need.

## Automate or embed Pi

- Use [print mode](cli.md#invocation-and-output) for one-off and scripted tasks.
- Use [JSON event stream mode](json.md) to consume structured events from one run.
- Use [RPC mode](rpc.md) to control a separate Pi process.
- Use the [TypeScript SDK](sdk.md) to run Pi inside an application.

## Find reference and setup information

Use the reference pages to look up [CLI options](cli.md), [settings](settings.md), [providers](providers.md), [keybindings](keybindings.md), and [environment variables](environment-variables.md).

For platform-specific help, see [Terminal Setup](terminal-setup.md), [Windows](windows.md), [tmux](tmux.md), [Termux on Android](termux.md), or [Containerization](containerization.md).

## Work safely

Pi's tools and extensions run with the permissions of the Pi process. Project trust controls which project resources Pi loads, but it does not sandbox tool calls. Review [Security](security.md) before using untrusted files, repositories, extensions, or unattended automation.


<!-- file: packages/coding-agent/docs/how-pi-works.md -->

# How Pi Works

Pi coordinates model requests, tool execution, context assembly, and session storage. A session is Pi's record of a conversation, including messages, tool calls and results, model changes, compactions, and other events.

Messages and events in a session form a tree. Each path through that tree is a branch. The branch ending at the current entry is the active branch and supplies the history for the next model request.

## Agent loop

A submitted message is added to the active branch. Pi builds a model request from the system prompt, active branch, available tools, and model settings, then sends it through the selected provider.

The provider streams an assistant response, which can contain text and tool calls. Pi records the response, executes each tool call, and records the results. That completes one turn. If tool results or queued messages require another model request, Pi starts another turn. Otherwise, the run ends.

Steering messages enter after the current assistant turn. Follow-up messages enter after the agent has finished its pending work. Aborting stops the current run and returns queued messages to the editor.

## Context

The active branch supplies conversation history. Pi converts its session entries into model-compatible user, assistant, and tool-result messages.

Pi builds the system prompt from its base instructions and discovered context files. The request also carries tool definitions and skill descriptions.

Full skill instructions are loaded on demand. Extensions can add instructions or transform context.

Prompt templates expand editor input before it becomes a user message. Selected files, images, pasted text, and shell output can become message content.

## Sessions

Persistent sessions are JSONL files. Each tree entry has an ID and refers to its parent. The current entry identifies the active branch.

Continuing from an earlier entry creates another branch in the same file. Forking and cloning copy selected history into a new session file.

Model context is reconstructed from the active branch. Compaction inserts a summary entry that replaces older messages in subsequent model requests. The original entries remain in the session tree.

## Interfaces

Interactive mode renders session and agent events in the terminal. Print mode runs a prompt and writes the final response. JSON mode writes agent events as JSONL.

RPC mode accepts JSONL commands on stdin and writes responses and events to stdout. The TypeScript SDK creates and controls agent sessions in process.

All interfaces use the same agent and session mechanisms.

## Extensions and resources

Extensions are TypeScript modules loaded into the Pi process. Their factory functions register tools, commands, shortcuts, providers, event handlers, renderers, and terminal UI.

Skills provide on-demand instructions and supporting files. Prompt templates provide reusable message text. Themes provide terminal colors. Pi packages distribute these resources through npm or git.

## Trust and permissions

Pi resolves project trust before loading project settings and resources. After the trust decision and project-resource loading, Pi loads context files. Enabled tools use the operating-system permissions of the Pi process. Extensions execute inside that process.


<!-- file: packages/coding-agent/docs/quickstart.md -->

# Quickstart

Pi runs in your terminal and works with files on your machine. To use it, you need access to a model through a supported provider. This can be a subscription, an API key, or a local model.

For native Windows setup, read [Windows Setup](windows.md). For Android, read [Termux Setup](termux.md).

## 1. Install Pi

On macOS or Linux, you can use the installer:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Alternatively, install Pi from npm. This requires Node.js 22.19 or newer:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Pi does not require dependency lifecycle scripts for a normal npm installation.

Verify the installation:

```bash
pi --version
```

## 2. Start Pi

Change to the folder you want Pi to work with, then start it:

```bash
cd /path/to/folder
pi
```

The working folder helps Pi discover relevant files, instructions, and configuration. Pi also uses it to group saved sessions.

<p align="center"><img src="images/interactive-mode.png" alt="Pi running in a terminal with a conversation, input editor, and status footer" width="750"></p>

The interface shows your conversation, an editor for prompts and commands, and a footer with the current folder, model, and session status. See [Use Pi in the terminal](usage.md) to learn how to add files, run commands, direct ongoing work, and manage results.

## 3. Choose a model

A **model** generates Pi's responses. A **provider** is the service or account Pi uses to access that model.

In Pi, run:

```text
/login
```

Choose a provider, then follow the prompts to use a subscription or store an API key. Run `/model` afterward if you want to select a different available model.

See [Choose a model and provider](models.md) for supported providers, environment-variable authentication, local models, and custom endpoints.

## 4. Give Pi a task

Pi shows each file read, search, command, and edit it performs. It does not ask before every tool call.

Enter a task that matches your work, for example:

```text
Summarize @meeting-notes.md and save the action items to action-items.md.
```

```text
Explain how this repository is structured and how to run its checks.
```

```text
Compare @previous.csv with @current.csv and summarize the important changes.
```

Type `@` in the editor to search for a file instead of entering its full path. When Pi finishes, review its response and any changed files. Use version control or backups for important work. For untrusted or unattended work, use a container or another sandbox. See [Security](security.md).

## Continue later

Pi saves sessions automatically. Exit Pi, then resume the most recent session for the same working folder with:

```bash
pi --continue
```

Use `/resume` to choose another saved session. See [Continue or branch a session](sessions.md) for session naming, branching, compaction, export, and sharing.

## Next steps

- [Use Pi interactively](usage.md) to learn input, commands, shortcuts, and queued messages.
- [Add instructions](configuration.md#context-files) that Pi should follow whenever it works in a folder.
- [Choose a model and provider](models.md).

### Choose how to customize Pi

Start with the least powerful mechanism that meets your need:

| Need | Start with |
|---|---|
| Give Pi persistent instructions for a folder | [`AGENTS.md`](configuration.md#context-files) |
| Reuse a prompt from the `/` menu | [Prompt template](prompt-templates.md) |
| Add task-specific instructions and supporting files | [Skill](skills.md) |
| Add executable tools, commands, or event handlers | [Extension](extensions.md) |
| Build a custom terminal component | [Terminal UI](tui.md) |
| Connect an unsupported model service | [Custom provider](custom-provider.md) |
| Install or distribute several resources | [Pi package](packages.md) |

## Uninstall Pi

If you installed Pi with npm, run:

```bash
npm uninstall -g @earendil-works/pi-coding-agent
```

If you used the installer, run it again and choose **Uninstall Pi**:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

Neither method removes configuration, credentials, sessions, or installed Pi packages from `~/.pi/agent/`.


<!-- file: packages/coding-agent/docs/sessions.md -->

# Sessions and Context

Pi saves a conversation as a session. The active branch of that session supplies conversation history for the next model request. Use session commands to continue work, explore another branch, or reduce the amount of history sent to the model.

## Continue or switch sessions

Pi saves sessions automatically unless you start it with `--no-session`.

```bash
pi --continue
pi --resume
```

`--continue` opens the most recent session for the current working directory. `--resume` opens the session picker. In interactive mode, `/resume` opens the same picker and `/new` starts a new session.

Use `/name` or `--name` to assign a recognizable session name. Run `/session` to verify the current session file, ID, message count, token usage, and cost.

The session picker lets you search, rename, and delete sessions. It can also show paths, change sorting, and limit results to named sessions. See [Keybindings](keybindings.md#sessions) for its shortcuts.

## Choose how to branch

Pi stores entries as a tree, so returning to an earlier point does not erase the branch you leave.

| Action | Result | Use it when |
|---|---|---|
| `/tree` | Moves within the current session file | Related alternatives should stay together |
| `/fork` | Creates a new session from an earlier user message | The alternative should become separate work |
| `/clone` | Copies the active branch into a new session | You want a separate copy of the current state |

In `/tree`, select a user message to put its text back in the editor. Edit and submit it to create another branch. Selecting an assistant response or another entry continues after that entry with an empty editor.

When you leave a branch, Pi can summarize it and attach that summary to the branch you enter. This preserves relevant work from the abandoned path without including every message from it.

For the persisted tree and entry types, see [Session Format](session-format.md).

## Manage conversation context

The model receives the active branch, not every branch in the session file. Pi combines that history with the system prompt, discovered context files, available tools, and loaded skill descriptions. [How Pi Works](how-pi-works.md#context) describes how those inputs are assembled.

The footer shows current context usage. When the active context approaches the model's limit, Pi normally compacts older history automatically. Compaction adds a summary and keeps recent messages. It does not delete the original session entries.

Run `/compact` to compact manually. You can add instructions when the summary should preserve a particular topic or decision. Configure automatic compaction and retained history through [Settings](settings.md#compaction).

Compaction can fail if the provider is unavailable or cannot accept the summarization request. Correct the provider problem and run `/compact` again. Disabling automatic compaction does not disable the manual command.

See [Compaction Reference](compaction.md) for thresholds, retained boundaries, branch-summary behavior, and extension hooks.

## Control session storage

By default, Pi stores sessions under `~/.pi/agent/sessions/`, grouped by working directory. Use `--session-dir`, `PI_CODING_AGENT_SESSION_DIR`, or the `sessionDir` setting to choose another location. The CLI option has highest precedence.

Use `--no-session` for an ephemeral run. An ephemeral session cannot be resumed after Pi exits.

Use `--session` when you already know the session path or ID. Use `--fork` to create a new session from an existing session before interactive mode starts.

## Export or share a session

Use `/export` to write the current session as HTML or JSONL. Use `/share` to upload it and get a viewer link. Pi uses a Radius artifact when Radius authentication is configured; otherwise, it uses a private GitHub gist.

Review exported or shared sessions first. They can contain prompts, model responses, tool arguments, command output, file contents, and extension messages.

## Report a bug

Run `/bug [description]` to prepare a private report for the Pi developers. You can include the session transcript, omit it, or ask the current model to summarize the problem. Review any transcript or generated summary because it can contain sensitive conversation data.

The report includes environment and provider configuration without credential values, plus recorded error diagnostics. Upload it through `radius.pi.dev` or export the same report as a zip to inspect and share yourself. Uploads do not require a login; Radius authentication attributes the report to your account so the developers can follow up. If an upload fails, Pi offers to export the zip.


<!-- file: packages/coding-agent/docs/skills.md -->

# Skills

Skills give Pi specialized instructions and supporting files for a particular kind of work. Pi advertises each available skill by name and description, then loads its full instructions only when the task calls for them.

Use a skill when a workflow needs more context than a prompt template but does not need a new executable integration point. Skills can bundle scripts, references, and assets alongside their instructions.

Pi implements the [Agent Skills specification](https://agentskills.io/specification). Most invalid fields produce warnings rather than stopping startup.

## Create a skill

A skill is a directory containing `SKILL.md`:

```text
pdf-tools/
├── SKILL.md
├── scripts/
│   └── extract.sh
├── references/
│   └── formats.md
└── assets/
    └── template.json
```

Start `SKILL.md` with frontmatter followed by direct instructions:

```markdown
---
name: pdf-tools
description: Extract text and tables from PDF files. Use when reading, converting, or inspecting PDFs.
---

# PDF tools

Read `references/formats.md` before converting a document. Run scripts relative to this skill directory.
```

The description determines when the model considers loading the skill. State both what the skill does and when it applies. Avoid descriptions such as “Helps with PDFs,” which do not provide enough routing information.

Use relative paths from the skill directory when referring to bundled files. Pi tells the model where the skill lives so it can resolve those paths.

## Understand how skills load

At startup, Pi scans configured skill locations and adds each skill’s name, description, and path to the system prompt. It does not add the full instructions.

When a task matches, the model reads `SKILL.md` and follows its instructions. This keeps detailed guidance out of context until it is needed. A model might fail to load a relevant skill, so use `/skill:name` when you need to force it.

Arguments after `/skill:name` are appended to the loaded instructions as a user request:

```text
/skill:pdf-tools extract report.pdf
```

Set `disable-model-invocation: true` in frontmatter when a skill should be available only through its explicit command. The `enableSkillCommands` [setting](settings.md) controls whether skill commands appear in interactive command discovery; manually entered `/skill:name` commands still work.

<a id="choose-where-it-loads"></a>

## Add it to Pi

Place the skill in your user or project skills directory. Directories containing `SKILL.md` are discovered recursively.

Pi also supports the Agent Skills locations `~/.agents/skills/` and `.agents/skills/`. Project `.agents/skills/` directories are discovered from the working directory through its ancestors, stopping at the repository root when one exists.

Pi accepts some standalone Markdown skills, but a directory containing `SKILL.md` is the portable form and should be preferred. See [Settings](settings.md#resources) and [Pi Packages](packages.md) for additional locations.

Project skills can instruct the model to run scripts or modify files. Review unfamiliar skills and their supporting files before granting project trust.

## Write portable frontmatter

The Agent Skills specification defines these fields:

| Field | Purpose |
|---|---|
| `name` | Command and display name |
| `description` | Routing description shown to the model |
| `license` | License name or bundled license file |
| `compatibility` | Environment requirements |
| `metadata` | Additional key-value metadata |
| `allowed-tools` | Experimental pre-approved tool list |
| `disable-model-invocation` | Hide the skill from automatic model selection |

Names use lowercase letters, numbers, and hyphens, with no leading, trailing, or consecutive hyphens. They can contain at most 64 characters; descriptions can contain at most 1024.

Pi neither requires nor warns when the declared name differs from the parent directory. Other Agent Skills implementations may enforce that requirement, so matching names remain the portable choice.

Malformed `SKILL.md` files and declared skills without descriptions are not loaded. Name collisions keep the first discovered skill and produce a warning.

## Validate and share a skill

Run Pi from a location where the skill is discoverable, then inspect the startup diagnostics and `/skill:name` command. Run `/reload` after editing a skill during an active session.

Use a [Pi package](packages.md) to distribute one or more skills through npm or git. Keep environment setup inside the skill and declare any required runtime dependencies in the package.

For examples, see the [Anthropic skills collection](https://github.com/anthropics/skills) and [Pi skills collection](https://github.com/badlogic/pi-skills).


<!-- file: packages/coding-agent/docs/packages.md -->

# Pi Packages

Pi packages install and distribute extensions, skills, prompt templates, and themes as one unit. Use a package when a customization should be shared through npm or git, or when several resources belong together.

A package is an ordinary directory or npm package. It can expose conventional resource directories, declare explicit paths under the `pi` key in `package.json`, and carry its own runtime dependencies.

## Install and manage packages

Install from npm, git, or a local path:

```bash
pi install npm:@example/pi-tools@1.0.0
pi install git:github.com/example/pi-tools@v1
pi install ./local-package
```

`pi list` shows configured packages. Use `pi remove <source>` to remove one and `pi update --extensions` to reconcile package installations. See [Command Line](cli.md#package-commands) for every package command and option.

Personal installs are written to `~/.pi/agent/settings.json`. Add `--local` or `-l` to write the package declaration to `.pi/settings.json`. Pi reads declarations from that file only after project trust is granted.

Project packages are installed and loaded only after project trust is resolved. Packages can execute extension code and can include skills that instruct the model to run programs. Review third-party package source before installing it. Review project package declarations before granting project trust.

Use `--extension` or `-e` to try a package for one invocation without adding it to settings:

```bash
pi -e npm:@example/pi-tools
```

## Choose a source

| Source | Example | Behavior |
|---|---|---|
| npm | `npm:@example/pi-tools@1.0.0` | Installed under the Pi npm directory |
| git | `git:github.com/example/pi-tools@v1` | Cloned and reconciled to the selected ref |
| URL | `https://github.com/example/pi-tools` | Treated as a git source |
| Local | `./pi-tools` | Loaded from the resolved path without copying |

Versioned npm specifications are pinned. Git tags and commits are also pinned; package updates reconcile the checkout but do not move a configured ref.

Relative local paths resolve from the settings file that contains them. A file path loads one extension. A directory follows normal package discovery rules.

## Create a package

The simplest package uses conventional directories:

```text
my-pi-package/
├── package.json
├── extensions/
├── skills/
├── prompts/
└── themes/
```

Without a `pi` manifest, Pi discovers TypeScript and JavaScript extensions, skill directories, Markdown prompts, and JSON themes from those directories.

Use an explicit manifest when resources live elsewhere or need filtering:

```json
{
  "name": "my-pi-package",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./src/extension.ts"],
    "skills": ["./resources/skills"],
    "prompts": ["./resources/prompts/*.md"],
    "themes": ["./resources/themes/*.json"]
  }
}
```

Paths are relative to the package root. Arrays accept glob patterns and exclusions. List dot-prefixed or symlinked resource roots directly when traversal through a glob would not discover them.

The `pi-package` keyword makes an npm package eligible for discovery in the [Pi package gallery](https://pi.dev/packages). Optional `pi.image` and `pi.video` fields add gallery previews.

## Declare dependencies

Put runtime packages imported by extensions in `dependencies`. Pi installs package dependencies when it installs an npm or git source.

Pi supplies these packages to extensions and skills:

- `@earendil-works/pi-ai`
- `@earendil-works/pi-agent-core`
- `@earendil-works/pi-coding-agent`
- `@earendil-works/pi-tui`
- `typebox`

Declare the host-provided packages listed above in `peerDependencies` with a `"*"` range and do not bundle them. Pi suppresses automatic peer installation for managed npm packages and git packages installed with npm, pnpm, or Bun. Local packages are not installed or modified, so their dependency tree remains the package author's responsibility.

Do not list host-provided packages in `dependencies`. A physical copy can bypass Pi's extension module mapping in compiled ESM and create duplicate classes, registries, and initialization work. Pi reports an extension warning when it detects this manifest configuration. Other Pi packages used as dependencies must be included in the published tarball and referenced through their `node_modules` resource paths.

Installed packages load with separate module roots. Do not rely on two packages sharing one dependency instance or one package resolving another package’s undeclared dependency.

## Select package resources

The object form in settings narrows which resources load from a package:

```json
{
  "packages": [
    {
      "source": "npm:@example/pi-tools",
      "extensions": ["extensions/*.ts", "!extensions/legacy.ts"],
      "skills": [],
      "prompts": ["prompts/review.md"]
    }
  ]
}
```

For each resource type:

- Omit the property to load everything allowed by the package.
- Use `[]` to load none of that type.
- Use `!pattern` to exclude glob matches.
- Use `+path` to include one exact allowed path.
- Use `-path` to exclude one exact path.

Filters narrow the package manifest. They do not expose resources that the package itself did not declare.

Run `pi config` to enable or disable discovered resources and pi's built-in extensions. It starts with personal configuration; press Tab to switch scope, or run `pi config --local` to start with project overrides.

## Understand scope and identity

The same package can appear in personal and project settings. A project entry normally replaces the personal entry. With `autoload: false`, the project entry instead acts as a filtering delta over the personal package.

Pi identifies npm packages by package name, git packages by repository URL without the ref, and local packages by resolved absolute path. This prevents the same package from loading twice through equivalent declarations.

Use [Extensions](extensions.md), [Skills](skills.md), [Prompt Templates](prompt-templates.md), and [Themes](themes.md) to design each resource before packaging it.


<!-- file: packages/coding-agent/docs/extensions.md -->

# Extensions

Extensions are TypeScript modules that add executable behavior to Pi. Use one when a workflow needs tools, commands, event handlers, model providers, session state, or terminal UI rather than instructions alone.

An extension runs inside the Pi process with the same operating-system permissions. It can inspect prompts, tool calls, files, credentials, and session history, so load extensions only from sources you trust.

Typical extensions add an agent tool, protect paths, confirm dangerous commands, react to session events, modify context, expose a command, or display persistent status.

<a id="quick-start"></a>
<a id="writing-an-extension"></a>
<a id="create-an-extension"></a>

## Create and load an extension

An extension exports a default factory that receives `ExtensionAPI`. The factory registers capabilities for the current extension runtime.

Create `~/.pi/agent/extensions/hello.ts`:

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "Show a greeting",
    handler: async (name, ctx) => {
      ctx.ui.notify(`Hello, ${name || "world"}!`, "info");
    },
  });
}
```

Start Pi and run `/hello`. During development, load a file directly:

```bash
pi --extension ./hello.ts
```

Pi uses `jiti`, so local TypeScript extensions do not need a separate compilation step. Use [Pi packages](packages.md) for distributed extensions and dependencies.

<a id="extension-locations"></a>
<a id="available-imports"></a>
<a id="choose-where-it-loads"></a>

## Add it to Pi

Place the extension in your user or project extensions directory. Pi loads direct TypeScript or JavaScript files and subdirectories containing an `index.ts` or `index.js` entry point.

Use a single file for a small extension and a directory for a multi-file implementation. Put npm dependencies in a nearby `package.json`. See [Configuration](configuration.md) for conventional locations and [Settings](settings.md#resources) for additional paths.

Reload replaces the extension runtime, so code after `await ctx.reload()` must not reuse state from the old runtime. Only personal and explicit command-line extensions can participate in the `project_trust` event that runs before project extensions load.

<a id="understand-the-lifecycle"></a>

## Respect the runtime lifecycle

The factory can be synchronous or asynchronous. Pi waits for an asynchronous factory before startup continues, allowing it to fetch configuration or register providers needed during startup.

Do not start processes, sockets, watchers, or timers in the factory because some invocations load extensions without starting a session.
Start long-lived resources from `session_start` or from the command or tool that needs them.
Close session-scoped resources from an idempotent `session_shutdown` handler.

A run proceeds from input and `before_agent_start`, through model, message, and tool events, to `agent_end`.
Automatic retries, recovery, compaction, or queued work can continue afterward.
<a id="agent_start--agent_end--agent_before_settle--agent_settled"></a>

`agent_before_settle` is the final actionable boundary: it can append entries and request one continuation.
`agent_settled` is final and notification-only; use it when an integration needs to know Pi will not continue automatically.

<a id="extensionapi-methods"></a>

## Choose an integration point

| Capability | Main API |
|---|---|
| Observe or modify lifecycle behavior | `pi.on()` |
| Add a model-callable operation | `pi.registerTool()` |
| Add a `/` command | `pi.registerCommand()` |
| Add a shortcut or CLI flag | `pi.registerShortcut()` or `pi.registerFlag()` |
| Send user or custom messages | `pi.sendUserMessage()` or `pi.sendMessage()` |
| Persist non-context session data | `pi.appendEntry()` |
| Change active tools, model, or thinking level | Session control methods on `pi` |
| Add a model provider | `pi.registerProvider()` |
| Add an MCP server | `pi.registerMcpServer()` |
| Route each request to a model | [`pi.registerVirtualModel()`](virtual-models.md) |
| Add terminal rendering | Renderer registration and `ctx.ui` |
| Communicate with another extension | `pi.events` |

Use the exported declarations in [`extensions/types.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/extensions/types.ts) for exact event, context, tool, and result types.

## Follow the extension contracts

<a id="events"></a>
<a id="work-with-events"></a>

### Events and concurrency

Handlers run in extension load and registration order. `pi.on()` returns a function that unsubscribes that registration; changes do not affect a dispatch already in progress.
Some events notify; others transform data, replace results, or cancel an operation.
Use each event’s declared result type rather than assuming every return value has an effect.

Events cover resource discovery, sessions, agent and message lifecycle, providers, tools, and raw input.

`before_agent_start` exposes both the current prompt and its structured `systemPromptOptions`. Prefer changing prompt sections, selected tools, or guidelines so Pi can append a transcript delta. Returning `systemPrompt`, or setting `forceSystemPrompt`, replaces the whole prompt for that run while the transcript continues recording the structured sections. Providers receive the forced text as their leading system prompt.

`message_end` can replace a finalized message while preserving its role. `tool_call` can mutate input or block execution. `tool_result` handlers compose, with each handler seeing prior changes.

<a id="provider_stream_event"></a>

`provider_stream_event` fires for each parsed provider stream event before Pi normalizes it. The event identifies the provider, API, and model; `event.data` is the earliest structured value available to Pi, not necessarily the original HTTP bytes or SSE frame. Treat it as read-only because mutation can affect normalization. The event is notification-only and is not persisted.

Handlers are awaited in stream order, so slow handlers delay stream consumption. Handler errors are reported without changing the provider response. See [`debug-provider.ts`](../examples/extensions/debug-provider.ts) for an opt-in viewer that groups raw events by assistant message.

<a id="context_with_system"></a>

`context` transforms conversation messages without prompt and tool system messages; Pi restores that state afterward. Use `context_with_system` only when a request-local transformation must own the complete transcript, and keep a system message at index zero.

`turn_end` and `agent_before_settle` are actionable boundaries. Their handlers can chain proposed `custom`, `custom_message`, `context_edit`, or `compaction` entries and return `continue: true` for one next model request. Guard continuation conditions because an unconditional continuation can loop. Use the exported event declarations for the complete validation and ordering contract.

<a id="cache_warming_decision"></a>

`cache_warming_decision` can override an idle prompt-cache refresh with `{ action: "warm" }` or `{ action: "stop" }`. The last handler that returns an action wins.

Tool calls from one assistant message can run in parallel.
Do not assume a sibling call or result exists when another tool event runs.
Use `ctx.signal` for nested work owned by an active turn; commands and idle session events often have no operation signal.

A `user_bash` handler that returns `undefined` passes the command to the next handler and then to local execution if no handler handles it. Returning `operations` or `result` stops propagation. A handler failure blocks the command rather than falling through to local execution.

<a id="custom-tools"></a>
<a id="register-tools"></a>

### Tools

A custom tool defines a name, model-facing description, TypeBox parameter schema, and `execute()` function.
Its result requires model-facing `content` and a `details` field for rendering or state reconstruction.
Use `details: undefined` when there are no structured details. If the tool makes nested model calls, include their `usage` in the result so session totals remain accurate.

Throw from `execute()` to produce a failed tool result.
Returning an object does not mark it as an error.
Return `terminate: true` only when the agent should skip its automatic follow-up after every completed tool in that batch agrees to terminate.

Use sequential execution when tools share mutable in-memory state.
File-mutating tools should wrap the complete read-modify-write operation with `withFileMutationQueue()`.
Truncate large model-facing results and tell the model where to read the complete output.

Declare `outputSchema` and return a matching `structuredContent` when the result is data. The model still receives `content`; programmatic callers such as codemode scripts receive `structuredContent` instead of the text. Tools without `outputSchema` are passed to scripts as their text content. To report a failure that still carries data, return the result with `isError: true` instead of throwing: the model sees an error, and scripts still receive `structuredContent`.

A tool can run other tools with `ctx.executeTool(name, args, { signal, onUpdate })`. Nested calls go through argument validation and the `tool_call` and `tool_result` handlers like model-issued calls, and emit `tool_execution_start`, `tool_execution_update`, and `tool_execution_end`; all of these events carry `parentToolCallId`, and their `toolCallId` is assigned by pi as `<parent id>/<n>`. These ids do not appear as tool calls or tool results in the transcript. Nested calls do not add transcript entries: their results only reach the calling tool, which reports them itself, for example through `onUpdate` and `details`. The session keeps a bounded record of them (name, arguments, status, duration, error; never results) as `nestedCalls` on the calling tool's result message. It is used for compaction file lists and shown in HTML exports. Arguments over 8 KiB per call or 32 KiB per tool result are omitted, at most 256 calls are kept, and `complete: false` marks a record that lost anything. The `usage` of nested results, at every depth, is added to the calling tool's result `usage`, so a tool reports only its own usage, not that of the tools it called. `ctx.tools` lists the tools `ctx.executeTool()` can call. `tool_result` handlers that redact `content` should also replace `structuredContent`; replacing only `content` drops it.

See [`hello.ts`](../examples/extensions/hello.ts), [`todo.ts`](../examples/extensions/todo.ts), [`dynamic-tools.ts`](../examples/extensions/dynamic-tools.ts), and [`truncated-tool.ts`](../examples/extensions/truncated-tool.ts).

### Tool exposure

`exposure` controls how the model reaches a tool. "Callable" means callable from other tools through `ctx.executeTool()` (`ctx.tools`), as the `codemode` tool's scripts do:

- `direct` (default): declared to the model while active, and callable while active.
- `model-only`: declared to the model while active, never callable. Use it for tools that orchestrate other tools or ask the user.
- `codemode`: callable whenever registered, and listed by the `codemode` tool. Not declared to the model unless activated explicitly.
- `deferred`: like `codemode`, but codemode tools do not list it; `tool_search` can find and activate it.
- `hidden`: registered but unreachable. Re-register a tool with `exposure: "hidden"` to withdraw it, since tools cannot be unregistered.

`namespace: { name, description, instructions }` groups related tools, as MCP servers do. Codemode tools list a namespace under one heading with its `description`. `instructions` holds longer usage guidance; it is not listed, and codemode scripts read it with `describeNamespace(name)`.

Registering a `direct` or `model-only` tool activates it; the other exposures are not activated on registration. The active set (`pi.getActiveTools()`, `pi.setActiveTools()`) is the set of tools declared to the model. `pi.getAllTools()` reports each tool's `exposure`, `namespace`, and `annotations`.

`annotations` are hints about what a tool does, with the meaning of MCP tool annotations: `readOnlyHint`, `destructiveHint`, `idempotentHint`, and `openWorldHint`. MCP tools carry the hints their server declares. Missing hints take the MCP defaults: a tool is not read-only, and may be destructive and reach an open world. The hints are not verified, but a permission extension can use them to decide which calls to confirm. This confirms the calls Codex asks approval for:

```typescript
pi.on("tool_call", async (event, ctx) => {
  const hints = pi.getAllTools().find((tool) => tool.name === event.toolName)?.annotations;
  const needsApproval =
    hints?.destructiveHint === true ||
    (!hints?.readOnlyHint && ((hints?.destructiveHint ?? true) || (hints?.openWorldHint ?? true)));
  if (needsApproval && !(await ctx.ui.confirm("Allow tool call?", event.toolName))) {
    return { block: true, reason: `${event.toolName} was not approved` };
  }
});
```

A tool that orchestrates other tools can adjust what the model sees while it is active with `prepareLoadout(loadout)`. It runs whenever the active tools change and receives the declared tools, the callable tools, and every registered tool with its exposure and namespace. It returns replacement `descriptions` for declared tools (including its own) and `hiddenDeclarations`: active tools whose declarations requests leave out while they stay active and callable. `codemode` uses only this hook, `exposure`, and `ctx.executeTool()`, so another tool can implement the same behavior under a different name.

### Activate tools dynamically

Register every tool first, keep optional tools inactive, and use `pi.setActiveTools()` from a loader tool to select the desired active tools. Names must already be registered; unknown names are ignored.

Pi records the initial prompt and tool set in the transcript's first system message, then appends tool and prompt changes before the next model request. Providers that cannot represent the transition receive a complete transcript checkpoint, which can invalidate the cached prefix.

### MCP servers

`pi.registerMcpServer(name, config)` adds an MCP server for the current session. `config` has the shape of an `mcpServers` entry in [`mcp.json`](mcp.md): `command`, `args`, `env`, and `cwd` for stdio servers, `url`, `headers`, and `oauth` for HTTP servers, plus `exposure`, `toolExposure`, `description`, `enabled`, and `timeout`.

```typescript
pi.registerMcpServer("jira", { url: "https://mcp.example.com/jira", exposure: "codemode" });
pi.unregisterMcpServer("jira");
```

Servers registered while the extension loads connect when the session starts, together with the `mcp.json` servers; servers registered later connect right away, and `pi.unregisterMcpServer()` closes the connection and makes the server's tools unreachable. Registrations are not saved: register again on every load, for example based on the extension's own settings. A server in `mcp.json` with the same name takes precedence, and `/mcp` shows the override. Registering the same name again replaces the extension's earlier registration; names registered by another extension, invalid names, and invalid configs throw.

The built-in MCP support connects registered servers. When nothing does, because another extension replaced it (see [MCP](mcp.md#other-mcp-extensions)), each registration is reported as an extension error. Other MCP extensions can connect registered servers too: read them with `pi.getMcpServers()` on `session_start` and handle the `mcp_servers_change` event for later changes.

<a id="extensioncontext"></a>
<a id="extensioncommandcontext"></a>
<a id="use-extension-context"></a>

### Context and session changes

`ExtensionContext` provides the working directory, mode, UI, session manager, model runtime, abort signal, context usage, and controls for compaction and shutdown.
Use `ctx.modelRegistry.streamSimple()` for provider-neutral nested model calls.

Command handlers receive `ExtensionCommandContext`, which adds operations for waiting until idle, reloading, tree navigation, and session replacement.
These operations are command-only because calling them from lifecycle handlers can deadlock the runtime.

Session replacement invalidates the old context. Capture only plain data before switching, then use the fresh context supplied to `withSession` for session-bound work.

<a id="state-management"></a>
<a id="persist-state"></a>

### State

Choose storage based on how state participates in the conversation:

| State | Storage |
|---|---|
| Tool state that follows the active branch | Tool-result `details` |
| Durable data excluded from model context | `pi.appendEntry()` |
| Custom content stored and sent to the model | `pi.sendMessage()` |
| Data outside one session | External storage |

Reconstruct branch-sensitive state from `ctx.sessionManager.getBranch()` during `session_start`.
Do not rebuild it from every file entry because abandoned branches represent alternative histories.
Register an entry or message renderer when custom stored content should appear in the transcript.

<a id="custom-ui"></a>
<a id="mode-behavior"></a>
<a id="interact-with-the-user"></a>
<a id="account-for-each-mode"></a>

### UI and modes

`ctx.ui` provides dialogs, notifications, status text, widgets, titles, editor access, and custom components.
Use `ctx.ui.custom()` only when the interaction needs its own rendering and input.
See [Terminal UI](tui.md) for component, focus, overlay, theme, and performance guidance.

Extensions load in interactive, RPC, JSON, and print modes.
Interactive mode provides the complete terminal UI.
RPC can forward supported dialogs and notifications through the [RPC Extension UI protocol](rpc-extension-ui.md), but not custom terminal components; JSON and print modes have no UI.
Guard terminal-only behavior with `ctx.mode === "tui"` and use `ctx.hasUI` for interactions supported by interactive and RPC clients.

Keep tool and event behavior independent from rendering so non-interactive modes remain functional.

<a id="error-handling"></a>
<a id="handle-errors-and-shutdown"></a>

### Errors and cleanup

Pi reports handler errors and continues where possible. A `tool_call` handler failure blocks the tool as a fail-safe; a tool execution failure becomes an error result for the model.

Release resources in `session_shutdown` even when normal operation attempted cleanup.
Keep cleanup idempotent because cancellation, reload, session replacement, and process exit can converge on the same path.
Use `ctx.shutdown()` to request an orderly process shutdown.

<a id="examples-reference"></a>
<a id="use-examples-as-the-implementation-reference"></a>

## Examples and reference

The checked [extension examples](../examples/extensions/) cover tools, lifecycle events, commands, flags, shortcuts, state, rendering, providers, OAuth, remote execution, and terminal components.
Start with the smallest example matching your integration point.

Use [Custom Providers](custom-provider.md) for model-service integrations, [Terminal UI](tui.md) for custom components, and [Pi Packages](packages.md) to install or distribute extensions with other resources.


<!-- file: packages/coding-agent/docs/compaction.md -->

# Compaction Reference

This reference describes automatic compaction, branch summarization, persisted entries, and extension hooks. For the user workflow, see [Sessions and Context](sessions.md#manage-conversation-context).

**Source files** ([pi](https://github.com/earendil-works/pi)):
- [`packages/coding-agent/src/core/compaction/compaction.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/compaction.ts) - Auto-compaction logic
- [`packages/coding-agent/src/core/compaction/branch-summarization.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/branch-summarization.ts) - Branch summarization
- [`packages/coding-agent/src/core/compaction/utils.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/utils.ts) - Shared utilities (file tracking, serialization)
- [`packages/coding-agent/src/core/session-manager.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/session-manager.ts) - Entry types (`CompactionEntry`, `BranchSummaryEntry`)
- [`packages/coding-agent/src/core/extensions/types.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/extensions/types.ts) - Extension event types

For TypeScript definitions in your project, inspect `node_modules/@earendil-works/pi-coding-agent/dist/`.

## Overview

Pi has two summarization mechanisms:

| Mechanism | Trigger | Purpose |
|-----------|---------|---------|
| Compaction | Context exceeds threshold, or `/compact` | Summarize old messages to free up context |
| Branch summarization | `/tree` navigation | Preserve context when switching branches |

Both use closely related structured formats and track file operations cumulatively. Summarization requests disable prompt-cache writes because these one-off prompts are unlikely to be reused.

## Compaction

### When It Triggers

Auto-compaction triggers when:

```
contextTokens > contextWindow - reserveTokens
```

By default, `reserveTokens` is 16384 tokens (configurable in `~/.pi/agent/settings.json` or `<project-dir>/.pi/settings.json`). This leaves room for the LLM's response.

During a multi-turn agent run, Pi checks the canonical projected context after tools finish and their results are appended, before starting the next assistant response. If the threshold is crossed, Pi compacts during `prepareNextTurn`, then performs the existing catch-up steering poll before `turn_start`. It skips this between-turn check when the completed tool batch terminates the run and no queued message requires another response. Pi also checks before a new user prompt and performs final-attempt overflow recovery after the low-level run ends.

A provider context-overflow error or an early final `stopReason: "length"` can select one compact-and-retry recovery attempt. Length responses with tool calls retain their synthetic failed tool results and follow the ordinary tool/queue scheduler rather than forcing the run to end.

You can also trigger manually with `/compact [instructions]`, where optional instructions focus the summary.

### How It Works

1. **Find cut point**: Walk backwards through the finalized session projection, accumulating token estimates until `keepRecentTokens` (default 20k, configurable in `~/.pi/agent/settings.json` or `<project-dir>/.pi/settings.json`) is reached
2. **Extract messages**: Collect projected messages from the previous kept boundary (or session start) up to the cut point
3. **Generate summary**: Call LLM to summarize with structured format, passing the previous summary as iterative context when present
4. **Append entry**: Save `CompactionEntry` with summary and `firstKeptEntryId`
5. **Rebuilds context**: Session rebuilds the context for the next request, using summary + messages from `firstKeptEntryId` onwards

```
Before compaction:

  entry:  0     1     2     3      4     5     6      7      8     9
        ┌─────┬─────┬─────┬──────┬─────┬─────┬──────┬──────┬─────┬─────┐
        │ hdr │ usr │ ass │ tool │ usr │ ass │ tool │ tool │ ass │ tool│
        └─────┴─────┴─────┴──────┴─────┴─────┴──────┴──────┴─────┴─────┘
                └────────┬───────┘ └──────────────┬──────────────┘
               messagesToSummarize            kept messages
                                   ↑
                          firstKeptEntryId (entry 4)

After compaction (new entry appended):

  entry:  0     1     2     3      4     5     6      7      8     9     10
        ┌─────┬─────┬─────┬──────┬─────┬─────┬──────┬──────┬─────┬─────┬─────┐
        │ hdr │ usr │ ass │ tool │ usr │ ass │ tool │ tool │ ass │ tool│ cmp │
        └─────┴─────┴─────┴──────┴─────┴─────┴──────┴──────┴─────┴─────┴─────┘
               └──────────┬──────┘ └──────────────────────┬───────────────────┘
                 not sent to LLM                    sent to LLM
                                                         ↑
                                              starts from firstKeptEntryId

What the LLM sees:

  ┌────────┬─────────┬─────┬─────┬──────┬──────┬─────┬──────┐
  │ system │ summary │ usr │ ass │ tool │ tool │ ass │ tool │
  └────────┴─────────┴─────┴─────┴──────┴──────┴─────┴──────┘
       ↑         ↑      └─────────────────┬────────────────┘
    prompt   from cmp          messages from firstKeptEntryId
```

On repeated compactions, the summarized span starts at the previous compaction's kept boundary (`firstKeptEntryId`), not at the compaction entry itself, falling back to the entry after the previous compaction if that kept entry cannot be found in the path. A retain-none compaction records its own ID as `firstKeptEntryId`; repeated compaction starts after that entry. This preserves messages that survived the earlier compaction by including them in the next summarization pass as well. Pi also recalculates `tokensBefore` from the rebuilt, context-edited session projection before writing the new `CompactionEntry`, so the token count reflects the actual pre-compaction context being replaced. Omitted raw entries remain stored but do not affect cut selection, summaries, checkpoints, or token estimates.

### Overflow and Length Recovery Ordering

Recovery preserves the existing lifecycle and queue order. The completed attempt remains visible to `turn_end` and `agent_end`; post-run recovery then repairs persisted model context before a fresh retry:

```text
persist final assistant response
→ extension/public turn_end
→ extension/public agent_end
→ append context_edit omissions for the selected attempt
→ for overflow/length: run session_before_compact and append compaction on success
→ start the retry as a fresh run
```

If recovery compaction fails or is cancelled, Pi keeps the omission edits, appends no compaction, and schedules no internal retry. Existing queued work remains governed by ordinary steering and follow-up rules. `agent_before_settle` sees the repaired projection after recovery processing. Raw transcript history, exports, billing totals, and history-search extensions can still inspect the omitted attempt.

### Split user-message spans

A user-message span starts with a user message and includes all turns until the next user message. Normally, compaction cuts at user-message boundaries.

When one user-message span exceeds `keepRecentTokens`, the cut point lands within that span at an assistant message. This is a split user-message span:

```
Split user-message span (one span exceeds budget):

  entry:  0     1     2      3     4      5      6     7      8
        ┌─────┬─────┬─────┬──────┬─────┬──────┬──────┬─────┬──────┐
        │ hdr │ usr │ ass │ tool │ ass │ tool │ tool │ ass │ tool │
        └─────┴─────┴─────┴──────┴─────┴──────┴──────┴─────┴──────┘
                ↑                                     ↑
         turnStartIndex = 1                  firstKeptEntryId = 7
                │                                     │
                └──── turnPrefixMessages (1-6) ───────┘
                                                      └── kept (7-8)

  isSplitTurn = true
  messagesToSummarize = []  (no earlier user-message spans)
  turnPrefixMessages = [usr, ass, tool, ass, tool, tool]
```

For split user-message spans, Pi generates two summaries and merges them:
1. **History summary**: Previous context (if any)
2. **User-message-span prefix summary**: The early part of the split user-message span

### Cut Point Rules

Valid cut points are:
- User messages
- Assistant messages
- BashExecution messages
- Custom messages (custom_message, branch_summary)

Never cut at tool results (they must stay with their tool call).

Preparation advances the kept boundary into a context-invisible suffix only when that suffix contains an omitted assistant attempt and no unomitted context-producing entries. Recovery `context_edit` omissions satisfy this rule; intrinsically context-invisible metadata may coexist with them. Metadata alone and newly appended custom messages do not move the cut. A replacement edit affecting the candidate input or summarized prefix also blocks advancement because the omitted assistant answered the pre-edit input; replacements of suffix entries that are ultimately omitted remain safe. This allows an over-budget recovered input to be summarized while retaining the edits that keep the abandoned attempt omitted, without making bookkeeping change whether new model input is preserved verbatim.

### CompactionEntry Structure

Defined in [`session-manager.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/session-manager.ts):

```typescript
interface CompactionEntry<T = unknown> {
  type: "compaction";
  id: string;
  parentId: string | null;
  timestamp: string;
  summary: string;
  firstKeptEntryId: string;
  tokensBefore: number;
  usage?: Usage;       // LLM usage that generated the summary
  fromHook?: boolean;  // true if provided by extension (legacy field name)
  details?: T;         // implementation-specific data
}

// Default compaction uses this for details (from compaction.ts):
interface CompactionDetails {
  readFiles: string[];
  modifiedFiles: string[];
}
```

Extensions can store any JSON-serializable data in `details`. The default compaction tracks file operations, but custom extension implementations can use their own structure. Generated and extension-provided summaries store their LLM `usage` when available so session totals include summarization work.

See [`prepareCompaction()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/compaction.ts) and [`compact()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/compaction.ts) for the implementation. For direct programmatic summarization, `generateSummary()` returns the summary text and `generateSummaryWithUsage()` returns `{ text, usage }`.

## Branch Summarization

### When It Triggers

When you use `/tree` to navigate to a different branch, Pi offers to summarize the work you're leaving. This injects context from the left branch into the new branch.

### How It Works

1. **Find common ancestor**: Deepest node shared by old and new positions
2. **Collect entries**: Walk from old leaf back to common ancestor
3. **Prepare with budget**: Include messages up to token budget (newest first)
4. **Generate summary**: Call LLM with structured format
5. **Append entry**: Save `BranchSummaryEntry` at navigation point

```
Tree before navigation:

         ┌─ B ─ C ─ D (old leaf, being abandoned)
    A ───┤
         └─ E ─ F (target)

Common ancestor: A
Entries to summarize: B, C, D

After navigation with summary:

         ┌─ B ─ C ─ D
    A ───┤
         └─ E ─ F ─ [summary of B,C,D] (new leaf)
```

### Cumulative File Tracking

Default compaction and branch summarization track files cumulatively. Both extract file operations from tool calls in the messages being summarized. Compaction also carries file lists from the previous Pi-generated compaction. Branch summarization carries file lists from Pi-generated branch summaries in the entries it summarizes.

File tracking therefore accumulates across default compactions and nested default branch summaries. Pi does not automatically carry file lists from extension-generated summaries whose `fromHook` field is `true`; extensions manage their own `details` format.

### BranchSummaryEntry Structure

Defined in [`session-manager.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/session-manager.ts):

```typescript
interface BranchSummaryEntry<T = unknown> {
  type: "branch_summary";
  id: string;
  parentId: string | null;
  timestamp: string;
  summary: string;
  fromId: string;      // Entry we navigated from
  usage?: Usage;       // LLM usage that generated the summary
  fromHook?: boolean;  // true if provided by extension (legacy field name)
  details?: T;         // implementation-specific data
}

// Default branch summarization uses this for details (from branch-summarization.ts):
interface BranchSummaryDetails {
  readFiles: string[];
  modifiedFiles: string[];
}
```

Same as compaction, extensions can store custom data in `details`.

See [`collectEntriesForBranchSummary()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/branch-summarization.ts), [`prepareBranchEntries()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/branch-summarization.ts), and [`generateBranchSummary()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/branch-summarization.ts) for the implementation.

## Summary Format

Both formats include Goal, Constraints & Preferences, Progress, Key Decisions, and Next Steps. Compaction summaries also include Critical Context. Branch summaries stop after Next Steps. Pi appends file lists to either format when relevant.

Compaction summaries use this format:

```markdown
## Goal
[What the user is trying to accomplish]

## Constraints & Preferences
- [Requirements mentioned by user]

## Progress
### Done
- [x] [Completed tasks]

### In Progress
- [ ] [Current work]

### Blocked
- [Issues, if any]

## Key Decisions
- **[Decision]**: [Rationale]

## Next Steps
1. [What should happen next]

## Critical Context
- [Data needed to continue]

<read-files>
path/to/file1.ts
path/to/file2.ts
</read-files>

<modified-files>
path/to/changed.ts
</modified-files>
```

### Message Serialization

Before summarization, messages are serialized to text via [`serializeConversation()`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/compaction/utils.ts):

```
[User]: What they said
[Assistant thinking]: Internal reasoning
[Assistant]: Response text
[Assistant tool calls]: read(path="foo.ts"); edit(path="bar.ts", ...)
[Tool result]: Output from tool
```

This prevents the model from treating it as a conversation to continue.

Tool results are truncated to 2000 characters during serialization. Content beyond that limit is replaced with a marker indicating how many characters were truncated. This keeps summarization requests within reasonable token budgets, since tool results (especially from `read` and `bash`) are typically the largest contributors to context size.

## Custom Summarization via Extensions

Extensions can intercept and customize both compaction and branch summarization. See [`extensions/types.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/extensions/types.ts) for event type definitions.

### session_before_compact

Fired before auto-compaction or `/compact`. Can cancel or provide custom summary. See `SessionBeforeCompactEvent` and `CompactionPreparation` in the types file.

```typescript
pi.on("session_before_compact", async (event, ctx) => {
  const { preparation, branchEntries, customInstructions, reason, willRetry, signal } = event;

  // preparation.messagesToSummarize - messages to summarize
  // preparation.turnPrefixMessages - user-message-span prefix (if isSplitTurn)
  // preparation.previousSummary - previous compaction summary
  // preparation.fileOps - extracted file operations
  // preparation.tokensBefore - context tokens before compaction
  // preparation.firstKeptEntryId - where kept messages start
  // preparation.settings - effective settings after applying model overrides

  // branchEntries - all entries on current branch (for custom state)
  // reason - "manual" (/compact), "threshold", or "overflow"
  // willRetry - whether the aborted turn is retried after compaction (overflow recovery)
  // signal - AbortSignal (pass to LLM calls)

  // Cancel:
  return { cancel: true };

  // Custom summary:
  return {
    compaction: {
      summary: "Your summary...",
      firstKeptEntryId: preparation.firstKeptEntryId,
      tokensBefore: preparation.tokensBefore,
      // usage: summaryResponse.usage, // Optional; included in session totals
      details: { /* custom data */ },
    }
  };
});
```

#### Converting Messages to Text

To generate a summary with your own model, convert messages to text using `serializeConversation`:

```typescript
import { convertToLlm, serializeConversation } from "@earendil-works/pi-coding-agent";

pi.on("session_before_compact", async (event, ctx) => {
  const { preparation } = event;
  
  // Convert AgentMessage[] to Message[], then serialize to text
  const conversationText = serializeConversation(
    convertToLlm(preparation.messagesToSummarize)
  );
  // Returns:
  // [User]: message text
  // [Assistant thinking]: thinking content
  // [Assistant]: response text
  // [Assistant tool calls]: read(path="..."); bash(command="...")
  // [Tool result]: output text

  // Now send to your model for summarization
  const { summary, usage } = await myModel.summarize(conversationText);
  
  return {
    compaction: {
      summary,
      firstKeptEntryId: preparation.firstKeptEntryId,
      tokensBefore: preparation.tokensBefore,
      usage,
    }
  };
});
```

See [custom-compaction.ts](../examples/extensions/custom-compaction.ts) for a complete example using a different model.

### session_compact_failed

Fired when manual or automatic compaction fails or is aborted. This is useful for telemetry extensions that need to pair `session_before_compact` attempts with terminal outcomes.

```typescript
pi.on("session_compact_failed", async (event, ctx) => {
  const { reason, errorMessage, aborted, willRetry, fromExtension } = event;
  // reason - "manual" (/compact), "threshold", or "overflow"
  // errorMessage - present for non-abort failures
  // aborted - true for canceled/aborted compactions
  // willRetry - whether the aborted turn would have retried after compaction
  // fromExtension - whether extension-provided compaction content was being used
});
```

### session_before_tree

Fired before `/tree` navigation. Always fires regardless of whether user chose to summarize. Can cancel navigation or provide custom summary.

```typescript
pi.on("session_before_tree", async (event, ctx) => {
  const { preparation, signal } = event;

  // preparation.targetId - where we're navigating to
  // preparation.oldLeafId - current position (being abandoned)
  // preparation.commonAncestorId - shared ancestor
  // preparation.entriesToSummarize - entries that would be summarized
  // preparation.userWantsSummary - whether user chose to summarize

  // Cancel navigation entirely:
  return { cancel: true };

  // Provide custom summary (only used if userWantsSummary is true):
  if (preparation.userWantsSummary) {
    return {
      summary: {
        summary: "Your summary...",
        // usage: summaryResponse.usage, // Optional; included in session totals
        details: { /* custom data */ },
      }
    };
  }
});
```

See `SessionBeforeTreeEvent` and `TreePreparation` in the types file.

## Settings

Configure compaction in `~/.pi/agent/settings.json` or `<project-dir>/.pi/settings.json`:

```json
{
  "compaction": {
    "enabled": true,
    "reserveTokens": 16384,
    "keepRecentTokens": 20000
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable auto-compaction |
| `reserveTokens` | `16384` | Tokens to reserve for LLM response |
| `keepRecentTokens` | `20000` | Recent tokens to keep (not summarized) |

Disable auto-compaction with `"enabled": false`. You can still compact manually with `/compact`.

### Per-model overrides

Use `compaction.modelOverrides` to tune token budgets for different models:

```json
{
  "compaction": {
    "reserveTokens": 16384,
    "keepRecentTokens": 20000,
    "modelOverrides": {
      "some-provider/big-model": {
        "reserveTokens": 400000
      }
    }
  }
}
```

For a model with a 1M context window, this override triggers compaction above 600K tokens and keeps the ordinary 20000 recent tokens. Other models retain the ordinary 16384-token reserve. `reserveTokens` also influences summarization output limits, capped by the model's maximum output tokens; it is not solely a trigger threshold.

Keys are exact, case-sensitive `provider/modelId` values, including any slashes within the model ID. Each `reserveTokens` and `keepRecentTokens` value falls back independently from the model override to the ordinary setting to the built-in default. Values must be non-negative safe integers. Invalid values in the matching model override produce an error when read; only omitted fields fall back to the ordinary setting. Model override entries must be objects. Invalid ordinary token settings produce an error when read, even if the active model has a valid override. Only omitted ordinary values use built-in defaults. `enabled` remains global, not model-specific.

These resolved values are used for manual compaction, all automatic threshold checks, overflow recovery, and extension-visible `preparation.settings`. Model switches affect subsequent checks and compactions without changing ordinary settings. Compaction already in progress uses the model and settings captured for that operation. Branch summarization settings are unaffected.

Overrides work in both global and project settings. The files merge recursively before lookup, so a global model-specific value beats a project-wide fallback; a project must override that model entry to change it. See [Settings](settings.md#per-model-compaction-overrides) for details.


<!-- file: packages/coding-agent/docs/security.md -->

# Run Pi safely

Treat model-generated commands and code as untrusted. Pi can read, change, and execute files with the permissions of the account that started it, and it does not ask for approval before every tool call. Extensions, package installers, language servers, and other child processes run with those same permissions unless an operating-system or virtualization boundary restricts them.

Files, comments, instructions, command output, and model responses can steer the model through prompt injection. Project trust controls which project resources load at startup, but it does not make that content or the resulting actions safe.

Safety comes from limiting the files, credentials, processes, and network services Pi can access and affect if a generated action is wrong or hostile. Watching the transcript, using project trust, and reviewing changes do not create a security boundary.

## Choose how to run Pi

Different ways of running Pi place different limits on what generated commands can access:

| How Pi runs | What remains protected |
|---|---|
| Directly, with the permissions of its operating-system user | Anything that user cannot access. A dedicated user account can narrow those permissions, but Pi still shares the operating system and network with other users. |
| Entirely inside a container, virtual machine, or sandbox | Host files and processes that you do not expose to the environment. Credentials and network services remain accessible if you make them available inside it. This is usually the strongest practical option. |
| Outside the isolated environment, with only its built-in tools running inside | Host resources are protected from actions performed through those tools. Pi itself and other extensions remain outside the boundary, so this is a narrower form of isolation. |

The working folder controls resource discovery and the default location for tools, but it does not prevent commands from accessing other paths available to the Pi process.

Whichever option you choose, only provide the files and services required for the task. Keep credentials outside the environment where possible, or use narrowly scoped, short-lived credentials. Restrict network access when commands do not need it.

For setup instructions and the limitations of each isolation method, see [Run Pi in an isolated environment](containerization.md).

<a id="project-trust"></a>

## Understand project trust

Project trust controls whether Pi loads most settings and resources supplied by a working folder. It prevents a folder from silently loading executable extensions before you approve it.

Project trust is not a complete startup boundary. Pi reads the project `sessionDir` setting while selecting or creating a session, before it resolves project trust. Declining trust prevents the remaining project settings and protected resources from loading, but it cannot undo that initial session-directory lookup.

Project trust does not limit what tool calls can access or affect. After Pi starts, enabled tools still use the operating-system permissions of the Pi process. Instructions and other content in the folder can also influence the model.

### Resources protected by project trust

Pi requires a project-trust decision when it finds any of these resources from the current working directory:

- `.pi/settings.json`
- `.pi/mcp.json`
- `.pi/extensions`, `.pi/skills`, `.pi/prompts`, or `.pi/themes`
- `.pi/SYSTEM.md` or `.pi/APPEND_SYSTEM.md`
- project `.agents/skills` in the current directory or an ancestor directory

A bare `.pi` directory does not require project trust.

Granting project trust allows Pi to load:

- project settings
- project MCP servers from `.pi/mcp.json`
- extensions, skills, prompt templates, themes, and system-prompt files under `.pi`
- missing packages configured through project settings
- project-local and project-package extensions

Declining project trust skips those protected resources, except for the initial `sessionDir` lookup described above.

Context files such as `AGENTS.override.md`, `AGENTS.md`, and `CLAUDE.md` load regardless of project trust unless you disable context loading. Treat instructions in a folder as untrusted input even when you decline project trust.

### How Pi chooses a trust decision

A command-line `--approve` or `--no-approve` override applies first. When protected resources exist and there is no command-line override:

1. User-level and command-line extensions can handle the `project_trust` event. The first extension that returns yes or no owns the decision.
2. If no extension decides, Pi looks for a saved decision for the current directory or one of its parents. The closest decision applies.
3. If no saved decision applies, Pi follows the global `defaultProjectTrust` setting, whose default is `"ask"`.

Saved decisions use canonical directory paths and live in:

```text
~/.pi/agent/trust.json
```

Use `/trust` to save a decision for future Pi processes.

### Project trust without an interactive prompt

Print, JSON, and RPC modes cannot show the built-in trust prompt. If no command-line override, extension, or saved decision applies:

- `defaultProjectTrust: "always"` loads protected project resources.
- `defaultProjectTrust: "ask"` or `"never"` skips them.

Use `--approve` or `--no-approve` when an automated run needs an explicit one-time decision.

## Reduce impact and improve recovery

These practices do not replace isolation, but they reduce exposure or make recovery easier:

- Give Pi access only to files and services required for the task.
- Use snapshots, backups, or version control before substantial changes.
- Review extensions and packages before loading them. Extensions execute inside the Pi process.
- Prefer narrowly scoped, short-lived credentials.
- Review diffs and generated output before applying results to another system.
- Review sessions before exporting or sharing them. They can contain prompts, tool arguments, command output, file contents, and credentials exposed during the conversation.

## Report a security issue

Follow the repository [Security Policy](https://github.com/earendil-works/pi/blob/main/SECURITY.md). Do not open a public issue for a security-sensitive report.

Expected local-agent behavior, prompt injection from untrusted content, lack of a built-in sandbox, and behavior from user-installed extensions or skills are generally outside the security boundary unless the report demonstrates a privilege-boundary bypass or access that the local user did not already have.


<!-- file: packages/agent/README.md -->

# @earendil-works/pi-agent-core

Stateful agent with tool execution and event streaming. Built on `@earendil-works/pi-ai`.

## Installation

```bash
npm install @earendil-works/pi-agent-core
```

## Quick Start

```typescript
import { Agent } from "@earendil-works/pi-agent-core";
import { createModels } from "@earendil-works/pi-ai";
import { anthropicProvider } from "@earendil-works/pi-ai/providers/anthropic";

const models = createModels();
models.setProvider(anthropicProvider());
const model = models.getModel("anthropic", "claude-sonnet-4-6");
if (!model) throw new Error("Model not found");

const agent = new Agent({
  initialState: {
    systemPrompt: "You are a helpful assistant.",
    model,
  },
  streamFn: models.streamSimple.bind(models),
});

agent.subscribe((event) => {
  if (event.type === "message_update" && event.assistantMessageEvent.type === "text_delta") {
    // Stream just the new text chunk
    process.stdout.write(event.assistantMessageEvent.delta);
  }
});

await agent.prompt("Hello!");
```

## Core Concepts

### AgentMessage vs LLM Message

The agent works with `AgentMessage`, a flexible type that can include:
- Standard LLM messages (`user`, `assistant`, `toolResult`)
- Custom app-specific message types via declaration merging

LLMs only understand `user`, `assistant`, and `toolResult`. The `convertToLlm` function bridges this gap by filtering and transforming messages before each LLM call.

### Message Flow

```
AgentMessage[] → transformContext() → AgentMessage[] → convertToLlm() → Message[] → LLM
                    (optional)                           (required)
```

1. **transformContext**: Prune old messages, inject external context
2. **convertToLlm**: Filter out UI-only messages, convert custom types to LLM format

## Event Flow

The agent emits events for UI updates. Understanding the event sequence helps build responsive interfaces.

### prompt() Event Sequence

When you call `prompt("Hello")`:

```
prompt("Hello")
├─ agent_start
├─ turn_start
├─ message_start   { message: userMessage }      // Your prompt
├─ message_end     { message: userMessage }
├─ message_start   { message: assistantMessage } // LLM starts responding
├─ message_update  { message: partial... }       // Streaming chunks
├─ message_update  { message: partial... }
├─ message_end     { message: assistantMessage } // Complete response
├─ turn_end        { message, toolResults: [] }
└─ agent_end       { messages: [...] }
```

### With Tool Calls

If the assistant calls tools, the loop continues:

```
prompt("Read config.json")
├─ agent_start
├─ turn_start
├─ message_start/end  { userMessage }
├─ message_start      { assistantMessage with toolCall }
├─ message_update...
├─ message_end        { assistantMessage }
├─ tool_execution_start  { toolCallId, toolName, args }
├─ tool_execution_update { partialResult }           // If tool streams
├─ tool_execution_end    { toolCallId, result }
├─ message_start/end  { toolResultMessage }
├─ turn_end           { message, toolResults: [toolResult] }
│
├─ turn_start                                        // Next turn
├─ message_start      { assistantMessage }           // LLM responds to tool result
├─ message_update...
├─ message_end
├─ turn_end
└─ agent_end
```

Tool execution mode is configurable:

- `parallel` (default): preflight tool calls sequentially, execute allowed tools concurrently, emit `tool_execution_end` as soon as each tool is finalized, then emit toolResult messages and `turn_end.toolResults` in assistant source order
- `sequential`: execute tool calls one by one, matching the historical behavior

In parallel mode, tool completion events follow tool completion order, but persisted toolResult messages still follow assistant source order.

The mode can be set globally via `toolExecution` in the agent config, or per-tool via `executionMode` on `AgentTool`. If any tool call in a batch targets a tool with `executionMode: "sequential"`, the entire batch executes sequentially regardless of the global setting.

The `beforeToolCall` hook runs after `tool_execution_start` and validated argument parsing. It can block execution and attach `terminate: true` to the blocked result. The `afterToolCall` hook runs after tool execution finishes and before `tool_execution_end` and final tool result message events are emitted.

Tools, blocked `beforeToolCall` results, and `afterToolCall` overrides can return `terminate: true` to hint that the automatic follow-up LLM call should be skipped. The loop only stops early when every finalized tool result in that batch sets `terminate: true`. Mixed batches continue normally.

When you use the `Agent` class, assistant `message_end` processing is treated as a barrier before tool preflight begins. That means `beforeToolCall` sees agent state that already includes the assistant message that requested the tool call.

### Request preparation and turn finalization

`prepareRequest` runs immediately before every conversational provider request, including the first. Use it to install canonical persisted context after pending input has been emitted:

```typescript
agent.prepareRequest = async ({ context }) => ({
  context: { ...context, messages: await session.loadModelContext() },
});
```

`prepareRequest` does not poll queues. Steering queued while it runs waits for the next normal steering poll.

`finishTurn` runs after the assistant and all tool results are finalized, but before `turn_end`. It runs for normal, error, and aborted responses:

```typescript
agent.finishTurn = async ({ message }) => {
  if (message.stopReason === "error" || message.stopReason === "aborted") return;
  if (shouldEndRun(message)) return { action: "end" };
  return needsAnotherResponse(message) ? { action: "continue" } : undefined;
};
```

Returning `undefined` preserves normal scheduling. `{ action: "end" }` stops immediately after `turn_end`, before polling steering or follow-up queues or preparing another request. On a normal response, `{ action: "continue" }` ensures one next provider request. If tool results, steering, or a follow-up already cause that request, they satisfy the decision and no additional request is made; otherwise the loop makes one context-only request. Error and aborted responses remain hard exits, so their decisions are ignored. `finishTurn` runs again after the next request, so returning `{ action: "continue" }` unconditionally creates an endless loop.

To migrate from the removed `shouldStopAfterTurn`, return `{ action: "end" }`. Guard error and aborted responses to preserve the old hook's normal-response-only invocation, especially when the predicate has side effects or assumes a successful response:

```typescript
finishTurn: async (turn, signal) => {
  if (turn.message.stopReason === "error" || turn.message.stopReason === "aborted") return;
  return (await shouldStop(turn, signal)) ? { action: "end" } : undefined;
},
```

Each provider turn follows this lifecycle:

```text
selected input events
→ prepareRequest
→ provider response
→ tool results
→ finishTurn
→ turn_end
→ existing continuation scheduling or agent_end
```

### continue() and queued input

`continue()` retains its existing queue behavior. Empty and system-only transcripts reject without consuming queues. A non-assistant tail continues from existing context: steering is polled at startup, while follow-up input waits until the response naturally stops.

```typescript
agent.followUp({ role: "user", content: "After the retry", timestamp: Date.now() });
await agent.continue(); // The first request retries the existing user/toolResult tail.
```

An assistant tail cannot be sent directly, so `continue()` falls back to one queued steering batch, then one queued follow-up batch. Queue mode still controls whether that selected batch contains one message or all messages:

```typescript
agent.steer({ role: "user", content: "Continue from here", timestamp: Date.now() });
await agent.continue(); // Uses the queued message only because the tail is assistant.
```

### Event Types

| Event | Description |
|-------|-------------|
| `agent_start` | Agent begins processing |
| `agent_end` | Final event for the run. Awaited subscribers for this event still count toward settlement |
| `turn_start` | New turn begins (one LLM call + tool executions) |
| `turn_end` | Turn completes with assistant message and tool results |
| `message_start` | Any message begins (user, assistant, toolResult) |
| `message_update` | **Assistant only.** Includes `assistantMessageEvent` with delta |
| `message_end` | Message completes |
| `tool_execution_start` | Tool begins |
| `tool_execution_update` | Tool streams progress |
| `tool_execution_end` | Tool completes |

`Agent.subscribe()` listeners are awaited in registration order. `agent_end` means no more loop events will be emitted, but `await agent.waitForIdle()` and `await agent.prompt(...)` only settle after awaited `agent_end` listeners finish.

## Agent Options

```typescript
const agent = new Agent({
  // Initial state. systemPrompt and tools become the leading system message
  // unless messages already starts with one.
  initialState: {
    systemPrompt: string,
    model: Model<any>,
    thinkingLevel: "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max",
    tools: AgentTool<any>[],
    messages: AgentMessage[],
  },

  // Convert AgentMessage[] to LLM Message[] (required for custom message types)
  convertToLlm: (messages) => messages.filter(...),

  // Transform context before convertToLlm (for pruning, compaction)
  transformContext: async (messages, signal) => pruneOldMessages(messages),

  // Steering mode: "one-at-a-time" (default) or "all"
  steeringMode: "one-at-a-time",

  // Follow-up mode: "one-at-a-time" (default) or "all"
  followUpMode: "one-at-a-time",

  // Required stream function. Receives a TranscriptContext: the prompt and tools
  // are in the transcript's system messages, not on the context.
  streamFn: models.streamSimple.bind(models),

  // Session ID for provider caching
  sessionId: "session-123",

  // Dynamic API key resolution (for expiring OAuth tokens)
  getApiKey: async (provider) => refreshToken(),

  // Tool execution mode: "parallel" (default) or "sequential"
  toolExecution: "parallel",

  // Preflight each tool call after args are validated. Can block execution.
  beforeToolCall: async ({ toolCall, args, context }) => {
    if (toolCall.name === "bash") {
      return { block: true, reason: "bash is disabled", terminate: true };
    }
  },

  // Postprocess each tool result before final tool events are emitted.
  afterToolCall: async ({ toolCall, result, isError, context }) => {
    if (toolCall.name === "notify_done" && !isError) {
      return { terminate: true };
    }
    if (!isError) {
      return { details: { ...result.details, audited: true } };
    }
  },

  // Rebuild finalized context immediately before every provider request.
  prepareRequest: async ({ context }, signal) => {
    return { context: { ...context, messages: await loadCanonicalMessages(signal) } };
  },

  // Finalize a completed turn before turn_end is emitted.
  // `continue` ensures one next request; existing tool/queue scheduling can satisfy it.
  // `end` ends this run after turn_end without polling queues.
  finishTurn: async ({ message, toolResults }, signal) => {
    return shouldContinue(message, toolResults) ? { action: "continue" } : undefined;
  },

  // Custom thinking budgets for token-based providers
  thinkingBudgets: {
    minimal: 128,
    low: 512,
    medium: 1024,
    high: 2048,
  },
});
```

## Agent State

```typescript
interface AgentState {
  model: Model<any>;
  thinkingLevel: ThinkingLevel;
  tools: AgentTool<any>[];
  messages: AgentMessage[];
  readonly isStreaming: boolean;
  readonly streamingMessage?: AgentMessage;
  readonly pendingToolCalls: ReadonlySet<string>;
  readonly errorMessage?: string;
}
```

Access state via `agent.state`.

Assigning `agent.state.tools = [...]` or `agent.state.messages = [...]` copies the top-level array before storing it. Mutating the returned array mutates the current agent state.

The transcript owns the system prompt and tool declarations: the leading system message is the prompt, later system messages patch it (see `SystemMessage` in pi-ai). `agent.state.systemPrompt` is read-only and replays the transcript. `agent.state.tools` is the executable loadout; before every request the loop diffs it against the tools the transcript declares and, if they differ, announces the change in a system message (merged into a pending system message when one exists). pi-ai's `getCurrentSystemMessage(messages)` returns the replayed head, including declared tools, for any message array, including agent transcripts with custom message roles.

To change the prompt mid-conversation, append a system message with `content` (added instructions) or `sections` (named replacements):

```typescript
await agent.prompt([
  { role: "system", content: "", sections: { skills: "<skills>...</skills>" }, timestamp: Date.now() },
  { role: "user", content: "Continue", timestamp: Date.now() },
]);
```

During streaming, `agent.state.streamingMessage` contains the current partial assistant message.

`agent.state.isStreaming` remains `true` until the run fully settles, including awaited `agent_end` subscribers.

## Methods

### Prompting

```typescript
// Text prompt
await agent.prompt("Hello");

// With images
await agent.prompt("What's in this image?", [
  { type: "image", data: base64Data, mimeType: "image/jpeg" }
]);

// AgentMessage directly
await agent.prompt({ role: "user", content: "Hello", timestamp: Date.now() });

// Continue existing non-assistant input; an assistant tail may use queued input as fallback
await agent.continue();
```

### State Management

```typescript
agent.state.model = getModel("openai", "gpt-4o");
agent.state.thinkingLevel = "medium";
agent.state.tools = [myTool];
agent.toolExecution = "sequential";
agent.beforeToolCall = async ({ toolCall }) => undefined;
agent.afterToolCall = async ({ toolCall, result }) => undefined;
agent.prepareRequest = async ({ context }) => ({
  context: { ...context, messages: await loadCanonicalMessages() },
});
agent.finishTurn = async () => undefined;
agent.state.messages = newMessages; // top-level array is copied
agent.state.messages.push(message);
const nextQueuedMessages = agent.peekQueuedMessages(); // respects queue modes; does not consume
agent.reset();
```

### Session and Thinking Budgets

```typescript
agent.sessionId = "session-123";

agent.thinkingBudgets = {
  minimal: 128,
  low: 512,
  medium: 1024,
  high: 2048,
};
```

### Control

```typescript
agent.abort();           // Cancel current operation
await agent.waitForIdle(); // Wait for completion
```

### Events

```typescript
const unsubscribe = agent.subscribe(async (event, signal) => {
  if (event.type === "agent_end") {
    // Final barrier work for the run
    await flushSessionState(signal);
  }
});
unsubscribe();
```

## Steering and Follow-up

Steering messages let you interrupt the agent while tools are running. Follow-up messages let you queue work after the agent would otherwise stop.

```typescript
agent.steeringMode = "one-at-a-time";
agent.followUpMode = "one-at-a-time";

// While agent is running tools
agent.steer({
  role: "user",
  content: "Stop! Do this instead.",
  timestamp: Date.now(),
});

// After the agent finishes its current work
agent.followUp({
  role: "user",
  content: "Also summarize the result.",
  timestamp: Date.now(),
});

const steeringMode = agent.steeringMode;
const followUpMode = agent.followUpMode;

agent.clearSteeringQueue();
agent.clearFollowUpQueue();
agent.clearAllQueues();
```

Use clearSteeringQueue, clearFollowUpQueue, or clearAllQueues to drop queued messages.

When steering messages are detected after a turn completes:
1. All tool calls from the current assistant message have already finished
2. Steering messages are injected
3. The LLM responds on the next turn

Follow-up messages are checked only when there are no more tool calls and no steering messages. If any are queued, they are injected and another turn runs.

## Custom Message Types

Extend `AgentMessage` via declaration merging:

```typescript
declare module "@earendil-works/pi-agent-core" {
  interface CustomAgentMessages {
    notification: { role: "notification"; text: string; timestamp: number };
  }
}

// Now valid
const msg: AgentMessage = { role: "notification", text: "Info", timestamp: Date.now() };
```

Handle custom types in `convertToLlm`:

```typescript
const agent = new Agent({
  streamFn: models.streamSimple.bind(models),
  convertToLlm: (messages) => messages.flatMap(m => {
    if (m.role === "notification") return []; // Filter out
    return [m];
  }),
});
```

## Tools

Define tools using `AgentTool`:

```typescript
import { Type } from "typebox";

const readFileTool: AgentTool = {
  name: "read_file",
  label: "Read File",  // For UI display
  description: "Read a file's contents",
  parameters: Type.Object({
    path: Type.String({ description: "File path" }),
  }),
  // Override execution mode for this tool (optional).
  // "sequential" forces the entire batch to run one at a time.
  // "parallel" allows concurrent execution with other tool calls.
  // If omitted, the global toolExecution config applies.
  executionMode: "sequential",
  execute: async (toolCallId, params, signal, onUpdate) => {
    const content = await fs.readFile(params.path, "utf-8");

    // Optional: stream progress
    onUpdate?.({ content: [{ type: "text", text: "Reading..." }], details: {} });

    // Optional: add `terminate: true` here to skip the automatic follow-up LLM call
    // when every finalized tool result in the batch does the same.
    return {
      content: [{ type: "text", text: content }],
      details: { path: params.path, size: content.length },
    };
  },
};

agent.state.tools = [readFileTool];
```

### Error Handling

**Throw an error** when a tool fails. Do not return error messages as content.

```typescript
execute: async (toolCallId, params, signal, onUpdate) => {
  if (!fs.existsSync(params.path)) {
    throw new Error(`File not found: ${params.path}`);
  }
  // Return content only on success
  return { content: [{ type: "text", text: "..." }] };
}
```

Thrown errors are caught by the agent and reported to the LLM as tool errors with `isError: true`.

Return `terminate: true` from `execute()`, a blocked `beforeToolCall`, or `afterToolCall` to hint that the agent should stop after the current tool batch. This only takes effect when every finalized tool result in the batch is terminating. The hint is runtime-only; emitted `toolResult` transcript messages remain standard LLM tool results.

### MCP and Codemode

`@earendil-works/pi-mcp` connects to MCP servers and `@earendil-works/pi-codemode` runs model-written JavaScript that calls tools. [examples/mcp-codemode](examples/mcp-codemode) wraps both as `AgentTool`s: one tool per MCP tool, and a `codemode` tool whose scripts call the agent's tools through `runToolCall()`, so `beforeToolCall` and `afterToolCall` apply to those calls too.

## Proxy Usage

For browser apps that proxy through a backend:

```typescript
import { Agent, streamProxy } from "@earendil-works/pi-agent-core";

const agent = new Agent({
  streamFn: (model, context, options) =>
    streamProxy(model, context, {
      ...options,
      authToken: "...",
      proxyUrl: "https://your-server.com",
    }),
});
```

## Low-Level API

For direct control without the Agent class:

```typescript
import { agentLoop, agentLoopContinue } from "@earendil-works/pi-agent-core";

const context: AgentContext = {
  messages: [{ role: "system", content: "You are helpful.", timestamp: Date.now() }],
  tools: [],
};

const config: AgentLoopConfig = {
  model: getModel("openai", "gpt-4o"),
  convertToLlm: (msgs) => msgs.filter(m => ["user", "assistant", "toolResult"].includes(m.role)),
  toolExecution: "parallel",  // overridden by per-tool executionMode if set
  beforeToolCall: async ({ toolCall, args, context }) => undefined,
  afterToolCall: async ({ toolCall, result, isError, context }) => undefined,
};

const userMessage = { role: "user", content: "Hello", timestamp: Date.now() };

const streamFn = models.streamSimple.bind(models);
for await (const event of agentLoop([userMessage], context, config, undefined, streamFn)) {
  console.log(event.type);
}

// Continue from existing context
for await (const event of agentLoopContinue(context, config, undefined, streamFn)) {
  console.log(event.type);
}
```

These low-level streams are observational. They preserve event order, but they do not wait for your async event handling to settle before later producer phases continue. If you need message processing to act as a barrier before tool preflight, use the `Agent` class instead of raw `agentLoop()` or `agentLoopContinue()`.

## License

MIT


<!-- file: packages/ai/README.md (1~105행만 수집) -->

# @earendil-works/pi-ai

Unified LLM API with provider collections, automatic auth resolution, token and cost tracking, and simple context persistence and hand-off to other models mid-session.

**Note**: The chat catalog only includes models that support tool calling (function calling), as this is essential for agentic workflows. Image and classifier catalogs use their operation-specific capabilities.

## Table of Contents

- [Supported Providers](#supported-providers)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Providers and Models](#providers-and-models)
  - [Provider Factories](#provider-factories)
  - [All Built-in Providers](#all-built-in-providers)
  - [Querying Models](#querying-models)
  - [Static Catalog Reads](#static-catalog-reads)
  - [Dynamic Providers](#dynamic-providers)
- [Auth](#auth)
  - [How Auth Resolves](#how-auth-resolves)
  - [Transforming Request Headers](#transforming-request-headers)
  - [Credential Store](#credential-store)
  - [Environment Variables](#environment-variables)
- [Tools](#tools)
  - [Defining Tools](#defining-tools)
  - [Handling Tool Calls](#handling-tool-calls)
  - [Streaming Tool Calls with Partial JSON](#streaming-tool-calls-with-partial-json)
  - [Validating Tool Arguments](#validating-tool-arguments)
  - [Complete Event Reference](#complete-event-reference)
  - [Compact Assistant Message Frames](#compact-assistant-message-frames)
- [Image Input](#image-input)
- [Image Generation](#image-generation)
- [Classification](#classification)
- [Thinking/Reasoning](#thinkingreasoning)
  - [Unified Interface](#unified-interface-streamsimplecompletesimple)
  - [Provider-Specific Options](#provider-specific-options-streamcomplete)
  - [Streaming Thinking Content](#streaming-thinking-content)
- [Stop Reasons](#stop-reasons)
- [Error Handling](#error-handling)
  - [Aborting Requests](#aborting-requests)
  - [Continuing After Abort](#continuing-after-abort)
  - [Debugging Provider Payloads](#debugging-provider-payloads)
  - [Observing Provider Stream Events](#observing-provider-stream-events)
- [Custom Providers](#custom-providers)
  - [createProvider()](#createprovider)
  - [Calling API Implementations Directly](#calling-api-implementations-directly)
  - [OpenAI Compatibility Settings](#openai-compatibility-settings)
- [Faux Provider for Tests](#faux-provider-for-tests)
- [Cross-Provider Handoffs](#cross-provider-handoffs)
- [System Messages](#system-messages)
- [Context Serialization](#context-serialization)
- [Browser Usage](#browser-usage)
- [Bundling and Tree Shaking](#bundling-and-tree-shaking)
- [OAuth Providers](#oauth-providers)
  - [Vertex AI](#vertex-ai)
  - [CLI Login](#cli-login)
  - [Programmatic OAuth](#programmatic-oauth)
- [Migrating from the Old Global API](#migrating-from-the-old-global-api)
- [Development](#development)
- [License](#license)

## Supported Providers

- **OpenAI**
- **Ant Ling**
- **Azure OpenAI (Responses)**
- **OpenAI Codex (legacy)** (ChatGPT Plus/Pro subscription, requires OAuth, see below)
- **Radius** (API key or OAuth, with a dynamically refreshed gateway catalog)
- **TypeSafe** (System One classifier API)
- **DeepSeek**
- **NVIDIA NIM**
- **Anthropic**
- **Google**
- **Vertex AI** (Gemini via Vertex AI)
- **Mistral**
- **Groq**
- **Cerebras**
- **Cloudflare AI Gateway**
- **Cloudflare Workers AI**
- **xAI**
- **OpenRouter**
- **Vercel AI Gateway**
- **ZAI Coding Plan (Global)** (with separate China provider)
- **MiniMax** (with separate China provider)
- **Together AI**
- **Baseten**
- **Hugging Face**
- **Moonshot AI** (with separate China provider)
- **GitHub Copilot** (requires OAuth, see below)
- **Amazon Bedrock**
- **OpenCode Zen**
- **OpenCode Go**
- **Fireworks** (uses OpenAI- and Anthropic-compatible APIs)
- **Kimi For Coding** (Moonshot AI subscription endpoint, uses Anthropic-compatible API)
- **Meta** (Model API, uses OpenAI Responses-compatible API)
- **Qwen Token Plan** (separate Individual and existing catalogs, with a separate China provider)
- **Xiaomi MiMo** (defaults to API billing endpoint, with separate Token Plan providers for `cn`/`ams`/`sgp` regions)
- **Any OpenAI-compatible API**: Ollama, vLLM, LM Studio, etc.

## Installation

```bash
npm install @earendil-works/pi-ai
```

TypeBox exports are re-exported from `@earendil-works/pi-ai`: `Type`, `Static`, and `TSchema`.
