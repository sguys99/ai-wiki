---
title: "Google’s Harness²: The Open-Source Framework That Helps AI Agents Improve Without Retraining Their…"
type: article
year: 2026
category: agents
raw_path: raw/articles/gupta-2026-googles-harness2-the-open-source.md
raw_filename: "gupta-2026-googles-harness2-the-open-source.md"
source_collection: external
author: "Mehul Gupta"
url: "https://medium.com/data-science-in-your-pocket/googles-harness%C2%B2-the-open-source-framework-that-helps-ai-agents-improve-without-retraining-their-7ccaf2604ddf"
publisher: "Data Science in Your Pocket (Medium)"
tags: [harness-evolution, explainer, agent-harness]
figures:
  - id: fig01
    file: assets/gupta-2026-googles-harness2-the-open-source/fig01.jpg
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/fig01.jpg
    caption: "글 머리의 Unsplash 사진(Zulfugar Karimov 촬영). 본문 내용과 관련된 도식이 아니다"
    strategy: fetched
    curated: false
  - id: fig02
    file: assets/gupta-2026-googles-harness2-the-open-source/page-full.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/page-full.png
    caption: "Medium 글 전체 페이지 스크린샷(상단 6,000px 절단)"
    strategy: screenshot
    curated: false
  - id: fig03
    file: assets/gupta-2026-googles-harness2-the-open-source/crop01.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/crop01.png
    caption: "자동 크롭 1. Medium 가입 유도 창이 사진 위를 덮은 화면이라 도식이 없다"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/gupta-2026-googles-harness2-the-open-source/crop02.png
    raw: raw/articles/gupta-2026-googles-harness2-the-open-source-figures/crop02.png
    caption: "자동 크롭 2. 페이지 영역을 잘라 낸 이미지로 도식이 담겨 있지 않다"
    strategy: crop
    curated: false
---

## 한 줄 요약 (One-line Summary)

Mehul Gupta가 Medium 매체 Data Science in Your Pocket에 쓴 Harness² 해설로, 모델을 바꾸지 않고 모델을 둘러싼 harness를 실행 증거로 고친다는 발상을 Propose, Probe, Compose 예시와 두 수준 recursion으로 풀고 보고된 이득을 읽을 때의 주의점, 로컬 실행 절차, 네트워크 보안 경고를 덧붙인다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 제목 | Google’s Harness²: The Open-Source Framework That Helps AI Agents Improve Without Retraining Their… (원 페이지 제목 자체가 말줄임표로 끝난다) |
| 저자 | Mehul Gupta |
| 매체 | Data Science in Your Pocket (Medium publication) |
| 발행 | 2026-10-17, 읽기 시간 11분 |
| 근거 자료 | google-research/harness2 저장소 README와 docs/EXPERIMENTS.md. 논문 수치를 저장소 보고치로 인용한다 |

## 2. 주요 기여 (Key Contributions)

- 에이전트 실패의 원인을 모델 능력이 아니라 사용 방식(잘못 설계된 시스템 프롬프트, 잘못된 tool call, 이전 결정 망각, 나쁜 실행 전략)에서 찾는 관점을 입문자 눈높이로 소개한다.
- Propose, Probe, Compose를 구체 시나리오(재무 문서 보고서 작성, 코딩 작업 두 버전 비교)로 풀이한다.
- 보고된 이득이 최대치이며 점수 척도가 서로 다르다는 점, 비용과 held-out 검증이 필요하다는 점 등 결과 해석의 주의점을 정리한다.
- 실행 절차와 보안 경고를 저장소 문서에서 옮겨 실무 관점의 체크 포인트를 제시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 harness의 정의

LLM 자체는 입력을 받아 출력을 내는 모델이다. AI 에이전트는 그 주위에 실행 층을 더해 tool use, 파일 검사, 코드 실행, 작업 위임, 다단계 수행을 가능하게 하며 이 주변 인프라가 agent harness다. 글이 드는 전형적 구성은 역할을 정하는 시스템 프롬프트, 행동을 제약하는 가드레일, 이전 상호작용 정보를 주는 메모리, tool 사용 지침, 재사용 절차인 스킬, 위임 작업을 맡는 서브에이전트, 기능을 확장하는 스크립트와 plugin이다. "모델이 결정을 만들지만 harness가 그 결정이 행동으로 바뀌는 방식에 영향을 준다."

### 3.2 Propose, Probe, Compose 시나리오

