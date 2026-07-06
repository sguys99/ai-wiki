---
title: "stanford-oval/storm — STORM & Co-STORM"
type: repo
year: 2024
category: agents
raw_path: raw/repos/stanford-oval-storm.md
raw_filename: "stanford-oval-storm.md"
source_collection: external
org: "stanford-oval"
repo: "storm"
url: "https://github.com/stanford-oval/storm"
license: "MIT (코드) · FreshWiki 데이터셋은 CC BY-SA"
tags: [storm, co-storm, multi-agent, question-asking, retrieval, dspy, litellm, wikipedia-generation, knowledge-curation, stanford-oval]
---

## 한 줄 요약 (One-line Summary)

`stanford-oval/storm`은 주제 하나만 던지면 인터넷 검색으로 처음부터 Wikipedia 스타일 글을 써 내는 LLM 시스템이다. "좋은 질문을 자동으로 만들어 내는 일"을 연구 자동화의 급소로 보고, 여러 관점(perspective)에서 질문을 생성해 검색과 대화를 굴린다. STORM(자동 파이프라인)과 Co-STORM(사람이 끼어드는 협업형) 두 갈래로 나뉘며, DSPy 위에 모듈식으로 짜여 litellm이 지원하는 LM·임베더는 무엇이든 갈아 끼운다.

## 1. 자료 정보 (Document Information)

