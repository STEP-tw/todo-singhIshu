const fs = require('fs');
const lib = require('./formDataHandlers.js');
const getLoginPage = (req,res)=>{
  let fileName = './public/index.html';
  return fs.readFileSync(fileName,'utf8');
}

let pageLib = {};

const isATitleOfSameUser = (toDoList,title,username) => {
  return toDoList.some(function(toDo) {
    return lib.isSameTitleAndUser(toDo,title,username);
  })
}

pageLib.handleGetMainPage = (req,res) =>{
  let loginPage = getLoginPage();
  res.setHeader('Content-type','text/html');
  res.write(loginPage.replace("<h2></h2>",req.cookies.message || ""));
  res.end();
}

pageLib.displayUserToDo = (req,res) =>{
  let toDoPage = lib.getPreviousToDo(req.user,req.url.slice(1));
  if (toDoPage == undefined) {
    return;
  }
  res.setHeader('Content-type','text/html');
  res.write(toDoPage);
  res.end();
  return;
}

pageLib.handleHomePage = (req,res) => {
  let userHomePage = lib.displayHomePage(req.user.username);
  res.write(userHomePage);
  res.end();
}

pageLib.isAUserAndNotAStaticPage = (req) =>{
  let staticPages = ['/home','/index'];
  return req.user && !staticPages.includes(req.url);
}

pageLib.viewPreviousTodo = (req,res) => {
  if (pageLib.isAUserAndNotAStaticPage(req)) {
    res.write(lib.displayPreviousToDo(req.url.slice(1),req.user.username))
    res.end();
  }
  return;
}

pageLib.handlePostNewTodo = (req,res) => {
  let username =  req.user.username;
  lib.storeNewTodo(username,req.body);
  res.redirect('/home');
  res.end();
}

pageLib.handleLogoutPage = function(req,res) {
  delete req.user.sessionid;
  res.redirect('/index');
}

pageLib.deleteToDo = (req,res)=>{
  let username = req.user.username;
  let todoID = req.user.todoID;
  lib.deleteToDo(username,todoID);
  res.redirect('/home');
}


module.exports = pageLib;