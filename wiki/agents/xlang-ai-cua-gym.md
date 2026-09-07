---
title: "xlang-ai/CUA-Gym"
type: repo
year: 2026
category: agents
raw_path: raw/repos/xlang-ai-cua-gym.md
raw_filename: "xlang-ai-cua-gym.md"
source_collection: external
source: xlang-ai-cua-gym.md
org: "xlang-ai"
repo: "CUA-Gym"
url: "https://github.com/xlang-ai/CUA-Gym"
license: "Apache-2.0 (코드와 파이프라인) / CC BY 4.0 (데이터셋)"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, environment-synthesis, mock-web-apps, claude-code, playwright]
---

## 요약

CUA-Gym 저장소는 computer-use agent를 강화학습으로 훈련시킬 데이터를 자동 합성하는 파이프라인의 공식 구현이다. topic 하나를 입력하면 task 지시문, 환경 상태, reward 함수를 검증된 세 요소 묶음으로 함께 생성한다. README는 이전까지 사람 전문가가 맡던 엔지니어링 작업을 코딩 에이전트에 넘긴 것이 핵심이라고 설명한다.

이 페이지는 저장소가 담당하는 범위, 곧 구현 구조와 설치, 설정, 실행 절차를 다룬다. 설계 근거와 실험 설계는 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]], 공개 데이터의 통계와 스키마는 [[agents/xlangai-cua-gym-dataset]]가 담당한다.

논문에 없는 정보가 저장소에만 있다. 에이전트와 스크립트의 실제 이름, 설치 명령, 요구 환경 변수, mock 웹 앱을 로컬에서 띄우는 절차, 그리고 공개 데이터셋의 URL placeholder를 자기 배포 주소로 치환하는 절차가 그렇다. 반대로 학습 알고리즘과 ablation은 저장소에 없다.

공개 범위는 아직 완결되지 않았다. 파이프라인과 데이터셋은 2026-05-21에 공개됐고, 모델 가중치는 README 배지가 coming soon으로 표기하며, 남은 데이터는 행정 검토를 거쳐 단계적으로 공개한다고 밝힌다.

## 핵심 개념

RLVR은 정답 여부를 프로그램이 판정할 수 있는 과제로 강화학습을 수행하는 방식을 말한다. 사람이 점수를 매기는 대신 코드가 채점하므로 데이터 규모를 키우기 쉽다.

reward는 에이전트가 과제를 얼마나 잘 수행했는지 알려주는 스칼라 신호다. CUA-Gym에서 reward는 스크린샷 판독이나 사람 라벨이 아니라 `reward.py`라는 실행 가능한 파이썬 함수로 표현된다.

harness는 모델을 감싸 도구와 검증, 상태를 제공하는 실행 환경을 뜻한다. CUA-Gym의 task 생성 단계는 독립 스크립트가 아니라 Claude Code라는 코딩 에이전트 harness 안에서 진행된다.

rollout은 에이전트를 실제로 실행해 trajectory 하나를 만들어내는 과정이다. 저장소는 필터 2단계에서 teacher rollout을 쓴다고 밝힌다.

강화학습 훈련에 쓰이는 데이터 단위는 (지시문, 실행 가능한 환경, 검증 가능한 reward) 세 요소가 서로 일관되게 맞물린 묶음이다. README는 이런 묶음 하나를 손으로 작성하는 데 몇 시간이 걸린다는 점을 문제 설정으로 제시하고, CUA-Gym이 이 작업을 대규모로 자동화한다고 적는다.

## 저장소 좌표와 공개 상태

| 항목 | 값 |
|---|---|
| 저장소 | github.com/xlang-ai/CUA-Gym |
| 조직 / 이름 | xlang-ai / CUA-Gym |
| 논문 | arXiv 2605.25624 |
| 블로그 | bowenbryanwang.github.io/blog/introducing-cua-gym |
| 데이터셋 | huggingface.co/datasets/xlangai/CUA-Gym |
| 환경 층 | github.com/xlang-ai/CUA-Gym-Hub (별도 저장소) |
| 모델 가중치 | 미공개, README 배지가 coming soon |
| 요구 Python | 3.10 이상 |
| 코드 라이선스 | Apache-2.0 (코드, 도구, 파이프라인) |
| 데이터 라이선스 | CC BY 4.0 |
| 릴리스 | 2026-05-21 파이프라인과 데이터셋 공개 |
| 저자 | bibtex 기준 14명, Bowen Wang이 첫 저자이고 Tao Yu가 마지막 저자다 |

