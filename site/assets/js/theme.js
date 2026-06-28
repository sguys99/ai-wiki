// theme.js — light/dark 토글. FOUC 방지 인라인 스크립트(head)가 이미 초기 테마를
// document.documentElement.dataset.theme 에 동기 설정해 둔 상태에서 동작한다.
//
// 동작:
//   - 토글 버튼([data-theme-toggle]) 클릭 → dark↔light 스왑 + localStorage('theme') 저장.
//   - 사용자가 명시 선택하기 전(localStorage 없음)에는 OS prefers-color-scheme 변화를 추종.
//   - 버튼 aria-pressed/아이콘을 현재 테마에 동기화.

(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'theme';

  function current() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function syncButton(btn) {
    var isLight = current() === 'light';
    // 아이콘: 현재 light이면 '달'(다크로 전환), dark이면 '해'(라이트로 전환).
    btn.textContent = isLight ? '☾' : '☀';
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute(
      'title',
      isLight ? '다크 모드로 전환' : '라이트 모드로 전환'
    );
  }

  function apply(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(KEY, theme);
      } catch (e) {
        /* private mode 등 — 무시 */
      }
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(syncButton);
  }

  function init() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach(function (btn) {
      syncButton(btn);
      btn.addEventListener('click', function () {
        apply(current() === 'light' ? 'dark' : 'light', true);
      });
    });

    // 명시 선택이 없을 때만 OS 테마 변화 추종.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        var stored = null;
        try {
          stored = localStorage.getItem(KEY);
        } catch (err) {
          /* 무시 */
        }
        if (!stored) apply(e.matches ? 'dark' : 'light', false);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
