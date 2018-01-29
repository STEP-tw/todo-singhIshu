const fs = require('fs');
const lib = require('./dataHandlers.js');
let pageLib = {};

pageLib.serveTodo = (req,res,usersStore) =>{
  if(isStartswith(req.url,'/viewTodo.')){
    let toDoPage = lib.getToDo(req,usersStore);
    if (toDoPage == undefined) return;
    res.setHeader('Content-type','text/html');
    res.write(toDoPage);
    res.end();
  }
  return;
}

pageLib.handleHomePage = (req,res,usersStore) => {
  let userHomePage = lib.getHomePage(req.user.username,usersStore);
  res.write(userHomePage);
  res.end();
}

pageLib.handlePostNewTodo = (req,res,usersStore) => {
  let username =  req.user.username;
  lib.storeNewTodo(username,req.body,usersStore);
  res.redirect('/home');
  return;
}

const isStartswith = (url,action)=>{
  return url.startsWith(action);
}

const getIDFromUrl = (url) =>{
  return url.split('.')[1];
}


pageLib.deleteToDo = (req,res,usersStore)=>{
  if (isStartswith(req.url,'/delete.')) {
    if (!req.user) {
      res.redirect('/login');
      return;
    }
    let toDoID = getIDFromUrl(req.url);
    usersStore.deleteTodoList(req.user.username,toDoID);
    usersStore.storeUsers();
    res.redirect('/home');
  }
  return;
}

module.exports = pageLib;
