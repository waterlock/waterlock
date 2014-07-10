'use strict';

var _ = require('lodash');

module.exports = function(){
/**
 * try to require the authentcation method defined in user config
 */
  var func;

  if(typeof this.config.authMethod[0] === 'object'){
    func = handleObjects;
  }else if(typeof this.config.authMethod === 'object'){
    func = handleObject;
  }else{
    func = handleName;
  }
  
  return func(this.config.authMethod);
}

function handleObjects(authMethods){
  var method = {};
  var _methodName;

  try{
    for(var i = 0; i < authMethods.length; i++){
      _methodName = authMethods[i].name;
      var _method = _.merge(require('../../'+_methodName), authMethods[i]);
      method[_method.authType] = _method;
    }
  }catch(e){
    errorHandler(_methodName);
  }

  return method;
}

function handleObject(authMethod){
  var method = {};
  var _methodName;

  _methodName = authMethod.name;
  
  try{
    var _method = _.merge(require('../../'+_methodName), authMethod);
  }catch(e){
    errorHandler(_methodName);
  }

  method[_method.authType] = _method;
  return method;
}

function handleName(authMethod){
  var method = {};
  var _methodName;
  _methodName = authMethod;
  try{
    method[_methodName] = _.merge(require('../../'+_methodName), authMethod);
  }catch(e){
    errorHandler(_methodName);
  }

  return method;
}

function errorHandler(method){
  var error = new Error('Authentication method '+method+' could not be found. \n'+
  'Try running npm install '+method+'\n\n');
  
  throw error;
}