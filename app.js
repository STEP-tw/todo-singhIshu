const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const lib = require('./handlers/pageHandlers.js');
const SessionHandler = require(path.resolve('handlers/sessionHandler.js'));
const UsersStore = require(path.resolve('models/usersStore.js'));

let sessionHandler = new SessionHandler('./data/sessionData.json',fs);
let usersStore = new UsersStore('./data/userInfo.json',fs);
let usersInfo = JSON.parse(fs.readFileSync('./data/userInfo.json','utf8'));
let users = Object.keys(usersInfo.users);
let app = express();
app.sessionHandler = sessionHandler;
app.sessionHandler.loadSessions();
app.usersStore  = usersStore;
app.usersStore.loadUsers();

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res,next)=>{
  let text = ['--------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
    console.log(req.url);
  fs.appendFile('request.log',text,()=>{});
  next();
};

let loadUser = (req,res,next)=>{
  let sessionid = req.cookies.sessionid;
  let username = app.sessionHandler.getUserBySessionID(sessionid);
  if (sessionid && username) {
    req.user = {username:username};
  }
  next();
};

let serveTodo = (req,res,next) => {
  if (req.user) {
    lib.serveTodo(req,res,app.usersStore);
  }
  next();
}

let redirectUnloggedUserToLogin = (req,res,next)=>{
  if(['/logout','/home','/toDoForm'].includes(req.url)  && !req.user) {
    res.redirect('/login');
    return;
  }
  next();
};

let redirectLoggedInUserToHome = (req,res,next)=>{
  if(['/login'].includes(req.url) && req.user){
    res.redirect('/home')
    return;
  }
  next();
};

let getTodoForm = (req,res)=>{
  res.setHeader('Content-Type','text/html');
  res.write(fs.readFileSync('./public/toDoForm.html'));
  res.end();
}

const processGetLogin = (req,res)=>{
  let message = req.cookies.message ;
  let content = fs.readFileSync('./public/login.html','utf8');
  res.setHeader('content-type','text/html');
  let loginPageContents = content.replace("<h2></h2>",message|| "");
  res.write(loginPageContents);
  res.end();
}

const processPostLogin =(req,res)=>{
  let isUser = users.includes(req.body.username);
  if(!isUser) {
    res.setHeader('Set-Cookie','message=login failed; Max-Age=5');
    res.redirect("/login");
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  app.sessionHandler.addSession(sessionid,req.body.username);
  res.redirect('/home');
}

let handleLogout = (req,res)=> {
  let sessionID = req.cookies.sessionid;
  app.sessionHandler.deleteSession(sessionID);
  res.redirect('/login');
}

let changeUrlToLogin = (req,res,next) =>{
  req.url = '/login';
  next();
}

const deleteTodo = (req,res,next)=>{
  lib.deleteToDo(req,res,app.usersStore);
  next();
}

const handleHomePage = (req,res)=>{
  lib.handleHomePage(req,res,app.usersStore);
}

const handlePostNewTodo =(req,res)=>{
  lib.handlePostNewTodo(req,res,app.usersStore);
  return;
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(loadUser);
app.use(logRequest);
app.use(serveTodo);
app.use(deleteTodo);
app.use(redirectUnloggedUserToLogin);
app.use(redirectLoggedInUserToHome);
app.get('/',changeUrlToLogin);

app.get('/login',processGetLogin);

app.post('/login',processPostLogin);

app.get('/toDoForm',getTodoForm);

app.get('/home',handleHomePage);
app.post('/toDoForm',handlePostNewTodo);
app.get('/logout',handleLogout);

module.exports = app;
