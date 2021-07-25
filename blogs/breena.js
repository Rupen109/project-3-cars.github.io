jQuery(document).ready(function($) {

	"use strict";
	
	// Menu
	$('.main-navigation > .nav-menu').slicknav({
		prependTo:'.menu-mobile',
		label:'',
		allowParentLinks: true
	});
        
        //Theia Sticky Sidebar
        $(window).load(function(){
		if($("#sidebar").length>0 && $("html").hasClass("no-mobile-device")){
			// Fixed Sidebar
			setTimeout(function(){
				sticky_sidebar();
			},600);

			$(window).resize(function(){
				sticky_sidebar();
			});
		}
            });
        
        // Fitvids
	$(".post-entry, #sidebar #sidebar-inner").fitVids();
        
        //Media element
	if($(".post-featured-item video").length>0){
		$('.post-featured-item video').mediaelementplayer().attr("poster","");
	}

	if($(".post-featured-item audio").length>0){
		$('.post-featured-item audio').mediaelementplayer({
			audioWidth: "100%",
			audioHeight: 34
		});
	}
        
        // Scroll to top	
	$('.goto-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});	

	$(window).on("scroll",function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 800) {
			if(!$(".goto-top").hasClass("on")){
				$(".goto-top").addClass("on");
			}
		}
		else if (scrollTop <= 800) {
			if($(".goto-top").hasClass("on")){
				$(".goto-top").removeClass("on");
			}
		}
	});
        
        // Search	
	$('body').on('click', '.top-search-area a', function ( e ) {
		e.preventDefault();
		var top_search_link = $(this);
		$('body').addClass("search-open");
		setTimeout(function(){
			top_search_link.parents(".main-navigation-wrapper").find(".search-form-area .search").focus();
		},100);
        });

        $('body').on('click', '.search-form-area .close-btn', function ( e ) {
                e.preventDefault();
                $('body').removeClass("search-open");
        });
        
        // Swiper Slider
	var featured_area_type = $(".featured-area").data("slider-type");
	var slides_PerView;
	var ww = $(window).outerWidth();

	if(featured_area_type == "slider"){
		slides_PerView = 1;

	}

	if($("html").hasClass("ie9")){
		var featured_area_width = $('.featured-area').outerWidth();
		var featured_slide_number = $('.featured-area .swiper-slide').length;
		$('.featured-area .swiper-wrapper').outerWidth(featured_area_width/slides_PerView*featured_slide_number).parents(".featured-area").addClass("open");
		
		$(window).resize(function(){
			featured_area_width = $('.featured-area').outerWidth();
			$('.featured-area .swiper-wrapper').outerWidth(featured_area_width/slides_PerView*featured_slide_number).parents(".featured-area").addClass("open");
		});
	}

	if($(".featured-area").length>0){
		var featured_swiper_transition, featured_area_autoplay_enabled, autoPlay_value;
		var slider =$(".featured-area");
		featured_swiper_transition = slider.data("slider-transition");
		featured_area_autoplay_enabled = slider.data("slider-autoplay-enabled");
		
		(featured_area_autoplay_enabled) ? autoPlay_value = 5000 : autoPlay_value = "";
	
		var featured_swiper = new Swiper('.featured-area .swiper-container', {
	        //pagination: '.swiper-pagination',
	        slidesPerView: slides_PerView,
	        paginationClickable: true,
                watchActiveIndex: true,
	        spaceBetween: 0,
	        preloadImages: false,
	        pagination: '.swiper-pagination',
	        preventClicks: false,
	        preventClicksPropagation: false,
	        grabCursor: true,
	        watchSlidesVisibility: true,
	        effect: featured_swiper_transition,
	        autoplay: autoPlay_value,
        	autoplayDisableOnInteraction: false,
	        DOMAnimation:false,
	        loop: true,
	        centeredSlides: true,
                loopedSlides: 100,
	        onInit: function (swiper) {
                        swiper.stopAutoplay();
	        	if(featured_area_type == "slider"){
					$(window).load(function(){
						$(".featured-area .swiper-slide:nth-of-type("+parseInt(swiper.activeIndex+1)+")").addClass("animated");
					})
					$('.swiper-slide-visible').each(function(){
						$(this).find(".slider-item").css('background-image', 'url('+$(this).find(".slider-item").data('bg-src')+')');
						$(this).next().find(".slider-item").css('background-image', 'url('+$(this).next().find(".slider-item").data('bg-src')+')');
					})
                                }
				
				var mouse_down = false;
				slider.on("mousedown",function(){
					mouse_down = true;
				})
				
				var timeout = null;
				slider.on("mousemove",function(){
					if(mouse_down){
						if (timeout !== null) {
							clearTimeout(timeout);
							if($(".featured-area .swiper-slide-visible .click-overlay").length==0){
								$(".featured-area .swiper-slide-visible").append('<div class="click-overlay"></div>');
							}
						}

						timeout = setTimeout(function() {
							$(".featured-area .swiper-slide .click-overlay").remove();
						}, 100);	
					}
				})
				slider.on("mouseup",function(){
					mouse_down = false;
					timeout = null;
					$(".featured-area .swiper-slide .click-overlay").remove();
				})
				
            },
            onSlideChangeStart: function(swiper){
            	if(featured_area_type == "slider"){
					$('.swiper-slide-visible').each(function(){
						$(this).find(".slider-item").css('background-image', 'url('+$(this).find(".slider-item").data('bg-src')+')');
						$(this).next().find(".slider-item").css('background-image', 'url('+$(this).next().find(".slider-item").data('bg-src')+')');
					})
				}
			},
            onTransitionEnd: function(swiper){
                    setTimeout(function(){
                            $(".featured-area .swiper-slide").removeClass("animated");
                            $(".featured-area .swiper-slide:nth-of-type("+parseInt(swiper.activeIndex+1)+")").addClass("animated");
                    },100);
            }
	    });

		$(".featured-area .swiper-button-next-custom").on("click",function(){
			featured_swiper.slideNext();
		});

		$(".featured-area .swiper-button-prev-custom").on("click",function(){
			featured_swiper.slidePrev();
		});
		
		$(window).load(function(){
			featured_swiper.startAutoplay();
		});

	    slider.find(".swiper-container").hover(
	    	function() {featured_swiper.stopAutoplay()},
	    	function() {featured_swiper.startAutoplay()}
		);
	}

        if($(".swiper-pagination-bullet").length>1) {
            $(".swiper-pagination").addClass("show");
        }
        
	//Instagram footer
        var insSlider = $("#alternate-widget-area .null-instagram-feed");
	if (insSlider.length > 0) {
		var headerHeight, headerWidth, insTitle, newWidth_insta_li, insLink;
                insLink = insSlider.find("p.clear");
		insTitle = insSlider.find(".widget-title");
		headerHeight = insTitle.outerHeight();
		headerWidth = insTitle.outerWidth()+insLink.outerWidth();
		insTitle.css({
			"top":"50%",
			"left":"50%",
			"margin-top" : -(headerHeight/2),
			"margin-left" : -(headerWidth/2)
		});
                insLink.css({
			"top":"50%",
			"left":"50%",
			"margin-top" : -(headerHeight/2),
			"margin-left" : -((headerWidth/2)-insTitle.outerWidth())
		});

		if(insSlider.find("li").length!=6){
			newWidth_insta_li = 100/insSlider.find("li").length;
			insSlider.find("li").width(newWidth_insta_li+"%");
		}
	}
        
        	if($("#comments").length>0){
		$(".comment-button").on("click",function(e){
			var urlhashOfftestTop = $("#comments").offset().top-120;
			$('html, body').animate({scrollTop : urlhashOfftestTop},800);
			e.preventDefault();
		});
		
		var urlHash = "#" + window.location.href.split("#")[1];
		if(urlHash == "#comments"){
			setTimeout ( function () {
				var urlhashOfftestTop = $("#comments").offset().top-120;
				$(window).scrollTop(urlhashOfftestTop);
			},20);
		}

		var reqinput_text = $(".post-comments .commment-form-wrapper").data("required-text");
		var emailcheck_text = $(".post-comments .commment-form-wrapper").data("email-check-text");
		$(".post-comments .comment-form").on("submit",function(e){

			$(this).find('span[role="alert"]').remove();
			var reqinput = $(this).find("[aria-required='true']");
			var reqinput_html = '<span role="alert" class="wpcf7-not-valid-tip">'+reqinput_text+'</span>';
			var emailcheck_html = '<span role="alert" class="wpcf7-not-valid-tip">'+emailcheck_text+'</span>';

			reqinput.each(function(){
				var reqinput_val = $(this).val();
			    if ( reqinput_val.length==0 ) {
					$(this).after(reqinput_html);
					e.preventDefault();
				}
				
				if($(this).attr("id") == "email" && reqinput_val.length>0){
					var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    				var emailvalid =  re.test(reqinput_val);
    				if(!emailvalid){
						$(this).after(emailcheck_html);
    					e.preventDefault();
    				}
				}
			})
			
		})

		$(".post-comments .comment-form [aria-required='true']").on("focus",function(){
			$(this).next('span[role="alert"]').fadeOut();
		})

		$(".post-comments .comment-form [aria-required='true']").removeAttr("required");
	}
        
        //Justified Gallery
	if($(".post-featured-item .justified-gallery").length>0){
		var row_height;
		$(".post-featured-item .justified-gallery").each(function(){

			row_height = $(this).data("row-height");
			if ($(window).width() < 1024) {
				row_height = row_height/1.2;
			}
			if(!row_height){
				row_height = 300;
			}
			
			if($(".post-list").hasClass("masonry")){
				if($("#main-container > .container").hasClass("sidebar-open")){
					row_height = row_height/2;
				}
				else {
					row_height = row_height/2.6;
				}
			}

			$(this).justifiedGallery({
				rowHeight: row_height,
				maxRowHeight: 0,
				lastRow: "justify",
				captions: false,
				margins:5,
				border:0
			});
		});
	}
        
        $('.post-featured-item.gallery-post .justified-gallery a').attr("itemprop","contentUrl");

	$('.post-featured-item.gallery-post .justified-gallery a').on("click",function(e){
		e.preventDefault();
		var $this = $(this);
		var pswpElement = $(".pswp")[0];
		var lightbox_item = $this.parents(".justified-gallery").find(".item");
		var lightbox_item_link = $this.parents(".justified-gallery").find(".item a");
		var itemCount = lightbox_item.length;
		var pic_index = $this.parents(".item").index();

		var i;
		var items = [];
		var options={
			index: pic_index,
			bgOpacity:1,
			history:false,
			barsSize: {top:0, bottom:0},
			shareButtons: [
			    {id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
			    {id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
			    {id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'}
			]
		};


		for ( i = 0; i < itemCount; i++) {
			var item = {
	            src: $(lightbox_item_link[i]).attr("href"),
	            w:0,
	   			h:0,
	   			title:$(lightbox_item_link[i]).find("img").attr("alt")
	         };
	         items.push(item);
		};
		
		
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items,options);
		gallery.listen('gettingData', function(index, item) {
		    if (item.w < 1 || item.h < 1) { // unknown size
		        var img = new Image(); 
		        img.onload = function() { // will get size after load
			        item.w = this.width; // set image width
			        item.h = this.height; // set image height
					gallery.invalidateCurrItems(); // reinit Items
					gallery.updateSize(true); // reinit Items
		        }
		    	img.src = item.src; // let's download image
		    }
		});
		gallery.init();
	})
        
        $(window).load(function(){

		// Grid Layout
		if($('.grid-layout').length>0){
			var masonry_layout = $('.grid-layout');
			masonry_layout.masonry({
				columnWidth: '.post-item',
			  	itemSelector: '.post-item',
			  	transitionDuration: 0
			}).parents('.grid-container').addClass("open");
		
			$(window).resize(function(){
				setTimeout(function(){
					masonry_layout.masonry('reloadItems').masonry();
				},100);
			});
		}
		
	})
        //Post like
        jQuery('body').on('click','.jm-post-like',function(event){
		event.preventDefault();
		var heart = jQuery(this);
		var post_id = heart.data("post_id");
		heart.html("<i id='icon-like' class='fa fa-heart'></i> <i id='icon-gear' class='loader spin fa fa-spinner'></i>");
		jQuery.ajax({
			type: "post",
			url: ajax_var.url,
			data: "action=jm-post-like&nonce="+ajax_var.nonce+"&jm_post_like=&post_id="+post_id,
			success: function(count){
				if( count.indexOf( "already" ) !== -1 )
				{
					var lecount = count.replace("already","");
					heart.prop('title', 'Like');
					heart.removeClass("liked");
					heart.html("<i class='fa fa-heart-o unlike'></i>&nbsp;"+lecount);
				}
				else
				{
					heart.prop('title', 'Unlike');
					heart.addClass("liked");
					heart.html("<i class='fa fa-heart'></i>&nbsp;"+count);
				}
			}
		});
	});
	
});

function sticky_sidebar(){
	"use strict";
	jQuery('#sidebar').theiaStickySidebar({
		containerSelector: '#main-container',
		additionalMarginTop: 70,
		additionalMarginBottom: 30
    });
}