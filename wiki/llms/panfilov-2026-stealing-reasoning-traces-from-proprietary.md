---
title: "Stealing Reasoning Traces from Proprietary LLM APIs"
type: paper
year: 2026
category: llms
source: panfilov-2026-stealing-reasoning-traces-from-proprietary.md
raw_path: raw/papers/panfilov-2026-stealing-reasoning-traces-from-proprietary.pdf
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

## 요약 (Summary)

reasoning model은 답을 내기 전 긴 내부 사고를 생성한다. Anthropic·OpenAI·Google은 이 chain-of-thought를 서버에 저장하지 않고 암호화된 블록으로 클라이언트에 돌려준 뒤, 다음 요청마다 되받는 방식으로 지식재산과 정보 누출을 막으려 한다. chain-of-thought는 답 전에 중간 추론을 텍스트로 펼쳐 test-time 연산을 늘리는 기법이다. 이 논문은 그 암호 블록이 같은 provider 생태계 안에서 세션·사용자·모델을 넘어 서로 호환·교체된다는 취약점을 다룬다.

핵심 발상은 모델 계열 내부의 보안 비대칭이다. Opus 4.8·GPT-5.6 Sol 같은 강한 모델은 내부 사고 노출을 막는 refusal 학습이 두껍지만 Haiku 4.5·GPT-5.6 Luna 같은 약한 계열 모델은 비용·속도에 맞춰 방어가 얕다. 강한 모델이 만든 encrypted reasoning trace를 약한 모델에 주입하면 약한 모델이 그것을 평문으로 그대로 받아 적는다. 강한 모델을 한 번도 직접 jailbreak하지 않고 reasoning을 훔치는 셈이다. jailbreak는 모델의 안전 거부를 우회해 원래 막힌 출력을 끌어내는 것을 말한다.

![[assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig01.png]]
*Figure 1: encrypted reasoning trace를 약한 모델에 주입해 평문으로 받아내는 2-호출 추출 공격 개요 (Panfilov 2026, p.2). Opus 4.8이 돌려준 signature만 Haiku 4.5에 보내 `<thinking-copy>`로 옮겨 적게 하면 Opus의 숨은 reasoning이 드러난다.*

## 취약점의 근원 (Encrypted Reasoning and Compatibility)

provider는 평문 reasoning을 폐기하고 extended-thinking 블록을 쓴다. 실제 사고는 불투명한 base64 signature 또는 암호화 payload로 포장한다. 이 문자열은 AEAD(Authenticated Encryption with Associated Data) envelope로 헤더·nonce·인증 태그·ciphertext를 담는다. 이 설계가 노리는 세 기능은 경쟁사의 대량 수집을 막는 confidentiality, 사용자 조작을 무효화하는 integrity, 서버 저장 부담을 없애는 statelessness다.

문제는 statelessness가 클라이언트 저장에 기대는 순간 시작된다. statelessness를 유지하려면 암호 블록이 맥락·사용자·모델을 넘어 이식 가능해야 한다. 그래서 provider들은 모든 블록을 하나의 global key로 암호화·인증하는 듯하다. 이 이식성 덕분에 모델을 매끄럽게 바꿀 수 있지만 그만큼 공격 표면도 넓어진다. 논문은 호환성을 허용 범위가 넓어지는 순서로 셋으로 나눈다. cross-session 호환은 순서를 바꾸거나 이전 세션 블록을 재사용하게 한다. cross-user 호환은 남의 세션 블록을 재생하게 하고 cross-model 호환은 한 모델의 블록을 다른 모델 요청에 넣게 한다. 추출 공격은 이 중 첫 번째 층위를, secret 추출은 두 번째 층위를 쓴다.

![[assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/tab01.png]]
*Table 1: Claude·GPT·Gemini 세 provider의 cross-model 호환성 매트릭스 (Panfilov 2026, p.4). Claude는 Fable 5의 사고만 다른 모델이 재생하지 못하는 예외이고, 나머지 Claude 모델과 모든 Gemini 모델의 사고는 서로 재생된다.*

## 추출 공격 (Reasoning Extraction Attack)

공격자는 유효하고 인증된 암호 블록을 보안 격차 너머로 옮겨 약한 모델을 뜻하지 않은 복호화 oracle로 쓴다. 주입 방식은 둘이다. current-turn injection은 사고를 현재 assistant 턴에 놓아 모델이 가시 답변을 그로부터 이어가게 한다. past-turn injection은 이전 턴 reasoning을 생략하지 않는 모델(Sonnet 5·Opus 4.8·Fable 5·GPT-5.6 계열)에만 통한다. provider마다 가장 약한 호환 디코더를 고른다. Claude는 Haiku 4.5, GPT는 GPT-5.6 Luna, Gemini는 Gemini Robotics 1.6이다.

![[assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig02.png]]
*Figure 2: current-turn injection과 past-turn injection 두 주입 방식 (Panfilov 2026, p.5).*

강한 모델을 직접 jailbreak하려면 모델 수준 alignment와 시스템 수준 필터를 함께 뚫어야 하지만 약하고 호환되는 모델이 있으면 그 난이도가 크게 낮아진다. Haiku 4.5는 고정 프롬프트 하나로 되고 상대적으로 더 유능한 GPT-5.6 Luna는 블록마다 다른 템플릿·best-of-n 샘플링·50토큰 미만 청크 분할 같은 우회가 필요했다. 추출 충실도는 추출된 reasoning 토큰 수와 API가 보고한 thinking 토큰 수의 비로 잰다. 120개 Codeforces 문제에서 두 값은 대부분 밀접하게 일치했다.

## 네 가지 공격 벡터 (Four Attack Vectors)

