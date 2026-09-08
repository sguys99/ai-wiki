---
title: "OpenAI, GPT-5.6 Sol·Terra·Luna 프리뷰 공개: 새 네이밍 체계와 강화된 안전 스택"
type: article
year: 2026
category: llms
raw_path: raw/articles/9bow-2026-gpt-5-6-sol-terra-luna.md
raw_filename: "9bow-2026-gpt-5-6-sol-terra-luna.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/openai-gpt-5-6-sol-terra-luna/10955"
publisher: "PyTorch Korea User Group Discuss"
tags: [openai, gpt-5-6, sol, terra, luna, llm, model-launch, ai-safety, cybersecurity, benchmark, naming, korean-summary, article]
figures:
  - id: fig01
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig01.png
    raw: raw/articles/9bow-2026-gpt-5-6-sol-terra-luna-figures/fig01.png
    source_url: "https://discuss.pytorch.kr/uploads/default/original/3X/f/0/f088bfcb17e4f7a8da3d2ba48d6391fa5a9201d9.jpeg"
    caption: "GPT-5.6 Sol, Terra, Luna의 1M 토큰당 입력, 캐시 입력, 출력 가격표"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig02.png
    raw: raw/articles/9bow-2026-gpt-5-6-sol-terra-luna-figures/fig02.png
    source_url: "https://discuss.pytorch.kr/uploads/default/original/3X/9/3/932a711265e7b71d352574355dc7f2a56344667d.png"
    caption: "Terminal-Bench 2.1에서 GPT-5.6 세 티어와 경쟁 모델을 포함한 9개 모델의 점수 막대그래프"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig03.png
    raw: "https://discuss.pytorch.kr/uploads/default/original/3X/2/3/23deec9781d3f8db9415235b180d4118deca9848.png"
    caption: "GeneBench v1에서 출력 토큰 수 대비 점수 곡선 (로컬 사본 없음)"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig04.png
    raw: "https://discuss.pytorch.kr/uploads/default/original/3X/1/0/10c215df21020a439e32c970bd3d96177000d09b.png"
    caption: "ExploitBench에서 출력 토큰 수 대비 익스플로잇 성공률 곡선 (로컬 사본 없음)"
    strategy: manual
    curated: false
---

## 한 줄 요약 (One-line Summary)

PyTorch Korea User Group 운영자 9bow(박정환)가 OpenAI의 GPT-5.6 제한적 프리뷰 발표를 한국어로 옮긴 2차 소식 글이다. GPT-5.6은 Sol, Terra, Luna 세 모델로 구성되며, 숫자 5.6이 세대를 나타내고 천체 이름이 세대와 별개로 이어지는 능력 티어를 나타내는 새 네이밍 체계를 쓴다. 글은 모델별 가격표, Terminal-Bench 2.1을 비롯한 벤치마크 수치, 계층화된 안전 스택, 미국 정부와 협의한 단계적 배포 일정을 전한다.

## 1. 자료 정보 (Document Information)

| 항목 | 내용 |
|---|---|
| 저자 | 9bow (박정환), PyTorch Korea User Group 운영자 |
| 매체 | PyTorch Korea User Group Discuss (discuss.pytorch.kr) |
| 게시일 | 2026-06-27 |
| 성격 | OpenAI 공식 발표를 커뮤니티 독자용으로 옮긴 2차 소식 글 |
| 원문 출처(OpenAI 공식) | openai.com/index/previewing-gpt-5-6-sol, deploymentsafety.openai.com/gpt-5-6-preview |
| 원문 태그 | agent, cybersecurity, product-launch, openai, llm, gpt-5, ai-safety |
| 수집 방식 | `WebFetch`로 취득한 요약 추출본 (2026-07-10). 원문 전문이 아니다 |
| 도식 | 원문 이미지 4종 중 fig01(가격표)과 fig02(Terminal-Bench 2.1 그래프)만 로컬 사본이 있다 |

### 수집본 판정

