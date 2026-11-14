---
title: "Which Claude model should you build with? Fable, Opus, Sonnet, or Haiku"
type: article
year: 2026
category: llms
source: anthropic-2026-which-claude-model-should-you.md
raw_path: raw/articles/anthropic-2026-which-claude-model-should-you.md
raw_filename: "anthropic-2026-which-claude-model-should-you.md"
source_collection: external
author: "Anthropic"
url: "https://claude.dev/blog/which-claude-model-should-you-build-with/"
publisher: "claude.dev"
tags: [claude, model-selection, effort-level, cost-per-task, prompt-caching, sub-agent, advisor-tool, model-routing, anthropic]
figures:
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

## 요약

이 글은 Anthropic이 2026년 11월 9일 claude.dev 블로그에 게시한 Claude 모델 선택 가이드다. Claude Platform으로 서비스를 만들거나 Claude Code로 작업하는 사용자가 네 GA 모델(Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.2) 중 무엇을 써야 하는지, 그리고 그 판단에 어떤 trade-off가 걸려 있는지를 다룬다.

글의 기본 권고는 대부분의 작업을 Opus 5.5의 기본 effort level인 `medium`에서 시작하라는 것이다. effort level은 모델이 한 요청에서 얼마나 오래 생각하고, tool call을 얼마나 많이 하고, 자기 작업을 얼마나 검토할지를 정하는 설정이다. 거기서 범위가 정해진 작업은 Sonnet 5.5로, 단순 대량 작업은 Haiku 5.5로 내리고, 가장 어려운 기술 프로젝트는 Fable 5.2로 올린다.

글 전체를 관통하는 기준은 토큰 단가가 아니라 **완료 과제당 비용**이다. 단가가 비싼 모델이 더 적은 토큰으로 끝내 과제당 비용이 더 낮은 경우가 있고, 반대로 effort level을 한 단계 올리는 비용이 모델을 바꾸는 비용과 비슷해지는 지점도 있다. 따라서 글은 공개 벤치마크로 시작 모델을 정한 뒤 자기 과제로 직접 측정해 결정하라고 결론짓는다.

## 배경

### 2026년 11월의 Claude 라인업

글이 다루는 시점의 일반 제공 모델은 네 개다. 이와 별도로 Claude Mythos 5.2가 사이버보안과 생명과학 연구용 최상위 모델로 존재하지만, 검증 프로그램을 거친 사용자에게만 제공되므로 이 글의 선택지에서는 빠진다.

| 모델 | 글이 정의한 용도 |
|---|---|
| Haiku 5.5 | 대량, 비용 민감 작업 |
| Sonnet 5.5 | 범위가 정해진 작업을 빠르고 유능하게 지원 |
| Opus 5.5 | 복잡한 코딩과 지식 작업의 일상 모델 |
| Fable 5.2 | 가장 야심 찬 개방형 기술 작업 |

### 모델 선택이 단순하지 않은 이유

모델 선택은 "어려운 일에는 큰 모델"이라는 직관만으로 정해지지 않는다. 같은 모델 안에서도 effort level에 따라 비용과 성능이 크게 달라지고, 모델마다 cache read 단가, thinking 방식, API 제약이 다르다. 또한 한 작업 안에서도 계획, 탐색, 편집, 검증 단계마다 적합한 모델이 다를 수 있다.

글은 이 복잡성을 세 층으로 정리한다. 첫째는 과제별 시작점(추천표), 둘째는 판단 기준(세 가지 trade-off), 셋째는 여러 모델을 한 시스템에서 섞는 방법(혼용 패턴과 호환성)이다.

## 핵심 개념

effort level은 비용과 성능을 함께 조절하는 다이얼이다. 단계는 `low`, `medium`, `high`, `xhigh`, `max`가 있다. 높일수록 모델이 더 오래 생각하고 더 많이 검토하지만 지연과 비용이 늘어난다. effort level은 모델에 없는 지식이나 기술을 만들어 주지는 않으므로, 능력 자체가 부족하면 모델을 올려야 한다.

완료 과제당 비용(cost per finished task)은 과제 하나를 끝내는 데 든 총비용을 말한다. 토큰 단가에 사용한 토큰 수를 곱한 값이므로, 단가가 두 배인 모델도 토큰을 절반만 쓰면 비용이 같아진다. 글의 모든 비교는 이 값을 기준으로 한다.

adaptive thinking은 모델이 과제 난이도에 따라 thinking 양을 스스로 정하는 방식이다. 네 모델 모두 API에서 adaptive thinking을 쓰지만, 끌 수 있는지 여부는 모델마다 다르다.

cache read는 이전 턴에서 캐시에 저장된 프롬프트를 다시 읽을 때의 과금 항목이다. 긴 대화에서는 매 턴 전체 컨텍스트가 재전송되지만 대부분이 cache read 단가로 과금되므로, 이 단가가 긴 실행의 비용을 좌우한다.

