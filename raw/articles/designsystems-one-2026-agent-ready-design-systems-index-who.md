---
title: "Agent-Ready Design Systems Index — who actually ships MCP, llms.txt, DTCG, registry, and Code Connect"
type: article
year: 2026
category: etc
raw_path: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who.md
raw_filename: "designsystems-one-2026-agent-ready-design-systems-index-who.md"
source_collection: external
author: "Kiryl Zhukouski"
url: "https://www.designsystems.one/ai-ready/systems"
publisher: "DesignSystems.one"
fetched_at: "2026-09-30T10:13:36+0900"
extractor_tier: "chrome"
tags: []
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
    curated: false
  - id: fig03
    file: assets/designsystems-one-2026-agent-ready-design-systems-index-who/fig03.png
    raw: raw/articles/designsystems-one-2026-agent-ready-design-systems-index-who-figures/fig03.png
    caption: "37개 시스템 점수표 1부. Carbon부터 Spectrum까지 10개 시스템의 신호별 판정"
    strategy: crop
    curated: false
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

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

$/$



[designsystems .one](/)

[AI-Ready Index](/ai-ready/systems)

$

 Independent audit · 2026-09-04

# Which design systems are actually agent-ready?

Every system in the gallery scored against five concrete signals that determine whether Cursor, Claude Code, or v0 can do useful work with it. First-party evidence only — community wrappers, third-party MCP shims, and generic "supports Figma" claims don’t count. Re-audited quarterly.

- 

MCP server

12/37

- 

llms.txt

10/37

- 

DTCG tokens

6/37

- 

Component registry

1/37

- 

Figma Code Connect

3/37

