---
title: "OpenViking: The Context Database for AI Agents"
type: repo
year: 2026
category: database
raw_path: raw/repos/volcengine-openviking.md
raw_filename: "volcengine-openviking.md"
source_collection: external
org: "volcengine"
repo: "OpenViking"
url: "https://github.com/volcengine/OpenViking"
license: "AGPL-3.0 (main project); Apache-2.0 (crates/ov_cli, examples); third_party는 각자 원 라이선스"
tags: [context-database, agent-memory, virtual-filesystem, directory-retrieval, vector-database, mcp, rag]
figures:
  - id: fig01
    label: Benchmark results chart
    kind: figure
    file: assets/volcengine-openviking/fig01.svg
    raw: https://raw.githubusercontent.com/volcengine/OpenViking/main/docs/images/benchmark-light.svg
    caption: "LoCoMo와 tau2-bench 벤치마크 결과. OpenClaw, Hermes, Claude Code의 native memory 대비 OpenViking 적용 시 정확도가 24~57%에서 80~83%로 상승했다"
    strategy: manual
    curated: false
  - id: fig02
    label: OpenViking Studio screenshot
    kind: figure
    file: assets/volcengine-openviking/fig02.png
    raw: https://raw.githubusercontent.com/volcengine/OpenViking/main/docs/images/studio-playground.png
    caption: "OpenViking Studio의 viking:// 브라우징과 semantic search UI"
    strategy: manual
    curated: false
---

