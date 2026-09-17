---
title: "World Action Model의 부상: 비디오 백본으로 로봇 정책을 학습하는 두 번째 레시피 (feat. NVIDIA)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/9bow-2026-world-action-model-rise.md
raw_filename: "9bow-2026-world-action-model-rise.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/world-action-model-feat-nvidia/10769"
publisher: "PyTorch KR (discuss.pytorch.kr)"
publication_date: "2026-06-18"
tags: [physical-ai, world-model, vla, robot-learning]
figures:
  - id: fig01
    file: assets/9bow-2026-world-action-model-rise/fig01.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig01.jpg
    caption: "글 머리 이미지"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/9bow-2026-world-action-model-rise/fig02.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig02.jpg
    caption: "VLM 기반 VLA와 video backbone 기반 WAM. generalist manipulation policy를 향한 두 가지 접근"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/9bow-2026-world-action-model-rise/fig03.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig03.jpg
    caption: "로보틱스 world model 지형도. video world model과 action 조건부 world model이 겹치는 자리에 WAM이 있다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/9bow-2026-world-action-model-rise/fig04.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig04.jpg
    caption: "Veo 3.1이 zero-shot으로 만든 토스터 레버 누르기 rollout"
    strategy: fetched
    curated: false
  - id: fig05
    file: assets/9bow-2026-world-action-model-rise/fig05.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig05.jpg
    caption: "WAM 설계 공간 전체 조망. paradigm과 action integration과 architecture 세 가지 기준"
    strategy: fetched
    curated: true
  - id: fig06
    file: assets/9bow-2026-world-action-model-rise/fig06.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig06.jpg
    caption: "inverse dynamics 계열 WAM의 추상 구조. video 모델이 미래 프레임을 만들면 헤드가 이를 action으로 변환한다"
    strategy: fetched
    curated: true
  - id: fig07
    file: assets/9bow-2026-world-action-model-rise/fig07.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig07.jpg
    caption: "UniPi 구조. 텍스트 조건부 video 생성기와 별도 inverse dynamics 모듈"
    strategy: fetched
    curated: false
  - id: fig08
    file: assets/9bow-2026-world-action-model-rise/fig08.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig08.jpg
    caption: "LingBot-VA 구조. fine-tuning한 Wan 2.2-5B의 video rollout에 조건화해 action을 예측한다"
    strategy: fetched
    curated: false
  - id: fig09
    file: assets/9bow-2026-world-action-model-rise/fig09.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig09.jpg
    caption: "joint prediction 계열 WAM의 추상 구조. 하나의 모델이 action과 상상된 미래 상태를 함께 낸다"
    strategy: fetched
    curated: true
  - id: fig10
    file: assets/9bow-2026-world-action-model-rise/fig10.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig10.jpg
    caption: "GR-1 구조. video 예측 pre-training 뒤 미래 프레임과 action chunk 목적으로 fine-tuning한다"
    strategy: fetched
    curated: false
  - id: fig11
    file: assets/9bow-2026-world-action-model-rise/fig11.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig11.png
    caption: "CALVIN ABC→D 평균 완료 subtask 수. GR-1의 당시 결과와 현재 VLA 참조선"
    strategy: fetched
    curated: false
  - id: fig12
    file: assets/9bow-2026-world-action-model-rise/fig12.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig12.jpg
    caption: "DreamZero 구조. 14B Wan video diffusion에서 출발한 monolithic Transformer가 video와 action 토큰을 함께 디노이징한다"
    strategy: fetched
    curated: false
  - id: fig13
    file: assets/9bow-2026-world-action-model-rise/fig13.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig13.jpg
    caption: "2026년 4월 RoboArena 리더보드. DreamZero 1750, Pi-0.5 1622"
    strategy: fetched
    curated: true
  - id: fig14
    file: assets/9bow-2026-world-action-model-rise/fig14.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig14.jpg
    caption: "GENIMA 구조. 이미지 모델이 RGB 공간에 관절 목표를 그리면 컨트롤러가 이를 로봇 명령으로 변환한다"
    strategy: fetched
    curated: false
  - id: fig15
    file: assets/9bow-2026-world-action-model-rise/fig15.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig15.jpg
    caption: "Cosmos Policy 구조. action과 proprioception과 value 목표를 합성 latent 프레임으로 주입한다"
    strategy: fetched
    curated: false
  - id: fig16
    file: assets/9bow-2026-world-action-model-rise/fig16.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig16.jpg
    caption: "Play-LMP 구조. 사후 네트워크가 trajectory 창을 latent plan으로 압축한다"
    strategy: fetched
    curated: false
  - id: fig17
    file: assets/9bow-2026-world-action-model-rise/fig17.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig17.jpg
    caption: "Being-H0.7 latent world-action 구조. 사후 분기가 압축하고 사전 분기가 예측한다"
    strategy: fetched
    curated: false
  - id: fig18
    file: assets/9bow-2026-world-action-model-rise/fig18.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig18.jpg
    caption: "hierarchical 구조. video 예측 단계와 action 생성 단계가 단방향으로 이어진다"
    strategy: fetched
    curated: false
  - id: fig19
    file: assets/9bow-2026-world-action-model-rise/fig19.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig19.jpg
    caption: "monolithic Transformer 구조. 하나의 Transformer가 video와 action을 함께 디노이징한다"
    strategy: fetched
    curated: false
  - id: fig20
    file: assets/9bow-2026-world-action-model-rise/fig20.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig20.jpg
    caption: "Mixture-of-Transformers 구조. 모달리티별 전문가가 공유 attention으로 묶인다"
    strategy: fetched
    curated: false
  - id: fig21
    file: assets/9bow-2026-world-action-model-rise/fig21.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig21.png
    caption: "학습 레시피별 조밀 코어 연산량 비교, 로그 스케일 ZFLOP"
    strategy: fetched
    curated: true
  - id: fig22
    file: assets/9bow-2026-world-action-model-rise/fig22.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig22.jpg
    caption: "VLA 계열과 WAM 계열, 그리고 둘을 합치는 세 번째 경로로의 수렴 가능성"
    strategy: fetched
    curated: true
  - id: fig23
    file: assets/9bow-2026-world-action-model-rise/fig23.jpg
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/fig23.jpg
    caption: "Motus 계열 hybrid 구성. video 모델링과 action 생성을 별도 Transformer가 맡되 attention과 텍스트 조건화를 공유한다"
    strategy: fetched
    curated: false
  - id: fig24
    file: assets/9bow-2026-world-action-model-rise/page-full.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/page-full.png
    caption: "원문 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig25
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop01.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop01.png
    caption: "글 머리 콜라주 이미지의 페이지 크롭 (fig01과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig26
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop02.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop02.png
    caption: "VLA와 VAM 갈림길 앞에 선 로봇 삽화의 페이지 크롭 (fig02와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig27
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop03.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop03.png
    caption: "로보틱스 world model 지형도의 페이지 크롭 (fig03과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig28
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop04.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop04.png
    caption: "WAM 설계 공간 세 가지 기준 도식의 페이지 크롭 (fig05와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig29
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop05.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop05.png
    caption: "inverse dynamics 계열 추상 구조의 페이지 크롭 (fig06과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig30
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop06.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop06.png
    caption: "UniPi 구조도의 페이지 크롭 (fig07과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig31
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop07.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop07.png
    caption: "LingBot-VA 구조도의 페이지 크롭 (fig08과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig32
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop08.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop08.png
    caption: "joint prediction 계열 추상 구조의 페이지 크롭 (fig09와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig33
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop09.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop09.png
    caption: "GR-1 pre-training과 fine-tuning 구조도의 페이지 크롭 (fig10과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig34
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop10.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop10.png
    caption: "CALVIN ABC→D 평균 완료 subtask 막대 그래프의 페이지 크롭 (fig11과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig35
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop11.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop11.png
    caption: "DreamZero joint video-action DiT 구조도의 페이지 크롭 (fig12와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig36
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop12.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop12.png
    caption: "RoboArena policy 리더보드 표의 페이지 크롭 (fig13과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig37
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop13.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop13.png
    caption: "GENIMA 관절 목표 렌더링 예시의 페이지 크롭 (fig14와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig38
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop14.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop14.png
    caption: "Cosmos Policy latent 주입 도식의 페이지 크롭 (fig15와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig39
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop15.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop15.png
    caption: "Play-LMP 학습과 추론 구조도의 페이지 크롭 (fig16과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig40
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop16.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop16.png
    caption: "Being-H0.7 dual-branch 구조도의 페이지 크롭 (fig17과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig41
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop17.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop17.png
    caption: "hierarchical 구조(video DiT와 action DiT)의 페이지 크롭 (fig18과 같은 영역)"
    strategy: crop
    curated: false
  - id: fig42
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop18.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop18.png
    caption: "monolithic Diffusion Transformer 구조의 페이지 크롭 (fig19와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig43
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop19.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop19.png
    caption: "본문 삽입 이미지 (도식 아님): 이미지가 로드되기 전의 빈 회색 자리 표시자"
    strategy: crop
    curated: false
  - id: fig44
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop20.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop20.png
    caption: "세 갈래 길과 세 성 삽화(세 번째 경로로의 수렴)의 페이지 크롭 (fig22와 같은 영역)"
    strategy: crop
    curated: false
  - id: fig45
    kind: figure
    file: assets/9bow-2026-world-action-model-rise/crop21.png
    raw: raw/articles/9bow-2026-world-action-model-rise-figures/crop21.png
    caption: "Mixture-of-Transformers 구조도의 페이지 크롭 (fig20과 같은 영역)"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

