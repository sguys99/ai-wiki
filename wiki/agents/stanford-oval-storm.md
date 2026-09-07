---
title: "stanford-oval/storm: STORM & Co-STORM"
type: repo
year: 2024
category: agents
raw_path: raw/repos/stanford-oval-storm.md
raw_filename: "stanford-oval-storm.md"
source_collection: external
source: stanford-oval-storm.md
org: "stanford-oval"
repo: "storm"
url: "https://github.com/stanford-oval/storm"
license: "MIT (코드), FreshWiki 데이터셋은 CC BY-SA"
tags: [storm, co-storm, multi-agent, question-asking, retrieval, dspy, litellm, wikipedia-generation, knowledge-curation, stanford-oval]
---

## 요약

`stanford-oval/storm`은 주제 하나를 입력받아 인터넷 검색을 근거로 Wikipedia 스타일 글을 처음부터 작성하는 LLM 시스템의 공식 구현체다. Stanford OVAL 연구실이 개발했고, 논문 두 편(NAACL 2024의 STORM, EMNLP 2024의 Co-STORM)을 그대로 실행할 수 있는 코드로 옮겼다.

저장소는 두 엔진을 함께 담는다. STORM은 사람의 개입 없이 조사부터 집필까지 끝내는 자동 파이프라인이고, Co-STORM은 사람이 담론에 참여해 논의 방향을 조정하는 협업형 엔진이다. 두 엔진 모두 DSPy로 모듈화돼 있고 litellm으로 모델 계층을 추상화하므로, 언어 모델과 임베딩 모델을 교체하면서 같은 파이프라인을 쓸 수 있다.

이 페이지는 저장소 쪽 관심사, 즉 구현 구조, 설치, 설정 키, 실행 API, 배포와 라이선스를 다룬다. 방법론의 수식 수준 서술과 정량 평가 결과는 원논문 페이지 [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]]가 담당한다.

## 배경

이 저장소가 다루는 문제는 참고문헌도 목차도 없는 상태에서 긴 글을 쓰는 일이다. README는 이 과정을 자동화하는 핵심이 서술이 아니라 질문 생성에 있다고 규정한다. 언어 모델에 질문을 바로 요구하는 방식은 잘 작동하지 않기 때문에, 질문의 폭과 깊이를 늘리는 별도 전략이 필요하다는 것이 출발점이다.

저장소는 자신을 정보 큐레이션 층에서 동작하는 시스템으로 규정한다. 따라서 사용자는 STORM이나 Co-STORM을 실행하기 전에 두 가지를 먼저 구성해야 한다. 근거 문서를 찾아오는 retrieval 모듈과, 질문과 답과 글을 생성하는 언어 모델 모듈이다. 이 구성이 끝나면 각각의 `Runner` 클래스를 만들어 실행한다.

README는 시스템의 도달 수준도 함께 밝힌다. 상당한 편집을 요구하는 게재 준비 완료 상태의 글은 만들지 못하지만, 숙련 Wikipedia 편집자들이 pre-writing 단계에서는 유용하다고 평했다는 서술이다. 라이브 연구 프리뷰는 7만 명 이상이 시도했다.

## 핵심 개념

**retrieval**은 질문에 답할 근거 문서를 외부에서 찾아오는 단계다. 이 저장소에서 retrieval은 선택 요소가 아니라 전제 조건이다. README가 실행 전에 retrieval 모듈 구성을 요구하며, 글에 붙는 인용의 출처가 retrieval이 가져온 문서이기 때문이다.

**grounding**은 생성 결과를 외부 근거에 붙들어 매는 것을 뜻한다. STORM의 가상 전문가는 답을 grounding하고, Co-STORM의 사회자는 질문까지 grounding할 수 있다.

**Perspective-Guided Question Asking**은 입력 주제와 유사한 기존 글을 조사해 서로 다른 관점을 발견하고, 그 관점으로 질문 생성 과정을 통제하는 전략이다. 관점이 달라지면 같은 주제에 대해서도 서로 다른 질문이 나온다는 것이 전제다.

**Simulated Conversation**은 Wikipedia 작성자와 주제 전문가가 인터넷 출처에 근거해 나누는 대화를 시뮬레이션하는 조사 방식이다. 한 번의 질의응답으로 끝내지 않고 대화를 이어가면서 언어 모델이 주제 이해를 갱신하고 후속 질문을 던진다.

