---
name: 한글 텍스트 윤문 정책 (2026-09 개정)
description: wiki·sources는 자동 humanize 제외 — 생성 시점 교재 문체 가이드 + lint가 담당. humanize는 명시 요청 시에만.
type: feedback
---

**2026-09-05 정책 개정.** wiki/·sources/·index.md에 저장할 때마다 `humanize-korean`으로 자동 윤문하던 기존 정책(2026-06-06)은 폐지됐다. 자동 윤문이 불릿·표·헤딩을 "AI 티"로 보고 산문으로 녹이고 변경률 20~35%를 강제해, 사용자가 제기한 wiki 품질 문제(줄글화, 압축, 상세도 부족)의 직접 원인이 됐기 때문이다 (진단: `temp-docs/ingest-upgrade-plan.md`).

**현행 정책:**
- `wiki/`·`sources/`·`index.md`: humanize 자동 실행 금지. 품질은 CLAUDE.md "wiki 교재 문체 가이드"(하다체 + 교재식 전개, 중간점·em dash 금지, 불릿·표 적극 사용)를 생성 시점부터 지키고, `scripts/lint_style.py` + `scripts/lint_terms.py`로 검증한다.
- `raw/`: 원저자 원문이므로 어떤 윤문도 하지 않는다 (불변 아카이브).
- humanize-korean은 사용자가 명시적으로 요청할 때만 실행하며, wiki/sources 파일에는 구조 요소(불릿·표·헤딩·임베드)를 삭제하지 않는 조건으로만 적용한다.

**Why:** 사용자가 2026-09-05 wiki 품질 불만(직역투, 짧음, 줄글)을 제기했고 원인 분석 결과 자동 윤문 파이프라인이 주범으로 확정됨. 교재식(wikidocs 톤) 재구성이 새 목표다.

**How to apply:** wiki/sources 파일을 쓰거나 고친 뒤 humanize를 호출하지 말 것. 대신 lint 두 개를 돌려 경고 0을 확인할 것.

관련: [[커밋/푸시 금지]]
