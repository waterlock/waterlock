var should = require('should');

describe('waterlock',function(){
  var waterlock = require('../lib/waterlock');

  it('should have a version', function(done){
    waterlock.should.have.property('version');
    done();
  });
  
});