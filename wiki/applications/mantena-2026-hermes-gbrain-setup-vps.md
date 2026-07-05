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

Sudhir Mantena가 AWS EC2에 Hermes와 GBrain을 얹어 4-Part(설치 / 인제스션 / X own·repost 수집 / X likes via OAuth)로 엮은 실전 가이드. **PATH 픽스**와 `~/gbrain` ↔ `~/brain` 분리, **slug ↔ path 매칭 트러블슈팅**을 짚고, X Basic tier(\$200/월)와 ngrok(\$8/월)을 둘 다 피해 가는 pay-per-use credits + VPS public IP OAuth 2.0 PKCE 패턴을 핵심으로 다룬다.

## 주요 기여 (Key Contributions)

1. **Hermes에게 위임하는 자동 ingestion** — *"Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/"* 한 줄이면 markdown 작성까지 Hermes가 처리한다. "manual ingestion"이라는 꼬리표가 무색해지는 지점.
2. **PATH 픽스** — Hermes가 non-interactive shell에서 도니 `~/.profile`에 `export PATH="$HOME/.bun/bin:$PATH"`를 넣어줘야 한다.
3. **5분 cron sync 패턴** — `*/5 * * * * gbrain sync --repo /home/ubuntu/brain >> sync.log 2>&1`.
4. **X OAuth ngrok 우회** — callback host를 VPS public IP로 잡는다(`http://YOUR_VPS_IP:8000/callback`). port 8000을 잠깐 열어 토큰만 받고 곧바로 닫는다. `offline.access` scope로 refresh token을 받아두면 이후로는 만료 걱정이 없다.
5. **시크릿 저장은 `gbrain config set secrets.X_BEARER_TOKEN`** — env 파일을 따로 두지 않는다.
6. **운영 cron 튜닝** — 30분 간격은 과하다. 하루 두 번 `0 8,20 * * *`로 줄이면 크레딧이 절약된다.

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
- **Part 2 인제스션**: Hermes에 맡긴다. slug 매칭이 어긋나면 `~/.gbrain/sync-failures.jsonl`을 비우고 `--skip-failed`로 넘어간다.
- **Part 3 X own/repost**: Bearer Token 확보, 사용자 ID 조회, collector 빌드 위탁, cron 튜닝 순으로 진행한다.
- **Part 4 X likes**: VPS public IP로 OAuth 2.0 PKCE를 받아 토큰을 `gbrain config secrets`에 저장하고, port 8000을 다시 닫는다.

## 결과 (Results)

- `python3 x_to_brain.py` 출력: `{"own_total": 399, "likes_total": 0, "own_new": 7}` → OAuth 후 `{"own_total": 399, "likes_total": 396, "likes_new": 396}`.
- 비용 절감: X Basic \$200/월 + ngrok \$8/월 → pay-per-use \$25 (수개월) + ngrok \$0.
- 정량 retrieval 벤치마크는 없음 (운영 가이드 성격).

## 한계 (Limitations)

- 작성 시점 기준이 GBrain v0.22라, 현재 v0.36에서 추가된 기능(`gbrain skillpack scaffold`, `gbrain doctor --remediate` 등)은 다루지 않는다.
- OAuth callback 동안 port 8000을 0.0.0.0/0으로 열어두므로, PKCE state 검증을 Hermes 스크립트에 명시해 두는 편이 좋다.
- X가 정책을 바꾸면 `offline.access` refresh token이 무효화될 수 있다.
- single-operator를 전제로 한다. 팀 단위로 공유하려면 [[applications/garrytan-gbrain]]의 Postgres 모드가 필요하다.

## 관련 페이지 (Related Pages)

- [[applications/garrytan-gbrain]] — 이 가이드가 설치하는 1차 시스템.
- [[applications/gajjar-2026-gbrain-vs-computer-memory]] — 여기서 지적된 "manual ingestion" 꼬리표를 본 가이드의 Hermes 위임 패턴이 덜어낸다.
- [[applications/vectorize-2026-gbrain-review-honest-assessment]] — 30분 설치와 schema discipline이 필요하다는 평가가 본 가이드의 실제 경험과 맞아떨어진다.
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained]] — verification runbook과 본 가이드의 `gbrain doctor` 검증이 같은 결을 공유한다.
