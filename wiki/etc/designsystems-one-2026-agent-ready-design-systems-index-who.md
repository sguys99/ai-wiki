---
title: "Agent-Ready Design Systems Index: who actually ships MCP, llms.txt, DTCG, registry, and Code Connect"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who.md
raw_filename: "designsystems-one-2026-agent-ready-design-systems-index-who.md"
source_collection: external
source: designsystems-one-2026-agent-ready-design-systems-index-who.md
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/ai-ready/systems"
publisher: "DesignSystems.one"
tags: [design-system, agent-ready, ai-ready-index, benchmark, mcp, llms-txt, dtcg, component-registry, figma-code-connect, shadcn-ui, carbon, primer, designsystems-one]
figures:
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
---

## 요약

Agent-Ready Design Systems Index는 DesignSystems.one이 갤러리의 design system 37개를 코딩 에이전트 대응 수준으로 채점해 공개한 독립 감사다. 채점 기준은 다섯 가지 공개 산출물, 즉 MCP server, llms.txt, DTCG 형식 design token, component registry, Figma Code Connect다. 신호마다 유지 관리자가 공식 URL에 직접 공개했을 때만 1점을 주므로 점수 범위는 0~5점이다.

2026-09-04 감사 결과 최고점은 Carbon의 4/5이고, 5점을 받은 시스템은 없으며, 37개 중 19개가 0점이다. 신호별로는 MCP server가 12개로 가장 많고 component registry는 shadcn/ui 하나뿐이다. 저자는 강한 문서 사이트를 갖춘 오픈소스 React 컴포넌트 라이브러리가 가장 앞서 있고, 브랜드와 엔터프라이즈 design system은 llms.txt를 제외한 모든 신호에서 12~24개월 뒤처져 있다고 정리한다.

데이터는 JSON과 CSV로 CC BY 4.0 공개되며 분기마다 재감사한다(다음 예정 2026-12-04). 이 페이지는 지표 페이지 한 장을 근거로 하며, 점수표의 신호별 판정은 페이지 스크린샷에서 읽어 옮겼다.

## 배경

### 지표의 위치

이 지표는 DesignSystems.one 랜딩 페이지([[etc/designsystems-one-2026-design-systems-explained-gallery-guides]])가 상위 5개를 요약해 보여 주고, AI-ready 허브([[etc/designsystems-one-2026-ai-ready-design-systems-make-yours]])가 시장 신호 네 가지 중 하나로 인용하는 원자료다. 허브가 design system을 에이전트에 읽히는 조건을 세 pillar(design token, MCP server, 컴포넌트 계약)로 설명한다면, 이 지표는 실제 시스템들이 그 조건에 해당하는 산출물을 얼마나 공개했는지를 센다.

### 1차 증거 원칙

지표는 페이지 머리에서 채점 대상을 좁게 정의한다. 유지 관리자가 스스로 공개한 1차 증거(first-party evidence)만 인정하며, 다음은 세지 않는다.

- 커뮤니티가 만든 래퍼
- 제3자가 만든 MCP shim
- 근거 없이 "Figma를 지원한다"고 하는 일반적 주장

AI-ready 허브의 설명에 따르면 이번 재감사는 각 시스템의 저장소 트리를 직접 읽는 방식으로 진행했고, 따라서 트리에 없는 것은 부재의 증거로 센다. 즉 이 지표는 마케팅 문구가 아니라 저장소와 공식 도메인에 실제로 존재하는 파일을 기준으로 한다.

## 핵심 개념

MCP는 모델이 외부 도구와 데이터 원천에 표준화된 방식으로 접근하게 하는 프로토콜이다. 지표의 MCP server 신호는 에이전트가 등록할 수 있는 stdio 또는 HTTP 방식 server를 유지 관리자가 직접 공개했는지를 본다.

llms.txt는 문서 도메인 루트에 두어 LLM이 읽을 문서 목록과 내용을 알려 주는 텍스트 파일이다. 지표는 공식 문서 도메인의 `/llms.txt`가 내용을 반환하면 인정한다.

