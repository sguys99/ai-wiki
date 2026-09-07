---
title: "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/sii-research-2026-tau0-vla-project-page.md
raw_filename: "sii-research-2026-tau0-vla-project-page.md"
source_collection: external
author: "τ0-VLA Team (Shanghai Innovation Institute, Agibot Finch, The Chinese University of Hong Kong)"
url: "https://tau0-vla.github.io/"
publisher: "tau0-vla.github.io"
publication_date: "2026-07-27"
fetched_at: "2026-09-07T23:44:14+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, world-model, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/sii-research-2026-tau0-vla-project-page/fig01.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig01.png
    caption: "실제 로봇 평가 과제 여섯 가지를 rollout 프레임으로 보여주는 패널. (a) Clean Room부터 (d) Make Milk Tea까지가 long-horizon 평가, (e) Collect Laundry와 (f) Tidy Makeup Table이 ARX와 Franka 적응 평가다"
    strategy: fetched
    curated: true
  - id: fig02
    file: assets/sii-research-2026-tau0-vla-project-page/fig02.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig02.png
    caption: "논문 Figure 2를 고해상도로 다시 그린 구조도. (a) Qwen3.5-9B high-level policy, (b) Qwen3.5-2B와 MoT action expert로 이뤄진 low-level policy, (c) world model과 value model을 거치는 beam search 경로를 함께 보여준다"
    strategy: fetched
    curated: true
  - id: fig03
    file: assets/sii-research-2026-tau0-vla-project-page/fig03.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig03.png
    caption: "네 평가 환경의 다음 subtask 예측 정확도 막대그래프. Clean Room의 TTC 값이 논문 Figure 4의 87.0%가 아니라 88.0%로 표기돼 있다"
    strategy: fetched
    curated: true
  - id: fig04
    file: assets/sii-research-2026-tau0-vla-project-page/fig04.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/fig04.png
    caption: "추론 연산량과 정확도의 포화 곡선. Make Milk Tea와 Book Organization 두 패널 모두 낮은 예산에서 빠르게 오르다가 평탄해진다"
    strategy: fetched
    curated: true
  - id: fig05
    file: assets/sii-research-2026-tau0-vla-project-page/page-full.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷. 원본이 8,004px라 상단 6,000px에서 잘렸다"
    strategy: screenshot
    curated: false
  - id: fig06
    file: assets/sii-research-2026-tau0-vla-project-page/crop01.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop01.png
    caption: "페이지 렌더에서 잘라낸 과제 패널 영역. 아래쪽 설명 캡션까지 포함한다"
    strategy: crop
    curated: false
  - id: fig07
    file: assets/sii-research-2026-tau0-vla-project-page/crop02.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop02.png
    caption: "과제 패널 영역만 캡션 없이 잘라낸 크롭"
    strategy: crop
    curated: false
  - id: fig08
    file: assets/sii-research-2026-tau0-vla-project-page/crop03.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop03.png
    caption: "페이지 렌더에서 잘라낸 구조도 영역. 아래쪽 설명 캡션까지 포함한다"
    strategy: crop
    curated: false
  - id: fig09
    file: assets/sii-research-2026-tau0-vla-project-page/crop04.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop04.png
    caption: "구조도 주변 영역을 캡션 없이 잘라낸 크롭"
    strategy: crop
    curated: false
  - id: fig10
    file: assets/sii-research-2026-tau0-vla-project-page/crop05.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop05.png
    caption: "페이지 렌더에서 잘라낸 정확도 막대그래프 영역. 아래쪽 설명 캡션까지 포함한다"
    strategy: crop
    curated: false
  - id: fig11
    file: assets/sii-research-2026-tau0-vla-project-page/crop06.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop06.png
    caption: "정확도 막대그래프만 캡션 없이 잘라낸 크롭"
    strategy: crop
    curated: false
  - id: fig12
    file: assets/sii-research-2026-tau0-vla-project-page/crop07.png
    raw: raw/articles/sii-research-2026-tau0-vla-project-page-figures/crop07.png
    caption: "페이지 렌더에서 잘라낸 포화 곡선 영역. 아래쪽 설명 캡션까지 포함한다"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

τ0-VLA 연구진이 논문과 함께 공개한 프로젝트 페이지로, 논문의 핵심 주장을 해설 문체로 다시 설명하면서 rollout 영상 일곱 편과 논문 본문에는 수치가 실리지 않은 두 개의 개선 폭(선택적 test-time computation 15~24%p, 교정 가능한 execution memory 11.0%p)을 제시한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation |
| 형태 | 논문 프로젝트 페이지 (블로그형 해설과 영상 데모) |
| 게시일 | 2026년 7월 27일 |
| 주소 | https://tau0-vla.github.io/ |
| 연결 링크 | 논문 arXiv 2608.16885, GitHub sii-research/tau-0-vla, Hugging Face sii-research/tau-0-vla |
| 수집 | scripts/fetch_article.py, chrome tier, 본문 10,623자 |
| 도식 | 이미지 4장(과제 패널, 구조도, 정확도 그래프, 포화 곡선), 영상 7편 |

