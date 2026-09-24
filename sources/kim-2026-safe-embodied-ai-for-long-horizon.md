---
title: "Safe Embodied AI for Long-horizon Tasks: A Cross-layer Analysis of Robotic Manipulation"
type: paper
year: 2026
category: physical-ai
raw_path: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon.pdf
raw_filename: "kim-2026-safe-embodied-ai-for-long-horizon.pdf"
source_collection: external
authors: "Dabin Kim, Daemin Park, Sangyub Lee, Jinsik Kim, Yeongtak Oh, Jongho Shin, Sungroh Yoon"
arxiv_id: "2606.05660"
tags: [physical-ai, safety, manipulation, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig01.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig01.png
    caption: "long-horizon manipulation에서 위험이 계층을 건너 쌓이는 과정. 지시문, grounding과 planning, action 생성, contact 구간 실행, 지연된 실패 다섯 단계를 잇고 아래에 misgrounding에서 회복 가능성 상실까지 이어지는 누적 곡선을 그렸다"
    page: 3
    bbox_norm: [0.1173, 0.0761, 0.8828, 0.5373]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig02.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig02.png
    caption: "서베이의 intervention locus 조직도. planning-time(3장), policy-time(4장), execution-time(5장) 세 계층과 각 계층의 세부 기법을 묶고 평가(6장)와 향후 방향(7장)을 아래에 배치했다"
    page: 8
    bbox_norm: [0.1732, 0.0761, 0.8268, 0.7245]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig03.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig03.png
    caption: "planning-time safety 3단계. 목표와 제약을 grounded task specification으로 만드는 1단계, 분해와 temporal specification과 planner verification으로 검증된 plan 구조를 만드는 2단계, world model planning과 공간 제약으로 실행 가능한 planning object를 만드는 3단계를 잇고 아래에 단계별 실패 전파를 적었다"
    page: 13
    bbox_norm: [0.139, 0.0819, 0.8699, 0.3413]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig04.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig04.png
    caption: "policy-time safety 개관. 가운데 제약 있는 policy 최적화 식을 두고 4.1 policy class와 interface가 policy 공간을 정의하며 4.2 제약 주입, 4.3 objective shaping, 4.4 long-horizon 확장이 각각 제약과 목적함수와 rollout 전반의 안전을 맡는다"
    page: 19
    bbox_norm: [0.121, 0.0761, 0.879, 0.4374]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig05.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig05.png
    caption: "execution-time safety 개관. 1단계 runtime 위험 평가와 차단, 2단계 실패 대응과 과제 복원, 3단계 contact 구간 물리 상호작용 안전을 나란히 두고 각 단계의 산출물과 대표 실패 유형을 아래에 적었다"
    page: 24
    bbox_norm: [0.121, 0.0761, 0.879, 0.4599]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/fig06.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/fig06.png
    caption: "7장 로드맵. 계층별로 흩어진 현재 안전 기법과 다섯 가지 cross-layer 난제를 짚고 추상화 계층 연결, sim-real 안전 정합, 안전 전이, 분포 변화 아래 보정, 절차 안전 관측성 다섯 경로와 세 가지 인접 분야 기회를 제시한다"
    page: 44
    bbox_norm: [0.1173, 0.0761, 0.8827, 0.4706]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/tab01.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/tab01.png
    caption: "안전 분석 관점에서 본 embodied robotics 도메인 비교. navigation, locomotion, manipulation을 horizon, semantic, contact, hidden, coupling 다섯 요인으로 대조했다"
    page: 4
    bbox_norm: [0.1173, 0.1073, 0.8827, 0.2031]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/tab02.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/tab02.png
    caption: "인접 서베이 9편 대비 이 서베이의 위치. 각 서베이의 범위와 강조점, 이 논문이 메우려는 빈틈을 한 줄씩 적었다"
    page: 4
    bbox_norm: [0.1173, 0.3116, 0.8827, 0.5973]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/tab03.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/tab03.png
    caption: "근거 범주 taxonomy. formal guarantee와 statistical safety와 empirical safety 세 범주가 각각 무엇을 뒷받침하고 어디까지가 주장의 경계인지 정리했다"
    page: 9
    bbox_norm: [0.1173, 0.0766, 0.8827, 0.3216]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/tab04.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/tab04.png
    caption: "3장부터 5장까지를 묶은 lifecycle intervention map. 단계별 기법 계열, 역할, 주된 실패 유형, 근거 수준, 대표 인용을 한 행으로 정리했다. 원본 페이지가 가로 방향이라 이미지도 옆으로 누운 상태다"
    page: 11
    bbox_norm: [0.2302, 0.0424, 0.7498, 0.9776]
    strategy: manual
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/kim-2026-safe-embodied-ai-for-long-horizon/tab05.png
    raw: raw/papers/kim-2026-safe-embodied-ai-for-long-horizon-figures/tab05.png
    caption: "대표 벤치마크와 안전 평가 프로토콜 25종. 역할, 근거 대상, 주요 지표, 주장 경계 네 열로 정리했다. 원본 페이지가 가로 방향이라 이미지도 옆으로 누운 상태다"
    page: 36
    bbox_norm: [0.1602, 0.0524, 0.8298, 0.9676]
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

long-horizon robotic manipulation의 안전 문헌을 intervention locus(안전 기법이 파이프라인의 어디에 개입하는가)와 evidence boundary(그 결과가 실제로 무엇을 뒷받침하는가) 두 기준으로 재배치하고, 계층마다 어떤 근거가 강하고 어떤 주장이 간접적인지를 구분한 서베이다.

## 1. 자료 정보 (Document Information)

- arXiv:2606.05660v1 [cs.RO], 2026년 6월 4일 공개. 본문 49쪽에 참고문헌을 더해 63쪽이다.
- 저자는 Dabin Kim(UNIST InnoCORE AI-Space Solar Initiative, 서울대 자동화시스템공동연구소), Daemin Park, Sangyub Lee, Jinsik Kim, Yeongtak Oh(서울대 전기정보공학부와 AI 협동과정), Jongho Shin(LG전자), 교신저자 Sungroh Yoon(서울대)이다.
- 키워드는 embodied AI, robotic manipulation, long-horizon tasks, robot safety, vision-language-action models, safety assurance다.
- 문헌 수집은 2026년 4월까지이며 IEEE Xplore, ACM Digital Library, arXiv, Google Scholar, Semantic Scholar와 출판사 페이지 검색에 대표 논문과 인접 서베이의 reference tracing을 더했다. 저자들은 포함된 문헌 중 상당수가 최신 preprint라 아카이브 상태와 실증 성숙도가 바뀔 수 있다고 명시한다.
- 도식은 Figure 6개와 Table 5개다.

### 포함과 제외 기준

한 편이 아래 네 조건 중 하나 이상을 만족하면 포함한다.

1. long-horizon manipulation의 안전 관련 실패 원인을 다룬다. specification 오류, 위험한 action 생성, 실행 중 drift, contact 구간의 물리적 위험 등이다.
2. 안전 조건 아래에서 로봇 행위를 제약, 검증, 감시, 교정, 복원, 평가하는 기법을 제안한다.
3. 안전 주장의 강도를 판정할 수 있는 formal, statistical, empirical 근거를 제시한다.
4. manipulation 고유의 안전 근거를 넓은 맥락에서 해석하는 데 필요한 배경을 제공한다.

반대로 일반적인 성능 향상, foundation model 규모 확장, 포괄적 embodied AI 벤치마킹이 주된 기여인 논문은 직접적 안전 근거로 취급하지 않는다. 또한 adversarial attack, data poisoning, prompt injection, jailbreak, 모델 유출, 로봇 사이버보안은 functional safety가 아니라 보안 경계 문제로 보아 독립 범위에서 제외한다.

## 2. 주요 기여 (Key Contributions)

1. long-horizon robotic manipulation을 embodied AI 안전 분석의 anchor domain으로 설정한다. 의미 수준의 과제 specification, subtask 사이의 지연된 오류 전파, 공간과 motion feasibility 제약, contact 구간의 물리적 상호작용, 과제가 성공한 것처럼 보이는데도 남아 있는 위험이 한 시스템 안에 겹친다는 점을 근거로 든다.
2. 문헌을 intervention locus 기준으로 재배치한다. 안전을 하나의 속성으로 보지 않고 planning-time의 과제 형성과 검증, policy-time의 action 생성 조형, execution-time의 감시와 복원과 contact 조절로 나눈다.
3. evidence boundary framework를 제안한다. formal guarantee, statistical safety evidence, empirical safety evidence를 구분해 과제 성공률이나 일반적 robustness 향상을 안전의 직접 근거로 과대 해석하지 않도록 한다.
4. long-horizon manipulation의 평가와 벤치마크 관행을 분석한다. 성능 중심 벤치마크가 절차 안전을 보이기에 부족하고, 안전 평가가 plan 선별, rollout 수준의 안전한 성공, runtime 탐지, 복원, contact 품질로 흩어져 있음을 보인다.
5. cross-layer 연구 방향을 합성한다. 추상화를 보존하는 안전 표현, sim2real 안전 근거, embodiment가 바뀔 때의 재검증, 보정된 개입 선택, procedural safety observability, 안전 데이터와 평가 인프라 여섯 가지다.
6. 기존 모델의 함정을 별도 분석으로 진단하고 차세대 manipulation framework가 지켜야 할 안전 제약을 구조화한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 안전의 범위 정의

이 서베이에서 safety는 long-horizon 과제 수행 중 사람에 대한 위해, 물체 손상, 명시된 제약 위반, 복구 불가능한 상태로 이어질 수 있는 실패의 예방과 탐지와 완화를 뜻한다. 네 가지 하위 범주로 나뉜다.

| 범주 | 대상 |
|---|---|
| physical safety | 사람, 로봇, 조작 대상 물체, 환경에 대한 물리적 위해 |
| procedural safety | 과제 순서, precondition, 제약, 회복 가능 상태를 rollout 전체에 걸쳐 유지하는 것 |
| operational safety | 자율 실행을 계속하는 것이 더 이상 정당화되지 않는 상태를 피하는 것 |
| semantic safety | 위험한 지시문(instruction), 잘못 grounding된 목표, 환각된 affordance, 누락된 제약 |

reliability, robustness, alignment는 그 자체로 안전 근거가 아니다. hazard 감소, 위험 상태 회피, 실패 전파 완화와 명시적으로 연결될 때만 안전 근거로 인정한다.

### 3.2 첫 번째 기준: intervention locus

안전 기법이 행위를 조형하거나 제한하거나 교정하는 시점을 기준으로 세 계층을 나눈다.

| 계층 | 개입 시점 | 주된 대상 | 다루는 절 |
|---|---|---|---|
| planning-time | rollout 이전 | 과제 표현, grounding, 제약, 분해 구조 | 3장 |
| policy-time | action이 환경에 확정되기 전 | action 생성 기구, 목적함수, 정합 | 4장 |
| execution-time | 물리 실행 중 | runtime 감시, 이상 탐지, 개입, contact 조절 | 5장 |

세 계층은 분석 단위로만 독립적이고 실제로는 하나의 closed-loop 안에서 맞물린다. planning-time 제약은 policy interface로 번역될 수 있어야 하고, policy-time의 uncertainty 신호는 execution-time 감시기가 해석할 수 있어야 한다.

### 3.3 두 번째 기준: evidence boundary

안전 주장의 엄밀성을 세 범주로 나눈다. 각 논문은 분석이나 검증이 직접 뒷받침하는 가장 강한 주장 하나를 기준으로 배정한다.

| 근거 범주 | 뒷받침하는 것 | 주장의 경계 |
|---|---|---|
| formal guarantee | 명시된 가정과 제약 집합 안에서 증명된 안전성. CBF와 reachability filter, temporal logic 기반 planning이 예시다 | 가정 밖에서는 무효이고 실제 세계와의 abstraction gap이 남는다 |
| statistical safety | 명시된 가정 아래 한정된 실패 확률이나 risk 민감 근거. uncertainty bound와 신뢰도 기반 개입이 예시다 | 가정이나 모델링된 데이터 영역을 벗어나면 무효다 |
| empirical safety | 특정 벤치마크나 평가 시나리오에서 측정된 안전 지표. safety cost와 contact 실패 감소가 예시다 | 일반화 보장이 없고 long-tail 상황을 포괄하지 못한다 |

근거의 대상(object)도 구분한다. plan-level 근거는 과제 specification이 유효하거나 시뮬레이터에서 실행 가능함을 보이지만 perception과 policy drift 아래의 안전한 물리 실행까지 보장하지 않는다. trajectory-level 근거는 safe success rate나 누적 cost 같은 사후 요약이라 hazard의 발생 시점이나 개입 타이밍의 정확도를 재지 못한다. runtime과 contact-level 근거는 물리적 안전에 가장 가깝지만 특정 embodiment와 센서 구성에 크게 의존한다.

### 3.4 위험 압력 여섯 가지

각 기법이 어떤 hazard를 겨냥하는지 잇기 위해 여섯 가지 risk pressure를 어휘로 쓴다.

- task specification and grounding risk: 목표 해석과 장면 grounding의 오류, 안전 관련 제약의 누락
- sequence and transition risk: 잘못된 분해나 위험한 subtask 순서로 precondition이 충족되지 않은 채 진행하는 경우
- spatial and motion-feasibility risk: 충돌 없는 trajectory, 도달 가능한 자세, 안정적인 grasping 지점 같은 기하학적 확정이 빠진 추상 plan
- policy generation and objective risk: 어긋난 목적함수, 제약 없는 action interface, long-horizon 컨텍스트 상실에서 오는 위험한 action 제안
- runtime drift and uncertainty risk: perception 오류, 분포 변화, 보정되지 않은 신뢰도로 planning 가정에서 벗어나는 경우
- contact and physical-interaction risk: 힘, 마찰, jamming에서 오는 위해

이 압력들은 cascading failure와 recoverability 상실로 서로 연결된다. 작은 specification 오류나 contact 교란이 계층을 넘어 전파되어 결국 위해를 막거나 복구를 보장할 수 없는 상태에 이른다.

### 3.5 planning-time safety (3장)

3장은 rollout 이전 단계를 세 절로 나눈다.

**3.1 목표와 과제 specification의 grounding.** goal과 초기 상태 grounding에서는 SayCan 계열의 암묵적 affordance 점수화와 Shirai 계열의 명시적 심볼 구조화가 대표 기법이다. 이 묶음의 근거 경계는 이산적 결정 지점에서의 의미 호환성과 심볼 일관성까지다. 열린 빈틈은 이산 의미 추상화가 환경의 연속적 topological feasibility를 담을 수 있다고 가정한다는 점이다. 복잡한 기하학적 차단이나 물체 혼잡이 reachable이라는 이진 predicate로 단순화되면 planner는 의미상 완벽하지만 motion planner가 반복해서 거부하는 시퀀스를 만들고, 물리 rollout 이전에 무한한 심볼 재planning 루프나 교착에 빠진다.

제약 해석에서는 자연어 제한을 planner가 쓸 수 있는 표현으로 옮기는 것이 핵심이다. VoxPoser 계열의 조밀한 기하 value map, 구조화된 심볼 문제 기술, 상위 plan 선별용 금지 기준이 쓰인다. 열린 빈틈은 논리 표현력과 solver tractability와 의미 정합 사이의 상충이다. 과대 제약이면 solver가 해를 찾지 못하고, 과소 제약이면 좁은 명세는 만족하면서 사용자의 실제 안전 의도를 위반하는 시퀀스가 나온다.

실행 가능한 interface로의 grounding은 추상 plan 단계를 실제 스킬, API 호출, 제어 primitive에 대응시킨다. 텍스트 유사도 기반 어휘 매핑과 ProgPrompt 계열의 프로그램식 캡슐화가 대표다. 근거 경계는 구문 준수와 API 호환성까지이고, 정적 함수 정의 뒤에 숨은 문맥 의존 precondition은 평가하지 못한다.

**3.2 long-horizon plan의 구조화와 검증.** 분해와 순서화에서는 chain-of-thought 기반 불변식 검증, LTL로 번역해 허용되지 않는 action을 가지치기하는 automata 방식, scene graph를 PDDL 도메인과 문제 파일로 바꿔 자동 planner로 푸는 심볼 기반이 쓰인다. 근거 경계는 가정된 심볼 도메인 모델 안의 인과 일관성까지다. predicate 완전성과 정적 인과 불변성이라는 가정이 깨지면, 예컨대 scene graph에서는 열려 보이는 캐비닛이 실제로는 걸려 있거나 물체 무게가 스킬 primitive의 암묵적 한계를 넘으면 의미 추상화 불일치가 발생한다.

temporal specification에서는 LTL과 STL이 표준 수단이다. 세 가지 안전장치가 쓰인다. 구문 유효성 확보, conformal prediction으로 번역 신뢰도를 보정해 충분히 믿을 만할 때만 진행하는 방식, 물체 중심 기하 관계를 담는 계층적 spatio-temporal 논리 구조다. 남는 실패 유형은 vacuous satisfaction으로, 함의형 요구의 전제가 아예 발생하지 않아 형식상 만족되는 경우다. 또한 LTL 추론은 일반적 정식화에서 이미 PSPACE-complete라 계산 부담이 크고, 기하 추상화와 long-horizon 조합이 더해지면 부담이 커진다.

planner verification은 사후 선별에서 디코딩 제약으로, 다시 closed-loop 교정 feedback으로 발전했다. 반례 정보를 planning 프롬프트로 되돌려 plan을 고치는 방식, 검증 출력을 경량 신경망 surrogate verifier로 distillation하는 방식, 2차 언어 모델을 정성적 안전 판정자로 쓰는 낮은 보증 수준의 비평 루프가 함께 정리된다. 근거 경계는 specification 상대적이다. verifier가 확인하고 형식화할 수 있는 범위 안에서만 plan이 규칙과 일관됨을 높일 뿐, 불완전한 predicate나 낡은 perception이나 빠진 contact 가정 위에서도 검증을 통과할 수 있다.

**3.3 공간과 model 기반 planning 지원.** world model과 foresight는 미래 상태 예측을 planning 루프에 넣는다. 예측 rollout으로 상태 연속성을 평가하고, 상상된 미래 상태를 교정 신호로 써서 실행 전에 action 시퀀스를 고치며, 다중 시점 world model과 stage 인식 구조로 transition 일관성을 높인다. 근거는 예측 상대적 empirical 수준이며 horizon이 길어질수록 환각과 분포 변화와 compounding error에 취약해진다.

공간과 물체 중심 제약 구성은 과제 의도를 3D 영역, keypoint, 물체 부위로 옮긴다. ReKep의 relational keypoint constraint, 부위 수준 공간 grounding, 정밀한 시각 의미를 3D 공간 제약으로 바꾸는 방식이 예시다. GroundedPlanBench 계열의 벤치마크 근거는 명시적 공간 grounding을 빼면 long-horizon plan의 실행 가능성이 크게 낮아진다고 보고한다. 근거 경계는 empirical spatial grounding까지이고 충돌 없고 기구학적으로 가능하며 contact가 안정적인 trajectory의 존재를 보장하지 않는다.

integrated TAMP는 심볼 구조와 연속 기하 제약을 하나의 표현으로 묶는다. 역기구학과 물체 자세와 충돌 없는 trajectory 같은 연속 변수를 블랙박스 샘플러로 심볼 planner에 연결하는 방식이 형식적 기준선이다. 최근에는 지시문과 observation을 도메인 전용 명세로 바꿔 기하 제약 추론을 지원하거나, 열린 세계의 언어 grounding을 이산과 연속 제약으로 바꿔 표준 TAMP solver에 통합한다. motion planning 실패를 상위 추론으로 되돌리는 feedback 루프가 마지막 사전 rollout 정제 수단이다.

### 3.6 policy-time safety (4장)

4장은 policy 생성을 제약 있는 최적화로 정식화한다. 목적함수 J_obj를 최대화하되 제약 C_i가 0 이하가 되도록 policy 공간 Π에서 policy를 고르는 형태다. 모든 기법이 문자 그대로 이 식을 쓰는 것은 아니지만 4장 전체를 묶는 추상으로 삼는다.

**4.1 policy class와 interface.** 개입 표면은 backbone이 노출하는 표현에 따라 달라진다.

| policy 표현 | 개입 표면 | 대표 기법 |
|---|---|---|
| tokenized VLA | action 어휘 자체. 위험한 토큰을 차단하거나 가중치를 낮춘다 | RT-2, OpenVLA |
| 연속 또는 chunked action | trajectory 수준 분포. 투영, 재샘플링, 연속 안전 필터 | Diffusion Policy, Octo |
| 프로그램과 스킬 interface | 생성된 코드 줄과 API 호출을 실행 전에 검사. 상태 조건부 스킬 공간 제한 | Code as Policies, SayPlan |

long-horizon 컨텍스트 처리도 안전과 직결된다. 계층적 언어 조건부 policy는 상위 latent plan과 하위 visuomotor policy로 나누고, 메모리 증강 backbone은 과거 observation을 유지하며, interleaved 언어 planning이나 시각 chain-of-thought로 중간 진행 변수를 노출하는 계열도 있다.

**4.2 제약 인식 policy 생성.** 두 단계로 나뉜다. 첫째는 생성 시점의 제약 주입이다. STL 제약으로 토큰 연속을 마스킹하거나 가중치를 낮추는 방식, 생성된 프로그램 줄을 API와 assertion식 상태 검사에 대조하는 방식, 안전 layer와 투영과 미분 가능 최적화 모듈로 연속 action을 수정하는 방식이 있다. shielding이 학습 기반 설정의 고전적 대응물로, 전용 안전 layer가 제안된 action을 감시해 선택지를 제한하거나 명시적 temporal specification에 맞게 교정한다.

둘째는 제약 있는 학습과 안전 최적화다. CMDP 정식화는 기대 reward를 최대화하면서 기대 safety cost 한도를 지키고, CPO의 trust region 갱신과 적응적 Lagrangian 승수가 대표 알고리즘이다. 이 보장은 기대값 기반이라 학습 중 일시적이거나 상태별 위반을 허용할 수 있다. 더 강한 feasibility가 필요한 경우 등식 제약을 축소된 policy 최적화로 다루거나 POLICEd RL로 아핀 상태 제약을 강제하는 hard-constrained 계열이 있다. VLA 안전 정합 연구는 위험 시나리오를 끌어내 policy를 fine-tuning하는 방식으로 제약 있는 학습을 foundation model 영역으로 옮겼지만 근거는 여전히 분포 의존적 empirical 수준이다.

certificate 기반 안전 학습은 일반적 안전 reward 대신 명시적 safe set과 certificate와 filter로 학습과 탐색을 조형한다. Hamilton-Jacobi reachability 기반 safe set과 predictive safety filter, CBF와 학습된 certificate, 안전 manifold와 호환되는 방향으로만 탐색하도록 action space를 변환하는 constraint manifold 방식이 있다. 고차원 manipulation에서는 복잡한 기구학과 contact dynamics에 대한 certificate를 해석적으로 유도하기 어렵고 정확한 reachability는 차원의 저주를 겪는다. 신경망 certificate는 확장성을 노리지만 연속 상태 공간에서 부등식을 인증하는 데 추가 검증 기구가 필요하다.

**4.3 정합과 objective shaping.** 명시적 제약은 위험한 후보 action을 막을 뿐, 목적함수가 어떤 행위에 reward를 주는지는 정하지 않는다. 선호 기반 정합에서는 trajectory 수준 사람 선호로 policy를 맞춰 충돌률을 실증적으로 낮춘 사례, 변형 가능 물체 조작에 선호 정합 diffusion model을 적용한 사례가 보고된다. 라벨 수집 비용을 줄이기 위해 적은 라벨로 선호 조형 reward를 유지하거나 과제 사이에 전이하거나 품질이 섞인 데이터에서 학습하는 framework도 있다.

언어와 개입 기반 reward shaping은 feedback 채널을 넓힌다. 언어 조건부 reward model, LLM이 조밀한 프로그램식 reward 루틴을 만들고 사람 텍스트 feedback으로 다듬는 방식, 영상 언어 critic, 사람이 개입한 물리 흔적을 잔차 reward로 바꾸는 방식이 정리된다. 근거 경계는 목적함수 상대적 empirical 수준이다. 이 채널들은 학습 시점 목적함수를 조형할 뿐 인증된 runtime 감시기가 아니다.

**4.4 long-horizon 확장.** 구조 측면에서는 재사용 가능한 스킬과 프로그램식 action 루틴으로 상위 interface를 노출해 subtask 진행을 검사 가능하게 만들고, 컨텍스트 유지 기구로 오래된 상태 오류를 줄이며, foresight model이나 추론과 action의 정합 검사로 확정 전 검증을 더한다. 목적함수 측면에서는 stage 인식 reward 모델링이 상위 stage와 stage 내 진행을 분리해 절차적 drift를 직접 벌점화한다. 다만 이런 정합 채널은 잡음이 섞이거나 오염된 사람 feedback에 취약하고, policy 수준 절차 안전에 대한 보정된 수학적 한계를 주지 못한다.

### 3.7 execution-time safety (5장)

**5.1 runtime 위험 평가.** 네 단계로 나뉜다.

1. runtime monitoring과 이상 탐지. 로봇 조건부 normalizing flow를 쓴 선제 이상 탐지, latent dynamics model로 OOD 상태를 예측하는 방식, 연속 잡음 공간의 편차 측정, entropy 기반 action 의도 불확실성, VLA 내부 표현을 쓴 다중 과제 실패 탐지가 있다. conformal prediction이 통계적으로 보정된 경보 임계값을 제공한다. 단일 스칼라 점수는 취약하므로 RGB와 depth와 오디오 융합, 다중 시점 카메라, 명시적 3D 공간 feature로 보강한다. 공통 과제는 파국적 실패를 막을 만큼 빠르면서 오경보율은 낮게 유지하는 것이다.
2. 실패 진단. 수작업 실패 분류나 심볼 predicate로 국소화하는 구조적 진단, 인과 네트워크와 의미 scene graph 같은 관계 모델, 실행 로그에서 실패 유형을 비지도로 발견하는 방식, LLM과 VLM으로 다중 모달 감각 데이터를 요약해 자연어 설명까지 내는 생성적 진단이 있다.
3. runtime shielding. 제어 이론 기반은 명시적 모델 가정 아래 safe set의 forward invariance를 인증하고 추가 최적화 layer로 제약을 강제하며 policy에 무관한 plug-and-play 안전장치로 작동한다. 로봇 grasping과 시각 기반 제어의 가림 회피에 적용됐고, long-horizon에서는 안전 개입이 과제 feasibility를 영구히 파괴하지 않아야 한다는 task-consistency 요건이 강조된다. 학습과 latent와 의미 기반 shielding은 명시적 dynamics model이 없을 때 쓰인다. diffusion policy 제안을 집합 기반 reachability로 검증하거나, 시각 제약 명세에서 latent safety filter를 온라인으로 적응시키거나, 보정된 epistemic uncertainty로 latent 상태 공간을 늘려 OOD 상태 진입까지 막는다. 열린 어휘 장면 이해에서 보호 장치를 만들거나 VLM으로 CBF를 구성해 pre-training된 VLA에 결합하는 방식도 있다.
4. runtime policy steering. 최악 위반을 막는 shielding과 달리 실패가 완전히 드러나기 전에 더 위험이 낮은 후보를 고른다. action 제안을 미리 전개해 VLM verifier로 의미 plan과 가장 일관된 trajectory를 고르는 방식, latent world model로 미래 상태를 투영하고 VLM이 그 표현 위에서 추론하는 방식, policy rollout으로 학습한 보조 verifier로 실행을 성공 쪽으로 편향시키는 방식이 있다. 여러 rollout 평가는 지연을 낳으므로 verifier 없는 steering도 나왔다. diffusion model의 denoising 루프에 충돌 회피 gradient를 직접 주입하거나, VLA의 latent 공간에서 희소 feature 방향을 조작해 신중한 행위 쪽으로 이끈다.

**5.2 runtime 적응과 과제 복원.** 자율성 의존도 순서로 네 단계를 정리한다.

| 단계 | 내용 | 대표 근거 |
|---|---|---|
| 사람 개입과 제어 이양 | 토큰 수준 entropy, 장면 affordance 기반 신뢰도 보정, novelty 탐지, 학습된 정밀도 제약으로 이양 시점을 정한다 | 개입 흔적이 안전 경계를 표시하는 조밀한 신호로 재사용된다 |
| 상호작용 교정 | 환경 불일치를 감시해 선제 수정, 충족되지 않은 precondition을 푸는 교정 action, 언어로 제약과 subgoal 주입, latent 제어 공간 직접 조작, VR 자세 미세 보정 | 과제 구조 자체는 유효하다는 가정 아래 작동한다 |
| 선제와 반응적 replanning | 참조 scene graph와 어긋나면 subtask 경계에서 시퀀스를 수정하거나 제약 위반 시 제어 루프를 벗어나 즉시 replanning. 반응 쪽은 점유된 수납 공간 같은 불일치를 재해석해 다음 시퀀스를 다시 만든다 | 근거 경계는 autonomous recovery가 아니라 continuation feasibility다 |
| 자율 복원 | 진행이 멈춘 지점을 표시하는 milestone 기반 rollback, 의미 검증된 중간 상태로 되살리는 state respawning, episodic memory로 이전 컨텍스트 회수, 실패 상태와 교정 action 쌍을 자동 생성해 학습, 생성 world model로 반사실 실패 합성, on-policy distillation | rollback 근거는 checkpoint 상대적이다 |

구조화된 복원 framework도 정리된다. Behavior Tree 기반은 precondition 검사와 postcondition 감시와 동적 트리 확장으로 빠진 단계를 실행 가능한 구조에 삽입한다. neuro-symbolic 복원은 ontology와 논리 규칙으로 생성된 복원 plan이 제약과 일관되는지 검사하고, predicate 기반 안전 논리는 최근 trajectory와 예상 위험을 실행 가능한 안전 predicate로 바꿔 완화나 replanning을 촉발한다.

**5.3 contact 구간 물리 상호작용 안전.** 세 가지 패러다임으로 전개한다.

1. adaptive compliance. impedance control과 operational space formulation이 뿌리다. 상태 의존 compliance 프로파일 학습, proprioception 이력에서 외력을 추정해 위치와 힘 제어를 함께 모델링, 여러 embodiment에 일반화되는 plug-and-play admittance layer가 최근 방향이다. 능동적 힘 적응에서는 힘과 촉각 신호를 policy 학습에 통합하거나 미래 contact 예측과 반응적 힘 제어를 융합한다. foundation model 쪽은 6축 wrench, 관절 토크, 고차원 촉각 observation을 토큰화해 VLA embedding 공간에 융합하는 표현 학습, 전용 하드웨어 없이 시각과 상태 전이에서 상호작용 단서를 추론하는 force distillation, VLM 추론으로 impedance 파라미터를 조절하거나 계층적 force-aware 프롬프트로 closed-loop 하이브리드 힘-위치 제어를 하는 계열로 나뉜다.
2. formal constraints. 일반화된 contact model 위에 force-constrained CBF를 세워 힘 한계를 강제한다. contact 기반 능동 탐색, 사람과 로봇의 물리적 협업, 소프트 액추에이터의 contact force bounding으로 확장됐다. 보수적 안전 필터가 과제를 멈추지 않도록 operational space 안에서 안전 한계를 정식화하거나 혼잡 환경에서 안전한 밀기를 허용하도록 충돌 회피를 완화한다. 데이터 기반 안전 필터링은 액체 취급이나 변형체 조작처럼 해석적으로 다루기 힘든 경우에 reachability 방식을 학습된 latent 공간으로 확장하고, pre-training된 vision model로 고차원 시각 영역까지 확장한다.
3. hierarchical refinement. 느린 의미 추론과 빠른 물리 동역학 사이의 시간 규모 불일치를 구조로 푼다. 명목 long-horizon planner와 반응적 잔차 제어기로 분리하는 방식이 정밀 contact에서 전역 end-to-end planning을 크게 앞선다고 보고된다. 비마르코프 과제 구조를 1~2Hz로 모델링하고 20Hz 이상의 비대칭 빠른 policy에 고주파 반응을 맡기는 구성, chunked behavior cloning policy를 거친 planner로 두고 한 자릿수 빠른 잔차 policy를 짝짓는 구성, 느린 master 유도와 고주파 미세 교정을 동기화하는 multi-rate 계층이 예시다. phase 기반 구조는 접근, 탐색, 복원, 삽입, 완료처럼 국면을 나누고 contact 인식 phase 예측기로 언제 고주파 잔차 교정이 지배해야 하는지를 정한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

서베이이므로 결과는 새 실험이 아니라 근거 지형의 정리다.

### 4.1 도메인 비교

Table 1은 안전 분석에 쓰일 도메인을 다섯 요인으로 비교한다. navigation은 horizon만 중심 요인이고 semantic은 거의 없으며 contact는 통상 부재다. locomotion은 contact가 중심이지만 semantic이 거의 없다. manipulation만 horizon, semantic, contact, hidden(성공처럼 보이는 중에도 남는 위험), coupling 다섯 가지가 모두 중심이자 반복적으로 나타난다. 이것이 manipulation을 anchor domain으로 고른 근거다.

### 4.2 평가 관행의 빈틈

capability 중심 벤치마크는 결과 수준 근거를 표준화한다. CALVIN, LIBERO, LoHoRavens, FurnitureBench, RoboCerebra가 성공률과 완료율을 보고한다. 진단형 벤치마크는 해상도를 높였다. VLABench는 이진 성공에 progress score를 더하는데, 완료된 subtask 수를 전체 subtask 수로 나눈 값이다. RoboEval은 stage별 진행, 공간 근접도, 충돌 사건을 보고하고 motion smoothness를 평균 Cartesian jerk와 평균 관절 jerk로 근사하며 환경 충돌과 자기 충돌과 물체 미끄러짐 횟수를 센다.

안전 인식 벤치마크는 25종이 Table 5에 정리된다. 근거 대상과 주장 경계로 묶으면 plan-level이 가장 많고(SafePlan, Safety-as-Policy, EARBench, SAFEL, SafeAgentBench, VestaBench), cross-layer를 표방한 것은 SafeMindBench와 IS-Bench 둘, execution-level은 SafeLIBERO다. 제어와 강화학습 쪽 Safe-control-gym과 Safety-gymnasium은 rollout 수준 제약 위반과 cost를 본다.

### 4.3 계층별 지표

| 계층 | 대표 지표 | 정의 요약 |
|---|---|---|
| plan-level | 결함 탐지율, 거부율, recall, F1, 안전 실행률, 실행 가능 planning 비율 | 위험한 plan을 rollout 전에 분류하거나 고치는 능력 |
| policy-level | 누적 safety cost, 장애물 회피율, STL 만족도와 robustness 점수, 최대 제약 위반 | 확정 전 개입이 만든 행위 결과를 사후 요약 |
| runtime-level | TPR, TNR, FPR, AUROC, 경보 시각, 개입률, 개입 조건부 성공률, 복원 성공률 | 실패 탐지의 판별력과 적시성, 개입의 실효성 |
| contact-level | 평균 상호작용 힘, 평균 contact 수직력, 힘 제약 성공률, 과압과 저압 시간 비율, 시행 지속 시간 | 힘과 압력과 접촉 지속의 물리량 |

구체적 수치 사례도 있다. CompliantVLA-adaptor는 30N을 임계로 두고 연속 3스텝 위반이면 실패로 종료한다. Xue 계열은 1~2Hz의 느린 비마르코프 구조와 20Hz 이상의 빠른 policy를 나눈다. 복원 평가에서는 이진 복원 성공률이 지나치게 거칠다는 점을 지적하며 복원 소요 시간과 에너지, 복원 중 2차 위반율, replanning 중 trajectory 매끄러움을 함께 보고해야 한다고 제안한다.

### 4.4 핵심 판정

계층별 지표는 서로 대체할 수 없다. 안전한 상위 plan이 안전한 실행을 보장하지 않고, 누적 safety cost가 낮은 policy도 순간적으로 위험한 contact를 만들 수 있으며, 복원에 성공해도 중간 과정이 위험했을 수 있다. 따라서 현재 근거 지형은 제한된 계층별 주장들의 모음이지 end-to-end 안전 논증이 아니다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 논문이 지목한 빈틈

- policy-time 안전의 근거가 가장 얇다. 제약 주입과 정합은 empirical이고 분포 의존적이며, long-horizon VLA manipulation에 대한 결정론적 또는 형식적 보장은 여전히 열려 있다.
- contact 구간 long-horizon manipulation의 formal 근거가 약하다. 해석적 contact model이 단순화에 기대거나 uncertainty observer로 불일치를 보정하는 수준이다.
- uncertainty 기반 개입이 미성숙하다. 보정된 신호를 어떤 개입 의미로 연결할지에 대한 원칙이 없다. 약한 의미 불확실성은 확인 요청을 정당화할 뿐 즉각적 물리 shielding까지는 아니고, 보정된 실패 경보는 정지와 되감기와 이양 중 무엇을 택할지를 특정하지 못한다.
- manipulation 전용 안전 벤치마크가 부족하다. 안전 평가가 plan 선별, rollout 수준 안전 성공, runtime 탐지, 복원, contact 품질로 흩어져 있다.

### 5.2 cross-layer 경로 다섯

1. 추상화 계층 연결. 제약이 planning 계층에서 도입될 때 그것이 의미, 기하, 시간, 물리 중 무엇인지 알 수 있을 만큼의 메타데이터를 이후 계층에 넘겨야 한다. "붉은 영역을 피하라"는 심볼 영역 이름과 기하 여유와 trajectory 배제를 모두 필요로 하고, "부드럽게 삽입하라"는 contact 국면 인식과 힘 한계와 compliance 파라미터를 필요로 한다.
2. 현실 격차를 건너는 안전 grounding. sim2real을 성능 전이가 아니라 안전 근거 문제로 다룬다. 과제 성공이 전이되어도 잘못된 안전 가정이 함께 전이될 수 있다. 물체 배치 정확도를 유지하면서 힘 한계를 위반하거나, 충돌 회피는 지키면서 복원 여유를 잃거나, 명목 성공은 유지하면서 실제 하드웨어에서 개입이 너무 늦을 수 있다.
3. embodiment와 policy model 사이의 안전 전이. 사람을 피하거나 깨지기 쉬운 물체를 조심스럽게 다루는 의미 사전 지식은 비교적 잘 전이되지만 공간 제약은 대상 로봇의 기하와 센서 보정과 기구학과 적재량에 맞춰 다시 grounding해야 하고 contact 관련 주장은 embodiment 의존성이 가장 크다. policy를 fine-tuning하거나 distillation하거나 정합하거나 post-training할 때마다 재검증 경계를 명시해야 한다.
4. 개입 선택을 위한 보정된 위험 해석. 형식적으로 검사된 제약 위반, 통계적으로 보정된 실패 탐지기, 사람의 교정 신호는 같은 근거가 아니다. 어떤 신호가 어떤 지원 방식을 어떤 범위에서 촉발해야 하는지에 대한 체계적 대응이 빠져 있고, 분포 변화가 이 대응의 취약성을 키운다.
5. procedural safety observability. 최종 결과만이 아니라 rollout의 안전 이력을 남겨야 한다. 안전한 성공, 안전한 실패, 위험한 성공, 위험한 실패를 구분하려면 hazard의 발생, 안전 여유가 깨지기 전의 완화 효과, contact 한계 유지, 개입의 적시성을 기록하는 cross-layer 안전 기록이 필요하다.

### 5.3 인접 분야 기회 셋

- semantic과 multimodal safety. RLHF식 지시문 튜닝, Constitutional AI, Llama Guard 같은 가드레일 모델, MM-SafetyBench 같은 다중 모달 벤치마크를 상위 의미 안전 기구로 재해석한다. VLM의 물체 환각 연구가 특히 관련되는데, 환각된 물체가 조작 대상 선택이나 affordance 추론이나 precondition 정의에 쓰이면 안전 문제로 바뀐다. 제안 방향은 정적 텍스트-이미지 필터링에서 동적 long-horizon 위험 taxonomy로 확장하는 것과, 수동적 거부 필터가 아니라 스스로 문맥 불확실성을 정량화해 사용자에게 먼저 묻는 능동적 유도다.
- 배포 보증과 사고 학습. Goal Structuring Notation, UL 4600, AMLAS 같은 보증 공학 관행은 안전 근거가 벤치마크 성능이 아니라 명시적 주장 중심으로 구조화되어야 한다고 강조한다. model card와 datasheets for datasets를 본떠 policy card나 로봇 데이터 datasheet로 어떤 embodiment와 센서와 과제와 hazard와 contact 영역과 실패 사례가 학습과 평가에 포함됐는지 기록하자고 제안한다. 사고 학습 쪽은 파국적 실패뿐 아니라 아차 사고, 위험한 성공, 불필요한 사람 개입, 지연된 이양, contact 이상까지 기록하자고 제안한다.
- 대규모 데이터와 시뮬레이션과 평가 인프라. RoboNet, BridgeData V2, Open X-Embodiment, DROID, RH20T, AgiBot World가 경험의 규모와 다양성을 늘렸지만 성능 데이터가 곧 안전 데이터는 아니다. 성공한 전문가 시연 데이터(demonstration)만으로 학습하면 멈추거나 되묻거나 실패에서 복원하는 능력을 배우지 못한다. LLM의 safety pre-training 연구와 같은 맥락에서 hazard, 아차 사고, 실패 시도, contact 측정, 위험한 성공을 포착하는 데이터 인프라가 필요하다고 본다. 자율주행의 CARLA와 Scenic 같은 시나리오 기반 평가가 드문 long-tail 사건을 배포 전에 시험하는 모델로 제시된다.

### 5.4 서베이 자체의 한계

정량 메타분석이나 재현 실험은 수행하지 않았다. 문헌 배정이 각 논문의 "가장 강한 안전 관련 주장" 기준이라 여러 계층에 걸친 연구는 한 계층으로 단순화된다. 저자들도 인정하듯 corpus에는 아카이브 상태가 확정되지 않은 preprint가 다수 포함되어 있다.

## 6. 관련 연구 (Related Work)

Table 2가 인접 서베이 9편 대비 위치를 밝힌다.

| 서베이 | 주된 범위 | 이 논문이 메우려는 빈틈 |
|---|---|---|
| Liu et al. (2025c) | 포괄적 embodied AI. perception, 상호작용, sim2real 적응 | manipulation 고유의 안전 근거 |
| Firoozi et al. (2025) | 로보틱스용 foundation model. 응용, uncertainty, 안전 평가 | 안전을 lifecycle 수준 조직 기준으로 삼기 |
| Kawaharazuka et al. (2025) | 로보틱스용 VLA. 아키텍처, 데이터셋, 벤치마크 | 성능 지표를 넘어선 안전 |
| Zheng et al. (2025) | 물체 중심 manipulation | 안전 근거를 1차 분석 기준으로 삼기 |
| Tsuji et al. (2025) | contact 구간 imitation learning | manipulation의 long-horizon 안전 근거 |
| Zhang et al. (2025b) | 안전한 contact 구간 학습. 안전 탐색, shielding | planning과 policy와 평가 수준 근거의 통합 |
| Gu et al. (2024) | safe RL. 제약, 이론, 벤치마크 | policy 학습 정식화를 넘어선 안전 |
| Tan et al. (2025) | 신뢰 가능한 embodied AI. 성숙도 수준, 원칙 | manipulation으로 도메인을 고정한 심층 분석 |
| Kojima et al. (2025) | 물리적 risk 통제. 배포 전, 사고 전, 사고 후 | 과제와 policy와 실행 수준 근거 사이의 경계 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| intervention locus | 안전 기법이 embodied 파이프라인의 어느 시점에 개입하는지를 가리키는 첫 번째 조직 기준. planning-time, policy-time, execution-time 셋으로 나눈다 |
| evidence boundary | 보고된 안전 결과가 실제로 무엇을 뒷받침하고 무엇을 증명하지 않는지를 구분하는 두 번째 조직 기준 |
| risk pressure | 기법과 그것이 겨냥하는 안전 우려를 잇기 위한 서술 어휘. 이 서베이는 여섯 가지를 쓴다 |
| procedural safety | 과제 순서, precondition, 제약, 회복 가능 상태를 rollout 전체에 걸쳐 유지하는 안전 |
| operational safety | 자율 실행을 계속하는 것이 더 이상 정당화되지 않는 상태를 피하는 안전 |
| semantic safety | 위험한 지시문, 잘못 grounding된 목표, 환각된 affordance, 누락된 제약에 관한 안전 |
| shielding | 전용 안전 layer가 policy의 제안을 감시해 선택지를 제한하거나 명시적 명세에 맞게 교정하는 기법. policy 재학습 없이 작동한다 |
| runtime policy steering | 실패가 완전히 드러나기 전에 예측 검증이나 학습된 신호로 더 위험이 낮은 후보를 고르는 실행 중 개입 |
| recoverability | 안전한 계속 진행이나 정상적 종료가 여전히 가능한 상태인지를 가리키는 성질. 이 서베이는 그 상실을 cascading failure의 핵심 결과로 본다 |
| procedural safety observability | rollout의 최종 결과가 아니라 위험의 발생과 전파와 탐지와 완화 이력을 기록해 안전 주장을 뒷받침할 수 있게 만드는 평가 요건 |
| abstraction gap | formal guarantee가 명시된 모델 안에서만 성립하고 실제 세계와 어긋날 수밖에 없는 간극 |
| vacuous satisfaction | 함의형 요구의 전제가 발생하지 않아 의도한 대응 없이도 명세가 형식상 만족되는 상태 |

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | "계층을 건너 위험이 쌓이는 long-horizon manipulation 동기 예시" | caption-region | ★ wiki 권장 (motivation) |
| fig02 | 8 | "intervention locus 조직도" | caption-region | ★ wiki 권장 (framework) |
| fig03 | 13 | "planning-time safety 3단계" | caption-region | ★ wiki 권장 (method) |
| fig04 | 19 | "policy-time safety 개관" | caption-region | ★ wiki 권장 (method) |
| fig05 | 24 | "execution-time safety 개관" | caption-region | ★ wiki 권장 (method) |
| fig06 | 44 | "7장 로드맵과 인접 분야 기회" | caption-region | ★ wiki 권장 (future) |
| tab01 | 4 | "도메인 비교 표" | table-region | 본문 표로 재작성 |
| tab02 | 4 | "인접 서베이 포지셔닝 표" | table-region | 본문 표로 재작성 |
| tab03 | 9 | "근거 범주 taxonomy 표" | table-region | 본문 표로 재작성 |
| tab04 | 11 | "lifecycle intervention map" | manual | 가로 방향 원본이라 임베드 부적합 |
| tab05 | 36 | "벤치마크 25종 정리표" | manual | 가로 방향 원본이라 임베드 부적합 |
