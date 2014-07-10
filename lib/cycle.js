'use strict';

var _ = require('lodash');

module.exports = function(){
  var waterlock = this;
  
  return {  
    /**
     * handles successful logins
     * 
     * @param  {object} req  express request object
     * @param  {object} res  expresss response object
     * @param  {object} user the user instance
     */
    loginSuccess: function(req, res, user){
      waterlock.logger.debug('user login success');

      if(user){
        var address = this._addressFromRequest(req);
        
        var attempt = {
          user:user.id,  
          successful: true
        };

        _.merge(attempt, address);

        waterlock.Attempt.create(attempt).exec(function(err){
          if(err){
            waterlock.logger.debug(err);
          }
        });
      }

      // store user in && authenticate the session
      req.session.user = user;
      req.session.authenticated = true;

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.login.success, 
        user);

      if(typeof postResponse === 'string' && this._isURI(postResponse)){
        res.redirect(postResponse);
      }else{
        res.ok(postResponse);
      }
    },

    /**
     * handles login failures
     * 
     * @param  {object} req  express request object
     * @param  {object} res  expresss response object
     * @param  {object} user the user instance
     * @param  {object|string} error the error that caused the failure
     */
    loginFailure: function(req, res, user, error){
      waterlock.logger.debug('user login failure');

      if(user){
        var address = this._addressFromRequest(req);

        var attempt = {
          user:user.id, 
          successful: false
        };

        _.merge(attempt, address);

        waterlock.Attempt.create(attempt).exec(function(err){
          if(err){
            waterlock.logger.debug(err);
          }
        });
      }

      if(req.session.authenticated){
        req.session.authenticated = false;
      }

      delete(req.session.user);

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.login.failure, 
        error);

      if(typeof postResponse === 'string' && this._isURI(postResponse)){
        res.redirect(postResponse);
      }else{
        res.forbidden(postResponse);
      }
    },

    /**
     * handles logout events
     * 
     * @param  {object} req  express request object
     * @param  {object} res  expresss response object
     */
    logout: function(req, res){
      waterlock.logger.debug('user logout');
      delete(req.session.user);

      if(req.session.authenticated){
        this.logoutSuccess(req, res);
      }else{
        this.logoutFailure(req, res);
      }
    },

    /**
     * the logout 'success' event
     * 
     * @param  {object} req express request object
     * @param  {object} res express response object
     */
    logoutSuccess: function(req, res){

      req.session.authenticated = false;

      var defaultString = 'You have successfully logged out.';

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.logout.success, 
        defaultString);

      if(typeof postResponse === 'string' && this._isURI(postResponse)){
        res.redirect(postResponse);
      }else{
        res.ok(postResponse);
      }
    },

    /**
     * the logout 'failure' event
     * 
     * @param  {object} req express request object
     * @param  {object} res express response object
     */
    logoutFailure: function(req, res){
      var defaultString = 'You have successfully logged out.';

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.logout.failure, 
        defaultString);

      if(typeof postResponse === 'string' && this._isURI(postResponse)){
        res.redirect(postResponse);
      }else{
        res.ok(postResponse);
      }
    },

    /**
     * Tries to check if the given string is a URI
     * 
     * @param  {string}  str the string to check
     * @return {Boolean}     true if string is a URI
     */
    _isURI: function(str){
      if(str.indexOf('/') == 0){ /* assume relative path */
        return true;
      }else if(str.indexOf('http') >= 0){ /* assume url */
        return true;
      }

      return false;
    },

    /**
     * returns an ip address and port from the express request object, or the 
     * sails.io socket which is attached to the req object.
     * 
     * @param  {object} req express request
     * @return {object}     the transport address object
     */
    _addressFromRequest: function(req){
      if(req.connection && req.connection.remoteAddress){
        return {
          ip:req.connection.remoteAddress,
          port: req.connection.remotePort
        };
      }else if(req.socket && req.socket.remoteAddress){
        return {
          ip: req.socket.remoteAddress,
          port: req.socket.remotePort
        };
      }
    },

    /**
     * translates the mix postAction to a string
     * 
     * @param  {string|object} mix the postAction object|string
     * @param  {string|object} def the default value to use if mix cannot be 
     *                         translated or is 'default'
     * @return {string|object} the translated postAction or default value
     */
    _resolvePostAction: function(mix, def){

      if(mix === 'default'){
        return def;
      }

      if(typeof mix === 'object'){
        return this._relativePathFromObj(mix);
      }

      return mix;
    },

    /**
     * returns the relative path from an object, the object is 
     * expected to look like the following
     *
     * example:
     * {
     *   controller: 'foo',
     *   action: 'bar'
     * }
     * 
     * @param  {object} obj the redirect object
     * @return {string}     the relative path
     */
    _relativePathFromObj: function(obj){
      if(typeof obj.controller === 'undefined' || typeof obj.action == 'undefined'){
        var error = new Error('You must define a controller and action to redirect to.').stack;
        throw error;
      }

      return '/' + obj.controller + '/' + obj.action;
    }
  }
}