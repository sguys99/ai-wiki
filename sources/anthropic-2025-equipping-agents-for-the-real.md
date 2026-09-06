---
title: "Equipping agents for the real world with Agent Skills"
type: article
year: 2025
category: agents
raw_path: raw/articles/anthropic-2025-equipping-agents-for-the-real.md
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
    caption: "에이전트 구성과 가상머신의 관계. 장착된 스킬 디렉토리는 가상머신 파일 시스템 안에 있고 MCP 서버는 인터넷 쪽 원격에 있다"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig02.jpg
    caption: "최소 스킬 파일의 구조. YAML frontmatter의 name과 description 아래로 Overview와 Quick Start 본문이 이어진다"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig03.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig03.jpg
    caption: "SKILL.md 본문이 reference.md와 forms.md를 참조로 걸어 세부 지식을 형제 파일로 분리한 예"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig04.jpg
    caption: "progressive disclosure 3레벨의 로딩 시점과 토큰 예산 표"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig05.jpg
    caption: "PDF 폼 채우기 요청이 스킬을 트리거해 SKILL.md와 forms.md를 차례로 읽는 context window 시퀀스"
    strategy: manual
    curated: true
  - id: fig06
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig06.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig06.jpg
    caption: "forms.md가 pypdf 기반 extract_fields.py를 가리켜 폼 필드 추출을 코드 실행으로 넘기는 구성"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

Agent Skills는 `SKILL.md` 한 파일을 뼈대로 삼는 폴더 형식으로, 에이전트에 procedural knowledge와 조직 맥락을 장착하는 포맷이다. progressive disclosure(메타데이터에서 본문, 번들 파일 순서)로 컨텍스트 예산을 아끼는 한편, 스킬에 담은 코드를 도구로 실행해 결정적(deterministic) 처리까지 위임한다.

## 1. 자료 정보 (Document Information)

- **출처**: Anthropic Engineering 블로그, 2025년 10월 16일 게시.
- **성격**: Agent Skills 공식 발표 겸 설계 해설. Claude.ai, Claude Code, Claude Agent SDK, Claude Developer Platform에 걸친 기능 소개다.
- **핵심 문제의식**: Claude는 강력하지만 실무에는 procedural knowledge와 조직 맥락이 필요하다. 스킬은 범용 모델을 조직 사정에 맞는 전문 도구로 바꾸는 수단이다.
- **설계 목표**: 도메인 전문성을 조합 가능한(composable) 자원으로 포장해, 사용 사례마다 별도 맞춤 솔루션을 만들며 구현이 분절되는 상황을 피한다.
- **도식**: 본문에 도식 6종이 실려 있다. 전체 아키텍처, SKILL.md 예시, 번들 참조, 토큰 예산 표, context window 시퀀스, 실행 스크립트 예시다.

## 2. 주요 기여 (Key Contributions)

1. **스킬은 파일 폴더**라는 최소 정의. `SKILL.md`(필수)에 스크립트, 레퍼런스, 에셋(선택)을 더하면 별도 런타임 없이 파일 시스템만으로 성립한다.
2. **Progressive disclosure 3레벨** 로딩 모델 정식화. context window를 토큰 예산 관점에서 계층화한다. 파일 시스템을 가진 에이전트는 스킬 전체를 한꺼번에 컨텍스트에 올릴 필요가 없다.
3. **코드 실행 위임**. 스킬에 담긴 파이썬 스크립트를 도구로 실행해, 토큰 기반 처리보다 효율적이고 결정적인 결과를 얻는다. PDF 폼 필드 추출이 그 예다.
4. **MCP와의 역할 구분**. MCP 서버는 인터넷 쪽 외부 연결을 맡고, 스킬은 에이전트 가상머신 파일 시스템에 사는 procedural knowledge를 맡는다. 둘을 상호 보완 관계로 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**스킬 디렉토리의 구성**

스킬은 `SKILL.md`를 담은 디렉토리다. 최소 형태는 메타데이터와 지시문만 담은 `SKILL.md` 한 개이고, 여기에 스크립트, 레퍼런스 문서, 템플릿, 그 밖의 파일을 번들로 묶을 수 있다.

