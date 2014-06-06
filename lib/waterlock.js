var nodemailer = require('nodemailer');
var Krypt = require('./krypt');
var path = require('path');

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'No config file defined, try running [waterlock install config]';
}

try{
  var method = require('../../'+config.authMethod);
}catch(e){
  throw 'Authentication method '+config.authMethod+' could not be found. \n Try running npm install '+config.authMethod;
}

exports.version = '0.0.4';
exports.models = require('./models/');

// Shortcut for login/logout in authcontroller
exports.waterlocked = require('./controllers/').waterlocked;
exports.actions = require('./controllers/');

exports.krypt = new Krypt();
exports.config = config;
exports.methods = method;

if(config.passwordReset.tokens){
  var mail = config.passwordReset.mail;
  var smtpTransport = nodemailer.createTransport(mail.protocol, mail.options);  
  exports.transport = smtpTransport;
}