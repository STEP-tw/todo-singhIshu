let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to index',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('POST /',()=>{
    it('responds with 404',done=>{
      request(app,{method:'POST',url:'/'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /index',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'TODO App');
        done();
      })
    })
  })

  describe('GET /index',()=>{
    it('serves the index page with login',done=>{
      request(app,{method:'GET',url:'/index'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('serves the index page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/index',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name:');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })

  describe('POST /index',()=>{
    it('redirects to homepage for valid user',done=>{
      request(app,{method:'POST',url:'/index',body:'username=ishusi'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/index',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/index');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
    it('redirects to login with message for empty username',done=>{
      request(app,{method:'POST',url:'/index',body:'username='},res=>{
        th.should_be_redirected_to(res,'/index');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
  })

  describe('GET /home',()=>{
    it('should redirect to index page if the user is not logged in',done=>{
      request(app,{method:'GET',url:'/home'},res=>{
        th.should_be_redirected_to(res,'/index');
        done();
      })
    })
  })

})
