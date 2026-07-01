---
title: "Agent Skills"
type: article
year: 2026
category: agents
source: osmani-2026-agent-skills.md
raw_path: raw/articles/osmani-2026-agent-skills.md
raw_filename: "osmani-2026-agent-skills.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/agent-skills/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-05-03"
tags: [agent-skills, claude-code, skills, sdlc, verification, anti-rationalization, progressive-disclosure, scope-discipline, software-engineering-at-google, harness-engineering]
---

## 요약 (Summary)

Addy Osmani(Google Chrome 엔지니어링 매니저)가 2026-05-03에 쓴 에세이. 한 문장에서 출발한다 — *"a senior engineer's job is mostly the parts that don't show up in the diff."* 시니어가 하는 일은 대부분 diff에 드러나지 않는 부분, 곧 spec·test·review·scope·verification이다. 제약이 없으면 AI 코딩 에이전트는 이걸 모두 건너뛰고 최단 경로로 코드만 뱉는다. junior가 저지르던 실패를 그대로 되풀이하는 셈이다. **Agent Skill**은 이 절차를 참고 문서가 아니라 실행 가능한 workflow로 못 박아, 시니어의 규율을 에이전트에 심는다.

## 주요 기여 (Key Contributions)

- **Skill은 essay가 아니라 workflow다.** checkpoint와 exit criteria를 박은 순서 있는 step으로, 에이전트는 긴 산문이 아니라 step에 반응한다.
- **5개 설계 원칙**이 Skill을 떠받친다 (아래 표).
- **6단계 SDLC**로 Skill을 짜고 각 단계를 슬래시 커맨드에 매핑한다.
- ***Software Engineering at Google*** 의 검증된 관행을 Skill 안에 인코딩한다.
- 에이전트 도구가 없는 팀이라도 이 원칙(anti-rationalization table·process workflow·필수 verification·progressive disclosure)을 handbook이나 runbook에 그대로 옮겨 쓸 수 있다.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 5개 설계 원칙

| 원칙 | 내용 |
|---|---|
| **Process over prose** | checkpoint를 둔 workflow가 참고용 에세이를 이긴다. 에이전트는 essay가 아니라 step을 따라 움직인다. |
| **Anti-rationalization table** | 흔한 변명과 반박을 짝지어 둔다. 예: *"이건 spec 쓰기엔 너무 사소해"* → *"그래도 acceptance criteria는 적용된다."* |
| **Verification is non-negotiable** | 모든 workflow는 구체적 증거(통과한 test·clean build·reviewer 승인)로 마무리된다. |
| **Progressive disclosure** | Skill 20개를 한꺼번에 로드하지 않고 맥락에 맞게 활성화해 token 효율을 지킨다. |
| **Scope discipline** | 요청받은 곳만 손댄다. 주변을 refactoring하거나 파일을 통째로 다시 쓰지 않는다. |

### 6단계 SDLC ↔ 슬래시 커맨드

| 단계 | 커맨드 | 역할 |
|---|---|---|
| Define | `/spec` | 요구사항·acceptance criteria 정의 |
| Plan | `/plan` | 작업 분해·계획 |
| Build | `/build` | 구현 |
| Verify | `/test` | test·build로 증거 확보 |
| Review | `/review` | 코드 리뷰 |
| Ship | `/ship` | 배포 |

### Google 관행 인코딩

Skill이 코드로 굳혀 담는 *Software Engineering at Google* 관행: **Hyrum's Law**(API 설계), **test pyramid**(~80/15/5), **~100줄 PR**(리뷰할 만한 크기 상한), **Chesterton's Fence**(이유를 모르는 코드는 함부로 걷어내지 않기), **trunk-based development**.

## 활용 방식 (Usage)

세 가지 모드로 쓴다.
1. **Claude Code marketplace 설치**
2. **markdown 투입** — Cursor 같은 도구에 파일로 떨군다
3. **spec 문서로 읽기** — 팀 관행의 기준선으로 삼는다

Skill은 harness engineering을 이루는 한 layer일 뿐이다. AGENTS.md(rulebook)·hooks(enforcement)·tools(action)·session log(memory)와 나란히 놓인다. 오래 도는 에이전트일수록 강제된 workflow에서 얻는 이득이 크다.

## 한계 (Limitations)

- 정량 데이터가 없어 도입 효과를 메트릭으로 환산하기 어렵다.
- 원칙 카탈로그 수준에 머물러, Skill과 일반 prompt template, connector와 Skill 사이의 경계가 흐릿하다.
- verification을 강제하면서도 그 verification 자체가 얼마나 믿을 만한지는 다루지 않는다 — 이 빈틈은 GeekNews 토론([[agents/hada-2026-agent-skills]])의 *"LLM은 규칙을 우회한다"* 회의론이 메운다.

## 관련 페이지 (Related Pages)

- [[agents/hada-2026-agent-skills]] — 같은 글의 한국 커뮤니티 요약에 비판적 토론(context 소모·규칙 우회 회의론)을 더한 짝 자료
- [[agents/osmani-2026-loop-engineering]] — 같은 저자의 후속 에세이로, Skill을 loop의 한 구성 요소로 확장한다
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — Boris Cherny의 *"give Claude a way to verify its own work"* 원칙을 실전으로 풀어낸 가이드. 본 글의 verification 원칙과 맞닿는다
- [[agents/lee-hoyeon-2026-harness-engineering]] — Skill을 harness 6축의 하나로 자리매김하는 상위 프레임
