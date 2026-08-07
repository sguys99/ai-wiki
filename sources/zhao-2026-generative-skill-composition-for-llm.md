---
title: "Generative Skill Composition for LLM Agents"
type: paper
year: 2026
category: agents
raw_path: /home/sguys99/project/ai-wiki/raw/papers/zhao-2026-generative-skill-composition-for-llm.pdf
raw_filename: "zhao-2026-generative-skill-composition-for-llm.pdf"
source_collection: external
tags:
  - skill-composition
  - llm-agents
  - agent-skills
  - structured-prediction
  - skill-library
  - autoregressive-decoder
  - retrieval-augmented-decoding
  - skillsbench
  - tf-idf
  - tool-use
authors: "Xinyu Zhao, Zhen Tan, Vaishnav Tadiparthi, Nakul Agarwal, Kwonjoon Lee, Ehsan Moradi Pari, Hossein Nourkhiz Mahjoub, Tianlong Chen"
arxiv_id: "2606.32025"
url: "https://skill-composer.github.io/"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig01.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig01.png
    caption: "Figure 1: (A) 대형 skill library가 만드는 composition bottleneck (B) direct reasoning·retrieval vs. SkillComposer의 ordered executable plan (C) 더 나은 plan이 더 높은 task success로 이어짐"
    page: 2
    bbox_norm: [0.0808, 0.0771, 1.0, 0.2659]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig02.png
    caption: "Figure 2: 196-skill library에서 task+environment를 받아 순서 있는 skill index 시퀀스 (s104, s184, s55 → nws-flood-thresholds, usgs-data-download, flood-detection)를 예측하는 구체 예시"
    page: 4
    bbox_norm: [0.0951, 0.0773, 0.8802, 0.2845]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig03.png
    caption: "Figure 3: SkillComposer 3-컴포넌트 개요 — (A) frozen text encoder (B) auxiliary cardinality·set head를 단 autoregressive decoder (C) retrieval prior를 fuse하는 retrieval-augmented decoding"
    page: 5
    bbox_norm: [0.1205, 0.0771, 0.8549, 0.399]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig04.png
    caption: "Figure 4: gold cardinality k별 Set F1 (in-distribution). SkillComposer가 k=1 버킷(over-emission이 가장 크게 벌 받는 구간)에서 우세해 macro-avg 최고"
    page: 8
    bbox_norm: [0.4778, 0.6184, 0.8945, 0.8355]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig05.png
    caption: "Figure 5: (a) α·β decoding-weight 민감도 격자 (bowl-shaped) (b) trainable params vs. 정확도 — SkillComposer Pareto-optimal (~154× 적은 파라미터) (c) inference latency vs. 정확도"
    page: 10
    bbox_norm: [0.0808, 0.0771, 0.8945, 0.2774]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig06.png
    caption: "Figure 6: single-skill synthesis 프롬프트 (Gemini 2.5 Flash) — 호출당 5개 task, skill 이름 직접 언급 금지 (Appendix B)"
    page: 16
    bbox_norm: [0.0808, 0.2751, 0.8945, 0.7552]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig07.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig07.png
    caption: "Figure 7: multi-skill synthesis 프롬프트 (Gemini 2.5 Pro) — dependency edge에서 유래한 ordering 제약을 verbatim 주입 (Appendix B)"
    page: 17
    bbox_norm: [0.0808, 0.2877, 0.8945, 0.7426]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab01.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab01.png
    caption: "Table 1: Skill prediction quality (%). Left: in-distribution synthetic test ( n =494 ). Right: real-task holdout ( n =65 ); trained models are retrained on the real-task-removed partition. Best non-oracle result in bold ; second best underlined ; oracle- cardinality retrievers (in italics ) are repo"
    page: 9
    bbox_norm: [0.0808, 0.1297, 0.8945, 0.4543]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab02.png
    caption: "Table 2: Downstream task performance on SkillsBench. Pass rate follows the paper-binary protocol, Tok. is the average input prompt tokens per non-errored trial. Best non-oracle result in bold ; second best underlined."
    page: 9
    bbox_norm: [0.4818, 0.6917, 0.8945, 0.8548]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab03.png
    caption: "Table 3: Model component ablation."
    page: 10
    bbox_norm: [0.597, 0.5013, 0.8945, 0.6413]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab04.png
    caption: "Table 4: Decode-time retrieval prior ablation."
    page: 10
    bbox_norm: [0.6196, 0.7994, 0.8281, 0.9082]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab05.png
    caption: "Table 5: Skill dependency graph used for grounding multi-skill synthesis."
    page: 15
    bbox_norm: [0.3042, 0.1627, 0.6711, 0.2686]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab06.png
    caption: "Table 6: Per-layer Set F1 on the synthetic test split (%, deterministic baselines only). Trained-model rows are omitted because the per-layer canonical predictions were not saved with matching record IDs; rerunning inference on the canonical checkpoints is left to a future revision."
    page: 19
    bbox_norm: [0.1247, 0.5088, 0.8506, 0.6598]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