DTCG는 W3C Design Tokens Community Group의 약어이며, design token 파일 형식을 정한 단체다. 이 형식은 값과 type을 `$value`, `$type` 키로 적는다. 지표의 설명에 따르면 이 규격은 2025년 10월에야 안정화되었다.

component registry는 `npx shadcn add <url>` 명령으로 컴포넌트 소스를 사용자 저장소 안에 바로 설치하게 하는 shadcn 규격 배포 창구를 뜻한다. 에이전트는 설치된 소스를 직접 읽고 고칠 수 있다.

Figma Code Connect는 Figma의 디자인 컴포넌트와 코드 컴포넌트를 `.figma.tsx` 파일로 대응시키는 매핑이다. 지표는 이 매핑을 공개 배포했는지를 본다.

## 방법

### 다섯 가지 신호와 인정 기준

| 신호 | 인정 기준 | 에이전트에게 주는 것 |
|---|---|---|
| MCP server | 에이전트가 등록할 수 있는 stdio 또는 HTTP 방식 Model Context Protocol server | 세션 중 조회 창구 |
| llms.txt | 공식 문서 도메인의 `/llms.txt`가 내용을 반환한다 | 문서 진입점 |
| DTCG tokens | W3C DTCG 형식(`$value`, `$type`)의 design token | 파싱 가능한 디자인 값 |
| Component registry | `npx shadcn add <url>`로 설치할 수 있는 공개 shadcn 규격 registry | 저장소 안에 설치되는 컴포넌트 소스 |
| Figma Code Connect | Code Connect 매핑(`.figma.tsx`) 공개 배포 | 디자인과 코드의 대응 |

세 번째 열은 이 페이지가 각 신호의 인정 기준에서 정리한 역할이다. 신호 하나에 1점이므로 다섯 신호를 모두 공개하면 5점이다.

### unknown 처리

지표는 판정을 세 가지로 나눈다. 확인된 공개(✓), 없음(✗), 그리고 unknown(?)이다. 일부 칸에는 해당 없음(n/a)도 쓰인다.

unknown은 추측이 아니라 감사 기간 안에 공식 URL에서 1차 산출물을 확인하지 못했을 때의 답이며, "아니오"로 세지 않는다. 그러나 점수는 확인된 공개만 더하므로 unknown 칸은 점수에 기여하지 않는다. 즉 unknown이 많은 시스템은 실제보다 낮게 채점되었을 수 있다.

저자는 특히 Code Connect가 공개가 적은 신호라 가장 과소 집계되었을 수 있다고 인정한다. 판정이 틀렸다면 갤러리의 시스템별 breakdown이 출처를 링크하므로 이슈를 열면 재감사한다고 밝힌다. 이를 위해 점수표는 시스템마다 unknown 칸 수와 출처 링크가 붙은 칸 수(sourced)를 따로 표시하고, 근거와 날짜는 `/ai-ready/evidence`에서 확인하게 한다.

### 사이트 자체 점수

지표는 제작자인 DesignSystems.one을 순위표에 넣지 않는다. 독립 지표가 제작자를 채점해서는 안 된다는 이유다. 대신 2026-09-02에 같은 다섯 규칙으로 따로 채점한 결과를 공개하며, 점수는 4/5다.

| 신호 | 판정 | 근거 |
|---|---|---|
| MCP server | 있음 | Streamable HTTP(JSON-RPC 2.0) 방식 1차 MCP server, 인증 없음. `/api/mcp`와 `/mcp` |
| llms.txt | 있음 | 공식 도메인의 `/llms.txt`와 `llms-full.txt` |
| DTCG tokens | 있음 | Token Generator가 W3C DTCG 형식(`$value`, `$type`, `$description`)을 출력한다 |
| Component registry | 있음 | `/r`의 shadcn 규격 registry 인덱스, `npx shadcn add`로 설치 |
| Figma Code Connect | 없음 | registry 컴포넌트에 대한 Code Connect 매핑을 공개하지 않았다 |

