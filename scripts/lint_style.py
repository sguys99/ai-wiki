#!/usr/bin/env python3
"""문체 lint — CLAUDE.md "wiki 교재 문체 가이드"의 기계 검사 가능한 규칙을 검사한다.

sources/·wiki/ 한글 산문에서 다음을 잡는다:
  [error]   중간점(·) 사용 — 키워드 나열은 와/과, 쉼표, 슬래시로
  [error]   em dash(—) 사용 — 쉼표, 괄호, 문장 분리로 대체
  [error]   wiki 본문 헤딩의 영문 병기 (예: "## 요약 (Summary)") — wiki/ 하위만 검사
  [error]   자문자답 패턴 ("~일까?", "~을까?") — 결론 먼저 서술
  [error]   화자 개입 표현 ("한 줄로 말하면", "정리하면" 등)
  [warning] 금지 어휘 (갈래, 차선 대비, 이쪽/그쪽, 실기기 등 실+명사 조어, 돌아간다/돌린다)
  [warning] 큰 수의 k 표기 (130k) — 한국식 단위(13만 개)로
  [warning] 연결어미 뒤 쉼표("-고, / -며, / -지만,") 과다 — 밀도 기준 초과 시 경고
  [warning] paper/report 기반 wiki 페이지에 표 없음 — 구조화 부족 신호

사용:
    python3 scripts/lint_style.py <file> [<file> ...]   # 지정 파일만
    python3 scripts/lint_style.py --all                 # sources/ + wiki/ + index.md 전체
    python3 scripts/lint_style.py --all --strict        # error 1건 이상이면 exit 1
    python3 scripts/lint_style.py --json <file>         # 훅용 JSON 출력
    python3 scripts/lint_style.py --category agents     # 그 카테고리만 (전체 스캔 후 필터)
    python3 scripts/lint_style.py --category a,b <file> [<file> ...]   # 지정 파일 목록을 필터

--category 는 파일 frontmatter의 category: 로 대상을 좁힌다. category: 가 없는 파일은
대상에서 빼되, index.md 만 예외로 "## Agents (agents)" 꼴 절의 라인 범위 경고만 남겨 포함한다.

대상 파일 규약 (lint_terms.py와 동일한 방식):
- frontmatter에 lint_style: false 가 있으면 파일 전체 제외 (원문 인용 보존용 — 남용 금지).
- 줄에 <!-- lint-style: ignore --> 가 있으면 그 줄 제외.
- <!-- lint-style: off --> ~ <!-- lint-style: on --> 블록 제외.
- frontmatter·코드 펜스·인라인 코드·[[wikilink]]·URL 내부는 검사하지 않는다.
- glossary-*.md 는 middot·emdash·banned-vocab 세 규칙만 면제 (금지 표기를 · 로 나열하고
  "검사 없음"을 대시로 적는 규약 파일이라 전량 오탐이다). 헤딩 병기 등 나머지 규칙은 적용한다.

의존성: python3 표준 라이브러리만 (훅에서 .venv 없이 실행).
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

RE_INLINE_CODE = re.compile(r"`[^`]*`")
RE_WIKILINK = re.compile(r"!?\[\[[^\]]*\]\]")
RE_MD_LINK_TARGET = re.compile(r"\]\([^)]*\)")
RE_URL = re.compile(r"https?://\S+")
# 병기 괄호(라틴 문자/숫자만, 한글 없음)는 검사 제외 — "시연 데이터(demonstration)", "약 13만 개(130k)"
# 단 괄호 안에 중간점·em dash가 있으면 마스킹하지 않는다 (금지 기호가 숨지 않게)
RE_LATIN_PAREN = re.compile(r"\([A-Za-z0-9][^)가-힣·—]*\)")

# 한글이 든 헤딩 + 괄호 안 영문 (예: "## 요약 (Summary)")
RE_BILINGUAL_HEADING = re.compile(r"^#{1,6}\s+.*[가-힣].*\(\s*[A-Za-z][^)]*\)\s*$")
# 연결어미 직후 쉼표
RE_CONNECTIVE_COMMA = re.compile(r"(?:고|며|지만|어서|아서),\s")
# 자문자답 ("~일까?", "~을까?", "~할까?")
RE_SELF_QA = re.compile(r"(?:일|을|ㄹ|할)까\?")
# 화자 개입 담화 표지
SPEAKER_INTRUSION = ["한 줄로 말하면", "한 문장으로 줄이면", "한 마디로 말하면",
                     "표에서 읽을 수 있는", "쪽 결론은", "정리하면"]
# 금지 어휘 (기계 검사 가능한 부분집합 — 판/축/벌/기둥은 오탐이 커서 가이드로만 관리)
RE_BANNED_VOCAB = [
    (re.compile(r"갈래"), "갈래 → 가지"),
    (re.compile(r"차선 대비"), "차선 대비 → 두 번째로 높은 모델 대비"),
    (re.compile(r"이쪽|그쪽"), "이쪽/그쪽 → 지시 대상을 명시"),
    (re.compile(r"실기기|실오브젝트|실데이터|실로봇"), "실+명사 조어 → 실제 기기, 실제 물체, 실제 데이터, 실제 로봇"),
    (re.compile(r"(?<!되)돌아간다|(?<!되)돌린다"), "돌다/돌리다 → 실행되다, 구동하다"),
]
# 큰 수의 k 표기 (130k 등)
RE_K_NUMBER = re.compile(r"\b[0-9][0-9,.]*k\b")

# 연결어미 뒤 쉼표는 자연스러운 한국어에도 있으므로 절대 개수가 아니라 밀도로 판정한다.
CONNECTIVE_COMMA_MIN_HITS = 8        # 이 미만이면 경고 안 함
CONNECTIVE_COMMA_PER_1000 = 3.0      # 본문 1,000자당 이 밀도 초과 시 경고


def parse_frontmatter(lines):
    if not lines or lines[0].strip() != "---":
        return {}, 0
    fm = {}
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return fm, i + 1
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", line)
        if m:
            fm[m.group(1)] = m.group(2).strip()
    return fm, 0


def collect_targets(root, args_files, scan_all):
    targets = []
    if scan_all:
        targets += sorted(root.glob("sources/*.md"))
        targets += sorted(root.glob("wiki/**/*.md"))
        idx = root / "index.md"
        if idx.exists():
            targets.append(idx)
    else:
        targets = [Path(f).resolve() for f in args_files]
    out = []
    for p in targets:
        rel = p.relative_to(root) if p.is_relative_to(root) else p
        s = str(rel)
        if s.startswith("raw/") or s.startswith("wiki/assets/"):
            continue
        out.append(p)
    return out


# ── --category 대상 선택 ────────────────────────────────────────────────
# sources/ 가 flat 구조라 카테고리 판별은 frontmatter category: 로만 가능하다.
# 배치 작업의 완료 게이트가 "이 카테고리만 0건"을 반복 요구해서 인자로 뺐다.

RE_INDEX_SECTION = re.compile(r"^##\s+.*\(([A-Za-z0-9_-]+)\)\s*$")


def parse_categories(values):
    """--category 인자 정규화 → 소문자 집합. 반복 지정과 쉼표 구분을 모두 받는다."""
    names = set()
    for value in values or ():
        for name in value.split(","):
            name = name.strip().strip("'\"").lower()
            if name:
                names.add(name)
    return names


def index_section_ranges(path, categories):
    """index.md 의 카테고리 절 라인 범위 → [(start, end), ...] (1-based, 양끝 포함).

    절 헤딩은 "## Physical AI (physical-ai)" 처럼 괄호 안에 카테고리 slug를 담는다.
    헤딩 라인부터 다음 "## " 헤딩 직전까지가 그 절의 범위다.
    """
    lines = path.read_text(encoding="utf-8").splitlines()
    sections = []
    current = None  # (category, start)
    in_fence = False
    for lineno, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence or not line.startswith("## "):
            continue
        if current is not None:
            sections.append((current[0], current[1], lineno - 1))
            current = None
        m = RE_INDEX_SECTION.match(line)
        if m:
            current = (m.group(1).lower(), lineno)
    if current is not None:
        sections.append((current[0], current[1], len(lines)))
    return [(start, end) for category, start, end in sections if category in categories]


def apply_category_filter(targets, categories, root):
    """대상을 카테고리로 좁힌다 → (파일 목록, {index.md: [(start, end), ...]}).

    파일 frontmatter의 category: 로 판정하고, category: 가 없는 파일은 제외한다.
    index.md 만 예외로 남기되 해당 카테고리 절의 라인 범위 경고만 인정한다 —
    배치 완료 게이트가 "index.md 절 축소"와 "카테고리 lint 0건"을 늘 짝으로 요구해서다.
    """
    kept = []
    index_ranges = {}
    for path in targets:
        rel = str(path.relative_to(root) if path.is_relative_to(root) else path)
        if not path.exists():
            kept.append(path)  # 없는 파일 안내는 호출부가 그대로 담당한다
            continue
        if rel == "index.md":
            ranges = index_section_ranges(path, categories)
            if ranges:
                index_ranges[rel] = ranges
                kept.append(path)
            continue
        fm, _ = parse_frontmatter(path.read_text(encoding="utf-8").splitlines())
        if fm.get("category", "").strip().strip("'\"").lower() in categories:
            kept.append(path)
    return kept, index_ranges


def filter_index_warnings(warnings, index_ranges):
    """index.md 경고를 선택된 절의 라인 범위 안으로 좁힌다. 다른 파일은 그대로 통과."""
    out = []
    for w in warnings:
        ranges = index_ranges.get(w["file"])
        if ranges is None or any(start <= w["line"] <= end for start, end in ranges):
            out.append(w)
    return out


# 본문 규칙용 마스킹 세트 — 병기 괄호까지 지운다.
MASK_PATTERNS = (RE_INLINE_CODE, RE_WIKILINK, RE_MD_LINK_TARGET, RE_URL, RE_LATIN_PAREN)
# 헤딩 병기 규칙용 마스킹 세트 — 인라인 코드만 지운다.
# RE_LATIN_PAREN 이 "## 요약 (Summary)" 의 괄호를 먼저 지워버리면 병기 헤딩이 검출되지 않는다.
MASK_PATTERNS_HEADING = (RE_INLINE_CODE,)


def mask(line, patterns=MASK_PATTERNS):
    for pattern in patterns:
        line = pattern.sub(lambda m: " " * len(m.group(0)), line)
    return line


def lint_file(path, root):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    fm, body_start = parse_frontmatter(lines)
    if fm.get("lint_style", "").lower() == "false":
        return []

    rel = str(path.relative_to(root) if path.is_relative_to(root) else path)
    is_wiki = rel.startswith("wiki/")
    # 용어집은 금지 표기를 · 로 나열하고 "검사 없음"을 대시로 적는 규약 파일이라
    # middot·emdash·banned-vocab 이 전량 오탐이다. 그 셋만 면제하고 나머지는 검사한다.
    is_glossary = bool(re.match(r"wiki/overviews/glossary-.*\.md$", rel))
    ftype = fm.get("type", "").strip().strip("'\"")

    warnings = []
    in_fence = False
    off = False
    connective_hits = []  # (lineno,)
    has_table = False
    body_chars = 0

    for lineno, line in enumerate(lines, start=1):
        if lineno <= body_start:
            continue
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if "lint-style: off" in line:
            off = True
            continue
        if "lint-style: on" in line:
            off = False
            continue
        if off or "lint-style: ignore" in line:
            continue

        if stripped.startswith("|"):
            has_table = True

        masked = mask(line)
        # 헤딩 병기 검사만 라틴 괄호를 남긴 라인으로 한다 (위 MASK_PATTERNS_HEADING 주석 참고).
        masked_heading = mask(line, MASK_PATTERNS_HEADING)
        body_chars += len(stripped)

        if "·" in masked and not is_glossary:
            warnings.append({
                "file": rel, "line": lineno, "severity": "error", "rule": "middot",
                "msg": "중간점(·) 금지 — 와/과, 쉼표, 슬래시로 나열",
            })
        if "—" in masked and not is_glossary:
            warnings.append({
                "file": rel, "line": lineno, "severity": "error", "rule": "emdash",
                "msg": "em dash(—) 금지 — 쉼표, 괄호, 문장 분리로 대체",
            })
        if is_wiki and RE_BILINGUAL_HEADING.match(masked_heading):
            warnings.append({
                "file": rel, "line": lineno, "severity": "error", "rule": "bilingual-heading",
                "msg": "헤딩 영문 병기 금지 — 한글 단독 헤딩으로",
            })
        if RE_SELF_QA.search(masked):
            warnings.append({
                "file": rel, "line": lineno, "severity": "error", "rule": "self-qa",
                "msg": "자문자답(\"~일까?\") 금지 — 결론을 먼저 서술하고 근거를 붙인다",
            })
        for phrase in SPEAKER_INTRUSION:
            if phrase in masked:
                warnings.append({
                    "file": rel, "line": lineno, "severity": "error", "rule": "speaker-intrusion",
                    "msg": f"화자 개입 표현(\"{phrase}\") 금지 — 평서문으로 재작성",
                })
        for pattern, hint in RE_BANNED_VOCAB:
            if pattern.search(masked) and not is_glossary:
                warnings.append({
                    "file": rel, "line": lineno, "severity": "warning", "rule": "banned-vocab",
                    "msg": f"금지 어휘 — {hint}",
                })
        if RE_K_NUMBER.search(masked):
            warnings.append({
                "file": rel, "line": lineno, "severity": "warning", "rule": "k-number",
                "msg": "큰 수의 k 표기 — 한국식 단위로 (130k → 13만 개)",
            })
        for _ in RE_CONNECTIVE_COMMA.finditer(masked):
            connective_hits.append(lineno)

    density = (len(connective_hits) / body_chars * 1000) if body_chars else 0
    if len(connective_hits) >= CONNECTIVE_COMMA_MIN_HITS and density > CONNECTIVE_COMMA_PER_1000:
        warnings.append({
            "file": rel, "line": connective_hits[0], "severity": "warning", "rule": "connective-comma",
            "msg": f"연결어미 뒤 쉼표(-고, / -며, / -지만,)가 {len(connective_hits)}회, 1000자당 {density:.1f}회 — 줄이기",
        })
    if is_wiki and ftype in ("paper", "report") and not has_table:
        warnings.append({
            "file": rel, "line": body_start + 1, "severity": "warning", "rule": "no-table",
            "msg": "paper/report 기반 페이지에 표가 없음 — 비교, 분류, 수치를 표로 구조화 검토",
        })
    return warnings


def main():
    ap = argparse.ArgumentParser(description="wiki 교재 문체 가이드 기반 문체 lint")
    ap.add_argument("files", nargs="*", help="검사할 파일 (생략 시 --all 또는 --category 필요)")
    ap.add_argument("--all", action="store_true", help="sources/ + wiki/ + index.md 전체 검사")
    ap.add_argument("--strict", action="store_true", help="error 1건 이상이면 exit 1")
    ap.add_argument("--json", action="store_true", help="JSON 출력 (훅용)")
    ap.add_argument("--category", action="append", metavar="NAME",
                    help="카테고리로 대상 좁히기 (반복 지정 또는 쉼표 구분). "
                         "파일 목록 없이 쓰면 --all 과 같은 전체 스캔 후 필터")
    args = ap.parse_args()

    categories = parse_categories(args.category)
    if not args.files and not args.all and not categories:
        ap.error("검사할 파일을 지정하거나 --all 또는 --category 를 쓰세요.")

    # --category 만 준 경우도 전체 스캔 후 필터 — 파일 목록과 함께면 그 목록을 필터한다.
    targets = collect_targets(REPO_ROOT, args.files, args.all or (bool(categories) and not args.files))
    index_ranges = {}
    if categories:
        targets, index_ranges = apply_category_filter(targets, categories, REPO_ROOT)
        if not targets:
            print(f"[lint_style] 대상 파일이 없습니다 (category: {', '.join(sorted(categories))}).",
                  file=sys.stderr)
    all_warnings = []
    for path in targets:
        if not path.exists():
            print(f"[lint_style] 파일 없음: {path}", file=sys.stderr)
            continue
        all_warnings += lint_file(path, REPO_ROOT)

    if index_ranges:
        all_warnings = filter_index_warnings(all_warnings, index_ranges)

    errors = [w for w in all_warnings if w["severity"] == "error"]

    if args.json:
        print(json.dumps({"warnings": all_warnings, "count": len(all_warnings),
                          "errors": len(errors)}, ensure_ascii=False))
    else:
        for w in all_warnings:
            print(f"{w['file']}:{w['line']}: [{w['severity']}] {w['msg']} ({w['rule']})")
        per_file = {}
        for w in all_warnings:
            per_file[w["file"]] = per_file.get(w["file"], 0) + 1
        print(f"\n검사 파일 {len(targets)}개, error {len(errors)}건, warning {len(all_warnings) - len(errors)}건, 해당 파일 {len(per_file)}개")

    if args.strict and errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
