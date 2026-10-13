---
title: "HomeBody: A Humanoid That Explores, Remembers, and Acts on Its Own"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/huh-2026-homebody-a-humanoid-that-explores.md
raw_filename: "huh-2026-homebody-a-humanoid-that-explores.md"
source_collection: external
author: "Gio Huh, Cayden Gu, Takara E. Truong, C. Karen Liu, Guy Tevet"
url: "https://tml.stanford.edu/homebody/"
publisher: "Stanford The Movement Lab (tml.stanford.edu)"
tags: [physical-ai, humanoid, manipulation, simulator]
figures:
  - id: fig01
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig01.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig01.webp
    caption: "Real2Sim으로 재구성한 SRC 주방 디지털 트윈의 정적 렌더. 페이지에서는 클릭하면 3D 뷰어가 열린다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig02.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig02.webp
    caption: "공간 메모리 지도. 재구성한 주방 위에 keyframe 1~3(약 서랍, 우유갑 위치, 카운터의 사람)과 현재 G1 자세(Now)를 표시했다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig03.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig03.webp
    caption: "keyframe 1로 저장된 약 서랍 장면(열린 서랍 안의 약병)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig04.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig04.webp
    caption: "keyframe 2로 저장된 우유갑 위치 장면"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig05.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig05.webp
    caption: "keyframe 3으로 저장된 카운터 앞 사람 장면"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig06.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig06.webp
    caption: "pick 직전 head camera 영상. 싱크대 옆 우유갑 위에 VLM이 고른 점(십자 표시)이 찍혀 있다"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig07.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig07.webp
    caption: "pick 대상 확대 영상. VLM이 고른 점 주변의 우유갑을 크게 보여 준다"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig08.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig08.webp
    caption: "아키텍처 도식 안의 모델 표기용 OpenAI 로고"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig09.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig09.webp
    caption: "점 프롬프트로 얻은 SAM 분할 mask를 RGB 영상에 겹친 결과. 우유갑 영역이 주황색으로 칠해져 있다"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig10.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig10.webp
    caption: "사람이 손으로 찍은 영상만으로 만든 재구성의 위에서 본 모습. 주방 배치와 아일랜드가 보인다"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig11.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig11.webp
    caption: "실측 SLAM point cloud를 위에서 본 기준 지도. G1 재구성과 같은 방향과 축척이며 색은 높이를 뜻한다"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig12.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig12.webp
    caption: "G1 탐색 데이터와 SLAM에 근거해 만든 HomeBody 재구성의 위에서 본 모습"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/huh-2026-homebody-a-humanoid-that-explores/page-full.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷(상단 6000px까지 절단)"
    strategy: screenshot
    curated: false
  - id: fig14
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop01.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop01.png
    caption: "티저 영상 첫 화면. 크레인에 매단 Unitree G1을 처음 보는 주방으로 옮기는 장면"
    strategy: crop
    curated: true
  - id: fig15
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop02.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop02.png
    caption: "System 2, 1, 0 비교 도식과 캡션 영역 크롭(fig26과 같은 그림)"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop03.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop03.png
    caption: "System 2, 1, 0 비교 도식만 자른 크롭(fig26과 같은 그림)"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop04.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop04.png
    caption: "탐색 영상 첫 화면. Astra가 왼쪽 통로부터 둘러보겠다는 판단을 말풍선으로 보이며 다음 시점을 고른다"
    strategy: crop
    curated: true
  - id: fig18
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop05.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop05.png
    caption: "탐색에서 디지털 트윈까지 절의 SLAM point cloud 뷰어 첫 화면. 색은 높이를 뜻한다"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop06.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop06.png
    caption: "재구성 주방과 지시문 입력 패널. 예시 rollout을 디지털 트윈에서 재생하는 위젯"
    strategy: crop
    curated: false
  - id: fig20
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop07.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop07.png
    caption: "재구성 주방 3D 위젯만 자른 크롭(fig01과 같은 장면)"
    strategy: crop
    curated: false
  - id: fig21
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop08.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop08.png
    caption: "탐색과 재구성, 실세계 배치 개요 도식의 페이지 크롭(fig25와 같은 그림)"
    strategy: crop
    curated: false
  - id: fig22
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop09.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop09.png
    caption: "개요 도식의 두 번째 크롭(fig21과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig23
    file: assets/huh-2026-homebody-a-humanoid-that-explores/crop10.png
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/crop10.png
    caption: "아키텍처 위젯 크롭. 상단이 페이지 목차 팝업에 가려져 있다(fig24로 대체)"
    strategy: crop
    curated: false
  - id: fig24
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig24.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig24.webp
    caption: "HomeBody 아키텍처. 공간 메모리와 현재 영상이 상위 과제 패널의 VLM 결정을 받치고, VLM이 skill bank에서 스킬과 대상을 고르면 pick이 점 클릭 분할, grasp 계산, 팔 trajectory 생성, 실행의 네 단계로 수행되며 성공이나 실패가 VLM에 전달된다"
    strategy: fetched
    curated: true
  - id: fig25
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig25.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig25.webp
    caption: "HomeBody 전체 흐름. 위는 Astra가 waypoint를 고르며 탐색하고 SLAM과 depth, iPhone 영상, 관절 상태, 탐색 경로를 모아 Real2Sim agent가 장면을 재구성하는 단계, 아래는 주방 정리 과제를 pick, place, navigate 다섯 단계로 실행한 실제 기록이다"
    strategy: fetched
    curated: true
  - id: fig26
    file: assets/huh-2026-homebody-a-humanoid-that-explores/fig26.webp
    raw: raw/articles/huh-2026-homebody-a-humanoid-that-explores-figures/fig26.webp
    caption: "humanoid VLA의 System 2(VLM), System 1(VLA), System 0(whole-body tracking) 연쇄와 HomeBody 구조의 비교. HomeBody는 System 1을 빼고 교체 가능한 VLM이 스킬과 대상을 skill library에 직접 넘기며, observation과 결과가 VLM에 전달된다"
    strategy: fetched
    curated: true
