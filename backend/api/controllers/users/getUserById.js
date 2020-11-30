const User = require('../../models/user.model');
const { ERROR } = require('../../utils/msgTypes');

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .select(
      '_id email name username wilaya moreInfo picture birthdate phone facebook twitter'
    )
    .exec()
    .then((result) =>
      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: {
              type: ERROR,
              content: 'We could not find any user with the sent ID.',
            },
          })
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

module.exports = getUserById;
