---
title: "xlang-ai/CUA-Gym"
type: repo
year: 2026
category: agents
raw_path: raw/repos/xlang-ai-cua-gym.md
raw_filename: "xlang-ai-cua-gym.md"
source_collection: external
org: "xlang-ai"
repo: "CUA-Gym"
url: "https://github.com/xlang-ai/CUA-Gym"
license: "Apache-2.0 (코드와 파이프라인) / CC BY 4.0 (데이터셋)"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, environment-synthesis, mock-web-apps, claude-code, playwright]
figures:
  - id: fig01
    label: main_figure.png
    kind: figure
    file: assets/xlang-ai-cua-gym/main_figure.png
    raw: https://github.com/xlang-ai/CUA-Gym/blob/main/figures/main_figure.png
    caption: "README 상단에 임베드된 CUA-Gym 파이프라인 개요"
    strategy: manual
    curated: false
  - id: fig02
    label: env_grid.png
    kind: figure
    file: assets/xlang-ai-cua-gym/env_grid.png
    raw: https://github.com/xlang-ai/CUA-Gym/blob/main/figures/env_grid.png
    caption: "CUA-Gym이 지원하는 환경 그리드"
    strategy: manual
    curated: false
  - id: fig03
    label: env_pipeline_t.png
    kind: figure
    file: assets/xlang-ai-cua-gym/env_pipeline_t.png
    raw: https://github.com/xlang-ai/CUA-Gym/blob/main/figures/env_pipeline_t.png
    caption: "CUA-Gym-Hub 환경 합성 파이프라인"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] 논문의 공식 코드 저장소다. topic 하나를 주면 지시문, 환경 상태, reward 함수를 검증된 세 쪽 묶음으로 함께 만들어내는 파이프라인 전체를 Apache-2.0으로 공개했다. 논문에 없는 설치 명령, 진입점 이름, 환경 변수, 그리고 데이터셋 placeholder를 자기 배포 URL로 채우는 절차가 여기 들어 있다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 저장소 | github.com/xlang-ai/CUA-Gym |
| 조직 / 이름 | xlang-ai / CUA-Gym |
| 논문 | arXiv 2605.25624 |
| 블로그 | bowenbryanwang.github.io/blog/introducing-cua-gym |
| 데이터셋 | huggingface.co/datasets/xlangai/CUA-Gym |
| 환경 층 | github.com/xlang-ai/CUA-Gym-Hub (별도 저장소) |
| 모델 가중치 | README 배지 표기가 coming soon으로, 아직 공개되지 않았다 |
| 요구 Python | 3.10 이상 |
| 라이선스 | 코드, 도구, 파이프라인 Apache-2.0 / 데이터셋 CC BY 4.0 |
| 저자 | bibtex 기준 14명 (Bowen Wang이 첫 저자, Tao Yu가 마지막 저자) |

README 상단 링크는 논문, 블로그, 데이터셋, Data Viewer, 모델, CUA-Gym-Hub 여섯 개다. 배지는 arXiv, Dataset, Models, License, Python 다섯 개다. 소속 기관과 저자 구성의 서술은 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다.

릴리스는 두 줄로 적혀 있다. 2026-05-21에 파이프라인과 데이터셋을 공개했고 모델은 예고만 되어 있다. 남은 데이터는 행정 검토를 거쳐 단계적으로 공개한다고 밝힌다.

## 2. 주요 기여 (Key Contributions)

논문이 설계 근거를 설명하는 자료라면 저장소는 실행 절차를 담은 자료다. README만 읽어도 다음 네 가지가 확인된다.

첫째, 파이프라인 구성요소의 실제 이름과 진입점이 그대로 노출된다. Generator는 `setup-gen`, Discriminator는 `reward-gen`이라는 에이전트 이름을 갖고, 배치 실행은 `scripts/batch_orchestrator.py`, 필터는 `filter/majority_vote_filter.py`다.

둘째, task 생성은 Claude Code 안에서 실행된다. 저장소 디렉토리에서 `task-gen` 에이전트를 호출하고 "Generate 50 LibreOffice Calc tasks covering formatting and formula operations" 같은 자연어 지시문을 주면 `output/task_generation/<topic>.json`이 생성된다. 파이프라인이 코딩 에이전트 harness 위에서 동작한다는 사실은 README에서만 확인된다.

