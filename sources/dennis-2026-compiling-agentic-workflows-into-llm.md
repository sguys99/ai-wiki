---
title: "Compiling Agentic Workflows into LLM Weights: Near-Frontier Quality at Two Orders of Magnitude Less Cost"
type: paper
year: 2026
category: agents
raw_path: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm.pdf
raw_filename: "dennis-2026-compiling-agentic-workflows-into-llm.pdf"
source_collection: external
tags: [agent-compilation, subterranean-agent, fine-tuning, langgraph, in-context-prompting, qwen, procedural-knowledge, task-oriented-dialogue, full-fine-tuning, agents]
authors: "Simon Dennis, Rivaan Patil, Kevin Shabahang, Hao Guo"
arxiv_id: "2605.22502"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/fig01.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/fig01.png
    caption: "surface orchestration과 subterranean agent의 런타임 구조 비교. 왼쪽은 사용자와 LLM 사이에 orchestrator가 끼어들어 매 턴 프롬프트를 주입하고 출력을 해석하며, 오른쪽은 orchestrator가 학습 데이터 생성에만 쓰이고 런타임에는 사용자가 LLM과 직접 대화한다"
    page: 3
    bbox_norm: [0.2011, 0.1142, 0.7989, 0.3306]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/fig02.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/fig02.png
    caption: "여행 예약 절차 flowchart. node 14개와 decision hub 3개가 정보 수집 루프와 옵션 제시, 확정 단계로 이어지고 성공, 이탈, escalate 세 종료 상태로 끝난다. 파란색이 agent 턴, 주황색이 사용자 턴이다"
    page: 17
    bbox_norm: [0.2681, 0.1687, 0.732, 0.7924]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/fig03.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/fig03.png
    caption: "Zoom 기술 지원 절차 flowchart. Triage hub가 문제 유형을 분류한 뒤 해결책 제시와 검증을 반복하며 해결, 미해결, escalate 세 종료 상태를 가진다"
    page: 18
    bbox_norm: [0.2663, 0.2038, 0.7337, 0.771]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/fig04.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/fig04.png
    caption: "보험 청구 처리 절차 flowchart. node 55개와 decision hub 6개가 본인 확인, 청구 유형 분기, 서류 재요청 루프, 보장 판정, 합의 협상, 사후 처리로 이어지고 승인, 거절, 철회, escalate, 검토 중 다섯 종료 상태를 가진다"
    page: 19
    bbox_norm: [0.1773, 0.1198, 0.9434, 0.8548]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab01.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab01.png
    caption: "여행 예약 도메인의 품질 점수표. 3B 컴파일 모델, 같은 base의 surface orchestration, LangGraph orchestrator, in-context baseline 네 조건을 5개 지표로 비교한다"
    page: 5
    bbox_norm: [0.2696, 0.1189, 0.7304, 0.2231]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab02.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab02.png
    caption: "Zoom 지원 도메인의 품질 점수표. 8B 컴파일 모델과 LangGraph orchestrator, in-context baseline 세 조건을 비교한다"
    page: 6
    bbox_norm: [0.3077, 0.1189, 0.6923, 0.2231]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab03.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab03.png
    caption: "보험 청구 도메인의 품질 점수표. in-context baseline, LangGraph orchestrator, 8B 컴파일 모델의 5개 지표 평균을 담았다"
    page: 6
    bbox_norm: [0.3077, 0.1189, 0.6923, 0.2231]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab04.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab04.png
    caption: "도메인 3종의 평균 턴 수와 대화 한 건당 평균 wall-clock 시간 비교표"
    page: 7
    bbox_norm: [0.2632, 0.1465, 0.7368, 0.2763]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab05.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab05.png
    caption: "도메인 3종의 실패 대화 수와 실패율 표. task success 3점 이하를 실패로 센 값이며 여행 도메인만 3B surface orchestration 열을 함께 담았다"
    page: 7
    bbox_norm: [0.2169, 0.3516, 0.7831, 0.4306]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab06.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab06.png
    caption: "대화 한 건당 추론 비용 비교표. in-context, LangGraph orchestrator, 컴파일 모델의 비용과 in-context 대비 배수를 담았다"
    page: 8
    bbox_norm: [0.2329, 0.4464, 0.7671, 0.5254]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab07.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab07.png
    caption: "여행 예약 도메인의 쌍대 비교 통계표. 평균과 95% 신뢰구간, 차이, Cohen's d, Holm-Bonferroni 보정 p값을 세 비교 묶음으로 담았다"
    page: 15
    bbox_norm: [0.211, 0.2339, 0.789, 0.4367]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab08.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab08.png
    caption: "Zoom 지원 도메인의 쌍대 비교 통계표. 실행 회차가 달라 Mann-Whitney U 검정을 쓴 결과다"
    page: 15
    bbox_norm: [0.211, 0.2339, 0.789, 0.4367]
    strategy: table-region
    low_confidence: true
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab09.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab09.png
    caption: "보험 청구 도메인의 쌍대 비교 통계표. 8B 컴파일 모델을 LangGraph orchestrator와 in-context baseline에 각각 대조한다"
    page: 15
    bbox_norm: [0.211, 0.6718, 0.789, 0.8177]
    strategy: table-region
    curated: false
  - id: tab10
    label: Table 10
    kind: table
    file: assets/dennis-2026-compiling-agentic-workflows-into-llm/tab10.png
    raw: raw/papers/dennis-2026-compiling-agentic-workflows-into-llm-figures/tab10.png
    caption: "GPT-4.1 judge로 전량 재채점한 도메인 3종 품질 점수표. Claude judge 결과와 대조하는 judge robustness 검증용이다"
    page: 16
    bbox_norm: [0.2646, 0.1189, 0.7354, 0.362]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

i14와 University of Melbourne 팀이 agent orchestration framework(LangGraph, CrewAI, Google ADK 등 GitHub star 합계 29만 개 이상)를 **단일 fine-tuned 모델로 컴파일**하는 *subterranean agent* 방식을 3개 도메인(Travel node 14개, Zoom node 14개, Insurance node 55개)에서 정량 검증했다. 8B 컴파일 모델이 in-context frontier(Claude Sonnet 4.5) 대비 **품질 87~98%**, LangGraph orchestrator(파라미터 약 70배 큰 frontier 모델 기반) 대비 **동등 또는 우위**, 비용은 **128~462배 저렴**, 재컴파일은 **30~50분 CI/CD 주기**다. 결론 문장은 "지속적 구조는 가중치에, 일시적 state는 프롬프트에"라는 분업 원칙이다.

## 1. 자료 정보 (Document Information)

