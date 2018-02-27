const http = require('http');
const app = require('./app.js');

<<<<<<< HEAD
const PORT = process.env.PORT || 8888;
=======

const PORT = 5000;
>>>>>>> parent of c21ae83... App is using express framework and testing app by using supertest.
let server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
