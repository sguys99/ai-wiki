---
title: "Memory Intelligence Agent"
type: paper
year: 2026
category: agents
raw_path: raw/papers/qiao-2026-memory-intelligence-agent.pdf
raw_filename: "qiao-2026-memory-intelligence-agent.pdf"
source_collection: external
tags: [memory, deep-research-agent, reinforcement-learning, test-time-learning, multimodal, planner-executor, GRPO]
authors: "Jingyang Qiao, Weicheng Meng, Yu Cheng, Zhihang Lin, Zhizhong Zhang, Xin Tan, Jingyu Gong, Kun Shao, Yuan Xie"
arxiv_id: "2604.04503"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig01.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig01.png
    caption: "frontier LLM과 MIA 결합본의 정확도를 비교한 4분할 막대그래프. LiveVQA와 HotpotQA에서의 개선폭, 그리고 7개 데이터셋에서 대형 모델과 memory 프레임워크 대비 위치를 함께 담았다"
    page: 2
    bbox_norm: [0.1344, 0.0781, 0.8585, 0.3678]
    strategy: caption-region
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig02.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig02.png
    caption: "복합 multi-hop 질문 하나가 MIA를 통과하는 전 과정 예시. 입력과 정답, Planner의 계획과 replan, Executor의 tool call 기록을 세 영역으로 나눠 보여준다"
    page: 4
    bbox_norm: [0.1483, 0.0622, 0.8517, 0.4835]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig03.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig03.png
    caption: "MIA의 3단계 agent loop 구조도. 왼쪽 메모리 검색에서 시작해 가운데 Planner와 Executor 협업을 거쳐 오른쪽 Judger 평가와 Memory Manager 저장으로 이어진다"
    page: 5
    bbox_norm: [0.1636, 0.0622, 0.8364, 0.384]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig04.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig04.png
    caption: "Memory Manager가 쓰는 두 프롬프트 전문. 이미지를 50단어 캡션으로 줄이는 지시문과 trajectory를 단계별 workflow로 추상화하는 지시문이다"
    page: 7
    bbox_norm: [0.0875, 0.0305, 0.9146, 0.2992]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig05.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig05.png
    caption: "test-time learning의 메모리 프레임워크. Planner가 plan 4개를 rollout하고 Router가 최적 plan을 고르며, reward와 advantage가 parametric memory와 non-parametric memory를 동시에 갱신한다"
    page: 9
    bbox_norm: [0.1252, 0.073, 0.8748, 0.3774]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig06.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig06.png
    caption: "학회 심사를 모사한 비지도 평가 구조. reviewer 3명이 각각 구조화 JSON 심사를 내고 Area Chair가 최종 채택 또는 반려를 결정한다"
    page: 11
    bbox_norm: [0.1137, 0.073, 0.8863, 0.3036]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig07.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig07.png
    caption: "Planner와 Executor의 학습 곡선 6장. 왼쪽은 batch별 reward 평균, 가운데는 응답 길이, 오른쪽은 TTL 단계에서 데이터셋별 응답 길이가 어떻게 갈라지는지를 담았다"
    page: 15
    bbox_norm: [0.1062, 0.349, 0.8987, 0.5813]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig08.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig08.png
    caption: "폐쇄형 Executor 3종의 ReAct 대비 MIA 성능 레이더 차트. LiveVQA와 HotpotQA 두 벤치마크에서 여섯 조합의 정확도를 겹쳐 그렸다"
    page: 16
    bbox_norm: [0.5347, 0.2297, 0.8654, 0.4791]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/qiao-2026-memory-intelligence-agent/fig09.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/fig09.png
    caption: "메모리 방법 8종의 tool call 횟수 분포를 겹친 산점도와 반바이올린 도표. 점 색이 정확도이고 회색 점이 실패한 실행이다"
    page: 17
    bbox_norm: [0.106, 0.019, 0.894, 0.3048]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab01.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab01.png
    caption: "Executor 학습 rollout 절차 7단계 표. 초기 plan 수령부터 Judger 평가와 1회 한정 replan을 거쳐 최종 응답까지의 분기를 적었다"
    page: 8
    bbox_norm: [0.1053, 0.3606, 0.8965, 0.938]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab02.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab02.png
    caption: "Planner 학습 rollout 절차 7단계 표. Planner가 스스로 reflect 여부를 판정하고 보충 plan을 만드는 흐름이 Executor 표와 다르다"
    page: 9
    bbox_norm: [0.1053, 0.5755, 0.8953, 0.938]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab03.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab03.png
    caption: "멀티모달 데이터셋 7종의 전체 평가 결과표. direct answer, search agent, memory 기반 search agent 세 묶음으로 나뉘어 있다"
    page: 14
    bbox_norm: [0.1054, 0.1137, 0.8973, 0.938]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab04.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab04.png
    caption: "텍스트 전용 데이터셋 4종의 전체 평가 결과표. 비지도 MIA가 supervised baseline 대부분을 앞서는 구간이 함께 보인다"
    page: 15
    bbox_norm: [0.1485, 0.1137, 0.8515, 0.3306]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab05.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab05.png
    caption: "멀티모달 ablation 결과표. Base에서 TTL까지 구성 요소를 하나씩 더한 7개 설정의 데이터셋별 정확도다"
    page: 17
    bbox_norm: [0.1053, 0.3761, 0.8953, 0.938]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab06.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab06.png
    caption: "텍스트 전용 ablation 결과표. Only Memory 설정만 Base보다 평균이 낮아지는 양상이 나타난다"
    page: 18
    bbox_norm: [0.169, 0.0999, 0.831, 0.2835]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab07.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab07.png
    caption: "비지도 설정의 자기 진화 결과표. Base, planning과 reflection만 켠 설정, 비지도 memory만 켠 설정, 그리고 epoch 1에서 3까지의 정확도를 담았다"
    page: 19
    bbox_norm: [0.1056, 0.0999, 0.8974, 0.938]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/qiao-2026-memory-intelligence-agent/tab08.png
    raw: raw/papers/qiao-2026-memory-intelligence-agent-figures/tab08.png
    caption: "실험에 쓴 데이터셋 13종의 설정표. 모달리티, 예시 개수, 출처, 학습과 평가 용도를 함께 적었다"
    page: 27
    bbox_norm: [0.2244, 0.0999, 0.7719, 0.3281]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

