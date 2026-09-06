---
title: "Agent Skills"
type: article
year: 2026
category: agents
raw_path: raw/articles/osmani-2026-agent-skills.md
raw_filename: "osmani-2026-agent-skills.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/agent-skills/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-05-03"
tags: [agent-skills, claude-code, skills, sdlc, verification, anti-rationalization, progressive-disclosure, scope-discipline, software-engineering-at-google, harness-engineering]
---

## 한 줄 요약 (One-line Summary)

Addy Osmani가 2026-05-03에 개인 블로그에 올린 에세이다. AI 코딩 에이전트는 명시적 제약이 없으면 spec, test, review, verification을 모두 건너뛰고 최단 경로로 코드만 내놓는 junior 실패 모드에 빠진다고 진단하고, senior 엔지니어의 절차를 워크플로로 강제하는 스킬을 해법으로 제시한다. 스킬을 떠받치는 다섯 가지 설계 원칙, 6단계 SDLC 구성, Google 엔지니어링 관행의 인코딩, 그리고 에이전트 도구가 없는 조직에도 옮겨 쓸 수 있는 네 가지 관행이 본문의 뼈대다.

## 1. 자료 정보 (Document Information)

- 저자: Addy Osmani
- 게시일: 2026-05-03
- 매체: addyosmani.com 개인 블로그
- URL: https://addyosmani.com/blog/agent-skills/
- 수집 형태: `raw/`에 남은 것은 원문 전문이 아니라 3인칭으로 압축된 약 3,100자 추출본이다. 절 구성은 Overview, Main Argument, Five Load-Bearing Design Principles, Six SDLC Phases, Google Engineering Practices Encoded, Installation and Usage, Takeaways for All Teams, Broader Context 여덟 개다.
- 핵심 명제: "a senior engineer's job is mostly the parts that don't show up in the diff." 시니어 엔지니어의 일은 대부분 diff에 드러나지 않는 부분이라는 뜻이다.
- 자료 성격: 정량 데이터가 없는 처방형 의견 에세이

## 2. 주요 기여 (Key Contributions)

1. 문제 정의. 명시적으로 제약하지 않으면 에이전트는 최소한의 절차만 밟고 작업을 끝내려는 쪽으로 기운다. spec, test, review, verification을 생략한 채 코드를 내놓는 이 기본 동작이 junior 엔지니어의 실패 모드를 그대로 재현한다.
2. 스킬은 에세이가 아니라 워크플로다. 에이전트는 긴 산문이 아니라 순서 있는 step에 반응하므로, 스킬은 참고 문서가 아니라 checkpoint가 박힌 실행 가능한 워크플로여야 한다.
3. 다섯 가지 설계 원칙 명명. process over prose, anti-rationalization table, verification is non-negotiable, progressive disclosure, scope discipline이다. 저자는 이 다섯을 "load-bearing", 곧 구조를 떠받치는 원칙이라고 부른다.
4. 6단계 SDLC로 스킬을 조직화. Define, Plan, Build, Verify, Review, Ship을 각각 슬래시 커맨드에 매핑한다. 표준 엔지니어링 조직의 워크플로를 그대로 본뜬 구성이다.
5. Google 엔지니어링 관행 인코딩. *Software Engineering at Google*의 Hyrum's Law, test pyramid, 약 100줄 PR 상한, Chesterton's Fence, trunk-based development를 스킬 안에 심는다.
6. 에이전트 도구가 없는 조직으로의 이식. anti-rationalization table, 절차 중심 워크플로, 필수 exit criteria로서의 verification, progressive disclosure 네 가지는 사람으로 운영되는 조직의 handbook과 runbook에도 그대로 적용할 수 있다고 본다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 구조를 떠받치는 다섯 가지 설계 원칙

| 원칙 | 내용 |
|---|---|
| Process over prose | checkpoint가 있는 워크플로가 참고용 에세이보다 성과가 낫다. 에이전트는 에세이가 아니라 step에 따라 행동하기 때문이다. |
| Anti-rationalization table | 스킬마다 흔한 변명과 그에 대한 반박을 짝지어 넣는다. 예를 들어 "이건 spec을 쓰기엔 너무 단순하다"에는 "그래도 acceptance criteria는 적용된다"를 맞세운다. |
| Verification is non-negotiable | 모든 워크플로는 구체적 증거로 끝난다. 통과한 test, 깨끗한 build, reviewer 승인 중 하나가 종료 조건이 된다. |
| Progressive disclosure | 스킬 20개를 동시에 로드하지 않고 맥락에 따라 활성화해 토큰 효율을 지킨다. |
| Scope discipline | "touch only what you're asked to touch." 요청받은 곳만 수정하고 인접 영역 refactoring이나 파일 통째 재작성으로 번지지 않게 한다. |

