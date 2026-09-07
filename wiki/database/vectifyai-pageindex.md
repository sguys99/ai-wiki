---
title: "VectifyAI/PageIndex"
type: repo
year: 2025
category: database
raw_path: raw/repos/vectifyai-pageindex.md
raw_filename: "vectifyai-pageindex.md"
source: vectifyai-pageindex.md
source_collection: external
tags: [rag, vectorless-rag, reasoning-based-rag, tree-index, long-document, llm, pdf, agentic-rag, litellm]
org: "VectifyAI"
repo: "PageIndex"
url: "https://github.com/VectifyAI/PageIndex"
license: "MIT"
---

## 요약

PageIndex는 vector DB와 chunking 없이 긴 문서를 목차 형태의 계층 트리로 변환한 뒤, LLM이 그 트리를 탐색해 답에 필요한 절을 직접 고르게 하는 vectorless RAG 프로젝트다. Vectify AI가 만들었고 이 저장소는 그 프로젝트의 공개 코드다.

이름의 vectorless는 임베딩을 만들지 않는다는 뜻이다. 문서를 잘라 벡터로 바꾸고 질의 벡터와 가까운 조각을 고르는 대신, 문서에 이미 들어 있는 절 구조를 JSON 트리로 뽑아 두고 LLM이 그 트리를 읽어 어디를 볼지 판단한다. README는 이 판단 과정을 tree search라 부르고, 바둑 프로그램 AlphaGo에서 영감을 받았다고 밝힌다.

README가 이 저장소에 부여하는 위치는 명확하다. 어떤 사양의 참조 구현이 아니라, Vectify AI가 제시하는 세 가지 배포 방식 가운데 자체 호스팅 경로를 담당하는 코드다. 같은 문서가 이 코드는 standard PDF parsing만 쓴다는 제약을 세 곳에서 반복하고, 더 나은 결과를 원하면 클라우드 서비스를 쓰라고 안내한다. 인용을 요청하는 대상도 저장소가 아니라 팀이 쓴 블로그 글이다.

| 항목 | 값 |
|---|---|
| 저장소 | `VectifyAI/PageIndex` |
| 제작사 | Vectify AI. README 하단 표기는 "© 2026 Vectify AI" |
| 인용 대상 | Mingtian Zhang, Yu Tang and PageIndex Team, "PageIndex: Next-Generation Vectorless, Reasoning-based RAG", PageIndex Blog, Sep 2025 |
| 입력 형식 | PDF와 Markdown |
| 진입점 | `run_pageindex.py`, `examples/agentic_vectorless_rag_demo.py`, 노트북 두 개 |
| 유일한 정량 수치 | FinanceBench 98.7%. PageIndex 자체가 아니라 이를 retrieval 층으로 쓰는 Mafin 2.5의 성적이고 VectifyAI 자체 보고다 |

## 배경

README의 출발점은 vector 기반 RAG가 similarity와 relevance를 같은 것으로 취급한다는 지적이다. vector 검색은 질의 임베딩과 가까운 조각을 고르는데, 가깝다는 것은 표현이 닮았다는 뜻이지 답에 필요하다는 뜻이 아니다. 원문 표현은 "similarity ≠ relevance"와 "what we truly need in retrieval is relevance, and that requires reasoning"이다.

이 간극은 전문 문서에서 특히 커진다. 도메인 지식과 다단계 추론이 필요한 문서에서는 두 방향의 실패가 함께 일어난다. 관련 있지만 표현이 닮지 않은 부분을 놓치고, 표현은 닮았지만 답과 무관한 부분을 가져온다.

README가 드는 또 하나의 동기는 결과의 설명 가능성이다. vector 검색은 어떤 조각이 왜 뽑혔는지를 거리 값으로만 설명할 수 있다. 반면 절 구조를 따라 내려간 경로는 그 자체가 근거가 된다. 어떤 절을 왜 골랐는지가 페이지 번호와 절 제목으로 남아서다. README가 Core Features에 추적 가능성과 설명 가능성을 따로 세운 이유가 여기에 있다.

