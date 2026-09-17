---
title: "Agent Skills 규격과 생태계 지도"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - anthropic-2025-equipping-agents-for-the-real.md
  - agentskills-agentskills.md
  - agentskills-io-2026-agent-skills-overview.md
  - anthropic-2025-effective-context-engineering-for-ai.md
  - osmani-2026-agent-skills.md
  - hada-2026-agent-skills.md
  - mattpocock-skills.md
  - imbad0202-academic-research-skills.md
  - ayghri-i-have-adhd.md
  - zhao-2026-generative-skill-composition-for-llm.md
  - yang-2026-skillopt-executive-strategy-for.md
  - google-labs-code-design-md.md
tags: [agent-skills, skill-md, progressive-disclosure, open-standard, ecosystem, mcp, context-engineering, synthesis]
study_path:
  - id: agents/anthropic-2025-effective-context-engineering-for-ai
    note: "왜 컨텍스트를 아껴야 하는지를 먼저 잡는다. attention budget과 context rot가 뒤에 나오는 모든 절약 장치의 전제다."
  - id: agents/anthropic-2025-equipping-agents-for-the-real
    note: "규격의 설계 의도와 3레벨 토큰 예산을 도식으로 확인한다. 약 100 토큰과 5,000 토큰 미만이라는 두 수치가 기준점이 된다."
    prereq: ["agents/anthropic-2025-effective-context-engineering-for-ai"]
  - id: agents/agentskills-agentskills
    note: "벤더 중립 규격 본문을 읽는다. 폴더 레이아웃과 discovery, activation, execution 3단계가 여기서 확정된다."
    prereq: ["agents/anthropic-2025-equipping-agents-for-the-real"]
  - id: agents/agentskills-io-2026-agent-skills-overview
    note: "규격이 선언에 그치지 않았다는 근거를 확인한다. 클라이언트 42개 목록의 벤더 구성이 핵심이다."
    prereq: ["agents/agentskills-agentskills"]
  - id: agents/mattpocock-skills
    note: "규격이 비워 둔 자리를 실무 규약이 어떻게 메우는지 본다. 같은 저장소를 두 harness에 배포하지 못한 기록이 이식성의 실제 경계다."
    prereq: ["agents/agentskills-agentskills"]
  - id: agents/hada-2026-agent-skills
    note: "공식 설계에 대한 실무 반론을 듣는다. 800줄 스킬과 강제 주체 문제가 앞 단계의 낙관을 조정한다."
    prereq: ["agents/anthropic-2025-equipping-agents-for-the-real"]
  - id: agents/zhao-2026-generative-skill-composition-for-llm
    note: "library가 196개로 커졌을 때 discovery 단계가 무엇을 놓치는지 수치로 본다. 전량 주입이 답이 아니라는 확인이다."
    prereq: ["agents/agentskills-io-2026-agent-skills-overview", "agents/mattpocock-skills"]
  - id: agents/yang-2026-skillopt-executive-strategy-for
    note: "스킬 본문을 사람이 쓰는 대신 학습 대상으로 두는 방향을 확인한다. 규격을 다루는 관점이 작성에서 최적화로 넘어가는 지점이다."
    prereq: ["agents/zhao-2026-generative-skill-composition-for-llm"]
figures:
  - id: fig02
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig02.jpg
    caption: "pdf 스킬의 SKILL.md 한 장. 위쪽 YAML에 name과 description만 두고 아래 Markdown에 Overview와 Quick Start를 이어 붙인 최소 구성이다"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig04.jpg
    caption: "레벨 1은 항상 로드되어 약 100 토큰, 레벨 2는 트리거 시점에 5,000 토큰 미만, 레벨 3 이상은 필요할 때만 읽히며 분량 제한이 사실상 없다"
    strategy: manual
    curated: true
  - id: fig05
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig05.jpg
    caption: "스킬 스니펫 여섯 개가 시스템 프롬프트에 붙어 있고, PDF 요청이 들어오자 cat 명령 두 번으로 SKILL.md와 forms.md가 차례로 컨텍스트에 들어온다"
    strategy: manual
    curated: true
  - id: fig01
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig01.jpg
    caption: "왼쪽 에이전트 구성에는 스킬과 MCP 서버가 나란히 등록되지만, 스킬 디렉토리의 실체는 오른쪽 가상머신 파일 시스템에 있고 MCP 서버는 인터넷 쪽 원격에 남는다"
    strategy: manual
    curated: true
---

## 요약

Agent Skills는 `SKILL.md` 파일 하나를 담은 폴더를 에이전트 확장의 기본 단위로 삼는 포맷이다. 별도 런타임도 프로토콜도 없고, 파일을 읽고 명령을 실행할 수 있는 에이전트면 그대로 쓸 수 있다.

이 페이지는 규격을 정의한 자료와 그 규격을 실제로 쓴 자료를 한자리에 놓는다. 개별 자료 요약은 각 wiki 페이지가 담당하고, 여기서는 겹치는 주장과 갈리는 주장, 규격이 비워 둔 자리를 다룬다.

한 가지 관점이 페이지 전체를 관통한다. 이 포맷의 설계는 스킬을 많이 갖추는 일과 컨텍스트를 많이 쓰는 일을 떼어놓는 데 집중되어 있고, 저장소의 다른 자료들은 그 분리가 어디까지 성립하는지를 서로 다른 방향에서 시험한다.

