'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var config = require('./waterlock.config');

var Waterlock =  proxyquire.noCallThru().load('../../lib/waterlock',{
  './engine': function(){},
  './config': function(){},
  './methods': function(){return {collect: function(){}};},
  './controllers': function(){return{waterlocked:{}};},
  './utils': {},
  './logger': {},
  './cycle': function(){}
});

describe('waterlock', function(){
  it('should be a function', function(done){
    Waterlock.should.be.type('function');
    done();
  });

  describe('#constructor()', function(){
    it('should return a waterlock object', function(done){
      global.sails = {};
      Waterlock.bind(this);
      var waterlock = new Waterlock();
      waterlock.should.be.instanceOf(Waterlock);
      done();
    });
  });

  describe('getters', function(){
    global.sails = {
      models:{
        auth: {},
        user: {},
        attempt: {},
        use: {},
        jwt: {}
      }
    };
    Waterlock.bind(this);
    var waterlock = new Waterlock();
    it('should have an Auth', function(done){
      waterlock.Auth.should.be.ok;
      done();
    }); 
    it('should have a User', function(done){
      waterlock.User.should.be.ok;
      done();
    }); 
    it('should have an Attempt', function(done){
      waterlock.Attempt.should.be.ok;
      done();
    });
    it('should have a Use', function(done){
      waterlock.Use.should.be.ok;
      done();
    });
    it('should have an Jwt', function(done){
      waterlock.Jwt.should.be.ok;
      done();
    });
    it('should have waterlocked', function(done){
      waterlock.waterlocked.should.be.ok;
      done();
    }); 
  });
  describe('properties', function(){
    global.sails = {};
    Waterlock.bind(this);
    var waterlock = new Waterlock();
    describe('.engine', function(){
      it('should exist', function(done){
        waterlock.should.have.property('engine');
        done();
      });
    });
    describe('.config', function(){
      it('should exist', function(done){
        waterlock.should.have.property('config');
        done();
      });
    });
    describe('.methods', function(){
      it('should exist', function(done){
        waterlock.should.have.property('methods');
        done();
      });
    });
    describe('.models', function(){
      it('should exist', function(done){
        waterlock.should.have.property('models');
        done();
      });
    });
    describe('.actions', function(){
      it('should exist', function(done){
        waterlock.should.have.property('actions');
        done();
      });
    });
    describe('._utils', function(){
      it('should exist', function(done){
        waterlock.should.have.property('_utils');
        done();
      });
    });
    describe('.logger', function(){
      it('should exist', function(done){
        waterlock.should.have.property('logger');
        done();
      });
    });
    describe('.cycle', function(){
      it('should exist', function(done){
        waterlock.should.have.property('cycle');
        done();
      });
    });
  });
});