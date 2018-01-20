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
    it('redirects to login',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
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
  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'TODO App');
        done();
      })
    })
  })

  describe('GET /login',()=>{
    it('serves the login page with login',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name:');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })

  describe('POST /login',()=>{
    it('redirects to homepage for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=ishusi'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
    it('redirects to login with message for empty username',done=>{
      request(app,{method:'POST',url:'/login',body:'username='},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
  })

  describe('GET /home',()=>{
    it('should redirect to login page if the user is not logged in',done=>{
      request(app,{method:'GET',url:'/home'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })

})
