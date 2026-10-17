---
title: "You could have invented transformers from memory"
type: article
year: 2026
category: llms
raw_path: raw/articles/alexwang-2026-you-could-have-invented-transformers.md
raw_filename: "alexwang-2026-you-could-have-invented-transformers.md"
source_collection: external
author: "Alex Wang"
url: "https://alexwang.ai/posts/associative-memory/"
publisher: "alexwang.ai"
tags: [associative-memory, memory-capacity, attention, self-attention, mlp, linear-layer, long-context, transformer, interference, article]
figures:
  - id: fig01
    file: assets/alexwang-2026-you-could-have-invented-transformers/page-full.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/page-full.png
    caption: "원문 페이지 상단 6000px 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop01.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop01.png
    caption: "같은 한자 한 글자를 네 가지 memory store에서 꺼낸 결과. outer product는 점이 흩어져 글자가 보이지 않고, ReLU MLP, gated MLP, self-attention 순으로 글자가 선명해진다"
    strategy: crop
    curated: true
  - id: fig03
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop02.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop02.png
    caption: "linear store에 M=32개를 저장하고 한 key로 꺼낼 때의 막대 그림. 빨간 막대가 목표 메모리, 회색 막대가 나머지 메모리의 상대 가중치이며 간섭 대 신호 비는 0.64다"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop03.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop03.png
    caption: "d_k=64에서 저장 개수 M에 따른 간섭 대 신호 비. outer product는 M=64 부근에서 1을 넘고, optimal linear store는 M이 64 이하일 때 간섭이 0이다가 M=128 부근에서 1을 넘는다"
    strategy: crop
    curated: true
  - id: fig05
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop04.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop04.png
    caption: "activation 다섯 종류의 간섭 대 신호 비 log-log 그래프. 선들이 거의 평행하고 linear, ReLU, ReLU 제곱과 SwiGLU, ReLU 세제곱 순으로 아래에 놓인다"
    strategy: crop
    curated: true
  - id: fig06
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop05.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop05.png
    caption: "exponential과 그 Taylor 급수를 2항, 3항, 4항에서 자른 경우의 비교. 완전한 exponential 곡선은 M=16384에서도 0.1 근처에 머문다"
    strategy: crop
    curated: true
  - id: fig07
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop06.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop06.png
    caption: "softmax store에 M=32개, sharpness 8로 저장했을 때의 막대 그림. 목표 메모리 막대만 보이고 나머지는 거의 0이며 간섭 대 신호 비는 0.0038이다"
    strategy: crop
    curated: true
  - id: fig08
    file: assets/alexwang-2026-you-could-have-invented-transformers/crop07.png
    raw: raw/articles/alexwang-2026-you-could-have-invented-transformers-figures/crop07.png
    caption: "long context에서 sharpness를 키우는 규칙 비교. 고정값 8은 약 200만 개에서 1에 닿고, Qwen과 SSMax와 Su 규칙은 0.004 근처로, YaRN은 0.0001 근처로 내려간다"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

linear layer, MLP, self-attention을 모두 key-value 쌍을 저장했다가 유사도로 꺼내는 associative memory로 보고, 다른 메모리가 끼어드는 간섭의 크기로 각 층의 기억 용량을 어림해 $d_k=64$에서 약 64개, 약 2,700개, 약 120만 개로 커지는 과정을 유도한 해설 글이다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | You could have invented transformers from memory |
| 저자 | Alex Wang |
| 게시처 | alexwang.ai (개인 블로그) |
| 게시일 | 2026-10-15 |
| URL | https://alexwang.ai/posts/associative-memory/ |
| 형식 | 수식, 인터랙티브 막대 그림 2개, 수치 실험 그래프 4개, 결론 표 1개, 각주 7개 |

저자는 도입부에서 보드게임 Dune: Imperium의 규칙을 Astra에게 물어 운전 중에 다시 익힌 경험을 소개한다. 모델이 이렇게 많은 사실을 어떻게 기억하는지, 그리고 얼마나 많이 저장할 수 있는지를 글의 질문으로 삼는다.

## 2. 주요 기여 (Key Contributions)

