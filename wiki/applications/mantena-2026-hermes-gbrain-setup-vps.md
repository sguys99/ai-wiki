---
title: "Hermes + GBrain: A Complete Setup Guide (escvelocity)"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/mantena-2026-hermes-gbrain-setup-vps.md
raw_filename: "mantena-2026-hermes-gbrain-setup-vps.md"
source: mantena-2026-hermes-gbrain-setup-vps.md
source_collection: external
author: "Sudhir Mantena"
url: "https://escvelocity.com/hermes-gbrain-setup-vps/"
publisher: "escvelocity.com"
publication_date: "2026-05-06"
updated: "2026-05-15"
tags: [gbrain, hermes, tutorial, aws-ec2, ubuntu, bun, pglite, cron, x-twitter, oauth-pkce, ngrok-bypass]
---

## 요약 (Summary)

Sudhir Mantena가 AWS EC2 + Hermes + GBrain을 4-Part(설치 / 인제스션 / X own·repost 수집 / X likes via OAuth)로 통합한 실전 가이드. **PATH 픽스**, `~/gbrain` ↔ `~/brain` 분리, **slug ↔ path 매칭 트러블슈팅**, 그리고 **X Basic tier(\$200/월) + ngrok(\$8/월) 둘 다 회피**하는 pay-per-use credits + VPS public IP OAuth 2.0 PKCE 패턴이 핵심.

## 주요 기여 (Key Contributions)

1. **Hermes에게 위임하는 자동 ingestion** — *"Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/"* 한 줄로 markdown 작성을 Hermes에 위임 → "manual ingestion" 라벨링 무효화.
2. **PATH 픽스** — Hermes는 non-interactive shell이므로 `~/.profile`에 `export PATH="$HOME/.bun/bin:$PATH"` 필수.
3. **5분 cron sync 패턴** — `*/5 * * * * gbrain sync --repo /home/ubuntu/brain >> sync.log 2>&1`.
4. **X OAuth ngrok 우회** — VPS public IP를 callback host로 (`http://YOUR_VPS_IP:8000/callback`). 짧은 시간 port 8000 열고 토큰 받은 뒤 닫음. `offline.access` scope로 refresh token 발급 → 무한.
5. **시크릿 저장은 `gbrain config set secrets.X_BEARER_TOKEN`** — 별도 env 파일 관리 안 함.
6. **운영 cron 튜닝** — 30분마다는 과함 → 일 2회 `0 8,20 * * *`로 크레딧 절약.

## 방법론 및 아키텍처 (Methodology and Architecture)

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

### Part 별 흐름

- **Part 1 설치**: Bun → `git clone gbrain` → `bun install && bun link` → PATH 픽스 → `mkdir ~/brain && git init` → `gbrain init` (PGLite default) → 5분 cron → `gbrain doctor`.
- **Part 2 인제스션**: Hermes에 위임. slug 매칭 안 맞으면 `~/.gbrain/sync-failures.jsonl` 비우고 `--skip-failed`.
- **Part 3 X own/repost**: Bearer Token + 사용자 ID 조회 + collector 빌드 위탁 + cron 튜닝.
- **Part 4 X likes**: OAuth 2.0 PKCE를 VPS public IP로 받음 → 토큰을 `gbrain config secrets`에 저장 → port 8000 다시 닫음.

## 결과 (Results)

- `python3 x_to_brain.py` 출력: `{"own_total": 399, "likes_total": 0, "own_new": 7}` → OAuth 후 `{"own_total": 399, "likes_total": 396, "likes_new": 396}`.
- 비용 절감: X Basic \$200/월 + ngrok \$8/월 → pay-per-use \$25 (수개월) + ngrok \$0.
- 정량 retrieval 벤치마크는 없음 (운영 가이드 성격).

## 한계 (Limitations)

- 작성 시 GBrain v0.22 기준 → 현재 v0.36이라 일부 신기능(`gbrain skillpack scaffold`, `gbrain doctor --remediate` 등)은 명시 안 됨.
- OAuth callback 동안 port 8000을 0.0.0.0/0으로 열어둠 → PKCE state 검증을 Hermes 스크립트에 명시 권장.
- X 정책 변경 시 `offline.access` refresh token 무효화 가능성.
- single-operator 전제. 팀 sharing은 [[applications/garrytan-gbrain]]의 Postgres 모드 필요.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 본 가이드가 설치하는 1차 시스템.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — "manual ingestion" 라벨이 본 가이드의 Hermes 위임 패턴으로 완화됨.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — 30-min install·schema discipline 요구라는 평가와 본 가이드의 실제 경험이 일치.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — verification runbook과 본 가이드의 `gbrain doctor` 검증이 같은 ethos.
