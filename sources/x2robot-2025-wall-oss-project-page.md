---
title: "WALL-OSS: Igniting VLMs toward the Embodied Space — X Square Robot 프로젝트 페이지"
type: article
year: 2025
category: physical-ai
raw_path: raw/articles/x2robot-2025-wall-oss-project-page.md
raw_filename: "x2robot-2025-wall-oss-project-page.md"
source_collection: external
author: "X Square Robot"
url: "https://x2robot.com/en/research/68bc2cde8497d7f238dde690"
publisher: "x2robot.com"
fetched_at: "2026-08-28T08:47:00+0900"
extractor_tier: "chrome"
tags: [physical-ai, vla, manipulation, robot-learning]
figures:
  - id: fig01
    file: assets/x2robot-2025-wall-oss-project-page/fig01.jpg
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig01.jpg
    caption: "ID·OOD task progress 비교 막대 — 논문 Figure 7과 같은 그림이다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/x2robot-2025-wall-oss-project-page/fig02.png
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig02.png
    caption: "WALL-OSS 전체 구조 — 논문 Figure 3과 같은 그림이다"
    strategy: fetched
    curated: false
  - id: fig03
    file: assets/x2robot-2025-wall-oss-project-page/fig03.jpg
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/fig03.jpg
    caption: "학습 corpus 구성 — 논문 Figure 5와 같은 그림이다"
    strategy: fetched
    curated: false
  - id: fig04
    file: assets/x2robot-2025-wall-oss-project-page/page-full.png
    raw: raw/articles/x2robot-2025-wall-oss-project-page-figures/page-full.png
    caption: "전체 페이지 스크린샷 (상단 6,000px)"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

WALL-OSS 논문의 공식 프로젝트 페이지다. abstract와 핵심 도식 셋을 그대로 옮기고, 논문에는 정지 이미지로만 실린 평가 과제들을 영상으로 보여 준다.

## 1. 자료 정보 (Document Information)

- 게시: x2robot.com/en/research/68bc2cde8497d7f238dde690
- 발행: X Square Robot (논문과 같은 2025년 9월)
- 원본: `raw/articles/x2robot-2025-wall-oss-project-page.md` (26,185자)
- 대응 논문: [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]

수집 시 추출된 26,185자 중 실제 산문은 1,500자 남짓이다. 나머지는 페이지에 박힌 영상 플레이어의 자막 설정 UI 문자열이 반복된 것이다. 사이트 제목 태그가 "X Square Official Site X Square Robot WALL-A Large Operating Model Robot"이라 추출기가 잡은 제목도 페이지 내용과 어긋났고, frontmatter의 `title`은 실제 내용에 맞춰 다시 적었다.

## 2. 주요 기여 (Key Contributions)

새 내용은 없다. abstract가 논문과 한 글자 차이로 같고 EVALUATE·Model·DATA 세 절도 논문 문장을 줄인 것이다. 논문에 있는 "outperforms strong baselines"까지의 문장에서 "complex understanding and reasoning" 대목만 빠져 있다.

이 페이지의 값은 영상에 있다. 논문 Figure 6이 정지 프레임 네댓 장으로 보여 주는 실행 과정을 30초 안팎 영상으로 실었다. Reasoning, Long-Horizon Planning and Action Robustness, Instruction Following 세 묶음으로 나뉘어 있고 각 묶음에 여러 편이 들어 있다. 로봇이 실제로 얼마나 빠르고 매끄럽게 움직이는지는 이 영상으로만 확인된다.

영상은 수집 대상이 아니었으므로 `raw/`에는 남아 있지 않다. 동작 속도나 실패 양상을 확인하려면 원 URL을 직접 열어야 한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

Model 절은 backbone이 Qwen2.5-VL-3B라는 것, 입력이 1인칭 카메라와 팔에 달린 카메라의 영상과 텍스트 지시라는 것, 출력이 학습 단계에 따라 달라진다는 것 세 문장으로 끝난다. mixture-of-experts 구조나 static router는 도식으로만 나오고 본문 설명이 없다.

DATA 절은 논문과 한 군데서 갈린다. 논문은 corpus가 10,000시간을 넘는다고 적는데 이 페이지는 "tens of thousands of hours"라고 쓴다. 같은 수치를 다르게 반올림한 것인지 페이지가 더 나중 시점의 규모를 적은 것인지는 두 자료만으로 판단할 수 없다. 수치를 인용할 때는 논문 쪽을 따르는 게 안전하다.

Inspiration과 Integration 두 단계의 역할 분담은 논문과 같게 적혀 있다. 앞 단계는 embodied VQA·지시 이행·FAST 기반 이산 action prior를, 뒤 단계는 flow matching 기반 고빈도 연속 제어를 맡는다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

Overall 절에 한 문단이 있는데, 논문 5.2.6절의 결론 문장을 그대로 가져온 것이다. 멀티모달 co-training이 세밀한 지시 이행 능력을 크게 높이며 fine-tuning 단계까지 이 전략을 유지하면 효과가 더 커진다는 내용이다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다.

수치는 도식 하나로만 제시된다. ID 6과제와 OOD 4과제의 task progress 막대인데 논문 Figure 7과 같은 그림이다. 표는 없다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

한계 서술이 없다. 논문 6.2절의 3D 데이터 희소성 논의, 정밀 manipulation에서 π0가 앞선다는 자기 평가, 계획 감독이 전체 프레임의 1%뿐이라는 점은 모두 빠져 있다. 홍보용 페이지의 성격상 예상되는 누락이라, 이 자료만 보고 모델의 약점을 판단하면 안 된다.

## 6. 관련 연구 (Related Work)

- WALL-OSS 논문 ([[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]]) — 이 페이지가 요약하는 원문. 수치·표·한계는 전부 그쪽에 있다
- wall-x 저장소 ([[physical-ai/x-square-robot-wall-x]]) — 페이지 상단 배지에서 연결된다
- 한국어 해설 ([[physical-ai/jo-2026-wall-oss-vla-primer]]) — 같은 논문을 수식 단위로 푼 입문 글
- Wall-OSS-0.5 ([[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]]) — 후속 모델. 프로젝트 페이지 주소가 x2robot.com/en/oss로 따로 있다

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| WALL-A | 논문 Figure 2에서 WALL-OSS 구조를 가리킬 때만 쓰인 이름. 사이트 제목 태그에도 "WALL-A Large Operating Model"로 남아 있다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | ID·OOD task progress 막대 | fetched | (논문 Figure 7과 동일 — 논문 페이지에서 임베드) |
| fig02 | WALL-OSS 전체 구조 | fetched | (논문 Figure 3과 동일) |
| fig03 | 학습 corpus 구성 | fetched | (논문 Figure 5와 동일) |
| fig04 | 전체 페이지 스크린샷 | screenshot | (아카이브용) |

세 도식이 모두 논문 figure와 같은 그림이라 wiki 본문에는 임베드하지 않는다. 필요할 때 논문 페이지 쪽 `assets/zhai-2025-igniting-vlms-toward-the-embodied/`를 본다. 페이지의 고유 자산인 영상은 수집 범위 밖이다.
