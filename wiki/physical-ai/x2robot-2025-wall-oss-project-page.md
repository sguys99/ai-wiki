---
title: "WALL-OSS: Igniting VLMs toward the Embodied Space — X Square Robot 프로젝트 페이지"
type: article
year: 2025
category: physical-ai
source: x2robot-2025-wall-oss-project-page.md
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

## 요약 (Summary)

WALL-OSS 논문의 공식 프로젝트 페이지다. abstract와 핵심 도식 셋을 그대로 옮기고, 논문에는 정지 이미지로만 실린 평가 과제들을 영상으로 보여 준다.

새 내용은 없다. abstract가 논문과 한 글자 차이로 같고 EVALUATE·Model·DATA 세 절도 논문 문장을 줄인 것이다. 이 페이지를 따로 두는 이유는 영상 때문이다. 논문 Figure 6이 정지 프레임 네댓 장으로 보여 주는 실행 과정을 30초 안팎 영상으로 실었고, 로봇이 실제로 얼마나 빠르고 매끄럽게 움직이는지는 여기서만 확인된다.

## 이 페이지에만 있는 것 (What Is Unique Here)

영상이 Reasoning, Long-Horizon Planning and Action Robustness, Instruction Following 세 묶음으로 나뉘어 있고 각 묶음에 여러 편이 들어 있다. 수집 범위가 텍스트와 정지 이미지였으므로 `raw/`에는 영상이 남아 있지 않다. 동작 속도나 실패 양상을 확인하려면 원 URL을 직접 열어야 한다.

## 논문과 어긋나는 대목 (Discrepancies)

DATA 절의 corpus 규모가 갈린다. 논문은 10,000시간을 넘는다고 적는데 이 페이지는 "tens of thousands of hours"라고 쓴다. 같은 수치를 다르게 반올림한 것인지 페이지가 더 나중 시점의 규모를 적은 것인지는 두 자료만으로 판단할 수 없다. 수치를 인용할 때는 논문 쪽을 따르는 게 안전하다.

abstract도 완전히 같지는 않다. 논문의 "complex understanding and reasoning" 대목이 페이지에서는 빠져 있다.

한계 서술은 통째로 없다. 논문 6.2절의 3D 데이터 희소성 논의, 정밀 manipulation에서 π0가 앞선다는 자기 평가, 계획 감독이 전체 프레임의 1%뿐이라는 점이 모두 빠져 있다. 홍보용 페이지라 예상되는 누락이지만, 이 자료만 보고 모델의 약점을 판단하면 안 된다.

## 본문에 담긴 것 (Contents)

Model 절은 backbone이 Qwen2.5-VL-3B라는 것, 입력이 1인칭 카메라와 팔에 달린 카메라의 영상과 텍스트 지시라는 것, 출력이 학습 단계에 따라 달라진다는 것 세 문장으로 끝난다. mixture-of-experts 구조나 static router는 도식으로만 나오고 본문 설명이 없다.

Inspiration과 Integration 두 단계의 역할 분담은 논문과 같게 적혀 있다. 앞 단계는 embodied VQA·지시 이행·FAST 기반 이산 action prior를, 뒤 단계는 flow matching 기반 고빈도 연속 제어를 맡는다. FAST tokenizer는 action chunk를 압축해 이산 토큰으로 적는 방식이고, flow matching은 noise에서 데이터로 향하는 vector field를 학습해 샘플을 만드는 생성 기법이다.

Overall 절의 한 문단은 논문 5.2.6절 결론을 그대로 가져온 것이다. 멀티모달 co-training이 세밀한 지시 이행 능력을 크게 높이며 fine-tuning 단계까지 이 전략을 유지하면 효과가 더 커진다는 내용이다. co-training은 성격이 다른 여러 데이터 원천을 하나의 학습 mixture에 함께 넣는 방식이다.

수치는 도식 하나로만 제시된다. in-distribution 6과제와 out-of-distribution 4과제의 task progress 막대인데 논문 Figure 7과 같은 그림이라 [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]] 쪽에 임베드해 두었다.

## 수집 메모 (Collection Notes)

추출된 26,185자 중 실제 산문은 1,500자 남짓이다. 나머지는 페이지에 박힌 영상 플레이어의 자막 설정 UI 문자열이 반복된 것이다. 사이트 제목 태그가 "X Square Official Site X Square Robot WALL-A Large Operating Model Robot"이라 추출기가 잡은 제목도 내용과 어긋났고, frontmatter의 `title`은 실제 내용에 맞춰 다시 적었다.

내려받은 도식 셋은 모두 논문 figure와 같은 그림이라 이 페이지에는 임베드하지 않는다.

## 관련 페이지 (Related Pages)

- [[physical-ai/zhai-2025-igniting-vlms-toward-the-embodied]] — 이 페이지가 요약하는 원문. 수치·표·한계는 전부 그쪽에 있다
- [[physical-ai/x-square-robot-wall-x]] — 페이지 상단 배지에서 연결되는 코드 저장소
- [[physical-ai/jo-2026-wall-oss-vla-primer]] — 같은 논문을 수식 단위로 푼 한국어 해설
- [[physical-ai/x-square-robot-2026-wall-oss-05-technical-report]] — 후속 모델. 프로젝트 페이지 주소가 x2robot.com/en/oss로 따로 있다
- [[overviews/physical-ai-overview]] — 도메인 허브
