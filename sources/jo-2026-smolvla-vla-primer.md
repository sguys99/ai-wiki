---
title: "03-10. SmolVLA - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
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
    caption: "SmolVLA 전체 구조 (논문 Figure 1 캡처, 영문 캡션 포함)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-smolvla-vla-primer/fig02.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig02.png
    caption: "state를 VLM prefix로 넣을 때와 action expert suffix로 넣을 때의 비교 (논문 Table 11 캡처)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-smolvla-vla-primer/fig03.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig03.png
    caption: "layer skipping 설명에서 다시 인용한 논문 Figure 1. fig01과 동일 파일이다"
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
    caption: "cross-attention과 self-attention, CA+SA 비교 (논문 Table 6 캡처)"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-smolvla-vla-primer/fig07.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig07.png
    caption: "action 토큰 attention mask의 causal과 bidirectional 비교 (논문 Table 7 캡처)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-smolvla-vla-primer/fig08.png
    raw: raw/articles/jo-2026-smolvla-vla-primer-figures/fig08.png
    caption: "RobotClient와 PolicyServer로 갈라놓은 asynchronous inference 구조 (논문 Figure 2 캡처)"
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
    caption: "SO100 실제 기기 벤치마크 (논문 Table 3 캡처)"
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
    caption: "single-task와 multi-task, community dataset pre-training 비교 (논문 Table 5 캡처)"
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

## 한 줄 요약 (One-line Summary)

"무엇을 줄였고 무엇은 남겼는가". "모두의 로보틱스 - VLA 입문" 시리즈의 열 번째 글이 SmolVLA를 이 질문으로 다시 배열해 한국어로 풀어 썼다.

## 1. 자료 정보 (Document Information)

- 제목: 03-10. SmolVLA - 모두의 로보틱스 - VLA 입문
- 저자: 조인령
- 게시: wikidocs.net/366376
- 원본: `raw/articles/jo-2026-smolvla-vla-primer.md`
- 시리즈: [[physical-ai/jo-2026-rt-1-vla-primer]], [[physical-ai/jo-2026-rt-2-vla-primer]], [[physical-ai/jo-2026-act-vla-primer]], [[physical-ai/jo-2026-openvla-vla-primer]], [[physical-ai/jo-2026-pi-0-6-vla-primer]]와 같은 연재의 03장

배경 → 모델 구조 → 결과 → 한계점 → 정리. 다섯 장 구성이고 시리즈의 다른 글들과 틀이 같다. 다만 이번에는 배경지식 장(Ⅱ)이 빠졌다. flow matching과 action expert를 이미 03-07(π0)과 03-08(π0.5)에서 다뤘다며 해당 편 링크로 대신했기 때문이다. 도식은 전부 논문 figure와 table을 그대로 캡처했다. 저자가 빨간 테두리를 그려 넣은 것은 그중 하나뿐이다.

## 2. 주요 기여 (Key Contributions)

state를 어디에 넣을지 설명하고 Table 11, layer skipping을 설명하고 Table 8, attention 배치를 설명하고 Table 6과 7. 이렇게 붙여 나간다. 논문은 구조를 먼저 나열한 뒤 ablation을 부록 표로 미뤄 두는데 이 글은 구조 선택 하나를 설명한 직후 그 선택을 뒷받침하는 표를 곧바로 붙인다. 원 논문을 요약하는 대신 읽는 순서를 바꾼 셈이다. 논문 본문에서라면 페이지를 오가야 했을 부분이 여기서는 한 흐름으로 이어진다.

효율성과 접근성, 재현성. 이 세 키워드를 먼저 세우고 모든 설계를 거기에 다시 연결하는 것도 이 글의 편집이다. 저자가 SmolVLA를 읽는 올바른 질문으로 제시하는 것은 "어떤 정보는 유지했고, 어떤 계산은 줄였으며, 어떤 실행 구조를 새로 설계했는가"다. "파라미터 수가 작다"에서 거기로 질문을 옮긴다.

action queue는 "앞으로 실행할 행동이 몇 개 정도 미리 준비되어 있는가"로 풀었고 observation filtering은 "같은 장면을 거의 반복해서 또 해석하지 않도록 하는 장치"로 설명한다. 입문자용 비유가 곳곳에 붙어 있다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 두 덩어리로 나눈 구조

