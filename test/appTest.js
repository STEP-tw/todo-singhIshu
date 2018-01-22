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
    it('redirects to login',()=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
        assert.equal(res.body,"");
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
    it('redirects the home page if already loggedin',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'sessionid=0'}},res=>{
        th.should_be_redirected_to(res,'/home');
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


  describe('GET /home',()=>{
    it('should redirect to login page if the user is not logged in',done=>{
      request(app,{method:'GET',url:'/home'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app,{method:'GET',url:'/home',headers:{'cookie':'sessionid=2'}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should give home page for valid user',done=>{
      request(app,{method:'GET',url:'/home',headers:{'cookie':'sessionid=0'}},res=>{
        th.status_is_ok(res);
        done();
      })
    })
  })

  describe('GET /toDoForm',()=>{
    it('serves the todo form to valid user',done=>{
      request(app,{method:'GET',url:'/toDoForm',headers:{'cookie':'sessionid=0'}},res=>{
        th.status_is_ok(res);
        done();
      })
    })
    it('should redirect to login form for wrong cookie',done=>{
      request(app,{method:'GET',url:'/toDoForm',headers:{'cookie':'sessionid=3'}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should redirect to login form if user is not logged in',done=>{
      request(app,{method:'GET',url:'/toDoForm'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })

  describe('POST /toDoForm',()=>{
    it('submits the new todo of valid user',done=>{
      request(app,{method:'POST',url:'/toDoForm',headers:{'cookie':'sessionid=0'},body:'title=sunday'},res=>{
        th.should_be_redirected_to(res,'/home');
      })
      done();
    })
    it('redirects the user to login if the user is invalid',done=>{
      request(app,{method:'POST',url:'/toDoForm',headers:{'cookie':'sessionid=3'},body:'title=sunday'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      done();
    })
    it('redirects the user to login if the user is not logged in',done=>{
      request(app,{method:'POST',url:'/toDoForm',body:'title=sunday'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      done();
    })
  })

  describe('GET /delete',()=>{
    it('should redirect the valid user to the home page',done=>{
      request(app,{method:'GET',url:'/delete',headers:{'cookie':'sessionid=0'}},res=>{
        th.should_be_redirected_to(res,'/home');
      })
      done();
    })
    it('should redirect to login page if the user is invalid',done=>{
      request(app,{method:'GET',url:'/delete',headers:{'cookie':'sessionid=4'}},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      done();
    })
    it('should redirect to login page if user is not logged in',done=>{
      request(app,{method:'GET',url:'/delete'},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      done();
    })
  })

  describe.skip('GET /edit',()=>{
    it('should display the edit toDoform to the valid user',done=>{
      request(app,{method:'GET',url:'/edit',headers:{'cookie':'sessionid=0'}},res=>{
        th.status_is_ok(res);
      })
      done();
    })
    it('should redirect to login page if the user is invalid',done=>{
      request(app,{method:'GET',url:'/edit',headers:{'cookie':'sessionid=4'}},res=>{
        th.should_be_redirected_to(res,'/login');
      })
      done();
    })
  })


  describe('GET /logout',()=>{
    it('should redirect to login page for valid user',()=>{
      request(app,{method:'GET',url:'/logout',headers:{'cookie':'sessionid=0'}},res=>{
        th.should_not_have_cookie(res,'sessionid')
        th.should_be_redirected_to(res,'/login');
      })
    })
    it('should redirect to login page if cookie is not present',()=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_not_have_cookie(res,'sessionid')
        th.should_be_redirected_to(res,'/login');
      })
    })
  })
})











//=========================================
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
