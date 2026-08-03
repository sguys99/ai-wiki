// templates.mjs — Constellation 디자인 시스템 HTML 템플릿 (tagged template 문자열).
//
// 책임:
//   - layout()  : 사이트 공유 셸 (head/FOUC/헤더/푸터/스크립트). 홈·위키·about 공통.
//   - home()    : 홈 랜딩 (히어로 constellation → 카테고리 밴드 → 카드 그리드).
//   - 파셜       : header() · footer() · card()
//
// Phase 4 범위: 위키(절) 페이지 — 공유 셸 + 리딩 컬럼(~72ch) + 우측 TOC rail(scrollspy)
//   + 상단 진행바 + 페이지 헤더(카테고리 eyebrow·제목·메타) + 에디토리얼 본문.
//   이전/다음·관련(neighborhood) 그래프·원문/소스 링크는 Phase 5, About은 Phase 6.
// 검색(Pagefind)은 Phase 5 — 헤더 자리만 마련하고 링크는 임시.

import { href, absUrl, SITE } from './config.mjs';
import { escapeHtml } from './markdown.mjs';
import { domainOf } from './domains.mjs';

const GH_URL = `https://github.com/${SITE.repo}`;

// index.md 에 선언만 돼 있고 페이지가 아직 0개인 카테고리 밴드의 안내문.
// 밴드에는 이 문장 위에 index.md 섹션 설명(band-desc)이 이미 붙으므로,
// 여기서는 "왜 비었는지 · 언제 채워지는지"만 말한다.
const BAND_EMPTY_NOTE =
  '아직 등록된 자료가 없습니다. 분류와 태그 체계를 먼저 세워 둔 자리라 자료를 정리하는 대로 카드가 채워집니다.';

// FOUC 방지: CSS 적용 전 동기 실행으로 초기 테마를 확정.
const FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

// ── 공유 셸 ───────────────────────────────────────────────────────────────────
//
// opts: { title, description?, body, mainClass?, head?, scripts?:[src,...], path?, domain? }
//   - path: 페이지의 논리 경로('/', '/about/', '/agents/x/') — OG/canonical 절대 URL 생성용.
//   - domain: 'core' | 'physical' — <main>에 data-domain 으로 붙어 강조색 토큰을 스코프한다.
//     헤더·푸터는 <main> 바깥이라 언제나 아쿠아다.
export function layout(opts) {
  const {
    title,
    description = SITE.description,
    body,
    mainClass = '',
    head = '',
    scripts = [],
    path = '/',
    domain = '',
  } = opts;
  const pageTitle = title === SITE.title ? title : `${title} · ${SITE.title}`;
  const canonical = absUrl(path);
  const ogImage = absUrl('/static/img/og.png');
  const ogImageAlt = `${SITE.title} — ${SITE.description}`;
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
<link rel="icon" href="${href('/static/img/favicon.svg')}" type="image/svg+xml">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(SITE.title)}">
<meta property="og:title" content="${escapeHtml(pageTitle)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(ogImage)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(pageTitle)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(ogImage)}">
<link rel="stylesheet" href="${href('/static/fonts/pretendard/pretendard-dynamic-subset.css')}">
<link rel="stylesheet" href="${href('/static/css/styles.css')}">
<link rel="stylesheet" href="${href('/static/katex/katex.min.css')}">
${head}
</head>
<body>
<a class="skip-link" href="#main">본문으로 건너뛰기</a>
${header()}
<main id="main"${mainClass ? ` class="${mainClass}"` : ''}${domain ? ` data-domain="${escapeHtml(domain)}"` : ''}>
${body}
</main>
${footer()}
<script src="${href('/static/js/theme.js')}" defer></script>
<script src="${href('/static/js/nav.js')}" defer></script>
<script src="${href('/static/js/search.js')}" defer></script>
${extraScripts}
</body>
</html>
`;
}

// ── 헤더 (sticky frosted) ─────────────────────────────────────────────────────
//
// 데스크톱: 워드마크 + [검색][About][테마].
// 모바일(≤560px): 워드마크 + 아이콘 행([검색][테마][☰ 햄버거]) — About/홈/GitHub 는
//   햄버거가 여는 #site-menu 시트로 이동(nav.js 가 토글). 검색·테마는 항상 노출.
function header() {
  return `<header class="site-header">
  <a class="wordmark" href="${href('/')}">ai<span class="wordmark-dot">·</span>wiki</a>
  <nav class="site-nav" aria-label="주요">
    <button type="button" class="nav-btn" data-search-trigger data-pagefind="${escapeHtml(href('/pagefind/pagefind.js'))}" aria-label="검색" title="검색 (Ctrl/⌘ K)">
      <span class="nav-btn-ico" aria-hidden="true">⌕</span><span class="nav-btn-label">검색</span><kbd class="nav-kbd">⌘K</kbd>
    </button>
    <a class="nav-btn nav-about" href="${href('/about/')}">About</a>
    <a class="nav-btn nav-github" href="${escapeHtml(GH_URL)}" target="_blank" rel="noopener" aria-label="GitHub 저장소" title="GitHub 저장소">
      <svg class="nav-github-ico" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
    </a>
    <button type="button" class="theme-toggle" data-theme-toggle aria-label="테마 전환" aria-pressed="false">☀</button>
    <button type="button" class="nav-hamburger" data-nav-toggle aria-label="메뉴 열기" aria-expanded="false" aria-controls="site-menu">
      <span class="hamburger-bars" aria-hidden="true"></span>
    </button>
  </nav>
  <div id="site-menu" class="site-menu" hidden>
    <a href="${href('/')}">홈</a>
    <a href="${href('/about/')}">About</a>
    <a href="${escapeHtml(GH_URL)}" target="_blank" rel="noopener">GitHub ↗</a>
  </div>
