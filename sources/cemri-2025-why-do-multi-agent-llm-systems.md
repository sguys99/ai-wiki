---
title: "Why Do Multi-Agent LLM Systems Fail?"
type: paper
year: 2025
category: agents
raw_path: raw/papers/cemri-2025-why-do-multi-agent-llm-systems.pdf
raw_filename: "cemri-2025-why-do-multi-agent-llm-systems.pdf"
source_collection: external
tags:
  - multi-agent
  - llm
  - failure-taxonomy
  - mast
  - agentic-systems
  - grounded-theory
  - llm-as-judge
  - benchmark
authors: "Mert Cemri, Melissa Z. Pan, Shuyi Yang, Lakshya A Agrawal, Bhavya Chopra, Rishabh Tiwari, Kurt Keutzer, Aditya Parameswaran, Dan Klein, Kannan Ramchandran, Matei Zaharia, Joseph E. Gonzalez, Ion Stoica"
arxiv_id: "2503.13657"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig01.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig01.png
    caption: "Figure 1: MAST 분류체계 - 14개 실패 모드를 3개 카테고리로 클러스터링한 전체 구조 (Pre-Execution / Execution / Post-Execution 단계 매핑 포함)"
    page: 2
    bbox_norm: [0.1521, 0.0807, 0.8666, 0.355]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig02.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig02.png
    caption: "Figure 2: MAST-Data 구축 방법론 워크플로우 - GT 분석 → 분류체계 개발 → IAA 검증(κ=0.88) → LLM annotator 캘리브레이션 → 1642 trace 라벨링"
    page: 5
    bbox_norm: [0.1735, 0.095, 0.8461, 0.2002]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig03.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig03.png
    caption: "Figure 3: FM-2.4 Information Withholding 실제 사례 - Phone Agent가 username이 phone_number여야 함을 Supervisor에게 알리지 않아 로그인 반복 실패"
    page: 6
    bbox_norm: [0.1925, 0.0682, 0.8154, 0.1903]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig04.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig04.png
    caption: "Figure 4: 7개 MAS 프레임워크별 실패 분포 (210 traces) - System Design 41.8% / Inter-Agent Misalignment 36.9% / Task Verification 21.3%"
    page: 8
    bbox_norm: [0.1659, 0.2318, 0.8362, 0.7997]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig05.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig05.png
    caption: "false positive (Figure 5 텍스트 참조)"
    page: 19
    bbox_norm: [0.3284, 0.1569, 0.6716, 0.3869]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig06.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig06.png
    caption: "Figure 6 (Appendix E): 3개 실패 카테고리 간 상관관계 매트릭스 (낮은 상관 0.17-0.32 - 카테고리 독립성 입증)"
    page: 22
    bbox_norm: [0.3284, 0.2917, 0.6716, 0.5109]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig07.png
    caption: "Figure 7 (Appendix E): 14개 fine-grained 실패 모드 간 상관관계 매트릭스 (최대 0.63)"
    page: 22
    bbox_norm: [0.2637, 0.5481, 0.7363, 0.8792]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig08.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig08.png
    caption: "false positive (Figure 8 텍스트 참조)"
    page: 23
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.2722]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig09.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig09.png
    caption: "Figure 9 (Appendix F): MetaGPT vs ChatDev 비교 (GPT-4o) - MetaGPT는 FC1/FC2에서 60-68% 적은 실패, 그러나 FC3 검증 실패는 1.56배 많음"
    page: 23
    bbox_norm: [0.1667, 0.3257, 0.8333, 0.5145]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig10.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig10.png
    caption: "Figure 10 (Appendix H): AG2 prompt/topology 개입 효과 - topology 변경이 prompt 변경보다 더 큰 실패 감소"
    page: 28
    bbox_norm: [0.199, 0.0833, 0.8009, 0.2765]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig11.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig11.png
    caption: "Figure 11 (Appendix H): ChatDev prompt/topology 개입 효과 - 동일하게 topology 변경이 더 효과적"
    page: 28
    bbox_norm: [0.199, 0.3213, 0.801, 0.5145]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab01.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab01.png
    caption: "Table 1: MAST-Data configuration details. HE: Human Evaluated (Task completions rates are checked by humans), HA: Human Annotated (Failure modes are annotated by humans), LA: LLM Annotated (Failure modes are annotated by LLM-as-a-Judge)."
    page: 3
    bbox_norm: [0.1879, 0.2519, 0.8121, 0.6071]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab02.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab02.png
    caption: "Table 2: Performance of LLM-as-a-judge pipeline"
    page: 6
    bbox_norm: [0.2985, 0.5613, 0.6978, 0.6348]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab03.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab03.png
    caption: "Table 3: Overview of MAS covered in MAST-Data"
    page: 19
    bbox_norm: [0.1675, 0.5255, 0.8247, 0.8209]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab04.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab04.png
    caption: "Table 4: Solution Strategies vs. Failure Category in Multi-Agent Systems"
    page: 26
    bbox_norm: [0.1765, 0.2972, 0.8235, 0.4505]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab05.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab05.png
    caption: "Table 5: Case Studies Accuracy Comparison. This table presents the performance accuracies (in percentages) for various scenarios in our case studies. The header rows group results by strategy: AG2 and ChatDev. Under AG2, GSM-Plus results are reported using GPT-4 and GPT-4o; under ChatDev, results fo"
    page: 27
    bbox_norm: [0.1707, 0.5235, 0.8293, 0.6381]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab06.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab06.png
    caption: "Table 6: Failure Mode Occurrences in 400 Traces with Open-Source Models. Results are grouped by model family (Qwen vs. CodeLlama) and development framework (ChatDev vs. MetaGPT)."
    page: 29
    bbox_norm: [0.2801, 0.1202, 0.7162, 0.4202]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab07.png
    caption: "Table 7: Failure mode occurrence rates for ChatDev and MetaGPT on successful and unsuccessful examples."
    page: 29
    bbox_norm: [0.1759, 0.7754, 0.8204, 0.9068]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab08.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab08.png
    caption: "Table 8: Failure Category Rates on Different Benchmarks"
    page: 30
    bbox_norm: [0.1667, 0.2585, 0.8445, 0.352]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab09.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab09.png
    caption: "Table 9: Average failure cost by MAS framework."
    page: 30
    bbox_norm: [0.3581, 0.4909, 0.6383, 0.6448]
    strategy: table-region
    curated: false
  - id: fig07
    label: (legacy)
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/legacy/fig07.png
    caption: "Figure 5 (Appendix B): 6개 MAS 프레임워크 작업 성공률 - AppWorld 13.3% ~ AG2 59.0%"
    page: 19
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
  - id: fig11
    label: (legacy)
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig11.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/legacy/fig11.png
    caption: "Figure 8 (Appendix F): GPT-4o vs Claude 3.7 Sonnet 실패 모드 비교 (MetaGPT, ProgramDev-v2) - GPT-4o가 FC1에서 39% 적게 실패"
    page: 23
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
---

