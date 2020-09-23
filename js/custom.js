$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');

	$(".qna__item").click(function(){
		$(this).find(".qna__text").slideToggle();
	});

	$(".feedback__star").click(function(){
		var numberOfStar = $(this).attr("data-id");
		$(".feedback__star").removeClass("active");
		$(this).addClass("active").prevAll().addClass("active");
	});

	$(".prod__smimage").click(function(){
		var thisId = $(this).attr("data-id");
		$(this).addClass("active").siblings().removeClass("active");
		$(".prod__img").removeClass("active");
		$(".prod__img_"+thisId).addClass("active");
	});

	$(".info__tab").click(function(){
		var thisId = $(this).attr("data-id");
		$(this).addClass("active").siblings().removeClass("active");
		$(".info__info_"+thisId).show().siblings(".info__info").hide();
	});

	$('.modal-run').click(function(event){
		event.preventDefault();
		var dataId = $(this).attr("data-id");
		var modalH2 = $(".modal-cont-" +dataId ).height();
		$(".modal-cont-" +dataId ).css({
			'marginTop': -modalH2/2
		});
		$(".overlay").fadeIn(600,function(){
			$(".modal-cont-" +dataId )
				.css('z-index', '9999')
				.animate({opacity: 1,top: "45%"},200)
		});
	});
	$('.modal-close,.overlay').click(function(){
		$(".modal-cont").animate({opacity: 0, top:"45%"}, 200,
			function(){
				$(this).css('z-index', '-1'); 
				$('.overlay').fadeOut(400);
			}
		);
	});

	$(".header__toggle").click(function(){
		$(".navigation").slideToggle();
		$(this).toggleClass("open");
	});

	var windWidth = $(window).width();
	if(windWidth < 768){
		$(".prod__heading").prependTo(".prod .wrapper");
		$(".anchor").click(function(){
			event.preventDefault();
	        var id = $(this).attr('href')
	          , top = $(id).offset().top;
	        $('body,html').animate({
	            scrollTop: top - 70
	        }, 1000);
	        $(".header__toggle").slideClass("open");
	        $(".navigation").slideToggle();
		});
	}

	$(".anchor").click(function(){
		event.preventDefault();
        var id = $(this).attr('href')
          , top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top - 70
        }, 1000);
	});

	$(".comment__show").click(function(){
		$(this).remove();
		$(".comment2__wrapper").addClass("active");
	});

	$(".pagination__item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var thisId = $(this).attr("data-id");
		$(".comment2__box_"+thisId).addClass("active").siblings(".comment2__box").removeClass("active");
	});

	/*Phone mask*/
	$("input[name=phone]").mask('+38 (000) 000-00-00', {
		clearIfNotMatch: true
	});

	$('input[name=phone]').click(function () {
      $( this ).val('+38 (0');
    });

	$('[name="sendForm1"]').on('click', function(ev){
	ev.preventDefault();
	el = $(this), form = el.closest('form'), us_name = form.find('[name="us_name"]'), phone = form.find('[name="phone"]');
	if(us_name.val()){
	if(phone.val()){
	$.post('/send.php', {type: 0, us_name: us_name.val(), phone: phone.val()}, function(data){
	data = $.parseJSON(data);
	if(data.success){
	us_name.val('');
	phone.val('');
	alert(data.success);
	} else if(data.error) alert(data.error);
	});		
	} else phone.focus();	
	} else us_name.focus();
	});
	
	$('[name="sendForm3"]').on('click', function(ev){
	ev.preventDefault();
	el = $(this), form = el.closest('form'), us_name = form.find('[name="us_name"]'), phone = form.find('[name="phone"]'), city = form.find('[name="town"]'), otdelenie = form.find('[name="post"]'), sposob = form.find('[name="paymethod"]'), comment = form.find('[name="comment"]');
	if(us_name.val()){
	if(phone.val()){
	tovar = $('#itemname').text();
	$.post('/send.php', {type: 1, us_name: us_name.val(), phone: phone.val(), city: city.val(), otdelenie: otdelenie.val(), sposob: sposob.val(), comment: comment.val(), tovar: tovar}, function(data){
	data = $.parseJSON(data);
	if(data.success){
	us_name.val('');
	phone.val('');
	city.val('');
	otdelenie.val('');
	sposob.val('');
	comment.val('');
	alert(data.success);
	} else if(data.error) alert(data.error);
	});		
	} else phone.focus();	
	} else us_name.focus();
	});



});