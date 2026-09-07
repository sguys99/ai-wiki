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

Claude Fable 5로 작업하며 저자 trq212가 정리한 실전 가이드다. "지도는 영토가 아니다(the map is not the territory)"를 출발점으로 삼아, 프롬프트와 스킬과 컨텍스트는 지도이고 코드베이스와 현실 제약은 영토라고 본다. 둘 사이의 차이가 곧 unknown이다. 저자는 Fable을 두고 작업 품질이 이 unknown을 명료화하는 사용자 능력에서 병목이 걸리는 첫 모델이라고 말한다. 그래서 구현 전, 구현 중, 구현 후 각 단계에서 unknown을 발굴하는 8가지 패턴을 제시하고 패턴마다 실제로 쓰는 프롬프트 예시를 붙인다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저자 | trq212 (X 핸들 @trq212) |
| 매체 | X(구 Twitter) 게시글, 긴 스레드 형식의 에세이 |
| URL | https://x.com/trq212/status/2073100352921215386 |
| 분량 | 본문 약 2,100 단어 |
| 다루는 모델 | Claude Fable 5(본문 표기 "Fable"), Claude Code, Claude Design |
| 언급 인물 | Boris, Jarred (숙련된 agentic coder 예시, 성은 표기되지 않음) |
| 언급 도구 | HTML artifact, Remotion, Whisper, ffmpeg |
| 성격 | 1인칭 실전 노트. 정량 벤치마크 없이 저자 개인의 워크플로 경험을 정리한 opinion 겸 how-to 글 |

원문은 두 개의 외부 링크를 본문 안에서 언급한다. 하나는 unknown 발굴용 예시 artifact 모음이고("I've made some example artifacts for finding unknowns here"), 다른 하나는 Fable 런칭 영상 제작 과정을 더 자세히 설명한 영상이다("You can watch a more in-depth explanation on that here"). 저자는 HTML을 Claude와 함께 쓰는 방법을 이전에 따로 글로 쓴 적이 있다고도 밝힌다.

## 2. 주요 기여 (Key Contributions)

| 기여 | 내용 |
|---|---|
| map-and-territory 프레임 | 지도(프롬프트, 스킬, 컨텍스트)와 영토(코드베이스, 현실 제약) 사이의 차이를 unknown으로 정의한다. Claude는 unknown을 만나면 사용자 의도를 최선으로 추측해 결정하고, 작업량이 클수록 마주치는 unknown도 늘어난다 |
| Fable의 병목은 unknown 명료화 | Fable을 "작업 품질이 unknown을 명료화하는 내 능력에 병목이 걸린 첫 모델"이라고 규정한다. 상한을 긋는 것이 모델 역량이 아니라 사용자의 문제 정의 능력이라는 뜻이다 |
| 사전 계획만으로 부족하다는 지적 | unknown은 구현 깊숙한 곳에서 나오기도 하고, 애초에 문제를 다른 방식으로 풀어야 한다는 신호이기도 하다. 그래서 발굴은 구현 전에 한 번 끝나는 절차가 아니라 전, 중, 후에 걸친 반복 과정이 된다 |
| unknown 4분면 분류 | Known Knowns, Known Unknowns, Unknown Knowns, Unknown Unknowns로 나눈다. 그중 Unknown Knowns와 Unknown Unknowns를 발굴 대상으로 짚는다 |
| 과잉 명세와 과소 명세의 양면 실패 | 너무 구체적이면 pivot이 나은 상황에서도 Claude가 지시를 그대로 따르고, 너무 모호하면 과제에 맞지 않을 수도 있는 업계 best practice로 빈칸을 채운다. unknown을 셈에 넣지 않으면 어느 쪽으로든 실패한다 |
| 8가지 발굴 패턴의 단계별 카탈로그 | 구현 전, 중, 후로 나눠 재사용 가능한 기법 8가지를 정리하고 각각에 프롬프트 예시를 붙인다 |
| Fable 런칭 영상 사례 | 런칭 영상을 Claude Code만으로 편집한 실제 사례로 패턴 적용을 관통해 보여준다 |

### 2-1. unknown 4분면

| 분면 | 원문 정의 | 발굴 난이도 |
|---|---|---|
| Known Knowns | 프롬프트에 담긴 것. 에이전트에게 내가 원한다고 말한 내용 | 이미 안다 |
| Known Unknowns | 아직 못 풀었지만 못 풀었다는 사실은 아는 것 | 질문으로 좁힐 수 있다 |
| Unknown Knowns | 너무 당연해 적어두지 않지만 보면 알아채는 것 | 봐야 정의된다 |
| Unknown Unknowns | 아예 고려하지 못한 것. 어떤 지식을 모르는지 모르는 상태. 무언가가 얼마나 좋아질 수 있는지 모르는 상태 | 외부에서 짚어줘야 한다 |

