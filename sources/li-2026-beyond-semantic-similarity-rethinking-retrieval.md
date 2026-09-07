---
title: "Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"
type: paper
year: 2026
category: database
raw_path: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf
raw_filename: "li-2026-beyond-semantic-similarity-rethinking-retrieval.pdf"
source_collection: external
tags: [retrieval, agentic-search, RAG, vectorless, terminal-tools, grep, BrowseComp-Plus, BRIGHT, BEIR, deep-research]
authors: "Zhuofeng Li, Haoxiang Zhang, Cong Wei, Pan Lu, Ping Nie, Yi Lu, Yuyang Bai, Shangbin Feng, Hangxiao Zhu, Ming Zhong, Yuyu Zhang, Jianwen Xie, Yejin Choi, James Zou, Jiawei Han, Wenhu Chen, Jimmy Lin, Dongfu Jiang, Yu Zhang"
arxiv_id: "2605.05242"
url: "https://arxiv.org/abs/2605.05242"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig01.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig01.png
    caption: "BrowseComp-Plus의 정확도 대 비용 Pareto frontier. 별표 두 개가 DCI agent, 사각형이 Qwen3-Embed-8B retriever agent다"
    page: 1
    bbox_norm: [0.1808, 0.6672, 0.8151, 0.8393]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig02.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig02.png
    caption: "두 retrieval interface 비교. 왼쪽은 오프라인 인덱싱과 retriever를 거치고, 오른쪽은 CLI 명령으로 원본 corpus를 직접 다룬다"
    page: 4
    bbox_norm: [0.1667, 0.0833, 0.8332, 0.2617]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig03.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig03.png
    caption: "장기 trajectory용 런타임 컨텍스트 관리 메커니즘 3종. truncation, compaction, summarization의 동작을 나란히 보여준다"
    page: 5
    bbox_norm: [0.1731, 0.0833, 0.8269, 0.3189]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig04.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig04.png
    caption: "왼쪽은 BrowseComp-Plus 830문항의 정오 분포와 DCI 승리 176건의 recall 구간, 오른쪽은 DCI-Agent-CC의 tool 호출과 Bash 의도 분포다"
    page: 9
    bbox_norm: [0.1667, 0.0833, 0.8333, 0.3025]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig05.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig05.png
    caption: "corpus 규모 확장 실험 그림이나 크롭이 페이지 10 전체를 잡아 Table 4와 본문 문단이 함께 들어갔다"
    page: 10
    bbox_norm: [0.1663, 0.154, 0.8362, 0.7297]
    strategy: caption-region
    low_confidence: true
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/fig06.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/fig06.png
    caption: "DCI-Agent-Lite trajectory 100건에서 수집한 bash 명령 3,168개의 의도 분포"
    page: 21
    bbox_norm: [0.2455, 0.0833, 0.7504, 0.3193]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab01.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab01.png
    caption: "런타임 컨텍스트 관리 정책 L0부터 L4까지의 구성표"
    page: 5
    bbox_norm: [0.4576, 0.6332, 0.8234, 0.7374]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab02.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab02.png
    caption: "다중 홉 QA 벤치마크 6종의 정확도 비교표"
    page: 8
    bbox_norm: [0.1866, 0.134, 0.8097, 0.3188]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab03.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab03.png
    caption: "IR ranking 벤치마크 6종의 NDCG@10 비교표"
    page: 8
    bbox_norm: [0.1878, 0.3687, 0.8086, 0.5974]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab04.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab04.png
    caption: "BrowseComp-Plus 100문항 부분집합의 trajectory 분석표. coverage와 localization을 함께 싣는다"
    page: 10
    bbox_norm: [0.1667, 0.154, 0.8302, 0.263]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab05.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab05.png
    caption: "도구 구성 ablation 결과표. read와 grep만 쓴 설정과 bash 전체를 연 설정을 비교한다"
    page: 10
    bbox_norm: [0.502, 0.6602, 0.8264, 0.7642]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab06.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab06.png
    caption: "DCI-Agent-Lite의 컨텍스트 관리 ablation 결과표. L0부터 L4까지 5개 정책을 비교한다"
    page: 11
    bbox_norm: [0.2572, 0.154, 0.7392, 0.2642]
    strategy: table-region
    curated: false
  - id: tab07
    label: Table 7
    kind: table
    file: assets/li-2026-beyond-semantic-similarity-rethinking-retrieval/tab07.png
    raw: raw/papers/li-2026-beyond-semantic-similarity-rethinking-retrieval-figures/tab07.png
    caption: "벤치마크별 retrieval corpus 통계표. 문서 수와 평균 문서 길이를 싣는다"
    page: 19
    bbox_norm: [0.1971, 0.1265, 0.7993, 0.2809]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

임베딩과 vector index 없이 agent가 `grep`, `find`, `bash` 같은 범용 터미널 도구로 원본 corpus를 직접 탐색하는 Direct Corpus Interaction (DCI)을 retrieval 패러다임으로 정식화하고, BrowseComp-Plus 정확도 80.0% (동일 backbone retriever agent 69.0%), 다중 홉 QA 평균 83.0, IR ranking 평균 NDCG@10 68.5로 기존 retriever 기반 agent를 일관되게 능가함을 보인 paper다.

## 1. 자료 정보 (Document Information)

- **Title**: Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction
- **Authors**: 19인. Zhuofeng Li (Texas A&M), Ping Nie (Waterloo), Dongfu Jiang (Waterloo)가 project lead이고 Dongfu Jiang과 Yu Zhang (Texas A&M)이 교신저자다. core contributor는 Zhuofeng Li, Haoxiang Zhang, Cong Wei, Pan Lu 4인이다.
- **Affiliations**: Texas A&M, University of Waterloo, UC San Diego, Stanford, University of Washington, UIUC, Verdent AI, Lambda
- **Year**: 2026 (arXiv preprint, 2026-05-03)
- **arXiv ID**: 2605.05242v1 (cs.IR)
- **Code**: https://github.com/DCI-Agent/DCI-Agent-Lite
- **Type**: Preprint. 총 51쪽이며 본문 11쪽, 참고문헌 11쪽에서 16쪽, 부록 17쪽에서 51쪽이다. 부록 대부분은 case study 9건의 전체 trajectory 기록이다. 서론 첫머리에 Marshall McLuhan의 "The medium shapes and controls the scale and form of human association and action."를 제사로 인용한다.

