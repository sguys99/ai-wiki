---
title: "RoboColosseum: Evaluating Physical Intelligence at Scale In-The-Wild"
type: paper
year: 2026
category: physical-ai
source: nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.md
sources:
  - nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.md
  - robocolosseum-2026-robocolosseum-a-scientific-megaproject-for.md
  - robocolosseum-2026-robocolosseum-the-proving-ground-for.md
raw_path: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.pdf
raw_filename: "nguyen-2026-robocolosseum-evaluating-physical-intelligence-at.pdf"
source_collection: external
authors: "Tan Sang Nguyen, Yi Ru Wang, Shailesh Shailesh, Gang Yang, Jiamo Hu, Jianuo Jiang, Haoquan Fang, Zhongzheng Ren, Zhongyi Luo, Ian Chong, et al., Dieter Fox, David Hsu, Thomas Wolf, Jiafei Duan"
arxiv_id: "2611.02497"
url: "https://robocolosseum.ai/"
blog_url: "https://robocolosseum.ai/blog/evaluating-physical-intelligence-in-the-wild/"
tags: [physical-ai, benchmark, manipulation, humanoid]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig01.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig01.png
    caption: "RoboColosseum 전체 구성. 분산 평가 사이트와 공용 policy serving 인프라, Fine-tune Track과 Open Track 두 트랙의 관계와 트랙별 산출물"
    page: 2
    bbox_norm: [0.106, 0.073, 0.894, 0.4785]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig02.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig02.png
    caption: "네 embodiment의 하드웨어 구성. Bimanual-YAM, SO-101, DROID 구성의 Franka, Unitree G1의 카메라와 그리퍼, 연산 장비 배치"
    page: 5
    bbox_norm: [0.106, 0.0729, 0.894, 0.2294]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig03.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig03.png
    caption: "embodiment별 Open Track DCR rating(Elo 척도)과 95% 신용구간. VLA policy 5종과 frontier 모델 3종 비교"
    page: 9
    bbox_norm: [0.106, 0.073, 0.894, 0.3132]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig04.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig04.png
    caption: "frontier 모델과 VLA policy의 task progress 비교. 901회 대응 평가에서 우세 비율과 평균 진행도 차이"
    page: 10
    bbox_norm: [0.106, 0.073, 0.894, 0.2881]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig06.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig06.png
    caption: "사람이 매긴 과제 난이도 구간별 성공률과 실패 실행의 평균 normalized progress"
    page: 12
    bbox_norm: [0.1444, 0.073, 0.8556, 0.281]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig07.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig07.png
    caption: "Fine-tune Track embodiment별 progress reachability 곡선. 기준의 일정 비율 이상을 만족한 trial 비율"
    page: 12
    bbox_norm: [0.106, 0.3489, 0.894, 0.565]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig08.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig08.png
    caption: "fine-tuning 후 policy별 실패 단계. SO-101 cube_drawer와 DROID close_laptop에서 처음 충족하지 못한 기준"
    page: 14
    bbox_norm: [0.106, 0.073, 0.894, 0.2745]
    strategy: caption-region
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig09.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig09.png
    caption: "embodiment별 Open Track 순위와 Fine-tune Track 순위의 교차 비교와 Spearman 상관"
    page: 15
    bbox_norm: [0.106, 0.073, 0.894, 0.3158]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig10.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig10.png
    caption: "(a) embodiment 간 Fine-tune 순위 일치도(Kendall W 0.24), (b) 평가 사이트 부분집합 간 DCR 순위 일치도"
    page: 16
    bbox_norm: [0.106, 0.0729, 0.8824, 0.2877]
    strategy: caption-region
    curated: true
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig11.png
    raw: raw/papers/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at-figures/fig11.png
    caption: "(a) active matchmaking과 균등 샘플링의 순위 일치도 수렴 비교, (b) 평가 규모에 따른 Open Track 순위 안정성"
    page: 17
    bbox_norm: [0.1064, 0.073, 0.8898, 0.2877]
    strategy: caption-region
    curated: true
  - id: blog01
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog01.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/fig01.png
    caption: "두 평가 트랙 개념도. (a) 고정 장면 데이터셋으로 fine-tuning 후 고정 장면에서 평가, (b) 학습 데이터 제한 없이 개방 장면에서 pairwise 비교"
    strategy: fetched
    from_source: robocolosseum-2026-robocolosseum-a-scientific-megaproject-for
    curated: true
  - id: blog09
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog09.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop06.png
    caption: "Fine-tune Track 리더보드. 평균 trial 점수 π0.5 0.725, MolmoAct2 0.605, GR00T N1.7 0.552, G0.5 0.515, LingBot-VLA v2 0.465"
    strategy: crop
    from_source: robocolosseum-2026-robocolosseum-a-scientific-megaproject-for
    curated: true
  - id: blog10
    file: assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog10.png
    raw: raw/articles/robocolosseum-2026-robocolosseum-a-scientific-megaproject-for-figures/crop07.png
    caption: "Open Track 리더보드. DCR rating(Elo 척도) GPT-6 Astra 1,778부터 Grok 4.7 964까지 8개 시스템"
    strategy: crop
    from_source: robocolosseum-2026-robocolosseum-a-scientific-megaproject-for
    curated: true
---

## 요약

RoboColosseum은 실제 생활 공간에 흩어진 로봇들을 하나의 평가 인프라로 묶어 로봇 foundation model을 대규모로 비교하는 분산 실세계 벤치마크다. National University of Singapore(NUS)의 MAGIC Lab, Hugging Face, BitRobot, Singapore Embodied AI Centre가 공동 창립했고, 2026년 11월 arXiv 논문(2611.02497)과 공식 블로그, 평가 신청용 홈페이지를 함께 공개했다. 이 페이지는 세 자료를 한곳에 정리한다.

첫 연구는 2026년 9월 17일부터 10월 28일까지 41일 동안 진행했다. VLA policy 5종(GR00T N1.7, π0.5, MolmoAct2, G0.5, LingBot-VLA v2)과 frontier 모델 3종(GPT-6 Astra, Claude Opus 5.5, Grok 4.7)을 4개 embodiment(SO-101, DROID 구성의 Franka, Bimanual-YAM, Unitree G1)에서 평가했다. Open Track에서는 124개 사이트에서 5,699회 pairwise 비교를 수행했고, Fine-tune Track에서는 20개 과제를 같은 시연 데이터(demonstration) 100개로 학습시켜 비교했다.

