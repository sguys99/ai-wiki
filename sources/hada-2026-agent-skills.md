---
title: "Agent Skills (GeekNews)"
type: article
year: 2026
category: agents
raw_path: raw/articles/hada-2026-agent-skills.md
raw_filename: "hada-2026-agent-skills.md"
source_collection: external
author: "GN⁺ (@neo)"
url: "https://news.hada.io/topic?id=29200"
publisher: "GeekNews (news.hada.io)"
publication_date: "2026-05"
tags: [agent-skills, geeknews, claude-code, cursor, gemini-cli, codex, aider, windsurf, opencode, verification, anti-rationalization, progressive-disclosure, community-discussion]
---

## 한 줄 요약 (One-line Summary)

Addy Osmani의 "Agent Skills" 글을 GeekNews(news.hada.io) 운영자 GN⁺가 한국어로 옮겨 요약하고 커뮤니티 토론을 붙인 짝 자료다. 원문 요약에 더해 **20개 Skill / 6단계 / 7개 슬래시 커맨드, MIT 라이선스, Cursor·Gemini CLI·Codex·Aider·Windsurf·OpenCode 이식 경로** 같은 구체 정보, 그리고 *"LLM은 문서가 아무리 정교해도 규칙을 우회한다"* 는 회의론까지 담아 원문이 비워 둔 자리를 채운다.

## 1. 자료 정보 (Document Information)

- **작성**: GN⁺ (@neo) — GeekNews 운영자
- **매체**: GeekNews (news.hada.io), topic id=29200
- **게시**: 약 2달 전 (2026-05경), 10 point
- **원문**: Addy Osmani, *Agent Skills* (https://addyosmani.com/blog/agent-skills/) → [[agents/osmani-2026-agent-skills]]
- **성격**: 커뮤니티 큐레이션 요약 + 댓글 토론

## 2. 주요 기여 (Key Contributions)

원문에 없던(또는 요약에서 명시화된) 정보를 커뮤니티 관점으로 보탠다.

1. **정량 스펙 명시** — 저장소는 Skill 20개를 6개 lifecycle 단계(Define·Plan·Build·Verify·Review·Ship)로 묶고 슬래시 커맨드 7개를 제공한다. 공개 라이선스는 MIT다.
2. **이식 경로 카탈로그** — Claude Code marketplace 말고도 Cursor(`.cursor/rules/`), Gemini CLI, Codex, Aider, Windsurf, OpenCode에 markdown을 그대로 넣어 쓸 수 있다.
3. **비판적 토론 수집** — 원문이 건드리지 않은 반론을 모았다. LLM은 규칙을 근본적으로 우회하고, 사람 리뷰는 여전히 필수이며, 긴 세션은 *"fake productivity"* 로 비칠 수 있다는 것.
4. **실무 트레이드오프** — Skill 하나가 800줄을 넘기도 해 context를 꽤 잡아먹는다. 필요도 없는 Skill을 잔뜩 깔면 token만 낭비되니, *"완전한 필수 설치보다 참고 패턴으로 다루는 편이 낫다."* frontmatter만 로드하면 오염이 어느 정도 줄어든다.

## 3. 방법론 및 아키텍처 (Methodology and Architecture)

Skill 구조 자체는 원문과 같지만, GeekNews 요약이 한결 또렷하게 정리했다.

- **Skill = frontmatter 붙은 markdown workflow** — 참고 문서가 아니라 순서 있는 step, 증거를 남기는 checkpoint, 명시적 exit criteria를 담은 실행 단위다.
- **5개 핵심 원칙** — process over prose, anti-rationalization table, non-negotiable verification, progressive disclosure, scope discipline. (원문과 동일)
- **Google SDLC 정합** — Hyrum's Law, TDD, Chesterton's Fence, trunk-based development, ~100줄 PR, code-as-liability 원칙에 매핑.

## 4. 주요 결과와 벤치마크 (Key Results and Benchmarks)

정량 벤치마크는 없다. 대신 실무자 증언과 토론이 결과를 대신한다.

- **찬성 측** — 프로덕션 배포에서 *"의외로 효과적"* 이라는 보고가 나온다. 완벽보다 기대값(expected value)이 중요하고, 기준선 신뢰도가 올라가는 것만으로도 의미가 있다는 것. 사람 팀을 관리하던 관행이 에이전트에도 그대로 통한다.
- **반대 측** — 규칙을 지킬지 말지 결정하는 주체가 LLM 자신이다 보니, 강제가 실제로 먹히는지가 의문이다. 문서가 복잡해질수록 우회할 여지도 넓어진다.
- **중립 관찰** — 특정 도구보다 workflow 구조 자체가 중요하다는 시각. 인프라·소프트웨어의 자동화 원칙과 궤를 같이한다.

## 5. 한계와 향후 과제 (Limitations and Future Work)

- 2차 요약이다 보니 원문의 논증 결이 압축되어, 인용의 정확한 문맥은 원문([[agents/osmani-2026-agent-skills]])을 봐야 한다.
- 댓글 요약은 발화자나 수치가 특정되지 않아, 개별 주장의 출처를 되짚기가 어렵다.
- 커뮤니티가 짚은 800줄·context 오염 문제는 progressive disclosure 원칙과 정면으로 부딪친다. Skill 설계에서 아직 풀리지 않은 긴장이다.

## 6. 관련 연구 (Related Work)

- [[agents/osmani-2026-agent-skills|Agent Skills (Osmani 원문)]] — 이 자료가 요약·토론하는 대상.
- [[agents/osmani-2026-loop-engineering|Loop Engineering (Osmani)]] — 같은 저자의 후속작. Skill을 loop 구성 요소로 확장.
- [[agents/patel-2026-beyond-the-prompt-claude-code|Beyond the Prompt (Patel)]] — Claude Code verification·skill 실전 가이드.
- [[agents/lin-2026-harness-updating-is-not-harness-benefit|Harness Updating Is Not Harness Benefit (Lin)]] — harness 변경의 이득을 회의적으로 계측하는 시각. GeekNews의 *"규칙 우회"* 회의론과 통한다.

## 7. 용어집 (Glossary)

- **GeekNews (news.hada.io)** — 한국 개발자 커뮤니티 뉴스 큐레이션 사이트. GN⁺(@neo)가 운영.
- **Anti-rationalization table** — shortcut 변명과 반박을 미리 짝지어 둔 표.
- **Progressive disclosure** — 필요한 Skill만 맥락에 맞춰 로드해 context를 아끼는 방식.
- **fake productivity** — 긴 에이전트 세션이 실제 성과 없이 바빠 보이기만 하는 현상을 가리키는 토론 용어다.
- **code-as-liability** — 코드는 자산이 아니라 유지·리뷰 부담이라는 Google 관점.