## 2. 주요 기여 (Key Contributions)

저자가 서론 말미에 명시한 기여는 세 가지다.

1. **DCI를 retrieval 패러다임으로 정식화하고 다양한 agentic search 설정에서 체계적으로 평가한다.** 오프라인 인덱싱이 필요 없고 계속 바뀌는 로컬 corpus에 자연스럽게 적응한다.
2. **DCI가 document ranking, 다중 홉 QA, end-to-end agentic search 세 영역 모두에서 경쟁력 있는 방법임을 보인다.** 외부 retriever 없이 대부분의 벤치마크에서 강한 baseline을 능가한다.
3. **"retrieval interface resolution"을 DCI의 효과를 설명하는 개념 렌즈로 제안하고 coverage와 localization 두 trajectory 지표로 뒷받침한다.** resolution은 문서나 passage 전체보다 작고 정밀한 단위로 corpus를 다룰 수 있는 능력을 뜻한다.

논문이 문제로 규정한 것은 임베딩 모델의 품질이 아니라 인터페이스의 형태다. 기존 retrieval 시스템은 lexical이든 semantic이든 corpus를 고정된 유사도 인터페이스로 노출하고, 추론 전에 접근을 단일 top-k 단계로 압축한다. 이 추상화는 효율적이지만 agentic search에서는 병목이 된다. 저자가 든 구체적 실패 유형은 네 가지다.

| 실패 유형 | 기존 retriever로 구현하기 어려운 이유 |
|---|---|
| exact lexical constraint | 정확한 문자열 일치를 강제할 수단이 top-k API에 없다 |
| sparse clue conjunction | 약한 단서 여러 개를 AND로 묶는 표현이 없다 |
| local context check | 매치 주변 문맥을 열어 확인하는 조작이 없다 |
| multi-step hypothesis refinement | 부분 증거를 본 뒤 계획을 고쳐 다시 좁히는 반복이 어렵다 |

초기 단계에서 걸러진 증거는 뒤쪽의 더 강한 추론으로도 복구할 수 없다. 따라서 성능 병목은 retrieval 이후의 추론뿐 아니라 인터페이스 자체에서 발생한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 두 retrieval interface의 대비 (Figure 2)

- **Retriever-mediated access**: corpus를 오프라인에서 chunking하고 인덱싱한 뒤 retriever가 매개한다. agent는 query를 만들고 top-k 목록을 받아 다시 query를 쓴다. 관찰은 retriever가 노출하기로 한 짧은 snippet과 문서 식별자로 제한되고, 모든 증거가 retriever의 점수화와 ranking을 통과해야 한다.
- **Direct Corpus Interaction (DCI)**: 임베딩 모델, vector index, retrieval API를 모두 우회하고 범용 command-line interface로 원본 corpus를 다룬다. 정확 일치와 정규식에 `grep`과 `rg`, 구조 탐색에 `find`와 `glob`, 문맥 확인에 파일 읽기나 가벼운 스크립트를 쓴다. 관찰은 순위 목록이 아니라 tool 출력(매치된 span과 주변 문맥, 파일 경로, 개수, 메타데이터)이다.

핵심 차이는 semantic 해석의 위치다. retriever 방식은 semantic 이해를 인덱스로 위로 밀어 올리고, DCI는 LLM으로 아래로 내린다.

### 3.2 DCI primitive의 표현력

DCI가 제공하는 조작은 작지만 pipeline으로 합성할 수 있다. 논문이 든 예시는 세 가지다.

| pipeline 예시 | 수행하는 일 |
|---|---|
| `grep 'foo' file \| grep 'bar'` | lexical constraint를 AND로 결합한다 |
| `find . \| grep 'report' \| grep '2024'` | 약한 단서 여러 개를 조합해 후보를 좁힌다 |
| `grep -n 'keyword' file \| head` | 로컬 문맥과 대조해 가설을 검증한다 |

저자는 CLI 도구의 장점이 정밀도만이 아니라 pipeline을 통한 유연성과 합성 가능성에 있다고 본다.

### 3.3 두 scaffold 구현

DCI를 두 가지 scaffold로 구현한다. scaffold는 모델 주위에 짜 놓은 보조 실행 구조를 뜻한다. 둘 다 터미널 도구와 파일 읽기로 원본 corpus를 직접 탐색하고, 런타임 지원에서만 차이가 나므로 DCI 인터페이스 자체의 효과와 추가 harness 엔지니어링의 효과를 분리할 수 있다.

| 항목 | DCI-Agent-Lite | DCI-Agent-CC |
|---|---|---|
| 기반 harness | Pi (Zechner and Pi Contributors, 2026) | Claude Code (Anthropic, 2025) |
| 노출 도구 | `bash`와 파일 읽기만 | Claude Code 기본 구성 |
| backbone | GPT-5.4 nano | Claude Sonnet 4.6 |
| reasoning effort | high | medium |
| 최대 turn | 300 | 300 |
| 차단한 기능 | 없음 (애초에 retrieval 모듈이 없다) | web-search, web-fetch, 서브에이전트, 정답 유출 방지를 위한 data 디렉터리 접근 |
| 목적 | 인터페이스 변화만 남긴 통제 실험 | 같은 패러다임의 성능 상한 탐색 |

DCI-Agent-Lite에는 retrieval 전용 모듈이 하나도 없다(오프라인 인덱싱, dense retriever, reranker 모두 없다). DCI-Agent-CC 역시 더 강한 instantiation일 뿐 다른 retrieval 방법이 아니며, 임베딩 retriever나 retrieval API를 전혀 호출하지 않는다.

### 3.4 런타임 컨텍스트 관리 (Table 1, Figure 3)

