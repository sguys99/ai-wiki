// templates.mjs — Constellation 디자인 시스템 HTML 템플릿 (tagged template 문자열).
//
// 책임:
//   - layout()  : 사이트 공유 셸 (head/FOUC/헤더/푸터/스크립트). 홈·위키·about 공통.
//   - home()    : 홈 랜딩 (히어로 constellation → 카테고리 밴드 → 카드 그리드).
//   - 파셜       : header() · footer() · card()
//
// Phase 3 범위: 홈 + 공유 셸. 위키 본문 레이아웃(리딩 컬럼·TOC·neighborhood)은 Phase 4.
// 검색(Pagefind)은 Phase 5, About 페이지는 Phase 6 — 헤더 자리만 마련하고 링크는 임시.

import { href, SITE } from './config.mjs';
import { escapeHtml } from './markdown.mjs';

const GH_URL = `https://github.com/${SITE.repo}`;

// FOUC 방지: CSS 적용 전 동기 실행으로 초기 테마를 확정.
const FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

// ── 공유 셸 ───────────────────────────────────────────────────────────────────
//
// opts: { title, description?, body, mainClass?, head?, scripts?:[src,...] }
export function layout(opts) {
  const {
    title,
    description = SITE.description,
    body,
    mainClass = '',
    head = '',
    scripts = [],
  } = opts;
  const pageTitle = title === SITE.title ? title : `${title} · ${SITE.title}`;
  const extraScripts = scripts
    .map((src) => `<script src="${escapeHtml(href(src))}" defer></script>`)
    .join('\n');

  return `<!doctype html>
<html lang="${SITE.lang}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<script>${FOUC_SCRIPT}</script>
<link rel="stylesheet" href="${href('/static/fonts/pretendard/pretendard-dynamic-subset.css')}">
<link rel="stylesheet" href="${href('/static/css/styles.css')}">
${head}
</head>
<body>
<a class="skip-link" href="#main">본문으로 건너뛰기</a>
${header()}
<main id="main"${mainClass ? ` class="${mainClass}"` : ''}>
${body}
</main>
${footer()}
<script src="${href('/static/js/theme.js')}" defer></script>
${extraScripts}
</body>
</html>
`;
}

// ── 헤더 (sticky frosted) ─────────────────────────────────────────────────────
function header() {
  return `<header class="site-header">
  <a class="wordmark" href="${href('/')}">ai<span class="wordmark-dot">·</span>wiki</a>
  <nav class="site-nav" aria-label="주요">
    <button type="button" class="nav-btn" data-search-trigger aria-label="검색" title="검색 (곧 제공)">
      <span class="nav-btn-ico" aria-hidden="true">⌕</span><span class="nav-btn-label">검색</span>
    </button>
    <a class="nav-btn" href="${escapeHtml(GH_URL)}#readme" target="_blank" rel="noopener">About</a>
    <button type="button" class="theme-toggle" data-theme-toggle aria-label="테마 전환" aria-pressed="false">☀</button>
  </nav>
</header>`;
}

// ── 푸터 ──────────────────────────────────────────────────────────────────────
function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <span class="footer-meta">
      <a href="${escapeHtml(GH_URL)}" target="_blank" rel="noopener">${escapeHtml(SITE.repo)}</a>
      <span class="footer-sep">·</span> ${escapeHtml(SITE.owner)}
    </span>
    <span class="footer-note">built on <a href="https://gist.github.com/karpathy/1dd0294ef9567971c1e4348a90d69285" target="_blank" rel="noopener">Karpathy LLM Wiki pattern</a></span>
  </div>
