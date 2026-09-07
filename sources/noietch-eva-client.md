---
title: "EVA-Client: A Unified Framework for Deployment, Evaluation, and Data Collection on Real Robots"
type: repo
year: 2026
category: physical-ai
raw_path: raw/repos/noietch-eva-client.md
raw_filename: "noietch-eva-client.md"
source_collection: external
org: "Noietch"
repo: "EVA-CLIENT"
url: "https://github.com/Noietch/EVA-CLIENT"
license: "Apache-2.0"
tags: [physical-ai, vla, teleoperation, robot-dataset, lerobot, openpi, groot, real-robot, evaluation, hil-rl, mcp, browser-console]
figures:
  - id: fig01
    label: EVA-Client 로고
    kind: figure
    file: assets/noietch-eva-client/fig01.svg
    raw: https://github.com/Noietch/EVA-CLIENT/blob/main/assets/eva-logo.svg
    caption: "저장소 상단 로고 이미지"
    strategy: manual
    curated: false
  - id: fig02
    label: EVA-Client workflow
    kind: figure
    file: assets/noietch-eva-client/fig02.png
    raw: https://github.com/Noietch/EVA-CLIENT/blob/main/assets/workflow.png
    caption: "embodiment에서 데이터 수집과 policy 학습과 배포를 거쳐 실제 로봇 평가로 돌아오는 5단계 순환 구조"
    strategy: manual
    curated: true
---

> 수집 메모: `raw/repos/noietch-eva-client.md`(README 전문)를 입력으로 작성했다. 저장소 내부의 `docs/` 하위 문서와 기술 리포트 PDF는 수집 범위에 포함하지 않았으므로, 아래 서술은 README가 명시한 범위로 한정된다.

## 한 줄 요약 (One-line Summary)

EVA-Client는 실제 로봇 한 대에 대해 배포와 평가와 데이터 수집을 하나의 브라우저 콘솔에서 처리하는 Apache-2.0 오픈소스 스택으로, 파이썬 설정 파일 하나로 transport와 policy backend와 추론 전략을 조합해 closed-loop을 구성한다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 저장소 | `Noietch/EVA-CLIENT` |
| 공식 명칭 | EVA-Client |
| 라이선스 | Apache-2.0 |
| 최신 릴리스 | 0.2.0 (2026-08-28) |
| 오픈소스 공개 | 2026-07-03 |
| 프로젝트 페이지 | colalab.net/projects/eva-client |
| 기술 리포트 | arXiv 2607.02646 (cs.RO) |
| 저자 | Heqing Yang, Yang Yi, Liyao Wang, Linqing Zhong, Donglin Yang, Ruipu Wu, Zitong Bai, Fengjiao Chen, Manyuan Zhang, Linjiang Huang, Si Liu |
| 문서 | 영문과 중문 두 가지로 제공 |

README 상단 표제는 "A Unified Framework for Deployment, Evaluation, and Data Collection on Real Robots"이고, 인용용 BibTeX의 논문 제목은 "A Unified Data Collection, Inference, and Deployment Framework for Embodied Policies on Real Robots"로 표기가 다르다. 두 표기 모두 같은 세 가지 기능을 가리킨다.

저장소가 내세우는 문구는 "One policy, any robot"이다. 하나의 policy를 여러 embodiment에 그대로 태우고, 디버깅과 기록과 평가와 시각화를 전부 브라우저에서 수행한다는 뜻이다. README의 대표 데모 영상은 AgileX 양팔 로봇을 브라우저에서 teleoperation으로 조작해 시연 데이터(demonstration)를 기록하고, π0 체크포인트를 올려 asynchronous inference로 배포하는 과정을 실제 하드웨어에서 이어 붙인 것이다.

## 2. 주요 기여 (Key Contributions)

EVA-Client가 README에서 주장하는 기여는 네 가지다.

