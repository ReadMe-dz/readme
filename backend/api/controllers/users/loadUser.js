const User = require('../../models/user.model');

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

module.exports = loadUser;