- **저자**: Simon Dennis(University of Melbourne, i14), Rivaan Patil(i14), Kevin Shabahang(i14), Hao Guo(i14)
- **arXiv**: 2605.22502v1, 2026-05-21 (cs.AI), preprint. 본문 9쪽 + 참고문헌 2쪽 + 부록 8쪽(전체 19쪽)
- **선행 작업**: Dennis et al. [2026a] "In-context prompting obsoletes agent orchestration for procedural tasks"는 orchestration보다 in-context가 우세함을 보였고, 본 논문이 그 후속이다. Dennis et al. [2026b] "Procedural knowledge is not low-rank: Why LoRA fails to internalize multi-step procedures"는 LoRA가 절차 학습에 실패함을 보인 자매 논문이다.
- **핵심 명명**: *subterranean agent*(절차가 가중치에 묻혀 있고 런타임에 사용자가 LLM과 직접 대화하는 구조), *surface orchestration*(외부 orchestrator가 사용자와 LLM 사이에서 매 턴 프롬프트를 주입하는 기존 구조)
- **채택 격차의 근거 수치**: 오케스트레이션 framework 7종의 GitHub star 합계는 29만 개 이상이고, 컴파일 계열 논문(SimpleTOD, FireAct, SynTOD, WorkflowLLM, Agent Lumos)의 저장소 star 합계는 약 3,000개다. 저자는 이를 커뮤니티 관심도 약 100배 차이로 표현했다.

## 2. 주요 기여 (Key Contributions)

1. **채택 장벽 3가지의 정량 해체**. Quality, Cost, Flexibility 세 항목에서 컴파일을 미루는 통념을 실험으로 반박했고, 각 장벽이 통념보다 작다고 결론했다.
2. **동일 모델 통제 비교로 컴파일 효과 분리**. Travel 도메인에서 Qwen 2.5 3B base를 두 방식으로 동시 운용했다. (A) subterranean(컴파일), (B) surface orchestration(같은 base에 flowchart 기반 state tracking 주입). 모델 용량과 절차를 고정한 채 architecture만 바꿔 5개 지표 중 4개에서 컴파일이 p<0.001로 우위였다.
3. **도메인 3종 실증**: Travel booking(node 14개, decision hub 3개, 경로 86개, Qwen 2.5 3B), Zoom support(node 14개, decision hub 3개, 경로 60개, Qwen3-8B, 제품 고유 지식 포함), Insurance claims(**node 55개, decision hub 6개, 경로 2,381개**, 다른 도메인의 약 4배 규모). 절차가 복잡해질수록 비용 우위가 커짐을 보였다.
4. **비용 우위의 두 요인 분해**: (a) self-hosted vLLM(A100 시간당 2.50달러) 기준 토큰당 단가 약 65배 절감, (b) 고정 길이 프롬프트로 토큰 사용량 2~7배 절감. 두 요인이 곱해져 128~462배가 된다.
5. **CI/CD 수준 재컴파일**: 데이터 생성 15~30분(병렬 API 호출) + fine-tuning 10~15분(H200 8장 BF16 데이터 병렬) + 평가 5~15분 = **전체 30~50분**. A100 1장 환경에서도 3~4시간이다.
6. **full fine-tuning 권고**: 자매 논문[2026b]이 LoRA rank 16~128에서 절차 학습 실패를 보였고, 본 논문은 전부 전체 파라미터를 갱신하는 fine-tuning을 썼다. 저자 표현은 "절차 내재화는 문체 정렬보다 깊은 변화"다.
7. **접근법 비공개 LLM-as-judge와 cross-judge 검증**. Claude Sonnet 4.5 judge를 기본으로 쓰고 GPT-4.1 judge로 전량 재채점해 self-preference bias를 통제했다. GPT-4.1에서도 in-context 대비 83~99%로 범위가 비슷했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Surface Orchestration과 Subterranean Agent

**Surface(기존)**: 사용자 - orchestrator - LLM. 매 턴 orchestrator가 node 프롬프트를 주입하고 출력을 파싱한 뒤 다음 edge로 라우팅한다.

**Subterranean(제안)**: 학습 시에만 orchestrator를 쓰고(합성 데이터 생성용), 런타임은 사용자 - LLM이다. 절차는 가중치에 컴파일된다. 추론 시 system prompt는 "You are a helpful travel booking assistant" 수준의 최소 지시문이며, 절차 지시문이나 flowchart state, 라우팅 로직을 런타임에 주입하지 않는다.

저자는 오케스트레이터가 런타임에 LLM을 전혀 건드리지 않는다는 점을 강조한다. 절차는 학습 데이터의 형태를 규정하고, 모델은 명시적 지시문 대신 학습된 통계적 규칙성으로 그 절차를 따른다.

### 3.2 절차의 유향 그래프 표현

`F = (N, E, n₀, T)`

| 기호 | 뜻 |
|---|---|
| `N` | node 집합. 각 node는 role(agent 또는 user)과 프롬프트 템플릿을 가진다 |
| `E ⊆ N × N × C` | edge 집합. 조건 `C`를 선택적으로 붙인다 |
| `n₀ ∈ N` | 시작 node |
| `T ⊆ N` | 종료 node 집합(성공, 이탈, escalate) |

### 3.3 컴파일 파이프라인 4단계

1. **절차 정의**: node(턴)와 edge(전이)로 flowchart를 그린다.
2. **합성 대화 생성**: flowchart의 유효 경로를 순회하고, 각 node에서 Claude Sonnet 4.5가 해당 node의 프롬프트 템플릿과 전체 대화 이력을 받아 다음 턴을 만든다. 대화마다 경로 하나와 시나리오 변수 묶음(목적지, 예산, 사용자 성격, 청구 유형 등)을 함께 뽑는다. 산출물은 절차 주석이 없는 자연 대화다.
3. **fine-tuning**: 전체 파라미터를 갱신한다. 절차 구조는 자연 대화 분포의 통계적 규칙으로 내재화된다.
4. **오케스트레이션 없는 배포**: 런타임에 LLM이 스스로 절차를 수행한다.

### 3.4 도메인 3종의 절차 규모

| 도메인 | node | decision hub | 종료 상태 | 비순환 경로 | 경로 길이 |
|---|---|---|---|---|---|
| Travel booking | 14 | 3 | 3 (성공, 이탈, escalate) | 86 | 4~17턴 |
| Zoom support | 14 | 3 | 3 (해결, 미해결, escalate) | 60 | 4~17턴 |
| Insurance claims | 55 | 6 | 5 (승인, 거절, 철회, escalate, 검토 중) | 2,381 | 9~39턴 |

각 도메인 절차의 내용은 다음과 같다.

