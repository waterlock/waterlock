'use strict';

var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');
var jwt = require('jwt-simple');

/**
 * various utility methods
 *
 * @type {Object}
 */
module.exports = {
  /**
   * gathers all params for this request
   *
   * @param  {Object} req the express request object
   * @return {Object}     all params
   * @api public
   */
  allParams: function(req){
    var params = req.allParams();
    _.merge(params, req.headers);
    return _.merge(params, req.query);
  },

  /**
   * Counts only the top level of a object
   *
   * @param  {Object} obj plain object to count
   * @return {Integer}     the number of top level elements
   * @api public
   */
  countTopLevel: function(obj){
    if(typeof obj !== 'object'){
      return -1;
    }

    return _.size(obj);
  },

  /**
   * allows us to access an object like an array [0] == {first object}
   *
   * @param  {Integer} index the position in the object to look
   * @param  {Object} obj   the object to access
   * @return {Object}       the value at given position
   * @api public
   */
  accessObjectLikeArray: function(index, obj){
    // if obj is not an object just return it nothing to do
    if(typeof obj !== 'object'){
      return obj;
    }

    // if object already is an array return the value at given index
    if(typeof obj[index] !== 'undefined'){
      return obj[index];
    }

    return _.values(obj)[index];
  },

  /**
   * Creates a new JWT token
   *
   * @param  {Integer} req
   * @param  {Object} res
   * @param  {Object} user   the user model
   * @return {Object}       the created jwt token.
   * @api public
   */
  createJwt: function(req, res, user) {
    var jsonWebTokens = waterlock.config.jsonWebTokens || {};
    var expiryUnit = (jsonWebTokens.expiry && jsonWebTokens.expiry.unit) || 'days';
    var expiryLength = (jsonWebTokens.expiry && jsonWebTokens.expiry.length) || 7;
    var expires = moment().add(expiryLength, expiryUnit).valueOf();
    var issued = Date.now();
    user = user || req.session.user;

    var token = jwt.encode({
      iss: user.id + '|' + req.remoteAddress,
      sub: jsonWebTokens.subject,
      aud: jsonWebTokens.audience,
      exp: expires,
      nbf: issued,
      iat: issued,
      jti: uuid.v1()
    }, jsonWebTokens.secret);

    return {
      token: token,
      expires: expires
    };
  },

  /**
   * Return access token from request
   *
   * @param  {Object} req the express request object
   * @return {String} token
   * @api public
   */
  getAccessToken: function(req){
    var token = null;
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length === 2){
        var scheme = parts[0];
        var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)){
           token = credentials;
        }
      }
    }else{
      token = this.allParams(req).access_token;
    }
    return token;
  }
};
