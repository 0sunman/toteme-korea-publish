var Util = function(){}

Util.prototype.registerEvent = function(option){

    this.isFirstPointStack = true;
    this.pointStack = -1;
    
    function resetLeftMenu(){ // 모든 메뉴를 리셋시킵니다.
        $("button[data-left-header-button-type]").each(function(idx,ele){
            var targetId = $(ele).data("leftHeaderButtonType");     
            $("body").removeClass("drawer--open--blur");
            $("#"+targetId).removeClass("is-active");
        })
    }


    switch(option.cmd){                              
        case "showRightMenu" :
            /*
            제목 : 우측 메뉴 이벤트
            설명 : 데스크탑 우측 메뉴가 노출되는 발생하는 이벤트입니다.
            */

            $(option.element).on('click',(function(target){ // 이벤트 클릭시 발생함.
                var $target = $("#"+option.target);

                if($target.hasClass("is-active")){ // 액티브 일 경우
                    this.resetSubFunction();
                }else{
                    this.resetSubFunction();
                    $("body").addClass("drawer--open--blur");
                    $target.addClass("is-active");
                }
            }).bind(this)); 

            // 우측 메뉴 이벤트 끝
        break;


        case "showLeftMenu":
            /*
            제목 : 좌측 메뉴 이벤트
            설명 : 모바일 우측 메뉴가 노출되는 발생하는 이벤트입니다.
            */
            
            $(option.element).on('click',(function(){ // 이벤트 클릭시 발생함.
                var $target = $("#"+option.target);
                if($target.hasClass("is-active")){ // 액티브 일 경우
                    resetLeftMenu(); // 모두 리셋
                }else{
                    resetLeftMenu(); // 리셋 후 액티브
                    $("body").addClass("drawer--open--blur");
                    $target.addClass("is-active");
                }
                }).bind(this)); 

            // 우측 메뉴 이벤트 끝
        break;

        case "showMobileMenu":
            $(option.element).on("click",(function(){  
                if($("html.js-menu-active").length >= 1){
                    this.resetSubFunction();
                }else{
                    this.resetSubFunction();
                    $("html").addClass("js-menu-active")
                    $("body").addClass("drawer--open--blur").addClass("overflow-hidden")
                    $("#menuDrawer").addClass("is-active")
                    $(".site-header__hamburger .site-header__icon.site-header__icon--menu").addClass("is-active")    
                }
                
            }).bind(this))

            $("#menuDrawer ul.menu-drawer__menu > li.menu-drawer__item > button.menu-drawer__button").on("click",function(){
                $(this).toggleClass("is-active")
                $(this).siblings().eq(0).toggleClass("is-active")
            })
        break;

        case "arrowEvent":
            /* 한국 애로우 변경 */
            
            $("#MainContent ul.navlist").parent().mouseover((function(e){ 
                if(this.isFirstPointStack){
                    $("#MainContent ul.navlist li").each((function(idx,ele){
                        if($(ele).find(".is-active").length > 0 || $(ele).find(".text-link--static").length > 0){
                            this.pointStack = idx;
                        }
                    }).bind(this));    
                    console.log("isFirst : "+this.pointStack);   
                    this.isFirstPointStack=false; 
                }                
                
                
                $("#MainContent ul.navlist li a.is-active").removeClass("is-active");
                $("#MainContent ul.navlist li a.text-link--static").removeClass("text-link--static");
            }.bind(this)));
                
                $("#MainContent ul.navlist").parent().mouseleave((function(e){  
                    $("#MainContent ul.navlist li:nth-child("+(this.pointStack+1)+") a").addClass("is-active"); 
                }).bind(this))
            /* // 한국 애로우 변경 */
        break;


        
        case "activeModal":
            //modal toggle
            $(document).on('click', '.modal_trigger', function(){
                var modal_name = $(this).attr('data-modal');
                $('.'+modal_name).addClass("is-active");
                $('body').css('overflow','hidden');
            });
            // modal close
            $(document).on('click', '.modal__close', function(){
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
        break;

        case "orderEvent":
            //전화번호 추가
            $(document).on('click', '.phone_form .btn_plus', function(){
                $(this).parents('.phone_form').toggleClass("active");
            });
            $('.toteme-select-style').on('change', function() {
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

            //할인코드 입력 결과
            $('[data-deposit]').on('click', function(){
                $(this).parents('.field__input-btn-wrapper').addClass('deposit_active');
            });
            $('.btn_deposit').on('click', function(){
                $(this).parents('.order-summary__section--discount').removeClass('enable-form');
                $(this).parents('.field__input-btn-wrapper').removeClass('deposit_active');
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
            
            //주소 선택, 추가 toggle
            $('[data-address]').on('click', function(){
                var data_address=$(this).attr('data-address');
                $('.address_wrap .'+data_address+'_box').addClass('active').siblings().removeClass('active');
            });
            
            // 주소 수정 toggle
            var changeHTML = $('.address_change_box').clone();
            $('[data-address-change]').on('click', function(){
                var thisWrap = $(this).parents('.address_each'),
                        openClass = 'change_open',
                        cloneBox = '.address_change_box';
                if ( !thisWrap.hasClass(openClass) ){
                    thisWrap.addClass(openClass).append(changeHTML).siblings().removeClass(openClass).find(cloneBox).remove();
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
            window.addEventListener('load', (function(){
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
                    $(window).resize(function(){ galleryTop.update(); });
                }
            }).bind(this), false);
            
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
            //PDP cm inch 탭
            $('.size-guide__unit-toggle').on('click', function(){
                $(this).addClass('is-active').siblings().removeClass('is-active');
                var unit = $(this).attr('data-unit');
                $('.size-guide__table-container').attr('data-show-unit',unit);
            });
            //주소검색 팝업_N개 도로명주소 매칭
            $('.btn_addr_standard').on('click', function(){
                $('.standard_addr_box').addClass('is-active').siblings('.address_modal_container').addClass('is-hidden');
            });

        break;
        

        case "zoomImage":            
            if($('.product-gallery__featured-image').length > 0){
                var zoomImages = $('.product-gallery__featured-image').find("img"); 
                zoomImages.each(function() { $(this).imageZoom({zoom:200}); });
            }
        break;
    
    
    }
}



/* 기타 함수 */
Util.prototype.resetSubFunction = function(){

    $("button[data-right-header-button-type]").each(function(idx,ele){
      //  debugger;
        var targetData = $(ele).data("rightHeaderButtonType");
        $("html").removeClass("js-menu-active")
        $("body").removeClass("drawer--open--blur").removeClass("overflow-hidden");
        $("#"+targetData).removeClass("is-active");

        
        $("#menuDrawer").removeClass("is-active")
        $(".site-header__hamburger .site-header__icon.site-header__icon--menu").removeClass("is-active")   
    })
}
/* // 기타 함수 */

var utilInstance = new Util();

var SiteController = function(){
    this.initRightMenu();
    this.initMobileMenu();

    /* 20210430 애로우 수정 요청 */
    this.initListPointerArrow();
    /* // 20210430 애로우 수정 요청 */

    this.initModalPopup();
    this.initOrderEvent();
    this.initZoomImage();
}


/* 초기화 함수 */

SiteController.prototype.initMobileMenu = function(){
    utilInstance.registerEvent({cmd:"showMobileMenu", element:"#mobileMenu"});    
}

SiteController.prototype.initRightMenu = function(){
    $("button[data-right-header-button-type]").each(function(idx,ele){
        var targetId = $(ele).data("rightHeaderButtonType");                        
        utilInstance.registerEvent({cmd:"showRightMenu", target:targetId, element:ele});        
        // data-header-button-type에 버튼 ID를 입력하면, 우측 메뉴 이벤트가 작동됩니다.             
    })
}

SiteController.prototype.initModalPopup = function(){
    utilInstance.registerEvent({cmd:"activeModal"});    
}

SiteController.prototype.initListPointerArrow = function(){   
    utilInstance.registerEvent({cmd:"arrowEvent"});    
}


SiteController.prototype.initOrderEvent = function(){
    utilInstance.registerEvent({cmd:"orderEvent"});    
}

SiteController.prototype.initZoomImage = function(){
    utilInstance.registerEvent({cmd:"zoomImage"});    
}


/* // 초기화 함수 */

new SiteController();


/* 퍼블리싱 사이트용 커스텀 영역 */
var changeURLList = [
    { old : "/product2"                 , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/shop_scarves.ejs.html"},
    { old : "/products/"                , new : "https://0sunman.github.io/toteme-korea-publish/dist/03_product/01_product_detail.ejs.html"},
    { old : "/new-in"                   , new : "https://0sunman.github.io/toteme-korea-publish/dist/03_product/02_product_list.ejs.html"},
    { old : "/uniforms"                 , new : "https://0sunman.github.io/toteme-korea-publish/dist/06_page_uniforms/01_uniforms_1depth.ejs.html"},
    { old : "/pages/uniform-"           , new : "https://0sunman.github.io/toteme-korea-publish/dist/06_page_uniforms/02_uniforms_2depth.ejs.html"},
    { old : "/spring-uniforms"          , new : "https://0sunman.github.io/toteme-korea-publish/dist/06_page_uniforms/01_uniforms_1depth.ejs.html"},
    { old : "/summer-uniforms"          , new : "https://0sunman.github.io/toteme-korea-publish/dist/06_page_uniforms/01_uniforms_1depth.ejs.html"},
    { old : "/coming-soon"              , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/shop_silk.ejs.html"},
    { old : "/our-story"                , new : "https://0sunman.github.io/toteme-korea-publish/dist/05_page_about/01_about_toteme.ejs.html"},
    { old : "/questions-1"              , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/01_page_covid.ejs.html"},
    { old : "/scarves"                  , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/shop_scarves.ejs.html"},
    { old : "int.toteme-studio.com"     , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/index2.ejs.html"},
    { old : "/product2"                 , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/shop_scarves.ejs.html"},
    { old : "/pages/our-story"          , new : "https://0sunman.github.io/toteme-korea-publish/dist/05_page_about/01_about_toteme.ejs.html"},
    { old : "/pages/stores"             , new : "https://0sunman.github.io/toteme-korea-publish/dist/05_page_about/02_about_store.ejs.html"},
    { old : "/pages/sustainability"     , new : "https://0sunman.github.io/toteme-korea-publish/dist/05_page_about/03_about_sustainability.ejs.html"},
    { old : "/pages/careers"            , new : "https://0sunman.github.io/toteme-korea-publish/dist/05_page_about/04_about_careers.ejs.html"},
    { old : "/pages/covid-19-faq"       , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/01_page_covid.ejs"},
    { old : "/pages/payments"           , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/02_page_payment.ejs"},
    { old : "/pages/shipping"           , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/03_page_shipping.ejs"},
    { old : "/pages/return"             , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/04_page_returns.ejs"},
    { old : "/pages/order-tracking"     , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/05_page_order_tracking.ejs"},
    { old : "/pages/store-pick-up"      , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/06_page_storepickup.ejs"},
    { old : "/pages/coming-soon"        , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/07_page_comingsoon.ejs"},
    { old : "/pages/privacy-policy"     , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/08_privacypolicy.ejs"},
    { old : "/pages/cookie-policy"      , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/09_cookiepolicy.ejs"},
    { old : "/pages/terms-conditions"   , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/10_termconditions.ejs"},
    { old : "/pages/contact"            , new : "https://0sunman.github.io/toteme-korea-publish/dist/04_page_question/11_contact.ejs"},
    { old : "/collections/product"      , new : "https://0sunman.github.io/toteme-korea-publish/dist/03_product/02_product_list.ejs.html"},
]



setTimeout(function(){
    $("a").each(function(idx,ele){
        try{
            var hrefText = $(ele).attr("href");
            changeURLList.forEach(function(data){
                if(hrefText.indexOf(data.old) > -1){
                    $(ele).attr("href",data.new)
                }
    
            })
        }catch(e){

        }

    })
 },100)

/* // 퍼블리싱 사이트용 커스텀 영역 */





function showOrhideArray(option){
    /* 
       설명 : Array로 받은 css를 모두 hide or show를 합니다.
       매개변수 :
       - 타입 : JSON
       - 변수 설명
          array : array | CSS Selector
          show : bool | 보여주기 true, 숨김 false
    */
    if(!option){
       alert("showOrhideArray : Array가 필요합니다.");
       return false;
    }
    $(option.array).each((function(idx,element){
       if(option.show == false){
          $(element).hide();
       }else{
          $(element).show();
       }
    }).bind(this));
    if(option.end == true){
       return true;         
    }
    return showOrhideArray;
 }



 /*
    LoginJoinObjects

    - 속성값 
       name : 객체의 이름
       description : 설명
       selector : 타켓의 셀렉터
       event : 이벤트
       listner : 이벤트의 리스너
 */
 var LoginJoinObjects = [
    /* 이메일인증 */
    {  name:"EmailAuthRadio", description:"이메일 - 인증 라디오 버튼", selector:".simple_auth .sns-buttons input[type=radio]", event:"click", listner:actionAuthRadio },
    {  name:"EmailAuthStep2Button", description:"이메일 - 1단계 버튼 : 동의하고 인증하기",selector:".simple_auth .button-block.agree-button > input", event:"click", 
       listner:function(){
          /* TODO */
          showOrhideArray({
             array:[".emailInfo > .step2", ".confirm_button > .step2"],show:true})({ // show
             array:[".emailInfo > .step1", ".confirm_button > .step1"],show:false,   // hide
             end:true
          })
          /* TODO */            
       }
    },
    {  name:"EmailAuthStep3Case1", description:"이메일 - 2단계 버튼 : 인증메일 재발송", selector:".simple_auth .button-block.resend-button > input", event:"click", 
       listner:function(){
          /* TODO */
          showOrhideArray({
             array:[".emailInfo > .step3", ".emailInfo > .step3 > p.resend"],show:true})({
             array:[".emailInfo > .step2", ".emailInfo > .step3 > p.fail"],show:false, 
             end:true
          })
          /* TODO */
       }
    },
    {  name:"EmailAuthStep3Case2", description:"이메일 - 2단계 버튼 : 인증 완료 버튼", selector:".simple_auth .button-block.email-complete-button > input ", event:"click", 
       listner:function(){
          /* TODO */
          showOrhideArray({
             array:[".emailInfo > .step3", ".emailInfo > .step3 > p.fail"],show:true})({
             array:[".emailInfo > .step2", ".emailInfo > .step3 > p.resend"],show:false, 
             end:true
          })
          /* TODO */
       }
    },
    {  name:"PhoneAuthRadio", description:"핸드폰 - 1단계", selector:".simple_auth .button-block > .email-complete-button", event:"click", 
       listner:function(){
          /* TODO */
          showOrhideArray({
             array:[".emailInfo > .step3", ".emailInfo > .step3 > p.fail"],show:true})({
             array:[".emailInfo > .step2", ".emailInfo > .step3 > p.resend"],show:false, 
             end:true
          })
          /* TODO */
       }
    }
    /* // 이메일인증 */
 ]


 function actionAuthRadio(){
    $(".simple_auth .tab").hide();
      
    var authType = $("input:radio[name='radio_auth']:checked").val();
    switch(authType){
       case "email":
          $(".tab.auth-mail").show();
       break;
       case "phone":
          $(".tab.auth-phone").show();
       break;
       case "kakao":
          /* TODO */
          debugger;
       break;
       
       case "facebook":
          /* TODO */
          debugger;
       break;
       
       case "google":
          /* TODO */
          debugger;
       break;
    }
 }

 setTimeout(function(){
    
    LoginJoinObjects.forEach(function(element){
       $(document).on(element.event, element.selector, element.listner.bind(this));
    })
    if($(".simple_auth").length > 0){
        showOrhideArray({
            array:[
               ".simple_auth .tab.auth-mail", ".simple_auth .tab.auth-phone",
               ".simple_auth .emailInfo > .step2", ".simple_auth .confirm_button > .step2",
               ".simple_auth .emailInfo > .step3", ".simple_auth .emailInfo > .step3 p"
            ], show:false})
    }

    
 },100)
