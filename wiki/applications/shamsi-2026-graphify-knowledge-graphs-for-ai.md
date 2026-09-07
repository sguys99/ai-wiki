---
title: "Graphify: Knowledge Graphs for AI Coding Assistants"
type: article
year: 2026
category: applications
raw_path: raw/articles/shamsi-2026-graphify-knowledge-graphs-for-ai.md
raw_filename: "shamsi-2026-graphify-knowledge-graphs-for-ai.md"
source: shamsi-2026-graphify-knowledge-graphs-for-ai.md
source_collection: external
author: "Safi Shamsi"
url: "https://graphify.net/kr/"
publisher: "Graphify (graphify.net)"
tags: [knowledge-graph, code-intelligence, ai-coding-assistant, tree-sitter, networkx, leiden, mcp, claude-code, rag-alternative, multi-modal]
---

## 요약

Graphify는 저장소 하나를 통째로 지식 그래프로 바꿔 AI 코딩 어시스턴트에게 넘기는 MIT 라이선스 오픈소스 스킬이다. 소스 코드뿐 아니라 문서, 연구 논문, 다이어그램까지 같은 그래프에 담아, 코드가 무엇을 하는지와 왜 그렇게 설계됐는지를 함께 설명하는 것을 목표로 삼는다.

동작 방식의 특징은 임베딩을 쓰지 않는다는 점이다. Tree-sitter가 코드에서 구조를 뽑고, LLM이 산문에서 개념을 뽑고, 비전 모델이 다이어그램을 읽어 노드와 엣지를 만든 뒤, Leiden 알고리즘이 그래프 연결 구조만 보고 의미 단위를 나눈다. vector store도 임베딩 모델도 파이프라인에 들어가지 않는다.

이 페이지가 다루는 자료는 제품 공식 랜딩 페이지다. 따라서 여기 실린 수치와 효과 서술은 제작자 측 주장이며 제3자 검증을 거친 값이 아니다. 아래 본문은 배포물에서 확인할 수 있는 사실과 페이지가 스스로 제시한 주장을 구분해 적었다. 같은 프로젝트를 다른 각도에서 다룬 자료로 저장소 페이지 [[applications/safishamsi-graphify]]와 한국어 심층 해설 영상 [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]가 본 wiki에 있다.

## 배경

첫 번째 배경은 AI 코딩 어시스턴트가 큰 저장소를 이해할 때 치르는 비용이다. 어시스턴트에게 저장소 전체를 그대로 컨텍스트로 넘기면 질문 하나마다 막대한 토큰이 든다. 페이지가 든 예시에서는 약 52개 파일, 약 9만 2천 단어짜리 코퍼스 하나에 대해 이 naive 방식이 쿼리당 약 12만 3천 토큰을 소모한다.

두 번째 배경은 설계 의도가 어디에 적혀 있는지의 문제다. 페이지는 코드를 읽는 것만으로는 설계 의도를 알 수 없다는 관점을 취한다. 어떤 클래스가 왜 그 자리에 있는지, 어떤 구조가 어느 논문에서 왔는지는 소스 파일이 아니라 문서와 논문, 다이어그램에 흩어져 있기 때문이다. 그래서 Graphify는 코드와 산문과 이미지를 한 그래프에 모으는 설계를 택했다.

세 번째 배경은 배포 형태다. Graphify는 서비스나 별도 애플리케이션이 아니라 어시스턴트가 호출하는 스킬로 배포된다. 자체 모델을 포함하지 않고 사용자의 어시스턴트가 이미 설정해 둔 API 키를 그대로 쓰기 때문에, 도입 비용이 패키지 설치 한 번으로 줄어든다. 사용자가 새 계정이나 새 키를 만들 필요가 없다는 뜻이기도 하다.

네 번째 배경은 벡터 retrieval에 대한 입장이다. 페이지가 링크한 심화 가이드 제목이 이를 직접 드러낸다. "Why structural graphs beat vector RAG for code understanding"이라는 제목으로, 코드 이해에서는 구조적 그래프가 벡터 기반 RAG보다 낫다는 주장을 담고 있다. 실제로 파이프라인 전체에 임베딩과 vector store가 등장하지 않으며, 군집화도 그래프 토폴로지만으로 수행한다.