1. **단일 설정 파일 기반 실제 로봇 closed-loop.** 파이썬 설정 파일 하나가 transport, policy backend, 추론 전략, 로봇 embodiment를 모두 지정한다. 명령 한 번으로 실제 로봇 루프가 올라온다.
2. **브라우저 콘솔 단일화.** MANUAL, COLLECT, REPLAY, DEBUG, RL, EVAL, RESULT 일곱 개 탭이 조작과 수집과 재생과 디버깅과 강화학습과 평가와 결과 열람을 한 화면에서 처리한다.
3. **수집과 rollout의 저장 형식 통일.** teleoperation으로 모은 시연 데이터와 모델 rollout 기록이 같은 on-disk 레이아웃을 공유한다. LeRobot v2.1 episode 형식이 기준이고 0.2.0에서 LeRobot v3.0과 MCAP과 HDF5 내보내기가 추가됐다.
4. **coding agent 연동 경로.** 로봇 추가, 카메라 캘리브레이션, 로봇 SDK 디버깅을 돕는 스킬을 제공하고, 별도 브랜치에서 MCP 서비스를 통해 coding agent가 런타임 상태를 조회하고 policy 모델을 호출하고 로봇을 직접 제어하는 인터페이스를 시험하고 있다.

### 릴리스 연혁

| 날짜 | 내용 |
|---|---|
| 2026-07-03 | 오픈소스 공개. 기술 리포트와 문서와 프로젝트 페이지 동시 공개 |
| 2026-07-18 | headless CLI와 ZMQ 제어 채널 추가. 브라우저 없이 파이썬 설정 파일만으로 배포와 평가와 강화학습과 수집 루프를 구동하고, 콘솔의 모든 버튼을 ZMQ 소켓으로 대응시켰다 |
| 2026-07-22 | RL 워크스페이스 추가. policy rollout 도중 human-in-the-loop 개입과 실시간 value 곡선 시각화를 지원한다 |
| 2026-08-28 | 0.2.0 릴리스. WebXR 기반 VR 컨트롤러 teleoperation, ARX X5 지원, 듀얼 YAM leader-follower 수집, LeRobot v3.0과 MCAP과 HDF5 내보내기, coding agent용 스킬 |
| 2026-08-28 | EVA-MHS 프리뷰. Anthropic의 Model Hardware Standard 연구 프리뷰에서 착안한 agent와 하드웨어 사이 인터페이스를 `dev/mcp_preview` 브랜치에서 공개했다 |

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 배포 파이프라인

배포 경로는 네 단계를 직렬로 잇는다.

```
.py 설정 파일 → transport → policy backend → 추론 전략 → 로봇
```

transport는 observation과 명령이 오가는 통신 계층이다. ROS 1, ROS 2, ZeroMQ, 오프라인 데이터셋 재생 네 가지를 지원한다. 오프라인 데이터셋은 실제 로봇 없이 기록된 LeRobot v2.x 데이터를 흘려보내는 경로라, 하드웨어가 없는 상태에서도 루프 전체를 점검할 수 있다.

policy backend는 observation을 받아 action을 돌려주는 모델 서버다. 여섯 가지가 등록돼 있다.

| policy backend | 프로토콜과 직렬화 | 비고 |
|---|---|---|
| OpenPI | WebSocket과 msgpack | 상태를 유지하지 않는 stateless 호출 |
| OpenPI-RTC | WebSocket과 msgpack | real-time action chunking 계열 |
| StarVLA | WebSocket과 msgpack | 타입이 정해진 envelope 형식 |
| GR00T | ZeroMQ REQ/REP와 msgpack-numpy | Isaac-GR00T 서버 |
| Mock | 로컬 실행 | 부드럽게 변하는 무작위 action 생성 |
| Replay | 로컬 실행 | 기록된 trajectory 재생 |

Mock과 Replay는 모델 없이 배선을 검증하는 용도다. 실제 체크포인트를 붙이기 전에 transport와 로봇 제어가 제대로 연결됐는지 확인할 수 있다.

추론 전략은 policy가 낸 action chunk를 실제 제어 주기에 맞춰 내보내는 방식을 정한다. sync, async, naive, ACT-ensemble, RTC 다섯 가지가 있고 지연 보정이 실시간으로 적용된다. sync는 추론이 끝날 때까지 기다렸다가 실행하는 방식이고, async는 이전 chunk를 실행하는 동안 다음 추론을 겹쳐 수행해 정지 구간을 없앤다. ACT-ensemble은 겹치는 시점의 여러 action 예측을 평균하는 temporal ensembling 계열이고, RTC는 real-time action chunking으로 chunk 경계의 불연속을 줄인다.

