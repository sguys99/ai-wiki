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

## 한 줄 요약 (One-line Summary)

PyTorch Korea 운영자 9bow(박정환)가 OpenAI의 GPT-5.6 프리뷰 발표를 한국어로 정리한 소식 글이다. GPT-5.6은 Sol·Terra·Luna 세 모델로 나뉘고, 숫자(5.6)가 세대를, 천체 이름이 능력 티어를 가리키는 새 네이밍을 쓴다. 가격·Terminal-Bench 등 벤치마크 수치와 함께, 미국 정부와 협의해 계층화된 안전 스택을 얹고 단계적으로 공개한다는 배포 방식이 글의 절반을 차지한다.

## 1. 자료 정보 (Document Information)

- **글**: OpenAI GPT-5.6 Sol·Terra·Luna 프리뷰 한국어 소개 (discuss.pytorch.kr)
- **작성자**: 9bow (박정환) — PyTorch Korea User Group 운영자
- **발행**: 2026-06-27, 읽을거리&정보공유 게시판
- **원문(OpenAI 공식)**: openai.com/index/previewing-gpt-5-6-sol, deploymentsafety.openai.com/gpt-5-6-preview
- **비고**: OpenAI 공식 발표를 커뮤니티 독자용으로 옮긴 2차 소식 글이다. 수치는 원문 발표 기준이다.

## 2. 주요 기여 (Key Contributions)

1. 세 모델 라인업을 정리했다. Sol은 프런티어 추론과 장기 에이전트 작업을 맡는 플래그십, Terra는 GPT-5.5 성능을 절반 가격에 낸다는 균형형, Luna는 가장 빠르고 저렴한 경량형이다.
2. 네이밍 규칙도 짚는다. 숫자 5.6은 세대를 뜻하고, Sol/Terra/Luna 같은 천체 이름은 세대를 넘어 유지되는 능력 티어를 가리킨다.
3. 모델별 가격표는 입력·캐시 입력·출력 토큰당 단가로 표에 옮겼다(아래 4절).
4. 성능만큼이나 안전·배포 이야기에 지면을 많이 쓴다. 미국 정부와 협의해 "가장 견고한 안전 스택"과 함께 단계적으로 공개한다는 방식을 비중 있게 다룬다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

글이 전하는 안전 스택은 여러 겹이다. 모델을 학습 단계에서 탈옥 거부에 맞춘 다음 그 위에 실시간 활성화 분류기를 얹어 생물학 전체 94.8%, 사이버보안 전체 81.6%의 재현율로 위험 요청을 걸러낸다. 계정 단위 검토와 집행이 뒤따른다. 사이버·생물 연구 분야에는 심사를 거친 사용자만 들어오는 차등 접근 프로그램(신뢰 접근)을 따로 둔다. 유니버설 탈옥을 찾는 자동화 레드팀에는 A100 환산 70만 GPU 시간을 투입했다고 밝힌다.

배포는 정부 협의를 전제로 한다. OpenAI는 출시 전에 모델의 계획과 능력을 미국 정부와 공유했다면서도, 이런 정부 검토 절차가 장기적인 기본값이 되어서는 안 된다는 단서를 함께 달았다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

가격(1M 토큰 기준):

| 모델 | 입력 | 캐시 입력 | 출력 |
|------|---|---|---|
| Sol | $5.00 | $0.50 | $30.00 |
| Terra | $2.50 | $0.25 | $15.00 |
| Luna | $1.00 | $0.10 | $6.00 |

Terminal-Bench 2.1:

| 모델 | 점수 |
|------|------|
| GPT-5.6 Sol Ultra | 91.9% |
| GPT-5.6 Sol | 88.8% |
| Claude Mythos 5 | 88.0% |
| GPT-5.6 Terra | 84.3% |

그 밖의 수치는 다음과 같다.

