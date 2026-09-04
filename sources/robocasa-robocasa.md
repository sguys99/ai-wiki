---
title: "RoboCasa — 공식 구현 저장소 (RoboCasa365 v1.0.1)"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/robocasa-robocasa.md
raw_filename: "robocasa-robocasa.md"
source_collection: external
org: "robocasa"
repo: "robocasa"
url: "https://github.com/robocasa/robocasa"
license: "MIT (code) / CC BY 4.0 (assets·datasets)"
tags: [physical-ai, simulator, benchmark, robot-dataset]
figures:
  - id: fig01
    file: assets/robocasa-robocasa/readme.webp
    raw: https://github.com/robocasa/robocasa/blob/main/docs/images/readme.webp
    caption: "README 상단 배너 이미지 — 저장소 내 docs/images/readme.webp"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

RoboCasa와 RoboCasa365의 공식 구현 저장소다. conda로 환경을 만들고 robosuite를 함께 설치한 뒤 약 10GB의 주방 asset을 내려받는 구조다. gym wrapper로 환경을 만들거나 데모 스크립트로 장면·물체·teleoperation을 둘러볼 수 있다. 코드는 MIT, asset과 dataset은 CC BY 4.0이다.

## 1. 자료 정보 (Document Information)

- **저장소**: https://github.com/robocasa/robocasa
- **소속**: UT Austin Robot Perception and Learning Lab·NVIDIA Research
- **라이선스**: 코드 MIT, asset·dataset CC BY 4.0
- **최신 릴리스**: v1.0.1 (2026-05-12). v1.0(2026-02-18)이 RoboCasa365 릴리스
- **수집 범위**: README 전문. 과제·데이터셋·policy 학습 상세는 별도 문서 사이트로 넘긴다
- **한 줄 성격**: 설치와 첫 실행까지를 담은 진입 문서. 벤치마크 실행 절차는 여기 없다

## 2. 주요 기여 (Key Contributions)

RoboCasa365의 네 기둥 요약과 설치 절차, 기본 사용법, 라이선스와 인용 정보가 README에 들어 있다.

네 기둥 중 하나가 LLM 지원으로 만든 과제 365종이다. 주방 장면 2,500개 이상과 3D 물체 3,200개 이상이 또 하나다. 데이터는 사람 시연 600시간 이상에 자동 trajectory 생성 도구로 만든 로봇 데이터 1,600시간 이상이다. 남은 하나는 leaderboard 지원이다. Diffusion Policy·π·GR00T와 사용자 제출 모델을 여기에 세운다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다.

릴리스 이력이 짧게 붙어 있는데 여기서 읽을 것이 있다. 2026년 7월 항목은 target composite task 데이터셋에 프레임 단위 subtask 주석을 붙였다고 적는다. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분, 자연어 지시문이 붙어 계층적 policy 학습을 지원한다. 2026년 5월 v1.0.1은 모든 과제의 horizon 길이를 1.5배로 늘린 변경이라 평가를 돌리려면 최신 버전으로 올려야 한다고 명시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 설치

```sh
conda create -c conda-forge -n robocasa python=3.11
conda activate robocasa

git clone https://github.com/ARISE-Initiative/robosuite   # master 브랜치 필수
cd robosuite && pip install -e .

cd .. && git clone https://github.com/robocasa/robocasa
cd robocasa && pip install -e .

python -m robocasa.scripts.setup_macros
python -m robocasa.scripts.download_kitchen_assets          # 약 10GB
```

robosuite는 master 브랜치를 써야 한다고 굵게 강조돼 있다. numba·numpy 충돌이 나면 `conda install -c numba numba=0.56.4`로 고정하라는 안내가 붙는다.

### 환경 생성

gym wrapper로 만든다. `split` 인자로 pre-training 장면과 target 장면 중 어느 쪽을 쓸지 고른다. 논문의 pretraining/target 분할이 API에 그대로 노출돼 있는 셈이다.

```py
import gymnasium as gym
import robocasa
from robocasa.utils.env_utils import run_random_rollouts

env = gym.make("robocasa/PickPlaceCounterToCabinet", split="pretrain", seed=0)
run_random_rollouts(env, num_rollouts=3, num_steps=100, video_path="/tmp/test.mp4")
```

### 데모 스크립트

스크립트 넷이 들어 있다. `demo_tasks`는 과제를 골라 시연을 재생하고 `demo_kitchen_scenes`는 2,500개 주방 장면을 둘러본다. `demo_objects`는 물체 라이브러리를 보여준다(`--obj_types aigen`을 붙이면 AI 생성 물체). `demo_teleop`은 키보드나 SpaceMouse로 직접 로봇을 움직인다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다. 이 스크립트는 가림을 줄이려고 로봇을 반투명하게 렌더한다.

macOS에서는 이들 스크립트를 `python` 대신 `mjpython`으로 실행해야 한다. SpaceMouse를 쓸 때는 `robocasa/macros_private.py`의 `SPACEMOUSE_PRODUCT_ID`를 모델에 맞게 고쳐야 할 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

성능 수치는 README에 없다. 과제·데이터셋·벤치마킹은 별도 문서 사이트(robocasa.ai/docs)로 넘기고 순위는 leaderboard 페이지로 넘긴다. 수치를 찾는 목적이라면 이 자료는 맞지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 다루는 범위가 설치와 첫 실행에 그친다. 데이터셋 다운로드와 policy 학습, 평가 실행 절차가 모두 문서 사이트에 있어 저장소만 보고는 벤치마크를 재현할 수 없다. asset 다운로드는 10GB에 이르고 robosuite는 master 브랜치로 따로 깔아야 한다. macOS에서는 `mjpython`도 필요하다. 진입 문턱은 여기에 있다.

버전 간 호환도 주의할 지점이다. v1.0.1이 모든 과제의 horizon을 1.5배로 늘렸으므로 그 이전 버전에서 잰 성공률과 직접 비교할 수 없다.

## 6. 관련 연구 (Related Work)

인용 목록은 자기 논문 두 편(RoboCasa365 ICLR 2026, RoboCasa RSS 2024)과 의존 패키지 robosuite다. 지원 policy 학습 방법으로 Diffusion Policy·π·GR00T를 든다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. 도메인 공통 용어는 [[overviews/glossary-physical-ai]]·[[overviews/glossary-llms]]에 위임한다.

- **robosuite**: RoboCasa의 백엔드가 되는 MuJoCo 기반 시뮬레이션 프레임워크. master 브랜치를 써야 한다.
- **split 인자**: `gym.make`에 넘기는 `pretrain`/`target` 선택지. 논문의 장면 분할을 API로 노출한다.
- **subtask 주석**: 2026년 7월 추가. 매 timestep에 subtask 인덱스·atomic skill 이름·단계 구분·자연어 지시문이 붙는다.
- **mjpython**: macOS에서 MuJoCo 뷰어를 띄우려면 써야 하는 실행 명령.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | README 상단 배너 (`docs/images/readme.webp`) | manual | (선택 — repo 내 이미지는 자동 fetch하지 않는다) |
