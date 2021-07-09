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
  {"type":"index", "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "url" : "/00_main/list.ejs.html", "pageurl" : "00_main/list.ejs", "title":"퍼블리스트", "isMain":true},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "url" : "/00_main/index.ejs.html", "pageurl" : "00_main/index.ejs", "title":"Component Guide"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Main2","url" : "/00_main/index2.ejs.html", "pageurl" : "00_main/index2.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-07-08",  "title":"Guidelines for Input (error,commit..etc)","url" : "/00_main/inputguide.ejs.html", "pageurl" : "00_main/inputguide.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Display Page Type 01 (2–4 columns) ","url" : "/00_main/shop_scarves.ejs.html", "pageurl" : "00_main/shop_scarves.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01",  "title":"Display Page Type 02 (1-2–4 columns)","url" : "/00_main/shop_silk.ejs.html", "pageurl" : "00_main/shop_silk.ejs"},

  
  {"type":"main" , "pid":"T-CT-001", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-001. Component - Section with background (Tutorial)","url" : "/00_main/T-CT-001.sectionwithbackground",   "pageurl" : "00_main/T-CT-001.sectionwithbackground.ejs"},
  {"type":"main" , "pid":"T-CT-002", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-002. Component - One background two section","url" : "/00_main/T-CT-002.onebackgroundtwosection", "pageurl" : "00_main/T-CT-002.onebackgroundtwosection.ejs"},
  {"type":"main" , "pid":"T-CT-003", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-003. Component - Two background tw section","url" : "/00_main/T-CT-003.twobackgroundtwosection", "pageurl" : "00_main/T-CT-003.twobackgroundtwosection.ejs"},
  {"type":"main" , "pid":"T-CT-004", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-004. Component - Two section with media","url" : "/00_main/T-CT-004.twosectionwithmedia",     "pageurl" : "00_main/T-CT-004.twosectionwithmedia.ejs"},
  {"type":"main" , "pid":"T-CT-005", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-005. Component - Rhreesesction with media","url" : "/00_main/T-CT-005.threesesctionwithmedia",  "pageurl" : "00_main/T-CT-005.threesesctionwithmedia.ejs"},
  {"type":"main" , "pid":"T-CT-006", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-006. Component - Videosection","url" : "/00_main/T-CT-006.videosection",            "pageurl" : "00_main/T-CT-006.videosection.ejs"},
  {"type":"main" , "pid":"T-CT-007", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-007. Component - Manual product list","url" : "/00_main/T-CT-007.manualproductlist",       "pageurl" : "00_main/T-CT-007.manualproductlist.ejs"},
  {"type":"main" , "pid":"T-CT-008", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-008. Component - Page header","url" : "/00_main/T-CT-008.pageheader",              "pageurl" : "00_main/T-CT-008.pageheader.ejs"},
  {"type":"main" , "pid":"T-CT-009", "state":"DONE" , "completedate":"2021-06-30",  "title":"T-CT-009. Component - Free HTML","url" : "/00_main/T-CT-009.freeHTML",                "pageurl" : "00_main/T-CT-009.freeHTML.ejs"},



  {"type":"join", "pid":"T-LJ-001",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-001.ejs.html",   "pageurl" : "02_login_join/T-LJ-001.ejs",   "title": "T-LJ-001. Sign-in", "title2":"로그인"},
  {"type":"join", "pid":"T-LJ-002",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-002.ejs.html",   "pageurl" : "02_login_join/T-LJ-002.ejs",   "title": "T-LJ-002. Order status (Guest)", "title2":"비회원 주문조회"},
  {"type":"join", "pid":"T-LJ-004",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-004.ejs.html",   "pageurl" : "02_login_join/T-LJ-004.ejs",   "title": "T-LJ-004. Find my ID", "title2":"아이디찾기"},
  {"type":"join", "pid":"T-LJ-005",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-005.ejs.html",   "pageurl" : "02_login_join/T-LJ-005.ejs",   "title": "T-LJ-005. Reset my paswword_Input my data", "title2":"비밀번호 찾기 - 정보 입력"}, // 완료
  {"type":"join", "pid":"T-LJ-006",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-006.ejs.html",   "pageurl" : "02_login_join/T-LJ-006.ejs",   "title": "T-LJ-006. Reset my paswword_Confirmation email sent", "title2":"비밀번호 찾기 - 이메일 인증"}, // 완료
  {"type":"join", "pid":"T-LJ-007",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-007.ejs.html",   "pageurl" : "02_login_join/T-LJ-007.ejs",   "title": "T-LJ-007. Reset my paswword_Email confirmed", "title2":"비밀번호 찾기 - 이메일 인증 - (테이블과 팝업)"}, // 완료
  {"type":"join", "pid":"T-LJ-008",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-008.ejs.html",   "pageurl" : "02_login_join/T-LJ-008.ejs",   "title": "T-LJ-008. Reset my paswword_Certification via mobile phone", "title2":"비밀번호 찾기 - 휴대폰 인증"}, // 완료
  {"type":"join", "pid":"T-LJ-009",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-009.ejs.html",   "pageurl" : "02_login_join/T-LJ-009.ejs",   "title": "T-LJ-009. Reset my paswword_Input new password", "title2":"비밀번호 찾기 - 새 비밀번호 입력"}, // 완료
  {"type":"join", "pid":"T-LJ-010",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-010.ejs.html",   "pageurl" : "02_login_join/T-LJ-010.ejs",   "title": "T-LJ-010. Reset my password_Change my password", "title2":"비밀번호 찾기 - 비밀번호 변경"}, // 완료
  {"type":"join", "pid":"T-LJ-011",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-011.ejs.html",   "pageurl" : "02_login_join/T-LJ-011.ejs",   "title": "T-LJ-011. Reset my password_Change my password_Done", "title2":"비밀번호 찾기 - 비밀번호 변경 완료"}, // 완료
  {"type":"join", "pid":"T-LJ-012",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-012.ejs.html",   "pageurl" : "02_login_join/T-LJ-012.ejs",   "title": "T-LJ-012. Reset my paswword_Old password update", "title2":"비밀번호 찾기 - 90일 이상 사용 비밀번호 변경"}, // 완료
  {"type":"join", "pid":"T-LJ-014",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-014.ejs.html",   "pageurl" : "02_login_join/T-LJ-014.ejs",   "title": "T-LJ-014. Reset my paswword_Old password update_done", "title2":"비밀번호 찾기 - 90일 이상 사용 비밀번호 변경 - 비밀번호 변경 완료"}, //
  {"type":"join", "pid":"T-LJ-015",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-015.ejs.html",   "pageurl" : "02_login_join/T-LJ-015.ejs",   "title": "T-LJ-015. Create my account_Certification", "title2":"회원가입 - 간편인증"},
  {"type":"join", "pid":"T-LJ-015-1", "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-015-1.ejs.html", "pageurl" : "02_login_join/T-LJ-015-1.ejs", "title": "T-LJ-015-1. Create my account_Certification done (Email - REDIRECTION)", "title2":"회원가입 - 간편인증 - 이메일 인증 완료 페이지 - (REDIRECTION)"},
  {"type":"join", "pid":"T-LJ-015-2", "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-015-2.ejs.html", "pageurl" : "02_login_join/T-LJ-015-2.ejs", "title": "T-LJ-015-2. Create my account_Certification done (Email)", "title2":"회원가입 - 간편인증 - 이메일 인증 완료 페이지 - (인증)"},
  {"type":"join", "pid":"T-LJ-016",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-016.ejs.html",   "pageurl" : "02_login_join/T-LJ-016.ejs",   "title": "T-LJ-016. Create my account_Connect existing account", "title2":"회원가입 - 간편인증 - 기존 계정이 존재하는 경우"},
  {"type":"join", "pid":"T-LJ-017",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-017.ejs.html",   "pageurl" : "02_login_join/T-LJ-017.ejs",   "title": "T-LJ-017. Create my account_Input my data", "title2":"회원가입 - 가입정보 입력"},
  {"type":"join", "pid":"T-LJ-018",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-018.ejs.html",   "pageurl" : "02_login_join/T-LJ-018.ejs",   "title": "T-LJ-018 ~ 019. Create my account_Privacy policy", "title2":"회원가입 - 개인정보 수집 이용 동의"},
  {"type":"join", "pid":"T-LJ-020",   "state":"DONE" , "completedate":"2021-06-30", "url" : "/02_login_join/T-LJ-020.ejs.html",   "pageurl" : "02_login_join/T-LJ-020.ejs",   "title": "T-LJ-020. Create my account_Account created", "title2":"회원가입 - 가입완료"},

  {"type":"product", "pid":"T-PD-001", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-001.ejs.html", "pageurl" : "03_product/T-PD-001.ejs", "title":"T-PD-001. Product Display", "title2":"상품 리스트"},
  {"type":"product", "pid":"T-PD-006", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006.ejs.html", "pageurl" : "03_product/T-PD-006.ejs", "title":"T-PD-006. PDP", "title2":"상품 상세"},
  {"type":"product", "pid":"T-PD-006-1", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-1.ejs.html", "pageurl" : "03_product/T-PD-006-1.ejs", "title":"T-PD-006-1. size guide (Clothes)", "title2":"사이즈 가이드 - 의류"},
  {"type":"product", "pid":"T-PD-006-2", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-2.ejs.html", "pageurl" : "03_product/T-PD-006-2.ejs", "title":"T-PD-006-2. size guide (Denim - Twisted seam)", "title2":"사이즈 가이드 - Twisted seam 데님"},
  {"type":"product", "pid":"T-PD-006-3", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-3.ejs.html", "pageurl" : "03_product/T-PD-006-3.ejs", "title":"T-PD-006-3. size guide (Denim - Flare fit)", "title2":"사이즈 가이드 - Flare fit 데님"},
  {"type":"product", "pid":"T-PD-006-4", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-4.ejs.html", "pageurl" : "03_product/T-PD-006-4.ejs", "title":"T-PD-006-4. size guide (Denim - Loose fit)", "title2":"사이즈 가이드 - Loose fit 데님"},
  {"type":"product", "pid":"T-PD-006-5", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-5.ejs.html", "pageurl" : "03_product/T-PD-006-5.ejs", "title":"T-PD-006-5. size guide (Denim - Barrel leg)", "title2":"사이즈 가이드 - Barrel leg 데님"},
  {"type":"product", "pid":"T-PD-006-6", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-6.ejs.html", "pageurl" : "03_product/T-PD-006-6.ejs", "title":"T-PD-006-6. size guide (Denim - Regular fit)", "title2":"사이즈 가이드 - Regular fit 데님"},
  {"type":"product", "pid":"T-PD-006-7", "state":"DONE" , "completedate":"2021-07-02", "url" : "/03_product/T-PD-006-7.ejs.html", "pageurl" : "03_product/T-PD-006-7.ejs", "title":"T-PD-006-7. size guide (Shoes)", "title2":"사이즈 가이드 - 슈즈"},
  {"type":"product", "pid":"T-PD-015", "state":"DONE" , "completedate":"2021-06-11", "url" : "/03_product/T-PD-015.ejs.html", "pageurl" : "03_product/T-PD-015.ejs", "title":"T-PD-015. PDP (End of sale + no_image)", "title2":"상품 상세 - 판매중단상품+no_image"},
  {"type":"product", "pid":"T-PD-016", "state":"DONE" , "completedate":"2021-06-11", "url" : "/03_product/T-PD-016.ejs.html", "pageurl" : "03_product/T-PD-016.ejs", "title":"T-PD-016. Error page 404", "title2":"에러페이지 404"},
  {"type":"product", "pid":"T-PD-017", "state":"DONE" , "completedate":"2021-06-11", "url" : "/03_product/T-PD-017.ejs.html", "pageurl" : "03_product/T-PD-017.ejs", "title":"T-PD-017. Error page 500", "title2":"에러페이지 500"},

  {"type":"order", "pid":"T-OD-007", "state":"DONE" , "completedate":"2021-07-05", "url" : "/04_order/T-OD-007.ejs.html", "pageurl" : "04_order/T-OD-007.ejs", "title":"T-OD-007 ~ 025. Order Page", "title2":"주문서 - 회원"},
  {"type":"order", "pid":"T-OD-022", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-022.ejs.html", "pageurl" : "04_order/T-OD-022.ejs", "title":"T-OD-022. Order Page(Guest)", "title2":"주문서 - 비회원"},
  {"type":"order", "pid":"T-OD-024", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-024.ejs.html", "pageurl" : "04_order/T-OD-024.ejs", "title":"T-OD-024. Payment Page(Guest)", "title2":"결제"},
  {"type":"order", "pid":"T-OD-037", "state":"DONE" , "completedate":"2021-06-11", "url" : "/04_order/T-OD-037.ejs.html", "pageurl" : "04_order/T-OD-037.ejs", "title":"T-OD-037. Order Summary", "title2":"주문완료"},
  
  {"type":"mypage", "pid":"T-MY-003", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-003.ejs.html", "pageurl" : "01_mypage/T-MY-003.ejs", "title":"T-MY-003. Mypage", "title2":"마이페이지 - 나의 쇼핑정보"},
  {"type":"mypage", "pid":"T-MY-004", "state":"DONE" , "completedate":"2021-07-08", "url" : "/01_mypage/T-MY-004.ejs.html", "pageurl" : "01_mypage/T-MY-004.ejs", "title":"T-MY-004. Edit member information", "title2":"마이페이지 - 회원정보변경"},
  {"type":"mypage", "pid":"T-MY-005", "state":"DONE" , "completedate":"2021-07-09", "url" : "/01_mypage/T-MY-005.ejs.html", "pageurl" : "01_mypage/T-MY-005.ejs", "title":"T-MY-005 ~ 008. Edit member information-additional", "title2":"마이페이지 - 회원정보변경 - 입력"},
  // {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/22", "pageurl" : "01_mypage/02_2_edit_password.ejs", "title":"2-2. Change password"},
  {"type":"mypage", "pid":"T-MY-009", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-009.ejs.html", "pageurl" : "01_mypage/T-MY-009.ejs", "title":"T-MY-009. Addresses", "title2":"마이페이지 - 배송지목록"},
  {"type":"mypage", "pid":"T-MY-010", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-010.ejs.html", "pageurl" : "01_mypage/T-MY-010.ejs", "title":"T-MY-010. Add address", "title2":"마이페이지 - 배송지 추가"},
  {"type":"mypage", "pid":"T-MY-011", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-011.ejs.html", "pageurl" : "01_mypage/T-MY-011.ejs", "title":"T-MY-011. Addresses(empty)", "title2":"마이페이지 - 배송지목록(등록된 배송지가 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-013", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-013.ejs.html", "pageurl" : "01_mypage/T-MY-013.ejs", "title":"T-MY-013. Wishlist(empty)", "title2":"마이페이지 - 위시리스트(상품이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-014", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-014.ejs.html", "pageurl" : "01_mypage/T-MY-014.ejs", "title":"T-MY-014. Wishlist", "title2":"마이페이지 - 위시리스트"},
  // {"type":"mypage", "pid":"T-MY-016", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-016.ejs.html", "pageurl" : "01_mypage/T-MY-016.ejs", "title":"T-MY-016. Waitinglist(empty)", "title2":"마이페이지 - 입고 알림 목록(상품이 없는 경우)"},
  // {"type":"mypage", "pid":"T-MY-017", "state":"DONE" , "completedate":"2021-06-11", "url" : "/01_mypage/T-MY-017.ejs.html", "pageurl" : "01_mypage/T-MY-017.ejs", "title":"T-MY-017. Waitinglist", "title2":"마이페이지 - 입고 알림 목록"},
  {"type":"mypage", "pid":"T-MY-021", "state":"DONE" , "completedate":"2021-07-08", "url" : "/01_mypage/T-MY-021.ejs.html", "pageurl" : "01_mypage/T-MY-021.ejs", "title":"T-MY-021. Orders", "title2":"마이페이지 - 주문내역"},
  {"type":"mypage", "pid":"T-MY-021-1", "state":"DONE" , "completedate":"2021-07-09", "url" : "/01_mypage/T-MY-021-1.ejs.html", "pageurl" : "01_mypage/T-MY-021-1.ejs", "title":"T-MY-021-1. Orders - Details", "title2":"마이페이지 - 주문내역 - 상세"},
  {"type":"mypage", "pid":"T-MY-019-1", "state":"DONE" , "completedate":"2021-07-09", "url" : "/01_mypage/T-MY-019-1.ejs.html", "pageurl" : "01_mypage/T-MY-019-1.ejs", "title":"T-MY-019-1. Orders (Guest)", "title2":"마이페이지 - 비회원 주문조회"},
  {"type":"mypage", "pid":"T-MY-023", "state":"DONE" , "completedate":"2021-07-05", "url" : "/01_mypage/T-MY-023.ejs.html", "pageurl" : "01_mypage/T-MY-023.ejs", "title":"T-MY-023. Returns", "title2":"마이페이지 - 반품신청"},
  {"type":"mypage", "pid":"T-MY-024", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-024.ejs.html", "pageurl" : "01_mypage/T-MY-024.ejs", "title":"T-MY-024. Returns(empty)", "title2":"마이페이지 - 반품신청(주문 내역이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-025", "state":"DONE" , "completedate":"2021-07-08", "url" : "/01_mypage/T-MY-025.ejs.html", "pageurl" : "01_mypage/T-MY-025.ejs", "title":"T-MY-025. Returns - details", "title2":"마이페이지 - 반품신청 - 상세"},
  {"type":"mypage", "pid":"T-MY-026", "state":"DONE" , "completedate":"2021-07-09", "url" : "/01_mypage/T-MY-026.ejs.html", "pageurl" : "01_mypage/T-MY-026.ejs", "title":"T-MY-026. Returns - Done", "title2":"마이페이지 - 반품신청 - 완료"},
  {"type":"mypage", "pid":"T-MY-028", "state":"DONE" , "completedate":"2021-07-08", "url" : "/01_mypage/T-MY-028.ejs.html", "pageurl" : "01_mypage/T-MY-028.ejs", "title":"T-MY-028. Cancel Order", "title2":"마이페이지 - 취소신청"},
  {"type":"mypage", "pid":"T-MY-031", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-031.ejs.html", "pageurl" : "01_mypage/T-MY-031.ejs", "title":"T-MY-031. Receipt(empty)", "title2":"영수증/세금계산서(내역이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-032", "state":"DONE" , "completedate":"2021-07-09", "url" : "/01_mypage/T-MY-032.ejs.html", "pageurl" : "01_mypage/T-MY-032.ejs", "title":"T-MY-032. Receipt", "title2":"영수증/세금계산서"},
  
  {"type":"mypage", "pid":"T-MY-034", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-034.ejs.html", "pageurl" : "01_mypage/T-MY-034.ejs", "title":"T-MY-034. Tax Receipt", "title2":"세금계산서"},
  {"type":"mypage", "pid":"T-MY-035", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-035.ejs.html", "pageurl" : "01_mypage/T-MY-035.ejs", "title":"T-MY-035. Credit Receipt", "title2":"카드 영수증"},
  {"type":"mypage", "pid":"T-MY-036", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-036.ejs.html", "pageurl" : "01_mypage/T-MY-036.ejs", "title":"T-MY-036. Cash Receipt", "title2":"현금영수증"},
  {"type":"mypage", "pid":"T-MY-037", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-037.ejs.html", "pageurl" : "01_mypage/T-MY-037.ejs", "title":"T-MY-037. Receipt popup", "title2":"영수증 팝업"},
  
  {"type":"mypage", "pid":"T-MY-038", "state":"DONE" , "completedate":"2021-06-30", "url" : "/01_mypage/T-MY-038.ejs.html", "pageurl" : "01_mypage/T-MY-038.ejs", "title":"T-MY-038. Deposit(empty)", "title2":"예치금(사용 내역이 없는 경우)"},
  {"type":"mypage", "pid":"T-MY-039", "state":"DONE" , "completedate":"2021-07-08", "url" : "/01_mypage/T-MY-039.ejs.html", "pageurl" : "01_mypage/T-MY-039.ejs", "title":"T-MY-039. Deposit", "title2":"예치금"},


{"type":"page", "pid":"T-AB-001", "state":"DONE" , "completedate":"2021-07-02", "url" : "/05_page_about/T-AB-001.ejs.html", "pageurl" : "05_page_about/T-AB-001.ejs", "title":"T-AB-001. About - Totême", "title2":"토템"},
{"type":"page", "pid":"T-AB-002", "state":"DONE" , "completedate":"2021-07-02", "url" : "/05_page_about/T-AB-002.ejs.html", "pageurl" : "05_page_about/T-AB-002.ejs", "title":"T-AB-002. About - Store - Biblioteksgatan no.5", "title2":"매장안내 - Biblioteksgatan no.5"},
{"type":"page", "pid":"T-AB-003", "state":"DONE" , "completedate":"2021-07-02", "url" : "/05_page_about/T-AB-003.ejs.html", "pageurl" : "05_page_about/T-AB-003.ejs", "title":"T-AB-003. About - Store - Nordiska Kompaniet", "title2":"매장안내 - Nordiska Kompaniet"},
{"type":"page", "pid":"T-AB-004", "state":"DONE" , "completedate":"2021-07-02", "url" : "/05_page_about/T-AB-004.ejs.html", "pageurl" : "05_page_about/T-AB-004.ejs", "title":"T-AB-004. About - Sustainability", "title2":"지속가능성"},

  {"type":"page", "pid":"T-QA-001", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-1. Question - COVID-19 FAQ",       "url" : "/04_page_question/T-QA-001.ejs.html", "pageurl" : "04_page_question/T-QA-001.ejs"},
  {"type":"page", "pid":"T-QA-002", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-2. Question - Payments",           "url" : "/04_page_question/T-QA-002.ejs.html", "pageurl" : "04_page_question/T-QA-002.ejs"},
  {"type":"page", "pid":"T-QA-003", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-3. Question - Shipping",           "url" : "/04_page_question/T-QA-003.ejs.html", "pageurl" : "04_page_question/T-QA-003.ejs"},
  {"type":"page", "pid":"T-QA-004", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-4. Question - Returns",            "url" : "/04_page_question/T-QA-004.ejs.html", "pageurl" : "04_page_question/T-QA-004.ejs"},
  {"type":"page", "pid":"T-QA-005", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-5. Question - Private policy",     "url" : "/04_page_question/T-QA-005.ejs.html", "pageurl" : "04_page_question/T-QA-005.ejs"},
  {"type":"page", "pid":"T-QA-006", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-6. Question - Terms",              "url" : "/04_page_question/T-QA-006.ejs.html", "pageurl" : "04_page_question/T-QA-006.ejs"},
  {"type":"page", "pid":"T-QA-007", "state":"DONE" , "completedate":"2021-07-01", "etc":"",  "title":"2-7. Question - contact",            "url" : "/04_page_question/T-QA-007.ejs.html", "pageurl" : "04_page_question/T-QA-007.ejs"},

  {"type":"page", "pid":"T-ETC-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3-1. Uniforms - 1depth(3col)",        "url" : "/06_page_uniforms/T-ETC-001.ejs.html",  "pageurl" : "06_page_uniforms/T-ETC-001.ejs"},
  {"type":"page", "pid":"T-ETC-002", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3-2. Uniforms - 2depth(2col)",        "url" : "/06_page_uniforms/T-ETC-002.ejs.html",  "pageurl" : "06_page_uniforms/T-ETC-002.ejs"},

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