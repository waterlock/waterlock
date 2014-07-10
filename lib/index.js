var Waterlock = require('./waterlock');

if(!global.hasOwnProperty('waterlock')){
  global.waterlock = new Waterlock(); 
}

module.exports = global.waterlock;