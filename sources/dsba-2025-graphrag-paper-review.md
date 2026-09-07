---
title: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization (Paper Review, DSBA Lab Seminar)"
type: article
year: 2025
category: database
raw_path: raw/articles/dsba-2025-graphrag-paper-review.pdf
raw_filename: "dsba-2025-graphrag-paper-review.pdf"
source_collection: external
author: "김도윤 (Kim Doyoon)"
affiliation: "서울대학교 산업공학과 데이터과학 및 비즈니스 애널리틱스(DSBA) 연구실 박사과정"
presentation_date: "2025-08-11"
venue: "DSBA Lab Seminar (SNU 산업공학과)"
language: "ko"
slides_count: 43
reviews_paper: "Edge, Trinh et al. (2024), From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
publisher: "DSBA Lab (SNU 산업공학과)"
url: "https://github.com/microsoft/graphrag"
tags: [graph-rag, paper-review, dsba, knowledge-graph, community-detection, leiden, sensemaking, lecture-deck, korean]
---

## 한 줄 요약 (One-line Summary)

서울대학교 산업공학과 DSBA 연구실 김도윤 박사과정이 2025년 8월 11일 lab seminar에서 발표한 43쪽 한국어 슬라이드 자료로, Edge와 Trinh 등이 2024년에 발표한 GraphRAG 논문을 Backgrounds, Methodology, Experiments, Materials, Conclusions 다섯 장으로 재구성한 paper review다. 자체 실험이나 코드는 없고, 가치는 두 가지에 있다. 하나는 논문을 읽기 전에 필요한 배경 지식(RAG 구성 요소, knowledge graph, community detection, sensemaking)을 한국어로 먼저 쌓아 주는 구성이고, 다른 하나는 논문 본문에 없는 발표자 견해 아홉 건이다. 그중 세 건은 논문의 서술이 실제 공식 코드와 어긋나거나 코드가 논문보다 더 많은 절차를 담고 있다는 지적이고, 세 건은 평가 설계 자체에 대한 비판이며, 나머지는 hybrid scheme 도입 제안과 domain adaptation 제안이다.

## 1. 자료 정보 (Document Information)

- **제목**: From Local to Global: A GraphRAG Approach to Query-Focused Summarization, Paper Review
- **발표자**: 김도윤 (서울대학교 산업공학과 데이터과학 및 비즈니스 애널리틱스 연구실 박사과정)
- **발표일**: 2025년 8월 11일 월요일 (표지 슬라이드에 명기)
- **유형**: lab seminar paper review 슬라이드 자료 (PDF 43쪽, 약 4.4MB)
- **대상 논문**: 표지에 "Darren Edge and Ha Trinh et al., 2024 arxiv"로 표기. 본 wiki의 [[database/edge-2024-from-local-to-global|edge-2024-from-local-to-global]] 페이지가 같은 논문을 다룬다.
- **언어**: 한국어 본문에 영문 기술 용어를 섞고, 논문에서 가져온 프롬프트는 영문 원문 그대로 옮겼다.
- **목차** (슬라이드 2): 1) Backgrounds, 2) Methodology, 3) Experiments, 4) Materials, 5) Conclusions
- **PDF 메타데이터**: 작성자 김도윤, 생성 도구 Microsoft PowerPoint LTSC, 생성 시각 2025년 8월 15일. 표지의 발표일(8월 11일)보다 나흘 뒤에 내보낸 파일이다.
- **자료 안에 포함된 외부 링크 6개**: `microsoft/graphrag`의 `community_report.py`(슬라이드 23), `text_units.py#L11`과 `local_search/mixed_context.py#L355`(슬라이드 30), 그리고 Materials 장의 링크 4개(슬라이드 40).
- **위치**: `raw/articles/dsba-2025-graphrag-paper-review.pdf`

이 자료에는 저자 이메일 주소가 없고, 발표 자료 자체가 공개된 URL도 적혀 있지 않다. frontmatter의 `url`은 자료가 Materials 장에서 소개한 GraphRAG 공식 저장소 주소이며, 발표 자료의 출처 주소가 아니다.

## 2. 주요 기여 (Key Contributions)

이 자료는 자체 연구가 아니라 논문 리뷰다. 다른 GraphRAG 자료와 구별되는 기여는 다섯 가지다.

