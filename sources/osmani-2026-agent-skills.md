---
title: "Agent Skills"
type: article
year: 2026
category: agents
raw_path: raw/articles/osmani-2026-agent-skills.md
raw_filename: "osmani-2026-agent-skills.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/agent-skills/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-05-03"
tags: [agent-skills, claude-code, skills, sdlc, verification, anti-rationalization, progressive-disclosure, scope-discipline, software-engineering-at-google, harness-engineering]
---

## 한 줄 요약 (One-line Summary)

Addy Osmani가 2026-05-03에 올린 에세이. AI 코딩 에이전트는 spec·test·review·verification을 건너뛰고 최단 경로로 코드만 뱉는 junior 실패 모드에 빠지기 쉬운데, 이를 막으려면 senior 엔지니어의 절차를 **workflow로 강제하는 Skill**이 필요하다는 주장이다. Skill을 떠받치는 5개 설계 원칙과 6단계 SDLC 구성을 함께 제시한다.

## 1. 자료 정보 (Document Information)

- **저자**: Addy Osmani (Google Chrome 엔지니어링 매니저)
- **게시일**: 2026-05-03
- **매체**: addyosmani.com 개인 블로그
- **URL**: https://addyosmani.com/blog/agent-skills/
- **분량**: 중편 에세이
- **핵심 명제**: *"a senior engineer's job is mostly the parts that don't show up in the diff."* — 시니어의 일은 대부분 diff에 안 드러나는 부분(spec·test·review·scope·verification)이다.
- **면책 고지**: 저자 개인 견해 — Google 입장 아님

## 2. 주요 기여 (Key Contributions)

1. **문제 정의** — 제약이 없으면 에이전트는 spec·test·review·verification을 생략한 채 최단 경로로 작업을 끝내 버린다. junior 엔지니어의 실패 모드를 그대로 재현하는 셈이다.
2. **Skill = workflow, not essay** — Skill은 참고용 에세이가 아니라 checkpoint가 박힌 실행 가능한 workflow여야 한다. 에이전트는 긴 산문이 아니라 순서 있는 step에 반응하기 때문이다.
3. **5개 설계 원칙 명명** — process over prose, anti-rationalization table, non-negotiable verification, progressive disclosure, scope discipline.
4. **6단계 SDLC로 Skill 조직화** — Define·Plan·Build·Verify·Review·Ship을 각각 슬래시 커맨드에 매핑한다.
5. **Google 엔지니어링 관행 인코딩** — *Software Engineering at Google*의 Hyrum's Law, test pyramid, ~100줄 PR, Chesterton's Fence, trunk-based development를 Skill 안에 심는다.
6. **에이전트 없는 팀에도 적용** — anti-rationalization table, process 기반 workflow, 필수 exit criteria로서의 verification, progressive disclosure는 사람으로 굴러가는 조직의 handbook·runbook에도 그대로 옮겨 쓸 수 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 5개 설계 원칙 (Load-Bearing Design Principles)

| 원칙 | 내용 |
|---|---|
| **Process over prose** | checkpoint가 있는 workflow가 참고 에세이보다 낫다. 에이전트는 essay가 아니라 step을 따라 움직이기 때문이다. |
| **Anti-rationalization table** | 각 Skill에 흔한 변명과 반박을 짝지어 넣는다. 예: *"이건 spec 쓰기엔 너무 사소해"* → *"그래도 acceptance criteria는 적용된다."* |
| **Verification is non-negotiable** | 모든 workflow는 구체적 증거(통과한 test·clean build·reviewer 승인)로 끝난다. |
| **Progressive disclosure** | Skill 20개를 한꺼번에 로드하지 않고 맥락에 따라 활성화해 token 효율을 지킨다. |
| **Scope discipline** | *"요청받은 곳만 건드린다."* 주변부 refactoring이나 파일 통째 재작성으로 번지지 않게 한다. |

### 3.2 6단계 SDLC ↔ 슬래시 커맨드

