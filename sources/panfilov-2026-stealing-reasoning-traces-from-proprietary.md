---
title: "Stealing Reasoning Traces from Proprietary LLM APIs"
type: paper
year: 2026
category: llms
raw_path: /home/sguys99/project/ai-wiki/raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary.pdf
raw_filename: "panfilov-2026-stealing-reasoning-traces-from-proprietary.pdf"
source_collection: external
authors: "Alexander Panfilov, David Schmotz, Ilia Shumailov, Luca Beurer-Kellner, Joachim Schaeffer, Ameya Prabhu, Jonas Geiping, Maksym Andriushchenko"
arxiv_id: "2608.09867"
tags: [reasoning-model, chain-of-thought, distillation, jailbreak, prompt-injection, privacy, api-security, safety, llm]
figures:
  - id: fig01
    label: Figure 1
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig01.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig01.png
    caption: "encrypted reasoning trace를 약한 모델에 주입해 평문으로 받아내는 2-호출 추출 공격 개요"
    page: 2
    bbox_norm: [0.109, 0.0646, 0.891, 0.4491]
    strategy: caption-region
    curated: true
  - id: fig02
    label: Figure 2
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig02.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig02.png
    caption: "current-turn injection과 past-turn injection 두 주입 방식"
    page: 5
    bbox_norm: [0.1399, 0.0469, 0.8601, 0.1161]
    strategy: manual
    curated: true
  - id: fig03
    label: Figure 3
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig03.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig03.png
    caption: "Claude reasoning을 Kimi-K3에 prefill하면 응답 스타일이 Claude 쪽으로 옮겨간다"
    page: 6
    bbox_norm: [0.109, 0.0501, 0.8911, 0.3777]
    strategy: caption-region
    curated: false
  - id: fig04
    label: Figure 4
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig04.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig04.png
    caption: "최종 답변에는 없는 유해 정보가 reasoning에는 남아 있는 예시"
    page: 7
    bbox_norm: [0.109, 0.0501, 0.8911, 0.2449]
    strategy: caption-region
    curated: false
  - id: fig05
    label: Figure 5
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig05.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig05.png
    caption: "공개된 트레이스에서 복원한 API 키와 합성 페르소나 개인정보 예시"
    page: 8
    bbox_norm: [0.109, 0.0501, 0.8911, 0.2686]
    strategy: caption-region
    curated: false
  - id: fig06
    label: Figure 6
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig06.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig06.png
    caption: "공개 트레이스에서 복원한 개인정보를 PII·기술 식별자·credential 세 범주로 집계"
    page: 8
    bbox_norm: [0.109, 0.7076, 0.891, 0.867]
    strategy: caption-region
    curated: true
  - id: fig08
    label: Figure 8
    kind: figure
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig08.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/fig08.png
    caption: "노출된 요약이 실제 reasoning의 일부만 담는 summary unfaithfulness 예시"
    page: 12
    bbox_norm: [0.109, 0.0501, 0.8911, 0.2469]
    strategy: caption-region
    curated: false
  - id: tab01
    label: Table 1
    kind: table
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/tab01.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/tab01.png
    caption: "Claude·GPT·Gemini 세 provider의 cross-model 호환성 매트릭스"
    page: 4
    bbox_norm: [0.0899, 0.7669, 0.9101, 0.8821]
    strategy: manual
    curated: true
  - id: tab02
    label: Table 2
    kind: table
    file: assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/tab02.png
    raw: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary-figures/tab02.png
    caption: "누출 벡터별로 매핑한 provider-side mitigation 표"
    page: 19
    bbox_norm: [0.1251, 0.2064, 0.8749, 0.7285]
    strategy: table-region
    curated: true
---

## 한 줄 요약 (One-line Summary)

주요 provider는 chain-of-thought를 암호화해 클라이언트로 돌려주지만 그 암호화 블록은 세션·사용자·모델 사이에서 서로 호환된다. 논문은 이 호환성을 이용해 강한 모델이 만든 encrypted reasoning trace를 같은 provider의 약하고 방어가 느슨한 모델에 주입해 평문으로 받아내는 확장 가능한 복호화 공격을 제시한다. 이 공격으로 distillation·secret 추출·jailbreak·prompt injection 네 가지 남용 경로를 실증한 Anthropic·OpenAI·Google 대상 보안 연구다.

