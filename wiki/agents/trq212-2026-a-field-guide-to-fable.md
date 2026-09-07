---
title: "A Field Guide to Fable: Finding Your Unknowns (trq212, 2026)"
type: article
year: 2026
category: agents
raw_path: raw/articles/trq212-2026-a-field-guide-to-fable.md
raw_filename: "trq212-2026-a-field-guide-to-fable.md"
source_collection: external
source: trq212-2026-a-field-guide-to-fable.md
author: "trq212 (X @trq212)"
url: "https://x.com/trq212/status/2073100352921215386"
publisher: "X (Twitter) / trq212"
tags: [fable, claude-fable-5, unknowns, map-and-territory, agentic-coding, prompting, blindspot-pass, unknown-unknowns, brainstorming, prototyping, html-artifact, implementation-plan, interviews, references, claude-design, implementation-notes, pitches, quizzes, remotion, whisper, color-grading]
---

## 요약

trq212가 Claude Fable 5로 작업하며 정리한 실전 가이드다. 좋은 결과를 만드는 조건이 프롬프트를 잘 쓰는 기술이 아니라 자기가 무엇을 모르는지 알아내는 절차에 있다고 보고, 그 절차를 8가지 패턴으로 정리한다.

글의 출발점은 "지도는 영토가 아니다(the map is not the territory)"라는 문장이다. 저자는 이 문장을 오래된 교훈으로 소개하며 별도 출처를 붙이지 않는다. 지도는 사용자가 Claude에게 건네는 작업의 표상, 즉 프롬프트와 스킬과 컨텍스트다. 영토는 작업이 실제로 일어나는 곳, 즉 코드베이스와 현실 세계와 그 제약이다.

지도와 영토의 차이를 저자는 unknown이라고 부른다. Claude가 unknown을 만나면 사용자 의도를 최선으로 추측해 결정을 내려야 하고, 한 번에 처리하는 작업량이 클수록 마주치는 unknown도 늘어난다.

저자는 Fable을 두고 작업 품질이 unknown을 명료화하는 자기 능력에 병목이 걸린 첫 모델이라고 말한다. 결과의 상한을 긋는 것이 모델 역량이 아니라 사용자의 문제 정의 능력이라는 진단이다. 따라서 이 글은 모델 사용법이 아니라 사용자 쪽 준비 절차를 다룬다.

본문은 짧은 개념 정의와 긴 기법 카탈로그로 나뉜다. 앞쪽은 unknown을 네 분면으로 나누고 지시가 실패하는 두 방향을 설명한다. 뒤쪽은 구현 전, 구현 중, 구현 후 세 구간에 8가지 발굴 패턴을 배치하고, 패턴마다 저자가 실제로 쓰는 프롬프트 예시를 붙인다. 마지막은 Fable 런칭 영상을 Claude Code로 편집한 사례로 패턴 적용을 보여준다.

이 자료는 opinion 겸 how-to 에세이다. 정량 데이터, 통제 실험, 비교군이 없으므로 8패턴의 효과를 재는 근거가 아니라, 흩어져 있던 준비 작업을 unknown이라는 한 단어 아래 묶어 이름 붙인 프레임으로 읽는 것이 적절하다.

## 배경

이 글이 겨냥하는 문제는 사전 계획의 한계다. 저자는 미리 계획하는 것만으로는 충분하지 않다고 명시한다. 근거로 두 상황을 든다. unknown은 구현 깊숙한 곳에서 나오기도 하고, 애초에 문제를 완전히 다른 방식으로 풀어야 한다는 신호이기도 하다.

그래서 unknown 발굴은 구현 앞에 한 번 놓이는 관문이 아니라 구현 전, 중, 후에 걸쳐 반복되는 과정이 된다. 8패턴을 세 구간으로 나눠 배치한 이유도 여기에 있다.

숙련자와의 대비도 배경의 일부다. 저자가 보기에 뛰어난 agentic coder는 unknown이 상대적으로 적다. Boris나 Jarred가 프롬프트를 쓰는 모습을 보면 자기가 원하는 바를 세부까지 알고 있고, 코드베이스와 모델 거동 양쪽에 깊이 동기화돼 있다는 것이다. 원문은 두 사람의 성이나 소속을 밝히지 않는다.