[Download JSON](/api/ai-ready/systems)[Download CSV](/api/ai-ready/systems.csv)[Methodology](#methodology)[What changed](/ai-ready/changes)Next re-audit: 2026-12-04

## Leaderboard · Top 5

The systems closest to agent-ready as of 2026-09-04. Ties broken alphabetically.

- #1[Carbon IBM 4 /5](/design-systems/carbon-design)
- #2[Primer GitHub 3 /5](/design-systems/primer)
- #3[shadcn/ui shadcn 3 /5](/design-systems/shadcn-ui)
- #4[Ant Design Ant Group 2 /5](/design-systems/ant-design)
- #5[Atlassian Design System Atlassian 2 /5](/design-systems/atlassian-design)

## How this site scores

An independent index shouldn’t grade its author, so designsystems.one isn’t a row above. Scored here on 2026-09-02against the same five rules — a first-party artifact on the canonical domain, or it doesn’t count:4/5.

- 

MCP server

First-party MCP server over Streamable HTTP (JSON-RPC 2.0), no auth, also at /mcp.

[/api/mcp](https://www.designsystems.one/api/mcp)
- 

llms.txt

llms.txt and llms-full.txt on the canonical domain.

[/llms.txt](https://www.designsystems.one/llms.txt)
- 

DTCG tokens

Token generator emits W3C DTCG format ($value / $type / $description).

[/api/tokens?format=w3c](https://www.designsystems.one/api/tokens?format=w3c)
- 

Component registry

shadcn-spec registry index at /r, items installable via `npx shadcn add`.

[/r](https://www.designsystems.one/r)
- 

Figma Code Connect

No Figma Code Connect mappings are published for the registry components.

## The shape of the data

Two views of the same audit: which signals the 37 systems actually ship, and how far the field is from fully agent-ready.

Systems shipping each signal

MCP server

12 of 37

llms.txt

10 of 37

DTCG tokens

6 of 37

Figma Code Connect

3 of 37

Component registry

1 of 37

llms.txt is the cheap race; the registry lane is still nearly empty.

Score distribution, 0–5

19

0/5

8

1/5

7

2/5

2

3/5

1

4/5

0

5/5

Nobody scores 4 or 5 — fully agent-ready doesn’t exist yet. That’s the headline.

## How we score

Each system gets a score from 0 to 5: one point per signal where the maintainers themselves publish the artifact at a first-party URL.

- MCP server — stdio or HTTP Model Context Protocol server an agent can register.
- llms.txt — /llms.txt on the canonical docs domain returns content.
- DTCG tokens — tokens in W3C Design Tokens Community Group format ($value / $type).
- Component registry — public shadcn-spec registry installable via npx shadcn add <url>.
- Figma Code Connect — Code Connect mappings (.figma.tsx) shipped publicly.

What "unknown" means

"Unknown" isn’t a guess — it’s the honest answer when we couldn’t verify a first-party artifact at the canonical URL within the audit window. It does not count as a "no". Code Connect in particular is under-disclosed and may be the most-undercounted signal here.

If we got something wrong about your system, the gallery breakdown for each system links the source — open an issue and we’ll re-audit.

## The index · 37 systems

Sorted by score, ties broken alphabetically. Top score in the audit is4/5.

Unknown is not absence. The confirmed score measures published artifacts; source coverage shows how much can be independently checked. [Inspect evidence and dates](/ai-ready/evidence).

SystemScoreMCPllms.txtDTCGRegistryCode Connect

[Carbon IBM](/design-systems/carbon-design)4/5[0 unknown · 3 /5 sourced](/ai-ready/evidence?system=carbon-design)

[Primer GitHub](/design-systems/primer)3/5[1 unknown · 2 /5 sourced](/ai-ready/evidence?system=primer)?

[shadcn/ui shadcn](/design-systems/shadcn-ui)3/5[0 unknown · 3 /5 sourced](/ai-ready/evidence?system=shadcn-ui)

[Ant Design Ant Group](/design-systems/ant-design)2/5[0 unknown · 2 /5 sourced](/ai-ready/evidence?system=ant-design)

[Atlassian Design System Atlassian](/design-systems/atlassian-design)2/5[2 unknown · 2 /5 sourced](/ai-ready/evidence?system=atlassian-design)??

[Backpack Skyscanner](/design-systems/skyscanner-backpack)2/5[1 unknown · 2 /5 sourced](/ai-ready/evidence?system=skyscanner-backpack)?

[Chakra UI Chakra Systems](/design-systems/chakra-ui)2/5[1 unknown · 2 /5 sourced](/ai-ready/evidence?system=chakra-ui)?

[Mantine Mantine](/design-systems/mantine)2/5[0 unknown · 2 /5 sourced](/ai-ready/evidence?system=mantine)

[MUI (Material UI) MUI](/design-systems/mui)2/5[1 unknown · 2 /5 sourced](/ai-ready/evidence?system=mui)?

[Spectrum Adobe](/design-systems/spectrum)2/5[0 unknown · 2 /5 sourced](/ai-ready/evidence?system=spectrum)

[Canvas Workday](/design-systems/workday-canvas)1/5[1 unknown · 1 /5 sourced](/ai-ready/evidence?system=workday-canvas)?

[Cloudscape Amazon Web Services](/design-systems/amazon-design)1/5[1 unknown · 1 /5 sourced](/ai-ready/evidence?system=amazon-design)?

[Helios HashiCorp](/design-systems/hashicorp-helios)1/5[1 unknown · 1 /5 sourced](/ai-ready/evidence?system=hashicorp-helios)?

[Lightning Design System Salesforce](/design-systems/lightning-design)1/5[1 unknown · 1 /5 sourced](/ai-ready/evidence?system=lightning-design)?

[NHS Design System National Health Service](/design-systems/nhs-design)1/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=nhs-design)

[Pajamas GitLab](/design-systems/gitlab-pajamas)1/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=gitlab-pajamas)???

[Polaris Shopify](/design-systems/polaris)1/5[1 unknown · 1 /5 sourced](/ai-ready/evidence?system=polaris)?

[Stripe Design System Stripe](/design-systems/stripe-design)1/5[2 unknown · 1 /5 sourced](/ai-ready/evidence?system=stripe-design)??

[Airbnb DLS Airbnb](/design-systems/airbnb-design)0/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=airbnb-design)???

[Apple Human Interface Guidelines Apple](/design-systems/apple-hig)0/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=apple-hig)n/a

[Audi UI Audi](/design-systems/audi-ui)0/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=audi-ui)???

[BBC GEL BBC](/design-systems/bbc-gel)0/5[2 unknown · 0 /5 sourced](/ai-ready/evidence?system=bbc-gel)??

[Dropbox Design Dropbox](/design-systems/dropbox-design)0/5[2 unknown · 0 /5 sourced](/ai-ready/evidence?system=dropbox-design)??

[eBay Evo eBay](/design-systems/ebay-design)0/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=ebay-design)???

[Fluent UI Microsoft](/design-systems/fluent-design)0/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=fluent-design)???

