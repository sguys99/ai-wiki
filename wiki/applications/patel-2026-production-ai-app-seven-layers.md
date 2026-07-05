---
title: "A production AI app isn't picking the right model — the seven layers nobody talks about"
type: article
year: 2026
category: applications
source: patel-2026-production-ai-app-seven-layers.md
raw_path: raw/articles/patel-2026-production-ai-app-seven-layers.md
raw_filename: "patel-2026-production-ai-app-seven-layers.md"
source_collection: external
author: "Manthan Patel"
url: "https://www.linkedin.com/posts/leadgenmanthan_a-production-ai-app-isnt-picking-the-right-share-7479404260216995843-Gh3z/"
publisher: "LinkedIn"
tags: [production-ai, app-architecture, claude-code, harness, project-structure]
figures:
  - id: fig01
    file: assets/patel-2026-production-ai-app-seven-layers/fig01.png
    raw: raw/articles/patel-2026-production-ai-app-seven-layers-figures/fig01.png
    caption: "Anatomy of a Production AI App — 7개 레이어 파일 트리, .claude/를 'the new layer'로 강조"
    strategy: manual
    curated: true
---

## 요약 (Summary)

Manthan Patel이 보는 프로덕션 AI 앱은 좋은 모델을 고르는 일도, 영리한 prompt도, fine-tuned 모델도, agent framework도, API wrapper도 아니다. 프로덕션의 본질은 이 레이어들을 엮어 사용자가 몰려와도 버티는 하나의 시스템으로 만드는 규율이다. 그는 실제 SaaS 코드베이스(Next.js·Supabase·Stripe 스택)를 7개 레이어로 해부하고, 마지막 자리에 `.claude/` 디렉토리를 정식 레이어로 올린다. 못을 박듯 요약한 한 문장은 이렇다. **"모델은 쉬운 10%, 이 레이어들이 아무도 말하지 않는 90%다."**

## 7개 레이어 (The Seven Layers)

| # | 레이어 | 디렉토리 | 책임 |
|---|---|---|---|
| 1 | The Surface | `app/` | 사용자가 만지는 Next.js 라우터. 제품 페이지·auth·billing·checkout·30여 SEO 페이지. **얇게 유지**하고 로직은 아래로 민다 |
| 2 | The Engine | `lib/` | 실제 작업이 벌어지는 곳. `export/`(과금 가치 파이프라인)·`payments/`(Stripe 구독)·`security/`(RLS) |
| 3 | The State Layer | `stores/` | zustand + zundo 되돌림 가능 상태. `editorStore.ts`(Ctrl+Z 안전)·`subscriptionStore.ts`(plan/billing) |
| 4 | The Building Blocks | `components/` + `hooks/` | UI primitive + 20여 custom hook. 복붙 대신 editor·marketing·dashboard 단일 체계 |
| 5 | The Data Foundation | `supabase/` | auth·Postgres·RLS, dev/prod 분리. 버전 관리된 migration, 실 데이터로 테스트 안 함 |
| 6 | The Safety Net | `e2e/` + `tests/` | Playwright(E2E) + Vitest(unit), CI에 물려 배포 전 regression 차단 |
| 7 | The New Layer | `.claude/` | settings.json·hooks·agents·skills·commands + 루트 CLAUDE.md·AGENTS.md로 매 실행에 전체 맥락 제공 |

![[assets/patel-2026-production-ai-app-seven-layers/fig01.png]]
*Figure 1: Anatomy of a Production AI App — 실제 Next.js 앱의 파일 트리. `app/`→`.claude/`까지 7개 레이어가 색으로 구분되고, 맨 아래 `.claude/`가 "the new layer: your AI teammate"로 강조된다 (Patel 2026)*

## 핵심 관점 (Why It Matters)

무게중심이 모델에서 **모델을 감싼 구조**로 옮겨갔다는 얘기다. 흥미로운 지점은 7번 레이어다. `.claude/`를 `app/`·`lib/`·`supabase/`와 동급의 코드베이스 레이어로 세웠다. harness(모델에 실행 맥락을 주는 층)를 곁다리 설정이 아니라 앱 아키텍처의 정식 구성원으로 본 것이다. 그의 처방은 단순하다. 이 구조를 한 번 세워두고 프로젝트마다 재사용하라는 것이다.

## 한계 (Limitations)

특정 스택에 강하게 묶인 짧은 LinkedIn 카드다. 각 레이어의 트레이드오프도, 코드 예시도, 실측 데이터도 없어 일반화는 독자 몫으로 남는다. 게시 연도는 확인되지 않아 `.claude/` 성숙도를 근거로 2026으로 추정해 표기했다.

## 관련 페이지 (Related Pages)

- [[overviews/agent-harness-engineering-overview]] — harness를 앱의 정식 레이어로 세운 이 글의 7번 레이어와 직접 맞닿는 개괄
- [[overviews/prompt-to-loop-engineering-evolution-overview]] — 무게중심이 prompt→context→harness→loop로 밀려온 계보. "쉬운 10% / 90%" 주장과 같은 흐름
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — 같은 저자군의 Claude Code 실전 글
- [[agents/kang-2026-no-longer-prompting-claude]] — 프롬프트 너머로 무게중심이 옮겨갔다는 인접 관점