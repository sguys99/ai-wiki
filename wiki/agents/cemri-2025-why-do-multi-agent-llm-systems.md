---
title: "Why Do Multi-Agent LLM Systems Fail?"
type: paper
year: 2025
category: agents
source: cemri-2025-why-do-multi-agent-llm-systems.md
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/cemri-2025-why-do-multi-agent-llm-systems.pdf
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

## 요약 (Summary)

Multi-Agent LLM Systems(MAS) 7개 SOTA 프레임워크에서 모은 1642개 실행 trace를 Grounded Theory로 분석해, **14개 실패 모드 × 3개 카테고리**(System Design / Inter-Agent Misalignment / Task Verification)로 정리한 첫 경험적 분류체계 **MAST**를 제시한 NeurIPS 2025 논문. SOTA MAS의 실패율이 41~87%에 달하며, 그 원인이 LLM 자체의 한계라기보다 **시스템 설계와 조직 구조**에 있다는 점을 case study로 짚었다.

핵심 자산: `MAST-Data` 1642 traces(Hugging Face) · `pip install agentdash` 파이썬 라이브러리 · LLM-as-a-Judge annotator(o1, κ=0.77 사람 일치).

## 주요 기여 (Key Contributions)

1. **MAST 분류체계** — Grounded Theory로 150 trace를 분석해 도출했고, Cohen's κ=0.88의 IAA로 검증했다.
2. **MAST-Data 데이터셋** — 7개 OSS MAS × 4개 모델 패밀리에서 모은 1642 annotated traces. 코딩·수학·일반 agent 태스크를 커버한다.
3. **LLM annotator 파이프라인** — OpenAI o1 + few-shot으로 사람 expert와 κ=0.77 일치(zero-shot은 0.58), trace 한 건당 평균 $1.8.
4. **개입 case study** — ChatDev에서 프롬프트와 topology 조정만으로 +9.4% ~ +15.6% 성공률이 올랐으나, 근본 신뢰성 확보에는 **구조적 재설계**가 필요했다.
5. **일반화 검증** — 초기 5개 MAS로 도출한 분류체계를 OpenManus·Magentic-One·MMLU·GAIA에 적용해도 κ=0.79가 유지됐다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### MAST 분류체계 전체 구조

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig01.png]]
*Figure 1: MAST 분류체계 - 14개 실패 모드를 3개 카테고리로 클러스터링하고, MAS 실행 단계(Pre-Execution / Execution / Post-Execution)에 매핑한 전체 구조 (Cemri 2025, p.2)*

세 카테고리의 비중과 모드:

- **FC1. System Design Issues (44.2%)** — 시스템 설계 결정과 프롬프트 명세에서 비롯
  - FM-1.1 Disobey Task Specification (11.8%) · FM-1.2 Disobey Role Spec (1.5%) · FM-1.3 Step Repetition (15.7%) · FM-1.4 Loss of Conversation History (2.8%) · FM-1.5 Unaware of Termination Conditions (12.4%)
- **FC2. Inter-Agent Misalignment (32.3%)** — agent 간 정보 흐름·조정 붕괴
  - FM-2.1 Conversation Reset · FM-2.2 Fail to Ask for Clarification · FM-2.3 Task Derailment · FM-2.4 Information Withholding · FM-2.5 Ignored Other Agent's Input · FM-2.6 Reasoning-Action Mismatch (13.2%)
- **FC3. Task Verification (23.5%)** — 검증이 부실하거나 조기 종료
  - FM-3.1 Premature Termination · FM-3.2 No or Incomplete Verification · FM-3.3 Incorrect Verification

### 데이터 구축 워크플로우

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig02.png]]
*Figure 2: MAST-Data 구축 5단계 - trace 수집 → Grounded Theory 기반 실패 식별 → 3 라운드 IAA(κ=0.88) → o1 LLM annotator 캘리브레이션(κ=0.77) → 1642 trace 라벨링 (Cemri 2025, p.5)*

자원 투입은 expert 6인 × 20시간/인의 GT 분석, IAA 합의 회의 10시간, 그리고 OpenManus·Magentic-One·MMLU·GAIA로의 일반화 검증.

### Information Withholding 실제 사례

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig03.png]]
*Figure 3: FM-2.4 Information Withholding trace 예시 - Phone Agent가 username 필드가 phone_number여야 한다는 API 요구를 Supervisor Agent에 전달하지 않고, Supervisor 역시 clarification을 구하지 않아 로그인 시도가 반복 실패한다 (Cemri 2025, p.6)*

이 trace는 FC2의 **theory of mind 붕괴** 사례다. 메시지 포맷 표준화(MCP, A2A)만으로는 해결되지 않는다.

## 핵심 인사이트 (Key Insights)

- **Insight 1 (FC1)**: MAS 실패는 LLM 함수만으로 환원되지 않는다. 동일 GPT-4o라도 ChatDev role spec만 손보면 +9.4%가 나온다.
- **Insight 2 (FC2)**: MCP·A2A 같은 통신 프로토콜 표준화로는 FC2 실패를 잡지 못한다. agent의 더 깊은 'social reasoning' — theory of mind 학습이 필요하다.
- **Insight 3 (FC3)**: Multi-level 검증이 필요하다. 코드 컴파일 통과만 보고 체스 규칙은 검증하지 않는 식의 단일 low-level 체크로는 부족하다.

## 결과 (Results)

### MAS별 작업 성공률

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig07.png]]
*Figure 5 (Appendix B): 6개 MAS 프레임워크 작업 성공률 - AppWorld 13.3% (Test-C), HyperAgent 25.3% (SWE-Bench Lite), ChatDev 33.3% / MetaGPT 40.0% (ProgramDev), Magentic-One 38.0% (GAIA), AG2 59.0% (OlympiadBench). 벤치마크가 달라 직접 비교는 안 되지만 절대 실패율이 얼마나 큰지 드러난다 (Cemri 2025, p.19)*

