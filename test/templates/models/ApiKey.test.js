var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var apiKey = proxyquire('../lib/templates/models/ApiKey.js',{'waterlock': waterlock});
  describe('apiKey', function(){
    it('should exist', function(done){
      apiKey.should.be.Object;
      done();
    });
  });
});