에이전트가 큰 skill library에서 "어떤 skill을, 몇 개, 어떤 순서로" 쓸지 고르는 문제를 **task-conditioned skill sequence prediction**(닫힌 어휘 위의 생성)으로 정식화하고, frozen encoder와 작은 autoregressive decoder에 TF-IDF retrieval prior와 set-membership 신호를 결합한 **SkillComposer**(~3.9M 학습 파라미터)를 제안한다. SkillsBench에서 GPT-5.2-Codex와 Gemini-3-Pro-Preview 두 프로덕션 코딩 에이전트의 pass rate를 no-skill 대비 +23.1 / +18.2 pp 끌어올렸고, retrieval을 앞서면서 gold-skill retrieval 상한에 근접한다.

## 1. 자료 정보 (Document Information)

- **제목**: Generative Skill Composition for LLM Agents
- **저자**: Xinyu Zhao·Tianlong Chen(UNC Chapel Hill), Zhen Tan(Arizona State), Vaishnav Tadiparthi·Nakul Agarwal·Kwonjoon Lee·Ehsan Moradi Pari·Hossein Nourkhiz Mahjoub(Honda Research Institute USA)
- **arXiv**: 2606.32025v1 (2026-06-30, cs.CL) · Preprint, under review
- **프로젝트 페이지**: https://skill-composer.github.io/
- **후원**: Honda Research Institute USA
- **핵심 세팅**: SkillBench가 공개한 196-skill human-curated library를 고정(fixed)으로 두고, 그 위에서 skill 구성을 예측한다. 학습 데이터는 9,872 task–skill-sequence 레코드(real anchor 65 + single-skill synthetic 2,880 + multi-skill synthetic 6,927)를 90/5/5 train/val/test로 나눴다.
- **평가 축 2개**: (1) composition 품질(held-out test), (2) SkillsBench 다운스트림 task success(GPT-5.2-Codex·Gemini-3-Pro-Preview).

## 2. 주요 기여 (Key Contributions)

1. **structured skill composition 정식화** — inference-time skill 사용을 고정 library 위의 **구조적 예측** 문제로 규정한다. 출력 plan은 *어떤 skill을 활성화할지(subset), 몇 개(count), 어떤 순서(order)* 세 축을 **동시에** 결정한다. 저자들의 핵심 주장은 이 세 축이 분리 불가(coupled)라는 것이다. retrieval은 순서 없는 subset만 다루고, direct reasoning은 명시적 plan 없이 실행 trace에 암묵적으로만 남긴다.
2. **실제 library 기반 데이터셋 구축** — real task-composition seed에서 시작해 **skill dependency graph**(196 노드, dependency edge 658 + workflow edge 266 = 924 edge)를 만들고, layered synthesis와 품질 필터링으로 single-skill·multi-skill dependency-aware 감독 신호를 생성한다.
3. **SkillComposer 제안** — skill index 위의 constrained autoregressive decoder로 subset·cardinality·ordering을 단일 디코딩 패스에 통합한다. 생성 원소는 항상 실행 가능한 library skill에 대응한다(닫힌 어휘).
4. **두 프로덕션 코딩 에이전트에서 평가** — {Codex, Gemini}에서 SkillsBench pass rate를 {+23.1, +18.2} pp 높여 retrieval을 앞서고 gold-skill retrieval 상한에 근접하되, 이를 **더 적은 prompt 토큰**으로 달성한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 문제 정식화 — Task-conditioned Skill Sequence Prediction

