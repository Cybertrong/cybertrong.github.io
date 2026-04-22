$('.newburger').click(function() {
   $(this).toggleClass('active');
});
$('.newburger_responsive').click(function() {
   $(this).toggleClass('active');
});

     // BURGER

function myFunction(x) {
    x.classList.toggle("change");
}

function openNav() {
  if (document.getElementById("myNav").style.width != "100%") {
    document.getElementById("myNav").style.width = "100%";
  } else {
    document.getElementById("myNav").style.width = "0%";
  }
}