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
    caption: "Figure 1: MAST 분류체계 전체 구조. 14개 실패 모드를 3개 카테고리로 묶고 각 모드를 MAS 실행 단계(Pre-Execution, Execution, Post-Execution)에 매핑했다"
    page: 2
    bbox_norm: [0.1521, 0.0807, 0.8666, 0.355]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig02.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig02.png
    caption: "Figure 2: MAST-Data 구축 방법론 워크플로. trace 수집에서 Grounded Theory 분석, 분류체계 개발, IAA 검증(κ=0.88), LLM annotator 캘리브레이션, 1,642개 trace 라벨링까지"
    page: 5
    bbox_norm: [0.1735, 0.095, 0.8461, 0.2002]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig03.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig03.png
    caption: "Figure 3: FM-2.4 Information Withholding 실제 trace 사례. Phone Agent가 username이 phone_number여야 한다는 API 요구를 Supervisor Agent에게 알리지 않아 로그인이 반복 실패한다"
    page: 6
    bbox_norm: [0.1925, 0.0682, 0.8154, 0.1903]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig04.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig04.png
    caption: "Figure 4: 7개 MAS 프레임워크별 실패 분포 (210개 trace 기준). System Design 41.8%, Inter-Agent Misalignment 36.9%, Task Verification 21.3%"
    page: 8
    bbox_norm: [0.1659, 0.2318, 0.8362, 0.7997]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig05.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig05.png
    caption: "검출 오탐. 본문의 Figure 5 참조 문장을 캡션으로 잡았다"
    page: 19
    bbox_norm: [0.3284, 0.1569, 0.6716, 0.3869]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig06.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig06.png
    caption: "Figure 6 (Appendix E): 3개 실패 카테고리 간 상관관계 행렬. 상관이 0.17에서 0.32로 낮아 카테고리가 서로 다른 국면을 잡는다는 근거가 된다"
    page: 22
    bbox_norm: [0.3284, 0.2917, 0.6716, 0.5109]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig07.png
    caption: "Figure 7 (Appendix E): 14개 fine-grained 실패 모드 간 상관관계 행렬. 최대 상관은 FM-1.4와 FM-2.1 사이의 0.63이다"
    page: 22
    bbox_norm: [0.2637, 0.5481, 0.7363, 0.8792]
    strategy: caption-region
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig08.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig08.png
    caption: "검출 오탐. 본문의 Figure 8 참조 문장을 캡션으로 잡았다"
    page: 23
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.2722]
    strategy: caption-region
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig09.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig09.png
    caption: "Figure 9 (Appendix F): MAS 아키텍처 효과 비교. GPT-4o를 고정하고 ChatDev와 MetaGPT를 ProgramDev-v2에서 실행한 실패 모드별, 카테고리별 건수"
    page: 23
    bbox_norm: [0.1667, 0.3257, 0.8333, 0.5145]
    strategy: caption-region
    curated: true
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig10.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig10.png
    caption: "Figure 10 (Appendix H): AG2에 프롬프트 개입과 topology 개입을 적용했을 때의 실패 건수 변화"
    page: 28
    bbox_norm: [0.199, 0.0833, 0.8009, 0.2765]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/fig11.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/fig11.png
    caption: "Figure 11 (Appendix H): ChatDev에 프롬프트 개입과 topology 개입을 적용했을 때의 실패 건수 변화"
    page: 28
    bbox_norm: [0.199, 0.3213, 0.801, 0.5145]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab01.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab01.png
    caption: "Table 1: MAST-Data 구성표. 7개 MAS와 벤치마크, 사용 모델, 라벨링 방식(HE 사람 평가, HA 사람 라벨링, LA LLM 라벨링), trace 수를 18개 설정으로 나열했다"
    page: 3
    bbox_norm: [0.1879, 0.2519, 0.8121, 0.6071]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab02.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab02.png
    caption: "Table 2: LLM-as-a-Judge annotator 성능. o1의 zero-shot과 few-shot 설정에서 accuracy, recall, precision, F1, Cohen's κ를 비교했다"
    page: 6
    bbox_norm: [0.2985, 0.5613, 0.6978, 0.6348]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab03.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab03.png
    caption: "Table 3: MAST-Data가 다루는 7개 MAS 개요. 각 시스템의 agentic 구조(assembly line, hierarchical workflow, star topology)와 목적을 정리했다"
    page: 19
    bbox_norm: [0.1675, 0.5255, 0.8247, 0.8209]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab04.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab04.png
    caption: "Table 4: 실패 카테고리별 해결 전략 매핑. 각 카테고리에 대응하는 tactical 접근과 structural 전략을 나란히 놓았다"
    page: 26
    bbox_norm: [0.1765, 0.2972, 0.8235, 0.4505]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab05.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab05.png
    caption: "Table 5: 개입 case study 정확도 비교. AG2(GSM-Plus)와 ChatDev(ProgramDev-v0, HumanEval)에서 baseline, 프롬프트 개선, topology 재설계 세 설정의 성공률을 비교했다"
    page: 27
    bbox_norm: [0.1707, 0.5235, 0.8293, 0.6381]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab06.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab06.png
    caption: "Table 6: open-source 모델 400개 trace의 실패 모드 발생 건수. Qwen2.5-Coder-32B와 CodeLlama-7B를 ChatDev, MetaGPT에서 각각 비교했다"
    page: 29
    bbox_norm: [0.2801, 0.1202, 0.7162, 0.4202]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab07.png
    caption: "Table 7: 성공 trace와 실패 trace의 실패 모드 발생률. ChatDev와 MetaGPT를 각각 성공, 실패로 나눠 14개 모드의 발생 비율을 적었다"
    page: 29
    bbox_norm: [0.1759, 0.7754, 0.8204, 0.9068]
    strategy: table-region
    curated: false
  - id: tab08
    label: Table 8
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab08.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab08.png
    caption: "Table 8: 벤치마크별 실패 카테고리 발생률. AG2와 GPT-4o를 고정하고 GSM, MMLU, OlympiadBench를 비교했다"
    page: 30
    bbox_norm: [0.1667, 0.2585, 0.8445, 0.352]
    strategy: table-region
    curated: false
  - id: tab09
    label: Table 9
    kind: table
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/tab09.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/tab09.png
    caption: "Table 9: MAS 프레임워크별 LLM annotator 평균 비용(달러). trace 길이에 따라 AppWorld 0.37달러에서 OpenManus 4.14달러까지 벌어진다"
    page: 30
    bbox_norm: [0.3581, 0.4909, 0.6383, 0.6448]
    strategy: table-region
    curated: false
  - id: legacy-fig07
    label: Figure 5 (legacy)
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/legacy-fig07.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/legacy/fig07.png
    caption: "Figure 5 (Appendix B): 6개 MAS 프레임워크의 작업 성공률과 실패율. AppWorld 13.3%에서 AG2 59.0%까지 분포한다"
    page: 19
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
  - id: legacy-fig11
    label: Figure 8 (legacy)
    kind: figure
    file: assets/cemri-2025-why-do-multi-agent-llm-systems/legacy-fig11.png
    raw: raw/papers/cemri-2025-why-do-multi-agent-llm-systems-figures/legacy/fig11.png
    caption: "Figure 8 (Appendix F): LLM 선택 효과 비교. MetaGPT와 ProgramDev-v2를 고정하고 GPT-4o와 Claude 3.7 Sonnet의 실패 모드별, 카테고리별 건수를 비교했다"
    page: 23
    bbox_norm: [0.0, 0.0, 1.0, 1.0]
    strategy: legacy-page-region
    low_confidence: true
    curated: true
