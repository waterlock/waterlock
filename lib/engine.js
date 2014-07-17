'use strict';

/**
 * This engine is responsible for 
 * finding, creating and updating auth objects
 * 
 * @return {Object} engine functions
 */
module.exports = function(){
	var waterlock = this;
  
	return {

    /**
     * Simple wrapper for Auth find/populate method
     * 
     * @param  {Object}   criteria should be id to find the auth by
     * @param  {Function} cb         function to be called when the auth has been
     *                               found or an error has occurred 
     * @api public                          
     */
    findAuth: function(criteria, cb){
      var self = this;
      waterlock.Auth.findOne(criteria).populate('user')
      .exec(function(err, auth){
        cb(err, self._invertAuth(auth));
      });
    },

    /**
     * This will create a user and auth object if one is not found
     * 
     * @param  {Object}   criteria   should be id to find the auth by
     * @param  {Object}   attributes auth attributes
     * @param  {Function} cb         function to be called when the auth has been
     *                               found or an error has occurred 
     * @api public
     */
    findOrCreateAuth: function(criteria, attributes, cb){
      var self = this;
      waterlock.Auth.findOrCreate(criteria, attributes).populate('user')
        .exec(function(err, auth){
        if(err){
          waterlock.logger.debug(err);
          return cb(err);
        }

        // population didn't work try again
        if(typeof auth.user === 'number'){
          if(!self.hasOwnProperty('_findOrCreateAuthAttempts')){
            self._findOrCreateAuthAttempts = 0;
          }
          
          if(self._findOrCreateAuthAttempts > 0){
            return cb('Cannot find or create auth');
          }
          
          self._findOrCreateAuthAttempts++;
          // let's try that again
          return self.findOrCreateAuth(auth.id, null, cb);
        }

        // if we passed the top section we can delete the attempts
        delete(self._findOrCreateAuthAttempts);

        // create the user
        if(!auth.user){
          waterlock.User.create({auth:auth.id}).exec(function(err, user){
            if(err){
              waterlock.logger.debug(err);
              return cb(err);
            }

            // update the auth object
            waterlock.Auth.update(auth.id, {user:user.id}).exec(function(err, auth){
              if(err){
                waterlock.logger.debug(err);
                return cb(err);
              }

              user.auth = auth;
              cb(err, user);  
            });
          });
        }else{
          // just fire off update to user object so we can get the 
          // backwards association going.
          if(!auth.user.auth){
            waterlock.User.update(auth.user.id, {auth:auth.id}).exec(function(){});
          }
          
          cb(err, self._invertAuth(auth));
        }
      });
    },

    /**
     * Attach given auth attributes to user 
     * 
     * @param  {Object}   attributes auth attributes
     * @param  {Object}   user       user instance
     * @param  {Function} cb         function to be called when the auth has been
     *                               attached or an error has occurred 
     * @api public
     */
    attachAuthToUser: function(attributes, user, cb){
      var self = this;
      attributes.user = user.id;

      waterlock.User.findOne(user.id).exec(function(err, user){
        if(err){
          waterlock.logger.debug(err);
          return cb(err);
        }

        if(user.auth){
          //update existing auth
          waterlock.Auth.update({id: user.auth}, attributes)
            .exec(function(err, auth){
            if(err){
              waterlock.logger.debug(err);
              return cb(err);
            }

            user.auth = auth;
            cb(err, user);
          });
        }else{
          // force create by pass null criteria 
          self.findOrCreateAuth(null, attributes, cb);
        }
      });
    },

    /**
     * Inverts the auth object so we don't need to run another query
     * 
     * @param  {Object} auth Auth object
     * @return {Object}      User object
     * @api private
     */
    _invertAuth: function(auth){
      // nothing to invert
      if(!auth || !auth.user){
        return auth; 
      }

      var u = auth.user;
      delete(auth.user);
      u.auth = auth;
      return u;
    }
	};
};