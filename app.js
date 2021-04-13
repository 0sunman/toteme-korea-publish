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
  {"type":"main","title":"메인","url" : "/00_main/1", "pageurl" : "00_main/index.ejs"},
  {"type":"main","title":"인풋 가이드","url" : "/00_main/2", "pageurl" : "00_main/inputguide.ejs"},
  {"type":"join","title":"1. 로그인페이지","url" : "/02_login_join/10", "pageurl" : "02_login_join/01_0_login_page.ejs"},
  {"type":"join","title":"1-1. 아이디찾기","url" : "/02_login_join/11", "pageurl" : "02_login_join/01_1_id_check.ejs"},
  {"type":"join","title":"1-2. 비회원주문페이지","url" : "/02_login_join/12", "pageurl" : "02_login_join/01_2_no_member_login.ejs"},
  {"type":"join","title":"2. 회원가입페이지","url" : "/02_login_join/2", "pageurl" : "02_login_join/02_join_page.ejs"},
  {"type":"join","title":"3. 이메일페이지 (공사중)","url" : "/02_login_join/3", "pageurl" : "02_login_join/03_select_email.ejs"},
  {"type":"product","title":"1. 상품상세","url" : "/03_product/1", "pageurl" : "03_product/01_product_detail.ejs"},
  {"type":"product","title":"1-1. 프리오더","url" : "/03_product/11", "pageurl" : "03_product/01_1_product_detail_preorder.ejs"},
  {"type":"product","title":"2. 상품리스트","url" : "/03_product/2", "pageurl" : "03_product/02_product_list.ejs"},
  {"type":"product","title":"2-1. 상품리스트 컴포넌트","url" : "/03_product/21", "pageurl" : "03_product/02_1_product_list_component.ejs"},
  {"type":"page","title":"1. About","url" : "/05_page/1", "pageurl" : "05_page/01_0_about.ejs"},
  {"type":"page","title":"1-1. Store","url" : "/05_page/11", "pageurl" : "05_page/01_1_store.ejs"},
  {"type":"page","title":"1-2. Sustainability","url" : "/05_page/12", "pageurl" : "05_page/01_2_sustainability.ejs"},
  {"type":"page","title":"1-3. Careers","url" : "/05_page/13", "pageurl" : "05_page/01_3_careers.ejs"},
]

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