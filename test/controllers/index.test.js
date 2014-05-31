var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var actions = waterlock.actions;

describe('actions index', function(){
  describe('basicAuth', function(){
    it('should exist', function(done){
      actions.should.have.property('basicAuth');
      done();
    });
  });
  describe('user', function(){
    it('should exist', function(done){
      actions.should.have.property('user');
      done();
    });
  });
});