저자는 뛰어난 agentic coder일수록 unknown이 상대적으로 적다고 본다. Boris나 Jarred가 프롬프트를 쓰는 모습을 보면 자기가 원하는 바를 세부까지 알고 있고, 코드베이스와 모델 거동 양쪽에 깊이 동기화돼 있다는 것이다. 다만 그들도 unknown이 있다고 가정하고 대비한다. unknown을 줄이고 대비하는 일 자체가 agentic coding의 기술이며, Claude와 함께 일하면서 기를 수 있는 기술이라는 것이 저자의 주장이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저자는 unknown 발굴을 구현 전, 중, 후 세 구간으로 나눈다. 시각화와 표현 매체로는 거의 모든 경우에 HTML artifact가 가장 낫다고 본다.

### 3-1. 공통 원칙 "Help Claude help you"

Claude는 unknown을 더 빨리 찾는 데 쓸 수 있는 도구다. 근거로 세 가지를 든다.

- 코드베이스와 인터넷을 아주 빠르게 검색한다
- 평균적인 주제에 대해 사용자보다 많이 안다
- 실패에서 빠르게 반복한다

이 과정에서 가장 중요한 부분은 Claude에게 출발점 컨텍스트를 주는 일이다. 지금 사고 과정의 어디쯤에 있는지 말하고, 문제와 코드베이스에 대한 자기 경험 수준을 밝히고, thought partner처럼 함께 일하게 한다.

### 3-2. 8패턴 카탈로그

| 단계 | 패턴 | 겨냥하는 unknown | 핵심 동작 |
|---|---|---|---|
| 구현 전 | Blind Spot Pass | Unknown Unknowns | Claude에게 사각지대를 찾아 설명하게 한다 |
| 구현 전 | Brainstorms and Prototypes | Unknown Knowns | 저비용 프로토타입을 보고 기준을 언어화한다 |
| 구현 전 | Interviews | Known Unknowns | 한 번에 한 질문씩 인터뷰받는다 |
| 구현 전 | References | 표현 불가능한 요구 | 소스코드를 참조로 가리킨다 |
| 구현 전 | Implementation Plans | 바뀔 가능성이 큰 결정 | 변경 가능성이 큰 항목을 앞세운 계획을 받는다 |
| 구현 중 | Implementation Notes | 구현 중 튀어나오는 Unknown Unknowns | 결정과 이탈을 파일에 기록시킨다 |
| 구현 후 | Pitches and Explainers | 리뷰어와 전문가의 unknown | 프로토타입, spec, notes를 한 문서로 묶는다 |
| 구현 후 | Quizzes | 변경 내용에 대한 자기 이해 | 퀴즈를 통과한 뒤에만 merge한다 |

저자는 매번 8가지를 다 쓰지는 않는다고 밝히고, 언제 무엇을 쓸지에 대한 직관은 반복 사용으로 길러야 한다고 말한다.

### 3-3. 구현 전 (Pre-implementation)

#### Blind Spot Pass

코드베이스의 낯선 영역에서 기능을 쓰거나, 디자인 반복처럼 익숙하지 않은 작업을 Claude와 할 때 Unknown Unknowns가 많이 생긴다. 저자는 이때 모르는 것을 네 가지로 나열한다. 어떤 질문을 해야 하는지 모르고, 무엇이 좋은 상태인지 모르고, 과거에 어떤 작업이 있었는지 모르고, 어떤 함정을 피해야 하는지 모른다. 대응은 Claude에게 Unknown Unknowns를 찾아 설명해 달라고 요청하는 것이다. 저자는 "blindspot pass"와 "unknown unknowns"라는 문구를 문자 그대로 쓰기를 선호하며, 자신이 누구이고 무엇을 아는지 컨텍스트를 주는 것이 대체로 중요하다고 덧붙인다.

원문 프롬프트 예시 두 가지는 다음과 같다.

> "I'm working on adding a new auth provider but I know nothing about the auth modules in this codebase. Can you do a blindspot pass to help me figure out my relevant unknown unknowns and help me prompt you better."

> "I don't know what color grading is but I need to grade this video. Can you teach me to understand my unknown unknowns about color grading, so that I can prompt better?"

