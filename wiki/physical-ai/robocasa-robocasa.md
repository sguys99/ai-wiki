---
title: "RoboCasa: 공식 구현 저장소 (RoboCasa365 v1.0.1)"
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
license: "MIT (code) / CC BY 4.0 (assets와 datasets)"
tags: [physical-ai, simulator, benchmark, robot-dataset]
---

## 요약

RoboCasa와 RoboCasa365의 공식 구현 저장소다. UT Austin 연구진이 2024년에 공개한 대규모 시뮬레이션 프레임워크이고, 최신 버전인 RoboCasa365가 대규모 학습과 시뮬레이션 내 벤치마크를 지원하는 기능을 추가했다. 코드는 MIT, asset과 dataset은 CC BY 4.0이다.

README가 담는 범위는 설치와 첫 실행까지다. conda 환경을 만들고 robosuite를 master 브랜치로 함께 설치한 뒤 약 10GB의 주방 asset을 내려받으면 gym wrapper로 환경을 생성할 수 있다. 반면 과제 목록과 데이터셋 사용법, policy 학습과 평가 절차는 별도 문서 사이트로 넘기므로, 벤치마크를 재현할 목적이라면 이 저장소 하나로는 부족하다.

## 배경

RoboCasa는 범용 로봇을 일상 과제로 학습시키기 위한 시뮬레이션 프레임워크다. 실제 로봇으로 대규모 데이터를 모으는 대신 시뮬레이션 안에서 장면과 물체, 시연 데이터(demonstration)를 대량으로 공급한다. 시연 데이터는 사람이 만들어준 모범 실행 기록을 말한다.

2024년 초기 릴리스가 주방 환경과 과제 세트를 세웠고 RoboCasa365가 그 위에 대규모 학습과 벤치마크 기능을 더했다. 즉 이 저장소 하나에 논문 두 편(RSS 2024, ICLR 2026)의 코드가 함께 들어 있다. 알고리즘 설계와 실험 수치는 논문 페이지가 다루므로, 이 페이지는 저장소가 제공하는 것과 설치, 실행, 데이터셋, 라이선스 조건에 집중한다.

## 저장소가 제공하는 것

README는 RoboCasa365를 네 가지 핵심 요소로 요약한다.

| 핵심 요소 | 내용 |
|---|---|
| 과제 다양성 | 대규모 언어 모델의 지원을 받아 만든 과제 365종 |
| asset 다양성 | 주방 장면 2,500개 이상, 3D 물체 3,200개 이상 |
| 고품질 시연 데이터 | 사람 시연 600시간 이상, 자동 trajectory 도구로 만든 로봇 데이터 1,600시간 이상 |
| 벤치마크 지원 | Diffusion Policy, π, GR00T 같은 널리 쓰이는 policy 학습 방법과 leaderboard 제출 모델 |

trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 위 표의 두 데이터 수치를 합한 2,200시간이 v1.0 릴리스 항목이 적은 데이터 규모와 일치한다.

policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 벤치마크 지원 대상으로 README가 드는 세 방법은 모두 이 policy를 학습시키는 접근이며, 사용자가 학습시킨 모델도 leaderboard에 제출할 수 있다.

## 설치

README는 모든 주요 컴퓨팅 플랫폼에서 동작한다고 밝히고 Anaconda를 통한 설치를 권장한다. 절차는 다섯 단계다.

| 단계 | 하는 일 | 주의점 |
|---|---|---|
| 1 | conda 환경 생성 | Python 3.11, conda-forge 채널 |
| 2 | 환경 활성화 | |
| 3 | robosuite 의존성 설치 | master 브랜치를 써야 한다 |
| 4 | robocasa 저장소 설치 | pre-commit 포매터 설치는 선택 사항 |
| 5 | 시스템 변수 설정과 asset 다운로드 | asset 용량이 약 10GB |

```sh
conda create -c conda-forge -n robocasa python=3.11
conda activate robocasa

git clone https://github.com/ARISE-Initiative/robosuite   # master 브랜치 필수
cd robosuite && pip install -e .

cd .. && git clone https://github.com/robocasa/robocasa
cd robocasa && pip install -e .
pip install pre-commit; pre-commit install                 # 선택: 코드 포매터

python -m robocasa.scripts.setup_macros                    # 시스템 변수 설정
python -m robocasa.scripts.download_kitchen_assets         # 약 10GB
```

robosuite를 master 브랜치로 받아야 한다는 조건을 README가 굵은 글씨로 강조한다. robosuite는 RoboCasa의 백엔드가 되는 MuJoCo 기반 시뮬레이션 프레임워크이며, 설치 순서에서 robocasa보다 앞에 놓이는 이유가 여기에 있다.

