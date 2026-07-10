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
    caption: "GPT-5.6 Sol·Terra·Luna 모델 가격표 소개 이미지"
    strategy: manual
    curated: true
  - id: fig02
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig02.png
    raw: raw/articles/9bow-2026-gpt-5-6-sol-terra-luna-figures/fig02.png
    source_url: "https://discuss.pytorch.kr/uploads/default/original/3X/9/3/932a711265e7b71d352574355dc7f2a56344667d.png"
    caption: "Terminal-Bench 2.1 모델별 점수 비교 그래프"
    strategy: manual
    curated: true
  - id: fig03
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig03.png
    raw: "https://discuss.pytorch.kr/uploads/default/original/3X/2/3/23deec9781d3f8db9415235b180d4118deca9848.png"
    caption: "GeneBench v1 출력 토큰 대비 점수 곡선"
    strategy: manual
    curated: false
  - id: fig04
    file: assets/9bow-2026-gpt-5-6-sol-terra-luna/fig04.png
    raw: "https://discuss.pytorch.kr/uploads/default/original/3X/1/0/10c215df21020a439e32c970bd3d96177000d09b.png"
    caption: "ExploitBench 출력 토큰 대비 익스플로잇 성공률"
    strategy: manual
    curated: false
---

> **수집 메모**: 이 문서는 rule #1 예외(사용자가 명시적으로 URL 자료 수집을 지시)에 따라 `WebFetch`로 취득한 본문을 정리한 것이다. 원문은 discuss.pytorch.kr 게시글이며, 아래는 취득 시점(2026-07-10)에 추출한 핵심 내용이다. 이미지 4종은 원문 URL만 frontmatter에 기록했고 PNG는 수동 저장 대상(rule #1로 자동 fetch ❌).

# OpenAI, GPT-5.6 Sol·Terra·Luna 프리뷰 공개

- **작성자**: 9bow (박정환) — PyTorch Korea User Group 운영자
- **작성일**: 2026-06-27 12:30 AM
- **원문 출처(OpenAI 공식)**:
  - https://openai.com/index/previewing-gpt-5-6-sol/
  - https://deploymentsafety.openai.com/gpt-5-6-preview
- **태그**: agent, cybersecurity, product-launch, openai, llm, gpt-5, ai-safety

## 개요

OpenAI가 GPT-5.6 시리즈의 제한적 프리뷰를 시작했다. 세 가지 모델로 구성된다.

- **Sol**: 플래그십 모델 (프런티어 추론, 장기 에이전트 작업)
- **Terra**: 균형형 모델 (일상 업무, GPT-5.5 성능을 절반 가격에 제공)
- **Luna**: 경량형 모델 (가장 빠르고 저렴)

**새로운 네이밍 체계**: 숫자(5.6)는 세대를, 천체 이름(Sol/Terra/Luna)은 지속적인 능력 티어를 나타낸다.

## 가격 및 사양

| 모델 | 입력 (1M 토큰) | 캐시 입력 (1M 토큰) | 출력 (1M 토큰) |
|------|---|---|---|
| Sol | $5.00 | $0.50 | $30.00 |
| Terra | $2.50 | $0.25 | $15.00 |
| Luna | $1.00 | $0.10 | $6.00 |

Context window·지식 컷오프 등 추가 사양은 본문에 명시되지 않았다.

## 벤치마크

### Terminal-Bench 2.1

| 모델 | 점수 |
|------|------|
| GPT-5.6 Sol Ultra | 91.9% |
| GPT-5.6 Sol | 88.8% |
| Claude Mythos 5 | 88.0% |
| GPT-5.6 Terra | 84.3% |

### GeneBench v1

Sol은 GPT-5.5보다 더 적은 토큰을 쓰면서도 더 높은 점수를 기록했다(구체적 수치는 곡선 그래프로만 제시).

### SecureBio 평가 (railfree 버전, 안전장치 제거)

- 바이러스학: 53.5%
- 분자생물학: 60.0%
- 인간 병원체: 68.4%
- 세계 최고 수준 생물학: 68.3% (vs GPT-5.5: 59.7%)
- ReproBAIT: 85% (vs GPT-5.5: 82%)

### ExploitBench

Sol은 Mythos Preview와 유사한 성능을 출력 토큰의 약 1/3(약 120K vs 330K)만 사용해 달성했다.

### 기타 평가

- **HealthBench Professional**: Sol 60.5점 (GPT-5.5 대비 +8.7점)
- **프롬프트 인젝션 방어**: Sol·Terra 1.000 (만점)
- **함수 호출 변형 공격**: Sol 0.910

## 안전 스택 및 단계적 배포

계층화된 안전장치를 뒀다.

- 모델 내부 학습으로 탈옥 거부
- 실시간 활성화 분류기: 생물학 전체 94.8%, 사이버보안 전체 81.6% 재현율
- 계정 단위 검토 및 집행
- 차등 접근 프로그램 (사이버 신뢰 접근, 생물 연구 신뢰 접근)

**자동화된 레드팀**: "70만 A100 환산 GPU 시간"을 투입한 유니버설 탈옥 탐색.

**정부 협의 기반 배포**: 미국 정부와의 협의 과정에서 출시 전에 모델의 계획과 능력을 미리 공유했다. 다만 "이러한 정부 검토 절차가 장기적인 기본값이 되어서는 안 된다"는 입장을 명시했다.

## 가용성 및 출시 일정

- **현재**: API·Codex를 통해 신뢰할 수 있는 파트너·조직에 제한 제공.
- **향후**: ChatGPT·Codex·API 사용자에게 수 주 내 일반 공개 예정.
- **7월 계획**: Cerebras에서 Sol을 초당 최대 750토큰의 속도로 제공(초기 일부 고객, 점진 확대).

**인용된 입장(OpenAI)**: "행정부와 함께 사이버 행정명령 프레임워크와 향후 모델 출시를 위한 반복 가능한 절차를 마련하면서, 수 주 내에 더 넓은 공개로 가는 가장 확실한 경로라고 판단했다."

## 본문 이미지

1. GPT-5.6 Sol·Terra·Luna 모델 가격표 소개 이미지 — https://discuss.pytorch.kr/uploads/default/original/3X/f/0/f088bfcb17e4f7a8da3d2ba48d6391fa5a9201d9.jpeg
2. Terminal-Bench 2.1 모델별 점수 비교 그래프 — https://discuss.pytorch.kr/uploads/default/original/3X/9/3/932a711265e7b71d352574355dc7f2a56344667d.png
3. GeneBench v1 출력 토큰 대비 점수 곡선 — https://discuss.pytorch.kr/uploads/default/original/3X/2/3/23deec9781d3f8db9415235b180d4118deca9848.png
4. ExploitBench 출력 토큰 대비 익스플로잇 성공률 — https://discuss.pytorch.kr/uploads/default/original/3X/1/0/10c215df21020a439e32c970bd3d96177000d09b.png
