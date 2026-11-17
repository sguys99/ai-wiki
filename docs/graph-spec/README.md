# 그래프 페이지 상세 설계 (Phase 2)

상태: 2026-11-17 사용자 설계 승인.

`/graph/` 재설계의 상세 설계 문서 묶음이다. 계획과 진행 기록은 `docs/graph-design-plan.md`, 시각 규칙은 `docs/graph-mockups/design-direction.md`, 정본 시안은 `docs/graph-mockups/f-atlas-orbit.html` 이다.

## 문서와 정본 범위

두 문서가 다르게 말하면 아래 표의 정본을 따른다.

| 문서 | 한 줄 설명 | 정본 범위 |
|---|---|---|
| `01-layout.md` | 영역, 브레이크포인트별 배치, 상태별 노출, 층과 토큰, 랜드마크와 초점 순서 | 화면 구성 |
| `02-interaction.md` | 마우스, 터치, 키보드, 상태 기계, 검색, 필터 결합, hash 문법과 history, 라이브 영역, 검증 체크리스트 | 인터랙션 |
| `03-schema.md` | `graph.json`, `graph/paths.json`, `graph/3d/layout.json` 의 필드와 순서, 크기 실측, 검증 불변식, Phase 3 작업 순서 | 데이터 스키마 |
| `04-layout-algorithm.md` | 조감 force 배치(빌드 계산), 궤도 배치, 전환, 라벨 규칙, 히트 테스트, 성능 예산 | 배치 |
| `05-libraries.md` | d3-force 를 빌드에서만 쓰는 결정, 버전 고정, 3D 실험 페이지의 three | 외부 라이브러리 |
| `06-extra-features.md` | 최근 추가, 학습 경로, 약한 연결, 미니 그래프, 3D 실험 페이지의 자리와 데이터 | 추가 기능 |

각 문서 끝의 "개정 기록" 이 다른 문서와 맞추느라 고친 곳을 적는다. 사용자 결정 항목은 01 M1 ~ M6, 02 N1 ~ N5, 03 D1 ~ D2, 04 10절 4건, 05 7절 3건, 06 R1 ~ R6이고, 모두 추천안대로 확정돼 각 문서의 "확정된 결정" 절에 있다. 각 문서의 "개선 제안" 은 확정 설계가 아니며 Phase 4, 5 구현 때 비용이 적은 것부터 고른다.

## 읽는 순서

1. `01-layout.md`: 화면에 무엇이 어디 있는가.
2. `04-layout-algorithm.md`: 노드가 어디에 놓이는가.
3. `02-interaction.md`: 무엇을 누르면 어떻게 되는가.
4. `03-schema.md`: 그 모든 것이 읽는 데이터.
5. `05-libraries.md`: 무엇을 들이고 무엇을 직접 짜는가.
6. `06-extra-features.md`: Phase 5에 붙일 기능.

구현자는 Phase 3에서 03 8절, Phase 4에서 01, 04, 02 순서로 보면 된다.
