const User = require('../../models/user.model');

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

module.exports = deleteUser;