## 한 줄 요약 (One-line Summary)

Multi-Agent LLM Systems(MAS)가 왜 실패하는지를 7개 SOTA 프레임워크의 1642개 trace를 Grounded Theory로 분석해 **14개 실패 모드 × 3개 카테고리**(System Design / Inter-Agent Misalignment / Task Verification)의 첫 경험적 분류체계 **MAST**를 정립하고, 실패의 뿌리가 LLM 자체보다 **시스템 설계와 조직 구조**에 있음을 보인 연구.

## 1. 자료 정보 (Document Information)

- **저자**: Mert Cemri, Melissa Z. Pan, Shuyi Yang 외 (UC Berkeley + Intesa Sanpaolo), 공동 1저자 3인
- **발행**: NeurIPS 2025 Track on Datasets and Benchmarks
- **arXiv**: 2503.13657v3 (2025-10-26)
- **공개 리소스**: 
  - 데이터셋: `MAST-Data` (1642 traces) + `MAST-Data-human` (21 traces, 3인 expert IAA 라벨)
  - 코드: github.com/multi-agent-systems-failure-taxonomy/MAST
  - 파이썬 라이브러리: `pip install agentdash`
  - HuggingFace: huggingface.co/datasets/mcemri/MAST-Data

## 2. 주요 기여 (Key Contributions)

