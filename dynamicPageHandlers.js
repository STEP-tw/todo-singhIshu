const fs = require('fs');
const lib = require('./formDataHandlers.js');
const ToDoApp = require('./model/toDoApp.js');

let toDoApp = new ToDoApp();
toDoApp.addUser('ishusi');
toDoApp.addUser('ponu');

const getLoginPage = (req,res)=>{
  return fs.readFileSync('./public/index.html','utf8');
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

pageLib.handleHomePage = (req,res) => {
  let userHomePage = lib.displayHomePage(req.user);
  res.write(userHomePage);
  res.end();
}

pageLib.isAUserAndNotAStaticPage = (req) =>{
  let staticPages = ['/home','/index.html'];
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
  lib.storeTheUserTODOs(req.user,req.body);
  let toDoPage = lib.displayToDo(req.body);
  res.write(toDoPage);
  res.end();
}

pageLib.handleLogoutPage = function(req,res) {
  delete req.user.sessionid;
  res.redirect('index.html');
}


module.exports = pageLib;
