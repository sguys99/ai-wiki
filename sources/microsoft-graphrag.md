---
title: "microsoft/graphrag"
type: repo
year: 2024
category: database
raw_path: raw/repos/microsoft-graphrag.md
raw_filename: "microsoft-graphrag.md"
source_collection: external
org: "microsoft"
repo: "graphrag"
url: "https://github.com/microsoft/graphrag"
license: "MIT"
tags: [graphrag, graph-rag, knowledge-graph, rag, llm, indexing, community-detection, microsoft-research]
---

## 한 줄 요약 (One-line Summary)

`microsoft/graphrag`는 LLM으로 비정형 텍스트에서 구조화 데이터를 뽑아내는 데이터 파이프라인 겸 변환 스위트다. README는 스스로를 knowledge graph memory 구조로 LLM 출력을 강화하는 방법론의 시연으로 규정하고, 인덱싱 비용 경고와 prompt tuning 권고, 버전 업 시 재설정 절차를 전면에 배치한다.

## 1. 자료 정보 (Document Information)

수집된 raw는 저장소 README 한 편이며 약 4,960 bytes다. 알고리즘 세부는 README가 문서 사이트로 위임하므로 이 source는 구현체가 무엇을 제공하고 무엇을 요구하는지에 한정한다.

- **저장소**: `microsoft/graphrag` (`https://github.com/microsoft/graphrag`)
- **원논문 링크**: README 상단이 GraphRAG Arxiv(`arxiv.org/pdf/2404.16130`)를 가리킨다. 논문 쪽 정리는 [[database/edge-2024-from-local-to-global]]에 있다.
- **라이선스**: raw frontmatter의 `license: "MIT"`가 근거다. README 본문에는 라이선스 조항이 없고 Trademarks와 Privacy 절만 있다.
- **배포**: README 상단 배지가 `pypi.org/project/graphrag`를 가리킨다. 설치 명령 자체는 README에 없고 command line quickstart 문서로 위임된다.

README가 링크하는 외부 진입점은 다음과 같다.

| 진입점 | 대상 | README에서의 역할 |
|---|---|---|
| Microsoft Research Blog Post | `microsoft.com/.../graphrag-unlocking-llm-discovery-on-narrative-private-data/` | GraphRAG 소개와 private data 활용 설명 |
| Read the docs | `microsoft.github.io/graphrag` | 아키텍처와 사용법 본체 |
| GraphRAG Arxiv | `arxiv.org/pdf/2404.16130` | 방법론 원논문 |
| command line quickstart | `microsoft.github.io/graphrag/get_started/` | 권장 시작 경로 |
| Prompt Tuning Guide | `microsoft.github.io/graphrag/prompt_tuning/overview/` | 프롬프트 조정 절차 |
| GitHub Discussions | `github.com/microsoft/graphrag/discussions` | 피드백과 논의 창구 |

저장소 내부 문서로는 `CONTRIBUTING.md`(기여 가이드라인), `DEVELOPING.md`(개발 착수), `breaking-changes.md`(버전 관리 방침), `RAI_TRANSPARENCY.md`(책임 있는 AI FAQ) 네 개를 지목한다.

## 2. 주요 기여 (Key Contributions)

1. **비정형 텍스트를 구조화 데이터로 바꾸는 파이프라인.** README의 Overview 절은 프로젝트를 "a data pipeline and transformation suite that is designed to extract meaningful, structured data from unstructured text using the power of LLMs"로 정의한다.
2. **knowledge graph memory 구조를 통한 LLM 출력 강화.** Repository Guidance 절은 저장소가 "a methodology for using knowledge graph memory structures to enhance LLM outputs"를 제시한다고 밝힌다.
3. **비용 경고의 전면 배치.** "GraphRAG indexing can be an expensive operation"이라는 경고와 함께 문서를 전부 읽고 소규모로 시작하라(start small)고 요구한다.
4. **prompt tuning을 기본 절차로 규정.** 기본 설정 그대로 쓰면 최선의 결과가 나오지 않을 수 있다고 명시하고, Prompt Tuning Guide를 따를 것을 강하게 권한다.
5. **버전 업 재설정 절차의 문서화.** minor와 major 버전 상승 각각에 대해 수행할 명령과 위험을 지정한다.
6. **책임 있는 AI 문서 분리.** 정의, 기능, 의도된 용도, 평가 방법, 한계, 운영 요인 여섯 항목을 `RAI_TRANSPARENCY.md`로 별도 관리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

README는 아키텍처 서술을 문서 사이트로 위임하고, 본문에서는 운영 절차만 지정한다. 확인 가능한 항목은 세 가지다.

**단계 구분.** README가 이름을 붙인 단계는 indexing 하나다. 비용 경고의 대상이 이 단계이며, 질의 단계의 모드 구성은 README에 나오지 않는다.

**설정 스캐폴딩.** `graphrag init --root [path]`가 config 포맷과 프롬프트를 생성한다. Versioning 절은 minor 버전 상승 사이에 `--force`를 붙여 항상 다시 실행하라고 요구한다.

**버전 업 절차.** 두 경우의 지시가 다르다.

