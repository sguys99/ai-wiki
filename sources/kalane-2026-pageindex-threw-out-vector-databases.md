---
title: "PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy"
type: article
year: 2026
category: database
raw_path: raw/articles/kalane-2026-pageindex-threw-out-vector-databases.md
raw_filename: "kalane-2026-pageindex-threw-out-vector-databases.md"
source_collection: external
author: "Akshay Kalane"
url: "https://pub.towardsai.net/pageindex-the-rag-framework-that-threw-out-vector-databases-and-still-hit-98-7-accuracy-d194e0549478"
publisher: "Towards AI (pub.towardsai.net)"
publication_date: "2026-04-02"
tags: [rag, vectorless-rag, pageindex, reasoning-based-rag, financebench, mafin-2.5, mcp, openai-agents-sdk, vision-rag, tree-search, in-context-index, third-party-assessment]
---

## 한 줄 요약 (One-line Summary)

Towards AI에 실린 PageIndex 사후 점검 리뷰로, vector RAG의 실패 유형 다섯 가지를 정리하고 PageIndex의 트리 인덱스와 추론 기반 탐색을 파이썬 코드로 재현한 뒤, FinanceBench 98.7% 수치와 출시 이후 6개월간 추가된 기능 다섯 가지를 소개하면서 latency, 비용, 대규모 corpus, 문서 구조 의존, 추론 근사 실패라는 trade-off 다섯 가지를 함께 제시한다. 다만 98.7%는 오픈소스 PageIndex가 아니라 VectifyAI의 금융 분석 에이전트 Mafin 2.5의 수치이며, 저자는 그 수치의 출처와 측정 조건을 밝히지 않는다.

## 1. 자료 정보 (Document Information)

- **제목**: PageIndex: The RAG Framework That Threw Out Vector Databases and Still Hit 98.7% Accuracy
- **저자**: Akshay Kalane. raw에 남은 Medium byline은 "AI Engineer @IBM | NLP | Generative AI | Machine Learning | Data Science"다. IBM 소속 근거는 이 byline이 전부이고, 본문 어디에도 IBM 업무와의 연결이나 사내 실험은 나오지 않는다. 소속을 인용할 때는 저자 본인이 적은 byline이라는 사실을 함께 적는다.
- **출처**: Towards AI (`pub.towardsai.net`, Medium 호스팅)
- **발행일**: 2026-04-02, 읽는 데 약 13분
- **유형**: production RAG를 2년간 다뤘다고 밝힌 실무자의 사후 점검 리뷰이자 코드 재구성. PageIndex 팀 자료가 아니라 외부 관찰자의 글이다.
- **Verbatim 한계**: Medium fair-use 제약으로 raw 파일은 verbatim mirror가 아니라 구조화 추출본이다. 섹션별 요지, 큰따옴표로 보존한 원문 인용구, 코드 블록 전문, 정량 표는 원문 순서대로 남아 있으나 문장 단위 전문은 재구성되지 않았다. 따라서 "저자가 무엇을 말했는가"는 확인 가능하지만 "어떤 문장으로 말했는가"는 인용구 밖에서 확인할 수 없다.
- **관련 자료**: [[database/zhang-2025-pageindex-vectorless-reasoning-rag]] (PageIndex 팀 소개글, 이 리뷰의 대조 상대), [[database/vectifyai-pageindex]] (오픈소스 구현체), [[database/geeksforgeeks-2026-vectorless-rag-pageindex]] (Cloud API 튜토리얼), [[database/sguys99-langchain-study-vectorless-rag]] (직접 구현 학습 코드)

## 2. 주요 기여 (Key Contributions)

1. **FinanceBench 정량 비교 표**: Mafin 2.5(PageIndex 기반)가 FinanceBench 데이터셋 전체를 대상으로 98.7% 정답률, 전통 vector RAG 약 50%, GPT-4o 직접 응답 약 31%, Perplexity 약 45%. 격차를 약 49%p로 계산하고 "not incremental improvement; it's a different class of result"로 규정한다. PageIndex 팀 소개글에는 벤치마크 수치가 하나도 없으므로, 이 표가 이 글이 팀 자료에 더한 가장 큰 정보다. 다만 출처와 측정 조건은 아래 4절에서 보듯 대부분 공백이다.

