const mongoose = require('mongoose');
const Message = require('../../models/message.model');
const validate = require('../../validations/message.validator');
const { ERROR } = require('../../utils/msgTypes');

const postMessage = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ from, to, content }) => {
      const validation = await validate.validateAsync({
        from,
        to,
        content,
      });

      if (!validation.error) {
        const message = new Message({
          _id: new mongoose.Types.ObjectId(),
          from,
          to,
          content,
        });

        message
          .save()
          .then((res) => {
            Message.findById(res._id)
              .populate('to', '_id name username picture wilaya')
              .populate('from', '_id name username picture wilaya')
              .then((result) => {
                socket.emit(from, result);
                socket.broadcast.emit(to, result);
              });
          })
          .catch((error) => {
            console.log(error);
            socket.emit(from, {
              error,
              message: {
                type: ERROR,
                content:
                  'Sorry again! this is not supposed to happen, Please report this to us.',
              },
            });
          });
      } else {
        socket.emit(from, {
          message: {
            type: ERROR,
            content: 'Unvalid inputs, Please check you inputs and try again.',
          },
        });
      }
    });
  });
};

module.exports = postMessage;
