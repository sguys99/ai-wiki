---
title: "Generative Skill Composition for LLM Agents"
type: paper
year: 2026
category: agents
raw_path: raw/papers/zhao-2026-generative-skill-composition-for-llm.pdf
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
    caption: "Figure 1: 커진 skill library의 composition bottleneck(A), direct reasoning과 retrieval이 놓치는 구조를 순서 있는 실행 가능 plan으로 채우는 SkillComposer(B), 그리고 개선 폭(C)"
    page: 2
    bbox_norm: [0.0808, 0.0771, 1.0, 0.2659]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig02.png
    caption: "Figure 2: 196개 skill library와 Michigan USGS 홍수 탐지 task에서 인덱스 시퀀스 (s104, s184, s55)를 예측하는 예시"
    page: 4
    bbox_norm: [0.0951, 0.0773, 0.8802, 0.2845]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig03.png
    caption: "Figure 3: SkillComposer의 세 구성 요소. 얼려 둔 text encoder(A), cardinality head와 set head를 붙인 autoregressive decoder(B), prior를 logit에 합치는 retrieval-augmented decoding(C)"
    page: 5
    bbox_norm: [0.1205, 0.0771, 0.8549, 0.399]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig04.png
    caption: "Figure 4: gold cardinality k별 Set F1. SkillComposer는 k=1에서 71%로 앞서고 macro 평균 74%로 가장 높다"
    page: 8
    bbox_norm: [0.4778, 0.6184, 0.8945, 0.8355]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig05.png
    caption: "Figure 5: 디코딩 가중치 민감도 격자(a), 학습 파라미터 대비 정확도(b), 추론 latency 대비 정확도(c)"
    page: 10
    bbox_norm: [0.0808, 0.0771, 0.8945, 0.2774]
    strategy: caption-region
    curated: true
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig06.png
    caption: "Figure 6: single-skill 합성 프롬프트 (Gemini 2.5 Flash). 호출당 task 5개, skill 이름 언급 금지 (Appendix B)"
    page: 16
    bbox_norm: [0.0808, 0.2751, 0.8945, 0.7552]
    strategy: caption-region
    curated: false
  - id: fig07
    label: Figure 7
    kind: figure
    file: assets/zhao-2026-generative-skill-composition-for-llm/fig07.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/fig07.png
    caption: "Figure 7: multi-skill 합성 프롬프트 (Gemini 2.5 Pro). dependency edge의 순서 제약을 문장 그대로 주입한다 (Appendix B)"
    page: 17
    bbox_norm: [0.0808, 0.2877, 0.8945, 0.7426]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab01.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab01.png
    caption: "Table 1: skill 예측 품질 (%). 왼쪽 in-distribution synthetic test (n=494), 오른쪽 real-task holdout (n=65). oracle-k 행은 상한 참고용이다"
    page: 9
    bbox_norm: [0.0808, 0.1297, 0.8945, 0.4543]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab02.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab02.png
    caption: "Table 2: SkillsBench 다운스트림 task 성능. pass rate와 오류 없이 끝난 trial의 평균 입력 프롬프트 토큰 수"
    page: 9
    bbox_norm: [0.4818, 0.6917, 0.8945, 0.8548]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab03.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab03.png
    caption: "Table 3: 모델 구성 요소 ablation. AR-only 69.3%에서 전체 구성 73.9%까지, 디코딩 prior 제거 시 65.0%와 67.5%"
    page: 10
    bbox_norm: [0.597, 0.5013, 0.8945, 0.6413]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab04.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab04.png
    caption: "Table 4: 디코딩 시점 retrieval prior 비교. TF-IDF 73.9%가 BM25 70.0%와 Qwen3-Embedding 68.8%를 앞선다"
    page: 10
    bbox_norm: [0.6196, 0.7994, 0.8281, 0.9082]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab05.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab05.png
    caption: "Table 5: skill dependency graph. dependency edge 658개와 workflow edge 266개로 합계 924개"
    page: 15
    bbox_norm: [0.3042, 0.1627, 0.6711, 0.2686]
    strategy: table-region
    curated: false
  - id: tab06
    label: Table 6
    kind: table
    file: assets/zhao-2026-generative-skill-composition-for-llm/tab06.png
    raw: raw/papers/zhao-2026-generative-skill-composition-for-llm-figures/tab06.png
    caption: "Table 6: synthetic test의 데이터 층별 Set F1 (%, 결정적 baseline만). real anchor 열은 n=4로 표준오차가 크다"
    page: 19
    bbox_norm: [0.1247, 0.5088, 0.8506, 0.6598]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

에이전트가 큰 skill library에서 "어떤 skill을, 몇 개, 어떤 순서로" 쓸지 고르는 문제를 닫힌 어휘 위의 생성, 즉 **task-conditioned skill sequence prediction**으로 정식화하고, 얼려 둔 encoder와 작은 autoregressive decoder에 TF-IDF retrieval prior와 set-membership 신호를 결합한 **SkillComposer**(학습 파라미터 약 3.9M)를 제안한다. SkillsBench에서 GPT-5.2-Codex와 Gemini-3-Pro-Preview 두 프로덕션 코딩 에이전트의 pass rate를 no-skill 대비 각각 23.1%p와 18.2%p 끌어올려, top-3 retrieval을 앞서고 oracle retrieval 상한(Codex 44.0%)을 넘어섰다.

