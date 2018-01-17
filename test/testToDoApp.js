let chai = require('chai');
let assert = chai.assert;
let ToDoApp = require('../model/toDoApp.js');

describe('ToDoApp',()=>{
  describe('new ToDoApp()',()=>{
    it('tests that the toDoApp has users or not',()=>{
      let toDoApp = new ToDoApp();
      assert.deepEqual(toDoApp,{users:{}});
    })
  })
  describe('addUser()',()=>{
    it('addUser adds new user to the toDoApp',()=>{
      let expectedUsers = {users:{'ishu':{username:'ishu',id:'12',"counter": 0,"id": 12,"toDos": []}}};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      assert.deepEqual(toDoApp,expectedUsers);
    })
  })
  describe('getUser()',()=>{
    it('getUser takes the username and gives the user present in toDoApp',()=>{
      let expectedUser = {username:'ishu',id:'12',"counter": 0,"id": 12,"toDos": []};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.getUser('ishu')
      assert.deepEqual(toDoApp.users['ishu'],expectedUser);
    })
  })
  describe('addToDoForUser()',()=>{
    it('addToDoForUser adds a new toDo for the user',()=>{
      let expectedToDo = [{title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]}];
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea','make ginger tea');
      assert.deepEqual(toDoApp.users['ishu'].toDos,expectedToDo);
    })
  })
  describe('getRequstdToDoOfUser()',()=>{
    it('getRequstdToDoOfUser adds a new toDo for the user',()=>{
      let expectedToDo = {title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea','make ginger tea');
      let requestedUser=toDoApp.getRequstdToDoOfUser('ishu',0);
      assert.deepEqual(requestedUser,expectedToDo);
    })
  })
  describe('getRequestedToDoItemOfUser()',()=>{
    it('getRequestedToDoItemOfUser gives the toDoItem of the userTODO',()=>{
      let expectedToDo = {itemText:"get a cup of H2O",id:0,status:false};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea','make ginger tea');
      toDoApp.addToDoItemInUserToDo('ishu',0,'get a cup of H2O');
      let requestedUser=toDoApp.getRequestedToDoItemOfUser('ishu',0,0);
      assert.deepEqual(requestedUser,expectedToDo);
    })
  })
  describe('getAllToDoTitlesOfUser()',()=>{
    it('getAllToDoTitlesOfUser gives list of all the toDos of the user',()=>{
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea','make ginger tea');
      toDoApp.addToDoForUser('ishu','have lunch');
      let toDoTitles=toDoApp.getAllToDoTitlesOfUser('ishu');
      assert.deepEqual(toDoTitles,['make Tea','have lunch']);
    })
  })
  describe('deleteAToDoOfUser()',()=>{
    it('deleteAToDoOfUser takes the id of the toDo and deletes the user toDo',()=>{
      let expectedToDos = [{title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]}];
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea','make ginger tea');
      toDoApp.addToDoForUser('ishu','have lunch');
      toDoApp.deleteAToDoOfUser('ishu',1);
      assert.deepEqual(toDoApp.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('editTitleOfUserToDo()',()=>{
    it('editTitleOfUserToDo changes the value of the title of the userTODO',()=>{
      let expectedToDos = [{title:"make Coffee",id:0,description:"",counter:0,toDoItems:[]}];
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Tea');
      toDoApp.editTitleOfUserToDo('ishu',0,"make Coffee");
      assert.deepEqual(toDoApp.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('editDescrpOfUserToDo()',()=>{
    it('editDescrpOfUserToDo changes the value of the description of the userTODO',()=>{
      let expectedToDos = [{title:"make Coffee",id:0,description:"hard coffee",counter:0,toDoItems:[]}];
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.editDescrpOfUserToDo('ishu',0,"hard coffee");
      assert.deepEqual(toDoApp.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('addToDoItemInUserToDo()',()=>{
    it('addToDoItemInUserToDo adds new toDoItem in the userToDo',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.addToDoItemInUserToDo('ishu',0,"get a cup of water");
      let toDoItem = toDoApp.getRequestedToDoItemOfUser('ishu',0,0);
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('deleteToDoItemInUserToDo()',()=>{
    it('deleteToDoItemInUserToDo deletes toDoItem in the userToDo',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.deleteToDoItemInUserToDo('ishu',0,0);
      let toDoItem = toDoApp.getRequestedToDoItemOfUser('ishu',0,0);
      assert.deepEqual(toDoItem,undefined);
    })
  })
  describe('editToDoItemInUserToDo()',()=>{
    it('editToDoItemInUserToDo edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.addToDoItemInUserToDo('ishu',0,"get a cup of water");
      toDoApp.editToDoItemInUserToDo('ishu',0,0,"get a cup of water");
      let toDoItem = toDoApp.getRequestedToDoItemOfUser('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('markToDoItemOfUserToDoAsDone()',()=>{
    it('markToDoItemOfUserToDoAsDone edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:true};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.addToDoItemInUserToDo('ishu',0,"get a cup of water");
      toDoApp.markToDoItemOfUserToDoAsDone('ishu',0,0,"get a cup of water");
      let toDoItem = toDoApp.getRequestedToDoItemOfUser('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('markToDoItemOfUserToDoNotDone()',()=>{
    it('markToDoItemOfUserToDoNotDone edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let toDoApp = new ToDoApp();
      toDoApp.addUser('ishu',12);
      toDoApp.addToDoForUser('ishu','make Coffee','light coffee');
      toDoApp.addToDoItemInUserToDo('ishu',0,"get a cup of water");
      toDoApp.markToDoItemOfUserToDoNotDone('ishu',0,0,"get a cup of water");
      let toDoItem = toDoApp.getRequestedToDoItemOfUser('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
})