[Geist Vercel](/design-systems/vercel-geist)0/5[4 unknown · 0 /5 sourced](/ai-ready/evidence?system=vercel-geist)????

[Gestalt Pinterest](/design-systems/gestalt)0/5[1 unknown · 0 /5 sourced](/ai-ready/evidence?system=gestalt)?

[GOV.UK Design System UK Government](/design-systems/gov-uk-design)0/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=gov-uk-design)

[Linear Linear](/design-systems/linear)0/5[1 unknown · 0 /5 sourced](/ai-ready/evidence?system=linear)?n/an/a

[Mailchimp Design System Mailchimp](/design-systems/mailchimp-design)0/5[2 unknown · 0 /5 sourced](/ai-ready/evidence?system=mailchimp-design)??

[Market Square (Block)](/design-systems/square-design)0/5[3 unknown · 0 /5 sourced](/ai-ready/evidence?system=square-design)???

[Material 3 Google](/design-systems/material-design)0/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=material-design)

[Paste Twilio](/design-systems/paste)0/5[1 unknown · 0 /5 sourced](/ai-ready/evidence?system=paste)?

[PatternFly Red Hat](/design-systems/redhat-patternfly)0/5[2 unknown · 0 /5 sourced](/ai-ready/evidence?system=redhat-patternfly)??

[Radix UI WorkOS](/design-systems/radix-ui)0/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=radix-ui)n/a

[Tailwind UI / Tailwind Plus Tailwind Labs](/design-systems/tailwind-ui)0/5[2 unknown · 0 /5 sourced](/ai-ready/evidence?system=tailwind-ui)??

[U.S. Web Design System U.S. Government](/design-systems/usds-design)0/5[0 unknown · 0 /5 sourced](/ai-ready/evidence?system=usds-design)

- 

[Carbon IBM](/design-systems/carbon-design)4/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 3 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=carbon-design)
- 

[Primer GitHub](/design-systems/primer)3/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=primer)
- 

[shadcn/ui shadcn](/design-systems/shadcn-ui)3/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 3 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=shadcn-ui)
- 

[Ant Design Ant Group](/design-systems/ant-design)2/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=ant-design)
- 

[Atlassian Design System Atlassian](/design-systems/atlassian-design)2/5

MCP

llms

DTCG?

Reg.

CC?

[2 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=atlassian-design)
- 

[Backpack Skyscanner](/design-systems/skyscanner-backpack)2/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=skyscanner-backpack)
- 

[Chakra UI Chakra Systems](/design-systems/chakra-ui)2/5

MCP

llms

DTCG?

Reg.

CC

[1 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=chakra-ui)
- 

[Mantine Mantine](/design-systems/mantine)2/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=mantine)
- 

[MUI (Material UI) MUI](/design-systems/mui)2/5

MCP

llms

DTCG?

Reg.

CC

[1 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=mui)
- 

[Spectrum Adobe](/design-systems/spectrum)2/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 2 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=spectrum)
- 

[Canvas Workday](/design-systems/workday-canvas)1/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=workday-canvas)
- 

[Cloudscape Amazon Web Services](/design-systems/amazon-design)1/5

MCP?

llms

DTCG

Reg.

CC

[1 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=amazon-design)
- 

[Helios HashiCorp](/design-systems/hashicorp-helios)1/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=hashicorp-helios)
- 

[Lightning Design System Salesforce](/design-systems/lightning-design)1/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=lightning-design)
- 

[NHS Design System National Health Service](/design-systems/nhs-design)1/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=nhs-design)
- 

[Pajamas GitLab](/design-systems/gitlab-pajamas)1/5

MCP?

llms?

DTCG

Reg.

CC?

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=gitlab-pajamas)
- 

[Polaris Shopify](/design-systems/polaris)1/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=polaris)
- 

[Stripe Design System Stripe](/design-systems/stripe-design)1/5

MCP

llms

DTCG?

Reg.

CC?

[2 unknown · 1 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=stripe-design)
- 

[Airbnb DLS Airbnb](/design-systems/airbnb-design)0/5

MCP

llms?

DTCG?

Reg.

CC?

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=airbnb-design)
- 

[Apple Human Interface Guidelines Apple](/design-systems/apple-hig)0/5

MCP

llms

DTCGn/a

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=apple-hig)
- 

[Audi UI Audi](/design-systems/audi-ui)0/5

MCP

llms?

DTCG?

Reg.

CC?

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=audi-ui)
- 

