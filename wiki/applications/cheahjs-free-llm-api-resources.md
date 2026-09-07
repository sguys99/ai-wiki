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
tags: [free-tier, llm-api, inference-provider, rate-limit, trial-credit]
---

## 요약

cheahjs/free-llm-api-resources는 API로 LLM을 호출할 때 요금을 내지 않고 쓸 수 있는 경로를 한자리에 모은 저장소다. 문서가 스스로 밝히는 목적은 한 문장이다. "This lists various services that provide free access or credits towards API-based LLM usage." 코드는 없고 README 한 장이 전부이며, 그 안에 프로바이더 26곳이 정리되어 있다.

26곳은 두 묶음으로 나뉜다. 시간이 지나면 한도가 다시 채워지는 "Free Providers" 13곳과, 가입 시 한 번 받은 금액이나 토큰을 다 쓰면 끝나는 "Providers with trial credits" 13곳이다. 각 항목에는 요청 한도와 토큰 한도, 이용 전 확인할 조건, 제공 모델 목록이 붙는다.

이 페이지가 정리한 값은 모두 수집 시점의 스냅샷이다. 무료 한도와 모델 목록은 프로바이더가 언제든 바꿀 수 있으므로 현재 값으로 읽으면 안 된다. 자세한 사정은 아래 한계 절에 적었다.

## 배경

API 기반 LLM의 무료 이용 경로는 프로바이더마다 흩어져 있고 표기 방식도 제각각이다. 어떤 곳은 분당 요청 수로, 어떤 곳은 월 크레딧 금액으로, 어떤 곳은 자체 과금 단위로 한도를 적는다. 무엇을 얼마나 쓸 수 있는지 비교하려면 공식 문서를 프로바이더마다 따로 열어 봐야 한다.

이 저장소는 그 흩어진 값을 하나의 문서로 모아 놓는다. 프로바이더 이름, 한도 수치, 이용 조건, 모델 목록이 같은 순서로 반복되므로 표를 훑듯이 비교할 수 있다. 한도 수치 상당수에는 근거가 되는 공식 rate limit 문서 링크가 붙어 있어, 값이 바뀌었는지 확인하러 갈 곳도 함께 알려 준다.

문서는 상단에 두 가지 규범을 못 박는다. 하나는 이 서비스들을 남용하지 말라는 주의로, 남용하면 무료 한도 자체가 사라질 수 있다고 적었다. 다른 하나는 기존 챗봇을 역공학한 것처럼 정당하지 않은 서비스는 목록에서 명시적으로 제외한다는 경고다. 즉 목록에 오르는 기준이 "무료인가"만이 아니라 "정당한 경로인가"까지 포함한다.

## 핵심 개념

### 무료 한도와 체험 크레딧

두 묶음을 가르는 기준은 한도가 회복되는지 여부다. 무료 한도 방식은 분, 시간, 일, 월 같은 주기마다 사용량이 다시 0으로 돌아오므로 소진되어도 기다리면 다시 쓸 수 있다. 체험 크레딧 방식은 가입 시 지급된 금액이나 토큰을 다 쓰면 결제 수단을 등록하기 전까지 호출이 막힌다.

이 구분은 용도를 가른다. 주기적으로 회복되는 쪽은 오래 이어지는 실험이나 개인 도구에 맞고, 일회성 크레딧은 여러 모델을 짧게 비교해 보는 용도에 맞는다. 다만 문서 자체가 이런 용도 권고를 적어 두지는 않았고, 두 묶음의 구조에서 따라 나오는 해석이다.

경계에 걸친 항목도 있다. HuggingFace Inference Providers는 월 $0.10, Vercel AI Gateway는 월 $5로 한도를 금액으로 적으면서도 Free Providers 묶음에 들어 있다. 금액 표기이지만 매달 회복되므로 무료 한도로 분류한 것이다.

### rate limit의 표기 단위

rate limit은 주어진 시간 동안 허용되는 요청 수 또는 토큰 수의 상한을 말한다. 이 문서를 읽을 때 걸림돌이 되는 지점은 그 상한을 재는 단위가 프로바이더마다 다르다는 것이다.

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

