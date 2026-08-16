---
title: "03-06. OpenVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-openvla-vla-primer.md
raw_path: raw/articles/jo-2026-openvla-vla-primer.md
raw_filename: "jo-2026-openvla-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366372"
publisher: "WikiDocs"
tags: [physical-ai, vla, robot-learning, manipulation, robot-dataset]
figures:
  - id: fig01
    file: assets/jo-2026-openvla-vla-primer/fig01.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig01.png
    caption: "OpenVLA 등장 배경 — Gato·RT-1·RT-2로 이어진 흐름 위에서 OpenVLA의 위치"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-openvla-vla-primer/fig02.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig02.png
    caption: "OpenVLA 모델 개요"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-openvla-vla-primer/fig03.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig03.png
    caption: "Open X-Embodiment 데이터 수집 환경 6곳 — UC Berkeley RAIL·AUTOLab, Freiburg AiS, NYU CILVR, Stanford IRIS, USC CLVR"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-openvla-vla-primer/fig04.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig04.png
    caption: "단일 이미지와 자연어 지시 입력 예시"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-openvla-vla-primer/fig05.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig05.png
    caption: "OpenVLA 전체 구조 — 입력 이미지가 DINOv2·SigLIP를 함께 통과하고 MLP projector를 거쳐 Llama 2 7B로 들어가 action token을 만든 뒤 de-tokenize돼 7차원 로봇 action이 된다 (paper Figure 1)"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-openvla-vla-primer/fig06.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig06.png
    caption: "fused vision encoder 부분 확대 (fig05의 ① 영역)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-openvla-vla-primer/fig07.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig07.png
    caption: "MLP projector 부분 확대 (fig05의 ② 영역)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-openvla-vla-primer/fig08.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig08.png
    caption: "Llama 2 7B backbone 부분 확대 (fig05의 ③ 영역)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-openvla-vla-primer/fig09.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig09.png
    caption: "BridgeData V2 WidowX 평가 — 평균 70.6%로 RT-2-X 50.6·Octo 20.0·RT-1-X 18.5를 앞서고, semantic generalization(36.3 vs 38.8)만 RT-2-X에 뒤진다 (paper Figure 3)"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/jo-2026-openvla-vla-primer/fig10.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig10.png
    caption: "Google robot 평가 — 평균 85.0%로 RT-2-X 78.3과 비슷한 수준, OOD generalization은 82.9로 동률 (paper Figure 4)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-openvla-vla-primer/fig11.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig11.png
    caption: "새 로봇 환경 적응 — Franka-Tabletop·Franka-DROID 7개 과제에서 OpenVLA 평균 63.8%. 좁은 단일 지시 과제는 Diffusion Policy가 강하고 여러 물체·지시가 섞인 과제에서 OpenVLA가 앞선다 (paper Figure 5)"
    strategy: fetched
    curated: true
  - id: fig12
    file: assets/jo-2026-openvla-vla-primer/fig12.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig12.png
    caption: "fine-tuning 전략 비교표 — LoRA rank 32가 68.2±7.5%로 full fine-tuning 69.7±7.2%에 근접하면서 학습 파라미터 97.6M·VRAM 59.7GB에 그친다"
    strategy: fetched
    curated: true
  - id: fig13
    file: assets/jo-2026-openvla-vla-primer/fig13.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/fig13.png
    caption: "양자화 비교 — int4가 71.9±4.7%·7.0GB로 bfloat16 71.3±4.8%·16.8GB와 대등한 반면 int8은 58.1±5.1%로 떨어진다. GPU별 초당 action 수 그래프가 그 원인을 보여준다 (paper Figure 6·Table 2)"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/jo-2026-openvla-vla-primer/page-full.png
    raw: raw/articles/jo-2026-openvla-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷 (아카이브용)"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

