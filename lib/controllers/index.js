'use strict';

var _ = require('lodash');

module.exports = function(){
  var waterlock = this;

  return {
    /**
     * waterlocked is an alias to the auth controller, waterlocked just
     * sounds cooler. Bootstraps all extra actions from selected authentication
     * methods.
     *
     * @param  {object} actions user defiend actions
     * @return {object} user actions merged with template
     */
    waterlocked: function(actions){
      var methods = waterlock.methods;

      var actionTemplate = {};
      _.each(methods, function(method, key){
        var action = method.actions;
        if(_.has(action, 'extras')){
          waterlock.logger.verbose('bootstraping auth actions from '+key);
          _.merge(actionTemplate, action.extras);
        }
      });

      var template = {
        login: require('./actions/login'),
        register: require('./actions/register'),
        logout:require('./actions/logout')
      };

      _.merge(actionTemplate, template);

      return _.merge(actionTemplate, actions);
    },

    /**
     * bootstraps user defined overrides with template actions
     *
     * @param  {object} actions user defiend actions
     * @return {object} user actions merged with template
     */
    user: function(actions){
      waterlock.logger.verbose('bootstraping user actions');

      var template = {
        jwt: require('./actions/jwt')
      };
     return _.merge(template, actions);
    }
  };
};