두 프롬프트의 공통 구조는 자기 무지를 먼저 선언하고("I know nothing about", "I don't know what"), 그다음에 사각지대 탐색을 요청하며, 마지막에 "프롬프트를 더 잘 쓰기 위해서"라는 목적을 붙이는 것이다.

#### Brainstorms and Prototypes

Unknown Knowns가 많은 영역, 즉 봐야만 정의할 수 있는 기준이 걸린 영역에서 쓴다. 프로토타이핑 단계에서 Unknown Knowns를 일찍 찾아 언어화하는 것이 값지다. 구현 중에 발견하면 상대적으로 비싸기 때문이다. 저자가 드는 이유는 두 가지다. 기능이나 spec의 작은 변경이 코드 구현을 크게 바꿀 수 있고, 에이전트가 이전 변경을 되돌리기는 더 어렵다.

저비용 실험의 예로 백엔드 라우트를 배선하거나 프론트엔드 상태를 추가로 관리하지 않고 프레임에 버튼 하나를 추가했을 때의 모습만 보는 경우를 든다. 시각 디자인은 저자에게 말로 표현하기 어려운 대상이지만 보면 원하는 바를 아는 종류라서, 이럴 때는 여러 디자인 접근안을 요청한다.

저자는 거의 모든 코딩 세션을 탐색이나 브레인스토밍 단계로 시작한다. 프로젝트 scope를 의도를 갖고 정의하기 위해서다. 이 단계의 효과는 양방향이다. Claude는 저자가 놓쳤을 고가치 접근을 자주 찾아내고, 때로는 나무만 보고 숲을 놓치기도 한다. 브레인스토밍은 scope를 너무 좁게 잡는 것도 너무 넓게 잡는 것도 막아준다.

원문 프롬프트 예시 세 가지다.

> "I want a dashboard for this data but I have no visual taste and don't know what's possible. Make me an HTML page with 4 wildly different design directions so I can react to them."

> "Before wiring anything up, make a single HTML file mocking the new editor toolbar with fake data. I want to react to the layout before you touch the real app."

> "Here's my rough problem: users churn after onboarding. Search the codebase and brainstorm 10 places we could intervene, from cheapest to most ambitious. I'll tell you which ones resonate."

세 프롬프트 모두 "react to"라는 표현으로 사용자의 역할을 반응자로 못박고, 산출물의 개수를 숫자로 지정한다(4가지 방향, 10곳). 세 번째 프롬프트는 비용순 정렬까지 요구한다.

#### Interviews

브레인스토밍을 충분히 했는데도 남는 unknown이 있을 때 쓴다. Claude에게 모호한 지점을 인터뷰하게 하되, 질문을 유도할 수 있도록 문제에 대한 컨텍스트를 함께 준다.

> "Interview me one question at a time about anything ambiguous, prioritize questions where my answer would change the architecture."

한 번에 한 질문이라는 제약과 아키텍처를 바꿀 질문 우선이라는 우선순위가 이 프롬프트의 두 조건이다.

#### References

원하는 바를 상세히 서술할 수 없을 때가 있다. 어휘가 없거나, 서술하는 데 시간이 너무 오래 걸릴 만큼 복잡한 경우다. 이때 가장 좋은 답은 reference다. 다이어그램, 문서, 그림도 포함할 수 있지만 최고의 reference는 소스코드다. 원하는 방식으로 무언가를 구현한 라이브러리나 마음에 드는 디자인 컴포넌트가 있으면, 언어가 달라도 Fable을 그 폴더로 가리키고 무엇을 볼지 알려주면 된다.

Claude Design도 같은 원리로 동작한다. 파일을 직접 건네도 되지만 그럴 필요는 없고, 마음에 드는 웹사이트의 모듈을 가리키면 스크린샷이 아니라 그 아래 코드를 읽는다. 그래서 마크업, 구조, 컴포넌트가 실제로 어떻게 만들어졌는지까지 훨씬 풍부한 디테일을 얻는다.

> "This Rust crate in vendor/rate-limiter implements the exact backoff behavior I want. Read it and reimplement the same semantics in our TypeScript API client."

#### Implementation Plans

구현해도 되겠다는 판단이 서면 Claude에게 검토용 구현 계획을 요청한다. 계획은 바뀔 가능성이 가장 큰 부분에 초점을 맞춘다. 저자가 드는 예는 데이터 모델, 타입 인터페이스, UX 흐름이다. 이렇게 하면 저자가 실제로 바꿔야 할 지점을 Claude가 먼저 드러내게 된다.

> "Write an implementation plan in HTML, but lead with the decisions I'm most likely to tweak with: data model changes, new type interfaces, and anything user-facing. Bury the mechanical refactoring at the bottom, I trust you on that part."

