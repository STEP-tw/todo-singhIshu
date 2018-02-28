let chai = require('chai');
let assert = chai.assert;
let User = require('../models/user.js');

describe('User',()=>{
  describe('new User()',()=>{
    it('tests if the user has username and id or not',()=>{
      let expected = {username:'Ishu',counter:0,toDos:[]};
      let ishu = new User("Ishu",1);
      assert.deepEqual(expected,ishu);
    })
  })
  describe('addToDo',()=>{
    it('addToDo adds new toDo to the userToDos',()=>{
      let toDos = [{title:"wash clothes",counter :0,id:0,description:"sunday work",toDoItems:[]}];
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash clothes","sunday work");
      assert.deepEqual(toDos,ishu.toDos);
    })
    it('addToDo adds new toDo without taking description userToDos',()=>{
      let toDos = [{title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]}];
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash clothes");
      assert.deepEqual(toDos,ishu.toDos);
    })
  })
  describe('getAllToDoTitles',()=>{
    it('getAllToDoTitles gives all the titles of the usermade ToDos',()=>{
      let expectedToDo = ["wash clothes"]
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash clothes");
      let toDo = ishu.getAllToDoTitles();
      assert.deepEqual(expectedToDo,toDo);
    })
  })
  describe('getToDo',()=>{
    it('getToDo gives ToDo from the usermade ToDos',()=>{
      let expectedToDo = {title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]};
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash clothes");
      let toDo = ishu.getToDo(0);
      assert.deepEqual(expectedToDo,toDo);
    })
  })
  describe('deleteToDo',()=>{
    it('deleteToDo deletes the given ToDo from the usermade ToDos',()=>{
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash clothes");
      ishu.deleteToDo(0);
      assert.deepEqual(ishu.toDos,[]);
    })
  })
  describe('editTitleOfToDo',()=>{
    it('editTitleOfToDo sets new title to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let expected = [{title:"wash clothes",counter :0,id:0,description:"",toDoItems:[]}];
      ishu.addToDo("wash cloth");
      ishu.editTitleOfToDo(0,"wash clothes");
      assert.deepEqual(ishu.toDos,expected);
    })
  })
  describe('editDescrpOfToDo',()=>{
    it('editDescrpOfToDo sets new description to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let expected = [{title:"wash clothes",counter :0,id:0,description:"sunday task",toDoItems:[]}];
      ishu.addToDo("wash clothes");
      ishu.editDescrpOfToDo(0,"sunday task");
      assert.deepEqual(ishu.toDos,expected);
    })
  })
  describe('addItemInToDo',()=>{
    it('addItemInToDo adds new ToDoItem to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{itemText:"bring dirty clothes",id:0,status:false}];
      ishu.addToDo("wash cloth");
      ishu.addItemInToDo(0,'bring dirty clothes');
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('deleteItemInToDo',()=>{
    it('deleteItemInToDo adds new ToDoItem to the given toDo',()=>{
      let ishu = new User("Ishu",1);
      ishu.addToDo("wash cloth");
      ishu.deleteItemInToDo(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,[]);
    })
  })
  describe('editItemInToDo',()=>{
    it('editItemInToDo sets new value to the toDoItem in given toDo',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{itemText:"bring dirty clothes",id:0,status:false}];
      ishu.addToDo("wash cloth");
      ishu.addItemInToDo(0,'bring dirty kapde');
      ishu.editItemInToDo(0,0,'bring dirty clothes')
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('markToDoItemAsDone',()=>{
    it('markToDoItemAsDone set the toDoItem of the toDo as done',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{itemText:"bring dirty clothes",id:0,status:true}];
      ishu.addToDo("wash cloth");
      ishu.addItemInToDo(0,'bring dirty clothes');
      ishu.markToDoItemAsDone(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
  describe('markToDoItemAsUndone',()=>{
    it('markToDoItemAsUndone set the toDoItem of the toDo as undone',()=>{
      let ishu = new User("Ishu",1);
      let toDoItems =[{itemText:"bring dirty clothes",id:0,status:false}];
      ishu.addToDo("wash cloth");
      ishu.addItemInToDo(0,'bring dirty clothes');
      ishu.markToDoItemAsUndone(0,0);
      assert.deepEqual(ishu.toDos[0].toDoItems,toDoItems);
    })
  })
})
