---
title: "Know your unknowns (examples)"
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

## 요약

Know your unknowns는 코딩 에이전트와 함께 일할 때 unknown unknowns를 값싸게 찾아내는 11개 기법을 모아 놓은 companion 페이지다. 기법마다 설명 한 문장과, 실제로 클릭하고 조작할 수 있는 self-contained HTML 아티팩트가 하나씩 붙어 있다.

페이지가 내건 프레임은 Johari Window다. 짧은 문장 하나가 그 프레임을 요약한다. 지도는 영토가 아니며, 둘 사이의 격차가 곧 사용자의 unknown이라는 것이다. 여기에 explainer, brainstorm, interview, prototype을 모두 몰랐던 것을 값싸게 알아내는 수단으로 묶는 문장이 따라붙는다.

11개 기법은 구현 타임라인의 세 구간에 나뉘어 배치된다. 구현 전이 8개, 구현 중이 1개, 구현 후가 2개다. 이 분포 자체가 페이지의 주장을 담는다. 구현 전을 발견 비용이 가장 싼 구간으로 보고 장치의 대부분을 그곳에 모아 두었기 때문이다.

다만 이 자료는 실증 연구가 아니라 카탈로그다. 각 기법이 unknown을 얼마나 줄였는지에 대한 측정치가 없고, 제시되는 근거는 11개 아티팩트가 실제로 동작한다는 사실에 머문다. 따라서 효과를 재는 자료보다는, 구현 전후에 어떤 산출물을 만들어 볼 수 있는지 형태를 확인하는 목록으로 읽는 편이 맞다.

## 배경

### companion 페이지라는 성격

이 페이지는 독립된 에세이가 아니라 예시 데모 인덱스다. 원 블로그 포스트가 다루는 주제는 "discovering unknowns before, during, and after implementation"이고, 이 페이지는 그 산문이 말한 원칙이 실제로 어떤 화면과 문서를 만들어 내는지 보여주는 역할을 맡는다.

그래서 정보 밀도가 설명이 아니라 산출물에 있다. 각 항목은 한 문장짜리 소개와 그에 대응하는 동작 데모 하나로 이루어지며, 기법의 배경 논증은 짝이 되는 원 글이 담당한다.

수집 시점의 제약도 함께 기록해 둔다. 페이지에 저자명과 발행일이 표기되어 있지 않아 저자는 사이트 소유자 이름으로, year는 2026으로 추정해 기록했다. 본문 산문은 요약본으로만 확보했고, 11개 데모의 이름과 설명은 원문 그대로 확보했다.

### 원 글이 세운 unknown 프레임

이 페이지가 전제하는 프레임은 짝이 되는 원 블로그 포스트에 있다. 그 글은 이 wiki에 [[agents/trq212-2026-a-field-guide-to-fable]]로 들어와 있고, Korzybski의 "지도는 영토가 아니다"에서 출발해 unknown을 네 분면으로 나눈다.

| 분면 | 정의 | 원 글이 배정한 발굴 수단 |
|---|---|---|
| Known Knowns | 프롬프트에 이미 명시한 것 | 해당 없음 |
| Known Unknowns | 아직 풀지 못했으나 무엇을 물어야 할지는 아는 것 | interview |
| Unknown Knowns | 너무 당연해 적지 않지만 보면 알아채는 것 | brainstorm, prototype |
| Unknown Unknowns | 아예 고려하지 못한 것 | blindspot pass |

이 표가 companion 페이지를 읽는 데 필요한 이유는, 11개 데모가 각각 어느 분면을 겨냥하는지가 이름만으로는 드러나지 않기 때문이다. 두 자료를 함께 놓으면 데모 하나하나가 어떤 종류의 모름을 노리는지 확인할 수 있다.

두 자료의 저자 표기는 서로 다르다. 이 페이지는 사이트 소유자 이름 Thariq으로, 원 글은 trq212로 표기된다. 동일인 여부는 두 자료 안에서 확정되지 않으므로 이 wiki는 각 페이지의 표기를 그대로 둔다.

## 핵심 개념

unknown unknowns는 모른다는 사실조차 인지하지 못한 미지의 영역을 뜻한다. 이 자료가 겨냥하는 대상이 바로 그 영역이며, 사람이 스스로 질문을 만들 수 없는 자리라서 별도의 장치가 필요하다는 것이 출발점이다.

