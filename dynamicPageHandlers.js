const fs = require('fs');
const lib = require('./formDataHandlers.js');
let registered_users = [{username:'bhanutv',name:'Bhanu Teja Verma'},{username:'ishusi',name:'Ishu Singh'}];

const getLoginPage = (req,res)=>{
  return fs.readFileSync('./public/index.html','utf8');
}

let pageLib = {};

pageLib.handleGetMainPage = (req,res) =>{
  let loginPage = getLoginPage();
  res.setHeader('Content-type','text/html');
  res.write(loginPage.replace("<h2></h2>",req.cookies.message || ""));
  res.end();
}


module.exports = pageLib;
