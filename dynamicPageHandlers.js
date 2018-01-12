const fs = require('fs');
const lib = require('./formDataHandlers.js');
let registered_users = [{username:'bhanutv',name:'Bhanu Teja Verma'},{username:'ishusi',name:'Ishu Singh'}];

const getLoginPage = (req,res)=>{
  return fs.readFileSync('./public/index.html','utf8');
}

let pageLib = {};


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
