const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
function login(req, res) {
  User.findOne({userName: req.body.userName}, function(err, User) {
    if (err) return err;
    console.log(User);
    if (!User) {
      res.status(404).json({
        status: 404,
        message: 'This user is not registered.',
      });
    } else {
      if (!User.authenticate(req.body.hashedPassword)) {
        res.status(401).json({
          status: 401,
          message: 'Incorrect Password.',
        });
      } else {
        const token = jwt.sign({_id: User._id}, 'secret', {
          expiresIn: '7d',
        });
        res.status(200).json({
          status: 200,
          token: token,
          message: 'You are logged in successfully',
        });
      }
    }
  });
}
module.exports = login;
