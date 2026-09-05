---
title: "TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate"
type: paper
year: 2025
category: database
raw_path: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with.pdf
raw_filename: "zandieh-2025-turboquant-online-vector-quantization-with.pdf"
source_collection: external
authors: "Amir Zandieh (Google Research), Majid Daliri (NYU), Majid Hadian (Google DeepMind), Vahab Mirrokni (Google Research)"
arxiv_id: "2504.19874"
tags: [vector-quantization, product-quantization, kv-cache, ann-search, embedding-compression, qjl, johnson-lindenstrauss, lloyd-max, distortion-rate, data-oblivious, shannon-lower-bound, inner-product, google-research]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig01.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig01.png
    caption: "Inner product 추정 오차 분포 — TurboQuant_prod(모든 bit-width 불편) vs TurboQuant_mse(bit-width 증가 시 bias 소멸) (paper Figure 1, p.16)"
    page: 16
    bbox_norm: [0.106, 0.0817, 0.894, 0.4378]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig02.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig02.png
    caption: "b=2 bit에서 inner-product 오차 분산 — Qprod는 평균 inner product와 무관하게 일정, Qmse는 평균 inner product가 커질수록 bias 증가 (paper Figure 2, p.17)"
    page: 17
    bbox_norm: [0.106, 0.0817, 0.9584, 0.4378]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig03.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig03.png
    caption: "Inner-product error / MSE의 이론적 상·하한 대비 실측 — bit-width별로 lower bound에 근접 (paper Figure 3, p.18)"
    page: 18
    bbox_norm: [0.1701, 0.1001, 0.8239, 0.3527]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig04.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig04.png
    caption: "Needle-In-A-Haystack (Llama-3.1-8B-Instruct, 0.25 압축비) — TurboQuant 0.997 = Full-Precision, SnapKV/PyramidKV/KIVI/PolarQuant 능가 (paper Figure 4, p.19)"
    page: 19
    bbox_norm: [0.1158, 0.0749, 0.9352, 0.409]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig05.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig05.png
    caption: "ANN search Recall@1@k — GloVe(d=200)·OpenAI3(d=1536·3072)에서 PQ·RabitQ 대비 우위 (paper Figure 5, p.21)"
    page: 21
    bbox_norm: [0.1255, 0.1001, 0.9148, 0.2756]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/tab01.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/tab01.png
    caption: "Table 1: LongBench-V1 [ 10 ] results of various KV cache compression methods on Llama - 3 . 1 - 8B - Instruct ."
    page: 20
    bbox_norm: [0.1162, 0.0767, 0.9099, 0.2713]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/tab02.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/tab02.png
    caption: "Table 2: Quantization time (in seconds) for different approaches across various dimensions using 4-bit quantization."
    page: 20
    bbox_norm: [0.2421, 0.3341, 0.7579, 0.4183]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

입력 벡터를 **random rotation**으로 돌리면 각 좌표가 Beta 분포(고차원에서 N(0,1/d)로 수렴)를 따르고 좌표끼리 거의 독립이 된다는 사실을 이용해, **좌표별 최적 scalar quantizer(Lloyd-Max)** 만으로 MSE 최적 양자화를 달성하고, 여기에 **잔차(residual)에 1-bit QJL을 얹는 2단계 구성**으로 unbiased inner product 추정까지 얻는 **data-oblivious·online vector quantizer**다. 모든 bit-width에서 Shannon 정보이론 하한의 **상수배(√(3π)/2 ≈ 2.7, b=1에서는 ≈1.45)** 이내로 near-optimal이며, KV cache는 3.5 bit/channel에서 품질 무손실·2.5 bit에서 미미한 손실(5×+ 압축), ANN search에서는 indexing 시간을 사실상 0으로 줄이면서 PQ·RabitQ 대비 recall 우위를 보인 Google Research·NYU 논문.

## 1. 자료 정보 (Document Information)

