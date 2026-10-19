---
title: "Google’s Harness²: The Open-Source Framework That Helps AI Agents Improve Without Retraining Their…"
type: article
year: 2026
category: agents
raw_path: raw/articles/gupta-2026-googles-harness2-the-open-source.md
raw_filename: "gupta-2026-googles-harness2-the-open-source.md"
source_collection: external
author: "Mehul Gupta"
url: "https://medium.com/data-science-in-your-pocket/googles-harness%C2%B2-the-open-source-framework-that-helps-ai-agents-improve-without-retraining-their-7ccaf2604ddf"
publisher: "medium.com"
publication_date: "2026-10-17T06:37:45Z"
fetched_at: "2026-10-19T08:40:25+0900"
extractor_tier: "jina"
tags: []
figures:
  - id: fig01
    file: assets/gupta-2026-googles-harness2-the-open-source/fig01.jpg
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/fig01.jpg
    caption: "Image 2"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/gupta-2026-googles-harness2-the-open-source/page-full.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/gupta-2026-googles-harness2-the-open-source/crop01.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/crop01.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/gupta-2026-googles-harness2-the-open-source/crop02.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/crop02.png
    caption: "도식 영역 크롭"
    strategy: crop
    curated: false
---

> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `jina`. 본문은 원문 그대로이며 요약·번역·윤문하지 않았다.
> `category` 는 임시값이므로 Step 3 에서 확정할 것.

---

## What is Google Harness² ?

