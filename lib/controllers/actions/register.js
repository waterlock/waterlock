'use strict';

/**
 * login action
 *
 * tries to find if we have an auth method to handle this type of login
 * request.
 *
 * GET /auth/login
 */
module.exports = function(req, res){
  var params = waterlock._utils.allParams(req);

  // If there is only 1 chosen auth method just assume it
  if(waterlock._utils.countTopLevel(waterlock.methods) === 1){
    params.type = waterlock._utils.accessObjectLikeArray(0, waterlock.methods).authType;
  }

  if(typeof params.type === 'undefined'){
    return res.badRequest('You must specify a type parameter.');
  }

  if(waterlock.methods.hasOwnProperty(params.type)){
    // call the login function of the correct auth type
    waterlock.methods[params.type].actions.register(req, res);
  }else{
    return res.badRequest('unknown/invalid authentication type');
  }
};
