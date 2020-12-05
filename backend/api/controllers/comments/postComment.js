const mongoose = require('mongoose');
const Comment = require('../../models/comment.model');
const validate = require('../../validations/comment.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postComment = async (req, res) => {
  const { user, bookId, content } = req.body;

  const validation = await validate.validateAsync({
    user,
    bookId,
    content,
  });

  if (!validation.error) {
    const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      user,
      bookId,
      content,
    });

    comment
      .save()
      .then((result) =>
        res.status(201).json({
          created: result,
          success: true,
          message: {
            type: SUCCESS,
            content: 'Thank you, the comment was saved successfully.',
          },
        })
      )
      .catch((error) =>
        res.status(500).json({
          error,
          message: {
            type: ERROR,
            content:
              'Sorry again! this is not supposed to happen, Please report this to us.',
          },
        })
      );
  } else {
    res.status(401).json({
      message: {
        type: ERROR,
        content: 'Unvalid inputs, Please check you inputs and try again.',
      },
    });
  }
};

module.exports = postComment;