fig01의 파일 시스템 패널은 스킬마다 구성 깊이가 다르다는 점을 보여 준다.

| 스킬 | 담긴 파일 |
|---|---|
| `skills/pdf/` | `SKILL.md`, `forms.md`, `reference.md`, `extract_fields.py` |
| `skills/docx/` | `SKILL.md`, `ooxml/` 하위의 `spec.md`와 `editing.md` |
| `skills/bigquery/` | `SKILL.md`, `datasources.md`, `rules.md` |
| `skills/nda-review/` | `SKILL.md` 한 개 |

**Progressive disclosure 3레벨**

| Level | 파일 | 컨텍스트 로딩 | 토큰 |
|---|---|---|---|
| 1 | `SKILL.md` 메타데이터 (YAML `name`, `description`) | 시작 시 항상 로드 | 약 100 |
| 2 | `SKILL.md` 본문 (Markdown) | 스킬 트리거 시 | 5,000 미만 |
| 3+ | 번들 파일 (텍스트, 스크립트, 데이터) | Claude가 필요할 때 | 사실상 무제한 |

- **트리거 흐름**: 각 스킬의 짧은 스니펫(`name`, `description`)이 시스템 프롬프트에 붙는다. 사용자 요청이 특정 스킬 설명과 맞으면 Claude가 `Bash("cat /mnt/skills/pdf/SKILL.md")`로 본문을 읽어 스킬을 트리거한다. 본문이 가리키는 `forms.md`나 `reference.md` 참조는 필요한 시점에만 뒤이어 읽는다.
- **fig05의 시퀀스 세부**: 사용자 메시지는 "Fill out this PDF based on what you know about me"이고 첨부 파일은 `/mnt/uploads/order_form.pdf`다. Claude가 PDF 스킬을 쓰겠다고 답한 뒤 `SKILL.md`를 cat하고, 그 결과에서 다시 `forms.md`를 cat한다. 장착된 스킬 스니펫은 `bigquery`, `docx`, `nda-review`, `pdf`, `pptx`, `xlsx` 순서로 시스템 프롬프트 바로 아래에 붙어 있다.
- **번들 참조**: `SKILL.md` 본문이 `./reference.md`(고급 처리 세부)와 `./forms.md`(폼 채우기 지시문)를 링크로 걸어 세부를 형제 파일로 떼어 둔다. fig03의 `reference.md`는 "PDF Processing Advanced Reference"라는 제목 아래 `pypdfium2` 같은 추가 라이브러리를 설명한다. `pypdfium2`는 Chromium의 PDF 라이브러리인 PDFium의 파이썬 바인딩이다.
- **분기 지시문**: `forms.md`는 먼저 `check_fillable_fields`로 폼 필드 유무를 확인하고, 결과에 따라 "Fillable fields"와 "Non-fillable fields" 두 경로로 갈라 지시를 따르게 한다.
- **코드 위임**: `pdf/extract_fields.py`는 `pypdf`의 `PdfReader`로 폼 필드를 읽어 JSON으로 저장하는 스크립트다. fig06을 보면 `write_field_info(pdf_path, output_path)` 함수와 `__main__` 진입점에서 인자 개수를 검사하는 부분까지 들어 있다.
- **에이전트 컴퓨터**: 스킬 디렉토리는 Bash, Python, Node.js를 갖춘 에이전트 가상머신의 파일 시스템 안에 놓인다. 에이전트 구성 쪽에는 코어 시스템 프롬프트와 장착된 스킬 목록, 장착된 MCP 서버 목록이 나란히 있고, MCP 서버 실체는 인터넷 쪽 원격에 있다. 코어 시스템 프롬프트에서 가상머신으로 향하는 화살표에는 "use computer"라는 라벨이 붙어 있다.

**PDF 스킬이 메우는 공백**

