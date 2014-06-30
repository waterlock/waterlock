'use strict';

var path = require('path');
var _ = require('lodash');

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
var _methodName;

try{
  var method = {};
  if(typeof config.authMethod[0] === 'object'){
    for(var i = 0; i < config.authMethod.length; i++){
      _methodName = config.authMethod[i].name;
      var _method = _.merge(require('../../'+_methodName), config.authMethod[i]);
      method[_method.authType] = _method;
    }
  }else if(typeof config.authMethod === 'object'){
    _methodName = config.authMethod.name;
    var _method = _.merge(require('../../'+_methodName), config.authMethod);
    method[_method.authType] = _method;
  }else{
    _methodName = config.authMethod;
    method[_methodName] = _.merge(require('../../'+_methodName), config.authMethod);
  }
  
}catch(e){
  var error = new Error('Authentication method '+_methodName+' could not be found. \n'+
  'Try running npm install '+_methodName+'\n\n'+e).stack;
  throw error;
}

/**
 * models
 */
exports.models = require('./models/')(method);

/**
 * Shortcut for login/logout in authcontroller
 */
exports.waterlocked = require('./controllers/').waterlocked;

/**
 * controller actions
 */
exports.actions = require('./controllers/');

/**
 * user defined config file
 */
exports.config = config;

/**
 * authentication methods
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

