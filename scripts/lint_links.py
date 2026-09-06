#!/usr/bin/env python3
r"""링크 lint — [[wikilink]] 와 ![[이미지 임베드]] 가 실재하는 파일로 풀리는지 검사한다.

sources/·wiki/·index.md 본문에서 다음을 잡는다:
  [error]   [[category/stem]] 이 wiki/{category}/{stem}.md 로 풀리지 않음
  [warning] [[sources/stem]] 처럼 Obsidian Vault 루트(wiki/) 밖을 가리킴 (파일은 실재)
  [warning] [[stem]] 처럼 category 없는 shortlink (풀리더라도 규약은 category/stem)
  [warning] category 없는 shortlink 가 어느 wiki 페이지로도 풀리지 않음
  [error]   ![[assets/{stem}/figNN.png]] 임베드의 대상 파일이 wiki/ 아래에 없음
  [warning] ![[figNN.png]] 처럼 경로 없는 임베드 (vault 내 동명 파일과 충돌 위험)
  [warning] sources/ 본문에 이미지 임베드 (sources 는 텍스트 메타만 둔다)

wikilink 와 이미지 임베드는 서로 다른 것이라 rule 을 나눴다. [[...]] 는 wiki 페이지를
가리키는 링크고, ![[...]] 는 wiki/assets/ 아래 파일을 그 자리에 그리는 임베드다.
같은 rule 로 묶으면 "링크가 깨졌다"와 "이미지 파일이 없다"가 한 통에 섞인다.

사용:
    python3 scripts/lint_links.py <file> [<file> ...]   # 지정 파일만
    python3 scripts/lint_links.py --all                 # sources/ + wiki/ + index.md 전체
    python3 scripts/lint_links.py --all --strict        # error 1건 이상이면 exit 1
    python3 scripts/lint_links.py --json <file>         # 훅용 JSON 출력
    python3 scripts/lint_links.py --category agents     # 그 카테고리만 (전체 스캔 후 필터)
    python3 scripts/lint_links.py --category a,b <file> [<file> ...]   # 지정 파일 목록을 필터

--category 는 파일 frontmatter의 category: 로 대상을 좁힌다. category: 가 없는 파일은
대상에서 빼되, index.md 만 예외로 "## Agents (agents)" 꼴 절의 라인 범위 경고만 남겨 포함한다.

대상 파일 규약 (lint_style.py·lint_terms.py와 동일한 방식):
- frontmatter에 lint_links: false 가 있으면 파일 전체 제외.
- 줄에 <!-- lint-links: ignore --> 가 있으면 그 줄 제외.
- <!-- lint-links: off --> ~ <!-- lint-links: on --> 블록 제외.
- frontmatter·코드 펜스·인라인 코드·URL 내부는 검사하지 않는다. 링크 문법을 설명하는
  글이 `[[slug]]` 처럼 인라인 코드로 적는 관행에 기대는 부분이라, 백틱 밖 예시는
  shortlink 경고로 남는다 (오탐이면 그 줄에 ignore 주석을 단다).

링크 해석 규칙:
- [[category/stem]] · [[category/stem|표시명]] · [[category/stem#헤딩]] 모두 같은 대상.
- 표 안의 별칭은 |가 셀 구분자와 겹쳐 \| 로 이스케이프한다 — 벗기고 본다.
- 확장자 .md 는 붙어 있어도 벗겨서 본다.
- Vault 루트는 wiki/ 다. sources/... 나 ../../sources/... 는 Obsidian 에서 풀리지 않지만
  파일 자체는 실재하므로 깨진 링크와 구분해 link-outside-vault 로 따로 센다.
- 임베드 경로는 wiki 루트 기준이다 — assets/{stem}/figNN.png → wiki/assets/{stem}/figNN.png.

의존성: python3 표준 라이브러리만 (훅에서 .venv 없이 실행).
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

RE_INLINE_CODE = re.compile(r"`[^`]*`")
RE_URL = re.compile(r"https?://\S+")
# [[...]] 와 ![[...]] 를 한 번에 잡고 앞의 ! 유무로 임베드인지 링크인지 가른다.
RE_LINK = re.compile(r"(!?)\[\[([^\[\]]+)\]\]")


def parse_frontmatter(lines):
    """단순 key: value frontmatter 파싱. (dict, 본문 시작 줄 index) 반환."""
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
    """index.md 의 카테고리 절 라인 범위 → [(start, end), ...] (1-based, 양끝 포함)."""
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
    """대상을 카테고리로 좁힌다 → (파일 목록, {index.md: [(start, end), ...]})."""
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


def mask(line):
    """검사 제외 구간을 공백으로 치환(offset 보존)."""
    for pattern in (RE_INLINE_CODE, RE_URL):
        line = pattern.sub(lambda m: " " * len(m.group(0)), line)
    return line


def build_page_index(root):
    """wiki 페이지 색인 → (경로 집합 "category/stem", {stem: [category, ...]})."""
    full = set()
    by_stem = {}
    for path in sorted(root.glob("wiki/*/*.md")):
        if "assets" in path.parts:
            continue
        category = path.parent.name
        full.add(f"{category}/{path.stem}")
        by_stem.setdefault(path.stem, []).append(category)
    return full, by_stem


def normalize_link(target):
    r"""[[...]] 안쪽 → 링크 경로. |표시명, #헤딩, ^블록, .md 를 벗긴다.

    마크다운 표 안에서는 별칭 구분자 | 가 셀 구분자와 겹쳐 \| 로 이스케이프된다.
    그대로 자르면 경로 끝에 역슬래시가 남아 전부 미해석으로 오탐한다.
    """
    target = target.split("|", 1)[0].rstrip("\\")
    target = target.split("#", 1)[0]
    target = target.split("^", 1)[0]
    target = target.strip().strip("/")
    if target.lower().endswith(".md"):
        target = target[:-3]
    return target


def lint_file(path, root, pages, pages_by_stem):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    fm, body_start = parse_frontmatter(lines)
    if fm.get("lint_links", "").lower() == "false":
        return []

    rel = str(path.relative_to(root) if path.is_relative_to(root) else path)
    is_sources = rel.startswith("sources/")

    warnings = []
    in_fence = False
    off = False

    for lineno, line in enumerate(lines, start=1):
        if lineno <= body_start:
            continue
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if "lint-links: off" in line:
            off = True
            continue
        if "lint-links: on" in line:
            off = False
            continue
        if off or "lint-links: ignore" in line:
            continue

        for m in RE_LINK.finditer(mask(line)):
            is_embed, raw_target = m.group(1) == "!", m.group(2)
            if is_embed:
                warnings += check_embed(rel, lineno, raw_target, root, is_sources)
            else:
                warnings += check_link(rel, lineno, raw_target, root, path.parent,
                                       pages, pages_by_stem)
    return warnings


def check_link(rel, lineno, raw_target, root, from_dir, pages, pages_by_stem):
    target = normalize_link(raw_target)
    if not target:
        return []
    if "/" in target:
        if target in pages:
            return []
        outside = resolve_outside_vault(root, target, from_dir)
        if outside is not None:
            return [{
                "file": rel, "line": lineno, "severity": "warning", "rule": "link-outside-vault",
                "msg": f"[[{target}]] 는 Obsidian Vault 루트(wiki/) 밖의 {outside} 를 가리킴 — "
                       f"파일은 실재하지만 Obsidian 에서는 풀리지 않는다",
            }]
        stem = target.rsplit("/", 1)[-1]
        elsewhere = pages_by_stem.get(stem)
        hint = f" (같은 stem 이 {', '.join(elsewhere)} 에 있음)" if elsewhere else ""
        return [{
            "file": rel, "line": lineno, "severity": "error", "rule": "link-unresolved",
            "msg": f"[[{target}]] 가 wiki/{target}.md 로 풀리지 않음{hint}",
        }]
    # category 가 없는 shortlink. Obsidian 은 풀어주지만 규약은 category/stem 이다.
    found = pages_by_stem.get(target)
    if found:
        return [{
            "file": rel, "line": lineno, "severity": "warning", "rule": "bare-wikilink",
            "msg": f"[[{target}]] 에 category 가 없음 — [[{found[0]}/{target}]] 로 명시"
                   + (f" (동명 페이지 {len(found)}곳: {', '.join(found)})" if len(found) > 1 else ""),
        }]
    return [{
        "file": rel, "line": lineno, "severity": "warning", "rule": "bare-link-unresolved",
        "msg": f"[[{target}]] 가 어느 wiki 페이지로도 풀리지 않음 — 링크가 아니라 문법 설명이면 "
               f"인라인 코드(백틱)로 감싼다",
    }]


def resolve_outside_vault(root, target, from_dir):
    """Vault 루트(wiki/) 밖을 가리키지만 저장소 안에 실재하는 대상 → 저장소 기준 상대경로.

    [[sources/stem]] 이나 [[../../sources/stem]] 처럼 sources 티어를 wikilink 문법으로
    참조한 경우다. Obsidian 은 wikilink 를 Vault 루트 기준으로 풀지만 이런 링크를 쓴 쪽은
    파일 위치 기준으로 적은 경우가 많아 세 기준을 모두 시도한다. 대상이 없으면 None 을
    돌려 일반 미해석으로 넘긴다.
    """
    for base in (root / "wiki", from_dir, root):
        candidate = Path(os.path.normpath(base / f"{target}.md"))
        if candidate.is_relative_to(root) and candidate.exists():
            return str(candidate.relative_to(root))
    return None


def check_embed(rel, lineno, raw_target, root, is_sources):
    target = raw_target.split("|", 1)[0].strip()
    if not target:
        return []
    warnings = []
    if is_sources:
        warnings.append({
            "file": rel, "line": lineno, "severity": "warning", "rule": "sources-embed",
            "msg": f"sources 본문에 이미지 임베드 — sources 는 figures frontmatter 와 "
                   f"\"## 8. 그림 후보\" 표만 둔다 (![[{target}]])",
        })
    if "/" not in target:
        warnings.append({
            "file": rel, "line": lineno, "severity": "warning", "rule": "embed-shortlink",
            "msg": f"![[{target}]] 는 경로 없는 shortlink — vault 내 동명 파일과 충돌 위험, "
                   f"![[assets/{{stem}}/{target}]] 처럼 상대경로로 명시",
        })
        return warnings
    # 임베드 경로는 wiki 루트 기준이다 (Obsidian Vault 루트가 wiki/).
    if not (root / "wiki" / target).exists():
        warnings.append({
            "file": rel, "line": lineno, "severity": "error", "rule": "embed-missing",
            "msg": f"임베드 대상 파일이 없음: wiki/{target}",
        })
    return warnings


def main():
    ap = argparse.ArgumentParser(description="[[wikilink]] 와 이미지 임베드 해석 lint")
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

    pages, pages_by_stem = build_page_index(REPO_ROOT)

    # --category 만 준 경우도 전체 스캔 후 필터 — 파일 목록과 함께면 그 목록을 필터한다.
    targets = collect_targets(REPO_ROOT, args.files, args.all or (bool(categories) and not args.files))
    index_ranges = {}
    if categories:
        targets, index_ranges = apply_category_filter(targets, categories, REPO_ROOT)
        if not targets:
            print(f"[lint_links] 대상 파일이 없습니다 (category: {', '.join(sorted(categories))}).",
                  file=sys.stderr)
    all_warnings = []
    for path in targets:
        if not path.exists():
            print(f"[lint_links] 파일 없음: {path}", file=sys.stderr)
            continue
        all_warnings += lint_file(path, REPO_ROOT, pages, pages_by_stem)

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
        by_rule = {}
        for w in all_warnings:
            per_file[w["file"]] = per_file.get(w["file"], 0) + 1
            by_rule[w["rule"]] = by_rule.get(w["rule"], 0) + 1
        if by_rule:
            print("\nrule별: " + ", ".join(f"{k} {v}건" for k, v in sorted(by_rule.items())))
        print(f"검사 파일 {len(targets)}개, error {len(errors)}건, "
              f"warning {len(all_warnings) - len(errors)}건, 해당 파일 {len(per_file)}개")

    if args.strict and errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
