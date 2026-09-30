---
title: "OpenResearch: coding agent를 연구 에이전트로 바꾸는 local-first 작업 공간"
type: repo
year: 2026
category: agents
raw_path: raw/repos/alphaxiv-openresearch.md
raw_filename: "alphaxiv-openresearch.md"
source_collection: external
source: alphaxiv-openresearch.md
org: "alphaXiv"
repo: "OpenResearch"
url: "https://github.com/alphaXiv/OpenResearch"
license: "MIT"
tags: [autoresearch, research-agent, experiment-tree, claude-code, codex, agent-skill, git-worktree, local-first, repo, oss]
---

## 요약

OpenResearch는 alphaXiv가 MIT 라이선스로 공개한 연구 에이전트용 작업 공간이다. 새 에이전트를 만드는 대신 이미 쓰고 있는 coding agent(Claude Code, Codex, OpenCode, Cursor, Google Antigravity)를 연구 에이전트로 바꾸는 방식을 택한다. README는 그 대상 작업을 문헌 조사, 가설 수립, 실험 실행, 연구 산출물 작성으로 적는다.

구현은 Rust로 된 `orx` CLI와 로컬 대시보드, 스킬 13개 모듈, 모든 session에 주입되는 시스템 프롬프트로 이루어진다. 모든 데이터는 기본적으로 사용자 기기의 SQLite와 git 저장소에 남으며, 이 성격을 README는 "local-first"로 요약한다. local-first는 데이터 원본을 사용자 디스크에 두고 서버 없이 실행되는 설계를 뜻한다.

이 저장소의 핵심은 도구 목록이 아니라 실험 규율이다. git 브랜치 하나가 실험 하나가 되는 experiment tree를 두고, run command 고정과 node 동결 같은 네 가지 규칙으로 에이전트가 만든 결과끼리 비교 가능하도록 강제한다. 에이전트가 스스로 아이디어를 내고 실험을 반복하는 autoresearch 루프도 이 규칙 위에서 동작한다.

## 배경

coding agent는 코드를 고치고 명령을 실행하는 데 익숙하지만, 연구 실험을 여러 번 반복할 때 필요한 기록 관리는 따로 제공하지 않는다. 에이전트가 learning rate를 바꾸고 모델 구조를 바꾸는 시도를 수십 번 반복하면, 어떤 결과가 어떤 코드에서 나왔는지와 어떤 시도가 어떤 시도 위에 쌓였는지가 쉽게 흐려진다.

OpenResearch는 이 문제를 git으로 푼다. 실험 변형마다 브랜치를 두고, 모든 run이 기록된 commit의 불변 archive를 받게 한다. 즉 결과 하나를 보면 그 결과를 낸 정확한 코드를 되짚을 수 있다.

이 wiki에는 같은 계열의 선행 패턴이 이미 있다. [[agents/lee-hoyeon-2026-harness-engineering]]는 `karpathy/autoresearch`를 "사람이 방향만 정하고 에이전트가 밤새 실험을 반복하는" 패턴으로 소개한다. OpenResearch는 README 부제에서 autoresearch를 표방하며, 이 루프에 병렬 탐색과 실험 계보 관리를 더한 작업 공간으로 볼 수 있다. 다만 README는 karpathy 저장소를 직접 언급하지 않는다.

## 핵심 개념

experiment tree는 프로젝트의 실험을 트리로 표현한 구조다. root는 baseline이며, baseline은 새 방법의 효과를 재기 위해 비교 대상으로 두는 시작 코드와 설정을 말한다. 나머지 node는 parent에서 갈라져 나온 child이고, parent의 코드와 run command를 그대로 물려받는다.

run command는 node를 학습하거나 평가하고 결과를 run 로그에 출력하는 단일 셸 명령이다. OpenResearch에서는 이 명령이 트리 전체에서 동일해야 한다. 따라서 node 사이의 차이는 각 브랜치에 commit된 코드와 config뿐이다.

node에는 두 가지 상태가 있다. provisional node는 아직 run이 답을 내지 못한 node로 제자리 수정이 허용된다. frozen node는 run이 baseline을 세웠거나 가설에 답한 node로, 이후 영구히 수정이 금지된다.

worktree는 하나의 git 저장소에서 브랜치별로 따로 체크아웃해 둔 작업 디렉토리다. OpenResearch는 연구 방향마다 독립된 agent session과 격리된 worktree를 준다. 그래서 여러 에이전트가 서로의 파일을 건드리지 않고 병렬로 다른 방향을 탐색할 수 있다.

