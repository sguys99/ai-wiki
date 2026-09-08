---
title: "Your Embedding Model is SMARTer Than You Think"
type: paper
year: 2026
category: database
raw_path: raw/papers/zhang-2026-your-embedding-model-is-smarter.pdf
raw_filename: "zhang-2026-your-embedding-model-is-smarter.pdf"
source_collection: external
tags: [embedding, retrieval, multimodal, multi-vector, late-interaction, ColBERT, MaxSim, Qwen3-VL-Embedding, ColPali, jina-embeddings-v4, MMEB-V2, visual-document-retrieval, RAG]
authors: "Jianrui Zhang, Hyun Jung Lee, Sukanta Ganguly, Tae-Eui Kam, Donghyun Kim, Yong Jae Lee"
arxiv_id: "2605.24938"
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/zhang-2026-your-embedding-model-is-smarter/fig01.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/fig01.png
    caption: "single-vector 검색이 놓친 문서를 SMART hybrid scoring이 되찾는 전체 흐름"
    page: 1
    bbox_norm: [0.1667, 0.3167, 0.9107, 0.5978]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/zhang-2026-your-embedding-model-is-smarter/fig02.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/fig02.png
    caption: "code와 marker의 국소 결합만 다르게 만든 toy benchmark의 문서 한 쌍"
    page: 5
    bbox_norm: [0.0, 0.0539, 1.0, 0.2552]
    strategy: caption-region
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/zhang-2026-your-embedding-model-is-smarter/fig03.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/fig03.png
    caption: "single-vector 검색이 틀린 사례를 SMART가 바로잡은 image-to-image 검색 예시"
    page: 9
    bbox_norm: [0.1667, 0.0833, 0.8371, 0.3007]
    strategy: caption-region
    curated: true
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/zhang-2026-your-embedding-model-is-smarter/fig04.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/fig04.png
    caption: "수도원과 성벽 사진에서 single-vector가 실패하고 SMART가 성공한 추가 사례"
    page: 14
    bbox_norm: [0.1667, 0.0833, 0.8332, 0.2245]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/zhang-2026-your-embedding-model-is-smarter/fig05.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/fig05.png
    caption: "query 토큰 하나가 후보 이미지의 어느 영역과 짝지어지는지 상위 5개로 표시한 그림"
    page: 14
    bbox_norm: [0.0, 0.2953, 1.0, 0.4324]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/zhang-2026-your-embedding-model-is-smarter/tab01.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/tab01.png
    caption: "MMEB-V2 여섯 묶음에 대한 training-free SMART의 과제별 평균 성능"
    page: 6
    bbox_norm: [0.1667, 0.1465, 0.8379, 0.3669]
    strategy: table-region
    curated: false
  - id: tab02
    label: Table 2
    kind: table
    file: assets/zhang-2026-your-embedding-model-is-smarter/tab02.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/tab02.png
    caption: "adapter를 학습한 SMART와 기존 multi-vector 모델의 visdoc 성능 비교"
    page: 7
    bbox_norm: [0.1667, 0.1482, 0.8334, 0.3746]
    strategy: table-region
    curated: false
  - id: tab03
    label: Table 3
    kind: table
    file: assets/zhang-2026-your-embedding-model-is-smarter/tab03.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/tab03.png
    caption: "LamRA-Ret 계열을 직접 학습해 변환 방식과 처음부터 학습을 비교한 결과"
    page: 8
    bbox_norm: [0.1667, 0.1473, 0.8334, 0.2721]
    strategy: table-region
    curated: false
  - id: tab04
    label: Table 4
    kind: table
    file: assets/zhang-2026-your-embedding-model-is-smarter/tab04.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/tab04.png
    caption: "late interaction에 쓰는 hidden state를 층별로 바꿔 본 visdoc 성능"
    page: 10
    bbox_norm: [0.1704, 0.1327, 0.8296, 0.2864]
    strategy: table-region
    curated: false
  - id: tab05
    label: Table 5
    kind: table
    file: assets/zhang-2026-your-embedding-model-is-smarter/tab05.png
    raw: raw/papers/zhang-2026-your-embedding-model-is-smarter-figures/tab05.png
    caption: "hybrid 목적함수로 학습한 LamRA-Hybrid를 포함한 부록 D의 ablation"
    page: 14
    bbox_norm: [0.1667, 0.6809, 0.8334, 0.8168]
    strategy: table-region
    curated: false
---

## 한 줄 요약 (One-line Summary)

single-vector 임베딩 모델의 non-pooling hidden state가 contrastive loss의 gradient 경로 위에 있어 이미 cosine 검색에 맞는 기하 구조로 정렬되어 있다는 관찰에서 출발해, 추론 시점에 MaxSim late interaction을 덧붙이는 SMART (Single-to-Multi Adaptation for Retrieval Transformers)를 제안한 논문이다. 파라미터 갱신 없이 MMEB-V2 여섯 묶음에서 일관된 개선을 얻고(Qwen3-VL-Embedding-8B 78.83에서 79.34), 1시간 50분짜리 경량 adapter만 학습하면 Qwen3-VL-Embedding-2B가 multi-vector 최상위 모델 jina-embeddings-v4를 0.34점 앞선다. LoRA로 변환하면 처음부터 multi-vector를 학습하는 것보다 학습 시간이 약 20% 적고 성능 차이는 약 0.63점이다.

## 1. 자료 정보 (Document Information)

