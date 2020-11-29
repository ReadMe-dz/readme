const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
require('dotenv').config();

const { JWT_KEY } = process.env;

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
                verified: user.verified,
                complete: user.complete,
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
        res.status(404).json({
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

module.exports = loginUser;
