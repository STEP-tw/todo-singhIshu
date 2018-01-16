let chai = require('chai');
let assert = chai.assert;
let ToDo = require('../model/toDo.js');

describe('ToDo',()=>{
  describe('new ToDo()',()=>{
    it('tests that the toDo has title and description or not',()=>{
      let expected = {title:"make tea",id:1,description:"make ginger tea",counter:0,toDoItems:[]};
      let toDo = new ToDo("make tea",1,"make ginger tea",);
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
      let toDoItem =[{text:"get a cup of water",id:0,status:false}];
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of water",false);
      assert.deepEqual(toDoItem,toDo.toDoItems);
    })
  })
  describe('getIndexOfToDoItem',()=>{
    it('getIndexOfToDoItem gives the first index of the given toDoItem',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of water",false);
      let index = toDo.getIndexOfToDoItem({text:"get a cup of water",id:0,status:false});
      assert.equal(index,0);
    })
  })
  describe('deleteToDoItem',()=>{
    it('deleteToDoItem removes that toDoItem from the toDoList',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of water",false);
      toDo.deleteToDoItem({text:"get a cup of water",id:0,status:false});
      assert.deepEqual(toDo.toDoItems,[]);
    })
  })
  describe('editToDoItem',()=>{
    it('editToDoItem sets new value to the selected toDoItem from the toDoList',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.editToDoItem({text:"get a cup of H2O",id:0,status:false},"get a cup of water");
      assert.deepEqual(toDo.toDoItems,[{text:"get a cup of water",id:0,status:false}]);
    })
  })
  describe('markItemAsDone',()=>{
    it('markItemAsDone sets the toDoItem as done',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.markItemAsDone({text:"get a cup of H2O",id:0,status:false});
      assert.deepEqual(toDo.toDoItems,[{text:"get a cup of H2O",id:0,status:true}]);
    })
  })
  describe('markAsUndone',()=>{
    it('markAsUndone sets the toDoItem as undone',()=>{
      let toDo = new ToDo("make tee",1,"make ginjar tea");
      toDo.addToDoItem("get a cup of H2O",false);
      toDo.markAsUndone({text:"get a cup of H2O",id:0,status:false});
      assert.deepEqual(toDo.toDoItems,[{text:"get a cup of H2O",id:0,status:false}]);
    })
  })
})
