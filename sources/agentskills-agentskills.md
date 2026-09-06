---
title: "Agent Skills (agentskills/agentskills)"
type: repo
year: 2026
category: agents
raw_path: raw/repos/agentskills-agentskills.md
raw_filename: "agentskills-agentskills.md"
source_collection: external
org: "agentskills"
repo: "agentskills"
url: "https://github.com/agentskills/agentskills"
license: "Apache-2.0 (code) / CC-BY-4.0 (docs)"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, specification, ecosystem]
---

## 한 줄 요약 (One-line Summary)

Anthropic이 처음 개발한 Agent Skills 포맷을 벤더 중립 오픈 표준으로 공개한 저장소다. 스킬의 최소 규격인 `SKILL.md` 폴더와 progressive disclosure 3단계(discovery, activation, execution)를 정의하고, 스펙 본문과 예시는 외부로 넘긴 채 규격의 관문과 기여 창구 역할을 맡는다.

## 1. 자료 정보 (Document Information)

- **저장소**: `agentskills/agentskills` (GitHub).
- **표어**: "A standardized way to give AI agents new capabilities and expertise". AI 에이전트에 새 능력과 전문성을 부여하는 표준화된 방법이라는 뜻이다.
- **라이선스**: 저장소의 코드는 Apache-2.0, 문서는 CC-BY-4.0. README는 세부 조건이 디렉토리마다 다를 수 있으니 개별 디렉토리를 확인하라는 단서를 덧붙인다.
- **README 구성**: 포맷 정의, 폴더 레이아웃, 도입 근거, 로딩 3단계, 채택 현황, 진입 경로, 개발 방식, 라이선스 순이다. 상단에 Discord 배지가 있다.
- **문서 위치**: 가이드와 튜토리얼, 스펙 본문은 저장소가 아니라 [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]]로 안내한다.

## 2. 주요 기여 (Key Contributions)

1. **포맷의 벤더 중립 선언**: "originally developed by Anthropic, released as an open standard"로 적어, 특정 제품의 기능이 아니라 생태계 공통 규격임을 밝힌다. 채택 제품이 늘고 있다는 서술이 뒤따른다.
2. **최소 규격 명문화**: 스킬은 `SKILL.md` 파일 하나를 품은 폴더다. 이 파일은 메타데이터(최소 `name`과 `description`)와 에이전트가 특정 작업을 수행하는 방법을 알려주는 지시문(instructions)으로 이루어진다.
3. **번들 자원 규정**: 스킬은 scripts, reference materials, templates 같은 추가 자원을 함께 묶을 수 있고, 레이아웃에 적히지 않은 파일과 디렉토리도 허용한다.
4. **progressive disclosure 3단계 정의**: discovery, activation, execution으로 나누어 로드 시점을 늦추고 컨텍스트 사용량을 줄인다.
5. **기여와 공유 창구 구분**: 스펙 기여는 `CONTRIBUTING.md`로, 만든 결과의 공유는 Discord로 안내한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**문제 인식**: 에이전트의 능력은 계속 좋아지지만 실제 업무를 안정적으로 해내는 데 필요한 컨텍스트를 갖추지 못한 경우가 많다는 것이 README의 진단이다. 스킬은 절차 지식과 회사, 팀, 사용자 고유의 컨텍스트를 이식 가능하고(portable) 버전 관리되는(version-controlled) 폴더로 묶어, 에이전트가 필요할 때(on demand) 로드하게 하는 해법이다.

**표준 폴더 레이아웃**:

```
my-skill/
├── SKILL.md          # 필수: 메타데이터 + 지시문
├── scripts/          # 선택: 실행 코드
├── references/       # 선택: 문서
├── assets/           # 선택: 템플릿, 리소스
└── ...               # 그 밖의 파일과 디렉토리 자유
```

필수 제약은 `SKILL.md`의 존재 하나뿐이다. 세 하위 디렉토리는 권장 이름이며, 마지막 줄이 명시하듯 추가 파일과 디렉토리를 자유롭게 둘 수 있다.

**세 가지 가치**:

- **domain expertise**: 법무 검토 절차, 데이터 분석 파이프라인, 프레젠테이션 서식 같은 전문 지식을 재사용 가능한 지시문과 자원으로 담는다.
- **repeatable workflows**: 여러 단계로 이루어진 작업을 일관되고 감사 가능한(auditable) 절차로 바꾼다.
- **cross-product reuse**: 한 번 만든 스킬을 스킬 호환 에이전트 어디서나 쓴다.

**progressive disclosure 3단계**:

1. **discovery**: 시작 시점에 사용 가능한 각 스킬의 `name`과 `description`만 로드한다. 그 스킬이 언제 관련될 수 있는지 알기에 딱 필요한 만큼이다.
2. **activation**: 작업이 스킬의 `description`과 맞으면 해당 `SKILL.md`의 지시문 전체를 컨텍스트로 읽어 들인다.
3. **execution**: 지시문을 따르면서 필요에 따라 번들된 코드를 실행하거나 참조 파일을 로드한다. 이 단계의 파일 로드는 선택적이다.

전체 지시문은 작업이 요구할 때만 로드되므로, 많은 스킬을 갖춰 두고도 컨텍스트 사용량은 작게 유지된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

스펙 저장소라 벤치마크나 성능 수치가 없다. README가 제시하는 근거는 채택 폭이다. 많은 수의 AI 도구와 agentic client가 Agent Skills를 지원한다고 밝히고, 구체적 목록은 Client Showcase 페이지(`agentskills.io/clients`)로 넘긴다.

Getting started 절은 네 개의 입구를 제시한다. Documentation(`agentskills.io`)은 가이드와 튜토리얼, Specification(`agentskills.io/specification`)은 포맷 세부, Example Skills(`github.com/anthropics/skills`)는 실제 예시, Discord는 공유 커뮤니티를 맡는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **README 범위의 한계**: 스펙 버전 번호, 호환성 정책, 필드의 상세 문법을 본문에 적지 않고 agentskills.io의 Specification 페이지로 넘긴다.
- **예시의 외부화**: 동작하는 스킬 예시는 이 저장소가 아니라 `anthropics/skills` 저장소에 있다.
- **채택 근거의 성격**: 지원 클라이언트가 많다는 진술과 목록 페이지 링크뿐이라, 클라이언트별 구현 충실도나 상호 호환 수준을 판단할 자료가 없다.

## 6. 관련 연구 (Related Work)

- [[agents/anthropic-2025-equipping-agents-for-the-real|Anthropic 발표글]]: 이 포맷의 설계 근거와 도식 원전.
- [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]]: README가 안내하는 공식 문서 사이트로, Client Showcase를 포함한다.
- [[agents/mattpocock-skills|mattpocock/skills]]: 이 규격을 따라 만든 실무 스킬 모음 저장소.

## 7. 용어집 (Glossary)

- **Agent Skills**: 이 저장소가 정의하는 포맷의 이름. 스킬 폴더 규격과 로딩 방식을 함께 가리킨다.
- **`SKILL.md`**: 스킬 폴더에 반드시 있어야 하는 파일. 메타데이터와 지시문을 담는다.
- **Discovery / Activation / Execution**: progressive disclosure의 3단계.
- **Client Showcase**: 포맷을 지원하는 클라이언트를 모아 보여주는 agentskills.io의 페이지.
- **Open standard**: 특정 벤더에 종속되지 않고 외부 기여로 다듬어지는 규격.
