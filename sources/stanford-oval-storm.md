---
title: "stanford-oval/storm: STORM & Co-STORM"
type: repo
year: 2024
category: agents
raw_path: raw/repos/stanford-oval-storm.md
raw_filename: "stanford-oval-storm.md"
source_collection: external
org: "stanford-oval"
repo: "storm"
url: "https://github.com/stanford-oval/storm"
license: "MIT (코드), FreshWiki 데이터셋은 CC BY-SA"
tags: [storm, co-storm, multi-agent, question-asking, retrieval, dspy, litellm, wikipedia-generation, knowledge-curation, stanford-oval]
---

## 한 줄 요약 (One-line Summary)

`stanford-oval/storm`은 주제 하나를 입력받아 인터넷 검색을 근거로 Wikipedia 스타일 글을 처음부터 작성하는 LLM 시스템의 공식 구현체다. README는 연구 자동화의 핵심을 "좋은 질문을 자동으로 만들어 내는 일"로 규정하고, 여러 관점(perspective)에서 질문을 생성해 retrieval과 시뮬레이션 대화를 반복한다. 자동 파이프라인 STORM과 사람이 담론에 참여하는 Co-STORM 두 엔진으로 구성되며, DSPy 기반 모듈 구조에 litellm을 결합해 언어 모델과 임베딩 모델을 교체할 수 있다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저장소 | `stanford-oval/storm` (Stanford OVAL 연구실) |
| 배포 | PyPI `knowledge-storm` 패키지 |
| 라이선스 | 코드 MIT (repo LICENSE 파일), FreshWiki 데이터셋은 Wikipedia 출처라 CC BY-SA (README Acknowledgement) |
| 연구 프리뷰 | http://storm.genie.stanford.edu (README 기준 이용자 7만 명 이상, 호스팅은 Vercel 지원) |
| 웹사이트 | https://storm-project.stanford.edu/ |
| 논문 1 | STORM, NAACL 2024, arXiv:2402.14207, pp.6252-6278. 저자 Shao, Jiang, Kanell, Xu, Khattab, Lam |
| 논문 2 | Co-STORM, EMNLP 2024 main, arXiv:2408.15232, pp.9917-9955. 저자 Jiang, Shao, Ma, Semnani, Lam |
| 연락 | Yijia Shao(shaoyj@stanford.edu), Yucheng Jiang(yuchengj@stanford.edu) |
| 데이터셋 | FreshWiki, WildSeek (둘 다 Hugging Face 공개) |
| 재현 브랜치 | `NAACL-2024-code-backup`(STORM), `EMNLP-2024-code-backup`(Co-STORM) |

README의 "Latest News" 절은 소식 9건을 시간순으로 밝힌다. 같은 시점에 여러 건이 묶인 경우가 있어 아래 표에서는 시점 6개로 합쳤다.