## 핵심 개념

**지식 그래프(knowledge graph)** 는 개체를 노드로, 개체 사이의 관계를 엣지로 표현한 구조다. Graphify에서 노드는 클래스나 함수 같은 코드 요소일 수도 있고 문서에서 뽑은 개념일 수도 있으며, 엣지는 호출 관계나 의미적 연관을 나타낸다. 최종 산출물인 `graph.json`이 이 그래프를 영속 형태로 담는다.

**AST(abstract syntax tree)** 는 소스 코드를 문법 구조에 따라 나무 모양으로 표현한 것이다. Graphify는 Tree-sitter 파서로 AST를 만들고 여기서 call graph와 docstring을 함께 뽑는다. 이 단계는 전적으로 로컬에서 수행되며 LLM을 호출하지 않는다.

**community detection**은 그래프에서 서로 촘촘히 연결된 노드 무리를 찾아내는 작업이다. Graphify는 Leiden 알고리즘을 써서 이 무리를 만들고, 각 무리를 의미 단위로 취급한다. 임베딩을 쓰지 않고 연결 구조만 보기 때문에 벡터 검색 인프라가 필요 없다.

**god node**는 그래프에서 degree, 즉 연결 개수가 가장 높은 노드를 가리킨다. 시스템의 중심에 자리해 다른 요소들이 모여드는 지점이라는 뜻으로 쓴다. 코드베이스를 처음 여는 사람에게는 어디부터 읽어야 하는지를 알려주는 표지가 된다.

**surprise edge**는 예상 밖의 연결을 뜻한다. 페이지는 파일 경계를 넘거나 도메인 경계를 넘는 연결 중 검토할 가치가 있는 것을 이렇게 부른다. 다만 무엇을 예상 밖으로 판정하는지에 대한 기준은 페이지에 나오지 않는다.

**BFS subgraph query**는 특정 노드에서 폭 우선 탐색으로 인접한 부분 그래프만 가져오는 질의 방식이다. 저장소 전체를 컨텍스트에 넣는 대신 질문과 관련된 이웃만 넘기기 때문에, 페이지가 주장하는 토큰 절감이 여기서 나온다.

**semantic descriptions**는 외부 모델로 나가는 유일한 데이터다. 문서와 다이어그램의 의미를 기술한 내용이며, 원본 소스 파일 자체는 전송하지 않는다는 것이 페이지의 프라이버시 설계 핵심이다.

**skill manifest**는 `skill-*.md` 형식의 파일로, AI 코딩 어시스턴트가 Graphify를 호출 가능한 스킬로 인식하게 해준다. Claude Code, OpenAI Codex, OpenCode용이 패키지에 기본 포함돼 있다. 이 manifest가 있기 때문에 사용자는 명령 사용법을 어시스턴트에게 따로 알려줄 필요가 없다.

## 방법

### 파이프라인 7단계

Graphify는 다단계 파이프라인이다. 각 단계가 격리된 모듈로 분리돼 있어 기여자가 원하는 단계만 독립적으로 확장할 수 있다고 페이지는 밝힌다.

| 순서 | 단계 | 원문 설명 | 역할 |
|---|---|---|---|
| 1 | detect | collect files | 그래프에 넣을 대상 파일을 모은다 |
| 2 | extract | AST + LLM nodes/edges | Tree-sitter AST와 LLM 의미 추출로 노드와 엣지를 생성한다 |
| 3 | build | NetworkX graph | 추출 결과를 하나의 NetworkX 그래프로 병합한다 |
| 4 | cluster | Leiden communities | Leiden 알고리즘으로 의미 커뮤니티를 나눈다 |
| 5 | analyze | god nodes & surprises | 최고 degree 노드와 예상 밖 엣지를 찾는다 |
| 6 | report | GRAPH_REPORT.md | 사람이 읽는 감사 리포트를 작성한다 |
| 7 | export | HTML / JSON / Obsidian | 시각화와 질의 가능한 산출물을 내보낸다 |