셋째, 환경 규모가 숫자로 명시된다. CUA-Gym은 환경 110개를 다루며 데스크톱 애플리케이션 16종과 합성된 mock 웹 애플리케이션 94종의 합이다. mock 94종은 실제 소프트웨어 사용 분포를 근거로 삼았다고 적는다.

넷째, 모든 mock이 `/go`, `/post`, `/state`, `/upload`, `/files/...` 세션 스코프 API를 똑같이 지원하고 `/go?sid=task_001` 한 번으로 `initial_state`, `current_state`, `state_diff`를 반환한다. 이 상태 API 규약이 있어서 reward 함수가 스크린샷이나 수동 라벨 대신 환경 상태를 직접 조회할 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 task당 조율되는 세 에이전트

README는 강화학습 훈련에 (지시문, 실행 가능한 환경, 검증 가능한 reward) 세 쪽이 일관되게 맞물린 데이터가 필요하다는 문제 설정에서 출발한다. 하나를 손으로 작성하는 데 몇 시간이 걸리고, CUA-Gym은 이를 대규모로 자동화한다.

task마다 세 에이전트가 조율되어 실행된다.

| 에이전트 | 저장소 이름 | 역할 | 산출물 |
|---|---|---|---|
| Generator | `setup-gen` | 초기 환경 상태와 golden 환경 상태를 구성한다 | `initial_setup.py`, `golden_patch.py` |
| Discriminator | `reward-gen` | task 설명만 보고 reward 함수를 작성한다 | `reward.py` |
| Orchestrator | (배치 스크립트) | 두 에이전트를 여러 라운드 반복시키며 수렴을 판정한다 | 검증 통과 튜플 |

Discriminator는 Generator의 코드에 접근하지 못한다. README는 이를 information barrier라고 부른다. reward가 setup 구현의 세부에 맞춰지지 않도록 정보를 차단하는 장치다.

수렴 조건은 두 등식이 실행 상태에서 동시에 성립하는 것이다.

| 조건 | 뜻 |
|---|---|
| `reward(golden) = 1.0` | golden 상태에서 reward가 만점을 준다 |
| `reward(initial) = 0.0` | 초기 상태에서 reward가 0점을 준다 |

두 조건이 함께 성립하면 reward 함수가 과제 완수 여부를 실제로 구별한다는 뜻이 된다. Orchestrator는 둘이 성립할 때까지 라운드를 반복한다.

### 3.2 필터 두 단계

검증을 통과한 튜플은 다시 두 단계 필터를 지난다.

| 단계 | 수단 | 걸러내는 대상 |
|---|---|---|
| 1단계 | LLM 다수결 필터 `filter/majority_vote_filter.py` | reward가 취약하거나 모호하거나 일관되지 않은 task |
| 2단계 | teacher rollout | 1단계를 통과한 뒤 남은 문제 task |

teacher rollout이 두 번째 필터 단계라는 언급은 README에 한 문장으로만 나온다. 세부 설정은 논문 쪽 자료가 다룬다.

### 3.3 설치와 실행 진입점

```bash
git clone https://github.com/xlang-ai/CUA-Gym
cd CUA-Gym
pip install -e ".[dev]"
cp .env.example .env      # OPENAI_API_KEY, ALIYUN_* 자격증명 기입
```

Getting Started 절은 다섯 블록으로 나뉜다.

| 순서 | 작업 | 진입점 |
|---|---|---|
| 1 | 설치와 자격증명 설정 | `pip install -e ".[dev]"`, `cp .env.example .env` |
| 2 | 도메인별 task 생성 | Claude Code에서 `task-gen` 에이전트 호출 |
| 3 | 적대적 co-generation 루프 실행 | `scripts/batch_orchestrator.py` |
| 4 | 다수결 필터 실행 | `filter/majority_vote_filter.py` |
| 5 | 사전 생성 데이터셋 수령 | `huggingface-cli download` |

배치 실행과 필터 실행 명령은 다음과 같다. 검증을 통과한 튜플은 `output/final/<task_id>/`에 저장된다.