PyTorch KR 운영자 박정환(9bow)이 옮긴 NVIDIA World-Action Model 글의 한국어 판이다. 내용 구성은 원문과 같고 로보틱스 용어를 미리 풀어주는 용어풀이 상자와 국내 독자를 위한 관련 글 링크가 앞뒤로 붙는다. 원문의 도식 23개가 모두 재게시돼 있어 도식 아카이브로서는 원문보다 낫다.

## 1. 자료 정보 (Document Information)

- 저자: 박정환 (PyTorch KR 운영자, Discourse 계정 9bow)
- 발행: 2026-06-18, PyTorch KR 읽을거리&정보공유
- URL: https://discuss.pytorch.kr/t/world-action-model-feat-nvidia/10769
- 원문: Moritz Reuss, "Pretrained to Imagine, Fine-Tuned to Act: The Rise of World-Action Models" (NVIDIA Technical Blog, 2026-06-15). wiki에는 `reuss-2026-pretrained-to-imagine-fine-tuned`로 들어와 있다
- 성격: 번역과 재구성을 겸한 글. 원문의 절 구조와 수치를 그대로 따르며 요약하거나 잘라내지 않는다.

내용 요약은 원문 source에 있고 여기서는 중복하지 않는다. 이 파일은 한국어 판의 존재와 그 도식 아카이브를 추적하는 데 목적이 있다.