페이지 구성은 도입부와 다섯 개 절이다. Long-Horizon Manipulation in the Real World, Two Systems Two Time Scales, More Compute Better Decisions, A Generalist VLA across Robot Embodiments, Scaling Robot Intelligence Through Next-Subtask Prediction 순서로 이어진다.

## 2. 주요 기여 (Key Contributions)

이 페이지 자체는 새로운 연구 결과를 담지 않는다. 논문 대비 추가로 얻을 수 있는 것은 다음 네 가지다.

1. **논문에 수치가 없는 두 개선 폭을 명시한다.** 선택적 test-time computation이 다음 subtask 정확도를 15~24%p 올리고, 교정 가능한 execution memory가 11.0%p를 더한다고 적는다. 논문 본문에는 execution memory 단독 ablation 절이 없다.
2. **rollout 영상 일곱 편을 제공한다.** Prepare Ingredients와 Clean Room 통합본, Make Milk Tea, Tomato and Egg Stir Fry 전면과 후면 시점, Collect Laundry, Tidy Makeup Table, 그리고 종합 데모다. 논문의 정지 프레임 패널로는 확인할 수 없는 실행 속도와 실패 복구 양상을 볼 수 있다.
3. **고해상도 구조도를 제공한다.** 논문 Figure 2와 같은 내용이지만 PDF 크롭보다 글자와 화살표가 뚜렷하다.
4. **논문의 서술을 평이한 해설로 옮겼다.** 수식과 알고리즘 없이 propose, predict, evaluate 순서와 memory 동기화 논리를 설명한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 문제 제기

페이지의 도입부는 가정 과제의 길이를 문제의 출발점으로 삼는다. 밀크티 한 잔을 만들려면 우유와 차를 순서대로 붓고 토핑을 넣고 뚜껑을 덮고 빨대를 꽂는 수십 단계를 거쳐야 하고, 집 청소는 이동하면서 옷을 모으고 가방을 걸고 담요를 건네고 쓰레기를 버리는 일을 끊김 없이 이어가야 한다.

과제가 몇 초에서 몇 분으로 길어지면 어려움의 성격이 바뀐다는 것이 이 페이지의 핵심 진단이다. 정밀한 실행도 여전히 중요하지만, long-horizon 과제의 성패는 점점 더 진행 상황 추적, 결과 예측, subtask 계획에 좌우된다. 로봇은 무엇을 끝냈는지 기억하고 다음 단계를 고르고 실패했을 때 회복해야 한다.

기존 hierarchical VLA의 한계도 같은 어법으로 정리한다. 이들은 언어 subtask를 상위 추론과 하위 제어 사이의 인터페이스로 노출하지만 상위 결정을 여전히 한 번의 forward pass로 끝낸다. 현재 observation과 실행 이력을 다음 subtask로 곧장 매핑할 뿐, 대안을 명시적으로 비교하거나 그 대안이 만들 물리적 상태를 추정하지 않는다. 그래서 나쁜 결정은 실행이 끝난 뒤에야 드러나고 그때는 환경이 이미 바뀌어 있다.

### 3.2 subtask가 탐색 단위인 이유

페이지는 subtask가 간결하면서 의미가 구조화된 탐색 공간을 이룬다고 설명한다. 근거로 세 가지를 든다.

- subtask는 드문드문 있는 결정 경계에서만 발생한다.
- 과제의 논리적 단계와 하나씩 대응한다.
- 시각적으로 평가할 수 있는 의미 있는 변화를 만든다.

### 3.3 두 개의 시간 척도

τ0-VLA는 서로 다른 시간 척도에서 동작하는 두 policy로 이뤄진다. subtask 경계에서 high-level policy가 지시문(instruction)과 현재 observation과 execution memory를 읽어 다음 subtask를 고르고 진행 기록을 갱신하며, low-level policy가 그 subtask를 더 빠른 제어 주기로 실행한다.

즉시 실행할지 연산을 더 쓸지는 토큰 확신 통계가 정한다. 확신이 낮은 결정에서는 대안 subtask를 제안하고 world model로 실행 후 결과를 예측하며 value model로 그 예측 결과에서 후보 품질 점수를 낸다. search와 반성이 이 분기들을 비교한 뒤 하나로 확정한다.

선택한 subtask의 실제 결과는 다음 결정 전에 memory를 갱신해 예측과 실제 사이의 closed-loop를 닫는다.

### 3.4 memory 동기화와 교정

