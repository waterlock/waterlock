var should = require('should');

describe('model api',function(){
  var api = require('../../lib/models/').api;

  describe('attributes', function(){
    var attributes = api.attributes({});
    it('should  have a key', function(done){
      attributes.should.have.property('key');
      done();
    });

    it('should have a userId', function(done){
      attributes.should.have.property('userId');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = api.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  });

  describe('callbacks', function(){
    var beforeCreate = api.beforeCreate;
    it('beforeCreate', function(done){
      beforeCreate({key: "test"}, function(){
        done();
      });
    });
  });
  
});