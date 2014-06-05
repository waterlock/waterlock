var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var use = proxyquire('../lib/templates/models/Use.js',{'waterlock': waterlock});
  describe('use', function(){
    it('should exist', function(done){
      use.should.be.Object;
      done();
    });
  });
});