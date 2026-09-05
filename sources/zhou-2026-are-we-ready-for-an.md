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
    caption: "에이전트 memory system의 전형적 실행 워크플로 — 스트리밍 로그·계층 티어·knowledge graph·멀티패러다임 하이브리드 4계열"
    page: 1
    bbox_norm: [0.5115, 0.2971, 0.9198, 0.5292]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig02.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig02.png
    caption: "메모리 표현 방식 — 토큰 시퀀스·graph/tree 토폴로지·이종 복합"
    page: 3
    bbox_norm: [0.5102, 0.1001, 0.9214, 0.2846]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig03.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig03.png
    caption: "메모리 물리 저장 방식 — in-context register·단일 엔진·이종 멀티 엔진"
    page: 4
    bbox_norm: [0.0803, 0.0699, 0.9197, 0.4801]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig04.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig04.png
    caption: "메모리 추출 방식 — raw 시퀀스 연결·schema-free 의미 추출·schema 제약 구조화 추출"
    page: 5
    bbox_norm: [0.0602, 0.0874, 0.4998, 0.4126]
    strategy: manual
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig05.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig05.png
    caption: "메모리 검색·라우팅 방식 — attention 기반·의미 기반·subgraph 순회·agentic 라우팅·다단 하이브리드"
    page: 5
    bbox_norm: [0.5103, 0.0983, 0.9158, 0.3949]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig06.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig06.png
    caption: "메모리 유지 방식 — timestamp 다중 버전·용량 기반 물리 축출·LLM 의미 통합·파라메트릭 최적화"
    page: 6
    bbox_norm: [0.5097, 0.0986, 0.9183, 0.4177]
    strategy: caption-region
    curated: true
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig07.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig07.png
    caption: "LoCoMo·LongMemEval·DB-Bench에서 12개 memory system의 태스크 성능 비교"
    page: 8
    bbox_norm: [0.0876, 0.0837, 0.9177, 0.3513]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig08.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig08.png
    caption: "LoCoMo retrieval 결과 — Recall@k와 evidence distance gap에 따른 Recall@10 감쇠"
    page: 8
    bbox_norm: [0.4902, 0.3524, 0.9398, 0.7276]
    strategy: manual
    curated: true
  - id: fig09
    label: Figure 9
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig09.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig09.png
    caption: "LLM backbone 교체에 대한 ablation"
    page: 9
    bbox_norm: [0.5097, 0.0534, 0.9219, 0.1872]
    strategy: caption-region
    curated: false
  - id: fig10
    label: Figure 10
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig10.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig10.png
    caption: "장기 지평 안정성 — LongBench context 길이 버킷별 강건성"
    page: 10
    bbox_norm: [0.5097, 0.0981, 0.9219, 0.3274]
    strategy: caption-region
    curated: false
  - id: fig11
    label: Figure 11
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig11.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig11.png
    caption: "memory system별 운영 비용 — 인덱스 구축 시간·질의 지연"
    page: 11
    bbox_norm: [0.0716, 0.0981, 0.4903, 0.2309]
    strategy: caption-region
    curated: true
  - id: fig12
    label: Figure 12
    kind: figure
    file: assets/zhou-2026-are-we-ready-for-an/fig12.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/fig12.png
    caption: "유지 전략 ablation — MemoryOS 보수적 통합 대 지연 flush"
    page: 12
    bbox_norm: [0.5097, 0.2177, 0.9219, 0.3507]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab01.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab01.png
    caption: "에이전트 memory system taxonomy — 4개 모듈 기준 14개 시스템 분류표"
    page: 4
    bbox_norm: [0.0803, 0.0699, 0.9197, 0.3242]
    strategy: table-region
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab02.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab02.png
    caption: "메모리 업데이트 설정에 대한 강건성 — temporal knowledge update·temporal reasoning"
    page: 9
    bbox_norm: [0.0828, 0.0695, 0.9208, 0.1637]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab03.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab03.png
    caption: "표현·저장 메커니즘 ablation"
    page: 11
    bbox_norm: [0.5097, 0.1275, 0.9193, 0.2537]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab04.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab04.png
    caption: "메모리 추출 전략 ablation"
    page: 12
    bbox_norm: [0.0847, 0.1326, 0.9208, 0.3164]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhou-2026-are-we-ready-for-an/tab05.png
    raw: raw/papers/zhou-2026-are-we-ready-for-an-figures/tab05.png
    caption: "검색·라우팅 메커니즘 ablation"
    page: 12
    bbox_norm: [0.5155, 0.1326, 0.9208, 0.3164]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

