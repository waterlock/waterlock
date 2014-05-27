var proxyquire =  require('proxyquire')
  , should = require('should')
  , path = require('path')
  , waterlockPath = path.normalize(__dirname+'/waterlock.config.json')

var pathStub = {
  normalize: function(str){
    return waterlockPath;
  }
}

exports.waterlock = proxyquire('../lib/waterlock', { 'path': pathStub });
exports.proxyquire = proxyquire;
exports.should = should;