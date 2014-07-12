'use strict';

/**
 * logout action
 * 
 * creates a new token 
 * 
 * GET /user/jwt
 */
module.exports = function(req, res){
  var params = waterlock._utils.allParams(req);

  if(typeof params.type === 'undefined' || 
    !waterlock.methods.hasOwnProperty(params.type)){
    waterlock.cycle.logout(req, res);
  }else{
    waterlock.methods[params.type].actions.logout(req, res);
  }
};