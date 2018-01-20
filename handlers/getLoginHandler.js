let fs =require('fs');
const DefaultHandler = require('./defaultHandler.js');

class GetLoginHandler extends DefaultHandler {
  constructor(fileContent) {
    super();
    this.fileContent = fileContent;
  }
  execute(req,res){
    res.setHeader('Content-type','text/html');
    res.write(this.fileContent.replace("<h2></h2>",req.cookies.message || ""));
    res.end();
  }
}

module.exports = GetLoginHandler;
