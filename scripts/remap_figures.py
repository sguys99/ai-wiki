#!/usr/bin/env python3
"""기존 자료를 새 figure 추출 체계로 옮긴다. 한 번 쓰고 버릴 마이그레이션 도구다.

바뀌는 것은 두 가지다.

    1. raw/{type}/{stem}-figures/ 를 정밀 크롭으로 다시 만든다 (페이지 통째 → bbox)
    2. fig id 를 논문 라벨에 맞춘다 — fig05 가 Figure 3 이었다면 fig03 으로

id 가 움직이므로 sources/ 와 wiki/ 의 figures: 블록과 본문 임베드도 함께 고친다.
**사람이 쓴 한글 캡션과 curated 플래그는 그대로 옮긴다** — 이게 이 스크립트의 존재 이유다.

옛 id 와 새 id 를 잇는 실마리는 사람이 이미 캡션에 박아둔 "(paper Figure 3)" 주석이다.
그게 없으면 옛 figures.json 의 영문 캡션에서 라벨을 뽑는다. 둘 다 없으면 리포트에 남긴다.

사용:

    .venv/bin/python scripts/remap_figures.py --all              # dry-run (기본)
    .venv/bin/python scripts/remap_figures.py --all --apply
    .venv/bin/python scripts/remap_figures.py <stem> [<stem>…] --apply

--apply 전에 git 작업 트리가 깨끗한지 확인하라. 되돌릴 때는 git 으로 되돌린다.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import extract_figures as ef  # noqa: E402

REPO = ef.REPO
SOURCES = REPO / "sources"
WIKI = REPO / "wiki"
ASSETS = WIKI / "assets"
PDF_TYPES = ("papers", "reports")

# 사람이 캡션에 달아둔 원본 라벨. 표기가 갈려 있다 — "(paper Figure 3)" 도 있고
# "(Figure 1, p.2)" 도 있다. 둘 다 받는다.
NUM = r"([A-Z]?\d+|[IVXLCDM]+)"
PAPER_LABEL_RE = re.compile(
    rf"\((?:paper\s+)?(Figure|Fig\.|Table)\s*{NUM}\s*[,)+ ]", re.IGNORECASE)
LEAD_LABEL_RE = re.compile(rf"^\s*(Figure|Fig\.|Table)\s*{NUM}\s*[:.]", re.IGNORECASE)
ANY_PAREN_LABEL = re.compile(
    rf"\((?:paper\s+)?(?:Figure|Fig\.|Table)\s*{NUM}", re.IGNORECASE)
# 옛 figures.json 의 영문 캡션이 진짜 캡션이면 이렇게 시작한다
RAW_LABEL_RE = re.compile(rf"^\s*(Figure|Fig\.|TABLE|Table)\s*{NUM}\s*[:|.\s]", re.IGNORECASE)
EMBED_RE = re.compile(r"!\[\[assets/(?P<stem>[^/\]]+)/(?P<name>[^\]]+)\]\]")


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


def label_id(kind: str, num: str) -> str:
    """("Table", "IV") → "tab04". extract_figures.Item.id 와 같은 규칙이어야 한다."""
    prefix = "fig" if kind.lower().startswith(("fig", "그림")) else "tab"
    num = num.upper()
    if num.isdigit() or ef.ROMAN_RE.match(num):
        return f"{prefix}{ef.num_value(num):02d}"
    return f"{prefix}{num.lower()}"


# ─────────────────────────────────────────────── frontmatter figures 블록


KNOWN_KEYS = {"id", "label", "kind", "file", "raw", "caption", "page",
              "bbox", "bbox_norm", "dpi", "area_frac", "strategy",
              "low_confidence", "curated", "override", "timestamp"}


@dataclass
class Entry:
    id: str
    caption: str = ""
    curated: bool = False
    page: int = 0
    extra: list[str] = field(default_factory=list)   # note: 처럼 사람이 덧붙인 키

    def merge(self, other: "Entry") -> None:
        """같은 id 가 sources 와 wiki 양쪽에 있을 때 살아 있는 값을 모은다.

        curated 는 보통 wiki 에만 true 로 적혀 있고 sources 는 false 로 남아 있다.
        먼저 읽은 쪽으로 덮어쓰면 사람이 고른 도식이 통째로 사라진다.
        """
        self.curated = self.curated or other.curated
        if len(other.caption) > len(self.caption):
            self.caption = other.caption
        self.page = self.page or other.page
        for ln in other.extra:
            if ln not in self.extra:
                self.extra.append(ln)


def split_front(text: str) -> tuple[list[str], str]:
    """--- 로 감싼 frontmatter 를 줄 목록으로, 나머지를 본문으로."""
    if not text.startswith("---\n"):
        return [], text
    end = text.find("\n---\n", 4)
    if end < 0:
        return [], text
    return text[4:end].split("\n"), text[end + 5:]


def parse_figures(front: list[str]) -> tuple[int, int, list[Entry]]:
    """figures: 블록의 시작·끝 줄 번호와 항목들. 없으면 (-1, -1, [])."""
    start = next((i for i, ln in enumerate(front) if ln.rstrip() == "figures:"), -1)
    if start < 0:
        return -1, -1, []
    end = start + 1
    while end < len(front) and (front[end].startswith("  ") or not front[end].strip()):
        end += 1
    entries: list[Entry] = []
    for ln in front[start + 1:end]:
        m = re.match(r"\s*-\s*id:\s*(\S+)", ln)
        if m:
            entries.append(Entry(id=m.group(1)))
            continue
        if not entries:
            continue
        m = re.match(r"\s*caption:\s*(.*)$", ln)
        if m:
            entries[-1].caption = m.group(1).strip().strip('"').strip("'")
        m = re.match(r"\s*curated:\s*(\S+)", ln)
        if m:
            entries[-1].curated = m.group(1).strip().lower() == "true"
        m = re.match(r"\s*page:\s*(\d+)", ln)
        if m:
            entries[-1].page = int(m.group(1))
        m = re.match(r"\s*([A-Za-z_][\w-]*):", ln)
        if m and m.group(1) not in KNOWN_KEYS:
            entries[-1].extra.append(ln.strip())
    return start, end, entries


def render_figures(entries: list[dict], indent: str = "  ") -> list[str]:
    out = ["figures:"]
    for e in entries:
        cap = (e.get("caption") or "").replace('"', "'")
        out.append(f"{indent}- id: {e['id']}")
        out.append(f"{indent}  label: {e['label']}")
        out.append(f"{indent}  kind: {e['kind']}")
        out.append(f"{indent}  file: {e['file']}")
        out.append(f"{indent}  raw: {e['raw']}")
        out.append(f'{indent}  caption: "{cap}"')
        out.append(f"{indent}  page: {e['page']}")
        out.append(f"{indent}  bbox_norm: {json.dumps(e['bbox_norm'])}")
        out.append(f"{indent}  strategy: {e['strategy']}")
        if e.get("low_confidence"):
            out.append(f"{indent}  low_confidence: true")
        out.append(f"{indent}  curated: {str(e['curated']).lower()}")
        for ln in e.get("extra", []):
            out.append(f"{indent}  {ln}")
    return out


# ─────────────────────────────────────────────── 매핑


def md_targets(stem: str) -> list[Path]:
    out = [SOURCES / f"{stem}.md"]
    out += sorted(WIKI.glob(f"*/{stem}.md"))
    return [p for p in out if p.exists()]


def read_old_labels(stem: str, ftype: str) -> dict[str, str]:
    """옛 figures.json 의 영문 캡션에서 새 id 를 추정한다. **재추출 전에** 불러야 한다."""
    out: dict[str, str] = {}
    mf = ef.figures_dir(stem, ftype) / "figures.json"
    if not mf.exists():
        return out
    try:
        for e in json.loads(mf.read_text(encoding="utf-8")):
            m = RAW_LABEL_RE.match(e.get("caption") or "")
            if m:
                out[e["id"]] = label_id(m.group(1), m.group(2))
    except (json.JSONDecodeError, KeyError, TypeError):
        pass
    return out


def build_mapping(old_entries: list[Entry], new_entries: list[dict],
                  old_labels: dict[str, str]) -> tuple[dict[str, str], list[str]]:
    """옛 id → 새 id. 근거가 센 것부터 배정하고, 한 새 id 는 한 번만 쓴다.

    1순위는 사람이 캡션에 적어둔 "(Figure 2, p.5)" 다. 2순위는 옛 매니페스트의 영문
    캡션. id 를 그대로 잇는 3순위는 캡션에 아무 라벨도 없을 때만 쓴다 — 옛 id 는 순번일
    뿐이라, 라벨이 있는데 안 맞았다면 그 id 는 아무 뜻도 없다.
    """
    new_ids = {e["id"] for e in new_entries}
    mapping: dict[str, str] = {}
    taken: set[str] = set()

    def claim(old_id: str, nid: str | None) -> bool:
        if not nid:
            return False
        if nid in new_ids and nid not in taken:
            mapping[old_id] = nid
            taken.add(nid)
            return True
        return False

    for old in old_entries:
        m = PAPER_LABEL_RE.search(old.caption) or LEAD_LABEL_RE.match(old.caption)
        claim(old.id, label_id(m.group(1), m.group(2)) if m else None)
    for old in old_entries:
        if old.id not in mapping:
            claim(old.id, old_labels.get(old.id))
    for old in old_entries:
        if old.id in mapping or ANY_PAREN_LABEL.search(old.caption):
            continue
        if old.id in new_ids and old.id not in taken:
            mapping[old.id] = old.id
            taken.add(old.id)
    return mapping, [o.id for o in old_entries if o.id not in mapping]


# ─────────────────────────────────────────────── stem 하나 처리


def preserve_page_shots(stem: str, ftype: str, tmp: Path) -> int:
    """옛 전면 캡처를 page-pNN.png 로 남긴다. 페이지 기준 중복은 버린다."""
    mf = tmp / "figures.json"
    if not mf.exists():
        return 0
    try:
        old = json.loads(mf.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return 0
    outdir = ef.figures_dir(stem, ftype)
    kept = 0
    for page in sorted({e.get("page") for e in old if e.get("page")}):
        src = next((tmp / Path(e["raw"]).name for e in old
                    if e.get("page") == page and (tmp / Path(e["raw"]).name).exists()), None)
        if src is None:
            continue
        shutil.copy2(src, outdir / f"page-p{page:02d}.png")
        kept += 1
    return kept


def process(stem: str, ftype: str, apply: bool, keep_shots: bool) -> dict:
    result = {"stem": stem, "type": ftype, "status": "ok", "unmapped": [], "legacy": [],
              "new": 0, "carried": 0, "assets": 0, "shots": 0, "extras": 0, "files": []}
    if not ef.pdf_path(stem, ftype).exists():
        result["status"] = "PDF 없음"
        return result

    targets = md_targets(stem)
    old_entries: list[Entry] = []
    embedded: set[str] = set()
    for p in targets:
        front, body = split_front(p.read_text(encoding="utf-8"))
        _, _, ents = parse_figures(front)
        index = {x.id: x for x in old_entries}
        for e in ents:
            if e.id in index:
                index[e.id].merge(e)
            else:
                old_entries.append(e)
        for m in EMBED_RE.finditer(body):
            if m.group("stem") == stem:
                embedded.add(m.group("name").partition(".")[0])

    old_labels = read_old_labels(stem, ftype)
    figdir = ef.figures_dir(stem, ftype)
    tmp = None
    if apply and figdir.exists():
        tmp = figdir.parent / f".{stem}-figures.bak"
        if tmp.exists():
            shutil.rmtree(tmp)
        shutil.copytree(figdir, tmp)

    if apply:
        _, new_entries = ef.extract_stem(stem, ftype)
    else:
        import pymupdf
        doc = pymupdf.open(ef.pdf_path(stem, ftype))
        try:
            items = ef.detect(doc)
            new_entries = ef.manifest(items, stem, ftype, doc, 300, []) if items else []
        finally:
            doc.close()

    if not new_entries:
        result["status"] = "캡션 없음 — 건너뜀"
        if tmp:
            shutil.rmtree(tmp)
        return result

    mapping, unmapped = build_mapping(old_entries, new_entries, old_labels)
    by_old = {e.id: e for e in old_entries}
    carried = {}
    for old_id, new_id in mapping.items():
        carried[new_id] = by_old[old_id]

    for e in new_entries:
        old = carried.get(e["id"])
        if old:
            if old.caption:
                e["caption"] = old.caption
            e["curated"] = old.curated
            if old.extra:
                e["extra"] = old.extra

    # 매핑 못 했지만 사람이 골라 wiki 에 넣어둔 것은 버리지 않는다. 옛 전면 캡처 그대로
    # legacy 로 남겨 본문 임베드가 살아 있게 한다. 나중에 --bbox 로 갈아끼우면 된다.
    keep_old = [i for i in unmapped if by_old[i].curated or i in embedded]
    result["unmapped"] = [i for i in unmapped if i not in keep_old]
    result["legacy"] = keep_old
    new_entries += [legacy_entry(stem, ftype, by_old[i]) for i in keep_old]
    result["new"] = len(new_entries)
    result["carried"] = len(carried)

    if apply:
        if tmp:
            if keep_shots:
                result["shots"] = preserve_page_shots(stem, ftype, tmp)
            restore_legacy(stem, ftype, tmp, keep_old)
            result["extras"] = restore_extras(stem, ftype, tmp)
            shutil.rmtree(tmp)
        for p in targets:
            rewrite_md(p, stem, new_entries, mapping)
            result["files"].append(str(p.relative_to(REPO)))
        live: set[str] = set()
        for p in targets:
            _, body = split_front(p.read_text(encoding="utf-8"))
            for m in EMBED_RE.finditer(body):
                if m.group("stem") == stem:
                    live.add(m.group("name").partition(".")[0])
        result["assets"] = sync_assets(stem, ftype, new_entries, live)
    else:
        result["files"] = [str(p.relative_to(REPO)) for p in targets]
        result["assets"] = sum(1 for e in new_entries if e["curated"])
    return result


def legacy_entry(stem: str, ftype: str, old: Entry) -> dict:
    """새 검출로 잇지 못한 옛 항목을 전면 캡처 그대로 보존하는 매니페스트 항목."""
    return {
        "id": old.id,
        "label": "(legacy)",
        "kind": "figure",
        "file": f"assets/{stem}/{old.id}.png",
        "raw": f"raw/{ftype}/{stem}-figures/legacy/{old.id}.png",
        "page": old.page,
        "caption": old.caption,
        "bbox_norm": [0.0, 0.0, 1.0, 1.0],
        "strategy": "legacy-page-region",
        "low_confidence": True,
        "curated": old.curated,
    }


def restore_legacy(stem: str, ftype: str, tmp: Path, ids: list[str]) -> None:
    if not ids:
        return
    dest = ef.figures_dir(stem, ftype) / "legacy"
    dest.mkdir(parents=True, exist_ok=True)
    for fid in ids:
        # 두 번째 실행부터는 이미 legacy/ 안에 들어가 있다. 둘 다 뒤진다.
        src = next((p for p in list(tmp.glob(f"{fid}.*")) + list(tmp.glob(f"legacy/{fid}.*"))
                    if p.is_file()), None)
        if src:
            shutil.copy2(src, dest / f"{fid}{src.suffix}")


def restore_extras(stem: str, ftype: str, tmp: Path) -> int:
    """figNN.png·figures.json 이 아닌 파일 — 사람이 손으로 만든 *_crop.png 같은 것."""
    known = re.compile(r"^(fig|tab)[A-Za-z]?\d+\.\w+$|^figures\.json$|^page-p\d+\.png$")
    dest = ef.figures_dir(stem, ftype) / "legacy"
    kept = 0
    for f in sorted(tmp.iterdir()):
        if not f.is_file() or known.match(f.name):
            continue
        dest.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, dest / f.name)
        kept += 1
    return kept


def rewrite_md(path: Path, stem: str, new_entries: list[dict], mapping: dict[str, str]) -> None:
    text = path.read_text(encoding="utf-8")
    front, body = split_front(text)
    start, end, _ = parse_figures(front)
    if start < 0:
        return
    front = front[:start] + render_figures(new_entries) + front[end:]

    def swap(m: re.Match) -> str:
        if m.group("stem") != stem:
            return m.group(0)
        name = m.group("name")
        old_id, dot, ext = name.partition(".")
        new_id = mapping.get(old_id)
        return m.group(0) if not new_id else f"![[assets/{stem}/{new_id}{dot}{ext}]]"

    body = EMBED_RE.sub(swap, body)
    path.write_text("---\n" + "\n".join(front) + "\n---\n" + body, encoding="utf-8")


def sync_assets(stem: str, ftype: str, new_entries: list[dict], live: set[str]) -> int:
    """curated 이거나 본문이 임베드한 것만 wiki/assets/{stem}/ 에 두고 나머지는 지운다.

    curated 가 하나도 없다고 건너뛰면 옛 파일이 그대로 남아 본문 임베드가 어긋난다.
    """
    dest = ASSETS / stem
    wanted = [e for e in new_entries if e["curated"] or e["id"] in live]
    if not wanted and not dest.exists():
        return 0
    dest.mkdir(parents=True, exist_ok=True)
    keep = set()
    for e in wanted:
        src = REPO / e["raw"]
        if src.exists():
            shutil.copy2(src, dest / src.name)
            keep.add(src.name)
    for f in dest.iterdir():
        if f.is_file() and f.name not in keep:
            f.unlink()
    return len(keep)


# ─────────────────────────────────────────────── main


def already_migrated(stem: str, ftype: str) -> bool:
    mf = ef.figures_dir(stem, ftype) / "figures.json"
    if not mf.exists():
        return False
    try:
        return any("bbox_norm" in e for e in json.loads(mf.read_text(encoding="utf-8")))
    except (json.JSONDecodeError, TypeError):
        return False


def all_stems() -> list[tuple[str, str]]:
    out = []
    for ftype in PDF_TYPES:
        for pdf in sorted((REPO / "raw" / ftype).glob("*.pdf")):
            if ef.figures_dir(pdf.stem, ftype).exists():
                out.append((pdf.stem, ftype))
    return out


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("stems", nargs="*", help="비우고 --all 을 주면 이미 추출된 전부")
    ap.add_argument("--type", default="papers", choices=ef.TYPES)
    ap.add_argument("--all", action="store_true", help="papers·reports 의 기존 -figures/ 전부")
    ap.add_argument("--apply", action="store_true", help="실제로 고친다 (기본은 dry-run)")
    ap.add_argument("--rerun", action="store_true",
                    help="이미 옮긴 stem 에도 강행한다 (매핑이 어긋날 수 있다)")
    ap.add_argument("--page-shots", action="store_true",
                    help="옛 전면 캡처를 page-pNN.png 로 남긴다 (약 104MB 늘어난다)")
    a = ap.parse_args()

    targets = all_stems() if a.all else [(s, a.type) for s in a.stems]
    if not targets:
        log("✗ 대상이 없다. stem 을 주거나 --all 을 써라.")
        return 1

    done = [s for s, t in targets if already_migrated(s, t)]
    if done and not a.rerun:
        log("✗ 이미 옮긴 stem 이 섞여 있다: " + ", ".join(done[:5])
            + ("…" if len(done) > 5 else ""))
        log("  두 번 돌리면 이 스크립트가 고친 캡션을 다시 근거로 읽어 매핑이 어긋난다.")
        log("  옮기기 전 상태로 되돌린 뒤 한 번만 돌려라 (git checkout). 정말 다시 돌리려면 --rerun.")
        return 1

    mode = "APPLY" if a.apply else "dry-run"
    print(f"# figure 재추출·id 재매핑 리포트 ({mode}) — {len(targets)}개\n")
    print("| stem | 상태 | 새 항목 | 캡션 이관 | legacy 보존 | assets | page 캡처 | 매핑 실패 |")
    print("|---|---|---|---|---|---|---|---|")
    results = []
    for stem, ftype in targets:
        r = process(stem, ftype, a.apply, a.page_shots)
        results.append(r)
        um = ", ".join(r["unmapped"]) if r["unmapped"] else "—"
        print(f"| {stem} | {r['status']} | {r['new']} | {r['carried']} | {len(r['legacy'])} | "
              f"{r['assets']} | {r['shots']} | {um} |")

    bad = [r for r in results if r["unmapped"]]
    skipped = [r for r in results if r["status"] != "ok"]
    print(f"\n합계 — 새 항목 {sum(r['new'] for r in results)}개, "
          f"캡션 이관 {sum(r['carried'] for r in results)}개, "
          f"assets {sum(r['assets'] for r in results)}개")
    legacy = [r for r in results if r["legacy"]]
    if legacy:
        print("\n## legacy 로 보존한 것 — 새 검출과 잇지 못했지만 wiki 가 쓰고 있다\n")
        for r in legacy:
            print(f"- **{r['stem']}**: {', '.join(r['legacy'])} "
                  f"— 옛 전면 캡처를 그대로 두었다. `--bbox` 로 정밀 크롭으로 갈아끼울 수 있다")
    if bad:
        print("\n## 사라진 항목 — 새 검출에 없고 wiki 도 쓰지 않던 후보\n")
        for r in bad:
            print(f"- **{r['stem']}**: {', '.join(r['unmapped'])}")
    if skipped:
        print("\n## 건너뛴 것\n")
        for r in skipped:
            print(f"- {r['stem']} — {r['status']}")
    if not a.apply:
        print("\n[dry-run] 아무것도 고치지 않았다. 확인했으면 --apply 로 다시 실행하라.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
