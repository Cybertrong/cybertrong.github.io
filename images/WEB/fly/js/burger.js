// FLY — ouverture / fermeture du menu (le burger devient une croix, le menu apparaît en fondu)
(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (!burger || !menu) return;

  burger.setAttribute('role', 'button');
  burger.setAttribute('tabindex', '0');
  burger.setAttribute('aria-label', 'Menu');
  burger.setAttribute('aria-expanded', 'false');

  function setMenu(open) {
    burger.classList.toggle('active', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function toggle() { setMenu(!menu.classList.contains('open')); }

  burger.addEventListener('click', toggle);
  burger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') || e.target === menu) setMenu(false);
  });
})();
