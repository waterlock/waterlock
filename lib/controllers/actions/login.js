/**
 * Login action
 */
module.exports = function(req, res){
  var krypt = require('../../waterlock').krypt
  //TODO make email/username
  if(typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined'){
    res.json({error: "Invalid username or password"}, 400); 
  }else{
    User.findOneByEmail(req.body.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        if(krypt.validate(user.password, req.body.password)){
          // password match
            req.session.user = user;
            req.session.authenticated = true;
            res.json(user);
          }else{
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
      } else {
        //TODO redirect to register
        res.json({ error: 'User not found' }, 404);
      }
    });
  }
}
