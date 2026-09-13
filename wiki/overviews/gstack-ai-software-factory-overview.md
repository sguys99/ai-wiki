---
title: "gstack 자료 지도와 명령어 출처 대조"
type: overview
year: 2026
category: overviews
source_collection: synthesis
sources:
  - garrytan-gstack.md
  - 9bow-2026-gstack-claude-code-virtual-team.md
  - gpters-2026-yc-ai-agent-guide-gstack.md
  - hada-2026-gstack-virtual-engineering-team.md
tags: [gstack, claude-code, software-factory, slash-commands, agentic-workflow, garry-tan, command-catalog, browser-daemon, qa-automation, self-reported-benchmark, overview, synthesis]
---

## 요약

gstack은 Y Combinator 대표 Garry Tan이 MIT 라이선스로 공개한 Claude Code용 스킬 팩이다. 저장소는 스스로를 software factory로 규정하고, 파는 것이 코드 생성 능력이 아니라 Think에서 Reflect까지 이어지는 스프린트 규율이라고 밝힌다. 슬래시 명령어 하나가 역할 하나에 대응하므로, 명령어를 고르는 행위가 곧 어떤 관점으로 검토받을지를 고르는 행위가 된다.

이 저장소가 보유한 gstack 자료는 저장소 한 편과 한국어 소개 세 편이다. 네 편은 같은 도구를 다루지만 담당하는 층이 다르고, 같은 항목을 서로 다르게 적는 자리도 있다. 이 페이지는 개별 자료의 요약을 반복하는 대신 네 편이 겹치는 지점과 갈리는 지점, 그리고 각 수치가 누구의 서술인지를 정리한다.

자료군의 가장 큰 제약은 1차 자료의 형태에 있다. 저장소 raw가 README 전문이 아니라 요약본이어서 명령어 전수 목록, 실행 요건, 브라우저 성능 수치가 전부 한국어 소개 쪽에서만 확인된다. 그래서 이 페이지는 "저장소가 이렇게 적는다"와 "한국어 소개가 이렇게 옮긴다"를 문장마다 구분해 표기한다.

## 배경

### 네 자료가 모인 경위

네 자료는 2026년 봄에 두 달 남짓한 간격 안에서 나왔다. 저장소 공개가 먼저이고 한국어 소개 세 편이 뒤따르는 순서다.

[[agents/9bow-2026-gstack-claude-code-virtual-team]]은 2026년 3월 29일 PyTorch KR의 게시판에 올라왔고, [[agents/hada-2026-gstack-virtual-engineering-team]]은 2026년 3월 GeekNews에 실렸다. [[agents/gpters-2026-yc-ai-agent-guide-gstack]]은 게시 시점을 상대 표기로만 남겨 정확한 날짜가 확인되지 않는다.

세 편이 같은 도구를 비슷한 시기에 다루면서도 겹치지 않는 이유는 목적이 달라서다. 하나는 명령어를 빠짐없이 세는 카탈로그를 지향하고, 하나는 브라우저 QA 한 대목을 깊이 파며, 하나는 누구에게 쓸모가 있는지와 커뮤니티가 어떻게 받아들였는지를 기록한다.

### 자료군이 공유하는 문제 설정

네 자료가 공통으로 전제하는 것은 모델 성능이 아니라 절차의 부재다. 다만 그 전제를 명시적으로 서술한 자료는 두 편뿐이므로 출처를 갈라 적을 필요가 있다.

[[agents/garrytan-gstack]]은 AI 협업에서 반복되는 실패를 잘못된 가정, 과잉 복잡도, 엉성한 수정 세 가지로 지목하고, 이를 코딩 능력이 아니라 방법론 스킬로 막는다는 점을 설계 의도로 밝힌다. 이 진단은 무엇이 잘못되는지를 결과 쪽에서 서술한 것이다.