다섯 원칙은 각각 다른 실패를 막는다. 첫 번째는 지시가 읽히기만 하고 실행되지 않는 실패, 두 번째는 에이전트가 절차 생략을 스스로 정당화하는 실패, 세 번째는 증거 없이 완료를 선언하는 실패, 네 번째는 컨텍스트 낭비, 다섯 번째는 요청 범위를 넘어선 변경이다.

### 3.2 6단계 SDLC와 슬래시 커맨드

| 단계 | 커맨드 | 역할 |
|---|---|---|
| Define | `/spec` | 요구사항과 acceptance criteria 정의 |
| Plan | `/plan` | 작업 분해와 계획 수립 |
| Build | `/build` | 구현 |
| Verify | `/test` | test와 build로 증거 확보 |
| Review | `/review` | 코드 리뷰 |
| Ship | `/ship` | 배포 |

저자는 이 6단계가 표준 엔지니어링 조직의 워크플로를 그대로 반영한 것이라고 밝힌다. 스킬을 새 절차로 발명하지 않고 이미 검증된 조직 절차에 맞춘 것이 설계 의도다.

### 3.3 Google 엔지니어링 관행 인코딩

스킬이 담아 고정하는 *Software Engineering at Google*의 관행은 다섯 가지다.

| 관행 | 본문이 지정한 적용 지점 |
|---|---|
| Hyrum's Law | API 설계 |
| Test pyramid | 약 80/15/5 비율 |
| PR 크기 상한 | 약 100줄 |
| Chesterton's Fence | 제거 판단 |
| Trunk-based development | 브랜치 전략 |

본문은 다섯 관행의 이름과 적용 지점만 나열하고 각각이 무엇인지는 설명하지 않는다. test pyramid의 80/15/5도 비율만 제시하고 어느 계층이 어느 몫에 해당하는지는 밝히지 않는다.

### 3.4 활용 방식 세 가지

| 방식 | 내용 |
|---|---|
| marketplace 설치 | Claude Code의 marketplace에서 설치한다 |
| markdown 투입 | Cursor 같은 도구에 markdown 파일을 직접 넣는다 |
| 명세 문서로 읽기 | 팀 관행을 정의하는 specification 문서로 사람이 읽는다 |

세 번째 방식은 에이전트가 스킬을 실행하지 않아도 스킬이 값을 낸다는 뜻이다. 다음 항목의 이식 논의로 이어지는 연결 고리다.

### 3.5 에이전트 도구가 없는 조직으로의 이식

저자는 에이전트 도구를 쓰지 않는 조직도 네 가지를 채택해야 한다고 본다.

| 항목 | 사람 조직에서의 형태 |
|---|---|
| Anti-rationalization table | 팀이 실제로 밟는 shortcut을 문서로 기록한다 |
| 절차 중심 워크플로 | 긴 참고 문서 대신 절차를 둔다 |
| Verification | 선택 사항이 아니라 필수 exit criteria로 둔다 |
| Progressive disclosure | handbook과 runbook에 적용한다 |

이 네 항목은 3.1의 다섯 원칙 중 scope discipline을 뺀 나머지와 대응한다. 즉 저자가 보기에 스킬 설계 원칙의 대부분은 에이전트 고유의 것이 아니라 조직 운영 원칙이다.

### 3.6 harness 안에서 스킬의 위치

스킬은 agent harness engineering을 이루는 한 layer일 뿐이라는 것이 본문의 위치 규정이다. 나란히 놓이는 층위는 다음과 같다.

| 층위 | 역할 |
|---|---|
| Skills | 절차 |
| AGENTS.md | rulebook |
| Hooks | enforcement |
| Tools | action |
| Session log | 메모리 |

본문은 오래 실행되는 에이전트일수록 강제된 워크플로에서 얻는 이득이 크다는 관찰로 이 절을 맺는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

의견 에세이라 정량 벤치마크가 없다. 도입 전후 비교, 결함률 변화, 처리량 측정 같은 수치가 본문에 전혀 등장하지 않는다.

검증 가능한 사실 진술로 분류할 수 있는 것은 두 가지다.

- 스킬을 쓰는 세 가지 경로가 존재한다는 도구 사실. Claude Code marketplace 설치, Cursor 등에 markdown 투입, 명세 문서로 읽기다.
- 스킬이 harness의 한 layer라는 위치 규정. AGENTS.md, hook, tool, session log와 나란히 놓인다.

