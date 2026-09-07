---
title: "gstack: AI-Powered Software Factory"
type: repo
year: 2026
category: agents
source: garrytan-gstack.md
raw_path: raw/repos/garrytan-gstack.md
raw_filename: "garrytan-gstack.md"
source_collection: external
org: "garrytan"
repo: "gstack"
url: "https://github.com/garrytan/gstack"
license: "MIT"
tags: [claude-code, skill-pack, slash-commands, agentic-workflow, software-factory, garry-tan, yc]
---

# gstack: Claude Code용 소프트웨어 팩토리

## 요약

gstack은 Y Combinator 대표 Garry Tan이 공개한 Claude Code용 오픈소스 스킬 팩이다. 저장소는 자신을 software factory로 규정한다. AI 에이전트를 하나의 만능 조수로 두지 않고, CEO부터 릴리즈 엔지니어까지 역할이 구분된 팀원으로 다루는 것이 설계의 출발점이다.

도구가 제공하는 것은 새로운 모델이나 더 나은 코드 생성 능력이 아니다. 개발 작업을 Think에서 Reflect까지 이어지는 스프린트 사이클로 규정하고, 각 단계를 슬래시 명령어에 대응시켜 절차를 지키게 만드는 규율에 가깝다. 라이선스는 MIT이며 프리미엄 티어를 두지 않는다. Claude Code 외에 OpenClaw, Cursor, Codex CLI 같은 다른 에이전트에서도 동작한다.

## 배경

저장소가 겨냥하는 문제는 모델의 성능이 아니라 AI 협업의 절차다. gstack은 AI를 활용한 개발에서 반복되는 실패를 세 가지로 지목한다. 첫째는 잘못된 가정에서 출발하는 것이고, 둘째는 필요 이상으로 복잡하게 만드는 것이며, 셋째는 검증 없이 엉성하게 수정하는 것이다.

이 세 가지는 모델의 코딩 실력을 올린다고 사라지지 않는다. 무엇을 만들지 되묻는 단계, 설계를 확정하는 단계, 고친 결과를 실제로 확인하는 단계가 빠졌을 때 생기기 때문이다. gstack은 그래서 코딩 능력이 아니라 방법론을 담은 스킬로 이 실패를 막는다는 입장을 취한다.

같은 문제의식이 여러 세션에 흩어진 작업으로도 확장된다. 저장소는 분산된 AI 작업 전반에 동일한 프로세스 규율을 강제하는 것을 도구의 역할로 둔다. 원칙을 요약한 문장은 "the point isn't who typed it, it's what shipped"다. 코드를 누가 입력했는지가 아니라 무엇이 출시되었는지로 평가한다는 뜻이다.

## 핵심 개념

**software factory**는 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계를 뜻한다. 한 번의 뛰어난 결과보다 매번 같은 절차를 거쳐 나오는 결과를 중시하는 관점이다.

**역할 분리**는 하나의 에이전트에게 모든 판단을 맡기지 않고, 상황마다 다른 관점을 가진 전문가를 부르는 구조를 말한다. 제품 방향을 정하는 시점과 코드를 리뷰하는 시점은 필요한 판단 기준이 다르기 때문에, gstack은 이를 별도의 스킬로 떼어 놓는다.

**스킬**은 특정 작업 절차를 담아 에이전트에 제공하는 지침 패키지다. gstack에서는 스킬 하나가 슬래시 명령어 하나에 대응하며, 사용자는 `/review`처럼 명령어를 입력해 해당 역할을 호출한다.

**prompt injection**은 모델이 읽는 외부 콘텐츠에 지시문을 심어 에이전트를 조종하려는 공격이다. gstack의 브라우저가 임의의 웹 페이지를 여는 구조이므로 이 위험이 직접적으로 발생하며, 저장소는 별도의 방어 장치를 둔다.

## 방법

### 역할 구성

저장소는 Claude Code를 역할이 구분된 가상 엔지니어링 팀으로 다룬다. 제시되는 역할과 담당 영역은 다음과 같다.

| 역할 | 담당 영역 |
|---|---|
| CEO/Founder | 전략적 제품 사고 |
| Engineering Manager | 아키텍처 결정 |
| Designer | UI/UX 품질 |
| Staff Engineer | 코드 리뷰 |
| QA Lead | 실제 브라우저를 사용한 테스트 |
| Security Officer | 위협 모델링 |
| Release Engineer | 배포 |

역할 목록은 실제 소프트웨어 조직의 직무 구성을 그대로 옮긴 것에 가깝다. 개인 개발자가 혼자 작업할 때 생략하기 쉬운 판단이 바로 이 목록의 앞뒤 끝에 몰려 있다. 무엇을 만들지 정하는 판단과 출시 직전의 보안, 배포 점검이 그렇다.

### 스프린트 사이클

