---
title: "Loop Engineering"
type: article
year: 2026
category: agents
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/osmani-2026-loop-engineering.md
raw_filename: "osmani-2026-loop-engineering.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/loop-engineering/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-06-07"
tags: [loop-engineering, claude-code, codex, anthropic, sub-agents, worktrees, skills, mcp, connectors, automations, slash-loop, slash-goal, peter-steinberger, boris-cherny, verification, comprehension-debt, paradigm-shift]
---

## 한 줄 요약 (One-line Summary)

Google Chrome 엔지니어링 매니저 Addy Osmani가 2026-06-07에 올린 짧은 에세이. **"prompting coding agents"에서 "designing loops that prompt your agents"로 넘어가는 패러다임 전환**을 *Loop Engineering*이라 부르고, 구성 요소(automations·worktrees·skills·plugins·sub-agents + persistent state)와 한계(verification burden·comprehension debt·comfortable passivity)를 압축해서 짚는다.

## 1. 자료 정보 (Document Information)

- **저자**: Addy Osmani (Google Chrome 엔지니어링 매니저, JavaScript·웹 성능 분야 저술가)
- **게시일**: 2026-06-07
- **매체**: addyosmani.com 개인 블로그
- **URL**: https://addyosmani.com/blog/loop-engineering/
- **분량**: 짧은 에세이 (~700 단어, 9개 섹션 + 사례 + 한계 + 결론)
- **언급 인물**: **Peter Steinberger**, **Boris Cherny** (Anthropic)
- **언급 도구**: Claude Code(`/loop`, `/goal`), Codex 앱, Git worktrees, MCP, SKILL.md
- **면책 고지**: 저자 개인 견해 — Google이나 소속 조직 입장 아님

## 2. 주요 기여 (Key Contributions)

1. **"Loop Engineering" 용어화** — Peter Steinberger·Boris Cherny가 던진 문장 *"design loops that prompt your agents"*를 한 패러다임의 명사로 잠근다. prompt engineering의 다음 진화 단계에 자리매김했다. *(→ [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]의 *"Prompt → Context → Harness"* 3단계 진화와 같은 그림을 다른 이름으로 본 시각)*
2. **5 + 1 구성 요소 카탈로그** — 모든 loop이 갖춰야 할 5개 foundational element를 짚는다: (1) Automations, (2) Worktrees, (3) Skills, (4) Plugins/Connectors, (5) Sub-agents. 여기에 sixth element로 *persistent state management*(markdown 또는 project board)를 모델의 session 간 메모리 부재를 메우는 보조 축으로 얹는다.
3. **`/loop` vs `/goal` 구분** — Claude Code의 두 슬래시 커맨드를 cadence-based(시간 주기)와 conditional completion(목표 충족까지 + 검증을 별도 모델에 위임)으로 가른다.
4. **Sub-agent의 핵심 역할 = verification distance** — *"가장 영향력 큰 구조적 혁신"* 으로 implementation과 evaluation의 분리를 지목한다. 같은 모델이 자기 작업을 후하게 매기는 self-grading bias를 separate-instruction sub-agent로 차단한다.
5. **Concrete loop 사례 시나리오** — 일일 자동 triage skill → CI 실패·이슈·최근 커밋 점검 → persistent state 기록 → 워크트리에 fix-drafter + review sub-agent 분기 → connector가 PR 자동 생성·티켓 갱신 → 미해결만 사람에게.
6. **3대 한계 명명** — (a) **verification burden** is human, (b) **comprehension debt**(빠른 코드 생성과 개발자 이해 사이의 격차) 누적, (c) **comfortable passivity**(편한 자동화가 비판적 검토를 마비시킨다).
7. **"leverage 재배치" 결론** — *"The leverage point relocated, but the responsibility for quality remained stationary—held exclusively by the engineer."* loop은 일을 없애지 않고 control point만 옮긴다. 같은 loop이 어떤 엔지니어에겐 가속기, 어떤 엔지니어에겐 이해 회피 수단이 된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본문에 정식 아키텍처 다이어그램은 없으나, 텍스트로 묘사된 **loop 구조**는 다음과 같다.

