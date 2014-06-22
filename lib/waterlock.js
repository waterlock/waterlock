'use strict';

var path = require('path');

/**
 * try to require user config file
 */
try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'No config file defined, try running [waterlock generate config]';
}

/**
 * try to require the authentcation method defined in user config
 */
var _method;

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

/**
 * models
 */
exports.models = require('./models/');

/**
 * Shortcut for login/logout in authcontroller
 */
exports.waterlocked = require('./controllers/').waterlocked;

/**
 * controller actions
 */
exports.actions = require('./controllers/');

/**
 * krypt instance used for api key creation
 */
var Krypt = require('./krypt');
exports.krypt = new Krypt();

/**
 * user defined config file
 */
exports.config = config;

/**
 * authentication method
 */
exports.methods = method;

/**
 * exposing json web token
 */
exports.jwt = require('jwt-simple');

/**
 * expose utils
 */
exports._utils = require('./utils');

/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
if(config.passwordReset.tokens){
  var nodemailer = require('nodemailer');
  var mail = config.passwordReset.mail;
  var smtpTransport = nodemailer.createTransport(mail.protocol, mail.options);  
  exports.transport = smtpTransport;
}