README 상단은 논문, 블로그, 데이터셋, Data Viewer, 모델, CUA-Gym-Hub 여섯 링크와 arXiv, Dataset, Models, License, Python 다섯 배지로 시작한다. 모델 배지만 링크 없는 회색 배지라서, 배지 목록만 봐도 어느 산출물이 아직 나오지 않았는지 구분된다.

저자 소속 기관의 서술은 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다. README 자체에는 소속 표기가 없고 bibtex의 저자 목록만 있다.

## 파이프라인 구조

### task당 조율되는 세 에이전트

파이프라인의 최소 실행 단위는 task 하나이고, task마다 세 에이전트가 조율되어 동작한다. 두 에이전트가 환경과 채점을 나눠 만들고, 나머지 하나가 둘을 반복 실행시키며 수렴을 판정한다.

| 에이전트 | 저장소 이름 | 역할 | 산출물 |
|---|---|---|---|
| Generator | `setup-gen` | 초기 환경 상태와 golden 환경 상태를 구성한다 | `initial_setup.py`, `golden_patch.py` |
| Discriminator | `reward-gen` | task 설명만 보고 채점 함수를 작성한다 | `reward.py` |
| Orchestrator | 배치 스크립트 | 두 에이전트를 여러 라운드 반복시켜 수렴 여부를 판정한다 | 검증을 통과한 튜플 |

Generator가 만드는 파일이 두 개인 이유는 채점의 양 끝점을 모두 준비해야 하기 때문이다. `initial_setup.py`는 에이전트가 아무것도 하지 않은 출발 상태를 만들고, `golden_patch.py`는 과제를 완벽히 수행했을 때의 도착 상태로 가는 변경을 담는다.

이와 별개로 파이프라인 앞단에는 네 번째 에이전트 `task-gen`이 있다. topic을 받아 task 지시문 묶음을 JSON으로 뽑는 역할이며, 세 에이전트 루프의 입력을 만든다.

### 정보 차단과 수렴 판정

Discriminator는 Generator가 쓴 코드에 접근하지 못한다. README는 이 제약을 information barrier라고 부르며, `reward.py`를 task 설명만으로 작성하게 만드는 장치다. 채점 함수가 특정 setup 구현의 내부 세부에 맞춰지면 그 구현으로만 정답이 되는 reward가 만들어지므로, 정보를 미리 끊어 이를 막는다.

수렴 판정은 두 등식이 실행 상태에서 동시에 성립하는지를 본다.

| 조건 | 뜻 | 성립하지 않을 때의 문제 |
|---|---|---|
| `reward(golden) = 1.0` | golden 상태를 채점하면 만점이 나온다 | 정답을 정답으로 인정하지 못한다 |
| `reward(initial) = 0.0` | 초기 상태를 채점하면 0점이 나온다 | 아무것도 하지 않아도 점수를 준다 |

두 조건은 함께 성립할 때만 의미를 갖는다. 앞의 조건만 성립하면 항상 만점을 주는 reward가 통과하고, 뒤의 조건만 성립하면 어떤 성공도 인정하지 않는 reward가 통과한다. Orchestrator는 두 조건이 함께 성립할 때까지 Generator와 Discriminator를 반복 실행한다.

### 필터 두 단계

수렴한 튜플도 곧바로 학습 데이터가 되지 않고 두 단계 필터를 지난다. 수렴 판정은 초기 상태와 golden 상태 두 지점만 확인하고, 필터는 그 두 지점 사이에서 채점이 흔들리는 task를 따로 걸러낸다.

