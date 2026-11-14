---
title: "Which Claude model should you build with? Fable, Opus, Sonnet, or Haiku"
type: article
year: 2026
category: llms
raw_path: raw/articles/anthropic-2026-which-claude-model-should-you.md
raw_filename: "anthropic-2026-which-claude-model-should-you.md"
source_collection: external
author: "Anthropic"
url: "https://claude.dev/blog/which-claude-model-should-you-build-with/"
publisher: "claude.dev"
publication_date: "2026-11-09"
tags: [claude, model-selection, effort-level, cost-per-task, prompt-caching, sub-agent, advisor-tool, model-routing, anthropic]
figures:
  - id: fig01
    file: assets/anthropic-2026-which-claude-model-should-you/page-full.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/page-full.png
    caption: "블로그 원문 상단 6,000px 전체 페이지 스크린샷"
    strategy: screenshot
    curated: false
  - id: fig02
    file: assets/anthropic-2026-which-claude-model-should-you/crop01.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/crop01.png
    caption: "FIG A 영상 정지 화면. 골목 사진 한 장을 네 모델이 각자 작성한 Python 그리기 코드로 재현한 결과 (쿠키 배너가 일부를 가림)"
    strategy: crop
    curated: false
  - id: fig03
    file: assets/anthropic-2026-which-claude-model-should-you/crop02.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/crop02.png
    caption: "FIG B 영상 정지 화면. 네 모델이 같은 포트폴리오 사이트를 각각 만든 결과를 나란히 비교"
    strategy: crop
    curated: false
  - id: fig04
    file: assets/anthropic-2026-which-claude-model-should-you/crop03.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/crop03.png
    caption: "FIG C 영상 정지 화면. Fable 5.2가 한 3D 장면을 16가지 렌더링 기법으로 그려 게임 엔진의 동작을 설명하는 데모"
    strategy: crop
    curated: false
  - id: fig05
    file: assets/anthropic-2026-which-claude-model-should-you/crop04.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/crop04.png
    caption: "FIG D 영상 정지 화면. 한 온라인 상점 프로젝트에서 Fable 5.2는 TypeScript 마이그레이션, Opus 5.5는 구독 기능, Sonnet 5.5는 상품 페이지 문구, Haiku 5.5는 고객 메시지 분류를 맡는다"
    strategy: crop
    curated: true
  - id: fig06
    file: assets/anthropic-2026-which-claude-model-should-you/crop05.png
    raw: raw/articles/anthropic-2026-which-claude-model-should-you-figures/crop05.png
    caption: "FIG E 영상 정지 화면. Opus 5.5가 지도 레이어 작업을 계획하고 병렬 Haiku 5.5 서브에이전트 28개가 공유 지도에 조각을 그린다"
    strategy: crop
    curated: true
---

## 한 줄 요약 (One-line Summary)

Anthropic이 claude.dev 블로그에 게시한 Claude 모델 선택 가이드다. 대부분의 작업은 Opus 5.5의 기본 effort level(`medium`)에서 시작하고, 과제 난이도와 반복 빈도에 따라 Sonnet 5.5, Haiku 5.5로 내려가거나 Fable 5.2로 올라가라고 권한다. 모델을 바꾸기 전에 effort level과 자체 검증 수단을 먼저 조정하고, 최종 판단은 자기 과제에서 완료 과제당 비용을 재서 내리라는 것이 글의 결론이다.

## 1. 자료 정보 (Document Information)

- 제목: Which Claude model should you build with? Fable, Opus, Sonnet, or Haiku
- 저자: Anthropic (페이지에 개인 저자 표기 없음. 데모 영상 제작자로 Lance Martin, Addy Osmani, Dan Fein이 표기됨)
- 매체: claude.dev 블로그, 2026년 11월 9일 게시
- URL: https://claude.dev/blog/which-claude-model-should-you-build-with/
- 성격: Claude Platform과 Claude Code 사용자를 위한 모델 선택 가이드. 과제별 추천표, 네 모델 비교표, 비용과 성능의 trade-off, 모델 혼용 패턴, 마이그레이션 호환성 점검, 자체 측정 절차로 구성된다.
- 수집본: `scripts/fetch_article.py`(jina tier)로 본문 전문 23,485자를 수집했다. 원문의 그림 5개(FIG A~E)는 모두 영상이라 페이지 렌더에서 정지 화면을 잘라 보관했다.

