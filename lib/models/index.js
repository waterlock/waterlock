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
  for(var key in this.methods){
    if(this.methods.hasOwnProperty(key)){
      var extras = this.methods[key].model.extras;
      if(extras){
        _.merge(template, extras);
      }
    }
  }
  
  return template;
};