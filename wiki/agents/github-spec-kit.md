---
title: "Spec Kit"
type: repo
year: 2025
category: agents
raw_path: raw/repos/github-spec-kit.md
raw_filename: "github-spec-kit.md"
source_collection: external
source: github-spec-kit.md
org: "github"
repo: "spec-kit"
url: "https://github.com/github/spec-kit"
license: "MIT"
tags: [spec-driven-development, coding-agent, slash-commands, constitution, template-driven-prompting, github]
---

## 요약

Spec Kit은 GitHub이 공개한 MIT 라이선스 오픈소스 툴킷이다. 코딩 에이전트에게 정해진 프로세스, 재사용 가능한 템플릿, 기록으로 남는 결과물을 제공하며, 그 중심에 spec-driven development(SDD)라는 방법론이 있다. 2025-08-21에 생성되어 2026-11-12 수집 시점 기준 star 약 14.9만 개를 기록하고 있다.

SDD는 명세(specification)를 진실의 원천(source of truth)으로 삼고 코드를 명세에서 생성되는 결과물로 다룬다. 즉 사람은 무엇을 왜 만들지를 명세로 적고, 에이전트는 그 명세를 구현 계획, task 목록, 코드 순서로 변환한다. Spec Kit은 이 변환의 각 단계를 슬래시 커맨드 형태의 스킬로 제공하고, 각 단계의 출력을 템플릿과 constitution으로 제약해 LLM이 추측하거나 과잉 설계하지 않도록 만든다.

이 페이지는 저장소의 `README.md`와 README가 "full methodology"로 링크하는 `spec-driven.md`를 근거로 한다. README는 네 가지 프로세스의 진입점과 커스터마이징 수단을 안내하고, `spec-driven.md`는 SDD의 철학, 명령 세부 동작, 템플릿 설계 원리, constitution 9개 조항을 설명한다.

## 배경

### 명세와 코드의 간극

소프트웨어 개발에서 명세는 오랫동안 코드에 종속된 문서였다. PRD는 개발을 안내하고 설계 문서는 구현에 정보를 주며 다이어그램은 아키텍처를 시각화했지만, 코딩이 시작되면 진실은 언제나 코드였다. 따라서 코드가 앞으로 나아가는 동안 명세는 따라가지 못하고 낡아 갔다.

`spec-driven.md`는 이 간극을 소프트웨어 개발의 오래된 문제로 규정한다. 더 나은 문서, 더 상세한 요구사항, 더 엄격한 절차로 간극을 메우려는 시도는 간극을 피할 수 없는 것으로 받아들였기 때문에 간극을 좁히기만 하고 없애지는 못했다는 것이 문서의 진단이다.

### 권력 역전

SDD는 명세와 코드의 관계를 뒤집는다. 명세가 코드를 섬기는 것이 아니라 코드가 명세를 섬긴다. PRD는 구현을 위한 안내서가 아니라 구현을 생성하는 원천이 되고, 기술 계획은 코딩에 참고하는 문서가 아니라 코드를 산출하는 정밀한 정의가 된다.

이 역전이 지금 가능한 이유는 AI가 복잡한 명세를 이해하고 구현하며 상세한 구현 계획을 만들 수 있게 됐기 때문이다. 반면 구조 없는 AI 생성은 혼란을 낳는다. SDD는 동작하는 시스템을 생성할 만큼 정확하고 완전하며 모호하지 않은 명세와 구현 계획을 통해 그 구조를 제공한다.

이 관점에서 개발 활동의 의미가 바뀐다.

| 활동 | 기존 의미 | SDD에서의 의미 |
|---|---|---|
| 유지보수 | 코드 수정 | 명세를 진화시키는 일 |
| 디버깅 | 코드의 결함 수정 | 잘못된 코드를 생성한 명세와 구현 계획의 수정 |
| 리팩터링 | 코드 구조 개선 | 명확성을 위한 재구성 |
| 기능 추가와 병렬 구현 | 기존 코드 위의 증분 개발 | 명세를 다시 보고 새 구현 계획을 만드는 일 |

문서는 이 과정을 "0 -> 1, (1', ..), 2, 3, N"으로 표현한다. 하나의 명세에서 첫 구현이 나오고, 변형 구현과 후속 버전이 같은 명세의 진화에서 계속 생성된다는 뜻이다. 개발 의도는 자연어, 디자인 자산, 핵심 원칙으로 표현되며(문서는 이를 intent-driven development라 부른다), 개발의 공용어가 더 높은 수준으로 올라가고 코드는 마지막 구간을 담당한다.

### 지금 SDD가 필요한 세 가지 이유

`spec-driven.md`는 SDD를 가능할 뿐 아니라 필요하게 만든 세 가지 흐름을 든다.

