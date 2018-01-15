let chai = require('chai');
let assert = chai.assert;
let ToDoItem = require('../model/toDoItem.js');

describe('ToDoItem',()=>{
  describe('new ToDoItem()',()=>{
    it('tests that the ToDoItem has the text and status or not',()=>{
      let expected = {text:"go to shower",status:true}
      let toDoItem = new ToDoItem("go to shower",true);
      assert.deepEqual(toDoItem,expected);
    })
    it("the text of the toDoItem can be edited",()=>{
      let original = { text:"go shower",status :false};
      let expected = { text : "go to shower",status :false};
      let toDoItem = new ToDoItem("go shower");
      toDoItem.edit("go to shower");
      assert.deepEqual(toDoItem,expected);
    })
    it("the toDoItem can be marked as done",()=>{
      let toDoItem = new ToDoItem("go shower");
      toDoItem.setDone();
      assert.isOk(toDoItem.status);
    })
    it("the toDoItem can be marked as undone",()=>{
      let toDoItem = new ToDoItem("go shower");
      toDoItem.setUndone();
      assert.isNotOk(toDoItem.status);
    })
  })
})