## 자료의 역할 분담

커버하는 열두 편은 규격, 생태계, 사용, 규모, 경계 다섯 성격으로 나뉜다. 같은 포맷을 다루더라도 답하는 질문이 서로 다르다.

| 역할 | 자료 | 유형 | 이 페이지가 가져오는 것 |
|---|---|---|---|
| 상위 원리 | [[agents/anthropic-2025-effective-context-engineering-for-ai\|Effective Context Engineering]] | article (2025) | attention budget과 context rot, progressive disclosure의 원래 용법 |
| 설계 원전 | [[agents/anthropic-2025-equipping-agents-for-the-real\|Equipping agents with Agent Skills]] | article (2025) | 3레벨 토큰 예산, 트리거 시퀀스, MCP와의 역할 분담, 도식 6종 |
| 규격 본문 | [[agents/agentskills-agentskills\|agentskills/agentskills]] | repo (2026) | 폴더 레이아웃, discovery와 activation과 execution, 라이선스 분리 |
| 생태계 | [[agents/agentskills-io-2026-agent-skills-overview\|agentskills.io]] | article (2026) | 클라이언트 42개 목록과 벤더 구성, 적용 범위 |
| 내용 규율 | [[agents/osmani-2026-agent-skills\|Agent Skills (Osmani)]] | article (2026) | 스킬 본문에 무엇을 담을지 정하는 다섯 원칙 |
| 실무 반론 | [[agents/hada-2026-agent-skills\|Agent Skills (GeekNews)]] | article (2026) | 800줄 스킬의 컨텍스트 비용, 강제 주체 문제 |
| 실사용 규약 | [[agents/mattpocock-skills\|mattpocock/skills]] | repo (2026) | 호출 주체 구분, 문서 계층 설계, 두 harness 배포 실패 기록 |
| 도메인 확장 | [[agents/imbad0202-academic-research-skills\|Academic Research Skills]] | repo (2026) | 코딩 밖 파이프라인, SKILL.md 감량 실측, 트리거 언어 편중 |
| 응답 형식 | [[agents/ayghri-i-have-adhd\|i-have-adhd]] | repo (2026) | 절차가 아닌 output style만 담은 스킬, 15개 harness 배포, blind judge 평가와 release gate 실측 |
| 규모 문제 | [[agents/zhao-2026-generative-skill-composition-for-llm\|SkillComposer]] | paper (2026) | library 196개에서의 선택 문제와 pass rate 비교 |
| 작성 자동화 | [[agents/yang-2026-skillopt-executive-strategy-for\|SkillOpt]] | paper (2026) | 스킬 본문을 학습 대상으로 두는 방향과 최종 분량 실측 |
| 인접 포맷 | [[agents/google-labs-code-design-md\|DESIGN.md]] | repo (2026) | 같은 Markdown 파일 인터페이스지만 로딩 방식이 다른 경우 |

## 규격

### 스킬 폴더의 최소 단위

규격이 요구하는 것은 `SKILL.md` 파일 하나를 담은 폴더가 전부다. [[agents/agentskills-agentskills]]는 `scripts/`와 `references/`, `assets/` 세 하위 디렉토리를 권장 이름으로 제시하되, 그 밖의 파일과 디렉토리를 자유롭게 두어도 규격 위반이 아니라고 명시한다.

`SKILL.md`는 두 부분으로 나뉜다. 앞의 YAML 메타데이터에 `name`과 `description`이 들어가고, 뒤의 Markdown 본문에 에이전트가 따를 지시문이 이어진다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig02.jpg]]
*Figure 2: pdf 스킬의 SKILL.md 한 장. YAML에 name과 description만 두고 아래 Markdown에 Overview와 Quick Start를 이어 붙인 최소 구성이다 (Anthropic 2025)*

제약이 이만큼 얕은 것이 규격의 설계 의도다. [[agents/anthropic-2025-equipping-agents-for-the-real]]가 든 네 가지 예시 스킬만 봐도 구성 깊이가 크게 갈리는데, `nda-review`는 `SKILL.md` 한 장으로 끝나고 `pdf`는 문서 두 개와 실행 스크립트를 함께 번들한다.

이 개방성은 뒤에 나오는 로딩 방식과 짝을 이룬다. 자원을 얼마든지 번들해도 컨텍스트가 넘치지 않는 이유는 번들된 자원이 처음부터 다 읽히지 않기 때문이다.

### 세 레벨로 나뉜 로딩

progressive disclosure는 필요한 시점에만 정보를 단계적으로 노출하는 설계다. 두 원전 자료가 같은 구조를 서로 다른 이름으로 적는데, 겹쳐 놓으면 무엇이 규격이고 무엇이 권장 예산인지가 분명해진다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg]]
*Figure 4: 레벨 1은 항상 로드되어 약 100 토큰, 레벨 2는 트리거 시점에 5,000 토큰 미만, 레벨 3 이상은 필요할 때만 읽힌다 (Anthropic 2025)*

