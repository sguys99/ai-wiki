---
title: "Physical AI 연구 한 번에 살펴보기 2편: 물리를 이해하는 생성 모델과 월드 시뮬레이터"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/9bow-2026-physics-aware-generation-world-simulator.md
raw_filename: "9bow-2026-physics-aware-generation-world-simulator.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/physical-ai-2/10771"
publisher: "PyTorch KR (discuss.pytorch.kr)"
published: "2026-06-19"
tags: [physical-ai, world-model, simulator, benchmark]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig01.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig01.jpg
    caption: "글 대표 이미지. 이미지와 영상과 3D 생성에서 physics-aware generation과 물리 시뮬레이션을 거쳐 world simulator로 나아가는 흐름"
    strategy: fetched
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig02.png
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig02.png
    caption: "논문 Figure 1 재수록. 생성 AI가 상호작용성과 physics-aware generation을 얻어 world model로 수렴하는 개념도"
    strategy: fetched
    curated: false
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig03.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig03.jpg
    caption: "논문 Figure 4 재수록. 물리 재료와 시뮬레이션 기법과 물리 엔진 세 가지 구성 요소"
    strategy: fetched
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig04.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig04.jpg
    caption: "논문 Figure 3 재수록. PAG-E 여섯 패러다임 배선도"
    strategy: fetched
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/9bow-2026-physics-aware-generation-world-simulator/fig05.jpg
    raw: raw/articles/9bow-2026-physics-aware-generation-world-simulator-figures/fig05.jpg
    caption: "논문 Figure 2 재수록. 물리 인지가 나쁜 영상과 좋은 영상 대조"
    strategy: fetched
    curated: false
---

## 한 줄 요약 (One-line Summary)

PyTorch 한국 사용자 모임이 Physical AI 서베이 두 편을 묶어 소개하는 시리즈의 2편으로, arXiv 2501.10928 "Generative Physical AI in Vision"을 한글로 풀어 쓴 해설 글이다.

## 1. 자료 정보 (Document Information)

- 제목: Physical AI 연구 한 번에 살펴보기 2편: 물리를 이해하는 생성 모델과 월드 시뮬레이터 <!-- lint-terms: ignore 원문 기사 제목 인용 -->
- 작성: 9bow (박정환), PyTorch 한국 사용자 모임
- 게시: 2026-06-19, discuss.pytorch.kr 읽을거리 게시판
- 원 논문: Liu 2025, Generative Physical AI in Vision: A Survey (arXiv 2501.10928)
- 시리즈 1편: Zhang 2026 Physical AI 서베이 해설 (discuss.pytorch.kr/t/physical-ai-1-2-llm-vla/10770)
- 분량: 약 16,600자, 원문 도식 4종 재수록 + 대표 이미지 1종
- 글 말미에 "GPT 모델로 정리한 글을 바탕으로 한 것"이라는 저자 고지가 붙어 있다

## 2. 주요 기여 (Key Contributions)

- 서베이 골격을 한글로 정리했다. PS, PU, G, PUG, PAG-E, PAG-I 여섯 개념 정의와 Table 1 비교표를 한글 표로 옮겼다. 원 논문의 형식 정의를 그대로 따라가되 수식과 산문을 함께 붙인다.
- PAG-E 여섯 패러다임 해설: Gen-to-Sim부터 Sim-evaluated Gen까지 각각을 소절로 나누고 대표 방법마다 arXiv 링크를 걸었다. 논문 본문의 방법 나열을 읽기 좋은 순서로 재배치한 부분이다.
- 평가 벤치마크 정리로는 PhyBench, PhyGenBench, VideoPhy, VideoPhy2, Physics-IQ, PisaBench, PhyCoBench의 규모와 채점 방식을 불릿으로 압축했다.
- 1편에서 그린 "LLM의 world 지식 → grounding → action → 예측과 시뮬레이션 → embodied 배포" 로드맵 중 예측과 시뮬레이션 칸을 이 서베이가 확대한 것이라고 시리즈 안에서 위치를 잡아준다. 두 서베이를 잇는 이 배치가 원 논문에는 없는 부분이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

원 논문 요약이 본문의 대부분이라 방법론은 `sources/liu-2025-generative-physical-ai-in-vision.md`와 겹친다. 여기서는 이 글이 원문보다 더 풀어 쓴 대목만 적는다.

- 개념 구분을 문장으로 풀었다. PAG-E와 PAG-I는 Table 1에서 "명시적 물리 모델" 행 하나로만 갈리고 "물리 세계 이해" 행은 둘 다 참이다. PUG는 물리 입출력도 명시적 모델도 없다. 이 둘을 표 아래 두 문장으로 짚는다. 원문 표만 봐서는 놓치기 쉽다.
- Gaussian Splatting을 시뮬레이션과 잇는 이유: 장면을 입자처럼 다루기 때문에 물리 시뮬레이션과 결합이 자연스럽다. 그래서 PAG-E의 상당수가 가우시안을 시뮬레이션 요소로 재해석한다고 적는다. 원문은 NeRF와 Gaussian Splatting을 넓은 의미의 생성 모델로 포함시키는데 왜 그렇게 묶는지는 이 글이 한 문단으로 풀어 놓았다.
- 확산 모델 계보를 배경으로 DDIM과 DPM-Solver 같은 가속 샘플러와 latent diffusion, classifier-free guidance를 함께 든다.
- 모델과 데이터셋을 키워도 분포 밖 물리 일반화가 나아지지 않았고 모델이 비슷한 학습 예시의 존재에 의존한다는 Kang 등의 발견을 특히 눈여겨볼 결과로 꼽아 "더 많은 데이터가 곧 더 나은 물리 이해는 아니다"라는 한 줄로 정리한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

