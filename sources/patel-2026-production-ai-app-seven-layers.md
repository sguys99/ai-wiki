---
title: "A production AI app isn't picking the right model: the seven layers nobody talks about"
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
    label: Figure 1
    kind: figure
    file: assets/patel-2026-production-ai-app-seven-layers/fig01.png
    raw: raw/articles/patel-2026-production-ai-app-seven-layers-figures/fig01.png
    caption: "실제 Next.js 앱의 파일 트리를 8개 묶음으로 주석 처리한 도해. 맨 아래 .claude/ 묶음만 색으로 강조되어 있다"
    strategy: manual
    curated: true
---

## 한 줄 요약 (One-line Summary)

프로덕션 AI 앱은 모델 선택도, 영리한 프롬프트도, fine-tuning된 모델도, agent framework도, API wrapper도 아니라는 부정 정의로 시작하는 짧은 LinkedIn 게시글이다. Patel은 실제 Next.js 앱의 파일 트리를 7개 레이어로 나눠 각 레이어의 책임을 한 줄씩 붙이고, `.claude/` 디렉토리를 일곱 번째 레이어로 세운다. 마무리 문장은 "모델은 쉬운 10%이고 이 레이어들이 아무도 말하지 않는 90%"다.

## 1. 자료 정보 (Document Information)

- **저자**: Manthan Patel. LinkedIn 계정은 `leadgenmanthan`이다.
- **형식**: LinkedIn 게시글. 본문이 2.6KB에 불과한 짧은 카드형 글이고, 도해 이미지 한 장이 붙어 있다.
- **원제**: 게시글 제목은 `A production AI app isn't picking the right model — the seven layers nobody talks about`다. 본 wiki는 제목에 em dash를 쓰지 않는 규약에 따라 `A production AI app isn't picking the right model: the seven layers nobody talks about`로 표기한다.
- **전제 스택**: Next.js 라우터, Supabase, Stripe, zustand가 본문에 등장한다. 도해에는 이 밖에 Playwright와 Vitest, Postgres가 함께 나온다.
- **본문의 표기 흔들림**: 본문은 정체성을 규정하는 문장에서 `The autonomy of a production AI app is ...`라고 쓰는데, 같은 게시글에 붙은 도해의 제목은 `Anatomy of a Production AI App`이다. 도해 제목과 글의 전개(레이어별 해부)를 함께 보면 `anatomy`가 의도된 단어로 읽힌다. 다만 raw 본문의 표기는 `autonomy`이므로 그대로 기록한다.
- **디렉토리 표기**: 본문은 일곱 번째 레이어를 `./claude/`로 적지만 도해의 트리는 `.claude/`다. 도해 표기를 따른다.
- **말미의 행동 유도**: 도해 하단에 "Comment 'APP' for the full repo"라는 문구가 있다. 전체 저장소는 이 자료에 포함되지 않는다.

## 2. 주요 기여 (Key Contributions)

- 프로덕션 AI 앱의 정의를 부정으로 다섯 번 밀어낸 뒤 다시 세운다. 모델 선택, 영리한 프롬프트, fine-tuning된 모델, agent framework, API wrapper가 모두 아니라고 열거하고, 실제 사용자가 몰려와도 유지되는 하나의 시스템으로 레이어들을 엮는 규율이 그 정체라고 적는다.
- 실제 Next.js 앱의 파일 트리를 7개 레이어로 나누고 각 레이어의 책임을 짧은 불릿으로 붙인다. 디렉토리 이름과 대표 파일명까지 구체적으로 제시한다.
- `.claude/`를 `app/`이나 `lib/`와 나란한 코드베이스 레이어로 올린다. settings.json, hooks, agents, skills, commands가 Claude에 전체 맥락을 주고, 루트의 CLAUDE.md와 AGENTS.md 덕분에 매 실행이 전체 그림에서 출발한다는 것이 근거다.
- 무게중심을 수치 비유로 못 박는다. 모델은 쉬운 10%이고 이 레이어들이 아무도 말하지 않는 90%라는 문장이다. 구조를 한 번 세워 여러 프로젝트에 재사용하라는 처방으로 글을 닫는다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

본문은 각 레이어에 이름과 디렉토리를 함께 붙인다. 아래는 본문이 적은 내용 그대로다.