같은 취약점이 distillation, secret 추출, jailbreak, prompt injection 네 방향으로 번진다.

**Distillation.** reasoning은 답만 있는 distillation보다 훨씬 밀도 높은 감독 신호를 준다. 최종 답은 교사 연산의 끝점만 보여주지만 reasoning trace에는 중간 풀이 과정이 그대로 남는다. 선행 연구(Zhang 2026a)는 대리 근사 reasoning으로 Qwen2.5-7B-Instruct의 MATH500 정확도를 answer-only 대비 68.4%에서 76.0%로 올렸다. 이 논문은 근사가 아니라 원본 reasoning을 그대로 복원한다. Haiku 4.5 요금 기준 12k-토큰 입출력으로 10k trace를 복호화하는 비용은 약 $720에 그친다.

**Secret 추출.** GitHub·Hugging Face에서 공개 agent trajectory 6,708개를 모아 서명된 블록을 전부 복호화하니 315,320개의 reasoning trace가 나왔다. 이 중 0.3%(1,028개)에 개인정보 누출이 있었고 세션 기준으로는 4.9%(328개)가 실제 민감 항목을 하나 이상 흘렸다. 실제 사용자 세션에서만 API 키가 62개, 비밀번호가 33개 나왔고 access token 24개와 private key 7개, 개인 이메일 30개도 복원됐다. 특히 사용자가 세션을 "정리·익명화"해 달라고 하면 모델이 숨은 reasoning에서 전체 이력을 다시 읽어 지워야 할 값을 오히려 그대로 다시 적었고 복원 항목 704개 중 64개는 가시 채팅 이력에 전혀 없던 정보였다. 사용자는 암호 블록을 복호화할 수단이 없어서 지웠다고 믿은 정보가 payload에 갇힌 채 공유된다.

![[assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/fig06.png]]
*Figure 6: 공개 트레이스에서 복원한 개인정보를 PII·기술 식별자·credential 세 범주로 집계 (Panfilov 2026, p.8). 벤치마크 소스를 포함하면 총 912개 항목이다. PII는 개인을 식별할 수 있는 정보를 말한다.*

**Jailbreak.** 유해 주제를 길게 reasoning하도록 유도한 뒤 무해한 가시 답변은 버리고 암호 블록만 복호화하면 최종 답변에는 없던 유해 정보가 드러난다. 모델은 사고 안에서 유해 주제를 다루되 사용자 출력에서만 막도록 학습되기 때문이다.

**Prompt injection.** 악성 지시를 내재화한 사고를 만든 뒤 그 블록을 무관한 요청에 이식하면 받는 모델이 그것을 자기 이전 추론으로 받아들여 공격자 서버로 데이터를 업로드하는 코드까지 만든다. 페이로드가 가시 텍스트가 아닌 숨은 reasoning에 있어 외부 모니터가 잡지 못한다. 저자들은 PostTrainBench long-horizon trace에 유출 지시를 심는 실험도 성공시켰다.

## 완화책과 공개 (Mitigations and Disclosure)

가장 근본적인 방어는 서버 저장으로 바꾸는 것이다. 클라이언트에는 무작위 식별자만 주고 trace는 서버에서 ID로 조회하면 replay와 추출의 암호 자산 자체가 사라진다. 다만 저장·복잡도 비용이 크다. statelessness를 유지하려면 envelope를 trace가 생성된 맥락에 암호적으로 묶는 contextual binding이 대안이다. user_id·session_id를 AEAD associated data에 넣고 재생 시 호출자와 대조해 불일치를 거부하는 방식이다. 여기에 `<thinking-copy>` 같은 transcription-style 프롬프트를 인식해 거부하도록 하는 모델 수준 후처리를 더한다.

![[assets/panfilov-2026-stealing-reasoning-traces-from-proprietary/tab02.png]]
*Table 2: 누출 벡터별로 매핑한 provider-side mitigation 표 (Panfilov 2026, p.19). cross-user·cross-session 누출, legacy 데이터셋, 하위 호환, 모델 수준 준수, nonce 예측성까지 여섯 축의 방어를 정리한다.*

원 취약점(교체 가능한 trace)은 Green이 2026년 5월에 먼저 공개했으나 provider들이 replay·side-channel의 보안 함의를 인정하지 않았다고 전한다. 이 논문의 저자들은 공개 전 주요 provider·Microsoft·Hugging Face에 취약점과 방법을 알렸고 보고 이후 같은 공격을 재현할 수 없었다. 데이터 공개 수칙으로는 민감정보가 노출된 경우 공개 전 reasoning 블록을 통째로 제거할 것을 권한다.

한계도 분명하다. 실험은 2026년 7월 초의 특정 API 버전에 한정되고 provider 구현은 비공개이며 예고 없이 바뀐다. 추출은 디코더의 확률적 생성에 기대므로 토큰 수 비교가 높은 충실도를 시사해도 ground-truth 평문 없이는 모든 토큰을 완전히 검증하지 못한다. 실사용 트레이스 스캔도 전수 감사가 아니라 표적 시연이다.

## 관련 페이지 (Related Pages)

- [[llms/shumailov-2024-ununlearning-unlearning-is-not-sufficient]] — 같은 1저자군의 안전 연구. unlearning만으로 지식 통제가 안 되듯 암호화만으로 reasoning 노출을 막지 못한다는 문제의식이 통한다
- [[llms/9bow-2026-gpt-5-6-sol-terra-luna]] — 이 논문이 GPT 디코더로 쓰는 GPT-5.6 Sol/Terra/Luna 계열 소개
- [[overviews/glossary-llms]] — chain-of-thought·distillation·alignment 등 용어의 canonical 표기
- [[overviews/glossary-agents]] — prompt injection·trajectory 등 agentic 용어
