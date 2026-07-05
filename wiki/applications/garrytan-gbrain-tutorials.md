---
title: "garrytan/gbrain — docs/tutorials"
type: repo
year: 2026
category: applications
raw_path: raw/repos/garrytan-gbrain-tutorials.md
raw_filename: "garrytan-gbrain-tutorials.md"
source: garrytan-gbrain-tutorials.md
source_collection: external
org: "garrytan"
repo: "gbrain"
url: "https://github.com/garrytan/gbrain/tree/master/docs/tutorials"
license: "MIT"
tags: [gbrain, tutorial, personal-brain, company-brain, skillopt, coding-agent, mcp, openclaw, alphaclaw, hermes, telegram, render, supabase, oauth]
---

## 요약 (Summary)

`garrytan-gbrain`(README)가 GBrain이 무엇이고 왜 그렇게 설계됐는지를 말한다면, 이 `docs/tutorials/`는 그 시스템을 손으로 세우는 절차를 다룬다. 완성된 튜토리얼은 네 편이다. 솔로 개인 브레인(약 2시간·월 $100~150), 10~50명 회사 브레인(90분·운영 월 $100 미만), `gbrain skillopt`로 스킬 자동 개선(20분·$1), 코딩 에이전트에 메모리 붙이기(10분). 네 편을 관통하는 문장은 하나다 — "Git repo is the system of record."

## 개인 AI 에이전트 + 브레인 (Personal Brain)

솔로 셋업은 네 개 레이어로 나뉜다.

- **Brain** — git 저장소. 계속 자라는 지식 베이스.
- **Harness** — AlphaClaw/OpenClaw. 도구와 메모리를 붙인 LLM 런타임.
- **Chat** — Telegram. 사용자와 대화하는 창구.
- **Skills** — GBrain이 얹어주는 60개 이상의 재사용 능력.

저장소는 두 개가 필요하다. 에이전트 설정을 담는 workspace repo, 지식을 담는 brain repo다.

밟다가 발이 걸리는 지점(gotchas)이 몇 군데 있다. Render는 Pro 티어라야 한다(base는 메모리가 모자란다). fine-grained GitHub 토큰은 대상 repo를 일일이 골라줘야 하고, Supabase는 pgvector extension을 켜야 한다. 연결은 transaction pooler(port 6543)로 물려야지 direct connection으로 붙으면 안 되며, 마이그레이션은 IPv4 호환을 명시적으로 설정해야 한다.

| 구성 | 비용 |
|---|---|
| Render Pro | ~$85 |
| Supabase | Free~$25 |
| APIs | $55~$520 |
| **합계** | **월 $100~$150** |

배포가 끝나면 이메일·캘린더·Slack 같은 외부 소스를 붙이거나, 기존 AI 클라이언트를 같은 brain에 연결하거나, 팀 셋업으로 넘어갈 수 있다.

## 회사 브레인 (Company Brain)

개인 brain을 10~50명 조직으로 키우면서 보안과 프라이버시를 지키는 길이다. 개인 버전 위에 세 가지가 얹힌다 — 서로 격리된 다중 콘텐츠 소스, 사용자별 OAuth 인증, 그리고 개인마다 스코프가 다른 워크플로(폴더·예약 작업·커스텀 스킬)다.

저장은 단일 사용자 PGLite에서 공유 Postgres로 옮겨간다. "shared company wiki", "customer notes", "internal-only" 같은 소스를 각각 독립된 git 저장소에서 sync한다. 접근 제어는 애플리케이션이 아니라 DB 레이어에서 건다. 팀원마다 OAuth 자격증명으로 어느 소스에 쓰고 어느 소스를 읽을지 지정하는 식이다. 예컨대 영업 담당은 자기 customer 폴더에만 쓰고 customer·shared를 읽지만, 내부 운영 직원은 customer 정보를 아예 못 본다.

스코핑은 두 모델 중 고른다. DB가 강제하는 OAuth 격리(다양한 AI 클라이언트를 쓰는 팀에 권장), 아니면 단일 소스 안에서 관례로 디렉토리를 나누는 방식(중앙 집중형 에이전트 배포라면 이쪽이 간단하다).

