---
title: "03-14. Groot N1.5 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-groot-n1-5-vla-primer.md
raw_filename: "jo-2026-groot-n1-5-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366380"
publisher: "wikidocs.net"
fetched_at: "2026-09-04T09:51:17+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, world-model, humanoid, robot-learning]
figures:
  - id: fig01
    file: assets/jo-2026-groot-n1-5-vla-primer/fig01.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig01.png
    caption: "GR00T N1의 전체 구조. frozen Eagle-2 VLM이 이미지와 언어를 인코딩하고, robot state와 noised action이 DiT 블록의 cross/self-attention을 거쳐 motor action이 된다. N1.5의 변경점을 짚기 위한 기준 도식 (GR00T N1 논문 Figure 2)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-groot-n1-5-vla-primer/fig02.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig02.png
    caption: "flow matching과 diffusion policy만 쓴 경우(위)와 FLARE를 결합한 경우(아래) 비교. FLARE는 action과 함께 future embedding을 내놓아 t+H 시점 future observation의 임베딩에 맞추며, action 라벨이 없는 사람 1인칭 영상에도 같은 손실을 걸 수 있다 (FLARE 논문 Figure 1)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/jo-2026-groot-n1-5-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig03.png
    caption: "Q-former 기반 vision-language embedding 모듈. SigLIP-2가 인코딩한 이미지와 텍스트 토큰을 self-attention으로 융합하고, 32개 learnable query token이 cross-attention으로 그 정보를 흡수한다 (FLARE 논문 Figure 10)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-groot-n1-5-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig04.png
    caption: "FLARE 학습 구조 전체. DiT 입력에 state, noised action과 나란히 future token이 들어가고, 중간 layer I의 future token 출력이 frozen vision-language embedding이 만든 t+H 시점 임베딩과 alignment 손실로 묶인다. 위쪽은 기존 action flow-matching 손실"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-groot-n1-5-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig05.png
    caption: "fig04의 Layer 1 입력부 확대. state q_t, noised action A_{t:t+H-1}, future token 세 묶음에 저자가 빨간 테두리를 덧그렸다"
    strategy: fetched
    curated: false
  - id: fig06
    file: assets/jo-2026-groot-n1-5-vla-primer/fig06.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig06.png
    caption: "fig04에서 current observation이 cross-attention으로 들어오는 경로를 빨간 테두리로 표시. 입력 이미지는 q_t와 같은 t 시점에서 샘플링한다"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-groot-n1-5-vla-primer/fig07.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig07.png
    caption: "fig04에서 future latent alignment 경로를 빨간 테두리로 표시. 중간 layer의 future token 출력이 t+H 시점 future observation 임베딩과 비교된다"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-groot-n1-5-vla-primer/fig08.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig08.png
    caption: "latent alignment 손실 정의. DiT가 예측한 future 표현과 t+H 시점 임베딩의 코사인 유사도를 최대화한다 (FLARE 논문 식 2)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-groot-n1-5-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig09.png
    caption: "DreamGen 개요. video world model이 초기 프레임 한 장에서 합성 영상을 만들고 pseudo action을 자동 추출한다. 아래 세 칸은 contact-rich 증강과 새 행동 일반화, 새 환경 일반화 사례 (DreamGen 논문 Figure 1)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-groot-n1-5-vla-primer/fig10.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig10.png
    caption: "DreamGen 4단계 파이프라인. video world model fine-tuning → rollout → pseudo action 라벨링 → neural trajectory로 visuomotor policy 학습 (DreamGen 논문)"
    strategy: fetched
    curated: true
  - id: fig11
    file: assets/jo-2026-groot-n1-5-vla-primer/fig11.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig11.png
    caption: "여러 카메라 시점을 2x2 grid 한 장으로 합쳐 학습시키는 방식. 위가 RoboCasa, 아래가 DROID trajectory (DreamGen 논문 Figure 10)"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-groot-n1-5-vla-primer/fig12.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig12.png
    caption: "pseudo action 라벨링 두 방식. (a) Inverse Dynamics Model은 s_t와 s_{t+H} 두 프레임을 DiT에 넣어 action chunk를 예측하고, (b) LAPA는 VQ-VAE로 두 프레임의 차이를 latent action으로 부호화한다"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/jo-2026-groot-n1-5-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig13.png
    caption: "시뮬레이션 벤치마크 성공률. RoboCasa 30 demos 17.4 → 47.5, Sim GR-1 0-shot 39.6 → 43.9, Sim GR-1 30 demos 43.2 → 47.4"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-groot-n1-5-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig14.png
    caption: "language following rate 46.6% → 93.3%, overall success rate 43.3% → 83.0%. 본문은 이 수치를 실제 기기 GR-1 평가 결과로 인용한다"
    strategy: fetched
    curated: true
  - id: fig15
    file: assets/jo-2026-groot-n1-5-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig15.png
    caption: "pre-training 없이 scratch로 학습했을 때의 벤치마크. Language table 52.8% → 93.2%, Sim GR-1 Language 36.4% → 54.4%"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-groot-n1-5-vla-primer/fig16.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig16.png
    caption: "실제 기기 휴머노이드 평가. 과일 2종 중 지정한 하나를 접시에 담는 과제가 44.0% → 98.8%, 미학습 물체 5종 과제가 84.2%. 셋 다 1,000 demos 기준"
    strategy: fetched
    curated: true
  - id: fig17
    file: assets/jo-2026-groot-n1-5-vla-primer/fig17.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig17.png
    caption: "미학습 물체 10종 일반화. 0-shot이 0% → 15.0%, 사람 영상으로 FLARE post-training을 거치면 55.0%"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-groot-n1-5-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

