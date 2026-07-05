---
title: "RAG vs Graph RAG vs Agentic RAG (Alex Xu, LinkedIn)"
type: article
year: 2026
category: applications
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/articles/alex-xu-2026-rag-vs-graph-rag-vs.md
raw_filename: "alex-xu-2026-rag-vs-graph-rag-vs.md"
source: alex-xu-2026-rag-vs-graph-rag-vs.md
source_collection: external
author: "Alex Xu"
url: "https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-share-7475575250143928320-lWQD/"
publisher: "LinkedIn (post by Alex Xu / ByteByteGo)"
publication_date: "2026-06-28"
tags: [rag, graphrag, agentic-rag, vector-search, knowledge-graph, local-search, global-search, multi-agent, linkedin, bytebytego, system-design]
figures:
  - id: fig01
    file: assets/alex-xu-2026-rag-vs-graph-rag-vs/fig01.png
    raw: raw/articles/alex-xu-2026-rag-vs-graph-rag-vs-figures/fig01.png
    caption: "RAG vs Agentic RAG vs Graph RAG 3단 파이프라인 다이어그램 (LinkedIn 카드 이미지)"
    strategy: manual
    curated: true
---

## 요약 (Summary)

Alex Xu(ByteByteGo 공동창업자)의 짧은 LinkedIn 포스트. RAG로 LLM을 데이터에 연결하는 세 가지 방식을 나란히 비교한다.

| # | 방식 | 핵심 흐름 | 언제 쓰는가 |
|---|---|---|---|
| 1 | **Standard RAG** | 쿼리 임베딩 → 벡터 DB top-K 매칭 → LLM 생성 | 답이 문서 안에 있고 속도가 중요할 때 |
| 2 | **Graph RAG** | local/global 라우팅 → (local) 엔티티 매칭 후 그래프 순회 / (global) community report 배치 채점 | 법률·컴플라이언스·바이오메디컬처럼 구조화된 지식 |
| 3 | **Agentic RAG** | sub-question 분해 → 다중 소스 검색 → 검증 에이전트가 재검색 여부 판단 → 합성 | 다단계 추론과 자기 수정이 필요한 질문 |

Standard는 빠르고 저렴한 대신 오검색을 잡아낼 장치가 없고, Graph는 구축·갱신 비용이 크며, Agentic은 가장 유연한 대신 느리고 비싸고 디버깅이 어렵다. 이런 트레이드오프로 글을 맺는다.

![[assets/alex-xu-2026-rag-vs-graph-rag-vs/fig01.png]]
*Figure 1: RAG vs Agentic RAG vs Graph RAG 3단 파이프라인 다이어그램 (Alex Xu / ByteByteGo, LinkedIn)*

## 주요 기여 (Key Contributions)

1. **3분류 프레임** — "RAG는 LLM을 데이터에 연결하는 방법"이라는 한 문장 아래 Standard·Graph·Agentic을 각각 3~4단계 파이프라인으로 압축했다. 다이어그램 없이도 흐름을 그대로 따라간다.
2. **Graph RAG의 local/global 분기 명시** — 질의를 구체적 질문(local search)과 광범위한 질문(global search)으로 먼저 갈라놓았다. Local은 벡터 검색으로 엔티티를 찾은 뒤 그래프를 순회하고, global은 벡터 검색이나 그래프 순회 없이 community report를 배치로 불러와 LLM이 관련도를 채점한다. Microsoft GraphRAG 원논문([[database/edge-2024-from-local-to-global]])의 local-to-global 설계를 그대로 옮긴 서술이다.
3. **Agentic RAG를 self-correction 루프로 정의** — 질의를 sub-question으로 쪼개고 소스를 고르는 에이전트, 그리고 검색된 컨텍스트가 질문에 답이 되는지 검증해 부족하면 재검색을 트리거하는 **별도 에이전트**로 이루어진 2-에이전트 구조를 명시했다.
4. **트레이드오프 3줄 요약** — 속도·비용·정확도·디버깅 난이도를 기준으로 각 방식을 언제 쓸지 정리했다.

## 방법론 및 아키텍처 (Methodology and Architecture)

세 파이프라인을 나란히 배치한 비교 카드다.

### 1. Standard RAG
1. 쿼리를 임베딩으로 변환해 벡터 데이터베이스와 매칭
2. top-K로 가장 가까운 청크를 추출
3. LLM이 검색된 내용만으로 답을 생성

가까운 사례: dense+sparse 결합형 변형은 LightRAG의 dual-level keyword retrieval([[database/guo-2025-lightrag-simple-and-fast]])에서 확장된다.

### 2. Graph RAG
1. 쿼리를 분류 — 구체적 질문은 local search로, 광범위한 질문은 global search로 라우팅
2. **Local search**: 쿼리 임베딩 → 벡터 DB로 매칭 엔티티 탐색 → 지식 그래프를 순회하며 연결된 컨텍스트 수집 → LLM이 최종 답 합성
3. **Global search**: 벡터 검색·그래프 순회 없이 community report를 배치로 로드 → LLM이 각 report의 관련도를 채점 → 상위 컨텍스트로 LLM이 최종 답 합성

