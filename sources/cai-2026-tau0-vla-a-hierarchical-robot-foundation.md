---
title: "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation.pdf
raw_filename: "cai-2026-tau0-vla-a-hierarchical-robot-foundation.pdf"
source_collection: external
authors: "Xiaowei Cai 외 37인 (저자는 알파벳순 표기, 제1저자 Jinyu Zhang과 Yi Liu, 교신저자 Jianlan Luo; Shanghai Innovation Institute, Agibot Finch, The Chinese University of Hong Kong)"
arxiv_id: "2608.16885"
url: "https://tau0-vla.github.io/"
tags: [physical-ai, vla, world-model, manipulation, robot-learning]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/fig01.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/fig01.png
    caption: "τ0-VLA 전체 개요. 왼쪽은 teleoperation, autonomous, UMI 세 종류의 pre-training 데이터, 가운데는 subtask를 제안하고 world model로 결과를 상상한 뒤 value model로 점수를 매기는 high-level policy, 오른쪽은 long-horizon mobile manipulation과 cross-embodiment 일반화 능력이다"
    page: 1
    bbox_norm: [0.0786, 0.2933, 0.9214, 0.6113]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/fig02.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/fig02.png
    caption: "계층 구조 상세도. (a) Qwen3.5-9B 기반 high-level policy가 execution memory를 갱신하며 후보 subtask를 낸다. (b) Qwen3.5-2B backbone과 MoT action expert로 이뤄진 low-level policy가 action chunk를 만든다. (c) world model이 상상한 이미지를 value model이 채점해 상위 B개 분기만 남기는 beam search 경로다"
    page: 5
    bbox_norm: [0.0786, 0.0606, 0.9214, 0.3376]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/fig03.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/fig03.png
    caption: "실제 로봇 평가 과제 여섯 가지. (a) Clean Room, (b) Prepare Ingredients, (c) Tomato and Egg Stir Fry, (d) Make Milk Tea가 long-horizon 평가에 쓰이고 (e) Collect Laundry, (f) Tidy Makeup Table이 embodiment 간 직접 실행 평가에 쓰인다"
    page: 8
    bbox_norm: [0.0702, 0.0606, 0.9298, 0.5005]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/fig04.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/fig04.png
    caption: "네 평가 환경에서의 다음 subtask 예측 정확도. Plan Once, Best-of-N, TTC를 비교했고 TTC가 모든 환경에서 가장 높다. 분포 이동이 있는 Book Organization(OOD)에서 격차가 가장 크다"
    page: 10
    bbox_norm: [0.5, 0.4524, 0.9298, 0.6468]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/fig05.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/fig05.png
    caption: "추론 연산량과 subtask 예측 정확도의 관계. Make Milk Tea와 Book Organization 모두 낮은 연산 구간에서 정확도가 빠르게 오르다가 3 PFLOPs 부근에서 완만해진다"
    page: 11
    bbox_norm: [0.1542, 0.0606, 0.8458, 0.294]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table I
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab01.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab01.png
    caption: "long-horizon 네 과제의 성능표. 과제마다 10회 시행이며 GR00T N1.7, LingBot-VLA, π0.5, τ0-VLA 직접 실행, τ0-VLA 계층 구조를 비교한다"
    page: 10
    bbox_norm: [0.0786, 0.129, 0.9214, 0.2552]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table II
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab02.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab02.png
    caption: "embodiment별 직접 실행 성능표. Collect Laundry와 Tidy Makeup Table 세 그룹을 high-level policy 없이 평가한 결과다"
    page: 10
    bbox_norm: [0.1779, 0.3286, 0.9243, 0.6229]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table III
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab03.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab03.png
    caption: "test-time computation을 켠 closed-loop 실제 로봇 성능표. Make Milk Tea, Book Organization, Clean Room에서 Plan Once와 TTC를 비교한다"
    page: 10
    bbox_norm: [0.0702, 0.7629, 0.5, 0.85]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table IV
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab04.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab04.png
    caption: "40차원 통합 상태와 action 슬롯 배치표. end-effector 위치와 자세, 그리퍼, 허리, 베이스 속도, 양팔 관절이 차원별로 정해진 자리를 차지한다"
    page: 14
    bbox_norm: [0.5305, 0.5438, 0.8992, 0.7076]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table V
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab05.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab05.png
    caption: "과제별 실제 로봇 시행의 최대 허용 시간표. Clean Room 계열이 20분, Make Milk Tea가 10분, 나머지가 5분이다"
    page: 15
    bbox_norm: [0.532, 0.0838, 0.8977, 0.2231]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table VI
    kind: table
    file: assets/cai-2026-tau0-vla-a-hierarchical-robot-foundation/tab06.png
    raw: raw/papers/cai-2026-tau0-vla-a-hierarchical-robot-foundation-figures/tab06.png
    caption: "high-level 학습 인스턴스 다섯 계열표. 입력 memory만 perturbation으로 변형하고 정답은 시연에서 읽어, 지연과 과잉 진행과 실패 인지 실패를 각각 겨냥한다"
    page: 17
    bbox_norm: [0.0823, 0.1139, 0.9177, 0.2181]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

