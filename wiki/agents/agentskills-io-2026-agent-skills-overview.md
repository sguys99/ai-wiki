---
title: "Agent Skills Overview (agentskills.io)"
type: article
year: 2026
category: agents
source: agentskills-io-2026-agent-skills-overview.md
raw_path: raw/articles/agentskills-io-2026-agent-skills-overview.md
raw_filename: "agentskills-io-2026-agent-skills-overview.md"
source_collection: external
author: "Agent Skills community"
url: "https://agentskills.io/home"
publisher: "agentskills.io"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, ecosystem, client-showcase]
---

## 요약

agentskills.io는 Agent Skills 오픈 표준의 공식 문서 사이트이고, 이 페이지는 그 첫 화면이다. 사이트는 스스로를 "AI 에이전트에 새 능력과 전문성을 부여하는 표준화된 방법"으로 소개한다.

첫 화면은 여섯 절로 짜여 있다. 포맷이 무엇인지(What), 왜 필요한지(Why), 어떻게 동작하는지(How), 어디에서 쓸 수 있는지(Where), 표준을 어떻게 운영하는지(Open development), 무엇부터 읽어야 하는지(Get started)를 차례로 답한다.

이 페이지만의 고유한 정보는 Client Showcase다. Agent Skills 포맷을 지원하는 클라이언트 42개를 로고 캐러셀로 한자리에 나열해, 포맷이 특정 벤더의 확장 규격을 넘어 업계 공통 규격으로 퍼졌음을 보여준다. 포맷 정의와 로딩 모델은 규격 문서가 담당하고, 이 페이지는 그 관문 역할을 한다.

## 배경

사이트가 스킬을 도입해야 하는 이유로 드는 문제는 컨텍스트의 부재다. 에이전트는 점점 유능해지지만, 실제 업무를 안정적으로 처리하는 데 필요한 컨텍스트를 갖추지 못한 경우가 많다는 것이다.

여기서 말하는 컨텍스트는 모델의 일반 지식이 아니라 특정 조직에만 있는 지식이다. 회사의 법무 검토 절차, 팀이 쓰는 데이터 분석 파이프라인, 사용자가 정한 프레젠테이션 서식이 그런 예다. 모두 학습 데이터에 없고 매번 사람이 알려줘야 하는 종류다.

스킬은 이 지식을 폴더 하나로 묶어 문제를 해결한다. 절차적 지식과 조직 고유의 컨텍스트를 이식 가능하고 버전 관리되는 폴더에 담고, 에이전트가 필요한 시점에 불러오게 한다.

사이트가 폴더에 붙인 두 수식이 이 방식의 성격을 규정한다. 이식 가능하다는 것은 폴더를 그대로 옮기면 다른 에이전트에서도 같은 절차가 동작한다는 뜻이다. 버전 관리된다는 것은 절차의 변경 이력이 파일 단위로 남는다는 뜻이다. 프롬프트를 매번 대화에 다시 적어 넣는 방식과 다른 점이 여기에 있다.

## 핵심 개념

스킬은 특정 작업 절차를 담아 에이전트가 불러 쓰는 지침 패키지다. 사이트는 이것을 "lightweight, open format"으로 규정한다. 무거운 플러그인 규격이 아니라 파일과 폴더만으로 이뤄진 가벼운 포맷이라는 뜻이다.

스킬 하나의 실체는 `SKILL.md` 파일을 담은 폴더다. 이 파일에는 최소한 `name`과 `description` 메타데이터가 들어가고, 에이전트가 그 작업을 어떻게 수행할지 알려주는 지시문이 이어진다.

한 파일이 성격이 다른 두 가지를 함께 담는다는 점이 포맷의 뼈대다. 메타데이터는 에이전트가 이 스킬을 언제 쓸지 판단하는 데 쓰이고, 지시문은 쓰기로 결정한 뒤 따라야 할 절차를 담는다. 뒤에 나오는 로딩 3단계가 바로 이 구분 위에서 동작한다.

progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. Agent Skills는 이 설계를 스킬 로딩에 적용해, 에이전트가 스킬을 많이 갖추고도 컨텍스트 점유를 작게 유지하도록 만든다.

## 방법

### 스킬 폴더의 구조

필수 요소는 `SKILL.md` 하나뿐이고 나머지는 모두 선택이다. 사이트가 제시하는 레이아웃은 다음과 같다.

| 경로 | 필수 여부 | 담는 것 |
|---|---|---|
| `SKILL.md` | 필수 | 메타데이터와 지시문 |
| `scripts/` | 선택 | 실행 가능한 코드 |
| `references/` | 선택 | 문서 |
| `assets/` | 선택 | 템플릿과 자원 |
| 그 밖의 경로 | 선택 | 추가 파일과 디렉토리를 자유롭게 둘 수 있다 |

이 구조가 뜻하는 바는 스킬이 지시문만 담는 그릇이 아니라는 것이다. 스크립트, 레퍼런스 문서, 템플릿을 함께 묶을 수 있으므로, 에이전트는 지시문을 읽는 데 그치지 않고 폴더 안의 코드를 실행하거나 참조 문서를 추가로 읽을 수 있다.