LLM 에이전트의 memory를 데이터 관리 시스템으로 보고 표현, 추출, 검색, 유지 네 모듈로 분해해 12개 대표 memory system을 5개 workload와 11개 데이터셋에서 통합 벤치마크한 실험 연구다. 결론은 "만능 아키텍처는 없다" — 성능은 memory 구조가 workload의 병목과 얼마나 맞물리는지에 달렸다.

## 1. 자료 정보 (Document Information)

- **제목**: Are We Ready For An Agent-Native Memory System?
- **저자**: Wei Zhou, Xuanhe Zhou(교신저자), Shaokun Han, Hongming Xu, Guoliang Li, Zhiyu Li, Feiyu Xiong, Fan Wu
- **소속**: Shanghai Jiao Tong University, Tsinghua University, MemTensor (Shanghai)
- **출처**: arXiv:2606.24775v1 [cs.CL], 2026-06-23, 14페이지
- **코드·테스트베드**: `github.com/OpenDataBox/MemoryData`, taxonomy는 `github.com/OpenDataBox/awesome-agent-memory`
- **성격**: 서베이 + 벤치마크. 데이터베이스 커뮤니티 관점에서 에이전트 memory를 다룬 systems 논문이다.

이 논문이 던지는 질문은 제목 그대로다. memory 연구가 단순 retrieval-augmented 기법에서 저장하고 검색·갱신하며 통합·수명까지 관리하는 데이터 관리 시스템으로 빠르게 커졌지만 정작 평가는 아직 F1·BLEU 같은 end-to-end 태스크 성공률에 머물러 시스템 내부를 블랙박스로 둔다. 운영 비용, 모듈 간 아키텍처 트레이드오프, 동적 갱신 하의 강건성 같은 시스템 수준의 관심사가 비어 있다는 문제의식에서 출발한다.

## 2. 주요 기여 (Key Contributions)

논문은 네 가지를 내세운다.

**기술 분해와 taxonomy.** 에이전트 memory system을 네 모듈로 쪼갠다. agent memory system은 세션 하나를 넘어 지속되는 정보를 저장하고 관리하는 인프라를 뜻한다. 논문은 이를 $M_{sys} = \langle R, S, Q, U \rangle$ 튜플로 형식화한다. R은 표현과 저장, S는 추출, Q는 검색과 라우팅, U는 유지다. 각 모듈마다 설계 원리별로 하위 분류를 세워 시스템 간 비교의 축을 만든다.

**통합 end-to-end 평가.** 시간 오버헤드 추적까지 통일한 공정한 테스트베드에서 5개 workload와 11개 데이터셋에 걸쳐 12개 대표 memory system을 평가한다. 태스크 효과성(RQ1), retrieval 충실도(RQ2), 동적 갱신 강건성(RQ3), 장기 지평 안정성(RQ4), 운영 비용(RQ5) 다섯 관점에서 본다.

**세밀한 컴포넌트 평가.** 네 모듈 프레임워크를 기준으로 삼아 한 번에 한 모듈만 바꾼 통제 변형을 만들어 각 기법이 표현 충실도·라우팅 정밀도·갱신 정확도에 미치는 개별 영향을 분리 측정한다.

**통찰 정리.** 실험에서 비용-성능 트레이드오프에 관한 발견 여섯 가지(아래 4절)를 뽑아 진정한 agent-native memory를 향한 방향을 제시한다.

기존 벤치마크와의 차별점은 명확하다. 앞선 평가들은 대표 아키텍처를 통일된 workload에서 다루지 못했고(MemoChat·MemTree·LightMem 등 누락) 단면적인 end-to-end 지표에 의존했다. 인덱스 구축 시간이나 질의 지연 같은 운영 비용은 거의 재지 않았고 memory 역시 분해 가능한 데이터 관리 모듈이 아니라 하나의 블랙박스로 취급했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 memory의 두 축과 시스템 정의

에이전트가 다루는 정보는 대화 이력, 도구 실행 로그, 정제된 사실, 사용자 선호 등으로 다양하다. 논문은 인지과학 틀을 빌려 이를 두 축으로 정리한다. temporal 축에서는 진행 중인 세션의 휘발성 상태인 short-term과 세션을 넘어 지속되는 long-term으로 나뉜다. functional 축에서 long-term은 개별 사건인 episodic memory, 추상화된 사실 지식인 semantic memory, 재사용 가능한 행동 전략인 procedural memory, 그리고 사용자 선호로 갈린다. episodic memory는 "언제 무슨 일이 있었다"를 사건 단위로 저장하는 층을 말한다.