---

## 한 줄 요약 (One-line Summary)

Multi-Agent LLM Systems(MAS)가 실패하는 이유를 7개 SOTA 프레임워크의 1,642개 실행 trace를 Grounded Theory로 분석해 14개 실패 모드와 3개 카테고리(System Design, Inter-Agent Misalignment, Task Verification)의 첫 경험적 분류체계 MAST로 정립하고, 실패의 뿌리가 LLM 자체보다 시스템 설계와 조직 구조에 있음을 보인 연구다.

## 1. 자료 정보 (Document Information)

- **저자**: Mert Cemri, Melissa Z. Pan, Shuyi Yang 외 (UC Berkeley, Intesa Sanpaolo), 공동 1저자 3인
- **발행**: NeurIPS 2025 Track on Datasets and Benchmarks
- **arXiv**: 2503.13657v3 (2025-10-26)
- **공개 리소스**:
  - 데이터셋: `MAST-Data` (1,642개 trace)와 `MAST-Data-human` (21개 trace, 3인 expert IAA 라벨)
  - 코드: github.com/multi-agent-systems-failure-taxonomy/MAST
  - 파이썬 라이브러리: `pip install agentdash`
  - HuggingFace: huggingface.co/datasets/mcemri/MAST-Data

## 2. 주요 기여 (Key Contributions)

