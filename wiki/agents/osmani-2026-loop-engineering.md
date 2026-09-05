---
title: "Loop Engineering (Addy Osmani, 2026-06-07)"
type: article
year: 2026
category: agents
raw_path: raw/articles/osmani-2026-loop-engineering.md
raw_filename: "osmani-2026-loop-engineering.md"
source_collection: external
source: osmani-2026-loop-engineering.md
author: "Addy Osmani"
url: "https://addyosmani.com/blog/loop-engineering/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-06-07"
tags: [loop-engineering, claude-code, codex, anthropic, sub-agents, worktrees, skills, mcp, connectors, automations, slash-loop, slash-goal, peter-steinberger, boris-cherny, verification, comprehension-debt, paradigm-shift]
---

## 요약 (Summary)

Google Chrome 엔지니어링 매니저 **Addy Osmani**가 2026-06-07 개인 블로그에 올린 짧은 에세이다. **"prompting coding agents"에서 "designing loops that prompt your agents"로 넘어가는 패러다임 전환**에 *Loop Engineering*이라는 이름을 붙였다. Peter Steinberger와 Boris Cherny(Anthropic)가 던진 문구가 출발점이며, 글 전체는 그 시각을 **5 + 1 구성 요소 카탈로그**와 **3대 한계**로 압축한다.

5 요소는 (1) **Automations**(scheduled discovery·triage가 작업을 표면화), (2) **Worktrees**(격리된 병렬 작업환경으로 파일 충돌 방지), (3) **Skills**(재유도 비용 제거를 위한 `SKILL.md`), (4) **Plugins/Connectors**(MCP로 issue tracker·staging API·notification 연결), (5) **Sub-agents**(implementation과 evaluation을 분리해 self-grading bias 제거)다. 여기에 **(6) persistent state**(markdown 또는 project board)가 session 간 메모리 부재를 메운다.

Claude Code의 두 슬래시 커맨드는 역할이 갈린다. `/loop`은 **cadence-based**(시간 주기), `/goal`은 **conditional completion**(조건 충족 시 종료 + 검증을 별도 모델에 위임)이다. 저자가 *"가장 영향력 큰 구조적 혁신"* 으로 꼽는 것은 sub-agent로 확보하는 **verification distance**다. 같은 모델이 제 작업을 후하게 평가하는 self-grading bias를 separate-instruction sub-agent가 차단한다.

결론은 *"leverage 재배치"* 다. *"The leverage point relocated, but the responsibility for quality remained stationary—held exclusively by the engineer."* loop은 일을 없애지 않고 control point만 옮기며, 같은 loop이 한 엔지니어에게는 가속기로, 다른 엔지니어에게는 이해 회피 수단으로 작동한다.

> **2차 자료 주의**: 본문은 짧은 의견 에세이라 **정량 데이터·1차 출처 인용이 거의 없다**. *"Peter Steinberger·Boris Cherny"* attribution도 구체적 영상·URL·timestamp 없이 텍스트 인용만 달려 있다. *"5 essential components"* 의 경계 정의는 카탈로그 수준이라 connector vs plugin, skill vs prompt template의 정밀 구분은 본문에 없다. 본문이 거론하는 도구 기능(`/loop`·`/goal`·MCP·SKILL.md)은 2026-06 시점 Claude Code·Codex 기준이라 버전에 따라 달라질 수 있다.

## 주요 기여 (Key Contributions)

1. **"Loop Engineering" 용어화** — Steinberger·Cherny가 던진 *"design loops that prompt your agents"* 라는 한 문장을 단일 패러다임 명사로 묶었다. prompt engineering의 다음 진화 단계로 자리매김.
2. **5 + 1 구성 요소 카탈로그** — Automations · Worktrees · Skills · Plugins/Connectors · Sub-agents + Persistent state. *모든 functional loop이 갖춰야 할 최소 골격* 을 명시한다.
3. **`/loop` vs `/goal` 분리** — cadence-based execution과 conditional completion(검증을 secondary model에 위임)으로 두 슬래시 커맨드의 의미 경계를 정리한다.
4. **Sub-agent = verification distance** — implementation과 evaluation을 떼어놓는 일이 *"가장 영향력 큰 구조적 혁신"*. self-grading bias 차단.
5. **Concrete loop 시나리오 1개** — daily automated triage → CI/issue/commit 점검 → persistent state 기록 → worktree에 fix-drafter + reviewer sub-agent 분기 → connector가 PR 자동 생성 → 미해결만 사람에게.
6. **3대 한계 명명** — verification burden(인간 책임), comprehension debt(이해 격차 누적), comfortable passivity(편한 자동화의 인지적 disengagement).
7. **"Control point shift" 결론** — loop은 일을 없애지 않고 control point만 옮기며, 결과를 가르는 것은 *engineer judgment*라는 비대칭 비유.

## 방법론 및 아키텍처 (Methodology and Architecture)

### 5+1 요소의 역할 분담