다만 저자는 그들도 unknown이 있다고 가정하고 대비한다는 점을 덧붙인다. 이 관찰이 글 전체의 전제가 된다. unknown을 줄이고 대비하는 일 자체가 agentic coding의 기술이며, 재능이 아니라 Claude와 함께 일하면서 기를 수 있는 기술이라는 것이다.

## 핵심 개념

### 지도와 영토

지도와 영토는 사용자가 준 표상과 작업이 실제로 벌어지는 현실을 구분하는 개념이다. 지도에 해당하는 것은 프롬프트, 스킬, 컨텍스트처럼 사용자가 Claude에게 건네는 모든 입력이다. 영토에 해당하는 것은 코드베이스와 현실 세계, 그리고 그것들이 부과하는 실제 제약이다.

이 구분이 중요한 이유는 둘이 결코 완전히 일치하지 않기 때문이다. 지도는 언제나 영토보다 성기다. 따라서 작업에는 항상 지도가 담지 못한 영역이 남는다.

unknown은 그 남는 영역을 가리키는 이름이다. Claude는 unknown을 만나면 멈추지 않고 사용자 의도를 최선으로 추측해 결정을 내린다. 즉 unknown은 작업 중단이 아니라 Claude의 임의 결정으로 나타나며, 그 결정이 사용자 의도와 어긋날 때 결과가 틀어진다.

### unknown의 네 분면

저자는 문제를 Claude에게 가져갈 때 unknown을 네 가지로 나눈다. 분류 기준은 사용자가 그것을 아는지, 그리고 자기가 모른다는 사실을 아는지 두 가지다.

| 분면 | 정의 | 상태 |
|---|---|---|
| Known Knowns | 프롬프트에 담긴 것. 에이전트에게 원한다고 말한 내용 | 이미 언어화돼 있다 |
| Known Unknowns | 아직 못 풀었지만 못 풀었다는 사실은 아는 것 | 질문 대상이 특정된다 |
| Unknown Knowns | 너무 당연해서 적어두지 않지만 보면 알아채는 것 | 보여줘야 언어화된다 |
| Unknown Unknowns | 아예 고려하지 못한 것. 어떤 지식을 모르는지 모르고, 무언가가 얼마나 좋아질 수 있는지도 모르는 상태 | 외부에서 짚어줘야 한다 |

발굴 대상이 되는 것은 아래 두 분면이다. Known Knowns는 이미 프롬프트에 들어가 있고, Known Unknowns는 무엇을 물어야 할지 알기 때문에 질문으로 좁힐 수 있다. 반면 Unknown Knowns는 사용자가 보기 전까지 언어로 나오지 않고, Unknown Unknowns는 사용자가 그 존재조차 모른다.

두 분면의 대응 방식도 다르다. Unknown Knowns는 사용자에게 무언가를 보여주는 방식, 즉 프로토타입과 브레인스토밍으로 끌어낸다. Unknown Unknowns는 사용자가 모르는 영역을 Claude가 조사해 설명하는 방식, 즉 사각지대 점검으로 끌어낸다.

### 과잉 명세와 과소 명세

지시의 구체성 조절은 균형 문제다. 저자는 양쪽 끝이 서로 다른 방식으로 실패한다고 설명한다.

| 지시 방식 | Claude의 반응 | 실패 양상 |
|---|---|---|
| 너무 구체적 | 지시를 그대로 따른다 | pivot이 더 적절한 상황에서도 원래 지시를 고수한다 |
| 너무 모호 | 업계 best practice로 빈칸을 채운다 | 그 관행이 이 과제에 맞지 않을 수 있다 |

unknown을 셈에 넣지 않으면 두 방향 모두에서 실패한다. 저자의 표현을 옮기면, 앞길이 장애물로 가득할 때가 언제인지 모르고 앞길이 열려 있을 때가 언제인지도 모르는데, 그러면서도 Claude가 방향을 틀어주기를 원하는 상태가 된다.

이 대목이 8패턴의 존재 이유를 설명한다. 구체성의 적정 수준은 unknown이 어디에 얼마나 있는지 알아야 정할 수 있고, 그것을 알아내는 절차가 곧 발굴 패턴이다.

## 방법

### 공통 원칙

발굴 작업 자체를 Claude와 함께 한다는 것이 8패턴 전체의 전제다. 저자는 Claude를 unknown 탐색 도구로 쓸 수 있는 근거로 세 가지 능력을 든다.