</header>`;
}

// ── 푸터 ──────────────────────────────────────────────────────────────────────
function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <span class="footer-meta">
      <a href="${escapeHtml(GH_URL)}" target="_blank" rel="noopener">${escapeHtml(SITE.repo)}</a>
      <span class="footer-sep">·</span> ${escapeHtml(SITE.maintainer)}
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
  ${page.isNew ? '<span class="card-new">NEW</span>' : ''}
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
  const { sections, recent, degree, adjacency, stats, graphHref } = data;
  // 페이지가 있는 섹션 + index.md 에 선언만 된 빈 섹션(자료 대기 상태).
  // 빈 섹션은 카드 그리드 대신 한 줄 안내를 단 밴드로 나간다.
  const visible = sections.filter((s) => s.pages.length || s.declaredEmpty);
  const hasRecent = recent && recent.pages && recent.pages.length;

  const hero = `<section class="hero">
  <canvas class="hero-constellation" data-graph="${escapeHtml(graphHref)}" aria-hidden="true"></canvas>
  <div class="hero-copy">
    <p class="hero-eyebrow">개인 AI 지식 베이스</p>
    <h1 class="hero-title">복리로 쌓이는 <span class="hero-accent">지식 그래프</span></h1>
    <p class="hero-lede">AI 관련 지식을 한글로 요약한 지식 베이스<br>
      지식의 적재 · 관리 · 요약을 에이전트가 수행합니다.</p>
    <dl class="hero-stats">
      <div><dt>pages</dt><dd>${stats.pages}</dd></div>
      <div><dt>links</dt><dd>${stats.links}</dd></div>
      <div><dt>categories</dt><dd>${stats.categories}</dd></div>
    </dl>
  </div>
