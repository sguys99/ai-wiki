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

## 요약

Agent Skills는 에이전트에 전문 지식과 작업 절차를 장착하는 최소 포맷이다. 스킬 하나는 `SKILL.md`를 담은 폴더이고, 여기에 스크립트와 레퍼런스 문서, 에셋을 덧붙일 수 있다. 별도 런타임이나 프로토콜 없이 파일과 디렉토리만으로 성립하는 것이 이 포맷의 특징이다.

설계의 핵심은 두 가지다. 하나는 progressive disclosure로, 메타데이터와 본문, 번들 파일을 필요한 시점에만 단계적으로 불러와 컨텍스트를 아낀다. 다른 하나는 코드 실행 위임인데, 스킬에 담긴 파이썬 스크립트를 도구로 실행하면 토큰으로 추론하는 것보다 빠르고 결과도 일정하다.

Anthropic은 이 포맷을 Claude.ai와 Claude Code, Claude Agent SDK, Claude Developer Platform 네 곳에서 함께 지원한다고 밝혔다.

## 배경

이 글의 출발점은 범용 모델과 실무 사이의 간격이다. Claude는 강력하지만 실제 업무에는 procedural knowledge와 조직 맥락이 필요하다. procedural knowledge는 무엇인지를 아는 지식이 아니라 어떤 순서로 어떻게 하는지를 담은 지식이다. 조직 맥락은 그 조직에서만 통하는 규칙과 데이터 소스, 문서 양식 같은 것이다.

두 종류의 지식은 모델 가중치 안에 없다. 따라서 외부에서 공급해야 하는데, 공급 방식이 사용 사례마다 달라지면 팀마다 별도 맞춤 솔루션을 만들게 되고 구현이 분절된다. Anthropic은 이 분절을 피하려고 도메인 전문성을 조합 가능한(composable) 자원으로 포장하는 방식을 택했다.

동시에 제약도 있다. 지식을 프롬프트에 몰아 넣으면 context window를 잠식한다. context window는 모델이 한 번에 받아들일 수 있는 토큰 길이 한도다. 스킬을 여러 개 장착할 수 있으려면 장착 자체의 비용이 거의 없어야 한다. progressive disclosure가 이 제약에 대한 답이다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg]]
*Figure 1: 에이전트 구성(왼쪽)과 에이전트 가상머신(오른쪽)의 관계. 스킬 디렉토리는 가상머신 파일 시스템 안에 있고, MCP 서버 실체는 인터넷 쪽 원격에 있다 (Anthropic 2025)*

## 핵심 개념

progressive disclosure는 필요한 정보만 단계적으로 드러내 컨텍스트를 아끼는 로딩 전략이다. 매뉴얼을 읽을 때 목차만 보고 필요한 장으로 들어가는 방식과 같다.

트리거는 태스크가 스킬 설명과 맞아 에이전트가 스킬 본문을 실제로 읽어 들이는 활성화 순간을 가리킨다. 트리거 전까지 그 스킬은 이름과 한 줄 설명으로만 존재한다.

에이전트 가상머신은 Bash와 Python, Node.js를 갖춘 실행 환경이다. 스킬 디렉토리가 이 가상머신의 파일 시스템 안에 놓이기 때문에, 에이전트는 스킬을 특별한 API가 아니라 파일 읽기와 명령 실행으로 다룬다.

MCP는 외부 도구와 데이터에 연결하기 위한 프로토콜이다. 스킬과 역할이 다르며, fig01에서도 서로 다른 자리에 배치되어 있다.

## 방법

### 스킬 디렉토리의 구성

스킬은 `SKILL.md`를 담은 디렉토리다. 최소 형태는 메타데이터와 지시문만 담은 `SKILL.md` 한 개이고, 여기에 스크립트와 레퍼런스 문서, 템플릿, 그 밖의 파일을 번들로 묶을 수 있다.