- linear map, MLP, self-attention을 하나의 틀(memory store)로 묶어 설명한다. 세 층 모두 질의(query) 벡터와 저장된 key의 유사도를 계산하고, 그 유사도로 value를 가중합한다. 차이는 유사도를 어떻게 변형하느냐에 있다.
- 비교 기준으로 간섭 대 신호 비(interference-to-signal ratio) 하나만 쓴다. 이 비가 1이 되는 저장 개수를 용량(capacity)으로 정의한다.
- 각 store의 용량을 random key와 value 가정 아래 어림 공식으로 유도하고 $d_k=64$ 수치 실험으로 확인한다.
- 유사도에 거듭제곱을 씌우면 용량이 $d_k^p$로, exponential을 씌우면 $e^{2\beta(1-\beta/d_k)}$로 커진다는 흐름을 보여 MLP와 self-attention을 "첫 원리에서 다시 발명"하는 경로를 제시한다.
- long context에서 attention logit을 $\log M$에 비례해 키우는 기법(Su, SSMax, Qwen LogN-Scaling, YaRN)을 같은 틀로 해석한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 용어와 설정

- memory store: $M$개의 메모리를 담는 함수 $f$.
- 메모리: key $k_i \in \mathbb{R}^{d_k}$와 value $v_i \in \mathbb{R}^{d_v}$의 쌍. key는 유사도 기반 조회에 쓰고 value는 되찾고 싶은 내용이다.
- 질의와 recall: 입력 $x$로 질의하면 $f(x)$를 돌려받는다. 좋은 store는 $k_i$나 그와 비슷한 벡터로 질의했을 때 $v_i$를 돌려준다.
- 유사도로 recall하는 store를 문헌에서는 associative memory라 부른다.
- 많이 저장할수록 메모리끼리 간섭(interference)한다. 간섭이 신호(signal)만큼 커지기 전까지 담을 수 있는 메모리 수가 용량이다.

### 3.2 outer product store

가장 단순한 store는 outer product를 누적한다.

$$W = \sum_{i=1}^{M} v_i k_i^\top = V^\top K$$

$K \in \mathbb{R}^{M\times d_k}$와 $V \in \mathbb{R}^{M\times d_v}$의 행이 각각 key와 value다. 새 메모리 $(k, v)$를 저장하려면 $vk^\top$를 더하기만 하면 된다. 각주 1은 이 누적을 Hebbian learning이라 부르기도 한다고 설명하고(함께 발화하는 입력과 출력이 시냅스를 강화), 각주 2는 이 store가 linear attention, 즉 fast weights의 상태로 쓰인다고 적는다(Katharopoulos et al., Schlag, Irie & Schmidhuber).

여담 상자 "gradient descent 한 걸음이 메모리를 쓴다": linear layer $y=Wx$에서 출력 그래디언트를 $\bar y$라 하면 가중치 그래디언트는 $\bar y x^\top$이므로 학습률 $\eta$의 한 걸음은 $W \leftarrow W - \eta \bar y x^\top$이다. 이는 key $x$, value $-\eta \bar y$인 메모리를 하나 더하는 것과 같다. Irie, Csordás & Schmidhuber는 gradient descent로 학습된 linear layer를 학습 입력 전체에 대한 attention으로 표현했다.

질의는 행렬 곱이다.

$$f(x) = V^\top K x = \sum_{i=1}^{M} v_i (k_i^\top x)$$

즉 질의를 모든 key와 비교하고 그 유사도로 value를 가중합한다.

### 3.3 recall의 간섭

key를 단위 길이로 두면 저장된 key $k_j$로 질의할 때

$$f(k_j) = \underbrace{v_j}_{\text{signal}} + \underbrace{\sum_{i\neq j} v_i (k_i^\top k_j)}_{\text{interference}}$$

가 된다. key가 모두 orthonormal이면 간섭은 0이지만 $\mathbb{R}^{d_k}$에는 직교 방향이 $d_k$개뿐이므로 $M > d_k$이면 완벽한 recall이 불가능하다.

어림 논증: 간섭 항은 $M-1$개다. random 단위 key의 유사도는 약 $\pm 1/\sqrt{d_k}$이고, value도 random이며 길이가 비슷하면 간섭 항들은 random walk처럼 더해진다. 따라서 간섭의 제곱 길이는 신호의 약 $(M-1)/d_k$배이고

$$\frac{\lVert \text{interference} \rVert}{\lVert \text{signal} \rVert} \sim \sqrt{\frac{M}{d_k}}$$

이다. 이 비를 1로 두면 용량은 $M \approx d_k$다.