[[agents/gpters-2026-yc-ai-agent-guide-gstack]]은 같은 문제를 원인 쪽에서 서술한다. 기본 Claude Code가 한 가지 모드로만 동작해 코드를 부탁하면 곧바로 작성에 들어갈 뿐 만들 대상이 맞는지 먼저 묻지 않는다는 관찰이고, 이 자료는 Garry Tan이 그것을 역할의 부재 문제로 봤다고 적는다. 실제 팀에서는 무엇을 만들지, 어떻게 만들지, 코드가 괜찮은지, 화면이 동작하는지를 서로 다른 사람이 맡는데 혼자 쓰는 에이전트에는 그 분업이 없다는 설명이다.

[[agents/hada-2026-gstack-virtual-engineering-team]]과 [[agents/9bow-2026-gstack-claude-code-virtual-team]]은 이 문제 인식을 따로 서술하지 않고 기능 목록에서 시작한다. 두 자료가 gstack을 "20인 팀처럼 일하게 해주는" 도구로 소개하는 표현이 분업이라는 전제를 간접적으로 드러낼 뿐이다.

## 자료 지도

### 자료 역할 대응표

네 자료의 담당 범위는 아래처럼 갈린다. 오른쪽 두 열이 이 페이지의 라우팅 규칙에 해당한다.

| 자료 | 유형 | 이 자료가 단독으로 답하는 것 | 이 자료가 다루지 않는 것 |
|---|---|---|---|
| [[agents/garrytan-gstack]] | 저장소 README 요약본 | 일곱 역할의 담당 영역, anti-bot 스텔스 브라우저와 prompt injection 방어, `/pair-agent`, Conductor 동시 세션 수, 연속 체크포인트 모드, domain skills, 정규화 logical line count 세 값 | 명령어 전수 목록, 실행 요건, 텔레메트리 수집 범위, 브라우저 성능 수치 |
| [[agents/9bow-2026-gstack-claude-code-virtual-team]] | 명령어 카탈로그 | 명령어 22개의 이름과 역할 라벨, 5개 그룹 분류, 설치 경로 3종, 텔레메트리 수집 항목과 미수집 항목, 권장 실행 순서 | 브라우저 데몬 내부, Greptile 연동, `/retro`의 Team-Aware 동작 |
| [[agents/gpters-2026-yc-ai-agent-guide-gstack]] | 실전 가이드 | 브라우저 데몬 수치 세 가지, Diff-Aware 테스트, 쿠키를 가져올 브라우저 5종, `/plan-ceo-review`의 세 모드, `/ship` 6단계, Greptile 연동, `/retro`의 Team-Aware 동작, 비용 FAQ | 명령어 22개 전수, 안전 가드 묶음, 보안 감사, 텔레메트리 |
| [[agents/hada-2026-gstack-virtual-engineering-team]] | 커뮤니티 소개 | 대상 사용자 세 부류, canary 모니터링과 벤치마킹을 포함한 스킬 이름 목록, 파워 툴 묶음, 독자 댓글 4건 | 정량 수치 전부, 설치 절차, 명령어의 동작 방식 |

표를 가로로 읽으면 자료군의 빈 곳도 드러난다. 네 편 가운데 어느 편도 명령어를 직접 실행해 결과를 확인하지 않았고, 저장소 코드를 읽어 README의 서술을 검증하지도 않았다.

### 질문별 라우팅

네 자료는 난이도 순으로 쌓여 있지 않고 담당 범위로 나뉘어 있다. 그래서 읽는 순서보다 질문을 기준으로 고르는 편이 실용적이다.

| 알고 싶은 것 | 먼저 볼 페이지 | 보충할 페이지 |
|---|---|---|
| 이 도구가 무엇이고 왜 나왔는가 | [[agents/garrytan-gstack]] | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]의 역할 분리 서술 |
| 어떤 명령어가 있는가 | [[agents/9bow-2026-gstack-claude-code-virtual-team]] | [[agents/garrytan-gstack]]이 적은 네 개의 추가 이름 |
| 브라우저 QA가 어떻게 동작하는가 | [[agents/gpters-2026-yc-ai-agent-guide-gstack]] | [[agents/garrytan-gstack]]의 브라우저 스택 구성 |
| 설치하려면 무엇이 필요한가 | [[agents/9bow-2026-gstack-claude-code-virtual-team]] | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]의 FAQ |
| 나에게 쓸모가 있는가 | [[agents/hada-2026-gstack-virtual-engineering-team]]의 대상 사용자 구분 | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]의 비용 항목 |

