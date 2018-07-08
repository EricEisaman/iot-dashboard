// other members are in 'members' object with socket ids as keys  
let CustomSocket = {
    membersOnline: {},
    init: function(io,s,fb,membersOnline,mailService){
      console.log('Initializing custom socket.');
      let serverModulePlugin = require('./server-module-plugin');
      serverModulePlugin.addHandlers(io,s,fb,membersOnline,mailService);
      this.membersOnline = membersOnline;
    }
  }
  
  module.exports = CustomSocket;