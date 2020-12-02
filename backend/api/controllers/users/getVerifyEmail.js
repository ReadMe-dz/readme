const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { ERROR } = require('../../utils/msgTypes');
require('dotenv').config();

const { JWT_VERFICATION_KEY, FRONTEND_HOSTNAME } = process.env;

const getVerifyEmail = (req, res) => {
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
                  type: ERROR,
                  content:
                    'This is not supposed to happen, Please report this to us.',
                },
              })
            );
        }
      } else {
        res.status(404).json({
          message: {
            type: ERROR,
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
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = getVerifyEmail;
