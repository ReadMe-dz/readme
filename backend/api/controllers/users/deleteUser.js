const User = require('../../models/user.model');

const deleteUser = (req, res) => {
  console.log({ _id: req.params.id, email: req.verifiedToken.email });
  User.deleteOne({ _id: req.params.id, email: req.verifiedToken.email })
    .exec()
    .then(() => {
      console.log('deleted');
      res.status(200).json({ deletedId: req.params.id, success: true });
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: {
          type: 'error',
          content:
            'Appologies, This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = deleteUser;
