var utils = require('../utils');

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var template = {
    key: 'string',
    owner: {
      model: 'user'
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
  if(typeof values.key === 'undefined'){
    values.key = krypt.random(13);
  }
  var key = krypt.sha256(values.key);
  values.key = key;
  cb();
}