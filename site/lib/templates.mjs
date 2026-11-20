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

// 태그 인덱스 도메인 그룹 표기. domains.mjs 의 도메인 키 → 화면 라벨/설명.
const DOMAIN_GROUPS = [
  {
    domain: 'core',
    label: 'Core',
    desc: 'LLM 소프트웨어 쪽 카테고리에서 쓴 태그입니다.',
  },
  {
    domain: 'physical',
    label: 'Physical AI',
    desc: '물리 세계와 상호작용하는 방법을 다룬 페이지의 태그입니다.',
  },
];

// index.md 에 선언만 돼 있고 페이지가 아직 0개인 카테고리 밴드의 안내문.
// 밴드에는 이 문장 위에 index.md 섹션 설명(band-desc)이 이미 붙으므로,
// 여기서는 "왜 비었는지 · 언제 채워지는지"만 말한다.
const BAND_EMPTY_NOTE =
  '아직 등록된 자료가 없습니다. 분류와 태그 체계를 먼저 세워 둔 자리라 자료를 정리하는 대로 카드가 채워집니다.';

// FOUC 방지: CSS 적용 전 동기 실행으로 초기 테마를 확정.
const FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

// ── 공유 셸 ───────────────────────────────────────────────────────────────────
//
// opts: { title, description?, body, mainClass?, mainAttrs?, head?, scripts?:[src,...], path?, domain? }
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
    mainAttrs = '',
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
<main id="main"${mainClass ? ` class="${mainClass}"` : ''}${domain ? ` data-domain="${escapeHtml(domain)}"` : ''}${mainAttrs ? ` ${mainAttrs}` : ''}>
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
    <a class="nav-btn nav-tags" href="${href('/tags/')}">태그</a>
    <a class="nav-btn nav-graph" href="${href('/graph/')}">그래프</a>
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
    <a href="${href('/tags/')}">태그</a>
    <a href="${href('/graph/')}">그래프</a>
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
// cardTags: content.mjs 의 태그 인덱스 엔트리 배열 — 앞의 2개만 칩으로 나가고 각각 태그
//   페이지로 링크된다. 카드 전체가 <a> 였으면 칩을 링크로 만들 수 없어(중첩 앵커 금지)
//   컨테이너를 <div> 로 바꾸고 제목 링크를 카드 전면으로 늘린다(.card-link::after).
function card(page, degree, links, cardTags = []) {
  const type = (page.catalogType || page.type || '').toUpperCase();
  const year = page.catalogYear || page.year || '';
  const tag = [type, year].filter(Boolean).join('·');
  const deg = degree.get(page.id) || 0;
  const chips = cardTags
    .slice(0, 2)
    .map(
      (t) =>
        `<a class="chip" href="${escapeHtml(t.url)}">${escapeHtml(t.label)}</a>`
    )
    .join('');
  const dataLinks = (links || []).join(' ');

  return `<div class="card" data-id="${escapeHtml(page.id)}" data-links="${escapeHtml(dataLinks)}">
  ${page.isNew ? '<span class="card-new">NEW</span>' : ''}
  ${tag ? `<span class="card-tag">${escapeHtml(tag)}</span>` : ''}
  <h3 class="card-title"><a class="card-link" href="${escapeHtml(page.url)}">${escapeHtml(page.display || page.title)}</a></h3>
  ${page.desc ? `<p class="card-desc">${escapeHtml(page.desc)}</p>` : ''}
  <span class="card-foot">
    <span class="card-deg" title="연결 ${deg}개">↳ ${deg}</span>
    ${chips ? `<span class="card-chips">${chips}</span>` : ''}
  </span>
</div>`;
}

// ── 홈 ────────────────────────────────────────────────────────────────────────
//
// data: { sections, degree, adjacency:Map(id→[ids]), stats:{pages,links,categories}, graphHref,
//         tagsFor:(page)=>[tagEntry,...] }
export function home(data) {
  const { sections, recent, degree, adjacency, stats, graphHref, tagsFor = () => [] } = data;
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
${s.pages.map((p) => card(p, degree, adjacency.get(p.id), tagsFor(p))).join('\n')}
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
    // graph-core.js 는 constellation.js 가 window.GraphCore 를 읽으므로 반드시 앞에 온다
    // (defer 스크립트는 문서 순서대로 실행된다).
    scripts: ['/static/js/graph-core.js', '/static/js/constellation.js', '/static/js/filter.js'],
  });
}

// ── 태그 인덱스 (/tags/) ──────────────────────────────────────────────────────
//
// 빈도순 태그 클라우드를 도메인(core / physical)별로 나눠 보여준다. 도메인 판정 규칙은
// content.mjs 의 buildTagIndex 주석 참고 — 그 태그를 단 페이지의 다수결이다.
// 각 그룹 <section> 에 data-domain 을 걸어 Phase 2 의 강조색 오버라이드를 그대로 받는다.

