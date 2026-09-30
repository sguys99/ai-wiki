---
title: "OpenResearch (alphaXiv/OpenResearch, GitHub repo)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/alphaxiv-openresearch.md
raw_filename: "alphaxiv-openresearch.md"
source_collection: external
org: "alphaXiv"
repo: "OpenResearch"
url: "https://github.com/alphaXiv/OpenResearch"
license: "MIT"
tags: []
---

> 수집 메모 — 사용자의 명시적 URL 지시에 따라 `raw.githubusercontent.com/alphaXiv/OpenResearch/main/README.md` 를 그대로 받아 저장했다 (CLAUDE.md rule #1 의 자료 수집 예외). 본문은 원문 그대로이며 요약, 번역, 윤문하지 않았다. 수집 시각 2026-09-30. GitHub API 기준 저장소 description은 "Turn your coding agents into research agents", homepage `https://openresearch.sh/`, default branch `main`, license MIT, 생성일 2026-06-07, 최종 push 2026-09-30, star 6065. 최상위 구성은 `AGENTS.md`, `CLAUDE.md`, `Cargo.toml`, `README.md`, `SKILL.md`, `SYSTEM_PROMPT.md`, `agent-skills/`, `build.rs`, `demo/`, `docs/`, `linux/`, `macos/`, `release-notes/`, `scripts/`, `src/`, `tests/`, `ui/`, `windows/` 이다. `agent-skills/` 에는 orx-agent-delegation, orx-compute, orx-create, orx-customize, orx-evidence, orx-experiment-tree, orx-feedback, orx-figures, orx-git, orx-instances, orx-lit-review, orx-paper, orx-reports 13개 모듈이 있다. README 본문 아래에 루트 `SKILL.md`, 루트 `SYSTEM_PROMPT.md`, `agent-skills/orx-experiment-tree/SKILL.md` 전문을 부록으로 함께 수집했다.

---

<div align="center">

<h1><img src=".github/readme-assets/openresearch.svg" alt="" width="36" /> OpenResearch</h1>

**The local-first workspace for research agents and autoresearch.**

<p>Turn <img src=".github/readme-assets/claude.svg" alt="" width="16" height="16" align="texttop" /> Claude Code,
<img src=".github/readme-assets/codex.svg" alt="" width="16" height="16" align="texttop" /> Codex,
<img src=".github/readme-assets/opencode.svg" alt="" width="16" height="16" align="texttop" /> OpenCode,
<img src=".github/readme-assets/cursor.svg" alt="" width="16" height="16" align="texttop" /> Cursor, or Google Antigravity into research agents that can review
literature, develop hypotheses, run experiments, and produce research artifacts.</p>

<p>
<a href="https://github.com/alphaXiv/OpenResearch/releases/latest/download/OpenResearch.dmg"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/readme-assets/download-macos-dark.svg"><img src=".github/readme-assets/download-macos.svg" alt="Download OpenResearch for macOS" width="220" height="44" /></picture></a>
<a href="https://github.com/alphaXiv/OpenResearch/releases/latest/download/OpenResearch-Setup.exe"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/readme-assets/download-windows-dark.svg"><img src=".github/readme-assets/download-windows.svg" alt="Download OpenResearch for Windows (Beta)" width="220" height="44" /></picture></a>
<a href="https://github.com/alphaXiv/OpenResearch/releases/latest/download/OpenResearch-x86_64.AppImage"><picture><source media="(prefers-color-scheme: dark)" srcset=".github/readme-assets/download-linux-dark.svg"><img src=".github/readme-assets/download-linux.svg" alt="Download OpenResearch for Linux" width="220" height="44" /></picture></a>
</p>

<p>
<a href="https://openresearch.sh/docs"><img src=".github/readme-assets/action-documentation.svg" alt="Documentation" width="132" height="24" /></a><img src=".github/readme-assets/action-separator.svg" alt=" · " width="12" height="24" />
<a href="https://github.com/alphaXiv/OpenResearch/releases"><img src=".github/readme-assets/action-releases.svg" alt="Releases" width="78" height="24" /></a>
</p>

<p><sub>macOS 11+ · Windows beta requires <a href="docs/windows.md">Git for Windows</a> · Linux app needs glibc 2.35+</sub></p>

<p><a href="https://trendshift.io/repositories/89363"><img src="https://trendshift.io/api/badge/repositories/89363" alt="GitHub Trending: #1 Repository of the Day" width="250" height="55" /></a>
<a href="https://trendshift.io/repositories/89363?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-89363" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/89363/daily?language=Rust" alt="alphaXiv/OpenResearch | Trendshift" width="250" height="55" /></a></p>

</div>

## Get started

Install the CLI on macOS or Linux, then launch OpenResearch:

```sh
curl -LsSf https://openresearch.sh/install.sh | sh
orx up
```

`orx up` opens the local dashboard at `http://127.0.0.1:4791`.

On a managed Mac (for example, a work computer), use the macOS download above
instead. Device-management policies may block the CLI that `install.sh`
installs because it is not yet signed. The app is signed with a Developer ID
and notarized by Apple. To use `orx` in your terminal, click **Install** under
**Install the `orx` command** in the app's Settings → Updates, or run (adjusting
the path if the app is not in `/Applications`):

