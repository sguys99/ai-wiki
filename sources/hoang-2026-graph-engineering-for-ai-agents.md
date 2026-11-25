---
title: "Graph Engineering for AI Agents: From Prompts and Loops to Workflows"
type: article
year: 2026
category: agents
raw_path: raw/articles/hoang-2026-graph-engineering-for-ai-agents.md
raw_filename: "hoang-2026-graph-engineering-for-ai-agents.md"
source_collection: external
author: "Nhu Hoang"
publisher: "Towards Data Science"
publication_date: "2026-09-14"
url: "https://towardsdatascience.com/graph-engineering-for-ai-agents-from-prompts-and-loops-to-workflows/"
tags: [graph-engineering, agent-workflow, loop-engineering, human-in-the-loop]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig01.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig01.png
    caption: "한 모델이 조사와 평가를 겸하는 루프와 근거 검토를 별도 단계로 둔 그래프"
    strategy: fetched
    curated: false
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig02.gif
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig02.gif
    caption: "Shopify 회계 도구의 고객, 경쟁사, 유통 경로 조사에서 창업자 승인까지의 흐름"
    strategy: fetched
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig03.gif
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig03.gif
    caption: "세 조사 결과가 같은 필드에 도착할 때 덮어쓰기와 병합의 차이"
    strategy: fetched
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig04.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig04.png
    caption: "고객과 제품 사이의 관계를 나타내는 그래프와 작업 순서를 정하는 그래프"
    strategy: fetched
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig05.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig05.png
    caption: "근거 검토 결과만 권고안 작성 단계로 넘기는 연결"
    strategy: fetched
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig06.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig06.png
    caption: "범위가 좁은 질문을 경쟁사 조사로 바로 보내는 분기"
    strategy: fetched
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig07.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig07.png
    caption: "고객 불편, 경쟁사, 유통 경로를 병렬로 조사한 뒤 근거를 모으는 단계"
    strategy: fetched
    curated: false
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig08.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig08.png
    caption: "실행 중에 발견한 조사 범주에 따라 상한 안에서 작업자를 추가하는 구조"
    strategy: fetched
    curated: false
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/hoang-2026-graph-engineering-for-ai-agents/fig09.png
    raw: raw/articles/hoang-2026-graph-engineering-for-ai-agents-figures/fig09.png
    caption: "권고안 초안을 검토하고 최대 두 차례까지 수정을 허용하는 루프"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

Shopify 판매자용 회계 도구에 투자할지 판단하는 사례로, 에이전트가 근거를 모으고 사람이 권고안을 승인하기까지 각 단계가 어떤 정보를 주고받아야 하는지 설명한다.

## 1. 자료 정보 (Document Information)

Nhu Hoang이 2026년 9월 14일 Towards Data Science에 발표한 설계 해설이다. OpenClaw 창립자 Peter Steinberger의 질문과 Hamel Husain의 응답을 출발점으로 삼아, 반복 업무에서 다음 단계를 누가 결정할지 살펴본다.

## 2. 주요 기여 (Key Contributions)

| 설계 대상 | 설계자가 정하는 것 |
|---|---|
| 프롬프트 | 한 번의 요청에서 모델에 무엇을 물을지 |
| 컨텍스트 | 모델이 응답할 때 어떤 자료를 볼 수 있을지 |
| 루프 | 모델이 도구와 메모리를 사용해 다음 행동을 고르고 반복할 수 있는 조건 |
| 그래프 | 작업의 경계, 결과에 따른 분기, 작업을 멈추고 검토할 지점 |

agent graph는 작업 사이의 실행 순서와 의존 관계를 표현한다. knowledge graph는 고객, 회사, 제품처럼 정보 속 대상 사이의 관계를 표현한다. 한 시스템에서 후자를 조사 자료로 읽고 전자로 조사 절차를 제어할 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

계획 단계가 시장성 질문을 고객 불편, 경쟁사, 유통 경로로 나눈다. 세 조사 결과가 모이면 검토자가 주장별 근거를 판정하고 작성자는 판정을 바탕으로 권고안을 쓴다. 창업자가 권고안과 근거를 보고 실행 여부를 결정한다.

