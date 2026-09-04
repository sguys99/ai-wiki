---
title: "RoboCasa — 공식 구현 저장소 (RoboCasa365 v1.0.1)"
type: repo
year: 2026
category: physical-ai
source: robocasa-robocasa.md
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

## 요약 (Summary)

RoboCasa와 RoboCasa365의 공식 구현 저장소다. 코드는 MIT, asset과 dataset은 CC BY 4.0이라 인용만 지키면 연구·상업 양쪽으로 쓸 수 있다.

README가 담는 범위는 설치와 첫 실행까지다. conda 환경을 만들고 robosuite를 master 브랜치로 함께 설치한 뒤 약 10GB의 주방 asset을 내려받으면 gym wrapper로 환경을 띄울 수 있다. 과제 목록과 데이터셋 사용법, policy 학습과 평가 절차는 모두 별도 문서 사이트로 넘긴다. 벤치마크를 재현할 목적이라면 이 저장소 하나로는 부족하다.

## 설치 (Setup)

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

README는 robosuite를 master 브랜치로 받아야 한다고 굵게 강조한다. numba·numpy 충돌이 나면 `conda install -c numba numba=0.56.4`로 고정하라는 안내가 붙어 있다.

## 쓰는 법 (Usage)

환경 생성은 gym wrapper로 한다. `split` 인자가 눈여겨볼 지점이다. 논문이 나눈 pre-training 장면 2,500개와 target 장면 10개 중 어느 쪽을 쓸지를 API에서 바로 고른다.

```py
import gymnasium as gym
import robocasa
from robocasa.utils.env_utils import run_random_rollouts

env = gym.make("robocasa/PickPlaceCounterToCabinet", split="pretrain", seed=0)
run_random_rollouts(env, num_rollouts=3, num_steps=100, video_path="/tmp/test.mp4")
```

데모 스크립트는 넷이다. `demo_tasks`가 과제별 시연을 재생하고 `demo_kitchen_scenes`가 주방 장면을 둘러보며 `demo_objects`가 물체 라이브러리를 보여준다(`--obj_types aigen`을 붙이면 AI 생성 물체 쪽). `demo_teleop`은 키보드나 SpaceMouse로 직접 로봇을 움직인다. 가림을 줄이려고 로봇은 반투명하게 렌더한다. teleoperation은 사람이 로봇을 원격으로 움직여 시연을 만드는 방식이다.

macOS에서는 이들 스크립트를 `python` 대신 `mjpython`으로 실행해야 한다. SpaceMouse를 쓸 때는 `robocasa/macros_private.py`의 `SPACEMOUSE_PRODUCT_ID`를 자기 모델에 맞춰 고쳐야 할 수 있다.

## 릴리스 이력에서 읽을 것 (Release Notes)

| 날짜 | 내용 |
|---|---|
| 2026-07-07 | target composite task 데이터셋에 프레임 단위 subtask 주석 추가 |
| 2026-05-12 | v1.0.1 — 모든 과제의 horizon 길이를 1.5배로 조정 |
| 2026-02-18 | v1.0 — RoboCasa365 릴리스 (과제 365종, 장면 2,500개, 데이터 2,200시간) |
| 2024-10-31 | v0.2 — robosuite v1.5 백엔드, 사용자 정의 로봇 구성·composite controller 지원 |

subtask 주석은 논문 본문에 없는 항목이다. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분(pick·place·navigate), 자연어 지시문이 붙어 계층적 policy 학습을 지원한다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. high-level 추론과 low-level 실행을 분리하는 dual-system 계열 연구가 시뮬레이션에서 쓸 데이터를 얻는 출처다.

v1.0.1의 horizon 변경도 실무에서 중요하다. 모든 과제의 제한 시간이 1.5배로 늘었으므로 그 이전 버전에서 잰 성공률과 직접 비교하면 안 된다. README도 평가를 돌리려면 최신 버전으로 올리라고 명시한다.

## 한계 (Limitations)

수치를 찾는 목적이라면 맞는 자료가 아니다. 성능표도 벤치마크 실행 절차도 README에 없고 전부 문서 사이트와 leaderboard로 넘어간다.

asset 다운로드가 10GB 규모다. robosuite는 별도 저장소에서 master 브랜치로 설치해야 하고 macOS에서는 실행 명령부터 다르다. 이 조건들이 README 곳곳에 흩어져 있어 한 번에 파악하기 어렵다. 진입 문턱도 낮지 않다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

이 저장소에는 논문의 공식 구현 저장소가 여럿 모여 있다. [[physical-ai/physical-intelligence-openpi|openpi]]와 [[physical-ai/nvidia-isaac-gr00t|Isaac-GR00T]], [[physical-ai/huggingface-lerobot|LeRobot]]이 그렇다. 다만 성격이 다르다. 그쪽 셋은 모델 체크포인트를 배포하는 저장소이고 robocasa는 환경과 데이터를 배포한다. 학습시킬 대상이 아니라 학습시킬 곳이다.

`split` 인자는 pre-training과 target 분할을 [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]] 논문의 설계 그대로 노출한다. 논문이 실험 설계로 설명한 것을 코드에서는 한 줄 인자로 고르게 해뒀다.

Isaac-GR00T가 지원 벤치마크 목록에 robocasa 계열을 올려두고 있어 두 저장소를 함께 쓰는 경로가 실제로 존재한다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]] — 이 저장소가 구현하는 최신 논문. `split` 인자가 그쪽 장면 분할을 그대로 옮긴 것이다
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] — 원래 릴리스 논문. v0.2까지의 기능이 여기에 대응한다
- [[physical-ai/robocasa-2026-robocasa365-project-page]] — 프로젝트 홈페이지. 문서·leaderboard 링크의 출발점
- [[physical-ai/nvidia-isaac-gr00t]] — 지원 벤치마크 목록에 robocasa 계열을 올려둔 모델 저장소. 두 저장소를 잇는 실제 경로
- [[physical-ai/physical-intelligence-openpi]] — 모델 체크포인트를 배포하는 쪽 저장소. π0·π0.5가 RoboCasa365 비교 대상이다
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