GR00T N1.5를 처음 보는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-14편으로, 앞 편에서 다룬 N1의 구조를 그대로 두고 그 위에 무엇이 더해졌는지만 좁혀 읽는다. 핵심 요소는 두 가지다. 자기 action이 만들 미래 장면을 모델 안에서 미리 그려 보게 하는 FLARE, 그리고 video world model로 학습 데이터를 합성하는 DreamGen이다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈)
- URL: https://wikidocs.net/366380
- 형식: 온라인 강의 챕터 (03-14편)
- 성격: NVIDIA GEAR의 GR00T N1.5 발표와 그 근거 논문 두 편(FLARE, DreamGen)을 묶어 옮긴 한국어 해설. 앞 편 [[physical-ai/jo-2026-groot-n1-vla-primer]]를 읽었다는 전제로 쓰였고, 실제로 N1 편 링크를 본문에서 두 번 건다.

앞 편과 그림 성격이 다르다. N1 편은 같은 논문 도식에 빨간 테두리를 덧그린 주석판이 절반이었는데, 이 편은 원 도식을 거의 그대로 싣는다. 주석판은 FLARE 구조도(fig04)를 세 번 반복하며 입력부와 cross-attention, alignment 경로를 차례로 짚는 대목뿐이다. 대신 결과 장이 표 다섯 개로 채워져 있어 N1 편보다 정량적이다.

N1.5의 공식 문헌이 논문 한 편으로 묶여 있지 않다는 점도 성격을 갈라놓는다. 참고문헌은 NVIDIA Research 프로젝트 페이지, DreamGen 논문(arXiv 2505.12705), Eagle 2.5 논문(arXiv 2504.15271) 셋이다. 해설이 세 출처를 한 줄기로 엮는 역할을 겸한다.

## 2. 주요 기여 (Key Contributions)

해설이 잡은 항목은 세 가지다.

N1과 N1.5의 차이를 목록으로 먼저 세운다. VLM backbone이 Eagle-2에서 Eagle-2.5로 올라갔고, VLM은 pre-training과 fine-tuning 양쪽에서 frozen이다. N1에서는 fine-tuning 단계에서만 얼렸다. vision encoder와 LLM을 잇는 adapter MLP는 단순해졌고 LLM에 들어가는 토큰 임베딩에 layer normalization이 붙었다. 손실에는 FLARE가 추가됐고, pre-training 데이터에는 DreamGen이 만든 neural trajectory와 AgiBot-Beta가 들어왔다.

FLARE를 "행동의 결과를 미리 상상한다"는 한 문장으로 요약하고 작동 순서를 두 단계로 나눠 푼다. Q-former로 observation을 32개 토큰으로 압축하는 앞단, 그리고 DiT 안에서 future token을 미래 임베딩에 맞추는 뒷단이다. 중간 layer를 쓰는 이유와 코사인 유사도 식의 기호를 하나씩 옮기는 대목이 이 해설에서 가장 공들인 부분이다.

DreamGen을 4단계 파이프라인으로 정리한다. video world model fine-tuning, rollout, pseudo action 라벨링, neural trajectory로 policy 학습 순이다. 데이터 증강이 아니라 일반화 장치라는 점을 결론으로 못박고, 환경 일반화 28.5%와 행동 일반화 38.3%를 근거로 든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### FLARE