1. **MAST 분류체계 (taxonomy)**: MAS 실패의 첫 경험적, 구조화된 14개 fine-grained 실패 모드를 3개 카테고리로 묶었다. Grounded Theory(Glaser & Strauss 1967) 기반으로 150개 trace를 분석해 도출했다.
2. **MAST-Data 데이터셋**: 7개 OSS MAS와 4개 모델 패밀리(GPT-4 시리즈, Claude 시리즈, Qwen2.5-Coder, CodeLlama)에서 수집한 1,642개 annotated trace. 코딩, 수학, 일반 agent 태스크를 커버한다.
3. **LLM-as-a-Judge annotator**: OpenAI o1과 few-shot 예시로 사람 expert와 κ=0.77 일치했고, trace 한 건당 평균 1.8달러로 대규모 라벨링이 가능하다.
4. **분석 인사이트**: 프롬프트와 topology 개입만으로 ChatDev 성공률을 9.4%p에서 15.6%p 끌어올렸다. 다만 근본 해결에는 구조적 재설계가 필요하다는 점도 case study로 드러났다.
5. **검증된 일반화**: 초기 5개 MAS로 도출한 분류체계를 OpenManus, Magentic-One, MMLU, GAIA에 적용해도 κ=0.79를 유지했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 MAS 정의

- **Agent**: prompt specification(초기 상태), conversation trace(상태), tool use를 포함한 환경 상호작용 능력(action)을 갖춘 인공 엔티티.
- **MAS**: 오케스트레이션으로 상호작용하는 agent 집합. task decomposition, 병렬화, context isolation, 전문 모델 ensembling, 다양한 reasoning 토론을 지원한다.

### 3.2 데이터 구축 파이프라인 (5단계)

1. **MAS trace 수집**: 5개 프레임워크(HyperAgent, AppWorld, AG2, ChatDev, MetaGPT)에서 150개 trace를 확보했다. 각 trace는 평균 15,000줄이 넘는다.
2. **실패 식별 (Grounded Theory)**: open coding에서 constant comparative analysis, memoing, theorizing을 거쳐 theoretical saturation에 도달했다. expert 6인이 1인당 20시간을 투입했다.
3. **Inter-Annotator Agreement (IAA)**: 3인 expert가 5개 trace씩 독립 라벨링한 뒤 합의하고 분류체계를 다듬는 과정을 3라운드 반복했다. 불일치 해소에만 총 10시간이 들었고 최종 Cohen's κ는 0.88이다.
4. **LLM annotator 캘리브레이션**: o1과 few-shot 예시로 사람과 κ=0.77을 달성했다. zero-shot은 0.58에 그친다.
5. **MAS Failure Dataset 생성**: 1,642개 trace를 자동 라벨링했다. OpenManus와 Magentic-One에 대한 일반화 검증에서 κ=0.79가 나왔다.

### 3.3 14개 실패 모드 (3 카테고리)

**FC1. System Design Issues (44.2%)**: 시스템 설계 결정과 모호한 프롬프트 명세에서 비롯한다.

- FM-1.1 Disobey Task Specification (11.8%)
- FM-1.2 Disobey Role Specification (1.50%)
- FM-1.3 Step Repetition (15.7%)
- FM-1.4 Loss of Conversation History (2.80%)
- FM-1.5 Unaware of Termination Conditions (12.4%)

**FC2. Inter-Agent Misalignment (32.3%)**: agent 간 정보 흐름과 조정이 끊기는 지점이다.

- FM-2.1 Conversation Reset (2.20%)
- FM-2.2 Fail to Ask for Clarification (6.80%)
- FM-2.3 Task Derailment (7.40%)
- FM-2.4 Information Withholding (0.80%)
- FM-2.5 Ignored Other Agent's Input (1.90%)
- FM-2.6 Reasoning-Action Mismatch (13.2%)