장기 trajectory에서 tool 관찰이 빠르게 쌓여 모델의 유한한 context window를 넘길 수 있다. 런타임은 나중 추론을 위해 증거와 중간 제약을 유지하는 요구와, 새 관찰이 들어올 자리를 만드는 요구를 균형 잡아야 한다. DCI-Agent-Lite에 붙인 관리 층은 메커니즘 3종으로 구성된다.

| 메커니즘 | 동작 | LLM 호출 |
|---|---|---|
| Truncation | 각 tool call의 결과 텍스트를 정해진 길이로 자른 뒤 작업 컨텍스트에 넣는다. 관찰이 일어났다는 사실은 남기고 turn당 장황함만 제한한다 | 없음 |
| Compaction | 누적 tool 출력이 임계를 넘으면 오래된 tool 결과 turn의 내용을 비우고 짧은 placeholder로 바꾼다. tool call 구조 자체는 보존한다 | 없음 (in-memory) |
| Summarization | 추가 압박이 있으면 compaction된 이력을 모델 생성 요약으로 교체하고 최근 컨텍스트는 그대로 둔다 | 있음 |

이 셋을 다른 강도로 조합해 정책 5종을 만든다.

| Level | Truncation | Compaction | Summarization |
|---|---|---|---|
| L0 | 없음 | 없음 | 없음 |
| L1 | 최대 5만 자 | 없음 | 없음 |
| L2 | 최대 2만 자 | 없음 | 없음 |
| L3 | 최대 2만 자 | 있음 | 없음 |
| L4 | 최대 2만 자 | 있음 | 있음 |

compaction은 누적 tool 결과가 24만 자를 넘을 때 발동해 최근 12 turn을 제외한 나머지를 압축한다. summarization은 그 뒤에도 추정 컨텍스트 토큰이 임계를 넘으면 발동하고, 최근 2만 토큰을 유지하며, 한 세션 안에서 3회 연속 실패하면 이후 시도를 억제한다. 저자는 이 정책들이 retrieval 인터페이스 자체를 바꾸지 않고 tool 증거가 작업 컨텍스트에 얼마나 살아남는지만 바꾼다는 점을 강조한다. 본 결과에는 L3, ablation에는 L4를 쓴다.

### 3.5 Coverage와 localization (§3.3)

정확도만으로는 DCI와 retriever 방식이 질적으로 어떻게 다르게 성공하고 실패하는지 포착할 수 없다. retriever 방식은 대체로 높은 recall을 주지만 정확한 문자열 일치, 약한 lexical 신호의 결합, 다음 홉을 여는 span 단위 trigger에는 통제력이 약하다. 저자는 이 차이를 과정 수준에서 재기 위해 trajectory 지표 두 개를 도입한다.

**Coverage**는 gold 문서 집합 D*(q) 중 trajectory τ가 표면에 올린 부분집합 M(q, τ)로 정의하고 세 가지로 집계한다.

| 집계 | 정의 | 뜻 |
|---|---|---|
| coverage_any | 1[\|M\| ≥ 1] | gold 문서를 하나라도 올렸는가 |
| coverage_mean | \|M\| / \|D*\| | gold 문서 각각이 올라왔는지의 평균 (recall) |
| coverage_all | 1[\|M\| = \|D*\|] | gold 집합 전체를 올렸는가 |

문서가 surface되었다고 보는 기준은 기록된 trace에 retrieval된 snippet이나 tool call이 반환한 파일로 명시적으로 나타나는 것이다.

**Localization**은 surface된 gold 문서 안에서 얼마나 좁은 증거 span으로 좁혔는지를 잰다. 관찰 o_t마다 노출된 후보 (d_{t,i}, σ_{t,i})와 snippet 문자 길이 ℓ_{t,i} = |σ_{t,i}|를 정의하고, 줄 대신 고정 폭 문자 segment(길이 c_seg)를 분석 단위로 쓴다. 많은 웹과 PDF 내보내기가 레이아웃을 긴 한 줄로 접어버려 줄 경계가 신뢰할 만한 대리값이 아니기 때문이다.

- ν(x) = max(1, ⌈x / c_seg⌉): 문자 길이를 segment 개수로 바꾼다.
- ψ(a; b) = max(1 − log a / log b, 0): a가 b에 비해 작을수록 높은 점수를 준다 (1 ≤ a ≤ b, b > 1, ψ(a; 1) = 1).
- seg-score(d_{t,i}; d*) = ψ(ν(ℓ_{t,i}); ν(|d*|)): 노출된 snippet이 gold 문서 전체 대비 얼마나 국소적인지를 잰다.
- s(d*, τ)는 문서별 최고 seg-score이고, localization(q, τ)는 surface된 gold 문서들에 대한 그 평균이다.

**DCI 쪽 snippet 매핑 (§A.3)**은 구현 의존적이라 tool 유형별로 보수적으로 정한다. `grep`과 `rg` 검색은 정렬된 매치 줄 하나가 후보 하나가 되고, 같은 gold 문서에서 여러 줄이 나오면 전부 넣은 뒤 최댓값을 취한다. `read` 계열 열람은 반환 텍스트가 주석 처리된 gold 증거와 충분히 겹치면 그 span을 snippet으로 쓴다. 경로만 노출된 관찰은 coverage에는 기여하되 ℓ_{t,i} = |d*|로 두어 문서 전체를 snippet으로 취급하므로 seg-score가 낮게 나온다. retriever 방식은 반환 결과마다 곧바로 후보가 되고 σ는 retriever가 준 preview 텍스트라 매핑이 직접적이다(top-k 호출이면 n_t = k).

### 3.6 평가 설정

- **Judge**: BrowseComp-Plus와 다중 홉 QA는 GPT-4.1을 LLM-as-judge로 쓴다. judge는 예측 답과 참조 답만 비교하고, 참조 답이 짧고 잘 정의되어 있어 비교가 대체로 모호하지 않다. IR ranking은 NDCG@10을 주 지표로 쓴다.
- **corpus 통계 (Table 7)**:

| corpus | 사용 벤치마크 | 문서 수 | 평균 길이(단어) |
|---|---|---|---|
| BrowseComp-Plus | BrowseComp-Plus | 100,195 | 5,179 |
| BRIGHT-Biology | BRIGHT-Biology | 57,359 | 48 |
| BRIGHT-Earth Science | BRIGHT-Earth Science | 121,249 | 28 |
| BRIGHT-Economics | BRIGHT-Economics | 50,220 | 52 |
| BRIGHT-Robotics | BRIGHT-Robotics | 61,961 | 25 |
| Wikipedia-18 | NQ, TriviaQA, Bamboogle, HotpotQA, 2WikiMHQA, MuSiQue | 21,015,324 | 100 |
| BEIR-ArguAna | BEIR-ArguAna | 8,674 | 167 |
| BEIR-SciFact | BEIR-SciFact | 5,183 | 214 |

- **표본**: BRIGHT 4종과 Bamboogle은 전체 test set을 쓰고, 나머지는 데이터셋당 50문항을 무작위 표본으로 쓴다. QA에서는 모호한 질문과 corpus 수집 이후 정답이 바뀌었을 수 있는 시간 민감 문항을 제외한다.
- **baseline 인덱스**: BrowseComp-Plus는 공식 배포 corpus와 BM25 및 Qwen3-Embedding-8B FAISS 인덱스를 오프라인 검색 엔진으로 쓴다. 다중 홉 QA의 retrieval agent baseline은 E5 임베딩으로 인덱스를 만든다.
- **프롬프트 (§C)**: DCI agent 지시문은 `@corpus` 안의 문서만 쓰고 온라인 검색과 서브에이전트를 금지하며, 한 응답에서 검색 여러 개를 병렬 실행하고, 결론 전에 경쟁 후보를 배제하며, 근거마다 문서 경로를 인용하게 한다. 출력은 Explanation, Exact Answer, Confidence 세 칸이다. IR 지시문에는 recall과 precision이 동등하게 중요하다는 설명과 최대 20개 문서를 관련도 순으로 정렬하라는 조건이 붙는다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 Agentic search (Figure 1, RQ1)

BrowseComp-Plus 830문항 전체에서, 같은 Claude Sonnet 4.6 backbone을 두고 Qwen3-Embedding-8B retriever를 DCI로 바꾸면 정확도가 69.0%에서 80.0%로 11.0%p 오르고 비용은 $1,440에서 $1,016으로 29.4% 줄어든다.

| 설정 | backbone | 정확도 | 총비용 |
|---|---|---|---|
| DCI-Agent-CC | Claude Sonnet 4.6 | 80.0% | $1,016 |
| Qwen3-Embed-8B retriever | Claude Sonnet 4.6 | 69.0% | $1,440 |
| Qwen3-Embed-8B retriever | GPT-5 | 71.7% | 표기 없음 |
| Qwen3-Embed-8B retriever | o3 | 66.0% | $740 |
| DCI-Agent-Lite | GPT-5.4 nano | 62.9% | $93 |
| Qwen3-Embed-8B retriever | GPT-5.4 nano | 44.9% | $105 |

마지막 행은 Figure 1의 "+18.0pp, $12 saved" 주석에서 역산한 값이다. Figure 1은 GLM-4.7, Kimi K2, Claude Haiku 4.5, Claude Sonnet 4.5, GPT-5.2도 retriever agent backbone으로 함께 그리지만 수치 레이블 없이 30%대에서 50%대 초반 구간에 놓는다. DCI-Agent-Lite는 GPT-5.4 nano만으로 62.9%를 $93에 달성해, o3와 retriever 조합(66.0%, $740) 대비 정확도를 3.1%p만 내주면서 비용을 $647 줄인다.

### 4.2 다중 홉 QA (Table 2, RQ1)

| 모델 | NQ | Trivia | Bam. | Hotpot | 2Wiki | MuSiQue | 평균 | Δ평균 |
|---|---|---|---|---|---|---|---|---|
| R1-Searcher-7B | 58 | 50 | 54 | 46 | 40 | 24 | 45.3 | −7.0 |
| Search-R1-32B | 56 | 46 | 52 | 44 | 50 | 32 | 46.7 | −5.6 |
| ZeroSearch-7B | 26 | 30 | 18 | 10 | 18 | 4 | 17.7 | −34.6 |
| Verl-Tool-Search-7B-DAPO | 56 | 44 | 32 | 50 | 32 | 12 | 37.7 | −14.6 |
| ASearcher-Local-14B | 56 | 58 | 62 | 58 | 56 | 24 | 52.3 | 기준 |
| DCI-Agent-Lite (GPT-5.4 nano) | 72 | 84 | 72 | 72 | 68 | 40 | 68.0 | +15.7 |
| DCI-Agent-CC (Sonnet 4.6) | 78 | 96 | 80 | 88 | 82 | 74 | 83.0 | +30.7 |

DCI agent 둘이 6개 데이터셋 전부에서 1위와 2위를 차지한다. 다중 홉 성격이 강할수록 격차가 커진다. ASearcher-Local-14B 대비 HotpotQA에서 30점, 2Wiki에서 26점, MuSiQue에서 50점 앞선다.

### 4.3 IR ranking (Table 3, RQ1)

NDCG@10 기준이다.

| 방법 | Bio | Earth | Econ | Robotics | ArguAna | SciFact | 평균 | Δ평균 |
|---|---|---|---|---|---|---|---|---|
| BM25 | 18.9 | 27.2 | 14.9 | 13.6 | 31.5 | 15.8 | 20.3 | −26.7 |
| OpenAI text-emb-3-large | 23.3 | 26.7 | 19.5 | 12.8 | 58.1 | 58.1 | 33.1 | −13.9 |
| GTE-Qwen2-7B-Instruct | 30.6 | 36.4 | 17.8 | 13.2 | 62.7 | 75.3 | 39.3 | −7.7 |
| Rank-R1-14B | 31.2 | 38.5 | 21.2 | 22.6 | 31.3 | 72.2 | 36.2 | −10.8 |
| Rank1-32B | 49.7 | 35.8 | 22.0 | 22.5 | 57.6 | 74.8 | 43.7 | −3.3 |
| ReasonRank-32B | 58.2 | 48.9 | 36.6 | 33.9 | 28.7 | 75.5 | 47.0 | 기준 |
| DCI-Agent-Lite (GPT-5.4 nano) | 60.0 | 50.8 | 32.3 | 42.4 | 81.9 | 72.7 | 56.7 | +9.7 |
| DCI-Agent-CC (Sonnet 4.6) | 77.1 | 69.0 | 46.8 | 56.8 | 85.3 | 75.7 | 68.5 | +21.5 |

