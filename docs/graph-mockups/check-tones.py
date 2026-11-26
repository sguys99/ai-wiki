"""check-tones.py: 색상과 톤 시안(F, G, H, I)의 색각 이상 거리와 WCAG 대비를 잰다.

    실행: 저장소 루트에서 .venv/bin/python docs/graph-mockups/check-tones.py

g-view.html 을 시스템 Chrome 으로 열어 탐색기가 실제로 읽는 계산된 토큰을 main.graph 에서 가져온다.
- 색각 이상: Machado 2009 행렬(심각도 1.0)로 제1, 제2, 제3 색각 이상을 흉내 내고 카테고리 8색의 모든 짝을
  CIEDE2000 으로 잰다. 기준 5 이상. 모양 단서(etc 빈 원, overviews 고리)는 빼고 잰다.
- 대비: 캔버스 라벨과 흐린 라벨(무대 중앙과 가장자리), 성운 이름(카테고리 색을 알파로 겹친 색, 모노크롬은
  흐린 라벨색), 유리판 위 본문과 흐린 글, 주 버튼, 카테고리 색과 강조색의 그래픽 대비(3:1).
"""
import itertools
import json
import math
import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
CATS = ['physical-ai', 'agents', 'applications', 'database', 'llms', 'overviews', 'evaluations', 'etc']
TOKENS = [f'--cat-{c}' for c in CATS] + [
    '--graph-bg-core', '--graph-bg-edge', '--graph-label', '--graph-label-muted', '--graph-glass', '--graph-glass-solid',
    '--graph-primary-top', '--graph-primary-bottom', '--graph-primary-ink', '--text', '--muted', '--faint', '--signal',
    '--graph-name-alpha', '--graph-name-mix', '--graph-mono', '--graph-mono-1', '--graph-mono-2', '--graph-mono-3',
]

# Machado, Oliveira, Fernandes 2009, severity 1.0 (선형 RGB 에 곱한다)
MACHADO = {
    'protan': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    'deutan': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    'tritan': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
}


def parse(c):
    c = c.strip()
    if c.startswith('#'):
        h = c[1:]
        if len(h) == 3:
            h = ''.join(x * 2 for x in h)
        return [int(h[i:i + 2], 16) for i in (0, 2, 4)] + [1.0]
    m = re.findall(r'[\d.]+', c)
    return [float(m[0]), float(m[1]), float(m[2]), float(m[3]) if len(m) > 3 else 1.0]


def over(fg, bg):
    a = fg[3]
    return [fg[i] * a + bg[i] * (1 - a) for i in range(3)] + [1.0]


def lin(v):
    v /= 255
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def unlin(v):
    v = min(1, max(0, v))
    return 255 * (12.92 * v if v <= 0.0031308 else 1.055 * v ** (1 / 2.4) - 0.055)


def lum(c):
    r, g, b = (lin(x) for x in c[:3])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def simulate(c, kind):
    l = [lin(x) for x in c[:3]]
    m = MACHADO[kind]
    return [unlin(sum(m[i][j] * l[j] for j in range(3))) for i in range(3)]


def lab(c):
    r, g, b = (lin(x) for x in c[:3])
    x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047
    y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b
    z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 216 / 24389 else (24389 / 27 * t + 16) / 116
    return 116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))


def de2000(l1, l2):
    L1, a1, b1 = l1
    L2, a2, b2 = l2
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2)
    Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p = math.degrees(math.atan2(b1, a1p)) % 360
    h2p = math.degrees(math.atan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2p - C1p
    if C1p * C2p == 0:
        dh = 0
    elif abs(h2p - h1p) <= 180:
        dh = h2p - h1p
    else:
        dh = h2p - h1p - 360 if h2p > h1p else h2p - h1p + 360
    dH = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dh / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0:
        hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180:
        hbp = (h1p + h2p) / 2
    else:
        hbp = (h1p + h2p + 360) / 2 if h1p + h2p < 360 else (h1p + h2p - 360) / 2
    T = 1 - 0.17 * math.cos(math.radians(hbp - 30)) + 0.24 * math.cos(math.radians(2 * hbp)) \
        + 0.32 * math.cos(math.radians(3 * hbp + 6)) - 0.20 * math.cos(math.radians(4 * hbp - 63))
    dTh = 30 * math.exp(-(((hbp - 275) / 25) ** 2))
    Rc = 2 * math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    Sl = 1 + 0.015 * (Lbp - 50) ** 2 / math.sqrt(20 + (Lbp - 50) ** 2)
    Sc, Sh = 1 + 0.045 * Cbp, 1 + 0.015 * Cbp * T
    Rt = -math.sin(math.radians(2 * dTh)) * Rc
    return math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh))