- **저장소**: `stanford-oval/storm` (https://github.com/stanford-oval/storm), Stanford OVAL 연구실
- **배포**: PyPI `knowledge-storm` 패키지 (`pip install knowledge-storm`)
- **라이선스**: 코드 MIT(repo LICENSE), FreshWiki 데이터셋은 Wikipedia 출처라 CC BY-SA
- **연구 프리뷰**: http://storm.genie.stanford.edu — 라이브 프리뷰 이용자 7만 명 이상
- **논문 두 편**:
  - STORM — "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models" (NAACL 2024, arXiv:2402.14207)
  - Co-STORM — "Into the Unknown Unknowns: Engaged Human Learning through Participation in Language Model Agent Conversations" (EMNLP 2024 main, arXiv:2408.15232)
- **연락**: Yijia Shao(shaoyj@stanford.edu), Yucheng Jiang(yuchengj@stanford.edu)
- **데이터셋**: FreshWiki(가장 많이 편집된 위키 문서 100편), WildSeek(주제 + 사용자의 딥서치 목표 쌍) — 둘 다 Hugging Face 공개
- **버전 히스토리**: 2024/04 리팩터링(interface 정의) → 2024/05 Bing·GPT-4o → 2024/07 PyPI 배포·`VectorRM`(사용자 문서 grounding)·streamlit demo light → 2024/09 Co-STORM 통합(v1.0.0) → 2025/01 litellm 통합(v1.1.0)

## 2. 주요 기여 (Key Contributions)

1. **질문 생성을 연구 자동화의 핵심으로 재정의.** 좋은 글을 쓰는 병목은 서술이 아니라 "무엇을 물을지"다. STORM은 이 질문 생성 자체를 자동화 대상으로 놓는다.
2. **Perspective-Guided Question Asking.** 유사 주제의 기존 글을 훑어 서로 다른 관점을 발굴하고, 관점별로 질문을 나눠 던져 조사의 폭과 깊이를 함께 넓힌다.
3. **Simulated Conversation.** 위키 작성자와 주제 전문가가 인터넷 출처에 근거해 나누는 대화를 시뮬레이션해 참고문헌을 모은다.
4. **Co-STORM의 협업형 담론.** 여러 LLM 전문가에 사회자(moderator) 에이전트와 인간 사용자가 한 대화에 참여하고, 수집한 정보를 계층적 mind map으로 실시간 정리한다.
5. **모듈식·모델 무관 설계.** DSPy 기반 모듈 구조에 litellm 연동을 얹어 LM·임베더를 자유롭게 교체하고, 검색 백엔드도 10종을 갖춰 손쉽게 갈아 끼운다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**STORM — 2단계 파이프라인:**
- **Pre-writing(사전 집필)**: 인터넷 조사로 참고문헌을 모으고 outline을 만든다. 이 단계에서 perspective-guided 질문과 simulated conversation이 돌아간다.
- **Writing(집필)**: outline과 참고문헌으로 인용이 달린 전체 글을 생성한다.
- 커스터마이즈 단위는 네 모듈이다 — Knowledge Curation, Outline Generation, Article Generation, Article Polishing. 인터페이스는 `knowledge_storm/interface.py`, 구현은 `knowledge_storm/storm_wiki/modules/*`에 있다.
- 실행은 `STORMWikiRunner`가 맡는다. `do_research`/`do_generate_outline`/`do_generate_article`/`do_polish_article` 플래그로 단계를 켜고 끈다.

**Co-STORM — 협업 담론 엔진:**
- 핵심은 **협업 담론 프로토콜(collaborative discourse protocol)**이다. turn management policy로 참여자들의 발언 순서를 조율한다. 예시 구현이 `knowledge_storm/collaborative_storm/engine.py`의 `DiscourseManager`다.
- 참여자는 세 종류다. 외부 출처에 근거해 답하는 LLM 전문가, 이전 턴에 쓰이지 않은 검색 정보에서 착안해 생각을 자극하는 질문을 던지는 사회자(질문도 grounded 가능), 관찰하거나 직접 방향을 트는 인간이다.
- 상태는 계층 개념 구조인 mind map으로 유지한다. 사람과 시스템이 공유하는 개념 공간을 세워, 담론이 길고 깊어질 때 인지 부담을 덜어 주는 역할이 검증됐다.
- 실행은 `CoStormRunner`가 맡는다. `warm_start()`로 예열하고 `step()`으로 한 턴씩 진행하되, `user_utterance`로 사용자가 개입할 수 있으며, `knowledge_base.reorganize()`로 mind map을 재편하고 `generate_report()`로 최종 글을 뽑는다.
- LM 역할을 여섯으로 쪼갠다(질의응답·담론관리·발화다듬기·warm-start outline·질문생성·knowledge base). 역할마다 max_tokens를 달리 줘서 비용을 통제한다.

**공통 인프라:**
- **DSPy** 위에 모듈을 구성하고 **litellm**으로 LM·임베더를 추상화한다.
- 검색 모듈: YouRM, BingSearch, VectorRM, SerperRM, BraveRM, SearXNG, DuckDuckGoSearchRM, TavilySearchRM, GoogleSearch, AzureAISearch. VectorRM은 커스텀 문서 벡터를 검색 대상으로 삼는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

README는 정량 지표를 본문에 싣기보다 논문(NAACL·EMNLP 2024)과 데이터셋에 위임한다.
- **FreshWiki**: 2022년 2월~2023년 9월 사이 편집이 가장 활발했던 위키 문서 100편. 사전학습 오염을 줄인 신선한 평가셋으로 STORM 글 품질을 잰다.
- **WildSeek**: 주제와 그 주제에 대한 사용자의 딥서치 목표를 짝지은 데이터. Co-STORM처럼 목표 지향적 탐색을 평가하는 용도다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **검색 의존·비용**: 파이프라인 전체가 인터넷 검색과 다수 LM 호출로 굴러가 API 비용과 지연이 크다. Co-STORM은 역할별로 LM을 쪼개 비용을 조절하지만, 근본적으로 호출 수가 많다.
- **출처 품질에 좌우**: 검색 결과가 곧 근거이므로, 검색 백엔드와 웹 문서 품질이 결과 신뢰도를 좌우한다.
- **완성도**: 편집 없이 바로 게재할 수준의 글은 아직 못 만든다. 숙련 편집자들은 pre-writing 단계 보조로 유용하다고 평했다.
- **로드맵**: 팀은 (1) Human-in-the-Loop 기능(지식 큐레이션에 사용자 참여 확대), (2) Information Abstraction(Wikipedia식 리포트를 넘어선 표현 형식)을 진행 중이다.
- **확장 여지**: README는 추가 검색엔진·retriever 통합 기여를 특히 환영한다고 밝힌다. 논문 재현은 `NAACL-2024-code-backup`(STORM)·`EMNLP-2024-code-backup`(Co-STORM) 브랜치를 쓴다.

## 6. 관련 연구 (Related Work)

- **agentic RAG / multi-agent 연구**: STORM은 검색 기반 다중 에이전트 지식 큐레이션의 대표 사례로, agentic RAG 계보와 맞닿는다.
- **DSPy**: 프롬프트를 선언적 모듈로 조립하는 프레임워크 위에 STORM이 얹혀 있다.
- **deep research 류 시스템**: 목표를 받아 웹을 반복 탐색·종합하는 최근 흐름과 문제의식을 공유한다.

## 7. 용어집 (Glossary)

- **STORM**: Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking. 주제→검색→다관점 질문으로 글을 합성.
- **Co-STORM**: STORM에 인간-AI 협업 담론과 사회자 에이전트, mind map을 더한 확장판.
- **Perspective-Guided Question Asking**: 관점별로 질문을 나눠 던지는 질문 생성 전략.
- **Simulated Conversation**: 작성자-전문가 가상 대화로 근거를 모으는 조사 방식.
- **mind map**: Co-STORM이 수집 정보를 계층 개념 구조로 정리하는 동적 상태.
- **DSPy / litellm**: 각각 모듈식 프롬프트 프레임워크 / LM·임베더 통합 추상화 계층.
