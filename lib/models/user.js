'use strict';

/**
 * user model attributes
 * @param  {obejct} attributes user defined attributes
 * @return {object} attributes merged with template and method model object
 */
exports.attributes = function(attributes){
  var _ = require('lodash');

  
  var template = {
    attempts: {
      collection: 'attempt',
      via: 'user'
    },
    jsonWebTokens: {
      collection: 'jwt',
      via: 'owner'
    },
    auth:{
      model: 'auth'
    }
  };

  return _.merge(template, attributes);
};

