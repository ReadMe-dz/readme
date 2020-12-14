const Request = require('../../models/request.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postCommentRequest = async (req, res) => {
  const { requestId, comment, id } = req.body;
  const user = req.verifiedToken._id;
  Request.findById(requestId)
    .then((request) => {
      if (request) {
        const { comments } = request;
        comments.push({
          id,
          user,
          comment,
          commentedAt: new Date(),
        });

        Request.updateOne({ _id: requestId }, { $set: { comments } })
          .exec()
          .then(() =>
            res.status(200).json({
              message: {
                type: SUCCESS,
                content: 'The comment was added successfully.',
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
            content: 'The request you want to comment to does not exist.',
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
        message: {
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      });
    });
};

module.exports = postCommentRequest;
