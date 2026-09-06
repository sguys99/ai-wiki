---
title: "Loop Engineering"
type: article
year: 2026
category: agents
raw_path: raw/articles/osmani-2026-loop-engineering.md
raw_filename: "osmani-2026-loop-engineering.md"
source_collection: external
author: "Addy Osmani"
url: "https://addyosmani.com/blog/loop-engineering/"
publisher: "addyosmani.com (Addy Osmani Blog)"
publication_date: "2026-06-07"
tags: [loop-engineering, claude-code, codex, anthropic, sub-agents, worktrees, skills, mcp, connectors, automations, slash-loop, slash-goal, peter-steinberger, boris-cherny, verification, comprehension-debt, paradigm-shift]
---

## 한 줄 요약 (One-line Summary)

Google Chrome 엔지니어링 매니저 Addy Osmani가 2026-06-07에 올린 짧은 에세이다. "prompting coding agents"에서 "designing loops that prompt your agents"로 넘어가는 패러다임 전환을 loop engineering이라 부르고, 구성 요소(automations, worktrees, 스킬, plugins와 connectors, 서브에이전트 + persistent state)와 세 가지 한계(verification burden, comprehension debt, comfortable passivity)를 압축해 짚는다.

## 1. 자료 정보 (Document Information)

- 저자: Addy Osmani (Google Chrome 엔지니어링 매니저, JavaScript와 웹 성능 분야 저술가)
- 게시일: 2026-06-07
- 매체: addyosmani.com 개인 블로그
- URL: https://addyosmani.com/blog/loop-engineering/
- 분량: 짧은 에세이 (약 700 단어, 9개 절과 결론)
- 언급 인물: Peter Steinberger, Boris Cherny (Anthropic)
- 언급 도구: Claude Code(`/loop`, `/goal`), Codex 앱, Git worktree, MCP, `SKILL.md`
- 면책 고지: 저자 개인 견해이며 Google이나 소속 조직의 입장이 아니다

## 2. 주요 기여 (Key Contributions)

1. loop engineering 용어화. Peter Steinberger와 Boris Cherny가 던진 문장 "design loops that prompt your agents"를 한 패러다임의 명사로 잠근다. prompt engineering의 다음 진화 단계로 자리매김했다. 같은 그림을 다른 이름으로 본 시각이 [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering]]의 "Prompt → Context → Harness" 3단계 진화 모델이다.
2. 구성 요소 5 + 1 카탈로그. 모든 루프가 갖춰야 할 다섯 가지 기반 요소를 짚는다. (1) Automations, (2) Worktrees, (3) Skills, (4) Plugins와 Connectors, (5) Sub-agents다. 여기에 여섯 번째 요소로 persistent state management(마크다운 파일 또는 프로젝트 보드)를 붙여, 모델의 세션 간 메모리 부재를 메우는 보완재로 둔다.
3. `/loop`과 `/goal`의 구분. Claude Code의 두 슬래시 커맨드를 cadence 기반(시간 주기)과 conditional completion(목표 충족까지 실행하고 검증은 별도 모델에 위임)으로 가른다.
4. 서브에이전트의 핵심 역할을 verification distance로 규정. 저자는 구현과 평가의 분리를 "가장 영향력 큰 구조적 혁신"으로 지목한다. 같은 모델이 자기 작업을 후하게 매기는 self-grading bias를 지시문이 다른 서브에이전트로 차단한다.
5. 구체적 루프 시나리오. 하루 1회 자동 triage 스킬 실행에서 시작해, CI 실패와 열린 이슈와 최근 커밋 점검, persistent state 기록, worktree에서 수정안 작성 서브에이전트와 검토 서브에이전트 분기, 커넥터의 PR 자동 생성과 티켓 갱신, 미해결 항목의 사람 검토 큐 이관으로 이어진다.
6. 세 가지 한계 명명. (a) verification burden은 사람의 책임으로 남고, (b) comprehension debt(빠른 코드 생성과 개발자 이해 사이의 격차)가 누적되며, (c) comfortable passivity(편한 자동화가 비판적 검토를 무디게 만든다)가 위험해진다.
7. leverage 재배치 결론. "The leverage point relocated, but the responsibility for quality remained stationary, held exclusively by the engineer." 루프는 일을 없애지 않고 통제 지점만 옮긴다. 같은 루프가 어떤 엔지니어에게는 가속기가 되고 어떤 엔지니어에게는 이해 회피 수단이 된다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본문에 정식 아키텍처 다이어그램은 없으나, 텍스트로 묘사된 루프 구조는 다음과 같다.

