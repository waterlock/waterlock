'use strict';

/**
 * Returns an object attributes for the ApiKey model
 * @param  {Object} attributes user defined attributes for the ApiKey model
 * @return {Object} the user defined attributes combined with the template
 */
exports.attributes = function(attributes){
  var utils = require('../utils');

  var template = {
    key: 'string',
    uses: {
      collection: 'use',
      via: 'apiKey'
    },
    owner: {
      model: 'user'
    },
    revoked: {
      type: 'boolean',
      defaultsTo: false 
    }
  };

  return utils.mergeObjects(template, attributes);
};

/**
 * Generates a new ApiKey value using the existing key as a seed
 * @param  {Object}   values the values to create the resource with
 * @param  {Function} cb     called when finished
 */
exports.beforeCreate = function(values, cb){
  var krypt = require('../waterlock').krypt;
  if(typeof values.key === 'undefined'){
    values.key = krypt.random(13);
  }
  var key = krypt.sha256(values.key);
  values.key = key;

  cb();
};

/**
 * this expect the current uses to exist in the vals to update
 * then simply increaments it by one
 * @param  {Object}   valuesToUpdate The values to update
 * @param  {Function} cb called when finished
 */
exports.beforeUpdate = function(valuesToUpdate, cb){
  var uses = valuesToUpdate.uses + 1;
  valuesToUpdate.uses = uses;
  cb();
};