| 도메인 | 절차 서술 |
|---|---|
| Travel booking | 인사 후 여행 선호(목적지, 날짜, 예산)를 수집하고 정보가 충분한지 판정한다. 부족하면 수집 단계로 되돌아가고, 충분하면 옵션을 제시한다. 고객은 수락, 거절, 대안 요청 중 하나를 고르며 각각 다른 분기로 간다. 수락하면 예약을 확정하고, 아니면 재검색 루프를 돌거나 이탈로 끝난다 |
| Zoom support | 사용자가 오디오 문제, 화면 멈춤, 연결 끊김, 화면 공유 실패 중 하나를 신고한다. agent가 문제를 해당 진단 경로로 분류하고 단계별 조치를 안내하며 각 단계가 문제를 해결했는지 확인한다. 해결되지 않으면 대안 조치를 다시 시도하거나 escalate한다. Zoom의 UI, 설정 메뉴, 흔한 오류 코드를 알아야 하는 제품 고유 도메인이라 학습 데이터가 이 지식을 가중치에 직접 담는다 |
| Insurance claims | 가입자가 청구를 접수하면 본인 확인과 계약 확인을 거쳐 청구 유형을 판정하고, 증빙 서류를 수집하며(서류가 미비하면 요청 단계로 되돌아간다) 보장 범위와 면책 사항을 판정한 뒤 제안과 역제안을 주고받아 합의한다. 중첩 루프(서류 요청에서 검토, 재요청)와 단계 간 의존(보장 판정이 합의 옵션을 제약)이 있다 |

### 3.5 도메인별 학습 설정

| 항목 | Travel booking | Zoom support | Insurance claims |
|---|---|---|---|
| base model | Qwen 2.5 3B Instruct (bf16) | Qwen3-8B (bf16) | Qwen3-8B (bf16) |
| 생성 대화 수 | 2,125 (학습 1,912 / 평가 213) | 회차당 870, 8회차 합계 학습 6,264 | 3,000 (학습 2,700 / 평가 300) |
| 데이터 증량 방식 | 단일 회차 | 시드 42~49로 8회 실행 후 학습 split 연결(8 × 783). 같은 경로도 시드별 시나리오 샘플링이 달라 중복 제거가 불필요했다 | 단일 회차 |
| 하드웨어 | RTX 5090 1장 | A100 8장, DeepSpeed ZeRO-3 | A100 8장, DeepSpeed ZeRO-3 |
| optimizer | AdamW 8-bit | AdamW | AdamW |
| learning rate | 2e-5, cosine decay | 2e-5 | 2e-5 |
| effective batch size | 16 (gradient accumulation) | 32 | 32 |
| epoch 예산 | 20 (wall-clock 약 3.5시간) | 10 | 20 |
| 선택된 checkpoint | epoch 약 4 (이후 평탄) | epoch 2 | epoch 3 |

Insurance가 Zoom보다 epoch 예산이 두 배인 이유로 저자는 절차가 커서 node별 행동이 많고 trajectory가 길어 데이터를 더 여러 번 통과해야 한다는 점을 든다. checkpoint 선택 기준은 세 도메인 모두 held-out 평가 손실이다.

### 3.6 평가 방법

- **규모**: 도메인별, 조건별 시나리오 200개(n = 200). 시나리오는 flowchart 경로 전 범위, 사용자 화법(구체적에서 모호까지), 만족도(적극적에서 회의적까지), 예산 현실성, 동반 인원 복잡도를 고르게 덮도록 설계했다.
- **baseline 2종**

| baseline | 구성 | 역할 |
|---|---|---|
| LangGraph orchestrator | Claude Sonnet 4.5를 LangGraph로 오케스트레이션. flowchart node 하나가 LangGraph 그래프 node 하나에 대응하고, decision hub에서는 LLM classifier가 다음 edge를 고른다. LangGraph는 2026-03 기준 GitHub star 약 3만 개로 가장 널리 쓰인다 | frontier 모델 기준선. 3B 컴파일 모델보다 파라미터가 약 70배 많다. Dennis et al. [2026a]에서 평가한 것과 같은 시스템이다 |
| in-context baseline | Claude Sonnet 4.5의 system prompt에 flowchart 전체를 직렬화해 넣고 턴당 API 호출 1회로 스스로 절차를 수행하게 한다 | frontier 모델이 절차 전체를 볼 때 도달할 수 있는 품질 상한. 대가는 context window 소모다 |

- **동적 사용자 시뮬레이션**: Claude Sonnet 4.5가 전체 대화 이력과 시나리오 변수를 받아 고객 역할을 연기한다. 시뮬레이터는 flowchart를 모른다. 모든 조건이 같은 시나리오 명세와 같은 시뮬레이터를 받는다.
- **judge**: Claude Sonnet 4.5(기본)와 GPT-4.1(robustness 확인). judge는 어느 시스템이 만든 대화인지 모른다. 지표 5개를 각각 1~5점으로 채점하며 점수마다 행동 기준이 붙는다.

| 지표 | 정의와 채점 기준 |
|---|---|
| Task Success | 절차를 적절한 종료 상태까지 정확하고 일관되게 수행했는가. 5점은 절차 완주와 명확한 종료, 3점은 중간 단계까지 갔으나 대화가 흐지부지된 경우, 1점은 유의미한 진전 없음 |
| Information Accuracy | 사용자가 준 정보를 정확히 쓰고 유지했는가. 5점은 모든 세부가 정확히 반영, 1점은 세부를 지어내거나 입력을 무시 |
| Consistency | 대화 전체에서 일관된 state를 유지했는가. 5점은 모순도 반복 질문도 없음, 1점은 반복적으로 자기모순 |
| Graceful Handling | 변경, 모호성, edge case를 얼마나 잘 처리했는가. 5점은 매끄러운 적응, 1점은 어떤 이탈에도 흐름이 깨짐. **사용자가 도전을 걸지 않은 대화는 3점이 상한이다** |
| Naturalness | 숙련된 인간 상담원과 대화하는 것처럼 읽히는가. 5점은 인간과 구별 불가, 1점은 기계적이고 대본 같음 |

- **통계 처리**: 같은 실행 회차에서 평가한 조건은 시나리오 인덱스로 짝지어 Wilcoxon signed-rank 검정을, 따로 평가한 조건은 Mann-Whitney U 검정을 쓴다. 사용자 시뮬레이터가 동적으로 응답하므로 짝지은 조건도 첫 턴 이후 대화가 갈라진다. 저자는 짝짓기가 내용이 아니라 시나리오 의도 수준이라고 명시한다. 효과 크기는 Cohen's d(합동 표준편차), 신뢰구간은 부트스트랩 95%(재표본 10,000회, 백분위법)이며, p값은 각 쌍대 비교 안에서 지표 5개에 대해 Holm-Bonferroni 보정(α = 0.05)을 적용한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Travel booking 품질 (3B 동일 모델 통제)

Table 1 (Claude judge, n = 200, 1~5점. 괄호는 부트스트랩 95% 신뢰구간):