## 2. 주요 기여 (Key Contributions)

- 2026년 11월 기준 일반 제공(GA) 라인업 네 개(Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.2)의 용도, 가격, context window, effort level 기본값, thinking 방식을 한 표로 정리했다. Mythos 5.2는 사이버보안과 생명과학 연구용으로 검증 프로그램을 통해서만 제공된다.
- 과제 11종에 대해 시작 모델과 시작 effort level, 그 이유를 표로 제시했다.
- 모델 선택을 세 가지 trade-off(성능 대 완료 과제당 비용, 지연 대 정확도, 컨텍스트 대 비용)로 분해하고 각각을 벤치마크 수치로 뒷받침했다.
- 모델 혼용 패턴 네 가지(전환 시점, 서브에이전트, advisor tool, 대량 작업 위임)를 정리하고 각 패턴의 손익 수치를 제시했다.
- 모델 전환 전 확인할 API 호환성 차이 여섯 가지를 정리했다.
- 자기 과제로 모델을 고르는 4단계 측정 절차를 제시했다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

### 3.1 기본 권고

- 대부분의 작업은 Opus 5.5의 기본 effort level `medium`에서 시작한다. Claude Code의 기본 모델이며, 입력과 출력 토큰 단가가 Fable 5.2의 절반이다.
- Sonnet 5.5로 내려가는 경우: 범위가 잘 정해진 일상 작업(버그 수정, 명세 기반 기능 구현). 단, 명세가 명확하다고 해서 Sonnet이 적합한 것은 아니다. 마이그레이션이나 성능 최적화는 명세가 명확해도 Opus 5.5가 필요할 수 있고, 대규모라면 Fable 5.2가 필요하다.
- Haiku 5.5로 내려가는 경우: 분류, 라우팅, 추출 같은 가장 단순한 대량 작업. 큰 모델의 부수 작업을 맡는 서브에이전트에도 적합하다.
- Fable 5.2로 올라가는 경우: 코딩, 금융, 과학 분야의 가장 어려운 기술 프로젝트. Opus 5.5를 `high`로 올려도 부족할 때, 또는 장시간 무인 실행에도 쓴다.

모델을 옮기기 전에 effort level부터 조정한다. effort level은 비용과 성능을 함께 조절하는 더 세밀한 다이얼이다. `high`를 넘어서면 한 단계 올리는 비용이 더 큰 모델로 바꾸는 비용과 비슷해질 수 있으므로, 그 지점에서는 다음 모델을 더 낮은 effort level로 시험해 비교한다. 반대로 한 단계 낮추면 필요한 결과를 더 싸게 얻을 수도 있다.

effort level을 높이면 모델이 더 오래 생각하고, tool call을 더 많이 하고, 자기 작업을 더 많이 검토한다. 대신 지연이 늘어난다. 또한 effort level을 올려도 모델에 없는 지식이나 기술이 생기지는 않는다. 그런 경우에는 모델을 올려야 한다.

### 3.2 과제별 시작 모델

