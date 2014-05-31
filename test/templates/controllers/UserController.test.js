var testHelper = require('../../test_helper');
var should = testHelper.should;

describe('controller', function(){
  var user = require('../../../lib/templates/controllers/UserController.js');
  describe('user', function(){
    it('should exist', function(done){
      user.should.be.Object;
      done();
    });
  });
});