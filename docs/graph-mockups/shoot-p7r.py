"""shoot-p7r.py: Phase 7 개정 시안(배경, 노드 색, 라이트 강조색과 히어로)을 실제 사이트에 CSS 를 덧씌워 찍는다.

    실행: (site/ 에서 npm run build && npm run serve 후) 저장소 루트에서
          .venv/bin/python docs/graph-mockups/shoot-p7r.py [http://localhost:4173]
    결과: docs/graph-mockups/screenshots/p7r-*.jpg, 비교 페이지는 p7r-compare.html
"""
import pathlib
import subprocess
import sys

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / 'screenshots'
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173'
CATS = ['physical-ai', 'agents', 'applications', 'database', 'llms', 'overviews', 'evaluations', 'etc']
DARK = ":root:not([data-theme='light'])"
LIGHT = ":root[data-theme='light']"

# ── 1. 다크 그래프 배경 ──
BG = {
    'now': '',
    'ink': f"""{DARK}{{--graph-bg:#0b0e14;--graph-bg-core:#161b26;--graph-bg-edge:#0b0e14;--graph-ring:#0b0e14;--graph-label-halo:rgba(11,14,20,.86);
        --graph-lens:rgba(14,18,26,.86);--graph-glass:rgba(20,25,35,.62);--graph-glass-solid:rgba(20,25,35,.96);--graph-glass-edge:rgba(170,185,210,.12);
        --graph-path-ink:#0b0e14;--graph-vignette:rgba(0,0,0,.45);--graph-primary-ink:#0b0e14;--graph-dust:#b8c2d6}}
        {DARK} main.graph{{--bg:#0b0e14;--surface:#141923;--surface-2:#1b2230;--hairline:rgba(170,185,210,.12);--muted:#9aa3b2;--faint:#8b94a4}}""",
    'inknavy': f"""{DARK}{{--graph-bg:#0b0e14;--graph-bg-core:#121a2f;--graph-bg-edge:#0b0e14;--graph-ring:#0b0e14;--graph-label-halo:rgba(11,14,20,.86);
        --graph-lens:rgba(13,18,32,.86);--graph-glass:rgba(17,24,42,.62);--graph-glass-solid:rgba(17,24,42,.96);--graph-glass-edge:rgba(150,175,230,.13);
        --graph-path-ink:#0b0e14;--graph-vignette:rgba(0,2,8,.45);--graph-primary-ink:#0b0e14}}
        {DARK} main.graph{{--bg:#0b0e14;--surface:#121a2c;--surface-2:#18223a}}""",
}

# ── 2. 노드 색 ──
PAL = {
    'B': ('#e9b089 #90dbd5 #d695ad #a89ad5 #6a8cc9 #eaeff7 #ecdaa2 #778093', '#985535 #3e7d81 #a65778 #8972b3 #264f8b #252d42 #9a8e58 #7d8699'),
    'C': ('#f6ab6b #6ceed7 #ae96a5 #85829d #a5bad1 #eceef4 #d7d1bb #6c727e', '#ad5c15 #1c8d7a #796070 #4c4967 #74889e #222938 #878065 #828690'),
}


def pal_css(key):
    if key not in PAL:
        return ''
    d, l = (dict(zip(CATS, s.split())) for s in PAL[key])
    return (f"{DARK}{{{''.join(f'--cat-{c}:{v};' for c, v in d.items())}}}"
            f"{LIGHT}{{{''.join(f'--cat-{c}:{v};' for c, v in l.items())}}}")


# ── 3. 라이트 강조색 (원복은 --faint 도 예전 값) ──
SIG = {
    'now': '',
    'revert': f"{LIGHT}{{--signal:#0fb89b;--signal-dim:rgba(15,184,155,.18);--signal-physical:#a85b12;--faint:#9aa2b0}}",
    'bright': (f"{LIGHT}{{--signal:#0d9f87;--signal-dim:rgba(13,159,135,.18)}}"
               f"{LIGHT} :is(.filter-chip.is-active,.facet-chip.is-active,.card-new),{LIGHT} :is(.filter-chip,.facet-chip).is-active *{{color:#04211c}}"
               f"{LIGHT} .prose a{{color:#0f766e}}"),
    'cyan': f"{LIGHT}{{--signal:#0e7490;--signal-dim:rgba(14,116,144,.16)}}",
}
SCRATCH = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else None


def shoot(browser, name, path, theme, css='', mono=False, old_hero=False):
    ctx = browser.new_context(viewport={'width': 1440, 'height': 860}, device_scale_factor=1, reduced_motion='reduce',
                              color_scheme='dark' if theme == 'dark' else 'light')
    ctx.add_init_script(f"try{{localStorage.setItem('theme','{theme}');localStorage.setItem('graph.mono','{1 if mono else 0}')}}catch(e){{}}")
    if old_hero:
        for f in ('graph-core.js', 'constellation.js'):
            body = (SCRATCH / ('old-core.js' if f == 'graph-core.js' else 'old-const.js')).read_text()
            ctx.route(f'**/js/{f}*', lambda r, _req=None, b=body: r.fulfill(status=200, content_type='text/javascript', body=b))
    pg = ctx.new_page()
    pg.goto(BASE + path)
    if css:
        pg.add_style_tag(content=css)
        pg.evaluate("document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme'))")
    pg.wait_for_timeout(2500)
    pg.screenshot(path=str(OUT / f'p7r-{name}.jpg'), type='jpeg', quality=82)
    ctx.close()
    print('shot', name)


with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    # 1. 배경
    shoot(b, 'bg-home', '/', 'dark')
    for k, css in BG.items():
        shoot(b, f'bg-{k}', '/graph/', 'dark', css)
    # 2. 노드 색 (다크는 배경 시안 1B 위에서)
    for th in ('dark', 'light'):
        base = BG['inknavy'] if th == 'dark' else ''
        shoot(b, f'pal-I-{th}', '/graph/', th, base)
        shoot(b, f'pal-A-{th}', '/graph/', th, base, mono=True)
        shoot(b, f'pal-B-{th}', '/graph/', th, base + pal_css('B'))
        shoot(b, f'pal-C-{th}', '/graph/', th, base + pal_css('C'))
    # 3. 라이트 강조색 (히어로는 원래 그림으로 고정해 글자색만 비교)
    for k, css in SIG.items():
        shoot(b, f'sig-{k}', '/', 'light', css, old_hero=True)
    shoot(b, 'sig-wiki-now', '/overviews/glossary-agents/', 'light')
    shoot(b, 'sig-wiki-revert', '/overviews/glossary-agents/', 'light', SIG['revert'])
    shoot(b, 'sig-wiki-bright', '/overviews/glossary-agents/', 'light', SIG['bright'])
    shoot(b, 'sig-wiki-cyan', '/overviews/glossary-agents/', 'light', SIG['cyan'])
    # 3'. 히어로 그림
    for th in ('dark', 'light'):
        shoot(b, f'hero-orig-{th}', '/', th, SIG['revert'] if th == 'light' else '', old_hero=True)
        shoot(b, f'hero-I-{th}', '/', th)
        shoot(b, f'hero-B-{th}', '/', th, pal_css('B'))
        shoot(b, f'hero-C-{th}', '/', th, pal_css('C'))
    b.close()