- 코드베이스와 인터넷을 아주 빠르게 검색한다
- 평균적인 주제에 대해 사용자보다 많이 안다
- 실패에서 빠르게 반복한다

이 과정에서 저자가 가장 중요하다고 꼽는 것은 Claude에게 출발점 컨텍스트를 주는 일이다. 구체적으로 세 가지를 권한다. 지금 사고 과정의 어디쯤에 있는지 말하고, 문제와 코드베이스에 대한 자기 경험 수준을 밝히고, thought partner처럼 함께 일하게 한다.

컨텍스트 제공이 핵심인 이유는 발굴의 성패가 Claude의 지식량이 아니라 사용자와 Claude 사이의 지식 격차를 얼마나 정확히 겨냥하는지에 달려 있어서다. 사용자가 무엇을 아는지 모르면 Claude는 이미 아는 내용을 설명하거나 모르는 내용을 건너뛴다.

표현 매체로는 HTML artifact가 거의 모든 경우에 가장 낫다고 본다. 저자는 Claude와 HTML을 쓰는 방법을 이전에 따로 글로 다룬 적이 있다고 밝힌다.

### 발굴 패턴 카탈로그

8패턴은 구현 전 5가지, 구현 중 1가지, 구현 후 2가지로 나뉜다. 각 패턴은 겨냥하는 unknown 분면이 서로 다르다.

| 단계 | 패턴 | 겨냥하는 unknown | 핵심 동작 |
|---|---|---|---|
| 구현 전 | Blind Spot Pass | Unknown Unknowns | Claude에게 사각지대를 찾아 설명하게 한다 |
| 구현 전 | Brainstorms and Prototypes | Unknown Knowns | 저비용 프로토타입을 보고 기준을 언어화한다 |
| 구현 전 | Interviews | Known Unknowns | 한 번에 한 질문씩 인터뷰받는다 |
| 구현 전 | References | 언어로 표현하기 어려운 요구 | 소스코드를 참조 대상으로 가리킨다 |
| 구현 전 | Implementation Plans | 바뀔 가능성이 큰 결정 | 변경 가능성이 큰 항목을 앞세운 계획을 받는다 |
| 구현 중 | Implementation Notes | 구현 중 나타나는 Unknown Unknowns | 결정과 계획 이탈을 파일에 기록시킨다 |
| 구현 후 | Pitches and Explainers | 리뷰어와 전문가의 unknown | 프로토타입, spec, 구현 노트를 한 문서로 묶는다 |
| 구현 후 | Quizzes | 변경 내용에 대한 자기 이해 | 퀴즈를 통과한 뒤에만 merge한다 |

저자는 매번 8가지를 전부 쓰지는 않는다고 밝힌다. 언제 무엇을 쓸지에 대한 판단은 반복 사용으로 직관을 길러야 한다는 것이 본문의 안내다.

### 사각지대 점검

Blind Spot Pass는 Unknown Unknowns가 많은 상황을 위한 사전 조사다. 저자가 드는 대표 상황은 두 가지로, 코드베이스의 낯선 영역에서 기능을 만들 때와 디자인 반복처럼 익숙하지 않은 작업을 Claude와 함께 할 때다.

이런 상황에서 사용자가 모르는 것은 다음 네 가지다.

- 어떤 질문을 해야 하는지 모른다
- 무엇이 좋은 상태인지 모른다
- 과거에 어떤 작업이 있었는지 모른다
- 어떤 함정을 피해야 하는지 모른다

대응은 Claude에게 Unknown Unknowns를 찾아 설명해 달라고 요청하는 것이다. 저자는 "blindspot pass"와 "unknown unknowns"라는 문구를 프롬프트에 문자 그대로 쓰기를 선호한다. 그리고 자신이 누구이고 무엇을 아는지 컨텍스트를 함께 주는 것이 대체로 중요하다고 덧붙인다.

원문이 제시한 프롬프트 두 가지는 같은 구조를 공유한다.

> "I'm working on adding a new auth provider but I know nothing about the auth modules in this codebase. Can you do a blindspot pass to help me figure out my relevant unknown unknowns and help me prompt you better."

> "I don't know what color grading is but I need to grade this video. Can you teach me to understand my unknown unknowns about color grading, so that I can prompt better?"