### 스킬이 제공하는 세 가지

사이트는 스킬을 도입해 얻는 것을 세 항목으로 정리한다.

| 항목 | 사이트가 든 예 | 얻는 것 |
|---|---|---|
| 도메인 전문성(domain expertise) | 법무 검토 절차, 데이터 분석 파이프라인, 프레젠테이션 서식 | 전문 지식을 재사용 가능한 지시문과 자원으로 담는다 |
| 반복 가능한 워크플로(repeatable workflows) | 여러 단계로 이뤄진 작업 | 일관되고 감사 가능한 절차로 바꾼다 |
| 제품 간 재사용(cross-product reuse) | 한 번 만든 스킬 | 스킬 호환 에이전트 어디에서나 쓸 수 있다 |

세 항목 가운데 표준으로서의 성격이 가장 뚜렷한 것은 제품 간 재사용이다. 앞의 두 항목은 프롬프트 템플릿이나 사내 문서로도 어느 정도 달성할 수 있다. 반면 스킬 하나를 여러 벤더의 에이전트에서 그대로 쓰는 것은 포맷이 공통일 때만 가능하다.

### progressive disclosure 3단계

에이전트는 스킬 전체를 한 번에 읽지 않고 세 단계에 걸쳐 나눠 읽는다.

| 단계 | 시점 | 컨텍스트에 올라오는 것 |
|---|---|---|
| Discovery | 에이전트 시작 시점 | 각 스킬의 `name`과 `description`만 |
| Activation | 작업이 스킬의 description과 맞을 때 | `SKILL.md` 지시문 전문 |
| Execution | 지시문을 실행하는 동안 | 번들된 코드의 실행 결과와 참조 파일 가운데 필요한 것만 |

Discovery 단계가 읽는 양은 의도적으로 최소한이다. 사이트의 표현을 빌리면 "언제 이 스킬이 필요할지 알 만큼만" 담는다. 따라서 스킬이 열 개든 백 개든 시작 시점의 부담은 이름과 설명 길이의 합으로 제한된다.

Activation은 작업이 스킬의 description과 맞아떨어질 때 일어난다. 즉 description이 두 가지 역할을 겸한다. Discovery 단계에서는 후보를 좁히는 색인이고, Activation 단계에서는 전문을 읽어들일지 결정하는 조건이다.

Execution 단계에서는 지시문을 따르면서 필요에 따라 번들된 코드를 실행하거나 참조 파일을 추가로 불러온다. 앞의 레이아웃에서 선택 항목이던 `scripts/`와 `references/`가 이 시점에 쓰인다.

이 설계가 노리는 결과는 컨텍스트 점유의 절약이다. 전체 지시문은 작업이 요구할 때만 올라오므로, 에이전트는 많은 스킬을 갖추고도 컨텍스트 점유를 작게 유지한다.

## 채택 현황

### 나열된 클라이언트

사이트는 로고 캐러셀(LogoCarousel) 컴포넌트로 클라이언트 42개를 나열한다. 목록은 다음과 같고, 괄호는 사이트가 함께 표기한 제공 주체다.

Junie(JetBrains), Gemini CLI(Google), Autohand Code CLI, OpenCode, OpenHands, Mux(Coder), Cursor, Amp, Letta, Firebender, Goose(Block), GitHub Copilot, VS Code, Claude Code, Claude, OpenAI Codex, Piebald, Factory, pi, Databricks Genie Code, Agentman, TRAE(ByteDance), Spring AI, Roo Code, Mistral AI Vibe, Command Code, Ona, VT Code, Qodo, Laravel Boost, Emdash, Snowflake Cortex Code, Kiro, Workshop, Google AI Edge Gallery, nanobot, fast-agent, bub, Tabnine, Vita, Superconductor, Deep Code.

이 42개가 전체 채택 규모는 아니다. 사이트가 "including"으로 목록을 열어 두었기 때문에 나열된 것은 발췌다. 사이트는 각 클라이언트가 자체 스킬 문서를 따로 갖고 있다고도 밝힌다. 즉 파일 포맷은 공통이지만, 그 포맷을 어떻게 읽어들이는지는 클라이언트마다 자기 문서에서 안내한다.

### 경쟁 벤더의 공존

목록의 의미는 개수가 아니라 구성에 있다. 서로 경쟁하는 회사들의 제품이 같은 목록에 함께 들어 있다.

| 벤더 | 목록에 오른 클라이언트 |
|---|---|
| Anthropic | Claude, Claude Code |
| Google | Gemini CLI, Google AI Edge Gallery |
| Microsoft | GitHub Copilot, VS Code |
| OpenAI | Codex |
| JetBrains | Junie |
| Mistral AI | Vibe |
| ByteDance | TRAE |
| Block | Goose |
| Coder | Mux |
| Databricks | Genie Code |
| Snowflake | Cortex Code |

