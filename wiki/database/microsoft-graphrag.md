---
title: "microsoft/graphrag"
type: repo
year: 2024
category: database
raw_path: raw/repos/microsoft-graphrag.md
raw_filename: "microsoft-graphrag.md"
source_collection: external
source: microsoft-graphrag.md
org: "microsoft"
repo: "graphrag"
url: "https://github.com/microsoft/graphrag"
license: "MIT"
tags: [graphrag, graph-rag, knowledge-graph, rag, llm, indexing, community-detection, microsoft-research]
---

## 요약

`microsoft/graphrag`는 LLM으로 비정형 텍스트에서 구조화 데이터를 뽑아내는 데이터 파이프라인 겸 변환 스위트다. Microsoft Research가 공개했고 README 상단이 GraphRAG 원논문(arXiv:2404.16130)을 가리키므로, 논문의 방법론을 실행 코드로 옮긴 저장소로 읽는 것이 자연스럽다.

다만 README 자신은 이 코드를 시연(demonstration)으로 규정하고 Microsoft가 공식 지원하는 제품이 아니라고 명시한다. 따라서 이 페이지는 저장소를 제품이 아니라 참조 구현이자 운영 지침 모음으로 다룬다.

이 페이지의 근거는 저장소 README 한 편이다. README는 알고리즘 서술을 문서 사이트와 원논문으로 위임하기 때문에, 여기서 확인할 수 있는 것은 구현체가 무엇을 제공하고 사용자에게 무엇을 요구하는지에 한정된다. GraphRAG 방법 자체의 설명은 [[database/edge-2024-from-local-to-global]]가 담당한다.

## 배경

GraphRAG는 knowledge graph를 인덱스로 삼아 LLM의 retrieval을 보강하는 계열이다. retrieval은 외부 지식에서 관련 정보를 찾아오는 단계를 뜻한다. 유사도 상위 문서만 가져오는 방식으로는 corpus 전체를 대상으로 하는 질의에 답하기 어렵다는 문제의식에서 출발한다.

이 저장소는 그 방법론을 실행 가능한 형태로 공개한 결과물이다. README의 Repository Guidance 절은 저장소가 "knowledge graph memory 구조로 LLM 출력을 강화하는 방법론"을 제시한다고 규정한다.

정체성 규정은 README 안에서 세 문장으로 반복된다. 셋을 나란히 놓으면 이 저장소가 검색 엔진이 아니라 변환 층에 자기 위치를 두고 있음이 드러난다.

| README 표현 | 위치 | 뜻 |
|---|---|---|
| a data pipeline and transformation suite | Overview | 데이터 파이프라인이자 변환 스위트 |
| extract meaningful, structured data from unstructured text using the power of LLMs | Overview | 비정형 텍스트에서 의미 있는 구조화 데이터를 추출한다 |
| a methodology for using knowledge graph memory structures to enhance LLM outputs | Repository Guidance | knowledge graph memory 구조로 LLM 출력을 강화하는 방법론 |

## 핵심 개념

indexing은 소스 텍스트를 그래프 형태의 인덱스로 바꾸는 전처리 단계를 말한다. README가 이름을 붙인 유일한 단계이며, 비용 경고가 겨냥하는 대상도 이 단계다.

prompt tuning은 대상 데이터에 맞춰 추출과 요약 프롬프트를 조정하는 절차다. 모델 파라미터를 학습시키는 fine-tuning과 달리 프롬프트 텍스트만 바꾼다. README는 기본 설정 그대로는 최선의 결과가 나오지 않을 수 있다며 이 절차를 권고한다.

config 스캐폴딩은 `graphrag init`이 설정 파일과 프롬프트 템플릿을 생성해 주는 것을 뜻한다. 버전 업 절차가 이 명령을 다시 실행하는 형태로 정의되어 있어서, 설정 파일은 사용자가 처음부터 손으로 쓰는 대상이 아니라 도구가 재생성하는 산출물에 가깝다.

breaking change는 이전 config나 프롬프트 포맷과 호환되지 않는 변경을 가리킨다. 저장소는 이 개념을 `breaking-changes.md` 문서로 따로 관리하며, 버전 관리 방침 전체가 여기에 기술되어 있다.

## 저장소 구성

