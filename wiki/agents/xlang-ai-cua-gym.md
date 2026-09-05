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
license: "Apache-2.0 (코드·파이프라인) / CC BY 4.0 (데이터셋)"
tags: [computer-use-agents, gui-agents, rlvr, verifiable-rewards, environment-synthesis, mock-web-apps, claude-code, playwright]
figures:
  - id: fig01
    label: main_figure.png
    kind: figure
    file: assets/xlang-ai-cua-gym/main_figure.png
    raw: https://github.com/xlang-ai/CUA-Gym/blob/main/figures/main_figure.png
    caption: "CUA-Gym 파이프라인 개요 (논문 Figure 1과 동일 계열)"
    strategy: manual
    curated: false
  - id: fig02
    label: env_grid.png
    kind: figure
    file: assets/xlang-ai-cua-gym/env_grid.png
    raw: https://github.com/xlang-ai/CUA-Gym/blob/main/figures/env_grid.png
    caption: "지원 환경 그리드"
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

## 요약 (Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]]의 공식 코드 저장소. 논문은 왜 이렇게 설계했는지를 설명한다. 저장소에는 무엇을 어떤 순서로 실행하는지가 들어 있다. task 생성부터 적대적 co-generation 루프, 다수결 필터, mock 웹 앱 묶음까지 파이프라인 전체가 Apache-2.0으로 열려 있다.

논문만 읽어서는 이 파이프라인이 Claude Code 위에서 돈다는 게 안 보인다. 저장소 디렉토리에서 `task-gen` 에이전트를 부르고 "LibreOffice Calc task 50개를 서식과 수식 조작 위주로" 같은 자연어를 주면 JSON이 떨어진다. 웹 task 쪽도 논문만 봐서는 안 보인다. 쓰려면 mock을 직접 배포해야 한다. 공개된 setup·reward 파일에서 엔드포인트는 placeholder일 뿐 호스팅된 URL이 박혀 있지 않다.

모델 가중치는 아직 없다. README 배지가 "coming soon"이고 데이터도 행정 검토를 거쳐 단계적으로 푸는 중이다.

## 주요 기여 (Key Contributions)

1. 파이프라인 구성요소의 실제 이름이 그대로 드러난다. `task-gen`·`setup-gen`(Generator)·`reward-gen`(Discriminator) 세 에이전트, `scripts/batch_orchestrator.py`와 `filter/majority_vote_filter.py` 같은 진입점이 그렇다.
2. 모든 mock이 `/go`·`/post`·`/state`·`/upload`·`/files/...` 세션 스코프 API를 똑같이 지원한다. 이 mock 상태 API 규약이 있어서 reward 함수가 스크린샷이나 수동 라벨 대신 환경 상태를 직접 들여다볼 수 있다.
3. 자체 배포 경로도 있어서 `url_variables.json` 매니페스트와 `materialize_dataset_urls.py` 스크립트로 placeholder를 자기 배포 URL로 바꾼다.

## 실행 흐름 (Getting Started)

```bash
git clone https://github.com/xlang-ai/CUA-Gym
cd CUA-Gym
pip install -e ".[dev]"
cp .env.example .env      # OPENAI_API_KEY, ALIYUN_* 자격증명 기입
```

task를 만든 다음 적대적 루프를 배치로 돌린다. 검증을 통과한 튜플은 `output/final/<task_id>/`에 떨어진다.

```bash
python scripts/batch_orchestrator.py output/task_generation/calc_formatting.json

python filter/majority_vote_filter.py \
  --tasks-dir output/final --votes 3 --model gpt-4o --write
```

task 번들 하나는 `task.json` + `reward.py` + 초기 setup 파일로 구성된다. setup은 `.py`·`.sh`뿐 아니라 `.xlsx`·`.docx`·`.pptx`처럼 오피스 문서 자체일 수도 있다.

## CUA-Gym-Hub

환경 층은 별도 저장소지만 `hub/` 하위에 함께 들어있다. mock 하나 띄우는 건 평범한 Vite 앱과 다르지 않다.

```bash
cd hub/websites/notion_mock
npm install && npm run dev      # http://localhost:5173

curl "http://localhost:5173/go?sid=task_001"
# → {"initial_state": {...}, "current_state": {...}, "state_diff": {...}}
```

논문이 설계 원리로 설명한 state injection과 session isolation은 여기서 `sid` 쿼리 파라미터 하나로 구현돼 있다. 프로덕션처럼 띄울 때의 `npm run preview` + 리버스 프록시 구성은 `hub/DEPLOY.md`에 정리돼 있다.

## 자체 배포가 사실상 필수다

저장소와 데이터셋 카드 양쪽이 굵게 강조하는 대목이다. 웹 task의 setup·reward는 엔드포인트가 `__CUA_GYM_GMAIL_URL__` 형태다. `xlang.ai`가 띄워둔 엔드포인트는 참조와 스모크 테스트용이며 대규모 학습·평가의 의존 대상으로 쓰지 말라고 양쪽에 적혀 있다.

```bash
python scripts/materialize_dataset_urls.py ./cua_gym_tasks \
  --manifest ./CUA-Gym-data/url_variables.json \
  --env-file .env.cua-gym
```

## 결과 (Results)

README가 싣는 성적은 논문과 같다 — OSWorld-Verified에서 CUA-Gym-A3B 62.1, A17B 72.6이고 WebArena에서 44.5, 56.0이다.

숫자가 한 군데 어긋난다. README의 데이터셋 비교표는 CUA-Gym 행을 32,122로 적는데 같은 문단 아래 본문과 논문 초록·§4는 32,112다. 십의 자리 하나 차이라 오기로 보이며 이 wiki는 논문 본문 값을 따랐다.

## 한계 (Limitations)

- 모델 가중치가 없으니 논문 성적을 직접 재현하려면 파이프라인부터 돌려 데이터를 만들고 GSPO 학습을 스스로 해야 한다.
- 데이터도 부분 공개다. Hugging Face 릴리스 현재 수치는 10,910 task로 논문의 32,112와 차이가 크다.
- `.env`에 `OPENAI_API_KEY`와 `ALIYUN_*` 같은 외부 자격증명을 요구하고 필터 예시도 `gpt-4o`다.
- setup·reward는 신뢰할 수 없는 실행 코드다. 파일을 만들고 로컬 상태를 바꾸고 앱을 여는 스크립트라 반드시 일회용 VM이나 컨테이너에서 돌려야 한다.

## 관련 페이지 (Related Pages)

- [[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] — 원 논문. 설계 근거와 실험 결과
- [[agents/xlangai-cua-gym-dataset]] — Hugging Face 배포판. 공개 통계와 task 테이블 스키마
- [[agents/agentskills-agentskills]] — mock 합성 산출물에 붙는 `SKILL.md`가 따르는 Agent Skills 포맷
