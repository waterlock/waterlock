var proxyquire =  require('proxyquire')
  , should = require('should')
  , path = require('path')
  , waterlockPath = path.normalize(__dirname+'/waterlock.config.json')

var pathStub = {
  normalize: function(str){
    return waterlockPath;
  }
}

var methodStub = {
  actions:{
    login: function(req, res, next){
      res.json({}, 200);
    },
    logout: function(req, res, next){
      req.session.authenticated = false;
      res.json({}, 200);
    }
  }
}

exports.waterlock = proxyquire.noCallThru().load('../lib/waterlock', 
  { 
    'path': pathStub, 
    '../../waterlock-local-auth': methodStub
  });

exports.proxyquire = proxyquire;
exports.should = should;