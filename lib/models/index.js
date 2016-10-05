'use strict';

/**
 * Models
 *
 * @return {object} all models
 */
module.exports = function(){

  var _  = require('lodash');

  var template = {
    /**
     * user model
     */
    user: require('./user'),

    /**
     * json web token model
     */
    jwt: require('./jwt'),

    /**
     * use model
     */
    use: require('./use'),

    /**
     * attempt model
     */
    attempt: require('./attempt'),

    /**
     * auth model
     */
    auth: require('./auth')
  };

  /**
   * loop through methods object and bind any extra models
   * they may have defined
   */
  _.each(this.methods, function(method){
    var extras = method.model.extras;
    if(extras){
      _.merge(template, extras);
    }
  });

  return template;
};