module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (message) => {
      socket.broadcast.emit('message', message);
    });
  });
};