| 시점 | 변경 |
|---|---|
| 2024/04 | 리팩터링 릴리스. `interface.py`로 파이프라인 인터페이스를 정의하고 `storm_wiki`로 재구현 |
| 2024/05 | `rm.py`에 Bing Search 지원. 데모의 글 생성 부분을 GPT-4o로 설정 |
| 2024/06 | NAACL 2024 Poster Session 2(6월 17일) 발표, 자료를 `assets/storm_naacl2024_slides.pdf`로 공개 |
| 2024/07 | PyPI 배포 시작, `VectorRM` 추가(PR #58), streamlit 기반 demo light 공개(PR #54) |
| 2024/09 | Co-STORM 도입과 코드 공개, v1.0.0 통합. Co-STORM 논문 EMNLP 2024 main 채택 |
| 2025/01 | 언어 모델과 임베딩 모델에 litellm 통합, v1.1.0 |

## 2. 주요 기여 (Key Contributions)

1. **질문 생성을 연구 자동화의 핵심으로 규정.** README는 좋은 질문을 자동으로 떠올리는 일이 연구 자동화의 핵심이며, 언어 모델에 질문을 바로 요구하는 방식은 잘 작동하지 않는다고 밝힌다.
2. **Perspective-Guided Question Asking.** 입력 주제와 유사한 기존 글을 조사해 서로 다른 관점을 발견하고, 그 관점으로 질문 생성 과정을 통제한다.
3. **Simulated Conversation.** Wikipedia 작성자와 주제 전문가가 인터넷 출처에 근거해 나누는 대화를 시뮬레이션해, 언어 모델이 주제 이해를 갱신하고 후속 질문을 던지게 한다.
4. **Co-STORM의 협업 담론 프로토콜.** LLM 전문가 여러 명과 사회자(moderator) 에이전트, 인간 사용자가 한 대화에 참여하고, 수집한 정보를 계층 개념 구조인 mind map으로 계속 갱신한다.
5. **모듈식 구현과 모델 교체 가능성.** 두 엔진 모두 DSPy로 고도로 모듈화해 구현했고, litellm이 지원하는 언어 모델과 임베딩 모델을 그대로 쓸 수 있다. retrieval 모듈은 10종을 제공한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### STORM 파이프라인

README는 인용이 달린 긴 글 생성을 두 단계로 분해한다. Pre-writing 단계는 인터넷 기반 조사로 참고문헌을 수집하고 outline을 생성한다. Writing 단계는 그 outline과 참고문헌으로 인용이 포함된 전체 길이의 글을 생성한다.

커스터마이즈 단위는 네 모듈이다. 인터페이스는 `knowledge_storm/interface.py`에 정의되고 구현은 `knowledge_storm/storm_wiki/modules/*`에 있다. README는 문단 대신 불릿 형식으로 섹션을 생성하는 식의 변경을 예시로 든다.

| 모듈 | 역할 |
|---|---|
| Knowledge Curation | 주제에 대해 폭넓은 범위의 정보를 수집한다 |
| Outline Generation | 수집한 지식을 계층형 outline으로 조직한다 |
| Article Generation | 생성된 outline을 수집 정보로 채운다 |
| Article Polishing | 작성된 글을 다듬어 표현을 개선한다 |

실행 진입점은 `STORMWikiRunner` 클래스이고, `run` 메서드에 단계별 플래그 네 개를 넘긴다. 각 플래그가 True면 해당 단계를 수행하고, False면 이전 실행 결과를 불러온다. 즉 중간 단계부터 다시 시작할 수 있다.

| 플래그 | True일 때 |
|---|---|
| `do_research` | 서로 다른 관점의 대화를 시뮬레이션해 주제 정보를 수집한다 |
| `do_generate_outline` | 주제에 대한 outline을 생성한다 |
| `do_generate_article` | outline과 수집 정보로 글을 생성한다 |
| `do_polish_article` | 요약 섹션을 추가하고 선택적으로 중복 내용을 제거한다 |

`run` 이후에는 `post_run()`과 `summary()`를 호출한다. 검색 결과 개수는 `STORMWikiRunnerArguments`의 `search_top_k`로 retrieval 모듈에 전달한다.

README는 STORM을 LM 시스템으로 설명하며, 구성 요소마다 다른 모델을 붙여 비용과 품질의 균형을 맞추라고 권한다. 질의를 분해하고 답을 종합하는 `conv_simulator_lm`에는 값싸고 빠른 모델을, 인용이 달린 검증 가능한 텍스트를 만드는 `article_gen_lm`에는 더 강한 모델을 쓰는 것이 권장 관행이다. 예시 코드는 `STORMWikiLMConfigs`에 setter 5개로 모델을 주입한다. `set_conv_simulator_lm`과 `set_question_asker_lm`에는 gpt-3.5-turbo(max_tokens 500), `set_outline_gen_lm`, `set_article_gen_lm`, `set_article_polish_lm`에는 gpt-4o(max_tokens 3000)를 넣고, 모델은 `LitellmModel`로 감싼다.

### Co-STORM 협업 담론 엔진

Co-STORM은 협업 담론 프로토콜(collaborative discourse protocol)을 제안한다. 이 프로토콜은 turn management policy를 구현해 참여자 간 협업을 조율하며, 예시 구현이 `knowledge_storm/collaborative_storm/engine.py`의 `DiscourseManager`다. LLM 에이전트 인터페이스는 `interface.py`에 있고 구현은 `knowledge_storm/collaborative_storm/modules/co_storm_agents.py`에 있어, 에이전트 policy를 따로 교체할 수 있다.

| 참여자 | 역할 |
|---|---|
| Co-STORM LLM 전문가 | 외부 지식 소스에 근거해 답을 생성하거나, 담론 이력을 바탕으로 후속 질문을 제기한다 |
| Moderator | retrieval이 찾았지만 이전 턴에서 직접 쓰이지 않은 정보에서 착안해 생각을 자극하는 질문을 만든다. 질문 생성도 grounding할 수 있다 |
| 인간 사용자 | 담론을 관찰해 주제를 깊이 이해하거나, 발화를 넣어 논의 초점을 직접 조정한다 |

Co-STORM은 수집 정보를 계층 개념 구조로 조직하는 mind map을 동적으로 갱신한다. 목표는 인간 사용자와 시스템 사이에 공유 개념 공간을 만드는 것이며, README는 담론이 길고 깊어질 때 mind map이 인지 부담을 줄이는 효과가 입증됐다고 밝힌다.

실행은 `CoStormRunner`가 담당하고, 생성에는 `CollaborativeStormLMConfigs`(모델 구성), `RunnerArgument`(주제와 `retrieve_top_k` 등 실행 인자), `LoggingWrapper`(로깅), retrieval 모듈이 필요하다. `warm_start()`로 공유 개념 공간을 예열한 뒤 `step()`으로 담론을 한 턴 진행하고, `step(user_utterance=...)`로 사용자 발화를 넣어 방향을 조정한다. README는 두 호출을 순서와 횟수에 제약 없이 반복할 수 있다고 명시한다. 마지막에 `knowledge_base.reorganize()`로 mind map을 재편하고 `generate_report()`로 최종 글을 생성한다. 역할 6개에는 각각 다른 max_tokens를 주며, `set_utterance_polishing_lm` 2000, `set_question_answering_lm`과 `set_knowledge_base_lm` 각 1000, `set_discourse_manage_lm`과 `set_warmstart_outline_gen_lm` 각 500, `set_question_asking_lm` 300이다.

### 공통 인프라와 retrieval

STORM과 Co-STORM은 모두 정보 큐레이션 층에서 동작하므로, 사용자는 retrieval 모듈과 언어 모델 모듈을 먼저 구성한 뒤 각각의 `Runner` 클래스를 만든다. retrieval은 질문에 답할 근거 문서를 외부에서 찾아오는 단계다.

| 구성 요소 | 지원 범위 |
|---|---|
| 언어 모델 | litellm이 지원하는 모든 모델 |
| 임베딩 모델 | litellm이 지원하는 모든 임베딩 모델 |
| retrieval 모듈 | `YouRM`, `BingSearch`, `VectorRM`, `SerperRM`, `BraveRM`, `SearXNG`, `DuckDuckGoSearchRM`, `TavilySearchRM`, `GoogleSearch`, `AzureAISearch` (10종) |

`VectorRM`은 검색 엔진 대신 사용자가 제공한 문서에 grounding하도록 2024/07에 추가됐다. grounding은 생성 결과를 외부 근거에 붙들어 매는 것을 뜻한다. README는 `knowledge_storm/rm.py`에 검색 엔진이나 retriever를 더 통합하는 PR을 특히 환영한다고 밝힌다.

### 설치와 실행 설정

설치 경로는 패키지 설치(`pip install knowledge-storm`)와 소스 설치 두 가지다. 소스 설치는 저장소를 clone한 뒤 `conda create -n storm python=3.11`로 환경을 만들고 `pip install -r requirements.txt`를 실행하며, STORM 엔진 동작을 직접 수정할 수 있다.

API 키는 저장소 루트에 `secrets.toml`을 만들어 설정하는 방식을 권한다. 예시는 키를 세 묶음으로 나눈다. 언어 모델은 `OPENAI_API_KEY`와 `OPENAI_API_TYPE`이고 Azure를 쓸 때 `AZURE_API_BASE`와 `AZURE_API_VERSION`을 더한다. retriever는 `BING_SEARCH_API_KEY`, encoder는 `ENCODER_API_TYPE`이다. `examples` 폴더에는 구성별 실행 스크립트 `run_storm_wiki_gpt.py`와 `run_costorm_gpt.py`가 있고, 다른 언어 모델을 쓰거나 자체 코퍼스에 grounding하는 방법은 `examples/storm_examples/README.md`가 안내한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 지표를 본문에 싣지 않고 두 논문과 데이터셋으로 위임한다. 대신 사용 규모와 정성 평가를 밝힌다. 라이브 연구 프리뷰를 7만 명 이상이 시도했고, 시스템은 상당한 편집을 요구하는 게재 가능 수준의 글은 만들지 못하지만 숙련 Wikipedia 편집자들이 pre-writing 단계에서 유용하다고 평했다는 서술이다. 두 데이터셋은 Hugging Face에 공개돼 있다.

| 데이터셋 | 구성 | 용도와 출처 |
|---|---|---|
| FreshWiki | 2022년 2월부터 2023년 9월까지 편집이 가장 활발했던 고품질 Wikipedia 문서 100편 | STORM 논문 2.1절. 데이터 오염 완화를 위해 구성 파이프라인 코드를 `NAACL-2024-code-backup` 브랜치에 보관해 이후 시점에도 재구축할 수 있다 |
| WildSeek | 주제와 그 주제에 대한 사용자의 딥서치 목표를 짝지은 데이터 | 웹 연구 프리뷰 수집 데이터에서 만들었고 주제 다양성과 품질을 위해 다운샘플링했다. Co-STORM 논문 2.2절과 부록 A |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **게재 가능 수준 미달**: README는 시스템이 상당한 편집을 필요로 하는 게재 준비 완료 상태의 글은 만들지 못한다고 명시한다. 유용성은 pre-writing 단계 보조에 있다.
- **비용과 품질의 균형**: STORM은 여러 구성 요소가 각각 언어 모델을 호출하는 다중 LM 시스템이다. README는 이를 비용과 품질의 균형 문제로 설명하며, 값싼 모델과 강한 모델을 역할별로 나누고 역할마다 max_tokens를 제한하는 방식을 제시한다.
- **retrieval과 API 키 의존**: 두 엔진 모두 정보 큐레이션 층에서 동작하므로 외부 검색 API와 encoder API 키 없이는 실행되지 않는다. 생성의 근거는 retrieval이 찾아온 문서다. 검색 결과에서 비롯되는 편향과 과잉 추론 문제는 [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]]가 실험으로 다룬다.
- **재현 브랜치 상태**: Co-STORM 논문 실험용 `EMNLP-2024-code-backup` 브랜치는 README 작성 시점에 자리표시자 상태이며 갱신 예정이라고 밝힌다.
- **로드맵**: 팀이 진행 중인 방향은 두 가지다. (1) Human-in-the-Loop 기능으로 지식 큐레이션 과정에 사용자 참여를 확대하는 것, (2) Information Abstraction으로 Wikipedia 스타일 리포트를 넘어선 표현 형식을 지원하는 추상화를 개발하는 것이다.