τ0-VLA는 hierarchical VLA의 상위 단계에서 다음 subtask를 고르는 일을 연산량을 늘릴 수 있는 추론 문제로 바꾼 robot foundation model로, 후보 subtask를 제안하고 world model로 그 결과 이미지를 예측한 뒤 value model로 채점하는 beam search를 확신이 낮을 때만 켜서 다음 subtask 예측 정확도와 long-horizon 성공률을 함께 올렸다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation |
| 저자 | 38인 공동 저자, 알파벳순 표기. 제1저자 Jinyu Zhang과 Yi Liu, 교신저자 Jianlan Luo |
| 소속 | Shanghai Innovation Institute, Agibot Finch, The Chinese University of Hong Kong |
| arXiv | 2608.16885 |
| 프로젝트 페이지 | https://tau0-vla.github.io/ |
| 공개 자료 | GitHub sii-research/tau-0-vla, Hugging Face sii-research/tau-0-vla |
| 분량 | 본문 12페이지, 부록 포함 18페이지. Figure 5개, Table 6개 |
| 발행 | 2026년 7월 27일 프로젝트 페이지 공개, PDF 생성일 2026년 8월 10일 |

## 2. 주요 기여 (Key Contributions)

논문이 내세우는 기여는 네 가지다.

1. **subtask 생성을 연산 확장 가능한 추론 문제로 정식화했다.** 기존 hierarchical VLA는 상위 단계 결정을 한 번의 forward pass로 끝내 어려운 결정에 연산을 더 쓸 방법이 없었다. τ0-VLA는 propose, predict, evaluate 세 단계를 반복하는 절차로 이를 대체한다.
2. **world model 예측을 결정 이전으로 옮겼다.** 선행 연구에서 world model은 이미 정해진 subtask의 subgoal image를 만드는 데 쓰였다. τ0-VLA에서는 아직 고르지 않은 여러 후보의 결과를 각각 예측해 비교 대상으로 삼는다. 저자들의 표현으로는 시각 예측이 "어떻게 실행할지"가 아니라 "무엇을 실행할지"를 결정한다.
3. **스스로 고칠 수 있는 execution memory를 학습했다.** 기존 시연에서 만든 memory를 일부러 어긋나게 변형한 뒤 원래 정답을 복원하도록 학습시켜, 배포 시점에 memory가 실제 상태보다 뒤처지거나 앞서갔을 때 되돌리거나 재시도하게 만든다. 별도 교정 데이터셋을 수집하지 않는다.
4. **40,115시간의 이종 실제 로봇 데이터로 학습한 통합 low-level policy를 붙였다.** 40차원 통합 상태와 action 공간을 써서 고정형, 양팔, 이동형 세 embodiment를 embodiment별 출력 헤드 없이 하나의 모델로 다룬다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 설정

지시문(instruction) ℓ이 주어지면 VLA policy는 다중 시점 observation o_t, proprioceptive 상태 s_t, 언어 명령 c_t를 받아 H step 분량의 action chunk a_t:t+H-1을 낸다. 여기에 embodiment와 제어 모드와 whole-body control 사용 여부를 담은 텍스트 제어 메타데이터 η가 함께 들어간다.

직접 실행 모드에서는 c_t = ℓ이므로 policy가 에피소드 내내 전체 지시문만 보고 지금이 어느 단계인지를 스스로 추론해야 한다. hierarchical 모드에서는 high-level policy μ가 먼저 subtask z*_t를 만들고 c_t = z*_t가 된다.

high-level policy의 결정 컨텍스트는 h_t = (ℓ, M_{t-1}, z*_{t-1}, o_t)이다. M_{t-1}은 이월된 execution memory, z*_{t-1}은 직전 단계에서 생성한 subtask다. μ는 memory를 현재 observation에 맞게 갱신하면서 subtask를 함께 낸다.

### 3.2 High-level policy의 네 모델

high-level policy는 역할이 다른 네 개 모델로 구성된다.

| 모델 | 기호 | 입력 | 출력 |
|---|---|---|---|
| proposal model | P | 결정 컨텍스트 h_t | 갱신된 memory M_t와 직접 제안 z^dir_t |
| world model | W | head 카메라 이미지와 후보 subtask | 그 subtask가 끝났을 때의 head 카메라 이미지 예측값 |
| value model | V | 전체 지시문, 후보 subtask, 예측 이미지 | 후보 품질 점수 v |
| reflective model | F | observation 정합 컨텍스트와 남은 분기 요약 | 최종 subtask z*_t |

proposal model, value model, reflective model은 같은 로봇 pre-training VLM 체크포인트에서 각각 따로 fine-tuning했고 그 체크포인트는 Qwen3.5-9B에서 출발한다. world model만 Step1X-Edit에서 초기화해 따로 학습한다.

### 3.3 adaptive routing

TTC를 항상 켜면 비용이 커지므로 어려운 결정에만 켠다. 판단 근거는 proposal model이 이미 만든 토큰 확률이라 추가 모델 호출이 필요 없다.