| 지표 | 3B Sub. | 3B Orch. | LG Orch. | In-Context |
|---|---|---|---|---|
| Task Success | 4.11 [4.01, 4.19] | 3.93 [3.85, 4.00] | 4.17 [4.02, 4.33] | **4.53** [4.42, 4.63] |
| Info. Accuracy | **4.75** [4.64, 4.83] | 4.69 [4.58, 4.78] | 4.21 [4.09, 4.32] | 4.64 [4.57, 4.71] |
| Consistency | 4.34 [4.24, 4.45] | 4.12 [4.03, 4.21] | 4.32 [4.17, 4.46] | **4.96** [4.92, 4.98] |
| Graceful Handling | 4.07 [3.97, 4.17] | 3.87 [3.79, 3.94] | 4.62 [4.51, 4.71] | **4.96** [4.92, 4.99] |
| Naturalness | 4.12 [4.03, 4.20] | 3.96 [3.88, 4.01] | 4.84 [4.79, 4.89] | **5.00** [5.00, 5.00] |

Table 7의 쌍대 비교(Wilcoxon signed-rank, Holm-Bonferroni 보정). 차이는 앞 조건에서 뒤 조건을 뺀 값이다.

| 비교 | 지표 | 차이 | d | 보정 p |
|---|---|---|---|---|
| 3B Sub 대 3B Orch | Task Success | +0.18 | +0.22 | <.001 |
| | Info. Accuracy | +0.05 | +0.06 | .292 |
| | Consistency | +0.22 | +0.23 | <.001 |
| | Graceful Handling | +0.20 | +0.23 | <.001 |
| | Naturalness | +0.17 | +0.21 | <.001 |
| 3B Sub 대 LG Orch | Task Success | -0.07 | -0.08 | <.001 |
| | Info. Accuracy | +0.54 | +0.70 | <.001 |
| | Consistency | +0.02 | +0.03 | .032 |
| | Graceful Handling | -0.54 | -0.78 | <.001 |
| | Naturalness | -0.72 | -1.41 | <.001 |
| 3B Sub 대 In-Context | Task Success | -0.42 | -0.58 | <.001 |
| | Info. Accuracy | +0.11 | +0.17 | <.001 |
| | Consistency | -0.61 | -1.13 | <.001 |
| | Graceful Handling | -0.89 | -1.69 | <.001 |
| | Naturalness | -0.88 | -2.03 | <.001 |

- 3B 컴파일 모델은 같은 base의 orchestration을 5개 지표 전부에서 앞섰고, 그중 4개가 유의했다. Information accuracy는 방향은 양이지만 유의하지 않았다(+0.05, p = .292).
- LangGraph orchestrator(파라미터 약 70배) 대비로는 information accuracy에서 앞섰고(4.75 대 4.21), graceful handling과 naturalness에서 뒤졌다.
- in-context 대비 달성률은 information accuracy 102%, graceful handling과 naturalness 약 82%다. 저자는 3B가 절차는 배웠지만 edge case를 자연스럽게 처리할 용량이 부족하다고 해석하고 이를 8B 확장의 동기로 삼았다.

### 4.2 Zoom support 품질 (8B)

Table 2 (Claude judge, n = 200. 괄호는 95% 신뢰구간):

| 지표 | 8B Sub. | LG Orch. | In-Context |
|---|---|---|---|
| Task Success | 4.50 [4.39, 4.61] | 4.62 [4.53, 4.72] | **4.92** [4.88, 4.96] |
| Info. Accuracy | 4.26 [4.14, 4.39] | 4.75 [4.67, 4.83] | **4.92** [4.88, 4.96] |
| Consistency | 4.42 [4.27, 4.55] | 4.55 [4.43, 4.67] | **5.00** [4.97, 5.00] |
| Graceful Handling | 4.62 [4.54, 4.71] | 4.52 [4.42, 4.62] | **5.00** [4.99, 5.00] |
| Naturalness | **4.87** [4.82, 4.91] | 4.64 [4.57, 4.71] | **5.00** [5.00, 5.00] |

Table 8의 쌍대 비교(Mann-Whitney U, 실행 회차가 달라 비대응 검정):

| 비교 | 지표 | 차이 | d | 보정 p |
|---|---|---|---|---|
| 8B Sub 대 LG Orch | Task Success | -0.12 | -0.16 | .185 |
| | Info. Accuracy | -0.49 | -0.65 | <.001 |
| | Consistency | -0.13 | -0.14 | .463 |
| | Graceful Handling | +0.11 | +0.16 | .463 |
| | Naturalness | +0.23 | +0.52 | <.001 |
| 8B Sub 대 In-Context | Task Success | -0.42 | -0.71 | <.001 |
| | Info. Accuracy | -0.66 | -0.98 | <.001 |
| | Consistency | -0.57 | -0.79 | <.001 |
| | Graceful Handling | -0.37 | -0.88 | <.001 |
| | Naturalness | -0.13 | -0.53 | <.001 |

- graceful handling은 in-context 대비 92%(3B의 82%에서 상승), naturalness는 97%(3B의 82%에서 상승)로 3B에서 문제였던 격차가 줄었다.
- 남은 격차는 information accuracy 87%에 집중된다. 저자는 병목이 절차 준수가 아니라 폭넓은 세계 지식이라고 본다.
- LangGraph 대비로는 naturalness에서 앞서고 information accuracy에서 뒤진다. 나머지 세 지표는 유의차가 없다.

### 4.3 Insurance claims 품질 (8B, node 55개)

Table 3 (Claude judge, n = 200. 괄호는 95% 신뢰구간이며 부록 Table 9 값이다):

| 지표 | In-Context | LG Orch. | 8B Sub. |
|---|---|---|---|
| Task Success | **4.78** [4.70, 4.86] | 4.42 [4.28, 4.56] | 4.47 [4.36, 4.58] |
| Info. Accuracy | **4.78** [4.71, 4.85] | 4.45 [4.33, 4.56] | 4.40 [4.28, 4.51] |
| Consistency | **4.82** [4.76, 4.88] | 4.39 [4.24, 4.54] | 4.51 [4.38, 4.63] |
| Graceful Handling | **4.96** [4.92, 4.99] | 4.38 [4.25, 4.51] | **4.81** [4.72, 4.88] |
| Naturalness | **5.00** [4.99, 5.00] | 4.58 [4.50, 4.67] | **4.92** [4.87, 4.97] |

Table 9의 쌍대 비교(Mann-Whitney U):

| 비교 | 지표 | 차이 | d | 보정 p |
|---|---|---|---|---|
| 8B Sub 대 LG Orch | Task Success | +0.05 | +0.06 | .750 |
| | Info. Accuracy | -0.05 | -0.06 | .778 |
| | Consistency | +0.12 | +0.12 | .778 |
| | Graceful Handling | +0.42 | +0.54 | <.001 |
| | Naturalness | +0.34 | +0.66 | <.001 |
| 8B Sub 대 In-Context | Task Success | -0.31 | -0.45 | <.001 |
| | Info. Accuracy | -0.38 | -0.57 | <.001 |
| | Consistency | -0.31 | -0.43 | .002 |
| | Graceful Handling | -0.15 | -0.35 | .002 |
| | Naturalness | -0.07 | -0.28 | .003 |

