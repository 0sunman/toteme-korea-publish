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


const pageData = [
  {"type":"index", "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"퍼블리스트","url" : "/00_main/0", "pageurl" : "00_main/list.ejs", "isMain":true},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"Component Guide","url" : "/00_main/1", "pageurl" : "00_main/index.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"Main2","url" : "/00_main/11", "pageurl" : "00_main/index2.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"Guidelines for Input (error,commit..etc)","url" : "/00_main/2", "pageurl" : "00_main/inputguide.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"Display Page Type 01 (2–4 columns) ","url" : "/00_main/3", "pageurl" : "00_main/shop_scarves.ejs"},
  {"type":"main" , "pid":"T-MI-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"Display Page Type 02 (1-2–4 columns)","url" : "/00_main/4", "pageurl" : "00_main/shop_silk.ejs"},

  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1. Mypage","url" : "/01_mypage/10", "pageurl" : "01_mypage/01_mypage.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2. Edit member information","url" : "/01_mypage/20", "pageurl" : "01_mypage/02_0_edit_info.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2-1. Edit member information-additional","url" : "/01_mypage/21", "pageurl" : "01_mypage/02_1_edit_info_additional.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2-2. Change password","url" : "/01_mypage/22", "pageurl" : "01_mypage/02_2_edit_password.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3. Addresses","url" : "/01_mypage/30", "pageurl" : "01_mypage/03_0_address_list.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3. Add address","url" : "/01_mypage/31", "pageurl" : "01_mypage/03_1_address_add.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"","title":"4. Wishlist","url" : "/01_mypage/40", "pageurl" : "01_mypage/04_wishlist.ejs"},
  {"type":"mypage", "pid":"T-MY-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"","title":"5. Returns","url" : "/01_mypage/50", "pageurl" : "01_mypage/08_return.ejs"},

  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1. Sign in","url" : "/02_login_join/10", "pageurl" : "02_login_join/01_0_login_page.ejs"},
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-1. Forgot ID","url" : "/02_login_join/11", "pageurl" : "02_login_join/01_1_id_check.ejs"},
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-2. Order for non-member (order check)","url" : "/02_login_join/12", "pageurl" : "02_login_join/01_2_no_member_login.ejs"},
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2. Create account","url" : "/02_login_join/2", "pageurl" : "02_login_join/02_join_page.ejs"},
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3. Create account _ E-mail Authentication","url" : "/02_login_join/3", "pageurl" : "02_login_join/03_select_email.ejs"},
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"4. privacy table","url" : "/02_login_join/4", "pageurl" : "02_login_join/04_privacy_table.ejs"},

  
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5. Forgot your password ","url" : "/02_login_join/50", "pageurl" : "02_login_join/05_0_findpassword.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-1. Forgot your password - complete page","url" : "/02_login_join/51", "pageurl" : "02_login_join/05_1_findpassword_complete.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-2. Forgot your password - replace to password","url" : "/02_login_join/52", "pageurl" : "02_login_join/05_2_modifypassword.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-3. Forgot your password - replace to new password","url" : "/02_login_join/53", "pageurl" : "02_login_join/05_3_newpassword.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-4. Forgot your password - Send to email","url" : "/02_login_join/54", "pageurl" : "02_login_join/05_4_email_send.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-5. Forgot your password - Confirm and send to email","url" : "/02_login_join/55", "pageurl" : "02_login_join/05_5_email_confirm_and_resend.ejs"}, // 완료
  {"type":"join", "pid":"T-LJ-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"5-6. Forgot your password - Send to cellphone","url" : "/02_login_join/56", "pageurl" : "02_login_join/05_6_findpassword_withphone.ejs"}, // 완료

  {"type":"product", "pid":"T-PD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1. PDP","url" : "/03_product/1", "pageurl" : "03_product/01_product_detail.ejs"},
/*  {"type":"product","title":"1-1. Pre-order","url" : "/03_product/11", "pageurl" : "03_product/01_1_product_detail_preorder.ejs"},*/
  {"type":"product", "pid":"T-PD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2. Product Display","url" : "/03_product/2", "pageurl" : "03_product/02_product_list.ejs"},
/*  {"type":"product","title":"2-1. 상품리스트 컴포넌트","url" : "/03_product/21", "pageurl" : "03_product/02_1_product_list_component.ejs"},*/

  {"type":"order", "pid":"T-OD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1. Order Page","url" : "/04_order/1", "pageurl" : "04_order/01_order_member.ejs"},
  {"type":"order", "pid":"T-OD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"1-1. Order Page(non-member)","url" : "/04_order/2", "pageurl" : "04_order/02_order_non_member.ejs"},
  {"type":"order", "pid":"T-OD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"2. Payment Page(non-member)","url" : "/04_order/21", "pageurl" : "04_order/02_1_payment_non_member.ejs"},
  {"type":"order", "pid":"T-OD-001", "state":"DONE" , "completedate":"2021-06-01", "etc":"", "title":"3. Order Summary","url" : "/04_order/3", "pageurl" : "04_order/03_order_summary.ejs"},
  
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