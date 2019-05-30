const expressJwt = require('express-jwt');
const validateJwt = expressJwt({secret: 'secret'});
const compose = require('composable-middleware');
const User = require('../../../models/user');

function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        validateJwt(req, res, next);
      })
      // Attaching user to request
      .use(function(req, res, next) {
        User.findById(req.user._id, function(err, user) {
          if (err) return next(err);
          if (!user) return res.status(401).send({message: 'User not found.'});
          req.user = user;
          delete req.headers['authorization'];
          next();
        });
      })
  );
}
exports.isAuthenticated = isAuthenticated;
