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
  {"type":"join","title":"1. 로그인페이지","url" : "/02_login_join/1", "pageurl" : "02_login_join/01_login_page.ejs"},
  {"type":"join","title":"2. 회원가입페이지","url" : "/02_login_join/2", "pageurl" : "02_login_join/02_join_page.ejs"}
]

pageData.forEach((data)=>{
  const {url, pageurl, isMain} = data;
  console.log(url, pageurl);
  app.get(url, (req, res) => {
    res.render('./index',{targetPath : pageurl, pageList : pageData},(err,html) => {
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