- **Title**: Your Embedding Model is SMARTer Than You Think
- **Authors**: Jianrui Zhang (UW-Madison, 공동 1저자), Hyun Jung Lee (Korea University, 공동 1저자), Sukanta Ganguly (NetApp, Inc.), Tae-Eui Kam (Korea University), Donghyun Kim (Korea University, 공동 교신), Yong Jae Lee (UW-Madison, 공동 교신)
- **Affiliations**: UW-Madison, Korea University, NetApp, Inc.
- **Year**: 2026 (arXiv preprint, 2026-05-24)
- **arXiv ID**: 2605.24938v1 (cs.IR)
- **Code/Repo**: https://github.com/HanSolo9682/SMART (코드와 가중치 공개)
- **Type**: Preprint, 총 15페이지 (본문 10페이지, 부록 A에서 D와 참고문헌 5페이지)
- **평가 벤치마크**: MMEB-V2 (Apache-2.0 라이선스)
- **Funding**: NSF IIS2404180, IITP (MSIT) No. 2022-0-00871, No. RS-2025-2543949, Korea University AI Graduate School Program No. RS-2019-II190079, grant No. RS-2025-25439490, NRF (MSIT) RS-2025-25302986, KOCCA (문화체육관광부) RS-2024-00345025

## 2. 주요 기여 (Key Contributions)

1. **pooled 학습이 non-pooling hidden state까지 정렬한다는 관찰**. Contrastive InfoNCE loss는 표면적으로 pooled `<eot>` 토큰 하나만 supervise하지만, pooled state는 전체 토큰 시퀀스의 함수다. Transformer의 attention과 residual 경로를 통해 gradient `∂L/∂h^l_{q,i} = (∂z_q/∂h^l_{q,i})^⊤ ∂L/∂z_q`가 모든 non-pooling 토큰에 도달한다. 목적함수 자체가 cosine similarity로 정의되어 있으므로 이 간접 supervision은 hidden state들을 토큰 단위 cosine 검색에 맞는 기하 구조로 조직한다. 저자들은 각 토큰이 독립적인 검색 벡터로 supervise되는 것은 아니라고 명시적으로 선을 긋는다.

2. **SMART 제안**. backbone과 pooled readout을 그대로 두고 final layer의 non-pooling hidden state에 MaxSim late interaction을 적용한 뒤(`s_late(q,c) = (1/|M_q|) Σ_{i∈M_q} max_{j∈M_c} h̃^L_{q,i}^⊤ h̃^L_{c,j}`), 원래 pooled cosine 점수와 단순히 더한다(`s_hybrid = s_single + s_late`). 두 항이 모두 같은 final layer cosine 공간에서 normalize된 점수라서 가중치나 rescaling 단계 없이 unit weight로 결합한다.

3. **학습 없이 적용하는 plug-and-play 결과**. 파라미터 갱신 0회로 MMEB-V2 전체에서 backbone 다섯 종에 일관된 개선을 얻었다(수치는 4.2절 Table 1). Image RET, VDRv1, VDRv2, VR, OOD, Video RET 전 묶음에서 개선되었고, GME 계열의 video 열만 회색 처리되었다. GME가 여러 프레임을 다루도록 학습되지 않았고 MMEB-V2가 중간 프레임 하나만 제공하기 때문이다.

4. **경량 adapter post-training으로 multi-vector 최상위 모델 추월**. backbone은 동결한 채 final layer hidden state 위에 LayerNorm, Linear projection, ℓ2 normalize로 이뤄진 토큰 단위 adapter만 학습한다(`r_i = normalize(Linear(LN(h^L_i)))`, `Linear: R^H → R^d`). Colpali 학습 세트, global batch 512, Qwen3-VL-Embedding-2B 기준 48GB A6000 8장 한 노드에서 1시간 50분이 걸렸다. 그 결과 visdoc 평균이 79.27에서 81.25로 올라 jina-embeddings-v4의 80.91을 0.34점 앞섰다.

5. **LoRA 변환이 처음부터 학습하는 것보다 효율적**. Qwen3-VL-2B-Instruct에서 LamRA-Ret 레시피로 single 계열과 multi 계열을 직접 학습해 비교했다(수치는 4.4절 Table 3). 논문은 이 결과를 "왜 처음부터 multi-vector 모델을 학습하지 않는가"라는 반문에 대한 답으로 제시한다. 변환은 학습 시간이 약 20% 적고 성능은 약 0.63점 뒤진다.

6. **hybrid 목적함수 자체의 ablation (부록 D, Table 5)**. LamRA-Hybrid는 학습된 MaxSim 상호작용과 pooled 단일 토큰 anchor를 함께 쓴 모델로 79.10을 기록해 부록 표에서 가장 높다. 원래 single-vector baseline 72.60 대비 6.5점 개선이며, 저자들은 이 값이 Qwen3-VL-Embedding-2B의 79.27과 사실상 같은 수준이라고 강조한다.

7. **국소 결합을 격리한 controlled toy benchmark**. 5×5 격자의 차트 panel로 이뤄진 조밀한 시각 보고서 쌍을 만들고, hard negative는 레이아웃과 code 집합과 marker 기술어 집합을 모두 동일하게 유지한 채 code 할당만 고정점 없는 permutation으로 뒤섞는다. 40쌍 × panel당 25개 결합 = 1,000개 query로 pairwise 정확도를 측정했다(수치는 4.1절).

8. **층별 분석 (Table 4)**. late interaction에 쓸 hidden state를 어느 층에서 뽑는지 비교했다. pooled 점수를 layer 28에 고정하면 layer 20의 평균이 80.16으로 layer 28의 80.10보다 근소하게 높다. 저자들은 이를 두고 layer 28 hidden state를 쓰는 것이 최고 성능의 절대 요건은 아니며 layer 20 이후의 넓은 late 영역이 세밀한 정보를 담고 있다고 해석한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 Preliminaries, single-vector 목적함수와 병목

