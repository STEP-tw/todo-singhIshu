const fs = require('fs');

const getUserInfo = (username,usersStore) =>{
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

lib.getToDo = (req,usersStore) => {
  let username = req.user.username;
  let toDoID = getIDFromUrl(req.url);
  let userInfo = getUserInfo(username,usersStore);
  if (lib.isTodoOfSameUser(userInfo.toDos,toDoID)) {
    let toDo = usersStore.getUserTodo(username,toDoID);
    return lib.getTodoInHTML(toDo,toDoID);
  }
}

lib.getLinksOfTodos = (toDoList)=> {
  let toDos=toDoList.map(function(toDo){
    return `<a href=viewTodo.${toDo.id}>${toDo.title}</a>`
  })
  return toDos.join("\n")
}


lib.getHomePage = (username,usersStore) =>{
  let userData = getUserInfo(username,usersStore);
  let homePageFormat = lib.getHomePageFormat();
  let userToDos = lib.getLinksOfTodos(userData.toDos);
  let homeWithUserName = homePageFormat.replace("UserName",userData.username);
  let homeWithToDoLists = homeWithUserName.replace("toDoMade",userToDos);
  return homeWithToDoLists;
}

lib.getEditAndDeleteLinks = (toDoID) => {
  let editLink = `<a href="/edit/${toDoID}"><button>Edit</button></a>`
  let deleteLink = `<a href="/delete/:${toDoID}/"><button>Delete</button></a>`
  return `${editLink}<br>${deleteLink}`;
}

lib.getTodoInHTML = (toDoInfo,toDoID)=>{
  let toDoFormat = lib.getToDoFormat();
  let editAndDeleteLinks = lib.getEditAndDeleteLinks(toDoID);
  let toDoItems = lib.getTodoItemsInHTML(toDoInfo.toDoItems);
  let toDoWithTitle = toDoFormat.replace("<titl>",toDoInfo.title);
  let toDoWithDes = toDoWithTitle.replace('<des>',toDoInfo.description);
  let toDoWithItem = toDoWithDes.replace('<item>',toDoItems);
  let toDoPage =toDoWithItem.replace('editReplacer',editAndDeleteLinks);
  return toDoPage;
}

lib.getTodoItemsInHTML = (toDoItems) =>{
  let items=toDoItems.map(function(toDoItem){
    return `<br>${toDoItem.itemText} is ${toDoItem.status}<br>`
  })
  return items.join("\n")
}


lib.storeTodoItems = (username,toDoContents,todoID,usersStore)=> {
  let toDoItems = [];
  let attributesOfToDo = Object.keys(toDoContents);
  for (var attribute in toDoContents) {
    if (attribute.startsWith('item')) {
      let itemText = toDoContents[attribute];
      let toDoItem =usersStore.addNewToDoItem(username,todoID,itemText);;
      let itemID = attribute.slice(4);
      if (attributesOfToDo.includes(itemID)) {
        usersStore.markItemDone(username,todoID,toDoItem.id);
      }
    }
  }
  return toDoItems;
}

lib.storeNewTodo = (username,toDoData,userStore) =>{
  let toDo = userStore.addToDoForUser(username,toDoData.title,toDoData.description);
  lib.storeTodoItems(username,toDoData,toDo.id,userStore);
  userStore.storeUsers();
}




module.exports = lib;