2. **출시 이후 6개월간의 신규 기능 카탈로그**: 2025년 9월 출시 시점에는 없던 다섯 가지를 정리한다.
   - **OpenAI Agents SDK 기반 agentic vectorless RAG**: self-hosted PageIndex를 Agents SDK에 연결하는 예제. 에이전트에 `get_document()`, `get_document_structure()`, `get_page_content()` 세 가지 tool을 주면 트리 인덱스 위에서 스스로 판단해 tool을 호출하고 노드를 수동 지정하지 않아도 콘텐츠를 가져온다. 설치는 `pip install openai-agents` 후 `python3 examples/agentic_vectorless_rag_demo.py`.
   - **Vision 기반 vectorless RAG**: OCR 단계를 건너뛰고 페이지 이미지를 vision LLM에 직접 넘겨 모델이 본 것으로 트리를 만든다. 대차대조표와 복잡한 격자의 시각 레이아웃, 차트, 병합 셀, 각주 표기를 텍스트로 옮기지 않고 보존한다.
   - **JavaScript/TypeScript SDK**: `pageindex-js-sdk`가 2026년 초 출시. Node.js 통합과 웹 기반 문서 분석용이다.
   - **`.mcpb` 데스크톱 확장**: 번들 파일을 내려받아 더블클릭하면 OAuth까지 자동 처리되어 Claude Desktop 확장으로 설치된다.
   - **ChatIndex**: 2026년 1월 출시된 별도 저장소로, 같은 트리 인덱싱 방식을 문서가 아니라 긴 대화 이력에 적용한다.

3. **PageIndex Cloud API 기반 파이썬 구현 전체 흐름**: `pip install pageindex openai` 후 `PageIndexClient`와 `AsyncOpenAI`를 함께 쓴다. `upload()`로 PDF를 올려 `doc_id`를 받고, `is_retrieval_ready(doc_id)`를 5초 간격으로 폴링한 뒤 `get_tree(doc_id, node_summary=True)`로 트리를 받는다. 탐색 함수 `find_relevant_nodes()`는 `utils.remove_fields(tree.copy(), fields=["text"])`로 본문을 떼어내 토큰을 아끼고, `model="gpt-4.1"`에 `temperature=0`, `response_format={"type": "json_object"}`로 한 번 호출해 `{"thinking", "node_list"}`를 받는다. `collect_node_content()`는 `utils.flatten_tree(tree)` 후 선택된 `node_id`의 본문을 `[title | pages N-M]` 헤더와 함께 이어 붙인다. `answer_query()`는 그 컨텍스트로 답변을 생성하며 페이지와 섹션을 인용하라고 지시하고 `{answer, retrieved_nodes, context_length}`를 반환한다.

4. **MCP 연결 설정 두 가지**: HTTP 방식은 `https://api.pageindex.ai/mcp`에 `Authorization: Bearer` 헤더를 붙이고, 로컬 방식은 Node.js 18 이상 환경에서 `npx -y @pageindex/mcp`를 실행한다.

5. **Appendix G 사례 재현**: Federal Reserve 연차보고서에서 "total deferred assets"를 물었을 때 본문 75쪽에서 82쪽은 증감분만 서술하고 총액을 적지 않는다. 77쪽에 "Table 5.3 summarizes the income, expenses, and distributions... Appendix G of this report provides more detailed information"라는 참조가 있다. vector RAG는 숫자 표로만 이루어진 Appendix G가 질의와 의미적으로 닮지 않아 무시한다. PageIndex는 트리를 읽고 금융 섹션으로 이동해 참조를 만나면 트리 구조를 따라 부록으로 넘어가 해당 표를 가져오고 정확한 숫자를 반환하며, 이동 경로 전부가 추론 기록으로 남는다. 이 사례 자체는 PageIndex 팀 소개글에 이미 있던 것이고, 이 글은 여기에 파이썬 코드와 벤치마크 수치를 덧붙였다.