인터랙티브 막대 그림: 막대 하나가 저장된 메모리 하나의 가중치(목표 메모리 대비)를 나타낸다. $M$을 $d_k=64$ 너머로 끌면 작은 막대가 쌓여 recall이 실패한다. 버튼으로 linear, ReLU, ReLU², softmax를 고를 수 있다.

### 3.4 간섭을 줄이는 방법

용량 이하에서도 outer product store는 간섭이 상당하다. 각주 3은 이 결론이 깨끗한 value 벡터를 recall할 때의 이야기이며, value가 고정된 후보 집합 중 정답 방향만 가리키면 되는 경우(가장 그럴듯한 토큰 고르기 등)에는 $d\times d$ 행렬이 약 $d^2$개의 사실을 담을 수 있다고 덧붙인다(Nichani, Lee & Bietti).

간섭을 줄이는 길은 세 가지다.

| 방법 | 내용 | 결과 |
|---|---|---|
| 차원 확대 | $d_k$를 키운다 | 하드웨어 제약이 상한 |
| 더 신중한 저장 | 다른 메모리를 고려해 가중치를 정한다 | optimal linear store, 용량 약 2배 |
| 선택적 recall | 유사도가 낮은 key를 nonlinearity로 억누른다 | MLP와 self-attention |

### 3.5 optimal linear store

모든 메모리를 한꺼번에 맞추도록 $W$를 고르는 linear regression 문제로 바꾼다.

$$\min_W \sum_{i=1}^M \lVert W k_i - v_i \rVert_2^2$$

$M > d_k$일 때 해는 $W = V^\top K (K^\top K)^{-1}$이다. outer product store와 다른 점은 질의를 key와 비교하기 전에 $(K^\top K)^{-1}$를 곱해 key의 공분산을 되돌린다는 것이다. 이 처리는 key를 whitening해서 많은 key가 공유하는 방향을 과대평가하지 않게 한다. 각주 4는 이 regression 목표로 forward pass 중에 쓰는 단기 메모리(linear attention, self-attention)를 설계할 수 있다며 저자의 test-time regression 연구를 소개한다.

- $M \le d_k$이고 key가 일차독립이면 모든 메모리를 정확히 맞춘다. key가 직교하지 않아도 간섭이 0이다.
- $M > d_k$이면 간섭이 생긴다. random key와 value에서 $\sqrt{M/d_k - 1}$이다.
- 이 비는 $M = 2d_k$에서 1이 되므로 용량이 outer product store의 2배다.

유도(여담 상자):

- $M \le d_k$: $W = V^\top (KK^\top)^{-1} K$. $M < d_k$이면 해가 무한히 많고 이것은 min-norm 해다. $(KK^\top)^{-1}K$의 행 $\tilde k_i$는 $K$ 행의 dual basis라 $\tilde k_i^\top k_j = \delta_{ij}$이고 $f(k_j)=v_j$다.
- $M > d_k$: 그래디언트를 0으로 두면 $W K^\top K = V^\top K$. 두 경우 모두 $W = V^\top (K^\top)^{+}$(pseudoinverse)로 쓸 수 있다.
- $P = K(K^\top K)^{-1}K^\top$를 두면 $f(k_j) = P_{jj}v_j + \sum_{i\ne j}P_{ij}v_i$다. $P$는 $\mathbb{R}^M$의 $d_k$차원 부분공간으로의 projection이다.
- 신호: trace의 순환성으로 $\sum_j P_{jj} = d_k$이므로 $P_{jj} \approx d_k/M$.
- 간섭: $P^\top P = P$이므로 $\sum_{i\ne j}P_{ij}^2 = P_{jj} - P_{jj}^2$.
- 따라서 비는 $\sqrt{P_{jj}-P_{jj}^2}/P_{jj} = \sqrt{M/d_k - 1}$이다. outer product의 $\sqrt{M/d_k}$와 비교하면 $-1$이 optimal store가 상쇄하는 $d_k$개 분량의 간섭이다.

수치 실험($d_k=64$, 단위 길이 random key, 저장된 key로 질의): outer product는 $M\approx 64$에서 용량에 닿는다. optimal store는 $M=64$까지 정확히 recall하고, 그 뒤 간섭이 $\sqrt{M/d_k-1}$로 올라 $M\approx128$에서 용량에 닿는다. 상쇄하는 양이 고정이므로 $M$이 커질수록 두 store의 격차는 줄어든다.

optimal store도 유사도에 대해 linear라서 작은 유사도와 큰 유사도를 같은 배율로 다룬다. 더 나아지려면 recall 방식을 바꿔야 한다.

