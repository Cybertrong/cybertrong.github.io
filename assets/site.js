// linh b. — menu plein écran + parallaxe

// ── menu plein écran ───────────────────────────────────
(function () {
  var menu = document.getElementById('menu');
  var burger = document.getElementById('burger');
  var closeB = document.getElementById('menuClose');
  if (!menu || !burger || !closeB) return;

  // couleur du menu tirée au hasard parmi les combinaisons de l'accueil (jamais deux fois la même de suite)
  var MENU_P = {
    'blue-cream':  ['#2A58A8', '#ECE7E2', '#FFFFFF'],
    'cream-blue':  ['#ECE7E2', '#2A58A8', '#163A7A'],
    'white-blue':  ['#FFFFFF', '#2A58A8', '#163A7A'],
    'blue-white':  ['#2A58A8', '#FFFFFF', '#ECE7E2'],
    'gold-blue':   ['#E2B04A', '#2A58A8', '#163A7A'],
    'blue-gold':   ['#2A58A8', '#E2B04A', '#FFFFFF'],
    'cream-red':   ['#ECE7E2', '#D35035', '#9E2F1A'],
    'red-cream':   ['#D35035', '#ECE7E2', '#FFFFFF'],
    'cream-ochre': ['#ECE7E2', '#916527', '#5E4015']
  };
  var lastMenu = null;
  function paintMenu() {
    var keys = Object.keys(MENU_P), page = document.documentElement.getAttribute('data-palette'), k;
    do { k = keys[Math.floor(Math.random() * keys.length)]; } while (k === lastMenu || k === page);
    lastMenu = k;
    var c = MENU_P[k];
    menu.style.setProperty('--m-bg', c[0]);
    menu.style.setProperty('--m-fg', c[1]);
    menu.style.setProperty('--m-hover', c[2]);
  }

  function setMenu(open) {
    if (open) paintMenu();
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
  // portfolio : la barre du haut rétrécit quand on descend
  if (!document.querySelector('.filter-bar')) return;
  var compact = false, ticking = false;
  function onScroll() {
    ticking = false;
    var c = window.pageYOffset > 40;
    if (c === compact) return;
    compact = c; h.classList.toggle('compact', c);
    var t0 = performance.now();
    (function follow(now) { set(); if (now - t0 < 600) requestAnimationFrame(follow); })(t0);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
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
    }, 2200);
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

// ── accueil : des dizaines de carrés arrivent des bords de l'écran et forment « Linh » ──
(function () {
  var root = document.documentElement;
  var name = document.querySelector('.lockup-name');
  if (!name || !root.classList.contains('intro')) return;
  var done = false;
  function finish() { if (done) return; done = true; root.classList.add('intro-done'); }
  setTimeout(finish, 6000);   // filet de sécurité

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    requestAnimationFrame(start);
  });

  function start() {
    var cs = getComputedStyle(name);
    var fs = parseFloat(cs.fontSize);
    var text = name.textContent.trim();
    var r = name.getBoundingClientRect();
    if (!r.width) { finish(); return; }
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var vw = window.innerWidth, vh = window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var font = (cs.fontStyle || 'normal') + ' ' + (cs.fontWeight || 400) + ' ' + fs + 'px ' + cs.fontFamily;
    var angle = -6 * Math.PI / 180;
    var m = new DOMMatrix(cs.transform === 'none' ? undefined : cs.transform);
    if (cs.transform && cs.transform !== 'none') angle = Math.atan2(m.b, m.a);

    // 1. le mot dessiné en cachette, puis découpé en petits carrés
    var off = document.createElement('canvas');
    off.width = vw; off.height = vh;
    var o = off.getContext('2d');
    o.font = font; o.textAlign = 'center'; o.textBaseline = 'alphabetic';
    var mt = o.measureText(text);
    var asc = mt.fontBoundingBoxAscent || fs * .8, desc = mt.fontBoundingBoxDescent || fs * .25;
    o.translate(cx, cy); o.rotate(angle);
    o.fillStyle = '#000';
    o.fillText(text, 0, (asc - desc) / 2);
    var cell = Math.max(5, Math.round(fs / 34));
    var data = o.getImageData(0, 0, vw, vh).data;
    var pts = [];
    for (var y = Math.floor(cell / 2); y < vh; y += cell) {
      for (var x = Math.floor(cell / 2); x < vw; x += cell) {
        if (data[(y * vw + x) * 4 + 3] > 110) pts.push({ tx: x - cell / 2, ty: y - cell / 2 });
      }
    }
    if (!pts.length) { finish(); return; }

    // 2. point de départ : un bord de l'écran au hasard
    pts.forEach(function (p) {
      var side = Math.floor(Math.random() * 4), pad = 60;
      if (side === 0) { p.sx = Math.random() * vw; p.sy = -pad - Math.random() * 200; }
      else if (side === 1) { p.sx = vw + pad + Math.random() * 200; p.sy = Math.random() * vh; }
      else if (side === 2) { p.sx = Math.random() * vw; p.sy = vh + pad + Math.random() * 200; }
      else { p.sx = -pad - Math.random() * 200; p.sy = Math.random() * vh; }
      p.rot = (Math.random() - .5) * Math.PI * 3;
      p.delay = Math.random() * 650;
      p.dur = 1100 + Math.random() * 900;
      p.size = cell * (1.4 + Math.random() * 1.6);
    });

    var cv = document.createElement('canvas');
    cv.className = 'intro-canvas'; cv.setAttribute('aria-hidden', 'true');
    cv.width = vw * dpr; cv.height = vh * dpr;
    document.body.appendChild(cv);
    var c = cv.getContext('2d'); c.scale(dpr, dpr);
    var color = cs.color;
    var t0 = performance.now(), end = 0, fading = false;
    pts.forEach(function (p) { end = Math.max(end, p.delay + p.dur); });
    function ease(t) { return 1 - Math.pow(1 - t, 4); }

    function frame(now) {
      var el = now - t0;
      c.clearRect(0, 0, vw, vh);
      c.fillStyle = color;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], t = Math.min(1, Math.max(0, (el - p.delay) / p.dur));
        if (t <= 0) continue;
        var e = ease(t);
        var x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
        var s = p.size + (cell + .6 - p.size) * e;
        var a = p.rot * (1 - e);
        // une fois posé, le carré rapetisse et s'efface doucement : effet fondu
        var u = Math.min(1, Math.max(0, (el - p.delay - p.dur) / 1100));
        var us = u * u * (3 - 2 * u);
        s *= 1 - .7 * us;
        c.globalAlpha = Math.min(1, t * 3) * (1 - .55 * us);
        c.save(); c.translate(x + cell / 2, y + cell / 2); c.rotate(a + angle * e);
        c.fillRect(-s / 2, -s / 2, s, s); c.restore();
      }
      c.globalAlpha = 1;
      // 3. fondu enchaîné : le vrai mot apparaît pendant que les derniers carrés se posent
      if (!fading && el > end - 700) {
        fading = true;
        finish();
        cv.classList.add('fade');
        setTimeout(function () { cv.remove(); }, 2400);
      }
      if (el < end + 1300) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();

// ── portfolio et à propos : flèche pour remonter en haut ──
(function () {
  if (!document.querySelector('.filter-bar, .about-body')) return;
  var l = (document.documentElement.lang || 'fr').slice(0, 2);
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'to-top';
  b.setAttribute('aria-label', { fr: 'Remonter en haut de la page', en: 'Back to top', vi: 'Lên đầu trang' }[l] || 'Back to top');
  b.innerHTML = '<svg viewBox="0 0 16 40" aria-hidden="true"><path d="M8 39V2M1 9l7-7 7 7"/></svg>';
  document.body.appendChild(b);
  var t = false;
  function upd() { t = false; b.classList.toggle('show', window.pageYOffset > window.innerHeight * .6); }
  window.addEventListener('scroll', function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
  b.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();

// ── accueil : « designer graphique » ajusté à la largeur de « Linh » ──
(function () {
  var name = document.querySelector('.lockup-name'), title = document.querySelector('.lockup-title');
  if (!name || !title) return;
  function fit() {
    if (title.classList.contains('is-msg') || title.querySelector('.scr')) return;
    title.style.removeProperty('--fit-size');
    var lw = name.offsetWidth * .96, tw = title.scrollWidth;
    if (tw > lw && lw > 0) title.style.setProperty('--fit-size', (parseFloat(getComputedStyle(title).fontSize) * lw / tw).toFixed(1) + 'px');
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(fit);
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', fit);
  window.addEventListener('load', fit);
  [400, 1200, 3500].forEach(function (t) { setTimeout(fit, t); });
  window.addEventListener('resize', fit);
  new MutationObserver(function () { if (!title.classList.contains('is-msg')) requestAnimationFrame(fit); })
    .observe(title, { attributes: true, attributeFilter: ['class'], childList: true });
})();