## 1. 자료 정보 (Document Information)

- **제목**: Stealing Reasoning Traces from Proprietary LLM APIs
- **저자**: Alexander Panfilov, David Schmotz, Ilia Shumailov (공동 1저자) 외 — Jonas Geiping·Maksym Andriushchenko 등 공동 지도
- **소속**: MATS Research, ELLIS Institute Tübingen, Max Planck Institute for Intelligent Systems, Tübingen AI Center, Snyk, University of Tübingen 등
- **발행**: 2026년 8월 10일, arXiv:2608.09867v1 [cs.CR]
- **프로젝트 페이지**: stolen-thoughts.com
- **유형**: 보안 취약점 분석 논문 (본문 + 부록 A~E, 총 116페이지)
- **범위**: reasoning model이 반환하는 암호화된 chain-of-thought의 아키텍처 취약점과, 이를 악용한 네 가지 공격 벡터의 실증·완화책. 실험은 2026년 7월 초 기준 Anthropic·OpenAI·Google API 버전에 한정된다.

## 2. 주요 기여 (Key Contributions)

이 논문이 짚는 취약점은 하나의 아키텍처 결정에서 나온다. reasoning model은 답을 내기 전에 긴 내부 사고를 생성하는데 provider는 이 사고를 서버에 저장하지 않고 암호화된 블록으로 클라이언트에 돌려준 뒤 다음 요청마다 되받는다. 논문은 이 블록이 원래 맥락 밖에서도 통한다는 선행 관찰(Green 2026)을 한 발 더 밀어 같은 provider 생태계 안에서라면 다른 세션·다른 사용자·다른 모델 사이에서 완전히 호환·교체 가능하다는 점을 밝힌다.

- **확장 가능한 reasoning 추출**. 같은 provider의 호환 디코더 모델 하나면 여러 모델·trace 포맷에 걸쳐 숨겨진 reasoning을 복원할 수 있음을 특성화한다. 강한 모델을 직접 jailbreak하지 않고 약한 모델을 복호화 oracle로 쓴다.
- **세 vendor 교차 검증**. Anthropic·OpenAI·Google 주요 API에 대해 공격 효과를 실증한다.
- **네 가지 공격 벡터**. (i) proprietary reasoning trace의 distillation, (ii) 공개·커밋된 트레이스에서 제3자가 credential·PII를 빼내는 secret 추출, (iii) 오염된 reasoning 블록을 통한 은닉 prompt injection, (iv) 숨은 reasoning 채널로 유해 출력을 끄집어내는 jailbreak.
- **완화책 제안**. 책임 있는 공개(responsible disclosure) 이후 서버 저장 전환, 암호 envelope의 맥락 결속(contextual binding) 등 아키텍처·암호·모델 수준 방어를 제시한다. PII는 개인을 식별할 수 있는 정보(personally identifiable information)를 말한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 암호화된 reasoning과 세 가지 운영 기능

provider는 평문 reasoning 전송을 폐기하고 extended-thinking 블록을 쓴다. 사람이 읽는 부분은 숨기거나 요약하되 실제 chain-of-thought는 불투명한 base64 signature 또는 암호화 payload로 포장한다. chain-of-thought는 답을 내기 전 중간 추론을 텍스트로 펼쳐 test-time 연산을 늘리는 기법이다. 이 문자열은 AEAD(Authenticated Encryption with Associated Data) envelope로, 헤더(모델명·블록 유형·버전·키 ID)·nonce·인증 태그·ciphertext를 담고 signature는 MAC(Message Authentication Code)에 해시로 묶여 검증·재생을 가능케 한다. 다음 호출에서는 `signature`나 `thinkingSignature` 같은 필드로 되돌려 보낸다. 이 설계는 세 기능을 노린다. 경쟁사의 대량 수집을 막는 confidentiality, 사용자의 조작을 무효화하는 integrity, 서버 저장 부담을 없애는 statelessness다.

문제는 statelessness가 클라이언트 저장에 기대는 순간 암호 블록이 맥락·사용자·모델을 넘어 이식 가능해야 한다는 점이다. 이 이식성이 seamless한 모델 전환과 자동 재라우팅을 가능하게 하지만 동시에 공격 표면을 연다. 논문은 provider들이 모든 reasoning 블록을 하나의 global key로 암호화·인증하는 것으로 추정한다.

### 3.2 세 층위의 reasoning 호환성

