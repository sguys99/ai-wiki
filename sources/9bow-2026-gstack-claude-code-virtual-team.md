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

## 한 줄 요약 (One-line Summary)

PyTorch KR의 9bow(박정환)가 gstack의 28개 슬래시 명령어를 `Think → Plan → Build → Review → Test → Ship → Reflect` 순서로 정리한 한국어 소개글. 명령어별 역할과 설치법까지 카탈로그처럼 갈무리한다.

## 1. 자료 정보 (Document Information)

- **저자**: 9bow (박정환), PyTorch KR
- **게시**: 2026-03-29, "읽을거리&정보공유"
- **성격**: gstack 저장소를 한국어로 정리한 소개·카탈로그 글

## 2. 주요 기여 (Key Contributions)

1. gstack의 명령어를 **28개**로 명시하고, 스프린트 7단계에 맞춰 그룹핑.
2. 각 명령어의 역할과 한 줄 기능을 대응시켜 빠르게 훑어볼 수 있게 정리.
3. 글로벌/프로젝트별/Codex CLI 설치 명령을 그대로 인용해 재현 가능하게 제공.
4. 텔레메트리 수집 범위(스킬 이름·실행 시간·성공 여부·버전·OS에 한정, 코드·경로·프롬프트 미수집)를 명시.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

명령어 그룹:
- **Think & Plan**: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`
- **Build & Review**: `/review`, `/investigate`, `/design-review`
- **Test**: `/qa`, `/qa-only`, `/browse`, `/setup-browser-cookies`
- **Ship/Secure/Document**: `/ship`, `/cso`, `/document-release`
- **Safety & Utility**: `/retro`, `/codex`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`

`/investigate`의 "조사 없이 수정 없다" 철칙, `/cso`의 OWASP Top 10 + STRIDE 근거, `/codex`의 OpenAI Codex CLI 교차 검증이 특징으로 언급된다.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

- Garry Tan 자기 보고: 2026년 GitHub 기여 1,237개, 하루 1만~2만 줄 단독 작성.
- 필요 환경: Claude Code, Git, Bun v1.0+ (Windows는 Node.js).

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 저장소 소개 성격의 글로, 명령어를 실제로 검증하기보다 정리·전달에 초점.

## 6. 관련 연구 (Related Work)

- [[agents/garrytan-gstack]] — 원 저장소
- [[overviews/gstack-ai-software-factory-overview]] — gstack 합성 overview