chunking도 같은 문제의 다른 얼굴이다. 문서를 고정 길이로 자르면 절의 경계와 조각의 경계가 어긋나 문맥이 끊긴다. PageIndex는 자르는 대신 문서가 본래 갖고 있던 절 구분을 그대로 쓴다. 재무 보고서, 규제 신고 서류, 학술 교과서, 법률이나 기술 매뉴얼처럼 목차가 뚜렷하고 분량이 LLM의 context window를 넘는 문서가 대상이다.

## 핵심 개념

**vectorless RAG**는 vector DB와 embedding similarity 검색을 쓰지 않고 LLM의 추론만으로 retrieval을 수행하는 방식을 말한다. retrieval은 외부 지식에서 답에 필요한 부분을 찾아오는 단계인데, 그 판단 주체를 벡터 거리에서 모델로 옮긴 것이 이 방식의 핵심이다.

**tree structure index**는 문서 하나를 목차 모양의 계층 JSON으로 표현한 것이다. 노드마다 제목과 위치 범위와 요약이 붙어 있어, LLM은 본문을 다 읽지 않고도 어느 절에 무엇이 있는지 파악할 수 있다.

**tree search**는 그 트리를 위에서 아래로 내려가며 관련 절을 고르는 탐색 단계다. 사람 전문가가 두꺼운 보고서를 받았을 때 목차를 먼저 보고 후보 절로 이동하는 동작에 대응한다.

human-like retrieval은 이 설계의 비유이자 목표다. 사람 전문가는 300쪽짜리 보고서를 받았을 때 전체를 읽지도, 비슷한 문장을 찾지도 않는다. 목차를 보고 후보 절로 이동한 뒤 필요하면 더 아래로 내려간다. PageIndex가 트리를 만들고 그 위에서 tree search를 수행하는 구성은 이 동작을 그대로 옮긴 것이다.

context-aware retrieval은 같은 문서라도 지금까지의 대화 이력과 사용자가 가진 도메인 지식에 따라 다른 절이 뽑힐 수 있다는 뜻이다. 임베딩을 미리 계산해 두는 방식에서는 질의 벡터 하나로 판단이 끝나지만, 판단을 LLM이 실행 시점에 하면 컨텍스트를 프롬프트에 더하는 것으로 반영이 끝난다. README가 새 컨텍스트를 쉽게 반영한다고 적은 부분이 이 차이를 가리킨다.

README는 이 구성이 vector 검색에 없는 두 가지 성질을 준다고 주장한다. 결과가 페이지와 절 참조에 근거하므로 추적 가능(traceable)하고 해석 가능(explainable)하다는 점, 그리고 대화 이력과 도메인 지식을 포함한 전체 컨텍스트가 판단에 반영된다는 점이다. 근사 검색의 불투명함을 README는 "vibe retrieval"이라 부르며 대비시킨다.

| 특성 | README 설명 |
|---|---|
| No Vector DB | vector similarity 검색 대신 문서 구조와 LLM 추론으로 retrieval한다 |
| No Chunking | 인위적 chunk가 아니라 문서의 자연스러운 절 단위로 조직한다 |
| Better Traceability & Explainability | 페이지와 절 참조에 근거해 결과를 추적하고 해석할 수 있다 |
| Context-Aware Retrieval | 대화 이력과 도메인 지식을 포함한 전체 컨텍스트에 따라 retrieval이 달라진다 |
| Human-like Retrieval | 사람 전문가가 복잡한 문서를 탐색하고 지식을 추출하는 방식을 흉내 낸다 |

## 방법

### 2단계 retrieval

README가 제시하는 절차는 두 단계뿐이다. 첫 단계는 문서에서 목차에 해당하는 tree structure index를 만드는 것이고, 둘째 단계는 그 인덱스를 tree search로 탐색해 추론 기반 retrieval을 수행하는 것이다.

두 단계는 비용 구조가 서로 다르다. 첫 단계는 문서 전체를 훑어야 하므로 분량에 비례하는 작업이지만, 한 번 만들어 둔 트리는 이후 질의마다 다시 쓸 수 있다. 둘째 단계는 트리와 질의만 보고 판단하므로 본문 전체를 모델에 넣지 않아도 된다. README가 LLM의 context 한계를 넘는 문서를 대상으로 지목할 수 있는 근거가 이 분리에 있다.

