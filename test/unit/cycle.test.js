var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var config = require('../waterlock.config').waterlock;

var wl = {
  logger:{debug:function(){}},
  Attempt:{
    create: function(){
      return {
        exec: function(cb){
          cb(null);
        }
      }
    }
  },
  config: config
};
var cycle = require('../../lib/cycle').bind(wl)();

describe('cycle', function(){
  describe('#loginSuccess()', function(){

    it('should trigger a serverError on null user', function(done){
      cycle.loginSuccess(null, {serverError: function(){
        done();
      }}, null);
    });

    it('should set the session user', function(done){
      var req = {
        connection:{
          remoteAddress: '0.0.0.0', 
          port:'80'
        },
        session: {}
      };
      var res = {
        ok: function(){
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.loginSuccess(req, res, user);
    });

    it('should preform a redirect if given a postResponse uri', function(done){
      wl.config.postActions.login.success = 'http://google.com';
      var cycle = require('../../lib/cycle').bind(wl)();
      var req = {
        connection:{
          remoteAddress: '0.0.0.0', 
          port:'80'
        },
        session: {}
      };
      var res = {
        redirect: function(){
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.loginSuccess(req, res, user);
    });
  });
  describe('#loginFailure()', function(){

    it('should unauthenticate the session', function(done){
      var req = {
        connection:{
          remoteAddress: '0.0.0.0', 
          port:'80'
        },
        session: {authenticated: true}
      };
      var res = {
        forbidden: function(){
          req.session.authenticated.should.be.false;
          done();
        }
      };
      var user = {};

      cycle.loginFailure(req, res, null);
    });

    it('should preform a redirect if given a postResponse uri', function(done){
      wl.config.postActions.login.failure = 'http://google.com';
      var cycle = require('../../lib/cycle').bind(wl)();
      var req = {
        connection:{
          remoteAddress: '0.0.0.0', 
          port:'80'
        },
        session: {}
      };
      var res = {
        redirect: function(){
          done();
        }
      };
      var user = {};

      cycle.loginFailure(req, res, user);
    });
  });

  describe('#logout', function(){
    it('should delete the session user', function(done){
      var req = {
        connection:{
          remoteAddress: '0.0.0.0', 
          port:'80'
        },
        session: {authenticated: true, user: {}}
      };
      var res = {
        ok: function(){
          (typeof req.session.user === 'undefined').should.be.true;
          done();
        }
      };
      var user = {};
      cycle.logout(req, res);
    });
  });
});