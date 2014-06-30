'use strict';

/**
 * Attempts describes an user's login, if it was successful, what ip it came from etc.
 * @param  {object} attributes any attributes to append to the attempt model
 * @return {object} the template merged with the user defined attributes
 */
exports.attributes = function(attributes){
  var _ = require('lodash');
  var methods = require('../waterlock').methods;

  var methodTemplate = {};
  for(var key in methods){
    var method = methods[key];
    if(method.hasOwnProperty('model')){
      _.merge(methodTemplate, method.model.auth.attributes);
    }
  }

  _.merge(methodTemplate, attributes);
  
  var template = {
    user:{
      model: 'user'
    },
    method:{
      type: 'string',
      defaultsTo: false
    },
  };

  return _.merge(template, methodTemplate);
};

/**
 * used to hash the password
 * @param  {object}   values 
 * @param  {Function} cb     
 */
exports.beforeCreate = function(values, cb){
  var methods = require('../waterlock').methods;
  for(var key in methods){
    var model = methods[key].model.auth;
    if(model.hasOwnProperty('beforeCreate')){
      model.beforeCreate(values);
    }
  }

  cb();
};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values 
 * @param  {Function} cb     
 */
exports.beforeUpdate = function(values, cb){
  var methods = require('../waterlock').methods;
  for(var key in methods){
    var model = methods[key].model.auth;
    if(model.hasOwnProperty('beforeUpdate')){
      model.beforeUpdate(values);
    }
  }

  cb();
};