---
title: "Equipping agents for the real world with Agent Skills"
type: article
year: 2025
category: agents
source: anthropic-2025-equipping-agents-for-the-real.md
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

## 요약 (Summary)

Agent Skills는 에이전트에 전문 지식과 절차를 얹는 최소 포맷이다. 스킬 하나는 `SKILL.md`를 담은 폴더이고, 여기에 스크립트나 레퍼런스, 에셋을 덧붙일 수 있다. 핵심은 두 가지다. 하나는 **progressive disclosure**로, 메타데이터와 본문, 번들 파일을 필요한 순간에만 단계적으로 불러와 컨텍스트를 아낀다. 다른 하나는 **코드 실행 위임**인데, 스킬에 담긴 파이썬 스크립트를 도구로 돌리면 토큰 추론보다 빠르고 결정적인 처리를 얻을 수 있다. Anthropic이 만들었지만 Claude 제품군에 머물지 않고 오픈 표준으로 공개됐다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg]]
*Figure 1: Agent + Skills + Virtual Machine — 왼쪽 에이전트 구성(코어 시스템 프롬프트 · Equipped Skills · Equipped MCP servers)과 오른쪽 에이전트 가상머신(Bash/Python/Node.js + 스킬 디렉토리가 사는 파일 시스템). 스킬은 에이전트 컴퓨터 안에, MCP 서버는 그 바깥 인터넷에 놓인다 (Anthropic 2025)*

## 주요 기여 (Key Contributions)

- **스킬 = 파일 폴더**라는 최소 정의. 별도 런타임 없이 파일 시스템만으로 성립한다.
- **progressive disclosure 3레벨**로 컨텍스트 윈도를 토큰 예산 관점에서 계층화.
- **코드 실행 위임**으로 반복·정밀 작업(PDF 폼 필드 추출 등)을 스크립트에 넘김.
- **MCP와의 역할 구분** — MCP는 외부 연결, 스킬은 파일 시스템에 사는 절차적 지식. 상호 보완.

## 스킬 해부 — progressive disclosure (Anatomy)

스킬은 딱 필요한 만큼만 컨텍스트에 올라온다. 처음엔 이름과 설명만 보이다가, 태스크가 맞아떨어지면 본문을 읽고, 본문이 다른 파일을 가리키면 그제야 부속 파일까지 따라 읽는다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg]]
*Figure 2: A simple SKILL.md — YAML frontmatter(`name: pdf`, `description: ...`)와 Markdown 본문(Overview·Quick Start). 최소 스킬은 이 한 파일이면 된다 (Anthropic 2025)*

![[assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg]]
*Figure 3: 레벨별 토큰 예산 — L1 메타데이터(항상 로드, ~100) / L2 본문(트리거 시, <5k) / L3+ 번들 파일(필요 시, unlimited*). 스킬을 많이 장착해도 발자국이 작은 이유 (Anthropic 2025)*

| Level | 파일 | 컨텍스트 로딩 | 토큰 |
|---|---|---|---|
| 1 | `SKILL.md` 메타데이터 (YAML) | 항상 로드 | ~100 |
| 2 | `SKILL.md` 본문 (Markdown) | 스킬 트리거 시 | <5k |
| 3+ | 번들 파일 (텍스트·스크립트·데이터) | Claude가 필요 시 | unlimited* |

## 번들 콘텐츠와 트리거 (Bundling & Triggering)

본문이 길어지면 세부는 형제 파일로 덜어낸다. `SKILL.md`에 `./reference.md`(고급 처리)나 `./forms.md`(폼 채우기)를 링크로 걸어두면, Claude는 그 참조가 정말 필요할 때만 따라 읽는다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig03.jpg]]
*Figure 4: Bundling additional content — SKILL.md 본문에서 `./reference.md`·`./forms.md`를 참조로 연결. 세부 지식을 분리 보관해 본문은 가볍게 유지 (Anthropic 2025)*

![[assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg]]
*Figure 5: Skills and the Context Window — 각 스킬의 짧은 스니펫이 시스템 프롬프트에 붙고, "이 PDF를 채워줘" 요청이 들어오면 Claude가 `Bash("cat .../pdf/SKILL.md")`로 스킬을 트리거한 뒤 `forms.md` 참조까지 이어 읽는 시퀀스 (Anthropic 2025)*

## 코드 실행 (Code Execution)

스킬에는 문서만 담기는 게 아니다. 실행 파일을 넣어두면 Claude가 그걸 도구처럼 돌린다. 폼 필드를 하나하나 토큰으로 추론하느니 pypdf 스크립트에 맡기는 편이 더 빠르고 결과도 일정하다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig06.jpg]]
*Figure 6: Bundling executable scripts — `forms.md`가 pypdf 기반 `extract_fields.py`를 참조. 반복·정밀 작업을 코드 실행으로 위임한다 (Anthropic 2025)*

## 개발 가이드라인 (Development Guidelines)

- 대표 태스크를 돌려 역량 공백을 먼저 찾는다.
- 복잡해지면 파일을 쪼개 구조화한다.
- 이름·설명을 신중히 지어 트리거가 제대로 걸리게 한다.
- Claude와 함께 반복하며 실제로 필요한 맥락을 발견한다.
- **설치 전 감사** — 코드 의존성과 외부 네트워크 연결을 반드시 점검한다.

## 한계 (Limitations)

정량 벤치마크는 없다. 효율과 신뢰성이 나아진다는 것도 아직은 서술적 주장에 그친다. 트리거가 제대로 걸리느냐는 name과 description을 어떻게 짓느냐에 크게 달렸고, 임의 스킬을 실행하려면 보안 감사가 먼저다. MCP 서버와의 통합은 아직 *탐색 예고* 수준에 머물러 있다.

## 관련 페이지 (Related Pages)

- [[agents/agentskills-agentskills]] — 이 포맷을 오픈 표준으로 문서화한 저장소
- [[agents/agentskills-io-2026-agent-skills-overview]] — 공식 문서 사이트 + 40여 클라이언트 채택 쇼케이스
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — progressive disclosure의 상위 원리(컨텍스트 엔지니어링)
- [[overviews/prompt-to-loop-engineering-evolution-overview]] — Prompt→Context→Harness→Loop 진화 지도에서 스킬의 위치