harness는 모델을 감싸 도구, 검증, 상태를 제공하는 실행 환경이다. OpenResearch는 특정 harness에 묶이지 않고, session마다 harness와 모델을 고르게 한다.

## 구성

### 여섯 가지 기능

README의 "Built for research agents" 표는 OpenResearch가 제공하는 기능을 여섯 가지로 정리한다.

| 기능 | 내용 |
|---|---|
| Parallel exploration | 연구 방향마다 독립된 agent session과 격리된 git worktree를 준다 |
| Reproducible experiments | 실험 변형을 git 기반 experiment tree로 추적하고, 모든 run이 기록된 commit의 불변 archive를 받는다 |
| Evidence in context | 로그, diff, 파일, 결과, artifact를 그것을 만든 작업에 묶어 둔다 |
| Your choice of agent | Claude Code, Codex, OpenCode, Cursor, Google Antigravity 중에서 harness와 모델을 session마다 고른다 |
| Your choice of compute | 로컬, 자체 인프라, managed OpenResearch compute 중에서 실행 위치를 고른다 |
| Local ownership | 프로젝트, 대화, 실험, run, 로그, 코드, artifact를 사용자 기기에 둔다 |

앞의 세 기능은 실험의 추적 가능성을, 뒤의 세 기능은 사용자의 선택권과 소유권을 다룬다. artifact는 에이전트가 작업 과정에서 만들어 남기는 파일, 문서, 코드 같은 산출 단위를 말한다.

### 구성 요소

| 구성 요소 | 역할 |
|---|---|
| `orx` CLI | 프로젝트, 실험 브랜치, 실행을 로컬 git 저장소와 로컬 DB 위에서 관리한다 |
| 로컬 대시보드 | `orx up`이 `http://127.0.0.1:4791`에 띄우는 브라우저 UI로, 프로젝트를 import하거나 생성한다 |
| 로컬 저장소 | SQLite를 쓰며, 프로젝트 생성이나 run 실행이 코드를 외부에 공개하지 않는다 |
| `SYSTEM_PROMPT.md` | 모든 agent session에 주입되는 playbook |
| `agent-skills/` | session worktree에 설치되는 native 스킬 13개 모듈 |
| 루트 `SKILL.md` | `openresearch-cli` 스킬. cardinal rules와 명령 요약만 담고 세부는 모듈로 넘긴다 |

openresearch.sh 계정은 조직 기능과 managed compute처럼 서비스가 소유한 기능에만 쓰인다. 로컬 프로젝트와 run 명령은 로그인 없이 동작한다.

### harness별 playbook 전달 경로

playbook은 `orx up`이 모든 agent session에 넣는 시스템 프롬프트다. 같은 내용을 각 harness가 원래 제공하는 채널로 넣기 때문에 harness를 바꿔도 에이전트가 받는 규칙은 같다.

| harness | 주입 채널 |
|---|---|
| Claude Code | `--append-system-prompt-file` |
| Codex | `developerInstructions` |
| OpenCode | config의 `instructions` 목록 |

playbook은 렌더 시점에 `{name}`, `{id}`, `{artifacts}`, `{project_state}`, `{skill_names}` 같은 토큰을 프로젝트 정보로 치환한다 (`src/local/opencode.rs`의 `playbook_md()`). 파일 머리 주석은 playbook이 매 턴 필요한 지속 컨텍스트만 담는다고 밝힌다. 정체성, 프로젝트 정보, 프로젝트 상태, 응답 규약, 공통 실행 정책, 스킬 라우팅이 여기에 해당하고, 작업별 절차는 스킬로 분리한다.

### 스킬 모듈 13개

루트 `SKILL.md`는 스스로를 "의도적으로 짧다"고 밝힌다. cardinal rules와 명령 요약만 두고, 세부는 `orx skill <name>`으로 필요할 때 로드하는 모듈에 맡긴다. `compute/hf`처럼 모듈 내부 resource를 지연 로드하는 경로도 있다. 이 구조는 필요한 시점에만 정보를 단계적으로 노출하는 progressive disclosure 설계에 해당한다.

