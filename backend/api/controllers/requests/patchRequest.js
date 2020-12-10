const Request = require('../../models/request.model');
const validate = require('../../validations/request.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const patchRequest = async (req, res) => {
  const { user, title, author, details, language } = req.body;

  const newRequest = {
    user,
    title,
    author,
    details,
    language,
  };

  const validation = await validate.validateAsync({
    user,
    title,
    author,
    details,
    language,
  });

  if (!validation.error) {
    Request.updateOne({ _id: req.params.id }, { $set: newRequest })
      .exec()
      .then(() =>
        res.status(200).json({
          message: {
            type: SUCCESS,
            content: 'The request was updated successfully.',
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
    res.status(401).json({
      message: {
        type: ERROR,
        content: 'Unvalid inputs, Please check you inputs and try again.',
      },
    });
  }
};

module.exports = patchRequest;
