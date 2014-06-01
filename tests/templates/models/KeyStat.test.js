var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('models', function(){
  var keyStat = proxyquire('../lib/templates/models/KeyStat.js',{'waterlock': waterlock});
  describe('keyStat', function(){
    it('should exist', function(done){
      keyStat.should.be.Object;
      done();
    });
  });
});