---

## 한 줄 요약 (One-line Summary)

Stanford The Movement Lab(TML)의 HomeBody 프로젝트 페이지다. frontier VLM(GPT Astra)에 지속되는 공간 메모리와 조합 가능한 humanoid 스킬을 붙여, 처음 보는 주방에서 Unitree G1이 환경별 학습 데이터나 추가 policy 학습 없이 방 전체를 오가며 정리하고 기억해 둔 물체를 가져오게 하는 시스템을 소개한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | HomeBody: A Humanoid That Explores, Remembers, and Acts on Its Own |
| URL | https://tml.stanford.edu/homebody/ |
| 저자 | Gio Huh(Caltech, Stanford), Cayden Gu, Takara E. Truong, C. Karen Liu, Guy Tevet(이상 Stanford). Liu와 Tevet이 공동 지도 |
| 날짜 | 페이지 표기 2026년 9월, jina가 보고한 게시 시각 2026-10-13 |
| 수집 | 2026-10-14, `scripts/fetch_article.py` jina tier, 본문 15,122자 |
| 보충 | jina가 놓친 hero 영역(초록과 System 비교 도식 설명)을 저장소 `docs/index.html`에서 원문 그대로 덧붙이고, 도식 3장(fig24~fig26)을 별도로 받았다 |
| 대응 저장소 | `sources/stanford-tml-homebody.md` |
| 논문 | 없음. BibTeX는 `@misc` 형식이며 페이지 상단의 "Paper" 링크 대상은 수집 자료에 없다 |

페이지의 주된 내용은 영상이다. 주방 정리와 약 가져오기 데모, 탐색, 스킬별 실제 로봇 영상(pick, place, open drawer, pick from drawer, navigate), 재시도 영상이 있으나 텍스트로는 수집되지 않았고 크롭에 첫 화면 일부만 남았다.

## 2. 주요 기여 (Key Contributions)