두 프롬프트 모두 자기 무지를 먼저 선언하고, 사각지대 탐색을 요청한 뒤, 프롬프트를 더 잘 쓰기 위해서라는 목적을 마지막에 붙인다. 목적을 명시하는 이유는 설명의 수준을 조정하기 위해서다. 최종 산출물이 지식 자체가 아니라 다음 프롬프트라는 점을 알려주면 Claude가 그에 맞춰 답한다.

### 브레인스토밍과 프로토타입

Brainstorms and Prototypes는 Unknown Knowns를 겨냥한다. 봐야만 정의할 수 있는 기준이 걸린 영역이 대상이다.

이 패턴을 구현 전에 배치하는 이유는 비용 때문이다. 저자는 Unknown Knowns를 프로토타이핑 단계에서 일찍 찾아 언어화하는 것이 값지다고 보는데, 구현 중에 발견하면 상대적으로 비싸지기 때문이다. 비용이 커지는 경로는 두 가지다. 기능이나 spec의 작은 변경이 코드 구현을 크게 바꿀 수 있고, 에이전트가 이전 변경을 되돌리는 일은 더 어렵다.

저비용 실험의 예로 저자가 드는 것은 프레임에 버튼 하나를 추가했을 때의 모습만 확인하는 경우다. 백엔드 라우트를 배선하지도, 프론트엔드에 상태를 추가로 관리하지도 않는다. 즉 확인하려는 것이 화면에 보이는 결과 하나라면 그 결과만 만드는 최소 구성으로 충분하다.

시각 디자인은 저자에게 전형적인 Unknown Knowns 영역이다. 말로 표현하기는 어렵지만 보면 원하는 바를 아는 종류라서, 이럴 때는 여러 디자인 접근안을 한꺼번에 요청해 반응을 살핀다.

저자는 거의 모든 코딩 세션을 탐색이나 브레인스토밍 단계로 시작한다. 프로젝트 scope를 의도를 갖고 정의하기 위해서다. 이 단계의 효과를 저자는 양면으로 기술한다. Claude는 저자가 놓쳤을 고가치 접근을 자주 찾아내지만, 때로는 나무만 보고 숲을 놓치기도 한다. 브레인스토밍의 역할은 scope를 너무 좁게 잡는 것도 너무 넓게 잡는 것도 막는 데 있다.

원문 프롬프트 세 가지는 각각 다른 산출물을 요구한다.

> "I want a dashboard for this data but I have no visual taste and don't know what's possible. Make me an HTML page with 4 wildly different design directions so I can react to them."

> "Before wiring anything up, make a single HTML file mocking the new editor toolbar with fake data. I want to react to the layout before you touch the real app."

> "Here's my rough problem: users churn after onboarding. Search the codebase and brainstorm 10 places we could intervene, from cheapest to most ambitious. I'll tell you which ones resonate."

세 프롬프트에는 공통 장치가 있다. 사용자의 역할을 "react to"로 못박아 판단자가 아니라 반응자로 두고, 산출물의 개수를 숫자로 지정한다. 세 번째 프롬프트는 여기에 비용순 정렬까지 요구해 반응 대상을 한 줄로 늘어놓는다.

### 인터뷰

Interviews는 브레인스토밍을 충분히 하고도 남은 unknown을 정리하는 단계다. Claude에게 모호한 지점을 인터뷰하게 하되, 질문의 방향을 잡을 수 있도록 문제에 대한 컨텍스트를 함께 준다.

> "Interview me one question at a time about anything ambiguous, prioritize questions where my answer would change the architecture."

이 프롬프트는 두 조건을 건다. 한 번에 한 질문이라는 형식 제약과 아키텍처를 바꿀 질문을 먼저 던지라는 우선순위다. 후자가 중요한 이유는 답에 따라 되돌리기 비용이 달라지기 때문이다. 아키텍처를 바꾸는 답은 늦게 나올수록 비싸다.

### 참조 자료

References는 원하는 바를 상세히 서술할 수 없을 때 쓴다. 저자가 드는 이유는 두 가지로, 그것을 표현할 어휘가 없거나 서술하는 데 시간이 너무 오래 걸릴 만큼 복잡한 경우다.

참조 자료로 쓸 수 있는 것에는 순위가 있다. 다이어그램, 문서, 그림도 포함할 수 있지만 최고의 reference는 소스코드다. 원하는 방식으로 무언가를 구현한 라이브러리나 마음에 드는 디자인 컴포넌트가 있으면, 언어가 달라도 Fable을 그 폴더로 가리키고 무엇을 볼지 알려주면 된다.