기계적 리팩터링을 문서 맨 아래로 묻으라는 지시("Bury ... at the bottom")와 그 부분은 믿는다는 표현이 함께 붙는다. 검토 대상과 위임 대상을 문서 배치로 구분한다.

### 3-4. 구현 중 (During implementation)

#### Implementation Notes

계획이 만족스러우면 새 세션을 만들어 artifact를 프롬프트로 넘긴다. 저자가 드는 예는 spec 파일과 프로토타입을 함께 넘기고 구현을 맡기는 경우다.

아무리 계획해도 Unknown Unknowns는 항상 숨어 있다. 에이전트가 작업 중에 코드에서 edge case를 발견해 다른 방향을 잡아야 할 때가 있다. 그래서 저자는 Claude Code에게 임시 `implementation-notes.md`(또는 .html) 파일을 유지하게 하고 내린 결정을 기록시킨다. 다음 시도에서 그 기록으로부터 배우기 위해서다.

> "Keep an implementation-notes.md file. If you hit an edge case that forces you to deviate from the plan, pick the conservative option, log it under 'Deviations', and keep going."

이 프롬프트는 세 동작을 한 문장에 묶는다. 보수적 선택지를 고르고, 'Deviations' 항목에 기록하고, 멈추지 말고 계속 진행한다.

### 3-5. 구현 후 (Post implementation)

#### Pitches and Explainers

무언가를 출시할 때 가장 중요한 부분 중 하나가 buy-in과 승인을 얻는 일이다. 최종 문서에 pitch와 explainer artifact를 만들어 두면 두 가지에 도움이 된다.

- 리뷰어가 저자와 같은 unknown에서 출발할 때 이해 속도를 높인다
- 전문가가 저자와 같은 unknown과 흔한 실패 지점을 저자가 고려했는지 확인하려 할 때 승인 속도를 높인다

> "Package the prototype, the spec, and the implementation notes into a single doc I can drop in Slack to get buy-in. Lead with the demo GIF."

#### Quizzes

긴 작업 세션 뒤에는 Claude가 저자가 인지한 것보다 훨씬 많은 일을 해냈을 수 있다. 코드 diff를 읽는 것만으로는 이해가 얕게 남는데, 동작의 상당 부분이 기존 코드 경로에 의존하기 때문이다. 그래서 충분한 컨텍스트와 함께 변경 내용에 대한 퀴즈를 내달라고 요청한다. 저자는 퀴즈를 완벽하게 통과한 뒤에만 merge한다.

> "I want to make sure I understand everything that's happened in this change. Give me a HTML report on the changes for me to read and understand with context, intuition, what was done, etc. and a quiz at the bottom on the changes that I must pass."

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 대신 Fable 런칭 영상 편집 사례로 방법론 적용을 보여준다. 영상은 전 과정을 Claude Code로 편집했고, 저자는 영상 편집이 처음인 비전문가라고 밝힌다.

| 단계 | 저자가 아는 것 | unknown | 적용한 패턴 |
|---|---|---|---|
| 전사 정확도 확인 | Claude가 코드로 영상을 편집하고 전사할 수 있다 | 전사가 충분히 정확한지 모른다 | Whisper식 전사의 원리와 ffmpeg로 "음(um)"이나 긴 정적을 정확히 잘라낼 수 있는지 설명 요청 |
| 타이밍 UI 검증 | 말하는 단어에 맞춘 UI를 원한다 | 실제로 구현 가능한지 모른다 | Remotion과 전사로 프로토타입 영상을 만들어 작동 확인 |
| 색보정 학습 | 영상이 다소 muted해 보이고 원인이 color grading이다 | color grading이 무엇인지 모른다 | 변주안을 만들어 고르려 했으나 "good"의 기준을 몰라 판단할 수 없었고, 대신 Claude에게 color grading을 가르쳐 달라고 요청해 unknown을 발굴 |

세 번째 단계가 이 사례의 요점이다. 저자의 첫 시도는 Claude에게 몇 가지 변주를 만들게 해 고르는 방식이었다. 그러나 color grading에서 무엇이 "good"인지 모른다는 사실을 깨닫고, 선택지를 늘리는 대신 개념 자체를 배우는 쪽으로 방향을 바꿨다.

### 4-1. 결론 (Matching the Map and Territory)

