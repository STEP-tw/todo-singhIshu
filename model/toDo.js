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
  getIndexOfToDoItem(toDoItem){
    return this.toDoItems.findIndex(function(item) {
      return toDoItem.id == item.id;
    })
  }
  getToDoItem(toDoItem){
    return this.toDoItems.find(function(item) {
      return toDoItem.id == item.id;
    })
  }
  deleteToDoItem(toDoItem){
    let indexOfToDoItem = this.getIndexOfToDoItem(toDoItem);
    this.toDoItems.splice(indexOfToDoItem,1);
  }
  editToDoItem(toDoItem,newText){
    let oldToDoItem = this.getToDoItem(toDoItem);
    oldToDoItem.text = newText;
  }
  markItemAsDone(toDoItem){
    let doneToDoItem = this.getToDoItem(toDoItem);
    doneToDoItem.status = true;
  }
  markAsUndone(toDoItem){
    let doneToDoItem = this.getToDoItem(toDoItem);
    doneToDoItem.status = false;
  }
}


module.exports = ToDo;
