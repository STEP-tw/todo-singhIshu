let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
let registered_users = [{userName:'bhanutv',name:'Bhanu Teja Verma'},{userName:'ishusi',name:'Ishu Singh'}];
let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['--------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
};

let app = WebApp.create();
app.use(logRequest);
app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