앞의 세 단계가 자료를 구조로 바꾸는 구간이고, cluster와 analyze가 구조에서 의미를 뽑는 구간이며, report와 export가 결과를 사람과 도구 양쪽에 넘기는 구간이다. Obsidian 내보내기가 export 단계에 들어 있다는 점은 이 저장소처럼 Markdown vault로 지식을 관리하는 환경과 직접 이어진다.

### 여섯 가지 핵심 능력

페이지는 정적 분석, 의미 추출, 그래프 군집화를 한 스킬로 통합했다고 소개하면서 능력을 여섯 항목으로 나눈다.

| 능력 | 내용 |
|---|---|
| Multi-Modal Extraction | 코드, Markdown, PDF, 이미지를 파싱한다. Tree-sitter가 AST와 call graph와 docstring을, LLM이 산문 개념을, 비전 모델이 다이어그램을 담당한다 |
| Knowledge Graph Build | 노드와 엣지를 NetworkX 그래프로 병합하고 Leiden 알고리즘으로 의미 커뮤니티를 탐지한다. 벡터 임베딩은 필요 없다 |
| God Nodes & Surprises | 시스템 중심의 최고 degree 노드를 식별하고, 검토 가치가 있는 cross-file 또는 cross-domain 연결을 표시한다 |
| Interactive Outputs | 인터랙티브 `graph.html`, 질의 가능한 `graph.json`, 사람이 읽는 `GRAPH_REPORT.md`를 내보낸다 |
| Assistant Integration | `/graphify`, `/graphify query`, `/graphify path`, `/graphify explain` 명령을 어시스턴트에 제공한다 |
| Secure by Design | URL 스킴 제한, 크기와 타임아웃 제한, 경로 containment 검사, 노드 라벨 HTML escape로 입력을 검증한다 |

### 멀티모달 입력

Graphify가 한 그래프에 담는 자료는 네 종류다. 코드와 문서, 논문과 이미지를 나눠 처리한 뒤 결과를 합치는 구조다.

| 입력 | 예시 형식 | 처리 방식 |
|---|---|---|
| 코드 | `.py`, `.js`, `.go`, `.java` 등 | Tree-sitter가 로컬에서 파싱해 AST, call graph, docstring을 추출한다 |
| 문서 | Markdown | LLM이 산문에서 개념을 추출한다 |
| 논문 | PDF | LLM이 산문에서 개념을 추출한다 |
| 다이어그램 | 이미지 | 비전 모델이 도식을 읽는다 |

코드 처리 경로만 LLM을 거치지 않는다. 심화 가이드 항목은 Tree-sitter가 19개 언어를 로컬에서 파싱하며 소스에는 LLM 호출이 없다고 밝힌다. 소스 코드를 외부로 보내지 않는다는 설계 원칙이 이 지점에서 구현된다.

### 지원 모듈

파이프라인 7단계를 둘러싼 보조 모듈은 다섯 개다.

| 모듈 | 역할 |
|---|---|
| `ingest.py` | URL fetching |
| `cache.py` | semantic caching, 즉 증분 캐시 |
| `security.py` | input validation |
| `watch.py` | live updates, 파일 변경 감시 |
| `serve.py` | MCP 프로토콜 서비스 |

`cache.py`와 `watch.py`가 함께 있다는 점에서 이 도구가 일회성 분석이 아니라 개발 중 계속 갱신되는 사용을 상정했음을 알 수 있다. 산출물 폴더에 `cache/`가 별도로 남는 것도 같은 맥락이다.

### 설치와 실행

패키지는 PyPI로 배포하며 Python 3.10 이상을 요구한다. 패키지명은 `graphifyy`로 y가 하나 더 붙지만 설치 후 실행하는 CLI 명령은 `graphify`다.

```bash
# Requires Python 3.10+
pip install graphifyy && graphify install

# Build a knowledge graph for any project folder
/graphify ./raw
```

실행 결과는 `graphify-out/` 아래에 네 가지로 남는다.

