---
title: "Agent Skills (agentskills/agentskills)"
type: repo
year: 2026
category: agents
source: agentskills-agentskills.md
raw_path: raw/repos/agentskills-agentskills.md
raw_filename: "agentskills-agentskills.md"
source_collection: external
org: "agentskills"
repo: "agentskills"
url: "https://github.com/agentskills/agentskills"
license: "Apache-2.0 (code) / CC-BY-4.0 (docs)"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, specification, ecosystem]
---

## 요약

`agentskills/agentskills`는 Agent Skills 포맷을 벤더 중립 오픈 표준으로 공개한 GitHub 저장소다. README는 이 포맷을 "AI 에이전트에 새 능력과 전문성을 부여하는 표준화된 방법"으로 소개한다.

규격이 정하는 것은 두 가지다. 하나는 스킬이 무엇으로 이루어지는지를 정하는 폴더 규격이고, 다른 하나는 그 스킬을 언제 얼마나 읽어 들일지를 정하는 progressive disclosure 3단계다. progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계를 뜻한다.

이 저장소의 성격은 구현체가 아니라 규약이라는 점에 있다. README는 포맷 정의와 로딩 방식을 밝힌 뒤, 가이드와 스펙 본문, 지원 클라이언트 목록, 예시 스킬을 모두 외부 링크로 넘긴다. 스펙과 문서는 [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]]가, 예시 스킬은 `anthropics/skills` 저장소가 맡는다.

포맷은 Anthropic이 처음 개발했지만 오픈 표준으로 공개되었고, 저장소는 외부 기여를 받는 구조를 갖췄다. 배포 조건은 대상에 따라 갈라져, 코드는 Apache-2.0, 문서는 CC-BY-4.0을 따른다.

## 배경

README가 출발점으로 삼는 진단은 에이전트의 능력과 컨텍스트 사이의 격차다. 에이전트의 능력은 계속 좋아지고 있지만, 실제 업무를 안정적으로 해내는 데 필요한 컨텍스트를 갖추지 못한 경우가 많다는 것이다.

여기서 말하는 컨텍스트는 두 종류다. 하나는 작업을 어떤 순서로 어떻게 처리하는지에 대한 절차 지식이고, 다른 하나는 회사와 팀과 사용자마다 다른 고유한 사정이다. 두 가지 모두 모델을 학습시킨 일반 데이터에는 들어 있지 않다.

스킬은 이 두 종류의 컨텍스트를 폴더 하나로 묶어 해결한다. 스킬은 특정 작업 절차를 담아 에이전트가 불러 쓰는 지침 패키지를 뜻한다. README는 이 폴더가 갖춰야 할 성질로 이식 가능성(portable), 버전 관리 가능성(version-controlled), 그리고 필요할 때 로드된다는 점(on demand)을 든다. 폴더와 텍스트 파일로 이루어져 있으므로 git으로 이력을 관리할 수 있고, 다른 프로젝트나 다른 에이전트로 그대로 옮길 수 있다.

## 핵심 개념

### 스킬의 최소 단위

스킬은 `SKILL.md` 파일 하나를 품은 폴더다. 이 한 문장이 규격의 필수 요구 전부이고, 그 밖의 것은 모두 선택 사항이다.

`SKILL.md`는 두 부분으로 이루어진다. 앞부분은 메타데이터로, 최소한 `name`과 `description` 두 항목을 담아야 한다. 뒷부분은 에이전트가 특정 작업을 어떻게 수행할지 알려주는 지시문(instructions)이다.

`description`은 단순한 설명문이 아니라 로딩 동작을 좌우하는 항목이다. 뒤에서 볼 3단계 로딩에서 에이전트는 이 필드만 읽고 지금 작업에 이 스킬이 필요한지 판단하기 때문이다. 따라서 `description`을 어떻게 쓰느냐가 스킬이 제때 발동하는지를 결정한다.

### 폴더 레이아웃

README가 제시하는 표준 레이아웃은 다음과 같다.

```
my-skill/
├── SKILL.md          # 필수: 메타데이터 + 지시문
├── scripts/          # 선택: 실행 코드
├── references/       # 선택: 문서
├── assets/           # 선택: 템플릿, 리소스
└── ...               # 그 밖의 파일과 디렉토리
```

| 구성 요소 | 필수 여부 | 담는 것 |
|---|---|---|
| `SKILL.md` | 필수 | 메타데이터(`name`, `description`)와 지시문 |
| `scripts/` | 선택 | 실행 가능한 코드 |
| `references/` | 선택 | 참고 문서 |
| `assets/` | 선택 | 템플릿과 그 밖의 리소스 |
| 그 밖의 경로 | 선택 | 추가 파일과 디렉토리를 자유롭게 둘 수 있다 |

