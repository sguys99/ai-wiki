---
title: "gstack: AI-Powered Software Factory"
type: repo
year: 2026
category: agents
raw_path: raw/repos/garrytan-gstack.md
raw_filename: "garrytan-gstack.md"
source_collection: external
org: "garrytan"
repo: "gstack"
url: "https://github.com/garrytan/gstack"
license: "MIT"
tags: [claude-code, skill-pack, slash-commands, agentic-workflow, software-factory, garry-tan, yc]
---

## 한 줄 요약 (One-line Summary)

Garry Tan이 공개한 Claude Code용 오픈소스 스킬 팩이다. AI 에이전트를 역할이 나뉜 전문 팀원으로 다뤄, 개인 개발자의 출시 과정을 Think에서 Reflect까지 이어지는 스프린트 워크플로로 구조화한다. 라이선스는 MIT다.

## 1. 자료 정보 (Document Information)

- 저장소: `garrytan/gstack` (GitHub)
- 저자: Garry Tan, Y Combinator President & CEO
- 성격: Claude Code용 스킬 팩. 저자는 이 저장소를 software factory로 부른다
- 호환 대상: Claude Code, OpenClaw, Cursor, Codex CLI를 비롯한 AI 에이전트
- 라이선스: MIT. 무료 오픈소스이며 프리미엄 티어를 두지 않는다
- 설치: 저장소를 clone한 뒤 `./setup` 스크립트를 실행한다. 저장소는 이를 30초 설치로 소개한다
- 문서 범위: 보유 중인 raw는 README 전문이 아니라 요약본이다. 슬래시 명령어 전체 목록, 실행 요건, 텔레메트리 정책 같은 세부는 담겨 있지 않다

## 2. 주요 기여 (Key Contributions)

1. **역할 기반 팀 모델**: Claude Code를 단일 어시스턴트가 아니라 역할이 구분된 가상 엔지니어링 팀으로 다룬다. 저장소가 제시하는 역할은 일곱 가지다. CEO/Founder는 전략적 제품 사고를, Engineering Manager는 아키텍처 결정을, Designer는 UI/UX 품질을, Staff Engineer는 코드 리뷰를, QA Lead는 실제 브라우저를 사용한 테스트를, Security Officer는 위협 모델링을, Release Engineer는 배포를 맡는다.
2. **스프린트 워크플로**: 작업 전체를 Think, Plan, Build, Review, Test, Ship, Reflect 순서로 흐르는 하나의 사이클로 규정하고, 각 단계를 슬래시 명령어에 대응시킨다.
3. **방법론 스킬로 실패 차단**: 저장소는 AI 협업의 흔한 실패를 잘못된 가정, 과잉 복잡도, 엉성한 수정 세 가지로 지목한다. 이를 코딩 능력을 키워서가 아니라 방법론 스킬로 막는다는 점을 설계 의도로 밝힌다.
4. **분산된 AI 작업에 대한 프로세스 규율**: 여러 세션에 흩어진 AI 작업 전반에 같은 절차를 강제하는 것을 도구의 역할로 둔다.
5. **자기 측정 실적 공개**: 저자가 자신의 산출량 변화를 정규화한 logical line count로 제시한다.

원칙 문장은 "the point isn't who typed it, it's what shipped"다. 코드를 누가 입력했는지가 아니라 무엇이 출시되었는지를 기준으로 삼는다는 뜻이다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

**주요 스킬**. 저장소가 대표 스킬로 소개하는 항목은 여덟 개다.

- `/office-hours`: 코딩에 들어가기 전 제품 자체를 심문한다
- `/autoplan`: 리뷰를 마친 계획을 만들어 내는 파이프라인
- `/design-shotgun`: AI 목업으로 시각 디자인 방향을 탐색한다
- `/design-html`: 프로덕션에 바로 쓸 수 있는 HTML을 생성한다
- `/review`: 자동 수정을 포함한 코드 리뷰
- `/qa`: 브라우저 기반 테스트와 버그 수정
- `/ship`: CI, 테스트, 배포 자동화
- `/cso`: OWASP와 STRIDE에 근거한 보안 감사

**브라우저 기능**. gstack은 자체 브라우저 스택을 포함한다.

- anti-bot 스텔스를 갖춘 실제 Chromium headless 브라우저
- headed 모드를 위한 GStack Browser GUI
- 자율적인 웹 작업을 수행하는 사이드바 에이전트
- ML 분류기를 통한 prompt injection 방어
- `/pair-agent`를 통한 교차 에이전트 조율

**고급 기능**. 단일 세션을 넘어서는 기능이 다섯 가지 제시된다.

- GBrain: 세션 사이를 잇는 지속 지식 베이스
- 병렬 스프린트: Conductor가 10개에서 15개의 동시 세션을 지원한다
- domain skills: 사이트별 자동화 패턴이 사용을 거듭하며 개선된다
- 연속 체크포인트 모드: 구조화된 컨텍스트를 붙여 작업 중 코드를 자동 커밋한다
- 교차 모델 분석: `/codex`가 OpenAI 모델의 독립 리뷰를 제공한다

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

저자는 AI로 부풀려진 분량을 제외한 정규화 logical line count로 산출량 변화를 제시한다.

- 2026년 페이스: 2013년 대비 약 810배
- 2026년 연초누계: 2013년 한 해 전체 산출량의 240배
- 2026년 GitHub 기여: 1,237건 이상. 2013년은 772건

이 수치는 저자 개인의 자기 보고 데이터이며 독립 벤치마크가 아니다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 생산성 수치는 저자 한 사람의 자기 보고이고 재현이나 독립 검증 절차가 없다.
- 제시된 지표가 모두 산출량 계열이다. 코드 품질, 결함률, 유지보수 비용처럼 방법론의 효과를 확인할 지표는 제시되지 않는다.
- gstack은 스킬 팩이므로 단독으로 동작하지 않는다. Claude Code나 호환 에이전트가 있어야 하며, 그 실행 비용은 MIT 라이선스와 별개다.
- 보유 중인 raw가 요약본이라 실행 요건, 지원 플랫폼, 명령어 전체 목록을 이 자료만으로는 확인할 수 없다.

## 6. 관련 연구 (Related Work)

- `garrytan/gbrain`: 같은 저자의 세션 간 지속 메모리 저장소다. 이 저장소는 GBrain을 gstack의 고급 기능으로 소개한다.
- 한국어 해설 3편(9bow, GPTers, GeekNews): 같은 저장소를 다루며, 슬래시 명령어 28개 전체 목록, 실행 요건, 설치 명령, 텔레메트리 정책처럼 이 raw에 없는 세부를 기록한다.
- 에이전트 harness와 loop engineering 계보: Claude Code를 오케스트레이션 층에서 다루는 흐름과 맞닿는다.

## 7. 용어집 (Glossary)

- **software factory**: 반복 가능한 파이프라인으로 소프트웨어를 규격에 맞춰 생산하는 체계를 뜻한다. 저장소가 자신을 규정하는 이름이다.
- **STRIDE**: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege 여섯 범주로 위협을 분류하는 모델링 프레임워크다.
- **OWASP Top 10**: 웹 애플리케이션에서 가장 빈번한 보안 위험 열 가지를 정리한 목록이다.
- **Conductor**: 여러 격리 워크스페이스에서 Claude Code 세션을 병렬로 실행하는 도구다.
- **GBrain**: 세션이 끝나도 남는 지속 지식 베이스로, gstack이 세션 간 메모리로 사용한다.
- **domain skills**: 특정 사이트를 다루는 자동화 패턴을 축적해 두는 스킬 묶음이다.