# 자체 점검: Sharma 2005 표의 첫 짝 (ΔE00 = 2.0425), 흰색과 검정 대비 21
assert abs(de2000((50, 2.6772, -79.7751), (50, 0, -82.7485)) - 2.0425) < 1e-3
assert abs(contrast([255, 255, 255], [0, 0, 0]) - 21) < 1e-9


def check(tok, theme):
    dark = theme == 'dark'
    cat = {c: parse(tok[f'--cat-{c}']) for c in CATS}
    bgs = [parse(tok['--graph-bg-core']), parse(tok['--graph-bg-edge'])]
    out = {'cvd': {}, 'aa': {}}
    for kind in ['normal', 'protan', 'deutan', 'tritan']:
        labs = {c: lab(cat[c] if kind == 'normal' else simulate(cat[c], kind)) for c in CATS}
        d, pair = min((de2000(labs[a], labs[b]), f'{a}/{b}') for a, b in itertools.combinations(CATS, 2))
        out['cvd'][kind] = (round(d, 1), pair)
    mn = lambda fg, need: (round(min(contrast(over(fg, b), b) for b in bgs), 2), need)
    aa = out['aa']
    aa['캔버스 라벨'] = mn(parse(tok['--graph-label']), 4.5)
    aa['흐린 라벨'] = mn(parse(tok['--graph-label-muted']), 4.5)
    mono = float(tok['--graph-mono'] or 0) > 0
    num = lambda k, d: float(tok[k]) if tok[k] else d
    name_a = num('--graph-name-alpha', 0.7 if dark else 0.8)  # 탐색기의 성운 이름 알파와 섞기 (토큰이 없으면 지금 판 값)
    t, ink = num('--graph-name-mix', 0), parse(tok['--graph-label'])
    names = [parse(tok['--graph-label-muted'])] if mono else \
        [[cat[c][i] + (ink[i] - cat[c][i]) * t for i in range(3)] for c in CATS if c != 'overviews']
    aa['성운 이름'] = (round(min(contrast(over(n[:3] + [name_a], b), b) for n in names for b in bgs), 2), 4.5)
    for g in ['--graph-glass', '--graph-glass-solid']:
        for t, need in [('--text', 4.5), ('--muted', 4.5), ('--faint', 4.5)]:
            plates = [over(parse(tok[g]), b) for b in bgs]
            aa[f'{t} / {g[8:]}'] = (round(min(contrast(parse(tok[t]), p) for p in plates), 2), need)
    top, bot = parse(tok['--graph-primary-top']), parse(tok['--graph-primary-bottom'])
    mid = [(top[i] + bot[i]) / 2 for i in range(3)]  # 글자는 세로 그라데이션 가운데에 앉는다
    aa['주 버튼 글'] = (round(contrast(parse(tok['--graph-primary-ink']), mid), 2), 4.5)
    aa['카테고리 색 그래픽'] = (round(min(contrast(cat[c], b) for c in CATS for b in bgs), 2), 3)
    aa['강조색 그래픽'] = mn(parse(tok['--signal']), 3)
    if mono:
        aa['무채색 잎 그래픽'] = mn(parse(tok['--graph-mono-1']), 3)  # 쉬는 노드 중 가장 흐린 단계
    return out


def main():
    tones = sys.argv[1].split(',') if len(sys.argv) > 1 else ['f', 'g', 'h', 'i']
    res = {}
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome')
        pg = b.new_page()
        for t in tones:
            for th in ['dark', 'light']:
                pg.goto((HERE / 'g-view.html').as_uri() + f'?tone={t}&theme={th}&screen=atlas')
                pg.wait_for_selector('main.graph')
                tok = pg.evaluate('(ns) => { const cs = getComputedStyle(document.querySelector("main.graph")); '
                                  'return Object.fromEntries(ns.map(n => [n, cs.getPropertyValue(n).trim()])); }', TOKENS)
                res[f'{t}-{th}'] = check(tok, th)
        b.close()
    fails = 0
    for k, r in res.items():
        print(f'\n== {k}')
        print('  CIEDE2000 최소: ' + ', '.join(f'{kind} {d} ({pair})' for kind, (d, pair) in r['cvd'].items()))
        fails += sum(1 for kind, (d, _) in r['cvd'].items() if kind != 'normal' and d < 5)
        for name, (v, need) in r['aa'].items():
            flag = '' if v >= need else '  <-- 미달'
            fails += 0 if v >= need else 1
            print(f'  {name}: {v} (기준 {need}){flag}')
    print(f'\n미달 {fails}건')
    (HERE / 'screenshots' / 'g-check.json').write_text(json.dumps(res, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