이 점수는 순위표에 넣었다면 Carbon과 공동 1위에 해당한다. 지표는 제작자를 순위에서 뺐지만, 같은 페이지에서 사이트 스스로 최고점과 같은 점수를 받았다고 발표하는 구조다.

## 결과

### 신호별 채택과 점수 분포

지표는 같은 감사를 두 방향으로 요약한다. 하나는 신호별로 몇 개 시스템이 공개했는지이고, 다른 하나는 점수별로 몇 개 시스템이 있는지다.

![[assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig02.png]]
*Figure 2: 신호별 채택 수(왼쪽)와 0~5점 분포(오른쪽). 37개 중 19개가 0점이다 (DesignSystems.one 2026)*

| 신호 | 공개 시스템 수 | 비율 |
|---|---|---|
| MCP server | 12 | 약 32% |
| llms.txt | 10 | 약 27% |
| DTCG tokens | 6 | 약 16% |
| Figma Code Connect | 3 | 약 8% |
| Component registry | 1 | 약 3% |

| 점수 | 시스템 수 |
|---|---|
| 0/5 | 19 |
| 1/5 | 8 |
| 2/5 | 7 |
| 3/5 | 2 |
| 4/5 | 1 |
| 5/5 | 0 |

신호별 도식의 설명은 "llms.txt is the cheap race; the registry lane is still nearly empty"다. 즉 llms.txt는 공개 비용이 낮아 경쟁이 쉽고, registry는 거의 비어 있다.

분포 도식의 설명은 "Nobody scores 4 or 5, fully agent-ready doesn't exist yet. That's the headline."(원문은 em dash로 연결)이다. 그러나 같은 도식이 4/5에 1개(Carbon)를 표시하고 리더보드 1위도 4/5이므로, "Nobody scores 4"는 페이지 자체 수치와 어긋난다. 5점이 0개라는 부분, 곧 완전히 agent-ready인 시스템이 아직 없다는 결론만 수치와 일치한다.

분포의 모양도 한쪽으로 치우쳐 있다. 0점이 절반을 넘고(약 51%), 1점과 2점을 합치면 15개이며, 3점 이상은 3개뿐이다. 따라서 상위 5개를 보여 주는 리더보드만으로는 업계 전반의 수준을 과대평가하기 쉽다.

### 37개 시스템 점수표

정렬은 점수순이며 동점은 알파벳순이다. 기호는 ✓ 확인된 공개, ✗ 없음, ? unknown, n/a 해당 없음이다. 아래는 상위 10개 구간의 원본 캡처다.

![[assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig03.png]]
*Figure 3: 점수표 1부. Carbon부터 Spectrum까지 10개 시스템 (DesignSystems.one 2026)*

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

표에서 옮긴 판정의 신호별 합계는 MCP 12, llms.txt 10, DTCG 6, Registry 1, Code Connect 3으로 페이지 상단 수치와 같고, unknown 칸의 합계는 48칸으로 AI-ready 허브가 적은 "185칸 중 48칸"과 같다.

### 점수표의 세부 관찰

점수표를 읽으면 요약 수치에 드러나지 않는 사실 몇 가지가 보인다.

- **상위 3개의 경로가 서로 다르다.** Carbon은 registry만 빠진 네 신호로 1위다. Primer는 MCP, DTCG, Code Connect로 3점이고 llms.txt는 unknown이다. shadcn/ui는 유일한 registry 보유자이지만 DTCG와 Code Connect가 없다.
- **2점 구간은 대부분 MCP와 llms.txt의 조합이다.** 2점 7개 중 Ant Design, Atlassian, Chakra UI, Mantine, MUI, Spectrum 여섯이 MCP와 llms.txt로 2점을 받았다. 예외인 Backpack은 DTCG와 Code Connect로 2점이다.
- **출처 링크 수와 점수가 일치하지 않는 시스템이 있다.** NHS Design System과 Pajamas는 1점이지만 sourced가 0/5이고, Carbon은 4점 중 3칸만 출처 링크가 있다. 확인된 공개와 출처 링크가 붙은 판정은 별개로 관리되는 것으로 읽힌다.
- **n/a는 네 칸뿐이다.** DTCG 칸의 Apple HIG, Linear, Radix UI와 Linear의 Code Connect 칸이다. 해당 없음의 판단 근거는 이 페이지에 적혀 있지 않다.
- **Geist는 unknown이 가장 많다.** 다섯 칸 중 네 칸이 unknown이고 registry만 ✗로 확인되었다.
- **Polaris와 Spectrum.** AI-ready 허브는 두 시스템이 DTCG와 Code Connect에서 자주 거론되지만 규격 이전 형식이거나 전체 트리에 없었다고 적는다. 점수표에서도 두 시스템은 두 신호가 모두 ✗다.

