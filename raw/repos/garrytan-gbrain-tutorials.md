---
title: "garrytan/gbrain — docs/tutorials"
type: repo
year: 2026
category: applications
raw_path: raw/repos/garrytan-gbrain-tutorials.md
raw_filename: "garrytan-gbrain-tutorials.md"
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain/tree/master/docs/tutorials"
license: "MIT"
tags: [gbrain, tutorial, personal-brain, company-brain, skillopt, coding-agent, mcp, openclaw, alphaclaw, hermes, telegram, render, supabase, oauth]
---

# GBrain Tutorials (docs/tutorials)

> garrytan/gbrain 저장소의 `docs/tutorials/` 디렉토리. WebFetch로 수집한 5개 문서 요약(2026-07-05 fetch).
> 마지막 두 파일(skillopt, connect-coding-agent)은 fetch 시 verbatim 재현이 거부되어 상세 요약으로 대체.

## README.md — 튜토리얼 개요

### 완성된 튜토리얼 (Shipped)

1. **개인 AI 에이전트 + 브레인 설정** — 솔로 설치 가이드. GitHub 저장소 2개, Telegram 봇, AlphaClaw on Render 포함. "약 2시간 내 완료; 월 $100~150 소요".
2. **회사 브레인으로서의 GBrain 설정** — 10~50명 팀을 위한 다중 사용자, OAuth 기반 제도적 메모리. "90분 완료, 데모용 약 $5 API 비용, 25명 팀 기준 월 $100 미만".
3. **`gbrain skillopt`로 스킬 자동 개선** — 벤치마크 작성부터 최적화 실행까지. "약 20분, 약 $1 API 비용".
4. **코딩 에이전트에 메모리 부여** — Claude Code/Codex와 GBrain 연결 가이드. "약 10분 소요".

### 진행 중인 튜토리얼 (In Progress)

- VC 딜플로우 설정
- 기존 vault 마이그레이션
- 코드베이스를 코드 브레인으로 인덱싱
- Ollama/llama.cpp를 활용한 완전 로컬 실행
- 자동 야간 풍부화 "dream cycle" 구성

---

## personal-brain.md — 개인 AI 에이전트 + 브레인 설정

약 2시간, 월 $100~150로 메모리를 갖춘 솔로 AI 에이전트를 구축하는 가이드.

### 4개 레이어 아키텍처

1. **Brain** (Git 저장소) — 계속 자라는 지식 베이스
2. **Harness** (AlphaClaw/OpenClaw) — 도구·메모리를 갖춘 LLM 런타임
3. **Chat Interface** (Telegram) — 사용자 소통 채널
4. **Skills** (GBrain 경유 60개 이상) — 재사용 가능한 에이전트 능력

저자 왈: "Git repo is the system of record."

### 사전 준비

- GitHub·Render 계정, Telegram, API 키(최소 OpenAI·Anthropic), 월 $100~150 예산.
- **GitHub 저장소 2개 필요**: 에이전트 설정용 workspace repo, 지식 베이스용 brain repo.

### 주요 함정(gotchas)

- Render Pro 티어 필수 (base 티어는 메모리 부족)
- Fine-grained GitHub 토큰은 명시적 repo 선택 필요
- Supabase는 pgvector extension 활성화 필요
- Connection pooling은 transaction pooler(port 6543) 사용, direct connection 금지
- 마이그레이션은 IPv4 호환성 명시적 설정 필요

### 비용 분해

| 구성 | 비용 |
|---|---|
| Render Pro | ~$85 |
| Supabase | Free~$25 |
| APIs | $55~$520 |
| **합계** | **$100~$150** |

### 다음 단계

배포 후 외부 데이터 소스(이메일·캘린더·Slack) 통합, 기존 AI 클라이언트를 공유 brain에 연결, 팀 기반 셋업으로 확장.

---

## company-brain.md — 회사 브레인 설정 (Garry Tan)

개인 AI 에이전트를 10~50명 규모 엔터프라이즈 시스템으로 확장하되 보안·프라이버시 유지.

### 핵심 아키텍처 변화

