const Message = require('../../models/message.model');
const { ERROR } = require('../../utils/msgTypes');

const getChatList = (req, res) => {
  const userId = req.verifiedToken._id;
  Message.find({ $or: [{ to: userId }, { from: userId }] })
    .select('from to')
    .populate('to', '_id name username picture wilaya')
    .populate('from', '_id name username picture wilaya')
    .exec()
    .then((result) => {
      if (result) {
        const list = [];
        const found = [];
        let exists = false;

        result.forEach(({ to, from }) => {
          if (to._id.toString() === userId) {
            found.push(from);
          } else {
            found.push(to);
          }
        });

        for (let i = 0; i < found.length; i += 1) {
          exists = false;

          for (let j = 0; j < list.length; j += 1) {
            if (list[j]._id.toString() === found[i]._id.toString()) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            list.push(found[i]);
          }
        }

        res.status(200).json(list);
      } else {
        res.status(404).json({
          message: {
            type: ERROR,
            content:
              'Appologies, the chat list you are looking for does not exists.',
          },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
        message: {
          type: ERROR,
          content: 'This is not supposed to happen, Please report this to us.',
        },
      });
    });
};

module.exports = getChatList;
