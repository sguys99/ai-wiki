---
title: "RoboCasa 프로젝트 페이지 (RoboCasa365 공식 홈)"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/robocasa-2026-robocasa365-project-page.md
raw_filename: "robocasa-2026-robocasa365-project-page.md"
source_collection: external
author: "RoboCasa Team (UT Austin, NVIDIA Research)"
url: "https://robocasa.ai/"
publisher: "robocasa.ai"
fetched_at: "2026-09-04T18:32:37+0900"
extractor_tier: "chrome"
tags: [physical-ai, simulator, benchmark, robot-dataset]
figures:
  - id: fig01
    file: assets/robocasa-2026-robocasa365-project-page/page-full.png
    raw: raw/articles/robocasa-2026-robocasa365-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷. 릴리스 노트, 주방 장면 그리드, 물체 라이브러리, 팀 소개 순으로 이어진다"
    strategy: screenshot
    curated: false
---

## 한 줄 요약 (One-line Summary)

RoboCasa 프로젝트의 공식 홈페이지다. 2024년 RSS 논문과 2026년 ICLR 논문(RoboCasa365)을 한 페이지에서 함께 소개하고 장면과 물체와 과제가 어떻게 만들어졌는지를 영상과 함께 문단 단위로 설명한다. 논문에는 없는 정보로 skill 목록이 8종에서 10종으로 늘어난 것과 leaderboard 운영이 있다.

## 1. 자료 정보 (Document Information)

- **제목**: RoboCasa (부제 "Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots")
- **운영**: UT Austin Robot Perception and Learning Lab과 NVIDIA Research. Core Team은 Soroush Nasiriany, Sep Nasiriany, Abhiram Maddukuri, Yuke Zhu
- **URL**: https://robocasa.ai/ (수집 2026-09-04, `chrome` tier)
- **구성**: 상단 내비게이션에 Paper(RoboCasa), Paper(RoboCasa365), Code, Documentation, Leaderboard 다섯 개 링크
- **한 줄 성격**: 논문 두 편의 요지를 영상 중심으로 풀어놓은 프로젝트 홈. 논문을 읽기 전에 무엇을 만들었는지 훑는 자리.

## 2. 주요 기여 (Key Contributions)

자료 자체로는 새 주장을 내놓지 않는다. 두 논문의 내용을 재배열하고 영상을 붙인 소개 페이지다. 다만 논문 대조에 쓸 만한 지점이 몇 군데 있다.

skill 목록이 10개로 적혀 있다. 논문이 여덟 가지(pick-and-place, 문 여닫기, 서랍 여닫기, 손잡이 비틀기, 레버 돌리기, 버튼 누르기, 삽입, 이동)를 들었는데 여기에는 선반 밀기(Sliding Racks)와 뚜껑 여닫기(Closing/Opening Lids)가 더 붙는다. atomic task 65종이 이 열 가지를 덮는다고 적는다.

물체는 3,200개 이상이 Objaverse 1.0, LightWheel AI, Luma AI 생성분에서 온다고 밝힌다. 출처 표기도 논문보다 구체적이다. 텍스처는 MidJourney로 만들어 벽, 바닥, 조리대, 수납장 패널에 100장씩 준비했다고 적는다.

leaderboard 운영도 홈페이지에만 있다. 다만 순위표 본문은 수집되지 않아 어떤 모델이 올라 있는지는 저장소 안에서 확인할 수 없다. 추출본이 밝히는 것은 지원하는 policy 학습 모델이 Diffusion Policy와 π0와 GR00T라는 사실뿐이며, 이 셋이 곧 순위표 등재 모델이라는 근거는 없다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

페이지 구성은 네 덩이다.

개요와 릴리스 노트로 시작한다. RoboCasa365가 2,500개 주방 환경에 365개 일상 과제, 사람 시연 600시간 이상과 합성 시연 1,600시간 이상을 담는다고 요약한다. 2026년 7월 항목에는 target composite task 데이터셋에 프레임 단위 subtask 주석이 추가됐다고 적혀 있다. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분(pick, place, navigate), 자연어 지시문이 붙어 계층적 policy 학습을 지원한다는 설명이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다.

시뮬레이션 구성에서는 장면을 만든 방식(건축과 인테리어 잡지 참고, 표준 치수 모델링), cross-embodiment 지원(single-arm 모바일 플랫폼, humanoid, 팔 달린 4족), 관절과 상태 변화가 붙은 가전을 차례로 설명한다. RoboCasa365에서 장면이 120개에서 2,500개로 늘었고 실제 주택 기반 layout 50개와 새 style 50개가 더해졌다는 대목도 여기 있다.

생성형 AI 활용이 그다음이다. text-to-image로 텍스처를, text-to-3D로 물체를 만든다. 텍스처 교체를 domain randomization의 한 형태로 쓴다고 명시한다. domain randomization은 시뮬레이션 파라미터를 흔들어 sim2real 간극을 줄이는 기법이다.

마지막 과제 대목은 10가지 기본 skill을 나열하고 각 skill의 실행 영상을 붙인다. composite task는 GPT-4로 만든다고 밝히면서 "LLM이 인간 중심 인터넷 콘텐츠로 학습됐으므로 사람 행동의 생태적 통계를 담고 있다"는 논거를 반복한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

수치는 거의 없다. 성공률표나 비교 실험이 페이지에 실려 있지 않다. 규모 수치만 나열된다.

| 항목 | 값 |
|---|---|
| 일상 과제 | 365종 (atomic 65 포함) |
| 주방 장면 | 2,500개 (원래 120개) |
| 3D 물체 | 3,200개 이상, 150개 이상 범주 |
| 사람 시연 | 600시간 이상 |
| 합성 시연 | 1,600시간 이상 |
| 텍스처 | 벽, 바닥, 조리대, 수납장 각 100장 |

지원 policy 학습 방법으로 Diffusion Policy와 π0와 GR00T를 든다. 정량 비교가 필요하면 leaderboard나 RoboCasa365 논문으로 가야 한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

프로젝트 페이지라 한계 논의가 없다. 실패 사례나 미해결 문제도 다루지 않는다.

수집 자체의 한계도 있다. 페이지의 실질 콘텐츠 상당 부분이 영상이라 텍스트 추출로는 남지 않는다. skill별 절과 composite task 절이 제목만 있고 본문이 비어 있는 이유가 그것이다. 전체 스크린샷도 6,000px에서 잘려 팀 소개 아래 Citation 영역은 이미지로 남지 않았다.

## 6. 관련 연구 (Related Work)

외부 참조로 MidJourney, Objaverse, LightWheel AI, Luma AI, GPT-4를 링크한다. 논문 인용은 자기 논문 두 편의 BibTeX가 전부다.

## 7. 용어집 (Glossary)

이 자료 고유 용어만 정리한다. 도메인 공통 용어는 [[overviews/glossary-physical-ai]]와 [[overviews/glossary-llms]]에 위임한다.

- **subtask 주석**: 2026년 7월에 추가된 데이터 라벨. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분, 자연어 지시문이 붙는다.
- **leaderboard**: robocasa.ai가 운영하는 공개 순위표. 사용자 제출 모델을 포함한다.
- **LightWheel AI**: 3D asset 공급처 중 하나. RoboCasa365 논문의 감사의 글에도 시뮬레이션 asset 협력사로 나온다.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 프로젝트 페이지 전체 스크린샷 (상단 6,000px) | screenshot | ★ wiki 권장 (concept) |