| 산출물 | 내용 |
|---|---|
| `graph.html` | 인터랙티브 시각화 |
| `GRAPH_REPORT.md` | 핵심 노드, surprise, 추천 질문을 담은 감사 리포트 |
| `graph.json` | 영속적이고 질의 가능한 그래프 |
| `cache/` | 증분 캐시 |

### 어시스턴트 통합

Graphify는 어시스턴트가 호출하는 스킬 형태로 배포된다. Claude Code, OpenAI Codex, OpenCode에는 전용 `skill-*.md` manifest가 기본 포함돼 있어 별도 설정 없이 슬래시 명령이 동작한다. 페이지는 그 밖의 어시스턴트도 셸 명령을 실행할 수 있으면 `graphify`를 호출할 수 있다고 밝힌다.

| 명령 | 용도 |
|---|---|
| `/graphify` | 대상 폴더의 그래프를 만든다 |
| `/graphify query` | 그래프에 질의한다 |
| `/graphify path` | 노드 사이의 경로를 찾는다 |
| `/graphify explain` | 대상을 설명한다 |

네 명령의 역할 분담을 보면 Graphify가 상정한 사용 흐름이 드러난다. `/graphify`가 그래프를 한 번 만들어 두면, 이후에는 `query`로 찾고 `path`로 두 요소 사이의 연결을 추적하며 `explain`으로 설명을 받는 방식이다. 그래프 구축과 활용이 분리돼 있어 한 번 만든 결과를 여러 질문에 재사용한다.

다만 페이지는 각 명령의 인자나 출력 형식을 설명하지 않고 목록만 제시한다. 세부는 심화 가이드 `graphify-cli-commands.html`에 있다.

### 외부 모델과의 경계

Graphify는 자체 LLM을 번들링하지 않는다. AI 코딩 어시스턴트가 이미 설정해 둔 모델 API 키를 그대로 사용하며, 외부로 나가는 호출은 의미 추출 단계 하나뿐이다. 이때 전송하는 것은 문서와 다이어그램의 의미 기술이고 원본 소스 파일은 보내지 않는다.

보안 조치는 입력 검증에 집중돼 있다. 페이지가 열거한 네 가지와 각각이 겨냥한 위협은 다음과 같다.

| 조치 | 겨냥한 위협 |
|---|---|
| http와 https 스킴만 허용 | SSRF |
| 다운로드 크기와 타임아웃 제한 | 자원 고갈 |
| 출력 경로 containment 검사 | 경로 탈출 |
| 노드 라벨 HTML escape | XSS |

페이지는 이 조치들이 SSRF, Cypher 인젝션, XSS를 막는다고 서술한다. telemetry는 수집하지 않는다고 명시하며, 보안 정책 문서는 저장소 `v3` 브랜치의 `SECURITY.md`에 둔다.

Cypher 인젝션을 방어 대상으로 든 점은 눈여겨볼 만하다. Cypher는 Neo4j 계열 그래프 데이터베이스의 질의 언어인데, Graphify 자신은 NetworkX 인메모리 그래프를 쓴다. 그래프 산출물이 외부 그래프 데이터베이스로 옮겨 갈 수 있는 사용을 염두에 둔 서술로 읽히지만, 페이지가 그 경로를 직접 설명하지는 않는다.

## 결과

### 헤드라인 지표

페이지 상단이 내건 지표는 네 가지다.

| 지표 | 값 |
|---|---|
| GitHub star | 3,700개 이상 |
| 라이선스 | MIT |
| 토큰 감축 | 71.5배 |
| 런타임 | Python 3.10 이상 |

이 가운데 라이선스와 런타임은 배포물에서 확인 가능한 사실이고, star 수는 수집 시점의 표기이며, 토큰 감축은 아래 워크드 예제에서 나온 자체 측정치다.

### 워크드 예제

저장소에는 재현 가능한 코퍼스 두 개가 포함돼 있다고 페이지는 밝힌다. 하나는 작은 라이브러리, 하나는 코드와 논문이 섞인 대형 컬렉션이다.