### README의 절 구성

README는 짧지만 절이 여러 개로 나뉘어 있고, 각 절이 거의 전부 외부 문서로의 안내 역할을 한다. 절 목록만 봐도 이 저장소가 코드 설명보다 운영 안내에 지면을 쓰고 있음을 알 수 있다.

| 절 | 담는 내용 |
|---|---|
| Overview | 프로젝트 정의와 Microsoft Research 블로그 안내 |
| Quickstart | command line quickstart 문서로 안내 |
| Repository Guidance | 방법론 규정과 공식 지원 제품이 아니라는 고지, 비용 경고 |
| Diving Deeper | 기여, 개발, 논의 창구 안내 |
| Prompt Tuning | 기본 프롬프트의 한계와 튜닝 가이드 안내 |
| Versioning | 버전 상승 시 재설정 절차 |
| Responsible AI FAQ | 책임 있는 AI 문서로 안내 |
| Trademarks | Microsoft 상표와 로고 사용 조건 |
| Privacy | Microsoft Privacy Statement 안내 |

### 외부 진입점

README가 링크하는 외부 문서는 여섯 개다. 알고리즘 서술의 본체가 저장소 밖 문서 사이트에 있다는 점이 이 표에서 확인된다.

| 진입점 | 대상 | 역할 |
|---|---|---|
| Microsoft Research Blog Post | `microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/` | GraphRAG 소개와 private data 활용 설명 |
| Read the docs | `microsoft.github.io/graphrag` | 아키텍처와 사용법 본체 |
| GraphRAG Arxiv | `arxiv.org/pdf/2404.16130` | 방법론 원논문 |
| command line quickstart | `microsoft.github.io/graphrag/get_started/` | README가 권장하는 시작 경로 |
| Prompt Tuning Guide | `microsoft.github.io/graphrag/prompt_tuning/overview/` | 프롬프트 조정 절차 |
| GitHub Discussions | `github.com/microsoft/graphrag/discussions` | 피드백과 논의 창구 |

### 저장소 내부 문서

README가 지목하는 저장소 내부 문서는 네 개이며, 각각 성격이 다르다.

| 문서 | 역할 |
|---|---|
| `CONTRIBUTING.md` | 기여 가이드라인 |
| `DEVELOPING.md` | GraphRAG 개발 착수 안내 |
| `breaking-changes.md` | 버전 관리 방침 |
| `RAI_TRANSPARENCY.md` | 책임 있는 AI FAQ |

## 방법

### README가 확정하는 파이프라인 범위

README가 단계 이름을 명시한 것은 indexing 하나뿐이다. 비용 경고가 이 단계에 붙어 있고, 질의 단계의 모드 구성은 README 본문에 나오지 않는다.

따라서 이 저장소를 도입할 때 README만으로 판단할 수 있는 것은 전처리 비용의 존재와 크기에 대한 경고까지다. 그래프 구축 알고리즘, community 분할 방식, 답변 생성 절차는 문서 사이트와 원논문을 함께 읽어야 확인된다.

### 설정 스캐폴딩과 버전 업 절차

`graphrag init --root [path]`가 config와 프롬프트 템플릿을 생성한다. Versioning 절은 이 명령을 버전 상승 시점에 다시 실행하는 방식으로 호환성 문제를 처리한다.

| 상황 | 지시 | 목적과 부수 효과 |
|---|---|---|
| minor 버전 상승 사이 | `graphrag init --root [path] --force`를 항상 실행 | 최신 config 포맷을 확보한다 |
| major 버전 상승 사이 | 제공된 migration notebook 실행 | 이전 데이터셋을 다시 인덱싱하지 않아도 된다 |
| 두 경우 공통 | | 설정과 프롬프트를 덮어쓰므로 필요하면 미리 백업한다 |

이 절차가 뜻하는 바는 config가 사용자 자산이 아니라 도구 산출물로 취급된다는 것이다. 즉 프롬프트를 손으로 수정해 둔 상태에서 버전을 올리면 그 수정이 사라지므로, prompt tuning 결과물은 저장소 밖에 따로 보관해야 한다.

### 원논문과 구현체의 경계

