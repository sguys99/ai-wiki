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
tags: [gstack, claude-code, slash-commands, agentic-workflow, garry-tan, 28-commands]
---

# gstack: Garry Tan이 공개한 Claude Code 가상 엔지니어링 팀 스킬 모음

**Author:** 9bow (박정환)
**Date:** 2026-03-29
**Category:** 읽을거리&정보공유

## gstack 소개

gstack은 YC 대표 Garry Tan이 공개한 오픈소스 소프트웨어 팩토리로, "Claude Code를 사용하는 개발자가 20인 팀처럼 출시할 수 있도록" 설계된 28가지 슬래시 명령어 모음이다.

CEO, 디자이너, 엔지니어링 매니저, QA 리드, 보안 담당자, 릴리즈 엔지니어 등 다양한 역할을 AI가 구조적으로 수행하게 한다. Garry Tan은 이 도구를 직접 사용해 2026년 한 해만에 1,237개의 GitHub 기여를 기록했고, 하루 1만~2만 줄의 프로덕션 코드를 단독 작성한 경험을 공유했다.

## 핵심 스킬 분류 (Think → Plan → Build → Review → Test → Ship → Reflect)

### 제품 기획 및 설계 (Think & Plan)
- **/office-hours** (YC Office Hours): 6가지 질문으로 제품 기획 재구성·가설 검증
- **/plan-ceo-review** (CEO/Founder): 사용자 입장에서 10성급 제품 방향 탐색
- **/plan-eng-review** (Eng Manager): 아키텍처·데이터 흐름·다이어그램 확정
- **/plan-design-review** (Senior Designer): 각 차원을 0~10점으로 디자인 평가
- **/design-consultation** (Design Partner): 완전한 디자인 시스템 구축

### 코드 구현 및 리뷰 (Build & Review)
- **/review** (Staff Engineer): CI 통과 후 프로덕션에서 터질 미묘한 버그 탐색
- **/investigate** (Debugger): "조사 없이 수정 없다" 철칙으로 근본 원인 디버깅
- **/design-review** (Designer Who Codes): 라이브 사이트 시각 요소 감사·수정

### QA 및 테스트 (Test)
- **/qa** (QA Lead): 앱을 직접 테스트, 버그 탐색·수정
- **/qa-only** (QA Reporter): 버그 리포트만 생성
- **/browse** (QA Engineer): 실제 Chromium 브라우저로 동작 확인
- **/setup-browser-cookies** (Session Manager): 실제 브라우저 쿠키를 헤드리스 세션으로 가져오기

### 배포·보안·문서화 (Ship, Secure & Document)
- **/ship** (Release Engineer): main 동기화, 테스트 실행 후 PR 오픈
- **/cso** (Chief Security Officer): OWASP Top 10 + STRIDE 위협 모델링 기반 보안 감사
- **/document-release** (Technical Writer): 배포 기능에 맞춰 문서 갱신

### 안전장치·유틸 (Safety & Utility)
- **/retro** (Eng Manager): 주간 회고
- **/codex** (Second Opinion): OpenAI Codex CLI를 통한 독립 교차 검증
- **/careful** (Safety Guardrails): 파괴적 명령 실행 전 경고
- **/freeze** (Edit Lock): 파일 수정 권한을 단일 디렉토리로 제한
- **/guard** (Full Safety): /careful + /freeze 동시 적용
- **/unfreeze** (Unlock): /freeze 제한 해제
- **/gstack-upgrade** (Self-Updater): gstack 최신 버전 자동 업그레이드

## 설치 및 사용법

필요 사항: Claude Code, Git, Bun v1.0 이상 (Windows는 Node.js도 필요)

**기본 설치:**
```
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

**프로젝트별 설치:**
```
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup
```

**Codex CLI / Cursor:**
```
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
```

일반 개발 사이클: `/office-hours` → `/plan-ceo-review` → `/plan-eng-review` → `/ship` → `/review` → `/qa`

텔레메트리는 기본 비활성화. 수집 항목은 스킬 이름·실행 시간·성공/실패·버전·OS 정보에 한정하며, 코드·파일 경로·저장소 이름·프롬프트 내용은 수집하지 않는다.

## 라이선스
MIT — 개인·상업 목적 자유 사용/수정/배포.

**GitHub:** https://github.com/garrytan/gstack
