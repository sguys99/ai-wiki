---
title: "gstack: Y Combinator 대표 Garry Tan이 공개한, Claude Code로 20인 규모의 가상 엔지니어링 팀을 만드는 스킬 모음"
type: article
year: 2026
category: agents
raw_path: raw/articles/9bow-2026-gstack-claude-code-virtual-team.md
raw_filename: "9bow-2026-gstack-claude-code-virtual-team.md"
source_collection: external
author: "9bow (박정환)"
url: "https://discuss.pytorch.kr/t/gstack-y-combinator-garry-tan-claude-code-20/9434"
publisher: "PyTorch KR (discuss.pytorch.kr)"
tags: [gstack, claude-code, slash-commands, agentic-workflow, garry-tan, command-catalog]
---

## 한 줄 요약 (One-line Summary)

PyTorch KR의 9bow(박정환)가 Garry Tan의 gstack을 한국어로 정리한 소개 글이다. gstack을 28가지 슬래시 명령어 모음으로 소개한 뒤, `Think → Plan → Build → Review → Test → Ship → Reflect` 사이클을 절 제목으로 걸고 명령어를 5개 그룹으로 묶어 역할 라벨과 한 줄 기능을 대응시킨다. 설치 명령 3종과 텔레메트리 수집 범위까지 카탈로그 형태로 담았다.

## 1. 자료 정보 (Document Information)

- **저자**: 9bow (박정환)
- **게시**: 2026-03-29, PyTorch KR 커뮤니티 "읽을거리&정보공유" 게시판
- **성격**: gstack 저장소를 한국어로 정리한 소개 겸 명령어 카탈로그
- **원 저장소**: `garrytan/gstack` (글 말미에 GitHub 주소를 함께 적는다). 라이선스는 MIT이며, 글은 개인과 상업 목적의 자유로운 사용, 수정, 배포가 가능하다고 명시한다

## 2. 주요 기여 (Key Contributions)

1. gstack을 "Claude Code를 사용하는 개발자가 20인 팀처럼 출시할 수 있도록" 설계된 28가지 슬래시 명령어 모음이자 오픈소스 소프트웨어 팩토리로 규정하고, AI가 구조적으로 수행하는 역할을 CEO, 디자이너, 엔지니어링 매니저, QA 리드, 보안 담당자, 릴리즈 엔지니어로 열거한다.
2. 명령어마다 영문 역할 라벨(YC Office Hours, Staff Engineer, QA Lead, Chief Security Officer 등)과 한 줄 기능을 붙여 카탈로그로 정리한다. 다만 본문에 이름이 실제로 나오는 명령어는 22개로, 소개문의 28가지와 수가 어긋난다.
3. 글로벌 설치, 프로젝트별 설치, Codex CLI 및 Cursor 설치 명령을 그대로 인용해 재현 가능하게 제공하고, 권장 실행 순서 예시도 함께 제시한다.
4. 텔레메트리가 기본 비활성화이고, 수집 항목이 스킬 이름, 실행 시간, 성공과 실패 여부, 버전, OS 정보에 한정되며, 코드와 파일 경로와 저장소 이름과 프롬프트 내용은 수집하지 않는다는 점을 명시한다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

글은 `Think → Plan → Build → Review → Test → Ship → Reflect` 7단계 사이클을 절 제목으로 걸고, 그 아래를 5개 그룹으로 나눈다.