// 클라우드 글자 크기 단계. 빈도 분포가 롱테일(대부분 1회)이라 연속 스케일 대신 4단계.
function tagSize(count) {
  if (count >= 10) return 4;
  if (count >= 5) return 3;
  if (count >= 2) return 2;
  return 1;
}

function tagCloud(tags) {
  return `<div class="tag-cloud">
${tags
  .map(
    (t) =>
      `      <a class="tag-cloud-item" href="${escapeHtml(t.url)}" data-size="${tagSize(t.count)}">${escapeHtml(t.label)}<span class="tag-cloud-n">${t.count}</span></a>`
  )
  .join('\n')}
    </div>`;
}

// data: { tags:[entry,...], totalPages }
export function tagIndex(data) {
  const { tags, totalPages } = data;
  const groups = DOMAIN_GROUPS.map((g) => ({
    ...g,
    tags: tags.filter((t) => t.domain === g.domain),
  })).filter((g) => g.tags.length);

  const sections = groups
    .map(
      (g) => `  <section class="tag-group" data-domain="${escapeHtml(g.domain)}" aria-labelledby="tag-group-${escapeHtml(g.domain)}">
    <div class="band-head">
      <h2 class="band-name" id="tag-group-${escapeHtml(g.domain)}">${escapeHtml(g.label)}</h2>
      <span class="band-count">${g.tags.length}</span>
      <p class="band-desc">${escapeHtml(g.desc)}</p>
    </div>
    ${tagCloud(g.tags)}
  </section>`
    )
    .join('\n');

  const body = `<div class="tags-page">
  <header class="tags-head">
    <p class="eyebrow">태그 인덱스</p>
    <h1 class="tags-title">태그</h1>
    <p class="tags-lede">위키 페이지 frontmatter 의 태그를 모았습니다. 글자 크기는 쓰인 횟수이고 대소문자만 다른 표기는 한 항목으로 합쳤습니다.</p>
    <p class="tags-stat">태그 ${tags.length}개 · 페이지 ${totalPages}개</p>
  </header>
${sections}
</div>`;

  return layout({
    title: '태그',
    description: `${SITE.title} 태그 인덱스 — 태그 ${tags.length}개`,
    body,
    mainClass: 'tags',
    path: '/tags/',
  });
}

// ── 태그 상세 (/tags/{slug}/) ─────────────────────────────────────────────────
//
// 해당 태그를 단 페이지 목록. 홈과 같은 card() 를 그대로 쓴다.
// entry: content.mjs 태그 인덱스 엔트리. data: { degree, adjacency, tagsFor }
export function tag(entry, data) {
  const { degree, adjacency, tagsFor = () => [] } = data;

  const variants =
    entry.variantLabels && entry.variantLabels.length > 1
      ? `<p class="tag-variants">표기 변형을 한 태그로 묶었습니다 — ${entry.variantLabels.map((v) => `<code>${escapeHtml(v)}</code>`).join(' · ')}</p>`
      : '';

  const body = `<div class="tags-page">
  <header class="tags-head">
    <p class="eyebrow"><a href="${href('/tags/')}">태그 인덱스</a></p>
    <h1 class="tags-title tag-detail-title">${escapeHtml(entry.label)}</h1>
    <p class="tags-stat">페이지 ${entry.count}개</p>
    ${variants}
  </header>
  <div class="card-grid">
${entry.pages.map((p) => card(p, degree, adjacency.get(p.id), tagsFor(p))).join('\n')}
  </div>
</div>`;

  return layout({
    title: `태그: ${entry.label}`,
    description: `'${entry.label}' 태그가 달린 위키 페이지 ${entry.count}개`,
    body,
    mainClass: 'tags tag-detail',
    domain: entry.domain,
    path: `/tags/${entry.slug}/`,
  });
}

// 그래프 탐색기 궤도 딥링크 (02 8절 #node=). 미니 그래프와 약한 연결 리포트가 쓴다.
const nodeHref = (id) =>
  `${href('/graph/')}#node=${/^[a-z0-9/-]+$/.test(id) ? id : id.split('/').map(encodeURIComponent).join('/')}`;

