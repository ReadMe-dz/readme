module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('comment', (comment) => {
      socket.broadcast.emit('comment', comment);
    });
  });
};
