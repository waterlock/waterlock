'use strict';

var moment = require('moment');
var config = require('../../waterlock').config;
var uuid = require('node-uuid');
var jwt = require('jwt-simple');

/**
 * jwt action
 * creates a new token 
 * GET /user/jwt
 */
module.exports = function(req, res){
  if(!req.session.authenticated){
    return res.json(404);
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
      console.log(err);
      return res.json(500);
    }

    res.json({
      token : token,
      expires: expires
    });
  });
};