전체 작업은 일곱 단계로 흐르는 하나의 사이클로 규정된다.

| 순서 | 단계 | 이 단계에서 확정하는 것 |
|---|---|---|
| 1 | Think | 만들 대상과 전제의 타당성 |
| 2 | Plan | 아키텍처와 실행 계획 |
| 3 | Build | 구현 |
| 4 | Review | 구현물의 결함 |
| 5 | Test | 실제 동작 확인 |
| 6 | Ship | 배포 가능 상태 |
| 7 | Reflect | 사이클에서 얻은 교훈 |

앞의 두 단계가 잘못된 가정과 과잉 복잡도를, Review와 Test 두 단계가 엉성한 수정을 걸러내는 자리다. 배경 절에서 짚은 세 가지 실패가 각각 어느 단계에서 차단되는지를 사이클 자체가 보여 준다.

### 대표 스킬

저장소가 주요 스킬로 소개하는 항목은 여덟 개다.

| 스킬 | 하는 일 | 대응 단계 |
|---|---|---|
| `/office-hours` | 코딩에 들어가기 전 제품 자체를 심문한다 | Think |
| `/autoplan` | 리뷰를 마친 계획을 만들어 내는 파이프라인 | Plan |
| `/design-shotgun` | AI 목업으로 시각 디자인 방향을 탐색한다 | Plan |
| `/design-html` | 프로덕션에 바로 쓸 수 있는 HTML을 생성한다 | Build |
| `/review` | 자동 수정을 포함한 코드 리뷰 | Review |
| `/qa` | 브라우저 기반 테스트와 버그 수정 | Test |
| `/ship` | CI, 테스트, 배포 자동화 | Ship |
| `/cso` | OWASP와 STRIDE에 근거한 보안 감사 | Ship |

`/cso`가 참조하는 두 기준은 성격이 다르다. OWASP Top 10은 웹 애플리케이션에서 실제로 자주 발생한 보안 위험 열 가지를 모아 둔 목록이라 이미 알려진 취약점을 점검하는 데 쓰인다. STRIDE는 Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege 여섯 범주로 위협을 분류하는 모델링 프레임워크로, 아직 발견되지 않은 위협을 범주별로 훑어보게 한다. 알려진 목록과 분류 체계를 함께 쓰는 구성이다.

### 브라우저 스택

gstack은 자체 브라우저 스택을 포함한다. QA 단계에서 코드를 읽어 추측하는 대신 화면을 직접 확인하기 위한 구성이다.

| 구성 요소 | 역할 |
|---|---|
| Chromium headless 브라우저 | anti-bot 스텔스를 갖춘 실제 브라우저로 페이지를 연다 |
| GStack Browser GUI | headed 모드에서 사람이 화면을 함께 본다 |
| 사이드바 에이전트 | 자율적인 웹 작업을 수행한다 |
| ML 분류기 | prompt injection 시도를 걸러낸다 |
| `/pair-agent` | 교차 에이전트 조율을 담당한다 |

anti-bot 스텔스를 갖춘 실제 브라우저를 쓴다는 점이 이 구성의 핵심이다. 자동화 도구를 차단하는 사이트에서도 사람이 접속한 것과 같은 방식으로 페이지를 열 수 있어야 실제 서비스를 테스트할 수 있기 때문이다. 다만 임의의 페이지를 여는 능력은 그 자체로 공격 표면이 되므로, ML 분류기 기반 prompt injection 방어가 함께 배치된다.

### 세션을 넘어서는 기능

단일 세션 안에서 끝나지 않는 기능도 다섯 가지 제시된다.

| 기능 | 내용 |
|---|---|
| GBrain | 세션 사이를 잇는 지속 지식 베이스 |
| 병렬 스프린트 | Conductor가 10개에서 15개의 동시 세션을 지원한다 |
| domain skills | 사이트별 자동화 패턴이 사용을 거듭하며 개선된다 |
| 연속 체크포인트 모드 | 구조화된 컨텍스트를 붙여 작업 중 코드를 자동 커밋한다 |
| 교차 모델 분석 | `/codex`가 OpenAI 모델의 독립 리뷰를 제공한다 |

이 다섯 가지는 공통적으로 한 세션의 한계를 보완한다. GBrain과 domain skills가 시간 방향으로 컨텍스트를 이어 주고, Conductor 기반 병렬 스프린트가 동시에 진행되는 작업 수를 늘린다. 연속 체크포인트 모드는 중간 상태를 잃지 않게 하고, `/codex` 교차 리뷰는 같은 모델이 자기 결과를 검토할 때 생기는 사각지대를 다른 모델로 메운다.

## 실행 요건과 설치

아래 실행 요건과 설치 절차는 이 저장소를 다룬 한국어 해설 3편이 기록한 값이다. 저장소 자체는 clone 후 `./setup` 실행이라는 30초 설치만 안내한다.

