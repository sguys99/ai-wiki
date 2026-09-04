---
title: "03-14. Groot N1.5 - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-groot-n1-5-vla-primer.md
raw_filename: "jo-2026-groot-n1-5-vla-primer.md"
source_collection: external
source: jo-2026-groot-n1-5-vla-primer.md
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
    caption: "GR00T N1의 전체 구조 — frozen Eagle-2 VLM이 이미지·언어를 인코딩하고, robot state와 noised action이 DiT 블록의 cross/self-attention을 거쳐 motor action이 된다. N1.5의 변경점을 짚기 위한 기준 도식 (GR00T N1 논문 Figure 2)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-groot-n1-5-vla-primer/fig02.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig02.png
    caption: "flow matching·diffusion policy만 쓴 경우(위)와 FLARE를 얹은 경우(아래) 비교. FLARE는 action과 함께 future embedding을 내놓아 t+H 시점 future observation의 임베딩에 맞추며, action 라벨이 없는 사람 1인칭 영상에도 같은 손실을 걸 수 있다 (FLARE 논문 Figure 1)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/jo-2026-groot-n1-5-vla-primer/fig03.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig03.png
    caption: "Q-former 기반 vision-language embedding 모듈 — SigLIP-2가 인코딩한 이미지·텍스트 토큰을 self-attention으로 융합하고, 32개 learnable query token이 cross-attention으로 그 정보를 흡수한다 (FLARE 논문 Figure 10)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/jo-2026-groot-n1-5-vla-primer/fig04.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig04.png
    caption: "FLARE 학습 구조 전체 — DiT 입력에 state·noised action과 나란히 future token이 들어가고, 중간 layer I의 future token 출력이 frozen vision-language embedding이 만든 t+H 시점 임베딩과 alignment 손실로 묶인다. 위쪽은 기존 action flow-matching 손실"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/jo-2026-groot-n1-5-vla-primer/fig05.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig05.png
    caption: "fig04의 Layer 1 입력부 확대 — state q_t, noised action A_{t:t+H-1}, future token 세 묶음에 저자가 빨간 테두리를 덧그렸다"
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
    caption: "latent alignment 손실 정의 — DiT가 예측한 future 표현과 t+H 시점 임베딩의 코사인 유사도를 최대화한다 (FLARE 논문 식 2)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-groot-n1-5-vla-primer/fig09.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig09.png
    caption: "DreamGen 개요 — video world model이 초기 프레임 한 장에서 합성 영상을 만들고 pseudo action을 자동 추출한다. 아래 세 칸은 contact-rich 증강·새 행동 일반화·새 환경 일반화 사례 (DreamGen 논문 Figure 1)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-groot-n1-5-vla-primer/fig10.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig10.png
    caption: "DreamGen 4단계 파이프라인 — video world model fine-tuning → rollout → pseudo action 라벨링 → neural trajectory로 visuomotor policy 학습 (DreamGen 논문)"
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
    caption: "pseudo action 라벨링 두 방식 — (a) Inverse Dynamics Model은 s_t와 s_{t+H} 두 프레임을 DiT에 넣어 action chunk를 예측하고, (b) LAPA는 VQ-VAE로 두 프레임의 차이를 latent action으로 부호화한다"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/jo-2026-groot-n1-5-vla-primer/fig13.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig13.png
    caption: "시뮬레이션 벤치마크 성공률 — RoboCasa 30 demos 17.4 → 47.5, Sim GR-1 0-shot 39.6 → 43.9, Sim GR-1 30 demos 43.2 → 47.4"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-groot-n1-5-vla-primer/fig14.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig14.png
    caption: "language following rate 46.6% → 93.3%, overall success rate 43.3% → 83.0%. 본문은 이 수치를 실기기 GR-1 평가 결과로 인용한다"
    strategy: fetched
    curated: true
  - id: fig15
    file: assets/jo-2026-groot-n1-5-vla-primer/fig15.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig15.png
    caption: "pre-training 없이 scratch로 학습했을 때의 벤치마크 — Language table 52.8% → 93.2%, Sim GR-1 Language 36.4% → 54.4%"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-groot-n1-5-vla-primer/fig16.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig16.png
    caption: "실기기 휴머노이드 평가 — 과일 2종 중 지정한 하나를 접시에 담는 과제가 44.0% → 98.8%, 미학습 물체 5종 과제가 84.2%. 셋 다 1K demos 기준"
    strategy: fetched
    curated: true
  - id: fig17
    file: assets/jo-2026-groot-n1-5-vla-primer/fig17.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/fig17.png
    caption: "미학습 물체 10종 일반화 — 0-shot이 0% → 15.0%, 사람 영상으로 FLARE post-training을 거치면 55.0%"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-groot-n1-5-vla-primer/page-full.png
    raw: raw/articles/jo-2026-groot-n1-5-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈 03-14편. 앞 편 [[physical-ai/jo-2026-groot-n1-vla-primer]]에서 다룬 GR00T N1의 dual-system 구조를 그대로 두고, 그 위에 N1.5가 무엇을 얹었는지만 좁혀 읽는다. 축은 둘이다. 자기 action이 만들 미래 장면을 모델 안에서 미리 그려 보게 하는 FLARE, 그리고 video world model로 학습 데이터를 만들어내는 DreamGen이다.

