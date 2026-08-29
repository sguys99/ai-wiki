---
title: "03-11. WALL-OSS - 모두의 로보틱스 - VLA 입문"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/jo-2026-wall-oss-vla-primer.md
raw_filename: "jo-2026-wall-oss-vla-primer.md"
source_collection: external
author: "조인령"
url: "https://wikidocs.net/366377"
publisher: "wikidocs.net"
fetched_at: "2026-08-28T08:46:20+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, robot-learning, manipulation]
figures:
  - id: fig01
    file: assets/jo-2026-wall-oss-vla-primer/fig01.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig01.png
    caption: "통합 설계와 분리 설계 비교 (논문 Figure 2 캡처)"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/jo-2026-wall-oss-vla-primer/fig02.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig02.png
    caption: "WALL-OSS 전체 구조 (논문 Figure 3 캡처)"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/jo-2026-wall-oss-vla-primer/fig03.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig03.png
    caption: "학습·추론 파이프라인 (논문 Figure 4 캡처)"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/jo-2026-wall-oss-vla-primer/fig04.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig04.png
    caption: "일반 VQA가 무엇인지 보여 주는 입문용 예시 이미지 — 논문 밖에서 가져온 그림이다"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/jo-2026-wall-oss-vla-primer/fig05.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig05.png
    caption: "논문 Figure 3에서 static router가 가르는 두 경로만 빨간 테두리로 표시한 저자 주석판 — Vision-Language FFN 쪽과 Action FFN 쪽이 어디서 갈리는지 짚는다"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/jo-2026-wall-oss-vla-primer/fig06.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig06.png
    caption: "Uni-CoT 통합 손실 함수 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig07
    file: assets/jo-2026-wall-oss-vla-primer/fig07.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig07.png
    caption: "학습 corpus 세 원천 구성비와 하드웨어 (논문 Figure 5 캡처)"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/jo-2026-wall-oss-vla-primer/fig08.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig08.png
    caption: "ID·OOD task progress 비교 막대 (논문 Figure 7 캡처)"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/jo-2026-wall-oss-vla-primer/fig09.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig09.png
    caption: "tidy-bedroom 실행 스텝과 subtask 문장 (논문 Figure 6 하위 행 캡처)"
    strategy: fetched
    curated: false
  - id: fig10
    file: assets/jo-2026-wall-oss-vla-primer/fig10.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig10.png
    caption: "block-spell의 CoT·subtask 4스텝 (논문 Figure 6 하위 행 캡처)"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/jo-2026-wall-oss-vla-primer/page-full.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/page-full.png
    caption: "전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig12
    file: assets/jo-2026-wall-oss-vla-primer/fig12.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig12.png
    caption: "이산 action 모델링 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/jo-2026-wall-oss-vla-primer/fig13.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig13.png
    caption: "FAST tokenization 3단계 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig14
    file: assets/jo-2026-wall-oss-vla-primer/fig14.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig14.png
    caption: "Inspiration 단계 손실 함수 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/jo-2026-wall-oss-vla-primer/fig15.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig15.png
    caption: "노이즈 스케줄 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/jo-2026-wall-oss-vla-primer/fig16.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig16.png
    caption: "Integration 단계 손실 함수 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/jo-2026-wall-oss-vla-primer/fig17.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig17.png
    caption: "Uni-CoT 목적 함수의 두 항 수식 캡처"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/jo-2026-wall-oss-vla-primer/fig18.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig18.png
    caption: "일반 VQA 데이터 예시 (논문 Figure 5 하단 캡처)"
    strategy: fetched
    curated: false
  - id: fig19
    file: assets/jo-2026-wall-oss-vla-primer/fig19.png
    raw: raw/articles/jo-2026-wall-oss-vla-primer-figures/fig19.png
    caption: "embodied VQA 데이터 예시 (논문 Figure 5 하단 캡처)"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

"모두의 로보틱스 — VLA 입문" 시리즈의 열한 번째 글이다. WALL-OSS 논문을 수식 단위로 뜯어 한국어로 옮기되, 논문이 흩어 놓은 손실 함수들을 학습 단계 순서로 다시 배열한다.