1. **AI 능력의 임계점**. 자연어 명세에서 동작하는 코드를 신뢰성 있게 생성할 수 있게 됐다. 문서는 이것이 개발자 대체가 아니라 명세에서 구현으로 가는 기계적 번역을 자동화해 개발자의 효과를 증폭하는 것이라고 강조한다. 탐색과 창의성을 넓히고 처음부터 다시 시작하기를 쉽게 만든다.
2. **복잡도의 증가**. 현대 시스템은 수십 개의 서비스, 프레임워크, 의존성을 통합한다. 이 조각들을 수작업으로 원래 의도와 맞춰 두기는 점점 어려워지고, SDD는 명세 기반 생성으로 체계적 정렬을 제공한다.
3. **변화 속도의 가속**. pivot이 예외가 아니라 일상이 됐다. 기존 개발에서 변경은 문서, 설계, 코드 전체에 수작업으로 전파해야 하는 방해 요소였고, 그 결과 속도를 제한하는 신중한 갱신이나 기술 부채를 쌓는 성급한 변경 중 하나를 택해야 했다. SDD에서 요구사항 변경은 수동 재작성이 아니라 체계적 재생성이 된다.

문서는 세 번째 이유의 예로 what-if 실험을 든다. "티셔츠를 더 팔기 위해 애플리케이션을 다시 구현하거나 바꿔야 한다면 어떻게 구현하고 실험할 것인가" 같은 질문을 명세 수정과 재생성으로 다룰 수 있다는 것이다.

## 핵심 개념

명세(specification)는 이 방법론에서 무엇을 왜 만드는지를 기술한 1차 산출물이다. user story, acceptance criteria, 비기능 요구사항을 담으며, 구현 기술(어떻게)은 의도적으로 배제한다. 코드는 이 명세를 특정 언어와 프레임워크로 표현한 결과물이다.

constitution은 명세가 코드가 되는 과정 전체를 지배하는 불변 원칙의 집합이다. `memory/constitution.md`에 9개 조항으로 적히며, 문서는 이를 시스템의 "아키텍처 DNA"라고 부른다. 계획과 구현은 모두 constitution을 준수해야 하고, 지키지 못하면 사유를 기록해야 한다.

convergence는 구현이 명세에 수렴했는지를 판정하는 단계다. README의 SDD 흐름은 `/speckit-converge`가 `Converged`를 보고할 때까지 구현과 수렴 판정을 반복하도록 안내한다.

gate는 계획 템플릿 안에 놓인 구현 전 점검표다. "프로젝트를 3개 이하로 쓰는가" 같은 질문에 답하지 못하면 LLM은 다음 단계로 넘어갈 수 없고, 예외를 두려면 정당화 사유를 문서에 남겨야 한다. 문서는 gate를 아키텍처 원칙에 대한 컴파일 타임 검사로 비유한다.

primitive는 소프트웨어 문맥에서 더 작은 단위로 나누지 않고 조합의 재료로 쓰는 기본 구성 요소다. Spec Kit의 integration, extension, preset, workflow, bundle, catalog가 primitive에 해당하며, 사용자는 이를 조합해 기존 프로세스를 고치거나 새 프로세스를 만든다.

## 방법

### 네 가지 진입점

Spec Kit은 네 가지 프로세스를 제공한다. README는 이들이 필수로 거쳐야 하는 단계가 아니라 독립된 진입점이라고 명시한다.

| 필요 | 프로세스 | 결과물 | 제공 형태 |
|---|---|---|---|
| 기능이나 애플리케이션 구축 | Spec-Driven Development | planning, 구현, convergence까지 이어지는 명세 | core에 포함 |
| 깨진 동작의 진단과 수리 | Bug fixing | 원인 평가, 범위를 한정한 수정, 기록된 검증 | 번들 extension (`bug`) |
| 아이디어에 투자할 가치 판단 | Idea assessment | 근거 기반 go, clarify, stop 결정 | 번들 extension (`assess`) |
| 다른 프로세스 도입이나 생성 | Your own process | 재사용 primitive로 조립한 프로세스 | 커스터마이징 primitive |

따라서 버그를 고치려는 사용자는 SDD 기능 워크플로를 먼저 거칠 필요가 없고, 아이디어를 평가하려는 사용자는 소스 코드가 없어도 된다.

### 설치와 프로젝트 생성

설치 요건은 Python 3.11 이상, uv, 지원되는 AI 코딩 에이전트이며 Linux, macOS, Windows에서 동작한다. README의 예시는 GitHub Copilot을 기준으로 한다.

```bash
uv tool install specify-cli
specify init my-project --integration copilot
cd my-project
```

`specify` CLI로 프로젝트를 만든 뒤 해당 디렉토리에서 코딩 에이전트를 실행하고 프로세스를 고른다. 고정 버전 설치, CI 환경, 기존 프로젝트 도입, 다른 에이전트의 integration 키는 외부 문서 사이트가 다룬다.

### SDD 최소 흐름

