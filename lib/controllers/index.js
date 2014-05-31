'use strict';

var utils = require('../utils');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
exports.basicAuth = function(actions){
  var template = {
    login: require('./actions/login'),
    logout: require('./actions/logout') 
  };

  return utils.mergeObjects(template, actions);
};

/**
 * [user description]
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
exports.user = function(actions){
  var template = {
    reset: require('./actions/reset')
  };
 return utils.mergeObjects(template, actions); 
};