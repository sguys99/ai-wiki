# AI Wiki Index

이 파일은 `wiki/` 안의 모든 페이지를 카탈로그화한 색인이다. 자료가 추가될 때마다 해당 카테고리 섹션에 한 줄씩 추가한다.

> **참조 규칙**: 모든 응답은 `sources/`와 `wiki/`에 실재하는 자료만 인용한다. 자세한 운영 규칙은 [`CLAUDE.md`](./CLAUDE.md)의 **The Four Rules**를 참고한다.

**카탈로그 한 줄 형식 (Entry format):**

```
- [[category/stem|표시 이름]] — 한 줄 설명 (year, type)
```

예: `- [[llms/vaswani-2017-attention-is-all-you-need|Attention Is All You Need]] — Transformer 아키텍처 (2017, paper)`

---

## Database (database)

Vector DB, RAG 인프라, embedding store (pgvector, Qdrant, Weaviate 등).

- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — KG entity·relation을 key-value로 직렬화하고 dual-level keyword (low·high) retrieval로 GraphRAG 대비 토큰·API 호출 대폭 절감 (2025, paper)
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — GMM-BIC로 hierarchical KG 구축하면서 abstract 노드 간 relation까지 합성, LCA 기반 retrieval로 redundancy 46% 감소 (2026, paper)
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — LightRAG 후속작; cross-modal KG + text-based KG dual-graph와 modality-aware hybrid retrieval로 텍스트·이미지·표·수식 통합 multimodal RAG, 100+ 페이지 장문에서 격차 13점+ (2025, paper)
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — paper의 reference implementation. MinerU/Docling/PaddleOCR pluggable parser + Image/Table/Equation/Generic ModalProcessor + 3-mode 통합 질의 (aquery / aquery_with_multimodal / aquery_vlm_enhanced), MIT, PyPI `raganything` (2025, repo)
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글]] — PyTorchKR 9bow(박정환) 작성; RAG-Anything의 dual-graph · modality-aware retrieval · DocBench/MMLongBench 결과 · `pip install raganything` 사용법까지 입문 정리, 단 GPT 정리본 디스클레이머 있음 (2026, article)
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG (LightRAG · LeanRAG)]] — DSBA 김도윤 박사과정 세미나 + 발표 슬라이드; LightRAG의 dual-level keyword retrieval과 LeanRAG의 hierarchical KG + LCA retrieval 비교·비판 (2026, video)
- [[database/vectifyai-pageindex|VectifyAI/PageIndex (repo)]] — vectorless · reasoning-based RAG의 reference implementation. PDF/MD를 hierarchical TOC tree로 변환하고 `get_document` · `get_document_structure` · `get_page_content` 3개 함수로 agent가 tree search retrieval, LiteLLM multi-provider, MIT, FinanceBench 98.7% (Mafin 2.5) (2025, repo)
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction (DCI)]] — embedding/index 없이 agent가 `grep`·`bash`로 raw corpus 직접 검색. BrowseComp-Plus 80.0% (vs Qwen3-Embed-8B 69.0%, cost −29.4%), 다중 홉 QA +30.7pp, IR ranking +21.5pp. "coverage가 아닌 localization"으로 이기는 mechanism + retrieval interface resolution 개념 (2026, paper)
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal|Gemini Embedding 2]] — Google DeepMind. Gemini를 bidirectional attention으로 fine-tune한 native multimodal embedder. NCE+MRL(768/1,536/3,072)·PFT→FT→Model Soup·task string drop. MTEB Multilingual 69.9·MTEB Code 84.0·MSCOCO T→I 62.9·Vatex 68.8. **Native audio가 ASR cascade를 cross-lingual에서 +5.01 mrr@10**으로 능가, 천문/미생물/요리 zero-shot SOTA. ViDoRe V2(64.9)만 Voyage-3.5-mm(65.5)에 소폭 패배 (2026, paper)

## LLMs (llms)

모델 아키텍처, pre-training, fine-tuning, foundation model 논문.

- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient|UnUnlearning]] — ICL로 인해 unlearning(exact 포함)만으로는 LLM content regulation에 불충분함을 논증 (2024, paper)

## Agents (agents)

Agentic 시스템, tool use, planning, LangGraph 등.