첫 단계는 문서를 넣을 때 한 번 수행하는 전처리이고, 둘째 단계는 질의가 들어올 때마다 수행하는 실행 단계다. 이 저장소가 공개하는 CLI는 첫 단계를 담당한다. 둘째 단계는 agentic 예제가 보여준다.

### 트리 구조와 노드 스키마

README는 미국 연방준비제도 보고서의 "Financial Stability" 절을 예로 들어 노드 하나의 생김새를 보인다. 필드는 여섯 개다.

| 필드 | 예시 값 | 뜻 |
|---|---|---|
| `title` | `"Financial Stability"` | 절 제목 |
| `node_id` | `"0006"` | 노드 식별자. 예시는 네 자리 문자열이다 |
| `start_index` | `21` | 절이 시작하는 위치 |
| `end_index` | `22` | 절이 끝나는 위치 |
| `summary` | `"The Federal Reserve ..."` | 절 요약 |
| `nodes` | 하위 노드 배열 | 자식 절을 재귀적으로 담는다 |

`nodes` 필드가 재귀이므로 트리의 깊이에 구조적 제한이 없다. README의 예시에서는 상위 노드 하나가 자식 두 개를 갖는다.

| 노드 | 제목 | 위치 범위 |
|---|---|---|
| `0006` | Financial Stability | 21에서 22 |
| `0007` | Monitoring Financial Vulnerabilities | 22에서 28 |
| `0008` | Domestic and International Cooperation and Coordination | 28에서 31 |

각 노드가 위치 범위와 요약을 함께 들고 있다는 점이 retrieval 단계에서 중요하다. 요약은 LLM이 절을 고를 때 읽는 정보이고, 위치 범위는 고른 뒤 본문을 가져올 때 쓰는 주소다. 즉 트리 하나가 색인과 주소록 역할을 겸한다.

README는 이 구조를 목차와 비슷하지만 LLM 사용에 맞게 최적화한 semantic tree structure라고 부른다.

### 자체 호스팅 CLI

Package Usage 절이 세 단계를 제시한다.

| 단계 | 명령 또는 설정 | 비고 |
|---|---|---|
| 1. 의존성 설치 | `pip3 install --upgrade -r requirements.txt` | README는 `requirements.txt`의 내용을 나열하지 않는다 |
| 2. LLM API 키 설정 | 루트에 `.env` 생성 후 `OPENAI_API_KEY=your_openai_key_here` | LiteLLM으로 multi-LLM을 지원한다고 밝힌다 |
| 3. 트리 생성 | `python3 run_pageindex.py --pdf_path /path/to/your/document.pdf` | 출력 파일의 위치와 이름은 README에 없다 |

설치가 PyPI 패키지가 아니라 `requirements.txt` 기반이라는 점은 이 저장소가 라이브러리보다 실행 가능한 예제에 가깝게 배포된다는 뜻이다. 키를 `.env`에 두고 LiteLLM을 거치는 구성 덕분에 모델 교체는 키와 모델 이름을 바꾸는 선에서 끝난다.

Package Usage 절 머리에는 이 패키지가 standard PDF parsing을 쓴다는 주의 문구가 붙는다. 복잡한 PDF에는 MCP와 API로 제공되는 클라우드 서비스가 향상된 OCR과 트리 생성과 retrieval을 제공한다고 이어서 안내한다.

### 선택 인자

접힌 블록이 일곱 개의 선택 인자를 나열한다.

| 인자 | 뜻 | 기본값 |
|---|---|---|
| `--model` | 사용할 LLM 모델 | `gpt-4o-2024-11-20` |
| `--toc-check-pages` | 목차 존재 여부를 확인할 페이지 수 | 20 |
| `--max-pages-per-node` | 노드 하나가 담을 최대 페이지 수 | 10 |
| `--max-tokens-per-node` | 노드 하나가 담을 최대 토큰 수 | 20000 |
| `--if-add-node-id` | 노드 식별자 부여 여부 | yes |
| `--if-add-node-summary` | 노드 요약 생성 여부 | yes |
| `--if-add-doc-description` | 문서 설명 생성 여부 | yes |

