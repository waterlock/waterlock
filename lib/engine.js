'use strict';

var _ = require('lodash');

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
     * @param  {[type]}   criteria should be id to find the auth by
     * @param  {Function} cb         function to be called when the auth has been
     *                               found or an error has occurred 
     */
    findAuth: function(criteria, cb){
      waterlock.Auth.findOne(criteria).populate('user').exec(cb);
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
      waterlock.Auth.findOrCreate(criteria, attributes).populate('user')
        .exec(function(err, auth){
        if(err){
          waterlock.logger.debug(err);
        }

        // create the user
        if(!auth.user){
          waterlock.User.create({auth:auth.id}).exec(function(err, user){
            if(err){
              waterlock.logger.debug(err);
            }

            user.auth = auth;
            cb(err, user);
          });
        }else{
          var u = auth.user;
          delete(auth.user);
          u.auth = auth;
          cb(err, u);
        }
      });
    },

    /**
     * Attach given auth attributes to user 
     * 
     * @param  {object}   attributes auth attributes
     * @param  {[type]}   user       user instance
     * @param  {Function} cb         function to be called when the auth has been
     *                               attached or an error has occurred 
     */
    attachAuthToUser: function(attributes, user, cb){
      waterlock.User.findOne(user.id).exec(function(err, user){
        if(err){
          waterlock.logger.debug(err);
        }

        if(user.auth){
          //update existing auth
          waterlock.Auth.update({id: user.auth}, attributes)
            .exec(function(err, auth){
            if(err){
              waterlock.logger.debug(err);
            }

            user.auth = auth;
            cb(err, user);
          });
        }else{
          this.findOrCreateAuth(null, attributes, cb);
        }
      });
    },
	}
};