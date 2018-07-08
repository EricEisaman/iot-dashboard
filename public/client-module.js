var custom = {
  
  socket : null,
  
  firebaseUser : null,
  
  hello : function (){
    console.log('Hello from my custom module!');
  },
  
  logIn: function (s,u){
    this.hello();
    this.setSocket(s);
    this.setFirebaseUser(u);
    s.emit('new-member',{name:'Jill'});
    window.client_module_plugin.init(s,u);
  },
 
  logOut : function logOut(){
    console.log('Custom log out');
    this.socket = null;
  },

  setSocket : function(s){
    this.socket = s;
    s.on('devices',function(data){
      console.log('devices:',data);
    });
  },
  
  setFirebaseUser : function(u){
    this.firebaseuser = u;
  }
  
}