1. **논문을 읽기 위한 배경 지식의 한국어 정리 (슬라이드 4에서 14)**. RAG의 구성 요소를 DB, indexing, retriever, generator로 나누어 정의하고, knowledge base와 knowledge graph의 관계를 `(김도윤, member_of, DSBA)` triplet 예시로 설명한다. 이어서 KBQA와 GraphRAG를 여섯 항목으로 비교하고, Louvain에서 Leiden으로 넘어가는 community detection의 발전을 disconnected community 문제의 시각화와 함께 제시한 뒤, sensemaking을 네 단계로 정의한다.
2. **논문 부록의 프롬프트를 원문 그대로 재게재 (슬라이드 18에서 23)**. entity와 relationship 추출 프롬프트 전문, claim 추출 프롬프트 전문, self-reflection의 `CONTINUE_PROMPT`와 `LOOP_PROMPT` 코드, description 요약 프롬프트, community summary 출력 예시 JSON을 슬라이드에 그대로 실었다.
3. **질의 시점 map-reduce 흐름의 도식화 (슬라이드 24와 25)**. knowledge graph에서 community, community summary, local answer와 score, 최종 global answer로 이어지는 흐름을 root level 기준으로 한 번 그리고, Level 1의 sub-community까지 내려간 계층 구조로 한 번 더 그렸다.
4. **실험 결과의 한국어 해설 (슬라이드 27에서 38)**. condition 여섯 가지의 정의, 평가 기준 네 가지의 한국어 정의, 데이터셋별 knowledge graph 통계, 승률표를 읽는 방법, 실험 2의 claim 기반 지표와 실험 1과의 일치율을 순서대로 풀어 쓴다.
5. **발표자 견해 아홉 건**. 논문 본문에 없는 발표자 자신의 판단으로, 5절에 모두 정리한다. 이 자료의 고유 가치는 여기에 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

발표자는 논문의 방법론을 indexing 시점과 query 시점으로 나눈 뒤, indexing을 다시 다섯 하위 단계로 쪼갠다. 모든 LLM 호출은 GPT-4-turbo로 통일한다는 점을 슬라이드 16에서 먼저 밝힌다.

### 3.1 배경으로 먼저 세운 개념 (슬라이드 4에서 14)

**문제 정의 (슬라이드 4, 14)**: 목표는 전체 text corpus를 아우르는 query-focused summarization이다. 자료는 이를 "corpus의 전반적인 내용을 반영해야만 답변이 가능한 경우"로 정의하고, `What are the main themes in the dataset?`과 `What are the key trends in how scientific discoveries are influenced by interdisciplinary research over the past decade?`를 예로 든다. 일반적인 벡터 RAG는 corpus 양이 많아지면 global sensemaking 능력이 부족하다는 것이 출발점이다.
**RAG 구성 요소 (슬라이드 5)**: 자료는 RAG를 네 부분으로 나눈 뒤 논의를 시작한다.

| 구성 요소 | 정의 |
|---|---|
| DB | 검색 대상 문서 전체 집합 |
| indexing | 문서를 chunking한 뒤 임베딩 모델로 벡터화해 저장하는 행위 |
| retriever | 질문과 관련성이 가장 높은 문서를 찾는 모듈 |
| generator | 찾은 문서와 query로 답을 생성하는 LLM |

**일반 RAG의 초점 (슬라이드 6)**: 질문 의도 분석과 관련 문서 탐색에 초점이 있고, DB 안 문서들 사이의 관계와 연결성에는 상대적으로 관심이 적다고 정리한다.

**knowledge graph (슬라이드 7, 8)**: knowledge base는 서로 다른 두 객체의 소속과 두 객체 사이 관계를 담은 지식 정보이고, 이를 그래프로 나타내면 knowledge graph가 된다. 자료는 `(김도윤, member_of, DSBA)` triplet을 예로 들며 head와 relation과 tail의 구조를 설명한다. DB로서의 장점은 세 가지다.

| 장점 | 내용 |
|---|---|
| 텍스트 효율 | 물리적으로 적은 양의 텍스트로도 필요한 정보를 제공할 수 있다 |
| 연결성 확인 | entity 사이 연결을 통해 직접적인 연결성을 확인할 수 있다 |
| 구조 조절 | 필요한 정도에 따라 노드의 종류와 관계의 종류를 직접 조절할 수 있다 |

**KBQA와의 관계 (슬라이드 8)**: KBQA는 정답이 있는 자연어 사실 질문에 대해 knowledge base로 정답 entity를 산출하는 과업이다. 발표자는 여섯 항목 비교표를 제시한 뒤 "KBQA의 일반화된 형태가 GraphRAG라고 볼 수 있음"이라고 정리한다. 아래는 슬라이드 8의 비교표 그대로다.

| 항목 | KBQA | GraphRAG |
|---|---|---|
| 목적 | 구조화된 지식베이스에서 정확한 답 검색 | 그래프 구조를 활용한 검색 증강 생성 |
| 지식 표현 | RDF 트리플, 지식그래프 (구조화) | 텍스트와 그래프 구조 (반구조화) |
| 질의 처리 | 자연어를 SPARQL이나 논리형식으로 변환 | 자연어로 그래프 검색 후 LLM 생성 |
| 답변 형태 | 정확한 팩트나 엔티티 | 생성된 자연어 텍스트 |
| 추론 방식 | 논리적 추론 (규칙 기반) | 그래프 탐색과 언어모델 추론 |
| 데이터 소스 | Freebase, DBpedia, Wikidata 등 | 문서 컬렉션을 그래프로 변환 |

**LLM과 knowledge graph의 결합 방향 두 가지 (슬라이드 9)**: 자료는 두 방향을 나눈 뒤 인용 논문 네 편을 함께 단다.

