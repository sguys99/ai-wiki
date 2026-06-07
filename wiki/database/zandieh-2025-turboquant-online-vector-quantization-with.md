---
title: "TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate"
type: paper
year: 2025
category: database
source: zandieh-2025-turboquant-online-vector-quantization-with.md
raw_path: /home/sguys99/project/ai-wiki/raw/papers/zandieh-2025-turboquant-online-vector-quantization-with.pdf
raw_filename: "zandieh-2025-turboquant-online-vector-quantization-with.pdf"
source_collection: external
authors: "Amir Zandieh (Google Research), Majid Daliri (NYU), Majid Hadian (Google DeepMind), Vahab Mirrokni (Google Research)"
arxiv_id: "2504.19874"
tags: [vector-quantization, product-quantization, kv-cache, ann-search, embedding-compression, qjl, johnson-lindenstrauss, lloyd-max, distortion-rate, data-oblivious, shannon-lower-bound, inner-product, google-research]
figures:
  - id: fig01
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig01.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig01.png
    caption: "Inner product 추정 오차 분포 — TurboQuant_prod(모든 bit-width 불편) vs TurboQuant_mse(bit-width 증가 시 bias 소멸) (paper Figure 1, p.16)"
    page: 16
    strategy: page-region
    curated: true
  - id: fig02
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig02.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig02.png
    caption: "b=2 bit에서 inner-product 오차 분산 — Qprod는 평균 inner product와 무관하게 일정, Qmse는 평균 inner product가 커질수록 bias 증가 (paper Figure 2, p.17)"
    page: 17
    strategy: page-region
    curated: true
  - id: fig03
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig03.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig03.png
    caption: "Inner-product error / MSE의 이론적 상·하한 대비 실측 — bit-width별로 lower bound에 근접 (paper Figure 3, p.18)"
    page: 18
    strategy: page-region
    curated: true
  - id: fig04
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig04.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig04.png
    caption: "Needle-In-A-Haystack (Llama-3.1-8B-Instruct, 0.25 압축비) — TurboQuant 0.997 = Full-Precision, SnapKV/PyramidKV/KIVI/PolarQuant 능가 (paper Figure 4, p.19)"
    page: 19
    strategy: page-region
    curated: true
  - id: fig05
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig05.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig05.png
    caption: "ANN search Recall@1@k — GloVe(d=200)·OpenAI3(d=1536·3072)에서 PQ·RabitQ 대비 우위 (paper Figure 5, p.21)"
    page: 21
    strategy: page-region
    curated: true
---

## 요약 (Summary)

TurboQuant은 입력 벡터를 **random rotation**으로 한 번 돌리는 데서 출발한다. 회전한 벡터는 hypersphere 위에 균등하게 퍼지고, 그 결과 각 좌표가 미리 아는 **Beta 분포**(고차원에서 N(0,1/d)로 수렴)를 따르며 좌표끼리 거의 독립이 된다. 분포를 미리 알면 좌표마다 **최적 scalar quantizer(Lloyd-Max)** 를 학습 없이 계산하고, 이것만으로 MSE 최적 양자화가 끝난다. inner product 추정에서는 MSE 최적 quantizer가 bias를 남기므로, **잔차(residual)에 1-bit QJL을 얹는 2단계**로 unbiased 추정까지 얻는다.

핵심은 **data-oblivious**(데이터를 보지 않고 calibration 없이 즉시 적용)이면서 **online**(streaming generation 중에도 양자화)이고 **accelerator-friendly**(완전 vectorize)라는 점이다. 모든 bit-width에서 Shannon 정보이론 하한의 상수배(√(3π)/2 ≈ 2.7, b=1에서는 ≈1.45) 이내로 near-optimal임을 증명했고, 실증에서 KV cache는 3.5 bit/channel 품질 무손실·2.5 bit 미미한 손실로 5×+ 압축, ANN search에서는 indexing 시간을 사실상 0으로 줄이면서 PQ·RabitQ 대비 recall 우위를 보였다.

이 페이지는 본 ai-wiki에 이미 있는 Rust 구현체 [[database/ryancodrai-turbovec|turbovec]]와 그 한국어 소개 [[database/9bow-2026-turbovec-turboquant-rust-vector-index]]가 가리키는 **원논문(arXiv 2504.19874)** 이다.

## 주요 기여 (Key Contributions)

