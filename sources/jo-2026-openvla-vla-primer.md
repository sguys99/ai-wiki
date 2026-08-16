---
title: "03-06. OpenVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
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

## 한 줄 요약 (One-line Summary)

OpenVLA(Kim 2024) 논문을 처음 읽는 사람을 위한 한국어 입문 해설이다. "모두의 로보틱스 - VLA 입문" 시리즈 03-06편으로, RT-2가 보여준 VLA 방향을 오픈소스 7B 모델로 다시 구현하면서 LoRA와 양자화까지 붙여 실제로 fine-tuning하고 배포할 수 있는 경로를 만든 과정을 배경·구조·결과·한계 순으로 짚는다.

## 1. 자료 정보 (Document Information)

- 저자: 조인령 (WikiDocs "모두의 로보틱스 - VLA 입문" 시리즈)
- URL: https://wikidocs.net/366372
- 형식: 온라인 강의 챕터 (03-06편, 바로 앞 03-05편이 ACT)
- 성격: 원 논문 "OpenVLA: An Open-Source Vision-Language-Action Model"(arXiv 2406.09246)의 한국어 입문 해설. 원 논문은 이미 wiki에 `kim-2024-openvla-an-open-source-vision-language-action-model`로 들어와 있어 이 페이지는 그 논문의 진입로에 가깝다.

## 2. 주요 기여 (Key Contributions)

이 해설이 전달하는 OpenVLA의 핵심은 네 가지다.

- 성능 좋은 VLA가 대부분 비공개였다는 문제를 정면으로 다룬다. 모델 구조·학습 절차·fine-tuning 방식을 공개 가능한 형태로 정리한 7B 오픈소스 VLA를 내놓는다.
- 로봇 전용 backbone을 새로 설계하지 않는다. Prismatic-7B라는 기존 open VLM을 가져와 robot action prediction으로 fine-tuning한다.
- Open X-Embodiment를 그대로 쓰지 않고 걸러 쓴다. manipulation 데이터, 3인칭 카메라 최소 1대, 단일 팔 end-effector 제어라는 세 조건으로 970k trajectory를 추린다.
- 배포 비용까지 실험한다. LoRA로 A100 한 장에서 10~15시간이면 새 과제에 적응시킬 수 있고, 4-bit 양자화로 VRAM을 절반 이하로 줄이면서 성능을 유지한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

입출력은 RT-1·RT-2와 같은 틀이다. 현재 장면 이미지 한 장과 자연어 지시를 받아 로봇이 할 action을 낸다. 다만 OpenVLA는 여러 시점의 observation 기록이나 로봇 관절 상태를 쓰지 않고 현재 이미지 한 장만 본다. 바로 앞 편에서 다룬 ACT가 여러 카메라와 현재 관절 상태를 함께 넣은 것과 대비되는 지점이다. 출력은 7차원으로, end-effector의 위치 변화 Δx, 자세 변화 Δθ, 그리퍼 개폐 ΔGrip이다.

언어 모델은 연속값을 그대로 뱉지 못하므로 action을 토큰으로 바꾼다. RT-2와 큰 틀은 같은데 구간을 나누는 기준이 다르다. RT-2가 action 값의 최소~최대 범위를 256구간으로 쪼갠 반면 OpenVLA는 학습 데이터의 1%~99% 범위를 256구간으로 쪼갠다. 드물게 튀는 값이 전체 범위를 넓혀 자주 나오는 작은 움직임이 거칠게 나뉘는 문제를 줄이려는 선택이다. 토큰 자리는 Llama 토크나이저에서 가장 적게 쓰이는 마지막 256개를 action 전용으로 덮어써 마련한다.

구조는 vision encoder, projector, LLM backbone 세 부분이다. vision encoder는 SigLIP와 DINOv2를 함께 쓰는 fused 구성으로, 두 인코더를 각각 통과한 feature를 channel-wise로 이어 붙인다. SigLIP는 무엇이 있는지에, DINOv2는 그것이 어디에 어떤 자세로 있는지에 강하다. 컵을 어느 각도로 접근해 쥘지가 중요한 manipulation에서는 의미 정보만으로 부족하다는 게 이 조합의 근거고, Appendix의 SigLIP-only ablation에서 평균 성능이 떨어진 것으로 뒷받침한다. 이렇게 만든 시각 feature는 2-layer MLP projector를 거쳐 언어 모델의 임베딩 공간으로 옮겨지고, Llama 2 7B가 그 위에서 문장 대신 action token 시퀀스를 생성한다. 기반 VLM인 Prismatic-7B가 바로 이 세 부품(SigLIP+DINOv2, 2-layer projector, Llama 2 7B)의 조합이다.