`SKILL.md`의 앞부분은 YAML frontmatter이고 `name`과 `description` 두 필드가 필수다. 그 아래로 Markdown 지시문이 이어진다. 도식의 `pdf` 스킬은 `name: pdf`와 함께 "Comprehensive PDF toolkit for extracting text and tables, merging/splitting documents, and filling-out forms."라는 설명을 달고, 본문에 Overview와 Quick Start 절을 둔다. Quick Start에는 `from pypdf import PdfReader, PdfWriter`로 시작하는 파이썬 예제가 그대로 들어 있다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg]]
*Figure 2: 최소 스킬 파일의 구조. YAML frontmatter의 name과 description 아래로 Overview와 Quick Start 본문이 이어진다 (Anthropic 2025)*

구성 깊이는 스킬마다 다르다. 지시문 한 장으로 충분한 스킬이 있고, 참조 문서와 실행 스크립트까지 갖춘 스킬이 있다.

| 스킬 | 담긴 파일 | 구성의 성격 |
|---|---|---|
| `skills/nda-review/` | `SKILL.md` | 지시문 한 장으로 끝나는 최소 형태 |
| `skills/bigquery/` | `SKILL.md`, `datasources.md`, `rules.md` | 조직 고유의 데이터 소스와 규칙을 분리 |
| `skills/docx/` | `SKILL.md`, `ooxml/spec.md`, `ooxml/editing.md` | 하위 디렉토리로 포맷 명세를 계층화 |
| `skills/pdf/` | `SKILL.md`, `forms.md`, `reference.md`, `extract_fields.py` | 문서와 실행 코드를 함께 번들 |

### 3레벨 로딩과 토큰 예산

progressive disclosure는 로딩 시점을 세 단계로 나눈다. 레벨이 올라갈수록 로드되는 양은 커지지만, 로드되는 빈도는 낮아진다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg]]
*Figure 4: progressive disclosure 3레벨의 로딩 시점과 토큰 예산 표 (Anthropic 2025)*

| Level | 파일 | 컨텍스트 로딩 | 토큰 |
|---|---|---|---|
| 1 | `SKILL.md` 메타데이터 (YAML) | 시작 시 항상 로드 | 약 100 |
| 2 | `SKILL.md` 본문 (Markdown) | 스킬 트리거 시 | 5,000 미만 |
| 3+ | 번들 파일 (텍스트, 스크립트, 데이터) | Claude가 필요할 때 | 사실상 무제한 |

레벨 1은 `name`과 `description`뿐이라 약 100 토큰이다. 즉 스킬 하나를 장착하는 상시 비용이 한 문단 정도밖에 되지 않는다. 스킬을 열 개 장착해도 1,000 토큰 안팎이므로 장착 목록을 넉넉히 유지할 수 있다.

레벨 2는 트리거된 스킬의 본문 하나만 들어온다. 5,000 토큰 미만이라는 예산은 본문을 짧게 유지하고 세부를 레벨 3으로 미루라는 설계 지침으로도 읽힌다.

레벨 3 이상은 사실상 무제한이다. 파일 시스템에 있는 파일은 크기와 개수 제한 없이 쌓아 둘 수 있고, 그중 실제로 읽히는 것만 컨텍스트에 들어온다. Anthropic은 이 계층 구조의 효용을 파일 시스템을 가진 에이전트는 스킬 전체를 한꺼번에 컨텍스트에 올릴 필요가 없다는 문장으로 정리한다.

### 트리거가 일어나는 순간

트리거는 모델의 판단으로 일어난다. 각 스킬의 짧은 스니펫이 시스템 프롬프트에 붙어 있고, 사용자 요청이 그중 어느 설명과 맞으면 Claude가 해당 `SKILL.md`를 스스로 읽는다.

fig05의 시퀀스가 이 과정을 한 화면에 담는다. 시스템 프롬프트 아래에 `bigquery`, `docx`, `nda-review`, `pdf`, `pptx`, `xlsx` 스니펫이 나란히 붙어 있고, 사용자가 "Fill out this PDF based on what you know about me"라는 메시지와 함께 `/mnt/uploads/order_form.pdf`를 첨부한다. Claude는 PDF 스킬을 쓰겠다고 답한 뒤 `Bash("cat /mnt/skills/pdf/SKILL.md")`를 실행하고, 그 결과에 담긴 참조를 따라 다시 `Bash("cat /mnt/skills/pdf/forms.md")`를 실행한다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg]]
*Figure 5: PDF 폼 채우기 요청이 스킬을 트리거해 SKILL.md와 forms.md를 차례로 읽는 context window 시퀀스 (Anthropic 2025)*

