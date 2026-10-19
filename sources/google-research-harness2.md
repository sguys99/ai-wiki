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
tags: [harness-evolution, recursive-self-improvement, opencode, codex, benchmark-runner]
---

## 한 줄 요약 (One-line Summary)

google-research/harness2는 Harness² 논문의 공식 구현으로, OpenCode나 Codex 실행자 위에서 병렬과 순차 recursion을 돌려 JobBench, LAB, WorkBuddy-Bench 작업마다 harness를 정제하고 도메인별 library에 경험을 쌓는 Python 패키지와 CLI, 벤치마크 어댑터를 제공한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | github.com/google-research/harness2 (기본 브랜치 main) |
| 라이선스 | Apache-2.0. `third_party/`의 코드, 벤치마크, 데이터셋은 각 upstream 라이선스 유지 |
| 생성 / 마지막 push | 2026-10-06 / 2026-10-14 |
| stars | 6,094 (수집 시점 2026-10-19) |
| 수집 범위 | README.md, docs/SETUP.md, docs/BENCHMARKS.md, docs/EXPERIMENTS.md, dependencies/PINNED.md 전문 |
| 관련 자료 | 논문 arXiv 2610.14224, 웹 harness2.github.io |
| 고지 | Google 공식 지원 제품이 아니며 Google 오픈소스 취약점 보상 프로그램 대상이 아니다 |

패키지 구조는 다음과 같다.

| 경로 | 내용 |
|---|---|
| `harness2/core/` | proposer, recursion, schedule, selection, library, ledger, tree, judge, prompts(약 66KB), spec, context, report |
| `harness2/substrate/` | 실행자 어댑터: `opencode.py`, `codex.py` |
| `harness2/benchmarks/` | `jobbench.py`, `lab.py`, `workbuddy.py`와 렌더러, 작업 정의 |
| `harness2/cli/` | setup, check, judge, report, run_sweep, demo, bridge |
| `third_party/` | jb_runner, lab_runner, wb_runner와 upstream 호환 패치(opencode, harvey-labs judge, job-bench-eval judge, workbuddy-bench runtime) |
| `scripts/` | `run_jobbench.sh`, `run_lab.sh`, `run_workbuddy.sh`, `split_tasks.py`, `check_provenance.py` |

## 2. 주요 기여 (Key Contributions)

- harness를 "모델이 에이전트로 행동하게 하는 시스템(프롬프트, 도구, 메모리, 스킬, 오케스트레이션 등)"으로, harnessing을 "그 시스템을 최적화하는 과정"으로 정의하고, 모델 가중치를 고정한 채 두 수준의 recursion을 잇는 plug-and-play 프레임워크를 공개한다.
- 작업 수준 recursion은 Propose, Probe, Compose 대조 단계로 정답 피드백 없이 현재 작업의 execution harness를 정제하고, harnessing 수준 recursion은 채택된 harness와 증거가 뒷받침하는 교훈으로 지속적 improvement harness를 갱신한다.
- 병렬과 순차 recursion, OpenCode와 Codex 실행자, JobBench와 LAB와 WorkBuddy-Bench를 지원한다.
- 모델 자격 증명 없이 결정적 편집자와 실제 Python 실행으로 두 recursion 방식을 체험하는 로컬 데모(`harness2-demo`)를 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 편집 가능한 구성 요소

harness는 시스템 프롬프트, 가드레일, 메모리, tool guidance, 서브에이전트, 스킬, 스크립트, plugin 8개 구성 요소를 노출한다. README 도식은 이를 런타임 역할로 묶는다. 시스템 프롬프트, 가드레일, 메모리, 스킬은 컨텍스트를 구성하고, tool guidance와 스크립트는 도구 인터페이스를 정의하며, 서브에이전트는 위임 작업을 오케스트레이션하고, plugin은 미들웨어를 제어한다.

### 3.2 recursion 방식과 옵션

두 방식 모두 같은 base harness의 참조 실행 k개로 시작한다.

| 옵션 | 동작 |
|---|---|
| `--k 1` | Propose, Probe, Compose 한 단계, 채택 뒤 reflection |
| `--k K --mode parallel` | 범위당 후보 K개 탐색(general/invariant K개, domain K개) 뒤 합성 K개 생성 |
| `--k K --mode sequential` | 연속 K단계로 harness 정제 |
| `--workers N` | 도메인 N개를 동시 실행. 도메인 안의 작업은 순서 유지 |
| `--substrate cx` | 기본 OpenCode 대신 Codex 실행자 |
| `--seed N` | 작업 스트림을 재현 가능하게 섞는다. 모델 샘플링은 제어하지 않는다 |

