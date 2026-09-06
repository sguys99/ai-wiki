---
title: "Agent Skills (GeekNews)"
type: article
year: 2026
category: agents
raw_path: raw/articles/hada-2026-agent-skills.md
raw_filename: "hada-2026-agent-skills.md"
source_collection: external
author: "GN⁺ (@neo)"
url: "https://news.hada.io/topic?id=29200"
publisher: "GeekNews (news.hada.io)"
publication_date: "2026-05"
tags: [agent-skills, geeknews, claude-code, cursor, gemini-cli, codex, aider, windsurf, opencode, verification, anti-rationalization, progressive-disclosure, community-discussion]
---

## 한 줄 요약 (One-line Summary)

Addy Osmani의 글 "Agent Skills"를 GeekNews가 요약하고 독자 토론을 덧붙인 짝 자료다. 스킬 20개와 6개 lifecycle 단계, 슬래시 커맨드 7개, MIT 라이선스 같은 정량 스펙과 Cursor, Gemini CLI, Codex, Aider, Windsurf, OpenCode로 옮겨 쓰는 경로를 한자리에 모으고, "LLM은 문서가 아무리 정교해도 규칙을 우회한다"는 회의론까지 함께 싣는다.

## 1. 자료 정보 (Document Information)

| 항목 | 값 |
|---|---|
| 작성 | GN⁺ (@neo) |
| 매체 | GeekNews (news.hada.io), topic id=29200 |
| 게시 | 약 2개월 전 (2026-05경), 10 point |
| 원문 | Addy Osmani, "Agent Skills" (addyosmani.com/blog/agent-skills) |
| 성격 | 큐레이션 요약과 댓글 토론 |

원문을 다룬 페이지는 [[agents/osmani-2026-agent-skills]]에 따로 정리되어 있다.

## 2. 주요 기여 (Key Contributions)

### 2.1 문제 정의

Agent Skills를 "구조화된 워크플로로 시니어 엔지니어의 절차를 강제하는 scaffold 프레임워크"로 정의한다. 에이전트가 건너뛰기 쉬운 절차로는 spec 작성, 테스트, 코드 리뷰, trust boundary review를 든다. 제약이 없으면 에이전트는 최단 경로로 과제를 끝내려 하고, 그 과정에서 문서와 증거를 남기지 않는다는 진단이다.

### 2.2 정량 스펙

저장소는 스킬 20개를 6개 lifecycle 단계(Define, Plan, Build, Verify, Review, Ship)로 묶고 슬래시 커맨드 7개를 함께 제공한다. 라이선스는 MIT이고 공개되어 있다.

### 2.3 이식 경로

특정 도구 전용이 아니라는 점을 도입 방식별로 나눠 적는다.

| 도입 방식 | 대상 도구 |
|---|---|
| 마켓플레이스 설치 | Claude Code |
| 규칙 디렉터리에 배치 | Cursor (`.cursor/rules/`) |
| markdown을 그대로 투입 | Gemini CLI, Codex, Aider, Windsurf, OpenCode |

### 2.4 비판적 토론 수집

요약만으로는 드러나지 않는 반론을 함께 싣는다. LLM은 규칙을 근본적으로 우회하므로 사람 리뷰가 여전히 필수라는 지적, 그리고 긴 에이전트 세션이 "fake productivity"로 비칠 수 있다는 우려가 대표적이다.

### 2.5 실무 트레이드오프

스킬 하나가 800줄을 넘기도 해서 컨텍스트를 크게 차지한다. 필요하지 않은 스킬까지 설치하면 토큰과 컨텍스트가 낭비되므로, 전부 필수로 설치하기보다 참고 패턴으로 다루는 편이 낫다는 의견이 나왔다. frontmatter만 로드하는 방식은 컨텍스트 오염을 어느 정도 줄여 준다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 스킬의 형식

스킬은 frontmatter가 붙은 markdown 파일이며, 참고 문서가 아니라 워크플로로 동작한다. 순서가 정해진 step, 증거를 만들어 내는 checkpoint, 명시적인 exit criteria를 담는다.

### 3.2 5개 설계 원칙