- 8B 컴파일 모델은 in-context 품질의 92~98%에 도달했다. node 14개에서 55개로 절차가 커져도 컴파일이 성립함을 보인 결과다.
- LangGraph 대비로는 graceful handling(4.81 대 4.38)과 naturalness(4.92 대 4.58)에서 유의하게 앞섰고, consistency에서도 평균이 높았다(유의하지는 않다). task success와 information accuracy는 유의차가 없다.

### 4.4 효율과 실패 모드

Table 4 (n = 200, wall-clock은 모든 LLM 호출 포함. LangGraph는 생성과 라우팅 호출을 모두 센다):

| 도메인 | 항목 | Sub. | LG Orch. | In-Context |
|---|---|---|---|---|
| Travel (3B) | 평균 턴 수 | 22.6 | 16.5 | 16.4 |
| | 평균 wall-clock | 69.4초 | 64.9초 | 55.5초 |
| Zoom (8B) | 평균 턴 수 | 13.6 | 14.7 | 12.7 |
| | 평균 wall-clock | 29.5초 | 52.1초 | 36.0초 |
| Insurance (8B) | 평균 턴 수 | 20.3 | 26.4 | 19.0 |
| | 평균 wall-clock | 43.2초 | 120.8초 | 52.8초 |

Table 5 (task success 3점 이하를 실패로 센다, n = 200):

| 항목 | Travel 3B Sub. | Travel 3B Orch. | Travel LG | Zoom 8B Sub. | Zoom LG | Insurance 8B Sub. | Insurance LG |
|---|---|---|---|---|---|---|---|
| 실패 대화 수 | 11 | 9 | 48 | 22 | 18 | 18 | 34 |
| 실패율 | 5.5% | 4.5% | 24.0% | 11.0% | 9.0% | 9.0% | 17.0% |

- Travel에서 3B 컴파일 모델은 평균 22.6턴으로 baseline(약 16턴)보다 길지만 wall-clock은 LangGraph와 비슷하다. self-hosted 추론이라 orchestrator가 매 턴 부담하는 Claude API 지연이 없기 때문이다.
- Zoom과 Insurance에서는 컴파일 모델이 더 빠르다. Insurance 격차가 가장 큰 이유는 LangGraph가 decision hub 6곳마다 추가 API 호출을 하고, node 55개 절차가 모든 프롬프트를 늘리기 때문이다. 43.2초 대 120.8초로 약 2.8배 차이다.
- 실패율은 Travel(5.5% 대 24.0%)과 Insurance(9.0% 대 17.0%)에서 컴파일이 낮고, Zoom(11.0% 대 9.0%)은 비슷하다. Travel LangGraph의 24.0%는 decision hub 라우팅 오류가 원인이며, 컴파일 모델은 이 실패 모드를 구조적으로 갖지 않는다.
- **Travel 3B surface orchestration의 실패율 4.5%는 3B 컴파일 모델의 5.5%보다 낮다.** 저자 본문은 이 열을 비교 대상으로 언급하지 않고 LangGraph와의 비교만 서술한다.
- 컴파일 모델은 학습 데이터에서 "interview style"을 익혔다. 턴마다 초점이 하나인 질문을 던지고 답을 기다린 뒤 진행하며, 전체 턴의 64%가 정확히 질문 하나를 담는다. LangGraph orchestrator는 현재 node 템플릿에 묶여 한 턴에 여러 질문을 몰아넣기도 한다. 대화당 총 단어 수는 조건 사이가 비슷해(약 1,200~1,400단어) 같은 정보가 다른 크기의 턴으로 쪼개진 것임을 확인했다. 저자는 턴당 질문 하나의 리듬이 감사 기록을 명확하게 하고 사용자 인지 부담을 낮출 수 있다고 본다.

### 4.5 파라미터 70배 격차를 메우는 구조적 이점

Dennis et al. [2026a]가 정리한 오케스트레이션의 구조적 비용 3가지에 컴파일이 어떻게 대응하는지가 저자의 설명이다.

| 오케스트레이션의 구조적 비용 | 컴파일의 대응 |
|---|---|
| local node context만 보고 생성해 추론이 조각난다 | 내재화된 가중치로 절차 전체를 한꺼번에 고려한다 |
| 라우팅 실패 모드가 생긴다 | 라우팅 단계 자체가 없어 구조적으로 라우팅 실패가 0이다 |
| 템플릿 주입이 모델의 자연스러운 대화 문체를 제약한다 | 자연 학습 데이터가 만든 제약 없는 응답을 낸다 |

### 4.6 비용

Table 6 (Claude Sonnet 4.5 요금은 입력 100만 토큰당 3달러, 출력 100만 토큰당 15달러 기준):

| 도메인 | In-Context | LG Orch. | Subterranean | In-Context 대비 배수 |
|---|---|---|---|---|
| Travel (node 14개) | $0.133 | $0.077 | $0.0010 | **128배** |
| Zoom (node 14개) | $0.103 | $0.054 | $0.0003 | **296배** |
| Insurance (node 55개) | $0.327 | $0.174 | $0.0007 | **462배** |

토큰당 단가 산출 근거:

| 항목 | 값 |
|---|---|
| 서빙 구성 | Qwen3-8B, 예약형 클라우드 A100 80GB 1장, 시간당 2.50달러, vLLM 배치 추론 |
| 공개 벤치마크(Patel et al. 2024) | 8B 모델, A100, batch size 64에서 초당 총 4천에서 5천 토큰 |
| 분해 | prefill 초당 약 1만 5천 토큰, autoregressive decode 초당 약 3천 토큰 |
| 환산 단가 | 입력 100만 토큰당 약 0.05달러, 출력 100만 토큰당 약 0.23달러 |
| Claude Sonnet 4.5 대비 | 토큰당 약 65배 저렴 |

토큰 사용량 요인은 별개다. in-context baseline은 매 턴 system prompt에 절차를 직렬화해 넣어야 하고, 그 부담이 절차 복잡도와 함께 커진다(Travel node 14개에서 약 2배, Insurance node 55개에서 약 7배). 컴파일 모델의 프롬프트는 절차 복잡도와 무관하게 길이가 고정이라 이 부담이 사라진다. 두 요인이 곱해져 Travel 128배, Insurance 462배가 된다. LangGraph orchestrator 대비로도 77~249배 저렴하다. LangGraph는 in-context보다 토큰을 덜 쓰지만 생성과 라우팅 호출마다 Claude API 요금을 낸다.

일회성 컴파일 비용은 운영 비용과 별도로 데이터 생성 약 40달러 + fine-tuning 연산 약 10~40달러, 합계 50~80달러다. 대화 한 건당 비용으로 환산하려면 배포된 agent의 생애 대화량을 알아야 하므로 응용마다 다르다. 저자는 세 도메인 모두 대화 500건 안에서 in-context 대비 손익분기에 도달하고, 대화 1만 건 이상이면 컴파일이 대화당 0.01달러 미만을 더한다고 보고한다.

