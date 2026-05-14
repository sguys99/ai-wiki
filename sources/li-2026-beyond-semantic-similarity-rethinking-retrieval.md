---
title: "Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"
type: paper
year: 2026
category: database
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf
raw_filename: "li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf"
source_collection: external
tags: [retrieval, agentic-search, RAG, vectorless, terminal-tools, grep, BrowseComp-Plus, BRIGHT, BEIR, deep-research]
authors: "Zhuofeng Li, Haoxiang Zhang, Cong Wei, Pan Lu, Ping Nie, Yi Lu, Yuyang Bai, Shangbin Feng, Hangxiao Zhu, Ming Zhong, Yuyu Zhang, Jianwen Xie, Yejin Choi, James Zou, Jiawei Han, Wenhu Chen, Jimmy Lin, Dongfu Jiang, Yu Zhang"
arxiv_id: "2605.05242"
---

## 한 줄 요약 (One-line Summary)

Embedding·vector index 없이 agent가 `grep`·`find`·`bash` 같은 일반 터미널 도구로 원본 corpus를 직접 검색하는 **Direct Corpus Interaction (DCI)** 패러다임을 정식화하고, BrowseComp-Plus(80.0% vs Qwen3-Embed-8B retriever 69.0%) · 다중 홉 QA(83.0 평균) · IR ranking(NDCG@10 68.5)에서 기존 retriever 기반 agent를 일관되게 능가함을 보인 paper.

## 1. 자료 정보 (Document Information)

- **Title**: Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction
- **Authors**: Zhuofeng Li (Texas A&M, project lead), Haoxiang Zhang (Waterloo/UCSD), Cong Wei (Waterloo), Pan Lu (Stanford), Ping Nie (Waterloo, project lead), 외 14명. **Corresponding authors**: Dongfu Jiang (Waterloo), Yu Zhang (Texas A&M)
- **Affiliations**: Texas A&M, University of Waterloo, UC San Diego, Stanford, University of Washington, UIUC, Verdent AI, Lambda
- **Year**: 2026 (arXiv preprint, 2026-05-03)
- **arXiv ID**: 2605.05242v1 (cs.IR)
- **Code/Repo**: https://github.com/DCI-Agent/DCI-Agent-Lite
- **Type**: Preprint (16 pages 본문 + 35 페이지 appendix, case study 다수)

## 2. 주요 기여 (Key Contributions)

1. **Direct Corpus Interaction (DCI) 패러다임 정식화**. Retriever-mediated access(embedding + top-k)와 대비되는 retrieval interface로 DCI를 정의 — embedding model, vector index, retrieval API를 *전혀* 거치지 않고 agent가 `grep`/`rg`(exact·regex match), `find`/`glob`(structural navigation), `head`/`tail`/`sed`(local inspection), `bash` pipeline composition만으로 raw corpus를 탐색한다.

2. **두 가지 reference scaffold 제공**.
   - **DCI-Agent-Lite**: Pi-based 최소 harness, `bash` + `read`만 노출, GPT-5.4 nano backbone. Runtime context-management 5단계(L0~L4: truncation·compaction·summarization) 포함. 인터페이스 효과를 통제 실험으로 격리하기 위한 minimal scaffold.
   - **DCI-Agent-CC**: Claude Code(Claude Sonnet 4.6) 기반 강화 scaffold. web-search·web-fetch·subagent 비활성화로 corpus 외부 접근 차단.

3. **세 가지 벤치마크 패밀리에서 일관된 우월성**. (1) Agentic search(BrowseComp-Plus 830문항) — DCI-Agent-CC 80.0% vs 동일 백본 retriever-agent 69.0% (+11.0pp, cost −29.4%). (2) Knowledge-intensive QA(NQ·TriviaQA·Bamboogle·HotpotQA·2WikiMHQA·MuSiQue 6개) — DCI-Agent-CC 83.0 평균, 최강 baseline ASearcher-Local-14B 대비 +30.7. (3) IR ranking(BRIGHT 4개 + BEIR 2개) — DCI-Agent-CC NDCG@10 68.5, ReasonRank-32B 대비 +21.5.