가까운 사례: 이 local/global 이원 구조는 Microsoft GraphRAG 원논문의 핵심 설계와 정확히 겹친다([[database/edge-2024-from-local-to-global]], 한국어 해설은 [[database/dsba-2025-graphrag-paper-review]]). 계보상의 변형으로 LightRAG([[database/guo-2025-lightrag-simple-and-fast]]), LeanRAG([[database/zhang-2026-leanrag-knowledge-graph-based-generation]]), RAG-Anything([[database/guo-2025-rag-anything-all-in-one-rag]])이 있고, 이들을 한데 묶은 계보 정리는 [[overviews/lightrag-family-graph-rag-overview]]에서 볼 수 있다.

### 3. Agentic RAG
1. 추론 에이전트가 쿼리를 읽고 sub-question으로 분해하며 소스를 선정
2. sub-query에 따라 여러 소스에서 컨텍스트를 검색
3. **별도 에이전트**가 검색된 컨텍스트로 질문에 답이 되는지 검증 — 부족하면 재검색
4. 충분하다고 판단되면 LLM이 프롬프트 기반으로 최종 답을 합성

가까운 사례: 검증 에이전트가 재검색을 트리거하는 구조는 MIA의 Manager-Planner-Executor 분리([[agents/qiao-2026-memory-intelligence-agent]])와 닮았다. Agentic RAG의 극단 사례(임베딩 없이 grep/bash로 원본 코퍼스를 직접 탐색)는 [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] 참조.

### 트레이드오프 정리 (Closing)

- **Standard RAG**: 빠르고 저렴하다. 잘못된 청크가 검색되면 답이 틀려도 잡아낼 장치가 없다. 답이 문서 안에 있고 속도가 중요할 때 적합.
- **Graph RAG**: 구축 비용이 크고 갱신이 느리다. 법률·컴플라이언스·바이오메디컬처럼 구조화된 지식에 적합.
- **Agentic RAG**: 더 유연하고 강력한 대신 느리고 비싸며 디버깅이 어렵다. 다단계 추론과 자기 수정이 필요한 질문에 적합.

## 결과 (Results)

이 포스트에는 수치나 벤치마크가 없다. 세 아키텍처 간 latency·cost·accuracy 비교표나 production 통계는 제공되지 않는다. 정량 비교가 필요하면 이 wiki의 다음 자료가 보완재가 된다.

- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Agentic RAG 극단 사례의 BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%, 비용 −29.4%
- [[database/guo-2025-lightrag-simple-and-fast]], [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] — Graph RAG 계열의 토큰·정확도 수치
- [[database/edge-2024-from-local-to-global]] — GraphRAG 원논문의 local/global search 벤치마크(comprehensiveness·diversity 평가)

## 한계 (Limitations)

- **트레이드오프 매트릭스 부재**: 세 방식을 정성적으로만 비교하며, 정량 비교표나 동일 코퍼스 위 head-to-head 테스트는 없다.
- **하이브리드 조합 미언급**: 실제 production에서는 Standard + Graph, 또는 Agentic 위에 Graph를 얹는 조합이 흔한데도, 이 포스트는 세 방식을 상호 배타적인 선택지처럼 나열한다.
- **Corrective RAG·Multimodal RAG 등 다른 변형 누락**: [[applications/pandey-2026-rag-is-no-longer-just]]가 다루는 Hybrid·CRAG·Multimodal RAG는 이 포스트에 등장하지 않는다.
- **다이어그램은 3단 비교이지만 본문 순서와 다르다**: 원 포스트 본문은 Standard → Graph → Agentic 순으로 설명하지만 첨부 다이어그램은 RAG → Agentic RAG → Graph RAG 순으로 배치되어 있다. 내용은 동일하다.

## 관련 페이지 (Related Pages)

- [[applications/pandey-2026-rag-is-no-longer-just]] — 같은 갈래의 LinkedIn RAG 개관 포스트. Pandey는 Hybrid·Graph·Agentic·CRAG·Multimodal 5분류로, Alex Xu는 Standard·Graph·Agentic 3분류에 파이프라인 스텝까지 곁들인 버전으로 겹치면서도 결이 다르다.
- [[database/edge-2024-from-local-to-global]] — 본문의 Graph RAG local/global search 서술이 그대로 기대는 Microsoft GraphRAG 원논문.
- [[database/dsba-2025-graphrag-paper-review]], [[database/dsba-2026-paper-review-graph-based-rag]] — GraphRAG 계열의 한국어 해설·후속 세미나.
- [[database/guo-2025-lightrag-simple-and-fast]], [[database/zhang-2026-leanrag-knowledge-graph-based-generation]], [[database/guo-2025-rag-anything-all-in-one-rag]] — Graph RAG 계보의 후속 변형들.
- [[overviews/lightrag-family-graph-rag-overview]] — Graph RAG 계보를 한데 모은 합성 페이지.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — Agentic RAG의 극단(임베딩 없는 grep/bash 탐색) + 정량 결과.
- [[agents/qiao-2026-memory-intelligence-agent]] — Agentic RAG의 Manager-Planner-Executor 분리 사례.
- [[applications/liu-2026-rag-llm-wiki-or-gbrain]] — "RAG는 단일 패턴이 아니다"라는 같은 문제의식을 retrieve/compile/act 축으로 더 깊게 다룬 결정 프레임워크.

