let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let th = require('./testHelper.js');
let GetLoginHandler = require('../handlers/getLoginHandler.js');


describe('GetLoginHandler()',()=>{
  let getLoginHandler = {};
  let myFs = {
    readFileSync:function(filepath) {
      return filepath;
    }
  }
  describe('myFs()',()=>{
    it('readFileSync()',done=>{
      let filepath = './public/login.html';
      let actual = myFs.readFileSync(filepath);
      assert.equal(filepath,actual);
      done();
    })
  })
  beforeEach(function(){
    let filepath = './public/login.html';
    getLoginHandler = new GetLoginHandler(myFs,filepath);
  })

  describe("execute()",()=>{
    let req = {
      method:'GET',
      url:'/',
      cookies:{message:'login failed'}
    }
    it('get loginPage',done=>{
      request(getLoginHandler.getRequestHandler(),req,(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,"login")
      })
      done();
    })
  })
})
