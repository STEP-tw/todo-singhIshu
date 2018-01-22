const fs = require('fs');
const lib = require('./dataHandlers.js');
const getLoginPage = (req,res)=>{
  let fileName = './public/login.html';
  return fs.readFileSync(fileName,'utf8');
}

let pageLib = {};


const isATitleOfSameUser = (toDoList,title,username) => {
  return toDoList.some(function(toDo) {
    return lib.isSameTitleAndUser(toDo,title,username);
  })
}

pageLib.displayTodo = (req,res) =>{
  let toDoPage = lib.getToDo(req.user,req.url.slice(1));
  if (toDoPage == undefined) {
    return;
  }
  res.setHeader('Content-type','text/html');
  res.write(toDoPage);
  res.end();
  return;
}

pageLib.handleHomePage = (req,res) => {
  let userHomePage = lib.getHomePage(req.user.username);
  res.write(userHomePage);
  res.end();
}

pageLib.handlePostNewTodo = (req,res) => {
  let username =  req.user.username;
  lib.storeNewTodo(username,req.body);
  res.redirect('/home');
  res.end();
}

pageLib.handleLogoutPage = function(req,res) {
  delete req.user.sessionid;
  res.redirect('/login');
}

pageLib.deleteToDo = (req,res)=>{
  let username = req.user.username;
  let todoID = req.user.todoID;
  lib.deleteToDo(username,todoID);
  res.redirect('/home');
}

pageLib.editToDo = (req,res)=>{
  let username = req.user.username;
  let todoID = req.user.todoID;
  res.setHeader('Content-type','text/html');
  let editedForm = lib.getEditForm(username,todoID);
  res.write(editedForm);
  res.end();
}

pageLib.getEdittedTodo =(req,res) =>{
  let toDo = JSON.stringify(req.body);
  res.write(toDo);
  res.end();
}


module.exports = pageLib;
