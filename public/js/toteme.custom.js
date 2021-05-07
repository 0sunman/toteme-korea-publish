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
        break;
    }

    
    
}

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

var utilInstance = new Util();

var SiteController = function(){
    this.initRightMenu();
    this.initMobileMenu();
    
    /* 20210430 애로우 수정 요청 */
    this.initListPointerArrow();

    this.initModalPopup();
}

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
    { old : "int.toteme-studio.com"     , new : "https://0sunman.github.io/toteme-korea-publish/dist/00_main/index.ejs.html"},
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
        var hrefText = $(ele).attr("href");
        changeURLList.forEach(function(data){
            if(hrefText.indexOf(data.old) > -1){
                $(ele).attr("href",data.new)
            }

        })
    })
 },100)

/* // 퍼블리싱 사이트용 커스텀 영역 */