| 레벨 | 규격 단계 이름 | 읽는 시점 | 읽는 대상 | 토큰 예산 |
|---|---|---|---|---|
| 1 | discovery | 에이전트 시작 시점 | 모든 스킬의 `name`과 `description` | 스킬당 약 100 |
| 2 | activation | 작업이 `description`과 맞을 때 | 그 `SKILL.md` 본문 전체 | 5,000 미만 |
| 3 이상 | execution | 지시문이 그 파일을 요구할 때 | 번들된 스크립트와 참조 문서 | 사실상 무제한 |

단계 이름은 [[agents/agentskills-agentskills]]와 [[agents/agentskills-io-2026-agent-skills-overview]]가 쓰는 규격 용어이고, 토큰 예산은 [[agents/anthropic-2025-equipping-agents-for-the-real]]만 제시한다. 즉 규격 문서는 언제 무엇을 읽는지까지만 정하고, 얼마나 짧게 쓸지는 설계 지침으로 남아 있다.

레벨 1의 비용이 이 구조의 핵심이다. 스킬 하나를 장착하는 상시 비용이 약 100 토큰이므로, 열 개를 장착해도 1,000 토큰 안팎에 머문다고 [[agents/anthropic-2025-equipping-agents-for-the-real]]는 적는다.

레벨 2의 5,000 토큰 미만은 상한이 아니라 본문을 짧게 유지하고 세부를 레벨 3으로 미루라는 지침으로 읽힌다. 이 지침이 실제로 어떻게 적용되는지는 아래 도메인 확장 항목에서 수치로 확인할 수 있다.

### 트리거와 description

스킬이 걸리는 근거는 `description` 한 줄뿐이다. 각 스킬의 짧은 스니펫이 시스템 프롬프트에 붙어 있고, 요청이 그중 어느 설명과 맞으면 모델이 해당 `SKILL.md`를 스스로 읽는다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig05.jpg]]
*Figure 5: 스킬 스니펫 여섯 개가 시스템 프롬프트에 붙어 있고, PDF 요청이 들어오자 cat 명령 두 번으로 SKILL.md와 forms.md가 차례로 컨텍스트에 들어온다 (Anthropic 2025)*

로딩 수단이 전용 API가 아니라 평범한 `cat` 명령이라는 점이 이식성의 기술적 근거다. 스킬을 불러오는 별도 메커니즘이 없으므로 파일을 읽을 수 있는 에이전트라면 같은 방식이 성립한다.

대가도 분명하다. [[agents/anthropic-2025-equipping-agents-for-the-real]]는 네이밍을 개발 절차의 독립 항목으로 올리고, `description`이 모호하면 필요한 순간에 스킬이 걸리지 않는다고 적는다. 트리거 신뢰성을 자동으로 점검하는 수단은 제시되지 않는다.

## 표준화와 생태계

### 벤더 구성이 만드는 근거

포맷은 Anthropic이 처음 개발했지만 오픈 표준으로 공개되었고, 코드는 Apache-2.0, 문서는 CC-BY-4.0으로 배포된다. 선언만으로 표준이 성립하지는 않으므로 근거는 채택 현황이 댄다.

[[agents/agentskills-io-2026-agent-skills-overview]]는 클라이언트 42개를 로고로 나열한다. 목록이 "including"으로 열려 있어 42개는 채택 규모의 하한이다.

목록의 값어치는 개수가 아니라 구성에 있다. 기반 모델 시장에서 직접 경쟁하는 회사들의 제품이 같은 목록에 들어 있다.

| 벤더 | 목록에 오른 클라이언트 |
|---|---|
| Anthropic | Claude, Claude Code |
| OpenAI | Codex |
| Google | Gemini CLI, Google AI Edge Gallery |
| Microsoft | GitHub Copilot, VS Code |
| JetBrains | Junie |
| Mistral AI | Vibe |
| ByteDance | TRAE |
| Databricks | Genie Code |
| Snowflake | Cortex Code |

적용 범위도 코딩 도구에만 머물지 않는다. 같은 자료가 데이터 플랫폼의 코딩 도구(Databricks Genie Code, Snowflake Cortex Code)와 애플리케이션 프레임워크 도구(Spring AI, Laravel Boost), 엣지 환경 도구(Google AI Edge Gallery)를 함께 든다.

### 이식이 실제로 걸리는 자리

포맷이 공통이라는 사실과 스킬 묶음이 그대로 옮겨간다는 사실은 다르다. 이 구분을 보여주는 기록이 커버 자료 안에 두 건 있고, 둘 다 Claude Code와 Codex 사이에서 나왔다.

[[agents/mattpocock-skills]]의 ADR 0002가 첫 번째다. Claude Code의 `.claude-plugin/plugin.json`은 `skills`를 경로 배열로 받아 승격된 스킬만 나열할 수 있는 반면, Codex의 `.codex-plugin/plugin.json`은 단일 경로 문자열만 받고 그 아래에서 `SKILL.md`를 재귀 탐색한다. 그래서 버킷 두 개만 배포할 방법이 없어 Codex 네이티브 플러그인이 연기되었다.

같은 기록에 우회책 두 가지가 기각된 이유도 남아 있다. `skills/` 전체를 가리키면 `deprecated/`와 `in-progress/`까지 함께 배포되고, 심볼릭 링크로 만든 평면 디렉터리는 Codex가 플러그인 트리를 캐시로 복사하면서 링크를 버려 스킬이 빈 채로 도착한다.

