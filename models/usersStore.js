const User = require('./user.js');
class UsersStore {
  constructor(storagePath,fs) {
    this.fs = fs;
    this.storagePath = storagePath;
    this.users ={};
  }
  addUser(user){
    return this.users[user.username] = user;
  }
  loadUsers(){
    let self = this;
    let usersInfo = this.fs.readFileSync(this.storagePath,'utf8');
    usersInfo = JSON.parse(usersInfo);
    let appUsers = Object.keys(usersInfo.users);
    appUsers.forEach(function(user){
      let newUser = new User(user);
      let todoList = usersInfo.users[user].toDos;
      todoList.forEach(function (todo) {
        newUser.addToDo(todo.title,todo.description,todo.id);
        todo.toDoItems.forEach(function(item){
          newUser.addItemInToDo(todo.id,item.itemText,item.status,item.id);
        })
      })
      self.addUser(newUser);
    })
  }

  storeUsers(){
    let usersInfo = JSON.stringify({"users":this.users},null,2);
    this.fs.writeFileSync(this.storagePath,usersInfo);
    return ;
  }

  getUser(username){
    return this.users[username];
  }
  addToDoForUser(username,title,description){
    let user = this.getUser(username);
    return user.addToDo(title,description);
  }
  getUserTodo(username,toDoID){
    let user = this.users[username];
    return user.getToDo(toDoID);
  }
  getToDoItemFrom(username,toDoID,toDoItemID){
    let user = this.users[username];
    return user.getToDoItem(toDoID,toDoItemID);
  }
  getAllTodoLists(username){
    let user = this.users[username];
    return user.getAllToDoTitles();
  }
  deleteTodoList(username,toDoID){
    let user = this.users[username];
    user.deleteToDo(toDoID);
  }
  editTodoTitle(username,toDoID,title){
    let user = this.users[username];
    user.editTitleOfToDo(toDoID,title);
  }
  editTodoDescription(username,toDoID,description){
    let user = this.users[username];
    user.editDescrpOfToDo(toDoID,description);
  }
  addNewToDoItem(username,toDoID,itemText){
    let user = this.users[username];
    return user.addItemInToDo(toDoID,itemText);
  }
  deleteToDoItem(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.deleteItemInToDo(toDoID,toDoItemID);
  }
  updateToDoItem(username,toDoID,toDoItemID,itemText){
    let user = this.users[username];
    user.editItemInToDo(toDoID,toDoItemID,itemText);
  }
  markItemDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsDone(toDoID,toDoItemID);
  }
  markItemNotDone(username,toDoID,toDoItemID){
    let user = this.users[username];
    user.markToDoItemAsUndone(toDoID,toDoItemID);
  }
}

module.exports = UsersStore;
