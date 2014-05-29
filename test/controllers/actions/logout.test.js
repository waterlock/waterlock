var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var auth = waterlock.actions.basicAuth({});

describe('actions logout',function(){
  var logout = auth.logout;

  it('should exist', function(done){
    auth.should.have.property('logout');
    done();
  });
  it('should set session auth', function(done){
    var req = {session:{authenticated: true}}
    logout(req, {json:function(code){
      req.session.authenticated.should.equal(false);
      done();
    }});
  });
});