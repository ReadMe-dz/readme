const bcryptjs = require('bcryptjs');
const User = require('../../models/user.model');

const changePassword = (req, res) => {
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
                    type: 'error',
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
                          type: 'error',
                          content:
                            'This is not supposed to happen, Please report this to us.2',
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
                              type: 'success',
                              content:
                                'Your password was changed successfully.',
                            },
                          });
                        })
                        .catch((updateError) =>
                          res.status(500).json({
                            error: updateError,
                            message: {
                              type: 'error',
                              content:
                                'This is not supposed to happen, Please report this to us.3',
                            },
                          })
                        );
                    }
                  }
                );
              } else {
                res.status(401).json({
                  message: {
                    type: 'error',
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
              type: 'error',
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
            type: 'error',
            content:
              'This is not supposed to happen, Please report this to us.4',
          },
        })
      );
  } else {
    res.status(401).json({
      message: {
        type: 'error',
        content: 'Please make sure your are logged in, and retry.',
      },
    });
  }
};

module.exports = changePassword;
