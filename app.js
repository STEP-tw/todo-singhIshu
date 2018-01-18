let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const lib = require('./dynamicPageHandlers.js');
let registered_users = [{username:'ponu',name:'Prateek Kumar Singh'},{username:'ishusi',name:'Ishu Singh'}];
let toS = o=>JSON.stringify(o,null,2);


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

let displayToDo = (req,res) => {
  if (req.user) {
    lib.displayUserToDo(req,res);
  }
}

let redirectLoggedInUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout','/home','/toDoForm.html']) & !req.user) res.redirect('/index.html');
};

let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout']) && req.user) res.redirect('/index.html');
};


let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(displayToDo);
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


module.exports = app;
