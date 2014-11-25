'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Auth', function(){
  var Auth = require('../../../lib/models/auth');

  describe('#attributes()', function(){
    var attributes = Auth.attributes;
    it('should be a function', function(done){
      attributes.should.be.type('function');
      done();
    });

    it('should bind extra attributes', function(done){
      global.waterlock = {};
      var a = attributes.apply(this, [{shake:'bake'}]);
      a.should.have.property('shake');
      done();
    });

    it('should pass attributes to any defined waterlock.methods.*.model.auth functions', function(done){
      global.waterlock = {
        methods:{
          shake:{
            model:{
              auth:{
                attributes: function(attr){
                  attr['shake'] = 'bake';
                }
              }
            }
          }
        }
      };
      var a = attributes.apply(this, [{}]);
      a.should.have.property('shake');
      done();
    });

    describe('template attributes', function(){
      global.waterlock = {
        methods:{
        }
      };
      var auth = attributes.apply(this, [{}]);
      describe('.user', function(){
        it('should exist', function(done){
          auth.should.have.property('user');
          done();
        });
      });
    });
  });
  describe('#beforeCreate()', function(){
    var beforeCreate = Auth.beforeCreate;
    it('should be a function', function(done){
      beforeCreate.should.be.type('function');
      done();
    });
    it('should invoke other beforeCreate waterlock.methods if provided', function(done){
      global.waterlock ={
        methods: {
          shake:{
            model:{
              auth:{
                beforeCreate: function(){
                  done();
                }
              }
            }
          }
        }
      };
      beforeCreate.apply(this, [{}, function(){
        // nothing
      }]);
    });
  });

  describe('#beforeUpdate()', function(){
    var beforeUpdate = Auth.beforeUpdate;
    it('should be a function', function(done){
      beforeUpdate.should.be.type('function');
      done();
    });
    it('should invoke other beforeUpdate waterlock.methods if provided', function(done){
      global.waterlock ={
        methods: {
          shake:{
            model:{
              auth:{
                beforeUpdate: function(){
                  done();
                }
              }
            }
          }
        }
      };
      beforeUpdate.apply(this, [{}, function(){
        // nothing
      }]);
    });
  });
});