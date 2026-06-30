#!/usr/bin/env python3
"""Render the 8 "loop engineering" diagrams from Runkle 2026 as clean SVG.

Faithful re-drawing of the figures in the original LangChain blog post
(provided by the user as screenshots): each of the 4 loops has a generic and a
docs-writer variant, and the loops nest incrementally —
    agent ⊂ verification ⊂ event ⊂ hill-climbing.
Plain crisp SVG (renders in <img> on GitHub Pages and in Obsidian, no plugin).

    python3 scripts/build_loop_diagrams.py

Writes 8 .svg into wiki/assets/runkle-2026-the-art-of-loop-engineering/.
"""
import os, math, html

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, "wiki", "assets", "runkle-2026-the-art-of-loop-engineering")
os.makedirs(OUT, exist_ok=True)

FONT = "Inter,'Helvetica Neue','Pretendard','Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif"

# palette (matched to the originals)
TAN_F, TAN_S, TAN_T = "#edeae1", "#c3bca6", "#5a5341"
PUR_F, PUR_S, PUR_T, PUR_SUB = "#eee9fc", "#8a7ce0", "#4a3ca6", "#6a5cc4"
GRN_F, GRN_S, GRN_T, GRN_SUB = "#d9efe2", "#52a883", "#1f7a55", "#2e8b66"
BLU_F, BLU_S, BLU_T, BLU_SUB = "#dcebfb", "#74a8e4", "#235ba8", "#2f6fc0"
RED_F, RED_S, RED_T, RED_SUB = "#fbe6e1", "#dd9a86", "#9a3a26", "#b5503a"
FLOW = "#8c8c8c"        # solid flow arrows
DASH = "#6f6f6f"        # action / observation
GREEN = "#1f9d6b"       # retry-with-feedback
BLACK = "#555555"       # new events / new request
TRACE = "#8c8c8c"


class SVG:
    def __init__(self):
        self.el = []
        self.xs = []
        self.ys = []

    def _t(self, x, y):
        self.xs.append(x); self.ys.append(y)

    def esc(self, s):
        return html.escape(str(s), quote=True)

    # ---- shapes ---------------------------------------------------------
    def rrect(self, x, y, w, h, fill, stroke, rx=11, sw=1.6, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.el.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
                       f'ry="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>')
        self._t(x, y); self._t(x + w, y + h)

    def box(self, x, y, w, h, fill, stroke, title, tcol, sub=None, scol=None):
        self.rrect(x, y, w, h, fill, stroke)
        cx = x + w / 2
        if sub:
            self.text(cx, y + h / 2 - 8, title, 16, tcol, "middle", 700)
            self.text(cx, y + h / 2 + 12, sub, 12.5, scol, "middle", 600)
        else:
            self.text(cx, y + h / 2, title, 17, tcol, "middle", 700)

    def pill(self, cx, y, w, h, title, sub=None):
        x = cx - w / 2
        self.rrect(x, y, w, h, TAN_F, TAN_S, rx=h / 2)
        if sub:
            self.text(cx, y + h / 2 - 9, title, 15, TAN_T, "middle", 700)
            self.text(cx, y + h / 2 + 11, sub, 12.5, TAN_T, "middle", 500)
        else:
            self.text(cx, y + h / 2, title, 15.5, TAN_T, "middle", 600)

    def dbox(self, x, y, w, h, color, label):
        self.rrect(x, y, w, h, "none", color, rx=14, sw=1.5, dash="6 5")
        self.text(x + 16, y + 17, label, 13, color, "start", 700)
        self._t(x + 16 + len(label) * 8, y)

    # ---- text -----------------------------------------------------------
    def text(self, x, y, s, size, color, anchor="start", weight=400, italic=False):
        it = ' font-style="italic"' if italic else ""
        self.el.append(
            f'<text x="{x:.1f}" y="{y:.1f}" font-family="{FONT}" font-size="{size}" '
            f'fill="{color}" text-anchor="{anchor}" font-weight="{weight}"{it} '
            f'dominant-baseline="middle">{self.esc(s)}</text>')
        wpx = len(s) * size * 0.62
        if anchor == "middle":
            self._t(x - wpx / 2, y); self._t(x + wpx / 2, y)
        elif anchor == "end":
            self._t(x - wpx, y); self._t(x, y)
        else:
            self._t(x, y); self._t(x + wpx, y)

    # ---- arrows ---------------------------------------------------------
    def head(self, x, y, ang, color, s=9):
        a1, a2 = ang + math.radians(148), ang - math.radians(148)
        p1 = (x + s * math.cos(a1), y + s * math.sin(a1))
        p2 = (x + s * math.cos(a2), y + s * math.sin(a2))
        self.el.append(f'<polygon points="{x:.1f},{y:.1f} {p1[0]:.1f},{p1[1]:.1f} '
                       f'{p2[0]:.1f},{p2[1]:.1f}" fill="{color}"/>')

    def arrow(self, pts, color=FLOW, sw=1.8, dash=None, head=True):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        pp = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
        self.el.append(f'<polyline points="{pp}" fill="none" stroke="{color}" '
                       f'stroke-width="{sw}" stroke-linecap="round" '
                       f'stroke-linejoin="round"{d}/>')
        for x, y in pts:
            self._t(x, y)
        if head:
            (x0, y0), (x1, y1) = pts[-2], pts[-1]
            self.head(x1, y1, math.atan2(y1 - y0, x1 - x0), color)

    def curve(self, d, color, sw, tip, ang, dash=None, ctrl=()):
        ds = f' stroke-dasharray="{dash}"' if dash else ""
        self.el.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{sw}" '
                       f'stroke-linecap="round"{ds}/>')
        self.head(tip[0], tip[1], ang, color)
        for x, y in ctrl:
            self._t(x, y)

    # ---- output ---------------------------------------------------------
    def save(self, name, title):
        # title centered at top
        self.text(525, min(self.ys) - 4, title, 15, "#6a6a6a", "middle", 700)
        P = 30
        x0, y0 = min(self.xs) - P, min(self.ys) - 22
        w = max(self.xs) - min(self.xs) + 2 * P
        h = max(self.ys) - y0 + P
        body = "\n  ".join(self.el)
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" '
               f'viewBox="{x0:.0f} {y0:.0f} {w:.0f} {h:.0f}" '
               f'width="{w:.0f}" height="{h:.0f}" font-family="{FONT}">\n'
               f'  <rect x="{x0:.0f}" y="{y0:.0f}" width="{w:.0f}" height="{h:.0f}" fill="#ffffff"/>\n'
               f'  {body}\n</svg>\n')
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
            f.write(svg)
        print(f"wrote {name:34} {w:.0f}x{h:.0f}")


