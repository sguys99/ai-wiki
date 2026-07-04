---
title: "DESIGN.md — 포맷 정의부터 production 트레이드오프까지"
type: overview
year: 2026
category: overviews
source_collection: external
tags: [design-md, design-system, design-tokens, portable-context, context-engineering, mcp, agent-skills, coding-agent]
---

# DESIGN.md 개괄 — 정본 스펙 ↔ 실전 검증

두 자료를 한 장으로 묶는다. 하나는 Google Labs가 만든 **정본 저장소**([[agents/google-labs-code-design-md]])이고, 다른 하나는 그 포맷을 자사 디자인 시스템으로 production에서 실측한 **Atlassian의 검증 보고**([[agents/hall-2026-atlassians-design-md-is-here]])다. 포맷이 약속하는 바와 그 약속이 현장에서 깨지는 지점을 나란히 두면 DESIGN.md를 언제 써야 하는지가 또렷해진다.

## 한 줄 정리 (TL;DR)

DESIGN.md는 디자인 시스템을 코딩 에이전트에 넘기는 단일 `.md` 포맷이다. 설계 의도는 "토큰이 아니라 산문(prose)이 스펙의 초점"이라는 것이고, 강점은 이식성과 단순함이다. 다만 파일을 통째로 컨텍스트에 올리는 구조여서 **기존 디자인 시스템이 이미 있는** production에서는 MCP·Skill보다 토큰을 2배 태우고 정확도도 밀린다. 쓰임새가 갈리는 이유가 여기 있다. 기존 출력물을 못 쓰는 blue-sky·theming·이식에는 맞지만, 성숙한 시스템의 일상 개발에는 MCP·Skill이 낫다.

## 1. 포맷은 무엇을 약속하는가 (정본 스펙)

[[agents/google-labs-code-design-md]]가 정의하는 골격이다.

- **두 레이어**: YAML front matter(기계용 design token) + Markdown 본문(사람용 설계 근거). 토큰은 정규값(normative)이지만 렌더링 지시가 아니라 맥락이며, 우선순위는 산문에 있다.
- **철학의 핵심**: 생성물의 품질은 값의 정밀도가 아니라 의도를 얼마나 구체적으로 서술했느냐에 달렸다. "1970년대 명문대 강의 유인물"이라는 한 문장이 수치 열두 개보다 많은 정보를 담는데, 형용사는 영역을 잡고 구체적 레퍼런스는 점을 찍기 때문이다. 게다가 구체적 레퍼런스는 negative constraint("무엇이 아닌지")를 공짜로 딸려 온다.
- **도구**: `lint`(린터 9규칙, WCAG 대비·broken-ref 등) · `diff`(회귀 비교) · `export`(Tailwind v3/v4·W3C DTCG) · `spec`(스펙을 프롬프트에 주입).
- **개방형 스키마**: colors·typography·spacing·rounded·components만 표준화하고 motion·iconography 등은 커스텀 키로 확장 — 린터가 조용히 통과시킨다.

## 2. 그 약속이 현장에서 어떻게 되는가 (Atlassian 실측)

[[agents/hall-2026-atlassians-design-md-is-here]]가 자사 Design System(ADS) production 코드베이스에서 잰 수치다.

| 방식 | 디자인 컨텍스트 확보 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| No context | ~5% | 4.20 M | 6m 19s | 43 |
| ADS MCP | ~80% | 3.75 M | 5m 1s | 35.1 |
| ADS Skill | ~80% | 4.43 M | 5m 23s | 36 |
| **DESIGN.md** | **~30%** | **7.21 M** | **6m 46s** | **45.3** |

DESIGN.md는 컨텍스트를 ~30%밖에 확보하지 못하면서 토큰은 MCP의 두 배, turn 수도 가장 많았다. 원인은 세 가지다. 첫째, 필요한 것만 부르는 MCP와 달리 파일을 **일괄 로드**하니 비용·지연·이른 truncation이 따라온다. 둘째, 2.5 MB 가이드를 80 KB로 압축하려면 50개 넘는 컴포넌트 상세를 버려야 하므로 **간결성과 디테일이 충돌**한다. 셋째, 완전한 구현 세부를 드러내는 탓에 에이전트가 기존 라이브러리를 두고 컴포넌트를 **재생성**하도록 유도한다.

## 3. 두 자료를 겹쳐 읽으면 (Synthesis)

- **"산문이 초점"이라는 강점이 곧 비용의 원인**: 의도를 풍부히 서술하는 포맷이라 이식성과 표현력을 얻지만, 그 서술을 통째로 올리는 구조가 토큰 폭증과 truncation을 낳는다. 정본이 자랑하는 성질과 Atlassian이 지적한 한계 1은 같은 동전의 양면이다.
- **grounding의 유무가 갈림길**: 정본은 "밑바닥부터 다시 만들기"를 전제로 완전한 세부를 담는다. 기존 시스템이 없으면 장점이지만, 이미 있으면 재생성을 부추기는 함정이 된다. MCP·Skill은 기존 foundation에 grounding과 lint rule을 걸어 이를 막는데, 정본에는 없는 안전장치다.
- **표준은 아직 유동적**: 정본은 `alpha` 상태이고 스펙조차 repo 밖 링크(Stitch·docs)에 기댄다. Atlassian은 dark mode variant와 비표준 property를 직접 덧대야 했고, 그 피드백 일부는 이미 표준에 반영됐다. "스펙이 아니라 사용자를 통해 성장한다"는 정본의 주장이 실제로 굴러가고 있는 셈이다.

## 4. 언제 쓰나 (결정 가이드)

| 상황 | 권장 | 근거 |
|---|---|---|
| 성숙한 디자인 시스템의 일상 UI 개발 | **MCP / Skill** | 토큰↓·정확도↑, 재생성 방지 grounding |
| 문서화된 시각 방향이 없는 시스템의 아트 디렉션 | **DESIGN.md** | high-level intent만 필요 |
| tech stack 없이 on-brand UI 프로토타입 | **DESIGN.md** | blue-sky, 이식성이 강점 |
| 도구 간 컴포넌트 이식 | **DESIGN.md** | 단일 snapshot의 portability |
| 고객이 브랜드를 서술해 AI가 리포트·대시보드 theming | **DESIGN.md** | adaptive theming |

공통 원리는 하나다. **기존 디자인 시스템 출력물을 쓸 수 있으면 그걸 on-demand로 부르고(MCP·Skill), 쓸 수 없으면 의도를 통째로 서술하는(DESIGN.md) 쪽이 맞다.**

## 관련 페이지 (Related Pages)

- [[agents/google-labs-code-design-md]] — 정본 저장소(Google Labs). 포맷 스펙·CLI·철학.
- [[agents/hall-2026-atlassians-design-md-is-here]] — Atlassian production 검증. 토큰·시간·turn 실측.
- [[agents/anthropic-2025-effective-context-engineering-for-ai]] — "고신호 토큰의 최소 집합" 원칙. 일괄 로드 vs on-demand 트레이드오프의 상위 프레임.
- [[overviews/headroom-context-compression-overview]] — 컨텍스트를 일괄로 올릴지 줄일지의 같은 문제를 압축 도구 관점에서 다룸.
- [[agents/hada-2026-agent-skills]] · [[agents/osmani-2026-agent-skills]] — portable 컨텍스트 전달 수단으로서 Skill.