- [[agents/qiao-2026-memory-intelligence-agent|Memory Intelligence Agent (MIA)]] — ECNU·Shanghai Innovation Institute. Manager-Planner-Executor 3-agent decoupling + non-parametric workflow memory ↔ parametric Planner memory bidirectional loop + GRPO two-stage alternating RL + online TTL + Reviewer-AC unsupervised judge. 7B Executor로 GPT-5.4/Gemini-3-Flash 추월(LiveVQA +43%), Memento 대비 +5.5p(multimodal)·+7.5p(text). "메모리는 Executor가 아닌 Planner에 주입해야 한다"는 ablation 결과 (2026, paper)
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (Team Attention)]] — 이호연(Team Attention) 2026-04-07 강의 deck(54p). Prompt → Context → Harness 3단계 진화 모델, 6축 순환(구조 → 맥락 → 계획 → 실행 → 검증 → 개선) + Claude Code 도구 매핑(CLAUDE.md 3-tier 상속, .claude/rules/ glob 조건부 로드, Progressive Disclosure, Single/Subagent/Team Mode, Ralph Loop, Generator/Evaluator 분리). 사례 데이터: LangChain 같은 모델·하네스만 변경 TerminalBench +14%p, Anthropic 싱글 $9 실패 vs 3에이전트 $200 성공, Stripe 1,000 PR/주 무인 머지. *"모델 교체 5%보다 하네스 설계 15% 개선이 현실적"* (2026, article)

## Evaluations (evaluations)

평가 프레임워크(RAGAS, Braintrust), benchmark.

_(아직 자료가 없습니다)_

## Applications (applications)

RAG 응용, 도메인 적용 사례, 제품 패턴.

- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]] — Y Combinator CEO Garry Tan의 markdown-first AI 에이전트 메모리 시스템. git markdown=source of truth + Postgres/pgvector hybrid retrieval + zero-LLM typed-edge KG + 43 skill pack + Minions(durable job queue) + nightly dream cycle. BrainBench P@5 49.1%/R@5 97.9%, graph 끄면 −31.4pp, MIT (2026, repo)
- [[applications/gajjar-2026-gbrain-vs-computer-memory|GBrain vs DevRev Computer Memory]] — DevRev Tech Lead Arth Gajjar의 비교 에세이. 개인 GBrain ↔ 엔터프라이즈 Computer Memory(AirSync 50+ 시스템·SOC 2)의 3가지 격차와 공통 thesis "memory that compounds beats memory that just retrieves" (2026, article)
- [[applications/vectorize-2026-gbrain-review-honest-assessment|GBrain Honest Assessment (Vectorize)]] — Vectorize.io의 10-dimension scorecard. 6강점(compounding/zero-LLM 추출/+31.4pp graph/plain-text/production infra/honest marketing) + 6약점(single-operator/no managed cloud/narrow integration/schema discipline/no multi-hop·temporal/v0.30 footguns), BrainBench·LongMemEval 수치 정리 (2026, article)
- [[applications/mantena-2026-hermes-gbrain-setup-vps|Hermes + GBrain on AWS EC2 (Mantena)]] — Sudhir Mantena의 4-Part 실전 튜토리얼. PATH 픽스·5분 cron sync·Hermes 위임 ingestion + X Basic($200/월)·ngrok($8/월) 둘 다 회피하는 pay-per-use + VPS public IP OAuth 2.0 PKCE로 own·repost·likes 수집 (2026, article)
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained|GBrain Explained (TechWealth Hub)]] — 출시 6일 뒤 업로드된 5분 45초 영상. 3-layer 멘탈 모델 / brain agent loop / 4개 DB primitive / dream cycle / "Sync ran ≠ sync worked" verification runbook 압축 (2026, video)
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — Yanli Liu의 3-축 결정 프레임워크. "agent의 job이 무엇이냐" 한 질문으로 RAG(retrieve)·LLM Wiki(compile)·Fat Skills(act)를 분류. GBrain `enrich` skill YAML verbatim, thin harness ~200 LOC, signal-detector "An unlinked mention is a broken brain", cron 1-liner "Read skills/{name}/SKILL.md and run it", 2026 convergence 예측 (retrieve+compile+act 단일 knowledge OS) (2026, article)

## Etc (etc)

미분류, 횡단(cross-cutting) 주제.

_(아직 자료가 없습니다)_

## Overviews (overviews)

다수 자료를 합성한 페이지 — 지식이 복리로 쌓이는 곳.

- [[overviews/lightrag-family-graph-rag-overview|LightRAG 계열 Graph-based RAG]] — LightRAG(EMNLP 2025) trunk에서 RAG-Anything(modality 축)·LeanRAG(abstraction 축)·HKUDS repo·한국어 소개글·DSBA 세미나 6개 자료 합성; -Origin ablation 모순 등 open question 정리 (2026, overview)
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계]] — Garry Tan의 markdown-first agent memory(2026-04-05 OSS) trunk에서 6개 자료(repo·DevRev 비교·Vectorize 리뷰·escvelocity 가이드·TechWealth 영상·Liu Medium 3-축 프레임워크) 합성; brain agent loop·verification runbook("Sync ran ≠ sync worked")·BrainBench/LongMemEval 수치·Liu의 retrieve/compile/act 3-축 분류·Karpathy LLM Wiki + Bush memex 계보·convergence 예측·남은 6 open question (2026, overview)
