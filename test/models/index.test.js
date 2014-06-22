var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var models = waterlock.models;

describe('models index', function(){
  describe('basicUser', function(){
    it('should exist', function(done){
      models.should.have.property('basicUser');
      done();
    });
  });
  describe('jwt', function(){
    it('should exist', function(done){
      models.should.have.property('jwt');
      done();
    });
  });
  describe('resetToken', function(){
    it('should exist', function(done){
      models.should.have.property('resetToken');
      done();
    });
  });
  describe('use', function(){
    it('should exist', function(done){
      models.should.have.property('use');
      done();
    });
  });
});