const Book = require('../../models/book.model');
const { ERROR } = require('../../utils/msgTypes');

const getAllBooks = (req, res) => {
  Book.find()
    .populate('user', '_id name picture wilaya')
    .exec()
    .then((result) => {
      res.status(200).json({ count: result.length, books: result });
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

module.exports = getAllBooks;