| 단계 | 수단 | 걸러내는 대상 |
|---|---|---|
| 1단계 | LLM 다수결 필터 `filter/majority_vote_filter.py` | reward가 취약하거나 모호하거나 일관되지 않은 task |
| 2단계 | teacher rollout | 1단계 통과분에서 다시 문제가 드러나는 task |

teacher rollout이 두 번째 필터 단계라는 내용은 README에 한 문장으로만 나오고 세부 설정은 없다. 실험 설정은 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다.

## 설치와 자격증명

### 설치 명령

설치는 편집 가능 모드로 패키지를 깔고 환경 파일을 복사하는 두 단계다. 개발 의존성까지 함께 받는 `[dev]` extra를 쓴다.

```bash
git clone https://github.com/xlang-ai/CUA-Gym
cd CUA-Gym
pip install -e ".[dev]"
cp .env.example .env      # OPENAI_API_KEY, ALIYUN_* 자격증명 기입
```

### 환경 변수

파이프라인은 외부 모델 API 자격증명 없이는 동작하지 않는다. `.env.example`을 복사한 뒤 채워야 하는 값과, 웹 task 실행 시점에 별도로 필요한 값이 나뉜다.

| 변수 | 쓰이는 곳 | 비고 |
|---|---|---|
| `OPENAI_API_KEY` | 파이프라인 전반과 다수결 필터 | 필터 실행 시 셸에서 `export`로 다시 지정하는 예시도 함께 제시된다 |
| `ALIYUN_*` | 파이프라인 전반 | README는 접두어만 밝히고 개별 키 이름은 적지 않는다 |
| `CUA_GYM_GMAIL_URL` 등 `CUA_GYM_*_URL` | 웹 task의 setup과 reward | 자기 배포 mock 주소를 담는다. `.env.cua-gym` 같은 별도 파일에 둔다 |

Aliyun 자격증명을 요구한다는 점은 실행 문턱을 높인다. 필터의 기본 예시 모델도 `gpt-4o`라서, 저장소를 그대로 실행하려면 상용 API 두 곳에 계정이 필요하다.

## 실행 흐름

### 진입점 카탈로그

README의 Getting Started 절은 다섯 블록으로 나뉘고, 각 블록이 하나의 진입점에 대응한다.

| 순서 | 작업 | 진입점 | 산출 위치 |
|---|---|---|---|
| 1 | 설치와 자격증명 설정 | `pip install -e ".[dev]"`, `cp .env.example .env` | `.env` |
| 2 | 도메인별 task 생성 | Claude Code에서 `task-gen` 에이전트 호출 | `output/task_generation/<topic>.json` |
| 3 | 적대적 co-generation 루프 | `scripts/batch_orchestrator.py` | `output/final/<task_id>/` |
| 4 | 다수결 필터 | `filter/majority_vote_filter.py` | 기존 task 디렉토리에 반영 |
| 5 | 사전 생성 데이터셋 수령 | `huggingface-cli download` | `data/` |

1단계부터 4단계까지가 데이터를 직접 만드는 경로이고, 5단계는 이미 만들어진 데이터를 받는 경로다. 두 경로 중 하나만 쓸 수도 있다.

### task 생성

task 생성은 셸 스크립트가 아니라 Claude Code 세션 안에서 진행된다. 저장소 디렉토리에서 `task-gen` 에이전트를 호출하고 자연어로 요구를 적으면 된다. README의 예시 지시문은 "Generate 50 LibreOffice Calc tasks covering formatting and formula operations"로, 대상 애플리케이션과 개수, 다룰 기능 범위를 한 문장에 담는다.

결과는 `output/task_generation/<topic>.json`에 저장된다. topic 이름이 파일명이 되므로 도메인별로 파일이 나뉘고, 다음 단계가 이 파일을 인자로 받는다.

이 구조는 파이프라인이 코딩 에이전트 harness에 의존한다는 뜻이다. 저장소를 클론하고 파이썬 의존성을 설치하는 것만으로는 1단계 데이터를 만들 수 없고, Claude Code가 함께 있어야 한다.

### 적대적 co-generation 루프

