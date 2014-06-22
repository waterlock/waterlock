var path = require('path');
var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;
var _module = path.normalize(__dirname + '/../../../lib/templates/policies/hasJsonWebToken.js');
var policies = proxyquire.noCallThru().load(_module,{
  'waterlock':waterlock
});

describe('policies', function(){
  it('should exist', function(done){
    policies.should.be.function;
    done();
  });

  it('should be forbidden', function(done){
    var req = {query:{}, params:{all: function(){return {foo:'bar'};}}};
    var res = {forbidden: function(str){
      str.should.be.String;
      done();
    }};

    policies(req, res);
  });
});