const ToDo = require('./toDo.js');
class User {
  constructor(username) {
    this.username = username;
    this.counter = 0;
    this.toDos =[];
  }
  addToDo(title,description,id=this.counter++){
    let newToDo = new ToDo(title,id,description);
    this.toDos.push(newToDo);
    return newToDo;
  }
  getToDo(toDoID){
    return this.toDos.find((toDo)=>{
      return toDo.id == toDoID;
    })
  }
  getAllToDoTitles(){
    return this.toDos.map((toDo)=> {
      return toDo.title;
    })
  }
  getToDoItem(toDoID,toDoItemID){
    let toDo = this.getToDo(toDoID);
    return toDo.getToDoItem(toDoItemID);
  }
  deleteToDo(toDoID){
    let toDo = this.getToDo(toDoID);
    let toDoIndex = this.toDos.indexOf(toDo);
    this.toDos.splice(toDoIndex,1);
  }
  editTitleOfToDo(toDoID,newTitle){
    let toDo = this.getToDo(toDoID);
    toDo.title = newTitle;
  }
  editDescrpOfToDo(toDoID,newDescrip){
    let toDo = this.getToDo(toDoID);
    toDo.description = newDescrip;
  }

  addItemInToDo(toDoID,itemText,status,itemID){
    let toDo = this.getToDo(toDoID);
    return toDo.addToDoItem(itemText,status,itemID);
  }
  deleteItemInToDo(toDoID,toDoItemID){
    let toDo = this.getToDo(toDoID);
    toDo.deleteToDoItem(toDoItemID);
  }
  editItemInToDo(toDoID,toDoItemID,title){
    let toDo = this.getToDo(toDoID);
    toDo.editToDoItem(toDoItemID,title);
  }
  markToDoItemAsDone(toDoID,toDoItemID){
    let toDo = this.getToDo(toDoID);
    toDo.markItemAsDone(toDoItemID);
  }
  markToDoItemAsUndone(toDoID,toDoItemID){
    let toDo = this.getToDo(toDoID);
    toDo.markItemAsUndone(toDoItemID);
  }
}


module.exports = User;