배치 실행은 task 생성 JSON을 통째로 받아 그 안의 task마다 세 에이전트 루프를 수행한다. 검증을 통과한 튜플만 `output/final/<task_id>/`에 저장된다.

```bash
python scripts/batch_orchestrator.py output/task_generation/calc_formatting.json
```

### 다수결 필터

필터는 `output/final` 아래에 쌓인 튜플을 대상으로 여러 번 판정을 받아 다수결로 채택 여부를 정한다.

```bash
export OPENAI_API_KEY=sk-...
python filter/majority_vote_filter.py \
  --tasks-dir output/final \
  --votes 3 \
  --model gpt-4o \
  --write
```

| 옵션 | 뜻 | 예시 값 |
|---|---|---|
| `--tasks-dir` | 검사 대상 task 디렉토리 | `output/final` |
| `--votes` | 판정을 반복할 횟수 | `3` |
| `--model` | 판정에 쓰는 모델 | `gpt-4o` |
| `--write` | 판정 결과를 파일에 반영한다 | 플래그 |

`--write`가 별도 플래그라는 점에서, 이 스크립트를 판정만 확인하는 용도로 먼저 실행하고 결과를 본 뒤 반영하는 사용 방식이 가능하다.

### task 번들과 실행 절차

task 하나는 파일 세 개로 이루어진 디렉토리다. 지시문, 채점 함수, 초기 상태가 각각 별도 파일로 나뉘어 있어 세 요소 묶음 구조가 파일 구조에 그대로 드러난다.

| 파일 | 역할 |
|---|---|
| `task.json` | 자연어 지시문과 실행 메타데이터 |
| `reward.py` | 프로그램 방식 채점 함수 |
| `initial_setup.py` / `.sh` / `.xlsx` / `.docx` / `.pptx` | 초기 상태를 만드는 스크립트, 또는 초기 상태 자체를 담은 오피스 문서 |

setup 파일의 허용 확장자가 다섯 종이라는 점이 데스크톱 task의 성격을 보여준다. 스프레드시트 서식을 바꾸는 task라면 초기 상태를 코드로 만들 필요 없이 `.xlsx` 파일 하나를 그대로 두는 편이 간단하다.

task를 실행하는 절차는 다섯 단계다.

| 순서 | 단계 |
|---|---|
| 1 | 아티팩트 아카이브를 압축 해제한다 |
| 2 | `<task_id>/task.json`을 읽는다 |
| 3 | 명시된 setup 단계를 대상 환경에서 실행한다 |
| 4 | 에이전트가 환경과 상호작용하게 둔다 |
| 5 | `<task_id>/reward.py`를 실행해 프로그램 방식 점수를 계산한다 |

## CUA-Gym-Hub 환경 층

### 환경 구성

CUA-Gym이 다루는 환경은 110개이고 두 종류로 나뉜다. 데스크톱 애플리케이션과 합성된 mock 웹 애플리케이션이며, 웹 쪽이 규모가 훨씬 크다.

| 종류 | 개수 | 성격 |
|---|---|---|
| 데스크톱 애플리케이션 | 16종 | 실제 설치형 소프트웨어 |
| mock 웹 애플리케이션 | 94종 | 합성된 단일 페이지 앱, 실제 소프트웨어 사용 분포를 근거로 선정 |
| 합계 | 110개 | |

mock 94종을 묶은 것이 CUA-Gym-Hub다. 별도 저장소로 공개되어 있지만 환경 층 파일은 이 저장소의 `hub/` 하위에도 함께 들어 있다. 각 환경은 실제 웹 제품처럼 보이고 동작하면서, 결정적 리셋과 조회, 변경, reward 검증을 위한 통합 상태 API를 함께 노출한다.

### 합성 파이프라인

Hub의 mock은 손으로 만든 것이 아니라 다중 에이전트 합성 파이프라인의 산출물이다. 목표 애플리케이션 seed를 주면 네 단계가 진행된다.

| 단계 | 내용 |
|---|---|
| 1 | 제품 명세를 초안으로 작성한다 |
| 2 | 명세대로 mock 웹 앱을 구현한다 |
| 3 | Playwright로 UI를 실제로 조작해 본다 |
| 4 | 화면과 API 규약이 명세와 일치할 때까지 2단계와 3단계를 반복한다 |