## 핵심 개념

**software factory**는 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계를 뜻한다. 네 자료가 gstack을 부르는 공통 이름이며, 한 번의 뛰어난 결과보다 매번 같은 절차를 거쳐 나오는 결과를 중시하는 관점을 담는다.

**스프린트 사이클**은 Think, Plan, Build, Review, Test, Ship, Reflect 일곱 단계다. 네 자료가 모두 같은 순서로 적는 유일한 구조이며, gstack의 명령어는 이 사이클 위의 어느 지점을 맡는지로 정체성이 정해진다.

**역할 라벨**은 명령어마다 붙은 직함 표기다. [[agents/9bow-2026-gstack-claude-code-virtual-team]]이 `/cso`에 Chief Security Officer를, `/review`에 Staff Engineer를 붙이는 식이며, 명령어 이름만으로는 알기 어려운 호출 대상을 알려준다.

**Diff-Aware 실행**은 `git diff`가 알려주는 변경분을 읽어 작업 범위를 좁히는 방식이다. [[agents/gpters-2026-yc-ai-agent-guide-gstack]]에 따르면 QA는 변경된 페이지만 골라 테스트하고 코드 리뷰는 main 브랜치 대비 diff만 분석한다. 실행 시간이 프로젝트 크기가 아니라 변경 규모를 따라간다는 것이 이 방식의 실익이다.

**장기 실행 데몬**은 브라우저를 호출마다 새로 시작하지 않고 상주시키는 운용 방식이다. 프로세스가 살아 있으므로 쿠키와 localStorage와 로그인 상태가 호출 사이에 유지되고, 시작 비용도 최초 한 번만 든다.

## 네 자료가 함께 그리는 구조

### 스프린트 단계와 명령어 대응

사이클 일곱 단계 각각에 어떤 명령어가 붙는지는 자료마다 다르게 적힌다. 아래 표는 단계별로 이름이 확인되는 명령어와 그 이름을 적은 자료를 함께 적은 것이다.

| 단계 | 이름이 확인되는 명령어 | 이름을 적은 자료 |
|---|---|---|
| Think | `/office-hours` | garrytan, 9bow, hada |
| Plan | `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/autoplan`, `/design-shotgun` | 앞의 넷은 9bow, 뒤의 둘은 garrytan. gpters와 hada는 앞의 둘만 |
| Build | `/design-html` | garrytan |
| Review | `/review`, `/investigate`, `/design-review` | 셋 다 9bow. `/review`는 나머지 세 자료도 |
| Test | `/qa`, `/qa-only`, `/browse`, `/setup-browser-cookies` | 넷 다 9bow와 gpters. `/qa`는 garrytan과 hada도 |
| Ship | `/ship`, `/cso`, `/document-release` | 셋 다 9bow. `/ship`은 나머지 세 자료도, `/cso`는 garrytan도 |
| Reflect | `/retro` | 9bow, gpters |

두 단계에서 자료 사이의 서술이 어긋난다. [[agents/hada-2026-gstack-virtual-engineering-team]]은 Build와 Reflect에 대응하는 명령어를 적지 않고 그 사실을 명시한다. 반면 [[agents/garrytan-gstack]]은 `/design-html`을 Build에 배정하고, [[agents/9bow-2026-gstack-claude-code-virtual-team]]과 [[agents/gpters-2026-yc-ai-agent-guide-gstack]]은 Reflect에 해당하는 `/retro`를 적는다.

Build 단계가 가장 얇다는 점은 도구의 무게중심을 보여준다. 코드를 작성하는 일은 Claude Code가 이미 수행하므로 gstack이 따로 명령어를 둘 이유가 적다. gstack이 더하는 것은 작성 자체가 아니라 작성의 앞뒤에 놓이는 절차다.

### 역할 배정