### 3.6 MLP를 nonlinear memory store로 보기

각 유사도에 nonlinear 함수 $\sigma$를 씌운다.

$$f(x) = \sum_{i=1}^{M} v_i \sigma(k_i^\top x) = V^\top \sigma(Kx)$$

이것이 2층 MLP다. 첫 가중치 행렬의 행이 key, 둘째 가중치 행렬의 열이 value다. Sukhbaatar et al.이 이 유사성을 지적했고, Geva et al.은 학습된 Transformer의 feedforward layer가 실제로 이렇게 동작하며 key가 입력의 알아볼 수 있는 패턴에 반응함을 발견했다.

gating 함수 선택:

- ReLU: 음수 유사도를 0으로 만든다. bias를 더하면 문턱을 옮길 수 있다. 각주 5에 따르면 random key의 유사도는 양수와 음수가 반반이라 ReLU가 가중치 절반을 0으로 만들고, 간섭의 분산(가중치 제곱합)이 절반이 되어 간섭이 $\sqrt2$배 줄어든다(Zhong et al.).
- squared ReLU: 0 근처 유사도를 더 누른다. 0.1은 0.01이 되고 1은 1로 남는다. So et al.이 보고한, 덜 알려졌지만 대규모로 검증된 MLP activation 개선이다.
- squared ReLU MLP는 gate와 입력 projection이 가중치를 공유하는 GLU MLP다. $\mathrm{ReLU}(Kx)^2 = \mathrm{ReLU}(Kx)\odot Kx$이기 때문이다. 현재 언어 모델의 SwiGLU MLP는 gate에 별도 가중치를 주고 ReLU 대신 Swish를 쓴다.

실제 MLP는 사실을 superposition으로 저장한다. 많은 사실이 같은 가중치를 공유하고 출력은 여러 메모리의 혼합이다. Garcia et al.은 GLU MLP의 hidden unit이 입력의 random feature $\phi(x)$를 계산하고 둘째 가중치 행렬이 그 feature 위의 outer product store $\sum_i v_i\phi(k_i)^\top$가 되는 MLP를 명시적으로 만들어, hidden unit 수보다 훨씬 많은 사실을 저장했다. 한편 학습된 Transformer의 ReLU MLP는 입력 하나에 hidden unit의 1% 정도만 활성화하기도 하므로 recall 한 번이 메모리의 작은 일부만 쓴다(Li et al.).

여담 상자 "Transformer 저자들도 알고 있었다": 원 Transformer 논문의 arXiv v2와 v3에서 Vaswani et al.은 feedforward layer를 "일종의 attention"으로 설명했다. 두 가중치 행렬의 행이 key와 value이고 softmax 대신 ReLU를 쓴다는 것이다. 학습된 key-value 파라미터에 대한 attention으로 feedforward layer를 대체하는 실험도 했고 번역 품질은 비슷했다(한 버전은 조금 낮고 다른 버전은 조금 높았으며, 앞의 버전은 학습이 약 30% 느렸다). 이 문단은 이후 버전에서 모두 삭제됐다.

### 3.7 더 높은 거듭제곱

$\sigma(s) = \mathrm{ReLU}(s)^p$로 일반화한다. 신호는 ${1^p = 1}$로 그대로이고, 유사도 ${1/\sqrt{d_k}}$인 간섭 항은 $d_k^{-p/2}$로 줄어든다. $M$개의 간섭 항이 random walk로 더해지므로

$$\frac{\lVert \text{interference} \rVert}{\lVert \text{signal} \rVert} \approx \sqrt{\frac{M}{d_k^p}}, \qquad M \approx d_k^p$$

즉 용량이 기하급수적으로 커진다.

다섯 가지 $\sigma$의 수치 실험: 간섭이 $\sqrt M$으로 자라므로 log-log 그래프에서 선들이 거의 평행하고 높이만 다르다.

| $\sigma$ | 간섭 감소 원리 | 용량($d_k=64$) |
|---|---|---|
| Linear | 없음 | $d_k = 64$ |
| ReLU | 음수 유사도 제거로 $\sqrt2$배 감소 | ${2d_k = 128}$ |
| squared ReLU | 간섭 항이 ${1/\sqrt{d_k}}$에서 약 ${1/d_k}$로 | ${2d_k^2/3 \approx 2700}$ (linear의 약 40배) |
| SwiGLU (gate가 입력 projection 가중치 공유) | $\sigma(s) = \mathrm{Swish}(s)\cdot s = s^2/(1+e^{-s})$ | squared ReLU와 거의 같음 |
| cubed ReLU | 간섭 항이 약 $d_k^{-3/2}$로 | ${2d_k^3/15 \approx 35000}$ |