**FC3. Task Verification (23.5%)**: verification이 부실하거나 조기 종료가 일어나는 영역이다.

- FM-3.1 Premature Termination (6.20%)
- FM-3.2 No or Incomplete Verification (8.20%)
- FM-3.3 Incorrect Verification (9.10%)

### 3.4 세 가지 핵심 인사이트 (Insights)

- **Insight 1 (FC1)**: MAS 실패는 단순히 LLM의 함수가 아니다. 잘 설계된 MAS는 동일한 모델로도 성능을 끌어올린다. ChatDev의 role specification 개선만으로 9.4%p가 올랐다.
- **Insight 2 (FC2)**: context와 통신 프로토콜 중심 솔루션(MCP, A2A)은 FC2 실패에 충분하지 않다. agent의 더 깊은 social reasoning, 즉 theory of mind 능력이 필요하다.
- **Insight 3 (FC3)**: multi-level verification이 필요하다. 최종 단계의 low-level 체크 하나로는 부족하다. 예를 들어 코드 컴파일은 통과해도 체스 규칙 검증이 빠지는 식이다.

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

벤치마크가 서로 달라 시스템 간 직접 비교는 성립하지 않는다. 다만 절대 실패율이 41%에서 86.7% 구간에 있다는 사실은 공통이다.

### 4.2 LLM annotator 성능 (Table 2)

| Model | Accuracy | Recall | Precision | F1 | κ |
|---|---|---|---|---|---|
| o1 (zero-shot) | 0.89 | 0.62 | 0.68 | 0.64 | 0.58 |
| o1 (few-shot) | **0.94** | **0.77** | **0.833** | **0.80** | **0.77** |

### 4.3 개입 case studies (Table 5)

| Config | AG2 / GPT-4 | AG2 / GPT-4o | ChatDev ProgramDev-v0 | ChatDev HumanEval |
|---|---|---|---|---|
| Baseline | 84.75 | 84.25 | 25.0 | 89.6 |
| Improved prompt | **89.75** | 89.00 | 34.4 | 90.3 |
| New topology | 85.50 | 88.83 | **40.6** | **91.5** |

AG2는 GSM-Plus에서 200문제를 6회 반복 측정했고 표준편차는 1.18에서 1.94 사이다. GPT-4에서는 topology 변경의 Wilcoxon p값이 0.4로 유의하지 않았고, GPT-4o에서는 프롬프트와 topology 모두 p값 0.03으로 유의했다. ChatDev에서는 topology 변경이 프롬프트 변경보다 효과가 컸다.

### 4.4 LLM과 MAS 아키텍처 비교 (Appendix F)

- **GPT-4o 대 Claude 3.7 Sonnet (MetaGPT 고정)**: GPT-4o가 FC1에서 39% 적게 실패한다. instruction following이 더 강하다는 해석이다. 카테고리별 건수는 FC1이 63건 대 38건, FC2가 58건 대 47건, FC3가 83건 대 77건이다.
- **MetaGPT 대 ChatDev (GPT-4o 고정)**: MetaGPT는 FC1과 FC2에서 60%에서 68% 적게 실패하지만 FC3 실패는 더 많다. Figure 9의 막대값은 FC1 118건 대 38건, FC2 116건 대 47건, FC3 30건 대 77건이다. 본문은 FC3 격차를 1.56배로 적고 있어 그림 값과 차이가 있다.
- **Open-source 모델 (Table 6)**: Qwen2.5-Coder-32B는 비교적 robust한 반면, CodeLlama-7B는 모든 카테고리에서 가장 자주 실패한다. 두 모델 모두 GPT-4o와 Claude 3 계열보다 실패 빈도가 높다.

### 4.5 벤치마크 난이도와 실패율 (Table 8)

AG2와 GPT-4o를 고정하고 벤치마크만 바꾼 결과다. 값은 trace 수로 정규화한 발생률이다.

| Benchmark | FC1 | FC2 | FC3 |
|---|---|---|---|
| GSM | 0.53 | 1.33 | 0.37 |
| MMLU | 1.06 | 1.01 | 0.60 |
| OlympiadBench | 1.19 | 1.21 | 0.67 |

