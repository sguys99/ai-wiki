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
    caption: "bit-width 1에서 4까지의 inner product 오차 히스토그램 8개. 위쪽 TurboQuant_prod는 네 경우 모두 0을 중심으로 대칭이고, 아래쪽 TurboQuant_mse는 bit-width 1에서 중심이 오른쪽으로 치우쳤다가 bit-width가 커질수록 0으로 이동한다"
    page: 16
    bbox_norm: [0.106, 0.0817, 0.894, 0.4378]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig02.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig02.png
    caption: "bit-width 2에서 평균 inner product를 0.01, 0.06, 0.10, 0.17로 바꿔 가며 그린 오차 히스토그램. TurboQuant_prod는 네 경우 모두 0 중심을 유지하고, TurboQuant_mse는 평균 inner product가 커질수록 분포 전체가 오른쪽으로 밀린다"
    page: 17
    bbox_norm: [0.106, 0.0817, 0.9584, 0.4378]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig03.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig03.png
    caption: "bit-width 1에서 5까지의 실측 inner product 오차와 MSE를 이론 상한, 하한 직선과 함께 그린 로그 스케일 그래프. 왼쪽 그래프에서 두 변형의 곡선이 bit-width 3 부근에서 교차한다"
    page: 18
    bbox_norm: [0.1701, 0.1001, 0.8239, 0.3527]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig04.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig04.png
    caption: "Needle-In-A-Haystack 결과 히트맵 6개. 가로축은 문서 길이, 세로축은 문장을 숨긴 깊이 비율이다. SnapKV와 PyramidKV는 회수 실패 칸이 흩어져 있고, TurboQuant는 Full-Precision과 같은 0.997을 기록한다"
    page: 19
    bbox_norm: [0.1158, 0.0749, 0.9352, 0.409]
    strategy: caption-region
    curated: true
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/fig05.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/fig05.png
    caption: "GloVe 200차원과 OpenAI3 1536차원, 3072차원 세 데이터셋의 Recall@1@k 곡선. 가로축 top-k에 대해 TurboQuant 2비트와 4비트가 같은 비트 수의 PQ, RabitQ보다 위쪽에 놓인다"
    page: 21
    bbox_norm: [0.1255, 0.1001, 0.9148, 0.2756]
    strategy: caption-region
    curated: true
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/tab01.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/tab01.png
    caption: "Llama-3.1-8B-Instruct와 Ministral-7B-Instruct에서 KV cache 압축 방법별 LongBench 점수를 6개 과제군과 평균으로 정리한 표"
    page: 20
    bbox_norm: [0.1162, 0.0767, 0.9099, 0.2713]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zandieh-2025-turboquant-online-vector-quantization-with/tab02.png
    raw: raw/papers/zandieh-2025-turboquant-online-vector-quantization-with-figures/tab02.png
    caption: "4비트 양자화 기준으로 200차원, 1536차원, 3072차원에서 PQ와 RabitQ와 TurboQuant의 양자화 소요 시간을 초 단위로 비교한 표"
    page: 20
    bbox_norm: [0.2421, 0.3341, 0.7579, 0.4183]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

입력 벡터에 random rotation을 한 번 적용하면 각 좌표가 Beta 분포를 따르고 좌표끼리 거의 독립이 된다는 사실을 이용해, 좌표별 최적 scalar quantizer(Lloyd-Max)만으로 MSE 최적 양자화를 달성하고, 여기에 residual을 1비트 QJL로 다시 양자화하는 2단계 구성을 결합해 unbiased inner product 추정까지 얻는 data-oblivious online vector quantizer다. MSE distortion은 모든 bit-width에서 Shannon 정보이론 하한의 `√3·π/2 ≈ 2.72`배 이내이고 bit-width 1에서는 약 1.45배까지 좁혀지며, KV cache는 채널당 3.5비트에서 품질 무손실, 2.5비트에서 미미한 손실을 보였고, ANN search에서는 indexing 시간을 사실상 0으로 줄이면서 PQ와 RabitQ 대비 recall 우위를 보인 Google Research와 NYU의 논문이다.

## 1. 자료 정보 (Document Information)

- **제목**: TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate
- **저자**: Amir Zandieh (Google Research), Majid Daliri (New York University), Majid Hadian (Google DeepMind), Vahab Mirrokni (Google Research)
- **발행**: 2025년 4월 28일, arXiv:2504.19874v1 [cs.LG]
- **유형**: 이론과 실증을 겸한 연구 논문. 전체 25페이지이고 본문이 20페이지, 21페이지부터 참고문헌이다
- **실험 환경**: 단일 NVIDIA A100 GPU 1대

### 1.1 사용 데이터셋과 모델

