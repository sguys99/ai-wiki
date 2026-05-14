---
title: "Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"
type: paper
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf
raw_filename: "li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf"
source_collection: external
source: li-2026-beyond-semantic-similarity-rethinking-retrieval.md
tags: [retrieval, agentic-search, RAG, vectorless, terminal-tools, grep, BrowseComp-Plus, BRIGHT, BEIR, deep-research]
authors: "Zhuofeng Li, Haoxiang Zhang, Cong Wei, Pan Lu, Ping Nie, Yi Lu, Yuyang Bai, Shangbin Feng, Hangxiao Zhu, Ming Zhong, Yuyu Zhang, Jianwen Xie, Yejin Choi, James Zou, Jiawei Han, Wenhu Chen, Jimmy Lin, Dongfu Jiang, Yu Zhang"
arxiv_id: "2605.05242"
---

## 요약 (Summary)

이 paper는 retrieval을 **retriever 설계 문제가 아니라 *interface* 설계 문제**로 재프레이밍한다. 핵심 주장은 단순하다 — 충분히 강한 agent에게 embedding model이나 vector index를 통해 corpus를 보여주는 것은 사실상 *저해상도 압축*이고, agent가 raw corpus에 `grep`·`find`·`bash`로 직접 접근하면 더 좋은 검색이 가능하다. 저자들은 이 패러다임을 **Direct Corpus Interaction (DCI)** 으로 정식화하고, 두 개의 reference scaffold — minimal한 **DCI-Agent-Lite**(Pi + GPT-5.4 nano, bash+read만)와 강력한 **DCI-Agent-CC**(Claude Code + Sonnet 4.6) — 로 광범위하게 검증한다.

결과는 강력하다. BrowseComp-Plus(830문항, 100K corpus)에서 동일 Sonnet 4.6 backbone 비교 시 Qwen3-Embed-8B retriever 69.0% → DCI 80.0% (+11pp), cost는 $1,440 → $1,016 (−29.4%). 6개 multi-hop QA 평균 52.3 → 83.0 (+30.7pp). BRIGHT/BEIR 6개 IR ranking 평균 NDCG@10 47.0 → 68.5 (+21.5pp). DCI-Agent-Lite는 GPT-5.4 nano만으로도 BrowseComp-Plus 62.9% / $93 — o3+retriever(66%/$740)에 근접하며 cost는 $647 절감.

가장 흥미로운 발견은 RQ2-RQ3 분석이다. DCI가 이기는 이유는 *gold document를 더 잘 surface해서가 아니다*. 동일 subset(n=100)에서 mean coverage는 retriever 56.7 vs DCI 28.0으로 *오히려 낮은데*, localization 점수는 21.7 vs **48.4**로 두 배 이상. CC-win 176건 중 142건은 retriever도 gold를 surface한 상태였고, DCI는 그 evidence를 fine-grained local inspection·verification으로 *변환*하는 데서 이긴다. 저자들은 이를 "retrieval interface resolution"이라 부른다.

## 주요 기여 (Key Contributions)

- **새 retrieval paradigm 정식화**: embedding/index 0개, `grep | grep | head` 같은 CLI pipeline composition을 search primitive로. Retriever-mediated access(Figure 2 좌)와 DCI(Figure 2 우)의 대비가 paper 전체의 conceptual axis.
- **두 reference scaffold**:
  - **DCI-Agent-Lite** — Pi 기반 minimal harness, `bash` + `read`만 노출, GPT-5.4 nano. Runtime context management L0~L4 (truncation 50K/20K, compaction 240K threshold, model-generated summarization).
  - **DCI-Agent-CC** — Claude Code 기본 구성에서 web-search/web-fetch/subagent 비활성화. Sonnet 4.6 backbone, Tool 분포는 Bash 62.4% / Grep 33.0% / Read 1.5%.
- **3 benchmark family · 6 ablation**: agentic search(BrowseComp-Plus), multi-hop QA(NQ/Trivia/Bamboogle/Hotpot/2Wiki/MuSiQue), IR ranking(BRIGHT-4 + BEIR-2) 전부에서 baseline 능가. RQ1-RQ6 ablation으로 (i) interface 효과를 도구 풍부함과 분리하고, (ii) corpus scaling envelope를 정량화하고, (iii) context-management policy의 비단조성(sweet spot L3)을 보임.
- **"Retrieval interface resolution" 개념**: Coverage(broad reach)와 localization(within-document precision)을 분리 측정하는 trajectory-level 지표. DCI가 "더 많은 정답을 찾는다"는 직관과 달리 "찾은 정답에서 더 많이 짜낸다"는 메커니즘을 데이터로 보임.