| 단계 | 글의 예시 |
|---|---|
| Propose | 재무 문서 묶음을 분석해 구조화 보고서를 내는 에이전트가 tool 지침이 모호하거나, 추출 수치를 검증하지 않거나, 정보가 다 모였는지 확인하기 전에 요약하는 문제를 겪는다. 후보 하나는 tool 선택 지침을, 다른 후보는 검증 절차를, 또 다른 후보는 중간 정보 정리 방식을 바꾼다. 목적은 보기 좋은 프롬프트가 아니라 모델을 둘러싼 시스템의 대안 구성을 탐색하는 것이다 |
| Probe | 같은 코딩 작업에서 한 버전은 파일을 바로 고치다 나중에 요구 사항을 오해했음을 알게 되고 다른 버전은 관련 파일과 의존성을 먼저 살핀 뒤 고친다. 두 실행 모두 harness가 행동에 미친 영향의 증거가 된다. 매 단계 정답 피드백이 필요 없다는 점이 핵심이며 이것이 평가 없이 정확성을 판단한다는 뜻은 아니다 |
| Compose | 관찰된 차이로 정제 harness를 만든다. 한 작업에서 실행을 개선한 변경이 다른 작업에서는 무관할 수 있고 워크플로 한 부분을 개선하며 다른 곳에 문제를 낼 수도 있으므로 모든 제안을 그대로 받지 않는다 |

글은 이 과정을 "대안 구성을 제안하고 행동을 probe하고 정제된 구성을 합성하고 추가 개선이 비용만큼 가치 있을 때 반복한다"로 요약한다.

### 3.3 두 수준 recursion

- 작업 수준 recursion: 현재 작업에 집중한다. 병렬은 같은 단계에서 여러 후보 구성을 탐색하고 순차는 한 정제 단계의 결과를 다음 단계로 넘긴다. 글의 비유로 병렬은 더 많은 대안을, 순차는 점점 정제되는 구성의 연쇄를 만든다. 선택은 탐색 전략과 연산량 모두에 영향을 준다.
- harnessing 수준 recursion: 작업이 끝나고 개선된 harness가 채택되면 증거가 뒷받침하는 교훈을 지속적 개선 메커니즘에 남긴다. 예를 들어 편집 전에 원본 파일을 확인할 때 계속 성과가 좋다는 것이 실행 증거로 뒷받침되면 그 교훈이 이후 개선에 쓰인다. 이전 대화를 메모리 파일에 저장하는 것과는 다르다. 실험 문서에 따라 도메인 안의 작업은 순서대로 실행되며 앞선 교훈을 쓰고 다른 도메인은 동시에 실행될 수 있다.
- 저자의 단서: 교훈을 남겼다고 모든 작업에 일반화되지는 않는다. 법률 문서 분석에 도움이 된 행동이 소프트웨어 엔지니어링에는 도움이 안 될 수 있다.

### 3.4 수정 대상 구성 요소와 해석

저장소가 노출하는 8개 구성 요소(시스템 프롬프트, 가드레일, 메모리, tool guidance, 서브에이전트, 스킬, 스크립트, plugin)를 나열하고 이것이 컨텍스트 구성, 모델과 도구 사이 인터페이스, delegation, tool 실행 루프 안의 행동에 영향을 준다고 정리한다. 어떤 도구를 부를지 모르는 실패라면 프롬프트보다 tool guidance 수정이 적절할 수 있고 반복 가능한 검증 절차가 필요하면 스킬이나 스크립트가 더 나은 개입일 수 있다. 즉 모든 실패를 프롬프트 엔지니어링으로 고칠 수 있다고 가정하지 않는 설계라는 점을 장점으로 든다.

### 3.5 재학습 없는 개선의 장단점

| 측면 | 내용 |
|---|---|
| 장점 1 | 에이전트 워크플로 약점을 발견할 때마다 새 모델을 학습할 필요가 없다 |
| 장점 2 | 필요한 연동이 지원되면 여러 모델과 실행 환경에 적용할 수 있다 |
| 장점 3 | 프롬프트, 스킬, 스크립트, tool 지침의 변경은 수십억 파라미터에 흩어진 변경보다 검사하기 쉽다 |
| 비용 | 후보 생성, tool 실행, 반복 실행, 평가가 모두 자원을 쓰고 API 비용이 든다. 추가 정제가 성능 향상을 보장하지 않는다 |
| 한계 | 모델이 문제를 추론하지 못하거나 지식이 없거나 지시를 안정적으로 따르지 못하면 harness 수정만으로는 부족하다. harness 최적화와 모델 학습은 관련 있지만 다른 문제를 푼다 |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저장소 보고치로 벤치마크 세 개(JobBench 전문 작업, LAB 법률 작업, WorkBuddy-Bench 오피스, 웹, 코딩 작업)와 GLM-5, Gemini 3.5 Flash를 포함한 조합 4가지에서 단일 단계 최대 이득이 WorkBuddy-Bench 11.5점, JobBench 4.5점, LAB Partial 11.8%p라고 옮기고 recursion 예산 증가가 추가 이득을 준다고 적는다.

