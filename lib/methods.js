'use strict';

var _ = require('lodash');

/**
 * Gets the current auth methods deinfed in the waterlock config file
 * then tries to require them one by one.
 *
 * @return {Object} all chosen auth methods
 */
module.exports = function(){
  var waterlock = this;

  return {

    /**
     * try to require the authentcation method defined in user config
     *
     * @return {Object} containing all required auth methods
     * @api private
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

      return func.apply(this, [waterlock.config.authMethod]);
    },

    /**
     * requires an array of auth method objects
     *
     * @param  {Array} authMethods object array of auth methods
     * @return {Object}            containing all required auth methods
     * @api private
     */
    _handleObjects: function(authMethods){
      var _method = {};
      var _methodName;

      try{
        _.each(authMethods, function(method){
          _methodName = method.name;
          method = _.merge(require('../../'+_methodName), method);
          _method[method.authType] = method;
        });
      }catch(e){
        this._errorHandler(_methodName);
      }

      return _method;
    },

    /**
     * requires a single auth method by object
     *
     * @param  {Object} authMethod the auth method
     * @return {Object}            containing all required auth methods
     * @api private
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
     * @param  {String} authMethod the auth method name
     * @return {Object}            containing all required auth methods
     * @api private
     */
    _handleName: function(authMethod){
      var method = {};
      var _methodName = authMethod;

      try{
        var _method = _.merge(require('../../'+_methodName), authMethod);
        method[_method.authType] = _method;
      }catch(e){
        this._errorHandler(_methodName);
      }

      return method;
    },

    /**
     * throws errors
     *
     * @param  {String} method the method that failed to be required
     * @api private
     */
    _errorHandler: function(method){
      var error = new Error('Authentication method ' + method + ' could not be found. \n'+
      'Try running npm install '+method+'\n\n');

      throw error;
    }
  };
};