모델이 좋아질수록 올바른 접근을 쓰면 더 많은 것을 해낼 수 있다. long-horizon 작업이 틀린 결과로 돌아온다면, unknown 정의에 시간을 더 쓰거나 Claude가 그 사이를 즉흥 대응할 여지를 둔 구현 계획이 필요하다는 신호일 가능성이 크다. explainer, brainstorm, interview, prototype, reference는 모두 대가가 커지기 전에 몰랐던 것을 알아내는 값싼 수단이다. 저자는 다음 프로젝트를 Claude에게 unknown을 함께 찾아 달라고 요청하며 시작하라는 권고로 글을 맺는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

| 한계 | 내용 |
|---|---|
| 1차 자료가 아닌 opinion 겸 how-to | 정량 데이터, 통제 실험, 재현 절차가 없는 저자 개인의 워크플로 경험담이다. 8패턴의 효과는 일화적 근거에 기댄다 |
| Fable 특정성 불명확 | 저자는 Fable을 두고 unknown 명료화가 병목이 되는 첫 모델이라고 말하지만, 제시한 패턴 대부분은 모델을 가리지 않는 일반적인 프롬프트 작성과 계획 습관이다. Fable 고유의 이점과 일반 습관의 경계가 흐릿하다 |
| 도구 버전 의존 | Claude Design의 동작, Remotion과 ffmpeg 연동은 2026년 시점의 도구 상태를 기준으로 하므로 이후 달라질 수 있다 |
| 결정 규칙 부재 | 언제 어떤 기법을 쓸지에 대해 반복 사용으로 직관을 기르라고만 하고("build the intuition for when to use them"), 명시적인 선택 규칙은 주지 않는다 |
| 외부 링크 미해소 | 예시 artifact 모음과 런칭 영상 해설 영상 두 곳을 "here"로만 가리켜, 수집된 텍스트만으로는 대상을 특정할 수 없다 |

## 6. 관련 연구 (Related Work)

| 자료 | 관계 |
|---|---|
| [[agents/thariq-2026-know-your-unknowns]] | 같은 저자가 본문의 발굴 패턴을 동작하는 HTML artifact로 시연한 companion 페이지 |
| [[agents/osmani-2026-loop-engineering]] | 프롬프트 작성에서 루프 설계로의 전환. unknown 발굴을 위한 반복 순환이라는 이 글의 시각과 같은 지향을 다른 어휘로 짚는다 |
| [[agents/lee-hoyeon-2026-harness-engineering]] | prompt에서 context, harness로 이어지는 진화 모델. 이 글의 지도(프롬프트, 스킬, 컨텍스트) 개념과 겹친다 |
| [[agents/patel-2026-beyond-the-prompt-claude-code]] | 준비 작업 자체가 일이라는 관점. 구현에 앞서 unknown 발굴에 투자하는 이 글의 태도와 통한다 |
| [[agents/osmani-2026-agent-skills]] | spec, test, review, verification을 워크플로로 강제한다. 이 글의 implementation plan, quiz, pitch 패턴과 서로 보완한다 |

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Fable (Claude Fable 5) | 저자가 이 글에서 다루는 Claude 모델. 작업 품질이 사용자의 unknown 명료화 능력에서 병목이 걸리는 첫 모델이라고 평가한다 |
| map and territory | 지도(작업의 표상, 프롬프트와 스킬과 컨텍스트)와 영토(작업이 실제로 일어나는 곳, 코드베이스와 현실 제약)의 구분. 원문은 "the map is not the territory"를 오래된 교훈으로 소개하며 별도 출처를 붙이지 않는다 |
| unknown | 지도와 영토의 차이. Claude가 마주치면 사용자 의도를 최선으로 추측해 결정을 내린다 |
| Unknown Knowns | 너무 당연해 적어두지 않지만 보면 알아채는 것. 프로토타입으로 발굴한다 |
| Unknown Unknowns | 아예 고려하지 못한 것. blindspot pass로 발굴한다 |
| blindspot pass | Claude에게 Unknown Unknowns를 찾아 설명하게 하는 사전 점검 기법. 저자는 이 문구를 프롬프트에 문자 그대로 쓴다 |
| Claude Design | 스크린샷이 아니라 대상 웹 모듈의 실제 코드를 읽어 마크업과 구조와 구현 방식을 참조하는 도구 |
| implementation-notes.md | 구현 중 내린 결정과 계획 이탈을 기록하는 임시 파일. 'Deviations' 항목에 이탈을 남긴다 |
| Remotion, Whisper, ffmpeg | 런칭 영상 사례에서 각각 코드 기반 영상 UI, 전사, 프레임과 정적 편집에 쓰인 도구 |
| color grading | 영상 색보정. 저자가 "good"의 기준을 몰라 Claude에게 개념을 배워 unknown을 발굴한 사례 |
