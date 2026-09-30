---
title: "OpenResearch: coding agent를 연구 에이전트로 바꾸는 local-first 작업 공간"
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
tags: [autoresearch, research-agent, experiment-tree, claude-code, codex, agent-skill, git-worktree, local-first, repo, oss]
---

## 한 줄 요약 (One-line Summary)

OpenResearch는 alphaXiv가 공개한 Rust 기반 local-first 작업 공간으로, Claude Code, Codex, OpenCode, Cursor, Google Antigravity 같은 coding agent에 `orx` CLI와 스킬 13개 모듈, 시스템 프롬프트를 주입해 문헌 조사, 가설 수립, 실험 실행, 산출물 작성을 수행하는 연구 에이전트로 바꾼다. 핵심 설계는 git 브랜치 하나가 실험 node 하나가 되는 experiment tree이며, run command 고정과 node 동결 같은 네 가지 규칙으로 실험 결과의 비교 가능성을 강제한다.

## 1. 자료 정보 (Document Information)

- **Org / Repo**: `alphaXiv/OpenResearch`
- **설명**: "Turn your coding agents into research agents" (GitHub description), README 부제는 "The local-first workspace for research agents and autoresearch."
- **홈페이지**: `https://openresearch.sh/` (문서는 `/docs`)
- **License**: MIT
- **구현 언어**: Rust (`Cargo.toml`, `build.rs`), UI는 `ui/` 폴더, 플랫폼별 패키징은 `macos/`, `windows/`, `linux/`
- **저장소 생성일**: 2026-06-07, 수집 시점 최종 push 2026-09-30, star 6065
- **README 배지**: Trendshift 기준 "GitHub Trending #1 Repository of the Day" 배지를 단다
- **수집 범위**: README 전문과 루트 `SKILL.md`, 루트 `SYSTEM_PROMPT.md`, `agent-skills/orx-experiment-tree/SKILL.md` 전문 (2026-09-30)

지원 플랫폼과 설치 경로는 다음과 같다.

| 플랫폼 | 배포 형태 | 조건과 비고 |
|---|---|---|
| macOS | `install.sh` CLI 또는 서명된 `.dmg` 앱 | macOS 11 이상. 앱은 Developer ID 서명과 Apple notarization을 거쳤다. 관리형 Mac에서는 미서명 CLI가 차단될 수 있어 앱 경로를 권장한다 |
| Windows | `OpenResearch-Setup.exe` (beta) | Git for Windows가 필요하다. 사용자 계정 단위로 설치되고 관리자 권한을 묻지 않는다. 설치 파일이 아직 미서명이라 SmartScreen 경고가 뜬다 |
| Linux | AppImage (x86_64, ARM64) | glibc 2.35 이상. 스스로 업데이트하려면 쓰기 가능한 위치(예: `~/Applications`)에 둔다 |

CLI 설치는 `curl -LsSf https://openresearch.sh/install.sh | sh` 한 줄이고, 실행은 `orx up`이다. `orx up`은 `http://127.0.0.1:4791`에 로컬 대시보드를 연다. 앱에서 설치하는 경우 Settings의 Updates 항목에서 `orx` 명령을 `~/.local/bin`에 링크한다. 이전에 `install.sh`로 설치했다면 `~/.cargo/bin/orx`를 먼저 지워야 한다.

로컬 모델은 LM Studio, oMLX, Ollama, 사용자 지정 endpoint를 OpenCode를 통해 연결할 수 있다. openresearch.sh 계정은 이메일 업데이트 수신과 managed OpenResearch compute 사용에 쓰인다.

## 2. 주요 기여 (Key Contributions)

README의 "Built for research agents" 표가 제시하는 여섯 가지 기능은 다음과 같다.

| 기능 | 내용 |
|---|---|
| Parallel exploration | 연구 방향마다 독립된 agent session과 격리된 git worktree를 준다 |
| Reproducible experiments | 실험 변형을 git 기반 experiment tree로 추적하고, 모든 run이 기록된 commit의 불변 archive를 받는다 |
| Evidence in context | 로그, diff, 파일, 결과, artifact를 그것을 만든 작업에 묶어 둔다 |
| Your choice of agent | Claude Code, Codex, OpenCode, Cursor, Google Antigravity 가운데 harness와 모델을 session마다 고른다 |
| Your choice of compute | 로컬, 자체 인프라, managed OpenResearch compute 중에서 실행 위치를 고른다 |
| Local ownership | 프로젝트, 대화, 실험, run, 로그, 코드, artifact를 사용자 기기에 둔다 |