| 구분 | 내역 |
|---|---|
| 임베딩 데이터 | DBpedia Entities를 OpenAI3 임베딩으로 인코딩한 1536차원본과 3072차원본 (Qdrant가 배포한 HuggingFace 데이터셋), GloVe 200차원 |
| 표본 구성 | training set 10만 개 무작위 표집, query set 1,000개 별도 추출. GloVe는 데이터셋이 제공하는 기존 query set 1만 개 사용 |
| 언어 모델 | Llama-3.1-8B-Instruct, Ministral-7B-Instruct |
| long-context 벤치마크 | Needle-In-A-Haystack, LongBench (길이 분포가 고른 LongBench-E 부분집합) |
| ANN baseline | Product Quantization (LUT256 구성), RabitQ |
| KV cache baseline | PolarQuant, SnapKV, PyramidKV, KIVI |

### 1.2 직접 관련된 선행 연구

| 연구 | 식별자 | 본 논문과의 관계 |
|---|---|---|
| QJL (Zandieh, Daliri, Han, 2024) | arXiv:2406.03482 | 1비트 quantized Johnson-Lindenstrauss transform. TurboQuant_prod의 2단계 중 두 번째 단계를 그대로 가져다 쓴다 |
| PolarQuant (Han, Kacham, Karbasi, Mirrokni, Zandieh, 2025) | arXiv:2502.02617 | polar transformation 기반 KV cache 양자화. 본 논문의 주요 baseline이고 저자가 겹친다 |
| RabitQ (Gao 외, 2024) | arXiv:2409.09913 | grid 기반 PQ. preprocessing이 필요 없다는 점은 같으나 vectorization이 없어 느리다 |
| RotateKV (Su 외, 2025) | arXiv:2501.16383 | outlier 채널에 더 높은 비트를 할당하는 전략의 출처 중 하나 |

## 2. 주요 기여 (Key Contributions)

1. **MSE 최적 data-oblivious quantizer (TurboQuant_mse)**. random rotation으로 임의 입력을 hypersphere 균등분포로 만들면 각 좌표가 Beta 분포를 따른다는 Lemma 1을 근거로, 좌표별 독립 optimal scalar quantizer만 적용해 MSE 최적에 도달한다. 데이터에 맞춘 calibration이나 preprocessing이 전혀 없다.
2. **Unbiased inner product quantizer (TurboQuant_prod)**. MSE 최적 quantizer가 inner product 추정에서 bias를 남긴다는 점을 bit-width 1의 경우로 명시적으로 보이고, 목표 bit-width보다 1비트 적은 Qmse를 적용한 뒤 그 residual에 1비트 QJL을 결합하는 2단계로 이를 해소한다.
3. **정보이론 하한 증명과 near-optimality**. Shannon Lower Bound와 Yao's minimax principle로 임의의 randomized quantizer가 가질 수 있는 distortion 하한을 증명하고, TurboQuant의 MSE distortion이 이 하한의 `√3·π/2 ≈ 2.72`배 이내임을 보인다. bit-width 1에서는 배수가 약 1.45로 줄어든다.
4. **가속기 친화성과 online 적용성**. 알고리즘이 완전히 vectorize되어 GPU에서 병렬 실행되고, 미리 계산해 둔 codebook을 재사용하므로 indexing 시간이 사실상 0이다. 그 결과 streaming generation 도중에도 양자화가 가능하다.
5. **실증**. KV cache는 채널당 3.5비트에서 품질 무손실, 2.5비트에서 미미한 손실을 보였다. Needle-In-A-Haystack에서는 4배 압축 상태로 full-precision과 같은 0.997을 기록했다. ANN search에서는 PQ와 RabitQ 대비 recall이 높으면서 양자화 시간이 수만 배 짧았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 정의

양자화 맵 `Q : R^d → {0,1}^B`와 역맵 `Q^-1 : {0,1}^B → R^d`를 설계하는 문제다. `B = b·d`로 두면 `b`가 좌표당 평균 비트 수, 즉 bit-width다. `Q`는 전단사가 아니므로 변환은 본질적으로 손실이 있고, 목표는 distortion 최소화다.

입력 벡터에는 아무 가정을 두지 않고 worst-case를 상정한다. 대신 quantizer 자체를 randomized로 두고, quantizer 출력의 randomness에 대한 기댓값으로 distortion을 정의한다.

- MSE distortion: `Dmse := E[ ‖x − Q^-1(Q(x))‖₂² ]`
- inner product distortion: `Dprod := E[ (⟨y,x⟩ − ⟨y, Q^-1(Q(x))⟩)² ]`
- unbiasedness 요구: `E[⟨y, Q^-1(Q(x))⟩] = ⟨y,x⟩`

논문은 두 가지 기본 연산을 정의한다. Quant는 데이터셋 `x₁, ..., xₙ`을 효율적으로 양자화하고, DeQuant는 양자화된 데이터셋에서 원본을 근사 복원한다.

### 3.2 TurboQuant_mse (Algorithm 1)

핵심 통찰은 random rotation이 worst-case 입력을 통계적으로 다루기 쉬운 분포로 바꾼다는 것이다. 단계는 다음과 같다.

