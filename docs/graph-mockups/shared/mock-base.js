// mock-base.js: 시안 공통 헬퍼. 배치와 그리기는 각 시안이 맡는다.
//
//   window.Mock.CATEGORIES      카테고리 메타 (id, ko, en, token, domain). 범례 순서 = 배열 순서
//   window.Mock.cat(id)         id 로 메타 찾기 (모르는 id 는 etc)
//   window.Mock.readTokens()    CSS 토큰을 읽어 캔버스용 색과 알파를 돌려준다
//   window.Mock.onTheme(cb)     테마가 바뀔 때마다 cb(readTokens()) 호출
//   window.Mock.reduceMotion()  prefers-reduced-motion 여부
//
// 테마 토글은 사이트 theme.js 와 같은 방식이다. <html data-theme> 를 바꾸고 localStorage('theme')
// 에 저장한다. 초기 테마는 HTML head 의 인라인 스크립트가 먼저 정한다 (_template.html).

(function () {
  'use strict';
  var root = document.documentElement;

  // 노드 수가 많은 순. 범례와 칩이 이 순서를 따른다
  var CATEGORIES = [
    { id: 'physical-ai', ko: '피지컬 AI', en: 'Physical AI', token: '--cat-physical-ai', domain: 'physical' },
    { id: 'agents', ko: '에이전트', en: 'Agents', token: '--cat-agents', domain: 'core' },
    { id: 'applications', ko: '응용', en: 'Applications', token: '--cat-applications', domain: 'core' },
    { id: 'database', ko: '데이터베이스', en: 'Database', token: '--cat-database', domain: 'core' },
    { id: 'llms', ko: 'LLM', en: 'LLMs', token: '--cat-llms', domain: 'core' },
    { id: 'overviews', ko: '개요', en: 'Overviews', token: '--cat-overviews', domain: 'core' },
    { id: 'evaluations', ko: '평가', en: 'Evaluations', token: '--cat-evaluations', domain: 'core' },
    { id: 'etc', ko: '기타', en: 'Etc', token: '--cat-etc', domain: 'core' },
  ];
  var byId = {};
  CATEGORIES.forEach(function (c) { byId[c.id] = c; });

  function cat(id) {
    return byId[id] || byId.etc;
  }

  function readTokens() {
    var cs = getComputedStyle(root);
    var get = function (n) { return cs.getPropertyValue(n).trim(); };
    var num = function (n) { return parseFloat(get(n)); };
    var cats = {};
    CATEGORIES.forEach(function (c) { cats[c.id] = get(c.token); });
    return {
      theme: root.dataset.theme === 'light' ? 'light' : 'dark',
      bg: get('--graph-bg'),
      surface: get('--surface'),
      text: get('--text'),
      muted: get('--muted'),
      faint: get('--faint'),
      hairline: get('--hairline'),
      signal: get('--signal'),
      physical: get('--signal-physical'),
      cat: cats, // { 'physical-ai': '#f0a868', ... }
      edge: get('--graph-edge'),
      edgeAlpha: num('--graph-edge-alpha'),
      edgeHiAlpha: num('--graph-edge-hi-alpha'),
      dimAlpha: num('--graph-dim-alpha'),
      label: get('--graph-label'),
      labelMuted: get('--graph-label-muted'),
      labelHalo: get('--graph-label-halo'),
      glowAlpha: num('--graph-glow-alpha'),
      ring: get('--graph-ring'),
      fontDisplay: get('--font-display'),
      fontBody: get('--font-body'),
      fontMono: get('--font-mono'),
    };
  }

  var listeners = [];
  function onTheme(cb) {
    listeners.push(cb);
  }

  function syncButton(btn) {
    var isLight = root.dataset.theme === 'light';
    btn.textContent = isLight ? '☾' : '☀';
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('title', isLight ? '다크 모드로 전환' : '라이트 모드로 전환');
  }

  function apply(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) { /* file:// 사설 모드 등 */ }
    document.querySelectorAll('[data-theme-toggle]').forEach(syncButton);
    var t = readTokens();
    listeners.forEach(function (cb) { cb(t); });
  }

  function reduceMotion() {
    return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function init() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      syncButton(btn);
      btn.addEventListener('click', function () {
        apply(root.dataset.theme === 'light' ? 'dark' : 'light');
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Mock = {
    CATEGORIES: CATEGORIES,
    cat: cat,
    readTokens: readTokens,
    onTheme: onTheme,
    setTheme: apply,
    reduceMotion: reduceMotion,
  };
})();