### 4.7 재컴파일 주기

절차가 바뀌면 컴파일 모델을 처음부터 다시 학습해야 하지만, 저자는 재컴파일 파이프라인이 세 단계 모두 깔끔하게 병렬화되어 운영급 GPU 클러스터에서 한 시간 안에 끝난다고 보고한다.

| 단계 | 내용 | H200 8장 | A100 80GB 1장 |
|---|---|---|---|
| 데이터 생성 | Claude Sonnet 4.5가 새 flowchart를 순회해 합성 대화 약 1,600건을 만든다. 대화가 서로 독립이라 API 호출이 쉽게 병렬화되고, 병목은 로컬 연산이 아니라 계정별 API rate limit이다. 순차 실행이면 약 60분 | 15~30분 | 동일 |
| fine-tuning | 8B 모델은 full-precision AdamW 기준 파라미터와 그래디언트, optimizer state를 합쳐 약 96GB라 H200 1장에 들어간다. 샤딩이 필요 없어 H200 8장은 데이터 병렬만 쓰며, H200의 BF16 처리량이 약 3배 높아 12 epoch을 압축한다. A100 1장에서는 optimizer state를 8-bit AdamW로 줄여야 들어간다 | 10~15분 | 약 3시간 |
| 평가 | 시나리오 50개 vLLM 배치 점검. 추론 서버가 이미 켜져 있으면 약 5분, 서버 기동을 포함하면 10~15분 | 5~15분 | 동일 |
| **합계** | | **30~50분** | **3~4시간** |

저자는 이 주기를 대형 애플리케이션의 CI/CD 빌드와 비슷하다고 표현하고, 유연성 장벽이 패러다임 전환이 아니라 배포 주기 문제라고 결론한다.

### 4.8 judge robustness (GPT-4.1 재현)

Table 10 (GPT-4.1 judge, 도메인별 조건별 n = 200):

| 도메인 | 지표 | Sub. | LG Orch. | In-Context |
|---|---|---|---|---|
| Travel (3B) | Task Success | 4.34 | 4.69 | **4.88** |
| | Info. Accuracy | 4.12 | 4.72 | **4.96** |
| | Consistency | 4.28 | 4.78 | **4.97** |
| | Graceful Handling | 4.13 | 4.36 | **4.51** |
| | Naturalness | 3.92 | 3.99 | **4.01** |
| Zoom (8B) | Task Success | 4.49 | 4.60 | **4.86** |
| | Info. Accuracy | 4.21 | 4.54 | **4.78** |
| | Consistency | 4.74 | 4.66 | **5.00** |
| | Graceful Handling | 3.21 | **3.49** | 3.42 |
| | Naturalness | 3.96 | 4.01 | **4.04** |
| Insurance (8B) | Task Success | 4.16 | 4.64 | **4.79** |
| | Info. Accuracy | 4.38 | 4.36 | **4.65** |
| | Consistency | 4.71 | 4.35 | **4.92** |
| | Graceful Handling | 3.84 | **4.13** | 4.01 |
| | Naturalness | 3.98 | 3.96 | **4.03** |

저자가 두 judge에서 강건하다고 정리한 결과는 3가지다. (1) 컴파일 모델이 in-context 품질의 83~99%(GPT-4.1)로 Claude judge의 82~102%와 비슷한 범위다. (2) 3B 컴파일 모델이 3B orchestrator를 모든 지표에서 크게 앞선다. (3) in-context baseline이 다른 모든 조건을 앞선다.

judge에 따라 달라지는 양상도 두 가지 명시했다. GPT-4.1에서는 LangGraph orchestrator가 Claude judge보다 더 많은 지표에서 컴파일 모델을 앞서며, 특히 Travel과 Insurance에서 그렇다. 컴파일 모델은 consistency(Zoom, Insurance)와 information accuracy(Insurance)에서 우위를 유지하지만 대부분의 도메인에서 task success, graceful handling, naturalness를 내준다. naturalness 점수는 GPT-4.1에서 모든 조건이 3.92~4.04로 좁혀져 Claude judge의 4.12~5.00보다 폭이 훨씬 작다.

핵심 주장은 두 judge에서 유지된다. 컴파일 모델은 LangGraph orchestrator 품질의 85~113%(Claude)와 87~108%(GPT-4.1)를 달성하면서 in-context 대비 128~462배 저렴하다. 품질 순위 In-Context > LangGraph ≈ Compiled > 3B Orch도 두 judge에서 같다.

### 4.9 정성 사례 (부록 A)

저자는 조건 사이의 전형적 행동 차이를 보여주려고(최고 성능 사례가 아니라) 실제 평가 대화 발췌를 3건 실었다.

| 도메인 | 시나리오 | 컴파일 모델 | orchestrator |
|---|---|---|---|
| Travel booking | 친구 2명이 일본 6일 여행, 1인당 예산 1,100달러, 수상 스포츠와 축제 관심, 화법은 불확실 | task success 5점, naturalness 5점, 14턴. 5번째 턴에 옵션을 제시하고 7번째 턴에 예약을 확정한다 | 3B orchestration은 task success 4점, naturalness 4점, 18턴. 날짜와 선호를 묻는 같은 질문을 4, 6, 8번째 턴에서 세 번 반복한 뒤 14번째 턴에야 옵션을 제시한다. 저자는 node 단위 생성이 전체 대화 인식을 갖지 못한 증상으로 본다 |
| Zoom support | Zoom 회의 중 오디오가 간헐적으로 끊기고 연결 표시가 노란색이나 빨간색이 되며 대역폭 부족 오류가 나온다. Windows 11 데스크톱 앱 | task success 5점, naturalness 4점, 12턴. HD 비디오 해제, 통계 패널 확인, 배경 소음 억제 설정 조정을 턴마다 하나씩 안내하고 이더넷 연결을 권한다 | Claude orchestration은 task success 4점, naturalness 3점, 9턴. 권고 4개를 한 턴에 몰아넣었고 그중 음악가용 원음 설정 권고가 틀려 사용자 지적을 받고 철회한다 |
| Insurance claims | 아파트 앞에 주차한 차량이 야간에 도난, 경찰 신고 완료, Premium 등급 종합 보장, 자기부담금 500달러, 출퇴근 차량이 필요해 급하다 | task success 5점, naturalness 5점, 22턴. 보장 확인, 사고 경위 수집, 렌터카 승인, 평가 절차 설명, 청구 종결을 매끄러운 대화 흐름으로 처리한다 | Claude orchestration은 task success 3점, naturalness 4점, 16턴. 전화 대화에 맞지 않는 마크다운 서식(볼드 제목, 불릿 목록)을 출력하고, gap 보장 여부 질문에 확답하지 못하며, 실제 시스템에 존재하지 않는 "선임 상담원"으로 이관한다고 말한다. 이미 시도한 것을 기억하지 못해 계약 세부를 여러 번 다시 확인하는 증상도 나타난다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문에 별도의 한계 절이 없다. 아래는 논문이 보고한 격차와, 논문이 다루지 않은 범위를 구분해 정리한 것이다.