- **제목**: TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate
- **저자**: Amir Zandieh (Google Research), Majid Daliri (New York University), Majid Hadian (Google DeepMind), Vahab Mirrokni (Google Research)
- **발행**: 2025년 4월 28일, arXiv:2504.19874v1 [cs.LG]
- **유형**: 이론 + 실증 연구 논문 (본문 ~20p + references, 25p)
- **선행 연구(동일 그룹)**: **QJL** (Zandieh·Daliri·Han, arXiv:2406.03482, 2024) — 1-bit quantized Johnson-Lindenstrauss transform, TurboQuant의 inner-product 단계 핵심 부품. **PolarQuant** (Han et al., arXiv:2502.02617, 2025) — polar transformation 기반 KV cache 양자화, 본 논문의 주요 baseline.
- **실험 환경**: 단일 NVIDIA A100 GPU. DBpedia Entities(OpenAI3 embeddings, 1536·3072-d), GloVe(200-d), LongBench-E, Needle-In-A-Haystack.

## 2. 주요 기여 (Key Contributions)

1. **MSE 최적 data-oblivious quantizer (TurboQuant_mse)**: random rotation으로 임의 입력을 hypersphere 균등분포로 만들면 각 좌표가 Beta 분포를 따른다(Lemma 1)는 점을 이용해, 좌표별로 독립적인 optimal scalar quantizer(continuous 1-D k-means = Lloyd-Max)만 적용해 MSE 최적에 도달한다. data에 맞춘 calibration·preprocessing이 전혀 없다.
2. **Unbiased inner-product quantizer (TurboQuant_prod)**: MSE 최적 quantizer는 inner product 추정에서 **bias**가 생긴다(b=1에서 2/π 배)는 점을 보이고, 이를 **2단계**로 해결한다 — 목표 bit-width보다 1 bit 적게 Qmse를 적용한 뒤 그 **residual에 1-bit QJL**을 얹어 unbiased·near-optimal inner product 추정을 얻는다.
3. **정보이론 하한 증명 + near-optimality**: Shannon Lower Bound(SLB)와 **Yao's minimax principle**로 임의의 randomized quantizer가 가질 수 있는 distortion 하한(Dmse ≥ 4^-b, Dprod ≥ ||y||²/d·4^-b)을 증명하고, TurboQuant가 이 하한의 √(3π)/2 ≈ 2.7배 이내(작은 bit-width일수록 더 가까워 b=1에서 ≈1.45배)임을 보인다.
4. **Accelerator-friendliness + online 적용성**: 알고리즘이 완전히 vectorize되어(GPU 병렬) online(streaming generation 중에도 양자화) 적용이 가능하므로 KV cache 양자화처럼 실시간 시나리오에 적합하다. precompute한 codebook을 재사용하므로 indexing 시간이 사실상 0이다.
5. **실증**: ① KV cache — 3.5 bit/channel에서 품질 무손실, 2.5 bit에서 미미한 손실, 5×+ 압축. ② Needle-In-A-Haystack에서 4× 압축에도 full-precision과 동일(0.997). ③ ANN search에서 PQ·RabitQ 대비 recall 우위 + 양자화 시간 수만 배 단축.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의

양자화 맵 Q : R^d → {0,1}^B, B = b·d (b = 좌표당 평균 bit-width)와 역맵 Q^-1로 근사 복원한다. 두 distortion을 최소화한다 (입력은 worst-case, quantizer는 randomized):

- **MSE**: Dmse = E[ ||x − Q^-1(Q(x))||₂² ]
- **Inner-product error**: Dprod = E[ |⟨y,x⟩ − ⟨y, Q^-1(Q(x))⟩|² ], 추가로 **unbiasedness** E[⟨y, Q^-1(Q(x))⟩] = ⟨y,x⟩ 요구.

### 3.2 TurboQuant_mse — 핵심 통찰: random rotation → Beta → 좌표별 scalar 양자화 (Algorithm 1)