[[agents/imbad0202-academic-research-skills]]가 두 번째다. 같은 워크플로를 Codex에서 쓰려면 자매 배포판을 따로 설치해야 하고, 그 배포판은 단일 스킬과 별칭으로 다시 패키징되어 있다. 같은 저장소가 Claude Science로 옮겨갈 때는 슬래시 커맨드와 훅, 서브에이전트 구성이 넘어가지 않는다고도 밝힌다.

두 사례가 가리키는 경계는 같다. 이식되는 것은 `SKILL.md`라는 파일 형식이고, 스킬 묶음을 어떻게 등록하고 어떤 부수 장치와 함께 쓰는지는 클라이언트마다 다르다. [[agents/agentskills-io-2026-agent-skills-overview]]가 각 클라이언트에 자체 스킬 문서가 따로 있다고 안내하는 것이 이 차이의 공식 표현이다.

## 스킬에 무엇을 담는가

### 절차 규율

규격은 그릇만 정하고 내용은 비워 둔다. 그 빈칸을 어떻게 채울지에 대한 제안이 [[agents/osmani-2026-agent-skills]]의 다섯 원칙이다.

| 원칙 | 막으려는 실패 |
|---|---|
| process over prose | 지시가 읽히기만 하고 실행되지 않는다 |
| anti-rationalization table | 에이전트가 절차 생략을 스스로 정당화한다 |
| verification is non-negotiable | 증거 없이 완료를 선언한다 |
| progressive disclosure | 스킬 전량 로드가 컨텍스트를 잠식한다 |
| scope discipline | 요청 범위를 넘어선 변경이 섞여 들어온다 |

주목할 점은 네 번째 항목의 위치다. 공식 발표글에서 progressive disclosure는 포맷이 제공하는 로딩 메커니즘인데, 이 글에서는 스킬 작성자가 지켜야 할 원칙 목록에 함께 들어간다. 즉 메커니즘이 있다고 해서 비용이 자동으로 관리되지는 않는다는 뜻이다.

이 자료는 정량 근거가 없는 처방형 에세이다. 스킬을 harness의 한 층위로 배치하는 논의는 [[overviews/agent-harness-engineering-overview]]가 담당하므로, 이 페이지에서는 규격의 빈칸을 메우는 관점까지만 가져온다.

### 문서 계층 설계

[[agents/mattpocock-skills]]의 `writing-for-agents` 문서는 progressive disclosure를 다르게 정의한다. 토큰 최적화가 아니라 정보 계층을 보호하는 방법이라는 것이다.

이 저장소가 세운 계층은 세 단계다. 에이전트가 순서대로 수행하는 파일 내 단계가 맨 위이고, 필요할 때 조회하는 파일 내 참고가 다음이며, 별도 파일로 밀어내고 포인터로만 도달하는 분리된 참고가 맨 아래다.

판단 기준도 명시되어 있다. 모든 분기가 필요로 하는 것은 인라인하고, 일부 분기만 도달하는 것은 포인터 뒤로 민다. 아래로 너무 적게 내리면 위가 부풀고, 너무 많이 내리면 에이전트가 실제로 필요로 하는 자료를 숨기게 된다.

같은 문서가 부하를 두 종류로 나누는 것도 이 페이지의 다른 자료에 없는 관점이다. 컨텍스트 부하는 모델이 매 턴 치르는 비용이고, 인지 부하는 어떤 문서가 있고 언제 무엇을 꺼낼지를 사람이 기억해야 하는 비용이다.

호출 주체를 나누는 규약도 `description`의 역할을 둘로 가른다. user-invoked 스킬의 `description`은 슬래시 커맨드 목록을 훑는 사람이 읽는 한 줄이라 트리거 문구를 걷어내고, model-invoked 스킬의 `description`은 자동 호출이 걸리도록 트리거 문구를 유지한다.

이 구분은 규격에 없다. 규격은 `description`을 discovery 단계의 단일 판정 근거로만 규정하므로, 사람이 읽는 경우와 모델이 읽는 경우를 나누는 것은 실사용 저장소가 덧붙인 규약이다.

### 도메인 확장

[[agents/imbad0202-academic-research-skills]]는 이 포맷이 코딩 밖에서 쓰인 사례다. 스킬 4종과 orchestrator 하나로 학술 논문의 조사부터 집필, 심사, 수정까지를 잇고, 모드 27개를 사용자 요청 문장에서 의도를 읽어 고른다.

이 저장소가 남긴 감량 기록은 레벨 2 예산 지침이 실무에서 어떻게 적용되는지를 보여주는 커버 자료 가운데 유일한 실측이다. v3.1에서 `SKILL.md` 총량을 142KB에서 85KB로 40% 줄이고 상세 프로토콜을 `references/` 파일 약 15개로 옮겼다. 긴 대화에서도 깨지면 안 되는 규칙 표식은 `SKILL.md`에 남기고 세부만 아래 레벨로 내린 구성이다.

트리거 쪽에서는 규격의 약점이 그대로 드러난다. 스킬 활성화를 결정하는 키워드 절이 영어와 번체중문 위주라 다른 언어에서는 활성화 신뢰도가 떨어지고, 사용자가 `SKILL.md`에 키워드를 직접 추가해야 한다.