### 5.1 논문이 보고한 격차

- **Information accuracy 병목(Zoom 87%)**: 저자는 남은 격차가 절차 준수가 아니라 폭넓은 세계 지식에서 온다고 진단한다.
- **frontier 격차 잔존**: 8B 컴파일 모델은 in-context 상한 대비 87~98% 구간이고, 결론 절에서 격차를 2~13%로 표현한다. 절대 품질이 최우선인 도메인에서는 trade-off가 남는다.
- **judge 의존성**: GPT-4.1 judge에서는 LangGraph orchestrator가 더 많은 지표에서 앞선다. 저자는 핵심 주장(품질 대비 비용)이 유지된다고 보지만 지표별 우열은 judge에 따라 바뀐다.
- **Zoom 실패율 열위**: Zoom에서 컴파일 모델 실패율 11.0%가 LangGraph의 9.0%보다 높다. 저자는 이를 "비슷하다"로 표현한다.
- **Travel 3B의 턴 수 증가**: 컴파일 모델이 22.6턴으로 baseline 약 16턴보다 길다. 정보량은 같으나 턴이 잘게 쪼개진 결과다.

### 5.2 논문이 다루지 않은 범위

- **base 모델 계열이 Qwen 하나**: Qwen 2.5 3B와 Qwen3-8B만 썼고 다른 계열(Llama, Mistral 등)로의 일반화는 검증하지 않았다.
- **평가가 대화 전용**: API 호출, 검색, 코드 실행 같은 tool use가 결합된 절차에서 컴파일이 성립하는지 실험하지 않았다.
- **LoRA 실패 결론의 외부 의존**: 전체 파라미터 갱신을 택한 근거는 자매 논문 Dennis et al. [2026b]에 있고, 본 논문 안에는 LoRA 대조 실험이 없다.
- **재컴파일 시나리오가 전면 재생성 하나**: 절차 일부만 바뀔 때의 부분 갱신이나 hot-fix 경로는 제시하지 않았다.
- **판정 주체가 모두 LLM**: judge와 사용자 시뮬레이터가 모두 LLM이고 인간 평가가 없다. 대화 발췌는 부록 A의 정성 예시 3건뿐이다.
- **절차 정의 비용 미계량**: flowchart를 사람이 그리는 비용은 비용 분해에 들어가지 않았다.

### 5.3 논문 내적 불일치

| 위치 | 불일치 |
|---|---|
| Table 3 대 Table 9 | Insurance in-context의 Information accuracy가 본표 4.78, 부록 4.79다. Consistency도 본표 4.82, 부록 4.83이다 |
| Table 2 대 Table 8 | Zoom in-context의 Consistency가 본표 5.00, 부록 4.99다 |
| 4.1절 본문 대 Table 7 | 본문은 3B Sub와 LG Orch의 "task success와 consistency가 비슷하다"고 쓰지만, Table 7은 task success를 p<.001, consistency를 p<.05로 표시한다. 차이 값이 각각 -0.07과 +0.02로 작아 실질 해석은 본문과 맞지만 유의성 표기와 어긋난다 |
| 2절 본문 대 Figure 4 | 본문은 보험 청구 유형을 auto, property, health, liability로 쓰지만 flowchart의 분기 node는 Auto, Home, Health, Life다 |
| 부록 C 본문 대 Table 10 | 본문은 "in-context baseline이 다른 모든 조건을 앞선다"고 쓰지만, Table 10의 graceful handling에서 Zoom(LG 3.49 대 in-context 3.42)과 Insurance(LG 4.13 대 in-context 4.01)는 LangGraph가 앞선다 |
| 부록 C 본문 대 Table 10 | 본문은 GPT-4.1 judge에서도 3B 컴파일 모델이 3B orchestrator를 모든 지표에서 앞선다고 쓰지만, Table 10에는 3B Orch 열이 없어 제시된 데이터로 확인할 수 없다 |
| Table 6 | 표시된 비용을 나눈 값과 배수 열이 어긋난다(Travel 133배 대 128배, Zoom 343배 대 296배, Insurance 467배 대 462배). 소수 넷째 자리로 반올림한 표시값 때문이며 배수는 반올림 전 값으로 계산한 것으로 보인다 |

## 6. 관련 연구 (Related Work)

저자는 컴파일 계열 선행 연구를 3가지 계통으로 분류한다.

| 계통 | 연구 | 내용 |
|---|---|---|
| 대화 파이프라인 통합 | SimpleTOD [Hosseini-Asl et al., NeurIPS 2020] | task-oriented dialogue의 이해, 행동 결정, 응답 생성 하위 과제 전부를 단일 시퀀스 예측 문제로 바꿔 MultiWOZ에서 최고 성능 달성 |
| | AutoTOD [Xu et al., ACL 2024] | 자율 행동 시퀀싱으로 확장. 모듈형 시스템의 실패 모드로 오류 누적과 낮은 일반화를 명시하고 통합 모델이 이를 피한다고 주장 |
| frontier 모델 추론 distillation | FireAct [Chen et al., 2023] | Llama2-7B를 GPT-4 ReAct trajectory로 fine-tuning해 HotpotQA 성능 77% 향상 |
| | AgentTuning [Zeng et al., Findings of ACL 2024] | Llama 2를 다양한 agent 상호작용 trajectory로 instruction-tuning. 70B 모델이 미지 과제에서 GPT-3.5-turbo와 동등하면서 범용 능력을 유지 |
| | Agent Lumos [Yin et al., ACL 2024] | agent 행동을 planning과 grounding 모듈로 분해해 학습. 오픈소스 모델이 여러 벤치마크에서 GPT agent를 앞섬 |
| 복잡한 워크플로로 확장 | WorkflowLLM [Fan et al., 2024] | 워크플로 샘플 10만 6천 개와 API 1,503종에 걸친 API 오케스트레이션 지식을 8B 모델에 컴파일 |
| | SynTOD [Samarinas et al., 2024] | state transition graph로 합성 학습 데이터 생성. 본 논문의 flowchart 기반 접근에 가장 가깝고, 절차적 대화 데이터를 크라우드소싱 없이 합성할 수 있음을 보임 |
| | Hsiao [2026] | 절차 지식을 hierarchical task network로 형식화. 구조적 분해가 agent 성능을 높임을 보임 |

agent framework 실패 분석은 본 논문의 동기다.

| 연구 | 내용 |
|---|---|
| Cemri et al. [2026] | 멀티에이전트 LLM 시스템의 실패 모드 14가지 분류 |
| Zhu et al. [2026] | 연쇄 실패가 주요 병목임을 보임 |
| Gupta [2026] ReliabilityBench | pass@1이 60%인 agent가 시행 간 일관성은 25%에 그침 |
| Dennis et al. [2026a] | 절차적 과제에서 in-context prompting이 오케스트레이션을 압도함을 보이고, 5점 척도에서 4.53~5.00의 품질을 기록. 컴파일이 목표로 삼는 품질 상한을 확립 |

