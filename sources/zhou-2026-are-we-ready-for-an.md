---
title: "Are We Ready For An Agent-Native Memory System?"
type: paper
year: 2026
category: agents
raw_path: raw/papers/zhou-2026-are-we-ready-for-an.pdf
raw_filename: "zhou-2026-are-we-ready-for-an.pdf"
source_collection: external
authors: "Wei Zhou, Xuanhe Zhou, Shaokun Han, Hongming Xu, Guoliang Li, Zhiyu Li, Feiyu Xiong, Fan Wu"
arxiv_id: "2606.24775"
tags: [agent-memory, memory-systems, benchmark, taxonomy, knowledge-graph, retrieval, data-management, mem0, memgpt, zep, memos, llm-agent, agents]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig01.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig01.png
    caption: "에이전트 메모리 시스템의 대표 실행 워크플로 네 가지 (스트리밍 로그와 reflection, 계층 티어, knowledge graph, 멀티 엔진 하이브리드)"
    page: 1
    bbox_norm: [0.5115, 0.2971, 0.9198, 0.5292]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig02.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig02.png
    caption: "메모리 논리 표현 세 가지 (토큰 시퀀스, graph와 tree 토폴로지, 이종 복합 객체)"
    page: 3
    bbox_norm: [0.5102, 0.1001, 0.9214, 0.2846]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig03.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig03.png
    caption: "메모리 물리 저장 세 가지 (in-context register, 단일 엔진, 이종 멀티 엔진). 현재 크롭이 Table 1과 본문 단락을 함께 담아 재크롭이 필요하다"
    page: 4
    bbox_norm: [0.0803, 0.0699, 0.9197, 0.4801]
    strategy: caption-region
    low_confidence: true
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig04.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig04.png
    caption: "메모리 추출 세 가지 (raw 시퀀스 연결, schema-free 의미 추출, schema 제약 구조화 추출)"
    page: 5
    bbox_norm: [0.0602, 0.0874, 0.4998, 0.4126]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig05.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig05.png
    caption: "메모리 retrieval과 라우팅 다섯 가지 (native attention, dense retrieval, subgraph 순회, agentic 라우팅, 다단 하이브리드)"
    page: 5
    bbox_norm: [0.5103, 0.0983, 0.9158, 0.3949]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig06.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig06.png
    caption: "메모리 유지 네 가지 (timestamp 다중 버전, 용량 기반 물리 축출, LLM 의미 통합, 파라미터 최적화)"
    page: 6
    bbox_norm: [0.5097, 0.0986, 0.9183, 0.4177]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig07.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig07.png
    caption: "LongMemEval, LoCoMo, DB-Bench 8개 지표에서 12개 메모리 시스템과 baseline 2종의 태스크 성능"
    page: 8
    bbox_norm: [0.0876, 0.0837, 0.9177, 0.3513]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig08.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig08.png
    caption: "LoCoMo retrieval 결과. 위는 Recall@1, @5, @10이고 아래는 evidence distance gap 구간별 Recall@10 변화다"
    page: 8
    bbox_norm: [0.4902, 0.3524, 0.9398, 0.7276]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig09.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig09.png
    caption: "LLM backbone 4종 교체 ablation. LoCoMo Answer F1과 Recall을 5개 설정에서 비교한다"
    page: 9
    bbox_norm: [0.5097, 0.0534, 0.9219, 0.1872]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig10.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig10.png
    caption: "장기 지평 안정성 세 관점 (LongBench context 길이, LongMemEval 누적 세션 수, LoCoMo evidence distance)"
    page: 10
    bbox_norm: [0.5097, 0.0981, 0.9219, 0.3274]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig11.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig11.png
    caption: "메모리 시스템 운영 비용. 왼쪽은 지연 대 효용 frontier이고 오른쪽은 벤치마크 3종의 질의당 총 지연 heatmap이다"
    page: 11
    bbox_norm: [0.0716, 0.0981, 0.4903, 0.2309]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig12.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig12.png
    caption: "유지 전략 ablation. MemoryOS의 보수적 통합, 지연 flush와 MemoChat의 단일 topic 요약을 기본 설정과 비교한다"
    page: 12
    bbox_norm: [0.5097, 0.2177, 0.9219, 0.3507]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab01.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab01.png
    caption: "에이전트 메모리 시스템 taxonomy. 14개 시스템을 세 계열로 묶고 네 모듈의 설계 선택을 한 표에 정리한다"
    page: 4
    bbox_norm: [0.0803, 0.0699, 0.9197, 0.3242]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab02.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab02.png
    caption: "메모리 갱신 설정 강건성. LongMemEval의 knowledge update와 temporal reasoning, LoCoMo temporal 구간을 함께 잰다"
    page: 9
    bbox_norm: [0.0828, 0.0695, 0.9208, 0.1637]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab03.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab03.png
    caption: "표현과 저장 모듈 ablation. LightMem 3변형, MemTree 2변형, Mem0 2변형을 비교한다"
    page: 11
    bbox_norm: [0.5097, 0.1275, 0.9193, 0.2537]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab04.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab04.png
    caption: "추출 전략 ablation. MemoChat의 topic 분할, MemOS의 memorize 세밀도, LightMem의 대화 turn 범위를 비교한다"
    page: 12
    bbox_norm: [0.0847, 0.1326, 0.9208, 0.3164]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab05.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab05.png
    caption: "retrieval과 라우팅 모듈 ablation. A-MEM의 dense와 sparse 융합 비율, SimpleMem의 planning 단계 유무를 비교한다"
    page: 12
    bbox_norm: [0.5155, 0.1326, 0.9208, 0.3164]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LLM 에이전트의 메모리를 하나의 데이터 관리 시스템으로 보고 표현과 저장, 추출, retrieval과 라우팅, 유지 네 모듈로 분해한 뒤 12개 대표 메모리 시스템을 5개 워크로드와 11개 데이터셋에서 통합 벤치마크한 실험 연구다. 결론은 모든 시나리오를 지배하는 단일 아키텍처가 없다는 것이며, 성능은 메모리 구조가 워크로드의 병목과 얼마나 맞물리는지에 달렸다.

## 1. 자료 정보 (Document Information)

