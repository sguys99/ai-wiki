---
title: "GraphRAG Paper Review (DSBA, 김도윤 2025-08-11)"
type: article
year: 2025
category: database
raw_path: raw/articles/dsba-2025-graphrag-paper-review.pdf
raw_filename: "dsba-2025-graphrag-paper-review.pdf"
source: dsba-2025-graphrag-paper-review.md
source_collection: external
author: "김도윤 (Kim Doyoon, SNU 산업공학과 DSBA 박사과정)"
presentation_date: "2025-08-11"
venue: "DSBA Lab Seminar"
reviews_paper: "Edge, Trinh et al. (2024), From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
url: "https://github.com/microsoft/graphrag"
tags: [graph-rag, paper-review, dsba, knowledge-graph, community-detection, leiden, sensemaking, korean, lecture-deck]
---

## 요약

이 페이지는 GraphRAG 논문 자체가 아니라, 그 논문을 읽은 한 사람의 발표 기록을 다룬다. 서울대학교 산업공학과 DSBA 연구실의 김도윤 박사과정이 2025년 8월 11일 lab seminar에서 발표한 43쪽 한국어 슬라이드 자료다. 대상 논문은 Edge와 Trinh 등이 2024년에 발표한 "From Local to Global: A GraphRAG Approach to Query-Focused Summarization"이며, 논문 자체의 상세는 [[database/edge-2024-from-local-to-global]]에 있다.

발표 자료의 가치는 논문 요약이 아니라 두 가지 다른 데 있다. 첫째, 논문을 읽기 전에 필요한 배경 지식을 한국어로 먼저 세운다. RAG의 구성 요소, knowledge graph와 KBQA의 관계, Louvain에서 Leiden으로 이어지는 community detection, sensemaking의 네 단계를 열한 장에 걸쳐 쌓은 뒤에야 논문의 방법론으로 들어간다. 둘째, 논문 본문에 없는 발표자 자신의 판단 아홉 건을 곳곳에 명시한다.

발표자 견해 아홉 건 중 세 건은 논문이 서술한 내용과 실제 공식 코드가 어긋난다는 지적이고, 세 건은 평가 설계 자체에 대한 비판이며, 나머지는 자료가 좋다고 평가한 설계 하나와 후속 방향 제언이다. 이 자료를 다른 GraphRAG 소개 자료와 구별짓는 것이 바로 이 부분이라, 아래에서도 별도의 절로 다룬다.

## 배경

### 이 자료의 성격과 위치

발표 자료는 자체 실험, 코드, 벤치마크를 만들지 않는다. 수치와 그림은 모두 원논문에서 인용한 것이고, 새로 생산한 결과는 없다. 따라서 이 페이지도 원논문의 결과를 다시 검증하지 않고, 발표자가 무엇을 골라 어떻게 읽었으며 어디에 이견을 달았는지를 기록한다.

| 항목 | 내용 |
|---|---|
| 발표자 | 김도윤, 서울대학교 산업공학과 데이터과학 및 비즈니스 애널리틱스 연구실 박사과정 |
| 발표일 | 2025년 8월 11일 월요일 |
| 형식 | lab seminar paper review 슬라이드 자료, PDF 43쪽, 약 4.4MB |
| 언어 | 한국어 본문에 영문 기술 용어를 섞고, 논문에서 가져온 프롬프트는 영문 원문 그대로 게재 |
| 대상 논문 | 표지에 "Darren Edge and Ha Trinh et al., 2024 arxiv"로 표기 |
| 파일 메타데이터 | 작성자 김도윤, Microsoft PowerPoint LTSC로 2025년 8월 15일 생성 |

자료의 구성은 다섯 장이며, 분량 배분에서 이미 자료의 성격이 드러난다. 43쪽 중 열한 장이 배경 지식에 쓰인다.

| 장 | 슬라이드 | 다루는 내용 |
|---|---|---|
| 1. Backgrounds | 4에서 14 | RAG, knowledge graph, KBQA, community detection, sensemaking, 문제 정의 |
| 2. Methodology | 16에서 25 | 인덱싱 다섯 단계와 질의 시점 map-reduce |
| 3. Experiments | 27에서 38 | 질문 생성, 평가 기준, 비교 조건, 실험 1과 실험 2, 논의 |
| 4. Materials | 40 | 재현과 학습에 쓸 참고 링크 네 개 |
| 5. Conclusions | 42 | 종합 정리와 발표자 견해 |

### 원논문이 풀려는 문제

목표는 전체 text corpus를 아우르는 query-focused summarization이다. 자료는 이를 "corpus의 전반적인 내용을 반영해야만 답변이 가능한 경우"로 정의하고, `What are the main themes in the dataset?`처럼 특정 문서 몇 개를 찾아서는 답할 수 없는 질문을 예로 든다.

일반적인 벡터 RAG는 corpus 양이 많아지면 이런 global sensemaking 능력이 부족하다는 것이 출발점이다. 발표자는 자신의 공동 연구 주제인 문헌 분석 프레임워크를 사례로 들어 이 상황을 구체화한다. "2015년에서 2025년 동안 전기차 배터리 또는 배터리 공정 관련 연구 분야에서 인공지능 기술로 해결하고자 했던 과업은 무엇이며 이에 대한 예시를 알려주세요" 같은 질문이 그 예다. 이런 질문에 답하려면 논문 한 편이 아니라 10년치 문헌 전체의 윤곽이 필요하다.

## 핵심 개념

### RAG의 구성 요소

자료는 RAG를 네 부분으로 나눈 뒤 논의를 시작한다. 이후 GraphRAG의 각 단계가 이 중 어디를 바꾼 것인지 대응시키기 위한 밑그림이다.

| 구성 요소 | 역할 | GraphRAG가 바꾼 지점 |
|---|---|---|
| DB | 검색 대상 문서 전체 집합 | 문서 대신 knowledge graph와 community summary를 둔다 |
| indexing | 문서를 chunking한 뒤 임베딩 모델로 벡터화해 저장하는 행위 | 벡터화 대신 LLM으로 entity, relationship, claim을 뽑아 그래프를 만든다 |
| retriever | 질문과 관련성이 가장 높은 문서를 찾는 모듈 | 검색 자체를 없애고 모든 community summary를 훑는 map 단계로 대체한다 |
| generator | 찾은 문서와 query로 답을 생성하는 LLM | local answer를 모아 global answer를 만드는 reduce 단계가 추가된다 |