서브에이전트는 메인 에이전트가 부수 작업을 맡기는 별도 에이전트로, 자기 context window에서 실행되고 결과 요약만 돌려준다. context window는 모델이 한 번에 입력으로 받을 수 있는 토큰의 최대 길이다.

## 방법

### 기본 권고와 이동 방향

글은 Opus 5.5 `medium`을 출발점으로 두고 위아래로 이동하는 구조로 권고를 제시한다. Opus 5.5는 Claude Code의 기본 모델이고, 입력과 출력 토큰 단가가 Fable 5.2의 절반이며, 대부분의 코딩과 지식 작업에 권장된다.

| 이동 | 대상 모델 | 조건 |
|---|---|---|
| 아래로 한 단계 | Sonnet 5.5 | 범위가 잘 정해진 일상 작업 (버그 수정, 명세 기반 기능 구현) |
| 아래로 두 단계 | Haiku 5.5 | 분류, 라우팅, 추출 같은 가장 단순한 대량 작업, 큰 모델의 부수 작업을 맡는 서브에이전트 |
| 위로 한 단계 | Fable 5.2 | 코딩, 금융, 과학의 가장 어려운 기술 프로젝트, Opus 5.5 `high`로도 부족할 때, 장시간 무인 실행 |

명세가 명확하다는 사실만으로 Sonnet 5.5를 고르지는 않는다. 마이그레이션이나 성능 최적화는 명세가 분명해도 난도가 높아 Opus 5.5가 필요할 수 있고, 대규모라면 Fable 5.2가 필요하다.

### 모델보다 effort level을 먼저 조정

글은 모델을 옮기기 전에 effort level부터 조정하라고 권한다. effort level이 모델 교체보다 세밀한 조절 수단이기 때문이다. 한 단계 낮추면 같은 결과를 더 싸게 얻을 수도 있다.

다만 `high`를 넘어서면 사정이 달라진다. 그 위로 한 단계 올리는 비용이 더 큰 모델로 바꾸는 비용과 비슷해질 수 있다. 따라서 `high`를 넘겨야 할 상황이면 다음 모델을 더 낮은 effort level에서 시험해 두 선택지를 비교한다.

### 과제별 시작 모델

글은 과제 11종에 대해 시작 모델과 시작 effort level, 그 이유를 표로 제시한다. 이 표는 출발점이며, 결과가 부족하면 effort level을 먼저 올리고 그다음 모델을 올린다.

| 과제 | 시작 모델 | 시작 effort level | 이유 |
|---|---|---|---|
| 일상 엔지니어링과 디버깅, 여러 PR에 걸친 기능 작업 | Opus 5.5 | `medium`(기본), 이후 `high` | 일상 작업에서 비용과 성능의 균형 |
| 분류, 라우팅, 태깅, 대량 추출 | Haiku 5.5 | `medium`(기본) | 모델군 중 비용과 지연이 가장 낮음 |
| 파일 검색, 로그 읽기, 요약을 하는 서브에이전트 | Haiku 5.5 또는 Sonnet 5.5 | 모델 기본값 | 틀린 답을 쉽게 알아챌 수 있고 판단은 메인 모델이 맡음 |
| 채팅과 대화형 세션 | Sonnet 5.5 (단순 대량 채팅은 Haiku 5.5) | `low` 또는 `medium` | Sonnet 5.5는 `low`, `medium`에서 특히 빠름 |
| 범위가 정해진 코딩 (버그 수정, 기능 반복, 명세 기반 작업) | Sonnet 5.5 | `medium`, 어려우면 `high` | Opus 5.5의 절반 토큰 단가로 범위가 정해진 작업을 잘 처리 |
| 일상 문서, 슬라이드, 스프레드시트 | Sonnet 5.5 | `high`(기본, Claude Code에서는 `medium`) | 빠른 반복과 디자인 감각 |
| 반복 실행하는 에이전트 과제 (조사, 리뷰, 초안 작성) | Sonnet 5.5 | `medium` | 잘 정의된 반복 과제에는 큰 모델이 거의 필요 없음 |
| computer use와 시각 중심 워크플로 | Opus 5.5 | `medium` | 많은 스크린샷과 이미지에 걸친 긴 에이전트 루프 |
| 대규모 리팩터링과 마이그레이션, 아키텍처 설계, 다수 서브에이전트 지휘 | Fable 5.2 | `medium`, 이후 `high` (API 기본값은 `high`) | 기술 분야에서 가장 강력한 GA 모델 |
| 심층 조사, 과학 및 정량 분석 | Fable 5.2 | `medium`, 이후 `high` (API 기본값은 `high`) | 코딩, 금융, 과학의 가장 어려운 프로젝트용 |
| 아직 모를 때 | Opus 5.5 | `medium`(기본) | Claude Code 기본 모델이며 플랫폼 문서도 시작점으로 권장 |

