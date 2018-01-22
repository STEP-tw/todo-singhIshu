const fs = require('fs');

class SessionHandler {
  constructor(storagePath,fs) {
    this.storagePath = storagePath;
    this.sessions ={}
    this.fs =fs;
  }
  loadSessions(){
    let  sessions = this.fs.readFileSync(this.storagePath,'utf8');
    this.sessions = JSON.parse(sessions);
  }
  storeSessions(){
    let sessions = JSON.stringify(this.sessions);
    this.fs.writeFileSync(this.storagePath,sessions);
  }
  addSession(sessionID,username){
    this.sessions[sessionID] = username;
    this.storeSessions();
  }
  deleteSession(sessionID){
    delete this.sessions[sessionID];
    this.storeSessions();
  }
  getUserBySessionID(sessionID){
    return this.sessions[sessionID];
  }
}


module.exports = SessionHandler;
