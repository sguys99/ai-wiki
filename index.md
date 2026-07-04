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

- [[database/edge-2024-from-local-to-global|GraphRAG: From Local to Global]] — Microsoft의 GraphRAG 원논문. 엔티티와 관계를 뽑아 Leiden 커뮤니티로 요약한 뒤 map-reduce로 글로벌 답변을 만드는 그래프 RAG의 출발점 (2024, paper)
- [[database/dsba-2025-graphrag-paper-review|GraphRAG Paper Review (DSBA, 김도윤 2025-08-11)]] — DSBA 김도윤이 정리한 GraphRAG 한국어 해설. 원논문에 발표자 견해 다섯 가지를 덧붙인 랩 세미나 슬라이드 (2025, article)
- [[database/guo-2025-lightrag-simple-and-fast|LightRAG]] — GraphRAG의 KG를 key-value로 직렬화하고 dual-level keyword 검색으로 호출 비용을 줄인 후속작 (2025, paper)
- [[database/zhang-2026-leanrag-knowledge-graph-based-generation|LeanRAG]] — GMM-BIC로 계층적 KG를 짓고 LCA 기반 검색으로 redundancy를 줄인 그래프 RAG 변형 (2026, paper)
- [[database/guo-2025-rag-anything-all-in-one-rag|RAG-Anything]] — LightRAG의 후속작. 텍스트, 이미지, 표, 수식까지 dual-graph로 함께 엮어 모달리티 인식 검색을 더한 멀티모달 RAG (2025, paper)
- [[database/hkuds-rag-anything|HKUDS/RAG-Anything (repo)]] — RAG-Anything 논문의 reference 구현체. 파서와 모달 프로세서, 3-mode 통합 질의를 갖춘 PyPI 패키지 (2025, repo)
- [[database/9bow-2026-rag-anything-multimodal-rag-framework|RAG-Anything 한국어 소개글]] — PyTorchKR 9bow가 풀어쓴 입문글. dual-graph와 모달리티 검색 흐름을 코드 예제와 함께 갈무리한다 (2026, article)
- [[database/dsba-2026-paper-review-graph-based-rag|Graph-based RAG (LightRAG · LeanRAG)]] — DSBA 김도윤이 진행한 후속 세미나. LightRAG와 LeanRAG를 GraphRAG 계보 안에서 비교·비판하는 영상 (2026, video)
- [[database/vectifyai-pageindex|VectifyAI/PageIndex (repo)]] — 벡터리스 reasoning RAG의 reference 구현체. PDF를 계층 ToC 트리로 만들고 세 함수만으로 에이전트가 트리를 탐색하게 한다 (2025, repo)
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval|Direct Corpus Interaction (DCI)]] — 임베딩과 인덱스 없이 에이전트가 grep과 bash로 원문을 직접 뒤지는 검색 패러다임 (2026, paper)
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal|Gemini Embedding 2]] — Gemini를 양방향 어텐션으로 파인튜닝한 Google DeepMind의 네이티브 멀티모달 임베더 (2026, paper)
- [[database/zhang-2026-your-embedding-model-is-smarter|SMART (Single-to-Multi Adaptation)]] — 단일 벡터 임베더의 hidden state에 MaxSim late-interaction을 얹어 학습 없이 멀티벡터 성능을 끌어내는 어댑테이션 (2026, paper)
- [[database/geeksforgeeks-2026-vectorless-rag-pageindex|Vectorless RAG: PageIndex (GeeksforGeeks 튜토리얼)]] — PageIndex Cloud SaaS API를 10단계 코드 예제로 따라가는 입문 튜토리얼 (2026, article)
- [[database/zhang-2025-pageindex-vectorless-reasoning-rag|PageIndex: Vectorless · Reasoning-based RAG (소개글)]] — PageIndex 팀이 직접 쓴 vectorless·reasoning RAG의 동기와 철학을 담은 소개글 (2025, article)
- [[database/gutierrez-2025-from-rag-to-memory-non|HippoRAG 2: From RAG to Memory]] — KG + Personalized PageRank로 사실·sense-making·associativity 세 메모리 과제를 동시에 개선한 non-parametric continual learning 프레임워크 (2025, paper)
- [[database/kalane-2026-pageindex-threw-out-vector-databases|PageIndex (Towards AI 리뷰)]] — IBM 엔지니어 Akshay Kalane이 쓴 3rd-party 리뷰. 출시 이후 신규 기능과 트레이드오프를 함께 짚은 사후 점검 카탈로그 (2026, article)
- [[database/athina-ai-rag-cookbooks|Advanced + Agentic RAG Cookbooks (Athina AI)]] — advanced와 agentic RAG 16개 기법을 end-to-end Jupyter 노트북과 평가 단계로 한데 엮은 실무 cookbook (2024, repo)
- [[database/zandieh-2025-turboquant-online-vector-quantization-with|TurboQuant: Online Vector Quantization]] — 랜덤 회전과 Lloyd-Max 스칼라 양자화로 학습 없이 MSE 최적에 도달하는 data-oblivious 벡터 양자화 기법 (2025, paper)
- [[database/ryancodrai-turbovec|turbovec (repo)]] — Ryan Codrai가 TurboQuant 알고리즘을 Rust 코어와 Python 바인딩으로 옮긴 OSS 벡터 인덱스 (2026, repo)
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index|turbovec 한국어 소개글 (9bow)]] — PyTorchKR 9bow가 turbovec의 도전 과제, 알고리즘, 코드 예제를 갈무리한 한국어 입문글 (2026, article)

