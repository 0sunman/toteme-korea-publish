const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');
const path = require('path');
const fs = require('fs');
var fse = require('fs-extra');
const axios = require('axios');


// 라이브 서버 설정
const liveServer = livereload.createServer({
    exts: ['html', 'css', 'ejs','js'],
    debug: true
});

liveServer.watch(__dirname);

const http = require('http');
const express = require('express');
const ejs = require('ejs');
const { Console } = require('console');

const app = express();
const server = http.createServer(app);
 
const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(livereloadMiddleware());

const State = {
  done : "DONE"
}

const pageData = [
  {"type":"index", "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "url" : "/00_main/0", "pageurl" : "00_main/list.ejs", "title":"퍼블리스트", "isMain":true},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "url" : "/00_main/1", "pageurl" : "00_main/index.ejs", "title":"Component Guide"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Main2","url" : "/00_main/11", "pageurl" : "00_main/index2.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Guidelines for Input (error,commit..etc)","url" : "/00_main/2", "pageurl" : "00_main/inputguide.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Display Page Type 01 (2–4 columns) ","url" : "/00_main/3", "pageurl" : "00_main/shop_scarves.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Display Page Type 02 (1-2–4 columns)","url" : "/00_main/4", "pageurl" : "00_main/shop_silk.ejs"},

  {"type":"join", "pid":"T-LJ-001",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-001.ejs.html",   "pageurl" : "02_login_join/T-LJ-001.ejs",   "title": "T-LJ-001. Sign-in", "title2":"로그인"},
  {"type":"join", "pid":"T-LJ-002",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-002.ejs.html",   "pageurl" : "02_login_join/T-LJ-002.ejs",   "title": "T-LJ-002. Order status (Guest)", "title2":"비회원 주문조회"},
  {"type":"join", "pid":"T-LJ-004",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-004.ejs.html",   "pageurl" : "02_login_join/T-LJ-004.ejs",   "title": "T-LJ-004. Find my ID", "title2":"아이디찾기"},
  {"type":"join", "pid":"T-LJ-005",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-005.ejs.html",   "pageurl" : "02_login_join/T-LJ-005.ejs",   "title": "T-LJ-005. Reset my paswword_Input my data", "title2":"비밀번호 찾기 - 정보 입력"}, // 완료
  {"type":"join", "pid":"T-LJ-006",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-006.ejs.html",   "pageurl" : "02_login_join/T-LJ-006.ejs",   "title": "T-LJ-006. Reset my paswword_Confirmation email sent", "title2":"비밀번호 찾기 - 이메일 인증"}, // 완료
  {"type":"join", "pid":"T-LJ-007",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-007.ejs.html",   "pageurl" : "02_login_join/T-LJ-007.ejs",   "title": "T-LJ-007. Reset my paswword_Email confirmed", "title2":"비밀번호 찾기 - 이메일 인증 - (테이블과 팝업)"}, // 완료
  {"type":"join", "pid":"T-LJ-008",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-008.ejs.html",   "pageurl" : "02_login_join/T-LJ-008.ejs",   "title": "T-LJ-008. Reset my paswword_Certification via mobile phone", "title2":"비밀번호 찾기 - 휴대폰 인증"}, // 완료
  {"type":"join", "pid":"T-LJ-009",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-009.ejs.html",   "pageurl" : "02_login_join/T-LJ-009.ejs",   "title": "T-LJ-009. Reset my paswword_Input new password", "title2":"비밀번호 찾기 - 새 비밀번호 입력"}, // 완료
  {"type":"join", "pid":"T-LJ-010",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-010.ejs.html",   "pageurl" : "02_login_join/T-LJ-010.ejs",   "title": "T-LJ-010. Reset my password_Change my password", "title2":"비밀번호 찾기 - 비밀번호 변경"}, // 완료
  {"type":"join", "pid":"T-LJ-011",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-011.ejs.html",   "pageurl" : "02_login_join/T-LJ-011.ejs",   "title": "T-LJ-011. Reset my password_Change my password_Done", "title2":"비밀번호 찾기 - 비밀번호 변경 완료"}, // 완료
  {"type":"join", "pid":"T-LJ-012",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-012.ejs.html",   "pageurl" : "02_login_join/T-LJ-012.ejs",   "title": "T-LJ-012. Reset my paswword_Old password update", "title2":"비밀번호 찾기 - 90일 이상 사용 비밀번호 변경"}, // 완료
  {"type":"join", "pid":"T-LJ-014",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-014.ejs.html",   "pageurl" : "02_login_join/T-LJ-014.ejs",   "title": "T-LJ-014. Reset my paswword_Old password update_done", "title2":"비밀번호 찾기 - 90일 이상 사용 비밀번호 변경 - 비밀번호 변경 완료"}, //
  {"type":"join", "pid":"T-LJ-015",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-015.ejs.html",   "pageurl" : "02_login_join/T-LJ-015.ejs",   "title": "T-LJ-015. Create my account_Certification", "title2":"회원가입 - 간편인증"},
  {"type":"join", "pid":"T-LJ-015-1", "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-015-1.ejs.html", "pageurl" : "02_login_join/T-LJ-015-1.ejs", "title": "T-LJ-015-1. Create my account_Certification done (Email - REDIRECTION)", "title2":"회원가입 - 간편인증 - 이메일 인증 완료 페이지 - (REDIRECTION)"},
  {"type":"join", "pid":"T-LJ-015-2", "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-015-2.ejs.html", "pageurl" : "02_login_join/T-LJ-015-2.ejs", "title": "T-LJ-015-2. Create my account_Certification done (Email)", "title2":"회원가입 - 간편인증 - 이메일 인증 완료 페이지 - (인증)"},
  {"type":"join", "pid":"T-LJ-016",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-016.ejs.html",   "pageurl" : "02_login_join/T-LJ-016.ejs",   "title": "T-LJ-016. Create my account_Connect existing account", "title2":"회원가입 - 간편인증 - 기존 계정이 존재하는 경우"},
  {"type":"join", "pid":"T-LJ-017",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-017.ejs.html",   "pageurl" : "02_login_join/T-LJ-017.ejs",   "title": "T-LJ-017. Create my account_Input my data", "title2":"회원가입 - 가입정보 입력"},
  {"type":"join", "pid":"T-LJ-018",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-018.ejs.html",   "pageurl" : "02_login_join/T-LJ-018.ejs",   "title": "T-LJ-018 ~ 019. Create my account_Privacy policy", "title2":"회원가입 - 개인정보 수집 이용 동의"},
  {"type":"join", "pid":"T-LJ-020",   "state":"DONE" , "completedate":"2021-06-01", "url" : "/02_login_join/T-LJ-020.ejs.html",   "pageurl" : "02_login_join/T-LJ-020.ejs",   "title": "T-LJ-020. Create my account_Account created", "title2":"회원가입 - 가입완료"},

  {"type":"product", "pid":"T-PD-001", "state":"DONE" , "completedate":"2021-06-01", "url" : "/03_product/T-PD-001.ejs.html", "pageurl" : "03_product/T-PD-001.ejs", "title":"T-PD-001. Product Display", "title2":"상품 리스트"},
  {"type":"product", "pid":"T-PD-006", "state":"DONE" , "completedate":"2021-06-01", "url" : "/03_product/T-PD-006.ejs.html", "pageurl" : "03_product/T-PD-006.ejs", "title":"T-PD-006. PDP", "title2":"상품 상세"},
  {"type":"product", "pid":"T-PD-015", "state":"DONE" , "completedate":"2021-06-01", "url" : "/03_product/T-PD-015.ejs.html", "pageurl" : "03_product/T-PD-015.ejs", "title":"T-PD-015. PDP (End of sale + no_image)", "title2":"상품 상세 - 판매중단상품+no_image"},
  {"type":"product", "pid":"T-PD-016", "state":"DONE" , "completedate":"2021-06-01", "url" : "/03_product/T-PD-016.ejs.html", "pageurl" : "03_product/T-PD-016.ejs", "title":"T-PD-016. Error page 404", "title2":"에러페이지 404"},
  {"type":"product", "pid":"T-PD-017", "state":"DONE" , "completedate":"2021-06-01", "url" : "/03_product/T-PD-017.ejs.html", "pageurl" : "03_product/T-PD-017.ejs", "title":"T-PD-017. Error page 500", "title2":"에러페이지 500"},

  {"type":"order", "pid":"T-OD-007", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-007.ejs.html", "pageurl" : "04_order/T-OD-007.ejs", "title":"T-OD-007 ~ 025. Order Page", "title2":"주문서 - 회원"},
  {"type":"order", "pid":"T-OD-022", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-022.ejs.html", "pageurl" : "04_order/T-OD-022.ejs", "title":"T-OD-022. Order Page(non-member)", "title2":"주문서 - 비회원"},
  {"type":"order", "pid":"T-OD-024", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-024.ejs.html", "pageurl" : "04_order/T-OD-024.ejs", "title":"T-OD-024. Payment Page(non-member)", "title2":"결제"},
  {"type":"order", "pid":"T-OD-037", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-037.ejs.html", "pageurl" : "04_order/T-OD-037.ejs", "title":"T-OD-037. Order Summary", "title2":"주문완료"},
  
  {"type":"mypage", "pid":"T-MY-003", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-003.ejs.html", "pageurl" : "01_mypage/T-MY-003.ejs", "title":"T-MY-003. Mypage", "title2":"마이페이지 - 나의 쇼핑정보"},
  {"type":"mypage", "pid":"T-MY-004", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-004.ejs.html", "pageurl" : "01_mypage/T-MY-004.ejs", "title":"T-MY-004. Edit member information", "title2":"마이페이지 - 회원정보변경"},
  {"type":"mypage", "pid":"T-MY-005", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-005.ejs.html", "pageurl" : "01_mypage/T-MY-005.ejs", "title":"T-MY-005 ~ 008. Edit member information-additional", "title2":"마이페이지 - 회원정보변경 - 입력"},
  // {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/22", "pageurl" : "01_mypage/02_2_edit_password.ejs", "title":"2-2. Change password"},
  {"type":"mypage", "pid":"T-MY-009", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-009.ejs.html", "pageurl" : "01_mypage/T-MY-009.ejs", "title":"T-MY-009. Addresses", "title2":"마이페이지 - 배송지목록"},
  {"type":"mypage", "pid":"T-MY-010", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-010.ejs.html", "pageurl" : "01_mypage/T-MY-010.ejs", "title":"T-MY-010. Add address", "title2":"마이페이지 - 배송지 추가"},
  {"type":"mypage", "pid":"T-MY-011", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-011.ejs.html", "pageurl" : "01_mypage/T-MY-011.ejs", "title":"T-MY-011. Addresses(empty)", "title2":"마이페이지 - 배송지목록(등록된 배송지가 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-013", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-013.ejs.html", "pageurl" : "01_mypage/T-MY-013.ejs", "title":"T-MY-013. Wishlist(empty)", "title2":"마이페이지 - 위시리스트(상품이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-014", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-014.ejs.html", "pageurl" : "01_mypage/T-MY-014.ejs", "title":"T-MY-014. Wishlist", "title2":"마이페이지 - 위시리스트"},
  {"type":"mypage", "pid":"T-MY-016", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-016.ejs.html", "pageurl" : "01_mypage/T-MY-016.ejs", "title":"T-MY-016. Waitinglist(empty)", "title2":"마이페이지 - 입고 알림 목록(상품이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-017", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-017.ejs.html", "pageurl" : "01_mypage/T-MY-017.ejs", "title":"T-MY-017. Waitinglist", "title2":"마이페이지 - 입고 알림 목록"},
  {"type":"mypage", "pid":"T-MY-021", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-021.ejs.html", "pageurl" : "01_mypage/T-MY-021.ejs", "title":"T-MY-021. Orders", "title2":"마이페이지 - 주문내역"},
  {"type":"mypage", "pid":"T-MY-023", "state":"DONE" , "completedate":"2021-06-01", "url" : "/01_mypage/T-MY-023.ejs.html", "pageurl" : "01_mypage/T-MY-023.ejs", "title":"T-MY-023. Returns", "title2":"마이페이지 - 반품신청"},

  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-1. About - Totême","url" : "/05_page_about/11",   "pageurl" : "05_page_about/01_about_toteme.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-2. About - Store","url" : "/05_page_about/12", "pageurl" : "05_page_about/02_about_store.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-3. About - Sustainability","url" : "/05_page_about/13", "pageurl" : "05_page_about/03_about_sustainability.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-4. About - Careers","url" : "/05_page_about/14", "pageurl" : "05_page_about/04_about_careers.ejs"},

  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-1. Question - COVID-19 FAQ","url" : "/04_page_question/21"  , "pageurl" : "04_page_question/01_page_covid.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-2. Question - Payments","url" : "/04_page_question/22"      , "pageurl" : "04_page_question/02_page_payment.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-3. Question - Shipping","url" : "/04_page_question/23"      , "pageurl" : "04_page_question/03_page_shipping.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-4. Question - Returns","url" : "/04_page_question/24"       , "pageurl" : "04_page_question/04_page_returns.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-5. Question - Order tracking","url" : "/04_page_question/25", "pageurl" : "04_page_question/05_page_order_tracking.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-6. Question - Store pick-up","url" : "/04_page_question/26" , "pageurl" : "04_page_question/06_page_storepickup.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-7. Question - Coming soon","url" : "/04_page_question/27"   , "pageurl" : "04_page_question/07_page_comingsoon.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-8. Question - Privacy policy","url" : "/04_page_question/28", "pageurl" : "04_page_question/08_privacypolicy.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-9. Question - Cookie policy","url" : "/04_page_question/29" , "pageurl" : "04_page_question/09_cookiepolicy.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-10. Question - Terms & Conditions","url" : "/04_page_question/210", "pageurl" : "04_page_question/10_termconditions.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"",  "title":"2-11. Question - Contact","url" : "/04_page_question/211", "pageurl" : "04_page_question/11_contact.ejs"},

  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3-1. Uniforms - 1depth(3col)","url" : "/06_page_uniforms/11",   "pageurl" : "06_page_uniforms/01_uniforms_1depth.ejs"},
  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3-2. Uniforms - 2depth(2col)","url" : "/06_page_uniforms/12",   "pageurl" : "06_page_uniforms/02_uniforms_2depth.ejs"},

]


/*

COVID-19 FAQ
Payments
Shipping
Returns
Order tracking
Store pick-up
Coming soon

Privacy policy
Cookie policy
Newsletter Club Terms & Conditions
Terms & Conditions

Contact
*/
pageData.forEach((data)=>{
  const {url, pageurl, isMain} = data;
  console.log(url, pageurl);
  app.get(url, (req, res) => {
    res.render('./index',{targetPath : pageurl, pageList : pageData},(err,html) => {
      console.log(pageurl);
      if(isMain){
      //  console.log("isMain",__dirname + "/index.html");
      //  fs.writeFileSync(__dirname + "/index.html",html)
        fs.writeFileSync(__dirname + "/dist/"+ pageurl+".html",html)
      }else{
        fs.writeFileSync(__dirname + "/dist/"+ pageurl+".html",html)

      }
      
      res.send(html);
    });
    
  })
  console.log(path.join(__dirname, pageurl));


})


fse.copy(__dirname + "/public/css", __dirname + "/dist/css", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});

fse.copy(__dirname + "/public/js", __dirname + "/dist/js", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});

fse.copy(__dirname + "/public/font", __dirname + "/dist/font", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});

fse.copy(__dirname + "/public/assets", __dirname + "/dist/assets", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

setTimeout(function(){


  pageData.forEach((data)=>{ 
      const {url, pageurl, isMain} = data;
      console.log("axious : "+"http://127.0.0.1:3000"+url);
      axios.get("http://127.0.0.1:3000"+url).then((res)=>{
        console.log("axious : "+url);
      })
  })


},1000);