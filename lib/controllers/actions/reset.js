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
    func(req, res, User, Token, params); 
  }
};

/**
 * utility function to check if a given token is
 * after it expiration date
 * @param  waterlineDAO  token The current token to check
 * @return boolean       true if token is past it's expiration, otherwise false
 */
function isTokenExpired(token){
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
 * @param  waterlineDAO Token the waterline Token dao
 * @param  object params all params for this request
 */
function handleGet(req, res, User, Token, params){
  validateToken(req, res, User, Token, params);
}

/**
 * Handles the POST method for this request
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO Token the waterline Token dao
 * @param  object params all params for this request
 */
function handlePost(req, res, User, Token, params){
  
  var func;
  
  if(typeof params.email !== 'undefined'){
    func = sendEmail;
  }else if(typeof req.session.resetToken !== 'undefined' && 
    req.session.resetToken &&
    typeof params.password !== 'undefined'){
    func = issuePasswordReset;
  }

  if(typeof func !== 'undefined'){
    func(req, res, User, Token, params);
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
 * @param  waterlineDAO Token the waterline Token dao
 * @param  object params all params for this request
 */
function sendEmail(req, res, User, Token, params){
  User.findOne({email: params.email}).done(function(err, u){
    if(u){
      Token.create({resetToken: Math.random(13), owner: u.id}).done(function(err, t){
        if(err){
          console.log(err);
        }
        User.update({id: u.id}, {token: t.id}).done(function(err){
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
 * @param  waterlineDAO Token the waterline Token dao
 * @param  object params all params for this request
 */
function issuePasswordReset(req, res, User, Token, params){
  User.findOne(req.session.resetToken.owner).populate('token').done(function(err, u){
    if(err){
      console.log(err);
    }

    // save token id before we destroy
    var tokenId = u.token.id;
    User.update({id:u.id},{token: null, password: params.password}).done(function(err, u){
      if(err){
        console.log(err);
      }

      // destroy the token
      Token.destroy(tokenId).done(function(err){
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
 * @param  waterlineDAO Token the waterline Token dao
 * @param  object params all params for this request
 */
function validateToken(req, res, User, Token, params){
  User.findOne(params.id).populate('token').done(function(err, u){

    if(typeof u.token !== 'undefined' && 
      u.token.resetToken === params.token && 
      !isTokenExpired(u.token)){

      req.session.resetToken = u.token;

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