## 2. 주요 기여 (Key Contributions)

- WAM 설계 공간을 다루는 원문 전체를 한국어로 옮긴다. WAM은 대규모 영상으로 pre-training한 video backbone에서 출발해 미래 장면 변화와 action을 함께 다루는 policy 계열을 가리킨다.
- 본문 앞에 VLA, WAM, VLM, world model, grounding, inverse dynamics, joint prediction, action chunk, MoT, DiT 열 개 항목의 용어풀이를 둔다. 원문에도 같은 상자가 있지만 한국어 독자에게는 진입 문턱을 크게 낮춘다.
- 원문 도식 23개를 모두 재게시하고 한국어 alt 텍스트를 달았다. 원문 페이지는 lazy loading 때문에 자동 수집에서 11개만 잡히지만 한국어판에서는 23개가 전부 잡힌다.
- 글 끝에 국내 독자용 관련 글(NVIDIA Cosmos 3, Isaac GR00T, Gemini Robotics, SmolVLA)을 붙인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

원문과 동일하다. paradigm(inverse dynamics, joint prediction, representation-only), action integration(기본 action 토큰, action을 이미지로, latent plan), architecture(hierarchical, monolithic, MoT) 세 가지 기준 구성을 그대로 따른다. 자세한 설명은 `reuss-2026-pretrained-to-imagine-fine-tuned` 참고.

