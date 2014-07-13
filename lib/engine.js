'use strict';

/**
 * This engine is responsible for 
 * finding, creating and updating auth objects
 * 
 * @return {object} engine functions
 */
module.exports = function(){
	var waterlock = this;
  
	return {

    /**
     * Simple wrapper for Auth find/populate method
     * 
     * @param  {object}   criteria should be id to find the auth by
     * @param  {Function} cb         function to be called when the auth has been
     *                               found or an error has occurred 
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
     * @param  {object}   criteria   should be id to find the auth by
     * @param  {object}   attributes auth attributes
     * @param  {Function} cb         function to be called when the auth has been
     *                               found or an error has occurred 
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
          cb(err, self._invertAuth(auth));
        }
      });
    },

    /**
     * Attach given auth attributes to user 
     * 
     * @param  {object}   attributes auth attributes
     * @param  {object}   user       user instance
     * @param  {Function} cb         function to be called when the auth has been
     *                               attached or an error has occurred 
     */
    attachAuthToUser: function(attributes, user, cb){
      var self = this;
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
     * @param  {object} auth Auth object
     * @return {object}      User object
     */
    _invertAuth: function(auth){
      var u = auth.user;
      delete(auth.user);
      u.auth = auth;
      return u;
    }
	};
};