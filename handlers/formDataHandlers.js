const fs = require('fs');
const ToDoApp = require('../model/toDoApp.js');

let toDoApp = new ToDoApp();
toDoApp.addUser('ishusi',0);
toDoApp.addUser('ponu',1);

const getUserData = (username) =>{
  return toDoApp.users[username];
}

let lib = {};

lib.getToDoDataBase = () => {
  let userInfoList = fs.readFileSync('../userDataBase.json','utf8');
  return JSON.parse(userInfoList);
}

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

lib.getPreviousToDo = (user,toDoID) => {
  let username = user.username;
  let userInfo = getUserData(username);
  if (lib.isTodoOfSameUser(userInfo.toDos,toDoID)) {
    user.todoID = toDoID;
    let toDo = toDoApp.getUserTodo(username,user.todoID);
    return lib.displayToDo(toDo);
  }
  return;
}


lib.deleteToDo = (username,toDoID) => {
  toDoApp.deleteTodoList(username,toDoID);
}


lib.getToDoMade = (toDoList)=> {
  let toDos=toDoList.map(function(toDo){
    return `<a href="${toDo.id}">${toDo.title}</a>`
  })
  return toDos.join("\n")
}


lib.getHomePage = (username) =>{
  let userData = getUserData(username);
  let homePageFormat = lib.getHomePageFormat();
  let userMadeToDos = lib.getToDoMade(userData.toDos);
  let homeWithUserName = homePageFormat.replace("UserName",userData.username);
  let homeWithToDoLists = homeWithUserName.replace("toDoMade",userMadeToDos);
  return homeWithToDoLists;
}

lib.displayToDo = (userInfo)=>{
  let toDoFormat = lib.getToDoFormat();
  let toDoItems = lib.displayToDoItem(userInfo.toDoItems);
  let toDoWithTitle = toDoFormat.replace("<titl>",userInfo.title);
  let toDoWithDes = toDoWithTitle.replace('<des>',userInfo.description);
  let toDoWithItem = toDoWithDes.replace('<item>',toDoItems);
  return toDoWithItem;
}

lib.displayToDoItem = (toDoItems) =>{
  let items=toDoItems.map(function(toDoItem){
    return `<br>${toDoItem.itemText}<br>`
  })
  return items.join("\n")
}

lib.extractItems = (toDoContents)=> {
  let toDoItems = [];
  for (var item in toDoContents) {
    if (item.startsWith('item')) {
      toDoItems.push(toDoContents[item]);
    }
  }
  return toDoItems;
}

lib.storeNewTodo = (username,toDoData) =>{
  let toDoItems = lib.extractItems(toDoData)
  let toDo = toDoApp.addToDoForUser(username,toDoData.title,toDoData.description);
  toDoItems.forEach(function(item) {
    toDoApp.addNewToDoItem(username,toDo.id,item);
  });
  return ToDoApp;
}


lib.replaceValue = (replacewith,name,content) =>{
  return content.replace(`<input type="text" name="${name}" value="">`,
  `<input type="text" name="${name}" value="${replacewith}">`);
}


lib.getEditForm = (username,toDoID) =>{
  let editForm = fs.readFileSync('./public/toDoForm.html','utf8');
  let todo = toDoApp.getUserTodo(username,toDoID);
  console.log(todo);
  editForm = lib.replaceValue(todo.title,'title',editForm);
  return lib.replaceValue(todo.description,'description',editForm);
}



module.exports = lib;