논문은 허용 범위가 넓어지는 순서로 호환성을 셋으로 나눈다.

- **in/cross-session 호환**: 생성 순서와 다르게, 또는 이전 세션 블록을 새 요청에 재사용할 수 있다. benign한 히스토리 편집을 돕지만 대화 이력 위조도 가능하게 한다. 이 논문의 추출 공격이 쓰는 층위다.
- **cross-user 호환**: 다른 사용자 세션에서 가져온 블록을 재생할 수 있다. 제3자의 secret 추출이 여기서 나온다.
- **cross-model 호환**: 한 모델이 만든 블록을 다른 모델 요청에 재생할 수 있다. Opus→Sonnet 같은 downgrade를 매끄럽게 하지만 강한 모델의 reasoning을 그 모델에 직접 질의하지 않고 distillation하는 핵심 통로가 된다.

Table 1이 세 provider의 cross-model 호환을 정리한다. Claude는 Fable 5의 사고만 예외로, 나머지 모델의 사고는 서로 재생된다. GPT는 5.6 계열이 이전 세대 trace를 재생할 수 있다. Gemini는 어느 모델의 사고든 서로 재생된다.

### 3.3 추출 공격의 구조

취약점의 뿌리는 모델 계열 내부의 보안 비대칭이다. Opus 4.8이나 GPT-5.6 Sol 같은 frontier 모델은 내부 사고 노출을 막는 refusal 학습이 강하지만 Haiku 4.5나 GPT-5.6 Luna 같은 약한 형제 모델은 비용·속도에 맞춰 anti-distillation 방어가 얕다. 공격자는 유효하고 인증된 암호 블록을 이 보안 격차 너머로 옮겨 약한 모델을 뜻하지 않은 복호화 oracle로 쓴다.

주입 방식은 두 가지다(Figure 2). current-turn injection은 사고를 현재 assistant 턴에 놓아 모델이 가시 답변을 그로부터 이어가게 한다. past-turn injection은 이전 턴 reasoning 블록을 생략하지 않는 모델(Sonnet 5·Opus 4.8·Fable 5·GPT-5.6 계열)에만 통한다. provider마다 가장 약한 호환 디코더를 고른다. Claude는 Haiku 4.5, GPT는 GPT-5.6 Luna, Gemini는 Gemini Robotics 1.6이다. 추출 충실도는 추출된 reasoning 토큰 수와 API가 보고한 thinking 토큰 수의 비로 잰다. 논문은 과금 목적상 API 토큰 수가 정확하다고 가정해 이를 총량 검증의 ground-truth로 삼는다.