## 1. 자료 정보 (Document Information)

- 제목: 03-11. WALL-OSS — 모두의 로보틱스 — VLA 입문
- 저자: 조인령
- 게시: wikidocs.net/366377
- 원본: `raw/articles/jo-2026-wall-oss-vla-primer.md` (13,157자)
- 시리즈: [[physical-ai/jo-2026-rt-1-vla-primer]] · [[physical-ai/jo-2026-rt-2-vla-primer]] · [[physical-ai/jo-2026-act-vla-primer]] · [[physical-ai/jo-2026-openvla-vla-primer]] · [[physical-ai/jo-2026-pi-0-6-vla-primer]] · [[physical-ai/jo-2026-smolvla-vla-primer]]와 같은 연재의 03장

구성은 등장 배경 → 배경지식 → 모델 구조 → 결과 → 한계점 → 정리 여섯 장이다. 시리즈의 다른 글과 같은 틀인데, 이번 글은 수식 비중이 유난히 높다. 본문 도식 18개 중 8개가 손실 함수와 노이즈 스케줄을 캡처한 수식 이미지다.

## 2. 주요 기여 (Key Contributions)

논문이 세 개의 gap으로 문제를 세운 데 반해, 이 글은 "지능과 행동 사이의 간극"이라는 한 문장으로 압축한 뒤 기존 VLA 구조 두 가지를 먼저 보여 준다. 통합 설계는 VL 정보와 action 정보를 한 덩어리로 Self-Attention과 FFN에 태우고, 분리 설계는 둘을 각각 나눠 처리한다. 그리고 WALL-OSS를 "Self-Attention은 공유하되 FFN만 가른 절충"으로 위치시킨다. 논문 Figure 2를 그대로 쓰면서도 읽는 순서를 바꾼 셈이다.

수식 해설이 이 글의 실질이다. Inspiration 손실의 두 항을 VQA 학습과 이산 action 학습으로 갈라 각각 무엇을 예측하는지 적고, Integration 손실에서 xt·h·(ε−x0)가 각각 무엇인지 하나씩 풀어 준다. Uni-CoT 통합 손실에서는 v·x·c·a1:T·y·Fθ·Hθ·λ 여덟 기호를 표처럼 나열한다. 논문 본문에서 한 문단으로 지나가는 기호 정의를 입문자가 따라갈 수 있게 늘려 놓았다.

FAST tokenization을 DCT·양자화·BPE 세 단계로 나눠 설명한 대목도 논문에는 없는 부연이다. BPE를 "자연어 처리에서 subword로 나누듯 자주 나타나는 동작 패턴을 하나의 동작 단어로 묶는다"로 옮긴다.

노이즈 스케줄의 Beta 분포 편향을 "노이즈가 많은 초기 단계의 데이터를 더 많이 학습하도록 설계"로 읽어 낸 것도 논문 문장을 넘어선 해석이다. 같은 팀의 후속인 Wall-OSS-0.5가 이 편향을 Action-Space Supervision으로 이론화하는데, 이 글이 그 앞자리에 해당하는 직관을 미리 짚어 둔 셈이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 구조를 세 줄로

backbone은 Qwen2.5-VL-3B, FFN은 VL용과 action용으로 분리, head는 LM Head와 Flow Head 둘이다. LM Head가 CoT와 subtask와 이산 action 토큰을 내고 Flow Head가 flow matching으로 연속 action을 낸다. flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

### Inspiration 단계

VLM의 기존 FFN을 재사용하면서 embodied VQA로 공간 추론을 키우는 갈래와, 이산 action 모델링으로 거친 action 감각을 심는 갈래가 병렬로 돈다.

일반 VQA가 무엇인지부터 설명하고 embodied VQA를 그 확장으로 놓는다. 그다음 π0-FAST의 tokenization을 끌어온다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다. 손실은 cross-entropy 형태이며 첫 항이 텍스트 토큰과 사고 과정, 둘째 항이 action 토큰과 사고 과정을 맡고 λ가 둘의 균형을 잡는다고 적는다.