### 저자의 업계 관찰

지표 하단의 Meta-observations 절은 점수표에서 읽은 패턴을 다섯 가지로 정리한다.

| 관찰 | 내용 |
|---|---|
| llms.txt는 쉬운 경쟁에서 이긴다 | 약 12개의 1차 시스템이 공개한다. 문서 플랫폼이라면 사실상 무료로 낼 수 있어 채택은 넓지만 얕고, 대부분은 기존 sitemap을 인덱싱하는 수준이다 |
| 1차 MCP server는 아직 드물다 | 감사 대상의 약 4분의 1이 공개하며, 상용 컴포넌트 라이브러리(MUI, Chakra, Mantine, Ant, shadcn)와 강하게 상관된다. Apple, Google M3, Airbnb, Stripe의 시스템에는 눈에 띄게 없다 |
| registry는 단독 범주다 | CLI로 설치하는 registry를 공개한 시스템은 shadcn/ui 외에 없다. Tailwind UI, Geist, Radix가 유력 후보이지만 아무도 내지 않았다 |
| DTCG 준수는 검증이 가장 어렵다 | 대부분 design token을 JSON이나 Style Dictionary로 공개하지만 W3C 안정판 `$value`/`$type` 준수를 명시하는 곳은 적다. 규격이 2025년 10월에야 안정화되어 많은 시스템이 마이그레이션 중이다 |
| 종합 패턴 | 가장 agent-ready에 가까운 시스템은 강한 문서 사이트를 갖춘 오픈소스 React 컴포넌트 라이브러리다. 브랜드와 엔터프라이즈 design system은 llms.txt를 제외한 모든 신호에서 12~24개월 뒤처져 있다 |

관찰의 비율 표현은 상단 수치와 정확히 맞지 않는다. "약 12개"라고 적은 llms.txt는 상단 수치로 10개이고, "약 4분의 1"이라고 적은 MCP server는 12/37로 약 3분의 1이다. 수치를 인용할 때는 상단 수치와 점수표를 기준으로 삼는다.

종합 패턴은 점수표와 대체로 일치한다. 2점 이상 10개 중 Carbon, Primer, Atlassian, Backpack, Spectrum을 뺀 다섯 개가 저자가 든 오픈소스 React 라이브러리(shadcn/ui, Ant Design, Chakra UI, Mantine, MUI)이고, Material 3와 Apple HIG는 0점이다. 다만 1위 Carbon과 2위 Primer는 각각 IBM과 GitHub의 시스템이므로, 기업 시스템이 전부 뒤처져 있는 것은 아니다.

## 데이터 이용과 부가 서비스

지표는 재사용을 전제로 데이터를 공개한다.

| 항목 | 내용 |
|---|---|
| 형식 | JSON(`/api/ai-ready/systems`), CSV(`/api/ai-ready/systems.csv`). 감사일마다 고정 |
| 라이선스 | CC BY 4.0. DesignSystems.one을 출처로 밝히고 지표 URL을 링크한다 |
| 권장 인용 | DesignSystems.one. (2026). Agent-Ready Design Systems Index. https://www.designsystems.one/ai-ready/systems, audited 2026-09-04 |
| 변경 이력 | `/ai-ready/changes` |
| 근거와 날짜 | `/ai-ready/evidence` |
| 무료 스캐너 | 같은 다섯 검사를 자기 문서에 약 10초 안에 실행한다. 가입 없음 (`/tools/agent-ready-check`) |
| 유료 감사 | Agent-Readiness Audit. 같은 방법론에 Code Connect, design token 구조, 순서를 정한 개선 로드맵을 더한다. 고정가 3,500달러, 2주 |

