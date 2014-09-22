'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('models', function(){
  it('should be a function', function(done){
    var models = require('../../../lib/models');
    models.should.be.type('function');
    done();
  });

  it('should bind any extras onto returned object', function(done){
    var waterlock = {
      logger: {
        verbose: function(){
          return;
        }
      },
      methods: {
        foo: {
          model: {
            extras:{
              shake: 'bake'
            }
          }
        }
      }
    };
    var models = require('../../../lib/models');
    models = models.apply(waterlock);

    models.should.have.property('shake');
    done();
  });

  describe('properties', function(){
    var models = require('../../../lib/models');
    before(function(){
      var waterlock = {
        logger: {
          verbose: function(){
            return;
          }
        }
      };
      models = models.apply(waterlock);
    });
    describe('.user', function(){
      it('should exist', function(done){
        models.should.have.property('user');
        done();
      });
    });
    describe('.jwt', function(){
      it('should exist', function(done){
        models.should.have.property('jwt');
        done();
      });
    });
    describe('.use', function(){
      it('should exist', function(done){
        models.should.have.property('use');
        done();
      });
    });
    describe('.attempt', function(){
      it('should exist', function(done){
        models.should.have.property('attempt');
        done();
      });
    });
    describe('.auth', function(){
      it('should exist', function(done){
        models.should.have.property('auth');
        done();
      });
    });
  });
});