자료는 일반 RAG의 초점이 질문 의도 분석과 관련 문서 탐색에 있고, DB 안 문서들 사이의 관계와 연결성에는 상대적으로 관심이 적다고 진단한다. GraphRAG가 파고드는 빈틈이 바로 그 관계다.

### knowledge graph와 KBQA

knowledge base는 서로 다른 두 객체의 소속과 두 객체 사이 관계를 담은 지식 정보이고, 이를 그래프로 나타내면 knowledge graph가 된다. 자료는 자기 소속을 예로 들어 `(김도윤, member_of, DSBA)`라는 triplet을 만들고, 앞이 subject이자 head, 뒤가 object이자 tail, 가운데가 relation이며, 노드에는 PERSON과 ORG 같은 type이 붙는다고 설명한다.

DB로서 knowledge graph가 갖는 장점은 세 가지다.

- 물리적으로 적은 양의 텍스트로도 필요한 정보를 제공할 수 있다.
- entity 사이 연결을 통해 직접적인 연결성을 확인할 수 있다.
- 필요한 정도에 따라 노드의 종류와 관계의 종류를 직접 조절할 수 있다.

자료는 이어서 GraphRAG를 기존 과업인 KBQA와 여섯 항목으로 비교한다. 아래 표는 자료가 슬라이드 8에 실은 비교표 그대로다.

| 항목 | KBQA | GraphRAG |
|---|---|---|
| 목적 | 구조화된 지식베이스에서 정확한 답 검색 | 그래프 구조를 활용한 검색 증강 생성 |
| 지식 표현 | RDF 트리플, 지식그래프 (구조화) | 텍스트와 그래프 구조 (반구조화) |
| 질의 처리 | 자연어를 SPARQL이나 논리형식으로 변환 | 자연어로 그래프 검색 후 LLM 생성 |
| 답변 형태 | 정확한 팩트나 엔티티 | 생성된 자연어 텍스트 |
| 추론 방식 | 논리적 추론 (규칙 기반) | 그래프 탐색과 언어모델 추론 |
| 데이터 소스 | Freebase, DBpedia, Wikidata 등 | 문서 컬렉션을 그래프로 변환 |

발표자는 이 표를 근거로 "KBQA의 일반화된 형태가 GraphRAG라고 볼 수 있음"이라고 결론짓는다. 정답 entity 하나를 반환하던 과업을 자연어 생성으로 넓히고, 데이터 소스를 기존 지식베이스에서 임의의 문서 컬렉션으로 넓힌 것이 GraphRAG라는 관점이다.

LLM과 knowledge graph를 결합하는 방향은 두 가지로 갈린다.

| 방향 | 방법 | GraphRAG와의 관계 |
|---|---|---|
| LLM으로 knowledge graph 만들기 | 문서별로 triplet 생성 프롬프트를 넣고, 나온 triplet을 모아 전체 그래프를 구축한다 | GraphRAG의 인덱싱 단계가 이 방향이다 |
| knowledge graph를 LLM에 입력하기 | 문서와 passage를 노드로 만들고 언어 모델로 노드 임베딩을 얻은 뒤, 문서 내 구조나 임베딩 유사도로 edge를 만든다 | 이 방향으로 multi-document question answering을 수행하면 GraphRAG와 가장 유사한 형태가 된다 |

### community detection과 modularity

community detection은 graph clustering의 한 방식으로, 밀접하게 연결된 노드의 집합을 찾아내는 작업이다. 기본 가정은 그래프에서 비슷한 노드들이 서로 연결되고 밀집해 있으리라는 것이며, 자료는 이를 류류상종(類類相從)이라는 한자 표현으로 요약한다.

핵심 개념은 modularity다. community 안 연결이 많고 community 밖 연결이 적을수록 값이 높아진다. modularity를 어떻게 정의하고 어떻게 최적화하느냐가 곧 community detection 방법론의 차이라는 것이 자료의 정리다.

| 알고리즘 | 단계 | 특징 |
|---|---|---|
| Louvain (2008) | local moving, aggregation | local moving은 각 노드를 modularity가 높아지는 community로 greedy하게 할당하고, aggregation은 찾아낸 community를 하나의 노드로 간주해 새 그래프로 압축한다 |
| Leiden (2019) | local moving, refinement, aggregation | 사이에 refinement를 넣어 모든 community가 내부적으로 잘 연결되어 있음을 보장한다. GraphRAG가 쓰는 알고리즘이다 |

Louvain의 종료 조건은 세 가지다. 1단계에서 노드 이동이 더 이상 일어나지 않거나, 전체 modularity가 증가하지 않거나, 그래프 축소가 되지 않아 노드 개수와 community 개수가 같아지는 경우다. 결과물은 계층 구조의 community와 노드별 community 할당이다.

Leiden이 등장한 이유는 Louvain의 결함 때문이다. Louvain은 전체 community의 modularity에만 초점을 맞추기 때문에, 같은 community로 묶인 노드들이 정작 서로 연결되어 있지 않은 disconnected community가 생길 수 있다. refinement 단계는 community별로 수행되며, community 안 노드를 일단 개별 community로 간주한 뒤 서로 잘 연결된 노드끼리 새로 묶고, 연결되지 않은 노드는 개별 community로 남긴다. 자료는 이 문제를 그림으로 보여준 뒤 Leiden의 동작 예시를 별도 슬라이드로 붙인다.

### sensemaking의 네 단계

sensemaking은 사람들이 집단 경험에 의미를 부여하는 과정을 뜻한다. 자료는 Wikipedia 정의와 Klein 등의 2006년 논문을 함께 인용하며, 연결 관계를 이해하고 미래를 예측해 효과적으로 행동하기 위한 지속적 노력이자, 조직이 불확실한 환경에서 의미를 만들어가는 과정을 담은 개념이라고 설명한다.

| 단계 | 뜻 |
|---|---|
| noticing | 환경에서 중요한 신호나 변화를 인지한다 |
| interpreting | 포착된 정보에 의미를 부여하고 기존 지식과 연결한다 |
| acting | 해석된 의미에 기반해 행동을 취한다 |
| reflecting | 행동의 결과를 평가하고 새로운 이해를 형성한다 |

