// linh b. — affichage du portfolio (lit PROJECTS dans projects.js)
// Les visuels d'un même client dans une même catégorie sont regroupés en un seul projet,
// présenté par catégorie. Un clic ouvre la visionneuse, avec flèches s'il y a plusieurs visuels.
(function () {
  var lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  var T = {
    en: { all: 'all', soon: 'original visual coming soon', visit: 'visit the site', close: 'close',
          prev: 'Previous', next: 'Next', visuals: 'visuals', project: 'project', projects: 'projects',
          cats: { branding: 'branding', print: 'print', editorial: 'editorial', web: 'web', digital: 'digital', design: 'design' } },
    fr: { all: 'tout', soon: 'visuel original à venir', visit: 'voir le site', close: 'fermer',
          prev: 'Précédent', next: 'Suivant', visuals: 'visuels', project: 'projet', projects: 'projets',
          cats: { branding: 'image de marque', print: 'imprimé', editorial: 'édition', web: 'web', digital: 'numérique', design: 'design' } }
  }[lang];

  var grid = document.getElementById('grid');
  var filters = document.getElementById('filters');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clientOf(p) { return lang === 'fr' && p.clientFr ? p.clientFr : p.client; }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  // ── regroupement : un projet par client et par catégorie ──
  var order = [];
  var groups = {};
  PROJECTS.forEach(function (p) {
    var key = p.cat + '|' + p.client + '|' + (p.site || '');
    if (!groups[key]) {
      groups[key] = { cat: p.cat, client: clientOf(p), site: p.site, items: [] };
      order.push(key);
    }
    groups[key].items.push(p);
  });
  var cats = [];
  order.forEach(function (k) { if (cats.indexOf(groups[k].cat) < 0) cats.push(groups[k].cat); });
  var byCat = {};
  cats.forEach(function (c) { byCat[c] = order.map(function (k) { return groups[k]; }).filter(function (g) { return g.cat === c; }); });

  // ── filtres ──
  var total = order.length;
  filters.innerHTML = ['all'].concat(cats).map(function (c, i) {
    var n = c === 'all' ? total : byCat[c].length;
    return '<li><button type="button" data-cat="' + c + '" aria-pressed="' + (i === 0) + '">' +
      esc(c === 'all' ? T.all : T.cats[c]) + '<sup>' + n + '</sup></button></li>';
  }).join('');

  // ── cartes ──
  var all = [];
  function card(g) {
    var idx = all.push(g) - 1;
    var first = g.items[0];
    var typeList = uniq(g.items.map(function (p) { return p.type[lang]; }));
    var types = typeList.length > 2 ? first.field[lang] : typeList.join(' · ');
    var years = uniq(g.items.map(function (p) { return p.year; })).sort().join(' — ');
    var n = g.items.filter(function (p) { return p.img; }).length;
    var media;
    if (g.site) {
      media = '<div class="work-media is-site"><div class="site-preview"><iframe src="' + esc(g.site) +
        '" title="' + esc(g.client) + '" loading="lazy" tabindex="-1" aria-hidden="true"></iframe></div></div>';
    } else if (first.img) {
      media = '<button type="button" class="work-media" data-g="' + idx + '" aria-label="' + esc(g.client + ', ' + types) + '">' +
        '<img src="' + esc(first.img) + '" alt="' + esc(g.client + ' — ' + first.type[lang]) + '" loading="lazy">' +
        (n > 1 ? '<span class="count">' + n + ' ' + esc(T.visuals) + '</span>' : '') + '</button>';
    } else {
      media = '<div class="work-media"><div class="placeholder"><strong>' + esc(g.client) + '</strong><span>' + esc(T.soon) + '</span></div></div>';
    }
    return '<article class="work">' + media +
      '<div class="work-meta"><h3>' + esc(g.client) + '</h3><span class="year">' + esc(years) + '</span></div>' +
      '<p class="work-sub">' + esc(types) + '</p>' +
      (g.site ? '<a class="work-link" href="' + esc(g.site) + '" target="_blank" rel="noopener">' + esc(T.visit) + ' ↗</a>' : '') +
      '</article>';
  }
  grid.innerHTML = cats.map(function (c) {
    var list = byCat[c];
    return '<section class="cat-section" data-cat="' + c + '" aria-labelledby="cat-' + c + '">' +
      '<header class="cat-head"><h2 id="cat-' + c + '">' + esc(T.cats[c]) + '</h2>' +
      '<span>' + list.length + ' ' + esc(list.length > 1 ? T.projects : T.project) + '</span></header>' +
      '<div class="cat-grid">' + list.map(card).join('') + '</div></section>';
  }).join('');

  // ── filtrage ──
  var bar = document.querySelector('.filter-bar');
  function applyFilter(cat, scroll) {
    if (cat !== 'all' && cats.indexOf(cat) < 0) cat = 'all';
    filters.querySelectorAll('button').forEach(function (x) {
      x.setAttribute('aria-pressed', x.dataset.cat === cat ? 'true' : 'false');
    });
    grid.classList.add('is-switching');
    setTimeout(function () {
      grid.querySelectorAll('.cat-section').forEach(function (s) {
        s.hidden = !(cat === 'all' || s.dataset.cat === cat);
      });
      grid.classList.toggle('single', cat !== 'all');
      if (scroll && bar) {
        var section = bar.closest('.pf-body') || bar.parentElement;
        var top = section.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(bar).top) || 0);
        if (window.scrollY > top + 1) window.scrollTo({ top: top, behavior: 'smooth' });
      }
      grid.classList.remove('is-switching');
      setupReveal();
      if (window.LinhParallax) window.LinhParallax.refresh();
    }, 220);
    try { history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat); } catch (e) {}
  }
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) applyFilter(b.dataset.cat, true);
  });
  if (location.hash) applyFilter(location.hash.slice(1), false);


  // ── apparition des rangées : gauche → droite, puis droite → gauche, en alternance ──
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = ('IntersectionObserver' in window && !reduceMotion) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }) : null;

  function setupReveal() {
    if (!io) return;
    io.disconnect();
    var cards = Array.prototype.filter.call(grid.querySelectorAll('.work'), function (c) { return c.offsetParent !== null; });
    var rows = [], lastTop = null;
    cards.forEach(function (c) {
      var top = Math.round(c.getBoundingClientRect().top + window.scrollY);
      if (lastTop === null || Math.abs(top - lastTop) > 4) { rows.push([]); lastTop = top; }
      rows[rows.length - 1].push(c);
    });
    rows.forEach(function (row, r) {
      var fromRight = r % 2 === 1;
      row.forEach(function (c, k) {
        var order = fromRight ? row.length - 1 - k : k;
        c.classList.add('reveal');
        c.classList.remove('in');
        c.dataset.dir = fromRight ? 'right' : 'left';
        c.style.setProperty('--d', (order * 0.12) + 's');
        io.observe(c);
      });
    });
  }
  setupReveal();
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () {
    grid.querySelectorAll('.work.in').forEach(function (c) { c.classList.add('keep'); });
    setupReveal();
    grid.querySelectorAll('.work.keep').forEach(function (c) { c.classList.add('in'); c.classList.remove('keep'); });
  }, 200); });

  // ── visionneuse avec flèches ──
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbTitle = lb.querySelector('h2');
  var lbSub = lb.querySelector('p');
  var lbClose = lb.querySelector('.lightbox-close');
  var stage = lb.querySelector('.lightbox-img');
  lbClose.textContent = T.close;

  var prev = document.createElement('button');
  prev.type = 'button'; prev.className = 'lb-nav lb-prev'; prev.setAttribute('aria-label', T.prev);
  prev.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg>';
  var next = document.createElement('button');
  next.type = 'button'; next.className = 'lb-nav lb-next'; next.setAttribute('aria-label', T.next);
  next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>';
  var counter = document.createElement('span');
  counter.className = 'lb-count';
  stage.appendChild(prev); stage.appendChild(next); stage.appendChild(counter);

  var cur = null, pos = 0, lastFocus = null;
  function show() {
    var imgs = cur.items.filter(function (p) { return p.img; });
    var p = imgs[pos];
    lbImg.src = p.img;
    lbImg.alt = cur.client + ' — ' + p.type[lang];
    lbTitle.textContent = cur.client;
    lbSub.textContent = p.type[lang] + ' · ' + p.field[lang] + ' · ' + p.year;
    var many = imgs.length > 1;
    prev.hidden = next.hidden = counter.hidden = !many;
    counter.textContent = (pos + 1) + ' / ' + imgs.length;
  }
  function step(d) {
    var n = cur.items.filter(function (p) { return p.img; }).length;
    if (n < 2) return;
    pos = (pos + d + n) % n;
    show();
  }
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('button.work-media');
    if (!b) return;
    cur = all[+b.dataset.g]; pos = 0; lastFocus = b;
    show();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  });
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  prev.addEventListener('click', function () { step(-1); });
  next.addEventListener('click', function () { step(1); });
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  // balayage au doigt sur mobile
  var sx = null;
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  });
})();
