const User = require('./user.js');
class ToDoApp {
  constructor() {
    this.users ={};
  }
  addUser(username,sessionid){
    this.users[username] = new User(username,sessionid);
  }
  getUser(username){
    return this.users[username];
  }
  addToDoForUser(username,title,description){
    let user = this.users[username];
    user.addToDo(title,description);
  }
  getRequstdToDoOfUser(username,toDoID){
    let user = this.users[username];
    return user.getRequestedToDo(toDoID);
  }
  getRequestedToDoItemOfUser(username,toDoID,toDoItemID){
    let user = this.users[username];
    return user.getToDoItemInToDo(toDoID,toDoItemID);
  }
  getAllToDoTitlesOfUser(username){
    let user = this.users[username];
    return user.getAllToDoTitles();
  }
  deleteAToDoOfUser(username,toDoID){
    let user = this.users[username];
    user.deleteToDo(toDoID);
  }
  editTitleOfUserToDo(username,toDoID,title){
    let user = this.users[username];
    user.editTitleOfToDo(toDoID,title);
  }
  editDescrpOfUserToDo(username,toDoID,description){
    let user = this.users[username];
    user.editDescrpOfToDo(toDoID,description);
  }
  addToDoItemInUserToDo(username,toDoID,itemText){
    let user = this.users[username];
    user.addToDoItemInToDo(toDoID,itemText);
  }
  deleteToDoItemInUserToDo(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.deleteToDoItemInToDo(toDoID,toDoItemID);
  }
  editToDoItemInUserToDo(username,toDoID,toDoItemID,itemText){
    let user = this.users[username];
    user.editToDoItemInToDo(toDoID,toDoItemID,itemText);
  }
  markToDoItemOfUserToDoAsDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsDone(toDoID,toDoItemID);
  }
  markToDoItemOfUserToDoNotDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsUndone(toDoID,toDoItemID);
  }
}


module.exports = ToDoApp;
