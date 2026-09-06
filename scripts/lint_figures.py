#!/usr/bin/env python3
"""figures lint — Step 2.5(이미지 추출)와 Step 3~4(frontmatter 기록)의 어긋남을 검사한다.

CLAUDE.md "Image & Figure Handling"의 규약을 stem 단위로 확인한다:
  [error]   raw/{type}/{stem}-figures/ 에 크롭이 있는데 sources/{stem}.md 에 figures: 키가 없음
  [warning] -figures/ 에 대응하는 sources/{stem}.md 가 없음 (stem 규약 밖 고아 디렉토리)
  [warning] -figures/ 가 있는데 이미지가 0장 (추출 실패 잔재)
  [warning] sources 의 curated: true 항목과 wiki 페이지 figures 항목이 어긋남
  [error]   wiki frontmatter 에 curated: false 항목이 남아 있음 (wiki 는 curated 만 복제)
  [error]   frontmatter 의 raw: 경로가 실제 파일을 가리키지 않음 (repo·URL 제외)
  [error]   curated: true 항목의 file: 경로가 wiki/assets/ 아래에 없음

사용:
    python3 scripts/lint_figures.py <file> [<file> ...]   # 그 파일의 stem 만
    python3 scripts/lint_figures.py --all                 # 전 stem
    python3 scripts/lint_figures.py --all --strict        # error 1건 이상이면 exit 1
    python3 scripts/lint_figures.py --json <file>         # 훅용 JSON 출력
    python3 scripts/lint_figures.py --category database   # 그 카테고리만
    python3 scripts/lint_figures.py --category a,b <file> [<file> ...]   # 지정 목록을 필터

lint_style.py·lint_terms.py 와 달리 검사 단위가 파일이 아니라 stem 이다. 인자로 받은
sources/{stem}.md 나 wiki/{category}/{stem}.md 는 stem 을 고르는 열쇠로만 쓴다.

대상 규약:
- repos 는 제외한다. CLAUDE.md 규약상 -figures/ 를 만들지 않고 repo 내 assets/, img/ 를
  in-place 참조하기 때문이다. 같은 이유로 type: repo 자료의 raw: 경로 실재 검사도 건너뛴다
  (repo 스냅샷을 저장소에 넣지 않는 것이 기본이다).
- raw: 값이 http(s) URL 이면 실재 검사를 건너뛴다. repos 절이 README 이미지의 GitHub URL 을
  raw 필드에 적도록 규정한 형태라서다.
- index.md 는 대상이 아니다. figures 를 담지 않으므로 --category 의 index 절 필터도 없다.
- 카테고리 판정은 sources/{stem}.md frontmatter 의 category: 로 한다. sources 가 없는
  고아 디렉토리는 카테고리를 알 수 없어 --category 지정 시 대상에서 빠진다.
- wiki figures 항목에 from_source: {다른 stem} 이 있으면 다른 자료에서 빌려온 도식이다.
  트레이서빌리티가 그 stem 의 sources 에 있으므로 sources 대조에서 제외한다 (경로 검사는 유지).
- frontmatter 에 lint_figures: false 가 있으면 그 stem 전체 제외.
- frontmatter 항목 줄에 <!-- lint-figures: ignore --> 가 있으면 그 줄 제외.

의존성: python3 표준 라이브러리만 (훅에서 .venv 없이 실행).
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# -figures/ 를 만들지 않는 유형. repos 는 repo 내 이미지를 in-place 참조한다 (CLAUDE.md).
EXCLUDED_RAW_TYPES = {"repos"}
# 추출 산출물 판정용 확장자. figures.json 은 매니페스트라 이미지로 세지 않는다.
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".tif", ".tiff"}
# _overlay/ 는 검출 영역 확인용 산출물이라 git 추적에서도 빠진다 — "이미지 있음" 판정에서 뺀다.
IGNORED_SUBDIRS = {"_overlay"}

RE_URL = re.compile(r"^https?://")
RE_FM_KEY = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$")
RE_FIG_ITEM = re.compile(r"^\s+-\s+(.*)$")
RE_FIG_FIELD = re.compile(r"^\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$")


def unquote(value):
    return value.strip().strip("'\"").strip()


def parse_frontmatter(lines):
    """단순 key: value frontmatter 파싱. (dict, 닫는 --- 의 1-based 줄번호) 반환."""
    if not lines or lines[0].strip() != "---":
        return {}, 0
    fm = {}
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return fm, i + 1
        m = RE_FM_KEY.match(line)
        if m:
            fm[m.group(1)] = m.group(2).strip()
    return fm, 0  # 닫는 --- 없음 — frontmatter 로 취급하지 않음


def parse_figures(lines):
    """frontmatter 의 figures: 블록 파싱.

    반환: (present, items) — present 는 figures: 키의 유무, items 는
    [{"id":..., "curated": bool, "raw":..., "file":..., "from_source":...,
      "line": 1-based, "ignore": bool}].
    figures: [] 처럼 빈 리스트면 present=True, items=[].
    """
    if not lines or lines[0].strip() != "---":
        return False, []
    end = None
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            end = i
            break
    if end is None:
        return False, []

    present = False
    items = []
    current = None
    in_block = False
    for i in range(1, end):
        line = lines[i]
        lineno = i + 1
        m_top = RE_FM_KEY.match(line)
        if m_top:  # 들여쓰기 없는 최상위 키
            if m_top.group(1) == "figures":
                present = True
                in_block = True
                current = None
                continue
            in_block = False
            current = None
            continue
        if not in_block:
            continue
        m_item = RE_FIG_ITEM.match(line)
        if m_item:
            current = {"id": None, "curated": False, "raw": None, "file": None,
                       "from_source": None, "line": lineno,
                       "ignore": "lint-figures: ignore" in line}
            items.append(current)
            inner = m_item.group(1)
            m_field = RE_FM_KEY.match(inner)
            if m_field:
                _assign(current, m_field.group(1), m_field.group(2))
            continue
        if current is None:
            continue
        if "lint-figures: ignore" in line:
            current["ignore"] = True
        m_field = RE_FIG_FIELD.match(line)
        if m_field:
            _assign(current, m_field.group(1), m_field.group(2))
    return present, items


def _assign(item, key, value):
    value = unquote(value)
    if key == "id":
        item["id"] = value
    elif key == "curated":
        item["curated"] = value.lower() == "true"
    elif key == "raw":
        item["raw"] = value
    elif key == "file":
        item["file"] = value
    elif key == "from_source":
        item["from_source"] = value


def count_images(directory):
    """-figures/ 안의 이미지 수. _overlay/ 는 확인용 산출물이라 세지 않는다."""
    n = 0
    for path in directory.rglob("*"):
        if not path.is_file():
            continue
        if any(part in IGNORED_SUBDIRS for part in path.relative_to(directory).parts[:-1]):
            continue
        if path.suffix.lower() in IMAGE_SUFFIXES:
            n += 1
    return n


def scan_figure_dirs(root):
    """raw/ 의 -figures/ 디렉토리 → {stem: Path}. repos 는 제외한다."""
    dirs = {}
    raw = root / "raw"
    if not raw.is_dir():
        return dirs
    for type_dir in sorted(p for p in raw.iterdir() if p.is_dir()):
        if type_dir.name in EXCLUDED_RAW_TYPES:
            continue
        for path in sorted(type_dir.rglob("*-figures")):
            if path.is_dir():
                dirs[path.name[: -len("-figures")]] = path
    return dirs


def find_wiki_page(root, stem):
    """wiki/{category}/{stem}.md 를 찾는다. assets/ 아래는 제외."""
    for path in sorted(root.glob(f"wiki/*/{stem}.md")):
        if "assets" not in path.parts:
            return path
    return None


def rel(root, path):
    return str(path.relative_to(root) if path.is_relative_to(root) else path)


def stem_category(root, stem):
    """sources/{stem}.md frontmatter 의 category. 없으면 wiki 페이지에서, 그것도 없으면 None."""
    for path in (root / "sources" / f"{stem}.md", find_wiki_page(root, stem)):
        if path is not None and path.exists():
            fm, _ = parse_frontmatter(path.read_text(encoding="utf-8").splitlines())
            value = unquote(fm.get("category", ""))
            if value:
                return value.lower()
    return None


def lint_stem(stem, root, figure_dirs):
    """한 stem 의 위반 목록."""
    warnings = []
    src = root / "sources" / f"{stem}.md"
    fig_dir = figure_dirs.get(stem)

    src_lines = src.read_text(encoding="utf-8").splitlines() if src.exists() else None
    src_fm, src_fm_end = parse_frontmatter(src_lines) if src_lines else ({}, 0)
    if unquote(src_fm.get("lint_figures", "")).lower() == "false":
        return warnings

    # ── 디렉토리 쪽 규약 ────────────────────────────────────────────────
    if fig_dir is not None:
        n_images = count_images(fig_dir)
        if src_lines is None:
            warnings.append({
                "file": rel(root, fig_dir), "line": 0, "severity": "warning",
                "rule": "orphan-figures-dir",
                "msg": f"대응하는 sources/{stem}.md 가 없음 — stem 규약 밖 디렉토리이거나 Step 3 미작성 "
                       f"(이미지 {n_images}장)",
            })
        elif n_images == 0:
            warnings.append({
                "file": rel(root, fig_dir), "line": 0, "severity": "warning",
                "rule": "empty-figures-dir",
                "msg": "이미지가 0장 — 추출 실패 잔재인지 확인",
            })
        else:
            present, _ = parse_figures(src_lines)
            if not present:
                warnings.append({
                    "file": rel(root, src), "line": max(src_fm_end, 1), "severity": "error",
                    "rule": "figures-missing",
                    "msg": f"크롭 {n_images}장이 있는데 frontmatter 에 figures: 키가 없음 — "
                           f"Step 2.5 산출물이 Step 3 에 기록되지 않았다",
                })

    if src_lines is None:
        return warnings

    # ── frontmatter 쪽 규약 ────────────────────────────────────────────
    src_present, src_items = parse_figures(src_lines)
    if not src_present:
        return warnings

    is_repo = unquote(src_fm.get("type", "")).lower() == "repo"
    warnings += check_paths(src_items, rel(root, src), root, check_raw=not is_repo)

    wiki = find_wiki_page(root, stem)
    if wiki is None:
        return warnings  # wiki 페이지 미작성은 별개 backlog — 여기서 판정하지 않는다
    wiki_lines = wiki.read_text(encoding="utf-8").splitlines()
    wiki_fm, _ = parse_frontmatter(wiki_lines)
    if unquote(wiki_fm.get("lint_figures", "")).lower() == "false":
        return warnings
    wiki_present, wiki_items = parse_figures(wiki_lines)
    wiki_rel = rel(root, wiki)
    warnings += check_paths(wiki_items, wiki_rel, root, check_raw=not is_repo)

    for item in wiki_items:
        if item["ignore"]:
            continue
        if not item["curated"]:
            warnings.append({
                "file": wiki_rel, "line": item["line"], "severity": "error",
                "rule": "wiki-uncurated-figure",
                "msg": f"wiki frontmatter 의 '{item['id']}' 가 curated: true 가 아님 — "
                       f"wiki 에는 curated 항목만 복제한다",
            })

    src_curated = [i for i in src_items if i["curated"] and not i["ignore"]]
    wiki_ids = {i["id"] for i in wiki_items}
    src_ids = {i["id"] for i in src_items}
    if not wiki_present and src_curated:
        warnings.append({
            "file": wiki_rel, "line": 1, "severity": "warning", "rule": "curated-mismatch",
            "msg": f"sources 의 curated 항목 {len(src_curated)}개가 wiki frontmatter 에 없음 "
                   f"({', '.join(sorted(i['id'] for i in src_curated))})",
        })
        return warnings
    for item in src_curated:
        if item["id"] not in wiki_ids:
            warnings.append({
                "file": rel(root, src), "line": item["line"], "severity": "warning",
                "rule": "curated-mismatch",
                "msg": f"sources 에서 curated: true 인 '{item['id']}' 가 wiki 페이지 "
                       f"{wiki_rel} frontmatter 에 없음",
            })
    for item in wiki_items:
        if item["ignore"] or item.get("from_source"):
            continue  # 다른 stem 에서 빌려온 도식 — 그 stem 의 sources 가 트레이서빌리티를 유지한다
        if item["id"] not in src_ids:
            warnings.append({
                "file": wiki_rel, "line": item["line"], "severity": "warning",
                "rule": "curated-mismatch",
                "msg": f"wiki 의 '{item['id']}' 가 sources/{stem}.md frontmatter 에 없음 — "
                       f"트레이서빌리티는 sources 가 유지한다",
            })
    return warnings


def check_paths(items, file_rel, root, check_raw=True):
    """figures 항목의 raw: 와 file: 경로가 실재하는지 확인.

    check_raw=False 는 type: repo 자료용이다 — raw 가 repo 내 in-place 경로나 GitHub URL 을
    가리키고 스냅샷은 저장소에 없는 것이 규약이라 전량 오탐이 된다.
    """
    warnings = []
    for item in items:
        if item["ignore"]:
            continue
        raw_path = item.get("raw")
        if check_raw and raw_path and not RE_URL.match(raw_path) \
                and not (root / raw_path).exists():
            warnings.append({
                "file": file_rel, "line": item["line"], "severity": "error",
                "rule": "figure-raw-missing",
                "msg": f"'{item['id']}' 의 raw 경로가 실재하지 않음: {raw_path}",
            })
        file_path = item.get("file")
        if item["curated"] and file_path:
            # file: 은 wiki 루트 기준 상대경로다 (Obsidian 임베드용).
            if not (root / "wiki" / file_path).exists():
                warnings.append({
                    "file": file_rel, "line": item["line"], "severity": "error",
                    "rule": "figure-asset-missing",
                    "msg": f"'{item['id']}' 의 curated 사본이 없음: wiki/{file_path}",
                })
    return warnings


def stems_from_files(files, root):
    """인자로 받은 파일 목록 → stem 집합. sources/·wiki/ 의 .md 만 인정한다."""
    stems = []
    for f in files:
        path = Path(f)
        path = path if path.is_absolute() else (root / path)
        r = rel(root, path.resolve() if path.exists() else path)
        parts = Path(r).parts
        if not r.endswith(".md") or "assets" in parts:
            print(f"[lint_figures] 대상이 아닌 인자: {r}", file=sys.stderr)
            continue
        if parts[0] not in ("sources", "wiki"):
            print(f"[lint_figures] 대상이 아닌 인자: {r}", file=sys.stderr)
            continue
        if r == "index.md" or Path(r).name.startswith("glossary-"):
            continue
        if not path.exists():
            # 파일이 없어도 stem 은 살린다 — 고아 -figures/ 를 그 stem 으로 조회할 수 있어서다.
            print(f"[lint_figures] 파일 없음: {r}", file=sys.stderr)
        stems.append(Path(r).stem)
    return stems


def parse_categories(values):
    """--category 인자 정규화 → 소문자 집합. 반복 지정과 쉼표 구분을 모두 받는다."""
    names = set()
    for value in values or ():
        for name in value.split(","):
            name = name.strip().strip("'\"").lower()
            if name:
                names.add(name)
    return names


def collect_stems(root, args_files, scan_all, figure_dirs):
    if not scan_all:
        return sorted(set(stems_from_files(args_files, root)))
    stems = set(figure_dirs)
    for path in sorted(root.glob("sources/*.md")):
        stems.add(path.stem)
    return sorted(stems)


def main():
    ap = argparse.ArgumentParser(description="Step 2.5 크롭과 figures frontmatter 정합 lint")
    ap.add_argument("files", nargs="*", help="검사할 파일 (생략 시 --all 또는 --category 필요)")
    ap.add_argument("--all", action="store_true", help="raw/ 의 전 -figures/ 와 sources/ 전 stem 검사")
    ap.add_argument("--strict", action="store_true", help="error 1건 이상이면 exit 1")
    ap.add_argument("--json", action="store_true", help="JSON 출력 (훅용)")
    ap.add_argument("--category", action="append", metavar="NAME",
                    help="카테고리로 대상 좁히기 (반복 지정 또는 쉼표 구분). "
                         "파일 목록 없이 쓰면 --all 과 같은 전체 스캔 후 필터")
    args = ap.parse_args()

    categories = parse_categories(args.category)
    if not args.files and not args.all and not categories:
        ap.error("검사할 파일을 지정하거나 --all 또는 --category 를 쓰세요.")

    figure_dirs = scan_figure_dirs(REPO_ROOT)
    # --category 만 준 경우도 전체 스캔 후 필터 — 파일 목록과 함께면 그 목록을 필터한다.
    stems = collect_stems(REPO_ROOT, args.files,
                          args.all or (bool(categories) and not args.files), figure_dirs)
    if categories:
        stems = [s for s in stems if stem_category(REPO_ROOT, s) in categories]
        if not stems:
            print(f"[lint_figures] 대상 stem 이 없습니다 (category: {', '.join(sorted(categories))}).",
                  file=sys.stderr)

    all_warnings = []
    for stem in stems:
        all_warnings += lint_stem(stem, REPO_ROOT, figure_dirs)

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
        print(f"검사 stem {len(stems)}개, error {len(errors)}건, "
              f"warning {len(all_warnings) - len(errors)}건, 해당 파일 {len(per_file)}개")

    if args.strict and errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
