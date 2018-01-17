let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const lib = require('./dynamicPageHandlers.js');
let registered_users = [{username:'bhanutv',name:'Bhanu Teja Verma'},{username:'ishusi',name:'Ishu Singh'}];
let toS = o=>JSON.stringify(o,null,2);
const User = require('./model/user.js');
let ishu = new User("ishusi",2);

let logRequest = (req,res)=>{
  let text = ['--------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
};

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let redirectLoggedInUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout','/home','/toDoForm.html']) & !req.user) res.redirect('/index.html');
};

let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout']) && req.user) res.redirect('/index.html');
};


let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToLogin);
app.use(redirectLoggedOutUserToLogin);
app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.get('/index.html',lib.handleGetMainPage);

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
  res.redirect('/home');
})

app.get('/home',lib.handleHomePage);
app.post('/toDoForm.html',lib.handlePostNewTodo);
app.get('/logout',lib.handleLogoutPage);

const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
