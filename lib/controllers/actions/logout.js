'use strict';

/**
 * logout action
 * 
 * logout
 * 
 * GET /auth/logut
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
