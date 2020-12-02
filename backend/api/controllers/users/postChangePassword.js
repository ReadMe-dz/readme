const bcryptjs = require('bcryptjs');
const User = require('../../models/user.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postChangePassword = (req, res) => {
  const { currentPassword, password } = req.body;
  const { email } = req.verifiedToken;
  if (email) {
    User.findOne({ email })
      .exec()
      .then((user) => {
        if (user) {
          bcryptjs.compare(
            String(currentPassword),
            user.password,
            (compareError, result) => {
              if (compareError || !result) {
                res.status(401).json({
                  message: {
                    type: ERROR,
                    content:
                      "Unvalid 'current password'. Please make sure to enter the right 'current password' and retry again.",
                  },
                  compareError,
                });
              } else if (password !== currentPassword) {
                bcryptjs.hash(
                  String(password),
                  7,
                  async (hashError, hashed) => {
                    if (hashError) {
                      res.status(500).json({
                        message: {
                          type: ERROR,
                          content:
                            'This is not supposed to happen, Please report this to us.',
                        },
                        hashError,
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
                              content:
                                'Your password was changed successfully.',
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
                  }
                );
              } else {
                res.status(401).json({
                  message: {
                    type: ERROR,
                    content:
                      'The new password can not be the same as the old one.',
                  },
                });
              }
            }
          );
        } else {
          res.status(404).json({
            message: {
              type: ERROR,
              content:
                'We could not find any account associated to this email address, You need to sign up first.',
            },
          });
        }
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
        content: 'Please make sure your are logged in, and retry.',
      },
    });
  }
};

module.exports = postChangePassword;
