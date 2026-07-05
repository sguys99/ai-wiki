---
title: "GBrain — 오픈소스 개인 지식 베이스"
type: article
year: 2026
category: applications
raw_path: raw/articles/xguru-2026-gbrain-open-source-personal-knowledge.md
raw_filename: "xguru-2026-gbrain-open-source-personal-knowledge.md"
source: xguru-2026-gbrain-open-source-personal-knowledge.md
source_collection: external
author: "xguru"
url: "https://news.hada.io/topic?id=28323"
publisher: "GeekNews (news.hada.io)"
tags: [gbrain, personal-knowledge-base, postgres, hybrid-search, mcp, geeknews, korean-community]
---

## 요약 (Summary)

한국 개발자 커뮤니티 GeekNews에 xguru가 올린 GBrain 소개글이다(53P). GBrain을 한 문장으로 추리면 "흩어진 마크다운 파일을 Postgres 지식 베이스로 모으고, 벡터와 키워드를 섞은 하이브리드 검색을 얹은 것"이다. 만든 사람은 YC CEO Garry Tan.

## 핵심 기능 (Key Features)

- Claude Haiku로 하나의 질의를 여러 갈래로 확장
- AI 에이전트 스킬 7개 내장
- MCP 서버가 도구 20개 제공
- 3단계 청킹 전략
- Obsidian·Notion·Logseq 등에서 마이그레이션

기술 스택은 TypeScript, 라이선스는 MIT다.

## v0.2.0 변경점

git 기반 증분 동기화, Supabase Storage 파일 관리, 설치 스킬이 추가됐다.

## 메모 (Notes)

원 저장소를 압축한 소개글이라 아키텍처나 벤치마크 깊이는 얕다. 언급된 수치(스킬 7개, 도구 20개)도 게시 시점 버전 기준이라, README 최신값(skill pack 43개)과는 차이가 난다 — 버전 스냅샷으로 읽는 게 맞다. 자세한 내용은 아래 페이지로.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 원 저장소 README(최신 아키텍처·벤치마크).
- [[applications/garrytan-gbrain-tutorials]] — 실전 셋업 튜토리얼 4편.
- [[applications/tilnote-2026-gbrain-repository-core-summary]] — 같은 저장소의 또 다른 한국어 정리.
- [[overviews/gbrain-ecosystem-overview]] — gbrain 생태계 상위 지도.
