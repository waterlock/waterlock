'use strict';

var winston = require('winston');
var path = require('path');
var logPath = path.normalize('../../../config/log');

// grabs the curent log level from the sails config/log file
var logLevel = require(logPath).log;

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