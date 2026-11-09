// linh b. — affichage du portfolio (lit PROJECTS dans projects.js)
// Les visuels d'un même client dans une même catégorie sont regroupés en un seul projet,
// présenté par catégorie. Un clic ouvre la visionneuse, avec flèches s'il y a plusieurs visuels.
(function () {
  var LITE = window.matchMedia && matchMedia('(max-width: 760px), (hover: none), (pointer: coarse)').matches;
  var docLang = document.documentElement.lang;
  var lang = docLang === 'fr' ? 'fr' : docLang === 'vi' ? 'vi' : 'en';
  // traductions vietnamiennes des types de projet et des domaines (à partir de l'anglais)
  var VI = {
    'marketing item': 'vật phẩm quảng bá', 'point-of-sale display': 'kệ trưng bày', 'trade show booth': 'gian hàng triển lãm',
    'logo': 'logo', 'identity': 'nhận diện thương hiệu', 'flyer': 'tờ rơi', 'business card': 'danh thiếp',
    'invitation': 'thiệp mời', 'brochure': 'brochure', 'series poster': 'áp phích phim', 'series flyer': 'tờ rơi phim',
    'series artwork': 'hình ảnh phim', 'game cover': 'bìa trò chơi', 'brochure cover': 'bìa brochure',
    'annual report': 'báo cáo thường niên', 'cover illustration': 'minh họa bìa sách', 'poster': 'áp phích',
    'product catalog': 'catalogue sản phẩm', 'tri-fold brochure': 'tờ gấp ba', 'Horticulture': 'Làm vườn', 'information sheet': 'tờ thông tin', 'website': 'trang web', 'illustration': 'minh họa',
    'social media': 'mạng xã hội', 'presentation': 'bài thuyết trình',
    'Music': 'Âm nhạc', 'Agriculture': 'Nông nghiệp', 'Pharmaceutical': 'Dược phẩm', 'Software': 'Phần mềm',
    'Designer': 'Nhà thiết kế', 'Application': 'Ứng dụng', 'Grocery': 'Cửa hàng thực phẩm',
    'Ice cream restaurant': 'Tiệm kem', 'Rugby club': 'Câu lạc bộ bóng bầu dục', 'Events': 'Sự kiện',
    'Non-profit': 'Phi lợi nhuận', 'Developer': 'Chủ đầu tư bất động sản', 'Distributor': 'Nhà phân phối',
    'Management': 'Quản lý', 'Television series': 'Phim truyền hình', 'Design': 'Thiết kế', 'Publisher': 'Nhà xuất bản',
    'Photography': 'Nhiếp ảnh', 'Furniture': 'Nội thất', 'Theatre company': 'Đoàn kịch', 'gate-fold brochure': 'tờ gấp cửa sổ', 'Hypnotherapy': 'Liệu pháp thôi miên', 'Illustration': 'Minh họa',
    'Online sales': 'Bán hàng trực tuyến', 'Finance': 'Tài chính', 'Branding': 'Thương hiệu',
    'Private': 'Khách hàng riêng'
  };
  function tr(o) { return lang === 'vi' ? (VI[o.en] || o.en) : o[lang]; }
  var T = {
    en: { all: 'all', soon: 'original visual coming soon', visit: 'visit the site', more: 'view', upcoming: 'coming soon', close: 'close',
          prev: 'Previous', next: 'Next', visuals: 'visuals', project: 'project', projects: 'projects',
          cats: { branding: 'branding', print: 'print', editorial: 'editorial', web: 'web', digital: 'digital', design: 'presentation' } },
    fr: { all: 'tout', soon: 'visuel original à venir', visit: 'voir le site', more: 'voir', upcoming: 'à venir', close: 'fermer',
          prev: 'Précédent', next: 'Suivant', visuals: 'visuels', project: 'projet', projects: 'projets',
          cats: { branding: 'image de marque', print: 'imprimé', editorial: 'édition', web: 'web', digital: 'numérique', design: 'présentation' } },
    vi: { all: 'tất cả', soon: 'hình ảnh gốc sắp có', visit: 'xem trang web', more: 'xem', upcoming: 'sắp ra mắt', close: 'đóng',
          prev: 'Trước', next: 'Tiếp', visuals: 'hình', project: 'dự án', projects: 'dự án',
          cats: { branding: 'thương hiệu', print: 'in ấn', editorial: 'xuất bản', web: 'web', digital: 'kỹ thuật số', design: 'thuyết trình' } }
  }[lang];

  var grid = document.getElementById('grid');
  var filters = document.getElementById('filters');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clientOf(p) {
    if (lang === 'fr' && p.clientFr) return p.clientFr;
    if (lang === 'vi' && VI[p.client]) return VI[p.client];
    return p.client;
  }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  // ── regroupement : un projet par client et par catégorie ──
  var order = [];
  var groups = {};
  PROJECTS.forEach(function (p) {
    var key = p.cat + '|' + p.client + '|' + (p.site || '') + '|' + (p.group || '');
    if (!groups[key]) {
      groups[key] = { cat: p.cat, client: clientOf(p), site: p.site, items: [] };
      order.push(key);
    }
    groups[key].items.push(p);
  });
  var cats = [];
  order.forEach(function (k) { if (cats.indexOf(groups[k].cat) < 0) cats.push(groups[k].cat); });
  var CAT_ORDER = ['branding', 'print', 'editorial', 'web', 'digital', 'design'];
  cats.sort(function (a, b) { return (CAT_ORDER.indexOf(a) + 99) % 99 - (CAT_ORDER.indexOf(b) + 99) % 99; });
  var byCat = {};
  // dans chaque section : projets par ordre alphabétique (sans tenir compte des majuscules ni des accents)
  var byName = function (a, b) { return a.client.localeCompare(b.client, document.documentElement.lang || 'fr', { sensitivity: 'base' }); };
  cats.forEach(function (c) { byCat[c] = order.map(function (k) { return groups[k]; }).filter(function (g) { return g.cat === c; }).sort(byName); });

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
    var typeList = uniq(g.items.map(function (p) { return tr(p.type); }));
    var types = typeList.length > 2 ? tr(first.field) : typeList.join(' · ');
    var years = uniq(g.items.map(function (p) { return p.year; })).sort().join(' — ');
    var n = g.items.filter(function (p) { return p.img; }).length;
    var media;
    if (g.site) {
      // sur téléphone : capture fixe (cinq sites en direct font planter Safari iOS, qui recharge la page)
      var shot = (g.site.match(/WEB\/([^\/]+)\//) || [])[1];
      if (LITE && shot) {
        media = '<div class="work-media is-site"><div class="site-preview"><img src="images/WEB/apercus/' + esc(shot) + '.jpg?v=1" alt="' + esc(g.client) + '" loading="lazy" decoding="async"></div></div>';
      } else {
        media = '<div class="work-media is-site"><div class="site-preview"><iframe src="' + esc(g.site + (g.site.indexOf('?') < 0 ? '?apercu=2' : '')) +
          '" title="' + esc(g.client) + '" loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe></div></div>';
      }
    } else if (first.img) {
      var flat = first.bg ? ' is-flat" style="background:' + esc(first.bg) : '';
            // tous les projets : gros plan sur un détail ; l'image entière s'ouvre au clic
      var isLogo = g.cat === 'branding' && first.type.en === 'logo';
      var zoom = ' is-zoom';
      var imgStyle = ' style="--zoom:' + (first.zoom || (isLogo ? 3.4 : 2.6)) + ';--focus:' + esc(first.focus || '50% 50%') + '"';
      media = '<button type="button" class="work-media' + zoom + flat + '" data-g="' + idx + '" aria-label="' + esc(g.client + ', ' + types) + '">' +
        '<img src="' + esc(first.img) + '" alt="' + esc(g.client + ' — ' + tr(first.type) + ' (' + tr(first.field) + '), linh b.') + '" loading="lazy"' + imgStyle + '><span class="frame-line" aria-hidden="true"></span>' +
        (n > 1 ? '<span class="count">' + n + ' ' + esc(T.visuals) + '</span>' : '') + '</button>';
    } else {
      media = '<div class="work-media"><div class="placeholder"><strong>' + esc(g.client) + '</strong><span>' + esc(T.soon) + '</span></div></div>';
    }
    // carte crème qui apparaît sur la vignette (inspirée des grilles éditoriales)
    var field = tr(first.field);
    var sub = types + (field && types.indexOf(field) < 0 ? ' · ' + field : '');
    var more = g.site
      ? '<a class="tc-more" href="' + esc(g.site) + '" target="_blank" rel="noopener">' + esc(T.visit) + ' ↗</a>'
      : '<span class="tc-more">' + (n > 1 ? n + ' ' + esc(T.visuals) : esc(T.more)) + ' +</span>';
    return '<article class="work tile">' + media +
      '<div class="tile-card"><h3 class="tc-title">' + esc(g.client) + '</h3>' +
      '<p class="tc-sub">' + esc(sub) + '</p>' +
      (first.desc ? '<div class="tc-desc"><div><p>' + esc(lang === 'vi' ? (first.desc.vi || first.desc.en) : first.desc[lang]) + '</p></div></div>' : '') +
      '<div class="tc-foot">' + more + '</div></div>' +
      '</article>';
  }
  grid.innerHTML = cats.map(function (c) {
    var list = byCat[c];
    return '<section class="cat-section" data-cat="' + c + '" aria-labelledby="cat-' + c + '">' +
      '<header class="cat-head"><h2 id="cat-' + c + '">' + esc(T.cats[c]) + '</h2>' +
      '<span>' + list.length + ' ' + esc(list.length > 1 ? T.projects : T.project) + '</span></header>' +
      '<div class="cat-grid">' + list.map(card).join('') + '</div></section>';
  }).join('');

  // ── clients : logos en gris, par ordre alphabétique, à la fin de la page ──
  var CLIENTS = [
    ['Analekta', 'analekta', 'https://www.analekta.com/'], ['Convatec', 'convatec', 'https://www.convatec.com/'], ['Développement Signature', 'signature', 'https://developpementsignature.com/en/'],
    ['Éditions de la Bagnole', 'bagnole', 'https://editionslabagnole.groupelivre.com/'], ['Green Mountain', 'green-mountain', 'https://www.greenmountaincoffee.com/'], ['Hussard', 'hussard'],
    ['Les récoltes', 'recoltes', 'images/WEB/lesrecoltes/index.html'], ['Panza', 'panza', 'https://panza.ca/'], ['Tomaté', 'tomate', 'https://tomate.ca/'], ['Keurig', 'keurig', 'https://www.keurig.ca/']
  ].sort(function (a, b) { return a[0].localeCompare(b[0], lang, { sensitivity: 'base' }); });
  var cTitle = { fr: 'clients', en: 'clients', vi: 'khách hàng' }[lang];
  grid.insertAdjacentHTML('afterend',
    '<section class="cat-section clients-section" aria-labelledby="cat-clients">' +
    '<header class="cat-head"><h2 id="cat-clients">' + esc(cTitle) + '</h2></header>' +
    '<ul class="client-logos">' + CLIENTS.map(function (c) {
      var img = '<img src="images/CLIENTS/' + c[1] + '.png?v=1" alt="' + esc(c[0]) + '" loading="lazy" decoding="async">';
      // le logo mène au site de la compagnie, dans un nouvel onglet
      return '<li class="cl-' + c[1] + '">' + (c[2] ? '<a href="' + esc(c[2]) + '" target="_blank" rel="noopener">' + img + '</a>' : img) + '</li>';
    }).join('') + '</ul></section>');
  var clientsSec = grid.nextElementSibling;
  filters.insertAdjacentHTML('beforeend', '<li><button type="button" data-cat="clients" aria-pressed="false">' +
    esc(cTitle) + '<sup>' + CLIENTS.length + '</sup></button></li>');

  // ── filtrage ──
  var bar = document.querySelector('.filter-bar');
  function applyFilter(cat, scroll) {
    if (cat !== 'all' && cat !== 'clients' && cats.indexOf(cat) < 0) cat = 'all';
    filters.querySelectorAll('button').forEach(function (x) {
      x.setAttribute('aria-pressed', x.dataset.cat === cat ? 'true' : 'false');
    });
    grid.classList.add('is-switching');
    setTimeout(function () {
      grid.querySelectorAll('.cat-section').forEach(function (s) {
        s.hidden = !(cat === 'all' || s.dataset.cat === cat);
      });
      grid.classList.toggle('single', cat !== 'all');
      clientsSec.hidden = !(cat === 'all' || cat === 'clients');
      clientsSec.classList.toggle('is-alone', cat === 'clients');
      grid.classList.toggle('is-empty', cat === 'clients');
      // dès qu'on choisit un filtre, le grand « portfolio » disparaît : la page commence à la barre
      if (scroll) {
        document.body.classList.add('pf-filtered');
        window.scrollTo(0, 0);
        if (window.LinhParallax) window.LinhParallax.refresh();
      } else if (scroll && bar) {
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

  // ── en vue « tout » : la catégorie de la section visible s'allume dans la barre ──
  var spyTick = false;
  function spy() {
    spyTick = false;
    var line = (bar ? bar.getBoundingClientRect().bottom : 0) + window.innerHeight * 0.25, current = null;
    grid.querySelectorAll('.cat-section:not([hidden])').forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s.dataset.cat;
    });
    if (!clientsSec.hidden && clientsSec.getBoundingClientRect().top <= line) current = 'clients';
    var allView = !grid.classList.contains('single');
    filters.querySelectorAll('button').forEach(function (x) {
      x.classList.toggle('is-here', allView && x.dataset.cat === current);
    });
  }
  window.addEventListener('scroll', function () { if (!spyTick) { spyTick = true; requestAnimationFrame(spy); } }, { passive: true });
  filters.addEventListener('click', function () { setTimeout(spy, 300); });
  spy();


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
  // chaque section : des cases vides complètent la dernière rangée
  function fillGaps() {
    grid.querySelectorAll('.tile-filler').forEach(function (f) { f.remove(); });
    return;   // plus de cases « à venir » : les rangées incomplètes sont centrées en CSS
    grid.querySelectorAll('.tile-filler').forEach(function (f) { f.remove(); });
    grid.querySelectorAll('.cat-section:not([hidden]):not([data-cat="web"]) .cat-grid').forEach(function (g) {
    var cols = getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length;
    var n = g.querySelectorAll('.work:not(.tile-filler)').length, missing = (cols - n % cols) % cols;
    for (var i = 0; i < missing; i++) {
      var f = document.createElement('div');
      f.className = 'work tile tile-filler'; f.setAttribute('aria-hidden', 'true');
      f.innerHTML = '<div class="work-media"><span class="filler-txt">' + esc(T.upcoming) + '</span><span class="frame-line"></span></div>';
      g.appendChild(f);
    }
    });
  }
  fillGaps();
  window.addEventListener('resize', fillGaps);
  filters.addEventListener('click', function () { setTimeout(fillGaps, 260); });
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
  var lbLink = document.createElement('a');
  lbLink.className = 'lb-link';
  lbLink.target = '_blank';
  lbLink.rel = 'noopener';
  lbSub.parentNode.appendChild(lbLink);
  var lbClose = lb.querySelector('.lightbox-close');
  var stage = lb.querySelector('.lightbox-img');
  lbClose.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8v8.4"/><path d="M7.2 6.2a8 8 0 1 0 9.6 0"/></svg>';
  lbClose.setAttribute('aria-label', T.close);

  var prev = document.createElement('button');
  prev.type = 'button'; prev.className = 'lb-nav lb-prev'; prev.setAttribute('aria-label', T.prev);
  prev.innerHTML = '<svg viewBox="0 0 40 16" aria-hidden="true"><path d="M39 8H2M9 1L2 8l7 7"/></svg>';
  var next = document.createElement('button');
  next.type = 'button'; next.className = 'lb-nav lb-next'; next.setAttribute('aria-label', T.next);
  next.innerHTML = '<svg viewBox="0 0 40 16" aria-hidden="true"><path d="M1 8h37M31 1l7 7-7 7"/></svg>';
  var counter = document.createElement('span');
  counter.className = 'lb-count';
  stage.appendChild(prev); stage.appendChild(next); stage.appendChild(counter);

  // Diaporama : toutes les images de la même section, dans l'ordre de la page
  // vague bleue qui traverse l'écran à l'ouverture d'un projet
  var wave = document.createElement('div');
  wave.className = 'lb-wave'; wave.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wave);
  function playWave() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // couleur au hasard parmi celles de l'accueil, jamais deux fois la même de suite
    var C = ['#2A58A8', '#E2B04A', '#D35035', '#916527', '#ECE7E2'], c;
    do { c = C[Math.floor(Math.random() * C.length)]; } while (c === wave.dataset.c);
    wave.dataset.c = c; wave.style.setProperty('--wave', c);
    wave.classList.remove('go'); void wave.offsetWidth; wave.classList.add('go');
  }
  wave.addEventListener('animationend', function () { wave.classList.remove('go'); });
  var slides = [], pos = 0, lastFocus = null;
  function sectionSlides(cat) {
    var out = [];
    all.forEach(function (g) {
      if (g.cat !== cat) return;
      g.items.forEach(function (p) { if (p.img && !g.site) out.push({ g: g, p: p }); });
    });
    return out;
  }
  function show(dir) {
    var s = slides[pos], p = s.p, g = s.g;
    stage.classList.remove('slide-l', 'slide-r');
    void stage.offsetWidth;
    if (dir) stage.classList.add(dir > 0 ? 'slide-r' : 'slide-l');
    lbImg.src = p.img;
    lbImg.alt = g.client + ' — ' + tr(p.type) + ' (' + tr(p.field) + '), linh b.';
    lbTitle.textContent = g.client;
    lbSub.textContent = tr(p.type) + ' · ' + tr(p.field);
    var link = p.link || g.items.filter(function (x) { return x.link; }).map(function (x) { return x.link; })[0];
    lbLink.hidden = !link;
    if (link) { lbLink.href = link.url; lbLink.textContent = (link.label || T.visit) + ' ↗'; }
    var many = slides.length > 1;
    prev.hidden = next.hidden = counter.hidden = !many;
    counter.textContent = String(pos + 1).padStart(2, '0') + ' — ' + String(slides.length).padStart(2, '0');
    // précharge les voisines
    [pos - 1, pos + 1].forEach(function (i) { var q = slides[(i + slides.length) % slides.length]; if (q) (new Image()).src = q.p.img; });
  }
  function step(d) {
    if (slides.length < 2) return;
    pos = (pos + d + slides.length) % slides.length;
    show(d);
  }
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('button.work-media');
    if (!b) return;
    var g = all[+b.dataset.g]; lastFocus = b;
    slides = sectionSlides(g.cat);
    pos = 0;
    for (var i = 0; i < slides.length; i++) { if (slides[i].g === g) { pos = i; break; } }
    show(0);
    playWave();
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
