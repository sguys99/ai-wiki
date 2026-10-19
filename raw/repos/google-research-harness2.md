---
title: "Harness²: Recursive Agent Harnessing for an Open World"
type: repo
year: 2026
category: agents
raw_path: raw/repos/google-research-harness2.md
raw_filename: "google-research-harness2.md"
source_collection: external
org: "google-research"
repo: "harness2"
url: "https://github.com/google-research/harness2"
license: "Apache-2.0"
fetched_at: "2026-10-19"
tags: []
---

> 수집 메모: 사용자의 명시적 지시로 GitHub raw URL에서 가져왔다 (CLAUDE.md rule #1 자료 수집 예외). 기본 브랜치 main, 저장소 생성 2026-10-06, 마지막 push 2026-10-14, GitHub API license 필드 Apache-2.0, 수집 시점 stars 6,094, description 없음. 패키지 구조: harness2/core (proposer, recursion, schedule, selection, library, ledger, tree, judge, prompts 등), harness2/substrate (opencode, codex), harness2/benchmarks (jobbench, lab, workbuddy), harness2/cli (setup, check, judge, report, run_sweep, demo), third_party/ (jb_runner, lab_runner, wb_runner와 upstream 패치). 아래는 최상위 README.md, docs/SETUP.md, docs/BENCHMARKS.md, docs/EXPERIMENTS.md, dependencies/PINNED.md 전문을 원문 그대로 이어 붙인 것이다.
>
> README 이미지: assets/harness2_pipeline.png (논문 Figure 3과 같은 파이프라인 도식), assets/components.png (논문 Figure 2와 같은 8개 구성 요소 도식), assets/harness2_recursion_modes.png (논문 Figure 4와 같은 병렬/순차 recursion 도식), assets/harness2-setup.gif (설치와 JobBench 실행 터미널 데모).


# README.md

<h3 align="center">
  <img src="assets/Harness2-wordmark.png" alt="Harness²" width="360"><br>
  Recursive Agent Harnessing for an Open World
</h3>

<p align="center">
  <a href="https://arxiv.org/pdf/2610.14224"><img src="https://img.shields.io/badge/Paper-arXiv-EA4335?logo=arxiv&logoColor=white" alt="Paper"></a>
  <a href="https://harness2.github.io"><img src="https://img.shields.io/badge/Website-harness2.github.io-4285F4?logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="docs/BENCHMARKS.md"><img src="https://img.shields.io/badge/Docs-Benchmark%20guides-FBBC04" alt="Benchmark guides"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-34A853" alt="License"></a>
</p>

<p align="center">
  <a href="docs/BENCHMARKS.md#jobbench">
    <img src="assets/harness2-setup.gif" alt="Install, set up, and run JobBench: uv pip install -e '.[render]', harness2-setup jb, then harness2 --bench jb --k 1 --mode parallel. Click for prerequisites and commands." width="640">
  </a>
</p>

A **harness** is the system around a model that enables it to act as an agent:
prompts, tools, memory, skills, orchestration, and more. **Harnessing** is the
process of optimizing that system.

Harness² is a plug-and-play framework for **recursive agent harnessing** in an
open world, where agents encounter tasks unseen during harness design. It
connects two levels of recursion while keeping model weights fixed:

* **Task-level recursion** refines the execution harness for the current task
  through a contrastive **Propose–Probe–Compose** step: propose edits, probe
  their effects on the same task, and compose a refined harness from behavioral
  contrasts between executions, without ground-truth feedback.
* **Harnessing-level recursion** updates a persistent *improvement harness*
  with adopted harnesses and evidence-supported lessons from each task to guide
  future refinement.

<p align="center">
  <a href="assets/harness2_pipeline.png">
    <img src="assets/harness2_pipeline.png" alt="Harness² pipeline. Task-level recursion: an agent executor runs the initial harness, a harness editor proposes invariant and domain edits, candidate probes execute them, and a harness composer combines them into the final harness. Harnessing-level recursion: an experience reflector reflects on the step and updates the improvement harness used for the next task." width="100%">
  </a>
</p>

Across three professional benchmarks and four model–harness configurations, a
single Harness² step improves GLM-5 and Gemini 3.5 Flash over their base
harnesses, with gains of up to 11.5 points on WorkBuddy-Bench, 4.5 points on
JobBench, and 11.8 percentage points on LAB's partial pass rate. Increasing the
task-level recursion budget brings further gains.

The release supports **parallel and sequential recursion**, **OpenCode and
Codex executors**, and **JobBench, LAB, and WorkBuddy-Bench**.

## Video overview

https://github.com/user-attachments/assets/76b10548-b14b-4c8f-9aa5-a93662df4d56

## Contents

- [Video overview](#video-overview)
- [Harness components](#harness-components)
- [Install](#install)
- [Run a benchmark](#run-a-benchmark)
- [Experiments](#experiments)
- [Web access](#web-access)
- [Results and resume](#results-and-resume)
- [Citation](#citation)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

## Harness components

Harness² exposes eight editable components around the model: **system prompt,
guardrails, memory, tool guidance, subagents, skills, scripts, and plugins**.
They control context construction, the tool interface, delegation, and behavior
inside the tool loop.

<p align="center">
  <a href="assets/components.png">
    <img src="assets/components.png" alt="Eight harness components grouped by runtime role: system prompt, guardrails, memory, and skills construct context; tool guidance and scripts define the tool interface; subagents orchestrate delegated work; plugins control middleware." width="100%">
  </a>
</p>

## Install

Use **Linux, Python 3.12, and [uv](https://docs.astral.sh/uv/getting-started/installation/)**.
From the repository root:

```bash
uv venv --python 3.12 .venv
source .venv/bin/activate
uv pip install -e '.[render]'
harness2-demo --output runs/demo --k 2
```

The local demo runs both recursion modes with deterministic editors and real
Python executions. It requires no model credentials.

For model-backed benchmarks, install **Node.js 20+, the Google Cloud CLI**, and
the [benchmark dependencies](docs/SETUP.md#requirements). LAB needs Pandoc and
Poppler; WorkBuddy-Bench needs Docker. Then configure your models:

```bash
cp .env.example .env
# Edit .env with your Vertex AI project and model IDs.
gcloud auth application-default login
```

See the [setup guide](docs/SETUP.md) for model settings, authentication
alternatives, and the [Codex executor](docs/SETUP.md#codex-executor).

## Run a benchmark

The following example installs LAB and runs one task, then evaluates and reports
its result. Model-backed runs incur API costs; start with a small task selection.

```bash
harness2-setup lab
harness2-check --bench lab
harness2 --bench lab --k 1 --mode parallel \
  --only-domains antitrust-competition --max-tasks 1
harness2-judge --bench lab --k 1 --mode parallel
harness2-report --bench lab --k 1 --mode parallel
```

Sequential recursion runs the same commands with `--mode sequential`. `--k` is
the task-level recursion budget; see [Experiments](#experiments). Judging and
reporting must use the same benchmark, executor, subset, `--k`, `--mode`, and
seed as the refinement run. Add `--dry-run` to `harness2` to preview task
selection without model calls.

| Benchmark | Tasks | Install | Guide |
|---|---|---|---|
| JobBench | Professional work | `harness2-setup jb` | [JobBench](docs/BENCHMARKS.md#jobbench) |
| LAB | Legal work | `harness2-setup lab` | [LAB](docs/BENCHMARKS.md#lab) |
| WorkBuddy-Bench | Office, web, and code | `harness2-setup wb` | [WorkBuddy](docs/BENCHMARKS.md#workbuddy-bench) |

Choose one benchmark per command. WorkBuddy also takes `--subset office`,
`--subset web`, or `--subset code` on every command after setup. The
[benchmark guides](docs/BENCHMARKS.md) cover each one's data, domains, and
grading.

## Experiments

Scale task-level recursion in two ways: **parallel recursion** explores multiple
candidate harnesses and composes refinements from their execution evidence;
**sequential recursion** carries the refined harness and accumulated evidence
through successive Propose–Probe–Compose steps.

<p align="center">
  <a href="assets/harness2_recursion_modes.png">
    <img src="assets/harness2_recursion_modes.png" alt="Two ways to scale task-level recursion. Parallel: probe k general and k domain-specific candidate harnesses, then produce k compositions from the shared evidence. Sequential: carry the refined harness and accumulated evidence through k Propose–Probe–Compose steps." width="100%">
  </a>
</p>
<p align="center"><em>Parallel recursion explores wider; sequential recursion refines deeper.</em></p>

| Option | Behavior |
|---|---|
| `--k 1` | One Propose–Probe–Compose step |
| `--k K --mode parallel` | Probe `K` general and `K` domain-specific candidates, then produce `K` compositions |
| `--k K --mode sequential` | Refine the harness through `K` successive steps |
| `--substrate cx` | Use Codex instead of the default OpenCode executor |

After each task, harnessing-level recursion retains the adopted harness and
evidence-supported lessons to guide future refinement. See the
[experiment guide](docs/EXPERIMENTS.md) for task selection, concurrency,
reproducibility, and baseline comparisons.

## Web access

Executor network access is unrestricted, and Codex runs with its sandbox
disabled. Public benchmark rubrics may be accessible online. Before evaluation,
configure [network restrictions](docs/EXPERIMENTS.md#web-access) to prevent
access to benchmark answers and grading criteria.

## Results and resume

Results are saved under `runs/`, organized by benchmark and subset where
applicable. They include task summaries, deliverables, adopted harnesses,
reflection notes, and evaluation results.

Repeat the same command to resume. Use a new `HARNESS2_RUNS_DIR` when changing
models or task selection. See [results and resume](docs/EXPERIMENTS.md#results-and-resume)
for details; each command also supports `--help`.

## Citation

```bibtex
@article{xu2026harness2,
  title   = {Harness$^2$: Recursive Agent Harnessing for an Open World},
  author  = {Xu, Ruiyao and Chen, Yanfei and CuiZhu, Zhongying and Dalvi Mishra, Bhavana and Ming, Yifei and Yu, Han and Han, Rujun and Lee, Chen-Yu and Pfister, Tomas},
  journal = {arXiv preprint arXiv:2610.14224},
  year    = {2026},
  url     = {https://arxiv.org/abs/2610.14224}
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Harness² is licensed under [Apache 2.0](LICENSE). Third-party code under
[`third_party/`](third_party/README.md), benchmarks, and datasets retain their
upstream licenses; see
[third-party notices](dependencies/README.md).

## Disclaimer

This is not an officially supported Google product. This project is not eligible
for the [Google Open Source Software Vulnerability Rewards Program](https://bughunters.google.com/open-source-security).

# docs/SETUP.md

# Setup guide

Start with the [quick start](../README.md#install). This guide covers benchmark
dependencies, model credentials, and the optional Codex executor. For individual
benchmarks, see the [benchmark guides](BENCHMARKS.md).

## Requirements

Use Linux and Python 3.12 for benchmark runs; the Python package also supports
3.13. On Debian/Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y git curl unzip ca-certificates pandoc poppler-utils
```

Pandoc and Poppler are needed by LAB. Also install:

- [Node.js](https://nodejs.org/en/download) 20 or newer.
- [uv](https://docs.astral.sh/uv/getting-started/installation/).
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
- [Docker Engine](https://docs.docker.com/engine/install/) for WorkBuddy-Bench,
  with permission to run `docker info`.

Benchmark setup installs its own pinned Bun runtime under `dependencies/`.
Keep the main Harness² environment active when running the commands below.

## Models and credentials

Copy `.env.example` to `.env` if you have not already done so. Set your Vertex AI
project and model IDs, then authenticate:

```bash
gcloud auth application-default login
```

Shell environment variables take precedence over `.env`.
`GOOGLE_CLOUD_PROJECT` identifies your project; `GOOGLE_CLOUD_LOCATION` defaults
to `global`. Your account must have access to each configured model.

| Setting | Meaning |
|---|---|
| `HARNESS2_SOLVER_MODEL` | Executor model in OpenCode's `provider/model` format |
| `HARNESS2_IMPROVER_MODEL` | Improver model in the same format; defaults to the executor |
| `HARNESS2_JUDGE_MODEL` | Bare judge model ID; the adapter supplies the Vertex prefix |
| `HARNESS2_RUNS_DIR` | Output root; defaults to `runs/` |

The provided configuration uses Vertex Gemini executors and judges, and supports
either Vertex Claude or Gemini as the improver. LAB also supports the upstream
judge's direct providers when their credentials are configured. For WorkBuddy,
setup generates the Gemini solver and judge routes from these settings; rerun
setup after changing either model.

### Authentication alternatives

On a machine with a configured attached service account, Application Default
Credentials can use that account. Other options include:

- `gcloud auth application-default login --no-browser`, which prints a command
  to run on another machine that has a browser.
- `GOOGLE_APPLICATION_CREDENTIALS` pointing at a service account key file.
- `gcloud auth application-default login --impersonate-service-account=<account>`.

Keep `gcloud` on `PATH` for these Vertex configurations, including the key-file
route: the installation check runs
`gcloud auth application-default print-access-token`.

## Benchmark installation

Install only the benchmark you intend to run:

```bash
harness2-setup lab
harness2-check --bench lab
```

Use `jb` for JobBench or `wb` for WorkBuddy-Bench. See the
[benchmark guides](BENCHMARKS.md) for subset selection and licensing.

The runner overlays and compatibility patches are included in
[`third_party/`](../third_party/README.md). Setup clones supported upstream
revisions under `dependencies/`, applies the patches, creates the benchmark
environments, and downloads task data.

Each benchmark environment lives inside its upstream checkout:

- `dependencies/harvey-labs/.venv`
- `dependencies/job-bench-eval/.venv`
- `dependencies/workbuddy-bench/.venv`

Harness² selects these interpreters automatically; do not activate them for the
main commands.

### Installation checks

`harness2-setup <bench> --dry-run` previews setup without making changes.
`harness2-check` checks installed dependencies, credentials, and configuration
without calling a model. Refinement runs perform the same checks, including
judge configuration, before starting.

These checks do not test model availability. Access to an executor, improver, or
judge model is tested when that model is first called. Refinement and judging
return a nonzero exit status when incomplete.

## Codex executor

The Codex executor connects to a Responses API endpoint. For Gemini on Vertex
AI, the included `harness2-bridge` provides this interface through a local
LiteLLM server, using the same Application Default Credentials and
`GOOGLE_CLOUD_PROJECT`.

Install the optional dependencies and start the bridge in a separate session:

```bash
uv pip install -e '.[render,bridge]'
harness2-bridge                 # for WorkBuddy: harness2-bridge --host 0.0.0.0
```

The bridge prints the `HARNESS2_CODEX_*` settings to add to `.env`. Its port and
generated access key are stored under `dependencies/codex/` and reused on
restart. Pass `--substrate cx` to setup, checks, refinement, judging, and
reporting:

```bash
harness2-setup lab --substrate cx
harness2-check --bench lab --substrate cx
harness2 --bench lab --substrate cx --k 1 --mode parallel \
  --only-domains antitrust-competition --max-tasks 1
```

WorkBuddy executes Codex inside Docker containers, so the bridge must listen on
`--host 0.0.0.0`; it also prints `HARNESS2_CODEX_CONTAINER_URL`. This binds the
bridge to all network interfaces; restrict access to the intended clients.

To use another Responses API endpoint, set `HARNESS2_CODEX_BASE_URL`,
`HARNESS2_CODEX_API_KEY`, and `HARNESS2_CODEX_MODEL` directly. Setup records the
endpoint and model in `dependencies/codex/home/config.toml`; rerun setup after
changing either. `harness2-check` reports stale configuration until then.

Codex runs with its sandbox disabled. Review the
[executor network restrictions](EXPERIMENTS.md#web-access) before evaluation.

## Network access during setup

Setup downloads dependencies from the following hosts:

| Host | Used for |
|---|---|
| `github.com` | Pinned upstream checkouts |
| `registry.npmjs.org` | Pinned Bun runtime and Codex CLI, plus dependencies resolved by `bun install` |
| `huggingface.co` and its CDN | JobBench data and WorkBuddy subset archives |
| A Docker registry | WorkBuddy container image |
| `astral.sh` | CPython 3.12 when the host has no system Python 3.12 |

Use `harness2-setup <bench> --dry-run` to review setup commands when configuring
network access. Experiments also access the model endpoints configured in
`.env`. Setup downloads and executor web access have different requirements;
see [web access during evaluation](EXPERIMENTS.md#web-access).

## Wheel installations

A wheel ships the `harness2` package only. The task partitioner,
`python scripts/split_tasks.py`, requires this source tree. For a wheel
installation, work from a dedicated directory: `.env`, `dependencies/`, and
`runs/` are resolved there.

# docs/BENCHMARKS.md

# Benchmark guides

Complete the [installation and credentials](SETUP.md) first. Each
benchmark installs separately; install the ones you intend to run. Every command
below takes `--substrate cx` to use the
[Codex executor](SETUP.md#codex-executor) instead of OpenCode. Choose the
recursion mode with `--mode parallel` or `--mode sequential` and the task-level
recursion budget with `--k`. Keep both identical across the run, judge, and
report commands.

## LAB

Upstream: [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs).
Legal work tasks with source documents and rubric-based grading. The adapter
groups tasks by practice area and removes criteria from the material passed to
the improver. Needs Pandoc and Poppler.

```bash
harness2-setup lab
harness2-check --bench lab
harness2 --bench lab --k 1 --mode parallel
harness2-judge --bench lab --k 1 --mode parallel
harness2-report --bench lab --k 1 --mode parallel
```

Sequential recursion runs the same commands with `--mode sequential`.

Tasks arrive with the pinned checkout at
`dependencies/harvey-labs/tasks/<practice-area>/<task>/task.json`, and the adapter
discovers all installed tasks; no separate task list is required. Setup installs
the LAB dependency environment, the runner overlays, and the included Vertex
judge patch.

The judge reads outputs only after selection. Reports use Partial (fraction of
criteria passed) and All-pass (all criteria passed). A failed judge remains
unscored and writes its output to `judge.log` in the run directory; a Vertex
`429 RESOURCE_EXHAUSTED` there means quota, so rerun `harness2-judge` later.
Changing the judge model changes the measurement. Outputs are under
`runs/lab/`.

## JobBench

Upstream: [Job-Bench/job-bench-eval](https://github.com/Job-Bench/job-bench-eval).
Data: [JobBench/job-bench](https://huggingface.co/datasets/JobBench/job-bench).
Professional tasks, with the library grouped by the dataset's occupation
directories.

```bash
harness2-setup jb
harness2-check --bench jb
harness2 --bench jb --k 1 --mode parallel
harness2-judge --bench jb --k 1 --mode parallel
harness2-report --bench jb --k 1 --mode parallel
```

Sequential recursion runs the same commands with `--mode sequential`.

Setup downloads only the main dataset from Hugging Face — public and ungated, so
no account, token, or terms acceptance is required — records its revision, and
places tasks at `dependencies/job-bench-eval/dataset/main/`. It also installs the
document extraction dependencies and a judge patch that handles reasoning effort
and empty completions. Rubrics stay outside the improver's evidence.

With a Gemini `HARNESS2_JUDGE_MODEL`, the judge uses the project's Vertex
OpenAI-compatible endpoint and Application Default Credentials. For a separate
judge provider, set `HARNESS2_JUDGE_BASE_URL`, `HARNESS2_JUDGE_API_KEY`, and the
model ID that endpoint accepts. The reported score uses the upstream rubric
weights; unscored tasks are reported separately. Results are under `runs/jb/`.

Note: JobBench data, including `RUBRICS.json`, is public on Hugging Face, so an
executor with web access may retrieve it. Block those hosts during runs as
described under [Web access](EXPERIMENTS.md#web-access).

## WorkBuddy-Bench

Upstream: [Tencent/workbuddy-bench](https://github.com/Tencent/workbuddy-bench).
Data: [tencent/workbuddy-bench](https://huggingface.co/datasets/tencent/workbuddy-bench).
Office, web, and code subsets. Needs Docker.

The upstream custom Tencent license includes a territorial limitation; read
[the license](https://github.com/Tencent/workbuddy-bench/blob/main/LICENSE)
before downloading or using the benchmark. Derived runner files and patches
retain that license.

```bash
docker info
harness2-setup wb --subset office
harness2-check --bench wb --subset office
harness2 --bench wb --subset office --k 1 --mode parallel
harness2-judge --bench wb --subset office --k 1 --mode parallel
harness2-report --bench wb --subset office --k 1 --mode parallel
```

Sequential recursion runs the same commands with `--mode sequential`.

`harness2-setup wb` without `--subset` installs all three subsets in one run;
pass `--subset` to install only the one you intend to run. Every other command
takes one subset at a time.

Setup installs the pinned Harbor-based runtime, applies the included adapter,
mount, and credential/transport patches, copies the harness runners, creates
solver and judge routes from `.env`, downloads the requested subset with the
upstream fetch script, and builds the OpenCode harness image. The public Vertex
setup uses a `google-vertex/gemini...` executor and a bare `gemini...` judge ID;
no model YAML or account-specific proxy configuration needs to be copied from
another checkout. Setup refuses to run unless `HARNESS2_SOLVER_MODEL` is a
`google-vertex/gemini...` ID and `HARNESS2_JUDGE_MODEL` a bare `gemini...` one,
with `GOOGLE_CLOUD_PROJECT` set; `--dry-run` reports the requirement and still
prints the rest of the plan. The benchmark's job-local proxy refreshes ADC tokens
and preserves Gemini tool-call thought signatures.

Setup patches the upstream fetch script to download with `curl` (then `wget`,
then `hf`) and to require the dataset repository's `SHA256SUMS`: an archive that
cannot be verified is not unpacked. A verified download prints
`wb-bench-<subset>-v1.0.tar.gz: OK`.

Tasks are discovered from `task.toml` and `instruction.md` under
`dependencies/workbuddy-bench/datasets/wb-bench-<subset>-v1.0/tasks/`. Libraries use
`metadata.role` on code and `metadata.category` on office and web. Each rollout
uses a fresh benchmark container. The adapter reads the verifier's `score.json`;
the improver never receives verifier output. Missing verifier results remain
unscored. Runs live under `runs/wb/<subset>/`.

For Codex, start the bridge with `harness2-bridge --host 0.0.0.0` so that the containers can reach it.

# docs/EXPERIMENTS.md

# Experiment guide

Complete [setup](SETUP.md) and choose a [benchmark](BENCHMARKS.md) first. This
guide covers recursion budgets, task selection, reproducibility, and evaluation.

## Recursion modes

Both modes start with `k` reference executions of the same base harness.

- **Parallel recursion** proposes and probes `k` general (invariant) candidates
  and `k` domain-specific candidates. Each of `k` independent compositions uses
  the full candidate pool and execution evidence to produce a refined harness.
- **Sequential recursion** runs `k` Propose–Probe–Compose steps, carrying the
  refined harness and accumulated execution evidence into the next step.

After adoption, reflection stores the adopted harness and evidence-supported
lessons in a per-domain library. Tasks within a domain run in order and read
only earlier entries; different domains can run concurrently. Libraries are
separated by benchmark, executor, mode, budget, and seed.

| Option | Behavior |
|---|---|
| `--k 1` | One Propose–Probe–Compose step, followed by reflection after adoption |
| `--k K --mode parallel` | Explore `K` candidates per scope and produce `K` compositions |
| `--k K --mode sequential` | Refine the harness through `K` successive steps |
| `--workers N` | Run `N` domains concurrently; tasks within each domain stay ordered |
| `--substrate cx` | Use Codex instead of the default OpenCode executor |
| `--seed N` | Shuffle the task stream reproducibly; does not control model sampling |

Use the same benchmark, executor, subset, `k`, mode, and seed for refinement,
judging, and reporting. For example:

```bash
export HARNESS2_RUNS_DIR=runs/lab-sequential-k3
harness2 --bench lab --k 3 --mode sequential \
  --only-domains antitrust-competition --max-tasks 1
harness2-judge --bench lab --k 3 --mode sequential
harness2-report --bench lab --k 3 --mode sequential
```

Use a separate output root when changing the budget or mode to keep experiments
easy to distinguish.

## Task selection and cost

Model-backed runs incur API costs for executor rollouts and improvement stages.
The full LAB task stream contains 1,143 tasks. Start with a small selection and
review model pricing before launching a full run.

- `--only-domains` restricts the run to the named domains.
- `--max-tasks` caps tasks **per domain**, not across the whole run.
- `--dry-run` previews selected tasks and available domains without model calls.

Each benchmark also has a script that runs checks, refinement, judging, and
reporting in sequence. Set `SUBSTRATE`, `K`, `MODE`, and, for WorkBuddy,
`SUBSET`; additional arguments are passed to the refinement command:

```bash
bash scripts/run_lab.sh --only-domains antitrust-competition --max-tasks 1
SUBSTRATE=cx K=3 MODE=sequential bash scripts/run_jobbench.sh --max-tasks 1
SUBSET=web bash scripts/run_workbuddy.sh --max-tasks 1
```

## Reproducibility

When comparing budgets or modes, keep task selection, executor, improver, judge,
and web access fixed. Use a distinct `HARNESS2_RUNS_DIR` when changing models or
task selection; the saved configuration prevents incompatible resumes.

JobBench's dataset is resolved at download time rather than pinned to a commit.
Setup records the downloaded Hugging Face revision in
`dependencies/job-bench-eval/dataset/main/.harness2-download.json`. Report that
revision alongside JobBench results.

### Task partitions

To create a reproducible, domain-stratified partition of the installed tasks:

```bash
python scripts/split_tasks.py --bench lab --seed 42 --output splits/lab.json
harness2 --bench lab --split-file splits/lab.json --split test --mode parallel
```

The default train fraction is 0.5. Generated partitions are local files, not
release assets, and the script refuses to overwrite an existing file.

## Baseline evaluation

`harness2-judge --bases` scores a run namespace's reference executions, writing
`base_judged.json` beside `judged.json` for the base-harness comparison.
`harness2-report` covers the refined harness only.

## Web access

All three benchmarks are public, and JobBench publishes each task's
`RUBRICS.json` on Hugging Face. An executor with network access can therefore
retrieve grading criteria. In a validation run of this release, a Codex rollout
on JobBench downloaded its task's rubric without being instructed to.

The release does not restrict network access. After setup, block the following
hosts for the executor to reduce access to benchmark data and grading criteria:

- `huggingface.co`, `hf.co`, and `*.hf.co`
- `github.com` and `raw.githubusercontent.com`, for benchmark repositories

Setup itself needs these hosts to download dependencies and data. Codex runs
with its sandbox disabled, so apply restrictions at the network level, such as
an egress firewall or DNS policy on the executor host, rather than relying on a
tool setting. Report the restrictions used alongside results.

## Results and resume

The default output roots are `runs/lab/`, `runs/jb/`, and
`runs/wb/<subset>/`. They contain task summaries, execution artifacts, adopted
harnesses, reflection notes, and graded results.

Repeat the same command to resume. Failed evaluations remain unscored rather
than being counted as zero. Use a new `HARNESS2_RUNS_DIR` when changing models or
task selection.

Refinement, judging, and reporting use `harness2`, `harness2-judge`, and
`harness2-report`; each supports `--help`.

# dependencies/PINNED.md

# Upstream pins and patches

`harness2/config.py` is the authoritative pin table. The setup script fetches
these commits directly from the public remotes and refuses to overwrite a
checkout at another revision.

| Repository | Commit |
|---|---|
| job-bench-eval | `fa03a17f9ff662f136798a274e10011c3aa00fd0` |
| workbuddy-bench | `b516950be5b56eb3be406c2f76ee1c5111dcb57f` |
| harvey-labs | `b58a28ae9fde5ee4b810e53b4fd0a1915325a35d` |
| opencode | `23fb5e0516c99ac04a1aa46c193efda2e1b9bb24` |

## Included patches

- `opencode-compat.diff`: fixes a moving Git dependency to the commit already in
  the upstream lock and adds Opus 4.8 adaptive-thinking support to the pinned
  provider adapter.
- `job-bench-eval-judge.diff`: passes reasoning effort, raises the judge output
  cap, and rejects empty completions.
- `harvey-labs-judge-vertex-anthropic.diff`: adds Claude and Gemini Vertex judges
  using ADC and improves malformed/ambiguous response handling.
- `workbuddy-bench-runtime.diff`: registers the release's executor adapters,
  preserves declared harness mounts, refreshes short-lived credentials, and
  preserves Gemini thought signatures across tool calls. It also fixes an
  undefined constant in the upstream Anthropic route support.

Patches are checked before applying and skipped if already applied. Derived runner
files belong in `harness2/third_party/{jb,lab,wb}_runner/`, which this copy does not
include; setup copies the LAB and WorkBuddy overlays into the upstream checkouts.

The upstream dependency locks are used for Python installations. OpenCode uses
Bun 1.3.11 and the patched lock. Codex uses the version in `config.CODEX_VERSION`.
JobBench's Hugging Face revision is resolved once for a download and recorded in
`dataset/main/.harness2-download.json`. WorkBuddy's dataset fetcher, as patched
by setup, verifies each archive against the dataset repository's `SHA256SUMS` and
refuses one it cannot verify; see
[the WorkBuddy guide](../docs/BENCHMARKS.md#workbuddy-bench). LAB task files are part of its pinned Git checkout.

These inputs support the public execution workflow. Historical paper runs may
have used different tasks, model deployments, and additional local tooling;
see [experiment notes](../README.md#experiments).
