/* Projets de l'ombre — effets de parallaxe
   - Grandes photos (en-têtes, bandeaux, photos de section) : l'image glisse dans son cadre.
   - Vignettes et portraits : flottent légèrement, chacun à sa vitesse.
   - Grands titres : défilent un peu moins vite ; bandeaux jaunes : le titre glisse de côté.
   Utilise les propriétés CSS « translate » et « scale », qui s'ajoutent aux animations
   existantes du site sans les remplacer. Désactivé si l'on a demandé moins d'animations. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var BG = document.querySelectorAll('.hero > img, .pagehead > img, .band-img img, .photo img');
  var FLOAT = document.querySelectorAll('.showgrid img, .framed img, .trio img, .portrait img');
  var TEXT = document.querySelectorAll('.bigword, .person .name, .pagehead .stack, .contact-giant');
  var HERO_TITLE = document.querySelector('.hero h1');
  var BANDS = document.querySelectorAll('.titleband h2');

  Array.prototype.forEach.call(BG, function (img) { img.classList.add('plx-bg'); });
  Array.prototype.forEach.call(FLOAT, function (img) { img.classList.add('plx-move'); });
  Array.prototype.forEach.call(TEXT, function (el) { el.classList.add('plx-move'); });
  Array.prototype.forEach.call(BANDS, function (el) { el.classList.add('plx-move'); });
  if (HERO_TITLE) HERO_TITLE.classList.add('plx-move');

  var ticking = false;
  function visible(r, vh) { return r.height > 0 && r.bottom > -150 && r.top < vh + 150; }

  function update() {
    ticking = false;
    var vh = window.innerHeight, mid = vh / 2;

    Array.prototype.forEach.call(BG, function (img) {
      var box = img.parentNode.getBoundingClientRect();
      if (!visible(box, vh)) return;
      var p = (box.top + box.height / 2 - mid) / (vh + box.height);      // -0.5 … 0.5
      var max = box.height * 0.08;
      var y = Math.max(-max, Math.min(max, -p * box.height * 0.32));
      img.style.translate = '0 ' + y.toFixed(1) + 'px';
    });

    Array.prototype.forEach.call(FLOAT, function (img, i) {
      var r = img.getBoundingClientRect();
      if (!visible(r, vh)) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      var speed = [36, -24, 30, -18][i % 4];
      img.style.translate = '0 ' + (p * speed).toFixed(1) + 'px';
    });

    Array.prototype.forEach.call(TEXT, function (el) {
      var r = el.getBoundingClientRect();
      if (!visible(r, vh)) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      el.style.translate = '0 ' + (p * 46).toFixed(1) + 'px';
    });

    if (HERO_TITLE) {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y < vh * 1.2) HERO_TITLE.style.translate = '0 ' + (y * 0.32).toFixed(1) + 'px';
    }

    Array.prototype.forEach.call(BANDS, function (el, i) {
      var r = el.getBoundingClientRect();
      if (!visible(r, vh)) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      el.style.translate = ((i % 2 ? -1 : 1) * p * 70).toFixed(1) + 'px 0';
    });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('hashchange', function () { setTimeout(update, 30); });   // changement de « page » du site
  update();
})();