이 논문은 태스크 특화 에이전트 프레임워크에서 memory가 보조 모듈로 붙는 경우가 아니라, memory 자체가 중심이 되는 시스템 수준 memory에 초점을 둔다. Mem0·Letta·Zep·A-MEM 같은 외부 memory system이 여기 해당한다. 에이전트는 이들에 능동적으로 쓰고 갱신하고 인덱싱하며 관련 컨텍스트를 추론 루프로 되돌린다.

### 3.2 네 모듈 taxonomy

**R — 표현과 저장.** 논리 표현은 이산 토큰이나 연속 vector 같은 단순 원시형부터 knowledge graph·tree·복합 토폴로지까지 걸친다. 물리 저장은 휘발성 in-context register, 단일 엔진 전용 DB, 이종 멀티 엔진 백엔드로 나뉜다. MemoChat은 JSON 메모를 LLM 컨텍스트 안에 둔다. Mem0·MemTree는 vector store를 쓰고 Zep·Mem0_g는 Neo4j에 Cypher로 그래프를 굳힌다. SimpleMem·MemoryOS·MemOS는 dense 임베딩·BM25·SQL을 함께 쓰는 멀티 엔진이다.

**S — 추출.** 이질적 입력 스트림을 논리 memory 원시형으로 바꾸는 파이프라인이다. raw 시퀀스를 그대로 잇는 방식, schema-free 의미 추출, schema 제약 구조화 추출 셋으로 갈린다. MEM1·MemAgent는 연결형, Mem0·LightMem은 schema-free, Zep·Mem0_g·Cognee는 entity-relation triplet을 뽑는 schema 제약형이다.

**Q — 검색과 라우팅.** 질의 컨텍스트에 맞는 memory 부분집합을 골라 인덱스를 훑는 함수다. 다섯 갈래가 있다. transformer의 self-attention을 그대로 검색 엔진으로 쓰는 native attention 기반(MEM1·MemAgent), vector 인덱스에 KNN을 도는 의미 기반 dense retrieval(Mem0·LightMem·MemTree), knowledge graph의 관계 간선을 타는 topological subgraph 순회(Mem0_g·A-MEM), LLM 자신이 질의 계획자로 tool-call을 뽑는 autonomous agentic 라우팅(MemoChat·SimpleMem), 그리고 필터→의미→그래프를 잇는 다단 하이브리드 실행(Zep·MemOS·MemoryOS)이다.

**U — 유지.** memory 항목의 수명을 관리하는 규칙으로, 세 하위 연산으로 쪼개진다. 충돌 해소와 버전 관리는 timestamp 기반 multi-versioning으로 오래된 사실을 물리 삭제 없이 논리적으로 무효화한다. multi-versioning은 옛 사실을 지우지 않고 유효 플래그와 timestamp로 "지금은 안 맞음"만 표시해 이력을 보존하는 방식이다. Zep·Mem0_g가 대표적이다. 용량 관리는 FIFO·토큰 한계 같은 제약 기반 hard eviction(MEM1·MemAgent·Letta)이나 접근 빈도·시간 감쇠 점수 기반 축출(MemoryOS의 Heat score)로 무한 성장을 막는다. 의미 통합은 LLM이 중복 주장을 합쳐 요약하거나 tool-call로 CRUD를 실행한다.

### 3.3 RAG·컨텍스트 엔지니어링과의 구분

논문은 memory system을 RAG와 명시적으로 가른다. RAG는 대체로 상태 없는 읽기 전용 파이프라인인 반면, 에이전트 memory는 LLM의 가중치나 휘발성 context window와 분리된 채 지속되며 쓰기·갱신·라우팅을 능동으로 수행하는 데이터 관리 시스템이다. 잘못 설계된 memory를 쓰면 사실 모순, catastrophic forgetting, 감당 못 할 지연이 지속 실행 중에 터진다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가는 LoCoMo, LongMemEval(MemoryAgentBench), DB-Bench(LifeLongAgentBench), LongBench 등을 포함한 5개 workload와 11개 데이터셋에서 이뤄졌다. baseline은 Long Context와 Embedding RAG 둘이다. 발견은 여섯 갈래로 정리된다.

