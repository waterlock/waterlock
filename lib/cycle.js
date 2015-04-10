'use strict';

var _ = require('lodash');

/**
 * Cycle
 *
 * @return {Object} various cycle functions
 */
module.exports = function() {
  var waterlock = this;

  return {

    /**
     * handles successful logins
     *
     * @param  {Object} req  express request object
     * @param  {Object} res  expresss response object
     * @param  {Object} user the user instance
     * @api public
     */
    registerSuccess: function(req, res, user) {
      waterlock.logger.debug('user registration success');
      if (!user) {
        waterlock.logger.debug('registerSuccess requires a valid user object');
        return res.serverError();
      }

      var address = this._addressFromRequest(req);

      var attempt = {
        user: user.id,
        successful: true
      };

      _.merge(attempt, address);

      waterlock.Attempt.create(attempt).exec(function(err) {
        if (err) {
          waterlock.logger.debug(err);
        }
      });

      // store user in && authenticate the session
      req.session.user = user;
      req.session.authenticated = true;

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.register.success, user);

      if (postResponse === 'jwt') {
        //Returns the token immediately
        var jwtData = waterlock._utils.createJwt(req, res, user);

        Jwt.create({token: jwtData.token, uses: 0, owner: user.id}).exec(function(err){
          if(err){
            return res.serverError('JSON web token could not be created');
          }

          var result = {};

          result[waterlock.config.jsonWebTokens.tokenProperty] = jwtData.token;
          result[waterlock.config.jsonWebTokens.expiresProperty] = jwtData.expires;

          if (waterlock.config.jsonWebTokens.includeUserInJwtResponse) {
            result['user'] = user;
          }

          res.json(result);
        });
      }else if (typeof postResponse === 'string' && this._isURI(postResponse)) {
        res.redirect(postResponse);
      } else {
        res.ok(postResponse);
      }
    },

    /**
     * handles registration failures
     *
     * @param  {Object} req  express request object
     * @param  {Object} res  expresss response object
     * @param  {Object} user the user instance
     * @param  {Object|String} error the error that caused the failure
     * @api public
     */
    registerFailure: function(req, res, user, error) {
      waterlock.logger.debug('user register failure');

      if (user) {
        var address = this._addressFromRequest(req);

        var attempt = {
          user: user.id,
          successful: false
        };

        _.merge(attempt, address);

        waterlock.Attempt.create(attempt).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
          }
        });
      }

      if (req.session.authenticated) {
        req.session.authenticated = false;
      }

      delete(req.session.user);

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.register.failure,
        error);

      if (typeof postResponse === 'string' && this._isURI(postResponse)) {
        res.redirect(postResponse);
      } else {
        res.forbidden(postResponse);
      }
    },


    /**
     * handles successful logins
     *
     * @param  {Object} req  express request object
     * @param  {Object} res  expresss response object
     * @param  {Object} user the user instance
     * @api public
     */
    loginSuccess: function(req, res, user) {
      waterlock.logger.debug('user login success');
      if (!user) {
        waterlock.logger.debug('loginSuccess requires a valid user object');
        return res.serverError();
      }

      var address = this._addressFromRequest(req);

      var attempt = {
        user: user.id,
        successful: true
      };

      _.merge(attempt, address);

      waterlock.Attempt.create(attempt).exec(function(err) {
        if (err) {
          waterlock.logger.debug(err);
        }
      });

      // store user in && authenticate the session
      req.session.user = user;
      req.session.authenticated = true;
      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.login.success,
        user);
      if (postResponse === 'jwt') {
        //Returns the token immediately
        var jwtData = waterlock._utils.createJwt(req, res, user);

        Jwt.create({token: jwtData.token, uses: 0, owner: user.id}).exec(function(err){
          if(err){
            return res.serverError('JSON web token could not be created');
          }

          var result = {};

          result[waterlock.config.jsonWebTokens.tokenProperty] = jwtData.token || 'token';
          result[waterlock.config.jsonWebTokens.expiresProperty] = jwtData.expires || 'expires';

          if (waterlock.config.jsonWebTokens.includeUserInJwtResponse) {
            result['user'] = user;
          }

          res.json(result);
        });
      } else if(typeof postResponse === 'string' && this._isURI(postResponse)){
        res.redirect(postResponse);
      } else {
        res.ok(postResponse);
      }
    },

    /**
     * handles login failures
     *
     * @param  {Object} req  express request object
     * @param  {Object} res  expresss response object
     * @param  {Object} user the user instance
     * @param  {Object|String} error the error that caused the failure
     * @api public
     */
    loginFailure: function(req, res, user, error) {
      waterlock.logger.debug('user login failure');

      if (user) {
        var address = this._addressFromRequest(req);

        var attempt = {
          user: user.id,
          successful: false
        };

        _.merge(attempt, address);

        waterlock.Attempt.create(attempt).exec(function(err) {
          if (err) {
            waterlock.logger.debug(err);
          }
        });
      }

      if (req.session.authenticated) {
        req.session.authenticated = false;
      }

      delete(req.session.user);

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.login.failure,
        error);

      if (typeof postResponse === 'string' && this._isURI(postResponse)) {
        res.redirect(postResponse);
      } else {
        res.forbidden(postResponse);
      }
    },

    /**
     * handles logout events
     *
     * @param  {Object} req  express request object
     * @param  {Object} res  expresss response object
     * @api public
     */
    logout: function(req, res) {
      waterlock.logger.debug('user logout');
      delete(req.session.user);

      if (req.session.authenticated) {
        this.logoutSuccess(req, res);
      } else {
        this.logoutFailure(req, res);
      }
    },

    /**
     * the logout 'success' event
     *
     * @param  {Object} req express request object
     * @param  {Object} res express response object
     * @api public
     */
    logoutSuccess: function(req, res) {

      req.session.authenticated = false;

      var defaultString = 'You have successfully logged out.';

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.logout.success,
        defaultString);

      if (typeof postResponse === 'string' && this._isURI(postResponse)) {
        res.redirect(postResponse);
      } else {
        res.ok(postResponse);
      }
    },

    /**
     * the logout 'failure' event
     *
     * @param  {Object} req express request object
     * @param  {Object} res express response object
     * @api public
     */
    logoutFailure: function(req, res) {
      var defaultString = 'You have successfully logged out.';

      // now respond or redirect
      var postResponse = this._resolvePostAction(waterlock.config.postActions.logout.failure,
        defaultString);

      if (typeof postResponse === 'string' && this._isURI(postResponse)) {
        res.redirect(postResponse);
      } else {
        res.ok(postResponse);
      }
    },

    /**
     * Tries to check if the given string is a URI
     *
     * @param  {String}  str the string to check
     * @return {Boolean}     true if string is a URI
     * @api private
     */
    _isURI: function(str) {
      if (str.indexOf('/') === 0) { /* assume relative path */
        return true;
      } else if (str.indexOf('http') >= 0) { /* assume url */
        return true;
      }

      return false;
    },

    /**
     * returns an ip address and port from the express request object, or the
     * sails.io socket which is attached to the req object.
     *
     * @param  {Object} req express request
     * @return {Object}     the transport address object
     * @api private
     */
    _addressFromRequest: function(req) {
      if (req.connection && req.connection.remoteAddress) {
        return {
          ip: req.connection.remoteAddress,
          port: req.connection.remotePort
        };
      }

      if (req.socket && req.socket.remoteAddress) {
        return {
          ip: req.socket.remoteAddress,
          port: req.socket.remotePort
        };
      }

      return {
        ip: '0.0.0.0',
        port: 'n/a'
      };
    },

    /**
     * translates the mix postAction to a string
     *
     * @param  {String|Object} mix the postAction object|string
     * @param  {String|Object} def the default value to use if mix cannot be
     *                         translated or is 'default'
     * @return {String|Object} the translated postAction or default value
     * @api private
     */
    _resolvePostAction: function(mix, def){
      //If postAction is not defined fall back to default
      if(mix === 'default' || typeof mix === 'undefined') {
        return def;
      }

      if (typeof mix === 'object') {
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
     * @param  {Object} obj the redirect object
     * @return {String}     the relative path
     * @api private
     */
    _relativePathFromObj: function(obj) {
      if (typeof obj.controller === 'undefined' || typeof obj.action === 'undefined') {
        var error = new Error('You must define a controller and action to redirect to.').stack;
        throw error;
      }

      return '/' + obj.controller + '/' + obj.action;
    }
  };
};