task 설명 x, 환경 context c, skill library S={s₁,…,s_K}(K=196)가 주어지면, 모델 f_θ가 가변 길이 skill 인덱스 시퀀스 ẑ=(ẑ₁,…,ẑ_n̂, STOP)를 예측한다. 각 ẑ_t ∈ {1,…,K}는 skill 하나를 가리키고, STOP 위치가 skill 개수 n̂을 정한다. 예측된 skill은 순서대로 에이전트 context에 로드된다. 한 번의 예측으로 세 축(subset·count·order)을 동시에 푸는 셈이다. Figure 2가 구체 예시다. Michigan USGS 홍수 탐지 task → (s104, s184, s55) = (nws-flood-thresholds, usgs-data-download, flood-detection).

**skill 정의**(Def 3.1): sᵢ = (mᵢ, Cᵢ, πᵢ, Tᵢ, Rᵢ) — 메타데이터(이름+한 줄 설명), applicability 조건, procedural policy, termination 조건, 선택적 callable interface. tool(atomic API call)·plan(일회성 추론)·prompt template과 달리, skill은 task와 세션을 가로질러 지속되는 재사용 절차 지식이다. **progressive disclosure** 방식으로, 시작 시점에는 compact 메타데이터만 로드하고 예측이 끝난 뒤에야 full instruction을 활성화한다.

### SkillComposer 3-컴포넌트

**(i) Frozen text encoder** — 직렬화된 프롬프트 P(x,c,S)를 pooled task 벡터 h로 매핑한다. **Qwen3-Embedding-0.6B**(last-token pooled, 출력 1024차원)을 frozen으로 쓰고 d=256으로 projection한다. encoder는 얼려 두고 projection·decoder·auxiliary head만 학습한다.

**(ii) Constrained autoregressive decoder** — 3-layer, 256-dim, 4-head transformer다. skill은 projected 메타데이터 embedding에 대한 **cross-attention**으로 노출돼, decoder가 인덱스가 아니라 자연어 설명으로 K개 후보를 구분한다. AR head가 세 축의 joint 분포를 모델링하되 ordering을 전담하고, 나머지 두 축은 **auxiliary head**가 보강한다:
- **Cardinality head(몇 개)**: h_x 위의 선형 분류기가 skill 개수 n̂ ∈ {1,…,N_max}(N_max=8)를 직접 예측해, AR의 STOP 방출과 독립적인 length 신호를 준다.
- **Set head(어떤 skill)**: pairwise matcher가 각 skill을 task 벡터와 독립 채점한다. σᵢ = MLP([h; eᵢ; h⊙eᵢ; |h−eᵢ|]). gold membership 1[sᵢ∈ŝ]에 대한 BCE로, 위치와 무관하게 모든 관련 skill에 직접 gradient를 흘린다.

**(iii) Retrieval-augmented decoding** — skill library가 heavy-tailed라서(많은 skill이 학습 task 1~2개에만 등장) 학습 표현만으로는 신호가 약하다. 각 출력 인덱스가 고정 메타데이터 문서에 대응하므로, task당 한 번 precompute한 relevance score를 모든 디코딩 스텝에서 **거의 공짜로** 재사용한다. retriever r은 **TF-IDF cosine**(unigram–bigram)이다. 스텝 t의 fused logit은 다음과 같다:

  ℓ̃_t(i) = ℓ_t(i) [contextual] + α·rᵢ [relevance] + β·σᵢ [set],  α=1.0, β=0.5

STOP logit에는 retrieval/membership prior를 더하지 않아, 종료는 AR stop logit(및 필요 시 cardinality prior)이 제어한다. fused logit은 softmax·beam search(width-4, length penalty 0.7, duplicate-skill 제약)를 거친다.

