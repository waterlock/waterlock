'use strict';

exports = module.exports = AuthEvent;


function AuthEvent(sails){
  this.sails = sails;
}

AuthEvent.prototype.getModel = function(name){
  return this.sails.models[name];
};

AuthEvent.prototype.findOrCreate = function(criteria, attributes, user, cb){
  if(typeof user !== 'undefined'){
    this._attachToExistingUser(criteria, attributes, user, cb);
  }else{
    this._findOrCreateUser(criteria, attributes, cb);
  }
};

AuthEvent.prototype._attachToExistingUser = function(criteria, attributes, user, cb){
  var self = this;
  self.getModel('user').findOne(user.id)
    .populate('auth')
    .exec(function(err, user){
      self.getModel('auth')
        .update({id: user.auth.id}, attributes)
        .exec(function(){
          self.getModel('user').findOne(user.id).populate('auth').exec(cb);
        });
  });
};

AuthEvent.prototype._findOrCreateUser = function(criteria, attributes, cb){
  var self = this;
  self.getModel('auth').findOrCreate(criteria, attributes)
    .populate('user')
    .exec(function(err, auth){
      if(!auth.user){
        self.getModel('user').create({auth: auth.id})
            .exec(function(err, u){
              self.getModel('auth').update({id:auth.id}, {user:u.id})
              .exec(function(err, a){
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

AuthEvent.prototype.loginSuccess = function(req, res, user){
  if(user){
    this.getModel('attempt').create({
      user:user.id, 
      ip: req.connection.remoteAddress, 
      successful: true
    }).exec(function(){});
  }

  req.session.user = user;
  req.session.authenticated = true;
  res.json(user);
};

AuthEvent.prototype.loginFailure = function(req, res, user, error){
  if(user){
    this.getModel('attempt').create({
      user:user.id, 
      ip: req.connection.remoteAddress, 
      successful: false
    }).exec(function(){});
  }

  if(req.session.authenticated){
    req.session.authenticated = false;
  }

  delete(req.session.user);

  res.json(error);
};

AuthEvent.prototype.logout = function(req, res){
  if(req.session.authenticated){
    req.session.authenticated = false;
  }

  delete(req.session.user);

  res.ok();
};