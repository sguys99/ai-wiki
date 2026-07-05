---
title: "Y Combinator의 AI 에이전트 사용법 완벽 정리 - Gstack"
type: article
year: 2026
category: agents
raw_path: raw/articles/gpters-2026-yc-ai-agent-guide-gstack.md
raw_filename: "gpters-2026-yc-ai-agent-guide-gstack.md"
source_collection: external
author: "editor_소연"
url: "https://www.gpters.org/nocode/post/complete-guide-using-y-Ctg4mEpXdCUJjek"
publisher: "GPTERS (gpters.org)"
tags: [gstack, claude-code, playwright, browser-daemon, greptile, qa-automation, garry-tan]
---

## 한 줄 요약 (One-line Summary)

GPTERS의 editor_소연이 쓴 gstack 실전 가이드. "역할 분리"라는 설계 동기부터 9개 핵심 스킬의 쓰임, 특히 Playwright 브라우저 데몬의 내부 동작(콜드 스타트 3~5초 → 이후 100~200ms, Diff-Aware 테스트)까지 다른 소개글보다 기술적으로 파고든다.

## 1. 자료 정보 (Document Information)

- **저자**: editor_소연, GPTERS(gpters.org) "에이전트/노코드 자동화"
- **성격**: gstack 사용법 가이드 — 설계 철학 + 스킬별 실전 설명 + FAQ

## 2. 주요 기여 (Key Contributions)

1. **설계 동기 명료화**: gstack을 "Claude Code의 역할 부재를 메우는 도구"로 규정. 기본 Claude Code는 "이거 진짜 만들어야 하나?"를 먼저 묻지 않는다는 관찰.
2. **브라우저 스택의 내부 수치**: Playwright 기반 headless Chromium(~58MB)을 장기 실행 데몬으로 운용 — 콜드 스타트 3~5초, 이후 호출 100~200ms, 쿠키·localStorage·로그인 상태 유지.
3. **Diff-Aware QA**: `git diff`를 읽어 변경된 페이지만 골라 테스트하는 방식 소개.
4. **Greptile 연동**: `/review`가 자동 코드 리뷰 코멘트의 진짜 문제/오탐을 구별.
5. **`/setup-browser-cookies`**: Chrome·Arc·Brave·Edge·Comet에서 실제 쿠키를 추출해 로그인 필요한 페이지도 QA.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **/plan-ceo-review** 3모드: SCOPE EXPANSION / HOLD SCOPE / SCOPE REDUCTION
- **/plan-eng-review**: opinionated 아키텍처 확정 ("이렇게 하자, 이유는 이거야")
- **/review**: main 대비 diff에서 SQL 안전성·LLM 신뢰 경계·조건부 사이드 이펙트 검사
- **/ship**: main 머지 → 테스트 → diff 리뷰 → VERSION 범프 → CHANGELOG → 커밋·푸시·PR
- **/retro**: Team-Aware 회고 — 팀원별 커밋·LOC·커버리지·배포 패턴 분석, praise/growth 구분, JSON 스냅샷으로 트렌드 추적

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 브라우저 데몬 성능: 콜드 스타트 3~5초 → 이후 100~200ms (자기 보고 수치)
- Playwright Chromium 용량 ~58MB

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 성능 수치는 가이드 저자/저장소 측 제시값으로 독립 측정은 아님.
- 설치·환경 요건: Git, Bun v1.0+, Claude Code, macOS/Linux(Windows는 WSL).

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]] — 원 저장소
- [[overviews/gstack-ai-software-factory-overview]] — gstack 합성 overview