// ── 전체 그래프 (/graph/) ─────────────────────────────────────────────────────
//
// 화면 구성은 docs/graph-spec/01-layout.md, 접근성 속성과 URL 규칙은 02-interaction.md 가 정본이다.
// 서버는 data-view="list" (카테고리별 텍스트 목록) 로 내보내고, 탐색기가 graph.json 과 배치를
// 마친 뒤에만 "map" 으로 바꾼다. 스크립트가 없거나 실패하면 목록 판이 그대로 남아 모든
// 페이지에 갈 수 있다. 무대 안 영역은 자리와 id 만 둔다 (내용은 탐색기가 채운다).
//
// data: { groups:[{ slug, label, domain, nodes:[{ id,url,title,degree }] }], types:[{ type, count }],
//         stats:{nodes,edges}, weak:{ noInbound, lowDegree } (graph.mjs weakLinks), graphHref, base }
export function graphPage(data) {
  const { groups, types, stats, weak, graphHref, base } = data;
  const num = (n) => n.toLocaleString('en-US');
  const statText = `페이지 ${num(stats.nodes)}개, 연결 ${num(stats.edges)}개`;

  // 범례 순서는 페이지 수 내림차순 (hash cat= 정규 순서도 이 순서다, 02 8.4절).
  const legend = [...groups]
    .sort((a, b) => b.nodes.length - a.nodes.length)
    .map(
      (g) =>
        `        <button type="button" class="graph-legend-item" data-cat="${escapeHtml(g.slug)}" aria-pressed="false"><span class="graph-swatch" aria-hidden="true"></span><span class="graph-legend-name">${escapeHtml(g.label)}</span><span class="graph-legend-n">${g.nodes.length}</span></button>`
    )
    .join('\n');

  const typeChips = types
    .map(
      (t) =>
        `            <button type="button" class="graph-chip" data-type="${escapeHtml(t.type)}" aria-pressed="false">${escapeHtml(t.type)}<span class="graph-chip-n">${t.count}</span></button>`
    )
    .join('\n');

  // 카테고리 절 id 는 slug 그대로 두지 않는다. "#physical-ai" 는 옛 카테고리 필터 hash 로 읽힌다 (02 8.5절).
  const list = groups
    .map(
      (g) => `    <section class="graph-group" id="graph-cat-${escapeHtml(g.slug)}" data-cat="${escapeHtml(g.slug)}" aria-labelledby="graph-group-${escapeHtml(g.slug)}">
      <div class="band-head">
        <h3 class="band-name" id="graph-group-${escapeHtml(g.slug)}"><span class="graph-swatch" aria-hidden="true"></span>${escapeHtml(g.label)}</h3>
        <span class="band-count">${g.nodes.length}</span>
      </div>
      <ul class="graph-nodes">
${g.nodes
  .map(
    (n) =>
      `        <li><a href="${escapeHtml(n.url)}">${escapeHtml(n.title)}</a><span class="graph-deg" title="연결 ${n.degree}개">↳ ${n.degree}</span></li>`
  )
  .join('\n')}
      </ul>
    </section>`
    )
    .join('\n');

  // 약한 연결 리포트 (06 3.2절). 행의 data-id 를 탐색기가 읽어 "연결이 적은 페이지" 렌즈를 그린다 (06 12.2 E3).
  const weakN = weak.noInbound.length + weak.lowDegree.length;
  const weakText = `연결이 적은 페이지 ${weakN}개`;
  const weakRow = (w) => {
    const sugg = w.suggest.length
      ? `\n          <p class="graph-weak-sugg"><span class="graph-weak-sugg-k">링크 후보</span>${w.suggest
          .map(
            (s) =>
              `<a href="${escapeHtml(s.url)}" data-cat="${escapeHtml(s.category)}" title="겹치는 태그 ${s.shared}개"><span class="graph-swatch" aria-hidden="true"></span>${escapeHtml(s.title)}</a>`
          )
          .join('')}</p>`
      : '';
    return `        <li data-id="${escapeHtml(w.id)}" data-cat="${escapeHtml(w.category)}">
          <span class="graph-swatch" aria-hidden="true"></span><a class="graph-weak-title" href="${escapeHtml(w.url)}">${escapeHtml(w.title)}</a>
          <span class="graph-weak-deg"><span>나감 ${w.outDeg}</span><span${w.inDeg ? '' : ' class="is-zero"'}>들어옴 ${w.inDeg}</span></span>
          <a class="graph-weak-map" href="${escapeHtml(nodeHref(w.id))}" aria-label="${escapeHtml(w.title)} 그래프에서 보기">그래프</a>${sugg}
        </li>`;
  };
  const weakGroup = (key, label, items) =>
    items.length
      ? `    <h3 class="graph-weak-h" id="weak-${key}">${label}<span class="band-count">${items.length}</span></h3>
      <ul class="graph-weak-list" aria-labelledby="weak-${key}">
${items.map(weakRow).join('\n')}
      </ul>`
      : '';
  const weakSection = `  <section class="graph-weak" id="weak-links" aria-labelledby="weak-links-h">
    <h2 class="graph-list-title" id="weak-links-h">연결이 적은 페이지<span class="band-count">${weakN}</span></h2>
    <p class="graph-weak-lede">위키링크로 닿기 어려운 페이지입니다. 다른 페이지에서 링크를 걸면 그래프가 촘촘해집니다. 링크 후보는 태그가 가장 많이 겹치면서 아직 잇지 않은 페이지입니다.</p>
${weakGroup('in', '들어오는 링크 없음', weak.noInbound)}
${weakGroup('deg', '연결 3개 이하', weak.lowDegree)}
  </section>`;

  // 스크립트가 있어야 동작하는 컨트롤은 hidden 으로 내보내고 탐색기가 시작 때 푼다 (명령 줄, 줌과 맞춤 버튼, 조작 안내).
  // DOM 순서가 곧 Tab 순서다: 명령 줄, 팝오버, 칩 줄과 경로 줄, 캔버스, 패널, 범례, 도구 (01 9.2절).
  const body = `<h1 class="graph-title" id="graph-title">그래프</h1>
<a class="graph-skip" href="#list">페이지 목록으로 건너뛰기</a>

<section class="graph-stage" data-mode="atlas" aria-labelledby="graph-title" hidden>
  <div class="graph-cmd graph-float is-tl" hidden>
    <search class="graph-search" role="search">
      <label class="sr-only" for="graph-q">페이지 검색</label>
      <svg class="graph-search-ico" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m10.4 10.4 3.4 3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      <input id="graph-q" type="search" placeholder="페이지 제목으로 찾기" autocomplete="off" spellcheck="false" role="combobox" aria-controls="graph-results" aria-expanded="false" aria-autocomplete="list">
      <kbd class="graph-kbd" aria-hidden="true"><span class="graph-kbd-idle">/</span><span class="graph-kbd-on">Esc</span></kbd>
      <ul class="graph-results" id="graph-results" role="listbox" aria-label="검색 결과"></ul>
    </search>
    <button type="button" class="graph-filter-btn" id="graph-filter-btn" aria-expanded="false" aria-controls="graph-filters"><svg class="graph-filter-ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span class="graph-filter-label">필터</span><span class="graph-badge" hidden></span></button>
    <!-- Phase 5 예약: 학습 경로 버튼 .graph-path-btn, 경로 팝오버 #graph-paths (01 7절, 06 4절) -->
  </div>
  <div class="graph-filters" id="graph-filters" role="group" aria-label="유형과 태그 필터" hidden>
    <p class="graph-filters-empty" id="graph-filters-empty" hidden></p>
    <div class="graph-filters-sec">
      <p class="graph-filters-h" id="graph-f-type">유형</p>
      <div class="graph-chips" role="group" aria-labelledby="graph-f-type">
${typeChips}
      </div>
    </div>
    <div class="graph-filters-sec">
      <label class="graph-filters-h" for="graph-tag-q">태그</label>
      <input id="graph-tag-q" class="graph-tag-q" type="search" placeholder="태그 찾기" autocomplete="off" spellcheck="false" role="combobox" aria-controls="graph-tag-results" aria-expanded="false" aria-autocomplete="list">
      <ul class="graph-tag-results" id="graph-tag-results" role="listbox" aria-label="태그 제안"></ul>
      <div class="graph-chips" id="graph-tag-picked" role="group" aria-label="고른 태그"></div>
      <div class="graph-chips" id="graph-tag-suggest" role="group" aria-label="자주 쓰는 태그"></div>
    </div>
    <div class="graph-filters-sec">
      <p class="graph-filters-h" id="graph-f-emph">강조</p>
      <div class="graph-switches" role="group" aria-labelledby="graph-f-emph">
        <!-- Phase 5 예약: 둘째 스위치 #graph-recent "최근 추가" (06 2절) -->
        <button type="button" class="graph-switch" id="graph-weak" role="switch" aria-checked="false"><span class="graph-switch-track" aria-hidden="true"></span><span class="graph-switch-label">연결이 적은 페이지</span><span class="graph-chip-n">${weakN}</span></button>
      </div>
    </div>
    <button type="button" class="graph-filters-reset" id="graph-filters-reset">모두 해제</button>
  </div>

  <div class="graph-row graph-float" id="graph-active-filters" hidden></div>
  <nav class="graph-row graph-float graph-trail" aria-label="지나온 페이지" hidden>
    <button type="button" class="graph-home" id="graph-home"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 11 8 4.5l4.5 5.5" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.55"/><circle cx="3.5" cy="11" r="1.6" fill="currentColor"/><circle cx="8" cy="4.5" r="2" fill="currentColor"/><circle cx="12.5" cy="10" r="1.4" fill="currentColor"/></svg>전체 보기</button>
    <ol class="graph-crumbs" id="graph-crumbs"></ol>
  </nav>

  <canvas class="graph-canvas" tabindex="0" role="application" aria-roledescription="관계 그래프" aria-label="wiki 페이지 관계 그래프, 전체 보기" aria-describedby="graph-help" data-graph="${escapeHtml(graphHref)}" data-base="${escapeHtml(base)}"></canvas>
  <p class="sr-only" id="graph-help">방향키나 Enter를 누르면 연결이 가장 많은 페이지를 중심으로 궤도를 엽니다. 궤도에서는 왼쪽과 오른쪽 방향키로 궤도를 돌고, 아래와 위 방향키로 바깥 궤도와 안쪽 궤도를 오갑니다. Enter는 고른 페이지를 중심으로 옮기고, 중심에서 누르면 그 페이지를 엽니다. Backspace는 지나온 페이지로 돌아가고, Esc는 열린 것을 하나씩 닫습니다. 슬래시는 검색, 더하기와 빼기는 확대와 축소, 0은 화면 맞춤입니다.</p>
  <p class="sr-only" id="graph-live" aria-live="polite"></p>

  <aside class="graph-panel" aria-labelledby="graph-p-title" hidden inert>
    <div class="graph-sheet-grip" aria-hidden="true"></div>
    <div class="graph-panel-head">
      <span class="graph-panel-cat" id="graph-p-cat"></span>
      <button type="button" class="graph-panel-close" id="graph-p-close" aria-label="전체 보기로 돌아가기">×</button>
      <h2 class="graph-panel-title" id="graph-p-title"></h2>
      <p class="graph-panel-meta" id="graph-p-meta"></p>
    </div>
    <div class="graph-panel-body" id="graph-p-body"></div>
    <div class="graph-panel-foot">
      <a class="graph-panel-open" id="graph-p-open" href="${href('/graph/')}"><span class="graph-panel-open-label">페이지 열기</span><span class="graph-panel-open-ico" aria-hidden="true">↗</span></a>
      <button type="button" class="graph-panel-toggle" id="graph-p-toggle" aria-expanded="false" aria-controls="graph-p-body">이웃 보기</button>
    </div>
  </aside>

  <div class="graph-dock graph-float is-bl">
    <div class="graph-legend" role="group" aria-label="카테고리 필터">
      <p class="graph-legend-stat">${statText}</p>
${legend}
      <button type="button" class="graph-legend-reset" hidden>필터 해제</button>
      <!-- Phase 5 예약: 최근 추가 표식 줄 .graph-legend-recent (01 7절) -->
      <a class="graph-legend-weak" href="#weak-links">${weakText}<span aria-hidden="true"> →</span></a>
    </div>
    <p class="graph-hint is-atlas" hidden><span class="graph-hint-line" data-hint="select" hidden><kbd>클릭</kbd> 궤도로 열기</span><span class="graph-hint-line" data-hint="zoom"><kbd>휠</kbd> 확대, <kbd>드래그</kbd> 이동</span><span class="graph-hint-line" data-hint="search"><kbd>/</kbd> 검색</span></p>
    <p class="graph-hint is-orbit" hidden><span class="graph-hint-line" data-hint="recenter"><kbd>클릭</kbd> 중심 옮기기</span><span class="graph-hint-line" data-hint="zoom"><kbd>휠</kbd> 확대, <kbd>드래그</kbd> 이동</span><span class="graph-hint-line" data-hint="keys"><kbd>← →</kbd> 궤도 돌기</span><span class="graph-hint-line" data-hint="keys"><kbd>↑ ↓</kbd> 안팎 궤도</span><span class="graph-hint-line" data-hint="keys"><kbd>Enter</kbd> 중심에 두기</span><span class="graph-hint-line" data-hint="keys"><kbd>Esc</kbd> 전체 보기</span></p>
  </div>

  <div class="graph-tools graph-float is-br" role="toolbar" aria-label="보기 도구">
    <button type="button" class="graph-tool is-zoom" id="graph-zoom-in" aria-label="확대" hidden>+</button>
    <button type="button" class="graph-tool is-zoom" id="graph-zoom-out" aria-label="축소" hidden>−</button>
    <button type="button" class="graph-tool" id="graph-fit" hidden><span class="graph-tool-ico" aria-hidden="true">⤢</span><span class="graph-tool-label">화면 맞춤</span></button>
    <button type="button" class="graph-tool" id="graph-to-list"><span class="graph-tool-ico" aria-hidden="true">☰</span><span class="graph-tool-label">목록 보기</span></button>
    <!-- Phase 5 예약: 데스크톱 전용 3D 실험 페이지 링크 (01 5.6절, 06 6절) -->
  </div>
  <!-- Phase 5 예약: 학습 경로 단계 막대 .graph-pathbar (01 7절) -->

  <div class="graph-tip" aria-hidden="true" hidden></div>
</section>

<section class="graph-list" id="graph-list" aria-labelledby="graph-list-h">
  <header class="graph-list-head">
    <p class="graph-lede">페이지 사이의 위키링크 관계입니다. 이 목록은 그래프와 같은 페이지를 카테고리별로 모았고, 스크립트가 없어도 모든 페이지에 갈 수 있습니다.</p>
    <p class="graph-stat">${statText}<a class="graph-weak-jump" href="#weak-links">${weakText}<span aria-hidden="true"> →</span></a></p>
    <p class="graph-list-note" id="graph-list-note" hidden></p>
    <button type="button" class="graph-to-map" id="graph-to-map" hidden>그래프로 보기</button>
    <h2 class="graph-list-title" id="graph-list-h">카테고리별 목록</h2>
  </header>
${list}
${weakSection}
</section>`;

  return layout({
    title: '그래프',
    description: `${SITE.title} 지식 그래프 — 페이지 ${stats.nodes}개 · 연결 ${stats.edges}개`,
    body,
    mainClass: 'graph',
    mainAttrs: 'data-view="list"',
    path: '/graph/',
    scripts: ['/static/js/graph-core.js', '/static/js/graph-explorer.js'],
  });
}

