let chai = require('chai');
let assert = chai.assert;
let ToDo = require('../models/toDo.js');

describe('ToDo',()=>{
  describe('new ToDo()',()=>{
    it('tests that the toDo has title and description or not',()=>{
      let expected = {title:"make tea",id:1,description:"make ginger tea",counter:0,toDoItems:[]};
      let toDo = new ToDo("make tea",1,"make ginger tea");
      assert.deepEqual(expected,toDo);
    })
  })
  describe('editTitle',()=>{
    it('edit title sets new value to the title',()=>{
      let title ="make tea";
      let toDo = new ToDo("make tee",1,"make ginger tea");
      toDo.editTitle("make tea");
      assert.equal(title,toDo.title);
    })
  })
  describe('editDescription',()=>{
    it('edit description sets new value to the description',()=>{
      let title ="make ginger tea";
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.editDescription("make ginger tea");
      assert.equal(title,toDo.description);
    })
  })
  describe('addToDoItem',()=>{
    it('addToDoItem adds a toDoItem to the toDoItem List',()=>{
      let toDoItem =[{itemText:"get a cup of water",id:0,status:false}];
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of water",false);
      assert.deepEqual(toDoItem,toDo.toDoItems);
    })
  })
  describe('deleteToDoItem',()=>{
    it('deleteToDoItem removes that toDoItem from the toDoList',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of water",false);
      toDo.deleteToDoItem(0);
      assert.deepEqual(toDo.toDoItems,[]);
    })
  })
  describe('editToDoItem',()=>{
    it('editToDoItem sets new value to the selected toDoItem from the toDoList',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.editToDoItem(0,"get a cup of water");
      assert.deepEqual(toDo.toDoItems,[{itemText:"get a cup of water",id:0,status:false}]);
    })
  })
  describe('markItemAsDone',()=>{
    it('markItemAsDone sets the toDoItem as done',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.markItemAsDone(0);
      assert.deepEqual(toDo.toDoItems,[{itemText:"get a cup of H2O",id:0,status:true}]);
    })
  })
  describe('markItemAsUndone',()=>{
    it('markItemAsUndone sets the toDoItem as undone',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.markItemAsUndone(0);
      assert.deepEqual(toDo.toDoItems,[{itemText:"get a cup of H2O",id:0,status:false}]);
    })
  })
})