| 모듈 | 영역 | 내용 |
|---|---|---|
| orx-experiment-tree | 실험 | experiment tree 모델, auto-research 루프, `orx exp desc` |
| orx-create | 실험 | 로컬 프로젝트 초기화와 실험 node 추가 |
| orx-compute | 실행 | run 실행과 모니터링. backend를 정한 뒤 해당 reference를 읽는다 |
| orx-instances | 실행 | 수동 작업용 상주 머신 생성 |
| orx-git | 코드 | node 코드를 일반 git으로 읽고, 고치고, diff한다 |
| orx-agent-delegation | 협업 | 독립 작업을 helper session에 안전하게 위임한다 |
| orx-evidence | 증거 | run 로그로 실험 결과를 수집하고 검토한다 |
| orx-reports | 산출물 | 오래 남을 연구 산출물을 프로젝트 artifacts 디렉토리에 쓴다 |
| orx-figures | 산출물 | matplotlib 또는 TikZ로 출판 품질 그림을 만든다 |
| orx-paper | 산출물 | 렌더와 컴파일이 되는 LaTeX 논문 초안을 쓴다 |
| orx-customize | 확장 | 프로젝트 공통 스킬과 LaTeX 템플릿을 추가한다 |
| orx-lit-review | 문헌 | 여러 코퍼스에 걸친 retrieval과 후속 조회 정책을 정한다 |
| orx-feedback | 운영 | 연구 세부를 노출하지 않고 버그, 기능 요청, 사용자 불만을 보고한다 |

모듈 구성을 영역별로 보면 실험 실행과 산출물 작성이 중심이다. 문헌 조사는 모듈 하나(orx-lit-review)가 맡지만, 학술 질의의 기본 출발점으로 지정되어 있다.

## 실험 규율

### cardinal rules 네 가지

루트 `SKILL.md`는 아래 네 규칙을 "스타일 선호가 아니라, 어기면 결과를 조용히 무효화하는 규칙"으로 규정한다. 네 규칙은 모두 한 가지 목적, 즉 트리 안의 모든 결과를 서로 비교할 수 있게 만드는 데 맞춰져 있다.

| 번호 | 규칙 | 세부 |
|---|---|---|
| 1 | run이 답한 node는 수정하지 않는다 | run이 baseline을 세우거나 가설을 검증한 순간 node가 동결된다. root도 포함되며 동결은 영구적이다. 새 가설은 child를 branch해서 child를 고친다 |
| 2 | run command와 환경은 고정 계약이다 | child는 parent의 run command를 그대로 상속한다. node마다 시작 명령을 달리 주거나 환경 변수로 동작을 바꾸지 않는다 |
| 3 | 명령 인자가 아니라 코드를 바꾼다 | hyperparameter는 코드와 config 파일에 쓰고 변형마다 child를 만든다 |
| 4 | 트리는 옆이 아니라 아래로 키운다 | 한 round 안에서만 조금 펼치고, 그 round의 승자 아래로 내려가 다음 round를 시작한다 |

규칙 2와 3은 짝을 이룬다. 예를 들어 `LR=3e-4 python …`처럼 명령 앞에 환경 변수를 붙여 learning rate를 바꾸면, 그 변경은 브랜치의 commit에 남지 않는다. 따라서 결과를 코드로 되짚을 수 없게 된다. 반대로 learning rate를 config 파일에 쓰고 child 브랜치에 commit하면, 모든 node가 같은 명령으로 서로 다른 코드를 실행하게 되어 로그의 결과 요약을 그대로 비교할 수 있다.

`SKILL.md`는 이 규칙을 어기고 싶어지는 순간을 명시적으로 경고한다. 명령을 바꾸거나 환경 변수를 넘기거나 root 아래에 node를 하나 더 붙이고 싶다면, 그것은 지름길이 아니라 anti-pattern이라고 적는다.

### node 생성 조건과 동결

node는 계획된 run이 baseline을 세우거나 프로젝트와 관련된 가설을 검증할 때만 만든다. 무관한 정리, 리팩터, 버그 수정, 의존성 갱신을 위한 node는 만들지 않는다. 각 node의 코드 변경도 그 baseline이나 가설에 필요한 것으로 한정한다.

node의 상태는 run이 "답했는가"로 갈린다. run이 오류로 죽으면 아무것도 세우거나 검증하지 못했으므로 보호할 결과가 없다. 이 경우 node는 provisional로 남고, 같은 node의 브랜치를 제자리에서 고쳐 다시 실행한다.

run이 원하던 결과를 내면 결과가 좋든 나쁘든 `nan`이든 node는 동결된다. 실망스러운 수치도 결과이지 수리할 이유가 아니라는 것이 모듈의 입장이다. 반면 OOM, timeout, 버그로 인한 발산, 누락된 의존성은 답이 아니라 구현과 하드웨어의 세부로 본다. 단 node의 가설 자체가 메모리나 실행 시간에 관한 것이면 그 결과가 곧 답이 된다.