### action space와 로봇 전환

로봇마다 joint-space와 EEF-space 두 가지 action space를 고를 수 있다. joint-space는 각 관절 각도를 직접 지정하는 표현이고, EEF-space는 end-effector의 위치와 자세를 지정한 뒤 역기구학으로 관절 값을 푸는 표현이다. 역기구학 풀이는 PyRoki를 사용한다. 여덟 종 로봇과 두 가지 action space 전환이 모두 DEBUG 탭에서 실행 중에 바뀐다.

### 평가 워크스페이스

평가는 여러 체크포인트를 한 번에 쓸어 보는 sweep 형태로 진행되고, 시도(trial) 단위로 기록을 남긴다. rollout 하나마다 다음 네 가지가 dataset metadata에 저장된다.

- 카메라 영상
- URDF 기반 3D 장면
- 차원별 상태 그래프
- 지시문(instruction)마다 매긴 마일스톤 점수

저장된 기록은 RESULT 탭에서 동기화된 상태로 다시 재생된다. 지시문 순서를 섞는 prompt shuffling과 SSH 포트 포워딩으로 원격 policy 서버를 붙이는 구성이 기본 기능으로 들어 있다. 원격 서버 지원은 GPU가 있는 장비와 로봇이 물리적으로 떨어져 있는 실험 환경을 전제한 것이다.

### 데이터 수집 워크스페이스

COLLECT 탭은 teleoperation 조작을 그대로 LeRobot v2.1 episode로 기록한다. 구성 요소는 네 가지다.

| 구성 요소 | 역할 |
|---|---|
| 백그라운드 저장기 | 기록 중 저장 작업을 분리해 조작 지연을 막는다 |
| 탭 내부 품질 검사 재생 | 방금 모은 episode를 그 자리에서 재생하고 PASS와 FAIL을 판정한다 |
| 카메라 스트림 인코딩 | 카메라 영상을 mp4로 인코딩해 저장한다 |
| 프레임 단위 품질 플래그 | 프레임마다 녹색과 적색으로 품질을 표시한다 |

teleoperation 시연 데이터와 모델 rollout이 같은 on-disk 레이아웃을 쓰기 때문에, 수집한 데이터로 학습한 policy의 rollout을 별도 변환 없이 같은 도구로 열람하고 비교할 수 있다.

0.2.0에서 teleoperation 입력 장치가 늘었다. WebXR 기반 VR 컨트롤러로 조작할 수 있고, 듀얼 YAM 구성에서 leader 팔을 사람이 움직이면 follower 팔이 따라오는 leader-follower 방식 수집을 지원한다.

### 강화학습 워크스페이스

RL 탭은 policy rollout 도중 사람이 개입하는 human-in-the-loop 방식을 지원한다. 사람이 조작을 넘겨받는 순간이 기록으로 남고, value 곡선이 실시간으로 그려진다. 개입 데이터를 다시 학습에 쓰는 경로는 로드맵의 완료 항목으로 표시돼 있다.

### 브라우저 없이 구동하기

2026-07-18 릴리스에서 headless CLI가 추가됐다. 파이썬 설정 파일 하나로 배포와 평가와 강화학습과 수집 루프를 브라우저 없이 실행하고, 콘솔의 모든 버튼을 ZMQ 소켓 명령으로 대응시켰다. human-in-the-loop 개입 명령도 소켓으로 전달된다. 자동화 스크립트나 외부 실험 관리 도구에서 EVA-Client를 부르는 경로다.

### 설정 시스템

설정은 MMEngine에서 가져온 방식을 저장소 안에 포함해 쓴다. `_base_` 상속과 깊은 병합을 지원해, 공통 설정을 상위 파일에 두고 로봇별 차이만 하위 파일에서 덮어쓰는 구성이 가능하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정확도 수치나 벤치마크 표를 싣지 않는다. 도구 저장소이므로 성과는 지원 범위로 제시된다.

### 지원 로봇