자료는 이 개념을 데이터 사이언스의 문제로 옮긴다. 주어진 정보를 어떻게 연결할 것인가, 정보 사이의 내재적 연결 관계를 어떻게 찾을 것인가, 그중 무엇이 특별히 중요한가라는 세 질문이다. LLM과 query를 쓰는 상황에서는 query에 가장 적합하고 연관 있는 정보를 식별할 수 있어야 한다는 요구로 이어진다.

## 방법

### 인덱싱 시점과 질의 시점의 구분

자료는 논문의 방법론을 두 시점으로 나눈 뒤 인덱싱을 다섯 하위 단계로 쪼갠다. 모든 LLM 호출은 GPT-4-turbo로 통일한다는 점을 먼저 밝힌다.

| 시점 | 하는 일 |
|---|---|
| 인덱싱 시점 | 원문 텍스트에서 LLM으로 그래프 인덱스를 만든다 |
| 질의 시점 | 각 community에서 query와 연관된 요약 정보를 뽑아 community answer를 만들고, 이를 하나로 합쳐 query와 함께 프롬프트에 넣어 global answer를 생성한다 |

인덱싱의 다섯 단계는 다음과 같이 이어진다.

| 단계 | 입력 | 출력 | 핵심 처리 |
|---|---|---|---|
| 1 | 원문 문서 | text chunk | 600 토큰 단위로 자르고 100 토큰을 겹친다 |
| 2 | text chunk | entity, relationship, claim | 추출 프롬프트와 self-reflection |
| 3 | 추출 결과 | knowledge graph | 같은 대상의 description을 하나로 통합하고 등장 횟수로 edge의 가중치를 정한다 |
| 4 | knowledge graph | community 계층 | Leiden 알고리즘 |
| 5 | community | community summary | report 형식 요약, rank 순으로 LLM에 입력 |

### 문서를 chunk로 나누는 단계

chunk size가 클수록 탐색되는 entity 개수가 줄어드는 trade-off가 있다. 발표자는 그 원인을 "entity가 중복되고 관계들이 요약됨"으로 해석한다. chunk가 커질수록 한 번의 추출 안에서 같은 대상이 반복 등장하고, 개별 관계가 상위 서술로 뭉뚱그려지기 때문이라는 뜻이다.

실험에 쓴 데이터셋은 두 가지이며 chunk 설정은 동일하다.

| 데이터셋 | 출처 | 규모 | chunk |
|---|---|---|---|
| Podcast transcripts | `Behind the Tech with Kevin Scott` 팟캐스트 대본 | 약 100만 토큰 | 600 토큰 chunk 1,669개, overlap 100 토큰 |
| News articles | 2013년 9월부터 2023년 12월까지의 뉴스 기사, 연예와 경제와 스포츠와 기술과 건강과 과학 등의 분야 | 약 170만 토큰 | 600 토큰 chunk 3,197개, overlap 100 토큰 |

### chunk에서 entity와 relationship으로

entity의 type은 문서와 활용 방식에 따라 변경할 수 있다. 자료는 추출 프롬프트 전문을 영문 그대로 실었다. 프롬프트의 지시는 네 단계로 짜여 있다.

| 단계 | 지시 내용 |
|---|---|
| 1 | 주어진 type 목록에 해당하는 모든 entity를 찾고, 각각에 대해 이름(대문자), type, 속성과 활동을 담은 서술을 뽑는다 |
| 2 | 1단계에서 찾은 entity 중 명확하게 관련된 쌍을 모두 찾아, 원본 entity와 대상 entity, 관련 이유를 담은 관계 서술, 관계 강도를 나타내는 수치 점수를 뽑는다 |
| 3 | 결과를 영어 단일 목록으로 반환하고 지정된 구분자로 항목을 나눈다 |
| 4 | 끝나면 완료 구분자를 출력한다 |

entity와 relationship을 한 번의 호출에서 함께 뽑는 구성이라, 관계를 뽑기 위해 별도의 호출을 돌리지 않는다. 관계 강도를 수치로 받아 두는 것이 뒤에서 edge의 가중치를 정할 때 쓰인다.

프롬프트에 붙은 예시는 미국 연방준비제도 관련 기사다. entity로 FED와 Jerome Powell과 Federal Open Market Committee를 뽑고, Powell과 FED 사이 관계에 강도 9를 매긴다. 이 예시가 슬라이드에 그대로 실려 있어, 한국어 독자가 논문 부록을 따로 열지 않고도 출력 형식을 확인할 수 있다.

### claim 추출

claim은 entity에 대한 중요한 사실이다. 날짜, 이벤트, 다른 entity와의 interaction 등이 여기에 해당한다. 자료는 추출 프롬프트 전문과 함께 필드 구성을 보여준다.

| 필드 | 뜻 |
|---|---|
| subject | claim이 서술하는 행위를 한 entity의 이름 |
| object | 그 행위를 보고하거나 처리하거나 영향받는 entity의 이름. 알 수 없으면 NONE |
| claim type | claim의 전체 범주. 여러 입력에서 같은 유형이 같은 이름을 갖도록 짓는다 |
| claim status | TRUE는 확인됨, FALSE는 거짓으로 밝혀짐, SUSPECTED는 검증되지 않음 |
| claim description | claim의 근거가 되는 추론과 관련 증거와 참조 |
| claim date | claim이 제기된 기간의 시작일과 종료일, ISO-8601 형식 |
| claim source text | claim과 관련된 원문 인용 전부 |

예시는 2022년 1월 10일 기사에서 Company A가 Government Agency B의 공공 입찰에서 담합으로 제재받았다는 claim이다. status가 TRUE이고 시작일과 종료일이 같은 날짜로 채워진다.

### self-reflection 단계

self-reflection은 LLM이 스스로 답변을 평가한 뒤 필요하면 답변을 재생성하도록 유도하는 프롬프팅 기법이다. 자료는 공식 코드 두 줄을 그대로 옮긴다.

| 상수 | 내용 |
|---|---|
| `CONTINUE_PROMPT` | "MANY entities were missed in the last extraction.  Add them below using the same format:" |
| `LOOP_PROMPT` | "It appears some entities may have still been missed. Answer Y if there are still entities that need to be added, or N if there are none. Please answer with a single letter Y or N." |

