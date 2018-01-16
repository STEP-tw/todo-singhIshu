const ToDoItem = require('./toDoItem.js');
class ToDo {
  constructor(title,id,description) {
    this.title = title;
    this.id = id;
    this.description = description;
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
  getIndexOfToDoItem(toDoItemID){
    return this.toDoItems.findIndex(function(item) {
      return toDoItemID == item.id;
    })
  }
  getToDoItem(toDoItemID){
    return this.toDoItems.find(function(item) {
      return toDoItemID == item.id;
    })
  }
  deleteToDoItem(toDoItemID){
    let indexOfToDoItem = this.getIndexOfToDoItem(toDoItemID);
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
  markAsUndone(toDoItemID){
    let doneToDoItem = this.getToDoItem(toDoItemID);
    doneToDoItem.setUndone();
  }
}


module.exports = ToDo;