- **제목**: Are We Ready For An Agent-Native Memory System?
- **저자**: Wei Zhou, Xuanhe Zhou(교신저자), Shaokun Han, Hongming Xu, Guoliang Li, Zhiyu Li, Feiyu Xiong, Fan Wu
- **소속**: Shanghai Jiao Tong University, Tsinghua University, MemTensor (Shanghai) Technology
- **출처**: arXiv:2606.24775v1 [cs.CL], 2026-06-23, 14페이지
- **코드와 테스트베드**: `github.com/OpenDataBox/MemoryData`. taxonomy는 `github.com/OpenDataBox/awesome-agent-memory`
- **성격**: 서베이와 벤치마크를 겹친 실험 연구다. 데이터베이스 커뮤니티 관점에서 에이전트 메모리를 다룬 systems 논문이다.

논문이 던지는 질문은 제목 그대로다. 메모리 연구는 단순 retrieval-augmented 기법에서 지속 저장, retrieval, 갱신, 통합, 수명 관리까지 담당하는 데이터 관리 시스템으로 빠르게 커졌다. 반면 평가는 아직 F1이나 BLEU 같은 end-to-end 태스크 성공률에 머물러 시스템 내부를 하나의 블랙박스로 둔다. 그래서 운영 비용, 모듈 사이의 아키텍처 트레이드오프, 동적 지식 갱신 아래의 강건성 같은 시스템 수준 관심사가 비어 있다.

## 2. 주요 기여 (Key Contributions)

논문은 네 가지를 내세운다.

**기술 분해와 taxonomy (3절).** 에이전트 메모리 시스템을 네 모듈로 쪼갠다. agent memory system은 추론 한 단계를 넘어 누적 상태를 유지하고 이후의 추론과 행동에서 접근 가능하게 만드는 지속 데이터 관리 인프라를 뜻한다. 논문은 이를 $M_{sys} = \langle R, S, Q, U \rangle$ 튜플로 형식화한다. R은 표현과 저장, S는 추출, Q는 retrieval과 라우팅, U는 유지다. 각 모듈마다 설계 원리별 하위 분류를 세워 시스템 사이 비교의 기준을 만든다.

**통합 end-to-end 평가 (4절).** 시간 오버헤드 추적까지 통일한 테스트베드에서 5개 워크로드와 11개 데이터셋에 걸쳐 12개 대표 메모리 시스템과 reference baseline 2종을 평가한다. 태스크 효과성(RQ1), retrieval 충실도(RQ2), 동적 갱신 강건성(RQ3), 장기 지평 안정성(RQ4), 운영 비용(RQ5) 다섯 관점에서 본다.

**세밀한 컴포넌트 평가 (5절).** 네 모듈 프레임워크를 기준으로 한 번에 한 모듈만 바꾼 통제 변형을 만든다. 이렇게 각 기법이 표현 충실도, 라우팅 정밀도, 갱신 정확도에 미치는 개별 영향을 분리 측정한다.

**통찰 정리.** 실험에서 비용과 성능의 트레이드오프에 관한 발견 여섯 가지를 뽑아 agent-native 메모리 시스템을 향한 방향을 제시한다. 발견은 관찰 11개(O1부터 O11)와 요약 Finding 9개로 본문에 흩어져 있다.

기존 벤치마크와의 차별점은 넷이다. 첫째, 앞선 평가들은 대표 아키텍처를 통일 워크로드에서 다루지 못했다. MemoChat, MemTree, LightMem은 선행 평가에 포함된 적이 없고, 데이터베이스 커뮤니티의 시도도 LoCoMo와 LongMemEval 같은 chatbot 중심 데이터셋에 범위가 갇혀 복잡한 agentic 실행 시나리오를 놓쳤다. 둘째, F1이나 BLEU 같은 단면적 end-to-end 지표에 의존해 근거 수준의 retrieval 충실도, 모순 지식 아래의 갱신 강건성, 장기 지평 안정성을 분리해 재지 못했다. 셋째, 인덱스 구축 시간이나 질의 지연 같은 운영 비용을 거의 재지 않았다. 넷째, 메모리를 분해 가능한 데이터 관리 모듈이 아니라 하나의 블랙박스로 취급했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 네 아키텍처 계열과 메모리 분류 기준

논문은 먼저 기존 메모리 시스템이 어떤 실행 워크플로를 가지는지 네 가지로 보인다(Figure 1).

| 계열 | 대표 시스템 | 실행 워크플로 |
|---|---|---|
| Stream-and-Reflection | MemoryBank | 경험을 timestamp가 붙은 메모리 스트림으로 쌓고, 주기적으로 reflection을 만들어 스트림에 되쓴다. retrieval은 recency와 importance, relevance를 곱한 점수로 한다 |
| Hierarchical Tiered | MemGPT(Letta) | 용량과 접근 특성이 다른 여러 층으로 나누고 core memory와 archival storage 사이를 축출과 승격으로 명시 이동한다 |
| Knowledge Graph | Mem0_g, Zep | entity와 relation, 그 시간적 변화를 temporal knowledge graph로 표현하고 entity 동일성 판정과 충돌 해소를 함께 둔다 |
| Composite Hybrid | A-MEM | schema를 아는 메모리 객체를 여러 저장 기반으로 라우팅하고, KV cache 같은 런타임 상태와 vector, graph, 키워드 인덱스 같은 장기 저장을 분리한다 |

에이전트가 다루는 정보는 대화 이력, 도구 실행 로그, 정제된 사실, 사용자 선호 등으로 다양하다. 논문은 인지과학 틀을 빌려 이를 두 기준으로 정리한다. temporal 기준에서는 진행 중인 세션의 휘발성 상태인 short-term memory와 세션을 넘어 지속되는 long-term memory로 나뉜다. functional 기준에서 long-term memory는 개별 과거 사건인 episodic memory, 추상화된 사실 지식인 semantic memory, 재사용 가능한 행동 전략인 procedural memory, 그리고 사용자 선호로 갈린다. episodic memory는 언제 무슨 일이 있었는지를 사건 단위로 저장하는 층을 말한다.

이 논문의 초점은 태스크 특화 에이전트 프레임워크에서 메모리가 보조 모듈로 붙는 경우가 아니라, 메모리 자체가 중심이 되는 시스템 수준 메모리다. Mem0, Letta, Zep, A-MEM 같은 외부 메모리 시스템이 여기 해당한다. 에이전트는 이들에 능동적으로 쓰고 갱신하고 인덱싱하며 관련 컨텍스트를 추론 루프로 되돌린다.

### 3.2 RAG, context engineering, 전통 DB 워크로드와의 구분

논문은 메모리 시스템을 인접 개념 셋과 명시적으로 가른다. RAG는 대체로 상태 없는 읽기 전용 retrieval 원시 연산이다. 질의가 주어지면 정적 코퍼스에서 관련 구절을 가져와 생성 한 단계를 보강하고 끝난다. context engineering은 추론 turn마다 유한한 context window에 무엇을 담을지 큐레이션하는 더 넓은 실무를 가리킨다. 반면 에이전트 메모리 시스템은 시간에 걸쳐 에이전트 고유 상태를 관리하는 지속 갱신형 인프라이고, 표현과 저장, retrieval, 유지까지 long-term memory 수명 전체를 관장한다. 잘못 설계된 메모리 아키텍처를 쓰면 사실 모순, catastrophic forgetting, 감당하기 어려운 지연이 지속 실행 중에 발생한다.

