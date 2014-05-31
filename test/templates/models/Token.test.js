var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var token = proxyquire('../lib/templates/models/Token.js', {'waterlock': waterlock});
  describe('token', function(){
    it('should exist', function(done){
      token.should.be.Object;
      done();
    });
  });
});