이 밖의 기여는 세 가지로 정리된다.

- **Autoresearch 루프**: 아이디어 제안, 코드 변경, 실험 실행, 증거 검토, 다음 시도 결정의 전체 루프를 자율로 반복한다. 여러 에이전트가 서로 다른 방향을 병렬로 탐색하고, experiment tree가 그 계보를 보존한다.
- **harness 중립 주입**: 같은 시스템 프롬프트("playbook")를 각 harness의 고유 채널로 넣는다. Claude Code는 `--append-system-prompt-file`, Codex는 `developerInstructions`, OpenCode는 config의 `instructions` 목록으로 받는다.
- **실험 규율의 명문화**: 루트 `SKILL.md`의 cardinal rules 네 가지와 `orx-experiment-tree` 모듈이 node 동결, run command 고정, 코드로만 변형, 트리 형태 규칙을 강제한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 구성 요소

| 구성 요소 | 역할 |
|---|---|
| `orx` CLI | 프로젝트, 실험 브랜치, 실행을 로컬 git 저장소와 로컬 DB 위에서 관리한다 |
| 로컬 대시보드 | `orx up`이 `127.0.0.1:4791`에 띄우는 브라우저 UI. 프로젝트를 import하거나 생성한다 |
| 로컬 저장소 | SQLite. 프로젝트를 만들거나 run을 실행해도 코드가 외부에 공개되지 않는다 |
| `SYSTEM_PROMPT.md` | 모든 agent session에 주입되는 playbook. 정체성, 프로젝트 정보, 상태, 응답 규약, 실행 정책, 스킬 라우팅을 담는다 |
| `agent-skills/` | session worktree에 설치되는 native 스킬 13개 모듈 |
| 루트 `SKILL.md` | `openresearch-cli` 스킬. cardinal rules와 명령 요약만 담고 세부는 모듈로 위임한다 |

`SYSTEM_PROMPT.md`는 렌더 시점에 `{name}`, `{id}`, `{artifacts}`, `{project_state}`, `{skill_names}` 같은 토큰을 치환해 쓴다 (`src/local/opencode.rs`의 `playbook_md()`). 파일 머리 주석에 따르면 playbook은 매 턴 필요한 지속 컨텍스트만 담고, 작업별 절차는 스킬로 분리한다.

### 3.2 스킬 모듈 13개

| 모듈 | 내용 |
|---|---|
| orx-experiment-tree | experiment tree 모델, auto-research 루프, `orx exp desc` |
| orx-create | 로컬 프로젝트 초기화, 실험 node 추가 |
| orx-compute | run 실행과 모니터링. backend를 정한 뒤 해당 reference를 읽는다 |
| orx-instances | 수동 작업용 상주 머신 생성 |
| orx-git | node 코드를 일반 git으로 읽고, 고치고, diff한다 |
| orx-agent-delegation | 독립 작업을 helper session에 안전하게 위임한다 |
| orx-evidence | run 로그로 실험 결과를 수집하고 검토한다 |
| orx-reports | 오래 남을 연구 산출물을 프로젝트 artifacts 디렉토리에 쓴다 |
| orx-figures | matplotlib 또는 TikZ로 출판 품질 그림을 만든다. 그림 코드 작성 전에 먼저 로드한다 |
| orx-customize | 프로젝트 공통으로 쓸 스킬과 LaTeX 템플릿을 추가한다 |
| orx-paper | 렌더와 컴파일이 되는 LaTeX 논문 초안을 작성한다 |
| orx-feedback | 연구 세부를 노출하지 않고 버그, 기능 요청, 사용자 불만을 보고한다 |
| orx-lit-review | 여러 코퍼스에 걸친 retrieval과 후속 조회 정책. 학술 질의의 기본 출발점이다 |

