var passport         = require('passport');
var GoogleStrategy   = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID      : "72712076024-42t8kt2cum76ib2o4t9a9t5cnbuhns2m.apps.googleusercontent.com",
    clientSecret  : "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",
    callbackURL   : '/auth/google/callback',
    passReqToCallback   : true
  }, function(request, accessToken, refreshToken, profile, done){
    console.log('profile: ', profile);
    var user = profile;

    done(null, user);
  }
));

module.exports = passport;