글이 옮긴 수치는 원 논문과 일치한다.

| 항목 | 글에 적힌 값 | 원 논문 대조 |
|---|---|---|
| Cosmos-Reason1 ontology | 3개 대분류, 16개 세부 범주 | 일치 (Table 3) |
| Cosmos-Reason1 문항 | 이진 2,828 + 객관식 2,909 = 5,737, 그중 604개가 영상 426편과 연결 | 일치 |
| WISA-32K | 영상 약 32,000편, 물리 현상 17종 | 일치 |
| PISA | 실제 361편 + Kubric 합성 60편 | 일치 |
| PhyBench | 프롬프트 700개, 시나리오 31개, 4개 유형 | 일치 |
| PhyGenBench | 프롬프트 160개, 물리 법칙 27개 | 일치 |
| VideoPhy / VideoPhy2 | 캡션 688개, 모델 12종 / 행동 197종, 프롬프트 3,940개, 5점 리커트 | 일치 |
| Physics-IQ | 실세계 영상 396편, 이후 5초 예측 | 일치 |
| PhyCoBench | 7개 범주, 프롬프트 120개 | 일치 |

평가 지표를 사람 평가, VLM 기반 평가, 자동 정량 평가 셋으로 나눈 구성도 원문 6.2절 그대로다. 자동 지표로 trajectory L2, Chamfer Distance, IoU와 가중 IoU, MSE를 든다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 원 논문 요약이라 독자적 평가나 반론은 없다. 저자 스스로 "GPT 모델로 정리한 글을 바탕으로 했다"고 고지하며 원문 대조를 권한다.
- 논문 Table 2에는 PAG-E 방법 38편이 한 표로 정리돼 있다. 이 글은 그 표를 옮기지 않았다. 방법별 물리 엔진과 파라미터 취득 경로를 한눈에 보려면 논문 쪽을 봐야 한다.
- 향후 방향 여섯 가지를 한 문단에 몰아 나열한다. 원문에서 각 방향에 붙은 근거는 대부분 생략됐다.
- 전문 용어를 한글 직역으로 옮긴 대목이 많다. 이 wiki의 표기 규칙과는 다르므로 인용할 때 canonical 표기로 바꿔 적는다.

## 6. 관련 연구 (Related Work)

- 시리즈 1편은 Zhang 2026의 Physical AI 서베이를 다룬다. 이 저장소에는 그 논문 PDF가 `raw/papers/zhang-2026-a-survey-of-physical-ai.pdf`로 들어와 있다.
- 글이 함께 건 링크: NVIDIA Cosmos 소개 글, World Action Model 글, PyTorch KR의 awesome-physical-ai 저장소.
- 이 저장소에서 가까운 페이지는 Li 2025 world model 서베이와 Hou 2026 로봇 학습용 world model 정리다.

## 7. 용어집 (Glossary)

이 글에서만 쓰는 한글 표기와 이 wiki의 canonical 표기 대응이다. 본문 인용 시 오른쪽을 쓴다.

| 글의 표기 | 이 wiki 표기 |
|---|---|
| 월드 모델 / 월드 시뮬레이터 | world model / world simulator <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물리 인지 생성 | physics-aware generation (PAG) <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 점수 증류 샘플링 | score distillation sampling <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 물질점 방법 | Material Point Method (MPM) <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 가우시안 스플래팅 | Gaussian Splatting <!-- lint-terms: ignore 표기 대응표라 왼쪽 열은 원문 표기 그대로 둔다 --> |
| 체화 AI | embodied AI |

## 8. 그림 후보 (Figure Candidates)

| id | 출처 | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 글 대표 이미지 | physics-aware generation에서 world simulator로 나아가는 흐름 | fetched | ★ wiki 권장 (이 글 고유) |
| fig02 | 논문 Figure 1 | 생성 AI가 world model로 수렴하는 개념도 | fetched | (논문 페이지와 중복) |
| fig03 | 논문 Figure 4 | 물리 시뮬레이션 세 가지 구성 요소 | fetched | (논문 페이지와 중복) |
| fig04 | 논문 Figure 3 | PAG-E 여섯 패러다임 배선도 | fetched | (논문 페이지와 중복) |
| fig05 | 논문 Figure 2 | 물리 인지 좋고 나쁜 영상 대조 | fetched | (논문 페이지와 중복) |

fig02~fig05는 논문 도식을 그대로 재수록한 것이라 해상도가 논문 크롭보다 낮다. wiki 임베드는 논문 페이지 쪽 크롭을 쓰고 이 페이지에는 글 고유 이미지만 둔다.