| 상황 | 지시 | 부수 효과 |
|---|---|---|
| minor 버전 상승 사이 | `graphrag init --root [path] --force` 실행 | 최신 config 포맷을 확보한다 |
| major 버전 상승 사이 | 제공된 migration notebook 실행 | 이전 데이터셋 재인덱싱을 피할 수 있다 |
| 두 경우 공통 | | 설정과 프롬프트를 덮어쓰므로 필요하면 백업한다 |

> **귀속 주의.** local search와 global search의 이원 구성은 이 README에 없고 원논문의 것도 아니다. 원논문 PDF에는 "local search"가 0회 등장하며 global search라는 이름은 community summary map-reduce 조건(C0에서 C3)을 가리키는 데만 쓰인다. 다중 검색 모드는 구현체 문서가 도입한 구성이다. 원논문 방법론은 [[database/edge-2024-from-local-to-global]]에 정리되어 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README에는 벤치마크 수치, 실험 조건, ablation이 하나도 없다. 성능 근거는 두 곳으로 위임된다.

| 위임 대상 | 담기는 내용 |
|---|---|
| GraphRAG Arxiv (`arxiv.org/pdf/2404.16130`) | 방법론과 정량 평가. 정리는 [[database/edge-2024-from-local-to-global]] |
| `RAI_TRANSPARENCY.md` | "How was GraphRAG evaluated? What metrics are used to measure performance?" 항목 |

README에서 관측 가능한 정량 신호는 상단 배지 네 개뿐이며, 값 자체는 배지 이미지가 실시간으로 렌더링하므로 텍스트에 고정된 수치가 남지 않는다.

| 배지 | 대상 | 표시 내용 |
|---|---|---|
| PyPI Version | `pypi.org/project/graphrag` | 배포 중인 패키지 버전 |
| PyPI Downloads | `pypi.org/project/graphrag` | 월 단위 다운로드 수 |
| GitHub Issues | `github.com/microsoft/graphrag/issues` | 열린 이슈 수 |
| GitHub Discussions | `github.com/microsoft/graphrag/discussions` | 논의 수 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

README가 직접 밝힌 제약은 네 가지다.

1. **공식 지원 제품이 아니다.** "the provided code serves as a demonstration and is not an officially supported Microsoft offering"라고 명시한다. 운영 SLA를 기대할 수 없다.
2. **인덱싱 비용이 크다.** 경고문이 별도 강조 블록으로 들어가 있고, 대응책으로 문서 정독과 소규모 시작을 지시한다. 구체적 비용 수치는 제시하지 않는다.
3. **기본 프롬프트로는 최선의 결과가 나오지 않는다.** 데이터에 맞춘 prompt tuning이 사실상 필수 절차가 된다.
4. **버전 업마다 재설정 부담이 있다.** config와 프롬프트를 덮어쓰므로 백업이 필요하고, major 버전 상승에서 migration notebook을 건너뛰면 재인덱싱을 감수해야 한다.

`RAI_TRANSPARENCY.md`가 별도로 다루는 항목은 여섯 가지다: GraphRAG의 정의, 기능 범위, 의도된 용도, 평가 방법과 지표, 한계와 완화 방법, 효과적이고 책임 있는 사용을 위한 운영 요인과 설정.

법적 고지로는 Microsoft 상표와 로고 사용이 Microsoft Trademark and Brand Guidelines를 따라야 하고, 수정판에서 혼동이나 Microsoft 후원 암시를 유발해서는 안 되며, 제3자 상표는 각 정책을 따른다는 조항이 있다. 개인정보 항목은 Microsoft Privacy Statement로 위임된다.

## 6. 관련 연구 (Related Work)

- **원논문**: Edge et al. 2024, "From Local to Global: A Graph RAG Approach to Query-Focused Summarization" (arXiv:2404.16130). 정리는 [[database/edge-2024-from-local-to-global]]
- **후속 비교**: [[database/guo-2025-lightrag-simple-and-fast]] (LightRAG), [[database/zhang-2026-leanrag-knowledge-graph-based-generation]] (LeanRAG)
- **한국어 해설**: [[database/dsba-2025-graphrag-paper-review]], [[database/dsba-2026-paper-review-graph-based-rag]]
- **계보 overview**: [[overviews/lightrag-family-graph-rag-overview]]

## 7. 용어집 (Glossary)

- **data pipeline and transformation suite**: README가 프로젝트를 규정하는 표현. 검색 시스템이 아니라 텍스트를 구조화 데이터로 바꾸는 변환 층에 자기 정체성을 둔다.
- **knowledge graph memory structure**: 추출된 엔티티와 관계를 그래프로 유지해 LLM이 참조하게 하는 구조. README가 이 저장소의 방법론을 요약하는 표현이다.
- **indexing**: README가 이름을 붙인 유일한 단계이자 비용 경고의 대상. 소스 텍스트를 그래프 형태의 인덱스로 바꾸는 전처리다.
- **prompt tuning**: 대상 데이터에 맞춰 추출과 요약 프롬프트를 조정하는 절차. README는 기본 설정으로는 최선의 결과가 나오지 않을 수 있다며 이를 권고한다.
- **breaking change**: 이전 config나 프롬프트 포맷과 호환되지 않는 변경. `breaking-changes.md`가 버전 관리 방침으로 다룬다.
- **RAI transparency note**: 책임 있는 AI 관점에서 시스템의 용도, 평가, 한계, 운영 요인을 공개하는 문서. 이 저장소는 `RAI_TRANSPARENCY.md`로 분리했다.