3단계가 중요한 이유는 검증 대상이 코드가 아니라 실제로 동작하는 화면이라는 점이다. Playwright로 UI를 눌러 본 결과가 명세와 다르면 반복이 계속된다. 이 파이프라인의 에이전트 구성과 검증 기준은 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다.

### 두 가지 핵심 설계

mock이 그럴듯한 웹 앱인 것만으로는 RL 훈련 환경이 되지 않는다. README는 각 mock을 훈련 환경으로 쓸 수 있게 만든 설계 선택 두 가지를 밝힌다.

| 설계 | 구현 | 효과 |
|---|---|---|
| state injection | task가 자기 JSON 초기 상태를 `reward.py`와 함께 배포한다 | mock 하나가 코드 변경 없이 임의로 많은 task 세계를 담는다 |
| session isolation | 모든 URL이 session id를 담는다 | 같은 mock에서 병렬로 학습하는 worker가 서로의 변경을 보지 않는다 |

state injection 덕분에 mock 개수와 task 개수가 분리된다. Gmail mock 하나로 받은편지함이 비어 있는 상태, 처리할 메일이 쌓인 상태 등 서로 다른 출발 상태의 task를 얼마든지 만들 수 있다.

session isolation은 병렬 학습의 전제 조건이다. 강화학습은 같은 환경에서 rollout을 여러 개 동시에 수집하는데, 상태가 공유되면 한 worker의 변경이 다른 worker의 관측을 오염시킨다. session id를 URL에 실어 각 worker에게 독립된 상태 공간을 준다.

설계 근거 전체와 HTTP 상태 API 명세는 저장소의 `hub/README.md`가 다룬다.

### 상태 API

모든 mock이 동일한 세션 스코프 API를 지원한다. 규약이 통일되어 있으므로 reward 함수는 어느 mock을 상대하든 같은 방식으로 상태를 조회할 수 있다.

| 엔드포인트 | 용도 |
|---|---|
| `/go` | 세션을 시작하고 상태 묶음을 반환한다 |
| `/post` | 상태를 변경한다 |
| `/state` | 현재 상태를 조회한다 |
| `/upload` | 파일을 업로드한다 |
| `/files/...` | 업로드된 파일에 접근한다 |

`/go` 호출 한 번이 세 가지 상태를 함께 반환한다는 점이 채점을 간단하게 만든다.

| 반환 키 | 내용 |
|---|---|
| `initial_state` | 주입된 초기 상태 |
| `current_state` | 현재 상태 |
| `state_diff` | 초기 상태와 현재 상태의 차이 |

`state_diff`가 함께 오므로 reward 함수는 두 상태를 직접 비교하는 코드를 다시 쓰지 않아도 된다. 이것이 스크린샷 판독이나 사람 라벨 없이 채점이 가능해지는 지점이다.

### 로컬 실행과 배포

mock 하나를 로컬에서 띄우는 절차는 일반적인 Vite 앱과 같다. 상태 확인도 HTTP 요청 한 번이다.

```bash
cd hub/websites/notion_mock
npm install
npm run dev          # http://localhost:5173

curl "http://localhost:5173/go?sid=task_001"
# → {"initial_state": {...}, "current_state": {...}, "state_diff": {...}}
```

`sid` 쿼리 파라미터가 session isolation의 실제 구현이다. 설계 원리로는 세션 격리라 부르지만 인터페이스는 쿼리 문자열 하나로 끝난다.

mock의 소스 위치도 규약을 따른다. `hub/websites/<app>_mock` 형태이므로 앱 이름만 알면 디렉토리를 바로 찾을 수 있고, 개발 서버는 Vite 기본 포트인 5173에서 열린다.

프로덕션 방식 배포는 `npm run preview`와 리버스 프록시를 조합하고 절차는 `hub/DEPLOY.md`에 있다. 전체 환경 목록과 스키마 규약, 앱별 주의사항은 `hub/README.md`가 담당하며, 설계 근거와 HTTP 상태 API 전문은 그 문서의 `#why-this-works` 절을 가리킨다.

