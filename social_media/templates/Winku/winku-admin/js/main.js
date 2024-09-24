$(document).ready(function(){
  'use strict';
  
  	//*** Refresh Content ***//
	  $('.refresh-page').on("click", function(){
	  $(this).parent().parent().parent().parent().addClass("loading-wait").delay(3000).queue(function(next){
		$(this).removeClass("loading-wait");
		  next();
	  });
	  $(this).addClass("fa-spin").delay(3000).queue(function(next){
		  $(this).removeClass("fa-spin");
		  next();
	  });
  	});
	
	//right menu ==================================
	$('.right-menu-btn').on('click', function() {
			$('.right-menu').addClass("active");
				return false;
		});
			$('html').click(function(){
			$('.right-menu').removeClass("active");
		});
			 
		$('.right-menu').click(function(e){
			  e.stopPropagation();
		});
	// right menu end===============================
  	
	// setting dropdown
	$('.show-status').on('click',function(){
		$('.noti-lst.setting').toggleClass('active');
	});
	// setting dropdown end =====================
		
  	$('.client-list > li').on('click',function(){
		$('body').addClass('chat-active');
		return false;
	});
	$('.cht-wnd-opt > li a').on('click',function(){
		$('body').removeClass('chat-active');
		return false;
	});

	$('.add-content-form > textarea').on('click',function(){
		$('.img-pst-pnl').addClass('active');
		return false;
	});
	$('.pp-cls').on('click',function(){
		$('.img-pst-pnl').removeClass('active');
		return false;
	});

	$('.noti-bd > ul > li').on('click',function(){
		$('.nti-rdrt-pst').addClass('active');
		return false;
	});
	$('.pp-cls').on('click',function(){
		$('.nti-rdrt-pst').removeClass('active');
		return false;
	});
	
	
	$('.evnt-icns > i.fa-pencil-square-o').on('click',function(){
		$('.clndr-edts-pp').addClass('active');
		return false;
	});
	$('.pp-cls,.prvw-clndr-btm > a').on('click',function(){
		$('.clndr-edts-pp').removeClass('active');
		return false;
	});

	$('.notif-lst li a,.noti-bd > ul > li').on('click',function(){
		$('.nti-rdrt-pst').addClass('active');
		return false;
	});
	$('.pp-cls').on('click',function(){
		$('.nti-rdrt-pst').removeClass('active');
		return false;
	});
	
	$('.who-post-this > span').on('click',function(){
			$('.nti-rdrt-pst').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.nti-rdrt-pst').removeClass('active');
			return false;
		});

	$('.dl-btn').on('click',function(){
		$(this).parent().parent().next().fadeOut('1000');
		return false;
	});

		
	$('.client-info > h3 a').on('click',function(){
		$('body').addClass('chat-active');
		return false;
		});
		$('.cht-wnd-opt > li a').on('click',function(){
			$('body').removeClass('chat-active');
			return false;
	});
	
	$('.add-content-form > textarea').on('click',function(){
		$('.lnk-pst-pnl').addClass('active');
		return false;
		});
		
		$('.pp-cls').on('click',function(){
			$('.lnk-pst-pnl').removeClass('active');
			return false;
	});
	
	//location management page 
	$('.cmp-bnr > a').on('click',function(){
			$('.lc-edt').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.lc-edt').removeClass('active');
			return false;
	});

	$('.cls-adjs-btns > a').on('click',function(){
		$('.cls-adjs-btns > a').removeClass('active');
		$(this).addClass('active');
		return false;
	});
		$('.cls-adjs-btns > a.adj-btn').on('click',function(){
			$('.tme-pckr .tab-pane > .row').slideDown('slow');
			return false;
		});
		$('.cls-adjs-btns > a.adj-cl-btn').on('click',function(){
			$('.tme-pckr .tab-pane > .row').slideUp('slow');
			return false;
	});

	$('.social-btns > ul > li').on('click',function(){
		$('.chng-bus-st').addClass('active');
		return false;
		});
		$('.pp-cls').on('click',function(){
			$('.chng-bus-st').removeClass('active');
			return false;
	});
	// location management page end//

	// opener image page 
		$('.add-content-form > textarea').on('click',function(){
			$('.img-opnr-pp').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.img-opnr-pp').removeClass('active');
			return false;
		});
	
	// opener image page end
	
  	// post preview page 
		$('.pstng-sdl').on('click',function(){
			$('.pst-prvw-clndr').addClass('active');
			return false;
		});
		$('.pp-cls,.prvw-clndr-btm > a').on('click',function(){
			$('.pst-prvw-clndr').removeClass('active');
			return false;
		});

		$('.pst-optns > i').on('click',function(){
			$(this).parent().toggleClass('active');
			return false;
		});
	//post preview page end
	
	// user management page 
		$('.crt-btn').on('click',function(){
			$('.crt-grp').slideToggle();
			return false;
		});

		$('.ad-usr').on('click',function(){
			$('.crt-usr').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.crt-usr').removeClass('active');
			return false;
		});

		$('.scrh-grp-btn').on('click',function(){
			$('.srch-grp-pp').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.srch-grp-pp').removeClass('active');
			return false;
		});

		$('.crt-grp-frm').on('click',function(){
			$('.crt-grp-sc').slideDown();
			$('.srch-grp-sc').slideUp();
			return false;
		});

		function toggleOn() {
			$('.tgl-btn input').bootstrapToggle('on');
		}
		function toggleOff() {
			$('.tgl-btn input').bootstrapToggle('off'); 
		}

		$('.check1').on('click',function(){
			$('.check1').toggleClass('off');
			
		});
		$('.check2').on('click',function(){
			$('.check2').toggleClass('off');
			
		});

		$('.check3').on('click',function(){
			$('.check3').toggleClass('off');
			
		});

		$('.check4').on('click',function(){
			$('.check4').toggleClass('off');
			
		});

		
		 
		
	//user management page end//
	
	// reviews page 
  		$('.bs-pt-grp > a').on('click',function(){
			$('.bs-ptd-grp').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.bs-ptd-grp').removeClass('active');
			return false;
		});

		$('.bs-pt-lc > a').on('click',function(){
			$('.bs-ptd-lc').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.bs-ptd-lc').removeClass('active');
			return false;
		});

		$('.crt-tct-btn').on('click',function(){
			$('.crt-tct').addClass('active');
			return false;
		});
		$('.pp-cls').on('click',function(){
			$('.crt-tct').removeClass('active');
			return false;
		});
	
	// reviews page end
	  $('.slct-whr-pst > span').on('click',function(){
		$(this).parent().toggleClass('active');
	  });
	
	  $('.tgl-icn').on('click',function(){
		$(this).next().slideToggle();
		$('.tgl-icn > i').toggleClass('fa-chevron-up');
		$('.tgl-icn > i').toggleClass('fa-chevron-down');
	  });
	
	  $('.cmt-opt > i').on('click',function(){
		$(this).parent().toggleClass('active');
	  });
	
	//notification and messages 
	  $('.notif > span').on('click',function(){
			$(this).siblings().addClass('active');
		  	$(this).parent().siblings().children().removeClass('active');
	  });
	
	  $('.notif-lst li span.cls-noti').on('click',function(){
		$(this).parent().fadeOut('slow');
	  });
	
	//------- remove class active on body
	$("body *").not($('#bar-tops .notif')).on("click", function() {
		//$(".noti-lst").removeClass('active');
	 });
	
	$(document).on('click', function(){
		//$('#ad_transa').hide();
		$(".noti-lst").removeClass('active');
	});
	$('#bar-tops, .notif').on('click', function(e){
		e.stopPropagation();
	});

	
	
	  //===== Side Menu =====//
	  $(".side-menus li.menu-item-has-children > a").on("click",function(){
		$(this).parent().siblings().children("ul").slideUp();
		$(this).parent().siblings().removeClass("active");
		$(this).parent().children("ul").slideToggle();
		$(this).parent().toggleClass("active");
		return false;
	  });

      //===== Side Menu Option =====//
      $('.menu-options').on("click", function(){
        $(".side-header.opened-menu").toggleClass('slide-menu');
        $(".panel-layout").toggleClass('wide-content');
        $("footer").toggleClass('wide-footer');
        $(".menu-options").toggleClass('active');
      });

      //===== FIXED Menu APPEARS ON SCROLL DOWN =====//   
      $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
          $(".side-header").addClass("sticky");
        }
        else{
          $(".side-header").removeClass("sticky");
          $(".side-header").addClass("");
        }
      }); 

      $(".side-menus nav > ul > li ul li > a").on("click", function(){
        $(".side-header").removeClass("slide-menu");
        $(".menu-options").removeClass("active");
      });

      //===== Quick Stats =====//
      $('.show-stats').on("click", function(){
        $(".toggle-content").addClass('active');
      });

       //===== Quick Stats =====//
       $('.toggle-content > span').on("click", function(){
        $(".toggle-content").removeClass('active');
      });

      //===== Quick Stats =====//
      $('.quick-links > ul > li > a').on("click", function(){
        $(this).parent().siblings().find('.dialouge').fadeOut();
        $(this).next('.dialouge').fadeIn();
        return false;
      });

      $("html").on("click", function(){
        $(".dialouge").fadeOut();
      });
      $(".quick-links > ul > li > a, .dialouge").on("click",function(e){
        e.stopPropagation();
      });
      
      //===== Toggle Full Screen =====//
      function goFullScreen() {
        var
        el = document.documentElement
        , rfs =
        el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen

        ;
        rfs.call(el);
      }
      $("#toolFullScreen").on("click",function() {
        goFullScreen();
      });