| 방향 | 방법 | GraphRAG와의 관계 |
|---|---|---|
| LLM으로 knowledge graph 만들기 | 문서별로 triplet 생성 프롬프트를 넣고 결과를 모아 전체 그래프를 만든다 | GraphRAG의 인덱싱 단계가 이 방향이다 |
| knowledge graph를 LLM에 입력하기 | 문서와 passage를 노드로 만들고 언어 모델로 노드 임베딩을 얻은 뒤, 문서 내 구조나 임베딩 유사도로 edge를 만든다 | 이 방향으로 multi-document question answering을 수행하면 GraphRAG와 가장 유사한 형태가 된다 |

**community detection (슬라이드 10에서 12)**: graph clustering의 한 방식으로 밀접하게 연결된 노드 집합을 찾는 작업이다. 기본 가정은 그래프에서 비슷한 노드들이 서로 연결되고 밀집해 있다는 것이며, 자료는 이를 류류상종(類類相從)이라는 한자 표현으로 요약한다. 핵심 개념은 modularity이고, community 안 연결이 많고 밖 연결이 적을수록 값이 높다. modularity를 어떻게 정의하고 최적화하느냐가 곧 community detection 방법론이라고 정리한다.

**sensemaking (슬라이드 13)**: 사람들이 집단 경험에 의미를 부여하는 과정이라는 Wikipedia 정의를 인용하고 네 단계로 나눈다.

| 단계 | 뜻 |
|---|---|
| noticing | 환경에서 중요한 신호나 변화를 인지한다 |
| interpreting | 포착된 정보에 의미를 부여하고 기존 지식과 연결한다 |
| acting | 해석된 의미에 기반해 행동을 취한다 |
| reflecting | 행동의 결과를 평가하고 새로운 이해를 형성한다 |

데이터 사이언스 관점에서는 주어진 정보를 어떻게 연결하고 그중 무엇이 특별히 중요한지를 식별하는 문제로 옮긴다.

### 3.2 Louvain과 Leiden의 차이 (슬라이드 10에서 12)

두 알고리즘의 단계 구성은 다음과 같다.

| 알고리즘 | 단계 | 각 단계가 하는 일 |
|---|---|---|
| Louvain (2008) | local moving | 각 노드를 modularity가 높아지는 community로 greedy하게 할당한다 |
| Louvain (2008) | aggregation | 찾아낸 community를 하나의 노드로 간주해 새 그래프로 압축한다 |
| Leiden (2019) | local moving, refinement, aggregation | 사이에 refinement를 넣어 모든 community가 내부적으로 잘 연결되어 있음을 보장한다 |

Louvain의 종료 조건은 세 가지다.

| 종료 조건 | 내용 |
|---|---|
| 노드 이동 없음 | 1단계에서 더 이상 노드 이동이 일어나지 않는다 |
| modularity 정체 | 전체 modularity가 증가하지 않는다 |
| 그래프 축소 없음 | 그래프 축소가 되지 않아 노드 개수와 community 개수가 같아진다 |

결과물은 계층 구조의 community와 노드별 community 할당이다.

Leiden은 Louvain이 전체 community의 modularity에만 초점을 맞춘 탓에 같은 community 안 노드들이 서로 연결되지 않는 disconnected community가 생기는 문제를 지적하며 나왔다. local moving과 aggregation 사이에 refinement 단계를 넣어 모든 community가 내부적으로 잘 연결되어 있음을 보장한다. refinement는 community별로 수행되며, community 안 노드를 개별 community로 간주한 뒤 서로 잘 연결된 노드끼리 새 community를 만들고, 연결되지 않은 노드는 개별 community로 남긴다.

### 3.3 Indexing 단계 (슬라이드 17에서 23)

- **source documents에서 text chunks로 (슬라이드 17)**: chunk size가 클수록 탐색되는 entity 개수가 줄어드는 trade-off가 있다. 실험 데이터셋은 두 가지다.

| 데이터셋 | 출처 | 규모 | chunk 설정 |
|---|---|---|---|
| Podcast transcripts | `Behind the Tech with Kevin Scott` 팟캐스트 대본 | 약 100만 토큰 | 600 토큰 chunk 1,669개, overlap 100 토큰 |
| News articles | 2013년 9월부터 2023년 12월까지의 뉴스 기사, 연예와 경제와 스포츠와 기술과 건강과 과학 등의 분야 | 약 170만 토큰 | 600 토큰 chunk 3,197개, overlap 100 토큰 |

- **text chunks에서 entity와 relationship으로 (슬라이드 18)**: entity의 type은 문서와 활용 방식에 따라 변경할 수 있다. 프롬프트 전문을 실었고, 예시로 미국 연방준비제도(FED), Jerome Powell, Federal Open Market Committee를 entity로 뽑고 Powell과 FED 사이 관계에 강도 9를 매기는 출력이 들어 있다.
- **claim 추출 (슬라이드 19)**: claim은 entity에 대한 중요한 사실로 날짜, 이벤트, 다른 entity와의 interaction 등을 가리킨다. 필드 구성은 다음과 같다.

