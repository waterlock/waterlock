var Krypt = require('./krypt');
var config = require('../../../config/waterlock.json');
var nodemailer = require('nodemailer');

exports.version = '0.0.1';
exports.models = require('./models/');
exports.actions = require('./actions/');
exports.krypt = new Krypt();
exports.config = config;

if(config.passwordReset.tokens){
  var mail = config.passwordReset.mail;
  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport(mail.protocol, mail.options);  

  exports.transport = smtpTransport;
}