SmolVLA는 두 덩어리다. 이미지와 언어, 로봇 상태를 이해하는 compact pretrained VLM이 하나, 그 feature를 받아 action chunk를 만드는 action expert가 다른 하나. action chunk란 미래 여러 스텝의 action을 한 묶음으로 한 번에 예측한 결과를 말한다. backbone에는 SmolVLM-2, 시각 인코더에는 SigLIP, 언어 decoder에는 SmolLM2 계열을 적어 두었다. 여기서 VLM의 역할은 텍스트 생성이 아니다. 로봇이 현재 상황을 이해하도록 feature를 만들어 준다고 분명히 해 둔다.

입력 → 처리 → 출력 6단계를 표로 정리해 두고 구조 선택을 하나씩 따라간다.

### state token은 prefix로

로봇의 sensorimotor state는 linear layer로 토큰 차원을 맞춰 visual 토큰, language 토큰과 함께 VLM으로 들어간다. 근거는 Table 11이다. state를 action expert 쪽에 suffix로 붙이는 것보다 VLM 쪽 prefix로 넣는 편이 나았다는 결과다. 저자는 이를 "로봇의 상태를 행동 생성 직전에 덧붙이는 것보다 이미지와 언어를 해석하는 단계부터 함께 넣는 편이 유리하다"로 옮긴다.

### visual token reduction과 layer skipping

image tiling부터 껐다. SmolVLM-2가 지원하는 기능인데 쓰지 않고 global image만 쓴다. pixel shuffle까지 적용해 프레임당 visual 토큰은 64개로 묶었다. 정보 손실 가능성은 인정한다. 다만 목표가 이미지 이해 벤치마크 점수에 있지 않고 실시간 제어에 있다는 점을 근거로 든다.

layer skipping은 Figure 1의 가위 아이콘이 가리키는 설계다. VLM의 마지막 L−N개 층을 버리고 N = L/2 정도를 속도와 성능의 균형점으로 잡았다. Table 8을 보면 256M짜리 작은 VLM을 통째로 쓰는 것보다 큰 VLM의 앞쪽 층만 쓰는 편이 낫다. 저자는 이를 "단순한 가지치기가 아니라 필요한 표현은 유지하면서 계산만 줄이는 방식"으로 읽는다.

### action expert의 attention 배치

action expert 쪽은 cross-attention과 self-attention을 번갈아 쌓는 구조다. cross-attention이 VLM feature를 참조하고 self-attention이 action 토큰끼리 흐름을 맞춘다. 이 역할 분담을 표로 정리한다. Table 6에서 CA+SA가 CA 단독과 SA 단독을 모두 앞섰다. Table 7에서는 미래 action까지 참조하는 bidirectional보다 과거 토큰만 보는 causal이 나았다. 붙는 해석은 "action chunk는 미래를 미리 훔쳐보며 만들어지는 것이 아니라 시간 순서에 맞춰 자연스럽게 이어져야 한다"이다.

### asynchronous inference

synchronous inference에서는 예측과 실행이 순차적이라 로봇이 다음 action을 기다리는 구간이 생긴다. SmolVLA는 실행과 추론을 RobotClient와 PolicyServer로 나눠 겹쳐 실행한다. 이 글이 분량을 가장 많이 쓰는 대목이기도 하다.

먼저 로봇이 observation o0를 보낸다. 서버는 n개짜리 action chunk를 계산하고 로봇은 그중 k≤n개를 먼저 실행한다. 움직이는 도중 새 observation ok를 다시 보낸다. 새 chunk가 오면 queue에 남은 action과 합쳐 갱신한다. 동작 순서를 이렇게 네 단계로 풀어 썼다.

남은 action 비율 |At|/n이 queue threshold g보다 작아지면 새 추론이 시작된다. g가 작을수록 순차적으로 동작하고 클수록 자주 observation을 보내며 반응적으로 동작한다. Figure 3의 세 곡선도 같은 기준으로 읽힌다. g=0.0은 채웠다 바닥나기를 반복하고, g=0.7은 바닥까지 떨어지지 않는 타협점이며, g=1.0은 높은 수준을 유지한다. 다만 g=1.0이 새 observation 변화에 덜 민감해질 가능성도 함께 짚었다. observation filtering은 joint-space에서 거의 같은 상태면 처리를 건너뛰는 장치다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