전통 데이터베이스의 OLTP, OLAP 워크로드와도 세 지점에서 다르다. 첫째, 메모리 접근은 술어 기반이 아니라 의미 기반이다. 질의가 자연어나 부분 컨텍스트, 잠재 의도로 표현되므로 고정 schema 위의 정확한 논리 술어만으로는 부족하고 근사 매칭과 질의 재작성, LLM이 이끄는 retrieval이 필요하다. 둘째, 메모리 내용은 연속적이고 서로 모순될 수 있는 관찰 아래에서 변한다. 정해진 schema로 tuple을 덮어쓰는 트랜잭션 설정과 달리 시간과 도구, 환경에 걸쳐 모인 불확실하고 부분적이며 때로 모순되는 정보를 수용해야 한다. 셋째, 접근 패턴과 단위가 매우 이질적이다. 하나의 워크로드가 long-context 종합, episodic 회상, 구조화 사실 조회, temporal reasoning, 스트리밍 갱신을 함께 요구하므로 실무 시스템은 의미 retrieval과 구조화 필터링, 토폴로지 순회를 한 아키텍처 안에서 섞는다.

### 3.3 네 모듈 taxonomy

Table 1은 14개 대표 시스템을 세 계열로 묶고 네 모듈의 설계 선택을 한 표에 정리한다. 세 계열은 Sequential Context(MemoChat, Mem0, MEM1, MemAgent), Structural Topological(MemTree, Zep, Mem0_g, Cognee), Multi-Paradigm Hybrid(LightMem, SimpleMem, MemOS, MemoryOS, A-MEM, Letta)다.

taxonomy에 오른 14개 가운데 MEM1과 Mem0_g는 4절 이후의 end-to-end 평가 그림에 등장하지 않는다. 실제로 성능이 보고된 시스템은 12개다.

### 3.4 표현과 저장 (R)

논리 표현은 세 가지다. **Token-Level Sequence**는 메모리를 구조 추상 없는 1차원 시퀀스로 본다. 사람이 읽는 이산 텍스트 토큰과 잠재 vector 토큰 두 하위 형태가 있다. Mem0는 이력에서 뽑은 개별 자연어 사실로 메모리를 분리하고, MemoChat은 여러 turn 대화를 topic, summary, raw turn을 담은 JSON 블록으로 구조화한다. MemAgent는 내부 belief 상태를 1,024 토큰 같은 상한 안의 텍스트로 제한하고, MEM1은 내부 상태 요약을 `<IS>` 같은 경계 태그로 감싼다. 잠재 vector 쪽에서는 Mem0가 사실을 dense 임베딩으로 두고, MemoRAG는 별도 초기화한 가중치 행렬로 raw 입력을 KV cache tensor로 압축한다. vector 토큰은 토큰화 부담을 줄이지만 구조 해석 가능성을 잃고 술어 수준 필터링이나 특정 사실만 골라 갱신하는 연산이 어렵다.

**Graph and Tree-Based Topology**는 노드와 간선으로 추상화한다. Zep은 메모리를 episode, entity, community 하위 그래프로 나눈 temporal knowledge graph로 분할한다. Mem0_g는 정점이 entity이고 간선이 관계 triplet인 방향 라벨 그래프로 형식화하며, entity 노드에 의미 타입과 dense 임베딩, 생성 timestamp를 덧붙여 temporal reasoning을 돕는다. MemTree는 텍스트 내용, dense 임베딩, 토폴로지 포인터, 깊이 스칼라를 담은 튜플을 노드로 하는 동적 방향 tree다. 깊은 leaf는 개별 사실을, 조상 노드는 상위 요약을 유지하고 전용 root가 진입점이 된다.

**Heterogeneous Composite Representation**은 비구조 텍스트와 구조화 metadata를 한 기능 단위로 묶는다. MemOS의 MemCube가 plain-text, activation, parametric 세 payload와 ID 태그를 함께 담는 예다.

물리 저장도 세 가지다. **Transient In-Context Register**는 디스크 I/O와 외부 순회 지연을 없애려고 활성 하드웨어 상태 안에만 둔다. MemoChat은 JSON 메모를 LLM 컨텍스트 입력에 유지하고 MemAgent는 요약 토큰을 KV cache tensor에 직접 저장한다. **Specialized Single-Engine Storage**는 논리 구조에 맞춘 단일 백엔드를 쓴다. Mem0와 MemTree는 vector store, Letta는 pgvector 확장을 붙인 PostgreSQL, Zep과 Mem0_g는 Cypher 질의로 Neo4j, LightMem은 관계형 엔진에 사실 스트림을 증분 append한다. raw 산출물을 파일이나 객체로 보존하는 방식도 같은 범주다. **Heterogeneous Multi-Engine Storage**는 여러 인덱스를 동시에 만들거나 이종 백엔드에 분산한다. SimpleMem은 IVF-PQ를 쓰는 LanceDB에서 dense 임베딩, sparse BM25 인덱스, SQL 술어를 함께 유지하고, MemoryOS는 dense cosine 유사도와 이산 Jaccard 유사도를 융합한 인덱스를 쓰며, MemOS는 표준 adapter interface로 vector와 graph 데이터베이스를 묶는다.

### 3.5 추출 (S)

이질적 입력 스트림을 논리 메모리 원시형으로 바꾸는 파이프라인이다.

- **Raw Sequence Concatenation**: 추출 프롬프트를 건너뛰고 raw 토큰 연결이나 임시 상태 요약으로 만든다. MEM1과 MemAgent가 2차 파싱 없이 활성 계산 상태 안에만 결과를 둔다.
- **Schema-Free Semantic Extraction**: raw 입력을 독립적인 고가치 정보 단위로 추려낸다. Mem0가 "사용자는 채식이고 유제품을 먹지 않는다" 같은 독립 사실 진술을 저장한다.
- **Schema-Constrained Structured Extraction**: LLM에게 미리 정의한 schema를 채우게 해 엄격한 타입 데이터를 만든다. Zep과 Mem0_g는 `LIVES_IN`, `WORKS_AT` 같은 타입 지정 방향 관계 간선을 뽑고, Zep은 reflection에서 착안한 검증 단계를 더해 환각 triplet을 억제한다. MemoChat은 대화를 엄격한 JSON schema로 분할해 데이터 예측 가능성을 확보한다.