DCI-Agent-CC가 6개 데이터셋 전부에서 최고 점수를 낸다. DCI-Agent-Lite도 평균 56.7로 전체 2위이며 가장 강한 retrieval baseline보다 9.7점 높다. 다만 Economics(32.3)와 SciFact(72.7) 두 곳에서는 ReasonRank-32B보다 낮다.

### 4.4 DCI가 이기는 이유 (Figure 4, RQ2)

같은 Sonnet 4.6 backbone에서 DCI-Agent-CC와 retriever agent의 정오를 830문항에 대해 교차 집계한 결과다.

| 구간 | 문항 수 | 비율 |
|---|---|---|
| 둘 다 정답 | 484 | 58.3% |
| DCI만 정답 | 176 | 21.2% |
| retriever만 정답 | 76 | 9.2% |
| 둘 다 오답 | 94 | 11.3% |

DCI만 맞힌 176건을 retriever agent의 gold 문서 recall로 다시 나누면, 격차가 retrieval 실패에서 오지 않는다는 것이 드러난다.

| recall 구간 | 문항 수 | 비율 | 해석 |
|---|---|---|---|
| recall = 0 | 34 | 19% | retriever가 gold를 하나도 못 올렸다 |
| 0 < recall < 100 | 83 | 47% | partial-chain 실패. 일부 증거는 노출했으나 다음 홉을 잇기에 부족했다 |
| recall = 100 | 59 | 34% | post-retrieval 실패. gold 전부를 올렸으나 활용하지 못했다 |

176건 중 142건은 retriever agent도 gold 문서를 최소 하나 이상 이미 올린 상태였다. DCI의 이득은 더 많은 gold 문서를 찾아내는 데서가 아니라, 이미 표면에 올라온 증거를 더 세밀한 로컬 검색과 verification 단계로 바꾸는 데서 나온다.

DCI-Agent-CC의 tool 호출 분포는 다음과 같다 (Figure 4 오른쪽).

| tool | 문항당 호출 | 비율 |
|---|---|---|
| Bash | 26.33 | 62.4% |
| Grep | 13.94 | 33.0% |
| ToolSearch | 1.19 | 2.8% |
| Read | 0.65 | 1.5% |
| Glob | 0.07 | 0.2% |
| TaskOutput | 0.01 미만 | 0.1% 미만 |

Grep은 Claude Code의 내장 파일 검색 primitive로 grep 방식 lexical 검색과 대체로 같은 역할을 한다. Bash 안쪽 의도 분포는 다음과 같다.

| Bash 의도 | 예시 명령 | 비율 |
|---|---|---|
| Chain Search | `grep \| grep` | 22.3% |
| Document Peek | `head`, `tail`, `sed` | 18.0% |
| Regex Search | `grep "a\|b"` | 17.0% |
| Single Keyword Search | `grep keyword` | 14.1% |
| Locate File | `find`, `ls \| grep` | 14.0% |
| Full Document Read | `cat <file>` | 9.1% |
| List Directory | `ls` | 4.4% |
| Python Scripting | `python -c` | 0.9% |
| Aggregation Counting | `wc` | 0.2% |
| 기타 | | 0.1% 미만 |

전체 읽기가 9.1%에 그친다. DCI는 문서를 널리 읽는 대신 lexical 필터를 합성하고 정확한 span을 검증하며 유망한 snippet만 선택적으로 확장한다.

### 4.5 Coverage와 localization의 교환 (Table 4, RQ3)

BrowseComp-Plus 100문항 부분집합에서 GPT-5.4-nano를 backbone으로 고정한 비교다.

| 방법 | 평균 tool call | 문항당 비용($) | cov_any | cov_mean | cov_all | 평균 localization | 정확도 | Δ정확도 |
|---|---|---|---|---|---|---|---|---|
| BM25 retriever | 19.07 | 0.0527 | 63.0 | 42.8 | 17.0 | 23.5 | 32.0 | −13.0 |
| Qwen3-Embedding-8B retriever | 17.55 | 0.0498 | 74.0 | 56.7 | 28.0 | 21.7 | 45.0 | 기준 |
| DCI-Agent-Lite, 직접 상호작용 (L4) | 35.35 | 0.1021 | 70.0 | 28.0 | 1.0 | 48.4 | 73.0 | +28.0 |

DCI-Agent-Lite는 gold 문서를 더 많이 복구해서 이기지 않는다. mean coverage는 28.0으로 Qwen3-Embedding-8B의 56.7보다 훨씬 낮고 coverage_all은 1.0에 불과하지만, coverage_any는 70.0으로 74.0과 비슷하고 localization은 48.4로 21.7의 두 배를 넘는다.

이것이 의미를 갖는 이유는 BrowseComp-Plus 질문의 gold 문서가 보통 1개에서 4개뿐이기 때문이다. 이 조건에서는 유용한 gold 문서 하나만 올리면 넓은 retrieval에서 세밀한 검사와 verification으로 전환할 수 있다. DCI는 gold chain 전체 복구를 포기하는 대신 고해상도 로컬 진전을 얻는다.

### 4.6 corpus 규모 확장 (Figure 5, RQ4)

BrowseComp-Plus 100문항 부분집합에서 corpus를 10만 건에서 20만 건, 40만 건으로 늘린다. 확장은 FineWeb에서 추가 distractor를 원 집합에 주입해 만든다.

| 지표 | 10만 건 | 20만 건 | 40만 건 | 변화 |
|---|---|---|---|---|
| 평균 tool call | 38 | 87 | 123 | +220% |
| latency(초) | 360 | 783 | 4,188 | +1,064% |
| 문항당 비용 | $1.06 | $2.26 | $3.06 | +189% |
| 정확도 | 82.7% | 69.1% | 43.0% | −39.7%p |

