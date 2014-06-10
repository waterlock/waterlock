'use strict';

/**
 * [attributes description]
 * @param  {[type]} attributes [description]
 * @return {[type]}            [description]
 */
exports.attributes = function(attributes){
  var _ = require('lodash');
  
  var template = {
    user:{
      model: 'user'
    },
    successful:{
      type: 'boolean',
      defaultsTo: false
    },
    ip:{
      type: 'string'
    }
  };

  return _.merge(template, attributes);
};