값싼 발견은 이 페이지가 기법을 고르는 기준이다. explainer, brainstorm, interview, prototype이 한데 묶이는 이유도 산출물의 형태가 아니라 비용에 있다. 넷 모두 본 구현에 들어가기 전에 짧은 시간으로 만들어 볼 수 있고, 틀렸다고 판명되어도 버리는 비용이 작다.

self-contained HTML 아티팩트는 이 페이지가 기법을 시연하는 매체다. 외부 의존 없이 파일 하나로 열리며 클릭과 조작이 가능하다. 설명 대신 완성된 산출물을 보여주면 독자가 자기 상황에 옮기기 쉽다는 판단이 깔려 있다.

## 방법

### 세 구간 배치

11개 기법은 구현 타임라인 위의 세 구간에 배치된다.

| 구간 | 기법 수 | 포함 기법 |
|---|---|---|
| 구현 전 | 8개 | Blindspot pass, Teach me my unknowns, Four design directions, Mock before you wire, Brainstorm the intervention, The interview, Point at a reference, The tweakable plan |
| 구현 중 | 1개 | Implementation notes |
| 구현 후 | 2개 | The buy-in doc, Quiz me before I merge |

배치가 한쪽으로 쏠려 있다. 11개 중 8개가 구현 전에 몰려 있고, 페이지는 이 구간을 발견 비용이 가장 싼 단계로 적는다. 나머지 3개는 이미 코드를 쓰기 시작한 뒤에 남는 모름을 처리하는 장치다.

### 구현 전 여덟 가지

구현 전 기법은 아직 코드를 한 줄도 쓰지 않은 상태에서 실행된다. 여덟 가지의 소재와 산출물은 다음과 같다.

| 기법 | 시연 소재 | 산출물 |
|---|---|---|
| Blindspot pass | 사용자가 잘 모르는 auth 모듈 | Claude가 모듈을 훑고 돌려주는 unknown unknowns 리포트 |
| Teach me my unknowns | color grading | 인터랙티브 explainer와, 거기서 뽑아낸 정밀한 프롬프트 |
| Four design directions | 동일한 review queue | 크게 다른 네 가지 렌더링과 steal, skip 칩 |
| Mock before you wire | Acme의 frame annotation 툴바 | 클릭 가능한 throwaway mock |
| Brainstorm the intervention | codebase에 근거한 churn 개입안 | 실행 기간 범위 위에 배치된 10개 안 |
| The interview | 모호하게 정의된 기능 | 한 번에 한 질문씩 진행한 인터뷰와 decisions table |
| Point at a reference | Rust로 된 reference 구현 | semantics map |
| The tweakable plan | 구현 계획 | 바뀔 가능성 순으로 정렬한 계획 |

Blindspot pass는 낯선 코드 영역을 대상으로 삼는다. 사용자가 잘 모르는 auth 모듈을 Claude가 훑고 사용자의 unknown unknowns를 리포트로 돌려준다. 질문을 사용자가 만들지 않고 자료 쪽에서 먼저 목록을 받아 온다는 점이 이 기법의 특징이다.

Teach me my unknowns는 요구 사항의 어휘 자체가 없을 때 쓴다. 시연 소재는 color grading이며, 인터랙티브 explainer가 "영상을 더 보기 좋게"라는 모호한 요구를 전문 용어 수준의 정밀한 프롬프트로 바꿔 준다. 무엇을 원하는지 말할 언어가 없으면 요구를 좁힐 수 없으므로, 먼저 개념을 배우는 단계를 앞에 두는 방식이다.

Four design directions와 Mock before you wire는 봐야 판단이 서는 대상을 다룬다. 전자는 같은 review queue를 크게 다른 네 가지 방식으로 렌더링하고, steal과 skip 칩이 사용자의 응답을 대신 작성해 준다. 후자는 실제 코드를 건드리기 전에 Acme의 frame annotation 툴바를 클릭 가능한 throwaway mock으로 먼저 만든다. 두 기법 모두 판단 재료를 화면으로 만들어 두고 반응을 받는 구조다.

Brainstorm the intervention은 선택지의 폭을 먼저 넓힌다. codebase에 근거한 churn 개입안 10개를 만들고, 오늘 오후에 출시할 수 있는 것부터 분기 단위 베팅까지의 범위 위에 늘어놓는다. 아이디어와 그 아이디어의 실행 규모를 한 화면에서 함께 보여주는 배치다.

