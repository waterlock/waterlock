'use strict';

var waterlock = require('../../waterlock');
var AuthEvent = require('../../authevent');
var utils = require('../../utils');

/**
 * jwt action
 * creates a new token 
 * GET /user/jwt
 */
module.exports = function(req, res){
  var params = utils.allParams(req);
  var authevent = new AuthEvent(sails); 

  if(typeof params.type === 'undefined'){
    authevent.logout(req, res);
  }else{
    waterlock.authEvent = authevent;
    waterlock.methods[params.type].actions.logout(req, res, waterlock);
  }
};