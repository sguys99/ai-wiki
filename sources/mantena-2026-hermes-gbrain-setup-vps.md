---
title: "Hermes + GBrain: A Complete Setup Guide"
type: article
year: 2026
category: applications
raw_path: raw/articles/mantena-2026-hermes-gbrain-setup-vps.md
raw_filename: "mantena-2026-hermes-gbrain-setup-vps.md"
source_collection: external
author: "Sudhir Mantena"
url: "https://escvelocity.com/hermes-gbrain-setup-vps/"
publisher: "escvelocity.com"
publication_date: "2026-05-06"
updated: "2026-05-15"
tags: [gbrain, hermes, tutorial, vps, aws, ec2, ubuntu, bun, pglite, cron, x-twitter, oauth-pkce, ngrok-bypass]
---

## 한 줄 요약 (One-line Summary)

**Sudhir Mantena**가 AWS EC2 + Hermes Agent 위에 GBrain을 설치하고 ① 5분 cron으로 brain repo 자동 sync, ② Hermes에게 *"이 PDF/URL을 ingest해서 brain에 써줘"* 라고 위임하는 자동 ingestion 패턴, ③ X(Twitter) Basic tier(\$200/월)와 ngrok(\$8/월) **둘 다 회피**하고 pay-per-use credits + VPS public IP 기반 OAuth 2.0 PKCE로 own posts / reposts / likes를 일 2회 수집하는 통합 — 까지를 실전 cron + 코드 조각 + 트러블슈팅과 함께 정리한 풀세트 운영 가이드.

## 1. 자료 정보 (Document Information)

- **저자**: Sudhir Mantena
- **매체**: escvelocity.com (Artificial Intelligence 카테고리)
- **URL**: <https://escvelocity.com/hermes-gbrain-setup-vps/>
- **게시 / 갱신**: 2026-05-06 / Updated 2026-05-15
- **전제 환경**: AWS EC2 (권장 t3.medium) · Ubuntu 24 · Hermes Agent 사전 설치
- **목적 인용**: *"a self-improving, always-on personal knowledge base that ingests my blog articles, X activity (posts, articles, likes), news articles from the web, research reports and documents; all without paying \$200/mo for X API or \$8/mo for ngrok."*

## 2. 주요 기여 (Key Contributions)

1. **PATH 이슈 해결책** — Hermes가 non-interactive shell로 명령을 spawn하므로 `~/.bashrc`만으로는 `bun`/`gbrain`을 못 찾는다. `~/.profile`에 `export PATH="$HOME/.bun/bin:$PATH"` 추가가 핵심.
2. **brain repo는 GBrain code 디렉토리와 분리** — `~/gbrain`은 코드, `~/brain`은 데이터. `git init` + 빈 commit으로 시작.
3. **PGLite default + 5분 cron sync 패턴** —
   ```bash
   */5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1
   ```
4. **"manual ingestion"이 아니라 "Hermes에게 위임"** — 저자가 README를 처음 읽었을 때 "수동으로 markdown 만들어야 하나" 오해했다가, *"Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/"*라고 Hermes에게 말해서 자동화로 전환. 이 흐름이 [[applications/gajjar-2026-gbrain-vs-computer-memory]]의 "manual ingestion" 라벨링을 완화한다.
5. **slug ↔ path 매칭 트러블슈팅** — Hermes가 subdirectory에 쓰면 frontmatter `slug:` 가 path와 일치해야 sync 성공. 안 맞으면 `~/.gbrain/sync-failures.jsonl`에 누적 → `> ~/.gbrain/sync-failures.jsonl; gbrain sync --repo ~/brain --skip-failed`로 클리어.
6. **X(Twitter) Basic tier 우회**: \$200/월 Basic은 미국 외에서 구매 불가 → pay-per-use credits 모델 (resource당 \$0.001), 시작 시 \$25 충전 + auto-recharge 추천.
7. **X 사용자 ID 조회 코드 + GBrain config secret store**:
   ```bash
   gbrain config set secrets.X_BEARER_TOKEN "..."
   curl -sf -H "Authorization: Bearer $X_BEARER_TOKEN" \
     "https://api.x.com/2/users/by/username/YOUR_HANDLE" | python3 -m json.tool
   ```
8. **OAuth 2.0 PKCE를 VPS public IP로 받는 ngrok 우회** —
   - Callback URL을 `http://YOUR_VPS_IP:8000/callback`으로 설정.
   - AWS EC2 Security Group에서 8000 포트 일시 열기 → Hermes로 Python OAuth 스크립트 생성 → 로컬 브라우저에서 authorize → callback으로 토큰 수신 → `gbrain config set secrets.X_USER_ACCESS_TOKEN/secrets.X_USER_REFRESH_TOKEN` → 8000 포트 다시 닫기.
   - 핵심 인용: *"The `offline.access` scope gives you a refresh token — it won't expire."*
9. **운영 cron 튜닝** — 30분마다 X 폴링은 personal use에 과함 + 크레딧 낭비 → `0 8,20 * * *` (일 2회 8시·20시)로 조정.
10. **최종 architecture 다이어그램** —
    ```
    X Activity  → (08·20시 cron)  x_to_brain.py
                    ├─ Bearer → own posts + reposts
                    └─ OAuth 2.0 → likes (auto-refresh)
                  ↓
                ~/brain/*.md
                  ↓ (5분 cron)
                gbrain sync → PGLite
                  ↓
                Hermes agent (brain-first context)
    ```

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 4-Part 구조