| 상황 | node 상태 | 다음 행동 |
|---|---|---|
| run이 원하던 결과를 냄 (좋음, 나쁨, `nan` 포함) | frozen | child를 branch한다 |
| OOM, timeout, 버그 발산, 의존성 누락 | provisional | 같은 node를 고쳐 다시 실행한다 |
| 메모리나 실행 시간 가설에서 OOM이나 timeout | frozen | 그 결과를 답으로 기록한다 |

### repair cap과 중단 기준

에이전트가 같은 node를 끝없이 고치는 것을 막기 위해 두 가지 한도가 있다. 두 한도는 목적이 다르므로 따로 센다.

| 한도 | 조건 | 결과 |
|---|---|---|
| repair cap | 한 node에서 답 없는 run이 연속 2회 | 사용자에게 묻는다 |
| setup 문제 판정 | 같은 실패가 두 번째 node에서 발생 | 하나의 setup 문제로 보고 사용자에게 묻는다 |
| 과학적 중단 | 연속 약 3회 실패 또는 성능 후퇴 | 루프를 멈추고 트리를 artifact로 정리한다 |

repair cap에서는 오류 종류가 달라도 횟수에 들어간다. 단순 재실행이나 flavor, backend 교체도 repair로 센다. 즉 "다른 GPU로 한 번 더"도 수리 시도 한 번이다.

### 트리 형태

`orx-experiment-tree` 모듈은 프로젝트를 잘못 운영하는 가장 흔한 방식이 트리 형태를 틀리는 것이라고 본다. 잘못된 형태는 서로 반대 방향으로 두 가지가 있고, 올바른 형태는 그 사이에 있다.

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

| 형태 | 모양 | 문제 |
|---|---|---|
| flat fan | 모든 시도가 root 아래 직계 child | 모든 결과를 시작점과 비교하므로 성과가 누적되지 않는다 |
| noodle | 외자식만 이어지는 긴 사슬 | 각 단계가 위 단계 위에 실제로 쌓이지 않는 깊이를 만든다 |
| stacked bushes | round마다 작은 fan, 다음 round는 승자 아래 | 폭은 한 결정의 선택지가, 깊이는 이미 해결된 결정의 누적이 된다 |

올바른 형태를 만드는 규칙은 하나다. X를 Y의 child로 만들기 전에 "Y가 확립한 무엇 위에 X가 쌓이는가"를 말할 수 있어야 한다. "Y가 LR 승자이고 X는 그 LR을 유지한 채 architecture를 바꾼다"라고 말할 수 있으면 X는 Y의 child다. 반대로 lr 2e-5와 lr 3e-5처럼 동시에 시험하는 대등한 선택지는 서로 위에 쌓이지 않으므로 같은 bush의 sibling이다.

모듈은 매 round `orx project view <projectId>`로 트리를 다시 읽어 형태를 점검하게 한다. root 아래 직계 child가 넓게 늘어서고 손자가 없으면 내려가야 할 때 펼치고 있는 것이다. 가지 없이 깊이 N의 사슬만 있으면 sibling이어야 할 대등한 변형을 사슬로 엮고 있는 것이다.

## auto-research 루프

### 일곱 단계

`orx-experiment-tree` 모듈은 목표(예: "d=8에서 최선의 수렴")를 향해 프로젝트를 운영하는 흐름을 일곱 단계로 적는다.

1. **baseline 코드를 읽는다.** 에이전트는 이미 프로젝트 저장소의 private worktree 안에 있다. 브랜치를 checkout해 읽고, `orx exp status <expId>`로 run command를 확인해 조절 지점(config, hyperparameter, 모델 정의)을 찾는다.
2. **한 round 분량의 가설을 세운다.** 가설은 하나의 결정(어떤 LR, 어떤 schedule, 어떤 init)에 대한 대등한 선택지여야 한다. 다른 round의 결정을 한 batch에 섞으면 flat fan이 생긴다.
3. **round를 bush로 만들고 parent를 고른다.** 첫 round만 baseline 아래에 두고, 이후 round는 직전 round의 확정된 승자 아래에 둔다. node 제목은 아이디어, description은 브랜치에서 할 구체적 변경이다.
4. **각 child의 변경을 구현한다.** `orx create-experiment`가 출력한 브랜치(`orx/<slug>`)를 checkout해 그 아이디어가 건드리는 파일만 고치고 commit한다. 실행 전에 `orx-evidence`를 로드해 commit된 코드가 판정에 충분한 증거를 출력하는지 확인한다.
5. **준비된 child를 실행한다.** `orx exp run <childId> --backend <b>`를 쓰고, 기본 대상이 설정되어 있으면 `--backend`를 생략한다. 원격 backend는 sibling을 병렬로 실행할 수 있고, `--backend local`은 로컬 CPU, RAM, GPU를 공유한다.
6. **완료 하나마다 도는 루프로 round를 진행한다.** 전체 완료를 기다리는 barrier를 쓰지 않는다.
7. **완료된 run마다 결과를 읽고 다음 행동을 고른다.**