**mind map**은 Co-STORM이 수집 정보를 계층 개념 구조로 정리해 계속 갱신하는 공유 개념 공간이다. 사람과 시스템이 같은 개념 구조를 보게 만드는 장치로, README는 담론이 길고 깊어질 때 인지 부담을 줄이는 효과가 입증됐다고 밝힌다.

**turn management policy**는 여러 참여자 가운데 다음에 누가 발언할지를 정하는 규칙이다. Co-STORM의 협업 담론 프로토콜이 이 규칙을 구현해 LLM 에이전트와 사람의 발언 순서를 조율한다.

## 아키텍처

저장소에는 진입점이 서로 다른 두 엔진이 들어 있다. 어느 쪽을 쓸지는 사람이 조사 과정에 개입할 필요가 있는지로 갈린다.

| 항목 | STORM | Co-STORM |
|---|---|---|
| 진입 클래스 | `STORMWikiRunner` | `CoStormRunner` |
| 사람의 역할 | 주제 입력과 결과 확인 | 담론 참여자로 발화를 넣어 방향 조정 |
| 조사 방식 | 관점별 시뮬레이션 대화 | LLM 전문가와 사회자와 사람이 함께하는 담론 |
| 상태 유지 | outline과 참고문헌 집합 | mind map (계층 개념 구조) |
| 실행 단위 | `run`에 네 단계 플래그를 한 번에 넘긴다 | `warm_start()` 후 `step()`을 반복한다 |
| 결과 생성 | `do_polish_article` 단계까지 마치면 완성 | `generate_report()`를 원하는 시점에 호출 |
| 릴리스 | 2024/04 리팩터링 버전부터 | 2024/09 v1.0.0부터 |

### STORM 파이프라인

STORM은 인용이 달린 긴 글 생성을 두 단계로 분해한다. Pre-writing 단계는 인터넷 기반 조사로 참고문헌을 수집하고 outline을 생성한다. Writing 단계는 그 outline과 참고문헌으로 인용이 포함된 전체 길이의 글을 생성한다. 즉 조사와 집필이 한 번의 프롬프트에 섞이지 않고 분리된다.

커스터마이즈 단위는 네 모듈이다. 인터페이스는 `knowledge_storm/interface.py`에 정의되고 구현은 `knowledge_storm/storm_wiki/modules/*`에 있다. 인터페이스와 구현을 나눈 덕분에 모듈 하나만 교체할 수 있으며, README는 문단 대신 불릿 형식으로 섹션을 생성하는 변경을 예시로 든다.

| 모듈 | 역할 | 파이프라인 위치 |
|---|---|---|
| Knowledge Curation | 주제에 대해 폭넓은 범위의 정보를 수집한다 | Pre-writing |
| Outline Generation | 수집한 지식을 계층형 outline으로 조직한다 | Pre-writing |
| Article Generation | 생성된 outline을 수집 정보로 채운다 | Writing |
| Article Polishing | 작성된 글을 다듬어 표현을 개선한다 | Writing |

### 실행 진입점과 단계 플래그

실행 진입점은 `STORMWikiRunner` 클래스다. `run` 메서드에 단계별 플래그 네 개를 넘기고, 이후 `post_run()`과 `summary()`를 호출하는 것이 기본 사용 순서다. 검색 결과 개수는 `STORMWikiRunnerArguments`의 `search_top_k`로 retrieval 모듈에 전달한다.

플래그의 설계에서 주의할 점은 False가 "건너뛴다"가 아니라 "이전 실행 결과를 불러온다"라는 점이다. 따라서 조사 단계를 한 번 끝내 놓으면 `do_research`만 False로 바꿔 집필 단계를 여러 번 다시 시도할 수 있다.

| 플래그 | True일 때 동작 | False일 때 동작 |
|---|---|---|
| `do_research` | 서로 다른 관점의 대화를 시뮬레이션해 주제 정보를 수집한다 | 이전 수집 결과를 불러온다 |
| `do_generate_outline` | 주제에 대한 outline을 생성한다 | 이전 outline을 불러온다 |
| `do_generate_article` | outline과 수집 정보로 글을 생성한다 | 이전 글을 불러온다 |
| `do_polish_article` | 요약 섹션을 추가하고 선택적으로 중복 내용을 제거한다 | 이전 결과를 불러온다 |

