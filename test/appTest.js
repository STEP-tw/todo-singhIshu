let chai = require('chai');
let assert = chai.assert;
let request = require('supertest');
let app = require('../app.js');
let MockFs = require('../handlers/mockfs.js');
let mockfs = new MockFs();
let redirectToLogin = require('../app.js').redirectToLogin;
mockfs.writeFileSync('sessionsInfo',JSON.stringify({1234:'ishusi'}));
mockfs.writeFileSync('usersInfo',JSON.stringify({
  users:{
    'ishusi':{
      "username": "ishusi",
      "counter": 2,
      "toDos": []
    }
  }
}));


const SessionHandler = require('../handlers/sessionHandler.js');
const UsersStore = require('../models/usersStore.js');

app.sessionHandler = new SessionHandler('sessionsInfo',mockfs);
app.usersStore = new UsersStore('usersInfo',mockfs);

app.sessionHandler.loadSessions();
app.usersStore.loadUsers();
console.log(app.usersStore.users);


const doesNotHaveCookie = (res)=>{
  let headerKeys = Object.keys(res.headers);
  let key = headerKeys.find(k=>k.match(/set-cookie/i));
  if(key) throw new Error(`Header is having set cookie ${key}`);
}

const haveMessageCookie = (cookies) =>{
  cookies.some(function(cookie) {
    return cookie.includes('message');
  })
}

const doesNtHaveMessageCookie = (res) =>{
  let cookies = res.headers['set-cookie'];
  if(haveMessageCookie(cookies)) throw new Error(`Header is having message cookie ${cookies}`);
}