3단계의 예시로 모듈은 다음 명령을 든다. round 1은 LR 결정의 선택지를 baseline 아래에 펼치고, round 2는 LR 3e-5 승자 아래에서 architecture 결정을 시작한다.

```sh
orx create-experiment <projectId> --parent <baseId> --title "LR 2e-5" \
  --description "Set the LR in config.yaml to 2e-5; change nothing else."
orx create-experiment <projectId> --parent <baseId> --title "LR 3e-5" \
  --description "Set the LR in config.yaml to 3e-5; change nothing else."

orx create-experiment <projectId> --parent <lr3e5WinnerId> --title "Wider MLP" \
  --description "On top of the LR-3e-5 winner, widen the MLP hidden dim 1024→2048 in model.py."
```

### 완료 단위 루프

6단계의 목적은 run 하나가 끝나는 즉시 제어를 돌려받아 결과를 분석하고, 빈 자리를 채우거나 멈추는 것이다. `orx exp wait --project <projectId>`는 이를 위해 첫 완료에서 반환한다. 에이전트는 이 명령을 루프의 한 tick으로 쓰고, 자신이 루프 본문이 된다.

```
loop:
  orx exp wait --project <projectId>   # 첫 완료에서 반환
  orx runs <projectId>                 # 모든 run 상태를 다시 읽는다
  # 아직 처리하지 않은 종료 run마다 결과를 읽고 refill, promote, stop을 정한다
  # "drained: no runs in flight"가 출력되면 루프를 끝낸다
```

모듈은 이 루프가 견고하려면 세 가지를 모두 지켜야 한다고 적는다.

- **`exp wait`는 신호일 뿐이다.** 이 명령은 그 호출 동안 관찰한 완료만 보고한다. 앞 run을 분석하는 사이에 끝난 run은 다음 호출에서 보고되지 않는다. 따라서 깨어날 때마다 `orx runs`를 진실의 원천(source of truth)으로 다시 읽고, 이미 처리한 run 집합과 대조해 새로 끝난 모든 run을 처리한다.
- **tick마다 `exp wait`를 다시 호출한다.** 호출 한 번이 전체 완료까지 막아 줄 것이라고 기대하지 않는다.
- **drained에서 끝낸다.** 실행 중인 run이 없으면 `exp wait`가 즉시 `drained: no runs in flight`를 출력하고 반환한다. 이것이 종료 조건이며, timeout이 날 때까지 호출을 반복하지 않는다.

### 네 가지 결정

7단계에서 에이전트는 `orx logs <runId>`가 알려준 파일에서 결과를 실제로 읽는다. 상태만 보고 결과를 추론하지 않으며, node가 무엇을 바꿨는지는 parent 브랜치와의 diff로 확인한다. 그다음 완료마다 네 가지 행동 중 하나를 고른다.

| 행동 | 조건 | 내용 |
|---|---|---|
| Repair | run이 아무것도 답하지 못함 | 같은 node의 브랜치를 고쳐 다시 실행한다 |
| Refill | 결과가 평범하거나 결론이 나지 않음 | 대기 중인 다음 child를 실행해 round를 이어 간다 |
| Promote | 명확한 승리 | 이 node가 다음 round의 parent가 된다 |
| Stop | 목표 달성 또는 가지 소진 | 트리 전체를 이름이 분명한 프로젝트 artifact로 정리한다 |

Promote는 트리를 깊게 만드는 유일한 행동이다. 이 행동을 건너뛰면 sweep만 반복하는 flat fan이 된다. 한편 promotion은 초점이 되는 parent를 아래로 옮길 뿐, 이미 측정을 마친 node를 고치지 않는다.