### 역할별 언어 모델 구성

README는 STORM을 여러 구성 요소가 각각 언어 모델을 호출하는 LM 시스템으로 설명하고, 구성 요소마다 다른 모델을 붙여 비용과 품질의 균형을 맞추라고 권한다. 권장 관행은 두 가지로 명시된다. 질의를 분해하고 대화에서 답을 종합하는 `conv_simulator_lm`에는 값싸고 빠른 모델을 쓰고, 인용이 달린 검증 가능한 텍스트를 만드는 `article_gen_lm`에는 더 강한 모델을 쓴다.

예시 코드는 `STORMWikiLMConfigs`에 setter 다섯 개로 모델을 주입한다. 모델은 `LitellmModel`로 감싸고, `temperature` 1.0과 `top_p` 0.9를 공통 인자로 넘긴다.

| setter | 담당 작업 | 예시 모델 | max_tokens |
|---|---|---|---|
| `set_conv_simulator_lm` | 질의 분해와 대화 중 답 종합 | gpt-3.5-turbo | 500 |
| `set_question_asker_lm` | 질문 생성 | gpt-3.5-turbo | 500 |
| `set_outline_gen_lm` | outline 생성 | gpt-4o | 3000 |
| `set_article_gen_lm` | 인용 포함 본문 생성 | gpt-4o | 3000 |
| `set_article_polish_lm` | 글 다듬기 | gpt-4o | 3000 |

setter마다 max_tokens가 다른 이유는 작업별 출력 길이 차이다. 질문 생성과 대화 시뮬레이션에는 500 토큰이 배정되고, outline과 인용이 달린 본문 생성에는 그보다 여섯 배인 3000 토큰이 배정된다.

### Co-STORM 협업 담론 엔진

Co-STORM은 사람을 파이프라인 밖의 사용자가 아니라 담론의 참여자로 넣는다. 이를 위해 협업 담론 프로토콜(collaborative discourse protocol)을 제안하고, 그 안에서 turn management policy로 참여자 간 협업을 조율한다. 예시 구현은 `knowledge_storm/collaborative_storm/engine.py`의 `DiscourseManager`다.

에이전트 쪽도 교체 가능하게 분리돼 있다. LLM 에이전트 인터페이스는 `knowledge_storm/interface.py`에 있고 구현은 `knowledge_storm/collaborative_storm/modules/co_storm_agents.py`에 있어, 에이전트 policy를 따로 바꿀 수 있다.

| 참여자 | 역할 | 근거 사용 |
|---|---|---|
| Co-STORM LLM 전문가 | 답을 생성하거나 담론 이력을 바탕으로 후속 질문을 제기한다 | 외부 지식 소스에 근거한다 |
| Moderator | retrieval이 찾았지만 이전 턴에서 직접 쓰이지 않은 정보에서 착안해 생각을 자극하는 질문을 만든다 | 질문 생성도 grounding할 수 있다 |
| 인간 사용자 | 담론을 관찰해 주제를 깊이 이해하거나, 발화를 넣어 논의 초점을 직접 조정한다 | 해당 없음 |

사회자 에이전트의 질문 재료가 다른 참여자와 다르다는 점이 이 구성의 특징이다. retrieval이 가져왔지만 아직 쓰이지 않은 정보에서 질문을 만들기 때문에, 담론이 이미 나온 내용 안에서만 이어지는 것을 막는 위치에 놓인다.

### Co-STORM 실행 흐름

실행은 `CoStormRunner`가 담당한다. 생성에 필요한 구성 요소는 네 가지다.

| 구성 요소 | 역할 |
|---|---|
| `CollaborativeStormLMConfigs` | 역할별 언어 모델 구성을 담는다 |
| `RunnerArgument` | 주제와 `retrieve_top_k` 등 실행 인자를 담는다 |
| `LoggingWrapper` | 실행 로그를 남긴다 |
| retrieval 모듈 | 근거 문서를 검색한다 (예시는 `BingSearch`) |

호출 순서는 예열, 담론 진행, 리포트 생성의 세 국면으로 나뉜다. README는 담론 진행 단계의 두 호출을 순서와 횟수에 제약 없이 반복할 수 있다고 명시한다. 관찰만 하다가 중간에 발화를 넣고 다시 관찰로 돌아오는 사용이 가능하다는 뜻이다.

