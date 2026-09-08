---
title: "Rethinking Retrieval: From Traditional Retrieval Augmented Generation to Agentic and Non-Vector Reasoning Systems in the Financial Domain for Large Language Models"
type: paper
year: 2025
category: database
raw_path: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf
raw_filename: "lumer-2025-rethinking-retrieval-from-traditional-retrieval.pdf"
source_collection: external
authors: "Elias Lumer, Matt Melich, Olivia Zino, Elena Kim, Sara Dieter, Pradeep Honaganahalli Basavaraju, Vamse Kumar Subbiah, James A. Burke, Roberto Hernandez (PricewaterhouseCoopers U.S.)"
arxiv_id: "2511.18177"
tags: [rag, financial-qa, vector-rag, vectorless-rag, pageindex, hierarchical-node, cross-encoder-reranking, small-to-big, agentic-rag, sec-filings, evaluation, cohere-rerank, azure-ai-search]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig01.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/fig01.png
    caption: "hierarchical node tree 구조 예시. Federal Reserve 연차보고서를 title, 페이지 범위(start_index, end_index), node_id를 가진 중첩 노드 JSON으로 표현했다"
    page: 3
    bbox_norm: [0.4922, 0.0, 0.9031, 0.5879]
    strategy: column-band
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/fig02.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/fig02.png
    caption: "small-to-big retrieval 도식. vector 검색으로 찾은 target chunk(idx)의 앞뒤 chunk를 함께 묶어 LLM에 전달한다"
    page: 4
    bbox_norm: [0.509, 0.1053, 0.8863, 0.238]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab01.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab01.png
    caption: "hierarchical node tree 생성 preprocessing 비용. 한 기업의 평균 10-Q와 10-K를 세 모델로 처리한 결과이며 GPT-4o의 10-K가 30.62달러다"
    page: 5
    bbox_norm: [0.1109, 0.1544, 0.4922, 0.2269]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab02.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab02.png
    caption: "node-level summary를 포함했을 때의 preprocessing 성능. 토큰 소비와 비용이 늘어나는 대신 노드 설명이 풍부해진다"
    page: 5
    bbox_norm: [0.5297, 0.1647, 0.8657, 0.2746]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab03.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab03.png
    caption: "node-level summary를 제외했을 때의 preprocessing 성능. 토큰과 비용이 낮은 대신 노드 traversal에 쓸 설명이 빈약하다"
    page: 5
    bbox_norm: [0.5149, 0.3279, 0.8801, 0.4621]
    strategy: manual
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/lumer-2025-rethinking-retrieval-from-traditional-retrieval/tab04.png
    raw: raw/papers/lumer-2025-rethinking-retrieval-from-traditional-retrieval-figures/tab04.png
    caption: "cross-encoder reranking 파라미터 설정별 성능. (10, 5)에서 MRR@5가 0.160에서 0.750으로 오르고 Recall@5는 1.00이 된다"
    page: 6
    bbox_norm: [0.265, 0.1411, 0.735, 0.2989]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

PricewaterhouseCoopers U.S.가 SEC filing 1,200건과 150문항 벤치마크에서 vector 기반 agentic RAG와 임베딩을 쓰지 않는 hierarchical node-based 시스템을 같은 조건으로 비교해, 금융 문서 질의응답에서는 vector 쪽이 68% win rate로 앞선다는 것을 보이고, cross-encoder reranking이 MRR@5를 0.160에서 0.750으로 올리며 small-to-big retrieval이 지연 0.2초 추가만으로 65% win rate를 얻는다는 것을 함께 측정한 금융 도메인 RAG 벤치마크 논문이다.

## 1. 자료 정보 (Document Information)

