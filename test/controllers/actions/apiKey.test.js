var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var apiKey = waterlock.actions.user({}).apiKey;

describe('apiKey action', function(){
  it('should exist', function(done){
    apiKey.should.be.Function;
    done();
  });

  it('should respond with 404', function(done){
    var req = {method: 'PUT'};
    var res = {json: function(code){
      code.should.equal(404);
      done();
    }};
    apiKey(req, res);
  });
});