다섯 원칙, 6단계 매핑, 사람 조직 이식 권고는 모두 저자의 관찰을 압축한 단언이며 별도 출처가 붙어 있지 않다. 유일하게 외부 문헌을 지목하는 대목은 *Software Engineering at Google* 인용인데, 이때도 관행 이름만 열거하고 쪽수나 장 번호는 밝히지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문이 스스로 짚는 한계는 뚜렷하지 않고 무게 중심이 처방 쪽에 쏠려 있다. 자료 관점에서 남는 약점은 다음과 같다.

- 정량 데이터가 없어 스킬 도입 효과를 측정 지표로 환산하지 못한다.
- 원칙 카탈로그 수준에 머물러 경계가 느슨하다. 스킬과 일반 프롬프트 템플릿의 차이, connector와 스킬의 구분이 정의되지 않는다.
- verification을 강제한다고 하지만 그 verification 자체의 신뢰성은 다루지 않는다. 검증을 누가 검증하는지가 비어 있다. 이 지점은 GeekNews 토론([[agents/hada-2026-agent-skills]])의 "LLM은 규칙을 우회한다" 회의론이 보완한다.
- Google 관행을 인용하면서 각 관행의 내용을 설명하지 않아, 독자가 *Software Engineering at Google*을 이미 알고 있다고 전제한다.
- progressive disclosure를 원칙으로 내세우지만 실제 로딩 비용을 제시하지 않는다. 짝 자료가 보고한 스킬 하나 800줄 규모의 컨텍스트 부담과 대조가 필요하다.
- 수집된 raw가 3인칭으로 압축된 추출본이라 저자의 원 논증 전개와 예시가 그대로 남아 있지 않다. 인용문의 정확한 문맥은 원문 URL을 확인해야 한다.

결론의 방향은 오래 실행되는 에이전트일수록 강제된 워크플로의 이득이 크다는 것이다.

## 6. 관련 연구 (Related Work)

본문이 명시적으로 지목한 외부 자료는 다음과 같다.

- *Software Engineering at Google*. 스킬이 인코딩하는 관행 다섯 가지의 1차 출처다.
- Claude Code. 스킬 marketplace와 슬래시 커맨드의 실행 환경이다.
- Cursor. markdown 투입 경로의 예시로 언급된다.
- AGENTS.md. 스킬과 나란히 놓이는 rulebook layer다.

본 wiki에서 이어지는 자료는 다음과 같다.

- [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]]. 같은 글의 한국 커뮤니티 요약에 정량 스펙과 비판적 토론을 더한 짝 자료다.
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Osmani)]]. 같은 저자의 후속 에세이로, 스킬을 루프의 한 구성 요소로 다룬다.
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt (Patel)]]. Boris Cherny의 "give Claude a way to verify its own work" 원칙을 실전으로 풀어쓴 가이드다. 본 글의 verification 원칙과 겹친다.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연)]]. 스킬을 harness 구성 항목 중 하나로 위치시키는 상위 프레임이다.
- [[overviews/agent-skills-overview|Agent Skills 개괄]]. 스킬 포맷의 설계 근거와 오픈 표준화를 묶은 합성 페이지다.
- [[agents/google-2026-the-new-sdlc-with-vibe|The New SDLC (Google)]]. 같은 저자가 참여한 백서로, SDLC 전 단계의 재편을 다룬다.

## 7. 용어집 (Glossary)

- Agent Skill. senior 엔지니어의 절차를 checkpoint와 exit criteria가 있는 워크플로로 강제하는 markdown 단위.
- Process over prose. 참고 에세이보다 실행 가능한 step 워크플로가 낫다는 원칙.
- Anti-rationalization table. 흔한 변명과 미리 써 둔 반박을 짝지어 놓은 표. 에이전트가 절차 생략을 스스로 정당화하는 것을 차단한다.
- Load-bearing. 저자가 다섯 원칙에 붙인 수식어로, 빼면 구조가 성립하지 않는 필수 요소라는 뜻이다.
- Exit criteria. 워크플로가 끝났다고 선언하기 위해 반드시 충족해야 하는 조건. 본문에서는 통과한 test, 깨끗한 build, reviewer 승인이 해당한다.
- Scope discipline. 요청받은 범위만 수정하고 인접 파일을 건드리지 않는 규율.
- Hyrum's Law. 관찰 가능한 API 동작은 누군가 반드시 의존하게 된다는 경험칙. 본문은 이름만 인용한다.
- Chesterton's Fence. 존재 이유를 모르는 것을 함부로 제거하지 말라는 원칙. 본문은 이름만 인용한다.
- Trunk-based development. 장기 브랜치를 두지 않고 주 브랜치에 자주 통합하는 전략. 본문은 이름만 인용한다.
- Agent harness engineering. 스킬, rulebook, 훅, tool, 메모리를 조합해 에이전트 실행 환경을 구성하는 상위 작업.