SDD 흐름은 터미널이 아니라 에이전트 채팅에서 실행한다. 각 스킬을 하나씩 실행하고 결과를 검토한 뒤 다음으로 넘어가는 것이 README의 안내다. constitution은 프로젝트당 한 번 만들고 나머지 단계는 기능마다 반복한다.

| 순서 | 스킬 | 역할 | README 예시 입력 |
|---|---|---|---|
| 1 | `/speckit-constitution` | 프로젝트 원칙 수립 | 코드 품질, 테스트, 유지보수성 중심 원칙 |
| 2 | `/speckit-specify` | 무엇을 왜 만드는지 기능 명세 작성 | 날짜별 앨범과 앨범별 타일 미리보기를 갖춘 사진 정리 앱 |
| 3 | `/speckit-plan` | 기술 스택과 아키텍처를 담은 구현 계획 | Vite와 vanilla JavaScript, 이미지는 로컬, 메타데이터는 SQLite |
| 4 | `/speckit-tasks` | 계획에서 실행 가능한 task 목록 도출 | 없음 |
| 5 | `/speckit-implement` | task 구현 | 없음 |
| 6 | `/speckit-converge` | 명세와 구현의 수렴 여부 판정 | 없음 |

예시 입력에서 역할 분리가 드러난다. specify 단계의 입력은 사용자 관점의 기능만 말하고, 기술 선택(Vite, SQLite)은 plan 단계에 가서야 등장한다. 이는 뒤에서 설명할 "구현 세부 조기 노출 방지" 템플릿 원칙과 같은 구조다.

implement와 converge는 converge가 `Converged`를 보고할 때까지 반복한다. clarification, checklist, 일관성 분석 같은 보조 단계는 별도 SDD walkthrough가 설명한다.

명령 표기는 에이전트마다 다르다. README는 GitHub Copilot의 기본 스킬 문법인 하이픈 표기(`/speckit-specify`)를 쓰고, `spec-driven.md`는 점 표기(`/speckit.specify`)를 쓴다. 다른 에이전트는 각자의 invocation 문법을 따른다.

### 세 핵심 명령의 세부 동작

`spec-driven.md`는 specify, plan, tasks 세 명령이 명세에서 계획을 거쳐 task로 가는 흐름을 자동화한다고 설명한다.

**`/speckit.specify`** 는 간단한 기능 설명을 구조화된 명세로 바꾸면서 저장소 관리까지 자동으로 처리한다.

- 기존 명세를 훑어 다음 기능 번호를 정한다 (001, 002, 003 순이며 3자리를 넘으면 자동으로 확장한다)
- 설명에서 의미 있는 브랜치 이름을 만들어 브랜치를 생성한다
- 기능 명세 템플릿을 복사해 요구사항으로 채운다
- 관련 문서를 담을 `specs/[branch-name]/` 디렉토리를 만든다

**`/speckit.plan`** 은 기능 명세가 있을 때 구현 계획을 만든다.

- 요구사항, user story, acceptance criteria를 읽고 분석한다
- constitution과 아키텍처 원칙을 준수하는지 확인한다
- 비즈니스 요구사항을 기술 아키텍처와 구현 세부로 번역한다
- 데이터 모델, API 계약, 테스트 시나리오 문서를 생성한다
- 핵심 검증 시나리오를 담은 quickstart 가이드를 작성한다

**`/speckit.tasks`** 는 계획과 설계 문서를 분석해 실행 가능한 task 목록을 만든다.

- `plan.md`를 필수로 읽고, 있으면 `data-model.md`, `contracts/`, `research.md`도 읽는다
- 계약, entity, 시나리오를 구체적인 task로 변환한다
- 서로 독립된 task에 `[P]`를 붙이고 안전하게 병렬 실행할 수 있는 그룹을 표시한다
- 기능 디렉토리에 `tasks.md`를 작성해 Task agent가 바로 실행할 수 있게 한다

### 채팅 기능 예시

문서는 실시간 채팅 기능을 예로 전통 방식과 SDD 명령 방식을 비교한다.

| 작업 | 전통 방식 소요 시간 |
|---|---|
| PRD 작성 | 2~3시간 |
| 설계 문서 작성 | 2~3시간 |
| 프로젝트 구조 수작업 설정 | 30분 |
| 기술 명세 작성 | 3~4시간 |
| 테스트 계획 작성 | 2시간 |
| 합계 | 약 12시간 |

SDD 방식에서는 specify("메시지 이력과 사용자 접속 상태를 갖춘 실시간 채팅"), plan("실시간 메시지는 WebSocket, 이력은 PostgreSQL, 접속 상태는 Redis"), tasks를 각 5분씩 실행해 약 15분이 걸린다고 문서는 제시한다. 결과로 `003-chat-system` 브랜치와 다음 파일이 생긴다.

