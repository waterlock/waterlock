#!/usr/bin/env node

'use strict';

module.exports = function(){
  var args = Array.prototype.slice.call(arguments);
  var meta = args.pop();
  var task = args.shift();

  var raw = false;
  if(typeof meta.raw !== 'undefined' && meta.raw){
    raw = meta.raw;
  }
  var auth = require('./waterlock-auth-methods')();
  auth.install(task);  
};