4. **"Retrieval interface resolution" 개념 제안 + trajectory-level 측정**. Coverage(broad reach, gold document를 surface했는가)와 localization(within-document, surface된 문서 안에서 얼마나 좁은 evidence span으로 집중했는가) 두 지표로 인터페이스의 "해상도"를 정량화. DCI의 우위는 gold document 발굴 자체가 아니라, surface된 문서에서 세밀한 local search·verification으로 변환하는 데서 온다고 분석.

5. **체계적 ablation 6종 (RQ1-RQ6)**: (RQ1) mature DCI agent의 강력함, (RQ2) DCI 우위의 원천 — recall이 아닌 fine-grained discovery·composition, (RQ3) coverage 대신 localization 거래, (RQ4) corpus 100K→400K 스케일링(검색 깊이는 잘 견디나 폭은 cost가 급증), (RQ5) context-management L0~L4 비단조 sweet spot(L3가 최적 77%), (RQ6) `read + grep`만으로도 61% — 도구 풍부함보다 인터페이스 자체가 핵심.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 retrieval interface의 대비 (Figure 2)

- **Retriever-mediated retrieval**: corpus → 오프라인 indexing → retriever(BM25/Qwen3-Embed-8B 등) → agent가 query 발행, top-k snippet 수신. Agent 관찰은 retriever가 노출한 short snippet + document id로 제한.
- **Direct Corpus Interaction (DCI)**: index building 없음. Agent가 CLI 도구(bash, glob, read, grep, python)로 raw corpus에 직접 명령. 관찰은 matched span + 주변 컨텍스트 + 파일 경로 + 메타데이터 등 tool output. Semantic interpretation을 retriever로부터 LLM으로 *downward* 이동.

### 3.2 DCI primitives의 표현력

소수 도구를 pipeline composition으로 결합해 lexical 제약·약한 단서 조합·hypothesis 검증을 수행:
- `grep 'foo' file | grep 'bar'` — lexical conjunction
- `find . | grep 'report' | grep '2024'` — weak clue 조합
- `grep -n 'keyword' file | head` — local context로 hypothesis 검증

이는 retriever API가 노출하지 않는 "fine-grained, composable" 검색 공간.

### 3.3 Runtime context management (DCI-Agent-Lite)

장기 trajectory에서 tool output이 context window를 초과하는 문제 완화를 위해 세 메커니즘 결합:

| Level | Truncation | Compaction | Summarization |
|---|---|---|---|
| L0 | ✗ | ✗ | ✗ |
| L1 | 50K chars/call | ✗ | ✗ |
| L2 | 20K chars/call | ✗ | ✗ |
| L3 | 20K chars/call | ✓ (240K threshold, recent 12 turn 유지) | ✗ |
| L4 | 20K chars/call | ✓ | ✓ (model 생성 summary로 replace) |

Compaction은 LLM 호출 없는 in-memory 작업; summarization은 압축된 history를 model 생성 summary로 교체하되 최근 20K token 보존, 연속 3회 실패 시 중단.

### 3.4 Coverage & Localization 지표

- **Coverage**: trajectory τ가 gold set D*(q)를 얼마나 reach 했는가 — `any` / `mean(recall)` / `all` 세 aggregation.
- **Localization**: surfaced gold document 안에서 얼마나 좁은 span으로 좁혔는가 — segment count 정규화 ν(x)와 로그 비율 정규화 ψ(a;b)를 이용해 snippet length ℓ_{t,i}와 full doc length |d*|을 비교 (식 (2)~(5)). DCI tool 유형별로 snippet 정의(grep matched line / read overlap span / path-only fallback)을 case-by-case로 매핑(§A.3).

### 3.5 평가 설정

