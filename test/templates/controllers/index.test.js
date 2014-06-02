var testHelper = require('../../test_helper');
var should = testHelper.should;

describe('installed controller', function(){
  var auth = require('../../../_testapp/api/controllers/AuthController.js');
  describe('auth', function(){
    it('should exsit', function(done){
      auth.should.be.Object;
      done();
    });
  });

  var user = require('../../../_testapp/api/controllers/UserController.js');
  describe('user', function(){
    it('should exist', function(done){
      user.should.be.Object;
      done();
    });
  });
});