#!/usr/bin/env bash
# PostToolUse 훅: ai-wiki의 한글 산문(.md)을 Write/Edit로 저장하면
# humanize-korean 스킬로 윤문하라는 리마인더(additionalContext)를 에이전트에 주입한다.
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

# 제외: .claude/ 내부, CLAUDE.md, *-figures/ 아카이브, assets/ 사본
if ".claude" in parts:
    sys.exit(0)
if base == "CLAUDE.md":
    sys.exit(0)
if any(seg.endswith("-figures") for seg in parts):
    sys.exit(0)
if "assets" in parts:
    sys.exit(0)

# 포함: raw/ · sources/ · wiki/ 하위, 또는 저장소 루트 index.md
in_target_dir = any(seg in ("raw", "sources", "wiki") for seg in parts)
is_index = base == "index.md"
if not (in_target_dir or is_index):
    sys.exit(0)

# wiki/·sources/ 하위는 기술 위키 register(strict) 대상
is_wiki_register = any(seg in ("wiki", "sources") for seg in parts)

if is_wiki_register:
    register_line = (
        "- 이 파일은 wiki/·sources/ 기술 산문이므로 humanize-korean을 **`register: wiki` (strict 모드)** 로 실행하세요. "
        "strict 5인 파이프라인이 독립 탐지·자연성 리뷰로 티 잔존과 과윤문(문학체 어휘)을 둘 다 잡고, "
        "변경률 밴드 20~35%로 문단 흐름까지 복원합니다. Fast Path(monolith)는 wiki 산문에 부적합합니다.\n"
        "- 윤문 전 대상 category의 도메인 용어집(wiki/overviews/glossary-*.md)을 로드하세요.\n"
    )
else:
    register_line = (
        "- humanize-korean 스킬을 이 파일에 실행하세요(일반 Fast 모드로 충분).\n"
    )

msg = (
    "[humanize 훅] 방금 한글 위키 파일을 저장했습니다: " + path + "\n"
    "이 저장소 정책상 raw/·sources/·wiki/·index.md 의 한글 산문은 "
    "humanize-korean 스킬로 윤문해 AI 티(번역투·기계적 병렬·접속사 남발 등)를 제거해야 합니다.\n"
    "다음을 지키세요:\n"
    "- 아직 이 파일을 이번 턴에 윤문하지 않았다면 아래 지침대로 실행하세요.\n"
    + register_line +
    "- 의미 불변: 사실·수치·고유명사·인용·YAML frontmatter key·파일명·영문 기술용어(RAG, Transformer 등)와 wiki/overviews/glossary-*.md 등재 canonical 표기는 절대 변경 금지. 반대로 용어집 등재어의 한글 직역(정책·보상·관측 등)을 발견하면 원어로 복원하세요(B-5). 산문 문체·리듬만 다듬습니다.\n"
    "- 이미 이번 턴에 윤문을 마친 파일이면 추가 작업 없이 넘어가세요(중복 윤문 방지)."
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": msg,
    }
}, ensure_ascii=False))
'