| 파일 | 내용 |
|---|---|
| `specs/003-chat-system/spec.md` | 구조화된 요구사항 |
| `plan.md` | 기술 선택과 근거를 담은 구현 계획 |
| `research.md` | WebSocket 라이브러리 비교 |
| `data-model.md` | Message와 User 스키마 |
| `contracts/` | WebSocket 이벤트와 REST endpoint |
| `quickstart.md` | 핵심 검증 시나리오 |
| `tasks.md` | 계획에서 도출한 task 목록 |

이 시간 수치는 저자가 든 예시이며 측정 실험 결과가 아니다. 문서가 강조하는 요점은 시간 절감보다 일관성이다. 템플릿이 비기능 요구사항부터 오류 처리까지 빠짐없이 검토하게 하고, 모든 기술 선택이 특정 요구사항으로 연결되며, 명세가 코드를 생성하므로 문서와 코드가 어긋나지 않고, 요구사항을 바꾸면 계획을 몇 분 안에 다시 생성할 수 있다는 것이다.

### 템플릿이 LLM을 제약하는 방식

`spec-driven.md`는 명령의 진짜 힘이 자동화보다 템플릿이 LLM의 행동을 이끄는 방식에 있다고 설명한다. 템플릿은 LLM의 출력을 생산적인 방향으로 제한하는 정교한 프롬프트 역할을 한다. 문서가 드는 방식은 일곱 가지다.

| 번호 | 방식 | 템플릿의 지시 | 막는 실패 |
|---|---|---|---|
| 1 | 구현 세부 조기 노출 방지 | 사용자가 필요로 하는 WHAT과 WHY에 집중하고 HOW(기술 스택, API, 코드 구조)는 피하라 | "React와 Redux로 구현" 같은 조기 결정 |
| 2 | 불확실성 명시 강제 | 모호한 곳은 `[NEEDS CLARIFICATION: 구체적 질문]`으로 표시하고 추측하지 마라 | 그럴듯하지만 틀릴 수 있는 가정 |
| 3 | 체크리스트 기반 자가 검토 | 마커가 남지 않았는가, 요구사항이 테스트 가능한가, 성공 기준이 측정 가능한가 | 명세의 빈틈 누락 |
| 4 | gate를 통한 constitution 준수 | Phase -1 Simplicity Gate, Anti-Abstraction Gate | 과잉 설계 |
| 5 | 계층적 세부 관리 | 계획은 상위 수준으로 유지하고 코드 샘플과 상세 알고리즘은 `implementation-details/`로 분리하라 | 읽을 수 없는 코드 덤프형 명세 |
| 6 | test-first 사고 | `contracts/`를 먼저 만들고, 테스트를 contract, integration, e2e, unit 순으로 만든 뒤, 테스트를 통과시킬 소스를 만들어라 | 테스트 가능성을 뒤로 미루는 구현 |
| 7 | 추측성 기능 방지 | "있으면 좋을" 기능을 넣지 말고, 모든 phase에 선행 조건과 산출물을 명시하라 | user story에 근거 없는 기능 추가 |

첫 번째 방식은 명세의 안정성과 연결된다. LLM은 "React와 Redux로 구현한다"로 곧장 넘어가기 쉬운데, 템플릿은 이를 "사용자는 데이터의 실시간 갱신이 필요하다"는 수준에 머물게 한다. 따라서 구현 기술이 바뀌어도 명세는 그대로 유지된다.

두 번째 방식은 LLM의 흔한 습관인 그럴듯한 가정을 겨냥한다. 예를 들어 "로그인 시스템"이라는 요청을 받으면 LLM은 email/password 인증을 가정하기 쉽다. 템플릿은 대신 `[NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]`를 달게 하고, 세 번째 방식의 체크리스트가 이 마커가 하나도 남지 않았는지를 다시 확인한다. 문서는 체크리스트를 명세에 대한 "단위 테스트"에 비유한다.

네 번째 방식에서 gate를 통과하지 못하면 LLM은 계획 문서의 "Complexity Tracking" 절에 이유를 적어야 한다. 이 기록이 아키텍처 결정의 책임 소재를 남긴다. 다섯 번째 방식은 정보 구조를 강제해 주 문서는 탐색 가능하게 두고 복잡도는 별도 파일로 뺀다.

문서는 일곱 가지 제약이 합쳐져 명세가 다섯 가지 성질을 갖게 된다고 정리한다.

| 성질 | 만드는 요인 |
|---|---|
| Complete | 체크리스트가 누락을 막는다 |
| Unambiguous | 강제된 clarification 마커가 불확실성을 드러낸다 |
| Testable | test-first 사고가 프로세스에 내장된다 |
| Maintainable | 적절한 추상화 수준과 정보 계층 |
| Implementable | 구체적 산출물을 가진 명확한 phase |

문서의 표현으로는 템플릿이 LLM을 "창작자에서 규율 있는 명세 엔지니어로" 바꾼다.

### constitution의 9개 조항

