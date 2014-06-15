'use strict';

/**
 * user model attributes
 * @param  {obejct} attributes user defined attributes
 * @return {object} attributes merged with template and method model object
 */
exports.attributes = function(attributes){
  var _ = require('lodash');
  var method = require('../waterlock').methods;
  var methodTemplate = method.model;
  
  var template = {
    attempts: {
      collection: 'attempt',
      via: 'user'
    },
    apiKeys: {
      collection: 'apikey',
      via: 'owner'
    },
    token: {
      model: 'token'
    }
  };

  //This can be taken out later
  if(typeof methodTemplate === 'undefined'){
    throw 'please update your authentication method to the latest version';
  }
  
  template = _.merge(template, methodTemplate);

  //let them choose username/email
  if(typeof attributes.username !== 'undefined'){
    delete template.email;
  }

  return _.merge(template, attributes);
};

/**
 * used to hash the password
 * @param  {object}   values 
 * @param  {Function} cb     
 */
exports.beforeCreate = function(values, cb){
  var bcrypt = require('bcrypt');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(values.password, salt);
  values.password = hash;

  cb();
};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values 
 * @param  {Function} cb     
 */
exports.beforeUpdate = function(values, cb){
  if(typeof values.password !== 'undefined'){
    var bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(values.password, salt);
    values.password = hash;
  }

  cb();
};