문서 작업 행에는 예외가 하나 붙어 있다. 복잡한 재무 모델이나 많은 원자료를 바탕으로 만드는 문서는 Sonnet 5.5가 아니라 Opus 5.5로 시작한다. 또한 "아직 모를 때" 행의 근거는 Opus 5.5가 Pro, Max, Ultra, Team, Enterprise 요금제와 Anthropic API에서 Claude Code 기본 모델이라는 점이다.

### 네 모델의 사양 비교

네 모델은 context window와 최대 출력 길이가 같고, 단가와 thinking 방식, 기본 effort level, fast mode 지원 여부가 다르다. 가격은 Claude API 정가 기준이다.

| 항목 | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | Fable 5.2 |
|---|---|---|---|---|
| 상대 지연 | 가장 빠름 | 빠름 | 보통 | 보통 |
| 입력/출력 단가 (100만 토큰당) | 10만 토큰 이하 $0.10/$0.50, 초과 $0.50/$2.50 | $2/$10 | $4/$20 | $8/$40 |
| cache read 단가 (100만 토큰당) | 10만 이하 $0.01, 초과 $0.05 | $0.10 | $0.20 | $0.20 |
| context window | 100만 토큰 | 100만 토큰 | 100만 토큰 | 100만 토큰 |
| 최대 출력 | 12만 8,000 토큰 | 12만 8,000 토큰 | 12만 8,000 토큰 | 12만 8,000 토큰 |
| API의 thinking | adaptive, 기본 켜짐, 끌 수 있음 | adaptive, 기본 켜짐, `between_tools`로 사전 thinking 생략 | adaptive, 항상 켜짐 | adaptive, 항상 켜짐 |
| API 기본 effort level | `medium` | `high` (Claude Code는 `medium`) | `medium` | `high` (Claude Code는 `medium`) |
| fast mode | 없음 | 없음 | 있음 | 있음 |

단가는 한 단계 위로 갈 때마다 대략 두 배가 된다. Sonnet 5.5에서 Opus 5.5로, Opus 5.5에서 Fable 5.2로 각각 입력과 출력 단가가 두 배다. 반면 cache read 단가는 Opus 5.5와 Fable 5.2가 $0.20으로 같아, 캐시 비중이 큰 실행에서는 두 모델의 비용 차이가 줄어든다. Claude Code의 실제 기본값은 `/effort status`로 확인한다.

### 세 가지 trade-off

글은 모델 선택을 세 가지 trade-off로 나누어 설명한다. 큰 모델을 고르는 것은 예를 들어 지연을 감수하고 성능을 택하는 결정이다.

#### 성능과 완료 과제당 비용

일반적으로 큰 모델이 토큰 단가도 높고 성능도 높다. 그러나 과제 단위에서는 이 관계가 항상 성립하지 않는다. 토큰 단가가 높다고 해서 과제당 비용이 높거나 결과가 좋은 것은 아니다.

| 벤치마크 | 비교 | 결과 | 해석 |
|---|---|---|---|
| Terminal-Bench 3.0 (Anthropic 자체 실행) | Fable 5.1 `max` 대 Opus 5.5 `high` | 58.0% 대 58.9% | Opus 5.5가 절반의 토큰으로 더 높은 점수 |
| FrontierCode 2.0 | Fable 5.2 `high` 대 Opus 5.5 `max` | 45.3% 대 45.5% | 점수는 거의 같고 Fable 5.2의 과제당 비용이 약 절반 |

두 결과는 서로 다른 방향을 가리킨다. Terminal-Bench 3.0에서는 낮은 등급 모델이 이전 세대 상위 모델을 적은 토큰으로 앞섰다. FrontierCode 2.0에서는 상위 모델을 적당한 effort level로 쓰는 쪽이 하위 모델을 최대 effort level로 쓰는 것보다 쌌다. 따라서 어려운 과제에서 Opus 5.5를 `high` 위로 올리기 전에 Fable 5.2를 시험하라고 권한다. 일상 작업의 시작점은 여전히 Opus 5.5 `medium`이다.

소형 모델에는 분명한 한계가 있다. 플랫폼의 비용과 지능 측정 문서에 따르면 소형 모델은 출력을 검사할 수 있는 대량 작업에 강하지만 긴 에이전트 루프에는 덜 적합하다.

모델을 비교할 때는 전형적인 과제뿐 아니라 가장 어려운 과제의 비용도 따로 따져야 한다. 어려운 과제가 지출의 대부분을 차지하기 때문이다. 20문제로 된 한 검색 벤치마크에서는 2문제가 전체 지출의 43%를 차지했다. 즉 평균 과제만 보고 모델을 고르면 실제 지출을 크게 잘못 예측할 수 있다.

