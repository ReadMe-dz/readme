const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const { JWT_KEY } = process.env;

const loginWithFacebook = (req, res) => {
  const { accessToken } = req.body;
  axios
    .get(
      `https://graph.facebook.com/v8.0/me?access_token=${accessToken}&fields=name,email`
    )
    .then((response) => {
      const { email } = response.data;
      User.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            if (user.verified) {
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
          } else {
            res.status(404).json({
              message: {
                type: 'error',
                content:
                  "We could not find any account associated to this Facebook account's email address, You need to sign up first.",
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: {
              type: 'error',
              content:
                'Apologies, This is not supposed to happen, Please report this to us.',
            },
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: {
          type: 'error',
          content:
            'Apologies, We could not login with Facebook. Please refrech the page and try again.',
        },
      });
    });
};

module.exports = loginWithFacebook;
