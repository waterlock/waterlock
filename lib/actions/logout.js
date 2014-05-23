/**
 * [exports description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports = function (req, res){
  if(req.session.authenticated){
    req.session.authenticated = false;
  }
  res.json(200);
}