수치부터 보면 ACT 평균 48.3%, π0 61.7%에 비해 SmolVLA 0.45B가 78.3%다. Table 3의 SO100 결과다. 다만 과제별로 내려가면 Pick-Place에서는 π0가 100%로 앞서고 SmolVLA는 75%에 그친다. Stacking 90%, Sorting 70%로 나머지 둘에서는 앞섰다. 저자의 정리는 "모든 task에서 항상 최고인 모델이라기보다 작은 모델임에도 안정적인 평균 성능을 내는 모델"이다.

Table 4는 SO101을 학습 분포 안팎으로 나눈다. ACT가 70%/40%, SmolVLA 0.45B가 90%/50%다. 분포 밖 50%는 성과이자 한계로 동시에 읽었다. 더 다양한 데이터와 넓은 embodiment 학습이 필요하다는 말도 덧붙는다. embodiment는 로봇의 물리적 형상과 그에 딸린 제어 API 구성을 뜻한다.

single-task 40% → multi-task 51.7% → community dataset pre-training까지 더하면 78.3%. Table 5의 community dataset 효과를 가장 크게 다룬다. "성능이 모델 구조만으로 나온 것이 아니다"라는 문장이 여기 붙는다.

Figure 5의 sync와 async 비교는 성공률 대신 속도로 읽는다. 성공률만 놓고 보면 78.3% 대 73.3%로 async가 오히려 낮다. 그런데 Pick-Place 완료 시간은 13.75초에서 9.70초로 줄고 고정 시간 안에 처리한 cube는 9개에서 19개로 는다. 결론은 "로봇은 정답 행동을 생성하는 것만으로 충분하지 않고, 그 행동을 제때 생성해 끊기지 않게 실행해야 한다"이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

한계 장은 결과 장만큼 길고 항목은 다섯이다.

먼저 걸리는 것이 데이터 출처다. pre-training 데이터가 주로 SO100 계열에서 모인 것이라 cross-embodiment 데이터로 보기 어렵다. 이를 SmolVLA만의 약점으로 두지 않고 로봇 데이터를 인터넷에서 수집할 수 없는 VLA 연구 전체의 문제로 규정한다.

규모도 문제다. 약 2만 3천 개 trajectory로 학습했다. OpenVLA의 약 100만 개 trajectory와 비교하면 작은 규모다. 다양한 물체와 환경, 지시, long-horizon 과제, 새 플랫폼으로 확장할 때 각각 왜 더 많은 데이터가 필요한지를 표로 붙였다.

backbone 적합성도 짚는다. 일반 VLM은 이미지 설명과 문서 이해, OCR, 시각 질의응답에 맞춰 학습된다. 반면 로봇에 필요한 것은 잡을 수 있는 위치와 방향, affordance, 언어 지시의 action 변환, 접촉 결과 예측, 시간에 따른 상태 변화 이해다. 이 둘을 표로 대조한다. affordance는 물체가 허용하는 상호작용 가능성을 뜻한다.

long-horizon 과제로 가면 사정이 다르다. Pick-Place와 Stacking, Sorting은 짧은 조작 과제다. 책상 정리, 냉장고에서 음료 꺼내 컵에 따르기, 순서대로 조립하기 같은 작업이라면 계층적 policy, 장기 메모리, 실패 감지, 고수준 planning, human feedback이 더 필요하다고 본다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. asynchronous inference가 반응성을 높이기는 하지만 long-horizon 과제에서는 속도만으로 부족하다는 조건도 덧붙였다.

마지막은 학습 방식이다. imitation learning은 시연 데이터(demonstration)를 흉내 내 policy를 학습하는 방법인데 시연에 없는 상황에서 복구하기 어렵고 시연의 편향까지 함께 배운다. 물체가 늘 작업대 중앙에 있던 데이터로 배우면 가장자리에서 성능이 떨어진다. 그런 예를 든다. 강화학습이나 self-improvement가 대안이지만 실패 비용과 하드웨어 손상 위험 때문에 실제 기기 적용이 쉽지 않다는 점도 함께 적었다.

