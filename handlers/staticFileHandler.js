const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');

class StaticFileHandler extends DefaultHandler{
  constructor(directory,fs=fs) {
    super();
    this.fs = fs;
    this.directory = directory;
  }

  getFilePath(url){
    return `${this.directory}${url}`;
  }
  getContentType(filename) {
    let fileType = filename.slice(filename.lastIndexOf("."));
    let types = {
      ".jpg": "img/jpg",
      ".jpeg": "img/jepg",
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".gif": "img/gif",
      ".pdf": "text/pdf",
      ".png": "img/png",
      ".txt": "text/txt"
    }
    return types[fileType];
  }
  serveFile(fileName,res){
    let content = this.fs.readFileSync(fileName,'utf8');
    let contentType = this.getContentType(fileName);
    res.setHeader("Content-Type",contentType);
    res.write(content);
    res.end();
  }
  execute(req,res){
    let filePath = this.getFilePath(req.url)
    if (!this.fs.existsSync(filePath)) {
      res.write('file not Found');
      res.end();
      return;
    }
    this.serveFile(filePath,res);
    return;
  }
}


module.exports = StaticFileHandler;
