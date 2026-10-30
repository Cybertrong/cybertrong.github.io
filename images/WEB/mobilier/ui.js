// Mobilier — parallaxe au défilement (propriété CSS « translate », qui s'ajoute aux animations existantes)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var items = [];
  function add(sel, speed) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      var s = typeof speed === 'function' ? speed(i) : speed;
      el.classList.add('plx'); items.push({ el: el, s: s });
    });
  }
  add('.hero-carousel', -0.12);
  add('.hero-content', 0.06);
  add('.section-title', -0.08);
  add('.section-label', -0.04);
  add('.feature-card', function (i) { return i % 2 ? -0.05 : 0.03; });
  add('.usage-card', function (i) { return [0.015, -0.025, 0.03][i % 3]; });
  add('.strategic-card', function (i) { return i % 2 ? -0.04 : 0.02; });
  add('.coherence-content', -0.05);
  add('#contact .contact-info, .contact-form, .contact-content > *', function (i) { return i % 2 ? -0.05 : 0.04; });

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight, small = window.innerWidth < 769;
    for (var i = 0; i < items.length; i++) {
      var it = items[i], r = it.el.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) continue;
      var d = (r.top + r.height / 2) - vh / 2;
      var y = d * it.s * (small ? 0.5 : 1);
      it.el.style.translate = '0 ' + y.toFixed(1) + 'px';
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  update();
})();