6. **trade-off 다섯 가지 진단**: 팀 소개글이 다루지 않은 latency, 비용, 대규모 corpus, 문서 구조 의존, 추론 근사 실패를 한 절로 모으고 "It's a depth tool, not a breadth tool"로 요약한다. 이 절이 이 리뷰의 고유 가치다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 대비군으로 삼은 vector RAG 파이프라인

저자가 서술하는 표준 구성은 다음과 같다. 문서를 300~500 토큰 고정 크기로 자르고, `text-embedding-3-large` 같은 모델로 임베딩하고, Pinecone, Weaviate, Milvus, Chroma, pgvector 같은 vector DB에 저장한다. 질의 시점에는 질문을 임베딩해 코사인 거리 기준 상위 k개를 뽑아 LLM에 넣는다.

저자가 production에서 반복 목격했다고 밝힌 다섯 가지 실패 유형은 다음과 같다.

| 번호 | 실패 유형 | 저자가 든 근거 |
|---|---|---|
| 1 | Query-Answer Mismatch | "Vector retrieval assumes that the text most semantically similar to the query is also the most relevant." 질의는 의도를 표현하고 문서는 내용을 담는다. "revenue trends"를 검색해도 구체적인 표 값이 올라오지 않는다 |
| 2 | Term Frequency Problem | 200쪽 연차보고서에서 "operating income"이 60회 이상 등장하면 유사도가 모두 비슷해져 정작 필요한 항목이 상위 3개에 들지 못한다 |
| 3 | Chunking Destroys Tables | "A financial table header ends up in chunk 14, the data row the user needs is in chunk 15. Neither chunk alone makes any sense." |
| 4 | No Multi-Turn Memory | "what about liabilities?" 같은 후속 질문이 직전 문서 컨텍스트 없이 새 질의로 처리된다 |
| 5 | Cross-References Invisible | "see Appendix G" 같은 페이지 참조는 원 질의와 의미적 유사도가 0이라 vector RAG가 따라가지 못한다. 메타데이터로 우회하는 방식은 "brittle and doesn't scale" |

저자는 이 진단을 구조 수준의 문제로 규정하고 VectifyAI 공동 창업자 Mingtian Zhang의 표현 "relevance requires reasoning"을 인용한다. 더 나은 임베딩 모델이나 reranker로는 해결되지 않는다는 것이 저자의 결론이다.

### PageIndex의 정체 규정

저자는 PageIndex를 VectifyAI가 2025년 9월에 공개한 오픈소스 프레임워크로 소개한다. 저자는 Mingtian Zhang(UCL 동문, VectifyAI 창업자)과 Yu Tang을 만든 사람으로 적고, MIT 라이선스이며 2026년 3월 말 기준 GitHub star 2만 3천 개 이상, fork 약 2천 개라고 밝힌다. 개념의 출발점으로는 AlphaGo를 든다. "Instead of searching a space exhaustively (the way vector similarity scans all chunks), use a learned strategy to navigate it intelligently."

차별점 세 가지는 vector DB 없음, chunking 없음, 사람처럼 탐색하기다. 세 번째는 "Works the way I'd work if I were manually searching a document: check the table of contents, find the section that probably has my answer, read it"로 설명한다.

### 1단계 계층 트리 인덱스

문서를 넣는 시점에 구조를 분석해 LLM에 맞춘 목차를 계층 트리로 만든다. 각 노드는 섹션 이름을 담는 `title`, 짧은 설명인 `summary`, 페이지 범위, 재귀적으로 중첩되는 `child_nodes`를 가진다. 50쪽 SEC 파일링은 30~50개 노드가 되며 JSON으로 저장된다.