- **arXiv**: 2511.18177v1 (cs.CL, 2025-11-22 제출)
- **저자**: Elias Lumer, Matt Melich, Olivia Zino, Elena Kim, Sara Dieter, Pradeep Honaganahalli Basavaraju, Vamse Kumar Subbiah, James A. Burke, Roberto Hernandez (전원 PricewaterhouseCoopers U.S. 소속)
- **키워드(논문 명시)**: Retrieval Augmented Generation, Large Language Models, Financial Q&A, Agentic AI
- **도메인**: 금융 문서 질의응답 (SEC EDGAR filing), agentic RAG, non-vector reasoning RAG
- **코퍼스**: Fortune 500 기업의 미국 SEC filing 1,200건 (10-K, 10-Q, 8-K, 2020년부터 2025년). 문서 평균 길이는 73,175 토큰이다.
- **벤치마크**: 자체 구축 150문항 (multi-hop 65문항, single-hop 65문항, summary 20문항). 각 문항에 정답과 페이지 위치를 수동으로 annotation했다.
- **평가용 하위 집합**: architecture 비교 75문항, cross-encoder reranking 평가 50문항, small-to-big retrieval 평가 50문항.
- **실험 구성 요소**

  | 역할 | 사용 모델 또는 서비스 |
  |---|---|
  | 답변 생성 | OpenAI GPT-4o |
  | 임베딩 | OpenAI `text-embedding-ada-002` |
  | reranker | Cohere `rerank-english-v3.0` |
  | LLM judge | Anthropic Claude 4.5 Sonnet (pairwise, 6개 기준) |
  | vector DB | Azure AI Search |
  | node tree 생성 | GPT-4o, GPT-4.1 mini, Gemini 2.5 Flash (비교 후 GPT-4o 채택) |

- **저자 계보**: Lumer는 PwC에서 agentic RAG와 tool retrieval 계열 작업을 이어온 저자로, 논문 참고문헌에 본인의 선행 연구 4편(Toolshed 2024, MemTool 2025a, ScaleMCP 2025b, Tool-to-Agent Retrieval 2025c)이 인용된다.

## 2. 주요 기여 (Key Contributions)

논문이 스스로 내세우는 기여는 다섯 가지다.

1. **vector RAG와 non-vector RAG의 첫 체계적 비교**. 논문은 abstract와 서론에서 "first systematic evaluation comparing vector-based agentic RAG using hybrid search and metadata filtering against hierarchical node-based systems that traverse document structure without embeddings"라고 자임한다. 동일 코퍼스, 동일 질문 집합, 동일 judge 조건에서 vector 기반 agentic RAG가 68% win rate를 얻었고 지연은 5.2초로 hierarchical 쪽 5.98초보다 짧았다.
2. **hierarchical 시스템 실패 지점의 메커니즘 규명**. 패배 원인을 table-of-contents 단계의 선택 실패로 특정했다. LLM이 문서 구조에서 관련 절을 고르는 능력이 vector의 semantic matching보다 못했다는 것이다. 후속 방향으로 임베딩으로 후보 노드 범위를 먼저 좁힌 뒤 LLM traversal을 적용하는 hybrid를 제안한다.
3. **cross-encoder reranking 파라미터 sweep**. $(k_{initial}, k_{final})$ 조합 10가지를 측정해 (10, 5)를 최적으로 결론지었다. MRR@5가 0.160에서 0.750으로 올라 절대 59%p 향상이고 Recall@5는 1.00이며 지연은 2.02초다.
4. **small-to-big retrieval의 비용 대비 효과 측정**. baseline chunking 대비 65% win rate를 지연 0.2초 추가만으로 얻었고 질의당 비용은 0.000078달러로 변하지 않았다. 비동기 구현(0.17초)이 동기 구현(0.34초)보다 빨랐다.
5. **hierarchical preprocessing 비용 구조 공개**. node tree 생성 모델 3종의 비용을 비교하고, node-level summary 포함 여부에 따른 토큰과 비용 차이를 별도 표로 제시했다. 10-K 한 건 기준 summary 포함 시 6.12달러, 미포함 시 0.97달러로 6.3배 차이다.

부수 기여로 150문항 벤치마크의 구성 방식(난이도 3분류, 정답과 페이지 위치 수동 annotation, 실험별 하위 집합 분할)과 LLM-as-a-judge pairwise 평가 프로토콜(6개 기준)을 문서화했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 데이터셋 구성

