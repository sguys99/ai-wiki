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
tags: [free-tier, llm-api, inference-provider, rate-limit, trial-credit]
---

## 한 줄 요약 (One-line Summary)

API로 LLM을 호출할 때 무료 한도나 체험 크레딧을 제공하는 서비스 26곳을 모아, 프로바이더마다 요청 한도, 토큰 한도, 이용 조건, 제공 모델 목록을 정리한 README 한 장짜리 큐레이션 저장소다.

## 1. 자료 정보 (Document Information)

- **저장소**: [cheahjs/free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources)
- **형태**: 코드가 아니라 README 문서 한 장이다. raw로 수집한 것도 README 본문뿐이라 저장소의 파일 구성, 갱신 스크립트, 커밋 이력은 이 자료만으로 확인할 수 없다.
- **라이선스**: raw frontmatter는 `None (unlicensed)`로 기록한다. README 본문에는 라이선스 조항이 없어 본문만으로 재배포 조건을 확인할 수 없다.
- **수집 시점**: raw frontmatter의 `year` 값은 2026이다. README 본문 자체에는 날짜나 갱신 시각 표기가 없다.
- **문서 구성**: 목차가 두 묶음으로 나뉜다. 상시 무료 한도를 주는 "Free Providers" 13곳과, 가입 시 일회성 크레딧을 주는 "Providers with trial credits" 13곳으로 합계 26곳이다.
- **문서 상단 경고 두 가지**: 서비스를 남용하면 이 무료 한도 자체가 없어질 수 있다는 주의(NOTE)와, 기존 챗봇을 역공학한 것처럼 정당하지 않은 서비스는 목록에서 명시적으로 제외한다는 경고(WARNING)다.

## 2. 주요 기여 (Key Contributions)

- 무료 한도를 상시 제공하는 프로바이더 13곳을 요청 한도와 토큰 한도까지 붙여 한자리에 모았다. OpenRouter, Google AI Studio, NVIDIA NIM, Mistral La Plateforme, Mistral Codestral, HuggingFace Inference Providers, Vercel AI Gateway, OpenCode Zen, Cerebras, Groq, Cohere, GitHub Models, Cloudflare Workers AI다.
- 가입 시 일회성 크레딧을 지급하는 프로바이더 13곳을 크레딧 금액과 유효 기간 단위로 나열했다. Fireworks, Baseten, Nebius, Novita, AI21, Upstage, NLP Cloud, Alibaba Cloud Model Studio, Modal, Inference.net, Hyperbolic, SambaNova Cloud, Scaleway Generative APIs다.
- 한도 수치를 그대로 옮기는 데 그치지 않고 공식 rate limit 문서로 가는 링크를 한도 수치 자체에 붙인 항목이 6곳이다. OpenRouter, HuggingFace Inference Providers, Vercel AI Gateway, Cohere, GitHub Models, Cloudflare Workers AI다. Mistral과 NVIDIA NIM에도 문서 링크가 있으나 한도가 아니라 모델 목록에 걸려 있다.
- 이용 전에 확인해야 하는 조건을 프로바이더별로 밝혔다. 입력 데이터가 학습에 쓰이는 경우가 3곳(Google AI Studio, Mistral La Plateforme, OpenCode Zen), 전화번호 인증을 요구하는 경우가 4곳(NVIDIA NIM, Mistral La Plateforme, Mistral Codestral, NLP Cloud)이다.
- 모델별로 한도가 다른 프로바이더는 모델 단위 표를 따로 두었다. Google AI Studio 13종, Groq 15종, Cerebras 2종이 이 방식이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

이 저장소는 코드 아키텍처가 아니라 정보 구조 자체가 산출물이다. 프로바이더 항목마다 다음 순서를 지킨다.

1. 프로바이더 이름을 공식 콘솔 또는 문서 링크로 건다.
2. 이용 조건(데이터 학습 여부, 전화번호 인증, context window 제약 등)을 짧은 문장으로 적는다.
3. `**Limits:**` 또는 `**Credits:**` 항목에 한도 수치를 적는다.
4. 제공 모델을 목록이나 표로 나열한다.