## 1. 자료 정보 (Document Information)

- **제목**: Generative Skill Composition for LLM Agents
- **저자**: Xinyu Zhao와 Tianlong Chen(UNC Chapel Hill), Zhen Tan(Arizona State), Vaishnav Tadiparthi, Nakul Agarwal, Kwonjoon Lee, Ehsan Moradi Pari, Hossein Nourkhiz Mahjoub(Honda Research Institute USA)
- **arXiv**: 2606.32025v1 (2026-06-30 등록, 표지 날짜 2026-07-01, cs.CL). Preprint, under review. 후원은 Honda Research Institute USA
- **프로젝트 페이지**: https://skill-composer.github.io/
- **핵심 세팅**: Li et al. 2026이 공개한 196개 skill의 human-curated library를 학습 시점에 고정으로 두고 그 위에서 skill 구성을 예측한다. 실제 배포가 open-ended skill 생성이 아니라 curated skill pack을 함께 출하하기 때문이며, 이렇게 두면 composition 문제를 skill-creation 문제와 분리할 수 있다.
- **학습 데이터**: 9,872개 task와 skill-sequence 레코드다. real anchor 65개, single-skill synthetic 2,880개, multi-skill synthetic 6,927개로 구성되고 90/5/5 train/val/test로 나눴다.
- **평가 기준 2가지**: (1) held-out test 위의 composition 품질, (2) SkillsBench 다운스트림 task success.

## 2. 주요 기여 (Key Contributions)

1. **structured skill composition 정식화**: inference 시점의 skill 사용을 고정 library 위의 구조적 예측 문제로 규정한다. 출력 plan은 어떤 skill을 활성화할지(subset), 몇 개인지(count), 어떤 순서인지(order)를 **동시에** 결정하며, 저자들의 핵심 주장은 이 세 가지가 분리 불가(coupled)라는 것이다. retrieval은 순서 없는 subset만 다루고, direct reasoning은 명시적 plan 없이 실행 trace에 암묵적으로만 남긴다.
2. **실제 library 기반 데이터셋 구축**: real task-composition seed에서 출발해 skill 메타데이터와 관측된 workflow 공출현으로 skill dependency graph(196 노드, dependency edge 658개 + workflow edge 266개 = 924개)를 만들고, layered synthesis와 품질 필터링으로 single-skill 그라운딩과 multi-skill dependency-aware 감독 신호를 함께 얻는다.
3. **SkillComposer 제안**: skill 인덱스 위의 constrained autoregressive decoder로 subset, cardinality, ordering을 단일 디코딩 패스에 통합한다. 출력 어휘가 닫혀 있어 생성 원소는 항상 실행 가능한 library skill에 대응하고, 예측된 plan은 사람이 열어 볼 수 있으며 다운스트림 에이전트에 바로 로드된다.
4. **두 프로덕션 코딩 에이전트에서 평가**: Codex와 Gemini에서 SkillsBench pass rate를 각각 23.1%p, 18.2%p 높여 retrieval을 앞서고 gold-skill retrieval 상한을 매치하되, 이를 더 적은 프롬프트 토큰으로 달성한다.

논문이 든 동기 예시는 "폐기 예정 API 호출을 찾고, 코드베이스 전반에서 refactor하고, regression suite를 실행하라"는 요청이다. retrieval은 검색, 편집, 테스트에 관련된 skill을 개별적으로 띄울 수 있지만, 랭킹된 목록만으로는 몇 개를 쓸지도 어떤 순서로 실행할지도 정하지 못한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 문제 정식화

task 설명 x, 환경 컨텍스트 c, skill library S={s1,…,sK}(K=196)가 주어지면 모델 f_θ가 가변 길이 skill 인덱스 시퀀스 ẑ=(ẑ1,…,ẑn̂, STOP)를 예측한다. 각 ẑt는 1부터 K까지의 값으로 skill 하나를 가리키고, STOP의 위치가 skill 개수 n̂을 정한다. 인덱스 조회로 ŝ를 복원한 뒤 예측된 순서대로 에이전트 컨텍스트에 로드한다. Figure 2가 구체 예시로, Michigan USGS 홍수 탐지 task에서 (s104, s184, s55), 즉 (nws-flood-thresholds, usgs-data-download, flood-detection)을 뽑는다.

**skill 정의**(Def 3.1)는 si = (mi, Ci, πi, Ti, Ri)의 5-튜플이다. mi는 이름과 한 줄 설명을 담은 메타데이터, Ci는 applicability 조건, πi는 procedural policy, Ti는 termination 조건, Ri는 선택적 callable interface나 보조 자원이다. tool(atomic API call), plan(일회성 task-specific 추론), prompt template(applicability 게이팅이 없는 정적 텍스트)과 달리 skill은 task와 세션을 가로질러 지속되는 재사용 절차 지식이다. library는 **progressive disclosure**로 노출되어, 에이전트는 시작 시점에 compact 메타데이터만 로드하고 예측이 확정된 뒤에야 full instruction을 활성화한다.

### SkillComposer의 세 구성 요소

