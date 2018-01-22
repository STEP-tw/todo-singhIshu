let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const GetLoginHandler = require('./handlers/getLoginHandler.js');
const lib = require('./handlers/pageHandlers.js');
let getLoginHandler = new GetLoginHandler(fs,'./public/login.html');
let users = require('./data/userInfo.json');
let app = WebApp.create();

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
    console.log(req.url);
  fs.appendFile('request.log',text,()=>{});
};

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = users.find(u=>u.sessionid==sessionid);
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
  if(req.urlIsOneOf(['/logout','/home','/toDoForm','/delete','/edit'])  && !req.user) res.redirect('/login');
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

  let user = users.find(u=>u.username==req.body.username);
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

app.use(loadUser);
app.use(logRequest);
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