결과는 "한 번의 평가로는 모델 능력을 다 담을 수 없다"는 결론으로 모인다. 핵심 결과는 다음 네 가지다.

- frontier 에이전트가 과제별 적응 없이도 특화 VLA policy와 경쟁한다.
- fine-tuning 후 순위는 embodiment마다 크게 달라 일치도가 Kendall W = 0.24에 그친다.
- 개방 환경 순위가 fine-tuning 후 순위를 잘 예측하지 못한다.
- 부분 진행도를 재면 성공률로는 보이지 않는 차이가 드러난다.

## 배경

### 실세계 평가가 어려운 이유

로봇 policy는 물리 세계와 closed-loop로 상호작용하므로 평가가 어렵다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말하며, 로봇이 낸 action 하나가 다음 순간의 조건을 바꾼다. 따라서 결과는 policy만이 아니라 로봇 셋업, 초기 조건, 주변 환경이 함께 결정한다. 이름이 같은 과제라도 물체 배치, 카메라 구성, 조명, 물체의 물리 특성이 달라 성능 차이를 policy 능력에 귀속하기 어렵다.

물리 평가는 서로 당기는 두 요구를 함께 만족해야 한다.

- 의미 있는 비교를 위한 충분한 통제
- 특정 셋업을 넘어선 강건성을 보기 위한 충분한 환경 다양성

시뮬레이터는 반복 가능한 리셋과 통제된 변이를 주므로 대규모 평가에 유리하다. 반면 센싱, 보정, dynamics, 외관 차이 때문에 시뮬레이션 성능이 실세계 결과를 얼마나 예측하는지는 제한적이다. 실제 로봇으로 같은 규모를 내려면 셋업, 리셋, 유지보수, trial 실행에 큰 노동이 든다. 그래서 실세계 연구는 rollout 수가 적고 추정이 trial 선택과 실험 변동에 민감하다.

### 선행 시도의 한계

평가를 여러 사이트에 분산하면 환경 범위가 넓어진다. 그러나 학생과 자원봉사자에 의존하는 방식은 지속과 확장이 어렵다. 인력, 장비 유지, 사이트 간 조율이 다른 연구 일정과 경쟁하기 때문이다. RoboColosseum 논문이 비교하는 선행 계열은 다음과 같다.

| 계열 | 사례 | 한계 또는 차이 |
|---|---|---|
| 표준화 실세계 벤치마크 | FurnitureBench, SceneReplica, RoboDojo(양팔 플랫폼 3종, 과제 18개), VLA-REPLICA(저가 SO-101) | 단일 셋업 재현에 초점 |
| 원격 테스트베드 | TOTO, Real Robot Challenge | 하드웨어를 한곳에 모아 환경 다양성이 제한됨 |
| 분산 평가 | RB2, RoboArena(7개 기관, 612회 비교) | RoboArena는 DROID/Franka 단일 embodiment이고 열린 설계라 단일 요인 통제 실험이 어려움 |
| arena식 평가 | Chatbot Arena(Bradley-Terry), active ranking | 언어 모델용. pairwise 집계와 정보량 기반 쌍 선택의 선례 |

블로그는 같은 문제의식을 과학 인프라 비유로 설명한다. 허블 우주 망원경과 대형 강입자 충돌기(LHC)가 개별 연구실이 닿지 못하는 질문을 공동체 전체가 탐구하게 했듯, 로보틱스에도 가설 검증, 실패 유형 발견, 접근법 비교, 진전 추적에 쓰는 공유 과학 도구가 필요하다는 주장이다. 블로그는 이 사업을 "scientific megaproject"라고 부른다.

## 핵심 개념

embodiment는 policy가 실행되는 로봇의 물리적 형태와 센서, action 규격의 조합을 뜻한다. RoboColosseum은 embodiment마다 observation과 action 규격을 고정해 모든 사이트에서 같은 policy가 돌아가게 한다.

pairwise 비교는 두 모델을 같은 조건에서 나란히 실행해 어느 쪽이 나은지 판정하는 평가 방식이다. Open Track에서 평가자는 두 모델의 이름을 모른 채 trial A와 trial B만 본다.

task progress는 과제를 끝내지 못했어도 중간 단계를 얼마나 달성했는지를 재는 지표다. RoboColosseum은 과제마다 K개의 progress 기준을 정의하고 만족한 비율로 점수를 낸다.

DCR(Difficulty-Calibrated Rasch)은 policy 능력과 과제 난이도를 함께 추정하는 순위 모델이다. 교육 측정의 Rasch 모형에서 학생 능력과 문항 난이도를 함께 추정하는 방식을 로봇 평가에 옮긴 것이다.

active matchmaking은 순위의 불확실성을 가장 많이 줄일 모델 쌍에 다음 평가를 우선 배정하는 방식이다. 물리 trial은 비싸므로 정보량이 큰 비교에 집중한다.

## 방법

### 전체 구성

RoboColosseum은 지리적으로 분산된 평가 사이트, 공용 policy serving 인프라, 표준 평가 프로토콜을 하나의 시스템으로 통합한다. 논문은 이 물리 인프라와 운영 프로토콜 설계 자체를 핵심 기여로 꼽는다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig01.png]]
*Figure 1: RoboColosseum 전체 구성. 분산 평가 사이트와 공용 policy serving 인프라, 두 평가 트랙의 관계와 트랙별 산출물 (Nguyen 2026, p.2)*

| 구성 요소 | 내용 |
|---|---|
| 로봇 규모 | 미국, 영국, 싱가포르, 말레이시아, 중국에 걸친 100대 이상(논문). 블로그는 수백 대, 홈페이지는 140개 이상 장면이라고 표기한다 |
| 운영 인력 | 최대 30명의 전업 로봇 운영자가 프로토콜 실행, 환경 리셋, rollout 판정을 맡는다(블로그는 "robot rigger" 30명 팀이 전일 교대로 평가한다고 쓴다) |
| 평가 장소 | 사무실, 도서관, 공원, 기숙사, 가정, 푸드코트, 공장. 싱가포르 캠퍼스와 산업 건물, 말레이시아 가정, 중국 공장 |
| 추론 | RTX 5090 노트북에서 로컬 실행하거나 원격 라우팅 서버를 거친 서버 호스팅 endpoint에서 실행한다. 두 방식 모두 지연을 측정해 저지연 실행을 확인했다 |
| 개인정보 | 녹화 영상에 얼굴 블러와 신원 익명화를 적용하는 전용 파이프라인 |
| 공개 | 시연 데이터와 실패를 포함한 모든 평가 실행을 LeRobot 형식으로 Hugging Face에 공개한다 |