모듈은 `orx skill <name>`으로 로드하고, `compute/hf`처럼 모듈 내부 resource를 지연 로드할 수도 있다. 루트 `SKILL.md`는 스스로를 "의도적으로 짧다"고 밝히며 progressive disclosure 구조를 택한다.

### 3.3 cardinal rules 네 가지

루트 `SKILL.md`는 아래 네 규칙을 "스타일 선호가 아니라 위반 시 결과를 조용히 무효화하는 규칙"으로 규정한다.

| 번호 | 규칙 | 세부 |
|---|---|---|
| 1 | run이 답한 node는 수정하지 않는다 | run이 baseline을 세우거나 가설을 검증한 순간 node가 동결된다. root도 포함되며 동결은 영구적이다. 새 가설은 child를 branch해서 child를 고친다 |
| 2 | run command와 환경은 고정 계약이다 | child는 parent의 run command를 그대로 상속한다. node마다 시작 명령을 다르게 주거나 환경 변수(`LR=3e-4 python …`)로 동작을 바꾸지 않는다. node 간 차이는 브랜치에 commit된 코드와 config뿐이다 |
| 3 | 명령의 인자가 아니라 코드를 바꾼다 | hyperparameter는 코드와 config 파일에 쓰고 변형마다 child를 만든다. 모든 node가 같은 명령으로 다른 코드를 실행하므로 결과 요약이 서로 비교 가능하다 |
| 4 | 트리는 옆이 아니라 아래로 키운다 | 한 round 안에서만 조금 펼치고, 그 round의 승자 위로 내려가 다음 round를 시작한다. root 아래 직계 child만 길게 늘어선 모양이 실패 유형이다 |

### 3.4 experiment tree 모델

프로젝트는 실험 node의 트리다. root는 baseline이며 시작 코드와 run command를 가진다. run command는 node를 학습하거나 평가하고 결과를 run 로그에 출력하는 단일 셸 명령이다. 나머지 node는 parent에서 branch한 child로, parent의 코드와 run command를 상속한다. `orx create-experiment`는 child의 브랜치(`orx/<slug>`)를 출력한다.

node 생성 조건도 제한한다. 계획된 run이 baseline을 세우거나 프로젝트와 관련된 가설을 검증할 때만 node를 만들고, 무관한 정리, 리팩터, 버그 수정, 의존성 갱신을 위한 node는 만들지 않는다.

**provisional과 frozen의 구분.** run이 오류로 죽으면 아무것도 세우거나 검증하지 못했으므로 node는 provisional 상태로 남고, 같은 node의 브랜치를 제자리에서 고쳐 다시 실행한다. run이 원하던 결과를 내면(좋든 나쁘든 `nan`이든) node는 동결된다. OOM, timeout, 버그로 인한 발산, 누락된 의존성은 답이 아니라 구현 세부로 본다. 단 node의 가설 자체가 메모리나 실행 시간에 관한 것이면 그 결과가 곧 답이다.

**repair cap.** 한 node에서 아무것도 답하지 못한 run이 연속 2회 나오면 사용자에게 묻는다. 오류 종류가 달라도 횟수에 들어가고, 단순 재실행이나 flavor, backend 교체도 repair로 센다. 같은 실패가 두 번째 node에서 나오면 하나의 setup 문제로 보고 그때 묻는다. 이 한도는 과학적 중단 기준(연속 약 3회 실패 또는 성능 후퇴)과 별개다.

### 3.5 트리 형태 규칙

`orx-experiment-tree` 모듈은 잘못된 두 형태와 올바른 한 형태를 대비한다.

| 형태 | 모양 | 판정 | 문제 |
|---|---|---|---|
| flat fan | root 아래에 a부터 n까지 모두 직계 child | 잘못됨 | 모든 결과를 시작점과 비교하므로 성과가 누적되지 않는다 |
| noodle | 외자식만 이어지는 긴 사슬 | 잘못됨 | 각 단계가 위 단계 위에 실제로 쌓이지 않는, 깊이를 위한 깊이다 |
| stacked bushes | round마다 작은 fan, 다음 round는 승자 아래 | 올바름 | 폭은 한 결정의 선택지, 깊이는 이미 해결된 결정의 누적이 된다 |