실험을 실행하거나 바꾼 턴은 node마다 한 줄씩 검증 대상, 상태, 대표 결과를 적은 요약으로 끝낸다. 각 node의 description은 `orx exp desc`로 읽고 쓰는 markdown 필드다. 쓰기는 문서 전체를 덮어쓰므로, 덧붙이려면 먼저 읽고 고친 뒤 다시 쓴다.

## 에이전트 응답 규약

### 근거 태그

playbook은 프로젝트의 코드, 파일, artifact, 측정 결과에 관한 실질적 주장마다 바로 뒤에 클릭 가능한 참조를 달게 한다. 추론은 관찰과 구분해 추론이라고 명시한다.

| 대상 | 태그 형식 |
|---|---|
| 코드와 파일 사실 | `<file path="relative/path.py" lines="20-40" />`, 실험 브랜치의 파일이면 `exp="<experimentId>"` 추가 |
| 측정 결과 | `<run id="<runId>" label="+3.65pp" />` |
| artifact | `<file path="artifacts/<relative-path>" />` |

측정 결과를 보고하기 전에는 인용한 run의 로그를 읽어야 하며, run 상태만으로는 증거가 되지 않는다. 학술적 주장은 이 태그가 아니라 `orx-lit-review`가 요구하는 출처 링크를 쓴다. 태그는 backtick이나 코드 블록 안에 넣지 않고 raw text로 출력한다.

### 표시와 환경 규칙

- **orx 비노출**: `orx`는 내부 도구이므로 사용자 응답에서 언급하지 않는다.
- **이미지**: Markdown으로 인라인 표시하고, 같은 파일은 대화당 한 번만 보인다. 제목 문자열을 주면 작은 기울임 캡션이 붙은 figure로 렌더된다. 이후 참조는 로컬 링크로 한다.
- **수식**: 인라인은 `$...$`, 블록은 `$$...$$`를 쓰고 통화 기호는 `\$10`처럼 escape한다.
- **그림 작성**: 기본 matplotlib 출력은 출판용이 아니므로 그림 코드를 쓰기 전에 `orx-figures`를 로드한다.
- **스킬 우선**: 영역에 맞는 스킬을 행동 전에 로드한다.

Python 환경 정책은 재현성과 직접 연결된다. 사용자 지시와 기존 의존성 도구를 따르고, 없으면 uv를 우선한다. 다만 `pyproject.toml`이 있다는 이유만으로 uv를 가정하지 않는다. `.venv`는 worktree끼리 복사하거나 공유하지 않고, 실험을 branch하기 전에 baseline 의존성을 확정한다. run recipe는 session 환경과 독립적으로 commit된 snapshot에서 의존성을 다시 만들어야 한다. 이 규칙은 cardinal rule 2의 고정 계약을 환경 차원에서 보장한다.

## 문헌 조사

문헌 명령은 로그인 없이 쓸 수 있고, `SKILL.md`는 논문, 저자, 블로그, 모델 공개 같은 학술 질의에서 웹 검색보다 먼저 이 명령을 쓰라고 지시한다. alphaXiv가 만든 도구답게 alphaXiv의 retrieval을 기본 수단으로 두고 다른 학술 데이터베이스를 함께 연결한다.

| 명령 | 대상 |
|---|---|
| `orx discover keyword "<query>"` | alphaXiv full-text retrieval, 일치 snippet 포함 |
| `orx discover embedding "<query>"` | alphaXiv semantic retrieval. 후보 순위와 후속 조회는 main agent가 정한다 |
| `orx discover openalex "<query>"` | 분야 횡단 학술 그래프 OpenAlex |
| `orx discover biorxiv "<query>"` | OpenAlex의 bioRxiv 인덱스를 통한 preprint |
| `orx discover pubmed "<query>"` | NCBI E-utilities를 통한 PubMed 생의학 문헌 |
| `orx paper <id\|url>` | alphaXiv report를 가져오고, 없으면 full text로 자동 전환한다. `--full`로 원문을 강제한다 |

`orx paper`는 id로 출처를 자동 판별하며, OpenAlex, bioRxiv, PubMed 자료는 메타데이터와 초록을 가져온다.

## 설치와 실행 환경

### 플랫폼별 설치

CLI는 macOS와 Linux에서 `curl -LsSf https://openresearch.sh/install.sh | sh` 한 줄로 설치하고, `orx up`으로 실행한다.