저자가 덧붙인 해석상 주의점은 다음과 같다.

- 보고된 값은 평가 설정 전체의 최대 이득이며 모든 모델이나 벤치마크에서 보장되는 개선이 아니다. 점수 척도도 서로 달라 직접 비교할 수 없다.
- 벤치마크 결과는 baseline harness, 작업 선택, 평가 절차, 정제량에 좌우된다. 한 baseline 대비 개선이 운영 환경에서 같은 효과를 보장하지 않는다.
- 많은 비싼 실행 끝에 얻은 높은 점수가 거의 비슷한 성능의 단순한 구성보다 낫다고 단정할 수 없다.
- 실제 도입 전에는 held-out 작업으로 baseline과 정제 harness를 비교하고 성공 작업당 비용을 보고하며 여러 작업 도메인에서 개선이 유지되는지 확인하겠다고 적는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 후보 실행에 비용이 들고 개선이 일반화되지 않을 수 있으며 효과적인 harness도 모델의 모든 약점을 메우지 못한다.
- 보안: 문서가 경고하듯 실행자 네트워크 접근이 제한되지 않고 Codex는 샌드박스를 끈 채 실행된다. 공개 벤치마크 저장소의 rubric이나 평가 기준을 에이전트가 가져오면 일반화 측정이 훼손된다. GitHub와 Hugging Face 관련 호스트를 평가 전에 막으라는 권고를 옮기고 명령 실행과 파일 접근과 인터넷 접근이 가능한 자율 에이전트는 관리해야 할 보안 경계라고 일반화한다. 저자는 실행 권한, 네트워크 접근, 자격 증명 처리, 격리 모델을 검토하기 전에는 민감한 운영 시스템에서 이 구성을 돌리지 않겠다고 적는다.
- 전망: 운영 에이전트가 실패하는 이유는 모델 지능보다 잘못된 tool call, 검증 생략, 중간 결과 망각, 부적절한 워크플로 같은 시스템 수준 문제인 경우가 많고 이는 시스템 수준 해법이 필요하다. 글은 "다음 개선이 늘 더 똑똑한 모델을 요구하지는 않는다. 이미 가진 모델을 더 잘 쓰는 방법이 필요할 때가 있다"로 끝난다.

## 6. 관련 연구 (Related Work)

- Harness² 논문(Xu et al., 2026)과 google-research/harness2 저장소가 원자료다. 글은 논문의 baseline 비교나 ablation은 다루지 않는다.
- 로컬 실행 절차(uv 환경, `harness2-demo --k 2`, `.env` 설정과 `gcloud` 인증, LAB 소규모 실행 명령, `--mode sequential`, `--substrate cx`)는 저장소 README를 옮겼다.
- 고지: Harness²는 Google Research 저장소이지만 README상 Google 공식 지원 제품이 아니며 Apache 2.0 라이선스이고 동봉된 제3자 구성 요소와 데이터셋은 별도 라이선스를 따른다.

## 7. 용어집 (Glossary)

| 용어 | 뜻 |
|---|---|
| agent harness | 모델 주위에서 tool call, 파일 검사, 코드 실행, 위임, 다단계 수행을 가능하게 하는 실행 층 |
| Propose, Probe, Compose | 대안 구성 제안, 같은 작업 실행으로 행동 차이 관찰, 증거로 정제 구성 합성 |
| held-out 작업 | 정제에 쓰지 않고 평가에만 남겨 둔 작업. 저자가 실제 도입 전 비교 기준으로 제안한다 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 글 머리 Unsplash 사진 | fetched | (내용 무관) |
| fig02 | 전체 페이지 스크린샷 | screenshot | (아카이브용) |
| fig03 | 가입 유도 창이 덮인 크롭 | crop | (내용 무관) |
| fig04 | 도식 없는 페이지 크롭 | crop | (내용 무관) |

원문에는 harness 구조나 결과를 보여 주는 도식이 없다. wiki의 도식은 논문 그림으로 대신한다.
