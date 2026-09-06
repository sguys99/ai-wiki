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

GBrain을 실제로 굴리는 네 갈래 실전 가이드 — 솔로 개인 브레인(2시간·월 $100~150), 10~50명 회사 브레인(90분·월 $100 미만), `skillopt` 스킬 자동 개선(20분·$1), 코딩 에이전트 메모리 연결(10분). 저자의 한 문장이 전체를 관통한다: "Git repo is the system of record."

## 1. 자료 정보 (Document Information)

- garrytan/gbrain 저장소의 `docs/tutorials/` 디렉토리(문서 5개: README + 튜토리얼 4편).
- 기존 `garrytan-gbrain`(README) 페이지가 시스템의 thesis·아키텍처를 다룬다면, 이 문서는 그 시스템을 **손으로 세팅하는 절차**를 다룬다.
- README는 "완성" 튜토리얼 4편과 "진행 중" 5편(VC 딜플로우, vault 마이그레이션, 코드베이스 인덱싱, Ollama 완전 로컬, dream cycle)을 안내.

## 2. 주요 기여 (Key Contributions)

1. **4개 레이어로 개인 에이전트를 분해** — Brain(git repo) · Harness(AlphaClaw/OpenClaw) · Chat(Telegram) · Skills(60개+). "무엇을 어디에 두는가"가 명확해 재현 가능.
2. **팀 확장의 권한 모델을 DB 레이어에 못박음** — per-user OAuth로 소스별 read/write 스코프를 지정. 영업은 자기 customer 폴더만 write, 내부 운영은 customer 접근 불가 식의 실전 격리.
3. **도입률을 올리는 "botmaster pattern"** — 팀원이 질의하기 전에 각자 워크스페이스를 미리 채우고, 가이드 워크플로로 시연한 뒤 독립 접근으로 졸업.
4. **스킬을 학습 가능한 파라미터로 취급하는 `skillopt`** — 벤치마크로 측정하고 성능이 오를 때만 편집 수용. held-out validation gate로 과적합 방지.
5. **코딩 에이전트 연결 2경로 + 4습관** — Path A(기존 brain HTTP serve) / Path B(로컬 PGLite 신규). "질문 전 검색 → 결정 캡처 → 미팅 준비 → 전문가 찾기".

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### personal-brain — 솔로 셋업

- **4개 레이어**: Brain(git repo, 계속 자람) / Harness(LLM 런타임+도구+메모리) / Chat(Telegram) / Skills(GBrain 경유 60개+).
- **저장소 2개**: 에이전트 설정용 workspace repo + 지식용 brain repo.
- **함정**: Render Pro 티어 필수(base는 메모리 부족), fine-grained GitHub 토큰의 명시적 repo 선택, Supabase pgvector 활성화, transaction pooler(6543) 사용(direct 금지), 마이그레이션 IPv4 명시 설정.
- **비용**: Render Pro ~$85 + Supabase Free~$25 + API $55~$520 = 월 $100~150.

### company-brain — 팀 확장

- 개인 brain에 ① 격리된 다중 소스 ② per-user OAuth ③ 개별 스코프 워크플로를 얹는다.
- 단일 PGLite → 공유 Postgres. 소스("shared wiki", "customer notes", "internal-only")를 각각 독립 git repo에서 sync.
- 스코핑 2모델: DB 강제 OAuth 격리(다양한 클라이언트 권장) vs 단일 소스 내 관례 기반 디렉토리 스코핑(중앙 배포 간단).
- 운영 3명령: `gbrain autopilot`(백그라운드 헬스) / `gbrain doctor --remediate`(표적 self-heal) / `gbrain sources status`(모니터).
- 환각 대신 정직한 gap 탐지, 모든 주장에 원문 인용.

### skillopt — 스킬 자동 개선

- 스킬 markdown = trainable parameter. JSONL 벤치마크(과제 + 규칙 judge: `contains`·`regex`·`max_chars`·`min_citations`)로 채점.
- validation 최소 5과제, 시작은 15-task를 `1:1:1` split 권장.
- 안전장치: dry-run 비용 추정, clean git tree 요구, held-out set·flag 없이 번들 스킬 덮어쓰기 거부.

### connect-coding-agent — 코딩 에이전트 메모리

- Path A(기존 brain): HTTP serve → 토큰 발급 → 로컬 에이전트 연결. Path B(신규): 로컬 PGLite 초기화·채우기·wiring.
- 4습관: 질문 전 brain 검색 / 결정 지속 캡처 / 미팅 준비 활용 / 지식 내 전문가 찾기.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 벤치마크 문서는 아니지만 각 튜토리얼이 **시간·비용 예산**을 명시: 개인 2h/$100~150, 회사 90분/데모 $5·운영 <$100(25인, ZeroEntropy 임베딩 ~$35 + Anthropic ~$50), skillopt 20분/$1, 코딩 에이전트 10분.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 4편만 "완성", 5편은 "진행 중"(VC 딜플로우·마이그레이션·코드베이스 인덱싱·완전 로컬·dream cycle) — 아직 문서 공백.
- 개인 셋업이 Render·Supabase·Telegram 등 특정 SaaS 스택에 강하게 결합 — 자가호스팅/로컬 경로는 미완.
- skillopt·connect-coding-agent 원문은 fetch 시 verbatim 재현이 거부되어 요약 기반(세부 명령·플래그는 원문 확인 필요).

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]] — 같은 저장소 README. 시스템 thesis·아키텍처·벤치마크.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — Hermes+VPS 실전 셋업(개인 튜토리얼의 사용자 변형).
- [[agents/microsoft-skillopt]] — 스킬 최적화 계열 연구와의 대조.

## 7. 용어집 (Glossary)

- **Harness**: 도구·메모리를 붙여 LLM을 굴리는 런타임 껍데기(여기선 AlphaClaw/OpenClaw).
- **botmaster pattern**: 팀원 워크스페이스를 미리 seeding해 도입 문턱을 낮추는 온보딩 패턴.
- **skillopt**: 스킬 문서를 벤치마크로 측정·최적화하는 GBrain 명령.
- **transaction pooler**: Supabase의 연결 풀링 모드(port 6543), serverless 환경에서 direct connection 대신 사용.