</section>`;

  // 카테고리 필터바 — sticky. '전체' + 각 카테고리 칩(카운트 포함). 클릭 시 밴드 토글은 filter.js.
  // No-JS 시에도 의미 있는 카테고리 점프 앵커(<a href="#slug">)로 동작하도록 칩은 링크로 둔다.
  const total = visible.reduce((n, s) => n + s.pages.length, 0);
  const chips = [
    `<a class="filter-chip is-active" href="${href('/')}" data-filter="all" role="button" aria-pressed="true">전체<span class="filter-count">${total}</span></a>`,
    ...(hasRecent
      ? [
          `<a class="filter-chip filter-chip-recent" href="#recent" data-filter="recent" role="button" aria-pressed="false">최근<span class="filter-count">${recent.pages.length}</span></a>`,
        ]
      : []),
    ...visible.map(
      (s) =>
        `<a class="filter-chip" href="#${escapeHtml(s.slug)}" data-filter="${escapeHtml(s.slug)}" data-domain="${escapeHtml(domainOf(s.slug))}" role="button" aria-pressed="false">${escapeHtml(s.label)}<span class="filter-count">${s.pages.length}</span></a>`
    ),
  ].join('\n      ');
  const filterBar = `<nav class="home-filter" aria-label="카테고리 필터">
  <div class="home-filter-inner">
      ${chips}
  </div>
</nav>`;

  const bandSection = (s, extraClass = '') => {
    const isEmpty = !s.pages.length;
    // 빈 밴드: 카드 그리드와 '+ 더 보기'를 빼고 안내 한 줄만 둔다.
    // data-band 는 그대로 유지 — filter.js 가 칩 클릭으로 이 밴드를 열 수 있어야 한다.
    const inner = isEmpty
      ? `  <p class="band-empty-note">${escapeHtml(BAND_EMPTY_NOTE)}</p>`
      : `  <div class="card-grid">
${s.pages.map((p) => card(p, degree, adjacency.get(p.id))).join('\n')}
  </div>
  <button type="button" class="band-more" data-more="${escapeHtml(s.slug)}" hidden>+ 더 보기</button>`;
    const cls = ['band', extraClass, isEmpty ? 'band-empty' : ''].filter(Boolean).join(' ');
    return `<section class="${cls}" id="${escapeHtml(s.slug)}" data-band="${escapeHtml(s.slug)}" data-domain="${escapeHtml(domainOf(s.slug))}" aria-labelledby="band-${escapeHtml(s.slug)}">
  <div class="band-head">
    <h2 class="band-name" id="band-${escapeHtml(s.slug)}">${escapeHtml(s.label)}</h2>
    <span class="band-count">${s.pages.length}</span>
    ${s.desc ? `<p class="band-desc">${escapeHtml(s.desc)}</p>` : ''}
  </div>
${inner}
</section>`;
  };

  // 최상단 통합 "최근 추가" 밴드(있으면) → 카테고리 밴드들.
  const recentBand = hasRecent ? bandSection(recent, 'band-recent') : '';
  const bands = visible.map((s) => bandSection(s)).join('\n');

  return layout({
    title: SITE.title,
    body: `${hero}\n${filterBar}\n${recentBand}\n${bands}`,
    mainClass: 'home',
    path: '/',
    scripts: ['/static/js/constellation.js', '/static/js/filter.js'],
  });
}

// ── About 페이지 ──────────────────────────────────────────────────────────────
//
// README/CLAUDE.md 에서 추출한 철학·THE FOUR RULES·3-tier 파이프라인을 리딩 컬럼에 렌더.
// 위키 페이지와 같은 에디토리얼 본문(.prose)을 쓰되, TOC rail/관련 그래프/이전·다음은 없다.
// html: about.mjs 의 markdown 을 renderMarkdown 으로 렌더한 본문.
export function about(html, intro) {
  const body = `<div class="wiki-grid about-grid">
  <article class="wiki-article prose">
    <header class="wiki-header">
      <p class="eyebrow wiki-eyebrow">프로젝트 소개</p>
      <h1 class="wiki-title">${escapeHtml(SITE.title)} — 개인 AI 지식 베이스</h1>
      ${intro ? `<p class="wiki-meta about-lede">${escapeHtml(intro)}</p>` : ''}
    </header>
    ${html}
  </article>
