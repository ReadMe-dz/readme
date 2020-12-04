const mongoose = require('mongoose');
const Book = require('../../models/book.model');
const validate = require('../../validations/book.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postBook = async (req, res) => {
  const {
    title,
    author,
    user,
    price,
    publisher,
    details,
    language,
    genre,
    state,
    year,
  } = req.body;

  const validation = await validate.validateAsync({
    title,
    author,
    user,
    publisher,
    details,
    language,
    genre,
    state,
    price,
    year,
    hearts: [],
  });

  if (!validation.error) {
    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      title,
      author,
      user,
      publisher,
      details,
      language,
      genre,
      state,
      price,
      year,
      hearts: [],
    });

    if (req.file) {
      book.cover = req.file.path;
    } else {
      book.cover = 'api/uploads/books/0321661312364.png';
    }

    book
      .save()
      .then((result) =>
        res.status(201).json({
          created: result,
          success: true,
          message: {
            type: SUCCESS,
            content: 'The book was added successfully.',
          },
        })
      )
      .catch((error) =>
        res.status(500).json({
          error,
          message: {
            type: ERROR,
            content:
              'This is not supposed to happen, Please report this to us.',
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

module.exports = postBook;
