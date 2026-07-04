---
title: "Know your unknowns — examples"
type: article
year: 2026
category: agents
source: thariq-2026-know-your-unknowns.md
raw_path: raw/articles/thariq-2026-know-your-unknowns.md
raw_filename: "thariq-2026-know-your-unknowns.md"
source_collection: external
author: "Thariq (thariqs)"
url: "https://thariqs.github.io/html-effectiveness/unknowns/"
publisher: "thariqs.github.io"
tags: [ai-coding, agentic-workflow, unknowns, claude-code, planning, prototyping]
---

## 요약 (Summary)

코딩 에이전트 시대의 진짜 병목은 코드를 짜는 능력이 아니라 **무엇을 몰랐는지 뒤늦게 아는 것**이다. 이 글은 Johari Window를 빌려 *"지도는 영토가 아니며, 그 격차가 곧 당신의 unknown"* 이라 규정하고, 구현 전·중·후 세 단계에서 unknown unknowns를 값싸게 들춰내는 11가지 기법을 제시한다. 기법마다 원문에 실제 만져볼 수 있는 HTML 아티팩트로 시연을 붙였다.

관건은 검증 시점을 구현 뒤에서 **구현 앞**으로 당기는 데 있다. explainer·brainstorm·interview·prototype은 하나같이 "몰랐던 것을 싸게 알아내는 장치"이며, 이런 장치를 상시 여러 개 깔아두라는 것이 이 글의 주장이다.

## 주요 기여 (Key Contributions)

- **문제 재정의**: 병목을 "구현"이 아니라 "unknown의 뒤늦은 발견"으로 옮긴다.
- **처방**: 검증을 앞단으로 이동. unknown은 늦게 만날수록 비싸다.
- **실행 카탈로그**: 원칙에 그치지 않고 11개를 동작하는 데모로 보여준다.

## 방법론 및 아키텍처 (Methodology and Architecture)

구현 타임라인 기준 3단계로 배치한다.

### Pre-implementation (구현 전, 8개) — 발견 비용이 가장 싼 구간

1. **Blindspot pass** — 낯선 auth 모듈을 Claude가 훑고 사용자의 unknown unknown을 리포트.
2. **Teach me my unknowns** — "영상 좀 더 예쁘게" 같은 모호한 요구를 인터랙티브 color-grading explainer로 풀어 정밀한 프롬프트로 번역.
3. **Four design directions** — 같은 review queue를 네 가지 상반된 방식으로 렌더링, steal/skip 칩으로 응답을 대신 작성.
4. **Mock before you wire** — 실제 코드 전에 frame-annotation 툴바를 클릭 가능한 throwaway mock으로 먼저 검증.
5. **Brainstorm the intervention** — codebase 기반 churn 개입 아이디어 10개를 "오늘 오후 출시 ~ 분기짜리 베팅" 축으로 배치.
6. **The interview** — Claude가 한 번에 한 질문씩 인터뷰하고 끝에 decisions table을 반환.
7. **Point at a reference** — Rust reference를 TypeScript로 포팅하기 전, Claude가 원본 의미를 이해했음을 semantics map으로 증명.
8. **The tweakable plan** — 계획을 실행 순서가 아니라 **바뀔 가능성(likelihood-of-tweaking)** 순으로 정렬.

### During implementation (구현 중, 1개)

9. **Implementation notes** — 3시간 빌드 동안 Claude가 남긴 running log. 계획 이탈 지점과 보수적 판단을 기록해 다음 시도의 밑천으로.

### Post-implementation (구현 후, 2개)

10. **The buy-in doc** — 애니메이션 데모로 시작해 리뷰어 반론을 미리 되받는 ship-it 피치.
11. **Quiz me before I merge** — 여섯 문항 퀴즈를 통과해야 병합할 수 있게 하는 merge 준비도 리포트.

## 결과 (Results)

정량 벤치마크는 없다. 실증 연구가 아니라 **패턴 카탈로그 + 동작 데모**이고, 주장의 근거는 11개 아티팩트의 존재 자체다. 논지는 하나로 수렴한다 — unknown은 늦게 발견할수록 비싸니, 발견을 앞당기는 값싼 장치를 여러 개 상시 배치하라.

## 한계 (Limitations)

- 인덱스/데모 수준이라 각 기법의 적용 조건·실패 사례·비용 대비 효과를 정량으로 논하지 않는다.
- 저자·발행일을 밝히지 않아 출처 추적이 어렵다 (year 2026 추정).

## 관련 페이지 (Related Pages)

- [[agents/trq212-2026-a-field-guide-to-fable]] — **원 블로그 포스트.** 이 페이지는 그 글의 companion 데모 인덱스다. 같은 저자(trq212 = Thariq)가 "지도는 영토가 아니다"·4분면 unknown·구현 전·중·후 패턴을 산문으로 전개했고, 여기서는 그 패턴들을 동작하는 HTML 아티팩트로 시연한다.
- [[agents/ai-boost-awesome-harness-engineering]] — harness를 모델과 분리된 공학으로 보는 관점. 이 글은 그 harness 위에서 "무엇을 물어볼지"를 설계하는 실천 패턴.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — high-signal 토큰 최소화. unknown을 미리 걷어내는 것도 컨텍스트 신호 정제의 일종.