- **Part 1: GBrain 설치** — Bun 설치 → repo clone → `bun install && bun link` → PATH 픽스 → brain repo 분리 → `gbrain init` → 5분 cron → `gbrain doctor`.
- **Part 2: 콘텐츠 인제스션** — Hermes가 ingest skill을 읽고 fetch → process → `~/brain/`에 markdown 작성 → cron sync → GBrain 인덱싱. slug 매칭 주의.
- **Part 3: X own posts + reposts** — Bearer Token 발급 → 사용자 ID 조회 → Hermes에게 collector 빌드 위탁 → cron `13,43 * * * *`로 시작 후 일 2회로 조정.
- **Part 4: X likes via OAuth 2.0 PKCE** — VPS public IP를 callback host로 사용해 ngrok 없이 사용자 컨텍스트 토큰 획득.

### 3.2 운영 디테일

- **버전 확인**: `gbrain --version` 결과 `gbrain 0.22.x`로 인용 → 이 가이드 작성 시 v0.22 계열, repo의 현재 v0.36과 차이 있음 (5월 한 달 사이 v0.22 → v0.36).
- **헬스체크**: `gbrain doctor`로 sync/embedding/schema 검증.
- **시크릿 분배**: `gbrain config set secrets.<KEY>` 으로 GBrain config에 저장 후 cron이 그 키를 export해서 Python 스크립트에 주입 — 평문 env 파일을 별도 관리하지 않음.

### 3.3 트러블슈팅 노트

- PATH 누락 → Hermes에서 `bash -c 'which gbrain'`가 `/home/ubuntu/.bun/bin/gbrain` 반환해야 OK.
- slug mismatch → `~/.gbrain/sync-failures.jsonl` 비우고 `--skip-failed` 재시도.
- Supabase puller가 silently page를 건너뛸 수 있다는 GBrain의 known failure mode 인지.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 정량 벤치마크 없음 — 운영 가이드.
- 검증 가능한 산출물:
  - `python3 x_to_brain.py` 실행 시 `{"own_total": 399, "likes_total": 0, "own_new": 7}` 같은 JSON 반환.
  - OAuth 후 `{"own_total": 399, "likes_total": 396, "likes_new": 396}`로 likes도 수집.
- 비용 절감: X Basic \$200/월 + ngrok \$8/월 → pay-per-use \$25 credit (수개월 사용) + ngrok \$0.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 가이드 작성 시 GBrain v0.22 → 현재 v0.36이라 일부 명령(예: `gbrain skillpack scaffold`, `gbrain doctor --remediate`)는 명시되지 않음. **현재 시점에 따라 README 우선**.
- VPS public IP를 OAuth callback에 노출하는 동안(짧은 시간이지만) port 8000이 0.0.0.0/0으로 열림 → CSRF/MITM 대비 PKCE state 검증을 Hermes에게 명확히 지시해야 함.
- X likes 무한 토큰: `offline.access`로 refresh token이 만료되지 않는다고 명시하나, X(Twitter) 정책 변경 시 무효화 가능.
- 가이드는 single-operator + single-tenant 가정. 팀 sharing은 [[applications/garrytan-gbrain]]의 Postgres 전환 + git 동기화 모드 필요.

## 6. 관련 연구 (Related Work)

- [[applications/garrytan-gbrain]] — 본 가이드가 설치/운영하는 1차 시스템.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — "manual ingestion" 라벨이 본 가이드의 Hermes 위임 패턴으로 완화됨을 보여주는 보완 자료.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — 30분 install·single-operator scope·schema discipline 요구라는 평가와 본 가이드의 실제 경험이 일치.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — verification runbook과 본 가이드의 `gbrain doctor` / sync 로그 검증 패턴이 같은 ethos.
- **Andrej Karpathy LLM Wiki 패턴** — 본문 명시: *"The concept aligns with Andrej Karpathy's LLM Wiki pattern, which maintains structured markdown pages that compound with new sources."*

## 7. 용어집 (Glossary)

- **Hermes Agent**: 같은 저자(Garry Tan)의 에이전트 플랫폼. GBrain skillpack의 first-class consumer.
- **PGLite**: WASM Postgres 17. GBrain의 default zero-config 엔진.
- **brain repo / gbrain repo**: brain repo = 사용자 데이터 (`~/brain`), gbrain repo = 코드 (`~/gbrain`). 절대 섞지 말 것.
- **slug**: frontmatter 필드. subdirectory에 페이지를 쓰면 path와 일치해야 sync 성공.
- **PKCE (Proof Key for Code Exchange)**: OAuth 2.0의 public client 보안 확장. mobile/native/SPA처럼 client secret 보관이 어려운 환경용.
- **offline.access scope**: X OAuth 2.0에서 refresh token 발급을 활성화하는 scope. 본 가이드는 refresh token이 만료되지 않는다고 인용.
- **Bearer Token vs User Access Token**: 전자는 app 권한, 후자는 사용자 컨텍스트 권한 — likes 같은 personal endpoint는 후자 필요.