//===== Search Filter =====//
		(function ($) {
		// custom css expression for a case-insensitive contains()
		jQuery.expr[':'].Contains = function(a,i,m){
		  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
		};
		
		function listFilter(searchDir, list) { 
		  var form = $("<form>").attr({"class":"filterform","action":"#"}),
		  input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"دنبال کی بگردم... ؟! "});
		  $(form).append(input).appendTo(searchDir);
		
		  $(input)
		  .change( function () {
			var filter = $(this).val();
			if(filter) {
			  $(list).find("li:not(:Contains(" + filter + "))").slideUp();
			  $(list).find("li:Contains(" + filter + ")").slideDown();
			} else {
			  $(list).find("li").slideDown();
			}
			return false;
		  })
		  .keyup( function () {
			$(this).change();
		  });
		}

	//ondomready
		$(function () {
		  listFilter($("#searchDir"), $("#people-list"));
		});
		}(jQuery));

//===== Slim Scroll =====*/pst-carousel
	if ($.isFunction($.fn.slimScroll)) {
	  $('.client-list').slimScroll({
		height: '270px',
		size: '2px',
		position: 'right',
		color: '#000',
	  });
	
	  $('.scrl').slimScroll({
		height: '500px',
		size: '2px',
		position: 'right',
		color: '#000',
	  });
	  
	  $('.side-menus').slimScroll({
		height: '500px',
		size: '2px',
		position: 'right',
		color: '#000',
	  });
	}

