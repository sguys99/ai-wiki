---
title: "A Field Guide to Fable: Finding Your Unknowns (trq212, 2026)"
type: article
year: 2026
category: agents
raw_path: /Users/sguys99/Desktop/project/ai-wiki/raw/articles/trq212-2026-a-field-guide-to-fable.md
raw_filename: "trq212-2026-a-field-guide-to-fable.md"
source_collection: external
source: trq212-2026-a-field-guide-to-fable.md
author: "trq212 (X @trq212)"
url: "https://x.com/trq212/status/2073100352921215386"
publisher: "X (Twitter) / trq212"
tags: [fable, claude-fable-5, unknowns, map-and-territory, agentic-coding, prompting, blindspot-pass, unknown-unknowns, brainstorming, prototyping, html-artifact, implementation-plan, interviews, references, claude-design, implementation-notes, pitches, quizzes, remotion, whisper, color-grading]
---

## 요약 (Summary)

저자 **trq212**가 Claude Fable 5로 작업하며 얻은 실전 가이드다. 축은 알프레드 코집스키의 **"지도는 영토가 아니다(the map is not the territory)"** 다. 프롬프트·스킬·context는 내가 Claude에게 건네는 **지도**이고, 코드베이스와 현실 제약은 작업이 실제로 벌어지는 **영토**다. 이 둘 사이의 간극이 곧 **unknown(모르는 것)** 이다. Claude는 unknown을 만나면 내 의도를 최선으로 추측해 결정한다. 작업량이 클수록 마주치는 unknown도 늘어난다.

저자는 Fable을 두고 **"작업 품질이 unknown을 명료화하는 내 능력에 병목이 걸린 첫 모델"** 이라고 말한다. 모델 역량이 아니라 사용자의 문제 정의가 상한선을 긋는다는 뜻이다. 미리 계획하는 것만으로는 부족하다. unknown은 구현 깊숙한 곳에서 튀어나오기도 하고, 때로는 문제를 아예 다른 방식으로 풀라는 신호이기도 하기 때문이다. 그래서 Fable과의 작업은 구현 **전·중·후**에 걸쳐 unknown을 거듭 발굴하는 과정이 된다.

unknown은 네 갈래로 나뉜다. **Known Knowns**(프롬프트에 담은 것), **Known Unknowns**(모른다는 걸 아는 것), **Unknown Knowns**(너무 당연해 안 적지만 보면 알아채는 것), **Unknown Unknowns**(고려조차 못 한 것). Boris나 Jarred 같은 숙련된 agentic coder는 unknown이 적고 코드베이스·모델 거동과 깊이 동기화돼 있지만, 그들도 unknown을 가정하고 대비한다. unknown을 줄이고 대비하는 것이 곧 agentic coding의 기술이며, Claude와 함께 기를 수 있는 기술이기도 하다.

지시에는 미묘한 균형이 필요하다. 너무 구체적이면 pivot이 나은 상황에서도 Claude가 지시를 그대로 따르고, 너무 모호하면 내 과제에 안 맞을 수도 있는 업계 best practice로 가정을 임의로 채운다. unknown을 셈에 넣지 않으면 어느 쪽이든 실패한다. 이를 시각화하고 표현하기에는 대개 **HTML artifact**가 가장 좋은 매체다.

## 4분면 unknown (Knowing Your Unknowns)

| 분면 | 정의 | 발굴 초점 |
|---|---|---|
| Known Knowns | 프롬프트에 명시한 것 | (이미 안다) |
| Known Unknowns | 아직 못 풀었지만 모른다는 걸 아는 것 | interview·reference |
| Unknown Knowns | 너무 당연해 안 적지만 보면 아는 것 | brainstorm·prototype |
| Unknown Unknowns | 아예 고려조차 못 한 것 | blindspot pass |

## unknown 발굴 8패턴 (Patterns by Stage)

핵심 전제는 **"Help Claude help you"** 다. 가장 중요한 것은 출발점 context를 주는 일이다. 지금 사고가 어디쯤 와 있는지, 문제와 코드베이스 경험은 어느 정도인지 밝혀 Claude를 thought partner로 함께 일하게 한다. Claude는 코드베이스와 인터넷을 아주 빠르게 뒤지고, 평균적인 주제 지식이 나보다 많으며, 실패에서 빠르게 반복한다. 그러니 unknown을 더 빨리 찾는 데 쓴다.

**구현 전 (Pre-implementation)**

1. **Blind Spot Pass** — 낯선 코드 영역이나 익숙지 않은 작업(디자인 반복 등)이라 unknown unknowns가 많을 때 쓴다. "blindspot pass", "unknown unknowns"라는 문구를 문자 그대로 쓰고, 내가 누구이고 무엇을 아는지 context를 준 다음 미지의 영역을 찾아 설명해 달라고 요청한다.
2. **Brainstorms & Prototypes** — 봐야 정의할 수 있는 기준(unknown knowns)이 많을 때 쓴다. 백엔드 배선 없이 버튼 하나의 모습만 보는 식의 저비용 실험으로 이를 일찌감치 언어화한다. 구현 도중에 발견하면 revert 비용이 상대적으로 비싸기 때문이다. 시각 디자인처럼 말로 표현하기 어려운 대상은 여러 접근안(예: 4가지 다른 방향)을 만들어 두고 반응을 본다. 저자는 거의 모든 세션을 탐색과 브레인스토밍으로 시작해 scope를 너무 좁지도 넓지도 않게 잡는다.
3. **Interviews** — 브레인스토밍 뒤에도 남은 unknown은 Claude가 **한 번에 한 질문씩** 인터뷰하게 한다. 답이 아키텍처를 바꿀 질문부터 던지도록 지시한다.
4. **References** — 말로 상세히 못 그릴 때 가장 좋은 답은 reference이고, 그중 최고는 **소스코드**다. 원하는 동작을 구현한 라이브러리나 좋아하는 컴포넌트가 있으면 (다른 언어라도) Fable을 그 폴더로 가리켜 무엇을 볼지 짚어 준다. **Claude Design**도 마찬가지로, 스크린샷이 아니라 대상 웹 모듈의 실제 코드를 읽어 마크업·구조·구현까지 참조한다.
5. **Implementation Plans** — 가장 바뀔 만한 부분(데이터 모델·타입 인터페이스·UX 흐름)을 앞세운 계획을 HTML로 작성하게 하고, 기계적 리팩터링은 뒤로 미룬다. 내가 정말 손댈 지점을 Claude가 먼저 드러내게 하는 것이다.

