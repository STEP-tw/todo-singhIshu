class ToDoItem {
  constructor(text,id) {
    this.text = text;
    this.status = false;
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