포맷을 만든 곳은 Anthropic이다. 그런데도 OpenAI, Google, Microsoft, Mistral AI처럼 기반 모델 시장에서 직접 경쟁하는 회사들이 같은 포맷을 지원한다. 특정 벤더의 확장 규격이 아니라 업계 공통 규격으로 자리 잡아 가는 신호로 볼 수 있다.

### 적용 범위

목록에 오른 클라이언트의 성격은 한 가지가 아니다. 코딩 에이전트 CLI와 IDE 계열이 다수를 차지하지만, 성격이 다른 도구도 섞여 있다.

- 데이터 플랫폼의 코딩 도구: Databricks Genie Code, Snowflake Cortex Code
- 애플리케이션 프레임워크 도구: Spring AI, Laravel Boost
- 엣지 환경 도구: Google AI Edge Gallery

같은 포맷이 IDE와 데이터 플랫폼, 프레임워크 도구에 함께 적용된다는 것은 포맷이 특정 실행 환경을 전제하지 않는다는 뜻이다. `SKILL.md`가 마크다운 파일 하나이고 나머지 구성 요소가 모두 선택이기 때문에 가능한 결과다.

## 표준 운영과 진입점

포맷의 출발점은 Anthropic이지만 소유권은 한 회사에 묶여 있지 않다. 사이트는 포맷을 Anthropic이 처음 개발했고 오픈 표준으로 공개했으며, 채택하는 에이전트 제품이 계속 늘고 있다고 적는다.

표준은 생태계 전반의 기여를 받는다. 논의 창구는 GitHub 저장소 `agentskills/agentskills`와 Discord 두 곳이다.

첫 화면은 규격 전문을 담지 않고 두 문서로 넘긴다.

| 문서 | 경로 | 내용 |
|---|---|---|
| Quickstart | `/skill-creation/quickstart` | 첫 스킬을 만들어 동작을 확인하는 실습 |
| Specification | `/specification` | Agent Skills의 완전한 포맷 규격 |

두 문서는 독자가 다르다. Quickstart는 스킬을 만들어 쓰려는 사용자가 첫 스킬을 완성해 보는 실습 경로이고, Specification은 포맷을 구현하거나 규격을 정확히 확인해야 하는 쪽이 참조하는 문서다.

이 분리 때문에 홈에서 확인할 수 있는 규격은 `name`과 `description`이 최소 메타데이터라는 사실까지다. 그 밖의 메타데이터 키나 제약 조건을 알아야 하면 Specification 페이지를 봐야 한다.

## 한계

쇼케이스가 전하는 것은 채택했다는 사실뿐이다. 클라이언트마다 포맷을 얼마나 충실히 구현했는지, 한 클라이언트에서 만든 스킬이 다른 클라이언트에서 그대로 동작하는지는 이 페이지가 검증하지 않는다. 사이트가 각 클라이언트마다 자체 문서가 있다고 안내하는 것은 구현 세부가 서로 다를 수 있다는 뜻이기도 하다.

목록 자체도 한정적이다. 사이트가 "including"으로 목록을 열어 두었으므로 42개는 채택 규모의 하한이다.

생태계 목록은 빠르게 바뀐다. 따라서 이 페이지는 ingest 시점의 상태를 기록한 스냅샷으로 봐야 한다.

기여 절차는 적혀 있지 않다. 표준이 생태계의 기여를 받는다고만 밝히고, 제안이 어떤 과정을 거쳐 규격에 반영되는지는 다루지 않는다. 창구로 GitHub와 Discord를 제시하는 데서 그친다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| 스킬 | 특정 작업 절차를 담아 에이전트가 불러 쓰는 지침 패키지. 실체는 `SKILL.md`를 담은 폴더다 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. 여기서는 Discovery, Activation, Execution 3단계로 구현된다 |
| Client Showcase | 스킬 포맷을 지원하는 도구를 로고로 나열한 사이트 섹션 |
| LogoCarousel | Client Showcase를 구현한 사이트 컴포넌트 이름 |
| cross-vendor 표준 | 서로 경쟁하는 여러 벤더가 공통으로 채택한 규격 |
| skills-compatible agent | 스킬 포맷을 읽어 실행할 수 있는 에이전트. 사이트가 제품 간 재사용의 조건으로 드는 표현이다 |

## 관련 페이지

- [[agents/agentskills-agentskills]]: 사이트가 논의 창구로 지목하는 표준 저장소. 같은 포맷 정의와 라이선스 정보를 담는다
- [[agents/anthropic-2025-equipping-agents-for-the-real]]: 포맷을 처음 공개한 Anthropic의 발표글. 설계 의도와 도식이 있다
- [[agents/osmani-2026-agent-skills]]: 스킬을 실제 개발 절차에 적용한 사례. 포맷이 아니라 스킬에 무엇을 담을지를 다룬다
- [[agents/mattpocock-skills]]: 코딩 에이전트용 스킬 25개를 묶은 실사용 저장소
