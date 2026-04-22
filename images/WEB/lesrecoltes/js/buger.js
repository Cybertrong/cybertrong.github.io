$(document).ready(function () {
    // BURGER
    $('.newsletter-banner ').hide(0).delay(1500).slideDown();
    $(".infolettre").hide();
    $(".w3-top").hide();
    $(".newmenu").hide();
    $("#reponse1,#reponse2,#reponse3,#reponse4,#reponse5").hide();

    $(".newburger").click(function () {
      $(".w3-top").fadeToggle(600);
    });
    
        $(".newburger_responsive").click(function () {
      $(".newmenu").fadeToggle(600);
    });
    
      // ONGLETS
  $('.tagho').click(function() {
    if($('.ongletho').css("margin-right") == "0px")
    {
        $('.ongletho').animate({"margin-right": '-=215px'});
        $('.tagho').animate({"margin-right": '-=215px'});
    }
    else
    {
        $('.ongletho').animate({"margin-right": '+=215px'});
        $('.tagho').animate({"margin-right": '+=215px'});
    };  
  });      
      
  $('.tagad,.tagbask').click(function() {
    if($('.ongletad').css("margin-right") == "215px")
    {
        $('.ongletad').animate({"margin-right": '-=215px'});
        $('.tagad,.tagbask').animate({"margin-right": '-=215px'});
    }
    else
    {
        $('.ongletad').animate({"margin-right": '+=215px'});
        $('.tagad,.tagbask').animate({"margin-right": '+=215px'});
    };   
 });

    
     // SCROOL DOWN
    $("#qec img,#barre").hide();
    
    $(window).scroll(function() { 
        if ($(document).scrollTop() > 70) { // check if user scrolled more than 50 from top of the browser window
          $(".newburger").css({'margin': '1.1% 0 0 93%',
                               'transition' : '0.6s',
                               }); 
          $(".newburger").css( "color", "#000" );   
          $(".menu a:hover").css({'color' : '#AF7817','transition' : '0.8s'});
          $('.logo_hosp img').attr('src', 'photos/logos/lesrecoltes_sblack.png');
          $('.logo_hosp img').css({'margin-left' : '-30px',
                                    'margin-top' : '-25px',
                                     'top' : '0',
                                   'transition' : '0.6s',
                                    });
          $("#qec img,#barre").fadeIn(800);
          $("#bol img").css({'margin-top': '0%',
                               'transition' : '0.6s',
                               }); 
            
        } else {
            $(".newburger").css("margin", "3.5% 0 0 93%");           
            $(".menu a,.menu i").css("color", "#AF7817");
            $('.logo_hosp img').attr('src', 'photos/logo_lesrecoltes.png');
            $('.logo_hosp img').css({'margin-left' : '0px',
                                    'margin-top' : '0px',
                                     'top' : '0',
                                     'transition' : '0.8s',
                                    });
            $("#qec img,#barre").fadeOut(800);
            $("#bol img").css("margin-top", "10%");        
        }});
    
});

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

     // BURGER

function myFunction(x) {
    x.classList.toggle("change");
}

     // NEWSLETTER

$(function(){
   $('.button').click(function(){
      $('.newsletter-banner').slideUp() 
   });
       $('.button_infolettre').click(function(){
      $('.infolettre').slideUp() 
   });
    $('.right').click(function(){
      $('.infolettre').show() 
   });
});

     // FAQ

$(function(){
   $('#bouton h1').click(function(){
      $('#reponse1').slideToggle(500);
   });
   $('#bouton2 h1').click(function(){
      $('#reponse2').slideToggle(500);
   });
   $('#bouton3 h1').click(function(){
      $('#reponse3').slideToggle(500);
   });
       $('#bouton4 h1').click(function(){
      $('#reponse4').slideToggle(500);
   });
       $('#bouton5 h1').click(function(){
      $('#reponse5').slideToggle(500);
   });
});







 





