---
name: 모든 한글 텍스트 humanize 윤문
description: raw·sources·wiki·index 등 모든 한글 본문을 작성/수정할 때 별도 지시 없이도 humanize-korean 스킬로 윤문한다.
type: feedback
---

raw/·sources/·wiki/·index.md 등 이 저장소에 새로 쓰거나 고치는 모든 한글 텍스트는, 사용자의 별도 지시가 없어도 작성 후 `humanize-korean` 스킬로 윤문하여 AI 티(번역투·기계적 병렬·접속사 남발 등)를 제거한 자연스러운 한국어로 만든다.

**Why:** 사용자가 위키 본문이 사람이 쓴 글처럼 자연스럽게 읽히길 원한다. 2026-06-06 `im-not-ai`(Humanize KR) 스킬 설치 직후 이를 상시 적용하라고 지시함.

**How to apply:**
- wiki/sources/index 등 한글 본문 초안을 만든 뒤, 최종 저장 전에 humanize-korean으로 한 번 윤문(≤5,000자 Fast, 긴 글은 `--strict`).
- 의미 불변 철칙 준수 — 사실·수치·고유명사·인용·YAML 식별자·기술 용어(RAG, Transformer 등 영문)는 절대 변경 금지. 문체·리듬만 다듬는다.
- 코드·YAML frontmatter key·파일명 같은 식별자에는 적용하지 않는다(본문 산문에만).
- 관련: [[커밋/푸시 금지]]
