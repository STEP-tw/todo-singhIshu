let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
let registered_users = [{username:'bhanutv',name:'Bhanu Teja Verma'},{username:'ishusi',name:'Ishu Singh'}];
let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['--------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
};

const getLoginPage = (req,res)=>{
  return fs.readFileSync('./public/index.html','utf8');
}

let app = WebApp.create();
app.use(logRequest);
app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.get('/index.html',(req,res)=>{
  let loginPage = getLoginPage();
  res.setHeader('Content-type','text/html');
  res.write(loginPage.replace("<h2></h2>",req.cookies.message || ""));
  res.end();
})

app.post('/index.html',(req,res)=>{
  let user = registered_users.find(u=>u.username==req.body.username);
  if(!user) {
    res.setHeader('Set-Cookie','message=login failed; Max-Age=5');
    res.redirect("/index.html");
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/homePage.html');
})


const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
