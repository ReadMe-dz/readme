const mongoose = require('mongoose');
const Report = require('../../models/report.model');
const validate = require('../../validations/report.validator');
const { ERROR, SUCCESS } = require('../../utils/msgTypes');

const postReport = async (req, res) => {
  const { title, type, details } = req.body;

  const validation = await validate.validateAsync({
    title,
    type,
    details,
    done: false,
  });

  if (!validation.error) {
    const report = new Report({
      _id: new mongoose.Types.ObjectId(),
      title,
      type,
      details,
      done: false,
    });

    report
      .save()
      .then((result) =>
        res.status(201).json({
          created: result,
          success: true,
          message: {
            type: SUCCESS,
            content: 'Thank you, the report was sent successfully.',
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

module.exports = postReport;
