'use strict';

/* global waterlock */

var moment = require('moment');
var uuid = require('node-uuid');
var jwt = require('jwt-simple');

/**
 * jwt action
 * 
 * creates a new token if a session is authenticated
 * 
 * GET /user/jwt
 */
module.exports = function(req, res){
  if(!req.session.authenticated){
    return res.forbidden('You are not authorized.');
  }
  
  var jsonWebTokens = waterlock.config.jsonWebTokens || {};
  var expiryUnit = (jsonWebTokens.expiry && jsonWebTokens.expiry.unit) || 'days';
  var expiryLength = (jsonWebTokens.expiry && jsonWebTokens.expiry.length) || 7;
  var expires = moment().add(expiryUnit, expiryLength).valueOf();
  var issued = Date.now();
  var user = req.session.user;

  var token = jwt.encode({
    iss: user.id + '|' + req.remoteAddress,
    sub: jsonWebTokens.subject, 
    aud: jsonWebTokens.audience, 
    exp: expires,
    nbf: issued,
    iat: issued,    
    jti: uuid.v1()
  }, jsonWebTokens.secret);
 
  Jwt.create({token: token, uses: 0, owner: user.id}).exec(function(err){
    if(err){
      return res.serverError('JSON web token could not be created');
    }

    res.json({
      token : token,
      expires: expires
    });
  });
};