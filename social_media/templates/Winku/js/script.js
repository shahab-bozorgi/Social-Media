// Animate loader off screen
	$(window).on('load', function() {
		"use strict";
		$(".se-pre-con").fadeOut("slow");
	
	
});//window.load end here


//document ready starts
jQuery(document).ready(function($) {
	
	"use strict";	
	
new WOW().init();

// load more plugin
	
$('.loadMore').loadMoreResults({
	displayedItems: 4,
	showItems: 2,
	button: {
	  'class': 'btn-load-more',
	  'text': 'Load More'
	}
});

//===== Owl Carousel =====//
    if ($.isFunction($.fn.owlCarousel)) {
        $('.related-caro').owlCarousel({
            autoplay:true,
            autoplaytimeOut:2000,
            items:4,
            loop:true,
            nav:true,
            margin:30,
            dots:false,
            responsive:{
                0:{items:1},
                480:{items:1},
                768:{items:2},
                980:{items:2},
                1200:{items:4}
            }
        });
	}

	
// delete cart item
	$('.del-cart-item').on("click", function(){
		$(this).parent().slideUp();
		return false;
	  });
	  
// cart open and close
	$('.shopped-items').on("click", function(){
		$('.side-cart').addClass('active');
		return false;
	  });
	  
	  $('.close-cart').on("click", function(){
		$('.side-cart').removeClass('active');
		return false;
	  });
	
//--- bootstrap tooltip	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});	

//----- count down timer		
	if ($.isFunction($.fn.downCount)) {
		$('.countdown').downCount({
			date: '11/12/2018 12:00:00',
			offset: +10
		});
	}
	
//----- sticky header
	if ($.isFunction($.fn.stickit)) {
		$('header').stickit({scope: StickScope.Document});
	}


	



});//document ready end