| 호출 | 국면 | 하는 일 |
|---|---|---|
| `warm_start()` | 예열 | Co-STORM과 사용자 사이의 공유 개념 공간을 만든다 |
| `step()` | 담론 진행 | 담론을 한 턴 진행하고 그 턴을 반환한다. 관찰할 때 쓴다 |
| `step(user_utterance=...)` | 담론 진행 | 사용자 발화를 넣어 대화 방향을 직접 조정한다 |
| `knowledge_base.reorganize()` | 리포트 생성 | mind map을 재편한다 |
| `generate_report()` | 리포트 생성 | 담론 결과로 최종 글을 생성한다 |

Co-STORM도 STORM과 같은 다중 LM 시스템 방식을 따르며, 역할 여섯 개에 각각 다른 max_tokens를 준다. 예시는 여섯 역할 모두 GPT-4o 계열 모델을 쓰므로, 비용 조절 수단은 모델 등급이 아니라 출력 길이 상한이다.

| setter | max_tokens |
|---|---|
| `set_utterance_polishing_lm` | 2000 |
| `set_question_answering_lm` | 1000 |
| `set_knowledge_base_lm` | 1000 |
| `set_discourse_manage_lm` | 500 |
| `set_warmstart_outline_gen_lm` | 500 |
| `set_question_asking_lm` | 300 |

배정값은 발화 다듬기가 2000으로 가장 크고 질문 생성이 300으로 가장 작다. 담론 관리와 warm-start outline 생성은 그 사이인 500이다. 짧은 질문 한 개와 다듬어진 발화 문단 사이의 길이 차이가 설정에 그대로 나타난다.

## 지원 모델과 retrieval 백엔드

모델 계층은 litellm이 담당한다. 따라서 지원 범위는 이 저장소가 따로 관리하는 목록이 아니라 litellm의 지원 목록을 그대로 따른다. retrieval 모듈만 저장소가 직접 구현해 10종을 제공한다.

| 구성 요소 | 지원 범위 |
|---|---|
| 언어 모델 | litellm이 지원하는 모든 모델 |
| 임베딩 모델 | litellm이 지원하는 모든 임베딩 모델 |
| retrieval 모듈 | `YouRM`, `BingSearch`, `VectorRM`, `SerperRM`, `BraveRM`, `SearXNG`, `DuckDuckGoSearchRM`, `TavilySearchRM`, `GoogleSearch`, `AzureAISearch` |

10종 가운데 `VectorRM`은 성격이 다르다. 웹 검색 엔진을 호출하는 대신 사용자가 제공한 문서에 grounding하도록 2024/07에 추가됐다. 예를 들어 사내 자료를 근거로 글을 쓰려면 이 모듈을 쓴다. README는 `knowledge_storm/rm.py`에 검색 엔진이나 retriever를 더 통합하는 PR을 특히 환영한다고 밝힌다.

## 설치와 설정

### 설치 경로

설치 경로는 두 가지이고, 선택 기준은 엔진 내부를 수정할 필요가 있는지다.

| 경로 | 명령 | 용도 |
|---|---|---|
| 패키지 | `pip install knowledge-storm` | 파이프라인을 그대로 쓴다 |
| 소스 | 저장소 clone 후 `conda create -n storm python=3.11`로 환경을 만들고 `pip install -r requirements.txt` | STORM 엔진 동작을 직접 수정한다 |

모듈 커스터마이즈와 에이전트 policy 교체는 소스 설치를 전제로 한다. README의 커스터마이즈 절 두 개가 모두 "소스 코드를 설치했다면"으로 시작한다.

### API 키 설정

API 키는 저장소 루트에 `secrets.toml` 파일을 만들어 설정하는 방식을 권한다. README 예시는 키를 언어 모델, retriever, encoder 세 묶음으로 나눈다. 아래 표는 언어 모델 묶음을 공통 키와 Azure 전용 키로 다시 나눠 네 행으로 적었다.

| 묶음 | 키 | 비고 |
|---|---|---|
| 언어 모델 | `OPENAI_API_KEY`, `OPENAI_API_TYPE` | `OPENAI_API_TYPE`은 `openai` 또는 `azure` |
| 언어 모델 (Azure) | `AZURE_API_BASE`, `AZURE_API_VERSION` | Microsoft Azure API를 쓸 때만 추가한다 |
| retriever | `BING_SEARCH_API_KEY` | Bing 검색을 쓸 때 |
| encoder | `ENCODER_API_TYPE` | OpenAI encoder를 쓸 때 `openai` |

