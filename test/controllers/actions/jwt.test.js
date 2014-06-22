var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var jwt = waterlock.actions.user({}).jwt;

describe('jwt action', function(){
  it('should exist', function(done){
    jwt.should.be.Function;
    done();
  });

  it('should respond with 404', function(done){
    var req = {method: 'PUT', session:{authenticated: false}};
    var res = {json: function(code){
      code.should.equal(404);
      done();
    }};
    jwt(req, res);
  });
});