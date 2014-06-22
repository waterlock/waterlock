/**
 * Token
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: require('waterlock').models.resetToken.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),

  beforeCreate: require('waterlock').models.resetToken.beforeCreate,
  afterCreate: require('waterlock').models.resetToken.afterCreate
};
