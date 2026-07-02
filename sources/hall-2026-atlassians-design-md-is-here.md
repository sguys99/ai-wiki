---
title: "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
type: article
year: 2026
category: agents
raw_path: raw/articles/hall-2026-atlassians-design-md-is-here.md
raw_filename: "hall-2026-atlassians-design-md-is-here.md"
source_collection: external
author: "Kylor Hall, Andrew Campbell"
url: "https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice"
publisher: "Atlassian Blog (How We Build)"
publication_date: "2026-06-15"
tags: [design-md, design-system, mcp, agent-skills, ui-generation, context-engineering, token-cost, atlassian-design-system, portable-context, vibe-coding]
---

## 한 줄 요약 (One-line Summary)

Atlassian이 자사 Design System(ADS)을 소재로 Google의 portable 디자인 컨텍스트 포맷 **DESIGN.md**를 실제 production 환경에서 검증한 현장 보고다. 결론은 명확하다. 에이전트가 MCP나 Skill을 지원한다면 그쪽이 토큰도 시간도 정확도도 낫고, DESIGN.md는 컨텍스트를 파일째 한 번에 밀어넣는 탓에 오히려 토큰을 2배 가까이 태운다. 그래도 blue-sky 프로토타이핑이나 고객 theming, 도구 간 이식처럼 기존 디자인 시스템 출력물을 쓸 수 없는 자리에서는 여전히 값어치를 한다.

## 1. 자료 정보 (Document Information)

