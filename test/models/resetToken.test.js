var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;


describe('models resetToken', function(){
  var resetToken = waterlock.models.resetToken;

  describe('attributes', function(){
    var attributes = resetToken.attributes({});
    it('should  have a resetToken', function(done){
      attributes.should.have.property('token');
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
      var attributes = resetToken.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  }); 

  describe('callbacks', function(){
    var beforeCreate = resetToken.beforeCreate;
    describe('beforeCreate', function(){
      it('should exist', function(done){
        resetToken.should.have.property('beforeCreate');
        done();
      });
      it('beforeCreate', function(done){
        beforeCreate({key: "test"}, function(){
          done();
        });
      });
    });
    
    var afterCreate = resetToken.afterCreate;
    describe('afterCreate', function(){
      it('should exist', function(done){
        resetToken.should.have.property('afterCreate');
        done();
      });

    });
  });
});