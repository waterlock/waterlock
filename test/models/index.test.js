var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var models = waterlock.models;

describe('models index', function(){
  describe('user', function(){
    it('should exist', function(done){
      models.should.have.property('user');
      done();
    });
  });
  describe('jwt', function(){
    it('should exist', function(done){
      models.should.have.property('jwt');
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