멀티모달 임베딩 모델은 텍스트 토큰, 시각 토큰, special 토큰으로 이뤄진 시퀀스를 처리하지만 학습과 사용은 훨씬 좁은 readout을 거친다. 표준 contrastive 학습은 지정된 pooling 표현 하나에만 supervision을 준다. 보통 end-of-text (`<eot>`) 토큰의 final layer hidden state다. query q, 양성 후보 c+, 음성 집합 {c-}에 대해 InfoNCE loss를 최소화한다.

```
L = -log [ exp(s_single(q, c+)/τ) / (exp(s_single(q,c+)/τ) + Σ_{c-} exp(s_single(q,c-)/τ)) ]
s_single(q, c) = (h^L_{q,eot})^⊤ h^L_{c,eot}   (양쪽 모두 normalize)
```

검색 시점에도 같은 single-vector readout을 쓰므로 query와 후보가 각각 normalize된 임베딩 하나로 접힌다. 순위 결정은 공유 임베딩 공간의 nearest-neighbor 탐색으로 축소된다.

이 압축이 single-vector bottleneck을 만든다. 관련성이 국소 근거에 크게 의존할 때조차 표현 하나가 검색 결정 전체를 떠받쳐야 한다. 후보의 작은 일부에 몰려 있는 세부(텍스트든 이미지든)가 결정적인 세밀한 멀티모달 검색에서 특히 두드러진다. single-vector similarity가 높다는 것은 전체적인 의미 관련성을 뜻할 뿐 국소 정보를 완전히 무시할 수 있다. 이론적으로도 single-vector 방식이 신뢰성 있게 반환할 수 있는 서로 다른 부분집합 순위의 개수가 임베딩 차원 수에 의해 엄격히 제한된다.

기존 late interaction과 multi-vector 검색기는 토큰이나 패치 단위 표현을 유지해 이 한계를 완화하지만 대체로 전면 학습이 필요하고, self-attention 비용이 시퀀스 길이에 제곱으로 늘어나므로 연산과 메모리 비용이 크다. 논문은 여기서 "기존 backbone과 효율적인 pooled 표현을 유지한 채 기존 single-vector 검색기에 multi-vector 능력을 더할 수 있는가"라는 질문을 세운다.

### 3.2 pooled supervision이 non-pooling hidden state에 도달한다

겉보기에 contrastive loss는 pooled 임베딩만 supervise하는 것처럼 보인다. 이 해석은 pooled state가 전체 토큰 시퀀스의 함수라는 사실을 놓친다. Transformer의 attention과 residual 경로를 통해 `h^L_{q,eot}`가 모든 non-pooling 토큰에서 정보를 모으므로, pooled state에 기여하는 모든 토큰이 contrastive loss의 gradient 경로 위에 놓인다.

```
∂L/∂h^l_{q,i} = (∂z_q/∂h^l_{q,i})^⊤ ∂L/∂z_q
```

여기서 `h^l_{q,i}`는 layer l의 i번째 query 토큰 hidden state, L은 최종 층, `z_q`는 normalize된 pooled 임베딩이다. 저자들은 이것이 각 토큰이 독립적인 검색 벡터로 supervise된다는 뜻은 아니라고 분명히 한다. loss는 최종 `<eot>` 표현에만 걸리지만 그 표현이 이전 층 hidden state들로부터 attention과 residual을 거쳐 계산되므로 non-pooling hidden state도 gradient 경로에 놓인다는 것이다. contrastive 목적함수 자체가 cosine similarity로 정의되어 있으므로 이 간접 supervision은 hidden state들이 cosine 기반 토큰 단위 검색을 뒷받침하는 방향으로 조직되도록 유도한다.

### 3.3 hidden state 위의 직접 late interaction

SMART는 backbone과 pooled readout을 그대로 두고, 모델이 이미 만들어 낸 hidden state 위에 토큰 단위 late interaction readout을 추가한다. 이 토큰 단위 신호는 pooled 점수의 대체물이 아니라 보완물로 쓴다. pooled 점수가 query와 후보의 전역 적합성을 잡고, 토큰 단위 대조가 pooled readout에서 압축되어 사라졌을 수 있는 국소 근거를 드러낸다.

- `M_q`, `M_c`: padding 토큰과 pooling 토큰을 제외한 query와 후보의 유효 non-pooling 토큰 인덱스 집합
- normalize된 final layer hidden state: `h̃^L_{x,i} = h^L_{x,i} / ||h^L_{x,i}||_2`
- MaxSim late interaction 점수 (ColBERT 방식):

```
s_late(q, c) = (1/|M_q|) Σ_{i∈M_q} max_{j∈M_c} h̃^L_{q,i}^⊤ h̃^L_{c,j}
```

late interaction 점수는 후보 hidden state 안에서 query의 국소 coverage를 측정한다. pooled readout과 같은 final layer cosine 기하 안에서 계산되므로 단순 덧셈으로 결합한다.

```
s_hybrid(q, c) = s_single(q, c) + s_late(q, c)
```

unit weight를 쓰는 이유는 SMART를 hyperparameter 없는 방법으로 유지하기 위해서다. 두 항 모두 같은 final layer 공간의 normalize된 벡터에서 계산한 cosine 기반 점수이므로 단순 덧셈이 여러 backbone에서 효과적이었다는 것이 저자들의 근거다. `s_hybrid` 아래에서는 query와 전역적으로 적합하면서 동시에 토큰 단위 근거가 국소적으로 뒷받침하는 후보가 높은 순위를 받는다.