| 코퍼스 | 입력 규모 | 그래프 규모 | 쿼리당 토큰 비용 | 절감률 |
|---|---|---|---|---|
| httpx | Python 6개 파일 (HTTP transport layer 모델링) | 노드 144개, 엣지 330개, 커뮤니티 6개 | 페이지 미공개 | 페이지 미공개 |
| Karpathy mixed | 저장소 3개, 논문 5편, 다이어그램 4개 (약 52개 파일, 약 9만 2천 단어) | 노드 285개, 엣지 340개, 커뮤니티 53개 | 약 1,700 (naive 약 12만 3천) | 71.5배 |
| 대규모 코퍼스 | 약 50만 단어 | 페이지 미공개 | 약 2,000 (naive 약 67만) | 페이지가 비율을 제시하지 않음 |

httpx 예제는 수치보다 분석 결과를 보여주는 쪽에 목적이 있다. 6개 파일에서 뽑힌 god node는 `Client`, `AsyncClient`, `Response`, `Request` 네 개로, HTTP 클라이언트 라이브러리의 중심이 어디인지를 그대로 짚는다. surprise edge로는 `DigestAuth → Response` 하나가 보고됐다. 인증 처리 코드와 응답 객체가 직접 연결돼 있다는 뜻이며, 페이지는 이런 연결을 검토 대상으로 올린다.

Karpathy mixed corpus는 멀티모달 입력을 보여주는 예제다. GPT 프레임워크 저장소 3개와 attention 논문 5편, 다이어그램 4개를 한 그래프에 넣어 커뮤니티 53개가 나왔다. 파일 수가 약 52개인데 커뮤니티가 53개라는 것은 군집이 파일 단위보다 잘게 나뉘었다는 뜻이다.

대규모 코퍼스 항목은 규모가 커져도 압축이 유지되는지를 확인하는 용도다. 약 50만 단어에서도 BFS subgraph 쿼리가 약 2,000 토큰 수준에 머물렀다고 보고한다. 코퍼스가 약 5배 커졌는데 쿼리 비용은 약 1,700 토큰에서 약 2,000 토큰으로만 늘었다는 계산이 나온다. 다만 페이지는 이 경우의 감축 배수를 숫자로 제시하지 않았고, 그래프 규모도 공개하지 않았다.

두 예제를 나란히 둔 구성에도 의도가 읽힌다. httpx는 결과를 사람이 눈으로 검증할 수 있을 만큼 작아서 god node와 surprise edge가 타당한지 확인하는 용도이고, Karpathy 코퍼스는 코드와 논문과 이미지를 한꺼번에 넣었을 때도 파이프라인이 동작하는지 보이는 용도다. 정확성 확인과 규모 확인을 각각 하나씩 맡긴 셈이다.

확장성에 대해 페이지는 Tree-sitter 파싱과 NetworkX 그래프 구성이 코드 규모에 선형으로 비례한다고 FAQ에서 설명한다. 이 선형성 주장에는 측정 데이터가 붙어 있지 않다. 선형이라는 서술은 그래프를 만드는 비용에 대한 것이고, 앞의 토큰 절감 수치는 만들어진 그래프에 질의하는 비용에 대한 것이라 서로 다른 단계를 가리킨다는 점도 함께 읽어야 한다.

### 사실과 주장의 구분

이 자료가 제품 랜딩 페이지이므로 독자가 두 층을 나눠 읽을 필요가 있다. 배포물이나 라이선스 파일로 확인할 수 있는 항목과, 제작자가 자기 측정으로 제시한 항목이 한 페이지에 섞여 있다.

| 구분 | 해당 항목 |
|---|---|
| 배포물에서 확인 가능 | MIT 라이선스, 의존성 라이선스, Python 3.10 이상 요구, 패키지명 `graphifyy`, CLI 명령 목록, 파이프라인 단계 이름, 모듈 파일명, 산출물 파일명 |
| 제작자 측 측정과 서술 | 71.5배 토큰 감축, 대규모 코퍼스의 약 2,000 토큰 유지, 선형 확장성, 보안 조치의 방어 효과, 소스 코드 미전송, telemetry 미수집 |
| 시점 의존 표기 | GitHub star 3,700개 이상 (2026-06-08 수집 시점 기준) |