## 방법론 및 아키텍처 (Methodology and Architecture)

### Retriever-mediated vs DCI

두 인터페이스의 차이는 단순히 도구가 아니라 **observation space**의 차이다.

| 측면 | Retriever-mediated | DCI |
|---|---|---|
| Index | 사전 chunking + embedding/BM25 indexing | 없음 |
| Observation | top-k snippet + doc id | tool output (matched span, file path, counts, metadata) |
| Semantic understanding 위치 | Retriever (upward into index) | LLM (downward to agent) |
| Composability | API call 단위 | bash pipeline (grep | grep | head 등) |
| Local corpus evolution | re-index 필요 | 즉시 반영 (파일 시스템 그대로) |

### Search primitives

- **Corpus exploration**: `find`, `ls`, `glob` — 디렉토리 구조 스캔
- **Exact / regex matching**: `grep`, `rg` — lexical pattern
- **Local inspection**: `head`, `tail`, `sed`, `read` — 매치 주변 컨텍스트
- **Composition**: pipe로 lexical conjunction(`grep 'foo' file | grep 'bar'`), weak clue 결합(`find . | grep 'report' | grep '2024'`), hypothesis 검증(`grep -n 'keyword' file | head`).

### Runtime context management (DCI-Agent-Lite, Figure 3)

장기 trajectory에서 tool output 누적이 context window를 넘기지 않도록 3-tier 메커니즘:

1. **Truncation** — tool result를 N자(L1=50K, L2~L4=20K)로 캡.
2. **Compaction** (L3+) — accumulated tool output > 240K chars 시 LLM 호출 없이 오래된 tool turn을 placeholder로 교체, 최근 12 turn만 verbatim 유지.
3. **Summarization** (L4) — compacted history를 model 생성 summary로 추가 압축, 최근 20K token 보존, 연속 3회 실패 시 중단.

핵심 통찰: 이 layer는 retrieval *interface*는 건드리지 않고 "agent의 working context에 evidence가 얼마나 살아남는가"만 조절. 그럼에도 L0~L4 ablation에서 accuracy가 72→77→69→77→73 비단조 — verbatim 보존이 능사가 아니다.

### Coverage & Localization 지표 (§3.3)

Gold document set D*(q)에 대해 trajectory τ가 surface한 부분집합 M(q, τ) ⊆ D*(q):

- **coverage_any** = 1[|M| ≥ 1], **coverage_mean** = |M|/|D*|, **coverage_all** = 1[|M| = |D*|]
- 각 observation o_t는 후보 (d_{t,i}, σ_{t,i}) 셋을 노출하며 σ_{t,i}는 노출된 snippet, ℓ_{t,i} = |σ_{t,i}|
- ν(x) = ⌈x/c_seg⌉ (character → segment count 변환), ψ(a; b) = max(1 − log a / log b, 0)
- **seg-score**(d_{t,i}; d*) = ψ(ν(ℓ_{t,i}); ν(|d*|)) — snippet이 full document에 비해 얼마나 작은 segment인가
- **localization**(q, τ) = avg over surfaced gold d* of max_{aligned candidates} seg-score

해석: localization은 "gold를 찾았다 *치고*, 얼마나 좁은 evidence span으로 좁혔는가" — within-document precision.

## 결과 (Results)

### 4.1 Agentic Search — BrowseComp-Plus (830 문항)

| Method | Backbone | Accuracy | Cost ($) | Δ |
|---|---|---|---|---|
| BM25 + retriever-agent | GPT-5.2 | ~42 | — | — |
| Qwen3-Embed-8B retriever | o3 | 66.0 | 740 | baseline |
| Qwen3-Embed-8B retriever | GPT-5 | 71.7 | — | — |
| Qwen3-Embed-8B retriever | Sonnet 4.6 | 69.0 | 1,440 | — |
| **DCI-Agent-Lite** | GPT-5.4 nano | **62.9** | **93** | $647 절감 |
| **DCI-Agent-CC** | Sonnet 4.6 | **80.0** | **1,016** | +11.0pp, −$424 |

DCI-Agent-CC가 모든 retriever-agent baseline 능가 + GPT-5+retriever(71.7%)도 +8.3pp.

