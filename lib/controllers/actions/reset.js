var moment = require('moment');
/**
 * Password reset action
 */
module.exports = function(req, res){
	
  var params = req.params.all();
  
  // we have a request
  if(typeof params.id === 'number' && typeof params.token === 'string'){
  	User.findOne(params.id).populate('token').done(function(err, u){
  		if(u.token.resetToken == params.token && !isTokenExpired(u.token)){
  			req.session.resetToken = u.token;

  			var config = require('../../waterlock').config
  			if(config.passwordReset.mail.forwardUrl){
  				res.redirect(config.passwordReset.mail.forwardUrl);
  			}
  		}else{
  			//TODO limit attempts?
  			req.session.resetToken = false;
  		}
  	});
  }else if(typeof req.session.resetToken !== 'undefined' && typeof params.password !== 'undefined'){
  	//issue reset
  	if(req.session.resetToken){
  		User.findOne(res.session.resetToken.owner).populate(token).done(function(err, u){
  			u.password = params.password;

  			u.token.destroy(function(err){
  					//Token destroyed
  			});

  			u.save(function(err){
  				res.json(200);
  				res.session.resetToken = false;
  			});

  		});	
  	}
  }else if(typeof params.email !== 'undefined'){
  	User.findOne({email: params.email}).done(function(err, u){
  		if(u){
  			Token.create({resetToken: Math.random(13), owner: u.id}).done(function(err, t){
  				console.log(err);
  				res.json(200);
  			});
  		}
  	});
  }else{
  	res.json(403);
  }
}

function isTokenExpired(token){
	var expiration = moment(token.expiration);
	var now = moment(new Date());
	
	return now.isAfter(expiration)
}