### 3.8 self-attention을 non-parametric memory store로 보기

거듭제곱을 하나 고르는 대신 모든 거듭제곱을 쓴다. exponential은 모든 거듭제곱의 가중합이다.

$$e^{\beta s} = \sum_{p=0}^{\infty} \frac{(\beta s)^p}{p!}$$

sharpness $\beta$가 높은 거듭제곱의 비중을 정한다. self-attention이 쓰는 $\beta = \sqrt{d_k}$로 실험한다. 각주 6은 Transformer가 유사도를 $\sqrt{d_k}$로 나누지만 실제 query와 key 길이가 약 $\sqrt{d_k}$라 일치 쌍의 $q^\top k \approx d_k$이고, 이 글의 key는 단위 길이라 일치 쌍의 유사도가 1이므로 $\beta=\sqrt{d_k}$를 곱하는 것과 같다고 설명한다.

급수를 잘랐을 때의 용량:

| 항 수 | 용량 | 설명 |
|---|---|---|
| 2항 | 약 40 | 상수항이 모든 key에 가중치 약 1을 주어 linear보다 낮다 |
| 3항 | 약 450 | |
| 4항 | 약 3,100 | squared ReLU와 비슷 |
| 완전한 exponential | 그래프 범위 밖 | 점선(비 1)보다 훨씬 아래 |

용량 유도: 저장된 key $k_j$로 질의하면 목표 가중치는 $w_j = e^\beta$, 나머지는 $w_i = e^{\beta s_i}$이고 $s_i \sim \mathcal N(0, 1/d_k)$다. 간섭 항이 random walk로 더해지므로

$$\frac{\lVert \text{interference} \rVert}{\lVert \text{signal} \rVert} \approx \sqrt{\sum_{i\ne j} e^{2\beta(s_i - 1)}} \approx \sqrt{M e^{-2\beta}\,\mathbb E[e^{2\beta s}]} = \sqrt{M}\, e^{\beta^2/d_k - \beta}$$

(마지막 단계는 Gaussian의 moment generating function $\mathbb E[e^{ts}] = e^{t^2/(2d_k)}$). 비를 1로 두면

$$M \approx e^{2\beta(1-\beta/d_k)}$$

이다. $\beta$가 $d_k$보다 충분히 작으면 용량이 $\beta$에 대해 지수적으로 자란다. $\beta = \sqrt{d_k} = 8$이면 약 $e^{14} \approx 120$만 개로 linear store의 약 2만 배이며, 더 긴 실험도 약 120만 개를 확인했다.

수치 안정성: exponential을 그대로 계산하면 underflow나 overflow가 날 수 있다. 간섭은 가중치 사이의 비율에만 의존하므로 모든 가중치를 합으로 나눠도 비는 변하지 않는다.

$$f(x) = \sum_i v_i \frac{\exp(\beta k_i^\top x)}{\sum_j \exp(\beta k_j^\top x)} = V^\top \mathrm{softmax}(\beta K x)$$

이것이 self-attention이다. 각주 7은 Transformer 표기로 유사도가 $k_i^\top q$, $q = W_Q x$이며 이 글은 $W_Q$를 key에 접어 넣었다고 설명한다.

MLP와 달리 self-attention은 key와 value를 context의 토큰에서 계산한다. 토큰 하나가 메모리 하나를 저장하므로 $M$은 context 길이다. 메모리가 파라미터가 아니고 context와 함께 store가 커지므로 non-parametric이다.

softmax 막대 그림: $\beta=8$에서는 슬라이더 범위 안에서 recall이 실패하지 않는다. $\beta$를 2로 낮추고 $M$을 올리면 수십 개에서 실패한다. $M$이 두 배가 될 때마다 recall 유지에 $\beta$가 조금 더 필요하다.

### 3.9 long context에서 많은 key-value 쌍 다루기

