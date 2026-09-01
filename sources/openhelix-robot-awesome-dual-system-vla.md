---
title: "Awesome-Dual-System-VLA"
type: repo
year: 2025
category: physical-ai
raw_path: raw/repos/openhelix-robot-awesome-dual-system-vla.md
raw_filename: "openhelix-robot-awesome-dual-system-vla.md"
source_collection: external
org: "OpenHelix-robot"
repo: "awesome-dual-system-vla"
url: "https://github.com/OpenHelix-robot/awesome-dual-system-vla"
license: "unspecified"
tags: [physical-ai, vla, manipulation, humanoid, benchmark]
---

## 한 줄 요약 (One-line Summary)

OpenHelix 저자들이 자기 논문의 서베이 절을 살아 있는 목록으로 옮긴 awesome 리스트다. "이건 dual-system이 아니다"라는 배제 목록을 나란히 둔 것이 특징이다. π0·π0.5·GR00T N1 같은 유명 모델이 그쪽에 들어가 있다.

## 1. 자료 정보 (Document Information)

- 저장소: [OpenHelix-robot/awesome-dual-system-vla](https://github.com/OpenHelix-robot/awesome-dual-system-vla)
- 생성: 2025-04-16
- star: 약 122 (수집 시점)
- 라이선스: 명시 없음
- 근거 논문: [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]] (arXiv 2505.03912)

README 하나뿐인 목록형 저장소다. 벤치마크 결과표 2개와 논문 목록 4개 절로 짜여 있고 커뮤니티 PR을 받아 계속 갱신한다고 밝힌다.

## 2. 주요 기여 (Key Contributions)

목록형 저장소가 보통 "관련 있어 보이는 것을 다 모으는" 쪽으로 흐르는데 여기는 반대로 간다. `✅ Dual-System VLA`와 `❌ Not a Dual-System VLA` 두 절을 두고 각 논문이 어느 쪽인지 판정해 놓는다. 판정 근거는 OpenHelix 논문의 기준이다. System 1이 RGB 같은 실시간 perception 입력을 직접 받지 않으면 dual-system으로 치지 않는다.

이 기준 때문에 π0, π0.5, GR00T N1, NORA, OneTwoVLA, PIVOT-R, MResT가 배제 목록에 들어간다. 이름값만 보면 어색한 배치지만 저자들이 세운 정의를 일관되게 적용한 결과다.

또 하나, CALVIN과 LIBERO 성적을 single-system과 dual-system으로 갈라 한 표에 놓았다. 구조 차이가 숫자로 어떻게 나타나는지, 혹은 나타나지 않는지가 바로 보인다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

저장소 구조는 네 덩어리다. 결과표는 CALVIN ABC→D와 LIBERO 두 벤치마크의 성적을 single-system과 dual-system으로 갈라 보여준다. 각 항목은 원 논문 arXiv 링크로 연결된다.

dual-system 목록은 manipulation과 humanoid로 나뉜다. manipulation 쪽은 2024-05 LCB부터 2025-08 Galaxea G0까지 11편이고 각 행에 제목·발표처·날짜·코드 링크가 붙는다. humanoid 쪽은 Figure의 Helix 한 건뿐인데 논문이 아니라 회사 블로그 글이라 발표처와 날짜가 비어 있다. 배제 목록은 같은 형식으로 manipulation 6편, humanoid 1편(GR00T N1)이 들어간다.

논문 목록은 날짜 내림차순이고 GitHub star 배지가 붙어 있다. 어느 구현이 실제로 쓰이는지 가늠하는 단서다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

CALVIN ABC→D 표가 이 저장소에서 가장 정보량이 많다.

| 구분 | Method | Avg. Len. |
|---|---|---|
| Single-System | OpenVLA | 3.27 |
| Single-System | UniVLA | 3.80 |
| Single-System | Seer | 3.98 |
| Dual-System | LCB | 1.78 |
| Dual-System | RationalVLA | 2.26 |
| Dual-System | Robodual | 3.66 |
| Dual-System | OpenHelix | **4.08** |

