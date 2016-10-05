/**
 * Jwt
 *
 * @module      :: Model
 * @description :: Holds all distributed json web tokens
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.jwt.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  })
};
