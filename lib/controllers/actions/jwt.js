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
    exp: expires,
    ndf: issued,
    iat: issued,
    iss: user.id + '|' + req.remoteAddress,
    aud: config.jsonWebTokens.audience, 
    prn: config.jsonWebTokens.principal, 
    jti: uuid.v1(), 
    typ: 'general' 
  }, config.jsonWebTokens.secret);
 
  Jwt.create({token: token, uses: 0, owner: user.id}).done(function(err){
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