인자의 구성만으로도 파이프라인의 윤곽이 읽힌다. `--toc-check-pages`의 기본값이 20이라는 것은 문서 앞쪽 20페이지에서 목차를 먼저 찾아본다는 뜻이다. `--max-pages-per-node`와 `--max-tokens-per-node`는 노드가 지나치게 커지지 않도록 페이지 수와 토큰 수 양쪽으로 상한을 건다. 노드 하나가 20000 토큰을 넘지 않게 유지하면 그 절 전체를 한 번의 LLM 호출에 넣을 수 있다.

`--if-add-node-summary`와 `--if-add-doc-description`이 기본으로 켜져 있다는 점은 요약 생성이 이 파이프라인의 선택 사항이 아니라 기본 동작임을 보여준다. 요약이 없으면 LLM이 트리만 보고 절을 고를 근거가 제목뿐이라서다.

### 입력 형식 두 가지

`--md_path` 플래그를 쓰면 Markdown 파일에서도 트리를 만들 수 있다.

```bash
python3 run_pageindex.py --md_path /path/to/your/document.md
```

두 입력 형식은 트리를 얻는 방식이 다르다.

| 항목 | PDF 모드 | Markdown 모드 |
|---|---|---|
| 플래그 | `--pdf_path` | `--md_path` |
| 계층 판정 | 문서 앞부분에서 목차를 탐색 | `#` 개수로 판정. `##`가 레벨 2, `###`이 레벨 3 |
| 파싱 | standard PDF parsing | Markdown 문법 |
| 권장 입력 | 목차가 있는 긴 문서 | 원래부터 Markdown으로 작성된 문서 |
| 비권장 입력 | README에 언급 없음 | PDF나 HTML에서 변환한 Markdown |

Markdown 모드의 비권장 조건에는 이유가 붙어 있다. 기존 변환 도구 대부분이 원래의 계층 구조를 보존하지 못하기 때문이다. README가 제시하는 대안은 계층 보존을 목표로 만든 자사의 PageIndex OCR로 PDF를 Markdown으로 바꾼 뒤 이 모드를 쓰는 것이다.

### agentic 예제

Updates 절 최상단 항목이 `examples/agentic_vectorless_rag_demo.py`다. 자체 호스팅 PageIndex와 OpenAI Agents SDK를 결합한 완결형 예제로 소개한다. 실행 절차는 두 줄이다.

```bash
pip3 install openai-agents
python3 examples/agentic_vectorless_rag_demo.py
```

`openai-agents`는 선택 의존성으로 표시된다. 즉 트리 생성까지만 쓸 사람은 설치하지 않아도 된다. 예제 내부에서 어떤 도구를 노출하고 어떤 지시문(instruction)을 쓰는지는 README에 나오지 않는다.

이 예제와 별도로 노트북 두 개가 소개된다. `cookbook/pageindex_RAG_simple.ipynb`는 최소 구성의 실습 예제이고, `cookbook/vision_RAG_pageindex.ipynb`는 OCR 없이 페이지 이미지 위에서 바로 동작하는 vision 기반 파이프라인이다. 두 노트북 모두 Colab 실행 링크가 함께 걸려 있다.

### 배포 방식

Deployment Options 절이 세 가지를 구분한다.

| 방식 | 내용 | 접근 경로 |
|---|---|---|
| Self-host | 이 오픈소스 저장소로 로컬 실행. standard PDF parsing 사용 | 저장소 클론 |
| Cloud Service | 향상된 OCR과 트리 생성과 retrieval을 갖춘 production 등급 파이프라인 | 챗 플랫폼, MCP, API |
| Enterprise | VPC나 온프레미스 전용 또는 프라이빗 배포 | 문의 양식, 데모 예약 |

세 방식의 서열은 README 전체에서 일관된다. Package Usage 절과 Tree Structure 절 모두 더 나은 결과를 원하면 자사 API를 쓰라고 안내한다. 이 저장소를 읽을 때는 그 위치를 감안해야 한다. 여기 있는 코드는 방법을 보여주는 경로이고, 제품 품질은 클라우드 쪽에 있다는 것이 README의 서술이다.

## 프로젝트 범위와 문서 경로

### 생태계

Ecosystem 절이 같은 팀의 다른 오픈소스 프로젝트 네 개를 든다.

