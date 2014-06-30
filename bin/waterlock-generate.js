#!/usr/bin/env node
var path = require("path"); 
var fs = require("fs"); 
var readline = require('readline'); 
var _ = require('lodash'); 
var rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
}); 


var install_base_path = path.resolve(__dirname+'/../../..'); 
var SPACE = "  ";
var waterlockPlugins = []; 
var INSTALL_ARRAY = []; 
var models = []; 
var controllers = []; 
var config = []; 
var policies = []; 
var views = []; 

var node_modules = path.resolve(__dirname+'/../..'); 
var _node_modules = fs.readdirSync(node_modules);

// gather plugins
for(var i = 0; i < _node_modules.length; i++){
  if(_node_modules[i].indexOf('waterlock-') > -1){
    waterlockPlugins.push(_node_modules[i]);
  }
}
for(var i = 0;  i < waterlockPlugins.length; i++){
  var pluginPath = node_modules + '/' + waterlockPlugins[i] + '/lib/templates'; 
  models = models.concat(readdirSyncComplete(pluginPath+ '/models')); 
  controllers = controllers.concat(readdirSyncComplete(pluginPath+ '/controllers'));
  config = config.concat(readdirSyncComplete(pluginPath+ '/config'));
  policies = policies.concat(readdirSyncComplete(pluginPath+ '/policies'));
  views = views.concat(readdirSyncComplete(pluginPath+'/views')); 
}

// gather wl templates
var wlPath = path.resolve(__dirname+'/../lib/templates'); 
models = models.concat(readdirSyncComplete(wlPath+ '/models')); 
controllers = controllers.concat(readdirSyncComplete(wlPath+ '/controllers'));
config = config.concat(readdirSyncComplete(wlPath+ '/config'));
policies = policies.concat(readdirSyncComplete(wlPath+ '/policies'));
views = views.concat(readdirSyncComplete(wlPath+ '/views')); 

module.exports = function(){
  var args = Array.prototype.slice.call(arguments);
  var meta = args.pop();
  var task = args.shift();

  var raw = false;
  if(typeof meta.raw !== 'undefined' && meta.raw){
    raw = meta.raw;
  }
  
  collectInstallTargets(task);
  triggerNext(); 
}

function collectInstallTargets(task){
  switch(task){
    case 'all':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(
          models, 
          controllers, 
          config, 
          policies, 
          views
          ); 
      break; 
    case 'models':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(models); 
      break; 
    case 'controllers':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(controllers); 
      break; 
    case 'configs':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(config); 
      break; 
    case 'views':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(views); 
      break; 
    case 'policies':
      INSTALL_ARRAY = INSTALL_ARRAY.concat(policies); 
      break; 
    default:
      usageExit(); 
      break; 
  }
  INSTALL_ARRAY = _.compact(INSTALL_ARRAY); 
}

function triggerNext(){
  var src = INSTALL_ARRAY.shift(); 

  if(typeof src !== 'undefined'){
    var _parts = src.split('/'); 
    var resourcePath = getResourcePath(_parts[_parts.length-2]); 
    var dest = install_base_path + resourcePath + '/' + _parts[_parts.length-1]; 
    
    if(typeof resourcePath !== 'undefined'){
      install(src, dest); 
    }else{
      triggerNext(); 
    }
     
  }else{
    log("all done, get ready to rock!  (╯°□ °）╯︵ ┻━┻");
    rl.close(); 
  }
}

function getResourcePath(resource){
  switch(resource){
    case 'models':
      return '/api/models'; 
    case 'controllers':
      return '/api/controllers'; 
    case 'config':
      return '/config'; 
    case 'policies':
      return '/api/policies'; 
    case 'views':
      return '/views'; 
    default:
      return null; 
    }
}

function install(src, dest){
  if(fs.existsSync(dest)){
    waitForResponse(src, dest); 
  }else{
    copy(src, dest); 
    triggerNext(); 
  }
}

function copy(src, dest){
  log("generating "+dest); 
  fs.createReadStream(src).pipe(fs.createWriteStream(dest)); 
}

function waitForResponse(src, dest){
  rl.question("File at "+dest+" exists, overwrite? (yN) ", function(answer){
    switch(answer.toLowerCase()){
      case 'y':
        copy(src, dest); 
        triggerNext(); 
        break; 
      case 'n':
        triggerNext(); 
        break; 
      default:
        waitForResponse(src, dest); 
        break; 
    }
  }); 
}

function readdirSyncComplete(path){
  var fullPath = []; 
  try{
    var files = fs.readdirSync(path); 
    for(var i = 0; i < files.length; i++){
      fullPath.push(path + '/' + files[i]); 
    }
    return fullPath; 
  }catch(e){
    return null;
  }
}

function usageExit(){
  usage();
  process.exit(1);
}

function usage(){
  console.log("")
  log("Usage: generate [resource]");
  log("Resources:")
  log("  all                    generates all components", false);
  log("  models                 generates all models", false);
  log("  controllers            generates all controllers", false);
  log("  configs                generates default configs", false);
  log("  views                  generates default view templates", false);
  log("  policies               generates all policies");
}

function log(msg, br){
  console.log(SPACE+msg);

  if(typeof br === 'undefined' || br)
    console.log(" ");
}