번역 선택 몇 가지는 이 wiki의 용어 규약과 다르다. policy를 "정책", action을 "행동", world model을 "월드 모델", inverse dynamics를 "역동역학"으로 옮겼다. 원문 인용 시 그대로 쓰지 말고 wiki canonical 표기로 바꿔 적는다. <!-- lint-terms: ignore (번역 표기 자체를 인용하는 줄) -->

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

원문 수치가 누락 없이 옮겨져 있다. RoboArena 2026년 4월 스냅샷(DreamZero 1750, Pi-0.5 1622, Pi-FAST 1592, Pi-0 1475), CALVIN ABC→D의 GR-1 3.06/5, 연산량 표(VLA Foundry 약 6.9 ZFLOP부터 UniPi 약 167 ZFLOP까지)와 약 7.4배 격차, action chunk당 590~800ms 대 Pi-0.5 약 190ms가 모두 그대로다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

원문 게시 사흘 뒤에 올라온 글이라 이후 상황 변화는 반영돼 있지 않다. 원문의 각주와 Acknowledgements, Sources 목록은 옮기지 않았으므로 인용 계보를 따라가려면 원문을 봐야 한다. 마지막 절의 "원문 블로그" 항목은 링크 카드로만 남아 본문 텍스트가 비어 있다.

## 6. 관련 연구 (Related Work)

- `reuss-2026-pretrained-to-imagine-fine-tuned`: 원문. 내용상 같은 자료다.
- 글 끝의 PyTorch KR 관련 글은 4건이 아니라 7건이다. NVIDIA Cosmos 3, Isaac GR00T, Gemini Robotics, SmolVLA, Helix, Gemini Robotics ER 1.6, gWorld다. 이 가운데 Helix는 `9bow-2025-helix-generalist-humanoid-vla`로 이미 이 wiki에 있고 나머지 6건은 없다.

## 7. 용어집 (Glossary)

원문 source의 용어집을 따른다. 이 글 고유 항목은 없다.

## 8. 그림 후보 (Figure Candidates)

