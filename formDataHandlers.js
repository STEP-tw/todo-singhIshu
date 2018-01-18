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

lib.isSameTitleAndUser = (toDo,title,username) => {
  return toDo.title == title && toDo.username == username;
}

lib.isATitleOfSameUser = (toDoList,title,username) => {
  return toDoList.some(function(toDo) {
    return lib.isSameTitleAndUser(toDo,title,username);
  })
}

lib.displayToDo = (title,username) => {
  let toDoList = lib.getToDoDataBase();
  if (lib.isATitleOfSameUser(toDoList,title,username)) {
    return username;
  }
  return;
}

lib.getPreviousToDo = (title,username) => {
  let toDoLists = lib.getToDoDataBase();
  for (var index = 0; index < toDoLists.length; index++) {
    if (lib.isSameTitleAndUser(toDoLists[index],title,username)) {
      return lib.displayToDo(toDoLists[index]);
    }
    return;
  }
}

lib.displayPreviousToDo = (title,userName) => {
  let toDoList = lib.getToDoDataBase();
  if (lib.isATitleOfSameUser(toDoList,title,userName)) {
    return lib.getPreviousToDo(title,userName);
  }
  return;
}


lib.getTheUserToDos = (userName,userDataBase) => {
  return userDataBase.filter(function(toDo) {
    return toDo.username = userName;
  })
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
  let toDoWithTitle = toDoFormat.replace("<titl>",userInfo.title);
  let toDoWithDes = toDoWithTitle.replace('<des>',userInfo.description);
  let toDoWithItem = toDoWithDes.replace('<item>',userInfo.item);
  return toDoWithItem;
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
