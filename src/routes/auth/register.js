const bcrypt = require('bcrypt-nodejs');
const User = require('../../../models/user');
function register(req, res) {
  User.find({userName: req.body.userName}, function(err, user) {
    if (user.length) {
      res.status(409).json({
        status: '409',
        message: 'User Already Exists.',
      });
    } else {
      const newUser = new User(req.body);
      newUser.hashedPassword = generateHash(req.body.hashedPassword);
      newUser.save(function(err, savedObject) {
        if (err) return next(err);
        if (savedObject) {
          res.status(200).json({
            status: '200',
            message: 'You are registered successfully.',
          });
        }
      });
    }
  });
}
function generateHash(password) {
  return bcrypt.hashSync(password);
}
module.exports = register;
