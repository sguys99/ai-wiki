---
title: "RoboCasa 프로젝트 페이지 (RoboCasa365 공식 홈)"
type: article
year: 2026
category: physical-ai
source: robocasa-2026-robocasa365-project-page.md
raw_path: raw/articles/robocasa-2026-robocasa365-project-page.md
raw_filename: "robocasa-2026-robocasa365-project-page.md"
source_collection: external
author: "RoboCasa Team (UT Austin·NVIDIA Research)"
url: "https://robocasa.ai/"
publisher: "robocasa.ai"
fetched_at: "2026-09-04T18:32:37+0900"
extractor_tier: "chrome"
tags: [physical-ai, simulator, benchmark, robot-dataset]
figures:
  - id: fig01
    file: assets/robocasa-2026-robocasa365-project-page/page-full.png
    raw: raw/articles/robocasa-2026-robocasa365-project-page-figures/page-full.png
    caption: "프로젝트 페이지 전체 스크린샷 — 릴리스 노트, 주방 장면 그리드, 물체 라이브러리, 팀 소개 순"
    strategy: screenshot
    curated: true
---

## 요약 (Summary)

RoboCasa 프로젝트의 공식 홈페이지다. 2024년 RSS 논문과 2026년 ICLR 논문(RoboCasa365)을 한 페이지에서 소개하고 장면·물체·과제를 어떻게 만들었는지 영상과 함께 설명한다. 상단 내비게이션에 논문 두 편, 코드, 문서, leaderboard 링크가 걸려 있다.

![[assets/robocasa-2026-robocasa365-project-page/page-full.png]]
*Figure: 프로젝트 페이지 전체 스크린샷. 릴리스 노트에서 시작해 주방 장면 그리드, 텍스처·물체 라이브러리, 팀 소개로 이어진다 (robocasa.ai, 2026-09-04 수집, 상단 6,000px)*

논문을 읽기 전 훑는 자리로 쓰기 좋다. 성공률표나 비교 실험은 없고 수치는 규모에 한정된다.

## 논문에 없는 것 (Beyond the Papers)

RoboCasa365 논문이 든 skill은 여덟 가지(pick-and-place, 문 여닫기, 서랍 여닫기, 손잡이 비틀기, 레버 돌리기, 버튼 누르기, 삽입, 이동)인데 이 페이지에는 선반 밀기와 뚜껑 여닫기가 더 붙어 10개다. atomic task 65종이 이 열 가지에 모두 걸쳐 있다고 적는다. 논문 본문과 홈페이지 중 어느 쪽이 최신 릴리스를 반영하는지 명시되지 않아 둘 다 봐야 한다.

물체 출처가 구체적이다. 3,200개 이상이 Objaverse 1.0, LightWheel AI, Luma AI 생성분에서 온다. 텍스처는 MidJourney로 만들어 벽·바닥·조리대·수납장 패널에 100장씩 준비했다.

릴리스 노트에는 2026년 7월 항목으로 target composite task 데이터셋에 프레임 단위 subtask 주석이 추가됐다고 적혀 있다. 매 timestep에 subtask 인덱스, atomic skill 이름, 단계 구분(pick·place·navigate), 자연어 지시문이 붙는다. 계층적 policy 학습을 지원하려는 목적이다. policy는 현재 observation을 받아 다음 action을 정하는 함수를 말한다. 이 주석은 논문 본문에는 없다.

leaderboard도 홈페이지에만 있는데 Diffusion Policy·π0·GR00T와 사용자 제출 모델을 함께 세운다.

## 규모 수치 (Scale)

| 항목 | 값 |
|---|---|
| 일상 과제 | 365종 (atomic 65 포함) |
| 주방 장면 | 2,500개 (원래 120개) |
| 3D 물체 | 3,200개 이상, 150개 이상 범주 |
| 사람 시연 | 600시간 이상 |
| 합성 시연 | 1,600시간 이상 |
| 텍스처 | 벽·바닥·조리대·수납장 각 100장 |

## 한계 (Limitations)

프로젝트 페이지라 실패 사례나 미해결 문제를 다루지 않는다. 정량 비교가 필요하면 RoboCasa365 논문이나 leaderboard로 가야 한다.

수집 쪽 한계도 있다. 페이지 콘텐츠의 상당 부분이 영상이라 텍스트로는 남지 않는다. skill별 절과 composite task 절의 제목만 있고 본문이 비어 있는 것이 그 때문이다. 스크린샷도 6,000px에서 잘려 Citation 영역은 이미지에 담기지 않았다.

## 이 저장소 안에서의 위치 (Position in This Wiki)

이 저장소는 같은 프로젝트의 논문·저장소·프로젝트 페이지를 한 카테고리에 모아 두는 방식을 쓴다. π 계열과 WALL-OSS, GEAR-SONIC이 그렇게 묶여 있고 RoboCasa도 같은 모양이다. 이 페이지는 그중 진입로에 해당한다.

논문 두 편의 내용을 시각적으로 확인하려면 여기가 빠르다. [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday|RoboCasa]]의 장면·물체 구성과 [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework|RoboCasa365]]의 확장을 한 흐름으로 읽을 수 있다.

## 관련 페이지 (Related Pages)

- [[physical-ai/nasiriany-2026-robocasa365-a-large-scale-simulation-framework]] — 이 페이지가 소개하는 최신 논문. 벤치마크 결과 전부가 그쪽에 있다
- [[physical-ai/nasiriany-2024-robocasa-large-scale-simulation-of-everyday]] — 원래 릴리스 논문. 장면·과제 설계의 출처
- [[physical-ai/robocasa-robocasa]] — 페이지가 링크하는 코드 저장소. 설치와 데모 실행 절차
- [[physical-ai/nvlabs-2026-gear-sonic-project-page]] — 같은 성격의 프로젝트 페이지 자료. 영상 중심이라 텍스트 추출이 얇다는 한계도 같다
- [[overviews/physical-ai-overview]] — physical-ai 분류 기준과 학습 경로 허브