### 예제 스크립트

`examples` 폴더는 구성별 실행 스크립트를 제공한다. 두 스크립트 모두 `--output-dir`와 `--retriever bing`을 공통으로 받는다.

| 스크립트 | 실행 방법 |
|---|---|
| `examples/storm_examples/run_storm_wiki_gpt.py` | 네 단계 플래그(`--do-research`, `--do-generate-outline`, `--do-generate-article`, `--do-polish-article`)를 함께 넘긴다 |
| `examples/costorm_examples/run_costorm_gpt.py` | `secrets.toml`에 `BING_SEARCH_API_KEY`와 `ENCODER_API_TYPE`을 먼저 추가한다 |

다른 언어 모델을 쓰거나 자체 코퍼스에 grounding하는 방법은 `examples/storm_examples/README.md`가 안내한다. 로컬 개발과 데모 호스팅에는 2024/07에 공개된 streamlit 기반 demo light를 쓸 수 있다.

## 데이터셋과 재현

저장소는 자동 지식 큐레이션과 복잡한 정보 탐색 연구를 위해 데이터셋 두 종을 공개한다. 둘 다 Hugging Face에 올라가 있다.

| 데이터셋 | 구성 | 출처 절 |
|---|---|---|
| FreshWiki | 2022년 2월부터 2023년 9월까지 편집이 가장 활발했던 고품질 Wikipedia 문서 100편 | STORM 논문 2.1절 |
| WildSeek | 주제와 그 주제에 대한 사용자의 딥서치 목표를 짝지은 데이터 | Co-STORM 논문 2.2절과 부록 A |

두 데이터셋의 구성 방식에는 각각 이유가 있다. FreshWiki는 데이터 오염을 완화하려고 구성 파이프라인 코드까지 `NAACL-2024-code-backup` 브랜치에 보관해, 이후 시점에 같은 절차로 새 문서를 다시 모을 수 있게 했다. WildSeek는 웹 연구 프리뷰에서 실제로 수집된 데이터를 쓰되 주제 다양성과 품질을 확보하려고 다운샘플링했다.

논문 실험 재현은 브랜치를 나눠 지원한다. STORM은 `NAACL-2024-code-backup`, Co-STORM은 `EMNLP-2024-code-backup`이다.

## 릴리스 히스토리

README의 "Latest News" 절은 소식 9건을 시간순으로 밝힌다. 같은 시점에 여러 건이 묶인 경우가 있어 아래 표에서는 시점 6개로 합쳤다. 흐름은 인터페이스 정리, 검색 백엔드 확장, 패키지 배포, Co-STORM 통합, 모델 계층 추상화 순서다.