1. **MAST 분류체계 (taxonomy)**: MAS 실패의 첫 경험적·구조화된 14개 fine-grained 실패 모드를 3개 카테고리로 묶었다. Grounded Theory(Glaser & Strauss 1967) 기반 150 trace 분석에서 도출했다.
2. **MAST-Data 데이터셋**: 7개 OSS MAS × 4개 모델 패밀리(GPT-4 시리즈, Claude 시리즈, Qwen2.5-Coder, CodeLlama)에서 수집한 1642 annotated traces. 코딩·수학·일반 agent 태스크를 커버한다.
3. **LLM-as-a-Judge annotator**: OpenAI o1 + few-shot으로 사람 expert와 κ=0.77 일치, trace 한 건당 평균 $1.8로 대규모 라벨링이 가능하다.
4. **분석 인사이트**: 프롬프트와 topology 개입만으로 ChatDev 성공률을 +9.4% ~ +15.6% 끌어올렸다. 다만 근본 해결에는 **구조적 재설계**가 필요하다는 점도 case study로 드러났다.
5. **검증된 일반화**: 초기 5개 MAS로 도출한 분류체계를 OpenManus·Magentic-One·MMLU·GAIA에 적용해도 κ=0.79를 유지했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 MAS 정의

- **Agent**: prompt specification (initial state), conversation trace (state), tool 사용 능력(action)을 갖춘 인공 엔티티.
- **MAS**: 오케스트레이션으로 상호작용하는 agent 집합 — task decomposition, 병렬화, context isolation, 전문 모델 ensembling, 다양한 reasoning 토론을 지원한다.

### 3.2 데이터 구축 파이프라인 (5단계)

1. **MAS trace 수집** — 5개 프레임워크(HyperAgent, AppWorld, AG2, ChatDev, MetaGPT)에서 150 trace를 확보했다. 각 trace 평균 15,000+ 줄.
2. **실패 식별 (Grounded Theory)** — Open coding → constant comparative → memoing → theorizing → theoretical saturation. expert 6인이 1인당 20시간 투입.
3. **Inter-Annotator Agreement (IAA)** — 3인 expert가 5 trace씩 독립 라벨링 → 합의 → 분류체계 refine을 3 라운드 반복, 최종 Cohen's κ = 0.88.
4. **LLM annotator 캘리브레이션** — o1 + few-shot으로 사람과 κ=0.77 달성 (zero-shot은 0.58).
5. **MAS Failure Dataset 생성** — 1642 traces 자동 라벨링과 합성. OpenManus·Magentic-One에 일반화 검증 κ=0.79.

### 3.3 14개 실패 모드 (3 카테고리)

**FC1. System Design Issues (44.2%)** — 시스템 설계 결정과 모호한 프롬프트 명세에서 비롯한다.
- FM-1.1 Disobey Task Specification (11.8%)
- FM-1.2 Disobey Role Specification (1.5%)
- FM-1.3 Step Repetition (15.7%)
- FM-1.4 Loss of Conversation History (2.8%)
- FM-1.5 Unaware of Termination Conditions (12.4%)

**FC2. Inter-Agent Misalignment (32.3%)** — agent 간 정보 흐름과 조정이 무너지는 지점.
- FM-2.1 Conversation Reset (2.2%)
- FM-2.2 Fail to Ask for Clarification (6.8%)
- FM-2.3 Task Derailment (7.4%)
- FM-2.4 Information Withholding (0.8%)
- FM-2.5 Ignored Other Agent's Input (1.9%)
- FM-2.6 Reasoning-Action Mismatch (13.2%)