| 필드 | 뜻 |
|---|---|
| subject | claim이 서술하는 행위를 한 entity의 이름 |
| object | 그 행위를 보고하거나 처리하거나 영향받는 entity의 이름. 알 수 없으면 NONE |
| claim type | claim의 전체 범주. 여러 입력에서 같은 유형이 같은 이름을 갖도록 짓는다 |
| claim status | TRUE는 확인됨, FALSE는 거짓으로 밝혀짐, SUSPECTED는 검증되지 않음 |
| claim description | claim의 근거가 되는 추론과 관련 증거와 참조 |
| claim date | claim이 제기된 기간의 시작일과 종료일, ISO-8601 형식 |
| claim source text | claim과 관련된 원문 인용 전부 |

  예시는 2022년 1월 10일 기사에서 Company A가 Government Agency B의 공공 입찰에서 담합으로 제재받았다는 claim이다.

- **self-reflection (슬라이드 20)**: LLM이 스스로 답변을 평가한 뒤 필요하면 재생성하도록 유도하는 프롬프팅 기법이다. 자료는 실제 코드 두 줄을 그대로 옮긴다. `CONTINUE_PROMPT = "MANY entities were missed in the last extraction.  Add them below using the same format:\n"`이고 `LOOP_PROMPT = "It appears some entities may have still been missed. Answer Y if there are still entities that need to be added, or N if there are none. Please answer with a single letter Y or N.\n"`이다. 목적은 chunk size를 크게 해서 호출 횟수는 줄이면서 탐지되는 entity 수는 더 늘리는 것이다.
- **entity와 relationship에서 knowledge graph로 (슬라이드 21)**: 같은 entity, relationship, claim이라도 chunk마다 내용이 달라 description이 서로 다를 수 있으므로, 이를 모두 모아 요약 프롬프트로 하나의 description으로 통합한다. 프롬프트는 서로 모순되는 description이 있으면 모순을 해소하고 하나의 일관된 요약을 만들라고 지시하며, 3인칭으로 쓰고 entity 이름을 포함하며 최종 길이를 `{max_length}` 단어로 제한하라고 요구한다. relationship이 등장한 횟수로 edge의 가중치를 설정한다. 공식 코드는 networkx와 pandas의 DataFrame으로 그래프를 관리한다.
- **knowledge graph에서 community로 (슬라이드 22)**: Leiden 알고리즘으로 community detection을 실시한다. 시각화 예시에서는 색깔로 community를 구분하고, community 안 degree 합이 클수록 노드 크기를 키운다. 상위 level과 하위 level 두 장을 나란히 두어, 하위 level에서 색의 종류가 더 다양해지는 것을 보인다.
- **community에서 community summary로 (슬라이드 23)**: community 정보를 report 형식으로 요약한다. LLM 입력 길이 제한 때문에 community의 rank를 정해 차례대로 입력하는데, leaf level community는 community 안 edge 수의 합을 기준으로, 상위 level community는 sub-community의 summary 길이가 짧은 것부터 입력한다. 출력 예시는 Verdant Oasis Plaza와 Unity March를 다룬 JSON으로, title, summary, rating 5.0, rating_explanation, findings 네 건을 담고 있다.

### 3.4 Query 단계 (슬라이드 24, 25)

세 단계 map-reduce다. 첫째, community summary를 무작위로 섞은 뒤 사전에 정의한 길이만큼 chunking한다. 둘째, 각 community summary를 근거로 local answer를 생성하면서 그 답이 query에 얼마나 도움이 될지를 100점 만점 score로 함께 산출한다. 셋째, 점수가 높은 것부터 local answer를 token limit에 맞춰 프롬프트에 넣어 global answer를 만든다.

슬라이드 24는 root level 기준으로 community 세 개, summary 세 개, local answer와 score 세 쌍이 global answer로 모이는 그림이다. 슬라이드 25는 같은 절차를 Level 1까지 내린 것으로, Community1이 Community1,1과 Community1,2로, Community3이 Community3,1과 Community3,2로 나뉘어 summary와 local answer가 네 개로 늘어난다. 두 슬라이드의 글머리 기호 본문은 동일하고 그림만 다르다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 평가 질문 생성과 판정 기준 (슬라이드 27에서 29)

데이터셋에 적합한 global sensemaking 질문을 LLM으로 생성한다. 절차는 세 단계다. 특정 사용자 상황(role) 정보를 넣어 persona를 만들고, persona별로 수행하고 싶은 task를 넣고, 두 정보를 합쳐 원하는 개수만큼 질문을 생성한다. 발표자는 여기서 두 가지를 짚는다. 첫째, 코드에서는 1단계에 task 정보를 먼저 넣은 뒤 persona가 산출되도록 되어 있어 논문의 서술과 순서가 다르다. 둘째, 사용자 정보를 사전에 어떻게 정의하고 설정했는지에 대한 설명이 논문에 없다.

생성된 질문에는 정답이 없으므로 같은 query에 대한 두 방법론의 답을 LLM이 직접 비교한다. 평가 기준 네 가지의 한국어 정의는 다음과 같다.