본문 서술은 그림과 일부 다르다. 본문은 tool call을 38.5에서 86.9, 122.4로 적고, 20만 건에서 정확도가 13.6점 떨어진다고 하며(그림의 82.7%에서 69.1%와 일치한다), 40만 건에서는 정확도가 37.5%로 떨어지고 20개 예시가 최대 tool 예산에 도달해 중단되었다고 적는다. 그림의 40만 건 막대는 43.0%다.

결론은 동일하다. 고해상도 인터페이스는 유망한 문서에 도달한 뒤에는 여전히 강력하지만, 첫 anchor 문서를 찾는 비용이 후보 공간이 넓어질수록 급격히 커진다. 검색 깊이에는 잘 확장되고 검색 폭에는 비용이 가파르게 오른다.

### 4.7 컨텍스트 관리 ablation (Table 6, RQ5)

BrowseComp-Plus 100문항 무작위 표본, DCI-Agent-Lite (GPT-5.4 nano) 기준이다. Retained cov.는 최종 대화 상태에 남아 있는 gold 증거 문서의 비율이고, 괄호 안은 L0 대비 차이다.

| Level | 평균 tool call | latency(초) | 문항당 비용($) | Retained cov. | 정확도 |
|---|---|---|---|---|---|
| L0 | 28.54 | 2,226.22 | 0.0716 | 26.9 | 72 |
| L1 | 29.00 | 1,819.78 | 0.0720 | 31.3 (+4.4) | 75 (+3) |
| L2 | 29.95 | 4,412.73 | 0.0590 | 27.2 (+0.3) | 69 (−3) |
| L3 | 36.89 | 8,711.81 | 0.1109 | 27.0 (+0.1) | 77 (+5) |
| L4 | 35.35 | 4,531.11 | 0.1021 | 28.0 (+1.1) | 73 (+1) |

패턴이 뚜렷하게 비단조다. L1이 가장 빠르고 최종 상태에 gold 증거를 가장 많이 남기지만(31.3), 최고 정확도(77)는 retained coverage가 더 낮은 L3(27.0)에서 나온다. L2는 비용이 가장 낮고 정확도가 가장 낮으며(69), L4는 L3 정점 이후 다시 내려간다. 저자의 해석은 verbatim 증거 보존과 이어지는 검색에 알맞은 작업 상태 유지가 같지 않다는 것이다. 선택적으로 잊는 정책이 다단계 가설 수정에 도움이 되고, 압축이 너무 약하면 표류가 생기며 너무 거칠면 유용한 중간 구조가 사라진다.

### 4.8 도구 표현력 ablation (Table 5, RQ6)

같은 100문항 부분집합, GPT-5.4-nano backbone이다.

| 설정 | 평균 tool call | 문항당 비용($) | 정확도 |
|---|---|---|---|
| BM25 retriever | 19 | 0.0527 | 32 |
| Qwen3-Embedding-8B retriever | 18 | 0.0498 | 45 |
| DCI-Agent-Lite, read + grep만 (L4) | 19 | 0.0355 | 61 |
| DCI-Agent-Lite, bash 전면 개방 (L4) | 35 | 0.1021 | 73 |

답은 두 겹이다. 첫째, 파일 열람과 패턴 검색만 남긴 매우 제한된 인터페이스에서도 이득이 이미 나타난다. `read + grep`만으로 61%를 기록해 Qwen3-Embedding-8B retriever(45%)를 16점 앞서면서 tool call 강도는 거의 같고 비용은 오히려 낮다. 둘째, bash 명령 집합을 열면 12점이 더 붙지만 tool 사용량과 latency와 연산이 크게 늘어난다. 작은 bash 명령 집합만으로 개선의 대부분을 얻을 수 있고 추가 표현력은 효율을 낮추면서 증분 이득만 준다.

### 4.9 DCI-Agent-Lite의 bash 명령 분포 (Figure 6, §B.1)

trajectory 100건에서 수집한 bash 명령 3,168개의 분포다. 정답 실행과 오답 실행을 합산한 값이다.

| 명령 패턴 | 예시 | 비율 |
|---|---|---|
| Search+Limit | `rg \| head` | 56.2% |
| Chain Search | `rg \| rg` | 20.6% |
| Aggregation Counting | `wc` | 7.8% |
| Single Keyword Search | `rg keyword` | 6.3% |
| List Directory | `ls` | 4.3% |
| Python Scripting | `python -c` | 2.4% |
| Locate File | `find`, `ls \| rg` | 2.1% |
| Other Commands | | 0.2% |
| Full Document Read | `cat <file>` | 0.1% |

전체 문서 읽기가 0.1%로 거의 쓰이지 않는다. agent가 Bash를 고해상도 검색 인터페이스로 다루면서, 넓게 읽는 대신 반복적인 정확 일치 검증으로 후보 공간을 좁힌다는 뜻이다. 저자는 이 명령 기록을 다시 묶어 대체로 시간 순서를 따르는 조작 패턴 6종으로 정리한다. corpus exploration(`ls`로 디렉터리 구조 훑기), broad keyword search(`rg -n`으로 후보 올리기), iterative narrowing(`rg -n "k1" | rg "k2"`로 공간 줄이기), targeted document reading(`read`나 `cat`으로 유망 파일 열기), in-document deep search(`rg -n "term" file.txt`로 단일 문서 안 국소 검색), cross-document comparison(여러 파일을 오가며 검증)이다.

### 4.10 case study (부록 D)

부록 D는 사례 9건의 전체 trajectory를 싣는다. 핵심 세 건은 다음과 같다.

