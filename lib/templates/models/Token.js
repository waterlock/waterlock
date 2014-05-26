/**
 * Token
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: require("waterlock").models.token.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),

  beforeCreate: require("waterlock").models.token.beforeCreate,
  afterCreate: require("waterlock").models.token.afterCreate
};
