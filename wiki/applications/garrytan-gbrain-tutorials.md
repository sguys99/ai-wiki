---
title: "garrytan/gbrain: docs/tutorials"
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

## 요약

GBrain 저장소의 `docs/tutorials/` 디렉토리는 시스템을 실제로 세우고 운영하는 절차를 담은 실전 가이드 모음이다. 수집 시점 기준으로 README 1편과 튜토리얼 4편, 모두 5개 문서로 구성돼 있다.

같은 저장소의 README를 다룬 [[applications/garrytan-gbrain]]이 GBrain이 무엇이고 왜 그렇게 설계됐는지를 설명한다면, 이 디렉토리는 그 시스템을 손으로 구축하는 순서와 운영 명령을 설명한다. 두 페이지의 역할은 설계 문서와 설치 문서의 관계에 가깝다.

완성된 튜토리얼 4편은 각각 다른 규모를 겨냥한다. 솔로 사용자를 위한 개인 brain, 10~50명 팀을 위한 회사 brain, 스킬을 자동으로 개선하는 `gbrain skillopt`, 코딩 에이전트에 메모리를 붙이는 연결 가이드다. 네 편 모두 예상 소요 시간과 API 비용을 앞머리에 명시하는 형식을 공유한다.

## 배경

개인용 지식 시스템을 실제로 운영하려면 설계 사상만으로는 부족하다. 어느 서비스를 어느 티어로 쓰는지, 토큰을 어떻게 발급하는지, DB 연결을 어떤 모드로 여는지 같은 결정이 실패 지점을 만든다.

이 디렉토리는 그 결정들을 미리 고정해 제공한다. 개인 brain 문서는 함정(gotchas)을 본문과 분리한 별도 절로 두었고, 회사 brain 문서는 운영 명령 세 개를 따로 묶어 제시한다.

저자는 개인 brain 문서에서 설계의 기준점을 한 문장으로 밝힌다. "Git repo is the system of record." 4개 레이어에서 Brain이 git 저장소로 지정된 것과 같은 맥락으로, 지식의 원본은 git 저장소에 두고 나머지 구성 요소는 그 저장소를 읽고 쓰는 층으로 본다는 뜻이다.

README는 완성된 4편과 함께 진행 중인 5편도 안내한다. 진행 중인 목록은 VC 딜플로우 설정, 기존 vault 마이그레이션, 코드베이스를 코드 brain으로 인덱싱, Ollama와 llama.cpp를 활용한 완전 로컬 실행, 자동 야간 풍부화 "dream cycle" 구성이다.

## 핵심 개념

### 4개 레이어

개인 brain 튜토리얼은 시스템을 네 개 레이어로 나눈다. 각 레이어가 무엇을 담당하고 어떤 구현을 쓰는지가 지정돼 있어서, 구축 과정에서 "이 파일은 어디에 두는가"를 헷갈리지 않게 한다.

| 레이어 | 구현 | 역할 |
|---|---|---|
| Brain | git 저장소 | 계속 자라는 지식 베이스 |
| Harness | AlphaClaw 또는 OpenClaw | 도구와 메모리를 갖춘 LLM 런타임 |
| Chat Interface | Telegram | 사용자와 주고받는 소통 채널 |
| Skills | GBrain 경유 60개 이상 | 재사용 가능한 에이전트 능력 |

harness는 모델을 감싸 도구와 상태를 제공하는 실행 환경을 뜻한다. 여기서는 AlphaClaw 또는 OpenClaw가 그 자리를 맡고, Render에 배포된다.

### 저장소 두 개의 분리

개인 셋업은 GitHub 저장소를 두 개 요구한다. 하나는 에이전트 설정을 담는 workspace repo이고, 다른 하나는 지식 베이스를 담는 brain repo다.

튜토리얼은 분리 이유를 따로 밝히지 않는다. 다만 담는 내용이 에이전트 설정과 지식으로 갈리므로, 저장소를 나누면 지식이 쌓인 이력과 설정을 바꾼 이력이 한 저장소에 섞이지 않는다.

### 튜토리얼 네 편의 배치

README가 네 편을 나열하는 순서와 각 편이 겨냥하는 범위는 다음과 같다. 1편과 2편이 사용자 규모를 다루고, 3편은 시스템 자체의 개선을, 4편은 외부 개발 도구와의 연결을 다룬다.

| 순서 | 튜토리얼 | 적용 범위 |
|---|---|---|
| 1 | 개인 AI 에이전트와 brain 설정 | 솔로 사용자 |
| 2 | 회사 brain 설정 | 10~50명 팀 |
| 3 | `gbrain skillopt`로 스킬 자동 개선 | 스킬 단위 |
| 4 | 코딩 에이전트에 메모리 부여 | 개발 도구 연동 |