| 과제 | 시작 모델 | 시작 effort level | 이유 |
|---|---|---|---|
| 일상 엔지니어링과 디버깅, 여러 PR에 걸친 기능 작업 | Opus 5.5 | `medium`(기본), 이후 `high` | 일상 작업에서 비용과 성능의 균형 |
| 분류, 라우팅, 태깅, 대량 추출 | Haiku 5.5 | `medium`(기본) | 모델군 중 비용과 지연이 가장 낮음 |
| 파일 검색, 로그 읽기, 요약을 하는 서브에이전트 | Haiku 5.5 또는 Sonnet 5.5 | 모델 기본값 | 틀린 답을 쉽게 알아챌 수 있고, 판단은 메인 모델이 맡음 |
| 채팅과 대화형 세션 | Sonnet 5.5 (단순 대량 채팅은 Haiku 5.5) | `low` 또는 `medium` | Sonnet 5.5는 `low`, `medium`에서 특히 빠름 |
| 범위가 정해진 코딩(버그 수정, 기능 반복, 명세 기반 작업) | Sonnet 5.5 | `medium`, 어려우면 `high` | Opus 5.5의 절반 토큰 단가로 범위가 정해진 작업을 잘 처리 |
| 일상 문서, 슬라이드, 스프레드시트 | Sonnet 5.5 | `high`(기본, Claude Code에서는 `medium`) | 빠른 반복과 디자인 감각. 복잡한 재무 모델이나 대량 원자료 기반 문서는 Opus 5.5로 시작 |
| 반복 실행하는 에이전트 과제(조사, 리뷰, 초안 작성) | Sonnet 5.5 | `medium` | 잘 정의된 반복 과제는 큰 모델이 거의 필요 없음 |
| computer use와 시각 중심 워크플로 | Opus 5.5 | `medium` | 많은 스크린샷과 이미지에 걸친 긴 에이전트 루프로, Opus 5.5가 설계된 작업 유형 |
| 대규모 리팩터링과 마이그레이션, 아키텍처 설계, 다수 서브에이전트 지휘 | Fable 5.2 | `medium`, 이후 `high` (API 기본값은 `high`) | 기술 분야에서 Anthropic의 가장 강력한 GA 모델 |
| 심층 조사, 과학 및 정량 분석 | Fable 5.2 | `medium`, 이후 `high` (API 기본값은 `high`) | 코딩, 금융, 과학의 가장 어려운 프로젝트용 |
| 아직 모를 때 | Opus 5.5 | `medium`(기본) | Pro, Max, Ultra, Team, Enterprise와 Anthropic API에서 Claude Code 기본 모델이며, 플랫폼 문서도 시작점으로 권장 |

### 3.3 네 모델 비교

| 항목 | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | Fable 5.2 |
|---|---|---|---|---|
| 용도 | 대량, 비용 민감 작업 | 범위가 정해진 작업의 빠르고 유능한 지원 | 복잡한 코딩과 지식 작업의 일상 모델 | 가장 야심 찬 개방형 기술 작업 |
| 상대 지연 | 가장 빠름 | 빠름 | 보통 | 보통 |
| 입력/출력 단가 (100만 토큰당) | 10만 토큰 이하 프롬프트 $0.10/$0.50, 초과 시 $0.50/$2.50 | $2/$10 | $4/$20 | $8/$40 |
| cache read 단가 (100만 토큰당) | 10만 이하 $0.01, 초과 $0.05 | $0.10 | $0.20 | $0.20 |
| context window | 100만 토큰 | 100만 토큰 | 100만 토큰 | 100만 토큰 |
| 최대 출력 | 12만 8,000 토큰 | 12만 8,000 토큰 | 12만 8,000 토큰 | 12만 8,000 토큰 |
| API의 thinking | adaptive, 기본 켜짐, 끌 수 있음 | adaptive, 기본 켜짐, `between_tools`로 사전 thinking 생략 | adaptive, 항상 켜짐 | adaptive, 항상 켜짐 |
| API 기본 effort level | `medium` | `high` (Claude Code에서는 `medium`) | `medium` | `high` (Claude Code에서는 `medium`) |
| fast mode | 없음 | 없음 | 있음 | 있음 |

가격은 Claude API 정가다. Claude Code의 기본값은 API와 다를 수 있고 `/effort status`로 확인한다.

### 3.4 trade-off 1: 성능과 완료 과제당 비용

- 큰 모델일수록 토큰 단가가 높고 성능이 높지만, 과제 단위에서는 이 관계가 항상 성립하지 않는다. 토큰 단가가 높다고 과제당 비용이 높거나 결과가 좋은 것은 아니다.
- Terminal-Bench 3.0(Anthropic 자체 실행): 이전 Fable 5.1 `max`가 58.0%, Opus 5.5 `high`가 58.9%를 기록했다. Opus 5.5는 절반의 토큰을 썼다 ("Spending your effort" 글 인용).
- FrontierCode 2.0: Fable 5.2 `high`가 45.3%, Opus 5.5 `max`가 45.5%로 거의 같았고, Fable 5.2가 과제당 비용이 약 절반이었다. 따라서 어려운 과제에서 Opus 5.5를 `high` 위로 올리기 전에 Fable 5.2를 시험하라고 권한다. 일상 작업의 시작점은 여전히 Opus 5.5 `medium`이다.
- 플랫폼의 비용과 지능 측정 문서는 소형 모델의 한계도 보여준다. 소형 모델은 출력을 검사할 수 있는 대량 작업에 강하고 긴 에이전트 루프에는 덜 적합하다.
- 두 모델을 비교할 때는 전형적인 과제와 함께 가장 어려운 과제의 비용도 따져야 한다. 어려운 과제가 지출의 대부분을 차지하기 때문이다. 20문제 검색 벤치마크 하나에서 2문제가 지출의 43%를 차지했다.