### embodiment 구성

네 embodiment는 비용, 형태, 제어 복잡도가 서로 다르다. 저가 단일 팔, 양팔 시스템, 연구용 팔, 보행 humanoid를 함께 두는 이유는 같은 모델 계열의 결과가 하드웨어를 넘어 일반화되는지 확인하기 위해서다. 단일 embodiment 벤치마크로는 이 질문에 답할 수 없다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig02.png]]
*Figure 2: 네 embodiment의 하드웨어 구성. Bimanual-YAM, SO-101, DROID 구성의 Franka, Unitree G1 (Nguyen 2026, p.5)*

| embodiment | action space | 카메라 | Open Track 체크포인트 학습 데이터 | 비고 |
|---|---|---|---|---|
| SO-101 | 6차원 joint position (팔 관절 5 + 그리퍼 1) | 외부 1 + 손목 1 | MolmoAct2-SO101 | 이동식 트롤리 장착 |
| DROID (Franka) | 8차원 joint position (팔 관절 7 + 그리퍼 1) | 외부 2 + 손목 1 | DROID 데이터셋 | DROID 구성 그대로 |
| Bimanual-YAM | 14차원 joint position (팔당 6 + 그리퍼 1) | 상단 1 + 손목 2 | MolmoAct2-YAM | MolmoAct2 셋업, 이동식 트롤리 |
| Unitree G1 | humanoid | 논문 표 1 미기재 | 해당 없음 | 평행 그리퍼 장착, Fine-tune Track만 참여 |

홈페이지는 Earth Rover Mini+ 바퀴형 로봇이 추가될 예정이라고 밝힌다. 외부 팀의 policy는 해당 로봇의 카메라 입력을 받아 그 로봇의 action 형식을 출력해야 한다.

### 두 트랙의 설계 원칙

RoboColosseum은 모든 사이트에 같은 환경, 물체, 배경을 요구하지 않는다. 대신 두 트랙이 서로 다른 요소를 통제한다. 트랙마다 무엇을 고정하고 무엇을 허용하는지를 명시한 것이 설계의 중심이다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog01.png]]
*블로그 Figure 1: 두 평가 트랙 개념도. 왼쪽은 고정 장면 데이터셋으로 fine-tuning한 뒤 고정 장면에서 평가하는 Fine-tune Track, 오른쪽은 학습 데이터 제한 없이 개방 장면에서 두 policy를 비교하는 Open Track (RoboColosseum 블로그)*

| 트랙 | 측정 대상 | 고정 요소 | 허용 요소 |
|---|---|---|---|
| Fine-tune Track | 과제별 적응력 | 과제별 시연 데이터, 과제 정의, 성공 기준, progress 기준, 평가 절차 | 모델별 fine-tuning 방법 |
| Open Track | 과제별 적응 없는 일반화 능력 | 한 비교 안의 로봇, 지시문(instruction), 물체, 초기 셋업, timeout | 비교마다 과제와 환경 |

Fine-tune Track은 DataComp의 통제 설계를 뒤집은 형태다. DataComp는 학습 절차를 고정하고 데이터를 바꿔 비교했다. RoboColosseum은 반대로 데이터를 고정하고, 아키텍처마다 필요한 학습 절차가 다르므로 학습 방법은 모델별로 허용한다. 블로그는 이 트랙을 VLA뿐 아니라 WAM, RL 기반 policy, agentic 프레임워크까지 같은 testbed에서 비교하는 장으로 소개한다. Open Track은 frontier 연구실이 pre-training 데이터 구성과 학습 목표가 실제 물리 능력으로 어떻게 이어지는지 연구하는 기반으로 소개한다.

### Fine-tune Track 절차

Fine-tune Track은 pre-training을 마친 policy가 과제별 시연 데이터로 새 과제에 얼마나 효율적으로 적응하는지를 잰다. 진행 순서는 다음과 같다.

1. **과제 정의**: embodiment마다 확장 가능한 과제 목록을 두고 현재는 5개씩, 총 20개를 평가한다. 각 과제는 task card로 정의한다. task card에는 지시문, 물체, 초기 셋업, 성공 기준, timeout, 평가 장소, progress 기준이 들어 있다.
2. **시연 데이터 수집**: 과제당 teleoperation 시연 데이터 100개를 평가 장소에서 같은 로봇과 환경으로 수집해 배치 조건과 맞춘다. teleoperation은 사람이 장치로 로봇을 직접 조종해 시연을 만드는 방식이다.
3. **fine-tuning**: 각 모델은 base pre-training 체크포인트(Open Track 체크포인트가 아님)에서 시작해 이 100개만으로 full fine-tuning한다. 공식 레시피를 수렴까지 따른다.
4. **평가**: 과제당 25 trial을 각 모델의 원래 추론 구현으로 실행한다. 과제 목표는 고정하고 물체 배치와 조명은 과제 명세 안에서 바꾼다.

embodiment별 teleoperation 수단은 다음과 같다.

| embodiment | teleoperation 수단 |
|---|---|
| Bimanual-YAM | GELLO |
| SO-101 | leader-follower 팔(joint space 제어) |
| Franka DROID | DROID Quest teleoperation 시스템 |
| Unitree G1 | Pico VR 헤드셋과 기성 whole-body control |

20개 과제는 넓은 manipulation 유형을 덮는다. 범위는 pick-and-place, 쌓기(그릇, 큐브, 컵), 넘어진 병 세우기, articulated object(서랍, 노트북 덮개, 전자레인지 문), 변형 물체(수건, 옷), 쓰레받기와 솔을 쓰는 청소, 양팔 협응, G1의 loco-manipulation까지다. articulated object는 서랍처럼 관절로 연결돼 열리고 닫히는 물체를 말한다.

| embodiment | 과제 (timeout) |
|---|---|
| SO-101 | stack_bowls (25초), remove_screwdriver (25초), upright_bottle (25초), stack_cubes (30초), cube_drawer (30초) |
| DROID Franka | close_laptop (20초), mug_on_coaster (20초), open_drawer (25초), marker_in_holder (30초), towel_in_basket (20초) |
| Bimanual-YAM | dustpan (30초), drawer (90초), microwave (90초), stack_cups (50초), clean_table (40초) |
| Unitree G1 | plate_into_rack, carry_box, fold_towel, load_clothes_washing_machine, hang_keys (모두 150초) |

