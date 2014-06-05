var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var waterStub = {'waterlock': waterlock};
var proxyquire = testHelper.proxyquire;

describe('installed models', function(){
  var apiKey = proxyquire('../_testapp/api/models/ApiKey.js', waterStub);
  describe('apiKey', function(){
    it('should exsit', function(done){
      apiKey.should.be.Object;
      done();
    });
  });

  var user = proxyquire('../_testapp/api/models/User.js', waterStub);
  describe('user', function(){
    it('should exist', function(done){
      user.should.be.Object;
      done();
    });
  });

  var token = proxyquire('../_testapp/api/models/Token.js', waterStub);
  describe('token', function(){
    it('should exist', function(done){
      token.should.be.Object;
      done();
    });
  });

  var use = proxyquire('../_testapp/api/models/Use.js', waterStub);
  describe('use', function(){
    it('should exist', function(done){
      use.should.be.Object;
      done();
    });
  });
});