이 loop가 신뢰를 유지하려면 execution memory가 물리 세계와 동기화된 상태여야 한다. grasping이 실패하거나 물체가 사라지면 그럴듯해 보이던 진행 기록이 틀린 것이 된다. 새 시각 증거가 memory와 충돌하면 τ0-VLA는 진행하거나 되돌리거나 재시도할 수 있고, 뒤처진 기록과 지나치게 낙관적인 기록을 모두 고치면서 이미 유효한 앞쪽 진행은 보존한다.

이 교정 행동은 기존 시연 데이터(demonstration)에서 파생한 memory를 perturbation으로 변형해 학습하며 별도의 교정 데이터셋을 수집하지 않는다.

### 3.5 low-level policy와 통합 인터페이스

subtask가 정해지면 pre-training된 vision-language backbone과 Mixture-of-Transformers action expert가 다중 시점 observation과 로봇 상태와 언어로부터 action chunk를 만든다. 같은 low-level policy가 직접 실행에서는 원래 지시문을, 계층 실행에서는 상위가 고른 경계 지어진 subtask를 받으므로 두 설정에서 제어 인터페이스가 동일하다.

40차원 공유 인터페이스가 end-effector 운동, 팔 관절, 그리퍼, 허리, 이동 베이스를 고정형과 양팔형과 이동형 플랫폼에 걸쳐 지원한다. embodiment마다 사용 가능한 상태와 제어 차원을 이 표현에 매핑하고 쓰지 않는 슬롯은 마스킹한다.

학습은 40,115시간의 이종 실제 로봇 경험과 멀티모달 데이터를 결합해 과제와 embodiment를 가로지르는 공유 pre-training foundation을 만들고, 배포마다 대상 설정에 맞춰 따로 fine-tuning한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 4.1 long-horizon 네 과제

페이지가 싣는 표는 논문 Table I의 성공률 부분과 같다.

| 방법 | Clean Room | Prepare Ingredients | Stir Fry | Milk Tea | 평균 |
|---|---|---|---|---|---|
| GR00T N1.7 | 0 / 10 | 1 / 10 | 0 / 10 | 0 / 10 | 2.5% |
| LingBot-VLA | 0 / 10 | 0 / 10 | 0 / 10 | 0 / 10 | 0.0% |
| π0.5 | 4 / 10 | 2 / 10 | 0 / 10 | 3 / 10 | 22.5% |
| τ0-VLA | 4 / 10 | 2 / 10 | 0 / 10 | 5 / 10 | 27.5% |
| τ0-VLA (계층 구조, Plan Once) | 5 / 10 | 4 / 10 | 4 / 10 | 5 / 10 | 45.0% |

두 설정은 같은 low-level policy를 쓰고 beam search 없이 과제당 10회 시행했다. 페이지는 차이가 low-level policy를 어떻게 안내하느냐에 있다고 해석한다. 직접 실행은 모든 action을 전체 지시문에 조건화해 policy가 에피소드 내내 현재 단계를 스스로 추론하게 두는 반면, 계층 실행은 최신 observation과 execution memory에서 고른 경계 지어진 subtask를 준다. 따라서 향상은 실행 policy 자체의 변화가 아니라 진행을 명시적으로 추적하고 다음 할 일을 정하는 데서 온다.

평가한 네 과제는 13~25단계이며 에피소드는 최대 12분까지 이어진다. 필요한 능력으로 주행, 물체 탐색, articulated object 상호작용, tool use, 조리, 불완전한 실행으로부터의 회복을 든다.

### 4.2 test-time computation

페이지는 Plan Once, Best-of-N, TTC 세 가지를 비교한다. Plan Once는 한 번만 예측하고, Best-of-N은 여러 한 단계 후보를 뽑아 점수를 매기며, TTC는 다단계 분기를 결과 예측과 반성으로 확장한 뒤 확정한다.

효과는 분포 이동에서 가장 뚜렷하다. 학습에 없던 Book Organization 배열에서 TTC는 74.0%의 다음 subtask 정확도를 냈고 Plan Once는 50.0%, Best-of-N은 57.5%였다. 결정 시점에 결과를 예측하는 것이 한 번의 forward 예측이나 한 단계 후보 순위 매기기를 넘는 증거를 준다는 설명이다.

closed-loop 실행 향상은 low-level policy를 고정한 채 측정했다. Milk Tea는 5/10에서 7/10, Book Organization은 6/10에서 9/10, Clean Room은 5/10에서 7/10으로 올랐다.

Milk Tea에서는 두 변형 모두 이미 평균 91% 이상의 순서를 완료하며 남은 실패는 뚜껑 부착과 빨대 삽입에 몰려 있다. TTC는 Progress를 95.38%까지 올려, 마지막 접촉이 많은 manipulation이 주된 병목임을 드러낸다.