### 7개 MAS 실패 분포

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig04.png]]
*Figure 4: 210개 trace에서 MAST 라벨로 본 시스템별 실패 분포. AppWorld는 premature termination(FM-3.1) 비중이 큰 반면 OpenManus는 step repetition(FM-1.3), HyperAgent는 incorrect verification(FM-3.3)이 지배적이다 (Cemri 2025, p.8)*

시스템 아키텍처에 따라 실패 프로파일이 뚜렷이 갈리며, **one-size-fits-all 해법이 없다**.

### LLM·MAS 선택의 효과

![[assets/cemri-2025-why-do-multi-agent-llm-systems/fig11.png]]
*Figure 8 + Figure 9 (Appendix F): 동일 MetaGPT에서 GPT-4o가 Claude 3.7 Sonnet보다 FC1을 39% 적게 일으키고, 동일 GPT-4o에서 MetaGPT가 ChatDev보다 FC1·FC2를 60~68% 적게 일으키지만 FC3 검증 실패는 1.56배 더 많다 (Cemri 2025, p.23)*

MetaGPT는 SoP 기반 role 강제로 FC1·FC2가 줄어든 반면, ChatDev는 명시적 review·test phase가 FC3를 잡아낸다. 아키텍처 선택이 곧 실패 프로파일이다.

### 개입 case study (Table 5)

| Config | AG2 / GPT-4 | AG2 / GPT-4o | ChatDev ProgramDev-v0 | ChatDev HumanEval |
|---|---|---|---|---|
| Baseline | 84.75 | 84.25 | 25.0 | 89.6 |
| Improved prompt | **89.75** | 89.00 | 34.4 | 90.3 |
| New topology | 85.50 | 88.83 | **40.6** | **91.5** |

topology 변경이 prompt 변경보다 일관되게 효과가 컸다. 다만 ChatDev에서 +15.6% 개선 후에도 절대 성공률은 40.6%에 그쳤다 — **tactical 개입만으로는 신뢰성 확보가 어렵다**.

## 한계와 향후 과제 (Limitations and Future Work)

- MAST가 모든 실패 패턴을 망라한다고 주장하지 않는다 — foundational first step.
- Manus 같은 closed-source MAS는 trace 비공개라 fine-grained 라벨링이 어렵다.
- LLM annotator는 fine-grained 모드 간 moderate 상관(max 0.63) 때문에 conflate 위험이 남는다.
- Tactical 개입(+9.4~15.6%)을 넘어 신뢰성을 확보하려면 표준화된 통신 프로토콜, 종합 검증·unit test 생성, 확률적 confidence 측정, memory/state 관리 같은 **구조적 전략**이 필요하다 (Section G.2).
- 저자들은 high-reliability organization 이론(Perrow 1984, Roberts 1989)을 차용한 조직 설계 관점을 제안한다.

## 관련 페이지 (Related Pages)

- [[agents/dennis-2026-compiling-agentic-workflows-into-llm]] — agent workflow 컴파일과 MAS 설계가 맞닿는 지점
- [[agents/qiao-2026-memory-intelligence-agent]] — FC2 해결을 위한 agent memory 관점
- [[agents/zhang-2026-recursive-language-models]] — single-agent vs MAS 비교 맥락

<!-- HUMANIZE-SUMMARY v1.6.1
run_id: 2026-06-11-002
metrics:
  char_in: 2587
  char_out: 2563
  change_rate: 6.8%
  self_check: 6/6
  grade: A
categories:  # before → after
  D-1 결산 피벗 lexicon: 0 → 0
  D-2 "보여준다/입증했다/드러냈다" 결말 공식: 5 → 1
  D-4 hype "정밀": 2 → 0
  D-6 결말 공식 "필요함을 드러냈다": 1 → 0
  A-15 추상 주어 + 만능 동사: 4 → 1
  A-10 "~할 수 있다" 단정 회피: 0 → 0
  H-3 메타 진입 "이는~": 1 → 0
self_check:
  - 고유명사·수치·인용·참조번호·캡션 출처 100% 보존: OK
  - 변경률 30% 이하 (6.8%): OK
  - 장르(리포트) 유지: OK
  - register(격식 평서체) 보존: OK
  - S1 잔존 0건 (D-1/D-2/D-4/D-6 핵심 종결 모두 처리): OK
  - 인공 비유·수사 추가 없음: OK
highlights:
  - id: D-2/D-6
    before: "case study로 입증했다 ... 구조적 재설계가 필요함을 함께 드러냈다"
    after: "case study로 짚었다 ... 근본 신뢰성 확보에는 구조적 재설계가 필요했다"
  - id: D-4
    before: "Grounded Theory로 정밀 분석해 ... 첫 경험적 분류체계"
    after: "Grounded Theory로 분석해 ... 첫 경험적 분류체계"
  - id: A-15
    before: "아키텍처 선택이 실패 프로파일을 그대로 결정한다"
    after: "아키텍처 선택이 곧 실패 프로파일이다"
  - id: D-2
    before: "절대 실패율의 심각성을 보여준다"
    after: "절대 실패율이 얼마나 큰지 드러난다"
  - id: D-2/A-15
    before: "tactical 개입만으로는 신뢰성 확보가 불충분함을 보여준다"
    after: "tactical 개입만으로는 신뢰성 확보가 어렵다"
residual_findings: (없음)
grade_reason: "A — S1(D-2/D-6/D-4) 잔존 0건, 변경률 6.8%, 자체검증 6항 통과. 리포트 register와 영문 기술용어·수치·캡션·wikilinks·테이블 모두 보존."
-->