표현 방식은 한도가 모델마다 다른지 여부로 갈린다. 모델마다 한도가 다르면 HTML 표를 써서 모델 이름과 한도를 한 행에 붙이고(Google AI Studio, Cerebras, Groq), 모델이 한도를 공유하면 한도를 한 번만 적고 모델은 목록으로 나열한다(OpenRouter, Cohere, GitHub Models, Cloudflare Workers AI). OpenRouter와 Cohere 항목에는 "Models share a common quota", "Models share a common monthly quota"라는 문장을 따로 붙여 쿼터 공유를 명시한다.

두 묶음을 가르는 기준은 한도가 회복되는지 여부다. Free Providers는 분, 시간, 일, 월 단위로 한도가 다시 채워지는 형태이고, Providers with trial credits는 지급된 금액이나 토큰을 다 쓰면 그것으로 끝난다. 다만 HuggingFace Inference Providers와 Vercel AI Gateway는 Free Providers 묶음에 있으면서도 한도를 금액(월 $0.10, 월 $5)으로 표기해, 두 묶음 사이의 중간 형태에 해당한다.

한도의 표기 단위 자체가 프로바이더마다 다르다는 점도 이 문서에서 드러난다.

| 표기 단위 | 사용하는 프로바이더 |
|---|---|
| requests/second | Mistral La Plateforme |
| requests/minute | OpenRouter, Google AI Studio, NVIDIA NIM, Mistral Codestral, Cerebras, Cohere |
| requests/hour | Cerebras |
| requests/day | OpenRouter, Google AI Studio, Mistral Codestral, Cerebras, Groq |
| requests/month | Cohere |
| tokens/minute | Google AI Studio, Mistral La Plateforme, Cerebras, Groq |
| tokens/hour, tokens/day | Cerebras |
| tokens/month | Mistral La Plateforme |
| neurons/day | Cloudflare Workers AI |
| 월 크레딧 금액 | HuggingFace Inference Providers, Vercel AI Gateway |
| 외부 구독 등급에 종속 | GitHub Models |
| 표기 없음 | OpenCode Zen |

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

성능 벤치마크는 없다. 이 문서에서 결과에 해당하는 것은 프로바이더별 한도 수치다.

무료 한도 프로바이더 13곳은 다음과 같다.

| 프로바이더 | 한도 | 이용 조건 | 모델 표기 |
|---|---|---|---|
| OpenRouter | 20 requests/minute, 50 requests/day, $10 평생 충전 시 최대 1,000 requests/day | 없음 | `:free` 태그 모델 20종, 쿼터 공유 |
| Google AI Studio | 모델별 상이 (250,000 tokens/minute 계열과 15,000 tokens/minute 계열) | UK, CH, EEA, EU 밖에서 쓰면 입력이 학습에 쓰인다 | 모델 13종 표 |
| NVIDIA NIM | 40 requests/minute | 전화번호 인증 필요, 모델이 context window 제약을 받는 편이다 | 오픈 모델 다수 |
| Mistral La Plateforme | 모델당 1 request/second, 500,000 tokens/minute, 10억 tokens/month | 무료 티어(Experiment plan)는 데이터 학습 동의 필수, 전화번호 인증 필요 | Mistral 오픈 모델과 상용 모델 |
| Mistral Codestral | 30 requests/minute, 2,000 requests/day | 현재 무료이며 월 구독 형태, 전화번호 인증 필요 | Codestral |
| HuggingFace Inference Providers | 월 $0.10 상당 크레딧 | 10GB 미만 모델 위주이나 인기 모델은 10GB를 넘어도 지원되는 경우가 있다 | 지원 프로바이더의 오픈 모델 |
| Vercel AI Gateway | 월 $5 | 없음 | 여러 프로바이더로 라우팅하며 모델 목록은 없다 |
| OpenCode Zen | 표기 없음 | 무료 모델은 데이터가 품질 개선에 쓰일 수 있다 | 3종 (Big Pickle Stealth, Nemotron 3 Super Free, DeepSeek V4 Flash Free) |
| Cerebras | 30 requests/minute, 60,000 tokens/minute, 900 requests/hour, 100만 tokens/hour, 14,400 requests/day, 100만 tokens/day | 없음 | 2종 (gpt-oss-120b, Llama 3.1 8B), 두 모델 한도가 같다 |
| Groq | 모델별 상이 (250 requests/day에서 14,400 requests/day) | 없음 | 모델 15종 표 |
| Cohere | 20 requests/minute, 1,000 requests/month | 없음 | 11종, 월 쿼터 공유 |
| GitHub Models | Copilot 구독 등급(Free, Pro, Pro+, Business, Enterprise)에 종속 | 입출력 토큰 한도가 매우 제한적이다 | 37종 |
| Cloudflare Workers AI | 10,000 neurons/day | 없음 | 26종 |