왜 강한 모델을 직접 jailbreak하는 것보다 확장성이 좋은가. 직접 공격은 모델 수준 alignment(내부 사고 노출 거부)와 시스템 수준 방어(입력 필터·출력 substring 매칭)를 함께 뚫어야 한다. 약하고 호환되는 모델이 있으면 이 난이도가 크게 낮아진다. Haiku 4.5는 고정 추출 프롬프트 하나로 되지만 상대적으로 더 유능한 GPT-5.6 Luna는 블록마다 다른 템플릿·best-of-n 샘플링·50토큰 미만 청크 분할 같은 우회가 필요했다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- **추출 충실도**. 120개 Codeforces 문제에서 API가 보고한 thinking 토큰 수와, signature로 재구성해 같은 모델에 재입력한 reasoning의 토큰 수가 대부분 밀접하게 일치했다(Figure 1). Figure 8은 추출된 reasoning이 native 요약보다 질적으로 더 상세함을 보인다. 실험 문제는 AIME 2025·Codeforces(Open-R1 부분집합)·Humanity's Last Exam에서 가져왔다.
- **distillation 이득**. reasoning은 답만 있는 distillation보다 훨씬 밀도 높은 감독 신호를 준다. 선행 연구(Zhang 2026a)는 trace-inversion 모델로 근사 reasoning을 합성해 Qwen2.5-7B-Instruct의 MATH500 정확도를 answer-only 대비 68.4%→76.0%로 올렸는데 그건 대리 근사였다. 이 논문은 근사가 아니라 원본 reasoning을 그대로 복원한다. 경제성도 좋다. Haiku 4.5 요금 기준 12k-토큰 입출력 창으로 10k trace를 복호화하는 비용은 약 $720다.
- **대규모 secret 추출**. GitHub·Hugging Face에서 Claude·GPT·Gemini가 만든 공개 agent trajectory 6,708개를 모아 서명된 모든 블록을 복호화해 315,320개의 reasoning trace를 복원했다. 복호화한 블록의 0.3%(1,028개)에 최소 한 건의 개인정보 누출이 있었다. 세션 기준으로는 6,708개 중 4.9%(328개)가 실제 민감 항목을 하나 이상 흘렸다. 실제(비벤치마크) 사용자 세션에서만 API 키 62개·비밀번호 33개·access token 24개·private key 7개·개인 이메일 30개·비로컬 IP 6개가 나왔다. 벤치마크 소스를 포함하면 전체 912개의 개인정보 항목이 세 범주(PII·기술 식별자·credential)로 집계된다(Figure 6).
- **가시 이력에 없던 정보**. 실제 사용자 세션에서 reasoning으로 복원한 항목 704개 중 64개는 가시 채팅 이력에는 전혀 없었다. 모델 memory에서 조용히 주입됐거나 사용자가 가시 텍스트만 지우고 공유한 뒤 암호 payload에 갇혀 남은 경우다. 특히 사용자가 세션을 "정리·익명화"해 달라고 하면 모델이 숨은 reasoning에서 전체 이력을 다시 읽어 지워야 할 민감값을 오히려 되뇌는 패턴이 반복됐다.
- **jailbreak**. HarmBench 프롬프트를 바꿔 Opus 4.8이 유해 주제를 길게 reasoning하게 유도한 뒤, benign한 가시 답변은 버리고 암호 블록만 Haiku 4.5로 복호화하면 최종 답변에는 없던 유해 정보가 드러난다(Figure 4).
- **prompt injection**. o4-mini에 악성 백업 지시를 심어 사고를 얻은 뒤 그 블록을 GPT-5.6 Sol의 무관한 pptx 편집 요청에 이식하면, GPT-5.6 Sol이 그 사고를 자기 이전 추론으로 받아들여 공격자 서버로 파일을 업로드하는 스크립트를 만든다. Haiku 4.5·Opus 4.7 쌍으로 PostTrainBench long-horizon trace에 데이터 유출 지시를 심는 실험도 성공했다. 페이로드가 가시 텍스트가 아닌 숨은 reasoning에 있어 외부 모니터가 잡지 못한다.
- **책임 있는 공개**. 공개 전 주요 provider·Microsoft·Hugging Face에 취약점과 방법을 알렸다. 원 취약점(교체 가능한 trace)은 Green이 2026년 5월에 먼저 공개했으나 provider들이 side-channel/replay의 보안 함의를 인정하지 않았다고 전한다. 보고 이후 저자들은 같은 공격을 재현할 수 없었다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 실험은 2026년 7월 초 시점의 특정 API 버전·모델에 한정된다. provider의 암호 구현은 비공개이고 예고 없이 바뀌므로 공격 효과도 달라진다.
- 추출은 디코더 모델의 확률적 생성에 기대므로, 토큰 수 비교가 높은 충실도를 시사해도 ground-truth 평문이 없어 모든 토큰을 완전히 검증하지는 못한다.
- 야생 트레이스 스캔은 공개 데이터셋 전수 감사가 아니라 표적 시연이다. 로컬 저장 trace나 프로덕션 서비스에서는 PII·secret 누출이 훨씬 넓게 퍼져 있을 것으로 가정한다.
- 완화책: 서버 저장으로 아키텍처를 전환하면 무저장 API를 포기하는 대신 replay·추출을 원천 차단한다. stateless를 유지하려면 envelope를 originating 맥락에 암호적으로 묶는 contextual binding으로 대응한다. 이때 user_id·session_id를 결속하고 예전 키를 폐기한다. 모델 수준에서는 transcription-style 프롬프트를 인식해 거부하도록 하는 후처리를 제안한다(Table 2). 데이터 공개 위생으로는 민감정보가 노출된 경우 공개 전 reasoning 블록을 통째로 제거할 것을 권한다.

## 6. 관련 연구 (Related Work)

