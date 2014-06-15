var should = require('should');

describe('model user',function(){
  var user = require('../../lib/models/').basicUser;

  describe('attributes', function(){
    var attributes = user.attributes({});

    it('should have a new attribute', function(done){
      var attributes = user.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  });

  describe('callbacks', function(){
    var beforeCreate = user.beforeCreate;
    it('beforeCreate', function(done){
      beforeCreate({password: "test"}, function(){
        done();
      });
    });
  });
  
});