'use strict';

var moment = require('moment');
var _ = require('lodash');
var config = require('../../waterlock').config;

/**
 * Password reset action
 */
module.exports = function(req, res){
	
  var func;

  switch(req.method){
    case 'GET':
      func = handleGet;
      break;
    case 'POST':
      func = handlePost;
      break;
    default:
      res.json(404);
      break;
  }

  if(typeof func !== 'undefined'){
    var params = allParams(req);
    func(req, res, User, ResetToken, params); 
  }
};

/**
 * utility function to check if a given token is
 * after it expiration date
 * @param  waterlineDAO  token The current token to check
 * @return boolean       true if token is past it's expiration, otherwise false
 */
function isResetTokenExpired(token){
  var expiration = moment(token.expiration);
	var now = moment(new Date());
	return now.isAfter(expiration);
}

/**
 * gathers all params for this request
 * @param  object req the express request object
 * @return object     all params
 */
function allParams(req){
  var params = req.params.all();
  return _.merge(req.query, params);
}

/**
 * Handles the GET method for this request
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function handleGet(req, res, User, ResetToken, params){
  validateToken(req, res, User, ResetToken, params);
}

/**
 * Handles the POST method for this request
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function handlePost(req, res, User, ResetToken, params){
  
  var func;
  
  if(typeof params.email !== 'undefined'){
    func = sendEmail;
  }else if(typeof req.session.resetToken !== 'undefined' && 
    req.session.resetToken &&
    typeof params.password !== 'undefined'){
    func = issuePasswordReset;
  }

  if(typeof func !== 'undefined'){
    func(req, res, User, ResetToken, params);
  }else{
    res.json(404);
  }
}

/**
 * Begins the reset process by creating a new reset token
 * and sending an email to the user
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function sendEmail(req, res, User, ResetToken, params){
  User.findOne({email: params.email}).done(function(err, u){
    if(u){
      ResetToken.create({owner: u.id}).done(function(err, t){
        if(err){
          console.log(err);
        }
        User.update({id: u.id}, {resetToken: t.id}).done(function(err){
          if(err){
            console.log(err);
          }
          res.json(200);
        });
      });
    }
  });
}

/**
 * Issues a password reset
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function issuePasswordReset(req, res, User, ResetToken, params){
  User.findOne(req.session.resetToken.owner).populate('resetToken').done(function(err, u){
    if(err){
      console.log(err);
    }

    // save token id before we destroy
    var tokenId = u.resetToken.id;
    User.update({id:u.id},{resetToken: null, password: params.password}).done(function(err, u){
      if(err){
        console.log(err);
      }

      // destroy the token
      ResetToken.destroy(tokenId).done(function(err){
        if(err){
          console.log(err);
        }

        req.session.resetToken = false;  
        res.json(u);  
      });
    });
  }); 
}

/**
 * validates a users token and redirects them to the new url if provided
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function validateToken(req, res, User, ResetToken, params){
  User.findOne(params.id).populate('resetToken').done(function(err, u){

    if(typeof u.resetToken !== 'undefined' && 
      u.resetToken.token === params.token && 
      !isResetTokenExpired(u.resetToken)){

      req.session.resetToken = u.resetToken;

      if(config.passwordReset.mail.forwardUrl){
        res.redirect(config.passwordReset.mail.forwardUrl);
      }else{
        res.json(200);
      }
    }else{
      //TODO limit attempts?
      req.session.resetToken = false;
      res.json(403);
    }
  });
}