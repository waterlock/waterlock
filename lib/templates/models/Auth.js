/**
 * Auth
 *
 * @module      :: Model
 * @description :: This model holds all authentication methods for a User
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.auth.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),
  
  beforeCreate: require('waterlock').models.auth.beforeCreate,
  beforeUpdate: require('waterlock').models.auth.beforeUpdate
};
