const Request = require('../../models/request.model');
const { ERROR } = require('../../utils/msgTypes');

const getRequests = (req, res) => {
  const { page, id } = req.params;
  const limit = 6;
  Request.find({ user: id })
    .skip(page * limit)
    .limit(limit)
    .populate('user comments.user', '_id name wilaya username')
    .exec()
    .then((requests) => {
      res.status(200).json({ requests });
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

module.exports = getRequests;
