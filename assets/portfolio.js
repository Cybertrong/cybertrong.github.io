// linh b. — affichage du portfolio (lit PROJECTS dans projects.js)
(function () {
  var lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  var T = {
    en: { all: 'all', soon: 'original visual coming soon', visit: 'visit the site', close: 'close',
          cats: { branding: 'branding', print: 'print', editorial: 'editorial', web: 'web', digital: 'digital', design: 'design' } },
    fr: { all: 'tout', soon: 'visuel original à venir', visit: 'voir le site', close: 'fermer',
          cats: { branding: 'image de marque', print: 'imprimé', editorial: 'édition', web: 'web', digital: 'numérique', design: 'design' } }
  }[lang];

  var grid = document.getElementById('grid');
  var filters = document.getElementById('filters');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function client(p) { return lang === 'fr' && p.clientFr ? p.clientFr : p.client; }

  // filtres
  var cats = ['all'];
  PROJECTS.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
  filters.innerHTML = cats.map(function (c, i) {
    var n = c === 'all' ? PROJECTS.length : PROJECTS.filter(function (p) { return p.cat === c; }).length;
    return '<li><button type="button" data-cat="' + c + '" aria-pressed="' + (i === 0) + '">' +
      esc(c === 'all' ? T.all : T.cats[c]) + '<sup>' + n + '</sup></button></li>';
  }).join('');

  // projets
  grid.innerHTML = PROJECTS.map(function (p, i) {
    var media;
    if (p.site) {
      media = '<div class="work-media"><div class="site-preview"><iframe src="' + esc(p.site) +
        '" title="' + esc(client(p)) + '" loading="lazy" tabindex="-1" aria-hidden="true"></iframe></div></div>';
    } else if (p.img) {
      media = '<button type="button" class="work-media" data-i="' + i + '" aria-label="' + esc(client(p) + ', ' + p.type[lang]) + '">' +
        '<img src="' + esc(p.img) + '" alt="' + esc(client(p) + ' — ' + p.type[lang]) + '" loading="lazy"></button>';
    } else {
      media = '<div class="work-media"><div class="placeholder"><span>' + esc(p.type[lang]) + '</span>' +
        '<strong>' + esc(client(p)) + '</strong><span>' + esc(T.soon) + '</span></div></div>';
    }
    return '<article class="work" data-cat="' + p.cat + '">' +
      media +
      '<div class="work-meta"><h3>' + esc(client(p)) + '</h3><span class="year">' + esc(p.year) + '</span></div>' +
      '<p class="work-sub">' + esc(p.type[lang]) + ' · ' + esc(p.field[lang]) + '</p>' +
      (p.site ? '<a class="work-link" href="' + esc(p.site) + '" target="_blank" rel="noopener">' + esc(T.visit) + ' ↗</a>' : '') +
      '</article>';
  }).join('');

  var bar = document.querySelector('.filter-bar');
  function applyFilter(cat, scroll) {
    if (cats.indexOf(cat) < 0) cat = 'all';
    filters.querySelectorAll('button').forEach(function (x) {
      x.setAttribute('aria-pressed', x.dataset.cat === cat ? 'true' : 'false');
    });
    grid.classList.add('is-switching');
    setTimeout(function () {
      grid.querySelectorAll('.work').forEach(function (w) {
        w.hidden = !(cat === 'all' || w.dataset.cat === cat);
      });
      if (scroll && bar) {
        var section = bar.closest('.pf-body') || bar.parentElement;
        var top = section.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(bar).top) || 0);
        if (window.scrollY > top + 1) window.scrollTo({ top: top, behavior: 'smooth' });
      }
      grid.classList.remove('is-switching');
      if (window.LinhParallax) window.LinhParallax.refresh();
    }, 220);
    try { history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat); } catch (e) {}
  }
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) applyFilter(b.dataset.cat, true);
  });
  if (location.hash) applyFilter(location.hash.slice(1), false);

  // visionneuse
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbTitle = lb.querySelector('h2');
  var lbSub = lb.querySelector('p');
  var lbClose = lb.querySelector('.lightbox-close');
  var lastFocus = null;
  lbClose.textContent = T.close;

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('button.work-media');
    if (!b) return;
    var p = PROJECTS[+b.dataset.i];
    lastFocus = b;
    lbImg.src = p.img;
    lbImg.alt = client(p) + ' — ' + p.type[lang];
    lbTitle.textContent = client(p);
    lbSub.textContent = p.type[lang] + ' · ' + p.field[lang] + ' · ' + p.year;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  });
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox-img')) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
})();