| 플랫폼 | 배포 형태 | 조건과 비고 |
|---|---|---|
| macOS | `install.sh` CLI 또는 `.dmg` 앱 | macOS 11 이상. 앱은 Developer ID 서명과 Apple notarization을 거쳤다 |
| Windows | `OpenResearch-Setup.exe` (beta) | Git for Windows가 필요하다. 사용자 계정 단위로 설치되고 관리자 권한을 묻지 않는다 |
| Linux | AppImage (x86_64, ARM64) | glibc 2.35 이상. 스스로 업데이트하려면 `~/Applications` 같은 쓰기 가능한 위치에 둔다 |

관리형 Mac(예: 회사 컴퓨터)에서는 기기 관리 정책이 미서명 CLI를 막을 수 있어 앱 설치를 권장한다. 앱에서는 Settings의 Updates 항목에서 `orx` 명령을 설치하거나 `/Applications/OpenResearch.app/Contents/MacOS/orx install-cli`를 실행한다. 어느 경로든 `orx`는 `~/.local/bin`에 링크되고, 이전에 `install.sh`로 설치했다면 `~/.cargo/bin/orx`를 먼저 지운다.

Windows 설치 파일은 아직 서명되지 않아 "Windows protected your PC" 경고가 뜨며, More info에서 Run anyway를 고른다. 로컬 모델은 LM Studio, oMLX, Ollama, 사용자 지정 endpoint를 OpenCode를 통해 연결한다. 에이전트에 스킬을 설치하는 명령은 `orx install-skills`다.

### 실행 위치와 원격 모드

같은 commit된 source snapshot을 여러 실행 위치에서 그대로 실행할 수 있고, 이를 위해 저장소를 공개할 필요는 없다.

| 묶음 | 실행 위치 |
|---|---|
| 로컬과 원격 셸 | 로컬, SSH |
| 클러스터 스케줄러 | Slurm, Kubernetes, Ray |
| 관리형 서비스 | Hugging Face Jobs, Modal, Tinker, managed OpenResearch compute |

`orx up --remote user@host`는 작업 공간을 원격 GPU 옆에서 실행하고 브라우저만 노트북에서 쓰게 한다. SSH config alias와 사용자 지정 포트를 지원한다. 다만 원격 서비스는 loopback에 bind되고 애플리케이션 수준 인증이 없어, 같은 호스트의 다른 사용자가 접근할 수 있다.

### 명령 체계

명령은 scope별로 나뉘고 id를 섞어 쓰지 않는다. 프로젝트 id는 `orx projects`, 실험 id는 `orx project view`, run id는 `orx runs`에서 얻는다.

| 묶음 | 대표 명령 | 로그인 |
|---|---|---|
| 인증 | `orx login`, `orx logout` | 해당 없음 |
| 탐색 | `orx projects`, `orx orgs`, `orx project view`, `orx runs` | `orx orgs`만 필요 |
| 증거 | `orx logs <runId>` | 불필요 |
| 생성과 실행 | `orx project edit --run-command`, `orx create-experiment`, `orx exp status/run/cancel/wait/wake`, `orx exp desc`, `orx agent spawn` | 로컬은 불필요 |
| compute | `orx compute status/show/test/configure/connect`, `orx instance create` | OpenResearch compute와 instance는 필요 |
| 문헌 | `orx discover ...`, `orx paper` | 불필요 |
| 커스터마이즈 | `orx skills add`, `orx templates add` | 불필요 |
| 메타 | `orx skill [name]`, `orx feedback`, `orx telemetry` | 해당 없음 |

`orx login`은 브라우저로 loopback OAuth를 거쳐 토큰을 `~/.config/openresearch/credentials.json`에 저장한다. API 기본 URL은 `--api-url`, `OPENRESEARCH_API_URL`, 내장 기본값 순으로 정해진다.

### 텔레메트리와 피드백

공식 release 빌드는 무작위 설치 ID에 묶인 거친 사용 이벤트를 opt-out 방식으로 보낸다. 코드, 프롬프트, 파일 내용과 경로, 저장소 이름, 토큰, 이메일, 프로젝트와 실험 식별자는 포함하지 않는다. `orx telemetry off`로 끄고 `orx telemetry status`로 확인하며, `--no-telemetry`는 그 명령 하나에만 적용된다. source 빌드와 개발 빌드는 분석 데이터를 보내지 않는다.

coding agent는 사용자가 버그, 기능 요청, 불만을 겪을 때 `orx feedback`으로 워크플로 문제를 짧게 보고할 수 있다. 버그 보고는 재현에 필요한 세부를 최대한 담되 민감 정보는 뺀다. 보고도 공식 빌드에서만 보내지고, 로그인 상태면 계정에 연결되며, `orx telemetry off`로 함께 꺼진다.