- **Models**: DCI-Agent-Lite는 GPT-5.4 nano(reasoning effort high), DCI-Agent-CC는 Claude Sonnet 4.6(reasoning effort medium). 둘 다 max 300 turn.
- **Benchmarks**: BrowseComp-Plus(전체 830 문항, 100K doc corpus), 다중 홉 QA 6종(Wikipedia-18 dump 21M doc, sample 50/dataset, Bamboogle은 full), BRIGHT 4종(Bio·Earth·Econ·Robotics) + BEIR 2종(ArguAna·SciFact, sample 50).
- **Judge**: GPT-4.1을 LLM-as-judge로 사용(short reference answer 기준), IR은 NDCG@10.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 BrowseComp-Plus (agentic search, 830문항, Table 1 / Figure 1)

| Method | Backbone | Accuracy | Cost($) |
|---|---|---|---|
| Qwen3-Embed-8B retriever | Sonnet 4.6 | 69.0 | 1,440 |
| Qwen3-Embed-8B retriever | GPT-5 | 71.7 | — |
| Qwen3-Embed-8B retriever | o3 | 66.0 | 740 |
| **DCI-Agent-CC** | Sonnet 4.6 | **80.0** | **1,016** |
| **DCI-Agent-Lite** | GPT-5.4 nano | **62.9** | **93** |

동일 backbone(Sonnet 4.6) 비교에서 +11.0pp 향상 + cost −29.4%. Lite는 o3+retriever보다 cost를 $647 절감하면서 −3.1pp만 손해.

### 4.2 Knowledge-intensive QA (Table 2)

| Method | NQ | Trivia | Bam. | Hotpot | 2Wiki | MuSiQue | Avg | ΔAvg |
|---|---|---|---|---|---|---|---|---|
| ASearcher-Local-14B (best baseline) | 56 | 58 | 62 | 58 | 56 | 24 | 52.3 | — |
| **DCI-Agent-Lite** | 72 | 84 | 72 | 72 | 68 | 40 | 68.0 | +15.7 |
| **DCI-Agent-CC** | 78 | 96 | 80 | 88 | 82 | 74 | 83.0 | +30.7 |

다중 홉이 어려울수록 격차 증가: MuSiQue +50, HotpotQA +30, 2Wiki +26.

### 4.3 IR Ranking — NDCG@10 (Table 3)

| Method | BRIGHT-Bio | Earth | Econ | Robotics | ArguAna | SciFact | Avg |
|---|---|---|---|---|---|---|---|
| ReasonRank-32B (best baseline) | 58.2 | 48.9 | 36.6 | 33.9 | 28.7 | 75.5 | 47.0 |
| **DCI-Agent-Lite** | 60.0 | 50.8 | 32.3 | 42.4 | 81.9 | 72.7 | 56.7 |
| **DCI-Agent-CC** | **77.1** | **69.0** | **46.8** | **56.8** | **85.3** | **75.7** | **68.5** |

DCI-Agent-CC가 6개 데이터셋 모두에서 1위.

### 4.4 Trajectory analysis (Table 4, n=100 subset)

| Method | tools | $/q | cov_any | cov_mean | cov_all | Localization | Acc |
|---|---|---|---|---|---|---|---|
| BM25 retriever | 19 | 0.053 | 63.0 | 42.8 | 17.0 | 23.5 | 32.0 |
| Qwen3-Embed-8B retriever | 18 | 0.050 | 74.0 | 56.7 | 28.0 | 21.7 | 45.0 |
| **DCI-Agent-Lite (L4)** | 35 | 0.102 | 70.0 | 28.0 | 1.0 | **48.4** | **73.0** |

DCI는 **mean coverage가 낮음에도(28 vs 56.7) localization(48.4 vs 21.7)이 두 배 이상**, accuracy +28pp. DCI 승리 분석(176 CC-win, 76 retriever-win): CC-win 중 142건은 retriever도 이미 gold를 surface했으나(partial-chain 83건 + post-retrieval 59건), DCI가 surface된 evidence를 fine-grained 검색·verification으로 변환해 이긴 것.

### 4.5 Tool distribution (Figure 4 right, DCI-Agent-CC)

