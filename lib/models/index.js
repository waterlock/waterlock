'use strict';
var _  = require('lodash');

module.exports = function(methods){

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

  for(var key in methods){
    if(methods.hasOwnProperty(key)){
      var extras = methods[key].model.extras;
      if(extras){
        _.merge(template, extras);
      }
    }
  }
  return template;
};