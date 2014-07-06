'use strict';

var moment = require('moment');
var config = require('../../waterlock').config;
var uuid = require('node-uuid');
var jwt = require('jwt-simple');
var log = require('../../logger');

/**
 * jwt action
 * 
 * creates a new token if a session is authenticated
 * 
 * GET /user/jwt
 */
module.exports = function(req, res){
  if(!req.session.authenticated){
    log.debug("session not authenticated");
    return res.forbidden('You are not authorized.');
  }
  
  var jsonConfig = config.jsonWebTokens || {};
  var expiryUnit = (jsonConfig.expiry && jsonConfig.expiry.unit) || 'days';
  var expiryLength = (jsonConfig.expiry && jsonConfig.expiry.length) || 7;
  var expires = moment().add(expiryUnit, expiryLength).valueOf();
  var issued = Date.now();
  var user = req.session.user;

  var token = jwt.encode({
    iss: user.id + '|' + req.remoteAddress,
    sub: config.jsonWebTokens.subject, 
    aud: config.jsonWebTokens.audience, 
    exp: expires,
    nbf: issued,
    iat: issued,    
    jti: uuid.v1()
  }, config.jsonWebTokens.secret);
 
  Jwt.create({token: token, uses: 0, owner: user.id}).exec(function(err){
    if(err){
      log.debug(err);
      return res.serverError('JSON web token could not be created');
    }

    res.json({
      token : token,
      expires: expires
    });
  });
};