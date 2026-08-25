---
title: "π*0.6: a VLA that Learns from Experience"
type: article
year: 2025
category: physical-ai
source: physical-intelligence-2025-a-vla-that-learns-from.md
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

## 요약 (Summary)

[[physical-ai/amin-2025-pistar06-a-vla-that-learns|π*0.6 논문]]과 같은 날 올라온 공식 발표문이다. 수식과 ablation은 논문 쪽에 뒀다. 여기서는 문제의식을 비유로 풀고 배치 영상을 전면에 세운다.

첫 장면은 상자 조립을 배우는 사람이다. 먼저 누군가에게 기본기를 배운다. 직접 해 보다 틀리면 코치가 고쳐 준다. 그다음은 몸에 밸 때까지 혼자 연습하는 일이다. 저자들은 지난 1년의 로봇 학습 성과가 대부분 첫 단계에만 기대 왔다고 진단한다. demonstration만으로는 절반쯤 성공시키기는 쉬워도 매번 성공시키기는 어렵다.

에스프레소는 새벽 5시 30분부터 밤 11시 30분까지 하루 종일 돌렸다. 처음 가 보는 집에서는 새 빨래 50종을 갰다. 초콜릿 포장용 상자 59개는 실제 공장에서 조립하고 라벨까지 붙였다. 이런 배치 규모 서술이 논문에 없는 이 글의 고유한 값이다. 무편집 실시간 영상은 [별도 재생목록](https://www.youtube.com/playlist?list=PLAhKUlcpD-aRObglQ5mRhWc9757ykD_Ae)으로 걸려 있다.

## 논문이 압축한 부분을 풀어 쓴 대목 (What This Post Expands)

### compounding error를 왜 imitation으로 못 고치나

VLA도 다른 모델처럼 작은 실수를 한다. 그리퍼를 엉뚱한 곳에 놓거나 집기를 놓치거나 물건을 넘어뜨린다. 그런데 로봇은 실제 물리 환경과 맞물려 있다. 그 실수가 학습 데이터에 없던 상황을 만들고 거기서 더 큰 실수가 나온다. 작은 실수는 고칠 수 있지만 누적된 실수는 실패로 간다.

LLM처럼 정적인 출력을 내는 시스템에는 이 문제가 없다는 대비가 이어진다. 환경과 계속 주고받는 제어 policy에만 생기는 병목이다. 논문이 DAgger 인용 한 줄로 처리한 논지를 여기서는 문단 셋을 들여 설명한다.

해결의 실마리는 VLA 자신의 실행 데이터에 있다. 다만 그 데이터를 그대로 흉내 내게 하면 실수까지 따라 배운다. 나쁜 experience에서 좋은 학습 신호를 뽑아내는 일이 관건이라고 정리한다.

### credit assignment를 체스로 설명한다

에스프레소 머신의 포터필터를 잘못 쥐면 나중에 장착에서 실패한다. 진짜 실수는 장착이 아니라 처음의 grasp에 있다. credit assignment는 실패가 뒤늦게 드러나도 원인이 된 앞선 action을 짚어내는 문제다.

value function은 체스에 빗대어 등장한다. 현재 판세로 승률을 예측하는 모델에 가깝다고 설명한다. value가 오르는 방향의 action이 좋은 action이고, 내려가는 방향이 나쁜 action이다. 슬라이더로 episode 진행에 따른 value 예측을 짚어 보는 인터랙티브 시각화도 붙어 있다. 논문 Figure 4의 정적 판본에 해당한다.

### 데이터를 버리지 않는 이유

좋은 데이터만 걸러 쓰는 대신 전부 학습에 넣되 어느 action이 좋고 나쁜지를 입력으로 알려 준다. 모델은 데이터가 많을수록 일반화가 잘 되니 버리지 않는 쪽이 낫다. policy extraction을 advantage conditioning으로 처리하는 근거를 논문보다 직설적으로 적은 대목이다.

### 코칭의 한계를 미리 인정한다

코칭은 사람이 개입 시점을 알아채고 좋은 교정을 줄 수 있는 만큼만 유효하다. 눈에 띄는 큰 실수에는 잘 듣는다. 다만 빠르고 일관되게 해내는 수준까지 가려면 로봇이 스스로 다듬어야 한다. 연습 없이 종목을 마스터하는 운동선수는 없다는 비유가 붙는다.

## 논문과 다르게 읽히는 정보 (Details Unique to the Post)

블로그는 π0.6 VLA를 "5B 규모 vision-language model에 action expert를 붙인" 구성으로 소개한다. 논문은 backbone을 Gemma 3 4B로, action expert를 860M으로 따로 적는다. 블로그 쪽 숫자가 둘을 합친 값으로 보인다. π0.6 아키텍처 서술이 논문과 미묘하게 다른 지점이다. 상세는 양쪽 모두 별도 model card로 넘긴다.

침구 정리, 양초 켜기, 고양이 화장실 청소, 커피 만들기, 상자 조립, 주방 청소, 전구 교체, 식탁 치우기. pre-training 데이터로 나열된 과제 목록도 여기에만 있다. 목록만 봐도 π0.6의 범위가 가늠된다.

납작한 골판지가 서로 붙어 여러 장이 딸려 오면 여분을 다시 내려놓는다. 접다 실수하면 다시 접는다. 그런 장면이 실제 영상에 나온다고 적는다. 에스프레소는 액체를 붓고 분쇄기와 머신의 대기 시간을 가늠하며 마지막에 행주로 청소까지 한다. 과제별 난점 서술도 논문보다 구체적이다.

## 마지막 절이 내다보는 방향 (Where They're Headed)

지금의 로봇 foundation model은 사람이 teleoperation으로 모은 demonstration에 주로 기댄다. 학습은 단순해지지만 데이터에 사람 손이 든다. 속도와 안정성도 사람 수준에 묶인다. 로봇이 experience로 나아지지도 않는다.

저자들이 내다보는 구도에서는 데이터 원천마다 역할이 갈린다. 새 행동을 정의하는 쪽은 전문가 demonstration이다. 코칭이 전략을 다듬고 세부는 자율 experience가 완성한다. 그중 자율 experience가 가장 큰 데이터 원천이 되어 언젠가 사람을 넘어서는 성능까지 갈 수 있으리라 본다. 실제 배치로 데이터를 모으는 기업과의 협업 제안이 그 문단 바로 뒤에 붙는다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

Physical Intelligence는 논문과 블로그를 같은 날 내는 패턴을 유지한다. [[physical-ai/physical-intelligence-2024-our-first-generalist-policy|π0 블로그]]와 [[physical-ai/physical-intelligence-2025-a-vla-with-open-world|π0.5 블로그]]가 앞선 사례다. 앞의 두 편이 논문에 없는 수치를 흘리는 쪽이었다면 이 글은 배치 규모와 영상 쪽에 비중이 크다.

세 블로그를 순서대로 읽으면 회사가 대중에게 무엇을 강조해 왔는지가 보인다. π0는 하나의 policy로 여러 로봇을 굴린다는 점을 앞세웠고, π0.5는 학습에 없던 집을 내세웠다. π*0.6이 앞세우는 것은 하루 종일 끊기지 않는 실행이다. 데모의 축이 능력에서 안정성으로 옮겨 간 셈이다.

본문 도식이 전부 자동재생 영상과 인터랙티브 위젯이라 정지 이미지로 잡히지 않았다. 수집 시점의 제약이라 여기 적어 둔다. 같은 내용의 정적 도식은 논문 쪽 `fig01`·`fig03`·`fig04`·`fig07`·`fig08`에 있으니 도식이 필요하면 그쪽을 본다.

## 관련 페이지 (Related Pages)

- [[physical-ai/amin-2025-pistar06-a-vla-that-learns]] — 같은 날 공개된 논문. 수식 유도·ablation·평가 기준이 여기에 있다
- [[physical-ai/jo-2026-pi-0-6-vla-primer]] — 한국어 입문 해설. 강화학습 기초부터 RECAP 수식까지 풀어 쓴다
- [[physical-ai/physical-intelligence-2025-a-vla-with-open-world]] — π0.5 블로그. 같은 형식의 직전 발표문
- [[physical-ai/physical-intelligence-2024-our-first-generalist-policy]] — π0 블로그. 이 형식의 첫 사례
- [[physical-ai/black-2025-pi05-a-vision-language-action-model-with]] — π0.6의 바탕이 된 모델
- [[physical-ai/physical-intelligence-openpi]] — π 계열 레퍼런스 구현
- [[overviews/physical-ai-overview]] — 도메인 허브
