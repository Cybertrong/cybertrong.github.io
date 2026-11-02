// Menu : un rideau à bord ondulé descend, puis les liens se dévoilent (styles dans design.css)
$(document).ready(function () {
  var menu = $(".newmenu");
  menu.prepend('<div class="nm-curtain" aria-hidden="true"></div>').show().addClass("nm-ready");
  $(".newburger").click(function () { menu.toggleClass("nm-open"); });
});
