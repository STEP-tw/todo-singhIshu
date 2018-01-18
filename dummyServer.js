let fs = require('fs');
const http = require('http');
const WebApp = require('./webapp');
const CountHandler  = require('./countHandler.js');
const StaticFileHandler  = require('./staticFileHandler.js');
let app = WebApp.create();

let countHandler = new CountHandler('ishu');
let staticFileHandler = new StaticFileHandler('public');


app.use(staticFileHandler.getRequestHandler());

const PORT = 5000;
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
