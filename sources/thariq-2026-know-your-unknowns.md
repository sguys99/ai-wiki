---
title: "Know your unknowns (examples)"
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

## 한 줄 요약 (One-line Summary)

구현 전, 구현 중, 구현 후 세 구간에서 unknown unknowns를 값싸게 발견하는 11개 기법을 각각 동작하는 HTML 아티팩트로 시연한 companion 페이지다. 프레임은 Johari Window이고, 페이지가 내건 문장은 지도와 영토의 격차가 곧 사용자의 unknown이라는 것이다.

## 1. 자료 정보 (Document Information)

- 유형: 블로그 포스트에 딸린 companion 페이지. 예시 데모 인덱스 역할을 한다.
- 저자: Thariq (사이트 소유자). 페이지 자체에는 저자 표기가 없다.
- URL: https://thariqs.github.io/html-effectiveness/unknowns/
- 구성: 11개 self-contained HTML 아티팩트를 3개 phase(pre, during, post-implementation)로 묶은 인덱스다. 각 아티팩트는 실제로 클릭하고 조작할 수 있는 데모다.
- 원 블로그 포스트의 주제: "discovering unknowns before, during, and after implementation".
- 취득 시 주의: 페이지에 발행일이 없어 year는 2026으로 추정했다. 본문 산문은 요약본으로 확보했고, 11개 데모의 이름과 설명만 원문 그대로 확보했다.

## 2. 주요 기여 (Key Contributions)

- 프레임 제시: Johari Window를 핵심 프레임으로 삼는다. 페이지가 내건 문장은 다음과 같다.

  > "The map is not the territory — the gap between them is your unknowns." <!-- lint-style: ignore -->

- 발견 수단의 일반화: "every explainer, brainstorm, interview, and prototype is a cheap way to find out what you didn't know." explainer, brainstorm, interview, prototype을 모두 몰랐던 것을 값싸게 알아내는 수단으로 한데 묶는다.
- 구간별 카탈로그: 11개 기법을 구현 타임라인의 세 구간에 배치한다. 8개가 구현 전에 몰려 있고, 페이지는 이 구간을 발견 비용이 가장 싼 단계로 적는다.
- 실행 가능한 시연: 각 기법을 조작 가능한 HTML 아티팩트로 구현해 산출물의 형태를 직접 보여준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### Pre-implementation (구현 전, 8개)

발견 비용이 가장 싼 구간이며 11개 중 8개가 여기에 있다.

1. Blindspot pass. 원문 설명은 "Claude scans an unfamiliar auth module and reports your unknown unknowns"다. 사용자가 잘 모르는 auth 모듈을 Claude가 훑고 unknown unknowns를 리포트로 돌려준다.
2. Teach me my unknowns. "An interactive color-grading explainer...that turns 'make the video nicer' into precise professional prompts". 인터랙티브 color grading explainer가 "영상을 더 보기 좋게"라는 모호한 요구를 전문 용어 수준의 정밀한 프롬프트로 바꾼다.
3. Four design directions. "The same review queue rendered four wildly different ways...with steal/skip chips that write your reply". 같은 review queue를 크게 다른 네 가지 방식으로 렌더링하고, steal과 skip 칩이 사용자의 응답을 대신 작성한다.
4. Mock before you wire. "A clickable throwaway mock of Acme's frame-annotation toolbar...before any real code is touched". 실제 코드를 건드리기 전에 Acme의 frame annotation 툴바를 클릭 가능한 throwaway mock으로 먼저 만든다.
5. Brainstorm the intervention. "Ten codebase-grounded churn interventions plotted from ship-this-afternoon to quarter-long bet". codebase에 근거한 churn 개입안 10개를 오늘 오후에 출시할 수 있는 것부터 분기 단위 베팅까지의 범위 위에 배치한다.
6. The interview. "Claude interviews you one question at a time about an ambiguous feature...then hands back a decisions table". 모호한 기능을 두고 Claude가 한 번에 한 질문씩 인터뷰하고, 마지막에 decisions table을 돌려준다.
7. Point at a reference. "A semantics map that proves Claude understood a Rust reference implementation...before porting it to TypeScript". Rust reference 구현을 TypeScript로 포팅하기 전에, Claude가 원본 의미를 이해했음을 semantics map으로 증명한다.
8. The tweakable plan. "An implementation plan sorted by likelihood-of-tweaking instead of execution order". 구현 계획을 실행 순서가 아니라 나중에 바뀔 가능성 순으로 정렬한다.