Deep Research Agent용 메모리 프레임워크 MIA. Manager-Planner-Executor 3-agent 구조로 historical trajectory를 non-parametric memory(압축된 workflow 저장소)와 parametric memory(Planner 가중치)로 분리하고, GRPO 기반 2단계 교대 강화학습과 online test-time learning을 결합한다. Qwen2.5-VL-7B Executor 기준 멀티모달 7개 데이터셋 평균 53.6%로 memory baseline 최고값(Memento 48.1%)을 5.5%p 앞서고, 텍스트 전용 4개 데이터셋 평균 53.5%로 Memento를 7.5%p 앞선다.

## 1. 자료 정보 (Document Information)

- **저자**: Jingyang Qiao(공동 1저자), Weicheng Meng(공동 1저자), Yu Cheng, Zhihang Lin, Zhizhong Zhang(corresponding), Xin Tan, Jingyu Gong, Kun Shao, Yuan Xie(project leader)
- **소속**: East China Normal University, Shanghai Innovation Institute, Harbin Institute of Technology, Xiamen University, Shanghai Artificial Intelligence Laboratory, 그리고 무소속 연구자
- **arXiv**: 2604.04503v4, 2026-04-19 게재, cs.AI
- **공개 자료**: 코드 https://github.com/ECNU-SII/MIA , 모델 https://huggingface.co/LightningCreeper/MIA , 데이터셋 https://huggingface.co/datasets/LightningCreeper/MIA
- **에피그라프**: "Never memorize something that you can look up." (Albert Einstein). 논문이 메모리 압축 철학의 비유로 첫 페이지에 실었다.
- **분량**: 본문 19페이지 + 부록 15페이지(총 34페이지). 부록 A에서 G가 학습 설정, 평가 설정, baseline 구현, 메모리 검색 수식, 데이터셋 명세, 알고리즘 3종, 프롬프트 전문을 담는다.

## 2. 주요 기여 (Key Contributions)

1. **Manager-Planner-Executor 구조**. Memory Manager(frozen Qwen3-32B + memory buffer, 학습 대상 아님), Planner(Qwen3-8B, 학습 대상), Executor(Qwen2.5-VL-7B, 학습 대상)로 역할을 셋으로 나눈다. 논문은 이를 hippocampus를 모사한 brain-inspired 설계로 소개한다.
2. **2단계 교대 강화학습**. GRPO를 두 번 적용한다. Stage 1은 Planner를 frozen server로 두고 Executor를 학습시키고, Stage 2는 학습된 Executor를 frozen server로 두고 Planner를 학습시킨다.
3. **continual test-time learning(TTL)**. 추론 batch마다 exploration, 메모리 저장, 파라미터 갱신을 동시에 수행한다. offline 학습과 달리 미리 모아둔 memory context나 multi-epoch rollout에 의존하지 않는다.
4. **양방향 메모리 변환 루프**. trajectory를 압축 workflow와 이미지 캡션으로 바꿔 non-parametric memory에 넣고, 그 batch로 Planner를 재학습해 parametric memory로 내재화한 뒤 memory 단위를 선택적으로 비운다.
5. **Reviewer-Area Chair 비지도 판정**. ground truth가 없을 때 Qwen3-32B 4개 인스턴스가 학회 심사를 모사해 trajectory 품질을 판정한다. 단일 프롬프트 LLM-as-a-judge의 "hallucinated objectivity"를 우회하려는 설계다.
6. **11개 벤치마크 실험**. 멀티모달 7종과 텍스트 전용 4종에서 memory baseline 대비 우위를 보이고, 폐쇄형 Executor 3종에 Planner만 붙여도 개선이 나타난다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 세 에이전트의 역할

| 에이전트 | backbone | 학습 여부 | 역할 |
|---|---|---|---|
| Memory Manager | Qwen3-32B + memory buffer | frozen | 이미지 캡션 생성, trajectory를 workflow로 압축, 메모리 검색과 갱신 |
| Planner | Qwen3-8B | Stage 2와 TTL에서 학습 | 검색된 trajectory를 참고해 step-by-step plan 생성, reflection 판정 |
| Executor | Qwen2.5-VL-7B | Stage 1에서만 학습 | plan에 따라 ReAct loop로 도구를 호출하고 답을 만든다 |

Router는 별도 모델이 아니다. Memory Manager와 같은 pre-trained LLM을 다른 프롬프트로 호출한다.

### 3.2 3단계 agent loop

매 query가 메모리 검색, 협업 추론, 경험 통합 세 단계를 지난다. Memory Manager가 비어 있는 초기에는 검색 단계를 건너뛰고, trajectory가 충분히 쌓인 뒤부터 검색이 작동한다.

**메모리 검색**. Memory Manager가 이미지를 50단어 이내 캡션으로 바꾼 뒤 텍스트 기준으로 메모리 단위를 점수화한다. 임베딩은 sup-simcse-bert-base-uncased의 마지막 hidden state를 mean pooling하고 L2 정규화해 얻는다.

| 항목 | 수식 | 뜻 |
|---|---|---|
| Semantic Similarity | `Sim_i = 0.8·sim(question) + 0.2·sim(caption)` | 질문과 캡션 코사인 유사도의 가중합. 캡션이 없으면 질문 유사도만 쓴다 |
| Value Reward | `Val_i = s_i / (u_i + 1)` | 성공 횟수를 사용 횟수로 나눈 경험적 성공률 |
| Frequency Reward | `Freq_i = 1 / (u_i + 1)` | 사용이 적은 메모리에 가점을 줘 long-tail 탐색을 유도 |
| 최종 점수 | `Score = 0.7·Sim_norm + 0.3·Val + 0.3·Freq` | Sim은 현재 메모리 버킷 안에서 min-max 정규화한 값 |

성공 trajectory(positive paradigm)와 실패 trajectory(negative constraint)를 함께 검색해 Planner에게 대조 context로 준다. 메모리 단위는 modality와 질문 범주로 나뉘어 관리되고, 각 단위는 질문, 이미지 캡션, judgment label, 사용 횟수 u_i, 성공 횟수 s_i를 함께 보관한다. 새 단위 삽입 시 두 카운터는 0으로 초기화된다.