1. **Random rotation**. i.i.d. 정규분포 원소를 가진 행렬에 QR 분해를 적용해 직교행렬 `Π ∈ R^(d×d)`를 만든다. 단위벡터 `x`에 대해 `Π·x`는 hypersphere `S^(d-1)` 위의 균등분포가 된다.
2. **Lemma 1 (좌표 분포)**. 균등분포 점의 각 좌표 `x_j`는 `f_X(x) = Γ(d/2) / (√π · Γ((d−1)/2)) · (1 − x²)^((d−3)/2)`를 밀도로 갖는 Beta 분포를 따른다. 증명은 `√(1−x²)` 반지름을 갖는 `d−1`차원 구면의 면적과 `d`차원 단위구 부피의 비로 얻는다. 고차원에서 이 분포는 `N(0, 1/d)`로 수렴한다.
3. **좌표 간 near-independence**. 고차원에서 서로 다른 좌표는 무상관을 넘어 거의 독립이 된다(Vershynin의 고차원 확률론 결과). 그래서 좌표 간 상호작용을 무시하고 좌표별로 양자화해도 near-optimal이 유지된다.
4. **Optimal scalar quantizer**. 분포를 알고 있을 때의 최적 scalar 양자화는 1차원 연속 k-means 문제다. 구간 `[−1,1]`을 `2^b`개 클러스터로 나누고, 최적해는 Voronoi tessellation을 따른다. 즉 구간 경계가 정렬된 인접 centroid의 중점이다. 비용 함수는 `C(f_X, b) := min Σᵢ ∫ |x − cᵢ|² · f_X(x) dx`이고(Eq. 4), 반복 수치해법으로 원하는 정밀도까지 푼다. 실무에서 쓰는 bit-width 범위에 대해 한 번만 풀어 codebook으로 저장해 둔다.
5. **centroid 예시**. 차원이 어느 정도 큰 경우 `f_X`가 정규분포에 가까워지고, 최적 centroid는 bit-width 1에서 `±√(2/π)/√d`, bit-width 2에서 `{±0.453/√d, ±1.51/√d}`다.
6. **Quant와 DeQuant**. Quant는 `y = Π·x`를 계산한 뒤 각 좌표에 가장 가까운 centroid의 인덱스를 `b`비트 정수로 저장한다. DeQuant는 인덱스로 centroid를 조회해 `ỹ`를 만들고 `Π^T`를 곱해 원래 기저로 되돌린다.

**Theorem 1 (MSE 보장)**. 임의의 bit-width `b ≥ 1`과 임의의 `x ∈ S^(d-1)`에 대해 `Dmse = d · C(f_X, b)`이고, `Dmse ≤ (√3·π/2) · 4^(-b)`가 성립한다. 증명은 `Π`가 회전이라 `‖x − x̃‖₂ = ‖Π·x − ỹ‖₂`이고, Lemma 1에 의해 모든 좌표가 동일 분포를 따르므로 좌표별 기댓값을 `d`배 하면 된다는 관찰로 끝난다. bit-width 4를 넘는 구간은 Panter-Dite의 high-resolution 공식 `C(f_X, b) ≤ (1/12)·(∫ f_X(x)^(1/3) dx)³ · 4^(-b) = (√3·π)/(2d) · 4^(-b)`로 상한을 얻는다.

| bit-width `b` | `Dmse` (논문 수치해) | 정보이론 하한 `4^(-b)` | 하한 대비 배수 (두 값의 나눗셈으로 얻은 계산값) |
|---|---|---|---|
| 1 | 0.36 | 0.25 | 1.44 |
| 2 | 0.117 | 0.0625 | 1.87 |
| 3 | 0.03 | 0.015625 | 1.92 |
| 4 | 0.009 | 0.00390625 | 2.30 |

**Entropy encoding (채택하지 않은 개선안)**. codebook 인덱스가 등장할 확률 `p_ℓ`를 구간 적분으로 계산하면 인덱스를 최적 부호화해 평균 bit-width를 분포의 엔트로피 수준까지 줄일 수 있다. 이 무손실 압축은 distortion에 영향을 주지 않는다. 감소폭이 가장 큰 경우가 bit-width 4로, 엔트로피가 약 3.8이고 최적 prefix code를 계산하면 평균 bit-width가 약 5% 줄어든다. 이득이 작아 단순성과 속도를 위해 채택하지 않았다.

**Unit-norm 전제**. 분석은 `‖x‖₂ = 1`을 가정한다. 논문은 이 가정이 표준적이며 제약이 크지 않다고 본다. 조건을 만족하지 않는 데이터셋은 L2 norm을 부동소수점으로 따로 저장했다가 복원 시 rescale하면 된다.

### 3.3 TurboQuant_prod (Algorithm 2)

**bias의 근원**. bit-width 1에서 Eq. 4를 푼 최적 codebook은 충분히 큰 `d`에 대해 `{±√(2/(πd))}`다. 그러면 양자화 맵이 `Qmse(x) = sign(Π·x)`, 역맵이 `Q^-1_mse(z) = √(2/(πd)) · Π^T · z`가 된다. Lemma 4를 적용하면 `E[⟨y, Q^-1_mse(Qmse(x))⟩] = (2/π) · ⟨y,x⟩`로, `2/π`배의 곱셈 bias가 생긴다. 이 bias는 bit-width가 커질수록 줄어들지만 유한한 bit-width에서 0이 되지는 않는다.

