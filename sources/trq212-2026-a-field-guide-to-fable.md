---
title: "A Field Guide to Fable: Finding Your Unknowns"
type: article
year: 2026
category: agents
raw_path: raw/articles/trq212-2026-a-field-guide-to-fable.md
raw_filename: "trq212-2026-a-field-guide-to-fable.md"
source_collection: external
author: "trq212 (X @trq212)"
url: "https://x.com/trq212/status/2073100352921215386"
publisher: "X (Twitter) / trq212"
tags: [fable, claude-fable-5, unknowns, map-and-territory, agentic-coding, prompting, blindspot-pass, unknown-unknowns, brainstorming, prototyping, html-artifact, implementation-plan, interviews, references, claude-design, implementation-notes, pitches, quizzes, remotion, whisper, color-grading]
---

## 한 줄 요약 (One-line Summary)

Claude Fable 5로 작업하며 저자(trq212)가 정리한 실전 가이드다. "지도는 영토가 아니다(the map is not the territory)"를 축으로 삼아, 프롬프트·스킬·context는 지도이고 코드베이스·현실 제약은 영토라고 본다. 둘 사이의 간극이 곧 **unknown(모르는 것)** 이다. 저자는 Fable을 두고, 작업 품질이 이 unknown을 명료화하는 사용자 능력에서 병목이 걸리는 첫 모델이라고 말한다. 그래서 구현 전·중·후 각 단계에서 unknown을 발굴하는 8가지 패턴을 제시한다(blindspot pass, brainstorm/prototype, interview, reference, implementation plan, implementation notes, pitch/explainer, quiz).

## 1. 자료 정보 (Document Information)

- **저자**: trq212 (X 핸들 @trq212)
- **매체**: X(구 Twitter) 게시글 (긴 스레드 형식 에세이)
- **URL**: https://x.com/trq212/status/2073100352921215386
- **분량**: 장문 에세이 (~1,800 단어)
- **다루는 모델**: Claude Fable 5 ("Fable"), Claude Code, Claude Design
- **언급 인물**: Boris, Jarred (숙련된 agentic coder 예시)
- **언급 도구**: HTML artifact, Remotion, Whisper, ffmpeg
- **성격**: 1인칭 실전 노트 — 정량 벤치마크 없이 저자 개인의 워크플로우 경험을 정리한 opinion/how-to 글

## 2. 주요 기여 (Key Contributions)

1. **Map-and-Territory 프레임** — 지도(프롬프트·스킬·context)와 영토(코드베이스·현실) 사이의 간극을 unknown으로 정의한다. Claude는 unknown을 만나면 사용자 의도를 최선으로 추측해 결정하는데, 작업량이 클수록 마주치는 unknown도 늘어난다.
2. **Fable의 병목은 unknown 명료화** — Fable을 "작업 품질이 unknown을 명료화하는 사용자 능력에 병목이 걸린 첫 모델"이라고 규정한다. 상한선을 긋는 것은 모델 역량이 아니라 사용자의 문제 정의 능력이라는 얘기다.
3. **4분면 unknown 분류** — Rumsfeld 매트릭스를 빌려 Known Knowns / Known Unknowns / Unknown Knowns / Unknown Unknowns로 나눈다. 그중 **Unknown Knowns**(너무 당연해 적지 않지만 보면 알아채는 것)와 **Unknown Unknowns**(아예 고려조차 못 한 것)를 발굴 대상으로 짚는다.
4. **과잉 명세 ↔ 과소 명세의 양날** — 너무 구체적이면 pivot이 나은 상황에서도 Claude가 지시를 그대로 따르고, 너무 모호하면 업계 best practice로 빈칸을 임의로 채운다. unknown을 다루지 못하면 어느 쪽이든 실패한다.
5. **8가지 unknown 발굴 패턴을 단계별로 카탈로그화** — 구현 전/중/후로 나눠 재사용 가능한 기법 모음을 제시한다(아래 3장).
6. **Fable 런칭 영상 사례** — 런칭 영상을 Claude Code만으로 편집한 실제 사례를 들어 8패턴을 관통해 보여준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저자는 unknown 발굴을 구현 전·중·후 3구간으로 나눈다. 시각화와 표현에는 대개 HTML artifact가 가장 좋은 매체라고 본다.

**공통 원칙 — "Help Claude help you"**: 무엇보다 Claude에게 출발점 context를 주는 게 중요하다. 지금 사고 과정의 어디쯤인지, 문제와 코드베이스를 얼마나 경험했는지 밝히고, thought partner처럼 함께 작업하게 한다. Claude는 코드베이스와 인터넷을 아주 빠르게 검색하고, 평균적인 주제 지식은 사용자보다 많으며, 실패해도 금세 다시 시도한다. 이 점을 살려 unknown을 더 빨리 찾아낸다.