**협업 추론**. Planner는 few-shot CoT로 복합 질문을 실행 가능한 하위 목표로 쪼갠다. Executor는 그 plan을 받아 ReAct loop를 실행한다. 도구는 두 개뿐이다.

| 도구 | 반환 | 제약 |
|---|---|---|
| `search` | 학습 시 로컬 wiki25에서 top-3 passage, 평가 시 Serper 온라인 검색에서 top-5 결과 | 이미지를 지칭하지 않는 완결된 텍스트 질의만 허용 |
| `web_image_to_image_search` | 유사 이미지 top-3 | 한 task에서 1회만 호출 가능. 프롬프트가 위반 시 강한 감점을 명시한다 |

Executor가 최종 답을 낸 뒤 실행 상태를 Planner에 보고하면 Planner가 Reflect-Replan을 판정한다. 추론 시간을 줄이기 위해 replan은 1회만 발동한다. Planner 프롬프트는 replan을 발동할 조건 네 가지를 나열한다. 도구 지원이 없거나 불분명한 경우, 추론에 공백이나 가정이 있는 경우, 답이 질문을 온전히 다루지 못한 경우, 정확성이나 명료성에 의심이 있는 경우다.

**경험 통합**. LLM Judger(Qwen3-32B)가 최종 결과를 평가한다. Memory Manager는 이미지를 캡션으로, 장황한 trajectory를 구조화 workflow 요약으로 압축한다. workflow는 "action purpose (input → output)" 형식의 번호 붙은 단계로, 예를 들어 "1. Use visual search to generate candidate locations. 2. Use text search to narrow hypothesis. 3. Use text search to verify with specific query" 식이다. 새 메모리와 기존 메모리의 semantic similarity가 높으면 기존 단위를 교체하고, 유사 단위가 없으면 새 단위로 저장한다. 관련 단위의 value reward와 frequency count도 같이 갱신한다. 마지막으로 현재 batch의 질문, trajectory, 결과로 Planner를 재학습해 episodic memory를 parametric memory로 내재화하고, 학습 후 메모리 단위를 선택적으로 비워 메모리 폭발을 막는다.

### 3.3 2단계 교대 강화학습

| 구분 | Stage 1 | Stage 2 |
|---|---|---|
| 학습 대상 | Executor | Planner |
| frozen server | Planner | 학습된 Executor |
| 목표 | plan 이해와 수행, tool calling, replan 지시 파싱 | 메모리 흡수, plan 생성, feedback 기반 reflection |
| reward | `0.7·r_correct + 0.2·r_tool + 0.1·r_format` | `0.7·r_correct(final) + 0.2·r_correct(intermediate) + 0.05·r_reflect + 0.05·r_format` |
| 목적함수 | Eq.(1), memory context 없음 | Eq.(3), memory context m 조건부 |

Stage 1의 r_tool은 표준 형식의 tool call이 성공하면 1, 아니면 0이다. r_format은 출력 형식이 규격을 지키면 1이다. r_correct는 LLM Judger 판정으로 1 또는 0을 받는다.

Stage 2의 reflection reward는 필요한 때만 reflect하도록 유도한다. 첫 응답이 맞고 reflection을 발동하지 않았거나, 첫 응답이 틀리고 reflection을 발동한 경우에만 1을 준다. 그 밖의 조합은 0이다.

두 목적함수는 모두 token loss masking `I(y_i,t)`를 쓴다. policy가 생성한 token은 1, 도구나 상대 에이전트가 생성한 token은 0이 되어 학습에서 제외된다. KL 정규화 항 `βD_KL[π_θ||π_ref]`가 붙지만 실험에서는 KL 계수를 0.0으로 두었다.

**Executor rollout 절차(Table 1, Algorithm 1)**

| 단계 | 동작 |
|---|---|
| 1 | 질문을 Planner에 주고 초기 plan을 받는다 |
| 2 | 질문, 이미지, 초기 plan을 policy 모델에 입력한다 |
| 3 | 현재 상태로 `<think>`와 action(`<tool_call>` 또는 `<answer>`)을 생성한다 |
| 4 | 도구를 실행하고 관측을 붙인 뒤 3단계로 돌아온다 |
| 5 | LLM Judger가 후보 답을 평가한다. 맞으면 7단계로 간다 |
| 6 | 상호작용 이력을 Planner에 주고 수정 plan을 받아 3단계로 간다. 최대 1회만 발동한다 |
| 7 | 최종 응답을 출력한다 |

**Planner rollout 절차(Table 2, Algorithm 2)**. Planner 학습에서는 판정 주체가 다르다. 5단계에서 Planner가 후보 trajectory를 스스로 분석해 종료할지 reflection할지 정하고, reflection을 고르면 보충 plan을 만들어 Executor가 기존 trajectory를 이어간다. Executor 학습 rollout에서 replan 발동을 결정하던 LLM Judger의 자리를 Planner가 대신한다.

### 3.4 Test-time learning

TTL은 batch 하나마다 다음 순환을 돈다. Planner가 G개 후보 plan을 rollout하고, Executor가 각 plan으로 환경과 상호작용해 G개 trajectory를 만들고, LLM Judger가 정답 여부로 trajectory를 성공 집합과 실패 집합으로 나눈다.

**non-parametric memory 추출**. 성공 집합이 비어 있지 않으면 실행 경로가 가장 짧은 trajectory를 골라 추론 효율을 장려한다. 실패 집합이 비어 있지 않으면 무작위로 하나를 뽑아 다양한 오류 패턴을 담는다. 두 trajectory를 구조화 workflow 요약으로 압축해 Workflow Memory에 저장한다.

**parametric memory 갱신**. 같은 rollout 집합의 reward로 group 내 advantage를 계산한다. `Â_i = (R_i - μ_R) / (σ_R + ε)`로, μ_R과 σ_R은 reward 집합의 평균과 표준편차다. Figure 5의 예시는 reward 1.0, 0.8, 0.2, 0.1에 대해 advantage 1.237, 0.716, -0.872, -1.107을 보여준다. 파라미터 갱신은 Planner에만 적용한다. Executor는 완전히 얼려 안정적인 실행 서비스로 배치한다.

