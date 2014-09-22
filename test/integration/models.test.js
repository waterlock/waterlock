'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('templates', function(){
  describe('installed', function(){
    describe('models', function(){
      describe('Auth', function(){
        var Auth = require('../../_testapp/api/models/Auth.js');
        it('should exist', function(done){
          Auth.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          Auth.attributes.should.have.property('user');
          done();
        });
      });
      describe('User', function(){
        var User = require('../../_testapp/api/models/User.js');
        it('should exist', function(done){
          User.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          User.attributes.should.have.property('auth');
          done();
        });
      });
      describe('Jwt', function(){
        var Jwt = require('../../_testapp/api/models/Jwt.js');
        it('should exist', function(done){
          Jwt.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          Jwt.attributes.should.have.property('owner');
          done();
        });
      });
      describe('Attempt', function(){
        var Attempt = require('../../_testapp/api/models/Attempt.js');
        it('should exist', function(done){
          Attempt.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          Attempt.attributes.should.have.property('user');
          done();
        });
      });
      describe('Use', function(){
        var Use = require('../../_testapp/api/models/Use.js');
        it('should exist', function(done){
          Use.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          Use.attributes.should.have.property('jsonWebToken');
          done();
        });
      });
    });
  });
});