N1.5는 논문 한 편으로 묶여 있지 않다. 이 해설의 참고문헌도 NVIDIA Research 프로젝트 페이지, DreamGen 논문(arXiv 2505.12705), Eagle 2.5 논문(arXiv 2504.15271) 셋으로 흩어져 있다. 세 출처를 한 줄기로 엮어 읽히게 만든 것이 이 페이지의 역할이다.

앞 편과 그림 성격도 다르다. N1 편은 논문 도식에 빨간 테두리를 덧그린 주석판이 절반이었는데, 이 편은 원 도식을 거의 그대로 싣고 결과 장을 표 다섯 개로 채운다. 정성적 서술에 기댔던 앞 편보다 수치가 많다.

## N1에서 무엇이 바뀌었나 (What Changed)

해설이 목록으로 세운 차이는 다섯 가지다.

VLM backbone이 Eagle-2에서 Eagle-2.5로 올라갔다. 공간 이해가 나아졌다는 것이 교체 이유다. 그리고 이 VLM은 pre-training과 fine-tuning 양쪽에서 frozen이다. N1은 fine-tuning 단계에서만 얼렸으니, 학습 내내 언어 능력을 건드리지 않는 쪽으로 기울었다.

vision encoder와 LLM을 잇는 adapter MLP는 단순해졌고, LLM에 들어가는 이미지·텍스트 토큰 임베딩에 layer normalization이 붙었다.

손실에 FLARE가 더해졌다. N1의 DiT는 robot state q_t와 noise가 섞인 action chunk 둘만 self-attention에 태웠는데, N1.5는 여기에 미래 상태를 담을 M개의 learnable 토큰을 함께 넣는다.

pre-training 데이터에는 DreamGen이 만든 neural trajectory와 AgiBot-Beta가 들어왔다.

## FLARE — 행동의 결과를 미리 그려 본다

FLARE는 Future LAtent Representation Alignment의 약어다. policy 학습 안에 latent-space world modeling을 끼워 넣는 방식인데, latent-space world modeling은 환경을 핵심 특징만 남긴 압축 공간으로 옮긴 뒤 그 안에서 자기 action의 결과를 시뮬레이션해 물리적 인과를 배우는 기술을 가리킨다. 지금 보이는 것에만 반응하는 대신 조금 뒤의 장면을 예상하고 움직이게 하려는 장치다.

![[assets/jo-2026-groot-n1-5-vla-primer/fig02.png]]
*Figure: flow matching·diffusion policy만 쓴 경우(위)와 FLARE를 얹은 경우(아래). FLARE는 action과 함께 future embedding을 내놓아 t+H 시점 future observation의 임베딩에 맞춘다. 아래 두 번째 줄이 사람 1인칭 영상인데, action 라벨이 없어도 alignment 항 하나만으로 학습에 낄 수 있다 (FLARE 논문 Figure 1)*