progress 기준의 예로 SO-101 stack_bowls는 다음 4단계를 둔다.

1. 오른쪽 그릇을 잡아 들어 올린다.
2. 그릇을 왼쪽 그릇 위나 근처로 옮긴다.
3. 왼쪽 그릇 위에 놓았지만 불안정하거나 덜 놓였다.
4. 안정적으로 쌓고 놓았다.

평가 장소는 NUS 캠퍼스의 반개방 테라스, 식당, 라운지, 사무실, 팬트리, 그리고 가정의 주방, 거실, 침실, 세탁 공간 등이다.

### Fine-tune Track 지표

Fine-tune Track은 progress score(PS)와 success rate(SR) 두 지표를 함께 보고한다. rollout n에서 만족한 기준 수를 s_n이라 하면 normalized progress는 s_n / K다. 즉 기준마다 같은 가중치를 주며, 기준은 정해진 순서로 만족하지 않아도 된다.

| 지표 | 정의 | 의미 |
|---|---|---|
| PS | (1/N) Σ s_n / K | 과제 명세를 얼마나 만족했는지. K로 나눠 기준 수가 다른 과제끼리 비교 가능 |
| SR | (1/N) Σ 1[rollout n 성공] | 완전 성공 조건을 만족한 비율 |

로봇이나 물체를 손상할 위험이 있으면 평가자가 rollout을 중단할 수 있다. 이 경우 s_n = 0이고 실패로 센다.

### fine-tuning 설정

모든 모델은 공통 harness로 학습한다. 각 VLA는 고정 커밋의 공식 저장소를 수정 없이 쓰고, harness는 시연 데이터를 각 모델의 형식으로 바꾸는 변환과 외부 등록 설정, 실행 스크립트만 더한다. 공통 설정은 absolute joint position 상태와 action, bf16 연산과 fp32 master weight, 마지막 epoch 체크포인트 평가다. 학습률은 레시피 배치 크기 대비 유효 배치 크기에 비례해 선형으로 조정한다.

| 모델 | base 체크포인트 | 유효 배치 | 최대 학습률과 스케줄 | 비고 |
|---|---|---|---|---|
| GR00T N1.7 | nvidia/GR00T-N1.7-3B | 64 | 1×10⁻⁴, cosine, warmup 5% | VLM과 action head 전체 학습 |
| π0.5 | pi05_base | 64 | 2.5×10⁻⁵에서 2.5×10⁻⁶까지 cosine, warmup 1,000 step | EMA 0.99, Aloha 전용 action space 적응 끔 |
| MolmoAct2 | allenai/MolmoAct2 | 128 | LLM 2×10⁻⁵, ViT와 connector 1×10⁻⁵, action expert 1×10⁻⁴ | 전체 모델 학습 |
| G0.5 | OpenGalaxea/G05(base) | 32 | 4×10⁻⁵ (vision encoder 0.1배), cosine, warmup 200 step | weight decay 0.03 |
| LingBot-VLA v2 | robbyant/lingbot-vla-v2-6b | 64 | 1.25×10⁻⁵, constant | Muon optimizer |

GR00T N1.7은 시행착오가 기록돼 있다. 처음에는 action head만 유효 배치 512로 학습했는데, 5 epoch 동안 optimizer 업데이트 횟수가 너무 적어 상수 예측으로 수렴했다. 그래서 배치를 64로 줄이고 vision-language backbone까지 함께 학습했다. 단 SO-101은 기본 설정대로 backbone을 고정하고 projector와 action 모델만 학습했다.

### Open Track 절차

Open Track은 과제별 적응 없이 참여 사이트가 제안한 개방 환경 과제로 모델을 평가한다. 한 번의 비교는 다음 순서로 진행한다.

1. 평가자가 현장에 있는 물체와 환경으로 실행 가능한 과제를 정하고 자연어 지시문을 준다.
2. 시스템이 자격이 있는 두 모델 A, B를 배정한다. 평가 내내 모델 이름은 평가자에게 숨겨진다.
3. 두 모델이 같은 로봇과 과제 설정에서 차례로 실행된다.
4. 평가자가 선호(A 승, B 승, 무승부), task progress 점수, 자연어 피드백, 체감 난이도(1~10)를 기록한다.

홈페이지 FAQ는 이 공정성 장치를 서비스 관점에서 정리한다. 평가자는 trial A와 B만 보고 모델 이름은 보지 않는다. 한 비교의 두 모델은 같은 로봇, 장면, 지시문을 차례로 수행한다. 운영 국가는 Open Track이 싱가포르, 중국, 미국, 영국이고 Fine-tune Track이 싱가포르, 말레이시아, 중국이다.

### active matchmaking

active matchmaking은 Chatbot Arena의 active sampling 전략을 그대로 가져온다. 초기 비교로 예비 순위를 만든 뒤, 모델 쌍 a를 고를 확률을 다음에 비례하게 둔다.

P_t(a) ∝ sqrt(Σ̂_t,a,a / n_a) - sqrt(Σ̂_t,a,a / (n_a + 1))

여기서 n_a는 그 쌍의 기존 비교 횟수, Σ̂_t,a,a는 반복 t에서 추정한 분산이다. 이 값은 비교를 한 번 더 했을 때 표준오차가 줄어드는 양이다. 따라서 불확실하거나 비교가 적은 쌍에 평가가 몰리고 중복 비교는 줄어든다.

### DCR 순위 모델

Open Track 과제는 난이도 편차가 크다. 따라서 단순 승률이나 과제와 무관한 pairwise 순위는 모델이 어떤 과제를 우연히 많이 만났는지에 흔들린다. DCR은 이 문제를 과제 난이도를 직접 추정해 해결한다.

DCR의 구성은 다음 다섯 단계다.

| 단계 | 수식 | 설명 |
|---|---|---|
| 성공 확률 | q_p,t = σ(θ_p - β_t) | policy p의 잠재 능력 θ_p와 과제 t의 잠재 난이도 β_t. Rasch 1PL 모형 |
| 난이도 사전 | β_t \| d_t = k ~ N(μ_k, τ²) | 사람 난이도 d_t가 k인 과제의 전형 난이도 μ_k를 중심으로 둔다 |
| 순서 제약 | μ_1 < μ_2 < ... < μ_10 | 사람 난이도 등급의 순서를 보존한다 |
| 순위 | s_p = E[θ_p \| D] | 수집 데이터 D에서의 사후 평균 능력으로 순위를 매긴다 |
| 공개 척도 | R_p = 1500 + (400 / ln 10) s_p | Elo 척도로 선형 변환한 DCR Rating |

