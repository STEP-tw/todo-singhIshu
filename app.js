let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const GetLoginHandler = require('./handlers/getLoginHandler.js');
const lib = require('./handlers/dynamicPageHandlers.js');
let getLoginHandler = new GetLoginHandler(fs,'./public/login.html');
let registered_users = [{username:'ponu',name:'Prateek Kumar Singh',sessionid:0},{username:'ishusi',name:'Ishu Singh',sessionid:1}];
let toS = o=>JSON.stringify(o,null,2);

const processGetLogin= function(req,res) {
  let loginPageContents = fs.readFileSync('./public/login.html','utf8');
  let getLoginHandler = new GetLoginHandler(loginPageContents);
  return getLoginHandler.getRequestHandler();
}

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
    lib.displayTodo(req,res);
  }
}

let redirectUnloggedUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout','/home','/toDoForm','/delete'])  && !req.user) res.redirect('/login');
};

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/login']) && req.user) res.redirect('/home');
};

let getTodoForm = (req,res)=>{
  res.setHeader('Content-type','text/html');
  res.write(fs.readFileSync('./public/toDoForm.html'));
  res.end();
}

let processPostLogin =(req,res)=>{
  let user = registered_users.find(u=>u.username==req.body.username);
  if(!user) {
    res.setHeader('Set-Cookie','message=login failed; Max-Age=5');
    res.redirect("/login");
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}


let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(displayToDo);
app.use(redirectUnloggedUserToLogin);
app.use(redirectLoggedInUserToHome);
app.get('/',(req,res)=>{
  res.redirect('/login');
});

app.get('/login',processGetLogin());

app.post('/login',processPostLogin);

app.get('/toDoForm',getTodoForm);

app.get('/home',lib.handleHomePage);
app.post('/toDoForm',lib.handlePostNewTodo);
app.get('/logout',lib.handleLogoutPage);
app.get('/delete',lib.deleteToDo);
app.get('/edit',lib.editToDo);
app.post('/edit',lib.getEdittedTodo);


module.exports = app;