- **GeneBench v1**: Sol이 GPT-5.5보다 적은 토큰으로 더 높은 점수(곡선 그래프로 제시, 수치 미표기).
- **ExploitBench**: Sol이 Mythos Preview급 성능을 출력 토큰 약 1/3(약 120K vs 330K)만으로 달성.
- **SecureBio (railfree, 안전장치 제거)**: 바이러스학 53.5%, 분자생물학 60.0%, 인간 병원체 68.4%, 세계 최고 수준 생물학 68.3%(vs GPT-5.5 59.7%), ReproBAIT 85%(vs 82%).
- **HealthBench Professional**: Sol 60.5점(GPT-5.5 대비 +8.7).
- **프롬프트 인젝션 방어**: Sol·Terra 1.000 만점, 함수 호출 변형 공격 Sol 0.910.

가용성은 단계적이다. 지금은 API·Codex를 통해 신뢰할 수 있는 파트너·조직에만 열려 있고, 수 주 안에 ChatGPT·Codex·API 사용자로 넓힌다. 7월에는 Cerebras에서 Sol을 초당 최대 750토큰 속도로 제공하되 초기 일부 고객부터 점차 확대한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 커뮤니티 2차 소식 글이라 수치는 OpenAI 발표를 그대로 옮긴 것이고, 독립 검증은 없다. Context window·지식 컷오프 같은 기본 사양은 본문에 빠져 있다.
- SecureBio·ExploitBench는 안전장치를 뗀 railfree 조건의 능력 상한을 보여주는 값이라, 실제 배포 모델이 그대로 응답한다는 뜻은 아니다.
- 정부 협의형 배포가 앞으로 반복될지, 아니면 이번만의 예외로 남을지는 글이 답을 내리지 않고 열어둔다.

## 6. 관련 연구 (Related Work)

- **[[cai-2026-vlm3-vision-language-models]]** — 같은 llms 카테고리의 최신 모델 연구.
- **[[bytebytego-2026-how-openai-built-its-data]]** — OpenAI가 GPT-5.5를 사내 데이터 에이전트로 운영하는 방식을 다룬 글로, 세대 맥락이 이어진다.
- 9bow가 PyTorch Korea에 올린 다른 한국어 소식 글: [[9bow-2026-openwiki-coding-agent-documentation]], [[9bow-2026-headroom-ai-agent-context-compression]] 등.

## 7. 용어집 (Glossary)

- **능력 티어(capability tier)**: 세대(5.6)와 별개로 유지되는 성능 등급. 여기서는 Sol > Terra > Luna 순.
- **활성화 분류기(activation classifier)**: 모델 내부 활성값을 실시간으로 읽어 위험 요청을 걸러내는 안전 장치.
- **railfree**: 안전장치를 제거한 평가 조건. 모델의 능력 상한을 재기 위한 세팅.
- **차등 접근(gated access)**: 사이버·생물 연구처럼 위험도가 큰 분야에 심사를 거친 사용자만 접근을 허용하는 프로그램.
- **Terminal-Bench / ExploitBench / GeneBench / SecureBio**: 각각 터미널 에이전트 작업, 익스플로잇 생성, 유전체 추론, 생물 위험 능력을 재는 벤치마크.

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | "GPT-5.6 Sol·Terra·Luna 가격표" | manual | ✅ wiki 임베드 (curated) |
| fig02 | "Terminal-Bench 2.1 점수 비교" | manual | ✅ wiki 임베드 (curated) |
| fig03 | "GeneBench v1 토큰 대비 점수 곡선" | manual | (선택, 미수집) |
| fig04 | "ExploitBench 익스플로잇 성공률" | manual | (선택, 미수집) |

> 이미지는 rule #1로 자동 저장하지 않는다. wiki에 임베드하려면 위 `raw` URL의 PNG/JPEG를 사용자가 `raw/articles/9bow-2026-gpt-5-6-sol-terra-luna-figures/`에 내려받은 뒤, 해당 id를 `curated: true`로 지정하면 된다.
