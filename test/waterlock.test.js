var should = require('should');

describe('waterlock',function(){
  var waterlock = require('../lib/waterlock');

  it('should have models', function(done){
    waterlock.should.have.property('models');
    waterlock.models.should.be.Object;
    done();
  });
  it('should have actions', function(done){
    waterlock.should.have.property('actions');
    waterlock.actions.should.be.Object;
    done();
  });
  it('should have krypt', function(done){
    var k = require('../lib/krypt');
    waterlock.should.have.property('krypt');
    waterlock.krypt.should.be.Object;
    waterlock.krypt.should.be.an.instanceOf(k);
    done();
  });
  it('should have config', function(done){
    waterlock.should.have.property('config');
    waterlock.config.should.be.Object;
    done();
  });
  it('should have transport', function(done){
    waterlock.should.have.property('transport');
    waterlock.transport.should.be.Object;
    done();
  });
});