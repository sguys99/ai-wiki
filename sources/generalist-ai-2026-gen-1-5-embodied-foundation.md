---
title: "GEN-1.5: Embodied Foundation Models are One-Shot Learners"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation.md
raw_filename: "generalist-ai-2026-gen-1-5-embodied-foundation.md"
source_collection: external
author: "Generalist AI"
url: "https://generalistai.com/blog/gen-1.5"
publisher: "Generalist AI Blog"
fetched_at: "2026-08-29T14:31:11+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, imitation-learning, manipulation]
figures:
  - id: fig01
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/fig01.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/fig01.png
    caption: "GEN-1.5 표지 프레임 — 양팔 로봇의 작업 장면"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/page-full.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px)"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop01.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop01.png
    caption: "Figure 1. 언어 모델의 one-shot 프롬프트와 embodied 모델의 physical prompt 대비"
    strategy: crop
    curated: true
  - id: fig04
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop02.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop02.png
    caption: "physical prompt(좌)와 model rollout(우) 나란히 보기 — 유리병 뚜껑 돌려 열기"
    strategy: crop
    curated: true
  - id: fig05
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop03.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop03.png
    caption: "Figure 2. 10개 과제별 성공률 — 10 gradient step 대 in-context learning"
    strategy: crop
    curated: true
  - id: fig06
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop04.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop04.png
    caption: "Figure 3. 8개월 pre-training 곡선 — 3단계에 걸친 next action prediction error 감소"
    strategy: crop
    curated: true
  - id: fig07
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop05.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop05.png
    caption: "physical prompt engineering 인터페이스 녹화 (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop06.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop06.png
    caption: "physical prompt A + B 합성 (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop07.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop07.png
    caption: "zero-shot sim2real — 시뮬레이션 prompt와 실기기 rollout (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop08.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop08.png
    caption: "human-to-robot in-context learning (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop09.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop09.png
    caption: "Figure 4. 과제별 가중치 이동 방향의 MDS 임베딩 (데이터 점 미렌더 — 축만 남음)"
    strategy: crop
    low_confidence: true
    curated: false
  - id: fig12
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop10.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop10.png
    caption: "즉흥 행동 3종 캡션 묶음 (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig13
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop11.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop11.png
    caption: "바나나를 즉석 브러시로 사용해 블록을 그릇에 쓸어 넣는 rollout"
    strategy: crop
    curated: true
  - id: fig14
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop12.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop12.png
    caption: "블록 여러 개를 한꺼번에 그릇에 쓸어 넣는 rollout"
    strategy: crop
    curated: false
  - id: fig15
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop13.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop13.png
    caption: "한쪽 손만 시연했는데 양손 모두로 쓸어 넣는 rollout"
    strategy: crop
    curated: false
  - id: fig16
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop14.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop14.png
    caption: "fine-tuning 데이터와 model rollout 비교 (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig17
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop15.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop15.png
    caption: "손끝에 낀 레고 블록을 반대 손으로 떼어내는 rollout"
    strategy: crop
    curated: false
  - id: fig18
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop16.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop16.png
    caption: "한 손 시연을 양손 협응으로 바꿔 뚜껑을 여는 rollout (영상 — 프레임 미렌더)"
    strategy: crop
    curated: false
  - id: fig19
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop17.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop17.png
    caption: "블록 하나만 담도록 fine-tuning했는데 색·종류별로 분류하는 rollout"
    strategy: crop
    curated: true
  - id: fig20
    file: assets/generalist-ai-2026-gen-1-5-embodied-foundation/crop18.png
    raw: raw/articles/generalist-ai-2026-gen-1-5-embodied-foundation-figures/crop18.png
    caption: "유리병으로 학습한 뚜껑 열기가 병·컵·용기로 확장되는 rollout 4종"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

Generalist AI의 로봇 foundation model GEN-1.5는 3~12초짜리 시연 하나를 context window에 넣기만 하면 새 조작 과제를 평균 59% 성공률로 수행한다. 이 in-context learning 능력은 8개월 이상 이어진 pre-training에서 별도 설계 없이 나타났다.

## 1. 자료 정보 (Document Information)

Generalist AI가 2026년 8월 자사 블로그에 올린 모델 발표 글이다. 같은 팀의 GEN-0(scaling law 확인)과 GEN-1(post-training으로 99%+ 성공률 도달, 즉흥 행동의 초기 징후)에 이은 세 번째 공개다. 논문이 아니라 영상 데모 중심의 기술 블로그다. 정량 결과는 Figure 2·3 두 개와 본문 수치로 제시되고, 나머지는 rollout 영상으로 보여준다.