</div>`;

  return layout({
    title: 'About',
    description: intro || SITE.description,
    body,
    mainClass: 'wiki about',
    path: '/about/',
  });
}

// ── 위키(절) 페이지 ───────────────────────────────────────────────────────────
//
// 리딩 컬럼(~72ch) + 데스크톱 우측 TOC rail(scrollspy) + 상단 진행바 + 페이지 헤더.
// data: { html, toc, degree:Map, categoryLabel, neighbors, prev, next }
//   - degree: 그래프 연결 수(↳ N links 메타)
//   - categoryLabel: 카테고리 eyebrow 표기(index.md 섹션 라벨, 폴백은 slug)
//   - neighbors: 직접 링크된 페이지 목록(degree 내림차순) — 하단 관련 페이지 그래프/목록
//   - prev/next: 같은 카테고리(카탈로그 순서) 인접 페이지
export function wiki(page, html, toc, data = {}) {
  const { degree, categoryLabel, neighbors = [], prev = null, next = null } = data;
  const deg = (degree && degree.get(page.id)) || 0;
  const catLabel = categoryLabel || page.category;
  const type = (page.catalogType || page.type || '').toUpperCase();
  const year = page.catalogYear || page.year || '';

  // 페이지 헤더 — eyebrow(카테고리 링크 · TYPE · YEAR) + 제목 + 메타(저자 · 참조 · 연결수)
  const eyebrowParts = [
    `<a href="${href('/')}#${escapeHtml(page.category)}">${escapeHtml(catLabel)}</a>`,
    type ? escapeHtml(type) : '',
    year ? escapeHtml(String(year)) : '',
  ].filter(Boolean);

  const ref = referenceLink(page);
  const metaParts = [
    page.authors ? `<span class="wiki-authors">${escapeHtml(page.authors)}</span>` : '',
    ref,
    `<span class="wiki-deg" title="이 페이지와 연결된 페이지 ${deg}개">↳ ${deg} links</span>`,
  ].filter(Boolean);

  const header = `<header class="wiki-header">
    <p class="eyebrow wiki-eyebrow">${eyebrowParts.join('<span class="sep"> · </span>')}</p>
    <h1 class="wiki-title" data-pagefind-meta="title">${escapeHtml(page.title)}</h1>
    ${metaParts.length ? `<p class="wiki-meta">${metaParts.join('<span class="sep"> · </span>')}</p>` : ''}
  </header>`;

  // 하단 footer (Phase 5): 관련 페이지(neighborhood) + 원문/소스 + 이전/다음.
  const foot = wikiFoot(page, neighbors, prev, next);

  // TOC 항목(h2/h3) — 데스크톱 sticky rail 과 모바일 접이식 <details> 가 공유.
  const tocItems = toc
    .map(
      (t) =>
        `        <li class="toc-item toc-h${t.depth}"><a href="#${escapeHtml(t.id)}">${escapeHtml(
          t.text
        )}</a></li>`
    )
    .join('\n');

  // (데스크톱) 우측 sticky rail — scrollspy 대상.
  const tocRail = toc.length
    ? `<aside class="wiki-toc" aria-label="목차">
    <nav class="wiki-toc-inner">
      <p class="wiki-toc-title eyebrow">목차</p>
      <ul class="toc-list">
${tocItems}
      </ul>
    </nav>
  </aside>`
    : '';

  // (모바일) 접이식 목차 — 리딩 컬럼 위. 데스크톱은 CSS로 숨김. 네이티브 <details>라 JS 불필요.
  const tocMobile = toc.length
    ? `<details class="wiki-toc-m">
    <summary><span class="eyebrow">목차</span><span class="toc-m-chevron" aria-hidden="true"></span></summary>
    <nav aria-label="목차 (모바일)">
      <ul class="toc-list">
