const mongoose = require('mongoose');
const Request = require('../../models/request.model');
const validate = require('../../validations/request.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postRequest = async (req, res) => {
  const { title, author, details, language } = req.body;

  const user = req.verifiedToken._id;
  const validation = await validate.validateAsync({
    user,
    title,
    author,
    details,
    language,
    comments: [],
  });

  if (!validation.error) {
    const request = new Request({
      _id: new mongoose.Types.ObjectId(),
      user,
      title,
      author,
      details,
      language,
      comments: [],
    });

    request
      .save()
      .then(() =>
        res.status(201).json({
          message: {
            type: SUCCESS,
            content: 'The request was added successfully.',
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

module.exports = postRequest;