### 응답 형식

[[agents/ayghri-i-have-adhd]]는 스킬에 절차가 아니라 응답의 모양만 담은 사례다. 다음 행동을 첫 줄에 두고 여러 단계에 번호를 붙이며 도입부와 마무리 인사를 금지하는 규칙 10개가 `SKILL.md` 하나에 들어 있고, `disable-model-invocation: true`로 사용자만 부를 수 있게 한 점은 [[agents/mattpocock-skills]]의 user-invoked 규약과 같다.

이 저장소가 커버 자료 가운데 유일하게 남긴 것은 스킬의 효과를 blind LLM judge로 잰 기록이다. 케이스 14개를 3회씩 실행해 스킬 주입 조건이 가중 점수 4.045에서 4.473으로 올랐지만, blocker 0건이라는 절대 조건 때문에 release gate는 실패했다. 스킬 본문의 규칙 하나(오류를 원인과 수정으로 보고)가 근거 없는 원인 단정을 유도할 수 있다는 메커니즘도 같은 기록에서 나왔다. 규격은 스킬을 어떻게 싣는지만 정하고 효과를 어떻게 재는지는 비워 두는데, 이 실측이 그 빈칸을 채우는 한 방식이다.

## 규격이 규모를 만났을 때

### library가 커질 때의 선택

세 원전 자료는 스킬을 몇 개까지 갖출 수 있는지를 다루지 않는다. [[agents/zhao-2026-generative-skill-composition-for-llm]]이 그 지점을 196개 규모의 library에서 측정한다.

이 논문은 open Agent Skills 표준을 따라 skill을 메타데이터, applicability 조건, procedural 절차, 종료 조건, 보조 자원의 다섯 원소로 정의하므로 규격과 같은 대상을 다룬다. 문제 설정은 어떤 스킬을 몇 개, 어떤 순서로 쓸지를 함께 정하는 것이다.

SkillsBench 88개 작업 중 75개를 쓴 다운스트림 측정 결과가 discovery 단계의 한계를 드러낸다. 13개를 뺀 이유가 Anthropic 번들 포맷 스킬(pdf, xlsx, pptx, docx)이 지배해 파일 확장자만으로 라우팅되기 때문이라는 점도 규격과 맞닿는다.

| 스킬 적재 조건 | GPT-5.2-Codex pass rate | 평균 입력 프롬프트 토큰 |
|---|---|---|
| No Skills | 22.2% | 94만 |
| All Skills (196개 전부) | 29.3% | 127만 |
| Retrieval (top-3) | 44.0% | 109만 |
| SkillComposer | 45.3% | 103만 |
| Gold Skills (상한) | 51.1% | 112만 |

스킬을 적재한 세 조건 가운데 library 전부를 프롬프트에 넣는 쪽이 가장 비효율적이다. 토큰이 94만에서 127만으로 35% 늘어나는 동안 pass rate는 7.1%p만 오른다.

이 수치가 progressive disclosure의 필요성을 바깥에서 확인해 준다. 같은 논문이 LLM-judge 방식의 한계로 든 이유도 같은 성격인데, 컨텍스트 예산 안에서 196개 스킬의 본문 전체를 읽을 수 없어 이름과 한 줄 설명만 보고 판단하게 된다는 것이다.

동시에 한계도 드러난다. 규격의 discovery 단계처럼 메타데이터만 보고 후보를 고르는 retrieval 방식은 이 측정에서 44.0%에 머문다. 어떤 스킬을 몇 개, 어떤 순서로 쓸지를 함께 예측하는 쪽이 더 적은 토큰으로 더 높은 점수에 도달한다.

### 스킬 본문을 학습 대상으로 두기

[[agents/yang-2026-skillopt-executive-strategy-for]]는 반대 방향을 택한다. library를 키우는 대신 이식 가능한 단일 스킬 문서 하나를 최적화 대상으로 놓고, 별도 optimizer 모델이 채점된 실행 기록을 편집으로 바꾼다.

이 자료가 규격과 이어지는 지점은 실행 방식에 있다. Codex harness에서 현재 스킬을 작업별 `SKILL.md`로 렌더해 넣고, direct chat과 Claude Code를 포함한 세 실행 환경이 모두 같은 `best_skill.md` 포맷을 소비한다.

성과는 6개 벤치마크와 7개 target 모델, 3개 실행 환경이 만드는 52개 조합 전부에서 최선 또는 동률이다. GPT-5.5 direct chat의 6개 벤치마크 평균은 58.8%에서 82.3%로 23.5%p 올랐다.

여기서 규격 관점의 관심사는 최종 문서의 크기다. 학습이 끝난 스킬은 379 토큰에서 1,995 토큰 사이이고 중앙값이 약 920 토큰인데, 이는 [[agents/anthropic-2025-equipping-agents-for-the-real]]가 제시한 레벨 2 예산인 5,000 토큰 미만 구간에 그대로 들어간다. 즉 최적화가 찾아낸 지침의 분량이 규격이 권장한 예산 안에 자리한다.

