const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');
const path = require('path');
const fs = require('fs');
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
  {"type":"index","title":"퍼블리스트","url" : "/publist", "pageurl" : "list.ejs", "isMain":true},
  {"type":"main","title":"Main","url" : "/00_main/1", "pageurl" : "00_main/index.ejs"},
  {"type":"main","title":"Guidelines for Input (error,commit..etc)","url" : "/00_main/2", "pageurl" : "00_main/inputguide.ejs"},
  {"type":"main","title":"Display Page Type 01 (2–4 columns) ","url" : "/00_main/3", "pageurl" : "00_main/shop_scarves.ejs"},
  {"type":"main","title":"Display Page Type 02 (1-2–4 columns)","url" : "/00_main/4", "pageurl" : "00_main/shop_silk.ejs"},

  {"type":"join","title":"1. Sign in","url" : "/02_login_join/10", "pageurl" : "02_login_join/01_0_login_page.ejs"},
  {"type":"join","title":"1-1. Forgot ID","url" : "/02_login_join/11", "pageurl" : "02_login_join/01_1_id_check.ejs"},
  {"type":"join","title":"1-2. Order for non-member (order check)","url" : "/02_login_join/12", "pageurl" : "02_login_join/01_2_no_member_login.ejs"},
  {"type":"join","title":"2. Create account","url" : "/02_login_join/2", "pageurl" : "02_login_join/02_join_page.ejs"},
  {"type":"join","title":"3. Create account _ E-mail Authentication","url" : "/02_login_join/3", "pageurl" : "02_login_join/03_select_email.ejs"},

  {"type":"product","title":"1. PDP","url" : "/03_product/1", "pageurl" : "03_product/01_product_detail.ejs"},
/*  {"type":"product","title":"1-1. Pre-order","url" : "/03_product/11", "pageurl" : "03_product/01_1_product_detail_preorder.ejs"},*/
  {"type":"product","title":"2. Product Display","url" : "/03_product/2", "pageurl" : "03_product/02_product_list.ejs"},
/*  {"type":"product","title":"2-1. 상품리스트 컴포넌트","url" : "/03_product/21", "pageurl" : "03_product/02_1_product_list_component.ejs"},*/

  {"type":"order","title":"1. Order Page","url" : "/04_order/1", "pageurl" : "04_order/01_order_member.ejs"},
  {"type":"order","title":"1-1. Order Page(non-member)","url" : "/04_order/2", "pageurl" : "04_order/02_order_non_member.ejs"},
    {"type":"order","title":"2. Payment Page","url" : "/04_order/21", "pageurl" : "04_order/02_1_payment_non_member.ejs"},
  
  {"type":"page","title":"1-1. About - Totême","url" : "/05_page_about/11",   "pageurl" : "05_page_about/01_about_toteme.ejs"},
  {"type":"page","title":"1-2. About - Store","url" : "/05_page_about/12", "pageurl" : "05_page_about/02_about_store.ejs"},
  {"type":"page","title":"1-3. About - Sustainability","url" : "/05_page_about/13", "pageurl" : "05_page_about/03_about_sustainability.ejs"},
  {"type":"page","title":"1-4. About - Careers","url" : "/05_page_about/14", "pageurl" : "05_page_about/04_about_careers.ejs"},

  {"type":"page","title":"2-1. Question - COVID-19 FAQ","url" : "/04_page_question/21"  , "pageurl" : "04_page_question/01_page_covid.ejs"},
  {"type":"page","title":"2-2. Question - Payments","url" : "/04_page_question/22"      , "pageurl" : "04_page_question/02_page_payment.ejs"},
  {"type":"page","title":"2-3. Question - Shipping","url" : "/04_page_question/23"      , "pageurl" : "04_page_question/03_page_shipping.ejs"},
  {"type":"page","title":"2-4. Question - Returns","url" : "/04_page_question/24"       , "pageurl" : "04_page_question/04_page_returns.ejs"},
  {"type":"page","title":"2-5. Question - Order tracking","url" : "/04_page_question/25", "pageurl" : "04_page_question/05_page_order_tracking.ejs"},
  {"type":"page","title":"2-6. Question - Store pick-up","url" : "/04_page_question/26" , "pageurl" : "04_page_question/06_page_storepickup.ejs"},
  {"type":"page","title":"2-7. Question - Coming soon","url" : "/04_page_question/27"   , "pageurl" : "04_page_question/07_page_comingsoon.ejs"},
  {"type":"page","title":"2-8. Question - Privacy policy","url" : "/04_page_question/28", "pageurl" : "04_page_question/08_privacypolicy.ejs"},
  {"type":"page","title":"2-9. Question - Cookie policy","url" : "/04_page_question/29" , "pageurl" : "04_page_question/09_cookiepolicy.ejs"},
  {"type":"page","title":"2-10. Question - Terms & Conditions","url" : "/04_page_question/210", "pageurl" : "04_page_question/10_termconditions.ejs"},
  {"type":"page","title":"2-11. Question - Contact","url" : "/04_page_question/211", "pageurl" : "04_page_question/11_contact.ejs"},

  {"type":"page","title":"3-1. Uniforms - 1depth(3col)","url" : "/06_page_uniforms/11",   "pageurl" : "06_page_uniforms/01_uniforms_1depth.ejs"},
  {"type":"page","title":"3-2. Uniforms - 2depth(2col)","url" : "/06_page_uniforms/12",   "pageurl" : "06_page_uniforms/02_uniforms_2depth.ejs"},

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
        console.log("isMain",__dirname + "/index.html");
        fs.writeFileSync(__dirname + "/index.html",html)
      }else{
        fs.writeFileSync(__dirname + "/dist/"+ pageurl+".html",html)
      }
      res.send(html);
    });
    
  })
  console.log(path.join(__dirname, pageurl));


})


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