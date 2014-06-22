var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var jwt = proxyquire('../lib/templates/models/Jwt.js',{'waterlock': waterlock});
  describe('jwt', function(){
    it('should exist', function(done){
      jwt.should.be.Object;
      done();
    });
  });
});