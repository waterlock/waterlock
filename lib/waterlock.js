var nodemailer = require('nodemailer');
var Krypt = require('./krypt');
var path = require('path');

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw "No config file defined, try running [waterlock install config]"
}

exports.version = '0.0.1';
exports.models = require('./models/');
exports.actions = require('./controllers/');
exports.krypt = new Krypt();
exports.config = config;

if(config.passwordReset.tokens){
  var mail = config.passwordReset.mail;
  var smtpTransport = nodemailer.createTransport(mail.protocol, mail.options);  
  exports.transport = smtpTransport;
}