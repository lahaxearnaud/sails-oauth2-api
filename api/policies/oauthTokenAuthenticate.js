/**
 * oauthTokenAuthenticate policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport');

module.exports = function(req, res, next) {

  passport.authenticate(['basic', 'oauth2-client-password'], {session: false}, function(err, user, info) {
    if (err || !user) {
      return res.send("You are not permitted to perform this action.", 403);
    }
    return next();
  })(req, res, next);

};