### During implementation (구현 중, 1개)

9. Implementation notes. "The running log Claude kept during a 3-hour build...with the conservative call it made". 3시간짜리 빌드 동안 Claude가 남긴 running log다. 계획에서 벗어난 지점을 실시간으로 기록하고 그때 내린 보수적 판단을 함께 남겨, 다음 시도가 더 나은 상태에서 출발하게 한다.

### Post-implementation (구현 후, 2개)

10. The buy-in doc. "A ship-it pitch that leads with an animated demo...then pre-answers every reviewer objection". 애니메이션 데모를 앞세운 출시 피치 문서로, 리뷰어가 낼 반론을 미리 되받는다.
11. Quiz me before I merge. "A merge-readiness report...that ends in a six-question quiz you must pass". merge 준비도 리포트다. 여섯 문항짜리 퀴즈를 통과해야 병합할 수 있게 해 이해도를 강제로 확인한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 없다. 실증 연구가 아니라 패턴 카탈로그와 동작 데모의 묶음이라서다. 페이지가 제시하는 것은 기법 목록과 각 기법의 산출물 형태이며, 각 기법이 실제로 어떤 unknown을 얼마나 줄였는지에 대한 측정치는 없다.

배치 자체가 하나의 주장을 담는다. 11개 중 8개를 구현 전에 두고 그 구간을 가장 값싼 발견 단계로 적은 것은, 발견 시점을 앞으로 당길수록 유리하다는 판단이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 인덱스와 데모 수준의 페이지라 각 기법의 적용 조건, 실패 사례, 비용 대비 효과를 다루지 않는다.
- 저자명과 발행일이 페이지에 표기되지 않아 출처 추적성이 약하다. 이 wiki는 사이트 소유자 이름을 저자로, year를 2026으로 추정해 기록한다.
- 원문 산문 전문을 그대로 확보하지 못했다. 확보한 것은 프레임 문장 두 개와 11개 데모 설명이고, 나머지 논지는 요약본에 의존한다.

## 6. 관련 연구 (Related Work)

- A Field Guide to Fable: Finding Your Unknowns. 같은 주제를 산문으로 전개한 블로그 포스트이며, 이 wiki에는 [[agents/trq212-2026-a-field-guide-to-fable]]로 들어와 있다. 그 페이지는 Korzybski의 "지도는 영토가 아니다"를 출발점으로 4분면 unknown과 구현 전, 중, 후 8개 패턴을 정리한다. 다만 두 자료의 저자 표기가 Thariq과 trq212로 서로 달라, 동일인 여부는 두 자료 안에서 확정되지 않는다.
- Effective Context Engineering for AI Agents. [[agents/anthropic-2025-effective-context-engineering-for-ai]]는 컨텍스트에 넣을 토큰을 고르는 문제를 다룬다. 무엇을 물어볼지 미리 정해 두는 이 자료의 기법들과는 입력 설계라는 점에서 맞닿는다.
- awesome-harness-engineering. [[agents/ai-boost-awesome-harness-engineering]]는 harness를 모델과 분리된 공학으로 보는 관점을 모은다. 이 자료는 그 harness 위에서 사람이 무엇을 물어볼지를 설계하는 실천 패턴에 해당한다.

## 7. 용어집 (Glossary)

- unknown unknowns: 모른다는 사실조차 인지하지 못한 미지의 영역. 이 자료가 겨냥하는 대상이다.
- Johari Window: 이 페이지가 핵심 프레임으로 내건 모델. 여기서는 지도와 영토의 격차를 unknown으로 보는 은유로 쓰인다.
- likelihood-of-tweaking: 계획 항목이 나중에 바뀔 가능성. The tweakable plan은 실행 순서 대신 이 기준으로 계획을 정렬한다.
- throwaway mock: 검증 목적으로만 만들고 버리는 클릭 가능한 시제품. Mock before you wire의 산출물이다.
- semantics map: 참조 구현의 의미 구조를 정리한 도식. Point at a reference가 이해 여부를 증명하는 데 쓴다.
- decisions table: 인터뷰가 끝난 뒤 결정 사항을 정리해 돌려주는 표. The interview의 산출물이다.
