---
title: "How Stripe Built Kai, its Company-Wide AI Agent, on Deep Agents"
type: article
year: 2026
category: agents
raw_path: raw/articles/langchain-2026-how-stripe-built-kai-on.md
raw_filename: "langchain-2026-how-stripe-built-kai-on.md"
source_collection: external
author: "Sofia Sulikowski"
url: "https://www.langchain.com/blog/how-stripe-built-their-knowledge-ai-platform-on-deep-agents"
publisher: "LangChain Blog"
publication_date: "2026-08-03"
fetched_at: "2026-09-25T20:50:03+0900"
extractor_tier: "chrome"
tags: []
figures:
  - id: fig01
    file: assets/langchain-2026-how-stripe-built-kai-on/fig01.jpg
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig01.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/langchain-2026-how-stripe-built-kai-on/fig02.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig02.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/langchain-2026-how-stripe-built-kai-on/fig03.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig03.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/langchain-2026-how-stripe-built-kai-on/fig04.jpg
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig04.jpg
    caption: ""
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/langchain-2026-how-stripe-built-kai-on/fig05.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/fig05.png
    caption: ""
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/langchain-2026-how-stripe-built-kai-on/page-full.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig07
    file: assets/langchain-2026-how-stripe-built-kai-on/crop01.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/langchain-2026-how-stripe-built-kai-on/crop02.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/langchain-2026-how-stripe-built-kai-on/crop03.png
    raw: raw/articles/langchain-2026-how-stripe-built-kai-on-figures/crop03.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `chrome`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

[Case Studies](/blog?category_equal=%5B%22Case+Studies%22%5D)

# How Stripe Built Kai, its Company-Wide AI Agent, on Deep Agents

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a10d5ed01e84b2e809523b1_sofia-sulikowski.jpeg)

Sofia Sulikowski

August 3, 2026

![](https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69ce2c533137196179bae949_Icon-7.svg)

10

min

[Go back to blog](/blog)