## 6. 관련 연구 (Related Work)

원 논문은 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]]에 따로 정리해 두었다. 이 글이 인용하는 수치와 도식은 모두 거기서 나왔다.

본문은 flow matching과 action expert 설명을 03-07(π0)과 03-08(π0.5)로 넘기고 self-attention을 02-1-3(Transformer)로, SigLIP을 02-3-1(CLIP과 SigLIP)로 보낸다. 셋 다 이 wiki에는 아직 없는 시리즈 편이다. π0 논문 자체는 [[physical-ai/black-2024-pi0-a-vision-language-action-flow-model]]에 있다.

비교 대상으로 등장하는 ACT는 [[physical-ai/jo-2026-act-vla-primer]]에, OpenVLA는 [[physical-ai/jo-2026-openvla-vla-primer]]와 [[physical-ai/kim-2024-openvla-an-open-source-vision-language-action-model]]에 있다. 마지막 문단이 권하는 실습 경로는 [[physical-ai/huggingface-lerobot]]으로 이어진다.

## 7. 용어집 (Glossary)

- **compact pretrained VLM**: 이 글이 SmolVLM-2를 가리킬 때 쓰는 표현. 작게 만든 것과 미리 학습된 것을 한 낱말로 묶었다.
- **image tiling**: 고해상도 이미지를 여러 crop으로 쪼개 함께 처리하는 방식. SmolVLA는 이걸 끄고 global image만 쓴다.
- **pixel shuffle**: 프레임당 visual 토큰을 64개로 줄이는 데 쓰는 연산.
- **queue threshold (g)**: 남은 action 비율이 이 값 아래로 떨어지면 다음 추론을 거는 기준.
- **observation filtering**: joint-space에서 거의 같은 상태의 observation을 건너뛰는 장치.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | SmolVLA 전체 구조 (논문 Figure 1 캡처) | fetched | (중복, 논문 쪽 fig01 사용 권장) |
| fig02 | state prefix vs suffix (논문 Table 11 캡처) | fetched | (중복, 논문 쪽 tab11) |
| fig03 | fig01과 동일 파일 재게시 | fetched | (제외, 중복 파일) |
| fig04 | 층 잘라내기 결과 (논문 Table 8 캡처) | fetched | (중복, 논문 쪽 tab08) |
| fig05 | Figure 1에 action expert만 빨간 테두리 표시 | fetched | ★ wiki 권장 (저자 주석이 들어간 유일한 도식) |
| fig06 | CA/SA 비교 (논문 Table 6 캡처) | fetched | (중복, 논문 쪽 tab06) |
| fig07 | causal vs bidirectional (논문 Table 7 캡처) | fetched | (중복, 논문 쪽 tab07) |
| fig08 | async inference 구조 (논문 Figure 2 캡처) | fetched | (중복, 논문 쪽 fig02) |
| fig09 | action queue 변화 (논문 Figure 3 캡처) | fetched | (중복, 논문 쪽 fig03) |
| fig10 | SO100 벤치마크 (논문 Table 3 캡처) | fetched | (중복, 논문 쪽 tab03) |
| fig11 | SO101 OOD (논문 Table 4 캡처) | fetched | (중복, 논문 쪽 tab04) |
| fig12 | community pre-training (논문 Table 5 캡처) | fetched | (중복, 논문 쪽 tab05) |
| fig13 | sync vs async (논문 Figure 5 캡처) | fetched | (중복, 논문 쪽 fig05) |
| fig14 | 전체 페이지 스크린샷 | screenshot | (선택) |

fig01~fig13은 전부 논문 figure와 table을 영문 캡션째로 캡처했다. 원본 크롭은 [[physical-ai/shukor-2025-smolvla-a-vision-language-action-model]] 쪽이 더 깨끗하다. 이 글에서만 볼 수 있는 것은 fig05뿐이다. 저자가 action expert 블록에 빨간 테두리를 그려 넣었다. fig03은 fig01과 바이트 단위로 같은 파일이다.