역할 목록의 크기는 자료마다 다르다. [[agents/garrytan-gstack]]이 가장 넓게 일곱 가지를 적는다.

| 역할 | 담당 영역 | 이 역할을 적은 자료 |
|---|---|---|
| CEO/Founder | 전략적 제품 사고 | garrytan, 9bow, gpters, hada |
| Engineering Manager | 아키텍처 결정 | garrytan, 9bow, gpters, hada |
| Designer | UI/UX 품질 | garrytan, 9bow, hada |
| Staff Engineer | 코드 리뷰 | garrytan, 9bow, gpters |
| QA Lead | 실제 브라우저를 사용한 테스트 | garrytan, 9bow, gpters, hada |
| Security Officer | 위협 모델링 | garrytan, 9bow |
| Release Engineer | 배포 | garrytan, 9bow, gpters, hada |

역할 목록은 실제 소프트웨어 조직의 직무 구성을 그대로 옮긴 것에 가깝다. 개인 개발자가 혼자 작업할 때 생략하기 쉬운 판단이 목록의 앞뒤 끝에 몰려 있다는 점이 특징이다. 무엇을 만들지 정하는 판단과 출시 직전의 보안 점검이 그렇다.

### 브라우저 QA 스택

브라우저 스택은 네 자료 가운데 두 편만 다루고, 두 편이 서로 다른 층을 본다.

[[agents/garrytan-gstack]]은 구성 요소를 나열한다. anti-bot 스텔스를 갖춘 Chromium headless 브라우저, 사람이 화면을 함께 보는 headed 모드의 GStack Browser GUI, 자율적인 웹 작업을 수행하는 사이드바 에이전트, prompt injection 시도를 걸러내는 ML 분류기, 교차 에이전트 조율을 담당하는 `/pair-agent`다. 자동화 도구를 차단하는 사이트에서도 페이지를 열 수 있어야 실제 서비스를 테스트할 수 있고, 임의의 페이지를 여는 능력은 그 자체로 공격 표면이 되므로 방어 장치가 함께 배치된다는 구성이다.

[[agents/gpters-2026-yc-ai-agent-guide-gstack]]은 같은 스택을 운용 수치로 서술한다. Playwright 기반 headless Chromium을 약 58MB 규모로 내장하고 이를 장기 실행 데몬으로 운용하며, 콜드 스타트는 3초에서 5초가 걸리지만 이후 호출은 100밀리초에서 200밀리초 사이라는 것이다. 즉 첫 호출 이후에는 0.1초에서 0.2초 사이에 응답을 받는다. 로그인이 필요한 화면을 검증하기 위해 `/setup-browser-cookies`가 Chrome, Arc, Brave, Edge, Comet에서 쿠키를 가져오며 인터랙티브 UI로 도메인을 고른다고 적는다.

두 서술은 겹치지 않는다. 저장소 쪽 자료에는 성능 수치가 없고, 가이드 쪽 자료에는 prompt injection 방어와 사이드바 에이전트가 없다. 따라서 브라우저 스택을 인용할 때는 구성 이야기인지 성능 이야기인지에 따라 출처가 갈린다.

### 배포와 보안과 회고의 자동화

출시 이후 구간을 다루는 명령어 세 가지도 자료마다 서술 깊이가 다르다.

| 명령어 | 가장 깊게 적은 자료 | 그 자료가 적은 내용 | 다른 자료의 서술 |
|---|---|---|---|
| `/ship` | gpters | main 머지, 테스트 실행, diff 최종 리뷰, VERSION 범프, CHANGELOG 갱신, 커밋과 푸시와 PR 생성 6단계 | 9bow는 main 동기화와 테스트 실행 뒤 PR을 연다는 3단계. garrytan은 CI와 테스트와 배포 자동화라는 한 줄 |
| `/cso` | 9bow | OWASP Top 10과 STRIDE 위협 모델링에 근거한 보안 감사 | garrytan도 같은 두 기준을 적는다. gpters와 hada는 다루지 않는다 |
| `/retro` | gpters | 팀원별 커밋 수와 LOC와 테스트 커버리지와 배포 패턴을 분석하는 Team-Aware 모드, praise와 growth areas 구분, JSON 스냅샷으로 트렌드 추적 | 9bow는 주간 회고라는 한 줄. hada는 스킬 이름으로만 회고를 적는다 |