모양을 만드는 규칙은 하나다. X를 Y의 child로 만들기 전에 "Y가 확립한 무엇 위에 X가 쌓이는가"를 말할 수 있어야 한다. 예를 들어 "Y가 LR 승자이고 X는 그 LR을 유지한 채 architecture를 바꾼다"라고 말할 수 있으면 X는 Y의 child다. 반대로 lr 2e-5와 lr 3e-5처럼 동시에 시험하는 대등한 선택지는 같은 bush의 sibling이다.

### 3.6 auto-research 루프 7단계

1. baseline 코드를 읽는다. 에이전트는 이미 프로젝트 저장소의 private worktree 안에 있으므로 브랜치를 checkout해 읽고, `orx exp status <expId>`로 run command를 확인해 조절 지점(config, hyperparameter, 모델 정의)을 찾는다.
2. 한 round 분량의 가설을 세운다. 가설은 하나의 결정(어떤 LR, 어떤 schedule, 어떤 init)에 대한 대등한 선택지여야 하며, 다른 round의 결정을 한 batch에 섞지 않는다.
3. round를 bush로 만들고 parent를 의도적으로 고른다. 첫 round만 baseline 아래, 이후 round는 직전 round의 확정된 승자 아래에 둔다.
4. 각 child의 변경을 그 git 브랜치에서 구현하고 commit한다. run command는 건드리지 않는다. 실행 전에 `orx-evidence`를 로드해 commit된 코드가 판정에 충분한 증거를 출력하는지 확인한다.
5. 준비된 child를 `orx exp run <childId> --backend <b>`로 실행한다. 원격 backend는 sibling을 병렬로 실행할 수 있고, `--backend local`은 로컬 CPU, RAM, GPU를 공유한다.
6. 전체 완료를 기다리지 않고 완료 하나마다 도는 루프로 round를 진행한다. `orx exp wait --project <projectId>`는 첫 완료에서 반환한다. 반환될 때마다 `orx runs <projectId>`를 다시 읽어 진실의 원천(source of truth)으로 삼고, 처리하지 않은 모든 종료 run을 처리한다. `drained: no runs in flight`가 출력되면 루프를 끝낸다.
7. 완료된 run마다 `orx logs <runId>`가 알려준 파일에서 결과를 실제로 읽고, parent 브랜치와 diff해 변경을 확인한 뒤 네 가지 행동 중 하나를 고른다.

| 행동 | 조건 | 내용 |
|---|---|---|
| Repair | run이 아무것도 답하지 못함 | 같은 node의 브랜치를 고쳐 다시 실행한다 |
| Refill | 결과가 평범하거나 결론이 나지 않음 | 대기 중인 다음 child를 실행해 round를 이어 간다 |
| Promote | 명확한 승리 | 이 node가 다음 round의 parent가 된다. 트리를 깊게 만드는 유일한 행동이다 |
| Stop | 목표 달성 또는 가지 소진 | 트리 전체를 프로젝트 artifact로 정리한다 (`orx-reports`) |

중단 기준은 목표 달성 또는 연속 약 3회 실패나 성능 후퇴다. 실험을 실행하거나 바꾼 턴은 node마다 한 줄씩(검증 대상, 상태, 대표 결과) 요약으로 끝낸다. 각 node의 description은 `orx exp desc`로 읽고 쓰는 markdown 필드이며, 쓰기는 전체 덮어쓰기다.

### 3.7 실행 위치와 원격 사용

같은 commit된 source snapshot을 로컬, SSH, Slurm, Kubernetes, Ray, Hugging Face Jobs, Modal, Tinker, managed OpenResearch compute에서 실행할 수 있고, 저장소를 공개할 필요가 없다. `orx up --remote user@host`는 작업 공간을 원격 GPU 옆에서 실행하고 브라우저만 노트북에서 쓰게 한다. SSH config alias와 사용자 지정 포트를 지원한다. 다만 원격 서비스는 loopback에 bind되고 애플리케이션 수준 인증이 없어, 같은 호스트의 다른 사용자가 접근할 수 있다.

### 3.8 명령 체계

