const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const User = require('../../models/user.model');
const validate = require('../../validations/user.validator');
require('dotenv').config();

const { JWT_VERFICATION_KEY, HOSTNAME } = process.env;

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
                        <p>Thank you for signing up in <b style="color: #ea4c89;">Read Me</b>.</p>
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

module.exports = addUser;
