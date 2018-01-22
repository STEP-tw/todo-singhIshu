const fs = require('fs');
const lib = require('./dataHandlers.js');
let pageLib = {};

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

module.exports = pageLib;