본 논문의 차별점은 3가지다. (a) 컴파일과 오케스트레이션의 추론 비용 우위를 정량화한 첫 사례, (b) 재컴파일 주기를 측정, (c) **동일 모델 orchestrated baseline과 frontier 모델 baseline을 동시에 두어** 컴파일 효과를 모델 용량 효과와 분리.

인프라와 평가 방법론 인용은 다음과 같다.

| 연구 | 역할 |
|---|---|
| vLLM, PagedAttention [Kwon et al., SOSP 2023] | self-hosted 배치 추론. 비용 계산의 서빙 기반 |
| LLM-Inference-Bench [Patel et al., 2024] | 8B 모델 A100 처리량 벤치마크. 토큰당 단가 계산 근거 |
| LangGraph [LangChain, 2024], CrewAI [Moura, 2024], Google ADK [2026], OpenAI Agents SDK [2026], Semantic Kernel [Microsoft, 2026], Strands [AWS, 2026], LlamaIndex Workflows [2026] | 비교 대상 오케스트레이션 생태계. GitHub star 합계 29만 개 이상 |
| LLM-as-judge [Zheng et al., NeurIPS 2023] | MT-Bench의 평가 방법론 |
| Panickssery et al. [2024] | judge가 자기 생성물을 선호하는 편향. cross-judge 통제의 동기 |

## 7. 용어집 (Glossary)

- **Subterranean agent** - 절차가 LLM 가중치에 컴파일되어 보이지 않는 곳에서 동작하는 agent. 런타임에 외부 orchestrator가 없다.
- **Surface orchestration** - orchestrator가 사용자와 LLM 사이에 존재하면서 매 턴 프롬프트를 주입하고 출력을 파싱하는 기존 구조.
- **Compilation** - 절차(flowchart)를 합성 대화로 변환한 뒤 전체 파라미터를 갱신하는 fine-tuning으로 모델 가중치에 내재화하는 과정.
- **Procedure / Flowchart** - `F = (N, E, n₀, T)` 유향 그래프. node가 턴이고 edge가 전이다.
- **Decision hub** - 나가는 edge가 여러 개인 node. surface orchestration에서 LLM classifier가 라우팅하는 지점이자 실패가 몰리는 구간이다.
- **Procedural internalization** - 절차 구조를 통계적 규칙으로 가중치에 흡수하는 것. 자매 논문[2026b]에 따르면 LoRA(rank 16~128)로는 도달하지 못하고 전체 파라미터 갱신이 필요하다.
- **In-context baseline** - flowchart 전체를 직렬화해 system prompt에 넣고 frontier 모델이 스스로 절차를 수행하게 한 조건. 품질 상한이자 가장 비싼 baseline이다.
- **LangGraph orchestrator** - 본 논문 비교의 대표 surface orchestration framework. 2026-03 기준 GitHub star 약 3만 개이고 Claude Sonnet 4.5로 운영했다.
- **Dynamic user simulation** - Claude Sonnet 4.5가 시나리오 변수를 받아 고객 역할을 연기하는 평가 장치. flowchart를 모른다.
- **LLM-as-judge** - Zheng et al. 2023의 평가 방법. 본 논문은 Claude judge와 GPT-4.1 cross-judge로 self-preference bias를 통제했다.
- **Recompile cycle** - 절차 변경 시 (1) 새 flowchart로 데이터 재생성, (2) 전체 파라미터 fine-tuning, (3) 평가로 이어지는 주기. H200 8장에서 30~50분, A100 1장에서 3~4시간이다.
- **interview style** - 컴파일 모델이 학습 데이터에서 흡수한 턴당 질문 하나 패턴. 전체 턴의 64%가 정확히 질문 하나를 담는다.
- **i14** - 저자 4명의 공통 소속 표기. 논문에 별도 설명이 없고 제1저자만 University of Melbourne을 함께 적었다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | "surface orchestration과 subterranean agent의 런타임 구조 비교" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 17 | "여행 예약 절차 flowchart, node 14개" | caption-region | ★ wiki 권장 (method) |
| fig03 | 18 | "Zoom 기술 지원 절차 flowchart, node 14개" | caption-region | ★ wiki 권장 (method) |
| fig04 | 19 | "보험 청구 처리 절차 flowchart, node 55개" | caption-region | ★ wiki 권장 (method, 복잡도 대비) |
| tab01 | 5 | "여행 예약 품질 점수표" | table-region | 본문 표로 재현 (4.1절) |
| tab02 | 6 | "Zoom 지원 품질 점수표" | table-region | 본문 표로 재현 (4.2절) |
| tab03 | 6 | "보험 청구 품질 점수표" | table-region | 본문 표로 재현 (4.3절), 크롭 결함 |
| tab04 | 7 | "턴 수와 wall-clock 비교표" | table-region | 본문 표로 재현 (4.4절) |
| tab05 | 7 | "실패 대화 수와 실패율 표" | table-region | 본문 표로 재현 (4.4절) |
| tab06 | 8 | "대화당 추론 비용 비교표" | table-region | 본문 표로 재현 (4.6절) |
| tab07 | 15 | "여행 예약 쌍대 비교 통계표" | table-region | 본문 표로 재현 (4.1절) |
| tab08 | 15 | "Zoom 지원 쌍대 비교 통계표" | table-region | 본문 표로 재현 (4.2절), 크롭 결함 |
| tab09 | 15 | "보험 청구 쌍대 비교 통계표" | table-region | 본문 표로 재현 (4.3절) |
| tab10 | 16 | "GPT-4.1 judge 재현 점수표" | table-region | 본문 표로 재현 (4.8절) |

수치 표 크롭 10장(tab01에서 tab10)은 이미지 대신 본문 마크다운 표로 전량 재현했다. wiki에는 도식 4장만 임베드한다.

크롭 결함 2건을 확인했다. **tab03은 tab02와 바이트 단위로 같은 파일**이고, 두 항목의 `bbox`가 페이지 6의 같은 좌표(`[188.31, 94.19, 423.69, 176.67]`)로 배정되었다. 실제 Table 3은 같은 페이지 아래쪽에 있다. **tab08도 tab07과 같은 파일**이고 두 항목이 페이지 15의 `[129.13, 185.25, 482.87, 345.89]`를 공유한다. 실제 Table 8은 같은 페이지 중단에 있다. 재크롭 좌표는 아래와 같다(0~1 정규화, `extract_figures.py --force` 실행은 사람이 지시할 때만).

```
--bbox tab03=6:0.308,0.288,0.692,0.392
--bbox tab08=15:0.211,0.481,0.789,0.627
```