1. **MSE 최적 data-oblivious quantizer (TurboQuant_mse)** — random rotation으로 좌표를 Beta 분포로 만든 뒤(Lemma 1) 좌표별 독립 scalar quantizer만 적용해 MSE 최적에 도달한다. 데이터별 calibration·preprocessing이 없다.
2. **Unbiased inner-product quantizer (TurboQuant_prod)** — MSE 최적 quantizer가 inner product에서 bias(b=1에서 2/π 배)를 낸다는 점을 보이고, Qmse(b−1 bit) + 잔차 1-bit QJL의 2단계로 unbiased·near-optimal 추정을 얻는다.
3. **정보이론 하한 + near-optimality 증명** — Shannon Lower Bound와 Yao's minimax principle로 임의 quantizer의 하한(Dmse ≥ 4^-b, Dprod ≥ ||y||²/d·4^-b)을 세우고, TurboQuant가 그 하한의 √(3π)/2 ≈ 2.7배 이내(b=1에서 ≈1.45배)임을 보인다.
4. **속도·온라인성** — 완전 vectorize되어 GPU 병렬이 되고, precompute codebook을 재사용하므로 indexing 시간이 사실상 0이며, streaming generation 도중에도 양자화한다.
5. **실증** — KV cache 5×+ 압축(3.5-bit 무손실, 2.5-bit 미미한 손실), Needle-In-A-Haystack 4× 압축 무손실, ANN search에서 PQ·RabitQ 대비 recall·속도 동시 우위.

## 방법론 및 아키텍처 (Methodology and Architecture)

### TurboQuant_mse — random rotation → Beta → 좌표별 scalar 양자화 (Algorithm 1)

1. **Random rotation Π** (Gaussian 행렬의 QR 분해)로 단위벡터 x를 hypersphere 균등분포 Π·x로 만든다.
2. **Lemma 1** — 균등분포 점의 각 좌표는 Beta 분포 f_X(x) = Γ(d/2)/(√π·Γ((d−1)/2))·(1−x²)^((d−3)/2)를 따르고, 고차원에서 N(0,1/d)로 수렴하며 서로 다른 좌표는 거의 독립이다(Vershynin). 그래서 좌표 간 상관을 무시하고 좌표별로 양자화해도 near-optimal이다.
3. **Optimal scalar quantizer = continuous 1-D k-means** — 구간 [−1,1]을 2^b 클러스터로 나누는 Voronoi tessellation을 Max-Lloyd로 미리 풀어 bit-width별 codebook을 저장한다. y = Π·x의 좌표별 nearest centroid index(b-bit)만 저장하고, 복원은 centroid를 조회한 뒤 Π^T로 회전 복귀한다.
4. **Theorem 1** — Dmse = d·C(f_X, b) ≤ √(3π)/2 · 4^-b. 세밀값 b=1,2,3,4 → **0.36, 0.117, 0.03, 0.009**. (비단위 벡터는 L2 norm을 별도 저장·rescale.)

### TurboQuant_prod — 2단계 unbiased inner product (Algorithm 2)

MSE 최적 quantizer는 b=1에서 sign(Π·x) 형태가 되어 inner product에 2/π 배 곱셈 bias를 남긴다. 이를 없애려고 목표보다 1 bit 적은 Qmse를 적용한 뒤, 그 잔차 r = x − Q^-1_mse(Qmse(x))에 **1-bit QJL** qjl = sign(S·r)을 얹는다. 출력은 (idx, qjl, ||r||₂)이고, 복원은 x̃ = x̃_mse + ||r||·Q^-1_qjl(qjl) — 잔차 norm으로 rescale하는 것이 핵심이다.

- **QJL (Lemma 4)**: Q_qjl(x)=sign(S·x), 역맵 (√(π/2)/d)·S^T·z. unbiased이고 분산 ≤ (π/2d)·||y||₂².
- **Theorem 2**: E[⟨y,x̃⟩] = ⟨y,x⟩ (unbiased), Dprod ≤ √(3π)/2 · ||y||₂²/d · 4^-b. 세밀값 b=1,2,3,4 → **1.57/d, 0.56/d, 0.18/d, 0.047/d**.

### 하한 (Theorem 3)

Yao's minimax로 worst-case 하한을 hypersphere 균등분포 입력의 SLB(D(B) ≥ 2^{−2B/d})로 환원해 Dmse ≥ 4^-b, Dprod ≥ ||y||²/d·4^-b를 얻는다. expected distortion에 대한 하한이라 본문 상한과 정합적이다.

## 결과 (Results)

### 이론 검증 (DBpedia 1536-d OpenAI3, 100k/1k)

TurboQuant_prod은 모든 bit-width에서 inner product 추정이 unbiased인 반면, TurboQuant_mse는 bit-width가 커지며 bias가 0으로 줄어든다. Qprod의 오차 분산은 평균 inner product와 무관하게 일정하지만, Qmse의 bias는 평균 inner product가 커질수록 함께 커진다.

![[assets/zandieh-2025-turboquant-online-vector-quantization-with/fig01.png]]
*Figure 1: Inner product 추정 오차 분포 — Qprod는 모든 bit-width에서 불편(unbiased), Qmse는 bit-width 증가 시 bias 소멸 (Zandieh 2025, p.16)*