> "This Rust crate in vendor/rate-limiter implements the exact backoff behavior I want. Read it and reimplement the same semantics in our TypeScript API client."

이 프롬프트가 언어 차이를 넘는 방식은 구현이 아니라 semantics를 옮기라고 지시하는 것이다. Rust 크레이트의 backoff 동작을 TypeScript 클라이언트에 다시 구현하되, 참조 대상은 코드 자체다.

Claude Design도 같은 원리로 동작한다. 파일을 직접 건네도 되지만 그럴 필요는 없고, 마음에 드는 웹사이트의 모듈을 가리키면 스크린샷이 아니라 그 아래 코드를 읽는다. 그래서 마크업, 구조, 컴포넌트가 실제로 어떻게 만들어졌는지까지 훨씬 풍부한 디테일을 얻는다. 스크린샷은 결과만 담지만 코드는 결과를 만든 방식까지 담는다는 차이다.

### 구현 계획

Implementation Plans는 구현해도 되겠다는 판단이 섰을 때 마지막으로 거치는 단계다. Claude에게 검토용 구현 계획을 요청하되, 계획이 바뀔 가능성이 가장 큰 부분에 초점을 맞추게 한다. 저자가 드는 예는 데이터 모델, 타입 인터페이스, UX 흐름이다.

이렇게 요청하는 목적은 저자가 실제로 바꿔야 할 지점을 Claude가 먼저 드러내게 하는 것이다. 계획서의 목적이 작업 순서 안내가 아니라 검토 대상 노출이라는 뜻이다.

> "Write an implementation plan in HTML, but lead with the decisions I'm most likely to tweak with: data model changes, new type interfaces, and anything user-facing. Bury the mechanical refactoring at the bottom, I trust you on that part."

이 프롬프트는 문서 배치로 검토 대상과 위임 대상을 나눈다. 바뀔 가능성이 큰 결정은 앞에 두고, 기계적 리팩터링은 맨 아래로 내리면서 그 부분은 신뢰한다고 명시한다. 사용자의 검토 시간이 유한하다는 전제에서 나온 배치다.

### 구현 노트

Implementation Notes는 계획이 만족스러운 뒤 실제 구현에 들어갈 때 쓴다. 저자는 새 세션을 만들어 artifact를 프롬프트로 넘긴다. 예로 드는 것은 spec 파일과 프로토타입을 함께 넘기고 구현을 맡기는 경우다.

이 패턴이 필요한 이유는 계획의 불완전성이다. 아무리 계획해도 Unknown Unknowns는 항상 숨어 있고, 에이전트가 작업 중에 코드에서 edge case를 발견해 다른 방향을 잡아야 할 때가 있다.

대응은 기록이다. 저자는 Claude Code에게 임시 `implementation-notes.md`(또는 .html) 파일을 유지하게 하고 내린 결정을 적게 한다. 이 기록의 용도는 현재 작업이 아니라 다음 시도다. 같은 문제를 다시 다룰 때 앞선 실행이 무엇을 왜 결정했는지 남아 있어야 학습이 된다.

> "Keep an implementation-notes.md file. If you hit an edge case that forces you to deviate from the plan, pick the conservative option, log it under 'Deviations', and keep going."

이 프롬프트는 계획 이탈 상황의 처리 절차를 세 동작으로 못박는다. 보수적 선택지를 고르고, 'Deviations' 항목에 기록하고, 멈추지 말고 계속 진행한다. 세 번째 동작이 중요한 이유는 이탈이 곧 중단이 되면 긴 작업이 매번 끊기기 때문이다.

### 발표 자료와 해설 문서

Pitches and Explainers는 구현이 끝난 뒤 승인 과정을 겨냥한다. 저자는 무언가를 출시할 때 가장 중요한 부분 중 하나가 buy-in과 승인을 얻는 일이라고 본다.

pitch와 explainer artifact를 최종 문서에 만들어 두면 두 가지 효과가 있다.

- 리뷰어가 저자와 같은 unknown에서 출발할 때 이해 속도를 높인다
- 전문가가 자기라면 예상했을 unknown과 흔한 실패 지점을 저자가 고려했는지 확인하려 할 때 승인 속도를 높인다