// ── 학습 경로 (study_path) ────────────────────────────────────────────────────
//
// overview 페이지 frontmatter 의 study_path 를 번호 단계로 렌더한다. 본문 `## 학습 경로` 절의
// 헤딩·도입 문단·`###` 트랙 헤딩은 그대로 두고 절 안 첫 번호 목록 자리에만 들어가므로
// (markdown.mjs 의 spliceStudyPath) 여기서는 목록만 낸다.
// 해석 실패한 참조는 링크 대신 미해석 표기로 두고 빌드 콘솔이 따로 리포트한다 —
// 위키링크가 깨졌을 때와 같은 처리다.
//
// steps: content.mjs 의 resolveStudyPaths 결과
//   [{ n, ok, url, title, note, prereq:[{ ok, url, title, ref }] }]
export function studyPathSection(steps) {
  if (!steps || !steps.length) return '';

  const refLink = (r, cls) =>
    r.ok
      ? `<a class="${cls}" href="${escapeHtml(r.url)}">${escapeHtml(r.title)}</a>`
      : `<span class="${cls} wikilink-missing" title="미해석 학습 경로 참조">${escapeHtml(r.title)}</span>`;

  // 이 HTML은 markdown 본문에 그대로 끼워 넣는다(markdown.mjs 의 spliceStudyPath).
  // 빈 줄이 있으면 marked 가 HTML 블록을 거기서 끊고, 4칸 들여쓰기는 코드블록으로 잡힌다 —
  // 그래서 줄 앞 공백도 빈 줄도 두지 않는다.
  const items = steps
    .map((s) => {
      const note = s.note ? `<p class="study-note">${escapeHtml(s.note)}</p>` : '';
      const prereq =
        s.prereq && s.prereq.length
          ? `<p class="study-prereq"><span class="study-prereq-label">선수</span>${s.prereq
              .map((p) => refLink(p, 'study-prereq-link'))
              .join('<span class="sep"> · </span>')}</p>`
          : '';
      return `<li class="study-step"><span class="study-n">${s.n}</span>${refLink(s, 'study-link')}${note}${prereq}</li>`;
    })
    .join('\n');

  return `<ol class="study-path">\n${items}\n</ol>`;
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
// data: { html, toc, degree:Map, categoryLabel, neighbors, prev, next, tags }
//   - degree: 그래프 연결 수(↳ N links 메타)
//   - categoryLabel: 카테고리 eyebrow 표기(index.md 섹션 라벨, 폴백은 slug)
//   - neighbors: 직접 링크된 페이지 목록(degree 내림차순) — 하단 관련 페이지 그래프/목록
//   - prev/next: 같은 카테고리(카탈로그 순서) 인접 페이지
//   - tags: 태그 인덱스 엔트리 배열 — 본문 아래 전체 노출(카드 칩은 2개 상한, 여기는 전량)
export function wiki(page, html, toc, data = {}) {
  const { degree, categoryLabel, neighbors = [], edgeSet = new Set(), prev = null, next = null, tags = [] } = data;
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
  const foot = wikiFoot(page, neighbors, edgeSet, prev, next);

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

  // 페이지 전체 태그 — 본문 끝. Pagefind 필터 마커(data-pagefind-filter)를 겸하므로
  // data-pagefind-body 안쪽(=article)에 둔다. 바깥(wiki-foot)에 두면 인덱싱에서 빠진다.
  const tagList = tags.length
    ? `<nav class="wiki-tags" aria-label="이 페이지의 태그">
      <span class="wiki-tags-label eyebrow">태그</span>
      ${tags
        .map(
          (t) =>
            `<a class="chip" href="${escapeHtml(t.url)}" data-pagefind-filter="tag:${escapeHtml(t.label)}">${escapeHtml(t.label)}</a>`
        )
        .join('\n      ')}
    </nav>`
    : '';

  const body = `<div class="reading-bar" aria-hidden="true"><i></i></div>
<div class="wiki-grid">
  ${tocMobile}
  <article class="wiki-article prose" data-pagefind-body data-pagefind-filter="category:${escapeHtml(catLabel)}">
    ${header}
    ${html}
    ${tagList}
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
function wikiFoot(page, neighbors, edgeSet, prev, next) {
  return `<footer class="wiki-foot">
${relatedSection(page, neighbors, edgeSet)}
${sourcesSection(page)}
${prevNextNav(prev, next)}
</footer>`;
}

// 관련 페이지 (06 5절): 직접 이웃을 빌드 타임 정적 SVG 미니 그래프(중심은 현재 페이지, 이웃 24개 상한)와
// 이웃 전부를 담은 텍스트 목록으로 보인다. 그림은 장식(aria-hidden)이고 목록이 실제 내비게이션이다.
// 노드 <a data-neigh data-title> 와 목록 <li data-neigh> 짝은 reader.js 툴팁과 양방향 강조(E7)가 쓴다.
const MINI_CAP = 24; // 06 12.1 R4
const MINI_CHORDS = 40;
const LIST_OPEN = 12; // 13번째 행부터 <details>
// 04 4.2절 2번 카테고리 범례 순서 (탐색기 CAT_ORDER 와 규칙만 같고 구현은 따로다, 06 5.6절)
const MINI_CAT_ORDER = ['physical-ai', 'agents', 'applications', 'database', 'llms', 'overviews', 'evaluations', 'etc'];

function miniGraph(page, neighbors, edgeSet) {
  const W = 480, H = 240, cx = 240, cy = 120, rx = 200, ry = 92;
  const f = (v) => +v.toFixed(1);

  // 1 ~ 2) 서로 링크, degree, 제목 순으로 24개. 24개 밖에만 있는 카테고리는 그 최상위 노드로
  //        뒤에서부터 바꾼다 (하나뿐인 카테고리 노드는 바꾸지 않는다).
  const ranked = [...neighbors].sort(
    (a, b) => (b.out && b.in) - (a.out && a.in) || b.degree - a.degree || a.title.localeCompare(b.title, 'ko')
  );
  const picked = ranked.slice(0, MINI_CAP);
  let tail = picked.length - 1;
  for (const nb of ranked.slice(MINI_CAP)) {
    if (picked.some((p) => p.category === nb.category)) continue;
    while (tail >= 0 && picked.filter((p) => p.category === picked[tail].category).length < 2) tail--;
    if (tail < 0) break;
    picked[tail--] = nb;
  }

  // 3) 카테고리 순, `카테고리|첫 하위 태그` 묶음 크기, 묶음 키, degree 로 다시 정렬하고 placeRing 규칙으로 각도.
  const ord = (c) => (MINI_CAT_ORDER.includes(c) ? MINI_CAT_ORDER.indexOf(c) : 99);
  const key = (n) => `${n.category}|${n.tag}`;
  const freq = {};
  for (const n of picked) freq[key(n)] = (freq[key(n)] || 0) + 1;
  picked.sort(
    (a, b) =>
      ord(a.category) - ord(b.category) || freq[key(b)] - freq[key(a)] ||
      (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0) || b.degree - a.degree || (a.id < b.id ? -1 : 1)
  );
  const hidden = neighbors.length - picked.length;
  const reserve = hidden ? 0.5 : 0; // 5) 꼭대기 "+k" 자리
  let groups = 1;
  for (let i = 1; i < picked.length; i++) if (picked[i].category !== picked[i - 1].category) groups++;
  const gap = groups > 1 ? Math.min(0.09, 0.7 / groups) : 0;
  const step = (2 * Math.PI - reserve - (groups > 1 ? groups * gap : 0)) / picked.length;
  let ang = -Math.PI / 2 + reserve / 2 + gap / 2;
  const pos = new Map();
  picked.forEach((n, j) => {
    if (j && n.category !== picked[j - 1].category) ang += gap;
    pos.set(n.id, [f(cx + rx * Math.cos(ang + step / 2)), f(cy + ry * Math.sin(ang + step / 2))]); // 4) 타원
    ang += step;
  });

  // 현: 고른 이웃끼리의 엣지, 서로 링크 쌍 먼저, 다음은 두 끝 degree 합. 중점을 중심 쪽으로 30% 당긴 2차 곡선.
  const pairs = [];
  for (let i = 0; i < picked.length; i++)
    for (let j = i + 1; j < picked.length; j++) {
      const p = picked[i], q = picked[j];
      const fw = edgeSet.has(`${p.id}>${q.id}`), bw = edgeSet.has(`${q.id}>${p.id}`);
      if (fw || bw) pairs.push([p, q, fw && bw]);
    }
  pairs.sort((x, y) => y[2] - x[2] || y[0].degree + y[1].degree - x[0].degree - x[1].degree);
  const chords = pairs
    .slice(0, MINI_CHORDS)
    .map(([p, q]) => {
      const [x1, y1] = pos.get(p.id), [x2, y2] = pos.get(q.id);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      return `M${x1} ${y1}Q${f(mx + 0.3 * (cx - mx))} ${f(my + 0.3 * (cy - my))} ${x2} ${y2}`;
    })
    .join('');

  // 바큇살과 노드는 같은 순서로 낸다 (reader.js 가 순번으로 짝짓는다). 6) 반지름 4 + 5 × degree / 최대.
  const listIdx = new Map(neighbors.map((nb, i) => [nb.id, i]));
  const maxDeg = Math.max(1, ...picked.map((n) => n.degree));
  let spokes = '';
  let nodes = '';
  for (const nb of picked) {
    const [x, y] = pos.get(nb.id);
    const dir = nb.out && nb.in ? 'is-mutual' : nb.out ? 'is-out' : 'is-in';
    spokes += `<path class="${dir}" d="M${cx} ${cy}L${x} ${y}"/>`;
    // native <title> 은 약 1초 지연 툴팁이라 두지 않는다. 즉시 툴팁은 reader.js 가 data-title 로 띄운다.
    nodes +=
      `<a href="${escapeHtml(nb.url)}" tabindex="-1" data-neigh="${listIdx.get(nb.id)}" data-cat="${escapeHtml(nb.category)}" data-title="${escapeHtml(nb.title)}">` +
      `<circle cx="${x}" cy="${y}" r="${f(4 + 5 * (nb.degree / maxDeg))}" fill="url(#ng-${escapeHtml(nb.category)})"/></a>`;
  }
  // E6 구슬 질감: 쓰인 카테고리마다 방사형 그라데이션 하나. 색은 data-cat 의 --c 를 stop 이 물려받는다.
  const defs = [...new Set(picked.map((n) => n.category))]
    .map(
      (c) =>
        `<radialGradient id="ng-${escapeHtml(c)}" data-cat="${escapeHtml(c)}" cx=".34" cy=".3" r=".75"><stop class="ng-hi"/><stop offset=".6"/></radialGradient>`
    )
    .join('');
  const self = nodeHref(page.id);
  const more = hidden
    ? `<a class="neigh-more" href="${self}" tabindex="-1"><text x="${cx}" y="${cy - ry + 4}" text-anchor="middle">+${hidden}</text></a>`
    : '';

  return `<svg class="neigh" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>${defs}</defs>
      ${chords ? `<path class="neigh-chord" d="${chords}"/>` : ''}
      <g class="neigh-spokes">${spokes}</g>
      <g class="neigh-nodes">${nodes}</g>
      <a class="neigh-self" href="${self}" tabindex="-1" data-cat="${escapeHtml(page.category)}"><circle class="neigh-ring" cx="${cx}" cy="${cy}" r="10"/><circle class="neigh-center" cx="${cx}" cy="${cy}" r="7"/></a>
      ${more}
    </svg>`;
}

function relatedSection(page, neighbors, edgeSet) {
  if (!neighbors.length) {
    return `  <section class="related" aria-labelledby="related-h">
    <h2 class="foot-h" id="related-h">관련 페이지</h2>
    <p class="related-empty">직접 연결된 페이지가 없습니다.</p>
  </section>`;
  }

  const n = neighbors.length;
  const row = (nb, i) => {
    const tag = [String(nb.type || '').toUpperCase(), nb.year || ''].filter(Boolean).join('·');
    return `      <li data-neigh="${i}" data-cat="${escapeHtml(nb.category)}">
        <span class="graph-swatch" aria-hidden="true"></span>
        <a href="${escapeHtml(nb.url)}">${escapeHtml(nb.title)}</a>
        ${tag ? `<span class="related-tag">${escapeHtml(tag)}</span>` : ''}
        <span class="related-deg" title="연결 ${nb.degree}개">↳ ${nb.degree}</span>
      </li>`;
  };
  const rows = neighbors.map(row);
  const rest =
    n > LIST_OPEN
      ? `
    <details class="related-more">
      <summary>나머지 ${n - LIST_OPEN}개</summary>
      <ul class="related-list">
${rows.slice(LIST_OPEN).join('\n')}
      </ul>
    </details>`
      : '';

  return `  <section class="related" aria-labelledby="related-h">
    <div class="related-head">
      <h2 class="foot-h" id="related-h">관련 페이지 <span class="foot-count">${n}</span></h2>
      <a class="related-graph" href="${nodeHref(page.id)}">그래프에서 보기 <span aria-hidden="true">→</span></a>
    </div>
    ${miniGraph(page, neighbors, edgeSet)}
    <ul class="related-list">
${rows.slice(0, LIST_OPEN).join('\n')}
    </ul>${rest}
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
