var mailTemplates = require('./mail-templates.json');
const mail = require('@sendgrid/mail');
//mail.setApiKey(process.env.SENDGRID_API_KEY);
var mailService = {
  // sendEmail: function(email,type,uid) {
  //   console.log(`Attempting email to ${email}`);
  //   var mailOptions = mailTemplates[type];
  //   if(type != 'thankyou' && uid) mailOptions.html += `<a href='https://yha-iot.glitch.me/unsubscribe/${"B5c6yP"+uid}'>Unsubscribe</a>`;
  //   mailOptions.to = email;
  //   //console.log(mailOptions);
  //   return mail.send(mailOptions).then(function() {
  //     console.log('New ' + type + ' email sent to: ' + email);
  //   }).catch(function(e){
  //     console.log(e);
  //   });
  // }
}
module.exports = mailService;