DCR의 설계에는 세 가지 특징이 있다.

- **사람 난이도는 사전 정보로만 쓴다.** 대부분의 개방 과제는 물리 평가가 몇 번밖에 없으므로 사람 난이도를 고정 가중치로 쓰지 않는다. 사전 분포로 두기 때문에 실제 결과가 개별 과제 난이도를 범주 평균에서 움직일 수 있다.
- **두 policy의 개별 결과를 보존한다.** pairwise 비교에서는 둘 다 성공한 경우와 둘 다 실패한 경우가 모두 무승부로 보인다. DCR은 둘을 구분해 전자는 쉬운 과제, 후자는 어려운 과제의 증거로 쓴다.
- **Elo 척도는 표시용이다.** 변환이 선형이므로 순서, 불확실성, 난이도 보정은 그대로다. 순차 Elo 업데이트로 얻은 값이 아니므로 일반 Elo rating으로 해석하지 않는다.

순위 강건성 분석에는 baseline으로 Bradley-Terry-Davidson(BTD), 순차 Elo, 평균 pairwise 점수를 쓴다. BTD는 승, 패, 무승부를 집계하되 과제 난이도를 명시적으로 모델링하지 않는다.

### frontier 에이전트 인터페이스

frontier 모델 3종은 fine-tuning, 과제별 프롬프트, 시연 데이터 없이 출시 상태 그대로 평가한다. Inspect Robots 에이전트 policy가 RoboColosseum policy 서버 안에서 이들을 구동하므로 과제 배정, 로봇 제어, timeout, 채점이 VLA와 같다. 참여 embodiment는 SO-101, DROID, Bimanual-YAM이다.

| 항목 | 설정 |
|---|---|
| API | Claude Opus 5.5(Anthropic Messages), GPT-6 Astra(OpenAI Responses), Grok 4.7(xAI Chat Completions). 접근 기간 2026년 9~11월 |
| 입력 | 모든 카메라의 640×480 이미지(SO-101과 DROID 2시점, YAM 3시점), 라벨이 붙은 proprioception 벡터, 지시문 |
| 대화 이력 | 최근 두 observation의 이미지만 남기고 이전 observation은 텍스트로만 유지 |
| 출력 | 턴당 tool call 하나. 절대 joint-position 목표를 주는 move, done, give_up |
| 기록 | move마다 관찰 내용과 선택 이유를 1~2문장 note로 남겨 transcript에 저장 |
| 예산 | reasoning effort medium, trial당 모델 호출 최대 30회, 제어 단계 최대 800, 호출당 120초 deadline |
| 안전 | 서버가 보정된 joint 한계와 단계별 변화 한계로 검증하고 최대 chunk 길이로 자름. VLA와 같은 clipping 적용 |

proprioception은 로봇이 관절 각도처럼 자기 몸 상태를 스스로 감지하는 정보다. 에이전트가 스스로 done을 호출해도 성공으로 세지 않으며 성공 판정은 평가자가 한다. API 왕복 때문에 에이전트는 VLA보다 훨씬 느리게 행동하지만 한 비교 안의 trial 단계 한계는 같다.

시스템 프롬프트는 세 에이전트가 공유한다. 작고 신중한 동작으로 목표에 접근하고, 동작 후 매번 observation을 다시 확인하며, 작은 물체를 잡을 때는 그리퍼 기울기를 명시적으로 지정하라고 지시한다. 또한 done이나 give_up 때 "처음부터 알았으면 좋았을 것"을 묻는다고 미리 알린다.

### 과제 범주 분류

범주별 분석을 위해 Open Track 지시문을 6개 범주로 자동 분류한다. 분류기는 Qwen3-30B-A3B-Instruct-2507을 vLLM으로 로컬 서빙하며 temperature 0, 최대 출력 64 토큰으로 결정적으로 디코딩한다. 출력은 범주, 검토 필요 여부, 한 문장 근거를 담은 JSON이다.

| 범주 | 정의 |
|---|---|
| Pick / Place | 더 구체적인 목표 없이 물체를 다른 위치로 옮김 |
| Stack / Arrange | 여러 물체의 상대 배치를 바꿈(쌓기, 분류, 줄 세우기) |
| Open / Close | 서랍, 노트북, 전자레인지 같은 articulated object의 열림 상태를 바꿈 |
| Reorient | 회전, 뒤집기, 세우기처럼 물체 방향을 바꿈 |
| Deformable | 수건, 옷, 가방 같은 변형 물체 조작이 핵심인 과제 |
| Tool / Interaction | 버튼 누르기, 밀기, 당기기 또는 물체를 도구로 사용 |

Pick / Place가 더 구체적인 조작의 중간 단계일 뿐이면 구체 범주를 고른다.

## 결과

연구 질문은 다섯 가지다. 개방 환경 능력(RQ1), 과제 적응(RQ2), 순위 일관성(RQ3), 순위 신뢰성과 효율(RQ4), 평가 규모의 효과(RQ5)다. Open Track은 5,699회 비교 가운데 DROID/Franka 3,065회, Bimanual-YAM 2,134회, SO-101 496회로 구성된다.

### 개방 환경 능력

frontier 에이전트는 특화 VLA policy와 경쟁할 만한 manipulation 성능을 보였다. 다만 어떤 에이전트가 앞서는지는 embodiment마다 다르다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig03.png]]
*Figure 3: embodiment별 Open Track DCR rating(Elo 척도)과 95% 신용구간 (Nguyen 2026, p.9)*

| 시스템 | DROID/Franka | Bimanual-YAM | SO-101 |
|---|---|---|---|
| MolmoAct2 | **1832** | 1670 | 1186 |
| G0.5 | 1724 | **1682** | 1313 |
| LingBot-VLA v2 | 1227 | 1628 | 1664 |
| π0.5 | 1223 | 1397 | **1903** |
| GR00T N1.7 | 1320 | 799 | 1312 |
| GPT-6 Astra | **2049** | 1712 | 1372 |
| Claude Opus 5.5 | 1579 | **2133** | **2132** |
| Grok 4.7 | 1047 | 979 | 1118 |

(굵은 글씨는 VLA와 에이전트 각 그룹의 최고값. 1500이 평균 시스템)