두 효과의 대상이 다르다는 점이 이 패턴의 요점이다. 앞은 배경 지식이 부족한 리뷰어를 위한 것이고, 뒤는 배경 지식이 충분한 전문가를 위한 것이다. 같은 문서가 두 독자를 모두 상대하려면 unknown을 어떻게 다뤘는지가 문서에 드러나 있어야 한다.

> "Package the prototype, the spec, and the implementation notes into a single doc I can drop in Slack to get buy-in. Lead with the demo GIF."

앞선 패턴들이 남긴 산출물이 여기서 하나로 묶인다. 프로토타입, spec, 구현 노트가 각각 다른 단계의 결과물이고, 데모 GIF가 문서 맨 앞에 놓인다.

### 퀴즈

Quizzes는 merge 전 자기 이해를 확인하는 마지막 관문이다. 긴 작업 세션 뒤에는 Claude가 저자가 인지한 것보다 훨씬 많은 일을 해냈을 수 있다.

코드 diff를 읽는 것만으로는 이해가 얕게 남는다. 동작의 상당 부분이 새로 추가된 코드가 아니라 기존 코드 경로에 의존하기 때문이다. diff는 바뀐 줄만 보여주고 그 줄이 어떤 경로와 맞물려 동작하는지는 보여주지 않는다.

그래서 저자는 충분한 컨텍스트와 함께 변경 내용에 대한 퀴즈를 내달라고 요청하고, 퀴즈를 완벽하게 통과한 뒤에만 merge한다.

> "I want to make sure I understand everything that's happened in this change. Give me a HTML report on the changes for me to read and understand with context, intuition, what was done, etc. and a quiz at the bottom on the changes that I must pass."

요청 대상이 퀴즈만이 아니라는 점에 유의할 만하다. 컨텍스트와 직관과 수행 내역을 담은 HTML 보고서를 먼저 받고, 퀴즈는 그 문서 맨 아래에 붙인다. 학습 자료와 확인 절차를 한 문서에 함께 두는 구성이다.

### 프롬프트가 지정하는 것

본문의 프롬프트 예시 11개를 나란히 놓으면 공통 설계가 드러난다. 어느 프롬프트도 "잘 해줘"에 해당하는 요청을 하지 않고, 산출물의 형식과 개수와 배치 순서를 모두 지정한다.

| 패턴 | 프롬프트가 명시한 제약 | 요청한 산출물 형식 |
|---|---|---|
| Blind Spot Pass | 자기 무지를 먼저 선언하고 "blindspot pass", "unknown unknowns" 문구를 그대로 쓴다 | 설명 (형식 미지정) |
| Brainstorms (대시보드) | 서로 크게 다른 디자인 방향 4가지 | HTML 페이지 한 장 |
| Brainstorms (툴바) | 배선 전 단계, 가짜 데이터 사용 | 단일 HTML 파일 |
| Brainstorms (이탈률) | 개입 지점 10곳, 값싼 것부터 야심찬 것 순으로 정렬 | 목록 |
| Interviews | 한 번에 한 질문, 아키텍처를 바꿀 질문 우선 | 대화 |
| References | 지정한 폴더의 Rust 크레이트를 읽고 같은 semantics를 다른 언어로 재구현 | 코드 |
| Implementation Plans | 바뀔 결정을 앞에, 기계적 리팩터링을 맨 아래에 | HTML 문서 |
| Implementation Notes | 보수적 선택, 'Deviations' 항목에 기록, 계속 진행 | `implementation-notes.md` |
| Pitches and Explainers | 프로토타입과 spec과 구현 노트를 하나로, 데모 GIF를 맨 앞에 | 단일 문서 |
| Quizzes | 컨텍스트와 직관과 수행 내역을 담고 퀴즈는 맨 아래에 | HTML 보고서 |

산출물 형식에서 HTML이 반복적으로 등장하는 점이 눈에 띈다. 저자가 표현 매체로 HTML artifact를 꼽은 것과 일치하는 결과다.

배치 지시가 자주 등장하는 것도 공통점이다. 무엇을 앞에 두고 무엇을 뒤로 내릴지 지정하는 프롬프트가 구현 계획, 발표 자료, 퀴즈 세 곳에 나온다. 세 경우 모두 읽는 사람의 주의가 유한하다는 전제에서, 검토가 필요한 항목을 문서 앞쪽에 배치하게 만든다.

## 결과

이 글에는 정량 결과가 없다. 처리량, 소요 시간, 결함률 같은 측정치와 비교군이 제시되지 않는다. 대신 저자는 Fable 런칭 영상 제작 사례 하나로 패턴 적용을 보여준다.