첫째, workload마다 강자가 다르다. 모든 시나리오를 지배하는 단일 아키텍처는 없다. 대화형 QA에서는 복합 하이브리드가 앞서고 graph 기반은 single-hop 사실 회상에 강하지만 temporal reasoning에서 약하다. LongMemEval의 LLM Judge 정확도에서 Zep이 48.0으로 최고, MemAgent가 3.7로 최저다. DB-Bench의 Task Success Rate에서는 Letta(MemGPT)가 61.6, MemoChat이 55.4로 앞선다. 효과적인 시스템은 답 생성 전에 근거 위치 파악을 외부화하기 때문에 LLM backbone을 바꿔도 강건하다.

둘째, 명시적 질의 계획과 균형 잡힌 하이브리드 검색이 관련성을 끌어올린다. 다만 retrieval 정확도는 근거와 질의 사이 temporal 거리가 멀어질수록 크게 떨어져 유사도 기반 검색의 한계를 드러낸다. SimpleMem은 Recall@1이 39.0으로 가장 높지만 A-MEM과 MemTree는 예산이 커지면 Recall@5/@10에서 각각 69.5/85.9, 59.7/80.5로 앞서고 거리가 멀어져도 훨씬 안정적이다. 강한 retrieval은 top-1 순위 문제가 아니라 낡고 흩어진 근거를 모으는 근거 완성 문제라는 뜻이다.

셋째, 동적 갱신에는 graph 기반이 가장 믿을 만하다. 사실 추출 플러그인과 append-only 저장은 표적 덮어쓰기에 약하다. 수명 관리가 없는 시스템은 낡은 사실을 그대로 돌려줘 "과거의 환각"을 낳는다. Table 2의 temporal knowledge update에서 Zep(44.4)·Cognee(37.8)가 Substring EM 상위다.

넷째, 장기 지평에서 append-only 저장은 급격히 무너진다. 시간 의존 질의에서는 오히려 raw long-context retrieval이 대다수 memory 기반 접근을 앞선다. 표준 의미 통합이 결정적인 시간 순서 단서를 파괴하기 때문이다. LongBench에서 SimpleMem은 Short→Medium 버킷에서 35.2→34.9로 거의 흔들리지 않지만 Long Context는 42.6→19.0으로 급락한다.

다섯째, 고도로 구조화된 시스템은 비쌀 뿐 그만큼 정확하지 않다. 인덱스 구축 시간과 질의 지연이 경량 저장보다 수십~수백 배 크지만 비례하는 정확도 향상은 일관되게 나오지 않는다.

여섯째, 개별 컴포넌트는 추상화 층마다 정보를 버린다. 압축과 요약, 사실 추출을 거칠수록 정보가 점진적으로 깎이고 세밀한 LLM 기반 추출이 오히려 해가 되기도 한다.

세부 Finding을 보면, retrieval 충실도는 관련 memory 하나를 일찍 띄우기보다 시간적으로 먼 근거까지 모으도록 memory 구조를 명시적으로 조직하는 데 달렸다(O1). 갱신 후 동작의 신뢰성은 모델 용량이 아니라 파이프라인 설계 문제다(Finding 3: revisability를 표현에 심고 질의 시 선택성을 workload 병목에 맞추며 LLM 스케일은 grounding에 성공한 뒤에야 의미가 있다). 유지에서는 보수적 통합이 지연 flush나 과도한 요약보다 답 관련 memory를 잘 지킨다(O11·Finding 9). MemoryOS의 Conservative-Merge 변형은 Ans. F1을 23.2→23.5, Substr. EM을 22.4→22.8로 올리는 반면, flush를 미루면 같은 시스템이 20.6/19.5로 내려간다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문 자체가 진단에 가깝다. 한계는 곧 agent-native memory가 아직 준비되지 않았다는 결론으로 수렴한다. 어떤 단일 memory 형태도 만능이 아니다. 강건성은 보편 표현이 아니라 적절한 추상화 수준에서 올바른 근거를 보존하는 데서 온다. 구조화 비용이 정확도로 되돌아온다는 보장은 없다. 의미 통합은 시간 순서 단서를 훼손할 수 있고 추상화 층마다 정보 손실이 쌓인다.

제시하는 방향은 지역적 유지가 전역 재조직보다 비용 효율이 높다는 관찰에서 나온다. revisability를 표현 단계에 내장하고 질의 시 선택성을 workload 병목에 맞추며 LLM 스케일은 grounding이 성공한 뒤 답 표현을 다듬는 데 쓰라는 것이 실무 지침이다. 저자들은 테스트베드와 평가 프레임워크를 공개하겠다고 밝혔다.

