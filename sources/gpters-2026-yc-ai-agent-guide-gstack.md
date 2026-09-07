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

GPTERS의 editor_소연이 정리한 gstack 사용 가이드다. "역할 분리"라는 설계 동기에서 출발해 9개 슬래시 명령어의 쓰임을 차례로 짚고, Playwright 기반 브라우저 데몬의 동작 수치(콜드 스타트 3~5초, 이후 호출 100~200ms, Diff-Aware 테스트)와 FAQ 4항목까지 담았다.

## 1. 자료 정보 (Document Information)

- **저자**: editor_소연, GPTERS(gpters.org)의 "에이전트 / 노코드 자동화" 카테고리
- **게시**: 2026년. 수집 시점 기준 게시 후 약 4개월
- **성격**: gstack 사용법 가이드. 설계 철학, 명령어별 실전 설명, 9개 스킬 요약표, FAQ로 구성
- **원문 태그**: AI 코딩, Claude Code, 개발 자동화, Gstack, 오픈소스, YC

## 2. 주요 기여 (Key Contributions)

1. **설계 동기 명료화**: gstack을 Claude Code의 "역할 부재"를 메우는 도구로 규정한다. 기본 Claude Code는 코드를 요청하면 곧바로 작성할 뿐 "이거 진짜 만들어야 하는 게 맞아?"를 먼저 묻지 않는다는 관찰에서 출발한다. Y Combinator의 CEO Garry Tan이 실제 팀의 역할 분담(CEO는 무엇을 만들지, 엔지니어링 매니저는 어떻게 만들지, 시니어 엔지니어는 코드 리뷰, QA는 실제 화면 테스트)을 각각 슬래시 명령어로 옮겼다고 설명한다.
2. **브라우저 스택의 내부 수치**: Playwright 기반 헤드리스 Chromium(약 58MB)을 장기 실행 데몬으로 운용한다. 콜드 스타트 3~5초, 이후 호출 100~200ms이며 쿠키, localStorage, 로그인 상태를 유지한다.
3. **Diff-Aware 테스트**: `git diff`를 읽어 변경된 페이지만 골라 테스트하는 방식을 소개한다.
4. **Greptile 연동**: `/review`가 자동 코드 리뷰 코멘트 중 진짜 문제와 오탐을 구별한다.
5. **`/setup-browser-cookies`**: Chrome, Arc, Brave, Edge, Comet에서 실제 쿠키를 추출하고 인터랙티브 UI로 도메인을 골라, 로그인이 필요한 페이지까지 QA 대상으로 만든다.
6. **9개 스킬 요약표와 FAQ**: 스킬마다 역할 이름(CEO, 엔지니어링 매니저, 스태프 엔지니어, 릴리스 엔지니어, QA 엔지니어, QA 리드, QA 리포터, 세션 매니저)을 대응시키고, 비용과 환경 요건, 기본 Claude Code와의 차이를 문답으로 정리한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

- **`/plan-ceo-review`**: 파운더와 CEO 관점의 리뷰다. SCOPE EXPANSION(더 크게), HOLD SCOPE(현재 범위 안에서 최대 rigor), SCOPE REDUCTION(핵심만) 3가지 모드를 둔다. 요약표의 한 줄 설명은 "방향성 재검토, 10배 더 좋은 제품"이다.
- **`/plan-eng-review`**: "어떻게 만들지"를 확정한다. 아키텍처, 데이터 흐름, 다이어그램, 엣지 케이스, 테스트 커버리지, 성능까지 다루고 opinionated 추천을 낸다. "알아서 해"가 아니라 "이렇게 하자, 이유는 이거야"에 해당한다.
- **`/review`**: main 브랜치 대비 diff를 분석해 SQL 안전성, LLM 신뢰 경계 위반, 조건부 사이드 이펙트, 구조적 이슈를 찾는다. CI는 통과했지만 프로덕션에서 문제가 되는 버그가 대상이다.
- **`/ship`**: main 머지, 테스트 실행, diff 최종 리뷰, VERSION 범프, CHANGELOG 갱신, 커밋과 푸시와 PR 생성의 6단계를 명령 한 줄로 실행한다.
- **`/browse`, `/qa`, `/qa-only`**: `/browse`는 헤드리스 브라우저로 페이지를 연다. `/qa`는 문제를 찾고 코드까지 수정하며, `/qa-only`(qa-reporter)는 결과만 보고한다.
- **`/retro`**: 커밋 히스토리, 작업 패턴, 코드 품질 메트릭을 분석한다. Team-Aware 모드는 팀원별 커밋 수, LOC, 테스트 커버리지, 배포 패턴을 분석하고 praise와 growth areas를 구분하며, JSON 스냅샷으로 회고 사이의 트렌드를 추적한다.
- **설치**: 글로벌 설치는 저장소를 `~/.claude/skills/gstack`에 clone한 뒤 `./setup`을 실행한다. 프로젝트별 설치는 글로벌 사본을 `.claude/skills/gstack`으로 복사하고 `.git`을 제거한 뒤 `./setup`을 실행한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 브라우저 데몬 성능: 콜드 스타트 3~5초, 이후 호출 100~200ms
- Playwright 헤드리스 Chromium 용량 약 58MB
- 비용: 완전 무료 오픈소스. 별도 API 키나 라이선스 비용 없이 Claude Code 구독만 있으면 된다
- 환경 요건: Git, Bun v1.0 이상, Claude Code 액세스, macOS 또는 Linux(x64/arm64). Windows는 WSL 경유

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 성능 수치의 측정 방법과 환경이 원문에 적혀 있지 않다. 독립 측정 결과가 아니다.
- 소개 성격의 가이드라서 명령어를 직접 검증한 기록은 없다.
- 원문은 "8명의 전문가를 데리고 일하듯"이라고 서술하면서 요약표에는 9개 스킬을 싣는다. 두 숫자가 어긋난다.
- 다루는 명령어가 9개로, 저장소 전체 명령어 집합의 일부다. [[agents/garrytan-gstack]] 기준 저장소의 명령어는 28개다.

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]] gstack 원 저장소
- [[overviews/gstack-ai-software-factory-overview]] gstack 합성 overview
- [[agents/9bow-2026-gstack-claude-code-virtual-team]] 명령어 카탈로그 중심의 한국어 소개
- [[agents/hada-2026-gstack-virtual-engineering-team]] 대상 사용자와 Conductor 병렬 스프린트 중심의 소개

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Diff-Aware 테스트 | `git diff`로 변경분을 읽어 영향받은 페이지만 골라 실행하는 QA 방식 |
| 장기 실행 브라우저 데몬 | 호출마다 새로 시작하지 않고 상주하면서 쿠키와 로그인 상태를 유지하는 브라우저 프로세스 |
| Greptile | `/review`가 연동하는 자동 코드 리뷰 서비스. 코멘트의 진짜 문제와 오탐을 구별하는 데 쓴다 |
| opinionated 추천 | 선택지를 나열하고 판단을 미루는 대신 하나를 고르고 근거를 제시하는 방식 |
| SCOPE EXPANSION / HOLD SCOPE / SCOPE REDUCTION | `/plan-ceo-review`의 3가지 모드. 범위를 넓히거나, 유지한 채 완성도를 올리거나, 핵심만 남긴다 |
| Team-Aware 회고 | 개인 단위가 아니라 팀원별 지표를 나눠 보고 JSON 스냅샷으로 트렌드를 추적하는 `/retro` 모드 |
| VERSION 범프 | 릴리스 시 VERSION 파일의 버전 번호를 올리는 단계 |