앞 상수는 놓친 entity를 같은 형식으로 더 적으라고 지시하고, 뒤 상수는 아직 남은 entity가 있는지를 Y와 N 한 글자로 답하게 해 반복 여부를 결정한다. 목적은 chunk size를 크게 잡아 LLM 호출 횟수는 줄이면서도 탐지되는 entity 수는 오히려 늘리는 것이다. 앞 단계에서 본 chunk size의 trade-off를 상쇄하는 장치인 셈이다.

### knowledge graph 구성

같은 entity, relationship, claim이라도 chunk마다 서술이 달라 description이 서로 다를 수 있다. 그래서 같은 대상에 붙은 description을 모두 모아 요약 프롬프트로 하나의 description으로 통합한다. 자료가 실은 프롬프트는 네 가지를 요구한다. 모든 description의 정보를 포함할 것, 서로 모순되는 description이 있으면 모순을 해소하고 하나의 일관된 요약을 낼 것, 3인칭으로 쓰고 entity 이름을 포함할 것, 최종 길이를 지정된 단어 수로 제한할 것이다.

relationship이 등장한 횟수가 edge의 가중치가 된다. 공식 코드는 networkx와 pandas의 DataFrame으로 그래프를 관리한다는 점을 발표자가 덧붙인다.

### community 분할과 요약

Leiden 알고리즘으로 community detection을 실시한다. 자료는 시각화 예시에서 색깔로 community를 구분하고, community 안 degree 합이 클수록 노드를 크게 그린다. 상위 level과 하위 level 두 장을 나란히 두어 하위 level에서 색의 종류가 더 다양해지는 것을 보인다.

community 정보는 report 형식으로 요약한다. LLM 입력 길이 제한 때문에 모든 community를 한꺼번에 넣을 수 없어 rank를 정해 차례대로 입력하는데, 기준이 level에 따라 다르다.

| level | 입력 순서 기준 |
|---|---|
| leaf level community | community 안 edge 수의 합 |
| 상위 level community | sub-community의 summary 길이가 짧은 것부터 |

출력 예시로 실은 것은 Verdant Oasis Plaza와 Unity March를 다룬 JSON이다. 구조는 다음과 같다.

| 필드 | 예시에 담긴 값 |
|---|---|
| title | "Verdant Oasis Plaza and Unity March" |
| summary | 이 community가 Unity March의 장소인 Verdant Oasis Plaza를 중심으로 돌며, 광장이 Harmony Assembly와 Unity March와 Tribune Spotlight와 관계를 맺고 있다는 요약 |
| rating | 5.0 |
| rating_explanation | 행진 중 소요나 충돌 가능성이 있어 영향 심각도를 중간으로 본다는 설명 |
| findings | 네 건. 각각 요약 한 줄과 근거 서술로 구성된다 |

findings 네 건은 Verdant Oasis Plaza가 community의 중심 장소라는 점, Harmony Assembly가 행진 주최자라는 점, Unity March가 주요 사건이라는 점, Tribune Spotlight가 이를 보도해 언론의 관심을 끌었다는 점이다. 각 항목의 서술 끝에는 근거가 된 entity 번호와 relationship 번호가 대괄호 안에 붙어 있어, 요약문에서 원본 그래프로 되짚어 갈 수 있다.

### 질의 시점의 map-reduce

질의 시점은 세 단계다.

| 단계 | 처리 |
|---|---|
| prepare community summaries | community summary를 무작위로 섞은 뒤 사전에 정의한 길이만큼 chunking한다 |
| map community answers | 각 community summary를 근거로 local answer를 생성하면서, 그 답이 query에 얼마나 도움이 될지를 100점 만점 score로 함께 산출한다 |
| reduce to global answer | 점수가 높은 것부터 local answer를 token limit에 맞춰 프롬프트에 넣어 global answer를 만든다 |

무작위로 섞는 이유는 특정 community가 앞자리를 독점하지 않게 하기 위함이고, score로 순서를 정하는 것은 token limit 안에 어떤 local answer를 남길지 고르는 장치다.

자료는 이 흐름을 두 장의 그림으로 나눠 그린다. 첫 장은 root level 기준으로 community 세 개, summary 세 개, local answer와 score 세 쌍이 하나의 global answer로 모이는 그림이다. 둘째 장은 같은 절차를 Level 1까지 내려 Community1이 Community1,1과 Community1,2로, Community3이 Community3,1과 Community3,2로 나뉘고 local answer가 네 개로 늘어나는 그림이다. 두 슬라이드의 글머리 본문은 완전히 같고 그림만 다르다.

여기서 쓰이는 local answer와 global answer는 map-reduce의 단계 이름이지, 서로 다른 검색 모드의 이름이 아니다. 자료는 이 구분을 흐리지 않으며, 검색 모드가 여러 개 존재한다는 사실은 뒤에서 코드 이야기로 따로 꺼낸다.

## 실험 설계

### 평가 질문 생성

데이터셋에 적합한 global sensemaking 질문을 LLM으로 생성한다. 절차는 세 단계로, 특정 사용자 상황을 입력해 persona를 만들고, persona별로 수행하고 싶은 task를 입력하고, 두 정보를 합쳐 원하는 개수만큼 질문을 생성한다.

발표자는 이 절차에 두 가지 단서를 단다. 코드에서는 1단계에 task 정보를 먼저 넣은 뒤 persona가 산출되도록 되어 있어 논문 서술과 순서가 반대라는 점이 하나이고, 사용자 정보를 사전에 어떻게 정의하고 설정했는지에 대한 설명이 논문에 없다는 점이 다른 하나다.

### 평가 기준

생성된 질문에는 정답이 없다. 그래서 같은 query에 대한 두 방법론의 답을 LLM이 직접 비교한다. 자료가 옮긴 네 기준의 한국어 정의는 다음과 같다.

| 기준 | 정의 |
|---|---|
| comprehensiveness | 답변이 질문의 모든 측면과 세부 사항을 다루기 위해 얼마나 상세한 내용을 제공하는가 |
| diversity | 답변이 해당 질문에 대해 서로 다른 관점과 통찰을 제공함에 있어 얼마나 다채롭고 풍부한가 |
| empowerment | 답변이 독자로 하여금 해당 주제를 이해하고 정보에 기반한 판단을 내리는 데 얼마나 도움이 되는가 |
| directness | 얼마나 간결하고 정확하게 답변을 제공하는가 |

