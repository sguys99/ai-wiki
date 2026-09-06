---
title: "Agent Skills Overview (agentskills.io)"
type: article
year: 2026
category: agents
raw_path: raw/articles/agentskills-io-2026-agent-skills-overview.md
raw_filename: "agentskills-io-2026-agent-skills-overview.md"
source_collection: external
author: "Agent Skills community"
url: "https://agentskills.io/home"
publisher: "agentskills.io"
tags: [agent-skills, open-standard, skill-md, progressive-disclosure, ecosystem, client-showcase]
---

## 한 줄 요약 (One-line Summary)

Agent Skills 오픈 표준의 공식 문서 사이트 홈이다. 포맷 정의, 도입 이유, progressive disclosure 3단계, 표준 운영 방식, 시작 가이드 진입점을 한 화면에 담는다. 42개 클라이언트를 나열한 Client Showcase가 이 자료만의 고유 정보다.

## 1. 자료 정보 (Document Information)

- **출처**: agentskills.io/home. Agent Skills 오픈 표준의 공식 문서 사이트 첫 화면이다.
- **부제**: "A standardized way to give AI agents new capabilities and expertise."
- **구성**: 여섯 절로 나뉜다. What(포맷 정의), Why(도입 이유), How(로딩 모델), Where(Client Showcase), Open development(표준 운영), Get started(진입점).
- **성격**: 개념 소개와 채택 현황 전시를 겸한 소비자용 관문이다. 완전한 규격은 별도 Specification 페이지가 담당한다.

## 2. 주요 기여 (Key Contributions)

1. **개념과 규격의 관문**: 스킬이 무엇이고 왜 필요하며 어떻게 동작하는지를 한 화면에 정리하고, 실습은 Quickstart로 규격은 Specification으로 넘긴다.
2. **Client Showcase**: 42개 클라이언트를 로고 캐러셀(LogoCarousel)로 한자리에 모아 채택 폭을 보여준다. 이 자료만의 가치다. 사이트는 각 클라이언트가 자체 스킬 문서를 따로 갖고 있다고 밝힌다.
3. **경쟁 벤더의 공존 확인**: OpenAI Codex, Google Gemini CLI, Mistral AI Vibe, Microsoft의 GitHub Copilot과 VS Code, JetBrains Junie가 Anthropic이 만든 포맷을 함께 지원한다. 벤더 종속 없는 표준화 신호다.
4. **표준 운영 방식 명시**: 포맷을 Anthropic이 처음 개발했고 오픈 표준으로 공개했으며 생태계 전반의 기여를 받는다고 적는다. 논의 창구는 GitHub 저장소 agentskills/agentskills와 Discord다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 포맷 정의

스킬 하나는 `SKILL.md` 파일을 담은 폴더다. `SKILL.md`는 최소한 `name`과 `description` 메타데이터를 갖고, 에이전트가 특정 작업을 수행하는 방법을 지시문으로 담는다. 폴더에는 스크립트, 레퍼런스 문서, 템플릿을 비롯한 자원을 함께 묶을 수 있다. 사이트는 포맷을 "lightweight, open format"으로 규정한다.

사이트가 제시하는 폴더 레이아웃은 다음과 같다.

- `SKILL.md`: 필수. 메타데이터와 지시문.
- `scripts/`: 선택. 실행 가능한 코드.
- `references/`: 선택. 문서.
- `assets/`: 선택. 템플릿과 자원.
- 그 밖의 파일과 디렉토리를 자유롭게 추가할 수 있다.

### 도입 이유

사이트는 문제를 이렇게 규정한다. 에이전트는 점점 유능해지지만, 실제 업무를 안정적으로 처리하는 데 필요한 컨텍스트를 갖추지 못한 경우가 많다. 스킬은 절차적 지식과 회사, 팀, 사용자 고유의 컨텍스트를 이식 가능하고 버전 관리되는 폴더로 묶어 에이전트가 필요할 때 불러오게 한다. 사이트가 드는 이점은 세 가지다.

- **도메인 전문성(domain expertise)**: 법무 검토 절차, 데이터 분석 파이프라인, 프레젠테이션 서식을 예로 든다. 이런 전문 지식을 재사용 가능한 지시문과 자원으로 담는다.
- **반복 가능한 워크플로(repeatable workflows)**: 여러 단계로 이뤄진 작업을 일관되고 감사 가능한 절차로 바꾼다.
- **제품 간 재사용(cross-product reuse)**: 스킬을 한 번 만들면 스킬 호환 에이전트 어디에서나 쓸 수 있다.

### 로딩 모델