GEN-1.5는 video 입력을 30초 분량 기억으로 받고 여기에 다른 센서 신호, 언어, proprioception을 함께 넣는 대형 멀티모달 모델이다. proprioception은 관절 각도 같은 로봇 자신의 상태 감각 입력을 말한다. 출력은 100Hz action trajectory다.

## 2. 주요 기여 (Key Contributions)

physical prompting이 작동한다. 저자들이 가장 앞세우는 주장이다. 언어 예시 대신 센서 데이터와 action trajectory가 붙은 sensorimotor 예시를 context window에 넣어 과제를 지시하는 방식을 physical prompting이라 부른다. 사람이 손에 쥐는 그리퍼 한 쌍으로 기록한 사람 데이터를 써도 되고 로봇 자신의 rollout을 넣어도 된다. 프롬프트가 들어가면 모델은 학습 단계 없이 바로 과제를 수행한다.

10개 과제 실험에서 pre-training된 모델을 그대로 쓴 one-shot in-context 성공률이 평균 59%였다. 표준편차는 ±10%. 여기에 gradient descent를 10스텝만 태우면 83%(±9%)로 올라간다. 이때 쓴 데이터가 과제당 5분, 시연 약 50개다. 일부 과제에서는 같은 시연 데이터로 1~5스텝 학습한 것보다 in-context 쪽이 더 좋았다.

서로 다른 과제의 physical prompt 두 개를 함께 넣으면 모델이 두 행동을 하나로 이어 붙인다. 두 시연 어디에도 없던 다시 쥐기·자세 교정 같은 중간 동작을 스스로 만들어 낸다. 시뮬레이터에서 기록한 시연을 프롬프트로 넣어 실기기를 움직이는 zero-shot sim2real도 된다. pre-training 데이터에 시뮬레이션이 한 조각도 없는데도 그렇다. 사람이 로봇 카메라 앞에서 맨손으로 시연하면 로봇이 곧바로 따라 하기도 한다. gradient descent를 태우면 1~10스텝, 데이터 1~5분으로 새 과제에 맞춰진다. 저자들이 파생 능력으로 꼽는 네 가지다.

저자들은 이 능력들 가운데 어느 것도 겨냥해 설계하지 않았다고 강조한다. in-context learning을 유도하는 구조 변경도, meta-learning 루프도, 즉흥성을 장려하는 보조 목적함수도 넣지 않았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

아키텍처 세부는 공개하지 않는다. 저자들이 비중을 두는 것은 pre-training 엔진이다. GEN-1.5의 pre-training은 GEN-1 발표와 병행해 시작해 8개월 넘게 끊지 않고 돌았다. 데이터 흡수량, 연산 대비 효율, 구조·알고리즘을 손댈 때마다 나오는 계단식 개선이 계속 좋아져서 멈출 이유가 없었다고 설명한다. 검증셋의 next action prediction error는 3개 학습 단계를 거치며 2.2×10⁻²에서 1.2×10⁻² 근처까지 내려갔다.

pre-training이 길어지면서 새 과제 적응에 필요한 gradient step 수가 수백에서 수십으로, 다시 1스텝으로 줄었다. 그 끝에서 스텝을 0으로 놓고 in-context만으로 되는지 물은 것이 이번 결과다.

physical prompt는 30초 context window의 앞부분을 차지하고 나머지는 실시간 observation으로 채워진다. pre-training은 데이터 엔진에서 뽑은 연속 구간을 무작위로 샘플링해 진행했고, 예시를 context에 미리 넣어 두는 별도 장치는 없었다. physical prompt가 만드는 시간 불연속 점프도 학습 중에는 본 적이 없다.

왜 이런 능력이 나오는지는 가설만 제시한다. 언어 모델에서 in-context learning과 연결된다고 알려진 burstiness와 Zipf 분포 구조가 물리 observation·action 분포에도 있을 수 있다는 가설이 하나다. 물리 작업에 자연히 반복 주기가 있어서 모델이 그 패턴을 감지해 이어 나가는 법을 배웠을 수 있다는 가설도 덧붙인다.

저자들은 few-step 적응을 test-time training이라 부른다. 10스텝을 태워도 held-out 과제에서 가중치 변화가 0.15% 미만이다. 새 표현을 만든다기보다 이미 있는 지식을 조금 재배치하는 데 가깝다는 해석이다. 하이퍼파라미터는 pre-training과 비슷한 값을 그대로 썼고 적응 전용 튜닝은 하지 않았다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

Figure 2의 과제별 성공률을 표로 옮긴다. 왼쪽이 10 gradient step(5분 데이터), 오른쪽이 in-context learning(12초 시연)이다.

