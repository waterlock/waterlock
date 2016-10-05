'use strict';

/**
 * Returns an object attributes for the KeyStat model
 * @param  {Object} attributes user defined attributes for the ApiKey model
 * @return {Object} the user defined attributes combined with the template
 */
exports.attributes = function(attributes){
  var _ = require('lodash');

  var template = {
    remoteAddress: {
      type: 'string'
    },
    jsonWebToken: {
      model: 'jwt'
    },
  };

  return _.merge(template, attributes);
};