### 데이터 구축

- **real anchor(65)**: SkillBench의 human-authored SWE task와 gold skill 주석이다. 순서는 agent trajectory 로그에서 복원하고, 없으면 Gemini 2.5 Pro로 대체한다.
- **single-skill synthetic(2,880, Gemini 2.5 Flash)**: 196 skill을 균등 커버하고, 단순 쿼리에서 skill 하나만 쓰고 종료하도록 calibration한다. 프롬프트는 skill 이름을 직접 언급하지 않아, 표면형이 아니라 의미로 skill 정체를 복원하게 만든다.
- **multi-skill synthetic(6,927, Gemini 2.5 Pro)**: 2~5 skill 조합이다. dependency edge(I/O type 겹침 → hard data-flow 순서)와 workflow edge(anchor trajectory 공출현 → 경험적 순서)를 196-노드 그래프에서 샘플링한다(65% dependency / 35% workflow).
- **dedup·validation**: 정확 문자열 매치 → character-trigram Jaccard >0.6 → sentence-embedding cosine >0.92의 3단계다. 닫힌 어휘 위반(skill 추가·삭제·개명, ordered_skills가 permutation 아님)은 폐기한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### Skill 예측 품질 (Table 1)

**in-distribution synthetic test(n=494)**: SkillComposer의 Set F1은 **73.9**로, SFT(Qwen3-0.6B-Base) 대비 +2.8 pp, LLM-judge(Gemini-2.5-flash) 대비 +12.9 pp를 **~154× 적은 파라미터(3.9M vs 600M)**로 달성한다. MRR·nDCG@5도 우세하다(SFT는 Set EM에서만 근소 우위). cardinality slice(Figure 4)에서는 이점이 **k=1 버킷**(over-emission이 가장 벌 받는 구간)에 집중돼 macro-avg가 가장 높다.

**real-task holdout(n=65, synthetic-only 학습)**: distribution shift 하에서 SFT는 27.5 pp 급락하는데(71.1→43.6) SkillComposer는 11 pp만 하락한다(73.9→62.9) → **+19.3 pp Set F1 격차**. predicted-k 방법 중 유일하게 oracle-k 상한에 근접하고, frontier LLM-judge도 앞선다. retrieval 계열은 오히려 synthetic→real에서 개선되는데(real 표현이 skill 설명에 더 가깝다), 이 전이 편향은 **frozen retrieval-tuned encoder와 작은 specialist decoder**가 공급한다.

### 다운스트림 Task 성능 (Table 2, SkillsBench)

88개 중 75개 task(파일 확장자로 trivial 라우팅되는 office/document 13개 제외), agent당 225 trial(3회×temp 0), 1200s timeout.

| Skill 조건 | Codex Pass ↑ | Codex Tok ↓ | Gemini Pass ↑ | Gemini Tok ↓ |
|---|---|---|---|---|
| *Retrieval (oracle)* | *44.0* | *1.13M* | *42.2* | *1.19M* |
| *Gold Skills* (상한) | *51.1* | *1.12M* | *48.4* | *1.18M* |
| No Skills | 22.2 | 0.94M | 25.8 | 0.99M |
| All Skills(196개 전부) | 29.3 | 1.27M | 38.7 | 1.33M |
| Retrieval (top-3) | 44.0 | 1.09M | 41.8 | 1.14M |
| **SkillComposer** | **45.3** | **1.03M** | **44.0** | **1.08M** |

- No Skills와 Gold Skills 사이에는 약 +25 pp headroom이 있다. **library 전부를 주입하는 All Skills는 headroom의 일부만 회복하면서 prompt를 1.27M 토큰으로 부풀린다** → "context를 쏟아붓는다고 되지 않는다".
- SkillComposer는 oracle skill 레이블 없이 calibrated ordered shortlist로 두 retrieval baseline을 앞서고 Retrieval(oracle)을 매치·초과하며, **최소 prompt 예산**(1.03M Codex)으로 headroom의 약 **80%**를 닫는다.