| 기준 | 정의 |
|---|---|
| comprehensiveness | 답변이 질문의 모든 측면과 세부 사항을 다루기 위해 얼마나 상세한 내용을 제공하는가 |
| diversity | 답변이 해당 질문에 대해 서로 다른 관점과 통찰을 제공함에 있어 얼마나 다채롭고 풍부한가 |
| empowerment | 답변이 독자로 하여금 해당 주제를 이해하고 정보에 기반한 판단을 내리는 데 얼마나 도움이 되는가 |
| directness | 얼마나 간결하고 정확하게 답변을 제공하는가 |

directness는 comprehensiveness 및 diversity와 trade-off 관계이므로 네 기준 모두에서 높은 점수를 받을 수는 없다. 발표자는 이 평가 기준을 뒷받침하는 근거나 참고 문헌이 논문에 별도로 없었다고 지적한다.

판정은 두 방법론의 답을 1 대 1로 붙여 승, 패, 무승부를 정하는 방식이며 총 5회 반복한다. 자료는 조건 A가 2승 2무 1패인 경우 무승부로 처리한다고 적은 뒤, 발표자 의견으로 "majority voting이라고 명시되어 있으나 옳은 승패 결정은 아닌 듯"하며 그 경우는 승으로 판별해야 한다고 비판한다. 판정 프롬프트 전문도 함께 실었으며, 출력은 `winner`(1, 2, 또는 0)와 `reasoning`을 담은 JSON이다.

### 4.2 비교 조건 (슬라이드 30)

community detection을 4개 level로 구성한 뒤 각 level에서 얻은 community summary를 비교한다. 상위에서 하위로 C0(root), C1, C2, C3 순이다. 여기에 두 baseline이 붙어 조건은 모두 여섯 가지다.

| 조건 | 컨텍스트에 들어가는 것 |
|---|---|
| C0 | root level community summary |
| C1 | 한 단계 아래 level의 community summary |
| C2 | 두 단계 아래 level의 community summary |
| C3 | 가장 하위 level의 community summary |
| TS | 실제 문서 chunk. query 임베딩과 유사한 entity 최대 20개를 뽑아 그 entity가 포함된 chunk를 고른다 |
| SS | query와 유사도가 높은 text chunk. 일반적인 벡터 RAG다 |

text source(TS)는 community 요약문이 아니라 실제 문서의 요약문으로 진행하는 조건이다. entity와 relationship까지 구축한 상태에서 일반 RAG처럼 문서를 chunking한 뒤 무작위로 섞고, query 임베딩과 유사한 임베딩을 가진 entity를 최대 20개 뽑은 다음, 그 entity가 포함된 chunk를 고른다. 이렇게 고른 chunk가 sub-community summary 자리를 대신한다. 발표자는 이 정의를 논문 본문이 아니라 공식 코드 두 곳(`text_units.py#L11`, `local_search/mixed_context.py#L355`)을 읽어서 재구성했다.

다른 하나는 일반적인 RAG로, text chunk를 벡터화한 뒤 query와 유사도가 높은 chunk를 골라 프롬프트에 넣는다. 결과표의 승률 설명에서는 이 조건을 SS로 표기한다.

### 4.3 실험 설정과 통계 (슬라이드 31, 32)

실행 설정은 다음과 같다.

| 항목 | 값 |
|---|---|
| 생성문 길이 | 8,000. community summary와 community answer와 local answer와 global answer 등 모든 생성문 공통 |
| 인덱싱 하드웨어 | RAM 16GB, Intel Xeon Platinum 8171M CPU @ 2.60GHz, 클라우드 활용 |
| 인덱싱 시간 | chunk size 600 토큰 설정 시 281분 |
| LLM | GPT-4-turbo |
| 속도 제한 | 분당 200만 토큰(TPM), 분당 요청 1만 건(RPM) |

데이터셋별 knowledge graph 규모는 다음과 같다.

| 데이터셋 | 노드 수 | relationship 수 |
|---|---|---|
| Podcast | 8,564 | 20,691 |
| News | 15,754 | 19,520 |

condition별 community summary 개수와 길이, 그리고 전체 corpus 길이 대비 비율을 뜻하는 % Max도 표로 제시한다.

### 4.4 실험 1 결과 (슬라이드 33에서 35)

승률표는 행에서 열로 향하는 승률로 읽으며, 자료는 `SS → TS = 17%`이면 `TS → SS = 83%`라는 예시를 세 슬라이드에 반복해 붙여 두었다.

| 슬라이드 | 비교 | 결과 |
|---|---|---|
| 33 | global 방식과 일반 RAG, comprehensiveness와 diversity | GraphRAG가 월등히 우수하다 |
| 33 | global 방식과 일반 RAG, directness | 일반 RAG가 근소하게 우세하다 |
| 34 | empowerment | 특별히 우수한 조건이 없다. C0가 다른 조건 대비 근소하게 약세이고 SS와 TS가 평균적으로 근소하게 우세하다 |
| 35 | community summary와 source text, comprehensiveness와 diversity | community summary를 활용할 때가 더 좋다는 결과가 유의 검정을 통과했으며 C0만 예외다 |

