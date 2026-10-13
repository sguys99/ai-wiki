---
title: "HomeBody: A Humanoid That Explores, Remembers, and Acts on Its Own"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/stanford-tml-homebody.md
raw_filename: "stanford-tml-homebody.md"
source_collection: external
org: "Stanford-TML"
repo: "homebody"
url: "https://github.com/Stanford-TML/homebody"
license: "Apache-2.0"
fetched_at: "2026-10-14"
tags: []
---

> 수집 메모: 사용자의 명시적 지시로 GitHub raw URL에서 가져왔다 (CLAUDE.md rule #1 자료 수집 예외). 기본 브랜치 main, 저장소 생성 2026-09-26, 마지막 commit 2026-10-13, GitHub API license 필드 Apache-2.0. 아래는 최상위 README 전문, 에이전트 문맥 문서 CLAUDE.md, VLM 지시문(src/homebody/vlm/agent_prompt.md), Robot 프로토콜과 스킬 계약·레지스트리, 기본 설정(session/config.py), 시뮬레이션 설정과 평가 wave 설정, real 백엔드 placeholder, pyproject.toml, NOTICE와 THIRD_PARTY_NOTICES, LICENSE, 파일 트리(메시 파일 생략), 세 스킬 모듈의 선언부 발췌를 원문 그대로 이어 붙인 것이다.


# README.md

<h1 align="center">HomeBody: A Humanoid That Explores, Remembers, and Acts on Its Own</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/gio-huh-789188374/">Gio Huh</a><sup>1,2</sup> &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/caydengu/">Cayden Gu</a><sup>2</sup> &nbsp;&nbsp;
  <a href="https://www.takaratruong.com/">Takara E. Truong</a><sup>2</sup> &nbsp;&nbsp;
  <a href="https://profiles.stanford.edu/c-karen-liu">C. Karen Liu</a><sup>2,†</sup> &nbsp;&nbsp;
  <a href="https://guytevet.github.io/">Guy Tevet</a><sup>2,†</sup>
</p>

<p align="center">
  <sup>1</sup> Caltech &nbsp; <sup>2</sup> Stanford University &nbsp; <sup>†</sup> Equal advising
</p>

<p align="center">
  <a href="https://tml.stanford.edu/homebody/">
    <img src="https://img.shields.io/badge/Project_Page-8C1515?style=for-the-badge" alt="Project Page">
  </a>
</p>

<p align="center">
  <img src="docs/figures/overview-full.webp" alt="HomeBody overview: explore and collect scene data, reconstruct the kitchen, and deploy humanoid skills in the real world." width="100%">
</p>

### Code release schedule

| Target date | Release | Scope | Status |
|---|---|---|---|
| October 5, 2026 | **SIM** | Simulation environment with navigation and pick-and-place. | Released |
| October 16, 2026 | **REAL2SIM** | Exploration and scene-reconstruction pipeline. | Planned |
| October 23, 2026 | **REAL** | Real-world deployment code and setup instructions. | Planned |

## Installation

**1.** Get the code and create a Python 3.11+ environment:
```bash
git clone https://github.com/Stanford-TML/homebody.git && cd homebody
conda create -n homebody python=3.11 -y && conda activate homebody
```

**2.** Install the package (it brings MuJoCo, PyTorch and the console). Keep `-e`: it runs
from this folder's assets.
```bash
pip install -e .
```

**3.** Give it a model. Install and log in to one of the CLIs, or export an API key:
```bash
npm install -g @openai/codex && codex login               # for --model astra
npm install -g @anthropic-ai/claude-code && claude        # for --model opus, then /login
export OPENAI_API_KEY=...         # or ANTHROPIC_API_KEY=..., for the -api models
```

**4.** Check that everything is in place. `check` starts nothing, and `provider-check` sends the
model one short request:
```bash
homebody check
homebody provider-check --model astra
```

<details>
<summary>No GPU, or on a Mac?</summary>

A GPU is optional: the walking policy runs on the CPU when CUDA is missing. Rendering is
chosen for you (`egl` on Linux with a GPU, `osmesa` on Linux without one, `cgl` on macOS).
Set `MUJOCO_GL` to override it. Linux without a GPU needs `sudo apt install libosmesa6`, and
`pip install torch --index-url https://download.pytorch.org/whl/cpu` before step 2 skips the
large CUDA download. It runs on macOS (Apple silicon) and Linux.
</details>

## Usage

### 💻 SIM

The HomeBody agent drives a Unitree G1 humanoid through a real2sim kitchen in MuJoCo, one
skill at a time, deciding from the robot's camera, its map and its memory of the scene.
The walking policy, arms, Dex3 hands and every object are simulated with full physics.
The simulation reproduces the long-horizon runs in the SRC Kitchen.

**Try it out in interactive mode.** Open http://127.0.0.1:8080, type a task and press **Start task**
(the console has no login, so keep `--host` on localhost unless the network is trusted):
```bash
homebody --env src_kitchen --model astra
```

**Run one task without the console:**
```bash
homebody --headless --env src_kitchen --model opus --task "Put the coffee bags on the island and throw away the used cartons."
```

**Run headless with scripted moves** (no model, four objects moved in one run):
```bash
python tools/check_manipulation.py --sequence configs/continuous_four.json --no-visuals
```

**After a run.** Every run is saved under `runs/session-<time>-<id>/`.

```bash
run=$(ls -d runs/session-* | tail -1)   # the newest run
python tools/timeline.py $run            # step-by-step decisions and results
python tools/score_session.py $run       # did every object end up in place
python tools/compose_cockpit.py $run     # a replay video, cockpit.mp4
```

<details>
<summary>Things to try</summary>

Type any of these into the console, or pass one with `--task`. Each worked for both models
in every run (two runs per model, scored by `configs/waves/fun.json`).

- *The juice is for whoever sits at the round table nearest the recycling bin. Take it to them.*
- *Show the red and white carton to someone at the island, then put it back where it was.*
- *If the orange juice is next to the toaster, move it to the island; otherwise throw it away.*
- *Swap the two coffee bags between their counters.*
- *Throw away the carton that isn't orange juice.*

**Or give it a wrong memory.** Move an object before the run. The scan still describes and
places it where it was, so the model has to notice and go looking. This takes longer, often several
minutes of searching, and is the hardest test here. In recent runs Opus found the carton both
times, once after 29 minutes.
```bash
homebody --model opus --place-object juice_carton=3.19,3.42,-1.86 --task "Throw the orange juice carton in the recycling bin."
```
`--place-object` takes the object's map x and y in metres and its yaw in radians.
</details>

<details>
<summary>Models, environments and settings</summary>

**Models.** Pick one with `--model` (default `astra`). Each runs through its CLI with your
login, or with `-api` through the API with a key (e.g. `opus-api`). Only `astra` and `opus`
were validated, and smaller models fail more often.

| Codex (OpenAI) | Claude (Anthropic) |
|---|---|
| `astra`: GPT-6 Astra | `opus`: Claude Opus 5.5 |
| `sol`: GPT-5.6 Sol | `fable`: Claude Fable 5.1 |
| `luna`: GPT-5.6 Luna | `sonnet`: Claude Sonnet 5.5 |
| `terra`: GPT-5.6 Terra | `haiku`: Claude Haiku 4.5 |

**Environments.** Pick one with `--env <name>`. Each is a real2sim room, reconstructed from the real world,
in a folder under `assets/real2sim/`. For now there is `src_kitchen` (the default), a kitchen
with two coffee bags and two cartons, and more are coming soon.

**Settings.** Defaults are in `src/homebody/session/config.py`. `configs/simulation.toml` and
the scene's `settings.toml` override them, and `--settings my.toml` overrides those with
only the values it names.
</details>

### 📷 REAL2SIM

Coming soon.

### 🚀 REAL

Coming soon.

## Contributing

The skills, the grasp planner and the prompt are a working baseline with plenty of room to
grow, and every pull request and bug report helps.

<details>
<summary>How do I add a skill?</summary>

Write one module in `src/homebody/skills/`, for example `push.py`, and add its name to
`SKILLS` in `skills/registry.py`. The module declares

- `PROMPT`, one line starting with `push: ` that tells the model what the skill does and
  what arguments it takes
- `NEEDS`, the `Robot` commands it uses, and `FAILURES`, the result codes it can return
- `prepare(arguments, selected, current, planning)`, which plans from one camera frame
- `execute(plan, ctx)`, which runs the plan and returns a `Result`

`navigate.py`, `pick.py` and `place.py` are full examples. A skill talks to the robot only
through `Robot`, so it runs unchanged on a real backend, and its prompt line describes the
robot, not one kitchen or task.
</details>

<details>
<summary>How do I add a model?</summary>

A model from a service that is already supported (Codex, Claude Code, the OpenAI or Claude
API) is one line in `MODELS` in `src/homebody/session/config.py`.

A new service needs a provider, one class in `src/homebody/vlm/` with a `LABEL`, the
`EXECUTABLE` or API `KEY` it needs, and a `generate` method that sends the prompt and images
and returns a `Decision`. Add it to `PROVIDERS` in `vlm/catalog.py`. `vlm/claude.py` is a
short example.
</details>

<details>
<summary>How do I add a scene?</summary>

A scene is one folder under `assets/real2sim/`, run with `--env <folder>`. It needs
`scene.xml` (MuJoCo), `task_scene.json` (the robot's start and the movable objects),
`map.npz` (the navigation map), `physics.json` and `semantics.json` (the labels and
descriptions the model is given), and optionally a `settings.toml`. `src_kitchen/` is the
example to copy, and `tools/verify_assets.py` checks the files.
</details>

<details>
<summary>How do I add a robot backend?</summary>

Implement the `Robot` protocol in `src/homebody/primitives/robot.py`, nine members covering
time, camera frames, measurements and commands to the base, arms and hands.
`backends/mujoco.py` is the full simulator version; `backends/real.py` is an empty
placeholder. A hardware backend also needs capture timestamps, a deadman that stops the
base, an operator stop and calibration ([CLAUDE.md](CLAUDE.md) has the list).
</details>

<details>
<summary>How do I report a bug?</summary>

Open an issue with the command you ran, what you expected and what happened. If it happened
in a run, attach the output of `python tools/timeline.py runs/session-<time>-<id>` and, if
you can, the replay video from `tools/compose_cockpit.py`.
</details>

<details>
<summary>What is in this repository</summary>

| Path | What it is |
|---|---|
| `src/homebody/skills/` | The skills: `navigate`, `pick`, `place` |
| `src/homebody/vlm/` | The model providers and the prompt |
| `src/homebody/backends/` | The MuJoCo robot |
| `assets/` | The robot, its walking policy and the SRC Kitchen scene |
| `evaluation/` | The physics scorer |
| `tools/` | Checks, scoring, timelines and replays |

[CLAUDE.md](CLAUDE.md) explains how the code fits together.
</details>

## Bibtex

If you find this code useful in your research, please cite:

```bibtex
@misc{huh2026homebody,
  author = {Huh, Gio and Gu, Cayden and Truong, Takara E. and Liu, C. Karen and Tevet, Guy},
  title = {{HomeBody}: A Humanoid That Explores, Remembers, and Acts on Its Own},
  year = {2026},
  url = {https://tml.stanford.edu/homebody/}
}
```

## License

HomeBody is released under the [Apache License 2.0](LICENSE). Third-party components keep
their own licenses, listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

# CLAUDE.md

# Agent context: HomeBody SIM

A MuJoCo Unitree G1 that a vision-language model drives through skills in a real2sim
kitchen. The README's "SIM" section has install and run commands. The real-robot backend and
the scanning pipeline are the only parts not implemented yet; they come with the REAL2SIM
and REAL releases.

## Layout

| Path | What it is |
| --- | --- |
| `src/homebody/skills/` | The skills (`navigate.py`, `pick.py`, `place.py`), each one module: prompt line, arguments, `prepare` / `execute` / `abort`, declared failure codes. `registry.py` lists them. |
| `src/homebody/motion/` | Shared robot motions: `arm.py` (servos, joint streams, the one arm reset `reset_arm`), `carry.py` (holding, tucking, recovery). |
| `src/homebody/helpers/` | Pure math: geometry, kinematics, collision, grasp, navigation, trajectories. |
| `src/homebody/primitives/` | The robot interface (`robot.py` `Robot`), observation records, action limits, `NotReleased`. |
| `src/homebody/backends/` | `mujoco.py` implements `Robot` with physics; `real.py` is the real-G1 backend, not yet implemented, coming with the REAL release. |
| `src/homebody/vlm/` | Providers (Codex, Claude Code, two APIs), `catalog.py`, `agent_prompt.md`, what the model sees each turn (`observations.py`). |
| `src/homebody/session/` | The decision loop, settings (`config.py` defaults; `configs/simulation.toml` and a scene's `settings.toml` override), recording. |
| `src/homebody/ui/` | The live console (viser). |
| `src/homebody/real2sim/` | The scanning pipeline's stages (`explore`, `capture`, `reconstruct`, `package`, `validate`), not yet implemented, coming with the REAL2SIM release. |
| `assets/` | Robot model and calibration, the walking-policy weights, the SRC Kitchen scene package (`assets/real2sim/src_kitchen/`), `manifest.json` (hashes; `tools/verify_assets.py` checks it). |
| `evaluation/evaluate.py` | The independent physics scorer; reads only the recorded physics after a run. |
| `tools/` | Scripted checks (`check_manipulation.py`), waves of model runs (`run_wave.py`), scoring, timelines, cockpit replays, scene building. |
| `vendor/holosoma_inference/` | The walking-policy kernel, derived from Holosoma; its hashes are pinned in `assets/manifest.json`. |

## Rules that hold the design together

* **Skills reach the robot only through `Robot`.** No skill imports the simulator; a real
  backend must work without changing a skill.
* **The model gets the prompt and the images, nothing else.** No live object poses,
  simulator state or evaluator targets reach a prompt or a skill. Scan labels, anchors and the
  scan's own portable judgement go in as initial-scene memory, for every entity alike.
* **Prompts are general.** A skill's prompt line describes the robot, not this kitchen or
  these tasks: no scene nouns, no hints for one benchmark.
* **Extension is one place each:** a skill is one module plus a name in `SKILLS` (a skill
  with tunables also adds a settings group in `session/config.py` and `session/settings.py`);
  a provider is one class (`LABEL`, `EXECUTABLE` or `KEY`, `generate`) plus `PROVIDERS` in
  `vlm/catalog.py` and a `MODELS` row in `session/config.py`;
  a scene is one folder under `assets/real2sim/`; a backend implements `Robot`.
* **One arm reset.** Every return to rest goes through `motion/arm.reset_arm`, the same for
  both arms (y mirrored).
* **Comments stay short;** prose belongs in docstrings or the commit message.

## What a hardware backend must add around `Robot`

Capture timestamps (a frame's images, depth, joints and pose captured together, stamped at
capture; `advance` waits in real time), a deadman that stops the base when commands stop,
one commander at a time (an operator stop starts a new epoch and refuses older commands),
and calibration (arm limits, jaw samples, camera intrinsics and extrinsics). `__main__.py`
constructs `MujocoBackend` directly, and the session records simulator-only state for the
scorer, so a real backend needs those made optional first.

## Docs

`README.md` is the project page's README plus the SIM section, written for people: keep it
short, with detail in `<details>` drop-downs. `docs/` is the project website. `runs/` holds recordings and is never committed.

## Checking a change

`pytest tests`, `ruff check src tests tools`, `.venv/bin/homebody check`,
`.venv/bin/python tools/verify_assets.py`, and the scripted
four-object run `tools/check_manipulation.py --sequence configs/continuous_four.json
--no-visuals`, scored with `tools/score_session.py`. Model behaviour is measured as rates
over repeated `tools/run_wave.py` sessions, never from one run.

# src/homebody/vlm/agent_prompt.md

You control a humanoid robot through skills, one skill per turn, to carry out the operator's
current task. Decide from this prompt and the four attached images only:
1. the head camera's RGB image;
2. its depth preview: white is near, black is far or has no depth;
3. the static map of fixed obstacles: dark is blocked, light is free floor, blue is the robot
   and its heading;
4. this view's depth projected from above into the robot's torso frame (x ahead, y left, in
   metres): the top edge is x = {topdown.ahead[1]:g}, the bottom x = {topdown.ahead[0]:g},
   the left edge y = {topdown.left[1]:g}, the right edge y = {topdown.left[0]:g};
   white is unobserved, not free.

A click is [x, y] on the named image, from [0, 0] at its top-left to [1000, 1000] at its
bottom-right; clicks on images 1 and 4 hold only for this turn's view. World coordinates are
metres in the map's frame. The observation gives the base pose [x, y, yaw], yaw in radians
with 0 facing world +x and positive turning toward +y, and map_click_from_world: map click =
map_click_from_world · [x, y, 1]. The initial-scene memory describes the environment
as it was when it was scanned; it is not a live inventory. A map anchor is where the scan
saw a thing, and a portable object may have moved since, so update your belief from skill
results and the current view. Each recent step
gives the base pose it was decided from.

A skill ends with OK or a refusal code and a message; refusals are normal. done takes summary and ends the task: choose it
once the task is complete or cannot be completed, and say which in summary.

Reply with one JSON object: text, one short sentence on what you see that decides this step;
skill; and arguments_json, the skill's arguments as a JSON-encoded object.

# src/homebody/primitives/robot.py

```python
"""The robot interface skills use: an epoch, a clock, frames, measurements and five commands."""
from typing import Protocol, runtime_checkable

import numpy as np

from .observations import Frame, Measurement


@runtime_checkable
class Robot(Protocol):
    """Every command names its epoch. A refused command raises ActionRejected, and a robot
    that cannot continue without a reset raises PhysicsInvalid."""

    @property
    def epoch(self) -> int:
        """The command generation. A reset starts a new one and refuses older commands."""

    @property
    def time(self) -> float:
        """Seconds on the clock that stamps each Frame."""

    def snapshot(self) -> Frame:
        """The newest synchronized frame."""

    def measure(self) -> Measurement:
        """The newest joints, hands and poses, without rendering the camera."""

    def base_velocity(self, epoch: int, forward: float, lateral: float, yaw_rate: float) -> None:
        """Body-frame m/s and rad/s, dropped unless renewed within `physics.command_timeout`."""

    def arm_target(self, epoch: int, side: str, joints: np.ndarray) -> None:
        """One arm's seven joint positions in radians; the robot limits their rate and range."""

    def grip(self, epoch: int, side: str, closure: float) -> None:
        """One hand's closure: 0 open, 1 the calibrated close, up to `grasp.squeeze` beyond it."""

    def advance(self, epoch: int, seconds: float) -> None:
        """Block while SECONDS pass under the current commands: whole control periods, at most 1 s."""

    def stop(self, epoch: int) -> None:
        """Zero the base and hold both arms. The hands keep their closure."""

```

# src/homebody/skills/registry.py

```python
"""The registered skills by name. Naming a module `skills/<name>.py` in SKILLS registers it."""
from collections.abc import Mapping
from importlib import import_module

from .contract import declared

SKILLS = ("navigate", "pick", "place")


class Prompts(Mapping):
    """Each registered skill's PROMPT, read on access."""

    def __getitem__(self, name):
        return REGISTRY[name].PROMPT

    def __iter__(self):
        return iter(REGISTRY)

    def __len__(self):
        return len(REGISTRY)


REGISTRY = {name: declared(name, import_module(f".{name}", __package__)) for name in SKILLS}
PROMPTS = Prompts()

```

# src/homebody/skills/contract.py

```python
"""The skill protocol (NEEDS, FAILURES, PROMPT, prepare, execute, optional abort) and the
prepare/execute lifecycle every registered skill runs."""
import traceback
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field

from homebody.helpers.kinematics import Arm
from homebody.primitives.actions import ActionRejected, PhysicsInvalid
from homebody.primitives.observations import ObservationError
from homebody.primitives.robot import Robot
from homebody.session.settings import Settings

DECLARATIONS = ("NEEDS", "FAILURES", "PROMPT", "prepare", "execute")


class SkillFailure(RuntimeError):
    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


@dataclass(frozen=True)
class Result:
    """A skill's one terminal outcome, under its registered name."""
    skill: str
    code: str
    message: str
    details: dict = field(default_factory=dict)

    @property
    def ok(self):
        return self.code == "OK"


@dataclass(frozen=True)
class Planning:
    """What preparation reads besides frames."""
    arms: Mapping[str, Arm]
    jaw_samples: Mapping[str, list]
    settings: Settings
    carried: Mapping[str, dict]
    cancelled: Callable[[], bool] = lambda: False


@dataclass
class Context:
    """Execution's only handle on the robot."""
    observations: Robot
    actions: Robot
    arms: Mapping[str, Arm]
    settings: Settings = field(default_factory=Settings)
    jaw_samples: Mapping[str, list] = field(default_factory=dict)
    cancelled: Callable[[], bool] = lambda: False
    emit: Callable[[dict], None] = lambda event: None
    carried: dict = field(default_factory=dict)
    _skill_name: str | None = field(default=None, init=False, repr=False)
    _stage_name: str | None = field(default=None, init=False, repr=False)

    def planning(self):
        return Planning(self.arms, self.jaw_samples, self.settings, self.carried, self.cancelled)

    def stage(self, name):
        """Emit a stage event, once per distinct name."""
        if name != self._stage_name:
            self._stage_name = name
            self.emit({"type": "skill_stage", "skill": self._skill_name, "stage": name})

    def check(self, epoch):
        """End the skill as CANCELLED or STALE_EPOCH unless it may go on."""
        if self.cancelled():
            raise SkillFailure("CANCELLED", "Operator cancelled the skill")
        if epoch != self.observations.epoch:
            raise SkillFailure("STALE_EPOCH", "Scene changed; prepare a new action")

    def observe(self, epoch):
        """A current frame of EPOCH, or STALE_OBSERVATION."""
        frame = self._current(epoch, self.observations.snapshot)
        self.emit({"type": "observation", "frame": frame})
        return frame

    def measure(self, epoch):
        """The current measurements of EPOCH without the camera, or STALE_OBSERVATION."""
        return self._current(epoch, self.observations.measure)

    def _current(self, epoch, read):
        self.check(epoch)
        packet = read()
        self.check(epoch)
        if packet.epoch != epoch or not 0 <= self.observations.time - packet.time <= (
            self.settings.motion.observation_age
        ):
            raise SkillFailure("STALE_OBSERVATION", "Current sensor evidence is stale")
        return packet

    def advance(self, epoch, seconds=None):
        """Let SECONDS pass, one servo tick by default."""
        self.check(epoch)
        self.actions.advance(epoch, self.settings.servo.tick if seconds is None else seconds)
        self.check(epoch)


COMMON_FAILURES = ("CANCELLED", "STALE_EPOCH", "STALE_OBSERVATION", "INVALID_ARGUMENT",
                   "TARGET_LOST", "ACTION_REJECTED", "PHYSICS_INVALID", "COLLISION")


def declared(name, skill):
    """SKILL once its declarations fit the protocol under NAME, else TypeError."""
    missing = [declaration for declaration in DECLARATIONS if not hasattr(skill, declaration)]
    if missing:
        raise TypeError(f"Skill {name!r} does not declare {', '.join(missing)}")
    if not isinstance(skill.NEEDS, tuple) or not all(
            callable(getattr(Robot, command, None)) for command in skill.NEEDS):
        raise TypeError(f"Skill {name!r}: NEEDS must be a tuple of Robot commands: {skill.NEEDS!r}")
    if not isinstance(skill.FAILURES, tuple):
        raise TypeError(f"Skill {name!r}: FAILURES must be a tuple of result codes")
    if not skill.PROMPT.startswith(f"{name}: "):
        raise TypeError(f"Skill {name!r}: PROMPT must start with {name + ': '!r}")
    return skill


def refusal_code(error):
    """The declared code of a backend refusal."""
    return "PHYSICS_INVALID" if isinstance(error, PhysicsInvalid) else "ACTION_REJECTED"


class Runner:
    def __init__(self, context):
        self.context = context

    def run(self, name, arguments, selected_frame):
        """A declared result. A programming error propagates after the terminal event."""
        ctx = self.context
        ctx._skill_name, ctx._stage_name = name, None
        ctx.emit({"type": "skill_started", "skill": name, "frame_id": selected_frame.frame_id})
        attempt = Attempt(ctx, name, selected_frame)
        try:
            result = attempt.run(arguments)
        except BaseException as error:
            attempt.finish(Result(name, "ERROR", type(error).__name__, {"traceback": traceback.format_exc()}))
            raise
        return attempt.finish(result)


class Attempt:
    """One skill invocation and how far it got."""

    def __init__(self, ctx, name, selected_frame):
        from .registry import REGISTRY
        self.ctx, self.name, self.selected, self.epoch = ctx, name, selected_frame, selected_frame.epoch
        self.skill = REGISTRY.get(name)
        self.declared = COMMON_FAILURES + (() if self.skill is None else self.skill.FAILURES)
        self.plan, self.executing, self.aborting = None, False, False

    def run(self, arguments):
        """Prepare and execute, turning a typed failure into its declared result code."""
        try:
            return self.attempt(arguments)
        except SkillFailure as error:
            if error.code not in self.declared:
                raise RuntimeError(f"Skill raised an undeclared failure code: {error.code}") from error
            self.aborting = self.executing and error.code != "CANCELLED"
            return Result(self.name, error.code, str(error))
        except ObservationError as error:
            self.aborting = self.executing
            return Result(self.name, "TARGET_LOST" if self.executing else "INVALID_ARGUMENT", str(error))
        except (PhysicsInvalid, ActionRejected) as error:
            self.aborting = self.executing and not isinstance(error, PhysicsInvalid)
            return Result(self.name, refusal_code(error), str(error))

    def attempt(self, arguments):
        ctx = self.ctx
        ctx.stage("Preparing")
        if self.skill is None:
            raise SkillFailure("INVALID_ARGUMENT", f"Unknown skill {self.name!r}")
        current = ctx.observe(self.epoch)
        for command in self.skill.NEEDS:
            if not callable(getattr(ctx.actions, command, None)):
                raise SkillFailure("ACTION_REJECTED", f"Missing action capability: {command}")
        self.plan = self.skill.prepare(arguments, self.selected, current, ctx.planning())
        ctx.emit({"type": "skill_prepared", "skill": self.name, "plan": self.plan})
        ctx.check(self.epoch)
        self.executing = True
        result = self.skill.execute(self.plan, ctx)
        if result.skill != self.name or result.code not in {"OK", *self.declared}:
            raise RuntimeError("Skill returned an undeclared terminal result")
        return result

    def finish(self, result):
        """Abort if needed, hold or stop the base, and always emit the terminal event."""
        ctx = self.ctx
        try:
            if self.aborting and hasattr(self.skill, "abort"):
                result = aborted(self.skill, self.plan, ctx, result)
            if self.executing and ctx.observations.epoch == self.epoch:
                result = stopped(ctx, self.epoch, result)
        finally:
            ctx.emit({"type": "skill_finished", "result": result})
        return result


def aborted(skill, plan, ctx, result):
    """Run the skill's abort, keeping its own code and appending any abort problem to the message."""
    try:
        skill.abort(plan, ctx)
    except (SkillFailure, ObservationError, PhysicsInvalid, ActionRejected) as error:
        return Result(result.skill, result.code, f"{result.message}; abort: {error}", result.details)
    return result


def stopped(ctx, epoch, result):
    """Hold the base after success or stop everything after a failure. A rejected stop fails
    only a successful result."""
    try:
        if result.ok:
            ctx.actions.base_velocity(epoch, 0.0, 0.0, 0.0)
        else:
            ctx.actions.stop(epoch)
    except (PhysicsInvalid, ActionRejected) as error:
        return Result(result.skill, refusal_code(error) if result.ok else result.code,
                      f"{result.message}; stop rejected: {error}", result.details)
    return result


def side_argument(arguments):
    side = arguments.get("hand", "right")
    if side not in ("left", "right"):
        raise SkillFailure("INVALID_ARGUMENT", "hand must be left or right")
    return side


def click_argument(arguments, frame):
    point = arguments.get("point_normalized_1000")
    if (not isinstance(point, (list, tuple)) or len(point) != 2
            or any(type(value) not in (int, float) or not 0 <= value <= 1000 for value in point)):
        raise SkillFailure("INVALID_ARGUMENT", "point_normalized_1000 requires two numbers in [0, 1000]")
    u, v = frame.normalized_pixel(point)
    return frame.select(u, v), frame.point(u, v)

```

# src/homebody/session/config.py

```python
"""The simulation's settings. Each group is a frozen dataclass of defaults.
`configs/simulation.toml` overrides them by group and key, and a scene package's
`settings.toml` overlays that."""
from dataclasses import dataclass
from pathlib import Path

import numpy as np

DEFAULT_ENV = "src_kitchen"  # the environment a run uses unless --env names another
DEFAULT_SCENE = Path("assets/real2sim") / DEFAULT_ENV


@dataclass(frozen=True)
class Physics:
    """MuJoCo stepping and the simulated hand (`hand_kp` in N m/rad)."""
    timestep: float = 0.001
    control_hz: int = 250
    policy_hz: int = 50
    solver: str = "Newton"
    integrator: str = "Euler"
    # pyramidal cone at impratio 1 lets resting objects creep
    cone: str = "elliptic"
    impratio: float = 10.0
    noslip_iterations: int = 2
    hand_kp: float = 2.0
    hand_kd: float = 0.10
    hand_torque_fraction: float = 0.80
    hand_friction: tuple[float, float, float] = (4.0, 0.20, 0.020)
    hand_contact: tuple[float, float] = (0.004, 1.0)
    arm_rate: float = 0.525
    arm_authority_seconds: float = 2.0
    repeated_state_stop_ticks: int = 25
    hand_rate: float = 2.0
    command_timeout: float = 0.20
    min_base_height: float = 0.45
    max_base_height: float = 1.05
    max_tilt_degrees: float = 45.0

@dataclass(frozen=True)
class Camera:
    width: int = 640
    height: int = 480
    horizontal_fov: float = 69.0
    near: float = 0.02
    far: float = 15.0
    observer_width: int = 960
    observer_height: int = 540

@dataclass(frozen=True)
class Recording:
    """Sampling periods of the recorded streams, in simulation seconds. Each video plays at its sampling rate."""
    frame_period: float = 0.5
    room_period: float = 1.0
    shoulder_period: float = 0.25
    physics_period: float = 0.1
    publish_period: float = 0.5

@dataclass(frozen=True)
class Servo:
    tick: float = 0.04
    perception_period: float = 0.20
    position_gain: float = 2.0
    rotation_gain: float = 2.0
    max_linear_speed: float = 0.08
    max_angular_speed: float = 0.4
    damping_squared: float = 0.002
    max_joint_lag: float = 0.35
    rotation_tolerance: float = 0.12
    stable_frames: int = 3

@dataclass(frozen=True)
class Collision:
    cloud_margin: float = 0.008
    voxel_size: float = 0.01
    min_hit_voxels: int = 1
    joint_step: float = 0.04

@dataclass(frozen=True)
class Topdown:
    ahead: tuple[float, float] = (0.0, 1.05)
    left: tuple[float, float] = (-0.70, 0.70)
    height: tuple[float, float] = (-0.90, 0.60)
    pixels_per_metre: float = 760.0
    grid_metres: float = 0.10
    label_metres: float = 0.20
    chest_size: tuple[float, float] = (0.22, 0.26)

# name -> (provider, model id, CLI effort). "-api" names use a key, bare names a CLI login
MODELS = {
    "astra": ("codex", "gpt-6-astra", "high"),
    "astra-api": ("openai-api", "gpt-6-astra", None),
    "sol": ("codex", "gpt-5.6-sol", "high"),
    "sol-api": ("openai-api", "gpt-5.6-sol", None),
    "luna": ("codex", "gpt-5.6-luna", "high"),
    "luna-api": ("openai-api", "gpt-5.6-luna", None),
    "terra": ("codex", "gpt-5.6-terra", "high"),
    "terra-api": ("openai-api", "gpt-5.6-terra", None),
    "opus": ("claude-code", "claude-opus-5-5", "high"),
    "opus-api": ("claude-api", "claude-opus-5-5", None),
    "fable": ("claude-code", "claude-fable-5-1", "high"),
    "fable-api": ("claude-api", "claude-fable-5-1", None),
    "sonnet": ("claude-code", "claude-sonnet-5-5", "high"),
    "sonnet-api": ("claude-api", "claude-sonnet-5-5", None),
    "haiku": ("claude-code", "claude-haiku-4-5-20251001", "high"),
    "haiku-api": ("claude-api", "claude-haiku-4-5-20251001", None),
}


@dataclass(frozen=True)
class Agent:
    """The model, by one name from MODELS, and its limits. The robot stands `done_settle_seconds` after `done` before the final physics sample."""
    model: str = "astra"
    # "model" takes the model's own effort, max means Codex's xhigh
    reasoning_effort: str = "model"
    timeout: float = 180.0
    # retries of a busy service, after busy_wait, twice that, three times that seconds
    busy_retries: int = 3
    busy_wait: float = 20.0
    max_steps: int = 80
    done_settle_seconds: float = 3.0

    def __post_init__(self):
        if self.model not in MODELS:
            raise ValueError(f"agent.model must be one of {', '.join(MODELS)}")
        if self.reasoning_effort not in ("model", "low", "medium", "high", "xhigh", "max"):
            raise ValueError("agent.reasoning_effort must be model, low, medium, high, xhigh or max")

    @property
    def provider(self) -> str:
        return MODELS[self.model][0]

    @property
    def model_id(self) -> str:
        return MODELS[self.model][1]

    @property
    def effort(self) -> str:
        """The CLI effort level: the model's own unless reasoning_effort names a level."""
        return MODELS[self.model][2] if self.reasoning_effort == "model" else self.reasoning_effort


@dataclass(frozen=True)
class SharedMotion:
    arm_timeout: float = 15.0
    palm_tolerance: float = 0.015
    observation_age: float = 0.25


@dataclass(frozen=True)
class Navigate:
    """Drive speeds, stances and arrival. An arrival is verified within `arrival_distance`, or `arrival_distance + close_slack` once re-closed."""
    drive_speed: float = 0.35
    turn_speed: float = 0.45
    final_speed: float = 0.20
    loaded_drive_speed: float = 0.25
    loaded_turn_speed: float = 0.30
    min_close_speed: float = 0.15
    min_turn_speed: float = 0.15
    close_gain: float = 1.0
    heading_gain: float = 1.5
    turn_hold_gain: float = 1.0
    robot_radius: float = 0.28
    route_clearance_margin: float = 0.0
    stance_reach: float = 0.46
    stance_clearance: float = 0.15
    right_hand_offset: float = 0.14
    left_hand_offset: float = 0.14
    departure_distance: float = 0.30
    run_in_distance: float = 0.60
    aim_in_distance: float = 0.80
    goal_snap_max_distance: float = 2.0
    start_snap_distance: float = 0.15
    goal_snap_slack: float = 0.10
    facing_min_distance: float = 0.10
    waypoint_radius: float = 0.23
    route_lookahead: float = 0.50
    route_lateral_gain: float = 1.0
    turn_before_translate: float = 0.35
    stop_distance: float = 0.03
    arrival_distance: float = 0.10
    arrival_angle: float = 0.10
    settle_seconds: float = 1.0
    close_rounds: int = 3
    close_slack: float = 0.20
    close_min_gain: float = 0.02
    drive_timeout: float = 90.0
    stall_timeout: float = 6.0
    progress_distance: float = 0.03
    tick: float = 0.10


@dataclass(frozen=True)
class Grasp:
    """Grasp planning, approach and retention limits: the walk-in stands with the pre-grasp palm `grasp_range` from the shoulder, and a pick closes at least `squeeze` past where the fingers stopped."""
    shape_quantiles: tuple[float, float] = (0.02, 0.98)
    depth_max: float = 0.055
    depth_fraction: float = 0.5
    insertion_depth_scales: tuple[float, ...] = (1.0, 0.65, 0.3)
    approach_height: float = 0.10
    lift_height: float = 0.18
    lift_evidence: float = 0.05
    carry_palm_radius: float = 0.30
    carry_compact_min_delta: float = 0.03
    carry_compact_step: float = 0.01
    yaw_samples: int = 12
    finger_spread: float = 0.052
    pad_band: float = 0.015
    pad_band_points: int = 12
    approach_attempts: int = 2
    aperture_error: float = 0.008
    open_seconds: float = 1.0
    close_seconds: float = 1.5
    squeeze: float = 0.12
    target_shift: float = 0.08
    target_surface_tolerance: float = 0.015
    occlusion_min_rays: float = 0.4
    occlusion_missing_explained: float = 0.5
    occlusion_exposed_missing_max: float = 0.1
    occlusion_visible_match: float = 0.5
    occlusion_no_view_rays: float = 0.8
    hold_effort_fraction: float = 0.04
    hold_closure_gap: float = 0.04
    recovery_samples: int = 5
    recovery_confirmations: int = 3
    recovery_tick: float = 0.10
    recovery_separation: float = 0.08
    recovery_match: float = 0.05
    spline_out: tuple[float, ...] = (0.0, 0.10, 0.15)
    spline_over: tuple[float, ...] = (0.06, 0.10, 0.14)
    spline_descend: float = 0.08
    spline_samples: int = 4001
    spline_waypoints: int = 32
    spline_smooth_passes: int = 4
    spline_seed_bias: float = 0.75
    approach_start_lifts_m: tuple[float, ...] = (0.10, 0.20, 0.30)
    grasp_range: float = 0.36
    approach_short: float = 0.08
    approach_long: float = 0.03
    approach_across: float = 0.04
    approach_side: float = 0.24

    def __post_init__(self):
        if (min(self.grasp_range, self.approach_short, self.approach_long) <= 0
                or self.approach_across >= self.approach_side
                or min(self.approach_start_lifts_m, default=0) < 0):
            raise ValueError("Grasp range and approach band must be positive and ordered")


@dataclass(frozen=True)
class BlindFinish:
    """Limits on finishing a grasp whose target is partly visible or hidden by the arm: only the planned descent may continue, with the base and head still and the palm's travel budgeted."""
    partial_travel: float = 0.20
    occluded_reach: float = 0.30
    occluded_recency: float = 0.08
    travel_margin: float = 0.08
    palm_turn: float = 0.24
    base_turn: float = 0.10
    head_drift: float = 0.08
    head_turn: float = 0.24

    def __post_init__(self):
        if min(vars(self).values()) <= 0:
            raise ValueError("Blind finish limits must be positive")


@dataclass(frozen=True)
class Placement:
    release_height: float = 0.015
    withdraw_height: float = 0.03
    withdraw_back: float = 0.05
    withdraw_clearance: float = 0.03
    rest_tolerance: float = 0.35
    pull_step: float = 0.02
    max_pull: float = 0.20
    reach_margin_steps: int = 2
    release_drops: tuple[float, ...] = (0., 0.05, 0.10)
    release_twists: tuple[float, ...] = (0., 0.3, -0.3, 0.6, -0.6)
    # the walking policy's idle arm pose
    rest_arm_left: tuple[float, float, float, float, float, float, float] = (0.2, 0.2, 0., 0.6, 0., 0., 0.)
    rest_arm_right: tuple[float, float, float, float, float, float, float] = (0.2, -0.2, 0., 0.6, 0., 0., 0.)
    max_release_height: float = 0.30
    forward_reach: float = 0.42
    support_match: float = 0.04
    open_closure_limit: float = 0.15
    settle_count: int = 15
    tick: float = 0.10
    xy_tolerance: float = 0.12
    support_height_tolerance: float = 0.06
    still_distance: float = 0.01
    stable_frames: int = 3

    def rest_arm(self, side):
        return np.asarray(self.rest_arm_left if side == "left" else self.rest_arm_right, dtype=float)

```

# src/homebody/backends/real.py

```python
"""The real Unitree G1 backend, a placeholder: `Robot` plus `reset` and `close`, every
member raising NotReleased."""
import numpy as np

from homebody.primitives.observations import Frame, Measurement
from homebody.primitives.release import NotReleased

WHAT = "The real-G1 backend"


class RealG1Backend:
    """The hardware Robot, driven by skills exactly as the simulator is."""

    def __init__(self, root, settings):
        raise NotReleased(WHAT)

    @property
    def epoch(self) -> int:
        """The command generation. An operator stop starts a new one."""
        raise NotReleased(WHAT)

    @property
    def time(self) -> float:
        """The robot's clock, which stamps each frame at capture."""
        raise NotReleased(WHAT)

    def snapshot(self) -> Frame:
        """The newest frame, all fields captured together."""
        raise NotReleased(WHAT)

    def measure(self) -> Measurement:
        """Joints, hands and poses between camera frames."""
        raise NotReleased(WHAT)

    def base_velocity(self, epoch: int, forward: float, lateral: float, yaw_rate: float) -> None:
        """The locomotion command, dropped by a deadman unless renewed."""
        raise NotReleased(WHAT)

    def arm_target(self, epoch: int, side: str, joints: np.ndarray) -> None:
        """One arm's joint reference in radians, rate- and range-limited."""
        raise NotReleased(WHAT)

    def grip(self, epoch: int, side: str, closure: float) -> None:
        """One Dex3 hand's closure."""
        raise NotReleased(WHAT)

    def advance(self, epoch: int, seconds: float) -> None:
        """Wait SECONDS of real time under the current commands."""
        raise NotReleased(WHAT)

    def stop(self, epoch: int) -> None:
        """Zero the base and hold both arms at their applied reference."""
        raise NotReleased(WHAT)

    def reset(self) -> None:
        """Start a new epoch."""
        raise NotReleased(WHAT)

    def close(self) -> None:
        """Release the robot's command authority."""
        raise NotReleased(WHAT)

```

# configs/simulation.toml

```toml
# Simulator-side overrides: the simulated robot, its sensors and its contacts. Omitted
# settings take the defaults in src/homebody/session/config.py. Values that belong to one
# room live in that scene package's settings.toml. Credentials never go in this file.

[physics]
# The arm plays its trajectories faster in MuJoCo than the default.
arm_rate = 1.0

[motion]
# The simulated robot's floor footprint, narrower than the default.
robot_radius = 0.20
route_clearance_margin = 0.16
# Turn onto the stance heading nearer to it and close in faster than the defaults, since
# the simulated gait steps in place at each stance.
aim_in_distance = 0.50
min_close_speed = 0.22
final_speed = 0.25

[collision]
# Rendered depth is noiseless; 5 mm padding is enough and avoids phantom edge hits.
cloud_margin = 0.005
# Real obstacles span several depth voxels; a lone voxel is ignored.
min_hit_voxels = 3

[grasp]
# A newly exposed face of a rigid object shifts its aligned cloud by up to about 2.4 cm.
target_surface_tolerance = 0.03
# Pixels newly exposed after a lift leave a palm-frame cloud residual of about 5 cm.
recovery_match = 0.055

[placement]
# Clear a landed object before folding the arm back toward the torso.
withdraw_height = 0.08

```

# configs/waves/default.json

```json
[
 {
  "name": "default",
  "task": "Put the coffee bags on the island and throw away the used cartons."
 },
 {
  "name": "default_reworded",
  "task": "Clean up the kitchen: the coffee bags go on the middle island, and the juice carton and the red-and-white carton go in the blue bin"
 },
 {
  "name": "swapped",
  "task": "Put the cartons on the middle island and throw the coffee bags in the recycling bin.",
  "swap": true
 },
 {
  "name": "swapped_reworded",
  "task": "Move both cartons onto the kitchen island and dispose of the two coffee bags in the blue bin",
  "swap": true
 }
]

```

# configs/waves/fun.json

```json
[
 {
  "name": "the_other_carton_to_bin",
  "task": "Throw away the carton that isn't orange juice.",
  "targets": {
   "red_white_carton": "blue_bin"
  }
 },
 {
  "name": "juice_to_table_by_bin",
  "task": "Put the orange juice on the round table closest to the recycling bin.",
  "targets": {
   "juice_carton": "empty_table"
  }
 },
 {
  "name": "carton_by_toaster",
  "task": "Move the red and white carton next to the toaster.",
  "targets": {
   "red_white_carton": "fridge_sink"
  }
 },
 {
  "name": "swap_coffee_bags",
  "task": "Swap the two coffee bags between their counters.",
  "targets": {
   "parcel_left": "corner_counter_return",
   "parcel_corner": "corner_counter_left"
  }
 },
 {
  "name": "after_breakfast",
  "task": "Breakfast is over: whichever carton isn't juice goes in the recycling.",
  "targets": {
   "red_white_carton": "blue_bin"
  }
 },
 {
  "name": "juice_for_guest",
  "task": "The juice is for whoever sits at the round table nearest the recycling bin. Take it to them.",
  "targets": {
   "juice_carton": "empty_table"
  }
 },
 {
  "name": "farther_bag",
  "task": "Put the coffee bag that's farther from the fridge on the island.",
  "targets": {
   "parcel_corner": "island"
  }
 },
 {
  "name": "conditional_juice",
  "task": "If the orange juice is next to the toaster, move it to the island; otherwise throw it away.",
  "targets": {
   "juice_carton": "island"
  }
 },
 {
  "name": "there_and_back",
  "task": "Show the red and white carton to someone at the island, then put it back where it was.",
  "targets": {
   "red_white_carton": "glass_sink"
  }
 }
]

```

# configs/waves/other_tasks.json

```json
[
 {
  "name": "bags_to_rear_table",
  "task": "Put the two coffee bags on the rear round table.",
  "targets": {
   "parcel_left": "rear_table",
   "parcel_corner": "rear_table"
  }
 },
 {
  "name": "juice_to_front_table",
  "task": "Put the red and white carton on the island and the orange juice carton on the foreground round table.",
  "targets": {
   "red_white_carton": "island",
   "juice_carton": "empty_table"
  }
 },
 {
  "name": "cartons_to_corner_counter",
  "task": "Move both cartons to the counter between the corner and the range.",
  "targets": {
   "juice_carton": "corner_counter_return",
   "red_white_carton": "corner_counter_return"
  }
 },
 {
  "name": "moved_juice_to_bin",
  "task": "Throw the orange juice carton in the recycling bin.",
  "targets": {
   "juice_carton": "blue_bin"
  },
  "place_objects": [
   "juice_carton=3.1933,3.4231,-1.8632"
  ]
 }
]

```

# pyproject.toml

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "homebody"
version = "0.1.0"
description = "An open-source agentic framework for vision-language models to control humanoid robots on long-horizon tasks"
requires-python = ">=3.11"
license = { text = "Apache-2.0" }
dependencies = [
  "numpy>=1.26", "scipy>=1.13", "mujoco==3.11.0", "torch>=2.4",
  "pillow>=10", "trimesh>=4.4", "viser>=1.1", "imageio-ffmpeg>=0.6",
]

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.6"]

[project.scripts]
homebody = "homebody.__main__:main"

[tool.setuptools]
package-dir = { "" = "src", "holosoma_inference" = "vendor/holosoma_inference" }

[tool.setuptools.packages.find]
where = ["src", "vendor"]

[tool.setuptools.package-data]
homebody = ["**/*.md"]
holosoma_inference = ["LICENSE*"]

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = [".", "src", "vendor"]

[tool.ruff]
line-length = 100

```

# NOTICE

```text
HomeBody
Copyright 2026 Gio Huh, Cayden Gu, Takara E. Truong, C. Karen Liu and Guy Tevet

Licensed under the Apache License, Version 2.0 (see LICENSE). Third-party components and
their own licences are listed in THIRD_PARTY_NOTICES.md.

This product includes software derived from Holosoma,
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

This product includes the AMO walking-policy weights,
Copyright 2025 Jialong Li, Xuxin Cheng, Tianshu Huang and Xiaolong Wang.

```

# THIRD_PARTY_NOTICES.md

# Third-party notices

This repository contains or depends on the following third-party components. Each entry
states only what the repository itself records; where no licence file ships here, the
upstream project's own terms apply.

| Component | Where | Origin | Licence |
| --- | --- | --- | --- |
| G1 walking-controller kernel | `vendor/holosoma_inference/` | Derived from Amazon FAR Holosoma (revision `4ed2cebf9780f3efb59621657916006afadb87dc`) and the authors' AMO/Holosoma adapter; observation math from OpenTeleVision/AMO and Psi0 (module docstrings in `g1_control/config.py`, `g1_control/amo.py`, `g1_control/runtime.py`) | Apache-2.0, full text in `vendor/holosoma_inference/LICENSE`; Copyright Amazon.com, Inc. or its affiliates, all rights reserved (upstream NOTICE, carried in `NOTICE`) |
| AMO walking-policy weights | `assets/models/amo_jit.pt`, `adapter_jit.pt`, `adapter_norm_stats.pt` | Byte-identical to OpenTeleVision/AMO revision `34caaf943660e6f9420e35f64e86dd56fb51dd0e` (`g1_control/config.py`) | Apache-2.0, Copyright 2025 Jialong Li, Xuxin Cheng, Tianshu Huang and Xiaolong Wang (upstream LICENSE); upstream releases the weights for research use only |
| Unitree G1 robot description and meshes (29-DoF with Dex3 hands) | `assets/robot/g1_29dof_with_hand.urdf`, `assets/robot/g1_grasp/` | Unitree G1 model (`g1_29dof_with_hand_rev_1_0`); the URDF keeps joints only, the MuJoCo model and STL meshes are used for simulation | BSD-3-Clause, full text in `assets/robot/LICENSE` |
| MuJoCo | Python dependency (`pyproject.toml`), not vendored | MuJoCo physics engine | Apache-2.0 (MuJoCo) |
| Scanned kitchen | `assets/real2sim/src_kitchen/` | Captured by the authors; machine-local capture paths removed for release (`source.json`) | Not a third-party component |
| Project website assets (Three.js, HLS.js, DM Sans, provider icons) | `docs/` | As listed in `docs/LICENSES.txt` | MIT, Apache-2.0, SIL OFL 1.1 and MIT, full texts in `docs/LICENSES.txt`. Provider and institution logos are their owners' trademarks, shown for identification only. |

File hashes for every shipped asset are in `assets/manifest.json` and are checked by
`tools/verify_assets.py`. Integrity checks do not establish redistribution rights.

# LICENSE

```text
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

```

# 파일 트리 (assets/real2sim/src_kitchen/meshes/ 하위 obj·png 생략, 경로와 byte 크기)

```text
.gitignore 150
CLAUDE.md 4644
LICENSE 11357
NOTICE 486
README.md 10199
THIRD_PARTY_NOTICES.md 2240
assets 
assets/manifest.json 204817
assets/models 
assets/models/adapter_jit.pt 1661974
assets/models/adapter_norm_stats.pt 1996
assets/models/amo_jit.pt 17819339
assets/models/manifest.json 492
assets/real2sim 
assets/real2sim/src_kitchen 
assets/real2sim/src_kitchen/kitchen_semantic.glb 10121136
assets/real2sim/src_kitchen/map.npz 24368
assets/real2sim/src_kitchen/physics.json 164421
assets/real2sim/src_kitchen/scene.xml 193542
assets/real2sim/src_kitchen/semantics.json 531604
assets/real2sim/src_kitchen/source.json 88
assets/real2sim/src_kitchen/task_scene.json 957
assets/robot 
assets/robot/LICENSE 1529
assets/robot/calibration.json 106952
assets/robot/g1_29dof_with_hand.urdf 16855
assets/robot/g1_grasp 
assets/robot/g1_grasp/g1_closd_grasp_deploy.xml 46475
configs 
configs/continuous_four.json 5037
configs/simulation.toml 1241
configs/waves 
configs/waves/default.json 590
configs/waves/fun.json 1603
configs/waves/other_tasks.json 884
docs 
docs/.nojekyll 0
docs/LICENSES.txt 6733
docs/assets 
docs/assets/caltech.webp 6172
docs/assets/claude.svg 1696
docs/assets/deepseek.svg 2164
docs/assets/favicon.ico 15406
docs/assets/font.woff2 54316
docs/assets/gemini.svg 2836
docs/assets/huggingface.svg 3768
docs/assets/mistral.svg 655
docs/assets/openai.webp 6810
docs/assets/qwen.svg 2044
docs/assets/stanford-tml.webp 39280
docs/assets/stanford-wordmark.webp 4202
docs/assets/touch-icon.png 11128
docs/figures 
docs/figures/architecture-full.webp 1527092
docs/figures/architecture.webp 329908
docs/figures/comparison-mobile.webp 93246
docs/figures/comparison.webp 71932
docs/figures/context-drawer-pick.webp 73648
docs/figures/context-navigate.webp 74424
docs/figures/context-open-drawer.webp 73608
docs/figures/context-pick.webp 74488
docs/figures/context-place.webp 74772
docs/figures/deployment.glb 27117800
docs/figures/deployment.json 478
docs/figures/deployment.webp 66792
docs/figures/drawer-pick-clicked-detail.webp 4104
docs/figures/drawer-pick-clicked-observation.webp 46306
docs/figures/drawer-pick-clicked-target.webp 45852
docs/figures/drawer-pick-observation.webp 45700
docs/figures/drawer-pick-points.json.gz 471136
docs/figures/drawer-pick-points.webp 244324
docs/figures/drawer-pick-reference-B.webp 17376
docs/figures/exploration.webp 174928
docs/figures/handheld-overhead.webp 175400
docs/figures/memory-1.webp 15766
docs/figures/memory-2.webp 22380
docs/figures/memory-3.webp 24144
docs/figures/mobile 
docs/figures/mobile/room-view-1-real-480.webp 16276
docs/figures/mobile/room-view-1-real-768.webp 28628
docs/figures/mobile/room-view-1-real-960.webp 36104
docs/figures/mobile/room-view-1-simulation-480.webp 8622
docs/figures/mobile/room-view-1-simulation-768.webp 14588
docs/figures/mobile/room-view-1-simulation-960.webp 18698
docs/figures/mobile/room-view-2-real-480.webp 18474
docs/figures/mobile/room-view-2-real-768.webp 34592
docs/figures/mobile/room-view-2-real-960.webp 45342
docs/figures/mobile/room-view-2-simulation-480.webp 9124
docs/figures/mobile/room-view-2-simulation-768.webp 16122
docs/figures/mobile/room-view-2-simulation-960.webp 20902
docs/figures/mobile/room-view-3-real-480.webp 13414
docs/figures/mobile/room-view-3-real-768.webp 24092
docs/figures/mobile/room-view-3-real-960.webp 31072
docs/figures/mobile/room-view-3-simulation-480.webp 8350
docs/figures/mobile/room-view-3-simulation-768.webp 13784
docs/figures/mobile/room-view-3-simulation-960.webp 17992
docs/figures/mobile/room-view-4-real-480.webp 15112
docs/figures/mobile/room-view-4-real-768.webp 26294
docs/figures/mobile/room-view-4-real-960.webp 34704
docs/figures/mobile/room-view-4-simulation-480.webp 10872
docs/figures/mobile/room-view-4-simulation-768.webp 18378
docs/figures/mobile/room-view-4-simulation-960.webp 24588
docs/figures/mobile/room-view-5-real-480.webp 12166
docs/figures/mobile/room-view-5-real-768.webp 20968
docs/figures/mobile/room-view-5-real-960.webp 27448
docs/figures/mobile/room-view-5-simulation-480.webp 9674
docs/figures/mobile/room-view-5-simulation-768.webp 17014
docs/figures/mobile/room-view-5-simulation-960.webp 22166
docs/figures/navigate-geometry.json 495
docs/figures/navigate-observation.webp 62686
docs/figures/navigate-topdown.webp 24306
docs/figures/open-drawer-clicked-detail.webp 9356
docs/figures/open-drawer-clicked-observation.webp 52846
docs/figures/open-drawer-clicked-target.webp 53200
docs/figures/open-drawer-observation.webp 52518
docs/figures/open-drawer-points.json.gz 534200
docs/figures/open-drawer-points.webp 159930
docs/figures/open-drawer-reference-B.webp 15358
docs/figures/overview-full.webp 1910760
docs/figures/overview.webp 358028
docs/figures/pick-clicked-detail.webp 23866
docs/figures/pick-clicked-observation.webp 62776
docs/figures/pick-clicked-target.webp 55818
docs/figures/pick-observation.webp 62616
docs/figures/pick-points.json.gz 311990
docs/figures/pick-points.webp 38766
docs/figures/pick-reference-B.webp 18408
docs/figures/place-observation.webp 59156
docs/figures/place-points.json.gz 618534
docs/figures/place-points.webp 95664
docs/figures/place-reference-B.webp 23554
docs/figures/place-target-view.webp 100218
docs/figures/place-target.webp 57432
docs/figures/reference-overhead.webp 410494
docs/figures/robot-overhead.webp 51766
docs/figures/room-camera.json 308
docs/figures/room-points-mobile.ply 3556245
docs/figures/room-points.ply 14224425
docs/figures/room-view-1-real.webp 562736
docs/figures/room-view-1-simulation.webp 279996
docs/figures/room-view-2-real.webp 617798
docs/figures/room-view-2-simulation.webp 330746
docs/figures/room-view-3-real.webp 464680
docs/figures/room-view-3-simulation.webp 387536
docs/figures/room-view-4-real.webp 605450
docs/figures/room-view-4-simulation.webp 422824
docs/figures/room-view-5-real.webp 451966
docs/figures/room-view-5-simulation.webp 420108
docs/figures/room.glb 9946964
docs/figures/room.json 306
docs/figures/room.webp 57726
docs/figures/skill-playback.json 13736
docs/figures/view-a.webp 34578
docs/figures/view-b.webp 33224
docs/figures/view-c.webp 263984
docs/figures/view-d.webp 54768
docs/figures/view-e.webp 47926
docs/index.html 46856
docs/scripts 
docs/scripts/ambient-occlusion.js 16120
docs/scripts/compositor.js 4632
docs/scripts/copy-shader.js 442
docs/scripts/gallery-images.js 1853
docs/scripts/lighting.js 2006
docs/scripts/model-loader-core.js 44496
docs/scripts/model-loader.js 87
docs/scripts/mux-video.js 4824
docs/scripts/orbit-controls-core.js 19054
docs/scripts/orbit-controls.js 92
docs/scripts/output-pass.js 3055
docs/scripts/pass.js 688
docs/scripts/point-cloud.js 4377
docs/scripts/render-pass.js 1060
docs/scripts/scene-loader.js 7379
docs/scripts/shadows.js 2587
docs/scripts/site.js 56883
docs/scripts/three-core.js 694484
docs/scripts/three.js 11004
docs/scripts/vendor 
docs/scripts/vendor/hls-1.7.3.light.min.js 385675
docs/scripts/vendor/hls-LICENSE.txt 1338
docs/scripts/video-controls.js 2458
docs/scripts/video-playback.js 7938
docs/style.css 70226
docs/videos 
docs/videos/exploration-poster.webp 93822
docs/videos/exploration.mp4 33072539
docs/videos/kitchen-cleanup-poster.webp 75278
docs/videos/kitchen-cleanup.mp4 39477327
docs/videos/medicine-retrieval-poster.webp 91530
docs/videos/medicine-retrieval.mp4 43825191
docs/videos/navigation-poster.webp 36758
docs/videos/navigation.mp4 3911108
docs/videos/open-drawer-poster.webp 46358
docs/videos/open-drawer.mp4 4693176
docs/videos/pick-from-drawer-poster.webp 48036
docs/videos/pick-from-drawer.mp4 6626256
docs/videos/pick-poster.webp 56152
docs/videos/pick.mp4 3366423
docs/videos/place-poster.webp 63864
docs/videos/place.mp4 2870517
docs/videos/reconstruction-poster.webp 135984
docs/videos/reconstruction.mp4 4501096
docs/videos/retry-poster.webp 51804
docs/videos/retry.mp4 4409655
docs/videos/skill-drawer-pick-execution.mp4 1606235
docs/videos/skill-drawer-pick-reference.mp4 242452
docs/videos/skill-navigate-execution.mp4 3127816
docs/videos/skill-open-drawer-execution.mp4 2070004
docs/videos/skill-open-drawer-reference.mp4 311819
docs/videos/skill-pick-execution.mp4 1230587
docs/videos/skill-pick-reference.mp4 187881
docs/videos/skill-place-execution.mp4 1102977
docs/videos/skill-place-reference.mp4 176405
docs/videos/teaser-poster.webp 65674
docs/videos/teaser.mp4 25170632
evaluation 
evaluation/evaluate.py 13619
hardware 
hardware/g1_iphone_mount.stl 333334
pyproject.toml 955
src 
src/homebody 
src/homebody/__init__.py 562
src/homebody/__main__.py 11673
src/homebody/backends 
src/homebody/backends/__init__.py 0
src/homebody/backends/controller.py 8798
src/homebody/backends/mujoco.py 19185
src/homebody/backends/real.py 2059
src/homebody/backends/scene.py 3594
src/homebody/helpers 
src/homebody/helpers/__init__.py 0
src/homebody/helpers/collision.py 12317
src/homebody/helpers/convex.py 3805
src/homebody/helpers/geometry.py 1733
src/homebody/helpers/grasp.py 3941
src/homebody/helpers/kinematics.py 6239
src/homebody/helpers/navigation.py 7088
src/homebody/helpers/robot_collision.py 2859
src/homebody/helpers/target.py 9045
src/homebody/helpers/trajectory.py 8513
src/homebody/motion 
src/homebody/motion/__init__.py 131
src/homebody/motion/arm.py 13844
src/homebody/motion/carry.py 13564
src/homebody/primitives 
src/homebody/primitives/__init__.py 0
src/homebody/primitives/actions.py 3028
src/homebody/primitives/observations.py 7346
src/homebody/primitives/release.py 298
src/homebody/primitives/robot.py 1667
src/homebody/real2sim 
src/homebody/real2sim/__init__.py 575
src/homebody/session 
src/homebody/session/__init__.py 0
src/homebody/session/config.py 10574
src/homebody/session/recorder.py 11666
src/homebody/session/session.py 16927
src/homebody/session/settings.py 9570
src/homebody/skills 
src/homebody/skills/__init__.py 66
src/homebody/skills/contract.py 9859
src/homebody/skills/navigate.py 23721
src/homebody/skills/pick.py 24891
src/homebody/skills/place.py 21179
src/homebody/skills/registry.py 618
src/homebody/ui 
src/homebody/ui/__init__.py 0
src/homebody/ui/console.py 20785
src/homebody/ui/scene.py 11099
src/homebody/ui/selection.py 4992
src/homebody/ui/theme.py 5807
src/homebody/vlm 
src/homebody/vlm/__init__.py 0
src/homebody/vlm/agent_prompt.md 1768
src/homebody/vlm/api.py 5197
src/homebody/vlm/catalog.py 1224
src/homebody/vlm/claude.py 2481
src/homebody/vlm/codex.py 2687
src/homebody/vlm/observations.py 5744
src/homebody/vlm/provider.py 12122
src/homebody/vlm/topdown.py 5665
tests 
tests/fakes.py 2645
tests/test_api_providers.py 11321
tests/test_build_scene.py 4772
tests/test_cli.py 1656
tests/test_compose_cockpit.py 9797
tests/test_console_bubble.py 4136
tests/test_contract.py 5259
tests/test_custom_skill.py 8877
tests/test_evaluation.py 16091
tests/test_mujoco_backend.py 8800
tests/test_placeholders.py 1468
tests/test_provider.py 10070
tests/test_robot_seam.py 1380
tests/test_run_wave.py 3486
tests/test_score_session.py 10262
tests/test_session.py 42339
tests/test_settings.py 2674
tests/test_skills.py 5754
tests/test_timeline.py 1887
tools 
tools/build_kitchen.py 11467
tools/check_manipulation.py 41958
tools/compose_cockpit.py 17078
tools/run_wave.py 6374
tools/score_session.py 9735
tools/timeline.py 3757
tools/verify_assets.py 5296
vendor 
vendor/holosoma_inference 
vendor/holosoma_inference/LICENSE 11348
vendor/holosoma_inference/LICENSE.json 210
vendor/holosoma_inference/__init__.py 0
vendor/holosoma_inference/g1_control 
vendor/holosoma_inference/g1_control/__init__.py 0
vendor/holosoma_inference/g1_control/amo.py 20125
vendor/holosoma_inference/g1_control/config.py 18244
vendor/holosoma_inference/g1_control/contracts.py 7909
vendor/holosoma_inference/g1_control/runtime.py 11583
```

# 발췌: src/homebody/skills/{navigate,pick,place}.py 모듈 docstring과 PROMPT, NEEDS, FAILURES 선언 (원문 그대로)

## src/homebody/skills/navigate.py

```python
"""The navigate skill: route on the static map to a stance and verify arrival from localized poses."""
NEEDS = ("base_velocity", "arm_target", "advance", "stop")
FAILURES = ("NO_ROUTE", "STALL", "TIMEOUT", "ARRIVAL_NOT_VERIFIED", "CARRY_CLEARED", "HOLD_UNCERTAIN")
PROMPT = ('navigate: goal_map_1000 and facing_map_1000, [x, y] on image 3: goal, the floor where to '
          'stand; facing, the spot to work on next: the object to pick, or where the held object should land, '
          'inside a surface rather than at its edge. goal_xy_m and facing_xy_m take world [x, y] instead. '
          'With snap (default true) the robot stands square to the mapped edge on the goal side of the '
          'facing point, at least {motion.stance_reach:g} m from it, straight ahead or in front of hand '
          '("left" or "right") when given; with snap false it stands exactly at goal, turned toward facing. '
          'A held object is carried low in front of the body and sweeps across the surface the robot walks '
          'up to, and can push objects already on it.')
```

## src/homebody/skills/pick.py

```python
"""The pick skill: walk in when needed, plan a grasp from visible depth, approach, close, lift,
verify the hold and stow the carry."""
NEEDS = ("base_velocity", "arm_target", "grip", "advance", "stop")
FAILURES = ("HAND_OCCUPIED", "CALIBRATION_MISSING", "NO_GRASP", "UNREACHABLE",
            "TARGET_MOVED", "ARM_NOT_REACHED", "LIFT_NOT_VERIFIED") + RECOVERY_FAILURES + navigate.FAILURES
PROMPT = ('pick: point_normalized_1000 [x, y], a pixel in the middle of the object\'s body in image 1; '
          'hand "right" (default) or "left". Walks to a grasp stance when needed, grasps the object and '
          'lifts it into a carry pose in front of the body; OK means it is held. A held object keeps the '
          'robot farther from furniture. With both hands loaded the robot may be unable to turn or back '
          'out, and a held object can be dragged out of the hand.')
```

## src/homebody/skills/place.py

```python
"""The place skill: release a held object at an observed support or a captured torso XY and
verify the observed outcome."""
NEEDS = ("base_velocity", "arm_target", "grip", "advance", "stop")
FAILURES = ("NOT_HOLDING", "SURFACE_CHANGED", "ARM_NOT_REACHED",
            "RELEASE_NOT_VERIFIED", "OUTCOME_UNKNOWN", "PLACEMENT_NOT_VERIFIED") + RECOVERY_FAILURES
PROMPT = ('place: hand, the holding hand, and one destination. release_point_1000 [x, y] on image 4, or '
          'x_ahead_m and y_left_m in the torso frame, releases the object\'s centre there at the current '
          'hand height plus delta_z_m (within ±{placement.max_release_height:g} m), and it drops onto what '
          'lies below. point_normalized_1000 [x, y], a pixel on a support surface in image 1, sets the '
          'object down release_height_m above it ({placement.release_height:g} to '
          '{placement.max_release_height:g} m, default {placement.release_height:g}). Either way the object is '
          'centred on the point: on another object it is stacked on top, and near an edge it can tip off. '
          'The palm reaches about '
          '{placement.forward_reach:g} m ahead of the torso, less when raised: a farther point is lowered and '
          'pulled toward the body, and one beyond reach is released as close to it as the arm gets.')
```