The interview와 Point at a reference는 의도를 좁히는 기법이다. The interview에서는 Claude가 모호한 기능을 두고 한 번에 한 질문씩 인터뷰하고 마지막에 decisions table을 돌려준다. Point at a reference에서는 Rust로 된 reference 구현을 TypeScript로 포팅하기 전에, Claude가 원본의 의미를 제대로 이해했음을 semantics map으로 증명하게 한다. 앞은 사용자 머릿속의 결정을 끌어내고, 뒤는 참조 대상에 대한 이해를 검증한다.

The tweakable plan은 계획 문서의 정렬 기준을 바꾼다. 실행 순서가 아니라 나중에 바뀔 가능성 순으로 항목을 정렬한다. 원 글은 이 기준으로 데이터 모델, 타입 인터페이스, UX 흐름을 앞세우고 기계적 리팩터링을 뒤로 미룬다고 적는다. 계획을 읽는 사람이 가장 먼저 확인해야 할 항목을 문서 앞쪽에서 만나게 하려는 배열이다.

### 구현 중과 구현 후 세 가지

나머지 3개는 코드를 쓰기 시작한 뒤의 구간을 맡는다.

| 기법 | 구간 | 시연 소재 | 산출물 |
|---|---|---|---|
| Implementation notes | 구현 중 | 3시간짜리 빌드 | 계획 이탈 지점과 보수적 판단을 담은 running log |
| The buy-in doc | 구현 후 | 출시 승인 요청 | 애니메이션 데모를 앞세운 피치 문서 |
| Quiz me before I merge | 구현 후 | 병합 직전 점검 | merge 준비도 리포트와 여섯 문항 퀴즈 |

Implementation notes는 구현 중에 새로 드러난 모름을 기록으로 남긴다. 3시간짜리 빌드가 진행되는 동안 Claude가 running log를 유지하고, 계획에서 벗어난 지점과 그때 내린 보수적 판단을 함께 적는다. 기록이 남으면 다음 시도가 백지에서 시작하지 않고 앞선 시도의 결론 위에서 출발한다.

The buy-in doc은 검토자가 가진 모름을 대상으로 한다. 애니메이션 데모를 앞세운 출시 피치 문서이며, 리뷰어가 낼 반론을 문서 안에서 미리 되받는다. 구현자가 이미 확인한 내용을 검토자가 다시 확인하는 왕복을 줄이는 장치다.

Quiz me before I merge는 구현자 자신의 이해를 확인한다. merge 준비도 리포트가 여섯 문항짜리 퀴즈로 끝나고, 그 퀴즈를 통과해야 병합할 수 있다. 긴 세션 뒤에 코드 변경은 남았는데 이해는 얕게 남는 상황을 겨냥한 장치이므로, 검사 대상이 코드가 아니라 사람이라는 점이 다른 기법과 구분된다.

### 원 글의 여덟 패턴과의 대응

11개 데모는 원 글이 정리한 여덟 패턴에 거의 그대로 대응한다. 두 자료를 나란히 놓으면 다음과 같다.

| 원 글의 패턴 | 대응 데모 | 원 글이 적은 겨냥 대상 |
|---|---|---|
| Blind Spot Pass | Blindspot pass | Unknown Unknowns |
| Brainstorms and Prototypes | Four design directions, Mock before you wire, Brainstorm the intervention | Unknown Knowns |
| Interviews | The interview | Known Unknowns |
| References | Point at a reference | 언어로 표현하기 어려운 요구 |
| Implementation Plans | The tweakable plan | 바뀔 가능성이 큰 결정 |
| Implementation Notes | Implementation notes | 구현 중 나타나는 Unknown Unknowns |
| Pitches and Explainers | The buy-in doc | 리뷰어와 전문가의 unknown |
| Quizzes | Quiz me before I merge | 변경 내용에 대한 자기 이해 |
| 원 글의 color grading 사례 | Teach me my unknowns | Unknown Unknowns |

대응이 1대 1이 아닌 곳은 두 군데다. Brainstorms and Prototypes 하나에 데모 3개가 붙는데, 원 글이 시각 디자인처럼 말로 표현하기 어려운 대상에는 여러 접근안을 만들어 두고 반응을 본다고 적은 부분이 Four design directions로 구현되었다. 그리고 Teach me my unknowns는 여덟 패턴이 아니라 원 글의 사례 절에 나오는 color grading 일화에 대응한다.