| 프로젝트 | 설명 |
|---|---|
| OpenKB | 문서를 상호 연결된 wiki로 컴파일하는 LLM 지식 베이스 |
| ChatIndex | 트리 인덱싱과 retrieval을 긴 대화 이력에 적용한다 |
| ConDB | 트리 기반 retrieval을 위한 KV cache 네이티브 컨텍스트 데이터베이스 |
| PageIndex MCP | PageIndex의 MCP 서버 |

네 프로젝트를 늘어놓으면 팀의 관심사가 보인다. 트리 인덱스라는 자료 구조를 문서, 대화 이력, 컨텍스트 캐시로 차례로 옮기고 있다. 즉 PageIndex는 문서 retrieval 도구 하나가 아니라, 같은 자료 구조를 여러 대상에 적용하는 계열의 출발점에 해당한다.

여기에 Updates 절이 발표한 PageIndex File System이 더해진다. 파일 단위 트리 층으로, 문서 한 개가 아니라 corpus 전체를 대상으로 추론하게 해 대규모 문서 검색을 가능하게 한다는 설명이다.

### 최근 업데이트

README의 Updates 절은 네 항목을 최신순으로 나열한다. 프로젝트가 어느 방향으로 넓어지고 있는지가 이 목록에 드러난다.

| 항목 | 내용 |
|---|---|
| Agentic Vectorless RAG | 자체 호스팅 PageIndex와 OpenAI Agents SDK로 구성한 agentic vectorless RAG 예제 |
| PageIndex File System | 파일 단위 트리 층. 문서 한 개가 아니라 corpus 전체를 대상으로 추론하게 해 대규모 문서 검색을 가능하게 한다 |
| PageIndex Chat | 전문 장문 문서를 다루는 문서 분석 에이전트 플랫폼. MCP나 API로도 접근할 수 있다 |
| PageIndex Framework | PageIndex를 agentic in-context tree index로 깊이 다룬 글. LLM이 긴 문서에서 추론 기반의 컨텍스트 인식 retrieval을 하게 한다고 설명한다 |

네 항목의 방향은 두 가지로 나뉜다. 하나는 대상 범위를 문서 한 개에서 corpus 전체로 넓히는 것이고, 다른 하나는 사용 방식을 CLI에서 에이전트와 챗 플랫폼으로 옮기는 것이다. 이 저장소가 담당하는 부분은 그 가운데 첫 번째 단계, 즉 문서 한 개를 트리로 만드는 지점이다.

### 문서와 지원 채널

README는 상세 내용을 대부분 외부 사이트로 위임한다. Resources 절이 네 곳을 안내한다.

| 경로 | 내용 |
|---|---|
| Blog | 기술 글, 연구 관점, 제품 업데이트 |
| Developer | MCP 설정, API 문서, 통합 가이드 |
| Cookbooks | 실행 가능한 예제와 심화 사용 사례 |
| Tutorials | 실무 가이드와 전략. Document Search와 Tree Search를 포함한다 |

지원 채널로는 웹사이트, 챗 플랫폼, 개발자 페이지, 문서 사이트, Discord, Twitter, LinkedIn, 문의 양식, 데모 예약 링크가 문서 곳곳에 배치된다. 이 배치는 README를 읽는 방식에 영향을 준다. 저장소 문서만으로는 알고리즘의 세부나 API의 스펙에 도달할 수 없고, 어느 시점에는 외부 사이트로 넘어가야 한다.

## 결과

README가 제시하는 정량 수치는 하나뿐이다.

| 항목 | 값 | 조건 |
|---|---|---|
| FinanceBench accuracy | 98.7% | 측정 대상은 PageIndex가 아니라 이를 retrieval 층으로 쓰는 Mafin 2.5다. VectifyAI 자체 보고이며 독립 재검증은 없다. README는 state-of-the-art로 표기한다 |

Mafin 2.5는 PageIndex를 기반으로 하는 재무 문서 분석용 reasoning 기반 RAG 시스템이다. 전체 벤치마크 결과는 별도 저장소 `VectifyAI/Mafin2.5-FinanceBench`에, 상세 비교와 성능 지표는 팀 블로그에 있다고 안내한다. FinanceBench 자체는 arXiv 2311.11944로 링크되며, README는 그 벤치마크의 저자나 구성은 설명하지 않는다.

