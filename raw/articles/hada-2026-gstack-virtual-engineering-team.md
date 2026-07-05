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

# gstack - Claude Code로 만드는 가상 엔지니어링 팀

**Source:** GeekNews
**Posted by:** xguru
**Date:** 2026-03 (게시 당시 "3달전"), 94P

## 본문

gstack은 YC CEO Garry Tan이 만든 오픈소스 소프트웨어 팩토리로, 개인이 AI로 20인 팀처럼 일하게 해준다. Think → Plan → Build → Review → Test → Ship → Reflect 전체 스프린트 사이클을 슬래시 명령어로 커버한다.

**핵심 명령어 구조:**
- `/office-hours` — 6가지 강제 질문으로 제품 가설을 검증
- `/plan-ceo-review`, `/plan-eng-review` — 아키텍처 확정
- `/review`, `/qa`, `/ship` — 버그 수정과 PR 생성 자동화
- 각 명령어는 역할별 전문가로 동작 (CEO 리뷰어, 엔지니어링 매니저, 디자이너, QA 리드, 릴리즈 엔지니어)

**대상 사용자:**
- 코드를 짜는 기술 창업자/CEO
- 구조화된 워크플로우가 필요한 Claude Code 입문자
- 엄격한 리뷰·릴리즈 자동화가 필요한 테크 리드/스태프 엔지니어

**주요 스킬:** office hours, CEO/eng/design 리뷰, investigation, QA, 보안 감사, 배포, canary 모니터링, 벤치마킹, 문서화, 회고.

**파워 툴:** Codex를 통한 독립 코드 리뷰, 안전 가드(`/careful`, `/freeze`, `/guard`), 배포 셋업, 버전 업그레이드.

**주목 기능:** Conductor를 통한 병렬 스프린트 — 격리된 워크스페이스에서 여러 Claude Code 세션을 동시 실행.

**License:** MIT

## 주요 댓글
1. **kgcrom** — Garry Tan이 X에서 이 글을 리트윗함
2. **laeyoung** — office-hours 스킬의 마크다운 문서가 방대함
3. **angrybird0** — 1인 창업가를 위한 진화라는 점 강조
4. **ragingwind** — 유사 도구 실사용 경험 언급
