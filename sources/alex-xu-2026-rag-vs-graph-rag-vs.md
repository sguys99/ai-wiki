---
title: "RAG vs Graph RAG vs Agentic RAG"
type: article
year: 2026
category: applications
raw_path: raw/articles/alex-xu-2026-rag-vs-graph-rag-vs.md
raw_filename: "alex-xu-2026-rag-vs-graph-rag-vs.md"
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

## 한 줄 요약 (One-line Summary)

**Alex Xu**(ByteByteGo 공동창업자)의 짧은 LinkedIn 포스트. RAG를 데이터에 연결하는 세 가지 방식 — **Standard RAG**(벡터 검색), **Graph RAG**(local/global search 라우팅), **Agentic RAG**(sub-question 분해 + self-check 재검색 루프) — 를 각각 3~4단계 파이프라인으로 요약하고, 속도·비용·정확도·디버깅 난이도를 기준으로 언제 무엇을 쓸지 한 줄씩 짚어 준다. 벤치마크나 코드는 없는 **입문·정렬용 reference card** 성격의 자료로, `applications/pandey-2026-rag-is-no-longer-just`와 같은 갈래의 LinkedIn RAG 개관 포스트다.

## 1. 자료 정보 (Document Information)

- **저자**: Alex Xu — *Author of 4 Bestselling Books*, ByteByteGo 공동창업자
- **매체**: LinkedIn 공개 포스트
- **URL**: <https://www.linkedin.com/posts/alexxubyte_systemdesign-coding-interviewtips-share-7475575250143928320-lWQD/>
- **수집 시점**: 게시 "1주 전" (2026-06-28로 근사)
- **분량**: 짧은 포스트 (~250단어). 원 포스트에 첨부된 3단 파이프라인 다이어그램은 사용자가 `raw/articles/alex-xu-2026-rag-vs-graph-rag-vs-figures/fig01.png`로 추가한 뒤 fig01로 큐레이션했다
- **수집 방법**: 사용자가 대화 중 본문을 직접 붙여넣음 (CLAUDE.md rule #1 — WebFetch 미사용)
- **장르**: 세 가지 RAG 아키텍처를 나란히 비교하는 **reference card / mental model 포스트**. 새 연구나 벤치마크는 없다.

## 2. 주요 기여 (Key Contributions)

1. **3분류 프레임** — RAG를 "데이터에 LLM을 연결하는 세 가지 방법"으로 압축한다: Standard · Graph · Agentic. 각각을 3~4단계 파이프라인 스텝으로 명시해, 아키텍처 다이어그램 없이도 흐름을 따라가게 했다.
2. **Graph RAG의 local/global 분기 명시** — 질의를 구체적 질문(local search)과 광범위한 질문(global search)으로 먼저 분류하는 라우팅 단계를 포함한다. Local은 벡터 검색으로 엔티티를 찾은 뒤 그래프를 순회하고, global은 벡터 검색과 그래프 순회 없이 community report를 배치로 불러와 LLM이 관련도를 채점한다. Microsoft GraphRAG 원논문(`database/edge-2024-from-local-to-global`)의 local-to-global 설계를 그대로 압축한 서술이다.
3. **Agentic RAG를 self-correction 루프로 정의** — 에이전트가 질의를 sub-question으로 쪼개고 소스를 고른 뒤, **별도 에이전트가 검색된 컨텍스트로 질문에 답이 되는지 검증**하고 부족하면 재검색하는 2-에이전트 구조(생성 에이전트 + 검증 에이전트)를 명시한다.
4. **트레이드오프 3줄 요약** — Standard는 빠르고 저렴하지만 오검색을 잡아낼 장치가 없고, Graph는 구축·갱신 비용이 크지만 법률·컴플라이언스·바이오메디컬처럼 구조화된 지식에 적합하며, Agentic은 유연하지만 느리고 비싸고 디버깅이 어렵다는 use-case 가이드를 준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본 포스트는 연구 방법론이 아니라 **세 파이프라인을 나란히 배치한 비교 카드**다. 각 방식을 단계별로 정리하면 다음과 같다.

### 3.1 Standard RAG
1. 질의를 임베딩으로 변환해 벡터 데이터베이스와 매칭한다.
2. top-K로 가장 가까운 청크를 추출한다.
3. LLM이 검색된 내용만으로 답을 생성한다.
- 관련 사례: 이 wiki의 dense+sparse 결합형 변형은 LightRAG의 dual-level keyword retrieval(`database/guo-2025-lightrag-simple-and-fast`)에서 확장된다.

### 3.2 Graph RAG
1. 질의를 분류한다 — 구체적 질문은 local search로, 광범위한 질문은 global search로 라우팅한다.
2. **Local search**: 질의 임베딩 → 벡터 DB로 매칭 엔티티 탐색 → 지식 그래프를 순회하며 연결된 컨텍스트 수집 → LLM이 최종 답 합성.
3. **Global search**: 벡터 검색·그래프 순회 없이 community report를 배치로 로드 → LLM이 각 report의 관련도를 채점 → 상위 컨텍스트로 LLM이 최종 답 합성.
- 관련 사례: 이 local/global 이원 구조는 Microsoft GraphRAG 원논문의 핵심 설계와 정확히 일치한다(`database/edge-2024-from-local-to-global`, 한국어 해설은 `database/dsba-2025-graphrag-paper-review`). 계보상의 변형으로는 LightRAG(`database/guo-2025-lightrag-simple-and-fast`), LeanRAG(`database/zhang-2026-leanrag-knowledge-graph-based-generation`), RAG-Anything(`database/guo-2025-rag-anything-all-in-one-rag`)이 있고, 이들을 한데 묶은 계보 정리는 `overviews/lightrag-family-graph-rag-overview`를 참조.

### 3.3 Agentic RAG
1. 추론 에이전트가 질의를 읽고 sub-question으로 분해하며 소스를 선정한다.
2. sub-query에 따라 여러 소스에서 컨텍스트를 검색한다.
3. **별도 에이전트**가 검색된 컨텍스트로 질문에 답이 되는지 검증하고, 부족하면 재검색한다.
4. 충분하다고 판단되면 LLM이 프롬프트를 바탕으로 최종 답을 합성한다.
- 관련 사례: 검증 에이전트가 재검색을 트리거하는 구조는 이 wiki에서 MIA의 Manager-Planner-Executor 분리(`agents/qiao-2026-memory-intelligence-agent`)와 닮았다. Agentic RAG의 극단 사례(임베딩 없이 grep/bash로 원본 코퍼스를 직접 탐색)는 `database/li-2026-beyond-semantic-similarity-rethinking-retrieval`를 참조.

### 3.4 트레이드오프 정리 (Closing)
- **Standard RAG**: 빠르고 저렴하다. 잘못된 청크가 검색되면 답이 틀려도 이를 잡아낼 장치가 없다. 답이 문서 안에 있고 속도가 중요할 때 적합하다.
- **Graph RAG**: 구축 비용이 크고 갱신이 느리다. 법률·컴플라이언스·바이오메디컬처럼 구조화된 지식에 적합하다.
- **Agentic RAG**: 더 유연하고 강력하지만 느리고 비싸며 디버깅이 어렵다. 다단계 추론과 자기 수정이 필요한 질문에 적합하다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 포스트에는 **수치·벤치마크가 없다**. 세 아키텍처 사이의 latency·cost·accuracy 비교표나 production 통계도 없다. 정량 비교가 필요하면 이 wiki의 다음 자료가 보완재가 된다.

- `database/li-2026-beyond-semantic-similarity-rethinking-retrieval` — Agentic RAG 극단 사례의 BrowseComp-Plus 80.0% vs Qwen3-Embed-8B 69.0%, 비용 −29.4%
- `database/guo-2025-lightrag-simple-and-fast`, `database/zhang-2026-leanrag-knowledge-graph-based-generation` — Graph RAG 계열의 토큰·정확도 수치
- `database/edge-2024-from-local-to-global` — GraphRAG 원논문의 local/global search 벤치마크(comprehensiveness·diversity 평가)

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **트레이드오프 매트릭스 부재**: 세 방식을 정성적으로만 비교하며, 정량 비교표나 동일 코퍼스 위 head-to-head 테스트는 없다.
- **하이브리드 조합 미언급**: 실제 production에서는 Standard + Graph, 또는 Agentic 위에 Graph를 얹는 조합이 흔한데, 본 포스트는 세 방식을 상호 배타적인 선택지처럼 나열한다.
- **Corrective RAG·Multimodal RAG 등 다른 변형 누락**: `applications/pandey-2026-rag-is-no-longer-just`가 다루는 Hybrid·CRAG·Multimodal RAG는 본 포스트에 등장하지 않는다.
- **다이어그램은 3단 비교이지만 본문 순서와 다르다**: 원 포스트 본문은 Standard → Graph → Agentic 순으로 설명하지만 첨부 다이어그램은 RAG → Agentic RAG → Graph RAG 순으로 배치되어 있다. 내용은 동일하다.

## 6. 관련 연구 (Related Work)

본 포스트는 외부 인용을 명시하지 않지만, 다음 계보 위에 있다고 볼 수 있다.

- **Graph RAG**: Microsoft Research GraphRAG(2024, `database/edge-2024-from-local-to-global`)의 local-to-global 설계와 후속작 LightRAG·LeanRAG·RAG-Anything.
- **Agentic RAG**: ReAct·Self-Ask 계열의 tool-use·self-correction 패러다임. 이 wiki에서는 MIA(`agents/qiao-2026-memory-intelligence-agent`)의 검증 루프가 가장 가까운 사례다.
- **같은 갈래의 LinkedIn RAG 개관**: `applications/pandey-2026-rag-is-no-longer-just`(Hybrid·Graph·Agentic·CRAG·Multimodal 5분류), `applications/liu-2026-rag-llm-wiki-or-gbrain`(RAG vs LLM Wiki vs Fat Skills).

## 7. 용어집 (Glossary)

- **Standard RAG**: 질의 임베딩 → 벡터 DB top-K 매칭 → LLM이 검색된 청크만으로 답을 생성하는 기본형 RAG.
- **Graph RAG**: 지식 그래프 위에서 검색하는 RAG. 질의 범위에 따라 local search(엔티티 기반 그래프 순회)와 global search(community report 배치 채점)로 나뉜다.
- **Local search**: Graph RAG에서 구체적 질문에 쓰는 경로. 벡터 검색으로 엔티티를 찾은 뒤 그래프를 순회해 연결된 컨텍스트를 모은다.
- **Global search**: Graph RAG에서 광범위한 질문에 쓰는 경로. 벡터 검색·그래프 순회 없이 community report를 LLM이 직접 채점해 상위 컨텍스트만 쓴다.
- **Agentic RAG**: 검색을 planning workflow로 다루는 RAG. 질의를 sub-question으로 분해하고, 별도 에이전트가 검색 결과의 충분성을 검증해 부족하면 재검색한다.
- **Community report**: GraphRAG 계열에서 지식 그래프의 커뮤니티(클러스터)를 요약한 문서. global search의 입력 단위가 된다.