[BBC GEL BBC](/design-systems/bbc-gel)0/5

MCP

llms

DTCG?

Reg.

CC?

[2 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=bbc-gel)
- 

[Dropbox Design Dropbox](/design-systems/dropbox-design)0/5

MCP

llms

DTCG?

Reg.

CC?

[2 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=dropbox-design)
- 

[eBay Evo eBay](/design-systems/ebay-design)0/5

MCP

llms?

DTCG?

Reg.

CC?

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=ebay-design)
- 

[Fluent UI Microsoft](/design-systems/fluent-design)0/5

MCP?

llms?

DTCG?

Reg.

CC

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=fluent-design)
- 

[Geist Vercel](/design-systems/vercel-geist)0/5

MCP?

llms?

DTCG?

Reg.

CC?

[4 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=vercel-geist)
- 

[Gestalt Pinterest](/design-systems/gestalt)0/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=gestalt)
- 

[GOV.UK Design System UK Government](/design-systems/gov-uk-design)0/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=gov-uk-design)
- 

[Linear Linear](/design-systems/linear)0/5

MCP

llms?

DTCGn/a

Reg.

CCn/a

[1 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=linear)
- 

[Mailchimp Design System Mailchimp](/design-systems/mailchimp-design)0/5

MCP

llms

DTCG?

Reg.

CC?

[2 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=mailchimp-design)
- 

[Market Square (Block)](/design-systems/square-design)0/5

MCP

llms?

DTCG?

Reg.

CC?

[3 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=square-design)
- 

[Material 3 Google](/design-systems/material-design)0/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=material-design)
- 

[Paste Twilio](/design-systems/paste)0/5

MCP

llms?

DTCG

Reg.

CC

[1 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=paste)
- 

[PatternFly Red Hat](/design-systems/redhat-patternfly)0/5

MCP?

llms?

DTCG

Reg.

CC

[2 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=redhat-patternfly)
- 

[Radix UI WorkOS](/design-systems/radix-ui)0/5

MCP

llms

DTCGn/a

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=radix-ui)
- 

[Tailwind UI / Tailwind Plus Tailwind Labs](/design-systems/tailwind-ui)0/5

MCP

llms?

DTCG

Reg.

CC?

[2 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=tailwind-ui)
- 

[U.S. Web Design System U.S. Government](/design-systems/usds-design)0/5

MCP

llms

DTCG

Reg.

CC

[0 unknown · 0 /5 source-linked · audit 2026-09-04](/ai-ready/evidence?system=usds-design)

## Meta-observations

- llms.txt is winning the easy race. Roughly a dozen first-party systems publish one. It’s effectively free for any docs platform to ship, so adoption is broad but shallow — most just index the existing sitemap.
- First-party MCP servers are still rare. About a quarter of audited systems ship one, and the pattern strongly correlates with commercial component libraries (MUI, Chakra, Mantine, Ant, shadcn). Brand and enterprise design systems from Apple, Google M3, Airbnb, and Stripe-design are conspicuously absent.
- The shadcn-style component registry is a category of one. No other system in the audit publishes a CLI-installable registry at this layer. Tailwind UI, Geist, and Radix would be obvious candidates but none have shipped it.
- DTCG conformance is the hardest signal to verify. Most systems publish tokens as JSON or via Style Dictionary, but very few advertise W3C-stable $value / $type conformance explicitly. The spec only stabilized in October 2025, so many systems are mid-migration.
- Net pattern. The systems closest to agent-ready today are open-source React component libraries with a strong docs site (MUI, Chakra, Mantine, Ant, shadcn). Brand and enterprise design systems lag by twelve to twenty-four months on every signal except llms.txt.

[Read the AI-ready primer](/ai-ready)

### Cite this benchmark

The dataset is free to reuse under CC BY 4.0 — attribute DesignSystems.one and link back to the index URL. JSON and CSV downloads above are stable per audit date.

```
DesignSystems.one. (2026). Agent-Ready Design Systems Index.
https://www.designsystems.one/ai-ready/systems · audited 2026-09-04
```

### Your system isn’t on this list?

Run the same five checks against your own docs in about ten seconds — free, no signup. For the full picture (Code Connect, token architecture, and a sequenced remediation roadmap), the Agent-Readiness Audit applies this exact methodology to your system: $3,500, two weeks, fixed.

[Scan your system free](/tools/agent-ready-check)

