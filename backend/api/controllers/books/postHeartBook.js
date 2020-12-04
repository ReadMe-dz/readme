const Book = require('../../models/book.model');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postHeartBook = (req, res) => {
  const { bookId } = req.body;
  const { _id } = req.verifiedToken;

  Book.findById(bookId)
    .then((book) => {
      if (book) {
        const { hearts } = book;
        const index = hearts.indexOf(_id);
        if (index > -1) {
          hearts.splice(index, 1);
        } else {
          hearts.push(_id);
        }

        Book.updateOne({ _id: bookId }, { $set: { hearts } })
          .exec()
          .then(() =>
            res.status(200).json({
              updated_id: req.params.id,
              success: true,
              message: {
                type: SUCCESS,
                content: 'The book was hearted successfully.',
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
        res.status(500).json({
          message: {
            type: ERROR,
            content:
              'This is not supposed to happen, Please report this to us.',
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: {
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      });
    });
};

module.exports = postHeartBook;