### Ablation (Table 3·4, Figure 5)

- 각 컴포넌트가 load-bearing이다: AR-only 69.3 → +set head 71.8 → 완성 73.9. decode 시 set-fusion을 빼면 −7.1 pp, retrieval prior를 빼면 −4.6 pp다.
- **sparse > dense as decode prior**: TF-IDF 73.9 > BM25 70.0 > Qwen3-Embedding 68.8 > no prior 67.5. 196개의 짧고 구문적으로 특이한 skill 이름은 token-level overlap이 고정밀이기 때문이다. 다만 task 표현(h_x)에는 dense Qwen3-Embedding이 여전히 정답이라, 둘의 강점을 조합한다.
- (α,β) 6×6 격자는 smooth·bowl-shaped라(val 선택점이 모든 이웃 ±2 pp 안) fragile hand-tuning이 아니다. Figure 5(b/c)를 보면 Pareto-optimal이다(~154× 적은 파라미터, ~25× 적은 학습 compute, SFT와 같은 latency class, API judge보다 2 order 빠름).

### Case Study (Appendix C)

- **Case 1(adaptive-cruise-control)**: top-3 retrieval이 핵심 imc-tuning-rules를 잘라 2/3 실패하고, gold조차 무용한 I/O skill을 묶어 0.33에 그친다. SkillComposer는 gold에서 벗어나 I/O wrapper를 버리고 gold가 빠뜨린 imc-tuning-rules를 넣어 **1.00**을 낸다 → gold key로 회귀하는 게 아니라 유용한 skill을 식별한다.
- **Case 2(exoplanet-detection-period)**: 최소 recipe로 매 trial 성공(1.00)하는 반면, gold는 중복 estimator와 무거운 wrapper로 0.00이다 → 작고 잘 고른 집합이 큰 curated 집합을 이긴다.
- **Case 3(lean4-proof)**: **short-sequence bias**가 드러난다 — gold 시퀀스가 ≥2~3 skill일 때 SkillComposer의 shortlist가 한 슬롯 부족해지는 경향이다. synthetic 코퍼스가 ≤3-skill 조합에 치우친 결과이며, long-sequence 학습 레코드 구축이 가장 실행 가능한 headroom이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **범위**: text-only task 설명과 code 지향 skill library에 국한된다. multimodal task 명세(스크린샷·스케치·음성), library가 online으로 갱신되는 interactive·long-horizon 세팅, 과학 워크플로우·로보틱스·embodied 도메인으로의 확장은 future work다.
- **backbone 스케일**: small-LM·embedding backbone의 특성(사전학습 코퍼스의 언어 prior·task 커버리지)을 그대로 상속한다. 더 강한 backbone과 더 큰 curated library라면 composition 정확도·ordering을 더 예리하게 다듬을 것으로 기대한다.
- **long-chain under-emission**: Case 3에서 드러난 short-sequence bias로, synthetic 데이터의 ≤3-skill 편향이 원인이다. long-sequence 학습 레코드 구축이 가장 actionable한 개선점이다.

## 6. 관련 연구 (Related Work)

- **skill library·discovery**: Voyager(Wang 2023), CRAFT(Yuan 2023), CREATOR(Qian 2023), Ma 2025. 모두 selection 시점에 flat retrieval(embedding 유사도 독립 랭킹)을 써서 개수·의존성을 고려하지 않는다. 최근 SkillRouter(Zheng 2026)·SkillFlow(Li 2025)·Graph of Skills(Liu 2026a)·Skill Retrieval Augmentation(Su 2026)·SkillsBench(Li 2026)·SoK Agentic Skills(Jiang 2026)·SkillRL(Xia 2026) 등이 나왔으나, **누구도 skill selection을 명시적 cardinality·ordering을 갖는 닫힌 어휘 시퀀스 생성으로 모델링하지 않는다**.
- **tool-level planning**: HuggingGPT(Shen 2023)·ToolkenGPT(Hao 2023)·ToolChain*(Zhuang 2023)·TaskBench(Shen 2024)·graph planning(Wu 2024)은 atomic function-call 수준이다. typed signature·return value가 강한 구조 신호를 주지만, skill은 typed signature가 없어 의존성이 latent·task-logical이고 catalog가 작아도 강하게 상호작용한다(두 skill만 바꿔도 결과가 뒤집힌다) → flat retrieval·atomic search 모두 부적합하다.
- **생성적 retrieval 영감**: Recommender with Generative Retrieval(Rajput 2023), ToolkenGPT(Hao 2023) — 닫힌 어휘 위의 생성으로 retrieval/tool selection을 프레이밍한다.
- **Agent Skills 표준**: open Agent Skills standard(agentskills.io), Anthropic "Equipping agents with agent skills"(2025).

