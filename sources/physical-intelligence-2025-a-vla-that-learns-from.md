---
title: "π*0.6: a VLA that Learns from Experience"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/physical-intelligence-2025-a-vla-that-learns-from.md
raw_filename: "physical-intelligence-2025-a-vla-that-learns-from.md"
source_collection: external
author: "Physical Intelligence"
url: "https://www.pi.website/blog/pistar06"
publisher: "www.pi.website"
publication_date: "2025-11-17"
fetched_at: "2026-08-25T09:43:59+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, rl-control, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/physical-intelligence-2025-a-vla-that-learns-from/page-full.png
    raw: raw/articles/physical-intelligence-2025-a-vla-that-learns-from-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

π*0.6 논문의 공식 발표 글이다. RECAP을 "교육 → 코칭 → 연습"이라는 사람의 학습 순서에 빗대 설명한다. 하루 종일 에스프레소를 뽑고 새 집에서 빨래를 개는 배치 영상도 함께 공개했다.

## 1. 자료 정보 (Document Information)

- 제목: π*0.6: a VLA that Learns from Experience
- 저자: Physical Intelligence (논문과 동일한 57인 공저)
- 게시: 2025년 11월 17일, https://www.pi.website/blog/pistar06
- 원본: `raw/articles/physical-intelligence-2025-a-vla-that-learns-from.md`
- 함께 공개된 자료: [π*0.6 논문 PDF](https://www.pi.website/download/pistar06.pdf), [π0.6 model card](https://website.pi-asset.com/pi06star/PI06_model_card.pdf), [실시간 배치 영상 재생목록](https://www.youtube.com/playlist?list=PLAhKUlcpD-aRObglQ5mRhWc9757ykD_Ae)

[[physical-ai/amin-2025-pistar06-a-vla-that-learns]] 논문의 대중용 판본이다. 수식과 ablation은 논문 쪽 몫이고 여기서는 문제의식과 배치 결과를 비유로 풀어 놓았다. 본문 도식은 대부분 자동재생 영상이라 정지 이미지로 남지 않았다.

## 2. 주요 기여 (Key Contributions)

첫 장면은 상자 조립을 배우는 사람이다. 먼저 누군가에게 기본기를 배운다. 직접 해 보다 틀리면 코치가 고쳐 준다. 그다음은 몸에 밸 때까지 혼자 연습하는 일이다. 저자들은 지난 1년의 로봇 학습 성과가 대부분 첫 단계에만 기대 왔다고 진단한다. demonstration만으로는 절반쯤 성공시키기는 쉬워도 매번 성공시키기는 어렵다.

세 단계를 모두 구현한 방법으로 RECAP을 내놓는다. π0.6에 이를 적용한 모델이 π*0.6이다. 에스프레소 음료와 상자 조립, 다양한 빨래 개기를 수행한다. 어려운 과제에서 throughput이 두 배 이상 오르고 실패율은 절반 이하로 떨어졌다. 이 요약은 논문과 같다.

에스프레소는 새벽 5시 30분부터 밤 11시 30분까지 하루 종일 돌렸다. 처음 가 보는 집에서는 새 빨래 50종을 갰다. 초콜릿 포장용 상자 59개는 실제 공장에서 조립하고 라벨까지 붙였다. 이런 배치 규모 서술이 논문에 없는 이 글의 고유한 정보다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### imitation만으로 부족한 이유

imitation learning으로 학습한 VLA도 다른 모델처럼 작은 실수를 한다. 그리퍼를 엉뚱한 곳에 놓거나 집기를 놓치거나 물건을 넘어뜨린다. 그런데 로봇은 실제 물리 환경과 맞물려 있다. 그 실수가 학습 데이터에 없던 상황을 만들고 거기서 더 큰 실수가 나온다. 작은 실수는 고칠 수 있지만 누적된 실수는 실패로 간다. compounding error를 평이하게 풀어 쓴 대목이다.

LLM처럼 정적인 출력을 내는 시스템에는 이 문제가 없다는 대비가 이어진다. 환경과 계속 주고받는 제어 policy에만 생기는 병목이다.

해결의 실마리는 VLA 자신의 실행 데이터에 있다. 다만 그 데이터를 그대로 흉내 내게 하면 실수까지 따라 배운다. 나쁜 experience에서 좋은 학습 신호를 뽑아내는 일이 관건이라고 정리한다.

### 코칭과 연습

RECAP은 두 갈래로 그 신호를 얻는다. 코칭에서는 전문가가 로봇이 실제로 저지른 실수를 보고 어떻게 복구하는지 보여 준다. 원래 policy를 학습시킨 demonstration과 달리 이 개입은 policy가 스스로 만들어낸 상황에서 주는 감독이다. 그래서 compounding error를 직접 겨냥한다.

나머지 한 갈래가 강화학습이다. 코칭은 사람이 개입 시점을 알아채고 좋은 교정을 줄 수 있는 만큼만 유효하다. 눈에 띄는 큰 실수에는 잘 듣는다. 다만 빠르고 일관되게 해내는 수준까지 가려면 로봇이 스스로 다듬어야 한다.

### credit assignment와 value function

에스프레소 머신의 포터필터를 잘못 쥐면 나중에 장착에서 실패한다. 진짜 실수는 장착이 아니라 처음의 grasp에 있다. 강화학습의 핵심 난제로 드는 credit assignment가 이런 상황을 가리킨다. 어떤 action이 좋은 결과를 만들었고 어떤 action이 나쁜 결과를 불렀는지 가려내는 문제다.

이 문제를 푸는 도구가 value function이다. 체스에 빗대어 현재 판세로 승률을 예측하는 모델이라고 설명한다. value가 오르는 방향의 action이 좋은 action이고, 내려가는 방향이 나쁜 action이다. 슬라이더로 episode 진행에 따른 value 예측을 살펴보는 인터랙티브 시각화도 붙어 있다.

policy extraction은 advantage conditioning으로 처리한다. 좋은 데이터만 걸러 쓰는 대신 전부 학습에 넣되 어느 action이 좋고 나쁜지를 입력으로 알려 준다. 데이터가 많을수록 일반화가 잘 되니 버리지 않는 쪽이 낫다는 논리다. 실행할 때 advantage가 높은 action을 하라고 지시하면 학습 데이터보다 나은 policy가 나온다.

### π0.6 모델

π*0.6의 바탕인 π0.6은 π0.5를 다듬은 모델이다. backbone이 조금 커졌고 이질적인 프롬프트와 조건 정보를 더 받아들인다. 글은 π0.6 VLA를 5B 규모 vision-language model에 action expert를 붙인 구성으로 소개한다. 프롬프트에는 텍스트 명령 외에 실행 품질 주석도 들어간다. RECAP에서는 원하는 advantage까지 붙는다. 상세 아키텍처는 별도 model card로 넘긴다.

침구 정리, 양초 켜기, 고양이 화장실 청소, 커피 만들기, 상자 조립, 주방 청소, 전구 교체, 식탁 치우기. pre-training 데이터로 붙은 과제 예시다. 목록만 봐도 π0.6의 범위가 드러난다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

막대그래프 네 쌍이 π0.6 pre-train, π*0.6 offline RL pre-train, π*0.6 offline RL + SFT, 최종 π*0.6을 비교한다. 논문의 Figure 7·8과 같은 데이터다. 에스프레소처럼 어려운 과제에서 throughput과 성공률이 모두 두 배 넘게 오른다.

과제마다 난점이 다르다. 상자 조립은 접는 동안 상자를 붙잡고 있어야 해서 물리적으로 까다롭다. 납작한 골판지가 서로 붙어 여러 장이 딸려 오거나 접다 실수해 다시 접어야 하는 예외 상황도 실제로 영상에 나온다. 빨래는 초기 상태와 옷 종류가 제각각인 데다 원단마다 dynamics가 달라 어렵다. 에스프레소는 매우 긴 horizon 과제라 π0.5처럼 high-level 언어 policy를 쓴다. 액체를 붓고 분쇄기와 머신의 대기 시간을 가늠하며 마지막에 행주로 청소까지 한다. 이 셋 모두에서 π*0.6이 90%를 넘는 성공률을 낸다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

지금의 로봇 foundation model은 사람이 teleoperation으로 모은 demonstration에 주로 기댄다. 학습은 단순해지지만 데이터에 사람 손이 든다. 속도와 안정성도 사람 수준에 묶인다. 로봇이 experience로 나아지지도 않는다. 마지막 절은 여기서 데이터 원천의 미래를 다룬다.

저자들이 내다보는 구도에서는 데이터 원천마다 역할이 갈린다. 새 행동을 정의하는 쪽은 전문가 demonstration이다. 코칭이 전략을 다듬고 세부는 자율 experience가 완성한다. 그중 자율 experience가 가장 큰 데이터 원천이 되어 언젠가 사람을 넘어서는 성능까지 갈 수 있으리라 본다.

말미에는 실제 배치로 데이터를 모으는 기업과의 협업 제안과 채용 안내가 붙는다.

## 6. 관련 연구 (Related Work)

compounding error 설명에는 DAgger 논문(Ross et al., arXiv 1011.0686)을 걸었다. 모델 계보로는 π0.5 블로그 글을, 아키텍처 상세로는 π0.6 model card를 가리킨다. 본문이 직접 거는 링크는 이 셋이다.

## 7. 용어집 (Glossary)

- **Recap**: 블로그 표기는 첫 글자만 대문자다. 논문에서는 RECAP으로 적는다. RL with Experience & Corrections via Advantage-conditioned Policies의 약어.
- **coaching (코칭)**: 자율 실행 중 전문가가 teleoperation으로 넘겨받아 실수를 교정하는 일을 이 글이 부르는 이름. 논문의 intervention에 해당한다.
- **credit assignment**: 결과의 공과를 어느 action에 돌릴지 가려내는 강화학습의 난제. 실패가 뒤늦게 드러나도 원인이 된 앞선 action을 짚어내야 한다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 전체 페이지 스크린샷 | screenshot | (선택) |

본문 도식이 전부 자동재생 영상과 인터랙티브 위젯이라 정지 이미지로 잡히지 않았다. 같은 내용의 정적 도식은 논문 쪽 `fig01`·`fig03`·`fig07`·`fig08`에 있으므로 wiki에서는 그쪽을 참조한다.