**FC3. Task Verification (23.5%)** — 검증이 부실하거나 조기 종료가 일어나는 영역.
- FM-3.1 Premature Termination (6.2%)
- FM-3.2 No or Incomplete Verification (8.2%)
- FM-3.3 Incorrect Verification (9.1%)

### 3.4 세 가지 핵심 인사이트 (Insights)

- **Insight 1 (FC1)**: MAS 실패는 단순히 LLM의 함수가 아니다 — 잘 설계된 MAS는 동일한 모델로도 성능을 끌어올린다 (ChatDev role spec 개선만으로 +9.4%).
- **Insight 2 (FC2)**: context/communication protocol 중심 솔루션(MCP, A2A)은 FC2 실패에 충분하지 않다 — agent의 더 깊은 'social reasoning'(theory of mind) 능력이 필요하다.
- **Insight 3 (FC3)**: Multi-level 검증이 필요하다 — 최종 단계 low-level 체크 하나로는 부족하다 (예: 코드 컴파일은 통과해도 체스 규칙 검증이 빠지는 식).

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 MAS 실패율 (Figure 5, Appendix B)

| MAS | Benchmark | Success | Failure |
|---|---|---|---|
| AppWorld | Test-C | 13.3% | 86.7% |
| HyperAgent | SWE-Bench Lite | 25.3% | 74.7% |
| ChatDev | ProgramDev | 33.3% | 66.7% |
| Magentic-One | GAIA | 38.0% | 62.0% |
| MetaGPT | ProgramDev | 40.0% | 60.0% |
| AG2 | OlympiadBench | 59.0% | 41.0% |

### 4.2 LLM annotator 성능 (Table 2)

| Model | Accuracy | Recall | Precision | F1 | κ |
|---|---|---|---|---|---|
| o1 (zero-shot) | 0.89 | 0.62 | 0.68 | 0.64 | 0.58 |
| o1 (few-shot) | **0.94** | **0.77** | **0.83** | **0.80** | **0.77** |

### 4.3 개입 case studies (Table 5)

| Config | AG2 / GPT-4 | AG2 / GPT-4o | ChatDev ProgramDev-v0 | ChatDev HumanEval |
|---|---|---|---|---|
| Baseline | 84.75 | 84.25 | 25.0 | 89.6 |
| Improved prompt | **89.75** | 89.00 | 34.4 | 90.3 |
| New topology | 85.50 | 88.83 | **40.6** | **91.5** |

→ topology 변경이 prompt 변경보다 일관되게 효과가 더 크다.

### 4.4 LLM·MAS 비교 (Appendix F)

- **GPT-4o vs Claude 3.7 Sonnet (MetaGPT)**: GPT-4o가 FC1에서 39% 적은 실패 — instruction following이 더 강하다.
- **MetaGPT vs ChatDev (GPT-4o)**: MetaGPT는 FC1·FC2에서 60-68% 적지만, FC3는 1.56배 많다 — ChatDev의 명시적 review/test phase 덕분이다.
- **Open-source 모델**: Qwen2.5-Coder-32B는 비교적 robust한 반면, CodeLlama-7B는 모든 카테고리에서 가장 자주 실패한다.

### 4.5 실패-성공 상관 (Appendix J.1)

- "fatal" 실패 모드: FM-1.5 (Unaware of Termination), FM-2.4 (Information Withholding) — 실패 trace에 거의 독점적으로 나타난다.
- "non-fatal" 실패 모드: FM-3.2/3.3 — 성공 trace에도 자주 등장한다 (시스템의 구조적 약점 시그널).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **분류체계 망라성**: MAST가 모든 실패 패턴을 커버한다고 주장하지 않는다 — foundational first step이다.
- **Closed-source MAS 분석 한계**: Manus 등은 trace 비공개여서 fine-grained 라벨링이 불가능하다 (대신 task success만 평가, ProgramDev 60%).
- **LLM annotator 한계**: fine-grained 모드 간 moderate 상관 (max 0.63)이 conflate 위험을 만든다.
- **Tactical 개입의 한계**: prompt/topology 단발 개입은 +9.4~15.6% 개선에 그친다 — 전체 신뢰성 향상에는 **구조적 재설계**가 필요하다 (Section G.2).
- **향후 연구 방향** (Table 4):
  - **Structural strategies**: 종합 검증과 unit test 생성, 표준화된 통신 프로토콜, 확률적 confidence 측정, memory/state 관리.
  - High-reliability organization 이론 (Perrow 1984, Roberts 1989)을 차용한 조직 설계.