명령은 scope별로 나뉘며 id를 섞어 쓰지 않는다. 프로젝트 id는 `orx projects`, 실험 id는 `orx project view`, run id는 `orx runs`에서 얻는다.

| 묶음 | 대표 명령 | 로그인 필요 |
|---|---|---|
| 인증 | `orx login`, `orx logout` (토큰은 `~/.config/openresearch/credentials.json`) | 해당 없음 |
| 탐색 | `orx projects`, `orx orgs`, `orx project view`, `orx runs` | `orx orgs`만 필요 |
| 증거 | `orx logs <runId>` (로그 경로, 크기, 짧은 미리보기) | 불필요 |
| 생성과 실행 | `orx project edit --run-command`, `orx create-experiment`, `orx exp status/run/cancel/wait/wake`, `orx exp desc`, `orx agent spawn` | 로컬은 불필요 |
| compute | `orx compute status/show/test/configure/connect`, `orx instance create` | OpenResearch compute와 instance는 필요 |
| 문헌 | `orx discover keyword/embedding/openalex/biorxiv/pubmed`, `orx paper <id>` | 불필요 |
| 커스터마이즈 | `orx skills add`, `orx templates add` | 불필요 |
| 메타 | `orx skill [name]`, `orx feedback`, `orx telemetry` | 해당 없음 |

문헌 명령은 alphaXiv의 full-text retrieval(`keyword`)과 semantic retrieval(`embedding`), OpenAlex, bioRxiv(OpenAlex 인덱스 경유), PubMed(NCBI E-utilities)를 쓴다. `SKILL.md`는 학술 질의에서 웹 검색보다 먼저 이 명령을 쓰라고 지시한다. `orx paper`는 alphaXiv report를 가져오고, 없으면 full text로 자동 fallback하며 `--full`로 원문을 강제할 수 있다. `embedding` 결과는 main agent가 순위를 매기고 후속 조회를 결정한다.

### 3.9 playbook의 응답 규약

`SYSTEM_PROMPT.md`가 정한 주요 규약은 다음과 같다.

- **orx는 숨긴다**: `orx`는 내부 도구이므로 사용자 응답에서 언급하지 않는다.
- **주장마다 근거 태그**: 코드와 파일 사실은 `<file path="..." lines="20-40" />`, 측정 결과는 `<run id="..." label="+3.65pp" />`, artifact는 `<file path="artifacts/..." />`로 주장 바로 뒤에 단다. 추론은 관찰과 구분해 명시한다. 결과를 보고하기 전에 인용한 run의 로그를 읽어야 하며, 상태만으로는 증거가 되지 않는다.
- **이미지 표시**: 이미지는 Markdown으로 인라인 표시하고 같은 파일은 대화당 한 번만 보인다. 제목 문자열을 주면 캡션이 붙은 figure로 렌더된다.
- **Python 환경**: 사용자 지시와 기존 도구를 따르고, 없으면 uv를 우선한다. `pyproject.toml`만으로 uv를 가정하지 않는다. `.venv`는 worktree끼리 복사하거나 공유하지 않는다. 실험을 branch하기 전에 baseline 의존성을 확정하고, run recipe가 commit된 snapshot에서 의존성을 재구성하게 한다.
- **스킬 우선**: 영역에 맞는 스킬을 행동 전에 로드한다. 기본 matplotlib 출력은 출판용이 아니므로 그림 전에 `orx-figures`를 로드한다.

### 3.10 텔레메트리와 피드백

공식 release 빌드는 무작위 설치 ID에 묶인 거친 사용 이벤트를 opt-out 방식으로 보낸다. 코드, 프롬프트, 파일 내용과 경로, 저장소 이름, 토큰, 이메일, 프로젝트와 실험 식별자는 포함하지 않는다. `orx telemetry off`로 끄고, `--no-telemetry`는 그 명령 하나에만 적용된다. source 빌드와 개발 빌드는 분석 데이터를 보내지 않는다. coding agent는 사용자가 버그나 불만을 겪을 때 `orx feedback`으로 제품 피드백을 보낼 수 있고, 로그인 상태면 계정에 연결된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README와 수집한 문서에는 정량 벤치마크가 없다. 확인되는 지표는 다음뿐이다.