| 요소 | 목적 | 구현 매핑 |
|---|---|---|
| **Automations** | "loop의 심장" — scheduled discovery·triage가 사람 개입 없이 작업을 표면화 | Claude Code `/loop` (cadence), `/goal` (conditional), Codex 앱의 recurring prompts |
| **Worktrees** | 다중 에이전트의 동시 파일 수정 충돌 방지 | Git worktree — repo history는 공유하되 working directory는 격리 |
| **Skills** | architectural decision·convention을 재유도하는 토큰 낭비 제거 | 양 플랫폼 공통 구조: `SKILL.md` + 보조 스크립트가 든 폴더 |
| **Plugins / Connectors** | filesystem 너머의 외부 시스템과 통합 | MCP 프로토콜 — issue tracker 조회, staging API 호출, notification 트리거 |
| **Sub-agents** | implementation과 evaluation 분리 → self-grading bias 제거 | 별도 instruction의 sub-agent. `/goal`은 내부적으로 stopping condition 평가를 별도 모델에 위임 |
| **(6) Persistent state** | session 간 메모리 부재 보완 | markdown 파일 또는 project board에 findings·상태 기록 |

### Concrete loop architecture (저자가 든 단일 시나리오)

```
[Daily automated run]
    └─ Triage skill 실행
        ├─ CI failures 조회
        ├─ Open issues 조회
        └─ Recent commits 조회
    └─ findings를 persistent state에 기록
    └─ actionable item 발견 시:
        └─ 격리된 worktree spawn
            ├─ Sub-agent #1: fix drafting
            └─ Sub-agent #2: project standards·test suite 대비 review
        └─ Connector 호출:
            ├─ PR 자동 생성
            └─ 트래킹 시스템 갱신
    └─ 미해결 항목 → 사람 리뷰 큐
```

### Control structure inversion

| | 기존 (prompt engineering) | 이후 (loop engineering) |
|---|---|---|
| 개입 단위 | 매 prompt마다 작성·검토·수정 요청 | loop architecture를 1회 설계 |
| Discovery | 사람이 작업을 정의 | automation이 작업을 표면화 |
| Verification | 사람이 매 출력 검토 | sub-agent가 별도 instruction으로 평가, 사람은 최종 판단만 |
| 시스템 정체성 | "더 잘 prompting하는 사람" | "더 잘 loop를 설계하는 engineer" |

## 결과 (Results)

본문은 의견·정리 에세이라 **정량 벤치마크가 없다**. 검증 가능한 외부 사실 인용은 두 가지뿐이다.

- Peter Steinberger·Boris Cherny(Anthropic)가 *"design loops that prompt your agents"* 라는 표현을 썼다는 attribution.
- Claude Code와 Codex 앱이 recurring prompt를 지원한다는 도구 기능.

throughput 향상이나 결함률 감소 같은 수치 비교는 없다. *Loop Engineering*의 효과는 본문에서 카탈로그·시나리오·논증으로만 풀이되고, 측정 가능한 메트릭으로 환산되지 않는다.

## 한계 (Limitations)

저자가 본문에서 직접 명명한 3가지.

1. **Verification burden remains human responsibility.** unattended loop은 unattended mistake도 함께 낳는다. 보조 검증 sub-agent가 confidence를 보강해도 인간 judgment를 대신하지 못한다.
2. **Comprehension erosion accelerates.** 코드 생성 속도가 빨라질수록 deployed system과 developer understanding 사이에 *"comprehension debt"* 가 쌓인다. 적극적 리뷰만이 그 누적을 막는다.
3. **Comfortable passivity becomes dangerous.** loop 실행의 *seductive ease* 가 인지적 disengagement를 부르고, 그 결과 출력을 무비판적으로 받아들이게 된다.

자료 자체의 한계는 [[sources/osmani-2026-loop-engineering|sources 5절]] 참조. 분량이 짧고 1차 출처 인용 trace가 약하며, *5 essential components* 의 경계 정의(connector vs plugin, skill vs prompt template)가 본문에 없다.

## 핵심 통찰 (Key Insight)

> *"The leverage point relocated, but the responsibility for quality remained stationary—held exclusively by the engineer."*

같은 loop을 구현한 두 엔지니어가 정반대 결과를 낸다. 한 명은 *이해된 일을 가속*하고, 다른 한 명은 *이해를 회피*한다. 도구는 중립적이고, 결과를 가르는 것은 *engineer judgment*다. 이 비대칭이 본 자료의 가장 강한 결론이다.

## 관련 페이지 (Related Pages)

- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel 2026-05-26)]] — 본 자료의 5요소(skills·subagents·worktree·MCP·`/goal`)를 한 단계 더 세밀하게 푼 실전 가이드. Boris Cherny의 *"give Claude a way to verify its own work"* 원칙(self-verification → 2~3x 품질)이 본 자료의 *sub-agent = verification distance*와 같은 정신.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연 2026)]] — *Prompt → Context → Harness Engineering* 3단계 진화 모델. Osmani의 *"Loop"* 은 Lee의 *"Harness"* 6축(구조·맥락·계획·실행·검증·개선) 중 **실행+개선** 축에 가깝다. 같은 그림을 다른 이름으로 본 자매 자료.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin 2026)]] — 하네스(loop) 변경을 가치 측정과 분리하라는 비판적 시각. Osmani가 경계한 *comfortable passivity* 와 같은 문제를 측정 관점에서 다룬다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows into LLM (Dennis 2026)]] — agentic workflow를 *컴파일* 대상으로 본 시각. loop 설계를 형식화하려는 시도.
- [[agents/rahman-2026-a-practical-guide-to-becoming|A Practical Guide to Becoming (Rahman 2026)]] — 에이전틱 개발 실무 가이드 전반. loop 구축의 인간 측면 배경.