README의 그림 설명은 "병렬 recursion은 더 넓게 탐색하고 순차 recursion은 더 깊게 정제한다"이다. 채택 뒤 reflection은 채택된 harness와 증거 기반 교훈을 도메인별 library에 저장한다. 도메인 안의 작업은 순서대로 실행되고 앞선 항목만 읽으며, 서로 다른 도메인은 동시에 실행될 수 있다. library는 벤치마크, 실행자, 모드, 예산, seed별로 분리된다.

### 3.3 설치와 모델 설정

- 환경: Linux, Python 3.12(패키지는 3.13도 지원), uv. 벤치마크 실행에는 Node.js 20 이상, Google Cloud CLI가 필요하고 LAB은 Pandoc과 Poppler, WorkBuddy-Bench는 Docker가 필요하다. 벤치마크 setup이 고정 버전 Bun 런타임을 `dependencies/` 아래 설치한다.
- 설치: `uv venv --python 3.12 .venv`, `uv pip install -e '.[render]'`, 데모 `harness2-demo --output runs/demo --k 2`.
- 모델: `.env.example`을 `.env`로 복사해 Vertex AI 프로젝트와 모델 ID를 적고 `gcloud auth application-default login`으로 인증한다.

| 설정 | 의미 |
|---|---|
| `HARNESS2_SOLVER_MODEL` | 실행자 모델 (OpenCode의 `provider/model` 형식) |
| `HARNESS2_IMPROVER_MODEL` | improver 모델. 기본값은 실행자 |
| `HARNESS2_JUDGE_MODEL` | judge 모델 ID (Vertex 접두는 어댑터가 붙인다) |
| `HARNESS2_RUNS_DIR` | 출력 루트, 기본 `runs/` |

기본 구성은 Vertex Gemini 실행자와 judge를 쓰고, improver는 Vertex Claude나 Gemini를 쓴다. 인증 대안으로 attached service account, `--no-browser` 로그인, `GOOGLE_APPLICATION_CREDENTIALS` 키 파일, service account impersonation을 든다.

### 3.4 Codex 실행자

Codex 실행자는 Responses API 엔드포인트에 연결한다. Vertex Gemini를 쓸 때는 포함된 `harness2-bridge`가 로컬 LiteLLM 서버로 이 인터페이스를 제공한다(`uv pip install -e '.[render,bridge]'`). bridge가 출력하는 `HARNESS2_CODEX_*` 설정을 `.env`에 넣고 setup, check, 정제, judge, report 모두에 `--substrate cx`를 준다. WorkBuddy는 Docker 컨테이너 안에서 Codex를 돌리므로 bridge가 `--host 0.0.0.0`으로 열려야 하며, 이는 모든 네트워크 인터페이스에 바인딩되므로 접근 대상을 제한해야 한다. Codex는 샌드박스를 끈 채 실행된다.

### 3.5 벤치마크 실행 흐름

```bash
harness2-setup lab
harness2-check --bench lab
harness2 --bench lab --k 1 --mode parallel --only-domains antitrust-competition --max-tasks 1
harness2-judge --bench lab --k 1 --mode parallel
harness2-report --bench lab --k 1 --mode parallel
```

judge와 report는 정제 실행과 같은 벤치마크, 실행자, subset, `--k`, `--mode`, seed를 써야 한다. `harness2 --dry-run`은 모델 호출 없이 작업 선택을 미리 보여 준다. 같은 명령을 다시 실행하면 이어서 진행하고, 모델이나 작업 선택을 바꾸면 새 `HARNESS2_RUNS_DIR`을 써야 한다(저장된 설정이 호환 안 되는 재개를 막는다).

| 벤치마크 | upstream | 작업 | 채점과 주의 |
|---|---|---|---|
| LAB | harveyai/harvey-labs | 실무 분야별 법률 작업. 전체 스트림 1,143개 | judge는 선택 이후에만 출력을 읽는다. Partial(기준 통과 비율)과 All-pass 보고. judge 실패는 미채점으로 남고 Vertex 429는 할당량 문제다. improver에 넘기는 자료에서 기준을 제거한다 |
| JobBench | Job-Bench/job-bench-eval, 데이터 HF JobBench/job-bench | 직업 디렉토리별 전문 작업 | rubric은 improver 증거 밖에 둔다. 데이터셋은 다운로드 시점 revision으로 해석되므로 기록된 revision을 결과와 함께 보고한다 |
| WorkBuddy-Bench | Tencent/workbuddy-bench | office, web, code subset | Docker 필요. 지역 제한이 있는 Tencent 맞춤 라이선스. 다운로드는 SHA256SUMS 검증 필수. rollout마다 새 컨테이너, verifier의 `score.json`만 읽고 improver는 verifier 출력을 받지 않는다 |

