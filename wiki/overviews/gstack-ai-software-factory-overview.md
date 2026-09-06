---
title: "gstack: 1인 개발자를 위한 AI 소프트웨어 팩토리 (합성 overview)"
type: overview
year: 2026
category: overviews
source_collection: external
tags: [gstack, claude-code, agentic-workflow, slash-commands, software-factory, garry-tan, role-based, qa-automation]
---

# gstack: 1인 개발자를 위한 AI 소프트웨어 팩토리

> 이 페이지는 gstack 저장소와 이를 다룬 세 한국어 자료를 묶은 합성 overview다. wiki에 실재하는 네 자료만 인용한다 (rule #1·#4).
>
> - [[agents/garrytan-gstack]] — 원 저장소 (`garrytan/gstack`, MIT)
> - 소개: [[sources/hada-2026-gstack-virtual-engineering-team|GeekNews (xguru)]]
> - 카탈로그: [[sources/9bow-2026-gstack-claude-code-virtual-team|PyTorch KR (9bow, 28개 명령어)]]
> - 실전 가이드: [[sources/gpters-2026-yc-ai-agent-guide-gstack|GPTERS (editor_소연, 브라우저 데몬 내부)]]

## 한눈에 (TL;DR)

gstack은 Claude Code를 **역할이 나뉜 가상 엔지니어링 팀**으로 다루는 오픈소스 스킬 팩이다. Y Combinator 대표 Garry Tan이 만들었고, 슬래시 명령어 하나가 곧 한 명의 전문가(CEO·엔지니어링 매니저·QA 리드·보안 책임자·릴리즈 엔지니어…)에 대응한다. 파는 것은 코드 생성 능력이 아니라 `Think → Plan → Build → Review → Test → Ship → Reflect`라는 **스프린트 규율**이다.

## 왜 나왔나 — 역할의 부재 (The Gap It Fills)

세 자료가 공통으로 짚는 출발점은 같다. 기본 Claude Code는 무엇을 시키든 같은 모드로 응답한다. 코드를 부탁하면 바로 짜기 시작할 뿐 "이걸 정말 만들어야 하나?"를 먼저 묻지 않는다. GPTERS 가이드는 이를 **역할의 부재**로 규정한다 — 실제 팀이라면 CEO가 방향을, 엔지니어링 매니저가 설계를, 시니어가 리뷰를, QA가 검증을 나눠 맡을 텐데 혼자 쓰는 AI에는 그 분업이 없다. gstack은 이 역할들을 명령어 단위로 떼어내 필요할 때 골라 부르게 한다.

## 핵심 축 (Three Threads)

세 자료를 겹쳐 보면 gstack의 무게중심이 세 갈래로 나뉜다.

**1. 역할 기반 계획 규율.** `/office-hours`는 코딩에 들어가기 전 6개 질문으로 제품 가설을 심문한다. `/plan-ceo-review`는 방향을 세 모드(SCOPE EXPANSION·HOLD SCOPE·SCOPE REDUCTION)로 재검토하고, `/plan-eng-review`는 "알아서 해"가 아니라 "이렇게 하자, 이유는 이거야" 식의 opinionated 결정으로 아키텍처를 잠근다.

**2. 실제 브라우저 QA.** GPTERS 가이드가 가장 깊이 파고든 대목이다. Playwright 기반 headless Chromium(~58MB)을 **장기 실행 데몬**으로 띄워, 콜드 스타트 3~5초 뒤부터는 100~200ms로 응답하며 쿠키·로그인 상태를 유지한다. `git diff`를 읽어 바뀐 페이지만 테스트하는 Diff-Aware 방식이 특징이고, `/setup-browser-cookies`로 실제 브라우저(Chrome·Arc·Brave·Edge·Comet) 쿠키를 끌어와 로그인 필요한 화면까지 검증한다.

**3. 배포·보안·회고의 자동화.** `/ship`은 main 머지 → 테스트 → diff 리뷰 → VERSION 범프 → CHANGELOG → 커밋·푸시·PR을 한 줄로 돌린다. `/cso`는 OWASP Top 10과 STRIDE로 보안을 감사하고, `/retro`는 팀원별 커밋·LOC·커버리지를 분석해 JSON 스냅샷으로 회고 트렌드를 남긴다. `/codex`는 OpenAI Codex CLI를 불러 독립적인 교차 리뷰를 붙인다.

## 자료별 강조점 (Where Each Source Adds)

| 자료 | 성격 | 이 자료만의 결 |
|---|---|---|
| GeekNews (xguru) | 커뮤니티 소개 | 대상 사용자 세분화(창업자·입문자·테크 리드), Conductor 병렬 스프린트 강조, Garry Tan 본인 리트윗 등 반응 |
| PyTorch KR (9bow) | 명령어 카탈로그 | 전체 **28개** 명령어를 7단계에 매핑, 텔레메트리 수집 범위 명시 |
| GPTERS (editor_소연) | 실전 가이드 | 브라우저 데몬 내부 수치, Greptile 연동, `/retro`의 Team-Aware 동작 |

## 규모의 근거와 그 한계 (Claims & Caveats)

Garry Tan은 gstack으로 2026년 GitHub 기여 1,237건 이상, 하루 1만~2만 줄의 프로덕션 코드를 단독 작성했다고 밝힌다. 생산성은 AI 인플레이션을 뺀 정규화 logical line count 기준 2013년 대비 약 810배로 제시된다. 다만 이 수치들은 모두 **저자 본인의 자기 보고**이며 독립적으로 재현·검증된 벤치마크가 아니다. 브라우저 데몬 성능(100~200ms) 역시 저장소·가이드 측이 내놓은 값이다.

## 생태계 안에서 (In the Ecosystem)

gstack은 같은 저자의 [[applications/garrytan-gbrain]](세션 간 지속 메모리)을 `GBrain`으로 흡수해, 스프린트 규율과 장기 기억을 한 스택에 얹는다. 넓게 보면 Claude Code를 오케스트레이션 층에서 다루는 harness·loop engineering 흐름과 같은 갈래에 놓인다 — 모델 자체보다 **모델을 감싸는 실행 환경과 프로세스**에 최적화 무게중심이 실리는 계보다.

## 관련 페이지 (Related Pages)

- [[agents/garrytan-gstack]] — 원 저장소 상세
- [[applications/garrytan-gbrain]] — 통합된 메모리 저장소
- [[overviews/prompt-to-loop-engineering-evolution-overview]] — Prompt→Context→Harness→Loop 진화 지도 (gstack은 harness/loop 단계의 실물 사례)