### 3.6 retrieval과 라우팅 (Q)

질의 컨텍스트에 맞는 메모리 부분집합을 골라 인덱스를 순회하는 함수다. 다섯 가지가 있다.

**Native Attention-Based Retrieval.** Transformer의 계산 그래프 자체를 유일한 retrieval 엔진으로 쓴다. MEM1은 현재 시퀀스 위에서 self-attention으로 암묵 retrieval을 수행하며 2차원 attention mask로 causal 일관성을 지킨다. MemAgent는 블록을 프롬프트 템플릿에 직접 이어 붙여 외부 cross-encoder reranking 없이 표준 attention 디코딩만으로 라우팅한다.

**Semantic-Based Dense Retrieval.** 질의 tensor를 vector 인덱스에 맞춰 KNN 이웃을 뽑는다. Mem0는 질의 임베딩으로 dense 유사도 탐색을 실행하고, LightMem은 반복 reranking을 생략하고 cosine 유사도만 쓰며, MemTree는 계층을 펼치는 collapsed-tree 구조로 전체 후보에 대한 전역 cosine 유사도 분포를 계산한다.

**Topological Subgraph Traversal.** 관계 간선을 타고 knowledge graph에 구조적으로 근거한 의미 군집을 뽑는다. Mem0_g는 entity 중심 heuristic으로 지역 하위 그래프를 재귀 순회하며 의미 triplet 평가를 동시에 진행하고, A-MEM은 dense KNN으로 후보 anchor를 고른 뒤 같은 개념 군집 안에서 지역 그래프 순회를 실행한다.

**Autonomous Agentic Routing.** retrieval을 LLM 자신에게 위임해 능동 질의 계획자로 쓴다. Function Call Invocation은 명시적 함수 호출로 미리 정의한 DB 연산을 실행하며 Letta가 활성 컨텍스트를 평가해 `archival_storage.search()` 같은 호출을 스스로 생성한다. Generative Query Expansion은 자연어 생성으로 중간 단서를 합성하거나 복잡한 의도를 분해해 인덱스에 매핑하며 SimpleMem의 Intent-Aware Retrieval Planning 모듈이 질의를 해부하고 적응적 탐색 깊이를 계산해 최적화된 질의 변형을 만든다.

**Multi-Stage Hybrid Execution.** 단일 패러다임의 recall 한계를 넘으려고 다중 엔진 파이프라인을 실행한다. Sequential Hybrid Routing은 결정적 술어로 탐색 공간을 먼저 줄이고 세밀한 의미 추출을 뒤에 두며, MemoryOS가 거친 술어 평가 뒤 격리된 segment 안에서만 세밀한 의미 순위를 매기는 연합 라우팅을 실행한다. Parallel Ensemble Retrieval은 여러 인덱스에 질의를 동시에 보내고 후단에서 융합과 reranking을 하며, Zep이 cosine 의미 스캔과 Okapi BM25 전문 탐색, 토폴로지 BFS를 동시에 실행한 뒤 RRF와 MMR, cross-encoder로 정밀도를 높인다.

### 3.7 유지 (U)

메모리 항목의 동적 수명을 관리하는 규칙이다. 2절 정의에서는 충돌 해소와 버전 관리, 용량 관리, 의미 통합 세 하위 연산으로 쪼개지만 3.4절 taxonomy는 방법 계열을 네 가지로 열거한다. 네 번째가 정의에 없는 Continuous Parametric Optimization이다.

**Timestamp-Based Multi-Versioning.** 물리 행 삭제 대신 timestamp metadata와 append-only 로그로 만료 사실을 논리적으로 폐기한다. multi-versioning은 옛 사실을 지우지 않고 유효 플래그와 timestamp로 지금은 맞지 않는다는 표시만 남겨 이력을 보존하는 방식이다. Zep과 Mem0_g가 낡거나 모순되는 관계를 논리 무효 처리하고, LightMem은 timestamp가 붙은 사실 스트림을 증분 삽입하며, SimpleMem은 ISO-8601 timestamp의 시간 순서 우선으로 모순을 해소하고, MemOS는 구조화된 Update API로 차분 쓰기를 실행해 provenance ID를 갱신하며 다중 버전 체인을 만든다.

**Capacity-Driven Physical Eviction.** 무한 성장을 막으려고 데이터를 물리적으로 버리거나 덮어쓴다. Constraint-Based Hard Eviction은 FIFO 큐나 고정 시퀀스 경계, 토큰 상한 같은 결정적 규칙을 쓴다. MemAgent는 고정 segment 경계마다 낡은 시퀀스를 새 요약 블록으로 대체하고, MEM1은 활성 컨텍스트 임계를 넘으면 자동 FIFO 정리로 낡은 태그를 축출하며, Letta는 OS에서 착안한 큐 관리자로 토큰 수가 종단 한계를 넘으면 flush로 낡은 메시지를 2차 recall 저장으로 내린다. Score-Based Priority Eviction은 시간 감쇠나 접근 빈도 점수로 폐기 대상을 정하며, MemoryOS가 retrieval 빈도와 지수 시간 감쇠를 저울질하는 Heat score로 segment 활력을 재고 점수가 가장 낮은 segment를 축출한다.

**LLM-Driven Semantic Consolidation.** LLM이 논리 충돌을 해소하고 중복 관찰을 dense 요약으로 추상화한다. Inline Semantic Compaction은 쓰기 단계에서 트랜잭션 커밋 전에 중복 주장을 합치며, SimpleMem이 온라인 의미 합성을 실행하고 MemTree가 모든 부모 노드에 재귀 요약 프롬프트를 걸어 과거 상태와 새 payload를 융합한다. Tool-Driven CRUD Execution은 LLM이 도구 interface로 Create, Read, Update, Delete를 명시 실행하며 Mem0가 이 방식으로 UPDATE와 DELETE를 수행한다.

**Continuous Parametric Optimization.** 상태 갱신을 온라인 추론 지연과 분리하고, 외부 DB schema가 아니라 모델 파라미터를 비동기 배경 작업으로 수정한다. MemoRAG는 활성 추론 토큰을 읽기 전용으로 고정하고 오프라인 학습 단계에서만 Reinforcement Learning with Generation Feedback(RLGF)으로 추출 품질을 최적화한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 실험 구성

평가 워크로드는 LoCoMo, LongMemEval(MemoryAgentBench 구현), DB-Bench(LifeLongAgentBench), LongBench를 포함해 5개이고 데이터셋은 11개다. reference baseline은 Long Context와 Embedding RAG 둘이다.

