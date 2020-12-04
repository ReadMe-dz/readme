const Report = require('../../models/report.model');
const { ERROR } = require('../../utils/msgTypes');

const getReports = (req, res) => {
  Report.find()
    .select()
    .exec()
    .then((result) => {
      res.status(200).json(result);
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

module.exports = getReports;