1. **Random rotation Π** (Gaussian 행렬의 QR 분해). 단위벡터 x에 대해 Π·x는 hypersphere S^{d-1} 균등분포가 된다.
2. **Lemma 1**: 균등분포 점의 각 좌표 x_j는 (scaled/shifted) **Beta 분포** f_X(x) = Γ(d/2)/(√π·Γ((d−1)/2))·(1−x²)^((d−3)/2)를 따르며, 고차원에서 **N(0, 1/d)** 로 수렴한다. 또한 서로 다른 좌표는 고차원에서 **거의 독립**(Vershynin [55])이라, 좌표 간 상관을 무시하고 좌표별로 양자화해도 near-optimal이다.
3. **Optimal scalar quantizer = continuous 1-D k-means**: 구간 [−1,1]을 2^b 클러스터로 나누는 Voronoi tessellation(경계 = 인접 centroid 중점)이다. 비용 C(f_X, b) = min Σ ∫ |x−c_i|²·f_X(x) dx (Eq.4)를 **Max-Lloyd 알고리즘**으로 미리 풀어 bit-width별 codebook을 저장한다(precompute). 예: b=1 centroid = ±√(2/π)/√d, b=2 = {±0.453/√d, ±1.51/√d}.
4. **Quant/DeQuant**: y = Π·x → 좌표별 nearest centroid index 저장(idx, b-bit 정수). 복원은 centroid를 조회한 뒤 Π^T로 회전 복귀한다.
5. **Theorem 1 (MSE 보장)**: Dmse = d·C(f_X, b). 모든 b에서 Dmse ≤ √(3π)/2 · 4^-b (b>4는 Panter-Dite high-resolution 공식). 세밀값: **b=1,2,3,4 → 0.36, 0.117, 0.03, 0.009**.
6. **부가**: codebook index에 entropy encoding을 적용하면 b=4에서 평균 bit-width를 ~5% 더 줄일 수 있으나(엔트로피 ≈3.8), 이득이 작아 단순성·속도를 위해 채택하지 않았다. unit-norm 가정은 제약이 약하다 — 비단위 벡터는 L2 norm을 별도 float로 저장한 뒤 rescale한다.

### 3.3 TurboQuant_prod — 2단계 unbiased inner product (Algorithm 2)

**왜 필요한가**: b=1에서 Qmse의 optimal codebook은 ±√(2/(πd)) → Qmse(x)=sign(Π·x), Q^-1=√(2/(πd))·Π^T·z 형태가 되고, Lemma 4에 따라 E[⟨y, Q^-1_mse(Qmse(x))⟩] = (2/π)·⟨y,x⟩ — 즉 **2/π 배 곱셈 bias**다. bit-width가 커지면 줄지만 0은 아니다.

**QJL (Definition 1, Lemma 4)**: Q_qjl(x) = sign(S·x), S는 N(0,1) i.i.d. 행렬. 역맵 Q^-1_qjl(z) = (√(π/2)/d)·S^T·z. **Unbiased** E[⟨y, Q^-1_qjl(Q_qjl(x))⟩] = ⟨y,x⟩, **분산** Var ≤ (π/2d)·||y||₂².

**2단계 구성**:
1. 목표 bit-width b보다 **1 bit 적은(b−1)** Qmse로 양자화 → residual r = x − Q^-1_mse(Qmse(x)) (작은 L2 norm, E[||r||] = √C(f_X, b−1)).
2. residual r에 **1-bit QJL** 적용: qjl = sign(S·r). 출력은 (idx, qjl, ||r||₂).
3. 복원: x̃ = x̃_mse + ||r||·Q^-1_qjl(qjl). residual norm ||r||로 rescale하는 것이 핵심이다.

**Theorem 2 (inner product 보장)**: 추정이 unbiased다 — E[⟨y,x̃⟩] = ⟨y,x⟩. distortion Dprod ≤ √(3π)/2 · ||y||₂²/d · 4^-b. 세밀값: **b=1,2,3,4 → 1.57/d, 0.56/d, 0.18/d, 0.047/d**. (핵심 부등식 Dprod = (π/2d)·||y||²·Dmse, Dmse는 b−1로 평가.)

### 3.4 Lower Bounds (Theorem 3, Section 3.3)

Yao's minimax로 "worst-case 입력 + randomized 알고리즘" 하한을 "randomized 입력(hypersphere 균등) + deterministic 알고리즘" 하한으로 환원한 뒤, hypersphere용 SLB(Lemma 3: D(B) ≥ 2^{−2B/d})를 적용한다:

- Dmse(Q) ≥ 1/4^b
- Dprod(Q) ≥ ||y||₂²/d · 1/4^b (pigeonhole)