`/ship`의 단계 수가 자료마다 다른 것은 요약 범위의 차이로 보인다. gpters의 6단계가 9bow의 3단계를 포함하고 있어 둘이 모순되지는 않는다. 다만 VERSION 범프와 CHANGELOG 갱신이 실제로 자동 수행되는지를 저장소 쪽 근거로 확인할 수는 없다.

`/cso`가 근거로 삼는 두 기준은 성격이 다르다. OWASP Top 10이 웹 애플리케이션에서 자주 나타난 위험 열 가지를 모아 둔 목록이라면, STRIDE는 Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege 여섯 범주로 위협을 분류하는 모델링 프레임워크다. 알려진 목록과 분류 체계를 함께 써서 감사 범위를 넓힌다는 설계다.

`/retro`가 JSON 스냅샷을 남긴다는 점은 이 명령을 일회성 요약과 구별한다. 회고마다 같은 형식의 기록이 쌓이므로 지표가 어느 방향으로 움직이는지를 기간에 걸쳐 비교할 수 있다.

## 명령어 이름의 출처 대조

### 그룹별 명령어와 출처

[[agents/9bow-2026-gstack-claude-code-virtual-team]]의 5개 그룹을 기준으로 삼고, 각 이름을 어느 자료가 적는지를 오른쪽 열에 적었다. 마지막 행은 9bow 목록 밖에서만 확인되는 이름이다.