해설이 꼽은 장점은 세 가지다. 기존 VLA 구조를 거의 건드리지 않고 토큰만 더하면 되니 확장이 쉽다. 미래를 미리 예측하고 실제 결과에 맞춰 보는 과정에서 조작이 정밀해진다. 그리고 action 라벨이 없는 사람 1인칭 영상까지 학습에 끌어들일 수 있어 데이터 효율이 올라간다.

### Q-former로 observation을 32개 토큰으로

![[assets/jo-2026-groot-n1-5-vla-primer/fig03.png]]
*Figure: Q-former 기반 vision-language embedding 모듈. 왼쪽에서 SigLIP-2가 인코딩한 이미지·텍스트 토큰이 self-attention으로 융합되고, 오른쪽 32개 learnable query token이 cross-attention으로 그 정보를 흡수한다 (FLARE 논문 Figure 10)*

SigLIP-2가 이미지 256 토큰과 텍스트 32 토큰을 인코딩하고, 4개의 self-attention Transformer 블록을 지나 288 토큰으로 융합된다. 여기에 Q-former를 걸면 32개의 learnable query token이 self-attention과 cross-attention을 거쳐 288 토큰의 정보를 대신 담는다.

N1이 Eagle VLM 출력을 그대로 썼다면 N1.5는 이 32 토큰만 쓴다. 도식은 FLARE 논문에서 온 것이라 SigLIP-2로 그려져 있는데, 실제 N1.5 학습에서는 그 자리에 Eagle-2.5가 들어간다는 단서가 붙는다.

### DiT 안의 future token

![[assets/jo-2026-groot-n1-5-vla-primer/fig04.png]]
*Figure: FLARE 학습 구조 전체. DiT 입력에 state·noised action과 나란히 future token이 들어가고(맨 아래), 중간 layer I의 future token 출력이 frozen vision-language embedding이 만든 t+H 시점 임베딩과 alignment 손실로 묶인다(오른쪽 점선). 위쪽은 기존 action flow-matching 손실*

future token은 처음에는 아무 의미가 없다. self-attention을 거치며 미래 상태 정보를 담는 그릇이 된다. Q-former로 압축된 current observation은 cross-attention으로 들어오는데, 이때 이미지는 q_t와 같은 t 시점에서 샘플링한다.

핵심은 그다음이다. self-attention을 지난 M개의 future token을, t+H 시점 future observation을 넣어 얻은 임베딩과 나란히 놓고 코사인 유사도를 최대화한다. 비교 지점이 마지막 layer가 아니라 중간 layer L이라는 게 이 방식의 특징이다. 앞쪽 layer는 정보가 덜 쌓였고 뒤쪽 layer는 지금 당장의 동작을 정하는 데 집중하기 때문이다. 8개 layer 중 6번째가 가장 좋았다. DiT 출력과 비교 대상의 차원이 다를 수 있어 MLP를 한 번 태워 같은 공간으로 옮기는 절차도 들어간다.

최종 손실은 N1의 flow matching 손실에 이 alignment 항을 λ 가중치로 더한 형태다. λ=0.2가 가장 나았다.

## DreamGen — 데이터를 만들어내는 파이프라인

로봇 학습의 병목은 사람이 teleoperation으로 시연을 모아야 한다는 비용이다. DreamGen은 video world model로 이를 우회한다. 실제 로봇이 움직이는 것처럼 보이는 합성 영상을 만들고 이를 neural trajectory라 부른다.

![[assets/jo-2026-groot-n1-5-vla-primer/fig10.png]]
*Figure: DreamGen 4단계 파이프라인. video world model fine-tuning → rollout → pseudo action 라벨링 → neural trajectory로 visuomotor policy 학습 (DreamGen 논문)*

1단계는 video world model을 실제 teleoperation trajectory에 fine-tuning하는 것이다. WAN2.1·CogVideoX·Hunyuan·Cosmos 같은 모델 전체를 다시 학습시키지 않고 LoRA로 일부만 학습시킨다. 학습 데이터에 카메라 시점이 여러 개 섞여 있으면 2x2 grid 한 장으로 합쳐 한 영상처럼 다룬다.

2단계 rollout에서는 로봇이 처한 상황을 담은 실제 사진 한 장과 언어 지시를 넣으면 합성 영상이 나온다. 시뮬레이터에서 대상 물체와 환경 위치를 무작위화하며 증강하는 과정을 함께 거친다.

