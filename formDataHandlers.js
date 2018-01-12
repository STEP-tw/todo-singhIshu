const fs = require('fs');
let lib = {};

lib.getHomePageFormat = ()=>{
  return fs.readFileSync('./public/homePage.html','utf8');
}

lib.displayHomePage = (userInfo) => {
  console.log(userInfo);
  let homePageFormat = lib.getHomePageFormat();
  let homeWithUserName = homePageFormat.replace("UserName",userInfo.name);
  let homeWithToDoLists = homeWithUserName.replace("toDoMade","");
  return homeWithToDoLists;
}



module.exports = lib;
