---
title: "OpenAI, GPT-5.6 Sol·Terra·Luna 프리뷰 공개: 새 네이밍 체계와 강화된 안전 스택"
type: article
year: 2026
category: llms
raw_path: raw/articles/9bow-2026-gpt-5-6-sol-terra-luna.md
raw_filename: "9bow-2026-gpt-5-6-sol-terra-luna.md"
source_collection: external
source: 9bow-2026-gpt-5-6-sol-terra-luna.md
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

## 요약 (Summary)

PyTorch Korea 운영자 9bow(박정환)가 OpenAI의 GPT-5.6 프리뷰 발표를 한국어로 옮긴 소식 글이다. GPT-5.6은 Sol·Terra·Luna 세 모델로 나뉜다. 숫자 5.6은 세대를 뜻하고 천체 이름은 세대를 넘어 유지되는 능력 티어를 가리키는 새 네이밍이다. 글은 모델별 가격과 Terminal-Bench 같은 벤치마크 수치를 옮기면서, 미국 정부와 협의해 계층화된 안전 스택을 얹고 단계적으로 공개한다는 배포 방식에도 비슷한 비중을 둔다.

## 세 모델과 네이밍 (Lineup & Naming)

- **Sol** — 플래그십. 프런티어 추론과 장기 에이전트 작업을 맡는다.
- **Terra** — 균형형. GPT-5.5 성능을 절반 가격에 낸다고 소개한다.
- **Luna** — 경량형. 가장 빠르고 저렴하다.

네이밍은 두 축으로 갈린다. 숫자(5.6)가 세대를 표시하고, Sol/Terra/Luna 같은 천체 이름이 세대와 무관하게 이어지는 능력 등급을 표시한다.

## 가격과 벤치마크 (Pricing & Benchmarks)

가격은 1M 토큰 기준이다.

| 모델 | 입력 | 캐시 입력 | 출력 |
|------|---|---|---|
| Sol | $5.00 | $0.50 | $30.00 |
| Terra | $2.50 | $0.25 | $15.00 |
| Luna | $1.00 | $0.10 | $6.00 |

![[assets/9bow-2026-gpt-5-6-sol-terra-luna/fig01.png]]
*Figure 1: GPT-5.6 Sol·Terra·Luna 모델 가격표 (9bow 2026, 원문 이미지)*

Terminal-Bench 2.1에서는 Sol Ultra 91.9%, Sol 88.8%, Claude Mythos 5 88.0%, Terra 84.3%로 나온다.

![[assets/9bow-2026-gpt-5-6-sol-terra-luna/fig02.png]]
*Figure 2: Terminal-Bench 2.1 모델별 점수 비교 (9bow 2026, 원문 이미지)*

나머지 지표도 Sol의 토큰 효율을 앞세운다. GeneBench v1에서는 GPT-5.5보다 적은 토큰으로 더 높은 점수를 냈다. ExploitBench에서는 Mythos Preview급 성능을 출력 토큰 약 1/3(약 120K vs 330K)만으로 달성했다. HealthBench Professional은 Sol 60.5점으로 GPT-5.5 대비 +8.7이다. 프롬프트 인젝션 방어는 Sol·Terra가 1.000 만점, 함수 호출 변형 공격은 Sol 0.910이다. 안전장치를 뗀 railfree 조건의 SecureBio에서는 세계 최고 수준 생물학 68.3%(GPT-5.5 59.7%), ReproBAIT 85%(82%)를 기록했다.

## 안전 스택과 단계적 배포 (Safety Stack & Staged Rollout)

안전장치는 여러 겹이다. 모델을 학습 단계에서 탈옥 거부에 맞춘 다음 그 위에 실시간 활성화 분류기를 얹어 생물학 전체 94.8%, 사이버보안 전체 81.6%의 재현율로 위험 요청을 거른다. 계정 단위 검토·집행이 뒤따르고 사이버·생물 연구에는 심사를 거친 사용자만 들어오는 차등 접근 프로그램을 둔다. 유니버설 탈옥을 찾는 자동화 레드팀에는 A100 환산 70만 GPU 시간을 넣었다고 밝힌다.

배포는 정부 협의를 전제로 한다. OpenAI는 출시 전에 모델의 계획과 능력을 미국 정부와 공유했다면서도, 이런 검토 절차가 장기적인 기본값이 되어서는 안 된다고 선을 그었다. 공개는 단계적이다. 지금은 API·Codex로 신뢰할 수 있는 파트너·조직에만 열려 있고 수 주 안에 ChatGPT·Codex·API 사용자로 넓힌다. 7월에는 Cerebras에서 Sol을 초당 최대 750토큰 속도로 제공하되 초기 일부 고객부터 확대한다.

## 한계 (Limitations)

- 커뮤니티 2차 소식 글이라 수치는 OpenAI 발표를 그대로 옮긴 값이고 독립 검증은 없다. Context window·지식 컷오프 같은 기본 사양은 본문에 빠져 있다.
- SecureBio·ExploitBench 수치는 railfree 조건의 능력 상한이라, 실제 배포 모델이 그렇게 응답한다는 뜻은 아니다.
- 정부 협의형 배포가 반복될지 이번만의 예외일지는 글이 결론을 내리지 않는다.

## 관련 페이지 (Related Pages)

- [[llms/cai-2026-vlm3-vision-language-models]] — 같은 llms 카테고리의 최신 모델 연구
- [[agents/bytebytego-2026-how-openai-built-its-data]] — OpenAI가 GPT-5.5를 사내 데이터 에이전트로 굴리는 방식을 다룬 글, 세대 맥락이 이어진다
- [[applications/9bow-2026-openwiki-coding-agent-documentation]] — 같은 저자(9bow)의 PyTorch Korea 한국어 소식 글 계열