- 위치 i의 생성 토큰 확률 p_i, 최대 logit과 두 번째 logit의 차 m_i = λ(1)_i - λ(2)_i를 쓴다.
- 전체 생성 토큰의 평균 확률 u^all_t와 memory 필드 안 토큰의 평균 logit margin u^mem_t 두 통계를 만든다.
- g_t = 1[u^all_t ≤ δ_all 또는 u^mem_t ≤ δ_mem]으로 이진 결정한다.
- 통계와 규칙은 과제 공통이고 임계값 δ만 과제별로 held-out 데이터에서 보정한다.

g_t = 0이면 z^dir_t를 그대로 low-level policy에 보내는 빠른 경로, g_t = 1이면 TTC 경로다.

### 3.4 world model 유도 beam search

TTC 경로는 분기 계수 N, beam 폭 B, 깊이 D로 정의된 beam search다.

1. 루트 분기 b_root의 컨텍스트는 h_t, 경로는 빈 시퀀스, 누적 점수는 0에서 시작한다.
2. 깊이 d마다 남아 있는 분기 b 각각에 대해 proposal model을 N번 독립 호출해 후보 subtask를 뽑는다. 루트 분기는 실제 다중 시점 observation을 보고, 나머지 분기는 그 분기가 상상한 head 카메라 이미지를 본다.
3. 후보마다 world model이 종료 이미지를 예측하고 value model이 점수를 매긴다. 자식 분기의 누적 점수는 부모 점수에 이번 점수를 더한 값이다.
4. 자식 전체를 누적 점수로 전역 정렬해 상위 B개만 남긴다. 첫 확장은 N개, 이후 확장은 최대 BN개의 자식을 만든다.
5. 깊이 D까지 반복한 뒤 남은 분기의 상상 경로, 종료 예측 이미지, 점수를 묶어 C_t로 요약한다.

search 안에서 만들어진 memory는 모두 분기에 국한되며 영구 execution memory M_t를 덮어쓰지 않는다. search 내부 proposal 호출의 routing 결정도 무시한다.

마지막으로 reflective model이 observation 정합 컨텍스트 h̄_t = (ℓ, M_t, z*_{t-1}, o_t)와 C_t를 함께 보고 최종 subtask를 생성한다. 이 출력은 남은 후보 중 하나와 같을 수 있지만 후보 집합에 갇히지 않는다. reflective model은 영구 execution memory를 갱신하지 않는다.

value model은 다지선다 VQA 형태로 학습한다. 전체 지시문과 후보 subtask와 상상 이미지를 보고 clearly wrong부터 clearly correct까지 다섯 등급 중 하나를 고르며, 등급은 0.05에서 0.95 사이 스칼라로 매핑된다.

### 3.5 Low-level policy

low-level policy는 vision-language backbone과 Mixture-of-Transformers(MoT) action expert를 결합한다. full-attention 계층마다 action 토큰과 backbone 토큰이 joint attention으로 상호작용하되 파라미터가 분리된 두 Transformer 스트림으로 처리된다. action expert는 conditional flow matching으로 noise에서 action chunk 분포로 가는 속도장을 학습하고 추론 시 이를 적분한다.

통합 표현은 40차원이다.

| 좌표 | 차원 | 표현 |
|---|---|---|
| 왼쪽 EEF 위치 | 1-3 | 미터 단위 직교 좌표 |
| 왼쪽 EEF 자세 | 4-9 | 회전 행렬의 Rot6D |
| 오른쪽 EEF 위치 | 10-12 | 미터 단위 직교 좌표 |
| 오른쪽 EEF 자세 | 13-18 | 회전 행렬의 Rot6D |
| 왼쪽 그리퍼 | 19 | 고유 개폐 좌표 |
| 오른쪽 그리퍼 | 20 | 고유 개폐 좌표 |
| 허리 | 21-22 | 고유 좌표 2개 |
| 평면 베이스 속도 | 23-24 | 고유 좌표 2개 |
| 왼쪽 팔 관절 | 25-32 | 라디안 단위 8개 |
| 오른쪽 팔 관절 | 33-40 | 라디안 단위 8개 |

action은 현재 상태 기준 상대값으로 인코딩한다. end-effector action은 현재 자세로부터의 위치와 회전 델타이며 위치 델타는 현재 end-effector 좌표계에서 표현한다. 관절 action은 현재 관절 구성으로부터의 각도 오프셋이다. embodiment마다 유효 차원이 다르므로 대각 마스크 행렬 M을 flow 경로와 학습 목적함수 양쪽에 적용하고, 비활성 채널은 속도장 평가 직전과 최종 출력 시점에 투영으로 제거한다. 팔 관절이 8개 미만인 로봇은 앞쪽 항목부터 채우고 나머지를 마스킹한다.

flow 시각 τ는 chunk 전체가 공유하며 τ = 0.001 + 0.999x, x ~ Beta(1.5, 1)로 뽑는다. 정규화된 표본별 손실은 100에서 상한을 두고 배치 평균한다. 보고된 policy는 action horizon H = 30, 균일 Euler 적분 10회를 쓴다.

