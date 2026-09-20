---
title: "Cua — Give AI agents computers they can use"
type: repo
year: 2026
category: agents
raw_path: raw/repos/trycua-cua.md
raw_filename: "trycua-cua.md"
source_collection: external
org: "trycua"
repo: "cua"
url: "https://github.com/trycua/cua"
license: "MIT"
tags: []
---

<div align="center">
  <a href="https://cua.ai" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" alt="Cua logo" width="150" srcset="img/logo_white.svg">
      <source media="(prefers-color-scheme: light)" alt="Cua logo" width="150" srcset="img/logo_black.svg">
      <img alt="Cua logo" width="150" src="img/logo_black.svg">
    </picture>
  </a>

  <p align="center"><strong>Give AI agents computers they can use.</strong><br>Cua provides open-source desktop automation, isolated cloud desktops, local macOS VMs, specialist decision models, and benchmarks for evaluating computer-use agents.</p>

  <p align="center"><strong><a href="https://run.cua.ai/?utm_source=github&utm_medium=referral&utm_campaign=fleet_activation&content_id=repo_readme" target="_blank" rel="noopener noreferrer">Try Cua Fleets now at run.cua.ai</a></strong></p>

  <p align="center">
    <a href="https://cua.ai" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/cua.ai-0ea5e9" alt="cua.ai"></a>
    <a href="https://discord.gg/mVnXXpdE85" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Discord-Join%20Server-10b981?logo=discord&logoColor=white" alt="Discord"></a>
    <a href="https://x.com/trycua" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/twitter/follow/trycua?style=social" alt="Twitter"></a>
    <a href="https://cua.ai/docs" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Docs-0ea5e9.svg" alt="Documentation"></a>
    <br>
<a href="https://trendshift.io/repositories/13685" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13685" alt="trycua%2Fcua | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
  </p>

</div>

## Choose your path

<div align="center">
  <table width="100%">
    <tr>
      <td colspan="2" align="center" valign="top" width="66.66%">
        <a href="#cua-fleets">
          <img src="img/card-cua-fleets-wide.gif" alt="Cua Fleets: isolated cloud desktops for your agents" width="100%">
        </a>
      </td>
      <td align="center" valign="top" width="33.33%">
        <a href="https://github.com/trycua/cua/tree/main/libs/cua-s1">
          <img src="img/card-cua-s1.gif" alt="CUA-S1: small, specialized models for computer use." width="100%">
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" width="33.33%">
        <a href="#cua-driver">
          <img src="img/card-cua-driver.gif" alt="Cua Driver: inspect and operate apps on macOS, Windows, and Linux" width="100%">
        </a>
      </td>
      <td align="center" valign="top" width="33.33%">
        <a href="#lume">
          <img src="img/card-cua-lume.gif" alt="Lume: local macOS and Linux VMs on Apple Silicon" width="100%">
        </a>
      </td>
      <td align="center" valign="top" width="33.33%">
        <a href="#cua-bench">
          <img src="img/card-cua-bench.gif" alt="Cua Bench: create tasks, evaluate agents, and export trajectories" width="100%">
        </a>
      </td>
    </tr>
  </table>
</div>

