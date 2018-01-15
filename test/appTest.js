let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../server.js');
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
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'TODO App');
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('serves the index page with login',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name:');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('serves the index page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/index.html',headers:{'cookie':'message=login failed'}},res=>{
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
      request(app,{method:'POST',url:'/index.html',body:'username=ishusi'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login.html with message for invalid user',done=>{
      request(app,{method:'POST',url:'/index.html',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
  })
  describe('GET /toDoForm.html',()=>{
    it('redirects to /',done=>{
      request(app,{method:'POST',url:'/index.html',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        done();
      })
    })
  })
})