**(i) Frozen text encoder**: 직렬화된 프롬프트 P(x,c,S)를 pooled task 벡터 h=W_proj h_x로 매핑한다. Qwen3-Embedding-0.6B(last-token pooled, 출력 1024차원, 모델 카드의 instruct prefix 사용)를 얼려 쓰고 d=256으로 projection한다. 학습 대상은 projection W_proj, decoder 파라미터 θ, auxiliary head 파라미터 ψ와 ξ뿐이다.

**(ii) Constrained autoregressive decoder**: 3-layer pre-norm Transformer로 hidden width 256, attention head 4개, dropout 0.1이다. 196행 skill 메모리로 들어가는 cross-attention을 두어 decoder가 인덱스만이 아니라 자연어 설명으로 K개 후보를 구분한다. 출력 어휘는 닫힌 library에 STOP, START, PAD를 더한 것이다.

AR head는 세 측면의 joint 분포를 모델링한다. ordering에는 알맞지만 나머지 두 측면의 감독을 희석시키는데, 길이 신호 전체가 단일 STOP 위치에 실리고 관련 skill의 양성 감독이 gold 위치에서만 나타나기 때문이다. 그래서 AR head에 ordering을 남기고 나머지 두 측면에 auxiliary head를 하나씩 붙인다.

- **Cardinality head(몇 개)**: h_x 위의 선형 분류기가 p_ψ(n̂|x,c)=softmax(W_n h)로 skill 개수를 1부터 N_max(=8)까지에서 직접 예측한다. AR head의 STOP 방출과 독립적인 길이 신호를 주므로 디코딩을 부드럽게 편향시키거나 강하게 잘라내는 데 쓸 수 있다.
- **Set head(어떤 skill)**: pairwise matcher가 각 skill을 task 벡터와 독립 채점한다. σi = MLP_ξ([h; ei; h⊙ei; |h−ei|])이고 ei는 si의 메타데이터 임베딩을 projection한 값이다. 연결한 네 항이 task와 skill 사이의 identity, interaction, distance를 담는다. MLP_ξ는 hidden width 256의 2-layer MLP로 출력 logit이 하나다. 감독은 gold membership 지표에 대한 binary cross-entropy이므로, 관련 skill마다 시퀀스 내 위치와 무관하게 직접 gradient가 흐른다.

**(iii) Retrieval-augmented decoding**: 추론 시점 prior를 하나 더 두는 근거는 두 가지다. 첫째, skill library가 heavy-tailed다. 많은 skill이 학습 task 한두 개에만 등장해 학습된 표현으로는 가려낼 신호가 약한 반면, retrieval 점수는 library 전체 코퍼스를 근거로 삼고 skill별 학습 데이터를 요구하지 않는다. 둘째, 각 출력 인덱스가 고정된 메타데이터 문서에 대응하므로 task-skill relevance를 task당 한 번 미리 계산해 두면 decoder를 고치지 않고 모든 디코딩 스텝에서 재사용할 수 있어 비용이 거의 없다.

retriever r은 library에서 만든 unigram과 bigram 어휘 위의 TF-IDF cosine similarity다. 스텝 t의 fused logit은 `ℓ̃t(i) = ℓt(i) + α·ri + β·σi`로, 차례로 contextual 항, relevance 항, set 항이다. 추론에서는 검증 Set F1으로 튜닝한 α=1.0, β=0.5를 쓰고, 학습 시점에 시퀀스 손실과 함께 학습되는 두 fusion prior의 가중치는 α=0.5, β=0.25로 별개 값이다. STOP logit에는 어느 prior도 더하지 않으므로 종료는 주로 AR stop logit이 통제한다. fused logit은 softmax와 beam search를 거치며, beam width 4, length penalty 0.7, 중복 skill 금지 제약이 걸린다.

### 학습 설정

optimizer는 AdamW(learning rate 1e-4, weight decay 0.01), batch size 64, 최대 100 epoch에 검증 Set F1 기준 patience 15의 early stopping이다. encoder 후보로 Qwen3-Embedding-0.6B와 Qwen3-0.6B-Base(causal LM, mean-pooled)를 비교하며 후자를 쓴 변형이 SkillComposer_Base다. lexical 가중치, set fusion 가중치, 그리고 synthetic 데이터와 real 데이터의 cardinality 편차를 흡수하는 per-split stop bias는 검증 분할 위의 coordinate ascent로 고른다. latency는 A6000 1장, fp16, batch 1에서 측정했다.

### 데이터 구축

