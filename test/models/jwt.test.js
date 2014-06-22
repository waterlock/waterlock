var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('model jwt',function(){
  var jwt = waterlock.models.jwt;

  describe('attributes', function(){
    var attributes = jwt.attributes({});
    it('should  have a token', function(done){
      attributes.should.have.property('token');
      done();
    });

    it('should have a owner', function(done){
      attributes.should.have.property('owner');
      done();
    });
    it('should have a uses', function(done){
      attributes.should.have.property('uses');
      done();
    });
    it('should have a revoke', function(done){
      attributes.should.have.property('revoked');
      done();
    });
    it('should have a new attribute', function(done){
      var attributes = jwt.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  });
});