#### 지연과 정확도

빠른 설정은 일찍 끝나지만 더 많이 놓친다. 따라서 모델과 effort level을 고르기 전에 사람이 응답을 얼마나 기다릴 수 있는지부터 정한다. 사람이 기다리는 응답에는 Sonnet 5.5 `low` 또는 `medium`으로 시작한다.

새 세대 모델은 이전 세대보다 빠른 경우가 많다. Fable 5.2는 Fable 5.1보다 출력 생성이 최대 30% 빠르고, Sonnet 5.5는 Sonnet 5보다 30% 빠르다.

effort level과 지연은 대략 비례한다. 글은 SWE-bench Pro에서 Opus 5.5의 effort level별 점수와 비용을 `high` 기준으로 제시한다.

| effort level | 점수 (`high` 대비) | 비용 (`high` 대비) |
|---|---|---|
| `low` | 약 8점 낮음 | 약 3분의 1 |
| `medium` | 약 2.5점 낮음 | 약 70% |
| `high` | 기준 | 기준 |
| `xhigh` | 약 1.4점 높음 | 2.5배 |

이 표는 effort level의 수익이 체감한다는 점을 보여준다. `medium`에서 `high`로 가면 비용 약 43%를 더 내고 2.5점을 얻지만, `high`에서 `xhigh`로 가면 비용이 2.5배가 되는데 얻는 점수는 1.4점이다. 앞에서 `high`를 넘기기 전에 다음 모델을 시험하라고 한 권고가 이 수치에 근거한다.

#### 검증 수단과 실패분 재실행

글은 effort level을 바꾸기보다 자체 검증 수단을 주는 편이 비용 효율이 높고 지연도 적게 늘어나는 경우가 많다고 말한다. 모델이 과제에 부족할 때의 조치 순서는 다음과 같다.

1. 모델이 테스트, 빌드, 엔드포인트를 호출하는 스크립트로 자기 작업을 검증할 수 있는지 확인한다.
2. effort level을 한 단계 올린다.
3. 다음 모델로 올리되, 작은 모델에서 쓰던 것보다 낮은 effort level에서 시작한다.

결과를 자동으로 검사할 수 있으면 더 나아가 두 단계 실행 전략을 쓸 수 있다. 전체 과제를 낮은 effort level로 실행하고 실패한 것만 높은 effort level로 재실행한다.

| 전략 (SWE-bench Pro 부분집합, Opus 5.5) | 통과율 | 과제당 비용 |
|---|---|---|
| 전부 `low`, 실패분만 `high` 재실행 | 약 97% | 약 $0.17 |
| 전부 `high` | 95.3% | $0.29 |

재실행 전략이 통과율은 더 높고 비용은 약 40% 낮다. 자동 검사가 있으면 쉬운 과제에 높은 effort level을 낭비하지 않아도 되기 때문이다.

같은 모델에서 더 빠른 응답이 필요하면 성능을 포기하지 않고 속도에 비용을 낼 수도 있다. Claude API에서 Opus 5.5와 Fable 5.2는 fast mode를 제공하며, 프리미엄 가격으로 출력 속도를 높인다.

#### 컨텍스트와 비용

현 세대 모든 모델의 context window는 100만 토큰이다. 큰 컨텍스트는 과제 완료를 돕지만 매 턴 다시 전송되므로 턴마다 비용이 든다. 다만 긴 실행에서는 입력 대부분이 cache read로 과금된다.

cache read 단가는 Opus 5.5 $0.20, Sonnet 5.5 $0.10, Fable 5.2 $0.20이다. 따라서 캐시 비중이 큰 긴 실행에서 Fable 5.2와 Opus 5.5의 차이는 캐시되지 않은 입력과 출력에서만 생기고, 그 부분에서 Fable 5.2는 토큰당 두 배다.

Opus 5.5에서 한 턴의 cache read 비용은 컨텍스트 크기에 비례한다. 컨텍스트 15만 토큰이면 약 $0.03, 2만 토큰이면 약 $0.004다. 한 턴의 차이는 작아 보이지만 수백 턴이 이어지는 실행에서는 누적된다.

이 계산에서 나오는 원칙은 메인 모델이 클수록 메인 컨텍스트를 작게 유지해야 한다는 것이다. 비싼 모델의 컨텍스트는 판단에 쓰고, 장황한 읽기는 저렴한 서브에이전트에 맡긴다.

Haiku 5.5는 프롬프트 길이에 따라 단가가 달라지는 유일한 모델이다.

