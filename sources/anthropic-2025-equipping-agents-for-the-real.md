---
title: "Equipping agents for the real world with Agent Skills"
type: article
year: 2025
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/articles/anthropic-2025-equipping-agents-for-the-real.md
raw_filename: "anthropic-2025-equipping-agents-for-the-real.md"
source_collection: external
author: "Anthropic"
url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
publisher: "Anthropic Engineering"
tags: [agent-skills, skills, progressive-disclosure, context-engineering, tool-use, mcp, claude-code, agent-sdk]
figures:
  - id: fig01
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig01.jpg
    caption: "Agent + Skills + Virtual Machine 전체 아키텍처"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig02.jpg
    caption: "A simple SKILL.md file (frontmatter + Markdown)"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig03.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig03.jpg
    caption: "Bundling additional content (reference.md·forms.md 참조)"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig04.jpg
    caption: "Progressive disclosure 레벨별 토큰 예산 표"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig05.jpg
    caption: "Skills and the Context Window 트리거 시퀀스"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig06.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig06.jpg
    caption: "Bundling executable scripts (forms.md → extract_fields.py)"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Agent Skills는 `SKILL.md` 한 파일을 뼈대로 삼는 폴더 형태로, 에이전트에 전문 지식과 워크플로를 얹는 포맷이다. progressive disclosure(메타데이터 → 본문 → 번들 파일)로 컨텍스트 예산을 아끼는 한편, 스킬 안에 담은 코드를 도구처럼 실행해 결정적 작업까지 넘긴다.

## 1. 자료 정보 (Document Information)

- **출처**: Anthropic Engineering 블로그, 2025-10-16 게시.
- **성격**: Agent Skills 공식 발표 겸 설계 해설. Claude.ai·Claude Code·Agent SDK·Claude Developer Platform에 걸친 기능 소개.
- **핵심 문제의식**: "Claude는 강력하지만 실무에는 절차적 지식(procedural knowledge)과 조직 맥락(organizational context)이 필요하다." 범용 모델을 특정 조직에 맞는 전문 도구로 탈바꿈시키는 수단이 바로 스킬이다.

## 2. 주요 기여 (Key Contributions)

1. **스킬 = 파일 폴더**라는 최소 정의. `SKILL.md`(필수)에 scripts/references/assets(선택)를 더하면, 별도 런타임 없이 파일 시스템만으로 성립한다.
2. **Progressive disclosure 3레벨** 로딩 모델 정식화 — 컨텍스트 윈도를 토큰 예산 관점에서 계층화한다.
3. **코드 실행 위임** — 스킬에 담긴 파이썬 스크립트를 도구로 돌려, 토큰 기반 추론보다 효율적이고 결정적인 처리를 확보한다(PDF 폼 필드 추출이 그 예다).
4. **MCP와의 역할 구분** — MCP 서버는 외부 연결(도구/데이터)을 맡고, 스킬은 에이전트 컴퓨터 파일 시스템에 사는 절차적 지식을 맡는다. 둘을 상호 보완 관계로 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**스킬 해부(anatomy) — progressive disclosure**

| Level | 파일 | 컨텍스트 로딩 | 토큰 |
|---|---|---|---|
| 1 | `SKILL.md` 메타데이터 (YAML `name`·`description`) | 시작 시 항상 로드 | ~100 |
| 2 | `SKILL.md` 본문 (Markdown) | 스킬 트리거 시 | <5k |
| 3+ | 번들 파일 (텍스트·스크립트·데이터) | Claude가 필요 시 | unlimited* |

