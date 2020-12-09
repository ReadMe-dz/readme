const Message = require('../../models/message.model');
const { ERROR } = require('../../utils/msgTypes');

const getMessages = (req, res) => {
  const userId = req.verifiedToken._id;
  Message.find({ $or: [{ to: userId }, { from: userId }] })
    .populate('to', '_id name username picture wilaya')
    .populate('from', '_id name username picture wilaya')
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: {
            type: ERROR,
            content:
              'Appologies, the messages you are looking for does not exists.',
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

module.exports = getMessages;