| 시점 | 변경 |
|---|---|
| 2024/04 | 리팩터링 릴리스. `interface.py`로 파이프라인 인터페이스를 정의하고 `storm_wiki`로 재구현 |
| 2024/05 | `rm.py`에 Bing Search 지원. 데모의 글 생성 부분을 GPT-4o로 설정 |
| 2024/06 | NAACL 2024 Poster Session 2(6월 17일) 발표, 자료를 `assets/storm_naacl2024_slides.pdf`로 공개 |
| 2024/07 | PyPI 배포 시작, `VectorRM` 추가(PR #58), streamlit 기반 demo light 공개(PR #54) |
| 2024/09 | Co-STORM 도입과 코드 공개, `knowledge-storm` v1.0.0 통합. Co-STORM 논문 EMNLP 2024 main 채택 |
| 2025/01 | 언어 모델과 임베딩 모델에 litellm 통합, v1.1.0 |

2025/01의 litellm 통합은 모델 지원 범위를 저장소 외부에 넘긴 변경이다. 이 시점 이후로 지원 모델 목록은 저장소의 구현이 아니라 litellm의 지원 목록을 따라 늘어난다.

## 라이선스와 인용

코드는 MIT 라이선스이며, 이 값은 저장소의 LICENSE 파일을 기준으로 기록했다. README 본문의 Acknowledgement 절은 FreshWiki 데이터셋이 Wikipedia에서 온 자료라 CC BY-SA를 따른다고 밝힌다. 코드와 데이터셋의 조건이 다르므로 인용과 재배포 시 구분해야 한다.

| 대상 | 라이선스 | 근거 |
|---|---|---|
| 코드 | MIT | 저장소 LICENSE 파일 |
| FreshWiki 데이터셋 | CC BY-SA | Wikipedia 출처, README Acknowledgement |

인용은 논문 두 편을 대상으로 한다. STORM은 NAACL 2024 논문(Shao, Jiang, Kanell, Xu, Khattab, Lam, pp.6252-6278), Co-STORM은 EMNLP 2024 main 논문(Jiang, Shao, Ma, Semnani, Lam, pp.9917-9955)이다. 문의는 Yijia Shao(shaoyj@stanford.edu)와 Yucheng Jiang(yuchengj@stanford.edu)이 받는다.

## 한계

- **게재 가능 수준 미달**: README는 시스템이 상당한 편집을 필요로 하는 게재 준비 완료 상태의 글은 만들지 못한다고 명시한다. 실무 유용성은 pre-writing 단계 보조에 있다.
- **비용과 품질의 균형**: 두 엔진 모두 구성 요소마다 언어 모델을 호출하는 다중 LM 시스템이다. README는 이를 비용과 품질의 균형 문제로 다루며, 값싼 모델과 강한 모델을 역할별로 나누고 역할마다 max_tokens를 제한하는 방식을 제시한다. 저장소가 총 비용이나 지연 수치를 제시하지는 않는다.
- **retrieval과 API 키 의존**: 정보 큐레이션 층에서 동작하므로 외부 검색 API와 encoder API 키 없이는 실행되지 않는다. 생성의 근거는 retrieval이 찾아온 문서이며, 검색 결과에서 비롯되는 편향 전이와 과잉 추론 문제는 [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]]가 편집자 평가와 인용 품질 실험으로 다룬다.
- **재현 브랜치 상태**: Co-STORM 논문 실험용 `EMNLP-2024-code-backup` 브랜치는 README 작성 시점에 자리표시자 상태이며 갱신 예정이라고 밝힌다.
- **로드맵**: 팀이 진행 중인 방향은 두 가지다. Human-in-the-Loop 기능은 지식 큐레이션 과정에 사용자 참여를 확대하는 것이고, Information Abstraction은 Wikipedia 스타일 리포트를 넘어선 표현 형식을 지원하는 추상화를 개발하는 것이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| STORM | Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking의 약어. 주제에서 retrieval과 다관점 질문을 거쳐 outline과 글을 합성한다 |
| Co-STORM | collaborative STORM. 협업 담론 프로토콜, moderator 에이전트, mind map을 더해 사람과 AI가 함께 지식을 큐레이션하게 한 확장 |
| Perspective-Guided Question Asking | 유사 주제 글을 조사해 발견한 관점으로 질문 생성을 통제하는 전략 |
| Simulated Conversation | Wikipedia 작성자와 주제 전문가의 대화를 시뮬레이션해 주제 이해를 갱신하고 후속 질문을 끌어내는 조사 방식 |
| 협업 담론 프로토콜 | turn management policy로 여러 에이전트와 인간의 발언 순서를 조율하는 Co-STORM의 핵심 장치 |
| mind map | Co-STORM이 수집 정보를 계층 개념 구조로 정리해 동적으로 갱신하는 공유 개념 공간 |

## 관련 페이지

- [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]]: 이 저장소가 구현하는 STORM 원논문. 관점 발견과 시뮬레이션 대화의 수식 수준 방법론, FreshWiki 기반 정량 평가, 편집자 10명 평가를 담당한다. 이 페이지는 그 방법론의 실행 코드, 설치, 설정, API를 담당한다
- [[database/athina-ai-rag-cookbooks]]: agentic RAG 기법 cookbook. retrieval 결과를 조사와 종합의 재료로 쓰는 접근을 실습 노트북으로 모았다
- [[database/nirdiamant-rag-techniques]]: advanced RAG 기법 카탈로그. STORM의 retrieval 기반 지식 큐레이션과 문제의식이 겹친다
- [[agents/ai-boost-awesome-harness-engineering]]: 에이전트 harness 엔지니어링 자료 모음. 같은 agents 카테고리의 실행 환경 관점 자료다