## LLMs (llms)

모델 아키텍처, pre-training, fine-tuning, foundation model 논문.

- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient|UnUnlearning]] — ICL 때문에 unlearning(exact 포함)만으로는 LLM 콘텐츠 규제가 불충분하다는 점을 짚은 논문 (2024, paper)
- [[llms/cai-2026-vlm3-vision-language-models|VLM3 (Native 3D Learners)]] — Qwen3-VL-4B와 SFT 위에 focal length 통일, 픽셀 reference, data mixture 세 가지만 더해 네 개의 3D 비전 task에서 SOTA를 잡은 네이티브 학습 (2026, paper)

## Agents (agents)

Agentic 시스템, tool use, planning, LangGraph 등.

- [[agents/qiao-2026-memory-intelligence-agent|Memory Intelligence Agent (MIA)]] — Manager·Planner·Executor 분리와 워크플로우 ↔ Planner 메모리 양방향 루프로 작은 Executor가 frontier 모델을 넘긴 ECNU 연구 (2026, paper)
- [[agents/lee-hoyeon-2026-harness-engineering|Harness Engineering (Team Attention)]] — Team Attention 이호연이 만든 강의 슬라이드. Prompt → Context → Harness 3단계 진화와 6축 순환을 Claude Code 사례로 엮어낸 한국어 자료 (2026, article)
- [[agents/dennis-2026-compiling-agentic-workflows-into-llm|Compiling Agentic Workflows into LLM Weights (Subterranean Agent)]] — LangGraph 같은 surface orchestration을 파인튜닝된 단일 모델 가중치로 컴파일하는, i14·멜버른대가 제안한 패러다임 (2026, paper)
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin et al.)]] — self-evolving 에이전트의 이득을 base capability, harness-updating, harness-benefit 셋으로 갈라보고, 역량 예산을 어디 투입할지 통제된 격자 실험으로 짚어낸 연구 (2026, paper)
- [[agents/zou-2026-task-focused-memorization-multimodal-agents|TaskMem (Task-Focused Memorization)]] — 멀티모달 에이전트의 장기 메모리를 학습 가능한 기억 정책으로 새로 정의한 ByteDance Seed 연구 (2026, paper)
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt: Claude Code (Arpan Patel)]] — Arpan Patel이 쓴 Claude Code 실전 가이드. 설정과 메모리, 워크플로우를 "setup is the work"로 꿰뚫은 운영 매뉴얼 (2026, article)
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Addy Osmani)]] — Google Chrome 매니저 Addy Osmani가 "prompting agents"에서 "designing loops that prompt agents"로 넘어가는 전환을 Loop Engineering이라 부르고 automations·worktrees·skills·connectors·sub-agents 5+1 요소와 3대 한계를 짚은 짧은 에세이 (2026, article)
- [[agents/osmani-2026-agent-skills|Agent Skills (Addy Osmani)]] — 에이전트가 건너뛰는 spec·test·review·verification을 checkpoint 있는 workflow로 강제하는 Skill. process over prose·anti-rationalization table·non-negotiable verification·progressive disclosure·scope discipline 5원칙과 6단계 SDLC를 Google 엔지니어링 관행으로 인코딩한다 (2026, article)
- [[agents/hall-2026-atlassians-design-md-is-here|Atlassian's DESIGN.md 실전 검증 (Atlassian Blog)]] — Google의 portable 디자인 컨텍스트 포맷 DESIGN.md를 ADS로 production 검증한 현장 보고. No context·MCP·Skill·DESIGN.md 4방식을 토큰·시간·turn으로 비교해, 파일째 일괄 로드하는 DESIGN.md가 컨텍스트 ~30%에 토큰은 MCP의 2배를 태우는 트레이드오프를 실측하고, blue-sky 프로토타이핑·고객 theming·도구 이식이라는 유용한 자리를 짚는다 (2026, article)
- [[agents/hada-2026-agent-skills|Agent Skills (GeekNews)]] — Osmani의 Agent Skills 글을 GeekNews GN⁺가 요약하고 커뮤니티 토론을 붙인 짝 자료. Skill 20개·MIT 라이선스·Cursor/Gemini CLI/Codex 이식 경로 같은 구체 스펙과 "LLM은 규칙을 우회한다"·800줄 context 오염 회의론을 더한다 (2026, article)
- [[agents/lee-jeongmin-2026-loop-engineering-claude-code|Loop Engineering · Claude Code · RLM (Jeongmin Lee, LinkedIn)]] — Boris Cherny·Peter Steinberger·Addy Osmani 세 사람의 발언을 RLM(Recursive Language Model) 이론에 묶고 Claude Code Opus 4.8 dynamic workflow의 설계 의도를 7가지로 풀어낸 한국어 카드 포스트 (2026, article)
- [[agents/zhang-2026-recursive-language-models|Recursive Language Models (RLM)]] — MIT CSAIL이 제안한 inference-time scaffold. 임의 길이 prompt를 Python REPL 변수로 offload하고 root LLM은 코드로 prompt를 탐색하거나 sub-LM을 재귀 호출하는 방식으로 1M~10M+ 토큰을 처리한다. base GPT-5와 Claude Code·OpenCode·compaction을 4개 long-context 벤치마크에서 동시에 넘어선 결과 (2026, paper)
- [[agents/bytebytego-2026-how-openai-built-its-data|How OpenAI Built Its Data Agent (ByteByteGo · Emma Tang 인터뷰)]] — 1.5 exabyte·9만 테이블 규모에서 OpenAI가 GPT-5.5 단일 모델 + 13개 큐레이션 도구 + 6-layer context assembly로 운영하는 *"vanilla"* data agent의 architectural deep-dive. *"foundation matters more than the agent"* thesis와 Codex 사내 use case 3건(cross-cloud migration 2개월, OSS 패치 무인 릴리스, support 자동 분류)을 함께 다룬다 (2026, article)
- [[agents/bai-2026-how-do-ai-agents-spend|How Do AI Agents Spend Your Money? (Bai et al.)]] — SWE-bench Verified 500 문제 × 8개 frontier LLM × 4런 trajectory를 분석해 agentic coding 토큰 경제를 처음으로 체계화한 연구. input 토큰이 비용을 지배(reasoning 대비 3500×)하고, 토큰을 더 써도 정확도는 중간 비용에서 정점 후 포화(inverse scaling)하며, 토큰 효율은 모델 고유 특성이고, 에이전트는 자기 비용을 최고 상관 0.39로만 예측하며 하나같이 과소추정한다 (2026, paper)
- [[agents/runkle-2026-the-art-of-loop-engineering|The Art of Loop Engineering (Sydney Runkle, LangChain)]] — 에이전트의 힘이 모델이 아니라 그 둘레의 루프 구조에 있다고 보고, agent → verification → event-driven → hill climbing 4단계 루프 스택을 LangChain 도구(`create_agent`·`RubricMiddleware`·LangSmith·Fleet·Engine)에 매핑한 글. 무게중심을 loop 1·2에서 통합·자기개선의 loop 3·4로 옮기라 권한다 (2026, article)
- [[agents/seans-ai-stories-2026-agent-harness-loop-engineering|Agent Harness & Loop Engineering In 19 Min (Sean's AI Stories)]] — "LLM은 당신을 모르는 강력한 말, harness는 그 말을 통제하는 마구"라는 단일 비유로 harness·loop·LLMOps를 꿴 20분 입문 강의. agent run 단위, 3종 memory(procedural·semantic·episodic)의 저장·검색 분기(RAG vs SQL), end-loop guardrails와 Claude Code hook 알림, tracing→eval→diagnose 3단계 LLMOps 루프까지 코드 없이 화이트보드로 풀어낸다 (2026, video)
- [[agents/cemri-2025-why-do-multi-agent-llm-systems|Why Do Multi-Agent LLM Systems Fail? (MAST)]] — UC Berkeley + Intesa Sanpaolo 13인 공저자가 7개 SOTA Multi-Agent LLM Systems(ChatDev·MetaGPT·HyperAgent·AppWorld·AG2·Magentic-One·OpenManus)의 1642개 실행 trace를 Grounded Theory로 분석해, 14개 실패 모드 × 3개 카테고리(System Design / Inter-Agent Misalignment / Task Verification) 분류체계 **MAST**를 정립한 NeurIPS 2025 논문. SOTA MAS 실패율 41~87%의 원인이 LLM 자체보다 시스템 설계·조직 구조에 있음을 case study로 보였고, MAST-Data 1642 traces·`pip install agentdash`·LLM-as-a-Judge annotator(o1, κ=0.77)를 오픈소스로 함께 공개했다 (2025, paper)
- [[agents/microsoft-skillopt|SkillOpt (Microsoft)]] — agent skill 문서를 얼어붙은 모델의 학습 가능한 상태로 보고, 딥러닝 옵티마이저처럼 epoch·batch·learning rate·held-out validation gate를 갖춰 훈련하는 프레임워크. optimizer 모델이 채점된 rollout을 skill 문서의 add/delete/replace 편집으로 바꾸고 검증 점수가 오를 때만 확정해, 가중치는 얼린 채 300~2,000 토큰짜리 `best_skill.md`만 산출한다. 6개 벤치마크 × 7개 모델 × 3개 harness의 52개 셀 전부 best/tied-best, GPT-5.5에서 no-skill 대비 direct chat +23.5점 (2026, repo)
- [[agents/yang-2026-skillopt-executive-strategy-for|SkillOpt (paper, Yang 2026)]] — 위 repo의 원전 논문(arXiv:2605.23904, Microsoft 외). skill 문서를 frozen agent의 학습 상태로 보고 rollout→reflection→bounded add/delete/replace 편집→held-out validation gate→best_skill.md로 훈련하는 text-space optimizer를 정식화. edit budget=textual learning rate, epoch-wise slow/meta update 등 딥러닝 유추를 실제 작동 원리로 삼는다. 6×7×3=52개 셀 전부 best/tied-best, GPT–5.5 +23.5(direct)/+24.8(Codex)/+19.1(Claude Code)점, cross-harness 전이 +59.7점, 채택 편집 1~4개짜리 300~2,000 토큰 skill. Figure 1·2·3·4 임베드 (2026, paper)
- [[agents/rodrigues-2026-mcp-server-architecture-patterns|MCP Server Architecture Patterns]] — 프로덕션 MCP 서버 15개를 코딩해 서버측 패턴 5개(Resource Gateway·Tool Orchestrator·Stateful Session Server·Proxy Aggregator·Domain-Specific Adapter)와 anti-pattern 4개를 GoF 형식으로 정리한 산업 경험 논문. context당 tool이 10~15개를 넘으면 선택 정확도가 90% 아래로 떨어진다는 프로덕션 텔레메트리(Haiku 4.5)와, 전송 지연은 프로토콜이 아니라 network RTT가 지배한다는 벤치마크를 함께 담았다 (2026, paper)
- [[agents/headroomlabs-ai-headroom|Headroom (repo)]] — 에이전트가 읽는 tool 출력·로그·RAG·파일·이력을 LLM에 닿기 전에 압축해 토큰을 60~95% 줄이는 context compression layer. ContentRouter가 JSON·코드·산문을 각기 다른 압축기로 보내고, CCR로 원본을 로컬에 남겨 되돌리며, library·proxy·`headroom wrap` 세 형태로 붙는다 (2026, repo)
- [[agents/tosea-2026-how-to-use-headroom-context|How to Use Headroom (Tosea)]] — Headroom을 다루는 가장 포괄적인 실무 how-to. 다섯 사용 방식(library·proxy·wrap·MCP·cross-agent memory)의 선택 기준과 "쓰지 말아야 할 때", 네이티브 compaction 비교표까지 정리 (2026, article)
- [[agents/subratpati-2026-building-cost-efficient-agents-with|Cost-Efficient Agents with Headroom (Subrat Pati)]] — Headroom을 비용 관점으로 옮긴 Medium 소개글. 입력 45K 토큰 세션이 GPT-4o 기준 유저당 하루 $11.25라는 수치로 문제를 세우고 Cache Aligner·Smart Crusher·CCR로 40~90% 절감을 소개 (2026, article)
- [[agents/nedai-2026-headroom-token-compression-guide|Headroom 사용법 (Nedai, AislesHub)]] — 한국어 how-to. 터미널 래핑·Cursor용 proxy·MCP 등록 세 방식과, 다른 글엔 없는 Windows 한글 파일명 `PYTHONUTF8=1` 인코딩 트러블슈팅을 담았다 (2026, article)
- [[agents/9bow-2026-headroom-ai-agent-context-compression|headroom 한국어 소개 (9bow)]] — PyTorch KR 9bow의 짧은 커뮤니티 공유글. ContentRouter·local-first·다중 배포 세 축과 GSM8K 정확도 보존을 갈무리 (2026, article)

## Evaluations (evaluations)

평가 프레임워크(RAGAS, Braintrust), benchmark.

- [[evaluations/marker-inc-korea-autorag|Marker-Inc-Korea/AutoRAG (repo)]] — RAG 파이프라인의 노드별 모듈 조합을 그리드 서치로 자동 평가·비교해 최적 파이프라인을 골라주는 RAG AutoML 프레임워크. Node Line→Node→Module 3계층 YAML 추상화, 한국어 BM25 토크나이저 기본 제공 (2024, repo)
- [[evaluations/kim-2026-ai-prd-eval-plan|AI PRD는 무엇이 달라야 하는가 (article)]] — 확률적 AI 기능은 행동이 아니라 "합격선"을 명세해야 한다는 AI PRD 작성론. Eval Plan(스프레드시트 Eval 셋 + 규칙기반·LLM-as-a-Judge·사람 3층 피라미드 + 회귀 테스트)을 문서의 심장으로, 8대 필수 항목과 가격 모델까지 하나의 정합 시스템으로 (2026, article)

## Applications (applications)

RAG 응용, 도메인 적용 사례, 제품 패턴.

- [[applications/garrytan-gbrain|garrytan/gbrain (repo)]] — Garry Tan이 공개한 markdown-first 에이전트 메모리. git 마크다운을 진실 원천으로 두고 pgvector와 typed-edge KG, skill pack을 한데 결합한 OSS (2026, repo)
- [[applications/gajjar-2026-gbrain-vs-computer-memory|GBrain vs DevRev Computer Memory]] — DevRev Arth Gajjar가 개인 GBrain과 엔터프라이즈 Computer Memory의 격차 세 가지를 비교한 에세이 (2026, article)
- [[applications/vectorize-2026-gbrain-review-honest-assessment|GBrain Honest Assessment (Vectorize)]] — Vectorize.io가 GBrain을 10차원 스코어카드로 채점한 솔직 리뷰 (2026, article)
- [[applications/mantena-2026-hermes-gbrain-setup-vps|Hermes + GBrain on AWS EC2 (Mantena)]] — Sudhir Mantena가 쓴 4-Part VPS 운영 튜토리얼. Hermes 위임 ingestion과 pay-per-use OAuth 흐름을 갈무리한 글 (2026, article)
- [[applications/techwealth-hub-2026-garry-tan-gbrain-explained|GBrain Explained (TechWealth Hub)]] — 출시 6일 뒤 올라온 짧은 영상. 3-layer 멘탈 모델과 검증 runbook을 압축해 풀어낸 자료 (2026, video)
- [[applications/liu-2026-rag-llm-wiki-or-gbrain|RAG, LLM Wiki, or GBrain? (Liu, Medium)]] — Yanli Liu가 제안한 결정 프레임워크. 에이전트의 job(retrieve, compile, act)으로 RAG, LLM Wiki, Fat Skills를 가르는 Medium 글 (2026, article)
- [[applications/safishamsi-graphify|safishamsi/graphify (repo)]] — Safi Shamsi가 만든 YC S26 제품. 임의 폴더를 3-pass로 처리해 단일 NetworkX 그래프로 컴파일하며, 21개가 넘는 AI 어시스턴트와 호환되는 도구 (2026, repo)
- [[applications/shamsi-2026-graphify-knowledge-graphs-for-ai|Graphify 한국어 랜딩 페이지 (graphify.net/kr)]] — Tree-sitter AST와 Leiden 군집화로 vector RAG 없이 코드를 이해하고, Karpathy mixed corpus에서 71.5× 토큰 감축을 보여 주는 공식 한국어 제품 소개 (2026, article)
- [[applications/todaycode-2026-graphify-llm-token-reduction-wiki|Graphify 한국어 deep dive (오늘코드todaycode)]] — Karpathy LLM Wiki 계보를 한국어로 풀이하고, legalize-kr 특허법 폴더에서 657배 토큰 절감을 실측한 뒤 9단계 파이프라인·tree-sitter·Leiden을 60분 분량으로 압축해 풀어낸 영상 (2026, video)
- [[applications/colbymchenry-codegraph|colbymchenry/codegraph (repo)]] — Colby Mchenry가 만든 로컬-퍼스트 code-intelligence MCP 서버. tree-sitter 기반 KG를 여러 에이전트에 노출하고 dynamic-dispatch 합성으로 indirect call까지 추적한다 (2026, repo)
- [[applications/dnotitia-akb|dnotitia/AKB (repo)]] — Dnotitia가 만든 MCP-first agent knowledge base. Git bare repo와 Postgres, 플러그형 vector store로 vault 격리와 풍부한 MCP 도구셋을 한 패키지로 정리한 구현체 (2026, repo)
- [[applications/datasciencedojo-2026-llm-wiki-by-andrej-karpathy|LLM Wiki by Karpathy 입문 튜토리얼 (Data Science Dojo)]] — Karpathy LLM Wiki Gist를 영어권 독자용 6단계 워크플로우로 풀어쓴 입문 가이드 (2026, article)
- [[applications/kmyu-2026-llm-wiki-pattern-synthesis|Karpathy LLM Wiki 패턴 — 한국어 종합 정리 (kmyu99 Notion)]] — 본 ai-wiki 소유자 kmyu99가 Karpathy LLM Wiki 패턴을 한국어 자료와 합성해 Notion에 엮어낸 메타 기술 리포트 (2026, article)
- [[applications/pandey-2026-rag-is-no-longer-just|RAG is no longer just vector search + LLM (Pandey, LinkedIn)]] — Brij Kishore Pandey가 올린 짧은 LinkedIn 카드. 2026 production RAG를 다섯 가지 디자인 공간으로 정렬한 사고 모델 (2026, article)
- [[applications/lum1104-understand-anything|Lum1104/Understand-Anything (repo)]] — 임의 코드베이스를 7단계 파이프라인으로 분석해 knowledge graph와 가이드 투어로 변환하는, 다수 AI 어시스턴트와 호환되는 OSS (2026, repo)
- [[applications/kmyu-2026-akb-llmwiki-gbrain-comparison|AKB · llmwiki · GBrain 비교 및 AKB 발전 방향 (kmyu)]] — AKB·llmwiki·GBrain을 6축 5점 척도로 점수화하고 AKB가 "shared memory DB"에서 "조직용 agent memory operating platform"으로 진화하기 위한 3-phase 로드맵을 제안한 2026-04-18 전략 보고서 (2026, report)
- [[applications/agricidaniel-claude-obsidian|AgriciDaniel/claude-obsidian (repo)]] — Karpathy LLM Wiki 패턴을 Claude Code 스킬 15개 + Obsidian 볼트 구조로 정착시킨 reference 구현체. Compound Vault refoundation(per-file advisory lock + BM25·contextual-prefix·cosine rerank hybrid retrieval) + Methodology Modes(generic·LYT·PARA·Zettelkasten) + 10-principle thinking framework를 묶은 MIT 라이선스 패키지 (2026, repo)
- [[applications/joonan30-llm-wiki-labs|joonan30/llm-wiki-labs (repo)]] — Joonan Lab(고려대 안준용 교수)의 1인 PI 연구실이 Karpathy LLM Wiki 패턴을 한국어로 굴린 31일치 실측 기록. 3,955 wiki 페이지·567줄 AGENTS.md·5개 자동 루프·5개 외부 시스템(Notion·Slack·Gmail·Grants·AI Agents) 통합을 4역할 렌즈(학부생/대학원생/연구원/PI)로 풀어쓴 단일 HTML 인터랙티브 케이스 스터디. *gist 한 줄 + "나도 이거 세팅해줘"* 진입 패턴과 *덤프 → 분류 → 규칙화 → 운영 → 분석* 5단계 진화 모델 (2026, repo)
- [[applications/dragon1086-llm-wiki|dragon1086/llm-wiki (repo)]] — Karpathy LLM Knowledge Base 패턴을 `claude --dangerously-skip-permissions -p` subprocess 호출로 돌리는 한국어 미니멀 레퍼런스. 5개 Python 스크립트 1,228줄로 ingest/query/lint/watch를 묶고, macOS launchd plist로 raw/에 .md를 떨군 순간 wiki가 갱신되는 24/7 자동 ingest까지 묶은 자족형 시스템 (2026, repo)

## Etc (etc)

미분류, 횡단(cross-cutting) 주제.

- [[etc/rahman-2026-a-practical-guide-to-becoming|AI-Native Engineer 실전 가이드 (Shah Rahman, ByteByteGo)]] — Meta Ads ML 총괄 Shah Rahman의 에세이. 엔지니어가 오케스트레이터로 정체성을 옮길 때 필요한 4 Core Practices와 ADLC 운영 프레임 (2026, article)

## Overviews (overviews)

다수 자료를 합성한 페이지 — 지식이 복리로 쌓이는 곳.

- [[overviews/lightrag-family-graph-rag-overview|Graph-based RAG 계열 — GraphRAG 트렁크 (LightRAG · LeanRAG · RAG-Anything)]] — GraphRAG를 트렁크로 두고 LightRAG, LeanRAG, RAG-Anything 분기와 한국어 자료를 한데 모은 graph RAG 계보 overview (2026, overview)
- [[overviews/gbrain-ecosystem-overview|GBrain 생태계]] — Garry Tan이 공개한 GBrain을 축으로 repo와 리뷰, 튜토리얼, 영상, 결정 프레임을 합성한 생태계 overview (2026, overview)
- [[overviews/agent-harness-engineering-overview|Agent Harness Engineering — Skills · Loops · Verification]] — Osmani의 Agent Skills·Loop Engineering, 이호연의 Harness Engineering, Patel의 실전 가이드를 한 지도로 묶고, Lin et al.의 controlled grid 실증으로 "harness는 frontier 모델에서 가장 크게 회수된다"는 경계까지 그은 개괄 (2026, overview)
- [[overviews/headroom-context-compression-overview|Headroom — 에이전트 컨텍스트 압축 개괄]] — 정본 저장소와 소개글 넷(Tosea·Subrat Pati·Nedai·9bow)을 한 장의 지도로 묶어, 같은 도구를 구조·선택 규칙·비용·Cursor 실전·정확도 다섯 렌즈로 정리하고 합의 벤치마크와 "쓰지 말아야 할 때"까지 그은 개괄 (2026, overview)