- **real anchor(65개)**: Li et al. 2026의 human-authored 소프트웨어 엔지니어링 task와 gold skill 주석이다. task별 순서는 에이전트 trajectory 로그에서 복원하고, 로그가 없으면 Gemini 2.5 Pro 폴백으로 채운다.
- **single-skill synthetic(2,880개, Gemini 2.5 Flash)**: 196개 skill을 균등하게 덮고, 단순 쿼리에서 skill 하나만 쓰고 종료하도록 composer를 calibration한다. 프롬프트는 호출당 task 5개를 요구하고 난이도를 easy 2개, medium 2개, hard 1개로 배분하며, task 설명에 skill 이름을 쓰지 못하게 막아 표면형이 아니라 의미로 skill 정체를 복원하게 만든다.
- **multi-skill synthetic(6,927개, Gemini 2.5 Pro)**: skill 2개에서 5개까지의 조합이다. **dependency edge**는 상류 skill의 출력 type이 하류 skill의 입력 type과 겹치는 쌍으로 hard data-flow 순서를 담고, **workflow edge**는 real anchor trajectory의 공출현에서 캐낸 쌍으로 공유 I/O type이 없을 때의 경험적 순서를 담는다. 196노드 그래프에서 dependency edge 65%와 workflow edge 35%로 샘플링하며, 이 비율은 real anchor task에서 관측된 hard data-flow 사슬 대 느슨한 plan-then-implement 워크플로의 비율에 맞춘 것이다.
- **dedup과 validation**: 강도를 올려 가며 정확 문자열 매치, character-trigram Jaccard 0.6 초과, 캐시된 library 임베딩 뱅크에 대한 sentence-embedding cosine 0.92 초과의 세 단계로 중복을 걸러낸다. 살아남은 레코드는 닫힌 어휘 검사를 받아, skill을 추가하거나 빼거나 개명한 응답과 ordered_skills가 프롬프트 입력의 정확한 permutation이 아닌 응답은 버린다. multi-skill 레코드는 프롬프트에 넣은 dependency-edge 순서 제약을 반환 순서가 지켰는지 추가로 확인한다.
- **분할**: 90/5/5는 세 그룹 안에서 각각 독립적으로 seed 42로 적용해, 그룹 비율이 분할 간에 유지되고 검증과 테스트 집합이 수가 많은 synthetic 그룹에 지배되지 않는다.

### Baseline과 평가 지표

세 baseline 계열 모두 같은 닫힌 library에서 skill 8개 이하의 순서 있는 목록을 예측한다. **Retrieval**은 BM25, TF-IDF cosine, Qwen3-Embedding-0.6B이고 각각 검증으로 k를 고른 best-k와 gold 길이를 알려준 oracle-k 두 변형을 둔다. **LLM-judge**(Gemini-2.5-flash)는 196개 skill의 이름과 메타데이터를 한 프롬프트에 담아 채점하고 순서 있는 shortlist를 바로 반환하며, 어떤 skill과 몇 개를 모두 모델이 고른다. **SFT**(Qwen3-0.6B-Base)는 600M backbone 전체를 fine-tuning해 순서 있는 skill 시퀀스를 텍스트로 생성하고, 196개 skill 이름을 토크나이저 special token으로 추가한 뒤 학습된 EOS 클래스에서 멈추는 greedy decoding을 쓴다.

지표는 5개다. **Set F1**은 예측 집합과 gold 집합 사이의 순서 무관 F1으로 selection 품질과 cardinality calibration을 한 수치로 담는다. **Recall@5**는 상위 5개의 gold skill 커버리지로 selection을 cardinality와 분리하고, **MRR**은 gold skill을 처음 맞힌 예측의 역순위, **nDCG@5**는 이진 관련도와 로그 할인으로 채점한 상위 5개 순서, **Set EM**은 순서 무관 exact match다.

두 평가 체제는 데이터 구성을 공유하되 held-out 부분집합이 다르다. **in-distribution test**(n=494)는 학습과 테스트가 같은 생성기에서 나올 때의 상한을 재고, **real-task holdout**(n=65)은 real task를 학습과 검증에서 모두 제거해 synthetic 데이터만으로 학습한 뒤 남겨 둔 real task 65개로 테스트한다. 검증기는 Harbor evaluation framework 위에 세운 결정적 verifier다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### Skill 예측 품질 (Table 1)

| 방법 | Set F1 (synthetic) | Set F1 (real holdout) |
|---|---|---|
| *BM25 (oracle-k)* | *35.3* | *55.9* |
| *TF-IDF (oracle-k)* | *58.4* | *74.2* |
| *Qwen3-Emb. (oracle-k)* | *49.0* | *73.4* |
| BM25 (k=2) | 33.0 | 47.0 |
| TF-IDF (k=2) | 52.5 | 60.6 |
| Qwen3-Emb. (k=3) | 43.9 | 58.5 |
| LLM-judge (Gemini-2.5-flash) | 61.0 | 59.9 |
| SFT (Qwen3-0.6B-Base) | 71.1 | 43.6 |
| SkillComposer_Base | 70.4 | 53.9 |
| **SkillComposer** | **73.9** | **62.9** |

**in-distribution synthetic test(n=494)**: SkillComposer의 Set F1은 73.9%로 SFT보다 2.8%p, LLM-judge보다 12.9%p 높은데 학습 파라미터는 약 154배 적다(3.9M 대 600M). MRR(86.5%)과 nDCG@5(75.0%)의 순위도 같은데, AR head가 목록 최상단의 순서를 더 날카롭게 뽑기 때문이다. SFT는 gold 시퀀스를 텍스트로 암기할 수 있는데도 Set EM(44.9% 대 41.3%)에서만 근소하게 앞선다. 두 학습 모델은 retrieval과 LLM-judge를 모두 압도하며 oracle-k retrieval 상한까지 넘어선다. 학습 모델은 어떤 skill과 몇 개를 함께 예측하는 반면, retrieval은 gold 개수를 받아야 하고 LLM-judge는 컨텍스트 예산 안에서 skill 본문 전체를 읽지 못하기 때문이다.

