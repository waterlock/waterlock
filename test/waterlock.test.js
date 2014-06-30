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
  it('should have config', function(done){
    waterlock.should.have.property('config');
    waterlock.config.should.be.Object;
    done();
  });
});