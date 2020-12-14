const Request = require('../../models/request.model');
const { ERROR } = require('../../utils/msgTypes');

const getRequestsCount = (req, res) => {
  const { user } = req.params;

  Request.countDocuments({ user })
    .then((count) => {
      res.status(200).json({ count });
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

module.exports = getRequestsCount;