- **Case 1 (D.1, 성공)**: Natural Questions의 "what is don quixote's horse's name"(정답 Rocinante). Grep으로 `wiki_dump.jsonl`에서 "Rocinante"를 찾아 문서 두 개를 확인하고, 이어진 `Don Quixote.*horse` 검색이 파일이 너무 커서 비효율적이 되자 `grep -m 3 "Rocinante" wiki_corpus/wiki_dump.jsonl | head -c 1500`으로 전환해 확인을 마친다. 정규식 검색이 막히면 매치 개수와 출력 바이트를 함께 제한해 우회하는 전형적 패턴이다.
- **Case 5a (D.8, DCI-Agent-CC 실패)**: 2019년 잉글랜드 경기의 물병 실랑이와 임대 이력을 잇는 다중 홉 질문이다(정답 FC Krasnodar). Denis Suarez와 FC Barcelona까지는 정확히 찾아내지만 UEFA 챔피언스리그 벤치 출전의 상대 팀을 잘못 귀속한다.
- **Case 5b (D.9, DCI-Agent-Lite 실패)**: 2000년대 개봉작, 빈부 대비 줄거리, 1960년대생 배우 두 명, 2023년 11월 감독과 배우 형제의 분쟁이 맞물린 영화 식별 문제다(정답 Dosti: Friends Forever). 정밀한 검색어를 만들지 못하고 지나치게 넓은 `rg` 패턴을 반복하다 표면 키워드만 일부 맞는 The Family Man (2000)을 환각으로 답한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

이 논문에는 별도의 한계 절이나 향후 과제 절이 없다. 아래는 본문 각 절의 서술에서 저자가 직접 인정한 제약을 모은 것이다.

- **검색 폭 확장에 비용이 비선형으로 증가한다.** RQ4의 결론이다. 저자는 대규모 정적 corpus에서는 sparse와 dense retrieval이 여전히 확장성 있고 효과적이며, 이들이 corpus 인터페이스 설계 공간의 한 지점을 차지한다고 명시한다.
- **모델 능력에 의존한다.** DCI의 이점은 agent가 전략적으로 검색할 만큼 강할 때 커진다. 검색 primitive를 스스로 합성할 수 있어야 추론 전에 유용한 증거가 버려지는 일을 막는다.
- **latency와 비용의 교환이 있다.** DCI-Agent-Lite는 retriever agent 대비 tool call이 약 두 배이고 문항당 비용도 0.0498달러에서 0.1021달러로 두 배가 넘는다. RQ5의 latency 편차도 크다(L1 1,820초에서 L3 8,712초).
- **localization 지표가 구현에 의존한다.** DCI trace에서는 R(o_t)와 snippet을 원시 tool 출력에서 재구성해야 하고, 경로만 노출된 관찰은 문서 전체를 snippet으로 간주하는 폴백을 쓴다(§A.3). retriever 방식은 API가 이미 표준화해 주므로 비교 조건이 완전히 대칭이지는 않다.
- **평가 범위가 제한적이다.** BRIGHT 4종과 Bamboogle을 제외하면 데이터셋당 50문항 표본이고, ablation은 전부 100문항 부분집합에서 이루어진다.

저자가 결론에서 남긴 방향은 하나다. 앞으로의 연구가 retrieval 모델뿐 아니라 유능한 agent가 쓸 수 있는 corpus 인터페이스도 함께 평가하기를 바란다는 것이다.

### 자료 내적 모순

- **가장 강한 baseline이 무엇인지 세 곳이 어긋난다.** §4.2 본문은 "가장 강한 retrieval baseline"을 GPT-5와 Qwen3-Embedding-8B 조합(71.7%)이라 쓰고 DCI-Agent-CC가 이를 8.3점 앞선다고 적는다. 반면 §A.2는 "o3가 모든 baseline agent 중 BrowseComp-Plus에서 가장 강한 retrieval 성능을 낸다"고 쓴다. Figure 1에는 71.7%에 해당하는 GPT-5 점이 아예 없고(GPT-5.2 점이 50% 부근에 있다), 그림에 그려진 baseline 중 최고는 Claude Sonnet 4.6의 69.0%다.
- **40만 건 corpus의 정확도가 본문과 그림에서 다르다.** 본문 §RQ4는 37.5%, Figure 5의 막대는 43.0%다.
- **Subramanian et al.의 연도 표기가 어긋난다.** 참고문헌은 2025로 적었으나 함께 실은 arXiv 식별자 2602.23368은 2026년 2월 등록을 가리킨다.

## 6. 관련 연구 (Related Work)

