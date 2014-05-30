/**
 * Returns an object attributes for the KeyStat model
 * @param  {Object} attributes user defined attributes for the ApiKey model
 * @return {Object} the user defined attributes combined with the template
 */
exports.attributes = function(attributes){
  var utils = require('../utils');

  var template = {
    remoteAddress: {
      type: 'string'
    },
    apiKey: {
      model: 'apiKey'
    }
  };

  return utils.mergeObjects(template, attributes);
}