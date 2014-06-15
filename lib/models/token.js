'use strict';

/**
 * attributes for token model
 * @param  {object} attributes user defined attributes
 * @return {object} template merged with attributes
 */
exports.attributes = function(attributes){
  var _ = require('lodash');

  var template = {
    resetToken: 'string',
    expiration: 'datetime',
    owner: {
      model: 'user'
    }
  };

  return _.merge(template, attributes);
};

/**
 * used to generate a reset token along with it's time to expiry 
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeCreate = function(values, cb){
  var moment = require('moment');
  var krypt = require('../waterlock').krypt;

  if(typeof values.resetToken === 'undefined'){
    values.resetToken = krypt.random(13);
  }
  var key = krypt.sha256(values.resetToken);
  values.resetToken = key;

  var expiration = moment().add('hours', 1).format('YYYY-MM-DD HH:mm:ss');
  values.expiration = expiration;

  cb();
};

/**
 * used to fire off a reset password email if tokens are enabled
 * @param  {object}   token 
 * @param  {Function} cb    
 */
exports.afterCreate = function(token, cb){
  var config = require('../waterlock').config;

  if(config.passwordReset.tokens){

    var utils = require('../utils');
    var html = utils.getHtmlEmail(token);


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.passwordReset.mail.from, // sender address
        subject: config.passwordReset.mail.subject, // Subject line
        text: html, // plaintext body
        html: html // html body
    };

    User.findOne(token.owner).done(function(err, u){
      mailOptions.to = u.email;

      var transport = require('../waterlock').transport;
      transport.sendMail(mailOptions, utils.mailCallback);
    });
  }

  cb();
};