![[assets/zandieh-2025-turboquant-online-vector-quantization-with/fig02.png]]
*Figure 2: b=2 bit에서 오차 분산 — Qprod는 평균 inner product와 무관하게 일정, Qmse는 평균 inner product에 따라 bias 증가 (Zandieh 2025, p.17)*

![[assets/zandieh-2025-turboquant-online-vector-quantization-with/fig03.png]]
*Figure 3: inner-product error·MSE의 이론 상·하한 대비 실측 — bit-width별로 lower bound에 근접 (Zandieh 2025, p.18)*

### KV cache (Needle-In-A-Haystack + LongBench-E)

Llama-3.1-8B-Instruct, 압축비 0.25(KV cache 25%만 사용), 4k–104k 토큰에서 **TurboQuant 0.997 = Full-Precision 0.997** > PolarQuant 0.995 > KIVI 0.981 > PyramidKV 0.895 > SnapKV 0.858. 이론 보장이 있는 양자화가 token-level 압축·보장 없는 scalar 양자화를 앞서며, 4× 압축에도 손실이 없다.

![[assets/zandieh-2025-turboquant-online-vector-quantization-with/fig04.png]]
*Figure 4: Needle-In-A-Haystack (Llama-3.1-8B-Instruct, 0.25 압축비) — TurboQuant 0.997로 Full-Precision과 동일, 다른 방법 능가 (Zandieh 2025, p.19)*

LongBench-E에서는 **3.5-bit TurboQuant이 full cache(평균 50.06)와 동률**, 2.5-bit도 49.44로 KIVI·PolarQuant를 더 적은 bit로 앞선다. KIVI·PolarQuant가 생성 토큰을 양자화하지 않는 것과 달리 streaming generation 도중에도 양자화하며, 비정수 precision(2.5/3.5-bit)은 outlier 채널 분리(예: 32채널 @3bit + 96채널 @2bit = 2.5)에서 나온다. 4.5×+ 압축.

### ANN Search (DBpedia 1536·3072-d, GloVe 200-d)

PQ(LUT256)·RabitQ를 baseline으로 Recall@1@k에서 모든 데이터셋·차원에서 우위를 보인다. 특히 **양자화(indexing) 시간**이 압도적이다 — 4-bit 기준 TurboQuant 0.0007–0.0021초 대 PQ 37–494초 대 RabitQ 597–3957초. codebook을 데이터에서 학습하는 PQ·RabitQ와 달리 precompute codebook을 재사용하므로 indexing이 사실상 무료다.

![[assets/zandieh-2025-turboquant-online-vector-quantization-with/fig05.png]]
*Figure 5: ANN Recall@1@k — GloVe(d=200)·OpenAI3(d=1536·3072)에서 2·4-bit 모두 PQ·RabitQ 대비 우위 (Zandieh 2025, p.21)*

## 한계 (Limitations)

- **고차원 가정 의존** — Beta→Gaussian 수렴과 좌표 near-independence는 d가 클수록 정확하다. 저차원(GloVe d=200)에서도 동작하지만 이론적 이상값과의 간극은 차원에 따라 달라진다.
- **Unit-norm 전제** — 비단위 벡터는 L2 norm을 별도 float로 저장·rescale해야 한다.
- **Outlier 채널 분리는 휴리스틱** — 2.5/3.5-bit를 만드는 outlier 비율·bit 할당이 수동이며 자동화 방법은 제시하지 않는다.
- **Entropy coding 미채택** — b=4에서 ~5% 추가 압축이 가능하나 이득이 작아 단순성·속도를 위해 제외했다.
- **하한은 expected distortion 기준** — worst-case(sphere-packing) 하한과는 상수가 다르다.

## 관련 페이지 (Related Pages)

- [[database/ryancodrai-turbovec]] — 본 논문 TurboQuant을 Rust + Python으로 옮긴 학습 불필요 벡터 인덱스(MIT). 손수 짠 SIMD 커널로 FAISS PQ 대비 속도·메모리 우위.
- [[database/9bow-2026-turbovec-turboquant-rust-vector-index]] — turbovec 한국어 소개글(PyTorchKR). 알고리즘 5단계·압축률·속도를 한눈에 정리.
- [[database/shanbhogue-2026-gemini-embedding-2-native-multimodal]] — TurboQuant이 압축 대상으로 삼는 고차원 embedding을 생산하는 모델(1536/3072-d). MRL과 함께 임베딩 저장 비용을 줄이는 또 다른 축.
- [[database/edge-2024-from-local-to-global]] · [[database/guo-2025-lightrag-simple-and-fast]] — vector retrieval 기반 RAG. ANN 인덱스 압축이 retrieval 인프라 비용에 직결된다.
- [[database/li-2026-beyond-semantic-similarity-rethinking-retrieval]] — embedding/index 없이 검색하는 정반대 방향(DCI). 인덱스 압축 vs 인덱스 제거의 대비.
