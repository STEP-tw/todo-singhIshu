let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const StaticFileHandler = require('./handlers/StaticFileHandler.js');
const GetLoginHandler = require('./handlers/getLoginHandler.js');
const lib = require('./handlers/pageHandlers.js');
let fileHandler = new StaticFileHandler('./public',fs);
let getLoginHandler = new GetLoginHandler(fs,'./public/login.html');
let SessionHandler = require('./handlers/sessionHandler.js');
let sessionHandler = new SessionHandler('./data/sessionData.json',fs);
let users = JSON.parse(fs.readFileSync('./data/userInfo.json','utf8'));
let app = WebApp.create();
app.sessionHandler = sessionHandler;
app.sessionHandler.loadSessions();

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
  let username = app.sessionHandler.getUserBySessionID(sessionid);
  if (sessionid && username) {
    req.user = {username:username};
  }
};

let serveTodo = (req,res) => {
  if (req.user) {
    lib.serveTodo(req,res);
  }
}

let redirectUnloggedUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout','/home','/toDoForm','/edit'])  && !req.user) res.redirect('/login');
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
  app.sessionHandler.addSession(sessionid,user.username);
  res.redirect('/home');
}

let handleLogout = (req,res)=> {
  let sessionID = req.cookies.sessionid;
  app.sessionHandler.deleteSession(sessionID);
  res.redirect('/login');
}


app.use(loadUser);
app.use(logRequest);
app.use(express.static('public'));
app.use(serveTodo);
app.use(lib.deleteToDo);
app.use(redirectUnloggedUserToLogin);
app.use(redirectLoggedInUserToHome);
<<<<<<< HEAD
// app.get('/',changeUrlToLogin);
=======
app.get('/',(req,res)=>{
  res.redirect('/login');
});
>>>>>>> parent of c21ae83... App is using express framework and testing app by using supertest.

app.get('/login',processGetLogin());

app.post('/login',processPostLogin);

app.get('/toDoForm',getTodoForm);

app.get('/home',lib.handleHomePage);
app.post('/toDoForm',lib.handlePostNewTodo);
app.get('/logout',handleLogout);
app.usePostProcess(fileHandler.getRequestHandler());

module.exports = app;