- **Cua Fleets:** [Provision a Linux desktop, run a command, and save a screenshot](https://cua.ai/docs/tutorials/your-first-cloud-fleet).
- **CUA-S1:** [Explore small, specialized models for computer-use decisions](#cua-s1).
- **Cua Driver:** [Operate Calculator and verify its result](https://cua.ai/docs/tutorials/drive-your-first-app).
- **Lume:** [Create a Tahoe VM and connect over SSH](https://cua.ai/docs/tutorials/create-your-first-lume-vm).
- **Cua Bench:** [Create and verify a simulated task](https://cua.ai/docs/tutorials/your-first-cua-bench-task).

Bring your own agent and model, or explore CUA-S1 for specialized decisions. Cua provides the computer and automation tools. [Computer-Use 2.0](https://cua.ai/docs/concepts/what-is-computer-use) describes an agent moving between code, APIs, and graphical interfaces within the same task.

## See Cua Driver in action

Two Cua Driver sessions select cells in LibreOffice Calc and objects in Inkscape on an Omarchy desktop while a terminal stays in the foreground. Watch the 50-second demo, then explore [Omarchy on Fleet](https://cua.ai/docs/how-to-guides/sandbox/run-omarchy-on-cloud-fleet).

https://github.com/user-attachments/assets/b4e5517c-d2db-4758-b4cf-07131b0753b2

---

## Cua Fleets

Provision isolated cloud desktops at [run.cua.ai](https://run.cua.ai/?utm_source=github&utm_medium=referral&utm_campaign=fleet_activation&content_id=repo_readme). A Fleet maintains sandbox capacity; your code claims a desktop from a pool and uses the Sandbox SDK to run commands, capture screenshots, and interact with apps inside it.

**Your first result:** provision a Linux desktop, run `uname -a`, save a screenshot, and delete the cloud resources. The tutorial covers Fleet credentials, dependencies, and cleanup. Pools can retain paid capacity after a claim ends, so follow its cleanup steps.

Local sandboxes and Fleets share the Sandbox SDK, but credentials, images, operations, and runtime requirements differ. Use the [runtime support reference](https://cua.ai/docs/reference/sandbox-sdk/runtime-support) to choose an environment. For your own hardware, see [Manage local sandbox lifecycle](https://cua.ai/docs/how-to-guides/sandbox/manage-local-lifecycle).

**[Your first Cloud Fleet](https://cua.ai/docs/tutorials/your-first-cloud-fleet)** | **[Fleet overview](https://cua.ai/docs/cloud-fleets)** | **[Sandbox SDK reference](https://cua.ai/docs/reference/sandbox-sdk)**

---

## Cua Driver

Give your agent tools to inspect and operate native desktop apps and browsers on macOS, Windows, and Linux. Connect through the CLI, MCP, or typed SDKs. Background delivery lets agents work without moving your pointer or taking focus when the app and platform support it; see [platform support](https://cua.ai/docs/reference/cua-driver/platform-support) for the boundaries.

**macOS / Linux**

```sh
/bin/bash -c "$(curl -fsSL https://cua.ai/driver/install.sh)"
```

**Windows (PowerShell)**

```powershell
irm https://cua.ai/driver/install.ps1 | iex
```

**Your first result:** connect your agent, ask it to compute 6 × 7 in Calculator, and have it verify that the app displays 42. The tutorial covers platform setup, permissions, and agent connection.

**[Drive your first app](https://cua.ai/docs/tutorials/drive-your-first-app)** | **[Installation](https://cua.ai/docs/how-to-guides/driver/install)** | **[CLI Reference](https://cua.ai/docs/reference/cua-driver/cli-reference)**

Using Claude Code, Codex, Cursor, OpenClaw, or another agent? [Find your integration](https://cua.ai/docs/how-to-guides/driver/connect-your-agent). Source documentation and architecture notes live in [`libs/cua-driver/README.md`](libs/cua-driver/README.md).

---

## CUA-S1

CUA-S1 is our family of small, specialized System 1 models for computer use. We use "System 1" as an engineering analogy for fast, bounded decisions, such as choosing which value belongs in a field or whether to leave an element alone. It is not a strict classification of model architectures or a replacement for a general-purpose agent's planning and reasoning.

The first research profile focuses on forms: scoring decisions from structured interface elements and document values rather than generating a response token by token. Application code orders the actions, and the optional Cua Driver integration handles execution with explicit action boundaries.

The project includes Python model code, synthetic-data generation, training, and evaluation. The GitHub component is an early, source-only research release; model weights are hosted separately on Hugging Face. The source is MIT-licensed. Check each model and dataset card for its scope, limitations, and artifact-specific license.

**[Explore CUA-S1](libs/cua-s1)** | **[Model card](libs/cua-s1/MODEL_CARD.md)** | **[Safety and deployment guidance](libs/cua-s1/SECURITY.md)**

**CUA-S1-FORMS on Hugging Face:** **[Model weights](https://huggingface.co/cua-ai/cua-s1-forms)** | **[Dataset](https://huggingface.co/datasets/cua-ai/cua-s1-forms)**

---

## Lume

Create and manage local macOS and Linux VMs on Apple Silicon using Apple's Virtualization.Framework.

```bash
/bin/bash -c "$(curl -fsSL https://cua.ai/lume/install.sh)"
```

**Your first result:** create a vanilla macOS Tahoe VM from an Apple restore image, start it, and connect over SSH. The tutorial uses the Lume CLI directly and explains the unattended setup defaults.

**[Create your first Lume VM](https://cua.ai/docs/tutorials/create-your-first-lume-vm)** | **[Installation](https://cua.ai/docs/how-to-guides/lume/install-lume)** | **[CLI reference](https://cua.ai/docs/reference/lume/cli-reference)**

---

## Cua Bench

Build computer-use tasks, evaluate agents, and export trajectories for training. Start with a simulated task that requires no VM, Docker, or model API key.

With Python 3.12 or 3.13 and [uv](https://docs.astral.sh/uv/) installed:

```bash
uv tool install 'cua-bench[browser]'
uv tool run --from 'cua-bench[browser]' playwright install chromium
```

**Your first result:** create a small task, run its reference solution, and verify that its evaluator reports a reward of `1.0`. Then try the same task yourself.

**[Build your first task](https://cua.ai/docs/tutorials/your-first-cua-bench-task)** | **[What is Cua-Bench?](https://cua.ai/docs/concepts/what-is-cua-bench)** | **[CLI reference](https://cua.ai/docs/reference/cua-bench/cli-reference)** | **[Partner with us](https://cuabench.ai/)**

---

## Resources

- [Documentation](https://cua.ai/docs) — Guides, examples, and API reference
- [Blog](https://cua.ai/blog) — Tutorials, updates, and research
- [Discord](https://discord.com/invite/mVnXXpdE85) — Community support and discussions
- [GitHub Issues](https://github.com/trycua/cua/issues) — Bug reports and feature requests
- [Security](SECURITY.md) — Private vulnerability reporting

## Citation

If Cua supports your research, please cite the software:

```bibtex
@software{cua2025,
  author  = {{Cua AI, Inc.}},
  title   = {Cua},
  year    = {2025},
  url     = {https://github.com/trycua/cua},
  license = {MIT}
}
```

For reproducibility, include the Cua release or commit used in your experiments. Citation metadata is also available in [`CITATION.cff`](CITATION.cff).

## Contributing

We welcome contributions! See our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

MIT License — see [LICENSE](LICENSE.md) for details.

Third-party components have their own licenses:

- [Kasm](libs/kasm/LICENSE) (MIT)
- [OmniParser](https://github.com/microsoft/OmniParser/blob/master/LICENSE) (CC-BY-4.0)
- Optional `cua-agent[omni]` includes ultralytics (AGPL-3.0)

## Trademarks

Apple, macOS, Ubuntu, Canonical, and Microsoft are trademarks of their respective owners. This project is not affiliated with or endorsed by these companies.

---

## Sponsors

<div align="center">

Thank you to all our [GitHub Sponsors](https://github.com/sponsors/trycua)!

|                                                       [Adam Cohen Hillel](https://github.com/adamcohenhillel)                                                        |                                                         [CodeRabbit](https://github.com/coderabbitai)                                                         |                                                         [Zephyr Cloud IO](https://github.com/ZephyrCloudIO)                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/adamcohenhillel"><img src="https://avatars.githubusercontent.com/u/633840?s=128&v=4" alt="Adam Cohen Hillel" width="64" height="64"></a> | <a href="https://github.com/coderabbitai"><img src="https://avatars.githubusercontent.com/u/132028505?s=128&v=4" alt="CodeRabbit" width="64" height="64"></a> | <a href="https://github.com/ZephyrCloudIO"><img src="https://avatars.githubusercontent.com/u/144168943?s=128&v=4" alt="Zephyr Cloud IO" width="64" height="64"></a> |

</div>


---

<!-- SUBREADME: libs/cua-driver/README.md -->

# Cua Driver

Background computer-use driver for any agents. Speaks MCP over stdio; drives native macOS apps without stealing focus.

See [MCP protocol and skills](docs/mcp-protocol-and-skills.md) for the modern
stdio profile, legacy compatibility, bundled skill resources, and HTTP limits.

**[Documentation](https://cua.ai/docs/cua-driver)** - Installation, guides, and API reference.

## Integration surfaces

- **Cua as an agent MCP or CLI:** MCP-capable agents connect directly to
  `cua-driver mcp`; shell-oriented agents and automation can use
  `cua-driver call`. No generated Cua language client is required.
- **Cua as an application SDK:** Python applications import `cua_driver`;
  TypeScript applications import `@trycua/cua-driver`. Both package roots call
  the same in-process native runtime through generated UniFFI bindings. The
  safe Rust SDK and generated bindings sit above a versioned C ABI; they do not
  require a daemon for direct application use.

The language packages are for client applications, not agents. They contain no
language-native MCP facade and have no `/sdk`, `/mcp`, or `/native` public
suffix. MCP remains implemented by the `cua-driver` executable as the
runtime-neutral agent boundary.

## Computer History macOS preview

Nightly macOS builds can provide an opt-in, encrypted history of actions
performed through Cua Driver. The preview stores a strict metadata allowlist,
stays local, and exposes permission-gated `history_status` and `history_query`
tools for read-only agent hydration. It never stores screenshots, typed text,
clipboard contents, raw arguments or results, accessibility trees, paths,
window titles, or URLs.

See [Try the Computer History macOS
preview](docs/computer-history-preview.md) for installation, lifecycle,
inspection, deletion, and stable-channel return instructions. The [architecture
and staged plan](docs/computer-history-architecture.md) defines the format,
security boundary, release gates, and later NVIDIA OpenShell integration.

## Permission modes

`standard` is the promptless default for normal automation. `bounded` admits
only the tools and resources in a reviewed manifest. `unrestricted` requires
`--dangerously-bypass-approvals`.

The mode belongs to the process that owns the runtime and is fixed at launch:
`cua-driver serve` takes the flags, while `cua-driver mcp` and embedding hosts
use the matching `CUA_DRIVER_PERMISSION_MODE`,
`CUA_DRIVER_CAPABILITY_MANIFEST_FILE`, and
`CUA_DRIVER_CAPABILITY_MANIFEST_APPROVED` variables. Choose it before starting
the daemon; a running daemon must be restarted to change it.

Attaching to an existing logged-in Chromium profile remains explicit:

```bash
cua-driver mcp --grant existing-profile
```

An embedding application can instead provide `DriverAuthorizationHost`, and a
bounded runtime can declare `kind: existing_profile` in its manifest. Cua
Driver does not render its own authorization modal or banner.

See the hosted [permission mode
reference](https://cua.ai/docs/reference/cua-driver/permission-modes).

## Repository Layout

| Path                            | Purpose                                                                |
| ------------------------------- | ---------------------------------------------------------------------- |
| `rust/`                         | Cargo workspace for the daemon, UniFFI SDK, platform crates, and tests |
| `python/`                       | Python SDK, bundled-binary wrapper, and package tests                  |
| `contract/`                     | Experimental generated SDK contract and fixtures                       |
| `typescript/`                   | Generated TypeScript SDK                                               |
| `tests/fixtures/`               | Source-built GUI harness apps and shared fixtures                      |
| `rust/crates/cua-driver/tests/` | Rust integration tests for the driver and GUI harnesses                |
| `scripts/`                      | Install, uninstall, local build, and VM sync helpers                   |
| `docs/`                         | Small repo-local specs that are not part of the hosted docs site       |

Start with `rust/README.md`, `rust/crates/cua-driver/tests/README.md`, and
`tests/fixtures/README.md` when changing driver behavior or tests.

The contract-first SDK architecture is documented in
[`contract/README.md`](contract/README.md). The Rust contract crate generates
the checked-in manifest and supplies the typed inputs used by the live daemon
and UniFFI SDK.

The imported SDK bindings are generated by
`scripts/generate-uniffi-bindings.mjs`. `CuaDriver.create()` loads the native
runtime in the application process; the daemon-compatible `connect()` path is
retained for external clients. The stable native boundary is declared in
[`rust/include/cua_driver_abi.h`](rust/include/cua_driver_abi.h). That header is
generated from the Rust `#[repr(C)]` exports with
`cargo run -p cua-driver-bindgen --bin cua-driver-abi-header`; CI runs the same
command with `--check` so the implementation and distributed header cannot
drift. UniFFI separately generates its private FFI scaffolding and the Python
and TypeScript SDK bindings; that implementation-specific scaffolding is not
the stable public `cua_driver_*_v1` C contract.
Python wheels and the root/native npm packages are assembled from the same
`cua-driver-rs-v*` release artifacts and publish with the exact Rust release
version; `.github/scripts/validate_release_versions.py` rejects source drift.

For direct agent integrations, see the
[`examples/agent-sdks`](examples/agent-sdks/README.md) Codex and Claude Agent
SDK examples. They connect the agent to `cua-driver mcp` without importing a
generated Cua client.

## Muse Code

[Muse Code](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2)
can use Cua Driver as a local stdio MCP server on macOS and Linux. Merge the
following entry into `$XDG_CONFIG_HOME/muse/settings.json`, or
`~/.config/muse/settings.json` when `XDG_CONFIG_HOME` is not set:

```json
{
  "mcp_servers": {
    "cua-driver": {
      "enabled": true,
      "transport": "stdio",
      "command": "/absolute/path/to/cua-driver",
      "args": ["mcp"]
    }
  }
}
```

Use the installed binary's absolute path, which `command -v cua-driver` prints.
Merge the `cua-driver` entry with any existing `mcp_servers` instead of
replacing the settings file. Start a new Muse session after saving the file;
Muse loads MCP servers at session startup.

Contributor documentation:

- `docs/cursor-themes.md` documents the default semantic cursor and custom
  dotLottie authoring contract.
- `docs/test-matrix.md` maps unit and canonical harness E2E suites.
- `docs/action-support.md` is the empirical platform behavior ledger.
- `docs/test-harnesses-guide.md` explains fixture and runner ownership.
- `docs/linux-desktop-validation.md` covers representative Linux sessions.
- `docs/linux-support-completion-plan.md` preserves the historical Linux plan.

## Claude Code computer-use compatibility

Standard Claude Code MCP registration:

```bash
claude mcp add --transport stdio cua-driver -- cua-driver mcp
```

If you want Claude Code's vision/computer-use-style flow to ground on CuaDriver window screenshots, register the compatibility mode:

```bash
claude mcp add --transport stdio cua-computer-use -- cua-driver mcp --claude-code-computer-use-compat
```

This keeps CuaDriver's normal MCP tools and changes only `screenshot`, which requires `pid` and `window_id` and captures that window only.

Use MCP for this Claude Code vision/computer-use-style path. CLI screenshots still work as CuaDriver calls, but they do not expose the `mcp__cua-computer-use__screenshot` tool name that Claude Code appears to use as the image-grounding cue.

## macOS process identity and permissions

macOS attributes Accessibility and Screen Recording grants to a responsible app identity, not simply to an executable path. Use one of these supported launch modes:

- **Standalone:** install `CuaDriver.app`, grant permissions to it, and start its daemon with `open -n -g -a CuaDriver --args serve`. The installed `cua-driver mcp` CLI may proxy through this daemon automatically.
- **Explicit direct MCP:** `cua-driver mcp --direct` makes the MCP process own
  its runtime. On macOS this deliberately uses the spawning host's TCC
  attribution and does not provide the AppKit cursor overlay without a
  certified host adapter.
- **Embedded:** have the macOS app that owns the grants use the generated `EmbeddedCuaDriverHost` to spawn a private daemon and return both SDK and MCP connection details. The daemon stays in the app's responsibility chain and inherits its grants. A gateway, terminal, or unrelated helper must not spawn the daemon on the app's behalf. `@trycua/cua-driver/embedded` is an organizational alias for the same Rust host exported at the package root; it has no separate lifecycle implementation.

Directly spawning a raw `cua-driver serve` outside `CuaDriver.app` without embedded mode is unsupported: it has no stable bundle identity for TCC attribution. Do not grant permissions to arbitrary binary paths or rely on that configuration in production. See [`rust/Skills/cua-driver/EMBEDDING.md`](rust/Skills/cua-driver/EMBEDDING.md) for the embedding contract and examples.

## Publishing the agent skill to ClawHub

The canonical skill source is `rust/Skills/cua-driver`. It is published as one
cross-platform ClawHub skill at `@cua/driver`; the bundle includes the
macOS, Windows, and Linux documents. Direct installs through `cua-driver skills
install` still keep only the host OS document unless `--all-platforms` is used.

ClawHub releases have their own explicit license boundary. The repository stays
under MIT, while every skill copy published through ClawHub is distributed
under MIT-0. Before a release, retain an internal record that Cua AI has the
right to distribute every bundled file under MIT-0.

Pull requests that change the skill run a publish dry-run with the pinned
ClawHub CLI. A real release is available only through the
`ClawHub: cua-driver skill` workflow's manual dispatch. The publish job requires
all of the following:

1. Dispatch the workflow from `main`.
2. Enter a version that matches both `rust/Cargo.toml` and the `version` field
   in `rust/Skills/cua-driver/SKILL.md`.
3. Confirm the MIT-0 rights check in the workflow form.
4. Configure a repository Actions secret named `CLAWHUB_TOKEN` for a publisher
   that can release under the selected owner. The default owner is `cua`.

The workflow pins the ClawHub CLI, records the source repository, commit, ref,
and path, and uploads the JSON publish result as an Actions artifact.

After publishing, inspect and scan the exact version, then install it into an
empty work directory:

```bash
npx --yes clawhub@0.23.1 inspect @cua/driver --version 0.8.3 --files
npx --yes clawhub@0.23.1 scan --slug driver --version 0.8.3 --update
npx --yes clawhub@0.23.1 --workdir /tmp/cua-driver-clawhub-smoke \
  install @cua/driver
```

Confirm that `MACOS.md`, `WINDOWS.md`, and `LINUX.md` are present, run
`cua-driver doctor`, and perform a read-only `list_apps` call through OpenClaw.
If a release is faulty, publish the last known-good content as a new patch
version. Do not delete the current latest version before a replacement exists.


---

<!-- SUBREADME: libs/cua-s1/README.md -->

# Cua-S1

Cua-S1 is a research project for studying small, specialist computer-use
models. The project is intentionally scoped around models that perform a
defined class of interface tasks rather than a generally capable computer-use
agent.

The first checkpoint in the project family is `cua-s1-form-v0`, a specialist
checkpoint for research on form-oriented user-interface tasks. It should not be
treated as a general-purpose assistant or as evidence of reliable performance
outside its evaluated task and environment boundaries.

## Project status

Cua-S1 is at an early research stage. This component includes Python model,
synthetic-data, training, evaluation, and optional Cua Driver integration code.
It does not include or download model weights, datasets, demo binaries, or
recordings. No checkpoint performance claim is established by this source-only
release.

Before evaluating or using a checkpoint, read [`MODEL_CARD.md`](MODEL_CARD.md)
for its intended scope and limitations and [`SECURITY.md`](SECURITY.md) for
deployment guidance.

The source code in this component is available under the repository's MIT
license. That license does not apply to future official model weights,
datasets, hosted services, or Cua trademarks. A future checkpoint may permit
research and evaluation while requiring a separate agreement for commercial
production use; its release must state those artifact-specific terms clearly.

## Python package

The Python distribution is named `cua-s1`, and its import name is `cua_s1`.
This source-only change does not publish the distribution to a package index.

Install the standalone development environment from this component:

```bash
uv sync --project libs/cua-s1/python --extra pdf --group test
uv run --project libs/cua-s1/python pytest libs/cua-s1/python/tests
```

The package exposes research primitives without downloading a model:

```python
import cua_s1

print(cua_s1.__version__)
```

Loading a checkpoint requires a local `safetensors` file and matching JSON
configuration. Pickle-based PyTorch checkpoints are rejected.

## Safety boundary

Planning and execution are separate. The optional runtime defaults to a dry
run, requires one unambiguous target window, uses snapshot-bound element
tokens, and reobserves the window after each mutation. `execute` and `submit`
are independent opt-ins. PDF access is confined to configured allowed roots.
Without explicit configuration, the library and MCP server use their current
working directory as the allowed root. Production deployments should use a
dedicated, least-privilege directory.

Submission is deliberately narrow: `submit=true` permits at most one
high-confidence `Button` or `AXButton` whose normalized label is exactly
`Submit` or `Submit Form`. Other click decisions are omitted. Inspect the
dry-run plan before enabling both execution flags.

## Optional MCP server

The `cua-s1-mcp` command is an advanced integration surface, not a configured
model service. Install the optional dependencies before running it:

```bash
uv sync --project libs/cua-s1/python --extra mcp --extra pdf
```

The server uses the MCP stdio transport and requires these host settings:

- `CUA_S1_PLANNER_FACTORY` identifies trusted Python code in
  `module:attribute` form. Importing the factory executes code with the server
  process's privileges, so do not point it at untrusted modules.
- `CUA_S1_ALLOWED_PDF_ROOTS` is an operating-system path-separated list of
  directories that the server may read. If it is unset, the server uses its
  current working directory.
- `CUA_S1_DRIVER_BINARY`, `CUA_S1_DRIVER_TRANSPORT`, and `CUA_S1_SESSION` can
  override the Cua Driver executable, transport, and session.

The connected Cua Driver must provide exact-window snapshots, snapshot-bound
element tokens, and confirmed action effects. The portable Cua Driver contract
does not currently expose `set_value`, so fill execution fails closed unless
the connected runtime explicitly advertises compatible token-based value
mutation. Planning remains available without executing mutations.

Treat MCP tool results and stdio logs as sensitive. They can contain values
extracted from PDFs, form labels, window metadata, and values selected for
entry.

## Checkpoints

| Checkpoint | Scope | Status |
| --- | --- | --- |
| `cua-s1-form-v0` | Form-oriented computer-use research | Profile defined; weights not distributed |

Checkpoint-specific release materials should document the exact artifact,
runtime requirements, evaluation setup, results, and applicable terms. Do not
assume that results transfer across applications, operating systems, languages,
layouts, accessibility settings, or task distributions.

## Evaluation

The included offline metrics distinguish accuracy, abstention, coverage, wrong
actions, wrong targets, and actions taken when the expected behavior was to
abstain. Synthetic train, validation, and test splits are separated by form
signature. A future checkpoint release must add an untouched holdout, artifact
hashes, exact environment details, and independently reproducible results.

## Responsible use

Run computer-use models in isolated environments with least-privilege
credentials, explicit action boundaries, and independent verification of
important outcomes. Require human review before consequential, irreversible,
financial, legal, medical, account, permission, or external-communication
actions.

Report suspected vulnerabilities through the process in
[`SECURITY.md`](SECURITY.md).


---

<!-- SUBREADME: libs/cua-bench/README.md -->

# cua-bench

Framework for benchmarking Computer-Use Agents with verifiable cross-platform environments.

**[Documentation](https://cua.ai/docs/cuabench)** - Installation, guides, and API reference.

## Running Tests

The test suite covers the core gym interface, worker system, and benchmark runners.

### Install dev dependencies

```bash
uv pip install -e ".[dev,browser,server,rl]"
```

Note: The `browser` extra installs Playwright for e2e tests with the simulated provider.

### Run all tests

```bash
uv run --with pytest pytest cua_bench/tests/ -v
```

### Run specific test modules

```bash
# Core gym interface (make, reset, step, evaluate)
uv run --with pytest pytest cua_bench/tests/test_gym_interface.py -v

# HTTP worker client (/reset, /step endpoints)
uv run --with pytest pytest cua_bench/tests/test_worker_client.py -v

# Worker server endpoints and action serialization
uv run --with pytest pytest cua_bench/tests/test_worker_server.py -v

# Benchmark runner functions
uv run --with pytest pytest cua_bench/tests/test_run_benchmark.py -v

# Worker manager (spawning/managing workers)
uv run --with pytest pytest cua_bench/tests/test_worker_manager.py -v

# Action parsing
uv run --with pytest pytest cua_bench/tests/test_actions.py -v
```

### Run tests with coverage

```bash
uv run --with pytest --with pytest-cov pytest cua_bench/tests/ -v --cov=cua_bench --cov-report=term-missing
```

## Test Structure

| Test Module              | What it Tests                                                     | Approach                                                                  |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `test_gym_interface.py`  | Core Environment API: `make()`, `reset()`, `step()`, `evaluate()` | **E2E** - Real simulated (Playwright) environments                        |
| `test_worker_client.py`  | HTTP client for worker servers (`CBEnvWorkerClient`)              | **Mock server** - Uses `@patch("requests.post")` to mock HTTP responses   |
| `test_worker_server.py`  | FastAPI endpoints and action serialization                        | **Unit** - Action serialize/deserialize, request models, simple endpoints |
| `test_run_benchmark.py`  | `run_benchmark()`, `run_single_task()`, `run_interactive()`       | **E2E** - Real simulated (Playwright) environments                        |
| `test_worker_manager.py` | Workers + dataloader training loop                                | **E2E** - Real workers, real envs, mock model for actions                 |
| `test_actions.py`        | Action string parsing (`repr_to_action()`)                        | **Unit** - Pure function tests                                            |

### Test Approach Philosophy

- **E2E tests** use real simulated (Playwright) environments. The `simulated` provider is fast enough for testing.
- **Mock server tests** (`test_worker_client.py`) mock HTTP responses to test client logic in isolation.
- **Mock model** (`test_worker_manager.py`) uses a mock model that returns simple actions to test the dataloader training loop without requiring a real ML model.

## Infrastructure Benchmarking

Measure the throughput of the worker infrastructure:

```bash
uv run python -m cua_bench.scripts.benchmark_workers --num_workers 16 --num_steps 10
```

Options:

| Flag            | Default | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| `--num_workers` | 16      | Number of parallel workers                     |
| `--num_steps`   | 10      | Steps per worker                               |
| `--task_path`   | None    | Path to task directory (creates temp if empty) |

Output:

- Average reset time
- Average step time
- Average finish time
- Step throughput (steps/sec)


---

<!-- SUBREADME: libs/lume/README.md -->

# Lume

CLI and framework for macOS and Linux VMs using Apple Virtualization Framework.

**[Documentation](https://cua.ai/docs/lume)** - Installation, guides, and API reference.

## Vanilla macOS VMs

Create a fresh macOS VM from an Apple restore image with the offline unattended
setup enabled:

```bash
lume create macos-tahoe --ipsw ~/Downloads/macos-tahoe.ipsw --unattended tahoe
lume run macos-tahoe
```

The built-in `sequoia` and `tahoe` presets configure the installed guest
without GUI automation. They create the `lume` user, enable SSH, configure
autologin, and disable sleep and screen locking. The default SSH credentials
are `lume` / `lume`.

Tahoe is E2E verified from a local IPSW. Sequoia can still present the
Accessibility step of Setup Assistant on its first display boot; this is
tracked in [#2155](https://github.com/trycua/cua/issues/2155).

To use the other built-in preset, replace `tahoe` with `sequoia` in the
`--unattended` option and choose a matching VM name.

## Optional dependencies

The `lume sip` command uses `vncdotool` to control macOS Recovery over VNC.
Install it only if you need to enable or disable SIP:

```bash
pip3 install vncdotool
```

Other Lume commands do not require this package.

## Telemetry

Lume telemetry is enabled by default and records pseudonymous installation,
release, command, and API-event metadata. It does not collect prompts,
VM/image names, file paths, command arguments, or VM contents.

```bash
lume config telemetry status
lume config telemetry disable
lume config telemetry enable
lume config telemetry reset-id
```

`LUME_TELEMETRY_ENABLED` overrides the persisted preference for the current
process. A normal uninstall preserves the preference and pseudonymous installation
ID so a reinstall is recognized as returning. `uninstall.sh --purge` deletes
the ID, markers, configuration, cache, and VMs.

See [Telemetry and privacy](../../docs/content/docs/reference/lume/telemetry.mdx)
for the exact schema-v3 events, integrity controls, and excluded data.