**문서 코퍼스**. Fortune 500 기업이 2020년부터 2025년 사이에 제출한 SEC filing 1,200건이다. 세 양식이 섞여 있고 논문은 각 양식의 분량을 관련 연구 절에서 밝힌다. 10-K 연차보고서는 100쪽에서 300쪽, 10-Q 분기보고서는 30쪽에서 80쪽이며 8-K는 중요 사건 공시다. 코퍼스 전체 평균은 문서당 73,175 토큰이다.

**질문 생성**. 150개 질문과 정답 쌍을 세 가지 난이도로 균형 있게 만들었다. multi-hop 65문항, single-hop 65문항, summary 20문항이다. 각 질문에 정답과 근거 페이지 위치를 수동 annotation했고, 이 페이지 번호가 retrieval 지표의 ground truth 역할을 한다.

**하위 집합 분할**. 실험마다 별도 하위 집합을 구성했다. architecture 비교 75문항, cross-encoder reranking 50문항, small-to-big retrieval 50문항이다. 세 하위 집합의 중복 여부와 선정 기준은 논문에 기술되지 않았다.

**hierarchical node tree 생성**. 문서마다 노드가 주제 절과 페이지 범위를 담는 계층 트리를 만들었다. 모델 3종(GPT-4o, Gemini 2.5 Flash, GPT-4.1 mini)을 비교했고, 구조 품질과 연산 효율을 근거로 최종 생성에는 GPT-4o를 썼다. node-level summary를 포함할 때와 뺄 때의 preprocessing 비용도 함께 측정했다.

### 3.2 두 retrieval architecture

**(A) hybrid search와 metadata filtering을 쓰는 vector 기반 agentic RAG**. 논문의 baseline이자 승자다.

- chunking: 512 토큰 chunk에 50 토큰 overlap
- 임베딩: OpenAI `text-embedding-ada-002`
- 저장: metadata를 함께 넣은 Azure AI Search
- 질의 시점: LLM agent가 검색 질의를 직접 만들고 hybrid search로 상위 k개 chunk를 가져온다. hybrid search는 semantic matching과 lexical matching을 결합한 것이다.
- 서론(2쪽)은 이 baseline의 구성을 "hybrid search with metadata filtering (Anthropic, 2024), corrective RAG (Yan et al., 2024), and standard token-based chunking"으로 밝힌다. corrective RAG 인용은 이 문장에만 나오고 3.2.1 절의 시스템 서술에는 다시 등장하지 않는다.

**(B) hierarchical node-based reasoning 시스템**. 임베딩을 전혀 쓰지 않는 비교 대상이다.

- 문서를 table-of-contents 형태의 구조 표현으로 조직한다. 각 노드는 문서의 한 절과 페이지 범위에 대응한다.
- 질의 시점: LLM이 계층을 traversal하며 관련 노드를 선택하고, 선택된 페이지 범위를 컨텍스트로 가져온다.
- 임베딩 생성 비용이 사라지는 대신 문서 구조를 탐색하는 LLM의 추론 능력에 전적으로 의존한다.
- 논문은 이 접근의 출처로 VectifyAI 2024와 VectifyAI 2025를 인용한다. 전자는 PageIndex GitHub 저장소이고 후자는 pageindex.ai의 Mafin 2.5 블로그 글이다.

### 3.3 두 가지 고급 기법

두 기법은 vector 기반 architecture 위에 각각 독립적으로 적용해 baseline vector retrieval과 비교했다.

**(C) cross-encoder reranking**. vector 검색이 먼저 $k_{initial}$개 chunk를 가져오면, cross-encoder 모델이 질의와 chunk 쌍을 함께 인코딩해 정밀 점수를 매기고 상위 $k_{final}$개를 남긴다. $k_{final} \leq k_{initial}$ 제약이 있다. 시험한 설정은 (10, 5)부터 (100, 30)까지다.

**(D) small-to-big retrieval**. retrieval 정밀도와 컨텍스트 완결성 사이의 긴장을 다루는 기법이다. vector 검색으로 target chunk를 찾은 뒤 바로 앞뒤 chunk를 붙여 컨텍스트를 넓힌다. 동기 구현과 비동기 구현을 비교해 답변 품질, 지연 오버헤드, 비용 영향을 측정했다.

