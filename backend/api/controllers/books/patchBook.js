const fs = require('fs');
const path = require('path');
const Book = require('../../models/book.model');
const validate = require('../../validations/book.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const patchBook = async (req, res) => {
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

  const newBook = {
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
  };

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
  });

  if (!validation.error) {
    if (req.file && req.file.path) {
      Book.findById(req.params.id)
        .exec()
        .then(({ cover }) => {
          if (cover && cover !== 'api/uploads/users/0321661312364.png') {
            fs.unlinkSync(path.join(__dirname, `../../../${cover}`));
          }
          newBook.cover = req.file.path;
          Book.updateOne({ _id: req.params.id }, { $set: newBook })
            .exec()
            .then(() =>
              res.status(200).json({
                updated_id: req.params.id,
                success: true,
                message: {
                  type: SUCCESS,
                  content: 'The book was updated successfully.',
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
        })
        .catch((findError) =>
          res.status(500).json({
            error: findError,
            message: {
              type: ERROR,
              content:
                'This is not supposed to happen, Please report this to us.',
            },
          })
        );
    } else {
      Book.updateOne({ _id: req.params.id }, { $set: newBook })
        .exec()
        .then(() =>
          res.status(200).json({
            updated_id: req.params.id,
            success: true,
            message: {
              type: SUCCESS,
              content: 'The book was added successfully.',
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
    }
  } else {
    res.status(401).json({
      message: {
        type: ERROR,
        content: 'Unvalid inputs, Please check you inputs and try again.',
      },
    });
  }
};

module.exports = patchBook;