**Meta Plan Memory와 Router**. G개 rollout 안에 성공과 실패가 모두 있으면 가장 짧은 정답 plan과 무작위 오답 plan을 대조 쌍으로 별도 메모리에 저장한다. rollout 생성 후 Router가 Meta Plan Memory의 예시를 in-context 참조로 삼아 후보 중 최고 품질 plan을 골라 최종 응답으로 낸다. 논문은 이 선택 과정이 label leakage를 일으키지 않는다고 명시한다.

핵심은 파라미터 갱신과 non-parametric memory 추출이 동시에 일어난다는 점이다. 논문은 이를 탐색 과정을 끊지 않는 seamless online learning paradigm이라고 부른다.

### 3.5 비지도 자기 진화

TTL의 자기 진화 흐름은 exploration → 환경 feedback 획득 → non-parametric memory 추출 → parametric memory 갱신이다. 이 흐름은 ground truth가 있을 때 온전히 작동한다. ground truth가 workflow의 positive와 negative label을 정하고 Planner 학습의 reward 신호를 준다. 개방 환경에서는 그런 감독 신호를 기대하기 어렵다.

논문은 대안으로 학회 심사를 모사한 4-agent 평가 구조를 제안한다. 네 인스턴스 모두 Qwen3-32B이고 프롬프트만 다르다.

| 심사자 | 판정 대상 | Area Chair 프롬프트의 importance weight |
|---|---|---|
| Reviewer of Reasoning and Logical Consistency (R_L) | 전제에서 결론까지의 인과 사슬, 잘못된 추론과 미명시 가정 | 0.5 |
| Reviewer of Information Sourcing and Credibility (R_C) | 검색 내용의 오해와 사실 환각, 불확실한 claim 표시 | 0.3 |
| Reviewer of Result Validity (R_V) | 최종 응답의 완전성과 실제 완료 상태 | 0.2 |
| Area Chair | 세 심사의 구조화 JSON을 meta-analysis해 단일 글자 "A"(correct) 또는 "B"(incorrect)를 출력 | 해당 없음 |

각 심사자는 `score`, `verdict`, `evidence_quotes` 필드를 담은 JSON을 낸다. 논문이 드는 세 가지 이점은 다음과 같다. Dimensional Orthogonality는 판정 차원을 분리해 error bleeding을 막는다. Evidence-Based Accountability는 evidence quote나 atomic requirement 제출을 의무화해 블랙박스 평점을 감사 가능한 기록으로 바꾼다. Conflict Resolution via Meta-Decision은 단순 평균이 아니라 fatal flaw를 찾아 치명적 실패 모드를 우선한다.

Dimensional Orthogonality를 설명하는 문장은 분리 대상 차원을 Logic, Format, Factuality로 적는다. 실제 배치된 심사자 세 명의 담당(Logic, Credibility, Validity)과 이름이 어긋나므로 인용 시 주의가 필요하다.

### 3.6 학습과 평가 설정

| 항목 | Executor | Planner | TTL |
|---|---|---|---|
| 초기화 | Qwen2.5-VL-7B-Instruct | Qwen3-8B | supervised는 학습된 Planner, unsupervised는 Qwen3-8B |
| 학습 데이터 | FVQA-train | FVQA-train(이미지 제거) + MATPO | 평가 batch 자체 |
| GPU | 8장 | 4장 | 기재 없음 |
| learning rate | 1e-6 | 1e-6 | 1e-6 |
| batch size | 128 | 128 | 기재 없음 |
| rollout 수 | 질의당 8 | 질의당 8 | 샘플당 4 |
| epoch | 8 | 4 | 1 |
| 최대 prompt / response | 16384 / 16384 | 24576 / 8192 | 기재 없음 |
| tool use | 최대 assistant 10턴, user 10턴, 도구 응답 4096토큰 | tool-free | 평가 도구 설정 사용 |

학습 프레임워크는 veRL이고 rollout은 SGLang 비동기, 추론은 vLLM에 temperature 0이다. 학습용 텍스트 검색기는 wiki25 코퍼스를 E5-base-v2 임베딩과 FAISS 인덱스로 색인한 오프라인 retriever다. 이미지 검색은 ImgBB로 공개 URL을 만든 뒤 Serper image search API를 호출하고 결과를 로컬에 캐시해 오프라인으로 쓴다. 검증 데이터는 두 단계 모두 FVQA-test다.

baseline 공정 비교를 위해 Executor를 세 가지 프롬프트 변형으로 각각 학습시켰다. no extra prompt는 No Memory용, long-context memory prompt는 RAG, Mem0, A-Mem용, guideline prompt는 ReasoningBank, ExpeL, Memento, MIA용이다. 부록 C가 두 번째 변형을 long-context memory prompt로 부르고 본문 4.1절이 workflow memory prompt로 부르는 명칭 차이가 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

Table 3의 열 구분에서 in-domain은 FVQA-test 하나뿐이고 나머지 여섯은 out-of-domain이다. FVQA-train으로만 학습했기 때문이다. Table 4의 텍스트 전용 4종은 모두 out-of-domain이다.

### 4.1 멀티모달 벤치마크 (Table 3)

