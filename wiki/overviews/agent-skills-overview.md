---
title: "Agent Skills — 설계 원전·오픈 표준·생태계 개괄"
type: overview
year: 2026
category: overviews
source_collection: synthesis
tags: [agent-skills, skill-md, progressive-disclosure, open-standard, ecosystem, mcp, context-engineering]
figures:
  - id: fig01
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig01.jpg
    caption: "Agent + Skills + Virtual Machine 아키텍처 (Anthropic 2025)"
    strategy: manual
    curated: true
  - id: fig04
    file: assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg
    raw: raw/articles/anthropic-2025-equipping-agents-for-the-real-figures/fig04.jpg
    caption: "Progressive disclosure 레벨별 토큰 예산 (Anthropic 2025)"
    strategy: manual
    curated: true
---

## 개괄 (Overview)

Agent Skills는 자료 하나만 봐서는 감이 잘 안 온다. 같은 포맷이라도 세 각도에서 봐야 비로소 그림이 맞아떨어진다. 왜 이렇게 설계됐는지(Anthropic 발표글), 규격이 무엇인지(agentskills 저장소), 누가 쓰는지(agentskills.io 생태계)다. 이 페이지는 그 세 축을 한 장에 겹쳐 놓았다.

한 문장으로 줄이면 이렇다. 스킬이란 `SKILL.md`를 품은 폴더 하나이고, progressive disclosure로 컨텍스트를 아끼며, 이제는 Anthropic 밖 40여 도구가 함께 쓰는 오픈 표준이다.

## 세 자료 한눈에 (Three Sources)

| 축 | 자료 | 유형 | 답하는 질문 |
|---|---|---|---|
| 설계 원전 | [[agents/anthropic-2025-equipping-agents-for-the-real]] | article (2025-10-16) | 왜·어떻게 동작하나 (도식 6종) |
| 오픈 표준 | [[agents/agentskills-agentskills]] | repo | 규격이 무엇인가 (Apache-2.0/CC-BY-4.0) |
| 생태계 | [[agents/agentskills-io-2026-agent-skills-overview]] | article | 누가 채택했나 (40여 클라이언트) |

## 축 1 — 설계: 파일 폴더와 progressive disclosure

스킬의 정의는 의외로 소박하다. `SKILL.md`(필수) 하나만 담은 폴더면 되고, scripts·references·assets는 필요할 때 곁들이면 그만이다. 별도 런타임도 없다. 에이전트가 파일 시스템만 쓸 수 있으면 그걸로 끝이다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig01.jpg]]
*Figure 1: 스킬 디렉토리는 에이전트 가상머신(Bash·Python·Node.js)의 파일 시스템에 살고, MCP 서버는 그 바깥 인터넷에 놓인다 — 둘의 역할 분담이 한 그림에 담겨 있다 (Anthropic 2025)*

설계의 핵심은 **progressive disclosure**다. 스킬을 통째로 컨텍스트에 올리지 않는다는 발상이다. 처음엔 이름과 설명만(~100 토큰) 읽고, 태스크가 맞으면 본문을(<5k), 본문이 다른 파일을 가리키면 그 부속 파일을 그때 가서 읽는다. 그래서 스킬을 수십 개 장착해도 발자국이 작다.

![[assets/anthropic-2025-equipping-agents-for-the-real/fig04.jpg]]
*Figure 2: 레벨별 토큰 예산 — 이 계층화가 "많이 쥐고도 가볍다"를 가능케 한다 (Anthropic 2025)*

여기서 한 가지가 더 있다. 스킬은 문서만 담는 게 아니라 **실행 코드**도 담는다. 폼 필드를 토큰으로 하나하나 추론하느니 pypdf 스크립트에 넘겨버리면 빠르고 결과도 일정하다.

## 축 2 — 표준: Anthropic 밖으로 나온 규격

두 번째 자료가 중요한 건 소유권 때문이다. 포맷을 만든 건 Anthropic이지만, 저장소는 이걸 "released as an open standard"라고 못박아 둔다. 특정 제품의 기능이 아니라 생태계가 함께 쓰는 공통 규격이라는 선언인 셈이다. 코드는 Apache-2.0, 문서는 CC-BY-4.0으로 풀렸고, 로딩 과정은 discovery → activation → execution 3단계로 규정돼 있다.

## 축 3 — 생태계: cross-vendor 표준의 증거

선언만으로 표준이 되는 건 아니다. 그 증거를 대는 게 세 번째 자료(agentskills.io Client Showcase)다. OpenAI Codex, Google Gemini CLI, Mistral Vibe, Microsoft(GitHub Copilot·VS Code), JetBrains Junie 같은 **경쟁 벤더**들이 하나같이 같은 포맷을 지원한다. 코딩 에이전트에 그치지 않고 IDE·데이터 플랫폼·헬스케어까지 40여 클라이언트가 이름을 올렸다.

## Skills vs MCP — 헷갈리는 경계

두 개념은 자주 뒤섞인다. 발표글은 여기에 선을 분명히 긋는다. **MCP가 외부 연결**이라면(도구·데이터를 에이전트 바깥에서 끌어온다), **스킬은 절차적 지식**이다(에이전트 컴퓨터의 파일 시스템에 절차를 얹는다). 서로 경쟁하는 게 아니라 보완하는 관계이고, Anthropic도 둘을 어떻게 통합할지는 앞으로의 탐색 과제로 남겨뒀다.

## 남는 경계 (Caveats)

- **정량 근거 부재**: 발표글에 벤치마크는 없다. 효율·신뢰성이 좋아졌다는 건 서술로만 남은 주장이다.
- **트리거는 네이밍에 달림**: name·description이 부실하면 스킬이 아예 안 걸린다.
- **보안 감사 전제**: 임의 스킬을 실행하려면 코드 의존성과 네트워크 연결을 먼저 감사해야 한다.
- **쇼케이스의 한계**: 채택했다는 사실만 보여줄 뿐, 구현이 얼마나 충실한지, 상호운용은 되는지는 검증되지 않았다.

## 계보 안에서 (Lineage)

progressive disclosure가 갑자기 튀어나온 개념은 아니다. 같은 저장소의 [[agents/anthropic-2025-effective-context-engineering-for-ai]]가 말하는 컨텍스트 큐레이션 원리를 스킬 포맷으로 구체화한 것에 가깝다. 더 큰 지도를 놓고 보면, [[overviews/prompt-to-loop-engineering-evolution-overview]]의 Prompt → Context → Harness → Loop 진화에서 스킬은 "Context/Harness" 단계에 자리한다.

## 관련 페이지 (Related Pages)

- [[agents/anthropic-2025-equipping-agents-for-the-real]] — 설계 원전 (도식 6종)
- [[agents/agentskills-agentskills]] — 오픈 표준 스펙 저장소
- [[agents/agentskills-io-2026-agent-skills-overview]] — 생태계 쇼케이스
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — progressive disclosure의 상위 원리
- [[overviews/prompt-to-loop-engineering-evolution-overview]] — 에이전트 최적화 4단계 진화 지도