가운데 행에 놓인 항목들이 이 자료를 인용할 때 주의해야 할 부분이다. 토큰 절감 배수는 코퍼스 구성과 질의 내용에 따라 달라지는 값인데 페이지는 두 조건을 모두 고정해 보고하지 않았다. 다른 코드베이스에서 같은 배수를 기대할 근거는 이 자료에 없다.

### 인접 프로젝트 비교

페이지는 코드 인텔리전스 영역의 인접 프로젝트 세 개와 자신을 비교한다. 제품 측이 만든 표이므로 중립적 평가가 아니라 자기 위치를 설명하는 자료로 읽어야 한다.

| 프로젝트 | 초점 | 강점 | Graphify 대비 한계 (페이지 서술) |
|---|---|---|---|
| Sourcegraph | cross-repo 코드 검색 | 엔터프라이즈급 내비게이션 | knowledge graph가 아니며 설계 의미를 제한적으로만 다룬다 |
| Code2Vec | 함수 단위 임베딩 | 벡터 retrieval과 분류 | 그래프 구조가 없고 멀티모달 입력을 받지 못한다 |
| Neo4j | 범용 그래프 데이터베이스 | 강력한 Cypher 쿼리 | 코드로부터 그래프를 스스로 생성하지 않는다 |

세 항목이 겨냥하는 대비점은 서로 다르다. Sourcegraph에는 검색과 그래프의 차이를, Code2Vec에는 벡터와 그래프의 차이를, Neo4j에는 그래프 저장소와 그래프 생성기의 차이를 대비시킨다. Graphify가 자신을 "코드에서 그래프를 만들어내는 도구"로 규정하고 있음을 이 배치가 보여준다.

## 한계

페이지가 스스로 밝힌 한계는 없다. 비교 표에서 인접 도구의 약점을 부각하는 구성을 택했고, 자기 제약을 다루는 절은 두지 않았다. 아래는 페이지 서술에서 독자가 추론할 수 있는 제약이며 페이지가 직접 명기한 내용이 아니다.

| 한계 | 내용 |
|---|---|
| 자료 성격 | 제품 랜딩 페이지라 성능 수치의 측정 조건과 재현 절차가 공개되지 않았다. 재현 가능한 코퍼스가 저장소에 있다고는 밝히지만 측정 스크립트나 원자료는 페이지에 없다 |
| 정량 검증치 부재 | god node와 surprise edge는 사례로만 제시되고 precision이나 recall 같은 지표가 없다. surprise 판정 기준도 설명하지 않는다 |
| 외부 모델 의존 | AST 추출은 LLM을 호출하지 않지만 산문 개념 추출과 다이어그램 판독은 외부 모델 API 키가 필요하다. 토큰 비용과 지연시간은 사용자가 부담한다 |
| 언어 지원 범위 | 심화 가이드가 밝힌 지원 언어는 19개다. 범위를 넓히는 방법이나 미지원 언어의 대체 경로는 설명하지 않는다 |
| 유지보수 인력 | 표기된 유지보수자는 Safi Shamsi 한 명이다. 기여자가 단계별로 확장할 수 있다는 설계 의도는 밝히지만 실제 기여자 규모는 알 수 없다 |

향후 계획으로 페이지가 약속한 항목도 없다. 대신 하단의 "Learn more" 영역에서 심화 가이드 6편을 링크해 세부 설명을 위임한다.

### 심화 가이드 6편

랜딩 페이지가 목록으로만 제시한 항목들의 실제 근거는 아래 하위 문서에 있다. 본 wiki는 아직 이들을 별도 자료로 수집하지 않았으므로, 파싱 방식이나 군집화 상세를 확인하려면 추가 수집이 필요하다.