### 3.5 trade-off 2: 지연과 정확도

- 빠른 설정은 일찍 끝나지만 더 많이 놓친다. 사람이 얼마나 기다릴 수 있는지 먼저 정하고 모델과 effort level을 고른다. 사람이 기다리는 응답에는 Sonnet 5.5 `low` 또는 `medium`으로 시작한다.
- 새 세대 모델은 이전 세대보다 빠른 경우가 많다. Fable 5.2는 Fable 5.1보다 출력 생성이 최대 30% 빠르고, Sonnet 5.5는 Sonnet 5보다 30% 빠르다.
- effort level과 지연은 대략 비례한다. SWE-bench Pro에서 Opus 5.5의 effort level별 결과(`high` 기준 비교)는 다음과 같다.

| effort level | 점수 차 (`high` 대비) | 비용 (`high` 대비) |
|---|---|---|
| `low` | 약 8점 낮음 | 약 1/3 |
| `medium` | 약 2.5점 낮음 | 약 70% |
| `high` | 기준 | 기준 |
| `xhigh` | 약 1.4점 높음 | 2.5배 |

- 자체 검증 수단을 주는 것이 effort level을 바꾸는 것보다 비용 효율이 높고 지연도 적게 늘어나는 경우가 많다. 모델이 과제에 부족할 때의 조치 순서는 다음과 같다.
  1. 모델이 테스트, 빌드, 엔드포인트 호출 스크립트로 자기 작업을 검증할 수 있는지 확인한다.
  2. effort level을 한 단계 올린다.
  3. 다음 모델로 올리되, 작은 모델에서 쓰던 것보다 낮은 effort level에서 시작한다.
- 결과를 자동 검사할 수 있으면 전체를 낮은 effort level로 실행하고 실패한 것만 높은 effort level로 재실행한다. 같은 SWE-bench Pro 부분집합에서 Opus 5.5 `low` 후 실패분만 `high` 재실행은 과제당 약 $0.17에 약 97%를 통과했다. 전부 `high`로 실행하면 과제당 $0.29에 95.3%였다.
- 같은 모델에서 더 빠른 응답이 필요하면 성능을 포기하는 대신 속도에 비용을 낼 수 있다. Claude API에서 Opus 5.5와 Fable 5.2는 fast mode를 제공하며, 출력 속도가 높은 대신 프리미엄 가격이 붙는다.

### 3.6 trade-off 3: 컨텍스트와 비용

- 현 세대 모든 모델의 context window는 100만 토큰이다. 큰 컨텍스트는 과제 완료를 돕지만 매 턴 다시 전송되므로 매 턴 비용이 든다. 다만 긴 실행에서는 입력 대부분이 cache read로 과금된다.
- cache read 단가는 Opus 5.5 $0.20, Sonnet 5.5 $0.10, Fable 5.2 $0.20이다. 따라서 캐시 비중이 큰 긴 실행에서 Fable과 Opus의 차이는 캐시되지 않은 입력과 출력에서만 생기고, 그 부분에서 Fable은 토큰당 두 배다.
- "What a task costs on Opus 5.5" 글 기준으로 컨텍스트 15만 토큰에서 한 턴의 cache read는 약 $0.03, 2만 토큰에서는 약 $0.004다.
- 메인 모델이 클수록 메인 컨텍스트를 작게 유지하는 것이 중요하다. 비싼 모델의 컨텍스트는 판단에 쓰고, 장황한 읽기는 저렴한 서브에이전트에 맡긴다.
- Haiku 5.5는 프롬프트 길이에 따라 토큰 단가가 달라지는 유일한 모델이다. 10만 토큰 이하는 낮은 등급, 초과하면 다섯 배 단가다. 긴 프롬프트 등급도 Sonnet 5.5 토큰 단가의 4분의 1이다. 짧은 프롬프트에서는 Sonnet 5.5 입력 단가의 20분의 1이므로 효과가 가장 크다. 매 호출에 긴 프롬프트가 필요하면 정가가 아니라 완료 과제당 비용으로 Haiku 5.5와 Sonnet 5.5를 비교한다.