# fixed inner geometry shared by every diagram --------------------------------
MODEL = (210, 360, 230, 72)
TOOLS = (610, 360, 230, 72)
RESULT = (210, 480, 230, 64)
GRADER = (210, 620, 630, 64)
SYS = (210, 740, 630, 64)
ENGINE = (210, 840, 630, 72)
AGENT_BOX = (175, 325, 700, 235)
VERIF_BOX = (160, 303, 720, 399)
EVENT_BOX = (145, 283, 752, 545)

L = {
    1: dict(title=("LOOP 1 — AGENT LOOP", "DOCS WRITER AGENT LOOP"), pill_y=250),
    2: dict(title=("LOOP 2 — VERIFICATION LOOP", "DOCS WRITER VERIFICATION LOOP"), pill_y=250),
    3: dict(title=("LOOP 3 — EVENT LOOP", "DOCS WRITER EVENT LOOP"), pill_y=228),
    4: dict(title=("LOOP 4 — HILL CLIMBING LOOP", "DOCS WRITER HILL CLIMBING LOOP"), pill_y=206),
}


def build(level, docs):
    s = SVG()
    mx, my, mw, mh = MODEL
    tx, ty, tw, th = TOOLS

    # nested dashed containers (outer first)
    if level >= 4:
        s.dbox(*EVENT_BOX, BLU_S, "event loop")
    if level >= 3:
        s.dbox(*VERIF_BOX, GRN_S, "verification loop")
    s.dbox(*AGENT_BOX, PUR_S, "agent loop")

    # top entry pill + arrow into model
    if level <= 2:
        if docs:
            s.pill(525, L[level]["pill_y"], 300, 52, "docs improvement request")
        else:
            s.pill(525, L[level]["pill_y"], 200, 52, "request")
        pb = L[level]["pill_y"] + 52
    else:
        if docs:
            s.pill(525, L[level]["pill_y"], 232, 58, "Slack message", "#docs-plz")
            pb = L[level]["pill_y"] + 58
        else:
            s.pill(525, L[level]["pill_y"], 232, 52, "event trigger")
            pb = L[level]["pill_y"] + 52
    s.arrow([(525, pb), (525, 345), (mx + mw / 2, 345), (mx + mw / 2, my)])

    # agent-loop core: model, tools, result/PR + action/observation
    s.box(mx, my, mw, mh, PUR_F, PUR_S, "model", PUR_T,
          "plan + draft changes" if docs else None, PUR_SUB)
    s.box(tx, ty, tw, th, PUR_F, PUR_S,
          "sandbox tools" if docs else "tools", PUR_T,
          "clone · read · write" if docs else None, PUR_SUB)
    res_title, res_sub = ("pull request", "diff + description") if docs else ("result", None)
    s.box(*RESULT, TAN_F, TAN_S, res_title, TAN_T, res_sub, "#6f674f")

    s.arrow([(mx + mw, my + 24), (tx, my + 24)], DASH, 1.5, dash="5 4")      # action
    s.text((mx + mw + tx) / 2, my + 13, "action", 12, DASH, "middle")
    s.arrow([(tx, my + 48), (mx + mw, my + 48)], DASH, 1.5, dash="5 4")      # observation
    s.text((mx + mw + tx) / 2, my + 60, "observation", 12, DASH, "middle")

    # model -> result
    if level == 1:
        s.arrow([(mx + mw / 2, my + mh), (mx + mw / 2, RESULT[1])])
        s.text(mx + mw / 2 + 18, (my + mh + RESULT[1]) / 2, "repeat until done",
               12, "#888", "start", 400, italic=True)
    else:
        s.arrow([(mx + mw / 2, my + mh), (mx + mw / 2, RESULT[1])])

    if level >= 2:
        gx, gy, gw, gh = GRADER
        # result -> grader
        s.arrow([(mx + mw / 2, RESULT[1] + RESULT[3]), (mx + mw / 2, gy)])
        s.box(gx, gy, gw, gh, GRN_F, GRN_S, "grader", GRN_T,
              ("links resolve · CI passes" if docs else "rubric / eval"), GRN_SUB)
        # retry with feedback (green curve, left)
        s.curve(f"M {gx} {gy + gh/2} C 92 {gy+gh/2-4} 92 {my+18} {mx-2} {my+mh/2}",
                GREEN, 2.4, (mx - 2, my + mh / 2), math.radians(-12),
                ctrl=[(80, gy), (80, my)])
        s.text(60, (my + gy) / 2, "retry with", 12.5, GREEN, "middle", 700)
        s.text(60, (my + gy) / 2 + 16, "feedback", 12.5, GREEN, "middle", 700)

    if level == 2:
        # grader -> done (pass)
        s.pill(965, 625, 120, 54, "done")
        s.arrow([(GRADER[0] + GRADER[2], 652), (905, 652)])
        s.text(872, 642, "pass", 12, "#888", "middle")

    if level >= 3:
        sx, sy, sw_, sh = SYS
        # grader -> system update
        s.arrow([(525, GRADER[1] + GRADER[3]), (525, sy)])
        s.box(sx, sy, sw_, sh, BLU_F, BLU_S,
              "docs enhancement" if docs else "system update", BLU_T,
              ("merged · live · discoverable" if docs else "service improves"), BLU_SUB)
        # new events / new request (black curve up the right back to trigger)
        trig_mid = L[level]["pill_y"] + (29 if (level >= 3 and docs) else 26)
        s.curve(f"M {sx+sw_} {sy+18} C 982 {sy-40} 982 {trig_mid+120} 648 {trig_mid+4}",
                BLACK, 1.8, (648, trig_mid + 4), math.radians(202),
                ctrl=[(990, sy), (990, trig_mid)])
        s.text(912, (sy + trig_mid) / 2 + 30, "new request" if docs else "new events",
               12, "#777", "middle")

    if level >= 4:
        ex, ey, ew, eh = ENGINE
        # traces (dashed) system -> engine
        s.arrow([(525, SYS[1] + SYS[3]), (525, ey)], TRACE, 1.5, dash="5 4")
        s.text(560, (SYS[1] + SYS[3] + ey) / 2, "traces", 12, "#888", "start")
        s.box(ex, ey, ew, eh, RED_F, RED_S, "engine analysis", RED_T,
              ("detects issues across traces · files prompt/tool change" if docs
               else "agent over traces"), RED_SUB)
        # harness improvements (red curve) engine -> tools
        s.curve(f"M {ex+ew} {ey+18} C 1030 {ey-60} 1030 {ty+10} {tx+tw+2} {ty+th/2}",
                RED_T, 2.1, (tx + tw + 2, ty + th / 2), math.radians(178),
                ctrl=[(1042, ey), (1042, ty)])
        s.text(972, (ty + ey) / 2 + 40, "harness", 12, RED_T, "middle", 700)
        s.text(972, (ty + ey) / 2 + 56, "improvements", 12, RED_T, "middle", 700)

    name = {1: "loop1-agent", 2: "loop2-verification",
            3: "loop3-event", 4: "loop4-hill-climbing"}[level]
    if docs:
        name += "-docs"
    s.save(name + ".svg", L[level]["title"][1 if docs else 0])


for lv in (1, 2, 3, 4):
    build(lv, False)
    build(lv, True)
print("done — 8 diagrams in", os.path.relpath(OUT, REPO))