도입률을 끌어올리는 요령이 **botmaster pattern**이다. 팀원이 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두고, 가이드 워크플로로 brain이 뭘 할 수 있는지 보여준 다음, 독립 사용으로 졸업시킨다.

운영은 세 명령으로 거의 끝난다.

- `gbrain autopilot` — 백그라운드에서 상태를 계속 챙긴다.
- `gbrain doctor --remediate` — 문제를 짚어 스스로 고친다.
- `gbrain sources status` — 소스 상태를 들여다본다.

25명 회사 기준 예상 비용은 월 $100 미만이다(ZeroEntropy 임베딩 약 $35 + Anthropic API 합성 질의 약 $50). 근거 없는 답 대신 모르면 모른다고 짚어내는 gap 탐지를 강조하고, 모든 주장을 원문으로 정밀 인용한다.

## 스킬 자동 개선 (SkillOpt)

`gbrain skillopt`는 스킬 markdown 파일을 학습 가능한 파라미터처럼 다룬다. 현실적인 과제로 벤치마크를 돌려 성능이 실제로 오를 때만 편집을 받아들인다.

흐름은 이렇다. 스킬에서 벤치마크를 뽑고, 평가 기준을 조인 다음, 옵티마이저를 돌리고, held-out validation gate를 통과한 변경만 받는다. 벤치마크는 JSONL로, 과제 설명과 규칙 기반 judge(`contains`·`regex`·`max_chars`·`min_citations` 등)를 담는다. validation 데이터셋은 최소 5개 과제가 있어야 하고, 처음엔 15개 과제를 `1:1:1`로 나눠 시작하길 권한다.

안전장치도 촘촘하다. dry-run으로 비용을 먼저 추정하고, git working tree가 깨끗해야 돌아가며, held-out test set과 명시적 flag 없이는 번들 스킬을 덮어쓰지 않는다. 루프는 에이전트가 실제로 어떻게 행동하는지를 보고 벤치마크를 다듬어, "좋은 답"의 정의를 조금씩 날카롭게 만든다.

## 코딩 에이전트에 메모리 붙이기 (Connect Coding Agent)

MCP로 GBrain을 Claude Code나 Codex에 물리는 가이드다. 두 갈래가 있다.

- **Path A (이미 brain이 있을 때)** — 특정 flag로 HTTP serving을 켜고, 인증 토큰을 발급받아, 그 토큰으로 로컬 에이전트를 연결한다.
- **Path B (처음부터 시작)** — 로컬 PGLite DB를 쓴다. 초기화하고, 콘텐츠를 채우고, 에이전트에 물리면 끝이라 셋업이 가볍다.

어느 쪽이든 네 가지 습관으로 수렴한다 — 묻기 전에 brain을 먼저 검색하고, 결정을 그때그때 남기고, 미팅 준비에 brain을 쓰고, 지식 안에서 전문가를 찾는다.

## 아직 안 나온 것 (In Progress)

README는 진행 중인 다섯 편을 예고한다. VC 딜플로우 셋업, 기존 vault 마이그레이션, 코드베이스를 코드 브레인으로 인덱싱, Ollama/llama.cpp로 완전 로컬 실행, 야간 자동 풍부화 "dream cycle" 구성이다. 자가호스팅·완전 로컬 경로는 아직 문서 공백으로 남아 있다.

> 참고: `skillopt`·`connect-coding-agent` 원문은 수집 시점에 전문 재현이 거부되어 상세 요약 기반으로 정리했다. 정확한 명령·플래그는 원문을 확인하는 편이 안전하다.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 같은 저장소 README. 시스템 thesis·아키텍처·벤치마크(BrainBench P@5 49.1%, graph OFF −31.4pp).
- [[applications/mantena-2026-hermes-gbrain-setup-vps]] — Hermes + AWS EC2 실전 셋업. 개인 튜토리얼의 사용자 변형판.
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]] — GeekNews 한국어 소개.
- [[applications/tilnote-2026-gbrain-repository-core-summary]] — 저장소 구조·버전 진화 한국어 정리.
- [[overviews/gbrain-ecosystem-overview]] — gbrain 생태계 상위 지도.
