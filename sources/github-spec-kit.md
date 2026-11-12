---
title: "Spec Kit"
type: repo
year: 2025
category: agents
raw_path: raw/repos/github-spec-kit.md
raw_filename: "github-spec-kit.md"
source_collection: external
org: "github"
repo: "spec-kit"
url: "https://github.com/github/spec-kit"
license: "MIT"
tags: [spec-driven-development, coding-agent, slash-commands, constitution, template-driven-prompting, github]
---

## 한 줄 요약 (One-line Summary)

Spec Kit은 GitHub이 공개한 MIT 라이선스 툴킷으로, 코딩 에이전트에게 정해진 프로세스와 재사용 템플릿을 주어 명세(specification)를 진실의 원천(source of truth)으로 삼고 코드를 그 명세에서 생성되는 산출물로 다루는 spec-driven development(SDD)를 실행하게 한다.

## 1. 자료 정보 (Document Information)

- **저장소**: [github/spec-kit](https://github.com/github/spec-kit), 라이선스 MIT
- **규모**: star 약 14.9만 개, 2025-08-21 생성, 최종 push 2026-11-11 (2026-11-12 수집 시점 기준)
- **수집 범위**: 최상위 `README.md`와, README가 "full methodology"로 링크하는 repo 내 문서 `spec-driven.md` 두 파일의 원문
- **설치 요건**: Python 3.11 이상, uv, 지원되는 AI 코딩 에이전트. Linux, macOS, Windows에서 동작한다
- **CLI**: `uv tool install specify-cli`로 `specify` CLI를 설치하고 `specify init my-project --integration copilot`처럼 프로젝트를 만든다. README 예시는 GitHub Copilot 기준이다
- **언어판**: README는 영어, 简体中文, 日本語, 한국어 네 가지로 제공된다
- **외부 소개**: README "In the news" 절은 Spec Kit 1.0과 확장 툴킷을 다룬 Open Source Friday 방송(2026-10-16), Microsoft 개발자 블로그의 enterprise 확장 글(2026-10-07) 등 다섯 건을 나열한다

## 2. 주요 기여 (Key Contributions)

1. **명세와 코드의 권력 역전**. 수십 년간 명세는 코드를 위한 발판이었고 코딩이 시작되면 버려졌다. SDD는 이 관계를 뒤집어 코드가 명세를 섬기게 한다. PRD는 구현의 안내서가 아니라 구현을 생성하는 원천이 된다.
2. **네 가지 독립 진입점**. 기능 구축(SDD), 버그 수정, 아이디어 평가, 사용자 정의 프로세스를 각각 독립된 진입점으로 제공한다. SDD는 core에 포함되고 버그 수정과 아이디어 평가는 필요할 때 설치하는 번들 extension이다.
3. **템플릿을 이용한 LLM 출력 제약**. 템플릿을 정교한 프롬프트로 설계해 구현 세부의 조기 노출, 추측, 과잉 설계 같은 LLM의 흔한 실패를 구조적으로 막는다. `[NEEDS CLARIFICATION]` 마커, 체크리스트, phase gate가 그 수단이다.
4. **constitution 기반 아키텍처 규율**. `memory/constitution.md`에 9개 조항(Article)을 두어 생성되는 모든 구현이 library-first, test-first, 단순성 원칙을 따르게 한다.
5. **조합 가능한 커스터마이징 primitive**. integration, extension, preset, workflow, bundle, catalog 같은 primitive로 기존 프로세스를 고치거나 자체 프로세스를 조립할 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 프로세스 선택표

| 필요 | 프로세스 | 결과물 |
|---|---|---|
| 기능이나 애플리케이션 구축 | Spec-Driven Development | planning, 구현, convergence까지 이어지는 명세 |
| 깨진 동작의 진단과 수리 | Bug fixing | 원인 평가, 범위를 한정한 수정, 기록된 검증 |
| 아이디어에 투자할 가치 판단 | Idea assessment | 근거 기반 go, clarify, stop 결정 |
| 다른 프로세스 도입이나 생성 | Your own process | 재사용 primitive로 조립한 프로세스 |

README는 이 넷이 필수 단계가 아니라 독립된 진입점이라고 명시한다.

### 3.2 SDD 최소 흐름

constitution은 프로젝트당 한 번 만들고 나머지 단계는 기능마다 반복한다. 각 스킬은 터미널이 아니라 에이전트 채팅에서 하나씩 실행하고 결과를 검토한 뒤 다음으로 넘어간다.

| 순서 | 스킬 | 역할 |
|---|---|---|
| 1 | `/speckit-constitution` | 코드 품질, 테스트, 유지보수성 같은 프로젝트 원칙 수립 |
| 2 | `/speckit-specify` | 무엇을 왜 만드는지 기능 명세 작성 |
| 3 | `/speckit-plan` | 기술 스택과 아키텍처를 담은 구현 계획 |
| 4 | `/speckit-tasks` | 계획에서 실행 가능한 task 목록 도출 |
| 5 | `/speckit-implement` | task 구현 |
| 6 | `/speckit-converge` | 명세와 구현의 수렴 여부 판정 |

implement와 converge는 converge가 `Converged`를 보고할 때까지 반복한다. clarification, checklist, 일관성 분석은 별도 walkthrough가 다룬다. README 예시 입력은 "날짜별 앨범과 타일 미리보기를 갖춘 사진 정리 앱"(specify), "Vite와 vanilla JavaScript, 이미지는 로컬, 메타데이터는 SQLite"(plan)이다.

`spec-driven.md`는 같은 명령을 `/speckit.specify`처럼 점 표기로 적는다. README는 Copilot의 기본 스킬 문법(하이픈)을 쓰고, 다른 에이전트는 각자의 invocation 문법을 따른다고 안내한다.

### 3.3 버그 수정 흐름

`specify extension add bug`로 설치한다. SDD 기능 워크플로를 먼저 거칠 필요가 없다.

| 순서 | 스킬 | 역할 |
|---|---|---|
| 1 | `/speckit-bug-assess` | 증상 기술과 slug로 원인 평가 |
| 2 | `/speckit-bug-fix` | 수정 |
| 3 | `/speckit-bug-test` | 원래 증상이 해소됐는지 검증 |

보고서는 `.specify/bugs/{slug}/`에 쌓인다. 최종 판정은 `verified`, `partial`, `failed` 중 하나이며 `verified`만 수정 성공을 뜻한다.

### 3.4 아이디어 평가 흐름

`specify extension add assess`로 설치하며 소스 코드가 없어도 된다. intake, research, define, shape, decide 다섯 단계 스킬(`/speckit-assess-*`)을 차례로 실행한다. artifact는 `.specify/assessments/{slug}/`에 남고 최종 결정은 `go`, `needs-clarification`, `kill` 중 하나다. 미해결 항목은 단계 전체를 다시 돌리지 않고 기존 Markdown artifact를 직접 고쳐 해소한다. `go` 결정을 받은 소프트웨어 아이디어는 `decision.md`의 handoff 요약을 `/speckit-specify`에 넘겨 SDD로 이어 간다. 근거를 남기고 멈추는 것도 유용한 결과로 본다.

### 3.5 커스터마이징 primitive

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
| 사설 카탈로그 접근 | Authentication |
| 오프라인, 방화벽 내부 사용 | Local sources, self-hosted catalog |
| 어느 층이 명령, 템플릿, 스크립트를 공급하는지 확인 | Artifact inventory |

`specify extension search`, `specify preset search`, `specify workflow search`, `specify bundle search`로 카탈로그를 검색한다. README는 카탈로그 등재가 감사나 보증이 아니므로 커뮤니티 소스 코드를 설치 전에 검토하라고 경고한다. 커스터마이징은 필요를 충족하는 가장 작은 변경부터 시작하라고 권한다(예: plan에 규제 추적성을 요구하는 preset).

### 3.6 SDD 방법론 (spec-driven.md)

**권력 역전.** 명세와 구현 사이의 간극은 소프트웨어 개발 초기부터 있었고, 더 나은 문서와 엄격한 절차는 그 간극을 좁힐 뿐 없애지 못했다. SDD는 명세와 명세에서 나온 구현 계획을 실행 가능하게 만들어 간극을 없앤다. AI가 복잡한 명세를 이해하고 구현할 수 있게 되면서 가능해졌지만, 구조 없는 AI 생성은 혼란을 낳으므로 SDD가 그 구조를 제공한다. 유지보수는 명세를 진화시키는 일이 되고, 디버깅은 잘못된 코드를 낳은 명세와 계획을 고치는 일이 된다. 문서는 이를 "0 -> 1, (1', ..), 2, 3, N" 과정으로 표현한다.

**실제 워크플로.** 모호한 아이디어가 AI와의 반복 대화로 PRD가 되고, AI는 clarification 질문, edge case 식별, acceptance criteria 정의를 돕는다. 명세는 팀이 검토하고 브랜치에서 버전 관리한 뒤 병합한다. research agent가 라이브러리 호환성, 성능 벤치마크, 보안 영향을 조사하고 조직 제약(DB 표준, 인증 요구, 배포 정책)을 반영한다. 코드 생성은 명세가 "완성"이 아니라 "충분히 안정"될 때 시작한다. 도메인 개념은 데이터 모델이, user story는 API endpoint가, acceptance scenario는 테스트가 된다. 운영 지표와 장애는 다음 재생성을 위한 명세 갱신으로 이어진다(성능 병목은 비기능 요구사항, 보안 취약점은 제약 조건).

**지금 필요한 이유 세 가지.**

1. AI 능력이 자연어 명세에서 동작하는 코드를 신뢰성 있게 생성하는 수준에 도달했다.
2. 소프트웨어 복잡도가 기하급수적으로 커져 수작업으로 원래 의도와 정렬을 유지하기 어렵다.
3. 변화 속도가 빨라져 pivot이 예외가 아니라 일상이 됐다. SDD에서 pivot은 수동 재작성이 아니라 체계적 재생성이다.

**핵심 원칙 여섯 가지.**

| 원칙 | 내용 |
|---|---|
| Specifications as the Lingua Franca | 명세가 1차 산출물이고 코드는 특정 언어와 프레임워크로의 표현이다 |
| Executable Specifications | 명세는 동작하는 시스템을 생성할 만큼 정확하고 완전하며 모호하지 않아야 한다 |
| Continuous Refinement | 일관성 검증을 일회성 게이트가 아니라 지속적 과정으로 수행한다 |
| Research-Driven Context | research agent가 명세 과정 내내 기술 선택지와 조직 제약을 조사한다 |
| Bidirectional Feedback | 운영 현실이 명세 진화의 입력이 된다 |
| Branching for Exploration | 같은 명세에서 성능, 유지보수성, UX, 비용 등 다른 목표의 구현을 여러 개 생성한다 |

### 3.7 세 명령의 세부 동작 (spec-driven.md)

| 명령 | 세부 동작 |
|---|---|
| `/speckit.specify` | 기존 명세를 훑어 다음 기능 번호 결정(001, 002, ... 3자리를 넘으면 자동 확장), 설명에서 의미 있는 브랜치 이름을 만들어 생성, 기능 명세 템플릿 복사와 채움, `specs/[branch-name]/` 디렉토리 생성 |
| `/speckit.plan` | 요구사항, user story, acceptance criteria 분석, constitution 준수 확인, 비즈니스 요구를 기술 아키텍처로 번역, 데이터 모델, API 계약, 테스트 시나리오 문서 생성, quickstart 검증 가이드 작성 |
| `/speckit.tasks` | `plan.md`(필수)와 있으면 `data-model.md`, `contracts/`, `research.md`를 읽어 계약, entity, 시나리오를 task로 변환하고, 독립 task에 `[P]`를 붙여 병렬 그룹을 표시한 뒤 `tasks.md` 작성 |

채팅 기능 예시에서 문서는 전통 방식의 문서 작업을 약 12시간(PRD 2~3시간, 설계 문서 2~3시간, 프로젝트 구조 30분, 기술 명세 3~4시간, 테스트 계획 2시간)으로, SDD 명령 방식을 명령당 5분씩 약 15분으로 제시한다. 예시 산출물은 `specs/003-chat-system/` 아래 `spec.md`, `plan.md`, `research.md`(WebSocket 라이브러리 비교), `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`다. 이 시간 수치는 저자가 든 예시이며 측정 실험이 아니다.

### 3.8 템플릿이 LLM을 제약하는 일곱 가지 방식 (spec-driven.md)

| 번호 | 방식 | 템플릿 내용 | 막는 실패 |
|---|---|---|---|
| 1 | 구현 세부 조기 노출 방지 | WHAT과 WHY에 집중하고 HOW(기술 스택, API, 코드 구조)는 피하라 | "React와 Redux로 구현" 같은 조기 결정 |
| 2 | 불확실성 명시 강제 | 모호한 곳은 `[NEEDS CLARIFICATION: 구체적 질문]`으로 표시하고 추측하지 마라 | 그럴듯하지만 틀릴 수 있는 가정(로그인을 email/password로 단정 등) |
| 3 | 체크리스트 기반 구조적 사고 | 마커가 남지 않았는가, 요구사항이 테스트 가능한가, 성공 기준이 측정 가능한가 | 자가 검토 누락 |
| 4 | gate를 통한 constitution 준수 | Phase -1 Simplicity Gate(프로젝트 3개 이하, future-proofing 없음), Anti-Abstraction Gate | 과잉 설계. gate 실패 시 "Complexity Tracking" 절에 사유 기록 |
| 5 | 계층적 세부 관리 | 계획은 상위 수준으로 유지하고 코드 샘플과 상세 알고리즘은 `implementation-details/`로 분리 | 읽을 수 없는 코드 덤프형 명세 |
| 6 | test-first 사고 | 파일 생성 순서: `contracts/`, 테스트(contract, integration, e2e, unit 순), 그다음 소스 | 테스트 가능성을 뒤로 미루는 구현 |
| 7 | 추측성 기능 방지 | "있으면 좋을" 기능 금지, 모든 phase에 선행 조건과 산출물 명시 | user story에 근거 없는 기능 추가 |

문서는 이 제약이 합쳐져 명세가 완전하고, 모호하지 않으며, 테스트 가능하고, 유지보수 가능하며, 구현 가능해진다고 정리한다. 템플릿이 LLM을 "창작자에서 규율 있는 명세 엔지니어로" 바꾼다는 것이 문서의 표현이다.

### 3.9 constitution의 9개 조항 (spec-driven.md)

| 조항 | 이름 | 내용 |
|---|---|---|
| I | Library-First | 모든 기능은 독립 라이브러리로 시작한다. 애플리케이션 코드에 바로 구현하지 않는다 |
| II | CLI Interface Mandate | 모든 라이브러리는 CLI로 기능을 노출한다. 텍스트 입력(stdin, 인자, 파일), 텍스트 출력(stdout), JSON 지원 |
| III | Test-First Imperative | 협상 불가. 단위 테스트 작성, 사용자 승인, 실패 확인(Red) 전에는 구현 코드를 쓰지 않는다 |
| IV, V, VI | Project-Defined Governance | Spec Kit이 규정하지 않고 프로젝트가 채운다. 템플릿은 integration testing, observability, versioning, breaking change 같은 예시 자리만 둔다 |
| VII | Simplicity | 초기 구현은 프로젝트 최대 3개, 추가는 문서화된 정당화 필요 |
| VIII | Anti-Abstraction | 프레임워크를 감싸지 말고 직접 쓴다. 단일 모델 표현 |
| IX | Integration-First Testing | 실제 환경 테스트 우선. mock보다 실제 DB, stub보다 실제 서비스 인스턴스, 구현 전 contract test 필수 |

`/speckit.analyze` 명령은 프로젝트의 실제 constitution을 평가하므로 프로젝트가 정의한 IV~VI 조항도 준수 검사에 참여한다. 계획 템플릿은 Phase -1 gate로 VII, VIII, IX 조항을 컴파일 타임 검사처럼 운영한다(Integration-First Gate: 계약 정의 여부, contract test 작성 여부).

문서는 불변 원칙이 주는 이점을 네 가지로 든다. 시간에 걸친 일관성, 서로 다른 LLM 사이의 일관성, 아키텍처 무결성, 품질 보장이다. 원칙 자체는 불변이지만 적용 방식은 진화할 수 있으며, 개정에는 변경 근거 문서화, 유지보수자 검토와 승인, 하위 호환성 평가가 필요하다(Section 4.2 Amendment Process). constitution은 날짜가 붙은 개정 이력으로 자신의 진화를 기록한다.

constitution이 담은 철학은 네 쌍으로 요약된다. Observability over Opacity, Simplicity over Cleverness, Integration over Isolation, Modularity over Monoliths.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 수집 범위에 있는 수치는 다음뿐이다.

- 채팅 기능 예시의 문서 작업 시간: 전통 방식 약 12시간 대 SDD 명령 방식 약 15분 (저자 예시)
- 저장소 star 약 14.9만 개 (2026-11-12 기준)
- 버그 수정 판정 3종(`verified`, `partial`, `failed`), 아이디어 평가 결정 3종(`go`, `needs-clarification`, `kill`)

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **README의 얇은 본문**. README는 진입점 안내에 그치고 clarification, checklist, analyze 같은 세부 명령과 CLI 레퍼런스는 외부 문서 사이트(github.github.io/spec-kit)에 있다. 이 수집본은 문서 사이트를 포함하지 않는다.
- **명령 표기의 세대 차**. `spec-driven.md`는 `/speckit.specify`처럼 점 표기와 specify, plan, tasks 세 명령 중심으로 쓰였고, README는 하이픈 표기와 implement, converge까지 포함한 흐름을 제시한다. 방법론 문서가 최신 CLI보다 앞선 시점의 서술을 담고 있을 수 있다.
- **정량 근거 부재**. 시간 절감 수치는 예시이고 생성 코드 품질이나 수렴 성공률 같은 측정 결과는 수집 범위에 없다.
- **커뮤니티 구성 요소의 신뢰 문제**. README 스스로 카탈로그 등재가 감사나 보증이 아니라고 밝힌다.
- **프로세스 소유에 대한 비판**. 이 wiki의 [[agents/mattpocock-skills]]는 Spec-Kit을 GSD, BMAD와 함께 프로세스를 통째로 소유해 사용자의 통제권을 가져가는 방법론의 예로 든다. Spec Kit은 preset, extension, 작은 변경부터 시작하라는 권고로 이 문제에 대응한다.

## 6. 관련 연구 (Related Work)

- [[agents/mattpocock-skills]]: 같은 문제(코딩 에이전트의 요구 불일치)를 작고 교체 가능한 스킬로 푸는 대안. Spec-Kit을 직접 비교 대상으로 언급한다
- [[agents/garrytan-gstack]]: 역할별 슬래시 커맨드로 개발을 스프린트 사이클로 구조화하는 Claude Code skill pack
- [[agents/google-2026-the-new-sdlc-with-vibe]]: AI 시대 SDLC 재편을 다루며 spec-driven development를 후속 편 주제로 예고한다
- [[etc/rahman-2026-a-practical-guide-to-becoming]]: AI-native 엔지니어링 가이드로 spec-driven development를 다룬다

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Spec-Driven Development (SDD) | 명세를 진실의 원천으로 삼고 코드를 명세에서 생성되는 표현으로 다루는 개발 방법론 |
| constitution | `memory/constitution.md`에 적힌 프로젝트 불변 원칙 9개 조항. 모든 계획과 구현이 따라야 한다 |
| `[NEEDS CLARIFICATION]` | 명세 템플릿이 LLM에게 추측 대신 달도록 강제하는 불확실성 마커 |
| Phase -1 gate | 계획 템플릿의 구현 전 점검표. Simplicity, Anti-Abstraction, Integration-First 세 gate로 constitution 조항을 강제한다 |
| Complexity Tracking | gate를 통과하지 못한 복잡도를 정당화 사유와 함께 기록하는 계획 문서의 절 |
| convergence | 구현이 명세에 수렴했는지 판정하는 단계. `/speckit-converge`가 `Converged`를 보고할 때까지 implement와 반복한다 |
| preset | 템플릿, 명령, 용어, 방법론을 조정하거나 조직 표준을 강제하는 커스터마이징 단위 |
| extension | 명령, 품질 게이트, 프로세스 전체를 추가하는 확장 단위. 버그 수정(`bug`)과 아이디어 평가(`assess`)도 extension이다 |
| bundle | extension, preset, workflow, workflow step을 역할이나 팀 단위로 묶은 배포 단위 |
