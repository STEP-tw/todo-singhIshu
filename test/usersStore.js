let chai = require('chai');
let assert = chai.assert;
let UsersStore = require('../model/usersStore.js');

describe('UsersStore',()=>{
  describe('new usersStore()',()=>{
    it('tests that the usersStore has usersStore or not',()=>{
      let usersStore = new UsersStore();
      assert.deepEqual(usersStore,{users:{}});
    })
  })
  describe('addUser()',()=>{
    it('addUser adds new user to the usersStore',()=>{
      let expectedUsers = {users:{'ishu':{username:'ishu',id:'12',"counter": 0,"id": 12,"toDos": []}}};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      assert.deepEqual(usersStore,expectedUsers);
    })
  })
  describe('getUser()',()=>{
    it('getUser takes the username and gives the user present in usersStore',()=>{
      let expectedUser = {username:'ishu',id:'12',"counter": 0,"id": 12,"toDos": []};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.getUser('ishu')
      assert.deepEqual(usersStore.users['ishu'],expectedUser);
    })
  })
  describe('addToDoForUser()',()=>{
    it('addToDoForUser adds a new toDo for the user',()=>{
      let expectedToDo = [{title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]}];
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea','make ginger tea');
      assert.deepEqual(usersStore.users['ishu'].toDos,expectedToDo);
    })
  })
  describe('getUserTodo()',()=>{
    it('getUserTodo adds a new toDo for the user',()=>{
      let expectedToDo = {title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea','make ginger tea');
      let requestedUser=usersStore.getUserTodo('ishu',0);
      assert.deepEqual(requestedUser,expectedToDo);
    })
  })
  describe('getToDoItemFrom()',()=>{
    it('getToDoItemFrom gives the toDoItem of the userTODO',()=>{
      let expectedToDo = {itemText:"get a cup of H2O",id:0,status:false};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea','make ginger tea');
      usersStore.addNewToDoItem('ishu',0,'get a cup of H2O');
      let requestedUser=usersStore.getToDoItemFrom('ishu',0,0);
      assert.deepEqual(requestedUser,expectedToDo);
    })
  })
  describe('getAllTodoLists()',()=>{
    it('getAllTodoLists gives list of all the toDos of the user',()=>{
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea','make ginger tea');
      usersStore.addToDoForUser('ishu','have lunch');
      let toDoTitles=usersStore.getAllTodoLists('ishu');
      assert.deepEqual(toDoTitles,['make Tea','have lunch']);
    })
  })
  describe('deleteTodoList()',()=>{
    it('deleteTodoList takes the id of the toDo and deletes the user toDo',()=>{
      let expectedToDos = [{title:"make Tea",id:0,description:"make ginger tea",counter:0,toDoItems:[]}];
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea','make ginger tea');
      usersStore.addToDoForUser('ishu','have lunch');
      usersStore.deleteTodoList('ishu',1);
      assert.deepEqual(usersStore.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('editTodoTitle()',()=>{
    it('editTodoTitle changes the value of the title of the userTODO',()=>{
      let expectedToDos = [{title:"make Coffee",id:0,description:"",counter:0,toDoItems:[]}];
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Tea');
      usersStore.editTodoTitle('ishu',0,"make Coffee");
      assert.deepEqual(usersStore.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('editTodoDescription()',()=>{
    it('editTodoDescription changes the value of the description of the userTODO',()=>{
      let expectedToDos = [{title:"make Coffee",id:0,description:"hard coffee",counter:0,toDoItems:[]}];
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.editTodoDescription('ishu',0,"hard coffee");
      assert.deepEqual(usersStore.users['ishu'].toDos,expectedToDos);
    })
  })
  describe('addNewToDoItem()',()=>{
    it('addNewToDoItem adds new toDoItem in the userToDo',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addNewToDoItem('ishu',0,"get a cup of water");
      let toDoItem = usersStore.getToDoItemFrom('ishu',0,0);
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('deleteToDoItem()',()=>{
    it('deleteToDoItem deletes toDoItem in the userToDo',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addUser('dhanu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addToDoForUser('dhanu','make Coffee','light coffee');
      usersStore.deleteToDoItem('ishu',0,1);
      let toDoItem = usersStore.getToDoItemFrom('ishu',0,0);
      assert.deepEqual(toDoItem,undefined);
    })
  })
  describe('updateToDoItem()',()=>{
    it('updateToDoItem edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addNewToDoItem('ishu',0,"get a cup of water");
      usersStore.updateToDoItem('ishu',0,0,"get a cup of water");
      let toDoItem = usersStore.getToDoItemFrom('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('markItemDone()',()=>{
    it('markItemDone edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:true};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addNewToDoItem('ishu',0,"get a cup of water");
      usersStore.markItemDone('ishu',0,0,"get a cup of water");
      let toDoItem = usersStore.getToDoItemFrom('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
  describe('markItemNotDone()',()=>{
    it('markItemNotDone edits the title of the toDoItem of userTODO',()=>{
      let expectedToDoItems = {itemText:"get a cup of water",id:0,status:false};
      let usersStore = new UsersStore();
      usersStore.addUser('ishu',12);
      usersStore.addToDoForUser('ishu','make Coffee','light coffee');
      usersStore.addNewToDoItem('ishu',0,"get a cup of water");
      usersStore.markItemNotDone('ishu',0,0,"get a cup of water");
      let toDoItem = usersStore.getToDoItemFrom('ishu',0,0)
      assert.deepEqual(toDoItem,expectedToDoItems);
    })
  })
})