- **제품 기획 및 설계 (Think & Plan)**: `/office-hours`(YC Office Hours, 6가지 질문으로 제품 기획 재구성과 가설 검증), `/plan-ceo-review`(CEO/Founder, 사용자 입장에서 10성급 제품 방향 탐색), `/plan-eng-review`(Eng Manager, 아키텍처와 데이터 흐름과 다이어그램 확정), `/plan-design-review`(Senior Designer, 각 항목을 0~10점으로 디자인 평가), `/design-consultation`(Design Partner, 완전한 디자인 시스템 구축)
- **코드 구현 및 리뷰 (Build & Review)**: `/review`(Staff Engineer, CI 통과 후 프로덕션에서 발생할 미묘한 버그 탐색), `/investigate`(Debugger, "조사 없이 수정 없다" 철칙에 따른 근본 원인 디버깅), `/design-review`(Designer Who Codes, 라이브 사이트 시각 요소 감사와 수정)
- **QA 및 테스트 (Test)**: `/qa`(QA Lead, 앱 직접 테스트와 버그 탐색 및 수정), `/qa-only`(QA Reporter, 버그 리포트만 생성), `/browse`(QA Engineer, 실제 Chromium 브라우저로 동작 확인), `/setup-browser-cookies`(Session Manager, 실제 브라우저 쿠키를 headless 세션으로 이전)
- **배포, 보안, 문서화 (Ship, Secure & Document)**: `/ship`(Release Engineer, main 동기화와 테스트 실행 후 PR 오픈), `/cso`(Chief Security Officer, OWASP Top 10과 STRIDE 위협 모델링 기반 보안 감사), `/document-release`(Technical Writer, 배포 기능에 맞춘 문서 갱신)
- **안전장치와 유틸 (Safety & Utility)**: `/retro`(Eng Manager, 주간 회고), `/codex`(Second Opinion, OpenAI Codex CLI를 통한 독립 교차 검증), `/careful`(Safety Guardrails, 파괴적 명령 실행 전 경고), `/freeze`(Edit Lock, 파일 수정 권한을 단일 디렉토리로 제한), `/guard`(Full Safety, `/careful`과 `/freeze` 동시 적용), `/unfreeze`(Unlock, `/freeze` 제한 해제), `/gstack-upgrade`(Self-Updater, gstack 최신 버전 자동 업그레이드)

글이 제시하는 일반 개발 사이클 예시는 `/office-hours` → `/plan-ceo-review` → `/plan-eng-review` → `/ship` → `/review` → `/qa` 순서다.

설치는 세 경로를 제시한다. 글로벌 설치는 저장소를 `~/.claude/skills/gstack`으로 clone한 뒤 `./setup`을 실행한다. 프로젝트별 설치는 글로벌 설치본을 `.claude/skills/gstack`으로 복사하고 `.git`을 제거한 뒤 `./setup`을 실행한다. Codex CLI와 Cursor는 `.agents/skills/gstack`으로 clone한 뒤 `./setup --host codex`를 실행한다. 세 명령 모두 `--single-branch --depth 1` 옵션으로 얕게 clone한다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- Garry Tan 본인이 공유한 사용 경험: 이 도구를 직접 사용해 2026년 한 해에 GitHub 기여 1,237개를 기록하고, 하루 1만~2만 줄의 프로덕션 코드를 단독 작성했다.
- 필요 환경: Claude Code, Git, Bun v1.0 이상. Windows는 Node.js도 필요하다고 적는다.
- 글 자체는 명령어를 직접 실행한 측정치를 제시하지 않는다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 저장소 소개 성격의 글이라 명령어를 직접 실행해 검증하지 않고, 정리와 전달에 초점을 둔다.
- 생산성 수치는 도구 저자 본인의 자기 보고를 인용한 것으로, 독립 검증 자료가 아니다.
- 명령어 총수(28가지)와 본문 열거 수(22개)가 일치하지 않아, 전체 명령어 목록으로는 완결되지 않는다.
- 필요 환경의 Windows 항목이 원 저장소 문서 정리와 다르다. 이 글은 Node.js 추가 설치로 적고, [[agents/garrytan-gstack]]은 WSL 경유로 적는다.
- 브라우저 데몬 내부 동작, GBrain, Conductor 병렬 스프린트 같은 고급 기능은 다루지 않는다.

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]]: 원 저장소
- [[overviews/gstack-ai-software-factory-overview]]: gstack 합성 overview
- [[agents/gpters-2026-yc-ai-agent-guide-gstack]]: 같은 도구를 다룬 실전 가이드
- [[agents/hada-2026-gstack-virtual-engineering-team]]: 같은 도구를 다룬 커뮤니티 소개

## 7. 용어집 (Glossary)

- **software factory**: 반복 가능한 파이프라인으로 소프트웨어를 생산하는 체계. 글은 gstack을 오픈소스 소프트웨어 팩토리로 소개한다.
- **슬래시 명령어**: Claude Code에서 `/이름` 형태로 특정 역할이나 작업을 호출하는 단위. 이 글에서는 명령어 하나가 역할 하나에 대응한다.
- **역할 라벨**: 글이 명령어마다 괄호로 붙인 영문 직함 표기. `/cso`의 Chief Security Officer처럼 어떤 전문가를 부르는 명령인지 알려준다.
- **STRIDE**: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege 여섯 범주로 위협을 분류하는 모델링 프레임워크.
- **텔레메트리**: 스킬 실행 현황을 제작자에게 전송하는 계측 데이터. gstack은 기본 비활성화 상태로 배포된다.