[Building an in-house agent harness](#building-an-in-house-agent-harness)fs-toc-anchor

[A context-aware AI coworker for every Stripe employee](#a-context-aware-ai-coworker-for-every-stripe-employee)fs-toc-anchor

[Deep Agents gave Stripe the agent foundation, so the team could focus on their domain-specific workflows](#deep-agents-gave-stripe-the-agent-foundation-so-the-team-could-focus-on-their-domain-specific-workflows)

[What made Kai production-ready](#what-made-kai-production-ready)

[Skills: how Kai navigates hundreds of internal tools and skills](#skills-how-kai-navigates-hundreds-of-internal-tools-and-skills)

fs-toc-anchor

[Hitting Kai’s quarterly adoption target in one week](#hitting-kais-quarterly-adoption-target-in-one-week)fs-toc-anchor

fs-toc-anchor

Share

[Stripe](https://stripe.com/) is the global payments and financial infrastructure platform used by millions of businesses. To support the constant shipping and iterating of products at scale, they’ve built AI tooling that helps employees across Stripe be more productive. Stripe’s AI platform team is responsible for the stack that powers all the AI applications at the company. Their most visible product is Stripe’s Knowledge AI Platform, also known as Kai, a company-wide productivity agent built on the LangChain/LangGraph stack and the [Deep Agents](https://www.langchain.com/deep-agents) agent harness.

## Building an in-house agent harness

As agentic AI adoption accelerated, engineering teams across Stripe began building orchestration layers on top of their existing Ruby and Java stacks. Integrating these systems with Stripe’s internal infrastructure was relatively straightforward, but building a reliable, production-quality agent harness introduced additional challenges.

Effective agent systems require more than connectivity. They also need strong performance, robust evaluation, and the ability to handle complex tasks consistently. Teams often found that their initial implementations worked for simpler use cases but needed further investment to deliver dependable results at scale. 

With Claude Code’s launch in late 2024, suddenly every Stripe employee wanted to build agents. But for non-engineers, the terminal, data access, and security components were significant barriers. Sharadh Krishnamurthy, Engineering Manager for the Agent Foundation team, and Anupam Upadhyay, Staff Software Engineer, saw an inverse approach: instead of pushing non-technical employees toward developer tooling, what if you met them where they were, with something purpose-built? In other words, "What if everybody had an always-on, production-ready assistant?" The answer became Stripe’s Knowledge AI Platform.

## A context-aware AI coworker for every Stripe employee

Stripe’s Knowledge AI Platform is available to every employee. It is purpose-built for the work most Stripes actually do—synthesizing data, brainstorming, drafting documents, analyzing trends, and collaborating across functions—all in a single session-based interface that connects to Stripe's internal data warehouse, Slack, and Google Suite.

A user starts a session, interacts through chat, and Kai produces artifacts, reports, dashboards, or documents that live alongside the conversation. As the chat continues, the artifacts evolve. It operates like a coding agent for non-engineers.

As opposed to generic AI assistants, Kai comes preloaded with Stripe context through tools and skills. It knows how Stripe works and understands the company's internal systems, data sources, and norms. Users don’t need to explain their job function or their company to Kai before every task. And experts in various parts of the company contribute their domain knowledge through a library of skills with over 1000 skills from over 100 teams.

## Deep Agents gave Stripe the agent foundation, so the team could focus on their domain-specific workflows

Kai's foundation is Deep Agents, LangChain's open-source agent harness. Deep Agents provides the foundation that wires together the tool-calling loop, middleware composition, streaming, and state management that would otherwise take months to build and harden from scratch.

Stripe's layered architecture includes:

- Deep Agents as the base: The foundational layer handles all LLM interaction primitives, including request management, agent execution, and middleware composition.
- A Stripe-specific harness built on Deep Agents: This middle layer integrates Kai into Stripe's security posture, infrastructure, and internal services to create an opinionated environment.
- Configuration layer: On top of the harness, teams can configure their own custom Kai agents, specialized agent instances with different skill sets, behaviors, and personas, without touching the underlying harness.
- The Kai UI: The product experience that most Stripes interact with, connecting down through all three layers.

"The Deep Agents layer solves all the non-Stripey problems, so that we can focus on solving the Stripey agent problems," explained Sharadh. "You can take a bunch of middleware off the shelf. The composable skill patterns, the composite backend, it provides the right structure, but still enough flexibility."

### What made Kai production-ready

Anupam built Kai’s initial version in one week. The Deep Agents middleware that unlocked that speed were:

- Filesystem middleware: Kai is a production service running in the cloud, not a local process. Stripe built a virtual filesystem backed by S3 so that agents can read, write, and reference files as context across turns. Filesystems work well for LLM context because they turn that context into something the model can inspect, update, and organize over time. Stripe wraps every sandbox execute call with a "sync in / sync out" pattern: before execution, all relevant files are materialized into the sandbox; after execution, any new or modified files are synced back out to the virtual filesystem. As a result, the agent, and the LLM driving it, experience a coherent, persistent file environment across the full lifetime of the session.
- Sandbox middleware: Kai runs code execution through a sandboxed environment for two categories of work: analytics (writing and running Python to query data, produce charts) and processing arbitrary file formats (PDFs, presentations, structured documents). The sandbox is exposed to the agent as a tool, not as the execution environment for the agent itself. The agent runs outside the sandbox and calls into it, keeping execution boundaries clean and preventing [a class of security concerns](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) with LLM generated code.
- Summarization middleware: Essential for managing context across long-running, multi-turn sessions where accumulated context would otherwise degrade performance or hit model limits. Kai is especially good at multi-turn long sessions. To make the best use of available LLM context while balancing cost, Kai leverages various tuning knobs available via deepagents library, like summarization threshold, summarizer model and output size, etc. Most users run Kai sessions intermittently, so avoiding cache misses of large context size helps control costs. 

### Skills: how Kai navigates hundreds of internal tools and skills

Kai operates across hundreds of internal tools and workflows using skills. Skills in Deep Agents are structured, agent-executable modules. Each skill encapsulates how to accomplish a specific task, what tools to load, and how to approach a category of work.

Stripe follows a federated approach where individual teams own and maintain their own skills. The base Kai agent ships with a set of foundational skills covering broad Stripe navigation, and additional tiered skills are loaded based on user profile and the specific Kai agent configuration in use. For example, a user in sales ops gets a different skill set than a user in finance; a user-level profile layer allows individuals to add more skills on top of their function defaults.

With 500+ internal MCP tools available and a growing skills library, Kai cannot load everything into context. [Agent Skills](http://agentskills.io)’ allowedTools lists drive dynamic tool loading, creating a two-pass system where skill selection gates tool context, rather than loading all tools upfront. The selection relies on the LLM which already has the relevant context. "The LLM is spending effort figuring out which skills to load, so that is what we then rely on to load the relevant tools as well," explained Anupam. Certain foundational skills are pinned, persisting regardless of what the model decides to load or unload. This ensures consistent Stripe context and policy behavior at all times.

With a 1024 character limit on frontmatter, the team discovered quality degradation of frontier models with more than 150 skills when combined with their system prompt. The number of skills remains a challenge, and the team is actively working towards better solutions for the future. 

1 engineer, 1 week: how Stripe's Python bet paid off immediately

Stripe spent over a decade building internal tooling, security layers, and deployment support around Ruby and Java. Adopting a Python-native stack meant rebuilding Stripe's internal service scaffolding around a new language, which was a large investment. 

Kai proved the ROI by demonstration. One engineer built Kai in a single week. The primitives from Deep Agents meant that the hard agent infrastructure was already solved.That speed proved that the time spent building internal Stripe support for Python was paid back immediately. "Kai completely solidified people's belief that Deep Agents is the way to go," emphasized Chrissie, Head of AI Platform.

## Hitting Kai’s quarterly adoption target in one week

When Kai went into open preview, it hit the team’s quarterly adoption target in a week, continuing to grow more than 16x from 296 users to over 5,000 in roughly 4 weeks. "It just caught fire. People used it, and it just clicked for them," said Sharadh.

The bulk of new users were the roles the team had designed for: sellers, finance analysts, business operations people, employees who had been told to "use AI" but had never found a tool that fit how they actually worked. "There are a lot of people who said, ‘I found the previous thing unapproachable. I had to tune a bunch of knobs. But I was being asked to use AI, and I really tried.’ And then: ‘this is great, I don't have to do any of that stuff,’" explained Sharadh.

Today, 83% of Stripe uses Kai every week, across >60k sessions. Kai sees more adoption by percentage from business functions like Marketing (95%) and GTM teams (87%) than even engineering; they describe Kai as transformative for deal preparation, pulling data from multiple internal sources, synthesizing it, and producing usable artifacts. Finance teams find it equally useful for data analysis and dashboard generation.

Some of the most vivid early feedback:

- "Kai is absolutely unbelievable for salespeople. Tens of thousands of hours will be saved."
- "My Stripe career is divided into before and after Kai."

New hires began using Kai to accelerate onboarding. The engineering team, despite building Kai for non-engineers, found themselves using it as a co-pilot for their own work: using Kai to answer questions about their own systems, and running it against their own traces and usage data to identify skill gaps and improve coverage.

What's next: post product-market fit

The team faces a good problem now, post rapid adoption…there’s a thousand use cases to fix and build for. 

Scaling skill selection. Stripe has already surpassed 500+ internal MCP tools and 1,000+ skills. No LLM can perform reliable selection across a skills catalog that size without assistance. The team is now building a hybrid selection system. Pure LLM selection works well at current scale and produces better results than RAG when full context is available, but a RAG or classifier layer will be needed to prefilter at scale before the LLM makes final decisions.

Governance and guardrails. As adoption spreads across thousands of employees, the team is investing in security and compliance guardrails to ensure that Kai's reach doesn't outpace the oversight structures needed for an enterprise environment.

Personalization at the behavioral level. Different teams want different agent behavior. Some want Kai to always plan before acting and to ask clarifying questions; others want fast, direct answers for quick brainstorming. "The whole promise of this product is you don't need to tune knobs," repeated Sharadh. "And so now we have taken upon ourselves the responsibility to build intelligence to figure all this out for people." The team is evaluating ML classifiers and AI-driven mechanisms to adapt behavior to user context automatically.

Collaboration across sessions. The current model is single-user sessions. The roadmap extends to shared skills, shared artifacts, and eventually collaborative sessions where multiple employees can iterate on the same AI outputs together.

Kai is built on [Deep Agents](https://www.langchain.com/deep-agents), LangChain's open-source agent harness. If you're building a production agent, the [Deep Agents docs](https://docs.langchain.com/oss/python/deepagents/overview) are a good place to start.

‍

### Related content

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6aac050276d05ec9f2a755d8_included-health.png)

Case Studies

#### How Included Health Built Federated Agents for Healthcare Navigation with Deep Agents and LangGraph

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a10d5ed01e84b2e809523b1_sofia-sulikowski.jpeg)

Sofia Sulikowski

September 17, 2026

![](https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69cd1fd0002272ce39bf1241_Icon-6.svg)

8

min

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6aa22070277878d400373d95_credit_genie_case%20study2.png)

Case Studies

#### How Credit Genie uses OpenWiki to keep codebase knowledge fresh, searchable, and automated

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6aa1b473b3afd2e4dd5c2a15_Kara_Kadri.jpeg)

Kara Kadri

September 10, 2026

![](https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69cd1fd0002272ce39bf1241_Icon-6.svg)

6

min

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a5fb9060b07c60550bfa079_apollo-ai-assistant.png)

Case Studies

#### How Apollo Rebuilt Its AI Assistant on Deep Agents to Power the Full GTM Loop

![](https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a10d5ed01e84b2e809523b1_sofia-sulikowski.jpeg)

Sofia Sulikowski

July 21, 2026

![](https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69cd1fd0002272ce39bf1241_Icon-6.svg)

6

min

![](https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69ce01ea562f8cc223cabf25_Frame%202147254328.svg)

Thank you! Your submission has been received!

Oops! Something went wrong while submitting the form.

 Add "," between authors, and shorten the name if more than 1 author empty related content 

### S e e w h a t y o u r a g e n t i s r e a l l y d o i n g

LangSmith, our agent engineering platform, helps developers debug every agent decision, eval changes, and deploy in one click.

[Try LangSmith](https://smith.langchain.com/)[Get a demo](/contact-sales)