`raw/articles/`의 이 파일은 원문 전문이 아니라 요약 추출본이다. 파일 상단의 수집 메모가 `WebFetch`로 취득한 본문을 "정리한 것"이며 "취득 시점에 추출한 핵심 내용"이라고 밝히고 있다. 따라서 절 구성과 문장은 9bow의 원문 그대로가 아닐 수 있고, 아래 요약은 수집본에 남은 사실만 근거로 삼는다.

수집본은 두 겹의 2차 자료다. 9bow의 글 자체가 OpenAI 발표를 옮긴 2차 소식 글이고, 저장된 파일은 그 글을 다시 요약한 추출본이다. 수치는 모두 OpenAI 발표 기준이며 독립 검증은 없다.

## 2. 주요 기여 (Key Contributions)

1. 세 모델 라인업을 정리했다. Sol은 프런티어 추론과 장기 에이전트 작업을 맡는 플래그십, Terra는 일상 업무를 맡고 GPT-5.5 성능을 절반 가격에 제공하는 균형형, Luna는 가장 빠르고 저렴한 경량형이다.
2. 새 네이밍 체계를 짚는다. 숫자(5.6)는 세대를, 천체 이름(Sol/Terra/Luna)은 지속적인 능력 티어를 나타낸다.
3. 모델별 가격표를 입력, 캐시 입력, 출력 토큰당 단가로 옮겼다(4절). context window와 지식 컷오프 같은 추가 사양은 본문에 명시되지 않았다고 적는다.
4. Terminal-Bench 2.1, GeneBench v1, SecureBio, ExploitBench, HealthBench Professional, 프롬프트 인젝션 방어 등 벤치마크 수치를 옮겼다.
5. 네 층으로 구성된 안전 스택, 자동화 레드팀 투입량, 미국 정부와의 협의 기반 배포를 전한다.
6. 현재 제한 제공에서 수 주 내 일반 공개, 7월 Cerebras 제공까지의 가용성 일정을 정리했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

소식 글이므로 모델 아키텍처 서술은 없다. 이 절은 글이 전하는 네이밍 체계, 안전 스택 구성, 배포 방식을 다룬다.

### 네이밍 체계

숫자와 천체 이름이 서로 다른 것을 가리킨다. 숫자 5.6은 세대를 뜻하고, Sol, Terra, Luna 같은 천체 이름은 세대와 별개로 유지되는 능력 티어를 뜻한다. 글은 이를 "새로운 네이밍 체계"로 소개한다.

| 구성 요소 | 예 | 뜻 |
|---|---|---|
| 숫자 | 5.6 | 세대 |
| 천체 이름 | Sol, Terra, Luna | 지속적인 능력 티어 |

벤치마크 표에는 라인업 세 모델 외에 "GPT-5.6 Sol Ultra"라는 이름이 하나 더 나오지만, 글은 이 이름이 무엇인지 설명하지 않는다.

### 안전 스택

글은 계층화된 안전장치를 네 가지로 나열한다.

| 층 | 내용 | 글에 있는 수치 |
|---|---|---|
| 모델 내부 학습 | 탈옥 거부 | 없음 |
| 실시간 활성화 분류기 | 위험 요청 분류 | 재현율 생물학 전체 94.8%, 사이버보안 전체 81.6% |
| 계정 단위 검토 및 집행 | 없음 | 없음 |
| 차등 접근 프로그램 | 사이버 신뢰 접근, 생물 연구 신뢰 접근 | 없음 |

자동화된 레드팀에는 "70만 A100 환산 GPU 시간"을 투입해 유니버설 탈옥을 탐색했다. 각 층의 동작 원리, 분류기의 입력, 차등 접근의 심사 기준은 글에 없다.

### 정부 협의 기반 배포

OpenAI는 미국 정부와의 협의 과정에서 출시 전에 모델의 계획과 능력을 미리 공유했다. 다만 "이러한 정부 검토 절차가 장기적인 기본값이 되어서는 안 된다"는 입장을 함께 명시했다.

글이 인용한 OpenAI의 입장은 다음과 같다. "행정부와 함께 사이버 행정명령 프레임워크와 향후 모델 출시를 위한 반복 가능한 절차를 마련하면서, 수 주 내에 더 넓은 공개로 가는 가장 확실한 경로라고 판단했다." 즉 이번 협의를 반복 가능한 절차의 출발점으로 삼되, 정부 검토가 기본값이 되는 것은 경계한다는 두 입장이 한 글에 함께 있다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