### 4.2 Knowledge-Intensive QA (Table 2)

| Method | NQ | Trivia | Bam. | Hotpot | 2Wiki | MuSiQue | Avg |
|---|---|---|---|---|---|---|---|
| R1-Searcher-7B | 58 | 50 | 54 | 46 | 40 | 24 | 45.3 |
| Search-R1-32B | 56 | 46 | 52 | 44 | 50 | 32 | 46.7 |
| ZeroSearch-7B | 26 | 30 | 18 | 10 | 18 | 4 | 17.7 |
| VerlTool-Search-7B-DAPO | 56 | 44 | 32 | 50 | 32 | 12 | 37.7 |
| ASearcher-Local-14B | 56 | 58 | 62 | 58 | 56 | 24 | 52.3 |
| **DCI-Agent-Lite** | 72 | 84 | 72 | 72 | 68 | 40 | **68.0** (+15.7) |
| **DCI-Agent-CC** | 78 | 96 | 80 | 88 | 82 | 74 | **83.0** (+30.7) |

Multi-hop이 어려울수록 격차 폭증: MuSiQue +50, HotpotQA +30, 2Wiki +26.

### 4.3 IR Ranking — NDCG@10 (Table 3)

| Method | Bio | Earth | Econ | Robot | ArguAna | SciFact | Avg |
|---|---|---|---|---|---|---|---|
| BM25 | 18.9 | 27.2 | 14.9 | 13.6 | 31.5 | 15.8 | 20.3 |
| OpenAI text-emb-3-large | 23.3 | 26.7 | 19.5 | 12.8 | 58.1 | 58.1 | 33.1 |
| GTE-Qwen2-7B-Instruct | 30.6 | 36.4 | 17.8 | 13.2 | 62.7 | 75.3 | 39.3 |
| Rank-R1-14B | 31.2 | 38.5 | 21.2 | 22.6 | 31.3 | 72.2 | 36.2 |
| Rank1-32B | 49.7 | 35.8 | 22.0 | 22.5 | 57.6 | 74.8 | 43.7 |
| ReasonRank-32B | 58.2 | 48.9 | 36.6 | 33.9 | 28.7 | 75.5 | 47.0 |
| **DCI-Agent-Lite** | 60.0 | 50.8 | 32.3 | 42.4 | 81.9 | 72.7 | **56.7** (+9.7) |
| **DCI-Agent-CC** | **77.1** | **69.0** | **46.8** | **56.8** | **85.3** | **75.7** | **68.5** (+21.5) |

DCI-Agent-CC가 6개 데이터셋 *모두* 1위.

### 4.4 Mechanism analysis — DCI는 왜 이기는가? (Table 4)

| Method | tools | $/q | cov_any | cov_mean | cov_all | **Localization** | Acc |
|---|---|---|---|---|---|---|---|
| BM25 retriever | 19 | 0.053 | 63.0 | 42.8 | 17.0 | 23.5 | 32.0 |
| Qwen3-Embed-8B retriever | 18 | 0.050 | 74.0 | 56.7 | 28.0 | 21.7 | 45.0 |
| DCI-Agent-Lite L4 | 35 | 0.102 | 70.0 | **28.0** | 1.0 | **48.4** | **73.0** |

DCI의 mean coverage는 retriever의 절반인데도 localization이 2배+, accuracy +28pp. 즉 "더 많이 발견하지 않고 더 많이 짜낸다." DCI-Agent-CC win/loss 분석(176/76): CC-win 176건 중 *142건은 retriever-agent도 gold를 surface*했음에도 활용에 실패 — partial-chain 83건(0 < recall < 100), post-retrieval 59건(recall = 100이나 활용 실패).

### 4.5 Tool-set ablation (Table 5)

| Setting | tools | $/q | Acc |
|---|---|---|---|
| Qwen3-Embed-8B retriever | 18 | 0.050 | 45 |
| DCI-Agent-Lite **read + grep only** | 19 | **0.036** | **61** (+16) |
| DCI-Agent-Lite **open bash** | 35 | 0.102 | 73 (+12) |

**`read + grep` 두 도구로도 retriever를 +16pp** — 핵심은 도구 풍부함이 아니라 **인터페이스 자체**.

### 4.6 Corpus scaling (Figure 5)

100K → 200K → 400K corpus에서 avg tool calls 38.5 → 86.9 → 122.4, latency >2x, cost >2x, accuracy 51.1 → 37.5. 400K에서는 20예시가 max tool budget 도달로 강제 종료. **검색 깊이는 견디나 폭은 cost가 supra-linear** — DCI의 operating envelope.