### 3.7 모델 혼용 1: 자연스러운 경계에서 전환

- 프롬프트 캐시는 그것을 쓴 모델에 속한다. 새 모델의 첫 턴은 대화 전체에 cache write 비용을 낸다. 이 턴을 줄이려면 Claude Code에서 `/compact`를 먼저 실행하거나 짧은 계획서로 새 세션을 시작한다. API에서는 전체 이력 대신 지금까지 작업의 요약으로 새 모델 대화를 연다.
- thinking block은 생성한 모델을 기록하며, 각 모델은 일부 다른 모델의 block만 읽는다. Claude API와 Claude Models on Google Cloud(Google managed) 기준은 다음과 같다.

| 읽는 모델 | 읽을 수 있는 thinking block |
|---|---|
| Opus 5.5 | Sonnet 5.5, Haiku 5.5 |
| Sonnet 5.5 | Haiku 5.5 |
| Fable 5.2 | Opus 5.5, Sonnet 5.5, Haiku 5.5 |
| Fable 5.1 (Claude API) | Opus 5.5 |

- 모델은 자기보다 위 등급 모델의 block을 읽지 않으므로 아래 등급으로 내려가면 이전 추론이 사라진다. 다른 방향의 전환에서도 사라질 수 있다. 새 모델이 읽을 수 없는 thinking block은 API가 버리고 요청은 성공하며, 새 모델은 그 추론 없이 작업한다. Fable 5.2에서 다른 GA 모델로 옮기면 Fable 5.2의 추론은 모두 사라진다. 전체 경우는 Preserved thinking 문서에 있다.

### 3.8 모델 혼용 2: 서브에이전트를 작은 모델에

- 서브에이전트는 자기 context window에서 실행되고 요약을 돌려준다. 토큰 비용은 서브에이전트가 실행되는 모델 단가로 낸다.
- Claude Code에서는 서브에이전트 정의에 `model: haiku` 또는 `model: sonnet`을 지정한다. `CLAUDE_CODE_SUBAGENT_MODEL` 환경 변수는 모델을 지정하지 않은 서브에이전트의 기본값을 정한다.
- 원문 예시 `.claude/agents/log-reader.md`: 테스트 출력과 로그를 읽어 실패 사례마다 파일, 테스트 이름, 첫 오류 줄을 보고하는 서브에이전트. tools는 Read, Grep, Glob, Bash이고 `model: haiku`이며, 파일을 수정하지 말라고 지시한다.
- 작은 모델은 실수를 쉽게 알아챌 수 있는 작업(파일 찾기, 테스트 실행, 로그 읽기)에 둔다. 코드 편집과 판단은 메인 모델에 둔다. 작은 모델이 검색 결과를 잘못 읽으면 메인 모델이 엉뚱한 파일을 열고 토큰을 쓴다.
- 현재 Claude Code의 내장 Explore 서브에이전트는 항상 Haiku가 아니라 세션 모델로 실행된다. Claude API에서는 Opus가 상한이다. 탐색 비용을 낮추려면 `Explore`라는 이름의 서브에이전트를 `model: haiku`로 직접 정의한다. `haiku` 별칭이 가리키는 모델은 `ANTHROPIC_DEFAULT_HAIKU_MODEL`로 고정할 수 있다.
- Anthropic API에서 `haiku` 별칭은 이제 Haiku 5.5를 가리키며 Claude Code v2.1.293 이상이 필요하다. Amazon Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS에서는 여전히 Haiku 4.5를 가리킨다.
- Claude Code의 `opusplan` 별칭은 plan mode에서 Opus로 계획하고 Sonnet으로 실행한다. 즉 코드 편집이 Sonnet에 간다. 글의 권고(편집은 메인 모델, 작은 모델에는 실수를 쉽게 알아챌 수 있는 작업만)와 반대 방향이므로, 기본값으로 삼기 전에 자기 과제에서 측정하라고 권한다.