### 3.1 5+1 요소의 역할 분담

| 요소 | 목적 | 구현 매핑 |
|---|---|---|
| Automations | 루프의 심장. 예약된 discovery와 triage가 사람 개입 없이 작업을 표면화한다 | Claude Code `/loop`(cadence), `/goal`(conditional), Codex 앱의 반복 프롬프트 |
| Worktrees | 여러 에이전트의 동시 파일 수정 충돌 방지 | Git worktree. 저장소 이력은 공유하되 작업 디렉토리는 격리한다 |
| Skills | 아키텍처 결정과 관례를 실행마다 다시 유도하는 반복 제거 | 양 플랫폼 공통 구조인 `SKILL.md` 파일과 보조 스크립트가 든 폴더 |
| Plugins와 Connectors | 파일시스템 너머의 외부 시스템과 통합 | MCP 프로토콜. 이슈 트래커 조회, staging API 호출, 알림 트리거, 자동 PR과 티켓과 채널 알림 |
| Sub-agents | 구현과 평가 분리로 self-grading bias 제거 | 별도 지시문이 든 서브에이전트. `/goal`은 내부적으로 stopping condition 평가를 별도 모델에 맡긴다 |
| (6) Persistent state | 세션 간 메모리 부재 보완 | 마크다운 파일 또는 프로젝트 보드에 발견 사항과 상태 기록 |

### 3.2 Concrete loop architecture 시나리오 흐름

```
[Daily automated run]
    └─ Triage 스킬 실행
        ├─ CI failures 조회
        ├─ Open issues 조회
        └─ Recent commits 조회
    └─ findings를 persistent state에 기록
    └─ actionable item 발견 시:
        └─ 격리된 worktree spawn
            ├─ 서브에이전트 1: fix drafting
            └─ 서브에이전트 2: project standards와 test suite 대비 review
        └─ Connector 호출:
            ├─ PR 자동 생성
            └─ 트래킹 시스템 갱신
    └─ 미해결 항목 → 사람 리뷰 큐
```

### 3.3 Control structure inversion

기존에는 사람이 매 단계에서 프롬프트를 쓰고 출력을 검토한 뒤 다시 수정을 요청한다. 이후에는 설계자가 시스템을 한 번 설계하고 에이전트가 실행을 맡는다. 사람의 개입점이 "매 프롬프트"에서 "루프 아키텍처"로 옮겨간다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

본 자료는 의견 정리 에세이라 정량 벤치마크나 측정치를 따로 제시하지 않는다. 검증 가능한 외부 데이터 인용은 두 가지뿐이다.

- Peter Steinberger와 Boris Cherny(Anthropic)가 "design loops that prompt your agents"라는 표현을 썼다는 attribution.
- Claude Code와 Codex 앱이 정해진 간격의 반복 프롬프트를 지원한다는 도구 기능 사실.

수치 비교(예: throughput 증가, 결함률 감소)는 본문에 없다.

> 2차 자료 주의: 본문의 5요소 카탈로그, 세 가지 한계, control inversion 주장은 저자가 자기 관찰을 압축한 단언이며 출처 인용이 따로 붙어 있지 않다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 본문에서 명시한 세 가지 한계는 다음과 같다.

1. Verification burden remains human responsibility. 사람이 지켜보지 않는 루프는 사람이 지켜보지 않는 실수도 함께 만든다. 보조 검증 서브에이전트가 confidence를 보강하지만 사람의 판단을 대체하지는 못한다.
2. Comprehension erosion accelerates. 코드 생성 속도가 빨라질수록 배포된 시스템과 개발자 이해 사이에 comprehension debt가 쌓인다. 적극적 리뷰만이 그 누적을 막는다.
3. Comfortable passivity becomes dangerous. 루프 실행의 seductive ease가 인지적 이탈을 부른다. 출력을 검토 대상이 아니라 그대로 받아들일 진리로 대하게 된다는 것이 저자의 경고다.

자료 자체의 한계는 다음과 같다.

- 분량이 짧고 정량 데이터가 없어 loop engineering의 효과를 측정 가능한 지표로 환산하지 않는다.
- Anthropic 두 인물 attribution 말고는 다른 1차 출처(블로그나 영상 링크 등)가 본문에 노출되지 않아 인용 추적이 약하다.
- 다섯 가지 필수 구성 요소의 경계 정의가 느슨하다. connector와 plugin의 구분, 스킬과 프롬프트 템플릿의 구분이 카탈로그 수준에서만 처리된다.