이 표가 보여 주는 것은 단순 비교가 불가능하다는 사실이다. Cohere의 1,000 requests/month와 Groq의 1,000 requests/day는 숫자가 같지만 실제 여유는 30배 차이가 난다. Cloudflare Workers AI의 neuron은 요청 수도 토큰 수도 아닌 자체 컴퓨트 단위여서 다른 프로바이더의 값과 나란히 놓을 수 없다. GitHub Models는 아예 자체 한도가 아니라 이용자의 Copilot 구독 등급을 따른다.

Cerebras 한 곳만 여섯 가지 단위를 동시에 건다. 분당 요청, 분당 토큰, 시간당 요청, 시간당 토큰, 일당 요청, 일당 토큰이 모두 걸려 있어, 어느 하나만 넘겨도 요청이 막힌다.

### 쿼터 공유와 모델별 한도

같은 프로바이더가 여러 모델을 제공할 때 한도를 어떻게 나누는지도 프로바이더마다 다르다. 문서는 이 차이를 표현 형식으로 구분한다.

| 방식 | 뜻 | 문서 표현 | 해당 프로바이더 |
|---|---|---|---|
| 쿼터 공유 | 모델 전체가 하나의 한도를 나눠 쓴다 | 한도를 한 번 적고 모델은 목록으로 나열 | OpenRouter, Cohere |
| 모델별 한도 | 모델마다 별도의 한도가 걸린다 | 모델 이름과 한도를 한 행에 붙인 표 | Google AI Studio, Cerebras, Groq |
| 목록만 제시 | 한도를 프로바이더 단위로만 적고 모델은 나열만 한다 | 한도 문장 + 모델 목록 | NVIDIA NIM, GitHub Models, Cloudflare Workers AI |

쿼터 공유는 OpenRouter와 Cohere 항목에 "Models share a common quota", "Models share a common monthly quota"라는 문장으로 명시되어 있다. 모델을 바꿔 가며 호출해도 한도가 늘어나지 않는다는 뜻이다.

### 이용 전 확인 조건

한도 크기만 보고 프로바이더를 고를 수 없는 이유는 조건이 따로 붙기 때문이다. 문서는 이 조건을 항목마다 한두 줄로 적어 둔다.

| 조건 | 해당 프로바이더 | 문서에 적힌 내용 |
|---|---|---|
| 입력이 학습에 쓰인다 | Google AI Studio | UK, CH, EEA, EU 밖에서 사용하면 데이터가 학습에 쓰인다 |
| 입력이 학습에 쓰인다 | Mistral La Plateforme | 무료 티어(Experiment plan)는 데이터 학습 동의가 필수다 |
| 입력이 학습에 쓰인다 | OpenCode Zen | 무료 모델은 데이터가 품질 개선에 쓰일 수 있다 |
| 전화번호 인증 | NVIDIA NIM, Mistral La Plateforme, Mistral Codestral, NLP Cloud | 가입 시 전화번호 인증을 요구한다 |
| 모델 크기 제한 | HuggingFace Inference Providers | 10GB 미만 모델 위주이나 인기 모델은 10GB를 넘어도 지원되는 경우가 있다 |
| context window 제약 | NVIDIA NIM | 모델이 context window 제약을 받는 편이다 |
| 토큰 한도 제약 | GitHub Models | 입출력 토큰 한도가 매우 제한적이다 |

context window는 모델이 한 번에 받아들일 수 있는 토큰 길이의 상한을 말한다. NVIDIA NIM과 GitHub Models는 한도 수치가 나쁘지 않아도 한 번에 넣을 수 있는 입력이 좁아 긴 문서를 다루는 용도에는 맞지 않는다고 문서가 미리 알려 준다.

데이터 학습 조건은 성격이 다르다. 요금을 내지 않는 대가로 입력을 넘기는 거래이므로, 사내 자료나 개인 정보가 프롬프트에 들어가는 경우에는 한도 크기와 무관하게 후보에서 빠진다.

## 방법

### 항목 서술 형식

문서는 프로바이더마다 같은 순서를 지킨다. 이 반복이 목록을 표처럼 읽히게 만드는 장치다.

