'use strict';

/**
 * Returns an object attributes for the ApiKey model
 * @param  {Object} attributes user defined attributes for the ApiKey model
 * @return {Object} the user defined attributes combined with the template
 */
exports.attributes = function(attributes){
  var _ = require('lodash');

  var template = {
    token: {
      type: 'text',
      maxLength: 512
    },
    uses: {
      collection: 'use',
      via: 'jsonWebToken'
    },
    owner: {
      model: 'user'
    },
    revoked: {
      type: 'boolean',
      defaultsTo: false
    }
  };

  return _.merge(template, attributes);
};