const doesNotHaveSession = (res) =>{
  let session = app.sessionHandler.getUserBySessionID(1234);
  if (session) {
    throw new Error ('has session');
  }
}

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,'/bad')
        .get('/bad')
        .expect(404)
        .end(done)
    })
  })
  describe('GET /login.html',()=>{
    it('serves the login.html file',done=>{
      request(app,'/login.html')
      .get('/login.html')
      .expect(200)
      .end(done)
    })
  })
  describe('GET /',()=>{
    it('changes url to login',()=>{
      request(redirectToLogin,{method:'GET',url:'/'},(res)=>{
        request(app,'/')
        .get('/')
        .expect(200)
        .expect(/Login/)
        .end(done)
      })
    })
  })
  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,'/login')
      .get('/login')
      .expect(200)
      .expect(/TODO App/)
      .end(done)
    })
  })

  describe('GET /login',()=>{
    it('serves the login page with login',done=>{
      request(app,'/login')
      .get('/login')
      .expect(200)
      .expect(/Login/)
      .expect((res)=>{
        assert.isNotOk(res.text.includes('login failed'))
      })
      .expect(doesNotHaveCookie)
      .end(done)
    })
    it('redirects the home page if already loggedin',done=>{
      request(app,'/login')
      .get('/login')
      .set('cookie','sessionid=1234')
      .expect(302)
      .expect('Location','/home')
      .end(done)
    })
  })

  describe('GET /home',()=>{
    it('should redirect to login page if the user is not logged in',done=>{
      request(app,'/home')
      .get('/home')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app,'/home')
      .get('/home')
      .set('cookie','sessionid=2')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('should give home page for valid user',done=>{
      request(app,'/home')
      .get('/home')
      .set('cookie','sessionid=1234')
      .expect(200)
      .expect(/ishusi/)
      .end(done)
    })
  })

  describe('GET /toDoForm',()=>{
    it('serves the todo form to valid user',done=>{
      request(app,'/toDoForm')
      .get('/toDoForm')
      .set('cookie','sessionid=1234')
      .expect(200)
      .end(done)
    })
    it('should redirect to login form for wrong cookie',done=>{
      request(app,'/toDoForm')
      .get('/toDoForm')
      .set('cookie','sessionid=3')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('should redirect to login form if user is not logged in',done=>{
      request(app,'/toDoForm')
      .get('/toDoForm')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
  })

  describe('POST /toDoForm',()=>{
    it('submits the new todo of valid user',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .set('cookie','sessionid=1234')
      .send('title=sunday')
      .expect(302)
      .expect('Location','/home')
      .end(done)
    })
    it('redirects the user to login if the user is invalid',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .set('cookie','sessionid=12')
      .send('title=sunday&item1=sleep&1=on')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('redirects the user to login if the user is not logged in',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .send('title=sunday')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('submits the new todo of valid user',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .set('cookie','sessionid=1234')
      .send('title=sunday&item1=sleep&1=on')
      .expect(302)
      .expect('Location','/home')
      .end(done)

    })
    it('redirects the user to login if the user is invalid',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .set('cookie','sessionid=12')
      .send('title=sunday')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
    it('redirects the user to login if the user is not logged in',done=>{
      request(app,'/toDoForm')
      .post('/toDoForm')
      .send('title=sunday')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
  })

  describe('GET /home after creating toDos',()=>{
    it('should give home page for valid user with the toDo Links',done=>{
      request(app,'/home')
      .get('/home')
      .set('cookie','sessionid=1234')
      .expect(200)
      .expect(/ishusi/)
      .expect(/sunday/)
      .end(done)
    })
  })

  describe('GET /viewTodo',()=>{
    it('should serve the todo based on id given in url',done=>{
      request(app,'/viewTodo.1')
      .get('/viewTodo.1')
      .set('cookie','sessionid=1234')
      .expect(/sleep/)
      .expect(200)
      .end(done)
    })
    it('should serve the todo based on id given in url',done=>{
      request(app,'/viewTodo.4')
      .get('/viewTodo.4')
      .expect(404)
      .end(done)
    })
  })

  describe('GET /login',()=>{
     it('serves the login page with login',done=>{
       request(app,'/login')
       .get('/login')
       .expect(200)
       .expect(/Login/)
       .expect((res)=>{
         assert.isNotOk(res.text.includes('login failed'))
       })
       .expect(doesNotHaveCookie)
       .end(done)
     })
     it('redirects the home page if already loggedin',done=>{
       request(app,'/login')
       .get('/login')
       .set('cookie','sessionid=1234')
       .expect(302)
       .expect('Location','/home')
       .end(done)
     })

     it('serves the login page with message for a failed login',done=>{
       request(app,'/login')
       .get('/login')
       .set('cookie','message=login failed')
       .expect(200)
       .expect(/Login/)
       .expect(/login failed/)
       .expect(doesNotHaveCookie)
       .end(done)
     })
   })



  describe('/delete',()=>{
    it('should redirect the valid user to the home page',done=>{
      request(app,'/delete/.0')
      .get('/delete.0')
      .set('cookie','sessionid=1234')
      .expect(302)
      .expect('Location',"/home")
      .end(done)
    })
    it('should redirect to login page if user is not logged in',done=>{
      request(app,'/delete.0')
      .get('/delete.0')
      .expect(302)
      .expect('Location','/login')
      .end(done)
    })
  })


  describe('GET /logout',()=>{
    it('should redirect to login page for valid user',done=>{
      request(app,'/logout')
      .get('/logout')
      .set('cookie','sessionid=1234')
      .expect(doesNotHaveCookie)
      .expect(302)
      .expect("Location",'/login')
      .expect(doesNotHaveSession)
      .end(done)
    })
    it('should redirect to login page if cookie is not present',done=>{
      request(app,'/logout')
      .get('/logout')
      .expect(doesNotHaveCookie)
      .expect(302)
      .expect("Location",'/login')
      .end(done)
    })
  })
})










//=========================================
describe('POST /login',()=>{
  it('redirects to homepage for valid user',done=>{
    request(app,'/login')
    .post('/login')
    .send('username=ishusi')
    .expect(302)
    .expect('Location','/home')
    .expect(doesNtHaveMessageCookie)
    .end(done)
  })
  it('redirects to login with message for empty username',done=>{
    request(app,'/login')
    .post('/login')
    .send('username=')
    .expect(302)
    .expect('Location','/login')
    .expect('set-cookie','message=login failed; Max-Age=5')
    .end(done)
  })
})