1. 프로바이더 이름을 공식 콘솔 또는 문서 링크로 건다.
2. 이용 조건을 짧은 문장이나 불릿으로 적는다.
3. `**Limits:**` 또는 `**Credits:**` 항목에 한도 수치를 적는다.
4. 제공 모델을 목록이나 표로 나열한다.

한도 수치 자체에 공식 문서 링크를 다는 항목이 6곳 있다. OpenRouter, HuggingFace Inference Providers, Vercel AI Gateway, Cohere, GitHub Models, Cloudflare Workers AI다. 수치가 바뀌었을 때 어디를 확인해야 하는지가 함께 적혀 있다는 뜻이라, 스냅샷의 약점을 어느 정도 보완한다. Mistral과 NVIDIA NIM에도 문서 링크가 있지만 한도가 아니라 모델 목록에 걸려 있다.

### 상시 무료 한도 프로바이더 13곳

| 프로바이더 | 한도 | 이용 조건 | 모델 |
|---|---|---|---|
| OpenRouter | 20 requests/minute, 50 requests/day, $10 평생 충전 시 최대 1,000 requests/day | 없음 | `:free` 태그 모델 20종, 쿼터 공유 |
| Google AI Studio | 모델별 상이 | 지역에 따라 입력이 학습에 쓰인다 | 13종 표 |
| NVIDIA NIM | 40 requests/minute | 전화번호 인증, context window 제약 | 오픈 모델 다수 |
| Mistral La Plateforme | 모델당 1 request/second, 500,000 tokens/minute, 10억 tokens/month | 데이터 학습 동의, 전화번호 인증 | Mistral 오픈 모델과 상용 모델 |
| Mistral Codestral | 30 requests/minute, 2,000 requests/day | 현재 무료이며 월 구독 형태, 전화번호 인증 | Codestral |
| HuggingFace Inference Providers | 월 $0.10 상당 크레딧 | 10GB 미만 모델 위주 | 지원 프로바이더의 오픈 모델 |
| Vercel AI Gateway | 월 $5 | 없음 | 모델 목록 없이 여러 프로바이더로 라우팅 |
| OpenCode Zen | 표기 없음 | 무료 모델은 데이터가 품질 개선에 쓰일 수 있다 | 3종 |
| Cerebras | 30 requests/minute, 60,000 tokens/minute, 900 requests/hour, 100만 tokens/hour, 14,400 requests/day, 100만 tokens/day | 없음 | 2종 |
| Groq | 모델별 상이 | 없음 | 15종 표 |
| Cohere | 20 requests/minute, 1,000 requests/month | 없음 | 11종, 월 쿼터 공유 |
| GitHub Models | Copilot 구독 등급에 종속 | 입출력 토큰 한도가 매우 제한적 | 37종 |
| Cloudflare Workers AI | 10,000 neurons/day | 없음 | 26종 |

이 13곳 가운데 조건이 하나도 붙지 않은 곳은 OpenRouter, Vercel AI Gateway, Cerebras, Groq, Cohere, Cloudflare Workers AI로 6곳이다. 나머지 7곳은 데이터 학습 동의, 전화번호 인증, 모델 크기 제한, 토큰 한도 제약 가운데 하나 이상을 요구한다.

모델 수로 보면 GitHub Models가 37종으로 가장 많고 Cloudflare Workers AI가 26종, OpenRouter가 20종으로 뒤를 잇는다. 다만 GitHub Models는 모델 수가 많은 대신 한도가 자체 값이 아니라 Copilot 구독 등급에 딸려 있어, 무료 등급에서 실제로 쓸 수 있는 양은 이 문서만으로 알 수 없다.

### 모델마다 한도가 다른 프로바이더

Google AI Studio는 모델 13종을 세 계열로 나눠 서로 다른 한도를 건다.

