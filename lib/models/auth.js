'use strict';

var _ = require('lodash');

/**
 * Attempts describes an user's login, if it was successful, what ip it came from etc.
 * @param  {object} attributes any attributes to append to the attempt model
 * @return {object} the template merged with the user defined attributes
 */
exports.attributes = function(attributes){

  var methods = waterlock.methods;

  _.each(methods, function(method){
    if(_.has(method, 'model')){
      // call the decorator of each auth method
      method.model.auth.attributes(attributes);
    }
  });

  var template = {
    user:{
      model: 'user'
    }
  };

  return _.merge(template, attributes);
};

/**
 * used to hash the password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeCreate = function(values, cb){
  var methods = waterlock.methods;
  _.each(methods, function(method) {
    var model = method.model.auth;
    if(_.has(model, 'beforeCreate')){
      model.beforeCreate(values);
    }
  });

  cb();
};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeUpdate = function(values, cb){
  var methods = waterlock.methods;
  _.each(methods, function(method) {
    var model = method.model.auth;
    if(_.has(model, 'beforeUpdate')){
      model.beforeUpdate(values);
    }
  });

  cb();
};