핵심은 트리 전체가 단일 LLM context window 안에 들어간다는 점이다. 모든 노드를 직접 들여다볼 수 있고 외부 vector DB가 필요 없다. VectifyAI는 이를 in-context index라 부른다. JSON 트리가 추론 중에 LLM의 활성 컨텍스트 안에 함께 들어가 있다는 뜻이다.

노드 예시는 다음과 같다.

```json
{
  "node_id": "0006",
  "title": "Financial Stability",
  "start_index": 21,
  "end_index": 22,
  "summary": "Covers the Federal Reserve's financial stability oversight...",
  "sub_nodes": [
    {
      "node_id": "0007",
      "title": "Monitoring Financial Vulnerabilities",
      "start_index": 22,
      "end_index": 28,
      "summary": "Describes the Fed's vulnerability monitoring framework..."
    },
    {
      "node_id": "0008",
      "title": "Domestic and International Cooperation",
      "start_index": 28,
      "end_index": 31,
      "summary": "Federal Reserve collaboration with international bodies..."
    }
  ]
}
```

### 2단계 추론 기반 트리 탐색

질의가 들어오면 시스템은 LLM에 트리 구조를 넘긴다. 이때 제목과 요약만 넘기고 본문은 빼며, "Given this document structure and this question, where should we look?"라는 프롬프트를 함께 준다. LLM은 `node_id` 목록을 돌려주고 시스템은 그 노드의 실제 콘텐츠를 가져온다.

탐색 루프는 네 단계다. 목차를 훑어 후보 섹션을 추린다. 답이 있을 법한 섹션을 고른다. 그 노드의 본문을 읽는다. 충분한지 판단해 충분하면 답을 만들고 부족하면 첫 단계부터 다시 수행해 다른 섹션을 시도한다.

저자의 대비 명제는 다음과 같다. "Vector DB computes cosine similarity for every chunk in parallel, fast but dumb. PageIndex asks the LLM to think about where the answer lives." 모델은 문서 안의 참조를 따라갈 수 있고 두 섹션의 내용을 동시에 필요로 하는 복합 질문도 인식한다. 모든 단계가 추론 기록으로 남아 방문한 노드와 그 이유가 드러난다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### FinanceBench 비교 표

FinanceBench는 실제 SEC 제출 문서(10-K, 10-Q, 8-K)를 대상으로 정확한 답을 요구하는 금융 문서 QA 벤치마크라고 저자는 소개한다.

| 시스템 | 정답률 | 커버리지 |
|---|---|---|
| Mafin 2.5 (PageIndex 기반) | 98.7% | 100% |
| 전통 vector 기반 RAG | 약 50% | 가변 |
| GPT-4o 직접 응답 | 약 31% | 100% |
| Perplexity | 약 45% | 가변 |

### 98.7% 수치의 조건과 출처 검증

이 글의 제목이 내세우는 수치이므로 저자가 무엇을 밝히고 무엇을 밝히지 않는지 항목별로 분리한다.

