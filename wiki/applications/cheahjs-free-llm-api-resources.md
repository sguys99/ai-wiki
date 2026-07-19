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
source: cheahjs-free-llm-api-resources.md
tags: [free-tier, llm-api, inference-provider, rate-limit, cost-optimization]
---

## 요약 (Summary)

API 기반 LLM을 무료로, 또는 체험 크레딧으로 쓰는 서비스 26곳을 모은 큐레이션 레포다. OpenRouter·Google AI Studio·Groq처럼 영구 무료 티어를 유지하는 13곳과, Fireworks·Baseten·SambaNova처럼 가입 시 일회성 크레딧을 주는 13곳으로 나뉜다. 서비스별로 요청/토큰 한도, 데이터 학습 활용 여부, 전화번호 인증 요건까지 표로 정리했으니 프로토타이핑이나 저비용 실험 단계에서 프로바이더를 고를 때 바로 참고하면 된다.

## 무료 티어 프로바이더 (Free Providers)

무료 요청을 영구적으로 허용하되 분·일 단위 rate limit으로 묶어 두는 그룹이다. 모델이 많은 프로바이더는 모델마다 한도가 달라서 표로 관리하는 게 낫다.

| 프로바이더 | 한도 (예시) | 비고 |
|---|---|---|
| [OpenRouter](https://openrouter.ai) | 20 req/분, 50 req/일 ($10 충전 시 1000 req/일) | Hermes 3, Llama 3.3 70B 등 :free 태그 모델 다수 |
| [Google AI Studio](https://aistudio.google.com) | 모델별 상이 (Gemini 3.5 Flash 등 20 req/일) | UK/CH/EEA/EU 밖에서는 입력 데이터가 학습에 쓰임 |
| [NVIDIA NIM](https://build.nvidia.com/explore/discover) | 40 req/분 | 전화번호 인증 필요, context window 제약 |
| [Mistral (La Plateforme)](https://console.mistral.ai/) | 1 req/초, 500K tokens/분, 10억 tokens/월 | 무료 티어는 데이터 학습 opt-in 필수 |
| [Mistral (Codestral)](https://codestral.mistral.ai/) | 30 req/분, 2,000 req/일 | 전화번호 인증 필요 |
| [HuggingFace Inference Providers](https://huggingface.co/docs/inference-providers/en/index) | 월 $0.10 상당 크레딧 | 10GB 미만 모델 위주 서빙 |
| [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) | 월 $5 상당 | 여러 프로바이더로 라우팅 |
| [OpenCode Zen](https://opencode.ai/docs/zen/) | — | 큐레이션 모델, 데이터가 품질 개선에 쓰일 수 있음 |
| [Cerebras](https://cloud.cerebras.ai/) | 30 req/분, 14,400 req/일 (모델 공통) | gpt-oss-120b, Llama 3.1 8B |
| [Groq](https://console.groq.com) | 모델별 상이 (250~14,400 req/일) | Whisper, compound 등 음성·에이전트 모델 포함 |
| [Cohere](https://cohere.com) | 20 req/분, 월 1,000 req (공통 쿼터) | command-a 계열, aya 계열 |
| [GitHub Models](https://github.com/marketplace/models) | Copilot 구독 등급에 종속 | 토큰 한도가 매우 빡빡함 |
| [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai) | 일 10,000 neurons | gpt-oss, Llama, Qwen 등 다수 오픈모델 |

## 체험 크레딧 프로바이더 (Providers with Trial Credits)

가입할 때 크레딧을 얼마간 얹어 주고, 소진되면 결제 수단을 등록해야 한다. 그래서 꾸준히 쓰기보다는 단기 집중 테스트나 모델 비교에 맞다.

| 프로바이더 | 크레딧 | 비고 |
|---|---|---|
| [Fireworks](https://fireworks.ai/) | $1 | 다양한 오픈모델 |
| [Baseten](https://app.baseten.co/) | $30 | 컴퓨트 시간 기준 과금 |
| [Nebius](https://tokenfactory.nebius.com/) | $1 | 다양한 오픈모델 |
| [Novita](https://novita.ai/) | $0.5 (1년 유효) | 다양한 오픈모델 |
| [AI21](https://studio.ai21.com/) | $10 (3개월) | Jamba 계열 |
| [Upstage](https://console.upstage.ai/) | $10 (3개월) | Solar Pro/Mini |
| [NLP Cloud](https://nlpcloud.com/home) | $15 | 전화번호 인증 필요 |
| [Alibaba Cloud Model Studio](https://bailian.console.alibabacloud.com/) | 모델당 100만 토큰 | Qwen 오픈/독점 모델 |
| [Modal](https://modal.com) | $5/월 (결제수단 등록 시 $30/월) | 컴퓨트 시간 기준 과금 |
| [Inference.net](https://inference.net) | $1 (설문 응답 시 $25) | 다양한 오픈모델 |
| [Hyperbolic](https://app.hyperbolic.ai/) | $1 | DeepSeek V3, Qwen3-Coder 등 |
| [SambaNova Cloud](https://cloud.sambanova.ai/) | $5 (3개월) | DeepSeek, GPT-OSS, MiniMax 등 |
| [Scaleway Generative APIs](https://console.scaleway.com/generative-api/models) | 100만 토큰 | Gemma, Qwen3, Mistral 등 |

## 이용 시 유의점 (Usage Notes)

무료 티어를 고를 때는 한도 크기만 볼 게 아니라 데이터 정책도 함께 봐야 한다. Google AI Studio는 EU/EEA/UK/CH 밖에서 입력이 학습에 쓰이며, Mistral 무료 티어는 아예 데이터 학습 동의가 가입 조건이다. 반대로 유료 전환을 염두에 두지 않는 실험이라면 rate-limit형 무료 티어(OpenRouter, Groq, Cerebras)를 묶어 프로바이더 간 폴백 체인을 짜 두면 된다. 레포 자체가 "남용하면 서비스가 사라질 수 있다"고 경고하는 만큼, 트래픽이 프로토타입 단계를 넘어 늘어나면 유료 플랜으로 넘어가야 오래 쓴다.

## 관련 페이지 (Related Pages)

- [[applications/]] — 비용 효율적인 LLM 응용·배포 사례와 함께 참고
