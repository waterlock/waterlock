'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var config = require('../fixtures/waterlock.config').waterlock;

var wl = {
  logger: {
    debug: function() {}
  },
  _utils: {
    createJwt: function(){
      return {
        token: '123123qweqwewe234234'
      };
    }
  },
  Attempt: {
    create: function() {
      return {
        exec: function(cb) {
          cb(null);
        }
      };
    }
  },
  config: config
};
var cycle = require('../../lib/cycle').apply(wl);

describe('cycle', function() {
  describe('#loginSuccess()', function() {

    it('should log error if any while creating Attempt', function(done) {
      var wl = {
        Attempt: {
          create: function() {
            return {
              exec: function(cb) {
                cb('NOPE');
              }
            };
          }
        },
        config: config,
        logger: {
          debug: function(msg) {
            if (msg === 'NOPE') {
              done();
            }
          }
        }
      };
      var cycle = require('../../lib/cycle').apply(wl);
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        ok: function() {}
      };
      var user = {};

      cycle.loginSuccess(req, res, user);
    });

    it('should trigger a serverError on null user', function(done) {
      cycle.loginSuccess(null, {
        serverError: function() {
          done();
        }
      }, null);
    });

    it('should set the session user', function(done) {
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        ok: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.loginSuccess(req, res, user);
    });

    it('should respond error', function(done) {
      config.postActions.login.success = 'jwt';
      global.Jwt = {
        create: function(){
          return {
            exec: function(cb){
              cb('error');
            }
          };
        }
      };
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        json: function() {
          req.session.user.should.be.ok;
          done();
        },
        serverError: function() {
          done();
        }
      };
      var user = {
        id: 1
      };

      cycle.loginSuccess(req, res, user);
    });

    it('should preform a redirect if given a postResponse uri', function(done) {
      wl.config.postActions.login.success = 'http://google.com';
      var cycle = require('../../lib/cycle').apply(wl);
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        redirect: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.loginSuccess(req, res, user);
    });

    it('should respond with jwt', function(done) {
      config.postActions.login.success = 'jwt';
      global.Jwt = {
        create: function(){
          return {
            exec: function(cb){
              cb();
            }
          };
        }
      };
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        json: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {
        id: 1
      };

      cycle.loginSuccess(req, res, user);
    });
  });
  describe('#registerSuccess()', function() {

    it('should log error if any while creating Attempt', function(done) {
      var wl = {
        Attempt: {
          create: function() {
            return {
              exec: function(cb) {
                cb('NOPE');
              }
            };
          }
        },
        config: config,
        logger: {
          debug: function(msg) {
            if (msg === 'NOPE') {
              done();
            }
          }
        }
      };
      var cycle = require('../../lib/cycle').apply(wl);
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        ok: function() {}
      };
      var user = {};

      cycle.registerSuccess(req, res, user);
    });

    it('should trigger a serverError on null user', function(done) {
      cycle.registerSuccess(null, {
        serverError: function() {
          done();
        }
      }, null);
    });

    it('should set the session user', function(done) {
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        ok: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.registerSuccess(req, res, user);
    });

    it('should respond with jwt', function(done) {
      config.postActions.login.success = 'jwt';
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        ok: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {};

      cycle.registerSuccess(req, res, user);
    });

    it('should preform a redirect if given a postResponse uri', function(done){
      wl.config.postActions.register.success = 'http://google.com';
      var cycle = require('../../lib/cycle').apply(wl);
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

      cycle.registerSuccess(req, res, user);
    });

    it('should respond with jwt', function(done) {
      config.postActions.register.success = 'jwt';
      global.Jwt = {
        create: function(){
          return {
            exec: function(cb){
              cb();
            }
          };
        }
      };
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        json: function() {
          req.session.user.should.be.ok;
          done();
        }
      };
      var user = {
        id: 1
      };

      cycle.registerSuccess(req, res, user);
    });

    it('should respond with error', function(done) {
      config.postActions.register.success = 'jwt';
      global.Jwt = {
        create: function(){
          return {
            exec: function(cb){
              cb('error');
            }
          };
        }
      };
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        json: function() {
          req.session.user.should.be.ok;
          done();
        },
        serverError: function() {
          done();
        }
      };
      var user = {
        id: 1
      };

      cycle.registerSuccess(req, res, user);
    });
  });
  describe('#registerFailure()', function() {
    it('should log error if any while creating Attempt', function(done) {
      var wl = {
        Attempt: {
          create: function() {
            return {
              exec: function(cb) {
                cb('NOPE');
              }
            };
          }
        },
        config: config,
        logger: {
          debug: function(msg) {
            if (msg === 'NOPE') {
              done();
            }
          }
        }
      };
      var cycle = require('../../lib/cycle').apply(wl);

      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {
          authenticated: true
        }
      };
      var res = {
        forbidden: function() {}
      };
      var user = {};

      cycle.registerFailure(req, res, user);
    });
    it('should unauthenticate the session', function(done) {
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {
          authenticated: true
        }
      };
      var res = {
        forbidden: function() {
          req.session.authenticated.should.be.false;
          done();
        }
      };
      var user = {};

      cycle.registerFailure(req, res, null);
    });

    it('should preform a redirect if given a postResponse uri', function(done) {
      wl.config.postActions.register.failure = 'http://google.com';
      var cycle = require('../../lib/cycle').apply(wl);
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        redirect: function() {
          done();
        }
      };
      var user = {};

      cycle.registerFailure(req, res, user);
    });
  });
  describe('#loginFailure()', function() {
    it('should log error if any while creating Attempt', function(done) {
      var wl = {
        Attempt: {
          create: function() {
            return {
              exec: function(cb) {
                cb('NOPE');
              }
            };
          }
        },
        config: config,
        logger: {
          debug: function(msg) {
            if (msg === 'NOPE') {
              done();
            }
          }
        }
      };
      var cycle = require('../../lib/cycle').apply(wl);

      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {
          authenticated: true
        }
      };
      var res = {
        forbidden: function() {}
      };
      var user = {};

      cycle.loginFailure(req, res, user);
    });
    it('should unauthenticate the session', function(done) {
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {
          authenticated: true
        }
      };
      var res = {
        forbidden: function() {
          req.session.authenticated.should.be.false;
          done();
        }
      };
      var user = {};

      cycle.loginFailure(req, res, null);
    });

    it('should preform a redirect if given a postResponse uri', function(done) {
      wl.config.postActions.login.failure = 'http://google.com';
      var cycle = require('../../lib/cycle').apply(wl);
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          port: '80'
        },
        session: {}
      };
      var res = {
        redirect: function() {
          done();
        }
      };
      var user = {};

      cycle.loginFailure(req, res, user);
    });
  });

  describe('#logout()', function() {
    it('should delete the session user', function(done) {
      var req = {
        session: {
          authenticated: true,
          user: {}
        }
      };
      var res = {
        ok: function() {
          (typeof req.session.user === 'undefined').should.be.true;
          done();
        }
      };
      var user = {};
      cycle.logout(req, res);
    });

    it('should trigger #logoutSuccess', function(done) {
      var req = {
        session: {
          authenticated: true,
          user: {}
        }
      };
      var res = {};
      var context = {
        logoutSuccess: function(req, res) {
          req.session.authenticated.should.be.true;
          done();
        }
      };
      cycle.logout.apply(context, [req, res]);
    });

    it('should trigger #logoutFailure', function(done) {
      var req = {
        session: {
          authenticated: false,
          user: {}
        }
      };
      var res = {};
      var context = {
        logoutFailure: function(req, res) {
          req.session.authenticated.should.be.false;
          done();
        }
      };
      cycle.logout.apply(context, [req, res]);
    });
  });

  describe('#logoutSuccess()', function() {
    it('should redirect to logout.success postAction', function(done) {
      var req = {
        session: {
          authenticated: false,
          user: {}
        }
      };
      var res = {
        redirect: function(str) {
          str.should.eql('http://google.com');
          done();
        }
      };

      var context = {
        _resolvePostAction: function(str) {
          return 'http://google.com';
        },
        _isURI: function(str) {
          return true;
        }
      };
      cycle.logoutSuccess.apply(context, [req, res]);
    });

    it('should unauthenticate the session', function(done) {
      var req = {
        session: {
          authenticated: true,
          user: {}
        }
      };
      var res = {
        redirect: function(str) {
          req.session.authenticated.should.be.false;
          done();
        }
      };

      var context = {
        _resolvePostAction: function(str) {
          return 'http://google.com';
        },
        _isURI: function(str) {
          return true;
        }
      };
      cycle.logoutSuccess.apply(context, [req, res]);
    });

    it('should have a default response', function(done) {
      var req = {
        session: {
          authenticated: true,
          user: {}
        }
      };
      var res = {
        ok: function(str) {
          str.should.be.String;
          done();
        }
      };

      var context = {
        _resolvePostAction: function(str, def) {
          return def;
        },
        _isURI: function(str) {
          return false;
        }
      };
      cycle.logoutSuccess.apply(context, [req, res]);
    });
  });

  describe('#logoutFailure()', function() {
    it('should redirect to logout failure postAction', function(done) {
      var req = {};
      var res = {
        redirect: function(str) {
          str.should.eql('http://google.com');
          done();
        }
      };

      var context = {
        _resolvePostAction: function(str) {
          return 'http://google.com';
        },
        _isURI: function(str) {
          return true;
        }
      };
      cycle.logoutFailure.apply(context, [req, res]);
    });

    it('should respond with default message', function(done) {
      var req = {};
      var res = {
        ok: function(str) {
          str.should.be.String;
          done();
        }
      };

      var context = {
        _resolvePostAction: function(str) {
          return 'http://google.com';
        },
        _isURI: function(str) {
          return false;
        }
      };
      cycle.logoutFailure.apply(context, [req, res]);
    });
  });

  describe('#_isURI()', function() {
    it('should return true if given string is a url', function(done) {
      var isURI = cycle._isURI('http://google.com');
      isURI.should.be.true;
      done();
    });
    it('should return true if given string is a relative path', function(done) {
      var isURI = cycle._isURI('/my/action');
      isURI.should.be.true;
      done();
    });
    it('should return false if given string is a no a url', function(done) {
      var isURI = cycle._isURI('hello');
      isURI.should.be.false;
      done();
    });
  });

  describe('#_addressFromRequest()', function() {
    it('should return a transport address object if given a req.connection object', function(done) {
      var req = {
        connection: {
          remoteAddress: '0.0.0.0',
          remotePort: '80'
        }
      };
      var obj = cycle._addressFromRequest(req);

      obj.should.have.property('ip');
      obj.should.have.property('port');
      done();
    });
    it('should return a transport address object if given a req.socket object', function(done) {
      var req = {
        socket: {
          remoteAddress: '0.0.0.0',
          remotePort: '80'
        }
      };
      var obj = cycle._addressFromRequest(req);

      obj.should.have.property('ip');
      obj.should.have.property('port');
      done();
    });
    it('should return default transport address object if req is not well formated', function(done) {
      var req = {};
      var obj = cycle._addressFromRequest(req);

      obj.should.have.property('ip');
      obj.should.have.property('port');
      done();
    });
  });

  describe('#_resolvePostAction()', function() {
    it('should return the given default value if mix is default', function(done) {
      var results = cycle._resolvePostAction('default', 'butts');
      results.should.eql('butts');
      done();
    });
    it('should return relative path if object is given', function(done) {
      var context = {
        _relativePathFromObj: function() {
          return '/some/path';
        }
      };
      var results = cycle._resolvePostAction.apply(context, [{}, 'butts']);
      results.should.eql('/some/path');
      done();
    });
    it('should return mix', function(done) {
      var results = cycle._resolvePostAction('butts');
      results.should.eql('butts');
      done();
    });
  });

  describe('#_relativePathFromObj()', function() {
    it('should convert an object containing controller/action properties to a path', function(done) {
      var obj = {
        controller: 'hello',
        action: 'world'
      };
      var results = cycle._relativePathFromObj(obj);
      results.should.eql('/hello/world');
      done();
    });

    it('should throw error if given object does not contain a controller or an action', function(done) {
      var obj = {};
      try {
        var results = cycle._relativePathFromObj(obj);
      } catch (e) {
        e.should.be.ok;
        done();
      }
    });
  });
});