1. 문제 제기: humanoid 자율 시스템은 흔히 세 층 구조를 따른다. System 2 VLM이 영상과 지시문(instruction)을 처리하고, 학습된 System 1 VLA가 명령을 만들며, System 0 controller가 협응된 동작을 실행한다. 페이지는 frontier VLM이 충분히 강해진 지금 고수준 추론과 로봇 스킬 사이에 학습된 VLA가 여전히 필요한지, System 2가 재사용 가능한 motor skill library를 직접 조율할 수 있는지를 묻는다.
2. 시스템: HomeBody는 frontier VLM에 지속되는 공간 메모리(persistent spatial memory)와 조합 가능한 humanoid 스킬(composable humanoid skills)을 붙여 long-horizon 과제를 수행한다. VLM은 교체 가능하다(hot-swappable, plug-and-play).
3. 배치 절차: 탐색(Explore), Real2Sim 재구성, 일상 과제 지시의 세 단계로 처음 보는 환경에 배치한다.
4. 결과: 처음 보는 주방에서 GPT Astra가 이끄는 Unitree G1이 방을 가로질러 정리하고, 모호한 요청으로부터 기억해 둔 물체를 가져온다. 환경별 학습 데이터와 추가 policy 학습은 쓰지 않는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

long-horizon loco-manipulation은 humanoid가 ego view로 볼 수 있는 범위를 넘어선다. 방 전체에서 행동하려면 보이는 물체와 기억한 위치를 잇는 내부 공간 모델이 필요하고, 이 모델이 모호한 요청을 푸는 데도 쓰인다. 이 문맥이 어디로 갈지, 무엇에 작용할지, 걷기와 조작을 어떤 순서로 이을지를 정한다. HomeBody는 공간 메모리와 조합 가능한 스킬을 결합하고, 스킬 실행 피드백으로 VLM이 action이나 전환이 실패했을 때 다음 결정을 고친다.

### 3.2 System 2, 1, 0 구조와의 비교 (fig26)

| 구분 | 구성 | 성격 |
|---|---|---|
| humanoid VLA | System 2 VLM → System 1 VLA → System 0 whole-body tracking | 학습된 action pipeline |
| HomeBody | System 2(plug-and-play VLM, GPT Astra) → 스킬과 대상 → System 0(skill library: navigate, pick, open drawer) | 조합 가능한 스킬 인터페이스. observation과 결과가 VLM에 다시 전달된다 |

페이지는 그림의 로봇 자세가 예시용(illustrative)이라고 밝힌다.

### 3.3 배치 3단계 (fig25)

1. 탐색(Explore): humanoid에 역할 문맥("You are a kitchen robot, please explore the space!")을 주고 처음 보는 환경을 탐색하게 한다. 수집 데이터는 0.5배 광각 iPhone 영상, D435i 카메라 observation, SLAM을 곁들인 LiDAR 스캔, 관절 자세, Astra가 고른 waypoint다. 탐색은 humanoid 자신의 시점에서 방을 담으므로 공간 문맥이 움직이며 보는 것에 근거하고, 물체가 시야를 벗어나도 문맥이 유지된다.
2. Real2Sim: Astra가 Real2Sim agent 역할을 맡아 humanoid가 모은 데이터로 Isaac Sim에 디지털 트윈을 만든다. 개요 도식에는 IsaacLab, MuJoCo, Blender가 재구성 도구로 나열되고 Real2Sim agent도 hot-swappable로 표시된다. SLAM 형상, ego view, 관절 상태, waypoint에 근거하므로 형상, 의미, 외관 면에서 정확한 트윈을 만들고, 이 트윈이 배치 시 시야 밖 위치에 대한 추론을 받친다.
3. 과제 지시: "tidy up the kitchen" 같은 지시문을 주면 HomeBody는 공간 문맥으로 action과 대상을 정하며 action 단위 스크립트를 쓰지 않는다. 페이지에는 "Tidy up the kitchen. Put the coffee bags on the island and throw away the spoiled cartons."를 디지털 트윈에서 재생하는 예시 rollout 위젯이 있다.

### 3.4 아키텍처 (fig24)

