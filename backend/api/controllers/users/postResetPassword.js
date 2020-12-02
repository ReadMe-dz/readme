const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../../models/user.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');
require('dotenv').config();

const { JWT_VERFICATION_KEY } = process.env;

const postResetPassword = (req, res) => {
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
                type: ERROR,
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
                    type: SUCCESS,
                    content: 'Your password was updated successfully.',
                  },
                });
              })
              .catch((updateError) =>
                res.status(500).json({
                  error: updateError,
                  message: {
                    type: ERROR,
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
            type: ERROR,
            content:
              'This is not supposed to happen, Please report this to us.',
          },
        })
      );
  } else {
    res.status(401).json({
      message: {
        type: ERROR,
        content:
          'Your reset password link has expired, Please request a new one.',
      },
    });
  }
};

module.exports = postResetPassword;
