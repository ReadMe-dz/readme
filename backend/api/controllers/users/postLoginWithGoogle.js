const mongoose = require('mongoose');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { makeRandStr } = require('../../utils/helpers');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const { JWT_KEY } = process.env;

const postLoginWithGoogle = async (req, res) => {
  const { tokenId } = req.body;
  axios
    .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
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
                  verified: user.verified,
                  complete: user.complete,
                },
              });
            } else {
              res.status(401).json({
                message: {
                  type: ERROR,
                  content:
                    'Your account has not been activated yet, we have sent you an activation email. Please check your inbox and activate it.',
                },
              });
            }
          } else {
            const { name } = response.data;
            const password = makeRandStr(12);
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: name.toLowerCase(),
              email,
              password,
              username: name.split(' ')[0],
              wilaya: 'adrar',
              verified: true,
              picture: 'api/uploads/users/0321661312364.png',
              complete: false,
            });
            const token = jwt.sign(
              { email, _id: newUser._id },
              JWT_KEY || 'G0-p2^vPj1/6$vE[aK1vM3$5',
              { expiresIn: '5d' }
            );
            newUser
              .save()
              .then((userResult) => {
                res.status(201).json({
                  token,
                  user: newUser,
                  created: userResult,
                  success: true,
                  message: {
                    type: SUCCESS,
                    content: `Welcome aboard @${name}. Please complete your informations.`,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  message: {
                    type: ERROR,
                    content:
                      'Apologies, This is not supposed to happen, Please report this to us.',
                  },
                });
              });
          }
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: {
          type: ERROR,
          content:
            'Apologies, We could not login with Google. Please refrech the page and try again.',
        },
      });
    });
};

module.exports = postLoginWithGoogle;