학습 데이터는 Open X-Embodiment에서 추린 970k trajectory다. 여러 로봇의 데이터를 한 형식으로 맞추려고 manipulation 데이터만 남기고, 3인칭 시점 카메라가 최소 한 대 있어야 하며, 단일 팔 end-effector 제어를 쓰는 것만 골랐다. 혼합 비율은 Octo를 참고해 다양성이 낮은 데이터셋의 비중을 낮췄고, DROID는 action token 정확도가 계속 낮게 유지돼 학습 마지막 3분의 1에서 혼합에서 뺐다. 손실은 예측된 action token에만 걸린다.

논문이 비교한 설계 선택도 정리돼 있다. backbone은 IDEFICS-1·LLaVA·Prismatic을 비교해 Prismatic이 가장 좋았고, 여러 물체 중 지시에 맞는 대상을 골라야 하는 과제에서 차이가 컸다. 해상도는 224×224와 384×384가 성능 차이가 거의 없는데 후자는 학습 시간이 3배라 224×224를 택했다. vision encoder는 고정하지 않고 함께 fine-tuning하는 쪽이 확실히 좋았다. 학습량도 일반적인 VLM보다 훨씬 많이 필요해서, action token 정확도가 95%를 넘을 때까지 실제 로봇 성능이 계속 올라 최종 27 epoch를 돌았다. 학습률은 고정 2e-5가 가장 좋았고 warmup은 이득이 없었다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가는 두 갈래다. 추가 학습 없이 바로 쓸 수 있는지, 그리고 새 로봇·새 과제에 잘 적응하는지.

BridgeData V2의 WidowX에서 OpenVLA는 평균 70.6%로 RT-2-X 50.6·Octo 20.0·RT-1-X 18.5를 앞선다. visual·motion·physical·semantic generalization과 language grounding 다섯 축 중 semantic generalization(36.3 vs 38.8)만 RT-2-X에 근소하게 뒤진다. RT-1·RT-2 평가에 쓰인 Google robot에서는 평균 85.0%로 RT-2-X 78.3과 비슷한 수준이고 OOD 축은 82.9로 동률이다. 7B 모델이 55B RT-2-X와 대등하거나 앞선 셈인데, 해설은 그 원인을 모델 크기가 아니라 더 큰 로봇 학습 데이터, 데이터 정제, fused vision encoder, 일관된 학습 파이프라인의 조합에서 찾는다.

적응 실험은 Franka-Tabletop과 Franka-DROID에서 과제마다 10~150개 demonstration만 주고 fine-tuning한다. 비교 대상은 Diffusion Policy, 입출력을 맞춘 Diffusion Policy(matched), Octo, 그리고 OpenX pre-training 없이 바로 목표 과제에 맞춘 OpenVLA(scratch)다. "Put Carrot in Bowl"처럼 좁은 단일 지시 과제에서는 Diffusion Policy가 강했지만, 장면에 물체가 여럿이고 지시에 따라 대상을 골라야 하는 과제에서는 OpenVLA와 Octo 쪽이 잘 붙었다. 전체 평균은 OpenVLA가 가장 높았고 모든 과제에서 성공률 50% 이상을 유지한 유일한 접근이었다. 논문은 Diffusion Policy가 아주 정교한 과제에서 더 부드러운 trajectory를 낸다는 점도 인정하며, OpenVLA에 action chunking이나 temporal smoothing을 붙이면 그 약점을 줄일 수 있다고 본다. 바로 앞 편 ACT와 이어지는 대목이다.

비용 쪽 실험이 이 논문의 실용적 기여다. full fine-tuning은 성공률 69.7±7.2%에 학습 파라미터 7,188.1M·VRAM 163.3GB가 드는데, LoRA rank 32는 68.2±7.5%로 거의 같은 성능을 97.6M·59.7GB로 낸다. rank 32와 64 사이 차이가 없어 기본값으로 32를 권하며, LoRA를 쓰면 A100 한 장에서 10~15시간이면 새 과제에 적응시킬 수 있다.

추론 단계 양자화는 bfloat16 71.3±4.8%·16.8GB, int8 58.1±5.1%·10.2GB, int4 71.9±4.7%·7.0GB다. 4-bit는 메모리를 절반 이하로 줄이면서 성능을 유지하는데 8-bit만 유독 떨어진다. 원인은 정밀도가 아니라 속도다. A5000에서 int8은 약 1.2Hz로 돌아 학습 때 쓴 5Hz non-blocking control과 시스템 동역학이 크게 달라졌고, int4는 약 3Hz로 더 가까웠다. blocking control 조건의 appendix 실험에서는 int8도 나머지와 비슷했다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