## 방법

### 개인 brain 셋업

개인 brain 튜토리얼은 약 2시간에 완료하는 것을 목표로 하며 월 $100~150의 운영 예산을 전제한다. 시작하기 전에 준비할 항목이 정해져 있다.

| 준비 항목 | 용도 |
|---|---|
| GitHub 계정 | workspace repo와 brain repo 생성 |
| Render 계정 | harness 배포 |
| Telegram | 대화 채널 |
| API 키 | 최소 OpenAI와 Anthropic |
| 예산 | 월 $100~150 |

튜토리얼이 별도 절로 경고하는 함정은 다섯 가지다. 모두 기본값이나 가장 흔한 선택지를 그대로 쓰면 걸리는 자리이며, 문서가 이유까지 밝힌 것은 Render 티어 하나뿐이다.

| 함정 | 요구 사항 | 문서가 밝힌 이유 |
|---|---|---|
| Render 티어 | Pro 티어 필수 | base 티어는 메모리가 부족하다 |
| GitHub 토큰 | fine-grained 토큰에서 대상 repo를 명시적으로 선택 | 명시 없음 |
| Supabase 확장 | pgvector extension 활성화 | 명시 없음 |
| DB 연결 | transaction pooler(port 6543) 사용, direct connection 금지 | 명시 없음 |
| 마이그레이션 | IPv4 호환성을 명시적으로 설정 | 명시 없음 |

transaction pooler는 Supabase가 제공하는 연결 풀링 모드로 포트 6543을 쓴다. 튜토리얼은 direct connection 대신 이 모드를 요구한다.

월 비용은 세 항목의 합으로 제시된다. 다만 항목의 상한을 그대로 더하면 $630이 되어 합계로 적힌 $150을 크게 넘는다. 합계 $100~150은 항목 상한의 합이 아니라 일반적 사용량을 가정한 값으로 보아야 한다.

| 구성 | 비용 |
|---|---|
| Render Pro | 약 $85 |
| Supabase | Free~$25 |
| API | $55~$520 |
| **합계** | **월 $100~$150** |

배포를 마친 뒤의 확장 경로는 세 가지다. 이메일, 캘린더, Slack 같은 외부 데이터 소스를 통합하거나, 기존 AI 클라이언트를 같은 brain에 연결하거나, 팀 기반 셋업으로 넘어간다.

### 회사 brain 확장

회사 brain 튜토리얼은 개인 에이전트를 10~50명 규모로 확장하면서 보안과 프라이버시를 유지하는 절차를 다룬다. 완료 목표는 90분이다.

개인 brain 위에 세 가지가 추가된다. 셋 다 "여러 사람이 같은 시스템을 쓴다"는 조건에서 파생된 요구다.

| 추가 요소 | 내용 |
|---|---|
| 격리된 다중 콘텐츠 소스 | 소스마다 별도 git 저장소에서 sync |
| per-user OAuth 인증 | 사용자별로 세분화된 권한 부여 |
| 개별 스코프 워크플로 | 폴더, 예약 작업, 커스텀 스킬을 사람마다 다르게 |

저장 계층도 함께 바뀐다. 단일 사용자용 PGLite에서 공유 Postgres 인프라로 옮긴다. 조직은 "shared company wiki", "customer notes", "internal-only" 같은 소스를 각각 독립된 git 저장소에서 sync한다.

접근 제어는 애플리케이션이 아니라 DB 레이어에서 동작한다. 팀원마다 OAuth 자격증명이 write 가능한 소스와 read 가능한 소스를 지정하는 방식이다. 튜토리얼이 드는 예시는 다음과 같다.

| 역할 | write 가능 | read 가능 |
|---|---|---|
| 영업 담당 | 자기 customer 폴더 | customer, shared |
| 내부 운영 직원 | 해당 없음(예시 미제시) | customer 정보 접근 불가 |

스코핑 방식은 두 모델 중에서 고른다. 선택 기준은 팀이 쓰는 AI 클라이언트가 여러 종류인지 아니면 에이전트가 중앙에 하나 배포돼 있는지다.

| 모델 | 격리 수단 | 권장 상황 |
|---|---|---|
| OAuth 격리 | DB가 강제 | 다양한 AI 클라이언트를 쓰는 팀 |
| 디렉토리 스코핑 | 단일 소스 내 관례 | 중앙 집중형 에이전트 배포 |