### 3.9 모델 혼용 3: advisor tool로 어려운 판단 위임

- advisor tool(beta)은 빠르고 저렴한 executor 모델과 강한 advisor 모델을 짝짓는다. executor가 과제를 실행하다가 중간에 advisor에게 조언을 구할 수 있다. 토큰 대부분은 executor 단가로 과금된다.
- advisor는 executor에 없는 능력을 더하고 executor가 실제로 조언을 요청할 때만 도움이 된다. executor는 낮은 effort level에서 조언을 덜 요청한다.
- 효과가 있을 만한 곳은 대부분의 턴이 일상적인 에이전트 작업이다. 다만 플랫폼 비용 가이드의 advisor 표에 있는 네 조합 중 어느 것도 executor 단독을 명확히 앞서지 못했다. 먼저 executor의 조언 요청률을 측정하라고 권한다.
- executor별 허용 advisor가 다르다. Sonnet 5.5 executor는 Fable 5.2, Opus 5.5, Opus 5, Sonnet 5.5를 허용하고, Fable 5.2 executor는 Fable 5.2와 Mythos 5.2만 허용한다.
- 효과가 작은 예: 내부 코딩 벤치마크에서 Opus 5.5 `high` executor와 Fable 5.1 advisor 조합은 시도당 $2.92에 90.1%였다. Opus 5.5 `high` 단독보다 1.7점 높지만 비용은 약 2.1배다. 이 정도 차이는 실행 간 노이즈 수준이고, effort level을 올렸을 때 얻을 수 있는 정도다.

### 3.10 모델 혼용 4: 대량 작업을 저렴한 worker에 위임

- 서브에이전트 패턴이 한 메인 모델이 흐름을 유지하며 부수 작업을 맡기는 방식이라면, 이 패턴은 context window 하나를 넘는 작업용이다. 상위 모델이 lead가 되어 과제를 나누고, 조각을 많은 저렴한 worker에 병렬로 맡기고, 결과를 병합한다.
- 약 2,200만 토큰 규모 소스 코드에 대한 내부 결함 탐색 벤치마크에서 Opus 5.5 lead와 Sonnet 5.5 worker(동시 최대 25개) 조합은 기본 effort level의 Opus 5.5 단독보다 비용이 약 3분의 1 적었고 점수는 비슷했다.
- Claude Platform에서는 Claude Managed Agents의 multiagent orchestration이 coordinator agent와 worker 목록을 제공한다. 의존 관계가 이어지는 단일 단계 사슬이나 context window 하나에 들어가는 작업에는 쓰지 않는다. 그런 경우 계획과 병합 비용이 절감액보다 크다.

### 3.11 마이그레이션 전 호환성 점검

모든 현행 모델은 tool use와 이미지 입력을 지원하지만, 모델 이름만 바꿔서는 안 되는 차이가 있다.

| 항목 | 내용 |
|---|---|
| Fable 5.2 preserved thinking | 모든 API 계정에 적용된다. Fable 5.2 thinking block 앞의 내용(시스템 프롬프트, 도구, 이전 메시지)이 바뀌면 영향받은 thinking을 버리는 옵션을 켜지 않는 한 400 오류로 거부된다. Claude Code, Claude Agent SDK, Claude Managed Agents를 쓰면 변경이 필요 없다. 직접 이력을 편집하는 코드는 append-only로 유지한다 |
| thinking | Opus 5.5와 Fable 5.2는 항상 thinking하며 끄는 요청은 오류다. Sonnet 5.5는 기본 thinking이고 `between_tools`로 tool call 사이로 제한할 수 있다. Haiku 5.5는 기본 thinking이고 `high` 이하에서 끌 수 있다. 응답이 thinking block으로 시작할 수 있으므로 content block을 `type`으로 읽는다 |
| 강제 tool use | `tool_choice`가 `any` 또는 `tool`이면 Sonnet 5.5, Opus 5.5, Fable 5.2에서 400 오류다. `auto`를 보내고 도구에 `strict: true`를 지정하고 언제 쓸지 프롬프트에 적는다 |
| computer use | 네 모델 모두 Claude API와 Claude Models on Google Cloud(Google managed)에서 `computer_toolset_20260801` toolset으로만 지원한다 |
| Haiku 4.5에서 Haiku 5.5로 | `budget_tokens`를 effort level로 바꾸고, 기본값이 아닌 `temperature`, `top_p`, `top_k`를 제거한다(400 오류). `messages`는 user 턴으로 끝내야 한다. 이어 쓰기용 마지막 assistant 턴도 400 오류다 |
| 안전 fallback | Opus 5.5, Sonnet 5.5, Fable 5.2는 사이버보안과 생물학 콘텐츠를 주로 걸러내는 안전 분류기를 실행한다. Claude Code에서 걸린 요청은 이전 모델로 재실행될 수 있고 transcript에 고지된다. Fable 5.2는 Fable 5.1의 fallback을 유지한다. 사이버보안은 Opus 4.8, 생물학은 Opus 5로 fallback한다 |

