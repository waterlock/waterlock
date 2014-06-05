'use strict';

/**
 * hasApiKey
 *
 * @module      :: Policy
 * @description :: Assumes that your request has an api key;
 *
 */
module.exports = function(req, res, next) {
  if (req.headers['api-key']) {
    ApiKey.findOne({key: req.headers['api-key']}).done(function(err, a){
      if(a && !a.revoked){
        // Another call to save will update the number of times
        // this apikey was used this is required if you wanna track 
        // api key usage.
        var use = {apiKey: a.id, remoteAddress: req.connection.remoteAddress};
        Use.create(use).done(function(){});
        a.save();
        return next();    
      }else{
        return res.forbidden('Your api key is either not preset or invalid.');        
      }
    });
  }else{
    return res.forbidden('Your api key is either not preset or invalid.');
  }
};
