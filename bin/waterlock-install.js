#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



module.exports = function(){
  var args = Array.prototype.slice.call(arguments);
  var meta = args.pop();
  var task = args.shift();

  var raw = false;
  if(typeof meta.raw !== 'undefined' && meta.raw){
    raw = meta.raw;
  }

  switch(task){
    case 'all':
      installAll();
      break;
    case 'models':
      installAllModels(true);
      break;
    case 'controllers':
      installAllControllers(true);
      break;
    case 'config':
      installAllConfigs(true);
      break;
    case 'email':
      installAllEmailTemplates(true);
      break;
    case 'policy':
      installAllPolicies(true);
      break;
    default:
      usageExit();
      break;
  }
}

var BASE_PATH = __dirname;
var INSTALL_BASE_PATH = path.normalize(BASE_PATH+"/../../../");
var SPACE = "  ";

var INSTALL_CALLBACKS = [];

function installAll(){
  installAllPolicies(false);
  installAllModels(false);
  installAllControllers(false);
  installAllConfigs(false);
  installAllEmailTemplates(false);
  triggerNext();
}

function installAllPolicies(trigger){
  INSTALL_CALLBACKS.push(
    tryInstallPolicies
    );

  if(trigger){
    triggerNext();
  }
}

function installAllModels(trigger){
  INSTALL_CALLBACKS.push(
      tryInstallApiModel,
      tryInstallTokenModel,
      tryInstallUserModel,
      tryInstallUseModel,
      tryInstallAttemptModel
    );
  if(trigger){
    triggerNext();
  }
}

function installAllControllers(trigger){
  INSTALL_CALLBACKS.push(
    tryInstallUserController,
    tryInstallAuthController
    );
  if(trigger){
    triggerNext();
  }
}

function installAllConfigs(trigger){
  INSTALL_CALLBACKS.push(
    tryInstallWaterlockConfig
    );
  if(trigger){
    triggerNext();
  }
}

function installAllEmailTemplates(trigger){
    INSTALL_CALLBACKS.push(
    tryInstallEmailTemplate
    );
  if(trigger){
    triggerNext();
  }
}

function triggerNext(){
  cb = INSTALL_CALLBACKS.shift();

  if(typeof cb !== 'undefined')
    cb.call();
  else
    rl.close();
}

/** Policies **/
function tryInstallPolicies(){
  var policyFile = "hasApiKey.js";
  var installPolicyPath = INSTALL_BASE_PATH+"api/policies/"+policyFile

  tryAction(installPolicies, installPolicyPath);    
}

function installPolicies(){
  log("installing policies");

  var policyFile = "hasApiKey.js";
  var _policyPath = BASE_PATH + "/../lib/templates/policies/"+policyFile;
  var policyPath = path.normalize(_policyPath);
  var installPolicyPath = INSTALL_BASE_PATH+"api/policies/"+policyFile
  
  fs.createReadStream(policyPath).pipe(fs.createWriteStream(installPolicyPath));
}
/*********************/

/** Api model **/
function tryInstallApiModel(){
  var userFile = "ApiKey.js";
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;

  tryAction(installApiModel, installUserPath)
}
function installApiModel(){
  log("installing api model")

  var userFile = "ApiKey.js";
  var _userPath = BASE_PATH + "/../lib/templates/models/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/
/** Use model **/
function tryInstallUseModel(){
  var userFile = "Use.js";
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;

  tryAction(installUseModel, installUserPath)
}
function installUseModel(){
  log("installing use model")

  var userFile = "Use.js";
  var _userPath = BASE_PATH + "/../lib/templates/models/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/
/** Attempt model **/
function tryInstallAttemptModel(){
  var userFile = "Attempt.js";
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;

  tryAction(installAttemptModel, installUserPath)
}
function installAttemptModel(){
  log("installing attempt model")

  var userFile = "Attempt.js";
  var _userPath = BASE_PATH + "/../lib/templates/models/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/
/** Token model **/
function tryInstallTokenModel(){
  var userFile = "Token.js";
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;

  tryAction(installTokenModel, installUserPath)
}
function installTokenModel(){
  log("installing token model")

  var userFile = "Token.js";
  var _userPath = BASE_PATH + "/../lib/templates/models/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/

/** User model **/
function tryInstallUserModel(){
  var userFile = "User.js";
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;

  tryAction(installUserModel, installUserPath)
}


function installUserModel(){
  log("installing user model")

  var userFile = "User.js";
  var _userPath = BASE_PATH + "/../lib/templates/models/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/models/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/

/** Auth controller **/
function tryInstallAuthController(){
  var userFile = "AuthController.js";
  var installUserPath = INSTALL_BASE_PATH + "api/controllers/"+userFile;

  tryAction(installAuthController, installUserPath)
}

function installAuthController(){
  log("installing auth controller")

  var userFile = "AuthController.js";
  var _userPath = BASE_PATH + "/../lib/templates/controllers/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/controllers/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));

  log("now go place the following in your routes file: ")
  log("    'post /login': 'AuthController.login'", false)
  log("    'get /logout': 'AuthController.logout'")
}

/** User controller **/
function tryInstallUserController(){
  var userFile = "UserController.js";
  var installUserPath = INSTALL_BASE_PATH + "api/controllers/"+userFile;

  tryAction(installUserController, installUserPath)
}

function installUserController(){
  log("installing user controller")

  var userFile = "UserController.js";
  var _userPath = BASE_PATH + "/../lib/templates/controllers/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "api/controllers/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/

/** Waterlock config **/
function tryInstallWaterlockConfig(){
  var userFile = "waterlock.json";
  var installUserPath = INSTALL_BASE_PATH + "config/"+userFile;

  tryAction(installWaterlockConfig, installUserPath)
}

function installWaterlockConfig(){
  log("installing waterlock config")

  var userFile = "waterlock.json";
  var _userPath = BASE_PATH + "/../lib/templates/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "config/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/

/** Email template **/
function tryInstallEmailTemplate(){
  var userFile = "email.jade";
  var installUserPath = INSTALL_BASE_PATH + "views/"+userFile;

  tryAction(installEmailTemplate, installUserPath)
}

function installEmailTemplate(){
  log("installing email template")

  var userFile = "email.jade";
  var _userPath = BASE_PATH + "/../lib/templates/" + userFile;
  var userPath = path.normalize(_userPath);
  var installUserPath = INSTALL_BASE_PATH + "views/"+userFile;
  
  fs.createReadStream(userPath).pipe(fs.createWriteStream(installUserPath));
}
/*********************/
function tryAction(cb, p){
  if(fs.existsSync(p)){
    waitForResponse(cb, p);    
  }else{
    cb();
    triggerNext();
  }
}

function waitForResponse(cb, p){
  rl.question("File at "+p+" exists, overwrite? (yN)", function(answer) {
    switch(answer.toLowerCase()){
      case 'y':
        cb();
        triggerNext();
        break;
      case 'n':
        triggerNext();
        return;
      default:
        waitForResponse(cb,p);
        return;
    }
  });
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
  log("  config                 generates default config", false);
  log("  email                  generates default email template", false);
  log("  policies               generates all policies");
}

function log(msg, br){
  console.log(SPACE+msg);

  if(typeof br === 'undefined' || br)
    console.log(" ");
}