주목할 점은 로딩 수단이 전용 API가 아니라 평범한 `cat` 명령이라는 것이다. 스킬을 불러오는 별도 메커니즘이 없으므로, 파일을 읽을 수 있는 에이전트라면 어디서든 같은 방식이 성립한다.

### 번들 파일로 세부를 미루기

본문이 길어지면 세부는 형제 파일로 덜어낸다. `SKILL.md` 본문에 `./reference.md`나 `./forms.md`를 링크로 걸어 두면, Claude는 태스크가 그 참조를 요구할 때만 따라 읽는다.

fig03의 예시에서 두 파일은 역할이 분명히 갈린다. `reference.md`는 "PDF Processing Advanced Reference"라는 제목 아래 본 지시문이 다루지 않는 고급 기능과 추가 라이브러리를 설명한다. 그중 하나가 `pypdfium2`인데, Chromium의 PDF 라이브러리인 PDFium의 파이썬 바인딩으로 빠른 렌더링과 이미지 생성에 적합하다고 소개된다.

`forms.md`는 절차를 담는다. 먼저 `python scripts/check_fillable_fields <file.pdf>`로 PDF에 채울 수 있는 폼 필드가 있는지 확인하고, 결과에 따라 "Fillable fields"와 "Non-fillable fields" 두 경로로 갈라 각각의 지시를 따르게 한다. 채울 수 있는 경우에는 `extract_form_field_info.py`로 필드 정보를 JSON으로 뽑는 단계가 이어진다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig03.jpg]]
*Figure 3: SKILL.md 본문이 reference.md와 forms.md를 참조로 걸어 세부 지식을 형제 파일로 분리한 예 (Anthropic 2025)*

이 구조에서 본문은 라우터 역할만 한다. 즉 어떤 상황에 어느 파일을 읽어야 하는지만 알려주고, 실제 내용은 그 파일이 담는다.

### 코드 실행 위임

스킬에는 문서만 담기지 않는다. 실행 파일을 함께 넣어 두면 Claude가 그것을 도구로 실행한다. 폼 필드를 하나하나 토큰으로 추론하는 대신 `pypdf` 스크립트에 맡기는 편이 더 효율적이고, 같은 입력에 같은 결과를 주는 결정적(deterministic) 동작을 확보할 수 있다.

fig06의 `extract_fields.py`는 짧다. `pypdf`의 `PdfReader`로 PDF를 열고 `get_fields(reader)`로 필드를 읽어 `json.dump`로 저장하는 `write_field_info(pdf_path, output_path)` 함수가 본체이고, `__main__` 진입점에서 인자 개수를 검사한 뒤 두 경로를 넘겨 호출한다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig06.jpg]]
*Figure 6: forms.md가 pypdf 기반 extract_fields.py를 가리켜 폼 필드 추출을 코드 실행으로 넘기는 구성 (Anthropic 2025)*

PDF 스킬을 실무 예시로 고른 이유도 여기에 있다. Claude는 이미 PDF 문서를 이해하지만 직접 조작할 수단이 없다. 스킬은 폼 채우기 절차와 미리 작성된 스크립트를 함께 제공해 그 공백을 메운다.

### MCP와의 역할 분담

fig01은 스킬과 MCP 서버를 에이전트 구성 안에 나란히 놓되, 실체가 사는 곳을 다르게 그린다. 스킬 디렉토리의 내용은 에이전트 가상머신의 파일 시스템 안에 있고, MCP 서버는 인터넷 어딘가의 원격에 있다. 코어 시스템 프롬프트에서 가상머신으로 향하는 화살표에는 "use computer"라는 라벨이 붙는다.

| 구성 요소 | 사는 곳 | 맡는 일 | 접근 수단 |
|---|---|---|---|
| 스킬 | 에이전트 가상머신 파일 시스템 | procedural knowledge와 조직 맥락 | 파일 읽기와 명령 실행 |
| MCP 서버 | 인터넷 쪽 원격 | 외부 도구와 데이터 연결 | 프로토콜 호출 |

두 요소는 경쟁 관계가 아니다. Anthropic은 MCP 서버와의 보완적 통합을 앞으로 탐색할 방향으로 제시한다.

## 개발 절차

