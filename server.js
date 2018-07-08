'use strict';   
var express = require('express');
var app = express();
var http = require('http').Server(app);
var admin = require('./fb.js');
var io = require('socket.io')(http); 
var mailService = require('./mail.js');
require('./socket.js')(io,admin,mailService);
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile('index.html',{root:'.'});
}); 
app.get("/unsubscribe/:code", function (request, response) {
  let uid = request.params.code.substr(6);
  admin.updateUserData(uid,'data/mail/',{subscribed:false},null,()=>{
    response.sendFile('unsubscribe.html',{root:'.'});
  },()=>{response.send('SERVER ERROR')});
});
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on port',app.get('port'));
}); 