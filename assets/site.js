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
  var targets = document.querySelectorAll('.lockup-name, .display');
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
    document.querySelectorAll('.work:not([hidden]) .work-media img, .work:not([hidden]) .placeholder strong').forEach(function (el) {
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