연산량 증가의 효과는 무한하지 않다. 정확도는 낮거나 중간 예산에서 빠르게 오르다가 점차 포화한다. 확신 기반 라우팅이 결정이 불확실할 때만 추가 추론을 배분하고 확신이 높은 결정은 그대로 진행시켜 선택적 test-time computation을 가능하게 한다.

### 4.3 embodiment 간 실행

페이지 후반부는 공유 foundation에서 파생한 적응 policy를 ARX AC One의 Collect Laundry(5단계)와 Franka의 Tidy Makeup Table(8단계) 영상으로 보여준다. 수치 표는 싣지 않고 영상으로 대신한다.

### 4.4 논문과 어긋나는 표기 한 곳

정확도 막대그래프에서 Clean Room의 TTC 값이 88.0%로 적혀 있는데 논문 Figure 4의 같은 막대는 87.0%다. 나머지 열한 개 값은 논문과 일치한다. 페이지 본문이 말하는 개선 폭 하한 15%p는 Clean Room의 72.0%에서 87.0%를 뺀 값과 맞으므로, 논문 쪽 87.0%가 본문과 정합적이다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

페이지가 직접 말하는 한계는 두 가지다.

- **연산 대비 이득의 포화**: 정확도가 낮은 예산에서 빠르게 오른 뒤 평탄해진다.
- **마지막 접촉 단계**: Milk Tea에서 Progress가 95.38%에 이르러도 뚜껑 부착과 빨대 삽입이 남는다.

자료 자체의 한계도 있다. 이 페이지는 논문의 대중용 요약이라 알고리즘, 손실 함수, 데이터 구성 비율, routing 임계값 같은 재현에 필요한 세부를 담지 않는다. Table II와 Table III에 해당하는 수치도 싣지 않는다. 따라서 이 페이지만으로는 방법을 재현할 수 없고 논문을 함께 읽어야 한다.

마무리 절은 향후 방향을 이렇게 적는다. 앞으로의 시스템은 이 closed-loop를 더 풍부한 과제와 더 긴 배포로 확장해, 작은 오류가 과제 수준 실패로 번지기 전에 로봇이 언제 숙고하고 결과를 검증하고 계획을 고칠지 스스로 정하게 만들 수 있다.

## 6. 관련 연구 (Related Work)

페이지는 참고문헌 목록을 싣지 않고 비교 대상 모델 이름만 표에 등장시킨다. 등장하는 이름은 GR00T N1.7, LingBot-VLA, π0.5 세 가지이며 모두 long-horizon 표의 기준선이다. 논문의 관련 연구 정리는 sources/cai-2026-tau0-vla-a-hierarchical-robot-foundation.md의 6절을 참고한다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| test-time computation | 결정이 불확실할 때만 추론 연산을 더 쓰는 절차. 페이지에서는 선택적(selective)이라는 수식어를 붙여 항상 켜는 방식과 구분한다 |
| execution memory | 지금까지 완료한 단계를 담은 진행 기록. 새 시각 증거와 충돌하면 진행, rollback, 재시도 중 하나로 교정된다 |
| revisable memory | 스스로 고칠 수 있게 학습된 execution memory. 페이지는 이것만으로 다음 subtask 정확도가 11.0%p 올랐다고 적는다 |
| Plan Once | 결정 지점마다 한 번만 예측하는 상위 기준선 |
| Best-of-N | 한 단계 후보 N개를 뽑아 점수를 매기고 최고점을 고르는 기준선 |
| 확신 기반 라우팅 | 토큰 확신 통계로 추가 추론을 켤지 정하는 규칙 |

## 8. 그림 후보 (Figure Candidates)

| id | 원본 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | paper-demo-tasks.png | 실제 로봇 평가 과제 6종 패널 | fetched | wiki 권장 (setup) |
| fig02 | framework-latest.png | 고해상도 구조도 | fetched | wiki 권장 (architecture) |
| fig03 | ttc-accuracy.png | 다음 subtask 예측 정확도 막대그래프 | fetched | wiki 권장 (result) |
| fig04 | ttc-scaling.png | 연산량과 정확도의 포화 곡선 | fetched | wiki 권장 (result) |
| fig05 | page-full.png | 페이지 전체 스크린샷 | screenshot | 아카이브 |
| fig06 | crop01.png | 과제 패널 영역과 캡션 | crop | fig01과 중복 |
| fig07 | crop02.png | 과제 패널 영역만 | crop | fig01과 중복 |
| fig08 | crop03.png | 구조도 영역과 캡션 | crop | fig02와 중복 |
| fig09 | crop04.png | 구조도 주변 영역 | crop | fig02와 중복 |
| fig10 | crop05.png | 정확도 그래프와 캡션 | crop | fig03과 중복 |
| fig11 | crop06.png | 정확도 그래프만 | crop | fig03과 중복 |
| fig12 | crop07.png | 포화 곡선과 캡션 | crop | fig04와 중복 |
