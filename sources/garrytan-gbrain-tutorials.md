---
title: "garrytan/gbrain: docs/tutorials"
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

## 한 줄 요약 (One-line Summary)

GBrain을 실제로 구축하고 운영하는 실전 가이드 4편을 담은 디렉토리다. 솔로 개인 brain(약 2시간, 월 $100~150), 10~50명 회사 brain(90분, 데모 API 비용 약 $5, 25명 팀 기준 월 $100 미만), `gbrain skillopt`로 스킬 자동 개선(약 20분, API 비용 약 $1), 코딩 에이전트에 메모리 부여(약 10분)로 나뉜다. 개인 brain 문서의 저자 문장이 전체 설계를 요약한다. "Git repo is the system of record."

## 1. 자료 정보 (Document Information)

- garrytan/gbrain 저장소의 `docs/tutorials/` 디렉토리다. 수집 시점(2026-07-05) 기준 문서 5개로, README 1편과 튜토리얼 4편이다.
- 같은 저장소의 README를 다룬 `garrytan-gbrain` 페이지가 시스템의 thesis와 아키텍처, 벤치마크를 맡는다면, 이 자료는 그 시스템을 손으로 세우고 운영하는 절차를 맡는다.
- README는 완성된 튜토리얼 4편과 진행 중인 튜토리얼 5편을 안내한다. 진행 중인 5편은 VC 딜플로우 설정, 기존 vault 마이그레이션, 코드베이스를 코드 brain으로 인덱싱, Ollama와 llama.cpp를 활용한 완전 로컬 실행, 자동 야간 풍부화 "dream cycle" 구성이다.
- `improving-skills-with-skillopt.md`와 `connect-coding-agent.md`는 수집 시점에 원문 전문 재현이 거부되어 상세 요약으로 대체됐다. 두 문서의 정확한 명령과 플래그는 원문 확인이 필요하다.

## 2. 주요 기여 (Key Contributions)

1. **개인 에이전트를 4개 레이어로 분해한다.** Brain(git 저장소), Harness(AlphaClaw 또는 OpenClaw), Chat Interface(Telegram), Skills(GBrain 경유 60개 이상)로 나뉜다. 무엇을 어디에 두는지가 레이어별로 지정돼 있다.
2. **팀 확장의 권한 모델을 DB 레이어에 둔다.** per-user OAuth 자격증명이 소스별 write 권한과 read 권한을 지정한다. 영업 담당은 자기 customer 폴더에만 write하고 customer와 shared를 read하며, 내부 운영 직원은 customer 정보에 접근하지 못한다.
3. **도입률을 올리는 botmaster pattern을 제시한다.** 개인 디렉토리에 관련 컨텍스트를 미리 seeding하고, 가이드 워크플로로 brain 능력을 시연한 뒤, 독립 접근으로 졸업시킨다.
4. **스킬을 학습 가능한 파라미터로 취급하는 `skillopt`를 문서화한다.** 현실적 과제로 벤치마크하고, 성능이 측정 가능하게 개선될 때만 편집을 수용한다. held-out validation gate가 과적합을 막는다.
5. **코딩 에이전트 연결을 두 경로와 네 습관으로 정리한다.** Path A는 기존 brain을 HTTP로 serving하고, Path B는 로컬 PGLite로 새로 시작한다. 두 경로 모두 질문 전 검색, 결정 캡처, 미팅 준비, 전문가 찾기의 네 습관으로 수렴한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### personal-brain, 솔로 셋업