| 모델 | 분당 토큰 | 일당 요청 | 분당 요청 |
|---|---|---|---|
| Gemini 3.5 Flash | 250,000 | 20 | 5 |
| Gemini 3 Flash | 250,000 | 20 | 5 |
| Gemini 3.1 Flash-Lite | 250,000 | 500 | 15 |
| Gemini 2.5 Flash | 250,000 | 20 | 5 |
| Gemini 2.5 Flash-Lite | 250,000 | 20 | 10 |
| Gemini 3.1 Flash TTS | 10,000 | 10 | 3 |
| Gemini 2.5 Flash TTS | 10,000 | 10 | 3 |
| Gemini Robotics-ER 1.6 | 250,000 | 20 | 5 |
| Gemini Robotics-ER 1.5 | 250,000 | 20 | 10 |
| Gemma 3 27B Instruct | 15,000 | 14,400 | 30 |
| Gemma 3 12B Instruct | 15,000 | 14,400 | 30 |
| Gemma 3 4B Instruct | 15,000 | 14,400 | 30 |
| Gemma 3 1B Instruct | 15,000 | 14,400 | 30 |

세 계열이 서로 반대 방향의 여유를 준다. Gemini 계열은 분당 토큰이 250,000개로 넉넉해 한 번에 긴 입력을 넣을 수 있지만 하루 요청이 20회뿐이다. Gemma 계열은 분당 토큰이 15,000개로 좁은 대신 하루 14,400회까지 호출할 수 있다. 즉 긴 문서 몇 건을 처리하려면 Gemini 계열이, 짧은 요청을 자주 보내야 하면 Gemma 계열이 맞는다.

예외가 둘 있다. Gemini 3.1 Flash-Lite는 Gemini 계열의 토큰 여유를 유지하면서 하루 500회까지 허용해 두 성질을 함께 갖는다. 반대로 음성 합성 모델인 TTS 2종은 분당 10,000 토큰에 하루 10회로 문서 안에서 가장 좁다.

Cerebras는 모델이 2종이고 한도가 서로 같다.

| 모델 | 한도 |
|---|---|
| gpt-oss-120b | 30 requests/minute, 60,000 tokens/minute, 900 requests/hour, 100만 tokens/hour, 14,400 requests/day, 100만 tokens/day |
| Llama 3.1 8B | 위와 동일 |

두 모델의 한도가 같으므로 Cerebras는 형식만 모델별 표일 뿐 실질은 프로바이더 단위 한도에 가깝다. 대신 시간당 한도가 따로 걸려 있는 유일한 프로바이더라, 하루치를 짧은 시간에 몰아 쓰는 방식이 막힌다.

Groq은 모델 15종의 편차가 가장 크다.

| 모델 | 일당 요청 | 분당 토큰 |
|---|---|---|
| Llama 3.1 8B | 14,400 | 6,000 |
| Allam 2 7B | 7,000 | 6,000 |
| Whisper Large v3 | 2,000 | 표기 없음 |
| Whisper Large v3 Turbo | 2,000 | 표기 없음 |
| Llama 3.3 70B | 1,000 | 12,000 |
| openai/gpt-oss-120b | 1,000 | 8,000 |
| openai/gpt-oss-20b | 1,000 | 8,000 |
| openai/gpt-oss-safeguard-20b | 1,000 | 8,000 |
| qwen/qwen3.6-27b | 1,000 | 8,000 |
| groq/compound | 250 | 70,000 |
| groq/compound-mini | 250 | 70,000 |
| canopylabs/orpheus-arabic-saudi | 표기 없음 | 표기 없음 |
| canopylabs/orpheus-v1-english | 표기 없음 | 표기 없음 |
| meta-llama/llama-prompt-guard-2-22m | 표기 없음 | 표기 없음 |
| meta-llama/llama-prompt-guard-2-86m | 표기 없음 | 표기 없음 |

Groq 표에서는 요청 한도와 토큰 한도가 반대로 움직인다. Llama 3.1 8B는 하루 14,400회를 허용하지만 분당 토큰이 6,000개로 좁고, compound 계열은 하루 250회로 가장 좁은 대신 분당 70,000 토큰으로 가장 넓다. 작은 요청을 많이 보낼 것인지 큰 요청을 적게 보낼 것인지에 따라 고를 모델이 달라진다.

한도 칸이 비어 있는 모델이 4종 있다. 음성 모델인 orpheus 2종과 프롬프트 안전 검사 모델인 llama-prompt-guard 2종이다. 문서는 이 모델들을 표에 올려 두었지만 한도는 적지 않았다.

