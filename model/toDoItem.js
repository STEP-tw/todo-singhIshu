class ToDoItem {
  constructor(text,status) {
    this.text = text;
    this.status = status || false;
  }
  editToDoItem(newText){
    this.text = newText;
  }
  setDone(){
    this.status = true;
  }
  setUndone(){
    this.status = false;
  }
}


module.exports = ToDoItem;