1. **The Surface, `app/`**: 사용자가 만지는 모든 것을 실행하는 Next.js 라우터다. 제품 페이지, auth, billing, checkout, 30개 이상의 SEO 페이지가 여기에 있다. 이 레이어는 얇게 유지하고 진짜 로직은 더 깊은 곳으로 밀어 넣는 것이 개발자의 몫이라고 적는다.
2. **The Engine, `lib/`**: UI가 아니라 실제 작업이 일어나는 곳이다. 핵심 로직이 몇 개의 집중된 모듈에 놓인다. `export/`는 제품을 돈 낼 만한 것으로 만드는 파이프라인이고, `payments/`는 실제 구독을 위해 연결한 Stripe이며, `security/`는 사용자가 자기 데이터만 보게 하는 row-level security다.
3. **The State Layer, `stores/`**: zustand와 zundo로 만든 되돌리기 가능한 클라이언트 상태다. `editorStore.ts`는 모든 변경을 추적해 사용자가 Ctrl+Z를 눌러도 아무것도 깨지지 않게 하고, `subscriptionStore.ts`는 UI가 신뢰할 수 있는 plan limit과 billing 상태를 보관한다.
4. **The Building Blocks, `components/`와 `hooks/`**: UI primitive와 20개 이상의 custom React hook이다. 화면을 복사해 붙여 넣는 대신 editor, marketing, dashboard를 하나의 체계로 만든다.
5. **The Data Foundation, `supabase/`**: auth, Postgres, RLS를 dev 환경과 prod 환경으로 분리해 둔다. migration이 버전 관리되므로 스키마가 추측이 아니며, 실제 사용자 데이터로는 테스트하지 않는다.
6. **The Safety Net, `e2e/`와 `tests/`**: end-to-end는 Playwright, 단위 테스트는 Vitest다. CI에 연결해 두어 regression이 배포되기 전에 잡힌다.
7. **The New Layer, `.claude/`**: settings.json, hooks, agents, skills, commands가 Claude에 전체 맥락을 준다. CLAUDE.md와 AGENTS.md가 루트에 있어 매 실행이 전체 그림에서 출발한다.

### 도해에만 있는 세부

도해는 본문이 말하지 않은 하위 디렉토리와 주석 묶음을 보여 준다.

| 묶음 | 트리에 표시된 항목 | 도해의 주석 |
|---|---|---|
| `app/` | `dashboard/`, `(auth)/`, `api/`, `checkout/`, `blog/`, `layout.tsx` | Next router: product, auth, billing, 30+ SEO pages |
| `lib/` | `export/`, `payments/`, `auth/`, `security/`, `db/` | The engine: export pipeline, Stripe, auth, RLS |
| `stores/` | `editorStore.ts`, `subscriptionStore.ts` | Undo-able client state (zustand + zundo) |
| `components/`, `hooks/` | `ui/`, `editor/`, `marketing/` | UI primitives + 20+ custom React hooks |
| `supabase/` | `migrations/` | Auth, Postgres, RLS, dev + prod envs |
| `e2e/`, `__tests__/` | 하위 항목 표시 없음 | Playwright + Vitest, CI-ready |
| `scripts/`, `docs/` | 하위 항목 표시 없음 | db-setup, migrate, 30+ production docs |
| `.claude/` | `settings.json`, `settings.local.json`, `hooks/`, `agents/`, `skills/`, `commands/` | AI agent context: rules, hooks, skills, subagents |

주석 묶음은 8개인데 본문이 이름을 붙인 레이어는 7개다. `scripts/`와 `docs/` 묶음은 도해에만 있고 본문에서는 레이어로 승격되지 않았다. `lib/auth/`, `lib/db/`, `settings.local.json`도 도해에만 있다. 도해의 루트 파일 목록에는 CLAUDE.md와 AGENTS.md 외에 `docker-compose.yml`, `next.config.ts`, `package.json`이 함께 놓여 있다.

도해에서 `.claude/` 묶음만 배경색과 세로 막대로 강조되고, 옆에 "the new layer: your AI teammate"라는 주석이 붙는다. 나머지 일곱 묶음의 주석은 모두 같은 서식이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크가 없다. 실험도 비교 대상도 없고, 저자의 경험과 의견에 기댄 글이다.