| 원칙 | 내용 |
|---|---|
| Process over prose | 에세이가 아니라 에이전트가 실행할 수 있는 워크플로로 쓴다 |
| Anti-rationalization table | 흔한 shortcut 변명과 그에 대한 반박을 미리 짝지어 표로 둔다 |
| Verification is non-negotiable | verification을 생략할 수 없게 하고 구체적 증거를 요구한다 |
| Progressive disclosure | 현재 과제 맥락에 맞는 스킬만 단계적으로 노출한다 |
| Scope discipline | 변경 범위를 요청받은 범위 안으로 제한한다 |

### 3.3 Google 엔지니어링 관행과의 정합

검증된 SDLC 관행에 매핑된다고 설명한다. 언급되는 항목은 Hyrum's Law, test-driven development, Chesterton's Fence, trunk-based development다. 리뷰 기준으로는 Google의 "~100줄 PR" 관행과 code-as-liability 원칙을 함께 인용한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 실무자 증언과 댓글 토론이 그 자리를 대신한다.

| 입장 | 요지 |
|---|---|
| 찬성 | 프로덕션 배포에서 "의외로 효과적"이라는 보고가 있다. 완벽보다 기대값(expected value)이 중요하고, 기준선 신뢰도가 오르는 것만으로 의미가 있다. 사람 팀을 관리하던 관행이 에이전트에도 그대로 적용된다 |
| 반대 | 규칙을 적용할지 결정하는 주체가 LLM 자신이라 강제가 실제로 작동하는지 의문이다. 문서가 복잡해질수록 우회할 여지도 넓어진다. 사람 리뷰는 여전히 필수다 |
| 구현 우려 | 800줄을 넘는 스킬이 컨텍스트를 크게 차지한다. 불필요한 스킬의 과다 설치는 토큰 낭비이므로 전량 설치보다 참고 패턴이 낫다. frontmatter만 로드하면 오염이 완화된다 |
| 중립 | 특정 도구보다 워크플로 구조 자체가 중요하다. 인프라와 소프트웨어에서 이미 확립된 자동화 원칙과 같은 성격이며, 엄격한 프로세스 규율과 함께 갈 때 생산성 향상으로 인정할 만하다 |

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 2차 요약이라 원문의 논증 전개가 압축되어 있다. 인용의 정확한 문맥은 원문 페이지에서 확인해야 한다.
- 댓글 요약은 발화자와 수치가 특정되지 않아 개별 주장의 출처를 되짚기 어렵다.
- 슬래시 커맨드를 7개로 적지만 lifecycle 단계는 6개다. 나머지 하나가 어느 단계에 붙는지는 이 자료만으로 확인되지 않는다.
- 800줄 스킬과 컨텍스트 오염 문제는 progressive disclosure 원칙과 정면으로 부딪친다. 스킬 설계에서 아직 해소되지 않은 긴장이다.

## 6. 관련 연구 (Related Work)

- [[agents/osmani-2026-agent-skills]]: 이 자료가 요약하고 토론하는 원문.
- [[agents/osmani-2026-loop-engineering]]: 같은 저자의 후속 글로, 스킬을 loop 구성 요소로 확장한다.
- [[agents/anthropic-2025-equipping-agents-for-the-real]]: progressive disclosure를 스킬 로딩 구조로 설명한 문서.
- [[agents/agentskills-agentskills]]: 스킬 폴더 레이아웃 표준.
- [[agents/agentskills-io-2026-agent-skills-overview]]: 스킬 포맷의 채택 생태계 정리.
- [[agents/patel-2026-beyond-the-prompt-claude-code]]: Claude Code에서 verification과 스킬을 실전에 적용하는 가이드.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]]: harness 변경의 이득을 회의적으로 계측하는 시각으로, 이 자료의 규칙 우회 회의론과 통한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| GeekNews (news.hada.io) | 한국 개발자 커뮤니티의 뉴스 큐레이션 사이트. GN⁺(@neo)가 운영한다 |
| anti-rationalization table | shortcut을 정당화하는 흔한 변명과 그 반박을 미리 짝지어 둔 표 |
| exit criteria | 워크플로 한 단계를 끝냈다고 선언할 수 있는 명시적 종료 조건 |
| trust boundary review | 신뢰 경계를 넘나드는 입력과 권한을 점검하는 리뷰 |
| fake productivity | 긴 에이전트 세션이 실제 성과 없이 바빠 보이기만 하는 현상을 가리키는 토론 용어 |
| code-as-liability | 코드는 자산이 아니라 유지와 리뷰 부담이라는 Google의 관점 |
