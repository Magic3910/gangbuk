var express  = require('express');
var router   = express.Router();
var passport = require('../config/passport.js');

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy((err)=>{
    if(err) next(err);
    req.logOut();
    res.cookie(`connect.sid`,``,{maxAge:0});
    res.redirect('/');
  });
});

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google'), authSuccess
);

function authSuccess(req, res) {
  res.redirect('/');
}

module.exports = router;
