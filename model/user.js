const ToDo = require('./toDo.js');
class User {
  constructor(username,id) {
    this.username = username;
    this.id = id;
    this.counter = 0;
    this.toDos =[];
  }
  addToDo(title,description){
    let newToDo = new ToDo(title,this.counter++,description);
    this.toDos.push(newToDo);
  }
  getRequestedToDo(toDoID){
    return this.toDos.find((toDo)=>{
      return toDo.id == toDoID;
    })
  }
  getAllToDoTitles(){
    return this.toDos.map((toDo)=> {
      return toDo.title;
    })
  }
  deleteToDo(toDoID){
    let toDo = this.getRequestedToDo(toDoID);
    let toDoIndex = this.toDos.indexOf(toDo);
    this.toDos.splice(toDoIndex,1);
  }
  editTitleOfToDo(toDoID,newTitle){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.title = newTitle;
  }
  editDescrpOfToDo(toDoID,newDescrip){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.description = newDescrip;
  }
  addToDoItemInToDo(toDoID,title,status=false){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.addToDoItem(title,status);
  }
  deleteToDoItemInToDo(toDoID,toDoItemID){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.deleteToDoItem(toDoItemID);
  }
  editToDoItemInToDo(toDoID,toDoItemID,title){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.editToDoItem(toDoItemID,title);
  }
  markToDoItemAsDone(toDoID,toDoItemID){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.markItemAsDone(toDoItemID);
  }
  markToDoItemAsUndone(toDoID,toDoItemID){
    let toDo = this.getRequestedToDo(toDoID);
    toDo.markItemAsUndone(toDoItemID);
  }
}


module.exports = User;