${tocItems}
      </ul>
    </nav>
  </details>`
    : '';

  const body = `<div class="reading-bar" aria-hidden="true"><i></i></div>
<div class="wiki-grid">
  ${tocMobile}
  <article class="wiki-article prose" data-pagefind-body>
    ${header}
    ${html}
  </article>
  ${tocRail}
  ${foot}
</div>`;

  return layout({
    title: page.title,
    description: page.desc || SITE.description,
    body,
    mainClass: 'wiki',
    domain: domainOf(page.category),
    path: `/${page.category}/${page.stem}/`,
    scripts: ['/static/js/reader.js'],
  });
}

// ── 위키 하단 footer (Phase 5) ────────────────────────────────────────────────
//
// 관련 페이지(neighborhood 그래프 + 목록) → 원문/소스 링크 → 같은 카테고리 이전/다음.
function wikiFoot(page, neighbors, prev, next) {
  return `<footer class="wiki-foot">
${relatedSection(page, neighbors)}
${sourcesSection(page)}
${prevNextNav(prev, next)}
</footer>`;
}

// 관련 페이지: 직접 링크된 이웃을 mini-constellation SVG(중심=현재 페이지)로 시각화하고,
// 라벨이 붙은 텍스트 목록을 함께 둔다. 그래프는 시각 에코, 목록이 실제 내비게이션.
function relatedSection(page, neighbors) {
  if (!neighbors.length) {
    return `  <section class="related" aria-labelledby="related-h">
    <h2 class="foot-h" id="related-h">관련 페이지</h2>
    <p class="related-empty">직접 연결된 페이지가 없습니다.</p>
  </section>`;
  }

  // 방사형 배치 (결정적). 중심은 현재 페이지, 이웃은 타원 위.
  const W = 480, H = 240, cx = 240, cy = 120, rx = 200, ry = 92;
  const n = neighbors.length;
  const maxDeg = Math.max(1, ...neighbors.map((x) => x.degree));
  let edges = '';
  let nodes = '';
  neighbors.forEach((nb, i) => {
    const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const x = cx + rx * Math.cos(ang);
    const y = cy + ry * Math.sin(ang);
    const r = 4 + 5 * (nb.degree / maxDeg);
    edges += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
    // native <title>은 ~1s 지연 툴팁이라 제외 — 즉시 표시는 reader.js가 data-title로 처리.
    // aria-label은 스크린리더 접근명으로 유지. data-neigh로 아래 목록 행과 매칭.
    nodes +=
      `<a href="${escapeHtml(nb.url)}" aria-label="${escapeHtml(nb.title)}" data-neigh="${i}" data-title="${escapeHtml(nb.title)}">` +
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/></a>`;
  });
  const svg = `<svg class="neigh" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="관련 페이지 그래프 (${n}개)">
      <g class="neigh-edges">${edges}</g>
      <g class="neigh-nodes">${nodes}</g>
      <circle class="neigh-center" cx="${cx}" cy="${cy}" r="7"></circle>
    </svg>`;

  const list = neighbors
    .map((nb, i) => {
      const tag = [String(nb.type || '').toUpperCase(), nb.year || '']
        .filter(Boolean)
        .join('·');
      return `      <li data-neigh="${i}">
        <a href="${escapeHtml(nb.url)}">${escapeHtml(nb.title)}</a>
        ${tag ? `<span class="related-tag">${escapeHtml(tag)}</span>` : ''}
        <span class="related-deg" title="연결 ${nb.degree}개">↳ ${nb.degree}</span>
      </li>`;
    })
    .join('\n');

  return `  <section class="related" aria-labelledby="related-h">
    <h2 class="foot-h" id="related-h">관련 페이지 <span class="foot-count">${n}</span></h2>
    ${svg}
    <ul class="related-list">
${list}
    </ul>
  </section>`;
}

