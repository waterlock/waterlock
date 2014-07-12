'use strict';

var _ = require('lodash');

/**
 * Gets the current auth methods deinfed in the waterlock config file
 * then tries to require them one by one.
 * 
 * @return {object} all chosen auth methods
 */
module.exports = function(){
  var waterlock = this;

  return {

    /**
     * try to require the authentcation method defined in user config
     *
     * @return {object} containing all required auth methods
     */
    collect: function(){
      var func;

      if(typeof waterlock.config.authMethod[0] === 'object'){
        func = this._handleObjects;
      }else if(typeof waterlock.config.authMethod === 'object'){
        func = this._handleObject;
      }else{
        func = this._handleName;
      }
      
      return func(waterlock.config.authMethod);
    },

    /**
     * requires an array of auth method objects 
     * 
     * @param  {array} authMethods object array of auth methods
     * @return {object}            containing all required auth methods
     */
    _handleObjects: function(authMethods){
      var method = {};
      var _methodName;

      try{
        for(var i = 0; i < authMethods.length; i++){
          _methodName = authMethods[i].name;
          var _method = _.merge(require('../../'+_methodName), authMethods[i]);
          method[_method.authType] = _method;
        }
      }catch(e){
        this._errorHandler(_methodName);
      }

      return method;
    },

    /**
     * requires a single auth method by object
     * 
     * @param  {object} authMethod the auth method
     * @return {object}            containing all required auth methods
     */
    _handleObject: function(authMethod){
      var method = {};
      var _methodName = authMethod.name;
      
      try{
        var _method = _.merge(require('../../'+_methodName), authMethod);
        method[_method.authType] = _method;
      }catch(e){
        this._errorHandler(_methodName);
      }

      return method;
    },

    /**
     * requires a single auth method by name
     * 
     * @param  {string} authMethod the auth method name
     * @return {object}            containing all required auth methods
     */
    _handleName: function(authMethod){
      var method = {};
      var _methodName = authMethod;

      try{
        method[_methodName] = _.merge(require('../../'+_methodName), authMethod);
      }catch(e){
        this._errorHandler(_methodName);
      }

      return method;
    },

    /**
     * throws errors
     * 
     * @param  {string} method the method that failed to be required
     */
    _errorHandler: function(method){
      var error = new Error('Authentication method '+method+' could not be found. \n'+
      'Try running npm install '+method+'\n\n');
      
      throw error;
    }
  };
};