| 패턴 | 적용 예와 실패 조건 |
|---|---|
| Prompt chaining | 검토 결과만 작성자에게 전달한다. 다음 작업에 원자료 전체가 필요하면 호출을 나눠도 지연만 늘 수 있다. |
| Routing | 송장 동기화 기능처럼 좁은 질문은 담당 조사자로 바로 보낸다. 오분류에 대비해 예시 정답으로 분기를 시험하고 확신이 낮으면 넓게 조사한다. |
| Parallelization | 서로의 결과 없이 시작할 수 있는 조사만 동시에 진행한다. |
| Orchestrator-workers | 조사 중에 발견한 대체재 종류마다 작업자를 배정한다. 호출 한도와 예산에 맞춰 작업자 수나 총비용을 제한한다. |
| Evaluator-optimizer | 월 50달러를 낼 것이라는 권고안의 주장에 출처가 없으면 근거를 보강하거나 삭제하도록 돌려보낸다. 예시는 검토와 수정을 최대 두 차례 허용한다. |

state reducer는 병렬 단계들이 같은 필드를 갱신할 때 결과를 합치는 규칙이다. checkpoint는 실행을 재개할 수 있도록 저장한 시점별 상태다. LangGraph에서는 승인 대기 후 같은 스레드 식별자로 이어갈 수 있다. 중단 전 결제나 메일 발송이 일어나는 단계는 재실행해도 효과가 중복되지 않도록 설계한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저자가 제안하는 평가는 같은 질문에 대한 단일 응답과 수동으로 단계를 나눈 권고안을 직접 비교하는 것이다. 산출물을 한 문장으로 정하고 사람이 할 일 5~7개와 의존 관계를 그린 뒤 각 단계를 새 대화에서 실행한다. 수동 실행이 세 번 만족스러우면 계획, 조사 기록, 검토 결과, 권고안을 파일로 남긴다. Shopify 사례의 품질, 시간, 비용을 측정한 실험값은 제시하지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

분기에서 잘못 보낸 요청은 겉보기에는 완성된 답을 낼 수 있어 조사 누락을 발견하기 어렵다. 병렬 실행의 이점은 조사 사이의 독립성에 달려 있다. 수정한 초안이 같은 주장을 표현만 바꿔 되풀이하면 검토를 더 해도 얻는 것이 적다. 그래서 반복 횟수와 실제 개선 여부를 함께 본다.

## 6. 관련 연구 (Related Work)

다섯 패턴의 출처는 Anthropic의 *Building Effective Agents*다. 원문은 상태 저장과 재개의 근거로 LangGraph 문서를, 정보 사이의 관계를 활용한 검색 사례로 Microsoft의 GraphRAG를 인용한다.

- [[agents/osmani-2026-loop-engineering|반복 실행 루프의 설계]]는 모델에 맡긴 작업의 목표와 종료 조건을 다룬다.
- [[database/edge-2024-from-local-to-global|GraphRAG의 전역 검색]]은 여러 문서에 걸친 질문에 답하기 위해 정보의 관계를 이용한다.

## 7. 용어집 (Glossary)

| 용어 | 이 글에서의 뜻 |
|---|---|
| Agent graph | 어떤 작업이 끝나야 다음 작업을 시작할 수 있는지 표현한 실행 구조 |
| State reducer | 동시에 도착한 갱신 내용을 공유 상태에 병합하는 규칙 |
| Checkpoint | 실패나 승인 대기 이후 실행을 이어가는 기준이 되는 상태 사본 |
| Human gate | 외부에 영향을 주는 행동 전에 사람이 결과를 검토하고 진행을 결정하는 지점 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 한 모델이 조사와 평가를 겸하는 루프와 근거 검토를 별도 단계로 둔 그래프 | fetched | 참고 |
| fig02 | Shopify 회계 도구의 고객, 경쟁사, 유통 경로 조사에서 창업자 승인까지의 흐름 | fetched | ★ 본문 권장 |
| fig03 | 세 조사 결과가 같은 필드에 도착할 때 덮어쓰기와 병합의 차이 | fetched | ★ 본문 권장 |
| fig04 | 고객과 제품 사이의 관계를 나타내는 그래프와 작업 순서를 정하는 그래프 | fetched | 참고 |
| fig05 | 근거 검토 결과만 권고안 작성 단계로 넘기는 연결 | fetched | 참고 |
| fig06 | 범위가 좁은 질문을 경쟁사 조사로 바로 보내는 분기 | fetched | 참고 |
| fig07 | 고객 불편, 경쟁사, 유통 경로를 병렬로 조사한 뒤 근거를 모으는 단계 | fetched | 참고 |
| fig08 | 실행 중에 발견한 조사 범주에 따라 상한 안에서 작업자를 추가하는 구조 | fetched | 참고 |
| fig09 | 권고안 초안을 검토하고 최대 두 차례까지 수정을 허용하는 루프 | fetched | ★ 본문 권장 |
