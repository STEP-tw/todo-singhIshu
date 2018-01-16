const ToDoItem = require('./toDoItem.js');
class ToDo {
  constructor(title,id,description) {
    this.title = title;
    this.id = id;
    this.description = description || '';
    this.counter = 0;
    this.toDoItems = [];
  }
  editTitle(newTitle){
    this.title = newTitle;
  }
  editDescription(newDescription){
    this.description = newDescription;
  }
  addToDoItem(title,status){
    let newToDoItem = new ToDoItem(title,this.counter++,status);
    this.toDoItems.push(newToDoItem);
  }
  getToDoItem(toDoItemID){
    return this.toDoItems.find((item)=>{
      return toDoItemID == item.id;
    })
  }
  deleteToDoItem(toDoItemID){
    let toDoItem = this.getToDoItem(toDoItemID);
    let indexOfToDoItem = this.toDoItems.indexOf(toDoItem);
    this.toDoItems.splice(indexOfToDoItem,1);
  }
  editToDoItem(toDoItemID,newText){
    let oldToDoItem = this.getToDoItem(toDoItemID);
    oldToDoItem.edit(newText);
  }
  markItemAsDone(toDoItemID){
    let doneToDoItem = this.getToDoItem(toDoItemID);
    doneToDoItem.setDone();
  }
  markItemAsUndone(toDoItemID){
    let doneToDoItem = this.getToDoItem(toDoItemID);
    doneToDoItem.setUndone();
  }
}


module.exports = ToDo;