### 런칭 영상 사례

런칭 영상은 전 과정을 Claude Code로 편집했다. 저자는 영상 편집이 자기에게 새로운 영역이고 결코 전문가가 아니라고 밝힌다. 그래서 이 사례는 도메인 지식이 없는 상태에서 unknown을 어떻게 좁혀갔는지를 보여주는 기록이 된다.

| 단계 | 알고 있던 것 | 몰랐던 것 | 대응 |
|---|---|---|---|
| 전사 정확도 확인 | Claude가 코드로 영상을 편집하고 전사할 수 있다 | 전사가 충분히 정확한지 모른다 | Whisper식 전사의 원리와, ffmpeg로 "음(um)"이나 긴 정적을 정확히 잘라낼 수 있는지 설명을 요청했다 |
| 타이밍 UI 검증 | 말하는 단어에 맞춰 움직이는 UI를 원한다 | 실제로 구현 가능한지 모른다 | Remotion과 전사 결과로 프로토타입 영상을 만들어 작동 여부를 확인했다 |
| 색보정 학습 | 영상이 다소 muted해 보이고 원인이 color grading이다 | color grading이 무엇인지 모른다 | 변주안 중에서 고르려던 방식을 접고, Claude에게 color grading을 가르쳐 달라고 요청했다 |

저자가 아는 것에서 출발했다는 점이 첫 단계의 성격이다. Claude가 코드로 영상을 편집하고 전사할 수 있다는 사실은 알았지만 정확도는 확신이 없었다. 그래서 능력 여부가 아니라 정확도를 겨냥한 설명을 요청했다.

두 번째 단계는 프로토타입 패턴의 적용이다. 말하는 단어에 타이밍을 맞춘 UI가 가능한지 판단할 수 없었으므로, 판단 대신 최소 구현으로 확인했다.

세 번째 단계가 이 사례의 핵심이다. 저자의 첫 시도는 Claude에게 몇 가지 변주를 만들게 해 고르는 방식이었다. 그런데 color grading에서 무엇이 "good"인지 모른다는 사실을 깨달았고, 선택지를 늘려도 판단 기준이 없으면 소용없다는 결론에 이르렀다. 그래서 선택지를 만드는 대신 개념 자체를 배우는 쪽으로 방향을 바꿨다.

이 전환이 4분면 분류와 직접 연결된다. 판단 기준이 없는 상태는 Unknown Unknowns이고, 그것을 남겨둔 채 선택지만 늘리는 것은 문제를 풀지 않고 미루는 일이다.

### 지도와 영토를 맞추기

저자의 결론은 모델 성능과 접근 방식의 관계에 대한 것이다. 모델이 좋아질수록 올바른 접근을 쓰면 더 많은 것을 해낼 수 있다. 접근의 중요성이 줄지 않고 오히려 커진다는 뜻이다.

이 관점에서 실패는 진단 신호가 된다. long-horizon 작업이 틀린 결과로 돌아온다면, 원인은 둘 중 하나일 가능성이 크다. unknown 정의에 시간을 더 써야 하거나, Claude가 unknown 사이를 즉흥 대응할 여지를 둔 구현 계획이 필요하다는 것이다.

두 번째 선택지가 흥미로운 지점이다. 대응책이 언제나 더 촘촘한 명세는 아니며, 때로는 계획에 여백을 남기는 쪽이 답이 된다. 앞서 나온 과잉 명세의 실패 양상과 같은 이야기다.

저자의 마지막 문장은 8패턴 전체의 공통 성격을 요약한다. explainer, brainstorm, interview, prototype, reference는 모두 대가가 커지기 전에 몰랐던 것을 알아내는 값싼 수단이다. 저자는 다음 프로젝트를 Claude에게 unknown을 함께 찾아 달라고 요청하며 시작하라는 권고로 글을 맺는다.

## 한계

