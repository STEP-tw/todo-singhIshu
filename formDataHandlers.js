const fs = require('fs');
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

lib.getPreviousToDo = (title,username) => {
  let toDoLists = lib.getToDoDataBase();
  for (var index = 0; index < toDoLists.length; index++) {
    // console.log(title,username);
    if (lib.isSameTitleAndUser(toDoLists[index],title,username)) {
      // console.log("same title");
      return lib.displayToDo(toDoLists[index]);
    }
    return;
  }
}

lib.displayPreviousToDo = (title,userName) => {
  let toDoList = lib.getToDoDataBase();
  // console.log(lib.isATitleOfSameUser(toDoList,title,userName));
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
    return `<a href="${toDo.title}">${toDo.title}</a>`
  })
  return toDos.join("\n")
}

lib.displayHomePage = (userInfo) => {
  let homePageFormat = lib.getHomePageFormat();
  let toDoDataBase = lib.getToDoDataBase();
  let userToDos = lib.getTheUserToDos(userInfo.username,toDoDataBase)
  if(userToDos.length == 0){
    let homeWithUserName = homePageFormat.replace("UserName",userInfo.name);
    return homeWithUserName;
  }
  let userMadeToDos = lib.getToDoMade(userToDos);
  let homeWithUserName = homePageFormat.replace("UserName",userInfo.name);
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

lib.storeTheUserTODOs = (userInfo,userTodo) =>{
  let userDatas = lib.getToDoDataBase();
  let newTodo = userTodo;
  newTodo.username = userInfo.username;
  userDatas.push(newTodo);
  fs.writeFileSync("./userDataBase.json",JSON.stringify(userDatas,null,2));
}



module.exports = lib;
