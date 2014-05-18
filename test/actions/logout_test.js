var should = require('should');

describe('actions logout',function(){
  var logout = require('../../lib/actions/logout');

  it('should set session auth', function(done){
    var req = {session:{authenticated: true}}
    logout(req, {json:function(code){
      req.session.authenticated.should.equal(false);
      done();
    }});
  });
});