- **4개 레이어**: Brain은 계속 자라는 지식 베이스 역할의 git 저장소다. Harness는 도구와 메모리를 갖춘 LLM 런타임으로 AlphaClaw 또는 OpenClaw를 쓴다. Chat Interface는 Telegram이 담당하는 사용자 소통 채널이다. Skills는 GBrain을 경유해 얻는 60개 이상의 재사용 가능한 에이전트 능력이다.
- **저자 인용**: "Git repo is the system of record."
- **사전 준비**: GitHub 계정, Render 계정, Telegram, API 키(최소 OpenAI와 Anthropic), 월 $100~150 예산.
- **저장소 2개**: 에이전트 설정을 담는 workspace repo와 지식 베이스를 담는 brain repo가 각각 필요하다.
- **주요 함정(gotchas)**: Render는 Pro 티어가 필수이며 base 티어는 메모리가 부족하다. fine-grained GitHub 토큰은 대상 repo를 명시적으로 선택해야 한다. Supabase는 pgvector extension을 활성화해야 한다. 연결 풀링은 transaction pooler(port 6543)를 쓰고 direct connection은 금지한다. 마이그레이션은 IPv4 호환성을 명시적으로 설정해야 한다.
- **비용 분해**: Render Pro 약 $85, Supabase Free~$25, API $55~$520으로 합계 월 $100~$150이다.
- **다음 단계**: 배포 후에는 이메일, 캘린더, Slack 같은 외부 데이터 소스를 통합하거나, 기존 AI 클라이언트를 공유 brain에 연결하거나, 팀 기반 셋업으로 확장한다.

### company-brain, 팀 확장

- 개인 AI 에이전트를 10~50명 규모 엔터프라이즈 시스템으로 확장하되 보안과 프라이버시를 유지하는 것이 목표다.
- **개인 brain에 추가되는 3가지**: 격리된 다중 콘텐츠 소스, 세분화된 권한을 갖는 per-user OAuth 인증, 개별 스코프 워크플로(폴더, 예약 작업, 커스텀 스킬)다.
- **저장 이전**: 단일 사용자 PGLite에서 공유 Postgres 인프라로 옮긴다.
- **소스 구성**: 조직은 "shared company wiki", "customer notes", "internal-only" 같은 별도 소스를 각각 독립 git 저장소에서 sync한다.
- **접근 제어**: 애플리케이션이 아니라 DB 레이어에서 동작한다. 팀원마다 OAuth 자격증명으로 write 가능 소스와 read 가능 소스를 지정한다.
- **스코핑 2모델**: DB가 강제하는 OAuth 격리는 다양한 AI 클라이언트를 쓰는 팀에 권장된다. 단일 소스 내 관례 기반 디렉토리 스코핑은 중앙 집중형 에이전트 배포에 간단하다.
- **도입 전략**: 팀원이 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두면(pre-population) 도입률이 크게 향상된다. botmaster pattern은 seeding, 가이드 워크플로 시연, 독립 접근 졸업의 3단계다.
- **운영 3명령**: `gbrain autopilot`은 지속적인 백그라운드 헬스를 유지한다. `gbrain doctor --remediate`는 표적 self-healing을 수행한다. `gbrain sources status`는 소스를 모니터링한다.
- **경제성**: 25명 회사의 예상 비용은 월 $100 미만이다. ZeroEntropy 임베딩 약 $35와 Anthropic API 합성 질의 약 $50으로 구성된다.
- **답변 품질**: 환각 대신 정직한 gap 탐지를 강조한다. 모든 주장을 원문 문서로 정밀 인용해 소싱한다.

### skillopt, 스킬 자동 개선

- **핵심 개념**: 스킬 markdown 파일을 학습 가능한 파라미터로 취급한다. SkillOpt가 현실적 과제로 벤치마크하고, 성능이 측정 가능하게 개선될 때만 편집을 수용한다.
- **워크플로 4단계**: 스킬에서 벤치마크 생성, 평가 기준 강화, 옵티마이저 실행, held-out validation gate를 통과한 변경만 수용.
- **벤치마크 포맷**: JSONL 파일에 과제 설명과 규칙 기반 judge를 담는다. judge 종류는 `contains`, `regex`, `max_chars`, `min_citations` 등이다.
- **제약**: validation 데이터셋은 최소 5개 과제가 필요하다. 시작은 15-task 벤치마크를 `1:1:1`로 split하는 것을 권장한다.
- **안전장치**: dry-run으로 비용을 추정한다. clean git working tree를 요구한다. held-out test set과 명시적 flag 없이는 번들 스킬 덮어쓰기를 거부한다.
- **반복 개선**: 관찰된 에이전트 행동을 바탕으로 벤치마크를 다듬어 "좋음"의 정의를 점진적으로 날카롭게 만든다.