### 3.6 재현성과 비용

- 모델 기반 실행은 실행자 rollout과 개선 단계에 API 비용이 든다. 작은 선택(`--only-domains`, 도메인당 상한인 `--max-tasks`)으로 시작하라고 권한다.
- 예산이나 모드를 비교할 때는 작업 선택, 실행자, improver, judge, 웹 접근을 고정한다.
- `scripts/split_tasks.py --bench lab --seed 42`로 도메인 층화 분할을 만들고 `--split-file`과 `--split test`로 실행할 수 있다(기본 train 비율 0.5, 기존 파일 덮어쓰기 거부).
- `harness2-judge --bases`는 참조 실행을 채점해 `base_judged.json`을 쓴다. `harness2-report`는 정제된 harness만 다룬다.

### 3.7 웹 접근과 보안

실행자의 네트워크 접근은 제한되지 않고 Codex는 샌드박스를 끈 채 실행된다. 세 벤치마크가 모두 공개돼 있고 JobBench는 작업별 `RUBRICS.json`을 Hugging Face에 공개하므로, 네트워크가 열린 실행자는 채점 기준을 가져올 수 있다. 실제로 이 릴리스의 검증 실행에서 JobBench의 Codex rollout 하나가 지시 없이 자기 작업의 rubric을 내려받았다. 문서는 setup 이후 실행자에 대해 `huggingface.co`, `hf.co`, `*.hf.co` 등의 호스트를 막으라고 권한다. setup 자체는 github.com, registry.npmjs.org, huggingface.co, Docker registry, astral.sh에 접근한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README가 보고하는 결과는 논문 요약과 같다. 벤치마크 3종, 모델과 harness 조합 4가지에서 Harness² 단일 단계가 GLM-5와 Gemini 3.5 Flash를 base harness 대비 개선하며, 최대 이득은 WorkBuddy-Bench 11.5점, JobBench 4.5점, LAB Partial 11.8%p다. 작업 수준 recursion 예산을 늘리면 이득이 더 커진다. 세부 수치는 논문 sources가 담는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 모델 기반 실험은 API 비용이 들고 예산을 늘리면 실행 횟수가 늘어난다.
- 기본 설정에서 실행자 네트워크가 열려 있고 Codex 샌드박스가 꺼져 있어, 평가 전 네트워크 제한을 직접 구성해야 한다.
- 설치 점검(`harness2-check`)은 의존성, 자격 증명, 설정만 보고 모델 접근 가능 여부는 확인하지 않는다. 실행자, improver, judge 모델 접근은 처음 호출될 때 드러난다.
- wheel 설치는 `harness2` 패키지만 포함하며 작업 분할 스크립트는 소스 트리가 필요하다.
- WorkBuddy-Bench는 Vertex 경로에서 실행자가 `google-vertex/gemini...` ID, judge가 `gemini...` ID여야 setup이 진행된다.

## 6. 관련 연구 (Related Work)

- 논문: Harness² (Xu et al., 2026, arXiv 2610.14224). 방법, baseline(ReasoningBank, Meta-Harness, Harness Scaling), 결과 분석은 논문 sources 참고.
- 실행자: OpenCode(SST), Codex CLI(OpenAI).
- 벤치마크: Harvey LAB, JobBench, Tencent WorkBuddy-Bench.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| substrate | 실행자 harness 종류를 고르는 옵션. 기본 OpenCode, `cx`는 Codex |
| solver / improver / judge model | 작업을 실행하는 모델, harness를 편집하는 모델, 산출물을 채점하는 모델 |
| harness2-bridge | Vertex Gemini를 Codex가 요구하는 Responses API로 노출하는 로컬 LiteLLM 서버 |
| `--k`, `--mode` | 작업 수준 recursion 예산과 방식(parallel, sequential) |
| run namespace | `HARNESS2_RUNS_DIR` 아래 벤치마크, subset, k, mode, seed 조합으로 정해지는 결과 디렉토리 |