directness는 나머지 두 기준인 comprehensiveness 및 diversity와 trade-off 관계다. 자세하고 다양하게 답할수록 간결함은 떨어지므로 네 기준 모두에서 높은 점수를 받는 것은 불가능하다. 발표자는 이 평가 기준을 뒷받침하는 근거나 참고 문헌이 논문에 별도로 없었다고 지적한다.

판정 프롬프트도 전문을 실었다. 두 답변을 받아 어느 쪽이 더 나은지 판정하되, 출력은 `winner`와 `reasoning`을 담은 JSON이어야 하며 `winner`는 1이나 2, 또는 두 답이 본질적으로 유사하고 차이가 중요하지 않으면 0이다.

### 승패 판정 규칙

판정은 두 방법론의 답을 1 대 1로 붙여 승과 패와 무승부를 정하는 방식이며 총 5회 반복한다. 자료는 조건 A가 2승 2무 1패인 경우를 무승부로 처리한다고 적은 뒤, 발표자 의견으로 이 규칙을 비판한다. majority voting이라고 명시되어 있으나 옳은 승패 결정이 아닌 듯하며, 그 경우는 승으로 판별해야 한다는 것이다. 5회 중 승이 2회이고 패가 1회이면 승수가 더 많은데도 무승부가 되므로, 승패가 갈린 사례가 실제보다 적게 집계된다는 지적이다.

### 비교 조건

community detection을 4개 level로 구성한 뒤 각 level에서 얻은 community summary를 비교한다. 여기에 baseline 두 가지가 붙어 조건은 모두 여섯 가지다.

| 조건 | 요약 자리에 들어가는 것 | 비고 |
|---|---|---|
| C0 | root level community summary | 가장 상위이며 개수가 가장 적다 |
| C1 | 한 단계 아래 community summary | |
| C2 | 두 단계 아래 community summary | |
| C3 | 가장 하위 community summary | 개수가 가장 많다 |
| TS | 실제 문서 chunk | entity와 relationship까지 구축한 상태에서 문서를 chunking하고 무작위로 섞은 뒤, query 임베딩과 유사한 임베딩을 가진 entity를 최대 20개 뽑고 그 entity가 포함된 chunk를 고른다 |
| SS | query와 유사도가 높은 text chunk | 일반적인 벡터 RAG. text chunk를 벡터화한 뒤 유사도 높은 chunk를 골라 프롬프트에 넣는다 |

TS 조건의 정의는 논문 본문이 아니라 공식 코드 두 곳을 읽어 재구성한 것이다. 발표자는 `text_units.py#L11`과 `local_search/mixed_context.py#L355` 두 링크를 슬라이드에 직접 건다. 논문의 조건 설명만으로는 무엇을 하는 조건인지 확정할 수 없었다는 신호로 읽힌다.

### 실행 환경

| 항목 | 값 |
|---|---|
| 생성문 길이 | 8,000. community summary와 community answer와 local answer와 global answer 모두 동일 |
| 인덱싱 하드웨어 | RAM 16GB, Intel Xeon Platinum 8171M CPU @ 2.60GHz, 클라우드 활용 |
| 인덱싱 시간 | chunk size 600 토큰 기준 281분 |
| LLM | GPT-4-turbo |
| 속도 제한 | 분당 200만 토큰(TPM), 분당 요청 1만 건(RPM) |

인덱싱에 281분이 걸린다는 수치는 GraphRAG의 도입 비용을 가늠하는 기준이 된다. 100만 토큰 규모 corpus 하나를 한 번 인덱싱하는 데 다섯 시간 가까이 든다는 뜻이다.

## 결과

### knowledge graph 규모

| 데이터셋 | 노드 수 | relationship 수 |
|---|---|---|
| Podcast | 8,564 | 20,691 |
| News | 15,754 | 19,520 |

News가 토큰 수로는 Podcast의 1.7배인데도 relationship 수는 오히려 적다. 노드는 1.8배로 늘어난 반면 관계는 늘지 않았으므로, 뉴스 기사 쪽이 등장 인물과 조직은 많지만 그들 사이의 연결은 성글다고 볼 수 있다. 자료는 이와 함께 condition별 community summary의 개수와 길이, 그리고 전체 corpus 길이 대비 비율을 뜻하는 % Max를 표로 제시한다.

### 실험 1

승률표는 행에서 열로 향하는 승률로 읽는다. 자료는 `SS → TS = 17%`이면 `TS → SS = 83%`라는 읽기 예시를 결과 슬라이드 세 장에 반복해서 붙여 두었다.

| 비교 | 결과 |
|---|---|
| global 방식 대 일반 RAG, comprehensiveness와 diversity | GraphRAG가 월등히 우수하다 |
| global 방식 대 일반 RAG, directness | 일반 RAG가 근소하게 우세하다 |
| empowerment | 특별히 우수한 조건이 없다. C0가 근소하게 약세이고 SS와 TS가 평균적으로 근소하게 우세하다 |
| community summary 대 source text, comprehensiveness와 diversity | community summary 쪽이 더 좋으며 유의 검정을 통과했다. C0만 예외다 |

directness에서 일반 RAG가 앞서는 것은 예상된 결과다. 앞서 본 대로 directness는 나머지 두 기준과 trade-off 관계이므로, 자세하고 다양한 답을 내는 쪽이 간결함에서 손해를 보는 구조다.

empowerment 결과에는 발표자의 해석이 붙는다. 예시와 인용문 같은 직접적인 정보가 주어졌을 때 판단의 근거로 활용할 수 있으므로, 문서를 직접 활용하는 SS와 TS가 유리하다는 것이다. 요약을 거치면 원문의 인용 가능한 표현이 사라져 독자가 스스로 판단할 재료가 줄어든다는 논리다.

가장 눈여겨볼 수치는 C0에 관한 것이다. C0는 DB로 활용되는 토큰 수가 전체의 2.6%로 매우 적으면서 성능은 훨씬 높다. root level의 community summary만으로도 corpus 전체를 훑는 질문에 답할 수 있다는 뜻이며, 요약 계층을 쌓는 비용이 질의 시점의 토큰 절감으로 회수된다는 근거가 된다.

### 실험 2

실험 2는 LLM 판정 대신 답변에서 뽑아낸 claim으로 두 기준을 다시 측정한다. Claimify라는 LLM 기반 claim 추출기로 생성 답변에서 claim을 뽑는다.