FLARE는 Future LAtent Representation Alignment의 약어다. policy 학습 안에 latent-space world modeling을 삽입하는 방식인데, latent-space world modeling은 환경을 핵심 특징만 남긴 압축 공간으로 옮긴 뒤 그 안에서 자기 action의 결과를 시뮬레이션해 물리적 인과를 배우는 기술을 가리킨다. 해설은 FLARE의 장점으로 세 가지를 든다. 기존 VLA 구조를 거의 건드리지 않고 토큰만 더하면 되는 확장성, 미래를 미리 예측하고 실제 결과에 맞춰 보는 데서 오는 조작 정밀도, 그리고 action 라벨이 없는 사람 1인칭 영상까지 학습에 끌어들일 수 있다는 데이터 효율이다.

앞단은 Q-former다. SigLIP-2가 이미지 256 토큰과 텍스트 32 토큰을 인코딩하고, 4개의 self-attention Transformer 블록을 지나 288 토큰으로 융합된다. 여기에 Q-former를 걸면 32개의 learnable query token이 self-attention과 cross-attention을 거쳐 288 토큰의 정보를 대신 담는다. N1이 Eagle VLM 출력을 그대로 썼다면 N1.5는 이 32 토큰만 쓴다. 해설은 이 그림이 FLARE 논문에서 나온 것이고 실제 N1.5 학습에서는 SigLIP-2 자리에 Eagle-2.5가 들어간다는 단서를 붙인다.

뒷단은 DiT 안에서 일어난다. N1의 DiT 입력은 robot state q_t와 noise가 섞인 action chunk 둘이었다. N1.5는 여기에 M개의 learnable future token 임베딩을 더한다. future token은 처음에는 아무 의미가 없다가 self-attention을 거치며 미래 상태 정보를 담는 그릇이 된다. Q-former로 압축된 current observation은 cross-attention으로 들어오고, 이때 이미지는 q_t와 같은 t 시점에서 샘플링한다.

핵심은 그다음이다. self-attention을 지난 M개의 future token을, t+H 시점 future observation을 넣어 얻은 임베딩과 나란히 놓고 코사인 유사도를 최대화한다. 비교 지점은 마지막 layer가 아니라 중간 layer L이다. 앞쪽 layer는 정보가 덜 쌓였고 뒤쪽 layer는 지금 당장의 동작을 정하는 데 집중하기 때문이라는 게 이유다. 8개 layer 중 6번째가 가장 좋았다. DiT 출력과 비교 대상의 차원이 다를 수 있어 MLP를 한 번 태워 같은 공간으로 옮기는 절차도 들어간다. 최종 손실은 N1의 flow matching 손실에 이 alignment 항을 λ 가중치로 더한 형태이고, λ=0.2가 가장 나았다.

### DreamGen

DreamGen은 사람이 teleoperation으로 데이터를 모아야 한다는 비용 문제를 video world model로 우회한다. 실제 로봇이 움직이는 것처럼 보이는 합성 영상을 만들고 이를 neural trajectory라 부른다.

1단계는 video world model fine-tuning이다. 사람이 teleoperation으로 만든 실제 trajectory에 WAN2.1과 CogVideoX, Hunyuan, Cosmos 같은 world model을 맞춘다. 전체를 다시 학습시키지 않고 LoRA로 일부만 학습시킨다. 학습 데이터에 카메라 시점이 여러 개 섞여 있으면 2x2 grid 한 장으로 합쳐 한 영상처럼 다룬다.

2단계는 rollout이다. 로봇이 처한 상황을 담은 실제 사진 한 장과 언어 지시를 주면 합성 영상이 나온다. 시뮬레이터에서 대상 물체와 환경 위치를 무작위화하며 증강하는 과정을 함께 거친다.

3단계는 pseudo action 라벨링이다. 생성된 영상에는 action 라벨이 없으니 두 가지 방법 중 하나로 만들어 붙인다. Inverse Dynamics Model은 DiT와 SigLIP-2 vision encoder를 써서 현재 프레임 s_t와 미래 프레임 s_{t+h} 두 장만 보고 그 사이를 채울 action chunk를 예측한다. robot state 없이 이미지 변화만으로 동작을 뽑는 게 특징이고, 학습 후에는 sliding window로 영상 전체를 한 프레임씩 밀며 연속 라벨을 만든다. Latent Action Model은 VQ-VAE 구조로 두 프레임의 시각적 차이를 latent action 벡터로 바꾸고 그 벡터 자체를 라벨로 삼는다.

4단계는 이렇게 만든 neural trajectory로 visuomotor policy를 학습하는 단계다. neural trajectory에는 robot state가 없어 상태 정보를 0으로 조건화한다. N1.5 학습에서는 합성 데이터와 실제 데이터를 함께 쓰되 두 유형을 별도의 action encoder와 decoder 경로로 나눠 처리한다.

