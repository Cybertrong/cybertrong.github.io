$(document).ready(function () {
    // BURGER
    $(".newmenu").hide();
    $(".arrow").hide();
    
    
  $(".newburger_responsive").click(function () {
      $(".newmenu").fadeToggle(600);
    });


    
     // SCROOL DOWN
    $("#qec img,#barre").hide();
    
    $(window).scroll(function() { 
        if ($(document).scrollTop() > 90) { // check if user scrolled more than 50 from top of the browser window
            $("#myBtnContainer").css({
                                'transition' : '0.6s',  
                                'background-color': '#fff ', 
                                 'opacity':'0.7',
                                 'border-bottom': 'transparent',  }); 
            $('#myBtnContainer button, .header p ,.header button').css({'color' : '#000'}); 
            $('#barrenoir').fadeOut(800);
//            $('#top_logo img').fadeOut(800);
            $("#qec img,#barre, .arrow").fadeIn(800);
            $(".newburger").css({
                                'rotate' : '90deg', 
                                'transition' : '0.6s', 
                                }); 
             $('#top_logo img').attr('src', 'images/kim_bui_logo_black.png');
            $("").css({'margin-top': '5%',
                               'transition' : '0.6s',
                               }); 
        } else {       
            $("#myBtnContainer").css({
                                'transition' : '0.6s', 
                                 'background-color': '#000', 
                                'opacity':'0.9',
                                 'border-bottom': '1px solid #fff', 
                               }); 
              $('#myBtnContainer button, .header p ,.header button').css({'color' : '#fff'}); 
            $('#barrenoir').fadeIn(800);
//            $('#top_logo img').fadeIn(300);
            $("#qec img,#barre, .arrow").fadeOut(800);
            $("").css("margin-top", "0%");  
            $(".newburger").css({
                                'rotate' : '0deg',
                                'transition' : '0.6s', 
                                });
             $('#top_logo img').attr('src', 'images/kim_bui_logo.png');
        }}); });

     // ANCHOR

$(function() {
          $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
 
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1050);
                return false;
              }
            }
          });
        });
 
if(window.matchMedia("(min-width:800px)").matches) {}


     // IMAGE FULL SCREEN
// create references to the modal...
var modal = document.getElementById('myModal');
// to all images 
var images = document.getElementsByClassName('myImages');
// the image in the modal
var modalImg = document.getElementById("img01");

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  // and attach our click listener for this image.
  img.onclick = function(evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
  }
}

var span = document.getElementsByClassName("modal")[0];

span.onclick = function() {
  modal.style.display = "none";
}



//GALLERY

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// Two images side by side
function one() {
    for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "100%";  // IE10
    elements[i].style.flex = "100%";
  }
}

// Two images side by side
function two() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "25%";  // IE10
    elements[i].style.flex = "25%";
  }
}

// Four images side by side
function four() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "12.5%";  // IE10
    elements[i].style.flex = "12.5%";
  }
}

// Add active class to the current button (highlight it)
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}








 