```bash
python scripts/batch_orchestrator.py output/task_generation/calc_formatting.json

export OPENAI_API_KEY=sk-...
python filter/majority_vote_filter.py \
  --tasks-dir output/final \
  --votes 3 \
  --model gpt-4o \
  --write
```

필터 옵션은 네 개다.

| 옵션 | 뜻 |
|---|---|
| `--tasks-dir` | 검사할 task 디렉토리 |
| `--votes` | 투표 횟수 (예시는 3) |
| `--model` | 판정에 쓰는 모델 (예시는 `gpt-4o`) |
| `--write` | 판정 결과를 파일에 반영 |

사전 생성 데이터셋은 Hugging Face CLI로 받는다.

```bash
huggingface-cli download xlangai/CUA-Gym --repo-type dataset --local-dir data/
```

### 3.4 task 번들 구성

task 번들 하나는 지시문 파일, reward 파일, 초기 setup 파일로 이루어진다.

| 파일 | 역할 |
|---|---|
| `task.json` | 자연어 지시문과 실행 메타데이터 |
| `reward.py` | 프로그램 방식 채점 함수 |
| `initial_setup.py` / `.sh` / `.xlsx` / `.docx` / `.pptx` | 초기 상태를 만드는 스크립트 또는 오피스 문서 자체 |

setup이 실행 스크립트가 아니라 스프레드시트나 문서 파일일 수도 있다는 점이 확장자 다섯 종에서 드러난다.

task 하나를 실행하는 절차는 다섯 단계다. 아티팩트 아카이브를 풀고, `<task_id>/task.json`을 읽고, 명시된 setup 단계를 대상 환경에서 실행하고, 에이전트가 환경과 상호작용하게 두고, 마지막으로 `<task_id>/reward.py`를 실행해 프로그램 방식 점수를 계산한다.

### 3.5 CUA-Gym-Hub 환경 층

CUA-Gym-Hub는 별도 저장소지만 환경 층 파일은 `hub/` 하위에 함께 들어 있다. RL 훈련용으로 설계된 자기완결형 mock 웹 애플리케이션 묶음이며, 각 환경은 실제 웹 제품처럼 보이고 동작하되 결정적 리셋, 조회, 변경, reward 검증을 위한 통합 상태 API를 노출한다.

Hub는 다중 에이전트 환경 합성 파이프라인으로 만들어진다. 목표 애플리케이션 seed를 주면 네 단계가 진행된다.

| 단계 | 내용 |
|---|---|
| 1 | 제품 명세를 초안으로 작성한다 |
| 2 | mock 웹 앱을 구현한다 |
| 3 | Playwright로 UI를 실제로 조작해 본다 |
| 4 | 화면과 API 규약이 명세와 맞을 때까지 반복한다 |

각 mock을 RL 훈련 환경으로 쓸 수 있게 만드는 설계 선택은 두 가지다.

| 설계 | 구현 | 효과 |
|---|---|---|
| state injection | task가 자기 JSON 초기 상태를 `reward.py`와 함께 배포한다 | mock 하나가 코드 변경 없이 임의로 많은 task 세계를 담는다 |
| session isolation | 모든 URL이 session id를 담는다 | 같은 mock에서 병렬로 학습하는 RL worker가 서로의 변경을 보지 않는다 |

README가 밝히는 Hub의 제공 항목은 네 가지다.

| 항목 | 내용 |
|---|---|
| 현실적인 mock 애플리케이션 | 생산성, 커뮤니케이션, 개발, 커머스, 금융, 분석, 미디어 일곱 영역의 브라우저 환경 |
| 통합 상태 API | 상태 주입, 리셋, 조회, diff를 일관된 HTTP 인터페이스로 제공 |
| 검증 가능한 reward | task별 reward 함수가 스크린샷이나 수동 라벨 대신 환경 상태를 직접 조회 |
| 즉시 투입 가능한 task 생성 | 생성된 앱이 task 합성 파이프라인에 재현 가능한 훈련 환경으로 연결 |

mock 하나를 로컬에서 띄우고 상태를 확인하는 절차는 평범한 Vite 앱과 다르지 않다.

```bash
cd hub/websites/notion_mock
npm install
npm run dev          # http://localhost:5173

curl "http://localhost:5173/go?sid=task_001"
# → {"initial_state": {...}, "current_state": {...}, "state_diff": {...}}
```

