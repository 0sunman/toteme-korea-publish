
var Util = function(){}

Util.prototype.registerEvent = function(option){
    console.log("TEST");
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

           function resetLeftMenu(){ // 모든 메뉴를 리셋시킵니다.
                $("button[data-left-header-button-type]").each(function(idx,ele){
                    var targetId = $(ele).data("leftHeaderButtonType");     
                    $("body").removeClass("drawer--open--blur");
                    $("#"+targetId).removeClass("is-active");
                })
            }

            
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
    }
}

Util.prototype.resetSubFunction = function(){
    $("button[data-right-header-button-type]").each(function(idx,ele){
      //  debugger;
        var targetData = $(ele).data("rightHeaderButtonType");
        $("body").removeClass("drawer--open--blur");
        $("#"+targetData).removeClass("is-active");
    })
}

var utilInstance = new Util();

var SiteController = function(){
    this.initRightMenu();
}

SiteController.prototype.initRightMenu = function(){
    $("button[data-right-header-button-type]").each(function(idx,ele){
        var targetId = $(ele).data("rightHeaderButtonType");                        
        utilInstance.registerEvent({cmd:"showRightMenu", target:targetId, element:ele});        
        // data-header-button-type에 버튼 ID를 입력하면, 우측 메뉴 이벤트가 작동됩니다.             
    })
}
new SiteController();