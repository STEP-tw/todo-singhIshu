let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let th = require('./testHelper.js');
let LoginHandler = require('../handlers/loginHandler.js');

describe('loginHandler()',()=>{
  beforeEach(function(){
    loginHandler = new LoginHandler();
  })
  describe('getHandler()',()=>{
    let req = {
      method:'GET',
      url:'/',
      cookies:{message:'login failed'}
    }
    it('get loginPage',done=>{
      request(loginHandler.getHandler,req,(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,"login")
      })
      done();
    })
  })
  describe('postHandler()',()=>{
    let req = {
      method:'POST',
      url:'/index',
      cookies:{sessionid:'124'},``    }
    it('post after loginPage',done=>{
      request(loginHandler.postLoginHandler(),req,(res)=>{
        th.should_be_redirected_to(res,'/home');
      })
      done();
    })
  })
