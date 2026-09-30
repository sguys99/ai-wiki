---
title: "Agent-Ready Design Systems Index: who actually ships MCP, llms.txt, DTCG, registry, and Code Connect"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who.md
raw_filename: "designsystems-one-2026-agent-ready-design-systems-index-who.md"
source_collection: external
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/ai-ready/systems"
publisher: "DesignSystems.one"
tags: [design-system, agent-ready, ai-ready-index, benchmark, mcp, llms-txt, dtcg, component-registry, figma-code-connect, shadcn-ui, carbon, primer, designsystems-one]
figures:
  - id: fig01
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/page-full.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/page-full.png
    caption: "Agent-Ready Index 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig02.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig02.png
    caption: "신호별 채택 수 막대와 점수 분포 막대. 0점 19개, 1점 8개, 2점 7개, 3점 2개, 4점 1개, 5점 0개"
    strategy: crop
    curated: true
  - id: fig03
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig03.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig03.png
    caption: "37개 시스템 점수표 1부. Carbon부터 Spectrum까지 10개 시스템의 신호별 판정"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig04.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig04.png
    caption: "37개 시스템 점수표 2부. Canvas부터 Apple HIG까지 10개 시스템"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig05.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig05.png
    caption: "37개 시스템 점수표 3부. Audi UI부터 Linear까지 9개 시스템"
    strategy: crop
    curated: false
  - id: fig06
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig06.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig06.png
    caption: "37개 시스템 점수표 4부. Mailchimp부터 U.S. Web Design System까지 8개 시스템"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

DesignSystems.one의 Agent-Ready Design Systems Index는 갤러리의 design system 37개를 코딩 에이전트 대응에 필요한 다섯 가지 신호(MCP server, llms.txt, DTCG design token, component registry, Figma Code Connect)로 채점한 독립 감사다(2026-09-04 감사, 분기마다 재감사). 신호마다 유지 관리자가 공식 URL에 산출물을 직접 공개했을 때만 1점을 주며, 커뮤니티 래퍼나 제3자 MCP shim은 인정하지 않는다. 결과는 최고점이 Carbon의 4/5이고 37개 중 19개가 0점이다. 저자는 오픈소스 React 컴포넌트 라이브러리가 가장 앞서 있고 브랜드와 엔터프라이즈 design system은 llms.txt를 제외한 모든 신호에서 12~24개월 뒤처져 있다고 정리한다.

## 1. 자료 정보 (Document Information)

