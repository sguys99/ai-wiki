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
export function renderMarkdown(body, { resolve, hrefFn }) {
  const toc = [];
  const broken = [];
  const slugCount = new Map();

  const pre = transformFigures(protectCurrency(body), hrefFn);
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