constitution은 SDD의 기반이다. 명세가 코드가 되는 방식을 지배하는 불변 원칙으로, 생성되는 모든 구현이 일관성, 단순성, 품질을 유지하도록 보장한다.

| 조항 | 이름 | 내용 |
|---|---|---|
| I | Library-First | 모든 기능은 독립 라이브러리로 시작한다. 재사용 라이브러리로 추상화하지 않고 애플리케이션 코드에 바로 구현하지 않는다 |
| II | CLI Interface Mandate | 모든 라이브러리는 CLI로 기능을 노출한다. 텍스트 입력(stdin, 인자, 파일), 텍스트 출력(stdout), 구조화 데이터용 JSON 지원 |
| III | Test-First Imperative | 협상 불가 조항. 단위 테스트 작성, 사용자의 테스트 승인, 테스트 실패 확인(Red 단계) 전에는 구현 코드를 쓰지 않는다 |
| IV, V, VI | Project-Defined Governance | Spec Kit이 규정하지 않고 각 프로젝트가 채운다. 템플릿은 integration testing, observability, versioning, breaking change 같은 예시 자리만 둔다 |
| VII | Simplicity | 초기 구현은 프로젝트 최대 3개. 추가 프로젝트는 문서화된 정당화가 필요하다 (Section 7.3) |
| VIII | Anti-Abstraction | 프레임워크 기능을 감싸지 말고 직접 쓴다 (Section 8.1 Framework Trust). 단일 모델 표현 |
| IX | Integration-First Testing | 실제 환경 테스트 우선. mock보다 실제 DB, stub보다 실제 서비스 인스턴스를 쓰고 contract test는 구현 전에 필수다 |

조항 I과 II는 모듈성과 관찰 가능성을 겨냥한다. 모든 기능이 경계가 명확한 라이브러리가 되고, 모든 기능이 텍스트 인터페이스로 접근 가능하므로 LLM이 불투명한 클래스 안에 기능을 숨길 수 없다.

조항 III은 문서가 "가장 변혁적인 조항"이라 부르는 것이다. 코드를 먼저 생성하고 동작하기를 기대하는 기존 AI 코드 생성 방식과 달리, LLM은 동작을 정의하는 테스트를 먼저 만들고 사람의 승인을 받은 뒤에야 구현을 생성한다.

조항 IV~VI은 의도적으로 비워 둔 자리다. 9개 조항이라는 구조는 고정하면서 각 프로젝트가 자기 시스템과 조직에 맞는 협상 불가 표준을 넣게 한다. 예를 들어 한 프로젝트에서는 조항 IV가 보안과 접근 경계를, 다른 프로젝트에서는 integration test 요구사항을 다룰 수 있다. `/speckit.analyze` 명령은 프로젝트의 실제 constitution을 평가하므로 프로젝트가 정의한 조항도 내장 조항과 똑같이 준수 검사에 참여한다.

조항 VII과 VIII은 짝을 이뤄 과잉 설계를 막는다. LLM이 정교한 추상화를 만들고 싶어 할 때 이 두 조항이 모든 복잡도 층에 정당화를 요구한다.

### gate를 통한 조항 강제

계획 템플릿은 조항을 구체적 점검 항목으로 운영한다.

| gate | 근거 조항 | 점검 항목 |
|---|---|---|
| Simplicity Gate | VII | 프로젝트 3개 이하인가, future-proofing이 없는가 |
| Anti-Abstraction Gate | VIII | 프레임워크를 직접 쓰는가, 모델 표현이 하나인가 |
| Integration-First Gate | IX | 계약이 정의됐는가, contract test가 작성됐는가 |

LLM은 gate를 통과하거나 "Complexity Tracking" 절에 정당한 예외를 기록하기 전에는 진행할 수 없다.

### 불변 원칙과 개정

문서는 constitution의 힘이 불변성에 있다고 본다. 구현 세부는 진화해도 핵심 원칙은 그대로이므로 다음 네 가지가 보장된다.

1. **시간에 걸친 일관성**: 오늘 생성한 코드와 내년에 생성한 코드가 같은 원칙을 따른다
2. **LLM 간 일관성**: 서로 다른 AI 모델이 아키텍처상 호환되는 코드를 만든다
3. **아키텍처 무결성**: 모든 기능이 시스템 설계를 약화하지 않고 강화한다
4. **품질 보장**: test-first, library-first, 단순성 원칙이 유지보수 가능한 코드를 만든다

원칙은 불변이지만 적용 방식은 진화할 수 있다. 개정 절차(Section 4.2 Amendment Process)는 변경 근거의 명시적 문서화, 유지보수자의 검토와 승인, 하위 호환성 평가를 요구한다. constitution은 날짜가 붙은 개정 이력으로 실제 경험에 따라 원칙이 다듬어지는 과정을 기록한다.

constitution이 담은 개발 철학은 네 쌍으로 요약된다.