한 시스템이 여러 모델을 쓰면 모든 요청을 가장 엄격한 모델 기준으로 만든다. 이력은 append-only, `tool_choice: auto`와 strict 도구, content block은 `type`으로 읽기, 프롬프트와 도구 설명은 가장 문자 그대로 읽는 모델에 맞춰 정밀하게 쓴다. 그러면 코드 변경 없이 단계별로 모델을 올리거나 내릴 수 있다. 단계 유형마다 모델 하나처럼 라우팅 규칙이 단순하면 모델에게 고르게 하지 말고 코드가 고르게 한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

| 출처 | 비교 | 결과 |
|---|---|---|
| Terminal-Bench 3.0 | Fable 5.1 `max` 대 Opus 5.5 `high` | 58.0% 대 58.9%, Opus 5.5는 절반의 토큰 |
| FrontierCode 2.0 | Fable 5.2 `high` 대 Opus 5.5 `max` | 45.3% 대 45.5%, Fable 5.2가 과제당 비용 약 절반 |
| 20문제 검색 벤치마크 | 문제별 지출 분포 | 2문제가 지출의 43% |
| SWE-bench Pro | Opus 5.5 effort level별 | `low` 약 8점 하락에 비용 약 1/3, `medium` 약 2.5점 하락에 약 70%, `xhigh` 약 1.4점 상승에 2.5배 (`high` 대비) |
| SWE-bench Pro 부분집합 | `low` 후 실패분 `high` 재실행 대 전부 `high` | 약 97%에 과제당 약 $0.17 대 95.3%에 $0.29 |
| 내부 코딩 벤치마크 | Opus 5.5 `high` executor + Fable 5.1 advisor | 90.1%, 시도당 $2.92. 단독 대비 1.7점 상승에 약 2.1배 비용 |
| 내부 결함 탐색 벤치마크 (약 2,200만 토큰) | Opus 5.5 lead + Sonnet 5.5 worker(최대 25) 대 Opus 5.5 단독 | 비용 약 1/3 절감, 점수 비슷 |
| 속도 | 세대 간 | Fable 5.2는 Fable 5.1보다 최대 30% 빠름, Sonnet 5.5는 Sonnet 5보다 30% 빠름 |
| cache read 비용 | Opus 5.5 턴당 | 15만 토큰 약 $0.03, 2만 토큰 약 $0.004 |

### 4.1 자체 측정 절차

1. 실제 과제 표본을 뽑고 각각에 결과 검사(통과 테스트, 종료된 티켓, 정확한 행 수 등)를 만든다.
2. 후보 모델마다 effort level 두세 개로 실행한다. 캐시를 공유하지 않도록 실행마다 별도 세션을 쓴다. 각 응답의 `usage` 필드에서 완료 과제당 비용을 기록한다.
3. 점수 대 지출을 그린다. 다중 모델 구성은 그 차트에서 모든 단일 모델 점을 이길 때만 유지한다.
4. 승자를 실제 트래픽 일부에 shadow로 실행한 뒤 전환한다.