수치를 읽을 때 유의할 점이 셋 있다. 첫째, 98.7%는 이 저장소가 아니라 Mafin 2.5라는 별도 시스템의 성적이다. 둘째, vector 기반 RAG와의 비교는 "vastly outperforming"과 "significantly outperforming"이라는 정성 표현 두 곳뿐이고 대조군의 수치는 제시되지 않는다. 셋째, 이 저장소에 재현용 코드가 포함되는지 여부를 README가 밝히지 않으므로, 자체 호스팅 코드만으로 같은 결과에 도달한다는 보장은 문서상 근거가 없다. 여기에 보고 주체가 VectifyAI 자신이고 제3자의 독립 재검증이 없다는 점을 더하면, 이 수치는 제품 주장으로 읽는 편이 정확하다.

같은 98.7%는 이 wiki의 3자 리뷰 페이지에도 등장한다. 다만 두 자료의 근거 문서는 하나로 수렴한다. VectifyAI가 공개한 Mafin 2.5 벤치마크 저장소와 블로그다. 반면 PageIndex 팀이 쓴 소개글에는 정확도 수치가 실려 있지 않다. 이 수치를 검토할 때 여러 페이지를 서로 독립된 출처로 세지 않는 편이 안전하다.

이 저장소만 놓고 보면 정량 근거는 없는 셈이다. README가 여기 있는 코드의 트리 품질이나 retrieval 정확도를 직접 측정한 값은 하나도 싣지 않는다.

정성적 근거로 README가 드는 것은 적용 대상의 성격이다. PageIndex의 계층 인덱싱과 추론 기반 retrieval이 SEC 신고 서류와 실적 공시 같은 복잡한 재무 보고서에서 정확한 탐색과 추출을 가능하게 한다고 설명한다.

## 한계

- **자체 호스팅과 클라우드의 품질 격차가 명시적이다.** 오픈소스 코드는 standard PDF parsing만 쓰고, 복잡한 PDF에는 클라우드의 향상된 OCR을 쓰라는 안내가 Deployment Options, Tree Structure, Package Usage 세 곳에 반복된다.
- **Markdown 모드의 권장 입력을 오픈소스만으로 만들 수 없다.** README는 변환된 Markdown을 권장하지 않으면서 대안으로 클라우드 전용 PageIndex OCR을 지목한다. 이 모드를 권장 방식대로 쓰려면 유료 경로가 필요해진다.
- **라이선스를 현재 raw로 검증할 수 없다.** 이 페이지의 frontmatter는 `license: "MIT"`를 유지하지만, README 본문에 라이선스 조항이 없고 `LICENSE` 파일은 저장소 스냅샷을 README 스텁으로 교체한 커밋 `0507ad0`에서 삭제됐다. 실제 조건은 저장소의 `LICENSE` 파일을 직접 확인해야 한다.
- **README 안에 비활성 블록이 있다.** PageIndex OCR을 소개하는 절과 Cookbooks 목록이 HTML 주석으로 감싸져 있어 렌더링된 README에는 보이지 않는다. 그러면서 본문 여러 곳은 PageIndex OCR을 설명 없이 링크로만 언급한다. 자료 자체의 내적 불일치에 해당한다.
- **비용과 지연에 관한 정보가 없다.** 문서 한 건을 처리할 때의 LLM 호출 횟수나 소요 시간은 README에 없다. 노드 토큰 상한이 20000이라는 값에서 호출 단위의 크기만 짐작할 수 있다.
- **클라우드 API의 스펙과 요금이 README에 없다.** 엔드포인트, 요청 형식, 무료 사용 범위는 모두 외부 문서 사이트로 위임된다.
- **corpus 규모 지원의 현재 상태가 불분명하다.** PageIndex File System은 Updates 절에서 발표되지만, 그 기능이 이 저장소에 포함되는지 아니면 클라우드 전용인지 README는 밝히지 않는다.
- **목차가 없는 문서의 처리 방식이 문서화되어 있지 않다.** `--toc-check-pages` 인자는 목차 탐색이 첫 단계임을 시사하지만, 탐색이 실패했을 때의 대체 경로는 설명되지 않는다.

한계 항목의 상당수가 같은 곳을 향한다. README가 오픈소스 코드와 클라우드 서비스를 한 문서에서 함께 소개하기 때문에, 품질과 스펙의 상세가 반복해서 유료 경로로 넘어간다. 이 저장소를 검토할 때는 README의 주장 가운데 어디까지가 여기 있는 코드의 성능이고 어디부터가 클라우드의 성능인지 구분해 읽어야 한다.