## 6. 관련 연구 (Related Work)

- **STORM 원논문**: 이 저장소는 NAACL 2024 논문의 구현체다. 방법론의 수식 수준 서술과 정량 평가는 [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]]에 있다.
- **DSPy**: README는 STORM과 Co-STORM이 모두 DSPy로 고도로 모듈화돼 구현됐다고 밝힌다. 프롬프트를 선언적 모듈로 조립하는 프레임워크다.
- **litellm**: 여러 공급자의 언어 모델과 임베딩 모델을 하나의 인터페이스로 호출하는 계층이다. 2025/01 v1.1.0에서 통합됐다.
- **retrieval 기반 지식 큐레이션**: 검색 결과를 조사와 종합의 재료로 쓰는 접근이라, RAG 계열 기법 카탈로그와 문제의식이 겹친다.

## 7. 용어집 (Glossary)

- **STORM**: Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking의 약어. 주제에서 retrieval과 다관점 질문을 거쳐 outline과 글을 합성한다.
- **Co-STORM**: collaborative STORM. 인간과 AI가 함께 지식을 큐레이션하도록 협업 담론 프로토콜, moderator 에이전트, mind map을 더한 확장이다.
- **Perspective-Guided Question Asking**: 유사 주제 글을 조사해 발견한 관점으로 질문 생성을 통제하는 전략.
- **Simulated Conversation**: Wikipedia 작성자와 주제 전문가의 대화를 시뮬레이션해 주제 이해를 갱신하고 후속 질문을 끌어내는 조사 방식.
- **협업 담론 프로토콜(collaborative discourse protocol)**: turn management policy로 여러 에이전트와 인간의 발언 순서를 조율하는 Co-STORM의 핵심 장치.
- **mind map**: Co-STORM이 수집 정보를 계층 개념 구조로 정리해 동적으로 갱신하는 공유 개념 공간.