- **RAG 계열**: REALM (Guu et al., 2020), RAG (Lewis et al., 2020), RETRO (Borgeaud et al., 2022), Self-RAG (Asai et al., 2023), In-context RALM (Ram et al., 2023), REPLUG (Shi et al., 2024), RAG survey (Gao et al., 2023). 모두 사전 구축 인덱스를 거치는 retrieve-then-generate 구조를 유지한다.
- **Sparse와 dense retrieval**: BM25 (Robertson et al., 1994), ColBERT (Khattab and Zaharia, 2020), DPR (Karpukhin et al., 2020), Contriever (Izacard et al., 2022), E5 (Wang et al., 2022), GTE (Li et al., 2023), Qwen3-Embedding (Zhang et al., 2025).
- **LLM reranking과 adaptive RAG**: Sun et al. (2023), Rank-R1 (Zhuang et al., 2025), Rank1 (Weller et al., 2025), ReasonRank (Liu et al., 2025), Adaptive-RAG (Jeong et al., 2024). 개별 단계를 개선하지만 같은 retrieval 구조를 유지한다.
- **Agentic search**: Search-R1 (Jin et al., 2025), VerlTool (Jiang et al., 2025), Tongyi DeepResearch (Team et al., 2025b), MiroThinker (MiroMind Team, 2025a), OpenResearcher (Li et al., 2026b), ASearcher (Gao et al., 2025), R1-Searcher (Song et al., 2025), ZeroSearch (Sun et al., 2025). 이들 모두에서 모델이 corpus에 접근하는 유일한 통로는 고정된 retriever다.
- **Coding agent**: SWE-agent (Yang et al., 2024)는 bash와 파일 검색과 편집 도구를 갖춘 agent가 직접 프롬프트보다 낫다는 것을, Agentless (Xia et al., 2025)는 단순한 grep과 read pipeline만으로도 전체 agent 프레임워크에 필적함을 보였다. OpenHands (Wang et al., 2025)와 Aider (Gauthier, 2024)가 터미널 기반 coding agent를 정착시켰고, Sutawika et al. (2026)은 CLI primitive만으로 정밀한 코드 위치 특정이 가능함을 보였다.
- **가장 가까운 선행 연구**: Subramanian et al. (2025)의 "Keyword search is all you need: Achieving RAG-level performance without vector databases using agentic tool use" (arXiv 2602.23368)는 원본 PDF 위의 도구 증강 키워드 검색 agent가 문서 QA에서 vector database RAG에 근접할 수 있음을 보였다. 이 논문은 같은 착상을 더 넓은 agentic search 인터페이스 문제로 확장한다고 스스로를 위치시킨다.
- **벤치마크**: BrowseComp-Plus (Chen et al., 2025b, arXiv 2508.06600), BrowseComp (Wei et al., 2025), xbench (Chen et al., 2025a), GAIA (Mialon et al., 2024), BRIGHT (Su et al., 2025), BEIR (Thakur et al., 2021), NQ, TriviaQA, Bamboogle, HotpotQA, 2WikiMHQA, MuSiQue, SWE-bench (Jimenez et al., 2024), SWE-bench Pro (Deng et al., 2025), Terminal-bench (Merrill et al., 2026).
- **IR 관점 재프레이밍**: Zhai (2025) "Information retrieval for artificial general intelligence" (SIGIR'25), Zhang et al. (2024) "Agentic information retrieval" (arXiv 2410.09713), Singh et al. (2025) "Agentic retrieval-augmented generation: A survey on agentic RAG". 이 논문은 이들의 retriever 설계 관점을 인터페이스 설계 문제로 다시 세운다.
- **실제 agentic workspace 근거**: Claude Cowork (Anthropic, 2026)와 OpenClaw (Steinberger and OpenClaw Contributors, 2025)를 corpus가 로컬이고 이질적이며 계속 변하는 환경의 사례로 든다.

## 7. 용어집 (Glossary)

- **Direct Corpus Interaction (DCI)**: 임베딩 모델, vector index, retrieval API를 전혀 거치지 않고 agent가 범용 터미널 도구로 원본 corpus를 직접 탐색하는 retrieval 패러다임.
- **Retriever-mediated access**: 이 논문이 DCI와 대비시키는 기존 패러다임. 오프라인 인덱싱과 retriever가 매개하고 agent는 top-k 조각 위에서만 추론한다.
- **Retrieval interface resolution**: corpus를 관찰하고 검증하고 조작할 수 있는 단위의 세밀도. 문서나 passage 단위 top-k는 저해상도이고, 줄이나 span 단위 grep 매칭은 고해상도다.
- **Coverage**: trajectory가 gold 문서를 표면에 올린 정도. any, mean(recall), all 세 집계를 쓴다.
- **Localization**: surface된 gold 문서 안에서 얼마나 좁은 증거 span으로 좁혔는지의 정밀도. seg-score(d; d*) = ψ(ν(|σ|); ν(|d*|))로 정의한다.
- **DCI-Agent-Lite**: Pi 기반 최소 harness에 `bash`와 `read`만 노출하고 GPT-5.4 nano를 backbone으로 쓰는 통제 실험용 scaffold.
- **DCI-Agent-CC**: Claude Code를 그대로 쓰되 web-search와 web-fetch와 서브에이전트를 끄고 Claude Sonnet 4.6을 backbone으로 쓰는 성능 상한 탐색용 scaffold.
- **Truncation, Compaction, Summarization (L1~L4)**: 장기 trajectory에서 tool 출력 누적을 제어하는 런타임 메커니즘 3종.
- **Retrieval agent**: top-k retriever를 도구로 호출하며 query를 반복해서 고쳐 쓰는 agent. Search-R1과 ASearcher 등이 해당하며 DCI agent와 대비되는 baseline이다.
- **BrowseComp-Plus**: Chen et al. (2025b)가 공개한 폐쇄 corpus 기반 deep research 벤치마크. 830문항, 문서 100,195건(사람이 검증한 지지 문서와 채굴한 hard negative), BM25 및 Qwen3-Embedding-8B FAISS 인덱스를 함께 배포한다.
- **NDCG@10**: Normalized Discounted Cumulative Gain at rank 10. IR ranking의 표준 지표다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | 정확도 대 비용 Pareto frontier | caption-region | wiki 권장 (result) |
| fig02 | 4 | 두 retrieval interface 대비 | caption-region | wiki 권장 (architecture) |
| fig03 | 5 | 런타임 컨텍스트 관리 3종 | caption-region | wiki 권장 (method) |
| fig04 | 9 | 830문항 정오 분포와 tool 호출 분포 | caption-region | wiki 권장 (analysis) |
| fig05 | 10 | corpus 규모 확장 (크롭 결함) | caption-region | 제외 (페이지 전체를 잡아 Table 4와 본문이 섞였다) |
| fig06 | 21 | DCI-Agent-Lite의 bash 명령 분포 | caption-region | wiki 권장 (analysis) |
| tab01 | 5 | 컨텍스트 관리 정책 구성표 | table-region | 제외 (본문 마크다운 표로 이관) |
| tab02 | 8 | 다중 홉 QA 정확도 | table-region | 제외 (본문 마크다운 표로 이관) |
| tab03 | 8 | IR ranking NDCG@10 | table-region | 제외 (본문 마크다운 표로 이관) |
| tab04 | 10 | trajectory 분석 | table-region | 제외 (본문 마크다운 표로 이관) |
| tab05 | 10 | 도구 구성 ablation | table-region | 제외 (본문 마크다운 표로 이관) |
| tab06 | 11 | 컨텍스트 관리 ablation | table-region | 제외 (본문 마크다운 표로 이관) |
| tab07 | 19 | corpus 통계 | table-region | 제외 (본문 마크다운 표로 이관) |

크롭 13장의 md5는 모두 서로 다르므로 중복 크롭은 없다. Table 크롭 7장은 캡션 줄을 제외한 표 본체를 정확히 감쌌으나, 규약에 따라 본문 마크다운 표로 옮기고 이미지는 아카이브로만 남긴다. `fig05`만 결함이 있다. `bbox_norm`이 페이지 세로의 58%를 덮어(면적비 0.386) 실제 Figure 5 차트 외에 Table 4와 RQ2 후반부, RQ3 전체 문단, Table 5 상단이 함께 들어갔다.