| 검증 항목 | 이 글이 밝히는 내용 |
|---|---|
| 수치의 실재 | 실재한다. 제목, 도입부, 벤치마크 표, 수치 요약 표, 한계 절, 결론에 걸쳐 여섯 곳에 나온다 |
| 측정 대상 시스템 | Mafin 2.5. VectifyAI가 PageIndex 위에 만든 금융 분석 에이전트이며 오픈소스 PageIndex 자체가 아니다 |
| 벤치마크 이름 | FinanceBench |
| 데이터셋 | 실제 SEC 제출 문서(10-K, 10-Q, 8-K), 정확한 답을 요구 |
| 커버리지 | FinanceBench 데이터셋의 100%에서 시험했다고 적는다 |
| 비교 대상 | 전통 vector RAG 약 50%, GPT-4o 직접 응답 약 31%, Perplexity 약 45% |
| 수치의 출처 | 밝히지 않는다. 인용도 링크도 없다. 참고 자료 목록에 VentureBeat의 VectifyAI 공동 창업자 인터뷰와 출처 불명의 "Critical takes on Medium"이 있을 뿐 벤치마크 수치와 연결되지 않는다 |
| 측정 주체 | 밝히지 않는다. 저자가 직접 측정했다는 서술은 어디에도 없다 |
| Mafin 2.5가 쓴 모델 | 밝히지 않는다 |
| 채점 방식 | 밝히지 않는다. 정확 일치인지 사람 채점인지 LLM 채점인지 알 수 없다 |
| 문항 수 | 밝히지 않는다. "100% coverage"만 적고 절대 문항 수는 없다 |
| vector RAG 베이스라인 구성 | 밝히지 않는다. 임베딩 모델, chunk 크기, top-k, reranker 사용 여부 모두 공백이다 |
| 측정 시점 | 밝히지 않는다 |
| 커버리지의 정의 | 밝히지 않는다. Mafin 2.5와 GPT-4o만 100%이고 나머지 두 행은 "가변"이라 같은 집합에서 잰 값인지 확인할 수 없다 |
| 저자 본인의 유보 | 두 가지를 적는다. "The 98.7% is on one benchmark"이고, 다양한 문서 유형과 모호한 질의에서의 성능은 "hasn't been independently validated to the same degree" |
| 독립 재검증 여부 | 재검증을 거쳤다는 서술이 없다. 저자는 다른 도메인으로의 일반화에 대해서만 독립 검증 부족을 적을 뿐 98.7% 자체의 검증 주체는 다루지 않는다 |

저장소 README를 대조하면 같은 98.7%가 Mafin 2.5에 귀속되며 `github.com/VectifyAI/Mafin2.5-FinanceBench` 저장소와 `vectify.ai/blog/Mafin2.5` 블로그를 근거로 제시된다. 두 곳 모두 VectifyAI가 운영하는 자산이므로 이 수치는 공급자가 발표한 값이다. 이 글은 그 사실을 적지 않는다. 한편 이 글이 인용하고 확장한다고 밝힌 PageIndex 팀 소개글에는 벤치마크 수치 자체가 없으므로, 98.7%가 그 소개글에서 온 것이 아니라는 점도 확인된다.

이 수치를 인용할 때 반드시 병기해야 하는 조건은 세 가지다. 측정 대상이 오픈소스 PageIndex가 아니라 VectifyAI의 금융 에이전트 Mafin 2.5라는 점, 공급자가 발표한 값이라는 점, 독립 재검증 기록이 없다는 점이다. 저자는 이 셋 중 어느 것도 명시하지 않는다. 세 조건을 함께 적을 수 없는 자리에서는 수치를 인용하지 않는다.

### 저자가 꼽은 성능 요인

| 요인 | 설명 |
|---|---|
| 문서 내 참조 추적 | "see Appendix G" 같은 참조를 트리 구조로 따라간다. vector 유사도에는 이 개념 자체가 없다 |
| 구조 보존 | 금융 표의 헤더, 각주, 셀 관계가 트리 노드로 유지된다. chunking은 이를 파괴한다 |
| 다단계 추론 | FY2023과 FY2024처럼 데이터가 두 섹션에 나뉜 질문을 반복 루프가 자연스럽게 처리한다 |

### 정량 수치 요약

| 항목 | 값 |
|---|---|
| Mafin 2.5 FinanceBench 정답률 | 98.7% |
| Mafin 2.5 커버리지 | 100% |
| 전통 vector RAG 정답률 | 약 30~50% (도입부), 약 50% (표와 결론) |
| GPT-4o 직접 응답 | 약 31% |
| Perplexity | 약 45% |
| 정답률 격차 | 약 49%p |
| vector RAG 일반 chunk 크기 | 300~500 토큰 |
| 50쪽 문서당 노드 수 | 30~50개 |
| GitHub star (2026년 3월 말) | 2만 3천 개 이상 |
| GitHub fork | 약 2천 개 |
| vector RAG latency | 밀리초 단위 |
| PageIndex latency | "several seconds" |
| PageIndex 출시 | 2025년 9월 |
| TypeScript SDK 출시 | 2026년 초 |
| ChatIndex 출시 | 2026년 1월 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 저자가 밝힌 trade-off 다섯 가지