### 3.6 학습 데이터와 3단계 학습

low-level 학습 코퍼스는 40,115시간이며 구성은 다음과 같다.

| 원천 | 시간 |
|---|---|
| 내부 수집 AGIBOT G1 | 2만 1,900시간 |
| 내부 수집 AGIBOT G2 | 585시간 |
| 내부 수집 ARX AC One | 578시간 |
| 내부 수집 Franka | 347시간 |
| 내부 합계 | 약 2만 3,400시간 |
| 공개 UMI 데이터 | 9,250시간 |
| 공개 데이터 합계 | 1만 6,700시간 |

여기에 지시문 따르기, 시각 grounding, 공간과 깊이 추론, 로봇 중심 인식용 멀티모달 데이터를 섞어 co-training한다.

low-level 학습은 세 단계로 진행된다.

| 단계 | 이름 | 내용 |
|---|---|---|
| 1 | knowledge-isolated co-training | 멀티모달 데이터와 로봇 action 데이터를 함께 학습하되 action 손실의 그래디언트를 backbone 경계에서 차단한다 |
| 2 | end-to-end co-training | 차단을 풀고 전체를 함께 최적화하며 멀티모달 데이터는 보조 감독으로 남긴다 |
| 3 | task-specific adaptation | 배포 과제마다 소량의 과제별 시연 데이터(demonstration)로 fine-tuning한다 |

high-level 감독 데이터는 과제, 단계, 실행 가능 subtask 주석과 분할된 다중 시점 시연 데이터에서 자동 생성한다. 파이프라인은 세 단계다. google/Gemma4-31B-it를 주석기로 써서 장면 상태와 진행과 제약과 실패를 요약한 think 필드, 완료 단계를 압축하고 활성 subtask만 상세히 남기는 memory 필드를 만들고, ffmpeg로 top_head, hand_left, hand_right 세 동기 시점을 뽑은 뒤, 이를 합쳐 구조화된 VQA 예제를 조립한다.

memory 정합 실패에 대비한 인스턴스는 입력 memory만 변형하고 정답은 시연에서 읽는 방식으로 만든다.

| 계열 | 표본 위치 | 입력에서 목표로의 memory 변화 | 목표 subtask | 겨냥한 배포 실패 | 비율 |
|---|---|---|---|---|---|
| within-subtask | 구간 n 아무 곳 | M_n에서 M_n | 구간 n | 정상 진행 (정합 상태) | 58% |
| transition | 구간 n의 끝 | M_n에서 M_{n+1} | 구간 n+1 | 완료 후 새 subtask 시작 | 15% |
| catch-up | 구간 n의 시작 | M_{n-1}에서 M_n | 구간 n | memory가 시각 상태보다 뒤처짐 | 10% |
| rollback | 구간 n의 후반 | M_{n+1..n+3}에서 M_n | 구간 n 재시도 | memory가 앞서감 (과잉 낙관) | 12% |
| error-think | 주석된 실패 프레임 | M_n에서 유형별 복구 | 복구 단계 | 인지되지 않은 실행 실패 | 5% |

error-think 계열에서는 think 필드가 먼저 실패를 표시한 뒤 유형에 따라 memory를 고친다. 빈 grasping처럼 회복 가능한 실패는 memory를 그대로 두고 재시도하고, 물체를 떨어뜨린 것처럼 진행이 되돌아간 실패는 직전 subtask로 rollback한다. restorable=false로 표시된 표본은 건너뛰고, rollback 인스턴스는 올바른 memory까지 불신하도록 학습되는 것을 막기 위해 10~15%로 상한을 둔다.

품질 관리는 두 단계로 이뤄졌다. 프롬프트 개발 중 고정 시드 계층 표본 사람 점검으로 실패 유형을 찾았고, 가장 큰 문제는 주석기가 무관한 과제의 제약을 지어내는 교차 과제 오염이었다. 예를 들어 과일 정리 과제에 밀크티 제약이 등장했다. 모든 시각 프롬프트에 이미지에서 확인되지 않는 속성은 빼라는 검증 규칙을 심고, 발견된 실패 유형마다 프로그램 필터로 굳혔다. 오염 필터는 L1과 L3 주석에서 에피소드별 명사 어휘를 만든 뒤 조작 대상이 어휘 밖이거나 슬롯 명사 겹침이 20% 미만인 제약을 버린다. 단순 배타 판정(폐기율 0.33%, 잔존 오염 있음)과 과도한 비율 임계값(폐기율 2.32%, 유효한 제약 다수 삭제)을 거쳐 확장 불용어 목록을 갖춘 두 규칙 필터(폐기율 0.42%)로 정착했고, 326만 표본 검증셋에서 잔존 오염이 0이 되었다. 구조적 오염 데이터 필터는 과제별 오염 비율에 따라 3단계로 처리한다. 90%를 넘는 과제는 통째로 제외하고, 10~90%는 에피소드 단위로 거르며, 10% 미만은 빈 subtask 표본만 제거한다. 이 과정에서 에피소드의 11.74%를 버리고 4,040만 개(88.26%)의 정상 표본을 남겼다.