### Integration 단계

이산 토큰 예측을 flow matching으로 갈아 끼운다. 노이즈 스케줄에서 x0가 도달할 정답 action, ε이 Gaussian noise 출발점이고 ρ를 균등하게 뽑지 않고 Beta 분포로 0쪽에 몰아 준다.

Integration 손실은 모델이 예측한 노이즈 제거 방향 vφ와 실제 방향 (ε−x0)의 차이로 읽는다. h는 시각 입력 v, 언어 지시 x, 선택적 CoT c가 Self-Attention을 거쳐 결합된 멀티모달 문맥이다.

static router 설명이 이 글에서 가장 시각적이다. 저자가 논문 Figure 3 위에 빨간 테두리를 그려 Vision-Language FFN 경로와 Action FFN 경로를 갈라 표시한다. Phase 1은 VLM을 얼린 채 action head만, Phase 2는 함께 최적화하며 이때 static router가 고정 경로로 feature를 배분한다.

### Uni-CoT

지시 이해 → 사고 과정 → subtask 계획 → 연속 action이 단일 모델 안에서 미분 가능하게 이어진다는 게 요지다. subtask는 high-level 추론이 텍스트로 내놓는 중간 단계 명령이다.

c가 별도 모듈이 아니라 같은 end-to-end 모델의 언어 생성 head에서 토큰으로 나온다는 점을 강조한다. path-drop objective를 "학습 시 때로는 c를 주고 때로는 c 없이 행동하게 유도"로 옮기고, 그 결과 추론 시점에 중간 추론을 거칠지 즉각 행동할지를 모델이 정한다고 정리한다.

논문에 없는 해석도 하나 붙는다. WALL-OSS가 추론과 실행을 병렬로 돌려 자기 action이 환경에 미친 영향을 시각 데이터로 곧바로 되받는 피드백 루프를 만든다는 서술이다. 오류가 나도 embodied VQA로 현재 상태를 다시 읽고 c를 고쳐 trajectory를 실시간 보정할 수 있다고 본다. trajectory는 observation과 action이 시간순으로 이어진 실행 기록이다. 논문 본문에는 이만큼 강한 진술이 없으므로 이 대목은 글쓴이의 확장으로 읽는 게 맞다.

### 데이터

자체 수집 action, open-source action, 멀티모달 VQA 세 갈래를 논문과 같은 순서로 설명한다. 일반 VQA는 action head를 직접 최적화하기보다 VLM의 기존 인지 능력을 지키는 역할이라며 weight drift 방지와 묶어 설명한다.

embodied VQA에서는 `<box>[x1,y1,x2,y2]`와 `<point>[x,y]` 두 태그의 쓰임을 나눠 적는다. box는 물체의 시각적 경계를, point는 로봇 팔이 직접 닿아야 할 grasping 지점 같은 단일 픽셀을 가리킨다. 이 좌표 학습이 CoT 생성 때 "먼저 [x, y] 위치의 물체를 집는다" 식의 subtask 계획으로 이어진다는 연결이 이 글의 설명이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

평가 축을 단일 지시, 장기, 추론 집약 셋으로 나누고 비교 대상을 Diffusion Policy와 π0로 든다. 베이스라인이 중간 단계 안내를 필요로 해서 사람이 미리 나눠 둔 subtask 목록을 GPT-4가 실시간으로 하나씩 불러 주는 방식으로 맞췄다는 실험 설계도 짚는다.

숫자로는 처음 보는 물체에 대해 61% 이상의 task progress를 든다. 단일 지시 과제에서는 π0도 잘한다는 점을 인정하고, 갈리는 곳은 tidy-bedroom 같은 장기 과제와 block-spell 같은 추론 과제라고 정리한다. subtask를 나눠 주지 않았는데도 5분이 넘는 실행을 이어 간다는 데 무게를 둔다.

논문의 Table 2(Embodied VQA)와 Table 3(block-spell 지시 이행 정확도)은 이 글에 나오지 않는다. 숫자로 뒷받침되는 co-training 효과를 확인하려면 논문 쪽을 봐야 한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

