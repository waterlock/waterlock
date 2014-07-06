'use strict';

var _ = require('lodash');

exports = module.exports = AuthEvent;


function AuthEvent(sails, postActions){
  this.sails = sails;
  this.postActions = postActions;
  this.logger = require('./logger');
}

/**
 * wrapper for sails models
 * @param  {string} name variable of the model to get
 * @return {object}      waterline model
 */
AuthEvent.prototype.getModel = function(name){
  return this.sails.models[name];
};

/**
 * Finds or creates a user, used to centralize the user search process
 * the user is found here and authenticated in auth modules.
 * 
 * @param  {object}   criteria   criteria used to search the user with
 * @param  {object}   attributes attributes used to create the user if not found
 * @param  {object}   user       optional user object for multiple auths 
 * @param  {Function} cb         callback to be invoked when the user is found
 */
AuthEvent.prototype.findOrCreate = function(criteria, attributes, user, cb){
  this.logger.debug('searching for user to login');

  if(typeof user !== 'undefined'){
    this._attachToExistingUser(criteria, attributes, user, cb);
  }else{
    this._findOrCreateUser(criteria, attributes, cb);
  }
};

/**
 * finds a user object, used for strict logins, meaning do not create
 * a user when one is not found.
 * 
 * @param  {object}   criteria   criteria used to search the user with
 * @param  {Function} cb         callback to be invoked when the user is found
 */
AuthEvent.prototype.findUser = function(criteria, cb){
  this.logger.debug('searching for user');
  this.getModel('user').findOne(criteria).populate('auth').exec(cb);
}

/**
 * attach the auth event to an existing authenticated user
 * used to allow a user to have mulitple different auths
 * e.g. local and facebook
 * 
 * @param  {object}   criteria   criteria used to search the user with
 * @param  {object}   attributes attributes used to create the user if not found
 * @param  {object}   user       optional user object for multiple auths 
 * @param  {Function} cb         callback to be invoked when the user is found
 */
AuthEvent.prototype._attachToExistingUser = function(criteria, attributes, user, cb){
  var self = this;
  self.getModel('user').findOne(user.id)
    .populate('auth')
    .exec(function(err, user){
      if(err){
        self.logger.debug(err);
      }

      self.getModel('auth')
        .update({id: user.auth.id}, attributes)
        .exec(function(err){
          if(err){
            self.logger.debug(err);
          }

          self.getModel('user').findOne(user.id).populate('auth').exec(cb);
        });
  });
};

/**
 * find or create a new auth and attach it to a user or return the user already
 * associated with the auth
 * 
 * @param  {object}   criteria   criteria used to search the user with
 * @param  {object}   attributes attributes used to create the user if not found
 * @param  {Function} cb         callback to be invoked when the user is found
 */
AuthEvent.prototype._findOrCreateUser = function(criteria, attributes, cb){
  var self = this;
  self.getModel('auth').findOrCreate(criteria, attributes)
    .populate('user')
    .exec(function(err, auth){
      // if the auth doesn't have a user create one now and attach the auth to it.
      if(!auth.user){
        self.getModel('user').create({auth: auth.id})
            .exec(function(err, u){
              if(err){
                this.logger.debug(err);
              }

              self.getModel('auth').update({id:auth.id}, {user:u.id})
              .exec(function(err, a){
                if(err){
                  self.logger.debug(err);
                }

                u.auth = a.shift();
                cb(err, u);
              });
            });
      }else{
        self.getModel('user').findOne(auth.user.id)
        .populate('auth')
        .exec(cb);
      }
    });
};

/**
 * handles successful logins
 * 
 * @param  {object} req  express request object
 * @param  {object} res  expresss response object
 * @param  {object} user the user instance
 */
AuthEvent.prototype.loginSuccess = function(req, res, user){
  this.logger.debug('user login success');

  if(user){
    var address = this._addressFromRequest(req);
    
    var attempt = {
      user:user.id,  
      successful: true
    };

    _.merge(attempt, address);

    this.getModel('attempt').create(attempt).exec(function(err){
      if(err){
        this.logger.debug(err);
      }
    });
  }

  // store user in && authenticate the session
  req.session.user = user;
  req.session.authenticated = true;

  // now respond or redirect
  var postResponse = this._resolvePostAction(this.postActions.login.success, 
    user);

  if(typeof postResponse === 'string' && this._isURI(postResponse)){
    res.redirect(postResponse);
  }else{
    res.ok(postResponse);
  }
};

