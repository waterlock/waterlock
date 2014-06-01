var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('model apiKey',function(){
  var apiKey = waterlock.models.apiKey;

  describe('attributes', function(){
    var attributes = apiKey.attributes({});
    it('should  have a key', function(done){
      attributes.should.have.property('key');
      done();
    });

    it('should have a owner', function(done){
      attributes.should.have.property('owner');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = apiKey.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  });

  describe('callbacks', function(){
    var beforeCreate = apiKey.beforeCreate;
    describe('beforeCreate', function(){
      it('should exist', function(done){
        apiKey.should.have.property('beforeCreate');
        done();
      });
      it('beforeCreate', function(done){
        beforeCreate({key: "test"}, function(){
          done();
        });
      });
    });
    
    var beforeUpdate = apiKey.beforeUpdate;
    describe('beforeUpdate', function(){
      it('should exist', function(done){
        apiKey.should.have.property('beforeUpdate');
        done();
      });
      it('beforeUpdate', function(done){
        beforeUpdate({key: "test"}, function(){
          done();
        });
      });
    });
  });
  
});