| 프롬프트 길이 | Haiku 5.5 단가 | Sonnet 5.5와 비교 |
|---|---|---|
| 10만 토큰 이하 | 낮은 등급 | 입력 단가가 Sonnet 5.5의 20분의 1 |
| 10만 토큰 초과 | 낮은 등급의 다섯 배 | 토큰 단가가 Sonnet 5.5의 4분의 1 |

따라서 Haiku 5.5는 짧은 프롬프트에서 효과가 가장 크다. 매 호출에 긴 프롬프트가 필요하면 정가가 아니라 완료 과제당 비용으로 Haiku 5.5와 Sonnet 5.5를 비교해야 한다.

### 모델 혼용 패턴

글은 한 시스템에서 여러 모델을 섞는 방법을 네 가지로 정리한다. 원문의 FIG D는 한 프로젝트에서 네 모델이 각각 다른 종류의 일을 맡는 장면을 보여준다.

![[assets/anthropic-2026-which-claude-model-should-you/crop04.png]]
*FIG D: 한 온라인 상점 프로젝트의 모델별 역할 분담. Fable 5.2는 JavaScript에서 TypeScript로 마이그레이션하고, Opus 5.5는 Fable 5.2의 코드가 들어온 뒤 월 구독 기능을 만든다. Sonnet 5.5는 상품 페이지 문구를, Haiku 5.5는 고객 메시지 분류를 맡는다 (Anthropic 2026, 영상 정지 화면, 데모 Dan Fein)*

| 패턴 | 언제 쓰는가 | 핵심 주의점 |
|---|---|---|
| 자연스러운 경계에서 전환 | 작업 단계가 바뀔 때 모델 교체 | 캐시와 thinking block이 전환되지 않음 |
| 서브에이전트를 작은 모델에 | 메인 모델이 흐름을 유지하며 부수 작업 위임 | 실수를 쉽게 알아챌 수 있는 작업만 맡김 |
| advisor tool | 대부분의 턴이 일상적인 에이전트 작업 | 실제 효과는 측정이 필요 |
| 대량 작업을 저렴한 worker에 | context window 하나를 넘는 작업 | 의존 단계 사슬에는 부적합 |

#### 자연스러운 경계에서 전환

프롬프트 캐시는 그것을 쓴 모델에 속한다. 따라서 새 모델로 바꾼 첫 턴은 대화 전체에 cache write 비용을 낸다. 이 턴을 작게 만드는 방법은 다음과 같다.

- Claude Code에서는 `/compact`를 먼저 실행하거나, 짧은 계획서로 새 세션을 시작한다.
- API에서는 전체 이력 대신 지금까지 작업의 요약으로 새 모델 대화를 연다.

thinking block도 모델 사이에서 온전히 전달되지 않는다. 각 thinking block은 그것을 만든 모델을 기록하고, 각 모델은 일부 다른 모델의 block만 읽는다. Claude API와 Claude Models on Google Cloud(Google managed) 기준은 다음과 같다.

| 읽는 모델 | 읽을 수 있는 thinking block |
|---|---|
| Opus 5.5 | Sonnet 5.5, Haiku 5.5 |
| Sonnet 5.5 | Haiku 5.5 |
| Fable 5.2 | Opus 5.5, Sonnet 5.5, Haiku 5.5 |
| Fable 5.1 (Claude API) | Opus 5.5 |

모델은 자기보다 위 등급 모델의 block을 읽지 않는다. 따라서 아래 등급으로 내려가면 이전 추론이 사라지고, 다른 방향의 전환에서도 사라질 수 있다. 새 모델이 읽을 수 없는 thinking block은 API가 버리고 요청은 성공한다. 즉 오류 없이 조용히 추론이 빠진 채로 새 모델이 작업을 이어 간다. Fable 5.2에서 다른 GA 모델로 옮기면 Fable 5.2의 추론은 모두 사라진다. 전체 경우는 Preserved thinking 문서에 정리되어 있다.

#### 서브에이전트를 작은 모델에

서브에이전트는 자기 context window에서 실행되고 요약만 돌려주며, 토큰 비용은 서브에이전트가 실행되는 모델의 단가로 낸다. 따라서 서브에이전트의 모델을 낮추면 메인 컨텍스트를 작게 유지하면서 비용도 줄일 수 있다.

Claude Code의 설정 수단은 다음과 같다.

