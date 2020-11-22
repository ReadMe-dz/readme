const User = require('../../models/user.model');

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

module.exports = getAllUsers;
