'use-strict';

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var utils = require('../utils');
  
  var template = {
    user:{
      model: 'user'
    },
    successful:{
      type: 'boolean',
      defaultsTo: false
    }
    ip:{
      type: 'string'
    }
  };

  return utils.mergeObjects(template, attributes);
}