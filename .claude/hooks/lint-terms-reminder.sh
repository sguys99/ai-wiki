#!/usr/bin/env bash
# PostToolUse 훅: sources/·wiki/·index.md 를 Write/Edit로 저장하면
# scripts/lint_terms.py (용어집 금지 표기)와 scripts/lint_style.py (교재 문체 규칙)를 돌려
# 위반이 있으면 additionalContext 경고를 주입한다.
# 비차단(non-blocking). 의존성 없음(python3 표준 라이브러리만).
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
export LINT_TERMS_SCRIPT="$HOOK_DIR/../../scripts/lint_terms.py"
export LINT_STYLE_SCRIPT="$HOOK_DIR/../../scripts/lint_style.py"
exec python3 -c '
import sys, json, os, subprocess

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

if not base.lower().endswith(".md"):
    sys.exit(0)
if ".claude" in parts or base == "CLAUDE.md":
    sys.exit(0)
if any(seg.endswith("-figures") for seg in parts):
    sys.exit(0)
if "assets" in parts or "raw" in parts:
    sys.exit(0)
if base.startswith("glossary-"):
    sys.exit(0)
in_target = any(seg in ("sources", "wiki") for seg in parts) or base == "index.md"
if not in_target:
    sys.exit(0)

def run_lint(env_key):
    script = os.environ.get(env_key, "")
    if not script or not os.path.exists(script):
        return []
    try:
        out = subprocess.run(
            [sys.executable, script, "--json", fp],
            capture_output=True, text=True, timeout=30,
        )
        return (json.loads(out.stdout or "{}")).get("warnings") or []
    except Exception:
        return []

term_warnings = run_lint("LINT_TERMS_SCRIPT")
style_warnings = run_lint("LINT_STYLE_SCRIPT")
if not term_warnings and not style_warnings:
    sys.exit(0)

sections = []

if term_warnings:
    lines = [
        "  {}:{}: {} → {} [{}]".format(w["file"], w["line"], repr(w["banned"]), repr(w["canonical"]), w["glossary"])
        for w in term_warnings[:10]
    ]
    more = len(term_warnings) - 10
    if more > 0:
        lines.append("  … 외 {}건".format(more))
    sections.append(
        "용어집 금지 표기(전문 용어 한글 직역) — canonical 표기로 교체하세요 (첫 등장이면 서술형 풀이 유지):\n"
        + "\n".join(lines) + "\n"
        "의도적 예외(직접 인용 등)는 해당 줄에 <!-- lint-terms: ignore --> 주석."
    )

if style_warnings:
    lines = [
        "  {}:{}: [{}] {}".format(w["file"], w["line"], w["severity"], w["msg"])
        for w in style_warnings[:10]
    ]
    more = len(style_warnings) - 10
    if more > 0:
        lines.append("  … 외 {}건".format(more))
    sections.append(
        "교재 문체 규칙 위반 (CLAUDE.md wiki 교재 문체 가이드):\n"
        + "\n".join(lines) + "\n"
        "의도적 예외(직접 인용 등)는 해당 줄에 <!-- lint-style: ignore --> 주석."
    )

msg = "[lint 훅] 방금 저장한 파일에서 위반을 발견했습니다.\n" + "\n\n".join(sections)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": msg,
    }
}, ensure_ascii=False))
'