| 항목 | 저자의 진단 |
|---|---|
| Latency | "Every retrieval involves multiple LLM calls: read the index, reason about nodes, fetch content, check if it's enough, maybe loop again. Vector RAG returns in milliseconds. PageIndex takes several seconds." 생성 중 retrieval이 함께 진행되어 첫 토큰까지의 시간은 일반 LLM 호출과 비슷할 수 있다는 점은 인정하지만, 총 latency는 더 높다고 결론짓는다 |
| 비용 | 질의마다 LLM 호출이 여러 번 일어나며 임베딩 조회 한 번과 비교된다. "For high-volume applications, the cost math gets rough fast." |
| 규모 | "PageIndex is phenomenal at deep extraction from a single long document. But if you need to search across 10,000 short documents simultaneously? That's where vector databases earn their keep." |
| 구조 의존 | 트리 인덱스의 품질은 문서 구조를 넘지 못한다. 잘 정리된 SEC 파일링은 좋은 트리를 만들지만 형식이 나쁜 스캔 PDF는 성능이 떨어진다. 비정형 문서용 vision 기반 모드가 있으나 구조화된 문서가 여전히 "sweet spot"이다 |
| 추론 근사 실패 | "Vector RAG fails through embedding approximation. PageIndex fails through reasoning approximation. The model can navigate to the wrong section, misinterpret a summary, or skip a relevant sub-node. The failure mode is different, more interpretable, arguably more debuggable, but it doesn't vanish." |

### 벤치마크 범위의 한계

저자는 98.7%가 하나의 벤치마크에서 나온 값임을 명시한다. FinanceBench는 잘 구조화된 SEC 파일링에서의 금융 QA를 시험하며, 형식이 어수선하고 여러 도메인에 걸치며 매우 모호한 질의를 다양한 문서 유형에 던졌을 때의 성능은 같은 수준으로 독립 검증되지 않았다고 적는다.

### 사용 조건별 권고

| 상황 | 저자의 권고 |
|---|---|
| 연차보고서, 법률 계약서, 규제 제출 문서, 기술 매뉴얼처럼 길고 구조화된 전문 문서 | PageIndex |
| 오답의 비용이나 규제 위험이 커서 속도보다 정확도가 중요한 경우 | PageIndex |
| 다단계 추론이나 섹션 간 이동이 필요한 질의 | PageIndex |
| 감사 추적이 필요한 규제 산업 | PageIndex. 답변마다 추론 기록과 노드 참조가 따라오는 점을 "gold for regulated industries"로 표현한다 |
| 높은 질의량에서 1초 미만 응답이 필요한 경우 | vector RAG |
| 짧은 문서가 대량으로 있는 corpus 검색 | vector RAG |
| 비정형이거나 대화체인 문서 | vector RAG |
| 90% 정답률로 충분한 용도 | vector RAG |
| 질의당 비용이 최우선 제약인 경우 | vector RAG |

저자가 권하는 결합 방식은 큰 corpus에서 vector 검색으로 관련 문서를 먼저 찾고 그 문서를 PageIndex에 넘겨 깊이 있게 추출하는 것이다. "Best of both worlds"라고 적는다.

### 자료 자체의 내적 모순

