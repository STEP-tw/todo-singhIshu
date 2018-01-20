let fs = require('fs');
let DefaultHandler = require('./defaultHandler.js');

class LoginHandler extends DefaultHandler{
  constructor() {
    super();
    this.users=[{username:'ponu',name:'Prateek Kumar Singh'},{username:'ishusi',name:'Ishu Singh'}]
  }
  getHandler(req,res){
    let loginPage = fs.readFileSync('./public/login.html','utf8');
    res.setHeader('Content-type','text/html');
    res.write(loginPage.replace("<h2></h2>",req.cookies.message || ""));
    res.end();
  }
  postHandler(req,res){
    let user = this.users.find(u=>u.username==req.body.username);
    if(!user) {
      res.setHeader('Set-Cookie','message=login failed; Max-Age=5');
      res.redirect("/index");
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/home');
  }
  postLoginHandler(){
    return this.postHandler.bind(this);
  }
}
module.exports = LoginHandler;
