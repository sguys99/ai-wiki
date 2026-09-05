#!/usr/bin/env bash
# PostToolUse 훅: sources/·wiki/·index.md 를 Write/Edit로 저장하면
# CLAUDE.md "wiki 교재 문체 가이드" 준수 리마인더(additionalContext)를 에이전트에 주입한다.
# 2026-09 정책 변경: wiki/·sources/는 humanize-korean 자동 윤문 대상에서 제외됐다.
#   (자동 윤문의 구조 파괴가 줄글화·압축의 원인이었음 — temp-docs/ingest-upgrade-plan.md 참고)
#   humanize는 사용자가 명시적으로 요청할 때만 실행한다.
# 비차단(non-blocking) — 컨텍스트만 추가하므로 무한 루프를 만들지 않는다.
# 의존성 없음(python3 표준 라이브러리만). jq 불필요.
# 주의: `python3 -c` 로 실행해야 stdin(파이프된 훅 JSON)이 프로그램에 전달된다.
exec python3 -c '
import sys, json

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

fp = (data.get("tool_input") or {}).get("file_path") or ""
if not fp:
    sys.exit(0)

path = fp.replace("\\", "/")
parts = path.split("/")
base = parts[-1] if parts else ""

# .md 만 대상
if not base.lower().endswith(".md"):
    sys.exit(0)

# 제외: .claude/ 내부, CLAUDE.md, *-figures/ 아카이브, assets/ 사본, raw/ (원문 불변 — 윤문 대상 아님)
if ".claude" in parts:
    sys.exit(0)
if base == "CLAUDE.md":
    sys.exit(0)
if any(seg.endswith("-figures") for seg in parts):
    sys.exit(0)
if "assets" in parts or "raw" in parts:
    sys.exit(0)

# 포함: sources/ · wiki/ 하위, 또는 저장소 루트 index.md
in_target_dir = any(seg in ("sources", "wiki") for seg in parts)
is_index = base == "index.md"
if not (in_target_dir or is_index):
    sys.exit(0)

msg = (
    "[문체 훅] 방금 한글 위키 파일을 저장했습니다: " + path + "\n"
    "이 저장소의 sources/·wiki/ 한글 산문은 CLAUDE.md의 **wiki 교재 문체 가이드**를 생성 시점부터 따릅니다. 핵심 점검:\n"
    "- 중간점(·) 0개, em dash(—) 0개 — 키워드 나열은 와/과, 쉼표, 슬래시로.\n"
    "- 헤딩은 한글 단독 (영문 병기 금지, wiki 본문 기준). 문단은 1~3문장으로 짧게.\n"
    "- 항목 3개 이상 열거는 불릿/표로. 비교·수치는 표 우선. 논문 기반 페이지에 표 0개면 구조화 부족.\n"
    "- wiki 본문이 같은 stem의 sources 본문보다 짧으면 정보를 잃은 것 — 교재식 재구성으로 보강.\n"
    "- 검증: .venv/bin/python scripts/lint_style.py <파일> 과 scripts/lint_terms.py <파일> 를 실행해 경고 0 확인.\n"
    "- humanize-korean 자동 실행은 하지 마세요. wiki/·sources/는 자동 윤문 제외 대상입니다 (사용자 명시 요청 시에만)."
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": msg,
    }
}, ensure_ascii=False))
'
