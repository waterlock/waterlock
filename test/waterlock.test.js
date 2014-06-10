var should = require('should');

describe('waterlock',function(){
  var waterlock = require('../lib/waterlock');

  it('should have models', function(done){
    waterlock.should.have.property('models');
    done();
  });
  it('should have actions', function(done){
    waterlock.should.have.property('actions');
    done();
  });
  it('should have krypt', function(done){
    waterlock.should.have.property('krypt');
    done();
  });
  it('should have config', function(done){
    waterlock.should.have.property('config');
    done();
  });
  it('should have transport', function(done){
    waterlock.should.have.property('transport');
    done();
  });
});