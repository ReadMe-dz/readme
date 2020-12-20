const Request = require('../../models/request.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const deleteRequest = (req, res) => {
  Request.deleteOne({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).json({
        deleteId: req.params.id,
        success: true,
        message: {
          type: SUCCESS,
          content: 'The request was deleted successfully.',
        },
      });
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

module.exports = deleteRequest;