| 블록 | 내용 |
|---|---|
| Spatial context and memory | 의미 라벨이 붙은 지도, keyframe 1~3(약 서랍, 우유갑 위치, 카운터의 사람), 현재 G1 자세. agent와 Remember/Recall로 주고받는다 |
| Current observation | ego view RGB와 VLM이 고른 대상(예: 우유갑) |
| 상위 과제 패널 | 과제("Bring my medicine, then tidy up."), 모델(GPT Astra, hot-swappable VLM), subtask 진행(약 가져오기 완료, 사람에게 전달 완료, 우유갑 버리기 진행 중), 현재 action("Pick the carton")과 판단 문장("The carton is visible beside the sink.") |
| Skill bank | Pick, Place, Open drawer, Pick from drawer, Navigate, Add a skill |
| Pick 물리 실행 | 1 점 클릭 분할, 2 grasp 계산과 retargeting(3D point와 grasp), 3 팔 trajectory 생성(Approach, Grasp, Lift, spline과 IK), 4 실행. 성공이나 실패가 상위 과제 패널에 전달된다 |

### 3.5 스킬 목록

| 스킬 | 설명(페이지 원문 요지) | 영상 표기 |
|---|---|---|
| Pick | ego 영상에서 고른 물체를 잡아 든다 | 실제 로봇, 1.25배속 |
| Place | 든 물체를 고른 3D 놓기 지점으로 옮긴다 | 실제 로봇, 1.25배속 |
| Open drawer | 손잡이에 시각적으로 맞추고 걸어 뒤로 걸으며 서랍을 연다 | 실제 로봇, 1.25배속, retry 포함 |
| Pick from drawer | 열린 서랍 안으로 손을 넣어 고른 물체를 서랍 가장자리 위로 들어 올린다 | 실제 로봇, 14배속에서 4배속 |
| Navigate | Real2Sim 지도의 위치까지 계획된 경로를 따라간다 | 실제 로봇, 1.25배속 |
| Add your own skill | 학습된 policy, 고전 알고리즘, 다른 controller를 공유 인터페이스로 연결하면 VLM이 기존 스킬과 이어 쓴다 | 없음 |

스킬은 대상과 실행 결과에 대한 인터페이스를 공유하므로 VLM이 배치 시점에 조합할 수 있다. 국소 재시도와 시각 피드백이 실행 오류를 고친다. 대부분의 스킬 영상은 7~10초 정도로 빨리 감았고, 서랍 열기와 grasp 영상에는 기록된 재시도가 들어 있다.

### 3.6 FAQ 세부

- 정확한 Real2Sim의 조건: 사람이 찍은 영상은 외관 정렬에는 풍부하지만, HomeBody는 방을 지나다니고 자세를 잡고 물체에 손을 뻗기 위해 정확한 형상이 필요하다. 영상만 쓰면 Real2Sim agent가 외관으로 방 치수를 추정하는 반면, HomeBody는 SLAM 실측 형상으로 치수를 제약한다. 비교 그림 세 장(사람 영상 재구성, SLAM 기준, HomeBody 재구성)은 같은 시점과 축척이다(fig10~fig12).
- 기지 환경 localization: Super Odometry로 G1을 localization하고, SLAM 지도를 재구성 시뮬레이션과 ICP(iterative closest point) 정합으로 맞춘다. ego 카메라 observation을 설명 내용과 함께 이 공통 좌표계에 저장하므로 기록한 위치로 복귀할 수 있다.
- VLM 결정에서 물리 action으로: VLM은 현재 ego view, 지도 문맥, 그리퍼 상태, 회상한 observation, 이전 결과를 보고 스킬과 대상을 고른 뒤 구조화된 tool call로 넘긴다. 저수준 구현은 스킬이 맡으므로 VLM은 그것을 알 필요가 없다.
- pick: 0~1000으로 정규화한 영상 좌표 한 점과 사용할 손을 지정한다. 점이 SAM 분할의 프롬프트가 되고, Fast-FoundationStereo가 D435i 스테레오 영상에서 depth를 추정하며, 카메라 보정으로 mask 형상을 3D로 투영해 grasp를 해석적으로 예측한다. 팔 planner는 minimum-jerk 시간 배분의 spline 기준 경로를 만들고, 경로를 따라 inverse kinematics를 풀고, 쓸고 지나가는 동작의 충돌 여유를 검사한다.
- 다른 스킬의 대상: navigate는 지도 좌표(m) 2D 목표와 바라볼 점, place는 손, torso 좌표계 3D 놓기 대상, 놓는 거리, open drawer는 손잡이 정렬, 거는 자세, 뒤로 걷기를 한 스킬로 묶어 손 뻗기에서 당기기로의 전환을 조율한다.
- 실수 교정과 재시도: 접근 중 대상이 영상에서 움직이면 분할로 물체를 찾고 SAM 2.1 tracking과 SAMURAI memory selection으로 다음 프레임에서 따라가며, visual servoing이 매 보정마다 VLM 결정을 새로 받지 않고 정렬을 고친다. grasp가 접촉 없이 닫히면 pick 스킬이 다른 grasp 후보를 쓰거나 자세를 바꿔 다시 계획한다. 국소 재시도는 횟수가 제한되고, 다 쓰거나 다른 action이 필요한 실패면 이유를 VLM에 보고해 재배치, 새 대상, 계획 변경을 맡긴다. 서랍 안 약병 재시도 영상이 있다.
- 걷기와 조작의 협응: pre-training을 마친 AMO를 상체 인지형 하체 제어에 쓴다. AMO는 팔 목표를 고려해 하체를 조율한다. 팔과 손 명령은 250Hz, AMO policy는 다섯 번째 제어 tick마다 갱신되어 50Hz다.
- 연산 자원: 현재 스킬과 perception, motion planning은 RTX 4090 GPU를 단 Razer Blade 노트북 한 대에서 실행된다. GPT Astra는 원격에서 실행되어 스킬 요청과 대상을 노트북에 보내고 실행 결과를 받는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