| 지표 | 정의 |
|---|---|
| comprehensiveness | 답변별로 추출되는 평균 claim 수 |
| diversity | 답변별 claim을 계층적 군집화했을 때 생성되는 평균 군집 수 |
| 텍스트 사이 거리 | `1 - ROUGE-L` |

결과는 다음과 같다.

- claim 개수는 Podcast와 News 두 데이터셋 모두에서 C0부터 C3까지와 TS가 SS보다 크게 많다.
- 클러스터 개수는 Podcast 데이터셋에서 C0부터 C3까지와 TS가 SS보다 크게 많으며, C1부터 C3까지는 특정 distance threshold에서만 유의미한 결과를 보인다.
- 다만 유의 검정 결과 두 데이터셋 모두에서 조건마다의 유의미한 차이는 확인되지 않았다.

조건 사이 차이가 통계적으로 확인되지 않았으므로, 자료는 실험 1과의 결과 일치 여부를 확인하는 쪽으로 방향을 튼다.

| 항목 | comprehensiveness | diversity |
|---|---|---|
| 실험 1에서 승패가 확실히 갈린 경우의 비율 (승 또는 패가 3번 이상) | 33% | 39% |
| 그중 실험 2 결과와 부합한 비율 | 78% | 69%에서 70% |

승패가 확실히 갈린 사례에 한정하면 두 실험이 70% 안팎으로 일치한다. LLM 판정과 claim 기반 자동 측정이 서로 다른 방식인데도 같은 방향을 가리킨다는 근거로 쓰인다. 다만 실험 1의 판정 결과 중 승패가 확실히 갈린 것이 애초에 3분의 1 남짓이라, 일치 여부를 확인한 표본 자체가 전체의 일부라는 점은 함께 읽어야 한다.

발표자는 여기에 한 가지를 지적한다. 인덱싱 과정에서 이미 claim을 뽑아 두었는데, 그 claim을 어떻게 활용하는지에 대해서는 논문에 언급이 없다는 것이다. 실험 2에서 claim을 다시 뽑아 쓰면서도 인덱싱 산출물인 claim은 어디에 쓰이는지 설명되지 않았다는 문제 제기다.

## 발표자 견해

이 자료의 고유 기여는 논문 요약이 아니라 아래 아홉 건이다. 성격에 따라 세 무리로 나뉜다.

### 논문과 코드 사이의 간격

| 슬라이드 | 지적 |
|---|---|
| 27 | 논문이 서술한 질문 생성 순서는 persona가 먼저이고 task가 나중인데, 코드는 task를 먼저 넣어 persona를 산출한다 |
| 30 | TS 조건이 무엇인지 논문 설명만으로 확정할 수 없어 공식 코드 두 곳을 읽어 정의를 재구성했다 |
| 42 | 논문 본문에서 소개하는 내용보다 실제 코드는 더 많은 과정을 거친다. 예로 주요 entity 선택과 DRIFT(Dynamic Reasoning and Inference with Flexible Traversal) 탐색을 들고, 공식 문서의 drift_search 페이지를 링크로 건다 |

세 지적은 같은 곳을 향한다. 논문 한 편으로 GraphRAG를 이해했다고 보면 실제 시스템과 어긋난다는 것이다. 이 자료가 GraphRAG 소개 자료로서 갖는 실용적 가치가 여기에 있다. 논문을 읽고 공식 구현체를 쓰려는 사람에게 어디를 더 확인해야 하는지 세 지점을 알려준다.

### 평가 설계에 대한 비판

| 슬라이드 | 지적 |
|---|---|
| 27 | 사용자 정보를 사전에 어떻게 정의하고 설정했는지에 대한 설명이 논문에 없다 |
| 28 | 평가 기준 네 가지에 대한 근거나 참고 문헌이 별도로 없었다 |
| 28 | 2승 2무 1패를 무승부로 처리하는 규칙은 majority voting이라고 명시되어 있으나 옳은 승패 결정이 아닌 듯하며, 그 경우는 승으로 판별해야 한다 |

세 지적 모두 평가의 재현성을 겨눈다. persona 정의 방식이 없으면 질문 생성을 재현할 수 없고, 기준의 출처가 없으면 그 기준이 타당한지 검토할 수 없으며, 승패 집계 규칙이 어긋나 있으면 승률 수치 자체가 흔들린다.

### 해석과 제언

| 슬라이드 | 내용 |
|---|---|
| 17 | chunk size가 클수록 entity가 줄어드는 원인은 entity가 중복되고 관계들이 요약되기 때문이다 |
| 34 | empowerment에서 SS와 TS가 우세한 원인은 예시와 인용문 같은 직접적인 정보가 판단 근거로 활용될 수 있기 때문이다 |
| 42 | 평가 과정에서 persona와 task에 따라 질문을 생성한 방식은 좋은 아이디어다. 자료에서 유일하게 명시적으로 긍정한 설계 선택이다 |

마지막 슬라이드의 종합 견해는 네 가지로 이어진다.

1. 문서 본문 대비 knowledge graph가 얼마나 효율적으로 전체 문서의 정보를 반영할 수 있을 것인가가 핵심으로 보인다.
2. 이 방법론은 고정된 프롬프트로 knowledge graph를 구축했다. 사용자 목적에 맞게 더 적합하게 구축하는 방법이 GraphRAG의 성능을 좌우할 것으로 보인다.
3. community summary를 이용하면 연구 취지대로 global한 정보는 잘 반영하겠지만, 어찌 되었든 요약된 정보이므로 본문의 아주 상세한 정보는 손실이 불가피하다.
4. 따라서 임베딩 벡터를 활용하는 hybrid scheme이 필수 불가결이며, community summary를 query와의 임베딩 벡터 유사도 기준으로 취사선택했으면 어땠을지 아쉬움을 남긴다.

3번과 4번은 이어진 하나의 논지다. 요약을 쓰는 한 상세 정보 손실은 피할 수 없으므로, 모든 community summary를 훑는 대신 query와 가까운 것만 골라 쓰는 검색 요소를 되살리자는 제안이다. 후속 연구인 [[database/guo-2025-lightrag-simple-and-fast]]와 [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]이 실제로 이 방향으로 나아갔다.