- 형식: DesignSystems.one 사이트의 지표 페이지(<https://www.designsystems.one/ai-ready/systems>). 랜딩 페이지와 AI-ready 허브가 인용하는 Agent-Ready Index의 원자료다.
- 제작자: Kiryl Zhukouski (사이트 푸터 기준).
- 감사일: 2026-09-04. 다음 재감사 예정일은 2026-12-04이며 분기마다 재감사한다고 적는다.
- 데이터: JSON(`/api/ai-ready/systems`)과 CSV(`/api/ai-ready/systems.csv`)로 내려받을 수 있고, 감사일마다 고정된다. 데이터셋은 CC BY 4.0이며 DesignSystems.one을 출처로 밝히고 지표 URL을 링크하면 재사용할 수 있다. 권장 인용 형식은 "DesignSystems.one. (2026). Agent-Ready Design Systems Index. https://www.designsystems.one/ai-ready/systems, audited 2026-09-04"이다.
- 수집: 2026-09-30, chrome tier에 `--full-body`를 적용해 17,367자를 받았다. 쿠키 배너와 skip link만 잡음으로 제거했다. 점수표의 신호별 판정은 텍스트 추출에서 체크 아이콘이 사라져 전체 페이지 스크린샷(fig03~fig06)에서 읽어 옮겼다. 신호별 합계가 페이지 상단 수치(12, 10, 6, 1, 3)와 일치함을 확인했다.
- 절 구성: 상단 요약, Leaderboard Top 5, How this site scores, The shape of the data, How we score, The index 37 systems, Meta-observations, Cite this benchmark, Your system isn't on this list.

## 2. 주요 기여 (Key Contributions)

1. **다섯 가지 구체 신호로 정의한 agent-ready.** 막연한 "AI 지원" 대신 에이전트가 실제로 쓸 수 있는 공개 산출물 다섯 가지를 기준으로 삼는다.
2. **1차 증거 원칙.** 유지 관리자가 공식 도메인에 직접 공개한 산출물만 센다. 커뮤니티 래퍼, 제3자 MCP shim, 일반적인 "Figma 지원" 주장은 제외한다.
3. **unknown의 분리.** 감사 기간 안에 공식 URL에서 확인하지 못한 칸은 "아니오"가 아니라 unknown으로 둔다. 확인된 점수와 출처 확인 범위(source coverage)를 따로 표시한다.
4. **공개 데이터셋.** JSON과 CSV를 CC BY 4.0으로 공개하고 시스템별 근거 페이지(`/ai-ready/evidence`)와 변경 이력(`/ai-ready/changes`)을 연결한다.
5. **업계 패턴 관찰.** llms.txt는 넓지만 얕게 퍼졌고, 1차 MCP server는 상용 컴포넌트 라이브러리에 몰려 있으며, component registry는 shadcn/ui 하나뿐이라는 관찰을 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 채점 규칙 (How we score)

각 시스템은 0~5점을 받는다. 신호 하나마다 유지 관리자가 1차 URL에 산출물을 공개했으면 1점이다.

| 신호 | 인정 기준 |
|---|---|
| MCP server | 에이전트가 등록할 수 있는 stdio 또는 HTTP 방식의 Model Context Protocol server |
| llms.txt | 공식 문서 도메인의 `/llms.txt`가 내용을 반환한다 |
| DTCG tokens | W3C Design Tokens Community Group 형식(`$value`, `$type`)의 design token |
| Component registry | `npx shadcn add <url>`로 설치할 수 있는 공개 shadcn 규격 registry |
| Figma Code Connect | Code Connect 매핑(`.figma.tsx`)을 공개 배포 |

unknown의 의미: unknown은 추측이 아니라 감사 기간 안에 공식 URL에서 1차 산출물을 확인하지 못했을 때의 정직한 답이며 "아니오"로 세지 않는다. 특히 Code Connect는 공개가 적어 가장 과소 집계된 신호일 수 있다고 적는다. 잘못된 판정이 있으면 갤러리의 시스템별 breakdown이 출처를 링크하므로 이슈를 열면 재감사한다.

AI-ready 허브의 요약에 따르면 이번 재감사는 각 시스템의 저장소 트리를 읽는 방식으로 진행했고, 따라서 부재도 증거로 센다. 185칸(37개 × 5개 신호) 중 48칸이 unknown이다.

### 3.2 상단 요약 수치

| 신호 | 공개 시스템 수 |
|---|---|
| MCP server | 12/37 |
| llms.txt | 10/37 |
| DTCG tokens | 6/37 |
| Component registry | 1/37 |
| Figma Code Connect | 3/37 |

신호별 막대 도식(fig02)의 설명은 "llms.txt is the cheap race; the registry lane is still nearly empty"다.

### 3.3 점수 분포

| 점수 | 시스템 수 |
|---|---|
| 0/5 | 19 |
| 1/5 | 8 |
| 2/5 | 7 |
| 3/5 | 2 |
| 4/5 | 1 |
| 5/5 | 0 |

분포 도식의 설명은 "Nobody scores 4 or 5, fully agent-ready doesn't exist yet. That's the headline."이다(원문은 em dash로 연결). 다만 같은 도식에서 4/5가 1개(Carbon)로 표시되고 리더보드 1위도 4/5이므로, "Nobody scores 4"는 페이지 자체 수치와 어긋난다. 5/5가 0개라는 부분만 수치와 일치한다.

### 3.4 사이트 자체 점수 (How this site scores)

독립 지표가 제작자를 채점해서는 안 된다는 이유로 DesignSystems.one은 순위표에 넣지 않았다. 2026-09-02에 같은 다섯 규칙으로 따로 채점한 결과는 4/5다.

| 신호 | 판정 | 근거 |
|---|---|---|
| MCP server | 있음 | Streamable HTTP(JSON-RPC 2.0) 방식의 1차 MCP server, 인증 없음. `/api/mcp`와 `/mcp` |
| llms.txt | 있음 | 공식 도메인의 `/llms.txt`와 `llms-full.txt` |
| DTCG tokens | 있음 | Token Generator가 W3C DTCG 형식(`$value`, `$type`, `$description`)을 출력한다. `/api/tokens?format=w3c` |
| Component registry | 있음 | `/r`의 shadcn 규격 registry 인덱스, `npx shadcn add`로 설치 |
| Figma Code Connect | 없음 | registry 컴포넌트에 대한 Code Connect 매핑을 공개하지 않았다 |

### 3.5 37개 시스템 점수표

정렬은 점수순, 동점은 알파벳순이다. 기호: ✓ 확인된 공개, ✗ 없음, ? unknown, n/a 해당 없음. "unknown 수"와 "sourced 수"는 시스템별 근거 링크에 표시된 값이다.

| 순위 | 시스템 | 조직 | 점수 | MCP | llms.txt | DTCG | Registry | Code Connect | unknown | sourced |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Carbon | IBM | 4/5 | ✓ | ✓ | ✓ | ✗ | ✓ | 0 | 3/5 |
| 2 | Primer | GitHub | 3/5 | ✓ | ? | ✓ | ✗ | ✓ | 1 | 2/5 |
| 3 | shadcn/ui | shadcn | 3/5 | ✓ | ✓ | ✗ | ✓ | ✗ | 0 | 3/5 |
| 4 | Ant Design | Ant Group | 2/5 | ✓ | ✓ | ✗ | ✗ | ✗ | 0 | 2/5 |
| 5 | Atlassian Design System | Atlassian | 2/5 | ✓ | ✓ | ? | ✗ | ? | 2 | 2/5 |
| 6 | Backpack | Skyscanner | 2/5 | ✗ | ? | ✓ | ✗ | ✓ | 1 | 2/5 |
| 7 | Chakra UI | Chakra Systems | 2/5 | ✓ | ✓ | ? | ✗ | ✗ | 1 | 2/5 |
| 8 | Mantine | Mantine | 2/5 | ✓ | ✓ | ✗ | ✗ | ✗ | 0 | 2/5 |
| 9 | MUI (Material UI) | MUI | 2/5 | ✓ | ✓ | ? | ✗ | ✗ | 1 | 2/5 |
| 10 | Spectrum | Adobe | 2/5 | ✓ | ✓ | ✗ | ✗ | ✗ | 0 | 2/5 |
| 11 | Canvas | Workday | 1/5 | ✓ | ? | ✗ | ✗ | ✗ | 1 | 1/5 |
| 12 | Cloudscape | Amazon Web Services | 1/5 | ? | ✓ | ✗ | ✗ | ✗ | 1 | 1/5 |
| 13 | Helios | HashiCorp | 1/5 | ✗ | ? | ✓ | ✗ | ✗ | 1 | 1/5 |
| 14 | Lightning Design System | Salesforce | 1/5 | ✓ | ? | ✗ | ✗ | ✗ | 1 | 1/5 |
| 15 | NHS Design System | National Health Service | 1/5 | ✗ | ✗ | ✓ | ✗ | ✗ | 0 | 0/5 |
| 16 | Pajamas | GitLab | 1/5 | ? | ? | ✓ | ✗ | ? | 3 | 0/5 |
| 17 | Polaris | Shopify | 1/5 | ✓ | ? | ✗ | ✗ | ✗ | 1 | 1/5 |
| 18 | Stripe Design System | Stripe | 1/5 | ✗ | ✓ | ? | ✗ | ? | 2 | 1/5 |
| 19 | Airbnb DLS | Airbnb | 0/5 | ✗ | ? | ? | ✗ | ? | 3 | 0/5 |
| 20 | Apple Human Interface Guidelines | Apple | 0/5 | ✗ | ✗ | n/a | ✗ | ✗ | 0 | 0/5 |
| 21 | Audi UI | Audi | 0/5 | ✗ | ? | ? | ✗ | ? | 3 | 0/5 |
| 22 | BBC GEL | BBC | 0/5 | ✗ | ✗ | ? | ✗ | ? | 2 | 0/5 |
| 23 | Dropbox Design | Dropbox | 0/5 | ✗ | ✗ | ? | ✗ | ? | 2 | 0/5 |
| 24 | eBay Evo | eBay | 0/5 | ✗ | ? | ? | ✗ | ? | 3 | 0/5 |
| 25 | Fluent UI | Microsoft | 0/5 | ? | ? | ? | ✗ | ✗ | 3 | 0/5 |
| 26 | Geist | Vercel | 0/5 | ? | ? | ? | ✗ | ? | 4 | 0/5 |
| 27 | Gestalt | Pinterest | 0/5 | ✗ | ? | ✗ | ✗ | ✗ | 1 | 0/5 |
| 28 | GOV.UK Design System | UK Government | 0/5 | ✗ | ✗ | ✗ | ✗ | ✗ | 0 | 0/5 |
| 29 | Linear | Linear | 0/5 | ✗ | ? | n/a | ✗ | n/a | 1 | 0/5 |
| 30 | Mailchimp Design System | Mailchimp | 0/5 | ✗ | ✗ | ? | ✗ | ? | 2 | 0/5 |
| 31 | Market | Square (Block) | 0/5 | ✗ | ? | ? | ✗ | ? | 3 | 0/5 |
| 32 | Material 3 | Google | 0/5 | ✗ | ✗ | ✗ | ✗ | ✗ | 0 | 0/5 |
| 33 | Paste | Twilio | 0/5 | ✗ | ? | ✗ | ✗ | ✗ | 1 | 0/5 |
| 34 | PatternFly | Red Hat | 0/5 | ? | ? | ✗ | ✗ | ✗ | 2 | 0/5 |
| 35 | Radix UI | WorkOS | 0/5 | ✗ | ✗ | n/a | ✗ | ✗ | 0 | 0/5 |
| 36 | Tailwind UI / Tailwind Plus | Tailwind Labs | 0/5 | ✗ | ? | ✗ | ✗ | ? | 2 | 0/5 |
| 37 | U.S. Web Design System | U.S. Government | 0/5 | ✗ | ✗ | ✗ | ✗ | ✗ | 0 | 0/5 |

점수표에서 읽히는 세부:

- unknown 칸을 모두 세면 48칸이며 AI-ready 허브가 적은 "185칸 중 48칸"과 일치한다.
- NHS Design System과 Pajamas는 점수 1/5인데 sourced가 0/5다. 확인된 공개는 있으나 출처 링크가 붙은 칸은 없다는 뜻으로 읽힌다. 반대로 Carbon은 4점 중 3칸만 출처 링크가 있다.
- n/a는 DTCG 칸(Apple HIG, Linear, Radix UI)과 Linear의 Code Connect 칸에만 있다.
- AI-ready 허브는 Polaris와 Spectrum이 DTCG와 Code Connect 두 신호에서 자주 거론되지만 규격 이전 형식이거나 전체 트리에 없었다고 적는다. 점수표에서도 두 시스템은 DTCG와 Code Connect가 모두 ✗다.

### 3.6 Meta-observations

- **llms.txt는 쉬운 경쟁에서 이기고 있다.** 약 12개의 1차 시스템이 공개한다(상단 수치는 10/37). 문서 플랫폼이라면 사실상 무료로 낼 수 있어 채택은 넓지만 얕고, 대부분은 기존 sitemap을 인덱싱하는 수준이다.
- **1차 MCP server는 아직 드물다.** 감사 대상의 약 4분의 1이 공개하며(상단 수치는 12/37로 약 3분의 1), 상용 컴포넌트 라이브러리(MUI, Chakra, Mantine, Ant, shadcn)와 강하게 상관된다. Apple, Google M3, Airbnb, Stripe의 브랜드와 엔터프라이즈 design system에는 눈에 띄게 없다.
- **shadcn 방식 component registry는 단독 범주다.** 이 층에서 CLI로 설치하는 registry를 공개한 시스템은 shadcn/ui 외에 없다. Tailwind UI, Geist, Radix가 유력 후보이지만 아무도 내지 않았다.
- **DTCG 준수는 가장 검증하기 어렵다.** 대부분 design token을 JSON이나 Style Dictionary로 공개하지만 W3C 안정판 `$value`/`$type` 준수를 명시하는 곳은 적다. 규격이 2025년 10월에야 안정화되어 많은 시스템이 마이그레이션 중이다.
- **종합 패턴.** 가장 agent-ready에 가까운 시스템은 강한 문서 사이트를 갖춘 오픈소스 React 컴포넌트 라이브러리(MUI, Chakra, Mantine, Ant, shadcn)다. 브랜드와 엔터프라이즈 design system은 llms.txt를 제외한 모든 신호에서 12~24개월 뒤처져 있다.

원문의 비율 서술("roughly a dozen", "about a quarter")은 상단 수치(10/37, 12/37)와 정확히 맞지 않는다. 수치를 인용할 때는 상단 수치와 점수표를 기준으로 삼는다.

### 3.7 부가 서비스

- 무료 스캐너: 자기 시스템의 문서를 같은 다섯 검사로 약 10초 안에 확인한다. 가입 없음(`/tools/agent-ready-check`).
- 유료 감사: Agent-Readiness Audit. 같은 방법론에 Code Connect, design token 구조, 순서를 정한 개선 로드맵을 더한다. 고정가 3,500달러, 2주.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 항목 | 값 |
|---|---|
| 감사 대상 | 37개 시스템 |
| 감사일 / 다음 재감사 | 2026-09-04 / 2026-12-04 |
| 최고점 | Carbon 4/5 |
| 3점 | Primer, shadcn/ui |
| 2점 | Ant Design, Atlassian, Backpack, Chakra UI, Mantine, MUI, Spectrum (7개) |
| 0점 | 19개 (전체의 약 51%) |
| 5점 | 없음 |
| 신호별 공개 수 | MCP 12, llms.txt 10, DTCG 6, Code Connect 3, Registry 1 |
| unknown 칸 | 185칸 중 48칸 (약 26%) |
| DesignSystems.one 자체 점수 | 4/5 (2026-09-02, 순위표 제외) |
| DTCG 규격 안정화 | 2025년 10월 |
| 브랜드/엔터프라이즈 시스템의 지연 | 12~24개월 (llms.txt 제외) |

Material 3, Apple HIG, GOV.UK, U.S. Web Design System처럼 널리 알려진 시스템도 0/5다. 반면 점수가 높은 쪽은 상용 또는 오픈소스 React 컴포넌트 라이브러리와 IBM, GitHub의 시스템이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **공개 산출물만 잰다.** 점수는 다섯 가지 산출물의 존재 여부이며, 산출물의 품질이나 에이전트가 실제로 만든 코드의 정확도는 측정하지 않는다.
- **unknown이 많다.** 185칸 중 48칸이 unknown이어서, 특히 하위권 시스템의 0점은 "확인된 부재"와 "확인하지 못함"이 섞여 있다. 저자도 Code Connect가 가장 과소 집계되었을 수 있다고 인정한다.
- **자기 서술의 불일치.** "Nobody scores 4 or 5"는 Carbon 4/5와 어긋나고, "roughly a dozen"과 "about a quarter"도 상단 수치와 정확히 맞지 않는다.
- **이해관계.** 사이트는 자체 점수를 순위표에서 뺐지만 4/5로 발표했고, 같은 방법론의 유료 감사(3,500달러)를 판매한다.
- **신호 선택.** 다섯 신호 중 component registry는 shadcn 규격 하나로 정의되어 있어, 다른 배포 방식을 쓰는 시스템에는 구조적으로 불리하다.
- **시점 의존.** 분기마다 재감사하므로 점수와 순위가 바뀔 수 있다. 인용 시 감사일을 함께 적어야 한다.

## 6. 관련 연구 (Related Work)

- [[etc/designsystems-one-2026-design-systems-explained-gallery-guides]]: 같은 사이트의 랜딩 페이지. 이 지표의 상위 5개를 요약해 보여 준다.
- [[etc/designsystems-one-2026-ai-ready-design-systems-make-yours]]: 같은 사이트의 AI-ready 허브. design token, MCP server, 컴포넌트의 세 pillar를 제시하며 이 지표를 네 번째 신호로 인용한다.
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian Design System의 MCP server, 스킬, DESIGN.md 실측. 이 지표에서 Atlassian은 MCP와 llms.txt가 확인되어 2/5다.
- [[agents/google-labs-code-design-md]]: DESIGN.md 규격. 이 지표의 다섯 신호에는 DESIGN.md가 포함되어 있지 않다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| Agent-Ready Index | design system 37개를 다섯 가지 공개 산출물 신호로 채점한 DesignSystems.one의 지표 |
| llms.txt | 문서 도메인 루트에 두어 LLM이 읽을 문서 목록과 내용을 알려 주는 텍스트 파일 |
| DTCG | W3C Design Tokens Community Group. design token 파일 형식(`$value`, `$type`)을 정한다 |
| component registry | `npx shadcn add <url>`로 컴포넌트 소스를 저장소 안에 바로 설치하게 하는 shadcn 규격 배포 창구 |
| Figma Code Connect | Figma 컴포넌트와 코드 컴포넌트를 `.figma.tsx` 파일로 대응시키는 매핑 |
| first-party evidence | 유지 관리자가 공식 도메인에 직접 공개한 산출물만 인정하는 채점 원칙 |
| unknown | 감사 기간 안에 공식 URL에서 확인하지 못한 칸. "아니오"로 세지 않는다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 페이지 전체 스크린샷 (6,000px 세로) | screenshot | (선택) 쿠키 배너가 겹쳐 wiki 임베드 비권장 |
| fig02 | 신호별 채택 수와 점수 분포 막대 | crop | ★ wiki 권장 (result) |
| fig03 | 점수표 1부 (Carbon부터 Spectrum까지) | crop | ★ wiki 권장 (result) |
| fig04 | 점수표 2부 (Canvas부터 Apple HIG까지) | crop | (확인 필요) 표로 옮겼다 |
| fig05 | 점수표 3부 (Audi UI부터 Linear까지) | crop | (확인 필요) 표로 옮겼다 |
| fig06 | 점수표 4부 (Mailchimp부터 U.S. Web Design System까지) | crop | (확인 필요) 표로 옮겼다 |
