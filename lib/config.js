'use strict';

var path = require('path');

/**
 * Tries to require the waterlock config
 * 
 * @return {object} waterlock config file
 */
module.exports = function(){
	/**
 * try to require user config file
 */
  try{
    var configPath = path.normalize(__dirname+'/../../../config/waterlock.js');
    var config = require(configPath).waterlock;
  }catch(e){
    var error = new Error('No config file defined, try running [waterlock generate config]\n\n'+e);
    throw error;
  }

  return config;
};