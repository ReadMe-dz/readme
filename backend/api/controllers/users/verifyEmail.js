const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
require('dotenv').config();

const { JWT_VERFICATION_KEY, FRONTEND_HOSTNAME } = process.env;

const verifyEmail = (req, res) => {
  const token = req.params.verificationToken.slice(0, -5);
  const { email } = jwt.verify(token, JWT_VERFICATION_KEY);

  User.findOne({ email })
    .exec()
    .then((result) => {
      if (result) {
        if (result.verified) {
          res.redirect(`${FRONTEND_HOSTNAME}/login`);
        } else {
          User.updateOne({ email }, { $set: { verified: true } })
            .exec()
            .then(() => {
              res.redirect(`${FRONTEND_HOSTNAME}/login`);
            })
            .catch((error) =>
              res.status(500).json({
                error,
                message: {
                  type: 'error',
                  content:
                    'This is not supposed to happen, Please report this to us.',
                },
              })
            );
        }
      } else {
        res.status(404).json({
          message: {
            type: 'error',
            content:
              'We could not find any account associated to this email address',
          },
        });
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

module.exports = verifyEmail;