### 3.7 배포 시 asynchronous 서빙

논리적으로는 high-level과 low-level이 순차 실행이지만 실제 배포에서는 비동기로 파이프라인한다. high-level 결정 한 번이 low-level 제어 주기보다 훨씬 느리기 때문이다. 백그라운드 워커가 활성 에피소드마다 다음 subtask를 계속 다시 계산해 에피소드별 캐시에 약 1초마다 게시하고, 제어 루프는 캐시만 읽어 매 tick마다 즉시 action chunk를 낸다. 따라서 high-level 결정이 느리거나 실패해도 명령 갱신이 늦어질 뿐이고 low-level policy는 캐시에 있는 subtask를 약 30Hz의 control frequency로 계속 실행한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 설정

로봇 플랫폼은 세 종류다.

| 플랫폼 | 구성 | 사용 과제 |
|---|---|---|
| AGIBOT G1 | 전방향 4륜 조향 베이스를 가진 바퀴형 humanoid, 7-DoF 양팔, 평행 그리퍼, head RGB-D와 어안 카메라, 손목 카메라 | long-horizon 네 과제 |
| ARX AC One | 6-DoF X5 양팔, 평행 그리퍼, 손목 카메라와 고정 중앙 카메라 | Book Organization, Collect Laundry |
| Franka Research 3 | 7-DoF 토크 제어 양팔, 3D 프린팅 그리퍼, RGB 카메라 3대 | Tidy Makeup Table |

과제는 여섯 개의 가정 과제와 세 그룹으로 나뉜 지시문 따르기 벤치마크 하나로 구성된다.

| 과제 | 단계 수 | 성공 rollout의 대략적 소요 | 최대 허용 시간 |
|---|---|---|---|
| Clean Room | 25 | 약 8분 | 20분 |
| Prepare Ingredients | 14 | 약 4분 | 20분 |
| Tomato and Egg Stir Fry | 22 | 약 10분 | 20분 |
| Make Milk Tea | 13 | 약 3분 | 10분 |
| Collect Laundry | 5 | 약 1분 | 5분 |
| Book Organization | 3 | 약 1분 | 5분 |
| Tidy Makeup Table 세 그룹 | 2, 2, 4 | 세 그룹 합계 약 30초 | 그룹당 5분 |

Prepare Ingredients와 Tomato and Egg Stir Fry는 같은 요리를 두 로봇이 나눠 맡는 협업 흐름이라 두 단계를 별도 과제로 보고한다.

평가 지표는 두 가지다. 성공률(SR)은 필수 milestone을 하나도 빠뜨리지 않고 종료 조건까지 만족한 시행의 비율이다. 자율 재시도 끝에 완료한 필수 subtask는 성공으로 인정하되 과제별 금지 행위가 발생하면 실패다. Progress는 milestone 완료도를 정규화한 점수인데, 선행 관계를 방향 비순환 그래프로 두고 선행 milestone이 모두 충족된 뒤에만 점수를 준다. 개별 점수는 첫 시도 완료 1점, 자율 재시도 후 완료 또는 과제별 부분 완료 0.5점, 그 외 0점이다.

open-loop high-level 평가는 subtask 경계에서 수집한 주석 표본으로 실행과 분리해 측정하며, 표현 차이 때문에 정확도가 과소평가되는 것을 막기 위해 GPT-5.4를 의미 판정자로 쓴다. 판정 라벨은 equivalent, adjacent, wrong 세 가지이고 equivalent만 성공으로 센다. 표본마다 온도 0 호출 두 번, 불일치 시 세 번째, 세 라벨이 모두 다르면 네 번째를 받아 다수결한다.

### 4.2 long-horizon 네 과제 (Table I)

각 조합마다 실제 로봇 10회 시행이다. 앞의 네 행은 직접 실행이고 마지막 행만 계층 구조에 Plan Once를 쓴 것으로 beam search는 켜지 않았다.

| 방법 | Clean Room SR | Clean Room Progress | Prepare Ingredients SR | Prepare Ingredients Progress | Stir Fry SR | Stir Fry Progress | Milk Tea SR | Milk Tea Progress | 평균 SR | 평균 Progress |
|---|---|---|---|---|---|---|---|---|---|---|
| GR00T N1.7 | 0/10 | 59.80% | 1/10 | 68.57% | 0/10 | 24.32% | 0/10 | 28.46% | 2.50% | 45.29% |
| LingBot-VLA | 0/10 | 66.60% | 0/10 | 35.00% | 0/10 | 12.27% | 0/10 | 63.85% | 0.00% | 44.43% |
| π0.5 | 4/10 | 86.20% | 2/10 | 73.93% | 0/10 | 49.77% | 3/10 | 82.31% | 22.50% | 73.05% |
| τ0-VLA (직접 실행) | 4/10 | 92.80% | 2/10 | 66.43% | 0/10 | 65.00% | 5/10 | 96.15% | 27.50% | 80.10% |
| τ0-VLA (계층 구조, Plan Once) | 5/10 | 94.80% | 4/10 | 82.86% | 4/10 | 81.82% | 5/10 | 91.92% | 45.00% | 87.85% |