제시된 유일한 수치 표현은 비유다. 모델은 쉬운 10%이고 이 레이어들이 아무도 말하지 않는 90%라는 문장이며, 측정 방법이나 근거는 붙어 있지 않다. 나머지 수치는 코드베이스 규모를 나타내는 어림수로, SEO 페이지 30개 이상, custom React hook 20개 이상, 도해에만 있는 production 문서 30개 이상이 전부다.

결론은 처방 한 줄이다. 구조를 한 번 만들어 여러 프로젝트에 재사용하라는 것이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 자료가 매우 짧다. raw 본문이 2.6KB이고 각 레이어의 설명이 불릿 두세 개다. 레이어를 그렇게 나눈 근거, 대안 구성과의 트레이드오프, 실패 사례가 전혀 없다.
- 특정 스택에 강하게 묶여 있다. Next.js, Supabase, Stripe, zustand, Playwright, Vitest를 전제한 파일 트리 하나가 논거의 전부여서, 다른 스택이나 다른 규모의 팀으로 일반화하는 작업은 독자의 몫이다.
- 코드 예시가 없다. 디렉토리 이름과 파일명만 제시되고 내부 구현은 확인할 수 없다. 도해 하단이 안내하는 전체 저장소도 이 자료에 포함되지 않는다.
- 7개 레이어라는 숫자가 도해와 어긋난다. 도해의 주석 묶음은 8개이며, 본문은 그중 `scripts/`와 `docs/`를 레이어로 세지 않은 이유를 밝히지 않는다.
- `.claude/`를 새 레이어로 세운다는 주장의 검증이 없다. 그 레이어가 있고 없고에 따라 무엇이 달라지는지에 대한 관찰이나 측정이 제시되지 않는다.
- 게시 연도가 본문에 명시되어 있지 않아 2026으로 표기했다. 확정된 값이 아니다.

## 6. 관련 연구 (Related Work)

- harness engineering 계보의 자료들과 문제 의식이 겹친다. `.claude/`를 앱의 정식 레이어로 세운 이 글의 일곱 번째 항목이 그 논의의 관심사와 같은 자리에 있다. 다만 이 글은 harness라는 용어를 쓰지 않는다.
- 프롬프트에서 컨텍스트, harness, 루프로 최적화 단위가 옮겨 왔다는 계보 정리와 흐름이 같다. 모델이 쉬운 10%라는 이 글의 비유가 그 이동을 한 문장으로 압축한 형태다.
- 같은 저자의 다른 LinkedIn 게시글이 이 저장소에 한 편 더 있다. 짧은 카드형 게시글로 목록이나 구조를 나열하는 형식이 같다.
- 이 저장소에 있는 다른 Patel 자료는 동명이인의 글이므로 저자 계보로 묶지 않는다.

## 7. 용어집 (Glossary)

- **RLS (row-level security)**: 데이터베이스 행 단위 접근 제어다. 이 글에서는 사용자가 자기 데이터만 보게 만드는 장치로 쓰인다.
- **zundo**: zustand와 함께 써서 클라이언트 상태를 되돌릴 수 있게 만드는 라이브러리다. 본문은 두 이름을 짝지어 제시할 뿐 내부 동작은 설명하지 않는다.
- **regression**: 되던 기능이 변경 때문에 깨지는 것이다. 이 글은 CI에 연결한 테스트가 배포 전에 이를 잡는다고 적는다.
- **migration**: 데이터베이스 스키마 변경을 파일로 남겨 버전 관리하는 방식이다. 본문은 이 덕분에 스키마가 추측이 아니게 된다고 적는다.
- **UI primitive**: 화면을 조립하는 최소 단위 컴포넌트다. 본문은 이것과 custom hook을 묶어 하나의 레이어로 본다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 실제 Next.js 앱의 파일 트리를 8개 묶음으로 주석 처리한 도해 | manual | ★ wiki 권장 (architecture) |

이 자료의 도식은 한 장뿐이고, 본문이 열거한 레이어 구조를 그대로 담고 있어 본문 이해에 직접 쓰인다. 사용자가 수동으로 저장한 PNG여서 `figures.json` 매니페스트는 없다.