- **Green (2026)**: 암호 reasoning 블록이 원래 맥락 밖에서도 이식 가능함을 처음 보였다. 이 논문은 그 관찰을 cross-user·cross-model까지 확장한다.
- **distillation 계보**: Kim & Rush(2016), Wallace(2020), Gudibande(2024) 등 출력 기반 sequence-level distillation과, Zhang(2026a)의 trace-inversion 기반 reasoning 근사. 이 논문은 근사가 아닌 원본 복원이라는 점에서 구분된다.
- **chain-of-thought 안전**: Baker(2025)·Carroll(2026)의 chain-of-thought monitorability, Zhou(2025)의 open-weight reasoning 모델에서 유해 정보 노출 관찰.
- **prompt injection**: Schmotz(2026)에서 가져온 injection을 암호 reasoning 채널로 옮긴 형태. Rank(2026)의 PostTrainBench long-horizon trace를 오염 실험에 사용.

## 7. 용어집 (Glossary)

이 자료 고유의 모델명·시스템 용어만 담는다. chain-of-thought·distillation·alignment 등 도메인 공통 용어는 [[overviews/glossary-llms]]·[[overviews/glossary-agents]]를 따른다.

- **encrypted reasoning trace / encrypted reasoning block**: provider가 chain-of-thought를 서버에 저장하지 않고 클라이언트에 돌려주는 암호화된 사고 블록. 이 논문의 공격 대상이다.
- **AEAD envelope**: Authenticated Encryption with Associated Data. 헤더·nonce·인증 태그·ciphertext로 이뤄진 암호 봉투. signature가 associated data로 MAC에 묶인다.
- **signature / thinkingSignature**: 암호 블록을 다음 API 호출로 되돌려 보낼 때 쓰는 필드명. provider별로 이름이 다르다.
- **cross-model / cross-user / cross-session compatibility**: 암호 reasoning 블록이 각각 다른 모델·사용자·세션 사이에서 재생 가능한 성질. 허용 범위가 넓어지는 순서다.
- **decoder model**: 강한 모델의 암호 블록을 평문으로 풀어내는 데 쓰이는, 같은 provider의 약하고 방어가 얕은 모델(Haiku 4.5·GPT-5.6 Luna·Gemini Robotics 1.6).
- **current-turn / past-turn injection**: 주입한 사고를 현재 assistant 턴에 놓느냐, 이전 턴 위치에 놓느냐로 갈리는 두 주입 방식(Figure 2).
- **contextual binding**: envelope를 user_id·session_id 등 originating 맥락에 암호적으로 묶어 재생을 막는 완화책.
- **summary unfaithfulness**: provider가 노출하는 요약이 실제 reasoning의 일부만 담아, 요약만으로는 원 사고를 재구성할 수 없는 현상(Figure 8).

## 8. 그림 후보 (Figure Candidates)

주 본문의 핵심 도식·표만 아래에 싣는다. 부록에는 Opus 4.8·Kimi-K3 완성 비교(fig11~fig23), 추출 프롬프트 템플릿(fig33~fig45), 추가 통계(fig24~fig32)와 표(tab03~tab05)가 더 있으며 `raw/papers/{stem}-figures/`에 전량 아카이브돼 있다 — 필요 시 재선택한다.

| id | page | caption | strategy | 추천 |
|---|---|---|---|---|
| fig01 | 2 | "encrypted reasoning를 약한 모델에 주입해 평문으로 받는 2-호출 추출 개요" | caption-region | ★ wiki 권장 (architecture) |
| fig02 | 5 | "current-turn·past-turn 두 주입 방식" | manual | ★ wiki 권장 (method) |
| tab01 | 4 | "Claude·GPT·Gemini cross-model 호환 매트릭스 (Fable 5만 예외)" | manual | ★ wiki 권장 (key finding) |
| fig06 | 8 | "복원한 개인정보 PII·기술 식별자·credential 세 범주 집계" | caption-region | ★ wiki 권장 (result) |
| tab02 | 19 | "누출 벡터↔provider-side mitigation 매핑" | table-region | ★ wiki 권장 (mitigation) |
| fig03 | 6 | "Claude reasoning prefill이 Kimi-K3 응답 스타일을 옮긴다" | caption-region | (확인 필요) |
| fig04 | 7 | "최종 답변엔 없는 유해 정보가 reasoning에 남은 예시" | caption-region | (확인 필요) |
| fig05 | 8 | "공개 트레이스에서 복원한 API 키·합성 페르소나 예시" | caption-region | (확인 필요) |
| fig08 | 12 | "노출 요약이 reasoning 일부만 담는 summary unfaithfulness" | caption-region | (확인 필요) |
