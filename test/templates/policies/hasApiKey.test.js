var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var policies = require('../../../lib/templates/policies/hasApiKey.js');

describe('policies', function(){
  it('should exist', function(done){
    policies.should.be.function;
    done();
  });

  it('should be forbidden', function(done){
    var req = {headers:{}};
    var res = {forbidden: function(str){
      str.should.be.String;
      done();
    }};

    policies(req, res);
  });
});