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

GeekNews(xguru)의 gstack 소개 글이다. 스프린트 사이클과 명령어 구조, 명령어마다 배정된 역할별 전문가, 대상 사용자 세 부류를 짧게 정리하고 Conductor 기반 병렬 스프린트를 주목 기능으로 꼽는다.

## 1. 자료 정보 (Document Information)

- **매체**: GeekNews (news.hada.io), 작성자 xguru
- **게시**: 2026-03 무렵. 원문 페이지의 상대 시각 표기("3달전")를 수집 시점에 환산한 값이다
- **게시판 표기**: 94P. raw는 이 단위가 무엇인지 설명하지 않는다
- **성격**: 커뮤니티 소개 글과 독자 댓글 4건
- **귀속**: gstack을 "YC CEO Garry Tan이 만든 오픈소스 소프트웨어 팩토리"로 소개한다
- **라이선스**: MIT

## 2. 주요 기여 (Key Contributions)

1. gstack을 "개인이 AI로 20인 팀처럼 일하게 해주는 오픈소스 소프트웨어 팩토리"로 요약한다.
2. `Think → Plan → Build → Review → Test → Ship → Reflect` 전체 스프린트 사이클을 슬래시 명령어가 덮는다는 점을 구조로 제시한다.
3. 명령어마다 역할별 전문가가 동작한다고 적고, CEO 리뷰어, 엔지니어링 매니저, 디자이너, QA 리드, 릴리즈 엔지니어 다섯을 든다.
4. 대상 사용자를 세 부류로 세분화한다. 코드를 짜는 기술 창업자와 CEO, 구조화된 워크플로가 필요한 Claude Code 입문자, 엄격한 리뷰와 릴리즈 자동화가 필요한 테크 리드와 스태프 엔지니어다.
5. Conductor를 통한 병렬 스프린트, 곧 격리된 워크스페이스에서 여러 Claude Code 세션을 동시 실행하는 기능을 주목 기능으로 꼽는다.
6. 독자 댓글 4건을 함께 실어 커뮤니티 반응을 기록한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- 스프린트 사이클: `Think → Plan → Build → Review → Test → Ship → Reflect`
- 핵심 명령어 구조
  - `/office-hours`: 6가지 강제 질문으로 제품 가설을 검증한다
  - `/plan-ceo-review`, `/plan-eng-review`: 아키텍처를 확정한다
  - `/review`, `/qa`, `/ship`: 버그 수정과 PR 생성을 자동화한다
- 주요 스킬 목록: office hours, CEO 리뷰, eng 리뷰, design 리뷰, investigation, QA, 보안 감사, 배포, canary 모니터링, 벤치마킹, 문서화, 회고
- 파워 툴 네 가지: Codex를 통한 독립 코드 리뷰, 안전 가드(`/careful`, `/freeze`, `/guard`), 배포 셋업, 버전 업그레이드
- 주목 기능: Conductor를 통한 병렬 스프린트. 격리된 워크스페이스에서 여러 Claude Code 세션을 동시 실행한다

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 정량 지표가 없다. 소개 글이라 기능 목록과 대상 사용자 정리에 그친다.
- 라이선스 MIT를 명시한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 짧은 소개 성격이라 세부 검증보다 요약과 전달에 초점이 있다.
- 명령어별 동작 방식, 설치 절차, 성능 수치를 담지 않는다. 그 층은 원 저장소 자료가 담당한다.
- 파워 툴의 Codex 리뷰를 슬래시 명령어 형태로 적지 않는다. `/codex`라는 표기는 이 자료에 없다.
- 사이클 7단계 가운데 Build와 Reflect에 대응하는 명령어를 명령어 목록에 적지 않는다.
- 댓글 4건은 요지만 한 줄씩 기록되어 발화자의 논거를 되짚을 수 없다.

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]]: 원 저장소
- [[overviews/gstack-ai-software-factory-overview]]: gstack 합성 overview

## 7. 용어집 (Glossary)

- **software factory**: 반복 가능한 파이프라인으로 소프트웨어를 생산하는 체계. 이 글이 gstack을 소개하며 쓰는 표현이다.
- **office hours**: 코딩에 들어가기 전 제품 가설을 질문으로 검증하는 gstack 스킬 이름.
- **Conductor**: 격리된 워크스페이스에서 Claude Code 세션을 병렬 실행하는 도구.
- **canary 모니터링**: 배포한 변경을 일부 구간에 먼저 노출해 이상을 감시하는 절차. 이 글의 스킬 목록에는 이름만 등장한다.
