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

## 한 줄 요약 (One-line Summary)

AI 코딩에서 진짜 비용은 구현이 아니라 **모른다는 사실조차 몰랐던 것**(unknown unknowns)에서 나온다. 구현 전·중·후 세 단계에서 값싸게 unknown을 들춰내는 11가지 기법을, 각각 동작하는 HTML 아티팩트로 시연한 companion 페이지다.

## 1. 자료 정보 (Document Information)

- **유형**: 블로그 포스트의 companion(예시 데모 인덱스) 페이지
- **저자**: Thariq (사이트 소유자, 페이지에 별도 표기 없음)
- **URL**: https://thariqs.github.io/html-effectiveness/unknowns/
- **성격**: 11개 self-contained HTML 아티팩트를 3개 phase(pre/during/post-implementation)로 묶은 인덱스. 각 아티팩트는 실제 클릭·조작 가능한 데모.
- **주의**: 페이지에 발행일이 없어 year는 2026으로 추정. 본문 산문은 요약본이나, 11개 데모 이름·설명은 verbatim 확보.

## 2. 주요 기여 (Key Contributions)

- **문제 재정의**: 코딩 에이전트 시대의 병목은 "코드를 못 짜는 것"이 아니라 "무엇을 몰랐는지 늦게 아는 것"이다. Johari Window를 빌려 *"지도는 영토가 아니며, 그 격차가 곧 당신의 unknown이다"* 로 규정한다.
- **처방의 이동**: 검증 시점을 구현 뒤가 아니라 **구현 앞**으로 당긴다. explainer·brainstorm·interview·prototype은 모두 "몰랐던 것을 값싸게 알아내는 수단"이다.
- **실행 가능한 카탈로그**: 추상 원칙에 그치지 않고, 각 기법을 조작 가능한 HTML 데모로 구현해 "이렇게 생겼다"를 직접 보여준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

11개 기법을 구현 타임라인 기준 3단계로 배치한다.

### Pre-implementation (구현 전, 8개) — 발견 비용이 가장 싼 구간

1. **Blindspot pass** — 낯선 auth 모듈을 Claude가 훑고 사용자의 unknown unknown을 리포트.
2. **Teach me my unknowns** — "영상 좀 더 예쁘게" 같은 모호한 요구를 인터랙티브 color-grading explainer로 풀어, 전문 용어 수준의 정밀한 프롬프트로 번역.
3. **Four design directions** — 같은 review queue를 네 가지 상반된 방식으로 렌더링하고, steal/skip 칩으로 사용자의 응답을 대신 작성.
4. **Mock before you wire** — 실제 코드를 건드리기 전에 frame-annotation 툴바를 클릭 가능한 throwaway mock으로 먼저 만들어 검증.
5. **Brainstorm the intervention** — codebase에 기반한 churn 개입 아이디어 10개를 "오늘 오후에 출시" ~ "분기짜리 베팅" 축으로 배치.
6. **The interview** — 모호한 기능에 대해 Claude가 한 번에 한 질문씩 인터뷰하고, 끝에 decisions table을 돌려줌.
7. **Point at a reference** — Rust reference 구현을 TypeScript로 포팅하기 전에, Claude가 원본 의미를 이해했음을 semantics map으로 증명.
8. **The tweakable plan** — 구현 계획을 실행 순서가 아니라 **바뀔 가능성(likelihood-of-tweaking)** 순으로 정렬.

### During implementation (구현 중, 1개)

9. **Implementation notes** — 3시간짜리 빌드 동안 Claude가 남긴 running log. 계획에서 벗어난 지점과 보수적으로 내린 판단을 기록해 다음 시도의 밑천으로 삼음.

### Post-implementation (구현 후, 2개)

10. **The buy-in doc** — 애니메이션 데모로 시작해 리뷰어의 반론을 미리 되받는 ship-it 피치 문서.
11. **Quiz me before I merge** — merge 준비도 리포트. 여섯 문항짜리 퀴즈를 통과해야 병합할 수 있게 하여 이해도를 강제 검증.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 성격상 실증 연구가 아니라 **패턴 카탈로그 + 동작 데모**다. 핵심 주장은 "unknown을 늦게 발견할수록 비싸다 → 발견 시점을 앞당기는 값싼 장치를 여러 개 상시 배치하라"이며, 근거는 11개 아티팩트의 존재 자체다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 페이지는 인덱스/데모 수준이라, 각 기법의 적용 조건·실패 사례·비용 대비 효과에 대한 정량 논의가 없다.
- 저자·발행일이 명시되지 않아 출처 추적성이 약하다 (본 wiki는 year 2026 추정으로 기록).
- 원문 산문 전문을 verbatim으로 확보하지 못해, 프레임(Johari Window)과 11개 데모 설명 외 세부 논지는 요약 의존.

## 6. 관련 연구 (Related Work)

- **A Field Guide to Fable: Finding Your Unknowns** (trq212, 원 블로그 포스트) — 이 페이지의 짝이 되는 산문 에세이. 같은 저자(trq212 = Thariq)가 Korzybski "지도는 영토가 아니다"와 4분면 unknown(Known/Unknown × Known/Unknown)으로 프레임을 세우고 구현 전·중·후 패턴을 전개한다. 본 companion은 그 패턴들을 동작하는 HTML 데모로 옮긴 것.
- **Effective Context Engineering for AI Agents** (Anthropic) — high-signal 토큰 최소 집합. unknown을 미리 걷어내는 것도 컨텍스트 신호 정제의 일종.
- **awesome-harness-engineering** — harness를 모델과 분리된 공학으로 보는 관점. 이 자료는 그 harness 위에서 "무엇을 물어볼지"를 설계하는 실천 패턴.
- Karpathy 계열 AI-assisted dev 논의와 결이 같음(계획·프로토타입 우선).

## 7. 용어집 (Glossary)

- **unknown unknowns**: 모른다는 사실조차 인지하지 못한 미지의 영역. 이 글의 표적.
- **Johari Window**: 자기/타인이 아는지 여부로 앎을 4분면으로 나누는 모델. 여기서는 "map vs territory 격차 = unknown"의 은유로 차용.
- **likelihood-of-tweaking**: 계획 항목이 나중에 바뀔 확률. 실행 순서 대신 이 축으로 계획을 정렬.
- **throwaway mock**: 검증용으로만 만들고 버릴 클릭 가능한 시제품.
