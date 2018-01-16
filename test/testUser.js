let chai = require('chai');
let assert = chai.assert;
let User = require('../model/user.js');

describe('User',()=>{
  describe('new User()',()=>{
    it('tests if the user has username and id or not',()=>{
      let expected = {username:'Ishu',id:1,counter:0,toDos:[]};
      let ishu = new User("Ishu",1);
      assert.deepEqual(expected,ishu);
    })
  })
  describe('addToDoList',()=>{
    it('addToDoList adds new toDoList to the userToDos',()=>{
      let toDos = [{title:"wash clothes",counter :0,id:0,description:"sunday work",toDoItems:[]}];
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash clothes","sunday work");
      assert.deepEqual(toDos,ishu.toDos);
    })
    it('addToDoList adds new toDoList without taking description userToDos',()=>{
      let toDos = [{title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]}];
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash clothes");
      assert.deepEqual(toDos,ishu.toDos);
    })
  })
  describe('getIndexOfToDo',()=>{
    it('getIndexOfToDo gives the index of the ToDo from the usermade ToDos',()=>{
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash clothes","sunday work");
      let toDoIndex = ishu.getIndexOfToDo(0);
      assert.equal(toDoIndex,0);
    })
  })
  describe('getUserToDo',()=>{
    it('getUserToDo gives ToDo from the usermade ToDos',()=>{
      let expectedToDo = {title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]};
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash clothes");
      let toDo = ishu.getUserToDo(0);
      assert.deepEqual(expectedToDo,toDo);
    })
  })
  describe('deleteToDoList',()=>{
    it('deleteToDoList deletes the given ToDo from the usermade ToDos',()=>{
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash clothes");
      ishu.deleteToDoList(0);
      assert.deepEqual(ishu.toDos,[]);
    })
  })
  describe('editTitleOfToDoList',()=>{
    it('editTitleOfToDoList sets new title to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let expected = [{title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]}];
      ishu.addToDoList("wash cloth");
      ishu.editTitleOfToDoList(0,"wash clothes");
      assert.deepEqual(ishu.toDos,expected);
    })
  })
  describe('editDescrpOfToDoList',()=>{
    it('editDescrpOfToDoList sets new description to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let expected = [{title:"wash clothes",counter :0,id:0,description:"sunday task",toDoItems:[]}];
      ishu.addToDoList("wash clothes");
      ishu.editDescrpOfToDoList(0,"sunday task");
      assert.deepEqual(ishu.toDos,expected);
    })
  })
  describe('addToDoItemInToDo',()=>{
    it('addToDoItemInToDo adds new ToDoItem to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{text:"bring dirty clothes",id:0,status:false}];
      ishu.addToDoList("wash cloth");
      ishu.addToDoItemInToDo(0,'bring dirty clothes');
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('deleteToDoItemInToDo',()=>{
    it('deleteToDoItemInToDo adds new ToDoItem to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      ishu.addToDoList("wash cloth");
      ishu.deleteToDoItemInToDo(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,[]);
    })
  })
  describe('editToDoItemInToDo',()=>{
    it('editToDoItemInToDo sets new value to the toDoItem in given toDo',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{text:"bring dirty clothes",id:0,status:false}];
      ishu.addToDoList("wash cloth");
      ishu.addToDoItemInToDo(0,'bring dirty kapde');
      ishu.editToDoItemInToDo(0,0,'bring dirty clothes')
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('markToDoItemAsDone',()=>{
    it('markToDoItemAsDone set the toDoItem of the toDo as done',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{text:"bring dirty clothes",id:0,status:true}];
      ishu.addToDoList("wash cloth");
      ishu.addToDoItemInToDo(0,'bring dirty clothes');
      ishu.markToDoItemAsDone(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('markToDoItemAsUndone',()=>{
    it('markToDoItemAsUndone set the toDoItem of the toDo as undone',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{text:"bring dirty clothes",id:0,status:false}];
      ishu.addToDoList("wash cloth");
      ishu.addToDoItemInToDo(0,'bring dirty clothes');
      ishu.markToDoItemAsUndone(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
})
