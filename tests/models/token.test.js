var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;


describe('models token', function(){
  var token = waterlock.models.token;

  describe('attributes', function(){
    var attributes = token.attributes({});
    it('should  have a resetToken', function(done){
      attributes.should.have.property('resetToken');
      done();
    });
    
    it('should have a expiration', function(done){
      attributes.should.have.property('expiration');
      done();
    });

    it('should have a owner', function(done){
      attributes.should.have.property('owner');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = token.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  }); 

  describe('callbacks', function(){
    var beforeCreate = token.beforeCreate;
    describe('beforeCreate', function(){
      it('should exist', function(done){
        token.should.have.property('beforeCreate');
        done();
      });
      it('beforeCreate', function(done){
        beforeCreate({key: "test"}, function(){
          done();
        });
      });
    });
    
    var afterCreate = token.afterCreate;
    describe('afterCreate', function(){
      it('should exist', function(done){
        token.should.have.property('afterCreate');
        done();
      });

    });
  });
});