벤치마크가 어려울수록 실패율이 높아지고, MMLU와 OlympiadBench는 프로파일이 서로 비슷하다. GSM은 FC1과 FC3가 눈에 띄게 낮다.

### 4.6 실패와 성공의 상관 (Appendix J.1)

- fatal에 가까운 실패 모드: FM-1.5(Unaware of Termination Conditions)와 FM-2.4(Information Withholding)는 실패 trace에 거의 독점적으로 나타난다.
- non-fatal 실패 모드: FM-3.2와 FM-3.3은 성공 trace에도 자주 등장한다. 작업은 끝났지만 verification 절차에 구조적 약점이 남아 있다는 신호다.
- 성공한 실행에도 실패 모드는 존재한다. 다만 실패 trace의 전체 발생 빈도가 더 높다.

### 4.7 개입이 실패 분포에 미친 영향 (Figures 10, 11)

LLM annotator가 센 카테고리별 실패 건수다.

| 시스템 | 설정 | FC1 | FC2 | FC3 |
|---|---|---|---|---|
| AG2 | Original | 625 | 692 | 305 |
| AG2 | Prompt | 687 | 796 | 335 |
| AG2 | Topology | 171 | 205 | 86 |
| ChatDev | Original | 424 | 447 | 209 |
| ChatDev | Prompt | 372 | 403 | 176 |
| ChatDev | Topology | 355 | 376 | 169 |

ChatDev는 프롬프트와 topology 개입 모두에서 건수가 줄었다. AG2는 topology 개입에서만 크게 줄었고 프롬프트 개입에서는 오히려 늘었다. 두 시스템 모두 topology 변경이 더 효과적이라는 본문 결론과 방향은 일치한다.

### 4.8 LLM annotator 비용 (Table 9, Appendix K)

trace 한 건당 평균 1.8달러이고 trace 길이에 따라 크게 갈린다. AppWorld 0.3740달러, HyperAgent 0.9695달러, AG2 1.1656달러, Magentic-One 1.3056달러, ChatDev 2.1272달러, MetaGPT 2.4455달러, OpenManus 4.1409달러다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **분류체계 망라성**: MAST가 모든 실패 패턴을 커버한다고 주장하지 않는다. foundational first step이라는 위치다.
- **Closed-source MAS 분석 한계**: Manus 등은 trace가 비공개여서 fine-grained 라벨링이 불가능하다. 대신 작업 성공률만 사람이 평가했고 ProgramDev에서 60%가 나왔다.
- **LLM annotator 한계**: fine-grained 모드 간 상관이 최대 0.63으로 중간 수준이라 서로 다른 근본 원인을 섞어버릴 위험이 남는다. 카테고리 수준 상관은 0.17에서 0.32로 낮다.
- **Tactical 개입의 한계**: 프롬프트와 topology 단발 개입은 9.4%p에서 15.6%p 개선에 그친다. ChatDev는 개선 후에도 절대 성공률이 40.6%다. 전체 신뢰성 향상에는 구조적 재설계가 필요하다 (Section G.2).
- **향후 연구 방향** (Table 4): 종합 verification과 unit test 생성, 표준화된 통신 프로토콜, 확률적 confidence 측정, 메모리와 상태 관리를 structural strategy로 제시한다. high-reliability organization 이론(Perrow 1984, Roberts 1989)을 차용한 조직 설계 관점도 함께 제안한다.

## 6. 관련 연구 (Related Work)

- **Agentic 시스템 도전과제**: Agent Workflow Memory [22], DSPy [23], StateFlow [24], multi-agent risks survey [25, 26]
- **Agentic 벤치마크**: SWE-Bench [27], BattleAgentBench [29], BenchMARL [31], TeamCraft [32]
- **Design principles**: Anthropic의 "Building effective agents" [35], Kapoor et al. "AI agents that matter" [19], Stoica et al. specifications [36]
- **유사 분류와 debugger**: Bansal et al. human-agent communication [37], MT-Bench-101 [38], AgentEval [40], AGDebugger [41], Who&When [42]
- **MAS 프레임워크**: ChatDev [5, 56], MetaGPT [52], HyperAgent [53], AppWorld [54], AG2/AutoGen [55, 57], Magentic-One [11], OpenManus [10], Manus [45]
- **이론적 토대**: Grounded Theory [20, 43, 44], LLM-as-a-Judge [21], Normal Accidents [49], High-Reliability Organizations [50, 51], Theory of Mind in MAS [48]