→ TurboQuant_mse의 상한 √(3π)/2·4^-b는 하한 4^-b의 **≈2.7배**, b=1에서는 ≈1.45배다. **expected** distortion에 대한 하한이라 sphere-packing(worst-case) 하한보다 본 분석의 상한과 정합적이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 이론 검증 (DBpedia 1536-d OpenAI3, 100k train / 1k query)

- **Fig 1**: TurboQuant_prod은 모든 bit-width에서 inner product 추정이 **unbiased**, TurboQuant_mse는 bit-width가 늘수록 bias가 점차 0으로 수렴한다.
- **Fig 2** (b=2): Qprod의 inner-product 오차 분산은 평균 inner product와 **무관하게 일정**한 반면, Qmse의 bias는 평균 inner product가 커질수록 증가한다.
- **Fig 3**: 실측 inner-product error·MSE가 이론 상·하한 사이에 놓이며 하한에 근접한다. 낮은 bit ratio에선 Qprod가 우세하고, bit 수가 늘면 Qmse가 bias를 줄여 결국 앞선다.

### 4.2 Needle-In-A-Haystack (Llama-3.1-8B-Instruct, Fig 4)

- 문서 크기 4k–104k 토큰, 메모리 압축비 **0.25(=KV cache 25%만 사용)**, recall score.
- 결과: **TurboQuant 0.997 = Full-Precision 0.997** > PolarQuant 0.995 > KIVI 0.981 > PyramidKV 0.895 > SnapKV 0.858.
- 이론 보장이 있는 양자화(PolarQuant·TurboQuant)가 token-level 압축(SnapKV·PyramidKV)과 보장 없는 scalar 양자화(KIVI)를 능가한다. **4× 압축에도 무손실**.

### 4.3 End-to-end LongBench-E (Table 1)

| Model | KV Size(bit) | SingleQA | MultiQA | Summ | Few-shot | Synthetic | Code | **Avg** |
|---|---|---|---|---|---|---|---|---|
| Llama-3.1-8B Full Cache | 16 | 45.29 | 45.16 | 26.55 | 68.38 | 59.54 | 46.28 | **50.06** |
| KIVI | 3 | 43.38 | 37.99 | 27.16 | 68.38 | 59.50 | 44.68 | 48.50 |
| PolarQuant | 3.9 | 45.18 | 44.48 | 26.23 | 68.25 | 60.07 | 45.24 | 49.78 |
| **TurboQuant** | **2.5** | 44.16 | 44.96 | 24.80 | 68.01 | 59.65 | 45.76 | **49.44** |
| **TurboQuant** | **3.5** | 45.01 | 45.31 | 26.00 | 68.63 | 59.95 | 46.17 | **50.06** |
| Ministral-7B Full Cache | 16 | 47.53 | 49.06 | 26.09 | 66.83 | 53.50 | 47.90 | 49.89 |
| **TurboQuant** | **2.5** | 48.38 | 49.22 | 24.91 | 66.69 | 53.17 | 46.83 | 49.62 |

- **3.5-bit TurboQuant = full cache(50.06)**, 더 적은 bit로 KIVI·PolarQuant를 능가한다. 생성 토큰을 양자화하지 않는 KIVI·PolarQuant와 달리 **streaming generation 중에도 양자화**한다.
- **비정수 bit precision**은 outlier/non-outlier 채널 분리에서 나온다 — 2.5-bit = 32 outlier 채널 @3bit + 96 채널 @2bit = (32×3+96×2)/128 = 2.5. 4.5×+ 압축.

### 4.4 ANN Search (DBpedia 1536·3072-d, GloVe 200-d; Fig 5, Table 2)

- baseline: **Product Quantization(PQ, LUT256)**, **RabitQ**. metric: Recall@1@k.
- TurboQuant이 모든 데이터셋·차원에서 **recall 우위**를 보인다 (PQ는 같은 데이터로 train/eval해 유리한데도, RabitQ는 실제 bit 사용량이 보고치보다 큰데도 그렇다).
- **양자화 시간(Table 2, 4-bit)** — 차원별로 압도적이다:

