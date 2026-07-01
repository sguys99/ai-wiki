---
title: "Agent Skills (GeekNews)"
type: article
year: 2026
category: agents
source: hada-2026-agent-skills.md
raw_path: raw/articles/hada-2026-agent-skills.md
raw_filename: "hada-2026-agent-skills.md"
source_collection: external
author: "GN⁺ (@neo)"
url: "https://news.hada.io/topic?id=29200"
publisher: "GeekNews (news.hada.io)"
publication_date: "2026-05"
tags: [agent-skills, geeknews, claude-code, cursor, gemini-cli, codex, aider, windsurf, opencode, verification, anti-rationalization, progressive-disclosure, community-discussion]
---

## 요약 (Summary)

Addy Osmani의 "Agent Skills" 글을 GeekNews(news.hada.io) 운영자 GN⁺가 한국어로 요약하고 커뮤니티 토론을 덧붙인 짝 자료다. 원문([[agents/osmani-2026-agent-skills]])의 5개 원칙과 6단계 SDLC를 그대로 정리하면서, 원문에서 흐릿했던 **정량 스펙(Skill 20개·슬래시 커맨드 7개·MIT 라이선스)**과 **이식 경로(Cursor·Gemini CLI·Codex·Aider·Windsurf·OpenCode)**, 무엇보다 **비판적 반론**을 채워 넣었다. 원문이 처방이라면 이 글은 그 처방을 실무 현장에서 두드려 본 반응인 셈이다.

## 주요 기여 (Key Contributions)

- **정량 스펙 명시** — 저장소는 Skill 20개를 6개 단계(Define·Plan·Build·Verify·Review·Ship)로 묶고 슬래시 커맨드 7개를 제공한다. MIT 라이선스로 공개돼 있다.
- **이식 경로 카탈로그** — Claude Code marketplace 말고도 Cursor(`.cursor/rules/`), Gemini CLI, Codex, Aider, Windsurf, OpenCode에 markdown을 직접 넣어 쓸 수 있다.
- **비판적 토론** — 원문이 비껴간 반론을 모았다. LLM은 규칙을 근본적으로 우회하고, 사람 리뷰는 여전히 필수이며, 긴 세션은 *"fake productivity"* 로 보일 수 있다는 것.
- **실무 트레이드오프** — Skill 하나가 800줄을 넘기기도 해 context를 크게 먹는다. 과다 설치는 곧 token 낭비라, 전부 필수로 깔기보다 참고 패턴으로 다루는 편이 낫다. frontmatter만 로드하면 오염이 줄어든다.

## 토론 지형 (Community Discussion)

| 입장 | 요지 |
|---|---|
| **찬성** | 프로덕션에서 *"의외로 효과적"*이다. 완벽보다 expected value가 중요하고, 기준선 신뢰도가 오르는 것만으로도 의미가 있다. 사람 팀을 관리하던 관행이 에이전트에도 통한다. |
| **반대** | 규칙을 지킬지 말지 결정하는 게 LLM 자신이라 강제가 실제로 먹히는지 의문이다. 문서가 복잡해질수록 우회할 여지도 커진다. |
| **중립** | 특정 도구보다 workflow 구조 자체가 중요하다. 인프라·소프트웨어 자동화 원칙과 궤를 같이한다. |

## 핵심 긴장 (Key Tension)

커뮤니티가 짚은 **800줄 Skill·context 오염** 문제는 원문의 **progressive disclosure** 원칙과 정면으로 부딪힌다. Skill을 많이 갖출수록 규율은 촘촘해지지만 그만큼 token이 새어 나간다. frontmatter-only 로딩이 완화책이 되긴 해도, "얼마나 갖추고 얼마나 로드할까"는 Skill 설계에 여전히 풀리지 않은 긴장으로 남는다.

## 관련 페이지 (Related Pages)

- [[agents/osmani-2026-agent-skills]] — 이 자료가 요약하고 토론하는 원문
- [[agents/osmani-2026-loop-engineering]] — 같은 저자의 후속작. Skill을 loop 구성 요소로 확장한다
- [[agents/patel-2026-beyond-the-prompt-claude-code]] — Claude Code verification과 skill의 실전 가이드
- [[agents/lin-2026-harness-updating-is-not-harness-benefit]] — harness 변경의 이득을 회의적으로 재는 시각. GeekNews의 *"규칙 우회"* 회의론과 맞닿는다
