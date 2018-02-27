const fs = require('fs');
const UsersStore = require('../models/usersStore.js');

let usersStore = new UsersStore();
usersStore.addUser('ishusi',0);
usersStore.addUser('ponu',1);
usersStore.addToDoForUser('ishusi',"sunday");

const getUserInfo = (username) =>{
  return usersStore.users[username];
}

const getIDFromUrl = (url) =>{
  return url.split('.')[1];
}

let lib = {};

lib.getHomePageFormat = ()=>{
  return fs.readFileSync('./public/homePage.html','utf8');
}

lib.getToDoFormat = ()=> {
  return fs.readFileSync('./public/toDoFormat.html','utf8');
}

lib.isTodoOfSameUser = (toDoList,toDoID) => {
  return toDoList.some(function(toDo) {
    return toDo.id == toDoID;
  })
}

lib.getToDo = (req) => {
  let username = req.user.username;
  let toDoID = getIDFromUrl(req.url);
  let userInfo = getUserInfo(username);
  if (lib.isTodoOfSameUser(userInfo.toDos,toDoID)) {
    let toDo = usersStore.getUserTodo(username,toDoID);
    return lib.getTodoInHTML(toDo,toDoID);
  }
  return;
}


lib.deleteTodo = (req) => {
  let username = req.user.username;
  let toDoID = getIDFromUrl(req.url);
  usersStore.deleteTodoList(username,toDoID);
}


lib.getLinksOfTodos = (toDoList)=> {
  let toDos=toDoList.map(function(toDo){
    return `<a href=viewTodo.${toDo.id}>${toDo.title}</a>`
  })
  return toDos.join("\n")
}


lib.getHomePage = (username) =>{
  let userData = getUserInfo(username);
  let homePageFormat = lib.getHomePageFormat();
  let userToDos = lib.getLinksOfTodos(userData.toDos);
  let homeWithUserName = homePageFormat.replace("UserName",userData.username);
  let homeWithToDoLists = homeWithUserName.replace("toDoMade",userToDos);
  return homeWithToDoLists;
}

<<<<<<< HEAD
lib.getEditAndDeleteLinks = (toDoID) => {
  let editLink = `<a href="/edit/${toDoID}"><button>Edit</button></a>`
  let deleteLink = `<a href="/delete/:${toDoID}/"><button>Delete</button></a>`
=======
lib.makeEditAndDeleteLinks = (toDoID) => {
  let editLink = `<a href="/edit.${toDoID}"><button>Edit</button></a>`
  let deleteLink = `<a href="/delete.${toDoID}"><button>Delete</button></a>`
>>>>>>> parent of c21ae83... App is using express framework and testing app by using supertest.
  return `${editLink}<br>${deleteLink}`;
}

lib.getTodoInHTML = (userInfo,toDoID)=>{
  let toDoFormat = lib.getToDoFormat();
  let editAndDeleteLinks = lib.makeEditAndDeleteLinks(toDoID);
  let toDoItems = lib.getTodoItemsInHTML(userInfo.toDoItems);
  let toDoWithTitle = toDoFormat.replace("<titl>",userInfo.title);
  let toDoWithDes = toDoWithTitle.replace('<des>',userInfo.description);
  let toDoWithItem = toDoWithDes.replace('<item>',toDoItems);
  let toDoPage =toDoWithItem.replace('editReplacer',editAndDeleteLinks);
  return toDoPage;
}

lib.getTodoItemsInHTML = (toDoItems) =>{
  let items=toDoItems.map(function(toDoItem){
    return `<br>${toDoItem.itemText}<br>`
  })
  return items.join("\n")
}


lib.storeTodoItems = (username,toDoContents,todoID)=> {
  let toDoItems = [];
  let attributesOfToDo = Object.keys(toDoContents);
  for (var attribute in toDoContents) {
    if (attribute.startsWith('item')) {
      let itemText = toDoContents[attribute];
      let toDoItem =usersStore.addNewToDoItem(username,todoID,itemText);
      let itemID = attribute.slice(4);
      if (attributesOfToDo.includes(itemID)) {
        usersStore.markItemDone(username,todoID,toDoItem.id);
        return;
      }
    }
  }
  return toDoItems;
}

lib.storeNewTodo = (username,toDoData) =>{
  let toDo = usersStore.addToDoForUser(username,toDoData.title,toDoData.description);
  lib.storeTodoItems(username,toDoData,toDo.id);
}

lib.replaceValue = (replacewith,name,content) =>{
  return content.replace(`<input type="text" name="${name}" value="">`,
  `<input type="text" name="${name}" value="${replacewith}">`);
}

lib.getEditForm = (username,toDoID) =>{
  let editForm = fs.readFileSync('./public/toDoForm.html','utf8');
  let todo = usersStore.getUserTodo(username,toDoID);
  editForm = lib.replaceValue(todo.title,'title',editForm);
  return lib.replaceValue(todo.description,'description',editForm);
}



module.exports = lib;
