const http = require('http');
const app = require('./app.js');
let registered_users = [{username:'bhanutv',name:'Bhanu Teja Verma'},{username:'ishusi',name:'Ishu Singh'}];
let toS = o=>JSON.stringify(o,null,2);


const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));

module.exports = app;