향후 과제로 본문이 직접 거론한 것은 없으나, 결론에서 "build loops deliberately, but remain the engineer, not merely the operator who initiates execution"으로 후속 작업의 방향을 압축한다.

## 6. 관련 연구 (Related Work)

본 자료가 본문에서 명시적으로 attribution한 항목은 다음과 같다.

- Peter Steinberger와 Boris Cherny (Anthropic). "design loops that prompt your agents"라는 표현의 출처다. 본문에 구체적 인용 URL이나 영상 링크는 없다. Steinberger의 소속은 `lee-jeongmin-2026-loop-engineering-claude-code`의 원문이 OpenClaw로 적어 이 글과 어긋난다. 각 페이지는 자기 원문 표기를 따른다.
- Claude Code (Anthropic). `/loop`과 `/goal` 슬래시 커맨드, 서브에이전트, MCP, 스킬 시스템.
- Codex 앱 (OpenAI). 반복 프롬프트 지원 사례.
- MCP (Model Context Protocol). 커넥터와 플러그인의 기반 프로토콜.
- Git worktree. 격리된 병렬 작업 환경 인프라.

본 wiki에서 같은 패러다임 전환을 다른 이름이나 각도로 다룬 자료는 다음과 같다.

- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Patel 2026)]]. Boris Cherny의 "give Claude a way to verify its own work" 원칙과 함께 스킬, 서브에이전트, worktree, MCP, `/goal`, `/rewind` 등 본 자료의 5요소를 더 세밀하게 풀어쓴 실전 가이드다.
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (이호연 2026)]]. "Prompt → Context → Harness Engineering" 3단계 진화 모델이다. 본 자료의 loop은 이호연의 harness 6개 항목(구조, 맥락, 계획, 실행, 검증, 개선) 중 실행과 개선에 가깝다.
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows (Dennis 2026)]]. 워크플로 자체를 컴파일 대상으로 본 시각이다.
- [[etc/rahman-2026-a-practical-guide-to-becoming|A Practical Guide to Becoming (Rahman 2026)]]. 에이전틱 개발 실무 가이드 전반이다.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin 2026)]]. harness 변경을 가치 측정에서 분리하라는 비판적 시각이다.

## 7. 용어집 (Glossary)

- Loop Engineering. 개별 프롬프트 대신 에이전트를 프롬프팅하는 루프 자체를 설계 대상으로 삼는 접근.
- Automation. 정해진 주기로 작업을 발견하고 분류하는 예약 프로세스.
- Worktree. Git이 제공하는 격리된 작업 디렉토리. 저장소 이력은 공유하지만 파일 수정은 독립적이라 여러 에이전트의 동시 작업 충돌을 막는다.
- Skill과 `SKILL.md`. Claude Code와 Codex 공통의 재사용 가능한 지식 단위. `SKILL.md` 파일과 보조 스크립트가 든 폴더 구조다.
- Connector와 Plugin. MCP 프로토콜 위에서 동작하는 외부 시스템 통합 모듈. 이슈 트래커, staging API, 알림 등을 호출한다.
- MCP (Model Context Protocol). Anthropic이 주도하는 에이전트와 외부 도구 연결 프로토콜.
- Sub-agent. 메인 에이전트와 분리된 지시문으로 동작하는 보조 에이전트. 구현과 평가의 분리에 쓴다.
- `/loop`. Claude Code 슬래시 커맨드. cadence 기반(시간 주기) 실행이다.
- `/goal`. Claude Code 슬래시 커맨드. 조건이 충족되면 종료하고 검증은 별도 모델에 맡긴다.
- Persistent state. 세션 간 모델 메모리 부재를 메우려고 두는 외부 상태 저장소(마크다운 파일이나 프로젝트 보드).
- Verification distance. 구현 모델과 평가 모델을 분리해 self-grading bias를 없애는 구조.
- Comprehension debt. 빠른 코드 생성과 개발자 이해 사이에 쌓이는 격차.
- Comfortable passivity. 루프 실행의 편리함이 비판적 검토를 무디게 만드는 인지적 상태.
- Control structure inversion. 사람의 개입점이 매 프롬프트에서 루프 아키텍처 설계로 옮겨가는 구조 변화.