final layer를 쓰는 이유도 명시되어 있다. pooled 임베딩이 그 층에서 읽히므로 원래 single-vector 점수 공간과 가장 직접적으로 호환되기 때문이다. 저자들은 이것이 이전 층에 유용한 정보가 없다는 주장은 아니며, 이전 층도 풍부한 어휘적, 시각적, 국소적 세부를 담을 수 있다고 4.6절을 근거로 덧붙인다.

### 3.4 경량 adapter post-training

backbone을 동결하고 final layer hidden state 위에 토큰 단위 선형 adapter만 학습한다. 유효 hidden state `h^L_i ∈ R^H`마다 layer normalization을 적용한 뒤 선형 사영과 ℓ2 normalize를 거친다.

```
r_i = normalize( Linear( LN(h^L_i) ) )    Linear: R^H → R^d
```

`Linear`가 유일하게 학습되는 readout 모듈이다. 학습 데이터는 Colpali 학습 세트, global batch 512다. Qwen3-VL-Embedding-2B용 adapter는 48GB A6000 8장 한 노드에서 1시간 50분이 걸렸다. 추론 시에는 위 식 (4)의 normalize된 hidden state를 adapter가 변환한 토큰 벡터 `r_i`로 대체하고 pooled single-vector 점수는 그대로 둔 채 같은 hybrid scoring을 적용한다. adapter는 `s_late`만으로 학습한다.

### 3.5 LoRA를 통한 전면 변환

처음부터 학습하는 방식과 비교하기 위해 저자들이 직접 학습한 계열이다.

| 항목 | 설정 |
|---|---|
| backbone | Qwen3-VL-2B-Instruct (Qwen3-VL-Embedding-2B와 같은 출발 모델) |
| 레시피 | LamRA-Ret |
| 하드웨어 | 80GB A100 8장 한 노드 |
| global batch | 512 |
| LoRA | r = 128, α = 256 |
| learning rate | cosine annealing, 최대 1e-4, warmup 비율 0.03 |
| 학습 데이터 | Colpali 학습 세트 |
| epoch | LamRA-Single과 LamRA-Multi는 4 epoch, LamRA-Single-Convert는 LamRA-Single 위에서 1 epoch 추가 |

### 3.6 적용 대상 과제 구분 (부록 B)

저자들은 SMART를 조밀한 corpus 단위 검색 과제에 한정한다. query와 대상의 의미 복잡도가 세밀한 정렬을 요구하는 과제(이미지 검색, 시각 문서 검색, 비디오 검색)가 대상이고, 나머지는 구조적으로 다른 문제라고 명시적으로 배제한다.

- **Classification과 VQA**: 대상이 "dog"이나 "43" 같은 저엔트로피 개념이라 벡터 하나로 쉽게 압축된다. SMART를 적용해도 이득이 없고, 단일 레이블 과제에 조밀한 토큰 단위 상호작용을 강제하면 의미 있는 국소 정렬이 없는 자리에서 정렬을 찾으려 하다가 오히려 잡음이 생길 수 있다.
- **Visual Grounding (이미지)**: 표준 grounding은 주어진 원본 이미지 안에서 특정 crop을 찾는 문제다. 열린 corpus 검색으로 확장하면 "dog" query가 다른 이미지의 유효한 distractor crop과 뒤섞인다. 의미상 맞는 결과를 검색해도 이 가짜 상관 때문에 감점되므로 corpus 단위 조밀 검색의 목적과 맞지 않는다.
- **Video Moment Retrieval**: 후보 클립이 특정 영화 안으로 한정되어 corpus 정의는 낫지만, 요구되는 의미 단위가 토큰 묶음 수준이라 SMART 설계와 어긋난다. "running" 같은 동적 행동을 식별하려면 시공간 전체를 아우르는 추상화가 필요한데, SMART는 토큰 단위 유사도를 계산하고 추론 전용이라 명시적 시간 추론이 없다. 저자들은 시간 축의 연속 특징을 이산 의미 단위로 묶는 중간 학습 모듈을 향후 과제로 남겼다.
- **Composed Image Retrieval의 구조 조정**: CIR 벤치마크에서는 가짜 상관이 남아 성능을 떨어뜨린다. 따라서 추론 시점에 query의 시각 토큰을 마스킹해 잘못된 시각 정렬을 막고, 이렇게 하면 전체 검색 정확도가 크게 오른다고 보고한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 controlled local-evidence toy benchmark

자연 검색 벤치마크에서는 전역 의미, 국소 근거, 데이터셋 편향이 얽혀 있어 pooling 병목을 격리하기 어렵다. 그래서 저자들은 검색기가 국소 결합을 총량 내용과 구분할 수 있는지 직접 시험하는 통제 벤치마크를 만들었다.

문서 한 쌍 (dA, dB)은 같은 레이아웃을 쓴다. 5×5 격자의 panel이고 각 panel에는 어수선한 차트와 국소 code-marker 결합 하나가 들어 있다. marker는 색과 모양으로 기술되고 짧은 영숫자 code로 라벨된다. dA가 양성 문서이고, hard negative dB는 레이아웃, code 집합, 시각 marker 기술어 집합을 모두 보존한 채 panel 사이의 code 할당만 permutation한다. 따라서 모든 query에 대해 negative 문서에도 질의된 code와 질의된 시각 기술어가 둘 다 존재하지만 올바른 국소 결합만 없다.

이 구성은 쉬운 전역 단서를 제거한다. dA와 dB가 같은 객체, 색, 모양, code, 문서 구조를 담고 있으므로 요청된 요소가 페이지 어딘가에 있는지 확인하는 방식으로는 풀 수 없다. code와 시각 marker가 같은 국소 영역에서 서로 결합되어 있는지를 판정해야 한다.