**QJL (Definition 1과 Lemma 4)**. `Q_qjl(x) := sign(S·x)`로 정의한다. `S ∈ R^(d×d)`는 원소가 i.i.d. `N(0,1)`인 무작위 행렬이고, sign은 원소별로 적용한다. 역맵은 `Q^-1_qjl(z) := (√(π/2)/d) · S^T · z`다. 이 추정량은 unbiased이고 분산이 `Var ≤ (π/2d) · ‖y‖₂²`로 억제된다. 분산 증명은 `sᵢ^T y`가 평균 0, 분산 `‖y‖₂²`인 가우시안이라는 점과 `d`개 독립 표본의 평균이라는 점을 결합한다.

**2단계 구성**.

| 단계 | 연산 | 출력 |
|---|---|---|
| 1 | 목표 bit-width보다 1비트 적은 `b−1`로 `Qmse` 적용 | 인덱스 벡터 `idx ∈ [2^(b-1)]^d` |
| 2 | residual `r := x − Q^-1_mse(Qmse(x))`에 1비트 QJL 적용 | 부호 벡터 `qjl ∈ {−1,1}^d` |
| 3 | residual의 L2 norm을 별도로 보관 | 스칼라 `γ = ‖r‖₂` |

residual은 1차 양자화가 복원하지 못하고 남긴 오차 벡터를 뜻한다. Qmse가 MSE를 최소화한다는 것은 곧 이 residual의 L2 norm을 최소화한다는 뜻이고, 기댓값은 `E[‖r‖] = √(C(f_X, b−1))`다.

복원은 `x̃ = x̃_mse + (√(π/2)/d) · γ · S^T · qjl`다. QJL 항을 residual norm `γ`로 rescale하는 것이 핵심이다. 최종 추정량은 `⟨y, Q^-1_mse(Qmse(x))⟩ + ‖r‖₂ · ⟨y, Q^-1_qjl(Q_qjl(r))⟩`가 된다.

**Theorem 2 (inner product 보장)**. 추정이 unbiased다. 즉 `E[⟨y, x̃⟩] = ⟨y,x⟩`다. 증명은 `x̃_mse`로 조건부 기댓값을 취해 QJL 항이 `⟨y, r⟩`를 복원함을 보이고 전체 기댓값 법칙을 적용한다. distortion은 `Dprod ≤ (√3·π²) · ‖y‖₂²/d · 4^(-b)`로 억제된다. 증명의 중심 부등식은 `Dprod ≤ (π/2d) · ‖y‖₂² · Dmse`이고, 여기서 `Dmse`는 bit-width `b−1`로 평가한다.

| bit-width `b` | `Dprod` (논문 수치해) | 정보이론 하한 (`‖y‖₂ = 1` 기준) |
|---|---|---|
| 1 | `1.57/d` | `0.25/d` |
| 2 | `0.56/d` | `0.0625/d` |
| 3 | `0.18/d` | `0.015625/d` |
| 4 | `0.047/d` | `0.00390625/d` |

### 3.4 Lower Bounds (Theorem 3)

증명은 두 단계다. 먼저 Yao's minimax principle로 "randomized 알고리즘 + worst-case 입력"의 하한을 "deterministic 알고리즘 + 최악의 randomized 입력 분포"의 하한으로 환원한다. 후자는 hypersphere 균등분포 입력에서의 최선 MSE로 하한이 잡힌다.

두 번째 단계는 Shannon Lower Bound다. Lemma 2는 임의 분포 `p_X`와 유한한 미분 엔트로피 `h(x)`에 대해 `D(p_X, B) ≥ (d/(2πe)) · 2^((2/d)(h(x)−B))`를 준다. 이는 backward Gaussian test channel로 증명되는 고전 결과다. Lemma 3은 이를 hypersphere 균등분포에 특화해 `D(B) ≥ 2^(-2B/d)`를 얻는다. 유도에는 구면 면적 `A_d = 2π^(d/2)/Γ(d/2)`에 Stirling 근사를 적용한다.

결론은 다음과 같다.

- `Dmse(Q) ≥ 1/4^b`
- 어떤 `y ∈ S^(d-1)`가 존재해 `Dprod(Q) ≥ (1/d) · (1/4^b)`

두 번째 항은 pigeonhole 원리로 얻는다. `Dmse`를 표준 기저 벡터 `e_j`에 대한 좌표별 오차 제곱의 합으로 다시 쓰면, `d`개 항의 합이 `1/4^b` 이상이므로 적어도 하나의 `j`는 `(1/d)·(1/4^b)` 이상이다.