## 7. 용어집 (Glossary)

- **skill (agentic skill)**: 모델 가중치를 바꾸지 않고 inference 시 procedural 지식을 프롬프트 context에 주입하는 재사용 절차 모듈. (mᵢ 메타데이터, Cᵢ 조건, πᵢ policy, Tᵢ 종료, Rᵢ callable)의 5-튜플.
- **structured skill composition**: 주어진 task·library에 대해 활성 subset·개수·실행 순서를 **동시에** 정하는 executable skill plan 예측.
- **task-conditioned skill sequence prediction**: 위 문제를 STOP으로 끝나는 skill 인덱스 시퀀스 생성으로 정식화한 것.
- **constrained autoregressive decoder**: 출력 어휘를 library 인덱스+STOP로 제한한 AR 디코더. 생성 원소가 항상 실행 가능한 skill.
- **cardinality head / set head**: AR head를 보강하는 auxiliary head. 각각 "몇 개"(길이)와 "어떤 skill"(order-agnostic membership)에 전용 감독 채널을 제공하고, inference 시 decoding prior로 재사용된다.
- **retrieval-augmented decoding**: contextual logit에 TF-IDF relevance(α)와 set-membership(β) prior를 fuse. heavy-tail skill의 약한 학습 신호를 보완.
- **Set F1**: 예측·gold skill 집합 간 order-agnostic F1. selection 품질과 cardinality calibration을 한 수치로 포착.
- **dependency edge / workflow edge**: skill dependency graph의 두 edge 유형. I/O type 겹침(hard data-flow 순서) vs. real trajectory 공출현(경험적 순서).
- **progressive disclosure**: 시작 시 compact 메타데이터만 로드하고 예측 확정 후 full instruction을 여는 skill library 관행.
- **SkillBench / SkillsBench**: 이 논문이 기반한 curated 196-skill library(SkillBench, Li 2026)와 다운스트림 task 벤치마크(SkillsBench, 88 task).
- **oracle-k / best-k**: retrieval baseline 변형. gold 길이를 알려준 상한(oracle) vs. val로 튜닝한 k(best). predicted-k 방법과 구분해 selection 품질을 cardinality 예측과 분리 측정.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Figure 1: composition bottleneck + direct/retrieval vs. SkillComposer + task success (A/B/C) | page-region | ★ wiki 권장 (문제·개요) |
| fig02 | 4 | Figure 2: 홍수 탐지 task의 ordered skill sequence 예측 구체 예시 | page-region | ★ wiki 권장 (task 예시) |
| fig03 | 5 | Figure 3: SkillComposer 3-컴포넌트 method overview | page-region | ★ wiki 권장 (architecture) |
| fig04 | 5 | (false positive — fig03과 동일 페이지 텍스트 참조) | page-region | 제외 |
| fig05 | 8 | Figure 4: gold cardinality k별 Set F1 (k=1에서 우세) | page-region | ★ wiki 권장 (result) |
| fig06 | 10 | Figure 5: (a) α·β 격자 (b) params vs. 정확도 Pareto (c) latency vs. 정확도 | page-region | ★ wiki 권장 (efficiency) |
| fig07 | 16 | Figure 6: single-skill synthesis 프롬프트 (Appendix) | page-region | (선택) |
| fig08 | 17 | Figure 7: multi-skill synthesis 프롬프트 (Appendix) | page-region | (선택) |
