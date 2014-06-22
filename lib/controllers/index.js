'use strict';

var _ = require('lodash');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {object} actions user defiend actions
 * @return {object} user actions merged with template
 */
exports.waterlocked = function(actions){
  var method = require('../waterlock').methods;
  var template = method.actions;

  return _.merge(template, actions);
};

/**
 * user actions reset/apikey
 * @param  {object} actions user defiend actions
 * @return {object} user actions merged with template
 */
exports.user = function(actions){
  var template = {
    reset: require('./actions/reset'),
    jwt: require('./actions/jwt')
  };
 return _.merge(template, actions); 
};