## 한계

- **존재 여부만 잰다.** 점수는 다섯 가지 산출물이 공개되었는지를 셀 뿐이며, 산출물의 품질이나 에이전트가 실제로 만든 코드의 정확도는 측정하지 않는다. [[agents/hall-2026-atlassians-design-md-is-here]]처럼 같은 design system에서 전달 수단별 토큰 비용과 컨텍스트 확보율을 잰 결과와는 성격이 다르다.
- **unknown이 많다.** 185칸 중 48칸(약 26%)이 unknown이라 하위권의 0점에는 "확인된 부재"와 "확인하지 못함"이 섞여 있다. unknown은 점수에 기여하지 않으므로 실제보다 낮게 채점된 시스템이 있을 수 있다.
- **자기 서술의 불일치.** "Nobody scores 4 or 5"는 Carbon 4/5와 어긋나고, "roughly a dozen"과 "about a quarter"도 상단 수치와 정확히 맞지 않는다.
- **이해관계.** 사이트는 자체 점수를 순위표에서 뺐지만 4/5로 발표했고, 같은 방법론의 유료 감사를 판매한다. 신호 중 component registry는 사이트 자신도 공개한 shadcn 규격으로만 정의된다.
- **신호 정의의 폭.** registry가 shadcn 규격 하나로 정의되어 있어 다른 배포 방식을 쓰는 시스템에는 구조적으로 불리하다. 또한 DESIGN.md 같은 파일 기반 전달 방식([[agents/google-labs-code-design-md]])은 다섯 신호에 들어 있지 않다.
- **시점 의존.** 분기마다 재감사하므로 점수와 순위가 바뀔 수 있다. 인용할 때는 감사일을 함께 적어야 한다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Agent-Ready Index | design system 37개를 다섯 가지 공개 산출물 신호로 채점한 DesignSystems.one의 지표 |
| first-party evidence | 유지 관리자가 공식 도메인에 직접 공개한 산출물만 인정하는 채점 원칙 |
| unknown | 감사 기간 안에 공식 URL에서 확인하지 못한 칸. "아니오"로 세지 않지만 점수에도 더하지 않는다 |
| llms.txt | 문서 도메인 루트에 두어 LLM이 읽을 문서 목록과 내용을 알려 주는 텍스트 파일 |
| component registry | `npx shadcn add <url>`로 컴포넌트 소스를 저장소 안에 설치하게 하는 shadcn 규격 배포 창구 |
| Figma Code Connect | Figma 컴포넌트와 코드 컴포넌트를 `.figma.tsx` 파일로 대응시키는 매핑 |

## 관련 페이지

- [[etc/designsystems-one-2026-design-systems-explained-gallery-guides]]: 같은 사이트의 랜딩 페이지. 이 지표의 상위 5개를 요약해 보여 준다
- [[etc/designsystems-one-2026-ai-ready-design-systems-make-yours]]: 같은 사이트의 AI-ready 허브. 세 pillar를 제시하고 이 지표를 시장 신호로 인용한다
- [[agents/hall-2026-atlassians-design-md-is-here]]: Atlassian Design System의 MCP server, 스킬, DESIGN.md 실측. 이 지표에서 Atlassian은 MCP와 llms.txt가 확인되어 2/5다
- [[agents/google-labs-code-design-md]]: DESIGN.md 규격. 이 지표의 다섯 신호에는 포함되지 않은 파일 기반 전달 방식이다
- [[overviews/design-md-overview]]: DESIGN.md, MCP server, Agent Skills의 로딩 방식과 토큰 비용 비교