## 6. 관련 연구 (Related Work)

- **평가 대상 시스템**: MemGPT(Letta), Mem0·Mem0_g, Zep, A-MEM, MemoChat, MemTree, Cognee, LightMem, SimpleMem, MemOS, MemoryOS, MEM1, MemAgent. 각각 R·S·Q·U 조합이 다른 대표 아키텍처다.
- **선행 벤치마크**: LoCoMo, LongMemEval(MemoryAgentBench), LongBench, LifeLongAgentBench(DB-Bench). 이 논문은 이들을 통일 테스트베드로 묶었다.
- **데이터 관리 관점**: Guoliang Li 등의 "LLM for Data Management"(VLDB 2024), RAG와 데이터 관리 접점을 다룬 SIGMOD Record 등이 방법론적 배경이다.
- **wiki 내 관련 자료**: HippoRAG 2(RAG를 continual memory로 확장), MIA·TaskMem(학습 가능한 memory policy), Effective Context Engineering(컨텍스트 예산 관점). 아래 wiki 페이지에서 상호 링크한다.

## 7. 용어집 (Glossary)

- **agent memory system**: 세션 하나를 넘어 지속되는 정보를 저장·관리하는 인프라. 이 논문은 $\langle R, S, Q, U \rangle$ 튜플로 형식화한다.
- **R·S·Q·U 네 모듈**: 표현과 저장(Representation & Storage), 추출(Extraction), 검색과 라우팅(Retrieval & Routing), 유지(Maintenance). 논문 taxonomy의 네 축.
- **evidence distance gap**: 질의가 속한 마지막 세션과 그 답을 뒷받침하는 가장 이른 근거 사이의 세션 거리. 장기 retrieval 정확도를 재는 축이다.
- **multi-versioning**: 옛 사실을 물리 삭제하지 않고 유효 플래그·timestamp로 무효 표시해 이력을 보존하는 유지 방식.
- **semantic consolidation**: LLM이 중복 주장을 합쳐 dense 요약으로 만드는 유지 연산. 시간 순서 단서를 훼손할 위험이 있다.
- **"hallucinations of the past"**: 수명 관리가 없어 낡거나 무효가 된 사실을 그대로 돌려주는 오류를 논문이 부른 이름.
- **Sequential Context / Structural Topological / Multi-Paradigm Hybrid**: taxonomy가 시스템을 묶은 세 아키텍처 계열.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 4가지 memory 아키텍처 계열의 실행 워크플로 | caption-region | ★ wiki 권장 (architecture) |
| tab01 | 4 | 4모듈 기준 taxonomy 분류표 | table-region | ★ wiki 권장 (핵심 기여) |
| fig02 | 3 | 메모리 표현 방식 | caption-region | ★ wiki 권장 (method — R) |
| fig03 | 4 | 메모리 물리 저장 방식 | caption-region | ★ wiki 권장 (method — R) |
| fig04 | 5 | 메모리 추출 방식 | manual | ★ wiki 권장 (method — S) |
| fig05 | 5 | 메모리 검색·라우팅 방식 | caption-region | ★ wiki 권장 (method — Q) |
| fig06 | 6 | 메모리 유지 방식 | caption-region | ★ wiki 권장 (method — U) |
| fig07 | 8 | 12개 시스템 태스크 성능 비교 | caption-region | ★ wiki 권장 (result — RQ1) |
| fig08 | 8 | Recall@k + evidence distance 감쇠 | manual | ★ wiki 권장 (result — RQ2) |
| fig11 | 11 | 운영 비용 (인덱스·지연) | caption-region | ★ wiki 권장 (result — RQ5) |
| fig09 | 9 | LLM backbone ablation | caption-region | (선택 — RQ3 상세) |
| fig10 | 10 | 장기 지평 안정성 | caption-region | (선택 — RQ4 상세) |
| fig12 | 12 | 유지 전략 ablation | caption-region | (선택 — 컴포넌트 상세) |
| tab02 | 9 | 업데이트 강건성 | table-region | (선택 — RQ3 수치) |
| tab03 | 11 | 표현·저장 ablation | table-region | (선택 — 컴포넌트 수치) |
| tab04 | 12 | 추출 전략 ablation | table-region | (선택 — 컴포넌트 수치) |
| tab05 | 12 | 검색·라우팅 ablation | table-region | (선택 — 컴포넌트 수치) |
