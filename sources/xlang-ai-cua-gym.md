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

## 한 줄 요약 (One-line Summary)

[[agents/wang-2026-cua-gym-scaling-verifiable-training-environments]] 논문의 공식 코드 저장소. task 생성 · 적대적 co-generation 루프 · 다수결 필터 · mock 웹 앱 묶음(CUA-Gym-Hub)까지 파이프라인 전체를 Apache-2.0으로 공개했다. 논문에는 없는 실행 명령이 여기 들어있다. 데이터셋 placeholder를 실제 배포 URL로 채우는 절차도 마찬가지다.

## 1. 자료 정보 (Document Information)

- **저장소**: <https://github.com/xlang-ai/CUA-Gym>
- **조직**: xlang-ai (홍콩대 XLANG Lab)
- **라이선스**: 코드·도구·파이프라인 Apache-2.0, 데이터셋 CC BY 4.0
- **요구 환경**: Python 3.10+
- **함께 보는 저장소**: [CUA-Gym-Hub](https://github.com/xlang-ai/CUA-Gym-Hub) (환경 층), [Hugging Face 데이터셋](https://huggingface.co/datasets/xlangai/CUA-Gym)
- **릴리스**: 2026-05-21 파이프라인·데이터셋 공개. 모델 가중치는 예고만 되어 있고 아직 나오지 않았다. 데이터도 행정 검토를 거쳐 단계적으로 푸는 중이다.

## 2. 주요 기여 (Key Contributions)

논문은 왜 이렇게 만들었는지를 설명한다. 저장소에는 무엇을 어떤 순서로 실행하는지가 남아 있다. 저장소만 읽어도 세 가지를 알게 된다.

파이프라인 구성요소의 실제 이름이 그대로 노출된다. `setup-gen`(Generator), `reward-gen`(Discriminator), `task-gen` 세 에이전트와 `scripts/batch_orchestrator.py`, `filter/majority_vote_filter.py` 같은 진입점이다.

task 생성은 Claude Code 안에서 돈다. 저장소 디렉토리에서 `task-gen` 에이전트를 부르고 "LibreOffice Calc task 50개를 서식과 수식 조작 위주로 만들어줘" 같은 자연어를 주면 `output/task_generation/<topic>.json`이 나온다. 이 논문의 파이프라인은 코딩 에이전트 harness 위에 얹혀 있다.

모든 mock이 `/go`·`/post`·`/state`·`/upload`·`/files/...` 세션 스코프 API를 똑같이 지원하고 `/go?sid=task_001` 하나로 `initial_state`·`current_state`·`state_diff`를 받는다. 이 상태 API 규약이 있어서 reward 함수가 스크린샷이나 수동 라벨 대신 환경 상태를 직접 들여다볼 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 실행 흐름

```bash
git clone https://github.com/xlang-ai/CUA-Gym
cd CUA-Gym
pip install -e ".[dev]"
cp .env.example .env      # OPENAI_API_KEY, ALIYUN_* 자격증명 기입
```

task 생성 후 적대적 루프를 배치로 돌린다.

```bash
python scripts/batch_orchestrator.py output/task_generation/calc_formatting.json
```

검증을 통과한 튜플은 `output/final/<task_id>/`에 떨어진다. 그다음 다수결 필터를 태운다.

```bash
python filter/majority_vote_filter.py \
  --tasks-dir output/final --votes 3 --model gpt-4o --write
```

각 task 번들의 구성은 `task.json` + `reward.py` + 초기 setup 파일 하나다. setup은 `.py`·`.sh`뿐 아니라 `.xlsx`·`.docx`·`.pptx`처럼 오피스 문서 자체일 수도 있다.

### 3.2 CUA-Gym-Hub

별도 저장소인데도 환경 층은 `hub/` 하위에 함께 들어있다. mock 하나를 로컬에서 띄우는 건 평범한 Vite 앱과 다르지 않다.

```bash
cd hub/websites/notion_mock
npm install && npm run dev      # http://localhost:5173
```

상태 확인도 HTTP 한 번이다.

```bash
curl "http://localhost:5173/go?sid=task_001"
# → {"initial_state": {...}, "current_state": {...}, "state_diff": {...}}
```

논문이 설계 원리로 설명한 state injection과 session isolation이 여기서는 `sid` 쿼리 파라미터 하나로 구현되어 있다. mock을 프로덕션처럼 띄울 때 쓰는 `npm run preview` + 리버스 프록시 구성은 `hub/DEPLOY.md`에 적혀 있다.

### 3.3 자체 배포가 사실상 필수다

저장소도 데이터셋 카드도 이 점을 굵게 적어 뒀다. 공개된 웹 task의 setup·reward 파일에는 mock 엔드포인트가 `__CUA_GYM_GMAIL_URL__` 같은 placeholder로 들어 있을 뿐, 호스팅된 URL은 박혀 있지 않다. `xlang.ai`가 띄워둔 엔드포인트는 참조와 스모크 테스트용이다. 대규모 학습·평가를 여기에 의존하지 말라고 못 박아 뒀다. 실제로 쓰려면 해당 mock을 직접 배포하고 `url_variables.json`의 변수를 채운 뒤 placeholder를 실제 배포 URL로 바꾸는 스크립트를 돌려야 한다.

```bash
python scripts/materialize_dataset_urls.py ./cua_gym_tasks \
  --manifest ./CUA-Gym-data/url_variables.json \
  --env-file .env.cua-gym
```

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에 실린 성적은 논문과 같다 — OSWorld-Verified에서 CUA-Gym-A3B 62.1, A17B 72.6이고 WebArena에서 44.5, 56.0이다. 각각 Qwen3.5-35B-A3B(54.5/40.8)와 Qwen3.5-397B-A17B(62.2/54.0) base 대비다.

데이터셋 비교표 자체는 논문 Figure 6c와 같은 내용인데 CUA-Gym 행의 데이터 수만 32,122로 적혀 있다. 논문 본문·초록과 같은 표의 다른 판본은 32,112다. 십의 자리 하나 차이라 오기로 보인다. 아래 wiki 페이지에서는 논문 본문 값 32,112를 따랐다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

모델 가중치는 아직 하나도 나오지 않았고 데이터는 일부만 공개됐다. 가중치 쪽은 README 배지가 "coming soon"이다. 논문 성적을 직접 재현하려면 파이프라인부터 돌려 데이터를 만들고 GSPO 학습을 스스로 해야 한다. 데이터 쪽은 "남은 데이터는 행정 검토 중"이라 밝히고 있다. Hugging Face 릴리스 현재 수치는 10,910 task로 논문의 32,112와 차이가 크다.

- 실행에 외부 자격증명이 필요하다. `.env`에 `OPENAI_API_KEY`와 `ALIYUN_*`을 요구한다. 필터 기본 예시도 `gpt-4o`다.
- setup·reward는 신뢰할 수 없는 실행 코드다. 파일을 만들고 로컬 상태를 바꾸고 앱을 여는 스크립트라 반드시 일회용 VM이나 컨테이너에서 돌려야 한다.

## 6. 관련 연구 (Related Work)

README에는 GUI-Genesis, WebArena-Infinity, InfiniteWeb, UltraCUA, Gym-Anything과의 비교표만 있다. 서술은 논문 쪽에 있다. 평가 벤치마크로는 [OSWorld-Verified](https://os-world.github.io/)와 [WebArena](https://webarena.dev/)를 쓴다.

## 7. 용어집 (Glossary)

논문 source의 용어집을 공유한다. 저장소에만 나오는 항목은 아래와 같다.

| 용어 | 뜻 |
|---|---|
| `task-gen` / `setup-gen` / `reward-gen` | 각각 task 생성 · Generator · Discriminator에 해당하는 에이전트 이름 |
| `batch_orchestrator.py` | 적대적 co-generation 루프를 task 묶음 단위로 돌리는 진입점 |
| `materialize_dataset_urls.py` | 엔드포인트 placeholder를 자기 배포 URL로 채워 넣는 스크립트 |
| `url_variables.json` | 치환해야 할 `CUA_GYM_*` 변수 목록을 담은 매니페스트 |
| `SKILL.md` | mock 합성 시 함께 생성되는, API·함정·검증 템플릿 문서. task 생성의 입력이 된다 |

## 8. 그림 후보 (Figure Candidates)

repo 이미지는 자동 수집하지 않는다. README 본문에 세 개가 임베드되어 있다. 필요하면 사용자가 수동 저장한다.

| id | 파일 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `figures/main_figure.png` | 파이프라인 개요 | manual | (논문 fig01과 중복 — 생략 권장) |
| fig02 | `figures/env_grid.png` | 지원 환경 그리드 | manual | (논문 fig06a와 중복) |
| fig03 | `figures/env_pipeline_t.png` | 환경 합성 파이프라인 | manual | (논문 fig02와 중복) |
