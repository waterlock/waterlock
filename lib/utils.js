/**
 * [mergeObjects description]
 * @param  {[type]} obj1 [description]
 * @param  {[type]} obj2 [description]
 * @return {[type]}      [description]
 */
exports.mergeObjects = function(obj1, obj2){
  for(var key in obj1){
    if(obj1.hasOwnProperty(key)){
      obj2[key] = obj1[key];
    }
  }

  return obj2;
}

/**
 * [getHtmlEmail description]
 * @param  {[type]} token
 * @return {[type]}
 */
exports.getHtmlEmail = function(token){
  var config = require('./waterlock').config;

  if(typeof config === 'undefined'){
    throw "No config file defined, try running [waterlock install config]"
  }

  var resetUrl = config.baseUrl+
    "/user/reset?id="+token.owner+",token="+token.resetToken;

  var viewVars = config.passwordReset.template.vars;
  viewVars.url = resetUrl;
  
  var jade = require('jade');  
  var path = require('path');

  var templatePath = path.normalize(__dirname+"../../../"+config.passwordReset.template.file);
  var html = jade.renderFile(templatePath, viewVars);

  return html;
}

/**
 * [mailCallback description]
 * @param  {[type]} error
 * @param  {[type]} response
 * @return {[type]}
 */
exports.mailCallback = function(error, response){
   if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
}