> 수집 메모: 사용자가 명시적으로 지정한 두 URL을 그대로 받아 저장했다 (CLAUDE.md rule #1의 자료 수집 예외). ① GitHub 저장소 README (`raw.githubusercontent.com/volcengine/OpenViking/main/README.md`, WebFetch로 취득 — repos Step 1 승인 경로), ② 공식 문서 사이트의 Getting Started > Introduction 페이지 (`docs.openviking.ai/en/getting-started/01-introduction`, WebFetch로 원문 전문 취득). 두 자료 모두 OpenViking이라는 동일 프로젝트를 설명하는 1차 공식 자료이고, README가 아키텍처·벤치마크·연구 논문을 압축 소개하는 반면 문서 사이트 Introduction은 설계 동기(Why OpenViking)와 5대 핵심 기능을 더 풀어서 설명하므로, 하나의 raw 파일에 순서대로 이어 붙였다. 본문은 요약, 번역, 윤문하지 않았다. 수집 시각 2026-09-14. 라이선스는 컴포넌트별로 다르다(Main: AGPLv3, crates/ov_cli·examples: Apache-2.0).

---

## 1. GitHub README (`github.com/volcengine/OpenViking`)

<div align="center">

<a href="https://openviking.ai/" target="_blank">
  <picture>
    <img alt="OpenViking" src="docs/images/ov-logo.png" width="200px" height="auto">
  </picture>
</a>

### OpenViking: The Context Database for AI Agents

English / [中文](README_CN.md) / [日本語](README_JA.md)

<a href="https://www.openviking.ai">Website</a> · <a href="https://openviking.ai/studio">Live Demo</a> · <a href="https://github.com/volcengine/OpenViking">GitHub</a> · <a href="https://github.com/volcengine/OpenViking/issues">Issues</a> · <a href="https://docs.openviking.ai/">Docs</a>

</div>

***

### What is OpenViking

OpenViking is an open-source context database for AI agents. It gives agents a place to store knowledge, remember users, and reuse experience across sessions.

OpenViking organizes context as a virtual filesystem under `viking://`. Agents can operate on it like files: use `ls`, `tree`, `read`, and `write` to browse directories, read, create, and edit content, or search within a directory. Directory summaries support on-demand loading.

[Try OpenViking Studio](https://openviking.ai/studio) in your browser, no installation required. [Self-host Web Studio](web-studio/README.md).

### Why OpenViking

- **One filesystem for all context.** Resources hold documents and code; memories retain user preferences and experience; skills define how to perform tasks. Each has a `viking://` URI for browsing and retrieval. → [Viking URI](https://docs.openviking.ai/en/concepts/04-viking-uri) · [Context types](https://docs.openviking.ai/en/concepts/02-context-types)
- **Load only the context you need.** Directory abstracts (L0) and overviews (L1) help agents decide when to read full content (L2). → [Context layers](https://docs.openviking.ai/en/concepts/03-context-layers)
- **Search within the directory structure.** Vector search finds candidate directories, then explores their contents. `find` runs a query directly; `search` can use session context to plan retrieval. → [Retrieval](https://docs.openviking.ai/en/concepts/07-retrieval)
- **Turn sessions into memory.** Committing a session archives the conversation and starts background extraction. Memory policies control what is retained; candidates are compared with existing memories for creation, merging, or skipping. With VikingBot enabled, `ov compile` uses a skill to organize source material into a wiki, knowledge graph, or report. → [Sessions](https://docs.openviking.ai/en/concepts/08-session) · [Context compilation](https://docs.openviking.ai/en/context-compilation/01-overview)

[Architecture](https://docs.openviking.ai/en/concepts/01-architecture) · [Design rationale](https://blog.openviking.ai/post/openviking-context-database/)

```
viking://
├── resources/              # Resources: project docs, repos, web pages, etc.
│   └── my_project/
│       ├── docs/
│       │   ├── api/
│       │   └── tutorials/
│       └── src/
└── user/
    └── {user_id}/
        ├── memories/
        │   └── preferences/
        │       ├── writing_style
        │       └── coding_habits
        ├── resources/
        │   └── private_project/
        ├── skills/
        │   ├── search_code
        │   └── analyze_data
        └── peers/
            └── web-visitor-alice/
```

The three loading tiers:

- **L0 (Abstract)**: a one-sentence summary for quick relevance checks.
- **L1 (Overview)**: core information and usage scenarios for planning.
- **L2 (Details)**: the full original data, read only when needed.

Semantically processed directories carry L0/L1 summaries, so agents can judge relevance before reading full files:

```
viking://resources/my_project/
├── .abstract.md           # L0: quick relevance check
├── .overview.md           # L1: structure and key points
└── docs/
    ├── .abstract.md
    ├── .overview.md
    └── api/
        ├── auth.md         # L2: full content, loaded on demand
        └── endpoints.md
```

### Proof it works

OpenViking 0.3.22 has been evaluated on long-conversation user memory (LoCoMo) and multi-turn agent tasks (tau2-bench). Full results and setup details, including knowledge-base QA, are in the [benchmark report](https://blog.openviking.ai/post/openviking-benchmark-results/); reproduction scripts live in [./benchmark](./benchmark).

The memory evaluation used [Doubao 2.0 Pro](https://console.volcengine.com/ark/region:cn-beijing/model/detail?Id=doubao-seed-2-0-pro) as the VLM and [Doubao-embedding-vision-251215](https://console.volcengine.com/ark/region:cn-beijing/model/detail?Id=doubao-embedding-vision) as the embedding model.

Benchmark results. LoCoMo accuracy: OpenClaw 24.20% native vs 82.08% with OpenViking; Hermes 33.38% vs 82.86%; Claude Code 57.21% vs 80.32%. tau2-bench task success: Retail 70.94% vs 77.81%; Airline 54.38% vs 66.25%.

- **User memory (LoCoMo)**: with OpenViking, all three agent integrations land at 80–83% accuracy — up from 24–57% on their native memory — while input tokens drop by 34.3–91.0% and query latency by 58.45–66.10%.
- **Agent experience (tau2-bench)**: experience memory lifts task success by +6.87pp (retail) and +11.87pp (airline) over the same LLM without memory.

### Quick start

Requires Python 3.10+ and access to an embedding model and a VLM (cloud or local).

```bash
pip install openviking --upgrade
openviking-server init      # configure providers and models
openviking-server doctor    # check configuration and connectivity
openviking-server           # start the server
```

`init` writes `~/.openviking/ov.conf`. Supported options include Volcengine, OpenAI, Codex OAuth, Kimi, GLM, and local Ollama. See the [configuration guide](https://docs.openviking.ai/en/guides/01-configuration) for provider setup and the [quick start docs](https://docs.openviking.ai/en/getting-started/02-quickstart) for platform instructions.

The package includes the `ov` CLI. In another terminal, import a repository and search it:

```bash
ov status
ov add-resource https://github.com/volcengine/OpenViking
# Replace TASK_ID with the returned task_id; repeat until status is completed
ov task status TASK_ID
ov ls viking://resources/
ov tree viking://resources/volcengine -L 2
ov find "what is openviking"
ov grep "openviking" --uri viking://resources/volcengine/OpenViking/docs/en
```

`ov find` returns matching context with URIs you can inspect. For client configuration (`ov config`), standalone CLI installs, and index maintenance, see [CLI setup](https://docs.openviking.ai/en/getting-started/05-cli-setup).

Build your own integration with the [Python](sdk/python/README.md), [Go](sdk/go/README.md), or [TypeScript](sdk/typescript/README.md) SDK, or the [HTTP API](https://docs.openviking.ai/en/api/01-overview).

### Use it with your agent

Connect your agent to OpenViking for cross-session memory. Choose a native integration for automatic recall and session capture, or use MCP to give your agent memory and context tools.

Native integrations: Claude (Hooks + MCP), Codex (Hooks + MCP), Cursor (Hooks + MCP), TRAE (Hooks + MCP), OpenClaw (Context engine), Hermes (Built-in), OpenCode (Plugin + MCP), pi (Native extension), DeerFlow (Plugin + MCP), DSH (Plugin + MCP), Doubao Work (Connector), LangChain (Tools + store).

General integrations: Agent Plugins 1.0, MCP clients.

For setup instructions and integration details, see [Integrations](https://openviking.ai/integrations).

### Desktop App (Beta)

The desktop app is a console for macOS and Windows x64 (beta). It configures supported local agent integrations, inspects recall and capture events in sessions, and syncs local memories and skills to OpenViking.

### VikingBot

VikingBot is an AI agent framework built on top of OpenViking:

```bash
pip install "openviking[bot]"
openviking-server --with-bot
ov chat   # in another terminal
```

The official Docker image bundles VikingBot and starts it by default alongside the server and console UI. Details: [VikingBot guide](https://docs.openviking.ai/en/guides/17-vikingbot).

### Deploy in production

Run the open-source server in your own environment under [AGPLv3](LICENSE). It requires no activation key. Start with [server setup](https://docs.openviking.ai/en/getting-started/03-quickstart-server) or the [Docker and deployment guide](https://docs.openviking.ai/en/guides/03-deployment).

The server supports [accounts and user isolation](https://docs.openviking.ai/en/concepts/11-multi-tenant) and opt-in [resource ACLs](https://docs.openviking.ai/en/concepts/15-acl). Configure [authentication](https://docs.openviking.ai/en/guides/04-authentication) before exposing it beyond localhost.

### Commercial editions

**☁️ Managed SaaS**: [Volcano Engine](https://www.volcengine.com/product/openviking-service) hosts and operates OpenViking. Personal and Enterprise plans cover individual and team use, with migration tooling for open-source deployments. Hosting outside China is planned on [BytePlus](https://www.byteplus.com).

**🏢 Self-Managed**: Deploy in your own cloud account / VPC (BYOC) or an offline environment. This edition adds distributed deployment and official support, activated by a license key.

### Research

**Memory that evolves with your agent.** VikingMem develops an event-driven approach to extracting, updating, and consolidating long-term memory, giving stateful agents a way to retain useful experience as interactions accumulate. OpenViking open-sources a subset of these core capabilities.

> **VikingMem: A Memory Base Management System for Stateful LLM-based Applications**
> Jiajie Fu, Junwen Chen, Mengzhao Wang, Aoxiang He, Maojia Sheng, Xiangyu Ke, Yifan Zhu, and Yunjun Gao.
> arXiv:2605.29640, 2026. Presented at VLDB 2026 in September.
> [Read the paper on arXiv](https://arxiv.org/abs/2605.29640) · [Read PDF](https://arxiv.org/pdf/2605.29640)

**Directory structure as retrieval context.** This paper provides the formal foundations, index design, and experimental evidence behind OpenViking's directory-aware retrieval. It defines directory-scoped query and maintenance operations and introduces TrieHI, which OpenViking integrates to resolve directory scopes before vector ranking. This connects the filesystem paradigm to retrieval: agents can search a project or memory subtree, retain its surrounding context, and reorganize it as knowledge evolves.

> **Directory-Aware Query and Maintenance in Vector Databases**
> Mengzhao Wang, Zheng Gong, Jingpei Hu, Jiajie Fu, Maojia Sheng, Junwen Chen, and Yifan Zhu.
> arXiv:2606.16903, 2026. Accepted by ICDE.
> [Read the paper on arXiv](https://arxiv.org/abs/2606.16903) · [Read PDF](https://arxiv.org/pdf/2606.16903)

**Retrieve the evidence you need with fewer tokens.** VikingRAG combines semantic search with document structure, exposing relevant directory segments as evidence gaps arise. Its core mechanisms are integrated into OpenViking. The paper further explores reusing retrieval traces and escalating to multi-round retrieval only when needed, reducing repeated exploration while preserving answer quality.

> **VikingRAG: Accurate and Token-efficient Retrieval-augmented Generation over Structured Documents**
> Peiyuan Gao, Gaoyuan Zhang, Haojie Qin, Yahui Sun, Qianyi Zhang, Yunhao Zhang, Zeyu Wang, and Wei Lu.
> arXiv:2609.11390, 2026. Submitted.
> [Read the paper on arXiv](https://arxiv.org/abs/2609.11390) · [Read PDF](https://arxiv.org/pdf/2609.11390)

### Partner Projects

- [deer-flow](https://github.com/bytedance/deer-flow) - Open-source long-horizon SuperAgent harness
- [NoKV](https://github.com/NoKV-Lab/NoKV) - AI native distributed file system
- [loopx](https://github.com/huangruiteng/loopx) - Lightweight loop engineering state kernel
- [Hermes Agent](https://github.com/NousResearch/hermes-agent) - The agent that grows with you

### Community & Contributing

- **Docs**: [docs.openviking.ai](https://docs.openviking.ai/) · [FAQ](https://docs.openviking.ai/en/faq/faq)
- **Blog**: [blog.openviking.ai](https://blog.openviking.ai/)
- **Team**: [About us](https://docs.openviking.ai/en/about/01-about-us)
- **Contribute**: bug fixes and new features are both welcome — see [CONTRIBUTING.md](CONTRIBUTING.md)

### Security and privacy

For vulnerability reporting and supported versions, see [SECURITY.md](SECURITY.md)

### License

The OpenViking project uses different licenses for different components:

- **Main Project**: AGPLv3 - see the [LICENSE](./LICENSE) file for details
- **crates/ov_cli**: Apache 2.0 - see the [LICENSE](./crates/LICENSE) for details
- **examples**: Apache 2.0 - see the [LICENSE](./examples/LICENSE) for details
- **third_party**: Respective original licenses of third-party projects

---

## 2. 공식 문서 (`docs.openviking.ai/en/getting-started/01-introduction`)

### Introduction

**OpenViking** is an open-source context database designed specifically for AI Agents. OpenViking unifies the management of context (memory, resources, and skills) that Agents need through a **file system paradigm**, enabling **hierarchical context delivery** and **self-iteration**. The ultimate goal is to lower the barrier for Agent development, allowing developers to focus on business innovation rather than underlying context management.

### Why OpenViking

In the AI era, data is abundant, but high-quality context is scarce. When building AI Agents, developers often face these challenges:

* **Context Fragmentation**: Memory in code, resources in vector databases, skills scattered everywhere — difficult to manage uniformly
* **Context Explosion**: Long-running Agent tasks generate context with each execution; simple truncation or compression leads to information loss
* **Poor Retrieval Quality**: Traditional RAG uses flat storage, lacking global perspective and struggling to understand complete context
* **Context Opacity**: Traditional RAG's implicit retrieval pipeline is like a black box, making debugging difficult
* **Limited Memory Iteration**: Current memory systems only record user memories, lacking Agent-related task memories

OpenViking is designed to solve these pain points.

### Core Features

#### 1. File System Management Paradigm

Moving away from traditional flat database thinking, all context is organized as a virtual file system. Agents no longer rely solely on vector search to find data — they can locate and browse data through deterministic paths and standard file system commands.

**Unified URI Identification**: Each context is assigned a unique `viking://` URI, enabling precise location and access to resources stored in different locations.

```
viking://
├── resources/              # Resources: project docs, code repos, web pages
│   └── my_project/
├── user/
│   └── {user_id}/          # Private context for the current user
│       ├── memories/       # User memories
│       ├── resources/      # Private user resources
│       ├── skills/         # Private user skills (default)
│       ├── peers/
│       │   └── {peer_id}/
│       │       ├── memories/
│       │       └── resources/
│       └── sessions/
└── agent/
    └── skills/             # Optional account-wide shared skills
```

**Three Context Types**:

| Type | Purpose | Lifecycle |
|------|---------|-----------|
| **Resource** | Knowledge and rules (docs, code, FAQ) | Long-term, relatively static |
| **Memory** | Agent's cognition (user preferences, learned experiences) | Long-term, dynamically updated |
| **Skill** | Callable capabilities (tools, MCP) | Long-term, static |

**Unix-like API**: Familiar command-style operations

```python
client.find(query="user authentication")       # Semantic search
client.ls(uri="viking://resources/")            # List directory
client.read(uri="viking://resources/doc")       # Read content
client.abstract(uri="viking://...")             # Get L0 abstract
client.overview(uri="viking://...")             # Get L1 overview
```

#### 2. Hierarchical Context On-Demand Loading

Stuffing massive context into prompts all at once is not only expensive but also risks exceeding model windows and introducing noise. OpenViking automatically processes context into three levels upon ingestion:

| Level | Name | Default body limit | Purpose |
|-------|------|-------------------|---------|
| **L0** | Abstract | 256 characters | Vector search, quick filtering |
| **L1** | Overview | 4000 characters | Rerank, content navigation |
| **L2** | Detail | No uniform limit | Full content, on-demand loading |

```
viking://resources/my_project/
├── .abstract.md               # L0 layer: abstract
├── .overview.md               # L1 layer: overview
├── docs/
│   ├── .abstract.md          # Semantically processed directories commonly have L0/L1
│   ├── .overview.md
│   └── api.md                # L2 layer: full content
└── src/
```

L0/L1 are directory sidecars, not per-file sidecars, and they are not guaranteed to coexist.

#### 3. Directory Recursive Retrieval

Single vector retrieval struggles with complex query intents. OpenViking implements an innovative **directory recursive retrieval strategy**:

1. **Intent Analysis**: Generate multiple retrieval conditions through intent analysis
2. **Initial Positioning**: Use vector retrieval to quickly locate high-scoring directories
3. **Fine Exploration**: Perform secondary retrieval within directories, updating candidate sets with high-scoring results
4. **Recursive Descent**: If subdirectories exist, recursively repeat the secondary retrieval
5. **Result Aggregation**: Return the most relevant context

This "lock onto high-scoring directories first, then explore content in detail" strategy not only finds semantically matching fragments but also understands the complete context of information.

#### 4. Visualized Retrieval Traces

OpenViking's organization uses a hierarchical virtual file system structure, with all context integrated in a unified format and each entry corresponding to a unique URI, breaking away from traditional flat black-box management.

The retrieval process uses directory recursive strategy, with complete traces of directory browsing and file positioning preserved for each retrieval, enabling clear observation of problem sources and guiding retrieval logic optimization.

#### 5. Automatic Session Management

OpenViking includes a memory self-iteration loop. After a session is committed, the system asynchronously analyzes task outcomes and user feedback, then updates memory for the current user or Peer according to the active memory policy.

**Built-in memory types**:

| Purpose | Built-in types | Description |
|---------|----------------|-------------|
| **User and environment understanding** | `profile`, `preferences`, `entities`, `events` | User profile, preferences, entities, and events |
| **Assistant identity and continuity** | `identity`, `soul` | Assistant identity, boundaries, style, and continuity |
| **Task execution and learning** | `cases`, `trajectories`, `experiences`, `tools`, `skills` | Trainable cases, execution traces, reusable experience, and tool/skill usage knowledge |

OpenViking lets applications extend or adjust memory types for their own needs.

Enabling Agents to become "smarter with use" through world interaction, achieving self-evolution.

### Next Steps

* [Quick Start](./02-quickstart) - Get started in 5 minutes
* [Architecture Overview](./../concepts/01-architecture) - Understand system design
* [Context Types](./../concepts/02-context-types) - Deep dive into three context types
* [Retrieval Mechanism](./../concepts/07-retrieval) - Learn about retrieval flow

---

*Released under the Apache-2.0 License. Copyright OpenViking contributors*