**cardinality slice(Figure 4)**: SkillComposer의 이점은 over-emission이 가장 크게 벌 받는 k=1 구간에 몰려 있다. Gemini, SFT, SkillComposer의 Set F1은 k=1에서 50%, 53%, 71%, k=2에서 65%, 80%, 81%, k=3에서 65%, 80%, 76%, k가 4 이상일 때 66%, 75%, 71%이고 macro 평균은 62%, 72%, 74%다. k=3 이상에서는 LM 방식 디코딩을 그대로 쓰는 SFT가 소폭 앞서며, 이 역전은 Case 3의 short-sequence bias와 같은 현상이다.

**real-task holdout(n=65, synthetic만으로 학습)**: distribution shift에서 SFT는 71.1%에서 43.6%로 27.5%p 급락하는데 SkillComposer는 73.9%에서 62.9%로 11.0%p만 하락해, 같은 학습 데이터와 같은 library에서 **19.3%p의 Set F1 격차**가 생긴다. predicted-k 방법 중 gold 개수를 듣지 않고 oracle-k 상한에 근접하는 것은 SkillComposer뿐이다. retrieval 계열은 오히려 synthetic에서 real로 갈 때 개선되는데 real task의 표현이 skill 설명에 더 가깝기 때문이다. 반면 SFT는 synthetic 템플릿 분포를 암기했을 뿐 되돌아가 기댈 견고한 prior가 없다. SkillComposer에 이 전이 편향을 공급하는 것은 얼려 둔 retrieval-tuned encoder와 작은 specialist decoder의 조합이며, encoder를 causal LM으로 바꾼 SkillComposer_Base가 real holdout에서 53.9%에 그치는 것이 그 근거다.

### 다운스트림 Task 성능 (Table 2, SkillsBench)

88개 SkillsBench task 중 75개를 쓴다. Anthropic 번들 포맷 skill(pdf, xlsx, pptx, docx)이 지배하는 office와 document 처리 task 13개는 어떤 retriever든 파일 확장자로 사소하게 라우팅해 skill 적재 방식을 구분하지 못하므로 제외했다. 에이전트는 GPT-5.2-Codex(Azure OpenAI 경유)와 Gemini-3-Pro-Preview(Gemini CLI 경유)이고, Harbor 안에서 결정적 pytest verifier와 1200초 timeout, task당 3회 시도(에이전트와 조건 조합당 225 trial), temperature 0으로 실행된다.

| Skill 조건 | Codex Pass(%) | Codex Tok. | Gemini Pass(%) | Gemini Tok. |
|---|---|---|---|---|
| *Retrieval (oracle)* | *44.0* | *1.13M* | *42.2* | *1.19M* |
| *Gold Skills* (상한) | *51.1* | *1.12M* | *48.4* | *1.18M* |
| No Skills | 22.2 | 0.94M | 25.8 | 0.99M |
| All Skills (196개 전부) | 29.3 | 1.27M | 38.7 | 1.33M |
| Retrieval (top-3) | 44.0 | 1.09M | 41.8 | 1.14M |
| **SkillComposer** | **45.3** | **1.03M** | **44.0** | **1.08M** |

- 두 에이전트 모두 같은 양상이다. pass rate가 No Skills에서 Gold Skills 상한까지 오르며, skill 적재 기법이 메울 여백이 약 25%p 남는다.
- library 전부를 주입하는 All Skills는 그 여백의 일부만 회복하면서 Codex 프롬프트를 1.27M 토큰으로 부풀린다. 컨텍스트를 쏟아붓는 것으로는 충분하지 않다는 확인이다.
- Retrieval (top-3)이 훨씬 큰 몫을 더 적은 프롬프트 예산으로 메우고, Retrieval (oracle)조차 이를 매치하는 수준에 그친다. 남은 여백을 만드는 것이 retrieval recall이 아니라 task별 selection 품질이라는 뜻이다.
- SkillComposer는 oracle skill 레이블 없이 calibrated ordered shortlist를 예측해 45.3%와 44.0%에 도달한다. 두 retrieval baseline을 앞서고 Retrieval (oracle)을 매치하거나 넘어서면서 skill을 적재한 조건 중 가장 작은 프롬프트 예산(Codex 1.03M 토큰)을 쓰고, 두 에이전트 모두에서 여백의 약 80%를 닫는다. curated Gold Skills 상한(Codex 51.1%)에는 아직 못 미친다.

### Ablation (Table 3, Table 4, Figure 5)

| Table 3 변형 | Set F1 |
|---|---|
| AR-only (auxiliary head 없음) | 69.3 |
| + set head | 71.8 |
| + cardinality head | 69.6 |
| SkillComposer (전체) | **73.9** |
| 디코딩 set fusion 제거 (β=0) | 65.0 |
| 디코딩 retrieval prior 제거 (α=0) | 67.5 |

학습 시점에 set-membership head를 더하면 gold skill마다 순서 무관 gradient가 흘러 AR objective를 보완하므로 Set F1이 2.5%p 오른다. cardinality head 단독은 69.6%로 0.3%p만 올라 기여가 작다. 디코딩 시점의 두 fusion prior는 둘 다 필요하다. 표 수치로는 set fusion 제거가 8.9%p, retrieval prior 제거가 6.4%p 손실이다. 논문 본문은 같은 대목을 7.1%p와 4.6%p로 적어 Table 3과 어긋나므로 표 수치를 기준으로 읽는다.

