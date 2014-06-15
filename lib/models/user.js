'use strict';

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
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
 * [beforeCreate description]
 * @param  {[type]}   values [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
exports.beforeCreate = function(values, cb){
  var bcrypt = require('bcrypt');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(values.password, salt);
  values.password = hash;

  cb();
};

/**
 * 
 * @param  {[type]}   values [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
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