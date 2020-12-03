const Report = require('../../models/report.model');
const validate = require('../../validations/report.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const patchReport = async (req, res) => {
  const { title, type, done, details } = req.body;
  const newReport = { title, type, done, details };
  const validation = await validate.validateAsync({
    title,
    type,
    done,
    details,
  });

  if (!validation.error) {
    Report.updateOne({ _id: req.params.id }, { $set: newReport })
      .exec()
      .then(() =>
        res.status(200).json({
          updated_id: req.params.id,
          success: true,
          message: {
            type: SUCCESS,
            content: 'The report was added successfully.',
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

module.exports = patchReport;
