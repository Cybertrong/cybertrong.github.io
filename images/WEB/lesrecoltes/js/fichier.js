// Menu : des volets verticaux tombent l'un après l'autre, puis les liens apparaissent (styles dans design.css)
$(document).ready(function () {
  var menu = $(".newmenu");
  var strips = $('<div class="nm-strips" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>');
  menu.prepend(strips).show().addClass("nm-ready");
  $(".newburger").click(function () { menu.toggleClass("nm-open"); });
});
