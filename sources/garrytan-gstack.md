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

Garry Tan(YC 대표)이 만든 Claude Code용 오픈소스 스킬 팩. 슬래시 명령어로 CEO·엔지니어링 매니저·QA·보안 등 역할별 전문가를 호출해, 1인 개발자가 20인 팀의 프로세스로 소프트웨어를 출시하게 한다. MIT.

## 1. 자료 정보 (Document Information)

- **저장소**: `garrytan/gstack` (GitHub)
- **저자**: Garry Tan — Y Combinator President & CEO
- **성격**: Claude Code 스킬 팩(software factory). Codex CLI·Cursor·OpenClaw 등 타 에이전트와도 호환
- **라이선스**: MIT (무료, 프리미엄 티어 없음)
- **설치**: 저장소 clone 후 `./setup` 실행 (~30초)

## 2. 주요 기여 (Key Contributions)

1. **역할 기반 워크플로우**: Claude Code를 단일 모드 어시스턴트가 아니라, 역할이 나뉜 가상 엔지니어링 팀으로 다룬다 (CEO/Founder, Eng Manager, Designer, Staff Engineer, QA Lead, Security Officer, Release Engineer).
2. **스프린트 규율**: `Think → Plan → Build → Review → Test → Ship → Reflect` 사이클을 슬래시 명령어로 강제해, AI 개발의 흔한 실패(잘못된 가정·과잉 복잡도·엉성한 수정)를 방법론으로 막는다.
3. **실사용 실적 제시**: Tan 본인이 정규화된 logical line count로 2013년 대비 생산성 급증(2026 페이스 ~810×, 연간 기여 1,237+)을 근거로 제시.
4. **"누가 쳤느냐가 아니라 무엇을 출시했느냐"**: 코딩 능력이 아니라 프로세스 규율을 도구의 핵심 가치로 둔다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

핵심 스킬 그룹:

- **기획/계획**: `/office-hours`(제품 심문), `/autoplan`(리뷰 완료된 계획 파이프라인), `/design-shotgun`(AI 목업 디자인 탐색), `/design-html`(프로덕션 HTML 생성)
- **리뷰/테스트**: `/review`(자동 수정 포함 코드 리뷰), `/qa`(실제 브라우저 테스트+버그 수정), `/cso`(OWASP + STRIDE 보안 감사)
- **배포**: `/ship`(CI·테스트·배포 자동화)

**브라우저 능력**: anti-bot 스텔스를 갖춘 실제 headless Chromium, headed 모드용 GStack Browser GUI, 자율 웹 작업 사이드바 에이전트, ML 분류기 기반 prompt injection 방어, `/pair-agent` 교차 조율.

**고급 기능**: `GBrain`(세션 간 지속 지식 베이스), Conductor 기반 병렬 스프린트(10~15 동시 세션), 사이트별로 개선되는 domain skills, 연속 체크포인트 모드(WIP 자동 커밋), `/codex`를 통한 OpenAI 교차 리뷰.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- 정규화 logical line count(AI 인플레이션 제외): 2026 페이스 ~810× (2013 대비), 2026 연초누계 240× (2013 전체 산출량 대비)
- GitHub 기여: 2026년 1,237+ (2013년 772)
- 이 수치는 저자 개인의 자기 보고 데이터이며 독립 벤치마크는 아니다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 생산성 수치는 저자 자기 보고 — 재현·독립 검증이 없다.
- Claude Code(및 호환 에이전트) 구독을 전제한다. 도구 자체는 무료지만 하부 모델 비용은 별개.
- 플랫폼: macOS/Linux(x64/arm64), Windows는 WSL 경유. Bun v1.0+ 필요.

## 6. 관련 연구 (Related Work)

- `garrytan/gbrain` — 동일 저자의 세션 간 지속 메모리 저장소(gstack에 GBrain으로 통합).
- 하네스/루프 엔지니어링 계보(agent harness, loop engineering) — Claude Code를 오케스트레이션 층에서 다루는 흐름과 맞닿는다.

## 7. 용어집 (Glossary)

- **software factory**: 반복 가능한 파이프라인으로 소프트웨어를 찍어내듯 생산하는 체계.
- **slash command / skill**: Claude Code에서 특정 역할·작업을 트리거하는 `/명령어` 단위.
- **STRIDE**: Spoofing·Tampering·Repudiation·Information disclosure·DoS·Elevation of privilege 위협 모델링 프레임워크.
- **Conductor**: 여러 격리 워크스페이스에서 Claude Code 세션을 병렬 실행하는 도구.
