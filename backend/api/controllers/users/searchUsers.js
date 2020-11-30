const User = require('../../models/user.model');
const { ERROR } = require('../../utils/msgTypes');

const searchUsers = (req, res) => {
  const { username, wilaya } = req.query;
  const find = { username, wilaya };

  User.find(find)
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
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = searchUsers;