| 항목 | 값 |
|---|---|
| 필수 도구 | Claude Code 액세스, Git, Bun v1.0 이상 |
| 지원 플랫폼 | macOS, Linux (x64/arm64) |
| Windows | WSL 경유. Node.js가 추가로 필요하다 |
| 명령어 수 | 슬래시 명령어 28개 |
| 텔레메트리 | 기본 비활성화 |

설치는 적용 범위에 따라 세 가지 방식이 있다.

```bash
# 글로벌 설치 (모든 프로젝트에 적용)
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack \
  && cd ~/.claude/skills/gstack && ./setup

# 프로젝트별 설치 (팀 공유)
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack \
  && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup

# Codex CLI 또는 Cursor
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack \
  && cd .agents/skills/gstack && ./setup --host codex
```

텔레메트리는 기본적으로 꺼져 있다. 켜더라도 수집 범위는 스킬 이름, 실행 시간, 성공 여부, 버전, OS 정보까지다. 코드, 파일 경로, 저장소 이름, 프롬프트 내용은 수집하지 않는다. 슬래시 명령어 28개 전체 목록과 명령어별 역할 배정은 [[agents/9bow-2026-gstack-claude-code-virtual-team]]과 [[agents/gpters-2026-yc-ai-agent-guide-gstack]]이 정리한다.

## 결과

저자는 도구의 효과를 자신의 산출량 변화로 제시한다. 기준 지표는 AI로 부풀려진 분량을 제외한 정규화 logical line count다. 생성된 코드의 총량이 아니라 논리적으로 유효한 줄 수만 세었다는 뜻이다.

| 지표 | 값 | 비교 기준 |
|---|---|---|
| 2026년 페이스 | 약 810배 | 2013년 |
| 2026년 연초누계 | 240배 | 2013년 한 해 전체 산출량 |
| 2026년 GitHub 기여 | 1,237건 이상 | 2013년 772건 |

수치의 성격을 구분해서 볼 필요가 있다. 810배는 연간 페이스를 환산한 값이고, 240배는 연중에 이미 달성한 실적이며, 기여 건수는 커밋과 이슈처럼 GitHub이 집계하는 활동 수다. 세 값은 모두 같은 방향을 가리키지만 측정 대상이 서로 다르다.

이 데이터는 저자 개인의 자기 보고이며 독립 벤치마크가 아니다.

## 한계

생산성 수치는 한 사람의 자기 보고다. 동일 조건에서 다른 개발자가 재현했다는 근거나 제3자 검증 절차가 제시되지 않는다.

제시된 지표가 모두 산출량 계열이라는 점도 함께 볼 부분이다. 줄 수와 기여 건수는 얼마나 많이 만들었는지를 보여 주지만, 결함률이나 유지보수 비용처럼 방법론의 품질 효과를 확인할 지표는 제시되지 않는다. 프로세스 규율을 내세우는 도구라는 점을 생각하면 검증되지 않은 채로 남은 부분이다.

구조적인 제약도 있다. gstack은 스킬 팩이므로 단독으로 동작하지 않는다. Claude Code나 호환 에이전트가 있어야 하며, 그 실행 비용은 MIT 라이선스와 별개다. 브라우저 자동화를 포함하는 만큼 실행 환경 요건도 단순한 프롬프트 모음보다 무겁다.

## 핵심 용어

| 용어 | 뜻 |
|---|---|
| software factory | 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계 |
| STRIDE | 위협을 여섯 범주로 분류해 점검하는 위협 모델링 프레임워크 |
| OWASP Top 10 | 웹 애플리케이션에서 가장 빈번한 보안 위험 열 가지를 정리한 목록 |
| Conductor | 여러 격리 워크스페이스에서 Claude Code 세션을 병렬 실행하는 도구 |
| GBrain | 세션이 끝나도 남는 지속 지식 베이스. gstack이 세션 간 메모리로 사용한다 |
| domain skills | 특정 사이트를 다루는 자동화 패턴을 축적해 두는 스킬 묶음 |

## 관련 페이지

- [[agents/9bow-2026-gstack-claude-code-virtual-team]]: 슬래시 명령어 28개를 다섯 묶음으로 나눠 정리한 한국어 해설
- [[agents/gpters-2026-yc-ai-agent-guide-gstack]]: 브라우저 데몬과 QA 스킬을 중심으로 본 실사용 안내
- [[agents/hada-2026-gstack-virtual-engineering-team]]: 저장소 요약과 커뮤니티 반응을 함께 담은 짧은 해설
- [[overviews/gstack-ai-software-factory-overview]]: gstack을 한국어 해설 세 편과 함께 묶은 합성 overview
- [[applications/garrytan-gbrain]]: 같은 저자의 세션 간 지속 메모리 저장소. gstack에 GBrain으로 통합된다
