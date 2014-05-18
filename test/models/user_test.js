var should = require('should');

describe('model user',function(){
  var user = require('../../lib/models/').user;

  describe('attributes', function(){
    var attributes = user.attributes({});
    it('should  have a email', function(done){
      attributes.should.have.property('email');
      done();
    });

    it('should have a password', function(done){
      attributes.should.have.property('password');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = user.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  });

  describe('callbacks', function(){
    var beforeCreate = user.beforeCreate;
    it('beforeCreate', function(done){
      beforeCreate({key: "test"}, function(){
        done();
      });
    });
  });
  
});