## 결과

정량 벤치마크가 없다. 성격이 실증 연구가 아니라 패턴 카탈로그와 동작 데모의 묶음이기 때문이다. 페이지가 제시하는 것은 기법 목록과 각 기법의 산출물 형태이며, 각 기법이 실제로 어떤 unknown을 얼마나 줄였는지에 대한 측정치는 제시되지 않는다.

그 대신 배치가 하나의 주장을 담는다. 11개 중 8개를 구현 전에 두고 그 구간을 가장 값싼 발견 단계로 적은 것은, 발견 시점을 앞으로 당길수록 유리하다는 판단이다. 나머지 3개는 구현 전 발견만으로는 모름이 남는다는 점을 인정하는 배치이며, 그래서 구현 중과 구현 후에도 장치를 하나씩 둔다.

## 한계

- 인덱스와 데모 수준의 페이지라 각 기법의 적용 조건, 실패 사례, 비용 대비 효과를 다루지 않는다. 어떤 상황에서 blindspot pass보다 interview가 나은지 같은 선택 기준이 없다.
- 저자명과 발행일이 페이지에 표기되지 않아 출처 추적성이 약하다. 이 wiki는 사이트 소유자 이름을 저자로, year를 2026으로 추정해 기록한다.
- 원문 산문 전문을 그대로 확보하지 못했다. 확보한 것은 프레임 문장 두 개와 11개 데모 설명이며, 나머지 논지는 요약본에 의존한다. 프레임의 배경 논증은 짝이 되는 원 글 페이지에서 확인해야 한다.
- 각 데모가 특정 도구와 특정 소재에 묶여 있다. auth 모듈, color grading, review queue처럼 예시가 구체적이라 이해에는 도움이 되지만, 다른 도메인으로 옮기는 방법은 독자 몫으로 남는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| unknown unknowns | 모른다는 사실조차 인지하지 못한 미지의 영역. 이 자료가 겨냥하는 대상이다 |
| Johari Window | 이 페이지가 핵심 프레임으로 내건 모델. 지도와 영토의 격차를 unknown으로 보는 은유로 쓰인다 |
| likelihood-of-tweaking | 계획 항목이 나중에 바뀔 가능성. The tweakable plan이 실행 순서 대신 쓰는 정렬 기준이다 |
| throwaway mock | 검증 목적으로만 만들고 버리는 클릭 가능한 시제품. Mock before you wire의 산출물이다 |
| semantics map | 참조 구현의 의미 구조를 정리한 도식. Point at a reference가 이해 여부를 증명하는 데 쓴다 |
| decisions table | 인터뷰가 끝난 뒤 결정 사항을 정리해 돌려주는 표. The interview의 산출물이다 |

## 관련 페이지

- [[agents/trq212-2026-a-field-guide-to-fable]]: 짝이 되는 원 블로그 포스트. 4분면 unknown과 여덟 패턴을 산문으로 전개하며, 이 페이지는 그 패턴들의 동작 데모에 해당한다
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: 준비 작업 자체를 본 작업으로 보는 관점. 구현 전에 8개 기법을 두는 이 자료의 배치와 통한다
- [[agents/patel-2026-i-taught-myself-claude-code]]: 코딩 에이전트 사용법을 스스로 익힌 과정 기록. 사용자의 모름을 줄여 가는 학습 경로라는 점에서 겹친다
- [[agents/google-2026-the-new-sdlc-with-vibe]]: 개발 수명주기 전체를 에이전트 기준으로 다시 그린 자료. 구현 전후 단계에 검증 장치를 두는 이 자료를 더 큰 흐름 안에 놓고 볼 수 있다
- [[agents/osmani-2026-loop-engineering]]: 루프 자체를 설계 대상으로 삼는 관점. 반복 실행 사이에 상태를 남기는 문제는 Implementation notes와 맞닿는다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 컨텍스트에 넣을 토큰을 고르는 문제를 다룬다. 무엇을 물어볼지 미리 정해 두는 이 자료의 기법들과 입력 설계라는 점에서 맞닿는다
- [[agents/ai-boost-awesome-harness-engineering]]: harness를 모델과 분리된 공학으로 보는 관점을 모은 저장소. 이 자료는 그 harness 위에서 사람이 무엇을 물어볼지를 설계하는 실천 패턴에 해당한다
