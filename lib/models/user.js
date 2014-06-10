'use strict';

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var _ = require('lodash');
  
  var template = {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'STRING',
      minLength: 8,
      required: true
    },
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