## 결과

README와 수집한 문서에는 autoresearch 루프의 성능을 보여 주는 정량 벤치마크가 없다. 확인되는 지표는 채택도에 관한 것뿐이다.

| 지표 | 값 |
|---|---|
| GitHub star | 6065 (2026-09-30 수집 시점) |
| 저장소 생성일 | 2026-06-07, 즉 수집 시점까지 약 4개월 |
| Trendshift 배지 | "GitHub Trending #1 Repository of the Day" |

playbook의 run 태그 예시 `label="+3.65pp"`는 표기 형식 예시일 뿐 실제 측정 결과가 아니다. 따라서 이 저장소의 가치는 성능 수치가 아니라 실험 규율과 작업 공간 설계에서 판단해야 한다.

## 한계

- **서명 미완료**: `install.sh`로 설치하는 CLI와 Windows 설치 파일은 아직 서명되지 않았다. 관리형 Mac에서는 기기 관리 정책이 CLI를 막을 수 있다.
- **Windows는 beta**: Git for Windows 설치가 선행 조건이다.
- **원격 모드 인증 부재**: `orx up --remote`의 원격 서비스는 애플리케이션 수준 인증이 없어 공유 호스트의 다른 사용자가 접근할 수 있다.
- **기본 텔레메트리**: 공식 빌드는 opt-out 방식이라 기본으로 사용 이벤트를 보낸다.
- **계정 의존 기능**: 조직, managed compute, instance 생성은 openresearch.sh 로그인이 필요하다.
- **사람 개입 지점**: repair cap(연속 2회)과 과학적 중단 기준(연속 약 3회)에 걸리면 사용자에게 돌아온다. 즉 무인 실행은 이 두 한도 안에서만 이어진다.
- **정량 검증 부재**: autoresearch 루프가 사람이 직접 운영하는 실험보다 나은지를 보여 주는 수치는 README에 없다.

규칙 측면의 제약도 있다. run command가 트리 전체에서 고정되므로, 평가 방식 자체를 바꾸는 실험은 같은 트리 안에서 다루기 어렵다. 또한 동결 규칙 때문에 나중에 발견한 평가 코드 버그를 기존 node에 소급 적용할 수 없고, 새 child를 만들어야 한다. 이 두 가지는 README가 직접 적은 한계가 아니라 cardinal rules에서 따라 나오는 제약이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| experiment tree | 실험 node를 git 브랜치로 표현한 트리. root가 baseline이고 child가 parent의 코드와 run command를 상속한다 |
| run command | node를 학습하거나 평가하고 결과를 로그에 출력하는 단일 셸 명령. 트리 전체에서 동일하다 |
| frozen node | run이 baseline을 세우거나 가설에 답한 뒤 영구히 수정이 금지된 node |
| stacked bushes | round 안에서는 대등한 선택지를 sibling으로 펼치고, 다음 round는 승자 아래로 내려가는 트리 형태 |
| repair cap | 한 node에서 답 없는 run이 연속 2회 나오면 사용자에게 묻는 한도 |
| playbook | `SYSTEM_PROMPT.md`로 모든 agent session에 주입되는 시스템 프롬프트 |

## 관련 페이지

- [[agents/lee-hoyeon-2026-harness-engineering]]: `karpathy/autoresearch` 자율 실험 루프 패턴을 소개한다. OpenResearch는 이 루프에 experiment tree와 병렬 worktree를 더한 작업 공간이다
- [[agents/imbad0202-academic-research-skills]]: Claude Code 스킬로 논문 집필과 심사 파이프라인을 만든다. OpenResearch는 집필보다 실험 실행과 계보 관리에 중심을 둔다
- [[agents/stanford-oval-storm]]: 문헌 조사로 Wikipedia 스타일의 긴 글을 쓰는 시스템이다. OpenResearch의 orx-lit-review 모듈과 영역이 겹친다
- [[agents/llmsresearch-paperbanana]]: 논문 다이어그램과 플롯을 생성하는 프레임워크로, orx-figures 모듈과 목적이 같다
- [[agents/agentskills-agentskills]]: OpenResearch 스킬 모듈이 따르는 `SKILL.md` 폴더 포맷의 오픈 표준이다
- [[applications/agricidaniel-claude-obsidian]]: vault 안에서 `/autoresearch` 루프를 실행하는 다른 구현이다