| 과제 | 10 gradient step | in-context |
|---|---|---|
| Retrieve money from purse | 83.3% | 60.7% |
| Fold and crease paper | 69.3% | 50.0% |
| Twist lid off glass jar | 94.5% | 60.0% |
| Stack two small cups | 75.0% | 67.0% |
| Sweep trash with brush | 99.0% | 37.3% |
| Open book cover | 82.7% | 54.7% |
| Brush cube into bowl | 71.2% | 60.8% |
| Flip phone upside down | 81.0% | 78.0% |
| Unzip pencil pouch | 86.0% | 55.5% |
| Remove vacuum pad | 86.0% | 64.0% |
| **평균** | **83%** | **59%** |

극단적인 1스텝 조건에서는 데이터 1분으로 held-out 과제 66.5%가 나왔고, 배치 크기와 학습률을 키우면 더 올라갔다.

브러시로 블록을 그릇에 쓸어 넣도록 5분치 사람 시연으로 fine-tuning한 모델에 브러시 대신 바나나를 쥐어 주면 바나나를 브러시처럼 쓴다. 쓰레받기를 주면 전략 자체를 바꿔서 블록을 떠올려 그릇에 쏟는다. physical generalization은 이런 사례로만 보여주고 수치는 붙이지 않는다. fine-tuning 데이터에도, 저자들이 아는 한 pre-training 데이터에도 쓰레받기를 이렇게 쓰는 장면은 없다. 언어 안내도 주지 않았다. 가장 비슷한 pre-training 사례는 1,891,392개 장면을 언어 기반 최근접 이웃 검색으로 뒤져 찾았는데 과제와 닮은 구석이 거의 없었다.

즉흥 사례는 더 있다. 그릇을 덮은 종이를 치우고 과제를 마친 뒤 종이를 다시 덮는다. 손끝에 낀 레고 조각을 반대 손으로 떼어낸다. 한 손 시연만 봤는데 양손으로 뚜껑을 돌린다. 블록 하나 담기만 배웠는데 색이나 종류별로 분류한다. 유리병 뚜껑 열기로 fine-tuning한 모델은 처음 보는 병·테이크아웃 컵·용기로도 확장됐다.

저자들은 이 즉흥성이 fine-tuning gradient step 수가 줄수록 더 자주, 더 정교하게 나타난다고 관찰한다. 적게 손댄 모델일수록 pre-training 사전 지식에 가까이 머물러 시연에서 벗어난 상황에 쓸 수 있는 행동 레퍼토리가 넓기 때문이라고 추정한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

과제가 단순하고 short-horizon이며 성공률도 높지 않다. in-context로 익힌 기술은 fine-tuning한 모델보다 깨지기 쉽다. 여기까지는 저자들이 직접 인정하는 한계다. 다만 교란을 어느 정도 견디고 실수에서 회복하기도 한다.

능력이 왜 생겼는지도 여전히 짚어내지 못한다. 앞의 두 가설은 검증되지 않았다.

블로그여서 생기는 한계도 따로 있다. 모델 크기, 데이터 엔진의 정확한 규모와 구성, 로봇 하드웨어 사양, 평가 프로토콜(시행 횟수·초기 조건 분포·성공 판정 기준)이 공개되지 않는다. 비교 대상 baseline도 없어서 다른 VLA와 같은 축에서 견주기 어렵다. Figure 4는 과제마다 가중치가 서로 다른 방향으로 움직인다는 주장을 MDS 임베딩으로 보이려 하는데, 수집한 캡처에는 축만 남고 데이터 점이 렌더되지 않았다.

저자들이 다음 단계로 꼽는 것은 physical prompt engineering이다. 복합 과제 전체를 시연으로 모으는 대신 짧고 재사용 가능한 프롬프트 라이브러리를 조합해 긴 행동을 짠다. 언어 프롬프트에서 지시를 이어 붙이는 방식의 물리 버전이다.

## 6. 관련 연구 (Related Work)

저자들이 기준선으로 삼는 것은 GPT-3다. 언어에서 one-shot 프롬프트로 평균 45% 안팎, few-shot(예시 100개 수준)으로 65%까지 올라간 것을 in-context learning의 신호탄으로 서술한다. 그 이전 모델들도 zero-shot과 초기 few-shot의 조짐은 보였지만 폭이 좁았다고 정리한다.

로봇 계보는 1954년 Unimate 특허의 teach-by-guiding과 1970년 MIT Copy Demo까지 거슬러 올라간다. 이후 여러 연구가 시연 몇 개만 보고 일반화하는 사례를 보였다. 다만 과제 변형 범위가 좁거나 특정 물체·과제 유형·센서 방식에 묶여 있었다. 자사 이전 작업(The Robots Build Now Too)도 그 목록에 넣는다.