| RQ | 질문 | 벤치마크와 지표 |
|---|---|---|
| RQ1 | 메모리 시스템이 워크로드 전반에서 end-to-end 태스크 성능을 실제로 올리는가 | LoCoMo(EM, Answer F1), LongMemEval(Substring EM, ROUGE-L F1, ROUGE-L Recall, LLM Judge Acc.), DB-Bench(EM, Task Success Rate) |
| RQ2 | 질의가 요구하는 저장 근거를 얼마나 정확히 띄우는가 | LoCoMo(Recall@1/@5/@10, evidence distance gap 6구간 Recall@10), 8개 시스템 |
| RQ3 | 수정된 사실을 흡수하고 갱신 후 올바른 시간 상태를 답하며 backbone이 바뀌어도 강건한가 | LongMemEval knowledge update와 temporal reasoning, LoCoMo temporal 구간(11개 시스템), backbone 4종 ablation |
| RQ4 | 유효 메모리 지평이 길어질 때 얼마나 안정적인가 | LongBench(context 길이 3구간 Accuracy), LongMemEval(누적 세션 수 4구간 ROUGE-L F1), LoCoMo(evidence distance 6구간 Answer F1) |
| RQ5 | 효용과 지연의 교환 관계, 워크로드별 지연 비용은 얼마인가 | Avg. Operation Latency/Query, Normalized Utility, Outlier-Filtered Avg. Total Latency/Query, 8개 시스템 |

LongMemEval의 LLM Judge Accuracy는 GPT-5.4를 심판으로 쓴다. RQ2의 evidence distance gap은 질의가 속한 마지막 세션과 그 답을 뒷받침하는 가장 이른 근거 사이의 세션 거리이고, 1~5부터 26~31까지 6구간으로 나눈다.

### 4.2 RQ1 태스크 효과성

O1(Cross-Workload Effectiveness)은 모든 워크로드를 지배하는 단일 시스템은 없지만 구조로 유도한 필터링으로 태스크에 결정적인 근거를 보존하는 방법이 전반에서 가장 경쟁력 있다고 정리한다. 선두는 워크로드마다 바뀐다. LongMemEval에서는 구조를 아는 시스템이 앞서 Zep이 LLM Judge Accuracy 48.0, Cognee가 ROUGE-L F1 35.3에 이른다. LoCoMo의 정확 일치에서는 하이브리드 필터링이 가장 강해 MemOS가 EM 11.5로 최고다. DB-Bench에서는 실행 흔적을 보존하는 메모리가 가장 강해 Long Context가 EM 48.20, MemoChat이 Task Success Rate 55.40을 낸다. 워크로드 전체를 커버하는 방법 가운데는 MemoryOS와 MemOS가 종합 frontier에 가장 가깝다.

LongMemEval 4개 지표의 최저값도 함께 봐야 한다. MemAgent는 Substring EM 11.1과 ROUGE-L Recall 33.1은 중위권이지만 ROUGE-L F1 6.2, LLM Judge Accuracy 3.7로 최저다. Letta는 LongMemEval ROUGE-L F1 7.8, LoCoMo EM 0.0, Answer F1 5.3으로 대화형 QA에서 매우 낮은 반면 DB-Bench에서는 EM 61.6, Task Success Rate 61.6으로 최고다. MemAgent는 LoCoMo와 DB-Bench 패널에 아예 등장하지 않아 워크로드 커버리지가 부분적이다.

O2(Beyond Exact Match)는 지표 선택 자체를 다룬다. EM은 답이 짧고 정형이며 지역적으로 검증되는 태스크에 여전히 유효하다. 반면 정답이 다른 표현으로 나오거나 실행 성공에 달린 태스크에서는 부족하다. DB-Bench에서 Long Context가 EM 48.2로 최고지만 MemoChat이 Task Success Rate 55.4로 훨씬 높다는 것이 그 증거다.

Finding 1(Workload-Aligned Memory)은 세 지침으로 요약된다. 세션을 넘어 흩어진 추론에는 관계와 시간을 아는 retrieval이 가장 효과적이고(Zep, Cognee), 길지만 의미가 이어지는 대화에는 거친 단계에서 세밀한 단계로 내려가는 필터링이 정확한 grounding을 돕고(MemOS, MemoryOS), 상태를 다루는 실행에는 상호작용 흔적 보존이 정확한 어휘 일치보다 중요하다(Long Context).

### 4.3 RQ2 retrieval 충실도

관찰은 retrieval 충실도가 관련 메모리 하나를 일찍 띄우는 문제보다 완전하고 시간적으로 먼 근거까지 모을 수 있게 메모리 구조를 명시적으로 조직하는 문제라고 정리한다. SimpleMem이 Recall@1 39.0으로 가장 높지만 retrieval 예산이 커지면 A-MEM과 MemTree가 Recall@5/@10에서 69.5/85.9와 59.7/80.5로 올라오고, evidence distance gap이 커져도 훨씬 안정적이다. Recall@5만 보면 SimpleMem 64.6이 MemTree 59.7보다 여전히 높으므로 MemTree의 역전은 Recall@10 구간에서 일어난다. 평평한 Embedding RAG baseline은 가장 짧은 거리 구간 이후 크게 하락해 Recall@10이 11~15 구간에서 3% 아래로 내려간다.

논문은 이를 근거 완성 문제로 부른다. 필요한 근거가 낡거나 흩어져 있거나 여러 turn에 걸쳐 있을 수 있어서다. 세 가지 retrieval 행태가 갈린다. 압축 지향 메모리는 매우 관련도 높은 항목 하나를 일찍 띄우는 데 효과적이고, 연결이나 계층 조직은 순위 결과 전반에서 서로 보완하는 근거를 모으는 데 낫고, 평평한 dense retrieval은 필요한 근거가 현재 컨텍스트와 가까울 때만 경쟁력이 있다.

Finding 2(Evidence-Centric Memory Organization)는 초기 위치 파악과 근거 조립을 별개 설계 목표로 다루라고 말한다.

### 4.4 RQ3 갱신 강건성

실험은 둘로 나뉜다. Update Robustness Comparison은 11개 시스템을 LongMemEval의 knowledge update와 temporal reasoning, LoCoMo temporal 구간에서 비교한다(Table 2). Backbone Robustness Ablation은 5개 설정을 LLM backbone 4종(Qwen3-8B, DeepSeek-Chat, GPT-5.4-mini, GPT-5.4) 아래에서 본다(Figure 9).

