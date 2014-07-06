'use strict';

var waterlock = require('../../waterlock');
var AuthEvent = require('../../authevent');
var utils = require('../../utils');
var log = require('../../logger');

/**
 * login action
 *
 * tries to find if we have an auth method to handle this type of login
 * request.
 * 
 * GET /auth/login
 */
module.exports = function(req, res){
  var params = utils.allParams(req);

  // If there is only 1 chosen auth method just assume it
  if(utils.countTopLevel(waterlock.methods) === 1){
    params.type = utils.accessObjectLikeArray(0, waterlock.methods).authType;
  }

  if(typeof params.type === 'undefined'){
    return res.badRequest('You must specify a type parameter.');
  }

  if(waterlock.methods.hasOwnProperty(params.type)){
    // call the login function of the correct auth type
    var authevent = new AuthEvent(sails, waterlock.config.postActions); 
    waterlock.authEvent = authevent;
    waterlock.methods[params.type].actions.login(req, res, waterlock);
  }else{
    return res.badRequest({error:'unknown/invalid authentication type'});
  }
};