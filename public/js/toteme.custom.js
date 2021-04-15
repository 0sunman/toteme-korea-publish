var Util = function(){}

Util.prototype.registerEvent = function(option){

    
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
                $(this).siblings().eq(0).toggleClass("is-active")
            })
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
new SiteController();


/* 퍼블리싱 사이트용 커스텀 영역 */
var changeURLList = [{ old : "", new : ""}]

/* // 퍼블리싱 사이트용 커스텀 영역 */