O4(Temporal State Externalization)는 갱신 관련 구간에서도 지배자가 없다고 정리한다. 직접 사실 수정에는 그래프와 관계로 조직한 메모리가 가장 강해 Zep이 knowledge update에서 Substring EM 44.4, ROUGE-L F1 36.8로 앞선다. 시간적으로 흩어진 근거에는 관계형 retrieval이 가장 강해 Cognee가 temporal reasoning에서 Substring EM 18.7, ROUGE-L F1 35.8로 앞선다. 최신 상태의 정확한 grounding에는 하이브리드 필터가 강해 MemOS가 LoCoMo EM 8.9로 최고이고 Cognee가 Answer F1 28.1로 최고다. 구간 전체를 커버하는 방법 가운데 Cognee와 MemOS, MemoryOS가 종합 frontier에 가장 가깝다. 수명 관리가 없는 시스템은 낡은 사실을 그대로 돌려주며 논문은 이를 "hallucinations of the past"로 부른다.

O5(Backbone Robustness)는 backbone 변경이 절대 답 품질은 바꾸지만 어느 파이프라인이 효과적인지는 거의 바꾸지 않는다고 본다. MemOS는 네 backbone에서 Answer F1 32.2, 41.2, 38.6, 41.2로 메모리 기반 설정 가운데 계속 최고다. 유일한 주목할 역전은 지역적이다. A-MEM이 GPT-5.4-mini와 GPT-5.4에서 각각 32.5와 32.6으로 MemTree의 28.9와 28.4를 넘어선다. 날짜에 근거한 최신 상태 질의에서 MemOS는 네 backbone 모두에서 정답을 유지하고 Embedding RAG는 모두에서 틀린다. 같은 Figure 9의 Recall 패널에서 Embedding RAG는 17.7로 고정이고 LightMem은 56.4로 고정인 반면, MemOS는 70.6에서 79.9, 57.6, 80.1로 흔들려 LLM이 관여하는 라우팅이 backbone에 민감함을 보인다.

Finding 3(Temporal Update Fidelity)은 갱신 후 동작의 신뢰성이 모델 용량 문제가 아니라 파이프라인 설계 문제라고 결론한다. revisability를 표현 단계에 심어 나중 사실이 같은 entity나 event에 묶이게 하고, 질의 시 선택성을 워크로드 병목에 맞추고, LLM 스케일은 grounding이 성공한 뒤 답 표현을 다듬는 데 쓰라는 것이다.

### 4.5 RQ4 장기 지평 안정성

O6(Long-Horizon Evidence Preservation)은 명시적 관계 연결이나 계층 통합으로 근거를 조직할 때 긴 지평에서 더 안정적이라고 본다. LongBench에서 SimpleMem은 Short에서 Medium 구간으로 갈 때 Accuracy 35.2%에서 34.9%로 거의 변하지 않지만 Long Context는 42.6%에서 19.0%로 크게 하락한다. 프롬프트를 키우는 것만으로는 긴 입력에 distractor가 쌓이면 답 품질이 유지되지 않는다는 뜻이다. LoCoMo에서 대비는 더 뚜렷하다. Embedding RAG는 근거 거리가 넓어질 때 Answer F1이 37.1에서 7.4로 내려가는 반면 Cognee와 MemOS, MemoryOS 같은 그래프 또는 통합형 메모리는 같은 구간에서 훨씬 높게 유지된다.

긴 지평의 어려움은 메모리 용량이 아니라 표현이 먼 사실을 답에 필요한 추상과 연결해 두는지에 있다. 그래프나 시간으로 조직한 메모리는 먼 사실의 entity, event, time 관계를 보존하고, 계층이나 요약 우선 조직은 세션 수준 구조를 보존해 LLM이 최종 생성 전에 주의를 좁힐 수 있게 한다. 순수 long-context 프롬프팅과 평평한 dense 메모리는 둘 중 어느 지지도 제공하지 못한다.

Finding 4(Horizon-Structured Memory)는 다중 관점 필터링이 distractor가 많은 긴 입력에 도움이 되고(SimpleMem), 관계를 아는 인덱싱이 근거가 여러 turn이나 세션으로 떨어져 있을 때 도움이 되고(Cognee, Zep), 거친 단계에서 세밀한 단계로 내려가는 요약이 관련 세션을 먼저 찾아야 할 때 도움이 된다고(MemOS, MemoryOS) 정리한다.

### 4.6 RQ5 운영 비용

O7(Localized Maintenance)은 가장 비용 효율적인 방법이 유지 작업을 메모리 상태의 제한된 부분집합에 국소화하는 방법이고, 큰 전역 상태를 반복 재조직하는 방법이 가장 비효율적이라고 본다.

효용과 지연 frontier에서 LightMem은 질의당 평균 연산 지연 3.67초에 Normalized Utility 48.3%, MemTree는 15.9초에 63.5%를 낸다. 둘 다 MemoChat(15.4초에 28.0%), Mem0(35.9초에 21.4%), A-MEM(17.9초에 57.7%)보다 분명히 효율적이다. 효용이 더 높은 구조화 시스템은 비용 쪽으로 크게 이동한다. MemoryOS는 28.6초에서야 82.0%에 이르고 Cognee와 Zep은 각각 116.5초와 155.1초를 지나서야 84%를 넘는다.

워크로드별 지연을 보면 분리가 더 선명하다. LongBench에서 LightMem은 17.3초, MemTree는 116.7초를 유지하는 반면 Mem0, MemoChat, MemoryOS, A-MEM은 각각 374.2초, 460.2초, 490.0초, 552.1초로 올라간다. Zep Local은 같은 LongBench에서 질의당 2,867초로 가장 크다. 운영 효율을 정하는 것은 구조를 쓰는지 여부가 아니라 쓰기 한 번이 그 구조를 얼마나 넓게 전파하는지다. segment 압축과 제한된 하이브리드 retrieval이 LightMem을 저비용 영역에 두고, 경로에 국소적인 tree 집계가 MemTree가 전역 갱신 없이 효용을 상당히 지키게 한다. 반면 그래프 전역 통합과 다중 store 동기화, 메모리 전체 재작성은 조직력은 높이지만 메모리가 커질수록 가장 무거운 운영 비용을 부과한다.

Finding 5(Operational Scaling Rule)는 효율이 구조 자체가 아니라 유지 범위에 좌우된다고 정리한다.

### 4.7 모듈별 ablation

**표현과 저장(M1, Table 3).** O8(Content Fidelity)은 원 대화 내용을 유지하는 것이 추상이나 계층을 더하는 것보다 중요하다고 결론한다.

