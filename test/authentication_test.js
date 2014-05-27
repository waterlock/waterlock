var testHelper = require('./test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

describe('actions',function(){
  var action = waterlock.actions.basicAuth({});

  it('should have login', function(done){
    action.should.have.property('login');
    done();
  });

  it('should have logout', function(done){
    action.should.have.property('logout');
    done();
  });
  
});