| 로봇 | 형태 | 상태 |
|---|---|---|
| AgileX Piper | 6자유도 양팔과 그리퍼 | 지원 |
| ARX R5 | 6자유도 양팔과 그리퍼 | 지원 |
| ARX X5 | 6자유도 양팔과 그리퍼 | 지원 |
| Dual Franka Panda | 7자유도 양팔과 그리퍼 | 지원 |
| Galaxea R1 Lite | 몸통에 붙은 6자유도 양팔 | 지원 |
| Universal Robots UR5e | 6자유도 단일 팔과 그리퍼 | 지원 |
| AgiBot G2 | 24자유도 양팔 humanoid | 지원 |
| YAM | 양팔 follower와 leader | 지원 |
| AgiBot G2 (이동 베이스) | 이동 섀시 위의 humanoid | 개발 중 |
| Tianji | 양팔 manipulator | 개발 중 |
| Unitree H1 / G1 | humanoid | 개발 중 |
| Fourier GR-1 | humanoid | 추가 예정 |
| Booster T1 | humanoid | 추가 예정 |
| Mobile ALOHA | 이동형 양팔 | 추가 예정 |

지원 확정은 여덟 종이고 개발 중이 세 종, 추가 예정이 세 종이다. 지원 목록이 양팔 manipulation 플랫폼에 몰려 있고 humanoid는 AgiBot G2 한 종만 확정 상태다.

### 계량 요약

| 항목 | 수 |
|---|---|
| 지원 로봇 | 8종 |
| transport | 4종 |
| policy backend | 6종 |
| 추론 전략 | 5종 |
| 콘솔 탭 | 7개 |
| 문서 가이드 | 7편 |

### 문서 구성

| 가이드 | 내용 |
|---|---|
| Installation | 요구 사항, `uv` 설정, 하드웨어 부가 패키지, 설치 확인 |
| Quick start | 두 프로세스 기동, 지원 transport, 배포와 평가와 재생 프리셋 |
| Web console | 일곱 개 탭 설명 |
| Core concepts | transport, policy backend, 추론 전략, 로봇, action space |
| Configuration | `_base_` 상속, 깊은 병합, 기동 파이프라인 |
| Recording | LeRobot v2.1 on-disk 레이아웃, 품질 플래그, 평가 시도 |
| Development | 테스트, lint, 타입 검사, 로봇 쪽을 가짜로 대체하는 방법 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 밝힌 한계와 로드맵은 다음과 같다.

### 현재 한계

- **embodiment 범위가 양팔 manipulation에 치우쳐 있다.** 지원 확정 여덟 종 중 일곱 종이 양팔이나 단일 팔 manipulator다. humanoid와 이동 플랫폼과 사족 로봇은 개발 중이거나 추가 예정 상태다.
- **policy backend가 특정 계열에 묶여 있다.** OpenPI, OpenPI-RTC, StarVLA, GR00T 네 가지 실제 backend는 모두 WebSocket이나 ZeroMQ 위에 msgpack을 쓰는 서버 구현을 전제한다. 다른 서빙 방식을 쓰는 policy는 별도 어댑터가 필요하다.
- **MCP 인터페이스가 정식 릴리스가 아니다.** EVA-MHS는 `dev/mcp_preview` 브랜치에 있고 향후 업데이트에서 정식 공개한다고만 밝혔다.
- **데이터셋 형식이 LeRobot에 기울어 있다.** 기준 형식이 LeRobot v2.1이고 v3.0과 MCAP과 HDF5는 내보내기 경로로 제공된다.

### 로드맵

| 항목 | 상태 | 내용 |
|---|---|---|
| 로봇 확대 | 진행 | 양팔 manipulator, humanoid, 이동과 바퀴 플랫폼, 사족 로봇과 팔 조합으로 embodiment를 넓힌다 |
| 강화학습용 human-in-the-loop 수집 | 완료 | rollout 중 개입을 선호와 교정 데이터로 기록하고, DAgger 방식 재라벨링과 reward 모델 신호를 LeRobot episode 형식으로 되돌려 온라인 강화학습 fine-tuning에 쓴다 |
| embodied agent | 진행 | 배포와 평가 루프를 언어 기반 planner로 감싸 long-horizon 과제를 분해하고 실행하고 검증하고 다시 계획한다. planner는 VLM 또는 VLA에 tool use를 결합한 형태를 상정한다 |
| 데이터 주석 | 진행 | COLLECT 모드에 과제와 subtask 단위 주석을 넣어, long-horizon episode를 라벨이 붙은 subtask 단위와 마일스톤으로 분할한다. 같은 LeRobot 데이터셋 안에서 manipulation 단계별 재사용이 가능해진다 |