// 원문/소스 링크: raw 원본(GitHub) · 요약 source(.md) · 이 위키 페이지 .md.
// raw_path 는 기기별 절대경로라 'raw/...' 부분만 잘라 GitHub blob URL 로 변환한다.
function sourcesSection(page) {
  const ghBlob = (p) => `https://github.com/${SITE.repo}/blob/main/${p}`;
  const links = [];

  const raw = ghRaw(page.rawPath);
  if (raw) {
    links.push(
      `<a href="${escapeHtml(raw.url)}" target="_blank" rel="noopener">원문 <span class="src-kind">${escapeHtml(raw.kind)}</span> ↗</a>`
    );
  }
  if (page.source) {
    links.push(
      `<a href="${escapeHtml(ghBlob(`sources/${page.source}`))}" target="_blank" rel="noopener">요약 source ↗</a>`
    );
  }
  if (page.relPath) {
    links.push(
      `<a href="${escapeHtml(ghBlob(`wiki/${page.relPath}`))}" target="_blank" rel="noopener">이 페이지 .md ↗</a>`
    );
  }
  if (!links.length) return '';

  return `  <section class="sources" aria-labelledby="sources-h">
    <h2 class="foot-h" id="sources-h">원문 · 소스</h2>
    <div class="src-links">${links.join('')}</div>
  </section>`;
}

// raw_path('/Users/…/raw/papers/x.pdf' 또는 'raw/papers/x.pdf') → { url, kind }.
function ghRaw(rawPath) {
  if (!rawPath) return null;
  const m = String(rawPath).match(/(raw\/.+)$/);
  if (!m) return null;
  const rel = m[1].replace(/\\/g, '/');
  const ext = (rel.split('.').pop() || '').toLowerCase();
  const kind = /^[a-z0-9]{1,5}$/.test(ext) && rel.includes('.') ? ext.toUpperCase() : 'FILE';
  return { url: `https://github.com/${SITE.repo}/blob/main/${rel}`, kind };
}

// 같은 카테고리 이전/다음 카드.
function prevNextNav(prev, next) {
  if (!prev && !next) return '';
  const cardFor = (p, dir, label) =>
    p
      ? `<a class="pn-card pn-${dir}" href="${escapeHtml(p.url)}">
      <span class="pn-dir">${label}</span>
      <span class="pn-title">${escapeHtml(p.display || p.title)}</span>
    </a>`
      : `<span class="pn-card pn-empty" aria-hidden="true"></span>`;
  return `  <nav class="prevnext" aria-label="같은 카테고리 내 이동">
    ${cardFor(prev, 'prev', '← 이전')}
    ${cardFor(next, 'next', '다음 →')}
  </nav>`;
}

// 페이지 헤더의 단일 참조 링크 — arxiv > doi > 일반 url 순. (raw/source 링크는 Phase 5.)
function referenceLink(page) {
  const fm = page.frontmatter || {};
  if (fm.arxiv_id) {
    const id = String(fm.arxiv_id);
    return `<a class="wiki-ref" href="https://arxiv.org/abs/${escapeHtml(id)}" target="_blank" rel="noopener">arXiv:${escapeHtml(id)}</a>`;
  }
  if (fm.doi) {
    const doi = String(fm.doi);
    return `<a class="wiki-ref" href="https://doi.org/${escapeHtml(doi)}" target="_blank" rel="noopener">doi:${escapeHtml(doi)}</a>`;
  }
  if (page.sourceUrl) {
    let host = page.sourceUrl;
    try {
      host = new URL(page.sourceUrl).hostname.replace(/^www\./, '');
    } catch {
      /* URL 파싱 실패 — 원문 문자열 그대로 */
    }
    return `<a class="wiki-ref" href="${escapeHtml(page.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(host)} ↗</a>`;
  }
  return '';
}
