var testHelper = require('../test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;

var actions = waterlock.actions;

describe('actions index', function(){
  describe('waterlocked', function(){
    it('should exist', function(done){
      actions.should.have.property('waterlocked');
      actions.waterlocked.should.be.Function;
      done();
    });

    it('should merge objects', function(done){
      var foo = {bar: function(){}};
      var merged = actions.waterlocked(foo);
      merged.should.have.property('bar');
      done();
    });
  });
  describe('user', function(){
    it('should exist', function(done){
      actions.should.have.property('user');
      actions.user.should.be.Function;
      done();
    });
    it('should merge objects', function(done){
      var foo = {bar: function(){}};
      var merged = actions.user(foo);
      merged.should.have.property('bar');
      done();
    });
  });
});