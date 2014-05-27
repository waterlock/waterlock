/**
 * Api
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: require("waterlock").models.apiKey.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),
  
  beforeCreate: require("waterlock").models.apiKey.beforeCreate,
  beforeUpdate: require("waterlock").models.apiKey.beforeUpdate
};
