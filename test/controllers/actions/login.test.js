var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var auth = waterlock.actions.waterlocked({});

describe('actions login', function(){
  it('should exist', function(done){
    auth.should.have.property('login');
    done();
  });
  it('should fail', function(done){
    auth.login({body: {}},{json: function(obj, code){
      code.should.equal(200);
      done();
    }});
  });
});