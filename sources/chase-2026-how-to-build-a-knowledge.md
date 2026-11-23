---
title: "How to build a knowledge factory"
type: article
year: 2026
category: agents
raw_path: raw/articles/chase-2026-how-to-build-a-knowledge.md
raw_filename: "chase-2026-how-to-build-a-knowledge.md"
source_collection: external
author: "Harrison Chase"
url: "https://www.langchain.com/blog/knowledge-factory"
publisher: "LangChain Blog"
publication_date: "2026-11-21"
tags: [knowledge-management, agent-skills, langchain, agent-memory]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/chase-2026-how-to-build-a-knowledge/fig01.png
    raw: raw/articles/chase-2026-how-to-build-a-knowledge-figures/fig01.png
    caption: "보고서 작성법, ARR 계산 기준, 매출 데이터 조회 안내의 저장 위치"
    strategy: fetched
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/chase-2026-how-to-build-a-knowledge/fig02.png
    raw: raw/articles/chase-2026-how-to-build-a-knowledge-figures/fig02.png
    caption: "업무 중 남긴 신고와 실행 기록, 사내 원자료를 읽어 지식을 갱신하는 구조"
    strategy: fetched
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/chase-2026-how-to-build-a-knowledge/fig03.png
    raw: raw/articles/chase-2026-how-to-build-a-knowledge-figures/fig03.png
    caption: "변경된 열 이름과 새 문서 머리글을 두 스킬에 반영하는 매출 보고서 예시"
    strategy: fetched
    curated: true
---

## 한 줄 요약 (One-line Summary)

에이전트가 일을 하다가 낡은 지침을 발견하면 신고하고, 지식 관리를 맡은 에이전트가 신고와 실제 업무 기록을 확인해 다음번에 쓸 지침을 고친다.

## 1. 자료 정보 (Document Information)

Harrison Chase가 2026년 11월 21일 LangChain 블로그에 쓴 글이다. 사내 에이전트를 운영한 경험을 바탕으로, 숙련된 직원의 판단 기준과 업무 절차를 어떻게 모으고 최신 상태로 유지할지 설명한다.

## 2. 주요 기여 (Key Contributions)

- 컨텍스트는 이번 작업에서 에이전트가 이용할 수 있는 정보 전체다. 그중 여러 번 쓸 만한 지식에는 지표의 정의, 믿을 만한 출처, 회사가 정한 일 처리 방식이 있다.
- 최신 매출 수치는 데이터가 있는 곳에서 조회한다. 따로 관리할 것은 수치를 읽는 법과 계산 기준, 보고서 작성 절차다.
- 현장에서 문제를 발견하는 일과 공통 지침을 고치는 일을 나눈다. 업무 에이전트는 문제와 가능한 수정안을 남기고 지식 관리 담당 에이전트는 다른 자료를 대조한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

| 관리할 지식 | 매출 보고서 예시 | 예시의 저장 위치 |
|---|---|---|
| 업무 절차 | 회사 양식에 맞춰 보고서를 작성하는 스킬 | GitHub |
| 도메인 지식 | 연간 반복 매출(ARR)을 계산하는 회사 기준 | 사내 위키 |
| 데이터 조회 안내 | BigQuery와 Salesforce에서 매출 원자료를 찾고 조회하는 법 | LangSmith Context Hub의 스킬 |

저자가 ‘knowledge factory’라고 부르는 시스템에서는 지식 관리 담당 에이전트가 일정한 주기로 세 가지 자료를 읽는다. 업무 에이전트가 직접 남긴 신고, 실행 중 일어난 일을 시간순으로 기록한 trace, Slack 대화나 Notion 문서 같은 사내 원자료다. 업무 에이전트가 신고하지 않은 요청도 trace에 남으면 담당 에이전트가 찾아볼 수 있다.

매출 보고서 예시에서 업무 에이전트는 BigQuery 열 이름이 바뀐 것을 알아내고 새 이름을 신고한다. 보고서를 받은 재무 책임자는 앞으로 모든 회사 문서에 새 머리글을 쓰라고 요청한다. 그날 밤 지식 관리 담당 에이전트는 신고를 읽고 조회 스킬을 고친다. 머리글 변경은 재무 책임자와 나눈 대화에서 찾아 보고서 작성 스킬에 반영한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

LangChain은 시장 진출 업무를 지원하는 GTM 에이전트와 콘텐츠 제작 에이전트에 이 방식을 쓴다고 밝혔다. 실행 기록을 살펴 수정안을 제안하는 LangSmith Engine에서는 에이전트별로 지식을 관리한다. 글에 성능 비교나 비용 측정치는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자는 업무 절차를 스킬로 표현하는 관행은 자리 잡았다고 본다. 사실이나 개념 간 관계를 표현하는 형식은 아직 합의가 없으며 Open Knowledge Format(OKF)을 후보로 든다. 저장 위치로는 GitHub, Notion 문서 한 개, LangSmith Context Hub, Neo4j 지식 그래프를 예로 든다. 처음 도입할 때는 반복 업무 하나를 골라 에이전트가 어디서 막히는지 살피고 그때 드러난 지식부터 보완하라고 권한다.

## 6. 관련 연구 (Related Work)

- 업무 절차를 파일에 담는 규격은 [[agents/agentskills-agentskills|Agent Skills]]에서 살펴볼 수 있다.
- 코드 변경을 근거로 문서를 갱신하는 구현 예는 [[applications/sproul-2026-introducing-openwiki-an-open-source|OpenWiki 소개]]에 있다.

## 7. 용어집 (Glossary)

| 용어 | 글에서의 뜻 |
|---|---|
| knowledge factory | 업무에 필요한 지식을 모으고 검토하고 갱신하는 시스템 |
| curator agent | 신고와 실행 기록, 원자료를 읽고 공통 지침을 관리하는 에이전트 |
| data access guidance | 최신 데이터가 어디에 있고 어떻게 조회하는지 적은 안내 |
| flag | 업무 에이전트가 지식의 누락이나 오류를 알리는 신고 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 보고서 작성법, ARR 계산 기준, 매출 데이터 조회 안내의 저장 위치 | fetched | 지식 유형 비교 |
| fig02 | 업무 중 남긴 신고와 실행 기록, 사내 원자료를 읽어 지식을 갱신하는 구조 | fetched | 위키 권장 |
| fig03 | 변경된 열 이름과 새 문서 머리글을 두 스킬에 반영하는 매출 보고서 예시 | fetched | 위키 권장 |