//===== Select2 =====//
	if ($.isFunction($.fn.select2)) {
	  $('select').select2();
	}

//===== Owl Carousel =====//
	if ($.isFunction($.fn.owlCarousel)) {
	  $('.pst-carousel').owlCarousel({
		autoplay:true,
		autoplayTimeout:30000,
		smartSpeed:2000,
		loop:false,
		dots:false,
		nav:true,
		rtl:true,
		margin:15,
		items:2,
		navText: [
		"<i class='fa fa-angle-right'></i>",
		"<i class='fa fa-angle-left'></i>"
		],
		responsive:{
		  0:{items:1,margin:10,nav:false},
		  480:{items:1,margin:15,nav:false},
		  768:{items:2,margin:15,nav:true},
		  980:{items:2,margin:15,nav:true},
		  1200:{items:2,margin:15,nav:true},
		}
	  });
	
	  $('.tme-pckr > ul').owlCarousel({
		autoplay:false,
		autoplayTimeout:30000,
		smartSpeed:2000,
		loop:true,
		dots:false, 
		nav:true,
		rtl:true,
		margin:50,
		center:true,
		items:3,
		navText: [
		"<i class='fa fa-chevron-right'></i>",
		"<i class='fa fa-chevron-left'></i>"
		],
		responsive:{
		  0:{items:1,margin:10,nav:false},
		  480:{items:2,margin:30,nav:false},
		  768:{items:3,margin:40,nav:true},
		  980:{items:3,margin:40,nav:true},
		  1200:{items:3,margin:50,nav:true},
		}
	  });
	
	  $('.gpl-crsl').owlCarousel({
		autoplay:false,
		autoplayTimeout:30000,
		smartSpeed:2000,
		loop:false,
		dots:false,
		nav:true,
		rtl:true,
		margin:0,
		items:1,
		navText: [
		"<i class='fa fa-caret-right'></i>",
		"<i class='fa fa-caret-left'></i>"
		]
	  });
	}

//===== Sticky User Area =====//
	if ($.isFunction($.fn.scrollsWith)) {
	  $("#sidebar2").scrollsWith({
	
	  });
	}
