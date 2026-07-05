---
title: "A production AI app isn't picking the right model — the seven layers nobody talks about"
type: article
year: 2026
category: applications
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

## 한 줄 요약 (One-line Summary)

프로덕션 AI 앱의 본질은 좋은 모델이나 영리한 prompt가 아니다. 사용자가 몰려와도 버티는 하나의 시스템으로 여러 레이어를 엮어내는 규율이며, Patel은 그 구조를 7개 레이어로 나눠 제시한다. 모델은 쉬운 10%이고 나머지 90%가 이 레이어들이라는 주장이다.

## 1. 자료 정보 (Document Information)

- **저자**: Manthan Patel (LinkedIn @leadgenmanthan)
- **형식**: LinkedIn 포스트 (짧은 카드형 글)
- **주제**: 프로덕션 AI 앱을 지탱하는 코드베이스 레이어 구조. Next.js + Supabase + Stripe 스택을 전제로, `.claude/` 디렉토리를 별도 레이어로 세운 점이 특징이다.

## 2. 주요 기여 (Key Contributions)

- "production AI app ≠ 모델 선택 / prompt / fine-tuning / agent framework / API wrapper"라는 부정 정의로 글을 연다. 그리고 프로덕션의 정체성을 **레이어를 하나의 시스템으로 엮는 규율**로 다시 세운다.
- 실제 SaaS 코드베이스를 7개 레이어로 해부하고, 각 레이어의 책임을 한 줄로 정리한다.
- `.claude/`(settings.json·hooks·agents·skills·commands + 루트의 CLAUDE.md·AGENTS.md)를 코드베이스의 정식 레이어로 끌어올린다. harness를 앱 아키텍처의 일부로 보는 것이다.
- "모델은 쉬운 10%, 레이어가 90%"라는 무게중심 이동을 한 문장으로 못박고, 이 구조는 한 번 세워 여러 프로젝트에 재사용하라고 조언한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

7개 레이어로 코드베이스를 나눈다.

1. **The Surface — `app/`**: 사용자가 만지는 모든 것을 굴리는 Next.js 라우터. 제품 페이지·auth·billing·checkout·30여 개 SEO 페이지가 여기 산다. 이 레이어는 얇게 유지하고 진짜 로직은 더 깊이 밀어 넣는다.
2. **The Engine — `lib/`**: 실제 작업이 벌어지는 곳으로, UI는 아니다. `export/`(제품에 값을 매기는 파이프라인), `payments/`(실 구독용 Stripe), `security/`(사용자가 자기 데이터만 보게 하는 row-level security)가 들어간다.
3. **The State Layer — `stores/`**: zustand + zundo로 되돌릴 수 있는 클라이언트 상태. `editorStore.ts`는 모든 변경을 추적해 Ctrl+Z가 깨지지 않게 하고, `subscriptionStore.ts`는 plan limit과 billing 상태를 UI가 믿을 수 있게 보관한다.
4. **The Building Blocks — `components/` + `hooks/`**: UI primitive와 20여 개의 custom React hook. 화면을 복붙하는 대신 editor·marketing·dashboard를 하나의 체계로 통일한다.
5. **The Data Foundation — `supabase/`**: auth·Postgres·RLS를 dev/prod 환경으로 분리한다. migration은 버전 관리되어 스키마가 추측이 아니며, 실 사용자 데이터로는 테스트하지 않는다.
6. **The Safety Net — `e2e/` + `tests/`**: Playwright(E2E) + Vitest(unit). CI에 물려 regression을 배포 전에 잡는다.
7. **The New Layer — `.claude/`**: settings.json·hooks·agents·skills·commands가 Claude에 전체 맥락을 주고, 루트의 CLAUDE.md·AGENTS.md 덕분에 매 실행이 전체 그림에서 출발한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없는, 의견과 경험에 기댄 글이다. 핵심 정성 주장은 "모델은 쉬운 10%, 이 레이어들이 아무도 말하지 않는 90%"다. 구조를 한 번 만들어 프로젝트 간에 재사용하라는 실무 처방으로 글을 닫는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 특정 스택(Next.js·Supabase·Stripe·zustand)에 강하게 묶인 예시라, 다른 스택으로 일반화하는 것은 독자 몫이다.
- 짧은 LinkedIn 카드라 각 레이어의 근거와 트레이드오프는 얕게만 짚는다. 코드 예시나 실측 데이터는 없다.
- 게시 연도는 정확히 확인되지 않아 2026으로 표기했다(추정). `.claude/`의 agents·skills·commands 성숙도를 기준으로 삼았다.

## 6. 관련 연구 (Related Work)

- Harness Engineering 계보(Osmani, 이호연) — `.claude/`를 앱의 정식 레이어로 세운 이 글의 관점과 곧장 맞닿는다.
- Prompt→Context→Harness→Loop 진화 overview — 무게중심이 모델/prompt에서 실행 환경(harness)으로 밀려왔다는 이 글의 "쉬운 10% / 90%" 주장과 같은 흐름이다.
- Kang "No longer prompting Claude", Patel의 다른 Claude Code 실전 글들 — 같은 저자·주제군의 인접 자료다.

## 7. 용어집 (Glossary)

- **harness**: 모델을 감싸 실행 맥락(설정·hook·agent·skill·command·메모리 파일)을 제공하는 층. 여기서는 `.claude/` 디렉토리가 그 구현체다.
- **RLS (row-level security)**: DB 행 단위 접근 제어. 사용자가 자기 데이터만 조회하도록 강제한다.
- **zundo**: zustand 스토어에 undo/redo(시간 여행)를 붙이는 미들웨어.
- **regression**: 기존에 되던 기능이 변경으로 깨지는 것. CI 테스트로 배포 전에 차단한다.