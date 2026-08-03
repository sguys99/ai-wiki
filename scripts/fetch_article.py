#!/usr/bin/env python3
"""URL 하나로 raw/articles/{stem}.md 원문 + {stem}-figures/ 이미지를 만든다.

CLAUDE.md의 Articles Step 1 ~ Step 2.5 만 담당한다. sources/ · wiki/ · index.md 는
건드리지 않고, git commit 도 하지 않는다. Step 3 부터는 기존 대화형 6-step 그대로.

추출은 무료 경로부터 내려가는 4단 사다리다:

    L1 jina      r.jina.ai — 키 불필요. 대부분 여기서 끝난다
    L2 chrome    로컬 Chrome (익명 임시 프로필) — x.com, JS SPA, Cloudflare 경증
    L3 profile   로컬 Chrome (본인 로그인 세션) — --profile 을 직접 줄 때만
    L4 firecrawl FIRECRAWL_API_KEY 가 있을 때만

사용:

    uv run --python .venv/bin/python scripts/fetch_article.py <URL>
    uv run --python .venv/bin/python scripts/fetch_article.py <URL> --stem alex-xu-2026-rag-vs-graph-rag --crop

--stem 없이 부르면 제안만 출력하고 멈춘다 (오분류 방지).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import struct
import subprocess
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ARTICLES = REPO / "raw" / "articles"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36"
)

# 본문이 이보다 짧으면 추출 실패로 보고 다음 tier 로 내려간다
MIN_BODY_CHARS = 1200
# 이보다 작은 이미지는 아바타·아이콘·트래킹 픽셀로 보고 버린다
MIN_IMG_BYTES = 20_000
MIN_IMG_SIDE = 200
# 무한스크롤 페이지의 전체 스크린샷 높이 상한 (px)
MAX_SHOT_PX = 6000

# 본문이 아니라 차단 페이지라는 확정 신호
HARD_BLOCK = (
    "AbuseAlleviationError",
    "Anonymous access to domain",
    "Enable JavaScript and cookies to continue",
    "Checking if the site connection is secure",
)
BLOCK_TITLES = {"just a moment...", "attention required! | cloudflare", "access denied"}

CT_EXT = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/avif": "avif",
}


# ─────────────────────────────────────────────── 공통 유틸


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


def slugify(text: str) -> str:
    text = re.sub(r"[’'`]", "", (text or "").lower())
    text = re.sub(r"[^a-z0-9가-힣]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")


def clean_title(title: str) -> str:
    """제목 꼬리의 사이트명을 떼어낸다 — "... | Lil'Log", "... \\ Anthropic" 처럼
    붙어 있으면 stem 에 그대로 새어 들어간다."""
    t = (title or "").strip()
    seps = (" | ", " \\ ", " — ", " – ", " · ", " :: ")
    # "A | 저자가 올림 | LinkedIn" 처럼 꼬리가 겹쳐 붙기도 한다. 더 못 떼어낼
    # 때까지 반복하되, 제목 전체를 먹어치우지 않도록 횟수를 묶어둔다.
    for _ in range(4):
        before = t
        for sep in seps:
            if sep not in t:
                continue
            head, _, tail = t.rpartition(sep)
            # 꼬리가 짧으면 사이트명으로 본다. 길면 제목의 일부일 수 있으니 둔다
            if head.strip() and len(tail.strip()) <= 30:
                t = head.strip()
        if t == before:
            break
    return t


class Extracted:
    """한 tier 의 추출 결과."""

    def __init__(self, tier, title="", body="", published="", html="", url=""):
        self.tier = tier
        self.title = (title or "").strip()
        self.body = (body or "").strip()
        self.published = (published or "").strip()
        self.html = html or ""
        self.url = url

    @property
    def ok(self) -> bool:
        return not self.blocked_reason

    @property
    def blocked_reason(self) -> str:
        for sig in HARD_BLOCK:
            if sig in self.body[:4000] or sig in self.title:
                return f"차단 시그니처: {sig}"
        if self.title.strip().lower() in BLOCK_TITLES:
            return f"차단 페이지 제목: {self.title}"
        if len(self.body) < MIN_BODY_CHARS:
            return f"본문이 너무 짧음 ({len(self.body)}자 < {MIN_BODY_CHARS})"
        return ""


# ─────────────────────────────────────────────── L1 Jina Reader


def extract_jina(url: str, timeout: int) -> Extracted:
    req = urllib.request.Request(
        "https://r.jina.ai/" + url,
        headers={"User-Agent": UA, "Accept": "text/plain"},
    )
    key = os.environ.get("JINA_API_KEY")
    if key:
        req.add_header("Authorization", f"Bearer {key}")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read().decode("utf-8", "replace")

    title = published = ""
    body = raw
    m = re.match(r"Title:\s*(.*)", raw)
    if m:
        title = m.group(1).strip()
    m = re.search(r"^Published Time:\s*(.*)$", raw, re.M)
    if m:
        published = m.group(1).strip()
    m = re.search(r"^Markdown Content:\s*$", raw, re.M)
    if m:
        body = raw[m.end() :].lstrip("\n")
    return Extracted("jina", title, body, published, url=url)


# ─────────────────────────────────────────────── HTML → Markdown


BLOCK_DROP = {
    "script", "style", "noscript", "nav", "header", "footer", "aside",
    "form", "svg", "iframe", "button", "template",
}


def html_to_markdown(node) -> str:
    """본문 노드를 읽을 만한 마크다운으로 펼친다. 완벽한 변환이 목표가 아니라
    원문 텍스트와 이미지 URL 을 손실 없이 남기는 게 목표다."""
    from bs4 import NavigableString, Tag

    out: list[str] = []

    def walk(el, depth=0):
        if isinstance(el, NavigableString):
            txt = re.sub(r"\s+", " ", str(el))
            if txt.strip():
                out.append(txt)
            return
        if not isinstance(el, Tag):
            return
        name = el.name.lower()
        if name in BLOCK_DROP:
            return

        if name in ("h1", "h2", "h3", "h4", "h5", "h6"):
            out.append("\n\n" + "#" * int(name[1]) + " " + el.get_text(" ", strip=True) + "\n\n")
            return
        if name == "img":
            src = el.get("src") or el.get("data-src") or ""
            if not src and el.get("srcset"):
                src = el["srcset"].split(",")[0].strip().split(" ")[0]
            if src:
                out.append(f"\n\n![{el.get('alt', '').strip()}]({src})\n\n")
            return
        if name == "a":
            href = el.get("href", "")
            text = el.get_text(" ", strip=True)
            if text:
                out.append(f"[{text}]({href})" if href else text)
            return
        if name in ("pre", "code") and name == "pre":
            out.append("\n\n```\n" + el.get_text("\n", strip=False).strip("\n") + "\n```\n\n")
            return
        if name == "br":
            out.append("\n")
            return
        if name == "hr":
            out.append("\n\n---\n\n")
            return
        if name == "li":
            out.append("\n" + "  " * depth + "- ")
            for c in el.children:
                walk(c, depth + 1)
            return
        if name == "blockquote":
            inner = el.get_text(" ", strip=True)
            if inner:
                out.append("\n\n> " + inner + "\n\n")
            return
        if name in ("p", "div", "section", "article", "ul", "ol", "table", "tr", "figure", "figcaption"):
            out.append("\n\n")
            for c in el.children:
                walk(c, depth)
            out.append("\n\n")
            return
        for c in el.children:
            walk(c, depth)

    walk(node)
    text = "".join(out)
    text = re.sub(r"[ \t]{2,}", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def pick_main(soup):
    """텍스트가 가장 많이 모인 후보 컨테이너를 고른다 (readability 근사)."""
    best, best_score = None, 0
    for el in soup.find_all(["article", "main", "div", "section"]):
        if el.find(["article", "main"]) is not None:
            continue  # 더 안쪽 후보에게 양보
        text_len = len(el.get_text(" ", strip=True))
        link_len = sum(len(a.get_text(" ", strip=True)) for a in el.find_all("a"))
        # 링크 비중이 높은 블록은 네비게이션일 확률이 높다
        score = text_len - link_len * 2
        if score > best_score:
            best, best_score = el, score
    return best or soup.body or soup


# ─────────────────────────────────────────────── L2/L3 로컬 Chrome


def extract_chrome(url: str, timeout: int, use_profile: bool, want_shot: bool,
                   want_crop: bool, figdir: Path | None):
    """Playwright 로 설치된 Chrome 을 구동한다. channel="chrome" 이라 별도
    브라우저 다운로드가 필요 없다. 스크린샷·크롭도 여기서 함께 처리한다."""
    from bs4 import BeautifulSoup
    from playwright.sync_api import sync_playwright

    tier = "profile" if use_profile else "chrome"
    shots: dict[str, list] = {"full": [], "crops": []}
    html = title = ""

    with sync_playwright() as p:
        ctx = browser = None
        try:
            if use_profile:
                # 본인 로그인 세션. Chrome 이 실행 중이면 프로필이 잠기므로
                # 사본을 떠서 쓴다 — 원본 프로필은 건드리지 않는다.
                src = Path.home() / "Library/Application Support/Google/Chrome"
                tmp = Path(tempfile.mkdtemp(prefix="aiwiki-chrome-"))
                (tmp / "Default").mkdir(parents=True, exist_ok=True)
                for f in ("Cookies", "Login Data", "Preferences", "Local Storage", "Network"):
                    s = src / "Default" / f
                    if s.is_dir():
                        shutil.copytree(s, tmp / "Default" / f, dirs_exist_ok=True)
                    elif s.exists():
                        shutil.copy2(s, tmp / "Default" / f)
                for f in ("Local State",):
                    if (src / f).exists():
                        shutil.copy2(src / f, tmp / f)
                ctx = p.chromium.launch_persistent_context(
                    str(tmp), channel="chrome", headless=True,
                    user_agent=UA, viewport={"width": 1400, "height": 1000},
                )
                page = ctx.pages[0] if ctx.pages else ctx.new_page()
            else:
                browser = p.chromium.launch(channel="chrome", headless=True)
                ctx = browser.new_context(
                    user_agent=UA, viewport={"width": 1400, "height": 1000}
                )
                page = ctx.new_page()

            page.set_default_timeout(timeout * 1000)
            page.goto(url, wait_until="domcontentloaded", timeout=timeout * 1000)
            try:
                page.wait_for_load_state("networkidle", timeout=8000)
            except Exception:
                pass  # 광고·소켓이 계속 도는 페이지는 그냥 진행
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1200)
            page.evaluate("window.scrollTo(0, 0)")

            title = page.title()
            html = page.content()

            if figdir is not None and want_shot:
                dest = figdir / "page-full.png"
                dest.parent.mkdir(parents=True, exist_ok=True)
                # 무한스크롤 페이지는 높이가 2만px를 넘어 파일이 수MB로 불어난다.
                # 그 경우 위에서부터 MAX_SHOT_PX 만큼만 잘라 담는다.
                height = page.evaluate("document.body.scrollHeight") or 0
                if height > MAX_SHOT_PX:
                    # clip 만 주면 뷰포트 밖은 잘려나간다 — full_page 와 함께 써야
                    # 스크롤 영역까지 잡은 뒤 상단만 남는다
                    page.screenshot(
                        path=str(dest),
                        full_page=True,
                        clip={"x": 0, "y": 0, "width": 1400, "height": MAX_SHOT_PX},
                    )
                    log(f"  · 전체 페이지 스크린샷 → {dest.name} (상단 {MAX_SHOT_PX}px 로 절단, 원본 {height}px)")
                else:
                    page.screenshot(path=str(dest), full_page=True)
                    log(f"  · 전체 페이지 스크린샷 → {dest.name}")
                shots["full"].append(dest)

            if figdir is not None and want_crop:
                sel = "figure, article img, main img, .post img, [role=article] img, picture"
                seen = set()
                idx = 0
                for el in page.query_selector_all(sel):
                    try:
                        box = el.bounding_box()
                        if not box or box["width"] < MIN_IMG_SIDE or box["height"] < MIN_IMG_SIDE:
                            continue
                        key = (round(box["x"]), round(box["y"]), round(box["width"]))
                        if key in seen:
                            continue
                        seen.add(key)
                        idx += 1
                        dest = figdir / f"crop{idx:02d}.png"
                        el.screenshot(path=str(dest))
                        shots["crops"].append(dest)
                    except Exception:
                        continue
                if shots["crops"]:
                    log(f"  · 도식 영역 크롭 {len(shots['crops'])}장")
        finally:
            for c in (ctx, browser):
                try:
                    c and c.close()
                except Exception:
                    pass

    soup = BeautifulSoup(html, "html.parser")
    if not title and soup.title:
        title = soup.title.get_text(strip=True)
    og = soup.find("meta", property="og:title")
    if og and og.get("content"):
        title = title or og["content"]

    published = ""
    for finder in (
        lambda: soup.find("meta", property="article:published_time"),
        lambda: soup.find("meta", attrs={"name": "date"}),
        lambda: soup.find("meta", attrs={"name": "publish_date"}),
        lambda: soup.find("time", attrs={"datetime": True}),
    ):
        el = finder()
        if el:
            published = (el.get("content") or el.get("datetime") or "").strip()
            if published:
                break

    body = html_to_markdown(pick_main(soup))
    return Extracted(tier, title, body, published, html=html, url=url), shots


# ─────────────────────────────────────────────── L4 Firecrawl


def extract_firecrawl(url: str, timeout: int) -> Extracted:
    key = os.environ.get("FIRECRAWL_API_KEY")
    if not key:
        raise RuntimeError(
            "FIRECRAWL_API_KEY 가 없다. 유료 폴백을 쓰려면 키를 환경변수로 넣어라."
        )
    payload = json.dumps({"url": url, "formats": ["markdown"]}).encode()
    req = urllib.request.Request(
        "https://api.firecrawl.dev/v2/scrape",
        data=payload,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8", "replace"))
    d = data.get("data", data)
    meta = d.get("metadata", {}) or {}
    return Extracted("firecrawl", meta.get("title", ""), d.get("markdown", ""), url=url)


# ─────────────────────────────────────────────── 이미지 수집


def image_size(data: bytes) -> tuple[int, int]:
    """PNG/JPEG/GIF/WebP 헤더에서 크기를 읽는다. 모르면 (0,0)."""
    try:
        if data[:8] == b"\x89PNG\r\n\x1a\n":
            w, h = struct.unpack(">II", data[16:24])
            return w, h
        if data[:6] in (b"GIF87a", b"GIF89a"):
            w, h = struct.unpack("<HH", data[6:10])
            return w, h
        if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
            if data[12:16] == b"VP8X":
                w = int.from_bytes(data[24:27], "little") + 1
                h = int.from_bytes(data[27:30], "little") + 1
                return w, h
            if data[12:16] == b"VP8 ":
                return struct.unpack("<HH", data[26:30])
            if data[12:16] == b"VP8L":
                b0 = int.from_bytes(data[21:25], "little")
                return (b0 & 0x3FFF) + 1, ((b0 >> 14) & 0x3FFF) + 1
        if data[:2] == b"\xff\xd8":
            i = 2
            while i < len(data) - 9:
                if data[i] != 0xFF:
                    i += 1
                    continue
                marker = data[i + 1]
                if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB):
                    h, w = struct.unpack(">HH", data[i + 5 : i + 9])
                    return w, h
                i += 2 + int.from_bytes(data[i + 2 : i + 4], "big")
    except Exception:
        pass
    return 0, 0


def md_image_urls(markdown: str, base: str) -> list[tuple[str, str]]:
    """(alt, absolute_url) 목록. 등장 순서 유지, 중복 제거."""
    found, seen = [], set()
    for alt, src in re.findall(r"!\[([^\]]*)\]\(\s*(<?[^)\s]+>?)", markdown):
        src = src.strip("<>")
        if not src or src.startswith("data:"):
            continue
        absu = urllib.parse.urljoin(base, src)
        if absu in seen:
            continue
        seen.add(absu)
        found.append((alt.strip(), absu))
    return found


def download_images(pairs, figdir: Path, referer: str, timeout: int) -> list[dict]:
    figdir.mkdir(parents=True, exist_ok=True)
    manifest, idx = [], 0
    for alt, url in pairs:
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": UA, "Referer": referer, "Accept": "image/*,*/*"}
            )
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read()
                ctype = (r.headers.get("Content-Type") or "").split(";")[0].strip().lower()
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, OSError) as e:
            log(f"  · skip (다운로드 실패: {type(e).__name__}) {url[:90]}")
            continue

        if not ctype.startswith("image/"):
            continue
        w, h = image_size(data)
        if len(data) < MIN_IMG_BYTES and not (w >= MIN_IMG_SIDE and h >= MIN_IMG_SIDE):
            continue
        if w and h and (w < MIN_IMG_SIDE or h < MIN_IMG_SIDE):
            continue

        idx += 1
        # URL 의 확장자를 믿지 않는다 — licdn 은 .jpg 처럼 보이는 GIF 를 준다
        ext = CT_EXT.get(ctype, "bin")
        name = f"fig{idx:02d}.{ext}"
        (figdir / name).write_bytes(data)
        manifest.append(
            {
                "id": f"fig{idx:02d}",
                "file": f"assets/{figdir.name[:-8]}/{name}",
                "raw": f"raw/articles/{figdir.name}/{name}",
                "caption": alt,
                "source_url": url,
                "bytes": len(data),
                "width": w,
                "height": h,
                "strategy": "fetched",
                "curated": False,
            }
        )
        log(f"  · fig{idx:02d}.{ext}  {w}×{h}  {len(data) // 1024}KB")
    return manifest


# ─────────────────────────────────────────────── 사다리


LADDER = ["jina", "chrome", "profile", "firecrawl"]


def run_ladder(url, tier_arg, timeout, use_profile, want_shot, want_crop, figdir):
    if tier_arg == "auto":
        order = ["jina", "chrome"]
        if use_profile:
            order.append("profile")
        if os.environ.get("FIRECRAWL_API_KEY"):
            order.append("firecrawl")
    else:
        order = [tier_arg]

    shots = {"full": [], "crops": []}
    last = None
    for tier in order:
        log(f"[{tier}] 시도 중…")
        try:
            if tier == "jina":
                res = extract_jina(url, timeout)
            elif tier in ("chrome", "profile"):
                res, shots = extract_chrome(
                    url, timeout, tier == "profile", want_shot, want_crop, figdir
                )
            else:
                res = extract_firecrawl(url, timeout)
        except Exception as e:
            log(f"[{tier}] 실패: {type(e).__name__}: {str(e)[:160]}")
            continue
        last = res
        if res.ok:
            log(f"[{tier}] 성공 — 본문 {len(res.body):,}자")
            return res, shots
        log(f"[{tier}] 부적합 — {res.blocked_reason}")
    return last, shots


# ─────────────────────────────────────────────── raw 파일 작성


def suggest_stem(res: Extracted, url: str, author: str, year: int) -> str:
    words = [w for w in re.split(r"[^A-Za-z0-9가-힣]+", clean_title(res.title)) if w][:5]
    host = urllib.parse.urlparse(url).netloc.replace("www.", "").split(".")[0]
    return "-".join(filter(None, [slugify(author or host), str(year), slugify("-".join(words))]))


def resolve_year(res: Extracted, explicit: int | None) -> int:
    """--year 를 직접 준 게 아니면 발행일에서 뽑는다. 둘 다 없으면 올해."""
    if explicit:
        return explicit
    m = re.search(r"(19|20)\d{2}", res.published or "")
    return int(m.group(0)) if m else datetime.now().year


def write_raw(path: Path, res: Extracted, url: str, stem: str, author: str,
              year: int, category: str, figures: list[dict]) -> None:
    fetched = datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%dT%H:%M:%S%z")
    fm = [
        "---",
        f'title: "{clean_title(res.title).replace(chr(34), chr(39))}"',
        "type: article",
        f"year: {year}",
        f"category: {category}",
        f"raw_path: raw/articles/{stem}.md",
        f'raw_filename: "{stem}.md"',
        "source_collection: external",
        f'author: "{author}"',
        f'url: "{url}"',
        f'publisher: "{urllib.parse.urlparse(url).netloc}"',
    ]
    if res.published:
        fm.append(f'publication_date: "{res.published}"')
    fm += [
        f'fetched_at: "{fetched}"',
        f'extractor_tier: "{res.tier}"',
        "tags: []",
    ]
    if figures:
        fm.append("figures:")
        for f in figures:
            fm.append(f"  - id: {f['id']}")
            fm.append(f"    file: {f['file']}")
            fm.append(f"    raw: {f['raw']}")
            cap = (f.get("caption") or "").replace('"', "'")
            fm.append(f'    caption: "{cap}"')
            fm.append(f"    strategy: {f['strategy']}")
            fm.append(f"    curated: {str(f['curated']).lower()}")
    fm.append("---")

    note = (
        f"> 수집 메모 — `scripts/fetch_article.py` 가 사용자의 명시적 URL 지시에 따라 "
        f"가져왔다 (CLAUDE.md rule #1 의 자료 수집 예외). 추출 tier: `{res.tier}`. "
        f"본문은 원문 그대로이며 요약·번역·윤문하지 않았다.\n"
        f"> `category` 는 임시값이므로 Step 3 에서 확정할 것."
    )
    path.write_text(
        "\n".join(fm) + "\n\n" + note + "\n\n---\n\n" + res.body + "\n", encoding="utf-8"
    )


# ─────────────────────────────────────────────── main


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url")
    ap.add_argument("--stem", help="생략하면 제안만 출력하고 멈춘다")
    ap.add_argument("--tier", default="auto", choices=["auto"] + LADDER)
    ap.add_argument("--author", default="", help="frontmatter author (미지정 시 도메인)")
    ap.add_argument("--year", type=int, default=None, help="생략 시 발행일에서 추론")
    ap.add_argument("--category", default="etc", help="Step 3 에서 확정 — 임시값")
    ap.add_argument("--shot", default="full", choices=["full", "none"])
    ap.add_argument("--crop", action="store_true", help="도식 영역별 크롭")
    ap.add_argument("--profile", action="store_true", help="본인 Chrome 로그인 세션 사용")
    ap.add_argument("--no-images", action="store_true")
    ap.add_argument("--timeout", type=int, default=60)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    want_shot = a.shot == "full" and not a.dry_run
    want_crop = a.crop and not a.dry_run
    figdir = None
    if a.stem and not a.dry_run:
        figdir = ARTICLES / f"{a.stem}-figures"

    # 스크린샷·크롭은 Chrome tier 에서만 나온다. jina 로 끝나면 별도로 한 번 더 띄운다.
    res, shots = run_ladder(
        a.url, a.tier, a.timeout, a.profile, want_shot, want_crop, figdir
    )
    if res is None:
        log("✗ 모든 tier 실패. --profile 또는 --tier firecrawl 을 검토하라.")
        return 1
    if not res.ok:
        log(f"✗ 마지막 tier({res.tier})도 부적합: {res.blocked_reason}")
        return 1

    author = a.author or urllib.parse.urlparse(a.url).netloc.replace("www.", "").split(".")[0]
    year = resolve_year(res, a.year)
    stem = a.stem or suggest_stem(res, a.url, a.author, year)

    if not a.stem:
        print("\n── stem 미지정 — 아래를 확인하고 --stem 으로 다시 실행하라 ──")
        print(f"  제목   : {clean_title(res.title)}")
        print(f"  tier   : {res.tier}   본문 {len(res.body):,}자")
        print(f"  발행   : {res.published or '(미상)'}  → year {year}")
        print(f"  이미지 : {len(md_image_urls(res.body, a.url))}개 후보")
        print(f"  제안   : --stem {stem}")
        return 0

    dest = ARTICLES / f"{stem}.md"
    if dest.exists() and not a.dry_run:
        log(f"✗ 이미 존재한다: {dest.relative_to(REPO)} — 덮어쓰지 않는다.")
        return 1

    figures: list[dict] = []
    if not a.no_images and not a.dry_run:
        figdir = ARTICLES / f"{stem}-figures"
        pairs = md_image_urls(res.body, a.url)
        log(f"이미지 후보 {len(pairs)}개 — 다운로드 중…")
        figures = download_images(pairs, figdir, a.url, a.timeout)

        # jina tier 로 끝났으면 스크린샷/크롭을 위해 Chrome 을 한 번 더 띄운다
        if (want_shot or want_crop) and not shots["full"] and not shots["crops"]:
            log("스크린샷·크롭용 Chrome 실행…")
            try:
                _, shots = extract_chrome(
                    a.url, a.timeout, a.profile, want_shot, want_crop, figdir
                )
            except Exception as e:
                log(f"  · 스크린샷 실패 (본문은 이미 확보됨): {type(e).__name__}")

        n = len(figures)
        for p in shots["full"]:
            n += 1
            figures.append({
                "id": f"fig{n:02d}", "file": f"assets/{stem}/{p.name}",
                "raw": f"raw/articles/{stem}-figures/{p.name}",
                "caption": "전체 페이지 스크린샷", "strategy": "screenshot", "curated": False,
            })
        for p in shots["crops"]:
            n += 1
            figures.append({
                "id": f"fig{n:02d}", "file": f"assets/{stem}/{p.name}",
                "raw": f"raw/articles/{stem}-figures/{p.name}",
                "caption": "도식 영역 크롭", "strategy": "crop", "curated": False,
            })
        if figures:
            (figdir / "figures.json").write_text(
                json.dumps(figures, ensure_ascii=False, indent=2), encoding="utf-8"
            )

    if a.dry_run:
        print(f"\n[dry-run] tier={res.tier}  title={res.title!r}")
        print(f"[dry-run] 본문 {len(res.body):,}자, 이미지 후보 {len(md_image_urls(res.body, a.url))}개")
        print(f"[dry-run] 제안 stem: {stem}")
        print("\n--- 본문 앞 400자 ---")
        print(res.body[:400])
        return 0

    write_raw(dest, res, a.url, stem, author, year, a.category, figures)

    # ── Step 3 인계
    print(f"\n✓ {dest.relative_to(REPO)}  ({len(res.body):,}자, tier={res.tier})")
    if figures:
        print(f"✓ {figdir.relative_to(REPO)}/  ({len(figures)}개 + figures.json)\n")
        print("## 8. 그림 후보 (Figure Candidates)  ← sources/ 에 붙여넣을 초안\n")
        print("| id | caption | strategy | 추천 |")
        print("|---|---|---|---|")
        for f in figures:
            cap = (f.get("caption") or "").replace("|", "/")[:60] or "(캡션 없음)"
            print(f"| {f['id']} | {cap} | {f['strategy']} | (선택) |")
    print(f"\n다음: Step 3 — sources/{stem}.md 작성. category 를 확정하라 (현재 '{a.category}').")
    return 0


if __name__ == "__main__":
    sys.exit(main())