3단계에서 라벨을 붙인다. 생성된 영상에는 action 라벨이 없으니 두 방법 중 하나를 쓴다.

![[assets/jo-2026-groot-n1-5-vla-primer/fig12.png]]
*Figure: pseudo action 라벨링 두 방식. (a) Inverse Dynamics Model은 s_t와 s_{t+H} 두 프레임을 DiT에 넣어 그 사이 action chunk를 예측하고, (b) LAPA는 VQ-VAE로 두 프레임의 차이를 latent action으로 부호화한다*

Inverse Dynamics Model은 DiT와 SigLIP-2 vision encoder를 써서 두 프레임만 보고 그 사이를 채울 action chunk를 예측한다. robot state 없이 이미지 변화만으로 동작을 뽑는 게 특징이고, 학습 후에는 sliding window로 영상 전체를 한 프레임씩 밀며 연속 라벨을 만든다. Latent Action Model은 VQ-VAE 구조로 두 프레임의 시각적 차이를 latent action 벡터로 바꾸고 그 벡터 자체를 라벨로 삼는다. 후자는 앞 편 N1 해설에서 latent action space를 설명할 때 이미 나온 방식이다.

4단계는 이렇게 만든 neural trajectory로 visuomotor policy를 학습하는 단계다. neural trajectory에는 robot state가 없어 상태 입력을 0으로 조건화한다. N1.5 학습에서는 합성 데이터와 실제 데이터를 함께 쓰되, 두 유형을 별도의 action encoder·decoder 경로로 나눠 처리한다.

해설이 DreamGen의 값을 데이터 증강이 아니라 일반화에서 찾는 대목이 결론이다. 연구실 데이터로만 학습한 policy가 주방·사무실 등 처음 보는 10개 환경에서 28.5% 성공률을 냈다. 행동 쪽은 학습에 없던 동사가 기준인데, pour·iron·water 같은 12개 새 지시에서 N1은 13.1%에 그쳤지만 N1.5는 38.3%를 냈다.

## 결과 (Results)

![[assets/jo-2026-groot-n1-5-vla-primer/fig13.png]]
*Figure: 시뮬레이션 벤치마크 성공률. RoboCasa 30 demos 17.4 → 47.5, Sim GR-1 0-shot 39.6 → 43.9, Sim GR-1 30 demos 43.2 → 47.4*

RoboCasa에서의 2.7배가 가장 크게 벌어진 항목이다. pre-training 없이 scratch로 학습했을 때의 표도 따로 붙는데, Language table 52.8% → 93.2%, Sim GR-1 Language 36.4% → 54.4%로 언어 조건이 붙은 과제에서 특히 차이가 난다.

![[assets/jo-2026-groot-n1-5-vla-primer/fig14.png]]
*Figure: language following rate 46.6% → 93.3%, overall success rate 43.3% → 83.0%. 본문은 이 수치를 실기기 GR-1 평가 결과로 인용한다*

해설은 93.3%를 "과일 두 개 중 지정한 하나를 골라 접시에 담는" 수준의 세밀한 지시를 거의 다 알아듣는다는 뜻으로 읽고, VLM을 학습 내내 frozen으로 둔 결정이 언어 이해력을 지키는 데 효과가 있었다는 근거로 삼는다.

![[assets/jo-2026-groot-n1-5-vla-primer/fig16.png]]
*Figure: 실기기 휴머노이드 평가. 과일 2종 중 지정한 하나를 접시에 담는 과제가 44.0% → 98.8%, 미학습 물체 5종 과제가 84.2%. 셋 다 1K demos 기준*

일반화는 두 축이다. 학습에 없던 물체 10종에 대해 0-shot이 0%에서 15.0%로 올랐고, 사람 영상으로 FLARE post-training을 거치면 55.0%가 된다. 하드웨어 전이도 함께 든다. GR-1 데이터로 pre-training한 모델을 Unitree G1에 post-training해 붙였을 때 미학습 물체에서 84.2%가 나왔다.