| 우선 | 대비 대상 | 의미 |
|---|---|---|
| Observability | Opacity | 모든 것을 CLI 인터페이스로 들여다볼 수 있어야 한다 |
| Simplicity | Cleverness | 단순하게 시작하고 필요가 증명될 때만 복잡도를 더한다 |
| Integration | Isolation | 인위적 환경이 아니라 실제 환경에서 테스트한다 |
| Modularity | Monoliths | 모든 기능은 경계가 명확한 라이브러리다 |

### 실제 SDD 워크플로

`spec-driven.md`는 명령 단위를 넘어 팀 차원의 워크플로도 그린다. 흐름은 다음과 같다.

1. **아이디어에서 PRD로**. 모호하고 불완전한 아이디어가 AI와의 반복 대화를 거쳐 PRD가 된다. AI는 clarification 질문을 던지고 edge case를 찾고 정밀한 acceptance criteria를 정의한다. 문서는 기존 개발에서 며칠의 회의와 문서 작업이 걸리던 일이 몇 시간의 명세 작업으로 줄어든다고 서술한다.
2. **팀 프로세스로서의 명세**. 명세는 팀이 검토하고 브랜치에서 버전 관리한 뒤 병합한다. product manager가 acceptance criteria를 바꾸면 구현 계획이 영향을 받는 기술 결정을 표시하고, architect가 더 나은 패턴을 찾으면 PRD가 그 가능성을 반영한다.
3. **research agent의 맥락 수집**. 명세 과정 내내 research agent가 라이브러리 호환성, 성능 벤치마크, 보안 영향을 조사한다. 회사의 DB 표준, 인증 요구사항, 배포 정책 같은 조직 제약도 명세에 반영된다.
4. **추적 가능한 계획**. PRD에서 생성된 구현 계획은 요구사항을 기술 결정에 대응시키고, 모든 기술 선택에 근거를 남긴다. 일관성 검증은 일회성 게이트가 아니라 지속적 개선으로 수행된다.
5. **완성 전 코드 생성**. 코드 생성은 명세가 "완성"됐을 때가 아니라 "충분히 안정"됐을 때 시작한다. 초기 생성은 명세가 실제로 말이 되는지 시험하는 탐색일 수 있다. 도메인 개념은 데이터 모델이, user story는 API endpoint가, acceptance scenario는 테스트가 된다. 즉 테스트 시나리오는 코드 뒤에 쓰는 것이 아니라 구현과 테스트를 함께 생성하는 명세의 일부다.
6. **운영에서 명세로의 피드백**. 운영 지표와 장애는 핫픽스로 끝나지 않고 다음 재생성을 위한 명세 갱신으로 이어진다. 성능 병목은 새 비기능 요구사항이, 보안 취약점은 이후 모든 생성에 영향을 주는 제약이 된다.

이 워크플로는 기존 SDLC의 요구사항과 설계를 분리된 단계가 아니라 지속적 활동으로 바꾼다. 문서가 정리한 SDD 핵심 원칙 여섯 가지는 이 흐름을 요약한 것이다.

| 원칙 | 내용 |
|---|---|
| Specifications as the Lingua Franca | 명세가 1차 산출물이고 코드는 특정 언어와 프레임워크로의 표현이다 |
| Executable Specifications | 명세는 동작하는 시스템을 생성할 만큼 정확하고 완전하며 모호하지 않아야 한다 |
| Continuous Refinement | AI가 명세의 모호성, 모순, 빈틈을 지속적으로 분석한다 |
| Research-Driven Context | research agent가 기술 선택지, 성능 영향, 조직 제약을 조사한다 |
| Bidirectional Feedback | 지표, 장애, 운영 경험이 명세 개선의 입력이 된다 |
| Branching for Exploration | 같은 명세에서 성능, 유지보수성, UX, 비용 등 다른 목표의 구현을 여러 개 생성한다 |

문서는 오늘날 SDD를 실천하려면 기존 도구를 조합하고 규율을 유지해야 한다고 덧붙인다. 반복적 명세 개발을 위한 AI 어시스턴트, research agent, 코드 생성 도구, 명세 우선 워크플로에 맞춘 버전 관리, AI 기반 일관성 검사가 그 구성 요소다. Spec Kit의 명령과 템플릿은 이 조합을 하나의 툴킷으로 묶은 것이다.

### 버그 수정 흐름

버그 수정은 `specify extension add bug`로 설치하는 extension이다. 원인을 평가하고 버그를 고친 뒤 원래 증상이 해소됐는지 검증하는 세 단계로 이뤄진다.

| 순서 | 스킬 | 역할 |
|---|---|---|
| 1 | `/speckit-bug-assess` | 증상 기술과 slug(예: `login-crash`)를 받아 원인 평가 |
| 2 | `/speckit-bug-fix` | 범위를 한정한 수정 |
| 3 | `/speckit-bug-test` | 원래 증상이 해소됐는지 검증 |