### 가격

1M 토큰 기준 가격이다.

| 모델 | 입력 | 캐시 입력 | 출력 |
|---|---|---|---|
| Sol | $5.00 | $0.50 | $30.00 |
| Terra | $2.50 | $0.25 | $15.00 |
| Luna | $1.00 | $0.10 | $6.00 |

context window와 지식 컷오프 등 추가 사양은 본문에 명시되지 않았다.

### Terminal-Bench 2.1

본문 표는 네 모델만 옮겼다.

| 모델 | 점수 |
|---|---|
| GPT-5.6 Sol Ultra | 91.9% |
| GPT-5.6 Sol | 88.8% |
| Claude Mythos 5 | 88.0% |
| GPT-5.6 Terra | 84.3% |

같은 절에 실린 그래프(fig02)에는 9개 모델이 있다. 그래프 판독값은 GPT-5.6 Sol Ultra 91.9%, GPT-5.6 Sol 88.8%, Claude Mythos 5 88.0%, GPT-5.6 Terra 84.3%, Claude Fable 5 84.3%, GPT-5.5 83.4%, GPT-5.6 Luna 82.5%, Claude Opus 4.8 78.9%, Gemini 3.1 Pro Preview 70.7%다. Luna, GPT-5.5, Claude Fable 5, Claude Opus 4.8, Gemini 3.1 Pro Preview 다섯 모델의 값은 본문 텍스트에 없고 그래프에서만 읽힌다.

### 토큰 효율

| 벤치마크 | 결과 | 비고 |
|---|---|---|
| GeneBench v1 | Sol이 GPT-5.5보다 더 적은 토큰을 쓰면서 더 높은 점수 | 구체적 수치는 곡선 그래프로만 제시 |
| ExploitBench | Sol이 Mythos Preview와 유사한 성능을 출력 토큰의 약 1/3(약 120K 대 330K)로 달성 | 평가 조건 미표기 |

### SecureBio 평가

railfree 버전, 즉 안전장치를 제거한 조건의 결과다.

| 항목 | GPT-5.6 Sol | GPT-5.5 |
|---|---|---|
| 바이러스학 | 53.5% | 없음 |
| 분자생물학 | 60.0% | 없음 |
| 인간 병원체 | 68.4% | 없음 |
| 세계 최고 수준 생물학 | 68.3% | 59.7% |
| ReproBAIT | 85% | 82% |

### 기타 평가

| 항목 | 결과 |
|---|---|
| HealthBench Professional | Sol 60.5점 (GPT-5.5 대비 +8.7점) |
| 프롬프트 인젝션 방어 | Sol, Terra 1.000 (만점) |
| 함수 호출 변형 공격 | Sol 0.910 |

### 가용성과 출시 일정

| 단계 | 시점 | 채널 | 대상 |
|---|---|---|---|
| 제한 제공 | 현재 | API, Codex | 신뢰할 수 있는 파트너와 조직 |
| 일반 공개 | 수 주 내 | ChatGPT, Codex, API | 일반 사용자 |
| Cerebras 제공 | 7월 | Cerebras | 초기 일부 고객, 점진 확대 |

Cerebras에서는 Sol을 초당 최대 750토큰의 속도로 제공한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

저자가 명시한 것:

- context window와 지식 컷오프 등 추가 사양은 본문에 명시되지 않았다.
- GeneBench v1의 구체적 수치는 곡선 그래프로만 제시되어 본문에 없다.

자료에 기술이 없어 확인할 수 없는 것:

- 커뮤니티 2차 소식 글이라 수치는 OpenAI 발표를 그대로 옮긴 것이고 독립 검증은 없다. 저장된 파일 자체도 `WebFetch` 요약 추출본이라 원문의 절 구성과 문장을 확인할 수 없다.
- railfree 표기는 SecureBio에만 붙어 있다. ExploitBench와 나머지 평가의 조건은 글에 없다.
- 안전 스택 각 층의 동작 원리, 활성화 분류기의 입력, 차등 접근의 심사 기준은 글에 없다.
- Terminal-Bench 2.1 표의 "GPT-5.6 Sol Ultra"가 라인업 세 모델과 어떤 관계인지 글은 설명하지 않는다.
- 정부 검토 절차의 세부와, 이후 출시에서 이 절차가 어떻게 이어질지는 인용된 입장 외에 서술이 없다.

자료 내부의 차이:

- Terminal-Bench 2.1 본문 표는 4개 모델이지만 그래프에는 9개 모델이 있다. 텍스트와 그래프의 값은 겹치는 네 모델에서 일치한다.

향후 일정으로는 수 주 내 ChatGPT, Codex, API 일반 공개와 7월 Cerebras 제공이 예고되어 있다.

## 6. 관련 연구 (Related Work)

- [[llms/panfilov-2026-stealing-reasoning-traces-from-proprietary]]: GPT-5.6 Sol과 GPT-5.6 Luna 사이의 방어 격차를 이용해 reasoning trace를 추출하는 공격을 다룬 논문이다. 이 글이 소개한 세 티어가 공격 대상과 디코더로 등장한다.
- [[agents/magnitudedev-magnitude]]: GPT-5.6 Sol, Terra, Luna의 Artificial Analysis 지수를 로컬 모델 추천의 눈금으로 쓰는 도구 문서다. 같은 세 티어를 외부 지수로 나란히 놓은 표가 있다.

## 7. 용어집 (Glossary)

- **능력 티어(capability tier)**: 세대 번호와 별개로 이어지는 성능 등급. 글은 Sol을 플래그십, Terra를 균형형, Luna를 경량형으로 소개한다.
- **캐시 입력**: 가격표의 세 열 중 하나. 세 모델 모두 입력 단가의 1/10이다. 글은 캐시 조건을 설명하지 않는다.
- **railfree**: 안전장치를 제거한 평가 조건. 글은 SecureBio 결과에만 이 표기를 붙인다.
- **실시간 활성화 분류기**: 안전 스택의 둘째 층. 글은 생물학 전체 94.8%, 사이버보안 전체 81.6%의 재현율만 적고 동작 방식은 설명하지 않는다.
- **차등 접근 프로그램**: 사이버 신뢰 접근과 생물 연구 신뢰 접근 두 가지로 구성된 접근 제한 프로그램. 심사 기준은 글에 없다.
- **유니버설 탈옥**: 자동화 레드팀이 70만 A100 환산 GPU 시간을 투입해 탐색한 대상. 글은 정의를 적지 않는다.
- **Terminal-Bench 2.1, GeneBench v1, SecureBio, ReproBAIT, ExploitBench, HealthBench Professional**: 글에 등장하는 벤치마크 이름. 글은 각 벤치마크가 무엇을 재는지 설명하지 않는다.

## 8. 그림 후보 (Figure Candidates)

원문 이미지는 4종이다. fig01과 fig02는 수동 저장한 로컬 사본이 있고, fig03과 fig04는 원문 URL만 기록되어 있어 로컬 사본이 없다.

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "GPT-5.6 Sol, Terra, Luna의 1M 토큰당 입력, 캐시 입력, 출력 가격표" | manual | ✅ wiki 임베드 (curated) |
| fig02 | "Terminal-Bench 2.1에서 GPT-5.6 세 티어와 경쟁 모델을 포함한 9개 모델의 점수 막대그래프" | manual | ✅ wiki 임베드 (curated) |
| fig03 | "GeneBench v1에서 출력 토큰 수 대비 점수 곡선 (로컬 사본 없음)" | manual | (선택, 미수집) |
| fig04 | "ExploitBench에서 출력 토큰 수 대비 익스플로잇 성공률 곡선 (로컬 사본 없음)" | manual | (선택, 미수집) |

fig03과 fig04를 wiki에 임베드하려면 위 `raw` URL의 PNG를 사용자가 `raw/articles/9bow-2026-gpt-5-6-sol-terra-luna-figures/`에 내려받은 뒤 해당 id를 `curated: true`로 지정한다.
