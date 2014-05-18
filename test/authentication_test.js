var should = require('should');

describe('actions',function(){
  var action = require('../lib/actions/')({});
  it('should have login', function(done){
    action.should.have.property('login');
    done();
  });

  it('should have logout', function(done){
    action.should.have.property('logout');
    done();
  });
  
});