**디코딩 prior로는 sparse가 dense를 앞선다**(Table 4). TF-IDF 73.9%, BM25 70.0%, Qwen3-Embedding 68.8%, prior 없음 67.5% 순이다. 닫힌 library는 짧고 구문적으로 특이한 skill 이름 196개를 노출하므로 token 수준 overlap이 고정밀인 반면, dense 임베딩은 더 넓은 의미 컨텍스트를 평균해 과하게 일반화한다. 다만 task 표현에는 dense encoder가 여전히 옳은 선택이라, SkillComposer는 h_x에 Qwen3-Embedding을 쓰고 디코딩 prior에 TF-IDF를 쓰는 조합을 택한다.

**(α, β) 민감도와 프런티어(Figure 5)**: 6x6 격자 전체가 매끄러운 그릇 형태다. 검증으로 고른 동작점(α=1.0, β=0.5)의 값은 0.721이고 모든 이웃이 2%p 안에 있어 취약한 수동 튜닝이 아니다. 격자 최대값 0.730은 α=2.0과 β=2.0 부근, 최소값 0.630은 retrieval 가중치만 크게 주고 set fusion을 끈 α=4.0, β=0.0에서 나온다. SkillComposer는 학습 파라미터를 약 154배, 학습 compute를 약 25배 적게 쓰면서 SFT를 매치하거나 앞서고, 추론 latency는 SFT와 같은 등급이며 API 기반 judge보다 두 자릿수 배 빠르다. 결과적으로 predicted-k 방법 가운데 Pareto-optimal에 놓인다.

### 데이터 층별 분해 (Table 6, Appendix D)

결정적 baseline만 대상으로 synthetic test 분할을 데이터 층별로 쪼갠 결과다. LLM-judge가 multi-skill 합성 층에서 앞서는데(free-form 81.6%, graph-grounded 75.0%), 프롬프트의 task 설명이 길어 의미 신호를 더 많이 얻기 때문이다. TF-IDF (k=2)는 같은 두 층에서 65.9%와 53.7%, Qwen3-Emb (k=3)은 50.3%와 46.3%다. 학습 모델 행은 층별 canonical 예측을 레코드 ID와 맞춰 저장하지 않아 빠졌고, real anchor 열은 synthetic test에 real anchor 레코드가 n=4뿐이어서 표준오차가 0.25를 넘으므로 주의해 읽어야 한다. 한 가지 어긋남도 있다. Table 6의 LLM-judge "All" 열은 71.3%인데 Table 1의 같은 모델 synthetic test Set F1은 61.0%다. 나머지 여섯 행의 All 열은 Table 1과 일치하므로 LLM-judge 행만 두 표가 다른 값을 적고 있다.

### Case Study (Appendix C)

Table 2의 pass rate 격차가 어디서 오는지 보기 위해 SkillsBench task 3개를 들여다본다. GPT-5.2-Codex, task당 3 trial, 동일 에이전트와 동일 task 정의에서 세 방법이 서로 다른 skill 집합을 공급한 사례다.