| Approach | d=200 | d=1536 | d=3072 |
|---|---|---|---|
| Product Quantization | 37.04 s | 239.75 s | 494.42 s |
| RabitQ | 597.25 s | 2267.59 s | 3957.19 s |
| **TurboQuant** | **0.0007 s** | **0.0013 s** | **0.0021 s** |

→ codebook을 데이터에서 학습하는 PQ·RabitQ와 달리 precompute codebook을 재사용하므로 **indexing 시간이 사실상 0**(수만~수백만 배 단축)이고, GPU vectorization도 가능하다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

1. **고차원 가정 의존**: Beta→Gaussian 수렴과 좌표 near-independence는 d가 클수록 정확하다. 저차원(GloVe d=200)에서도 동작하지만 이론적 이상값과의 간극은 차원에 따라 달라진다.
2. **Unit-norm 전제**: 비단위 벡터는 L2 norm을 float로 별도 저장·rescale해야 한다(추가 저장·계산).
3. **Outlier 채널 분리(2.5/3.5-bit)는 휴리스틱**: outlier/non-outlier 비율과 bit 할당이 수동이다(선행연구 [63,51] 방식 차용). 자동 결정 방법은 제시하지 않는다.
4. **Entropy coding 미채택**: b=4에서 ~5% 추가 압축이 가능하나 이득이 작아 단순성·속도를 우선해 제외했다.
5. **Lower bound는 expected distortion 기준**: worst-case(sphere-packing) 하한과는 상수가 다르며, 본 분석은 expected에 맞춰 정합한다.
6. **Random projection 저장**: inner-product 모드는 d×d projection 행렬 S(QJL)와 rotation Π를 공유·재사용해야 하므로 구현상 seed 관리가 필요하다(논문 본문은 효율을 강조).

## 6. 관련 연구 (Related Work)

- **VQ 이론의 기원**: Shannon source coding [48,49], Zador [61] (high-resolution distortion-rate), Gersho [25] (lattice VQ, 점근 최적 block quantization).
- **Scalar quantizer 이론**: Lloyd [42], Max [43] (Lloyd-Max/Max-Lloyd), Panter-Dite [44] (high-resolution distortion 공식).
- **QJL** [62/63] (Zandieh·Daliri·Han, 2024) — 1-bit quantized JL, **본 논문 inner-product 단계의 직접 부품**. **PolarQuant** [28] (Han et al., 2025) — 동일 그룹, polar transformation KV 양자화, 핵심 baseline.
- **Online(data-oblivious) 양자화**: GPT3.int8 [16], QuaRot [8], FlashAttention-3 [47] (rotation/low-precision). vs **offline(data-dependent)**: GPTQ [20], AWQ [39], QuIP [13], SqueezeLLM [37] (Hessian·calibration 필요).
- **KV cache 압축**: 구조 변경 GQA/MQA [6,50], DeepSeekMoE [15]; token eviction H2O [66], SnapKV [38], Scissorhands [40], StreamingLLM [58], PyramidKV [12]; 양자화 KIVI [41], KVQuant [30], GEAR [33], WKVQuant [60], Coupled Quantization [65].
- **Product Quantization / ANN**: PQ [31], OPQ [24], ScaNN(anisotropic VQ) [27], Additive Quantization [9], **RabitQ** [22] (grid-based, preprocessing은 불필요하나 vectorization이 없어 느림).
- **고차원 확률**: Vershynin [55] (좌표 near-independence 근거). 정보이론: Cover [14] (backward Gaussian test channel).
- **벤치마크/모델**: LongBench [10], Needle-In-A-Haystack [32], Llama-3 [18], GloVe [45], BEIR/DBpedia [53].

## 7. 용어집 (Glossary)

