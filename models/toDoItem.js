class ToDoItem {
  constructor(itemText,id) {
    this.itemText = itemText;
    this.status = false;
    this.id = id;
  }
  edit(newTitle){
    this.itemText = newTitle;
  }
  setDone(){
    this.status = true;
  }
  setUndone(){
    this.status = false;
  }
}


module.exports = ToDoItem;
