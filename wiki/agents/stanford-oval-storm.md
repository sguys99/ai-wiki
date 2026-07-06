---
title: "stanford-oval/storm — STORM & Co-STORM"
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
license: "MIT (코드) · FreshWiki 데이터셋은 CC BY-SA"
tags: [storm, co-storm, multi-agent, question-asking, retrieval, dspy, litellm, wikipedia-generation, knowledge-curation, stanford-oval]
---

## 요약 (Summary)

`stanford-oval/storm`은 주제 하나를 받아 인터넷 검색만으로 Wikipedia 스타일 글을 처음부터 써내는 LLM 시스템이다. Stanford OVAL 연구실이 만들었고, 두 편의 논문(NAACL 2024의 STORM, EMNLP 2024의 Co-STORM)을 코드로 옮긴 reference 구현체다. 이 프로젝트의 관점은 분명하다. 글쓰기 자동화의 병목은 서술이 아니라 "무엇을 물을지"에 있고, 그래서 여러 관점에서 좋은 질문을 만들어내는 데 힘을 쏟는다. PyPI에는 `knowledge-storm`으로 배포되고, DSPy 위에 모듈식으로 짜여 litellm이 지원하는 LM이면 무엇이든 갈아 끼울 수 있다. 라이브 research preview는 이미 7만 명 넘게 써봤다. 다만 편집 없이 게재할 글은 아직 못 만들고, 숙련 위키 편집자들도 pre-writing 단계 보조로만 유용하다고 평했다.

## 주요 기여 (Key Contributions)

- **질문 생성을 급소로 본다.** STORM은 연구 자동화의 핵심을 "좋은 질문을 자동으로 떠올리는 것"으로 규정한다. 검색과 집필은 그 질문에 딸려 온다.
- **다관점 질문(Perspective-Guided Question Asking).** 비슷한 주제의 기존 글을 훑어 서로 다른 관점을 뽑아내고, 관점별로 질문을 나눠 던져 조사의 폭과 깊이를 함께 키운다.
- **가상 대화(Simulated Conversation).** 위키 작성자와 주제 전문가가 인터넷 출처에 근거해 주고받는 대화를 흉내 내며 참고문헌을 모은다.
- **Co-STORM의 협업형 담론.** LLM 전문가 여러 명, 질문을 던지는 사회자(moderator), 그리고 사람이 한 대화에 함께 참여한다. 오간 정보는 계층형 mind map으로 실시간 정리된다.
- **모델을 가리지 않는 모듈 설계.** DSPy 모듈과 litellm 추상화로 LM과 임베더를 자유롭게 바꾸고, 검색 백엔드도 10종을 지원한다.

## 방법론 및 아키텍처 (Methodology and Architecture)

**STORM은 두 단계로 나뉜다.**

- **Pre-writing(사전 집필)** — 인터넷을 뒤져 참고문헌을 모으고 outline을 짠다. 다관점 질문과 가상 대화가 돌아가는 구간이 여기다.
- **Writing(집필)** — 그 outline과 참고문헌을 재료로 인용이 달린 전체 글을 쓴다.

커스터마이즈 단위는 네 모듈이다. Knowledge Curation, Outline Generation, Article Generation, Article Polishing. 인터페이스는 `knowledge_storm/interface.py`에, 구현은 `knowledge_storm/storm_wiki/modules/*`에 있다. 실행은 `STORMWikiRunner`가 맡아 `do_research`·`do_generate_outline`·`do_generate_article`·`do_polish_article` 플래그로 단계를 켜고 끈다.

**Co-STORM은 협업 담론 엔진이다.**

핵심은 협업 담론 프로토콜(collaborative discourse protocol)이다. turn management policy로 발언 순서를 조율하며, 예시 구현이 `engine.py`의 `DiscourseManager`다. 참여자는 셋이다. 외부 출처에 근거해 답하는 LLM 전문가, 이전 턴에 안 쓰인 검색 정보에서 착안해 생각을 자극하는 질문을 던지는 사회자, 그리고 지켜보거나 직접 방향을 트는 인간이다. 오간 정보는 계층 개념 구조인 mind map으로 유지되는데, 사람과 시스템이 공유하는 개념 공간을 세워 담론이 길어질수록 커지는 인지 부담을 덜어준다. `CoStormRunner`를 `warm_start()`로 예열한 뒤 `step()`으로 한 턴씩 돌린다. 중간에 `user_utterance`로 사람이 끼어들고, `knowledge_base.reorganize()`로 mind map을 다시 짜며, `generate_report()`로 최종 글을 뽑는다. LM 역할을 여섯으로 쪼갠 뒤(질의응답·담론관리·발화다듬기·warm-start outline·질문생성·knowledge base) 역할마다 max_tokens를 다르게 줘 비용을 조절하는 점이 특징이다.

두 갈래 모두 **DSPy** 위에 모듈을 얹고 **litellm**으로 LM과 임베더를 추상화한다. 검색 모듈은 YouRM·BingSearch·VectorRM·SerperRM·BraveRM·SearXNG·DuckDuckGoSearchRM·TavilySearchRM·GoogleSearch·AzureAISearch를 갖췄고, 이 중 VectorRM은 커스텀 문서 벡터를 검색 대상으로 삼는다.

## 결과 (Results)

정량 지표는 README가 아니라 논문과 데이터셋 쪽에 있다. 평가에는 두 데이터셋을 쓴다.

- **FreshWiki** — 2022년 2월부터 2023년 9월까지 편집이 가장 활발했던 위키 문서 100편. 학습 데이터 오염을 줄인 신선한 평가셋으로 생성 글의 품질을 잰다.
- **WildSeek** — 주제와, 그 주제로 사용자가 하려는 딥서치 목표를 짝지은 데이터. Co-STORM처럼 목표 지향 탐색을 평가하는 데 쓴다.

## 한계 (Limitations)

- **검색과 호출 비용**: 파이프라인 전체가 인터넷 검색과 다수 LM 호출로 굴러가 API 비용과 지연이 크다. Co-STORM이 역할별로 LM을 쪼개 조절하긴 해도 근본적으로 호출 수가 많다.
- **출처 품질에 좌우됨**: 검색 결과가 곧 근거라, 검색 백엔드와 웹 문서 품질이 결과 신뢰도를 좌우한다.
- **확장 여지**: README도 추가 검색엔진·retriever 통합 기여를 특히 반긴다고 밝힌다. 논문 재현은 `NAACL-2024-code-backup`·`EMNLP-2024-code-backup` 브랜치를 쓴다.

로드맵으로는 (1) Human-in-the-Loop — 지식 큐레이션에 사용자 참여를 넓히는 기능, (2) Information Abstraction — Wikipedia식 리포트를 넘어선 표현 형식을 팀이 진행 중이다.

## 관련 페이지 (Related Pages)

- [[agents/shao-2024-assisting-in-writing-wikipedia-like-articles]] — 이 저장소가 구현하는 STORM 원논문 (Shao et al., NAACL 2024)
- [[agents/ai-boost-awesome-harness-engineering]] — 에이전트/하네스 엔지니어링 자료 모음 (같은 agents 카테고리)
- [[database/athina-ai-rag-cookbooks]] — agentic RAG 기법 cookbook, STORM의 검색 기반 조사와 문제의식이 겹친다
- [[database/nirdiamant-rag-techniques]] — agentic·graph RAG 카탈로그, retrieval 기반 지식 큐레이션 맥락