방법론을 견줄 때는 MAML 계열 meta-learning과 보조 목적함수 기반 skill discovery를 언급한다. 그런 장치 없이도 됐다는 점을 거기에 대비시킨다. few-step 적응은 test-time training 문헌과 잇는데, 그쪽이 보통 수십 스텝을 쓰는 데 비해 GEN-1.5는 1~10스텝이라는 차이를 짚는다. foundation model의 빠른 적응성이라는 틀 자체는 Bommasani 등의 정의를 인용한다.

자사 자료 중에서는 GEN-0(scaling law), GEN-1(mastery, 즉흥성의 초기 징후), physical commonsense 글이 반복해서 참조된다.

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| GEN-1.5 | Generalist AI의 로봇 foundation model. video 30초 기억과 센서·언어·proprioception 입력을 받아 100Hz action trajectory를 출력한다 |
| physical prompt | 센서 데이터와 action trajectory로 이뤄진 sensorimotor 예시. 언어 예시 대신 context window에 넣어 과제를 지시한다 |
| physical prompting | physical prompt를 써서 학습 없이 과제를 시키는 방식 |
| physical prompt engineering | 짧고 재사용 가능한 physical prompt를 골라 조합해 긴 행동을 구성하는 작업. 글에 드래그앤드롭 인터페이스로 소개된다 |
| test-time training | 추론 시점에 소량 데이터로 가중치를 조금 갱신하는 적응 방식. GEN-1.5의 1~10스텝 적응을 저자들이 이 이름으로 부른다 |
| next action prediction error | pre-training 진척을 재는 검증 지표. 다음 action을 얼마나 못 맞히는지를 나타낸다 |
| burstiness | 특정 항목이 시간적으로 몰려 등장하는 데이터 분포 성질. 언어 모델의 in-context learning 발현과 연결된 것으로 알려져 있고, 저자들이 물리 데이터에도 있을 가능성을 가설로 든다 |

용어집 추가 후보: `physical prompt` / `physical prompting`(원어 유지, 금지 표기 "물리 프롬프트·물리적 프롬프트"), `test-time training`(원어 유지, 금지 표기 "테스트 시점 학습·추론 시 학습").

## 8. 그림 후보 (Figure Candidates)

원문이 영상 중심이라 정지 이미지로 남는 후보가 제한적이다. 아래 표의 "영상 미렌더"는 헤드리스 브라우저가 캡처할 때 재생 전이라 검은 화면만 잡힌 항목이다.

| id | 원본 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | fig01.png | GEN-1.5 표지 프레임 | fetched | (선택) |
| fig02 | page-full.png | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig03 | crop01.png | Figure 1 — 언어 one-shot과 physical prompt 대비 | crop | ★ wiki 권장 (concept) |
| fig04 | crop02.png | physical prompt와 model rollout 나란히 보기 | crop | ★ wiki 권장 (method) |
| fig05 | crop03.png | Figure 2 — 과제별 성공률 막대 그래프 | crop | ★ wiki 권장 (result) |
| fig06 | crop04.png | Figure 3 — 8개월 pre-training 곡선 | crop | ★ wiki 권장 (result) |
| fig07 | crop05.png | physical prompt engineering 인터페이스 | crop | 영상 미렌더 |
| fig08 | crop06.png | prompt A + B 합성 | crop | 영상 미렌더 |
| fig09 | crop07.png | zero-shot sim2real 쌍 | crop | 영상 미렌더 |
| fig10 | crop08.png | human-to-robot in-context learning | crop | 영상 미렌더 |
| fig11 | crop09.png | Figure 4 — MDS 임베딩 | crop | (확인 필요 — 데이터 점 없음) |
| fig12 | crop10.png | 즉흥 행동 3종 캡션 묶음 | crop | 영상 미렌더 |
| fig13 | crop11.png | 바나나를 브러시로 쓰는 rollout | crop | ★ wiki 권장 (improvisation) |
| fig14 | crop12.png | 블록 여러 개 쓸어 넣기 | crop | (선택) |
| fig15 | crop13.png | 양손 모두로 쓸어 넣기 | crop | (선택) |
| fig16 | crop14.png | fine-tuning 데이터와 rollout 비교 | crop | 영상 미렌더 |
| fig17 | crop15.png | 손끝에 낀 레고 떼어내기 | crop | (선택) |
| fig18 | crop16.png | 양손 협응으로 뚜껑 열기 | crop | 영상 미렌더 |
| fig19 | crop17.png | 색·종류별로 분류하는 rollout | crop | ★ wiki 권장 (generalization) |
| fig20 | crop18.png | 뚜껑 열기가 새 물체로 확장 | crop | ★ wiki 권장 (generalization) |
