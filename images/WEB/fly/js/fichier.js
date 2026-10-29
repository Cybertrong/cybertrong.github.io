// FLY — parallaxe et bouton « retour en haut »
// (le menu est géré dans js/burger.js)
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.parallax');
  var bands = Array.prototype.slice.call(document.querySelectorAll('.fly-band'));
  var phones = Array.prototype.slice.call(document.querySelectorAll('.iphone'));
  var drift = Array.prototype.slice.call(document.querySelectorAll('#fond2 h1, #fond4 h1, .form h1, .text_intro'));
  var backToTop = document.getElementById('backToTop');
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight, mid = vh / 2;

    if (backToTop) backToTop.classList.toggle('show', y > 300);
    if (reduce) return;

    // fond de la première image : défile à mi-vitesse (effet d'origine)
    if (hero) hero.style.backgroundPosition = 'center ' + (y * 0.5) + 'px';

    // Quoi / Comment : le fond défile plus lentement que le texte
    bands.forEach(function (b) {
      var r = b.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - mid) / (vh + r.height);   // -0.5 … 0.5
      b.style.backgroundPosition = 'center ' + (50 + p * 60).toFixed(2) + '%';
      var inner = b.querySelector('.fly-inner');
      if (inner) inner.style.transform = 'translate3d(0,' + (p * -70).toFixed(1) + 'px,0)';
    });

    // écrans de l'app : chaque téléphone à sa propre vitesse
    phones.forEach(function (ph, i) {
      var r = ph.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      var speed = [-70, 0, 70][i % 3];
      ph.style.transform = 'translate3d(0,' + (p * speed).toFixed(1) + 'px,0)';
    });

    // grands titres : légère dérive
    drift.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) return;
      var p = (r.top + r.height / 2 - mid) / vh;
      el.style.transform = 'translate3d(0,' + (p * 50).toFixed(1) + 'px,0)';
    });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();

  if (backToTop) backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
