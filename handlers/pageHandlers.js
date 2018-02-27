const fs = require('fs');
const lib = require('./dataHandlers.js');
let pageLib = {};

pageLib.serveTodo = (req,res) =>{
  if(isStartswith(req.url,'/viewTodo.')){
    let toDoPage = lib.getToDo(req);
    if (toDoPage == undefined) return;
    res.setHeader('Content-type','text/html');
    res.write(toDoPage);
    res.end();
  }
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

const isStartswith = (url,action)=>{
  return url.startsWith(action);
}


<<<<<<< HEAD
pageLib.deleteToDo = (req,res,usersStore)=>{
  if (isStartswith(req.url,'/delete/:id')) {
=======
pageLib.deleteToDo = (req,res)=>{
  if (isStartswith(req.url,'/delete.')) {
>>>>>>> parent of c21ae83... App is using express framework and testing app by using supertest.
    if (!req.user) {
      res.redirect('/login');
      return;
    }
    lib.deleteTodo(req);
    res.redirect('/home');
  }
  return;
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