| 그룹 | 명령어 | 이름을 적은 자료 |
|---|---|---|
| 제품 기획과 설계 | `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation` | 다섯 모두 9bow. `/office-hours`는 garrytan과 hada도, `/plan-ceo-review`와 `/plan-eng-review`는 gpters와 hada도 |
| 코드 구현과 리뷰 | `/review`, `/investigate`, `/design-review` | 셋 모두 9bow. `/review`는 garrytan과 gpters와 hada도 |
| QA와 테스트 | `/qa`, `/qa-only`, `/browse`, `/setup-browser-cookies` | 넷 모두 9bow와 gpters. `/qa`는 garrytan과 hada도 |
| 배포와 보안과 문서화 | `/ship`, `/cso`, `/document-release` | 셋 모두 9bow. `/ship`은 나머지 세 자료도, `/cso`는 garrytan도 |
| 안전장치와 유틸 | `/retro`, `/codex`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade` | 일곱 모두 9bow. `/retro`는 gpters도, `/codex`는 garrytan도, `/careful`과 `/freeze`와 `/guard`는 hada도 |
| 9bow 목록 밖 | `/autoplan`, `/design-shotgun`, `/design-html`, `/pair-agent` | garrytan만 |

그룹 구분이 사이클 단계와 정확히 맞아떨어지지는 않는다. Reflect 단계에 해당하는 `/retro`가 안전장치 그룹에 들어가 있는데, 그룹 이름을 사이클 단계가 아니라 실무 작업 종류로 붙였기 때문이다.

### 28이라는 수와 26이라는 수

명령어 총수는 이 자료군에서 값이 하나로 모이지 않는 대표 항목이다.

[[agents/9bow-2026-gstack-claude-code-virtual-team]]은 gstack을 28가지 슬래시 명령어 모음으로 소개하면서 본문에는 22개의 이름만 싣는다. 그룹별로 5개, 3개, 4개, 3개, 7개를 합한 값이며, 나머지 6개가 무엇인지는 그 자료에 나오지 않는다.

네 자료를 겹쳐 보면 수가 조금 올라간다. [[agents/garrytan-gstack]]이 9bow 목록에 없는 `/autoplan`과 `/design-shotgun`과 `/design-html`과 `/pair-agent` 네 개를 더 적기 때문에, 이 저장소가 보유한 자료 전체에서 이름이 확인되는 명령어는 26개다. [[agents/gpters-2026-yc-ai-agent-guide-gstack]]의 9개와 [[agents/hada-2026-gstack-virtual-engineering-team]]의 9개는 모두 9bow의 22개 안에 들어가므로 새 이름을 더하지 않는다.

28이라는 수의 출처를 짚어 둘 필요가 있다. 이 값은 저장소 요약본에 없고 [[agents/9bow-2026-gstack-claude-code-virtual-team]] 한 편에만 나온다. 따라서 남은 두 개가 실재하는지, 아니면 28이라는 수 자체가 판본 차이나 집계 기준 차이에서 온 것인지는 이 저장소 자료로 판정할 수 없다.

## 자료 사이에서 갈리는 지점

같은 항목을 두 자료가 다르게 적는 자리가 다섯 군데 있다. 실제 사용 시점에는 저장소 문서를 직접 확인하는 편이 안전하다.

| 항목 | 자료별 서술 | 성격 |
|---|---|---|
| 팀 규모 비유 | 9bow와 hada는 20인 팀. gpters는 도입부에서 8명의 전문가라고 쓰고 요약표에는 9개 스킬을 싣는다. garrytan은 역할 일곱 가지를 적는다 | 네 값이 각각 다른 것을 센다. 비유와 역할 수와 스킬 수가 섞여 있다 |
| Windows 지원 | 9bow는 Node.js가 추가로 필요하다고 적고, gpters는 WSL을 경유한다고 적는다 | 두 조건이 배타적이지 않지만 어느 자료도 둘을 함께 적지 않는다 |
| `/plan-ceo-review`의 목표 | 9bow는 10성급 제품 방향 탐색, gpters는 10배 더 좋은 제품 | 같은 명령의 한 줄 설명이 두 표현으로 갈린다 |
| `/plan-eng-review`의 산출물 | 9bow는 아키텍처와 데이터 흐름과 다이어그램 셋. gpters는 여기에 엣지 케이스와 테스트 커버리지와 성능을 더해 여섯 | gpters가 더 넓게 적는다. 모순이 아니라 범위 차이로 보인다 |
| `/ship`의 단계 수 | gpters 6단계, 9bow 3단계, garrytan 한 줄 요약 | 위와 같은 범위 차이 |

다섯 항목의 성격이 같지 않다는 점이 중요하다. Windows 지원과 팀 규모 비유는 값이 실제로 어긋나는 자리이고, 나머지 셋은 같은 사실을 다른 깊이로 적은 자리다. 전자는 원문 대조가 필요하고 후자는 더 깊이 적은 쪽을 쓰면 된다.

## 수치와 근거 등급

이 절의 목적은 수치를 모으는 것이 아니라 각 수치가 누구의 서술인지를 밝히는 것이다. 오른쪽 열이 그 판정이다.

| 지표 | 값 | 저장소 내 출처 | 성격 |
|---|---|---|---|
| 2026년 산출 페이스 | 2013년 대비 약 810배 | [[agents/garrytan-gstack]] | 자기 보고. AI 인플레이션을 뺀 정규화 logical line count 기준 |
| 2026년 연초누계 | 2013년 한 해 전체 산출량의 240배 | [[agents/garrytan-gstack]] | 자기 보고. 같은 기준 |
| 2026년 GitHub 기여 | 1,237건 이상. 2013년은 772건 | [[agents/garrytan-gstack]], [[agents/9bow-2026-gstack-claude-code-virtual-team]] | 자기 보고. 두 자료가 같은 값을 적고, 대조 연도는 저장소 쪽에만 있다 |
| 하루 프로덕션 코드 | 1만 줄에서 2만 줄 | [[agents/9bow-2026-gstack-claude-code-virtual-team]]만 | 저자의 경험 공유를 옮긴 값. 저장소 요약본에는 없다 |
| 브라우저 콜드 스타트 | 3초에서 5초 | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]만 | 측정 환경과 방법이 적혀 있지 않다 |
| 이후 호출 응답 시간 | 100밀리초에서 200밀리초 | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]만 | 같음. 저장소 요약본에는 없다 |
| 내장 브라우저 용량 | 약 58MB | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]만 | Playwright headless Chromium 기준 |
| Conductor 동시 세션 | 10개에서 15개 | [[agents/garrytan-gstack]]만 | 저장소 자기 서술. hada는 같은 기능을 강조하되 수치를 적지 않는다 |
| 슬래시 명령어 총수 | 28개 | [[agents/9bow-2026-gstack-claude-code-virtual-team]]만 | 저장소 요약본에 없다. 네 자료를 합쳐 이름이 확인되는 것은 26개 |
| `/office-hours` 질문 수 | 6가지 | [[agents/9bow-2026-gstack-claude-code-virtual-team]], [[agents/hada-2026-gstack-virtual-engineering-team]] | 두 자료가 일치한다. 질문 내용은 어느 자료에도 없다 |
| `/plan-design-review` 채점 범위 | 0점에서 10점 | [[agents/9bow-2026-gstack-claude-code-virtual-team]]만 | 채점 항목의 목록은 없다 |
| 설치 소요 | 30초 | [[agents/garrytan-gstack]]만 | 저장소 자기 서술 |
| gstack 자체 비용 | 없음. Claude Code 구독만 필요하다 | [[agents/gpters-2026-yc-ai-agent-guide-gstack]]만 | FAQ 답변. 실행 비용은 별도다 |

표에서 드러나는 것은 두 가지다. 첫째, 도구의 효과를 말하는 값은 전부 만든 사람 본인의 기록이다. 네 편 가운데 어느 편도 독립 재현이나 대조군을 제시하지 않으며, 제시된 지표가 모두 산출량 계열이라 결함률이나 유지보수 비용 같은 품질 효과는 확인되지 않는다.

둘째, 성능 수치와 규모 수치의 출처가 정확히 갈린다. 생산성 3종과 Conductor 세션 수와 설치 소요는 저장소 쪽에서만, 브라우저 성능 3종과 비용 항목은 가이드 쪽에서만 나온다. 그래서 "저장소가 100밀리초를 주장한다"거나 "가이드가 810배를 주장한다"는 식의 귀속은 성립하지 않는다.

## 한계

**1차 자료가 README 전문이 아니다.** [[agents/garrytan-gstack]]의 근거는 `WebFetch`로 취득한 README 요약본이며, 그 sources 파일이 명령어 전체 목록과 실행 요건과 텔레메트리 규칙이 담겨 있지 않다고 스스로 밝힌다. 따라서 저장소 내부 구조에 해당하는 서술, 곧 명령어 정의 파일의 경로나 설정 키나 `./setup` 스크립트의 동작은 이 페이지가 근거를 댈 수 없다. 실행 요건과 설치 명령과 텔레메트리 수집 범위는 한국어 소개 쪽에서만 확인되는 값이라 저장소 서술로 옮겨 적지 않았다.

**자기 보고 수치에 의존한다.** 앞의 표에서 정리한 대로 생산성 수치 세 가지는 도구를 만든 사람이 자기 도구를 쓰고 남긴 기록이다. 브라우저 데몬 성능 수치도 측정 환경과 대상 페이지와 반복 횟수가 밝혀지지 않았다. 두 종류 모두 도입 판단의 근거로 쓰기에는 재현 조건이 부족하다.

**한국어 세 편이 본 원자료를 확정할 수 없다.** 세 편의 명령어 이름과 설치 명령이 서로 일치하므로 같은 README를 참조했을 가능성이 높지만, 어느 판본을 언제 보았는지는 어느 자료도 밝히지 않는다. 게시 시점도 9bow만 2026년 3월 29일로 날짜가 남아 있다. hada는 원문의 상대 표기를 수집 시점에 환산한 월 단위 값이고 gpters는 연도만 확인된다. 그래서 앞 절에서 정리한 어긋남이 판본 차이인지 요약 범위 차이인지는 이 저장소 자료로 판정할 수 없다.

**실사용 검증 기록이 없다.** 네 편 가운데 명령어를 실행해 출력을 확인한 자료가 없다. 유일한 실사용 신호는 [[agents/hada-2026-gstack-virtual-engineering-team]]이 옮긴 독자 댓글 4건인데, 요지만 한 줄씩 남아 있어 논거를 되짚을 수 없다. 그중 스킬 문서가 방대하다는 관찰은 컨텍스트 비용이라는 실무 부담을 가리키지만 분량 수치가 없다.

**단일 근거 항목이 남는다.** prompt injection 방어와 사이드바 에이전트와 연속 체크포인트 모드와 domain skills는 [[agents/garrytan-gstack]] 요약본의 한 줄이 유일한 근거다. Greptile 연동과 `/plan-ceo-review`의 세 모드는 [[agents/gpters-2026-yc-ai-agent-guide-gstack]]에만 있다. canary 모니터링과 벤치마킹 스킬은 [[agents/hada-2026-gstack-virtual-engineering-team]]에만 이름이 나오고 동작은 확인되지 않는다.

**커버 범위 밖의 주제가 있다.** 저장소가 세션 간 지속 메모리로 통합한다고 적은 GBrain은 이 페이지의 커버 자료가 다루지 않는다. 그 저장소 자체와 생태계 판정은 별도 자료군이 담당하므로 아래 관련 페이지의 라우팅을 따른다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| software factory | 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계. 네 자료가 gstack을 부르는 공통 이름이다 |
| 스프린트 사이클 | Think, Plan, Build, Review, Test, Ship, Reflect 일곱 단계. 명령어는 이 사이클 위의 어느 지점을 맡는지로 정체성이 정해진다 |
| 역할 라벨 | 명령어마다 붙은 직함 표기. 명령어를 고르는 행위가 어떤 관점으로 검토받을지를 고르는 행위가 된다 |
| Diff-Aware 테스트 | `git diff`로 변경분을 읽어 영향받은 페이지만 골라 실행하는 QA 방식 |
| 장기 실행 브라우저 데몬 | 호출마다 새로 시작하지 않고 상주하면서 쿠키와 로그인 상태를 유지하는 브라우저 프로세스 |
| opinionated 추천 | 선택지를 나열하고 판단을 미루는 대신 하나를 고르고 근거를 함께 제시하는 방식 |

## 관련 페이지

- [[agents/garrytan-gstack]]: 1차 자료인 저장소 정리. 역할 일곱 가지, 브라우저 스택 구성, Conductor 동시 세션 수, 생산성 자기 보고 세 값의 출처다. raw가 README 요약본이라는 제약을 함께 안고 읽는다.
- [[agents/9bow-2026-gstack-claude-code-virtual-team]]: 명령어 카탈로그. 이름이 확인되는 22개와 5개 그룹, 설치 경로 3종, 텔레메트리 수집 범위를 담당한다.
- [[agents/gpters-2026-yc-ai-agent-guide-gstack]]: 실전 가이드. 브라우저 데몬 성능 수치와 Diff-Aware 테스트, Greptile 연동, `/retro`의 Team-Aware 동작, 비용 FAQ의 유일한 근거다.
- [[agents/hada-2026-gstack-virtual-engineering-team]]: 커뮤니티 소개. 대상 사용자 세 부류와 스킬 이름 목록, 독자 반응 4건을 담당한다.
- [[applications/garrytan-gbrain]]: 저장소가 세션 간 지속 메모리로 통합한다고 적는 GBrain의 원 저장소. 이 페이지의 커버 밖이라 구조와 수치는 그 페이지를 따른다.
- [[overviews/gbrain-ecosystem-overview]]: 같은 저자 계열의 메모리 자료 6편을 묶은 overview. 이 페이지가 개발 워크플로 쪽을 다룬다면 그 페이지는 메모리 층을 다룬다.
- [[overviews/prompt-to-loop-engineering-evolution-overview]]: 프롬프트 단위 작업이 harness와 loop 단위 설계로 옮겨 가는 흐름을 묶은 최상위 지도. gstack을 오케스트레이션 층의 도구로 자리매김할 때 참고할 좌표계다.
