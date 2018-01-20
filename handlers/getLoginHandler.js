let fs =require('fs');
const DefaultHandler = require('./defaultHandler.js');

class GetLoginHandler extends DefaultHandler {
  constructor(fs,filepath) {
    super();
    this.fs = fs;
    this.filepath = filepath;
  }
  execute(req,res){
    let loginContent = this.fs.readFileSync(this.filepath,'utf8');
    res.setHeader('Content-type','text/html');
    res.write(loginContent.replace("<h2></h2>",req.cookies.message || ""));
    res.end();
  }
}

module.exports = GetLoginHandler;