| Model | FVQA-test | InfoSeek | SimpleVQA | LiveVQA | MMSearch | In-house 1 | In-house 2 | 평균 |
|---|---|---|---|---|---|---|---|---|
| GPT-5.4 (direct) | 50.8 | 43.6 | 55.5 | 21.5 | 44.4 | 45.1 | 23.0 | 40.6 |
| Gemini-3-Flash (direct) | 69.3 | 69.0 | 73.7 | 26.0 | 69.0 | 52.5 | 25.5 | 55.0 |
| GPT-4o (direct) | 41.7 | 42.7 | 46.6 | 26.9 | 22.2 | 25.6 | 17.2 | 31.8 |
| Gemini-2.5-Pro (direct) | 37.2 | 37.0 | 53.4 | 27.7 | 26.9 | 30.8 | 19.6 | 33.2 |
| Qwen2.5-VL-7B+ReACT | 34.2 | 28.3 | 35.8 | 10.7 | 21.1 | 9.5 | 17.8 | 22.5 |
| Qwen2.5-VL-32B+ReACT | 51.3 | 38.0 | 48.5 | 24.8 | 27.3 | 28.8 | 26.5 | 35.0 |
| MMSearch-R1 | 58.0 | 49.0 | 55.3 | 28.3 | 43.9 | 13.6 | 21.8 | 38.6 |
| Deepeyes2 | 60.6 | 51.1 | 59.4 | 없음 | 63.7 | 없음 | 없음 | 산출 불가 |
| No Memory | 61.4 | 56.8 | 63.0 | 33.0 | 55.6 | 15.9 | 26.9 | 44.7 |
| RAG | 60.5 | 55.9 | 60.5 | 31.7 | 54.4 | 12.5 | 25.5 | 43.0 |
| Mem0 | 55.6 | 48.2 | 56.7 | 24.5 | 43.3 | 12.5 | 23.2 | 37.7 |
| A-Mem | 38.5 | 36.0 | 51.6 | 22.6 | 40.9 | 12.5 | 24.2 | 32.3 |
| ReasoningBank | 64.7 | 59.5 | 60.4 | 34.2 | 57.3 | 18.6 | 29.3 | 46.3 |
| ExpeL | 64.2 | 58.6 | 62.5 | 34.1 | 61.4 | 19.7 | 28.3 | 47.0 |
| Memento | 66.3 | 57.3 | 61.9 | 36.7 | 61.4 | 22.7 | 30.7 | 48.1 |
| Unsupervised MIA | 65.1 | 64.3 | 63.3 | 40.1 | 60.2 | 29.8 | 31.1 | 50.6 |
| MIA | 69.6 | 65.5 | 64.9 | 43.1 | 62.6 | 31.8 | 37.7 | 53.6 |

- MIA 평균 53.6%는 memory baseline 최고값 Memento 48.1%를 5.5%p 앞선다. 데이터셋별로는 FVQA-test +3.3%p, LiveVQA +6.4%p, In-house 1 +9.1%p다.
- RAG(43.0%), Mem0(37.7%), A-Mem(32.3%)은 No Memory(44.7%)보다 낮다. 긴 memory context가 noise를 들여온다는 논문의 가설과 부합한다.
- 열 단위로 보면 MIA가 최고값을 차지한 열은 FVQA-test, LiveVQA, In-house 2 셋뿐이다. Gemini-3-Flash가 InfoSeek, SimpleVQA, MMSearch, In-house 1 넷에서 최고값이다. 논문 본문도 MIA가 Gemini-3-Flash를 넘었다고 쓰지 않고 "performance close to that of Gemini-3-Flash"라고 적는다.
- MIA는 GPT-5.4를 7개 중 6개에서 앞선다. 유일한 예외는 In-house 1(GPT-5.4 45.1% 대 MIA 31.8%)이다.
- 초록의 "average improvement of 31%"는 Qwen2.5-VL-7B+ReACT(22.5%) 대비 31.1%p, "outperforming Qwen2.5-VL-32B by a margin of 18%"는 Qwen2.5-VL-32B+ReACT(35.0%) 대비 18.6%p다. 두 값 모두 상대 비율이 아니라 정확도 차이이므로 %p로 읽어야 한다.

### 4.2 텍스트 전용 벤치마크 (Table 4)

| Model | SimpleQA | 2Wiki | HotpotQA | GAIA | 평균 |
|---|---|---|---|---|---|
| No Memory | 40.7 | 61.2 | 51.0 | 11.7 | 41.2 |
| RAG | 38.3 | 56.3 | 47.5 | 14.6 | 39.2 |
| Mem0 | 38.1 | 54.9 | 49.0 | 16.5 | 39.6 |
| A-Mem | 38.8 | 56.2 | 47.5 | 12.6 | 38.8 |
| ReasoningBank | 42.4 | 61.0 | 52.7 | 14.6 | 42.7 |
| ExpeL | 43.0 | 63.4 | 55.5 | 20.4 | 45.6 |
| Memento | 42.4 | 64.2 | 55.2 | 22.3 | 46.0 |
| Unsupervised MIA | 46.6 | 71.6 | 61.7 | 30.1 | 52.5 |
| MIA | 47.7 | 71.8 | 63.5 | 31.1 | 53.5 |

MIA 평균 53.5%는 Memento 46.0%를 7.5%p 앞선다. 2Wiki +7.6%p, GAIA +8.8%p가 가장 큰 격차다. Unsupervised MIA는 4개 열 모두에서 supervised baseline 전체를 앞서고 supervised MIA에만 밀린다.

### 4.3 폐쇄형 Executor로의 일반화 (Figure 8)

Executor 파라미터에 접근할 수 없으므로 Planner만 TTL 방식으로 학습하고 non-parametric memory도 계속 갱신했다.

| Executor | LiveVQA (ReAct → MIA) | HotpotQA (ReAct → MIA) |
|---|---|---|
| GPT-5.4 | 51.13 → 60.03 (+8.9%p) | 69.06 → 75.49 (+6.4%p) |
| Gemini-3-Flash | 52.7 → 55.8 (+3.1%p) | 78.6 → 81.2 (+2.6%p) |
| Claude-Sonnet-4.6 | 59.8 → 61.6 (+1.8%p) | 80.1 → 81.8 (+1.7%p) |

논문은 개선폭이 base 모델 능력과 역상관이라고 정리한다. base 정확도가 낮은 GPT-5.4가 가장 큰 이득을 얻는다.

### 4.4 Ablation (Table 5, Table 6)

멀티모달 7종의 설정별 정확도(Table 5)는 다음과 같다.