편집이 적게 남는다는 점도 같은 방향을 가리킨다. 여섯 벤치마크에서 실제로 반영된 편집은 1개에서 4개뿐이고, 중앙값은 2.5개다. 검증을 통과하지 못한 편집은 배포 문서에 남지 않으므로 문서가 모든 제안의 합집합으로 부풀지 않는다.

두 논문은 같은 규격 위에서 반대 방향으로 간다. SkillComposer는 큰 library를 전제하고 조합을 예측하며, SkillOpt은 단일 스킬을 깊게 다듬는다. 각자가 스스로 밝힌 한계도 서로의 전제를 지목하는데, SkillOpt은 이질적 도메인에 단일 스킬이 부족할 수 있다고 적고 SkillComposer는 library를 학습 시점에 고정으로 둔다고 적는다.

## 인접 수단과의 경계

### MCP와의 역할 분담

두 개념이 자주 뒤섞이는 이유는 둘 다 에이전트의 능력을 바깥에서 공급하기 때문이다. [[agents/anthropic-2025-equipping-agents-for-the-real]]는 실체가 어디에 사는지로 선을 긋는다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg]]
*Figure 1: 왼쪽 에이전트 구성에는 스킬과 MCP 서버가 나란히 등록되지만, 스킬 디렉토리의 실체는 오른쪽 가상머신 파일 시스템에 있고 MCP 서버는 인터넷 쪽 원격에 남는다 (Anthropic 2025)*

| 비교 항목 | Agent Skills | MCP |
|---|---|---|
| 실체가 있는 곳 | 에이전트 가상머신의 파일 시스템 | 인터넷 쪽 원격 서버 |
| 공급하는 것 | 절차 지식과 조직 맥락 | 외부 도구와 데이터 연결 |
| 접근 수단 | 파일 읽기와 명령 실행 | 프로토콜 호출 |
| 에이전트 구성에서의 자리 | Equipped Skills 목록에 등록된다 | Equipped MCP servers 목록에 등록된다 |
| 규격 문서의 보유 여부 | 규격 저장소와 공식 사이트를 함께 커버한다 | 이 페이지의 커버 자료에 없다 |

두 요소는 경쟁 관계가 아니다. 같은 도식이 둘을 에이전트 구성 안에 나란히 등록하고, [[agents/anthropic-2025-equipping-agents-for-the-real]]는 MCP 서버와의 보완적 통합을 앞으로 탐색할 방향으로만 제시한다.

따라서 이 저장소가 보유한 근거로는 두 수단의 개념적 역할 분담까지만 말할 수 있다. 실제 운영에서 어느 쪽이 토큰을 덜 쓰는지 같은 비교 측정은 이 페이지의 커버 범위 밖이며, 관련 실측은 [[overviews/design-md-overview]]가 다룬다.

### DESIGN.md와의 경계

[[agents/google-labs-code-design-md]]는 디자인 시스템을 코딩 에이전트에 넘기기 위한 파일 규격이다. YAML 메타데이터와 Markdown 산문을 한 파일에 담는다는 점에서 `SKILL.md`와 겉모습이 비슷하다.

차이는 파일이 담는 것과 읽히는 방식에 있다. `SKILL.md`는 어떤 순서로 무엇을 할지를 적은 지시문이고, DESIGN.md는 색과 타이포그래피 같은 값을 규정하는 선언적 명세다.

로딩 방식의 차이가 더 중요하다. 같은 페이지가 밝히듯 DESIGN.md에는 부분만 참조하는 선택적 로딩 메커니즘이 스펙에 없어, 디자인 시스템이 커지면 컨텍스트 토큰 비용도 함께 커진다.

같은 Markdown 파일 인터페이스라도 레벨을 나눠 두었는지가 규모가 커질 때 컨텍스트 비용이 어떻게 늘어나는지를 가른다. Agent Skills가 레벨 1에 `description` 한 줄만 남긴 설계의 값어치가 이 대비에서 드러난다.

## 합의와 불일치

세 원전 자료는 서로 어긋나지 않는다. 규격 저장소와 공식 사이트가 같은 3단계 로딩을 적고, 발표글이 여기에 토큰 예산을 붙이는 관계다.

불일치는 실무 자료 쪽에서 나온다. [[agents/hada-2026-agent-skills]]가 정리한 커뮤니티 토론은 progressive disclosure의 실효성 자체를 되묻는다.

| 쟁점 | 공식 설계의 주장 | 실무 쪽 반론 |
|---|---|---|
| 컨텍스트 절약 | 레벨 1이 약 100 토큰이라 많이 갖춰도 가볍다 | 스킬 하나가 800줄을 넘기도 하고, 필요 없는 스킬까지 설치하면 토큰이 낭비된다 |
| 절차 강제 | 스킬이 절차를 실행 대상으로 만든다 | 규칙을 적용할지 판단하는 주체가 모델 자신이라 우회할 수 있다 |
| 선택의 신뢰성 | 작업이 `description`과 맞으면 해당 스킬이 걸린다 | 무엇이 맥락에 맞는지 판단하는 주체 역시 모델이다 |

세 번째 행이 두 주장을 한 지점으로 모은다. 규칙 준수 판단과 스킬 선택 판단이 모두 모델 안에서 일어나므로, 강제와 절약이 같은 신뢰 문제를 공유한다.