### 이 페이지의 근거 범위

이 페이지의 근거는 `raw/repos/vectifyai-pageindex.md`에 남은 README 본문뿐이다. 커밋 `0507ad0`이 저장소 전체 클론을 README 한 파일로 교체하면서 소스 코드, `LICENSE`, `requirements.txt`, 노트북, 예제 문서와 결과 JSON이 모두 삭제됐다. 그래서 README가 답하는 범위와 답하지 않는 범위를 구분해 두는 편이 이 페이지를 쓰는 데 도움이 된다.

| README가 답하는 것 | README가 답하지 않는 것 |
|---|---|
| 두 단계 retrieval 절차와 설계 동기 | 패키지 내부의 모듈, 클래스, 함수 구성 |
| 트리 노드의 필드 여섯 개와 예시 | 트리 생성 알고리즘의 단계별 처리 |
| CLI 명령과 선택 인자 일곱 개의 기본값 | 출력 파일의 경로와 이름 |
| 설치 명령과 환경 변수 이름 | 의존성 목록과 Python 버전 요구사항 |
| 배포 방식 세 가지의 차이 | 클라우드 API 스펙과 요금 |
| FinanceBench 98.7%라는 결과와 그 측정 대상 | 대조군 수치, 재현 절차, 독립 검증 여부 |
| 예제와 노트북의 파일 이름과 실행 명령 | 예제 내부의 도구 구성과 지시문 |

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| vectorless RAG | vector DB와 embedding similarity 검색 없이 LLM의 추론만으로 retrieval을 수행하는 방식 |
| PageIndex tree structure | 문서 하나를 목차 형태의 계층 JSON으로 표현한 것. 노드마다 제목, 식별자, 위치 범위, 요약, 하위 노드를 갖는다 |
| tree search | 생성된 트리를 위에서 아래로 탐색하며 관련 절을 고르는 retrieval 단계 |
| PageIndex File System | 파일 단위 트리 층. corpus 전체를 대상으로 추론하게 한다고 발표된 기능 |
| PageIndex OCR | 문서의 전역 구조를 보존하도록 설계됐다고 주장하는 클라우드 전용 OCR |
| Mafin 2.5 | 같은 팀의 재무 문서 분석 시스템. PageIndex를 retrieval 층으로 쓴다. FinanceBench 98.7%는 이 시스템의 자체 보고 수치다 |

## 관련 페이지

- [[database/zhang-2025-pageindex-vectorless-reasoning-rag]]: PageIndex 팀이 직접 쓴 소개글. README가 인용 대상으로 지정한 글이며, 이 저장소가 코드를 담당하고 그 글이 동기와 설계 철학을 담당한다.
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex]]: PageIndex Cloud API 튜토리얼. README가 스펙을 외부 문서로 위임한 클라우드 경로를 코드 예제로 보여준다.
- [[database/kalane-2026-pageindex-threw-out-vector-databases]]: 3자 리뷰. 같은 FinanceBench 결과와 출시 이후 기능을 외부 시각에서 검토한다.
- [[database/sguys99-langchain-study-vectorless-rag]]: PageIndex API 없이 문서 트리를 직접 만들어 같은 아이디어를 재현한 한글 학습용 코드. 자체 호스팅보다 한 단계 더 내려간 재구현이다.
- [[database/guo-2025-lightrag-simple-and-fast]]: LightRAG. 긴 문서 RAG에서 vector 단독의 한계를 넘으려는 같은 문제의식을 knowledge graph로 푼다.
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: LeanRAG. 계층 구조를 쓴다는 점은 같지만 계층의 출처가 문서 목차가 아니라 knowledge graph다.
- [[database/hkuds-rag-anything]]: RAG-Anything 저장소. 멀티모달 확장에 초점을 두는 반면 PageIndex는 문서 구조에 초점을 둔다.
- [[overviews/lightrag-family-graph-rag-overview]]: graph 기반 RAG 합성 페이지. PageIndex는 graph가 아니라 문서 내장 구조를 쓰는 별도 가지로 놓인다.
