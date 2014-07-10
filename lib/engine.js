'use strict';

var _ = require('lodash');

// this engine is responsible for 
// finding, creating and updating auth objects
module.exports = function(){
	var waterlock = this;
  
	return {

    /**
     * simple wrapper for Auth find/populate method
     * @param  {[type]}   criteria [description]
     * @param  {Function} cb       [description]
     */
    findAuth: function(criteria, cb){
      waterlock.Auth.findOne(criteria).populate('user').exec(cb);
    },

    /**
     * This will create a user and auth object if one is not found.
     * @param  {object}   criteria   [description]
     * @param  {object}   attributes [description]
     * @param  {Function} cb         [description]
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
     * attach given auth attributes to user 
     * @param  {[type]}   attributes [description]
     * @param  {[type]}   user       [description]
     * @param  {Function} cb         [description]
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
}