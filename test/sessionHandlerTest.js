let chai = require('chai');
let assert = chai.assert;
const MockFs = require('../handlers/mockfs.js');
let SessionHandler = require('../handlers/sessionHandler.js');

describe('sessionHandler ',()=>{
  let sessionHandler = {};
  beforeEach(function(){
    let mockFs = new MockFs();
    sessionHandler = new SessionHandler('./data/sessionData.json',mockFs);
  })
  describe('addSession()',()=>{
    it('should add new session ',done=>{
      sessionHandler.addSession(1234,'ishusi');
      let expected = {1234:"ishusi"};
      let actual = sessionHandler.sessions;
      assert.deepEqual(actual,expected);
      done();
    })
  })
  describe('deleteSession()',()=>{
    it('should delete the session ',done=>{
      sessionHandler.addSession(1234,'ishusi');
      sessionHandler.deleteSession(1234);
      let actual = sessionHandler.sessions;
      assert.deepEqual(actual,{});
      done();
    })
  })
  describe('loadSessions()',()=>{
    it('should load all the sessions into SessionHandler',done=>{
      let actual = sessionHandler.sessions;
      let expected = {1234:"ishusi"};
      sessionHandler.addSession(1234,'ishusi');
      sessionHandler.loadSessions();
      assert.deepEqual(actual,expected);
      done();
    })
  })
  describe('getUserBySessionID()',()=>{
    it('should return the username by sessionID',done=>{
      sessionHandler.addSession(1234,'ishusi');
      let actual = sessionHandler.getUserBySessionID(1234);
      assert.deepEqual(actual,'ishusi');
      done();
    })
  })
})