| 설정 | FVQA-test | InfoSeek | SimpleVQA | LiveVQA | MMSearch | In-house 1 | In-house 2 | 평균 |
|---|---|---|---|---|---|---|---|---|
| Base | 61.4 | 56.8 | 63.0 | 33.0 | 55.6 | 15.9 | 26.9 | 44.66 |
| Only Memory | 62.8 | 56.8 | 61.2 | 37.8 | 56.1 | 12.2 | 28.5 | 45.06 |
| Only Plan | 64.9 | 58.6 | 62.6 | 35.4 | 56.7 | 21.0 | 31.3 | 47.21 |
| Memory for Planner | 67.9 | 60.7 | 61.8 | 36.0 | 59.0 | 17.0 | 34.7 | 48.16 |
| + Reflect | 66.2 | 60.1 | 63.0 | 37.9 | 58.5 | 23.1 | 31.3 | 48.59 |
| Trained Planner | 67.6 | 63.8 | 63.8 | 40.1 | 60.8 | 26.1 | 34.5 | 50.96 |
| + TTL (MIA) | 69.6 | 65.5 | 64.9 | 43.1 | 62.6 | 31.8 | 37.7 | 53.60 |

텍스트 전용 4종(Table 6)은 다음과 같다.

| 설정 | SimpleQA | 2Wiki | HotpotQA | GAIA | 평균 |
|---|---|---|---|---|---|
| Base | 40.7 | 61.2 | 51.0 | 11.7 | 41.15 |
| Only Memory | 37.7 | 61.3 | 50.3 | 12.6 | 40.48 |
| Only Plan | 42.1 | 62.8 | 54.9 | 18.5 | 44.58 |
| Memory for Planner | 42.4 | 64.6 | 54.8 | 19.4 | 45.30 |
| + Reflect | 43.9 | 66.6 | 57.6 | 26.2 | 48.58 |
| Trained Planner | 44.6 | 69.1 | 59.3 | 28.2 | 50.30 |
| + TTL (MIA) | 47.7 | 71.8 | 63.5 | 31.1 | 53.53 |

Base 대비 누적 개선폭과 직전 설정 대비 증분은 다음과 같다.

| 설정 | 멀티모달 누적 | 텍스트 누적 | 멀티모달 증분 | 텍스트 증분 |
|---|---|---|---|---|
| Only Memory | +0.40%p | -0.68%p | +0.40%p | -0.68%p |
| Only Plan | +2.56%p | +3.43%p | 해당 없음 | 해당 없음 |
| Memory for Planner | +3.50%p | +4.15%p | 해당 없음 | 해당 없음 |
| + Reflect | +3.93%p | +7.43%p | +0.43%p | +3.28%p |
| Trained Planner | +6.30%p | +9.15%p | +2.37%p | +1.72%p |
| + TTL | +8.94%p | +12.38%p | +2.64%p | +3.23%p |

Only Plan과 Memory for Planner는 Base와 직접 비교되는 병렬 설정이라 직전 설정 대비 증분을 따로 두지 않았다.

논문이 강조하는 발견은 메모리를 Executor에 직접 주입하는 Only Memory가 도움이 되지 않고 Planner의 contextual prior로 써야 효과가 난다는 점이다. Memory for Planner의 +3.50%p와 +4.15%p가 그 근거다. Trained Planner 행은 Qwen3-32B Planner를 쓴 앞 설정들과 달리 훨씬 작은 Qwen3-8B로 더 높은 정확도를 낸다.

논문 본문은 Only Memory의 멀티모달 평균이 0.4 떨어졌다고 적는다. 그런데 Table 5의 7개 데이터셋 평균은 44.66%에서 45.06%로 0.40%p 오른다. 부호가 반대다. 실제로 하락한 쪽은 텍스트 전용(41.15%에서 40.48%, -0.68%p)이다. 크기가 0.4로 같아 부호 오기로 보이지만, 논문 수치를 그대로 인용하면 Table 5와 모순된다.

TTL 증분도 본문과 표가 어긋난다. 본문은 "3.23 (multimodal) and 2.64 (text-only)"라고 적지만 표 계산은 멀티모달 +2.64%p, 텍스트 +3.23%p다. 두 값이 서로 바뀌어 실렸다.

### 4.5 비지도 자기 진화 (Table 7)

| 설정 | FVQA-test | LiveVQA | 2Wiki | HotpotQA | 평균 |
|---|---|---|---|---|---|
| Base | 61.4 | 33.0 | 61.2 | 51.0 | 51.65 |
| Plan and Reflect (memory 없음) | 59.6 | 36.5 | 64.2 | 56.4 | 54.18 |
| Unsupervised Memory for Planner | 57.6 | 28.5 | 66.9 | 56.4 | 52.35 |
| Unsupervised MIA (epoch-1) | 65.1 | 40.1 | 71.6 | 61.7 | 59.63 |
| Unsupervised MIA (epoch-2) | 66.4 | 41.4 | 73.4 | 63.1 | 61.08 |
| Unsupervised MIA (epoch-3) | 67.1 | 41.8 | 74.7 | 63.2 | 61.70 |

비지도 non-parametric memory만 켠 설정은 불안정하다. Unsupervised Memory for Planner는 텍스트 전용에서 올라가지만 FVQA-test는 61.4%에서 57.6%로, LiveVQA는 33.0%에서 28.5%로 내려간다. TTL을 함께 켜야 네 데이터셋 모두 Base를 앞선다.

논문 본문이 자기 진화 사례로 든 "59.6 → 61.1 → 61.7"은 특정 데이터셋 값이 아니라 epoch 1에서 3까지 4개 데이터셋 평균이다. epoch별 증분은 +1.45%p와 +0.62%p로 줄어든다. 논문은 이 감소를 saturation으로 해석하지 않고 누적 학습의 증거로만 서술한다.

### 4.6 학습 곡선 (Figure 7)

Executor의 batch별 reward 평균은 약 0.62에서 0.92까지 약 290 step에 걸쳐 꾸준히 오른다. Planner의 reward는 약 430 step 동안 0.55에서 0.58 사이를 오가며 변동폭이 크다. 논문은 이유를 reward 신호의 간접성에서 찾는다. Executor의 reward는 자신의 action에 직접 붙지만 Planner의 reward는 Executor가 낸 결과를 거치기 때문이다.

응답 길이에서도 같은 대비가 나타난다. Executor의 응답 길이는 약 3,000토큰에서 2,400토큰으로 빠르게 수렴한다. Planner의 응답 길이는 3,000토큰에서 3,950토큰까지 오른 뒤 3,400토큰에서 3,900토큰 사이를 오간다. TTL 단계에서는 데이터셋 특성에 따라 방향이 갈린다. 2Wiki에서는 약 4,700토큰에서 4,470토큰으로 짧아지고, LiveVQA에서는 약 4,200토큰에서 5,150토큰으로 길어진다. 논문은 이를 강화학습이 데이터셋 특성을 포착한 증거로 해석한다.

