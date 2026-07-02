---
title: "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
type: article
year: 2026
category: agents
source: hall-2026-atlassians-design-md-is-here.md
raw_path: raw/articles/hall-2026-atlassians-design-md-is-here.md
raw_filename: "hall-2026-atlassians-design-md-is-here.md"
source_collection: external
author: "Kylor Hall, Andrew Campbell"
url: "https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice"
publisher: "Atlassian Blog (How We Build)"
publication_date: "2026-06-15"
tags: [design-md, design-system, mcp, agent-skills, ui-generation, context-engineering, token-cost, atlassian-design-system, portable-context, vibe-coding]
---

# Atlassian's DESIGN.md — portable 디자인 컨텍스트 실전 검증

## 요약 (Summary)

Atlassian이 자사 Design System(ADS)을 소재로 Google의 portable 디자인 컨텍스트 포맷 **DESIGN.md**를 production에서 검증한 현장 보고다. 결론은 분명하다. 에이전트가 MCP나 Skill을 지원하는 환경이라면 그쪽이 토큰도 시간도 정확도도 앞서고, DESIGN.md는 컨텍스트를 파일째 한 번에 올리는 탓에 오히려 토큰을 2배 가까이 태운다. 그래도 blue-sky 프로토타이핑이나 고객 theming, 도구 간 이식처럼 기존 디자인 시스템 출력물을 쓸 수 없는 자리에서는 여전히 쓸모가 있다.

## DESIGN.md란 (Primer)

Google이 Stitch 디자인 도구용으로 공개한 오픈소스 markdown 포맷이다. 파일은 두 부분으로 나뉜다.

- **machine-readable token** — YAML frontmatter에 담긴 design token
- **design rationale** — 시각 스타일을 설명하는 Markdown prose (사람·에이전트 공용)

담지 않는 것도 분명하다. 코드 라이브러리, linter, 상세 Figma 스펙은 빠진다. 전체 디테일이 아니라 **intent(의도)** 를 담는 포맷이라는 점이 핵심이다.

## 세 가지 컨텍스트 전달 방식

| 방식 | 로딩 | 성격 |
|---|---|---|
| **ADS MCP server** | tool call로 on-demand | 필요한 것만 그때그때. 수백 개 아이콘·token 중 안 쓰는 건 컨텍스트에 안 올림 |
| **ADS Skill** | Skill 활성화 | 기존 시스템 사용법 instruction manual + lint rule로 코딩 표준 강제 |
| **DESIGN.md** | 파일 전체 일괄 | 이식 가능한 단일 snapshot. 전부를 한 번에 컨텍스트로 밀어넣음 |

MCP·Skill은 약 2.5 MB의 agent-readable 가이드를 on-demand로 제공하며 ~80% 컨텍스트를 확보한다. DESIGN.md는 이를 약 80 KB(frontmatter 제외 약 10,700 token)로 압축해야 한다.

## 결과 (Results)

production 코드베이스(기존 token·컴포넌트 라이브러리 존재)에서 잰 수치다.

| 방식 | 디자인 시스템 컨텍스트 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| No context | ~5% | 4.20 M | 6m 19s | 43 |
| ADS MCP | ~80% | 3.75 M | 5m 1s | 35.1 |
| ADS Skill | ~80% | 4.43 M | 5m 23s | 36 |
| **DESIGN.md** | **~30%** | **7.21 M** | **6m 46s** | **45.3** |

DESIGN.md는 컨텍스트를 ~30%밖에 못 확보하면서 토큰은 MCP의 두 배를 태우고 turn 수도 가장 많다. 다만 모델과 프롬프트, 환경에 따라 달라지니 확정적 수치로 볼 것은 아니라는 단서가 붙는다.

### production에서의 3대 한계

1. **일괄 로드** — MCP는 tool call로 필요한 것만 부른다. DESIGN.md는 전부를 동시에 올려 비용·지연이 늘고, 이른 컨텍스트 truncation으로 정확도가 떨어진다.
2. **간결성 ↔ 디테일** — 2.5 MB를 80 KB로 줄이려면 50개 넘는 컴포넌트의 상세 가이드, foundation 가이드, 사용 빈도 낮은 token을 버려야 한다. 그러면 에이전트가 부정확해지거나 컴포넌트 구현을 직접 읽어 스스로 정보를 캐낸다.
3. **내부 노출** — DESIGN.md는 "밑바닥부터 다시 만들기" 위한 완전한 구현 세부를 드러낸다. production에서는 이게 기존 라이브러리를 쓰는 대신 컴포넌트를 **재생성**하도록 유도해 유지보수·리뷰를 어렵게 한다. MCP·Skill은 기술 foundation에 grounding한 추상화 + lint rule로 이를 막는다.

## DESIGN.md가 유용한 자리

세 방식의 우열과 별개로, DESIGN.md의 단순함·이식성이 빛나는 상황이 있다. 공통점은 기존 디자인 시스템 출력물을 쓸 수 없거나 비실용적인 환경이라는 것.

- 문서화된 시각 방향이 없는 시스템의 **high-level 아트 디렉션**
- tech stack 구성 없이 on-brand UI를 뽑는 **blue-sky 프로토타이핑**
- pre-built 컴포넌트를 디자인 언어에 맞추는 **도구 간 상호운용**
- 고객이 브랜드를 서술해 AI가 리포트·차트·대시보드를 만드는 **adaptive UI theming**

## Atlassian 구현 메모

- 배포: [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md)
- 컴포넌트 렌더링 컨텍스트를 위한 **비표준 property** 추가
- 표준이 theming을 지원하지 않아 **dark mode variant**를 별도 제공
- GitHub 피드백 일부는 이미 표준에 반영. 저자들은 업계 공동의 표준 형성 참여를 촉구한다.

> "The whole ecosystem benefits when design systems are legible to AI ✨"

## 관련 페이지 (Related Pages)

- [[agents/osmani-2026-agent-skills]] — Skill을 checkpoint 있는 workflow로 보는 관점. 이 글의 "ADS Skill" 경로가 그 실전 사례
- [[agents/hada-2026-agent-skills]] — Agent Skills 커뮤니티 논의
- [[overviews/headroom-context-compression-overview]] — 컨텍스트를 일괄로 올릴지 on-demand로 줄지의 트레이드오프는 본 글의 한계 1과 같은 문제