## 데이터셋 수령과 URL 치환

### 자체 배포 요구사항

README는 이 대목을 인용 블록으로 강조한다. 웹 task 일부의 setup과 reward 파일이 Hub 엔드포인트를 요구하는데, 공개 데이터셋은 이 엔드포인트를 `__CUA_GYM_GMAIL_URL__` 같은 placeholder로 저장하고 호스팅된 URL을 고정해 두지 않는다.

릴리스에 딸린 `xlang.ai` 엔드포인트가 있기는 하다. 다만 참조와 스모크 테스트용이며 대규모 후속 실험의 의존 대상이 아니라고 명시한다. 따라서 웹 task를 제대로 쓰려면 세 가지를 직접 해야 한다. 해당 Hub 앱을 배포하고, `url_variables.json`의 `CUA_GYM_*_URL` 변수를 설정하고, setup이나 reward 코드를 실행하기 전에 task 파일을 materialize한다.

### 배포 레이아웃

데이터셋은 브라우징용 테이블과 실행 가능한 아티팩트를 분리한 구조다.

| 경로 | 내용 |
|---|---|
| `data/tasks.parquet` | task 단위 인덱스 테이블 |
| `artifacts/cua_gym_tasks_v1.tar.zst` | 실행 가능한 task 번들 아카이브 |
| `url_variables.json` | 치환해야 할 `CUA_GYM_*` 변수 매니페스트 |
| `scripts/materialize_dataset_urls.py` | placeholder 치환 스크립트 |

parquet 테이블은 Hugging Face Data Viewer에서 바로 열리고, 실행에 필요한 파일은 zstd로 압축된 아카이브에 따로 들어 있다. 배포 구조와 공개 통계의 세부는 [[agents/xlangai-cua-gym-dataset]]가 담당한다.

### 치환 절차

전체 절차는 다운로드, 압축 해제, 변수 파일 작성, 치환 실행 순서다.

```bash
huggingface-cli download xlangai/CUA-Gym \
  --repo-type dataset \
  --local-dir ./CUA-Gym-data

mkdir -p ./cua_gym_tasks
tar --zstd -xf ./CUA-Gym-data/artifacts/cua_gym_tasks_v1.tar.zst -C ./cua_gym_tasks

cat > .env.cua-gym <<'EOF'
CUA_GYM_GMAIL_URL=https://your-gmail-mock.example.com
CUA_GYM_SLACK_URL=https://your-slack-mock.example.com
CUA_GYM_NOTION_URL=https://your-notion-mock.example.com
EOF

python scripts/materialize_dataset_urls.py ./cua_gym_tasks \
  --manifest ./CUA-Gym-data/url_variables.json \
  --env-file .env.cua-gym
```

매니페스트와 환경 파일을 분리한 이유는 치환 대상 목록과 치환 값의 관리 주체가 다르기 때문이다. `url_variables.json`은 데이터셋이 함께 배포하는 목록이고 `.env.cua-gym`은 사용자가 자기 배포 주소로 채우는 파일이다.

### 인덱스 테이블 직접 읽기

번들을 풀지 않고 task 목록만 살펴볼 수도 있다. 표준 Hugging Face 도구로 인덱스 테이블을 바로 읽는다.

```bash
pip install -U datasets huggingface_hub
```

```python
from datasets import load_dataset

tasks = load_dataset("xlangai/CUA-Gym", "tasks", split="train")
example = tasks[0]

print(example["instruction"])
print(example["app_type"], example["platform"], example["setup_kind"])
```

각 행은 원래 task 번들을 재구성하는 데 필요한 정보를 담은 task 단위 인덱스 항목이다. 자연어 지시문, 환경 메타데이터, setup 참조, reward 함수 참조 네 가지로 구성된다. README 예시가 출력하는 필드는 아래 네 개다.

| 필드 | 내용 |
|---|---|
| `instruction` | 자연어 지시문 |
| `app_type` | 대상 애플리케이션 종류 |
| `platform` | 데스크톱과 웹 구분 |
| `setup_kind` | setup 파일의 형식 |

