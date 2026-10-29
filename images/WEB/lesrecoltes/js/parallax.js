/* Épicerie Les Récoltes — effets de parallaxe
   1. Photos : l'image glisse doucement à l'intérieur de son cadre pendant le défilement.
   2. Titres de section : ils défilent un peu moins vite que la page.
   Désactivé si la personne a demandé de réduire les animations. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SCALE = 1.16;      // l'image est légèrement agrandie pour pouvoir glisser sans montrer de bord
  var IMG_SPEED = 0.18;  // amplitude du glissement des photos
  var TITLE_SPEED = 0.10;

  var PHOTO_SELECTORS = [
    '.parallax img',          // galeries de l'épicerie et de la cantine
    '.cours-photos img',      // photos des cours
    '#genevieve img'          // portrait de l'épicière
  ];
  var FLOAT_SELECTORS = ['#bol img'];   // bol de la cantine : flotte sans cadre
  var TITLE_SELECTORS = ['#cours h1', '#bistro h1', '#qec h1', '#text_rachel h1', '#text_gene h1', '#epi h1', '.presse h1'];

  var frames = [], floats = [], titles = [];

  function px(v) { return parseFloat(v) || 0; }

  // Place chaque photo dans un cadre qui reprend exactement sa place dans la mise en page
  function frame(img) {
    if (img.closest('.plx-frame') || !img.offsetWidth) return;
    var parent = img.parentElement;
    var cs = getComputedStyle(img);
    var pcs = getComputedStyle(parent);
    var span = document.createElement('span');
    span.className = 'plx-frame';
    ['Top', 'Right', 'Bottom', 'Left'].forEach(function (s) {
      span.style['border' + s] = cs['border' + s + 'Width'] + ' ' + cs['border' + s + 'Style'] + ' ' + cs['border' + s + 'Color'];
      span.style['margin' + s] = cs['margin' + s];
    });
    if (pcs.display.indexOf('grid') > -1) {
      span.style.width = '100%';
    } else {
      span.style.width = (img.offsetWidth / parent.clientWidth * 100) + '%';
      span.style.flex = '0 0 auto';
    }
    var cover = cs.objectFit === 'cover';
    if (cover) { span.style.alignSelf = 'stretch'; }
    img.parentNode.insertBefore(span, img);
    span.appendChild(img);
    img.classList.add('plx-img');
    if (cover) img.classList.add('plx-cover');
    frames.push(img);
  }

  function setup() {
    document.querySelectorAll(PHOTO_SELECTORS.join(',')).forEach(frame);
    document.querySelectorAll(FLOAT_SELECTORS.join(',')).forEach(function (el) { el.classList.add('plx-float'); floats.push(el); });
    document.querySelectorAll(TITLE_SELECTORS.join(',')).forEach(function (el) { el.classList.add('plx-title'); titles.push(el); });
    update();
  }

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight, mid = vh / 2;
    frames.forEach(function (img) {
      var box = img.parentNode.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      var p = (box.top + box.height / 2 - mid) / vh;          // -0.5 … 0.5 environ
      var max = box.height * (SCALE - 1) / 2;
      var t = Math.max(-max, Math.min(max, -p * box.height * IMG_SPEED * 2));
      img.style.transform = 'translate3d(0,' + t.toFixed(1) + 'px,0) scale(' + SCALE + ')';
    });
    floats.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      el.style.transform = 'translate3d(0,' + (p * 60).toFixed(1) + 'px,0)';
    });
    titles.forEach(function (el) {
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top - mid) / vh;
      el.style.transform = 'translate3d(0,' + (p * vh * TITLE_SPEED).toFixed(1) + 'px,0)';
    });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  if (document.readyState === 'complete') setup();
  else window.addEventListener('load', setup);
})();
