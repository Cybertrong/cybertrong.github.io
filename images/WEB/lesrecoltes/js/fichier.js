// Menu : ouverture en cercle depuis le burger, liens qui montent l'un après l'autre (styles dans design.css)
$(document).ready(function () {
  var menu = $(".newmenu");
  menu.show().addClass("nm-ready");
  $(".newburger").click(function () {
    var b = this.getBoundingClientRect();
    menu[0].style.setProperty("--cx", (b.left + b.width / 2) + "px");
    menu[0].style.setProperty("--cy", (b.top + b.height / 2) + "px");
    menu.toggleClass("nm-open");
  });
});