문서 40쌍을 생성했고 각 쌍은 25개 code-marker 결합을 담아 총 1,000개 query가 나온다. query 형식은 "find the report where code x labels the red star marker"다. 각 query마다 같은 쌍에서 나온 두 문서만 순위를 매기고 pairwise 정확도를 보고한다.

| 점수 방식 | pairwise 정확도 |
|---|---|
| 원래 single-vector 점수 | 31.9% |
| late interaction만 (같은 모델의 hidden state) | 56.8% |
| hybrid (`s_single + s_late`) | 42.6% |
| jina-embeddings-v4 multi-vector | 50.9% |
| Colpali multi-vector | 48.7% |

논문은 hybrid의 42.6%가 late interaction 단독보다 낮고 우연 수준 아래인 것이 이 적대적 설정에서 예상되는 동작이며 자연 검색 환경의 hybrid scoring에 대한 반증으로 읽어서는 안 된다고 명시한다. 원래 pooled 점수가 이미 우연 수준 아래이므로 이를 더하는 것이 중립적인 전역 사전 지식으로 작동하지 않고, 오히려 총량 유사도에 기반한 신호를 다시 들여와 국소 결합 판정을 방해한다는 설명이다. 양성과 hard negative가 레이아웃, code, 색, 모양을 공유하므로 이 총량 신호가 체계적으로 어긋날 수 있다.

native multi-vector 검색기 두 종도 우연 수준 근처에 머문다. 저자들은 이를 hidden state 채점이 보편적으로 우월하다는 증거로 읽지 말라고 덧붙이며, 이 벤치마크가 유용한 전역 단서를 의도적으로 제거하고 국소 결합 근거에만 평가를 집중시키도록 설계되었음을 강조한다.

### 4.2 Table 1, MMEB-V2 전체 (training-free)

이미지와 비디오 검색은 Recall@1, 시각 문서 검색은 NDCG@5로 보고한다.

| Model | Image RET | VDRv1 | VDRv2 | VR | OOD | Video RET | Average |
|---|---|---|---|---|---|---|---|
| # Tasks | 12 | 10 | 4 | 6 | 4 | 5 | |
| VLM2Vec-V2.0 | 69.50 | 75.34 | 47.28 | 79.43 | 62.04 | 28.66 | 64.50 |
| + SMART | 69.95 | 80.23 | 51.08 | 82.76 | 64.00 | 30.03 | **67.04** |
| GME-2B | 70.13 | 87.61 | 53.76 | 82.49 | 66.93 | 26.73 | 69.00 |
| + SMART | 71.05 | 87.97 | 57.23 | 84.18 | 67.82 | 26.50 | **70.00** |
| GME-7B | 73.09 | 90.01 | 60.43 | 86.20 | 69.22 | 29.92 | 72.26 |
| + SMART | 73.57 | 90.12 | 61.04 | 87.05 | 69.43 | 29.38 | **72.56** |
| Qwen3-VL-Embed-2B | 74.91 | 84.46 | 65.38 | 86.19 | 69.37 | 54.04 | 74.87 |
| + SMART | 75.33 | 85.52 | 66.61 | 86.87 | 69.90 | 56.05 | **75.77** |
| Qwen3-VL-Embed-8B | 80.09 | 87.29 | 69.35 | 88.78 | 73.27 | 59.01 | 78.83 |
| + SMART | 80.15 | 87.92 | 70.57 | 89.12 | 73.21 | 60.43 | **79.34** |

GME 계열의 Video RET 열은 원 표에서 회색 처리되어 있다. GME가 여러 프레임을 다루도록 학습되지 않았고 MMEB-V2가 중간 프레임 하나만 제공하기 때문에 변화가 거의 없다는 것이 이유다.

비디오 검색에서 논문이 본문에 명시한 증가폭은 VLM2Vec +1.37%, Qwen3-VL-Embedding-2B +2.01%, Qwen3-VL-Embedding-8B +1.42%다. 시각 문서 검색(VDRv1, VDRv2, VR, OOD)에서는 시험한 backbone 네 종 모두에서 일관되게 개선되었다.

### 4.3 Table 2, visdoc 부분집합에서의 adapter post-training

표기에서 ✓는 SMART hybrid scoring, ✗s는 SMART 없이 single-vector 점수만, ✗m은 SMART 없이 late interaction 혹은 multi-vector 점수만, ✓†는 모델을 동결하고 `s_late` adapter만 학습한 경우를 뜻한다.

| Model | Size | Train / Eval | VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|
| Qwen3-VL-Embedding | 2B | ✗s / ✗s | 84.60 | 65.33 | 86.34 | 69.27 | 79.27 |
| | 2B | ✗s / ✓ | 85.52 | 66.61 | 86.87 | 69.90 | 80.10 |
| | 2B | ✓† / ✓ | 87.09 | 67.08 | 87.99 | 70.73 | **81.25** |
| | 8B | ✗s / ✗s | 87.29 | 69.35 | 88.78 | 73.27 | 82.33 |
| | 8B | ✗s / ✓ | 87.92 | 70.57 | 89.12 | 73.21 | 82.88 |
| | 8B | ✓† / ✓ | 89.42 | 71.25 | 89.67 | 73.99 | **83.89** |
| Colpali-1.3 | 3B | ✗m / ✗m | 83.60 | 52.00 | 81.10 | 43.10 | 71.00 |
| jina-embeddings-v4 | 4B | ✗m / ✗m | 89.94 | 57.36 | 88.74 | 70.18 | 80.91 |

readout만 학습하는 adapter가 두 모델 크기 모두에서 training-free SMART보다 좋아졌고, 2B와 8B 양쪽에서 약 1점씩 올랐다. 8B는 추론 전용 SMART의 개선폭(약 0.5)이 adapter에서 두 배가 되었다.

