const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mailer = require('../utils/mailer');
const User = require('../models/user.model');
const validate = require('../validations/user.validator');
require('dotenv').config();

const {
  JWT_VERFICATION_KEY,
  JWT_KEY,
  HOSTNAME,
  FRONTEND_HOSTNAME,
} = process.env;

const searchUsers = (req, res) => {
  const { username, wilaya } = req.query;
  const find = { username, wilaya };

  User.find(find)
    .select(
      '_id email name username wilaya moreInfo picture birthdate phone facebook twitter'
    )
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, users: result })
    )
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

const getAllUsers = (req, res) => {
  User.find()
    .select(
      '_id email name username wilaya moreInfo picture birthdate phone facebook twitter'
    )
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, users: result })
    )
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

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .select(
      '_id email name username wilaya moreInfo picture birthdate phone facebook twitter'
    )
    .exec()
    .then((result) =>
      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: {
              type: 'error',
              content: 'We could not find any user with the sent ID.',
            },
          })
    )
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

const addUser = (req, res) => {
  const { name, email, password, username, wilaya } = req.body;

  User.find({ email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        res.status(409).json({
          message: {
            type: 'error',
            content:
              'This email is already in use, please try with a diffrent email.',
          },
        });
      } else {
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
            try {
              const validation = await validate.validateAsync({
                name,
                email,
                password,
                username,
                wilaya,
              });

              if (!validation.error) {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  name,
                  email,
                  password: hashed,
                  username,
                  wilaya,
                  verified: false,
                });
                if (req.file) {
                  user.picture = req.file.path;
                } else {
                  user.picture = 'api/uploads/users/0321661312364.png';
                }

                user
                  .save()
                  .then((userResult) => {
                    res.status(201).json({
                      created: userResult,
                      success: true,
                      message: {
                        type: 'success',
                        content: `The user @${user.username} have been created.`,
                      },
                    });

                    const verificationlink = `${
                      HOSTNAME || req.hostname
                    }/users/verify/${jwt.sign(
                      { email },
                      JWT_VERFICATION_KEY || 'G0-p2^vPj16$vE9*Sd2+5fdG6Jsf*',
                      { expiresIn: '365d' }
                    )}${Math.random().toString().slice(2, 7)}`;

                    const emailContent = `
                      <div style="max-width: 600px; text-align: center; color: #000000; margin: 0 auto;">
                        <img style="display: inline-block; width: 128px; height: 128px;" src="https://i.ibb.co/NsPb7kB/Untitled-1.png" />
                        <p>Hello ${username},</p>
                        <p>Thank you for signing up in <b style="color: #ea4c89;">ReadMe</b>.</p>
                        <p>In order to validate your email address and activate your account, please click the following link.</p>
                        <a style="color: #ea4c89; text-decoration: underline;" href="${verificationlink}">${verificationlink}</a>
                        <p>After activating your account, you can log in using your email address and your chosen password.</p>
                        <p>Best Regards</p>
                        <p>The <b style="color: #ea4c89;">Read Me</b> team</p>
                      </div>
                    `;
                    mailer(email, 'Read Me - Email Verification', emailContent);
                  })
                  .catch((userError) =>
                    res.status(500).json({
                      message: {
                        type: 'error',
                        content:
                          'This is not supposed to happen, Please report this to us.',
                      },
                      userError,
                    })
                  );
              } else {
                res.status(401).json({
                  message: {
                    type: 'error',
                    content:
                      'Unvalid inputs, Please check you inputs and try again.',
                  },
                });
              }
            } catch (catchError) {
              res.status(500).json({
                message: {
                  type: 'error',
                  content:
                    'This is not supposed to happen, Please report this to us.',
                },
                catchError,
              });
            }
          }
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

const updateUser = (req, res) => {
  const {
    email,
    username,
    name,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  } = req.body;
  const newUser = {
    email,
    username,
    name,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  };

  const defaultPic = 'api/uploads/users/0321661312364.png';
  if (req.file && req.file.path) {
    newUser.picture = req.file.path;
  }

  User.findOne({ _id: req.params.id })
    .exec()
    .then(async (result) => {
      try {
        const validation = await validate.validateAsync({
          email,
          username,
          name,
          wilaya,
          moreInfo,
          birthdate,
          phone,
          facebook,
          twitter,
        });

        if (!validation.error) {
          if (
            req.file &&
            req.file.path &&
            result.picture &&
            result.picture !== defaultPic
          ) {
            fs.unlinkSync(path.join(__dirname, `../../${result.picture}`));
          }

          User.updateOne({ _id: req.params.id }, { $set: newUser })
            .exec()
            .then(() => {
              res.status(200).json({
                updated_id: req.params.id,
                success: true,
                message: {
                  type: 'success',
                  content: 'Your profile was updated successfully.',
                },
              });
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
        } else {
          res.status(401).json({
            message: {
              type: 'error',
              content: 'Unvalid inputs, Please check you inputs and try again.',
            },
          });
        }
      } catch (catchError) {
        res.status(500).json({
          catchError,
          message: {
            type: 'error',
            content:
              'This is not supposed to happen, Please report this to us.',
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

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then(() =>
      res.status(200).json({ deletedId: req.params.id, success: true })
    )
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

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        bcryptjs.compare(String(password), user.password, (error, result) => {
          if (error || !result)
            res.status(401).json({
              message: {
                type: 'error',
                content: 'Unvalid email address or password, Please try again.',
              },
            });
          else if (user.verified) {
            const token = jwt.sign(
              { email, _id: user._id },
              JWT_KEY || 'G0-p2^vPj1/6$vE[aK1vM3$5',
              { expiresIn: '5d' }
            );
            res.status(200).json({
              token,
              user: {
                id: user._id,
                email: user.email,
                username: user.username,
                wilaya: user.wilaya,
                name: user.name,
                moreInfo: user.moreInfo,
                picture: user.picture,
                birthdate: user.birthdate,
                phone: user.phone,
                facebook: user.facebook,
                twitter: user.twitter,
              },
            });
          } else {
            res.status(401).json({
              message: {
                type: 'error',
                content:
                  'Your account has not been activated yet, we have sent you an activation email. Please check your inbox and activate it.',
              },
            });
          }
        });
      } else {
        res.status(401).json({
          message: {
            type: 'error',
            content:
              'We could not find any account associated to this email address, You need to sign up first.',
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

const loadUser = (req, res) => {
  const { email } = req.verifiedToken;
  User.findOne({ email })
    .exec()
    .then((data) => {
      if (data) {
        const {
          id,
          username,
          wilaya,
          name,
          moreInfo,
          picture,
          birthdate,
          phone,
          facebook,
          twitter,
        } = data;
        res.status(200).json({
          user: {
            id,
            email,
            username,
            wilaya,
            name,
            moreInfo,
            picture,
            birthdate,
            phone,
            facebook,
            twitter,
          },
        });
      } else {
        res.status(401).json({
          message: {
            type: 'error',
            content:
              'The sent token is unvalid, please logout and login again.',
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

const verifyEmail = (req, res) => {
  const token = req.params.verificationToken.slice(0, -5);
  const { email } = jwt.verify(token, JWT_VERFICATION_KEY);

  User.findOne({ email })
    .exec()
    .then(({ verified }) => {
      if (verified) {
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

module.exports = {
  searchUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  loadUser,
  getAllUsers,
  verifyEmail,
};
