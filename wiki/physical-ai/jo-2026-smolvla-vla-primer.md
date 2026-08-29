---
title: "03-10. SmolVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
source: jo-2026-smolvla-vla-primer.md
raw_path: raw/articles/jo-2026-smolvla-vla-primer.md
raw_filename: "jo-2026-smolvla-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366376"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:42:00+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, edge-inference]
figures:
  - id: fig01
    file: assets/jo-2026-smolvla-vla-primer/fig01.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig01.png
    caption: "SmolVLA 전체 구조 (논문 Figure 1 캡처)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-smolvla-vla-primer/fig02.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig02.png
    caption: "state prefix와 suffix 비교 (논문 Table 11 캡처)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-smolvla-vla-primer/fig03.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig03.png
    caption: "layer skipping 설명에서 다시 인용한 논문 Figure 1 — fig01과 동일 파일이다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-smolvla-vla-primer/fig04.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig04.png
    caption: "VLM 층 잘라내기 결과 (논문 Table 8 캡처)"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-smolvla-vla-primer/fig05.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig05.png
    caption: "논문 Figure 1에 action expert 블록만 빨간 테두리로 표시한 저자 주석판"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-smolvla-vla-primer/fig06.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig06.png
    caption: "cross-attention·self-attention·CA+SA 비교 (논문 Table 6 캡처)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-smolvla-vla-primer/fig07.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig07.png
    caption: "action 토큰 attention mask의 causal·bidirectional 비교 (논문 Table 7 캡처)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-smolvla-vla-primer/fig08.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig08.png
    caption: "asynchronous inference 구조 (논문 Figure 2 캡처)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-smolvla-vla-primer/fig09.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig09.png
    caption: "임계값 g에 따른 action queue 길이 변화 (논문 Figure 3 캡처)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-smolvla-vla-primer/fig10.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig10.png
    caption: "SO100 실기기 벤치마크 (논문 Table 3 캡처)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-smolvla-vla-primer/fig11.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig11.png
    caption: "SO101 Pick-Place-Lego의 학습 분포 안팎 성공률 (논문 Table 4 캡처)"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/jo-2026-smolvla-vla-primer/fig12.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig12.png
    caption: "single-task·multi-task·community dataset pre-training 비교 (논문 Table 5 캡처)"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-smolvla-vla-primer/fig13.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig13.png
    caption: "sync와 async 추론 비교 (논문 Figure 5 캡처)"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-smolvla-vla-primer/page-full.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 요약 (Summary)

"모두의 로보틱스 — VLA 입문" 시리즈의 열 번째 글이다. [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model|SmolVLA 논문]]을 한국어로 다시 배열했다. 논문은 구조를 차례로 나열한 다음 ablation을 부록 표로 미루는데 이 글은 설계 하나를 설명한 직후 그 근거가 되는 표를 바로 붙인다. 논문에서 페이지를 오가며 맞춰 봐야 하는 대목이 여기서는 한 흐름으로 이어진다.

효율성·접근성·재현성 세 키워드를 앞에 세우고 모든 선택을 거기에 다시 붙이는 것도 이 글의 편집이다. 그래서 SmolVLA를 읽는 질문이 "파라미터 수가 작다"에서 "어떤 정보는 유지했고, 어떤 계산은 줄였으며, 어떤 실행 구조를 새로 설계했는가"로 옮겨 간다.

배경지식 장은 시리즈의 다른 편들과 달리 건너뛴다. flow matching과 action expert를 03-07(π0)·03-08(π0.5)에서 이미 다뤘다며 그쪽 링크만 걸어 두기 때문이다. 그 두 편은 이 wiki에 아직 없다.

## 구조 서술 (Architecture)

![[assets/jo-2026-smolvla-vla-primer/fig05.png]]
*논문 Figure 1에 action expert 블록만 빨간 테두리로 표시한 저자 주석판 (조인령 2026)*

SmolVLA를 두 덩어리로 나눈다. 한쪽은 이미지·언어·로봇 상태를 이해하는 compact pretrained VLM, 다른 한쪽은 그 feature를 받아 action chunk를 만드는 action expert다. action chunk는 미래 여러 스텝의 action을 한 묶음으로 예측해 둔 결과다. backbone은 SmolVLM-2, 시각 인코더는 SigLIP, 언어 decoder는 SmolLM2 계열이라고 적는다. 여기서 VLM이 하는 일은 텍스트 생성이 아니다. 로봇이 상황을 이해하도록 feature를 만들어 준다고 강조한다.

로봇의 sensorimotor state도 linear layer로 토큰 차원을 맞춰 visual 토큰·language 토큰과 나란히 VLM에 들어간다. Table 11이 그 근거다. action expert 쪽에 suffix로 붙이는 것보다 VLM 쪽 prefix로 넣는 편이 나았다. 저자는 이 결과를 "로봇의 상태를 행동 생성 직전에 덧붙이는 것보다 이미지와 언어를 해석하는 단계부터 함께 넣는 편이 유리하다"로 옮긴다.