### 3.4 평가 프레임워크

- **retrieval 지표**: MRR과 Recall@5. MRR은 첫 관련 chunk의 reciprocal rank를 질의 전체에 대해 평균한 값이고, Recall@5는 상위 5개 안에 든 관련 chunk의 비율이다. ground truth는 annotation된 페이지 번호다.
- **답변 품질**: Claude 4.5 Sonnet이 답변 쌍을 pairwise로 비교한다. 기준은 accuracy, completeness, clarity, conciseness, relevance, style 6개다. win rate는 각 시스템이 선호된 비교의 비율이다.
- **지연**: 질의 제출부터 답변 생성까지 end-to-end로 측정한다.
- **비용**: preprocessing 비용(hierarchical은 node tree 생성, vector는 임베딩 생성)과 runtime 비용(retrieval, reranking, LLM 추론)을 나눠 본다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 architecture 비교 (75문항)

| 시스템 | win rate | 평균 지연 | 실패 |
|---|---|---|---|
| vector 기반 agentic RAG | 68% | 5.20초 | 없음 |
| hierarchical node-based | (본문 미기재) | 5.98초 | 답변 실패 2건, 오답 2건 |

논문은 vector 쪽 68%만 적고 hierarchical 쪽 win rate 수치는 명시하지 않는다. hierarchical 시스템은 context window 제약에 부딪혀 2문항에 답하지 못하고 2문항에 오답을 냈다. vector 시스템은 모든 질문에서 관련 컨텍스트 retrieval에 성공했다.

### 4.2 cross-encoder reranking (50문항, Table 4)

| $(k_{initial}, k_{final})$ | MRR@5 | Recall@5 | 평균 지연 |
|---|---|---|---|
| baseline (reranking 없음) | 0.160 | 0.50 | 0.22초 |
| (100, 20) | 0.519 | 1.00 | 6.01초 |
| (100, 30) | 0.519 | 1.00 | 5.33초 |
| (75, 25) | 0.536 | 1.00 | 4.52초 |
| (75, 15) | 0.536 | 1.00 | 3.03초 |
| (50, 10) | 0.550 | 1.00 | 4.15초 |
| **(10, 5)** | **0.750** | 1.00 | 2.02초 |
| (50, 5) | 0.550 | 1.00 | 2.52초 |
| (20, 10) | 0.566 | 1.00 | 1.61초 |
| (20, 5) | 0.479 | 1.00 | 2.13초 |
| (10, 10) | 0.625 | 1.00 | 1.24초 |

핵심 관찰 세 가지다.

- 시험한 모든 reranking 설정이 Recall@5 1.00을 기록했다. baseline의 0.50과 대비되며, 논문은 reranking이 순위 품질뿐 아니라 coverage도 개선했다고 해석한다.
- 가장 얕은 초기 retrieval 깊이인 (10, 5)가 MRR@5 0.750으로 최고다. $k_{initial} \geq 50$ 구간은 수확 체감을 보였다.
- 응답 2초 미만이 요구되면 (10, 10) 설정을 쓸 수 있다. MRR@5 0.625에 지연 1.24초로, 시험한 설정 중 가장 빠르다.
- 표 안에서 단조성이 깨지는 구간이 있다. (20, 5)의 MRR@5는 0.479로 (100, 20)의 0.519보다 낮다. 논문은 이 역전을 따로 설명하지 않는다.

### 4.3 small-to-big retrieval (50문항)

| 항목 | 값 |
|---|---|
| baseline chunking 대비 win rate | 65% |
| 추가 지연 | 0.2초 |
| 질의당 비용 | 0.000078달러 (증가 없음) |
| 비동기 구현 지연 | 0.17초 |
| 동기 구현 지연 | 0.34초 |

비동기 구현이 인접 chunk를 병렬 질의해 동기 구현의 약 절반 시간에 끝났다.

### 4.4 preprocessing 비용, 기업 단위 (Table 1)

