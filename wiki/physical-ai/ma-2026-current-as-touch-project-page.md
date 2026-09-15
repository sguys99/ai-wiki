---
title: "Current as Touch: Proprioceptive Contact Feedback for Compliant Dexterous Manipulation (프로젝트 페이지)"
type: article
year: 2026
category: physical-ai
source: ma-2026-current-as-touch-project-page.md
raw_path: raw/articles/ma-2026-current-as-touch-project-page.md
raw_filename: "ma-2026-current-as-touch-project-page.md"
source_collection: external
author: "Chenyang Ma 외"
url: "https://cat.chenyangma.com/"
publisher: "cat.chenyangma.com"
tags: [physical-ai, manipulation, robot-learning, teleoperation]
figures:
  - id: fig01
    file: assets/ma-2026-current-as-touch-project-page/fig01.png
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig01.png
    caption: "티저 이미지. 왼쪽부터 teleoperation 종이컵 쌓기, teleoperation 화이트보드 닦기, policy 카드 한 장 뽑기, policy 물 붓는 동안 병 들기 네 장면이고, 각 장면 아래에 사용자 동작(Tighten your hand, Push and wipe)과 모델의 역할(Model handles for you, No tactile sensor)이 적혀 있다 (2664×1006)"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/ma-2026-current-as-touch-project-page/fig02.png
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig02.png
    caption: "전류 조건부 compliance reference position 예측 모델 도식. observation이나 user intention과 proprioception과 joint current가 인코더를 거쳐 latent z가 되고 Transformer가 predicted action을 낸다. action 인코더와 KL 항, joint current decoder와 smoothed joint current 손실은 학습 전용이다. 논문 Figure 5와 같은 그림이다 (3572×1721)"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/ma-2026-current-as-touch-project-page/fig03.jpg
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig03.jpg
    caption: "전류 없이 종이컵을 쥔 장면. LEAP Hand가 컵을 찌그러뜨린다 (850×850)"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/ma-2026-current-as-touch-project-page/fig04.jpg
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig04.jpg
    caption: "전류 조건부 예측으로 종이컵을 쥔 장면. 컵이 변형되지 않은 채 들려 있다 (850×850)"
    strategy: fetched
    curated: true
  - id: fig09
    file: assets/ma-2026-current-as-touch-project-page/fig09.jpg
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig09.jpg
    caption: "전류 없이 물이 부어지는 병을 든 장면. 하중이 늘자 병이 손에서 미끄러져 탁자로 내려앉는다 (850×850)"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/ma-2026-current-as-touch-project-page/fig10.jpg
    raw: raw/articles/ma-2026-current-as-touch-project-page-figures/fig10.jpg
    caption: "전류 조건부 예측으로 물이 부어지는 병을 든 장면. 하중이 늘어도 병이 들린 채 유지된다 (850×850)"
    strategy: fetched
    curated: true
---

## 요약

이 페이지는 Current as Touch 논문의 공식 프로젝트 페이지다. 논문은 외부 촉각 센서 없이 모터 전류와 관절 상태만으로 접촉을 감지하고, 표준 PD 제어기에 보낼 compliance reference position을 예측해 dexterous hand가 compliant하게 물체를 다루도록 만든다. 페이지는 이 방법을 설명하기보다 결과를 빠르게 보여주는 데 집중한다.

구성은 hero 영상, 티저 이미지, 초록, 모델 도식, 개요 영상, 그리고 과제 네 개의 실험 카드다. 과제 카드마다 시연 영상, 전류 유무 스틸 컷 한 쌍, 대표 수치 한 쌍이 들어 있다. arXiv와 GitHub 저장소(cublicma/current-as-touch) 링크도 여기서 제공한다. 방법의 세부는 [[physical-ai/ma-2026-current-as-touch-proprioceptive-contact]] 페이지에 있다.

![[assets/ma-2026-current-as-touch-project-page/fig01.png]]
*티저 이미지. 네 과제 아래에 사용자 동작과 모델의 역할이 사용자 관점 문구로 적혀 있다 (cat.chenyangma.com)*

## 페이지 구성

페이지는 한 열로 위에서 아래로 이어진다.

| 절 | 내용 |
|---|---|
| hero | 제목, 부제, 저자 6명과 소속, arXiv와 GitHub 버튼. 배경은 Unitree G1 humanoid가 탁자 위 카드 덱을 향해 앉아 있는 영상 |
| 티저 | 네 과제 사진 한 장. 논문 Figure 1과 같은 사진이지만 아래 문구가 다르다 |
| Abstract | 논문 초록과 거의 같은 문장. "tactile-like contact feedback"과 "without external tactile sensors"로 표현이 약간 다르다 |
| Model Framework | 전류 조건부 예측 파이프라인 도식. 논문 Figure 5와 같다 |
| Overview Video | 티저와 같은 네 장면으로 시작하는 개요 영상 |
| Experiments | "Contact-Rich Manipulation Tasks" 아래 과제 카드 4개 |