### 3.1 5+1 요소의 역할 분담

| 요소 | 목적 | 구현 매핑 |
|---|---|---|
| **Automations** | "loop의 심장" — scheduled discovery·triage가 사람 개입 없이 작업을 표면화 | Claude Code `/loop` (cadence), `/goal` (conditional), Codex 앱의 recurring prompts |
| **Worktrees** | 다중 에이전트의 동시 파일 수정 충돌 방지 | Git worktree — repo history는 공유하되 working directory는 격리 |
| **Skills** | architectural decision·convention을 재유도하는 토큰 낭비 제거 | 양 플랫폼 공통 구조: `SKILL.md` + 보조 스크립트가 든 폴더 |
| **Plugins / Connectors** | filesystem 너머의 외부 시스템과 통합 | MCP 프로토콜 — issue tracker 조회, staging API 호출, notification 트리거, 자동 PR·티켓·채널 알림 |
| **Sub-agents** | implementation과 evaluation 분리 → self-grading bias 제거 | 별도 instruction이 든 sub-agent. `/goal`은 내부적으로 stopping condition 평가를 별도 모델에 맡긴다 |
| **(6) Persistent state** | session 간 메모리 부재 보완 | markdown 파일 또는 project board에 findings·상태 기록 |

### 3.2 *"Concrete loop architecture"* 시나리오 흐름

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

### 3.3 Control structure inversion

기존: 사람이 매 step에서 prompt를 쓰고 출력을 검토한 뒤 다시 수정을 요청한다.
이후: **designer는 시스템을 한 번 설계**하고, **agent가 execution을 맡는다**. 사람의 개입점이 *"매 prompt"* 에서 *"loop architecture"* 로 옮겨간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 자료는 의견·정리 에세이라 정량 벤치마크나 측정치는 따로 제시하지 **않는다**. 검증 가능한 외부 데이터 인용은 두 가지뿐이다.

- Peter Steinberger·Boris Cherny(Anthropic)가 *"design loops that prompt your agents"* 라는 표현을 썼다는 attribution.
- Claude Code와 Codex 앱이 recurring prompt를 지원한다는 도구 기능 사실.

수치 비교(예: throughput 증가, 결함률 감소)는 본문에 없다.

> **이중 자료 주의**: 본문의 5요소 카탈로그·*"3 limitations"*·*"control inversion"* 주장은 저자가 자기 관찰을 압축한 단언이며, 출처 인용이 따로 붙어 있지 않다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 본문에서 **명시한 3대 한계**:

1. **Verification burden remains human responsibility.** *"unattended loop은 unattended mistake도 생산한다."* 보조 검증 sub-agent가 confidence를 보강하지만 인간 judgment를 대체하지는 못한다.
2. **Comprehension erosion accelerates.** 코드 생성 속도가 빨라질수록 deployed system과 developer understanding 사이의 *"comprehension debt"* 가 쌓인다 — 적극적 리뷰만이 막아낼 수 있다.
3. **Comfortable passivity becomes dangerous.** loop 실행의 *"seductive ease"* 가 인지적 disengagement를 부른다 → 출력을 무비판적으로 받아들인다.

자료 자체의 한계:

- 분량이 짧고 정량 데이터가 없어 loop engineering의 효과를 측정 가능한 메트릭으로 환산하지 않는다.
- Anthropic의 두 인물 attribution 말고는 다른 1차 출처(블로그·영상 링크 등)가 본문에 노출되지 않아 인용 trace가 약하다.
- *"5 essential components"* 의 경계 정의가 느슨하다. connector와 plugin의 구분, skill과 prompt template의 구분이 카탈로그 수준에서만 처리된다.