- **Vector Quantization (VQ)**: 고차원 벡터를 저-bit 정수로 압축(양자화)해 기하 구조(거리·inner product)의 왜곡을 최소화하는 문제. Shannon source coding에 뿌리를 둔다.
- **Bit-width b**: 좌표당 평균 사용 bit 수. 총 bit B = b·d.
- **Distortion-rate function**: 주어진 bit complexity에서 달성 가능한 최소 distortion을 정의하는 함수(Shannon).
- **MSE distortion / Inner-product distortion**: 복원 벡터의 L2 제곱오차 / inner product 추정의 제곱오차.
- **Data-oblivious / Online quantization**: 데이터에 맞춘 calibration·preprocessing 없이 즉시 적용하는 양자화. 동적 데이터(KV cache)에 적합하다. ↔ data-dependent/offline.
- **Random rotation (Π)**: Gaussian 행렬 QR로 만든 직교행렬. 임의 단위벡터를 hypersphere 균등분포로 바꿔 worst-case 입력을 완화한다.
- **Beta distribution**: hypersphere 균등분포 점의 단일 좌표 분포(Lemma 1). 고차원에서 N(0,1/d)로 수렴한다.
- **Lloyd-Max (Max-Lloyd) algorithm**: 주어진 분포에 대한 최적 scalar quantizer(centroid·경계)를 반복적으로 구하는 1-D k-means 알고리즘.
- **Voronoi tessellation**: 양자화 경계가 인접 centroid의 중점이 되는 최적 분할.
- **QJL (Quantized Johnson-Lindenstrauss)**: sign(S·x)로 각 좌표를 1-bit로 양자화하는 unbiased inner-product quantizer. 역맵 (√(π/2)/d)·S^T·z, 분산 ≤ (π/2d)||y||².
- **Residual quantization**: 1차 양자화의 잔차(residual)에 2차 양자화를 얹어 정밀도를 높이는 기법. TurboQuant_prod = Qmse(b−1) + QJL(residual).
- **Shannon Lower Bound (SLB)**: lossy source coding 정리에서 유도되는 distortion 하한. D ≥ (d/2πe)·2^{(2/d)(h(x)−B)}.
- **Yao's minimax principle**: randomized 알고리즘의 worst-case 하한을, deterministic 알고리즘 + worst-case 입력 분포의 하한으로 환원하는 원리.
- **KV cache**: decoder transformer가 이전 토큰의 key/value 임베딩을 저장하는 캐시. context length·model size에 비례해 커지는 메모리 병목.
- **Needle-In-A-Haystack**: 긴 문서 안에 숨긴 한 문장을 모델이 회수하는지 평가하는 long-context 벤치마크.
- **Product Quantization (PQ)**: ANN search에서 벡터를 부분공간별 codebook(k-means)으로 압축하는 표준 기법. codebook 학습에 preprocessing이 필요하다.
- **RabitQ**: grid 기반 PQ. preprocessing은 불필요하나 vectorization이 없어 느리다.
- **Outlier channels**: 값 분포가 큰 소수 채널. 더 높은 bit를 할당한다(2.5/3.5-bit 비정수 precision의 출처).
- **Recall@1@k (1@k)**: 진짜 top inner-product 결과가 근사 top-k 안에 포함되는 빈도(ANN 정확도 metric).

## 8. 그림 후보 (Figure Candidates)

> Step 2.5에서 pymupdf **page-region**(캡션이 등장한 페이지 전체를 200 DPI로 렌더)으로 추출. 5개 figure 모두 페이지 전체 스냅샷이라 본문 텍스트가 함께 들어 있음 — wiki 임베드 시 필요하면 수동 크롭 권장.

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 16 | Inner product 오차 분포 — Qprod 불편 vs Qmse bias 소멸 | page-region | (선택, theory) |
| fig02 | 17 | b=2 분산 — Qprod 일정 vs Qmse bias 증가 | page-region | (선택, theory) |
| fig03 | 18 | inner-prod error·MSE의 이론 상·하한 대비 실측 | page-region | ★ wiki 권장 (theory 검증) |
| fig04 | 19 | Needle-In-A-Haystack 6-panel, TurboQuant 0.997 = Full-Precision | page-region | ★ wiki 권장 (KV cache 핵심 결과) |
| fig05 | 21 | ANN Recall@1@k (GloVe·OpenAI3), PQ·RabitQ 대비 우위 | page-region | ★ wiki 권장 (ANN 결과, 하단 references 포함) |

> 비고: Algorithm 1(p.10)·Algorithm 2(p.12) pseudocode와 Table 1(LongBench)·Table 2(양자화 시간, p.20)는 "Figure" 캡션이 아니라 자동 추출에 안 잡힘. 필요하면 사용자가 해당 페이지를 수동 크롭해 추가 가능.