| 항목 | 평균 10-Q | 평균 10-K |
|---|---|---|
| 총 토큰 | 214만 9,038 | 333만 6,665 |
| OpenAI GPT-4o 비용 | 7.21달러 | 30.62달러 |
| Google Gemini 2.5 Flash 비용 | 0.99달러 | 5.94달러 |
| OpenAI GPT-4.1 mini 비용 | 4.23달러 | 22.27달러 |

Table 1의 캡션은 이 값이 "한 기업의 SEC Form 10-Q와 Form 10-K"를 대상으로 한 것이며 토큰 수와 비용은 평균 10-Q와 10-K 기준이라고 밝힌다. GPT-4o가 구조 일관성 면에서 가장 나았고 Gemini 2.5 Flash는 호환성 문제를 보였다.

### 4.5 summary 포함 여부 ablation (Table 2와 Table 3, filing 단위)

| 지표 | summary 포함 10-Q | summary 포함 10-K | summary 미포함 10-Q | summary 미포함 10-K |
|---|---|---|---|---|
| 총 토큰 | 12만 6,414 | 66만 7,333 | 5만 6,833 | 29만 9,622 |
| 입력 토큰 | 11만 7,115 | 62만 7,381 | 5만 2,080 | 28만 1,536 |
| 출력 토큰 | 9,299 | 39만 9,952 | 4,753 | 1만 8,086 |
| 지연 | 48.46초 | 144.61초 | 44.18초 | 125.95초 |
| GPT-4o 비용 | 0.42달러 | 6.12달러 | 0.20달러 | 0.97달러 |
| Gemini 2.5 Flash 비용 | 0.06달러 | 1.19달러 | 0.03달러 | 0.13달러 |
| GPT-4.1 mini 비용 | 0.25달러 | 4.45달러 | 0.11달러 | 0.71달러 |

10-K 기준 GPT-4o 비용이 0.97달러에서 6.12달러로 6.3배 늘었다. 논문은 그 대가로 노드 설명이 풍부해진다고 적고, 질의 복잡도에 따라 summary를 선택적으로 포함하는 방식을 후속 과제로 제안한다.

Table 2의 10-K 열에는 내적 모순이 있다. 총 토큰 66만 7,333이 입력 62만 7,381과 출력 39만 9,952의 합(102만 7,333)과 맞지 않는다. 출력이 3만 9,952였다면 합이 정확히 총 토큰과 같아진다. 같은 표의 10-Q 열과 Table 3의 두 열은 모두 입력과 출력의 합이 총 토큰과 일치하므로, 10-K 출력 토큰 값이 오기일 가능성이 높다.

### 4.6 10-K 단가 표기의 불일치

discussion 5.1은 같은 절 안에서 GPT-4o의 10-K preprocessing 비용을 두 값으로 적는다. 하나는 "Node-based systems incur $30.62 per 10-K filing for preprocessing"이고 다른 하나는 "Summary inclusion increased preprocessing costs 6.3x (from $0.97 to $6.12 per 10-K for GPT-4o)"다. 앞 값의 출처인 Table 1은 캡션에서 대상을 "한 기업의 SEC Form 10-Q와 Form 10-K"로 규정하고 총 토큰을 333만 6,665로 적는다. 뒤 값의 출처인 Table 2의 10-K 총 토큰은 66만 7,333으로 약 5분의 1이다. 두 표의 집계 단위가 다를 가능성이 높지만 discussion은 둘 다 "per 10-K"로 표기한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 저자가 discussion에서 명시한 한계