/**
 * handles login failures
 * 
 * @param  {object} req  express request object
 * @param  {object} res  expresss response object
 * @param  {object} user the user instance
 * @param  {object|string} error the error that caused the failure
 */
AuthEvent.prototype.loginFailure = function(req, res, user, error){
  this.logger.debug('user login failure');

  if(user){
    var address = this._addressFromRequest(req);

    var attempt = {
      user:user.id, 
      successful: false
    };

    _.merge(attempt, address);

    this.getModel('attempt').create(attempt).exec(function(err){
      if(err){
        this.logger.debug(err);
      }
    });
  }

  if(req.session.authenticated){
    req.session.authenticated = false;
  }

  delete(req.session.user);

  // now respond or redirect
  var postResponse = this._resolvePostAction(this.postActions.login.failure, 
    error);

  if(typeof postResponse === 'string' && this._isURI(postResponse)){
    res.redirect(postResponse);
  }else{
    res.forbidden(postResponse);
  }
};

/**
 * handles logout events
 * 
 * @param  {object} req  express request object
 * @param  {object} res  expresss response object
 */
AuthEvent.prototype.logout = function(req, res){
  this.logger.debug('user logout');
  delete(req.session.user);

  if(req.session.authenticated){
    this.logoutSuccess(req, res);
  }else{
    this.logoutFailure(req, res);
  }
};

/**
 * the logout 'success' event
 * 
 * @param  {object} req express request object
 * @param  {object} res express response object
 */
AuthEvent.prototype.logoutSuccess = function(req, res){

  req.session.authenticated = false;

  var defaultString = 'You have successfully logged out.';

  // now respond or redirect
  var postResponse = this._resolvePostAction(this.postActions.logout.success, 
    defaultString);

  if(typeof postResponse === 'string' && this._isURI(postResponse)){
    res.redirect(postResponse);
  }else{
    res.ok(postResponse);
  }
}

/**
 * the logout 'failure' event
 * 
 * @param  {object} req express request object
 * @param  {object} res express response object
 */
AuthEvent.prototype.logoutFailure = function(req, res){
  var defaultString = 'You have successfully logged out.';

  // now respond or redirect
  var postResponse = this._resolvePostAction(this.postActions.logout.failure, 
    defaultString);

  if(typeof postResponse === 'string' && this._isURI(postResponse)){
    res.redirect(postResponse);
  }else{
    res.ok(postResponse);
  }
}

/**
 * Tries to check if the given string is a URI
 * 
 * @param  {string}  str the string to check
 * @return {Boolean}     true if string is a URI
 */
AuthEvent.prototype._isURI = function(str){
  if(str.indexOf('/') == 0){ /* assume relative path */
    return true;
  }else if(str.indexOf('http') >= 0){ /* assume url */
    return true;
  }

  return false;
}

/**
 * returns an ip address and port from the express request object, or the 
 * sails.io socket which is attached to the req object.
 * 
 * @param  {object} req express request
 * @return {object}     the transport address object
 */
AuthEvent.prototype._addressFromRequest = function(req){
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
}

/**
 * translates the mix postAction to a string
 * 
 * @param  {string|object} mix the postAction object|string
 * @param  {string|object} def the default value to use if mix cannot be 
 *                         translated or is 'default'
 * @return {string|object} the translated postAction or default value
 */
AuthEvent.prototype._resolvePostAction = function(mix, def){

  if(mix === 'default'){
    return def;
  }

  if(typeof mix === 'object'){
    return this._relativePathFromObj(mix);
  }

  return mix;
}

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
AuthEvent.prototype._relativePathFromObj = function(obj){
  if(typeof obj.controller === 'undefined' || typeof obj.action == 'undefined'){
    var error = new Error('You must define a controller and action to redirect to.').stack;
    throw error;
  }

  return '/' + obj.controller + '/' + obj.action;
}