체험 크레딧 프로바이더 13곳은 다음과 같다.

| 프로바이더 | 크레딧 | 모델 |
|---|---|---|
| Fireworks | $1 | 오픈 모델 다수 |
| Baseten | $30 | 지원 모델 전부, 컴퓨트 시간 기준 과금 |
| Nebius | $1 | 오픈 모델 다수 |
| Novita | $0.5, 유효 기간 1년 | 오픈 모델 다수 |
| AI21 | $10, 3개월 | Jamba 계열 |
| Upstage | $10, 3개월 | Solar Pro, Solar Mini |
| NLP Cloud | $15 | 오픈 모델 다수, 전화번호 인증 필요 |
| Alibaba Cloud Model Studio | 모델당 100만 토큰 | Qwen 오픈 모델과 상용 모델 |
| Modal | 가입 시 월 $5, 결제 수단 등록 시 월 $30 | 지원 모델 전부, 컴퓨트 시간 기준 과금 |
| Inference.net | $1, 이메일 설문 응답 시 $25 | 오픈 모델 다수 |
| Hyperbolic | $1 | 4종 (DeepSeek V3 0324, Llama 3.3 70B Instruct, deepseek-r1-0528, qwen3-coder-480b-a35b-instruct) |
| SambaNova Cloud | $5, 3개월 | 6종 (deepseek-v3.1, deepseek-v3.2, gemma-4-31b-it, gpt-oss-120b, meta-llama-3.3-70b-instruct, minimax-m2.7) |
| Scaleway Generative APIs | 100만 토큰 | 18종, 임베딩 모델과 음성 인식 모델 포함 |

한도 폭은 프로바이더 간에도 프로바이더 안에서도 크게 벌어진다. 일 단위 요청 한도만 놓고 보면 OpenRouter 기본값이 50회, Google AI Studio의 Gemini 계열이 20회에서 500회, Groq이 250회에서 14,400회, Cerebras와 Google AI Studio의 Gemma 계열이 14,400회다. 즉 같은 "무료"라도 하루에 쓸 수 있는 양이 수백 배 차이 난다.

Google AI Studio 안에서도 계열이 갈린다. Gemini 계열 대부분은 250,000 tokens/minute에 20 requests/day이고, Gemini 3.1 Flash-Lite만 500 requests/day로 크다. 반면 Gemma 3 계열 4종은 토큰 한도가 15,000 tokens/minute로 낮은 대신 요청 한도가 14,400 requests/day로 크다. 음성 합성 모델인 Gemini 3.1 Flash TTS와 Gemini 2.5 Flash TTS는 10,000 tokens/minute에 10 requests/day로 가장 좁다.