## 7. 용어집 (Glossary)

- **MAS (Multi-Agent System)**: 여러 LLM 기반 agent가 오케스트레이션으로 협업해 task를 해결하는 시스템.
- **MAST (Multi-Agent System Failure Taxonomy)**: 이 논문이 제안한 14개 모드와 3개 카테고리의 실패 분류체계.
- **MAST-Data**: 7개 MAS와 4개 모델에서 수집한 1,642개 annotated trace.
- **Grounded Theory (GT)**: 사전 가설 없이 데이터에서 이론을 귀납적으로 끌어내는 질적 연구 방법론.
- **Inter-Annotator Agreement (IAA)**: 다중 annotator 간 라벨 일치도. Cohen's κ로 측정한다.
- **LLM-as-a-Judge**: LLM을 채점자나 라벨러로 쓰는 패턴 (Zheng et al. 2023).
- **FC (Failure Category) / FM (Failure Mode)**: MAST에서 카테고리 3개와 모드 14개를 가리키는 약어.
- **Theoretical Saturation**: GT에서 추가 데이터 분석이 더는 새로운 인사이트를 내놓지 않는 시점.
- **Theory of Mind**: 다른 agent의 정보 요구와 상태를 모델링하는 능력. FC2 실패의 근본 원인으로 지목된다.
- **ProgramDev 계열 벤치마크**: ProgramDev는 30문제, ProgramDev-v2는 100문제, ProgramDev-v0는 32문제로 구성된 프로그램 생성 과제 모음.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "Figure 1: MAST 분류체계 전체 구조" | caption-region | ★★★ wiki 필수 (architecture/taxonomy) |
| fig02 | 5 | "Figure 2: MAST-Data 구축 워크플로" | caption-region | ★★ wiki 권장 (method) |
| fig03 | 6 | "Figure 3: FM-2.4 Information Withholding trace 예시" | caption-region | ★★ wiki 권장 (example) |
| fig04 | 8 | "Figure 4: 7개 MAS 프레임워크별 실패 분포" | caption-region | ★★ wiki 권장 (result) |
| fig05 | 19 | 검출 오탐 (본문 Figure 5 참조 문장) | caption-region | ✗ 제외 |
| fig06 | 22 | "Figure 6 (Appendix E): 3개 카테고리 상관관계 행렬" | caption-region | (선택) appendix |
| fig07 | 22 | "Figure 7 (Appendix E): 14개 모드 상관관계 행렬" | caption-region | (선택) appendix |
| fig08 | 23 | 검출 오탐 (본문 Figure 8 참조 문장) | caption-region | ✗ 제외 |
| fig09 | 23 | "Figure 9 (Appendix F): MetaGPT 대 ChatDev 비교" | caption-region | ★ wiki 선택 (MAS 비교) |
| fig10 | 28 | "Figure 10 (Appendix H): AG2 개입 효과" | caption-region | (선택) intervention |
| fig11 | 28 | "Figure 11 (Appendix H): ChatDev 개입 효과" | caption-region | (선택) intervention |
| legacy-fig07 | 19 | "Figure 5 (Appendix B): 6개 MAS 작업 성공률 비교" | legacy-page-region | ★ wiki 선택 (summary) |
| legacy-fig11 | 23 | "Figure 8 (Appendix F): GPT-4o 대 Claude 비교" | legacy-page-region | ★ wiki 선택 (LLM 비교) |

`legacy-fig07`과 `legacy-fig11`은 2026-08 정밀 크롭 전환 이전의 전면 페이지 캡처다. 새 검출이 같은 도식을 잡지 못해 `-figures/legacy/`에 남았고, id 충돌을 피하려고 `legacy-` 접두를 붙였다.

tab01에서 tab09까지 9개 표 크롭도 frontmatter에 `curated: false` 후보로 남아 있다. 본문 표로 옮겨 적었으므로 이미지 임베드는 하지 않는다.

**기본 권장 큐레이션**: `fig01, fig02, fig03, fig04` 4개로 taxonomy, 방법론, 사례, 결과 분포를 모두 커버한다.
**확장 옵션**: `legacy-fig07, legacy-fig11, fig09`를 더하면 작업 성공률과 LLM, MAS 비교까지 포함한다.