### connect-coding-agent, 코딩 에이전트 메모리

- MCP를 통해 GBrain을 Claude Code나 Codex 에이전트와 통합하는 가이드로, 2개 경로를 제시한다.
- **Path A(기존 brain 보유)**: 특정 flag로 HTTP serving을 켜고, 인증 토큰을 발급받은 뒤, 그 토큰으로 로컬 에이전트를 연결한다.
- **Path B(신규 시작)**: 로컬 PGLite DB를 사용한다. 초기화, 콘텐츠 채우기, 에이전트 wiring의 최소 셋업이다.
- **4가지 작업 습관**: 질문하기 전에 brain을 먼저 검색한다. 결정을 지속적으로 캡처한다. 미팅 준비에 brain을 활용한다. 지식 베이스 안에서 전문가를 찾는다.
- 문서에는 트러블슈팅 표와 함께 팀 확장, 자율 풍부화로 이어지는 다음 단계가 포함된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크 문서는 아니지만 튜토리얼마다 시간과 비용 예산을 명시한다.

| 튜토리얼 | 소요 시간 | 비용 | 규모 |
|---|---|---|---|
| 개인 AI 에이전트 + brain 설정 | 약 2시간 | 월 $100~150 | 1인 |
| 회사 brain 설정 | 90분 | 데모 API 약 $5, 운영 월 $100 미만 | 10~50명(비용은 25명 기준) |
| `gbrain skillopt` | 약 20분 | API 약 $1 | 스킬 단위 |
| 코딩 에이전트 연결 | 약 10분 | 명시 없음 | 1인 |

개인 셋업의 월 비용 $100~150은 Render Pro 약 $85, Supabase Free~$25, API $55~$520의 합계로 제시된다. 회사 셋업의 월 $100 미만은 ZeroEntropy 임베딩 약 $35와 Anthropic API 합성 질의 약 $50으로 구성된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 완성된 튜토리얼은 4편이고 5편은 진행 중이다. VC 딜플로우, vault 마이그레이션, 코드베이스 인덱싱, 완전 로컬 실행, dream cycle이 아직 문서 공백이다.
- 개인 셋업이 Render, Supabase, Telegram 같은 특정 SaaS 스택을 전제한다. Ollama와 llama.cpp를 쓰는 완전 로컬 경로는 진행 중 튜토리얼로만 예고돼 있다.
- `skillopt`와 `connect-coding-agent` 원문은 수집 시점에 전문 재현이 거부되어 요약 기반이다. 세부 명령과 플래그는 원문 확인이 필요하다.
- 회사 brain의 접근 제어 예시는 영업과 내부 운영 두 역할만 제시한다. 더 복잡한 조직 구조의 권한 설계는 다루지 않는다.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]]: 같은 저장소의 README. 시스템 thesis, 아키텍처, 벤치마크를 다룬다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes와 VPS를 쓴 실전 셋업. 개인 튜토리얼의 사용자 변형이다.
- [[agents/microsoft-skillopt]]: 스킬 최적화 계열 연구와의 대조.

## 7. 용어집 (Glossary)

- **botmaster pattern**: 팀원의 개인 디렉토리에 컨텍스트를 미리 seeding하고 가이드 워크플로로 시연한 뒤 독립 접근으로 졸업시키는 온보딩 패턴.
- **skillopt**: 스킬 문서를 벤치마크로 측정하고 최적화하는 GBrain 명령. 성능 개선이 확인된 편집만 수용한다.
- **held-out validation gate**: 최적화에 쓰지 않고 남겨둔 검증 데이터셋으로 변경 수용 여부를 판정하는 관문.
- **transaction pooler**: Supabase가 제공하는 연결 풀링 모드로 port 6543을 쓴다. 이 튜토리얼은 direct connection 대신 이 모드를 요구한다.
- **PGLite**: 개인 셋업과 코딩 에이전트 Path B가 쓰는 단일 사용자 로컬 Postgres. 회사 셋업에서는 공유 Postgres로 대체된다.
- **pre-population**: 팀원이 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두는 도입 전략.
