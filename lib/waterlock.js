var Krypt = require('./krypt');

exports.version = '0.0.1';

exports.models = require('./models/');
exports.actions = require('./actions/');

exports.krypt = new Krypt();