발표자는 empowerment 결과에 대해 예시와 인용문 같은 직접적인 정보가 주어졌을 때 판단 근거로 활용할 수 있으므로 문서를 직접 활용하는 쪽이 유리하다고 해석한다. 슬라이드 35에서는 C0가 DB로 활용되는 토큰 수가 2.6%로 매우 적으면서 성능은 훨씬 높다는 점을 특히 강조한다.

### 4.5 실험 2 결과 (슬라이드 36, 37)

답변에서 뽑아낸 claim으로 comprehensiveness와 diversity를 다시 측정한다. Claimify라는 LLM 기반 claim 추출기로 생성 답변에서 claim을 뽑는다. 지표 정의는 다음과 같다.

| 지표 | 정의 |
|---|---|
| comprehensiveness | 답변별로 추출되는 평균 claim 수 |
| diversity | 답변별 claim을 계층적 군집화했을 때 생성되는 평균 군집 수 |
| 텍스트 사이 거리 | `1 - ROUGE-L` |

발표자는 indexing 과정에서 구한 claim을 어떻게 활용하는지에 대해서는 논문에 언급이 없다고 지적한다.

결과는 다음과 같다.

- claim 개수는 Podcast와 News 두 데이터셋 모두에서 C0에서 C3까지와 TS가 SS보다 크게 많다.
- 클러스터 개수는 Podcast 데이터셋에서 C0에서 C3까지와 TS가 SS보다 크게 많으며, C1에서 C3까지는 특정 distance threshold에서만 유의미한 결과를 보인다.
- 다만 유의 검정 결과 두 데이터셋 모두에서 조건마다의 유의미한 차이는 확인되지 않았다.
- 그래서 실험 1과의 결과 일치 여부를 확인했다.

| 항목 | comprehensiveness | diversity |
|---|---|---|
| 실험 1에서 승패가 확실히 갈린 경우의 비율 (승 또는 패가 3번 이상) | 33% | 39% |
| 그중 실험 2 결과와 부합한 비율 | 78% | 69%에서 70% |

자료는 이를 높은 alignment로 평가한다.

### 4.6 참고 자료 큐레이션 (슬라이드 40)

Materials 장은 링크 네 개를 제시한다. Microsoft 공식 깃허브(`github.com/microsoft/graphrag/tree/main`), Microsoft 공식 API 문서(`microsoft.github.io/graphrag`), Neo4j 기반 GraphRAG 위키독스(`wikidocs.net/book/16760`), Neo4j가 제공하는 무료 textbook(`neo4j.com/essential-graphrag`)이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 자료 자체의 한계

paper review 슬라이드이므로 자체 실험, 코드, 벤치마크가 없다. 새로 만든 결과는 0건이며 가치는 한국어 재구성과 발표자의 비판적 논평에 있다. 논문의 표와 그림을 그대로 인용하므로 수치의 출처는 전부 원논문이다.

### 5.2 자료가 정리한 논문의 한계 (슬라이드 38)

| 항목 | 내용 |
|---|---|
| 일반화 | 일반화 성능을 구체적으로 확인하려면 더 다양한 도메인의 corpus를 대상으로 실험할 필요가 있다 |
| 평가 기준 | fabrication rate(환각률, 허위정보 생성률) 같은 기준을 평가에 포함할 수 있다 |

같은 슬라이드가 향후 연구로 제시하는 방향은 두 가지다. 하나는 hybrid RAG scheme으로, GraphRAG가 순전히 텍스트 기반으로 진행되므로 기존 RAG처럼 community summary 등을 임베딩해 벡터 비교로 정보를 탐색하는 방안을 적용할 수 있다. 다른 하나는 global 방식으로 일부가 전체를 대표하는 상황을 면하는 것이다.

### 5.3 발표자 견해 아홉 건

논문 본문에 없는 발표자 자신의 판단이다. 이 자료의 고유 기여에 해당한다.

| 번호 | 슬라이드 | 성격 | 내용 |
|---|---|---|---|
| 1 | 17 | 해석 | chunk size가 클수록 entity가 줄어드는 이유를 "entity가 중복되고 관계들이 요약됨"으로 해석한다 |
| 2 | 27 | 논문과 코드의 간격 | 논문이 서술한 질문 생성 순서(persona 먼저, task 나중)와 달리 코드는 task를 먼저 넣어 persona를 산출한다 |
| 3 | 27 | 평가 설계 비판 | 사용자 정보를 사전에 어떻게 정의하고 설정했는지 논문에 나오지 않는다 |
| 4 | 28 | 평가 설계 비판 | 평가 기준에 대한 근거나 참고 문헌이 별도로 없었다 |
| 5 | 28 | 평가 설계 비판 | 2승 2무 1패를 무승부로 처리하는 규칙은 majority voting이라고 명시되어 있으나 옳은 승패 결정이 아닌 듯하며, 그 경우는 승으로 판별해야 한다 |
| 6 | 34 | 해석 | empowerment에서 SS와 TS가 우세한 이유는 예시와 인용문 같은 직접적인 정보가 판단 근거로 활용될 수 있기 때문이다 |
| 7 | 36 | 평가 설계 비판 | indexing 과정에서 구한 claim의 활용법에 대해서는 논문에 언급이 없다 |
| 8 | 42 | 긍정 평가 | 평가 과정에서 persona와 task에 따라 질문을 생성한 방식은 좋은 아이디어다. 이 자료에서 유일하게 명시적으로 긍정한 설계 선택이다 |
| 9 | 42 | 종합 제언 | 아래 네 가지로 이어진다 |

