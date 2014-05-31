'use strict';

var moment = require('moment');
var utils = require('../../utils');
var config = require('../../waterlock').config;
var krypt = require('../../waterlock').krypt;
/**
 * Password reset action
 */
module.exports = function(req, res){
	
  var params = allParams(req);

  // we have a request
  if(typeof params.id === 'string' && typeof params.token === 'string'){
  	User.findOne(params.id).populate('token').done(function(err, u){
  		if(typeof u.token !== 'undefined' && u.token.resetToken === params.token && !isTokenExpired(u.token)){
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
  }else if(typeof req.session.resetToken !== 'undefined' && typeof params.password !== 'undefined'){
  	//issue reset
  	if(req.session.resetToken){
  		User.findOne(req.session.resetToken.owner).populate('token').done(function(err, u){
        if(err){
          console.log(err);
        }

        u.password = krypt.hash(params.password);
        u.save(function(err){
          if(err){
            console.log(err);
          }

          User.update({id:u.id},{token:null}).done(function(){});
          Token.destroy(u.token.id).done(function(){});

          res.json(200);
          req.session.resetToken = false;
        });
  		});	
  	}
  }else if(typeof params.email !== 'undefined'){
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
  }else{
  	res.json(403);
  }
};

function isTokenExpired(token){
  var expiration = moment(token.expiration);
	var now = moment(new Date());
	return now.isAfter(expiration);
}

function allParams(req){
  var params = req.params.all();
  return utils.mergeObjects(req.query, params);
}