- **트리거 흐름**: 각 스킬의 짧은 스니펫(name·description)이 시스템 프롬프트에 붙는다 → 사용자 요청이 특정 스킬 설명과 맞아떨어지면 Claude가 `Bash("cat .../SKILL.md")`로 본문을 읽어 "트리거"한다 → 본문이 가리키는 `forms.md`·`reference.md` 참조는 필요한 시점에만 뒤이어 읽는다.
- **번들 참조**: `SKILL.md` 본문에 `./reference.md`(고급 처리)와 `./forms.md`(폼 채우기)를 링크로 걸어 세부를 따로 떼어 둔다.
- **코드 위임**: `pdf/extract_fields.py`(pypdf 기반)처럼 실행 파일을 함께 담아, 폼 필드 추출 같은 반복적이고 정밀한 작업을 코드에 맡긴다.
- **에이전트 컴퓨터**: 스킬 디렉토리는 Bash·Python·Node.js를 갖춘 에이전트 가상머신의 파일 시스템 안에 놓이고, MCP 서버는 그 바깥 인터넷 쪽 연결로 자리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 실린 글은 아니다(엔지니어링 소개글이다). 수치로 내세우는 주장은 토큰 예산 하나뿐이다. 메타데이터 ~100 토큰, 본문 <5k, 번들은 필요할 때만 불러온다. 스킬을 여럿 상시 "장착"해도 컨텍스트 발자국이 작다는 점을 progressive disclosure의 효용으로 든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **보안 감사 필요**: 스킬에 담긴 코드 의존성과 외부 네트워크 연결을 설치 전에 철저히 감사하라고 못박는다(임의 스킬 실행에는 위험이 따른다).
- **트리거 품질은 네이밍에 달림**: name·description 설계가 부실하면 스킬이 아예 안 걸리거나 엉뚱하게 작동한다.
- **로드맵**: 스킬 라이프사이클 전반에 걸친 기능 확충과 MCP 서버와의 보완적 통합 탐색을 예고하지만, 아직 *전망* 수준에 머문다.
- **정량 근거 부재**: 효율과 신뢰성 향상은 서술로만 제시할 뿐이다.

## 6. 관련 연구 (Related Work)

- **MCP (Model Context Protocol)**: 외부 도구/데이터 연결 표준. 절차적 지식인 스킬과 서로 보완하는 관계다.
- **Context engineering**: 같은 저장소의 [[agents/anthropic-2025-effective-context-engineering-for-ai]]와 곧장 이어진다 — progressive disclosure는 컨텍스트 큐레이션 원리를 구체적으로 구현한 사례다.
- **agentskills.io / agentskills/agentskills**: 이 포맷을 오픈 표준으로 문서화하고 퍼뜨린 사이트와 저장소(같은 턴에 함께 ingest).

## 7. 용어집 (Glossary)

- **SKILL.md**: 스킬의 필수 진입 파일. YAML frontmatter(`name`·`description`)에 Markdown 지시문이 이어진다.
- **Progressive disclosure**: 필요한 정보만 단계적으로 드러내 컨텍스트를 아끼는 로딩 전략(매뉴얼 구조와 닮았다).
- **Trigger(트리거)**: 태스크가 스킬 설명과 맞아 에이전트가 본문을 읽어 들이는 활성화 순간.
- **Bundled files**: SKILL.md가 참조하는 부속 파일(스크립트·레퍼런스·에셋).

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | Agent + Skills + Virtual Machine 전체 아키텍처 | manual | ★ wiki 권장 (architecture) |
| fig02 | A simple SKILL.md file (frontmatter + Markdown) | manual | ★ wiki 권장 (anatomy) |
| fig03 | Bundling additional content (reference.md·forms.md) | manual | ★ wiki 권장 (method) |
| fig04 | Progressive disclosure 레벨별 토큰 예산 표 | manual | ★ wiki 권장 (핵심 표) |
| fig05 | Skills and the Context Window 트리거 시퀀스 | manual | ★ wiki 권장 (method) |
| fig06 | Bundling executable scripts (forms.md → extract_fields.py) | manual | ★ wiki 권장 (code exec) |

> 사용자 지시로 6종 전부 `curated: true` — wiki 본문에 임베드.