- GitHub star 6065 (2026-09-30 수집 시점, 저장소 생성 후 약 4개월)
- Trendshift "GitHub Trending #1 Repository of the Day" 배지
- `SYSTEM_PROMPT.md`의 run 태그 예시 `label="+3.65pp"`는 표기 형식 예시일 뿐 실제 측정 결과가 아니다

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **서명 미완료**: `install.sh`로 설치하는 CLI와 Windows 설치 파일은 아직 서명되지 않았다. 관리형 Mac에서는 기기 관리 정책이 CLI를 막을 수 있다.
- **Windows는 beta**: Git for Windows 설치가 선행 조건이다.
- **원격 모드 인증 부재**: `orx up --remote`의 원격 서비스는 애플리케이션 수준 인증이 없어 공유 호스트의 다른 사용자가 접근할 수 있다.
- **기본 텔레메트리**: 공식 빌드는 opt-out 방식이라 기본으로 사용 이벤트를 보낸다.
- **계정 의존 기능**: 조직, managed compute, instance 생성은 openresearch.sh 로그인이 필요하다.
- **수동 개입 지점**: repair cap(연속 2회)과 과학적 중단 기준(연속 약 3회)에 걸리면 사용자에게 돌아온다. 완전 무인 실행은 이 두 한도 안에서만 가능하다.
- **정량 검증 부재**: autoresearch 루프가 사람이 직접 운영하는 실험보다 나은지를 보여 주는 수치는 README에 없다.

## 6. 관련 연구 (Related Work)

- **karpathy/autoresearch**: 이 wiki의 [[agents/lee-hoyeon-2026-harness-engineering]]가 "사람이 방향만 정하고 에이전트가 밤새 실험을 반복하는" 패턴으로 소개한 저장소다. OpenResearch는 README에서 autoresearch를 표방하며 여기에 experiment tree와 병렬 worktree를 더한다 (README는 karpathy 저장소를 직접 언급하지 않는다).
- **Imbad0202/academic-research-skills**: [[agents/imbad0202-academic-research-skills]]는 Claude Code 스킬로 논문 집필과 심사 파이프라인을 만든다. OpenResearch는 집필보다 실험 실행과 계보 관리에 중심을 둔다.
- **stanford-oval/storm**: [[agents/stanford-oval-storm]]는 문헌 조사로 긴 글을 쓰는 데 초점을 둔다.
- **llmsresearch/paperbanana**: [[agents/llmsresearch-paperbanana]]는 논문 그림 생성을 다루며 `orx-figures` 모듈과 영역이 겹친다.
- **Agent Skills 포맷**: `SKILL.md` 기반 모듈 구조는 [[agents/agentskills-agentskills]]의 포맷을 따른다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| `orx` | OpenResearch CLI. 프로젝트, 실험 브랜치, 실행, 문헌 조회를 담당한다 |
| experiment tree | 실험 node를 git 브랜치로 표현한 트리. root가 baseline이고 child가 parent의 코드와 run command를 상속한다 |
| experiment node | 트리의 한 실험 단위. 하나의 git 브랜치(`orx/<slug>`)와 description을 가진다 |
| run command | node를 학습하거나 평가하고 결과를 로그에 출력하는 단일 셸 명령. 모든 node에서 동일하다 |
| frozen node | run이 baseline을 세우거나 가설에 답한 뒤 영구히 수정이 금지된 node |
| provisional node | 아직 run이 답하지 못해 제자리 수정이 허용되는 node |
| stacked bushes | round 안에서는 대등한 선택지를 sibling으로 펼치고, 다음 round는 승자 아래로 내려가는 트리 형태 |
| flat fan / noodle | 각각 root 아래 직계 child만 늘어선 형태, 외자식 사슬 형태. 둘 다 잘못된 트리 형태다 |
| repair cap | 한 node에서 답 없는 run이 연속 2회 나오면 사용자에게 묻는 한도 |
| Promote | 명확한 승자를 다음 round의 parent로 삼는 행동 |
| playbook | `SYSTEM_PROMPT.md`로 모든 agent session에 주입되는 시스템 프롬프트 |
| managed OpenResearch compute | openresearch.sh 계정으로 쓰는 관리형 연산 자원 |