전체 스키마와 필드별 분포는 [[agents/xlangai-cua-gym-dataset]]가 담당한다.

## 공개 성적표

### 데이터셋 비교

README는 기존 computer-use agent용 RLVR 데이터셋과의 비교표를 싣는다. 여섯 행 가운데 CUA-Gym이 데이터 수와 플랫폼 커버리지에서 가장 크다.

| 데이터셋 | 플랫폼 | 데이터 수 | 환경 수 | reward | 공개 |
|---|---|---:|---:|---|:---:|
| GUI-Genesis | Mobile | 969 | 1 | 프로그램 방식 | 아니오 |
| WebArena-Infinity | Web | 1,260 | 10 | 프로그램 방식 | 예 |
| InfiniteWeb | Web | 600 | 미기재 | 프로그램 방식 | 부분 공개 |
| UltraCUA | Desktop | 17,000 | 9 | 프로그램 방식 | 부분 공개 |
| Gym-Anything | Desktop | 7,277 | 193 | VLM | 예 |
| **CUA-Gym** | **Desktop + Web** | **32,122** | **110** | **프로그램 방식** | **예** |

환경 수만 보면 Gym-Anything이 193개로 CUA-Gym의 110개보다 많다. 다만 Gym-Anything은 데스크톱 전용이고 reward를 VLM으로 판정한다. README는 표만 싣고 우위 서술을 붙이지 않는다. 프로그램 방식 채점과 데스크톱, 웹 동시 커버리지를 함께 갖춘 것 중에서 가장 크다는 서술은 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]에 있다.

### 벤치마크 결과

평가는 OSWorld-Verified와 WebArena 두 곳에서 이루어졌다. 표는 열 개 행이며 미보고 칸은 README에 값이 없는 자리다.

| 모델 | OSWorld-Verified | WebArena |
|---|:---:|:---:|
| Claude Sonnet 4.6 | 72.9 | 65.6 |
| Claude Opus 4.7 | 78.0 | 미보고 |
| GPT-5.5 | 78.7 | 미보고 |
| EvoCUA-8B | 46.1 | 미보고 |
| EvoCUA-32B | 56.7 | 미보고 |
| Kimi-K2.6 | 73.1 | 미보고 |
| Qwen3.5-35B-A3B (base) | 54.5 | 40.8 |
| Qwen3.5-397B-A17B (base) | 62.2 | 54.0 |
| **CUA-Gym-A3B** | **62.1** | **44.5** |
| **CUA-Gym-A17B** | **72.6** | **56.0** |

base 모델과의 대비가 이 표의 핵심이다. A3B는 OSWorld-Verified에서 54.5%에서 62.1%로 7.6%p, WebArena에서 40.8%에서 44.5%로 3.7%p 올랐다. A17B는 각각 62.2%에서 72.6%로 10.4%p, 54.0%에서 56.0%로 2.0%p 올랐다.

README는 두 모델이 각자의 규모대에서 오픈소스 computer-use agent 최고 성적이라고 적고, A17B가 두 벤치마크 모두에서 오픈소스 최고 기록을 세웠다고 밝힌다. A3B에 대해서는 활성 파라미터가 약 10분의 1인 상태로 훨씬 큰 A17B base와 같은 수준을 낸다고 덧붙인다. 실제로 A3B의 62.1%는 A17B base의 62.2%와 0.1%p 차이다.

학습 알고리즘과 데이터 규모 ablation, 실험 설계는 README에 없다. 저장소가 다루는 범위 밖이며 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다.

### 데이터 수 불일치