2번은 도메인 적응에 관한 제안이다. 논문은 entity type과 추출 프롬프트를 고정한 채 실험했는데, 대상 corpus의 성격에 맞춰 이를 조정하는 것이 성능 차이를 만들 것이라는 예측이다.

## 원논문과의 대조

논문 한 편을 43쪽으로 옮긴 자료이므로, 무엇을 살리고 무엇을 덜어냈는지가 자료의 성격을 드러낸다. 아래 대조의 기준은 본 wiki의 [[database/edge-2024-from-local-to-global]] 페이지다.

### 자료가 다르게 설명한 지점

가장 큰 차이는 TS 조건의 정의다. 원논문에서 TS는 graph 없이 원본 text chunk에 map-reduce를 그대로 적용하는 대조군이다. C0부터 C3까지와 TS의 차이가 graph index의 유무 하나뿐이므로, 둘을 비교하면 graph가 기여한 몫만 분리해 볼 수 있다는 것이 이 조건의 설계 의도다.

반면 자료가 설명한 TS에는 query 임베딩과 유사한 entity를 최대 20개 뽑고 그 entity가 포함된 chunk를 고르는 단계가 들어 있다. query에 따라 컨텍스트가 달라지는 절차이므로 원논문 TS의 성질과 다르다. 발표자가 근거로 든 `local_search/mixed_context.py`는 공식 구현체가 검색 모드별로 컨텍스트를 조립하는 자리이며, 논문이 정의한 baseline과는 다른 층에 있다.

자료는 이 설명이 논문 본문이 아니라 코드에서 나왔다는 사실을 링크로 밝히므로 출처를 숨기지는 않는다. 다만 이 발표만 읽고 조건 정의를 파악하려는 독자는 원논문 쪽 정의를 함께 확인하는 편이 안전하다.

두 번째 차이는 질문 생성 절차의 입력이다. 자료는 1단계 입력을 "특정 사용자의 상황"이라고만 적고, 사용자 정보를 사전에 어떻게 정의했는지 설명이 없다고 지적한다. 원논문 쪽 기록에 따르면 persona 생성의 입력은 corpus에 대한 짧은 설명이며, corpus 본문에서 질문을 만들면 답의 위치가 질문에 새어 들어가므로 일부러 설명에서 만든다는 원칙이 붙어 있다. 발표자의 지적은 그 원칙이 아니라, 사용자 상황을 어떤 기준으로 골랐는지가 불명확하다는 좁은 범위로 읽어야 한다.

### 자료가 다루지 않은 원논문 내용

| 원논문의 내용 | 자료에서의 처리 |
|---|---|
| 질문 생성 규모. persona 5개, task 5개, 질문 5개로 데이터셋당 125개 질문 | 세 단계 절차만 옮기고 개수와 총량은 생략 |
| 질문을 corpus 본문이 아니라 corpus 설명에서 만드는 원칙 | 언급 없음 |
| context window 크기 비교. 8,000과 1만 6,000과 3만 2,000과 6만 4,000 토큰을 견주어 가장 작은 8,000 토큰을 채택 | 생성문 길이 8,000이라는 결과 값만 제시 |
| 컨텍스트를 키우면 중간 위치 정보가 잘 활용되지 않는 현상이 채택 근거였다는 설명 | 언급 없음 |
| 토큰 절감 폭. root level 요약이 원본 텍스트 요약 대비 토큰을 9배에서 43배 줄인다 | C0의 토큰 비중이 2.6%라는 한 지점만 제시 |
| helpfulness score가 0인 local answer를 걸러낸다는 세부 | 점수 순 입력만 설명 |
| claim을 graph에 covariate로 붙인다는 위치 설명 | claim 추출 프롬프트와 필드 구성만 제시 |
| News 데이터셋의 출처가 MultiHop-RAG라는 사실 | 기간과 분야만 제시 |

C0의 토큰 비중 2.6%는 원논문의 절감 폭 상단인 43배와 맞물린다. 전체의 40분의 1에 가까운 컨텍스트로 나머지 조건과 겨루어 우위를 지킨다는 같은 사실을 두 자료가 다른 표현으로 적은 셈이다.

생략된 항목들은 대체로 파라미터 선택의 근거에 해당한다. 발표 자료는 파이프라인의 동작과 조건별 승패를 전달하는 데 무게를 두었고, 그 설정값이 왜 그렇게 정해졌는지는 원논문에 남겨 두었다. 발표자가 conclusions에서 "고정된 프롬프트로 knowledge graph를 구축했다"는 점을 문제로 짚은 것과 같은 자리에, 실은 논문 쪽 근거가 일부 존재한다는 점은 두 자료를 함께 읽어야 드러난다.

### 검색 모드에 대한 표기

GraphRAG를 소개하는 2차 자료에는 local search와 global search라는 두 검색 모드를 원논문의 구성인 것처럼 적는 사례가 있다. 이 자료는 그 오해를 만들지 않는다. 본문에서 쓰는 local answer와 global answer는 map-reduce의 단계 이름으로만 등장하고, 검색 모드가 여러 개라는 사실은 conclusions에서 코드 이야기로 따로 꺼내며 DRIFT를 예로 든다. 두 층을 섞지 않은 서술이라 원논문과 공식 구현체의 관계를 파악하는 데 오히려 도움이 된다.

## 한계

### 자료 자체의 한계

paper review 슬라이드이므로 자체 실험과 코드와 벤치마크가 없다. 새로 만든 결과는 0건이며, 인용한 수치의 출처는 전부 원논문이다. 따라서 이 자료로는 원논문의 주장을 검증할 수 없고, 발표자의 견해 역시 실험이 아니라 읽기에서 나온 판단이다.

### 자료가 정리한 원논문의 한계

| 항목 | 내용 |
|---|---|
| 일반화 | 일반화 성능을 구체적으로 확인하려면 더 다양한 도메인의 corpus를 대상으로 실험할 필요가 있다 |
| 평가 기준 | fabrication rate, 곧 환각률이나 허위정보 생성률 같은 기준을 평가에 포함할 수 있다 |

같은 슬라이드가 제시한 향후 방향은 두 가지다. 하나는 hybrid RAG scheme으로, GraphRAG가 순전히 텍스트 기반으로 진행되므로 기존 RAG처럼 community summary 등을 임베딩해 벡터 비교로 정보를 탐색하는 방안을 적용할 수 있다는 것이다. 다른 하나는 global 방식을 통해 일부가 전체를 대표하는 상황을 면하는 것이다.