LCB(1.78)와 RationalVLA(2.26)는 single-system 셋 모두에 뒤진다. dual-system이라고 자동으로 앞서지는 않는다. 값이 어긋나는 자리도 있다. OpenHelix의 4.08은 논문 Table 8의 3.45보다 높다. 저장소가 계속 갱신된다고 밝힌 만큼 논문 공개 이후 개선된 수치로 보인다. 논문 기준 수치를 인용할 때는 3.45, 프로젝트 현재 성적을 말할 때는 4.08로 구분하는 게 안전하다.

LIBERO 표는 양상이 다르다.

| 구분 | Method | Spatial | Object | Goal | Long | Avg. |
|---|---|---|---|---|---|---|
| Single-System | OpenVLA | 84.7 | 88.4 | 79.2 | 53.7 | 76.5 |
| Single-System | π0 | 96.8 | 98.8 | 95.8 | 85.2 | 94.2 |
| Single-System | OpenVLA-OFT | 97.6 | 98.4 | 97.9 | 94.5 | 97.1 |
| Single-System | GR00T N1 | 94.4 | 97.6 | 90.6 | 93.9 | 93.9 |
| Single-System | UniVLA | 96.5 | 96.8 | 95.6 | 92.0 | 95.2 |
| Dual-System | DexVLA | 97.2 | 99.1 | 95.6 | — | — |
| Dual-System | Hume | 98.6 | 99.8 | 99.4 | 98.6 | **98.6** |

여기서는 Hume이 98.6으로 1위지만 OpenVLA-OFT(97.1)와의 차이가 크지 않다. dual-system 항목이 둘뿐이라 표본도 얇다. 참고로 π0와 GR00T N1은 이 저장소의 배제 목록에 있으면서 결과표에서는 single-system 행으로 등장한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

라이선스가 명시돼 있지 않다. 목록 자체는 공개 정보의 정리지만 인용·재배포 조건이 불분명하다.

README만 읽어서는 왜 π0가 빠졌는지 알 수 없다. 배제 판정의 근거가 링크된 OpenHelix 논문 쪽에만 있어서다. 기준 자체도 논쟁적이다. GR00T N1이 그렇다. 저자들은 논문에서 "dual-system 범위 밖이지만 frozen 학습으로 좋은 결과를 냈다"고 다루면서도 목록에서는 배제 쪽에 넣는다.

결과표의 출처 시점이 표시되지 않는다. OpenHelix 4.08처럼 논문과 어긋나는 값이 섞여 있는데 어느 버전인지 알 수 없다.

humanoid 절에는 Figure의 Helix 한 건이 사실상 전부인데 Helix에는 논문이 없다. 검증할 정보가 없으니 절 자체가 비어 있는 것에 가깝다.

## 6. 관련 연구 (Related Work)

이 저장소의 판정 기준과 구조 분류는 전부 [[physical-ai/cui-2025-openhelix-a-short-survey-empirical]]에서 온다. 논문이 Table 1로 고정해 둔 6종 비교를 저장소가 계속 자라는 목록으로 넓혔다.

목록에 등장하는 모델 중 wiki에 페이지가 있는 것은 π0, π0.5, GR00T N1, OpenVLA다. 넷 다 배제 목록 쪽이거나 single-system 결과 행에 있어 이 저장소에서 dual-system 진영과 대조된다.

같은 성격의 큐레이션 저장소로 [[physical-ai/keon-awesome-physical-ai]]와 [[physical-ai/natnew-awesome-physical-ai]]가 있다. 두 곳은 physical AI 전반을 넓게 훑는 데 반해 여기는 dual-system 하나로 좁고 대신 판정을 내린다.

## 7. 용어집 (Glossary)

- **awesome 리스트** — 특정 주제의 자료를 큐레이션해 모은 GitHub 목록형 저장소 관례. 보통 README 하나로 이뤄진다.
- **Avg. Len.** — CALVIN의 주 지표. 한 평가 시퀀스에서 연속으로 완료한 과제 수의 평균이며 최대 5다.
- **LIBERO Spatial / Object / Goal / Long** — LIBERO 벤치마크의 네 과제군. 각각 공간 배치 변화, 물체 변화, 목표 변화, 장기 과제에 대한 일반화를 잰다.
- **Hume** — 2025-05 공개된 dual-system VLA로 이 저장소 LIBERO 표의 1위(98.6)다.
- **Galaxea G0** — 2025-08 공개된 dual-system VLA. 목록에서 가장 최신 항목이다.