### 체험 크레딧 프로바이더 13곳

| 프로바이더 | 크레딧 | 유효 기간 | 모델 |
|---|---|---|---|
| Baseten | $30 | 표기 없음 | 지원 모델 전부, 컴퓨트 시간 기준 과금 |
| NLP Cloud | $15 | 표기 없음 | 오픈 모델 다수, 전화번호 인증 필요 |
| AI21 | $10 | 3개월 | Jamba 계열 |
| Upstage | $10 | 3개월 | Solar Pro, Solar Mini |
| Modal | 가입 시 월 $5, 결제 수단 등록 시 월 $30 | 매월 | 지원 모델 전부, 컴퓨트 시간 기준 과금 |
| SambaNova Cloud | $5 | 3개월 | 6종 |
| Fireworks | $1 | 표기 없음 | 오픈 모델 다수 |
| Nebius | $1 | 표기 없음 | 오픈 모델 다수 |
| Hyperbolic | $1 | 표기 없음 | 4종 |
| Inference.net | $1, 이메일 설문 응답 시 $25 | 표기 없음 | 오픈 모델 다수 |
| Novita | $0.5 | 1년 | 오픈 모델 다수 |
| Alibaba Cloud Model Studio | 모델당 100만 토큰 | 표기 없음 | Qwen 오픈 모델과 상용 모델 |
| Scaleway Generative APIs | 100만 토큰 | 표기 없음 | 18종 |

크레딧 금액은 $0.5에서 $30까지 60배 차이가 난다. 가장 큰 Baseten의 $30과 Modal의 월 $30은 성격이 조금 다른데, 둘 다 토큰이 아니라 컴퓨트 시간으로 과금하므로 실제로 얼마나 쓸 수 있는지가 모델 크기와 실행 시간에 달려 있다.

Modal은 이 묶음에서 유일하게 매월 재지급되는 형태다. 가입만 하면 월 $5, 결제 수단을 등록하면 월 $30이다. 성격상 무료 한도 쪽에 가깝지만 문서는 체험 크레딧 묶음에 두었다.

Alibaba Cloud Model Studio와 Scaleway Generative APIs는 금액이 아니라 토큰 수로 크레딧을 준다. 두 곳 모두 100만 토큰이지만 Alibaba Cloud는 모델당 100만 토큰이라 모델을 바꿔 가며 쓰면 총량이 늘어난다.

Scaleway는 모델을 이름으로 나열한 항목 가운데 목록이 가장 길다. 18종 안에 텍스트 생성 모델뿐 아니라 임베딩 모델(BGE-Multilingual-Gemma2, qwen3-embedding-8b)과 음성 인식 모델(Whisper Large v3, voxtral-small-24b-2507)이 함께 들어 있다. 임베딩은 텍스트를 고정 차원 벡터로 바꾼 표현을 말하며, 검색이나 RAG 구성에 쓰인다.

## 결과

### 일 단위 요청 한도의 편차

같은 "무료"라도 하루에 쓸 수 있는 양은 수백 배까지 벌어진다. 일 단위 요청 한도가 명시된 값만 모으면 다음과 같다.

| 일당 요청 한도 | 프로바이더와 모델 |
|---|---|
| 14,400회 | Cerebras 2종, Groq Llama 3.1 8B, Google AI Studio Gemma 3 계열 4종 |
| 7,000회 | Groq Allam 2 7B |
| 2,000회 | Mistral Codestral, Groq Whisper 계열 2종 |
| 1,000회 | OpenRouter($10 충전 시), Groq Llama 3.3 70B, Groq gpt-oss 계열 3종, Groq qwen3.6-27b |
| 500회 | Google AI Studio Gemini 3.1 Flash-Lite |
| 250회 | Groq compound 계열 2종 |
| 50회 | OpenRouter 기본값 |
| 20회 | Google AI Studio Gemini 계열 6종 |
| 10회 | Google AI Studio TTS 2종 |

