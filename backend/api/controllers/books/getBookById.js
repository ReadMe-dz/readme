const Book = require('../../models/book.model');
const { ERROR } = require('../../utils/msgTypes');

const getBookById = (req, res) => {
  Book.findById(req.params.id)
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
              'Appologies, the book you are looking for does not exists.',
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

module.exports = getBookById;