| 모순 | 내용 |
|---|---|
| 프레임워크와 상용 에이전트의 혼동 | 제목과 도입부는 "PageIndex가 98.7%를 달성했다"고 적지만 벤치마크 표와 각주는 같은 수치를 Mafin 2.5에 귀속시킨다. Mafin 2.5는 VectifyAI가 PageIndex 위에 만든 별도 금융 분석 에이전트이며, PageIndex 위에 무엇을 더했는지는 이 글에 없다 |
| vector RAG 기준선의 흔들림 | 도입부는 "roughly 30~50%", 벤치마크 표는 약 50%, 수치 요약 표는 약 30~50%, 결론은 약 50%로 적는다. 저자가 계산한 약 49%p 격차는 기준선을 50%로 잡아야만 성립하며, 30%를 쓰면 약 69%p가 된다 |
| 커버리지가 다른 행의 병렬 배치 | 표에서 Mafin 2.5와 GPT-4o만 커버리지 100%이고 vector RAG와 Perplexity는 "가변"이다. 같은 문항 집합에서 잰 값이 아닐 수 있는데 하나의 표에 나란히 놓여 있다 |
| 창업자 호칭 | 같은 글이 Mingtian Zhang을 "VectifyAI co-founder"로도 "VectifyAI founder"로도 적는다 |

### PageIndex 팀 자료와 어긋나는 대목

이 글은 외부 관찰자의 리뷰이므로 팀 자료와 어긋나는 지점 자체가 기록 가치가 있다. 대조 근거는 PageIndex 팀 소개글과 저장소 README의 raw다.

| 항목 | 이 글(2026-04) | PageIndex 팀 자료 |
|---|---|---|
| vector RAG의 일반적 chunk 크기 | 300~500 토큰 | 팀 소개글은 512 또는 1000 토큰으로 적는다 |
| 벤치마크 수치 | 제목과 본문 전면에 98.7%를 배치 | 팀 소개글에는 벤치마크 수치가 하나도 없다 |
| 98.7%의 귀속 | 도입부는 PageIndex에, 표는 Mafin 2.5에 귀속 | 저장소 README는 Mafin 2.5에 귀속시키고 VectifyAI 자체 벤치마크 저장소와 블로그를 링크로 제시한다 |
| 대규모 corpus | 짧은 문서 1만 개를 동시에 검색해야 하면 vector DB가 유리하다며 PageIndex의 한계로 규정 | 저장소 README는 파일 수준 트리 계층인 PageIndex File System으로 문서 하나가 아니라 corpus 전체를 대상으로 추론할 수 있다고 안내한다 |
| 생태계 범위 | ChatIndex만 언급 | 저장소 README는 OpenKB, ChatIndex, ConDB, PageIndex MCP를 함께 나열한다 |
| latency와 비용 | 두 항목을 한계로 명시 | 팀 소개글은 둘 다 다루지 않는다 |
| 실패 유형의 명칭 | Term Frequency Problem, No Multi-Turn Memory 등 구체 사례 중심 | 팀 소개글은 Semantic Similarity Is Not Equivalent to Relevance, Cannot Integrate Chat History 등 일반 진술 중심 |

대규모 corpus 항목은 두 자료의 시점 선후를 우리 raw만으로 확정할 수 없다. 저장소 README 스냅샷이 이 글보다 나중일 가능성이 있으므로, 저자가 팀 발표를 놓쳤다고 단정하지 않는다.

## 6. 관련 연구 (Related Work)

- **[[database/zhang-2025-pageindex-vectorless-reasoning-rag]]**: PageIndex 팀이 2025년 9월에 쓴 소개글로, 이 리뷰가 인용하고 확장하는 출발점이다. Appendix G 사례, in-context index 개념, vector RAG의 다섯 가지 한계가 여기서 먼저 정의됐다. 이 리뷰는 그 위에 벤치마크 수치와 trade-off 진단을 더한다.
- **[[database/vectifyai-pageindex]]**: 이 글의 코드 예제가 사용하는 오픈소스 구현체다. `PageIndexClient`, `upload`, `get_tree`, `is_retrieval_ready`, `utils.print_tree`, `utils.flatten_tree`, `utils.remove_fields`가 모두 이 저장소의 API다.
- **[[database/geeksforgeeks-2026-vectorless-rag-pageindex]]**: 같은 PageIndex Cloud API를 다루는 튜토리얼로, 이 글의 파이썬 예제와 짝을 이룬다.
- **[[database/sguys99-langchain-study-vectorless-rag]]**: Cloud API 없이 직접 구현한 한글 학습용 코드로, SaaS 경로와 자체 구현 경로를 비교할 수 있다.
- **AlphaGo**: 공간을 남김없이 뒤지는 대신 학습된 전략으로 영리하게 탐색한다는 비유로, 추론 기반 탐색을 정당화하는 근거로 인용된다.
- **Claude Code와 Cursor의 코드베이스 능동 탐색**: 코드 retrieval이 vector 기반에서 능동 탐색으로 이미 옮겨 갔다는 선례로 제시되며, 문서 retrieval도 같은 경로를 따를 것이라는 저자 주장의 근거가 된다.
- **MCP**: PageIndex의 표준 배포 경로로, HTTP 서버와 로컬 npx 서버와 `.mcpb` 데스크톱 확장 세 가지가 소개된다.
- **OpenAI Agents SDK**: agentic vectorless RAG 예제의 핵심 의존성이다.
- **ChatIndex**: VectifyAI가 2026년 1월에 낸 별도 저장소로, 같은 트리 인덱싱을 긴 대화 이력에 적용한다. 팀의 방향을 시사한다고 저자는 적는다.