논문은 sphere packing 논증으로도 비슷한 하한을 유도할 수 있다고 밝히면서, sphere packing 쪽은 더 어려운 문제라 상수가 더 크다고 적는다. Theorem 3은 worst-case 오차가 아니라 expected distortion에 대한 하한이라서 Theorem 1과 Theorem 2의 상한과 직접 맞물린다는 것이 저자의 선택 이유다.

### 3.5 상한과 하한의 상수 비교

| 대상 | 상한 (Theorem 1과 2) | 하한 (Theorem 3) | 논문이 명시한 배수 |
|---|---|---|---|
| MSE | `(√3·π/2) · 4^(-b)` | `4^(-b)` | 약 2.7배. bit-width 1에서는 약 1.45배 |
| inner product | `(√3·π²) · ‖y‖₂²/d · 4^(-b)` | `(‖y‖₂²/d) · 4^(-b)` | 논문이 배수를 따로 명시하지 않는다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 이론 검증

DBpedia Entities를 OpenAI3 1536차원으로 인코딩한 데이터에서 training set 10만 개와 query set 1,000개를 뽑아 검증했다.

- **Figure 1**: bit-width가 커지면 두 변형 모두 분산이 줄어든다. 다만 inner product 추정에서 TurboQuant_mse는 bias를 남긴다. 이 bias는 bit-width가 커지면서 점차 줄어 0으로 수렴한다. TurboQuant_prod는 모든 bit-width에서 unbiased를 유지한다.
- **Figure 2**: bit-width 2로 고정하고 평균 inner product를 0.01, 0.06, 0.10, 0.17로 바꿔 가며 본 결과다. TurboQuant_prod의 오차 분산은 원본 벡터의 inner product 값과 무관하게 일정하다. 반면 TurboQuant_mse의 bias는 평균 inner product가 커질수록 함께 커진다.
- **Figure 3**: bit-width 1에서 5까지 실측 inner product 오차와 MSE를 이론 상한, 하한과 함께 그렸다. 실측값이 두 경계 사이에 놓이며 예측과 일치한다. 낮은 bit ratio에서는 TurboQuant_prod가 우세하지만, 비트 수가 늘면 TurboQuant_mse가 bias를 줄여 결국 inner product 추정에서도 앞선다.

### 4.2 Needle-In-A-Haystack

긴 문서 안 임의 위치에 숨긴 한 문장을 모델이 회수하는지 보는 벤치마크다. 실험 설정은 Fu 외의 구성을 따랐고, 모델은 Llama-3.1-8B-Instruct, 문서 크기는 4,000토큰에서 10만 4,000토큰까지 변화시켰다. 지표는 recall score다. 메모리 압축비는 0.25로 고정했다. 즉 전체 KV cache의 25%만 사용한다.

| 방법 | recall score |
|---|---|
| SnapKV | 0.858 |
| PyramidKV | 0.895 |
| KIVI | 0.981 |
| PolarQuant | 0.995 |
| Full-Precision | 0.997 |
| TurboQuant | 0.997 |

이론 보장이 있는 양자화(PolarQuant, TurboQuant)가 token 단위 압축(SnapKV, PyramidKV)과 형식적 보장이 없는 scalar 양자화(KIVI)를 앞선다. TurboQuant은 4배 넘게 양자화된 상태에서 압축하지 않은 baseline과 정확히 같은 성능에 도달했다.

### 4.3 LongBench 종단 생성

LongBench는 단일 문서와 다중 문서 질의응답, 요약, few-shot 학습, 합성 과제, 코드 완성을 아우르는 데이터셋이다. 길이 분포가 더 고른 LongBench-E 부분집합을 써서 문맥 길이에 따른 편향을 줄였다.

| Method | KV Size | SingleQA | MultiQA | Summarization | Few shot | Synthetic | Code | Average |
|---|---|---|---|---|---|---|---|---|
| Llama-3.1-8B-Instruct, Full Cache | 16 | 45.29 | 45.16 | 26.55 | 68.38 | 59.54 | 46.28 | 50.06 |
| KIVI | 3 | 43.38 | 37.99 | 27.16 | 68.38 | 59.50 | 44.68 | 48.50 |
| KIVI | 5 | 45.04 | 45.70 | 26.47 | 68.57 | 59.55 | 46.41 | 50.16 |
| PolarQuant | 3.9 | 45.18 | 44.48 | 26.23 | 68.25 | 60.07 | 45.24 | 49.78 |
| TurboQuant (ours) | 2.5 | 44.16 | 44.96 | 24.80 | 68.01 | 59.65 | 45.76 | 49.44 |
| TurboQuant (ours) | 3.5 | 45.01 | 45.31 | 26.00 | 68.63 | 59.95 | 46.17 | 50.06 |
| Ministral-7B-Instruct, Full Cache | 16 | 47.53 | 49.06 | 26.09 | 66.83 | 53.50 | 47.90 | 49.89 |
| TurboQuant (ours) | 2.5 | 48.38 | 49.22 | 24.91 | 66.69 | 53.17 | 46.83 | 49.62 |