가장 중요한 결과는 Qwen3-VL-Embedding-2B가 adapter의 도움으로 multi-vector 최상위 모델 jina-embeddings-v4를 0.34점 차이로 앞선 것이다. 이 변환에 든 학습은 학계 수준 자원에서 1시간 50분이다.

### 4.4 Table 3, LamRA-Ret 계열의 변환 대 처음부터 학습

| Model | Training Time | Train / Eval | VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|
| LamRA-Single | 6.5시간 | ✗s / ✗s | 81.58 | 50.72 | 78.41 | 63.50 | 72.60 |
| LamRA-Single-SMART | 6.5시간 | ✗s / ✓ | 83.02 | 52.25 | 80.52 | 64.50 | 74.18 |
| LamRA-Single-Convert | **9.5시간** | ✓† / ✓ | 86.93 | 54.60 | 84.39 | 67.61 | **77.68** |
| LamRA-Multi | 12시간 | ✗m / ✗m | 87.93 | 54.29 | 85.24 | 67.91 | 78.31 |

1행과 2행 비교는 추가 학습 없이 SMART를 추론에만 적용했을 때 약 1.6점 개선(72.60에서 74.18)을 보여 4.2절의 training-free 결과와 일치한다.

3행은 LamRA-Single 체크포인트에서 같은 레시피로 1 epoch만 더, 이번에는 `s_hybrid` 목적함수로 학습한 것이다. 3시간이 추가되어 총 9.5시간이다. 4행 LamRA-Multi는 Qwen3-VL-2B-Instruct에서 `s_late`만으로 학습해 12시간이 걸렸다. 변환 모델은 총 학습 시간이 약 20% 짧으면서 Multi 변형에 약 0.63점만 뒤진다.

### 4.5 Table 5, hybrid scoring ablation (부록 D)

| Model | Size | Train / Eval | VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|
| LamRA-Single | 2B | ✗s / ✗s | 81.58 | 50.72 | 78.41 | 63.50 | 72.60 |
| LamRA-Single-SMART | 2B | ✗s / ✓ | 83.02 | 52.25 | 50.52 | 64.50 | 74.18 |
| LamRA-Multi | 2B | ✗m / ✗m | 87.93 | 54.29 | 85.24 | 67.91 | 78.31 |
| LamRA-Hybrid | 2B | ✓ / ✓ | **88.14** | **55.81** | **86.39** | **68.90** | **79.10** |

LamRA-Hybrid는 학습된 MaxSim 상호작용과 pooled 단일 토큰 anchor를 결합한 모델이다. 79.10으로 부록 표에서 가장 높고 원래 single-vector baseline 대비 평균 6.5점 개선이다. 저자들은 이 값이 Qwen3-VL-Embedding-2B의 79.27과 사실상 같은 수준이라고 강조하며, 불투명하고 대규모일 학습 데이터와 연산 예산을 쓴 표준 최상위 모델과 대비할 때 SMART가 추론 요령을 넘어 학습 시점의 촉매로도 작동함을 보인다고 주장한다.

이 표의 LamRA-Single-SMART 행 VR 값 50.52는 같은 모델의 Table 3 값 80.52와 어긋난다. 두 표의 평균은 74.18로 같으므로 Table 5 쪽이 오기로 보인다. 실제로 (83.02 + 52.25 + 50.52 + 64.50) / 4는 62.57이라 표기된 평균 74.18과 맞지 않는다.

Table 5 캡션은 ✓†를 "LoRA with s_hybrid"로 정의하지만 표 본문에는 ✓† 행이 없다.

### 4.6 Table 4, 층별 late interaction 분석

Qwen3-VL-Embedding-2B의 28개 층을 대상으로 두 설정을 비교한다. 왼쪽은 layer X의 pooled 표현과 같은 layer X의 hidden state를 짝지은 경우이고, 오른쪽은 전역 anchor를 final layer(layer 28) pooled 벡터로 고정한 채 late interaction에 쓰는 중간 layer X만 바꾼 경우다.

| X | X층 pooling VDRv1 | VDRv2 | VR | OOD | Avg | 마지막층 pooling VDRv1 | VDRv2 | VR | OOD | Avg |
|---|---|---|---|---|---|---|---|---|---|---|
| 4 | 56.77 | 25.53 | 57.93 | 37.18 | 48.59 | 84.90 | 64.94 | 86.66 | 69.31 | 79.42 |
| 8 | 72.94 | 39.25 | 69.87 | 47.28 | 62.28 | 85.20 | 66.01 | 87.00 | 69.44 | 79.83 |
| 12 | 75.04 | 42.40 | 70.44 | 52.94 | 64.77 | 85.08 | 65.64 | 86.76 | 69.51 | 79.67 |
| 16 | 71.46 | 40.22 | 63.30 | 50.43 | 60.71 | 85.06 | 65.90 | 86.70 | 69.63 | 79.70 |
| 20 | 80.45 | 55.01 | 78.34 | 60.40 | 72.34 | 85.56 | 66.42 | 87.19 | 69.87 | **80.16** |
| 24 | 82.68 | 60.93 | 83.41 | 64.99 | 76.29 | 85.31 | 66.41 | 87.16 | 69.80 | 80.04 |
| 28 | 85.52 | 66.61 | 86.87 | 69.90 | 80.10 | 85.52 | 66.61 | 86.87 | 69.90 | 80.10 |

