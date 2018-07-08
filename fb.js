let admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.PROJECT_ID,
    "clientEmail": process.env.CLIENT_EMAIL,
    "privateKey": process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  }), 
  databaseURL: 'https://'+process.env.PROJECT_ID+'.firebaseio.com'
});
let fb = {
 updateUserData: function(uid,path,value,success,fail) {
    let userRef = admin.database().ref('/users/' + uid + '/' + path);
    console.log(`Firebase user reference obtained for ${uid}`);
    userRef.update(value)
      .then(function(){if(success)success()})
      .catch(function(error) {
        console.log('Failed to update user Firebase:', error);
        if(fail)fail()
      });
  },
  getUserData: function(uid,path) {
    let userRef = admin.database().ref('/users/'+uid+'/'+path);
    return userRef.once('value');
  },
  subscribeTo: function(path,cb) {
    let shareRef = admin.database().ref('/share/'+path);
    return shareRef.on('value',cb);
  },
  update: function(path,value,success,fail){
    let shareRef = admin.database().ref('/share/'+path);
    shareRef.update(value)
      .then(function(){
        console.log('Value updated on Firebase!');
        if(success)success()
      })
      .catch(function(error) {
        console.log('Failed to update values on Firebase:', error);
        if(fail)fail()
      });
  },
  set: function(path,value,success,fail){
    let shareRef = admin.database().ref('/share/'+path);
    shareRef.set(value)
      .then(function(){
        console.log('Value set on Firebase!');
        if(success)success()
      })
      .catch(function(error) {
        console.log('Failed to set value on Firebase:', error);
        if(fail)fail()
      });
  },
  get: function(path,cb){
    let shareRef = admin.database().ref('/share/'+path);
    return shareRef.once('value',cb);
  }
}

module.exports = fb;