GPT-6 Astra는 DROID/Franka에서, Claude Opus 5.5는 SO-101과 Bimanual-YAM에서 가장 높은 DCR 점추정을 얻었다. VLA 중 최고는 embodiment마다 다르다. DROID에서는 MolmoAct2, YAM에서는 G0.5, SO-101에서는 π0.5다.

normalized task progress로 보아도 에이전트의 경쟁력이 확인된다. 에이전트와 VLA가 같은 과제를 수행한 901회 비교에서 에이전트가 더 많이 진행한 경우가 394회, VLA가 265회, 동률이 242회였다. 평균 차이는 에이전트 쪽으로 +5.3%p다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig04.png]]
*Figure 4: frontier 모델과 VLA policy의 task progress 비교. 901회 대응 평가의 우세 비율과 평균 진행도 차이 (Nguyen 2026, p.10)*

| 에이전트 | 비교 수 | 에이전트 우세 | 동률 | VLA 우세 | 평균 차이 |
|---|---|---|---|---|---|
| Claude Opus 5.5 | 294 | 148 | 69 | 77 | +12.1%p |
| GPT-6 Astra | 310 | 167 | 69 | 74 | +11.0%p |
| Grok 4.7 | 297 | 79 | 104 | 114 | -7.5%p |
| 전체 | 901 | 394 | 242 | 265 | +5.3%p |

그러나 상대 우위가 안정적인 과제 완료로 이어지지는 않는다. 범주별 progress 기반 BTD 분석에서 MolmoAct2는 6개 범주 모두에서 VLA 중 가장 높은 expected comparison score(58~77%)를 얻었다. expected comparison score는 평균 능력 시스템을 상대로 이길 확률에 비길 확률의 절반을 더한 값이다. 그런데도 MolmoAct2의 실제 성공률은 6~13%였고, 어떤 시스템도 어떤 범주에서 13%를 넘지 못했다.

난이도가 오르면 성공률과 진행도가 함께 떨어진다. 실패한 실행에서도 진행도가 줄어든다는 점이 중요하다. 즉 어려운 과제에서는 마지막 성공 조건 훨씬 이전에 실패가 일어난다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig06.png]]
*Figure 6: 사람이 매긴 과제 난이도 구간별 성공률과 실패 실행의 평균 normalized progress (Nguyen 2026, p.12)*

| 사람 난이도 | 실행 수 | 성공률 | 실패 실행의 평균 progress |
|---|---|---|---|
| 1~4 | 374 | 30.7% | 56.6% |
| 5~6 | 5,376 | 7.6% | 31.6% |
| 7~8 | 4,248 | 1.2% | 16.7% |
| 9~10 | 1,394 | 0.4% | 3.5% |

저자들은 이 추세가 관찰 결과이고 과제와 embodiment 구성 차이를 일부 반영할 수 있다고 단서를 단다. 실행 수 합계 11,392는 비교 1회가 두 실행을 낳는 구조와 맞는다.

### 과제 적응

같은 시연 데이터 100개로 적응해도 성능은 과제마다, 같은 embodiment 안에서도 크게 갈린다. 아래는 Table 2의 embodiment 평균이다(과제 5개 동일 가중, 단위 %).

| embodiment | GR00T N1.7 PS / SR | π0.5 PS / SR | MolmoAct2 PS / SR | G0.5 PS / SR | LingBot-VLA v2 PS / SR |
|---|---|---|---|---|---|
| SO-101 | **89.0 / 82.4** | 85.4 / 77.6 | 71.8 / 59.2 | 58.8 / 40.0 | 55.2 / 36.8 |
| DROID Franka | 56.4 / 42.4 | **91.2 / 84.0** | 78.2 / 54.4 | 44.8 / 16.0 | 59.4 / 40.8 |
| Bimanual-YAM | 52.6 / 20.0 | **97.2 / 93.6** | 72.1 / 49.6 | 89.1 / 75.2 | 48.3 / 30.4 |
| G1 Humanoid | 22.7 / 0.0 | 16.3 / 0.0 | 19.8 / 0.0 | 13.3 / 0.0 | **23.2** / 0.0 |

fine-tuning 결과는 "넓게 적응하는 policy"와 "특정 과제에만 적응하는 policy"를 구분한다.

| 관찰 | 근거 (과제별 SR) |
|---|---|
| 과제별로 정반대 패턴 | DROID에서 LingBot-VLA v2는 open_drawer 100%, marker_in_holder 0%. MolmoAct2는 반대로 0%와 88% |
| 고르게 높은 적응 | π0.5는 YAM 과제 4개에서 96~100%, stack_cups 72% |
| 일부 과제에만 강함 | G0.5는 YAM drawer와 microwave 100%, stack_cups 20% |
| 안전 정지 | LingBot-VLA v2는 YAM drawer에서 1 trial, GR00T N1.7은 YAM microwave에서 9 trial 후 중단. 나머지 trial은 0점 |

G1 humanoid에서는 어떤 policy도 어떤 과제를 완료하지 못했다. 그러나 평균 progress는 13.3%에서 23.2%까지 달랐다. 블로그는 이 결과를 "이진 성공만으로는 전모가 보이지 않는다"는 결론의 대표 사례로 든다.

progress reachability는 기준의 일정 비율 이상을 만족한 trial 비율을 임계값별로 그린 곡선이다. 이 곡선은 실패의 깊이를 policy별로 보여준다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig07.png]]
*Figure 7: Fine-tune Track embodiment별 progress reachability 곡선 (Nguyen 2026, p.12)*

- DROID에서 G0.5는 거의 모든 trial이 기준 4분의 1을 넘지만, 4분의 3에 도달한 비율은 약 20%이고 완전 성공은 16%다. π0.5는 모든 임계값에서 높고 완전 성공 84%다.
- YAM에서 MolmoAct2는 4분의 1은 거의 다 넘지만 약 절반만 완료한다. π0.5는 93.6% 성공이다.
- G1에서는 4분의 1 기준조차 만족한 trial이 40% 미만이다.

실패 단계 분석은 같은 데이터로 학습해도 policy마다 막히는 지점이 다르다는 것을 보여준다. 아래 그림은 실패한 trial을 처음 충족하지 못한 기준별로 나눈다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig08.png]]
*Figure 8: fine-tuning 후 policy별 실패 단계. SO-101 cube_drawer와 DROID close_laptop (Nguyen 2026, p.14)*

