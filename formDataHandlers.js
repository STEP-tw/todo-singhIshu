const fs = require('fs');
let lib = {};

lib.getUserDataBase = () => {
  let userInfoList = fs.readFileSync('./userDataBase.json','utf8');
  return JSON.parse(userInfoList);
}

lib.getHomePageFormat = ()=>{
  return fs.readFileSync('./public/homePage.html','utf8');
}

lib.getToDoFormat = ()=> {
  return fs.readFileSync('./public/toDoFormat.html','utf8');
}

lib.getToDoMade = (toDoList)=> {
  let toDos=toDoList.map(function(toDo){
    return `<a href="${toDo.title}">${toDo.title}</a>`
  })
  return toDos.join("\n")
}

lib.displayHomePage = (userInfo) => {
  let userDataBase = lib.getUserDataBase();
  userInfo=userDataBase.find(u=>u.username==userInfo.username);
  let homePageFormat = lib.getHomePageFormat();
  let userMadeToDos = lib.getToDoMade(userInfo.toDoList);
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
  let userDatas = lib.getUserDataBase();
  let currentUser = userDatas.find(u=>u.username==userInfo.username);
  if (!currentUser) {
    let newUser = userInfo;
    newUser.toDoList = [];
    newUser.toDoList.push(userTodo);
    userDatas.push(newUser);
  }
  else {
    currentUser.toDoList.push(userTodo);
  }
  fs.writeFileSync("./userDataBase.json",JSON.stringify(userDatas,null,2));
}



module.exports = lib;