README 예시는 "빈 비밀번호를 제출하면 로그인 폼이 충돌한다"는 증상이다. 보고서는 `.specify/bugs/login-crash/`에 쌓이고 최종 판정은 `verified`, `partial`, `failed` 중 하나다. `verified`만 수정 성공을 뜻하므로, 부분 해결은 성공으로 기록되지 않는다.

### 아이디어 평가 흐름

아이디어 평가는 `specify extension add assess`로 설치한다. 소스 코드도 SDD 기능 워크플로도 필요 없다.

| 순서 | 스킬 | 단계 |
|---|---|---|
| 1 | `/speckit-assess-intake` | 아이디어 접수 |
| 2 | `/speckit-assess-research` | 근거 수집 |
| 3 | `/speckit-assess-define` | 문제 정의 |
| 4 | `/speckit-assess-shape` | 형태 구체화 |
| 5 | `/speckit-assess-decide` | 결정 |

README 예시 아이디어는 "사용자가 오프라인으로 작업하고 재연결 시 동기화하게 하자"이며 artifact는 `.specify/assessments/offline-mode/`에 남는다. 최종 결정은 `go`, `needs-clarification`, `kill` 중 하나다.

미해결 항목은 단계 전체를 다시 실행하지 않고 기존 Markdown artifact를 직접 또는 에이전트로 고쳐 해소한다. 소프트웨어 아이디어가 `go` 결정을 받으면 필요 시 constitution을 세운 뒤 `decision.md`의 handoff 요약을 `/speckit-specify`에 넘겨 SDD로 이어 간다. README는 근거를 남기고 멈추는 것도 유용한 결과라고 명시한다.

### 커스터마이징 primitive

Spec Kit은 제공 프로세스를 그대로 쓰는 것 외에 조합 가능한 메커니즘으로 프로세스를 고치거나 새로 만들게 한다.

| 필요 | 메커니즘 |
|---|---|
| 코딩 에이전트 연결이나 전환 | Integration |
| 명령, 품질 게이트, 프로세스 전체 추가 | Extension |
| 외부 도구나 서비스 연결 | Extension |
| 에이전트 lifecycle 이벤트에 반응 | Extension runtime event |
| Spec Kit 명령 전후에 extension 명령 실행 | Extension hook |
| 템플릿, 명령, 용어, 방법론 조정 | Preset |
| 조직이나 규제 표준 강제 | Preset |
| 한 프로젝트에서만 템플릿 교체 | Project-local override |
| 프롬프트, 명령, 게이트, 셸 작업 자동화 | Workflow |
| 설치된 workflow를 fork 없이 수정 | Workflow overlay |
| workflow에 재사용 실행 동작 추가 | Workflow step |
| 역할이나 팀 단위 구성 설치 | Bundle |
| 커뮤니티 구성 요소 탐색, 사설 카탈로그 운영 | Catalog |
| 사설 카탈로그와 다운로드 접근 | Authentication |
| 오프라인이나 방화벽 내부 사용 | Local sources, self-hosted catalog |
| 어느 층이 명령, 템플릿, 스크립트를 공급하는지 확인 | Artifact inventory |

README가 권하는 조합 방식은 다음과 같다.

- 기존 프로세스는 preset으로 조정한다. 예를 들어 plan에 규제 추적성을 요구하는 preset을 쓸 수 있고, 일회성 템플릿 변경은 project-local override로 처리한다
- 자체 프로세스는 extension으로 명령을 추가하고 integration으로 코딩 에이전트에 노출한다
- 명령과 점검은 workflow로 자동화하고, 설치된 workflow는 overlay로 fork 없이 고치며, 내장 타입으로 부족하면 custom workflow step을 더한다
- 재사용 구성은 extension, preset, workflow, workflow step을 bundle로 묶어 공유한다

README는 필요를 충족하는 가장 작은 변경부터 시작하라고 권하며 전체 프로세스를 갈아엎을 필요는 없다고 말한다. 카탈로그는 `specify extension search`, `specify preset search`, `specify workflow search`, `specify bundle search`로 검색한다. 조직은 자체 큐레이션 카탈로그를 더할 수 있다. 다만 카탈로그 등재는 감사나 보증이 아니므로 커뮤니티 소스 코드는 설치 전에 검토해야 한다.

## 결과

정량 벤치마크는 수집 범위에 없다. 저장소가 제시하는 수치와 판정 체계는 다음과 같다.

| 항목 | 값 | 성격 |
|---|---|---|
| 채팅 기능 문서 작업 시간 | 전통 방식 약 12시간, SDD 명령 방식 약 15분 | 저자 예시 |
| 저장소 star | 약 14.9만 개 (2026-11-12 기준) | 채택 지표 |
| 버그 수정 판정 | `verified`, `partial`, `failed` 3종 | 결과 형식 |
| 아이디어 평가 결정 | `go`, `needs-clarification`, `kill` 3종 | 결과 형식 |
| 초기 구현 프로젝트 상한 | 3개 (조항 VII) | 설계 규칙 |

