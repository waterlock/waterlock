var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('model attempt',function(){
  var attempt = waterlock.models.attempt;

  describe('attributes', function(){
    var attributes = attempt.attributes({});
    it('should  have a user', function(done){
      attributes.should.have.property('user');
      attributes.user.model.should.equal('user');
      done();
    });

    it('should have a successful', function(done){
      attributes.should.have.property('successful');
      attributes.successful.type.should.equal('boolean');
      attributes.successful.defaultsTo.should.not.be.ok;
      done();
    });

    it('should have a new ip', function(done){
      attributes.should.have.property('ip');
      attributes.ip.type.should.equal('string');
      done();
    });
  });
});