'use strict';
var _  = require('lodash');

module.exports = function(){

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