const User = require('../../models/user.model');
const { ERROR } = require('../../utils/msgTypes');

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
          verified,
          complete,
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
            verified,
            complete,
          },
        });
      } else {
        res.status(401).json({
          message: {
            type: ERROR,
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
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = loadUser;
