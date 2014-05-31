var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var user = proxyquire('../lib/templates/models/User.js', {'waterlock': waterlock});
  describe('user', function(){
    it('should exist', function(done){
      user.should.be.Object;
      done();
    });
  });
});