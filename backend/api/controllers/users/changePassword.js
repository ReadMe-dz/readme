const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../../models/user.model');
require('dotenv').config();

const { JWT_VERFICATION_KEY } = process.env;

const changePassword = (req, res) => {
  const { resetToken, password } = req.body;
  const { email, exp } = jwt.verify(
    resetToken.slice(0, -5),
    JWT_VERFICATION_KEY
  );

  if (exp > Date.now() / 1000) {
    User.findOne({ email })
      .exec()
      .then(() => {
        bcryptjs.hash(String(password), 7, async (error, hashed) => {
          if (error) {
            res.status(500).json({
              message: {
                type: 'error',
                content:
                  'This is not supposed to happen, Please report this to us.',
              },
              error,
            });
          } else {
            User.updateOne({ email }, { password: hashed })
              .exec()
              .then(() => {
                res.status(200).json({
                  updated_id: req.params.id,
                  success: true,
                  message: {
                    type: 'success',
                    content: 'Your password was updated successfully.',
                  },
                });
              })
              .catch((updateError) =>
                res.status(500).json({
                  error: updateError,
                  message: {
                    type: 'error',
                    content:
                      'This is not supposed to happen, Please report this to us.',
                  },
                })
              );
          }
        });
      })
      .catch((findError) =>
        res.status(500).json({
          error: findError,
          message: {
            type: 'error',
            content:
              'This is not supposed to happen, Please report this to us.',
          },
        })
      );
  } else {
    res.status(401).json({
      message: {
        type: 'error',
        content:
          'Your reset password link has expired, Please request a new one.',
      },
    });
  }
};

module.exports = changePassword;
