#!/usr/bin/env python3
r"""index.md 카탈로그 lint — 홈 카드 파서(site/lib/content.mjs)가 읽는 한 줄 문법을 작성 시점에 검사한다.

정본 문법 (index.md 상단 안내와 동일):
    - [[category/stem|표시 이름]]: 한 줄 설명 (YYYY, type)

  [error]   entry-unparsed          절 안의 `- [[` 줄이 머리 문법에 맞지 않음 (홈 카드에서 통째로 빠진다)
  [error]   entry-separator         구분자가 `]]: ` 가 아님 (em dash 레거시)
  [error]   entry-tail              `(YYYY, type)` 꼬리가 없거나 type 이 허용값 밖
  [error]   entry-length            `- ` 포함 200자 초과 (index 는 카탈로그다. 두 번째 wiki 가 아니다)
  [error]   entry-section-mismatch  링크의 category 가 절 slug 와 다름 (페이지 이동 뒤 남는 오류)
  [warning] section-empty           절에 항목이 0개인데 wiki/{slug}/ 에 페이지가 있음
  [warning] page-uncataloged        wiki 페이지가 어느 절에도 없음

기호(·, —)는 lint_style.py 가, 링크 대상 실재는 lint_links.py 가 index.md 에 이미 적용하므로 여기서
다시 검사하지 않는다.

배경: 2026-09 구분자를 ` — ` 에서 `]]: ` 로 바꿨을 때 사이트 파서가 옛 문법만 알아 홈 카드 254개 중
12개만 남았다. 파서는 이제 둘 다 받지만 정본은 `]]: ` 하나다. 문법을 바꾸면 이 스크립트와
site/lib/content.mjs, index.md 상단 안내를 같이 고친다. 배포 빌드(`npm run build:deploy`)는 STRICT=1 로
같은 조건 중 unparsed 와 section-empty 를 실패로 다룬다.

사용:
    python3 scripts/lint_index.py                     # index.md 전체
    python3 scripts/lint_index.py --all               # 같음 (다른 lint 와 인자 맞춤)
    python3 scripts/lint_index.py --strict            # error 1건 이상이면 exit 1
    python3 scripts/lint_index.py --category agents   # 그 절만 (반복 지정 또는 쉼표 구분)
    python3 scripts/lint_index.py --json              # 훅용 JSON 출력

의존성: python3 표준 라이브러리만 (훅에서 .venv 없이 실행).
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
INDEX_REL = "index.md"
MAX_LEN = 200
TYPES = ("paper", "repo", "article", "report", "video", "book", "lecture", "overview")

# `## Label (slug)` 절 헤더. content.mjs 의 SECTION_RE 와 같다.
RE_SECTION = re.compile(r"^##\s+(.+?)\s+\(([a-z0-9-]+)\)\s*$")
# 항목 후보. `- [[` 로 시작하면 카탈로그 항목이어야 한다.
RE_CANDIDATE = re.compile(r"^- \[\[")
# 머리: 링크(category/stem|표시 이름), 구분자(: 또는 레거시 —), 나머지. content.mjs 의 CATALOG_HEAD_RE.
RE_HEAD = re.compile(r"^- \[\[([^/\]|]+)/([^|\]]+?)(?:\|(.+?))?\]\]\s*(:|—)\s*(.*)$")
# 꼬리: 설명 + (YYYY, type). content.mjs 의 CATALOG_TAIL_RE.
RE_TAIL = re.compile(r"^(.*?)\s*\((\d{4}),\s*([^)]+)\)\s*$")


def parse_categories(values):
    """--category 인자 정규화 → 소문자 집합. 반복 지정과 쉼표 구분을 모두 받는다."""
    names = set()
    for value in values or ():
        for name in value.split(","):
            name = name.strip().strip("'\"").lower()
            if name:
                names.add(name)
    return names


def wiki_pages(root):
    """wiki/{category}/{stem}.md → {category: {stem, ...}}. assets/ 는 뺀다."""
    pages = {}
    for path in sorted(root.glob("wiki/*/*.md")):
        if "assets" in path.parts:
            continue
        pages.setdefault(path.parent.name, set()).add(path.stem)
    return pages


def lint_index(text, pages, categories):
    """index.md 본문 → 경고 목록. categories 가 비어 있지 않으면 그 절의 경고만 낸다."""
    warnings = []
    lines = text.splitlines()
    current = None  # (label, slug, header_lineno)
    in_fence = False
    section_line = {}  # slug → 헤더 줄 번호
    entry_count = {}  # slug → 파싱된 항목 수
    cataloged = set()  # "category/stem"

    def selected(slug):
        return not categories or slug in categories

    def warn(lineno, severity, rule, msg):
        warnings.append({"file": INDEX_REL, "line": lineno, "severity": severity,
                         "rule": rule, "msg": msg})

    for lineno, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if line.startswith("## "):
            m = RE_SECTION.match(line)
            if m:
                current = (m.group(1).strip(), m.group(2).lower(), lineno)
                section_line[current[1]] = lineno
                entry_count.setdefault(current[1], 0)
            else:
                current = None
            continue
        if current is None or not RE_CANDIDATE.match(line):
            continue

        label, slug, _ = current
        head = RE_HEAD.match(line)
        if not head:
            if selected(slug):
                warn(lineno, "error", "entry-unparsed",
                     "항목이 `- [[category/stem|표시 이름]]: 설명 (YYYY, type)` 문법에 맞지 않음. "
                     "사이트 홈 카드에서 빠진다")
            continue

        category, stem, _display, sep, rest = head.groups()
        entry_count[slug] += 1
        cataloged.add(f"{category}/{stem.strip()}")
        if not selected(slug):
            continue

        if sep != ":":
            warn(lineno, "error", "entry-separator",
                 f"구분자 `]] {sep} ` 는 레거시. `]]: ` 로 통일")
        tail = RE_TAIL.match(rest)
        if not tail:
            warn(lineno, "error", "entry-tail",
                 "`(YYYY, type)` 꼬리 없음. 카드 메타는 frontmatter 로 폴백하지만 정본 문법 위반")
        else:
            kind = tail.group(3).strip()
            if kind not in TYPES:
                warn(lineno, "error", "entry-tail",
                     f"type '{kind}' 은 허용값 밖. {', '.join(TYPES)} 중 하나로")
        if len(line) > MAX_LEN:
            warn(lineno, "error", "entry-length",
                 f"{len(line)}자. `- ` 포함 {MAX_LEN}자 이내로 (세부는 wiki 페이지가 맡는다)")
        if category.lower() != slug:
            warn(lineno, "error", "entry-section-mismatch",
                 f"[[{category}/{stem.strip()}]] 이 '{label}' ({slug}) 절에 있음. "
                 f"절을 옮기거나 링크의 category 를 맞춘다")

    for slug, count in entry_count.items():
        if not selected(slug):
            continue
        have = len(pages.get(slug, ()))
        if count == 0 and have:
            warn(section_line[slug], "warning", "section-empty",
                 f"'{slug}' 절에 파싱된 항목이 0개인데 wiki/{slug}/ 에 페이지 {have}개. "
                 f"홈 밴드가 '자료 없음' 으로 렌더된다")

    for slug, stems in sorted(pages.items()):
        if not selected(slug):
            continue
        for stem in sorted(stems):
            if f"{slug}/{stem}" not in cataloged:
                warn(section_line.get(slug, 0), "warning", "page-uncataloged",
                     f"wiki/{slug}/{stem}.md 가 index.md 어느 절에도 없음")

    return warnings


def main():
    ap = argparse.ArgumentParser(description="index.md 카탈로그 항목 문법 lint")
    ap.add_argument("--all", action="store_true",
                    help="index.md 전체 검사 (기본 동작과 같다. 다른 lint 와 인자를 맞추기 위한 옵션)")
    ap.add_argument("--strict", action="store_true", help="error 1건 이상이면 exit 1")
    ap.add_argument("--json", action="store_true", help="JSON 출력 (훅용)")
    ap.add_argument("--category", action="append", metavar="NAME",
                    help="검사할 절을 카테고리 slug 로 좁히기 (반복 지정 또는 쉼표 구분)")
    args = ap.parse_args()

    index_path = REPO_ROOT / INDEX_REL
    if not index_path.exists():
        print(f"[lint_index] 파일 없음: {index_path}", file=sys.stderr)
        sys.exit(2)

    categories = parse_categories(args.category)
    text = index_path.read_text(encoding="utf-8")
    all_warnings = lint_index(text, wiki_pages(REPO_ROOT), categories)
    errors = [w for w in all_warnings if w["severity"] == "error"]

    if args.json:
        print(json.dumps({"warnings": all_warnings, "count": len(all_warnings),
                          "errors": len(errors)}, ensure_ascii=False))
    else:
        for w in all_warnings:
            print(f"{w['file']}:{w['line']}: [{w['severity']}] {w['msg']} ({w['rule']})")
        by_rule = {}
        for w in all_warnings:
            by_rule[w["rule"]] = by_rule.get(w["rule"], 0) + 1
        if by_rule:
            print("\nrule별: " + ", ".join(f"{k} {v}건" for k, v in sorted(by_rule.items())))
        scope = f"절 {', '.join(sorted(categories))}" if categories else "전체"
        print(f"index.md {scope}, error {len(errors)}건, warning {len(all_warnings) - len(errors)}건")

    if args.strict and errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
