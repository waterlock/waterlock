var testHelper = require('../../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var reset = waterlock.actions.user({});

describe('email reset', function(){
  it('should exist', function(done){
    reset.should.have.property('reset');
    done();
  });
});