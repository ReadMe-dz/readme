const Comment = require('../../models/comment.model');
const { ERROR } = require('../../utils/msgTypes');

const getCommentsByBookId = (req, res) => {
  const bookId = req.params.id;
  Comment.find({ bookId })
    .populate('user', '_id name username picture wilaya')
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: {
            type: ERROR,
            content:
              'Appologies, the comments you are looking for does not exists.',
          },
        });
      }
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

module.exports = getCommentsByBookId;