완화책도 같은 자료에 있다. 본문 전체가 아니라 메타데이터만 먼저 올리는 방식인데, 이는 규격의 레벨 1이 이미 하는 일이다. 따라서 논점은 메커니즘의 부재가 아니라 그 메커니즘이 작성 관행과 함께 가야 한다는 쪽에 가깝다.

[[agents/zhao-2026-generative-skill-composition-for-llm]]의 수치가 이 논쟁에 바깥 근거를 댄다. 196개를 전부 주입한 조건이 토큰을 35% 더 쓰고도 retrieval 방식보다 14.7%p 낮은 pass rate에 머무른다. 적어도 이 측정 조건에서는 절약과 성능이 맞바꾸는 관계가 아니다.

## 계보

progressive disclosure라는 이름은 스킬 포맷보다 먼저 나왔다. [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 2025년 9월에 이 용어를 쓰고, [[agents/anthropic-2025-equipping-agents-for-the-real]]이 2025년 10월 16일에 스킬 포맷을 발표한다.

같은 이름이지만 가리키는 대상이 조금 다르다. 앞의 글에서 progressive disclosure는 에이전트가 탐색을 통해 필요한 컨텍스트를 점진적으로 발견하는 방식이고, 뒤의 글에서는 파일 계층으로 고정된 3레벨 로딩이다.

두 용법을 잇는 것은 같은 제약이다. 앞의 글은 attention budget이 유한하고 컨텍스트가 길어질수록 정확한 recall이 떨어지는 context rot가 모든 모델에 나타난다고 적는데, 스킬의 레벨 구분은 이 제약 아래에서 상시 비용을 낮추는 장치다.

앞의 글이 제시한 두 확보 방식으로 보면 스킬의 위치가 더 분명해진다. 미리 올리는 pre-inference retrieval과 런타임에 가져오는 just-in-time 중, 스킬은 레벨 1만 미리 올리고 레벨 2와 3은 파일 시스템 탐색으로 가져오는 배합에 해당한다.

에이전트 최적화 전체 지도에서 스킬이 놓이는 자리는 [[overviews/prompt-to-loop-engineering-evolution-overview]]가 다루고, harness 층위에서의 배치는 [[overviews/agent-harness-engineering-overview]]가 다룬다.

## 학습 경로

규격을 먼저 이해하고 생태계와 운영으로 넘어가는 순서다. 아래 8단계는 frontmatter의 `study_path`와 같은 순서이며, 5단계와 6단계는 4단계를 기다리지 않고 2단계나 3단계 직후에 읽어도 된다.

1. [[agents/anthropic-2025-effective-context-engineering-for-ai|Effective Context Engineering]]. 왜 컨텍스트를 아껴야 하는지를 먼저 잡는다. attention budget은 모델이 대량의 컨텍스트를 파싱할 때 끌어다 쓰는 유한한 주의 자원을 뜻하며, 뒤에 나오는 모든 절약 장치의 전제다.
2. [[agents/anthropic-2025-equipping-agents-for-the-real|Equipping agents with Agent Skills]]. 규격의 설계 의도를 도식으로 확인한다. 레벨 1의 약 100 토큰과 레벨 2의 5,000 토큰 미만이 이후 모든 비교의 기준점이 된다.
3. [[agents/agentskills-agentskills|agentskills/agentskills]]. 벤더 중립 규격 본문을 읽는다. 폴더 레이아웃과 discovery, activation, execution 세 단계 이름이 여기서 확정된다.
4. [[agents/agentskills-io-2026-agent-skills-overview|agentskills.io]]. 규격이 선언에 그치지 않았다는 근거를 확인한다. 클라이언트 42개라는 수치보다 그 목록에 경쟁 벤더가 함께 있다는 구성이 핵심이다.
5. [[agents/mattpocock-skills|mattpocock/skills]]. 규격이 비워 둔 자리를 실무 규약이 어떻게 메우는지 본다. 같은 저장소를 Claude Code와 Codex 양쪽에 배포하지 못한 기록이 이식성의 실제 경계를 보여준다.
6. [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]]. 공식 설계에 대한 실무 반론을 듣는다. 800줄 스킬의 컨텍스트 비용과 강제 주체 문제가 앞 단계의 낙관을 조정한다.
7. [[agents/zhao-2026-generative-skill-composition-for-llm|SkillComposer]]. library가 196개로 커졌을 때 이름과 설명만 보고 고르는 방식이 어디서 멈추는지 수치로 본다. 전량 주입이 답이 아니라는 점도 같은 표에서 확인된다.
8. [[agents/yang-2026-skillopt-executive-strategy-for|SkillOpt]]. 스킬 본문을 사람이 쓰는 대신 학습 대상으로 두는 방향을 확인한다. 규격을 다루는 관점이 작성에서 최적화로 넘어가는 지점이다.

곁가지로 둘 자료가 셋 있다. [[agents/osmani-2026-agent-skills|Osmani의 다섯 원칙]]은 스킬 본문에 담을 내용을 정할 때, [[agents/imbad0202-academic-research-skills|Academic Research Skills]]는 코딩 밖 도메인에 적용할 때, [[agents/google-labs-code-design-md|DESIGN.md]]는 다른 파일 포맷과 경계를 그을 때 읽으면 된다.

## 한계

