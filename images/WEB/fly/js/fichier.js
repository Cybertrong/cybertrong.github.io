$(document).ready(function(){
$(".menu").hide();
$(".burger").click(function(){
$(".menu").fadeToggle()(600);
});

// PARALLAX EFFECT
$(window).scroll(function(){
  var scrollPos = $(window).scrollTop();
  $(".parallax").css("background-position", "center " + (scrollPos * 0.5) + "px");

  // SHOW/HIDE BACK TO TOP BUTTON
  if (scrollPos > 300) {
    $("#backToTop").addClass("show");
  } else {
    $("#backToTop").removeClass("show");
  }
});

// BACK TO TOP BUTTON CLICK
$("#backToTop").click(function(){
  $("html, body").animate({ scrollTop: 0 }, 800);
  return false;
});
});
