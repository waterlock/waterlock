var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('model keyStat',function(){
  var keyStat = waterlock.models.keyStat;

  describe('attributes', function(){
    var attributes = keyStat.attributes({});
    it('should  have a remoteAddress', function(done){
      attributes.should.have.property('remoteAddress');
      done();
    });

    it('should have a apiKey', function(done){
      attributes.should.have.property('apiKey');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = keyStat.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  }); 
});