왼쪽 열은 깊은 층으로 갈수록 거의 단조 상승해 모델이 대조에 유효한 표현을 점진적으로 쌓아 올린다는 것을 보인다. 오른쪽 열은 layer 28 pooled 벡터로 anchor를 고정하면 훨씬 이른 층의 hidden state와 짝지어도 매우 높은 기준선이 유지된다는 점을 보인다. layer 20의 80.16은 layer 28의 80.10보다 유의하게 좋다고 볼 수 없는 수준이므로, layer 28 hidden state만 쓰는 것이 최고 성능의 절대 요건은 아니다. 저자들의 결론은 final layer single vector가 매우 안정적인 독립 anchor로 작동하고 layer 20 이후의 넓은 late 영역이 세밀한 정보를 담고 있다는 것이다.

### 4.7 정성 분석

Figure 1은 최상위 멀티모달 검색 모델 Qwen3-VL-Embedding-8B가 MMEB-V2 시각 문서 부분집합의 Vidore Economic Reports 과제에서 관련 이미지 세 개 중 하나를 검색하지 못한 사례다. SMART를 적용하면 이 실패가 교정된다. 시각 내용을 자세히 보면 차트 legend 안의 세밀한 항목("Europe and Central Asia"와 "Middle East and North Africa")이 query 텍스트와 정확히 대응한다.

Figure 3은 원래 single-vector 검색기가 전역적으로 그럴듯하지만 틀린 후보를 고르는 사례다. 검색된 이미지들이 성, 요새, 탑, 석조 건축 같은 넓은 시각 범주는 공유하지만 올바른 개체를 식별하는 데 필요한 국소 구조에서 갈린다. 선택된 query 토큰마다 hidden state cosine 유사도가 가장 높은 후보 이미지 토큰을 강조 표시했는데, 이는 `s_late`의 MaxSim이 실제로 고르는 토큰이다. 강조 영역이 이미지 전체에 균일하게 퍼지지 않고 작고 의미 있는 부분에 몰린다.

부록 C의 Figure 4는 single-vector가 Akhtala Monastery와 Visby City Wall을 골라 실패하고 SMART가 Gradac Monastery와 Będzin Castle을 정확히 검색한 사례다. Figure 5는 선택된 query 이미지 토큰마다 상위 5개 후보 이미지 토큰을 보여 준다. 강조된 패치가 탑, 지붕 구조, 벽, 출입구, 특징적인 건축 세부 같은 의미 있는 영역에 몰린다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

### 저자가 명시한 한계

- **조밀 검색 과제에 한정**. 논문은 SMART가 classification 같은 더 전역적인 과제에 추론 전용 도구로 쓰였을 때 이롭지 않다고 밝힌다. 부록 B에서 VQA, visual grounding, video moment retrieval도 같은 이유로 배제한다.
- **자체 학습 모델은 visdoc 부분집합만 평가**. 연산 제약 때문에 LamRA-Ret 계열을 visdoc 부분집합에서만 학습했다. 이미지 검색이나 비디오 검색 도메인에서 변환 방식과 처음부터 학습을 비교한 결과는 없다.
- **Composed Image Retrieval의 가짜 상관**. CIR에서는 SMART를 그대로 쓰면 성능이 떨어져 query 시각 토큰 마스킹이라는 별도 조정이 필요하다.
- **적대적 설정에서의 hybrid 하락**. toy benchmark에서 hybrid가 late interaction 단독보다 낮은 42.6%로 내려간 것은 전역 신호가 유익하지 않을 때 단순 덧셈이 신호를 약화시킬 수 있음을 보인다. 저자들은 이를 진단용 stress test로 분리해 해석하지만, 도메인 판정이나 가중치 적응 방안은 제시하지 않는다.

### 자료의 내적 모순

- Table 5의 LamRA-Single-SMART VR 값 50.52가 Table 3의 같은 행 80.52와 어긋난다. 평균은 두 표 모두 74.18이므로 Table 5가 오기로 보인다.
- Table 5 캡션이 정의한 ✓† 표기가 표 본문에 등장하지 않는다.

### 논문이 다루지 않은 지점

- **추론 비용과 저장 공간 증가분의 정량 보고가 없다**. 논문은 single-vector 방식이 효율적인 인덱싱과 nearest-neighbor 탐색을 보장한다는 점, 그리고 기존 multi-vector 학습이 시퀀스 길이 제곱에 비례하는 비용을 치른다는 점을 서론에서 언급하지만, SMART를 적용했을 때 후보 토큰 벡터를 모두 보관하는 데 드는 저장 공간이나 MaxSim 계산이 늘리는 질의 지연 시간은 어디에도 측정값으로 제시되지 않는다. 대규모 corpus 운영 관점의 비용은 이 논문 밖의 문제로 남는다.
- **단순 덧셈의 일반성에 대한 ablation이 없다**. `s_hybrid = s_single + s_late`의 unit weight는 두 항이 같은 cosine 공간에 있다는 논거로 정당화되지만, 가중치를 바꿔 본 실험이나 다른 normalization을 쓰는 backbone에서의 robustness 검증은 제시되지 않는다.

## 6. 관련 연구 (Related Work)

- **Single-vector 멀티모달 임베더**: CLIP [17], BLIP [9], SigLIP [25], UniIR [21], VLM2Vec [7], E5-V [6], GME [27], Qwen3-VL-Embedding [10] (최상위). 논문은 이 모델들이 국소적이고 세밀한 non-pooled hidden state에 쓴 연산을 낭비하고 있다고 표현한다.
- **Multi-vector와 late interaction**:
  - ColBERT [8] (Khattab & Zaharia, 2020). 텍스트 도메인에서 late interaction을 개척했고 MaxSim 연산자를 도입했다.
  - ColBERTv2 [19] (Santhanam et al., NAACL-HLT 2022). 경량 late interaction으로 효율화했다.
  - Colpali [3] (Faysse et al., ICLR 2025). 시각 문서에 late interaction을 적용했다.
  - jina-embeddings-v4 [4] (Günther et al., 2025). 멀티모달 다국어 검색용 범용 임베딩이다.
  - MetaEmbed [23] (Xiao et al., 2026). 학습 가능한 토큰으로 test-time scaling을 한다.
  
  SMART는 전면 과제별 학습이나 adapter나 학습 가능한 토큰을 요구하는 이들과 달리 추론만으로도 쓸 수 있다는 점에서 구별된다.