1. **질문 집합의 성격이 결론을 좌우할 수 있다.** 저자는 hierarchical의 열세를 두 가지로 해석한다. LLM이 복잡한 금융 질의에서 계층 탐색에 어려움을 겪었거나, 아니면 질문 집합이 hierarchical traversal이 유리할 수 있는 광범위 문서 요약보다 특정 사실 retrieval에 치우쳤을 수 있다는 것이다.
2. **hybrid vector와 hierarchical 조합은 미구현이다.** 임베딩으로 후보 노드 범위를 좁힌 뒤 LLM traversal을 적용하면 table-of-contents 선택 병목을 완화하면서 구조적 추론의 이점을 유지할 수 있다고 제안하지만 실험은 하지 않았다.
3. **reranker가 한 종류뿐이다.** Cohere `rerank-english-v3.0`에 평가를 한정했고, LLM 기반 reranker와 금융 도메인 전용 reranker와의 비교가 정확도와 지연 사이의 절충을 이해하는 데 추가 통찰을 줄 것이라고 적는다.
4. **small-to-big 확장 폭이 고정이다.** 구현은 바로 앞뒤 chunk 한 개씩만 붙였다. 확장 창 크기가 답변 품질과 생성 중 컨텍스트 산만도에 어떤 영향을 주는지는 후속 과제로 남겼다.
5. **small-to-big의 효과는 질의 유형에 달렸다.** 답이 고립된 단일 사실인 needle-in-haystack 질의에서는 컨텍스트를 넓혀도 이득이 제한적이고, chunk 경계를 넘나드는 컨텍스트가 필요한 multi-hop 추론 질의에서 이득이 크다고 밝힌다.
6. **선택적 summary 포함이 미검증이다.** 질의 복잡도에 따라 summary 포함 여부를 정하면 비용과 성능의 균형을 개선할 수 있다고만 적고 실험하지 않았다.

### 5.2 논문이 명시하지 않았지만 실험 설계에서 드러나는 제약

- 임베딩 모델이 `text-embedding-ada-002` 한 종류뿐이다. 저자는 이를 한계로 언급하지 않는다.
- 도메인이 미국 SEC filing에 한정된다. 다른 장문 도메인으로의 일반화 가능성은 논문에서 논의되지 않는다.
- hierarchical 시스템의 win rate 수치가 본문에 없어, 68%의 여집합이 32%인지 아니면 무승부가 있는지 확인할 수 없다.
- 세 하위 집합(75, 50, 50문항)이 서로 겹치는지, 어떤 기준으로 선정했는지 기술이 없다.
- 비용 비교가 preprocessing 중심이고, 1회성 preprocessing 비용과 누적 질의 비용의 손익 분기 모델은 제시되지 않는다.

## 6. 관련 연구 (Related Work)

논문이 참고문헌에서 인용하는 계열은 다음과 같다.

| 계열 | 인용 |
|---|---|
| RAG 기초 | Lewis 2020 (RAG), Karpukhin 2020 (DPR), Manning 2008 (정보검색 교재) |
| RAG survey | Gao 2023, Zhao 2024 (AIGC용 RAG), Singh 2025 (agentic RAG survey) |
| 장문 컨텍스트 문제 | Liu 2023 (Lost in the Middle) |
| chunking과 컨텍스트 확장 | Chiang 2024 (RAG 전략 최적화), Anthropic 2024 (contextual retrieval) |
| 질의 변환 | Ma 2023 (query rewriting) |
| reranking | Nogueira and Cho 2019 (BERT passage reranking), Sun 2023 (LLM을 reranking agent로) |
| corrective와 self-reflective RAG | Yan 2024 (CRAG), Asai 2023 (Self-RAG) |
| lexical retrieval | Robertson and Zaragoza 2009 (BM25) |
| non-vector와 index-free RAG | VectifyAI 2024 (PageIndex 저장소), VectifyAI 2025 (Mafin 2.5 블로그), OpenAI 2024, OpenAI 2025 (index-free long RAG 영상) |
| 금융 QA 벤치마크 | Islam 2023 (FinanceBench), Chen 2021 (FinQA), Zhu 2021 (TAT-QA) |
| 금융 RAG 시스템 | Setty 2024, Dadopoulos 2025 (metadata 기반), Wang 2025 (FinSage), Michel 2025 (FinCARE) |
| LLM-as-a-judge | Zheng 2023 (MT-Bench와 Chatbot Arena), Gu 2024 (survey) |
| RAG 벤치마킹과 passage 활용 | Chen 2023, Izacard and Grave 2021 |
| 인프라 | Cohere 2024 (rerank 문서), Microsoft Azure AI 2024 (Azure AI Search) |
| 저자 선행 연구 | Toolshed 2024, MemTool 2025a, ScaleMCP 2025b, Tool-to-Agent Retrieval 2025c |