상단과 하단이 1,440배 차이다. 하루 20회 한도로는 대화형 도구를 상시 운영하기 어렵고, 14,400회면 개인용 도구 수준은 이 한도 안에서 감당된다. 프로바이더를 고를 때 가장 먼저 확인할 값이 이 일 단위 한도다. 다만 문서가 용도별 권고를 적어 두지는 않았으므로, 이 판단은 수치에서 따라 나오는 해석이다.

한도가 큰 쪽은 대체로 소형 모델이다. 14,400회 구간의 Gemma 3 계열과 Llama 3.1 8B는 모두 소형 모델이고, 20회 구간의 Gemini Flash 계열은 상대적으로 큰 모델이다. Groq 안에서도 Llama 3.1 8B가 14,400회인 반면 Llama 3.3 70B는 1,000회다. 즉 모델을 키우면 호출 횟수를 내주는 맞바꿈 관계가 목록 전반에 나타난다.

### 제공 모델 계열

문서에 이름이 적힌 모델을 계열별로 모으면 오픈 모델이 대부분이다.

| 계열 | 등장하는 프로바이더 |
|---|---|
| Llama | OpenRouter, Groq, Cerebras, GitHub Models, Cloudflare Workers AI, Hyperbolic, SambaNova, Scaleway |
| Qwen | OpenRouter, Groq, Cloudflare Workers AI, Alibaba Cloud Model Studio, Hyperbolic, Scaleway |
| gpt-oss | OpenRouter, Groq, Cerebras, Cloudflare Workers AI, SambaNova, Scaleway |
| Gemma | OpenRouter, Google AI Studio, Cloudflare Workers AI, SambaNova, Scaleway |
| DeepSeek | OpenCode Zen, GitHub Models, Hyperbolic, SambaNova |
| Mistral 계열(Codestral, Ministral, Devstral, Voxtral 포함) | Mistral 2곳, GitHub Models, Cloudflare Workers AI, Scaleway |
| Nemotron | OpenRouter, OpenCode Zen, Cloudflare Workers AI |
| 상용 모델(OpenAI GPT, o 계열, Phi, Cohere Command, Mistral 상용 모델) | GitHub Models, Cohere, Mistral La Plateforme |

가중치가 공개되지 않은 상용 모델을 무료 한도로 여는 창구는 세 곳이다. GitHub Models가 GPT-4.1, GPT-4o, gpt-5, o1, o3, o4-mini, Phi-4 계열과 Cohere Command A를 포함하고, Cohere가 자사 Command 계열을 열며, Mistral La Plateforme이 자사 상용 모델을 연다. 다만 GitHub Models는 앞서 본 대로 토큰 한도가 매우 제한적이고 한도가 Copilot 구독 등급을 따르며, Mistral La Plateforme은 데이터 학습 동의와 전화번호 인증을 요구한다.

특수 목적 모델도 흩어져 있다. 음성 인식은 Groq과 Scaleway의 Whisper 계열, 음성 합성은 Google AI Studio의 TTS 2종과 Groq의 orpheus 2종이다. 안전 검사 모델은 Groq의 llama-prompt-guard 2종과 openai/gpt-oss-safeguard-20b, OpenRouter의 nvidia/nemotron-3.5-content-safety, Cloudflare Workers AI의 Llama Guard 3 8B가 있다. 로봇 도메인 모델로는 Google AI Studio의 Gemini Robotics-ER 1.5와 1.6이 올라 있다.

### 조건이 붙는 비율

26곳 가운데 가입이나 이용 자체에 조건이 붙는 곳은 6곳이다. 데이터 학습 관련이 3곳, 전화번호 인증이 4곳인데 Mistral La Plateforme이 두 조건에 모두 걸려 중복을 빼면 6곳이 된다.

| 조건 | 곳 수 | 묶음 |
|---|---|---|
| 데이터 학습 동의 또는 학습 활용 고지 | 3곳 | 전부 무료 한도 묶음 |
| 전화번호 인증 | 4곳 | 무료 한도 3곳, 체험 크레딧 1곳 |
| 조건 표기 없음 | 20곳 | 무료 한도 8곳, 체험 크레딧 12곳 |

