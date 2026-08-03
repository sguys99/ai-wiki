// markdown.mjs — wiki 본문(frontmatter 제거된 markdown)을 HTML로 렌더한다.
//
// 책임:
//   - figure 임베드  ![[assets/{stem}/figNN.png]] (+ 다음 줄 *Figure …*) → <figure><img><figcaption>
//   - 위키링크       [[category/stem|display]] / [[stem]] → <a> (resolver로 해석)
//   - 미해석 링크    → muted <span> + broken 리스트에 수집 (빌드 경고)
//   - 모든 h2/h3 에 안정 id 부여 + TOC(scrollspy용) 추출
//
// 코드펜스/인라인코드 안의 [[…]]·![[…]] 예시는 건드리지 않는다(marked가 code 토큰으로 보호 +
// figure 전처리는 펜스 인식). 수식 $…$ / $$…$$ 는 marked-katex-extension으로 빌드 타임에 HTML 렌더.

import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 헤딩 텍스트 → 안정 slug. 한글 보존, 공백→'-', 안전문자만. dedup은 호출부 카운터로.
// content.mjs(resolver)가 [[page#heading]] 앵커를 같은 규칙으로 슬러그화하도록 export.
export function slugify(text) {
  const base = text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\p{L}\p{N}_-]+/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  return base;
}

// 코드펜스 밖의 라인에만 fn(line, index)을 적용해 변환 라인을 만든다.
// fn 은 { line, peek(n) } 컨텍스트를 받아 { html, consume } 또는 null(원본 유지)을 반환.
function transformFigures(src, hrefFn) {
  const lines = src.split('\n');
  const out = [];
  let inFence = false;
  let fenceTok = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const tok = fence[1][0];
      if (!inFence) {
        inFence = true;
        fenceTok = tok;
      } else if (tok === fenceTok) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const m = line.match(/^!\[\[([^\]]+)\]\]\s*$/);
    if (m) {
      const path = m[1].trim();
      let caption = '';
      const next = lines[i + 1];
      if (next && /^\s*\*(.+)\*\s*$/.test(next)) {
        caption = next.trim().replace(/^\*+|\*+$/g, '').trim();
        i++; // 캡션 라인 소비
      }
      const src2 = hrefFn(`/${path}`);
      const alt = caption || path.split('/').pop();
      out.push('');
      out.push(
        `<figure class="fig">` +
          `<img src="${escapeHtml(src2)}" alt="${escapeHtml(alt)}" loading="lazy">` +
          (caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : '') +
          `</figure>`
      );
      out.push('');
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

// nonStandard KaTeX 모드는 닫는 '$' 뒤 공백을 요구하지 않아 한글 조사가 붙는 `$X_t$는` 수식을
// 살리지만, 대신 통화 표기($0.97·$50 …)가 인접 delimiter로 오인돼 사이 텍스트를 통째로 math로
// 삼킨다. 이 코퍼스에서 '$' 바로 뒤 숫자는 항상 통화(수식 opener는 letter·'\\'로 시작)이므로,
// 코드펜스·인라인코드 밖에서 그 '$'를 HTML 엔티티(&#36;)로 치환해 delimiter 후보에서 제외한다.
// (앞 문자가 '$'(=$$… 블록)·'\\'(=이미 escape)인 경우는 건드리지 않는다.)
function protectCurrency(src) {
  const lines = src.split('\n');
  const out = [];
  let inFence = false;
  let fenceTok = '';

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const tok = fence[1][0];
      if (!inFence) {
        inFence = true;
        fenceTok = tok;
      } else if (tok === fenceTok) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    // 인라인 코드 스팬(`...`)은 보존하고 그 밖 세그먼트에서만 치환.
    const conv = line
      .split(/(`[^`]*`)/)
      .map((seg) =>
        seg.startsWith('`') ? seg : seg.replace(/(^|[^$\\])\$(?=\d)/g, '$1&#36;')
      )
      .join('');
    out.push(conv);
  }
  return out.join('\n');
}