| 시스템 | 변형 | LoCoMo EM | LoCoMo Ans. F1 | LongMemEval Substr. EM | LongMemEval ROUGE-L F1 |
|---|---|---|---|---|---|
| LightMem | User-Only Raw | 24.2 | 38.9 | 26.0 | 31.4 |
| LightMem | User-Only Summary | 8.5 | 15.6 | 11.7 | 17.4 |
| LightMem | User-Only Compressed | 23.6 | 38.6 | 10.7 | 19.1 |
| MemTree | Flat-biased | 18.2 | 30.7 | 23.0 | 29.9 |
| MemTree | Deeper Tree | 18.7 | 31.2 | 23.3 | 30.9 |
| Mem0 | Default | 3.2 | 6.2 | 9.3 | 16.5 |
| Mem0 | Graph Store | 3.0 | 6.5 | 8.3 | 15.9 |

가벼운 압축은 LoCoMo의 조합 추론은 지켜도 LongMemEval의 정확한 세부 일치에서 신뢰할 수 없게 된다. Deeper Tree는 Flat-biased 대비 개선이 미미하고 Mem0의 Graph Store 변형은 Default보다 오히려 낮다. Finding 6(Representation Granularity)은 계층이 접근성을 높일 뿐 표현 단계에서 제거된 정보를 되살리지는 못한다고 말한다.

**추출(M2, Table 4).** O9(Coverage-Preserving Extraction)은 커버리지를 보존하는 쓰기 시점 추출이 사실 retrieval과 후단 추론 사이에서 가장 안정적인 균형을 준다고 본다.

| 시스템 | 변형 | LoCoMo EM | LoCoMo Ans. F1 | LongMemEval Substr. EM | LongMemEval ROUGE-L F1 |
|---|---|---|---|---|---|
| MemoChat | Heuristic Topic | 23.0 | 33.5 | 10.7 | 18.6 |
| MemoChat | LLM Topic | 22.5 | 34.4 | 7.3 | 15.9 |
| MemOS | Fast Memorize | 25.5 | 40.8 | 20.7 | 26.1 |
| MemOS | Fine Memorize | 2.5 | 5.0 | 22.3 | 30.2 |
| LightMem | User-Only Raw | 24.2 | 38.9 | 26.0 | 31.4 |
| LightMem | Hybrid Raw | 25.5 | 39.7 | 25.3 | 31.4 |

더 넓고 덜 선별적인 추출이 후단 답변 가능성에 필요한 컨텍스트를 잘 보존한다. 보수적 topic 묶음은 이어지는 맥락을 쪼개거나 짧은 여담을 고립시킬 위험이 낮고, 가벼운 memorize는 나중에 조합해야 하는 세부를 남기며, user와 assistant turn을 함께 담으면 user만 볼 때 놓치는 날짜나 다듬어진 표현 같은 단서가 보존된다. Finding 7(Late Filtering Principle)은 세밀한 LLM 기반 추출이 어휘 수준 사실 retrieval에서 소폭 정밀도를 얻더라도 multi-hop 추론을 크게 떨어뜨릴 수 있다고 정리한다.

**retrieval과 라우팅(M3, Table 5).** O10(Planning and Fusion)은 명시적 planning과 균형 잡힌 융합이 가장 크게 개선한다고 본다.

| 시스템 | 변형 | LoCoMo Ans. F1 | LoCoMo Recall | LongMemEval Substr. EM | LongMemEval ROUGE-L F1 |
|---|---|---|---|---|---|
| A-MEM | Hybrid-Balanced | 24.6 | 49.9 | 27.5 | 25.9 |
| A-MEM | Hybrid Sparse-Leaning | 23.0 | 44.3 | 24.3 | 22.8 |
| SimpleMem | No Planning | 18.7 | 86.4 | 17.0 | 22.9 |
| SimpleMem | Planning Only | 20.7 | 90.6 | 21.7 | 27.9 |
| SimpleMem | Planning + Reflect | 20.0 | 88.6 | 21.3 | 26.1 |

중간 정도의 융합이 sparse 쪽으로 기운 융합보다 답 품질과 관련성을 함께 지킨다. 명시적 planning은 직접 retrieval보다 일관되게 낫지만 planning 위에 reflection을 더하면 이득이 없고 오히려 라우팅 결정을 약화시킬 수 있다. Finding 8(Retrieval Strategy Guidance)은 경로가 이미 정해진 뒤의 추가 숙고가 주로 오버헤드만 늘린다고 정리한다.

**유지(M4, Figure 12).** MemoChat의 기본 다중 topic 통합 대 Topic1(창마다 단일 topic 요약 강제), MemoryOS의 기본 즉시 통합 대 Delayed-Flush(백엔드 쓰기 전 short-term 버퍼 확대) 대 Conservative-Merge(topic 유사도 임계 상향)를 비교한다.

| 설정 | LoCoMo Ans. F1 | LoCoMo Substring EM |
|---|---|---|
| Long Context (Default) | 21.3 | 23.7 |
| MemoryOS (Default) | 23.2 | 22.4 |
| MemoryOS (Conservative-Merge) | 23.5 | 22.8 |
| MemoryOS (Delayed-Flush) | 20.6 | 19.5 |
| MemoChat (Default) | 16.6 | 18.4 |
| MemoChat (Topic1) | 16.2 | 16.8 |

O11(Conservative Consolidation)은 보수적 통합이 지연 flush나 과도하게 거친 요약보다 답 관련 메모리를 잘 지킨다고 본다. Long Context가 Substring EM 23.7로 이 그림에서 가장 높아 raw 컨텍스트가 정확한 표현 보존에는 여전히 유리하다. Finding 9(Maintenance Design Principle)는 보수적 통합이 turn 사이 연결을 지키고, 지연 flush는 질의 시점에 최근 근거를 조각난 상태로 남기고, 과도하게 거친 요약은 드물지만 유용한 단서를 가린다고 정리한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문 자체가 진단에 가깝고 한계는 agent-native 메모리 시스템이 아직 준비되지 않았다는 결론으로 수렴한다. 어떤 단일 메모리 형태도 만능이 아니다. 강건성은 보편 표현이 아니라 적절한 추상화 수준에서 올바른 근거를 보존하는 데서 온다. 구조화 비용이 정확도로 되돌아온다는 보장이 없다. 의미 통합은 시간 순서 단서를 훼손할 수 있고 추상화 층마다 정보 손실이 쌓인다.

평가 자체의 한계도 있다. taxonomy에 오른 14개 시스템 가운데 MEM1과 Mem0_g는 end-to-end 성능이 보고되지 않고, MemAgent는 LongMemEval에만 등장해 커버리지가 부분적이다. RQ2와 RQ5는 8개 시스템, RQ3의 갱신 비교는 11개 시스템으로 범위가 각기 다르다. 관찰 번호도 O3이 비어 있고 O1이 RQ1과 RQ2에 두 번 쓰인다.

