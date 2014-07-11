'use strict';

var Waterlock = require('./waterlock');

// check if waterlock is already attached
// if not create a new instance 
if(!global.hasOwnProperty('waterlock')){
  global.waterlock = new Waterlock(); 
}

// EXPORT IT!
module.exports = global.waterlock;