텍스트 수집에서 영상은 남지 않았다. hero 영상, 개요 영상, 과제별 시연 영상은 페이지에서 직접 봐야 하며, 이 wiki에는 스틸 컷만 있다.

## 티저 문구의 차이

같은 사진이지만 논문과 페이지는 문구의 관점이 다르다. 논문 Figure 1은 과제가 요구하는 접촉 성질(Gentle contact, Stable pressure, Precise contact, Load adaptation)을 적는다. 페이지 티저는 사용자가 하는 동작과 모델이 맡는 역할을 적는다.

| 과제 | 종류 | 사용자 동작 | 모델의 역할 |
|---|---|---|---|
| 종이컵 쌓기 | Teleop | Tighten your hand | Model handles for you |
| 화이트보드 닦기 | Teleop | Push and wipe | Easy and quick |
| 카드 한 장 뽑기 | Policy | Draw one card | No tactile sensor |
| 물 붓는 동안 병 들기 | Policy | Feel the weight | No tactile sensor |

이 문구는 논문의 설계를 사용자 언어로 옮긴 것이다. teleoperation에서 조작자는 손을 쥐는 의도만 내고 접촉력 조절은 모델이 맡으며, policy 학습에서는 촉각 센서 없이도 접촉과 하중을 감지한다.

## 모델 도식

Model Framework 절의 도식은 논문 Figure 5와 같다. 입력은 세 종류다. policy 모드에서는 observation(물체나 목표 pose), teleop 모드에서는 user intention(사용자 의도 속도)이 들어가고, 두 모드 공통으로 proprioception과 joint current가 들어간다.

![[assets/ma-2026-current-as-touch-project-page/fig02.png]]
*전류 조건부 compliance reference position 예측 모델. 노란 상자는 손실 항, 초록 상자는 네트워크, 점선은 학습 전용 경로다 (cat.chenyangma.com)*

인코더가 이 입력을 latent z로 압축하고 Transformer가 predicted action, 즉 CRP chunk를 낸다. 점선으로 표시된 학습 전용 경로가 두 개 있다. 하나는 action sequence를 action 인코더로 인코딩해 action style을 만들고 KL 손실을 붙이는 경로이고, 다른 하나는 joint current decoder가 smoothed joint current를 예측해 보조 손실을 계산하는 경로다. 배포 시에는 두 경로 모두 제거된다.

## 과제 카드

과제 카드마다 종류 라벨(Teleoperation 또는 Policy Learning), 과제 이름, 한 문장 설명, 대표 수치 한 쌍, 시연 영상, 전류 유무 스틸 컷 한 쌍이 들어 있다. 스틸 컷에는 w/o Current와 w/ Current 배지가 붙어 있고, 병 들기 카드의 w/o Current 스틸 컷에는 "slipped to table"이라는 실패 설명이 함께 있다.

| 과제 | 종류 | 한 문장 설명 |
|---|---|---|
| Foam-Cup Stacking | Teleoperation | 전류 조건부 compliance reference 예측이 빠른 teleoperation을 유지하면서 물체 손상을 줄인다 |
| Whiteboard Wiping | Teleoperation | 모터 전류가 변하는 보드 상호작용에 맞서 지속적인 표면 접촉을 유지하게 돕는다 |
| Single-Card Picking | Policy Learning | 전류가 덱을 과도하게 누르지 않고 얇은 물체 정확히 하나를 집을 접촉 증거를 준다 |
| Dynamic Bottle Holding | Policy Learning | 하중에 민감한 모터 전류가 물이 부어지는 동안 grasping을 적응시킨다 |

### 종이컵 쌓기

스틸 컷 쌍은 같은 장면에서 손의 결과만 다르다. 전류 없이 쥐면 LEAP Hand가 컵을 찌그러뜨리고, 전류 조건부 예측으로 쥐면 컵이 변형되지 않은 채 들린다.

![[assets/ma-2026-current-as-touch-project-page/fig03.jpg]]
*종이컵 쌓기, w/o Current. 컵이 손 안에서 찌그러진다 (cat.chenyangma.com)*

![[assets/ma-2026-current-as-touch-project-page/fig04.jpg]]
*종이컵 쌓기, w/ Current. 컵이 변형 없이 들린다 (cat.chenyangma.com)*

### 동적 병 들기

병 들기 카드는 하중 변화에 대한 적응을 보여준다. 전류 없이 쥐면 물이 부어져 무거워진 병이 손에서 미끄러져 탁자로 내려앉고, 전류 조건부 예측은 병을 들린 채 유지한다.

