---
title: "stanford-oval/storm — STORM & Co-STORM"
type: repo
year: 2024
category: agents
raw_path: raw/repos/stanford-oval-storm.md
raw_filename: "stanford-oval-storm.md"
source_collection: external
org: "stanford-oval"
repo: "storm"
url: "https://github.com/stanford-oval/storm"
license: "MIT (코드) · FreshWiki 데이터셋은 CC BY-SA"
tags: [storm, co-storm, multi-agent, question-asking, retrieval, dspy, litellm, wikipedia-generation, knowledge-curation, stanford-oval]
---

> **비고**: 이 파일은 `WebFetch`로 취득한 README 캡처다. WebFetch가 소형 모델로 페이지를 요약·발췌하므로 완전한 verbatim 전문이 아니라 핵심 섹션을 충실히 갈무리한 것이다. 원본은 https://github.com/stanford-oval/storm 참조.

# STORM: Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking

## Overview

STORM is an LLM system that generates Wikipedia-style articles from scratch using internet search. The project includes two main approaches:

- **STORM** breaks article generation into two phases: pre-writing (research + outline) and writing (full article with citations).
- **Co-STORM** enhances this with human-AI collaboration, featuring multiple LLM agents and a moderator that work together while maintaining a dynamic mind map to organize information hierarchically.

Research preview: http://storm.genie.stanford.edu

## How STORM works — pipeline

STORM breaks article generation into two stages:

1. **Pre-writing stage**: The system conducts Internet-based research to collect references and generates an outline.
2. **Writing stage**: The system uses the outline and references to generate the full-length article with citations.

Two strategies for improved questions:
- **Perspective-Guided Question Asking**: STORM discovers different perspectives by surveying existing articles from similar topics and uses them to control the question-asking process.
- **Simulated Conversation**: STORM simulates a conversation between a Wikipedia writer and a topic expert grounded in Internet sources.

> "STORM identifies the core of automating the research process as automatically coming up with good questions to ask."

## How Co-STORM works

Co-STORM introduces collaborative discourse with three participant types:
- **Co-STORM LLM experts** that generate answers grounded on external sources.
- **Moderator** agent generating thought-provoking questions.
- **Human user** who observes or actively steers discussion.

Co-STORM maintains "a dynamic updated mind map, which organizes collected information into a hierarchical concept structure."

## Installation

```
pip install knowledge-storm
```

Or from source:
```
git clone https://github.com/stanford-oval/storm.git
cd storm
conda create -n storm python=3.11
conda activate storm
pip install -r requirements.txt
```

## STORM usage

```python
from knowledge_storm import STORMWikiRunnerArguments, STORMWikiRunner, STORMWikiLMConfigs
from knowledge_storm.lm import LitellmModel
from knowledge_storm.rm import YouRM

lm_configs = STORMWikiLMConfigs()
gpt_35 = LitellmModel(model='gpt-3.5-turbo', max_tokens=500, **openai_kwargs)
gpt_4 = LitellmModel(model='gpt-4o', max_tokens=3000, **openai_kwargs)
lm_configs.set_conv_simulator_lm(gpt_35)
lm_configs.set_question_asker_lm(gpt_35)
lm_configs.set_outline_gen_lm(gpt_4)
lm_configs.set_article_gen_lm(gpt_4)
lm_configs.set_article_polish_lm(gpt_4)
engine_args = STORMWikiRunnerArguments(...)
rm = YouRM(ydc_api_key=os.getenv('YDC_API_KEY'), k=engine_args.search_top_k)
runner = STORMWikiRunner(engine_args, lm_configs, rm)

topic = input('Topic: ')
runner.run(
    topic=topic,
    do_research=True,
    do_generate_outline=True,
    do_generate_article=True,
    do_polish_article=True,
)
runner.post_run()
runner.summary()
```

## Co-STORM usage

```python
from knowledge_storm.collaborative_storm.engine import CollaborativeStormLMConfigs, RunnerArgument, CoStormRunner
from knowledge_storm.lm import LitellmModel
from knowledge_storm.rm import BingSearch

lm_config = CollaborativeStormLMConfigs()
question_answering_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=1000, **openai_kwargs)
discourse_manage_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=500, **openai_kwargs)
utterance_polishing_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=2000, **openai_kwargs)
warmstart_outline_gen_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=500, **openai_kwargs)
question_asking_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=300, **openai_kwargs)
knowledge_base_lm = LitellmModel(model=gpt_4o_model_name, max_tokens=1000, **openai_kwargs)

lm_config.set_question_answering_lm(question_answering_lm)
lm_config.set_discourse_manage_lm(discourse_manage_lm)
lm_config.set_utterance_polishing_lm(utterance_polishing_lm)
lm_config.set_warmstart_outline_gen_lm(warmstart_outline_gen_lm)
lm_config.set_question_asking_lm(question_asking_lm)
lm_config.set_knowledge_base_lm(knowledge_base_lm)

topic = input('Topic: ')
runner_argument = RunnerArgument(topic=topic, ...)
logging_wrapper = LoggingWrapper(lm_config)
bing_rm = BingSearch(bing_search_api_key=os.environ.get("BING_SEARCH_API_KEY"),
                     k=runner_argument.retrieve_top_k)
costorm_runner = CoStormRunner(lm_config=lm_config,
                               runner_argument=runner_argument,
                               logging_wrapper=logging_wrapper,
                               rm=bing_rm)

costorm_runner.warm_start()
conv_turn = costorm_runner.step()
costorm_runner.step(user_utterance="YOUR UTTERANCE HERE")
costorm_runner.knowledge_base.reorganize()
article = costorm_runner.generate_report()
print(article)
```

## Supported models & retrievers

- **Language Models**: All language models supported by litellm (https://docs.litellm.ai/docs/providers).
- **Embedding Models**: All embedding models supported by litellm.
- **Retrieval Modules**: YouRM, BingSearch, VectorRM, SerperRM, BraveRM, SearXNG, DuckDuckGoSearchRM, TavilySearchRM, GoogleSearch, and AzureAISearch.

Both implementations use a modular architecture built on **DSPy** and support various language models through **LiteLLM** integration.

## Customization

**STORM** modules are customizable: Knowledge Curation Module, Outline Generation Module, Article Generation Module, and Article Polishing Module. Interfaces are defined in `knowledge_storm/interface.py` with implementations in `knowledge_storm/storm_wiki/modules/*`.

**Co-STORM** allows customization of LLM agent policies and turn policy management through implementations in `knowledge_storm/collaborative_storm/modules/co_storm_agents.py` and `knowledge_storm/collaborative_storm/engine.py`.

## Datasets

- **FreshWiki**: A collection of 100 high-quality Wikipedia articles focusing on the most-edited pages from February 2022 to September 2023. https://huggingface.co/datasets/EchoShao8899/FreshWiki
- **WildSeek**: Each data point is a pair comprising a topic and the user's goal for conducting deep search on the topic. https://huggingface.co/datasets/YuchengJiang/WildSeek

## Papers

- **STORM** (NAACL 2024, June 2024): "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models."
- **Co-STORM** (EMNLP 2024, November 2024): "Into the Unknown Unknowns: Engaged Human Learning through Participation in Language Model Agent Conversations."

## License

Repository code: MIT. FreshWiki dataset (sourced from Wikipedia): Creative Commons Attribution-ShareAlike (CC BY-SA).
