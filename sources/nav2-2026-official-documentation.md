---
title: "NAV2 - Nav2 Docs"
type: article
year: 2026
category: physical-ai
raw_path: raw/articles/nav2-2026-official-documentation.md
raw_filename: "nav2-2026-official-documentation.md"
source_collection: external
author: "Open Navigation LLC"
url: "https://docs.nav2.org/rolling/"
publisher: "docs.nav2.org"
tags: [physical-ai, mobile-robot]
figures:
  - id: fig01
    kind: figure
    file: assets/nav2-2026-official-documentation/page-full.png
    raw: raw/articles/nav2-2026-official-documentation-figures/page-full.png
    caption: "docs.nav2.org 랜딩 페이지 전체 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    kind: figure
    file: assets/nav2-2026-official-documentation/crop01.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop01.png
    caption: "Nav2 로고"
    strategy: crop
    curated: false
  - id: fig03
    kind: figure
    file: assets/nav2-2026-official-documentation/crop02.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop02.png
    caption: "스폰서 로고 타일"
    strategy: crop
    curated: false
  - id: fig04
    kind: figure
    file: assets/nav2-2026-official-documentation/crop03.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop03.png
    caption: "스폰서 로고 타일"
    strategy: crop
    curated: false
  - id: fig05
    kind: figure
    file: assets/nav2-2026-official-documentation/crop04.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop04.png
    caption: "Nav2 공식 아키텍처 다이어그램. BT Navigator Server가 Controller, Planner, Behavior, Smoother, Route 서버를 조율한다"
    strategy: crop
    curated: true
  - id: fig06
    kind: figure
    file: assets/nav2-2026-official-documentation/crop05.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop05.png
    caption: "Nav2 공식 아키텍처 다이어그램 (fig05와 동일 이미지가 중복 수집됨)"
    strategy: crop
    curated: false
  - id: fig07
    kind: figure
    file: assets/nav2-2026-official-documentation/crop06.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop06.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig08
    kind: figure
    file: assets/nav2-2026-official-documentation/crop07.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop07.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig09
    kind: figure
    file: assets/nav2-2026-official-documentation/crop08.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop08.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig10
    kind: figure
    file: assets/nav2-2026-official-documentation/crop09.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop09.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig11
    kind: figure
    file: assets/nav2-2026-official-documentation/crop10.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop10.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig12
    kind: figure
    file: assets/nav2-2026-official-documentation/crop11.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop11.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
  - id: fig13
    kind: figure
    file: assets/nav2-2026-official-documentation/crop12.png
    raw: raw/articles/nav2-2026-official-documentation-figures/crop12.png
    caption: "랜딩 페이지 요소 크롭"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Nav2 공식 문서(docs.nav2.org rolling)의 랜딩 페이지다. 프로젝트의 자기 정의와 제공 기능 목록, ROS 2 배포판별 지원 상태가 여기 실려 있다. 하위 문서(Getting Started, Concepts, Configuration, Plugins)로 가는 목차도 겸한다.

## 1. 자료 정보 (Document Information)

- 발행: Open Navigation LLC (Nav2 프로젝트의 리더십과 유지보수를 맡는 조직)
- 수집 대상은 rolling 버전 랜딩 페이지 한 장이다. 하위 문서는 수집하지 않았다. 세부 주제가 필요하면 해당 페이지를 따로 수집해야 한다

## 2. 주요 기여 (Key Contributions)

- Nav2를 "ROS Navigation Stack의 전문 지원 후속작"으로 규정한다. 자율주행 차량에 쓰이는 종류의 기술을 모바일 로봇과 수상 로봇에 맞게 최적화해 다시 만들었고 전 세계 300개 이상 기업이 쓰는 production-grade framework이라는 것이 공식 소개다.
- 적용 범위를 넓게 잡는다. 거의 모든 로봇 kinematics와 dynamics, 실내외, 임의 센서 구성을 지원한다. A→B 이동만이 아니라 중간 pose, 물체 추종, complete coverage navigation 같은 과제 유형도 표현할 수 있다.
- Behavior Tree로 독립 모듈 서버들을 조율한다는 아키텍처 요지를 명시한다. task server가 경로 계산, 제어, behavior를 각각 맡고 BT와는 action server나 service 같은 ROS 인터페이스로 통신한다. 로봇 하나가 여러 BT를 바꿔 쓰며 다양한 과제를 수행한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