BM25는 관련 연구 2.2절에서 hybrid retrieval의 일반적 정의를 설명할 때 한 번 인용된다. 3.2.1절의 자체 시스템 서술은 "semantic and lexical matching을 결합한 hybrid search"라고만 적고 lexical 쪽 구현 이름을 밝히지 않는다.

## 7. 용어집 (Glossary)

- **MRR (Mean Reciprocal Rank)**: 첫 관련 chunk의 reciprocal rank를 질의 전체에 대해 평균한 값이다. 논문이 적은 정의는 $MRR = \frac{1}{|Q|}\sum_{i=1}^{|Q|} \frac{1}{rank_i}$이며 1에 가까울수록 좋다.
- **Recall@5**: 상위 5개 결과 안에 관련 chunk가 포함된 비율이다.
- **cross-encoder reranking**: 질의와 후보 chunk를 함께 인코딩해 점수를 매기는 방식이다. 질의와 문서를 따로 인코딩하는 bi-encoder보다 정확하지만 느려서, 후보를 좁힌 뒤 2단계로 적용한다.
- **small-to-big retrieval**: 작은 chunk로 검색 정밀도를 지키면서 LLM에 넘길 때는 인접 chunk를 붙여 넓은 컨텍스트를 주는 전략이다.
- **hierarchical node-based reasoning RAG**: 문서를 table-of-contents 트리로 바꾸고 LLM이 노드를 traversal해 관련 페이지 범위를 가져오는 임베딩 없는 방식이다.
- **agentic RAG**: LLM이 retrieval 도구를 직접 호출하며 질의를 스스로 구성하는 RAG다.
- **hybrid search**: semantic vector 검색과 lexical 검색을 결합한 검색이다.
- **corrective RAG (CRAG, Yan 2024)**: retrieval 결과 품질을 평가해 미흡하면 질의 재작성 등으로 보정하는 RAG다. 이 논문은 vector baseline의 구성 요소로 서론에서 한 번 인용한다.
- **contextual retrieval (Anthropic 2024)**: chunk마다 LLM이 만든 문맥 접두어를 붙여 임베딩 정확도를 올리는 기법이다. 이 논문은 metadata filtering의 근거로 인용한다.
- **LLM-as-a-judge (pairwise)**: 두 시스템의 답변을 LLM이 비교해 승자를 고르고 여러 질의에 걸쳐 win rate를 집계하는 평가 방법이다.
- **SEC Form 10-K, 10-Q, 8-K**: 미국 증권거래위원회 공시 양식이다. 10-K는 100쪽에서 300쪽의 연차보고서, 10-Q는 30쪽에서 80쪽의 분기보고서, 8-K는 중요 사건 공시다.
- **node tree**: 문서 구조를 표현하는 계층 자료다. 각 노드는 title, start_index, end_index, node_id를 갖고 하위 절은 중첩 nodes 배열로 담긴다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 3 | hierarchical node tree 구조 예시 (JSON) | column-band | ★ wiki (method) |
| fig02 | 4 | small-to-big retrieval, target chunk 인접 확장 | caption-region | ★ wiki (method) |
| tab01 | 5 | hierarchical node tree 생성 preprocessing 비용 (모델 3종) | manual | ★ wiki (cost) |
| tab02 | 5 | summary 포함 preprocessing 성능 | table-region | 아카이브 (ablation 세부) |
| tab03 | 5 | summary 미포함 preprocessing 성능 | manual | 아카이브 (ablation 세부) |
| tab04 | 6 | cross-encoder reranking 파라미터별 성능 | table-region | ★ wiki (result) |

> tab03은 자동 검출이 tab02와 같은 영역을 잡아 `--bbox`로 다시 잘랐다(strategy: manual). tab02와 tab03은 preprocessing ablation 세부라 아카이브에만 보존하고 wiki 본문에는 마크다운 표로 옮긴다. wiki에 이미지로 임베드하는 것은 fig01, fig02, tab01, tab04다.