시간 수치는 문서 작업만 비교한 예시이며 생성 코드의 품질이나 수렴까지 걸린 시간은 포함하지 않는다. Spec Kit의 주장은 측정된 성능보다 구조적 논리에 기대고 있다. 즉 템플릿과 constitution이 LLM의 출력 공간을 좁히면 결과가 더 일관되고 검증 가능해진다는 것이다.

README "In the news" 절은 외부 소개 다섯 건을 나열한다. Spec Kit 1.0과 확장 툴킷을 다룬 Open Source Friday 방송(2026-10-16), 진화하는 프로젝트에서 capability 단위 명세를 유지하는 living spec 글(2026-10-15), preset과 extension 작성을 다룬 커스터마이징 연재(2026-10-08~10), preset, extension, bundle, workflow, 관리형 카탈로그를 통한 enterprise 확장을 설명한 Microsoft 개발자 블로그 글(2026-10-07), SDD 시연을 담은 첫 Open Source Friday 방송(2026-05-08)이다.

## 한계

- **README의 얇은 본문**. README는 진입점 안내에 그치고 clarification, checklist, analyze 같은 세부 명령과 CLI 레퍼런스는 외부 문서 사이트에 있다. 이 페이지의 근거는 README와 `spec-driven.md` 두 파일이며 문서 사이트는 포함하지 않는다.
- **명령 표기의 세대 차**. `spec-driven.md`는 점 표기(`/speckit.specify`)와 specify, plan, tasks 세 명령 중심으로 쓰였고 README는 하이픈 표기와 implement, converge까지 포함한 흐름을 제시한다. 방법론 문서가 현재 CLI보다 앞선 시점의 서술을 담고 있을 수 있다.
- **정량 근거 부재**. 시간 절감 수치는 예시이고 생성 코드 품질, 수렴 성공률, 버그 수정 성공률 같은 측정 결과는 수집 범위에 없다.
- **커뮤니티 구성 요소의 신뢰**. README 스스로 카탈로그 등재가 감사나 보증이 아니라고 밝힌다. 따라서 extension과 preset을 도입하는 쪽이 코드 검토 책임을 진다.
- **프로세스 소유에 대한 비판**. [[agents/mattpocock-skills]]는 Spec-Kit을 GSD, BMAD와 함께 개발 프로세스를 통째로 소유해 사용자의 통제권을 가져가고 프로세스 자체의 문제를 고치기 어렵게 만드는 방법론의 예로 든다. Spec Kit은 독립 진입점, preset, extension, "가장 작은 변경부터"라는 권고로 이 비판에 대응하는 구조를 갖췄다.
- **고정 조항의 경직성**. constitution의 library-first, CLI 의무, 프로젝트 3개 상한은 문서가 불변 원칙으로 제시하지만, 이 원칙이 모든 유형의 프로젝트(예: UI 중심 앱)에 맞는지는 문서가 논증하지 않는다. 조항 IV~VI만 프로젝트가 채우는 자리로 열려 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Spec-Driven Development (SDD) | 명세를 진실의 원천으로 삼고 코드를 명세에서 생성되는 표현으로 다루는 개발 방법론 |
| constitution | `memory/constitution.md`에 적힌 프로젝트 불변 원칙 9개 조항. 모든 계획과 구현이 따라야 한다 |
| `[NEEDS CLARIFICATION]` | 명세 템플릿이 LLM에게 추측 대신 달도록 강제하는 불확실성 마커 |
| Phase -1 gate | 계획 템플릿의 구현 전 점검표. Simplicity, Anti-Abstraction, Integration-First 세 gate로 constitution 조항을 강제한다 |
| Complexity Tracking | gate를 통과하지 못한 복잡도를 정당화 사유와 함께 기록하는 계획 문서의 절 |
| convergence | 구현이 명세에 수렴했는지 판정하는 단계. `Converged`가 나올 때까지 implement와 반복한다 |

## 관련 페이지

- [[agents/mattpocock-skills]]: 코딩 에이전트의 요구 불일치 문제를 작고 교체 가능한 스킬로 푸는 대안. Spec-Kit을 프로세스 소유형 방법론의 예로 직접 언급한다
- [[agents/garrytan-gstack]]: 역할별 슬래시 커맨드로 개발을 스프린트 사이클로 구조화하는 Claude Code skill pack. 단계별 명령 체계라는 점에서 Spec Kit과 비교된다
- [[agents/google-2026-the-new-sdlc-with-vibe]]: AI 시대 SDLC 재편을 다루며 spec-driven development를 후속 편 주제로 예고한다
- [[etc/rahman-2026-a-practical-guide-to-becoming]]: AI-native 엔지니어링 실무 가이드로 spec-driven development를 함께 다룬다
