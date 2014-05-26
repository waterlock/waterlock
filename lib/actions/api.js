/** WE DON'T NEED THIS!!!
 * POST create api key for user
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = function(req, res, next){
  var params = req.params.all();
  var krypt = require('../waterlock').krypt;

  User.findOne(params.id).populate('apiKey').done(function(err, u){
    Api.create({owner: u.id, key: krypt.generateApiKey}).done(function(err, a){
      u.apiKey = a.id;
      u.save();
      res.json(a);
    });
  });
}

/**
 * GET /user/:id/api-keys
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.index = function(req, res, next){
  var params = req.params.all();

  User.findOne(params.id).populate('apiKey').done(function(err, u){
    res.json(u.apiKey);
  });  
}

/**
 * DELETE /user/:id/api-key/:apiId
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.destroy = function(req, res, next){
  var params = req.params.all();

  ApiKey.findOne({owner: params.id, id: params.apiId}).done(function(err, u){
    u.destroy();
    res.json();
  });
}