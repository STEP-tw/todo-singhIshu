class ToDoItem {
  constructor(text,id,status) {
    this.text = text;
    this.status = status || false;
    this.id = id;
  }
  edit(newText){
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