Anthropic이 권장하는 스킬 개발 절차는 다섯 항목이다. 앞의 네 항목이 품질에 관한 것이고, 마지막 항목은 안전에 관한 것이다.

| 항목 | 내용 |
|---|---|
| 공백 식별 | 대표 태스크를 실행해 역량 공백을 먼저 찾는다 |
| 구조화 | 복잡해지면 내용을 여러 파일로 나눈다 |
| 네이밍 | 트리거가 제대로 걸리도록 `name`과 `description`을 신중히 설계한다 |
| 반복 | Claude와 함께 반복하며 실제로 필요한 맥락을 발견한다 |
| 감사 | 설치 전에 코드 의존성과 외부 네트워크 연결을 철저히 감사한다 |

네이밍이 별도 항목으로 올라온 이유는 트리거 방식에서 나온다. 스킬이 걸리는 근거가 `description` 한 줄뿐이므로, 설명이 모호하면 필요한 순간에 스킬이 걸리지 않는다.

## 결과

이 글에는 정량 벤치마크가 없다. 수치로 제시되는 주장은 토큰 예산 하나이고, 그 예산이 progressive disclosure의 효용을 대신한다. 메타데이터 약 100 토큰, 본문 5,000 토큰 미만, 번들 파일은 필요할 때만 로드라는 세 값이 전부다.

이 값들이 뜻하는 바는 장착 비용과 사용 비용의 분리다. 스킬을 여러 개 장착해도 상시 컨텍스트 발자국은 스킬 개수에 100 토큰을 곱한 정도에 머물고, 본문과 번들의 비용은 실제로 쓰이는 스킬 하나에만 발생한다.

지원 범위는 Claude.ai와 Claude Code, Claude Agent SDK, Claude Developer Platform 네 곳이다. 조직과 개발자, 최종 사용자가 각자 맞춤 에이전트를 만들 수 있게 하려는 목표에 맞춰, 포맷 자체는 단순함을 유지한다.

## 한계

정량 근거가 없다는 점이 가장 큰 한계다. 효율과 신뢰성이 나아진다는 주장은 서술로만 제시되고, 코드 실행 위임이 토큰 추론보다 얼마나 나은지를 재는 비교도 실리지 않았다.

트리거의 신뢰성은 설계자의 네이밍에 달려 있다. `name`과 `description`이 부실하면 스킬이 아예 걸리지 않거나 엉뚱한 상황에 걸린다. 이 부분을 자동으로 점검하는 수단은 제시되지 않는다.

보안은 별도 항목으로 다뤄진다. 임의 스킬을 실행하려면 코드 의존성과 외부 네트워크 연결을 설치 전에 감사해야 한다. 스킬이 실행 코드를 담을 수 있다는 강점이 그대로 위험 면적이 되는 셈이다.

MCP 서버와의 통합은 아직 탐색 예고 수준이다. 두 요소를 상호 보완 관계로 그리기는 하지만, 구체적인 연결 방식은 이 글의 범위 밖이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `SKILL.md` | 스킬의 필수 진입 파일. YAML frontmatter의 `name`과 `description` 아래로 Markdown 지시문이 이어진다 |
| progressive disclosure | 필요한 정보만 단계적으로 드러내 컨텍스트를 아끼는 로딩 전략 |
| 트리거 | 태스크가 스킬 설명과 맞아 에이전트가 스킬 본문을 읽어 들이는 활성화 순간 |
| 번들 파일 | `SKILL.md`가 참조하는 부속 파일. 스크립트와 레퍼런스 문서, 에셋이 들어간다 |
| Equipped Skills | 에이전트 구성에 장착되어 스니펫이 시스템 프롬프트에 붙은 스킬 목록 |

## 관련 페이지

- [[overviews/agent-skills-overview]]: Agent Skills 생태계 전반을 합성한 허브 페이지
- [[agents/agentskills-agentskills]]: 이 포맷을 오픈 표준으로 문서화한 저장소
- [[agents/agentskills-io-2026-agent-skills-overview]]: 공식 문서 사이트와 클라이언트 채택 현황
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: progressive disclosure의 상위 원리인 context engineering
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 프롬프트에서 루프로 이어지는 진화 지도에서 스킬이 놓이는 자리