Claude Code에서 빠르게 확인하려면 백로그 과제 하나를 `/model`로 두 모델에서 실행하고 `/usage` 보고를 비교한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 벤치마크 대부분이 Anthropic 자체 실행 또는 내부 벤치마크이며, 과제 수와 실행 반복 횟수 같은 세부가 본문에 없다. 글도 공개 결과는 출발점일 뿐이라고 말한다.
- 가격과 기본값, 별칭이 가리키는 모델은 플랫폼(Anthropic API, Bedrock, Google Cloud, Foundry)과 Claude Code 버전에 따라 다르며 시점에 묶인 정보다.
- advisor tool은 beta이며, 플랫폼 가이드의 네 조합 중 executor 단독을 명확히 앞선 것이 없다.
- `opusplan`과 글의 권고가 상충한다는 점을 글 스스로 지적하고 측정을 권한다.
- 원문의 FIG A~E는 영상이라 수집본에는 정지 화면만 남았다.

## 6. 관련 연구 (Related Work)

- 원문이 인용한 관련 글: Spending your effort, What a task costs on Opus 5.5, Building with Claude Sonnet 5.5, Getting the most out of Opus 5.5, Safely scaling multi-agent teams with Fable 5.2, Claude Opus 5.5 built for coding sessions that use more context. 이 저장소에는 수집되어 있지 않다.
- 원문이 인용한 문서: Choosing a model, Optimizing for cost and intelligence, Effort, fast mode, Preserved thinking, advisor tool, multiagent orchestration, Claude Code model configuration과 subagents.
- 저장소 내 관련 자료: [[llms/9bow-2026-gpt-5-6-sol-terra-luna]](다른 공급자의 세 티어 라인업), [[agents/lee-hoyeon-2026-harness-engineering]](Opus와 Sonnet 성능별 분업), [[agents/anthropic-2025-effective-context-engineering-for-ai]](작은 컨텍스트 유지 원칙), [[agents/cemri-2025-why-do-multi-agent-llm-systems]](멀티에이전트 실패 모드).

## 7. 용어집 (Glossary)

| 용어 | 설명 |
|---|---|
| effort level | 모델이 한 요청에 쓰는 사고량과 tool call, 자기 검토의 정도를 정하는 설정. `low`, `medium`, `high`, `xhigh`, `max` 단계가 있다 |
| 완료 과제당 비용(cost per finished task) | 토큰 단가가 아니라 과제 하나를 끝내는 데 든 총비용. 글이 모델 비교 기준으로 제시한다 |
| adaptive thinking | 모델이 과제에 따라 thinking 양을 스스로 정하는 방식 |
| `between_tools` | Sonnet 5.5에서 사전 thinking을 생략하고 tool call 사이에만 thinking하게 하는 설정 |
| fast mode | Opus 5.5와 Fable 5.2에서 프리미엄 가격으로 출력 속도를 높이는 옵션 |
| preserved thinking | 이전 thinking block을 이후 턴에 보존하는 방식. Fable 5.2는 앞선 내용이 바뀌면 요청을 거부한다 |
| advisor tool | 저렴한 executor 모델이 실행 중 강한 advisor 모델에 조언을 요청하는 beta 도구 |
| `opusplan` | Claude Code에서 Opus로 계획하고 Sonnet으로 실행하는 모델 별칭 |
| 안전 fallback | 안전 분류기에 걸린 요청을 이전 모델로 재실행하는 Claude Code 동작 |

## 8. 그림 후보 (Figure Candidates)

| id | caption | strategy | 추천 |
|---|---|---|---|
| fig01 | 블로그 원문 상단 전체 페이지 스크린샷 | screenshot | (불필요) |
| fig02 | FIG A, 골목 사진을 네 모델이 코드로 재현 | crop | (선택, 쿠키 배너가 가림) |
| fig03 | FIG B, 같은 포트폴리오 사이트 네 모델 비교 | crop | (선택) |
| fig04 | FIG C, Fable 5.2의 3D 렌더링 기법 데모 | crop | (불필요) |
| fig05 | FIG D, 한 프로젝트에서 네 모델 역할 분담 | crop | ★ wiki 권장 (모델 혼용) |
| fig06 | FIG E, Opus 5.5 계획과 Haiku 5.5 병렬 서브에이전트 | crop | ★ wiki 권장 (서브에이전트) |
