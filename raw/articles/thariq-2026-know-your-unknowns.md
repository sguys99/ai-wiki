---
title: "Know your unknowns — examples"
type: article
year: 2026
category: agents
raw_path: raw/articles/thariq-2026-know-your-unknowns.md
raw_filename: "thariq-2026-know-your-unknowns.md"
source_collection: external
author: "Thariq (thariqs)"
url: "https://thariqs.github.io/html-effectiveness/unknowns/"
publisher: "thariqs.github.io"
tags: [ai-coding, agentic-workflow, unknowns, claude-code, planning, prototyping]
---

> 비고: 이 페이지는 "discovering unknowns before, during, and after implementation"을 다루는 블로그 포스트의 **companion(예시 데모 인덱스) 페이지**다. 11개의 self-contained HTML 아티팩트를 3개 phase로 묶어 소개한다. 페이지 자체에는 저자명·발행일이 명시되어 있지 않다 (저자는 사이트 소유자 Thariq, year 2026은 추정). 본문 prose는 WebFetch 요약본이며, 11개 데모 설명은 verbatim으로 확보했다.

# Know your unknowns — examples

핵심 프레임: **Johari Window** — "The map is not the territory — the gap between them is your unknowns."
철학: "every explainer, brainstorm, interview, and prototype is a cheap way to find out what you didn't know."

구현을 시작하기 전·중·후에 **unknown unknowns**(모른다는 사실조차 모르는 것)를 값싸게 발견하는 11개 기법을, 각각 동작하는 HTML 아티팩트로 시연한다.

## Pre-implementation (8 demos) — 가장 값싼 발견 단계

1. **Blindspot pass** — "Claude scans an unfamiliar auth module and reports your unknown unknowns"
2. **Teach me my unknowns** — "An interactive color-grading explainer...that turns 'make the video nicer' into precise professional prompts"
3. **Four design directions** — "The same review queue rendered four wildly different ways...with steal/skip chips that write your reply"
4. **Mock before you wire** — "A clickable throwaway mock of Acme's frame-annotation toolbar...before any real code is touched"
5. **Brainstorm the intervention** — "Ten codebase-grounded churn interventions plotted from ship-this-afternoon to quarter-long bet"
6. **The interview** — "Claude interviews you one question at a time about an ambiguous feature...then hands back a decisions table"
7. **Point at a reference** — "A semantics map that proves Claude understood a Rust reference implementation...before porting it to TypeScript"
8. **The tweakable plan** — "An implementation plan sorted by likelihood-of-tweaking instead of execution order"

## During implementation (1 demo)

9. **Implementation notes** — "The running log Claude kept during a 3-hour build...with the conservative call it made" (계획에서 벗어난 지점을 실시간으로 기록 → 다음 시도를 더 똑똑하게)

## Post-implementation (2 demos)

10. **The buy-in doc** — "A ship-it pitch that leads with an animated demo...then pre-answers every reviewer objection"
11. **Quiz me before I merge** — "A merge-readiness report...that ends in a six-question quiz you must pass"
