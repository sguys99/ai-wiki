---
title: "gstack - Claude Code로 만드는 가상 엔지니어링 팀"
type: article
year: 2026
category: agents
raw_path: raw/articles/hada-2026-gstack-virtual-engineering-team.md
raw_filename: "hada-2026-gstack-virtual-engineering-team.md"
source_collection: external
author: "xguru"
url: "https://news.hada.io/topic?id=27756"
publisher: "GeekNews (news.hada.io)"
tags: [gstack, claude-code, slash-commands, agentic-workflow, garry-tan]
---

## 한 줄 요약 (One-line Summary)

GeekNews(xguru)의 gstack 소개 글. 명령어 구조와 대상 사용자(코딩하는 창업자, Claude Code 입문자, 테크 리드)를 짧게 정리하고, Conductor 병렬 스프린트를 주목 기능으로 꼽는다.

## 1. 자료 정보 (Document Information)

- **매체**: GeekNews (news.hada.io), 작성 xguru, 94P
- **게시**: 2026-03 무렵
- **성격**: 커뮤니티 소개 글 + 댓글

## 2. 주요 기여 (Key Contributions)

1. gstack을 "개인이 AI로 20인 팀처럼 일하게 하는 software factory"로 요약.
2. 대상 사용자 세분화: 코드를 짜는 창업자/CEO, 구조화된 워크플로우가 필요한 입문자, 리뷰·릴리즈 자동화가 필요한 테크 리드.
3. Conductor 기반 병렬 스프린트(격리 워크스페이스 다중 세션)를 주목 기능으로 강조.
4. 댓글: Garry Tan 본인 X 리트윗, office-hours 문서의 방대함 등 커뮤니티 반응.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- 스프린트 사이클 `Think → Plan → Build → Review → Test → Ship → Reflect`
- 핵심 명령: `/office-hours`(6개 강제 질문), `/plan-ceo-review`·`/plan-eng-review`, `/review`·`/qa`·`/ship`
- 파워 툴: `/codex` 독립 리뷰, `/careful`·`/freeze`·`/guard` 안전 가드

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 별도 정량 지표 없음(소개 글). License MIT 명시.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 짧은 소개 성격. 세부 검증보다 요약·전달에 초점.

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]] — 원 저장소
- [[overviews/gstack-ai-software-factory-overview]] — gstack 합성 overview
