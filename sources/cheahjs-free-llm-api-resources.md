---
title: "Free LLM API resources"
type: repo
year: 2026
category: applications
raw_path: raw/repos/cheahjs-free-llm-api-resources.md
raw_filename: "cheahjs-free-llm-api-resources.md"
source_collection: external
org: "cheahjs"
repo: "free-llm-api-resources"
url: "https://github.com/cheahjs/free-llm-api-resources"
license: "None (unlicensed)"
tags: [free-tier, llm-api, inference-provider, rate-limit, cost-optimization]
---

## 한 줄 요약 (One-line Summary)

API 기반 LLM을 무료 또는 체험 크레딧으로 쓸 수 있는 서비스 26곳을 모아 제공 모델과 요청/토큰 한도를 표로 정리한 큐레이션 레포다.

## 1. 자료 정보 (Document Information)

- **저장소**: [cheahjs/free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources)
- **라이선스**: 없음 (LICENSE 파일 미존재)
- **성격**: 코드가 아니라 README 한 장으로 구성된 큐레이션 리스트. 커뮤니티가 PR로 지속 갱신한다.
- **구성**: "Free Providers"(영구 무료 티어) 13곳, "Providers with trial credits"(가입 시 일회성 크레딧) 13곳으로 나뉜다.

## 2. 주요 기여 (Key Contributions)

- 완전 무료 티어를 제공하는 OpenRouter, Google AI Studio, NVIDIA NIM, Mistral, HuggingFace Inference Providers, Groq, Cohere, GitHub Models, Cloudflare Workers AI 등을 모델별 요청/토큰 한도까지 표로 정리.
- 가입 시 일회성 크레딧을 주는 Fireworks, Baseten, Nebius, SambaNova, Scaleway 등 서비스를 크레딧 금액과 유효기간 단위로 나열했다.
- 데이터 학습 활용 여부(예: Google AI Studio는 UK/CH/EEA/EU 밖에서 학습에 사용됨)나 전화번호 인증 필요 여부 같은 이용 전 유의사항은 서비스별로 밝혀 둔다.
- 남용 시 서비스 자체가 사라질 수 있다는 경고와 챗봇을 역공학한 비합법 서비스는 제외한다는 원칙을 README 상단에 못 박았다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

레포는 아키텍처나 코드가 아니라 정보 구조 자체가 핵심이다. 각 프로바이더 항목은 이름(공식 링크 포함) → 이용 조건(데이터 정책·인증 요건) → 한도(requests/minute, tokens/minute, requests/day 등) → 제공 모델 목록 순서로 통일된 포맷을 따른다. 모델이 많은 프로바이더(Google AI Studio, Cerebras, Groq, Cloudflare Workers AI)는 모델별로 한도가 다르기 때문에 HTML 테이블로, 모델 공통 한도를 쓰는 프로바이더(OpenRouter, Cohere)는 텍스트 + 리스트로 표현을 구분했다.

무료 프로바이더는 다시 두 그룹으로 나뉜다. 하나는 rate-limit형 무료 티어(OpenRouter, Groq, Cerebras 등)로, 요청 수·토큰 수를 기준으로 매일/매월 한도가 리셋된다. 다른 하나는 trial-credit형(Fireworks, Baseten, AI21 등)으로, 가입 시 일정 금액을 지급했다가 소진되면 유료로 전환된다. 전자는 꾸준한 실험·프로토타이핑에 맞고, 후자는 단기 집중 테스트에 맞는다. 둘을 가르는 기준이 바로 이것이다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

벤치마크 수치는 없다. 대신 서비스마다 정해진 한도 수치가 결과에 해당한다. 예를 들어 OpenRouter는 분당 20회·일 50회가 기본이지만 $10을 평생 충전하면 일 1000회까지 늘려준다. Cloudflare Workers AI는 하루 10,000 neurons라는 자체 단위로 과금한다. Vercel AI Gateway는 월 $5 상당 크레딧을 준다. Groq는 모델에 따라 편차가 커서 일 250회(compound류)부터 14,400회(Llama 3.1 8B)까지 벌어진다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

한도와 모델 목록은 각 프로바이더의 정책 변경에 따라 수시로 바뀌므로, 이 문서는 스냅샷일 뿐 실시간 정확성을 보장하지 않는다. 실제 사용 전에는 링크된 공식 문서에서 최신 한도를 재확인해야 한다. 또한 남용에 대한 경고만 있을 뿐 구체적인 사용량 모니터링 도구나 자동 폴백(fallback) 전략은 다루지 않는다 — 이는 사용자가 직접 설계해야 하는 영역으로 남아 있다.

## 6. 관련 연구 (Related Work)

레포 자체가 참고문헌 없이 각 프로바이더의 공식 문서를 직접 링크하는 형태다. 함께 보면 좋은 자료로는 각 프로바이더의 공식 가격/한도 페이지(OpenRouter Rate Limits, HuggingFace Inference Providers Pricing, Cerebras/Groq Console 등)가 있다. 이 wiki 안에서는 LLM 프로바이더 선택이나 비용 최적화를 다루는 다른 자료와 함께 [[overviews/]] 페이지로 묶을 수 있다.

## 7. 용어집 (Glossary)

- **Rate limit**: 분/시간/일 단위로 허용되는 요청 수 또는 토큰 수 상한. 초과 시 요청이 거부되거나 지연된다.
- **Trial credit**: 가입 시 일회성으로 지급되는 사용 크레딧. 소진되면 결제 수단 등록 없이는 더 이상 호출할 수 없다.
- **Neuron (Cloudflare)**: Cloudflare Workers AI의 자체 컴퓨팅 과금 단위로, 모델 크기와 추론량에 따라 소모량이 달라진다.
- **Data training opt-in/out**: 무료 티어 사용 시 입력 데이터가 프로바이더의 모델 학습에 쓰이는지 여부. Mistral 무료 티어처럼 옵트인이 필수인 경우도 있다.