| 한계 | 내용 |
|---|---|
| 1차 자료가 아닌 경험담 | 정량 데이터, 통제 실험, 재현 절차가 없는 저자 개인의 워크플로 경험담이다. 8패턴의 효과는 일화적 근거에 기댄다 |
| Fable 특정성 불명확 | 저자는 Fable을 unknown 명료화가 병목이 되는 첫 모델이라고 규정하지만, 제시한 패턴 대부분은 모델을 가리지 않는 일반적인 프롬프트 작성과 계획 습관이다. Fable 고유의 이점과 일반 습관의 경계가 흐릿하다 |
| 도구 버전 의존 | Claude Design의 동작 방식, Remotion과 ffmpeg 연동은 2026년 시점의 도구 상태를 기준으로 하므로 이후 달라질 수 있다 |
| 선택 규칙 부재 | 언제 어떤 기법을 쓸지에 대해 반복 사용으로 직관을 기르라고만 하고 명시적인 결정 규칙은 주지 않는다 |
| 외부 링크 미해소 | 예시 artifact 모음과 런칭 영상 해설 두 곳을 "here"로만 가리켜, 수집된 텍스트만으로는 대상을 특정할 수 없다 |

패턴 사이의 경계가 느슨하다는 점도 짚어둘 만하다. 브레인스토밍과 프로토타입이 한 패턴으로 묶여 있고, pitch와 explainer도 마찬가지다. 반면 인터뷰와 사각지대 점검은 둘 다 Claude가 질문이나 설명을 생성한다는 점에서 겹치는 부분이 있다. 카탈로그가 이론적 분류가 아니라 저자의 실무 습관을 정리한 목록이기 때문에 생기는 특징이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| map and territory | 지도(작업의 표상, 즉 프롬프트와 스킬과 컨텍스트)와 영토(작업이 실제로 일어나는 코드베이스와 현실 제약)의 구분. 원문은 "the map is not the territory"를 오래된 교훈으로 소개하며 출처를 붙이지 않는다 |
| unknown | 지도와 영토의 차이. Claude가 마주치면 멈추지 않고 사용자 의도를 최선으로 추측해 결정을 내린다 |
| Unknown Knowns | 너무 당연해서 적어두지 않지만 보면 알아채는 것. 프로토타입과 브레인스토밍으로 발굴한다 |
| Unknown Unknowns | 아예 고려하지 못한 것. 사각지대 점검으로 발굴한다 |
| blindspot pass | Claude에게 Unknown Unknowns를 찾아 설명하게 하는 사전 조사 기법. 저자는 이 문구를 프롬프트에 문자 그대로 쓴다 |
| implementation-notes.md | 구현 중 내린 결정과 계획 이탈을 기록하는 임시 파일. 이탈은 'Deviations' 항목에 남긴다 |

## 관련 페이지

- [[agents/thariq-2026-know-your-unknowns]]: 같은 저자가 이 글의 발굴 패턴을 동작하는 HTML artifact로 시연한 companion 페이지. 본문이 설명한 사각지대 점검, 인터뷰, 구현 계획, 구현 노트, merge 전 퀴즈가 실물로 제시된다.
- [[agents/osmani-2026-loop-engineering]]: 프롬프트 작성에서 루프 설계로의 전환을 다룬 에세이. unknown 발굴을 반복 과정으로 보는 이 글의 시각과 같은 지향을 다른 어휘로 짚는다.
- [[agents/lee-hoyeon-2026-harness-engineering]]: prompt에서 context, harness로 이어지는 3단계 진화 모델. 이 글의 지도에 해당하는 프롬프트와 스킬과 컨텍스트가 그 사다리의 앞 두 칸에 놓인다.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: 준비 작업 자체가 일이라는 관점의 실전 가이드. 구현에 앞서 unknown 발굴에 시간을 쓰는 이 글의 태도와 통한다.
- [[agents/patel-2026-i-taught-myself-claude-code]]: Patel이 Claude Code를 스스로 익힌 과정을 적은 학습 기록. 이 글이 말하는 코드베이스와 모델 거동에 대한 동기화가 어떻게 쌓이는지를 개인 경험 쪽에서 보여준다.
- [[agents/google-2026-the-new-sdlc-with-vibe]]: 개인 작업이 아니라 팀 단위 개발 수명주기를 다룬 자료. 이 글의 unknown 발굴을 조직 절차로 확장할 때 대조 대상이 된다.
- [[agents/osmani-2026-agent-skills]]: spec, test, review, verification을 워크플로로 강제하는 접근. 이 글의 구현 계획, 퀴즈, 발표 자료 패턴과 서로 보완한다.
- [[overviews/agent-harness-engineering-overview]]: harness 담론을 묶은 합성 페이지. 이 글은 그 구조에서 사람 입력단에 해당한다.