표를 옮길 때 주의할 지점이 하나 있다. 원문에서 실기기 GR-1 수치는 시뮬레이션 절 아래에, scratch 학습 벤치마크는 실기기 절 아래에 놓여 있다. 표 안의 행 이름과 본문이 인용하는 수치를 맞춰 보면 두 그림의 자리가 서로 바뀐 것으로 보인다.

## 한계 (Limitations)

해설이 옮긴 한계는 세 가지다. 완전히 새로운 행동과 환경으로의 일반화는 여전히 열려 있다. N1에서 지적됐던 long-horizon loco-manipulation 능력도 N1.5에서 크게 달라지지 않았다. 예측하기 어려운 실제 환경에서의 robustness도 계속 손봐야 한다.

DreamGen 쪽 한계는 더 구체적이다. 생성 모델은 물리 엔진처럼 뉴턴 법칙을 계산해 프레임을 만드는 게 아니라서, 미세한 조작 장면에서 시각적 왜곡이나 물리적 불일치가 생길 수 있다. 물리 법칙을 지키면서 반사실적 다양성까지 확보하는 문제가 남는다.

해설 자체의 빈틈도 있다. Eagle-2.5가 왜 공간 이해에서 나은지는 참고문헌 링크로만 넘긴다. VLM을 pre-training 단계에서까지 frozen으로 바꾼 결정의 근거도 결과만 있고 ablation은 없다. λ=0.2와 6번째 layer라는 두 하이퍼파라미터 역시 결론만 옮긴다. Inverse Dynamics Model과 Latent Action Model 중 무엇을 언제 쓰는지도 나오지 않고, AgiBot-Beta는 데이터 목록에 이름만 등장한다. 모델 파라미터 규모·action chunk 길이·학습 인프라 같은 수치도 없다.

## 관련 페이지 (Related Pages)

- [[physical-ai/jo-2026-groot-n1-vla-primer]] — 같은 시리즈 03-13편이자 이 편의 전제. dual-system 구조, flow matching 손실과 추론, data pyramid와 latent action space가 그쪽에 있다. 먼저 읽어야 이 편의 "무엇이 바뀌었나"가 읽힌다.
- [[physical-ai/nvidia-2025-gr00t-n1-an-open-foundation]] — N1 원 논문. 이 편이 기준선으로 삼는 구조의 정량 결과와 데이터 생성 절차가 있다.
- [[physical-ai/nvidia-2025-gr00t-n1-5-an-improved-open]] — NVIDIA GEAR의 N1.5 공식 프로젝트 페이지. 이 해설이 참고문헌 첫 줄로 드는 원 출처다. 수치를 인용할 일이 있으면 그쪽을 함께 본다.
- [[llms/chen-2025-eagle-25-boosting-long-context-post-training]] — N1.5가 backbone으로 갈아탄 VLM의 원 논문. 공간 이해가 나아졌다는 이 편의 한 문장 뒤에 무엇이 있는지 확인할 수 있다.
- [[llms/nvlabs-eagle]] — Eagle 계열 공식 저장소. Eagle 2→N1, Eagle 2.5→N1.5, native resolution 변형→N1.6으로 이어지는 backbone 채택 이력이 날짜로 기록돼 있다.
- [[physical-ai/hou-2026-world-model-for-robot-learning]] — world model 서베이. FLARE를 latent-space world modeling 갈래로, DreamGen을 imagination-based 갈래로 분류하고 DreamGen Bench를 open-loop 예측 품질 평가 항목으로 든다. 이 편의 두 축이 더 큰 지형에서 어디 놓이는지 보인다.
- [[physical-ai/nvidia-2025-cosmos-world-foundation-model-platform]] — DreamGen 1단계에서 fine-tuning 대상으로 이름이 오르는 world foundation model.
- [[physical-ai/nvidia-isaac-gr00t]] — GR00T 공식 저장소(현재 N1.7). N1.5 이후 세대의 코드와 배포 스택이 있다.
- [[physical-ai/nvlabs-gr00t-wholebodycontrol]] — N1.5가 짝을 이뤘던 Decoupled WBC 컨트롤러 구현. 팔·손 policy와 몸통·다리 컨트롤러가 어떻게 나뉘는지 확인할 수 있다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 기준·학습 경로 허브.