## 6. 관련 연구 (Related Work)

- **Agentic 시스템 도전과제**: Agent Workflow Memory [22], DSPy [23], StateFlow [24], multi-agent risks survey [25,26]
- **Agentic 벤치마크**: SWE-Bench [27], BattleAgentBench [29], BenchMARL [31], TeamCraft [32]
- **Design principles**: Anthropic의 "Building effective agents" [35], Kapoor et al. "AI agents that matter" [19], Stoica et al. specifications [36]
- **유사 분류·debugger**: Bansal et al. human-agent communication [37], MT-Bench-101 [38], AgentEval [40], AGDebugger [41], Who&When [42]
- **MAS 프레임워크**: ChatDev [5,56], MetaGPT [52], HyperAgent [53], AppWorld [54], AG2/AutoGen [55,57], Magentic-One [11], OpenManus [10], Manus [45]
- **이론적 토대**: Grounded Theory [20,43,44], LLM-as-a-Judge [21], Normal Accidents [49], High-Reliability Organizations [50,51], Theory of Mind in MAS [48]

## 7. 용어집 (Glossary)

- **MAS (Multi-Agent System)**: 여러 LLM-based agent가 orchestration으로 협업해 task를 해결하는 시스템.
- **MAST (Multi-Agent System Failure Taxonomy)**: 본 논문이 제안한 14모드 × 3카테고리 실패 분류체계.
- **MAST-Data**: 7개 MAS × 4개 모델에서 수집한 1642개 annotated traces.
- **Grounded Theory (GT)**: 사전 가설 없이 데이터에서 이론을 귀납적으로 끌어내는 질적 연구 방법론.
- **Inter-Annotator Agreement (IAA)**: 다중 annotator 간 라벨 일치도 — Cohen's κ로 측정.
- **LLM-as-a-Judge**: LLM을 채점·라벨러로 쓰는 패턴 (Zheng et al. 2023).
- **FC (Failure Category) / FM (Failure Mode)**: MAST에서 카테고리(3개)와 모드(14개)의 약어.
- **Theoretical Saturation**: GT에서 추가 데이터 분석이 더는 새로운 인사이트를 내놓지 않는 시점.
- **Theory of Mind**: 다른 agent의 정보 요구·상태를 모델링하는 능력 — FC2 실패의 근본 원인.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1: MAST 분류체계 - 14모드 × 3카테고리 전체 구조" | page-region | ★★★ wiki 필수 (architecture/taxonomy) |
| fig02 | 2 | false positive (Figure 5 텍스트 참조) | page-region | ✗ 제외 |
| fig03 | 5 | "Figure 2: MAST-Data 구축 워크플로우 (GT → IAA → LLM annotator)" | page-region | ★★ wiki 권장 (method) |
| fig04 | 6 | "Figure 3: FM-2.4 Information Withholding 실제 trace 예시" | page-region | ★★ wiki 권장 (example) |
| fig05 | 7 | false positive (FM-2.5 본문 인라인 참조) | page-region | ✗ 제외 |
| fig06 | 8 | "Figure 4: 7개 MAS 프레임워크별 실패 분포 막대그래프" | page-region | ★★ wiki 권장 (result) |
| fig07 | 19 | "Figure 5 (Appendix B): 6개 MAS 작업 성공률 비교" | page-region | ★ wiki 선택 (summary) |
| fig08 | 21 | false positive (Figure 8 텍스트 참조) | page-region | ✗ 제외 |
| fig09 | 22 | "Figure 6 (Appendix E): 3개 카테고리 상관관계 매트릭스" | page-region | (선택) appendix |
| fig10 | 22 | "Figure 7 (Appendix E): 14모드 상관관계 매트릭스" | page-region | (선택) appendix |
| fig11 | 23 | "Figure 8 (Appendix F): GPT-4o vs Claude 비교" | page-region | ★ wiki 선택 (LLM 비교) |
| fig12 | 23 | "Figure 9 (Appendix F): MetaGPT vs ChatDev 비교" | page-region | ★ wiki 선택 (MAS 비교) |
| fig13 | 28 | "Figure 10 (Appendix H): AG2 개입 효과" | page-region | (선택) intervention |
| fig14 | 28 | "Figure 11 (Appendix H): ChatDev 개입 효과" | page-region | (선택) intervention |