Groq도 모델에 따라 편차가 크다. Llama 3.1 8B가 14,400 requests/day로 가장 넓고, Allam 2 7B가 7,000 requests/day, Whisper 계열이 2,000 requests/day, gpt-oss 계열과 qwen3.6-27b가 1,000 requests/day, compound 계열이 250 requests/day다. 표에 올라 있으나 한도 칸이 비어 있는 모델도 있다(orpheus 음성 모델 2종, llama-prompt-guard 2종).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- **시점 의존성이 가장 큰 한계다.** 무료 한도와 제공 모델은 프로바이더가 언제든 바꿀 수 있다. 이 문서는 수집 시점의 스냅샷이며 실시간 정확성을 보장하지 않는다. README 본문에 갱신 날짜 표기가 없어 문서 자체만으로는 언제 기준의 값인지 알 수 없다.
- **raw가 README 본문뿐이라 저장소 내부는 확인할 수 없다.** 목록을 어떤 절차로 갱신하는지, 자동 수집 스크립트가 있는지, 기여 규칙이 무엇인지는 이 자료에 근거가 없다.
- **라이선스 조항이 README 본문에 없다.** 목록을 그대로 옮겨 쓸 때의 조건을 본문만으로는 판단할 수 없다.
- **한도 표기 단위가 통일되어 있지 않다.** requests, tokens, neurons, 금액이 섞여 있어 프로바이더 간 직접 비교가 어렵다. 문서는 각 프로바이더의 표기를 그대로 옮길 뿐 공통 단위로 환산해 주지 않는다.
- **한도 칸이 비어 있는 항목이 남아 있다.** Groq 표의 orpheus 음성 모델 2종과 llama-prompt-guard 2종, OpenCode Zen 항목 전체가 그렇다.
- **운영 측면은 다루지 않는다.** 남용하지 말라는 주의만 있고 사용량을 어떻게 모니터링할지, 한도를 넘겼을 때 어느 프로바이더로 넘길지 같은 설계는 문서 범위 밖이다.
- **가격 대비 성능 비교가 없다.** 어떤 모델이 어느 정도 품질인지, 지연 시간이 얼마인지에 대한 수치가 없어 모델 선택에는 다른 자료가 필요하다.

## 6. 관련 연구 (Related Work)

참고문헌 형태의 인용 목록은 없고, 각 프로바이더의 공식 문서를 본문에서 직접 링크한다. 한도 수치의 근거로 걸린 문서는 OpenRouter Rate Limits, Cohere Rate Limits, GitHub Models Rate Limits, Cloudflare Workers AI Pricing, HuggingFace Inference Providers Pricing, Vercel AI Gateway Pricing 6건이다. Mistral Models Overview와 NVIDIA NIM의 모델 페이지는 한도가 아니라 모델 목록에 걸린 링크다.

이 wiki 안에서는 LLM 응용을 실제로 구축하는 자료와 함께 읽을 때 쓸모가 커진다. [[applications/shubhamsaboo-awesome-llm-apps]]가 무엇을 만들지에 대한 예제 카탈로그라면 이 자료는 그것을 무엇으로 실행할지에 대한 자원 카탈로그다. [[applications/patel-2026-production-ai-app-seven-layers]]는 프로바이더 선택이 제품 완성도의 한 층에 불과하다는 관점을 제시한다.

## 7. 용어집 (Glossary)

- **Rate limit**: 분, 시간, 일, 월 단위로 허용되는 요청 수 또는 토큰 수의 상한이다. 한도를 넘기면 요청이 거부되거나 다음 주기까지 기다려야 한다.
- **Trial credit**: 가입 시 한 번 지급되는 사용 크레딧이다. 다 쓰면 결제 수단을 등록하기 전에는 호출할 수 없다.
- **Shared quota**: 한 프로바이더가 제공하는 여러 모델이 하나의 한도를 나눠 쓰는 방식이다. OpenRouter와 Cohere가 이 방식을 쓴다고 명시한다.
- **Neuron**: Cloudflare Workers AI의 자체 과금 단위다. 요청 수나 토큰 수가 아니라 이 단위로 하루 10,000개까지 무료 한도를 준다.
- **AI gateway**: 여러 프로바이더로 요청을 라우팅해 주는 중계 계층이다. Vercel AI Gateway와 OpenCode Zen이 이 형태다.
- **Data training opt-in**: 무료 한도를 쓰는 대가로 입력 데이터가 프로바이더의 모델 학습에 쓰이는 것을 받아들이는 조건이다. Mistral La Plateforme 무료 티어는 이 동의가 가입 조건이다.
