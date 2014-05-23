var utils = require('../utils');

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var template = {
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'STRING',
      maxLength: 20,
      minLength: 8,
      required: true
    },
    apiKeys: {
      collection: 'ApiKey',
      via: 'owner'
    },
    token: {
      model: 'token'
    }
  };

  return utils.mergeObjects(template, attributes);
}

/**
 * [beforeCreate description]
 * @param  {[type]}   values [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
exports.beforeCreate = function(values, cb){
  var krypt = require('../waterlock').krypt
  var pass = krypt.hash(values.password);
  values.password = pass;
  cb();
}