- **저자**: Kylor Hall (Principal Prompt Engineer), Andrew Campbell (Senior Design Technologist)
- **게시일**: 2026-06-15
- **매체**: Atlassian Blog — "How We Build" 시리즈
- **URL**: https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice
- **DESIGN.md 배포**: [atlassian.design/DESIGN.md](https://atlassian.design/DESIGN.md)
- **핵심 명제**: DESIGN.md는 richer tooling(MCP·Skill)의 대체재가 아니라 디자인 시스템의 **snapshot·이식 포맷**이다.

## 2. 주요 기여 (Key Contributions)

1. **DESIGN.md 실측 벤치마크 공개** — No context / ADS MCP / ADS Skill / DESIGN.md 네 방식을 토큰·시간·turn 수로 비교한 표를 제시한다. DESIGN.md가 production에서 왜 뒤처지는지 수치로 보여 준다.
2. **DESIGN.md 포맷의 정의와 한계 정리** — YAML frontmatter의 machine-readable token + Markdown prose의 design rationale, 두 부분으로 이루어진 이식용 파일. 코드 라이브러리·linter·Figma 상세 스펙은 담지 않는 "intent 포맷"이라는 점을 못박는다.
3. **production에서의 3대 한계 명명** — (1) 컨텍스트 일괄 로드, (2) 간결성을 위한 디테일 희생, (3) 내부 구현 노출로 인한 컴포넌트 재생성 유발.
4. **DESIGN.md가 실제로 유용한 4개 시나리오 도출** — high-level 아트 디렉션, 낯선 환경에서의 빠른 프로토타이핑, 디자인 도구 간 상호운용, 고객 theming.
5. **Atlassian 구현의 표준 확장 사례 공유** — 렌더링 컨텍스트를 위한 비표준 property, dark mode 별도 variant 등 표준의 공백을 메운 방식과 GitHub 피드백 반영 과정을 공개한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 — AI UI "slop"

컨텍스트 없이 AI가 UI를 생성하면 기능은 되지만 시각적 정체성과 의도가 빠진 결과, 디자인 커뮤니티가 "slop"이라 부르는 출력이 나온다. 브랜드의 컴포넌트·패턴을 모르는 AI는 결국 generic한 평균값으로 회귀한다.

### 3.2 세 가지 컨텍스트 전달 방식

Atlassian은 에이전트에 디자인 컨텍스트를 주는 세 경로를 비교한다.

| 방식 | 로딩 방식 | 성격 |
|---|---|---|
| **ADS MCP server** | tool call로 on-demand 로드 | 필요한 것만 그때그때. 수백 개 아이콘·token 중 불필요한 것을 컨텍스트에 안 올림 |
| **ADS Skill** | Skill 활성화 | 기존 시스템 사용법을 담은 instruction manual + lint rule로 코딩 표준 강제 |
| **DESIGN.md** | 파일 전체 일괄 로드 | 이식 가능한 단일 markdown snapshot. 모든 걸 한 번에 컨텍스트에 밀어넣음 |

MCP·Skill 모두 ~80% 디자인 시스템 컨텍스트를 확보하며 약 2.5 MB의 agent-readable 가이드를 on-demand로 제공한다. DESIGN.md는 이를 약 80 KB(frontmatter 제외 약 10,700 token)로 압축해야 한다.

### 3.3 DESIGN.md 생성 파이프라인

Atlassian은 MCP server와 Skill을 떠받치는 기존 structured content 파이프라인에서 자사 DESIGN.md를 생성했다. 일반적인 "vibe coding" 도구에서 테스트하며 흔한 실수에 대한 stricter guidance를 덧붙였다. Team '26 keynote에서는 Figma Make가 Teamwork Graph로 커스텀 대시보드를 생성했고, DESIGN.md가 generic 출력을 색·간격·형태·타이포그래피·elevation까지 Atlassian다운 인터페이스로 바꿔 놓는 것을 확인했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

production 코드베이스(기존 token·컴포넌트 라이브러리 존재)에서 측정한 결과:

| 방식 | 디자인 시스템 컨텍스트 | 평균 토큰 | 평균 시간 | 평균 turn |
|---|---|---|---|---|
| No context | ~5% | 4.20 M | 6m 19s | 43 |
| ADS MCP | ~80% | 3.75 M | 5m 1s | 35.1 |
| ADS Skill | ~80% | 4.43 M | 5m 23s | 36 |
| **DESIGN.md** | **~30%** | **7.21 M** | **6m 46s** | **45.3** |

핵심은 DESIGN.md가 컨텍스트는 ~30%밖에 못 확보하면서 토큰은 7.21 M, MCP(3.75 M)의 두 배를 태우고 turn 수도 가장 많다는 점이다. 다만 저자들은 모델과 프롬프트, 환경에 따라 달라지니 확정적 수치로 볼 것은 아니라고 단서를 단다.

**3대 한계**

- **한계 1 — 일괄 로드**: MCP는 tool call로 필요한 것만 부른다. DESIGN.md는 전부를 동시에 올려 비용·지연이 늘고, 이른 컨텍스트 truncation으로 정확도가 떨어진다.
- **한계 2 — 간결성 ↔ 디테일**: 2.5 MB를 80 KB로 압축하려면 50개 넘는 컴포넌트의 상세 사용 가이드, foundation 가이드, 사용 빈도 낮은 token들을 버려야 한다. 컨텍스트가 없는 에이전트는 부정확해지거나, 컴포넌트 구현을 직접 읽어 스스로 정보를 모은다.
- **한계 3 — 내부 노출**: DESIGN.md는 "밑바닥부터 다시 만들기" 위한 완전한 구현 세부를 드러낸다. production에서는 이것이 에이전트로 하여금 기존 라이브러리를 쓰는 대신 컴포넌트를 **재생성**하게 유도해, 유지보수성과 리뷰 난이도를 악화시킨다. MCP·Skill은 기술적 foundation에 grounding한 추상화 + lint rule로 이를 막는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 벤치마크는 모델·프롬프트·환경 의존적이라 일반화에 주의가 필요하다.
- 현행 DESIGN.md 표준은 **theming을 지원하지 않아** Atlassian은 dark mode용 별도 variant를 따로 둬야 했다.
- 표준은 컴포넌트 렌더링 컨텍스트 같은 실전 정보를 담지 못해 Atlassian이 비표준 property를 추가했다. 일부 제안은 이미 표준 GitHub에 반영되었고, 저자들은 업계 공동의 표준 형성 참여를 촉구한다.
- frontmatter가 코드베이스에 이미 있는 정보를 중복 기술한다는 점도 지적된다.

**DESIGN.md가 가장 유용한 4개 시나리오** (공통점: 기존 디자인 시스템 출력물을 쓸 수 없거나 비실용적인 환경):
1. 문서화된 시각 방향이 없는 시스템의 high-level 아트 디렉션 제공
2. 전체 tech stack 구성 없이 on-brand UI를 만드는 blue-sky 프로토타이핑
3. pre-built 컴포넌트를 디자인 언어에 맞춰 커스터마이즈하는 도구와의 상호운용
4. 고객이 자기 브랜드를 서술해 AI가 리포트·차트·대시보드를 생성하는 adaptive UI theming

## 6. 관련 연구 (Related Work)

- **Agent Skills** — [[osmani-2026-agent-skills]], [[hada-2026-agent-skills]]: Skill을 checkpoint 있는 workflow로 보는 관점. 이 글의 "ADS Skill" 경로가 그 실제 적용 사례.
- **Context engineering / compression** — [[headroomlabs-ai-headroom]] 계열: 컨텍스트를 한 번에 다 올릴지, on-demand로 줄지의 트레이드오프는 본 글의 한계 1과 직결된다.
- **MCP 기반 도구 노출** — 여러 repo 자료(codegraph·graphify 등)가 다루는 on-demand tool call 패턴이 ADS MCP server와 같은 계보.

## 7. 용어집 (Glossary)

- **DESIGN.md**: Google이 Stitch 디자인 도구용으로 만든 오픈소스 markdown 포맷. machine-readable token(YAML frontmatter) + 사람/에이전트용 design rationale(Markdown)로 구성된 이식용 디자인 컨텍스트 파일.
- **slop**: 컨텍스트 부족으로 AI가 뱉는, 기능은 하지만 시각적 정체성·의도가 없는 UI 출력.
- **ADS**: Atlassian Design System.
- **MCP (Model Context Protocol)**: 에이전트가 tool call로 외부 컨텍스트를 on-demand 로드하게 하는 프로토콜.
- **Skill**: 기존 시스템 사용법 + 코딩 표준(lint rule)을 담아 에이전트에 주입하는 실행형 가이드.
- **vibe coding**: 자연어 프롬프트로 UI/코드를 즉흥 생성하는 작업 방식.
- **Teamwork Graph**: Atlassian의 조직 데이터 그래프. Team '26 데모에서 Figma Make가 이를 소재로 대시보드를 생성.