계산을 줄인 곳은 두 군데다. SmolVLM-2가 지원하는 image tiling을 끄고 global image만 쓰며 pixel shuffle로 프레임당 visual 토큰을 64개로 묶는다. 정보 손실 가능성은 인정하되 목표가 이미지 이해 벤치마크 점수에 있지 않고 실시간 제어에 있다는 점을 근거로 든다. 나머지 하나가 Figure 1의 가위 아이콘이 가리키는 layer skipping이다. VLM의 마지막 L−N개 층을 버리고 N = L/2 정도를 균형점으로 잡는다. Table 8을 보면 256M짜리 작은 VLM을 통째로 쓰는 것보다 큰 VLM의 앞쪽 층만 쓰는 편이 낫다. 저자는 이를 단순한 가지치기로 보지 않고 필요한 표현은 남기면서 계산만 줄이는 방식으로 읽는다.

action expert는 cross-attention과 self-attention을 번갈아 쌓는다. cross-attention은 VLM feature 참조를 맡고 self-attention은 action 토큰끼리 흐름을 맞춘다. Table 6에서 CA+SA가 둘을 단독으로 쓴 경우를 모두 앞섰다. Table 7에서는 미래 action까지 보는 bidirectional보다 과거 토큰만 보는 causal이 나았다. 이 결과에 "action chunk는 미래를 미리 훔쳐보며 만들어지는 것이 아니라 시간 순서에 맞춰 자연스럽게 이어져야 한다"는 해석을 붙인다.

## 비동기 추론을 가장 길게 다룬다 (Asynchronous Inference)

synchronous inference는 예측과 실행이 순차적이다. 로봇이 다음 action을 기다리는 구간이 그래서 생긴다. SmolVLA는 실행과 추론을 RobotClient와 PolicyServer로 분리해 겹쳐 돌린다. 이 글이 분량을 가장 많이 쓰는 대목이다.

로봇이 observation o0를 보내면 서버가 n개짜리 action chunk를 계산한다. 로봇은 그중 k≤n개만 먼저 실행하고 움직이는 도중 새 observation ok를 다시 보낸다. 새 chunk가 도착하면 queue에 남아 있던 action과 합쳐 갱신한다. 동작 순서를 네 단계로 풀어 쓴 대목이다.

남은 action 비율 |At|/n이 queue threshold g보다 작아지면 새 추론이 걸린다. g가 작을수록 순차적으로 돌고 클수록 자주 observation을 보내며 반응적으로 움직인다. Figure 3의 세 곡선은 각각 채웠다 바닥나기를 반복하는 g=0.0, 바닥까지 떨어지지 않는 타협점 g=0.7, 높은 수준을 계속 유지하는 g=1.0으로 읽는다. g=1.0 쪽에는 새 observation 변화에 덜 민감해질 수 있다는 조건이 붙는다. observation filtering은 joint-space에서 거의 같은 상태면 처리를 건너뛰는 장치인데 "같은 장면을 거의 반복해서 또 해석하지 않도록 하는 장치"라는 한 줄로 정리한다.

action queue를 "앞으로 실행할 행동이 몇 개 정도 미리 준비되어 있는가"로 푸는 식이다. 입문자용 비유도 이 절에 가장 많다.

## 결과 서술 (Results)

ACT 평균 48.3%, π0 61.7%에 비해 SmolVLA 0.45B가 78.3%. Table 3의 SO100 결과를 먼저 본다. 과제별로 내려가면 Pick-Place만큼은 π0가 100%로 앞선다. SmolVLA는 75%다. Stacking 90%, Sorting 70%로 나머지 둘에서 앞선다. 저자는 이를 모든 과제에서 최고인 모델로 보지 않는다. 작은 모델임에도 평균이 안정적인 모델로 정리한다.

Table 4에서는 SO101을 학습 분포 안팎으로 나눠 본다. ACT가 70%/40%, SmolVLA 0.45B가 90%/50%. 분포 밖 50%는 성과이자 한계로 동시에 읽힌다. 뒤에는 더 다양한 데이터와 넓은 embodiment 학습이 필요하다고 덧붙인다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

single-task 40% → multi-task 51.7%, 여기에 community dataset pre-training까지 더하면 78.3%다. 가장 크게 다루는 표가 이 Table 5다. 성능이 모델 구조만으로 나온 것이 아니라는 문장을 여기에 붙인다.

Figure 5의 sync·async 비교에서 기준은 성공률이 아니라 속도다. 성공률은 78.3% 대 73.3%로 async가 오히려 낮다. 그런데 Pick-Place 완료 시간이 13.75초에서 9.70초로 줄고 고정 시간 안에 처리한 cube는 9개에서 19개로 는다. 결론은 로봇이 정답 행동을 생성하는 것만으로는 부족하고 그 행동을 제때 내보내 끊기지 않게 실행해야 한다는 것이다.

## 한계 장이 결과 장만큼 길다 (Limitations)

