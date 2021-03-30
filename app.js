const livereload = require('livereload');
const livereloadMiddleware = require('connect-livereload');
const path = require('path');
const fs = require('fs');

// 라이브 서버 설정
const liveServer = livereload.createServer({
    exts: ['html', 'css', 'ejs'],
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
  {"url" : "/02_login_join/1", "pageurl" : "02_login_join/01_login_page.ejs"},
  {"url" : "/02_login_join/2", "pageurl" : "02_login_join/02_join_page.ejs"}
]

pageData.forEach((data)=>{
  const {url, pageurl} = data;
  console.log(url, pageurl);
  app.get(url, (req, res) => {
    res.render('./index',{targetPath : pageurl},(err,html) => {
      console.log(html);
      res.send(html);
      fs.writeFileSync(__dirname + "/dist/"+ pageurl+".html",html)
    });
    
  })
  console.log(path.join(__dirname, pageurl));
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});