이 저장소를 설명할 때 원논문의 것과 구현체의 것이 섞이기 쉽다. 대표적인 사례가 local search와 global search의 이원 구성을 원논문의 두 모드로 소개하는 서술이며, 이는 사실과 다르다.

원논문 PDF를 검색하면 "local search"는 0회 등장한다. global search라는 이름은 community summary를 map-reduce로 처리하는 조건(C0에서 C3)을 가리키는 데만 쓰이며, 논문은 그 단일 모드만 평가한다. 다중 검색 모드는 구현체 문서가 나중에 도입한 구성이다.

| 항목 | 원논문 | 이 저장소의 README |
|---|---|---|
| 명시된 질의 모드 | global search 조건(C0에서 C3) 한 가지 | 언급 없음 |
| local search | 등장하지 않음 | 언급 없음 |
| community 분할 알고리즘 | Leiden 명시 | 언급 없음 |
| 정량 평가 | 두 개 corpus 실험과 승률 보고 | 없음 (원논문과 RAI 문서로 위임) |
| 비용 경고 | 인덱싱 소요 시간 보고 | 별도 강조 블록으로 전면 배치 |

따라서 참조 대상을 나누어 두는 편이 안전하다. 알고리즘과 평가는 [[database/edge-2024-from-local-to-global]]에서 확인하고, 설치와 설정과 운영은 이 저장소 문서에서 확인한다.

## 운영 요구사항

### 인덱싱 비용

README는 비용 경고를 별도 강조 블록으로 배치한다. "GraphRAG indexing can be an expensive operation"이라고 적고, 대응책으로 문서를 전부 읽어 과정과 비용을 이해할 것과 소규모로 시작할 것(start small) 두 가지를 지시한다.

구체적인 금액이나 토큰 수는 제시하지 않는다. 따라서 도입 검토 시 비용 추정은 원논문의 실측 수치를 함께 봐야 한다.

### prompt tuning

README는 기본 프롬프트로 데이터를 처리하면 최선의 결과가 나오지 않을 수 있다고 밝히고, Prompt Tuning Guide를 따를 것을 강하게 권한다. 즉 prompt tuning은 선택 사항이 아니라 사실상 도입 절차의 일부다.

이 권고는 앞의 버전 업 절차와 충돌한다. 튜닝한 프롬프트가 `graphrag init --force`로 덮어써지므로, 튜닝 결과물을 별도로 보관하는 관리 절차를 따로 세워야 한다.

### 책임 있는 AI 문서

`RAI_TRANSPARENCY.md`가 여섯 항목을 다룬다. 평가 지표와 한계가 README가 아니라 이 문서에 들어가 있으므로, 도입 판단 자료로 함께 읽어야 한다.

| 항목 | 다루는 내용 |
|---|---|
| What is GraphRAG? | 시스템 정의 |
| What can GraphRAG do? | 기능 범위 |
| What are GraphRAG's intended use(s)? | 의도된 용도 |
| How was GraphRAG evaluated? What metrics are used to measure performance? | 평가 방법과 성능 지표 |
| What are the limitations of GraphRAG? | 한계와 영향 최소화 방법 |
| What operational factors and settings allow for effective and responsible use? | 효과적이고 책임 있는 사용을 위한 운영 요인과 설정 |

### 법적 고지

저장소 사용 시 확인해야 할 조항은 세 가지다.

| 항목 | 내용 |
|---|---|
| Trademarks | Microsoft 상표와 로고 사용은 Microsoft Trademark and Brand Guidelines를 따라야 한다. 수정판에서 혼동을 일으키거나 Microsoft 후원을 암시해서는 안 되며, 제3자 상표는 각 정책을 따른다 |
| Privacy | Microsoft Privacy Statement로 위임된다 |
| 지원 상태 | 시연 코드이며 Microsoft가 공식 지원하는 제품이 아니다 |

라이선스는 이 wiki의 frontmatter가 MIT로 기록하고 있으나 README 본문에는 라이선스 조항이 없다. 실제 적용 시에는 저장소의 `LICENSE` 파일을 직접 확인하는 것이 안전하다.

## 결과

README에는 벤치마크 수치, 실험 조건, ablation이 하나도 없다. 구현체 저장소이므로 성능 근거를 원논문과 RAI 문서로 위임한 결과다.