해설이 DreamGen의 값을 데이터 증강이 아니라 일반화에서 찾는 대목이 결론이다. 연구실 데이터로만 학습한 policy가 주방과 사무실 등 처음 보는 10개 환경에서 28.5% 성공률을 냈다는 게 환경 쪽 근거다. 행동 쪽은 학습에 없던 동사다. pour, iron, water 같은 12개 새 지시에서 N1은 13.1%에 그쳤지만 N1.5는 38.3%를 냈다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

해설은 결과를 표 다섯 장으로 옮긴다.

시뮬레이션에서는 RoboCasa 30 demos가 17.4에서 47.5로, Sim GR-1 0-shot이 39.6에서 43.9로, Sim GR-1 30 demos가 43.2에서 47.4로 올랐다. 여기에 pre-training 없이 scratch로 학습했을 때의 표가 따로 붙어 Language table 52.8% → 93.2%, Sim GR-1 Language 36.4% → 54.4%를 보인다.

실제 기기 GR-1 평가에서는 language following rate가 46.6%에서 93.3%로, overall success rate가 43.3%에서 83.0%로 올랐다. 해설은 93.3%를 "과일 두 개 중 지정한 하나를 골라 접시에 담는" 수준의 세밀한 지시를 거의 완벽하게 알아듣는다는 뜻으로 읽고, frozen VLM 전략이 언어 이해력을 지키는 데 효과가 있었다는 근거로 삼는다.

일반화는 두 항목이다. 학습에 없던 물체 10종에 대해 0-shot이 0%에서 15.0%로 올랐고, 사람 영상으로 FLARE post-training을 거치면 55.0%가 된다. 하드웨어 전이도 함께 든다. GR-1 데이터로 pre-training한 모델을 Unitree G1에 post-training해 붙였을 때 미학습 물체에서 84.2%가 나왔다. 같은 표의 과일 과제는 N1 44.0%에서 N1.5 98.8%로 벌어진다.

표를 그대로 옮길 때 주의할 지점이 하나 있다. 원문에서 실제 기기 GR-1 수치(fig14)는 시뮬레이션 절 아래에, scratch 학습 벤치마크(fig15)는 실제 기기 절 아래에 놓여 있다. 표 안의 행 이름과 본문이 인용하는 수치를 맞춰 보면 두 그림의 자리가 서로 바뀐 것으로 보인다.

수치의 출처 범위도 좁다. RoboCasa와 Sim GR-1 외의 시뮬레이션 벤치마크, 모델 파라미터 규모, action chunk 길이, 학습 인프라는 이 해설에 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

해설이 옮긴 한계는 세 가지다. 완전히 새로운 행동과 환경으로의 일반화는 여전히 열려 있고, N1에서 지적됐던 long-horizon loco-manipulation 능력도 N1.5에서 크게 달라지지 않았으며, 예측하기 어려운 실제 환경에서의 robustness도 계속 손봐야 한다. DreamGen 쪽 한계는 더 구체적이다. 생성 모델은 물리 엔진처럼 뉴턴 법칙을 계산해 프레임을 만드는 게 아니라서, 미세한 조작 장면에서 시각적 왜곡이나 물리적 불일치가 생길 수 있다.

해설 자체의 빈틈도 있다. Eagle-2.5가 왜 공간 이해에서 나은지는 참고문헌 링크로만 넘기고 다루지 않는다. VLM을 pre-training 단계에서까지 frozen으로 바꾼 결정의 근거도 결과만 있고 ablation은 없다. λ=0.2와 6번째 layer라는 두 하이퍼파라미터 역시 결론만 옮긴다. Inverse Dynamics Model과 Latent Action Model 중 무엇을 언제 쓰는지, 둘을 어떻게 나눠 적용했는지도 나오지 않는다. AgiBot-Beta는 데이터 목록에 이름만 등장한다.

## 6. 관련 연구 (Related Work)

- GR00T N1(NVIDIA 2025): 이 편이 차이만 서술하는 기준선. 구조 전체는 앞 편 해설과 원 논문 페이지에 있다.
- FLARE: N1.5의 alignment 손실이 나온 곳. 본문 도식 다수가 이 논문에서 왔다. world model 서베이는 이 방식을 latent-space world modeling 가지로 분류한다.
- DreamGen(Zhu 2025, arXiv 2505.12705): neural trajectory 합성 파이프라인. 같은 서베이에서 imagination-based 가지로 묶이고, DreamGen Bench는 open-loop 예측 품질 평가 항목으로도 인용된다.
- Eagle 2.5(Chen 2025, arXiv 2504.15271): 교체된 VLM backbone의 원 논문.
- LAPA: pseudo action 라벨링의 한 가지 방법. 앞 편 N1 해설에서 latent action space를 설명할 때 이미 나온 방식이다.
- Cosmos(NVIDIA 2025): DreamGen 1단계에서 fine-tuning 대상으로 이름이 오르는 world foundation model 중 하나.