도입률을 올리는 방법도 절차로 제시된다. 팀원이 직접 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두면(pre-population) 도입률이 크게 향상된다. 이를 3단계로 정형화한 것이 botmaster pattern이다.

| 단계 | 내용 |
|---|---|
| seeding | 개인 디렉토리에 관련 컨텍스트를 미리 채운다 |
| 시연 | 가이드 워크플로로 brain이 무엇을 할 수 있는지 보여준다 |
| 졸업 | 독립 접근으로 전환한다 |

운영은 세 개 명령이 대부분을 처리한다.

| 명령 | 역할 |
|---|---|
| `gbrain autopilot` | 지속적인 백그라운드 헬스 유지 |
| `gbrain doctor --remediate` | 표적 self-healing |
| `gbrain sources status` | 소스 모니터링 |

답변 품질 측면에서는 환각 대신 정직한 gap 탐지를 강조한다. 모르는 것을 지어내지 않고 지식의 공백으로 보고하며, 모든 주장은 원문 문서로 정밀 인용해 소싱한다.

### 스킬 자동 개선

`gbrain skillopt` 튜토리얼은 약 20분, API 비용 약 $1을 예상한다. 핵심 개념은 스킬 markdown 파일을 학습 가능한 파라미터로 취급하는 것이다. 즉 스킬 문서를 사람이 감으로 고치는 대상이 아니라, 측정하고 최적화하는 대상으로 본다.

최적화는 네 단계 루프로 진행된다. 마지막 단계가 관문 역할을 해서, 성능이 측정 가능하게 개선될 때만 편집이 수용된다.

| 단계 | 내용 |
|---|---|
| 1. 벤치마크 생성 | 스킬에서 현실적 과제를 뽑는다 |
| 2. 평가 기준 강화 | 채점 규칙을 더 엄격하게 만든다 |
| 3. 옵티마이저 실행 | 스킬 문서 편집안을 생성한다 |
| 4. validation gate | held-out 검증을 통과한 변경만 수용한다 |

벤치마크는 JSONL 파일로 작성한다. 각 항목은 과제 설명과 규칙 기반 judge를 담는다. judge가 LLM 판정이 아니라 규칙이므로 같은 출력에는 항상 같은 점수가 나온다.

| judge | 판정 기준 |
|---|---|
| `contains` | 특정 문자열 포함 여부 |
| `regex` | 정규식 일치 여부 |
| `max_chars` | 출력 길이 상한 |
| `min_citations` | 최소 인용 수 |

데이터셋 구성에는 제약이 있다. validation 데이터셋은 최소 5개 과제가 필요하다. 시작 구성으로는 15개 과제 벤치마크를 `1:1:1`로 split하는 것을 권장한다.

안전장치는 세 가지다. 비용과 저장소 상태, 번들 스킬 보호를 각각 담당한다.

| 안전장치 | 내용 |
|---|---|
| dry-run | 실행 전에 비용을 추정한다 |
| clean git working tree | 커밋되지 않은 변경이 있으면 실행하지 않는다 |
| 번들 스킬 보호 | held-out test set과 명시적 flag 없이는 덮어쓰기를 거부한다 |

루프는 한 번으로 끝나지 않는다. 관찰된 에이전트 행동을 바탕으로 벤치마크를 다듬어 "좋음"의 정의를 점진적으로 날카롭게 만든다.

### 코딩 에이전트 연결

마지막 튜토리얼은 MCP를 통해 GBrain을 Claude Code나 Codex와 통합한다. 약 10분이면 끝나며, 이미 brain이 있는지 여부에 따라 두 경로로 갈린다.

| 경로 | 전제 | 절차 |
|---|---|---|
| Path A | 기존 brain 보유 | 특정 flag로 HTTP serving을 켜고, 인증 토큰을 발급받아, 그 토큰으로 로컬 에이전트를 연결한다 |
| Path B | 신규 시작 | 로컬 PGLite DB를 초기화하고, 콘텐츠를 채우고, 에이전트에 wiring한다 |

Path B가 더 가벼운 이유는 서버 배포와 토큰 발급이 없기 때문이다. 로컬 DB 하나로 끝나므로 최소 셋업에 해당한다.

두 경로 모두 같은 네 가지 작업 습관으로 수렴한다. 도구를 연결하는 것보다 이 습관을 들이는 것이 실제 효용을 만든다는 것이 튜토리얼의 관점이다.

| 습관 | 내용 |
|---|---|
| 검색 우선 | 질문하기 전에 brain을 먼저 검색한다 |
| 결정 캡처 | 내려진 결정을 지속적으로 기록한다 |
| 미팅 준비 | 사전 준비에 brain을 활용한다 |
| 전문가 찾기 | 지식 베이스 안에서 담당자를 찾는다 |