### 4.7 Tool call 분포 (Figure 9)

TTL에서 표집한 task의 tool call 횟수를 방법별로 산점도와 반바이올린 도표로 겹쳐 그린 그림이다. 회색 점이 실패, 색 점이 성공이고 색이 진할수록 정확도가 높다. No-Memory는 최대 4회 수준에 몰려 있고 RAG는 5회, Mem0는 7회, A-Mem과 ReasoningBank는 10회, ExpeL은 12회, Memento는 16회, MIA는 18회까지 분포가 뻗는다. 논문의 해석 세 가지는 다음과 같다. 메모리가 없으면 multi-turn 추론에서 이전 tool 상호작용을 회상하지 못해 정확도가 가장 낮다. 현재 질의에 대한 planning이 과거 경험에만 의존하는 방식보다 효과적이다. 이종 메모리와 test-time 지속 학습을 결합한 MIA가 가장 강한 성능을 보인다.

### 4.8 평가 데이터셋 (Table 8)

| Dataset | Modality | 예시 수 | 출처 | 용도 |
|---|---|---|---|---|
| FVQA-train | image-text | 4,856 | MMSearch-R1 | 학습 |
| FVQA-test | image-text | 1,800 | MMSearch-R1 | 평가 |
| InfoSeek | image-text | 2,000 | MMSearch-R1 | 평가 |
| LiveVQA | image-text | 2,384 | 공개판 | 평가 |
| SimpleVQA | image-text | 1,013 | MMSearch-R1 | 평가 |
| MMSearch | image-text | 171 | MMSearch-R1 | 평가 |
| In-house 1 | image-text | 295 | 자체 구축 | 평가 |
| In-house 2 | image-text | 505 | 자체 구축 | 평가 |
| MATPO | text-only | 6,175 | MATPO | Planner 학습 |
| 2Wiki | text-only | 12,576 | 공개판 | 평가 |
| HotpotQA | text-only | 7,405 | 공개판 | 평가 |
| SimpleQA | text-only | 4,327 | 공개판 | 평가 |
| GAIA-Text | text-only | 103 | MATPO | 평가 |

In-house 1은 물리, 화학, 생물 분야 웹 문서를 수집해 cross-source 근거로 QA를 합성한 뒤 시각화 가능한 개체의 이미지를 검색해 붙인 295개다. In-house 2는 CNN 등 실시간 뉴스에서 image-text 코퍼스를 모으고 Qwen2.5-VL-72B-Instruct로 핵심 시각 개체를 지정한 뒤 세 단계 의존 사슬로 만든 505개로, 스포츠와 엔터테인먼트 같은 변화가 빠른 분야를 주로 담는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Reflect-Replan이 1회로 제한된다**. 추론 시간을 줄이기 위한 선택이다. 여러 단계에 걸친 반복 reflection은 다루지 않는다.
- **도구가 2개뿐이다**. `search`와 `web_image_to_image_search`만 쓴다. 논문은 이 단순함을 성능이 메모리 활용에서 나왔다는 근거로 제시하지만, 결론에서는 더 복잡하고 동적인 환경으로 확장할 계획을 밝힌다. code interpreter나 브라우저 조작 같은 도구는 검증되지 않았다.
- **비지도 판정의 추론 비용**. Reviewer-Area Chair는 Qwen3-32B 인스턴스 4개를 매 판정마다 호출한다. 논문은 비용을 정량화하지 않는다.
- **TTL이 single epoch online learning이다**. epoch 수를 1로 두므로 데이터 분포 변화에 취약할 수 있다. catastrophic forgetting을 명시적으로 다루지 않고, 메모리 단위의 선택적 삭제 정책만 그 역할을 대신한다.
- **Memento 비교가 부분적이다**. Memento의 parametric retrieval optimization을 멀티모달 입력에 적용하기 어려워 non-parametric 버전만 비교했다고 저자가 밝힌다.
- **LiveVQA 버전 차이**. MMSearch-R1이 보고한 3,602개 버전은 접근할 수 없어 공개 2,384개 버전으로 평가했다. MMSearch-R1 보고값과 직접 비교할 때 주의가 필요하다.
- **본문과 표의 수치 불일치 2건**. Only Memory의 멀티모달 평균 변화 부호(4.4절)와 TTL 증분의 modality 뒤바뀜(4.4절)이다.
- **평가 지표가 LLM Judger 단일 판정이다**. 모든 벤치마크 정확도가 Qwen3-32B의 정답 여부 판정에 의존한다. 사람 평가나 다른 judger와의 일치도는 보고하지 않는다.

## 6. 관련 연구 (Related Work)

- **Deep Research Agents**: DeepResearcher (Zheng et al., 2025), Search-R1 (Jin et al., 2025)가 강화학습으로 multi-turn 검색을 강화했으나 텍스트 전용이다. MMSearch-R1 (Wu et al., 2025), DeepMMSearch-R1 (Narayan et al., 2025)이 멀티모달 검색 도구를 결합했다. WebWatcher (Geng et al., 2025), Deepeyes2 (Zheng et al., 2026)도 비교군에 들어간다.
- **Agent Memory Systems**: ReasoningBank (Ouyang et al., 2025), MemoryBank (Zhong et al., 2024)는 메모리 확장으로 추론을 돕는다. ExpeL (Zhao et al., 2024)은 성공과 실패 경험 모두에서 학습한다. Mem-α (Wang et al., 2025a), Memory-r1 (Yan et al., 2025)은 메모리를 Markov decision process로 모델링한다. Agentic Memory (Yu et al., 2026)는 장기와 단기 메모리를, A-Mem (Xu et al., 2025)은 그래프 기반 관리를 제안한다.
- **Memory Fine-tuning**: Memento (Zhou et al., 2025)가 LLM을 얼린 채 메모리 fine-tuning으로 성능을 올린다. MIA의 가장 직접적 비교군이다.
- **Memory Evolution**: MemEvolve (Zhang et al., 2025b)는 고차 meta-feedback으로 메모리 시스템을 조정하고, Evo-Memory (Wei et al., 2025)는 추론 중 자율 진화 능력을 재는 벤치마크를 만든다.
- **Long-context Memory**: InfLLM (Xiao et al., 2024), LM2 (Kang et al., 2025), MemAgent (Yu et al., 2025), G-memory (Zhang et al., 2025a).
- **Procedural Memory**: Memp (Fang et al., 2025)가 process-oriented memory를, HiAgent (Hu et al., 2025)가 계층적 working memory 관리를 다룬다.
- **RL Framework와 기반 기법**: veRL (Sheng et al., 2025), GRPO (Shao et al., 2024), ReAct (Yao et al., 2023), TALM (Parisi et al., 2022), API-Bank (Li et al., 2023), SciAgent (Ma et al., 2024).

