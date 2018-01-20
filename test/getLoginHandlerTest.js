let chai = require('chai');
let assert = chai.assert;
let fs = require('fs');
let request = require('./requestSimulator.js');
let th = require('./testHelper.js');
let GetLoginHandler = require('../handlers/getLoginHandler.js');


describe('GetLoginHandler()',()=>{
  let getLoginHandler = {};
  beforeEach(function(){
    getLoginHandler = new GetLoginHandler('welcome to loginPage<h2></h2>');
  })
  describe("execute()",()=>{
    let req = {
      method:'GET',
      url:'/',
      cookies:{}
    }
    it(`get loginPage when message cookie does'nt exist` ,done=>{
      request(getLoginHandler.getRequestHandler(),req,(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,"loginPage");
      })
      done();
    })
  })
  describe("execute()",()=>{
    let req = {
      method:'GET',
      cookies:{message:"loginFailed"}
    }
    it('get loginPage message cookie exists',done=>{
      request(getLoginHandler.getRequestHandler(),req,(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,"login");
      })
      done();
    })
  })
})
