---
title: "Thinking about the evolution of forward-deployed engineers over the last 24 months"
type: article
year: 2026
category: applications
raw_path: raw/articles/shatzkamer-2026-thinking-about-the-evolution-of.md
raw_filename: "shatzkamer-2026-thinking-about-the-evolution-of.md"
source_collection: external
author: "Kevin Shatzkamer"
url: "https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/"
publisher: "commandline.microsoft.com"
publication_date: "2026-10-28T21:08:40+00:00"
fetched_at: "2026-11-25T20:00:35+0900"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/shatzkamer-2026-thinking-about-the-evolution-of/fig01.png
    raw: raw/articles/shatzkamer-2026-thinking-about-the-evolution-of-figures/fig01.png
    caption: "Image 1"
    strategy: fetched
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

The rapid pace of AI model development and technology maturity is changing the definition of forward-deployed engineering.

By [Kevin Shatzkamer](https://commandline.microsoft.com/author/kevin-shatzkamer)CVP, Forward Deployed Engineering, Microsoft[Website →](https://www.linkedin.com/in/kshatzka/)

2026.10.28

Forward-deployed engineering (FDE) isn’t a new term. Popularized by Palantir circa 2009, the concept of FDE was simple: apply a product model to custom solutions. Companies leverage empowered software engineers with direct access to users and data to discover what produces the desired customer outcome and then help the platform organization generalize those findings into durable products. The practice succeeded where traditional product requirements gathering failed—at the execution layer, where products and platforms intersect with operational realities. Product discovery, design, integration, and iteration happened against real operations rather than hypotheticals.

Being pedantic, I held onto this terminology for too long. I defined “forward-deployed engineer” as a job title, rooted in software engineering, that occupied a much different space than sales engineering or solutions architecture or consulting. I held onto the “hero FDE” who made technology work and made products better. I even held on to “deltas” (engineers on the frontlines) and “echoes” (domain deployment and adoption strategists) as a two-in-a-box execution structure, with both “gravel roads” revisited with “paved highways.” Much of this is still relevant, but I think there is clear nuance.

Customers needed this definition of the FDE when the core priority was to build foundational data layer integrations and analytics layers around a common semantic layer. Customer workflows were tacit, data was fragmented or sensitive, operational stakes were high, and users often couldn’t specify the right solution in advance. They still need this definition of the FDE, because there is much work to do to establish these foundations.

But like many other job functions, the rapid pace of AI model development and technology maturity is changing the definition of forward-deployed engineering. In fact, FDE is increasingly being used to describe capability—not just job function. Across model providers, cloud providers, and SaaS companies, forward-deployed engineering is getting institutionalized as a deployment operating system for high-ambiguity, high-value AI transformation. The signal here is that the hardest problems in AI have shifted from the model to deployment, with technical patterns showing up first, and being proven first, in production—then fed back to the tools and platforms. What I’ve observed:

1.   **The definition has widened.** What began as a customer-embedded, transformational software engineering role has increasingly become an end-to-end delivery function, spanning process redesign, production engineering, data science, governance, customer capability transfer, and measurable business outcomes.
2.   **“Engineer” remains non-negotiable.** The common denominator remains hands-on engineering embedded close to the customer’s real work. Execution still requires production code, systems architecture, integrations, evaluations, observability, security, and operational—not advisory—ownership. The feedback loops into product roadmaps (and models) are still critical.
3.   **The unit of deployment is a pod (or a squad, or a crew).** The “hero FDE” gives way to small, multi-disciplinary teams of domain experts, software engineers, data scientists, process engineers, and designers, augmented with coding assistants and deployment agents, deployment frameworks, and ecosystem partners.

![Image 1](https://commandline.microsoft.com/wp-content/uploads/2026/10/fde-evolution-command-line-v3-1024x683.png)
## The mission, technology center, and responsibilities all changed

Over the last several years, we’ve seen the bottleneck in successful AI programs shift from use-case identification and prioritization to engineering talent. We saw PoCs get stuck at business validation or on security, observability, or compliance requirements. We also saw pilots stall before production scale and quality. The constraint moved from value determination to software development capacity. Then we saw rapid improvement in AI coding tools and the maturity of the agent harness, unblocking the path to production scale, quality, and trust. Now, we’re entering a new phase where the bottleneck becomes transformation capacity, or an organization’s ability to take an idea to production and measurable value, then to a scaled capability for the next team to reuse. Most organizations have never had to build this muscle, let alone build it at a pace that matches the AI technology curve. This is both a mindset shift for most organizations and a critical foundation to successful FDE projects: durable return on value.

As the constraints changed, the mission needed to change. The mission changed from:

*   Pre-2025: Make a platform work in a complex operating environment
*   Mid-2025: Close the identified AI prototype to production gap
*   **Today: Redesign and operate critical workflows around AI and agents**

And as the mission changed, so has the technical competency, tooling, and delivery responsibility. The technology center has changed from:

*   Mid-2025: Data integration, applications, and platforms to full-stack applications, retrieval-augmented generation (RAG), APIs, and models
*   **Today: Multi-agent systems, the agentic harness,****MCP/tool use, evals, observability, identity, security, state management, cost/latency, CI/CD, and AI-assisted development**

The delivery responsibility has changed from:

*   Mid-2025: Build (and potentially operate) to prototype and then facilitate production handoff
*   **Today: Stable production development, post-launch tuning, governance, incident readiness, and capability transfer**

Success is measured through workflow impact, production adoption, and ROI. Success is also measured in the structural capability leave-behinds: an observable system, knowledge graphs, tuned models, eval frameworks, and trained experts.**At the conclusion of any FDE project, the goal is to transfer operating capability to the customer—not manufacture continuous dependence. This happens with three best-practices for FDE:**

1.   **Co-Engineering:** Similar to pair programming, for the entire engineering discipline (testing, CI/CD, continuous evaluation, written records of design decisions, code review)
2.   **Formalized transfer:** Knowledge transfer sessions running in parallel to final engineering sprints
3.   **Customer ready to operate**: The transfer is dependent on the customer’s ability to run it; a named customer owner, support team, and documented deployment and run-state processes

| **Dimension** | **Early formulation** | **Shift 1** | **Shift 2 (current)** |
| --- | --- | --- | --- |
| **Mission** | Make a powerful platform work in a specific, complex institution | Close the prototype-to-production gap for generative AI | Redesign critical workflows for operational scale and production around AI and agents, with measurable outcomes |
| **Unit of delivery** | Individual FDE plus strategist; small customer team | Small specialist FDE team | Multidisciplinary pod: software/AI engineers, domain experts, TPM/delivery lead, security/governance, sometimes change/adoption specialists, augmented by AI agents |
| **Technical center** | Data integration, applications, infrastructure, proprietary platform | Full-stack applications, APIs, RAG, model integration | Multi-agent systems, MCP/tool use, evals, observability, identity, compliance, security, state management, cost/latency, CI/CD, and AI-assisted development |
| **Deployment responsibility** | Build and sometimes operate the solution | Prototype through production handoff | Stable production, post-launch tuning, governance, incident readiness, and capability transfer |

### A new working definition of FDE

A quick recap of the changes:

*   **Early FDE:** Put an unusually capable engineer next to a difficult customer problem and connect field reality to a reusable platform
*   **Mid-2025 FDE:** Use that engineer to bridge the widening gap between an impressive AI prototype and production quality, scale, and adoption
*   **Today FDE:** Deploy an AI-accelerated, multidisciplinary capability that discovers the right business problem, redesigns the workflow, builds and governs the production system, proves measurable value, changes the product roadmap, and leaves the customer stronger

This leads me to a single way of expressing FDE when asked in the future: a small, multidisciplinary team deployed directly against a measurable business outcome, combining product, engineering, AI, data, operations, and transformation capabilities to move an AI opportunity from problem identification to production and measurable value.