| 설정 | 효과 |
|---|---|
| 서브에이전트 정의의 `model: haiku` 또는 `model: sonnet` | 해당 서브에이전트의 모델 지정 |
| `CLAUDE_CODE_SUBAGENT_MODEL` 환경 변수 | 모델을 지정하지 않은 서브에이전트의 기본값 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` 환경 변수 | `haiku` 별칭이 가리키는 모델 고정 |

원문은 `.claude/agents/log-reader.md` 예시를 든다. 테스트 출력과 로그를 읽어 실패 사례마다 파일, 테스트 이름, 첫 오류 줄을 보고하는 서브에이전트다. tools는 Read, Grep, Glob, Bash로 제한하고 `model: haiku`를 지정하며, 본문에 파일을 수정하지 말라고 적는다.

작은 모델에 맡길 작업의 기준은 실수를 쉽게 알아챌 수 있는가다. 파일 찾기, 테스트 실행, 로그 읽기는 여기에 해당하고, 코드 편집과 판단은 메인 모델에 둔다. 작은 모델이 검색 결과를 잘못 읽으면 메인 모델이 엉뚱한 파일을 열어 토큰을 쓰게 되므로, 위임의 이득이 사라진다.

![[assets/anthropic-2026-which-claude-model-should-you/crop05.png]]
*FIG E: 사용자가 지도 레이어(공원, 고도, 자전거 경로, 안개 등)를 요청하면 Opus 5.5가 작업을 계획하고, 병렬 Haiku 5.5 서브에이전트들이 공유 지도에 조각을 그린다. 화면은 28개 요소를 나눠 맡은 상태다 (Anthropic 2026, 영상 정지 화면, 데모 Lance Martin)*

Claude Code의 기본 동작에 관한 주의점도 있다.

- 현재 Claude Code의 내장 Explore 서브에이전트는 항상 Haiku가 아니라 세션 모델로 실행된다. Claude API에서는 Opus가 상한이다. 탐색 비용을 낮추려면 `Explore`라는 이름의 서브에이전트를 `model: haiku`로 직접 정의한다.
- Anthropic API에서 `haiku` 별칭은 Haiku 5.5를 가리키며 Claude Code v2.1.293 이상이 필요하다. Amazon Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS에서는 여전히 Haiku 4.5를 가리킨다.
- `opusplan` 별칭은 plan mode에서 Opus로 계획하고 Sonnet으로 실행한다. 즉 코드 편집이 Sonnet에 간다. 이는 편집을 메인 모델에 두라는 글의 권고와 반대 방향이므로, 기본값으로 삼기 전에 자기 과제에서 측정하라고 권한다.

#### advisor tool로 어려운 판단 위임

advisor tool(beta)은 빠르고 저렴한 executor 모델과 강한 advisor 모델을 짝짓는 도구다. executor가 과제를 실행하다가 필요할 때 advisor에게 조언을 구하고, 토큰 대부분은 executor 단가로 과금된다.

advisor가 도움이 되는 조건은 두 가지가 동시에 성립할 때다. advisor가 executor에 없는 능력을 더해야 하고, executor가 실제로 조언을 요청해야 한다. executor는 낮은 effort level에서 조언을 덜 요청하므로, 비용을 아끼려 effort level을 낮추면 advisor의 효과도 함께 줄어든다.

글은 이 도구에 대해 신중한 입장이다. 플랫폼 비용 가이드의 advisor 표에 있는 네 조합 중 어느 것도 executor 단독을 명확히 앞서지 못했다. 그중 하나의 결과는 다음과 같다.

| 구성 (내부 코딩 벤치마크) | 점수 | 시도당 비용 |
|---|---|---|
| Opus 5.5 `high` executor + Fable 5.1 advisor | 90.1% | $2.92 |
| Opus 5.5 `high` 단독 대비 | 1.7점 높음 | 약 2.1배 |

1.7점 차이는 실행 간 노이즈 범위의 경계에 있고, effort level을 올렸을 때 얻을 수 있는 정도다. 따라서 글은 도입 전에 executor의 조언 요청률부터 측정하라고 권한다.

허용되는 조합도 executor마다 다르다. Sonnet 5.5 executor는 Fable 5.2, Opus 5.5, Opus 5, Sonnet 5.5를 advisor로 허용하고, Fable 5.2 executor는 Fable 5.2와 Mythos 5.2만 허용한다.

#### 대량 작업을 저렴한 worker에 위임

서브에이전트 패턴은 한 메인 모델이 흐름을 유지하며 부수 작업을 맡기는 방식이다. 반면 이 패턴은 context window 하나를 넘는 큰 작업을 위한 것이다. 상위 모델이 lead가 되어 과제를 나누고, 조각을 많은 저렴한 worker에 병렬로 맡기고, 돌아온 결과를 병합한다.

약 2,200만 토큰 규모의 소스 코드를 대상으로 한 내부 결함 탐색 벤치마크에서 Opus 5.5 lead와 Sonnet 5.5 worker(동시 최대 25개) 조합은 기본 effort level의 Opus 5.5 단독보다 비용이 약 3분의 1 적었고 점수는 비슷했다.

Claude Platform에서는 Claude Managed Agents의 multiagent orchestration이 coordinator agent와 worker 목록을 제공한다. 다만 의존 관계로 이어진 단계 사슬이나 context window 하나에 들어가는 작업에는 쓰지 않는다. 그런 경우 계획과 병합에 드는 비용이 절감액보다 크다.

### 마이그레이션 전 호환성 점검

모델 선택은 주로 성능과 비용의 문제지만, 모델 이름만 바꾸고 나머지를 그대로 둘 수는 없다. 모든 현행 모델이 tool use와 이미지 입력을 지원하지만, 요청을 다른 모델로 옮기기 전에 시험할 차이가 여섯 가지 있다.

| 항목 | 차이 | 대응 |
|---|---|---|
| Fable 5.2 preserved thinking | 모든 API 계정에 적용된다. Fable 5.2 thinking block 앞의 내용(시스템 프롬프트, 도구, 이전 메시지)이 바뀌면 400 오류로 거부된다 | 영향받은 thinking을 버리는 옵션을 켜거나, 이력을 append-only로 유지한다. Claude Code, Claude Agent SDK, Claude Managed Agents는 변경 불필요 |
| thinking | Opus 5.5와 Fable 5.2는 항상 thinking하며 끄는 요청은 오류다. Sonnet 5.5는 `between_tools`로 tool call 사이로 제한할 수 있고, Haiku 5.5는 `high` 이하에서 끌 수 있다 | 응답이 thinking block으로 시작할 수 있으므로 content block을 `type`으로 읽는다 |
| 강제 tool use | `tool_choice`가 `any` 또는 `tool`이면 Sonnet 5.5, Opus 5.5, Fable 5.2에서 400 오류 | `auto`를 보내고 도구에 `strict: true`를 지정하고, 언제 쓸지 프롬프트에 적는다 |
| computer use | 네 모델 모두 `computer_toolset_20260801` toolset으로만 지원 (Claude API, Claude Models on Google Cloud) | toolset 버전을 맞춘다 |
| Haiku 4.5에서 Haiku 5.5로 | `budget_tokens`, 기본값이 아닌 `temperature`, `top_p`, `top_k`, 마지막 assistant 턴이 모두 400 오류 | `budget_tokens`를 effort level로 바꾸고 샘플링 파라미터를 제거하며, `messages`를 user 턴으로 끝낸다 |
| 안전 fallback | Opus 5.5, Sonnet 5.5, Fable 5.2는 사이버보안과 생물학 콘텐츠를 주로 걸러내는 안전 분류기를 실행한다 | Claude Code에서 걸린 요청은 이전 모델로 재실행되고 transcript에 고지된다. 사이버보안은 Opus 4.8, 생물학은 Opus 5로 fallback한다 |

한 시스템이 여러 모델을 쓰면 모든 요청을 가장 엄격한 모델 기준으로 만든다. 구체적으로 다음 네 가지를 지킨다.

- 이력은 append-only로 유지한다.
- `tool_choice: auto`와 strict 도구를 보낸다.
- content block은 `type`으로 읽는다.
- 프롬프트와 도구 설명은 가장 문자 그대로 읽는 모델에 맞춰 정밀하게 쓴다.

이 기준을 지키면 코드 변경 없이 단계별로 모델을 올리거나 내릴 수 있다. 또한 단계 유형마다 모델 하나를 쓰는 것처럼 라우팅 규칙이 단순하면 모델에게 고르게 하지 말고 코드가 고르게 한다.

### 자기 과제로 측정하는 절차

SWE-bench Pro나 Terminal-Bench 같은 공개 결과는 시작 모델을 정하는 데까지만 쓴다. 확정하기 전에 후보 모델을 자기 과제로 시험한다.

1. 실제 과제 표본을 뽑고, 각 과제에 결과 검사(통과하는 테스트, 종료된 티켓, 정확한 행 수 등)를 만든다.
2. 후보 모델마다 effort level 두세 개로 실행한다. 실행끼리 캐시를 공유하지 않도록 각각 별도 세션을 쓰고, 각 응답의 `usage` 필드에서 완료 과제당 비용을 기록한다.
3. 점수 대 지출을 그래프로 그린다. 다중 모델 구성은 그 그래프에서 모든 단일 모델 점을 이길 때만 유지한다.
4. 승자를 실제 트래픽 일부에 shadow로 실행한 뒤 전환한다.

Claude Code에서 빠르게 확인하려면 백로그 과제 하나를 `/model`로 두 모델에서 실행하고 `/usage` 보고를 비교한다.

## 결과

글이 인용한 수치를 한곳에 모으면 다음과 같다. 모두 Anthropic 자체 실행이거나 내부 벤치마크다.

| 출처 | 비교 | 결과 |
|---|---|---|
| Terminal-Bench 3.0 | Fable 5.1 `max` 대 Opus 5.5 `high` | 58.0% 대 58.9%, Opus 5.5는 절반의 토큰 |
| FrontierCode 2.0 | Fable 5.2 `high` 대 Opus 5.5 `max` | 45.3% 대 45.5%, Fable 5.2가 과제당 비용 약 절반 |
| 20문제 검색 벤치마크 | 문제별 지출 분포 | 2문제가 지출의 43% |
| SWE-bench Pro | Opus 5.5 effort level별 (`high` 대비) | `low` 약 8점 하락에 비용 약 3분의 1, `medium` 약 2.5점 하락에 약 70%, `xhigh` 약 1.4점 상승에 2.5배 |
| SWE-bench Pro 부분집합 | `low` 후 실패분 `high` 재실행 대 전부 `high` | 약 97%에 과제당 약 $0.17 대 95.3%에 $0.29 |
| 내부 코딩 벤치마크 | Opus 5.5 `high` executor + Fable 5.1 advisor | 90.1%, 시도당 $2.92, 단독 대비 1.7점 상승에 약 2.1배 비용 |
| 내부 결함 탐색 벤치마크 (약 2,200만 토큰) | Opus 5.5 lead + Sonnet 5.5 worker 대 Opus 5.5 단독 | 비용 약 3분의 1 절감, 점수 비슷 |
| 출력 속도 | 세대 간 | Fable 5.2는 Fable 5.1보다 최대 30%, Sonnet 5.5는 Sonnet 5보다 30% 빠름 |
| cache read 비용 | Opus 5.5 턴당 | 15만 토큰 약 $0.03, 2만 토큰 약 $0.004 |

이 수치들은 세 가지 일관된 경향을 보여준다. 첫째, 점수가 비슷한 구성 사이에서도 과제당 비용은 두세 배까지 차이 난다. 둘째, 자동 검사와 실패분 재실행, 저렴한 worker 위임처럼 작업 구조를 바꾸는 방법이 effort level이나 advisor를 더하는 방법보다 비용 대비 효과가 컸다. 셋째, advisor tool처럼 비싼 모델을 덧붙이는 구성은 이득이 노이즈 수준에 그쳤다.

## 한계

- 벤치마크 대부분이 Anthropic 자체 실행이거나 내부 벤치마크이며, 과제 수와 반복 실행 횟수 같은 실험 세부가 본문에 없다. 글도 공개 결과는 출발점일 뿐이라고 밝힌다.
- 가격, 기본 effort level, 별칭이 가리키는 모델은 플랫폼(Anthropic API, Bedrock, Google Cloud, Foundry)과 Claude Code 버전에 따라 다르고, 2026년 11월 시점에 묶인 정보다.
- advisor tool은 beta이며, 플랫폼 가이드의 네 조합 중 executor 단독을 명확히 앞선 것이 없다.
- Claude Code의 `opusplan` 별칭이 글의 권고와 반대 방향이라는 점을 글 스스로 지적하며, 결론 대신 측정을 권한다.
- 원문의 그림 FIG A~E는 모두 영상이라 수집본에는 정지 화면만 남아 있다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| effort level | 모델의 사고량, tool call 수, 자기 검토 정도를 정하는 설정. `low`부터 `max`까지 단계가 있다 |
| 완료 과제당 비용 | 토큰 단가가 아니라 과제 하나를 끝내는 데 든 총비용. 글의 모델 비교 기준 |
| preserved thinking | 이전 thinking block을 이후 턴에 보존하는 방식. Fable 5.2는 앞선 내용이 바뀌면 요청을 거부한다 |
| advisor tool | 저렴한 executor 모델이 실행 중 강한 advisor 모델에 조언을 요청하는 beta 도구 |
| `opusplan` | Claude Code에서 Opus로 계획하고 Sonnet으로 실행하는 모델 별칭 |
| 안전 fallback | 안전 분류기에 걸린 요청을 이전 모델로 재실행하는 Claude Code 동작 |

## 관련 페이지

- [[llms/9bow-2026-gpt-5-6-sol-terra-luna]]: 다른 공급자(OpenAI)의 세 티어 라인업과 실행 모드. 등급별 모델과 실행 강도를 함께 고르는 구조가 비슷하다
- [[agents/lee-hoyeon-2026-harness-engineering]]: Claude Code harness에서 Opus와 Sonnet을 성능별로 분업시키는 실무 예
- [[agents/anthropic-2025-effective-context-engineering-for-ai]]: 메인 컨텍스트를 작게 유지하고 서브에이전트에 위임하는 원칙의 배경
- [[llms/panfilov-2026-stealing-reasoning-traces-from-proprietary]]: thinking block의 모델 간 호환성을 공격 관점에서 다룬 논문. 이 글의 thinking block 읽기 규칙과 같은 메커니즘이다
- [[agents/cemri-2025-why-do-multi-agent-llm-systems]]: 멀티에이전트 구성이 실패하는 방식. lead와 worker 패턴을 도입할 때 참고
