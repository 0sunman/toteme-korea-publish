$(function(){
	//modal toggle
	$('.modal_trigger').on('click', function(){
		var modal_name = $(this).attr('data-modal');
		$('.'+modal_name).addClass("is-active");
		$('body').css('overflow','hidden');
	});
	// modal close
	$('.modal__close').on('click', function(){
		$(this).parents('.modal').removeClass("is-active");
		$('body').css('overflow','');
	});
	$(document).on('mouseup', function (e){
		var modal = $(".modal__card");
		if(modal.has(e.target).length === 0){
				modal.parents('.modal').removeClass("is-active");
				$('body').css('overflow','');
		}
	});

	//전화번호 추가
	$('.phone_form .btn_plus').on('click', function(){
		$(this).parents('.phone_form').siblings('.input_phone_plus').toggleClass("active");
	});
	$('.field__input--select').on('change', function() {
		if($(this).val() == "direct"){
				$(this).next('.input-block.direct_input').addClass('active');
		}else{
				$(this).next('.input-block.direct_input').removeClass('active');
		}
	});

	//아코디언
	$('.accordion__control').on('click', function(){
		$(this).parents('.accordion__item').toggleClass('is-active').siblings().removeClass('is-active');
	});

	//mobile 주문 상세보기 toggle
	$('.order-summary').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function () {
		$(this).removeClass("order-summary--transition").removeAttr("style");
	});
	$('.order-summary-toggle').on('click', function(){
		var thisH, conH, aniH;
		$('.order-summary').wrapInner("<div />"),
						thisH = $('.order-summary').height(),
						conH = $('.order-summary').find('>div').height(),
						aniH = 0 === thisH ? conH : 0,
						$('.order-summary').find("> div").contents().unwrap();
		
		$(this).toggleClass("order-summary-toggle--show order-summary-toggle--hide");
		$('.order-summary').addClass("order-summary--transition").toggleClass("order-summary--is-expanded order-summary--is-collapsed").css("height", aniH);
	});

	//할인코드 toggle
	$('.discount-trigger .button').on('click', function(){
		$(this).parents('.order-summary__section--discount').addClass('enable-form')
	});
	$('.order-summary__section--discount .field__input').on("propertychange change keyup paste input", function() {
		var btn = $(this).parents('.field__input-btn-wrapper').children('.order-summary__section--discount .field__input-btn'),
						className = 'btn--disabled';
		$(this).val() ? btn.removeClass(className) : btn.addClass(className);
	});

	//결제 타입 선택
	$('.payment_type input').on('click', function(){
		var type = $(this).attr('data-type');
		$(this).parents('.payment_type').find('.payment_con_box .'+type).addClass('active').siblings().removeClass('active');
	});

	//카드 선택 시 contents 변경
	$('.payment_type1 .radio_input').on('click', function(){
		var card_attr=$(this).attr('data-card-attr');
		if ( card_attr==undefined ){
			$('.card_type_box>div').removeClass('active');
		}
		$(this).parents('.payment_type1').find('.card_type_box .'+card_attr).addClass('active').siblings().removeClass('active');
	});

	//현금영수증 선택 시 contents 변경
	$('.cash_receipt_box .radio_input').on('click', function(){
		var receipt_attr=$(this).attr('data-receipt');
		if ( receipt_attr==undefined ){
			$('.receipt_type_box>div').removeClass('active');
		}
		$(this).parents('.cash_receipt_box').find('.receipt_type_box .'+receipt_attr).addClass('active').siblings().removeClass('active');
	});

	//무통장입금 선택 후 결제하기 버튼 클릭 시 modal popup
	$('.checkout__main .payment_btn').on('click', function(){
		if( $('.payment_type input[data-type=payment_type2]').prop('checked') ){
			$('.bank_account-modal').addClass('is-active');
		}
	});



	/******** 상품 ********/
	// 상품 필터
	$('.template-collection__filter-toggle').on('click', function(){
		$(this).parents('.template-collection__header-container').toggleClass('is-collapsed');
	});
	$('.boost-pfs-filter-button').on('click', function(){
		$(this).parent('.boost-pfs-filter-option-item').toggleClass('selected');
		var filter_count = $('.boost-pfs-filter-option-item.selected').length;

		$('.boost-pfs-filter-option-item').each(function(){
				if ( $('.boost-pfs-filter-option-item').hasClass('selected') ){
				$('.boost-pfs-filter-clear-all').addClass('is-active');
				$('.template-collection__filter-count').text(filter_count);
		}else{
				$('.boost-pfs-filter-clear-all').removeClass('is-active');
				$('.template-collection__filter-count').text('');
		}
		});
	});
	//상품 필터 초기화
	$('.boost-pfs-filter-clear-all').on('click', function(){
		$(this).removeClass('is-active');
		$('.boost-pfs-filter-option-item').removeClass('selected');
		$('.template-collection__filter-count').text('');
	});
	//상품 디스플레이 타입
	$('.template-collection__display-type').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		var display_type = $(this).attr('data-type');
		if (display_type == 'grid'){
				$('.card-grid__item').removeClass('card-grid__item--large');
		}else{
				$('.card-grid__item').addClass('card-grid__item--large');
		}
	});
	//PDP 상품이미지 슬라이드
	window.addEventListener('load', () => {
		if ( $('.product-gallery__featured-carousel').length > 0 ){
				const galleryTop = new Swiper('.product-gallery__featured-carousel', {
					loop: true,
					autoHeight: true,
					pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							clickable: true,
					},
			});
			$(".product-gallery__thumbnail").on('click', function(){
					galleryTop.slideTo($(this).index()+1, 300);
					return false;
			});
		}
	}, false);
	$(window).resize(function(){ galleryTop.update(); });
	//PDP 상품이미지 슬라이드_썸네일
	$(".product-gallery__thumbnail-carousel").on('scroll', function(){
		var thumb_box = $(this),
						btn_arr_down = thumb_box.siblings(".product-gallery__thumbnail-button");
		thumb_box.scrollTop() === thumb_box.prop('scrollHeight') - thumb_box.outerHeight() ? btn_arr_down.addClass("is-hidden") : btn_arr_down.removeClass("is-hidden");
	});
	$(".product-gallery__thumbnail-button").on('click', function(){
		var current_scroll = $(this).siblings(".product-gallery__thumbnail-carousel").scrollTop(),
						item_height = $(".product-gallery__thumbnail-image").height();
		$(this).siblings(".product-gallery__thumbnail-carousel").stop().animate({scrollTop:current_scroll+item_height},300);
	});
	//PDP 상품 사이즈 Select 옵션 별 button 변경
	arr1 = new Array();
	$("#OptionSelector-main option").each(function(index){
		arr1.push($(this).text().trim());
		$(this).attr('data-select',arr1[index]);
	});
	$("#OptionSelector-main").on("change", function(){
		var selectData = $(this).find('option:selected').attr('data-select'),
						orgSelectTxt = $(this).find('option:selected').text();

		if( selectData.indexOf('품절') != -1 ){
				$('.coming-soon>.form-group--inline-animated').removeClass("is-hidden");
				$('.product-form__add-to-cart>button.button').addClass("is-hidden");
				var selectTxt;
				selectTxt = orgSelectTxt.replace(" - 알림 설정","");
				$(this).siblings('.custom-select__label').text(selectTxt);
		}else{
				$(this).siblings('.custom-select__label').text(orgSelectTxt);
				$('.product-form__add-to-cart>button.button').removeClass("is-hidden").addClass("is-active").attr("disabled",false);
				$('.product-form__actions .label-select-size, .coming-soon>.form-group--inline-animated').addClass("is-hidden");
		}
	});
	$('.coming-soon input[type="submit"].button').on('click', function(){
		$(this).siblings('.form-group__message').removeClass('is-hidden');
		$(this).siblings('.form-group__fade-text').addClass('is-hidden');
	});
	//PDP 상품 컬러 button - list toggle
	$('.product-form__swatch-button').on('click', function(){
		$(this).parent('.product-form__swatch').toggleClass('is-active');
		$('.product-form__swatch-list')[0].getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight) && $('.product-form__swatch-list')[0].scrollIntoView(!1);
		return false;
	}).focusout(function(){
		$(this).parent('.product-form__swatch').removeClass('is-active');
	});
	//PDP 상품 아코디언
	$('.accordion__control').on('click', function(){
		$(this).parents('.accordion__item').toggleClass('is-active').siblings().removeClass('is-active');
	});
	//PDP cm inch 탭
	$('.size-guide__unit-toggle').on('click', function(){
		$(this).addClass('is-active').siblings().removeClass('is-active');
		var unit = $(this).attr('data-unit');
		$('.size-guide__table-container').attr('data-show-unit',unit);
	});
}); //JQuery End