Tool call 전체: Bash 62.4% · Grep 33.0% · ToolSearch 2.8% · Read 1.5%. Bash intent 내부 분포: chained search (`grep | grep`) 22.3% · document peek (`head/tail/sed`) 18.0% · regex match 17.0% · single keyword search 14.1% · locate file (`find/ls | grep`) 14.0% · full document read 9.1% · list directory 4.4% · python scripting 0.9%. **Full read는 9.1%에 불과** — DCI는 broad read 대신 compositional lexical filtering으로 작동.

### 4.6 Corpus scaling (Figure 5, BrowseComp-Plus)

100K → 200K → 400K corpus 확장 시: avg tools 38.5 → 86.9 → 122.4, latency >2x, cost >2x, accuracy 51.1 → 37.5(400K에선 max tool budget으로 20예시 강제 종료). **검색 깊이는 견디나 폭은 cost 폭증** — 첫 anchor 문서를 찾는 cost가 후보 공간 확장에 민감.

### 4.7 Context management ablation (Table 6, L0~L4, n=100)

| L | tools | latency(s) | $/q | Retained cov | Acc |
|---|---|---|---|---|---|
| L0 | 28.54 | 2226 | 0.072 | 26.9 | 72 |
| L1 | 29.00 | **1820** | 0.072 | **31.3** | 75 |
| L2 | 29.95 | 4413 | **0.059** | 27.2 | 69 |
| **L3** | 36.89 | 8712 | 0.111 | 27.0 | **77** |
| L4 | 35.35 | 4531 | 0.102 | 28.0 | 73 |

**비단조**: L3가 accuracy 최고, L1이 retained coverage 최고, L2가 cost 최저. "Verbatim evidence 보존 ≠ 좋은 working state" — selective forgetting이 long-horizon hypothesis 수정에 도움.

### 4.8 Tool-set expressivity ablation (Table 5)

| Setting | tools | $/q | Acc |
|---|---|---|---|
| Qwen3-Embed-8B retriever | 18 | 0.050 | 45 |
| **DCI-Agent-Lite, read + grep only** | 19 | **0.036** | **61** |
| DCI-Agent-Lite, open bash | 35 | 0.102 | 73 |

**`read + grep` 두 도구만으로도 retriever +16pp**. Bash 전체 노출은 추가 +12pp이지만 cost는 거의 3배 — 핵심은 인터페이스이지 도구 풍부함이 아님.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **Corpus 폭(breadth) 확장에 cost 비선형 증가** — 400K corpus에서 37.5% 추락. 대규모 정적 corpus에는 sparse/dense retrieval이 여전히 합리적.
- **모델 의존성** — DCI 효과는 agent가 strategically search할 수 있을 만큼 강할 때 발생. 약한 backbone(예: GPT-5.4 nano)도 합리적이지만, frontier 모델(Sonnet 4.6)에서 격차가 가장 큼.
- **Latency·cost trade-off** — 평균 tool call이 retriever 대비 2배 안팎, latency도 더 김. Interactive 응답성이 중요한 응용에는 추가 최적화 필요.
- **Localization 메트릭의 구현 의존성** — DCI tool 유형별 snippet 매핑이 case-by-case이므로, 두 인터페이스 사이의 fair한 비교를 위한 표준화가 미흡(§A.3).
- **Open question**: DCI를 위한 specialized fine-tuning(예: grep skill training), corpus 폭 확장을 위한 hybrid(가벼운 indexing + DCI), web-search 등 외부 도구와의 결합.
- **Failure mode 분석**(§D.8-D.9): multi-hop 단서가 corpus에 explicit text로 없으면 DCI도 hallucinate(예: Case 5b에서 *Dosti: Friends Forever* 대신 *The Family Man* 환각).

## 6. 관련 연구 (Related Work)