향후 과제로 본문이 직접 거론한 것은 없으나, 결론에서 *"build loops deliberately, but remain the engineer, not merely the operator who initiates execution"* 으로 후속 작업의 방향을 압축한다.

## 6. 관련 연구 (Related Work)

본 자료가 본문에서 명시적으로 attribution한 항목:

- **Peter Steinberger · Boris Cherny (Anthropic)** — *"design loops that prompt your agents"* 라는 표현의 출처. (본문에 구체적 인용 URL이나 영상 링크는 없다)
- **Claude Code** (Anthropic) — `/loop`, `/goal` 슬래시 커맨드, sub-agent, MCP, skill 시스템.
- **Codex 앱** (OpenAI) — recurring prompt 지원 사례.
- **MCP (Model Context Protocol)** — connector·plugin의 기반 프로토콜.
- **Git worktrees** — 격리된 병렬 작업 환경 인프라.

본 wiki에서 같은 패러다임 전환을 다른 이름·각도로 다룬 자료:

- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel 2026)]] — Boris Cherny *"give Claude a way to verify its own work"* 원칙, skills·subagents·worktree·MCP·`/goal`·`/rewind` 등 본 자료의 5요소를 더 세밀하게 풀어쓴 실전 가이드.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연 2026)]] — *"Prompt → Context → Harness Engineering"* 3단계 진화 모델. 본 자료의 "Loop"은 이호연의 "Harness" 6축(구조·맥락·계획·실행·검증·개선) 중 *실행+개선* 축에 가깝다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows (Dennis 2026)]] — 워크플로우 자체를 *컴파일* 대상으로 본 시각.
- [[agents/rahman-2026-a-practical-guide-to-becoming|A Practical Guide to Becoming (Rahman 2026)]] — 에이전틱 개발 실무 가이드 전반.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin 2026)]] — 하네스 변경을 가치 측정에서 분리하라는 비판적 시각.

## 7. 용어집 (Glossary)

- **Loop Engineering** — 개별 prompt 대신 *agent를 prompting하는 loop 자체*를 설계 대상으로 삼는 접근.
- **Automation** — 정해진 주기로 작업을 발견·분류하는 scheduled process.
- **Worktree** — Git이 제공하는 격리된 working directory. repo history는 공유하지만 파일 수정은 독립적이라 다중 에이전트의 동시 작업 충돌을 막는다.
- **Skill / SKILL.md** — Claude Code·Codex 공통의 reusable knowledge unit. `SKILL.md` + 보조 스크립트가 든 폴더 구조.
- **Connector / Plugin** — MCP 프로토콜 위에서 동작하는 외부 시스템 통합 모듈. issue tracker·staging API·notification 등을 호출한다.
- **MCP (Model Context Protocol)** — Anthropic이 주도하는 agent ↔ 외부 도구 연결 프로토콜.
- **Sub-agent** — 메인 에이전트와 분리된 instruction으로 동작하는 보조 에이전트. *implementation vs evaluation* 분리에 쓴다.
- **`/loop`** — Claude Code 슬래시 커맨드. cadence-based(시간 주기) 실행.
- **`/goal`** — Claude Code 슬래시 커맨드. 조건이 충족되면 종료하고, 검증은 별도 모델에 맡긴다.
- **Persistent state** — session 간 모델 메모리 부재를 메우려고 두는 외부 상태 저장소(markdown·project board).
- **Verification distance** — implementation 모델과 evaluation 모델을 분리해 self-grading bias를 없애는 구조.
- **Comprehension debt** — 빠른 코드 생성과 개발자 이해 사이에 쌓이는 격차.
- **Comfortable passivity** — loop 실행의 편리함이 비판적 검토를 무디게 만드는 인지적 상태.
- **Control structure inversion** — 사람의 개입점이 *매 prompt*에서 *loop architecture 설계*로 옮겨가는 구조 변화.
