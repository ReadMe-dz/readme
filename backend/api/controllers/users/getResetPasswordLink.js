const User = require('../../models/user.model');

const getResetPasswordLink = (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .exec()
    .then((result) => {
      console.log(result);
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

module.exports = getResetPasswordLink;