설치 중 numba와 numpy 충돌이 발생하면 `conda install -c numba numba=0.56.4 -y`로 numba 버전을 고정하라는 안내가 4단계에 선택 항목으로 붙어 있다.

마지막 단계에서 받는 주방 장면과 물체 라이브러리는 저장소 clone에 포함되지 않고 별도 스크립트로 내려받는 구조다.

## 기본 사용법

### 환경 생성

환경은 gym wrapper로 만든다. `gym.make`에 과제 이름과 함께 `split`, `seed` 인자를 넘긴다.

```py
import gymnasium as gym
import robocasa
from robocasa.utils.env_utils import run_random_rollouts

env = gym.make(
    "robocasa/PickPlaceCounterToCabinet",
    split="pretrain",   # 'pretrain' 또는 'target' 주방 장면과 물체를 고른다
    seed=0              # seed=None 이면 고정 없이 실행한다
)

run_random_rollouts(
    env, num_rollouts=3, num_steps=100, video_path="/tmp/test.mp4"
)
```

`split` 인자가 이 API에서 눈여겨볼 지점이다. RoboCasa365가 나눈 pre-training용 주방 장면과 물체, target용 주방 장면과 물체 중 어느 쪽을 쓸지 코드 한 줄로 고르므로, 논문이 실험 설계로 설명한 분할이 API에 그대로 노출된 셈이다.

`run_random_rollouts`는 무작위 action으로 rollout 3회를 실행해 결과를 `/tmp/test.mp4`에 영상으로 남기는 헬퍼다. rollout은 policy를 실행해 trajectory를 만들어내는 과정을 말한다.

### 데모 스크립트

저장소는 네 개의 데모 스크립트를 제공한다. 모두 `python -m` 뒤에 모듈 경로를 붙여 실행한다.

| 스크립트 | 하는 일 | 옵션 |
|---|---|---|
| `robocasa.demos.demo_tasks` | 과제를 고르면 그 과제의 시연 데이터 표본을 재생한다 | |
| `robocasa.demos.demo_kitchen_scenes` | 주방 장면 2,500개 이상을 둘러본다 | |
| `robocasa.demos.demo_objects` | 사람이 설계한 물체와 AI 생성 물체를 보고 조작한다 | 기본은 objaverse 물체, `--obj_types aigen`이면 AI 생성 물체 |
| `robocasa.demos.demo_teleop` | 키보드나 SpaceMouse로 로봇을 직접 조작한다 | |

`demo_teleop`은 로봇을 반투명하게 렌더한다. 가림을 줄여 장면이 더 잘 보이게 하려는 처리다. teleoperation은 사람이 로봇을 원격으로 움직여 시연 데이터를 만드는 방식을 말한다.

### 플랫폼별 주의사항

macOS에서는 위 데모 스크립트를 `python`이 아니라 `mjpython`으로 실행해야 한다. README가 이 조건을 데모 절 첫머리에 굵은 글씨로 따로 표시한다.

SpaceMouse를 쓸 때는 `robocasa/macros_private.py`의 `SPACEMOUSE_PRODUCT_ID` 값을 자신의 장치 모델에 맞게 고쳐야 할 수 있다.

## 데이터셋과 릴리스 이력

README 상단의 갱신 목록은 네 항목이고, 데이터셋 관련 변경이 여기에 기록된다.

| 날짜 | 버전 | 내용 |
|---|---|---|
| 2026-07-07 | | target composite task 데이터셋에 프레임 단위 subtask 주석 추가 |
| 2026-05-12 | v1.0.1 | 모든 과제의 horizon 길이를 일관되게 1.5배로 조정 |
| 2026-02-18 | v1.0 | RoboCasa365 릴리스. 과제 365종, 주방 장면 2,500개 이상, 로봇 시연 데이터 2,200시간 이상, 벤치마크 지원 |
| 2024-10-31 | v0.2 | 백엔드를 RoboSuite v1.5로 교체. 사용자 정의 로봇 구성, composite controller, teleoperation 장치, 사실적 렌더링 지원 강화 |

2026년 7월의 subtask 주석은 논문 본문에 없는 추가 항목이다. subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령을 말한다. 이 갱신으로 target composite task 데이터셋의 매 timestep에 다음 네 가지 라벨이 붙는다.

- subtask 인덱스
- atomic skill 이름
- 단계 구분 (pick, place, navigate)
- 자연어 지시문(instruction)

README는 이 주석의 목적을 계층적 policy 학습 지원이라고 밝힌다. 상위 단계가 subtask를 고르고 하위 단계가 그것을 실행하는 구조의 학습을 겨냥한 라벨이다.

