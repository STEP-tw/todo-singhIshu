class ToDo {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.toDoItems = [];
  }
  editTitle(newTitle){
    this.title = newTitle;
  }
  editDescription(newDescription){
    this.description = newDescription;
  }
  addToDoItem(toDoItem){
    this.toDoItems.push(toDoItem);
  }
  getIndexOfToDoItem(toDoItem){
    return this.toDoItems.findIndex(function(item) {
      return toDoItem == item;
    })
  }
  deleteToDoItem(toDoItem){
    let indexOfToDoItem = this.getIndexOfToDoItem(toDoItem);
    this.toDoItems.splice(indexOfToDoItem,1);
  }
}


module.exports = ToDo;