과제별 실패 양상을 저자들은 다음과 같이 정리한다.

- **Clean Room**: 명시적 execution memory의 효과가 뚜렷하다. 계층 구조는 방을 옮겨도 진행 상황을 유지하지만, memory가 없으면 핸드백 걸기와 이후 정리 단계에 실패가 몰린다.
- **Prepare Ingredients**: 실패 대부분이 달걀 집기, 깨기, 젓기에서 발생한다. 이 동작들이 이후 단계의 전제라 초기 오류가 뒤쪽 진행을 통째로 막는다.
- **Tomato and Egg Stir Fry**: 결정적 병목은 간 맞추기다. 소금을 넣어도 눈에 띄는 변화가 거의 없어 현재 observation만으로는 완료 여부를 알 수 없다. 직접 실행 policy는 소금을 반복해 넣거나 아예 건너뛰는데 둘 다 성공 기준을 위반한다. 계층 구조는 간 맞추기 진행을 기록해 이 모호함을 해소한다. 규정상 소금 반복 투입은 자율 재시도가 아니라 금지 행위로 처리되어 SR을 무효로 만들고 해당 subtask에 0.5점만 준다.
- **Make Milk Tea**: 두 τ0-VLA 변형 모두 이미 대부분의 순서를 완료해 SR 5/10과 91% 이상의 Progress를 낸다. 남은 실패는 뚜껑 부착과 빨대 삽입에 몰려 있어, 마지막 접촉이 많은 manipulation이 주된 병목임을 보여준다. TTC를 켜면 SR 7/10, Progress 95.38%로 올라간다.

### 4.3 embodiment 간 직접 실행 (Table II)

Collect Laundry와 Tidy Makeup Table은 단계가 2~5개로 짧아 과제 분해나 execution memory나 test-time search 없이 전체 지시문을 그대로 실행한다. high-level policy와 분리해 low-level 제어와 언어 조건 manipulation만 평가하는 설정이다.

| 방법 | Collect Laundry T-shirt SR | Progress | Cotton Pad SR | Progress | Eyelash Curler SR | Progress | Makeup Puff SR | Progress |
|---|---|---|---|---|---|---|---|---|
| GR00T N1.7 | 4/10 | 76.00% | 10/10 | 87.50% | 8/10 | 77.50% | 7/10 | 52.50% |
| LingBot-VLA | 2/10 | 35.00% | 9/10 | 67.50% | 3/10 | 22.50% | 3/10 | 33.75% |
| π0.5 | 9/10 | 88.00% | 9/10 | 85.00% | 8/10 | 85.00% | 7/10 | 73.75% |
| τ0-VLA | 10/10 | 97.00% | 10/10 | 95.00% | 9/10 | 92.50% | 10/10 | 95.00% |

Collect Laundry의 실패는 티셔츠 grasping과 침대 주변 주행에 몰린다. LingBot-VLA는 티셔츠를 들어 올리지 못할 때가 있고 GR00T는 침대 다리에 부딪혀 rollout이 종료된다.

Tidy Makeup Table은 시각 상태를 맞춰 놓고 지시문만 바꾸는 벤치마크다. 지시문이 대상 물체, 사용할 팔, 동작 순서, 목적지를 바꾸므로 observation만으로는 정답 동작을 정할 수 없다. GR00T는 서랍 동작 중 멈추거나 아이래시 컬러 대신 메이크업 퍼프를 고르고, LingBot-VLA는 지정된 팔은 대체로 따르지만 지시된 대상 대신 시각적으로 가까운 물체를 고른다. π0.5는 퍼프를 놓았다 다시 잡거나 서랍을 덜 매끄럽게 닫거나 코튼 패드를 빠뜨린다. 저자들은 이 실패들을 언어 grounding 오류와 실행 비효율로 구분한다. 대상을 잘못 고르거나 빠뜨리면 과제 완료 자체가 바뀌지만, 다시 잡기나 머뭇거리는 서랍 동작은 최종 상태에 도달해도 효율만 떨어뜨린다.

### 4.4 test-time computation (Figure 4, Figure 5, Table III)

비교 대상은 세 가지다. Plan Once는 결정 지점마다 한 번만 예측하며 high-level policy의 변형이라 high-level을 건너뛰는 직접 실행과는 다르다. Best-of-N은 N개 후보를 뽑아 같은 world model로 다음 observation을 예측하고 같은 value model이 매긴 최고 점수 후보를 고른다. TTC는 여기에 다단계 확장과 reflective 확정을 더한다.

open-loop 다음 subtask 예측 정확도는 다음과 같다.

| 평가 환경 | Plan Once | Best-of-N | TTC |
|---|---|---|---|
| Make Milk Tea | 64.7% | 70.0% | 87.3% |
| Book Organization (in-domain) | 66.0% | 83.0% | 88.0% |
| Book Organization (OOD) | 50.0% | 57.5% | 74.0% |
| Clean Room | 72.0% | 74.0% | 87.0% |

