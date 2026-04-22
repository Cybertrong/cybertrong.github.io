/*
jQuery scrollMap 1.0
01/2014 par Gildas P. / www.gildasp.fr

démo, tuto, exemples sur :
http://www.playingwithpixels.gildasp.fr/?p=498
*/

(function($) {
	$.fn.scrollMap = function(params){

		if(this.length>0){

			params = $.extend({
				mode: 'circular',
				fullScreen: false,
				speed: 12,
				mouseMode: 'over',
				deadSpot: ['40%', '40%'],
				startAt: ['50%', '50%'],
				cursor: 'move' // uniquement pour le mode 'drag'
	    	}, params);

	    	// css updates of viewport
	    	this.css({
	    		'overflow': 'hidden'
	    	});

	    	// association de la map au viewport
	    	var viewport = this;
	    	var myMap = this.find(':first-child');	    	

	    	// coords du viewport
	    	var viewX = this.offset().left;
	    	var viewY = this.offset().top;
	    	var viewW = this.width();
	    	var viewH = this.height();

	    	// mode pleine page, pour régler la hauteur
	    	if(params.fullScreen){
	    		$(window).resize(function(){

	    			// maj des valeurs H/W pour les calculs !
			    	viewW = $(window).width();
			    	viewH = $(window).height();

	    			viewport.width(viewW);
	    			viewport.height(viewH);
	    		});
	    		$(window).trigger('resize');
	    	} else {
	    		$(window).resize(function(){

	    			// maj des valeurs H/W pour les calculs !
			    	viewW = viewport.width();
			    	viewH = viewport.height();
	    		});
	    		//$(window).trigger('resize');
	    	}

	    	var mapMode = params.mode;

	    	// dims de la map
	    	var mapW = myMap.width();
	    	var mapH = myMap.height();

	    	// instancier la loop, car iOS refuse le clearInterval sinon...
	    	scrollMapLoop = setInterval(function(){}, 5000);
	    	clearInterval(scrollMapLoop);

	    	// direct : comportement au survol du viewport
	    	if(mapMode == 'direct'){
		    	this.hover(function(){ 
		    		// on commence à  écouter le mousemove
		    		$(this).mousemove(function(e){

		    			// coords relatives au viewport
		    			var relX = e.pageX - viewX;
		    			var relY = e.pageY - viewY;

		    			// positions relatives en coef entre 0 et 1
		    			var coefX = relX/viewW;
		    			var coefY = relY/viewH;

		    			// action !
		    			var scrollX = coefX * (mapW-viewW);
		    			var scrollY = coefY * (mapH-viewH);

		    			$(this).scrollLeft(scrollX);
		    			$(this).scrollTop(scrollY);
		    		});
		    	}, function(){ 
		    		// stop l'écoute
		    		$(this).off('mousemove');
		    	});
		    }

	    	// progressive : comportement au survol du viewport
	    	if(mapMode == 'progressive'){

	    		// calcul de la dim de la free zone
	    		var freeW = params.deadSpot[0];
	    		if(typeof freeW == 'string'){
	    			if(freeW.indexOf('%') !== false){
	    				freeW = parseInt(freeW)/100 * viewW;	    				
	    			}
	    		}
	    		if(typeof freeW == 'number'){
	    			freeW /= 2;
	    			// L de la zone active
	    			var activeW = viewW/2 - freeW;
	    		}
	    		var freeH = params.deadSpot[1];
	    		if(typeof freeH == 'string'){
	    			if(freeH.indexOf('%') !== false){
	    				freeH = parseInt(freeH)/100 * viewH;	    				
	    			}
	    		}
	    		if(typeof freeH == 'number'){
	    			freeH /= 2;
	    			// L de la zone active
	    			var activeH = viewH/2 - freeH;
	    		}

	    		var centreX = viewW/2; // centre du viewport, relatif au viewport
	    		var centreY = viewH/2;

		    	this.hover(function(){

		    		var scrollX = 0;
		    		var scrollY = 0;
		    		// on commence à  écouter le mousemove
		    		$(this).mousemove(function(e){

		    			// coords relatives au CENTRE du viewport
		    			var relX = e.pageX - viewX - centreX;
		    			var relY = e.pageY - viewY - centreY;
		    			var absX = Math.abs(relX);
		    			var absY = Math.abs(relY);

		    			// coords hors deadSpot
		    			var signX = absX/relX;
		    			var signY = absY/relY;
		    			var relX = Math.max(0, (absX-freeW));
		    			var relY = Math.max(0, (absY-freeH));

		    			// coef entre 0 et 1 -> vitesse de scroll
		    			var coefX = (relX/activeW) * signX;
		    			var coefY = (relY/activeH) * signY;
		    			scrollX = coefX * params.speed;
		    			scrollY = coefY * params.speed;
		    		});

		    		// action : scroll @25fps
		    		scrollMapLoop = setInterval($.proxy(function(){
    					this.scrollLeft( this.scrollLeft() + scrollX);
    					this.scrollTop( this.scrollTop() + scrollY);
    				}, $(this)), 40);

		    	}, function(){
		    		// stop l'écoute
		    		clearInterval(scrollMapLoop);
		    		$(this).off('mousemove');
		    	});
		    }

	    	// circular : distance depuis le centre
	    	if(mapMode == 'circular'){

	    		// calcul de la dim de la free zone
	    		var ray = params.deadSpot[0];
	    		if(typeof ray == 'string'){
	    			if(ray.indexOf('%') !== false){
	    				ray = parseInt(ray)/100 * viewW;	    				
	    			}
	    		}
	    		if(typeof ray == 'number'){
	    			ray /= 2;
	    			var activeW = viewW/2 - ray;
	    		}

	    		var centreX = viewW/2; // centre du viewport, relatif au viewport
	    		var centreY = viewH/2;
	    		var distMax = Math.sqrt(centreX*centreX + centreY*centreY); // dist entre le centre et un coin
	    		distMax -= ray; // hors zone centrale

		    	this.hover(function(){ 
		    		var scrollX = 0;
		    		var scrollY = 0;
		    		// on commence à  écouter le mousemove
		    		$(this).mousemove(function(e){
		    			// coords relatives au CENTRE du viewport
		    			var relX = e.pageX - viewX - centreX;
		    			var relY = e.pageY - viewY - centreY;
		    			//var absX = Math.abs(relX);
		    			//var absY = Math.abs(relY);

		    			// distance depuis le centre
		    			var dist = Math.sqrt(relX*relX + relY*relY);

		    			// vecteur unitaire
		    			var unitX = relX/dist;
		    			var unitY = relY/dist;	    			

		    			// distance hors zone inactive
		    			dist -= ray;
		    			dist = Math.max(0, dist);

		    			// coef 
		    			var coef = dist/distMax;
		    			var vit = coef*params.speed;
		    			//debug(coef+' / '+vit);

		    			// application en X et Y
		    			scrollX = unitX*vit;
		    			scrollY = unitY*vit;
		    		});

		    		// action : scroll @25fps
		    		scrollMapLoop = setInterval($.proxy(function(){
    					this.scrollLeft( this.scrollLeft() + scrollX);
    					this.scrollTop( this.scrollTop() + scrollY);
    				}, $(this)), 40);

		    	}, function(){ 
		    		// stop l'écoute
		    		clearInterval(scrollMapLoop);
		    		$(this).off('mousemove');
		    	});
		    }

		    // draggable, à la google map (et comme en tactile)
		    if(mapMode == 'drag'){
		    	this.css('cursor', params.cursor); // curseur spécifique, pour signaler l'interaction

		    	this.mousedown(function(event){
					event.preventDefault();
		
					initEventX = event.pageX;
					initEventY = event.pageY;

					prevScrollX = $(this).scrollLeft();
					prevScrollY = $(this).scrollTop();				

					dragItem = $(this);

					$(document).mousemove(function(e){
						e.preventDefault();

						var eventX = e.pageX;
						var eventY = e.pageY;

						var nextX = (prevScrollX - (eventX-initEventX));
						var nextY = (prevScrollY - (eventY-initEventY));					

						dragItem.scrollLeft(nextX);
						dragItem.scrollTop(nextY);
					});

					$(document).mouseup(function(e){
						e.preventDefault();					
						$(document).off('mousemove mouseup');
					});
				});
		    }

	    	///////////
	    	// indépendant du mode : position au départ
	    	if(params.startAt){
	    		// en X
	    		var startX = params.startAt[0];
	    		
	    		if(typeof startX == 'string'){
	    			if(startX.indexOf('%') !== false){
	    				startX = parseInt(startX)/100 * (mapW-viewW);
	    				//debug2(startX);
	    			}
	    		}
	    		if(typeof startX == 'number'){
	    			this.scrollLeft(startX);
	    		}
	    		// en Y
	    		var startY = params.startAt[0];
	    		
	    		if(typeof startY == 'string'){
	    			if(startY.indexOf('%') !== false){
	    				startY = parseInt(startY)/100 * (mapH-viewH);
	    				//debug2(startY);
	    			}
	    		}
	    		if(typeof startY == 'number'){
	    			this.scrollTop(startY);
	    		}
	    	}

	    	///////////

	    	// gestion tactile, indépendante du mode (?) 	
	    	this.on('touchstart', function(event){
				event.preventDefault();

				/*
				Pb2 : c'est good sauf sur le mode #1, direct
				Pb : en tactile ça fait dans l'ordre :
				mouseover
				touchstart
				touchend
				et pas de mouseout... sauf si on clique à l'extérieur
		    	-> on commence par désactiver les mouse events en cours
		    	*/
				clearInterval(scrollMapLoop);
		    	$(this).off('mousemove');

				// presque tout ça est piqué de easyDrag 1.1 :)

				touch = event.originalEvent.changedTouches[0];				
				initEventX = touch.pageX;
				initEventY = touch.pageY;

				prevScrollX = $(this).scrollLeft();
				prevScrollY = $(this).scrollTop();				

				dragItem = $(this);

				$(document).on('touchmove', function(e){
					e.preventDefault();

					touch = e.originalEvent.changedTouches[0];
					//touch = e.touches[0];
					var eventX = touch.pageX;
					var eventY = touch.pageY;

					var nextX = (prevScrollX - (eventX-initEventX));
					var nextY = (prevScrollY - (eventY-initEventY));					

					dragItem.scrollLeft(nextX);
					dragItem.scrollTop(nextY);
				});

				$(document).on('touchend', function(e){
					e.preventDefault();					
					$(document).off('touchmove touchend');
				});
			});
	    }

		return this;
	};

	// un outil pour le scroll ciblé... la cible sera centrée dans le viewport, pas comme avec jQuery.scrollTo()
	$.fn.scrollMapTo = function(cible, duree, easing, endfunc){

		if(typeof duree == "undefined") duree=800;
		if(typeof easing == "undefined") easing="swing"; // easing par défaut de jquery
		if(typeof easing == "function") endfunc=easing; easing="swing";
		if(typeof endfunc == "undefined") endfunc=function(){};

		switch(typeof cible[0]){
			case "string" : // pourcentage, centré
				var map = this.find(':first-child');
				var nextX = parseInt(cible[0])/100 * (map.width()-this.width());
				var nextY = parseInt(cible[1])/100 * (map.height()-this.height());
			break;
			case "number" : // coordonnées en pixels, à centrer dans le viewport
				var nextX = cible[0] - this.width()/2; 
				var nextY = cible[1] - this.height()/2;
			break;
			case "object" : // objet jquery à centrer dans le viewport
				var offset_cible = cible.offset();
				var offset_viewport = this.offset();
				var nextX = offset_cible.left - offset_viewport.left + cible.innerWidth()/2 - this.width()/2;
				var nextY = offset_cible.top - offset_viewport.top + cible.innerHeight()/2 - this.height()/2;
				nextX += this.scrollLeft(); // ça nous donnait un déplacement relatif au scroll actuel...
				nextY += this.scrollTop();
			break;
			default:
				return this;
			break;
		}
		
		this.animate({scrollLeft: nextX, scrollTop: nextY}, duree, easing, endfunc);
		return this;
	};
})(jQuery);