**Pre-implementation (구현 전)**
- **Blind Spot Pass** — 낯선 코드 영역이나 익숙지 않은 작업(디자인 반복 등)이라 unknown unknowns가 많을 때 쓴다. "blindspot pass", "unknown unknowns"라는 문구를 문자 그대로 쓰고, 자신이 누구이고 무엇을 아는지 context를 준 뒤, Claude에게 미지의 영역을 찾아 설명해 달라고 요청한다.
- **Brainstorms and Prototypes** — 직접 봐야 정의되는 기준(unknown knowns)이 많을 때다. 이런 unknown knowns는 프로토타이핑 단계에서 일찍 언어화할수록 값지다. 구현 도중에 발견하면 revert 비용이 훨씬 커지기 때문이다. 백엔드 라우트를 배선하지 않고 버튼 하나의 모습만 보는 식의 저비용 실험이 여기 해당한다. 시각 디자인처럼 말로 옮기기 어려운 대상은 여러 접근안(예컨대 4가지 방향)을 만들어 놓고 반응을 살핀다. 저자는 거의 모든 코딩 세션을 탐색과 브레인스토밍으로 열어 scope를 의도적으로 좁힌다.
- **Interviews** — 브레인스토밍을 거치고도 남은 unknown은 Claude가 한 번에 한 질문씩 인터뷰하게 한다. 특히 답에 따라 아키텍처가 바뀔 질문을 먼저 던지도록 지시한다.
- **References** — 말로 다 그리기 어려울 때 가장 좋은 답은 reference이고, 그중 으뜸은 소스코드다. 원하는 동작을 구현한 라이브러리나 마음에 드는 디자인 컴포넌트가 있으면 (언어가 달라도) Fable을 그 폴더로 가리켜 무엇을 볼지 일러준다. Claude Design도 같은 원리로 움직인다. 스크린샷이 아니라 웹사이트 모듈의 실제 코드를 읽어 마크업·구조·구현 방식까지 풍부한 디테일을 얻는다.
- **Implementation Plans** — 이제 구현해도 되겠다 싶으면, 가장 바뀔 가능성이 큰 부분(데이터 모델, 타입 인터페이스, UX 흐름)을 앞세운 계획을 HTML로 작성하게 하고 기계적 리팩터링은 뒤로 미룬다. 정말 손봐야 할 지점을 Claude가 먼저 드러내게 하는 것이다.

**During implementation (구현 중)**
- **Implementation Notes** — 계획이 흡족하면 새 세션을 열어 spec·프로토타입 같은 artifact를 프롬프트로 넘긴다. 아무리 계획을 짜도 unknown unknowns는 늘 숨어 있어서, 에이전트가 코드에서 발견한 edge case 때문에 방향을 틀어야 할 때가 있다. 그래서 Claude Code에게 임시 `implementation-notes.md`(또는 .html)를 유지시켜 내린 결정을 기록하게 하고, 다음 시도에서 그것을 학습한다. 계획을 벗어날 때는 보수적인 선택지를 고른 뒤 'Deviations'에 로그하고 계속 진행하도록 지시한다.

**Post implementation (구현 후)**
- **Pitches and Explainers** — 출시에서 관건은 buy-in과 승인을 얻는 일이다. pitch/explainer artifact를 최종 문서에 넣어 두면, 리뷰어가 저자와 같은 unknown에서 출발할 때 이해가 빨라지고, 전문가가 저자가 unknown과 흔한 실패점을 제대로 짚었는지 확인할 때 승인도 빨라진다. 프로토타입·spec·implementation notes를 한 문서로 묶고 데모 GIF를 맨 앞에 둔다.
- **Quizzes** — 긴 세션 뒤에는 코드 diff만 봐서는 이해가 얕다. 동작 상당수가 기존 코드 경로에 기대고 있어서다. 그래서 Claude에게 변경사항 context와 함께 퀴즈를 내게 하고, 그 퀴즈를 완벽히 통과한 뒤에야 merge한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 대신 **Fable 런칭 영상** 편집 사례로 방법론을 보여준다(전 과정을 Claude Code로 편집했고, 저자는 비전문가다).

