// linh b. — menu plein écran + parallaxe

// ── menu plein écran ───────────────────────────────────
(function () {
  var menu = document.getElementById('menu');
  var burger = document.getElementById('burger');
  var closeB = document.getElementById('menuClose');
  if (!menu || !burger || !closeB) return;

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeB.focus();
  }
  burger.addEventListener('click', function () { setMenu(true); });
  closeB.addEventListener('click', function () { setMenu(false); burger.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  menu.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.getAttribute('aria-current') === 'page') { e.preventDefault(); setMenu(false); burger.focus(); }
  });
})();

// ── hauteur de l'en-tête (pour coller la barre des filtres dessous) ──
(function () {
  var h = document.querySelector('.site-header');
  if (!h) return;
  function set() {
    var sticky = getComputedStyle(h).position === 'sticky';
    document.documentElement.style.setProperty('--header-h', (sticky ? h.offsetHeight : 0) + 'px');
  }
  set();
  window.addEventListener('resize', set);
})();

// ── apparition des titres : lettres une à une ──────────
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.display');
  targets.forEach(function (el) {
    var text = el.textContent;
    el.setAttribute('aria-label', text.replace(/\s+/g, ' ').trim());
    var i = 0;
    var html = '';
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 1 && node.tagName === 'BR') { html += '<br>'; return; }
      var words = (node.textContent || '').split(/(\s+)/);
      words.forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { html += ' '; return; }
        html += '<span class="word" aria-hidden="true">';
        Array.from(w).forEach(function (c) {
          html += '<span class="ch" style="--i:' + (i++) + '">' + c.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>';
        });
        html += '</span>';
      });
    });
    el.innerHTML = html;
    el.classList.add('split');
    var wrap = el.closest('.lockup');
    if (wrap) wrap.classList.add('split');
  });
  document.querySelectorAll('.page-head .eyebrow, .lockup-title').forEach(function (el) {
    el.classList.add('anim-pre');
  });
})();

// ── parallaxe ───────────────────────────────────────────
// [data-parallax="0.2"]  → l'élément glisse plus lentement (ou plus vite si négatif)
// .work-media img        → l'image glisse à l'intérieur de son cadre
window.LinhParallax = (function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var items = [];
  var ticking = false;

  function collect() {
    items = [];
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      items.push({ el: el, speed: parseFloat(el.dataset.parallax) || 0, mode: 'block' });
    });
    document.querySelectorAll('.work:not([hidden]) .work-media:not(.is-flat):not(.is-zoom) img, .work:not([hidden]) .placeholder strong').forEach(function (el) {
      items.push({ el: el, speed: 0.12, mode: 'inner' });
    });
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var mid = vh / 2;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var box = (it.mode === 'inner' ? it.el.parentElement : it.el).getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;
      var offset = (box.top + box.height / 2 - mid) * it.speed;
      if (it.mode === 'inner') {
        // l'image est agrandie de 16 % pour pouvoir glisser sans montrer de bord
        var max = box.height * 0.07;
        offset = Math.max(-max, Math.min(max, offset));
        it.el.style.transform = it.el.tagName === 'IMG'
          ? 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.16)'
          : 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      } else {
        it.el.style.transform = 'translate3d(0,' + (-offset).toFixed(1) + 'px,0)';
      }
    }
  }

  function request() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  function refresh() {
    items.forEach(function (it) { it.el.style.transform = ''; });
    if (reduce.matches) { items = []; return; }
    collect();
    update();
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  reduce.addEventListener && reduce.addEventListener('change', refresh);
  document.addEventListener('DOMContentLoaded', refresh);
  window.addEventListener('load', refresh);

  return { refresh: refresh };
})();

// ── accueil : on essaie de descendre ? les lettres se mélangent et un message apparaît ──
(function () {
  var title = document.querySelector('.lockup-title');
  if (!title) return;
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var MSG = {
    fr: 'clique sur le burger, ici tu ne vas nulle\u00a0part\u00a0:)',
    en: 'click the burger, you’re going nowhere\u00a0here\u00a0:)',
    vi: 'bấm vào nút menu, ở đây bạn chẳng đi đâu\u00a0cả\u00a0:)'
  };
  var original = title.textContent.trim();
  var message = MSG[lang] || MSG.en;
  var GLYPHS = '!<>-_\\/[]{}—=+*^?#%&@ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = null, showing = false, back = null;
  var burger = document.getElementById('burger');
  title.setAttribute('aria-live', 'polite');

  function esc(c) { return c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c; }

  function scramble(to, done) {
    cancelAnimationFrame(raf);
    if (reduce) { title.textContent = to; if (done) done(); return; }
    var from = title.textContent;
    var len = Math.max(from.length, to.length), q = [];
    for (var i = 0; i < len; i++) {
      var start = Math.floor(Math.random() * 18);
      q.push({ from: from[i] || '', to: to[i] || '', start: start, end: start + 10 + Math.floor(Math.random() * 26), ch: '' });
    }
    var frame = 0;
    (function tick() {
      var out = '', complete = 0;
      for (var i = 0; i < q.length; i++) {
        var it = q[i];
        if (frame >= it.end) { complete++; out += esc(it.to); }
        else if (frame >= it.start) {
          if (!it.ch || Math.random() < 0.3) it.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          out += '<span class="scr" style="--r:' + (Math.random() * 30 - 15).toFixed(0) + 'deg">' + esc(it.ch) + '</span>';
        } else out += esc(it.from);
      }
      title.innerHTML = out;
      if (complete === q.length) { title.textContent = to; if (done) done(); return; }
      frame++;
      raf = requestAnimationFrame(tick);
    })();
  }

  function trigger() {
    clearTimeout(back);
    back = setTimeout(function () {
      showing = false;
      title.classList.remove('is-msg');
      if (burger) burger.classList.remove('nudge');
      scramble(original);
    }, 5000);
    if (showing) return;
    showing = true;
    title.classList.add('is-msg');
    if (burger) burger.classList.add('nudge');
    scramble(message);
  }

  window.addEventListener('wheel', function (e) { if (e.deltaY > 0) trigger(); }, { passive: true });
  var ty = null;
  window.addEventListener('touchstart', function (e) { ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', function (e) { if (ty !== null && ty - e.touches[0].clientY > 30) { ty = null; trigger(); } }, { passive: true });
  window.addEventListener('keydown', function (e) {
    if (['ArrowDown', 'PageDown', ' ', 'End'].indexOf(e.key) >= 0) trigger();
  });
})();