single-image observation만 지원한다는 게 첫 번째 한계다. 멀티뷰 카메라, proprioception, observation history를 활용하지 못한다. 실제 로봇 시스템이 훨씬 다양한 감각 입력을 쓴다는 점에서 확장이 필요한 부분이다.

추론 속도도 제약이다. 4090에서 약 6Hz인데 ALOHA 같은 시스템은 50Hz 수준의 control frequency를 요구한다. 논문은 inference optimization, action chunking, speculative decoding을 해법으로 든다. 마지막으로 이전 generalist policy보다 강하다고 해도 대부분 과제에서 성공률이 90% 미만이라 신뢰도가 충분하지 않다. 강한 출발점이지 완성된 산업용 policy는 아니라는 뜻이다.

## 6. 관련 연구 (Related Work)

- RT-1(Brohan 2022)·RT-2(Brohan 2023): 직접 전신. OpenVLA는 RT-2의 action 토큰화 방식을 이어받으면서 구간 기준만 1%~99%로 바꿨다.
- Open X-Embodiment(2023): 학습 데이터의 기반. OpenVLA는 그중 조건을 만족하는 970k trajectory만 쓴다.
- Prismatic VLM: 기반 VLM. SigLIP+DINOv2·2-layer projector·Llama 2 7B 조합을 그대로 물려받는다.
- ACT(Zhao 2023): 앞 편에서 다룬 접근. OpenVLA의 정밀도 약점을 보완할 방향으로 action chunking이 언급된다.
- Octo·Diffusion Policy: 적응 실험의 비교 대상이자 데이터 혼합 비율의 참고 대상.

## 7. 용어집 (Glossary)

- OpenVLA: Prismatic-7B를 로봇 action 예측으로 fine-tuning한 7B 오픈소스 vision-language-action model.
- Prismatic-7B: SigLIP+DINOv2 vision encoder, 2-layer MLP projector, Llama 2 7B backbone으로 구성된 open VLM. OpenVLA의 출발점.
- fused vision encoder: 성격이 다른 두 vision encoder의 feature를 채널 방향으로 이어 붙여 쓰는 구성. OpenVLA에서는 의미 정보의 SigLIP와 공간 정보의 DINOv2 조합.
- projector: vision encoder의 feature를 언어 모델의 임베딩 공간으로 옮기는 2-layer MLP 연결부.
- action token: 연속적인 로봇 action을 구간으로 나눠 토큰처럼 표현한 것. OpenVLA는 1%~99% 범위를 256구간으로 나눈다.
- non-blocking control: 이전 action의 완료를 기다리지 않고 다음 action을 내보내는 제어 방식. 추론 속도가 느려지면 학습 때와 동역학이 달라진다.

## 8. 그림 후보 (Figure Candidates)

| id | label | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | — | OpenVLA 등장 배경 (Gato→RT-1→RT-2 흐름) | fetched | (선택) |
| fig02 | — | OpenVLA 모델 개요 | fetched | (선택) |
| fig03 | — | Open X-Embodiment 데이터 수집 환경 6곳 | fetched | (선택) |
| fig04 | — | 단일 이미지 + 자연어 지시 입력 예시 | fetched | (선택) |
| fig05 | Figure 1 | OpenVLA 전체 구조 (DINOv2+SigLIP → projector → Llama 2 → action de-tokenizer) | fetched | ★ wiki 권장 (architecture) |
| fig06 | — | fused vision encoder 확대 (fig05 부분) | fetched | (중복) |
| fig07 | — | projector 확대 (fig05 부분) | fetched | (중복) |
| fig08 | — | Llama 2 backbone 확대 (fig05 부분) | fetched | (중복) |
| fig09 | Figure 3 | BridgeData V2 WidowX 평가 (평균 70.6%) | fetched | ★ wiki 권장 (result) |
| fig10 | Figure 4 | Google robot 평가 (평균 85.0%) | fetched | (선택) |
| fig11 | Figure 5 | 새 로봇 환경 적응 (Franka-Tabletop·DROID) | fetched | ★ wiki 권장 (result) |
| fig12 | — | fine-tuning 전략 비교표 (LoRA rank 32) | fetched | ★ wiki 권장 (cost) |
| fig13 | Figure 6·Table 2 | 양자화 비교 (int4 vs int8 vs bfloat16) | fetched | ★ wiki 권장 (deployment) |
| fig14 | — | 전체 페이지 스크린샷 | screenshot | (아카이브) |