$\beta$는 덜 비슷한 key를 얼마나 세게 누를지 정하므로 key-value 쌍이 늘면 $\beta$를 키우면 된다. 다만 $\beta \to \infty$이면 softmax가 미분 불가능한 hard argmax가 되고, 매우 큰 $\beta$는 softmax를 포화시켜 다른 key의 그래디언트를 사라지게 해 학습이 잘 되지 않는다. 그래서 $M$이 요구하는 만큼만 $\beta$를 키운다. attention logit을 $\log M$으로 스케일하는 long context 기법들이 이 일을 하며, 모두 기준 길이 $L$(보통 학습 길이)에서 학습된 값을 유지한다.

| 규칙 | 스케일 | 비고 |
|---|---|---|
| Su (2021) | 모든 길이에서 $\log M / \log L$ | attention entropy를 일정하게 유지하는 조건에서 유도 |
| Scalable-Softmax (SSMax) | $s \log M$, $s$는 학습 | Su와 같은 형태 |
| Qwen LogN-Scaling | $M > L$일 때만 같은 배율 적용 | 원래 Qwen 모델 |
| YaRN attention scaling (Qwen2.5-1M) | $(0.1\log(M/L) + 1)^2$ | $(\log M)^2$처럼 자란다 |

실험($\beta = \sqrt{d_k} = 8$, $L = 1024$): Qwen 규칙과 Su 규칙은 $L$ 이후 일치하고, store가 커질수록 비가 줄어 200만 개에서 약 0.004다. YaRN은 약 ${10^{-4}}$까지 낮춘다. 고정 $\beta = 8$은 약 100만에서 200만 개 사이에서 1에 닿는다(그래프). 어느 규칙이든 $\log M$에 맞춰 $\beta$를 키우면 key가 서로 다른 메모리를 사실상 무한히 저장할 수 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

결론 표(저장된 key로 질의, random key와 value):

| memory store | $f(x)$ | 용량 | $d_k=64$에서 용량 |
|---|---|---|---|
| Outer product | $V^\top K x$ | $d_k$ | 64 |
| Optimal linear | $V^\top K(K^\top K)^{-1}x$ | ${2d_k}$ | 128 |
| ReLU MLP | $V^\top \mathrm{ReLU}(Kx)$ | ${2d_k}$ | 128 |
| Squared ReLU (GLU MLP) | $V^\top \mathrm{ReLU}(Kx)^2$ | ${2d_k^2/3}$ | 약 2,700 |
| SwiGLU MLP | $V^\top(\mathrm{Swish}(Kx)\odot Kx)$ | 약 ${2d_k^2/3}$ | 약 2,900 |
| Cubed ReLU | $V^\top \mathrm{ReLU}(Kx)^3$ | ${2d_k^3/15}$ | 약 35,000 |
| Self-attention, $\beta=\sqrt{d_k}$ | $V^\top\mathrm{softmax}(\beta Kx)$ | $e^{2\sqrt{d_k}-2}$ | 약 120만 |
| Self-attention, $\beta \propto \log M$ | $V^\top\mathrm{softmax}(\beta Kx)$ | 실험에서 도달하지 않음 | 200만 초과 |

그 밖의 수치:

- 막대 그림 기본 상태($M=32$, linear): 간섭 대 신호 비 0.64. softmax, $\beta=8$, $M=32$: 0.0038.
- exponential 급수 절단: 2항 약 40, 3항 약 450, 4항 약 3,100.
- self-attention($\beta=8$)은 linear store 용량의 약 2만 배, squared ReLU는 약 40배.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 용량 추정은 아키텍처를 보는 여러 방법 중 하나다. 단일 층이 random 벡터를 몇 개까지 recall하는지만 센다.
- 학습 데이터를 전혀 고려하지 않았다. 실제로 key와 value에 무엇이 표현되는지는 학습 데이터가 정한다.
- 학습된 층을 비트 단위로 재는 연구가 따로 있다. Morris et al.은 GPT 계열이 파라미터당 약 3.6비트를 암기하며, 용량이 차면 일반화를 시작하고 학습 예시별 암기가 줄어든다고 추정했다. Allen-Zhu & Li는 언어 모델이 int8로 양자화해도 파라미터당 약 2비트의 사실 지식을 저장한다고 보고했다.
- 실험은 저장된 key로 정확히 질의하는 경우이며 key와 value가 random이라는 가정 위에 있다.

후속 방향으로 저자가 든 연구 주제:

| 주제 | 언급된 연구 |
|---|---|
| 층의 정보 저장량 | Nichani, Lee & Bietti, Barnfield et al.(linear store), Dugan et al., Garcia et al.(사실 저장 MLP), Zhong et al.(이 글의 비 추정에 영감) |
| Hopfield network와 지수 용량 | Krotov & Hopfield(dense associative memory), Demircigil et al., Ramsauer et al.(attention과 연결), Krotov et al. 리뷰 |
| 추론 중 갱신되는 단기 메모리 | fast weights, Mamba, Mamba-2, DeltaNet, Gated DeltaNet, TTT layers, Titans, MesaNet, test-time regression |
| 거대하지만 sparse한 파라미터 메모리 | product-key memories, Memory Layers at Scale, UltraMem, Mixture of A Million Experts, Engram |
| 가중치 밖에 덧붙이는 non-parametric memory | kNN-LM, RETRO, Memorizing Transformers, growing nonparametric networks |
| 학습된 모델 안의 메모리 찾기와 편집 | Geva et al., Bietti et al., ROME, MEMIT |
| 단기 메모리 압축과 장기 메모리 전환 | KVzip, gist tokens, Cartridges, attention matching |
| continual learning | sparse memory finetuning |

저자는 자신의 기억이 얼마나 제한적인지 체감하기 때문에 메모리에 끌린다며, 기계가 기억하는 방식을 이해하면 자신에 대해서도 무언가 배울 수 있으리라 기대한다는 말로 글을 맺는다.

## 6. 관련 연구 (Related Work)

- Vaswani et al. (2017) Attention Is All You Need의 v2, v3: feedforward layer를 attention으로 해석한 삭제된 문단.
- Sukhbaatar et al. (2019), Geva et al. (2020): feedforward layer를 key-value 메모리로 보는 관점.
- Irie, Csordás & Schmidhuber (2022): gradient descent로 학습한 linear layer와 attention의 쌍대성.
- Katharopoulos et al. (2020), Schlag, Irie & Schmidhuber (2021): linear attention과 fast weights.
- Ramsauer et al. (2020): Hopfield network와 attention의 연결.
- Su (2021), Scalable-Softmax (2025), Qwen (2023), Qwen2.5-1M (2025): long context logit 스케일링.
- wiki 내 관련: [[database/gutierrez-2025-from-rag-to-memory-non]](non-parametric memory로서의 RAG), [[llms/peebles-2022-scalable-diffusion-models-with-transformers]](Transformer backbone).

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| associative memory | 질의와 저장된 key의 유사도로 value를 꺼내는 메모리 |
| memory store | $M$개의 key-value 쌍을 담고 질의에 $f(x)$를 돌려주는 함수 |
| 간섭 대 신호 비 (interference-to-signal ratio) | recall 결과에서 다른 메모리가 섞인 크기를 목표 value 크기로 나눈 값 |
| 용량 (capacity) | 간섭 대 신호 비가 1에 닿을 때의 저장 개수 |
| outer product store | $vk^\top$를 누적하는 가장 단순한 linear store. Hebbian learning, fast weights와 같은 형태 |
| optimal linear store | least squares로 모든 메모리를 함께 맞춘 linear store. key를 whitening한다 |
| sharpness $\beta$ | softmax 안에서 유사도에 곱하는 배율. 클수록 덜 비슷한 key를 세게 누른다 |
| non-parametric memory | 저장 내용이 파라미터가 아니라 입력(context)에서 오는 메모리. self-attention이 해당 |
| LogN-Scaling | context 길이 $M$의 로그에 비례해 attention logit을 키우는 long context 기법 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 원문 페이지 상단 전체 스크린샷 | screenshot | (제외) 개별 크롭으로 대체 |
| fig02 | 네 memory store에서 같은 글자를 꺼낸 결과 비교 | crop | ★ wiki 권장 (overview) |
| fig03 | linear store 막대 그림, $M=32$, 비 0.64 | crop | ★ wiki 권장 (concept) |
| fig04 | outer product와 optimal linear의 간섭 곡선 | crop | ★ wiki 권장 (result) |
| fig05 | activation 다섯 종류의 간섭 곡선 | crop | ★ wiki 권장 (result) |
| fig06 | exponential 급수 절단 비교 | crop | ★ wiki 권장 (result) |
| fig07 | softmax store 막대 그림, $\beta=8$, 비 0.0038 | crop | ★ wiki 권장 (concept) |
| fig08 | long context $\beta$ 스케일 규칙 비교 | crop | ★ wiki 권장 (result) |