| 과제 | 관찰 |
|---|---|
| SO-101 cube_drawer | 첫 기준(큐브 집어 들기)을 놓친 trial이 policy별 12~48%. 공통 어려움이지만 빈도가 다르다 |
| DROID close_laptop, G0.5 | 25회 모두 첫 접촉과 내리기는 하지만 24회가 절반 닫기에 실패 |
| DROID close_laptop, MolmoAct2 | 24회 거의 닫지만 완료는 7회 |
| DROID close_laptop, π0.5 | 25회 모두 거의 닫고 완료는 17회 |

### 순위 일관성

개방 환경에서 강한 policy가 fine-tuning 후에도 강하지는 않다. 아래 그림은 VLA 5종의 Open Track 순위(DCR)와 Fine-tune Track 순위(평균 PS)를 embodiment별로 맞대어 본다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig09.png]]
*Figure 9: embodiment별 Open Track 순위와 Fine-tune Track 순위의 교차 비교 (Nguyen 2026, p.15)*

| embodiment | Spearman ρ | 순서가 유지된 쌍 (10쌍 중) |
|---|---|---|
| SO-101 | -0.20 | 4 |
| DROID/Franka | -0.40 | 3 |
| Bimanual-YAM | 0.20 | 6 |

π0.5는 DROID에서 Open Track 5위였다가 fine-tuning 후 1위가 되고, YAM에서도 4위에서 1위로 오른다. 반대로 G0.5는 DROID Open Track 2위에서 fine-tuning 후 5위로 내려간다.

embodiment 사이의 일치도도 낮다. Fine-tune Track의 네 embodiment별 순위는 Kendall 일치 계수 W = 0.24로 약하게만 일치한다. π0.5는 DROID와 YAM에서 1위지만 G1에서는 4위이고, GR00T N1.7은 SO-101 1위지만 DROID와 YAM에서는 4위다. embodiment마다 과제와 환경이 다르므로 이 차이를 로봇 형태 하나에만 귀속할 수는 없다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig10.png]]
*Figure 10: (a) embodiment 간 Fine-tune 순위 일치도(Kendall W 0.24), (b) 평가 사이트 부분집합 간 DCR 순위 일치도 (Nguyen 2026, p.16)*

저자들은 비교 대상이 policy 5개뿐이라는 점을 단서로 단다. 또 트랙 간 과제 분포, 시작 체크포인트, 순위 지표가 다르다. 따라서 불일치 전체를 일반화와 적응 능력의 차이로 설명할 수는 없다. 그래도 관찰된 순위 역전은 개방 환경의 상대 강점이 과제별 적응 후 성능으로 이어지지 않을 수 있음을 보여준다.

### 순위 신뢰성과 효율

분산 pairwise 평가는 서로 독립인 사이트 부분집합에서도 대체로 같은 순위를 낸다. 검증 방법은 사이트를 무작위로 겹치지 않는 두 그룹으로 나누고 각각 DCR을 적합해 모델 쌍 순서의 일치 비율을 재는 것이다. 같은 사이트의 평가는 같은 그룹에 넣는다.

| embodiment | 쌍 순서 일치도 | 평균 Spearman ρ |
|---|---|---|
| DROID/Franka | 약 85% | 0.82 |
| Bimanual-YAM | 약 85% | 0.82 |
| SO-101 | 59% | 0.30 |

SO-101은 비교 수가 496회로 가장 적고 순위가 어떤 사이트를 포함하느냐에 크게 흔들린다. 즉 증거가 충분하면 순위가 재현되지만 신뢰성은 embodiment마다 다르다.

active matchmaking은 같은 DCR 추정기를 쓰면서 필요한 물리 평가 수를 크게 줄인다. 200회 독립 실행 평균으로 보면 active matchmaking은 400~500회 평가로 전체 데이터 순위와 약 90% 일치에 도달한다. 균등 샘플링은 같은 일치도에 약 1,000회가 필요하다. 이점은 예산이 작을 때 가장 크고, 두 방식이 전체 데이터 순위에 다가갈수록 줄어든다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/fig11.png]]
*Figure 11: (a) active matchmaking과 균등 샘플링의 순위 일치도 수렴 비교, (b) 평가 규모에 따른 Open Track 순위 안정성 (Nguyen 2026, p.17)*

### 평가 규모의 효과

평가가 늘수록 leaderboard는 꾸준히 안정되지만, 높은 신뢰도의 안정성에는 훨씬 많은 데이터가 필요하다. 평가 수마다 8개 시스템을 모두 포함하는 무작위 부분집합 200개를 뽑아 DCR을 적합하고 전체 5,699회 순위와 비교했다.

| 평균 순위 일치도 | 필요한 평가 수 |
|---|---|
| 90% | 약 1,123회 |
| 95% | 약 4,755회 |

다만 2.5~97.5 백분위 범위는 평균 추세보다 훨씬 넓다. 같은 크기의 부분집합이라도 순위가 눈에 띄게 다를 수 있다는 뜻이다. 평균 순서는 일찍 드러나지만, 어떤 평가가 포함되든 흔들리지 않는 순위에는 훨씬 큰 예산이 든다.

### 공개 leaderboard

블로그는 게재 시점의 트랙별 leaderboard를 그림으로 보여준다. 이 값은 embodiment를 합친 집계라서 논문 Figure 3의 embodiment별 값과 다르다. 집계 방식은 블로그에 설명이 없다.

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog09.png]]
*블로그 Figure 3: Fine-tune Track 리더보드, 모델별 평균 trial 점수(0~1) (RoboColosseum 블로그)*

![[assets/nguyen-2026-robocolosseum-evaluating-physical-intelligence-at/blog10.png]]
*블로그 Figure 4: Open Track 리더보드, 모델별 DCR rating(Elo 척도) (RoboColosseum 블로그)*

| 순위 | Fine-tune Track 평균 trial 점수 | Open Track DCR rating |
|---|---|---|
| 1 | π0.5 0.725 | GPT-6 Astra 1,778 |
| 2 | MolmoAct2 0.605 | Claude Opus 5.5 1,769 |
| 3 | GR00T N1.7 0.552 | MolmoAct2 1,767 |
| 4 | G0.5 0.515 | G0.5 1,677 |
| 5 | LingBot-VLA v2 0.465 | LingBot-VLA v2 1,392 |
| 6 | | π0.5 1,333 |
| 7 | | GR00T N1.7 1,320 |
| 8 | | Grok 4.7 964 |

두 leaderboard를 나란히 보면 순위 역전이 다시 확인된다. π0.5는 Fine-tune 1위지만 Open 6위이고, MolmoAct2는 두 트랙 모두 상위권이다.