## 7. 용어집 (Glossary)

- FLARE (Future LAtent Representation Alignment): DiT 입력에 learnable future token을 더하고, 그 중간 layer 출력을 t+H 시점 future observation의 임베딩과 코사인 유사도로 묶는 학습 방식. flow matching 손실에 λ=0.2로 더해진다.
- future token: DiT 입력 시퀀스에 새로 들어간 M개의 learnable 임베딩. 초기값에는 의미가 없고 self-attention을 거치며 미래 상태를 담는 자리로 학습된다.
- Q-former: 32개의 learnable query token이 self-attention과 cross-attention으로 288개 융합 토큰의 정보를 흡수해 대신하는 압축 모듈. N1.5는 VLM 출력을 이 32 토큰으로 줄여 쓴다.
- DreamGen: video world model을 fine-tuning해 합성 로봇 영상을 만들고 pseudo action을 붙여 학습 데이터로 쓰는 4단계 파이프라인.
- neural trajectory: DreamGen이 만들어낸 합성 trajectory. robot state가 없어 상태 입력을 0으로 조건화해 쓴다.
- pseudo action label: action 라벨이 없는 생성 영상에 Inverse Dynamics Model이나 Latent Action Model로 사후에 붙이는 action 라벨.
- Inverse Dynamics Model (IDM): 두 프레임 s_t와 s_{t+h}만 보고 그 사이 action chunk를 예측하도록 학습한 DiT 기반 모델. robot state를 쓰지 않는다.
- 환경 일반화 / 행동 일반화: DreamGen의 값을 재는 두 항목. 전자는 처음 보는 장소에서의 성공률(28.5%), 후자는 학습에 없던 동사 지시에서의 성공률(38.3%)이다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | GR00T N1 전체 구조 (N1 논문 Figure 2), N1.5 변경점의 기준선 | fetched | (확인 필요, N1 페이지에 이미 있음) |
| fig02 | flow matching only vs FLARE 비교 (FLARE 논문 Figure 1) | fetched | ★ wiki 권장 (method) |
| fig03 | Q-former 기반 vision-language embedding 모듈 (FLARE 논문 Figure 10) | fetched | ★ wiki 권장 (architecture) |
| fig04 | FLARE 학습 구조 전체, future token과 alignment 손실 | fetched | ★ wiki 권장 (architecture) |
| fig05 | fig04 Layer 1 입력부 확대 (주석판) | fetched | (선택) |
| fig06 | fig04 current observation cross-attention 경로 (주석판) | fetched | (선택) |
| fig07 | fig04 future latent alignment 경로 (주석판) | fetched | (선택) |
| fig08 | latent alignment 손실 식 (FLARE 논문 식 2) | fetched | (선택) |
| fig09 | DreamGen 개요와 일반화 항목 3가지 (DreamGen 논문 Figure 1) | fetched | (선택) |
| fig10 | DreamGen 4단계 파이프라인 | fetched | ★ wiki 권장 (method) |
| fig11 | 멀티뷰 2x2 grid 학습 예시 (RoboCasa와 DROID) | fetched | (아카이브) |
| fig12 | IDM과 LAPA 구조 비교 | fetched | ★ wiki 권장 (method) |
| fig13 | 시뮬레이션 벤치마크 표 | fetched | ★ wiki 권장 (result) |
| fig14 | 실제 기기 language following / overall success rate | fetched | ★ wiki 권장 (result) |
| fig15 | scratch 학습 벤치마크 표 | fetched | (선택) |
| fig16 | 실제 기기 휴머노이드 3열 비교 (44.0 / 98.8 / 84.2) | fetched | ★ wiki 권장 (result) |
| fig17 | 미학습 물체 10종 일반화 (0-shot 15.0 / FLARE 55.0) | fetched | (선택) |
| fig18 | 전체 페이지 스크린샷 | screenshot | (아카이브) |

> 본문 이미지 20장 중 3장은 높이 200px 미만이라 수집 필터에 걸려 빠졌다. 중간 layer 선택 설명 그림 1장과 FLARE 최종 손실 식 2장으로, 모두 수식 스트립이다.