// 코드펜스 밖에서 [[…]] (단, ![[…]] 임베드 제외) 타깃 문자열을 모두 추출. graph.mjs도 사용.
export function extractWikiTargets(src) {
  const lines = src.split('\n');
  const targets = [];
  let inFence = false;
  let fenceTok = '';
  const re = /(?<!!)\[\[([^\]\n]+)\]\]/g;

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const tok = fence[1][0];
      if (!inFence) {
        inFence = true;
        fenceTok = tok;
      } else if (tok === fenceTok) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;
    // 인라인 코드 스팬(`...`) 내부는 제외
    const noCode = line.replace(/`[^`]*`/g, '');
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(noCode))) targets.push(m[1].trim());
  }
  return targets;
}

// ── 학습 경로 섹션 대체 ────────────────────────────────────────────────────────
//
// study_path 가 선언된 페이지는 본문에도 같은 순서를 `## 학습 경로` 의 wikilink 목록으로
// 한 번 더 적는다(Obsidian 은 frontmatter 를 본문에 보여주지 않는다). 사이트가 둘을 다
// 출력하면 같은 내용이 두 번 나오므로, 헤딩은 그대로 두고 그 아래 목록만 frontmatter 로
// 렌더한 단계 컴포넌트로 갈아끼운다. 헤딩이 남아 있어 목차·앵커·본문 위치가 유지된다.
//
// 헤딩을 못 찾으면 본문 끝에 붙인다 — frontmatter 만 있고 본문 섹션을 안 쓴 페이지도
// 컴포넌트는 나오게 한다. 코드펜스 안의 `## 학습 경로` 예시는 건드리지 않는다.
// `## 학습 경로` / `## 학습 경로 (Study Path)` 둘 다 받는다. 한글은 \w 가 아니라
// 단어 경계(\b)로 끝을 잡을 수 없어 뒤에 오는 문자로 직접 제한한다.
const STUDY_HEADING_RE = /^##\s+학습\s*경로(?:\s|$)/;

function spliceStudyPath(src, html) {
  const lines = src.split('\n');
  const out = [];
  let inFence = false;
  let fenceTok = '';
  let skipping = false;
  let found = false;

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const tok = fence[1][0];
      if (!inFence) {
        inFence = true;
        fenceTok = tok;
      } else if (tok === fenceTok) {
        inFence = false;
      }
      if (!skipping) out.push(line);
      continue;
    }
    if (inFence) {
      if (!skipping) out.push(line);
      continue;
    }

    if (skipping) {
      if (/^#{1,6}\s/.test(line)) skipping = false;
      else continue;
    }

    if (!found && STUDY_HEADING_RE.test(line)) {
      found = true;
      skipping = true;
      out.push(line, '', html, '');
      continue;
    }
    out.push(line);
  }

  if (!found) out.push('', html, '');
  return out.join('\n');
}

function wikilinkExtension(resolve, broken) {
  return {
    name: 'wikilink',
    level: 'inline',
    start(src) {
      const i = src.indexOf('[[');
      return i < 0 ? undefined : i;
    },
    tokenizer(src) {
      const m = /^\[\[([^\]\n]+)\]\]/.exec(src);
      if (m) return { type: 'wikilink', raw: m[0], target: m[1].trim() };
    },
    renderer(token) {
      const r = resolve(token.target);
      if (r.ok) {
        return `<a class="wikilink" href="${escapeHtml(r.url)}">${escapeHtml(r.display)}</a>`;
      }
      broken.push(token.target);
      return `<span class="wikilink-missing" title="미해석 위키링크">${escapeHtml(
        r.display || token.target
      )}</span>`;
    },
  };
}

// 본문 → { html, toc:[{depth,id,text}], broken:[target,...] }
// studyPath: 학습 경로 단계 컴포넌트 HTML(옵션) — 본문의 `## 학습 경로` 목록을 이걸로 대체.
export function renderMarkdown(body, { resolve, hrefFn, studyPath = '' }) {
  const toc = [];
  const broken = [];
  const slugCount = new Map();

  let pre = transformFigures(protectCurrency(body), hrefFn);
  // figure/통화 전처리 뒤에 끼운다 — 주입한 HTML이 그 변환을 다시 타지 않도록.
  if (studyPath) pre = spliceStudyPath(pre, studyPath);
  const md = new Marked({ gfm: true, breaks: false });

  // 수식 렌더: $…$ (인라인) / $$…$$ (디스플레이) → KaTeX HTML. 잘못된 LaTeX는 빌드를 깨지 않고
  // 에러색으로 렌더(throwOnError:false). nonStandard:true → 닫는 '$' 뒤에 공백/문장부호가 없어도
  // 파싱(한글 조사가 바로 붙는 `$X_t$는`·`$m$은` 패턴이 한국어 본문에 흔함 — 표준 모드는 깨짐).
  md.use(markedKatex({ throwOnError: false, nonStandard: true }));

  md.use({
    extensions: [wikilinkExtension(resolve, broken)],
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const plain = inner.replace(/<[^>]+>/g, '');
        let id = slugify(plain) || `section-${toc.length + 1}`;
        const seen = slugCount.get(id) || 0;
        slugCount.set(id, seen + 1);
        if (seen) id = `${id}-${seen}`;
        if (depth === 2 || depth === 3) toc.push({ depth, id, text: plain });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });

  const html = md.parse(pre);
  return { html, toc, broken };
}
