const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');

class StaticFileHandler extends DefaultHandler{
  constructor(directory) {
    super();
    this.directory = directory;
  }
  getFilePath(url){
    return `./${this.directory}${url}`;
  }
  execute(req,res){
    let filePath = this.getFilePath(req.url)
    if (fs.existsSync(filePath)) {
      let contents = fs.readFileSync(filePath,'utf8');
      res.write(contents);
      res.end();
      return;
    }
  }
}


module.exports = StaticFileHandler;