에이전트는 progressive disclosure로 스킬을 세 단계에 걸쳐 불러온다.

1. **Discovery**: 시작 시점에 각 스킬의 `name`과 `description`만 읽는다. 언제 이 스킬이 필요할지 판단할 만큼만 담는다.
2. **Activation**: 작업이 스킬의 description과 맞으면 `SKILL.md` 지시문 전문을 컨텍스트로 읽어들인다.
3. **Execution**: 지시문을 따라 실행하며, 필요에 따라 번들된 코드를 실행하거나 참조 파일을 추가로 불러온다.

전체 지시문은 작업이 요구할 때만 컨텍스트에 올라온다. 따라서 에이전트는 많은 스킬을 갖추고도 컨텍스트 점유를 작게 유지한다.

### 채택 생태계

사이트가 나열한 42개 클라이언트는 다음과 같다. 괄호는 사이트가 함께 표기한 제공 주체다.

Junie(JetBrains), Gemini CLI(Google), Autohand Code CLI, OpenCode, OpenHands, Mux(Coder), Cursor, Amp, Letta, Firebender, Goose(Block), GitHub Copilot, VS Code, Claude Code, Claude, OpenAI Codex, Piebald, Factory, pi, Databricks Genie Code, Agentman, TRAE(ByteDance), Spring AI, Roo Code, Mistral AI Vibe, Command Code, Ona, VT Code, Qodo, Laravel Boost, Emdash, Snowflake Cortex Code, Kiro, Workshop, Google AI Edge Gallery, nanobot, fast-agent, bub, Tabnine, Vita, Superconductor, Deep Code.

사이트는 이 목록이 전체가 아니라 발췌("including")라고 밝힌다.

### 진입점

- **Quickstart** (`/skill-creation/quickstart`): 첫 스킬을 만들어 동작을 확인하는 실습 문서.
- **Specification** (`/specification`): Agent Skills의 완전한 포맷 규격.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크는 없다. 이 자료에서 지표 역할을 하는 것은 채택 규모다.

목록에 이름이 오른 42개 클라이언트는 성격이 서로 다르다. 코딩 에이전트 CLI와 IDE 계열(Cursor, VS Code, Junie)이 다수이지만, 데이터 플랫폼의 코딩 도구(Databricks Genie Code, Snowflake Cortex Code)와 애플리케이션 프레임워크 도구(Spring AI, Laravel Boost)도 함께 들어 있다.

사이트가 벤더를 함께 표기한 항목만 모으면 Google, Microsoft, OpenAI, JetBrains, Mistral AI, ByteDance, Block, Coder, Databricks, Snowflake, Anthropic이 한 목록에 들어간다. 서로 경쟁하는 회사들이 같은 파일 포맷을 지원한다는 점이 이 목록의 의미다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **채택 사실만 보여주는 목록**: 쇼케이스는 각 클라이언트가 포맷을 지원한다는 사실만 전한다. 구현 충실도나 클라이언트 사이의 상호운용성은 검증하지 않는다. 사이트도 각 클라이언트가 자체 문서를 갖는다고만 안내한다.
- **발췌 목록**: 사이트 스스로 목록을 "including"으로 한정한다. 42개는 전체 채택 규모가 아니다.
- **스냅샷**: 생태계 목록은 빠르게 바뀐다. 이 source는 ingest 시점의 상태를 기록한 것이다.
- **규격 세부의 부재**: 홈은 `name`과 `description`이 최소 메타데이터라는 사실까지만 다룬다. 나머지 규격은 별도 Specification 페이지가 담당한다.
- **기여 절차 미기술**: 생태계의 기여를 받는다고 밝히지만, 제안이 어떤 절차로 규격에 반영되는지는 적지 않는다. 창구로 GitHub와 Discord를 제시하는 데서 그친다.

## 6. 관련 연구 (Related Work)

- [[agents/agentskills-agentskills|agentskills/agentskills]]: 사이트가 논의 창구로 지목하는 GitHub 저장소.
- [[agents/anthropic-2025-equipping-agents-for-the-real|Anthropic 발표글]]: 포맷 설계 원전.

## 7. 용어집 (Glossary)

- **Client Showcase**: 스킬 포맷을 지원하는 도구를 로고로 나열한 사이트 섹션.
- **LogoCarousel**: Client Showcase를 구현한 사이트 컴포넌트 이름.
- **cross-vendor 표준**: 서로 경쟁하는 여러 벤더가 공통으로 채택한 규격.
- **skills-compatible agent**: 스킬 포맷을 읽어 실행할 수 있는 에이전트. 사이트가 제품 간 재사용의 조건으로 드는 표현이다.