v1.0.1의 horizon 변경은 평가 결과를 비교할 때 영향이 가장 크다. horizon 길이는 과제마다 정해진 최대 실행 스텝 수를 말하며, 이 값이 모든 과제에서 1.5배로 늘었으므로 그 이전 버전에서 측정한 성공률과 직접 비교할 수 없다. README도 평가를 실행하려면 최신 버전으로 갱신하라고 명시한다.

## 라이선스와 인용

라이선스는 코드와 데이터에 각각 다른 조건이 적용된다.

| 대상 | 라이선스 |
|---|---|
| 코드 | MIT License |
| asset과 dataset | CC BY 4.0 |

인용 정보로는 논문 두 편의 BibTeX가 실려 있다. RoboCasa365는 ICLR 2026 게재이며 저자는 Soroush Nasiriany, Sepehr Nasiriany, Abhiram Maddukuri, Yuke Zhu다. 초기 릴리스인 RoboCasa는 RSS 2024 게재이며 저자는 Soroush Nasiriany 외 7명이다. 따라서 어느 버전을 썼는지에 따라 인용할 논문이 달라진다.

과제와 데이터셋, policy 학습, 그 밖의 활용 사례를 README는 다루지 않고 문서 사이트로 넘긴다. 상단 내비게이션에 걸린 링크는 홈페이지(robocasa.ai), 문서(robocasa.ai/docs), 논문 두 편, leaderboard로 다섯 개다.

## 한계

성능 수치를 찾는 목적이라면 맞는 자료가 아니다. README에는 성능표도 벤치마크 실행 절차도 없고 전부 문서 사이트와 leaderboard로 넘어간다.

진입 문턱도 낮지 않다. asset 다운로드가 약 10GB이고, robosuite는 별도 저장소에서 master 브랜치로 설치해야 하며, macOS에서는 실행 명령부터 다르다. 세 조건이 README 곳곳에 흩어져 있어 한 번에 파악하기 어렵다.

물체 개수 표기는 문서 안에서 어긋난다. 네 가지 핵심 요소 목록은 3D 물체를 3,200개 이상이라고 적지만 `demo_objects` 절의 제목은 2,500개 이상이라고 적는다. 실제 라이브러리 규모는 문서 사이트에서 확인해야 한다.

## 인접 저장소와의 차이

이 wiki에 모인 공식 구현 저장소 중에서 robocasa는 배포 대상이 다르다. openpi와 Isaac-GR00T, LeRobot이 모델 체크포인트와 학습 코드를 배포하는 반면 robocasa는 환경과 데이터를 배포한다. 즉 학습시킬 대상이 아니라 학습시킬 곳을 제공한다.

Isaac-GR00T는 지원 시뮬레이션 벤치마크 목록에 robocasa와 robocasa-gr1을 올려두고 있고 robocasa README는 벤치마크 지원 대상으로 GR00T를 든다. 두 저장소를 함께 쓰는 경로가 양쪽 문서에서 확인된다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| robosuite | RoboCasa의 백엔드가 되는 MuJoCo 기반 시뮬레이션 프레임워크. master 브랜치를 써야 한다 |
| split 인자 | `gym.make`에 넘기는 `pretrain` / `target` 선택지. RoboCasa365의 장면 분할을 API로 노출한다 |
| subtask 주석 | 2026년 7월 추가된 라벨. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분, 자연어 지시문이 붙는다 |
| horizon 길이 | 과제마다 정해진 최대 실행 스텝 수. v1.0.1에서 모든 과제가 1.5배로 늘었다 |
| mjpython | macOS에서 MuJoCo 뷰어를 띄우려면 써야 하는 실행 명령 |

## 관련 페이지

- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]]: 이 저장소가 구현하는 최신 논문. `split` 인자의 근거이며 방법과 실험 수치를 다룬다.
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]]: 초기 릴리스 논문. v0.2까지의 기능이 여기에 대응한다.
- [[physical-ai/robocasa-2026-robocasa365-project-page]]: 프로젝트 홈페이지. 문서와 leaderboard 링크의 출발점.
- [[physical-ai/nvidia-isaac-gr00t]]: 지원 시뮬레이션 벤치마크 목록에 robocasa 계열을 올려둔 모델 저장소.
- [[physical-ai/physical-intelligence-openpi]]: π 계열 체크포인트를 배포하는 저장소. README가 벤치마크 지원 대상으로 π를 든다.
- [[physical-ai/huggingface-lerobot]]: 데이터셋 형식과 학습 코드를 배포하는 저장소. 배포 대상이 다른 비교 사례.
- [[overviews/physical-ai-overview]]: physical-ai 분류 기준과 학습 경로 허브.
