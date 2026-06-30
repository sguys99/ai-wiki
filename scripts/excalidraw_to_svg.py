#!/usr/bin/env python3
"""Convert hand-drawn Excalidraw diagrams to self-contained, web-renderable SVG.

The site pipeline (site/lib/markdown.mjs) turns Obsidian `![[...]]` embeds into
<img src=...> and copies wiki/assets verbatim to dist/. Browsers cannot render a
.excalidraw JSON in an <img>, but SVG renders everywhere (GitHub Pages + Obsidian,
no plugin). So we keep the .excalidraw as the editable source and emit a sibling
.svg with a feTurbulence displacement filter on the shapes for a sketchy look
(text stays crisp on top).

Usage:
    .venv/bin/python3 scripts/excalidraw_to_svg.py [PATH ...]

PATH may be a .excalidraw file or a directory (scanned recursively). With no
argument, converts every .excalidraw under wiki/assets/. Each <name>.excalidraw
is written next to itself as <name>.svg.

Supported Excalidraw elements: rectangle, ellipse, diamond, arrow (with multi-
point paths + dashed style), and text (bound-to-container → centered, free → top-
left). Mirrors the JSON the bundled excalidraw-diagram-generator skill produces.
"""
import json, os, glob, html, math, sys, zlib

PAD = 24
FONT = "'Pretendard','Apple SD Gothic Neo','Malgun Gothic','Segoe UI',sans-serif"
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def esc(s):
    return html.escape(str(s), quote=True)


def by_id(els):
    return {e["id"]: e for e in els}


def bbox(els):
    x0, y0, x1, y1 = [], [], [], []
    for e in els:
        if e["type"] == "arrow":
            ax = [e["x"] + p[0] for p in e["points"]]
            ay = [e["y"] + p[1] for p in e["points"]]
            x0.append(min(ax)); y0.append(min(ay)); x1.append(max(ax)); y1.append(max(ay))
        else:
            x0.append(e["x"]); y0.append(e["y"])
            x1.append(e["x"] + e.get("width", 0)); y1.append(e["y"] + e.get("height", 0))
    return min(x0), min(y0), max(x1), max(y1)


def shape_svg(e):
    x, y, w, h = e["x"], e["y"], e["width"], e["height"]
    bg = e["backgroundColor"]
    fill = "none" if bg == "transparent" else bg
    common = f'fill="{fill}" stroke="{e["strokeColor"]}" stroke-width="2"'
    t = e["type"]
    if t == "rectangle":
        return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" ry="10" {common}/>'
    if t == "ellipse":
        return f'<ellipse cx="{x + w/2}" cy="{y + h/2}" rx="{w/2}" ry="{h/2}" {common}/>'
    if t == "diamond":
        pts = f"{x+w/2},{y} {x+w},{y+h/2} {x+w/2},{y+h} {x},{y+h/2}"
        return f'<polygon points="{pts}" {common}/>'
    return ""


def arrow_svg(e):
    x, y = e["x"], e["y"]
    pts = [(x + p[0], y + p[1]) for p in e["points"]]
    stroke = e["strokeColor"]
    dash = ' stroke-dasharray="9 7"' if e.get("strokeStyle") == "dashed" else ""
    d = "M " + " L ".join(f"{px:.1f} {py:.1f}" for px, py in pts)
    line = (f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round"{dash}/>')
    (x0, y0), (x1, y1) = pts[-2], pts[-1]
    ang = math.atan2(y1 - y0, x1 - x0)
    L, W = 13, 6
    bx, by = x1 - L * math.cos(ang), y1 - L * math.sin(ang)
    px, py = -math.sin(ang), math.cos(ang)
    head = (f'{x1:.1f},{y1:.1f} {bx + W*px:.1f},{by + W*py:.1f} '
            f'{bx - W*px:.1f},{by - W*py:.1f}')
    return line + f'<polygon points="{head}" fill="{stroke}"/>'


def text_svg(e, idx):
    fs = e["fontSize"]
    lh = fs * 1.25
    lines = e["text"].split("\n")
    cont = e.get("containerId")
    halo = ""
    if cont is not None:
        c = idx.get(cont)
        if c and c["type"] == "arrow":
            ax = [c["x"] + p[0] for p in c["points"]]
            ay = [c["y"] + p[1] for p in c["points"]]
            cx, cy = (min(ax) + max(ax)) / 2, (min(ay) + max(ay)) / 2
            halo = ' paint-order="stroke" stroke="#ffffff" stroke-width="3.5"'
        elif c:
            cx, cy = c["x"] + c["width"] / 2, c["y"] + c["height"] / 2
        else:
            cx, cy = e["x"] + e["width"] / 2, e["y"] + e["height"] / 2
        anchor, x0, y0 = "middle", cx, cy - (len(lines) - 1) * lh / 2
    else:
        anchor, x0, y0 = "start", e["x"], e["y"] + fs
    tspans = "".join(
        f'<tspan x="{x0:.1f}" dy="{0 if k == 0 else lh:.2f}">{esc(ln)}</tspan>'
        for k, ln in enumerate(lines))
    return (f'<text x="{x0:.1f}" y="{y0:.1f}" font-family="{FONT}" font-size="{fs}" '
            f'fill="{e["strokeColor"]}" text-anchor="{anchor}"{halo} '
            f'dominant-baseline="middle">{tspans}</text>')


def convert(path):
    doc = json.load(open(path))
    els = doc["elements"]
    idx = by_id(els)
    x0, y0, x1, y1 = bbox(els)
    x0 -= PAD; y0 -= PAD; x1 += PAD; y1 += PAD
    W, H = x1 - x0, y1 - y0
    shapes = [shape_svg(e) for e in els if e["type"] in ("rectangle", "ellipse", "diamond")]
    arrows = [arrow_svg(e) for e in els if e["type"] == "arrow"]
    texts = [text_svg(e, idx) for e in els if e["type"] == "text"]
    seed = zlib.crc32(os.path.basename(path).encode()) % 100  # deterministic
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.0f} {y0:.0f} {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" font-family="{FONT}">
  <defs>
    <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="{seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <rect x="{x0:.0f}" y="{y0:.0f}" width="{W:.0f}" height="{H:.0f}" fill="#ffffff"/>
  <g filter="url(#sketch)" stroke-linecap="round">
    {"".join(shapes)}
    {"".join(arrows)}
  </g>
  <g>
    {"".join(texts)}
  </g>
</svg>
'''
    out = path[:-len(".excalidraw")] + ".svg"
    with open(out, "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote %s (%dx%d)" % (os.path.relpath(out, REPO), W, H))


def main(argv):
    targets = argv or [os.path.join(REPO, "wiki", "assets")]
    files = []
    for t in targets:
        if os.path.isdir(t):
            files += glob.glob(os.path.join(t, "**", "*.excalidraw"), recursive=True)
        elif t.endswith(".excalidraw"):
            files.append(t)
    for p in sorted(files):
        convert(p)
    print("converted %d file(s)" % len(files))


if __name__ == "__main__":
    main(sys.argv[1:])
