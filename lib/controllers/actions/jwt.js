'use strict';

/* global waterlock */

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
  
  var token = waterlock._utils.createJwt(req, res);
 
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