랜딩 페이지의 제공 도구 목록이 길다. 지도는 로드하고 서빙하고 저장하며 그 위에서 localization을 수행하고 초기 지도는 SLAM이 만든다. 경로 쪽은 대형 로봇도 기구학적으로 실행 가능한 전체 경로 계획, 충돌 회피를 겸한 경로 추종 제어, 경로 smoothing이다. 센서 데이터는 환경 모델로 변환하고 로봇 행동은 Behavior Tree로 구성하며 실패나 인간 개입 상황에는 사전 정의 behavior를 둔다. 여기에 waypoint 순차 추종과 서버 lifecycle 관리, watchdog이 더해지고 동적 plugin 로딩과 원시 센서 데이터 기반 충돌 임박 감시, Python3 API, 출력 속도 smoother까지 갖춘다. 시작용 plugin 묶음도 함께 제공한다. 전체 목록은 Navigation Plugins 페이지에 있다.

배포판 지원 상태 표도 랜딩 페이지의 실질 정보다.

| ROS 2 배포판 | 상태 |
|---|---|
| Rolling Ridley | Development |
| Lyrical Lynx | Active Support |
| Kilted Kaiju | Maintained |
| Jazzy Jalisco | Active Support |
| Iron Irwini | End of Life |
| Humble Hawksbill | Maintained |
| Galactic Geochelone | End of Life |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크는 없다. "300개 이상 기업이 신뢰", "15년의 유산 위에 구축"이라는 채택 지표가 공식 문구로 제시된다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 랜딩 페이지 한 장이라 개념 설명과 설정법, plugin 목록 같은 실질 내용은 하위 문서에 있다. 개념 쪽은 [[physical-ai/lionhong-2023-nav2-core-concepts]]가 상당 부분을 한국어로 옮겨 놓았다.
- 수집된 이미지 중 fig05가 Nav2 공식 아키텍처 다이어그램이고 fig06이 그 중복본이다. 나머지는 로고와 스폰서, 배포판 타일이다. 같은 계열의 아키텍처 그림은 [[physical-ai/yhoons-2024-ros2-nav2-intro]]의 fig02에도 실려 있다.

## 6. 관련 연구 (Related Work)

- [[physical-ai/ros-navigation-navigation2]]: 소스 repo. 인용 논문 목록(Marathon 2 등)은 repo README에 있다
- [[physical-ai/yhoons-2024-ros2-nav2-intro]], [[physical-ai/lionhong-2023-nav2-core-concepts]]: 한국어 해설 글

## 7. 용어집 (Glossary)

- **task server**: 경로 계산, 제어, behavior 등 navigation 관련 작업 하나를 맡는 독립 서버. Behavior Tree가 조율한다
- **complete coverage navigation**: 지정 영역의 모든 지점을 방문하는 과제 유형 (청소 로봇, 방제 로봇 등)
- **rolling**: ROS 2의 개발 최전선 배포판. 정식 배포판(Jazzy 등)으로 주기적으로 갈라져 나온다

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 랜딩 페이지 전체 스크린샷 | screenshot | (선택, 기록용) |
| fig05, fig06 | Nav2 공식 아키텍처 다이어그램 (동일 이미지 중복 수집) | crop | ★ wiki 권장 (architecture) |
| fig02~fig04, fig07~fig13 | 로고, 스폰서, 배포판 타일 크롭 | crop | 비권장 (도식 아님) |

fig05와 fig06의 분류는 2026-09 재작성 때 정정한 것이다. 최초 판독에서는 crop 12장을 모두 로고와 타일로 보았으나, 이미지를 다시 확인한 결과 crop04와 crop05가 랜딩 페이지 본문에 실린 공식 아키텍처 다이어그램이었다. fig05를 wiki에 임베드했다.