제시하는 방향은 지역적 유지가 전역 재조직보다 비용 효율이 높다는 관찰에서 나온다. revisability를 표현 단계에 내장하고, 질의 시 선택성을 워크로드 병목에 맞추고, LLM 스케일은 grounding이 성공한 뒤 답 표현을 다듬는 데 쓰라는 것이 실무 지침이다. 저자들은 테스트베드와 평가 프레임워크를 공개하겠다고 밝혔다.

## 6. 관련 연구 (Related Work)

- **성능이 보고된 12개 시스템**: MemoChat, Mem0, MemAgent, MemTree, Zep, Cognee, LightMem, SimpleMem, MemOS, MemoryOS, A-MEM, Letta(MemGPT). 각각 R, S, Q, U 조합이 다른 대표 아키텍처다.
- **taxonomy에만 오른 시스템**: MEM1, Mem0_g. 표현과 유지 설계 사례로 3절에 등장하지만 4절 이후 성능 그림에는 없다. MemoryBank와 MemoRAG도 Figure 1과 3절 서술에만 나온다.
- **선행 벤치마크**: LoCoMo, LongMemEval(MemoryAgentBench), LongBench, LifeLongAgentBench(DB-Bench), MemBench. 이 논문은 앞의 넷을 통일 테스트베드로 묶었다.
- **데이터 관리 관점**: Guoliang Li 등의 "LLM for Data Management"(VLDB 2024), RAG와 데이터 관리의 접점을 다룬 SIGMOD Record 2025 논문, 데이터 시스템을 에이전트 우선으로 재설계하자는 CIDR 2026 논문이 방법론적 배경이다.
- **메모리 서베이**: "Memory in the Age of AI Agents"(2025), "Memory for Autonomous LLM Agents"(2026), "LLM Agent Memory: A Survey from a Unified Representation"(2026)이 인지 taxonomy와 에이전트 아키텍처 관점의 선행 정리다.
- **인용된 실무 자료**: Anthropic의 "Effective context engineering for AI agents"(2025)를 context engineering 정의 근거로 인용하고, Claude Code와 Microsoft Copilot Memory, Google ADK Memory, OpenAI Agents SDK 문서를 산업 사례로 든다.

## 7. 용어집 (Glossary)

- **agent memory system**: 추론 한 단계를 넘어 누적 상태를 유지하고 이후 추론과 행동에서 접근 가능하게 만드는 지속 데이터 관리 시스템. 이 논문은 $\langle R, S, Q, U \rangle$ 튜플로 형식화한다.
- **R, S, Q, U 네 모듈**: 표현과 저장(Representation and Storage), 추출(Extraction), retrieval과 라우팅(Retrieval and Routing), 유지(Maintenance). 논문 taxonomy의 네 모듈이다.
- **evidence distance gap**: 질의가 속한 마지막 세션과 그 답을 뒷받침하는 가장 이른 근거 사이의 세션 거리. 장기 retrieval 정확도를 재는 기준이며 1~5부터 26~31까지 6구간으로 나눈다.
- **multi-versioning**: 옛 사실을 물리 삭제하지 않고 유효 플래그와 timestamp로 무효 표시해 이력을 보존하는 유지 방식.
- **semantic consolidation**: LLM이 중복 주장을 합쳐 dense 요약으로 만드는 유지 연산. 시간 순서 단서를 훼손할 위험이 있다.
- **hallucinations of the past**: 수명 관리가 없어 낡거나 무효가 된 사실을 그대로 돌려주는 오류를 논문이 부른 이름.
- **revisability**: 나중에 들어온 사실이 같은 entity나 event에 묶여 이전 값을 수정할 수 있는 표현 속성. Finding 3의 핵심 설계 권고다.
- **Normalized Utility**: LoCoMo와 LongMemEval의 답 품질 지표 6개를 min-max 정규화해 평균한 값. RQ5의 비용 대 효용 frontier에서 세로 기준이다.
- **Sequential Context / Structural Topological / Multi-Paradigm Hybrid**: taxonomy가 14개 시스템을 묶은 세 아키텍처 계열.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 에이전트 메모리 시스템의 대표 실행 워크플로 네 가지 | caption-region | ★ wiki 권장 (architecture) |
| tab01 | 4 | 에이전트 메모리 시스템 taxonomy, 14개 시스템과 네 모듈 | table-region | ★ wiki 권장 (핵심 기여) |
| fig02 | 3 | 메모리 논리 표현 세 가지 | caption-region | ★ wiki 권장 (method R) |
| fig03 | 4 | 메모리 물리 저장 세 가지 | caption-region | ★ wiki 권장 (method R) |
| fig04 | 5 | 메모리 추출 세 가지 | manual | ★ wiki 권장 (method S) |
| fig05 | 5 | 메모리 retrieval과 라우팅 다섯 가지 | caption-region | ★ wiki 권장 (method Q) |
| fig06 | 6 | 메모리 유지 네 가지 | caption-region | ★ wiki 권장 (method U) |
| fig07 | 8 | 12개 시스템과 baseline 2종의 태스크 성능 | caption-region | ★ wiki 권장 (result RQ1) |
| fig08 | 8 | LoCoMo Recall@k와 evidence distance gap별 변화 | manual | ★ wiki 권장 (result RQ2) |
| fig11 | 11 | 운영 비용, 지연 대 효용 frontier와 지연 heatmap | caption-region | ★ wiki 권장 (result RQ5) |
| fig09 | 9 | LLM backbone 4종 교체 ablation | caption-region | (선택, RQ3 상세) |
| fig10 | 10 | 장기 지평 안정성 세 관점 | caption-region | (선택, RQ4 상세) |
| fig12 | 12 | 유지 전략 ablation | caption-region | (선택, 컴포넌트 상세) |
| tab02 | 9 | 메모리 갱신 설정 강건성 | table-region | (선택, RQ3 수치) |
| tab03 | 11 | 표현과 저장 모듈 ablation | table-region | (선택, 컴포넌트 수치) |
| tab04 | 12 | 추출 전략 ablation | table-region | (선택, 컴포넌트 수치) |
| tab05 | 12 | retrieval과 라우팅 모듈 ablation | table-region | (선택, 컴포넌트 수치) |

위 표의 `추천` 열은 최초 큐레이션 시점 판단을 그대로 둔다. 다만 fig03의 실제 크롭은 같은 페이지의 Table 1 전체와 본문 단락을 함께 담고 있어 tab01과 내용이 겹친다. 그래서 frontmatter에서는 `curated: false`로 내리고 wiki 본문에는 넣지 않았다. 정밀 재크롭 후보 좌표는 `--bbox fig03=4:0.485,0.305,0.910,0.470`이다.