레이아웃의 마지막 줄이 규격의 개방성을 보여준다. 세 하위 디렉토리는 권장되는 이름일 뿐이고, 스킬 폴더에 어떤 파일이나 디렉토리를 더 두어도 규격 위반이 아니다. 즉 제약은 `SKILL.md`의 존재 하나로 최소화되어 있고, 나머지는 스킬 제작자의 판단에 열려 있다.

이 개방성이 다음 절의 로딩 방식과 짝을 이룬다. 자원을 얼마든지 번들할 수 있어도 컨텍스트가 넘치지 않는 이유는, 번들된 자원이 처음부터 다 읽히지 않기 때문이다.

## 방법

### 로딩 3단계

에이전트는 progressive disclosure를 통해 스킬을 세 단계로 나누어 읽는다. 단계마다 읽는 시점과 읽는 대상이 다르고, 그에 따라 컨텍스트 부담도 달라진다.

| 단계 | 시점 | 읽는 대상 | 컨텍스트 부담 |
|---|---|---|---|
| discovery | 시작 시점 | 사용 가능한 모든 스킬의 `name`과 `description` | 스킬 개수에 비례하되 항목당 매우 작다 |
| activation | 작업이 스킬의 `description`과 맞을 때 | 해당 `SKILL.md`의 지시문 전체 | 발동한 스킬 하나 분량 |
| execution | 지시문을 수행하는 동안 | 번들된 코드의 실행과 참조 파일 | 실제로 필요한 파일만큼, 선택적 |

discovery는 에이전트가 시작하는 시점에 일어난다. 이때 읽는 것은 각 스킬의 이름과 설명뿐인데, README는 그 분량을 "언제 관련될 수 있는지 알기에 딱 필요한 만큼"으로 규정한다.

activation은 작업이 어떤 스킬의 `description`과 맞아떨어질 때 일어난다. 그 시점에 에이전트가 `SKILL.md`의 지시문 전체를 컨텍스트로 읽어 들인다. 즉 지시문 본문은 discovery 단계에서는 한 글자도 로드되지 않는다.

execution은 지시문을 실제로 따르는 단계다. 이 단계에서 번들된 코드를 실행하거나 참조 파일을 읽는 일은 필요에 따라 선택적으로 일어난다. 따라서 스킬에 `scripts/`나 `references/`가 들어 있어도 활성화될 때마다 전부 읽히는 것은 아니다.

### 컨텍스트 사용량이 줄어드는 원리

3단계 분리가 노리는 효과는 스킬 보유량과 컨텍스트 사용량을 떼어놓는 것이다. 전체 지시문은 작업이 실제로 그것을 요구할 때만 로드되기 때문이다.

그 결과 에이전트는 많은 스킬을 갖춰 두고도 작은 컨텍스트 사용량만 유지한다. 스킬을 여러 개 등록해도 상시로 읽히는 것은 그 개수만큼의 이름과 설명뿐이고, 지시문 본문은 그중 실제로 발동한 스킬의 것만 들어온다.

이 구조가 확장 방식 자체를 바꾼다. 스킬을 늘리는 비용이 지시문 전체가 아니라 요약 한 줄이므로, 능력을 추가하는 일과 컨텍스트를 소모하는 일이 분리된다.

### 스킬이 제공하는 세 가지 가치

README는 스킬이 에이전트에 주는 것을 세 가지로 정리한다.

| 가치 | 내용 | README가 든 예 |
|---|---|---|
| domain expertise | 전문 지식을 재사용 가능한 지시문과 자원으로 담는다 | 법무 검토 절차, 데이터 분석 파이프라인, 프레젠테이션 서식 |
| repeatable workflows | 여러 단계로 이루어진 작업을 일관되고 감사 가능한 절차로 바꾼다 | 명시하지 않음 |
| cross-product reuse | 한 번 만든 스킬을 스킬 호환 에이전트 어디서나 쓴다 | 명시하지 않음 |

세 가치는 각각 다른 문제를 겨냥한다. domain expertise는 모델이 갖추지 못한 전문 영역의 지식을, repeatable workflows는 같은 작업을 매번 다르게 처리하는 불안정성을, cross-product reuse는 도구를 바꿀 때마다 같은 설정을 다시 만드는 중복을 겨냥한다.

repeatable workflows의 서술에는 감사 가능(auditable)이라는 조건이 붙는다. 절차가 파일로 고정되어 있으면 에이전트가 무엇을 근거로 어떤 순서를 밟았는지 사후에 확인할 수 있다는 뜻이다.

domain expertise 항목이 든 세 예시는 이 포맷이 겨냥하는 범위를 보여준다. 법무 검토 절차와 데이터 분석 파이프라인과 프레젠테이션 서식은 서로 다른 직군의 일이지만, 절차가 정해져 있고 그 절차를 문서로 적을 수 있다는 공통점을 가진다.

## 생태계

### 채택 현황

README는 Agent Skills가 많은 수의 AI 도구와 agentic client에서 지원된다고 밝힌다. 다만 본문에 목록을 싣지 않고 Client Showcase 페이지(`agentskills.io/clients`)로 넘긴다.