OpenVLA(Kim 2024) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-06편으로, 앞 편인 [[physical-ai/jo-2026-act-vla-primer]]가 정밀 조작 쪽으로 갈라져 나갔다면 이 편은 [[physical-ai/jo-2026-rt-2-vla-primer]]의 흐름으로 되돌아온다. OpenVLA의 문제의식은 성능이 아니라 접근성에 있다. RT-2가 방향을 보여줬지만 모델도 학습 절차도 fine-tuning 방식도 공개되지 않아 남이 가져다 쓸 수 없었고, OpenVLA는 그 자리를 7B 오픈소스 모델로 채운다. 원 논문은 이미 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]로 wiki에 있으니 이 페이지는 그쪽으로 넘어가기 전 몸풀기로 쓰는 편이 맞다.

## 방법론 및 아키텍처 (Methodology and Architecture)

입출력 틀은 RT-1·RT-2와 같다. 현재 장면 이미지 한 장과 자연어 지시를 받아 로봇이 할 action을 낸다. 특징적인 건 정말 이미지 한 장만 본다는 점이다. 여러 시점의 observation 기록도, 로봇 관절 상태도 쓰지 않는다. 앞 편 ACT가 카메라 4대와 현재 관절값을 함께 넣었던 것과 정반대 선택인데, 범용으로 쓰기엔 단순하지만 화면에 안 보이는 정보는 반영할 길이 없다. 출력은 7차원으로 end-effector의 위치 변화 Δx, 자세 변화 Δθ, 그리퍼 개폐 ΔGrip이다. end-effector는 로봇 팔 끝에서 물체와 닿는 부분을 말한다.

![[assets/jo-2026-openvla-vla-primer/fig05.png]]
*Figure 1: OpenVLA 전체 구조. 입력 이미지가 DINOv2와 SigLIP를 함께 통과하고, MLP projector를 거쳐 Llama 2 7B로 들어가 action token을 만든 뒤 de-tokenize돼 7차원 로봇 action이 된다 (조인령 2026, Figure 1).*

언어 모델은 연속값을 그대로 뱉지 못하니 action을 토큰으로 바꿔야 한다. 여기까지는 RT-2와 같고 구간 기준만 다르다. RT-2가 action 값의 최소~최대를 256구간으로 쪼갠 반면 OpenVLA는 학습 데이터의 1%~99% 범위를 쪼갠다. 로봇 데이터에는 드물게 크게 튀는 값이 섞이는데, 그것까지 범위에 넣으면 정작 자주 나오는 작은 움직임이 거칠게 나뉜다. 토큰 자리는 Llama 토크나이저에서 가장 적게 쓰이는 마지막 256개를 action 전용으로 덮어써 마련했다. 출력 어휘를 새로 만드는 대신 기존 토큰 공간 안으로 action을 끌어들인 셈이다.

구조는 vision encoder, projector, LLM backbone 세 부분이다. vision encoder가 하나가 아니라 SigLIP와 DINOv2를 함께 쓰는 fused 구성이라는 게 눈에 띈다. 두 인코더를 각각 통과한 feature를 채널 방향으로 이어 붙이는데, SigLIP는 무엇이 있는지에 강하고 DINOv2는 그것이 어디에 어떤 자세로 놓였는지를 채워준다. 컵을 집을 때 컵이 있다는 사실만 알아서는 부족하고 어느 각도로 손끝을 가져갈지가 관건인 manipulation에서는 이 차이가 실제로 작동한다. Appendix에서 DINOv2를 뺀 SigLIP-only 구조는 평균 성능이 더 낮았다. 이렇게 만든 시각 feature는 2-layer MLP projector를 거쳐 언어 모델의 임베딩 공간으로 옮겨지고, Llama 2 7B가 그 위에서 문장 대신 action token 시퀀스를 생성한다. 기반 VLM인 Prismatic-7B가 정확히 이 세 부품의 조합이라 OpenVLA는 로봇 전용 backbone을 새로 만든 게 아니라 강한 open VLM을 policy로 확장한 구조에 가깝다.

학습 데이터는 Open X-Embodiment에서 추린 970k trajectory다. 여러 로봇의 기록을 한 형식으로 맞추려고 세 조건을 걸었다. manipulation 데이터일 것, 3인칭 시점 카메라가 최소 한 대 있을 것, 단일 팔 end-effector 제어를 쓸 것. 혼합 비율은 Octo를 참고해 다양성이 낮은 데이터셋의 비중을 낮췄고, DROID는 action token 정확도가 계속 낮게 유지돼 학습 마지막 3분의 1에서 빼버렸다. 손실은 예측된 action token에만 걸린다.