</footer>`;
}

// ── 카드 ──────────────────────────────────────────────────────────────────────
//
// page: content.mjs 페이지 모델 (+ catalog 머지). degree: 그래프 연결 수.
// links: 이웃 id 배열(undirected) — 카드 hover 시 연결 카드 하이라이트용 data 속성.
function card(page, degree, links) {
  const type = (page.catalogType || page.type || '').toUpperCase();
  const year = page.catalogYear || page.year || '';
  const tag = [type, year].filter(Boolean).join('·');
  const deg = degree.get(page.id) || 0;
  const chips = (page.tags || [])
    .slice(0, 2)
    .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
    .join('');
  const dataLinks = (links || []).join(' ');

  return `<a class="card" href="${escapeHtml(page.url)}" data-id="${escapeHtml(page.id)}" data-links="${escapeHtml(dataLinks)}">
  ${tag ? `<span class="card-tag">${escapeHtml(tag)}</span>` : ''}
  <h3 class="card-title">${escapeHtml(page.display || page.title)}</h3>
  ${page.desc ? `<p class="card-desc">${escapeHtml(page.desc)}</p>` : ''}
  <span class="card-foot">
    <span class="card-deg" title="연결 ${deg}개">↳ ${deg}</span>
    ${chips ? `<span class="card-chips">${chips}</span>` : ''}
  </span>
</a>`;
}

// ── 홈 ────────────────────────────────────────────────────────────────────────
//
// data: { sections, degree, adjacency:Map(id→[ids]), stats:{pages,links,categories}, graphHref }
export function home(data) {
  const { sections, degree, adjacency, stats, graphHref } = data;
  const visible = sections.filter((s) => s.pages.length);

  const hero = `<section class="hero">
  <canvas class="hero-constellation" data-graph="${escapeHtml(graphHref)}" aria-hidden="true"></canvas>
  <div class="hero-copy">
    <p class="hero-eyebrow">개인 AI 지식 베이스 · Karpathy LLM Wiki 패턴</p>
    <h1 class="hero-title">복리로 쌓이는 <span class="hero-accent">지식 그래프</span></h1>
    <p class="hero-lede">papers · repos · articles · reports · videos · books · lectures를 한글로 요약하고
      <code>[[wikilinks]]</code>로 엮은 ${stats.pages}개의 페이지. 아래는 그 페이지들이 실제로 이루는 인접 그래프다.</p>
    <dl class="hero-stats">
      <div><dt>pages</dt><dd>${stats.pages}</dd></div>
      <div><dt>links</dt><dd>${stats.links}</dd></div>
      <div><dt>categories</dt><dd>${stats.categories}</dd></div>
    </dl>
  </div>
</section>`;

  const bands = visible
    .map((s) => {
      const cards = s.pages
        .map((p) => card(p, degree, adjacency.get(p.id)))
        .join('\n');
      return `<section class="band" id="${escapeHtml(s.slug)}" aria-labelledby="band-${escapeHtml(s.slug)}">
  <div class="band-head">
    <h2 class="band-name" id="band-${escapeHtml(s.slug)}">${escapeHtml(s.label)}</h2>
    <span class="band-count">${s.pages.length}</span>
    ${s.desc ? `<p class="band-desc">${escapeHtml(s.desc)}</p>` : ''}
  </div>
  <div class="card-grid">
${cards}
  </div>
</section>`;
    })
    .join('\n');

  return layout({
    title: SITE.title,
    body: `${hero}\n${bands}`,
    mainClass: 'home',
    scripts: ['/static/js/constellation.js'],
  });
}

// ── 위키 INTERIM 본문 (Phase 4가 리딩 컬럼·TOC·neighborhood로 대체) ────────────
//
// 공유 layout() 셸(헤더/푸터/테마)은 적용하되, 본문은 파이프라인 검증용 최소 마크업.
export function wikiInterim(page, html, toc, degree) {
  const deg = degree.get(page.id) || 0;
  const meta = [page.catalogType || page.type, page.year].filter(Boolean).join(' · ');
  const tocHtml = toc.length
    ? `<nav class="eyebrow toc-inline">TOC: ${toc
        .map((t) => `<a href="#${t.id}">${escapeHtml(t.text)}</a>`)
        .join(' · ')}</nav>`
    : '';
  const body = `<article class="shell prose">
  <p class="interim">⚙ INTERIM 위키 레이아웃 — Constellation 셸(헤더·푸터·테마·타이포)은 적용됨. 리딩 컬럼·TOC rail·관련 그래프는 Phase 4.</p>
  <p class="eyebrow">${escapeHtml(page.category)} · ${escapeHtml(meta)} · ↳ ${deg} links</p>
  <h1>${escapeHtml(page.title)}</h1>
  ${tocHtml}
  <hr>
  ${html}
</article>`;
  return layout({ title: page.title, description: page.desc || SITE.description, body });
}
