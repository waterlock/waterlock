var nodemailer = require('nodemailer');
var Krypt = require('./krypt');
var path = require('path');
var _method;

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'No config file defined, try running [waterlock install config]';
}

try{
  if(typeof config.authMethod === 'object'){
    _method = config.authMethod.name;
  }else{
    _method = config.authMethod;
  }
  var method = require('../../'+_method);
}catch(e){
  throw 'Authentication method '+_method+' could not be found. \n'+
  'Try running npm install '+_method;
}

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