README 안에서 검증 튜플 수가 한 군데 어긋난다. About 절 본문은 32,112개라고 적는데 같은 절의 비교표는 CUA-Gym 행을 32,122로 적는다. 십의 자리 하나 차이라 오기로 보이며, [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 기록한 논문 본문 값도 32,112다. 이 페이지 본문은 32,112를 정본으로 본다.

## 라이선스와 사용 제약

라이선스는 코드와 데이터가 분리되어 있고, 연구와 교육, 상업적 사용이 모두 허용된다.

| 대상 | 라이선스 | 허용 범위 |
|---|---|---|
| 코드, 도구, 파이프라인 | Apache-2.0 | 연구, 교육, 상업적 사용 |
| 데이터셋 | CC BY 4.0 | 연구, 교육, 상업적 사용 (출처 표시 조건) |

라이선스와 별개로 금지 용도가 세 항목 명시된다. 관할 지역의 법령을 위반하는 목적, 불법이거나 비윤리적이거나 기만적이거나 사생활을 침해하거나 유해한 활동, 그리고 승인 없이 실제 제3자 서비스나 계정, 자격증명, 프로덕션 시스템을 대상으로 삼는 사용이다. 세 번째 항목이 computer-use agent 자료에 특히 중요하다. 실제 서비스를 조작할 수 있는 에이전트를 훈련시키는 자료이기 때문이다.

인용 요구도 별도 절로 적혀 있다. 코드, 도구, Hub 환경, 데이터셋, 모델, 생성된 task 아티팩트 중 어느 것이든 공개 자료에 쓰면 명시적 사사와 논문 인용을 포함해 달라고 요청한다. 면책 조항은 배포와 샌드박스 구성, 안전한 운영의 책임을 사용자에게 둔다고 밝히고, 상표 사용이 보증이나 제휴를 뜻하지 않는다는 조항도 함께 둔다.

## 한계

| 항목 | 내용 |
|---|---|
| 모델 가중치 미공개 | README 배지가 coming soon이다. 논문 성적을 직접 재현하려면 파이프라인부터 실행해 데이터를 만들고 강화학습을 스스로 수행해야 한다 |
| 데이터 부분 공개 | 남은 데이터가 행정 검토 중이라고 밝힌다. 현재 공개분은 [[agents/xlangai-cua-gym-dataset]] 기준 10,910 task로 32,112와 차이가 크다 |
| 코딩 에이전트 의존 | task 생성 단계가 Claude Code 세션 안에서 진행된다. 파이썬 의존성만으로는 1단계를 실행할 수 없다 |
| 외부 자격증명 요구 | `.env`에 `OPENAI_API_KEY`와 `ALIYUN_*`을 요구하고 필터 기본 예시도 `gpt-4o`다 |
| 자체 배포 부담 | 웹 task를 실행하려면 Hub 앱을 직접 배포하고 URL 변수를 채운 뒤 task 파일을 materialize해야 한다 |
| 실행 코드 격리 필요 | setup과 reward는 파일을 만들고 로컬 상태를 바꾸고 앱을 여는 스크립트다. 일회용 가상 머신이나 컨테이너에서 실행해야 하며, 면책 조항도 샌드박스 책임을 사용자에게 둔다 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `task-gen` / `setup-gen` / `reward-gen` | 각각 task 지시문 생성, Generator, Discriminator에 해당하는 에이전트 이름 |
| `batch_orchestrator.py` | 적대적 co-generation 루프를 task 묶음 단위로 실행하는 진입점 |
| information barrier | Discriminator가 Generator의 코드를 보지 못하게 막아 reward가 setup 구현에 맞춰지는 것을 방지하는 장치 |
| state injection | task가 자기 JSON 초기 상태를 함께 배포해 mock 하나에 여러 task 세계를 담는 설계 |
| session isolation | URL에 session id를 실어 병렬 worker의 상태 변경을 서로 격리하는 설계 |
| `materialize_dataset_urls.py` | `url_variables.json` 매니페스트를 참조해 엔드포인트 placeholder를 자기 배포 URL로 치환하는 스크립트 |

## 관련 페이지

- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]: 원 논문. 설계 근거, 학습 알고리즘, 실험 설계와 평가 결과를 담당한다
- [[agents/xlangai-cua-gym-dataset]]: Hugging Face 배포판. 공개 통계, task 테이블 스키마, 배포 구조의 세부를 담당한다
- [[agents/agentskills-agentskills]]: Agent Skills 포맷. 논문 페이지가 기록한 mock 합성 산출물 `SKILL.md`가 이 포맷을 따른다
