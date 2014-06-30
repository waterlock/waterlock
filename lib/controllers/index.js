'use strict';

var _ = require('lodash');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {object} actions user defiend actions
 * @return {object} user actions merged with template
 */
exports.waterlocked = function(actions){
  var methods = require('../waterlock').methods;
  
  var actionTemplate = {};
  for(var key in methods){
    var action = methods[key].actions;
    if(action.hasOwnProperty('extras')){
      _.merge(actionTemplate, action.extras);
    }
  }

  var template = {
    login: require('./actions/login'),
    logout:require('./actions/logout')
  };
  _.merge(actionTemplate, template);

  return _.merge(actionTemplate, actions);
};

/**
 * user actions reset/apikey
 * @param  {object} actions user defiend actions
 * @return {object} user actions merged with template
 */
exports.user = function(actions){
  var template = {
    // reset: require('./actions/reset'),
    jwt: require('./actions/jwt')
  };
 return _.merge(template, actions); 
};