페이지는 정량 표를 싣지 않는다. 데모 두 개를 정성적으로 보인다.

| 데모 | 지시문 | 페이지 서술 |
|---|---|---|
| Tidy the kitchen | "Clean up all of the coffee bags and put them in the middle, and throw away all of the milk and orange juice cartons that have gone bad." | 남길 것과 버릴 것을 정하고 커피 봉지를 아일랜드에 모으며 지정된 우유갑을 버린다. 왕복, grasp, 놓기를 방 전체에서 반복하고, 시점이 계속 바뀌므로 메모리와 action 피드백으로 끝난 일과 남은 일을 추적한다 |
| Retrieve the medicine | "I forgot my medicine, can you get it for me? Also throw out the bad carton while you are at it." | 약은 처음에 보이지 않는다. 저장된 keyframe으로 서랍을 찾고, 오른손으로 손잡이를 잡아 서랍을 연 뒤 약을 꺼내 사람에게 건네고, 왼손으로 우유갑을 버린다. 두 팔 중 하나를 골라 몸 양쪽 대상에 접근한다 |

개요 도식(fig25)의 실제 주방 기록은 GPT Astra로 수행한 다섯 단계다: Pick("the coffee bag is clearly visible here."), Place("the held coffee belongs on this counter."), Navigate("the milk carton was remembered there."), Pick("the milk carton is clearly visible here."), Place("the bin opening is visible and reachable.").

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지의 "Scope and limitations" 항목이다.

- Real2Sim 재구성이 준비 시간과 API 비용을 늘린다.
- 과제 길이가 humanoid의 도달 범위, 조작 능력, 하드웨어 지구력에 묶인다. 장시간 동작 시 손가락 servo 과열이 그 예다.
- GPT Astra의 추론 지연이 스킬 사이에 멈춤을 만든다.
- 현재 로컬 스택은 RTX 4090 노트북 GPU가 필요하고, 더 무거운 perception 모델이나 스킬을 더하면 연산이 더 필요할 수 있다.

데모 목록에는 "More coming soon!"이 붙어 있어 추가 과제가 예고되어 있다.

## 6. 관련 연구 (Related Work)

페이지 참고문헌 6개다.