**기본 권장 큐레이션**: `fig01, fig03, fig04, fig06` (필수 4개) — taxonomy + 방법론 + 예시 + 결과 분포를 모두 커버. 
**확장 옵션**: `fig07, fig11, fig12` 추가하면 작업 성공률 + LLM/MAS 비교까지 포함.

> 사용자 confirm 대기 — wiki에 넣을 fig ID를 지정해주세요. 예: "fig01, fig03, fig04, fig06" 또는 "기본 권장 4개로 진행".

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-11-001
metrics:
  char_in: 3704
  char_out: 3742
  change_rate: 8.2%
  self_check: 6/6
  grade: A
categories:  # before → after
  A-7 가지고 있다 직역: 1 → 0
  A-9 ~에 의해/기인함: 2 → 0
  A-10 가능케 함: 1 → 0
  A-15 인지 동사 직역: 1 → 0
  D-4 압도적 hype: 1 → 0
  D-6 결말 공식 (입증한): 1 → 0
  E-2 명사형 결말 '~함': 4 → 0
  H-1 그러나 문두: 1 → 0
self_check:
  - 고유명사·수치·인용 100% 보존: 통과 (영문 용어·수치·참조 번호 전수 보존)
  - 변경률 30% 이하: 통과 (8.2%)
  - 장르 이탈 없음: 통과 (논문 요약 리포트 register 유지)
  - register 보존: 통과 (격식 평서체 일관)
  - S1 잔존 0건: 통과
  - 인공 표현 추가 없음: 통과 (비유·수사 신규 도입 없음)
highlights:
  - id: A-9 + D-6
    before: "실패가 LLM 자체보다 시스템 설계·조직 구조에 기인함을 입증한 연구"
    after: "실패의 뿌리가 LLM 자체보다 시스템 설계와 조직 구조에 있음을 보인 연구"
  - id: E-2
    before: "task decomposition / 병렬화 / context isolation / 전문 모델 ensembling / 다양한 reasoning 토론을 가능케 함"
    after: "task decomposition, 병렬화, context isolation, 전문 모델 ensembling, 다양한 reasoning 토론을 지원한다"
  - id: H-1 + A-10
    before: "프롬프트/topology 개입으로 ChatDev에서 +9.4% ~ +15.6% 성공률 향상 — 그러나 근본적 해결을 위해서는 구조적 재설계가 필요함을 case study로 입증"
    after: "프롬프트와 topology 개입만으로 ChatDev 성공률을 +9.4% ~ +15.6% 끌어올렸다. 다만 근본 해결에는 구조적 재설계가 필요하다는 점도 case study로 드러났다"
  - id: D-4
    before: "CodeLlama-7B는 모든 카테고리에서 압도적으로 많이 실패"
    after: "CodeLlama-7B는 모든 카테고리에서 가장 자주 실패한다"
residual_findings: (없음 — S2 잔존 2건 이하, A-13류 hedging은 원문 의미 유지 필요로 보존)
grade_reason: "A — S1 0건, 변경률 8.2%, 자체검증 6항 통과. 영문 기술용어·수치·참조 번호 전수 보존, 논문 요약 리포트 register 일관."
-->