README에서 관측 가능한 정량 신호는 상단 배지 네 개뿐이다. 배지는 이미지로 실시간 렌더링되므로 텍스트에는 고정된 값이 남지 않고, 수집 시점의 버전이나 다운로드 수를 확인할 수 없다.

| 배지 | 대상 | 표시 내용 |
|---|---|---|
| PyPI Version | `pypi.org/project/graphrag` | 배포 중인 패키지 버전 |
| PyPI Downloads | `pypi.org/project/graphrag` | 월 단위 다운로드 수 |
| GitHub Issues | `github.com/microsoft/graphrag/issues` | 열린 이슈 수 |
| GitHub Discussions | `github.com/microsoft/graphrag/discussions` | 논의 수 |

배지가 PyPI를 가리키므로 패키지가 PyPI에 배포된다는 사실은 확인되지만, 설치 명령 자체는 README에 없고 command line quickstart 문서로 위임된다.

## 한계

README가 직접 밝힌 제약은 네 가지다.

| 한계 | 근거 | 실무 영향 |
|---|---|---|
| 공식 지원 제품이 아님 | "the provided code serves as a demonstration and is not an officially supported Microsoft offering" | 운영 SLA를 기대할 수 없다 |
| 인덱싱 비용 | 별도 강조 블록의 비용 경고 | 대상 corpus 전체를 처리하기 전에 소규모 시험이 필요하다 |
| 기본 프롬프트의 한계 | Prompt Tuning 절의 권고 | prompt tuning이 사실상 필수 절차가 된다 |
| 버전 업 재설정 부담 | Versioning 절의 두 지시 | 설정과 프롬프트가 덮어써지고, migration notebook을 건너뛰면 재인덱싱을 감수해야 한다 |

문서 구조에서 오는 제약도 있다. 비용 경고를 전면에 두면서 정작 비용의 크기를 가늠할 수치는 제시하지 않기 때문에, 도입 판단에 필요한 정보가 README 안에서 완결되지 않는다.

라이선스 표기도 같은 성격의 공백이다. README 본문에는 라이선스 조항이 없고 Trademarks와 Privacy 절만 있어서, MIT라는 기록은 저장소 메타데이터에 의존한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| data pipeline and transformation suite | README가 프로젝트를 규정하는 표현. 검색 시스템이 아니라 텍스트를 구조화 데이터로 바꾸는 변환 층에 자기 정체성을 둔다 |
| knowledge graph memory structure | 추출된 엔티티와 관계를 그래프로 유지해 LLM이 참조하게 하는 구조. README가 이 저장소의 방법론을 요약하는 표현이다 |
| indexing | README가 이름을 붙인 유일한 단계이자 비용 경고의 대상. 소스 텍스트를 그래프 형태의 인덱스로 바꾸는 전처리다 |
| prompt tuning | 대상 데이터에 맞춰 추출과 요약 프롬프트를 조정하는 절차. 모델 파라미터는 건드리지 않는다 |
| breaking change | 이전 config나 프롬프트 포맷과 호환되지 않는 변경. `breaking-changes.md`가 방침을 담는다 |
| RAI transparency note | 시스템의 용도, 평가, 한계, 운영 요인을 공개하는 책임 있는 AI 문서 |

## 관련 페이지

- [[database/edge-2024-from-local-to-global]]: 이 저장소가 구현하는 GraphRAG 원논문. 그래프 구축, Leiden community 분할, map-reduce 답변 생성 같은 알고리즘 세부와 정량 평가가 여기에 있다
- [[database/dsba-2025-graphrag-paper-review]]: 원논문의 한국어 해설. 프롬프트 전문과 발표자의 비판을 함께 담았다
- [[database/guo-2025-lightrag-simple-and-fast]]: 인덱싱 비용을 줄이는 방향의 후속작 LightRAG
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation]]: 계층적 knowledge graph를 다른 방식으로 구성한 후속작 LeanRAG
- [[database/dsba-2026-paper-review-graph-based-rag]]: LightRAG와 LeanRAG를 GraphRAG 계보 안에서 비교한 세미나
- [[overviews/lightrag-family-graph-rag-overview]]: GraphRAG를 출발점으로 둔 graph RAG 계보 overview
