#!/usr/bin/env node

'use strict';

var path = require('path'); 
var fs = require('fs'); 
var readline = require('readline'); 
var rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
}); 

module.exports = function(){
  var self = this || {};
  self.waterlockPlugins = [];

  self.logger = require('../lib/logger');
  // waterlock itself
  self.waterlockPlugins.push(path.resolve(__dirname+'/../lib/templates'));
  
  // grab all node_modules
  var node_modules = path.resolve(__dirname+'/../..'); 
  var _node_modules = fs.readdirSync(node_modules);
  
  // sort through them and only add any waterlock-* 
  for(var i = 0; i < _node_modules.length; i++){
    if(_node_modules[i].indexOf('waterlock-') > -1){
      self.waterlockPlugins.push(node_modules + '/' + _node_modules[i] + '/lib/templates');
    }
  }

  return {
    /**
     * List of full path targets to install
     * 
     * @type {Array}
     */
    installArray: [],
    
    /**
     * base path for the installed sails app
     * 
     * @type {String}
     */
    basePath: path.resolve(__dirname+'/../../..'),

    /**
     * installs selected task
     * 
     * @param  {String} task the resource to install
     */
    install: function(task){
      switch(task){
        case 'all':
          this.collectAll();
          break; 
        case 'models':
        case 'controllers':
        case 'configs':
        case 'views':
        case 'policies':
          this.collect(task);
          break;
        default:
          this.usageExit(); 
          break; 
      }

      // start the chain
      this.triggerNext();
    },

    /**
     * collects all targets to install from all waterlock modules
     * 
     * @param  {String} target the resource to collect from waterlock module
     */
    collect: function(target){
      for(var i = 0;  i < self.waterlockPlugins.length; i++){
        var arr = this.readdirSyncComplete(self.waterlockPlugins[i] + '/' + target);
        this.installArray = this.installArray.concat(arr);
      }
    },

    /**
     * wrapper for collect on every target
     */
    collectAll: function(){
      this.collect('models');
      this.collect('controllers');
      this.collect('configs');
      this.collect('policies');
      this.collect('views');
    },

    /**
     * reads contents of directory and returns an Array 
     * of full path strings to the files
     * 
     * @param  {String} path the directory path to search
     * @return {Array}      array of fullpath strings of every file in directory
     */
    readdirSyncComplete: function(path){
      var fullPath = []; 
      try{
        var files = fs.readdirSync(path); 
        for(var i = 0; i < files.length; i++){
          fullPath.push(path + '/' + files[i]); 
        }
        return fullPath; 
      }catch(e){
        return [];
      }
    },

    /**
     * Shows the script usage and exits the program
     */
    usageExit: function(){
      this.usage();
      process.exit(1);
    },

    /**
     * Shows the script usage
     */
    usage: function(){
      console.log('');
      this.log('Usage: generate [resource]');
      this.log('Resources:');
      this.log('  all                    generates all components', false);
      this.log('  models                 generates all models', false);
      this.log('  controllers            generates all controllers', false);
      this.log('  configs                generates default configs', false);
      this.log('  views                  generates default view templates', false);
      this.log('  policies               generates all policies');
    },

    /**
     * Logs messages with optional line break
     * 
     * @param  {String} msg message to log
     * @param  {Boolean} br  if true or undefined preforms line break after mmsg
     */
    log: function(msg, br){
      console.log('  '+msg);

      if(typeof br === 'undefined' || br){
        console.log(' '); 
      }
    },

    /**
     * Attempts to install the next file in the installArray
     * if no files are left in the array closes the readline
     */
    triggerNext: function(){
      var src = this.installArray.shift(); 

      if(typeof src !== 'undefined'){
        var parts = src.split('/'); 
        var resourcePath = this.getResourcePath(parts[parts.length-2]); 
        var dest = this.basePath + resourcePath + '/' + parts[parts.length-1]; 
        
        if(typeof resourcePath !== 'undefined'){
          this._install(src, dest); 
        }else{
          this.triggerNext(); 
        }
         
      }else{
        this.log('all done, get ready to rock!  (╯°□°）╯︵ ┻━┻');
        rl.close(); 
      }
    },

    /**
     * gets the directory path in the sails app of various resources
     * 
     * @param  {String} resource the resource to translate to a path
     * @return {String}          resource path
     */
    getResourcePath: function(resource){
      switch(resource){
        case 'models':
          return '/api/models'; 
        case 'controllers':
          return '/api/controllers'; 
        case 'configs':
          return '/config'; 
        case 'policies':
          return '/api/policies'; 
        case 'views':
          return '/views'; 
        default:
          return null; 
        }
    },

    /**
     * tries to install the source file to the destination path, if it exsits
     * in the destination will trigger a prompt.
     * 
     * @param  {String} src  fullpath of source file to install
     * @param  {String} dest fullpath of destination file to install
     */
    _install: function(src, dest){
      if(fs.existsSync(dest)){
        this.waitForResponse(src, dest); 
      }else{
        this.copy(src, dest); 
        this.triggerNext(); 
      }
    },

    /**
     * copies the source to the destination
     * 
     * @param  {String} src  the source file
     * @param  {String} dest the destination file
     */
    copy: function(src, dest){
      self.logger.info('generating '+dest); 
      fs.createReadStream(src).pipe(fs.createWriteStream(dest)); 
    },

    /**
     * prompts the user if we can overwrite the destination file
     * 
     * @param  {String} src  the source file
     * @param  {String} dest the destination file
     */
    waitForResponse: function(src, dest){
      self.logger.warn('File at '+dest+' exists, overwrite?');
      
      rl.question('(yN) ', function(answer){
        switch(answer.toLowerCase()){
          case 'y':
            this.copy(src, dest); 
            this.triggerNext(); 
            break; 
          case 'n':
            this.triggerNext(); 
            break; 
          default:
            this.waitForResponse(src, dest); 
            break; 
        }
      }.bind(this)); 
    }
  };
};