- **Case 1(adaptive-cruise-control)**: top-3 절단이 핵심 skill을 떨어뜨린 사례다. verifier는 rise time 10초 미만, overshoot 5% 미만, 정상상태 속도 오차 0.5m/s 미만, 거리 정상상태 오차 2m 미만, 최소 간격 5m 초과를 검사한다. top-3 retrieval은 pid-controller, simulation-metrics, vehicle-dynamics를 유지하면서 규격을 한 번에 만족하는 PID gain을 뽑아 주는 imc-tuning-rules를 잘라내, 에이전트가 gain을 손으로 조정하다 3회 중 2회 실패해 0.33에 머문다. curated Gold Skills도 병목에 무관한 I/O 포맷 skill 2개(csv-processing, yaml-config)를 묶어 두고 0.33에 그친다. SkillComposer는 I/O wrapper를 버리고 gold가 빠뜨린 imc-tuning-rules를 채택해 1.00을 받는다. gold 정답으로 회귀하는 것이 아니라 유용한 skill을 식별한다는 뜻이며, 상위 k개 retrieval은 구조상 아슬아슬한 실패를 통과로 바꿀 그 skill 하나가 늘 빠질 수 있다.
- **Case 2(exoplanet-detection-period)**: 더 마른 집합이 gold를 이긴 사례다. TESS 광도 곡선에서 항성 활동 진동에 묻힌 외계 행성의 공전 주기를 복원해야 한다. SkillComposer는 light-curve-preprocessing에서 lomb-scargle-periodogram을 거쳐 transit-least-squares로 가는 최소 recipe로 수렴해 매 trial 성공한다(1.00). 반면 gold pack은 중복인 box-least-squares estimator와 무거운 exoplanet-workflows wrapper를 더해 에이전트를 항성 진동에 과적합하는 더 긴 파이프라인으로 이끌어 0.00이다. library 전부를 쏟는 All Skills가 pass rate를 해치는 Table 2 결과와 일관된다.
- **Case 3(lean4-proof)**: long-chain task에서 과소 방출한 사례다. n에 대해 Sn = Σ 1/2^i ≤ 2를 증명하는 Lean 4 템플릿을 마무리하는 task에서, SkillComposer는 snippet 수준 메모 skill인 lean4-memories 하나만 방출하고 귀납 단계에 필요한 tactic과 Mathlib 참조 skill인 lean4-theorem-proving 앞에서 멈춘다(0.67). retrieval은 python-scala-functional을 더해 3개 사슬을 온전히 유지하며 1.00에 도달하고, gold는 2개 사슬로 0.67에 머무는데 이는 한 trial에서 무관한 Lean kernel 오류가 났기 때문이다. 같은 한 칸 부족 양상이 grid-dispatch-operator와 dapt-intrusion-detection에서도 되풀이된다. gold 시퀀스가 skill 2개에서 3개 이상일 때 SkillComposer의 shortlist가 한 칸 짧아지는 경향이며, synthetic 코퍼스가 skill 3개 이하 조합에 치우친 결과다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **범위**: text-only task 설명과 code 지향 skill library에 국한되며, 평가도 composition 수준 지표와 다운스트림 에이전트 벤치마크로 한정된다. 더 넓은 탐구 방향으로 멀티모달 task 명세(스크린샷, 스케치, 음성 지시), skill library가 online으로 갱신되는 interactive와 long-horizon 세팅, 그리고 composition 그래프가 이종 도구와 물리 액추에이터까지 뻗는 과학 워크플로, 로보틱스, embodied 에이전트를 든다.
- **backbone 스케일**: 여기서 쓴 small-LM과 임베딩 backbone의 특성, 즉 pre-training 코퍼스의 언어 prior와 task 커버리지를 그대로 상속한다. 더 강한 backbone과 더 큰 curated library라면 composition 정확도와 ordering을 한층 예리하게 만들 것으로 기대한다.
- **long-chain under-emission**: Case 3에서 드러난 short-sequence bias다. synthetic 데이터가 skill 3개 이하 편향을 가진 것이 원인이며, long-sequence 학습 레코드 구축이 가장 실행 가능한 개선점이다.
- **broader impact**: 데이터 분석 보조, 웹 task 자동화, 데이터베이스 상호작용처럼 개발자가 커지는 skill library를 유지하며 신뢰할 만한 오케스트레이션을 필요로 하는 상황에 맞는다. 원시 API 호출이 아니라 skill 추상 수준에서 동작하는 것도 재사용과 모듈 단위 감사를 촉진해 중복 코드 생성을 줄인다. 저자들은 공개 데이터셋과 공개된 모델 체크포인트만 썼다고 밝힌다.

## 6. 관련 연구 (Related Work)

- **skill library와 discovery**: Voyager(Wang 2023), CRAFT(Yuan 2023), CREATOR(Qian 2023), Ma 2025는 skill 인벤토리를 유지하는 이득을 보였지만, 모두 selection 시점에 flat retrieval을 채택해 임베딩 유사도로 skill을 독립 랭킹하고 몇 개가 필요한지나 서로 어떻게 의존하는지를 고려하지 않는다. SkillRouter(Zheng 2026), SkillFlow(Li 2025), Graph of Skills(Liu 2026a), Skill Retrieval Augmentation(Su 2026), SkillsBench(Li 2026), SoK Agentic Skills(Jiang 2026), SkillRL(Xia 2026), Agent Skills in the Wild(Liu 2026b)가 뒤를 이었으나, **어느 연구도 skill selection을 명시적 cardinality와 ordering 결정을 갖는 닫힌 어휘 시퀀스 생성으로 모델링하지 않는다**.
- **tool 수준 planning과 composition**: HuggingGPT(Shen 2023), ToolChain*(Zhuang 2023), TaskBench(Shen 2024), ToolkenGPT(Hao 2023), graph planning(Wu 2024)은 atomic function-call 수준에서 planning하며, typed signature와 return value가 강한 구조 신호를 준다. 이 논문의 skill 수준에는 그 신호가 없다. 의존성이 latent하고 task 논리에 따르며, catalog가 작아도 상호작용이 강해 skill 2개만 바꾸거나 순서를 뒤집어도 결과가 뒤집힌다. 그래서 flat 유사도 retrieval과 atomic action 탐색이 모두 부적합하다.
- **생성적 retrieval 계보**: Recommender Systems with Generative Retrieval(Rajput 2023)과 ToolkenGPT(Hao 2023)가 닫힌 어휘 위의 생성으로 retrieval과 tool selection을 프레이밍한 선례다.
- **Agent Skills 표준과 벤치마크 배경**: open Agent Skills standard(agentskills.io)와 Anthropic의 "Equipping agents for the real world with agent skills"(2025)를 skill 정의의 근거로 인용하고, SWE-bench(Jimenez 2024), SWE-agent(Yang 2024), OSWorld(Xie 2024), WebArena(Zhou 2024), AppWorld(Trivedi 2024)를 skill library가 필요해진 배경으로 든다.

## 7. 용어집 (Glossary)