## 6. 관련 연구 (Related Work)

EVA-Client는 여러 오픈소스 위에 쌓아 올린 통합 계층이다. README가 명시한 의존 관계는 다음과 같다.

| 프로젝트 | EVA-Client에서의 역할 |
|---|---|
| PyRoki와 jaxls | 역기구학 풀이 |
| OpenPI | policy 서빙 |
| LeRobot | 데이터셋 형식 |
| MMEngine | 설정 시스템 (저장소에 포함해 사용) |
| Isaac-GR00T | GR00T policy backend |
| StarVLA | StarVLA policy backend |
| ROS 1과 ROS 2, ZeroMQ | transport 계층 |
| ACT | ACT-ensemble 추론 전략의 근거 |
| OpenPI-RTC | real-time action chunking 추론 전략 |

EVA-MHS는 Anthropic의 Model Hardware Standard 연구 프리뷰에서 착안했다고 밝혔다. coding agent가 로봇 런타임을 조회하고 policy를 호출하고 로봇을 직접 제어하는 인터페이스를 MCP 서비스로 노출하는 구상이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| EVA-Client | 실제 로봇의 배포와 평가와 데이터 수집을 브라우저 콘솔 하나로 처리하는 오픈소스 스택 |
| EVA-MHS | coding agent와 로봇 하드웨어 사이 인터페이스를 MCP 서비스로 노출하는 프리뷰 기능 |
| transport | observation과 명령이 오가는 통신 계층. ROS 1, ROS 2, ZeroMQ, 오프라인 데이터셋 재생 |
| policy backend | observation을 받아 action을 돌려주는 모델 서버 |
| 추론 전략 | policy가 낸 action chunk를 제어 주기에 맞춰 내보내는 방식. sync, async, naive, ACT-ensemble, RTC |
| ACT-ensemble | 겹치는 시점의 여러 action 예측을 평균하는 temporal ensembling 계열 전략 |
| RTC | real-time action chunking. chunk 경계의 불연속을 줄이는 추론 전략 |
| joint-space | 각 관절 각도를 직접 지정하는 action space |
| EEF-space | end-effector의 위치와 자세를 지정하고 역기구학으로 관절 값을 푸는 action space |
| 콘솔 탭 | MANUAL, COLLECT, REPLAY, DEBUG, RL, EVAL, RESULT 일곱 개 화면 |
| 마일스톤 점수 | 지시문마다 과제 달성 단계를 매긴 평가 점수 |
| 품질 플래그 | 수집한 episode의 프레임마다 녹색과 적색으로 표시하는 품질 표시 |
| leader-follower | 사람이 움직이는 leader 팔을 follower 팔이 따라오게 하는 수집 방식 |

## 8. 그림 후보 (Figure Candidates)

이 저장소의 운영 방침상 repo 내 이미지는 자동으로 내려받지 않는다. 아래 후보 중 fig02는 Step 3.5에서 사용자가 수집을 승인해 `wiki/assets/noietch-eva-client/fig02.png`로 저장했고, fig01은 장식용이라 아카이브 경로만 남겼다.

| id | 원본 경로 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | `assets/eva-logo.svg` | 저장소 상단 로고 이미지 | manual | (장식용) |
| fig02 | `assets/workflow.png` | embodiment에서 데이터 수집과 policy 학습과 배포를 거쳐 실제 로봇 평가로 돌아오는 5단계 순환 구조 | manual | 채택 (architecture) |

README에는 이미지 외에 데모 영상 두 편이 GitHub 첨부로 포함돼 있다. 정지 이미지가 아니라 figure 후보에서 제외했다.