## 7. 용어집 (Glossary)

- **MIA (Memory Intelligence Agent)**: 이 논문이 제안하는 프레임워크 이름. Manager-Planner-Executor 3-agent 구조와 두 종류 메모리, 2단계 교대 강화학습, TTL을 묶은 것이다.
- **DRA (Deep Research Agent)**: LLM 추론과 외부 도구를 결합해 multi-hop 정보 탐색 task를 처리하는 agent.
- **non-parametric memory**: memory buffer에 텍스트로 저장된 명시적 trajectory와 workflow. in-context 대조 학습 재료로 쓰인다.
- **parametric memory**: Planner 가중치에 내재화된 잠재 지식. 저장 부담이 없는 대신 개별 항목을 지목해 꺼낼 수 없다.
- **Workflow Memory**: non-parametric memory 중 압축 workflow 요약을 담는 저장소.
- **Meta Plan Memory**: TTL에서 성공 plan과 실패 plan을 대조 쌍으로 담는 별도 저장소. Router의 plan 선택 참조용이다.
- **Router**: rollout 결과 중 최적 plan을 고르는 LLM. Memory Manager와 같은 pre-trained LLM을 다른 프롬프트로 쓴다.
- **TTL (Test-Time Learning)**: 추론 batch와 동시에 파라미터를 갱신하는 online 학습 방식.
- **workflow summary**: trajectory를 "action purpose (input → output)" 형식의 추상 단계로 압축한 표현.
- **Reflect-Replan**: Executor 결과를 보고 Planner가 수정 plan을 1회 만드는 reflection 장치.
- **Reviewer-Area Chair**: 학회 심사를 모사한 비지도 판정 구조. R_L(logic), R_C(credibility), R_V(validity) 세 심사자와 Area Chair로 구성된다.
- **LLM Judger**: 최종 답의 정답 여부를 판정하는 Qwen3-32B. reward 신호와 평가 지표 모두 이 판정에 의존한다.
- **GRPO (Group Relative Policy Optimization)**: group 내 reward를 평균과 표준편차로 정규화해 advantage를 계산하는 강화학습 알고리즘. value baseline 모델이 필요 없다.
- **token loss masking**: policy가 생성하지 않은 token을 손실 계산에서 제외하는 연산 `I(y_i,t)`.
- **MATPO**: Multi-Agent Tool-integrated Policy Optimization (Mo et al., 2025). Planner 학습 데이터와 GAIA-Text 평가 부분집합의 출처다.
- **wiki25**: Karpukhin et al. 2020의 Wikipedia passage dump. 로컬 텍스트 retriever의 코퍼스다.
- **Serper**: 상용 검색 API. image-to-image 검색과 평가 시 온라인 텍스트 검색의 백엔드다.
- **ImgBB**: 이미지 호스팅 서비스. image-to-image 검색에 필요한 공개 URL을 만드는 데 쓴다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "MIA 결합 전후와 대형 모델 대비 4분할 막대그래프" | caption-region | 본문 표로 재현 (4.1절, 4.3절) |
| fig02 | 4 | "multi-hop 질문 하나의 전 과정 실행 예시" | caption-region | ★ wiki 권장 (case study) |
| fig03 | 5 | "3단계 agent loop 전체 구조도" | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 7 | "Memory Manager의 캡션과 workflow 추출 프롬프트" | caption-region | (프롬프트 전문, 3.2절에 요약) |
| fig05 | 9 | "TTL 메모리 프레임워크와 GRPO rollout" | caption-region | ★ wiki 권장 (method) |
| fig06 | 11 | "Reviewer와 Area Chair 비지도 판정 구조" | caption-region | ★ wiki 권장 (method) |
| fig07 | 15 | "Planner와 Executor 학습 곡선 6장" | caption-region | ★ wiki 권장 (training) |
| fig08 | 16 | "폐쇄형 Executor 3종의 ReAct 대비 레이더 차트" | caption-region | 본문 표로 재현 (4.3절) |
| fig09 | 17 | "메모리 방법 8종의 tool call 분포" | caption-region | ★ wiki 권장 (result) |
| tab01 | 8 | "Executor 학습 rollout 7단계" | table-region | 본문 표로 재현 (3.3절) |
| tab02 | 9 | "Planner 학습 rollout 7단계" | table-region | 본문 표로 재현 (3.3절) |
| tab03 | 14 | "멀티모달 7종 전체 평가 결과" | table-region | 본문 표로 재현 (4.1절) |
| tab04 | 15 | "텍스트 전용 4종 전체 평가 결과" | table-region | 본문 표로 재현 (4.2절) |
| tab05 | 17 | "멀티모달 ablation 7개 설정" | table-region | 본문 표로 재현 (4.4절) |
| tab06 | 18 | "텍스트 전용 ablation 7개 설정" | table-region | 본문 표로 재현 (4.4절) |
| tab07 | 19 | "비지도 자기 진화 6개 설정" | table-region | 본문 표로 재현 (4.5절) |
| tab08 | 27 | "데이터셋 13종 설정표" | table-region | 본문 표로 재현 (4.8절) |

수치 표 크롭(tab03에서 tab08)과 절차 표 크롭(tab01, tab02)은 이미지 대신 본문 마크다운 표로 재현했다. fig01과 fig08도 막대그래프와 레이더 차트에 적힌 값을 표로 옮겼다. fig04는 프롬프트 전문이라 임베드 대상이 아니고 요지만 3.2절에 담았다.