| 번호 | 자료 | HomeBody에서의 역할 |
|---|---|---|
| 1 | Super Odometry | G1 localization |
| 2 | NVIDIA Isaac Sim | 디지털 트윈 |
| 3 | SAM 2 | 점 프롬프트 분할, tracking |
| 4 | Fast-FoundationStereo | D435i 스테레오 depth |
| 5 | SAMURAI | tracking의 motion-aware memory selection |
| 6 | AMO | 상체 인지형 하체 제어 policy |

구조 면에서는 System 2, 1, 0의 dual-system VLA 계열(본문은 humanoid VLA라고 부른다)을 비교 대상으로 삼는다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| HomeBody | frontier VLM에 공간 메모리와 조합 가능한 humanoid 스킬을 붙인 TML의 시스템 이름 |
| GPT Astra | 데모에 쓴 OpenAI frontier VLM. 상위 결정과 Real2Sim agent를 맡는다 |
| Real2Sim agent | humanoid 탐색 데이터로 시뮬레이터 안 디지털 트윈을 만드는 VLM agent |
| spatial context and memory | 의미 라벨 지도, keyframe, 현재 로봇 자세로 이뤄진 공간 문맥. 물체가 시야를 벗어나도 남는다 |
| keyframe | 탐색 중 공통 좌표계에 저장한 ego 카메라 observation과 설명. 회상 대상이 된다 |
| skill bank | VLM이 고를 수 있는 스킬 모음. 공유 인터페이스로 새 스킬을 더한다 |
| AMO | 팔 목표를 고려해 하체를 조율하는 pre-training을 마친 whole-body control policy |
| SRC Kitchen | Stanford Robotics Center가 제공한 데모 주방 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 재구성 주방 디지털 트윈 정적 렌더 | fetched | (fig02, fig25와 중복) |
| fig02 | 공간 메모리 지도(keyframe 1~3과 현재 자세) | fetched | ★ wiki 권장 (memory) |
| fig03 | keyframe 1 약 서랍 | fetched | (fig24에 포함) |
| fig04 | keyframe 2 우유갑 위치 | fetched | (fig24에 포함) |
| fig05 | keyframe 3 카운터의 사람 | fetched | (fig24에 포함) |
| fig06 | pick 직전 head camera 영상과 클릭 점 | fetched | (fig24에 포함) |
| fig07 | pick 대상 확대 | fetched | (fig24에 포함) |
| fig08 | OpenAI 로고 | fetched | (장식) |
| fig09 | SAM 분할 mask 겹침 | fetched | ★ wiki 권장 (method) |
| fig10 | 사람 영상만으로 만든 재구성 | fetched | ★ wiki 권장 (비교) |
| fig11 | SLAM 기준 지도 | fetched | ★ wiki 권장 (비교) |
| fig12 | HomeBody 재구성 | fetched | ★ wiki 권장 (비교) |
| fig13 | 페이지 전체 스크린샷 | screenshot | (보관용) |
| fig14 | 티저 첫 화면, G1을 주방으로 옮김 | crop | ★ wiki 권장 (setting) |
| fig15 | System 비교 도식 크롭 | crop | (fig26과 중복) |
| fig16 | System 비교 도식 크롭 | crop | (fig26과 중복) |
| fig17 | 탐색 영상 첫 화면, Astra 판단 말풍선 | crop | ★ wiki 권장 (explore) |
| fig18 | SLAM point cloud 뷰어 첫 화면 | crop | (해상도 낮음) |
| fig19 | 재구성 주방과 지시문 위젯 | crop | (확인 필요) |
| fig20 | 재구성 주방 3D 위젯 | crop | (fig01과 중복) |
| fig21 | 개요 도식 페이지 크롭 | crop | (fig25와 중복) |
| fig22 | 개요 도식 페이지 크롭 | crop | (fig25와 중복) |
| fig23 | 아키텍처 위젯 크롭, 목차에 가려짐 | crop | (fig24로 대체) |
| fig24 | HomeBody 아키텍처 | fetched | ★ wiki 권장 (architecture) |
| fig25 | 탐색, 재구성, 실세계 배치 전체 흐름 | fetched | ★ wiki 권장 (overview) |
| fig26 | System 2, 1, 0 구조와 HomeBody 비교 | fetched | ★ wiki 권장 (concept) |