- **이론적 한계**: Weller et al. [22] (2026)은 임베딩 기반 검색의 이론적 한계를 다룬다. Luan et al. [14] (TACL 2021)과 Reimers & Gurevych [18] (ACL-IJCNLP 2021)은 sparse, dense, attentional 표현을 비교하고 저차원 dense 표현의 한계를 논한다.
- **벤치마크**: M-BEIR [21]에서 MMEB [7], MMEB-V2 [15]로 이어졌고 도메인별로 ViDoRe [3], VisRAG [24], Jina-VDR [4], UMRB [27]가 있다. 이 논문은 이미지, 문서, 비디오 도메인의 조밀 검색 과제를 폭넓게 포함한다는 이유로 MMEB-V2를 골랐다.
- **기반 모델과 레시피**: Qwen3-VL-2B-Instruct [2] (Bai et al., 2025), LamRA-Ret [13] (Liu et al., 2024), LoRA [5] (Hu et al., 2021), InfoNCE [16] (van den Oord et al., 2018), Transformer [20] (Vaswani et al., 2017).
- **같은 1저자의 동시기 작업**: Zhang et al. [26], "Reasoning-augmented representations for multimodal retrieval" (arXiv 2602.07125, 2026). 부록 B의 CIR 가짜 상관 논의가 이 문헌을 인용한다.

## 7. 용어집 (Glossary)

- **SMART (Single-to-Multi Adaptation for Retrieval Transformers)**: 이 논문이 제안하는 framework 이름. single-vector 검색기를 추가 학습 없이 또는 경량 학습으로 multi-vector 검색기로 변환한다.
- **single-vector bottleneck**: pooled 표현 하나가 검색 결정 전체를 떠받쳐야 해서 국소 근거가 압축되어 사라지는 현상. 이 논문의 출발 문제다.
- **non-pooling hidden state**: pooling 토큰과 padding 토큰을 제외한 나머지 토큰들의 final layer 표현. SMART가 재사용하는 자원이다.
- **hybrid scoring (`s_hybrid`)**: `s_single`과 `s_late`의 단순 합. 같은 final layer cosine 공간에서 normalize된 두 점수라서 unit weight로 작동한다.
- **MaxSim late interaction**: query 토큰마다 후보의 모든 토큰과의 cosine 중 최댓값을 취해 평균한 점수. ColBERT가 도입했다.
- **MMEB-V2**: 이 논문의 주 평가 벤치마크. Image RET 12개, VDRv1 10개, VDRv2 4개, VR 6개, OOD 4개, Video RET 5개 과제로 이뤄지며 Apache-2.0 라이선스다.
- **visdoc (visual document retrieval)**: PDF, 차트, legend 같은 시각 문서에서 텍스트와 시각 정보의 세밀한 정렬이 필요한 검색. VDRv1, VDRv2, VR, OOD가 이 부분집합이다.
- **local binding**: toy benchmark의 핵심 개념. code 하나와 marker 하나가 같은 panel 안에서 서로 짝지어져 있는 관계를 뜻한다.
- **LamRA-Ret**: 저자들이 자체 비교 모델을 학습할 때 쓴 레시피. Qwen3-VL-2B-Instruct에서 출발한다.
- **LamRA-Hybrid**: 부록 D에서 `s_hybrid`를 학습 목적함수로 쓴 모델. 부록 표에서 가장 높은 79.10을 기록했다.

## 8. 그림 후보 (Figure Candidates)

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 1 | "single-vector 검색이 놓친 문서를 SMART hybrid scoring이 되찾는 전체 흐름" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 5 | "code와 marker의 국소 결합만 다르게 만든 toy benchmark의 문서 한 쌍" | caption-region | ★ wiki 권장 (method) |
| fig03 | 9 | "single-vector 검색이 틀린 사례를 SMART가 바로잡은 image-to-image 검색 예시" | caption-region | ★ wiki 권장 (qualitative) |
| fig04 | 14 | "수도원과 성벽 사진에서 single-vector가 실패하고 SMART가 성공한 추가 사례" | caption-region | (부록 C, fig03과 중복) |
| fig05 | 14 | "query 토큰 하나가 후보 이미지의 어느 영역과 짝지어지는지 상위 5개로 표시한 그림" | caption-region | (부록 C, 해상도 낮음) |
| tab01 | 6 | "MMEB-V2 여섯 묶음에 대한 training-free SMART의 과제별 평균 성능" | table-region | (본문 마크다운 표로 이관) |
| tab02 | 7 | "adapter를 학습한 SMART와 기존 multi-vector 모델의 visdoc 성능 비교" | table-region | (본문 마크다운 표로 이관) |
| tab03 | 8 | "LamRA-Ret 계열을 직접 학습해 변환 방식과 처음부터 학습을 비교한 결과" | table-region | (본문 마크다운 표로 이관) |
| tab04 | 10 | "late interaction에 쓰는 hidden state를 층별로 바꿔 본 visdoc 성능" | table-region | (본문 마크다운 표로 이관) |
| tab05 | 14 | "hybrid 목적함수로 학습한 LamRA-Hybrid를 포함한 부록 D의 ablation" | table-region | (본문 마크다운 표로 이관) |