[![Image 1: Mehul Gupta](https://miro.medium.com/v2/resize:fill:32:32/1*vyvhK_h4zA05mg_Y-n2qBA.jpeg)](https://medium.com/@mehulgupta_7991?source=post_page---byline--7ccaf2604ddf-----------------------------------------)

11 min read

1 day ago

Press enter or click to view image in full size

![Image 2](https://miro.medium.com/v2/resize:fit:700/0*hwSQ5y8onEaGbuzp)

Photo by [Zulfugar Karimov](https://unsplash.com/@zulfugarkarimov?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Most discussions about improving AI agents eventually lead to the same question: should we use a better model?

If an agent fails to complete a complex task, the obvious solution is to switch to a more capable LLM, increase its context window, or fine-tune it on additional data.

> But there is another possibility. Maybe the model is already capable enough. Maybe the problem lies in how we use it.

Think about an AI coding agent. It might have access to a powerful model, a terminal, a browser, memory, and dozens of tools. Yet it can still fail because its system prompt is poorly designed, it calls the wrong tool, it forgets an earlier decision, or it follows a bad execution strategy.

### Google Research’s **Harness²** takes this problem seriously. Instead of focusing exclusively on improving the underlying model, it focuses on improving the system surrounding that model.

The interesting part is that Harness² can refine an agent’s operating setup using evidence from its own executions, without changing the model weights.

GitHub repository: [https://github.com/google-research/harness2](https://github.com/google-research/harness2)

## What exactly is Harness²?

First, we need to understand what a harness is.

An LLM by itself is primarily a model that takes input and produces output. An AI agent adds an execution layer around that model, allowing it to interact with tools, inspect files, execute code, delegate work, and perform multiple steps toward a goal. That surrounding infrastructure is the agent harness. A typical harness can contain:

*   A system prompt defining the agent’s role and behavior.
*   Guardrails that constrain its actions.
*   Memory that provides relevant information from earlier interactions.
*   Tool instructions describing when and how to use available tools.
*   Skills that provide reusable task-specific procedures.
*   Subagents that handle delegated work.
*   Scripts and plugins that extend the agent’s capabilities.

The model generates the decisions, but the harness influences how those decisions turn into actions.

> Harness² introduces a framework for recursively improving this setup. Its goal is to make agents more effective on tasks that were not necessarily anticipated when their original harness was designed.

This distinction matters. A system that works well on a predefined collection of tasks might perform poorly when the environment changes or a new type of problem appears. Harness² attempts to address that problem by refining the harness using execution evidence, then retaining useful lessons that can influence future tasks.

In simple terms, the model stays the same, but the way we deploy and operate it can improve.

## The core idea: Propose, Probe, Compose

> The central mechanism in Harness² is a process called **Propose–Probe–Compose**.

Rather than making one modification to an agent and hoping it works, the framework generates candidate changes, tests their effects, and uses the observed differences to construct a refined harness.

Let’s walk through what that means.

### 1. Propose: Generate alternative harnesses

Suppose an agent is asked to analyze a collection of financial documents and produce a structured report.

The baseline agent might struggle because its tool instructions are vague, it does not validate extracted figures, or it attempts to summarize documents before checking whether the relevant information is complete. Harness² can propose modifications to different components of the execution setup.

One candidate might improve tool-selection instructions. Another might introduce a validation procedure. A third might change how the agent organizes intermediate information.

The objective is not simply to generate a better-looking prompt. It is to explore alternative configurations of the system surrounding the model.

This is an important distinction because agent behavior depends on more than the wording of its system prompt. Tool availability, delegation rules, memory and execution procedures can all influence the final result.

### 2. Probe: Execute the candidates and observe what changes

Generating alternatives is relatively easy. Determining which alternatives actually help is harder.

Harness² probes candidate changes by running them on the same task and examining their execution behavior. Imagine two versions of an agent performing the same coding task.

*   The first version edits a file immediately and later discovers that it misunderstood the requirements.
*   The second version inspects the relevant files, checks dependencies and then makes the changes.

Both executions provide evidence about how the harness influences the agent’s behavior. The framework uses contrasts between executions to understand the effects of proposed modifications.

One particularly interesting aspect is that this refinement process does not require ground-truth feedback at every step. In other words, the framework can compare execution behavior without necessarily receiving an authoritative answer that tells it exactly what the correct solution should have been.

That does not mean it can reliably determine correctness without evaluation. It means the harness-refinement stage can use behavioral evidence even when direct task-level ground-truth feedback is unavailable.

This distinction is important for open-ended professional work, where there may be several valid ways to complete a task and a perfect reference answer may not exist.

### 3. Compose: Combine the evidence into a refined harness

After probing the alternatives, Harness² uses the observed differences to compose a refined harness. The idea is to identify useful behavioral changes rather than blindly accepting every proposed modification.

A change that improves execution on one task may be irrelevant to another. A modification might also improve one part of the workflow while introducing new problems elsewhere.

Composition provides a way to use evidence from multiple candidates when constructing the next version of the harness. The resulting setup can then be evaluated against the original configuration.

This gives us an iterative process:

Propose alternative configurations, probe their behavior, compose a refined configuration, and repeat when additional improvement is worth the cost.

The important point is that Harness² is optimizing the agent’s operating environment, not updating the neural network’s parameters.

## Two levels of recursion make Harness² interesting

The project does not stop at improving the harness for a single task. It connects two levels of recursion.

### Task-level recursion

> Task-level recursion focuses on the current task.

The framework explores changes to the execution harness, observes their effects and constructs refinements. This process can run in parallel or sequentially. Parallel recursion explores several candidate configurations at the same stage. Sequential recursion carries the results of one refinement step into the next.

Think of the difference this way: parallel recursion explores more alternatives, while sequential recursion develops a sequence of increasingly refined configurations.

The choice affects both the search strategy and the amount of computation required.

### Harnessing-level recursion

The second level concerns improvement across tasks. After a task has been completed and an improved harness has been adopted, Harness² retains evidence-supported lessons in a persistent improvement mechanism.

Those lessons can guide subsequent harness refinement.

For example, suppose an agent repeatedly performs better when it checks source files before editing them. If that behavior is supported by execution evidence, the framework can retain the lesson and use it to inform future improvements.

This is different from simply storing the previous conversation in a memory file. The objective is to retain lessons about how the agent should operate, so they can inform future harness configurations.

The framework organizes this process by domain. According to its experiment documentation, tasks within a domain run in order and can use earlier lessons, while different domains can run concurrently. This creates a feedback loop between current execution and future agent configuration.

> **One caveat:**retaining a lesson does not guarantee that it will generalize to every task. A behavior that helps with legal document analysis may not help with software engineering. The quality of the retained evidence and the evaluation process still matter.

## What can Harness² actually modify?

The repository exposes eight editable harness components.

> **System prompt:** Defines the agent’s role, objectives and general operating instructions.
> 
> 
> **Guardrails:** Specifies behavioral constraints and rules that shape execution.
> 
> 
> **Memory:** Supplies retained information that can influence decisions.
> 
> 
> **Tool guidance:** Describes how and when the agent should use available tools.
> 
> 
> **Subagents:** Controls aspects of delegation to other agents.
> 
> 
> **Skills:** Provides reusable procedures for particular kinds of work.
> 
> 
> **Scripts:** Supplies executable functionality that can support the agent’s workflow.
> 
> 
> **Plugins:** Extends the agent’s available capabilities through additional integrations.

These components collectively influence context construction, the interface between the model and its tools, delegation, and behavior inside the tool-execution loop.

## Get Mehul Gupta’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

That makes Harness² more interesting than a system that merely rewrites system prompts.

For instance, an agent might fail because it does not know which tool to call. Changing the prompt might help, but modifying tool guidance could be more appropriate. Another agent might need a repeatable validation procedure, in which case a skill or script could be a better intervention.

The framework’s broader design allows it to explore different parts of the agent’s configuration rather than assuming that every failure can be fixed with prompt engineering.

## Harness² does not train a new LLM

This is probably the most important technical distinction.

Traditional model fine-tuning changes the model’s learned parameters. Reinforcement learning can also optimize model behavior through training signals, depending on the training method. Harness² takes a different approach.

It keeps the underlying model weights fixed and focuses on improving the surrounding harness through iterative execution and refinement. That has some practical advantages.

*   First, teams do not need to train a new model every time they discover a weakness in an agent’s workflow.
*   Second, the method can potentially be applied to different models and execution environments, provided the required integrations are supported.
*   Third, changes to prompts, skills, scripts and tool instructions are generally easier to inspect than changes distributed across billions of model parameters.

However, this does not make the process free. Candidate generation, tool execution, repeated task runs and evaluation all consume resources. Model-backed experiments can incur API costs, and additional refinement does not guarantee better performance.

There is also a limit to what a harness can fix. If the underlying model cannot reason about a problem, lacks the necessary knowledge, or cannot reliably follow the required instructions, modifying its operating setup may not be enough. Harness optimization and model training solve related but different problems.

## Does it actually improve agent performance?

This is where the repository becomes particularly interesting. Harness² evaluates its approach across three professional-work benchmarks:

*   **JobBench:** Professional work tasks.
*   **LAB:** Legal work tasks.
*   **WorkBuddy-Bench:** Office, web and coding tasks.

The project reports results across four model–harness configurations, including GLM-5 and Gemini 3.5 Flash. According to the repository’s reported results, a single Harness² refinement step produces improvements of up to:

*   **11.5 points on WorkBuddy-Bench**
*   **4.5 points on JobBench**
*   **11.8 percentage points in LAB’s partial pass rate**

These are reported maximum gains across the evaluated configurations, not improvements guaranteed for every model or benchmark. The score scales also differ, so the numbers should not be treated as directly comparable measurements.

The project further reports that increasing the task-level recursion budget can produce additional gains.

The underlying idea is reasonable: if an agent’s performance depends partly on its configuration, systematically testing alternative configurations should sometimes outperform using the original setup unchanged. But there are some details worth examining before drawing broad conclusions.

Benchmark results depend on the baseline harness, task selection, evaluation procedure and amount of refinement. An improvement over one baseline does not automatically establish that the approach will work equally well in production.

The cost of generating and probing multiple candidates also matters. A configuration that achieves a higher score after many expensive executions may not be preferable to a simpler configuration that performs nearly as well.

For practical adoption, I would want to compare the baseline and refined harnesses using held-out tasks, report the cost per successful task, and check whether improvements persist across different task domains.

Still, the reported results provide a concrete reason to investigate harness optimization rather than assuming that a stronger model is always the answer.

## Running Harness² locally

The repository includes a demo and commands for running benchmark experiments.

The documented environment uses Linux, Python 3.12 and `uv`, a Python package and environment manager. The project also supports Python 3.13 according to its package configuration.

Clone the repository:

git clone https://github.com/google-research/harness2.git  
cd harness2
Create an environment and install the package:

uv venv --python 3.12 .venv  
source .venv/bin/activate uv pip install -e '.[render]'
You can then run the local demo:

harness2-demo --output runs/demo --k 2
The demo exercises both parallel and sequential recursion using deterministic editors and real Python executions. It does not require model credentials.

For model-backed experiments, you will need additional dependencies and credentials. The documented setup includes Node.js 20 or later, the Google Cloud CLI and the relevant benchmark dependencies. The default configuration uses model IDs and a Vertex AI project configured through an environment file.

Prepare the configuration:

cp .env.example .env
Edit `.env` with your project and model settings, then authenticate:

gcloud auth application-default login
For example, the repository documents the following workflow for a small LAB experiment:

harness2-setup lab harness2-check --bench labharness2 --bench lab --k 1 --mode parallel \  
 --only-domains antitrust-competition \  
 --max-tasks 1harness2-judge --bench lab --k 1 --mode parallelharness2-report --bench lab --k 1 --mode parallel
This sequence prepares the benchmark, checks the environment, runs the refinement process, evaluates the results and generates a report.

Start with a small task selection. Model-backed experiments can incur API costs, and increasing the recursion budget can increase the number of executions.

The `--k` argument controls the task-level recursion budget. With `--k 1`, the system performs one Propose–Probe–Compose step. Higher values allow more extensive refinement.

To explore the two strategies, replace `--mode parallel` with `--mode sequential`. Parallel mode explores a pool of alternatives, while sequential mode carries the refined configuration and accumulated evidence forward through successive steps.

The repository also supports a Codex executor through the `--substrate cx` option, alongside its default OpenCode executor.

The full installation and benchmark instructions are available in the [Harness² README](https://github.com/google-research/harness2) and [experiment guide](https://github.com/google-research/harness2/blob/main/docs/EXPERIMENTS.md).

## One important security warning

Harness²’s documentation explicitly warns that executor network access is unrestricted and that Codex runs with its sandbox disabled in the documented configuration.

This matters because public benchmark repositories may expose task rubrics, evaluation criteria or other information that an agent could retrieve during execution.

If the goal is to measure generalization, allowing an agent to access the expected answers or grading criteria can compromise the experiment.

The project recommends configuring network restrictions before evaluation, including restrictions on relevant GitHub and Hugging Face hosts.

This is not just a benchmark-specific concern. Any autonomous agent that can execute commands, access files and reach the internet introduces a security boundary that needs to be managed carefully.

I would not run this setup against sensitive production systems without first reviewing its execution permissions, network access, credential handling and isolation model.

## Is Harness² the future of AI agents?

I think the most interesting aspect of Harness² is the problem it chooses to solve.

The AI industry has spent considerable effort making models larger, training them on more data and improving their reasoning capabilities. Meanwhile, production agents often fail for reasons that have little to do with raw model intelligence.

They might call tools incorrectly, skip validation, lose track of intermediate results or follow an unsuitable workflow.

These are system-level problems, and they deserve system-level solutions.

Harness² provides a structured way to investigate whether an agent can perform better by changing the environment in which the model operates. It combines task-specific refinement with the retention of lessons that may help future tasks.

There are limitations. Candidate execution costs money, improvements may not generalize, and an effective harness cannot compensate for every weakness in an underlying model. The reported benchmark gains also need to be interpreted in the context of their specific experimental setups. But the direction is worth paying attention to.

Imagine a future in which an AI coding agent does not merely complete a task and move on. It examines what happened, tests alternative execution strategies, retains useful evidence and starts the next related task with a better operating procedure.

That is the broader idea behind Harness².

**The next improvement in AI agents might not always require a smarter model. Sometimes, it might require a better way of using the model we already have.**

Repository:

_Disclosure: Harness² is a Google Research repository, but its README states that it is not an officially supported Google product. It is released under the Apache 2.0 license, subject to the separate licensing terms of bundled third-party components and datasets._