**구현 중 (During implementation)**

6. **Implementation Notes** — 계획이 만족스러우면 새 세션에서 spec과 프로토타입을 프롬프트로 넘긴다. 아무리 계획해도 unknown unknowns는 늘 숨어 있어, 에이전트가 코드의 edge case 탓에 다른 방향을 골라야 할 때가 있다. Claude Code에게 임시 `implementation-notes.md`를 유지시켜 결정을 기록하게 하고, 계획에서 벗어날 때는 보수적 선택지를 골라 'Deviations'에 남긴 뒤 계속 진행하게 한다.

**구현 후 (Post implementation)**

7. **Pitches & Explainers** — 출시의 핵심은 buy-in과 승인이다. pitch/explainer artifact는, 리뷰어가 나와 같은 unknown에서 출발할 때는 이해를 돕고, 전문가가 unknown과 흔한 실패점을 내가 짚었는지 확인할 때는 승인을 앞당긴다. 프로토타입·spec·notes를 한 문서로 묶고 데모 GIF를 앞세운다.
8. **Quizzes** — 긴 세션 뒤에는 코드 diff만으로 이해가 얕게 남는다. 동작 상당수가 기존 코드 경로에 기대고 있기 때문이다. Claude에게 변경사항 context와 함께 퀴즈를 내게 하고, **완벽히 통과한 뒤에만 merge** 한다.

## 사례: Fable 런칭 영상 (Launching Fable)

런칭 영상을 Claude Code만으로 편집한 사례가 8패턴을 관통한다(저자는 영상 편집 비전문가다).

- **알던 것에서 출발** — Claude가 코드로 영상을 편집하고 전사할 수 있다는 건 알았지만 정확도는 미지수였다. 그래서 Whisper식 전사 원리와, ffmpeg로 "음(um)"이나 긴 정적을 정확히 잘라낼 수 있는지 설명을 요청했다.
- **프로토타입으로 검증** — 말하는 단어와 타이밍이 맞는 UI가 가능한지 확신이 없어, **Remotion**과 전사로 프로토타입 영상을 만들어 작동을 확인했다.
- **unknown 교육으로 전환** — 영상이 muted해 보였고 원인이 color grading이라는 것까지는 알았지만 개념 자체를 몰랐다. 변주안을 만들어 고르려 했으나 "good"의 기준을 몰라 판단할 수 없었다. 그래서 변주 대신 Claude에게 color grading을 **가르쳐 달라**고 요청해 unknown을 발굴했다.

## 결론 (Matching the Map and Territory)

모델이 좋아질수록 올바른 접근이 뒷받침되면 더 많은 것을 이룬다. long-horizon 작업이 틀리게 돌아온다면, unknown 정의에 시간을 더 쓰거나 Claude가 그 사이를 즉흥 대응할 여지를 둔 구현 계획이 필요하다는 신호일 공산이 크다. explainer·brainstorm·interview·prototype·reference는 모두 값이 비싸지기 전에 몰랐던 것을 알아내는 저렴한 수단이다. 결론은 하나다. 다음 프로젝트는 Claude에게 unknown을 함께 찾아 달라고 요청하며 시작하라.

> **자료 성격 주의**: 1차 데이터나 통제 실험 없이 1인칭으로 쓴 opinion/how-to다. 8패턴은 대부분 모델과 무관한 일반 prompting·planning 습관이라 "Fable 고유 이점"과 일반 습관의 경계가 흐리다. 도구 연동(Claude Design·Remotion·ffmpeg)은 2026년 시점 기준이라 이후 달라질 수 있다.

## 관련 페이지 (Related Pages)
- [[agents/thariq-2026-know-your-unknowns|Know your unknowns — examples]] — **이 글의 companion 데모 페이지.** 같은 저자가 본문의 unknown 발굴 패턴을 구현 전·중·후 11개의 동작하는 HTML 아티팩트로 시연한다 (blindspot pass·interview·tweakable plan·implementation notes·quiz-me-before-merge 등)
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani)]] — "prompting → designing loops" 전환. unknown 발굴을 위한 반복 루프와 같은 지향
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]] — Prompt → Context → Harness 진화. 본 글의 "지도(prompt/context/skill)" 개념과 겹침
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code]] — "setup is the work". 구현 전 unknown 발굴 투자와 통함
- [[agents/osmani-2026-agent-skills|Agent Skills]] — spec·test·review·verification 강제. implementation plan·quiz·pitch 패턴과 상보적
- [[overviews/agent-harness-engineering-overview|Agent Harness Engineering 개괄]] — 이 글을 하네스 담론의 "사람 입력단"으로 배치한 합성 페이지
