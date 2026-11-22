#!/usr/bin/env bash
# PostToolUse 훅: sources/·wiki/·index.md 를 Write/Edit 또는 apply_patch로 저장하면
# scripts/lint_terms.py (용어집 금지 표기)와 scripts/lint_style.py (교재 문체 규칙)를 돌려
# 위반이 있을 때만 additionalContext 경고를 주입한다.
#
# 2026-09 통합: humanize-reminder.sh 와 lint-terms-reminder.sh 를 하나로 합쳤다.
#   - 옛 humanize-reminder.sh 는 위반 0건에도 무조건 6줄을 주입해 배치 작업에서 같은 메시지가 N번 쌓였고,
#     그 내용은 CLAUDE.md·write-wiki 스킬에 이미 있는 것의 축약본이었다.
#   - wiki/·sources/ 는 humanize-korean 자동 윤문 대상이 아니다 (.claude/memory/feedback_no_auto_humanize.md).
#     품질은 write-wiki 스킬의 문체 가이드와 이 lint 두 개가 담당한다.
#
# 비차단(non-blocking). 의존성 없음(python3 표준 라이브러리만). jq 불필요.
# 주의: `python3 -c` 로 실행해야 stdin(파이프된 훅 JSON)이 프로그램에 전달된다.
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
export LINT_TERMS_SCRIPT="$HOOK_DIR/../../scripts/lint_terms.py"
export LINT_STYLE_SCRIPT="$HOOK_DIR/../../scripts/lint_style.py"
exec python3 -c '
import sys, json, os, subprocess
from pathlib import Path

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_input = data.get("tool_input") or {}
if data.get("tool_name") == "apply_patch":
    # 패치 본문 줄은 공백이나 +/-로 시작하므로 헤더와 구분된다.
    headers = ("*** Add File: ", "*** Update File: ", "*** Move to: ")
    names = [line.split(": ", 1)[1] for line in tool_input.get("command", "").splitlines()
             if line.startswith(headers)]
else:
    names = [tool_input.get("file_path", "")]

root = Path(os.environ["LINT_STYLE_SCRIPT"]).resolve().parents[1]
cwd = Path(data.get("cwd") or os.getcwd())
files = []
for name in names:
    path = (cwd / name).resolve()
    if path.suffix.lower() != ".md" or not path.is_relative_to(root) or not path.is_file():
        continue
    rel = path.relative_to(root)
    if rel.parts[0] not in ("sources", "wiki") and rel != Path("index.md"):
        continue
    if "assets" in rel.parts or any(part.endswith("-figures") for part in rel.parts):
        continue
    if path not in files:
        files.append(path)

def run_lint(env_key, paths):
    script = os.environ.get(env_key, "")
    if not paths or not script or not os.path.exists(script):
        return []
    try:
        out = subprocess.run(
            [sys.executable, script, "--json", *paths],
            capture_output=True, text=True, timeout=30,
        )
        return (json.loads(out.stdout or "{}")).get("warnings") or []
    except Exception:
        return []

# 용어집 본인은 금지 표기 열에 금지 표기를 싣고 있으므로 lint_terms 대상에서 뺀다.
# lint_style 은 용어집 예외(중간점·em dash·금지 어휘 면제)를 스스로 처리하므로 그대로 돌린다.
term_warnings = run_lint("LINT_TERMS_SCRIPT", [p for p in files if not p.name.startswith("glossary-")])
style_warnings = run_lint("LINT_STYLE_SCRIPT", files)

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
        "교재 문체 규칙 위반 (규칙 정본은 write-wiki 스킬):\n"
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
