const DefaultHandler = require('./defaultHandler.js');

class CountHandler extends DefaultHandler {
  constructor(text) {
    super();
    this.text = text;
    this.count = 0;
  }
  execute(req,res){
    this.count++
    res.write(`${this.text}:${this.count}`);
    res.end();
  }
}



module.exports = CountHandler;