격차가 가장 큰 곳은 분포 이동이 있는 OOD Book Organization으로, TTC가 74.0%인 반면 Plan Once는 50.0%, Best-of-N은 57.5%다. OOD 설정에서는 초기 책 배열이 학습 데이터에 없어 해당 observation이 high-level policy의 학습 분포 밖에 놓인다. Best-of-N도 같은 world model과 value model을 쓰지만 다단계 확장과 reflective 확정 없이 한 단계 선택만 하므로 이득이 일관되게 작다.

closed-loop 실제 로봇 성능은 low-level policy를 고정한 채 TTC만 켜고 껐다. Book Organization은 섞인 초기 배열을 쓰며 in-domain과 OOD를 나누지 않고 보고한다.

| 방법 | Make Milk Tea SR | Progress | Book Organization SR | Progress | Clean Room SR | Progress |
|---|---|---|---|---|---|---|
| Plan Once | 5/10 | 91.92% | 6/10 | 66.67% | 5/10 | 94.80% |
| TTC | 7/10 | 95.38% | 9/10 | 93.33% | 7/10 | 97.60% |

고정된 실행 계획을 쓸 수 없는 Book Organization에서 이득이 가장 크다.

연산량과 정확도의 관계는 포화 지수 함수로 적합했고 파라미터는 모든 실험 측정값에 최소제곱으로 추정했다. 정확도는 작은 예산에서 빠르게 오르다가 한계 이득이 점차 줄어 곡선이 평탄해진다. 대략 3.5 PFLOPs/표본 구간에서 Make Milk Tea는 90% 부근, Book Organization은 80% 부근에 접근하며, 각각의 Plan Once 기준선은 64.7%와 55.3%다. 저자들은 이를 중간 예산에서 유리한 연산 대비 정확도 균형을 얻되 그 이득이 결국 포화한다는 뜻으로 읽는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에 별도 한계 절은 없고 결론과 실험 서술에 흩어져 있다.

- **연산 대비 이득의 포화**: Figure 5가 보여주듯 정확도 향상은 낮은 연산 구간에 집중되고 이후 평탄해진다. 예산을 계속 늘려도 얻는 것이 줄어든다.
- **접촉이 많은 마지막 단계**: Make Milk Tea에서 두 변형 모두 91% 이상의 Progress를 내고도 뚜껑 부착과 빨대 삽입에서 실패한다. 상위 결정이 아니라 low-level 정밀도가 남은 병목이다.
- **routing 임계값의 과제별 보정**: 통계와 규칙은 공유하지만 δ_all과 δ_mem은 과제마다 held-out 데이터로 따로 맞춘다. 새 과제에 옮길 때 보정 절차가 필요하다.
- **배포마다 별도 fine-tuning**: 3단계 학습의 마지막이 과제별 적응이라 공유 pre-training foundation 위에 배포 설정마다 별도 fine-tuning을 추가한다.
- **world model의 입력 제약**: world model은 항상 head 카메라 이미지 한 장만 다룬다. 손목 시점이나 다중 시점 정보는 결과 예측에 쓰이지 않는다.
- **평가 규모**: 조합마다 실제 로봇 10회 시행이라 SR 한 칸의 차이가 10%p다. 표본 수가 작아 근소한 차이의 해석에는 한계가 있다.
- **Tomato and Egg Stir Fry의 낮은 절대 성능**: 계층 구조로 0/10에서 4/10까지 올랐지만 여전히 절반 미만이다.

저자들이 제시한 방향은 이 closed-loop를 더 다양한 과제와 더 긴 배포로 확장해, 로봇이 언제 숙고할지, 결과를 어떻게 검증할지, 작은 오류가 과제 수준 실패로 번지기 전에 계획을 언제 고칠지를 스스로 정하게 만드는 것이다.

## 6. 관련 연구 (Related Work)

논문은 세 가지 연구 흐름을 자기 위치의 좌표로 삼는다.

**generalist VLA.** RT-1과 RT-2가 언어 조건 로봇 학습과 vision-language pre-training 전이를 확립했고, 이후 연구가 과제와 embodiment로 범위를 넓혔다. π0, π0.5, GR00T 계열이 연속 제어와 open-world generalization과 cross-embodiment 전이를 겨냥한다. 보조 흐름으로 SmolVLA 같은 소형 policy, FAST 같은 효율적 action tokenization, knowledge insulation, asynchronous action chunk 실행이 있다. τ0-VLA의 low-level policy는 이 계보를 그대로 따르고, 논문의 초점은 상위 단계에 있다.

**hierarchical robot policy.** SayCan이 언어 모델 결정을 학습된 affordance에 grounding했고, RT-H가 언어로 action 계층을 표현했으며, Hi Robot 계열이 느린 의미 추론과 빠른 시각 운동 제어를 연결했다. 최근 연구는 long-horizon 상태 추적을 더 명시적으로 다룬다. Torne 등은 단기 시각 memory와 장기 텍스트 memory를 결합하고, Sridhar 등은 과제 관련 과거 keyframe을 검색해 지시문을 만들며, Liu 등은 구조화된 memory와 결과 검증과 반성을 결합한다. Zhang 등은 재귀적 subgoal을 적응적으로 만들고, Long 등은 world model을 high-level policy로 써서 텍스트와 시각 subgoal 시퀀스를 낸다.

