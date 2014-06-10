'use strict';

var _ = require('lodash');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
exports.waterlocked = function(actions){
  var method = require('../waterlock').methods;
  var template = {
    login: method.actions.login,
    logout: method.actions.logout 
  };

  return _.merge(template, actions);
};

/**
 * [user description]
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
exports.user = function(actions){
  var template = {
    reset: require('./actions/reset'),
    apiKey: require('./actions/apiKey')
  };
 return _.merge(template, actions); 
};