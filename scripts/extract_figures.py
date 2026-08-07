#!/usr/bin/env python3
"""PDF 에서 figure·table 영역만 잘라 raw/{type}/{stem}-figures/ 에 넣는다.

CLAUDE.md 의 Papers/Reports/Books/Lectures Step 2.5 만 담당한다. sources/ · wiki/ ·
index.md 는 건드리지 않고, git commit 도 하지 않는다. Step 3 부터는 기존 6-step 그대로.

캡션을 앵커로 삼아 인접 영역을 제안하는 방식이다 (pdffigures2 와 같은 발상):

    1. 캡션 탐지   블록이 "Figure 3:" 꼴로 시작하고 본문 속 참조 문장이 아닐 것
    2. figure    캡션에서 바깥으로 자라며 여백에서 멈추고, 그래픽 최상단에서 자른다
    3. table     가로 괘선 뭉치 → find_tables() → 캡션에 붙은 텍스트 덩어리 순
    4. 폴백 사다리  caption-region / table-region → column-band → page-region

id 는 논문 라벨에 맞춘다: Figure 3 → fig03, Table 2 → tab02.

사용:

    .venv/bin/python scripts/extract_figures.py <stem> --dry-run
    .venv/bin/python scripts/extract_figures.py <stem>
    .venv/bin/python scripts/extract_figures.py <stem> --force \\
        --bbox fig03=4:0.10,0.28,0.90,0.62

검출이 틀린 것은 _overlay/pNN.png 를 눈으로 보고 --bbox 로 고친다.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import statistics
import sys
from dataclasses import dataclass, field
from pathlib import Path

import pymupdf

REPO = Path(__file__).resolve().parent.parent
TYPES = ("papers", "reports", "books", "lectures")

# 캡션은 라벨 + 번호 + 구분자로 시작한다. 구분자가 콜론·파이프거나 공백 2칸이면 캡션이
# 확실하다. 공백 한 칸("Figure 1 Overview of …")인 venue 도 있는데, 그건 본문 속 참조와
# 생김새가 같아서 폰트 크기를 추가로 본다 — split_captions() 참고.
CAPTION_RE = re.compile(
    r"^\s*(Figure|Fig\.|FIGURE|Table|TABLE|그림|표)\s*"
    r"([A-Z]?\d+|[IVXLCDM]+)"
    r"(\s*[:|.∣–—-]|\s{2,}|\s|$)",
)
STRONG_DELIM = re.compile(r"\s*[:|.∣–—-]|\s{2,}")
# "Figure 3 shows ..." 처럼 산문 안에서 그림을 가리키는 문장
REF_RE = re.compile(
    r"^\s*(Figure|Fig\.|FIGURE|Table|TABLE|그림|표)\s*([A-Z]?\d+|[IVXLCDM]+)\s+"
    r"(shows?|illustrates?|presents?|depicts?|summari[sz]es?|reports?|compares?|"
    r"highlights?|describes?|visuali[sz]es?|displays?|plots?|outlines?|details?|"
    r"indicates?|demonstrates?|lists?|gives?|provides?|contains?|"
    r"and|in|of|we|for|is|are|has|have|가|는|은|이|을|를)\b",
    re.IGNORECASE,
)
FIGURE_LABELS = {"figure", "fig.", "그림"}

# 이보다 작은 그래픽은 글머리 기호·구분선으로 본다 (pt)
MIN_GRAPHIC_SIDE = 20.0
# 페이지의 이 비율을 넘는 그래픽은 배경 사각형이다
MAX_GRAPHIC_FRAC = 0.98
# 그래픽 면적의 이 비율 이상이 본문 텍스트와 겹치면 도식이 아니다
BODY_OVERLAP_FRAC = 0.35
# 본문 블록 면적의 이 비율 이상이 그래픽과 겹치면 도식 안의 라벨이다 (클램프에서 제외)
INFIG_OVERLAP_FRAC = 0.30
# 본문보다 이만큼 작은 글씨는 부제·범례다. 도식 영역을 끊는 경계로 쓰지 않는다
CLAMP_SIZE_SLACK = 0.6
# 캡션이 본문보다 이만큼까지 큰 것은 허용한다 (굵은 캡션·표 밀집 페이지)
CAPTION_SIZE_SLACK = 1.0
# 구분자가 약한 캡션은 본문보다 이만큼 작아야 인정한다
WEAK_DELIM_SIZE_GAP = 0.5
# find_tables() 후보 중 이보다 작거나 캡션에서 먼 것은 오검출로 본다
MIN_TABLE_FRAC = 0.015
# 표 괘선으로 인정할 가로선 (pt)
MIN_RULE_WIDTH = 60.0
MAX_RULE_HEIGHT = 3.0
# 괘선 뭉치가 표라고 보려면 최소 이 높이 (pt)
MIN_TABLE_HEIGHT = 16.0
# 표 밴드의 블록이 캡션과 같은 열에 있다고 볼 허용 오차 (페이지 폭 대비)
CENTER_TOL_FRAC = 0.12
LEFT_TOL_FRAC = 0.06
# 크롭 여백 (pt)
PAD = 6.0
# 이 면적비를 넘으면 사실상 페이지 전체 — 사람이 확인해야 한다
LOW_CONF_FRAC = 0.85
# column-band 폴백이 의미를 가지려면 이 정도 높이는 나와야 한다 (pt)
MIN_BAND_HEIGHT = 60.0


ROMAN_RE = re.compile(r"^[IVXLCDM]+$")
ROMAN = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}


def num_value(num: str) -> int:
    """"3" → 3, "IV" → 4, "A1" → 1. IEEE 계열은 표 번호를 로마자로 단다."""
    if num.isdigit():
        return int(num)
    if ROMAN_RE.match(num):
        total = 0
        for i, ch in enumerate(num):
            v = ROMAN[ch]
            total += -v if i + 1 < len(num) and ROMAN[num[i + 1]] > v else v
        return total
    m = re.search(r"\d+", num)
    return int(m.group()) if m else 0


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


# ─────────────────────────────────────────────── 페이지 해부


@dataclass
class Block:
    rect: pymupdf.Rect
    text: str          # 공백을 정리한 표시용
    raw: str           # 원본 간격 유지 — 캡션 구분자 판정에 쓴다
    size: float        # 블록 안에서 가장 많이 쓰인 글자 크기
    nlines: int = 1


@dataclass
class Item:
    kind: str          # figure | table
    num: str           # "3", "A1"
    label: str         # "Figure 3"
    page: int          # 0-based
    cap_rect: pymupdf.Rect
    caption: str
    rect: pymupdf.Rect | None = None
    strategy: str = "page-region"
    override: bool = False
    duplicates: list[int] = field(default_factory=list)

    @property
    def id(self) -> str:
        prefix = "fig" if self.kind == "figure" else "tab"
        n = num_value(self.num)
        if self.num.isdigit() or ROMAN_RE.match(self.num):
            return f"{prefix}{n:02d}"
        return f"{prefix}{self.num.lower()}"      # A1·S2 같은 부록 번호는 그대로

    @property
    def sort_key(self) -> tuple:
        return (0 if self.kind == "figure" else 1, num_value(self.num), self.num)


def text_blocks(page: pymupdf.Page) -> list[Block]:
    out = []
    for b in page.get_text("dict")["blocks"]:
        if b["type"] != 0:
            continue
        lines = [" ".join(s["text"] for s in line["spans"]) for line in b["lines"]]
        spans = [s for line in b["lines"] for s in line["spans"]]
        if not spans:
            continue
        raw = " ".join(lines)
        text = re.sub(r"\s+", " ", raw).strip()
        if not text:
            continue
        sizes: dict[float, int] = {}
        for s in spans:
            sizes[round(s["size"], 1)] = sizes.get(round(s["size"], 1), 0) + len(s["text"])
        out.append(Block(pymupdf.Rect(b["bbox"]), text, raw,
                         max(sizes, key=sizes.get), len(lines)))
    return out


def body_font_size(blocks: list[Block]) -> float:
    """문서 전체의 산문 글자 크기.

    페이지 단위로 재면 표가 가득한 쪽에서 표 본문(9pt)이 최빈값이 되어 정작 캡션(10pt)이
    "본문보다 크다"는 이유로 탈락한다(GraphRAG Table 1). 그래서 문서 전체로 잰다.

    가중치는 문자 수가 아니라 줄 수이고 블록당 8줄로 자른다. 문자 수로 재면 부록의
    6pt 로그 덤프 몇 덩이가 본문 전체를 이겨버린다(zhang 2026 은 본문이 6.0 으로 나왔다).
    """
    weight: dict[float, int] = {}
    for b in blocks:
        weight[b.size] = weight.get(b.size, 0) + min(b.nlines, 8)
    return max(weight, key=weight.get) if weight else 10.0


def doc_font_size(doc: pymupdf.Document, cache: dict[int, list[Block]]) -> float:
    every: list[Block] = []
    for pno in range(doc.page_count):
        cache[pno] = text_blocks(doc[pno])
        every += cache[pno]
    return body_font_size(every)


def is_caption(b: Block, m: re.Match, body_size: float) -> bool:
    if REF_RE.match(b.raw):
        return False
    if STRONG_DELIM.match(m.group(3)):
        # "Figure 3:" 처럼 구분자가 뚜렷하면 크기를 따지지 않는다. 본문보다 큰 캡션을
        # 쓰는 문서도 있고, 산문 오탐은 REF_RE 가 이미 막는다.
        return True
    # 구분자가 공백 한 칸뿐이면 본문 문장과 구별되지 않는다. 캡션은 본문보다 작게 조판되는
    # 관례에 기대어 크기로 가른다 — hou 2026 은 캡션 7.8pt, 본문 참조 9.9pt 다.
    return b.size <= body_size - WEAK_DELIM_SIZE_GAP


def split_captions(blocks: list[Block], body_size: float, pno: int) -> tuple[list[Item], list[Block]]:
    caps, rest = [], []
    for b in blocks:
        m = CAPTION_RE.match(b.raw)
        if m and is_caption(b, m, body_size):
            raw_label = m.group(1)
            kind = "figure" if raw_label.lower() in FIGURE_LABELS else "table"
            pretty = "Figure" if kind == "figure" else "Table"
            caps.append(Item(
                kind=kind, num=m.group(2).upper(), label=f"{pretty} {m.group(2).upper()}",
                page=pno, cap_rect=b.rect, caption=b.text[:300],
            ))
        else:
            rest.append(b)
    return caps, rest


def graphics(page: pymupdf.Page) -> list[pymupdf.Rect]:
    page_area = abs(page.rect.get_area()) or 1.0
    rects = [pymupdf.Rect(i["bbox"]) for i in page.get_image_info()]
    try:
        rects += page.cluster_drawings(x_tolerance=6, y_tolerance=6)
    except Exception:
        pass
    out = []
    for r in rects:
        r = r & page.rect
        if r.is_empty or r.width < MIN_GRAPHIC_SIDE or r.height < MIN_GRAPHIC_SIDE:
            continue
        if abs(r.get_area()) / page_area > MAX_GRAPHIC_FRAC:
            continue
        out.append(r)
    return out


def overlap_frac(a: pymupdf.Rect, b: pymupdf.Rect) -> float:
    """a 면적 중 b 와 겹치는 비율."""
    area = abs(a.get_area())
    if area <= 0:
        return 0.0
    return abs((a & b).get_area()) / area


def body_only(blocks: list[Block], graph: list[pymupdf.Rect]) -> list[Block]:
    """도식 안의 축 라벨·범례를 걸러낸 진짜 본문 블록."""
    return [b for b in blocks
            if not any(overlap_frac(b.rect, g) > INFIG_OVERLAP_FRAC for g in graph)]


# ─────────────────────────────────────────────── 영역 제안


def column_span(cap: Item) -> tuple[float, float]:
    """캡션의 가로 폭을 열(column) 프록시로 쓴다. 2단 레이아웃에서도 통한다."""
    return cap.cap_rect.x0 - 10.0, cap.cap_rect.x1 + 10.0


def same_column(rect: pymupdf.Rect, cap: pymupdf.Rect, page_width: float) -> bool:
    """블록이 캡션과 같은 열에 있는가.

    조판 관례상 캡션은 제 내용과 왼쪽 끝을 맞춘다. 그래서 왼쪽 정렬을 1순위로 본다 —
    2단 페이지에서 오른쪽 단의 표 캡션 아래로 양단을 가로지르는 본문이 오면 그 본문의
    왼쪽 끝이 캡션보다 한참 왼쪽이라 여기서 걸린다(RT-2 Table 1).

    캡션이 짧고 가운데 정렬이면 내용이 캡션보다 양쪽으로 넓다. 그때는 중심선으로 본다
    (GR00T Table 7). 둘 중 하나만 통과하면 같은 열로 친다.
    """
    if rect.x0 >= cap.x0 - max(24.0, LEFT_TOL_FRAC * page_width):
        return True
    return abs((rect.x0 + rect.x1) / 2 - (cap.x0 + cap.x1) / 2) <= CENTER_TOL_FRAC * page_width


def clamp_bound(cap: Item, body: list[Block], page: pymupdf.Rect, body_size: float,
                above: bool) -> float:
    """캡션 반대편에서 도식 영역을 끊어줄 본문 경계.

    도식 아래 "(a) …" 부제나 범례는 본문보다 작은 글씨다. 이런 블록까지 경계로 삼으면
    도식 본체가 통째로 잘려 나가므로(RT-2 Figure 6) 본문 크기 이상만 센다.
    """
    x0, x1 = column_span(cap)
    prose = [b.rect for b in body
             if b.size >= body_size - CLAMP_SIZE_SLACK and b.rect.x1 > x0 and b.rect.x0 < x1]
    if above:
        cands = [r.y1 for r in prose if r.y1 <= cap.cap_rect.y0 + 2]
        return max(cands) if cands else page.y0
    cands = [r.y0 for r in prose if r.y0 >= cap.cap_rect.y1 - 2]
    return min(cands) if cands else page.y1


def union(rects: list[pymupdf.Rect]) -> pymupdf.Rect:
    out = pymupdf.Rect(rects[0])
    for r in rects[1:]:
        out |= r
    return out


def grow(cap: Item, elems: list[tuple[pymupdf.Rect, str]], gap_limit: float,
         upward: bool) -> pymupdf.Rect | None:
    """캡션에서 바깥으로 자라며 여백이 벌어지거나 다른 캡션을 만나면 멈춘다.

    도식의 축 라벨·부제("(a) Root communities …")는 본문과 같은 크기로 조판되는 일이
    흔하다. 그런 블록을 경계로 삼으면 도식 본체가 통째로 잘린다(GraphRAG Figure 1·4).
    그래서 텍스트든 그래픽이든 붙어 있으면 삼키고, 여백에서만 멈춘다. 대신 최종 영역의
    바깥쪽 끝은 그래픽 기준으로 잘라 머리글 같은 무관한 텍스트를 배제한다.
    """
    x0, x1 = column_span(cap)
    edge = cap.cap_rect.y0 if upward else cap.cap_rect.y1
    sel: list[tuple[pymupdf.Rect, str]] = []
    for rect, kind in elems:
        if rect.x1 <= x0 or rect.x0 >= x1:
            continue
        if kind == "graphic":
            # cluster_drawings 는 도식과 페이지 아래쪽 자잘한 선을 한 덩이로 묶어버릴 때가
            # 있다. 그러면 클러스터가 캡션을 넘어 뻗어 통째로 탈락한다(RT-1 Figure 3 은
            # 도식 대신 그 아래 사진 한 장만 잡혔다). 캡션 선에서 잘라 쓴다.
            # PAD 만큼 안쪽에서 자른다 — 나중에 pad_clip 이 그만큼 되돌려 캡션 선에 딱 맞는다
            lo, hi = ((rect.y0, min(rect.y1, edge - PAD)) if upward
                      else (max(rect.y0, edge + PAD), rect.y1))
            if hi - lo < MIN_GRAPHIC_SIDE:
                continue
            rect = pymupdf.Rect(rect.x0, lo, rect.x1, hi)
        elif (rect.y1 > edge + 4) if upward else (rect.y0 < edge - 4):
            continue
        sel.append((rect, kind))
    sel.sort(key=lambda e: e[0].y1, reverse=upward)

    taken: list[tuple[pymupdf.Rect, str]] = []
    frontier = edge
    for rect, kind in sel:
        gap = (frontier - rect.y1) if upward else (rect.y0 - frontier)
        if gap > gap_limit:
            break
        if kind == "caption":
            break          # 위/아래 다른 그림의 캡션 — 남의 영역이다
        taken.append((rect, kind))
        frontier = min(frontier, rect.y0) if upward else max(frontier, rect.y1)

    graphs = [r for r, k in taken if k == "graphic"]
    if not graphs:
        return None
    bound = min(g.y0 for g in graphs) if upward else max(g.y1 for g in graphs)
    keep = [r for r, _ in taken if (r.y1 > bound - 1 if upward else r.y0 < bound + 1)]
    return union(keep) if keep else None


def propose_figure(cap: Item, graph: list[pymupdf.Rect], body: list[Block],
                   caps: list[Item], body_size: float) -> pymupdf.Rect | None:
    elems = ([(g, "graphic") for g in graph]
             + [(b.rect, "text") for b in body]
             + [(c.cap_rect, "caption") for c in caps if c is not cap])
    gap_limit = max(28.0, 3.0 * body_size)
    # 캡션은 보통 도식 아래에 붙지만, 위에 붙는 배치도 있다
    return grow(cap, elems, gap_limit, upward=True) or grow(cap, elems, gap_limit, upward=False)


def rule_lines(page: pymupdf.Page) -> list[pymupdf.Rect]:
    """표를 가르는 가로 괘선. booktabs 의 toprule/midrule/bottomrule 이 여기 해당한다."""
    out = []
    try:
        drawings = page.get_drawings()
    except Exception:
        return out
    for d in drawings:
        r = pymupdf.Rect(d["rect"])
        if r.width >= MIN_RULE_WIDTH and r.height <= MAX_RULE_HEIGHT:
            out.append(r)
    return out


def rule_stack(cap: Item, rules: list[pymupdf.Rect], caps: list[Item], page: pymupdf.Rect,
               page_width: float, reach: float, below: bool) -> pymupdf.Rect | None:
    """캡션 한쪽에서 다른 캡션을 만나기 전까지의 괘선 뭉치.

    머리글 구분선도 같은 모양이라, 캡션에 붙어 있는 괘선에서 시작한 것만 인정한다.
    """
    others = [c.cap_rect for c in caps if c is not cap
              and same_column(c.cap_rect, cap.cap_rect, page_width)]
    if below:
        lo = cap.cap_rect.y1
        hi = min([c.y0 for c in others if c.y0 >= lo] or [page.y1])
    else:
        hi = cap.cap_rect.y0
        lo = max([c.y1 for c in others if c.y1 <= hi] or [page.y0])
    stack = [r for r in rules
             if lo - 2 <= r.y0 and r.y1 <= hi + 2
             and same_column(r, cap.cap_rect, page_width)]
    if len(stack) < 2:
        return None
    # 페이지 머리글 구분선은 본문 폭에 맞춰 그려져 표 괘선보다 넓다. 폭으로 떨어낸다.
    mid = statistics.median(r.width for r in stack)
    stack = [r for r in stack if 0.6 * mid <= r.width <= 1.15 * mid]
    if len(stack) < 2:
        return None
    nearest = min(stack, key=lambda r: (r.y0 - cap.cap_rect.y1) if below else (cap.cap_rect.y0 - r.y1))
    gap = (nearest.y0 - cap.cap_rect.y1) if below else (cap.cap_rect.y0 - nearest.y1)
    if gap > reach:
        return None
    # 괘선은 높이 0 인 선이라 Rect union 이 빈 사각형으로 취급해 버린다. 직접 계산한다.
    out = pymupdf.Rect(min(r.x0 for r in stack), min(r.y0 for r in stack),
                       max(r.x1 for r in stack), max(r.y1 for r in stack))
    return out if out.height >= MIN_TABLE_HEIGHT else None


def propose_table(cap: Item, page_obj: pymupdf.Page, body: list[Block], caps: list[Item],
                  body_size: float) -> pymupdf.Rect | None:
    """괘선 → find_tables() → 텍스트 밴드 순으로 표 영역을 좁힌다.

    가로 괘선이 가장 믿을 만하다. 여백 크기로 표의 끝을 재는 방식은 임계값이 표마다
    달라 안정적이지 않았다(GraphRAG Table 3 은 24pt 에서, RT-2 Table 3 은 23pt 에서
    끊어야 해서 하나의 값으로 둘 다 맞출 수 없다). 괘선은 그 경계를 조판이 이미 그려둔
    것이라 임계값이 필요 없다.

    find_tables() 는 글머리 기호 목록이나 두 줄짜리 캡션도 표로 잡는다. RT-2 p23 에서는
    진짜 표를 놓치고 면적 0.006 짜리 오검출을 돌려줬다. 크기·인접성으로 거른다.
    """
    x0, x1 = column_span(cap)
    pw = page_obj.rect.width
    page_area = abs(page_obj.rect.get_area()) or 1.0

    reach = max(30.0, 3.0 * body_size)
    rules = rule_lines(page_obj)
    stacks = [s for s in (rule_stack(cap, rules, caps, page_obj.rect, pw, reach, below=False),
                          rule_stack(cap, rules, caps, page_obj.rect, pw, reach, below=True)) if s]
    if stacks:
        best = max(stacks, key=lambda r: abs(r.get_area()))
        rows = [b.rect for b in body
                if b.rect.y0 >= best.y0 - 2 and b.rect.y1 <= best.y1 + 2
                and same_column(b.rect, cap.cap_rect, pw)]
        return union([best] + rows)

    try:
        found = [pymupdf.Rect(t.bbox) for t in page_obj.find_tables().tables]
    except Exception:
        found = []
    near = [t for t in found
            if t.x1 > x0 and t.x0 < x1
            and abs(t.get_area()) / page_area >= MIN_TABLE_FRAC
            and min(abs(t.y0 - cap.cap_rect.y1), abs(cap.cap_rect.y0 - t.y1)) <= reach]
    if near:
        return min(near, key=lambda t: min(abs(t.y0 - cap.cap_rect.y1), abs(cap.cap_rect.y0 - t.y1)))

    # 캡션이 표 위에 붙는 venue 도 아래에 붙는 venue 도 있어서 양쪽을 다 재고 큰 쪽을 고른다
    bands = [b for b in (text_band(cap, body, body_size, pw, below=False),
                         text_band(cap, body, body_size, pw, below=True)) if b]
    return max(bands, key=lambda r: abs(r.get_area())) if bands else None


def text_band(cap: Item, body: list[Block], body_size: float, page_width: float,
              below: bool) -> pymupdf.Rect | None:
    """캡션에 붙은 텍스트 덩어리를 여백이 벌어질 때까지 모은다 (표 폴백).

    섹션 제목은 본문보다 큰 글씨라 제외한다 — 그러지 않으면 캡션 바로 위 제목 한 줄이
    표 대신 잡힌다(GraphRAG Table 5 의 "D Example Answer Comparison").

    다른 열의 블록도 뺀다 — same_column() 참고.
    """
    x0, x1 = column_span(cap)
    cand = [b.rect for b in body
            if b.size <= body_size + CAPTION_SIZE_SLACK
            and same_column(b.rect, cap.cap_rect, page_width)
            and b.rect.x1 > x0 and b.rect.x0 < x1
            and (b.rect.y0 >= cap.cap_rect.y1 - 2 if below else b.rect.y1 <= cap.cap_rect.y0 + 2)]
    if not cand:
        return None
    cand.sort(key=lambda r: r.y0, reverse=not below)
    # 한 단 안의 문단 간격은 본문 크기의 1~1.5배다. 이보다 확실히 벌어지면 다른 요소다.
    gap_limit = max(14.0, 2.0 * body_size)

    edge = cap.cap_rect.y1 if below else cap.cap_rect.y0
    first_gap = (cand[0].y0 - edge) if below else (edge - cand[0].y1)
    if first_gap > gap_limit:
        return None
    taken = [cand[0]]
    for prev, cur in zip(cand, cand[1:]):
        gap = (cur.y0 - prev.y1) if below else (prev.y0 - cur.y1)
        if gap > gap_limit:
            break
        taken.append(cur)
    return union(taken)


def propose_band(cap: Item, body: list[Block], page: pymupdf.Rect,
                 body_size: float) -> pymupdf.Rect | None:
    """그래픽이 하나도 안 잡혔을 때 캡션 위 여백 밴드를 통째로 준다."""
    x0, x1 = column_span(cap)
    top = clamp_bound(cap, body, page, body_size, above=True)
    height = cap.cap_rect.y0 - top
    if height < MIN_BAND_HEIGHT:
        return None
    return pymupdf.Rect(max(x0, page.x0), top, min(x1, page.x1), cap.cap_rect.y0)


def resolve(cap: Item, page_obj: pymupdf.Page, graph: list[pymupdf.Rect],
            body: list[Block], caps: list[Item], body_size: float) -> None:
    """캡션 하나에 대해 폴백 사다리를 내려간다."""
    page = page_obj.rect
    if cap.kind == "table":
        rect = propose_table(cap, page_obj, body, caps, body_size)
        if rect and valid(rect):
            cap.rect, cap.strategy = rect, "table-region"
            return
    else:
        rect = propose_figure(cap, graph, body, caps, body_size)
        if rect and valid(rect):
            cap.rect, cap.strategy = rect, "caption-region"
            return
    rect = propose_band(cap, body, page, body_size)
    if rect and valid(rect):
        cap.rect, cap.strategy = rect, "column-band"
        return
    cap.rect, cap.strategy = pymupdf.Rect(page), "page-region"


def valid(r: pymupdf.Rect) -> bool:
    return not r.is_empty and r.width >= 10 and r.height >= 10


# ─────────────────────────────────────────────── 렌더


def pad_clip(rect: pymupdf.Rect, page: pymupdf.Rect) -> pymupdf.Rect:
    out = pymupdf.Rect(rect.x0 - PAD, rect.y0 - PAD, rect.x1 + PAD, rect.y1 + PAD)
    return out & page


def render(page: pymupdf.Page, rect: pymupdf.Rect, dpi: int, dest: Path) -> None:
    page.get_pixmap(clip=pad_clip(rect, page.rect), dpi=dpi).save(str(dest))


def write_overlays(pdf: Path, items: list[Item], outdir: Path, dpi: int = 110) -> list[int]:
    """검출 영역을 빨간 사각형으로 얹은 확인용 페이지. 원본 PDF 는 저장하지 않는다."""
    by_page: dict[int, list[Item]] = {}
    for it in items:
        by_page.setdefault(it.page, []).append(it)
    if not by_page:
        return []
    outdir.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(pdf)
    try:
        for pno, group in sorted(by_page.items()):
            page = doc[pno]
            for it in group:
                page.draw_rect(it.cap_rect, color=(0.1, 0.35, 0.9), width=0.8)
                if it.rect:
                    page.draw_rect(pad_clip(it.rect, page.rect), color=(0.9, 0.1, 0.1), width=1.6)
                    anchor = pymupdf.Point(max(page.rect.x0 + 4, it.rect.x0),
                                           max(page.rect.y0 + 12, it.rect.y0 - 4))
                    page.insert_text(anchor, f"{it.id} [{it.strategy}]",
                                     fontsize=10, color=(0.9, 0.1, 0.1))
            page.get_pixmap(dpi=dpi).save(str(outdir / f"p{pno + 1:02d}.png"))
    finally:
        doc.close()
    return sorted(by_page)


# ─────────────────────────────────────────────── override


def parse_bbox(spec: str) -> tuple[str, int, tuple[float, float, float, float]]:
    """fig03=4:0.10,0.28,0.90,0.62 → ("fig03", 4, (…))"""
    try:
        fid, rhs = spec.split("=", 1)
        pno, coords = rhs.split(":", 1)
        nums = tuple(float(v) for v in coords.split(","))
    except ValueError:
        raise SystemExit(f"✗ --bbox 형식 오류: {spec!r}  (예: fig03=4:0.10,0.28,0.90,0.62)")
    if len(nums) != 4:
        raise SystemExit(f"✗ --bbox 좌표는 4개여야 한다: {spec!r}")
    if not all(0.0 <= v <= 1.0 for v in nums):
        raise SystemExit(f"✗ --bbox 좌표는 0~1 정규화 값이다: {spec!r}")
    if nums[0] >= nums[2] or nums[1] >= nums[3]:
        raise SystemExit(f"✗ --bbox 는 x0<x1, y0<y1 이어야 한다: {spec!r}")
    return fid.strip(), int(pno), nums


def label_from_id(fid: str) -> tuple[str, str, str]:
    m = re.match(r"^(fig|tab)([A-Za-z]?\d+)$", fid)
    if not m:
        raise SystemExit(f"✗ --bbox 의 id 형식이 아니다: {fid!r}  (fig03 / tab02 꼴)")
    kind = "figure" if m.group(1) == "fig" else "table"
    num = m.group(2).upper().lstrip("0") or "0"
    return kind, num, f"{'Figure' if kind == 'figure' else 'Table'} {num}"


def apply_overrides(items: list[Item], specs: list[str], doc: pymupdf.Document) -> None:
    index = {it.id: it for it in items}
    for spec in specs:
        fid, pno, (nx0, ny0, nx1, ny1) = parse_bbox(spec)
        if not 1 <= pno <= doc.page_count:
            raise SystemExit(f"✗ --bbox 페이지 범위 초과: {spec!r} (문서 {doc.page_count}쪽)")
        pr = doc[pno - 1].rect
        rect = pymupdf.Rect(pr.x0 + nx0 * pr.width, pr.y0 + ny0 * pr.height,
                            pr.x0 + nx1 * pr.width, pr.y0 + ny1 * pr.height)
        it = index.get(fid)
        if it is None:
            kind, num, label = label_from_id(fid)
            it = Item(kind=kind, num=num, label=label, page=pno - 1,
                      cap_rect=pymupdf.Rect(rect.x0, rect.y1, rect.x1, rect.y1 + 1),
                      caption="")
            items.append(it)
            index[fid] = it
        it.page, it.rect, it.strategy, it.override = pno - 1, rect, "manual", True
        log(f"  · override {fid} → p{pno} {tuple(round(v, 1) for v in rect)}")


# ─────────────────────────────────────────────── 매니페스트


def manifest(items: list[Item], stem: str, kind_dir: str, doc: pymupdf.Document,
             dpi: int, pages: list[int]) -> list[dict]:
    out = []
    for it in items:
        pr = doc[it.page].rect
        clip = pad_clip(it.rect, pr)
        area = abs(clip.get_area()) / (abs(pr.get_area()) or 1.0)
        name = f"{it.id}.png"
        entry = {
            "id": it.id,
            "label": it.label,
            "kind": it.kind,
            "file": f"assets/{stem}/{name}",
            "raw": f"raw/{kind_dir}/{stem}-figures/{name}",
            "page": it.page + 1,
            "caption": it.caption,
            "bbox": [round(v, 2) for v in clip],
            "bbox_norm": [round((clip.x0 - pr.x0) / pr.width, 4),
                          round((clip.y0 - pr.y0) / pr.height, 4),
                          round((clip.x1 - pr.x0) / pr.width, 4),
                          round((clip.y1 - pr.y0) / pr.height, 4)],
            "dpi": dpi,
            "area_frac": round(area, 3),
            "strategy": it.strategy,
            "low_confidence": area > LOW_CONF_FRAC,
            "curated": False,
        }
        if it.override:
            entry["override"] = True
        if it.page + 1 in [p + 1 for p in pages]:
            entry["overlay"] = f"raw/{kind_dir}/{stem}-figures/_overlay/p{it.page + 1:02d}.png"
        if it.duplicates:
            entry["duplicate_pages"] = [p + 1 for p in it.duplicates]
        out.append(entry)
    return out


def print_table(items: list[Item], doc: pymupdf.Document) -> None:
    print("\n| id | page | label | strategy | 면적비 | caption |")
    print("|---|---|---|---|---|---|")
    for it in items:
        pr = doc[it.page].rect
        area = abs(pad_clip(it.rect, pr).get_area()) / (abs(pr.get_area()) or 1.0)
        flag = " ⚠" if area > LOW_CONF_FRAC else ""
        cap = it.caption.replace("|", "/")[:52] or "(없음)"
        print(f"| {it.id} | {it.page + 1} | {it.label} | {it.strategy}{flag} | {area:.2f} | {cap} |")


def print_handoff(entries: list[dict]) -> None:
    print("\n## 8. 그림 후보 (Figure Candidates)  ← sources/ 에 붙여넣을 초안\n")
    print("| id | page | caption | strategy | 추천 |")
    print("|---|---|---|---|---|")
    for e in entries:
        good = e["strategy"] in ("caption-region", "table-region", "manual") and not e["low_confidence"]
        mark = "★ wiki 권장" if good else "(확인 필요)"
        cap = (e["caption"] or "").replace("|", "/")[:56] or "(캡션 없음)"
        print(f"| {e['id']} | {e['page']} | {cap} | {e['strategy']} | {mark} |")


# ─────────────────────────────────────────────── main


def detect(doc: pymupdf.Document) -> list[Item]:
    items: list[Item] = []
    seen: dict[str, Item] = {}
    cache: dict[int, list[Block]] = {}
    bs = doc_font_size(doc, cache)
    for pno in range(doc.page_count):
        blocks = cache[pno]
        if not blocks:
            continue
        caps, rest = split_captions(blocks, bs, pno)
        if not caps:
            continue
        page = doc[pno]
        graph_all = graphics(page)
        body = body_only(rest, graph_all)
        graph = [g for g in graph_all
                 if not any(overlap_frac(g, b.rect) > BODY_OVERLAP_FRAC for b in body)]
        for cap in caps:
            key = cap.id
            if key in seen:
                # 부록에서 같은 그림을 다시 언급하는 경우 — 첫 등장만 쓴다
                seen[key].duplicates.append(pno)
                continue
            resolve(cap, page, graph, body, caps, bs)
            seen[key] = cap
            items.append(cap)
    items.sort(key=lambda it: it.sort_key)
    return items


def pdf_path(stem: str, ftype: str) -> Path:
    return REPO / "raw" / ftype / f"{stem}.pdf"


def figures_dir(stem: str, ftype: str) -> Path:
    return REPO / "raw" / ftype / f"{stem}-figures"


def extract_stem(stem: str, ftype: str = "papers", dpi: int = 300,
                 bboxes: list[str] | None = None,
                 page_shots: bool = False) -> tuple[list[Item], list[dict]]:
    """검출부터 매니페스트 기록까지 한 번에. remap_figures.py 가 이 함수를 쓴다."""
    pdf = pdf_path(stem, ftype)
    outdir = figures_dir(stem, ftype)
    doc = pymupdf.open(pdf)
    try:
        items = detect(doc)
        if bboxes:
            apply_overrides(items, bboxes, doc)
            items.sort(key=lambda it: it.sort_key)
        if not items:
            return [], []
        if outdir.exists():
            shutil.rmtree(outdir)
        outdir.mkdir(parents=True)
        for it in items:
            render(doc[it.page], it.rect, dpi, outdir / f"{it.id}.png")
        if page_shots:
            for pno in sorted({it.page for it in items}):
                doc[pno].get_pixmap(dpi=150).save(str(outdir / f"page-p{pno + 1:02d}.png"))
        pages = write_overlays(pdf, items, outdir / "_overlay")
        entries = manifest(items, stem, ftype, doc, dpi, pages)
        (outdir / "figures.json").write_text(
            json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")
        return items, entries
    finally:
        doc.close()


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("stem", help="raw/{type}/{stem}.pdf 의 stem")
    ap.add_argument("--type", default="papers", choices=TYPES)
    ap.add_argument("--dpi", type=int, default=300)
    ap.add_argument("--dry-run", action="store_true", help="검출 표만 출력하고 파일은 안 쓴다")
    ap.add_argument("--overlay-only", action="store_true", help="오버레이만 다시 만든다")
    ap.add_argument("--force", action="store_true", help="기존 -figures/ 를 덮어쓴다")
    ap.add_argument("--page-shots", action="store_true",
                    help="검출된 페이지의 전면 렌더도 page-pNN.png 로 남긴다")
    ap.add_argument("--bbox", action="append", default=[], metavar="ID=PAGE:x0,y0,x1,y1",
                    help="수동 크롭. 0~1 정규화 좌표. 반복 지정 가능")
    a = ap.parse_args()

    pdf = REPO / "raw" / a.type / f"{a.stem}.pdf"
    if not pdf.exists():
        log(f"✗ 없다: {pdf.relative_to(REPO)}")
        return 1
    outdir = REPO / "raw" / a.type / f"{a.stem}-figures"
    if outdir.exists() and not (a.force or a.dry_run or a.overlay_only):
        log(f"✗ 이미 존재한다: {outdir.relative_to(REPO)} — 덮어쓰려면 --force")
        return 1

    doc = pymupdf.open(pdf)
    try:
        items = detect(doc)
        if a.bbox:
            apply_overrides(items, a.bbox, doc)
            items.sort(key=lambda it: it.sort_key)
        if not items:
            log(f"✗ 캡션을 하나도 못 찾았다: {pdf.name} — 스캔 PDF 이거나 캡션 형식이 다르다.")
            return 1

        figs = sum(1 for it in items if it.kind == "figure")
        tabs = len(items) - figs
        strat = {}
        for it in items:
            strat[it.strategy] = strat.get(it.strategy, 0) + 1
        log(f"검출 {len(items)}건 (figure {figs} · table {tabs}) — "
            + ", ".join(f"{k} {v}" for k, v in sorted(strat.items())))

        if a.dry_run:
            print_table(items, doc)
            print("\n[dry-run] 파일을 쓰지 않았다. 실제 추출은 --dry-run 없이 실행하라.")
            return 0

        if not a.overlay_only:
            if outdir.exists():
                shutil.rmtree(outdir)
            outdir.mkdir(parents=True)
            for it in items:
                render(doc[it.page], it.rect, a.dpi, outdir / f"{it.id}.png")
            if a.page_shots:
                for pno in sorted({it.page for it in items}):
                    doc[pno].get_pixmap(dpi=150).save(str(outdir / f"page-p{pno + 1:02d}.png"))

        pages = write_overlays(pdf, items, outdir / "_overlay")
        entries = manifest(items, a.stem, a.type, doc, a.dpi, pages)
        (outdir / "figures.json").write_text(
            json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")

        print(f"\n✓ {outdir.relative_to(REPO)}/  ({len(entries)}개 + figures.json)")
        print(f"✓ {(outdir / '_overlay').relative_to(REPO)}/  ({len(pages)}쪽 — 검출 영역 확인용)")
        print_table(items, doc)
    finally:
        doc.close()

    print_handoff(entries)
    weak = [e["id"] for e in entries if e["low_confidence"] or e["strategy"] == "page-region"]
    if weak:
        print(f"\n⚠ 확인 필요: {', '.join(weak)} — _overlay/ 를 보고 --bbox 로 고쳐라.")
    print(f"\n다음: Step 3 — sources/{a.stem}.md 작성. 캡션은 실제 이미지를 보고 다시 쓴다.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