가장 가까운 선행은 의미 high-level policy와 world model과 low-level policy를 결합한 최근 접근이다. 그 구성에서 world model은 이미 생성된 subtask의 subgoal image를 만든다. τ0-VLA에서는 시각 예측이 확정 이전에 일어나 여러 후보를 value 기반 search와 반성으로 비교한다.

**world model과 test-time computation.** world model은 후보 행동 아래 미래 상태를 예측해 planning과 policy 학습을 돕는다. manipulation에서는 생성된 이미지나 영상이 inverse dynamics의 목표로 쓰이거나 action과 함께 모델링되거나 search와 반복적 계획 수정에 들어갔다. Feng 등은 상상한 미래 상태로 VLM 계획을 반복 수정한다. τ0-VLA의 search는 여러 언어 subtask 분기를 유지하고 전용 value model로 가지치기한 뒤 reflective 생성으로 넘긴다.

상위 결정에 search를 적용한 선행으로 Park 등은 구조화된 scene graph subgoal 전이를 탐색해 성공 확률을 예측하고 낮은 분기를 미리 쳐낸다. Yang 등은 학습된 critic으로 이산 manipulation 계획을 탐색하며 예측 시각 dynamics, value 기반 beam search, 확신 기반 routing, 다중 경로 반성을 결합한다. 두 연구가 가장 가까운 search 기반 기법이다. 차이는 τ0-VLA가 열린 형태의 언어 subtask를 탐색하고 후보마다 예측된 종료 이미지로 평가하며, 이후 결정을 교정 가능한 execution memory에 조건화한 뒤 reflective model이 최종 subtask를 생성한다는 점이다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| test-time computation (TTC) | 추론 시점에 연산을 더 써서 결정 품질을 올리는 절차. 여기서는 후보 subtask 제안, 결과 이미지 예측, 점수화, 반성으로 이뤄진 beam search를 가리킨다 |
| execution memory | 지금까지 무엇을 끝냈는지를 텍스트로 유지하는 기록. 매 결정 단계에서 현재 observation에 맞게 갱신된다 |
| proposal model | 결정 컨텍스트를 받아 execution memory를 갱신하고 후보 subtask를 내는 모델 |
| value model | 지시문과 후보 subtask와 상상한 종료 이미지를 받아 후보 품질 점수를 내는 모델. 다섯 등급 다지선다 VQA로 학습된다 |
| reflective model | beam search가 남긴 분기 요약과 실제 observation 컨텍스트를 함께 보고 최종 subtask를 생성하는 모델. 후보 집합에 갇히지 않는다 |
| adaptive router | proposal model의 토큰 확률과 logit margin으로 TTC를 켤지 말지를 정하는 이진 규칙 |
| Plan Once | 결정 지점마다 한 번만 예측하는 high-level 기준선. high-level을 아예 건너뛰는 직접 실행과 다르다 |
| Best-of-N | N개 후보를 뽑아 같은 world model과 value model로 채점한 뒤 최고점 하나를 고르는 한 단계 선택 기준선 |
| Mixture-of-Transformers (MoT) | action 토큰과 backbone 토큰이 joint attention으로 상호작용하되 파라미터가 분리된 두 스트림으로 처리되는 구조 |
| Progress | milestone 완료도를 정규화한 점수. 선행 관계 그래프를 만족한 milestone만 점수를 받고 첫 시도 완료 1점, 재시도 완료 0.5점을 준다 |
| knowledge isolation (KI) | action 손실의 그래디언트를 backbone 경계에서 차단해 pre-training된 backbone을 이르게 흔들지 않는 학습 단계 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | τ0-VLA 전체 개요 (데이터, high-level TTC, 능력) | caption-region | wiki 권장 (architecture) |
| fig02 | 5 | 계층 구조 상세도 (high-level, low-level, beam search) | caption-region | wiki 권장 (method) |
| fig03 | 8 | 실제 로봇 평가 과제 6종 | caption-region | wiki 권장 (setup) |
| fig04 | 10 | 네 환경의 다음 subtask 예측 정확도 막대그래프 | caption-region | wiki 권장 (result) |
| fig05 | 11 | 연산량과 정확도의 포화 곡선 | caption-region | wiki 권장 (result) |
| tab01 | 10 | long-horizon 네 과제 성능표 | table-region | 본문 표로 재작성 |
| tab02 | 10 | embodiment별 직접 실행 성능표 | table-region | 본문 표로 재작성 |
| tab03 | 10 | closed-loop TTC 성능표 | table-region | 본문 표로 재작성 |
| tab04 | 14 | 40차원 통합 상태와 action 배치표 | table-region | 본문 표로 재작성 |
| tab05 | 15 | 과제별 최대 시행 시간표 | table-region | 본문 표로 재작성 |
| tab06 | 17 | high-level 학습 인스턴스 다섯 계열표 | table-region | 본문 표로 재작성 |