- **skill (agentic skill)**: 모델 가중치를 바꾸지 않고 inference 시점에 절차 지식을 프롬프트 컨텍스트에 주입하는 재사용 절차 모듈. (mi 메타데이터, Ci 조건, πi policy, Ti 종료, Ri callable)의 5-튜플이다.
- **structured skill composition**: 주어진 task와 library에 대해 활성 subset, 개수, 실행 순서를 동시에 정하는 실행 가능 skill plan 예측.
- **task-conditioned skill sequence prediction**: 위 문제를 STOP으로 끝나는 skill 인덱스 시퀀스 생성으로 정식화한 것.
- **constrained autoregressive decoder**: 출력 어휘를 library 인덱스와 STOP으로 제한한 AR decoder. 생성 원소가 항상 실행 가능한 skill이다.
- **cardinality head / set head**: AR head를 보강하는 auxiliary head. 각각 "몇 개"(길이)와 "어떤 skill"(순서 무관 membership)에 전용 감독 채널을 주고, 추론 시점에는 디코딩 prior로 재사용된다.
- **retrieval-augmented decoding**: contextual logit에 TF-IDF relevance(α)와 set-membership(β) prior를 합치는 디코딩. heavy-tail skill의 약한 학습 신호를 보완한다.
- **Set F1**: 예측 skill 집합과 gold 집합 사이의 순서 무관 F1. selection 품질과 cardinality calibration을 한 수치로 담는다.
- **dependency edge / workflow edge**: skill dependency graph의 두 edge 유형. I/O type 겹침에서 온 hard data-flow 순서와, real trajectory 공출현에서 온 경험적 순서다.
- **progressive disclosure**: 시작 시점에 compact 메타데이터만 로드하고 예측 확정 뒤 full instruction을 여는 skill library 관행.
- **SkillBench / SkillsBench**: 논문이 기반으로 삼은 curated 196-skill library와 88개 task 벤치마크의 출처는 같은 인용(Li et al. 2026)이다. 논문 본문이 library를 가리킬 때 "SkillBench", 벤치마크를 가리킬 때 "SkillsBench"로 표기를 흔들지만 두 이름은 같은 자료를 지시한다.
- **oracle-k / best-k**: retrieval baseline의 두 변형. gold 길이를 알려준 상한이 oracle-k, 검증으로 k를 고른 것이 best-k다. predicted-k 방법과 구분해 selection 품질을 cardinality 예측과 분리 측정한다.
- **Harbor**: 컨테이너 환경에서 에이전트와 모델을 평가하고 최적화하는 프레임워크(Harbor Framework Team 2026). 결정적 pytest verifier로 다운스트림 채점을 담당한다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | Figure 1: 커진 skill library의 composition bottleneck(A), direct reasoning과 retrieval이 놓치는 구조를 순서 있는 실행 가능 plan으로 채우는 SkillComposer(B), 그리고 개선 폭(C) | caption-region | ★ wiki 권장 (문제와 개요) |
| fig02 | 4 | Figure 2: 196개 skill library와 Michigan USGS 홍수 탐지 task에서 인덱스 시퀀스 (s104, s184, s55)를 예측하는 예시 | caption-region | ★ wiki 권장 (task 예시) |
| fig03 | 5 | Figure 3: SkillComposer의 세 구성 요소. 얼려 둔 text encoder(A), cardinality head와 set head를 붙인 autoregressive decoder(B), prior를 logit에 합치는 retrieval-augmented decoding(C) | caption-region | ★ wiki 권장 (architecture) |
| fig04 | 8 | Figure 4: gold cardinality k별 Set F1. SkillComposer는 k=1에서 71%로 앞서고 macro 평균 74%로 가장 높다 | caption-region | ★ wiki 권장 (result) |
| fig05 | 10 | Figure 5: 디코딩 가중치 민감도 격자(a), 학습 파라미터 대비 정확도(b), 추론 latency 대비 정확도(c) | caption-region | ★ wiki 권장 (efficiency) |
| fig06 | 16 | Figure 6: single-skill 합성 프롬프트 (Gemini 2.5 Flash). 호출당 task 5개, skill 이름 언급 금지 (Appendix B) | caption-region | (선택) |
| fig07 | 17 | Figure 7: multi-skill 합성 프롬프트 (Gemini 2.5 Pro). dependency edge의 순서 제약을 문장 그대로 주입한다 (Appendix B) | caption-region | (선택) |
| tab01 | 9 | Table 1: skill 예측 품질 (%). 왼쪽 in-distribution synthetic test (n=494), 오른쪽 real-task holdout (n=65). oracle-k 행은 상한 참고용이다 | table-region | (선택) |
| tab02 | 9 | Table 2: SkillsBench 다운스트림 task 성능. pass rate와 오류 없이 끝난 trial의 평균 입력 프롬프트 토큰 수 | table-region | (선택) |
| tab03 | 10 | Table 3: 모델 구성 요소 ablation. AR-only 69.3%에서 전체 구성 73.9%까지, 디코딩 prior 제거 시 65.0%와 67.5% | table-region | (선택) |
| tab04 | 10 | Table 4: 디코딩 시점 retrieval prior 비교. TF-IDF 73.9%가 BM25 70.0%와 Qwen3-Embedding 68.8%를 앞선다 | table-region | (선택) |
| tab05 | 15 | Table 5: skill dependency graph. dependency edge 658개와 workflow edge 266개로 합계 924개 | table-region | (선택) |
| tab06 | 19 | Table 6: synthetic test의 데이터 층별 Set F1 (%, 결정적 baseline만). real anchor 열은 n=4로 표준오차가 크다 | table-region | (선택) |