| 가이드 | 페이지가 밝힌 주제 | 파일 |
|---|---|---|
| Knowledge Graphs for AI Coding Assistants | 구조적 그래프가 벡터 RAG보다 코드 이해에 나은 이유 | `knowledge-graph-for-ai-coding-assistants.html` |
| Tree-sitter AST Extraction | 소스에 LLM을 호출하지 않고 19개 언어를 로컬 파싱하는 방법 | `tree-sitter-ast-extraction.html` |
| Leiden Community Detection | 임베딩과 vector store 없이 그래프 토폴로지만으로 군집화 | `leiden-community-detection.html` |
| Claude Code Integration | CLAUDE.md 지시문과 PreToolUse 훅 설정 절차 | `graphify-claude-code-integration.html` |
| CLI Command Reference | `/graphify`와 `graphify` 명령 전체 목록 | `graphify-cli-commands.html` |
| Graphify vs Alternatives | Sourcegraph, Code2Vec, Neo4j와의 비교 | `graphify-vs-alternatives.html` |

여섯 편 가운데 세 편이 벡터 RAG와의 대비를 다룬다. 이 배치 자체가 제품이 자신을 벡터 검색의 대안으로 규정하고 있음을 보여준다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Tree-sitter | Graphify가 코드에서 AST, call graph, docstring을 뽑는 데 쓰는 파서. 19개 언어를 로컬에서 처리하며 이 단계에서는 LLM을 호출하지 않는다 |
| Leiden algorithm | 그래프에 적용하는 커뮤니티 탐지 알고리즘. 임베딩이나 vector store 없이 그래프 토폴로지만으로 군집을 찾는다 |
| god node | degree가 가장 높은 노드. 페이지는 이를 시스템 중심에 있는 노드로 규정한다 |
| surprise edge | 예상 밖의 cross-file 또는 cross-domain 연결. Graphify가 검토 대상으로 표시한다 |
| BFS subgraph query | 특정 노드에서 폭 우선 탐색으로 인접 부분 그래프만 가져오는 질의 방식. 토큰 절감이 여기서 나온다 |
| semantic descriptions | 외부 모델로 보내는 유일한 데이터. 문서와 다이어그램의 의미 기술이며 원본 소스 파일은 전송하지 않는다 |

## 관련 페이지

- [[applications/safishamsi-graphify]]: 같은 프로젝트의 저장소 페이지. 본 페이지가 제품이 스스로를 규정하는 방식을 다룬다면 저장소 쪽은 구현과 설계를 다룬다
- [[applications/graphify-labs-graphify]]: 같은 프로젝트의 조직 이전판 저장소 페이지
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki]]: Graphify를 한국어로 풀어낸 심층 해설 영상. 랜딩 페이지가 목록으로만 제시한 항목들을 실제 사용 흐름으로 보여준다
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy]]: Karpathy의 LLM Wiki 패턴 튜토리얼. Graphify의 워크드 예제가 Karpathy의 GPT 프레임워크 저장소와 attention 논문을 코퍼스로 삼았다
- [[database/edge-2024-from-local-to-global]]: Microsoft Research의 GraphRAG. 지식 그래프를 만들고 커뮤니티를 탐지해 질의에 답하는 구조가 같고, 대상이 문서 코퍼스라는 점이 다르다
- [[database/guo-2025-lightrag-simple-and-fast]]: 경량 graph-based RAG. 일반 문서를 대상으로 한다
- [[database/kalane-2026-pageindex-threw-out-vector-databases]]: vector 데이터베이스 없이 구조를 이용하는 retrieval 계열. Graphify의 임베딩 미사용 노선과 방향이 같다
- [[database/guo-2025-rag-anything-all-in-one-rag]]: 멀티모달 RAG. Graphify의 멀티모달 입력과 비교 지점이 된다
- [[database/dsba-2026-paper-review-graph-based-rag]]: graph-based RAG 흐름 리뷰. Graphify를 코드 도메인 적용 사례로 놓고 읽을 수 있다

## 출처

- 원문: https://graphify.net/kr/
- GitHub: https://github.com/safishamsi/graphify
- PyPI: https://pypi.org/project/graphifyy/
- 라이선스: MIT
- 유지보수자: Safi Shamsi
- 수집 일자: 2026-06-08