3.5비트 TurboQuant은 Llama-3.1-8B-Instruct에서 full cache와 같은 평균 50.06을 기록했다. 2.5비트도 49.44로 KV Size 3의 KIVI(48.50)와 3.9의 PolarQuant(49.78)보다 적은 비트로 더 높다. 다만 KV Size 5의 KIVI는 평균 50.16으로 표 안에서 가장 높다.

KIVI와 PolarQuant는 생성된 토큰을 양자화하지 않고 두는 반면 TurboQuant은 streaming generation 과정에서도 양자화를 적용한다.

**비정수 bit precision의 출처**. 채널을 outlier와 non-outlier 두 집합으로 나눈 뒤 각 집합에 TurboQuant 인스턴스를 따로 적용하고, outlier 쪽에 더 높은 비트를 배정한다. 이 outlier 처리 전략은 선행 연구(QJL, RotateKV)와 동일한 방향이다. 2.5비트 구성은 outlier 채널 32개를 3비트로, 나머지 96개를 2비트로 양자화해 `(32×3 + 96×2)/128 = 2.5`가 된다. 3.5비트는 outlier 비율이 달라 유효 비트 정밀도가 높아진 경우인데, 논문은 그 비율을 밝히지 않는다. 저자는 이 조건에서 최소 4.5배 압축을 달성했다고 적는다.

### 4.4 ANN Search

DBpedia Entities의 1536차원본과 3072차원본, 그리고 저차원 대조군인 GloVe 200차원에서 평가했다. 세 방법 모두 같은 training set을 양자화하고 top-k에서의 recall ratio(1@k)로 비교했다. 이 지표는 진짜 top inner product 결과가 근사 top-k 안에 들어오는 빈도를 잰다.

**baseline 구성과 그에 따른 유불리**.

| baseline | 구성 | 논문이 밝힌 조건 |
|---|---|---|
| Product Quantization | k-means로 codebook을 만들고 별도 저장한다. 비트 수가 늘면 codebook 크기가 지수적으로 커져 저장 부담이 는다. AVX2 In-Register Lookup Table을 쓰는 구현이 가장 빠른데, 코드워드 16개짜리 LUT16은 품질 저하가 커서 코드워드 256개짜리 LUT256을 선택했다. 2비트는 조회당 좌표 4개, 4비트는 조회당 좌표 2개를 묶는다 | 학습과 평가에 같은 데이터셋을 써서 PQ가 구조적으로 유리한 설정이다 |
| RabitQ | 단위 구면에 균등 격자를 투영하고 데이터 점에 가장 가까운 투영을 탐색한다. preprocessing은 필요 없다 | 완전한 vectorization 구현이 없어 GPU 가속을 쓰지 못하고 CPU에서 느리게 동작한다. 비트 비율 비교에 반영하지 않은 추가 연산 부담이 있어 실제 사용 비트가 보고치보다 많다 |

baseline에 이런 이점을 준 상태에서도 TurboQuant이 모든 실험에서 recall ratio 우위를 유지했다는 것이 논문의 주장이다. Figure 5의 세 그래프에서 TurboQuant 2비트와 4비트 곡선이 같은 비트 수의 PQ, RabitQ 곡선 위에 놓인다. GloVe 200차원은 top-1 recall이 0.5 근처에서 시작해 방법 간 격차가 가장 크게 벌어지고, 1536차원과 3072차원에서는 top-4 이후 모든 방법이 1.0에 수렴한다.

**양자화 소요 시간 (4비트 기준, 단위 초)**.

| Approach | d=200 | d=1536 | d=3072 |
|---|---|---|---|
| Product Quantization | 37.04 | 239.75 | 494.42 |
| RabitQ | 597.25 | 2267.59 | 3957.19 |
| TurboQuant | 0.0007 | 0.0013 | 0.0021 |

codebook을 데이터에서 학습하는 PQ, RabitQ와 달리 TurboQuant은 미리 계산한 codebook을 재사용하므로 indexing 시간이 사실상 0이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 5.1 저자가 본문에 명시한 것

1. **Unit-norm 전제**. 분석은 입력이 단위벡터라고 가정한다. 저자는 이 가정이 표준적이고 제약이 크지 않다고 밝히면서, 조건을 만족하지 않는 데이터셋은 L2 norm을 부동소수점으로 따로 저장했다가 rescale하라고 지시한다.
2. **Entropy coding 미채택**. bit-width 4에서 약 5% 추가 압축이 가능하지만 이득이 작아 단순성과 속도를 위해 제외했다고 명시한다.
3. **하한의 기준이 expected distortion**. sphere packing 논증으로 얻는 worst-case 하한은 더 어려운 문제라 상수가 더 크다고 적는다. Theorem 3은 expected distortion 기준이라 본문 상한과 맞물린다는 것이 선택 이유다.
4. **3.5비트 구성의 outlier 비율 미공개**. 2.5비트는 32채널과 96채널의 분할까지 밝히지만, 3.5비트는 "다른 비율"이라고만 적고 수치를 제시하지 않는다.
5. **고차원 의존**. Beta 분포가 `N(0, 1/d)`로 수렴하는 것과 좌표 간 near-independence가 모두 "고차원에서" 성립한다고 명시한다. 저차원에서 보장이 얼마나 약해지는지는 정량화하지 않는다.