![[assets/ma-2026-current-as-touch-project-page/fig09.jpg]]
*동적 병 들기, w/o Current. 병이 미끄러져 탁자에 닿았다 (cat.chenyangma.com)*

![[assets/ma-2026-current-as-touch-project-page/fig10.jpg]]
*동적 병 들기, w/ Current. 물이 부어져도 병이 들려 있다 (cat.chenyangma.com)*

## 대표 수치와 논문 표의 대응

페이지는 과제마다 수치 한 쌍만 보여준다. 논문 표와 대조하면 어느 행을 골랐는지 확인된다.

| 과제 | 지표 | w/o Current | w/ Current | 논문 출처 |
|---|---|---|---|---|
| Foam-Cup Stacking | 초보 조작자 컵 변형률 | 15.0% | 0.0% | Table 1의 Novice 행 |
| Whiteboard Wiping | 초보 조작자 성공률 | 46.7% | 100% | Table 2의 Novice 행 |
| Single-Card Picking | strict 성공률 | 55.8% | 76.9% | Table 4 |
| Dynamic Bottle Holding | 250g에서 안정 비율 | 16.7% | 100% | Table 3의 250g 행 |

네 수치 모두 초보 조작자 또는 가장 차이가 큰 하중 조건을 골랐다. 종이컵 쌓기와 화이트보드 닦기는 Retargeting 베이스라인을 빼고 전류 없는 모델과만 비교하며, 숙련 조작자 행과 완료 시간 지표는 페이지에 없다. 동적 병 들기의 350g 학습 분포 밖 결과와 미끄러짐과 낙하의 구분도 논문에만 있다.

논문에만 있고 페이지에는 없는 결과는 다음과 같다.

| 논문에만 있는 결과 | 내용 |
|---|---|
| Retargeting 베이스라인 | 보정 없는 직접 teleoperation. 초보 컵 변형률 43.3%, 초보 닦기 성공률 40% |
| 숙련 조작자 | 10분 연습한 사용자. 전류 조건부 모델에서 컵 변형 0%, 닦기 성공 100% |
| 완료 시간 | 전류 조건부 모델이 두 과제 모두 가장 짧다 |
| 150g과 350g 하중 | 350g에서 전류 없는 모델은 100% 낙하, 전류 조건부 모델은 낙하 0% |
| tolerant 성공률과 실패 유형 | 카드 뽑기에서 tolerant 성공 65.4%에서 90.4%, 두 장 이상 실패 7.7%에서 0% |
| ablation | 실행 집계 프레임 수 M과 KL 가중치에 대한 부록 실험 |

## 한계

- **영상은 수집되지 않았다**. 접촉력 조절의 시간적 양상은 페이지의 영상을 직접 봐야 한다.
- **수치가 선별적이다**. 과제마다 한 쌍만 실었으므로 전체 표는 논문 페이지에서 확인해야 한다.
- **방법 설명이 없다**. 초록과 도식 한 장뿐이라 compliance reference position의 정의, 의도 속도 입력, 원시 전류와 평활 전류 보조 손실, 실행 집계 같은 세부는 논문 페이지에 있다.
- **GitHub 저장소는 링크만 있다**. 저장소 내용은 이 wiki에 수집되지 않았다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| compliance reference position | 표준 PD 제어기에 보내는 이상적인 관절 위치 목표. 추종 오차가 적절한 grasping 힘을 만든다 |
| w/o Current, w/ Current | 페이지 전체에서 쓰는 비교 라벨. 같은 예측기를 전류 입력 없이 학습한 모델과 원시 전류를 쓰는 전체 모델 |
| novice cup deformation | 초보 조작자가 컵을 쌓을 때 컵이 변형된 시도의 비율 |
| strict success | 카드 덱에서 정확히 한 장만 뽑은 시도의 비율 |
| stable at 250 g | 물 250g이 부어진 뒤에도 병이 미끄러지거나 떨어지지 않은 시도의 비율 |

## 관련 페이지

- [[physical-ai/ma-2026-current-as-touch-proprioceptive-contact]]: 같은 연구의 논문 페이지. 방법의 정식화, 전체 결과표, ablation, 모터 전류와 접촉력의 물리 관계가 여기에 있다.
- [[physical-ai/zhao-2023-learning-fine-grained-bimanual-manipulation]]: 모델 도식의 action 인코더와 KL 정규화가 따르는 ACT의 원 논문.
- [[physical-ai/enactic-openarm]]: teleoperation 하드웨어 쪽에서 접촉 되먹임 문제를 다루는 프로젝트. 이 페이지의 teleoperation 카드와 대비된다.