9번 슬라이드 42의 종합 견해 네 가지는 다음과 같다.
1. 문서 본문 대비 knowledge graph가 얼마나 효율적으로 전체 문서의 정보를 반영할 수 있을 것인가가 핵심으로 보인다.
2. 이 방법론은 고정된 프롬프트로 knowledge graph를 구축했으므로, 사용자 목적에 맞게 더 적합하게 구축하는 방법이 GraphRAG의 성능을 좌우할 것으로 보인다.
3. community summary를 이용하면 연구 취지대로 global한 정보는 잘 반영하겠지만, 어찌 되었든 요약된 정보이므로 본문의 아주 상세한 정보는 손실이 불가피하다. 따라서 임베딩 벡터를 활용하는 hybrid scheme이 필수 불가결이며, community summary를 query와의 임베딩 벡터 유사도 기준으로 취사선택했으면 어땠을지 아쉬움을 남긴다.
4. 논문 본문에서 소개하는 내용보다 실제 코드는 더 많은 과정을 거친다. 예로 주요 entity 선택과 DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 탐색을 들고, 공식 문서의 drift_search 페이지를 링크로 건다.

논문과 공식 코드가 어긋나는 지점만 따로 모으면 세 곳이다.

| 슬라이드 | 어긋나는 지점 |
|---|---|
| 27 | 질문 생성 순서가 논문은 persona 먼저이고 코드는 task 먼저다 |
| 30 | TS 조건의 정의를 논문 본문에서 확정할 수 없어 공식 코드 두 곳을 읽어 재구성했다 |
| 42 | 코드에는 논문에 없는 절차가 더 있다. 주요 entity 선택과 DRIFT 탐색이 그 예다 |

### 5.4 자료 자체의 내적 문제

| 위치 | 문제 |
|---|---|
| 슬라이드 40 | 제목이 "Python Packages"이지만 나열된 항목 네 개는 GitHub 저장소, 공식 API 문서, 위키독스 책, Neo4j textbook으로 Python 패키지가 하나도 없다 |
| 슬라이드 30과 33에서 35 | SS라는 조건 약어가 조건을 정의한 슬라이드 30에는 나오지 않고 결과 슬라이드의 승률표 설명에서 처음 등장한다. 슬라이드 30에서는 같은 조건을 "일반적인 RAG"라고만 부른다 |
| 슬라이드 8 | KBQA 서베이의 출처를 "Lan et al., JCAI2021"로 적었다. 학회 약어에서 앞 글자가 빠진 표기다 |
| 슬라이드 14 | "인공지는 기술"이라고 적었다. 문맥상 인공지능이다 |
| 슬라이드 24와 25 | 글머리 기호 본문이 완전히 동일하고 오른쪽 도식만 다르다 |

### 5.5 원논문과 어긋나는 서술

TS 조건의 정의가 원논문과 다르다. 본 wiki의 [[database/edge-2024-from-local-to-global|원논문 페이지]] 기록에 따르면 TS는 graph 없이 원본 text chunk에 map-reduce를 그대로 적용하는 대조군이며, C0에서 C3까지와의 차이가 graph index의 유무 하나뿐이어야 graph의 기여를 분리해 볼 수 있다는 설계 의도를 갖는다. 반면 이 자료가 설명한 TS에는 query 임베딩과 유사한 entity를 최대 20개 뽑아 그 entity가 포함된 chunk를 고르는 단계가 들어 있어, query에 따라 컨텍스트가 달라진다. 발표자가 근거로 든 `local_search/mixed_context.py`는 공식 구현체가 검색 모드별 컨텍스트를 조립하는 자리라서 논문의 baseline 정의와는 층이 다르다. 자료가 출처를 코드 링크로 밝히고 있으므로 서술 자체는 자료의 주장으로 보존하되, 조건 정의를 인용할 때는 원논문 쪽을 함께 확인해야 한다.

한편 검색 모드에 대해서는 오귀속이 없다. 자료 전체에 local search나 global search라는 표현은 한 번도 나오지 않는다. local answer와 global answer는 map-reduce의 단계 이름으로만 쓰이며, 검색 모드가 여러 개라는 사실은 conclusions에서 코드 이야기로 분리해 DRIFT를 예로 든다.

## 6. 관련 연구 (Related Work)

자료가 각 슬라이드 하단에 밝힌 출처는 다음과 같다.