| 단계 | 커맨드 | 역할 |
|---|---|---|
| Define | `/spec` | 요구사항·acceptance criteria 정의 |
| Plan | `/plan` | 작업 분해·계획 |
| Build | `/build` | 구현 |
| Verify | `/test` | test·build로 증거 확보 |
| Review | `/review` | 코드 리뷰 |
| Ship | `/ship` | 배포 |

표준 엔지니어링 조직의 workflow를 그대로 본뜬 구성이다.

### 3.3 Google 관행 인코딩

Skill이 코드로 굳혀 담는 *Software Engineering at Google* 관행:
- **Hyrum's Law** — API 설계
- **Test pyramid** — 대략 80/15/5 분할
- **~100줄 PR** — 리뷰 가능한 크기 상한
- **Chesterton's Fence** — 이유를 모르는 코드는 함부로 걷어내지 않는다
- **Trunk-based development**

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

의견 에세이인 만큼 정량 벤치마크는 없다. 검증 가능한 사실 인용은 두 축으로 정리된다.

- Skill을 쓰는 세 가지 방식: (1) Claude Code marketplace 설치, (2) Cursor 등 도구에 markdown 투입, (3) 팀 관행을 담은 spec 문서로 읽기.
- Skill은 harness engineering의 한 layer일 뿐이다 — AGENTS.md(rulebook)·hooks(enforcement)·tools(action)·session log(memory)와 나란히 놓인다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

본문 스스로 짚는 한계는 뚜렷하지 않고, 무게 중심은 처방(prescription) 쪽에 쏠려 있다. 자료 관점에서 남는 약점은 다음과 같다.

- 정량 데이터가 없어 Skill 도입 효과를 측정 메트릭으로 환산하지 못한다.
- 원칙 카탈로그 수준에 머물러, Skill과 일반 prompt template의 경계나 connector와 Skill의 구분이 느슨하다.
- verification을 강제한다지만 그 verification 자체의 신뢰성(누가 검증을 검증하나)은 다루지 않는다 — 이 지점은 GeekNews 토론([[agents/hada-2026-agent-skills]])이 보완한다.

결론의 방향은 이렇다. 오래 도는 에이전트일수록 강제된 workflow의 덕을 크게 본다.

## 6. 관련 연구 (Related Work)

- **Software Engineering at Google** — Skill이 인코딩하는 관행의 1차 출처.
- **Claude Code / AGENTS.md / MCP** — Skill이 얹히는 harness 층위.
- 본 wiki 연관:
  - [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]] — 같은 글의 한국 커뮤니티 요약 + 비판적 토론(context 소모·LLM 규칙 우회 회의론)을 더한 짝 자료.
  - [[agents/osmani-2026-loop-engineering|Loop Engineering (Osmani)]] — 같은 저자의 후속 에세이. Skill을 loop의 한 구성 요소로 다룬다.
  - [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt (Patel)]] — Boris Cherny의 *"give Claude a way to verify its own work"* 원칙을 실전으로 풀어쓴 가이드. 본 글의 verification 원칙과 겹친다.
  - [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연)]] — Skill을 harness 6축 중 하나로 위치시키는 상위 프레임.

## 7. 용어집 (Glossary)

- **Agent Skill** — senior 엔지니어의 절차를 checkpoint·exit criteria가 있는 workflow로 강제하는, frontmatter 붙은 markdown 단위.
- **Process over prose** — 참고 에세이보다 실행 가능한 step workflow가 낫다는 원칙.
- **Anti-rationalization table** — 흔한 변명과 미리 쓴 반박을 짝지어 둔 표. 에이전트의 shortcut 합리화를 차단한다.
- **Progressive disclosure** — Skill을 전부 로드하지 않고 맥락에 따라 활성화해 token을 아끼는 방식.
- **Scope discipline** — 요청받은 범위만 수정하고 인접 파일을 건드리지 않는 규율.
- **Hyrum's Law** — 관찰 가능한 API 동작은 누군가 반드시 의존하게 된다는 경험칙.
- **Chesterton's Fence** — 존재 이유를 모르는 것을 함부로 제거하지 말라는 원칙.
- **Harness engineering** — Skill·rulebook·hook·tool·memory를 조합해 에이전트 실행 환경을 짓는 상위 작업.
