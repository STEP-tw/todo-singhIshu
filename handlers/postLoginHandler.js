const DefaultHandler = require('./DefaultHandler.js');

class PostLoginHandler extends DefaultHandler{
  constructor(users,urlForValidUser,urlForInvalidUser) {
    super();
    this.users = users;
    this.urlForValidUser = urlForValidUser;
    this.urlForInvalidUser = urlForInvalidUser;
  }
  execute(req,res){
    let user = this.users.find(u=>u.username==req.body.username);
    if(!user) {
      res.setHeader('Set-Cookie','message=login failed; Max-Age=5');
      res.redirect(this.urlForInvalidUser);
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect(this.urlForValidUser);
  }
}


module.exports = PostLoginHandler;