다섯 항목 가운데 데이터 출처가 맨 앞이다. pre-training 데이터가 주로 SO100 계열에서 모여 cross-embodiment 데이터로 보기 어렵다. 저자는 이를 SmolVLA만의 약점으로 두지 않고 로봇 데이터를 인터넷에서 긁어올 수 없는 VLA 연구 전체의 문제로 돌린다. 규모 문제가 그다음이다. 학습에 쓴 것은 약 23K trajectories로, OpenVLA의 약 1M trajectories와 비교하면 작다. 다양한 물체·환경·지시·장기 과제·새 플랫폼으로 확장할 때 각각 왜 더 많은 데이터가 필요한지는 표로 붙여 두었다.

backbone 적합성도 문제로 남는다. 일반 VLM이 학습하는 것은 이미지 설명·문서 이해·OCR·시각 질의응답이다. 로봇이 요구하는 것은 잡을 수 있는 위치와 방향, affordance, 언어 지시의 action 변환, 접촉 결과 예측, 시간에 따른 상태 변화 이해다. 둘을 표로 나란히 놓고 대조했다. affordance는 물체가 허용하는 상호작용 가능성을 뜻한다.

장기 과제에서는 사정이 다르다. Pick-Place·Stacking·Sorting은 모두 짧은 조작 과제다. 책상 정리, 냉장고에서 음료 꺼내 컵에 따르기, 순서대로 조립하기로 넘어가면 계층적 policy, 장기 메모리, 실패 감지, 고수준 planning, human feedback이 더 필요하다고 본다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. asynchronous inference가 반응성을 높이긴 해도 장기 과제에서는 속도만으로 부족하다는 조건이 붙는다.

남은 하나는 학습 방식이다. imitation learning은 시연 데이터를 흉내 내 policy를 학습하는 방법이다. 시연에 없는 상황에서 복구하기 어렵고 시연의 편향까지 함께 배운다. 물체가 늘 작업대 중앙에 있던 데이터로 배우면 가장자리에서 성능이 떨어진다는 예도 든다. 대안으로 강화학습이나 self-improvement를 들지만 실패 비용과 하드웨어 손상 위험 때문에 실기기 적용이 쉽지 않다는 점도 함께 적는다.

## 이 wiki에서 이 글이 놓이는 자리 (Position in This Wiki)

[[physical-ai/jo-2026-rt-1-vla-primer|RT-1]] → [[physical-ai/jo-2026-rt-2-vla-primer|RT-2]] → [[physical-ai/jo-2026-act-vla-primer|ACT]] → [[physical-ai/jo-2026-openvla-vla-primer|OpenVLA]] → [[physical-ai/jo-2026-pi-0-6-vla-primer|π0.6]]으로 이어져 온 시리즈의 연장이다. 앞 편의 기준은 학습 방법이었고 이번 편은 그 기준을 배포 비용으로 바꾼다. 작게 만드는 문제를 직접 다루는 것은 시리즈에서 이 글이 처음이다.

수치와 ablation의 원본, 도식 9종의 깨끗한 크롭은 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]에 있다. 이 글의 강점은 설계와 근거 표를 붙여 읽는 순서, 그리고 asynchronous inference를 네 단계로 풀어 쓴 서술이다. 논문 페이지와의 역할 분담이 그렇게 나뉜다. 논문 Section 3을 바로 펼쳤다가 g와 큐 그래프에서 막혔다면 이쪽을 먼저 보는 편이 빠르다.

fig05는 논문 Figure 1에 저자가 action expert 블록만 빨간 테두리로 표시한 판이다. 옮겨 온 도식 중 이 글에만 있는 것은 이 하나뿐이다. 나머지 fig01~fig13은 논문 figure·table을 영문 캡션째로 캡처한 것이라 원본 크롭이 낫고 그 크롭은 논문 페이지에 이미 올려 두었다. fig03은 fig01과 바이트 단위로 같은 파일이다.

π0 같은 대형 VLA를 직접 돌리기 부담스러운 입문자라면 SmolVLA부터. 마지막 문단이 그렇게 권한다. 직접 로봇 데이터를 모아 보라는 권유까지 붙는데 그 실습 경로는 [[physical-ai/huggingface-lerobot|LeRobot]]으로 이어진다.

## 관련 페이지 (Related Pages)

- [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]] — 원 논문. 수치·ablation·도식 원본은 그쪽에 있다
- [[physical-ai/huggingface-lerobot]] — 이 글이 권하는 실습 경로. SmolVLA policy가 여기 들어 있다
- [[physical-ai/jo-2026-pi-0-6-vla-primer]] — 같은 시리즈 03-09편
- [[physical-ai/jo-2026-openvla-vla-primer]] — 같은 시리즈 03-06편. 데이터 규모 비교 대상인 OpenVLA
- [[physical-ai/jo-2026-act-vla-primer]] — 같은 시리즈 03-05편. SO100·SO101 비교 대상인 ACT
- [[physical-ai/jo-2026-rt-2-vla-primer]] — 같은 시리즈 03-04편
- [[physical-ai/jo-2026-rt-1-vla-primer]] — 같은 시리즈 03-03편
- [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]] — 본문이 계속 비교하는 π0 논문. flow matching과 action expert의 원형
- [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]] — 데이터 규모 한계 절이 비교 대상으로 삼는 OpenVLA 논문
- [[overviews/glossary-physical-ai]] — 용어 canonical 표기
- [[overviews/physical-ai-overview]] — 도메인 허브