세 자료의 규모 표기는 단위가 서로 다르다.

| 자료 | 표기 | 해석 |
|---|---|---|
| 논문 | Open Track 5,699회 pairwise 비교, 124개 사이트 | 비교 단위 |
| 블로그 | Open Track 11,398회 평가, 전체 실세계 trial 15,000회 | 11,398은 5,699의 정확히 2배로 실행 단위로 볼 수 있다. 15,000의 집계 기준은 명시되지 않았다 |
| 홈페이지 | 140개 이상 장면, 수백 대 로봇 | 게재 시점 운영 규모로, 논문 평가 구간 이후 늘어난 값일 수 있다 |

## 참여 방식

홈페이지는 외부 팀이 자기 policy를 평가받는 절차를 4단계로 안내한다. 이 운영 정보는 논문에 없다.

| 단계 | 내용 |
|---|---|
| Apply | policy와 결과를 원하는 로봇을 적어 신청한다. 무료 10,000시간은 RoboColosseum 팀이 신청서를 검토해 배분한다 |
| Connect | policy API로 자체 추론 서버를 연결해 로봇이 실행 중 observation을 스트리밍하게 하거나, 체크포인트를 넘겨 로봇 옆 머신에서 서빙한다 |
| Evaluate | 운영자가 장면을 준비하고 Open Track 비교와 Fine-tune Track trial을 실행하며 모든 카메라를 녹화한다 |
| Track | 로봇별 leaderboard에서 순위를 확인한다. 실패를 포함한 모든 실행이 Hugging Face에 공개된다 |

평가 뷰어(robocolosseum.ai/evals)는 블라인드 비교의 두 실행을 동기화해 재생하고 평가자의 선택과 메모를 함께 보여준다. 블로그는 평가 시간을 원하는 연구자, 평가 노드를 운영하려는 연구실, 과제 벤치마크를 기여하려는 조직의 참여를 받는다고 밝힌다.

생태계 안의 역할 분담은 다음과 같다.

| 기관 | 역할 |
|---|---|
| NUS MAGIC Lab (Jiafei Duan) | robot learning, 정밀 manipulation, foundation model 설계 연구 리더십 |
| BitRobot Foundation | 프로토콜 설계, 노드 네트워크 운영, 지속 벤치마킹 인프라 |
| Hugging Face | 모델 호스팅, 벤치마크 투명성, 데이터셋 공개 |
| Singapore Embodied AI Centre, National Robotics Programme | 자금, 싱가포르 내 평가 환경 접근, 산업 과제 개발 |
| FrodoBots | 동남아시아 가정과 도시 공간의 데이터 수집 협력 |

## 한계

논문이 밝힌 한계는 다음과 같다.

- **초기 스냅샷**: 모든 로봇 foundation model과 배치 환경을 망라하지 않는다. 체크포인트와 하드웨어 호환성 때문에 모델별, embodiment별 범위가 다르다. 예를 들어 frontier 에이전트는 G1에 참여하지 않았다.
- **과제 수**: Fine-tune Track은 embodiment당 5개 과제만 평가한다.
- **학습 절차 미통제**: 모델별 공식 레시피를 허용한다. 따라서 동일 optimizer와 스케줄에서의 아키텍처 차이가 아니라, 같은 데이터에서 출발한 실용적 end-to-end 적응을 잰다.
- **상대적 재현성**: 순위 안정성 분석은 수집된 전체 데이터의 순위를 기준으로 한 재현성이다. 데이터가 늘면 같은 분석을 반복해야 한다.
- **원인 귀속 제한**: 순위 불일치 분석은 policy 5개에 기반하고 트랙 간 조건이 다르다.

세 자료를 대조하면 두 가지 한계가 더 보인다.

- 블로그 leaderboard는 집계 방식이 설명되지 않아 논문 수치와 직접 비교하기 어렵다.
- 규모 표기의 단위가 자료마다 다르므로 인용할 때 어느 단위인지 밝혀야 한다.

## 후속 방향

RoboColosseum은 장기 과학 사업으로 설계됐고 창립 멤버들은 다음을 약속했다.

- Fine-tune Track용 과제 데이터셋 확장
- Open Track용 실제 생활 환경 확대
- embodiment 추가(홈페이지 기준 Earth Rover Mini+ 바퀴형 로봇 추가 예정)
- 학계 파트너에게 무료 평가 10,000시간 제공

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Open Track | 과제별 적응 없이 익명의 두 모델을 같은 장면과 지시문에서 차례로 실행해 비교하는 트랙 |
| Fine-tune Track | 같은 시연 데이터 100개로 fine-tuning한 뒤 고정 과제에서 25 trial씩 평가하는 트랙 |
| DCR (Difficulty-Calibrated Rasch) | policy 능력과 과제 난이도를 Rasch 모형으로 함께 추정하고 사람 난이도를 사전 정보로 쓰는 순위 모델 |
| active matchmaking | 순위 불확실성을 가장 많이 줄일 모델 쌍에 평가를 우선 배정하는 방식 |
| PS / SR | 과제별 progress 기준의 평균 만족 비율 / 완전 성공 비율 |
| progress reachability | 기준의 일정 비율 이상을 만족한 trial 비율을 임계값별로 그린 곡선 |

## 관련 페이지

- [[physical-ai/fang-2026-molmoact2-action-reasoning-models-for]]: 평가 대상 VLA이자 SO-101과 Bimanual-YAM Open Track 체크포인트의 학습 데이터 출처. Open Track 범주별 분석에서 VLA 중 최고였다
- [[physical-ai/wu-2026-a-pragmatic-vla-foundation-model]]: 평가 대상 VLA인 LingBot-VLA 계열의 논문. RoboColosseum이 평가한 것은 v2 체크포인트(robbyant/lingbot-vla-v2-6b)다
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]]: Fine-tune Track에서 DROID와 YAM 1위, Open Track에서는 하위권이었던 π0.5
- [[physical-ai/nvidia-gr00t-n1-7-3b]]: Fine-tune Track base 체크포인트로 쓴 GR00T-N1.7-3B의 모델 카드
- [[physical-ai/huggingface-lerobot]]: RoboColosseum이 평가 데이터를 공개하는 LeRobot 형식
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]: 논문이 generalist policy 계보로 언급하는 OpenVLA
- [[physical-ai/wang-2026-chain-of-interaction-benchmark-coin]]: 같은 시기의 manipulation 벤치마크로, 고정 과제에서 interactive reasoning을 잰다