논문의 한계 서술을 세 항목으로 옮긴다. 고수준 의미 이해가 아니라 미세한 물리 조작 제어에서 한계가 있다는 것, 정렬된 3D 데이터가 희소하고 공개 3D 기반 모델의 공간 정확도가 모자란다는 것, 그리고 계획 능력이 전체 학습 프레임의 1%짜리 CoT·subtask 감독에 얹혀 있어 3~5분을 넘는 공간 복잡도 높은 과제에서 흔들린다는 것이다.

정밀 manipulation에서 π0가 여전히 앞선다는 논문의 자기 평가는 이 글에 옮겨지지 않았다. 세 번째 항목의 "1%"는 논문의 fine-tuning 단계 라벨 비율이므로, 이를 pre-training 전체의 한계로 읽지 않도록 주의한다.

## 6. 관련 연구 (Related Work)

- WALL-OSS 논문 ([[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]) — 이 글이 해설하는 원문. 참고문헌에도 직접 걸려 있다
- wall-x 저장소 ([[physical-ai/x-square-robot-wall-x]]) — 글 말미 참고문헌의 두 번째 항목
- π0.6 해설 ([[physical-ai/jo-2026-pi-0-6-vla-primer]]) · SmolVLA 해설 ([[physical-ai/jo-2026-smolvla-vla-primer]]) — 같은 연재의 이웃 글. flow matching과 action expert 설명이 그쪽에 먼저 나온다
- Wall-OSS-0.5 ([[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]) — 이 글이 다루지 않는 후속. 여기서 설명한 두 단계 커리큘럼이 단일 단계 co-training으로 바뀐다

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| 혼합 설계 / 분리 설계 | 글쓴이가 논문의 Unified Design·Decoupled Design을 옮긴 표기. 이 wiki 페이지들은 통합 설계·분리 설계로 적는다 |
| 가중치 편향 | 글쓴이가 weight drift를 옮긴 표기. 논문 원어는 weight drift다 |
| 비구체화(disembodied) | 물리적 실체 없이 텍스트·이미지만 다루는 상태를 가리키는 글쓴이의 표현 |
| 거친 행동 인식 | 논문의 coarse action awareness를 옮긴 표기 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 통합·분리 설계 비교 | fetched | (논문 Figure 2와 동일 — 논문 페이지에서 임베드) |
| fig02 | WALL-OSS 전체 구조 | fetched | (논문 Figure 3과 동일) |
| fig03 | 학습·추론 파이프라인 | fetched | (논문 Figure 4와 동일) |
| fig04 | 일반 VQA 예시 | fetched | (선택 — 입문용 삽화) |
| fig05 | static router 경로를 빨간 테두리로 표시한 저자 주석판 | fetched | ★ wiki 권장 — 이 글에만 있는 도식 |
| fig06 · fig12~fig17 | 손실 함수·노이즈 스케줄 수식 캡처 7종 | fetched | (선택 — 본문 서술로 갈음) |
| fig07 | 데이터 전략 | fetched | (논문 Figure 5와 동일) |
| fig08 · fig09 · fig10 | 성능 막대와 실행 스텝 | fetched | (논문 Figure 7·Figure 6과 동일) |
| fig11 | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig18 · fig19 | 일반·embodied VQA 데이터 예시 | fetched | (논문 Figure 5 하단과 동일) |

수집 시 본문 이미지 18개 중 10개만 내려받혔다. `MIN_IMG_SIDE=200` 필터가 높이 100픽셀 안팎의 수식 이미지 8개를 걸러냈기 때문이다. 이후 fig12~fig19로 사후 보강해 본문과 개수를 맞췄고, `figures.json`의 해당 항목에 `note` 필드로 보강 사실을 적었다.

이 글의 도식은 fig05를 빼면 전부 논문 figure를 그대로 캡처한 것이다. 시리즈의 앞선 글들과 같은 원칙으로, 저자가 손을 댄 fig05 하나만 wiki에 임베드하고 나머지는 논문 페이지 쪽에서 본다.