### 자료의 내적 문제

raw PDF를 대조하는 과정에서 자료 자체의 표기 문제 다섯 건을 확인했다. 삭제하지 않고 기록해 둔다.

| 위치 | 문제 |
|---|---|
| 슬라이드 40 | 제목이 "Python Packages"인데 나열된 항목 네 개는 GitHub 저장소와 공식 API 문서와 위키독스 책과 Neo4j textbook으로, Python 패키지가 하나도 없다 |
| 슬라이드 30과 33에서 35 | SS라는 조건 약어가 조건 정의 슬라이드에는 나오지 않고 결과 슬라이드의 승률표 설명에서 처음 등장한다. 조건 정의 쪽에서는 같은 조건을 "일반적인 RAG"라고만 부른다 |
| 슬라이드 8 | KBQA 서베이의 출처를 "Lan et al., JCAI2021"로 적었다. 학회 약어에서 앞 글자가 빠졌다 |
| 슬라이드 14 | "인공지는 기술"이라고 적었다. 문맥상 인공지능이다 |
| 슬라이드 24와 25 | 글머리 본문이 완전히 동일하고 오른쪽 도식만 다르다 |

frontmatter의 `url` 값도 같은 성격의 문제다. 자료가 Materials 장에서 소개한 GraphRAG 공식 저장소 주소일 뿐, 발표 자료 자체의 출처 주소가 아니다. raw PDF에는 발표 자료가 공개된 주소도 발표자 이메일도 들어 있지 않다.

## 참고 자료

자료가 각 슬라이드 하단에 밝힌 출처는 다음과 같다.

| 주제 | 인용 자료 | 슬라이드 |
|---|---|---|
| RAG 도식과 발전 단계 | Retrieval-Augmented Generation for Large Language Models: A Survey (2024) | 4, 5, 6 |
| KBQA 배경 | A Survey on Complex Knowledge Base Question Answering: Methods, Challenges and Solutions (Lan et al., 2021) | 8 |
| LLM과 knowledge graph의 결합 | Knowledge-Augmented Language Model Prompting for Zero-Shot KGQA (2023), Enhancing Knowledge Graph Construction Using Large Language Models (2023), Knowledge Graph Prompting for Multi-Document Question Answering (Wang et al., 2023), LLM-based Knowledge Graph Traversal Agent (Wang et al., 2023) | 9 |
| community detection | Community detection in graphs (Fortunato, 2009), Fast unfolding of communities in large networks (Blondel et al., 2008), From Louvain to Leiden (Traag et al., 2019) | 10에서 12 |
| sensemaking | Making Sense of Sensemaking 1: Alternative Perspectives (Klein et al., 2006), Wikipedia의 Sensemaking 항목 | 13 |
| claim 추출 방법론 | AFaCTA (Ni et al., 2024), Towards effective extraction and evaluation of factual claims (Metropolitansky and Larson, 2025) | 36 |
| 국내 세미나 배경 자료 | 고려대학교 DSBA 연구실 졸업생 노건호의 논문 세미나 자료, 김선우의 PYSR 영상 | 7, 8, 10 |

Materials 장이 학습용으로 제시한 링크는 네 개다. Microsoft 공식 깃허브(`github.com/microsoft/graphrag`), Microsoft 공식 API 문서(`microsoft.github.io/graphrag`), Neo4j 기반 GraphRAG 위키독스(`wikidocs.net/book/16760`), Neo4j가 제공하는 무료 textbook(`neo4j.com/essential-graphrag`)이다. 뒤 두 개는 한국어 학습자와 무료 자료를 찾는 독자를 겨냥한 선택으로, 원논문에는 없는 자료다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| global sensemaking | corpus의 전반적인 내용을 바탕으로 진행되는 sensemaking. 문서 몇 개를 찾아서는 답할 수 없고 corpus 전체의 윤곽이 필요한 질문이 여기에 해당한다 |
| modularity | community 안 연결이 많고 밖 연결이 적을수록 높아지는 값. 이를 어떻게 정의하고 최적화하느냐가 곧 community detection 방법론의 차이다 |
| refinement | Leiden이 Louvain에 추가한 중간 단계. community 안 노드를 개별 community로 간주해 잘 연결된 것끼리 다시 묶고 연결되지 않은 노드는 홀로 남겨 disconnected community 문제를 해소한다 |
| text source (TS) | community 요약문 대신 실제 문서 chunk를 요약 자리에 넣는 비교 조건. 발표자가 공식 코드 두 곳을 읽어 재구성한 정의다 |
| Claimify | 생성된 답변에서 claim을 뽑아내는 LLM 기반 추출기. 실험 2의 두 지표 계산에 쓰인다 |
| DRIFT | Dynamic Reasoning and Inference with Flexible Traversal의 약어. 논문 본문에는 없고 공식 코드에만 있는 추가 탐색 절차로, 발표자가 논문과 실제 시스템 사이의 간격을 보여주기 위해 든 사례다 |

## 관련 페이지

- [[database/edge-2024-from-local-to-global]]: 이 review의 대상 논문. 인덱싱 파이프라인, 평가 설계, 결과 수치의 상세는 그 페이지가 담당한다. 이 페이지는 그 논문을 읽은 한 사람의 해석과 이견을 담는다.
- [[database/dsba-2026-paper-review-graph-based-rag]]: 같은 발표자가 2026년 5월 2일에 한 후속 세미나로 LightRAG와 LeanRAG를 다룬다. 그 자료가 사전 자료로 언급하는 "발표자의 이전 GraphRAG 세미나"가 이 발표에 해당한다.
- [[database/guo-2025-lightrag-simple-and-fast]]: 발표자가 제언한 hybrid scheme, 곧 knowledge graph에 임베딩 검색을 결합하는 방향의 실현 사례다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: 계층 구조 knowledge graph로 요약 단계의 상세 정보 손실을 줄이려 한 후속 연구다.
- [[overviews/lightrag-family-graph-rag-overview]]: graph 기반 RAG 계열을 묶은 합성 페이지. 이 자료의 발표자 견해 아홉 건은 그 페이지가 정리한 미해결 문제와 나란히 놓고 읽을 수 있다.