//===== Full Calendar =====//
	if ($.isFunction($.fn.fullCalendar)) {
	  $('.clndr').fullCalendar({
		header: {
		  left: 'prev',
		  center: 'title',
		  right: 'next'
		},   
		
            isRTL : true ,
            locale : 'fa' ,
		defaultDate: '1401-01-18',
		buttonIcons:false,
		editable: true,
		eventLimit: true,
		eventRender: function(event, eventElement) {
		  if (event.imageurl) {
			eventElement.find("div.fc-content").prepend("<img src='" + event.imageurl +"' width='70' height='36'>");
		  }
		},
		eventAfterAllRender: function(){
		  var icns = $('<div class="evnt-icns"><i class="fa fa-trash"></i><i class="fa fa-pencil-square-o"></i></div>');
		  $('td.fc-event-container').append(icns);
		},
		events: [
		{
		  title: 'ارسال چندتا ایده جدید مارکتینگ برای',
		  start: '1400-01-01',
		  imageurl:'images/resource/evnt-img1.jpg',
		},
		{
		  title: 'جلسه مشاوره با کارفرمای جدید',
		  start: '1401-01-01',
		  imageurl:'images/resource/evnt-img2.jpg'
		},
		{
		  title: 'تهیه عکس های جدید از محصولات',
		  start: '1401-01-03',
		  imageurl:'images/resource/evnt-img3.jpg'
		},
		{
		  title: 'جمع کردن تیم طراحی  برای  پروژه جدید',
		  start: '1401-01-05',
		  imageurl:'images/resource/evnt-img4.jpg'
		},
		{
		  title: 'اصلاح و تغییر فایل های جاوااسکریپت پروژه',
		  start: '1401-01-09',
		  imageurl:'images/resource/evnt-img5.jpg'
		},
		{
		  title: 'کلاس آموزش ترفندهای معرفی محصول',
		  start: '1401-01-09',
		  imageurl:'images/resource/evnt-img6.jpg'
		}
		]
	  });
	}

//===== Jalendar =====//
	if ($.isFunction($.fn.jalendar)) {
	  $('#cldr').jalendar({
		type: 'selector',
	  });
	}
//===== Wickedpicker =====//
	if ($.isFunction($.fn.wickedpicker)) {
	  $('#slc-tm1,.tm-pckr1').wickedpicker();
	}
	
	});


	function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#upl-chng1').attr('src', e.target.result);
			}
	
			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#upl1").change(function(){
		readURL(this);
	});

	function readURL2(input) {
		if (input.files && input.files[0]) {
			var reader2 = new FileReader();
	
			reader2.onload = function (e) {
				$('#upl-chng2').attr('src', e.target.result);
			};
	
			reader2.readAsDataURL(input.files[0]);
		}
	}

	$("#upl2").change(function(){
		readURL2(this);
	});
	
	function readURL3(input) {
		if (input.files && input.files[0]) {
			var reader3 = new FileReader();
	
			reader3.onload = function (e) {
				$('#upl-chng3').attr('src', e.target.result);
			};
	
			reader3.readAsDataURL(input.files[0]);
		}
	}

	$("#upl3").change(function(){
		readURL3(this);
	});


//location management///
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#utp1').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#chng1").change(function(){
		readURL(this);
	});

	function readURL2(input) {
		if (input.files && input.files[0]) {
			var reader2 = new FileReader();

			reader2.onload = function (e) {
				$('#utp2').attr('src', e.target.result);
			}

			reader2.readAsDataURL(input.files[0]);
		}
	}

	$("#chng2").change(function(){
		readURL2(this);
	});


//location management end

// image croper
$(window).load(function() {
	"use strict";
		var options =
		{
			thumbBox: '.thumbBox',
			spinner: '.spinner',
			imgSrc: 'images/resource/crp-img1.jpg'
		};
		var cropper = $('.imageBox').cropbox(options);
		$('#file').on('change', function(){
			var reader = new FileReader();
			reader.onload = function(e) {
				options.imgSrc = e.target.result;
				cropper = $('.imageBox').cropbox(options);
			};
			reader.readAsDataURL(this.files[0]);
			this.files = [];
		});
		$('#btnCrop').on('click', function(){
			var img = cropper.getDataURL();
			$('.cropped').append('<img src="'+img+'">');
		});
		$('#btnZoomIn').on('click', function(){
			cropper.zoomIn();
		});
		$('#btnZoomOut').on('click', function(){
			cropper.zoomOut();
		});
	});