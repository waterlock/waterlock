'use strict';

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var utils = require('../utils');
  
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
    apiKeys: {
      collection: 'apikey',
      via: 'owner'
    },
    token: {
      model: 'token'
    }
  };

  return utils.mergeObjects(template, attributes);
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