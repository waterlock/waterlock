var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('model use',function(){
  var use = waterlock.models.use;

  describe('attributes', function(){
    var attributes = use.attributes({});
    it('should  have a remoteAddress', function(done){
      attributes.should.have.property('remoteAddress');
      done();
    });

    it('should have a apiKey', function(done){
      attributes.should.have.property('apiKey');
      done();
    });

    it('should have a new attribute', function(done){
      var attributes = use.attributes({name: 'string'});
      attributes.should.have.property('name');
      done();
    });
  }); 
});