조건은 무료 한도 묶음에 몰려 있다. 무료 한도 13곳 중 5곳에 조건이 붙는 반면, 체험 크레딧 13곳 중 조건이 붙은 곳은 NLP Cloud 하나뿐이다. 지급 금액이 한정되어 있어 남용 위험이 낮은 구조이기 때문으로 보이지만, 문서가 이유를 밝히지는 않았다.

## 한계

**이 목록은 수집 시점의 스냅샷이며 현재 값이 아니다.** 무료 한도, 크레딧 금액, 제공 모델은 프로바이더가 언제든 바꿀 수 있다. 이 페이지의 모든 수치는 raw로 수집한 README 본문에 적힌 값을 그대로 옮긴 것이므로, 실제로 사용하기 전에는 각 항목에 링크된 공식 rate limit 문서에서 다시 확인해야 한다.

**수집 시점을 정확히 알 수 없다.** raw frontmatter의 `year` 값은 2026이지만 README 본문에는 날짜나 갱신 시각 표기가 없다. 그래서 이 값들이 2026년의 어느 시점 기준인지는 문서만으로 판단할 수 없다.

**저장소 내부는 확인할 수 없다.** raw로 수집한 것이 README 본문뿐이라 목록을 어떤 절차로 갱신하는지, 자동 수집 스크립트가 있는지, 기여 규칙이 무엇인지는 근거가 없다.

**라이선스 조항이 README 본문에 없다.** raw frontmatter는 `None (unlicensed)`로 기록하지만 본문에는 라이선스 문구가 없어, 목록을 그대로 옮겨 쓸 때의 조건을 본문만으로는 판단할 수 없다.

**한도를 공통 단위로 비교할 수 없다.** requests, tokens, neurons, 금액이 섞여 있고 문서는 각 프로바이더의 표기를 그대로 옮길 뿐 환산해 주지 않는다. 프로바이더 간 비교는 읽는 사람이 직접 해야 한다.

**한도 칸이 비어 있는 항목이 남아 있다.** Groq 표의 4종과 OpenCode Zen 항목 전체가 그렇다.

**모델 품질과 응답 속도 비교가 없다.** 어느 모델이 어느 정도 성능인지, 지연 시간이 얼마인지에 대한 수치가 없어 모델 선택에는 다른 자료가 필요하다.

**운영 설계는 범위 밖이다.** 남용하지 말라는 주의만 있고 사용량을 어떻게 모니터링할지, 한도를 넘겼을 때 어느 프로바이더로 넘길지 같은 설계는 문서가 다루지 않는다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| Rate limit | 분, 시간, 일, 월 단위로 허용되는 요청 수 또는 토큰 수의 상한. 넘기면 요청이 거부되거나 다음 주기까지 기다려야 한다 |
| Trial credit | 가입 시 한 번 지급되는 사용 크레딧. 다 쓰면 결제 수단을 등록하기 전에는 호출할 수 없다 |
| Shared quota | 한 프로바이더의 여러 모델이 하나의 한도를 나눠 쓰는 방식. OpenRouter와 Cohere가 이 방식이다 |
| Neuron | Cloudflare Workers AI의 자체 과금 단위. 요청 수나 토큰 수가 아니라 이 단위로 하루 10,000개까지 무료다 |
| AI gateway | 여러 프로바이더로 요청을 라우팅하는 중계 계층. Vercel AI Gateway와 OpenCode Zen이 이 형태다 |
| Data training opt-in | 무료 한도를 쓰는 대가로 입력이 프로바이더의 모델 학습에 쓰이는 것을 받아들이는 조건 |

## 관련 페이지

- [[applications/shubhamsaboo-awesome-llm-apps]]: LLM 응용 예제를 모은 카탈로그. 무엇을 만들지를 그 페이지가 다룬다면 무엇으로 실행할지를 이 페이지가 다룬다
- [[applications/zhulinsen-daily-stock-analysis]]: LLM API를 실제 도메인 업무에 붙인 응용 사례. 이런 개인 규모 시스템이 이 목록의 무료 한도가 겨냥하는 용도다
- [[applications/patel-2026-production-ai-app-seven-layers]]: 제품 수준 AI 응용에서 모델과 프로바이더 선택이 전체의 한 층에 불과하다는 관점