Claude는 이미 PDF 문서를 이해하지만 직접 조작할 수단이 없다. PDF 스킬은 폼 채우기 지시문과 미리 작성된 파이썬 스크립트를 제공해 그 공백을 메운다. 실무 적용 예시로 이 스킬 하나만 상세히 다룬다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 실린 글이 아니다. 수치로 내세우는 주장은 토큰 예산 하나뿐이다. 메타데이터는 약 100 토큰, 본문은 5,000 토큰 미만이고 번들 파일은 필요할 때만 불러온다. 스킬을 여러 개 상시 장착해도 컨텍스트 발자국이 작다는 점을 progressive disclosure의 효용으로 든다.

지원 범위는 Claude.ai, Claude Code, Claude Agent SDK, Claude Developer Platform 네 곳이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

권장 개발 절차로 다섯 항목을 제시한다.

| 항목 | 내용 |
|---|---|
| 공백 식별 | 대표 태스크를 실행해 역량 공백을 먼저 찾는다 |
| 구조화 | 복잡해지면 내용을 여러 파일로 나눈다 |
| 네이밍 | 트리거가 제대로 걸리도록 `name`과 `description`을 신중히 설계한다 |
| 반복 | Claude와 함께 반복하며 실제로 필요한 맥락을 발견한다 |
| 감사 | 설치 전에 코드 의존성과 외부 네트워크 연결을 철저히 감사한다 |

- **보안 감사 필요**: 임의 스킬 실행에는 위험이 따르므로, 코드 의존성과 외부 네트워크 연결을 설치 전에 감사하라고 못박는다.
- **트리거 품질이 네이밍에 달림**: `name`과 `description` 설계가 부실하면 스킬이 아예 걸리지 않거나 엉뚱하게 작동한다.
- **로드맵**: 스킬 라이프사이클 전반의 기능 확충과 MCP 서버와의 보완적 통합 탐색을 예고하지만, 아직 전망 수준에 머문다.
- **정량 근거 부재**: 효율과 신뢰성 향상은 서술로만 제시할 뿐이다.

## 6. 관련 연구 (Related Work)

- **MCP (Model Context Protocol)**: 외부 도구와 데이터 연결 표준. procedural knowledge를 담는 스킬과 서로 보완하는 관계다.
- **Context engineering**: 같은 저장소의 [[agents/anthropic-2025-effective-context-engineering-for-ai]]와 곧장 이어진다. progressive disclosure는 컨텍스트 큐레이션 원리를 구체적으로 구현한 사례다.
- **agentskills.io / agentskills/agentskills**: 이 포맷을 오픈 표준으로 문서화하고 확산시킨 사이트와 저장소다 (같은 턴에 함께 ingest). 다만 오픈 표준이라는 성격은 이 글의 서술이 아니라 두 자료의 서술이다.

## 7. 용어집 (Glossary)

- **SKILL.md**: 스킬의 필수 진입 파일. YAML frontmatter(`name`, `description`)에 Markdown 지시문이 이어진다.
- **Progressive disclosure**: 필요한 정보만 단계적으로 드러내 컨텍스트를 아끼는 로딩 전략이다. 매뉴얼의 목차와 본문 구조와 닮았다.
- **트리거**: 태스크가 스킬 설명과 맞아 에이전트가 본문을 읽어 들이는 활성화 순간이다.
- **번들 파일**: `SKILL.md`가 참조하는 부속 파일로, 스크립트와 레퍼런스, 에셋이 들어간다.
- **Equipped Skills**: 에이전트 구성에 장착되어 스니펫이 시스템 프롬프트에 붙은 스킬 목록이다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 에이전트 구성과 가상머신의 관계 | manual | ★ wiki 권장 (architecture) |
| fig02 | 최소 스킬 파일의 구조 | manual | ★ wiki 권장 (anatomy) |
| fig03 | reference.md와 forms.md 참조 분리 | manual | ★ wiki 권장 (method) |
| fig04 | progressive disclosure 토큰 예산 표 | manual | ★ wiki 권장 (핵심 표) |
| fig05 | 스킬 트리거 context window 시퀀스 | manual | ★ wiki 권장 (method) |
| fig06 | forms.md에서 extract_fields.py로 이어지는 코드 실행 | manual | ★ wiki 권장 (code exec) |

> 사용자 지시로 6종 전부 `curated: true`다. wiki 본문에 임베드한다.
