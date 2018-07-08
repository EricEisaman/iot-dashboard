module.exports = (io,fb,mailService)=>{
    var membersOnline = {};
    var customSocket = require('./custom/server-module');
    io.on('connection', function(socket){
        console.log("New member has connected with socket id:",socket.id);
        socket.ip = socket.handshake.headers['x-forwarded-for'];
        socket.ip = socket.ip.split(',')[0].replace(/\./g, "_");
        customSocket.init(io,socket,fb,membersOnline,mailService);
        socket.on('new-member-online',function(shared_state_data){ // Listen for new-player event on this client 
          console.log("New member has state:",shared_state_data);
          // 2 - Add the new player to the dict
          membersOnline[socket.id] = shared_state_data;
          // Send an update event
          io.emit('update-members',membersOnline);
        })
        socket.on('sendFBData',function(data){
          socket.uid = data.uid;
          socket.email = data.email;
          console.log(`Received player's Google Firebase UID of ${data.uid}`);
          console.log(`Received player's email of ${data.email}`);
          let d = {};
          d[Date.now()]='new socket';
          fb.updateUserData(socket.uid,`logs/${socket.ip}`,d,()=>{
            console.log('successful user log entry to Firebase')
          },()=>{
            console.log('failed to enter user log into Firebase')
          });
        });  
        socket.on('tq',function(data){
          //mailService.sendEmail(socket.email,'thankyou');
        }); 
        socket.on('disconnect',function(){
          // 3- Delete from dict on disconnect
          delete membersOnline[socket.id];
          // Send an update event 
          io.emit('update-members',membersOnline);
        })
        // Online members' shared data throughput
        socket.on('send-update',function(data){
          if(membersOnline[socket.id] == null) return;
          membersOnline[socket.id].sharedDataPropertyOne = data.sharedDataPropertyOne; 
          membersOnline[socket.id].sharedDataPropertyTwo = data.sharedDataPropertyTwo; 
          io.emit('update-members',membersOnline);
        })
    
     })
  }
  