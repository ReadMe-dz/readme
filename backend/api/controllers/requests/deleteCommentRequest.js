const Request = require('../../models/request.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const deleteCommentRequest = async (req, res) => {
  const { requestId, commentId } = req.body;
  const user = req.verifiedToken._id;

  Request.findById(requestId)
    .then((request) => {
      if (request) {
        const comments = request.comments.filter(
          (comment) =>
            comment.id !== commentId ||
            (comment.id === commentId &&
              comment.user.toString() !== user.toString())
        );
        Request.updateOne({ _id: requestId }, { $set: { comments } })
          .exec()
          .then(() =>
            res.status(200).json({
              message: {
                type: SUCCESS,
                content: 'The comment was deleted successfully.',
              },
            })
          )
          .catch((updateError) =>
            res.status(500).json({
              error: updateError,
              message: {
                type: ERROR,
                content:
                  'This is not supposed to happen, Please report this to us.',
              },
            })
          );
      } else {
        res.status(404).json({
          message: {
            type: ERROR,
            content: 'The comment you want to delete, does not exist.',
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
        message: {
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      });
    });
};

module.exports = deleteCommentRequest;