### 5.2 자료의 내적 모순

| 항목 | 서술 A | 서술 B |
|---|---|---|
| KV cache 압축률 | 초록과 1.3절이 "5배를 넘는 압축" | 4.3절이 "최소 4.5배 압축" |
| LongBench 판본 | 4.3절 본문이 "LongBench-E 부분집합을 사용" | Table 1 캡션이 "LongBench-V1 결과" |
| 우위 주장과 표 | 4.3절 본문이 "다른 방법들을 능가하고 평균 점수가 뚜렷이 높다" | Table 1의 KV Size 5 KIVI 평균 50.16이 3.5비트 TurboQuant 50.06보다 높다 |
| Beta 분포 수렴 대상 | 1.3절이 `N(1, 1/d)`로 수렴한다고 적는다 | Lemma 1과 3.1절이 `N(0, 1/d)`로 적는다. 대칭 분포이므로 후자가 맞고 전자는 오기로 보인다 |
| 참고문헌 | [62]와 [63]이 같은 QJL 논문(arXiv:2406.03482)의 중복 항목이다 | 본문은 QJL 인용에 [62]를, outlier 처리 인용에 [63]을 쓴다 |

### 5.3 논문에 기술이 없어 확인할 수 없는 것

- **rotation 행렬과 projection 행렬의 저장 비용**. `Π`와 `S`는 모두 `d×d` 크기다. 논문은 이 행렬을 어떻게 보관하거나 재생성하는지, 그 비용이 압축률 계산에 포함되는지 서술하지 않는다.
- **outlier 채널 선정 절차의 자동화**. outlier 집합을 무엇을 기준으로 고르는지, 자동 결정 방법이 있는지 본문에 없다.
- **디코딩 지연과 종단 처리량**. 양자화 소요 시간은 Table 2로 제시하지만, 양자화된 KV cache를 사용할 때의 추론 지연이나 처리량 측정은 제시하지 않는다.
- **최종 판본 여부**. 확보한 원본이 arXiv v1이라 이후 개정에서 수치가 바뀌었는지 알 수 없다.

## 6. 관련 연구 (Related Work)

- **VQ 이론의 기원**: Shannon의 source coding 이론이 출발점이다. Zador가 1963년 high-resolution 방법으로 고정 비율 양자화의 극한 distortion-rate 함수를 유도했으나 구현 가능한 알고리즘은 다루지 않았다. Gersho가 high-resolution 이론을 대중화하고 Zador의 결과를 단순화했으며 lattice vector quantization을 도입했다. 초기에는 가장 단순한 부호화 방법인 완전 탐색 nearest neighbor search의 계산 비용이 커서 실용화가 늦어졌다.
- **Scalar quantizer 이론**: Lloyd와 Max의 최적 scalar quantizer 알고리즘, Panter와 Dite의 high-resolution distortion 공식이 본 논문의 codebook 계산과 상한 증명에 그대로 쓰인다.
- **Online 대 offline 양자화**: online(data-oblivious) 방법은 데이터별 조정이나 calibration 없이 즉시 적용된다(GPT3.int8, QuaRot, KIVI, FlashAttention-3, PolarQuant). offline(data-dependent) 방법은 무거운 preprocessing과 학습으로 양자화 맵을 데이터에 맞추므로 동적 데이터에 부적합하다(SqueezeLLM). GPTQ, AWQ, SmoothQuant, QuIP는 2차(Hessian) 정보를 써서 양자화 맵을 조정하며 경우에 따라 post-processing까지 요구한다.
- **KV cache 압축 계열**: 저장할 key-value 쌍 수 자체를 줄이는 구조 변경(Multi-Query Attention, GQA, DeepSeekMoE), 중요도가 낮은 토큰을 잘라내거나 축출하는 방식(Longformer, H2O, Scissorhands, StreamingLLM, SnapKV, PyramidKV, BalanceKV), 그리고 양자화 방식(WKVQuant, QAQ, GEAR, Coupled Quantization, KIVI, KVQuant, Lexico, PolarQuant)으로 나뉜다. QJL은 sketching 기반 1비트 data-oblivious 양자화로 inner product 질의에 unbiased 추정을 제공하며, 본 논문이 그 기술을 그대로 사용한다.
- **Product Quantization과 ANN**: PQ 원 논문(Jegou 외), Optimized PQ, Additive Quantization, learning to hash 서베이, anisotropic vector quantization은 모두 indexing 단계에서 k-means 변형으로 codebook을 만들어 online 설정에 맞지 않는다. RabitQ는 preprocessing을 없앴으나 이론 보장이 느슨하고 vectorization 부재로 느리다.
- **고차원 확률과 정보이론**: 좌표 간 near-independence는 Vershynin의 고차원 확률론에 근거한다. SLB의 backward Gaussian test channel 증명은 Cover의 정보이론 교과서를 따른다.
- **벤치마크와 모델, 응용**: LongBench, Needle-In-A-Haystack, Llama-3, GloVe, BEIR/DBpedia를 쓴다. 응용 맥락으로 벡터 데이터베이스(Elasticsearch, Qdrant, pgvector, Pinecone)와 retrieval-augmented generation 문헌(GraphRAG 포함), ColBERT 계열 정보 검색을 인용한다.

