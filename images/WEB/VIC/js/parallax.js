/* Kim Bui (VIC) — effets de parallaxe
   - Accueil : la photo du diaporama suit doucement la souris (la page ne défile pas).
   - Portfolio : chaque colonne de photos défile à sa propre vitesse.
   - À propos / contact : le texte défile un peu moins vite que la page.
   Utilise la propriété CSS « translate », qui s'ajoute au zoom existant sans le remplacer.
   Désactivé si l'on a demandé moins d'animations. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ── Accueil : parallaxe à la souris ──
  var slidesBox = document.querySelector('.slideshow-container');
  if (slidesBox) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function step() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      document.querySelectorAll('.mySlides img').forEach(function (img) {
        img.style.translate = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px';
      });
      raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(step) : null;
    }
    window.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * -36;
      ty = (e.clientY / window.innerHeight - 0.5) * -24;
      if (!raf) raf = requestAnimationFrame(step);
    });
  }

  // ── Défilement : colonnes du portfolio et textes ──
  var columns = Array.prototype.slice.call(document.querySelectorAll('.row > .column'));
  var texts = Array.prototype.slice.call(document.querySelectorAll('.text_about, .text_contact'));
  if (!columns.length && !texts.length) return;

  var SPEEDS = [-0.06, 0.04, -0.03, 0.07];   // une vitesse par colonne visible
  var ticking = false;
  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var visibleCols = columns.filter(function (c) { return c.offsetParent !== null; });
    var perRow = Math.max(1, Math.round(1 / ((visibleCols[0] && visibleCols[0].offsetWidth / visibleCols[0].parentNode.clientWidth) || 1)));
    visibleCols.forEach(function (c, i) {
      c.style.translate = '0 ' + (y * SPEEDS[(i % perRow) % SPEEDS.length]).toFixed(1) + 'px';
    });
    texts.forEach(function (t) { t.style.translate = '0 ' + (y * 0.18).toFixed(1) + 'px'; });
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  document.addEventListener('click', function () { setTimeout(update, 50); });   // filtres du portfolio
  update();
})();