문서에는 트러블슈팅 표가 함께 실려 있고, 팀 확장과 자율 풍부화로 이어지는 다음 단계도 안내한다.

## 결과

튜토리얼 모음은 벤치마크 문서가 아니다. 대신 네 편 모두 앞머리에 소요 시간과 비용을 명시해, 착수 전에 규모를 가늠할 수 있게 한다.

| 튜토리얼 | 소요 시간 | 비용 | 대상 규모 |
|---|---|---|---|
| 개인 AI 에이전트와 brain 설정 | 약 2시간 | 월 $100~150 | 1인 |
| 회사 brain 설정 | 90분 | 데모 API 약 $5, 운영 월 $100 미만 | 10~50명(비용은 25명 기준) |
| `gbrain skillopt` | 약 20분 | API 약 $1 | 스킬 단위 |
| 코딩 에이전트 연결 | 약 10분 | 명시 없음 | 1인 |

두 셋업의 비용 구성은 성격이 다르다. 개인 셋업은 호스팅 고정비가 큰 비중을 차지한다. Render Pro 약 $85가 합계 $100~150의 대부분이고, Supabase는 무료 티어로 시작할 수 있다.

회사 셋업의 월 $100 미만은 25명 팀 기준이며 구성이 반대다. ZeroEntropy 임베딩 약 $35와 Anthropic API 합성 질의 약 $50, 즉 호스팅이 아니라 API 사용료가 대부분이다. $100 미만을 25명으로 나누면 1인당 월 $4 미만이므로, 사람당 비용은 개인 셋업보다 낮다.

## 한계

완성된 튜토리얼은 4편뿐이고 5편은 진행 중 상태다. VC 딜플로우, vault 마이그레이션, 코드베이스 인덱싱, 완전 로컬 실행, dream cycle이 아직 문서 공백으로 남아 있다.

개인 셋업이 특정 SaaS 스택을 전제한다는 점도 제약이다. Render, Supabase, Telegram이 사실상 고정 선택지이며, Ollama와 llama.cpp를 쓰는 완전 로컬 경로는 진행 중 튜토리얼로만 예고돼 있다.

`skillopt`와 `connect-coding-agent` 문서는 수집 시점에 전문 재현이 거부되어 요약 기반으로 정리했다. 정확한 명령과 플래그는 원문 확인이 필요하다.

회사 brain의 접근 제어 예시도 영업 담당과 내부 운영 직원 두 역할만 제시한다. 더 복잡한 조직 구조에서 권한을 어떻게 설계할지는 다루지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| botmaster pattern | 팀원의 개인 디렉토리에 컨텍스트를 미리 seeding하고, 가이드 워크플로로 시연한 뒤, 독립 접근으로 졸업시키는 온보딩 패턴 |
| skillopt | 스킬 문서를 벤치마크로 측정하고 최적화하는 GBrain 명령. 성능 개선이 확인된 편집만 수용한다 |
| held-out validation gate | 최적화에 쓰지 않고 남겨둔 검증 데이터셋으로 변경 수용 여부를 판정하는 관문 |
| transaction pooler | Supabase가 제공하는 연결 풀링 모드로 포트 6543을 쓴다. 튜토리얼은 direct connection 대신 이 모드를 요구한다 |
| PGLite | 개인 셋업과 코딩 에이전트 Path B가 쓰는 단일 사용자 로컬 Postgres. 회사 셋업에서는 공유 Postgres로 대체된다 |
| pre-population | 팀원이 질의를 시작하기 전에 각자 워크스페이스를 미리 채워두는 도입 전략 |

## 관련 페이지

- [[applications/garrytan-gbrain]]: 같은 저장소의 README. 시스템 thesis와 아키텍처, 벤치마크를 다룬다. 이 페이지가 설치 절차를 맡고 README 페이지가 설계를 맡는다.
- [[applications/mantena-2026-hermes-gbrain-setup-vps]]: Hermes와 VPS를 쓴 실전 셋업. 개인 튜토리얼의 사용자 변형이다.
- [[applications/xguru-2026-gbrain-open-source-personal-knowledge]]: GeekNews의 한국어 소개.
- [[applications/tilnote-2026-gbrain-repository-core-summary]]: 저장소 구조와 버전 변화를 정리한 한국어 자료.
- [[agents/microsoft-skillopt]]: 스킬 최적화 계열 연구. `gbrain skillopt`와 접근을 비교할 수 있다.
- [[overviews/gbrain-ecosystem-overview]]: gbrain 생태계 상위 지도.