## 7. 용어집 (Glossary)

- **TurboQuant_mse**: 본 논문이 제안한 MSE 최적 변형. random rotation 뒤 좌표별 Lloyd-Max scalar 양자화만 적용한다.
- **TurboQuant_prod**: inner product 최적 변형. `b−1`비트 TurboQuant_mse에 residual 1비트 QJL을 결합한 2단계 구성이다.
- **Distortion rate**: 주어진 비트 예산에서 달성 가능한 최소 distortion을 정의하는 함수. 본 논문은 MSE distortion과 inner product distortion 두 가지를 대상으로 한다.
- **Data-oblivious quantization**: 데이터를 보고 calibration하거나 preprocessing하지 않고 즉시 적용하는 양자화. 대상 데이터가 계속 바뀌는 KV cache 같은 상황에 맞는다.
- **Random rotation**: 정규분포 행렬의 QR 분해로 만든 직교행렬 `Π`. 임의 단위벡터를 hypersphere 균등분포로 바꿔 worst-case 입력의 영향을 없앤다.
- **Lloyd-Max algorithm**: 주어진 확률분포에 대한 최적 scalar quantizer의 centroid와 경계를 반복적으로 구하는 1차원 k-means 알고리즘.
- **Voronoi tessellation**: 양자화 경계가 정렬된 인접 centroid의 중점이 되는 최적 분할 조건.
- **QJL (Quantized Johnson-Lindenstrauss)**: `sign(S·x)`로 각 좌표를 1비트로 양자화하는 unbiased inner product quantizer. 역맵이 `(√(π/2)/d)·S^T·z`이고 분산이 `(π/2d)·‖y‖₂²` 이하다.
- **Residual quantization**: 1차 양자화가 남긴 오차 벡터를 2차 양자화로 다시 부호화해 정밀도를 높이는 기법.
- **Shannon Lower Bound**: 손실 source coding 정리에서 유도되는 distortion 하한. `D(p_X, B) ≥ (d/(2πe))·2^((2/d)(h(x)−B))`.
- **Yao's minimax principle**: randomized 알고리즘의 worst-case 하한을 deterministic 알고리즘과 worst-case 입력 분포의 하한으로 환원하는 원리.
- **Outlier channel**: 값 분포의 크기가 큰 소수 채널. 여기에 더 높은 비트를 배정하는 것이 2.5비트와 3.5비트 같은 비정수 정밀도의 출처다.
- **Recall@1@k**: 진짜 top inner product 결과가 근사 top-k 결과 안에 포함되는 빈도를 재는 ANN 정확도 지표.
- **LUT256**: PQ 구현에서 코드워드 256개를 담는 lookup table 구성. 코드워드 16개짜리 LUT16보다 느리지만 품질 저하가 적다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 16 | bit-width별 inner product 오차 히스토그램. prod는 불편, mse는 bias가 점차 소멸 | caption-region | (선택, theory) |
| fig02 | 17 | bit-width 2에서 평균 inner product에 따른 분산과 bias 변화 | caption-region | (선택, theory) |
| fig03 | 18 | inner product 오차와 MSE의 이론 상한, 하한 대비 실측 | caption-region | ★ wiki 권장 (theory 검증) |
| fig04 | 19 | Needle-In-A-Haystack 히트맵 6개. TurboQuant 0.997로 Full-Precision과 동일 | caption-region | ★ wiki 권장 (KV cache 핵심 결과) |
| fig05 | 21 | ANN Recall@1@k 곡선. GloVe와 OpenAI3에서 PQ, RabitQ 대비 우위 | caption-region | ★ wiki 권장 (ANN 결과) |
| tab01 | 20 | LongBench KV cache 압축 방법별 점수표 | table-region | 본문 마크다운 표로 이관 (검색 가능성 우선) |
| tab02 | 20 | 차원별 양자화 소요 시간 비교표 | table-region | 본문 마크다운 표로 이관 (검색 가능성 우선) |

> 크롭 점검 결과. 7장의 md5가 모두 다르므로 중복 크롭은 없다. fig03과 fig05는 상단 패널 제목 줄이 절반쯤 잘렸고, tab01은 마지막 행(Ministral-7B-Instruct의 TurboQuant 2.5비트)이 아래쪽에서 절반 잘렸다. 세 항목 모두 판독에는 지장이 없다. tab01의 잘린 마지막 행 값은 4.3절 표에 원문 그대로 복원해 두었다. `figures.json`은 불변이므로 수정하지 않았다.
