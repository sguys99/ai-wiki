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

# Y Combinator의 AI 에이전트 사용법 완벽 정리 - Gstack

**Author:** editor_소연
**Date:** 2026 (게시 당시 "4달 전")
**Category:** 에이전트 / 노코드 자동화

## 본문

Gstack은 Claude Code에 역할별 전문가 모드를 부여하는 오픈소스 스킬 모음. YC CEO 개리 탄(Garry Tan)이 직접 만들어 GitHub에 공개. 슬래시 커맨드 하나로 CEO 관점 리뷰, 아키텍처 설계, 코드 리뷰, 자동 배포, QA 테스트까지 — 한 사람이 8명의 전문가를 데리고 일하듯 개발.

### 1. 왜 Gstack인가 — "역할 분리"
Claude Code는 똑똑하지만 한 가지 모드로만 동작한다. 코드를 짜달라고 하면 바로 짜지, "이거 진짜 만들어야 하는 게 맞아?"라고 먼저 묻지 않는다. 개리 탄은 이걸 역할의 부재 문제로 봤다. 실제 팀에서는 CEO가 "뭘 만들지", 엔지니어링 매니저가 "어떻게 만들지", 시니어 엔지니어가 코드 리뷰, QA가 실제 화면 테스트를 한다. Gstack은 이 역할들을 각각 슬래시 커맨드로 만들었다.

### 2. /plan-ceo-review — 방향부터
파운더/CEO 관점 리뷰. 3가지 모드: SCOPE EXPANSION(더 크게), HOLD SCOPE(현재 범위 내 최대 rigor), SCOPE REDUCTION(핵심만).

### 3. /plan-eng-review — 아키텍처 잠금
"어떻게 만들지"를 잠근다. 아키텍처·데이터 흐름·다이어그램·엣지 케이스·테스트 커버리지·성능까지. opinionated 추천 — "알아서 해"가 아니라 "이렇게 하자, 이유는 이거야".

### 4. /review — 프로덕션 버그를 잡는 스태프 엔지니어
main 브랜치 대비 diff를 분석: SQL 안전성, LLM 신뢰 경계 위반, 조건부 사이드 이펙트, 구조적 이슈. **Greptile 연동** — 자동 코드 리뷰 코멘트 중 진짜 문제와 오탐 구별.

### 5. /ship — 릴리스 엔지니어의 최종 실행
1) main 머지 2) 테스트 실행 3) diff 최종 리뷰 4) VERSION 범프 5) CHANGELOG 갱신 6) 커밋→푸시→PR 생성. 한 줄 커맨드로 릴리스 파이프라인 전체.

### 6. /browse + /qa — 실제 화면을 보는 QA (가장 기술적으로 인상적)
Playwright 기반 헤드리스 브라우저(~58MB) 내장, AI가 실제로 웹 페이지를 열고 테스트.
- **장기 실행 데몬**: 매번 새로 띄우지 않음. 쿠키·localStorage·로그인 상태 유지
- **콜드 스타트 3~5초**, 이후 호출 **100~200ms**
- **Diff-Aware 테스트**: git diff를 읽어 변경된 페이지만 골라 테스트
`/qa`는 문제를 찾고 코드까지 수정, `/qa-only`(qa-reporter)는 결과만 보고.

### 7. /setup-browser-cookies — 로그인된 상태로 테스트
QA의 가장 큰 걸림돌은 로그인. 실제 브라우저(Chrome, Arc, Brave, Edge, Comet)에서 쿠키를 가져온다. 인터랙티브 UI로 도메인 선택.

### 8. /retro — 팀 단위 회고와 트렌드 추적
커밋 히스토리·작업 패턴·코드 품질 메트릭 분석. **Team-Aware**: 팀원별 커밋 수·LOC·테스트 커버리지·배포 패턴 분석, praise/growth areas 구분, JSON 스냅샷으로 회고 간 트렌드 추적.

### 9. 설치는 명령어 한 줄
**글로벌:** `git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`
**프로젝트별:** `cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup`
**필요:** Git, Bun v1.0+, Claude Code 액세스, macOS/Linux (x64/arm64)

### 9가지 스킬 한눈에
| 스킬 | 역할 | 한줄 설명 |
|------|------|---------|
| /plan-ceo-review | CEO | 방향성 재검토, 10배 더 좋은 제품 |
| /plan-eng-review | 엔지니어링 매니저 | 아키텍처·데이터 흐름·엣지 케이스 |
| /review | 스태프 엔지니어 | CI 통과했지만 프로덕션에서 터질 버그 |
| /ship | 릴리스 엔지니어 | 머지→테스트→PR 원클릭 |
| /browse | QA 엔지니어 | 헤드리스 브라우저로 페이지 테스트 |
| /qa | QA 리드 | Diff-Aware 자동 테스트 + 수정 |
| /qa-only | QA 리포터 | 테스트 결과 보고만 |
| /setup-browser-cookies | 세션 매니저 | 실제 브라우저 쿠키 가져오기 |
| /retro | 엔지니어링 매니저 | 팀 단위 회고, 트렌드 추적 |

### FAQ
- **무료?** 완전 무료 오픈소스. 별도 API 키·라이선스 비용 없음. Claude Code 구독만 있으면 됨.
- **필요 사항?** Git, Bun v1.0+, Claude Code 액세스. macOS/Linux(x64/arm64). Windows는 WSL.
- **일반 Claude Code와 차이?** 일반은 범용 어시스턴트(같은 모드). Gstack은 역할별 페르소나 부여.
- **브라우저 동작?** Playwright 기반 헤드리스 Chromium을 장기 실행 데몬으로. 콜드 스타트 후 100~200ms.

**Tags:** AI 코딩, Claude Code, 개발 자동화, Gstack, 오픈소스, YC