개인 brain에 3가지 추가: ① 격리된 다중 콘텐츠 소스, ② 세분화된 권한을 갖는 per-user OAuth 인증, ③ 개별 스코프 워크플로(폴더·예약 작업·커스텀 스킬).

### 기술 구현

- 단일 사용자 PGLite → 공유 Postgres 인프라로 이전.
- 조직은 "shared company wiki", "customer notes", "internal-only" 등 별도 소스를 각각 독립 git 저장소에서 sync.
- 접근 제어는 DB 레이어에서 동작. 팀원마다 OAuth 자격증명으로 write 가능 소스·read 가능 소스를 지정.
  - 예: 영업 담당은 자기 customer 폴더에만 write, customer + shared read. 내부 운영 직원은 customer 정보 접근 불가.

### 운영 구조

- 2가지 스코핑 모델: ① DB 강제 OAuth 격리(다양한 AI 클라이언트를 쓰는 팀 권장), ② 단일 소스 내 관례 기반 디렉토리 스코핑(중앙 집중형 에이전트 배포에 간단).
- 팀원이 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두면(pre-population) 도입률이 크게 향상.
- **"botmaster pattern"**: 개인 디렉토리에 관련 컨텍스트를 seeding하고, 가이드 워크플로로 brain 능력을 시연한 뒤 독립 접근으로 졸업시킨다.

### 유지보수와 경제성

- 3개 명령이 대부분 처리: `gbrain autopilot`(지속 백그라운드 헬스 유지), `gbrain doctor --remediate`(표적 self-healing), `gbrain sources status`(모니터링).
- 25명 회사 예상 비용은 월 $100 미만 — ZeroEntropy 임베딩 약 $35 + Anthropic API 합성 질의 약 $50.
- 환각 대신 정직한 gap 탐지를 강조. 모든 주장을 원문 문서로 정밀 인용해 소싱.

---

## improving-skills-with-skillopt.md — `gbrain skillopt`로 스킬 자동 개선

> fetch 시 verbatim 재현 거부 → 상세 요약.

- **핵심 개념**: 스킬 markdown 파일을 학습 가능한 파라미터로 취급. SkillOpt가 현실적 과제로 벤치마크하고, 성능이 측정 가능하게 개선될 때만 편집을 수용.
- **워크플로**: 스킬에서 벤치마크 생성 → 평가 기준 강화 → 옵티마이저 실행 → held-out validation gate를 통과한 변경만 수용.
- **벤치마크 포맷**: JSONL 파일에 과제 설명 + 규칙 기반 judge(`contains`, `regex`, `max_chars`, `min_citations` 등).
- **제약**: validation 데이터셋은 최소 5개 과제 필요. 시작은 15-task 벤치마크를 `1:1:1`로 split 권장.
- **안전장치**: dry-run 비용 추정, clean git working tree 요구, held-out test set + 명시적 flag 없이는 번들 스킬 덮어쓰기 거부.
- **반복 개선**: 관찰된 에이전트 행동을 바탕으로 벤치마크를 다듬어 "좋음"의 정의를 점진적으로 날카롭게.

---

## connect-coding-agent.md — 코딩 에이전트에 메모리 부여

> fetch 시 verbatim 재현 거부 → 상세 요약.

MCP를 통해 GBrain을 Claude Code/Codex 에이전트와 통합하는 가이드. 2개 경로 제시.

- **Path A (기존 brain 보유)**: 특정 flag로 HTTP serving → 인증 토큰 발급 → 그 토큰으로 로컬 에이전트 연결.
- **Path B (신규 시작)**: 로컬 PGLite DB 사용. 최소 셋업 — 초기화, 콘텐츠 채우기, 에이전트에 wiring.

두 경로 모두 4가지 작업 습관으로 귀결:
1. 질문하기 전에 brain을 먼저 검색
2. 결정을 지속적으로 캡처
3. 미팅 준비에 brain 활용
4. 지식 베이스 안에서 전문가 찾기

트러블슈팅 표와 팀 확장·자율 풍부화 다음 단계 포함.