이 페이지의 근거는 저장소가 보유한 열두 편으로 한정된다. 남는 빈칸은 다음과 같다.

- **규격 전문이 없다.** 커버 자료 중 어느 것도 `agentskills.io/specification` 본문을 담지 않는다. 따라서 메타데이터 키가 `name`과 `description` 말고 무엇이 더 있는지, 버전 규칙과 호환성 보장이 어떻게 되는지는 확인할 수 없다.
- **포맷 자체의 효과를 잰 실험이 없다.** 세 원전 자료에 벤치마크가 없고, 스킬 적재 효과를 수치로 다루는 두 논문은 각자의 방법을 평가한 것이지 포맷을 평가한 것이 아니다.
- **채택 수치가 스냅샷이다.** 클라이언트 42개는 [[agents/agentskills-io-2026-agent-skills-overview]] 수집 시점의 값이고 목록이 열려 있어 하한이다. 각 클라이언트의 구현 충실도와 상호운용 여부는 그 자료가 검증하지 않는다.
- **이식 마찰의 사례가 두 건뿐이다.** Claude Code와 Codex 사이의 기록 두 건에서 얻은 관찰이므로, 다른 클라이언트 조합에서도 같은 종류의 마찰이 생기는지는 알 수 없다.
- **MCP와의 비교가 개념 수준이다.** 역할 분담은 [[agents/anthropic-2025-equipping-agents-for-the-real]]의 도식 한 장에 근거하며, 운영 비용을 견주는 측정은 이 페이지의 커버 밖이다.
- **자기 보고 수치가 섞여 있다.** SkillOpt과 SkillComposer의 향상 폭은 제안자 자신이 측정한 값이고, 실무 자료의 800줄 스킬과 컨텍스트 비용 진술은 발화자가 특정되지 않은 커뮤니티 증언이다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| `SKILL.md` | 스킬 폴더에 반드시 있어야 하는 파일. YAML의 `name`과 `description` 아래로 Markdown 지시문이 이어진다 |
| progressive disclosure | 필요한 시점에만 정보를 단계적으로 노출하는 설계. 스킬 포맷에서는 3레벨 로딩으로 구현된다 |
| discovery | 시작 시점에 모든 스킬의 `name`과 `description`만 읽는 단계. 레벨 1에 해당한다 |
| activation | 작업이 `description`과 맞을 때 `SKILL.md` 본문 전체를 읽는 단계. 레벨 2에 해당한다 |
| execution | 지시문을 따르며 번들된 스크립트와 참조 문서를 필요에 따라 읽는 단계. 레벨 3 이상에 해당한다 |
| 트리거 | 작업이 스킬 설명과 맞아 에이전트가 본문을 읽어 들이는 활성화 순간 |

## 관련 페이지

- [[agents/anthropic-2025-equipping-agents-for-the-real]]: 포맷의 설계 원전. 3레벨 토큰 예산과 트리거 시퀀스, MCP 배치 도식의 출처다
- [[agents/agentskills-agentskills]]: 벤더 중립 규격 저장소. 폴더 레이아웃과 로딩 3단계, 라이선스 분리를 정한다
- [[agents/agentskills-io-2026-agent-skills-overview]]: 공식 문서 사이트. 클라이언트 42개 목록과 적용 범위의 근거다
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: progressive disclosure의 상위 원리. attention budget과 context rot가 스킬 설계의 전제다
- [[agents/osmani-2026-agent-skills]]: 스킬 본문에 무엇을 담을지 정하는 다섯 원칙. 규격이 비워 둔 내용 규율을 채운다
- [[agents/hada-2026-agent-skills]]: 같은 원칙에 대한 실무 반론. 컨텍스트 비용과 강제 주체 문제를 제기한다
- [[agents/mattpocock-skills]]: 스킬 25개를 운영하며 만든 규약. 호출 주체 구분과 문서 계층, 두 harness 배포 마찰의 기록이다
- [[agents/imbad0202-academic-research-skills]]: 코딩 밖 도메인 적용 사례. SKILL.md 감량과 트리거 언어 편중을 실측으로 남긴다
- [[agents/ayghri-i-have-adhd]]: 응답 모양만 담은 스킬. 15개 harness 배포와 blind judge 평가, release gate 실패 기록을 남긴다
- [[agents/zhao-2026-generative-skill-composition-for-llm]]: library 196개 규모에서 스킬 선택 문제를 측정한 논문. 전량 주입의 비용을 보인다
- [[agents/yang-2026-skillopt-executive-strategy-for]]: 스킬 문서를 학습 대상으로 두는 논문. 최종 문서 분량과 편집 수용률이 규격 지침과 맞닿는다
- [[agents/google-labs-code-design-md]]: 같은 Markdown 인터페이스를 쓰지만 선택적 로딩이 없는 인접 포맷. 레벨 구분의 값어치를 대비로 보여준다
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 에이전트 최적화 4단계 진화 지도. 스킬이 전체 흐름의 어디에 놓이는지를 다룬다
- [[overviews/agent-harness-engineering-overview]]: harness 층위에서 스킬의 배치를 다루는 자매 페이지
- [[overviews/design-md-overview]]: DESIGN.md 계열을 다루는 자매 페이지. MCP와 스킬, DESIGN.md의 운영 비용 비교 실측을 담당한다