원문 도식 23개가 모두 잡혔다. 해상도는 Discourse가 최적화한 가로 1028px 버전이라 원문 원본(최대 1975px)보다 낮지만 원문 수집에서 빠진 도식은 한국어판에서만 얻을 수 있다. 페이지 전체 스크린샷 1장과 요소 크롭 21장(fig25~fig45)이 아카이브에 함께 있다. 크롭은 fetched 원본과 같은 영역을 잘라낸 것이라 큐레이션 대상은 아니지만, 트레이서빌리티를 위해 표 뒤쪽에 함께 기록한다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 글 머리 이미지 | fetched | (아카이브) |
| fig02 | VLA와 WAM 두 가지 접근 | fetched | (원문 fig03과 중복) |
| fig03 | 로보틱스 world model 지형도 | fetched | (원문 fig04와 중복) |
| fig04 | Veo 3.1 zero-shot rollout | fetched | (원문 fig07과 중복) |
| fig05 | WAM 설계 공간 세 가지 기준 | fetched | ★ wiki 권장 (개념) |
| fig06 | inverse dynamics 계열 추상 구조 | fetched | ★ wiki 권장 (구조) |
| fig07 | UniPi 구조 | fetched | (원문 fig10과 중복) |
| fig08 | LingBot-VA 구조 | fetched | (선택) |
| fig09 | joint prediction 계열 추상 구조 | fetched | ★ wiki 권장 (구조) |
| fig10 | GR-1 구조 | fetched | (선택) |
| fig11 | CALVIN ABC→D 결과 | fetched | (선택) |
| fig12 | DreamZero 구조 | fetched | ★ wiki 권장 (구조) |
| fig13 | RoboArena 리더보드 | fetched | ★ wiki 권장 (결과) |
| fig14 | GENIMA | fetched | (선택) |
| fig15 | Cosmos Policy latent 주입 | fetched | (선택) |
| fig16 | Play-LMP 구조 | fetched | (선택) |
| fig17 | Being-H0.7 구조 | fetched | (선택) |
| fig18 | hierarchical 구조 | fetched | (선택) |
| fig19 | monolithic Transformer | fetched | (선택) |
| fig20 | Mixture-of-Transformers | fetched | ★ wiki 권장 (구조) |
| fig21 | 학습 연산량 ZFLOP 비교 | fetched | ★ wiki 권장 (비용) |
| fig22 | 세 번째 경로로의 수렴 | fetched | ★ wiki 권장 (전망) |
| fig23 | Motus 계열 hybrid 구성 | fetched | (원문 fig11과 중복) |
| fig24 | 페이지 전체 스크린샷 | screenshot | (아카이브) |
| fig25 | 글 머리 콜라주 크롭 | crop | (확인 필요, fig01과 중복) |
| fig26 | VLA/VAM 갈림길 삽화 크롭 | crop | (확인 필요, fig02와 중복) |
| fig27 | world model 지형도 크롭 | crop | (확인 필요, fig03과 중복) |
| fig28 | WAM 설계 공간 크롭 | crop | (확인 필요, fig05와 중복) |
| fig29 | inverse dynamics 추상 구조 크롭 | crop | (확인 필요, fig06과 중복) |
| fig30 | UniPi 구조 크롭 | crop | (확인 필요, fig07과 중복) |
| fig31 | LingBot-VA 구조 크롭 | crop | (확인 필요, fig08과 중복) |
| fig32 | joint prediction 추상 구조 크롭 | crop | (확인 필요, fig09와 중복) |
| fig33 | GR-1 구조 크롭 | crop | (확인 필요, fig10과 중복) |
| fig34 | CALVIN 결과 크롭 | crop | (확인 필요, fig11과 중복) |
| fig35 | DreamZero 구조 크롭 | crop | (확인 필요, fig12와 중복) |
| fig36 | RoboArena 리더보드 크롭 | crop | (확인 필요, fig13과 중복) |
| fig37 | GENIMA 예시 크롭 | crop | (확인 필요, fig14와 중복) |
| fig38 | Cosmos Policy latent 주입 크롭 | crop | (확인 필요, fig15와 중복) |
| fig39 | Play-LMP 구조 크롭 | crop | (확인 필요, fig16과 중복) |
| fig40 | Being-H0.7 구조 크롭 | crop | (확인 필요, fig17과 중복) |
| fig41 | hierarchical 구조 크롭 | crop | (확인 필요, fig18과 중복) |
| fig42 | monolithic Transformer 크롭 | crop | (확인 필요, fig19와 중복) |
| fig43 | 빈 회색 자리 표시자 (이미지 미로드) | crop | 비도식 |
| fig44 | 세 번째 경로 삽화 크롭 | crop | (확인 필요, fig22와 중복) |
| fig45 | Mixture-of-Transformers 크롭 | crop | (확인 필요, fig20과 중복) |
