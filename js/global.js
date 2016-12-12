var lettersRU = 'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъыьЭэЮюЯя',
	lettersEN = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
	numbers = '0123456789'
	w = $(window),
	body = $('body'),
	popup = $('#popup'),
	popupContainer = ('#popup .container'),
	popupClose = $('#popup .close'),
	popupForm = $('#popup .form'),
	popupMessage = $('#popup .message'),
	speed = 400;

$('.caret > li > a').click(function() {
	$(this).removeAttr('href');
	var ul = $(this).siblings('ul');
	ul.slideToggle(400);
});

$('button#sticks').click(function() {
	$(this).toggleClass('close');
});


$('input[name=tel]').mask("+7 (999) 999-99-99");

$('.btn-group input').on('keyup keypress', function(e) {
	return (numbers.indexOf(String.fromCharCode(e.which))!=-1);
});

$('input[name=email]').on('keyup keypress', function(e) {
    var lettersNew = lettersEN + "@-._";
	return (lettersNew.indexOf(String.fromCharCode(e.which))!=-1);
});

function abs(object) {
	var scrollTop = body.scrollTop(),
    	height = body.height();
	object.css('padding-top', scrollTop+20).fadeIn(speed).height(height-scrollTop-20);
}

$('.ya-soglasen a').click(function() {
	$(this).removeAttr('href');
	abs(popup);
});

popupClose.click(function() {
	popup.fadeOut(speed);
});

popupForm.find('form').submit(function() {
	$.ajax({
	    type: "POST",
	    url: "/order.php",
	    data: $(this).serialize()
	}).done(function() {
	    popupForm.css('display','none');
	    popupMessage.css('display','block');
	});
	return false;
});

// $('#header').parallax({imageSrc: '/img/bg.jpg'});


$('#questions .item').click(function() {
	var answer = $(this).find('.answer');
	var icon = $(this).find('.icon');
	answer.slideToggle(300).toggleClass('open');
	if (answer.hasClass('open')) {
		icon.html('-')
	}else{
		icon.html('+')
	}

});

function plus() {
	var whereInput = $('.btn-numbers').find('input'),
		object = $('.btn-numbers').find('.plus');
	object.click(function() {
		var value = Number(whereInput.val());
		whereInput.val(value + 1);
	});
}

function minus() {
	var whereInput = $('.btn-numbers').find('input'),
		object = $('.btn-numbers').find('.minus');
	object.click(function() {
		var value = Number(whereInput.val());
		if (value > 1) {
			whereInput.val(value - 1);
		}
	});
}

plus();
minus();

function all_item() {
	var id1 = $('.id-1-2'),
		id2 = $('.id-2-2').clone().html(),
		id3 = $('.id-3-2').clone().html(),
		id4 = $('.id-4-2').clone().html();
	id1.html(id2+id3+id4);
}

all_item();

function caret(nav, item) {
	var newNav = nav.removeAttr('href');
	if(newNav.hasClass('select')){
		item.show(400);
	} 
	newNav.click(function() {
		$('#lounge a').removeClass('select');
		newNav.addClass('select');
		$('#lounge .item').slideUp(400);
		item.slideDown(400);
		// if(newNav.hasClass('select')){
		// 	item.show();
		// }
	});
}

caret($('.id-1-1'), $('.id-1-2'));
caret($('.id-2-1'), $('.id-2-2'));
caret($('.id-3-1'), $('.id-3-2'));
caret($('.id-4-1'), $('.id-4-2'));


 
$(document).ready(function(){

	$("#nav .menu, #questions, #advantages").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

	$("header .header__menu").clone().appendTo("#sidr");
	$("header .header__tel").clone().appendTo("#sidr");

});

$(".btn_mnu").click(function () {
		$(this).toggleClass("active");
		$(".left_side").toggleClass("active");
	});

$('#menu-button').sidr('toggle', 'sidr');

$(window).resize(function () {
	$.sidr('close', 'sidr');
	$(".btn_mnu").removeClass("active");
});

$('#sidr .menu__link').click(function () {
  var target = $(this.hash);
  $.sidr('close', 'sidr');
  $(".btn_mnu").removeClass("active");
  $('html,body').animate({
    scrollTop: target.offset().top
  }, 1000);
});

var inputSoglasen = $('.ya-soglasen input'),
	btn = $('#offer .btn-group .btn');
function ya_soglasen() {
	if (inputSoglasen.prop("checked")){
		btn.removeClass('disabled').removeAttr('disabled');
	} else{
		btn.addClass('disabled').prop({disabled: true});
	}
}

inputSoglasen.change(function(){
	ya_soglasen();
});
ya_soglasen();


$('#lounge .images').slick({
	dots: true
});
