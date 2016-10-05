'use strict';

var _ = require('lodash');
var util = require('util');
var events = require('events');

module.exports = Waterlock;

/**
 * Creates a waterlock instance
 */
function Waterlock(){
  events.EventEmitter.call(this);

  this.sails      = global.sails; 

  this.engine     = _.bind(this.engine, this)();
  this.config     = _.bind(this.config, this)();
  this.methods    = _.bind(this.methods, this)().collect();
  this.models     = _.bind(this.models, this)();
  this.actions    = _.bind(this.actions, this)();
  this.cycle      = _.bind(this.cycle, this)();

  // expose jwt so the implementing 
  // app doesn't need to require it.
  this.jwt        = require('jwt-simple');

  this.validator  = _.bind(this.validator, this)();
}

util.inherits(Waterlock, events.EventEmitter);

Waterlock.prototype.__defineGetter__('Auth', function(){
  return this.sails.models['auth'];
});

Waterlock.prototype.__defineGetter__('User', function(){
  return this.sails.models['user'];
});

Waterlock.prototype.__defineGetter__('Attempt', function(){
  return this.sails.models['attempt'];
});

Waterlock.prototype.__defineGetter__('Use', function(){
  return this.sails.models['use'];
});

Waterlock.prototype.__defineGetter__('Jwt', function(){
  return this.sails.models['jwt'];
});

Waterlock.prototype.__defineGetter__('waterlocked', function(){
  return this.actions.waterlocked;
});

Waterlock.prototype.engine = require('./engine');

Waterlock.prototype.config = require('./config');

Waterlock.prototype.methods = require('./methods');

Waterlock.prototype.models = require('./models');

Waterlock.prototype.actions = require('./controllers');

Waterlock.prototype._utils = require('./utils');

Waterlock.prototype.logger = require('./logger');

Waterlock.prototype.cycle = require('./cycle');

Waterlock.prototype.validator = require('./validator');