설계 선택도 하나씩 비교해뒀다. backbone은 IDEFICS-1·LLaVA·Prismatic 중 Prismatic이 가장 좋았고, 물체가 여럿 놓인 장면에서 지시에 맞는 대상을 골라야 할 때 차이가 벌어졌다. 해상도는 224×224와 384×384가 성능이 비슷한데 후자는 학습 시간이 3배라 224×224로 갔다. vision encoder는 고정하지 않고 함께 fine-tuning하는 쪽이 확실히 좋았는데, 인터넷 이미지로 배운 일반 feature만으로는 제어에 필요한 공간 정보가 모자란다는 뜻이다. 학습량도 일반적인 VLM과 딴판이라 1~2 epoch가 아니라 27 epoch를 돌았다. action token 정확도가 95%를 넘을 때까지 실제 로봇 성능이 계속 올랐기 때문이다. 학습률은 고정 2e-5가 가장 좋았고 warmup은 이득이 없었다.

## 결과 (Results)

평가는 두 갈래다. 추가 학습 없이 바로 쓸 수 있는지, 그리고 새 로봇·새 과제에 잘 붙는지.

![[assets/jo-2026-openvla-vla-primer/fig09.png]]
*Figure 3: BridgeData V2 WidowX 평가. 평균 70.6%로 RT-2-X 50.6·Octo 20.0·RT-1-X 18.5를 앞서고, 다섯 축 중 semantic generalization(36.3 vs 38.8)만 RT-2-X에 뒤진다 (조인령 2026, Figure 3).*

BridgeData V2의 WidowX에서 OpenVLA는 평균 70.6%다. visual·motion·physical·semantic generalization과 language grounding 다섯 축 중 semantic generalization만 RT-2-X에 근소하게 뒤진다. RT-1·RT-2 평가에 쓰인 Google robot에서는 평균 85.0%로 RT-2-X 78.3과 비슷하고 OOD 축은 82.9로 동률이다. 7B가 55B와 대등하다는 결과인데, 해설은 그 공을 모델 크기가 아니라 더 큰 로봇 학습 데이터, 데이터 정제, fused vision encoder, 일관된 학습 파이프라인의 조합으로 돌린다.

![[assets/jo-2026-openvla-vla-primer/fig11.png]]
*Figure 5: 새 로봇 환경 적응. Franka-Tabletop·Franka-DROID 7개 과제에서 OpenVLA 평균 63.8%로 가장 높고, 좁은 단일 지시 과제는 Diffusion Policy가, 여러 물체와 지시가 섞인 과제는 OpenVLA·Octo가 강하다 (조인령 2026, Figure 5).*

적응 실험은 Franka-Tabletop과 Franka-DROID에서 과제마다 demonstration 10~150개만 주고 fine-tuning한다. "Put Carrot in Bowl"처럼 좁은 단일 지시 과제에서는 처음부터 학습한 Diffusion Policy가 강했다. 반대로 장면에 물체가 여럿이고 지시에 따라 대상을 골라야 하는 과제에서는 OpenVLA와 Octo 같은 pre-training된 generalist 쪽이 잘 붙었다. 전체 평균은 OpenVLA가 가장 높았고, 모든 과제에서 성공률 50% 이상을 유지한 유일한 접근이었다. 특정 과제 하나를 위해 최적화된 모델이라기보다 새 과제를 시작할 때의 기본값으로 쓰기 좋다는 뜻이다. 논문은 아주 정교한 과제에서 Diffusion Policy가 더 부드러운 trajectory를 낸다는 점도 인정하며, action chunking이나 temporal smoothing을 붙이면 그 약점을 줄일 수 있다고 본다. 앞 편 ACT와 이어지는 대목이다.

이 논문의 실용적 기여는 비용 쪽 실험에 있다.

