---
title: "Skills For Real Engineers (mattpocock/skills)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/mattpocock-skills.md
raw_filename: "mattpocock-skills.md"
source_collection: external
org: "mattpocock"
repo: "skills"
url: "https://github.com/mattpocock/skills"
license: "MIT"
tags: [agent-skills, claude-code, skill-md, coding-agent, grilling, tdd, code-review, domain-modeling, adr, spec-driven-development, deep-modules, developer-workflow]
---

## 한 줄 요약 (One-line Summary)

코딩 에이전트가 실무에서 반복적으로 실패하는 네 가지 지점(요구 불일치, 과도한 장황함, 동작하지 않는 코드, 설계가 무너진 코드베이스)에 각각 대응하는 스킬 25개를 묶은 저장소로, 프로세스를 통째로 대신하는 기존 방법론과 달리 작고 교체 가능한 단위로 쪼개 사용자가 직접 고쳐 쓰도록 설계했다.

## 1. 자료 정보 (Document Information)

- **저장소**: [mattpocock/skills](https://github.com/mattpocock/skills), 라이선스 MIT, 기본 브랜치 main
- **저자**: Matt Pocock (TypeScript 교육자, Total TypeScript, AI Hero 운영)
- **규모**: star 약 25만 개, 2026-02-03 생성, 최종 push 2026-09-04 (수집 시점 기준)
- **구성**: 배포 대상 스킬 25개(engineering 18개, productivity 7개), 미배포 버킷(in-progress 8개, misc 4개, deprecated), 설계 문서 `AGENTS.md`, `CONTEXT.md`, `.agents/` 아래 규약 문서와 ADR 2건
- **배포 경로**: Claude Code 공식 마켓플레이스 플러그인(`claude plugins install mattpocock-skills`), 그리고 skills.sh 설치기(`npx skills@latest add mattpocock/skills`)
- **위치**: 저자는 이 스킬들이 GSD, BMAD, Spec-Kit 같은 프로세스 소유형 방법론의 대안이라고 밝힌다. 그런 방법론은 프로세스를 대신 소유하면서 사용자의 통제권을 가져가고 그 결과 프로세스 자체에 생긴 문제를 해결하기 어렵게 만든다는 것이 저자의 진단이다.

## 2. 주요 기여 (Key Contributions)

1. **실패 모드 기준의 스킬 배치**. 스킬을 기능 목록이 아니라 에이전트 개발에서 관찰된 네 가지 실패 모드에 대응시켜 배치했다. 각 실패 모드에는 소프트웨어 공학 고전(The Pragmatic Programmer, Domain-Driven Design, Extreme Programming Explained, A Philosophy of Software Design)의 인용이 근거로 붙는다.
2. **invocation 이분법**. 모든 스킬을 호출 주체 하나만으로 나눈다. user-invoked는 사람이 이름을 입력해야만 도달하는 스킬이고 model-invoked는 사람과 모델 양쪽이 도달할 수 있는 스킬이다. 전자는 오케스트레이션을 맡고 후자는 재사용 가능한 규율을 담는다.
3. **스킬 간 의존의 명시 규약**. 스킬이 다른 스킬을 부를 때 파일 경로 상호 참조나 `/skill` 형태의 언급이 아니라 "Skill tool을 호출하라"는 지시문으로 적는다. 도구 이름을 명시하는 편이 호출 적중률이 높고 특정 harness의 트리거 문법에 묶이지 않는다는 근거를 든다.
4. **에이전트용 문서 설계 이론**. `writing-for-agents` 스킬이 context pointer, 두 가지 부하, 정보 계층, completion criterion, leading word, 가지치기라는 6개 개념으로 에이전트가 읽는 문서의 설계 원리를 정리한다. 이 저장소에서 가장 이론적인 부분이다.
5. **deep module 어휘의 고정**. `codebase-design` 스킬이 module, interface, implementation, depth, seam, adapter, leverage, locality 8개 용어를 정의하고 component, service, API, boundary 같은 대체어 사용을 금지한다.
6. **grilling 인터뷰 primitive**. 설계 결정을 트리로 보고, 선행 결정이 이미 정해진 질문만 모아 한 라운드로 묶어 던지는 인터뷰 방식이다. 다섯 개 상위 스킬이 이 primitive를 내부에서 호출한다.
7. **feedback loop 우선 디버깅**. `diagnosing-bugs`가 가설 수립보다 재현 loop 확보를 앞세우고 loop가 없으면 다음 단계 진입 자체를 막는 6단계 절차를 정의한다.
8. **fog of war 기반 대규모 planning**. `wayfinder`가 한 세션에 담기지 않는 작업을 이슈 트래커 위의 decision ticket 지도로 만들고, 아직 질문을 또렷하게 적을 수 없는 영역은 티켓으로 쪼개지 않고 안개로 남긴다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 버킷 구조와 승격 규칙

스킬은 `skills/` 아래 다섯 개 버킷으로 나뉜다. `engineering/`과 `productivity/`가 승격(promoted) 버킷이고 `misc/`, `in-progress/`, `deprecated/`는 비승격 버킷이다.

| 버킷 | 성격 | 플러그인 배포 | 문서 페이지 |
|---|---|---|---|
| `engineering/` | 매일 쓰는 코드 작업 | 포함 | 있음 |
| `productivity/` | 코드 외 워크플로 도구 | 포함 | 있음 |
| `misc/` | 보관은 하되 권장하지 않음 | 제외 | 없음 |
| `in-progress/` | 베타, 의도적으로 공개, 피드백 수집용 | 제외 | 없음 |
| `deprecated/` | 사용 중단 | 제외 | 없음 |

승격 버킷의 스킬은 최상위 `README.md` 참조, `.claude-plugin/plugin.json`의 `skills` 배열 항목, `docs/{버킷}/{스킬명}.md` 문서 페이지 세 가지를 모두 갖춰야 한다. 비승격 버킷의 스킬은 셋 중 어디에도 나타나면 안 된다. 이 불변 조건은 `AGENTS.md`에 명문화되어 있다.

### 3.2 invocation 이분법

`user-invoked` 스킬은 frontmatter에 `disable-model-invocation: true`를 두고, Codex 쪽 설정 파일 `agents/openai.yaml`에는 `policy.allow_implicit_invocation: false`를 둔다. 두 harness 설정은 반드시 함께 움직인다. `description` 필드의 성격도 달라진다.

| 구분 | user-invoked | model-invoked |
|---|---|---|
| 도달 가능 주체 | 사람만 | 사람과 모델 |
| 설정 | `disable-model-invocation: true` + `allow_implicit_invocation: false` | 두 설정 모두 생략 |
| `description` 대상 | 사람이 읽는 한 줄 요약, 트리거 목록 제거 | 모델이 읽는 트리거 문구 유지 |
| 역할 | 오케스트레이션 | 재사용 가능한 규율 |

두 종류 사이에는 단방향 규칙이 있다. user-invoked 스킬은 model-invoked 스킬을 호출할 수 있지만, 어떤 스킬도 user-invoked 스킬을 호출할 수 없다. 선행 조건이 user-invoked 스킬인 경우(`setup-matt-pocock-skills` 등)에는 tool call이 아니라 "사용자에게 `/setup-matt-pocock-skills`를 실행하라고 알려라"라는 사람 대상 지시문으로 적는다.

model-invoked로 둘지 판단하는 기준은 재사용 여부가 아니라 "모델이 자율적으로 이 스킬에 도달하는 것이 유용한가"다. 재사용은 스킬로 분리하는 이유일 뿐 invocation을 정하는 기준이 아니라고 명시한다.

Skill tool은 한 번에 스킬 하나만 받는다. 두 스킬이 필요한 단계는 호출 두 번으로 적고("grilling과 domain-modeling에 대해 Skill tool을 두 번 호출하라"), 이름 두 개를 한 호출에 넘기는 문장으로 쓰지 않는다.

### 3.3 네 가지 실패 모드와 대응

| 실패 모드 | 진단 | 대응 스킬 |
|---|---|---|
| 에이전트가 원하는 것을 만들지 않음 | 사람과 에이전트 사이의 의사소통 격차 | `grill-me`, `grill-with-docs` |
| 에이전트가 지나치게 장황함 | 프로젝트 전문 용어를 모르는 상태로 투입되어 한 단어로 될 말에 스무 단어를 씀 | `grill-with-docs`가 만드는 `CONTEXT.md` 공용 언어 |
| 코드가 동작하지 않음 | 산출물이 실제로 어떻게 실행되는지에 대한 피드백 부재 | `tdd`, `diagnosing-bugs` |
| 설계가 무너진 코드베이스 | 에이전트가 코딩 속도를 높이면서 소프트웨어 엔트로피 증가도 함께 가속 | `to-spec`, `improve-codebase-architecture` |

공용 언어의 효과를 저자는 자신의 `course-video-manager` 저장소 사례로 제시한다. "코스의 섹션 안에 있는 레슨이 실체화될 때 문제가 생긴다"라는 서술이 공용 언어를 갖추면 "materialization cascade에 문제가 있다"로 줄어든다. 저자는 부수 효과로 변수와 함수와 파일 이름이 일관되게 지어지고 코드베이스 탐색이 쉬워지며 언어가 간결해진 만큼 에이전트가 사고에 쓰는 토큰이 줄어든다는 점을 든다.

### 3.4 메인 플로우

`ask-matt` 라우터가 스킬 사이의 경로를 정의한다. 대부분의 작업이 지나는 경로는 아이디어에서 출시까지의 단일 흐름이다.

1. `grill-with-docs`로 아이디어를 인터뷰로 벼린다. 작업 디렉터리가 있으면 항상 여기서 시작한다. `CONTEXT.md`와 ADR에 학습 내용이 남는 상태 유지형이기 때문이다.
2. 대화만으로 모든 질문을 정리할 수 없으면 `prototype`으로 우회한다. 왕복 양방향 모두 `handoff`가 다리 역할을 한다.
3. 여러 세션에 걸치는 작업이면 `to-spec`으로 스펙을 만들고 `to-tickets`로 tracer bullet 티켓으로 쪼갠 뒤 티켓마다 `implement`를 실행한다. 한 세션에 들어가면 곧바로 `implement`로 간다.

`implement`는 내부에서 `tdd`를 구동하고 마무리로 `code-review`를 실행한 뒤 커밋한다.

컨텍스트 위생 규칙도 함께 정의된다. 1단계부터 3단계까지는 하나의 끊기지 않은 context window 안에서 진행하고, `to-tickets` 이전에는 compact나 clear를 하지 않는다. 인터뷰와 스펙과 티켓이 같은 사고 위에 쌓이도록 하기 위해서다. 반면 `implement`는 티켓마다 새 컨텍스트에서 시작한다. 이 규칙의 한계는 smart zone이다. 저자는 최신 모델 기준 약 15만 토큰을 모델이 여전히 예리하게 추론하는 구간으로 보고, 그 안에서 `to-tickets`에 도달하지 못하면 성능이 저하된 채 밀어붙이지 말고 가장 가까운 단계 경계에서 compact하라고 지시한다.

메인 플로우에 합류하는 진입로는 세 가지다.

- **`triage`**: 직접 만들지 않은 이슈(버그 신고, 들어온 기능 요청)를 처리해 에이전트가 집을 수 있는 상태로 만든다. `to-tickets`가 만든 티켓은 이미 에이전트용이므로 triage 대상이 아니다.
- **`diagnosing-bugs`**: 한눈에 안 잡히는 버그, 간헐적 실패, 두 정상 상태 사이에 끼어든 회귀를 다룬다.
- **`wayfinder`**: 한 세션에 담기지 않는 크고 안개 낀 작업을 다룬다.

### 3.5 grilling 인터뷰 primitive

`grilling`은 설계 결정을 design tree로 본다. 결정 하나가 그에 딸린 하위 결정으로 가지를 친다. frontier는 선행 조건이 이미 정해진 결정 전체, 즉 아직 듣지 못한 답을 추측하지 않고도 지금 물을 수 있는 질문들이다.

한 라운드에서 frontier 전체를 한꺼번에 묻는다. 질문마다 번호를 붙이고 추천 답을 함께 제시한 뒤 사용자의 답을 기다린다. 답이 들어오면 트리가 재구성되고 정해진 결정이 frontier를 바깥으로 밀어내면서 그에 의존하던 질문이 열린다. 같은 라운드에 아직 열려 있는 질문에 답이 걸린 질문은 이번 라운드가 아니라 다음 라운드에 속한다.

역할 분담이 명확하다. 사실을 찾는 일은 에이전트의 몫이다. frontier 질문이 파일 시스템이나 도구에서 얻을 수 있는 사실을 필요로 하면 서브에이전트를 보내 찾고, 사용자에게 묻지 않는다. 다만 그 탐색을 기다리느라 멈추지는 않는다. 진행 중인 탐색은 미해결 선행 조건이므로 그 아래에 걸린 질문만 기다리고 나머지 frontier는 지금 묻는다. 결정은 사용자의 몫이다.

세션은 frontier가 비면 끝난다. 사용자가 공통된 이해에 도달했다고 확인하기 전에는 실행에 들어가지 않는다.

`grill-me`는 이 primitive를 부르는 한 줄짜리 래퍼이고 `grill-with-docs`는 `grilling`과 `domain-modeling` 두 스킬을 호출하는 래퍼다. `triage`, `wayfinder`, `improve-codebase-architecture`도 내부에서 `grilling`을 호출한다.

### 3.6 codebase-design의 deep module 어휘

deep module은 작은 interface 뒤에 많은 동작을 두고, 깨끗한 seam 위에 놓이며, 그 interface를 통해 테스트되는 모듈을 말한다.

| 용어 | 정의 | 금지 대체어 |
|---|---|---|
| module | interface와 implementation을 가진 모든 것. 함수, 클래스, 패키지, 계층을 가로지르는 슬라이스 모두 해당 | unit, component, service |
| interface | 호출자가 올바르게 쓰기 위해 알아야 하는 모든 것. 타입 시그니처뿐 아니라 불변 조건, 순서 제약, 오류 모드, 필수 설정, 성능 특성 포함 | API, signature |
| implementation | 모듈 내부의 코드 본체 | |
| depth | interface에서의 leverage. 호출자나 테스트가 배워야 하는 interface 한 단위당 행사할 수 있는 동작의 양 | |
| seam | 그 자리를 편집하지 않고 동작을 바꿀 수 있는 위치. Michael Feathers의 용어 | boundary |
| adapter | seam에서 interface를 만족시키는 구체적 대상. 무엇이 들어 있는지가 아니라 어떤 자리를 채우는지를 가리킨다 | |
| leverage | depth가 호출자에게 주는 것. 구현 하나가 N개 호출 지점과 M개 테스트에 걸쳐 회수된다 | |
| locality | depth가 유지보수자에게 주는 것. 변경과 버그와 지식과 verification이 한 곳에 모인다 | |

원칙 네 가지가 따라붙는다.

- **depth는 implementation이 아니라 interface의 속성이다.** deep module 내부는 작고 교체 가능한 부품으로 구성될 수 있고, 그 부품이 interface에 드러나지만 않으면 된다. 모듈은 외부 seam과 별개로 내부 seam을 가질 수 있다.
- **삭제 테스트.** 모듈을 지웠다고 상상한다. 복잡도가 사라지면 통과용 껍데기였고 복잡도가 N개 호출자에 걸쳐 되살아나면 제 몫을 하던 모듈이다.
- **interface가 곧 테스트 표면이다.** 호출자와 테스트가 같은 seam을 지난다. interface 너머를 테스트하고 싶다면 모듈 형태가 잘못됐을 가능성이 크다.
- **adapter가 하나면 가정된 seam, 둘이면 실재하는 seam이다.** 실제로 무언가가 달라지지 않는 자리에 seam을 만들지 않는다.

저자는 Ousterhout의 정의 중 depth를 구현 줄 수 대 interface 줄 수의 비율로 재는 방식을 명시적으로 기각한다. 구현을 부풀리는 쪽에 보상을 주기 때문이며, 대신 leverage로서의 depth를 쓴다.

### 3.7 tdd

TDD를 red에서 green으로 가는 loop로 정의하고 스킬 자체는 그 loop가 남길 가치가 있는 테스트를 만들도록 하는 참고 문서 역할을 한다.

seam은 테스트가 놓이는 공개 경계다. 규칙은 사전에 합의된 seam에서만 테스트한다는 것이다. 테스트를 쓰기 전에 대상 seam을 적어 사용자에게 확인받고 확인되지 않은 seam에는 테스트를 쓰지 않는다. 모든 것을 테스트할 수는 없으므로 seam을 먼저 합의하는 것이 테스트 노력을 임계 경로와 복잡한 로직에 집중시키는 방법이라고 설명한다.

안티 패턴 세 가지를 든다.

- **구현 결합**: 내부 협력자를 mock하거나, private 메서드를 테스트하거나, 우회 경로로 확인한다(interface 대신 데이터베이스를 직접 조회). 판별 신호는 동작이 안 바뀌었는데 리팩터링에서 테스트가 깨지는 것이다.
- **동어반복**: 단언이 코드와 같은 방식으로 기대값을 다시 계산한다(`expect(add(a, b)).toBe(a + b)`). 구조상 항상 통과하므로 코드와 불일치할 수 없다. 기대값은 독립된 출처(알려진 리터럴, 손으로 푼 예제, 스펙)에서 와야 한다.
- **수평 분할**: 테스트를 전부 먼저 쓰고 구현을 전부 나중에 쓴다. 이렇게 하면 상상한 동작을 검증하게 되고, 구현을 이해하기 전에 테스트 구조에 자신을 묶는다. 대신 수직 슬라이스로 진행한다. 테스트 하나, 구현 하나를 반복하며 각 테스트가 직전 사이클에서 배운 것에 반응하는 tracer bullet이 된다.

loop 규칙은 세 가지다. 실패하는 테스트를 먼저 쓰고 통과에 필요한 만큼만 구현한다. 사이클마다 seam 하나, 테스트 하나, 최소 구현 하나만 다룬다. 리팩터링은 loop의 일부가 아니라 검토 단계에 속한다.

### 3.8 code-review의 두 기준

고정점과 `HEAD` 사이의 diff를 두 기준으로 검토한다. Standards는 저장소의 문서화된 코딩 표준을 따르는지 보고, Spec은 원래 이슈나 스펙을 충실히 구현했는지 본다. 두 기준은 각각 별도의 서브에이전트로 병렬 실행되어 서로의 컨텍스트를 오염시키지 않는다.

두 기준을 분리하는 근거는 한 기준을 통과하면서 다른 기준에서 실패하는 변경이 실재하기 때문이다. 표준을 다 지켰지만 엉뚱한 것을 구현한 코드는 Standards 통과에 Spec 실패이고 이슈가 요구한 대로 동작하지만 프로젝트 관례를 깬 코드는 그 반대다. 최종 보고에서 두 기준의 발견 사항을 병합하거나 다시 순위 매기지 않는다.

Standards 기준에는 저장소가 아무것도 문서화하지 않아도 항상 적용되는 smell baseline이 붙는다. Fowler의 Refactoring 3장에서 가져온 코드 냄새 12종(Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest)이며, 각 항목은 무엇인지와 어떻게 고치는지 형식으로 적혀 있다. 두 가지 규칙이 이 baseline을 제한한다. 저장소의 문서화된 표준이 항상 우선하고, baseline 항목은 확정 위반이 아니라 항상 판단이 필요한 지적("가능성 있는 Feature Envy")으로 다룬다.

### 3.9 diagnosing-bugs의 6단계

어려운 버그를 위한 규율이며, 명시적으로 정당화될 때만 단계를 건너뛴다.

**1단계 feedback loop 구축**이 이 스킬의 본체다. 이 버그에서 실패로 바뀌는 명확한 pass/fail 신호를 확보하면 원인은 찾게 되고, 없으면 코드를 아무리 들여다봐도 소용없다는 것이 전제다. loop를 만드는 방법을 실패하는 테스트, curl 스크립트, CLI 호출과 스냅샷 비교, headless 브라우저 스크립트, 캡처한 trace 재생, 일회용 harness, 속성 기반과 fuzz loop, 이분 탐색 harness, 차분 loop, 사람이 개입하는 bash 스크립트 순으로 10가지 제시한다.

loop를 확보한 다음에는 loop 자체를 제품처럼 다듬는다. 더 빠르게(설정 캐시, 무관한 초기화 생략, 테스트 범위 축소), 신호를 더 날카롭게(오류 없음이 아니라 구체적 증상에 대해 단언), 더 결정적으로(시간 고정, 난수 시드 고정, 파일 시스템 격리, 네트워크 동결) 만든다. 30초짜리 불안정한 loop는 없는 것보다 조금 나은 정도이고 2초짜리 결정적 loop가 목표다.

1단계의 completion criterion은 구체적이다. completion criterion은 그 단계가 끝났다고 판단하는 조건을 뜻한다. 여기서는 이미 최소 한 번 실행해 본 명령 하나를 댈 수 있어야 하고, 그 명령이 실제 버그 코드 경로를 지나며 사용자가 말한 정확한 증상에 대해 단언하고, 매 실행에서 같은 판정을 내며, 분이 아니라 초 단위로 끝나고, 사람 개입 없이 실행 가능해야 한다. 이 명령이 존재하기 전에 이론을 세우려고 코드를 읽고 있다면 멈추라고 지시한다. 가설로 바로 건너뛰는 것이 이 스킬이 막으려는 바로 그 실패이기 때문이다.

나머지 단계는 재현과 최소화(2단계), 3~5개 반증 가능 가설을 순위 매겨 제시(3단계), 예측 하나당 탐침 하나로 계측하되 변수는 한 번에 하나만(4단계), 올바른 seam이 있을 때만 회귀 테스트를 먼저 쓰고 수정(5단계), 정리(6단계)로 이어진다. 5단계에는 특기할 규정이 있다. 올바른 seam이 없다면 그 사실 자체가 발견이며, 코드베이스 구조가 버그를 고정하지 못하게 막고 있다는 뜻이므로 기록해 다음 단계로 넘긴다.

디버그 로그에는 `[DEBUG-a4f2]` 같은 고유 접두사를 붙인다. 정리가 grep 한 번으로 끝나기 때문이다.

### 3.10 to-tickets의 tracer bullet과 expand-contract

티켓은 tracer bullet 수직 슬라이스다. 각 슬라이스는 스키마부터 API, UI, 테스트까지 모든 계층을 관통하는 좁지만 완전한 경로를 자르고 완료 시 그 자체로 시연하거나 검증할 수 있으며, 새 컨텍스트 하나에 들어가는 크기여야 한다.

수직 슬라이싱의 예외는 wide refactor다. 컬럼 이름 변경이나 공용 심볼의 타입 변경처럼 기계적 변경 하나의 영향 범위가 코드베이스 전체로 퍼져서, 편집 한 번이 수천 개 호출 지점을 동시에 깨뜨리고 어떤 수직 슬라이스도 통과 상태로 착지할 수 없는 경우다. 이때는 tracer bullet으로 억지로 만들지 않고 expand-contract로 순서를 잡는다.

| 단계 | 내용 | 블로킹 관계 |
|---|---|---|
| expand | 기존 형태 옆에 새 형태를 추가해 아무것도 깨지지 않게 한다 | 없음 |
| migrate | 호출 지점을 영향 범위 단위(패키지별, 디렉터리별) 배치로 옮긴다 | expand가 블로킹 |
| contract | 남은 호출자가 없어진 뒤 기존 형태를 삭제한다 | 모든 migrate 배치가 블로킹 |

배치마저 단독으로 통과 상태를 유지할 수 없으면 순서는 유지하되 공용 통합 브랜치를 쓰고, 그 브랜치가 최종 통합 검증 티켓 하나를 블로킹하게 한다. 통과 상태는 그 지점에서만 보장한다.

### 3.11 wayfinder의 fog of war

한 세션에 담기지 않는 크고 모호한 작업을 다룬다. 목적지에 곧장 달려드는 것이 아니라 목적지까지 가는 길을 찾는 작업으로 규정한다. 지도는 이슈 트래커의 이슈 하나(`wayfinder:map` 라벨)이고 티켓은 그 자식 이슈다.

기본 자세는 계획이지 실행이 아니다. 각 티켓은 결정 하나를 해소하고, 실행에 들어가기 전에 정할 것이 남지 않았을 때 지도가 완성된다. 그냥 작업을 해버리고 싶어지는 충동은 대체로 지도의 가장자리에 도달했고 인계할 시점이라는 신호로 읽는다.

지도는 저장소가 아니라 색인이다. 내려진 결정을 나열하고 세부를 담은 티켓을 가리킬 뿐, 결정은 그 티켓 한 곳에만 존재한다. 지도 본문은 목적지, 참고 사항, 지금까지의 결정, 아직 명세되지 않음, 범위 밖 네 개 절로 구성된다.

fog of war는 오고 있다는 것은 알지만 아직 또렷하게 짚어낼 수 없는 결정과 조사의 영역이다. 티켓으로 만들지 안개로 남길지 가르는 기준은 지금 답할 수 있는지가 아니라 지금 질문을 정확하게 진술할 수 있는지다. 질문이 이미 날카로우면 막혀 있어도 티켓으로 만들고, 그만큼 날카롭게 표현할 수 없으면 아직 명세되지 않음 절에 남긴다. 안개를 미리 티켓 크기로 쪼개지 않는다. 안개 한 덩어리가 나중에 여러 티켓이 될 수도, 하나도 안 될 수도 있기 때문이다.

범위 밖은 안개와 구분된다. 안개는 목적지 쪽으로만 모이므로, 목적지 너머의 작업은 안개가 아니라 범위 밖이며 별도 절에 기록한다. 범위 밖 항목은 졸업하지 않는다.

티켓 종류는 네 가지이고 각각 사람이 함께해야 하는지 여부가 정해져 있다.

| 종류 | 사람 개입 | 용도 |
|---|---|---|
| research | 불필요 | 결정이 기다리는 사실을 문서나 외부 API에서 확보. 서브에이전트가 `research` 스킬을 호출해 해소 |
| prototype | 필요 | 반응할 대상이 될 값싸고 거친 산출물을 만들어 논의 해상도를 높인다 |
| grilling | 필요 | 대화. 기본값. `grilling`과 `domain-modeling`을 함께 호출 |
| task | 경우에 따라 | 결정 이전에 끝나야 하는 수작업. 서비스 가입, 접근 권한 확보, 데이터 이동 |

한 세션에서 티켓을 두 개 이상 해소하지 않는다. research 티켓만 예외다.

### 3.12 writing-for-agents의 문서 설계 이론

에이전트가 소비하는 모든 문서에 적용되는 참고 문서다. 스킬이든 `AGENTS.md`든 포인터로 도달하는 문서든 포장만 다를 뿐 글쓰기는 같다고 전제한다. 같은 산출물을 내는 것이 아니라 매 실행에서 같은 과정을 밟게 하는 것이 목표이기 때문이다.

**context pointer**는 에이전트의 컨텍스트 안에 있으면서 컨텍스트 밖의 자료를 가리키고 그 자료에 도달할 조건을 담은 참조다. 스킬의 `description`이 그 예이고 `AGENTS.md`에서 문서를 가리키는 한 줄도 같은 대상이다. 언제 얼마나 안정적으로 도달할지를 정하는 것은 가리키는 대상이 아니라 포인터의 문구다. 꼭 필요한 자료가 약한 문구 뒤에 있다면 그것은 변동성 결함이므로 문구를 먼저 날카롭게 하고, 그래도 안 되면 그때 본문에 인라인한다.

**두 가지 부하**를 구분한다. 컨텍스트 부하는 항상 로드되는 자료가 모델의 컨텍스트에 지우는 비용으로, 발동 여부와 무관하게 매 턴 토큰과 주의를 쓴다. 인지 부하는 사람에게 지우는 비용으로, 어떤 문서가 있고 언제 무엇을 꺼내야 하는지를 사람이 기억해야 한다. 인지 부하는 최소화 대상이 아니라 사람의 판단권에 대한 대가로 본다.

**정보 계층**은 자료가 얼마나 즉각적으로 필요한지에 따른 세 단계 사다리다.

| 단계 | 성격 |
|---|---|
| 파일 내 단계(step) | 에이전트가 순서대로 수행하는 것. 최상위 단계 |
| 파일 내 참고(reference) | 필요할 때 조회하는 정의와 규칙과 사실 |
| 분리된 참고 | 별도 파일로 밀어내고 context pointer로 도달하며 포인터가 발동할 때만 로드 |

progressive disclosure는 이 사다리를 내려가는 이동이다. 토큰 최적화가 주목적이 아니라 계층을 보호하는 방법으로 규정한다. 판단 기준은 분기다. 모든 분기가 필요로 하는 것은 인라인하고 일부 분기만 도달하는 것은 포인터 뒤로 민다. 같은 파일 안에서의 짝은 co-location이다. 사다리가 얼마나 아래로 갈지를 정한다면 co-location은 그 자리에서 무엇이 옆에 놓일지를 정한다.

**completion criterion**은 두 가지 성질로 지렛대가 된다. 명확성은 에이전트가 완료와 미완료를 구분할 수 있는지이고 모호한 기준은 조기 종료를 부른다. 요구 강도는 얼마나 많은 것을 요구하는지이며 "수정된 모든 모델이 설명되었다"는 "변경 목록을 만들어라"보다 훨씬 철저한 작업을 강제한다.

**leading word**는 모델의 pre-training 안에 이미 존재하는 압축된 개념어로, 문장이 아니라 토큰으로 반복해 쓰면 분산된 정의가 쌓이면서 최소한의 토큰으로 넓은 행동 영역을 고정한다. "빠르고 결정적이고 부담이 적은"을 tight 하나로, "믿을 수 있는 loop"를 red 하나로 줄이는 식이다. 새 단어를 만들 수도 있지만 pre-training된 단어가 무료로 주는 것을 정의 토큰으로 지불해야 하므로 기존 단어를 먼저 찾는다.

이 지렛대 옆의 실패 모드가 **부정형 지시**다. 금지로 조종하면 금지된 행동이 컨텍스트로 끌려 들어와 오히려 더 떠오르기 쉬워진다. 목표 행동을 긍정형으로 진술해 금지 대상을 아예 언급하지 않는 쪽을 택한다.

**가지치기** 항목은 네 가지다. 의미마다 단일 출처를 유지하고, 환경 자체(`package.json` 스크립트, 설정 파일, 디렉터리 구조, `--help` 출력)도 출처이므로 조회가 비쌀 때만 문서에 캐시하며, 모든 줄이 여전히 문서의 목적과 관련되는지 확인하고, 모델이 기본값으로 이미 지키는 지시(no-op)를 문장 단위로 찾아 삭제한다. no-op 판정은 독자 기준이 아니라 모델 기준이며, 두 사람이 이견을 보이면 토론이 아니라 문서를 실행해 판정한다.

### 3.13 domain-modeling과 문서 산출물

`domain-modeling`은 도메인 모델을 능동적으로 만들고 벼리는 규율이다. `CONTEXT.md`를 읽어 어휘만 참고하는 것은 이 스킬이 아니라 어느 스킬이나 하는 한 줄짜리 습관으로 구분한다.

세션 중 다섯 가지 동작을 수행한다. 사용자가 쓴 용어가 `CONTEXT.md`의 기존 언어와 충돌하면 즉시 지적하고, 모호하거나 과부하된 용어에는 정확한 canonical 용어를 제안하며, 도메인 관계가 논의될 때 경계를 파고드는 구체적 시나리오로 압박하고, 사용자가 진술한 동작을 코드와 대조해 모순을 드러내며, 용어가 정해지는 즉시 `CONTEXT.md`를 그 자리에서 갱신한다. 모아 두었다가 일괄 처리하지 않는다.

`CONTEXT.md`는 구현 세부가 전혀 없어야 하고 스펙이나 메모장이나 구현 결정 저장소로 쓰지 않는다. 용어집이며 그 외의 것이 아니다.

ADR은 세 조건이 모두 참일 때만 제안한다. 되돌리기 어렵고 맥락 없이는 놀랍고 실제 절충의 결과여야 한다. 하나라도 빠지면 ADR을 만들지 않는다.

### 3.14 배포 구조

두 경로가 있고 서로 배타적이다. Claude Code 플러그인은 관리되는 읽기 전용 묶음이라 저자가 배포하면 자동으로 갱신되고 skills.sh는 편집 가능한 파일을 프로젝트에 복사하므로 사용자가 고쳐 쓴다. 둘 다 설치하면 모든 스킬이 두 벌씩 남으므로 하나만 고르라고 명시한다.

`setup-matt-pocock-skills`가 저장소별 설정을 만든다. 이슈 트래커(GitHub, GitLab, 로컬 마크다운, 기타), triage 라벨 어휘(다섯 개 canonical 역할), 도메인 문서 배치(단일 컨텍스트 기본)를 각각 한 섹션씩 물어 `docs/agents/` 아래에 기록한다.

ADR 0001은 설정 의존성을 강한 의존과 약한 의존으로 나눈다. `to-tickets`, `to-spec`, `triage`는 특정 이슈 트래커에 게시하거나 특정 라벨 문자열을 적용해야 하므로 설정이 없으면 출력이 틀린다. 이들에게만 `/setup-matt-pocock-skills`를 실행하라는 한 줄을 넣는다. `diagnose`, `tdd`, `improve-codebase-architecture`는 설정이 없어도 동작하고 출력이 덜 날카로워질 뿐이므로 모호한 산문으로만 언급한다. 이 구분이 약한 의존 스킬의 토큰을 가볍게 유지한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

이 저장소는 정량 벤치마크를 제시하지 않는다. 대신 ADR 0002가 배포 경로에 대한 검증 기록을 남긴다.

Claude Code와 Codex의 플러그인 매니페스트 형식 차이가 배포 범위를 갈랐다. Claude Code의 `.claude-plugin/plugin.json`은 `skills`를 명시적 경로 배열로 받으므로 승격된 스킬만 하나씩 나열해 나머지를 모호함 없이 제외할 수 있다. Codex의 `.codex-plugin/plugin.json`은 `skills`를 단일 경로 문자열로만 받고 배열은 거부하며, 그 경로 아래에서 `SKILL.md`를 재귀 탐색한다. 버킷 두 개를 한 경로로 지정할 방법이 없다.

두 가지 우회책을 시험하고 기각했다. `./skills/`를 가리키면 `deprecated/`, `in-progress/`, `personal/`, `misc/`까지 함께 배포된다. 심볼릭 링크로 만든 평면 디렉터리는 설치를 견디지 못한다. Codex가 플러그인 트리를 캐시로 복사하면서 심볼릭 링크를 버려 스킬이 빈 채로 도착한다. 결론은 Claude Code 플러그인을 먼저 배포하고, skills.sh를 범용 설치기로 유지하며, Codex 네이티브 플러그인은 연기하는 것이다.

2026-08-05 업데이트에서 `mattpocock-skills`가 Claude Code 공식 마켓플레이스(`claude-plugins-official`)에 등재됐다. Claude Code 2.1.222에서 검증한 내용은 다음과 같다.

- `claude plugins install mattpocock-skills`가 마켓플레이스를 먼저 추가하지 않아도 해소되며 `mattpocock-skills@claude-plugins-official`로 보고된다.
- `claude plugin details mattpocock-skills`가 버전 1.2.0을 보고하고 승격된 스킬을 로드한다.
- 등재 항목의 `source`가 sha를 고정하고 있어, 태그를 다는 순간이 아니라 그 고정점이 움직일 때 설치 사용자에게 릴리스가 도달한다. 작성 시점에 고정점이 main보다 커밋 두 개 뒤에 있어 `plugin.json`의 24개가 아니라 22개 스킬이 목록에 나타났다.
- 세션 내 `/plugin install`은 검증하지 못했다. `/plugin`이 headless 세션에서 제공되지 않기 때문이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Codex 네이티브 플러그인 부재.** 매니페스트가 승격 부분집합을 표현하지 못해 연기된 상태다. 해소하려면 `skills/`를 승격 스킬만 담도록 재구성하거나 평면 디렉터리에 사본을 커밋해야 하는데, 전자는 `CLAUDE.md`와 스크립트와 버킷 README와 로컬 개발 흐름까지 영향 범위가 넓고 후자는 동기화 부담과 두 번째 진실 원천을 만든다. Codex가 `skills` 배열이나 포함 목록을 지원하거나 설치 시 심볼릭 링크를 보존하면 재검토한다.
- **정량 평가 없음.** 스킬의 효과를 재는 벤치마크나 A/B 비교가 없다. 근거는 저자의 실무 경험과 소프트웨어 공학 고전 인용이다.
- **저장소별 설정 선행 조건.** engineering 스킬 상당수가 `setup-matt-pocock-skills`가 만든 설정에 의존한다. 강한 의존 스킬은 설정 없이는 출력이 틀린다.
- **`improve-codebase-architecture`의 범위 한정.** 저자 스스로 이 스킬을 구조 조사이지 구제가 아니라고 밝힌다. 오래된 코드베이스에서 실제 후보를 찾아주기는 하지만 얽힌 구조를 대신 풀어 주지는 않는다.
- **in-progress 버킷의 미완성 스킬.** `retro`, `loop-me`, `writing-beats` 등 8개가 의도적으로 공개되어 있으나 플러그인에는 포함되지 않고 문서 페이지도 없다.
- **smart zone 가정.** 컨텍스트 위생 규칙이 약 15만 토큰이라는 경험적 수치에 기대고 있어 모델이 바뀌면 함께 조정해야 한다.

## 6. 관련 연구 (Related Work)

- **Agent Skills 표준 (agentskills/agentskills)**: `SKILL.md` 한 파일을 중심으로 하는 스킬 포맷의 공개 표준이다. 이 저장소는 그 포맷 위에서 실제 엔지니어링 워크플로를 구성한 사례에 해당한다.
- **소프트웨어 공학 고전**: The Pragmatic Programmer(Thomas와 Hunt), Domain-Driven Design(Evans), Extreme Programming Explained(Beck), A Philosophy of Software Design(Ousterhout), Refactoring(Fowler), Working Effectively with Legacy Code(Feathers)의 seam 개념이 각 스킬의 근거로 직접 인용된다.
- **프로세스 소유형 방법론**: GSD, BMAD, Spec-Kit을 명시적 대조군으로 삼는다.
- **harness engineering 계열 자료**: 에이전트를 감싸는 실행 환경 설계를 다루는 자료들과 문제의식이 겹친다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| user-invoked | 사람이 이름을 입력해야만 도달할 수 있는 스킬. `disable-model-invocation: true`로 지정하며 오케스트레이션을 맡는다 |
| model-invoked | 사람과 모델 양쪽이 도달할 수 있는 스킬. 기본값이며 재사용 가능한 규율을 담는다 |
| promoted bucket | 플러그인에 배포되는 버킷. `engineering/`과 `productivity/` 두 개이며 README 참조와 매니페스트 항목과 문서 페이지를 모두 갖춰야 한다 |
| design tree | `grilling`이 설계 결정을 보는 구조. 결정 하나가 그에 딸린 하위 결정으로 가지를 친다 |
| frontier | 선행 조건이 이미 정해져 지금 물을 수 있는 질문 전체. 한 라운드에 통째로 제시한다 |
| deep module | 작은 interface 뒤에 많은 동작을 두고 깨끗한 seam 위에 놓인 모듈 |
| seam | 그 자리를 편집하지 않고 동작을 바꿀 수 있는 위치. Feathers의 용어이며 interface가 놓이는 자리다 |
| depth | 배워야 하는 interface 한 단위당 행사할 수 있는 동작의 양. 구현 줄 수 비율이 아니라 leverage로 정의한다 |
| leverage / locality | depth가 각각 호출자와 유지보수자에게 주는 이득. 전자는 재사용 회수, 후자는 변경과 버그가 한 곳에 모이는 것 |
| 삭제 테스트 | 모듈을 지웠다고 상상해 복잡도가 사라지면 껍데기, N개 호출자에 되살아나면 제 몫을 한 모듈로 판정하는 방법 |
| tracer bullet | 모든 계층을 관통하는 좁지만 완전한 수직 슬라이스. 단독으로 시연 가능하고 새 컨텍스트 하나에 들어간다 |
| wide refactor | 기계적 변경 하나의 영향 범위가 코드베이스 전체로 퍼지는 작업. expand-contract로 순서를 잡는다 |
| tight loop | 빠르고 결정적이며 이 버그에서 실패로 바뀌는 재현 loop. `diagnosing-bugs`의 1단계 산출물 |
| smell baseline | 저장소가 아무것도 문서화하지 않아도 적용되는 Fowler 코드 냄새 12종. 항상 판단이 필요한 지적으로 다룬다 |
| decision ticket | `wayfinder`의 단위. 실행할 작업 조각이 아니라 해소가 곧 결정인 질문을 담은 자식 이슈 |
| fog of war | 오고 있다는 것은 알지만 아직 질문을 정확히 진술할 수 없는 영역. 티켓으로 쪼개지 않고 지도에 남긴다 |
| context pointer | 컨텍스트 밖 자료를 가리키고 도달 조건을 담은 참조. 스킬의 `description`이 대표 사례다 |
| completion criterion | 한 단계가 끝났다고 판단하는 조건. 명확성과 요구 강도 두 성질로 작업 품질을 좌우한다 |
| leading word | 모델의 pre-training에 이미 있는 압축 개념어. 문장이 아니라 토큰으로 반복해 행동 영역을 고정한다 |
| no-op | 모델이 기본값으로 이미 지키는 지시. 부하만 쓰고 아무 효과가 없으므로 문장째 삭제한다 |
| smart zone | 모델이 여전히 예리하게 추론하는 컨텍스트 구간. 최신 모델 기준 약 15만 토큰으로 본다 |