포맷의 내력도 한 문장으로 적는다. Agent Skills 포맷은 Anthropic이 처음 개발했고, 오픈 표준으로 공개되었으며, 점점 늘어나는 에이전트 제품에 채택되었다는 세 단계 서술이다. 특정 벤더의 제품 기능이 아니라 여러 제품이 공유하는 규격이라는 위치를 이 문장이 규정한다.

### 진입 경로

Getting started 절은 네 개의 입구를 제시하고, 각각을 서로 다른 목적에 배정한다.

| 경로 | 위치 | 용도 |
|---|---|---|
| Documentation | `agentskills.io` | 가이드와 튜토리얼 |
| Specification | `agentskills.io/specification` | 포맷 세부 규격 |
| Example Skills | `github.com/anthropics/skills` | 만들 수 있는 것의 실제 예 |
| Discord | 초대 링크 | 만든 결과를 공유하는 커뮤니티 |

네 경로의 배치가 이 저장소의 역할을 그대로 드러낸다. 스펙 본문과 예시 스킬이 모두 저장소 밖에 있으므로, `agentskills/agentskills`는 규격을 읽으러 오는 사람의 관문이자 규격에 기여하려는 사람의 창구를 맡는다.

## 개발 방식과 라이선스

표준의 개발은 외부 기여를 전제로 한다. README는 이 표준이 더 넓은 생태계의 기여에 열려 있다고 적고, 참여 방법을 `CONTRIBUTING.md`로 안내한다.

기여와 공유의 창구는 구분되어 있다. 스펙에 대한 기여는 `CONTRIBUTING.md`가 정하는 절차를 따르고, 자신이 만든 스킬을 알리는 일은 Discord에서 한다. README 상단에 Discord 배지가 놓인 것도 이 커뮤니티 채널의 비중을 보여준다.

라이선스는 대상에 따라 둘로 나뉜다.

| 대상 | 라이선스 | 근거 |
|---|---|---|
| 저장소의 코드 | Apache-2.0 | 저장소 루트의 `LICENSE` 파일 |
| 문서 | CC-BY-4.0 | Creative Commons 라이선스 페이지 링크 |

README는 여기에 단서를 하나 덧붙인다. 세부는 개별 디렉토리를 확인하라는 안내로, 디렉토리마다 적용 조건이 다를 수 있다는 뜻이다. 이 저장소의 내용을 인용하거나 재배포할 때는 대상이 코드인지 문서인지, 그리고 해당 디렉토리에 별도 명시가 있는지를 먼저 확인해야 한다.

## 한계

README 하나로는 규격의 세부를 알 수 없다. 스펙 버전 번호, 호환성 정책, 필드의 상세 문법이 본문에 없고 모두 agentskills.io의 Specification 페이지로 넘어간다. 따라서 이 페이지의 서술도 규격의 관문까지만 다룬다.

예시가 외부에 있다는 점도 같은 성격의 제약이다. 동작하는 스킬은 `anthropics/skills` 저장소에 있으므로, 규격을 읽고 곧바로 따라 만들려면 저장소를 하나 더 열어야 한다.

채택 근거의 성격에도 한계가 있다. README가 제시하는 것은 지원 클라이언트가 많다는 진술과 목록 페이지 링크뿐이다. 클라이언트마다 구현을 얼마나 충실히 했는지, 서로 얼마나 호환되는지를 판단할 자료는 들어 있지 않다.

성능 수치는 없다. 스펙 저장소이므로 벤치마크가 실리지 않으며, 포맷의 효과는 채택 폭이라는 간접 지표로만 서술된다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Agent Skills | 이 저장소가 정의하는 포맷의 이름. 스킬 폴더 규격과 로딩 방식을 함께 가리킨다 |
| `SKILL.md` | 스킬 폴더에 반드시 있어야 하는 파일. 메타데이터와 지시문을 담는다 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. 여기서는 3단계 로딩을 가리킨다 |
| discovery | 시작 시점에 각 스킬의 `name`과 `description`만 읽는 단계 |
| activation | 작업이 `description`과 맞을 때 `SKILL.md` 지시문 전체를 읽는 단계 |
| execution | 지시문을 따르며 번들된 코드나 참조 파일을 필요에 따라 읽는 단계 |

## 관련 페이지

- [[agents/anthropic-2025-equipping-agents-for-the-real]]: 같은 포맷의 설계 근거를 도식과 함께 밝힌 Anthropic 발표글
- [[agents/agentskills-io-2026-agent-skills-overview]]: README가 스펙과 가이드의 위치로 안내하는 공식 문서 사이트. Client Showcase를 포함한다
- [[overviews/agent-skills-overview]]: 이 저장소와 발표글, 공식 사이트를 묶어 정리한 개괄 페이지
- [[agents/mattpocock-skills]]: 이 규격을 따라 만든 실무 스킬 모음 저장소
