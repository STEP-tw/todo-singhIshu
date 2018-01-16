const ToDo = require('./toDo.js');
class User {
  constructor(username,id) {
    this.username = username;
    this.id = id;
    this.counter = 0;
    this.toDos =[];
  }
  addToDoList(title,description = ''){
    let newToDoList = new ToDo(title,this.counter++,description);
    this.toDos.push(newToDoList);
  }
  getIndexOfToDo(toDoID){
    return this.toDos.findIndex(function(toDo) {
      return toDo.id == toDoID;
    })
  }
  getUserToDo(toDoID){
    return this.toDos.find(function(toDo) {
      return toDo.id == toDoID;
    })
  }
  deleteToDoList(toDoID){
    let toDoIndex = this.getIndexOfToDo(toDoID);
    this.toDos.splice(toDoIndex,1);
  }
  editTitleOfToDoList(toDoID,newTitle){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.title = newTitle;
  }
  editDescrpOfToDoList(toDoID,newDescrip){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.description = newDescrip;
  }
  addToDoItemInToDo(toDoID,title,status=false){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.addToDoItem(title,status);
  }
  deleteToDoItemInToDo(toDoID,toDoItemID){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.deleteToDoItem(toDoItemID);
  }
  editToDoItemInToDo(toDoID,toDoItemID,title){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.editToDoItem(toDoItemID,title);
  }
  markToDoItemAsDone(toDoID,toDoItemID){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.markItemAsDone(toDoItemID);
  }
  markToDoItemAsUndone(toDoID,toDoItemID){
    let toDoList = this.getUserToDo(toDoID);
    toDoList.markAsUndone(toDoItemID);
  }
}


module.exports = User;
