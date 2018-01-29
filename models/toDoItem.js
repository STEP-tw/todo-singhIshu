class ToDoItem {
  constructor(itemText,id,status=false) {
    this.itemText = itemText;
    this.status = status;
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