- **Classical RAG**: REALM (Guu et al., 2020), RAG (Lewis et al., 2020), RETRO (Borgeaud et al., 2022), Self-RAG (Asai et al., 2023), In-context RALM (Ram et al., 2023). 모두 사전 indexing + retrieve-then-generate 구조 유지.
- **Sparse/Dense retrieval**: BM25 (Robertson 1994), ColBERT (Khattab & Zaharia 2020), DPR (Karpukhin et al., 2020), Contriever (Izacard et al., 2022), E5 (Wang et al., 2022), GTE (Li et al., 2023), Qwen3-Embedding (Zhang et al., 2025).
- **LLM reranker / adaptive RAG**: Rank-R1 (Zhuang 2025), Rank1 (Weller 2025), ReasonRank (Liu 2025), Adaptive-RAG (Jeong 2024).
- **Agentic search**: Search-R1 (Jin et al., 2025), VerlTool (Jiang et al., 2025), Tongyi DeepResearch (Team 2025b), MiroThinker (MiroMind Team 2025a), OpenResearcher (Li et al., 2026b), ASearcher (Gao 2025), R1-Searcher (Song 2025), ZeroSearch (Sun 2025).
- **Coding agents as inspiration**: SWE-agent (Yang et al., 2024), Agentless (Xia et al., 2025), OpenHands (Wang et al., 2025), Aider (Gauthier 2024), Claude Code (Anthropic 2025), Pi (Zechner 2026), Terminal-bench (Merrill 2026). 특히 Subramanian et al. (2025)의 "Keyword Search is All You Need"가 document QA 문맥에서 비슷한 주장; 본 paper는 이를 broader agentic search interface로 확장.
- **Benchmarks**: BrowseComp-Plus (Chen et al., 2025b), BrowseComp (Wei 2025), BRIGHT (Su 2025), BEIR (Thakur 2021), NQ (Kwiatkowski 2019), TriviaQA (Joshi 2017), Bamboogle (Press 2023), HotpotQA (Yang 2018), 2WikiMHQA (Ho 2020), MuSiQue (Trivedi 2022).
- **Information-retrieval positioning**: Zhai (2025) "IR for AGI", Zhang et al. (2024) "Agentic IR survey", Singh et al. (2025) "Agentic RAG survey" — 본 paper는 이들의 retriever-design 시각을 **interface-design** 문제로 재프레이밍.

## 7. 용어집 (Glossary)

- **DCI (Direct Corpus Interaction)**: Embedding/index/retrieval API 없이 agent가 일반 CLI(`grep`, `find`, `bash`, `read` 등)로 raw corpus를 직접 탐색하는 retrieval paradigm.
- **Retrieval interface resolution**: corpus를 관찰·verify·act할 수 있는 단위의 세밀도. Document/passage 단위 top-k는 저해상도, line/span 단위 grep matching은 고해상도.
- **Coverage**: trajectory가 gold document를 surface한 비율(any/mean/all).
- **Localization**: surface된 gold document 내에서 좁힌 evidence span의 정밀도. seg-score(d; d*) = ψ(ν(|σ|); ν(|d*|)).
- **DCI-Agent-Lite / DCI-Agent-CC**: 각각 Pi(GPT-5.4 nano) 최소 harness / Claude Code(Sonnet 4.6) full harness scaffold.
- **Truncation / Compaction / Summarization (L1~L4)**: 장기 trajectory에서 tool output 누적을 제어하는 3가지 runtime mechanism.
- **Retrieval agent**: top-k retriever를 도구로 호출하며 query를 반복 refine하는 agent (Search-R1, ASearcher 등). DCI agent와의 대비 baseline.
- **BrowseComp-Plus**: Chen et al. 2025b가 공개한 closed-corpus deep-research benchmark. 830문항, 100K 문서 corpus (gold + hard negatives), Qwen3-Embed-8B FAISS index 동봉.
- **NDCG@10**: Normalized Discounted Cumulative Gain @ rank 10. IR ranking 표준 지표.
- **Retriever-mediated access**: 본 paper가 DCI와 대비시키는 기존 패러다임 — embedding/sparse retriever가 top-k를 노출하고 agent는 그 slice 위에서만 추론.
