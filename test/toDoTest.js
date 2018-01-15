let chai = require('chai');
let assert = chai.assert;
let ToDo = require('../model/toDo.js');

describe('ToDo',()=>{
  describe('new ToDo()',()=>{
    it('tests that the toDo has title and description or not',()=>{
      let expected = {title:"make tea",description:"make ginger tea",toDoItems:[]};
      let toDo = new ToDo("make tea","make ginger tea");
      assert.deepEqual(expected,toDo);
    })
  })
  describe('editTitle',()=>{
    it('edit title sets new value to the title',()=>{
      let title ="make tea";
      let toDo = new ToDo("make tee","make ginger tea");
      toDo.editTitle("make tea");
      assert.equal(title,toDo.title);
    })
  })
  describe('editDescription',()=>{
    it('edit description sets new value to the description',()=>{
      let title ="make ginger tea";
      let toDo = new ToDo("make tee","make ginjar tea");
      toDo.editDescription("make ginger tea");
      assert.equal(title,toDo.description);
    })
  })
  describe('addToDoItem',()=>{
    it('addToDoItem adds a toDoItem to the toDoItem List',()=>{
      let title =["get a cup of water"];
      let toDo = new ToDo("make tee","make ginjar tea");
      toDo.addToDoItem("get a cup of water");
      assert.deepEqual(title,toDo.toDoItems);
    })
  })
  describe('getIndexOfToDoItem',()=>{
    it('getIndexOfToDoItem gives the first index of the given toDoItem',()=>{
      let toDo = new ToDo("make tee","make ginjar tea");
      toDo.addToDoItem("get a cup of water");
      let index = toDo.getIndexOfToDoItem("get a cup of water")
      assert.equal(index,0);
    })
  })
  describe('getIndexOfToDoItem',()=>{
    it('getIndexOfToDoItem gives the first index of the given toDoItem',()=>{
      let toDo = new ToDo("make tee","make ginjar tea");
      toDo.addToDoItem("get a cup of water");
      let index = toDo.getIndexOfToDoItem("get a cup of water")
      assert.equal(index,0);
    })
  })
  describe('deleteToDoItem',()=>{
    it('deleteToDoItem removes that toDoItem from the toDoList',()=>{
      let toDo = new ToDo("make tee","make ginjar tea");
      toDo.addToDoItem("get a cup of water");
      toDo.deleteToDoItem("get a cup of water");
      assert.deepEqual(toDo.toDoItems,[]);
    })
  })
})