프로덕션 방식 배포는 `npm run preview`와 리버스 프록시 조합이고 절차는 `hub/DEPLOY.md`에 있다. 전체 환경 목록, 스키마 규약, 앱별 주의사항은 `hub/README.md`가 담당한다. 설계 근거와 HTTP 상태 API 전체는 `hub/README.md#why-this-works`를 가리킨다.

### 3.6 자체 배포 요구사항

README는 이 대목을 Important Notice 인용 블록으로 강조한다. 일부 웹 task의 setup과 reward 파일이 CUA-Gym-Hub 엔드포인트를 요구하는데, 공개 데이터셋은 이 엔드포인트를 `__CUA_GYM_GMAIL_URL__` 같은 placeholder로 저장하고 호스팅된 URL을 고정해 두지 않는다. 릴리스에 딸린 `xlang.ai` 엔드포인트는 참조와 스모크 테스트용이며 대규모 후속 실험용이 아니라고 명시한다.

안정적으로 쓰려면 세 가지를 해야 한다. 해당 Hub 앱을 직접 배포하고, `url_variables.json`의 `CUA_GYM_*_URL` 변수를 설정하고, setup이나 reward 코드를 실행하기 전에 task 파일을 materialize한다.

```bash
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

데이터셋 배포는 뷰어용 테이블과 실행 가능한 아티팩트를 분리한 네 항목 구조다.

| 경로 | 내용 |
|---|---|
| `data/tasks.parquet` | task 단위 인덱스 테이블 |
| `artifacts/cua_gym_tasks_v1.tar.zst` | 실행 가능한 task 번들 아카이브 |
| `url_variables.json` | 치환해야 할 `CUA_GYM_*` 변수 매니페스트 |
| `scripts/materialize_dataset_urls.py` | placeholder 치환 스크립트 |

Hugging Face 도구로 task 인덱스를 직접 읽을 수도 있다. 각 행은 지시문, 환경 메타데이터, setup 참조, reward 함수 참조를 담은 task 단위 인덱스 항목이며 원래 task 번들을 재구성하는 데 필요한 정보를 갖는다. 예시 코드는 `instruction`, `app_type`, `platform`, `setup_kind` 네 필드를 출력한다. 테이블 스키마와 공개 통계는 [[agents/xlangai-cua-gym-dataset]]가 담당한다.

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

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 기존 CUA RLVR 데이터셋과의 비교표를 싣는다. 표의 별표는 부분 공개를 뜻한다.

| 데이터셋 | 플랫폼 | 데이터 수 | 환경 수 | reward | 공개 |
|---|---|---:|---:|---|:---:|
| GUI-Genesis | Mobile | 969 | 1 | 프로그램 방식 | 아니오 |
| WebArena-Infinity | Web | 1,260 | 10 | 프로그램 방식 | 예 |
| InfiniteWeb | Web | 600 | 미기재 | 프로그램 방식 | 부분 공개 |
| UltraCUA | Desktop | 17,000 | 9 | 프로그램 방식 | 부분 공개 |
| Gym-Anything | Desktop | 7,277 | 193 | VLM | 예 |
| **CUA-Gym** | **Desktop + Web** | **32,122** | **110** | **프로그램 방식** | **예** |

벤치마크 결과표는 열 개 행이다. 평가는 OSWorld-Verified와 WebArena 두 곳이며 표의 미보고 칸은 README에 값이 없는 자리다.

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

README는 두 모델이 각자 규모대에서 오픈소스 CUA 최고 성적이라고 적고, A17B가 두 벤치마크 모두에서 오픈소스 최고 기록을 세웠다고 밝힌다. A3B는 활성 파라미터가 약 10분의 1인 상태로 훨씬 큰 A17B base와 같은 수준을 낸다고 덧붙인다. 학습 알고리즘, 데이터 규모 ablation, 실험 설계는 README에 없고 [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]가 담당한다.

데이터 수는 README 안에서 한 군데 어긋난다. About 절 본문은 검증 튜플이 32,112개라고 적는데 같은 절의 비교표는 CUA-Gym 행을 32,122로 적는다. 십의 자리 하나 차이라 오기로 보이며, 논문 본문 값도 32,112다. 아래 wiki 페이지는 32,112를 따랐다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 항목 | 내용 |
|---|---|
| 모델 가중치 미공개 | README 배지가 coming soon이다. 논문 성적을 직접 재현하려면 파이프라인부터 실행해 데이터를 만들고 강화학습을 스스로 수행해야 한다 |
| 데이터 부분 공개 | 남은 데이터가 행정 검토 중이라고 밝힌다. 현재 공개분은 [[agents/xlangai-cua-gym-dataset]] 기준 10,910 task로 32,112와 차이가 크다 |
| 외부 자격증명 요구 | `.env`에 `OPENAI_API_KEY`와 `ALIYUN_*`을 요구하고 필터 기본 예시도 `gpt-4o`다 |
| 자체 배포 부담 | 웹 task를 실행하려면 Hub 앱을 직접 배포하고 URL 변수를 채워야 한다 |
| 실행 코드 격리 필요 | setup과 reward는 파일을 만들고 로컬 상태를 바꾸고 앱을 여는 스크립트다. 배포와 샌드박스, 안전한 운영 책임을 사용자에게 둔다고 면책 조항에 적혀 있다 |

사용 조건은 라이선스와 별개로 세 항목이 금지 용도로 명시된다. 관할 지역의 법령을 위반하는 목적, 불법이나 비윤리적이거나 기만적이거나 사생활을 침해하거나 유해한 활동, 그리고 승인 없이 실제 제3자 서비스나 계정, 자격증명, 프로덕션 시스템을 대상으로 삼는 사용이다.

인용 요구는 별도 절로 적혀 있다. 코드, 도구, Hub 환경, 데이터셋, 모델, 생성된 task 아티팩트 중 어느 것이든 공개 자료에 쓰면 명시적 사사와 논문 인용을 포함해 달라고 요청한다. 상표 사용이 보증이나 제휴를 뜻하지 않는다는 조항도 있다.

## 6. 관련 연구 (Related Work)

README에는 GUI-Genesis, WebArena-Infinity, InfiniteWeb, UltraCUA, Gym-Anything 다섯 데이터셋과의 비교표만 있고 서술은 없다. 평가 벤치마크로는 OSWorld-Verified와 WebArena를 쓴다.

## 7. 용어집 (Glossary)

논문 source의 용어집을 공유한다. 저장소에만 나오는 항목은 아래와 같다.

| 용어 | 뜻 |
|---|---|
| `task-gen` | topic을 받아 task 지시문 JSON을 생성하는 Claude Code 에이전트 |
| `setup-gen` / `reward-gen` | 각각 Generator와 Discriminator에 해당하는 에이전트 이름 |
| `batch_orchestrator.py` | 적대적 co-generation 루프를 task 묶음 단위로 실행하는 진입점 |
| `golden_patch.py` | Generator가 만드는, golden 상태로 가는 변경 스크립트 |
| `materialize_dataset_urls.py` | 엔드포인트 placeholder를 자기 배포 URL로 치환하는 스크립트 |
| `url_variables.json` | 치환해야 할 `CUA_GYM_*` 변수 목록을 담은 매니페스트 |
| information barrier | Discriminator가 Generator의 코드를 보지 못하게 막는 정보 차단 장치 |
| state injection | task가 자기 JSON 초기 상태를 배포해 mock 하나에 여러 task 세계를 담는 설계 |
| session isolation | URL에 session id를 실어 병렬 worker의 상태 변경을 격리하는 설계 |

## 8. 그림 후보 (Figure Candidates)

repo 이미지는 자동 수집하지 않는다. README 본문에 세 개가 임베드되어 있다. 필요하면 사용자가 수동 저장한다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `figures/main_figure.png` | 파이프라인 개요 | manual | (논문 페이지 도식과 내용이 겹쳐 생략 권장) |
| fig02 | `figures/env_grid.png` | 지원 환경 그리드 | manual | (논문 페이지 도식과 내용이 겹쳐 생략 권장) |
| fig03 | `figures/env_pipeline_t.png` | 환경 합성 파이프라인 | manual | (논문 페이지 도식과 내용이 겹쳐 생략 권장) |