> 위 목록에서 wikilink로 연결된 네 페이지는 이 wiki 내부의 상호 참조이며, 저자가 인용한 자료가 아니다. 저자가 실제로 참고 자료 목록에 올린 외부 자료는 VentureBeat의 VectifyAI 공동 창업자 인터뷰와 링크 없는 "Critical takes on Medium" 두 가지뿐이다.

## 7. 용어집 (Glossary)

- **Mafin 2.5**: VectifyAI가 PageIndex 위에 만든 금융 분석 에이전트. 이 글이 내세우는 98.7%의 실제 측정 대상이며 오픈소스 PageIndex와 구분해야 한다.
- **FinanceBench**: 실제 SEC 제출 문서(10-K, 10-Q, 8-K)를 대상으로 정확한 답을 요구하는 금융 문서 QA 벤치마크. 다단계 추론, 섹션 간 참조, 정확한 수치 답변이 동시에 필요해 retrieval 난도가 높다고 저자는 설명한다.
- **in-context index**: 외부에 정적으로 저장되는 vector DB와 대비되는 개념으로, JSON 트리가 추론 중 LLM의 활성 컨텍스트 안에 상주해 모델이 직접 탐색하고 판단할 수 있는 인덱스를 뜻한다.
- **agentic vectorless RAG**: self-hosted PageIndex를 OpenAI Agents SDK에 연결한 모드. 에이전트에 `get_document()`, `get_document_structure()`, `get_page_content()` 세 가지 tool을 주면 노드를 수동 지정하지 않아도 트리 위에서 스스로 탐색한다.
- **vision 기반 vectorless RAG**: OCR을 건너뛰고 페이지 이미지를 vision LLM에 직접 넘겨 트리를 만드는 모드. 대차대조표와 병합 셀과 각주의 시각 레이아웃을 보존한다.
- **`.mcpb` 번들**: Claude Desktop 확장 포맷. 파일을 내려받아 더블클릭하면 OAuth까지 자동 처리된다.
- **ChatIndex**: 트리 인덱싱을 긴 대화 이력에 적용한 VectifyAI의 별도 저장소. 2026년 1월 출시.
- **추론 근사 실패**: vector RAG가 임베딩 근사로 실패한다면 PageIndex는 추론 근사로 실패한다는 저자의 명제. 잘못된 섹션 선택, 요약 오해, 관련 하위 노드 누락이 사례다.
- **추론 기록**: 어떤 노드를 왜 방문했는지가 단계마다 남는 기록. 감사 추적이 필요한 규제 산업에서 이 글이 강조하는 이점이다.
- **Mingtian Zhang**: VectifyAI 창업자이자 UCL 동문으로 소개되며 "relevance requires reasoning" 인용의 출처다. 같은 글 안에서 창업자와 공동 창업자 두 호칭이 섞여 있다.
- **Yu Tang**: PageIndex 공동 저자, VectifyAI 소속.
