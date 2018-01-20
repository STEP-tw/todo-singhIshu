let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let th = require('./testHelper.js');
let PostLoginHandler = require('../handlers/postLoginHandler.js');

describe('PostLoginHandler()',()=>{
  let postLoginHandler = {};
  beforeEach(function() {
    postLoginHandler = new PostLoginHandler(myFs,filepath);
  })
  describe("execute()",()=>{
    let req = {
      method:'POST',
      url:'/',
      cookies:{sessionid:1243}
    }
    it('post loginPage',done=>{
      request(postLoginHandler.getRequestHandler(),req,(res)=>{
        res.redirect = function(path){
          this.statusCode = 302;
          this.setHeader('location',path);
          this.end();
        }
        th.should_be_redirected_to('/home')
      })
      done();
    })
  })
})
