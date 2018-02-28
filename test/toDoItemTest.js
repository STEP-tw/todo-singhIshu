let chai = require('chai');
let assert = chai.assert;
let ToDoItem = require('../models/toDoItem.js');

describe('ToDoItem',()=>{
  describe('new ToDoItem()',()=>{
    let toDoItem = {};
  
    it('tests that the ToDoItem has the itemText and status or not',()=>{
      let expected = {itemText:"go to shower",id:1,status:false}
      let toDoItem = new ToDoItem("go to shower",1);
      assert.deepEqual(toDoItem,expected);
    })
    it("the itemText of the toDoItem can be edited",()=>{
      let original = { itemText:"go shower",id:1,status :false};
      let expected = { itemText : "go to shower",id:1,status :false};
      let toDoItem = new ToDoItem("go shower",1);
      toDoItem.edit("go to shower");
      assert.deepEqual(toDoItem,expected);
    })
    it("the toDoItem can be marked as done",()=>{
      let toDoItem = new ToDoItem("go shower",1);
      toDoItem.setDone();
      assert.isOk(toDoItem.status);
    })
    it("the toDoItem can be marked as undone",()=>{
      let toDoItem = new ToDoItem("go shower",1);
      toDoItem.setUndone();
      assert.isNotOk(toDoItem.status);
    })
  })
})