| 슬라이드 | 인용 자료 | 쓰인 자리 |
|---|---|---|
| 4, 5, 6 | Retrieval-Augmented Generation for Large Language Models: A Survey (2024) | GraphRAG 파이프라인 도식, RAG 프레임워크 도식, RAG 발전 단계 도식의 출처 |
| 8 | A Survey on Complex Knowledge Base Question Answering: Methods, Challenges and Solutions (Lan et al., 2021) | KBQA와 GraphRAG 비교의 배경 |
| 9 | Knowledge-Augmented Language Model Prompting for Zero-Shot Knowledge Graph Question Answering (2023), Enhancing Knowledge Graph Construction Using Large Language Models (2023), Knowledge Graph Prompting for Multi-Document Question Answering (Wang et al., 2023), LLM-based Knowledge Graph Traversal Agent (Wang et al., 2023) | LLM과 knowledge graph를 결합하는 두 방향의 근거로 함께 인용 |
| 10에서 12 | Community detection in graphs (Santo Fortunato, 2009), Fast unfolding of communities in large networks (Blondel et al., 2008), From Louvain to Leiden: guaranteeing well-connected communities (Traag et al., 2019) | community detection 배경 |
| 13 | Making Sense of Sensemaking 1: Alternative Perspectives (Klein et al., 2006), Wikipedia의 Sensemaking 항목 | sensemaking 정의 |
| 36 | AFaCTA: Assisting the annotation of factual claim detection with reliable LLM annotators (Ni et al., 2024), Towards effective extraction and evaluation of factual claims (Metropolitansky and Larson, 2025) | claim 추출 방법론 배경 |
| 7, 8 | 고려대학교 DSBA 연구실 졸업생 노건호의 논문 세미나 자료 (Knowledge Graph Construction, Subgraph Retrieval Enhanced Model for Multi-hop Knowledge Base Question Answering) | knowledge graph와 KBQA 배경 |
| 10 | 고려대학교 DSBA 연구실 졸업생 김선우의 PYSR 영상 (Community Detection in graphs) | community detection 배경 |

본 ai-wiki 안의 연관 페이지는 다음과 같다.

- [[database/edge-2024-from-local-to-global|GraphRAG 원논문]]: 이 review의 대상이다.
- [[database/dsba-2026-paper-review-graph-based-rag|동일 발표자의 2026-05-02 세미나]]: LightRAG와 LeanRAG를 다루며, 발표자의 이전 GraphRAG 세미나를 사전 자료로 언급한다.
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]]: 발표자가 제언한 hybrid scheme 방향의 실현 사례다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]]: 계층 구조 knowledge graph로 detail 손실 완화를 시도한 후속 연구다.

## 7. 용어집 (Glossary)

공통 정의는 [[database/edge-2024-from-local-to-global|원논문 source의 7절]]에 있다. 여기서는 이 자료 고유의 표현과 발표자 정의만 정리한다.

| 용어 | 뜻 |
|---|---|
| global sensemaking | corpus의 전반적인 내용을 바탕으로 진행되는 sensemaking. 발표자는 자신의 공동 연구 주제인 문헌 분석 프레임워크를 사례로 들며 "2015년에서 2025년 동안 전기차 배터리 또는 배터리 공정 관련 연구 분야에서 인공지능 기술로 해결하고자 했던 과업은 무엇이며 이에 대한 예시를 알려주세요" 같은 질문을 예로 제시한다 |
| KBQA (Knowledge Base Question Answering) | 정답이 있는 자연어 사실 질문에 대해 knowledge base로 정답 entity를 산출하는 과업. 발표자는 "KBQA의 일반화된 형태가 GraphRAG"라고 정의한다 |
| knowledge graph completion | triplet 중 하나의 요소를 제외한 뒤 그 요소가 무엇일지 예측하는 과업 |
| modularity | community 안 연결이 많고 밖 연결이 적을수록 높아지는 값. 이를 어떻게 정의하고 최적화하느냐가 곧 community detection 방법론이라는 것이 자료의 정리다 |
| 류류상종 (類類相從) | community detection의 기본 가정을 요약하기 위해 자료가 쓴 한자 표현. 그래프에서 비슷한 노드들이 서로 연결되고 밀집해 있으리라는 뜻이다 |
| refinement | Leiden이 Louvain에 추가한 중간 단계. community 안 노드를 개별 community로 간주해 잘 연결된 것끼리 다시 묶고 연결되지 않은 노드는 홀로 남겨 disconnected community 문제를 해소한다 |
| text source (TS) | community 요약문 대신 실제 문서 chunk를 요약 자리에 넣는 비교 조건. 발표자가 공식 코드 두 곳을 읽어 운영적으로 재구성한 정의다 |
| % Max | condition별 community summary 통계표의 한 열로, 전체 corpus 길이 대비 비율을 뜻한다 |
| Claimify | 생성된 답변에서 claim을 뽑아내는 LLM 기반 추출기로, 실험 2의 지표 계산에 쓰인다 |
| DRIFT (Dynamic Reasoning and Inference with Flexible Traversal) | 논문 본문에는 없고 공식 `microsoft/graphrag` 코드에만 있는 추가 탐색 절차. 발표자가 논문과 실제 시스템 사이의 간격을 보여주기 위해 든 사례다 |
