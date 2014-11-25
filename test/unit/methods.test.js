'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var config = require('../fixtures/waterlock.config').waterlock;

describe('methods', function(){
  describe('#collect()', function(){
    it('should trigger #_handleObjects', function(done){
      var scope = {
        config: {
          authMethod: [{name: 'some-auth-module'}]
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _handleObjects: function(){
          return true;
        }
      };

      var results = methods.collect.apply(context);
      results.should.be.true;
      done();
    });
    it('should trigger #_handleObject', function(done){
      var scope = {
        config: {
          authMethod: {name: 'some-auth-module'}
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _handleObject: function(){
          return true;
        }
      };

      var results = methods.collect.apply(context);
      results.should.be.true;
      done();
    });
    it('should trigger #_handleName', function(done){
      var scope = {
        config: {
          authMethod: 'some-auth-module'
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _handleName: function(){
          return true;
        }
      };

      var results = methods.collect.apply(context);
      results.should.be.true;
      done();
    });
  });

  describe('#_handleObjects()', function(){
    it('should try and require auth method but throw an error', function(done){
      var scope = {
        config: {
          authMethod: [{name: 'some-auth-module'}]
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _errorHandler: function(){
          return true;
        }
      };

      var results = methods._handleObjects.apply(context, [scope.config.authMethod]);
      results.should.be.type('object');
      done();
    });

    it('should require auth method', function(done){
      var scope = {
        config: {
          authMethod: [{name: 'some-auth-module'}]
        }
      };
      var methods =  proxyquire.noCallThru().load('../../lib/methods',
        {
          '../../some-auth-module': {shake:'bake', authType: 'magic-man'}
        })();
      
      var results = methods._handleObjects(scope.config.authMethod);
      results.should.have.property('magic-man');
      done();
    });
  });

  describe('#_handleObject()', function(){
    it('should try and require auth method but throw an error', function(done){
      var scope = {
        config: {
          authMethod: {name: 'some-auth-module'}
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _errorHandler: function(){
          return true;
        }
      };

      var results = methods._handleObject.apply(context, [scope.config.authMethod]);
      results.should.be.type('object');
      done();
    });
    it('should require auth method', function(done){
      var scope = {
        config: {
          authMethod: {name: 'some-auth-module'}
        }
      };
      var methods =  proxyquire.noCallThru().load('../../lib/methods',
        {
          '../../some-auth-module': {shake:'bake', authType: 'magic-man'}
        })();
      
      var results = methods._handleObject(scope.config.authMethod);
      results.should.have.property('magic-man');
      done();
    });
  });

  describe('#_handleName()', function(){
    it('should try and require auth method but throw an error', function(done){
      var scope = {
        config: {
          authMethod: 'some-auth-module'
        }
      };
      var methods = require('../../lib/methods').apply(scope);

      var context = {
        _errorHandler: function(){
          return true;
        }
      };

      var results = methods._handleName.apply(context, [scope.config.authMethod]);
      results.should.be.type('object');
      done();
    });
    it('should require auth method', function(done){
      var scope = {
        config: {
          authMethod: 'some-auth-module'
        }
      };
      var methods =  proxyquire.noCallThru().load('../../lib/methods',
        {
          '../../some-auth-module': {shake:'bake', authType: 'magic-man'}
        })();
      
      var results = methods._handleName(scope.config.authMethod);
      results.should.have.property('magic-man');
      done();
    });
  });

  describe('#_errorHandler()', function(){
    it('should throw a custom error', function(done){
      var methods = require('../../lib/methods')();

      try{
        methods._errorHandler('Hello');
      }catch(e){
        e.should.be.ok;
        done();
      }
    });
  });
});