![[assets/jo-2026-openvla-vla-primer/fig12.png]]
*fine-tuning 전략 비교. LoRA rank 32가 성공률 68.2±7.5%로 full fine-tuning 69.7±7.2%에 근접하면서 학습 파라미터 97.6M·VRAM 59.7GB에 그친다 (조인령 2026).*

full fine-tuning은 성공률 69.7±7.2%를 내지만 학습 파라미터 7,188.1M에 VRAM 163.3GB가 든다. LoRA rank 32는 68.2±7.5%로 성능이 거의 같은데 97.6M·59.7GB면 된다. rank 32와 64 사이에 차이가 없어 기본값은 32를 권하고, LoRA를 쓰면 A100 한 장에서 10~15시간이면 새 과제에 적응시킬 수 있다.

![[assets/jo-2026-openvla-vla-primer/fig13.png]]
*Figure 6·Table 2: 양자화 비교. int4가 71.9±4.7%·7.0GB로 bfloat16 71.3±4.8%·16.8GB와 대등한 반면 int8은 58.1±5.1%로 떨어진다. 왼쪽 GPU별 초당 action 수 그래프가 그 원인을 보여준다 (조인령 2026, Figure 6·Table 2).*

추론 단계 양자화에서는 int4가 71.9±4.7%·7.0GB로 bfloat16의 71.3±4.8%·16.8GB와 대등하다. 메모리를 절반 이하로 줄이고도 성능이 유지되는데, 이상하게 int8만 58.1±5.1%로 떨어진다. 원인은 정밀도가 아니라 속도였다. A5000에서 int8은 약 1.2Hz로 돌아 학습 때 쓴 5Hz non-blocking control과 시스템 동역학이 크게 달라졌고, int4는 약 3Hz로 더 가까웠다. blocking control 조건으로 다시 돌린 appendix 실험에서는 int8도 나머지와 비슷하게 나온다.

## 한계 (Limitations)

single-image observation만 지원한다는 게 첫 번째 한계다. 멀티뷰 카메라도, proprioception도, observation history도 쓰지 못한다. proprioception은 관절 각도처럼 로봇이 자기 상태를 아는 감각 입력을 말하는데, 실제 로봇 시스템이 훨씬 다양한 감각을 쓴다는 점에서 확장이 필요한 부분이다.

추론 속도도 제약이다. 4090에서 약 6Hz인데 ALOHA 같은 시스템은 50Hz 수준의 control frequency를 요구한다. control frequency는 로봇이 1초에 몇 번 새 action을 갱신하는지를 뜻한다. 논문은 inference optimization, action chunking, speculative decoding을 해법으로 든다. 마지막으로 이전 generalist policy보다 강하다고는 해도 대부분 과제의 성공률이 90% 미만이라 아직 신뢰도가 충분치 않다. 강한 출발점이지 완성된 산업용 policy는 아니다.

그래서 OpenVLA의 의미는 새 성능 기록보다 경로를 열었다는 데 있다. pre-training된 VLM을 policy로 확장하고, 연속 action을 토큰 예측 문제로 다시 정의하고, LoRA와 양자화로 남들이 실제로 가져다 쓸 수 있는 비용까지 맞춰뒀다.

## 관련 페이지 (Related Pages)

- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 이 페이지가 해설하는 원 논문. 실험 조건과 ablation은 원 논문 페이지가 훨씬 자세하므로 입문으로 감을 잡은 뒤 그쪽으로 넘어가는 순서를 권한다.
- [[physical-ai/jo-2026-act-vla-primer]] — 같은 시리즈 바로 앞 편(03-05). 정밀 조작에서 action chunking을 다루며, OpenVLA가 약점 보완책으로 언급하는 지점이 여기서 나온다.
- [[physical-ai/jo-2026-rt-2-vla-primer]] — 같은 시리즈 03-04편. OpenVLA가 이어받는 action 토큰화 방식의 원형이 여기 있다.
- [[physical-ai/open-x-embodiment-2023-robotic-learning-datasets-and-rt-x]] — OpenVLA 학습 데이터의 출처. 970k trajectory가 어떤 데이터에서 추려졌는지 확인할 수 있다.
- [[overviews/physical-ai-overview]] — physical-ai 카테고리의 분류 뼈대·학습 경로 허브.
