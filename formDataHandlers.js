const fs = require('fs');
const ToDoApp = require('./model/toDoApp.js');

let toDoApp = new ToDoApp();
toDoApp.addUser('ishusi',0);
toDoApp.addUser('ponu',1);

const getUserData = (username) =>{
  return toDoApp.users[username];
}

let lib = {};

lib.getToDoDataBase = () => {
  let userInfoList = fs.readFileSync('./userDataBase.json','utf8');
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

lib.getPreviousToDo = (username,toDoID) => {
  let user = getUserData(username);
  if (lib.isTodoOfSameUser(user.toDos,toDoID)) {
    let toDo = toDoApp.getUserTodo(username,toDoID);
    return lib.displayToDo(toDo);
  }
  return;
}


lib.getToDoMade = (toDoList)=> {
  let toDos=toDoList.map(function(toDo){
    return `<a href="${toDo.id}">${toDo.title}</a>`
  })
  return toDos.join("\n")
}


lib.displayHomePage = (username) =>{
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

lib.storeTheUserTODOs = (username,newInfo) =>{
  let toDoItems = newInfo.item;
  let toDo = toDoApp.addToDoForUser(username,newInfo.title,newInfo.description);
  for (var i = 0; i < toDoItems.length; i++) {
    toDoApp.addNewToDoItem(username,toDo.id,toDoItems[i]);
  }
  return ToDoApp;
}



module.exports = lib;