```sh
/Applications/OpenResearch.app/Contents/MacOS/orx install-cli
```

Either way, `orx` is linked into `~/.local/bin`, with a hint to add it to your
`PATH` if needed. If you already ran `install.sh`, remove `~/.cargo/bin/orx`
first and open a new terminal.

On Windows, use the beta download above after installing
[Git for Windows](docs/windows.md). It installs for your account, with no
administrator prompt. The installer isn't signed yet, so Windows may say
"Windows protected your PC": choose **More info** → **Run anyway**.

On Linux, the desktop app is an AppImage for
[x86_64](https://github.com/alphaXiv/OpenResearch/releases/latest/download/OpenResearch-x86_64.AppImage)
or [ARM64](https://github.com/alphaXiv/OpenResearch/releases/latest/download/OpenResearch-aarch64.AppImage).
Keep it somewhere you can write to, such as `~/Applications`, so it can update
itself, then change to that directory, run `chmod +x OpenResearch-*.AppImage`, and open it. See
[Linux](docs/linux.md) for requirements.

[Connect a local model](docs/local-models.md) to use LM Studio, oMLX, Ollama,
or a custom endpoint with OpenCode.

Create an account at [openresearch.sh](https://openresearch.sh) to receive email
updates and use managed OpenResearch compute.

## Built for research agents

| | OpenResearch gives you |
|---|---|
| **Parallel exploration** | Give each research direction an independent agent session and isolated git worktree. |
| **Reproducible experiments** | Track variants in a git-native experiment tree; every run receives an immutable archive of its recorded commit. |
| **Evidence in context** | Keep logs, diffs, files, results, and artifacts tied to the work that produced them. |
| **Your choice of agent** | Use Claude Code, Codex, OpenCode, Cursor, or Google Antigravity, with the harness and model selected per session. |
| **Your choice of compute** | Run locally, on your own infrastructure, or with managed OpenResearch compute. |
| **Local ownership** | Keep projects, conversations, experiments, runs, logs, code, and artifacts on your machine. |

### Autoresearch

OpenResearch can run the full loop autonomously: propose an idea, change the
code, launch an experiment, inspect the evidence, and decide what to try next.
Multiple agents can explore different directions in parallel while the
experiment tree preserves their lineage.

## Run anywhere

The same committed source snapshot can run locally, over SSH, or on Slurm,
Kubernetes, Ray, Hugging Face Jobs, Modal, Tinker, and managed OpenResearch compute.
Publishing the repository is not required.

Run the workspace next to remote GPUs while using the browser on your laptop:

```sh
orx up --remote user@host
```

SSH config aliases and custom ports are supported. The remote service binds to
loopback and has no application-level authentication, so other users on that
host can reach it.

## CLI and agent integration

Install the OpenResearch skill into supported coding agents:

```sh
orx install-skills
```

Common commands:

```sh
orx projects
orx project view <project-id>
orx runs <project-id>
orx logs <run-id>
orx exp run <experiment-id>
orx discover keyword <query>
orx paper <arxiv-id-or-doi>
```

Run `orx --help` or `orx <command> --help` for the complete interface.

## Local by default

OpenResearch runs on `127.0.0.1` with a local SQLite store. Creating a project
or launching a run does not publish your code. An
[openresearch.sh](https://openresearch.sh) account is only used for
service-owned capabilities such as organizations and managed compute.

## Usage analytics

Official release builds send opt-out, coarse usage events tied to a random
installation ID. They do not include code, prompts, file contents or paths,
repository names, tokens, emails, or project and experiment identifiers.

```sh
orx telemetry off
orx telemetry status
orx <command> --no-telemetry
```

Source and development builds do not send analytics.

Coding agents may also file product feedback with `orx feedback` when you hit
a bug, wish for a feature, or get frustrated with OpenResearch. Each report is
a short description of the workflow problem. Bug reports include as much detail
as possible to reproduce a failure while omitting sensitive information. Like
analytics, reports are sent only from official release builds.
They are linked to your account when you are logged in and turned off by
`orx telemetry off`. The `--no-telemetry` flag covers only the command it is
passed to.


---

# 부록 A. SKILL.md (루트)

---
name: openresearch-cli
description: Use the `orx` CLI to run local OpenResearch projects from a terminal — create experiment branches, launch and supervise compute, inspect logs and evidence, and manage the experiment tree. Read this before driving `orx` programmatically.
---

# OpenResearch CLI (`orx`)

`orx up` owns projects, experiment branches, and execution in a local Git
repository and local database. Use the local session worktree to read, diff,
and edit code (see `orx-git`).

This overview is deliberately short: it carries the cardinal rules and a command
quick-reference, then points at focused **modules** for everything else. Load a
module with `orx skill <name>` (the bundled index is printed at the end of `orx
skill` output).

## Cardinal rules — read before doing anything else

These four govern everything below. Breaking any one silently invalidates your
results — they are not style preferences. The `orx-experiment-tree` module
expands on the why; these are the non-negotiables.

1. **Never edit a node once a run has answered it.** A node freezes the moment
   a run establishes its baseline or tests its hypothesis — that includes the
   root — and freezing is permanent: a disappointing result is still a result.
   Until then it is **provisional**: seeding it, fixing its deps, and making it
   run all happen on its own branch (`orx-experiment-tree`). To test a new
   hypothesis, branch a **child** and edit the child.
2. **The run command *and* the environment are a fixed contract — identical on
   every node.** A child inherits its parent's run command verbatim; leave it
   alone. Do **not** give nodes different start commands, and do **not** vary
   behavior through environment variables or env-prefixed commands
   (`LR=3e-4 python …`). The *only* thing that may differ between nodes is the
   **committed code/config** on the node's git branch. Set the local project's
   command once with `orx project edit <projectId> --run-command '<cmd>'`.
3. **Vary code, not knobs-in-the-command.** Encode hyperparameters in the
   code/config files and branch a child per variant — never sweep them by editing
   the run command or passing env vars. Every node runs the *same* command over
   *different code*, so their logged result summaries stay comparable.
4. **Grow the tree downward, not sideways.** Fan a little *within* a round (the
   options of one decision), then **descend onto that round's winner** for the
   next round. A root with a long row of direct children and no grandchildren is
   the failure mode. See "Shape the tree" in the `orx-experiment-tree` module.

If you're ever tempted to change the command, pass an env var, or pile another
node onto the root instead of branching a child, editing its branch, and
descending — stop. That's the anti-pattern, not a shortcut.

## Setup

```sh
orx login          # opens a browser, stores a token at ~/.config/openresearch/credentials.json
orx logout         # remove the stored token
```

- The API base URL resolves from `--api-url` → `OPENRESEARCH_API_URL` → a built-in
  default. Set `OPENRESEARCH_API_URL` for non-local use.
- Local project and run commands do not require a token. OpenResearch compute,
  instance provisioning, and account settings require `orx login`.

## Command quick-reference

Project-scoped commands take a **project id**; experiment-scoped commands take an
**experiment id**; run-scoped commands take a **run id**. Don't mix them — get
ids from `orx projects`, `orx project view`, and `orx runs` respectively. Each
group below has a module (`orx skill <name>`) with the full flags and rules.

### Auth
| Command | What it does |
|---|---|
| `orx login [--api-url <url>]` | Open a browser, do loopback OAuth, store a token. |
| `orx logout` | Remove the stored token. |

### Discover (project- and experiment-scoped)
| Command | What it does |
|---|---|
| `orx projects [--json]` | List projects in the local `orx` store. |
| `orx orgs [--json]` | List organization ids available for OpenResearch compute (login required). |
| `orx project view <projectId>` | Show a local project's details and experiment tree. **Experiment ids come from here.** |
| `orx runs <projectId> [--experiment <id>]` | List runs as a table, newest first. **Run ids come from here.** |

### Run evidence (run-scoped) — module `orx-evidence`
| Command | What it does |
|---|---|
| `orx logs <runId>` | Show the local log path, size, and short preview; inspect the file for full evidence. |

### Create and run experiments (write) — modules `orx-create`, `orx-compute`, `orx-git`
| Command | What it does |
|---|---|
| `orx up` | Open the local dashboard to import or create a local project. |
| `orx project edit <localProjectId> [--name "<n>"] [--run-command "<cmd>"]` | Edit a local project's name or fixed run command. |
| `orx create-experiment <localProjectId> --title "<t>" [...]` | Add a local experiment node; prints its Git branch. |
| `orx compute status` / `show <backend>` / `test <backend>` | Inspect machine-wide compute configuration and readiness. |
| `orx compute configure <backend> --help` / `default set <backend>` / `connect <backend>` | Configure compute or authenticate; load `orx-compute`. |
| `orx compute instructions show --json` | Read the machine-wide custom recipe and its revision before configuring or launching. |
| `orx compute [--gpu <id>] [--count <n>] [--provider <name>]` / `orx compute --cpu` | List the GPU/CPU compute catalog. |
| `orx instance create <orgId> (--gpu <id> … \| --cpu <flavor> …)` | Spin up a standalone instance in an org; see `orx-instances`. |
| `orx exp status/run/cancel/wait/wake <localExpId>` | Inspect, run, cancel, wait on, or register a wake-up for a local experiment node. |
| `orx exp desc <expId> [--set "<text>" \| --stdin]` | Read or overwrite the experiment's description. |
| `orx agent spawn "<task>" [--title "<t>"] [--stdin] [--no-wake]` | Delegate an independent task to a helper session; see `orx-agent-delegation`. |

To **read or edit** a node's code—including diffing what a run changed—use plain
Git in the local session worktree. See the `orx-git` module.

### Literature & papers — alphaXiv / OpenAlex / bioRxiv / PubMed (no login required) — module `orx-lit-review`
Use before any web search for academic/research queries (paper, author, blog, model release).
| Command | What it does |
|---|---|
| `orx discover keyword "<query>"` | Call the alphaXiv full-text retrieval primitive with match snippets. |
| `orx discover embedding "<query>"` | Call the alphaXiv semantic retrieval primitive. The main agent ranks candidates and decides focused follow-ups; see `orx-lit-review`. |
| `orx discover openalex "<query>"` | Search the cross-disciplinary OpenAlex scholarly graph. |
| `orx discover biorxiv "<query>"` | Search bioRxiv preprints through OpenAlex's bioRxiv index. |
| `orx discover pubmed "<query>"` | Search PubMed biomedical literature through NCBI E-utilities. |
| `orx paper <id\|url> [--source ...] [--full]` | Fetch a paper: alphaXiv report with automatic full-text fallback (`--full` forces raw text), or OpenAlex/bioRxiv/PubMed metadata+abstract. Source auto-detected from the id. |

### Skills & templates — module `orx-customize`
| Command | What it does |
|---|---|
| `orx skills add <path>` | Save a reusable skill from a `SKILL.md` file or skill ZIP across projects. |
| `orx templates add <path>` | Save a reusable LaTeX template from a `.tex` file or template ZIP across projects. |

### Meta
| Command | What it does |
|---|---|
| `orx skill [name[/resource]]` | Print this overview, one bundled module, or a lazily loaded module resource such as `compute/hf`. |
| `orx feedback --kind <bug\|feature_request\|frustration> --summary ... --details ...` | Report a meaningful OpenResearch bug, feature request, or user frustration to its maintainers. See the `orx-feedback` module. |

## Modules

The detail lives in focused modules — load one with `orx skill <name>` (the bundled
list, with one-line descriptions, is printed at the end of `orx skill` output):

- **orx-experiment-tree** — the experiment-tree model, the auto-research loop, and `orx exp desc`.
- **orx-create** — initialize a local project and add local experiment nodes.
- **orx-compute** — launch and monitor runs; after resolving the backend, read its bundled reference.
- **orx-instances** — create persistent standalone machines for manual work.
- **orx-git** — read, edit, and diff a node's code with plain git.
- **orx-agent-delegation** — delegate independent work to helper sessions safely.
- **orx-evidence** — capture and inspect experiment results through run logs.
- **orx-reports** — write durable research outputs into the project's artifacts directory.
- **orx-figures** — publication-quality figures in matplotlib or TikZ. Load it **before** writing any plotting code, then read the one reference for that figure type.
- **orx-customize** — add reusable skills and LaTeX templates across projects.
- **orx-paper** — draft a paper or preprint as LaTeX that renders and compiles to PDF.
- **orx-feedback** — report meaningful OpenResearch bugs, feature requests, and user frustration without leaking research details.
- **orx-lit-review** — main-agent cross-corpus retrieval, source-selective follow-up policy, and paper content; the preferred starting point for academic/research queries.

## Typical workflow

Orienting in a project (read-only discovery):

```sh
orx projects                     # find the project id
orx project view <projectId>     # see the tree, pick an experiment id
orx skill experiment-tree        # the model + the auto-research loop
orx runs <projectId>             # find a run id
orx logs <runId>                 # locate its log, then inspect the file
```

To actually **drive** a project toward a goal — edit each node's code on its Git
branch and keep the round moving — follow the auto-research loop in
the `orx-experiment-tree` module. Every completed run is a decision point with
four moves: **repair** the same node when a run answered nothing, **refill**
the round with another sibling, **promote** the winner and descend, or **stop**.


---

# 부록 B. SYSTEM_PROMPT.md (루트)

<!--
This is the system prompt ("playbook") that `orx up` injects into every agent
session, verbatim except for `{token}` substitution at render time (project
facts, state, the compute default, and the artifacts path — see
`playbook_md()` in src/local/opencode.rs). Each harness receives it through its
native channel: Claude Code via --append-system-prompt-file, Codex via
developerInstructions, OpenCode via the config `instructions` list.

It carries only durable context needed every turn: identity, project facts,
project state, the chat response contract, shared execution policy, and skill
routing. Task-specific procedures live in the native skills installed into the
session worktree from agent-skills/. This leading comment is stripped at render
time.
-->

# OpenResearch agent — {name}

You are an OpenResearch agent helping the user across the research process,
including ideation, literature review, hypothesis formulation, experiment
execution, and artifact generation. The user's current project is **{name}**.
Your working directory is **your own git worktree** of the project's repository,
private to this chat session.

- Project id: `{id}`
{publication_line}
{paper_line}{compute_bullet}
- Artifacts directory: `{artifacts}` — durable project outputs such as reports,
  figures, images, CSVs, and PDFs are stored as project artifacts. Load
  `orx-reports` before creating or organizing artifacts. Load
  `orx-figures` before writing plotting code; default matplotlib output is not
  publishable

## Project state

{project_state}

## Start here

Use `orx` as the source of truth for the experiment tree, runs, and logs. Use
normal repository tools for code and file inspection. Use this project id
(`{id}`) for every `orx` command that takes one.

`orx` is internal and should stay under the hood; do not mention it in user-facing responses.

## Python environments

- Follow user instructions and established dependency tooling; inspect project
  setup first. `pyproject.toml` alone does not imply uv. Otherwise prefer uv
  when available on the execution host.
- For one-off Python utilities requiring third-party packages, check for uv
  first and use `uv run --isolated --no-project --with <package> python ...`.
  For PDF extraction, the package is `pymupdf` and the import is `pymupdf`.
  Do not assume bare `python` exists or that system Python has the dependency.
  If uv is unavailable, use a verified environment or a venv with the required
  package installed. Keep one-off utilities out of project dependency files.
- For uv projects, use `uv run --locked`, preserve configuration, and commit
  dependency declarations and locks together. Fix stale locks rather than
  bypassing them.
- Initialize blank Python projects with uv when needed and available; derive
  a valid package name from the project and declare and lock dependencies.
- Without uv, use existing Python or `venv` and pip; never install uv or stop
  solely for its absence. Preserve metadata, report incompatibilities, and
  do not treat pip as reproducing `uv.lock`.
- Select the environment explicitly. Keep ignored environments separate per
  worktree; never copy or share `.venv`. Reuse uv's default cache. Share
  dependency changes through Git; reconcile environments after checkout or
  integration and coordinate shared-worktree edits.
- Establish baseline dependencies before branching experiments. Run recipes
  must recreate dependencies from committed snapshots independently of
  session environments; preserve fixed run contracts.

## Evidence and links in chat

Ground substantive claims about this project's code, files, artifacts, or
measured results with a clickable reference immediately after the claim. Clearly
label an inference instead of presenting it as an observation.

- Code and file facts use raw `<file path="relative/path.py" />` tags, optionally
  with `lines="20-40"`. Paths are repository-relative. Add
  `exp="<experimentId>"` when the claim concerns the committed file on an
  experiment branch.
- Measured results use raw `<run id="<runId>" />` tags, optionally with a concise
  `label="+3.65pp"`. Read the cited run's log before reporting the result; status
  alone is not evidence.
- Artifacts use `<file path="artifacts/<relative-path>" />`.

Display images inline with Markdown: `![Description](path/to/figure.png)`.
Use a session-relative path, `artifacts/<relative-path>`, or an absolute local
path, not a `file://` URL (forward slashes on Windows). For any path containing
spaces, use `![Description](<path with spaces/figure.png>)`; percent-encode a
literal `%` as `%25`. Keep the file available for later
reads of the conversation. Viewing an image with a tool does not display it in
the answer; include the Markdown image in your response. Use file tags when
linking a file, not when showing an image.

An image alone in its own paragraph with a Markdown title renders as a figure
with a smaller italic caption below it:
`![Brief description](image.png "Caption text")`
Captions support inline Markdown and links. Clicking the image opens a modal;
a Markdown link to the same file, such as `[View image](image.png)`, opens it
in the right pane. Use these local links for image references instead of file tags.

Show each underlying image file inline only once per conversation; use a local
link for later references. Different crops or edits may be shown separately.

Other project files or artifacts mentioned in prose must use a file tag.
Paths in commands and code fences are exempt. Emit file and run tags as raw text, never
inside backticks or fences. Scholarly claims use the source links required by
`orx-lit-review`, not project file or run tags.

Use `$...$` for inline math and `$$...$$` for display math. Escape literal
currency signs, for example `\$10`.

## Skills

Available native OpenResearch skills:

{skill_names}

Use the available OpenResearch skills whenever their descriptions match the user
task; the skills provide instructions on how to use relevant CLI commands and
execute important user flows. **Load the relevant skill before acting in its
area.**


---

# 부록 C. agent-skills/orx-experiment-tree/SKILL.md

---
name: orx-experiment-tree
description: "Plan and drive the experiment tree: first-launch setup, fixed run contract, frozen nodes, stacked-bush tree shape, branch/launch/wait/promote, repair limits, notes, and turn summaries. Use before creating or changing experiments, launching a first run, deciding what to try next, handling a completed run, or reporting experiment progress."
---

A project is a **tree of experiment nodes**. The root (**baseline**) holds the
starting code and a **run command** — the single shell command that trains or
evaluates the node and prints its results to the run log. Every other node is a
**child** branched off a parent, inheriting its code and its run command. The two
rules this depends on — **never edit a node a run has answered** and
**the run command + env is a fixed contract** — are the cardinal rules;
everything below assumes them.

Create a node only when a planned run will establish a baseline or test a
hypothesis relevant to the project. Put a code change on that node only if it
serves that baseline or hypothesis. Do not create nodes for unrelated cleanup,
refactors, bug fixes, or dependency updates.

## Before the first launch

Follow the session playbook's Python policy. Before launching, resolve the
train/evaluation command and compute-specific requirements; ask only if the
project setup leaves these or the chosen workflow unclear. Record the durable
setup and execution recipe in the project's run command.

## Provisional until it answers — repair, don't branch

Every node exists to establish a baseline or test a hypothesis. A run that dies
on an error does **neither** — nothing was established, nothing was tested — so
there is nothing to protect: fix that node's branch in place and re-run the
same node. Successive runs on one node are how you get it working.

Once a run *does* answer the node — it produced the result the node was after,
good, bad, or `nan` — the node is **frozen**. Its branch is the code that
result came from: never edit it again, branch a child instead. That holds
however the run ended, and it is permanent — a disappointing number is a
result, not a reason to repair.

Unintended behaviour is not an answer. An OOM, a timeout, a divergence from a
bug, a missing dep — those are implementation and hardware details, and the
node is still provisional (unless the node's hypothesis *is* about memory or
runtime, in which case that outcome is exactly its result).

**Repair cap:** two runs in a row that answer nothing on one node, then ask the
user. Different errors still count; a bare relaunch or a flavor/backend switch
is a repair. If the same failure hits a second node, that is one setup problem
— ask then. (Separate from the "~3 failed or regressed runs" scientific stop.)

## Shape the tree — stacked bushes, not a flat fan or a noodle

The single most common way to drive a project badly is to get the **shape** wrong.
There are two opposite failures, and the right shape sits between them:

```
FLAT FAN (wrong)            NOODLE (wrong)            STACKED BUSHES (right)
root                        root                      root
├ a ├ b ├ c ... ├ n         └ a                       └ lr-head        ┐ round 1:
                              └ b                        ├ lr 2e-5     │ a small fan of
                                └ c                      └ lr 3e-5     ┘ co-equal options
                                  └ d ...                   └ winner ── arch-head   ┐ round 2
                                                               ├ arch-A             │ descends onto
                                                               └ arch-B             ┘ round 1's winner
```

- **Flat fan** (your whole sweep hanging off the root): every result is measured
  against the *start*, so wins never accumulate and the tree never makes progress.
- **Noodle** (a long single-child chain): depth manufactured for its own sake —
  each step doesn't actually build on the one above it.
- **Stacked bushes** (correct): a *small fan within a round* (the options of one
  decision), then **descend onto that round's winner** for the next round.

**The one rule that produces this shape.** Before you make X a child of Y, name
what Y established that X builds on:

- **You can name it** ("Y is the LR winner; X keeps that LR and changes the
  architecture") → real depth. X is a **child** of Y. Descend.
- **You can't — X and Y are co-equal options you're trying at the same time**
  (lr 2e-5 vs lr 3e-5) → they don't build on each other. They're **siblings** in
  the same bush. Fan, don't chain.

So: **width = the open options of one decision** (fan freely — a 3-way LR sweep
*should* be three siblings under a common head); **depth = decisions already
resolved, stacked** (one level down per winner kept). A new *round* never hangs off
the root — it hangs off the previous round's winner. That keeps the tree moving
**downward** as research progresses, without stringing unrelated nodes into a line.

Re-read the tree each round — `orx project view <projectId>` lists every node
(id, title, branch; roots marked `[root]`) — and check the shape: a wide row of
direct children off the root with no grandchildren means you're fanning when you
should be descending; a long depth-N chain with no branching means you're chaining
co-equal variants that should have been siblings.

## The auto-research loop

To drive a project toward a goal (e.g. "best convergence for d=8"), this is the
intended flow — do **not** edit a frozen node or rewrite the run command:

1. **Read the baseline's code.** You already sit in a private Git worktree of the
   project's repository. Check out the branch and read it with your normal tools
   (see `orx-git`). See the node's run command with `orx exp status <expId>` and
   find where the knobs live (config files, hyperparameters, model definitions).
2. **Form one round's worth of hypotheses** — the co-equal options of a *single*
   decision (which LR? which schedule? which init?), each a concrete change you can
   make and measure against the others in this round. Don't mix decisions from
   different rounds into one batch — that's what produces the flat fan.
3. **Create the round as a bush, and pick its parent deliberately.** All of this
   round's options are **siblings under one parent** — the title is the idea, the
   description is the concrete change you'll make on that node's branch. The parent is:
   - the **baseline**, only for the very first round (nothing has been won yet); or
   - the **previous round's confirmed winner**, for every round after — so this
     round's changes build *on top of* the last gain instead of resetting to the
     start. This is what walks the tree downward (see "Shape the tree" above).

   ```sh
   # Round 1 — one decision (the LR), its options fanned off the baseline:
   orx create-experiment <projectId> --parent <baseId> --title "LR 2e-5" \
     --description "Set the LR in config.yaml to 2e-5; change nothing else."
   orx create-experiment <projectId> --parent <baseId> --title "LR 3e-5" \
     --description "Set the LR in config.yaml to 3e-5; change nothing else."

   # Round 2 — LR 3e-5 won → the next decision (architecture) descends onto it:
   orx create-experiment <projectId> --parent <lr3e5WinnerId> --title "Wider MLP" \
     --description "On top of the LR-3e-5 winner, widen the MLP hidden dim 1024→2048 in model.py."
   ```
   The child inherits its parent's run command automatically — you don't set it,
   and you never give siblings different commands or env vars (cardinal rule 2).
4. **Implement each child's change on its Git branch** — `orx create-experiment`
   prints the child's branch (`orx/<slug>`); in your worktree:
   ```sh
   git checkout orx/<child-slug>
   #   …edit only the files that idea touches…
   git commit -am "cosine LR + warmup"
   ```
   **Leave the run command alone.** Before launching, load `orx-evidence` and
   make sure the committed code emits enough run evidence to judge the node.
5. **Launch the round's ready children**: `orx exp run <childId> --backend <b>`
   (or omit `--backend` when a default target is set — see `orx-compute`). Remote
   backends can run siblings in parallel; `--backend local` shares this machine's
   CPU, RAM, and GPU.
6. **Keep the round moving — drive a per-completion loop, not a wait-for-all
   barrier.** You want control back the moment *any one* run finishes so you can
   analyze it and either refill its slot or stop — not after the whole batch
   drains. `orx exp wait --project <projectId>` is built for exactly this: it
   returns on the **first** completion. Treat it as one **tick** of a loop, where
   *you* are the loop body:

   ```
   # after launching your runs, loop until the project is drained:
   loop:
     orx exp wait --project <projectId>   # sleeps; returns on the first completion
     orx runs <projectId>                 # SOURCE OF TRUTH: re-read all run states
     # for each run now terminal that you haven't handled yet:
     #   - read its results (step 7) and decide: launch a refill? promote it? stop?
     #   - launch the next queued child to refill the freed slot (step 5)
     # if `exp wait` printed "drained: no runs in flight"  → batch is done, break
   ```

   Three things make this robust — follow all of them:
   - **`exp wait --project` is a sleep-until-change signal, not the source of
     truth.** It only reports completions it observed *during that one call*. A
     run that finishes while you're analyzing the previous one is already terminal
     by the next call and **won't be reported**. So on every wake, re-read
     `orx runs <projectId>` and reconcile against the set of runs you've already
     handled — act on *every* newly-terminal run, not just the line `exp wait`
     printed. (This is the one time you do look at `orx runs` in a loop — as the
     reconcile after each wake, **not** as a tight poll in place of `exp wait`.)
   - **Re-issue `exp wait` each tick.** One completion → one return → you decide →
     you call it again. Don't expect a single `exp wait` to block until everything
     is done; that's the failure mode this loop avoids.
   - **Terminate on drained.** When no runs are in flight, `exp wait --project`
     returns immediately printing `drained: no runs in flight`. That — or seeing
     every run terminal in `orx runs` with no more children to launch — is your
     exit condition. Don't keep calling it into a timeout.
7. **Analyze each finish as it lands, then iterate.** Do the per-completion read
   *inside the loop above*, not deferred to the end — when a run finishes,
   **actually read its results** from the file reported by `orx logs <runId>`
   (see `orx-evidence`). To see exactly what a finished node changed, diff its
   branch against its parent's
   branch (see `orx-git`). Don't infer from status alone. Each
   completion is a decision point with four moves:
   - **Repair** — the run answered nothing: fix this node's branch and
     re-launch the same node (above).
   - **Refill** — result is mediocre or inconclusive: launch the next queued child to
     keep the round moving (step 5).
   - **Promote** — result is a clear win: this node becomes the **parent for the next
     round**. The next batch of children branch off *it*, not the baseline, so the win
     carries forward and the next ideas stack on top of it. This is the move that makes
     the tree grow deeper; skipping it is what produces a flat, sweep-only tree.
   - **Stop** — goal met, or the branch is exhausted.

   Frozen nodes stay untouched throughout — promotion moves the *focal parent*
   down the tree, it never rewrites a node that already measured something.

Stop when the goal is met, or after ~3 consecutive failed or regressed runs.
When you stop, write up the tree as a descriptively named project artifact — see
the `orx-reports` skill for naming and folder guidance.

Close any turn that ran or changed experiments with a short experiment summary:
one line per relevant node with what it tested, its status, and the headline
result. Follow the session playbook's evidence-and-links contract. Plain
questions and turns that launch or change no experiments need no summary.

## Experiment description / notes — `orx exp desc`

Each experiment node carries a free-form **description** (markdown) — the same
field set by `create-experiment --description`. Use it for notes: observations,
hypotheses, or a running summary. It is a whole-document field: writing
overwrites whatever was there.

```sh
orx exp desc <expId>                          # print the description to stdout (empty → hint on stderr)
orx exp desc <expId> --set "tried lr=3e-4, diverged at step 4k"   # overwrite with a short note
cat notes.md | orx exp desc <expId> --stdin   # overwrite from stdin (long markdown)
```

- **Read** prints the text to **stdout** (pipe/redirect-friendly); when empty, a
  hint is printed to **stderr** and stdout stays empty.
- **Write** with exactly one of `--set` (inline) or `--stdin` (whole of stdin).
  Passing both is an error. Writing **replaces** the entire description — to
  append, read first, edit, and write back.
- `<expId>` comes from `orx create-experiment` output or `orx project view
  <projectId>` (the experiment id, not a run or project id).