- **알던 것에서 출발**: Claude가 코드로 영상을 편집하고 전사할 수 있다는 건 알았지만 정확도는 확신이 없었다. 그래서 Whisper식 전사 원리와, ffmpeg로 "음(um)"이나 긴 정적을 정확히 잘라낼 수 있는지 Claude에게 설명을 청했다.
- **프로토타입으로 검증**: 말하는 단어와 타이밍이 맞는 UI가 가능한지 알 수 없었다. Remotion과 전사를 써서 프로토타입 영상을 만들어 작동 여부를 확인했다.
- **unknown 교육으로 전환**: 영상이 다소 muted해 보였고 원인이 color grading이라는 것까지는 알았지만 정작 그 개념을 몰랐다. 변주안을 만들어 고르려 했으나 "good"이 무엇인지 몰라 판단이 서지 않았다. 그래서 변주 대신 Claude에게 color grading을 가르쳐 달라고 해 unknown을 캐냈다.

**결론(Matching the Map and Territory)**: 모델이 좋아질수록 올바른 접근으로 더 많은 것을 해낼 수 있다. long-horizon 작업이 틀리게 돌아온다면, unknown 정의에 시간을 더 쓰거나 Claude가 즉흥 대응할 여지를 둔 구현 계획이 필요하다는 신호일 공산이 크다. explainer·brainstorm·interview·prototype·reference는 모두, 대가가 커지기 전에 몰랐던 것을 알아내는 값싼 수단이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **1차 자료가 아닌 opinion/how-to**: 정량 데이터도, 통제 실험도, 재현 절차도 없는 저자 개인의 워크플로우 경험담이다. 8패턴의 효과는 일화적 근거에 기댄다.
- **Fable 특정성 불명확**: "Fable에서 특히 잘 통한다"고 하지만, 제시한 패턴 대부분은 모델을 가리지 않는 일반 prompting·planning 습관이라 Fable 고유의 이점과 일반 습관의 경계가 흐릿하다.
- **도구 버전 의존**: Claude Design, `/loop`류 워크플로우, Remotion·ffmpeg 연동은 2026년 시점의 도구 상태를 기준으로 하므로 이후 달라질 수 있다.
- **정량 판단 기준 부재**: "언제 어떤 기법을 쓰는가"는 반복 경험으로 직관을 길러야 한다고만 할 뿐, 명시적인 결정 규칙은 주지 않는다("build the intuition for when to use them").

## 6. 관련 연구 (Related Work)

- **[[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani)]]** — "prompting → designing loops"로의 전환. 이 글의 "unknown 발굴을 위한 반복 루프" 시각과 같은 지향을 다른 어휘로 짚는다.
- **[[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]** — Prompt → Context → Harness 진화. 이 글의 "지도(prompt/context/skill)" 개념과 겹친다.
- **[[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code]]** — "setup is the work" 관점. 구현에 앞서 unknown 발굴에 투자하는 이 글의 태도와 통한다.
- **[[agents/osmani-2026-agent-skills|Agent Skills]]** — spec·test·review·verification을 워크플로우로 강제한다. 이 글의 implementation plan·quiz·pitch 패턴과 서로 보완한다.

## 7. 용어집 (Glossary)

- **Fable (Claude Fable 5)**: 저자가 이 글에서 다루는 Claude 모델. 작업 품질이 사용자의 unknown 명료화 능력에서 병목이 걸리는 첫 모델이라고 평가한다.
- **Map and Territory**: 지도(작업 표상 — 프롬프트·스킬·context)와 영토(작업이 실제로 일어나는 곳 — 코드베이스·현실 제약)의 구분. 알프레드 코집스키의 "지도는 영토가 아니다"에서 차용.
- **Unknown(모르는 것)**: 지도와 영토의 차이. Claude가 마주치면 사용자 의도를 최선으로 추측해 결정한다.
- **4분면**: Known Knowns(프롬프트에 담긴 것) / Known Unknowns(모른다는 걸 아는 것) / Unknown Knowns(당연해서 안 적지만 보면 아는 것) / Unknown Unknowns(고려조차 못 한 것).
- **Blindspot Pass**: Claude에게 unknown unknowns를 찾아 설명하게 하는 사전 점검 기법. 문구를 문자 그대로 사용.
- **Claude Design**: 스크린샷이 아니라 대상 웹 모듈의 실제 코드를 읽어 마크업·구조·구현을 참조하는 방식.
- **Implementation Notes**: 구현 중 계획 이탈·edit case 결정을 기록하는 임시 `implementation-notes.md`.
- **Remotion / Whisper / ffmpeg**: 런칭 영상 사례에서 각각 코드 기반 영상 UI, 전사, 프레임·정적 편집에 쓰인 도구.
- **Color Grading**: 영상 색보정. 저자가 "good의 기준"을 몰라 Claude에게 개념을 배워 unknown을 발굴한 사례.
