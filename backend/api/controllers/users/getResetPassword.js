const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
require('dotenv').config();

const { JWT_VERFICATION_KEY, FRONTEND_HOSTNAME } = process.env;

const getResetPassword = (req, res) => {
  const token = req.params.resetToken.slice(0, -5);
  const { email } = jwt.verify(token, JWT_VERFICATION_KEY);

  User.findOne({ email })
    .exec()
    .then((result) => {
      if (result) {
        res.redirect(`${FRONTEND_HOSTNAME}/reset/${req.params.resetToken}`);
      } else {
        res.redirect(`${FRONTEND_HOSTNAME}/not-found`);
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: {
          type: 'error',
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = getResetPassword;
