var winston = require('winston');
var path = require('path');

var logLevel = require(path.normalize('../../../config/log')).log;

var logger = new (winston.Logger)({
  levels:{
    error: 4,
    warn: 3,
    debug: 2,
    info: 1,
    verbose: 0
  },
  colors:{
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    verbose: 'cyan'
  },
  transports: [
    new (winston.transports.Console)({
      levels: logLevel,
      colorize: true
    }),
  ]
});

module.exports = logger;