### 4.7 Context management (Table 6)

| L | tools | latency(s) | $/q | Retained cov | Acc |
|---|---|---|---|---|---|
| L0 | 28.5 | 2226 | 0.072 | 26.9 | 72 |
| L1 | 29.0 | **1820** | 0.072 | **31.3** | 75 |
| L2 | 30.0 | 4413 | **0.059** | 27.2 | 69 |
| **L3** | 36.9 | 8712 | 0.111 | 27.0 | **77** |
| L4 | 35.4 | 4531 | 0.102 | 28.0 | 73 |

비단조 — verbatim 보존 ≠ 좋은 working state. L3(compaction)가 정확도 최고지만 L1(가벼운 truncation)이 evidence 보존 최고.

## 핵심 관찰 (Critical Observations)

- **"More coverage" ≠ "better accuracy"**. 이 paper의 가장 큰 컨셉적 기여. 평가자가 retriever를 비교할 때 흔히 recall@k에 집착하는데, DCI는 mean coverage가 낮음에도 이긴다. Coverage는 "광역 reach", localization은 "지역 정밀도" — agent search에서는 후자가 더 중요할 수 있다.
- **`read + grep` 두 줄로 retriever +16pp**. PageIndex(vectorless reasoning-based RAG)가 tree search로 한 일과 평행한 결과 — vector index 없이도 강한 LLM이 있으면 raw corpus 직접 검색이 경쟁력 있다. 차이는 PageIndex가 hierarchical structure를 사전 구축하는 반면 DCI는 사전 처리 *제로*.
- **Context-management의 비단조성**. L0 → L4가 무조건 좋지 않다. Selective forgetting이 long-horizon hypothesis revision에 도움 — agent의 RAG context window 관리가 향후 연구 포인트.
- **Failure mode**: 다중 홉 단서가 corpus에 explicit text로 *없으면* DCI도 hallucinate(Case 5b). 실패는 "exact match 가능한 단서 추출"이 핵심 변수.
- **Cost-aware Pareto**: Figure 1의 핵심 — DCI-Agent-Lite(GPT-5.4 nano)는 cost $93로 retriever+o3($740) 근처 정확도. DCI는 "frontier에서만 좋은" 방법이 아님.
- **Realistic deployment fit**: 로컬·이질·진화하는 corpus(Anthropic Claude Cowork, OpenClaw 등 agentic workspace)에 자연스럽게 부합 — re-indexing 없이 `grep`만 있으면 된다.

## 관련 페이지 (Related Pages)

- [[database/vectifyai-pageindex]] — **가장 가까운 패러다임 동료**. PageIndex도 "vectorless · reasoning-based RAG"를 표방하지만, DCI와 달리 hierarchical TOC tree를 사전 구축한다(`get_document`/`get_document_structure`/`get_page_content` 3-tool). DCI는 사전 처리 0, PageIndex는 사전 처리 (tree 구축) 있음. 둘 다 "강한 LLM + 가벼운 인터페이스가 vector DB 대안" 가설을 검증.
- [[overviews/lightrag-family-graph-rag-overview]] — Graph-based RAG 계열(LightRAG/RAG-Anything/LeanRAG). DCI는 이와 반대 방향: KG 사전 구축 없이 raw corpus 자체가 인터페이스. 비교축은 "사전 구조화 비용 vs runtime 검색 비용".
- [[database/guo-2025-rag-anything-all-in-one-rag]] — multimodal dual-graph로 modality 다양성을 KG에 흡수. DCI는 단일 modality(텍스트)에서 raw access로 갈음 — 두 접근의 응용 도메인이 다름.
- [[database/dsba-2026-paper-review-graph-based-rag]] — Graph-based RAG 리뷰. "사전 구조화가 정말 필요한가?"라는 질문에 DCI는 한 가지 답.

## 후속 작업 거리 (Follow-ups for this wiki)

- BrowseComp-Plus benchmark 자체를 `evaluations/` 또는 `applications/`에 별도 ingest (Chen et al., 2025b, arXiv 2508.06600).
- Claude Code · Pi · Agentless 같은 coding agent 인프라가 이 paper의 토대 — `agents/`에 정리 가치 있음.
- `overviews/vectorless-rag-overview` — PageIndex와 DCI를 묶는 합성 페이지 후보.
