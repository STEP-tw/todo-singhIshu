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
    return user.addToDo(title,description);
  }
  getUserTodo(username,toDoID){
    let user = this.users[username];
    return user.getToDo(toDoID);
  }
  getToDoItemFrom(username,toDoID,toDoItemID){
    let user = this.users[username];
    return user.getToDoItem(toDoID,toDoItemID);
  }
  getAllTodoLists(username){
    let user = this.users[username];
    return user.getAllToDoTitles();
  }
  deleteTodoList(username,toDoID){
    let user = this.users[username];
    user.deleteToDo(toDoID);
  }
  editTodoTitle(username,toDoID,title){
    let user = this.users[username];
    user.editTitleOfToDo(toDoID,title);
  }
  editTodoDescription(username,toDoID,description){
    let user = this.users[username];
    user.editDescrpOfToDo(toDoID,description);
  }
  addNewToDoItem(username,toDoID,itemText){
    let user = this.users[username];
    user.addItemInToDo(toDoID,itemText);
  }
  deleteToDoItem(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.deleteItemInToDo(toDoID,toDoItemID);
  }
  updateToDoItem(username,toDoID,toDoItemID,itemText){
    let user = this.users[username];
    user.editItemInToDo(toDoID,toDoItemID,itemText);
  }
  markItemDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsDone(toDoID,toDoItemID);
  }
  markItemNotDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsUndone(toDoID,toDoItemID);
  }
}

module.exports = ToDoApp;
