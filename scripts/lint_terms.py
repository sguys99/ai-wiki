#!/usr/bin/env python3
"""용어 lint — 도메인 용어집(wiki/overviews/glossary-*.md)의 금지 표기를 검사한다.

sources/·wiki/ 한글 산문에서 전문 용어의 한글 직역(policy→"정책" 등)을 잡아
canonical 표기로 복원하도록 경고한다. CLAUDE.md 언어 정책·write-wiki 스킬과 짝.

사용:
    python3 scripts/lint_terms.py <file> [<file> ...]   # 지정 파일만
    python3 scripts/lint_terms.py --all                 # sources/ + wiki/ + index.md 전체
    python3 scripts/lint_terms.py --all --strict        # 경고 1건 이상이면 exit 1
    python3 scripts/lint_terms.py --json <file>         # 훅용 JSON 출력

규약 (용어집 쪽):
- 대상 용어집: wiki/overviews/glossary-*.md 중 frontmatter에 glossary_domain: 이 있는 파일.
- frontmatter applies_to: [category, ...] 가 이 용어집이 적용될 파일 category를 정한다.
- "## 용어 표" 헤딩 아래 첫 마크다운 표만 파싱. 헤더는 5컬럼 고정:
  | 원어 | canonical 표기 | 금지 표기 | 첫 등장 풀이 예문 | 비고 |
- 금지 표기 셀: "—" 또는 빈칸 = 검사 없음(지침만). 복수 항목은 "·" 구분.
  리터럴 부분 문자열로 검사한다(정규식 아님 — 조사가 붙어도 잡힌다).

규약 (대상 파일 쪽):
- 파일 frontmatter의 category: 로 적용할 용어집을 고른다. category가 없는 파일(index.md 등)은 전부 적용.
- frontmatter에 lint_terms: false 가 있으면 파일 전체 제외(한국어 원저 인용 보존용 — 남용 금지).
- 줄에 <!-- lint-terms: ignore --> 가 있으면 그 줄 제외.
- <!-- lint-terms: off --> ~ <!-- lint-terms: on --> 블록 제외.
- frontmatter·코드 펜스·인라인 코드·[[wikilink]]·URL 내부는 검사하지 않는다.

의존성: python3 표준 라이브러리만 (훅에서 .venv 없이 실행).
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
GLOSSARY_GLOB = "wiki/overviews/glossary-*.md"
TABLE_HEADER = ["원어", "canonical 표기", "금지 표기", "첫 등장 풀이 예문", "비고"]

RE_INLINE_CODE = re.compile(r"`[^`]*`")
RE_WIKILINK = re.compile(r"!?\[\[[^\]]*\]\]")
RE_MD_LINK_TARGET = re.compile(r"\]\([^)]*\)")
RE_URL = re.compile(r"https?://\S+")
# 번역어 첫 등장 병기 "시연 데이터(demonstration)"의 괄호 안(라틴 문자 시작, 한글 없음)은 검사 제외
RE_LATIN_PAREN = re.compile(r"\([A-Za-z][^)가-힣·—]*\)")


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
    return fm, 0  # 닫는 --- 없음 — frontmatter로 취급하지 않음


def parse_flow_list(value):
    """"[a, b, c]" 꼴 YAML flow list → 문자열 리스트."""
    value = value.strip()
    if value.startswith("[") and value.endswith("]"):
        return [v.strip().strip("'\"") for v in value[1:-1].split(",") if v.strip()]
    return []


def load_glossaries(root):
    """용어집 파싱 → [{domain, applies_to, terms: [(banned, canonical)], path, n_terms}]"""
    glossaries = []
    for path in sorted(root.glob(GLOSSARY_GLOB)):
        lines = path.read_text(encoding="utf-8").splitlines()
        fm, body_start = parse_frontmatter(lines)
        if "glossary_domain" not in fm:
            continue
        domain = fm["glossary_domain"]
        applies_to = parse_flow_list(fm.get("applies_to", "")) or None  # None = 전 카테고리

        # "## 용어 표" 아래 첫 표
        terms = []
        n_rows = 0
        in_section = False
        header_seen = False
        for line in lines[body_start:]:
            if line.startswith("## "):
                if in_section:
                    break  # 다음 섹션 — 표 끝
                in_section = "용어 표" in line
                continue
            if not in_section:
                continue
            if not line.strip().startswith("|"):
                if header_seen:
                    break  # 표가 끝났다
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not header_seen:
                if [c.replace(" ", "") for c in cells] == [h.replace(" ", "") for h in TABLE_HEADER]:
                    header_seen = True
                else:
                    print(f"[lint_terms] 경고: {path.name} 용어 표 헤더가 규약과 다릅니다 — 이 용어집을 건너뜁니다.",
                          file=sys.stderr)
                    break
                continue
            if set(cells[0]) <= {"-", ":"}:  # 구분선 |---|---|
                continue
            if len(cells) < 3:
                continue
            n_rows += 1
            canonical, banned_cell = cells[1], cells[2]
            if banned_cell in ("", "—", "-"):
                continue
            seen = {b for b, _ in terms}
            for banned in (b.strip() for b in banned_cell.split("·")):
                if banned and banned not in seen:
                    terms.append((banned, canonical))
                    seen.add(banned)
        glossaries.append({
            "domain": domain, "applies_to": applies_to, "terms": terms,
            "path": path, "n_terms": n_rows,
        })
    return glossaries


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
        if re.match(r"wiki/overviews/glossary-.*\.md$", s):
            continue
        out.append(p)
    return out


def mask(line):
    """검사 제외 구간을 공백으로 치환(offset 보존)."""
    for pattern in (RE_INLINE_CODE, RE_WIKILINK, RE_MD_LINK_TARGET, RE_URL, RE_LATIN_PAREN):
        line = pattern.sub(lambda m: " " * len(m.group(0)), line)
    return line


def lint_file(path, glossaries, root):
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    fm, body_start = parse_frontmatter(lines)
    if fm.get("lint_terms", "").lower() == "false":
        return []
    category = fm.get("category", "").strip().strip("'\"") or None

    active = []
    for g in glossaries:
        if category is None or g["applies_to"] is None or category in g["applies_to"]:
            active += [(banned, canonical, g["domain"]) for banned, canonical in g["terms"]]
    if not active:
        return []

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
        if "lint-terms: off" in line:
            off = True
            continue
        if "lint-terms: on" in line:
            off = False
            continue
        if off or "lint-terms: ignore" in line:
            continue
        masked = mask(line)
        for banned, canonical, domain in active:
            if banned in masked:
                warnings.append({
                    "file": str(path.relative_to(root) if path.is_relative_to(root) else path),
                    "line": lineno,
                    "banned": banned,
                    "canonical": canonical,
                    "glossary": f"glossary-{domain}",
                })
    return warnings


def main():
    ap = argparse.ArgumentParser(description="도메인 용어집 기반 금지 표기 lint")
    ap.add_argument("files", nargs="*", help="검사할 파일 (생략 시 --all 필요)")
    ap.add_argument("--all", action="store_true", help="sources/ + wiki/ + index.md 전체 검사")
    ap.add_argument("--strict", action="store_true", help="경고 1건 이상이면 exit 1")
    ap.add_argument("--json", action="store_true", help="JSON 출력 (훅용)")
    args = ap.parse_args()

    if not args.files and not args.all:
        ap.error("검사할 파일을 지정하거나 --all 을 쓰세요.")

    glossaries = load_glossaries(REPO_ROOT)
    if not glossaries:
        print("[lint_terms] 용어집을 찾지 못했습니다 (wiki/overviews/glossary-*.md).", file=sys.stderr)
        sys.exit(0)

    targets = collect_targets(REPO_ROOT, args.files, args.all)
    all_warnings = []
    for path in targets:
        if not path.exists():
            print(f"[lint_terms] 파일 없음: {path}", file=sys.stderr)
            continue
        all_warnings += lint_file(path, glossaries, REPO_ROOT)

    if args.json:
        print(json.dumps({"warnings": all_warnings, "count": len(all_warnings)}, ensure_ascii=False))
    else:
        for w in all_warnings:
            print(f"{w['file']}:{w['line']}: '{w['banned']}' → '{w['canonical']}' [{w['glossary']}]")
        per_file = {}
        for w in all_warnings:
            per_file[w["file"]] = per_file.get(w["file"], 0) + 1
        print(f"\n용어집: " + ", ".join(f"{g['domain']} {g['n_terms']}개 용어(금지 {len(g['terms'])}종)"
                                          for g in glossaries))
        print(f"검사 파일 {len(targets)}개 · 경고 {len(all_warnings)}건 · 파일 {len(per_file)}개")

    if args.strict and all_warnings:
        sys.exit(1)


if __name__ == "__main__":
    main()
